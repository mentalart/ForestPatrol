#!/bin/bash
# run_audio.sh [сценарий...] — замер громкости шин музыки/звуков/голоса (анализаторы на JM.mus/sfx/vox/lim, probe_aud.js).
# Сценарии — audio/*.js (по умолчанию все); вывод — $BOSS_AUDIT_OUT/audio_<имя>.txt; сводка — python3 audio_table.py.
# Нужен свободный процессор: при нагрузке цикл отрисовки встаёт, и музыка получается тише на десятки дБ.
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(cd "$HERE/../.." && pwd)"
OUT="${BOSS_AUDIT_OUT:-/tmp/boss_audit}"; mkdir -p "$OUT"
REL="${RELEASE:-$ROOT/zlataya_cep/zlataya_cep_final06.html}"; PROBE="$OUT/rel_probe_aud.html"
python3 "$HERE/make_probe.py" --audio "$REL" "$PROBE" >/dev/null
LIST="$@"; [ -n "$LIST" ] || LIST="$(cd "$HERE/audio" && ls *.js | sed 's/\.js$//')"
for n in $LIST; do
  python3 "$ROOT/tools/tests/mk.py" "$HERE/audio/$n.js" "$OUT/audio_$n.steps.json" >/dev/null
  ( cd "$ROOT" && NOSHOTS=1 timeout "${TO:-900}" node tools/tests/run.js "$PROBE" "$OUT/audio_$n.steps.json" > "$OUT/audio_$n.txt" 2>&1 ) || echo "$n: код $?"
  echo "$n → $OUT/audio_$n.txt"
done
