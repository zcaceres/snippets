#! /usr/bin/env bash
set -euxo pipefail

aws dynamodb list-tables
# --endpoint-url http://localhost:8000
