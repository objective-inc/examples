image_url = "https://d11p8vtjlacpl4.cloudfront.net/yummly/img"

import os
import json

# Path to the metadata folder
metadata_path = os.path.expanduser('~/Downloads/Yummly28K/metadata27638')

# Path to the mapping file
mapping_file_path = os.path.expanduser('~/Downloads/Yummly28K/data_records_27638.txt')

# Read the mapping file and create a dictionary
with open(mapping_file_path, 'r') as f:
    mapping = dict(line.strip().split('\t') for line in f)


fields = [
    "image_url",
    "totalTimeInSeconds",
    "prepTime",
    "id",
    "attributes",
    "flavors",
    "yield",
    "numberOfServings",
    "rating",
    "prepTimeInSeconds",
    "name",
    "ingredientLines",
    "totalTime"
]


objs = []
# Iterate over all json files in the metadata folder
for filename in os.listdir(metadata_path):
    if filename.endswith('.json'):
        with open(os.path.join(metadata_path, filename), 'r+') as f:
            data = json.load(f)
            # Add the image_url field to the json object
            data['image_url'] = image_url + mapping[data['id']] + ".jpg"
            objs.append({field: data.get(field, None) for field in fields})

with open(os.path.expanduser('~/Downloads/Yummly28K/yummly_mapped.jsonl'), 'w') as outfile:
    for obj in objs:
        json.dump(obj, outfile)
        outfile.write('\n')
