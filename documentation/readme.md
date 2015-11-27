# Documentation

The following are useful scripts for the development/deployment of the dashboard.

## Dealing with database

``` Bash
# Going into the database and get some data
meteor mongo
show dbs
db.courses.find()
# Destroy database, reload project dependencies and stuff from scratch.
meteor reset
```
## Import Data
Basic **mongoimport** command.
``` Bash
mongoimport --db meteor --collection courses --file courses.json --host=127.0.0.1:3001
```

## Python Converters
If data is on CSV this is an easy way to convert it to JSON, and then import.
### Option 1
``` Python
import csv
import json

csvfile = open('courses.csv', 'r')
jsonfile = open('courses.json', 'w')

fieldnames = ("alpha","beta","skewness","_id","name")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')
```
### Option 2
``` Python
import csvmapper
jsonfile = open('courses.json', 'w')
# parser instance
parser = csvmapper.CSVParser('courses.csv', hasHeader=True)
# conversion service
converter = csvmapper.JSONConverter(parser)
print converter.doConvert(pretty=False)
jsonfile.write(converter.doConvert(pretty=False))
```

## Communication

Clients use **WebSocket** as communication channel with the prediction server, when asking for a prediction the client uses the following format:

```json
[
  {
    "requestId": "5645f7f7ef0bde57344c84de",
    "student": [
      {
        "id": "5645f7f70a7cd6ab830e8722",
        "gpa": 7.0793,
        "performance": 0.6,
        "compliance": 3
      }
    ],
    "courses": [
      {
        "id": "5645f7f73077f65af76df45a",
        "compliance": 2
      },
      {
        "id": "5645f7f7fccab1b5dd662a4b",
        "compliance": 5
      },
      {
        "id": "5645f7f7e7b8050367ef5cff",
        "compliance": 5
      },
      {
        "id": "5645f7f70ea9b237c0039330",
        "compliance": 5
      }
    ],
    "data": [
      {
        "from": 2009,
        "to": 2015,
        "program": true,
        "sylabus": true,
        "evaluation": false,
        "instructors": true,
        "compliance": 2
      }
    ]
  }
]

```

To change the prediction server **URL** there is a special file named **websocket.js** at the client folder.

## Architecture Overview

<img src="http://s19.postimg.org/g3gwral5f/arq1.png">
