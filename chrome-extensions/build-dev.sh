#! /usr/bin/env bash
set -euo pipefail

echo '=============================================================================='
echo 'Rebuilding development extension. YOU SHOULD NOT USE THIS SCRIPT IN PRODUCTION'
echo '=============================================================================='

# This opts out of any optimization by webpack!
npx webpack --mode none

# Make sure we have most up-to-date manifest and assets
cp ./src/manifest.json ./dist/manifest.json
cp -r ./src/assets  ./dist/assets
