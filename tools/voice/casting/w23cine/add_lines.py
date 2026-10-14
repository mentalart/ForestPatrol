# Ролики миров 2–3: строки без записи → новые записи каталога lines.json (без url; озвучка — jobs.json).
import re, json, glob, os, collections
P = 'zlataya_cep/build/voice/lines.json'
d = json.load(open(P)); lines = d['lines']
key = lambda who, t: (who or '-') + '|' + re.sub(r'\s+', ' ', re.sub(r'<[^>]*>', '', t)).strip()
have = {key(l['who'], l['text']): l for l in lines}
pat = re.compile(r"\[\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*(null|'([\w-]+)')\s*,\s*'((?:[^'\\]|\\.)*)'")
STAGE = {'(шёпотом)': '[whispering]', '(тихо, улыбаясь)': '[softly, smiling]'}
def tts(who, t):
    t = t.replace('<br>', ' ')
    for k, v in STAGE.items(): t = t.replace('<i>%s</i>' % k, v)
    t = re.sub(r'\s+', ' ', re.sub(r'<[^>]*>', '', t)).strip()
    return ('[warm, storytelling] ' + t) if who is None else t
def nxt(lv, narr):
    ids = [l['id'] for l in lines if l['lv'] == lv]
    if narr:
        n = [int(i.split('_s')[1]) for i in ids if '_s' in i and i.split('_s')[1].isdigit()]
        return '%s_s%02d' % (lv, max(n, default=0) + 1)
    n = [int(i.split('_')[1]) for i in ids if re.fullmatch(r'\d+', i.split('_')[1] or '')]
    return '%s_%03d' % (lv, max(n, default=0) + 1)
new = []
for w in '23':
    for f in sorted(glob.glob('zlataya_cep/build/levels/%s-*/*.js' % w)):
        lv = f.split('/')[-2]
        for m in pat.finditer(open(f).read()):
            dur, who, t = float(m.group(2)), m.group(4), m.group(5).replace("\\'", "'")
            k = key(who, t)
            if k in have: continue
            e = {'id': nxt(lv, who is None), 'lv': lv, 'who': who}
            if who is None: e['voice'] = 'reader'
            e.update({'text': t, 'tts': tts(who, t), 'max': round(dur + 1.5, 2)})
            lines.append(e); have[k] = e; new.append(e)
open(P, 'w').write(json.dumps(d, ensure_ascii=False, indent=1) + '\n')
print(len(new), collections.Counter(e['who'] for e in new))
json.dump(new, open('tools/voice/casting/w23cine/new_lines.json', 'w'), ensure_ascii=False, indent=0)
