#!/usr/bin/env python3
"""Реплики героев бесплатным голосом Silero v4 (без Higgsfield): синтез → tools/voice/raw/<id>.wav → fetch.js (обрезка, тон, обработка, −16 LUFS).

  python3 tools/voice/silero_lines.py tools/voice/pending/1-5.json --model v4_ru.pt

Файл реплик: {"cast": {кто: {...новый голос...}}, "lines": [{id, lv, who, text, tts, max, silero?, pitch?, fx?}]}. Голос Silero — поле silero реплики
или cast[who].silero (aidar, baya, kseniya, xenia, eugene). Реплики попадают в zlataya_cep/build/voice/lines.json с url «silero:<голос>» (fetch.js
не скачивает такие записи, а берёт готовый wav), новые голоса — в cast. После — пересборка релиза. Окружение — как у read_tts.py: torch (CPU),
модель https://models.silero.ai/models/tts/ru/v4_ru.pt. Лицензия Silero v4 — CC BY-NC-SA 4.0 (некоммерческая), см. docs/09_final06.md.
"""
import argparse, json, os, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CAT = os.path.join(ROOT, 'zlataya_cep', 'build', 'voice', 'lines.json')
RAW = os.path.join(ROOT, 'tools', 'voice', 'raw')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('pending')
    ap.add_argument('--model', default='v4_ru.pt')
    a = ap.parse_args()
    P = json.load(open(a.pending, encoding='utf-8'))
    D = json.load(open(CAT, encoding='utf-8'))
    for k, c in P.get('cast', {}).items():
        D['cast'].setdefault(k, c)
    import torch
    torch.set_num_threads(4)
    model = torch.package.PackageImporter(a.model).load_pickle('tts_models', 'model')
    model.to('cpu')
    os.makedirs(RAW, exist_ok=True)
    ids = []
    for e in P['lines']:
        e = dict(e)
        sp = e.pop('silero', None) or D['cast'].get(e['who'], {}).get('silero') or 'baya'
        wav = os.path.join(RAW, e['id'] + '.wav')
        model.save_wav(text=e['tts'].replace('…', '...'), speaker=sp, sample_rate=48000, put_accent=True, put_yo=True, audio_path=wav)
        e['url'] = 'silero:' + sp
        e.pop('dur', None)
        D['lines'] = [x for x in D['lines'] if x['id'] != e['id']] + [e]
        ids.append(e['id'])
        print(e['id'], sp, e['tts'], flush=True)
    json.dump(D, open(CAT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(CAT, 'a', encoding='utf-8').write('\n')
    subprocess.run(['node', os.path.join(ROOT, 'tools', 'voice', 'fetch.js'), '--only', ','.join(ids)], check=True)
    print('готово:', len(ids), 'реплик; теперь python3 zlataya_cep/build/build_final.py')


if __name__ == '__main__':
    sys.exit(main())
