# Карта проекта «Златая цепь» — с чего начинать новой сессии

Зачем: прототип — 11 тыс. строк (~1,7 МБ, части `proto/`), модули релиза — ещё ~2 МБ; прочитать их «чтобы понять» — это сотни тысяч
токенов. Эта карта и `tools/map.py` дают то же за несколько сотен строк. Порядок работы:

1. Прочитать эту шапку (до таблиц). Таблицы ниже — справочник: смотреть нужную строку, не читать подряд.
2. Найти место: `python3 tools/map.py where <уровень|имя|текст>` — например `where 2-1`, `where openMap`, `where 'Жар-птица'`.
   Печатает файл:строку, для функций прототипа — часть `proto/` и диапазон тела в ней, для уровня — его модули, замены и ботов.
3. Читать только этот диапазон: `sed -n 'A,Bp' файл | cut -c1-400` (в коде много строк по 300–1000 символов) или Read с offset/limit.
4. Релизный `zlataya_cep_final06.html` не читать никогда — это сборка (25 МБ, внутри озвучка в base64). В git его нет: в новой сессии
   сначала `python3 zlataya_cep/build/build_final.py`; после слияния в `main` его выкладывает `release.yml` (Pages + Releases, 50 версий).
5. После добавления уровня, модуля, раздела `rep_*.py` или документа — `python3 tools/map.py` (обновит таблицы ниже).

## Как устроено
- **Прототип** (Three r128) — части `proto/` (таблица «Части прототипа» ниже), склеенные по `proto/parts.txt` в `index.html`
  (`python3 tools/proto.py`; сборка пишет его сама, в git его нет): `head.html` — разметка, стили и комментарий об отличиях от сценария;
  `engine/` — движок по разделам (герои, враги, мороки, камера, HUD, ролики; `10_levels_flow_menu.js` — `LEVELS`, поток игры, меню,
  `window.ZC`); `levels/` — по файлу на уровень (`1-1.js` … `5-B2.js`, `p_prologue.js`, `luko.js`, `epi.js`, `zastava.js`) и общий код
  мира перед его уровнями (`w2_common.js` — вода и гусли, `w3_common.js` — свет и перо…). Правка уровня — читать один его файл.
  Номер строки склейки (ошибка, старая ссылка) → часть: `python3 tools/proto.py line N`. Новая часть — строка в `proto/parts.txt`.
- **Релиз final06** собирает `python3 zlataya_cep/build/build_final.py` → `zlataya_cep/zlataya_cep_final06.html`:
  прототип + `fin_early.js` (до геометрии) + `late_*.js` (по имени, перед запуском) + `rep_*.py` (точечные текстовые замены
  в коде прототипа: не нашлась строка — сборка падает) + озвучка `voice/` (base64). Модули — в одной области видимости с
  прототипом: функции прототипа оборачивают присваиванием (`step=function(dt){_step(dt);…}`, `build5B2=function(){…}`),
  но не объявляют функций с теми же именами (сборка проверяет). Части уровня, закрытые в его функции, модулю отдают через
  замену в `rep_30_<уровень>.py` (`W.epiL={…}` — `rep_30_epi.py`, `W.gor4L={…}` — `rep_30_gor4b.py`).
- **final07 (WebGPU) снят** — актуален final06. `build/gpu/`, `build_final.py --gpu`, `regress_list_final07.txt`, `tfin_gpu`/`tfin_post`
  заморожены (`docs/18_webgpu.md` — для истории): не собирать, шейдеры для WebGPU не переводить, ботов final07 не гонять.
- **Боты** — `tools/tests/` (`README.md` там): шаги через `//@@ [shot=имя.png] [wait=мс]`; `tools/tests/run_one.sh бот [html]`;
  набор — `BOTS="a b" JOBS=3 tools/tests/regress.sh html`; кадры с полным качеством — `URLQ='&hq=1'`. Вывод — `tools/tests/out/`,
  кадры — `tools/tests/shots/`. Какие боты затронуты — `python3 tools/tests/affected.py`; весь набор гоняет CI на PR (8 машин, итог — `bots`; полный регресс — тоже CI, локально не гонять), локально — только
  новые и изменённые боты (`BOTS="…" tools/tests/regress.sh zlataya_cep/zlataya_cep_final06.html`).

## Движок: имена, которые ищут чаще всего (`where <имя>` покажет, где)
- Состояние: `G` (игра: `G.cine`, `G.solo`, `G.soloPi`, `G.flags`, `G.done`, `G.time`), `W` (текущий уровень: `W.levelId`,
  `W.flags`, `W.group`, `W.updates`, `W.custom`, `W.timers`, `W.anims`, `W.enemies`, `W.objectives`, `W.camZones`, `W.camFn`,
  `W.prompts`, `W.pauseLine`), `players[pi]`, `HERO.proshka|potap|pelageya|yosha`, `HEROES`, `active(pi)`, `heroHeight(h)`.
- Уровни: `LEVELS`, `LV(id)`, `startFrom(i)`, `loadLevel(i)`, `goLevel(id)`, `completeLevel()`, `finishLevel()`.
- Постройка: `addMesh(geo,mat,x,y,z,parent)`, `part()`, `box()`, `colBox()`, `W.cyls` (цилиндры-коллизии), `M()` (Lambert),
  `MB()` (Basic), `makeFoe(kind,x,z,o)` (`FOE` — виды), `make<Персонаж>()` (`makeKoschei`, `makeTishka`, `makeKot`…).
- Ход уровня: `W.updates.push(dt=>…)`, `later(t,fn)`, `anim(dur,k=>…)`, `O(text,done,targets)` — задача в рамке,
  `prompt(pi,action,atFn,condFn,note)` — кнопка над героем, `tip(pi,html,dur)`, `banner(text,color,dur,sub)`,
  `say(who,text,dur)` / `bark(h,who,text)` — реплика (с озвучкой, если есть в `voice/lines.json`), `floatText(pos,text,col)`.
- Ввод: `tap(pi,'jump'|'attack'|'skill'|'guard'|'swap'|'item'|'call'|'roll')`, `btn(pi,…)`, `K(pi,action)` — значок кнопки.
  Одиночный режим: `G.solo`, `soloSwap()`, `setSolo()`; смена героя оставляет прежнего на месте (`h.following=false`).
- Ролики: `play({dur,fov,camK,shots:[shot(t,pos,look,pos2,look2,dur)],says:[[t,dur,who,text,narr]],events:[{t,fn}],tick,end})`;
  пропуск — `S.skip()` выполняет все события. Камера уровня — `W.camZones` (`{x,z,r,camActive}`) или `W.camFn()`.
- Релиз (модули): `FIN` (настройки, `FIN.vox` — озвучка, `FIN.occ` — прозрачные стены), `FX.*` (искры, конфетти),
  `CINE.*` (тряска, замедление, настроение), `ACT.emote(h,type)` (эмоции героев), `CINE.CD()` (режиссура роликов, `late_86`).

## Типовые задачи
- **Правка уровня в релизе** — свой модуль `late_NN_*.js` (свободный номер — проверить `main` и чужие ветки) или замена в
  свой файл замен `rep_NN_<уровень>.py` (по файлу на уровень, иначе правка потянет лишние проверки); строка в `tools/tests/affected_map.txt` (`модуль  @level:ID боты`);
  бот в `tools/tests/bots/` (бот уровня находится сам по `LV('ID')`). Прототип меняют только для общей логики (карта-рушник,
  движок); боты всё равно гоняются на релизе — прототип только исходник релиза, отдельно его не проверяют.
- **Новая озвученная реплика** — текст в игре строкой `'…'`; запись в `zlataya_cep/build/voice/lines.json`
  (`{id:'<уровень>_NNN',lv,who,text,tts,max}`, голос — `cast[who].voice_id`), генерация Eleven v4 через Higgsfield, ссылка в `url`,
  `node tools/voice/fetch.js --only id,…`, пересборка (проверит, что текст есть в игре). Подробно — `docs/09_final06.md`.
- **Бот** — на общих помощниках `U.*` (`helpers.js`: шаг, щит, бой, ролики, смена героя, ракушки), к месту — `ZC.FIN.warp(n|'имя')`, кадры ролика —
  `node tools/tests/cine_frames.js <уровень>`; иначе копировать похожий (`where tfin_…` / таблица ниже): `ZC.startFrom(ZC.LV('id'))`, `ZC.G.manual=true`,
  `ZC.tick(n)`, `ZC.skip()`, `ZC.press('KeyF')`, `ZC.hold(k,on)`, помощники `U.walkTo/until/tap/act`; в конце строка
  `'… ok'` / `'FAIL …'`. Записи озвучки декодируются между шагами — ролик с голосом начинать в следующем шаге.

## Экономия токенов (то же коротко — в CLAUDE.md)
- Сначала карта и `where`, потом точечное чтение (файл уровня в `proto/levels/` — можно целиком, если он нужен весь); склейку `index.html`, модули и `lines.json` целиком не читать; вывод команд резать
  (`| cut -c1-300`, `| head`). Не запускать подагентов «изучить проект» — они начинают с нуля и читают всё заново.
- Кадры (`shots/*.png`) смотреть по 2–3 ключевых; для невизуальных правок — без кадров. Вывод ботов — последняя строка и ошибки.
- Долгие проверки — в фоне, не опрашивать каждую минуту; по одному боту — только упавшие.

<!-- map:auto:start -->
<!-- Эта часть пишется командой `python3 tools/map.py` — руками не править. Номеров строк здесь нет нарочно (менялись бы
     с каждой правкой и давали конфликты при слиянии веток): строки — `python3 tools/map.py where <уровень|имя|раздел>`. -->

## Уровни (`LEVELS` в proto/engine/10_levels_flow_menu.js)

| id | уровень | функция · файл в proto/ | модули релиза | ботов | боты |
|---|---|---|---|---|---|
| `p` | Пролог «Звенышко» | `buildPrologue()` · `levels/p_prologue.js` | late_75_kids_w1, late_96_prolog_scooter, late_96b_prolog_night | 8 | tfin_cine tfin_companion_p tfin_fadesplit tfin_kids1 tfin_prolog_night tfin_scooter tfin_… |
| `luko` | Лукоморье | `buildLukomorye()` · `levels/luko_1_scene.js` | late_50_save, late_74_kids_start, late_95_dev | 13 | tfin_art tfin_cast tfin_companion_luko tfin_devluko tfin_episolo tfin_kids1 tfin_luko thw… |
| `1-1` | 1-1 · Избушка, повернись | `build11()` · `levels/1-1.js` | late_75_kids_w1, late_76_kids_fight, late_99n_yaga11 | 29 | t11 tfin_art tfin_cam tfin_companion tfin_companion_11 tfin_dev tfin_foecast tfin_foeidle… |
| `1-2` | 1-2 · Кикиморино болото | `build12()` · `levels/1-2.js` | late_75_kids_w1, late_76_kids_fight | 2 | tfin_companion_12 tsospot |
| `1-3` | 1-3 · Колобок | `build13()` · `levels/1-3.js` | late_75_kids_w1, late_99_kolobok_dance | 3 | tfin_companion_13 tfin_kids1 tfin_kids2 |
| `1-4` | 1-4 · Леший водит | `build14()` · `levels/1-4.js` | late_75_kids_w1, late_99b_kidnap14 | 3 | tfin_companion_14 tfin_kidnap14 tfin_kids2 |
| `1-5` | 1-5 · Кикиморина прялка | `build15()` · `levels/1-5.js` | late_75_kids_w1 | 2 | tfin_companion_15 thub2 |
| `1-B` | 1-Б · Леший-Путаник | `build1B()` · `levels/1-B.js` | late_75_kids_w1, late_99b_kidnap14, late_99x_k1b_leshy, late_99y_k1b_fx, late_99z_k1b_hands, late_99za_k1b_hide, late_99zb_k1b_hoorovod, late_99zc_k1b_cine, late_99zd_k1b_help | 4 | tfin_companion_1b tfin_k1b3solo tfin_post tsospot |
| `2-1` | 2-1 · Гусли Садко | `build21()` · `levels/2-1.js` | late_75_kids_w1, late_76_kids_fight, late_99c_kitezh_sea, late_99d_kitezh_water, late_99e_k21, late_99e_k21_p2_market, late_99e_k21_p3_scenes, late_99e_k21_p4_hall, late_99k_kitezh_foes, late_99l_kitezh_magic_water, late_99m_k21_hermit | 15 | t21 t21x tfin_art tfin_companion_21 tfin_downswap tfin_fadebatch tfin_k21 tfin_k21foes tf… |
| `2-2` | 2-2 · Чудо-юдо Рыба-кит | `build22()` · `levels/2-2.js` | late_99c_kitezh_sea, late_99d_kitezh_water, late_99f_k22, late_99f_k22_p2_stove, late_99f_k22_p3_lullaby, late_99f_k22_p4_tasks, late_99l_kitezh_magic_water | 9 | t22d t22shot tfin_companion_22 tfin_k22 tfin_k22hint tfin_k22solo tfin_kids2 tfin_occ tfi… |
| `2-3` | 2-3 · Невод | `build23()` · `levels/2-3.js` | late_99c_kitezh_sea, late_99d_kitezh_water, late_99g_k23, late_99l_kitezh_magic_water | 4 | t23f tfin_companion_23 tfin_k23 tfin_k23solo |
| `2-4` | 2-4 · В брюхе у кита | `build24()` · `levels/2-4.js` | late_99c_kitezh_sea, late_99d_kitezh_water, late_99h_k24, late_99l_kitezh_magic_water | 4 | t24n tfin_companion_24 tfin_k24 tfin_k24solo |
| `2-5` | 2-5 · Китеж звонит | `build25()` · `levels/2-5.js` | late_99c_kitezh_sea, late_99d_kitezh_water, late_99i_k25, late_99k_kitezh_foes, late_99l_kitezh_magic_water | 6 | t25c tfin_companion_25 tfin_k25 tfin_k25solo tfoes tsospot |
| `2-B` | 2-Б · Водяной | `build2B()` · `levels/2-B.js` | late_99c_kitezh_sea, late_99d_kitezh_water, late_99j_k2b, late_99l_kitezh_magic_water, late_99q_k2b_vod, late_99r_k2b_fx, late_99s_k2b_chase | 11 | t2c tfin_bossbar tfin_companion_2b tfin_companion_2bboss tfin_flash tfin_k2b tfin_k2bboss… |
| `3-1` | 3-1 · Сад молодильных яблок | `build31()` · `levels/3-1.js` | late_75_kids_w1, late_76_kids_fight, late_99p_sky31 | 16 | t31 t31c tfin_art tfin_juice tfin_kids1 tfin_kids2 tfin_motylek tfin_sky31 tfin_sky31boss… |
| `3-2` | 3-2 · Облачные пастбища | `build32()` · `levels/3-2.js` | late_99o_sky32, late_99x_sky32_tut, late_99y_sky32_cine, late_99zd_sky32_fx, late_99ze_sky32_cam | 9 | t32 tfin_sky32 tfin_sky32boss tfin_sky32bosssolo tfin_sky32cine tfin_sky32floor tfin_sky3… |
| `3-3` | 3-3 · Сирин и Алконост | `build33()` · `levels/3-3.js` | — | 2 | t33n tso33 |
| `3-4` | 3-4 · Летучий корабль | `build34()` · `levels/3-4.js` | — | 2 | t34 tmenu3 |
| `3-5` | 3-5 · Гуси-лебеди | `build35()` · `levels/3-5.js` | — | 1 | t35 |
| `3-B` | 3-Б · Соловей-Разбойник | `build3B()` · `levels/3-B.js` | late_92c_k5e_fx, late_99u_k3b_fx, late_99v_k3b | 8 | t3bv tfin_bossbar tfin_hintlayer tfin_k3b tfin_k3bboss tfin_k3bbosssolo tfin_k3bsolo thw3b |
| `4-1` | 4-1 · Кузня Кузьмы и Демьяна | `build41()` · `levels/4-1.js` | — | 9 | t41v tfin_fadelocal tfin_kids1 tfin_kids2 tfin_luko thw4 tluko tsolo tsolo41 |
| `4-2` | 4-2 · Река Смородина | `build42()` · `levels/4-2.js` | — | 2 | t42v tfin_art |
| `4-3` | 4-3 · Эй, ухнем | `build43()` · `levels/4-3.js` | — | 1 | t43 |
| `4-4` | 4-4 · Змиевы валы | `build44()` · `levels/4-4.js` | — | 2 | t44 tfoes |
| `4-5` | 4-5 · Калинов мост | `build45()` · `levels/4-5.js` | — | 2 | t45 tsospot |
| `4-B` | 4-Б · Змей Горыныч | `build4B()` · `levels/4-B.js` | late_19_gor, late_37_gor_uzda, late_38_gor_friend, late_87_boss4b, late_98_gor_lava | 10 | t4b tfin_boss4b tfin_cam tfin_cine tfin_gor4 tfin_gorend tfin_gorsolo tfin_hintlayer tfin… |
| `5-1` | 5-1 · Сундук на дубе | `build51()` · `levels/5-1.js` | late_97_buyan51 | 4 | t51 tfin_likho tfoes tso51 |
| `5-2` | 5-2 · Заяц | `build52()` · `levels/5-2.js` | — | 1 | t52 |
| `5-3` | 5-3 · Утка | `build53()` · `levels/5-3.js` | — | 1 | t53 |
| `5-4` | 5-4 · Яйцо | `build54()` · `levels/5-4.js` | — | 2 | t54 tso54 |
| `5-B1` | 5-Б1 · Кощей в тереме | `build5B1()` · `levels/5-B1.js` | late_96c_k5b1_texts | 3 | t5b1 t5b1cam t5b1solo |
| `5-B2` | 5-Б2 · Кощей Бессмертный и Златая цепь | `build5B2()` · `levels/5-B2.js` | late_92_koschei, late_92a_k5e_init, late_92d_k5e_pics, late_93_koschei_level, late_93_koschei_level_p2_storm, late_93_koschei_level_p3_wind, late_93_koschei_level_p4_skaz, late_93_koschei_level_p5_finale, late_93_koschei_level_p6_epic, late_93_koschei_level_ph_prologue, late_94_koschei_reset | 3 | t5b2 tk5e_resume tlukoepi |
| `epi` | Эпилог | `buildEpi()` · `levels/epi.js` | late_39_epi_shadows, late_74_kids_start | 3 | tepi tfin_episolo tfin_epitheatre |
| `z-i` | Застава · Илья Муромец: крен Калинова моста | `buildZast('i')` · `levels/zastava.js` | — | 1 | tzast |
| `z-d` | Застава · Добрыня Никитич: семерых одним махом | `buildZast('d')` · `levels/zastava.js` | — | 2 | tfin_juice tzast |
| `z-a` | Застава · Алёша Попович: колокольная перекличка | `buildZast('a')` · `levels/zastava.js` | — | 1 | tzast |

## Части прототипа (`proto/`, порядок — `proto/parts.txt`; склейка — `index.html`, `python3 tools/proto.py`)

Разделы — заголовки `/* ==== … ==== */` внутри части.

| часть | строк | разделы |
|---|---|---|
| `head.html` | 442 | — |
| `engine/01_utils_input_sound.js` | 122 | УТИЛИТЫ · ВВОД · ДЖОЙСТИКИ (Gamepad API, стандартная раскладка, раскладка v4) · ЗВУК (placeholder) |
| `engine/02_render_heroes.js` | 252 | РЕНДЕР / СЦЕНА · ГЕРОИ (осмысленные примитивы, умения по сценарию v4) |
| `engine/03_world_fx_collision.js` | 226 | МИР · FX · ПОЛУПРОЗРАЧНОСТЬ ТОГО, ЧТО ЗАСЛОНЯЕТ ГЕРОЕВ · КОЛЛИЗИИ |
| `engine/04_physics_actions.js` | 156 | ФИЗИКА ГЕРОЯ · ДЕЙСТВИЯ ИГРОКОВ |
| `engine/05_foes_moroki.js` | 349 | МОРОКИ (язык боя v4: сигнал → защита → запал гаснет → Пробо… |
| `engine/06_damage_clew.js` | 172 | УРОН, КЛУБОК НИТОК И ПОДШИВАНИЕ (закон доброго дивана) · КЛУБОК-ПУТЕВОДИТЕЛЬ (RB): нить-тропка, нить к нити, струны … |
| `engine/07_props.js` | 105 | ПРЕДМЕТЫ: звенья и золотые орешки · КОЛЫШКИ, КАМНИ С ЛАПОЙ, КОЧКИ · ВЗГЛЯД И ХОДЯЧИЕ ЁЛКИ (1-4) · ПЕНЬКИ «НА РАЗ-ДВА-ТРИ» · ПЛИТЫ, ВОРОТА, КОЛОКОЛЬЧИКИ · РИСУНОК КНОПКИ НАД ГЕРОЕМ |
| `engine/08_zven_tasks_camera.js` | 98 | ЗВЕНЫШКО: проводник и подсказчик · ЗАДАЧИ, ПОДСКАЗКИ 20/40 с, ПРИЗРАК · КАМЕРА (демпфирование, lookahead, крен, тряска, слияние, ро… |
| `engine/09_hud_cine.js` | 112 | HUD / UI · ОБНОВЛЕНИЕ ГЕРОЕВ (визуал) · РОЛИКИ В ДВИЖКЕ (кадры, реплики, события; пропуск — оба дер… |
| `levels/p_prologue.js` | 317 | УРОВЕНЬ: ПРОЛОГ «ЗВЕНЫШКО» |
| `levels/w1_common.js` | 74 | ЖИТЕЛИ МИРА 1 И РЕКВИЗИТ (примитивы) |
| `levels/1-1.js` | 185 | МИР 1 · ДРЕМУЧИЙ ЛЕС · 1-1 «ИЗБУШКА, ПОВЕРНИСЬ» |
| `levels/1-2.js` | 509 | 1-2 «КИКИМОРИНО БОЛОТО» |
| `levels/1-3.js` | 527 | 1-3 «КОЛОБОК» — гусельный уровень |
| `levels/1-4.js` | 205 | 1-4 «ЛЕШИЙ ВОДИТ» |
| `levels/1-5.js` | 172 | 1-5 «КИКИМОРИНА ПРЯЛКА» |
| `levels/1-B.js` | 147 | 1-Б «ЛЕШИЙ-ПУТАНИК» — босс мира 1 |
| `levels/w2_common.js` | 217 | МИР 2 · ПОДВОДНЫЙ КИТЕЖ: гусли Садко, вода участков, всплыв… |
| `levels/2-1.js` | 210 | МИР 2 · ПОДВОДНЫЙ КИТЕЖ · 2-1 «ГУСЛИ САДКО» |
| `levels/2-2.js` | 136 | 2-2 «ЧУДО-ЮДО РЫБА-КИТ» |
| `levels/2-3.js` | 139 | 2-3 «НЕВОД» — на четверых |
| `levels/2-4.js` | 197 | 2-4 «В БРЮХЕ У КИТА» — асимметричная сцена |
| `levels/2-5.js` | 167 | 2-5 «КИТЕЖ ЗВОНИТ» — кульминация мира |
| `levels/2-B.js` | 117 | 2-Б «ВОДЯНОЙ» — босс мира 2 |
| `levels/w3_common.js` | 299 | МИР 3 · НЕБЕСНОЕ ЦАРСТВО: перо Жар-птицы, свет и тьма |
| `levels/3-1.js` | 146 | МИР 3 · НЕБЕСНОЕ ЦАРСТВО · 3-1 «САД МОЛОДИЛЬНЫХ ЯБЛОК» |
| `levels/3-2.js` | 92 | МИР 3 · НЕБЕСНОЕ ЦАРСТВО · 3-2 «ОБЛАЧНЫЕ ПАСТБИЩА» |
| `levels/3-3.js` | 200 | МИР 3 · 3-3 «СИРИН И АЛКОНОСТ» — гусельный уровень |
| `levels/3-4.js` | 166 | МИР 3 · 3-4 «ЛЕТУЧИЙ КОРАБЛЬ» |
| `levels/3-5.js` | 164 | МИР 3 · 3-5 «ГУСИ-ЛЕБЕДИ» |
| `levels/3-B.js` | 260 | 3-Б «СОЛОВЕЙ-РАЗБОЙНИК» — босс мира 3 |
| `levels/w4_common.js` | 253 | МИР 4 · ОГНЕННАЯ СМОРОДИНА: клещи, горячее, лава, корка, пар |
| `levels/4-1.js` | 287 | МИР 4 · ОГНЕННАЯ СМОРОДИНА · 4-1 «КУЗНЯ КУЗЬМЫ И ДЕМЬЯНА» |
| `levels/4-2.js` | 211 | МИР 4 · 4-2 «РЕКА СМОРОДИНА» |
| `levels/4-3.js` | 154 | МИР 4 · 4-3 «ЭЙ, УХНЕМ» — на четверых |
| `levels/4-4.js` | 167 | МИР 4 · 4-4 «ЗМИЕВЫ ВАЛЫ» |
| `levels/4-5.js` | 181 | МИР 4 · 4-5 «КАЛИНОВ МОСТ» — кульминация мира, путь Потапа |
| `levels/4-B.js` | 114 | 4-Б «ЗМЕЙ ГОРЫНЫЧ» — босс мира 4 |
| `levels/w5_common.js` | 304 | МИР 5 · ОСТРОВ БУЯН: вещь по знаку, Лихо Одноглазое, овечьи… |
| `levels/5-1.js` | 611 | МИР 5 · 5-1 «СУНДУК НА ДУБЕ» — остров, дуб и Лихо Одноглазое |
| `levels/5-2.js` | 108 | МИР 5 · 5-2 «ЗАЯЦ» — на четверых |
| `levels/5-3.js` | 128 | МИР 5 · 5-3 «УТКА» — полёт на Горыныче в узде |
| `levels/5-4.js` | 151 | МИР 5 · 5-4 «ЯЙЦО» — гусельный · «Калинка» 88 → 104 |
| `levels/5-B1.js` | 105 | МИР 5 · 5-Б1 «КОЩЕЙ В ТЕРЕМЕ» — бой «выстоять», заранее объ… |
| `levels/5-B2.js` | 175 | МИР 5 · 5-Б2 «КОЩЕЙ БЕССМЕРТНЫЙ И ЗЛАТАЯ ЦЕПЬ» — финал без … |
| `levels/epi.js` | 83 | ЭПИЛОГ — штаб-сосна, вечер: сказка без тетрадки |
| `levels/zastava.js` | 90 | ЗАСТАВА ТРЁХ БОГАТЫРЕЙ — испытания на время для старших |
| `levels/luko_1_scene.js` | 176 | ЛУКОМОРЬЕ: пустой дуб, Кот Учёный, карта-рушник |
| `levels/luko_2_worlds123.js` | 167 | — |
| `levels/luko_3_worlds45.js` | 237 | — |
| `levels/luko_4_zastava_forge_map.js` | 198 | — |
| `levels/luko_5_dress_garden.js` | 224 | — |
| `levels/luko_6_festival_end.js` | 68 | — |
| `engine/10_levels_flow_menu.js` | 214 | ПОТОК ИГРЫ |
| `tail.html` | 3 | — |

## Модули релиза (`zlataya_cep/build/`, порядок подключения)

`fin_early.js` — до создания геометрии; `late_*.js` — по имени (сортировка строк: `late_96b` после `late_96`), перед запуском игры;
`gpu/` (final07) заморожен и в таблицу не входит. Уровни — из `affected_map.txt` (`@level:`), проверок `levelId===` и подмен `buildXX=function`.

| модуль | уровни | о чём |
|---|---|---|
| `fin_early.js` | — | РЕЛИЗ · LOW-POLY: грани вместо гладкости |
| `late_05_gallery.js` | — | РЕЛИЗ final03 · ВИТРИНА (для разработки и документации) |
| `late_10_render.js` | — | РЕЛИЗ · СВЕТ, НЕБО, ГОРИЗОНТ, КАЧЕСТВО |
| `late_12_kit.js` | — | РЕЛИЗ final03 · ПРОЦЕДУРНЫЙ КИТ: палитра, фаски, шум, тон по вершинам |
| `late_13_kit_nature.js` | — | РЕЛИЗ final03 · КИТ: ПРИРОДА |
| `late_14_kit_build.js` | — | РЕЛИЗ final03 · КИТ: ПОСТРОЙКИ, РЕКВИЗИТ, ОСОБОЕ ДЛЯ МИРОВ |
| `late_15_heroes.js` | — | РЕЛИЗ final03 · НОВЫЕ ГЕРОИ: скелетные меши в духе Synty Simple |
| `late_16_cast.js` | — | РЕЛИЗ final05 · ПЕРСОНАЖИ НА УРОВНЕ ГЕРОЕВ: скелетные low-poly модели, лица, живая анимация |
| `late_17_cast2.js` | — | РЕЛИЗ final05 · ПЕРСОНАЖИ НА УРОВНЕ ГЕРОЕВ (2): Садко, Старик, Рыбка, Жар-птица, Сирин и Алконост, Соловей, Лихо, кузне… |
| `late_18_foes.js` | — | РЕЛИЗ final05 · ВРАГИ НА УРОВНЕ ГЕРОЕВ: low-poly модели мороков, выразительные глаза, живая мимика |
| `levels/4-B/late_19_gor.js` | 4-B | РЕЛИЗ final05 · ГОРЫНЫЧ И ЗВЕНЫШКО НА УРОВНЕ ГЕРОЕВ |
| `late_20_decor.js` | — | РЕЛИЗ · ОКРУЖЕНИЕ: учёт земли для декора |
| `late_22_synty.js` | — | РЕЛИЗ final03 · SYNTY-ПРОХОД ПО УРОВНЮ: фаски, шум, тон по вершинам, слои, кромки |
| `late_24_world.js` | — | РЕЛИЗ final03 · МИР: деревья кита, подножия-обрывы, долина, средний план, ориентиры |
| `late_25_scatter.js` | — | РЕЛИЗ final03 · SCATTER И ТРОПИНКА: трава, цветы, камешки, грибы, кромки, «хлебные крошки» |
| `late_26_batch.js` | — | РЕЛИЗ final03 · ПАЧКИ СТАТИКИ: сотни мешей → десятки отрисовок |
| `late_27_atmo.js` | — | РЕЛИЗ final03 · АТМОСФЕРА: частицы, ореолы, волны и пена, лава, море |
| `late_30_hero.js` | — | РЕЛИЗ · ЖИВЫЕ ГЕРОИ: блики в глазах, моргание, приседание, пыль |
| `late_32_downswap.js` | — | РЕЛИЗ final05 · РАССЫПАЛСЯ КЛУБКОМ — ИГРАЙ ВТОРЫМ ГЕРОЕМ |
| `late_34_slash.js` | — | РЕЛИЗ final05 · УДАР ГЕРОЕВ: лента-полумесяц, почерк героя, «бах» при попадании |
| `late_35_guard.js` | — | РЕЛИЗ final06 · ЩИТ (B): у каждого героя свой щит |
| `late_36_potap_fire.js` | — | РЕЛИЗ final06 · ПОТАП: ОГНЕННЫЕ КУЛАКИ, МАХ ИЗ-ЗА ГОЛОВЫ, ОГНЕННЫЕ КОГТИ |
| `levels/4-B/late_37_gor_uzda.js` | 4-B | РЕЛИЗ final06 · 4-Б «ЗМЕЙ ГОРЫНЫЧ», ФАЗА 3: ОГНЕННАЯ УЗДА, ЗОЛОТОЙ ОРЕОЛ, «РАЗ-ДВА-ТРИ» |
| `levels/4-B/late_38_gor_friend.js` | 4-B | РЕЛИЗ final06 · 4-Б «ЗМЕЙ ГОРЫНЫЧ»: РОЛИК ПОСЛЕ ПОБЕДЫ — ГОРЫНЫЧ СТАЛ ДРУГОМ |
| `levels/epi/late_39_epi_shadows.js` | epi | РЕЛИЗ final06 · ЭПИЛОГ: «ТЕАТР ТЕНЕЙ» — КООПЕРАТИВНАЯ МИНИ-ИГРА |
| `late_40_music.js` | — | РЕЛИЗ · МУЗЫКА: народные мотивы для меню, Лукоморья, каждого мира и боссов |
| `late_50_save.js` | luko | РЕЛИЗ · СОХРАНЕНИЯ И НАСТРОЙКИ |
| `late_60_title.js` | — | РЕЛИЗ · ТИТУЛ: «У лукоморья дуб зелёный» |
| `late_70_menu.js` | — | РЕЛИЗ · ГЛАВНОЕ МЕНЮ, ПАУЗА, ГЛАВЫ, НАСТРОЙКИ, УПРАВЛЕНИЕ, ТИТРЫ |
| `late_71_pads.js` | — | РЕЛИЗ final05 · ДЖОЙСТИКИ В МЕНЮ: два джойстика, Start на паузе, нестандартные раскладки |
| `late_72_splash.js` | — | РЕЛИЗ · ЗАСТАВКА СТУДИИ «АбадзехLAB · Лаборатория творчества» |
| `late_73_companion.js` | — | РЕЛИЗ final06 · НАПАРНИК: БОТ ЗА ИГРОКА 2 |
| `levels/p/late_73b_companion_p.js` | — | РЕЛИЗ final06 · ПРОЛОГ: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/1-1/late_73c_companion_11.js` | — | РЕЛИЗ final06 · 1-1 «ИЗБУШКА, ПОВЕРНИСЬ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/1-3/late_73d_companion_13.js` | — | РЕЛИЗ final06 · 1-3 «КОЛОБОК»: НАПАРНИК-БОТ БЕЖИТ СВОЮ ДОРОЖКУ |
| `levels/1-4/late_73e_companion_14.js` | — | РЕЛИЗ final06 · 1-4 «ЛЕШИЙ ВОДИТ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/1-5/late_73f_companion_15.js` | — | РЕЛИЗ final06 · 1-5 «КИКИМОРИНА ПРЯЛКА»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/1-B/late_73g_companion_1b.js` | — | РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: НАПАРНИК-БОТ БЬЁТСЯ ЗА ИГРОКА 2 |
| `levels/1-2/late_73h_companion_12.js` | — | РЕЛИЗ final06 · 1-2 «КИКИМОРИНО БОЛОТО»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/2-1/late_73i_companion_21.js` | — | РЕЛИЗ final06 · 2-1 «ГУСЛИ САДКО»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/2-2/late_73j_companion_22.js` | — | РЕЛИЗ final06 · 2-2 «РЫБА-КИТ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/2-3/late_73k_companion_23.js` | — | РЕЛИЗ final06 · 2-3 «НЕВОД»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/2-4/late_73l_companion_24.js` | — | РЕЛИЗ final06 · 2-4 «В БРЮХЕ У КИТА»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/2-5/late_73m_companion_25.js` | — | РЕЛИЗ final06 · 2-5 «КИТЕЖ ЗВОНИТ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `levels/2-B/late_73n_companion_2b.js` | — | РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 |
| `late_74_kids_start.js` | epi, luko | РЕЛИЗ · МИР 1 ДЛЯ ДЕТЕЙ 7–11 · СТАРТ, УДОБСТВО, СОХРАННОСТЬ |
| `late_75_kids_w1.js` | 1-1, 1-2, 1-3, 1-4, 1-5, 1-B, 2-1, 3-1, p | РЕЛИЗ · МИР 1 ДЛЯ ДЕТЕЙ 7–11 · ПРАВКИ УРОВНЕЙ |
| `late_76_kids_fight.js` | 1-1, 1-2, 2-1, 3-1 | РЕЛИЗ · ДЕТИ 7–11 · БОЙ: СИНЯЯ КАПЛЯ, «ЖАЛОСТЬ», КРАСНЫЙ ЗНАК |
| `late_76b_cine_skip.js` | — | РЕЛИЗ · РОЛИКИ: ПРОПУСК ОДНИМ ИГРОКОМ, «ОСТАЛОСЬ N С», ПРОПУСК ИЗ ПАУЗЫ |
| `late_78_signals.js` | — | РЕЛИЗ · СЛОВАРЬ СИГНАЛОВ БОССОВ (FIN.signals) |
| `late_79_hints.js` | — | РЕЛИЗ final06 · ПОДСКАЗКИ: ОДНА КАРТОЧКА НА ИГРОКА, БЕЗ ПОВТОРОВ |
| `late_79b_readaloud.js` | — | РЕЛИЗ · МИР 1 ДЛЯ ДЕТЕЙ 7–11 · ЗАДАЧИ ВСЛУХ |
| `late_79c_taskshort.js` | — | РЕЛИЗ · КРАТКИЕ ФОРМУЛИРОВКИ ЗАДАЧ (≤ 12 слов, крупной строкой) |
| `late_79d_help.js` | — | РЕЛИЗ · ЛЕСТНИЦА ПОДСКАЗОК ПРИ ПРОМАХАХ (FIN.help) |
| `late_80_ui.js` | — | РЕЛИЗ · ИНТЕРФЕЙС: баннер события важнее ленты с названием уровня |
| `late_81_sfx.js` | — | РЕЛИЗ · ЗВУК: ИНСТРУМЕНТЫ И ЗАНОВО ОЗВУЧЕННЫЕ ЭФФЕКТЫ РОЛИКОВ |
| `late_82_cine_cam.js` | — | РЕЛИЗ · КИНО 1: РЕЖИССЁР И КАМЕРА РОЛИКОВ |
| `late_83_cine_actors.js` | — | РЕЛИЗ · КИНО 2: ЖИВЫЕ ГЕРОИ И ПЕРСОНАЖИ |
| `late_84_cine_fx.js` | — | РЕЛИЗ · КИНО 3: ЭФФЕКТЫ, СВЕТ, НАСТРОЕНИЕ, АКЦЕНТЫ |
| `late_84b_bossfx.js` | — | РЕЛИЗ · ЕДИНЫЙ FX-API БОССОВ (FIN.bossfx) |
| `late_85_cine_audio.js` | — | РЕЛИЗ · КИНО 4: ЗВУК РОЛИКОВ |
| `late_86_cine_direction.js` | — | РЕЛИЗ · КИНО 5: АВТОРСКАЯ РЕЖИССУРА КЛЮЧЕВЫХ РОЛИКОВ |
| `levels/4-B/late_87_boss4b.js` | 4-B | РЕЛИЗ final04 · 4-Б «ЗМЕЙ ГОРЫНЫЧ»: обучающие ролики по этапам и живые подсказки |
| `late_88_occ.js` | — | РЕЛИЗ final04 · ВИДИМОСТЬ ГЕРОЕВ: вырез «в горошек», силуэты за стенами, затухание у камеры |
| `late_89_camorbit.js` | — | РЕЛИЗ final04 · КАМЕРА ПРАВЫМ СТИКОМ: орбита вокруг героя, наклон, автовозврат, столкновения |
| `late_90_boot.js` | — | РЕЛИЗ · ЗАПУСК |
| `late_91_voice.js` | — | РЕЛИЗ · ОЗВУЧКА РЕПЛИК (final06) |
| `late_91b_juice.js` | — | РЕЛИЗ · СОЧНЫЙ БОЙ: удар, сигналы мороков, движения, урон, клубок (docs/23_vfx_sfx.md) |
| `late_91c_juice_world.js` | — | РЕЛИЗ · МИР, БОССЫ, ВДВОЁМ, МИКС, ДОСТУПНОСТЬ (docs/23_vfx_sfx.md, полигон заход 2) |
| `levels/5-B2/late_92_koschei.js` | 5-B2 | РЕЛИЗ final06 · 5-Б2 «КОЩЕЙ БЕССМЕРТНЫЙ И ЗЛАТАЯ ЦЕПЬ»: ФИНАЛЬНЫЙ БОЙ В ПЯТЬ ЭТАПОВ |
| `levels/5-B2/late_92a_k5e_init.js` | 5-B2 | БИТВА С КОЩЕЕМ (5-Б2) · общие данные стадий |
| `levels/5-B2/late_92b_k5e_lib.js` | — | БИТВА С КОЩЕЕМ (k5epic) · БИБЛИОТЕКА: пролог, Лукоморье, Кот на цепи, буквы-удары, страницы, оркестр |
| `levels/5-B2/late_92c_k5e_fx.js` | 3-B | k5epic · ОБЩИЙ НАБОР ЭФФЕКТОВ СТАДИЙ (K5X) |
| `levels/5-B2/late_92d_k5e_pics.js` | 5-B2 | k5epic · ЗНАЧКИ ИНТЕРФЕЙСА И ТИШИНА В БИТВЕ (K5PIC) |
| `levels/5-B2/late_93_koschei_level.js` | 5-B2 | РЕЛИЗ final06 · 5-Б2: УРОВЕНЬ — арена, пять этапов, ролики между ними |
| `levels/5-B2/late_93_koschei_level_p2_storm.js` | 5-B2 | ---- продолжение late_93_koschei_level.js (внутри build5B2, часть 2 из 5): ворон, гроза, буря, игла, этапы боя — части … |
| `levels/5-B2/late_93_koschei_level_p3_wind.js` | 5-B2 | ---- продолжение late_93_koschei_level.js (внутри build5B2, часть 3 из 5): ветер, анимация Кощея, помощники героев — ча… |
| `levels/5-B2/late_93_koschei_level_p4_skaz.js` | 5-B2 | ---- продолжение late_93_koschei_level.js (внутри build5B2, часть 4 из 5): сказы и переходы между этапами — части склеи… |
| `levels/5-B2/late_93_koschei_level_p5_finale.js` | 5-B2 | ---- продолжение late_93_koschei_level.js (внутри build5B2, часть 5 из 5): последний сказ, цепь, кнопки, отладка — част… |
| `levels/5-B2/late_93_koschei_level_p6_epic.js` | 5-B2 | ---- продолжение build5B2 (k5epic, часть 6): БИТВА В ДВЕНАДЦАТЬ СТАДИЙ — контроллер (docs/27_koschei_epic_proposals.md)… |
| `levels/5-B2/late_93_koschei_level_p6b_lesson.js` | — | ---- продолжение build5B2 (часть p6b): ОБУЧАЮЩИЕ КАТСЦЕНЫ — общий движок ---- |
| `levels/5-B2/late_93_koschei_level_p7_hub.js` | — | ---- продолжение build5B2 (k5epic, часть 7): ЛУКОМОРЬЕ — постройки, друзья в чёрных цепях, Кот-часы, помощь друзей ---- |
| `levels/5-B2/late_93_koschei_level_p8_act1.js` | — | ---- продолжение build5B2 (k5epic, часть 8): АКТ I «ЧЁРНАЯ СТРОКА» — стадии 1–3 и их ролики ---- |
| `levels/5-B2/late_93_koschei_level_p8b_stage3.js` | — | ---- продолжение build5B2 (k5epic, часть 8b): СТАДИЯ 3 «ТАМ ЛЕС И ДОЛ ВИДЕНИЙ ПОЛНЫ» ---- |
| `levels/5-B2/late_93_koschei_level_p9_pages.js` | — | ---- продолжение build5B2 (k5epic, часть 9): АКТ II «НЕВЕДОМЫЕ ДОРОЖКИ» — страницы-двери, переход в сказку, поездки дом… |
| `levels/5-B2/late_93_koschei_level_p9b_flights.js` | — | ---- продолжение build5B2 (k5epic, часть 9b): ПОЛЁТЫ ДОМОЙ — ступа Яги (после стадии 4) и Горыныч (после стадии 7) ---- |
| `levels/5-B2/late_93_koschei_level_p9c_flylessons.js` | — | ---- продолжение build5B2 (k5epic, часть 9c): ОБУЧАЮЩИЕ КАТСЦЕНЫ ПОЛЁТОВ ДОМОЙ — ступа (после стадии 4) и Горыныч (посл… |
| `levels/5-B2/late_93_koschei_level_pa_page1.js` | — | ---- продолжение build5B2 (k5epic, часть 10): СТРАНИЦА 1 «ИЗБУШКА ТАМ НА КУРЬИХ НОЖКАХ» (стадия 4, мир 1, клубок) ---- |
| `levels/5-B2/late_93_koschei_level_pb_page2.js` | — | ---- продолжение build5B2 (k5epic, часть 11): СТРАНИЦА 2 «ТАМ О ЗАРЕ ПРИХЛЫНУТ ВОЛНЫ» (стадия 5, мир 2, гусли) ---- |
| `levels/5-B2/late_93_koschei_level_pc_page3.js` | — | ---- продолжение build5B2 (k5epic, часть 12): СТРАНИЦА 3 «В ТЕМНИЦЕ ТАМ ЦАРЕВНА ТУЖИТ» (стадия 6, мир 3, свет) ---- |
| `levels/5-B2/late_93_koschei_level_pd_page4.js` | — | ---- продолжение build5B2 (k5epic, часть 13): СТРАНИЦА 4 «ТАМ НА НЕВЕДОМЫХ ДОРОЖКАХ…» (стадия 7, мир 4, клещи) ---- |
| `levels/5-B2/late_93_koschei_level_pe_act3.js` | — | ---- продолжение build5B2 (k5epic, часть 14): АКТ III — стадии 8 (буря), 9 (витязи), 10 (Цепной великан) ---- |
| `levels/5-B2/late_93_koschei_level_pf_bezimen.js` | — | ---- продолжение build5B2 (k5epic, часть 15): СТАДИЯ 11 «БЕЗ ИМЁН» (новая; отзвук терема 5-Б1) ---- |
| `levels/5-B2/late_93_koschei_level_pg_final.js` | — | ---- продолжение build5B2 (k5epic, часть 16): СТАДИЯ 12, «ТЯНЕМ-ПОТЯНЕМ», ПРОЛОГ-ПОГОНЯ, тексты паузы ---- |
| `levels/5-B2/late_93_koschei_level_ph_prologue.js` | 5-B2 | ---- продолжение build5B2 (k5epic, часть ph): ПРОЛОГ «Через леса, через моря» — погоня на Горыныче за чёрной тучей Коще… |
| `levels/5-B2/late_93_koschei_level_pz_end.js` | — | ---- конец build5B2 (k5epic): части p6…py — битва в двенадцать стадий; здесь функция закрывается ---- |
| `levels/5-B2/late_94_koschei_reset.js` | 5-B2 | РЕЛИЗ final06 · 5-Б2: СБРОС БОЯ ПРИ ЗАГРУЗКЕ УРОВНЯ |
| `late_95_dev.js` | luko | РЕЛИЗ · КЛАВИШИ РАЗРАБОТЧИКА |
| `late_95b_warp.js` | — | РЕЛИЗ · ДЛЯ БОТОВ И РАЗРАБОТКИ: ЕДИНАЯ ТЕЛЕПОРТАЦИЯ FIN.warp, ПОСЛЕДНИЙ РОЛИК FIN.lastCine |
| `levels/p/late_96_prolog_scooter.js` | p | РЕЛИЗ final06 · ПРОЛОГ: ПРОШКА НЕСЁТ САМОКАТ ТИШКЕ |
| `levels/p/late_96b_prolog_night.js` | p | РЕЛИЗ final06 · ПРОЛОГ: КОМНАТА ШТАБА, ОКНО В НОЧЬ, ПОГОНЯ КОЩЕЯ, ОЖИВШАЯ ТЕТРАДКА |
| `levels/5-B1/late_96c_k5b1_texts.js` | 5-B1 | РЕЛИЗ · 5-Б1 «КОЩЕЙ В ТЕРЕМЕ» · короткие надписи (docs/34 5Б1-2) |
| `levels/5-1/late_97_buyan51.js` | 5-1 | РЕЛИЗ final06 · 5-1 «СУНДУК НА ДУБЕ»: НОВЫЕ ЖИТЕЛИ ОСТРОВА В РОЛИКАХ |
| `levels/4-B/late_98_gor_lava.js` | 4-B | РЕЛИЗ final06 · 4-Б «ЗМЕЙ ГОРЫНЫЧ»: АРЕНА ПО РЕФЕРЕНСУ, РЫК И ЛАВА, БОЛЬШОЙ ВДОХ, СЛАБОЕ МЕСТО |
| `levels/1-3/late_99_kolobok_dance.js` | 1-3 | РЕЛИЗ final06 · 1-3 «КОЛОБОК»: ФИНАЛЬНАЯ ПЛЯСКА |
| `levels/1-4/late_99b_kidnap14.js` | 1-4, 1-B | РЕЛИЗ final06 · 1-4 «ЛЕШИЙ ВОДИТ»: ШАПКИ НА ГОЛОВАХ, ЁЛКИ УТАСКИВАЮТ ПЕЛАГЕЮ |
| `levels/w2/late_99c_kitezh_sea.js` | 2-1, 2-2, 2-3, 2-4, 2-5, 2-B | РЕЛИЗ final06 · МИР 2: ПОД ВОДОЙ — КАК ПОД ВОДОЙ |
| `levels/w2/late_99d_kitezh_water.js` | 2-1, 2-2, 2-3, 2-4, 2-5, 2-B | РЕЛИЗ final06 · МИР 2: ГУСЛИ РАСТУТ — ПЕРЕЛИВ, ТЕЧЕНИЕ, ЗВОН · ОСТАВЛЕННЫЙ ДЕРЖИТ НАПЕВ · РОЛИ ПОД ВОДОЙ |
| `levels/2-1/late_99e_k21.js` | 2-1 | РЕЛИЗ final06 · 2-1 «ГУСЛИ САДКО» — ВДВОЕ ДЛИННЕЕ |
| `levels/2-1/late_99e_k21_p2_market.js` | 2-1 | ---- продолжение late_99e_k21.js (внутри build21, часть 2 из 4): торг, мостовая, палаты, переливная улица — части склеи… |
| `levels/2-1/late_99e_k21_p3_scenes.js` | 2-1 | ---- продолжение late_99e_k21.js (внутри build21, часть 3 из 4): ролики и сцены уровня — части склеиваются сборкой по и… |
| `levels/2-1/late_99e_k21_p4_hall.js` | 2-1 | ---- продолжение late_99e_k21.js (внутри build21, часть 4 из 4): палаты Морского царя: пляска, жемчуг, финал, задачи — … |
| `levels/2-2/late_99f_k22.js` | 2-2 | РЕЛИЗ final06 · 2-2 «ЧУДО-ЮДО РЫБА-КИТ» — ВТРОЕ ДЛИННЕЕ, ПО «КОНЬКУ-ГОРБУНКУ» |
| `levels/2-2/late_99f_k22_p2_stove.js` | 2-2 | ---- продолжение late_99f_k22.js (внутри build22, часть 2 из 4): печка по хребту, бока и колья, пахари, пляска, роща — … |
| `levels/2-2/late_99f_k22_p3_lullaby.js` | 2-2 | ---- продолжение late_99f_k22.js (внутри build22, часть 3 из 4): колыбельная: куплеты, звёздочки, дыхание — части склеи… |
| `levels/2-2/late_99f_k22_p4_tasks.js` | 2-2 | ---- продолжение late_99f_k22.js (внутри build22, часть 4 из 4): задачи и подсказки, отладка — части склеиваются сборко… |
| `levels/2-3/late_99g_k23.js` | 2-3 | РЕЛИЗ final06 · 2-3 «НЕВОД» — ВДВОЕ ДЛИННЕЕ |
| `levels/2-4/late_99h_k24.js` | 2-4 | РЕЛИЗ final06 · 2-4 «В БРЮХЕ У КИТА» — ВДВОЕ ДЛИННЕЕ |
| `levels/2-5/late_99i_k25.js` | 2-5 | РЕЛИЗ final06 · 2-5 «КИТЕЖ ЗВОНИТ» — ВДВОЕ ДЛИННЕЕ |
| `levels/2-B/late_99j_k2b.js` | 2-B | РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ» — ПОГОНЯ С ВАЛОМ И БОЙ В ЧЕТЫРЕ ЭТАПА (docs/23_vodyanoy_boss.md) |
| `levels/w2/late_99k_kitezh_foes.js` | 2-1, 2-5 | РЕЛИЗ final06 · МИР 2: ЖЕМЧУЖНИЦА И ЩУКИ, ЧТО ПЛАВАЮТ |
| `levels/w2/late_99l_kitezh_magic_water.js` | 2-1, 2-2, 2-3, 2-4, 2-5, 2-B | РЕЛИЗ final06 · МИР 2: ВОДА ГУСЛЕЙ — СКАЗОЧНАЯ, ПЕРЕЛИВЧАТАЯ |
| `levels/2-1/late_99m_k21_hermit.js` | 2-1 | РЕЛИЗ final06 · 2-1: МИНИ-БОСС «РАК-ОТШЕЛЬНИК» |
| `levels/1-1/late_99n_yaga11.js` | 1-1 | РЕЛИЗ final06 · 1-1 «ИЗБУШКА, ПОВЕРНИСЬ»: РОЛИК «ЯГА СТАВИТ ЗАДАЧУ» — НОВАЯ ПОСТАНОВКА |
| `levels/3-2/late_99o_sky32.js` | 3-2 | РЕЛИЗ final06 · 3-2 «ОБЛАЧНЫЕ ПАСТБИЩА» — ВТРОЕ ДЛИННЕЕ: ПУШОК, ВЕТЕР-ВЕТРИЛО, РАДУГА-ДУГА, ОВЧАРНЯ, ГРОМОВОЙ БАРАН |
| `levels/3-1/late_99p_sky31.js` | 3-1 | РЕЛИЗ final06 · 3-1 «САД МОЛОДИЛЬНЫХ ЯБЛОК» — ВТРОЕ БОЛЬШЕ: КТО ЯБЛОЧКО ОТКУСИТ — ТОТ ПОМОЛОДЕЕТ |
| `levels/2-B/late_99q_k2b_vod.js` | 2-B | РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ»: ДЕДУШКА ВОДЯНОЙ, СОМ И ВОДЯНЫЕ КОНИ — МОДЕЛИ И МИМИКА |
| `levels/2-B/late_99r_k2b_fx.js` | 2-B | РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ»: ЭФФЕКТЫ ВОДЫ — ОМУТ, БРЫЗГИ, КОЛЬЦА, ТЕЛЕГРАФЫ, ГРОЗА, ВАЛ-«ТРУБА» |
| `levels/2-B/late_99s_k2b_chase.js` | 2-B | РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ»: ПОГОНЯ С ВАЛОМ — ВДВОЕ ДЛИННЕЕ (≈190 м) |
| `levels/3-B/late_99t_k3b_sol.js` | — | РЕЛИЗ final06 · 3-Б «СОЛОВЕЙ-РАЗБОЙНИК»: СОЛОВЕЙ, ДОЧКИ-СОЛОВУШКИ, ЗВЕРИ-ТЕНИ — МОДЕЛИ И МИМИКА |
| `levels/3-B/late_99u_k3b_fx.js` | 3-B | РЕЛИЗ final06 · 3-Б «СОЛОВЕЙ-РАЗБОЙНИК»: ЭФФЕКТЫ — ВИДИМЫЙ ЗВУК, ВЕТЕР, РВУЩИЕСЯ ОБЛАКА, НОЧЬ, ВИХРЬ |
| `levels/3-B/late_99v_k3b.js` | 3-B | РЕЛИЗ final06 · 3-Б «СОЛОВЕЙ-РАЗБОЙНИК» — ГНЕЗДО НА СЕМИ ДУБАХ И БОЙ ПО БЫЛИНЕ (docs/26_solovei_boss.md) |
| `levels/3-B/late_99w_k3b_road.js` | — | РЕЛИЗ final06 · 3-Б «СОЛОВЕЙ-РАЗБОЙНИК»: ПОДХОД «ПРЯМОЕЗЖАЯ ДОРОЖКА» (≈170 м) |
| `levels/1-B/late_99x_k1b_leshy.js` | 1-B | РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ОБЛИК — ЛЕШИЙ С ТРОФЕЯМИ, РУКИ-КОРЯГИ, ДВОЙНИКИ В НАРЯДАХ, ЛЕШАЧАТА-ЗРИТЕЛИ |
| `levels/3-2/late_99x_sky32_tut.js` | 3-2 | РЕЛИЗ final06 · 3-2: ГРОМОВОЙ БАРАН — ОБУЧАЮЩИЕ КАРТОЧКИ ПЕРЕД ЭТАПАМИ И ЖИВЫЕ ПОДСКАЗКИ |
| `levels/1-B/late_99y_k1b_fx.js` | 1-B | РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: АРЕНА И ЭФФЕКТЫ — СВЕТ ПО ЭТАПАМ, СВЕТЛЯКИ, ЛИСТОПАД, ТЕЛЕГРАФЫ, КАМЕРА, ЛЕНТЫ И С… |
| `levels/3-2/late_99y_sky32_cine.js` | 3-2 | РЕЛИЗ final06 · 3-2: РОЛИКИ — ГЕРОИ ЛИЦОМ К КАМЕРЕ, ЧИСТЫЙ КАДР |
| `levels/1-B/late_99z_k1b_hands.js` | 1-B | РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 1 — РУКИ-КОРЯГИ: ПОЗА → УДАР → ОКНО |
| `levels/1-B/late_99za_k1b_hide.js` | 1-B | РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 2 — «ИЩИ-СВИЩИ»: ПРЯТКИ ДВОЙНИКОВ |
| `levels/1-B/late_99zb_k1b_hoorovod.js` | 1-B | РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 3 — «ХОРОВОД»: БЕГ ВОКРУГ ЛЕШЕГО, СКАКАЛКА, ЛЕНТЫ, «ТЯНИ-ПОТЯНИ» |
| `levels/1-B/late_99zc_k1b_cine.js` | 1-B | РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: МУЗЫКА ПО ЭТАПАМ И РОЛИКИ — ВХОД, ПЕРЕХОД, ВЫХОД НА ХОРОВОД, ФИНАЛ |
| `levels/1-B/late_99zd_k1b_help.js` | 1-B | РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЛЕСТНИЦА ПОДСКАЗОК (щит, кувырок) |
| `levels/3-2/late_99zd_sky32_fx.js` | 3-2 | РЕЛИЗ final06 · 3-2: ГРОМОВОЙ БАРАН — ЭФФЕКТЫ, ЧЕСТНЫЕ ТЕЛЕГРАФЫ, ПОЛОСА БОССА, ЧИСТЫЙ ТЕКСТ |
| `levels/3-2/late_99ze_sky32_cam.js` | 3-2 | РЕЛИЗ final06 · 3-2: ГРОМОВОЙ БАРАН — КАМЕРА БОЯ |

## Текстовые замены при сборке (`rep_*.py`, разделы `# ---- … ----` по порядку)

| файл | раздел |
|---|---|
| `rep_20_subs.py` | 1-1 «Избушка, повернись» |
| `rep_20_subs.py` | 1-2, 1-3 |
| `rep_20_subs.py` | 1-4 Леший |
| `rep_20_subs.py` | 1-5 Кикимора |
| `rep_20_subs.py` | 1-Б Леший |
| `rep_20_subs.py` | 2-1 Садко |
| `rep_20_subs.py` | 2-2 Рыба-кит |
| `rep_20_subs.py` | 2-3 Невод |
| `rep_20_subs.py` | 2-4 Внутри кита |
| `rep_20_subs.py` | 2-5 Колокол |
| `rep_20_subs.py` | 2-Б Водяной |
| `rep_20_subs.py` | 3-1 Жар-птица |
| `rep_20_subs.py` | 3-3 Сирин и Алконост |
| `rep_20_subs.py` | 3-4 Летучий корабль |
| `rep_20_subs.py` | 3-5 Гуси-лебеди |
| `rep_20_subs.py` | 3-Б Соловей |
| `rep_20_subs.py` | 4-1 Кузня |
| `rep_20_subs.py` | 4-2 Смородина |
| `rep_20_subs.py` | 4-3 «Эй, ухнем!» |
| `rep_20_subs.py` | 4-4 Змиевы валы |
| `rep_20_subs.py` | 4-5 Калинов мост |
| `rep_20_subs.py` | 4-Б Горыныч |
| `rep_20_subs.py` | 5-1 Лихо |
| `rep_20_subs.py` | 5-2 Заяц |
| `rep_20_subs.py` | 5-3 Утка |
| `rep_20_subs.py` | 5-4 Калинка, терем |
| `rep_20_subs.py` | 5-Б2 финал |
| `rep_20_subs.py` | эпилог |
| `rep_20_subs.py` | Лукоморье |
| `levels/epi/rep_30_epi.py` | Эпилог: «Театр теней» (late_39_epi_shadows.js) — после ролика e1 мини-игра с живыми тенями вместо теней-картинок по кно… |
| `levels/4-B/rep_30_gor4b.py` | 4-Б «Змей Горыныч»: Пробой любой головы держится вдвое дольше — 12 секунд (на вдохе — 18) |
| `levels/4-B/rep_30_gor4b.py` | 4-Б «Змей Горыныч», фаза 3 (late_37_gor_uzda.js): после оглушения всех трёх голов — 50 секунд (было 25); «раз-два-три» … |
| `levels/1-3/rep_30_kolobok13.py` | 1-3 «Колобок»: последний ролик — пляска; Колобок отдаёт звено Прошке |
| `levels/1-3/rep_30_kolobok13.py` | 1-3 «Колобок»: мир 1 для детей 7–11 — окно попадания в долю шире на Лёгком (±0,20 с) и Среднем (±0,12 с); Богатырский —… |
| `levels/1-4/rep_30_leshy14.py` | 1-4 «Леший водит»: ролик «Пелагею увели» — ёлки кружат Пелагею хороводом и вихрем уносят в кольцо |
| `levels/1-B/rep_30_leshy1b.py` | 1-Б «Леший-Путаник»: Леший с трофеями на голове, большие руки-коряги от плеча, двойники в нарядах, мост-рука, зрители, … |
| `levels/1-B/rep_30_leshy1b.py` | этап 2 «Ищи-свищи»: прятки (late_99za_k1b_hide.js, шаг 4 плана) |
| `levels/1-B/rep_30_leshy1b.py` | этап 3 «Хоровод»: Леший на пне, скакалка, ленты, «Тяни-потяни» (late_99zb_k1b_hoorovod.js, шаг 5 плана) — вместо карусе… |
| `levels/luko/rep_30_luko.py` | Лукоморье: волшебный стан, карта-рушник и берег — на 6 шагов дальше от дуба |
| `levels/luko/rep_30_luko.py` | Лукоморье: после «Все уровни открыты» (Ctrl+Alt+], флаг devAll) Кот не встречает «Садитесь — начну рассказ!» |
| `levels/p/rep_30_prolog.py` | Пролог «Колыбельная»: сценка с самокатом — Прошка несёт его Тишке, спотыкается о шишку, самокат разваливается, все смею… |

## Документы (`zlataya_cep/docs/`)

| файл | заголовок |
|---|---|
| `01_audit.md` | Аудит прототипа и решения для final01 |
| `02_art_bible.md` | Арт-библия: low-poly «вырезанная из дерева сказка» |
| `03_audio.md` | Звук и музыка |
| `04_release_checklist.md` | Чек-лист релиза |
| `05_cinematics.md` | Синематики: аудит и новая режиссура (final02) |
| `06_art_synty.md` | final03 · Арт-переработка в духе Synty (POLYGON / Simple) |
| `07_visibility_camera.md` | final04 · Видимость героев и камера правым стиком |
| `08_final05.md` | final05 — персонажи и враги на уровне героев, видимые враги, палитра 256, эффектный удар, джойстики, понятные… |
| `09_final06.md` | final06 · Озвученная игра |
| `10_buyan51.md` | 5-1 «Сундук на дубе» — расширенный уровень и бой с Лихом |
| `11_gorynych_lava.md` | 4-Б «Змей Горыныч»: арена по референсу, рык и лава, большой вдох, слабое место |
| `12_swamp_long.md` | 1-2 «Кикиморино болото»: уровень в 3,2 раза длиннее |
| `13_koschei_cines.md` | 5-Б2 «Кощей Бессмертный и Златая цепь»: эффекты, «Кости, встаньте!», ролики заново (отзыв 2) |
| `14_koschei_verse.md` | 5-Б2 «Кощей Бессмертный и Златая цепь»: природа в бою, буря у наковальни, сценарий в стихах (отзыв 3) |
| `15_kitezh.md` | Мир 2 «Подводный Китеж»: под водой — как под водой, уровни вдвое длиннее |
| `16_hints.md` | Подсказки: одна карточка на игрока, без повторов |
| `17_kitezh_2.md` | Мир 2, второй круг: сказочная вода, 2-1 «Гусли Садко» и 2-2 «Чудо-юдо Рыба-кит» |
| `18_webgpu.md` | final07 — WebGPU и новый рендер |
| `19_kitezh_3.md` | Мир 2, третий круг: подсказка в 2-2, колыбельная киту, путь из «Невода» к Рыбе-киту |
| `20_yaga_vodyanoy.md` | 1-1: ролик «Яга ставит задачу» и 2-Б: бой с Водяным в три этапа |
| `21_sky_31_32.md` | 3-1 «Сад молодильных яблок» и 3-2 «Облачные пастбища»: втрое длиннее, кооперативные механики, мини-боссы |
| `22_vodyanoy_proposals.md` | 2-Б «Водяной»: предложения — бой, эффекты, погоня с валом |
| `23_vfx_sfx.md` | VFX и SFX: предложения по souls-like и семейным кооперативным играм |
| `23_vodyanoy_boss.md` | 2-Б «Водяной»: бой в четыре этапа, вода и вал, погоня вдвое длиннее |
| `24_koschei_proposals.md` | 5-Б2 «Кощей Бессмертный и Златая цепь»: предложения — финал на голову выше 2-Б |
| `25_solovei_proposals.md` | 3-Б «Соловей-Разбойник»: предложения — бой, эффекты, подход к гнезду |
| `26_solovei_boss.md` | 3-Б «Соловей-Разбойник»: подход к гнезду и бой по былине |
| `27_kids_world1.md` | Мир 1 для детей 7–11 лет |
| `27_koschei_epic_proposals.md` | 5-Б2 «Кощей Бессмертный и Златая цепь»: предложение — эпический финал в 12 стадий |
| `28_koschei_epic_build.md` | Битва с Кощеем — отдельная сборка (k5epic): как собрать, проверить и продолжить |
| `29_leshy_proposals.md` | 1-Б «Леший-Путаник»: предложения — бой, этапы, хоровод |
| `30_simulated_playtest.md` | Симулированный плейтест (final06): боты по возрастным группам |
| `31_plan_posle_simulirovannogo_playtesta.md` | План правок игры по итогам симулированного плейтеста |
| `32_prompt_dlya_novoy_sessii.md` | Промт для новой сессии: работа с версией «по итогам симулированного плейтеста» |
| `33_boss_standard.md` | 33. Боевая библия боссов «Златой цепи» (стандарт для 7–10 лет) |
| `34_boss_audit.md` | 34. Аудит боссов «Златой цепи»: матрица, метрики, бэклог |
| `35_boss_observation.md` | 35. Протокол наблюдения за ребёнком у босса (печатная форма, сценарий ведущего, итоги) |
| `36_boss_voice_lines.md` | 36 · Строки боссов к записи голоса (F-10) |
| `CHANGELOG.md` | Изменения |
| `changes/` | 44 файлов |
| `feedback/` | 7 файлов |
| `rabota.md` | Работа в репозитории — подробности |
| `screens/` | 26 файлов |
| `script/` | 8 файлов |

Ботов всего: 214 (`tools/tests/bots/`); без уровня (меню, сохранения, общие проверки) — те, у кого нет `LV('…')`.
<!-- map:auto:end -->
