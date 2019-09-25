#! /usr/bin/env bash
set -euxo pipefail

aws dynamodb create-table --table-name jobs-dev --endpoint-url http://localhost:8000 --key-schema AttributeName=userid,KeyType=HASH AttributeName=jobid,KeyType=RANGE --attribute-definitions AttributeName=userid,AttributeType=S AttributeName=jobid,AttributeType=S --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
