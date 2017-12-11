#!/usr/bin/env bash
set -e

rm -f dist.zip
(
    set -e
    cd ext/
    zip ../dist.zip *
)
