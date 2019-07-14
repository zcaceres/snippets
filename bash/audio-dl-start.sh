#! /bin/bash

source /opt/anaconda3/etc/profile.d/conda.sh
cd fastai-audio &&
conda activate fastai-audio &&
jupyter lab --port=8081 &
