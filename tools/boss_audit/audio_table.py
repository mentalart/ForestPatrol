#!/usr/bin/env python3
"""audio_table.py [файл.txt ...] — сводка из вывода run_audio.sh: имя, пик, RMS (среднее за окно), RMS (максимум), dBFS.
Для каждой шины (mus/sfx/vox/all) пишет [пик, RMS среднее, RMS макс]; «all» — выход лимитера (то, что слышит игрок)."""
import glob, json, os, sys

OUT = os.environ.get('BOSS_AUDIT_OUT', '/tmp/boss_audit')
files = sys.argv[1:] or sorted(glob.glob(f'{OUT}/audio_*.txt'))
for f in files:
    for line in open(f, encoding='utf-8'):
        if not line.startswith('> [['):
            continue
        for row in json.loads(line[2:]):
            name, rest = row[0], row[1:]
            d = rest[-1] if isinstance(rest[-1], dict) else {}
            if not d:
                print(f'{name:34} {rest}')
                continue
            print(f'{name:34} ' + '  '.join(f'{k}={v}' for k, v in d.items() if k in ('mus', 'sfx', 'vox', 'all') and v[0] > -100))
