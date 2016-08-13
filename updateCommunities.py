#!/bin/python3
import json
import urllib.request
import yaml

url = "https://api.freifunk.net/data/ffSummarizedDir.json"
request = urllib.request.Request(url)
response = urllib.request.urlopen(request).read().decode('utf-8')
data = json.loads(response)

communities = dict()

for community in data:
    communities[community] = {
        "name": data[community]['name'],
        "url": data[community]['url']
    }

with open('communities.yaml', 'w', encoding = "utf-8") as yaml_file:
    dump = yaml.dump(communities, default_flow_style = False,
                     allow_unicode = True, encoding = None)
    yaml_file.write(dump)
