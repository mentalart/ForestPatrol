#!/usr/bin/env python3
"""Звук пробы стиля: музыка и шумы синтезом + голоса VoiceStudio (voice/proba/): python3 tools/mult2d/audio_proba.py [выход.wav]
Метки времени — те же, что в ep_proba.js (voice — там же)."""
import os, sys, wave, numpy as np

SR, DUR = 48000, 24.8
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
for t in (.1, .2, .45, .7, .78): add(t, paper(.3), .35, rng.uniform(-.5, .5))
add(0, pad([hz('A2'), hz('E3'), hz('C4')], 6.0, 1.2, 900), .5)
for t, n, d in [(.3, 'E5', 1.6), (1.1, 'C5', 1.6), (1.9, 'D5', 1.6), (2.7, 'E5', 2), (3.6, 'A4', 1.6), (4.3, 'B4', 1.6), (5.0, 'C5', 2)]:
    add(t, box(hz(n), d), .3, .2)

# ---------- 2–3. Кощей: холодный гул, тритон, цепь звенит, разрыв ----------
add(5.6, whoosh(.7, False), .5)
add(5.8, pad([hz('A1'), hz('D#2'), hz('A2')], 4.9, .6, 500), .9)
n = int(SR * 4.8); t = np.arange(n) / SR
add(5.8, np.sin(2 * np.pi * (1800 + 300 * np.sin(t * 1.7)) * t) * .5 * np.sin(np.pi * t / 4.8) ** 2 * (.5 + .5 * np.sin(t * 23)), .04, .4)
add(6.2, bell(hz('D#3'), 3), .3, -.2)        # глаза открываются — холодный удар
n = int(SR * 1.9); t = np.arange(n) / SR
rise = np.sin(2 * np.pi * np.cumsum(200 + 700 * (t / 1.9) ** 2) / SR) * (t / 1.9) ** 2
add(8.7, rise, .18); add(8.7, noise(1.9, 500, 6000, shape=lambda u: u ** 2), .45)
tt = 9.5
while tt < 10.58:   # цепь дребезжит всё чаще
    add(tt, bell(rng.uniform(2200, 3600), .15), .12, rng.uniform(-.6, .6)); tt += .14 - .1 * (tt - 9.5)
add(10.6, boom(), 1.0); add(10.6, bell(hz('A3'), 3.5), .45); add(10.6, bell(hz('E5'), 2.5), .25, .3)
add(10.6, noise(1.2, 8000, 2000, .002, 1.0), .5)
for k in range(28):
    add(10.7 + rng.uniform(0, 1.9), bell(rng.uniform(2500, 6000), .35), .06, rng.uniform(-.9, .9))
add(11.6, whoosh(1.2), .5, .5)
add(10.9, pad([hz('A2'), hz('C3'), hz('E3'), hz('A3')], 2.4, .4, 1500), .45)

# ---------- 4. Штаб: тёплые гусли, карандаш, искра, влёт, иней ----------
add(12.75, whoosh(.55, False), .3); add(12.85, paper(.5), .7)
add(13.1, pad([hz('F3'), hz('A3'), hz('C4')], 5.9, .8, 1000), .38)
for i, (t, n) in enumerate([(13.2, 'F4'), (13.9, 'C5'), (15.4, 'A4'), (16.4, 'C5'), (18.3, 'F4')]): add(t, pluck(hz(n), 2.2, .4), .3, -.3 + .15 * i)
t = 13.15
while t < 14.1: add(t, noise(.07, 6000, 4000, .005, .05), .12, -.2); t += 1 / 12 * rng.uniform(1.5, 2.5)
for k, t in enumerate(np.linspace(13.7, 16.9, 9)): add(t, box(hz('A5') * 2 ** (k / 12), .4), .04 + k * .012, -.6)
add(16.95, whoosh(.7), .6, -.3); add(17.6, bell(hz('A5'), 1.8), .4); add(17.6, bell(hz('E6'), 1.5), .2, .3)
for k in range(30): add(17.25 + rng.uniform(0, .55), noise(.02, 9000, 7000, .001, .015), .25, -.6)
add(17.6, pad([hz('A1'), hz('D#2')], 1.0, .2, 400), .7)

# ---------- 5. Звенышко выпрыгивает ----------
n = int(SR * .35); t = np.arange(n) / SR
add(19.05, np.sin(2 * np.pi * np.cumsum(300 + 900 * t / .35) / SR) * np.exp(-t * 6), .35)
add(18.9, pad([hz('C3'), hz('G3'), hz('E4')], 2.8, .3, 1400), .32)
for k, n in enumerate(['C4', 'E4', 'G4', 'C5', 'E5', 'G5']): add(20.3 + k * .12, pluck(hz(n), 1.6, .7), .26, -.5 + k * .2)

# ---------- 6. Титр: золотая волна, буквы падают на струны, аккорд ----------
T = 21.7 - 16.9
add(16.55 + T, whoosh(.45), .5)
for i, n in enumerate(['C5', 'D5', 'E5', 'G5', 'A5', 'C6']): add(17.25 + T + i * .06 + .3, pluck(hz(n), 1.4, .8), .28, -.6 + i * .24)
for i, n in enumerate(['G4', 'C5', 'E5', 'G5']): add(17.6 + T + i * .06 + .3, pluck(hz(n), 1.4, .8), .3, .5 - i * .3)
for i, n in enumerate(['C3', 'G3', 'C4', 'E4', 'G4', 'C5', 'E5']): add(18.4 + T + i * .025, pluck(hz(n), 2.6, .6), .3, -.6 + i * .2)
add(18.4 + T, pad([hz('C3'), hz('E3'), hz('G3'), hz('C4')], 1.6, .2, 1800), .35)
add(18.45 + T, bell(hz('C6'), 2), .2)

# ---------- голоса (VoiceStudio) поверх, музыка под ними тише ----------
VOICE = [('kot_01', .7), ('koschei_01', 6.45), ('kot_02', 11.0), ('pelageya_01', 14.35), ('zvenyshko_01', 19.45)]
V = np.zeros(N)
for vid, at in VOICE:
    with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'voice', 'proba', vid + '.wav')) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768
        if w.getframerate() != SR: x = np.interp(np.arange(0, len(x), w.getframerate() / SR), np.arange(len(x)), x)
    i = int(at * SR); V[i:i + len(x)] += x[:N - i] * (1.6 if vid.startswith('pelageya') else 1.0)
duck = np.convolve((np.abs(V) > .02).astype(float), np.ones(4800) / 4800, 'same')
mus = 1 - .55 * np.clip(duck * 3, 0, 1)
L *= mus; R *= mus; L += V * .9; R += V * .9

mix = np.stack([L, R], 1)
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix *= .89 / np.max(np.abs(mix))
out = sys.argv[1] if len(sys.argv) > 1 else 'tools/mult2d/out/proba_audio.wav'
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
print('звук:', out, f'{DUR} с')
