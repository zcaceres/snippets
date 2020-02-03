#! /bin/bash/env
set -eo pipefail

# Take json and map a value (here it's .name). Output to intermediate JSON
cat tmp.json | jq 'map(.name)' >> keywords.json
# dump to txt
cat keywords.json | jq --raw-output '.[]' >> keywords.txt
