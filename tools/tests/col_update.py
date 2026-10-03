#!/usr/bin/env python3
# Эталон коллизий релиза одной командой: пересчитать в tools/tests/bots/tfin_col.js (словарь RELEASE) хеши изменённых уровней.
#   python3 tools/tests/col_update.py 2-3 3-1      — прогнать tfin_col на релизе и взять новые хеши этих уровней
#   python3 tools/tests/col_update.py --all        — все уровни, у которых хеш разошёлся (осторожно: только если расхождения ожидаемы)
#   … --no-run                                     — не гонять бота, взять последний вывод tools/tests/out/out_tfin_col.txt
# Уровень, у которого хеш не разошёлся, не трогается. Релиз сначала собрать: python3 zlataya_cep/build/build_final.py.
# При слиянии веток с конфликтом в tfin_col.js — взять обе стороны и пересчитать изменённые уровни этой командой.
import os, re, subprocess, sys

T = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(T, '..', '..'))
BOT = os.path.join(T, 'bots', 'tfin_col.js')
OUT = os.path.join(T, 'out', 'out_tfin_col.txt')
HTML = os.path.join(ROOT, 'zlataya_cep', 'zlataya_cep_final06.html')

a = sys.argv[1:]
ids = [x for x in a if not x.startswith('--')]
if not ids and '--all' not in a:
    sys.exit(__doc__ if __doc__ else 'python3 tools/tests/col_update.py <уровень …> | --all [--no-run]')
if '--no-run' not in a:
    if not os.path.exists(HTML):
        sys.exit('нет релиза: python3 zlataya_cep/build/build_final.py')
    print('tfin_col на релизе…', flush=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        subprocess.run(['sh', os.path.join(T, 'run_one.sh'), 'tfin_col', HTML], cwd=ROOT, stdout=f, stderr=subprocess.STDOUT)
res = [l for l in open(OUT, encoding='utf-8').read().splitlines() if l.startswith('> col ')]
if not res:
    sys.exit('в выводе tfin_col нет строки «> col …» — см. ' + OUT)
line = res[-1]
if 'DIFF' not in line:
    sys.exit('расхождений нет: ' + line[2:])
diff = dict(x.split('=', 1) for x in line.split('DIFF', 1)[1].split() if '=' in x)
want = list(diff) if '--all' in a else ids
miss = [i for i in want if i not in diff]
if miss:
    print('хеш не разошёлся (не трогаю): ' + ' '.join(miss))
want = [i for i in want if i in diff]
if not want:
    sys.exit('нечего обновлять; расхождения: ' + ' '.join('%s=%s' % kv for kv in diff.items()))
src = open(BOT, encoding='utf-8').read()
m = re.search(r"const RELEASE=\{(.*?)\};", src)
if not m:
    sys.exit('в tfin_col.js нет словаря RELEASE')
cur = dict((k.strip("'"), v) for k, v in re.findall(r"('[^']+'|[A-Za-z_]\w*):'([^']*)'", m.group(1)))
for i in want:
    print('  %s: %s → %s' % (i, cur.get(i, '(прототип)'), diff[i]))
    cur[i] = diff[i]
key = lambda k: k if re.match(r'^[A-Za-z_]\w*$', k) else "'%s'" % k
new = 'const RELEASE={' + ','.join("%s:'%s'" % (key(k), v) for k, v in cur.items()) + '};'
open(BOT, 'w', encoding='utf-8').write(src[:m.start()] + new + src[m.end():])
rest = [i for i in diff if i not in want]
print('tfin_col.js: обновлено %d%s' % (len(want), ('; ещё расходятся (не тронуты): ' + ' '.join(rest)) if rest else ''))
