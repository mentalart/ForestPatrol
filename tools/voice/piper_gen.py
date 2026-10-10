#!/usr/bin/env python3
# Голос для реплик, которых нет в Higgsfield: локальная модель Piper (бесплатно, без сети при генерации).
# Персонаж с "engine": "piper" в cast каталога (zlataya_cep/build/voice/lines.json) — его реплики без записи синтезируются в
# tools/voice/raw/<id>.wav, дальше их, как и записи Higgsfield, обрабатывает fetch.js (обрезка, тон cast.pitch, обработка fx, −16 LUFS, MP3).
#   python3 -m venv /tmp/piper && /tmp/piper/bin/pip install piper-tts
#   голос: https://github.com/rhasspy/piper/releases/download/v0.0.2/voice-ru-irinia-medium.tar.gz (распаковать; модель — cast.model)
#   PIPER=/tmp/piper/bin/piper PIPER_DIR=папка_с_моделью python3 tools/voice/piper_gen.py [--only id,id]
#   node tools/voice/fetch.js --only id,id   (FFMPEG=/usr/bin/ffmpeg в облачной сессии)
import json, os, re, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CAT = os.path.join(ROOT, 'zlataya_cep', 'build', 'voice', 'lines.json')
RAW = os.path.join(ROOT, 'tools', 'voice', 'raw')
VD = os.path.dirname(CAT)
PIPER = os.environ.get('PIPER', 'piper'); PDIR = os.environ.get('PIPER_DIR', '.')
only = sys.argv[sys.argv.index('--only') + 1].split(',') if '--only' in sys.argv else []
D = json.load(open(CAT, encoding='utf-8')); os.makedirs(RAW, exist_ok=True); n = 0
for e in D['lines']:
    c = D['cast'].get(e.get('voice') or e['who'], {})
    if c.get('engine') != 'piper' or (only and e['id'] not in only): continue
    if not only and e.get('dur') and os.path.exists(os.path.join(VD, e['id'] + '.mp3')): continue
    text = re.sub(r'\[[^\]]*\]', '', re.sub(r'<[^>]*>', '', e.get('tts') or e['text'])).strip()
    out = os.path.join(RAW, e['id'] + '.wav')
    subprocess.run([PIPER, '-m', os.path.join(PDIR, c['model']), '-f', out, '--length_scale', str(c.get('length', 1.0))],
                   input=text.encode('utf-8'), check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(e['id'], text); n += 1
print('piper: записей', n)
