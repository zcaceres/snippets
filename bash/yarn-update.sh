#!/bin/bash
set -eo pipefail

cowsay "Updating Yarn..."
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
cowsay "We're done!"

