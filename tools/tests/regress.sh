#!/bin/sh
# Регресс: боты из списка параллельно (JOBS, по умолчанию 3).
# Вывод каждого — out/out_<бот>.txt; в конце — сводка: ошибки страницы и последний результат («> …») каждого бота.
# Использование: tools/tests/regress.sh [путь к index.html]; другой список — LIST=путь (например regress_list_final.txt для релизной сборки;
# несколько через пробел — LIST="regress_list_final.txt regress_list_final07.txt" для final07),
# свои боты — BOTS="бот бот …". Какие боты нужны для текущих правок — tools/tests/affected.py (полный регресс — только когда он скажет).
#   SHARD=I/N — только своя доля списка (каждый N-й бот, как affected.py --shard; CI делит полный регресс на машины).
#   RETRY=0   — не повторять. По умолчанию бот, упавший не из-за игры — таймаут (код 124), «команда не найдена» (127), убит (137/139),
#               браузер или страница закрылись, — повторяется один раз; прошёл со второго раза — «~~» в сводке и retry в results.tsv
#               (неустойчивость видна, но не валит проверку). Ошибки самих проверок (FAIL, EVAL ERROR) не повторяются никогда.
# Время каждого бота — out/times.txt (секунды); итог по ботам — out/results.tsv (бот, код, ошибок, секунд, код первой попытки) —
# его собирает CI и сводка неустойчивых ботов (tools/tests/flaky.py).
# Тело — в функции: sh читает скрипт по ходу выполнения, и правка или смена ветки посреди прогона ломала его (код 127).
main() {
D=$(cd "$(dirname "$0")" && pwd)
[ -n "$1" ] || python3 "$D/../proto.py" >/dev/null   # прототип — склейка частей proto/
HTML=$(cd "$(dirname "${1:-$D/../../index.html}")" && pwd)/$(basename "${1:-index.html}")
J=${JOBS:-3}
O="$D/out"
mkdir -p "$O"; rm -f "$O/regress_progress.txt" "$O/times.txt" "$O/results.tsv"
LISTF=${LIST:-$D/regress_list.txt}
if [ -n "$BOTS" ]; then L=$(echo "$BOTS" | tr ' ' '\n' | grep .); else L=$(cat $LISTF | grep -v '^#' | tr ' ' '\n' | grep . | awk '!s[$0]++'); fi   # LIST — один файл или несколько через пробел
if [ -n "$SHARD" ]; then si=${SHARD%/*}; sn=${SHARD#*/}; L=$(echo "$L" | awk -v i="$si" -v n="$sn" '(NR-1)%n==i-1'); echo "Доля $SHARD: $(echo "$L" | grep -c .) ботов"; fi
[ -n "$(echo "$L" | grep .)" ] || { echo "ALLDONE, с ошибками: 0 (ботов нет)" | tee -a "$O/regress_progress.txt"; return 0; }
# снимок run_one.sh — на время прогона (его правка или смена ветки не задевают идущие боты)
R=$(mktemp); cp "$D/run_one.sh" "$R"
run() { echo "$1" | xargs -P "$J" -I{} sh -c "s=\$(date +%s); TESTS_DIR='$D' sh '$R' {} '$HTML' > '$O/out_{}.txt' 2>&1; r=\$?; echo \"{} \$((\$(date +%s)-s))\" >> '$O/times.txt'; echo \"{} rc=\$r\" >> '$O/regress_progress.txt'"; }
run "$L"
# повтор упавших не из-за игры: код 124/127/137/139 или закрытый браузер, и ни одного FAIL в выводе
again=""
if [ "${RETRY:-1}" != "0" ]; then
  for n in $L; do
    rc=$(grep "^$n rc=" "$O/regress_progress.txt" | tail -1 | cut -d= -f2); f="$O/out_$n.txt"
    case "$rc" in 124|127|137|139) inf=1;; *) inf=0; grep -q "Target page, context or browser has been closed\|Browser has been closed\|browser has disconnected" "$f" 2>/dev/null && inf=1;; esac
    [ "$inf" = 1 ] && ! grep -q "FAIL" "$f" 2>/dev/null && { again="$again $n"; echo "$n $rc" >> "$O/retry_first.txt.$$"; cp "$f" "$O/out_$n.first.txt"; }
  done
  if [ -n "$again" ]; then echo "Повтор (упали не из-за игры):$again"; run "$(echo $again | tr ' ' '\n')"; fi
fi
bad=0; flaky=0
for n in $L; do
  f="$O/out_$n.txt"; e=$(grep -c "EVAL ERROR\|PAGEERROR" "$f" 2>/dev/null); rc=$(grep "^$n rc=" "$O/regress_progress.txt" | tail -1 | cut -d= -f2)
  first=$(grep "^$n " "$O/retry_first.txt.$$" 2>/dev/null | cut -d' ' -f2); secs=$(grep "^$n " "$O/times.txt" | awk '{s+=$2} END{print s+0}')
  if [ "$rc" != "0" ] || [ "$e" != "0" ]; then bad=$((bad+1)); mark="!!"; elif [ -n "$first" ]; then flaky=$((flaky+1)); mark="~~"; else mark="  "; fi
  printf "%s\t%s\t%s\t%s\t%s\n" "$n" "$rc" "$e" "$secs" "$first" >> "$O/results.tsv"
  printf "%s %-8s rc=%s err=%s%s | %s\n" "$mark" "$n" "$rc" "$e" "${first:+ (повтор, первый rc=$first)}" "$( (grep "^> " "$f" || tail -1 "$f") | tail -1 | cut -c1-140)"
done
rm -f "$R" "$O/retry_first.txt.$$"
fl=""; [ "$flaky" -gt 0 ] && fl=", прошли со второго раза: $flaky"
echo "ALLDONE, с ошибками: $bad$fl" | tee -a "$O/regress_progress.txt"
[ "$bad" = "0" ]
}
main "$@"; exit $?
