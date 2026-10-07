# Симулированный плейтест «Златой цепи» (боты по возрастным группам)

Набор для прогона игры «возрастными» ботами и заполнения четырёх опросников (`zlataya_cep/docs/feedback/opros_*.html`) по итогам прогона.
Результат первого прогона — `zlataya_cep/docs/30_simulated_playtest.md` (суммарная статистика, выводы) и архив с заполненными опросниками.

> **Это симуляция, а не исследование.** Ни один ответ не принадлежит живому человеку. Числа из движка (бой, тексты, ролики, цели уровней) измерены ботами
> в настоящей игре; всё, что про людей (скорость чтения, понимание задач, терпение, вкус, «любимый герой»), — допущения `personas.json`.
> Каждая цифра в отчёте помечена базой: **[ДВИЖОК]**, **[МОДЕЛЬ]** или **[ПЕРСОНА]**. Выводы проверять живым плейтестом (сценарий — `docs/27_kids_world1.md`).

## Из чего состоит

| Файл | Что делает |
|---|---|
| `build_pt.py` | копия релиза с `ZC.X(код)` — выполнить код внутри области видимости игры (`out/pt_build.html`; игра и репозиторий не меняются) |
| `pt_scope.js` | телеметрия: подсказки, реплики, баннеры, ролики, цели, попадания, падения, спавн морок (обёртки над функциями игры) |
| `pt_persona.js` | «человеческий» боевой контроллер: задержка реакции, разброс нажатия, привычка держать щит, пропуски внимания, упреждение, обучение; арена `PT.arena` |
| `run_oracle.js` | прогон существующего бота уровня (`tools/tests/bots/*.js`) как «оракула» (идеальная игра) с телеметрией |
| `static_levels.js` | тексты задач обоих игроков, подсказки зон и т. п. по всем 36 уровням → `data/level_static.json` |
| `profile_levels.py` | профили уровней (задачи, слова, ролики, встречи с мороками) из статики и прогонов оракулов → `data/level_profiles.json` |
| `personas.json`, `make_roster.py` | возрастные профили и состав: 10 пар (20 человек) + 5 одиночек → `data/roster.json` |
| `fight_probe.js` | сессия (пара/одиночка) проходит все встречи с мороками в движке по порядку кампании; меняет «путь» после провалов → `data/probe_*.json` |
| `sim_sessions.py` | модель сессий: чтение, понимание задач, застревание, парная работа, бой (из проб), ритм, усталость и уход → `data/sessions.json` |
| `fill_core.py`, `fill_surveys.py`, `texts_ru.py` | ответы персон на опросники (учёт `showIf`, лимитов, того, что человек видел) → `data/answers/` |
| `render_forms.js` | открывает настоящие страницы опросников, подставляет ответы и сохраняет штатной кнопкой «Сохранить файлом» → `out/forms/*.json` (формат `zc-opros-v1`) |
| `aggregate.py`, `charts.py`, `sensitivity.py` | суммарная статистика, графики, устойчивость выводов к допущениям модели |

## Как повторить

```sh
python3 zlataya_cep/build/build_final.py                 # релиз final06 (его нет в git)
python3 tools/playtest/build_pt.py                       # патч ZC.X
python3 tools/playtest/make_roster.py                    # состав
node tools/playtest/static_levels.js                     # тексты и задачи уровней
# оракулы (долго; нужные боты — список в README ниже или свой): node tools/playtest/run_oracle.js t11 → out/oracle/t11.json
python3 tools/playtest/profile_levels.py                 # профили уровней
node tools/playtest/fight_probe.js P01,P02,SR21 data/probe_w1.json   # бой по сессиям (≈6 мин на пару; можно в несколько процессов)
python3 tools/playtest/sim_sessions.py                   # телеметрия сессий
python3 tools/playtest/fill_surveys.py && node tools/playtest/render_forms.js   # опросники
python3 tools/playtest/aggregate.py && python3 tools/playtest/charts.py && python3 tools/playtest/sensitivity.py
```
Боты оракулов первого прогона: `t11 t12long t12n tso12long t13v tfin_kolobok tso13 tfin_kidnap14 t15n thub2 t1b tfin_k1b tfin_k1b3 tfin_k1b3solo tfin_k1bcine tfin_k1bhands tfin_k1bhide t21 t21x tfin_k21 tfin_k21foes t22d tfin_k22 t23f tfin_k23 t24n tfin_k24 t25c tfin_k25 t2c tfin_k2b tfin_k2bboss tfin_k2bmill t31 t31c tfin_sky31 tfin_sky31boss t32 tfin_sky32 tfin_sky32boss t33n tso33 t34 t35 t3bv tfin_k3b tfin_k3bboss t41v t42v t43 t44 t45 t4b tfin_boss4b tfin_gor4 t51 t53 t54 tso54 t5b1 t5b2 tk5e_flow tk5e_prolog tepi tluko tfin_luko thub9 tzast tpjump tfin_scooter tfin_prolog_night`.

## Допущения, которые стоит оспорить (и где они лежат)
- Реакция, разброс нажатий, внимание, привычка держать щит, склонность отбивать/кувыркаться — `personas.json` (`rt`, `timeSd`, `lapse`, `habitHold`, `pParry`, `pRoll`).
- Скорость чтения (симв./с), понимание задач (`COMP` в `sim_sessions.py`), среднее время «застревания», доля пропуска роликов, риск бросить игру — `personas.json`, `sim_sessions.py`.
- Арена не умеет «инструментальные» победы (рогатка, свет пера, лава): такие морок заменены ближайшими по знаку (`SURR` в `fight_probe.js`); боссы — по одному-трём боям + множитель этапов.
- Ответы на опросники про вкус (любимое, смешное, красивое) — случайные по чертам персоны; их нельзя читать как популярность.
- `sensitivity.py` пересчитывает модель с другим зерном и сдвигами допущений и показывает, какие выводы устойчивы.
