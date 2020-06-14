#! /usr/bin/env bash
set -euxo pipefail 


pdfgrep --ignore-case -r --include "*.pdf" dispute
