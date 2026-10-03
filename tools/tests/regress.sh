#!/bin/sh
# Полный регресс: все боты из regress_list.txt параллельно (JOBS, по умолчанию 3).
# Вывод каждого — out/out_<бот>.txt; в конце — сводка: ошибки страницы и последний результат («> …») каждого бота.
# Использование: tools/tests/regress.sh [путь к index.html]; другой список — LIST=путь (например regress_list_final.txt для релизной сборки;
# несколько через пробел — LIST="regress_list_final.txt regress_list_final07.txt" для final07),
# свои боты — BOTS="бот бот …". Какие боты нужны для текущих правок — tools/tests/affected.py (полный регресс — только когда он скажет).
# Время каждого бота — out/times.txt (секунды).
D=$(cd "$(dirname "$0")" && pwd)
[ -n "$1" ] || python3 "$D/../proto.py" >/dev/null   # прототип — склейка частей proto/
HTML=$(cd "$(dirname "${1:-$D/../../index.html}")" && pwd)/$(basename "${1:-index.html}")
J=${JOBS:-3}
mkdir -p "$D/out"; rm -f "$D/out/regress_progress.txt" "$D/out/times.txt"
LISTF=${LIST:-$D/regress_list.txt}
if [ -n "$BOTS" ]; then LIST=$(echo "$BOTS" | tr ' ' '\n' | grep .); else LIST=$(cat $LISTF | grep -v '^#' | tr ' ' '\n' | grep . | awk '!s[$0]++'); fi   # LIST — один файл или несколько через пробел
echo "$LIST" | xargs -P "$J" -I{} sh -c "s=\$(date +%s); '$D/run_one.sh' {} '$HTML' > '$D/out/out_{}.txt' 2>&1; r=\$?; echo \"{} \$((\$(date +%s)-s))\" >> '$D/out/times.txt'; echo \"{} rc=\$r\" >> '$D/out/regress_progress.txt'"
bad=0
for n in $LIST; do
  f="$D/out/out_$n.txt"; e=$(grep -c "EVAL ERROR\|PAGEERROR" "$f" 2>/dev/null); rc=$(grep "^$n rc=" "$D/out/regress_progress.txt" | cut -d= -f2)
  [ "$rc" != "0" ] || [ "$e" != "0" ] && { bad=$((bad+1)); mark="!!"; } || mark="  "
  printf "%s %-8s rc=%s err=%s | %s\n" "$mark" "$n" "$rc" "$e" "$( (grep "^> " "$f" || tail -1 "$f") | tail -1 | cut -c1-140)"
done
echo "ALLDONE, с ошибками: $bad" | tee -a "$D/out/regress_progress.txt"
[ "$bad" = "0" ]
