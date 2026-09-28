#!/bin/sh
# Один бот: tools/tests/run_one.sh t41v [путь к index.html]
set -e
D=$(cd "$(dirname "$0")" && pwd)
N=${1%.js}; HTML=${2:-$D/../../index.html}
T=""; command -v timeout >/dev/null 2>&1 && T="timeout 900"
python3 "$D/mk.py" "$D/bots/$N.js" "$D/out/$N.json"
$T node "$D/run.js" "$HTML" "$D/out/$N.json"
