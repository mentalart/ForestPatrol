#!/bin/bash
# run_bot.sh <бот> [метка] — гонит существующий бот tools/tests/bots/<бот>.js на релизе с перехватчиком;
# лог событий — $BOSS_AUDIT_OUT/<метка>.json (читает metrics.py), вывод бота — <метка>.txt.
# Окружение: BOSS_AUDIT_OUT (по умолчанию /tmp/boss_audit), TO — таймаут, с (1500), SHOTS=1 — кадры в $OUT/frames/<метка>,
# RELEASE — путь к релизу (по умолчанию zlataya_cep/zlataya_cep_final06.html; собрать: python3 zlataya_cep/build/build_final.py).
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(cd "$HERE/../.." && pwd)"
OUT="${BOSS_AUDIT_OUT:-/tmp/boss_audit}"; mkdir -p "$OUT/bots"
B="$1"; L="${2:-$1}"; REL="${RELEASE:-$ROOT/zlataya_cep/zlataya_cep_final06.html}"
[ -n "$B" ] || { echo "usage: run_bot.sh <бот> [метка]"; exit 2; }
PROBE="$OUT/rel_probe.html"
if [ ! -f "$PROBE" ] || [ "$REL" -nt "$PROBE" ] || [ "$HERE/probe.js" -nt "$PROBE" ]; then python3 "$HERE/make_probe.py" "$REL" "$PROBE" >/dev/null; fi
{ printf '//@@ wait=300\nPR.reset();PR.on=true;"on"\n'; cat "$ROOT/tools/tests/bots/$B.js"; printf '\n//@@\nPR.on=false;PR.dump()\n'; } > "$OUT/bots/$L.js"
python3 "$ROOT/tools/tests/mk.py" "$OUT/bots/$L.js" "$OUT/$L.steps.json" >/dev/null
if [ "$SHOTS" = "1" ]; then export SHOTS="$OUT/frames/$L" SHOT_TIMEOUT=60000; mkdir -p "$SHOTS"; else export NOSHOTS=1; unset SHOTS; fi
( cd "$ROOT" && timeout "${TO:-1500}" node tools/tests/run.js "$PROBE" "$OUT/$L.steps.json" > "$OUT/$L.txt" 2>&1 ) || echo "бот завершился с кодом $? (лог всё равно разбираем)"
python3 - "$OUT/$L.txt" "$OUT/$L.json" "$L" <<'PY'
import json, sys
t = open(sys.argv[1], encoding='utf-8').read().split('\n')
js = [l for l in t if l.startswith('> [{') or l == '> []']
if js:
    open(sys.argv[2], 'w').write(js[-1][2:])
    print(sys.argv[3], 'событий', len(json.loads(js[-1][2:])))
else:
    print(sys.argv[3], 'ЛОГА НЕТ — смотри', sys.argv[1])
PY
