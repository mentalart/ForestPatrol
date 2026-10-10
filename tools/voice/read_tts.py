#!/usr/bin/env python3
"""Озвучка задач и подсказок (то, что игра читает вслух) — бесплатный голос Silero v4 «baya», без Higgsfield.

  python3 tools/voice/read_tts.py --texts тексты.json [--extract реплики.json] --model v4_ru.pt [--speaker baya]

Тексты: tools/voice/harvest_read.js (задачи и подсказки-зоны всех уровней) и, по желанию, extract.js --boss (подсказки tip(…) из кода).
Для каждого текста — запись zlataya_cep/build/voice/read/<id>.mp3 (моно, 24 кГц, 32 кбит/с, −16 LUFS) и строка каталога read/read.json:
  {id, key, lv, kind, text, tts, dur}. key — текст без цифр и знаков (строчные буквы и пробелы) — по нему игра находит запись
  (late_91d_readvoice.js); счётчики «0 / 3» и числа в key не входят, поэтому одна запись служит всем значениям счётчика.
Готовые записи (тот же id и тот же tts) не переделываются; --force — все заново. Лишние строки каталога (текста больше нет в игре) удаляются
только с --prune.

Запускать python из окружения, где есть torch (CPU), num2words и модель Silero (https://models.silero.ai/models/tts/ru/v4_ru.pt):
  python3 -m venv v && v/bin/pip install torch --index-url https://download.pytorch.org/whl/cpu num2words
Модель Silero v4 — лицензия CC BY-NC-SA 4.0 (некоммерческая): для коммерческого выпуска игры голос нужно заменить или получить лицензию Silero;
записи лежат отдельными файлами, замена — тот же скрипт с другим голосом.
"""
import argparse, json, os, re, subprocess, sys, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(ROOT, 'zlataya_cep', 'build', 'voice', 'read')
FFMPEG = os.environ.get('FFMPEG', '/usr/bin/ffmpeg')
EXTRA = ['Привет! Я буду читать задачи вслух.']   # проверка «Читать задачи вслух» (RA.test)


def key_of(text):
    """Ключ записи — то же, что RV.key в late_91d_readvoice.js: строчные буквы и пробелы, без цифр и знаков."""
    return re.sub(r'\s+', ' ', re.sub(r'[^a-zа-яё ]+', ' ', text.lower())).strip()


def clip(t):
    """Как raText в late_79b_readaloud.js: длинные тексты обрезаются до 170 знаков по концу предложения."""
    if len(t) > 170:
        t = t[:170]
        k = max(t.rfind('.'), t.rfind('!'), t.rfind('?'))
        t = t[:k + 1] if k > 60 else re.sub(r'\s+\S*$', '', t)
    return t


def card_text(html):
    """Подсказка из кода (с тегами и [кнопка]) → текст, который прочитает карточка."""
    t = re.sub(r'<br\s*/?>', ' ', html)
    t = re.sub(r'<[^>]*>', '', t).replace('[кнопка]', ' ')
    t = re.sub(r'[◆✦]', ' ', t)
    t = re.sub(r'\s+', ' ', t)
    t = re.sub(r'\s+([,.!?:;])', r'\1', t).strip()
    return clip(t)


def _fem(n):
    """Число для «секунд…»: женский род («две секунды», «одну секунду»)."""
    from num2words import num2words
    w = num2words(n, lang='ru')
    w = re.sub(r'один$', 'одну', w)
    return re.sub(r'два$', 'две', w)


def speak(text):
    """Что произносит голос: счётчики и значки убираются, числа — словами."""
    from num2words import num2words
    t = text.replace('·', '. ').replace('‹…›', ' ').replace('×', ' ')
    t = re.sub(r'([.!?…])(?=[А-ЯЁ«])', r'\1 ', t)   # карточки боссов склеивают заголовок и текст без пробела («во сне.Подними») — голос глотает паузу
    t = re.sub(r'(\d+)\s*(?:с|сек)\b', lambda m: _fem(int(m.group(1))) + ' ' + _SEC(int(m.group(1))), t)   # «10 с»
    t = re.sub(r'(\d+)\s+(секунд[а-я]*)', lambda m: _fem(int(m.group(1))) + ' ' + _SEC(int(m.group(1))), t)   # «2 секунды»
    t = re.sub(r'(\d+)\s*%', lambda m: num2words(int(m.group(1)), lang='ru') + ' процентов', t)
    t = re.sub(r'\(?\s*\d+\s*(?:/|из)\s*(?:\d+|…)?\s*\)?', ' ', t)                       # счётчики «0 / 3», «(1 из 2)», «0 / …»
    t = re.sub(r'\d+', lambda m: num2words(int(m.group()), lang='ru'), t)
    t = re.sub(r'\s+', ' ', t)
    t = re.sub(r'\s+([,.!?:;])', r'\1', t)
    t = re.sub(r'([:,;])\s*([.!?])', r'\2', t).strip()
    if t and t[-1] not in '.!?…':
        t += '.'
    return t


def _SEC(n):
    n10, n100 = n % 10, n % 100
    return 'секунду' if n10 == 1 and n100 != 11 else 'секунды' if 2 <= n10 <= 4 and not 12 <= n100 <= 14 else 'секунд'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--texts', required=True, help='вывод harvest_read.js')
    ap.add_argument('--extract', help='вывод extract.js --boss: подсказки tip(…) из кода')
    ap.add_argument('--model', required=True, help='v4_ru.pt')
    ap.add_argument('--speaker', default='baya')
    ap.add_argument('--force', action='store_true')
    ap.add_argument('--prune', action='store_true')
    a = ap.parse_args()

    items = []   # (lv, kind, text) в порядке появления
    for t in json.load(open(a.texts, encoding='utf-8'))['texts']:
        items.append((t['lv'], t['kind'], t['text']))
    if a.extract:
        for b in json.load(open(a.extract, encoding='utf-8')).get('boss', []):
            if b.get('src') == 'tip':
                t = card_text(b['text'])
                if re.search(r'[А-Яа-яЁё]{3}', t):
                    items.append((b.get('lv') or 'g', 'tip', t))
    for t in EXTRA:
        items.append(('g', 'ui', t))

    os.makedirs(OUT, exist_ok=True)
    cat_path = os.path.join(OUT, 'read.json')
    old = {}
    if os.path.exists(cat_path):
        for e in json.load(open(cat_path, encoding='utf-8'))['lines']:
            old[e['key']] = e
    n_max = max([int(e['id'][1:]) for e in old.values()] + [0])

    lines, seen = [], {}
    prev = {k: e.get('tts') for k, e in old.items()}   # что произносилось раньше: изменился текст голоса — запись переделывается
    for lv, kind, text in items:
        k = key_of(text)
        if not k or k in seen:
            continue
        e = old.get(k)
        if e is None:
            n_max += 1
            e = {'id': 'r%04d' % n_max, 'key': k, 'lv': lv, 'kind': kind}
        e['text'] = text
        e['tts'] = speak(text)
        seen[k] = e
        lines.append(e)
    if not a.prune:   # без --prune сохраняем и записи, которых в этот раз нет в списке
        for k, e in old.items():
            if k not in seen:
                lines.append(e)

    import torch
    torch.set_num_threads(4)
    model = torch.package.PackageImporter(a.model).load_pickle('tts_models', 'model')
    model.to('cpu')
    todo = [e for e in lines if a.force or not os.path.exists(os.path.join(OUT, e['id'] + '.mp3')) or prev.get(e['key']) != e['tts'] or not e.get('dur')]
    print('текстов', len(lines), 'озвучить', len(todo), flush=True)
    for i, e in enumerate(todo, 1):
        with tempfile.TemporaryDirectory() as td:
            wav = os.path.join(td, 'a.wav')
            model.save_wav(text=e['tts'], speaker=a.speaker, sample_rate=24000, put_accent=True, put_yo=True, audio_path=wav)
            mp3 = os.path.join(OUT, e['id'] + '.mp3')
            # тишина по краям — долой, громкость −16 LUFS, MP3 моно 24 кГц 32 кбит/с. Два прохода: на части записей связка areverse + loudnorm в одном
            # фильтре зависает навсегда (ffmpeg спит), через промежуточный wav — нет; timeout не даёт зависнуть молча
            trim = 'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse'
            cut = os.path.join(td, 'cut.wav')
            mp3 = os.path.join(OUT, e['id'] + '.mp3')
            ff = [FFMPEG, '-nostdin', '-hide_banner', '-loglevel', 'error', '-y']
            subprocess.run(ff + ['-i', wav, '-af', trim, '-c:a', 'pcm_s16le', cut], check=True, timeout=120)
            subprocess.run(ff + ['-i', cut, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11,aresample=24000', '-ac', '1', '-ar', '24000', '-c:a', 'libmp3lame', '-b:a', '32k', mp3],
                           check=True, timeout=120)
            r = subprocess.run([FFMPEG, '-nostdin', '-hide_banner', '-i', mp3, '-f', 'null', '-'], capture_output=True, text=True)
            m = re.findall(r'time=(\d+):(\d+):([\d.]+)', r.stderr)
            e['dur'] = round(int(m[-1][0]) * 3600 + int(m[-1][1]) * 60 + float(m[-1][2]), 2) if m else 0
        if i % 50 == 0:
            print(i, '/', len(todo), flush=True)
    lines.sort(key=lambda e: e['id'])
    json.dump({'voice': 'silero_v4_ru:' + a.speaker, 'lines': lines}, open(cat_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(cat_path, 'a').write('\n')
    tot = sum(e.get('dur', 0) for e in lines)
    print('готово: %d записей, %.0f с речи, %.1f МБ' % (len(lines), tot, sum(os.path.getsize(os.path.join(OUT, e['id'] + '.mp3')) for e in lines) / 1e6))


if __name__ == '__main__':
    sys.exit(main())
