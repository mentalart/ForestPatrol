#!/usr/bin/env python3
"""Звук серии 1, четвёртая редакция (ep ser01v4): музыка и шумы синтезом + голоса voice/ser01/ser01_1NN.wav.
  node tools/mult2d/shoot.js --ep ser01v4 --at 0     # разметка out/ser01v4/timeline.json (планы, реплики, звуковые метки)
  python3 tools/mult2d/audio_s4.py [выход.wav]       # → out/ser01v4_audio.wav
Инструменты синтеза (шкатулка, колокольчик, гусли, шумы) — общие с audio_ser01.py: берутся из него до первой сцены.
Музыка: тёплая шкатулка в штабе, колокольчик — лейтмотив Звенышка, тихая флейта-пэд — журнал Пелагеи, гул — Кощей;
«Тихая тревога» (метка quiet → drip) — музыка в ноль, только шорохи."""
import os, sys, json, wave, numpy as np

D = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, 'audio_ser01.py'), encoding='utf-8').read()
src = src[:src.index('# =================== Пролог')].replace("os.path.join(D, 'out', 'ser01', 'timeline.json')", "os.path.join(D, 'out', 'ser01v4', 'timeline.json')")
src = src.replace('D = os.path.dirname(os.path.abspath(__file__))', f'D = {D!r}')
exec(compile(src, 'audio_ser01.py', 'exec'))   # SR, DUR, L, R, SH, add, bell, box, pluck, pad, noise, whoosh, thump, caw, on, cue…

Q0, Q1 = cue('quiet') or 0, (cue('drip') or 0) + .6
def bed(t0, t1, chords, step=.32, gain=.13):   # шкатулка-перебор, кроме «тишины»
    t, i = t0, 0
    while t < t1:
        if not (Q0 - .3 < t < Q1):
            ch = chords[(i // 8) % len(chords)]; add(t, box(hz(ch[[0, 1, 2, 1, 3, 1, 2, 1][i % 8] % len(ch)]), 1.2), gain, -.3 + .6 * ((i % 8) / 7))
        t += step; i += 1
WARM = [['C4', 'E4', 'G4', 'C5'], ['A3', 'C4', 'E4', 'A4'], ['F3', 'A3', 'C4', 'F4'], ['G3', 'B3', 'D4', 'G4']]
NIGHT = [['A3', 'C4', 'E4', 'A4'], ['F3', 'A3', 'C4', 'E4'], ['D3', 'F3', 'A3', 'D4'], ['E3', 'G#3', 'B3', 'E4']]

t_title = cue('title') or 0; t_room = at(18) if len(SH) > 18 else t_title + 3
bed(at(0), cue('ding_far') or at(12), WARM, .26, .12)                                  # тревога и дежурство — бойко
add(at(12), pad([hz('A2'), hz('E3'), hz('A3')], (t_title or at(16)) - at(12), 1.2, 700), .22)   # ночь на крыше
bed(t_room, (cue('ding') or t_room + 20) - .5, WARM, .3, .11)                           # подушечная крепость
add(cue('ding') or 0, pad([hz('D3'), hz('A3'), hz('D4')], 3, .3, 900), .18)
bed((cue('caw') or 0) + 2, cue('frost') or 0, NIGHT, .34, .1)                         # фонарь, гайка, театр
add(cue('frost') or 0, pad([hz('A1'), hz('D#2'), hz('A2')], max(.5, Q0 - (cue('frost') or 0) + .3), 1, 400), .5)   # Кощей у окна
bed(Q1 + .3, cue('wind') or DUR - 8, WARM, .3, .13)                                     # первый настоящий вызов — тепло
add(cue('wind') or 0, pad([hz('A1'), hz('D#2'), hz('A2'), hz('D#3')], 6, 1, 500), .45)   # скала Кощея
t0 = at(len(SH) - 1)
for i, n in enumerate(['C5', 'D5', 'E5', 'G5', 'A5', 'C6']): add(t0 + .3 + i * .06, pluck(hz(n), 1.4, .8), .24, -.6 + i * .24)
for i, n in enumerate(['C3', 'G3', 'C4', 'E4', 'G4', 'C5', 'E5']): add(t0 + 1.6 + i * .03, pluck(hz(n), 2.6, .6), .28, -.6 + i * .2)

# ---------- шумы по меткам ----------
siren = lambda: (np.sign(np.sin(2 * np.pi * np.cumsum(np.interp(np.arange(int(SR * 1.6)), [0, SR * .8, SR * 1.6], [330, 760, 420])) / SR)) * .3
                 * np.minimum(1, np.arange(int(SR * 1.6)) / 2400) * np.minimum(1, (SR * 1.6 - np.arange(int(SR * 1.6))) / 9000))
on('lever', lambda: thump(160, .12), .5); on('lever', lambda: paper(.1), .4)
on('siren', siren, .55); on('siren', lambda: whoosh(.8), .3, .3, .2)
on('snap', lambda: thump(220, .1), .5); on('snap', lambda: bell(hz('E6'), .4), .2)
on('thud', lambda: thump(60, .4), 1.0); on('thud', lambda: noise(.4, 600, 200, .002, .3), .5)
on('whoosh', lambda: whoosh(.9), .6)
on('bucket', lambda: bell(hz('D4'), 1.2), .5); on('bucket', lambda: thump(90, .25), .6)
on('ding_far', lambda: bell(hz('A6'), 1.4), .12, .5)
on('flash_far', lambda: bell(hz('E6'), 2.4), .25); on('flash_far', lambda: bell(hz('B6'), 2), .12, -.3, .05)
on('title', lambda: whoosh(.6), .4); on('title', lambda: bell(hz('C6'), 2.5), .3, 0, .9)
on('ding', lambda: bell(hz('E6'), 1.6), .35); on('ding', lambda: bell(hz('A6'), 1.2), .2, .2, .15)
on('caw', caw, .32, .4); on('caw', caw, .25, -.3, .5); on('caw', caw, .2, .1, 1.1)
on('caw_far', caw, .1, .5); on('caw_far', caw, .08, -.4, .8)
on('clink', lambda: bell(hz('G6'), .5), .35)
on('bite', lambda: thump(300, .08), .4); on('bite', lambda: boing(500, 1400, .3), .25)
on('scissors', lambda: paper(.12), .5); on('scissors', lambda: paper(.12), .5, 0, .25); on('scissors', lambda: paper(.12), .5, 0, .5)
on('frost', lambda: noise(2.2, 9000, 6000, .4, .8), .25)
on('tap', lambda: thump(400, .05), .5); on('tap', lambda: thump(400, .05), .5, 0, .35); on('tap', lambda: thump(400, .05), .5, 0, .7)
on('drip', lambda: bell(hz('C7'), .3), .2); on('drip', lambda: bell(hz('A6'), .3), .15, 0, .5)
on('tick', lambda: thump(1800, .02), .5); on('tick', lambda: thump(1800, .02), .5, 0, .25)
on('wind', lambda: noise(5, 400, 900, .8, 1.5), .5)

# ---------- голоса поверх, музыка под ними тише ----------
V = np.zeros(N)
for v in TL['voice']:
    p = os.path.join(D, 'voice', 'ser01', v['id'] + '.wav')
    if not os.path.exists(p): print('нет записи', v['id']); continue
    with wave.open(p) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768
        if w.getnchannels() > 1: x = x.reshape(-1, w.getnchannels()).mean(1)
        if w.getframerate() != SR: x = np.interp(np.arange(0, len(x), w.getframerate() / SR), np.arange(len(x)), x)
    i = int(v['at'] * SR); V[i:i + len(x)] += x[:N - i] * (1.25 if v['who'] in ('pelageya', 'vo') else 1.0)
duck = np.convolve((np.abs(V) > .02).astype(float), np.ones(4800) / 4800, 'same')
mus = 1 - .55 * np.clip(duck * 3, 0, 1)
L *= mus; R *= mus; L += V * .9; R += V * .9
n = int(DUR * SR); mix = np.stack([L[:n], R[:n]], 1)
fade = np.minimum(1, (n - np.arange(n)) / (SR * .5)); mix *= fade[:, None]
mix = np.tanh(mix * 1.2) / np.tanh(1.2); mix *= .89 / np.max(np.abs(mix))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(D, 'out', 'ser01v4_audio.wav')
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
print('звук:', out, f'{DUR:.1f} с')
