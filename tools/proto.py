#!/usr/bin/env python3
# Прототип по частям: исходник игры лежит в proto/ — движок по разделам (proto/engine/), уровни по файлу на уровень и общий
# код каждого мира (proto/levels/), разметка и стили (proto/head.html). Порядок частей — proto/parts.txt; склеенные подряд, они
# дают index.html байт в байт. index.html в git не хранится — его пишет сборка (build_final.py) или эта команда.
#   python3 tools/proto.py                — склеить части в index.html (прототип для браузера)
#   python3 tools/proto.py line N         — где строка N склеенного index.html: часть и строка в ней (сообщения об ошибках, старые ссылки)
#   python3 tools/proto.py split [файл]   — разрезать цельный index.html (например, из ветки до разбивки) обратно по частям:
#                                           границы — первые строки нынешних частей; части перезаписываются
#   python3 tools/proto.py cat [коммит]   — склеенный прототип в stdout (для инструментов на node: tools/script/*)
#   python3 tools/proto.py check          — части склеиваются, у каждой есть первая строка-граница, index.html (если есть) совпадает
# Из других скриптов: import proto; proto.join(rev=None) — текст прототипа (rev — коммит git; до разбивки — его index.html),
# proto.locate(N) — (часть, строка), proto.offsets() — [(часть, первая строка, последняя)].
import os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = 'proto'
MANIFEST = DIR + '/parts.txt'
OUT = os.path.join(ROOT, 'index.html')


def _git_show(rev, path):
    r = subprocess.run(['git', 'show', '%s:%s' % (rev, path)], cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    return r.stdout.decode('utf-8') if r.returncode == 0 else None


def _read(path, rev=None):
    if rev:
        return _git_show(rev, path)
    p = os.path.join(ROOT, path)
    if not os.path.exists(p):
        return None
    with open(p, encoding='utf-8', newline='') as f:
        return f.read()


def parts(rev=None):
    """Части по порядку (пути от корня репозитория); None — в этом коммите прототип ещё цельный."""
    m = _read(MANIFEST, rev)
    if m is None:
        return None
    return [DIR + '/' + l.strip() for l in m.splitlines() if l.strip() and not l.lstrip().startswith('#')]


def join(rev=None):
    ps = parts(rev)
    if ps is None:
        s = _read('index.html', rev)
        return s or ''
    out = []
    for p in ps:
        s = _read(p, rev)
        if s is None:
            sys.exit('proto: нет части %s (она в %s)' % (p, MANIFEST))
        out.append(s)
    return ''.join(out)


def offsets(rev=None):
    """[(часть, первая строка, последняя строка)] в нумерации склеенного index.html (с 1)."""
    res, n = [], 1
    for p in parts(rev) or []:
        k = _read(p, rev).count('\n')
        res.append((p, n, n + k - 1))
        n += k
    return res


def locate(line, rev=None):
    for p, a, b in offsets(rev):
        if a <= line <= b:
            return p, line - a + 1
    return None, None


def write_index():
    s = join()
    old = _read('index.html')
    if old != s:
        with open(OUT, 'w', encoding='utf-8', newline='') as f:
            f.write(s)
    return s


def split(src_path):
    with open(src_path, encoding='utf-8', newline='') as f:
        L = f.read().split('\n')
    ps = parts()
    first = []
    for p in ps:
        s = _read(p)
        first.append(s.split('\n', 1)[0])
    cuts, at = [0], 0
    for p, a in zip(ps[1:], first[1:]):
        try:
            at = L.index(a, at + 1)
        except ValueError:
            sys.exit('split: в %s нет первой строки части %s:\n  %s\nразрежьте это место руками (или поправьте первую строку части)' % (src_path, p, a[:120]))
        cuts.append(at)
    cuts.append(len(L))
    changed = 0
    for i, p in enumerate(ps):
        chunk = L[cuts[i]:cuts[i + 1]]
        s = '\n'.join(chunk) + ('\n' if i + 1 < len(ps) else '')
        if _read(p) != s:
            changed += 1
            with open(os.path.join(ROOT, p), 'w', encoding='utf-8', newline='') as f:
                f.write(s)
            print('  изменена %s' % p)
    print('split: частей %d, изменено %d' % (len(ps), changed))


def check():
    ok = True
    ps = parts()
    for p in ps:
        s = _read(p)
        if s is None:
            print('нет части', p); ok = False; continue
        if p != ps[-1] and not s.endswith('\n'):
            print('часть без перевода строки в конце:', p); ok = False
    first = [(_read(p) or '').split('\n', 1)[0] for p in ps]
    s = join()
    L = s.split('\n')
    for p, a in zip(ps, first):
        if L.count(a) != 1 and p != ps[0]:
            print('первая строка части %s встречается в прототипе %d раз — split не найдёт границу: %s' % (p, L.count(a), a[:80])); ok = False
    disk = os.path.join(ROOT, DIR)
    listed = set(ps)
    for d, _, fs in os.walk(disk):
        for f in fs:
            rp = os.path.relpath(os.path.join(d, f), ROOT).replace(os.sep, '/')
            if rp != MANIFEST and rp not in listed and not f.endswith('.md'):
                print('файл не в %s (в сборку не попадёт): %s' % (MANIFEST, rp)); ok = False
    old = _read('index.html')
    if old is not None and old != s:
        print('index.html устарел: python3 tools/proto.py')
    print('proto: частей %d, строк %d — %s' % (len(ps), s.count('\n'), 'в порядке' if ok else 'ОШИБКИ'))
    return ok


if __name__ == '__main__':
    a = sys.argv[1:]
    if a and a[0] == 'line':
        p, n = locate(int(a[1]))
        print('%s:%d' % (p, n) if p else 'вне прототипа')
    elif a and a[0] == 'split':
        split(a[1] if len(a) > 1 else OUT)
    elif a and a[0] == 'cat':
        sys.stdout.buffer.write(join(a[1] if len(a) > 1 else None).encode('utf-8'))
    elif a and a[0] == 'check':
        sys.exit(0 if check() else 1)
    else:
        s = write_index()
        print('index.html: %d строк из %d частей (proto/)' % (s.count('\n'), len(parts())))
