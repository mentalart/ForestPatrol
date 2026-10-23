# 2D-мультсериал «Златая цепь» — съёмка (вертикаль 9:16)

Стиль, проба, промпты для ChatGPT и бриф голосов — `zlataya_cep/docs/47_mult2d_stil.md`. Сценарий — `zlataya_cep/docs/46_multserial.md`.
В игру не входит. Кадры и видео — в `tools/mult2d/out/`, в git не кладутся.

```sh
node tools/mult2d/shoot.js --ep proba --at 2.5,8.3,15.4         # отдельные кадры для проверки → out/proba/at_*.jpg
for k in 0 1 2 3; do node tools/mult2d/shoot.js --ep proba --part $k/4 & done; wait   # все кадры 1080×1920, 24 к/с → out/proba/*.jpg
python3 tools/mult2d/audio_proba.py                             # звук пробы → out/proba_audio.wav
tools/mult2d/encode.sh proba                                    # → out/proba.mp4 (H.264 + AAC)
```
Предпросмотр в реальном времени — открыть `tools/mult2d/index.html` в браузере. Нужен `--allow-file-access-from-files`
или любой локальный сервер.

## Как устроено
- `engine.js` — кадр 1080×1920 как чистая функция времени `MD.render(t)`:
  - бумага: `MD.paper` рисует деталь с тенью, фактурой и срезом, `MD.pop` поднимает слой из сгиба страницы;
  - лак: `MD.glow` рисует золотую линию со свечением, `MD.drawOn` прорисовывает её в кадре;
  - время: `MD.twos` — перекладка «на двойках», `MD.ease` — кривые, `MD.rng` — случайность от зерна (переснятый кадр совпадает с прежним);
  - камера `MD.camera` (центр, масштаб, поворот, тряска), субтитры по формату ВК Клипов;
  - переходы: `page` — перелистывание, `lacquer` — лаковая капля, `gold` — золотой круг хохломы.
- `cast.js` — куклы и декорации: Звенышко, Пелагея, тетрадка, Кощей (лицо и рука), дуб бумажный и золотой, цепь.
  Позже здесь же — куклы из деталей ChatGPT, шарниры остаются прежними.
- `ep_<серия>.js` — серия: `MD.eps[id] = {dur, shots:[{a,b,draw}], trans:[{at,dur,type}], subs:[…], post}`.
- `shoot.js` — покадровая съёмка в Playwright: кадр берётся с холста в JPEG, а не скриншотом страницы.
- `audio_<серия>.py` — звук синтезом (numpy): шкатулка, гусли, гул, шумы по меткам времени серии. Голоса позже добавляются отдельной дорожкой.
- `fonts/` — Ruslan Display, Rubik, Alegreya (Google Fonts, лицензия OFL).
