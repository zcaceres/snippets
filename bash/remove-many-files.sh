#! /usr/bin/env bash
set -euxo pipefail
FILES_TO_REMOVE=$1

find . -name ${FILES_TO_REMOVE} | xargs rm -f
