#! /usr/bin/env bash
set -euxo pipefail

# optionally build step here: yarn run build
aws s3 sync build/ s3://my-bucket-here --acl public-read
