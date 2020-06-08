#! /usr/bin/env bash
set -euo pipefail

cat parsed-transcript.json | jq -r 'map(.phrase)' | pbcopy
