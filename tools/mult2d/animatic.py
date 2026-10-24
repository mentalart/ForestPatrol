#!/usr/bin/env python3
"""Аниматик серии 1 (четвёртая редакция, `zlataya_cep/docs/51_ser01_v4_plan.md`): панели раскадровки ChatGPT
(`art/ser01v4/sb/sb1…sb8.png`, по 6 панелей 3×2) + голоса `voice/ser01/ser01_1NN.wav` + черновой звук.
  python3 tools/mult2d/animatic.py [--fast]   → out/ser01_animatic.mp4 (1080×1920, 24 к/с) и out/ser01_animatic.json (тайминг планов)
План растягивается под свои реплики, поэтому перезапись голоса не ломает монтаж. --fast — 540×960 для быстрой проверки."""
import os, sys, json, wave, subprocess, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

D = os.path.dirname(os.path.abspath(__file__))
SB = os.path.join(D, 'art', 'ser01v4', 'sb'); VD = os.path.join(D, 'voice', 'ser01'); OUT = os.path.join(D, 'out')
FAST = '--fast' in sys.argv
W, H, FPS, SR = (540, 960, 24, 48000) if FAST else (1080, 1920, 24, 48000)
K = W / 1080
FONT_UI = os.path.join(D, 'fonts', 'Rubik.ttf'); FONT_T = os.path.join(D, 'fonts', 'RuslanDisplay-Regular.ttf')

WHO = {'proshka': ('Прошка', '#F08A4B'), 'potap': ('Потап', '#D9A070'), 'yosha': ('Йоша', '#4FD1C9'),
       'pelageya': ('Пелагея', '#C7A6EC'), 'tishka': ('Тишка', '#F4B266'), 'zven': ('Звенышко', '#F0C04A'),
       'koschei': ('Кощей', '#9FF6FF')}
VO = {'ser01_107', 'ser01_108', 'ser01_110', 'ser01_120'}   # голос Пелагеи за кадром — журнал

# План: (панель 1–48, мин. длина, реплики, камера, сдвиг окна по высоте 0…1, звук)
# камера: in — наезд, out — отъезд, up/down — проезд по вертикали, l/r — вбок, hit — удар, still — почти неподвижно
SHOTS = [
    (1, 1.4, ['ser01_101'], 'in', .45, 'lever'),
    (2, 1.4, [], 'hit', .30, 'siren'),
    (3, 1.2, [], 'down', .50, 'thud'),
    (4, 1.0, ['ser01_102'], 'r', .45, 'creak'),
    (5, 1.0, ['ser01_103'], 'hit', .50, 'thud'),
    (6, 1.0, ['ser01_104'], 'down', .35, 'whoosh'),
    (7, 1.0, [], 'hit', .60, 'bucket'),
    (8, 1.0, ['ser01_105'], 'in', .45, ''),
    (9, 1.0, ['ser01_106'], 'in', .40, 'tick'),
    (10, 1.2, [], 'hit', .50, 'thud'),
    (11, 1.0, ['ser01_107', 'ser01_108'], 'in', .50, 'pencil'),
    (12, 1.0, ['ser01_109'], 'still', .45, 'yawn'),
    (13, 1.8, [], 'out', .45, 'night'),
    (14, 1.4, [], 'in', .40, 'ding'),
    (15, 1.3, [], 'still', .45, 'creak'),
    (16, 2.2, [], 'in', .40, 'flash'),
    (17, 1.0, ['ser01_110'], 'in', .50, 'pencil'),
    (18, 2.8, [], 'title', .45, 'title'),
    (19, 1.4, [], 'r', .45, 'laugh'),
    (20, 1.0, ['ser01_111', 'ser01_112'], 'in', .45, ''),
    (21, 1.0, ['ser01_113'], 'hit', .45, ''),
    (22, 1.0, ['ser01_114'], 'still', .45, 'laugh'),
    (23, 1.0, ['ser01_115', 'ser01_116'], 'in', .45, 'wings'),
    (24, 1.0, ['ser01_117', 'ser01_118', 'ser01_119'], 'in', .40, 'snore'),
    (25, 1.0, ['ser01_120'], 'in', .45, ''),
    (26, 1.6, [], 'up', .35, 'night'),
    (27, 1.8, [], 'in', .45, 'ding'),
    (28, 1.0, [], 'hit', .50, 'flash'),
    (29, 2.0, [], 'out', .35, 'caw'),
    (30, 1.0, ['ser01_121'], 'in', .45, 'ding'),
    (31, 1.0, ['ser01_122'], 'still', .40, ''),
    (30, 1.0, ['ser01_123'], 'hit', .55, ''),
    (32, 1.0, ['ser01_124', 'ser01_125'], 'in', .45, 'bite'),
    (33, 1.0, ['ser01_126', 'ser01_127'], 'still', .45, ''),
    (34, 1.0, ['ser01_128'], 'in', .45, 'scissors'),
    (35, 1.0, ['ser01_129'], 'r', .40, 'ding'),
    (36, 1.0, ['ser01_130'], 'in', .40, 'snap'),
    (37, 1.0, ['ser01_131'], 'still', .45, 'laugh'),
    (38, 2.2, [], 'in', .40, 'frost'),
    (39, 1.0, ['ser01_132', 'ser01_133'], 'in', .45, ''),
    (40, 1.0, ['ser01_134'], 'still', .45, ''),
    (41, 3.0, [], 'down', .35, 'caw_far'),
    (42, 1.0, ['ser01_135', 'ser01_136', 'ser01_137', 'ser01_138'], 'in', .45, 'tick'),
    (43, 1.0, ['ser01_139', 'ser01_140'], 'out', .45, 'door'),
    (44, 1.8, [], 'up', .45, 'night'),
    (45, 2.0, [], 'in', .40, 'wind'),
    (46, 1.0, ['ser01_141'], 'in', .45, 'frost'),
    (47, 1.6, [], 'out', .40, 'caw'),
    (48, 4.0, [], 'card', .45, 'title'),
]
QUIET = (38, 41)   # тишина: музыка в ноль от плана 38 до конца плана 41


def wav(p):
    with wave.open(p) as w:
        a = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(np.float32) / 32768
        if w.getnchannels() > 1: a = a.reshape(-1, w.getnchannels()).mean(1)
        sr = w.getframerate()
    if sr != SR: a = np.interp(np.arange(0, len(a), sr / SR), np.arange(len(a)), a).astype(np.float32)
    return a


LINES = {l['id']: l for l in json.load(open(os.path.join(VD, 'lines.json'), encoding='utf-8'))}
VOICE = {i: wav(os.path.join(VD, i + '.wav')) for s in SHOTS for i in s[2] if os.path.exists(os.path.join(VD, i + '.wav'))}

# ---------- тайминг ----------
LEAD, GAP, TAIL = .12, .1, .22
tl, t = [], 0.0
for n, mind, ids, cam, ay, fx in SHOTS:
    vt, c = [], LEAD
    for i in ids:
        d = len(VOICE[i]) / SR if i in VOICE else max(1.2, len(LINES[i]['text']) * .07)
        vt.append((i, t + c, d)); c += d + GAP
    dur = max(mind, c - GAP + TAIL if ids else mind)
    tl.append({'panel': n, 'a': round(t, 3), 'b': round(t + dur, 3), 'cam': cam, 'ay': ay, 'fx': fx,
               'voice': [{'id': i, 'at': round(a, 3), 'dur': round(d, 3)} for i, a, d in vt]})
    t += dur
T = t
os.makedirs(OUT, exist_ok=True)
json.dump({'dur': round(T, 2), 'shots': tl}, open(os.path.join(OUT, 'ser01_animatic.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('хронометраж %.1f с, планов %d' % (T, len(tl)))

# ---------- панели ----------
def panels(path):
    """6 панелей листа 3×2: строки — по сплошным кремовым полосам, столбцы — отдельно в каждой строке
    (ширины панелей в строках бывают разными), затем кремовые края каждой панели обрезаются."""
    im = Image.open(path).convert('RGB'); a = np.asarray(im).astype(int); bg = a[4, 4]
    m = np.abs(a - bg).sum(2) < 45
    def runs(v, th):
        r, s_ = [], None
        for i, x in enumerate(v > th):
            if x and s_ is None: s_ = i
            if not x and s_ is not None: r.append((s_, i)); s_ = None
        if s_ is not None: r.append((s_, len(v)))
        return [x for x in r if x[1] - x[0] >= 4 or x[0] == 0 or x[1] == len(v)]
    def bands(v, n, th=.85):
        g = runs(v, th); segs = [(g[i][1], g[i + 1][0]) for i in range(len(g) - 1)]
        segs = sorted(segs, key=lambda x: x[1] - x[0], reverse=True)[:n]
        return sorted(segs) if len(segs) == n else None
    ys = bands(m.mean(1), 2) or [(12, im.height // 2 - 12), (im.height // 2 + 12, im.height - 12)]
    out = []
    for y0, y1 in ys:
        xs = bands(m[y0:y1].mean(0), 3) or [(int(i * im.width / 3) + 12, int((i + 1) * im.width / 3) - 12) for i in range(3)]
        for x0, x1 in xs:
            c = m[y0:y1, x0:x1]; rows = np.where(c.mean(1) < .5)[0]; cols = np.where(c.mean(0) < .5)[0]
            if len(rows) and len(cols): y0b, y1b, x0b, x1b = y0 + rows[0], y0 + rows[-1], x0 + cols[0], x0 + cols[-1]
            else: y0b, y1b, x0b, x1b = y0, y1, x0, x1
            out.append(im.crop((x0b + 8, y0b + 8, x1b - 8, y1b - 8)))
    return out

PAN = {}
for s in range(1, 9):
    p = os.path.join(SB, 'sb%d.png' % s)
    if os.path.exists(p):
        for k, im in enumerate(panels(p)): PAN[(s - 1) * 6 + k + 1] = im

def frame_of(n):
    """Панель → увеличенный слой шириной W*1.18 (запас на движение камеры), с лёгкой резкостью."""
    im = PAN.get(n)
    if im is None:
        im = Image.new('RGB', (360, 760), '#1A2148'); ImageDraw.Draw(im).text((20, 20), 'панель %d' % n, fill='white')
    sw = int(W * 1.18); sh = int(im.height * sw / im.width)
    if sh < H * 1.1: sh = int(H * 1.1); sw = int(im.width * sh / im.height)
    return im.resize((sw, sh), Image.LANCZOS).filter(ImageFilter.UnsharpMask(2, 60, 2))
BIG = {}

ease = lambda x: x * x * (3 - 2 * x)
def cam_xy(cam, u, big, ay, lt):
    bw, bh = big.size; z, dx, dy = 1.0, 0.0, 0.0
    if cam == 'in': z = 1 + .08 * ease(u)
    elif cam == 'out': z = 1.08 - .08 * ease(u)
    elif cam == 'up': dy = .5 - ease(u)
    elif cam == 'down': dy = ease(u) - .5
    elif cam == 'l': dx = .5 - ease(u)
    elif cam == 'r': dx = ease(u) - .5
    elif cam == 'still': z = 1 + .02 * u
    elif cam == 'hit': z = 1.03 + .05 * math.exp(-lt * 7)
    vw, vh = W / z, H / z
    cx = bw / 2 + dx * (bw - vw) * .9
    cy = vh / 2 + (bh - vh) * min(1, max(0, ay + dy * .35))
    if cam == 'hit' and lt < .35:
        cx += math.sin(lt * 90) * 10 * K * (1 - lt / .35); cy += math.cos(lt * 70) * 8 * K * (1 - lt / .35)
    return cx, cy, vw, vh

fUI = ImageFont.truetype(FONT_UI, int(52 * K)); fWho = ImageFont.truetype(FONT_UI, int(32 * K))
fT = ImageFont.truetype(FONT_T, int(112 * K)); fT2 = ImageFont.truetype(FONT_UI, int(54 * K)); fT3 = ImageFont.truetype(FONT_UI, int(40 * K))

def wrap(d, text, font, maxw):
    out, cur = [], ''
    for w_ in text.split():
        s = (cur + ' ' + w_).strip()
        if d.textlength(s, font=font) > maxw and cur: out.append(cur); cur = w_
        else: cur = s
    return out + [cur]

def subtitle(img, vid, alpha):
    l = LINES[vid]; name, col = WHO[l['who']]
    if vid in VO: name += ' · журнал'
    ov = Image.new('RGBA', img.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    lines = wrap(d, l['text'], fUI, 880 * K)[:3]
    lh = int(64 * K); h = int(52 * K) + lh * len(lines); wmax = max([d.textlength(x, font=fUI) for x in lines] + [300 * K]) + 70 * K
    y0 = H - int(H * .025) - h; x0 = (W - wmax) / 2
    d.rounded_rectangle((x0, y0, x0 + wmax, y0 + h), int(20 * K), fill=(14, 10, 18, int(165 * alpha)))
    d.text((W / 2, y0 + 34 * K), name.upper(), font=fWho, fill=col, anchor='ms')
    for i, x in enumerate(lines):
        d.text((W / 2, y0 + 34 * K + (i + 1) * lh - 4 * K), x, font=fUI, fill=(255, 246, 230, int(255 * alpha)), anchor='ms')
    if alpha < 1: ov.putalpha(ov.getchannel('A').point(lambda v: int(v * alpha)))
    img.alpha_composite(ov)

def title_text(img, lt, card):
    d = ImageDraw.Draw(img); a = min(1, max(0, (lt - .4) / .5))
    if a <= 0: return
    c = (255, 236, 170, int(255 * a)) if not card else (23, 16, 18, int(255 * a))
    if not card:
        d.text((W / 2, H * .52), 'ЗЛАТАЯ', font=fT, fill=c, anchor='mm'); d.text((W / 2, H * .585), 'ЦЕПЬ', font=fT, fill=c, anchor='mm')
        d.text((W / 2, H * .65), 'Серия 1 · Звенышко', font=fT2, fill=c, anchor='mm')
    else:
        d.text((W / 2, H * .40), 'Продолжение', font=fT2, fill=c, anchor='mm'); d.text((W / 2, H * .45), 'следует', font=fT2, fill=c, anchor='mm')
        d.text((W / 2, H * .53), 'Серия 2 · Кот, проснись!', font=fT3, fill=c, anchor='mm')
        d.text((W / 2, H * .59), 'Играй в «Златую цепь» вдвоём', font=fT3, fill=c, anchor='mm')

# ---------- кадры ----------
SUBS = [(v['at'], v['at'] + v['dur'] + .35, v['id']) for s in tl for v in s['voice']]
def render(fi):
    tt = fi / FPS; k = max(i for i, s in enumerate(tl) if s['a'] <= tt + 1e-6); s = tl[k]
    lt = tt - s['a']; u = lt / max(.01, s['b'] - s['a']); n = s['panel']
    if n not in BIG: BIG.clear(); BIG[n] = frame_of(n)
    big = BIG[n]; cx, cy, vw, vh = cam_xy(s['cam'], u, big, s['ay'], lt)
    box = (cx - vw / 2, cy - vh / 2, cx + vw / 2, cy + vh / 2)
    img = big.resize((W, H), Image.BILINEAR, box=box).convert('RGBA')
    if s['cam'] in ('title', 'card'): title_text(img, lt, s['cam'] == 'card')
    if lt < 2 / FPS and k > 0:   # склейка: 2 кадра мягкого перехода, чтобы не мигало
        pass
    for a, b, vid in SUBS:
        if a - .05 <= tt <= b:
            subtitle(img, vid, min(1, (tt - a + .05) / .12, (b - tt) / .12)); break
    return img.convert('RGB')

# ---------- звук ----------
N = int(T * SR) + SR
mix = np.zeros(N, np.float32); mus = np.zeros(N, np.float32)
rng = np.random.default_rng(7)
def put(buf, at, x, g=1.0):
    i = int(at * SR); x = x[:max(0, N - i)]; buf[i:i + len(x)] += x * g
def env(n, a=.01, r=.2):
    e = np.ones(n, np.float32); na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr); return e
def tone(f, d, typ='sin'):
    t_ = np.arange(int(d * SR)) / SR; ph = 2 * np.pi * np.cumsum(np.broadcast_to(f, t_.shape)) / SR
    return (np.sin(ph) if typ == 'sin' else np.sign(np.sin(ph)) * .5).astype(np.float32)
def noise(d, lp=.2):
    x = rng.standard_normal(int(d * SR)).astype(np.float32); y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc += lp * (x[i] - acc); y[i] = acc
    return y / (abs(y).max() + 1e-6)
def bell(f, d=1.2):
    t_ = np.arange(int(d * SR)) / SR
    return (sum(np.sin(2 * np.pi * f * m * t_) * g for m, g in ((1, 1), (2.76, .4), (5.4, .2))) * np.exp(-t_ * 4)).astype(np.float32) * .4
def cat(*xs):
    n = max(len(x) for x in xs); o = np.zeros(n, np.float32)
    for x in xs: o[:len(x)] += x
    return o
FX = {
    'lever': lambda: noise(.12, .5) * env(int(.12 * SR), .002, .1) * .5,
    'siren': lambda: tone(np.interp(np.arange(int(1.6 * SR)), [0, .8 * SR, 1.6 * SR], [320, 720, 420]), 1.6, 'sq') * env(int(1.6 * SR), .05, .3) * .35,
    'thud': lambda: (noise(.35, .03) * np.exp(-np.arange(int(.35 * SR)) / SR * 12)).astype(np.float32) * .9,
    'creak': lambda: tone(np.linspace(180, 260, int(.5 * SR)), .5, 'sq') * env(int(.5 * SR), .05, .2) * .12,
    'whoosh': lambda: noise(.6, .15) * env(int(.6 * SR), .25, .3) * .4,
    'bucket': lambda: cat(bell(310, .8) * 1.3, noise(.2, .1) * env(int(.2 * SR), .002, .15) * .5),
    'tick': lambda: np.concatenate([noise(.02, .6) * .4, np.zeros(int(.23 * SR), np.float32)] * 4),
    'pencil': lambda: noise(.8, .7) * env(int(.8 * SR), .1, .2) * .08,
    'yawn': lambda: np.zeros(1, np.float32),
    'night': lambda: noise(2.0, .02) * env(int(2.0 * SR), .5, .8) * .12,
    'ding': lambda: bell(2637, 1.0) * .5,
    'flash': lambda: sum(bell(f, 1.6) for f in (1318, 1760, 2637)) * .35,
    'title': lambda: sum(bell(f, 2.5) for f in (523, 659, 784, 1046)) * .35,
    'laugh': lambda: np.zeros(1, np.float32),
    'wings': lambda: (noise(1.2, .3) * (0.5 + 0.5 * np.sin(np.arange(int(1.2 * SR)) / SR * 2 * np.pi * 9))) * env(int(1.2 * SR), .2, .4) * .2,
    'snore': lambda: noise(1.0, .02) * (0.5 + .5 * np.sin(np.arange(int(1.0 * SR)) / SR * 2 * np.pi * 1.5)) * .3,
    'caw': lambda: np.concatenate([(noise(.18, .4) * tone(np.linspace(900, 600, int(.18 * SR)), .18) * env(int(.18 * SR), .01, .1)), np.zeros(int(.12 * SR), np.float32)] * 3) * .6,
    'caw_far': lambda: np.concatenate([(noise(.18, .4) * tone(np.linspace(900, 600, int(.18 * SR)), .18) * env(int(.18 * SR), .01, .1)), np.zeros(int(.5 * SR), np.float32)] * 3) * .2,
    'bite': lambda: noise(.06, .8) * .5,
    'scissors': lambda: np.concatenate([noise(.05, .7) * .3, np.zeros(int(.15 * SR), np.float32)] * 4),
    'snap': lambda: cat(bell(1200, .5), noise(.1, .6) * env(int(.1 * SR), .002, .08) * .6),
    'frost': lambda: noise(2.0, .9) * env(int(2.0 * SR), .8, .6) * .07,
    'door': lambda: tone(np.linspace(140, 200, int(.7 * SR)), .7, 'sq') * env(int(.7 * SR), .05, .3) * .1,
    'wind': lambda: noise(2.0, .01) * env(int(2.0 * SR), .5, .8) * .4,
}
for s in tl:
    if s['fx'] in FX: put(mix, s['a'] + .02, FX[s['fx']]())
    for v in s['voice']:
        if v['id'] in VOICE: put(mix, v['at'], VOICE[v['id']], .95)
# черновая музыка: тёплые аккорды по планам, колокольчик — лейтмотив Звенышка; в «тишине» — ноль
CH = [(220, 277, 330), (196, 247, 294), (175, 220, 262), (196, 247, 294)]
for k, s in enumerate(tl):
    if QUIET[0] <= s['panel'] <= QUIET[1]: continue
    f = CH[(k // 3) % 4]; d = s['b'] - s['a']
    pad = sum(tone(x, d) * .03 for x in f) * env(int(d * SR), .3, .3); put(mus, s['a'], pad)
# музыка под голосом приглушается
vo = np.zeros(N, np.float32)
for s in tl:
    for v in s['voice']: vo[int(v['at'] * SR):int((v['at'] + v['dur']) * SR)] = 1
duck = np.convolve(vo, np.ones(int(.15 * SR)) / int(.15 * SR), 'same'); mix += mus * (1 - .6 * duck)
mix = mix[:int(T * SR)]; mix *= .89 / (abs(mix).max() + 1e-6)
ap = os.path.join(OUT, 'ser01_animatic.wav')
with wave.open(ap, 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())

# ---------- видео ----------
op = os.path.join(OUT, 'ser01_animatic.mp4')
ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                       '-i', ap, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k',
                       '-shortest', op], stdin=subprocess.PIPE)
for fi in range(int(T * FPS)):
    ff.stdin.write(render(fi).tobytes())
ff.stdin.close(); ff.wait(); print('→', op)
