import os
import random
import itertools
from locust import HttpUser, TaskSet, task, between
from dotenv import load_dotenv

from words import _en_us_words

load_dotenv()


NGRAM_SIZE = 2
API_URL = "/v1/indexes/idx_Akx14uLEjjqy/search"
API_KEY = os.getenv("API_KEY")


def generate_ngrams(words, n):
    return list(itertools.combinations(words, n))


class UserBehavior(TaskSet):
    @task
    def search_api(self):
        ngram = random.choice(generate_ngrams(_en_us_words[:100], NGRAM_SIZE))
        query_param = " ".join(ngram)
        headers = {"Authorization": f"Bearer {API_KEY}"}
        self.client.get(f"{API_URL}?query={query_param}", headers=headers)


class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)


if __name__ == "__main__":
    import os

    os.system("locust -f locustfile.py")
