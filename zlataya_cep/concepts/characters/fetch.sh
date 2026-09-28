#!/usr/bin/env bash
# Скачивает концепт-листы из concepts.json в эту папку (proshka_A.png … zvenyshko_B.png).
# Нужен доступ к d8j0ntlcm91z4.cloudfront.net.
set -euo pipefail
cd "$(dirname "$0")"
python3 -c 'import json;[print(c["name"],c["url"]) for c in json.load(open("concepts.json"))]' |
while read -r name url; do
  [ -s "$name.png" ] && { echo "skip $name"; continue; }
  curl -fsSL --retry 3 -o "$name.png" "$url" && echo "ok   $name"
done
