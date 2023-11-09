import requests
import json

# Replace this line with your API key. You can find this in the onboarding
api_key = ""


headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
}

objects = [
    {
        "description": "It was the best of times, it was the worst of times.",
        "img_url": "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6",
    },
    {
        "description": "All happy families are alike; each unhappy family is unhappy in its own way.",
        "img_url": "https://images.unsplash.com/photo-1623609163841-5e69d8c62cc7",
    },
    # ... rest of objects
]


def create_object(obj):
    """Simple helper method to push Objects to the API"""
    url = f"https://api.objective.inc/v1/objects"
    response = requests.post(url, headers=headers, json=obj)
    return response


created_objects = []  # A list to store the IDs of created Objects
for obj in objects:
    api_response = create_object(obj)
    if api_response.status_code == 202:
        created_objects.append(api_response.json()["id"])
        print(f"Created object with ID: {api_response.json()['id']}")
    else:
        print(f"API unexpectedly returned response code: {api_response.status_code}")
