#!/usr/bin/env python3
"""Звук серии 1 «Звенышко»: музыка и шумы синтезом + голоса VoiceStudio (voice/ser01/).
  node tools/mult2d/shoot.js --ep ser01 --at 0        # разметка out/ser01/timeline.json (планы и реплики)
  python3 tools/mult2d/audio_ser01.py [выход.wav]     # → out/ser01_audio.wav
События — по звуковым меткам серии (cue в ser01_*.js → timeline.json: удар, «дзинь», шорох на кадре действия) и по планам
(план N — N-й shot серии, с нуля) для музыкальных подкладок; звук не съезжает, когда длина реплик меняет длину планов."""
import os, sys, json, wave, numpy as np
try: from scipy.signal import lfilter
except ImportError: lfilter = None

D = os.path.dirname(os.path.abspath(__file__))
TL = json.load(open(os.path.join(D, 'out', 'ser01', 'timeline.json'), encoding='utf-8'))
SR, DUR = 48000, TL['dur']
N = int(SR * DUR) + SR
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(11)
SH = TL['shots']
NOTE = {n: 440 * 2 ** ((i - 9) / 12) for i, n in enumerate('C C# D D# E F F# G G# A A# B'.split())}

def hz(name): return NOTE[name[:-1]] * 2 ** (int(name[-1]) - 4)
def at(shot, lt=0.0): return SH[shot][0] + lt              # время от начала плана
def end(shot, back=0.0): return SH[shot][1] - back
def length(shot): return SH[shot][1] - SH[shot][0]

def add(t, sig, gain=1.0, pan=0.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if j <= i or i < 0: return
    s = sig[:j - i] * gain
    L[i:j] += s * np.sqrt((1 - pan) / 2) * 1.414; R[i:j] += s * np.sqrt((1 + pan) / 2) * 1.414

def env(n, a=0.005, d=1.0):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

def lowpass(x, cut):   # однополюсный ФНЧ; cut — число или массив по сэмплам
    if np.isscalar(cut) and lfilter is not None:
        a = 1 - np.exp(-2 * np.pi * cut / SR); return lfilter([a], [1, a - 1], x)
    cut = np.broadcast_to(np.asarray(cut, float), x.shape)
    a = 1 - np.exp(-2 * np.pi * cut / SR); y = np.empty_like(x); v = 0.0
    for k in range(len(x)): v += a[k] * (x[k] - v); y[k] = v
    return y

def box(f, d=1.4):   # музыкальная шкатулка
    n = int(SR * d * 3); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 3) + .12 * np.sin(2 * np.pi * 4.2 * f * t) * np.exp(-t * 6)) * env(n, .003, d)

def bell(f, d=2.0):   # «дзинь»
    n = int(SR * d * 2.5); t = np.arange(n) / SR
    return sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t / (d / (1 + m * .4))) for m, a in [(1, 1), (2.76, .5), (5.4, .3), (8.93, .15)]) * np.minimum(1, t / .002)

_pl = {}
def pluck(f, d=1.6, bright=.5):   # гусли: Карплус — Стронг (кэш по ноте)
    k = (round(f, 2), d, bright)
    if k in _pl: return _pl[k]
    n = int(SR * d); p = max(2, int(SR / f)); buf = rng.uniform(-1, 1, p); out = np.empty(n); dec = .996 if bright > .3 else .99
    for i in range(n):
        j = i % p; out[i] = buf[j]; buf[j] = .5 * (buf[j] + buf[(i + 1) % p]) * dec
    _pl[k] = lowpass(out, 2500 + bright * 5000) * env(n, .001, d * .6)
    return _pl[k]

def pad(freqs, d, a=1.0, cut=1200):
    n = int(SR * d); t = np.arange(n) / SR; x = np.zeros(n)
    for f in freqs:
        for det in (-.004, .004):
            ph = (f * (1 + det) * t) % 1; x += (2 * ph - 1) * .25
    x = lowpass(x, cut); e = np.minimum(1, t / a) * np.minimum(1, np.maximum(0, d - t) / a)
    return x * e

def noise(d, cut0, cut1, a=.05, rel=.3, shape=None):
    n = int(SR * d); x = rng.normal(0, 1, n); t = np.arange(n) / SR
    c = np.linspace(cut0, cut1, n) if cut0 != cut1 else cut0
    y = lowpass(x, c) - lowpass(x, c * .25 if np.isscalar(c) else c * .25)
    e = shape(t / d) if shape else np.minimum(1, t / a) * np.minimum(1, np.maximum(0, d - t) / rel)
    return y * e

def paper(d=.25): return noise(d, 5000, 3000, .01, d * .8) * 1.4
def whoosh(d=.6, up=True): return noise(d, 400 if up else 3000, 3000 if up else 400, shape=lambda u: np.sin(np.pi * u) ** 2)
def thump(f=70, d=.35):
    n = int(SR * d); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(f + 120 * np.exp(-t * 30)) / SR) * np.exp(-t / (d / 4))
def boom():
    n = int(SR * 2.5); t = np.arange(n) / SR; f = 40 + 90 * np.exp(-t * 4)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.6) + lowpass(rng.normal(0, 1, n), 600) * np.exp(-t * 5) * .8
def thunder(d=2.5): return noise(d, 300, 120, .02, d * .7) * 2.2 + boom()[:int(SR * d)] * .4
def zap(d=.25): return noise(d, 9000, 3000, .001, d * .6) * .8
def boing(f0=300, f1=1200, d=.35):
    n = int(SR * d); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(f0 + (f1 - f0) * t / d) / SR) * np.exp(-t * 6)
def caw():   # ворон: хриплое «кар»
    n = int(SR * .45); t = np.arange(n) / SR; f = 520 - 140 * t / .45
    x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .5 + rng.normal(0, .4, n)
    return (lowpass(x, 2200) - lowpass(x, 600)) * np.sin(np.pi * t / .45) ** .6 * 2
def drone(d, notes=('A1', 'D#2', 'A2'), cut=500): return pad([hz(n) for n in notes], d, .6, cut)
def melody(t0, notes, step=.4, f=box, gain=.28, pan=.2, dd=1.4):
    for i, n in enumerate(notes):
        if n: add(t0 + i * step, f(hz(n), dd) if f is box else f(hz(n), dd, .5), gain, pan)
def gusli_bed(t0, t1, chords, step=.25, gain=.16):   # переборы гуслей: аккорды по два такта
    t, i = t0, 0
    while t < t1:
        ch = chords[(i // 8) % len(chords)]; n = ch[[0, 1, 2, 1, 3, 1, 2, 1][i % 8] % len(ch)]
        add(t, pluck(hz(n), 1.2, .5), gain * (1.2 if i % 4 == 0 else .9), -.4 + .8 * ((i % 8) / 7)); t += step; i += 1

LULLABY = ['E5', 'C5', 'D5', 'E5', None, 'A4', 'B4', 'C5', None, 'E5', 'D5', 'C5', 'B4', 'A4']   # «Баю-баю, за рекою…»
CUES = {}
for c in TL.get('cues', []): CUES.setdefault(c['name'], []).append(c['t'])
def cue(name, k=0): return CUES[name][k] if name in CUES and len(CUES[name]) > k else None
def each(name): return CUES.get(name, [])
def on(name, sig, gain=1.0, pan=0.0, dt=0.0, k=None):
    for i, t in enumerate(each(name)):
        if k is None or i == k: add(t + dt, sig() if callable(sig) else sig, gain, pan)
def heart(): return thump(55, .25)
def glass():
    x = noise(.5, 9000, 4000, .001, .4) * 1.6
    for f in (2600, 3400, 4700, 6100): b = bell(f, .15); m = min(len(x), len(b)); x[:m] += b[:m] * .2
    return x
def scratch(): n = int(SR * .5); t = np.arange(n) / SR; return np.sin(2 * np.pi * np.cumsum(900 - 1600 * t) / SR) * np.exp(-t * 4) * .5 + noise(.5, 3000, 300) * .6

# =================== Пролог: погоня и стоп-кадр ===================
add(at(0), drone(length(0), ('D2', 'G#2', 'D3')), .7)
on('whoosh_in', lambda: whoosh(3.4), .7)
for k in range(10): add(at(0, .3 + k * .3), caw() if k % 3 == 0 else noise(.06, 5000, 2000, .002, .05), .12, .4 - k * .08)
on('freeze', scratch, .7); on('freeze', lambda: paper(.5), .8, .0, .1); on('freeze', lambda: bell(hz('C6'), 1), .3, .0, .05)
melody(cue('freeze') + .8, ['C5', 'E5', 'G5', 'E5', 'C5'], .18, f=pluck, gain=.16, dd=.6)

# =================== 1. Сказка у дуба: тёплая шкатулка; Кощей — холодный гул ===================
add(at(1), pad([hz('A2'), hz('E3'), hz('C4')], length(1) + .4, 1.0, 900), .42)
melody(at(1, .2), LULLABY[:9], .45, gain=.18)
on('bac', lambda: thump(95, .3), .55); on('bac', lambda: bell(hz('G5'), .6), .2)
for t0 in each('kids_laugh'):
    for k in range(10): add(t0 + k * .11, pluck(hz(['C5', 'E5', 'G5', 'E5'][k % 4]), .3, .9), .12, rng.uniform(-.7, .7))
for s in (2, 3): add(at(s), drone(length(s) + .3), .75)
on('turn', lambda: bell(hz('D#4'), 2.5), .28, .3)
on('tear', lambda: bell(hz('E6'), 1.6), .35); on('tear', lambda: bell(hz('B6'), 1.2), .15, .2)
add(at(4), pad([hz('A2'), hz('E3'), hz('C4')], length(4) + .3, .8, 900), .38)
t0 = cue('lullaby')
if t0: melody(t0, LULLABY, .38, gain=.17, pan=-.2)
add(at(5), drone(length(5) + length(6) + length(7), ('A1', 'D#2', 'G#2')), .85)
on('notes_freeze', lambda: noise(.6, 9000, 6000, .002, .4), .3)
for k in range(6): add(cue('notes_freeze') + k * .12, bell(rng.uniform(3500, 6000), .3), .1, rng.uniform(-.5, .5))
on('fist', lambda: thump(55, .5), .8); on('fist', lambda: bell(hz('D#4'), 2), .3)
on('thunder', lambda: thunder(2.0), .6); on('thunder', zap, .5, -.3)
on('cloud', lambda: noise(2.2, 200, 900, .4, .6, shape=lambda u: u ** 1.5), .9)
# Колобок: пиццикато вприпрыжку, «бум» на каждом сбитом зверьке
for k, n in enumerate(['A3', 'E4', 'A3', 'C4', 'E4', 'A4', 'G4', 'E4', 'C5', 'E5']): add(at(8, .1) + k * .26, pluck(hz(n), .5, .8), .28, .6 - k * .12)
on('hop', lambda: boing(300, 700, .25), .3)
for k in range(int(length(8) / .45)): add(at(8, .75 + k * .45), thump(110, .15), .2)
on('bristle', lambda: bell(hz('F#4'), 1.2), .3); on('bristle', lambda: whoosh(.3), .4)
add(at(9), drone(length(9) + length(10) + .2, ('A1', 'D#2', 'A2')), .8)
B = cue('snap'); T0 = cue('tense')
if T0:   # цепь натягивается: подъём и дребезг всё чаще
    n = int(SR * (B - T0)); tt = np.arange(n) / SR; d = B - T0
    add(T0, np.sin(2 * np.pi * np.cumsum(200 + 700 * (tt / d) ** 2) / SR) * (tt / d) ** 2, .18)
    add(T0, noise(d, 500, 6000, shape=lambda u: u ** 2), .4)
    x = T0
    while x < B - .02: add(x, bell(rng.uniform(2200, 3600), .15), .1, rng.uniform(-.6, .6)); x += .2 - .14 * (x - T0) / d
add(B, boom(), 1.0); add(B, bell(hz('A3'), 3.5), .45); add(B, bell(hz('E5'), 2.5), .25, .3); add(B, noise(1.2, 8000, 2000, .002, 1.0), .5)
for k in range(28): add(B + .1 + rng.uniform(0, 1.9), bell(rng.uniform(2500, 6000), .35), .06, rng.uniform(-.9, .9))
add(B + .3, pad([hz('A2'), hz('C3'), hz('E3'), hz('A3')], 2.4, .4, 1500), .4)
add(at(12), drone(length(12), ('A1', 'D#2')), .6)
on('bite', lambda: bell(hz('A5'), .8), .4); on('bite', lambda: thump(140, .15), .4)
on('zing', lambda: boing(400, 1600, .35), .4); on('zing', lambda: whoosh(.8), .5, .4)
for t0 in each('crows'):
    for k in range(5): add(t0 + k * .22, caw(), .2, -.5 + k * .25)
WORLD = [['E3', 'B3', 'G4'], ['D3', 'A3', 'F#4'], ['G3', 'D4', 'B4'], ['A2', 'E3', 'C4'], ['C3', 'G3', 'E4']]
for i, ch in enumerate(WORLD):
    add(at(13 + i), whoosh(.6, False), .4, .3 - i * .15)
    t0 = cue('land%d' % i)
    if t0:
        add(t0, bell(hz(ch[2]) * 2, 1.4), .3); add(t0, thump(80, .3), .4)
        for k, n in enumerate(ch): add(t0 + k * .05, pluck(hz(n), 1.6, .6), .24, -.4 + k * .4)
add(at(18), pad([hz('A2'), hz('C3'), hz('E3')], length(18) + .3, 1.0, 700), .5)
on('stone', lambda: noise(2.5, 1500, 400, .3, 1.5), .25)
for k in range(16): add(at(18, .5) + k * .22, noise(.12, 3000, 1500, .01, .1), .1, rng.uniform(-.7, .7))
t0 = cue('title')
add(t0 - .3, whoosh(.45), .5)
for i, n in enumerate(['C5', 'D5', 'E5', 'G5', 'A5', 'C6']): add(t0 + .5 + i * .06, pluck(hz(n), 1.4, .8), .28, -.6 + i * .24)
for i, n in enumerate(['C3', 'G3', 'C4', 'E4', 'G4', 'C5', 'E5']): add(t0 + 1.7 + i * .025, pluck(hz(n), 2.6, .6), .3, -.6 + i * .2)
add(t0 + 1.7, pad([hz('C3'), hz('E3'), hz('G3'), hz('C4')], 2.4, .3, 1800), .35); add(t0 + 1.75, bell(hz('C6'), 2), .2)

# =================== 2. Лесной патруль: гусли, гэг-цепочка, куча-мала ===================
gusli_bed(at(20), end(23), [['C4', 'E4', 'G4', 'C5'], ['F3', 'A3', 'C4', 'F4'], ['G3', 'B3', 'D4', 'G4'], ['C4', 'E4', 'G4', 'C5']], .26, .12)
add(at(20), pad([hz('C3'), hz('G3'), hz('E4')], end(23) - at(20), 1.5, 1000), .22)
on('catapult', lambda: thump(140, .2), .5); on('catapult', lambda: boing(500, 180, .3), .3); on('catapult', lambda: whoosh(.8), .4, -.4, .05)
on('catch', lambda: thump(90, .25), .6); on('catch', lambda: bell(hz('C6'), .5), .15)
on('crunch', lambda: noise(.18, 4000, 1500, .003, .1), .6); on('crunch', lambda: noise(.15, 4000, 1500, .003, .1), .5, 0, .2)
on('splash', lambda: noise(.5, 5000, 1800, .005, .35), .5, .3)
on('bloom', lambda: bell(hz('G5'), 1.4), .3); on('bloom', lambda: bell(hz('C6'), 1.2), .2, .3, .06)
pp = cue('paper') or 0
x = pp - 3.5
while x < pp - .3: add(x, noise(.06, 6000, 4000, .005, .05), .1, .2); x += 1 / 12 * rng.uniform(1.5, 2.5)
on('paper', lambda: paper(.5), .7); on('paper', lambda: whoosh(.7), .3, -.3, .1); on('bonk', lambda: boing(600, 250, .3), .35); on('bonk', lambda: thump(160, .12), .4)
for k in range(10): add(at(23, .05) + k * .17, thump(100 + 20 * (k % 3), .12), .25, -.5 + (k % 4) * .3)
on('jam', lambda: thump(70, .5), .9); on('jam', lambda: noise(.5, 2500, 800, .002, .3), .5)
for k in range(4): add(cue('jam') + .2 + k * .2, noise(.12, 1500, 800, .002, .1), .3)   # дверь трещит
on('pop', lambda: boing(200, 900, .25), .5); on('slam', lambda: thump(80, .4), .9); on('slam', lambda: noise(.3, 2000, 600, .002, .2), .4)
add(at(24), pad([hz('A2'), hz('E3'), hz('C4')], length(24), .8, 900), .35); melody(at(24, .4), LULLABY[:8], .32, gain=.13, pan=.3)
melody(at(25, .2), ['C4', 'E4', 'G4', 'E4', 'C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4', 'E4'], .3, f=pluck, gain=.16, dd=.8)
for k in range(int(length(25) / .5)): add(at(25, .3 + k * .5), noise(.4, 1200, 600, .05, .2), .12, .4 * np.sin(k))   # колёса самоката
t0 = cue('scooter_boom')
add(t0, thump(90, .3), .7); add(t0, noise(.6, 3000, 800, .005, .4), .35)
for k in range(12): add(t0 + rng.uniform(0, .9), bell(rng.uniform(900, 2400), .2), .14, rng.uniform(-.8, .8))
for k in range(5): add(t0 + .5 + k * .12, thump(150 + k * 20, .1), .25)
gusli_bed(at(26), end(26), [['C4', 'E4', 'G4', 'C5'], ['G3', 'B3', 'D4', 'G4']], .2, .11)

# =================== 3. Погоня: тревога, вороны, рикошеты, тишина ===================
add(at(27), pad([hz('D3'), hz('A3'), hz('F4')], length(27) + length(28), 1, 1000), .35)
for k in range(10): add(at(27, (k * .41) % 2.2), bell(rng.uniform(3000, 6000), .5), .05, rng.uniform(-.8, .8))
on('owl_turn', lambda: bell(hz('E5'), 1.2), .3); on('owl_turn', lambda: whoosh(.3), .3)
on('squeak', lambda: boing(1200, 1800, .15), .2)
add(at(28), pad([hz('C4'), hz('E4'), hz('G4')], length(28), .3, 1200), .15)
add(at(29), drone(length(29), ('D2', 'G#2', 'D3')), .7)
for k in range(int(length(29) / .125)): add(at(29) + k * .125, pluck(hz(['D3', 'D3', 'F3', 'D3', 'G#3', 'D3', 'F3', 'A3'][k % 8]), .25, .6), .2, -.3 + .6 * (k % 2))
for k in range(6): add(at(29, .2 + k * .65), caw(), .18, .2 * np.sin(k))
on('smack', lambda: thump(120, .2), .7); on('smack', lambda: noise(.4, 3000, 1500, .002, .3), .4)
for k in range(3): add(cue('smack') + .3 + k * .25, bell(hz('C7') * (1 + k * .1), .3), .08)
add(at(30), drone(length(30), ('A1', 'D#2', 'A2')), .55)
on('glass', glass, .8); on('glass', lambda: whoosh(.6), .5)
for i, t0 in enumerate(each('ricochet')): add(t0, bell(hz(['A5', 'C6', 'E6', 'G5', 'D6', 'B5', 'F6', 'A6'][i % 8]), .7), .28, rng.uniform(-.6, .6)); add(t0, thump(130, .1), .3)
on('thud', lambda: thump(70, .4), .7)
add(at(31), drone(length(31) + length(32), ('A1', 'D#2')), .8)
on('knock', lambda: thump(400, .08), .5, -.4); on('knock', lambda: thump(400, .08), .45, -.4, .15)
for k in range(30): add(at(31, .4 + rng.uniform(0, 2)), noise(.02, 9000, 7000, .001, .015), .2, -.4)
on('eyes', lambda: bell(hz('D#4'), 2), .3, 0, 0, 0)
on('dive', lambda: whoosh(.5), .4); on('dive', lambda: bell(hz('A5'), 1.0), .3, 0, .2); on('shut', lambda: thump(110, .15), .7); on('shut', lambda: paper(.3), .5)
for k in range(int(length(32) / .9)): add(at(32, .3 + k * .9), heart(), .5); add(at(32, .45 + k * .9), heart(), .35)   # сердце стучит в тишине
for k in range(40): add(at(32, .5 + rng.uniform(0, 3.6)), noise(.025, 8000, 6000, .001, .02), .14, rng.uniform(-.5, .5))   # иней потрескивает
on('relief', lambda: pad([hz('C3'), hz('G3'), hz('E4')], 2.0, .6, 1200), .3)
on('popup', lambda: paper(.6), .7); on('popup', lambda: whoosh(.5), .3)
for k in range(4): add(cue('popup') + .7 + k * .2, bell(hz(['C6', 'E6', 'G6', 'C7'][k]), .6), .14, -.3 + k * .2)
on('boing', lambda: boing(300, 1200, .35), .35)
add(at(33), pad([hz('C3'), hz('G3'), hz('E4')], length(33), .3, 1400), .3)
for k, n in enumerate(['C4', 'E4', 'G4', 'C5', 'E5', 'G5']): add(at(33, 1.9) + k * .12, pluck(hz(n), 1.6, .7), .22, -.5 + k * .2)
add(at(34), pad([hz('F3'), hz('A3'), hz('C4'), hz('E4')], length(34), 1.0, 1300), .32)
melody(at(34, .3), ['C5', 'E5', 'G5', None, 'A5', 'G5', 'E5', None, 'F5', 'E5', 'D5', 'C5'], .35, f=pluck, gain=.14, dd=1.2)

# =================== 4. Присказка: надежда, клиффхэнгер, карточка ===================
gusli_bed(at(35), end(36), [['C4', 'E4', 'G4', 'C5'], ['A3', 'C4', 'E4', 'A4'], ['F3', 'A3', 'C4', 'F4'], ['G3', 'B3', 'D4', 'G4']], .3, .14)
add(at(35), pad([hz('C3'), hz('G3'), hz('E4')], end(36) - at(35), 1.5, 1100), .3)
for k in range(int(length(35) / .45)): add(at(35, .3 + k * .45), thump(120, .1), .12, -.3)   # шаги по доскам
add(at(37), drone(length(37) + .3, ('A1', 'D#2', 'A2')), .9)
on('caw', caw, .28, .3); on('eyes', lambda: bell(hz('D#3'), 3), .3, 0, 0, 1)
t0 = cue('card'); add(t0 - .3, whoosh(.45), .5)
for i, n in enumerate(['C5', 'D5', 'E5', 'G5', 'A5', 'C6']): add(t0 + .3 + i * .06, pluck(hz(n), 1.4, .8), .26, -.6 + i * .24)
for i, n in enumerate(['C3', 'G3', 'C4', 'E4', 'G4', 'C5', 'E5']): add(t0 + 1.8 + i * .03, pluck(hz(n), 2.6, .6), .3, -.6 + i * .2)
add(t0 + 1.8, pad([hz('C3'), hz('E3'), hz('G3'), hz('C4')], length(38) - 1.8, .3, 1800), .35)

# ---------- голоса поверх, музыка под ними тише ----------
V = np.zeros(N)
for v in TL['voice']:
    p = os.path.join(D, 'voice', 'ser01', v['id'] + '.wav')
    if not os.path.exists(p): print('нет записи', v['id']); continue
    with wave.open(p) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768
        if w.getnchannels() > 1: x = x.reshape(-1, w.getnchannels()).mean(1)
        if w.getframerate() != SR: x = np.interp(np.arange(0, len(x), w.getframerate() / SR), np.arange(len(x)), x)
    i = int(v['at'] * SR); V[i:i + len(x)] += x[:N - i] * (1.5 if v['who'] == 'pelageya' else 1.0)
duck = np.convolve((np.abs(V) > .02).astype(float), np.ones(4800) / 4800, 'same')
mus = 1 - .55 * np.clip(duck * 3, 0, 1)
L *= mus; R *= mus; L += V * .9; R += V * .9

n = int(DUR * SR); mix = np.stack([L[:n], R[:n]], 1)
fade = np.minimum(1, (n - np.arange(n)) / (SR * .5)); mix *= fade[:, None]
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix *= .89 / np.max(np.abs(mix))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(D, 'out', 'ser01_audio.wav')
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
print('звук:', out, f'{DUR:.1f} с')
