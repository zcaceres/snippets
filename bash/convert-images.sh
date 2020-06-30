#! /usr/bin/env bash
set -euo pipefail

# this assumes you have ImageMagick installed. If not... brew install imagemagick

# download our logos (you must be set up on the AWS CLI)
aws s3 cp s3://some-s3-bucket-here . --recursive

# resize all files to 70x70
mkdir resized

for file in *.png; do
  convert "$file" -resize 70x70x "resized/${file%.png}70x70x.png"
done


