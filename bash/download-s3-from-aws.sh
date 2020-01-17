#!/usr/bin/env bash
set -euo pipefail

cat ./buckets.txt | xargs -P 4 -I % aws s3 cp s3://some-prefix-here/% % --recursive --profile my-profile 
