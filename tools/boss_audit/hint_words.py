#!/usr/bin/env python3
"""hint_words.py [--max N] [--all] — СТАТИЧЕСКИЙ поиск подсказок боссов длиннее нормы (F-2h3).
Берёт исходники боссовых уровней (1-Б 2-Б 3-Б 4-Б 5-Б1 5-Б2) и мини-боссов (1-1 2-1 3-1 3-2 5-1): proto/levels/<ур>.js и
zlataya_cep/build/levels/<ур>/*.js, а также общий код, чьи tip() всплывают в боссах (proto/engine, proto/levels/w*_common.js, build/*.js).
Подсказка = русская строка в вызове tip/tipAll, текст зоны tipZones.push({text:…}), t4HintShow/b32HintShow (2-й аргумент), присвоение html='…' в обёртках tip.
Задачи (O/OR), баннеры, реплики роликов — не подсказки, их нормы другие.
Колонки: уровень · файл:строка · вызов · слов · озвучено (есть ли такой текст в build/voice/lines.json) · текст.
По умолчанию печатает только строки длиннее --max (10); --all — все. Код возврата 1, если есть НЕозвученные длиннее нормы."""
import sys,os,re,glob,json
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import jsx
MAX=10
if '--max' in sys.argv: MAX=int(sys.argv[sys.argv.index('--max')+1])
ALL='--all' in sys.argv
LV=['1-B','2-B','3-B','4-B','5-B1','5-B2','1-1','2-1','3-1','3-2','5-1']
def norm(t): return re.sub(r'[^а-яёa-z0-9]+',' ',jsx.strip_html(re.sub(r'\[кн:\w+\]','',t)).lower()).strip()
voiced=set(norm(l['text']) for l in json.load(open(f'{ROOT}/zlataya_cep/build/voice/lines.json',encoding='utf-8'))['lines'])
HCALL={'tip','tipAll','tipZones.push','t4HintShow','b32HintShow'}
files=[(l,f) for l in LV for f in glob.glob(f'{ROOT}/proto/levels/{l}.js')+sorted(glob.glob(f'{ROOT}/zlataya_cep/build/levels/{l}/*.js'))]
files+=[('общий',f) for f in sorted(glob.glob(f'{ROOT}/proto/engine/*.js')+glob.glob(f'{ROOT}/proto/levels/w*_common.js')+glob.glob(f'{ROOT}/zlataya_cep/build/*.js'))]
rows=[];seen=set()
for lv,f in files:
    rs,toks,pair,src=jsx.extract(f)
    for r in rs:
        call=r['call'];ok=call in('tip','tipAll') or (call=='tipZones.push' and r['key']=='text') or (call in('t4HintShow','b32HintShow') and r['argi']==1)
        if not ok:
            # присвоение html='…' внутри обёртки tip
            pv=toks[r['tokidx']-2:r['tokidx']]
            ok=len(pv)==2 and pv[0][1]=='html' and pv[1][1]=='='
            call='html='
        if not ok: continue
        tx=jsx.strip_html(r['text']);n=jsx.nwords(tx)
        k=(f,r['line'],tx)
        if k in seen: continue
        seen.add(k)
        rows.append((lv,os.path.relpath(f,ROOT)+':'+str(r['line']),call,n,norm(r['text']) in voiced,tx))
bad=0
print('уровень\tисточник\tвызов\tслов\tозвучено\tтекст')
for lv,src,call,n,v,tx in rows:
    if n>MAX or ALL:
        print(f"{lv}\t{src}\t{call}\t{n}\t{'да' if v else 'нет'}\t{tx}")
    if n>MAX and not v: bad+=1
print(f'--- подсказок {len(rows)}; длиннее {MAX} слов: {sum(1 for r in rows if r[3]>MAX)}, из них неозвученных: {bad}',file=sys.stderr)
sys.exit(1 if bad else 0)
