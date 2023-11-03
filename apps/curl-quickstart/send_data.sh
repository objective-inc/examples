#!/bin/bash

# Replace this line with your Index ID. You can find this in the onboarding
INDEX_ID=""

# Replace this line with your API key. You can find this in the onboarding
API_KEY=""

# The JSON data you want to send
DATA='{"title": "My data title", "id": 123}'

# API endpoint
URL="https://api.kailualabs.com/v1/catalogs/$INDEX_ID/objects"

# Make the POST request
RESPONSE=$(curl -s -X POST "$URL" \
    -H "Apikey: $API_KEY" \
    -H "Content-Type: application/json" \
    -d "$DATA")

# Check if the request was successful
if [ $? -eq 0 ]; then
    echo "Data: $RESPONSE"
else
    echo "Failed to send data"
fi