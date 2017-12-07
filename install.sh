#!/usr/bin/env bash
set -e

dir=~/Library/Application\ Support/Mozilla/NativeMessagingHosts/
mkdir -p "$dir"

ln -sf "$PWD/browser_complete_server_ff.json" "$dir/browser_complete_server.json"
