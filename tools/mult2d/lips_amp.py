#!/usr/bin/env python3
"""Запасные метки рта, когда нет Rhubarb: форма рта по громкости и яркости звука, тот же JSON, что у Rhubarb (mouthCues A–H, X).
  python3 tools/mult2d/lips_amp.py voice/ser01            # все wav папки → voice/ser01/lips/<id>.json (метки Rhubarb не трогает)
  python3 tools/mult2d/lips_amp.py voice/ser01 --force    # перезаписать и метки Rhubarb
Rhubarb точнее (различает губные M/B/P и F/V), поэтому его метки главнее: файл с "generator": "rhubarb" без --force не меняется."""
import os, sys, json, glob, wave, numpy as np

def cues(path, fps=24):
    with wave.open(path) as w:
        sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768
        if w.getnchannels() > 1: x = x.reshape(-1, w.getnchannels()).mean(1)
    hop = sr // fps; n = len(x) // hop; out = []
    peak = max(1e-4, np.percentile(np.abs(x), 99))
    for i in range(n):
        f = x[i * hop:(i + 1) * hop]; e = np.sqrt(np.mean(f ** 2)) / peak
        sp = np.abs(np.fft.rfft(f * np.hanning(len(f)))); fr = np.fft.rfftfreq(len(f), 1 / sr)
        c = float((sp * fr).sum() / max(sp.sum(), 1e-9))   # яркость: высокая — свистящие и «и», низкая — «о», «у»
        if e < .06: v = 'X'
        elif e < .14: v = 'B'
        elif c > 3200: v = 'B' if e < .3 else 'C'
        elif c < 900: v = 'E' if e > .3 else 'F'
        elif e > .45: v = 'D'
        else: v = 'C'
        out.append(v)
    # держать форму не меньше 2 кадров (перекладка «на двойках»), склеить одинаковые
    for i in range(1, len(out) - 1):
        if out[i] != out[i - 1] and out[i] != out[i + 1]: out[i] = out[i - 1]
    res, s = [], 0
    for i in range(1, len(out) + 1):
        if i == len(out) or out[i] != out[s]:
            res.append({'start': round(s / fps, 2), 'end': round(i / fps, 2), 'value': out[s]}); s = i
    return {'metadata': {'soundFile': os.path.basename(path), 'duration': round(len(x) / sr, 2), 'generator': 'lips_amp'}, 'mouthCues': res}

if __name__ == '__main__':
    d = sys.argv[1]; force = '--force' in sys.argv
    os.makedirs(os.path.join(d, 'lips'), exist_ok=True)
    for p in sorted(glob.glob(os.path.join(d, '*.wav'))):
        o = os.path.join(d, 'lips', os.path.basename(p)[:-4] + '.json')
        if os.path.exists(o) and not force:
            try:
                if json.load(open(o, encoding='utf-8')).get('metadata', {}).get('generator') != 'lips_amp' and json.load(open(o, encoding='utf-8')).get('mouthCues'): continue
            except Exception: pass
        json.dump(cues(p), open(o, 'w', encoding='utf-8'), indent=0); print(o)
