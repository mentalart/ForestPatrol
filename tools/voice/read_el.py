#!/usr/bin/env python3
"""Записи «Читать вслух» голосом ElevenLabs: готовые мастера tools/voice/raw/<id>.mp3 → zlataya_cep/build/voice/read/<id>.mp3.

  python3 tools/voice/read_el.py [--raw tools/voice/raw] [--voice elevenlabs:eleven_v4:reader] [--keep]

Мастера генерирует ElevenLabs (голос cast.reader, текст — поле tts строки read.json; см. docs/44_prompt_pereozvuchka_elevenlabs.md).
Обработка та же, что в read_tts.py: тишина по краям — долой, −16 LUFS, MP3 моно 24 кГц 32 кбит/с. Строке каталога пишутся dur и voice
(голос записи; у строк без voice — голос каталога, Silero). Обработанные мастера удаляются, если не указан --keep.
read_tts.py переделывает только записи без файла, с новым tts или без dur — эти записи он не тронет (кроме --force).
"""
import argparse, json, os, re, subprocess, sys, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(ROOT, 'zlataya_cep', 'build', 'voice', 'read')
FFMPEG = os.environ.get('FFMPEG', '/usr/bin/ffmpeg')
TRIM = ('silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,'
        'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--raw', default=os.path.join(ROOT, 'tools', 'voice', 'raw'))
    ap.add_argument('--voice', default='elevenlabs:eleven_v4:reader')
    ap.add_argument('--keep', action='store_true')
    a = ap.parse_args()
    cat_path = os.path.join(OUT, 'read.json')
    cat = json.load(open(cat_path, encoding='utf-8'))
    ff = [FFMPEG, '-nostdin', '-hide_banner', '-loglevel', 'error', '-y']
    n = 0
    for e in cat['lines']:
        raw = os.path.join(a.raw, e['id'] + '.mp3')
        if not os.path.exists(raw):
            continue
        mp3 = os.path.join(OUT, e['id'] + '.mp3')
        with tempfile.TemporaryDirectory() as td:
            cut = os.path.join(td, 'cut.wav')
            subprocess.run(ff + ['-i', raw, '-af', TRIM, '-c:a', 'pcm_s16le', cut], check=True, timeout=120)
            subprocess.run(ff + ['-i', cut, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11,aresample=24000', '-ac', '1', '-ar', '24000',
                                 '-c:a', 'libmp3lame', '-b:a', '32k', mp3], check=True, timeout=120)
        r = subprocess.run([FFMPEG, '-nostdin', '-hide_banner', '-i', mp3, '-f', 'null', '-'], capture_output=True, text=True)
        m = re.findall(r'time=(\d+):(\d+):([\d.]+)', r.stderr)
        e['dur'] = round(int(m[-1][0]) * 3600 + int(m[-1][1]) * 60 + float(m[-1][2]), 2) if m else 0
        e['voice'] = a.voice
        if not a.keep:
            os.remove(raw)
        n += 1
    json.dump(cat, open(cat_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(cat_path, 'a').write('\n')
    print('записей:', n)


if __name__ == '__main__':
    sys.exit(main())
