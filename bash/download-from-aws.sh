#!/usr/bin/env bash
set -euo pipefail

cat ./lambdas.txt | xargs -I % aws lambda get-function --function-name % --query 'Code.Location' --profile clay --region us-west-2 | xargs -0 wget
