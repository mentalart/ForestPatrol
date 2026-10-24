#!/usr/bin/env python3
"""Нарезка листов ChatGPT на детали-спрайты (белый фон → прозрачность, деталь = связная область).
  python3 tools/mult2d/cut.py label [лист.png!1 …] — листы с номерами деталей → out/cut_labels/*.jpg (для art/parts.json)
  python3 tools/mult2d/cut.py                  — спрайты по art/parts.json → sprites/<папка>/<имя>.png + sprites/manifest.json
Нужны numpy, scipy, Pillow. Номера деталей устойчивы: сортировка по строкам (полосы по 1/12 высоты), внутри — слева направо."""
import json, os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as nd

D = os.path.dirname(os.path.abspath(__file__))
ART, OUT = os.path.join(D, 'art'), os.path.join(D, 'sprites')


def alpha_of(rgb):
    """Фон — почти белые пиксели, связанные с краем листа, и крупные замкнутые белые пятна (просвет кольца)."""
    a = rgb.astype(np.int16)
    white = (a.min(2) > 236) & (a.max(2) - a.min(2) < 14)
    lab, n = nd.label(white)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    sizes = nd.sum(white, lab, range(1, n + 1))
    bg = np.isin(lab, list(edge) + [i + 1 for i, s in enumerate(sizes) if s > 2500])
    # мягкий край: полупрозрачность по светлоте в кайме фона
    soft = np.clip((255 - a.min(2)) / 22.0, 0, 1)
    al = np.where(bg, 0.0, 1.0)
    rim = nd.binary_dilation(bg, iterations=2) & ~bg
    al[rim] = np.maximum(soft[rim], 0.15)
    return al


def parts(path):
    path, _, dil = path.partition('!')    # «лист.png!1» — склейка соседних пятен на 1 px вместо 3 (детали стоят тесно)
    path, _, crop = path.partition('@')   # «лист.png@x0,y0,x1,y1» — сначала вырезать область листа
    im = Image.open(path).convert('RGB')
    if crop: im = im.crop(tuple(int(v) for v in crop.split(',')))
    rgb = np.asarray(im)
    al = alpha_of(rgb)
    mask = nd.binary_closing(al > .5, iterations=2)
    lab, n = nd.label(nd.binary_dilation(mask, iterations=int(dil or 3)))
    objs = nd.find_objects(lab)
    H = rgb.shape[0]; out = []
    for i, sl in enumerate(objs):
        if sl is None: continue
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        if (y1 - y0) * (x1 - x0) < 900: continue
        out.append(dict(i=i + 1, box=(x0, y0, x1, y1)))
    out.sort(key=lambda o: (int(((o['box'][1] + o['box'][3]) / 2) / (H / 12)), o['box'][0]))
    return im, rgb, al, lab, out


def label(only=()):
    od = os.path.join(D, 'out', 'cut_labels'); os.makedirs(od, exist_ok=True)
    srcs = [os.path.join(ART, o) for o in only] or [os.path.join(r, f) for r, _, fs in os.walk(ART) for f in sorted(fs) if f.endswith('.png')]
    for p in srcs:
        if True:
            im, rgb, al, lab, ps = parts(p); p = p.partition('!')[0]
            dr = ImageDraw.Draw(im)
            for k, o in enumerate(ps):
                dr.rectangle(o['box'], outline=(255, 0, 0), width=2); dr.text((o['box'][0] + 3, o['box'][1] + 2), str(k), fill=(255, 0, 0), font_size=22)
            rel = os.path.relpath(p, ART).replace(os.sep, '/').replace('/', '_')[:-4]
            im.thumbnail((1400, 1400)); im.save(os.path.join(od, rel + '.jpg'), quality=80)
            print(rel, len(ps), 'деталей')


def export():
    spec = json.load(open(os.path.join(ART, 'parts.json'), encoding='utf-8'))
    man = {}
    for src, names in spec.items():
        im, rgb, al, lab, ps = parts(os.path.join(ART, src))
        folder = os.path.dirname(src.partition('!')[0].partition('@')[0]) or 'bg'
        for k, name in names.items():
            o = max(ps, key=lambda q: (q['box'][2] - q['box'][0]) * (q['box'][3] - q['box'][1])) if k == 'max' else ps[int(k)]   # «max» — самая крупная деталь листа
            x0, y0, x1, y1 = o['box']
            keep = (lab[y0:y1, x0:x1] == o['i'])
            keep = nd.binary_dilation(keep, iterations=2)
            a = (al[y0:y1, x0:x1] * keep * 255).astype(np.uint8)
            spr = np.dstack([rgb[y0:y1, x0:x1], a])
            od = os.path.join(OUT, folder); os.makedirs(od, exist_ok=True)
            Image.fromarray(spr, 'RGBA').save(os.path.join(od, name + '.png'), optimize=True)
            man[f'{folder}/{name}'] = [x1 - x0, y1 - y0]
    json.dump(man, open(os.path.join(OUT, 'manifest.json'), 'w'), ensure_ascii=False, indent=0)
    print('спрайтов:', len(man))


label(sys.argv[2:]) if sys.argv[1:2] == ['label'] else export()
