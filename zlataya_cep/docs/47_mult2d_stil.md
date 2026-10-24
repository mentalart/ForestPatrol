# «Златая цепь» — 2D-мультсериал: стиль, проба и конвейер

Мультсериал по игре в 2D-моушн-дизайне. Сценарий сезона и серии 1 — `46_multserial.md`: формат 9:16, безопасные поля ВК Клипов,
крючок, титр и карточка. 3D-модели игры в 2D-версии не используются. От героев взяты только силуэт, цвет и узнаваемые вещи,
всё остальное нарисовано заново. Код съёмки — `tools/mult2d/` (`README.md` там), в игру он не входит.

Выбор стиля (октябрь 2026): из четырёх вариантов (А «Лубок-поп», Б «Палехская ночь», В «Книжка Пелагеи», Г «Хохлома-морф»)
выбрана **смесь В + Б + Г**.

## 1. Стиль: три регистра одного мира

| Регистр | Где | Материал | Движение |
|---|---|---|---|
| **Бумага — «Книжка Пелагеи»** (основа) | вся история, дни и ночи миров | яркая матовая цветная бумага с фактурой и волокнами, светлый срез по краю, мягкая тень между слоями | мир раскрывается из сгиба страницы, как книжка-раскладушка, с упругим доводом; герои — куклы-перекладки «на двойках» (12 поз в секунду); смена сцены — перелистывание страницы |
| **Лак — «Палехская ночь»** | Кощей, его чары, разрыв цепи, ночная магия | чёрный лак, золотые линии со свечением, драгоценные цвета, золотая орнаментная рамка кадра | линии прорисовываются в кадре, звёзды мерцают, удар — золотая вспышка и ударная волна; вход — «лаковая капля» с золотым кольцом-орнаментом |
| **Хохлома — «Хохлома-морф»** | заставка, титр, «Ранее…», карточка следующей серии | золотой фон, киноварь, сажа, травка; плотные формы без контура, зерно | завитки прорастают, ягоды выпрыгивают, буквы падают на струны, вход — золотой круг из Звенышка |

**Сквозная нить.** Звенышко тянет за собой золотую нить, которая сшивает планы и регистры: бумажная искра → золотая линия на лаке
→ золотой круг титра.

### Палитры

- **Бумага:** страница `#FBF3E2`, мох `#3E8E5E`/`#2D6B4A`/`#5DB37A`, рыжий картон `#E8743B`, доски штаба `#C8652F`…`#D47335`,
  сирень `#A77BD8`/`#8D62C2`/`#C7A6EC`, ночная синь `#1A2148`→`#3B4C8E`, золотая нить `#F0C04A`.
- **Лак:** лак `#0E0A10`, слива `#4B1F52`, сусальное золото `#D9A93A`/`#E8B84A`, изумруд `#1E5A48`, кармин `#B3203A`, ледяной `#9FF6FF` (глаза и чары Кощея).
- **Хохлома:** золото `#F5B82E`, киноварь `#E23B2E`, сажа `#171012`, травка `#3FA34D`, сливки `#FFF1D6`.
- **Миры** — по арт-библии игры (`02_art_bible.md`): у каждого мира своя бумага. Лес — сине-зелёный мох, Китеж — бирюза и известняк,
  небо — сирень, Смородина — угольная и охристая бумага с оранжевым, Буян — песок и бирюза.

### Герои: язык форм

| Герой | Форма | Узнаваемые вещи (из игры) |
|---|---|---|
| Прошка | треугольник | рыжий лисёнок, светлая грудка, тёмные «носочки», хвост из трёх пучков с белым кончиком, зелёный платок, рогатка |
| Потап | круг | бурый медвежонок, белая косоворотка с красной вышивкой, красный кушак, лапти |
| Пелагея | яйцо | сиреневая совушка, кремовый лицевой диск, огромные золотые глаза, кокошник-обруч с тремя красными бусинами, тетрадка |
| Йоша | колючий шарик | бирюзовые иглы, кремовая мордочка, розовые щёки, деревянный ковшик |
| Тишка | запятая с хвостом | рыжий бельчонок-малыш, ночной колпак, подушка, сонные глаза |
| Звенышко | кольцо | живое золотое звено. **Отличие от игры:** в 2D у него есть глаза в просвете кольца — детям нужно лицо в крупных планах |
| Кот Учёный | — | серый полосатый, кафтан учёного, круглые очки, свиток |
| Кузьма | — | широкий добрый кузнец, седая борода, кожаный фартук, молот |
| Кощей | игла | очень высокий и тонкий, костяное лицо, ледяные глаза, высокая корона, сливовый наряд с золотом; холодный и грустный, не страшный |

Правила кадра — из `40_kino_pravila.md`: говорящий развёрнут лицом к зрителю, в сцене не меньше трёх крупностей, шутка каждые 10–15 с,
лица — в верхних двух третях кадра.

## 2. Проба стиля (20 с)

`tools/mult2d/ep_proba.js` — начало серии 1 (планы 1-1…1-11, 4-1, 5-4…5-8 из `46_multserial.md`), все три регистра:

| Время | План | Регистр |
|---|---|---|
| 0:00 | ОБЩ: Лукоморье раскрывается из книжки — море, холмы, дуб, цепь по спирали, луна на нитке. Кот: «У Лукоморья дуб зелёный…» | бумага |
| 0:04 | КР: лаковая капля, Кощей открывает глаза. «Довольно.» | лак |
| 0:06 | СР: золотой дуб, рука Кощея сжимает цепь, молнии, звенья раскаляются | лак |
| 0:08 | разрыв: вспышка, ударная волна, звенья фейерверком, листья опадают; одно звено уносится вверх. Кот: «Разлетелись звенья по свету —» | лак |
| 0:10,6 | перелистывание → СР: штаб ночью, Пелагея пишет сказку, в окне искра. «Ой… летит… к нам!» | бумага |
| 0:12,8 | Звенышко влетает по золотой нити и ныряет в тетрадку; окно в инее, за ним ледяные глаза Кощея | бумага + лак |
| 0:14,6 | КР: Звенышко выпрыгивает из тетрадки. «Дзинь-дзинь! За мной — бегом!» | бумага |
| 0:16,9 | золотой круг → титр «ЗЛАТАЯ ЦЕПЬ · Серия 1 · Звенышко» | хохлома |

**Проба v2 (24,8 с):** герои и декорации — арт ChatGPT (`tools/mult2d/art/`, нарезка `cut.py`, куклы `pup.js`), Кощей в крупном плане —
бюст из модельного листа, голоса — VoiceStudio (`tools/mult2d/voice/`), рот — Rhubarb Lip Sync. На экране появился Кот-рассказчик,
раскадровка растянута под длину реплик. Музыка и шумы — синтез (`audio_proba.py`), под голосом музыка приглушается.
Дальше нужно: бюст Кощея в высоком разрешении (из листа он мелкий) и больше шарниров у кукол (локти, моргание веками, хвосты).

**Серия 1 «Звенышко» (2:28, 40 планов)** — `tools/mult2d/ep_ser01.js` по таблице раздела 5 `46_multserial.md`: все три регистра,
куклы пятерых героев патруля и Колобка, злодеи миров — целыми фигурами из модельных листов, 39 реплик в голосах VoxCPM2, звук — синтез
(`audio_ser01.py`) по меткам планов. План растягивается под длину реплики, поэтому перезапись голоса не ломает монтаж.

## 3. Конвейер серии

1. **Раскадровка 9:16** по сценарию серии (`46_multserial.md`), аниматик.
2. **Модельные листы в ChatGPT** (раздел 4) — в выбранном стиле, по одному на героя.
3. **Детали для перекладки** — листы деталей на белом фоне. Снять фон (rembg), разложить детали по `tools/mult2d/art/<герой>/`.
4. **Кукла** — детали с шарнирами в `cast.js`. Рисованные кодом куклы пробы заменяются картинками деталей, позы и шарниры остаются прежними.
5. **Голоса в VoiceStudio** (раздел 5) → `tools/mult2d/voice/<серия>/<id>.wav`; рот двигается по звуку (Rhubarb Lip Sync, 8 форм A–H).
6. **Анимация** — файл серии `ep_<серия>.js`: планы, переходы, субтитры.
7. **Съёмка и склейка**: `shoot.js` → `encode.sh` (24 к/с, 1080×1920, H.264 + AAC).

## 4. Промпты для ChatGPT (изображения)

Порядок: сначала модельный лист героя, его утверждение, затем лист деталей **в том же диалоге**, чтобы герой не менялся.
Фон — чистый белый (для rembg), без надписей. Формат — 1:1 или 3:2.

**Стиль «бумага»** (приставка к каждому промпту):

> Flat 2D cut-paper puppet illustration for a children's animated series based on Russian fairy tales and Pushkin's Lukomorye.
> Every shape is cut from bright matte colored paper with visible paper grain and soft fibers, slightly irregular hand-cut edges
> with a thin lighter cut rim, and small soft drop shadows between paper layers, lit from the top-left like a pop-up book.
> No outlines, no 3D rendering, no photorealism, no gradients except paper shadows. Simple bold geometric shapes, a big readable
> silhouette, large expressive eyes, warm and funny, for kids 7–11. Palette: page cream #FBF3E2, moss green #3E8E5E, ginger
> cardboard #E8743B, lilac #A77BD8, night blue #24305E, gold thread #F0C04A.

**Стиль «лак»** (Кощей и его чары):

> Flat 2D illustration in the style of a Russian Palekh lacquer miniature reimagined as cut paper for a children's animated series:
> deep black lacquer background, thin glowing gold linework along every edge, jewel colors (plum #4B1F52, emerald #1E5A48,
> carmine #B3203A, icy turquoise #9FF6FF), fine gold folk ornament, an ornamental gold border. Elegant, cold and sad, never scary.

**Модельный лист героя** (после приставки):

> Character model sheet of {ГЕРОЙ}: front view, three-quarter view, side view and back view in a row, plus three emotions
> (happy, surprised, sad) as head close-ups, on a plain white background, consistent proportions, no text.

**Лист деталей для перекладки** (в том же диалоге):

> The same character as separate cut-paper parts for cut-out animation, laid out with generous spacing on a pure white background,
> nothing overlapping, no text: head without eyes and mouth; torso; each arm (or wing) in two pieces; each leg with foot; tail;
> eyes: open, half-closed, closed, looking left, looking right; eight mouth shapes for lip sync: closed (M, B, P), slightly open,
> open (E), wide open (A), rounded (O), puckered (U), teeth on lip (F, V), tongue up (L). Same paper style, same colors.

**{ГЕРОЙ}** — описания:

- **Прошка:** a slim tall young fox cub inventor: ginger-orange paper fur, cream chest and muzzle, dark brown paws like socks, a big bushy tail of three tufts with a white tip, a green neckerchief, a brown belt with a small gold buckle, a wooden slingshot with a red band; a triangle-shaped head, cheeky grin.
- **Потап:** a stout round young brown bear cub standing upright: a white kosovorotka shirt with red cross-stitch embroidery, a red sash with tassels, linen leg wraps and bast shoes (lapti), huge soft paws, small round ears, kind sleepy eyes; a circle-shaped body.
- **Пелагея:** an egg-shaped little owl storyteller: lilac-violet paper plumage, a cream heart-shaped facial disc, huge round golden eyes, small ear tufts, wing-arms, a thin golden kokoshnik hoop with three red beads, a small handmade notebook under her wing; shy and dreamy.
- **Йоша:** a tiny round baby hedgehog: zigzag turquoise paper spines, a cream muzzle with rosy cheeks, tiny paws, a small wooden ladle (kovshik) on a strap; proud "I can do it myself" pose.
- **Тишка:** a tiny ginger baby squirrel with a cream belly, a huge fluffy curled tail, big sleepy eyes, a blue nightcap with a pompom, hugging a small pillow.
- **Звенышко:** a single living golden chain link the size of a fist, floating, with two big friendly eyes and a small smile inside the ring's opening, a warm glow and a trail of golden thread behind it.
- **Кот Учёный:** a tall wise grey tabby cat walking upright in a long scholar's kaftan with folk ornament, round spectacles, an open scroll, a thin golden chain over his shoulder, a storyteller's gesture.
- **Кузьма:** a broad kind old blacksmith with a big grey beard tucked into a leather apron, rolled-up sleeves, a heavy hammer on his shoulder.
- **Кощей** (стиль «лак»): Koschei the Deathless — a very tall, skeletally thin sorcerer-tsar with a long bone-pale face, glowing icy-turquoise eyes, a narrow grey beard, a tall spiked gold crown with carmine jewels, a high plum collar with gold ornament, long bony fingers; lonely and cold, sad rather than scary.

**Фоны** — слоями, каждый слой отдельной картинкой на белом фоне: дальний, средний и передний план. Пример:

> {приставка «бумага»} Pop-up book scenery layer, no characters, on a pure white background: {СЛОЙ}. Wide horizontal strip, flat bottom edge as if standing up from the fold of a book page.

Слои серии 1: море волнами, дальние холмы, дуб Лукоморья с золотой цепью по спирали, трава и цветы у сгиба страницы,
луна на нитке, стена штаба из досок, круглое окно, стол, лампа, гирлянда флажков, тетрадка Пелагеи.

## 5. Голоса (VoiceStudio)

Голоса для сериала новые, голоса из игры не используются. С серии 1 — движок VoxCPM2: тембр по описанию брифа (английский текст в `tools/mult2d/voice/profiles/vox.json`), выбранный дубль сохраняется клон-профилем, реплики пишутся с него (`tools/mult2d/voice/README.md`). Запись — WAV 48 кГц моно, одна реплика — один файл `ser01_NNN.wav` (id как в `46_multserial.md`, раздел «Голоса»).

| Голос | Бриф | Проба |
|---|---|---|
| Кот Учёный (рассказчик) | бархатный баритон, около 50 лет, тёплый, чуть хрипловатый; сказовый распев с озорством | «У Лукоморья дуб зелёный, златая цепь на дубе том…» |
| Прошка | звонкий мальчишеский, 10–11 лет; быстро, уверенно, с усмешкой | «Хэк! Сказки — сказками, а техника — вещь!» |
| Потап | низкий для ребёнка, гулкий, 10 лет; медленно, добродушно | «Держу-держу. Хо-хо!» |
| Пелагея | тихий девичий, 9 лет; шёпот с придыханием, паузы | «(шёпотом) Ой… летит… к нам!» |
| Йоша | самый высокий и звонкий, 6–7 лет; задорно, с напором | «Сам вырастил! Я сам!» |
| Тишка | малыш 4–5 лет, сонный, тянет гласные | «Сказку! Кто мне сказку на ночь?» |
| Звенышко | высокий звенящий голос без возраста; после записи — лёгкий металлический призвук | «Дзинь-дзинь! За мной — бегом!» |
| Кузьма | густой бас, около 45 лет, рубленые фразы | «Руки есть. Голова — посмотрим.» |
| Кощей | сухой, тихий, усталый, 60+; холодно и грустно, не кричит, лёгкое эхо | «Довольно.» · «Сказок больше не бывать.» |

Реплики пробы: Кот — «У Лукоморья дуб зелёный, златая цепь на дубе том…», «Разлетелись звенья по свету —»; Кощей — «Довольно.»;
Пелагея — «(шёпотом) Ой… летит… к нам!»; Звенышко — «Дзинь-дзинь! За мной — бегом!».

## 6. Инструменты

Проба написана на Canvas 2D без библиотек: кадр — чистая функция времени, съёмка покадровая через Playwright, как в
`tools/serial/` и трейлере. Отбор открытых инструментов для полных серий:

| Инструмент | Зачем | Решение |
|---|---|---|
| Rhubarb Lip Sync (MIT) | формы рта по записи голоса, фонетический распознаватель для русской речи | берём с первыми голосами |
| rembg (MIT) | снять фон с артов ChatGPT | берём с первым артом |
| vtracer (MIT) | растр → вектор, если понадобятся векторные детали | по необходимости |
| Pixi.js (MIT) + GSAP | WebGL-фильтры (искажение бумаги и воды, размытие глубины) и редактор кривых | если Canvas 2D перестанет хватать |
| Motion Canvas (MIT), Theatre.js | визуальная правка тайминга и камеры | запасной вариант |
| Remotion | своя съёмка уже есть, лицензия платная для компаний от 4 человек | не берём |
| Lottie, Rive, Spine | нужен After Effects или закрытый редактор; Spine платный | не берём |
