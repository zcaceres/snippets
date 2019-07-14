#! /usr/bin/env bash
set -euxo pipefail
PROFILE=$1
BUCKET=$2

aws s3 --profile ${PROFILE} ls s3://${BUCKET} --recursive | wc -l 
