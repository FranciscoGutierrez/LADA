# Meteor Commands
## Dealing with database
``` Bash
# Database stuff
meteor mongo
show dbs
db.courses.find()
# Destroy database and reload proyect dependencies and stuff...
meteor reset
```
# MongoDB Commands

mongoimport --db meteor --collection courses --file courses.json --host=127.0.0.1:3001

# Python Converters

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

import csvmapper
jsonfile = open('courses.json', 'w')
# parser instance
parser = csvmapper.CSVParser('courses.csv', hasHeader=True)
# conversion service
converter = csvmapper.JSONConverter(parser)
print converter.doConvert(pretty=False)
jsonfile.write(converter.doConvert(pretty=False))
```
