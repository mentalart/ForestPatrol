# -*- coding: utf-8 -*-
"""Собирает картинки постов группы «Златая цепь» по фирменному шаблону zc_style."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from zc_style import *

os.chdir(os.path.dirname(os.path.abspath(__file__)))   # пути src/ и out/ — относительно этой папки
OUT = 'out'
os.makedirs(OUT, exist_ok=True)
SIG = 'Ваш Кот Учёный, с дуба у Лукоморья'


def src_path(name):
    for ext in ('png', 'jpg'):
        if os.path.exists(f'src/{name}.{ext}'): return f'src/{name}.{ext}'


def src(name):
    return Image.open(src_path(name))


def tag(canvas, xy, text, color=(36, 48, 94), rotate=0):
    """Бумажная бирка-подпись (для фотокарточек)."""
    d = ImageDraw.Draw(canvas)
    fnt = font('body', 30, 'ExtraBold')
    tw = d.textlength(text, font=fnt)
    w, h = int(tw + 48), 52
    t = Image.new('RGBA', (w + 30, h + 30), (0, 0, 0, 0))
    m = cut_shape((w, h), (0, 0, w, h), 14, seed=len(text), wobble=1.0)
    body = paper((w, h), color, seed=21, fibers=False)
    t.paste(body, (6, 6), m)
    ImageDraw.Draw(t).text((6 + w / 2, 6 + h / 2 + 1), text, font=fnt, fill=CREAM, anchor='mm')
    place(canvas, t, xy, rotate=rotate, anchor='lt')


def photo(canvas, im, center, width, rotate, label, label_color):
    """Скриншот как наклеенная фотокарточка: кремовое поле, золотые полоски скотча, бирка."""
    im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
    b = 14
    card = Image.new('RGBA', (im.width + 2 * b, im.height + 2 * b), (0, 0, 0, 0))
    m = cut_shape(card.size, (0, 0) + card.size, 10, seed=width, wobble=1.0)
    card.paste(paper(card.size, (255, 249, 236), seed=31, fibers=True), (0, 0), m)
    card.paste(im, (b, b))
    box = place(canvas, card, center, rotate=rotate)
    # скотч
    tape = Image.new('RGBA', (120, 38), (240, 192, 74, 215))
    for cx, ang in ((box[0] + 40, 32), (box[2] - 40, -32)):
        place(canvas, tape, (cx, box[1] + 10), rotate=ang, shadow=False)
    return lambda: tag(canvas, (box[0] + 44, box[3] - 40), label, label_color, rotate=rotate * 0.5)


HEROES = [  # опрос: иллюстрация, имя, цвет бирки, какую часть кадра сохранить
    ('proshka', 'Прошка', PANELS['ginger'], (0.40, 0.35)),
    ('potap', 'Потап', (138, 90, 43), (0.5, 0.35)),
    ('pelageya', 'Пелагея', PANELS['lilac'], (0.5, 0.35)),
    ('yosha', 'Йоша', PANELS['turquoise'], (0.5, 0.45)),
]


def poll_fill(size):
    """Четыре героя фотокарточками 2×2 на бумаге цвета мха."""
    w, h = size
    bg = paper(size, (78, 140, 98), seed=43)
    d = ImageDraw.Draw(bg, 'RGBA')
    for i in range(0, w + h, 90):
        d.polygon([(i, 0), (i + 45, 0), (i + 45 - h, h), (i - h, h)], fill=(255, 255, 255, 12))
    cw, ch = int(w * 0.43), int(h * 0.36)
    # нижний ряд выше середины: низ окна закрывают лента и плашка
    cells = [(w * 0.27, h * 0.23, -2.2), (w * 0.73, h * 0.22, 1.8),
             (w * 0.27, h * 0.64, 1.5), (w * 0.73, h * 0.65, -1.9)]
    tags = []
    for (art, name, color, focus), (cx, cy, rot) in zip(HEROES, cells):
        im = cover_fit(src(art).convert('RGB'), (cw, ch), focus)
        tags.append(photo(bg, im, (cx, cy), cw, rot, name, color))
    for t in tags: t()
    return bg


POSTS = {
    # имя файла: параметры карточки (образцы — копируйте и меняйте)
    'p8_potap': dict(art='potap', kicker='Знакомьтесь', title='Потап', subtitle='медвежонок-силач',
        bullets=['Весит за троих: палуба Летучего корабля кренится к нему.',
                 'Подхватит друга — и подкинет вверх и вдаль.',
                 'Встанет со щитом — и все за его спиной укрыты.'],
        panel=(138, 90, 43), stamp='stamp_paw', player=1),
    'p10_poll': dict(art=None, window_fill=poll_fill, kicker='Опрос', title='Кого первым',
        subtitle='выбирает ваш ребёнок?',
        signature='Голосуйте в опросе под постом · Ваш Кот Учёный',
        panel='moss', stamp='stamp_paw', art_h=895),
    'p5_proshka': dict(art='proshka', kicker='Знакомьтесь', title='Прошка', subtitle='лисёнок-изобретатель',
        bullets=['Мастерит без устали: то пружину, то катапульту.',
                 'Рогаткой собьёт жёлудь, щеколду и колокол, до которого не дотянуться.',
                 'Куёт звенья Златой цепи вместе с кузнецом Кузьмой.'],
        panel='ginger', stamp='stamp_paw', player=1),
    'p2_pelageya': dict(art='pelageya', kicker='Знакомьтесь', title='Пелагея', subtitle='совушка-сказительница',
        bullets=['Знает сказки только по тетрадке.',
                 'Совиным взором видит скрытое: тайники и спрятанные звёздочки.',
                 'Расправит крылья — и перелетит пропасть, где не хватит прыжка.'],
        panel='lilac', stamp='stamp_book', player=2),
    'd1_yosha': dict(art='yosha', kicker='Знакомьтесь', title='Йоша', subtitle='ёжик-водонос',
        bullets=['Живая вода растит и оживляет, мёртвая — сращивает.',
                 'Плеснёт на лаву — и застынет корочка-мостик.',
                 'Самый маленький: пролезет под струнами.'],
        panel='turquoise', stamp='stamp_fish', player=2),
    'd2_kot': dict(art='kot', kicker='Знакомьтесь', title='Кот Учёный', subtitle='хранитель дуба',
        quote='У лукоморья дуб зелёный;\nзлатая цепь на дубе том…',
        text='Цепь порвана, голос пропал. Каждое звено, что принесут ребятушки, возвращается на дуб.',
        panel='moss', stamp='stamp_book'),
}

if __name__ == '__main__':
    only = sys.argv[1:]
    if 'cover' in only:
        cover(src('cover'), out=f'{OUT}/cover.jpg'); print('ok cover')
    if 'avatar' in only:
        avatar(src('avatar'), art_focus=(0.5, 0.5), out=f'{OUT}/avatar.jpg'); print('ok avatar')
    for name, p in POSTS.items():
        if only and name not in only: continue
        p = dict(p)
        art = p.pop('art')
        if art and not src_path(art):
            print('нет иллюстрации', art); continue
        p.setdefault('signature', SIG)
        post_card(src(art) if art else None, out=f'{OUT}/{name}.jpg', **p)
        print('ok', name)
