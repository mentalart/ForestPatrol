#!/usr/bin/env python3
"""make_probe.py [--audio] [релиз.html] [выход.html] — копия релиза с перехватчиком боссового аудита.

Вставляет probe.js (и при --audio — probe_aud.js) в самый конец игровой IIFE: после `if(window.ZC)window.ZC.FIN=FIN;`
(здесь доступны tip/banner/say/play/prompt/shake, ZC, G, W, renderer). Релиз в репозитории не меняется.
По умолчанию: zlataya_cep/zlataya_cep_final06.html → $BOSS_AUDIT_OUT/rel_probe.html (или rel_probe_aud.html).
"""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.environ.get('BOSS_AUDIT_OUT', '/tmp/boss_audit')
MARK = 'if(window.ZC)window.ZC.FIN=FIN;\n'

args = [a for a in sys.argv[1:] if not a.startswith('--')]
audio = '--audio' in sys.argv
src = args[0] if args else os.path.join(ROOT, 'zlataya_cep', 'zlataya_cep_final06.html')
dst = args[1] if len(args) > 1 else os.path.join(OUT, 'rel_probe_aud.html' if audio else 'rel_probe.html')

html = open(src, encoding='utf-8').read()
if html.count(MARK) != 1:
    sys.exit(f'маркер вставки найден {html.count(MARK)} раз(а) в {src} — ожидался ровно один')
ins = open(os.path.join(HERE, 'probe.js'), encoding='utf-8').read() + '\n'
if audio:
    ins += open(os.path.join(HERE, 'probe_aud.js'), encoding='utf-8').read() + '\n'
i = html.find(MARK) + len(MARK)
os.makedirs(os.path.dirname(os.path.abspath(dst)), exist_ok=True)
open(dst, 'w', encoding='utf-8').write(html[:i] + ins + html[i:])
print(dst)
