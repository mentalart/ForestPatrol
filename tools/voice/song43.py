#!/usr/bin/env python3
"""«Эй, ухнем» для 4-3 голосами Silero v4: запев Потапа (бас), хор «Ух-нем!», голоса героев в хоре, «Раззудись!».

  scratchpad/sv/bin/python tools/voice/song43.py --model v4_ru.pt     (FFMPEG=/usr/bin/ffmpeg, если fetch.js не найдёт ffmpeg)

Silero не поёт — короткий запев «тянется» (SSML: медленно и низко), длинный читается в обычном темпе, потом вибрато и эхо; хор — несколько голосов вразнобой
(свой тон и задержка у каждого) с эффектом chorus. Готовые wav — tools/voice/raw/<id>.wav, записи — в lines.json
(url «silero:song»: fetch.js берёт готовый wav, тон не меняет — pitch 0), дальше обычная обработка fetch.js (−16 LUFS).
Игра (build/levels/4-3/late_99w4_song43.js) играет запев в начале такта, хор — на «ух-нем», голос героя — при удачном нажатии.
"""
import argparse, json, os, subprocess

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CAT = os.path.join(ROOT, 'zlataya_cep', 'build', 'voice', 'lines.json')
RAW = os.path.join(ROOT, 'tools', 'voice', 'raw')
FF = os.environ.get('FFMPEG', 'ffmpeg')

BASS = [('aidar', -3, 0.0, 1.0)]                      # голос, тон (полутона), задержка (с), громкость
CHOIR = [('aidar', -3, 0.0, 1.0), ('eugene', -1, 0.025, 0.8), ('baya', 0, 0.04, 0.7), ('xenia', 2, 0.015, 0.6), ('kseniya', 1, 0.05, 0.6)]
SOLO = [('4-3_s01', 'Эй,', 'Э-эй,'), ('4-3_s02', 'Ещё разик,', 'Ещё разик,'), ('4-3_s03', 'Ещё да раз,', 'Ещё да раз,'),
        ('4-3_s04', 'Разовьём,', 'Разовьём,'), ('4-3_s05', 'Мы берёзу,', 'Мы берёзу,'), ('4-3_s06', 'Мы кудряву,', 'Мы кудряву,'),
        ('4-3_s07', 'По бережку,', 'По бережку,'), ('4-3_s08', 'Идём-идём,', 'Идём, идём,'), ('4-3_s09', 'Песню солнцу,', 'Песню солнцу,'),
        ('4-3_s10', 'Мы поём,', 'Мы поё-ём,'), ('4-3_s11', 'Ай-да, да,', 'Ай да, да,'), ('4-3_s12', 'Ай-да,', 'А-ай да,')]
# запись: id, кто, текст (как в игре), что читать, голоса, скорость SSML, наибольшая длина (с)
LINES = [(i, 'potap', t, s, BASS, 'slow' if '-' in s else 'medium', 0.95) for i, t, s in SOLO] + [
    ('4-3_s13', 'chorus', 'Ух-нем!', 'У-ух нем!', CHOIR, 'medium', 0.75),
    ('4-3_s14', 'chorus', 'Раззудись!', 'Раззуди-ись!', CHOIR, 'medium', 1.1),
    ('4-3_s15', 'potap', 'Ух-нем!', 'Ух-нем!', [('aidar', -3, 0, 1)], 'medium', 0.6),
    ('4-3_s16', 'proshka', 'Ух-нем!', 'Ух-нем!', [('xenia', 1, 0, 1)], 'medium', 0.6),
    ('4-3_s17', 'pelageya', 'Ух-нем!', 'Ух-нем!', [('kseniya', 1, 0, 1)], 'medium', 0.6),
    ('4-3_s18', 'yosha', 'Ух-нем!', 'Ух-нем!', [('xenia', 3, 0, 1)], 'medium', 0.6)]


def ff(*a):
    subprocess.run([FF, '-y', '-v', 'error', *a], check=True)


def dur(f):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--model', default='v4_ru.pt')
    a = ap.parse_args()
    import torch
    torch.set_num_threads(4)
    model = torch.package.PackageImporter(a.model).load_pickle('tts_models', 'model')
    model.to('cpu')
    os.makedirs(RAW, exist_ok=True)
    tmp = os.path.join(RAW, '_song')
    os.makedirs(tmp, exist_ok=True)
    D = json.load(open(CAT, encoding='utf-8'))
    ids = []
    for lid, who, text, tts, voices, rate, mx in LINES:
        parts = []
        for k, (sp, p, dl, g) in enumerate(voices):
            w = os.path.join(tmp, f'{lid}_{k}.wav')
            low = ' pitch="low"' if p < 0 else ''
            model.save_wav(ssml_text=f'<speak><prosody rate="{rate}"{low}>{tts}</prosody></speak>', speaker=sp, sample_rate=48000, audio_path=w)
            r = 2 ** (p / 12)
            o = os.path.join(tmp, f'{lid}_{k}p.wav')   # тон без смены темпа, тишина по краям — прочь, задержка голоса в хоре
            ff('-i', w, '-af', f'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,'
               f'aresample=44100,asetrate={44100 * r:.1f},aresample=44100,atempo={1 / r:.5f},adelay={int(dl * 1000)},volume={g}', '-ac', '1', o)
            parts.append(o)
        mix = os.path.join(tmp, f'{lid}_mix.wav')
        if len(parts) > 1:
            ins = sum((['-i', p] for p in parts), [])
            ff(*ins, '-filter_complex', f'amix=inputs={len(parts)}:normalize=0,chorus=0.6:0.9:50|60:0.4|0.32:0.25|0.4:2|1.3', mix)
        else:
            ff('-i', parts[0], '-c', 'copy', mix)
        d0 = dur(mix)
        tempo = max(1.0, d0 / mx)
        chain = ([f'atempo={min(2.0, tempo):.4f}'] if tempo > 1.001 else []) + ['vibrato=f=5.5:d=0.12', 'aecho=0.8:0.6:60|110:0.25|0.15']
        out = os.path.join(RAW, lid + '.wav')
        ff('-i', mix, '-af', ','.join(chain), '-ac', '1', out)
        e = {'id': lid, 'lv': '4-3', 'who': who, 'text': text, 'tts': tts, 'url': 'silero:song', 'pitch': 0, 'song': True}
        D['lines'] = [x for x in D['lines'] if x['id'] != lid] + [e]
        ids.append(lid)
        print(lid, who, text, f'{d0:.2f}s', f'×{tempo:.2f}' if tempo > 1.001 else '', flush=True)
    json.dump(D, open(CAT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(CAT, 'a', encoding='utf-8').write('\n')
    subprocess.run(['node', os.path.join(ROOT, 'tools', 'voice', 'fetch.js'), '--only', ','.join(ids)], check=True)
    print('готово:', len(ids), 'записей песни; теперь python3 zlataya_cep/build/build_final.py')


if __name__ == '__main__':
    main()
