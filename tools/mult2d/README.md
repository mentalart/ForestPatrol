# 2D-мультсериал «Златая цепь» — съёмка (вертикаль 9:16)

Стиль, проба, промпты для ChatGPT и бриф голосов — `zlataya_cep/docs/47_mult2d_stil.md`. Сценарий — `zlataya_cep/docs/46_multserial.md`.
В игру не входит. Кадры и видео — в `tools/mult2d/out/`, в git не кладутся.

```sh
python3 tools/mult2d/cut.py                                    # детали из листов ChatGPT (art/) → sprites/ (по art/parts.json)
python3 tools/mult2d/cut.py label proshka/parts.png!1          # лист с номерами деталей → out/cut_labels/ («!1» — детали стоят тесно)
node tools/mult2d/shoot.js --ep ser01 --mids                    # кадр из середины каждого плана → out/ser01/mid_NN.jpg
node tools/mult2d/shoot.js --ep kukly --at 0,1                  # лист кукол: покой и поза — проверка шарниров
for k in 0 1 2 3; do node tools/mult2d/shoot.js --ep ser01 --part $k/4 & done; wait   # все кадры 1080×1920, 24 к/с
python3 tools/mult2d/audio_ser01.py                             # звук серии (по out/ser01/timeline.json от shoot.js) → out/ser01_audio.wav
tools/mult2d/encode.sh ser01                                    # → out/ser01.mp4 (H.264 + AAC); FFMPEG=путь, если ffmpeg нет в PATH
for k in 0 1 2 3; do node tools/mult2d/shoot.js --ep ser01v4 --part $k/4 & done; wait   # серия 1 v4 (ep_s4.js + s4_1…s4_4.js)
python3 tools/mult2d/audio_s4.py && tools/mult2d/encode.sh ser01v4   # звук v4 и склейка → out/ser01v4.mp4
python3 tools/mult2d/animatic.py [--fast]                       # аниматик серии 1 v4: панели art/ser01v4/sb/ + голоса → out/ser01_animatic.mp4
```
Предпросмотр в реальном времени: `python3 -m http.server -d tools/mult2d`, затем открыть `index.html?ep=ser01` (или `proba`).
Съёмка берёт Playwright, а без него — установленный Chrome или Edge по протоколу DevTools (`CHROME=путь`).

**Голоса** (VoiceStudio, движок VoxCPM2; подробно — `voice/README.md`):
```sh
python3 tools/mult2d/voice_rec.py rec ser01 3                   # реплики voice/ser01/lines.json клон-профилями → out/voice_ser01/, best.json
python3 tools/mult2d/voice_post.py ser01 tools/mult2d/out/voice_ser01/best.json   # → voice/ser01/<id>.wav (эффект, тишина, 48 кГц, −1 dBFS)
python3 tools/mult2d/voice_post.py ser01 dur                    # длины записей → DUR в ep_ser01.js (планы растягиваются под реплики)
rhubarb -r phonetic -f json -o voice/ser01/lips/<id>.json voice/ser01/<id>.wav   # рот (Rhubarb Lip Sync 1.13, GitHub)
python3 tools/mult2d/lips_amp.py voice/ser01                    # запасной рот по громкости, где нет меток Rhubarb
```

## Как устроено
- `engine.js` — кадр 1080×1920 как чистая функция времени `MD.render(t)`:
  - бумага: `MD.paper` рисует деталь с тенью, фактурой и срезом, `MD.pop` поднимает слой из сгиба страницы;
  - лак: `MD.glow` рисует золотую линию со свечением, `MD.drawOn` прорисовывает её в кадре;
  - время: `MD.twos` — перекладка «на двойках», `MD.ease` — кривые, `MD.rng` — случайность от зерна (переснятый кадр совпадает с прежним);
  - камера `MD.camera` (центр, масштаб, поворот, тряска), субтитры по формату ВК Клипов;
  - переходы: `page` — перелистывание, `lacquer` — лаковая капля, `gold` — золотой круг хохломы.
- `cast.js` — куклы и декорации: Звенышко, Пелагея, тетрадка, Кощей (лицо и рука), дуб бумажный и золотой, цепь.
  Рисованные кодом куклы — запасные, проба v2 играет куклами из `pup.js`.
- Игра кукол: `MD.anticip`, `MD.spring`, `MD.lag`, `MD.steps`, `MD.blinkAuto`, `MD.breath`, `MD.boil` — как применять, навык `perekladka` (`.claude/skills/perekladka/`).
- `pup.js` — куклы из деталей ChatGPT: Пелагея, Звенышко, Кот Учёный, Кощей (бюст и рука), Прошка, Потап, Йоша, Тишка, Колобок.
  Рот — формы Rhubarb A–H (`MD.mouth`), поза — `armL/armR`, `elbowL/elbowR`, `legL/legR`, `lean`, `tilt`, `eyes`, `brow`.
- `voice/refs/` — русские образцы голосов для клонирования (из озвучки игры), `voice/proba/lines.json` — реплики с ударениями (U+0301 и «+»).
- `art/` — листы ChatGPT и `parts.json` (номер детали → имя), `voice/` — голоса VoiceStudio и метки рта; `sprites/` — нарезка, в git не кладётся.
- `sets.js` — общие декорации серий: ночное небо, книжка-разворот, лак, палехская рамка, иней, моргание, жест сказителя (`MD.set`).
- `ep_ser01.js` — серия 1 «Звенышко» (2:28, 40 планов): план — `shot(длина, рисунок, реплики)`, время планов и реплик считается само,
  план не короче своих реплик (`DUR`). `ep_kukly.js` — лист кукол для проверки шарниров.
- `ep_s4.js` + `s4_1.js…s4_4.js` — серия 1, четвёртая редакция (`ep=ser01v4`): фоны-картины `bg/v4_*` (`S.plate`, точка картины → мир `S.at`), куклы в свете сцены (`S.A` с `light`: lamp, night, ice, amber, dawn), реквизит `props4/` (`S.prop`), силуэты теневого театра `sil4/` (`MD.s4sil`), Кощей `koschei4/`. Звук — `audio_s4.py` по меткам `cue`.
- `ep_<серия>.js` — серия: `MD.eps[id] = {dur, shots:[{a,b,draw}], trans:[{at,dur,type}], subs:[…], post}`.
- `shoot.js` — покадровая съёмка в Playwright: кадр берётся с холста в JPEG, а не скриншотом страницы.
- `audio_<серия>.py` — звук синтезом (numpy): шкатулка, гусли, гул, шумы по меткам времени серии + голоса VoiceStudio, под голосом музыка тише.
- `fonts/` — Ruslan Display, Rubik, Alegreya (Google Fonts, лицензия OFL).
