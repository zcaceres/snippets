#! /usr/bin/env bash
set -euo pipefail

echo '==================='
echo 'Building Extension'
echo '==================='

# Build an optimized + minified version of the app
npx webpack --mode production

echo 'Copying Manifest...'
# Make sure we have most up-to-date manifest and assets
cp ./src/manifest.json ./dist/manifest.json
echo 'Copying Assets...'
cp -r ./src/assets  ./dist/assets

echo '==================='
echo 'FINISHED BUILDING'
echo '==================='
