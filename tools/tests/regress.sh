#!/bin/sh
# Полный регресс: все боты из regress_list.txt параллельно (JOBS, по умолчанию 3).
# Вывод каждого — out/out_<бот>.txt; в конце — сводка: ошибки страницы и последний результат («> …») каждого бота.
# Использование: tools/tests/regress.sh [путь к index.html]
D=$(cd "$(dirname "$0")" && pwd)
HTML=$(cd "$(dirname "${1:-$D/../../index.html}")" && pwd)/$(basename "${1:-index.html}")
J=${JOBS:-3}
mkdir -p "$D/out"; rm -f "$D/out/regress_progress.txt"
LIST=$(grep -v '^#' "$D/regress_list.txt" | tr ' ' '\n' | grep .)
echo "$LIST" | xargs -P "$J" -I{} sh -c "'$D/run_one.sh' {} '$HTML' > '$D/out/out_{}.txt' 2>&1; echo \"{} rc=\$?\" >> '$D/out/regress_progress.txt'"
bad=0
for n in $LIST; do
  f="$D/out/out_$n.txt"; e=$(grep -c "EVAL ERROR\|PAGEERROR" "$f" 2>/dev/null); rc=$(grep "^$n rc=" "$D/out/regress_progress.txt" | cut -d= -f2)
  [ "$rc" != "0" ] || [ "$e" != "0" ] && { bad=$((bad+1)); mark="!!"; } || mark="  "
  printf "%s %-8s rc=%s err=%s | %s\n" "$mark" "$n" "$rc" "$e" "$( (grep "^> " "$f" || tail -1 "$f") | tail -1 | cut -c1-140)"
done
echo "ALLDONE, с ошибками: $bad" | tee -a "$D/out/regress_progress.txt"
[ "$bad" = "0" ]
