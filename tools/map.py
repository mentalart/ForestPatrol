#!/usr/bin/env python3
# Карта проекта для новых сессий (экономия: не читать index.html и модули целиком).
#   python3 tools/map.py                  — пересобрать автоматическую часть MAP.md (уровни, разделы, модули, замены, боты, документы)
#   python3 tools/map.py where <запрос>   — где это сейчас: уровень ('2-1', 'epi'), имя функции/переменной ('openMap', 'K5')
#                                           или любой текст; печатает файл:строки, а для функций index.html — диапазон тела
#   python3 tools/map.py check            — код 1, если автоматическая часть MAP.md устарела
import os,re,sys,signal
signal.signal(signal.SIGPIPE,signal.SIG_DFL)   # `| head` — без трассировки
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P=lambda *a:os.path.join(ROOT,*a)
IDX=P('index.html');B=P('zlataya_cep','build');BOTS=P('tools','tests','bots');MAPF=P('MAP.md')
AMAP=P('tools','tests','affected_map.txt');DOCS=P('zlataya_cep','docs')
A0,A1='<!-- map:auto:start -->','<!-- map:auto:end -->'
rel=lambda f:os.path.relpath(f,ROOT)
def rd(f):return open(f,encoding='utf-8').read()
def cut(s,n=110):s=re.sub(r'\s+',' ',s).strip();return s if len(s)<=n else s[:n-1]+'…'

# ---------- index.html: верхнеуровневые функции, разделы, уровни ----------
def top_blocks(L):
    """Границы верхнеуровневых объявлений (строка с нулевым отступом): {имя функции: (первая, последняя) строка, с 1}."""
    st=[i for i,l in enumerate(L) if re.match(r'(async\s+)?function\s|const\s|let\s|var\s|class\s|/\* =+',l)]
    out={}
    for k,i in enumerate(st):
        m=re.match(r'(?:async\s+)?function\s+([\w$]+)',L[i])
        if not m:continue
        e=(st[k+1] if k+1<len(st) else len(L))-1
        while e>i and (not L[e].strip() or L[e].startswith('//')):e-=1
        out[m.group(1)]=(i+1,e+1)
    return out
def sections(L):return [(i+1,m.group(1)) for i,l in enumerate(L) for m in [re.match(r'/\* =+ (.*?) =+ \*/',l)] if m]
def levels(src):
    out=[]
    for m in re.finditer(r"\{id:'([^']+)',name:'([^']*)',build:(?:\(\)=>)?(\w+)(?:\(([^)]*)\))?([^}]*)\}",src):
        w=re.search(r'world:(\d)',m.group(5));out.append(dict(id=m.group(1),name=m.group(2),fn=m.group(3),arg=m.group(4) or '',world=w.group(1) if w else '',boss='boss:true' in m.group(5)))
    return out

# ---------- модули релиза ----------
def modules():
    fs=sorted(f for f in os.listdir(B) if re.match(r'(late_\d+.*|fin_early)\.js$',f))
    fs=['fin_early.js']+[f for f in fs if f!='fin_early.js']
    return fs
def mod_title(src):
    first=src.split('\n',1)[0];m=re.match(r'/\* =+ (.*?) =+ \*/',first)
    if m:return m.group(1)
    m=re.search(r'^//\s*(.+)$',src,re.M);return m.group(1) if m else ''
def amap_levels():
    out={}
    for l in rd(AMAP).split('\n'):
        if not l.strip() or l.startswith('#'):continue
        p=l.split();f=p[0].split('#')[0]
        out.setdefault(f,set()).update(x[7:] for x in p[1:] if x.startswith('@level:'))
    return out
def mod_levels(name,src,fn2lv,am):
    s=set(am.get('zlataya_cep/build/'+name,set()))
    s.update(re.findall(r"levelId\s*[!=]==\s*'([^']+)'",src))
    for fn in re.findall(r'(?<![\w.])(build\w+)\s*=\s*function',src):
        if fn in fn2lv:s.update(fn2lv[fn])
    return s

# ---------- боты по уровням ----------
def bots_by_level():
    out={}
    for f in sorted(os.listdir(BOTS)):
        if not f.endswith('.js') or f.startswith('_'):continue
        for lv in set(re.findall(r"LV\('([^']+)'\)",rd(os.path.join(BOTS,f)))):out.setdefault(lv,[]).append(f[:-3])
    return out

# ---------- автоматическая часть MAP.md ----------
def build_auto():
    src=rd(IDX);L=src.split('\n');tb=top_blocks(L);lv=levels(src);bl=bots_by_level();am=amap_levels()
    fn2lv={}
    for x in lv:fn2lv.setdefault(x['fn'],set()).add(x['id'])
    o=[A0,'<!-- Эта часть пишется командой `python3 tools/map.py` — руками не править. Номеров строк здесь нет нарочно (менялись бы',
       '     с каждой правкой и давали конфликты при слиянии веток): строки — `python3 tools/map.py where <уровень|имя|раздел>`. -->','',
       '## Уровни (`LEVELS` в index.html)','',
       '| id | уровень | функция в index.html | модули релиза | ботов | боты |','|---|---|---|---|---|---|']
    mods=modules();msrc={m:rd(os.path.join(B,m)) for m in mods}
    mlv={m:mod_levels(m,msrc[m],fn2lv,am) for m in mods}
    for x in lv:
        ms=[re.sub(r'\.js$','',m.split('/')[-1]) for m in mods if x['id'] in mlv[m]];b=bl.get(x['id'],[])
        o.append('| `%s` | %s | `%s(%s)` | %s | %d | %s |'%(x['id'],cut(x['name'],52),x['fn'],x['arg'],', '.join(ms) or '—',len(b),cut(' '.join(b),90)))
    o+=['','## Разделы index.html по порядку (заголовки `/* ==== … ==== */`; строка — `where <начало названия>`)','']
    o+=[' · '.join(cut(t,70) for n,t in sections(L))]
    o+=['','## Модули релиза (`zlataya_cep/build/`, порядок подключения)','',
        '`fin_early.js` — до создания геометрии; `late_*.js` — по имени (сортировка строк: `late_96b` после `late_96`), перед запуском игры;',
        'Уровни — из `affected_map.txt` (`@level:`), проверок `levelId===` и подмен `buildXX=function`.','',
        '| модуль | уровни | о чём |','|---|---|---|']
    for m in mods:
        s=msrc[m];o.append('| `%s` | %s | %s |'%(m,', '.join(sorted(mlv[m])) or '—',cut(mod_title(s),120)))
    o+=['','## Текстовые замены при сборке (`rep_*.py`, разделы `# ---- … ----` по порядку)','','| файл | раздел |','|---|---|']
    for f in sorted(x for x in os.listdir(B) if re.match(r'rep_\d+.*\.py$',x)):
        for i,l in enumerate(rd(os.path.join(B,f)).split('\n')):
            m=re.match(r'#\s*-{3,}\s*(.*?)\s*-{3,}',l)
            if m:o.append('| `%s` | %s |'%(f,cut(m.group(1),120)))
    o+=['','## Документы (`zlataya_cep/docs/`)','','| файл | заголовок |','|---|---|']
    for f in sorted(os.listdir(DOCS)):
        p=os.path.join(DOCS,f)
        if f.endswith('.md'):
            h=next((l[2:] for l in rd(p).split('\n') if l.startswith('# ')),'');o.append('| `%s` | %s |'%(f,cut(h,110)))
        elif os.path.isdir(p):o.append('| `%s/` | %d файлов |'%(f,len(os.listdir(p))))
    nb=len([f for f in os.listdir(BOTS) if f.endswith('.js') and not f.startswith('_')])
    o+=['','Ботов всего: %d (`tools/tests/bots/`); без уровня (меню, сохранения, общие проверки) — те, у кого нет `LV(\'…\')`.'%nb,A1]
    return '\n'.join(o)

def write_map(check=False):
    auto=build_auto();m=rd(MAPF) if os.path.exists(MAPF) else '# Карта проекта\n\n'+A0+'\n'+A1+'\n'
    if A0 not in m or A1 not in m:sys.exit('MAP.md: нет меток '+A0+' / '+A1)
    new=m[:m.index(A0)]+auto+m[m.index(A1)+len(A1):]
    if check:
        if new!=m:print('MAP.md устарела: python3 tools/map.py');sys.exit(1)
        print('MAP.md актуальна');return
    if new!=m:open(MAPF,'w',encoding='utf-8').write(new)
    print('MAP.md: %d строк'%new.count('\n'))

# ---------- where ----------
def files_for_search():
    fs=[IDX]+[os.path.join(B,m) for m in modules()]+[os.path.join(B,f) for f in sorted(os.listdir(B)) if re.match(r'rep_\d+.*\.py$',f)]
    return [f for f in fs if os.path.exists(f)]
def where(q):
    src=rd(IDX);L=src.split('\n');tb=top_blocks(L);lv=levels(src);found=False
    def enclosing(n):
        best=None
        for name,(a,b) in tb.items():
            if a<=n<=b and (not best or a>best[1][0]):best=(name,(a,b))
        return best
    for x in lv:
        if x['id']!=q:continue
        found=True;r=tb.get(x['fn'])
        print('уровень %s «%s»: index.html %s(%s) — строки %s'%(x['id'],x['name'],x['fn'],x['arg'],'%d–%d'%r if r else '?'))
        fn2lv={};[fn2lv.setdefault(y['fn'],set()).add(y['id']) for y in lv];am=amap_levels()
        for m in modules():
            s=rd(os.path.join(B,m))
            if x['id'] in mod_levels(m,s,fn2lv,am):print('  модуль zlataya_cep/build/%s — %s'%(m,cut(mod_title(s),100)))
        for f in sorted(f for f in os.listdir(B) if re.match(r'rep_\d+.*\.py$',f)):
            for i,l in enumerate(rd(os.path.join(B,f)).split('\n')):
                if re.match(r'#\s*-{3,}',l) and (x['name'].split('·')[-1].strip()[:12].lower() in l.lower() or "'%s'"%x['id'] in l):print('  замены zlataya_cep/build/%s:%d %s'%(f,i+1,cut(l,90)))
        print('  боты: '+' '.join(bots_by_level().get(x['id'],[])))
    if found:return
    pat=re.compile(r'(?:function\s+%s\s*\(|(?<![\w.$])%s\s*=\s*(?:function|\(|async|\{|\[|[\w$]+\s*=>)|(?:const|let|var)\s+%s\s*=)'%((re.escape(q),)*3))
    for f in files_for_search():
        for i,l in enumerate(rd(f).split('\n')):
            if pat.search(l):
                found=True;extra=''
                if f==IDX:
                    if q in tb and tb[q][0]==i+1:extra='  (тело: строки %d–%d)'%tb[q]
                    else:
                        e=enclosing(i+1)
                        if e:extra='  (внутри %s, строки %d–%d)'%(e[0],e[1][0],e[1][1])
                print('%s:%d%s  %s'%(rel(f),i+1,extra,cut(l,100)))
    if found:return
    n=0
    for f in files_for_search():
        for i,l in enumerate(rd(f).split('\n')):
            k=l.find(q)
            if k<0:continue
            n+=1
            if n<=40:
                e=enclosing(i+1) if f==IDX else None
                print('%s:%d%s  …%s…'%(rel(f),i+1,'  [%s]'%e[0] if e else '',cut(l[max(0,k-50):k+70],120)))
    print('совпадений: %d'%n if n else 'не найдено: '+q)

if __name__=='__main__':
    a=sys.argv[1:]
    if a and a[0]=='where':where(' '.join(a[1:]))
    elif a and a[0]=='check':write_map(check=True)
    else:write_map()
