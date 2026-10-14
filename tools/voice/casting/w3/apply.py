# Мир 3: голоса ElevenLabs в cast и пометка переозвученных реплик (есть tools/voice/raw/<id>.mp3).
import json, os, sys
p = 'zlataya_cep/build/voice/lines.json'
d = json.load(open(p))
NEW = {'zhar': ('lCR4sAflgzx84ZnrQFmR', 'ZC Жар-птица', None),
       'pechka': ('nP0bRk01gVFAfe0tdV1U', 'ZC Печка', None),
       'sirin': ('FXtv1YsaZ5AFMOSdqSZn', 'Olchida', '[softly] [sad]'),
       'alkonost': ('tj9wwIq7s2HekkDfg1KH', 'Jasmine - Sweet & Professional', '[cheerful]')}
NEW.update(json.loads(sys.argv[1]) if len(sys.argv) > 1 else {})
for k, (vid, name, tag) in NEW.items():
    c = d['cast'][k]
    if c.get('el_voice_id') == vid: continue
    c['pitch_hf'] = c.get('pitch', 0); c['pitch'] = 0
    c['el_voice_id'] = vid; c['el_voice_name'] = name
    if tag: c['el_tag'] = tag
ids = []
for l in d['lines']:
    if not str(l.get('lv', '')).startswith('3-'): continue
    if not os.path.exists('tools/voice/raw/%s.mp3' % l['id']) or l.get('url') == 'elevenlabs:eleven_v4': continue
    for k in ('job', 'dur', 'pitch', 'revoice', 'cut'): l.pop(k, None)
    l['url'] = 'elevenlabs:eleven_v4'; l['el_take'] = 1
    ids.append(l['id'])
open(p, 'w').write(json.dumps(d, ensure_ascii=False, indent=1) + '\n')
print(','.join(ids))
