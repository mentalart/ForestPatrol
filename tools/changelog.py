#!/usr/bin/env python3
# Журнал изменений без конфликтов: каждая задача пишет свой файл в zlataya_cep/docs/changes/ (а не правит общий CHANGELOG.md —
# две ветки, дописавшие его сверху, конфликтовали при каждом слиянии). CHANGELOG.md — история до перехода, он больше не правится.
#   python3 tools/changelog.py new "Заголовок задачи"   — создать файл записи (дата-время и слово из заголовка в имени), печатает путь;
#                                                       дальше — пункты «- …» в нём, коммит вместе с правкой
#   python3 tools/changelog.py [N]                      — весь журнал по порядку (новые сверху): записи из changes/, затем CHANGELOG.md;
#                                                       N — только N последних записей
import os, re, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(ROOT, 'zlataya_cep', 'docs', 'changes')
OLD = os.path.join(ROOT, 'zlataya_cep', 'docs', 'CHANGELOG.md')
TR = dict(zip('абвгдеёжзийклмнопрстуфхцчшщъыьэюя', ['a', 'b', 'v', 'g', 'd', 'e', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh', 'sch', '', 'y', '', 'e', 'yu', 'ya']))


def slug(t):
    s = ''.join(TR.get(c, c) for c in t.lower())
    return '_'.join(re.findall(r'[a-z0-9]+', s))[:40] or 'zadacha'


def entries():
    fs = sorted((f for f in os.listdir(DIR) if f.endswith('.md') and f != 'README.md'), reverse=True) if os.path.isdir(DIR) else []
    return [open(os.path.join(DIR, f), encoding='utf-8').read().strip() for f in fs]


a = sys.argv[1:]
if a and a[0] == 'new':
    title = ' '.join(a[1:]).strip() or sys.exit('python3 tools/changelog.py new "Заголовок задачи"')
    os.makedirs(DIR, exist_ok=True)
    p = os.path.join(DIR, '%s_%s.md' % (time.strftime('%Y-%m-%d_%H%M'), slug(title)))
    open(p, 'w', encoding='utf-8').write('## %s\n- \n' % title)
    print(os.path.relpath(p, ROOT))
else:
    n = int(a[0]) if a and a[0].isdigit() else None
    E = entries()
    old = open(OLD, encoding='utf-8').read() if os.path.exists(OLD) else ''
    old_e = re.split(r'(?m)^(?=## )', old.split('\n', 1)[1] if old.startswith('# ') else old)
    old_e = [x.strip() for x in old_e if x.strip().startswith('## ')]
    allE = E + old_e
    print('# Изменения\n\n' + '\n\n'.join(allE[:n] if n else allE))
