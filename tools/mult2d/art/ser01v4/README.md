# Серия 1, четвёртая редакция — цветовой сценарий и стайл-фреймы

Сценарий — `zlataya_cep/docs/51_ser01_v4_plan.md`. Нарисовано в ChatGPT (октябрь 2026), один диалог на все четыре картинки,
референс — лист героев (модельные листы `pelageya`, `proshka`, `potap`, `yosha`, `tishka`, `zvenyshko` в одной картинке).
PNG оставлены как отдал ChatGPT (1024×1536, 2:3; кадр 9:16 — центральная часть).

| Файл | Что |
|---|---|
| `colorscript.png` | цветовой сценарий: 11 миниатюр по сценам 1–11 таблицы раздела 2 сценария |
| `sf_a_trevoga.png` | стайл-фрейм A «Учебная тревога»: сосна в разрезе, провалы героев, Пелагея спокойно ждёт внизу |
| `sf_b_teatr.png` | стайл-фрейм B «Теневой театр»: силуэты на стене, чужая тень Кощея из окна в инее |
| `sf_c_tishina.png` | стайл-фрейм C «Тихая тревога»: патруль в корнях, Пелагея «тсс», тень и вороны наверху |

**Эталон материала — `sf_a_trevoga.png`.** Первый вариант кадра A вышел «живописью»: объёмное дерево, свет лучами,
много мелочей. Его отбросили. Помог второй промпт, его и нужно давать для каждого нового кадра и фона:

> Redo it as a FLAT GRAPHIC CUT-PAPER COLLAGE: every object is cut from 1–3 flat colors of matte construction paper and felt,
> no rendered wood grain (planks are flat strips of paper with a single darker stripe), no gradients except soft shadows
> between paper layers, light is shown by flat lighter paper shapes (a warm cone of lamplight is a translucent paper shape).
> Halve the number of props. Background as 3–4 big flat layers.

Начало диалога (арт-дирекшен сериала, отправляется вместе с листом героев):

> ART DIRECTION FOR THE WHOLE SERIES: everything in every frame — backgrounds, props, characters, magic — is made in ONE
> technique: flat cut-out paper and felt, like a Soviet cut-out animation (Norstein's "The Fox and the Hare") crossed with
> Cartoon Saloon's graphic folk-art design. Large simple flat shapes, visible paper/felt grain, slightly irregular hand-cut
> edges, soft drop shadows between paper layers, folk ornament only along the edges of shapes. Max 6–8 colors per scene.
> Backgrounds calmer and less contrasted than the characters; no painterly rendering, no 3D, no photorealism, no tiny clutter,
> no white sticker outlines around characters; characters are lit by the scene's light and stand on a soft contact shadow.

Каждый кадр: «same 2:3 vertical, keep all important action inside the central 9:16 area, leave the bottom 15% calm for
subtitles, no text».

**Замечания к кадрам** (учесть в анимации):
- цветовой сценарий нарисован живописнее эталона — по нему берётся только свет и цвет сцен;
- B: Пелагея улыбается в камеру, а по сюжету она одна заметила чужую тень — в анимации ей нужен встревоженный взгляд на окно;
- C: герои теплее, чем «почти монохром» сценария, — так их лучше видно; это решение оставлено.

## Раскадровка — `sb/`

`sb1.png … sb8.png` — 48 панелей (по 6 на листе, сетка 3×2, номер панели в углу), тот же диалог ChatGPT. Формат листа в промпте:
«one 2:3 portrait image containing 6 vertical 9:16 panels in a 3-columns × 2-rows grid, separated by plain cream gutters, panel
number small in the top-left corner of each panel, no other text, no speech bubbles». Панели нарезает `tools/mult2d/animatic.py`
(ширины панелей в строке бывают разными — столбцы ищутся отдельно в каждой строке). Номера панелей — как в таблице планов
`SHOTS` в `animatic.py`; сцены — по разделу 3 сценария.

## Чистовой арт серии (тот же диалог ChatGPT, эталонный материал)

| Где | Что |
|---|---|
| `art/bg/v4_*.png` | пустые фоны-картины 1024×1536: `razrez` (сосна в разрезе), `cherdak`, `lestnica`, `dver`, `krysha`, `gorizont`, `komnata`, `stena` (стена теневого театра), `korni`, `tropa`, `skala` |
| `art/props4/sheet.png` | реквизит: Ревун, гамак, блок, ведро, фонарь, шлем с фонариком, секундомер, свисток, журнал, лупа, ножницы, мёд, подушка, кукла Кощея с языком, карта, кроватка |
| `art/sil4/sheet.png` | силуэты теневого театра (Райнигер): дуб с цепью, Кот идёт / Кот замер, Кощей идёт / тянется, звенья, искры, вороны ×3 |
| `art/koschei4/sheet.png` | Кощей в лаковой бумаге: в рост с куклой, голова, рука с куклой в инее |

Промпт фона: «BACKGROUND PLATE … Same approved flat cut-paper and felt material as style frame A (flat matte paper shapes, 1–3 colors per
object, soft shadows between paper layers, no rendered textures, no clutter). EMPTY SET: no characters at all, no text. Tall 2:3
portrait.» + описание места и высоты линии пола. Нарезка — `cut.py` (`art/parts.json`); у кукол героев `cut.py` теперь срезает
белую кайму-«наклейку» по краю (`defringe`).
