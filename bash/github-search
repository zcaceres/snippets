#! /usr/bin/env bash
set -eo pipefail

if ! [ -x "$(command -v jq)" ]; then
	brew install jq
fi	

curl -s https://api.github.com/search/repositories\?q\=${1:-'react'} | jq

