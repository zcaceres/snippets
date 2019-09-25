#! /usr/bin/env bash
set -euxo pipefail

aws dynamodb query \
    --table-name jobs-dev \
    --key-condition-expression "userid = :user" \
    --expression-attribute-values  '{":user":{"S":"1"}}'
