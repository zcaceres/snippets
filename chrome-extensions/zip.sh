#!/bin/bash
set -euo pipefail

echo '==================='
echo 'ZIPPING EXTENSION'
echo '==================='

cd ./dist && zip -r clay-linkedin-extension ./ && mv clay-linkedin-extension.zip ../

echo '==================================='
echo 'Ready: clay-linkedin-extension.zip'
echo '==================================='
echo "Don't forget to bump the version number in the manifest.json"
