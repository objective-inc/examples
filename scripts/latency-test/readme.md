# Objective load test

This code show how to run a simple load test with [Locust](https://locust.io/) against the Objective API

## Setup

Create a `.env` file with your API key:
```
API_KEY=sk_xxx
```

Create a virtual environment, and install locust:
```
$ uv venv
$ source .venv/bin/activate
$ uv pip install locust
```

## Running the test

Run the locust test:
```
locust --host https://api.objective.inc
```