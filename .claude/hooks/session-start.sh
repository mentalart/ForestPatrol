#!/bin/bash
# Старт облачной сессии Claude Code: всё, что нужно для работы с игрой, готово до первой команды.
#   · Playwright для ботов (браузер в облаке уже есть — /opt/pw-browsers; ставится только пакет, если его нет);
#   · зависимости инструментов сценариста (tools/script: acorn, docx) — если не стоят;
#   · прототип index.html (склейка proto/) и релиз zlataya_cep_final06.html (в git его нет) — собраны.
# Идемпотентно: повторный запуск ничего не переустанавливает, сборка — ~10 с. Не в облаке (на своём компьютере) — ничего не делает.
set -euo pipefail
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

if ! node -e "require('./tools/tests/pw.js')" >/dev/null 2>&1; then
  echo "session-start: ставлю playwright (без скачивания браузера)"
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i -g playwright >/dev/null 2>&1 || echo "session-start: playwright не поставился — боты не запустятся"
fi
if [ -f tools/script/package.json ] && [ ! -d tools/script/node_modules ]; then
  (cd tools/script && npm install --no-audit --no-fund >/dev/null 2>&1) || echo "session-start: tools/script — npm install не прошёл"
fi
if python3 zlataya_cep/build/build_final.py > /tmp/session-start-build.log 2>&1; then
  echo "session-start: релиз собран ($(tail -1 /tmp/session-start-build.log | grep -o "voice lines.*"))"
else
  echo "session-start: сборка релиза остановилась — см. /tmp/session-start-build.log"; tail -3 /tmp/session-start-build.log
fi
echo "session-start: ветка $(git rev-parse --abbrev-ref HEAD) — в начале работы: git fetch origin main && git merge origin/main"
