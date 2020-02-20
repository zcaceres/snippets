#! /usr/bin/env bash
set -euo pipefail

ffmpeg -i $1 -ac 1 -ar 8000 -acodec pcm_u8 "downsampled-$1"

