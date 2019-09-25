#! /usr/bin/env bash
set -euxo pipefail

aws dynamodb describe-table --table-name jobs-dev
# --endpoint-url http://localhost:8000
