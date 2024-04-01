import os
import json

from objective import Client


with open(os.path.expanduser("emoji-urls.jsonl"), "r") as f:
    lines = f.readlines()
objs = [json.loads(line) for line in lines] 

# Setup Objective API client
client = Client(api_key="API KEY HERE") 

# Upload JSON objects
client.object_store.upsert_objects(objs) 

# Create multimodal index
index = client.indexes.create_index(
    index_type="multimodal",
    fields={"crawlable": ["url"]}
) 

# Check indexing status
index.status()
