#!/bin/sh
# Один бот: tools/tests/run_one.sh t41v [путь к index.html]
# BOT_TIMEOUT — предел на бота в секундах (по умолчанию 900 или «// @timeout=N» в файле бота; превышение — код 124, regress.sh повторит бота один раз).
# Тело — в функции: sh читает скрипт по ходу выполнения, правка посреди прогона ломала его (код 127).
main() {
set -e
D=${TESTS_DIR:-$(cd "$(dirname "$0")" && pwd)}   # regress.sh запускает снимок скрипта из временной папки и передаёт папку тестов
N=${1%.js}; HTML=${2:-$D/../../index.html}
[ -n "$2" ] || python3 "$D/../proto.py" >/dev/null   # прототип — склейка частей proto/
# свой предел у тяжёлого бота — строка «// @timeout=1800» в его файле (замеры пикселей, длинные ролики); BOT_TIMEOUT задаёт общий
TO=$(grep -o "^// *@timeout=[0-9]*" "$D/bots/$N.js" 2>/dev/null | head -1 | grep -o "[0-9]*$" || true)
T=""; command -v timeout >/dev/null 2>&1 && T="timeout ${BOT_TIMEOUT:-${TO:-900}}"
python3 "$D/mk.py" "$D/bots/$N.js" "$D/out/$N.json"
$T node "$D/run.js" "$HTML" "$D/out/$N.json"
}
main "$@"; exit $?
