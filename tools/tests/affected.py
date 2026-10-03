#!/usr/bin/env python3
# Выборочный регресс: какие боты проверяют то, что изменилось в ветке, — вместо полного регресса после каждой правки.
#   python3 tools/tests/affected.py                 # что изменилось с ответвления от origin/main (коммиты ветки + незакоммиченное)
#   python3 tools/tests/affected.py --base HEAD     # только незакоммиченные правки
#   python3 tools/tests/affected.py --files proto/levels/2-2.js zlataya_cep/build/late_87_boss4b.js
#   python3 tools/tests/affected.py --run [--jobs 2] # пересобрать релиз и прогнать ботов на релизной сборке (--no-build — без пересборки).
#                                                    Прототип index.html — только исходник релиза: боты, что есть лишь в списке прототипа
#                                                    (regress_list.txt), не гоняются — уровни проверяют их релизные боты.
#   python3 tools/tests/affected.py --base A --to B  # что проверять для разницы двух коммитов (например, чужой ветки перед слиянием)
#   python3 tools/tests/affected.py --run --shard 2/4 # только своя четверть выбранных ботов (CI делит их на несколько машин)
# Как решается:
#   · файлы — по таблице tools/tests/affected_map.txt (модули релиза, озвучка, документы…); файла нет в таблице — полный регресс;
#   · прототип (части proto/ — склеенный index.html, tools/proto.py) — по изменённым строкам склеенного текста: внутри функции уровня (buildXX из таблицы LEVELS) — боты этого уровня; общая функция —
#     уровни, где её вызывают; если её вызывает общий код (или правка вне функций) — полный регресс; комментарий в начале файла — ничего;
#   · любая правка кода игры добавляет страховку: smoke (все уровни грузятся и играются, ~25 с), tfin_col (коллизии всех уровней), tallobj.
#   · final07 (WebGPU): файлы только final07 (zlataya_cep/build/gpu/*, Three r186) помечены в таблице @final07 — их боты гоняются на
#     zlataya_cep_final07.html (сборка build_final.py --gpu) со страховкой и tfin_gpu; @full07 — полный регресс final07.
# Полный регресс нужен, только когда скрипт так скажет, перед выпуском новой версии релиза и один раз в main после слияния нескольких веток.
import fnmatch, os, re, subprocess, sys, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'tools'))
import proto   # noqa: E402  прототип по частям (proto/)
T = os.path.join(ROOT, 'tools', 'tests')
GUARD = ['smoke', 'tfin_col', 'tallobj']
WIDE = ['smoke', 'tfin_col', 'tallobj', 'tfin_art', 'tfin_budget', 'tfin_occ', 'tfin_fadebatch', 'tfin_foeidle', 'tfin_foekinds', 'tfin_foekinds1b',
        'tfin_foekinds2', 'tfin_foekinds2b', 'tfin_foekinds3', 'tfin_cast', 'tfin_foecast', 'tfin_slash', 'tfin_cine', 'tfin_menu']


def sh(*a):
    r = subprocess.run(list(a), cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True)
    return r.stdout if r.returncode == 0 else ''


TO = sys.argv[sys.argv.index('--to') + 1] if '--to' in sys.argv else None


def read(p, work=False):
    if TO and not work:
        return subprocess.run(['git', 'show', TO + ':' + p], cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True).stdout
    with open(os.path.join(ROOT, p), encoding='utf-8') as f:
        return f.read()


def listed(name):
    return [b for l in read('tools/tests/' + name, True).splitlines() if not l.startswith('#') for b in l.split()]


# ---------- уровни и боты ----------
SRC = proto.join(TO)   # склеенный прототип (в коммите до разбивки — его index.html)
LINES = SRC.split('\n')
LEVELS = []   # (id, функция-строитель)
blk = SRC[SRC.index('const LEVELS=['):]
blk = blk[:blk.index('];')]
for m in re.finditer(r"\{id:'([^']+)'.*?build:(?:\(\)=>)?(\w+)", blk):
    LEVELS.append((m.group(1), m.group(2)))
LV_OF_FN = {}
for lid, fn in LEVELS:
    LV_OF_FN.setdefault(fn, []).append(lid)

REL, PROTO = listed('regress_list_final.txt'), listed('regress_list.txt')
REL07 = listed('regress_list_final07.txt') if os.path.exists(os.path.join(T, 'regress_list_final07.txt')) else []   # боты только final07
GUARD07 = ['tfin_gpu', 'smoke', 'tfin_col', 'tallobj']
ALLBOTS = list(dict.fromkeys(REL + PROTO + REL07))


def bot_levels(b):
    p = os.path.join(T, 'bots', b + '.js')
    if not os.path.exists(p):
        return set()
    s = open(p, encoding='utf-8').read()
    lv = set(re.findall(r"LV\(['\"]([^'\"]+)['\"]\)", s))
    for n in re.findall(r"loadLevel\((\d+)\)", s):
        if int(n) < len(LEVELS):
            lv.add(LEVELS[int(n)][0])
    if re.search(r"toChase\(", s) or (re.search(r"U\.go\(\)", s) and not lv):
        lv.add('p')
    return lv


BOT_LV = {b: bot_levels(b) for b in ALLBOTS}


def level_bots(lid):
    return [b for b in ALLBOTS if lid in BOT_LV[b]]


# ---------- таблица соответствий ----------
MAP = []
for l in read('tools/tests/affected_map.txt', True).splitlines():
    l = l.strip()
    if not l or l.startswith('#'):
        continue
    parts = l.split()
    pat, sec = parts[0], None
    if '#' in pat:
        pat, sec = pat.split('#', 1)
    MAP.append((pat, sec, parts[1:]))


def rule_for(path, section=None):
    for pat, sec, what in MAP:
        if (fnmatch.fnmatch(path, pat) or path.startswith(pat.rstrip('*'))) and (sec is None or (section and sec.lower() in section.lower())):
            if sec is None or section:
                return what, pat + ('#' + sec if sec else '')
    return None, None


# строки удалённых в ветке файлов замен (rep_*.py) — если они без изменений лежат в новых файлах, это перенос, а не правка
_MOVED = {}
def MOVED(base):
    if base not in _MOVED:
        gone = [f for f in sh('git', 'diff', '--name-only', '--diff-filter=D', base, *( [TO] if TO else [] )).split('\n') if re.match(r'zlataya_cep/build/rep_\d+.*\.py$', f)]
        _MOVED[base] = {l for f in gone for l in sh('git', 'show', base + ':' + f).splitlines() if l.strip() and not l.lstrip().startswith('#')}
    return _MOVED[base]


# ---------- что изменилось ----------
def changed_files(base):
    if TO:
        return [f for f in sh('git', 'diff', '--name-only', base, TO).split('\n') if f]
    out = sh('git', 'diff', '--name-only', base) + sh('git', 'ls-files', '--others', '--exclude-standard')
    return [f for f in dict.fromkeys(out.split('\n')) if f]


def proto_lines(base):
    """Изменённые строки склеенного прототипа (нумерация index.html): части proto/ склеиваются в base и в текущей версии."""
    with tempfile.TemporaryDirectory() as d:
        a, b = os.path.join(d, 'a'), os.path.join(d, 'b')
        open(a, 'w', encoding='utf-8', newline='').write(proto.join(sh('git', 'rev-parse', base).strip() or base))
        open(b, 'w', encoding='utf-8', newline='').write(SRC)
        r = subprocess.run(['git', 'diff', '--no-index', '-U0', a, b], stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True)
    res = []
    for m in re.finditer(r'^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@', r.stdout, re.M):
        a, n = int(m.group(1)), int(m.group(2) or 1)
        res.extend(range(a, a + max(n, 1)))
    return res


def where(ln):
    p, n = proto.locate(ln, TO)
    return '%s:%d' % (p, n) if p else 'index.html:%d' % ln


def changed_lines(base, path):
    """Номера изменённых строк в текущей версии файла (для удалённых — строка на месте удаления)."""
    d = sh('git', 'diff', '-U0', base, *([TO] if TO else []), '--', path)
    if not d and not TO and path in sh('git', 'ls-files', '--others', '--exclude-standard').split('\n'):
        return list(range(1, len(read(path).split('\n')) + 1))
    res = []
    for m in re.finditer(r'^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@', d, re.M):
        a, n = int(m.group(1)), int(m.group(2) or 1)
        res.extend(range(a, a + max(n, 1)))
    return res


# верхнеуровневые функции index.html: имя → (начало, конец)
FUNCS = []
for i, l in enumerate(LINES, 1):
    m = re.match(r'(?:async\s+)?function\s+(\w+)\s*\(', l)
    if m:
        FUNCS.append([m.group(1), i, None])
TOPLEVEL = [i for i, l in enumerate(LINES, 1) if l and not l[0].isspace() and l[0] not in '}' and not l.startswith('//')]
for f in FUNCS:
    nxt = [i for i in TOPLEVEL if i > f[1]]
    f[2] = (nxt[0] - 1) if nxt else len(LINES)
SCRIPT0 = next(i for i, l in enumerate(LINES, 1) if '<script' in l and 'src=' not in l)


def func_at(line):
    for name, a, b in FUNCS:
        if a <= line <= b:
            return name
    return None


def callers_levels(fn):
    """Уровни, в функциях которых вызывается fn; None — вызывается из общего кода."""
    lv = set()
    for i, l in enumerate(LINES, 1):
        if re.search(r'\b' + re.escape(fn) + r'\b', l):
            f = func_at(i)
            if f == fn:
                continue
            if f in LV_OF_FN:
                lv.update(LV_OF_FN[f])
            else:
                return None
    return lv


def analyse(files, base):
    bots, why, full, wide, code = [], [], [], False, False
    g07, full07 = [], []   # final07: боты на zlataya_cep_final07.html; причины полного регресса final07

    def add(bs, reason):
        for b in bs:
            if b not in bots:
                bots.append(b)
        why.append(reason)

    def expand(what, reason):
        nonlocal wide
        out = []
        if what and what[0] == '@final07':   # только final07: боты — на его сборке
            for w in what[1:]:
                if w == '@full07':
                    full07.append(reason)
                elif w not in g07:
                    g07.append(w)
            return out
        for w in what:
            if w == '-':
                continue
            if w == '@full':
                full.append(reason)
            elif w == '@wide':
                wide = True
                out += WIDE
            elif w.startswith('@level:'):
                out += [b for b in level_bots(w[7:]) if b in REL]   # модуль релиза прототип не меняет — его боты не нужны
            else:
                out.append(w)
        return out

    proto_done = False
    for f in files:
        if f == 'index.html' or f.startswith('proto/'):
            if proto_done:
                continue
            proto_done = True
            code = True
            ls = proto_lines(base)
            fns, lvs, eng, top, head = set(), set(), set(), 0, 0
            for ln in ls:
                if ln < SCRIPT0:
                    s = '\n'.join(LINES[:ln])
                    if s.count('<!--') > s.count('-->'):
                        head += 1
                    else:
                        top += 1   # разметка и стили прототипа
                    continue
                txt = LINES[ln - 1].strip() if ln - 1 < len(LINES) else ''
                if not txt or txt.startswith(('//', '/*', '*')):
                    continue   # пустые строки и комментарии
                lm = re.match(r"\{id:'([^']+)'", txt)
                if lm and any(lm.group(1) == x for x, _ in LEVELS):
                    lvs.add(lm.group(1))   # строка уровня в таблице LEVELS
                    continue
                fn = func_at(ln)
                if fn is None:
                    eng.add('(вне функций: %s: %s)' % (where(ln), txt[:50]))
                    continue
                fns.add(fn)
            for fn in sorted(fns):
                if fn in LV_OF_FN:
                    lvs.update(LV_OF_FN[fn])
                else:
                    c = callers_levels(fn)
                    if c is None:
                        eng.add(fn)
                    else:
                        lvs.update(c)
                        why.append('прототип: %s — вызывается только на уровнях %s' % (fn, ', '.join(sorted(c)) or '— (нигде)'))
            if eng:
                full.append('прототип: общий код — ' + ', '.join(sorted(eng)[:6]) + (' …' if len(eng) > 6 else ''))
            for lid in sorted(lvs):
                add(level_bots(lid), 'прототип: уровень %s' % lid)
            if top:
                add(['tfin_menu', 'tfin_cine', 'tfin_splash'], 'прототип: разметка и стили, proto/head.html (%d стр.)' % top)
            if head and not (fns or eng or top):
                why.append('прототип: только комментарий в начале (proto/head.html)')
            continue
        m = re.match(r'tools/tests/bots/(\w+)\.js$', f)
        if m:
            if m.group(1) in REL07 and m.group(1) not in REL:
                g07.append(m.group(1)) if m.group(1) not in g07 else None
                why.append('%s — изменён сам бот (final07)' % f)
            else:
                add([m.group(1)], '%s — изменён сам бот' % f)
            continue
        if re.match(r'tools/tests/regress_list(_final|_final07)?\.txt$', f):
            dd = sh('git', 'diff', '-U0', base, *([TO] if TO else []), '--', f)
            old = {b for l in re.findall(r'^-(?!-)(.*)$', dd, re.M) if not l.startswith('#') for b in l.split()}
            nb = [b for l in re.findall(r'^\+(?!\+)(.*)$', dd, re.M) if not l.startswith('#') for b in l.split() if b in ALLBOTS and b not in old]
            if nb and f.endswith('_final07.txt'):
                g07.extend(b for b in nb if b not in g07)
                why.append('%s — добавлены в список: %s' % (f, ' '.join(nb)))
            elif nb:
                add(nb, '%s — добавлены в список' % f)
            continue
        if f.startswith('zlataya_cep/build/rep_') and f.endswith('.py') and not os.path.exists(os.path.join(ROOT, f)):
            # файл замен удалён: если все его строки перенесены в другие rep_*.py (разбили по уровням) — проверять нечего,
            # проверяют новые файлы; иначе замены пропали — полный регресс
            old = sh('git', 'show', base + ':' + f)
            B = os.path.join(ROOT, 'zlataya_cep', 'build')
            now = ''.join(read('zlataya_cep/build/' + n, True) for n in sorted(os.listdir(B)) if re.match(r'rep_\d+.*\.py$', n))
            lost = [l for l in old.splitlines() if l.strip() and not l.lstrip().startswith('#') and l not in now]
            if lost:
                code = True
                full.append('%s удалён, %d строк замен пропали' % (f, len(lost)))
            else:
                why.append('%s удалён — все замены перенесены в другие rep_*.py' % f)
            continue
        if f.startswith('zlataya_cep/build/rep_') and f.endswith('.py'):
            code = True
            secs, lines = set(), LINES_OF(f)
            for ln in changed_lines(base, f):
                if ln > len(lines) or not lines[ln - 1].strip() or lines[ln - 1].lstrip().startswith('#'):
                    continue
                if lines[ln - 1] in MOVED(base):   # строка перенесена без изменений из удалённого rep_*.py
                    continue
                hdr = next((lines[i] for i in range(min(ln, len(lines)) - 1, -1, -1) if lines[i].startswith('# ----')), '')
                secs.add(hdr)
            for s in sorted(secs):
                what, pat = rule_for(f, s or None)
                if what is None:
                    what, pat = rule_for(f)
                if what is None:
                    full.append('%s — нет в affected_map.txt' % f)
                    continue
                add(expand(what, '%s (%s)' % (f, s.strip('# -') or 'вне разделов')), '%s → %s' % (f + (' «' + s.strip('# -')[:40] + '»' if s else ''), ' '.join(what)))
            continue
        what, pat = rule_for(f)
        if what is None:
            full.append('%s — нет в tools/tests/affected_map.txt (допишите)' % f)
            code = True
            continue
        if what != ['-']:
            if what[0] == '@final07':
                expand(what, f)
                why.append('%s → final07: %s' % (f, ' '.join(what[1:])))
                continue
            code = code or f.startswith('zlataya_cep/build/')
            add(expand(what, f), '%s → %s' % (f, ' '.join(what)))
    if code or bots:
        add(GUARD, 'страховка при любой правке кода: ' + ' '.join(GUARD))
    if g07:
        g07 += [b for b in GUARD07 if b not in g07]
        why.append('final07: страховка ' + ' '.join(GUARD07))
    return bots, why, full, wide, g07, full07


_LC = {}


def LINES_OF(p):
    if p not in _LC:
        _LC[p] = read(p).split('\n')
    return _LC[p]


def main():
    a = sys.argv[1:]
    # карта проекта для новых сессий (MAP.md, tools/map.py): напомнить, если устарела — на проверку не влияет
    mp = os.path.join(ROOT, 'tools', 'map.py')
    if os.path.exists(mp) and subprocess.run([sys.executable, mp, 'check'], cwd=ROOT, capture_output=True).returncode:
        print('ВНИМАНИЕ: MAP.md устарела (новый уровень, модуль, раздел, бот или документ) — python3 tools/map.py и закоммитить\n')
    base, files, run, jobs = None, None, '--run' in a, '2'
    if '--base' in a:
        base = a[a.index('--base') + 1]
    if '--jobs' in a:
        jobs = a[a.index('--jobs') + 1]
    if '--files' in a:
        files = [x for x in a[a.index('--files') + 1:] if not x.startswith('--')]
    if base is None:
        for ref in ('origin/main', 'main'):
            mb = sh('git', 'merge-base', 'HEAD', ref).strip()
            if mb:
                base = mb
                break
        else:
            base = 'HEAD'
    if files is None:
        files = changed_files(base)
    bots, why, full, wide, g07, full07 = analyse(files, base)
    print('База сравнения: %s · изменено файлов: %d' % (base[:12], len(files)))
    for w in why:
        print('  · ' + w)
    if full or full07:
        print('\nНУЖЕН ПОЛНЫЙ РЕГРЕСС:')
        for w in full + ['final07: ' + x for x in full07]:
            print('  ! ' + w)
        if full:
            print('  LIST=tools/tests/regress_list_final.txt tools/tests/regress.sh zlataya_cep/zlataya_cep_final06.html')
        if full07 or g07:
            print('  LIST="tools/tests/regress_list_final.txt tools/tests/regress_list_final07.txt" tools/tests/regress.sh zlataya_cep/zlataya_cep_final07.html'
                  '   # final07: python3 zlataya_cep/build/build_final.py --gpu')
        return 2
    rel = [b for b in bots if b in REL or b not in PROTO]
    if '--shard' in a:   # машина I из N: каждый N-й бот (соседние в списке — часто тяжёлые боты одного уровня — расходятся по машинам)
        si, sn = (int(x) for x in a[a.index('--shard') + 1].split('/'))
        rel = rel[si - 1::sn]
        print('Доля %d / %d: %d ботов' % (si, sn, len(rel)))
        if not rel:
            print('На эту машину ботов не досталось.')
            return 0
    pro = [b for b in bots if b in PROTO and b not in REL]
    if not rel and not g07:
        print('\nБоты не нужны (документы, инструменты вне игры).')
        return 0
    print('\n%s: %d из %d ботов' % ('Широкая проверка' if wide else 'Выборочная проверка', len(rel) + len(g07), len(set(REL + REL07))))
    if rel:
        print('  релиз (zlataya_cep_final06.html): ' + ' '.join(rel))
    if g07:
        print('  final07 (zlataya_cep_final07.html, WebGPU): ' + ' '.join(g07))
    if pro:
        print('  не гоняются (только прототип — он лишь исходник релиза): ' + ' '.join(pro))
    if not run:
        print('\nПрогнать: python3 tools/tests/affected.py --run' + (' --base ' + base if '--base' in a else ''))
        return 0
    rc = 0
    os.makedirs(os.path.join(T, 'out'), exist_ok=True)
    if rel and '--no-build' not in a:   # боты релиза — на свежей сборке из текущих исходников
        print('\nСборка релиза…', flush=True)
        if subprocess.run([sys.executable, os.path.join(ROOT, 'zlataya_cep', 'build', 'build_final.py')], cwd=ROOT).returncode:
            print('Сборка остановилась — боты не запускались.')
            return 1
    if g07 and '--no-build' not in a:   # final07 — та же сборка с Three r186 и WebGPU
        print('\nСборка final07…', flush=True)
        if subprocess.run([sys.executable, os.path.join(ROOT, 'zlataya_cep', 'build', 'build_final.py'), '--gpu'], cwd=ROOT).returncode:
            print('Сборка final07 остановилась — боты не запускались.')
            return 1
    for group, html in ((rel, 'zlataya_cep/zlataya_cep_final06.html'), (g07, 'zlataya_cep/zlataya_cep_final07.html')):
        if not group:
            continue
        lst = os.path.join(T, 'out', 'affected_list.txt')
        open(lst, 'w').write(' '.join(group) + '\n')
        print('\n== %s: %s' % (html, ' '.join(group)), flush=True)
        r = subprocess.run(['sh', os.path.join(T, 'regress.sh'), os.path.join(ROOT, html)], cwd=ROOT, env=dict(os.environ, LIST=lst, JOBS=jobs))
        rc = rc or r.returncode
    return rc


if __name__ == '__main__':
    sys.exit(main())
