#!/usr/bin/env python3
"""Голоса сериала в VoiceStudio на движке VoxCPM2 (локальный API http://127.0.0.1:3900, нужен запущенный VoiceStudio).
  python3 tools/mult2d/voice_rec.py design <голос|all> [N]      дубли нового голоса по описанию тембра (voice/profiles/vox.json: desc, ref)
                                                               → out/voice_design/<голос>/takeK.wav + score.json (распознавание, высота)
  python3 tools/mult2d/voice_rec.py profile <голос> <дубль.wav>  сохранить дубль клон-профилем «ЗЦ сериал · …», id → vox.json
  python3 tools/mult2d/voice_rec.py rec <серия> [N] [id,id…]     реплики voice/<серия>/lines.json клон-профилями, N дублей
                                                               → out/voice_<серия>/<id>_tK.wav, лучший по распознаванию — best.json
Дальше: voice_post.py <серия> out/voice_<серия>/best.json (обработка → voice/<серия>/<id>.wav), lips_amp.py или Rhubarb (рот).
Почему так: дизайн голоса по описанию у VoxCPM2 даёт новый тембр на каждый дубль (сид в подпроцессе не держится), поэтому
выбранный дубль сохраняется клон-профилем, и все реплики героя пишутся клонированием с него — тембр один на всю серию.
Поле instruct реплики (шёпот, пение, смех) переводит клонирование в управляемый режим: тембр от образца, манера — из описания."""
import sys, os, json, re, wave, glob, difflib, time
import numpy as np, requests

API = os.environ.get('VOICESTUDIO', 'http://127.0.0.1:3900')
D = os.path.dirname(os.path.abspath(__file__))
VOX = os.path.join(D, 'voice', 'profiles', 'vox.json')


def gen(text, out, instruct=None, profile_id=None, seed=None):
    data = {'text': text, 'language': 'Russian', 'engine': 'voxcpm2'}   # текст — полем формы в UTF-8 (в curl под Windows кириллица портится)
    if instruct: data['instruct'] = instruct
    if profile_id: data['profile_id'] = profile_id
    if seed is not None: data['seed'] = str(seed)
    t = time.time(); r = requests.post(API + '/generate', files={k: (None, v) for k, v in data.items()}, timeout=900)
    if r.status_code != 200: print('ошибка', out, r.status_code, r.text[:300], flush=True); return False
    open(out, 'wb').write(r.content); print(os.path.basename(out), '%.1f с' % (time.time() - t), flush=True); return True


def read_wav(p):
    with wave.open(p) as w:
        sr = w.getframerate(); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
        if w.getnchannels() > 1: a = a.reshape(-1, w.getnchannels()).mean(1)
    return a, sr


def f0(a, sr):
    """Медиана основного тона (Гц) по автокорреляции звонких окон 40 мс."""
    hop, win, lo, hi = int(sr * .01), int(sr * .04), int(sr / 600), int(sr / 60)
    ra, vals = np.sqrt(np.mean(a ** 2)) + 1e-9, []
    for i in range(0, len(a) - win, hop):
        x = a[i:i + win]
        if np.sqrt(np.mean(x ** 2)) < ra * .6: continue
        x = x - x.mean(); c = np.correlate(x, x, 'full')[win - 1:]
        if c[0] <= 0: continue
        c = c / c[0]; k = lo + int(np.argmax(c[lo:hi]))
        if c[k] > .5: vals.append(sr / k)
    return float(np.median(vals)) if vals else 0.0


def asr(p):
    with open(p, 'rb') as f:
        r = requests.post(API + '/transcribe', files={'audio': (os.path.basename(p), f, 'audio/wav')}, data={'language': 'ru', 'mode': 'reference'}, timeout=600)
    try: return r.json().get('text') or ''
    except Exception: return ''


norm = lambda s: ' '.join(re.sub(r'[^а-я ]', '', s.lower().replace('ё', 'е').replace('-', ' ')).split())
sim = lambda a, b: round(difflib.SequenceMatcher(None, norm(a), norm(b)).ratio(), 3)


def score(path, text):
    a, sr = read_wav(path); r = asr(path)
    return {'file': os.path.basename(path), 'dur': round(len(a) / sr, 2), 'f0': round(f0(a, sr)), 'asr': r, 'sim': sim(text, r)}


if __name__ == '__main__':
    cmd, vox = sys.argv[1], json.load(open(VOX, encoding='utf-8'))
    if cmd == 'design':
        n = int(sys.argv[3]) if len(sys.argv) > 3 else 6
        for v in (list(vox) if sys.argv[2] == 'all' else sys.argv[2].split(',')):
            od = os.path.join(D, 'out', 'voice_design', v); os.makedirs(od, exist_ok=True); res = []
            for k in range(1, n + 1):
                p = os.path.join(od, 'take%d.wav' % k)
                if gen(vox[v]['ref'], p, instruct=vox[v]['desc'], seed=k): res.append(score(p, vox[v]['ref'])); print(res[-1], flush=True)
            json.dump(res, open(os.path.join(od, 'score.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    elif cmd == 'profile':
        v, take = sys.argv[2], sys.argv[3]
        with open(take, 'rb') as f:
            r = requests.post(API + '/profiles', data={'name': vox[v]['name'], 'ref_text': vox[v]['ref'], 'language': 'Russian', 'kind': 'clone'},
                              files={'ref_audio': (v + '.wav', f, 'audio/wav')}, timeout=120)
        vox[v]['id'] = r.json()['id']; json.dump(vox, open(VOX, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        ex = requests.post(API + '/personas/export/' + vox[v]['id'], timeout=60)
        open(os.path.join(D, 'voice', 'profiles', vox[v]['file']), 'wb').write(ex.content); print(v, vox[v]['id'])
    elif cmd == 'rec':
        ep = sys.argv[2]; n = int(sys.argv[3]) if len(sys.argv) > 3 else 3; only = set(sys.argv[4].split(',')) if len(sys.argv) > 4 else None
        lines = json.load(open(os.path.join(D, 'voice', ep, 'lines.json'), encoding='utf-8'))
        od = os.path.join(D, 'out', 'voice_' + ep); os.makedirs(od, exist_ok=True)
        bp = os.path.join(od, 'best.json'); best = json.load(open(bp, encoding='utf-8')) if os.path.exists(bp) else {}
        for L in lines:
            if only and L['id'] not in only: continue
            text, takes = L['text'].replace('♪', '').strip(), []
            for k in range(1, n + 1):
                p = os.path.join(od, '%s_t%d.wav' % (L['id'], k))
                if os.path.exists(p) or gen(text, p, instruct=L.get('instruct'), profile_id=vox[L['who']]['id'], seed=k):
                    takes.append(score(p, text)); print(L['id'], takes[-1], flush=True)
                    if takes[-1]['sim'] >= .97 and k >= 2: break   # два дубля, если первый уже разборчив
            if takes:
                b = max(takes, key=lambda x: (x['sim'], -abs(x['dur'] - .075 * len(text))))
                best[L['id']] = {**b, 'who': L['who'], 'text': text, 'takes': takes}
                json.dump(best, open(bp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
