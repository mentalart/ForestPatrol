#!/usr/bin/env python3
# Сверка кадров final06 (WebGL, Three r128) и final07 (WebGPU, Three r186): бот tfin_gpu снимает по кадру с каждого уровня
# на обеих сборках, скрипт считает среднюю разницу яркости по уровням и складывает пары в лист out/gpu_parity.png
# (слева final06, справа final07). Запуск: python3 tools/tests/gpu_parity.py [--no-run] [final06.html] [final07.html]
# Разница — не ошибка сама по себе (у final07 MSAA в проходе, другие округления), но уровень, где она резко выше остальных, —
# повод посмотреть пару глазами. Нужен Pillow (pip install pillow).
import os, subprocess, sys
from PIL import Image, ImageChops, ImageDraw, ImageStat
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.normpath(os.path.join(D, '..', '..'))
args = [a for a in sys.argv[1:] if not a.startswith('--')]
f06 = args[0] if len(args) > 0 else os.path.join(R, 'zlataya_cep', 'zlataya_cep_final06.html')
f07 = args[1] if len(args) > 1 else os.path.join(R, 'zlataya_cep', 'zlataya_cep_final07.html')
OUT = os.path.join(D, 'out'); A, B = os.path.join(OUT, 'parity06'), os.path.join(OUT, 'parity07')
if '--no-run' not in sys.argv:
    subprocess.run(['python3', os.path.join(D, 'mk.py'), os.path.join(D, 'bots', 'tfin_gpu.js'), os.path.join(OUT, 'tfin_gpu.json')], check=True)
    for html, sd in ((f06, A), (f07, B)):
        env = dict(os.environ, SHOTS=sd)
        r = subprocess.run(['node', os.path.join(D, 'run.js'), html, os.path.join(OUT, 'tfin_gpu.json')], env=env, capture_output=True, text=True)
        print(os.path.basename(html), [l for l in r.stdout.splitlines() if l.startswith('>')][-1:])
names = sorted(n for n in os.listdir(B) if n.startswith('gpu_') and os.path.exists(os.path.join(A, n)))
rows = []; W, H = 480, 270
sheet = Image.new('RGB', (W * 2 + 8, (H + 4) * len(names)), (24, 24, 24)); dr = ImageDraw.Draw(sheet)
for i, n in enumerate(names):
    a = Image.open(os.path.join(A, n)).convert('RGB'); b = Image.open(os.path.join(B, n)).convert('RGB').resize(a.size)
    d = sum(ImageStat.Stat(ImageChops.difference(a, b)).mean) / 3
    rows.append((d, n))
    sheet.paste(a.resize((W, H)), (0, i * (H + 4))); sheet.paste(b.resize((W, H)), (W + 8, i * (H + 4)))
    dr.text((6, i * (H + 4) + 4), '%s  diff %.1f' % (n, d), fill=(255, 255, 0))
sheet.save(os.path.join(OUT, 'gpu_parity.png'))
med = sorted(r[0] for r in rows)[len(rows) // 2] if rows else 0
for d, n in rows:
    print('%s %5.1f%s' % (n, d, '  ← посмотреть' if d > max(12, med * 2) else ''))
print('лист:', os.path.join(OUT, 'gpu_parity.png'))
