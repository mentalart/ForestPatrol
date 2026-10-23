# -*- coding: utf-8 -*-
"""
«Златая цепь» — фирменный шаблон картинок для постов ВК.
Стиль «Книжка Пелагеи»: кремовая бумажная страница, вырезанное окно с иллюстрацией,
цветная бумажная плашка рубрики, золотая лента-кикер, цепь из пяти звеньев, печать-штамп.

Иллюстрации и декор — из ChatGPT (без текста). Весь текст набирается здесь, шрифтами с кириллицей.
Использование: см. make_posts.py и STYLE.md.
"""
import math, os, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, 'fonts')
ASSETS = os.path.join(HERE, 'assets')

# ---------- палитра ----------
PAGE = (251, 243, 226)          # страница #FBF3E2
CREAM = (255, 246, 224)         # текст на плашке
GOLD = (240, 192, 74)           # золотая нить #F0C04A
GOLD_DEEP = (176, 118, 22)
INK = (74, 34, 18)              # тёмно-коричневый текст на золоте

# Цвет плашки по рубрике/герою. Тона чуть глубже палитры мультсериала — для читаемости кремового текста.
PANELS = {
    'moss':      (45, 107, 74),    # лес, Кот Учёный
    'ginger':    (205, 82, 38),    # Прошка, игрок 1
    'lilac':     (124, 82, 184),   # Пелагея
    'turquoise': (20, 128, 122),   # Йоша, игрок 2
    'kitezh':    (24, 96, 128),    # Китеж, вода
    'night':     (36, 48, 94),     # загадки, ночь
    'cinnabar':  (182, 50, 40),    # мастерская
}
PLAYER = {1: (232, 116, 59), 2: (43, 179, 168)}   # бейджи «Игрок 1/2»


def font(name, size, weight=None):
    files = {
        'title': 'Kurale-Regular.ttf',      # заголовки: сказочная антиква
        'body': 'Nunito-VF.ttf',            # основной текст: круглый, детский, читаемый
        'kicker': 'Rubik-VF.ttf',           # лента-кикер, бейджи: плотный гротеск
        'hand': 'Caveat-VF.ttf',            # подпись Кота: рукописный
        'display': 'YesevaOne-Regular.ttf', # крупные надписи обложки
    }
    f = ImageFont.truetype(os.path.join(FONTS, files[name]), size)
    if weight:
        try: f.set_variation_by_name(weight)
        except Exception: pass
    return f


# ---------- бумага ----------
def _noise(h, w, scale, seed):
    rng = np.random.default_rng(seed)
    small = rng.random((max(2, h // scale + 2), max(2, w // scale + 2))).astype(np.float32)
    img = Image.fromarray((small * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(img).astype(np.float32) / 255.0


def paper(size, color, seed=1, fibers=True, strength=1.0):
    """Матовая цветная бумага: пятна, зерно, волокна."""
    w, h = size
    base = np.ones((h, w, 3), np.float32) * np.array(color, np.float32)
    blot = (_noise(h, w, 90, seed) - .5) * 0.07 + (_noise(h, w, 25, seed + 1) - .5) * 0.05
    grain = (np.random.default_rng(seed + 2).random((h, w)).astype(np.float32) - .5) * 0.06
    tex = 1 + (blot + grain) * strength
    out = np.clip(base * tex[..., None], 0, 255).astype(np.uint8)
    im = Image.fromarray(out, 'RGB')
    if fibers:
        layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        rng = random.Random(seed)
        lum = sum(color) / 3
        k = 0.5 if lum < 110 else 1.0      # на тёмной бумаге волокна тише
        for _ in range(int(w * h / 2500)):
            x, y = rng.uniform(0, w), rng.uniform(0, h)
            ang, ln = rng.uniform(0, math.pi), rng.uniform(6, 22)
            pts = [(x, y)]
            for _k in range(3):
                ang += rng.uniform(-.6, .6)
                x += math.cos(ang) * ln / 3; y += math.sin(ang) * ln / 3
                pts.append((x, y))
            light = rng.random() < .65
            c = (255, 255, 255, int(rng.randint(25, 60) * k)) if light else (0, 0, 0, rng.randint(10, 22))
            d.line(pts, fill=c, width=1)
        im = Image.alpha_composite(im.convert('RGBA'), layer).convert('RGB')
    return im


def cut_shape(size, box, radius, seed=0, wobble=2.2):
    """Маска фигуры «вырезано ножницами»: скруглённый прямоугольник с неровным краем."""
    w, h = size
    x0, y0, x1, y1 = box
    rng = random.Random(seed)
    pts = []
    corners = [(x1 - radius, y0 + radius, -90), (x1 - radius, y1 - radius, 0),
               (x0 + radius, y1 - radius, 90), (x0 + radius, y0 + radius, 180)]
    phase = [rng.uniform(0, 6.28) for _ in range(3)]
    def jitter(t):
        return wobble * (math.sin(t * 0.045 + phase[0]) * .6 + math.sin(t * 0.13 + phase[1]) * .3
                         + math.sin(t * 0.31 + phase[2]) * .15)
    t = 0
    for i, (cx, cy, a0) in enumerate(corners):
        for k in range(10):
            a = math.radians(a0 + 90 * k / 9)
            pts.append((cx + radius * math.cos(a), cy + radius * math.sin(a)))
        nx, ny, _ = corners[(i + 1) % 4]
        sx, sy = pts[-1]
        ex = nx + radius * math.cos(math.radians(corners[(i + 1) % 4][2]))
        ey = ny + radius * math.sin(math.radians(corners[(i + 1) % 4][2]))
        L = math.hypot(ex - sx, ey - sy)
        steps = max(2, int(L / 8))
        nxv, nyv = (ey - sy) / max(L, 1), -(ex - sx) / max(L, 1)
        for s in range(1, steps):
            f = s / steps; t += 8
            j = jitter(t)
            pts.append((sx + (ex - sx) * f + nxv * j, sy + (ey - sy) * f + nyv * j))
    m = Image.new('L', (w * 2, h * 2), 0)
    ImageDraw.Draw(m).polygon([(x * 2, y * 2) for x, y in pts], fill=255)
    return m.resize((w, h), Image.LANCZOS)


def drop_shadow(canvas, mask, offset=(6, 9), blur=10, opacity=0.38, color=(40, 22, 10)):
    sh = mask.filter(ImageFilter.GaussianBlur(blur))
    sh = ImageChops.offset(sh, *offset).point(lambda v: int(v * opacity))
    layer = Image.new('RGB', canvas.size, color)
    canvas.paste(layer, (0, 0), sh)


def rim(canvas, mask, width=3, color=(255, 255, 255), opacity=0.35):
    """Светлый срез по краю бумаги (свет слева сверху)."""
    inner = mask.filter(ImageFilter.MinFilter(width * 2 + 1))
    edge = ImageChops.subtract(mask, inner)
    shifted = ImageChops.subtract(edge, ImageChops.offset(inner, -2, -2))
    canvas.paste(Image.new('RGB', canvas.size, color), (0, 0), shifted.point(lambda v: int(v * opacity)))


def paste_layer(canvas, layer, mask, shadow=True, **kw):
    if shadow: drop_shadow(canvas, mask, **kw)
    canvas.paste(layer, (0, 0), mask)
    rim(canvas, mask)


def asset(name):
    return Image.open(os.path.join(ASSETS, name + '.png')).convert('RGBA')


def place(canvas, im, xy, width=None, height=None, rotate=0, anchor='mm', shadow=True):
    if width: im = im.resize((int(width), int(im.height * width / im.width)), Image.LANCZOS)
    if height: im = im.resize((int(im.width * height / im.height), int(height)), Image.LANCZOS)
    if rotate: im = im.rotate(rotate, Image.BICUBIC, expand=True)
    x, y = xy
    if anchor[0] == 'm': x -= im.width // 2
    elif anchor[0] == 'r': x -= im.width
    if anchor[1] == 'm': y -= im.height // 2
    elif anchor[1] == 'b': y -= im.height
    if shadow:
        a = im.split()[3]
        sh = Image.new('L', canvas.size, 0); sh.paste(a, (int(x) + 4, int(y) + 6))
        drop_shadow(canvas, sh, offset=(0, 0), blur=6, opacity=0.30)
    canvas.paste(im, (int(x), int(y)), im)
    return (int(x), int(y), int(x) + im.width, int(y) + im.height)


def cover_fit(im, size, focus=(0.5, 0.5)):
    w, h = size
    s = max(w / im.width, h / im.height)
    im = im.resize((math.ceil(im.width * s), math.ceil(im.height * s)), Image.LANCZOS)
    x = int((im.width - w) * focus[0]); y = int((im.height - h) * focus[1])
    return im.crop((x, y, x + w, y + h))


# ---------- текст ----------
import re
_SHORT = r'(?<![\w-])(в|во|и|к|ко|с|со|о|об|у|а|не|ни|на|по|до|за|из|от|под|над|для|без|что|как|то|же|ли|бы|но|да)\s'


def typo(t):
    """Русская типографика: неразрывные пробелы перед тире и после коротких слов."""
    if not t: return t
    t = t.replace(' — ', '\u00a0— ').replace(' - ', '\u00a0— ')
    t = re.sub(_SHORT, lambda m: m.group(1) + '\u00a0', t, flags=re.I)
    return t


def wrap(draw, text, fnt, maxw):
    lines = []
    for para in text.split('\n'):
        words, cur = para.split(' '), ''
        for wd in words:
            t = (cur + ' ' + wd).strip()
            if draw.textlength(t, font=fnt) <= maxw: cur = t
            else:
                if cur: lines.append(cur)
                cur = wd
        lines.append(cur)
    return lines


def text_shadowed(draw, xy, txt, fnt, fill, shadow=(0, 0, 0, 90), off=(2, 3), anchor='la'):
    x, y = xy
    draw.text((x + off[0], y + off[1]), txt, font=fnt, fill=shadow, anchor=anchor)
    draw.text((x, y), txt, font=fnt, fill=fill, anchor=anchor)


def draw_top(d, cx, top, txt, fnt, fill, shadow, off):
    """Рисует строку по центру так, что верх видимых букв = top. Возвращает низ букв."""
    b = d.textbbox((cx, 0), txt, font=fnt, anchor='ma')
    y = top - b[1]
    text_shadowed(d, (cx, y), txt, fnt, fill, shadow=shadow, off=off, anchor='ma')
    return y + b[3]


def arc_text(canvas, center, radius, txt, fnt, fill, spacing=2):
    """Текст по дуге (для ленты-кикера). center — центр окружности, текст по её верху."""
    d = ImageDraw.Draw(canvas)
    widths = [d.textlength(ch, font=fnt) + spacing for ch in txt]
    total = sum(widths) - spacing
    ang = -total / 2 / radius
    cx, cy = center
    for ch, wch in zip(txt, widths):
        a = ang + (wch - spacing) / 2 / radius
        size = int(fnt.size * 1.6)
        tile = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        ImageDraw.Draw(tile).text((size / 2, size / 2), ch, font=fnt, fill=fill, anchor='mm')
        tile = tile.rotate(-math.degrees(a), Image.BICUBIC)
        px = cx + radius * math.sin(a); py = cy - radius * math.cos(a)
        canvas.paste(tile, (int(px - size / 2), int(py - size / 2)), tile)
        ang += wch / radius


def ribbon(canvas, center_xy, text, width=560, color=None):
    rb = asset('ribbon')
    if color:  # перекраска ленты (по умолчанию золотая)
        arr = np.asarray(rb).astype(np.float32)
        lum = arr[..., :3].mean(axis=2, keepdims=True) / 200
        arr[..., :3] = np.clip(lum * np.array(color, np.float32), 0, 255)
        rb = Image.fromarray(arr.astype(np.uint8), 'RGBA')
    box = place(canvas, rb, center_xy, width=width)
    h = box[3] - box[1]
    # лента изогнута дугой: центр дуги ниже ленты; текст занимает не больше 64% ширины
    txt = text.upper()
    d = ImageDraw.Draw(canvas)
    size = int(h * 0.25)
    while size > 14:
        fnt = font('kicker', size, 'Black')
        if sum(d.textlength(c, font=fnt) + 3 for c in txt) <= width * 0.70: break
        size -= 1
    r = width * 2.3
    arc_text(canvas, (center_xy[0], box[1] + h * 0.33 + r), r, txt, fnt, INK, spacing=3)
    return box


def badge(canvas, xy, text, color):
    d = ImageDraw.Draw(canvas)
    fnt = font('kicker', 30, 'Bold')
    tw = d.textlength(text, font=fnt)
    w, h = int(tw + 76), 54
    x, y = xy
    m = Image.new('L', canvas.size, 0)
    m.paste(cut_shape((w, h), (0, 0, w, h), 27, seed=7, wobble=1.0), (x, y))
    layer = paper(canvas.size, color, seed=11, fibers=False)
    paste_layer(canvas, layer, m, offset=(3, 5), blur=5, opacity=.35)
    d = ImageDraw.Draw(canvas)
    d.ellipse((x + 20, y + h / 2 - 8, x + 36, y + h / 2 + 8), fill=CREAM)
    d.text((x + 48, y + h / 2 + 1), text, font=fnt, fill=CREAM, anchor='lm')


def page_bg(size, seed=3):
    bg = paper(size, PAGE, seed=seed)
    # лёгкая виньетка
    w, h = size
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    v = 1 - 0.10 * (((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
    arr = np.asarray(bg).astype(np.float32) * v[..., None]
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


def corners(canvas, size_px=230, which=('tl', 'tr')):
    c = asset('corner')
    W, H = canvas.size
    for k in which:
        im = c
        if 'r' in k: im = im.transpose(Image.FLIP_LEFT_RIGHT)
        if 'b' in k: im = im.transpose(Image.FLIP_TOP_BOTTOM)
        x = 6 if 'l' in k else W - 6 - size_px
        y = 6 if 't' in k else H - 6 - int(size_px * c.height / c.width)
        place(canvas, im, (x, y), width=size_px, anchor='lt')


# ---------- карточка поста ----------
def post_card(art, kicker, title, *a, art_h=None, min_body=36, out=None, **kw):
    """Карточка поста. Если art_h не задан, окно с иллюстрацией делается максимально высоким,
    при котором основной текст набирается кеглем не меньше min_body."""
    if art_h is not None:
        cv, _ = _post_card(art, kicker, title, *a, art_h=art_h, **kw)
    else:
        for h in range(800, 539, -20):
            cv, size = _post_card(art, kicker, title, *a, art_h=h, **kw)
            if size >= min_body: break
    if out: cv.save(out, quality=95)
    return cv


def _post_card(art, kicker, title, subtitle=None, bullets=None, text=None, quote=None,
              panel='moss', stamp='stamp_paw', player=None, signature='Ваш Кот Учёный, с дуба у Лукоморья',
              art_focus=(0.5, 0.5), art_h=700, window_fill=None, seed=5):
    W, H = 1080, 1350
    M = 46
    text, quote = typo(text), typo(quote)
    bullets = [typo(b) for b in bullets] if bullets else bullets
    cv = page_bg((W, H), seed)

    win = (M, M, W - M, M + art_h)

    # --- окно с иллюстрацией, «вырезанное» в странице ---
    ww, wh = win[2] - win[0], win[3] - win[1]
    if window_fill is not None:
        art_im = window_fill((ww, wh))
    else:
        art_im = cover_fit(art.convert('RGB'), (ww, wh), art_focus)
    mask = Image.new('L', (W, H), 0)
    mask.paste(cut_shape((ww, wh), (0, 0, ww, wh), 40, seed=seed + 1), (win[0], win[1]))
    layer = Image.new('RGB', (W, H)); layer.paste(art_im, (win[0], win[1]))
    cv.paste(layer, (0, 0), mask)
    # внутренняя тень: край страницы отбрасывает тень на картинку
    inv = ImageChops.invert(mask)
    sh = ImageChops.offset(inv.filter(ImageFilter.GaussianBlur(9)), 6, 8)
    sh = ImageChops.multiply(sh, mask).point(lambda v: int(v * .55))
    cv.paste(Image.new('RGB', (W, H), (40, 22, 10)), (0, 0), sh)
    # светлый срез страницы вокруг окна
    ring = ImageChops.subtract(mask.filter(ImageFilter.MaxFilter(7)), mask)
    cv.paste(Image.new('RGB', (W, H), (255, 252, 243)), (0, 0), ring)

    corners(cv, 215)
    if player:
        badge(cv, (win[0] + 30, win[1] + 30), f'Игрок {player}', PLAYER[player])

    # --- плашка ---
    py0 = win[3] - 34
    pbox = (M - 6, py0, W - M + 6, H - M + 6)
    pm = cut_shape((W, H), pbox, 34, seed=seed + 2, wobble=2.6)
    panel_rgb = PANELS.get(panel, panel)
    paste_layer(cv, paper((W, H), panel_rgb, seed=seed + 3), pm, offset=(6, 10), blur=12, opacity=.40)

    d = ImageDraw.Draw(cv, 'RGBA')
    # лента-кикер, наезжает на верхний край плашки
    rb = ribbon(cv, (W // 2, py0 + 8), kicker, width=540)
    y = rb[3] + 4

    # заголовок
    tf = font('title', 92)
    while d.textlength(title, font=tf) > W - 2 * M - 120 and tf.size > 56:
        tf = font('title', tf.size - 4)
    y += 10
    y = draw_top(d, W // 2, y, title, tf, CREAM, (0, 0, 0, 80), (2, 3)) + 18
    if subtitle:
        sf = font('hand', 52, 'Bold')
        y = draw_top(d, W // 2, y, subtitle, sf, GOLD, (0, 0, 0, 70), (2, 2)) + 8
    # цепь-разделитель
    ch = place(cv, asset('chain5'), (W // 2, y + 26), width=280)
    y = ch[3] + 26

    # основной текст — подбираем кегль, чтобы влезло
    sig_h = 78 if signature else 10
    avail = (H - M - 26 - sig_h) - y
    left, right = M + 54, W - M - 54
    for size in range(40, 25, -1):
        bf = font('body', size, 'Bold')
        lh = int(size * 1.32)
        blocks = []
        if quote:
            qf = font('title', size + 8)
            blocks.append(('quote', wrap(d, '«' + quote + '»', qf, right - left), qf, int((size + 8) * 1.28)))
        if text:
            for para in text.split('\n'):
                blocks.append(('text', wrap(d, para, bf, right - left), bf, lh))
        if bullets:
            for b in bullets:
                blocks.append(('bullet', wrap(d, b, bf, right - left - 48), bf, lh))
        total = sum(len(ls) * l for _, ls, _, l in blocks) + 14 * (len(blocks) - 1)
        if total <= avail: break
    y += max(0, (avail - total) // 3)
    star = asset('star')
    for kind, lines, f, l in blocks:
        x = left + (48 if kind == 'bullet' else 0)
        if kind == 'bullet':
            place(cv, star, (left + 18, y + l * .52), width=int(f.size * .9), shadow=False)
        for ln in lines:
            fill = GOLD if kind == 'quote' else CREAM
            text_shadowed(d, (x if kind != 'quote' else W // 2, y), ln, f, fill, shadow=(0, 0, 0, 60), off=(1, 2),
                          anchor='la' if kind != 'quote' else 'ma')
            y += l
        y += 26 if kind == 'quote' else 14

    # подпись Кота
    if signature:
        hf = font('hand', 40, 'Bold')
        d.text((M + 54, H - M - 34), signature, font=hf, fill=GOLD + (235,), anchor='ls')
    # печать-штамп на стыке окна и плашки, справа от ленты
    place(cv, asset(stamp), (W - M - 78, py0 + 2), width=150, rotate=-9, anchor='mm')
    return cv, size


# ---------- обложка сообщества 1920×768 ----------
def cover(art, title='Златая цепь', tagline='сказка-игра для всей семьи',
          line='Играйте бесплатно в браузере · вдвоём на одном экране', art_focus=(0.5, 0.78), out=None):
    """Табличка с названием — сверху по центру, плашка-приглашение — снизу по центру.
    Всё важное в центральных ~1100 px: на телефоне ВК показывает середину обложки."""
    W, H = 1920, 768
    cv = cover_fit(art.convert('RGB'), (W, H), art_focus)
    d = ImageDraw.Draw(cv, 'RGBA')
    tf = font('title', 104)
    gf = font('hand', 46, 'Bold')
    tw = max(d.textlength(title, font=tf), d.textlength(tagline, font=gf))
    pw, ph = int(tw + 170), 178
    x0, y0 = (W - pw) // 2, 18
    m = Image.new('L', (W, H), 0)
    m.paste(cut_shape((pw, ph), (0, 0, pw, ph), 40, seed=77, wobble=2.0), (x0, y0))
    paste_layer(cv, paper((W, H), PAGE, seed=78), m, offset=(7, 11), blur=12, opacity=.45)
    c = asset('corner')
    place(cv, c, (x0 - 22, y0 - 16), width=118, anchor='lt')
    place(cv, c.transpose(Image.FLIP_LEFT_RIGHT), (x0 + pw + 22, y0 - 16), width=118, anchor='rt')
    d = ImageDraw.Draw(cv, 'RGBA')
    bottom = draw_top(d, W // 2, y0 + 16, title, tf, (176, 50, 34), (120, 60, 10, 80), (2, 3))
    draw_top(d, W // 2, bottom + 10, tagline, gf, (45, 107, 74), (0, 0, 0, 0), (0, 0))
    place(cv, asset('chain5'), (W // 2, y0 + ph + 4), width=210)
    if line:
        lf = font('body', 34, 'ExtraBold')
        lw = d.textlength(line, font=lf)
        bw, bh = int(lw + 72), 62
        bx0, by0 = (W - bw) // 2, H - bh - 16
        m2 = Image.new('L', (W, H), 0)
        m2.paste(cut_shape((bw, bh), (0, 0, bw, bh), 31, seed=81, wobble=1.2), (bx0, by0))
        paste_layer(cv, paper((W, H), PANELS['night'], seed=82, fibers=False), m2, offset=(4, 7), blur=7, opacity=.4)
        ImageDraw.Draw(cv).text((W // 2, by0 + bh // 2 + 1), line, font=lf, fill=CREAM, anchor='mm')
    if out: cv.save(out, quality=95)
    return cv


# ---------- аватар 1000×1000 ----------
def avatar(art, art_focus=(0.5, 0.4), zoom=1.0, out=None):
    S = 1000
    a = art.convert('RGB')
    if zoom != 1.0:
        w, h = a.size; cw, ch = int(w / zoom), int(h / zoom)
        x = int((w - cw) * art_focus[0]); y = int((h - ch) * art_focus[1])
        a = a.crop((x, y, x + cw, y + ch))
    cv = cover_fit(a, (S, S), art_focus)
    # золотое кольцо по краю круга — ВК обрежет аватар кругом, кольцо станет рамкой
    ring = Image.new('L', (S * 2, S * 2), 0)
    dr = ImageDraw.Draw(ring)
    dr.ellipse((8, 8, S * 2 - 8, S * 2 - 8), fill=255)
    dr.ellipse((48, 48, S * 2 - 48, S * 2 - 48), fill=0)
    ring = ring.resize((S, S), Image.LANCZOS)
    drop_shadow(cv, ring, offset=(0, 4), blur=8, opacity=.45)
    cv.paste(paper((S, S), GOLD, seed=91), (0, 0), ring)
    rim(cv, ring, width=2, opacity=.5)
    if out: cv.save(out, quality=95)
    return cv
