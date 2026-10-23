# «Баю-баю, за рекою» — 30-секундный ролик для соцсетей (сценарий)

Момент из «Присказки» (`42_priskazka_intro.md`, сцены 4–5): ночь на Лукоморье, Кот поёт колыбельную, на дальнем берегу его слышит Кощей — и приходит чёрная туча. Это атмосферный тизер, а не пересказ: ни одной реплики, всё держат свет, цвет и звук.

## Формат

| | |
|---|---|
| Длина | 30 с: семь шотов по 4,04 с (97 кадров, 24 к/с) ≈ 28,3 с + 1,7 с титра |
| Кадр | вертикальный 9:16 (Reels, Shorts, TikTok), 704×1280 → видео 480×848 |
| Стиль | low-poly «вырезанная из дерева сказка»: грани, фаски, матовая темпера (как в игре, `02_art_bible.md`) |
| Концепты | WanGP, Qwen Image 2.1 7B (`qwen_image_21_7B`), 40 шагов, CFG 4, 720×1280 |
| Видео | WanGP, Hunyuan Video 1.5 Image2Video 480p (`hunyuan_1_5_480_i2v`): стартовый кадр шота — его концепт |
| Звук | у Hunyuan его нет: музыка и эффекты — отдельной дорожкой (см. «Звук») |

Почему не LTX-2 / Krea 2: на машине стоят только Qwen Image, Hunyuan Video 1.5, Wan 2.2 5B и Flux 2 klein; веса Krea 2 Turbo и LTX-2 2.5 (шаблоны по умолчанию) не скачаны — Krea тянулась ≈ 3 МБ/с.

## Идея и настроение

Тепло → тайна → холод → потеря. Начинаем с самого уютного, что есть в игре (костёр, сонный круг слушателей, золотая цепь на дубе), и за 30 секунд забираем это: туча, иней, рука, «дзынь». Последний кадр — не злодей, а золотые искры звеньев, разлетающиеся по небу, — крючок «что дальше?» и название игры.

Цвет: персик и золото огня против тёмно-синей ночи (шоты 1–2) → холодный иней и лиловый (шоты 3–6) → золото остаётся только в цепи и искрах.

## Раскадровка

| № | Время | Концепт | План, камера | Что в кадре |
|---|---|---|---|---|
| 1 | 0:00–0:04 | K1 | ОБЩ, медленный crane вниз от звёзд | Ночь. Дуб, вокруг ствола светится золотая цепь. У корней костёр, вокруг спят Колобок, Векша, медвежонок, ёж. Светлячки. |
| 2 | 0:04–0:08 | K2 | КР, лицо, лёгкий push | Кот Учёный на корнях, глаза прикрыты, поёт колыбельную; золотая цепь рядом мерцает. |
| 3 | 0:08–0:12 | K3 | ОБЩ → push, снизу | Дальний берег. На фоне огромной луны высокий худой силуэт в короне, ворон на плече; на «серый волк» опускает голову, по камню бегут морозные узоры. |
| 4 | 0:12–0:16 | K4 | ОБЩ снизу | Из моря встаёт лиловая туча, глотает луну; ветер гасит костёр снопом искр; по траве бежит иней; Кот с шерстью дыбом смотрит вверх. |
| 5 | 0:16–0:20 | K7 | ДЕТ, глаза | Кот: шерсть дыбом, глаза расширяются; иней на шерсти, угасающий огонь. |
| 6 | 0:20–0:24 | K5 | ДЕТ, рука и звено | Костлявая рука с перстнем опускается к золотому звену, пальцы смыкаются. Затем 0,4 с чёрного. |
| 7 | 0:24–0:28 | K6 | ОБЩ сверху, отъезд | Золотые искры и звенья взрываются над Лукоморьем, разлетаются по небу. Последний кадр замирает, поверх — титр «Златая цепь» (до 0:30). |

## Звук

Дорожка собирается отдельно и кладётся под видео: костёр и тихие гусли (шоты 1–2), колыбельная вполголоса (шот 2), ветер, хруст инея, звон ключей (3), гул тучи и шипение костра (4), стук сердца (5), низкий гул → тишина → хрустальное «дзынь» (6), звон искр, разлетающийся по стерео (7).

## Промты видео (Hunyuan i2v)

Общее: *smooth cinematic camera, stylized low-poly 3D game look, hand-carved painted wooden toy, no text.*

1. *Slow crane down from the starry sky to the giant oak with the glowing golden chain; campfire flames flicker, fireflies drift, the sleepy animals breathe softly.*
2. *The grey cat sings softly with half-closed eyes, slow push-in; warm firelight flickers on his face; the golden chain links glimmer.*
3. *Slow push-in from below on the tall skeletal sorcerer against the huge moon; he slowly lowers his head, the raven shifts, white frost spreads across the rock, distant campfire flickers.*
4. *The huge violet cloud swells and rolls over the oak, swallowing the moon; the campfire bursts into flying sparks and goes out, frost crystals spread across the grass, the small cat's fur stands up; slight camera shake.*
5. *Extreme close-up of the frightened cat: eyes widen, whiskers tremble, fur ruffles in a cold wind, frost sparkles.*
6. *The bony hand with the gold ring descends slowly and its fingers close around the glowing golden link; the link flickers.*
7. *Camera pulls back and rises: the golden chain breaks apart and hundreds of golden links and sparks burst outward from the oak across the night sky.*

## Сборка

Семь клипов по порядку, жёсткие срезы; между шотами 6 и 7 — 0,4 с чёрного. Титр «Златая цепь» ставится поверх замершего последнего кадра (текст в генерации не просим: модели его искажают).

## Результат

Папка `zlataya_cep/promo/teaser30/` — концепты `zc_teaser_K*.jpg` и (после генерации) клипы. Видео в git не кладётся.
