# 2D-мультсериал «Златая цепь» — съёмка (вертикаль 9:16)

Стиль, проба, промпты для ChatGPT и бриф голосов — `zlataya_cep/docs/47_mult2d_stil.md`. Сценарий — `zlataya_cep/docs/46_multserial.md`.
В игру не входит. Кадры и видео — в `tools/mult2d/out/`, в git не кладутся.

```sh
python3 tools/mult2d/cut.py                                    # детали из листов ChatGPT (art/) → sprites/ (по art/parts.json; label — листы с номерами)
node tools/mult2d/shoot.js --ep proba --at 2.5,8.3,15.4         # отдельные кадры для проверки → out/proba/at_*.jpg
for k in 0 1 2 3; do node tools/mult2d/shoot.js --ep proba --part $k/4 & done; wait   # все кадры 1080×1920, 24 к/с → out/proba/*.jpg
python3 tools/mult2d/audio_proba.py                             # звук пробы → out/proba_audio.wav
tools/mult2d/encode.sh proba                                    # → out/proba.mp4 (H.264 + AAC)
```
Предпросмотр в реальном времени: `python3 -m http.server -d tools/mult2d`, затем открыть `index.html?ep=proba`.
Метки рта: `rhubarb -r phonetic -f json -o voice/<серия>/lips/<id>.json voice/<серия>/<id>.wav` (Rhubarb Lip Sync 1.13, GitHub).

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
- `pup.js` — куклы из деталей ChatGPT: Пелагея, Звенышко, Кот Учёный, Кощей (бюст и рука). Рот — формы Rhubarb A–H (`MD.mouth`).
- `voice/refs/` — русские образцы голосов для клонирования (из озвучки игры), `voice/proba/lines.json` — реплики с ударениями (U+0301 и «+»).
- `art/` — листы ChatGPT и `parts.json` (номер детали → имя), `voice/` — голоса VoiceStudio и метки рта; `sprites/` — нарезка, в git не кладётся.
- `ep_<серия>.js` — серия: `MD.eps[id] = {dur, shots:[{a,b,draw}], trans:[{at,dur,type}], subs:[…], post}`.
- `shoot.js` — покадровая съёмка в Playwright: кадр берётся с холста в JPEG, а не скриншотом страницы.
- `audio_<серия>.py` — звук синтезом (numpy): шкатулка, гусли, гул, шумы по меткам времени серии + голоса VoiceStudio, под голосом музыка тише.
- `fonts/` — Ruslan Display, Rubik, Alegreya (Google Fonts, лицензия OFL).
