#!/usr/bin/env python3
"""Обработка выбранных дублей серии: эффект голоса → подрезка тишины → 48 кГц моно 16 бит → пик −1 dBFS.
  python3 tools/mult2d/voice_post.py <серия> <best.json> [папка дублей]   # → voice/<серия>/<id>.wav, длины — в voice/<серия>/lines.json (dur)
  python3 tools/mult2d/voice_post.py <серия> dur                          # длины записей → таблица DUR в ep_<серия>.js
best.json пишет voice_rec.py: {id: {file, …}}. Нужен ffmpeg (FFMPEG=путь, если его нет в PATH)."""
import os, sys, json, wave, subprocess

D = os.path.dirname(os.path.abspath(__file__))
FF = os.environ.get('FFMPEG', 'ffmpeg')
FX = {   # обработка по голосу (как в voice/README.md)
    'koschei': 'aecho=0.8:0.55:110|230:0.22|0.12,',
    'zven': 'aecho=0.9:0.9:4|7:0.16|0.10,',
}
TRIM = 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,'

def peak_norm(p):
    import numpy as np
    with wave.open(p) as w: x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float); sr = w.getframerate()
    x *= (32767 * 10 ** (-1 / 20)) / max(1, abs(x).max())
    with wave.open(p, 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(x.astype('<i2').tobytes())
    return len(x) / sr

ep = sys.argv[1]; vd = os.path.join(D, 'voice', ep); lp = os.path.join(vd, 'lines.json')
lines = json.load(open(lp, encoding='utf-8'))
if sys.argv[2] == 'dur':   # длины записей → таблица DUR в ep_<серия>.js (реплики без записи сохраняют прежнюю оценку)
    import re
    ep_js = os.path.join(D, f'ep_{ep}.js'); s = open(ep_js, encoding='utf-8').read()
    m = re.search(r'const DUR = \{(.*?)\};', s, re.S); old = dict(re.findall(r'(\w+): ([\d.]+)', m.group(1)))
    old.update({l['id']: str(l['dur']) for l in lines if 'dur' in l})
    items = [f'{k}: {v}' for k, v in old.items()]
    body = '\n' + ''.join('  ' + ', '.join(items[i:i + 8]) + ',\n' for i in range(0, len(items), 8))
    open(ep_js, 'w', encoding='utf-8', newline='\n').write(s[:m.start(1)] + body + s[m.end(1):]); print('DUR →', ep_js); sys.exit()
best = json.load(open(sys.argv[2], encoding='utf-8')); src = sys.argv[3] if len(sys.argv) > 3 else os.path.dirname(sys.argv[2])
for l in lines:
    b = best.get(l['id'])
    if not b: continue
    out = os.path.join(vd, l['id'] + '.wav')
    af = FX.get(l['who'], '') + TRIM + 'aresample=48000'
    subprocess.run([FF, '-y', '-loglevel', 'error', '-i', os.path.join(src, b['file']), '-af', af, '-ac', '1', '-sample_fmt', 's16', out], check=True)
    l['dur'] = round(peak_norm(out), 2); l['take'] = b['file']
    print(l['id'], l['dur'], b.get('asr', ''))
json.dump(lines, open(lp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
