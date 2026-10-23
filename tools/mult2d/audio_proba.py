#!/usr/bin/env python3
"""Звук пробы стиля (музыка и шумы синтезом, без голосов): python3 tools/mult2d/audio_proba.py [выход.wav]
Метки времени — те же, что в ep_proba.js. Голоса — позже из VoiceStudio (docs/47_mult2d_stil.md, «Голоса»)."""
import sys, wave, numpy as np

SR, DUR = 48000, 20.0
N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)
NOTE = {n: 440 * 2 ** ((i - 9) / 12) for i, n in enumerate('C C# D D# E F F# G G# A A# B'.split())}

def hz(name):  # 'A4', 'C#5'
    return NOTE[name[:-1]] * 2 ** (int(name[-1]) - 4)

def add(t, sig, gain=1.0, pan=0.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if j <= i: return
    s = sig[:j - i] * gain
    L[i:j] += s * np.sqrt((1 - pan) / 2) * 1.414; R[i:j] += s * np.sqrt((1 + pan) / 2) * 1.414

def env(n, a=0.005, d=1.0):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

def lowpass(x, cut):  # однополюсный ФНЧ; cut — число или массив по сэмплам
    cut = np.broadcast_to(np.asarray(cut, float), x.shape)
    a = 1 - np.exp(-2 * np.pi * cut / SR); y = np.empty_like(x); v = 0.0
    for k in range(len(x)): v += a[k] * (x[k] - v); y[k] = v
    return y

def box(f, d=1.4, n=None):  # музыкальная шкатулка / челеста
    n = n or int(SR * d * 3); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 3) + .12 * np.sin(2 * np.pi * 4.2 * f * t) * np.exp(-t * 6)) * env(n, .003, d)

def bell(f, d=2.0):  # «дзинь»: негармонические обертоны
    n = int(SR * d * 2.5); t = np.arange(n) / SR
    return sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t / (d / (1 + m * .4))) for m, a in [(1, 1), (2.76, .5), (5.4, .3), (8.93, .15)]) * np.minimum(1, t / .002)

def pluck(f, d=1.6, bright=.5):  # гусли: Карплус — Стронг
    n = int(SR * d); p = max(2, int(SR / f)); buf = rng.uniform(-1, 1, p); out = np.empty(n)
    for k in range(n):
        out[k] = buf[k % p]; buf[k % p] = .5 * (buf[k % p] + buf[(k + 1) % p]) * (.996 if bright > .3 else .99)
    return lowpass(out, 2500 + bright * 5000) * env(n, .001, d * .6)

def pad(freqs, d, a=1.0, cut=1200):
    n = int(SR * d); t = np.arange(n) / SR; x = np.zeros(n)
    for f in freqs:
        for det in (-.004, .004):
            ph = (f * (1 + det) * t) % 1; x += (2 * ph - 1) * .25
    x = lowpass(x, cut); e = np.minimum(1, t / a) * np.minimum(1, (d - t) / a)
    return x * e

def noise(d, cut0, cut1, a=.05, rel=.3, shape=None):
    n = int(SR * d); x = rng.normal(0, 1, n); t = np.arange(n) / SR
    y = lowpass(x, np.linspace(cut0, cut1, n)) - lowpass(x, np.linspace(cut0, cut1, n) * .25)
    e = shape(t / d) if shape else np.minimum(1, t / a) * np.minimum(1, (d - t) / rel)
    return y * e

def paper(d=.25):  # шорох бумаги
    return noise(d, 5000, 3000, .01, d * .8) * 1.4

def whoosh(d=.6, up=True):
    return noise(d, 400 if up else 3000, 3000 if up else 400, shape=lambda u: np.sin(np.pi * u) ** 2)

def boom():
    n = int(SR * 2.5); t = np.arange(n) / SR; f = 40 + 90 * np.exp(-t * 4)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.6)
    return s + lowpass(rng.normal(0, 1, n), 600) * np.exp(-t * 5) * .8

# ---------- 1. Лукоморье: колыбельная на шкатулке, раскладушка шуршит ----------
for t in (.1, .25, .45, .7, .78): add(t, paper(.3), .35, rng.uniform(-.5, .5))
add(0, pad([hz('A2'), hz('E3'), hz('C4')], 4.6, 1.2, 900), .5)
for t, n, d in [(.35, 'E5', 1.6), (.95, 'C5', 1.6), (1.55, 'D5', 1.6), (2.15, 'E5', 2), (2.9, 'A4', 1.6), (3.4, 'B4', 1.6), (3.85, 'C5', 2)]:
    add(t, box(hz(n), d), .32, .2)
add(1.6, bell(hz('E6'), 1.2), .06, .3)   # блик по цепи

# ---------- 2–3. Кощей: холодный гул, тритон, цепь звенит, разрыв ----------
add(4.0, whoosh(.7, False), .5)
add(4.2, pad([hz('A1'), hz('D#2'), hz('A2')], 4.1, .6, 500), .9)
n = int(SR * 4); t = np.arange(n) / SR
add(4.2, np.sin(2 * np.pi * (1800 + 300 * np.sin(t * 1.7)) * t) * .5 * np.sin(np.pi * t / 4) ** 2 * (.5 + .5 * np.sin(t * 23)), .04, .4)
add(5.05, bell(hz('D#3'), 3), .35, -.2)       # «Довольно.» — холодный удар
n = int(SR * 1.9); t = np.arange(n) / SR
rise = np.sin(2 * np.pi * np.cumsum(200 + 700 * (t / 1.9) ** 2) / SR) * (t / 1.9) ** 2
add(6.2, rise, .18); add(6.2, noise(1.9, 500, 6000, shape=lambda u: u ** 2), .45)
tt = 7.0
while tt < 8.08:   # цепь дребезжит всё чаще
    add(tt, bell(rng.uniform(2200, 3600), .15), .12, rng.uniform(-.6, .6)); tt += .14 - .1 * (tt - 7.0)
add(8.1, boom(), 1.0); add(8.1, bell(hz('A3'), 3.5), .45); add(8.1, bell(hz('E5'), 2.5), .25, .3)
add(8.1, noise(1.2, 8000, 2000, .002, 1.0), .5)
for k in range(28):
    add(8.2 + rng.uniform(0, 1.9), bell(rng.uniform(2500, 6000), .35), .07, rng.uniform(-.9, .9))
add(9.1, whoosh(1.2), .55, .5)
add(8.4, pad([hz('A2'), hz('C3'), hz('E3'), hz('A3')], 2.4, .4, 1500), .45)

# ---------- 4. Штаб: тёплые гусли, карандаш, искра, влёт, иней ----------
add(10.25, whoosh(.55, False), .3); add(10.35, paper(.5), .7)
add(10.6, pad([hz('F3'), hz('A3'), hz('C4')], 4.2, .8, 1000), .38)
for i, (t, n) in enumerate([(10.7, 'F4'), (11.2, 'C5'), (11.7, 'A4'), (12.2, 'C5'), (14.0, 'F4')]): add(t, pluck(hz(n), 2.2, .4), .32, -.3 + .15 * i)
t = 10.65
while t < 11.6: add(t, noise(.07, 6000, 4000, .005, .05), .12, -.2); t += 1 / 12 * rng.uniform(1.5, 2.5)
for k, t in enumerate(np.linspace(11.2, 12.7, 7)): add(t, box(hz('A5') * 2 ** (k / 12), .4), .05 + k * .015, -.6)
add(12.7, whoosh(.7), .6, -.3); add(13.4, bell(hz('A5'), 1.8), .4); add(13.4, bell(hz('E6'), 1.5), .2, .3)
for k in range(30): add(13.05 + rng.uniform(0, .55), noise(.02, 9000, 7000, .001, .015), .25, -.6)
add(13.35, pad([hz('A1'), hz('D#2')], 1.1, .2, 400), .7)

# ---------- 5. Звенышко выпрыгивает ----------
n = int(SR * .35); t = np.arange(n) / SR
add(14.75, np.sin(2 * np.pi * np.cumsum(300 + 900 * t / .35) / SR) * np.exp(-t * 6), .35)
add(15.0, bell(hz('A6'), .8), .3, .2); add(15.28, bell(hz('E6'), .8), .3, -.2)
for k, n in enumerate(['C4', 'E4', 'G4', 'C5', 'E5', 'G5']): add(15.4 + k * .1, pluck(hz(n), 1.6, .7), .3, -.5 + k * .2)
add(14.6, pad([hz('C3'), hz('G3'), hz('E4')], 2.4, .3, 1400), .32)

# ---------- 6. Титр: золотая волна, буквы падают на струны, аккорд ----------
add(16.55, whoosh(.45), .5)
for i, n in enumerate(['C5', 'D5', 'E5', 'G5', 'A5', 'C6']): add(17.25 + i * .06 + .3, pluck(hz(n), 1.4, .8), .28, -.6 + i * .24)
for i, n in enumerate(['G4', 'C5', 'E5', 'G5']): add(17.6 + i * .06 + .3, pluck(hz(n), 1.4, .8), .3, .5 - i * .3)
for i, n in enumerate(['C3', 'G3', 'C4', 'E4', 'G4', 'C5', 'E5']): add(18.4 + i * .025, pluck(hz(n), 2.6, .6), .3, -.6 + i * .2)
add(18.4, pad([hz('C3'), hz('E3'), hz('G3'), hz('C4')], 1.6, .2, 1800), .35)
add(18.45, bell(hz('C6'), 2), .2)
add(16.9, noise(.25, 2000, 6000, .01, .2), .2)

mix = np.stack([L, R], 1)
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix *= .89 / np.max(np.abs(mix))
out = sys.argv[1] if len(sys.argv) > 1 else 'tools/mult2d/out/proba_audio.wav'
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
print('звук:', out, f'{DUR} с')
