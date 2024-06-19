# TODO(chandler): Use ruff.

from concurrent.futures import ThreadPoolExecutor
import datetime
from enum import Enum
from typing import Dict, Generator, List, Optional, Any, Union
from dataclasses import dataclass, field
from more_itertools import chunked
import requests
import os, sys
import time

__all__ = [
    "ObjectStore",
    "Error",
    "Index",
    "Object",
    "Client",
    "ObjectiveClient",
    "ListObjectsResponse",
    "Pagination",
]


class Error(Exception):
    """Base class for all of this module's exceptions."""


class RequestError(Error, requests.RequestException):
    """An HTTP request failed."""


class EnvironmentError(Error, ValueError):
    """Environment variables are unset or invalid."""


CPU_COUNT = os.cpu_count() if os.cpu_count() is not None else 6
CONNECTION_POOL_SIZE = int(os.getenv("OBJECTIVE_CONNECTION_POOL_SIZE", CPU_COUNT * 12))

API_BASE_URL = os.getenv("OBJECTIVE_API")
if not API_BASE_URL:
    API_BASE_URL = "https://api.objective.inc/v1/"
else:
    API_BASE_URL = API_BASE_URL.strip('"')





def _preprocess_fields(fields: Dict[str, Any]):
    """Helper method to convert index field creations into
    API format."""
    for field in fields.keys():
        if field in [
            "searchable",
            "crawlable",
            "filterable",
        ] and isinstance(fields[field], list):
            fields[field] = {"allow": fields[field]}
    return fields


class Client:
    def __init__(self, api_key: str):
        self.api_key = api_key.strip('"')
        self.http_session = requests.Session()
        # This creates a connection pool that will keep `CONNECTION_POOL_SIZE` connections alive.
        # If you try to create more connections, they will be created and thrown away after the requests.
        adapter = requests.adapters.HTTPAdapter(pool_connections=CONNECTION_POOL_SIZE, pool_maxsize=CONNECTION_POOL_SIZE)
        self.http_session.mount('http://', adapter)
        self.http_session.mount('https://', adapter)

    def request(
        self,
        method: str,
        endpoint: str = API_BASE_URL,
        data: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Issue a request to the Objective API

        Returns the JSON from the request."""
        url = API_BASE_URL + endpoint

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "User-Agent": "objective-py/1.0.0",
        }

        MAX_RETRIES = 3
        BACKOFF_FACTOR = 1.5
        for attempt in range(MAX_RETRIES):
            try:
                if method == "GET":
                    response = self.http_session.get(
                        url,
                        headers=headers,
                        params=data,
                    )
                else:
                    response = self.http_session.request(
                        method, url, headers=headers, json=data
                    )
                response.raise_for_status()
                return response.json()
            except requests.RequestException as e:
                # response can be None for timeouts or connect errors.
                if e.response is not None:
                    if (
                        e.response.status_code >= 400
                        and e.response.status_code <= 499
                        and e.response.status_code != 429
                    ):
                        if (
                            e.response.status_code == 422
                            and "errors" in e.response.json()
                        ):
                            errors_str = ", ".join(
                                [
                                    f'Error code {err.get("code")}: {err.get("message")}'
                                    for err in e.response.json().get("errors", [])
                                ]
                            )
                            raise Error(
                                f"Failed to create index with the following errors: {errors_str}",
                            )
                        else:
                            raise (e)

                if attempt < MAX_RETRIES - 1:  # i.e. if it's not the last attempt
                    sleep_time = BACKOFF_FACTOR * (2**attempt)
                    time.sleep(sleep_time)
                    continue
                else:
                    raise (e)

    @property
    def object_store(self) -> "ObjectStore":
        """Routes for /objects"""
        return ObjectStore(client=self)

    @property
    def indexes(self) -> "Indexes":
        """Routes for /indexes"""
        return Indexes(client=self)

    def list_indexes(
        self, limit: Optional[int] = None, cursor: Optional[str] = None
    ) -> List["Index"]:
        return self.indexes.list_indexes(limit=limit, cursor=cursor)

    def get_index(self, id: str) -> "Index":
        return self.indexes.get_index(id)


ObjectiveClient = Client


@dataclass
class Pagination:
    next: Optional[str] = None
    prev: Optional[str] = None


@dataclass
class Object:
    id: Optional[str] = None
    date_created: Optional[str] = None
    date_updated: Optional[str] = None
    object: Optional[Dict] = None
    status: Optional[Dict] = None

    # Internal field for storing local statuses of operations
    _ops_status: Optional[Any] = None
    _field_deletes: List[Dict] = field(default_factory=list)

    def is_newer_than(self, date):
        if date is None or self.date_updated is None:
            return True
        else:
            return datetime.datetime.strptime(
                date, "%Y-%m-%dT%H:%M:%S.%fZ"
            ) >= datetime.datetime.strptime(self.date_updated, "%Y-%m-%dT%H:%M:%S.%fZ")

    def __getitem__(self, key: str) -> Any:
        return self.object.get(key)

    def __setitem__(self, key: str, value: Any):
        self.object[key] = value

    def __delitem__(self, key: str):
        if key in self.object:
            self._field_deletes.append(key)
            del self.object[key]


@dataclass
class ListObjectsResponse:
    objects: List[Object]
    pagination: Pagination


@dataclass
class BatchOperation:
    success: List[Object]
    failures: List[Object]

    def __repr__(self):
        success_count = len(self.success) if self.success else 0
        failure_count = len(self.failures) if self.failures else 0
        return f"BatchOperation(success={success_count}, failures={failure_count})"


class ObjectStore:
    def __init__(self, client: "Client"):
        self.client = client

    def __len__(self) -> int:
        return self.size()

    def size(self) -> int:
        count = self.count()
        if count and count.get("count"):
            return count["count"]
        else:
            return 0

    def count(self) -> int:
        """Make a call to GET /objects/count"""
        objects_metadata = self.client.request(
            "GET", "objects", data={"include_metadata": True}
        )

        count = objects_metadata.get("metadata", {}).get("count")
        if count is None or not isinstance(count, int):
            raise RuntimeError("Failed to get count of objects from API.")

        return count

    def size(self) -> int:
        return self.count()

    def _get_status_for_object(self, object):
        object.status = self.client.request("GET", f"objects/{object.id}/status")
        return object

    def list_objects(
        self,
        limit: Optional[int] = 10,
        cursor: Optional[str] = None,
        include_object: Optional[bool] = False,
        include_status: Optional[bool] = False,
    ) -> ListObjectsResponse:
        """Get Objects from the Object Store. Calls GET /objects.

        Returns the API response from GET /objects
        """
        params = {}
        if cursor:
            params["cursor"] = cursor

        if limit:
            params["limit"] = limit

        if include_object:
            params["include_object"] = include_object

        resp = self.client.request("GET", "objects", data=params)
        objects = [Object(**obj) for obj in resp.get("objects", [])]

        if include_status:
            with ThreadPoolExecutor(max_workers=CONNECTION_POOL_SIZE) as executor:
                objects = list(executor.map(self._get_status_for_object, objects))

        return ListObjectsResponse(
            objects=objects,
            pagination=Pagination(**resp.get("pagination", {})),
        )

    def get_objects(
        self,
        limit: Optional[int] = 10,
        cursor: Optional[str] = None,
    ) -> ListObjectsResponse:
        return self.list_objects(limit=limit, cursor=cursor, include_object=True)

    def list_all_objects(
        self,
        include_object: Optional[bool] = False,
        include_status: Optional[bool] = False,
    ) -> Generator[Object, None, None]:
        """List all objects in the object store. Optionally stop at a specified limit.

        Returns a generator that producing objects"""
        cursor = None

        while True:
            list_objects_response = self.list_objects(
                limit=512,
                cursor=cursor,
                include_object=include_object,
                include_status=include_status,
            )
            cursor = list_objects_response.pagination.next

            for obj in list_objects_response.objects:
                yield obj

            if not cursor:
                break

    def get_all_objects(self) -> Generator[Object, None, None]:
        return self.list_all_objects(include_object=True)

    def get_objects_by_id(
        self, ids: List[str], skip_missing_objects: bool = True
    ) -> List[Object]:
        with ThreadPoolExecutor(max_workers=CONNECTION_POOL_SIZE) as executor:
            objects = list(
                executor.map(
                    lambda id: self.get_object(id),
                    ids,
                )
            )
            if skip_missing_objects:
                objects = [obj for obj in objects if obj]
            return objects

    def get_object(self, id: str) -> Optional[Object]:
        try:
            return Object(**self.client.request("GET", f"objects/{id}"))
        except requests.exceptions.HTTPError as http_error:
            if http_error.response.status_code == 404:
                return None
            raise

    def upsert_objects(self, objects: List[Union[Object, Dict]]) -> BatchOperation:
        def upsert_object(object):
            try:
                return self._upsert_object(object)
            except Error as e:
                object._ops_status = {"state": "error", "exception": e}
                return object

        success = []
        failures = []
        with ThreadPoolExecutor(max_workers=CONNECTION_POOL_SIZE) as executor:
            for object_batch in chunked(objects, 10_000):
                for obj in executor.map(upsert_object, object_batch):
                    if obj._ops_status.get("state") == "OK":
                        success.append(obj)
                    else:
                        failures.append(obj)

                if len(failures) == 0:
                    print(
                        f"Successfully upserted {len(success)} {'objects' if len(success) > 1 else 'object'}.",
                        file=sys.stderr,
                    )
                else:
                    print(
                        f"Successfully upserted {len(success)} {'objects' if len(success) > 1 else 'object'} with {len(failures)} {'failures' if len(failures) > 1 else 'failure'}.",
                        file=sys.stderr,
                    )

        return BatchOperation(
            success=success,
            failures=failures,
        )

    def delete_objects(self, objects: List[Object]) -> BatchOperation:
        def delete_object(object):
            try:
                return self._delete_object(object)
            except Error as e:
                object._ops_status = {"state": "error", "exception": e}
                return object

        with ThreadPoolExecutor(max_workers=CONNECTION_POOL_SIZE) as executor:
            success = []
            failures = []

            for obj in executor.map(delete_object, objects):
                if obj._ops_status.get("state") == "OK":
                    success.append(obj)
                else:
                    failures.append(obj)

            return BatchOperation(
                success=success,
                failures=failures,
            )

    def _upsert_object(self, object: Union[Object, Dict]) -> "Object":
        if isinstance(object, dict):
            if "id" in object and "object" in object:
                object = Object(id=object["id"], object=object["object"])
            else:
                object = Object(object=object)

        if object.id:
            obj_response = self.client.request(
                "PUT",
                f"objects/{object.id}",
                data=object.object,
            )
            object.id = obj_response["id"]
        else:
            obj_response = self.client.request("POST", "objects", data=object.object)
            object.id = obj_response["id"]

        if not object._ops_status:
            object._ops_status = {}

        object._ops_status["state"] = "OK"
        return object

    def _delete_object(self, object: Union[Object, str]) -> "Object":
        if isinstance(object, str):
            object = Object(id=object)

        obj_response = self.client.request("DELETE", f"objects/{object.id}")
        if not object._ops_status:
            object._ops_status = {}
        object._ops_status["state"] = "OK"
        return object


@dataclass
class Index:
    client: Client
    id: str
    index_type: str
    version: str
    fields: Dict[str, Any]

    def __str__(self):
        return f"Index(id={self.id})"

    def __repr__(self):
        return self.__str__()

    def describe(self):
        index_response = self.client.request("GET", f"indexes/{self.id}")
        return index_response

    def update(self, new_fields):
        raise NotImplementedError
        # return self.client.request(
        #     "PUT", f"indexes/{self.id}", data=new_fields
        # )

    def delete(self):
        return self.client.request("DELETE", f"indexes/{self.id}")

    def finetune(self, feedback: List[Dict[str, Any]]) -> "Index":
        print("Creating a finetuned index...", file=sys.stderr)
        finetuned_create_index = self.client.request(
            "POST",
            "indexes",
            data={
                "configuration": {
                    "index_type": {
                        **(
                            {"name": self.index_type}
                            if isinstance(self.index_type, str)
                            else self.index_type
                        ),
                        "finetuning": {"base_index_id": self.id, "feedback": feedback},
                    },
                    "fields": _preprocess_fields(self.fields),
                }
            },
        )
        if not finetuned_create_index:
            raise ValueError("Failed to create finetuned index!")
        else:
            print(
                f"Finetuned index {finetuned_create_index['id']} successfully created.",
                file=sys.stderr,
            )
            return Index(
                client=self.client,
                id=finetuned_create_index["id"],
                index_type=self.index_type,
                version=self.version,
                fields=self.fields,
            )
            
    def autofinetune(self, feedback: List[Dict[str, Any]]) -> "Index":
        print("Creating a autofinetuned index...", file=sys.stderr)
        autofinetuned_create_index = self.client.request(
            "POST",
            "indexes",
            data={
                "configuration": {
                    "index_type": {
                        **(
                            {"name": self.index_type}
                            if isinstance(self.index_type, str)
                            else self.index_type
                        ),
                        "finetuning": {"base_index_id": self.id, "feedback": feedback},
                    },
                    "fields": _preprocess_fields(self.fields),
                }
            },
        )
        if not autofinetuned_create_index:
            raise ValueError("Failed to create autofinetuned index!")
        else:
            print(
                f"Autofinetuned index {autofinetuned_create_index['id']} successfully created.",
                file=sys.stderr,
            )
            return Index(
                client=self.client,
                id=autofinetuned_create_index["id"],
                index_type=self.index_type,
                version=self.version,
                fields=self.fields,
            )

    def status(
        self, status_type: Optional[str] = None, watch: bool = False
    ) -> Dict[str, Any]:
        if watch:
            repeat = 1000
        else:
            repeat = 1

        for _ in range(repeat):
            try:
                obj_status = self.client.request(
                    "GET",
                    f"indexes/{self.id}/status{f'/{status_type.lower()}'if status_type else ''}",
                )
                indexing_status = obj_status.get("status")

                if watch:
                    live = indexing_status.get("LIVE", 0) + indexing_status.get("READY", 0)
                    error = indexing_status["ERROR"]
                    pending = indexing_status.get("PENDING", 0) + indexing_status.get(
                        "UPLOADED", 0
                    )
                    total = max(pending + indexing_status["PROCESSING"] + live + error, 1)

                    progress = int(((live + error) / total) * 100)
                    progress_live = int((live / total) * 100)
                    progress_error = int((error / total) * 100)

                    progress_bar = (
                        "["
                        + "#" * progress_live
                        + "X" * progress_error
                        + "-" * (100 - progress)
                        + "]"
                    )
                    print(f"Progress: {progress_bar} {progress}%", end="\r")

                    if progress == 100:
                        print()
                        break
                    time.sleep(5)
            except requests.RequestException as e:
                if e.response.status_code == 404:
                    print(
                        f"Index {self.id} not initialized yet, sleeping for 30 seconds.",
                        file=sys.stderr,
                    )
                    time.sleep(30)

        return obj_status

    def search(
        self,
        query: str,
        filter_query: Optional[str] = None,
        object_fields: Optional[str] = None,
        result_fields: Optional[str] = None,
        ranking_expr: Optional[str] = None,
        limit: Optional[int] = None,
        relevance_cutoff: Optional[str] = None
    ) -> Dict[str, Any]:
        params = {
            "query": query,
            "filter_query": filter_query,
            "object_fields": object_fields,
            "result_fields": result_fields,
            "ranking_expr": ranking_expr,
            "limit": limit,
            "relevance_cutoff": relevance_cutoff
        }
        return self.client.request("GET", f"indexes/{self.id}/search", data=params)

@dataclass
class Indexes:
    """Class for /indexes APIs"""

    client: ObjectiveClient

    def list_indexes(
        self, limit: Optional[int] = None, cursor: Optional[str] = None
    ) -> List["Index"]:
        data = {}
        if limit:
            data["limit"] = limit
        if cursor:
            data["cursor"] = cursor
        indexes = self.client.request("GET", "indexes", data=data).get("indexes", [])
        with ThreadPoolExecutor(max_workers=CONNECTION_POOL_SIZE) as executor:
            return list(
                executor.map(self.get_index, [index["id"] for index in indexes])
            )

    def create_index(
        self,
        index_type: Union[str, Dict[str, Any]],
        fields: Dict[str, Any],
        version: str = None,
    ) -> "Index":
        # Support passing the index_type as a string for usability.
        # In the case it's a string, map it to a dictionary
        if isinstance(index_type, str):
            index_type = {"name": index_type}

        print("Creating index...", file=sys.stderr)
        index_create = self.client.request(
            "POST",
            "indexes",
            data={
                "configuration": {
                    "index_type": index_type,
                    "fields": _preprocess_fields(fields),
                }
            },
        )
        if not index_create:
            raise ValueError("Failed to create index!")
        else:
            print(f"Index {index_create['id']} successfully created.", file=sys.stderr)
            return Index(
                client=self.client,
                id=index_create["id"],
                index_type=index_type,
                version=version,
                fields=fields,
            )

    def get_index(self, id: str) -> "Index":
        index_response = self.client.request("GET", f"indexes/{id}")
        index_settings = index_response["settings"]
        return Index(
            client=self.client,
            id=id,
            index_type=index_settings["index_type"]["template_name"],
            version=index_settings["index_type"]["template_version"],
            fields=index_settings["fields"],
        )

    def delete_index(self, id: str):
        return self.client.request("DELETE", f"indexes/{id}")

    def __getitem__(self, id: str) -> "Index":
        return self.get_index(id)
