#!/usr/bin/env bash

for pid in $(pgrep -f $1); do kill -9 $pid; done
