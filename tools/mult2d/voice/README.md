# Голоса 2D-мультсериала (VoiceStudio)

Бриф голосов — `zlataya_cep/docs/47_mult2d_stil.md`, раздел 5. Голоса созданы в VoiceStudio 0.5.6 (движок k2-fsa/OmniVoice,
GPU) в октябре 2026, голоса игры не использовались. Запись — WAV 48 кГц моно 16 бит, пик −1 dBFS, тишина по краям подрезана.

- `profiles/<голос>.ovsvoice` — экспорт профилей VoiceStudio (образец голоса + настройки). На другом ПК: VoiceStudio → импорт
  персоны (`POST /personas/import`), голос получится тем же.
- `proba/` — реплики пробы стиля (`ep_proba.js`).
- `ser01/` — серия 1 «Звенышко»: `lines.json` (реплики, герой, id реплики игры в `src`, манера в `instruct`, длина записи в `dur`),
  `ser01_NNN.wav`, рот — `lips/`.

## Голоса сериала — VoxCPM2 (с серии 1, октябрь 2026)

Для серий голоса сделаны заново на движке VoxCPM2 в VoiceStudio 0.5.6: тембр задаётся описанием словами (бриф раздела 5
`47_mult2d_stil.md`), а не атрибутами OmniVoice. Инструменты — `tools/mult2d/voice_rec.py` и `voice_post.py`.

1. **Дизайн.** По описанию и пробной реплике — 6 дублей (`voice_rec.py design <голос> 6`). Сид в VoxCPM2 не держится: каждый дубль —
   новый тембр. Дубль выбирается на слух: страница с плеером и отметками на все дубли (распознавание и высота голоса — подсказкой рядом),
   выбор сохраняется профилем.
2. **Профиль.** Выбранный дубль сохраняется клон-профилем «ЗЦ сериал · …» (`voice_rec.py profile`), экспорт — `profiles/vox_<голос>.ovsvoice`,
   описания и id — `profiles/vox.json`. На другом ПК — импорт персоны в VoiceStudio и новый id в `vox.json`.
3. **Реплики** пишутся клонированием с профиля: тембр один на всю серию. 2–3 дубля, лучший — по распознаванию. Реплики с `instruct`
   (шёпот, пение, смех, «тихо») идут в управляемом режиме VoxCPM2: тембр от образца, манера — из описания.
4. **Обработка** (`voice_post.py`): Кощей — лёгкое эхо, Звенышко — короткое гребенчатое эхо (металлический призвук); тишина по краям
   подрезается, 48 кГц моно 16 бит, пик −1 dBFS.

| Голос | Профиль | Описание (instruct дизайна) | Высота, Гц |
|---|---|---|---|
| Кот Учёный | `d8988502` | A warm velvety male baritone, about fifty years old, slightly husky, a storyteller's sing-song fairy-tale delivery with playful mischief | 151 |
| Прошка | `c1fd7b9c` | A bright ringing voice of a ten-year-old boy, fast, confident and cheeky, speaking with a grin | 403 |
| Потап | `1fdeeb73` | A low booming voice of a ten-year-old boy, slow, good-natured and warm, a little clumsy | 168 |
| Пелагея | `cb0da8ed` | A quiet voice of a nine-year-old girl, a breathy shy whisper with little pauses | 236 |
| Йоша | `ffdaf445` | The highest ringing voice of a six-year-old boy, energetic and stubborn, full of pressure | 444 |
| Тишка | `b3b57506` | A sleepy voice of a tiny four-year-old child, drawling the vowels, cute and yawning | 421 |
| Звенышко | `4c386abf` | A high ringing bell-like voice of a magical creature without age, bright, light and joyful | 431 |
| Кузьма | `8fabf735` | A deep thick bass of a forty-five-year-old blacksmith, kind but terse, short chopped phrases | 254 |
| Кощей | `8d3cc645` | A dry, quiet, tired voice of an old man over sixty, cold and sad, slow, never shouting | 88 |
| Колобок | `4933e857` | A round cheerful bouncy voice of a little fairy-tale bun, high and sing-song, fast | 480 |

Кузьма в серии 1 не говорит, голос сделан на серию 2. Голоса выбраны на слух (страница выбора — 6 дублей дизайна на героя, октябрь 2026). Если тембр не тот — новый дубль
дизайна и `voice_rec.py profile`, затем перезапись реплик героя (`voice_rec.py rec ser01 3 <id,…>`).
Распознавание — самое долгое (около минуты на дубль), поэтому, если первый дубль разборчив, второй — последний.

## Голоса пробы — OmniVoice

В VoiceStudio: **Голос → Создать → Детали** (пол, возраст, высота, стиль) → «Сохранить как голосовой профиль». Тип профиля —
`design`: при сохранении VoiceStudio рендерит образец голоса с seed 42 и дальше клонирует тембр с него, поэтому голос задаётся
только атрибутами и одинаков на любом ПК с той же версией. Язык — Russian.

| Голос | Профиль в VoiceStudio | Атрибуты (instruct) | Обработка после записи |
|---|---|---|---|
| Кот Учёный | `ЗЦ мульт · Кот Учёный` (id `08bfc82c`) | `male, middle-aged, very low pitch` | — |
| Кощей | `ЗЦ мульт · Кощей` (id `9d4a6e88`) | `male, elderly, very low pitch` | лёгкое эхо: `aecho=0.8:0.55:110\|230:0.22\|0.12` |
| Пелагея | `ЗЦ мульт · Пелагея` (id `8698a038`) | `female, child, high pitch, whisper` | — |
| Звенышко | `ЗЦ мульт · Звенышко` (id `e893b10a`) | `female, child, very high pitch` | металлический призвук: `aecho=0.9:0.9:4\|7:0.16\|0.10` |

Атрибутов у OmniVoice немного: пол; возраст child / teenager / young adult / middle-aged / elderly; высота very low … very high;
стиль whisper. Остальное из брифа (бархат, хрипотца, распев, усталость) атрибутами не задаётся — темп ставится длительностью
реплики, характер выбирается сидом. `low pitch` давал Коту и Кощею 150–200 Гц, поэтому взят `very low pitch` (Кот ≈ 100 Гц,
Кощей ≈ 115 Гц). Фленджер на Звенышке делал слова неразборчивыми, оставлено только короткое гребенчатое эхо.

## Реплики пробы

Генерация — **Голос → Создать**, в списке «Голос» выбрать профиль (или `POST /generate`), с профилем, seed и длительностью из таблицы; остальные настройки по
умолчанию (guidance 2, denoise, эффект `broadcast`). Сид подбирался из 6–8 дублей: дубль проверялся распознаванием
(Whisper в VoiceStudio, `POST /transcribe`, `mode=reference`) и высотой голоса.

| Файл | Текст | Профиль | seed | duration, с | Длина, с |
|---|---|---|---|---|---|
| `kot_01.wav` | У Лукоморья дуб зелёный, златая цепь на дубе том… | Кот Учёный | 44 | 5.0 | 4.98 |
| `koschei_01.wav` | Довольно. | Кощей | 11 | 1.6 | 1.86 |
| `kot_02.wav` | Разлетелись звенья по свету — | Кот Учёный | 22 | 2.8 | 2.13 |
| `pelageya_01.wav` | Ой… летит… к нам! (шёпотом) | Пелагея | 55 | 3.0 | 3.11 |
| `zvenyshko_01.wav` | Дзинь-дзинь! За мной — бегом! | Звенышко | 22 | 2.2 | 2.14 |

Обработка (ffmpeg из VoiceStudio): `[эффект голоса,]silenceremove` с обоих краёв (порог −50 dB) → `aresample=48000` → моно,
16 бит → нормализация пика до −1 dBFS.

**Через API.** Текст с кириллицей передавать файлом в UTF-8 (`-F "text=<line.txt"`): в аргументах curl под Windows
кириллица портится, и модель читает тарабарщину.

```sh
curl -s http://127.0.0.1:3900/generate -F "text=<line.txt" -F language=Russian \
  -F profile_id=08bfc82c -F seed=44 -F duration=5.0 -o raw.wav
```

## Что учесть дальше

- Whisper плохо распознаёт шёпот: у Пелагеи разборчивы 5 дублей из 8, остальные — бормотание. Проверять на слух.
- «Дзинь» Whisper слышит как «Зинь» — это особенность распознавания, на слух слово верное.
- Остальные голоса сериала (Прошка, Потап, Йоша, Тишка, Кузьма) ещё не созданы. Атрибуты по брифу: Прошка — `male, child, high pitch`,
  Потап — `male, child, low pitch`, Йоша — `male, child, very high pitch`, Тишка — `male, child, high pitch` + большая длительность,
  Кузьма — `male, middle-aged, very low pitch`.
