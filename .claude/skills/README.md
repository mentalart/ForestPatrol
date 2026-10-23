# Навыки Claude для «Златой цепи»

Подгружаются сами, когда задача подходит по описанию (`description` в `SKILL.md`), или по имени: `/kino-rezhisser`.

| Навык | Откуда | Когда |
|---|---|---|
| `kino-rezhisser` | свой | постановка, переделка, аудит роликов (катсцен) |
| `uroven-audit` | свой, по мотивам `level-design` ([gamedev-skills/awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) `0a70cfc`, Apache-2.0) и `build-playability-review`, `player-experience` ([fagemx/gstack-game](https://github.com/fagemx/gstack-game) `7259ab9`, MIT) | геймдизайнерский аудит уровня: задачи, обучение, темп, прыжки, вдвоём/соло, провал, пик — оценка /14 |
| `sochnost` | свой, по мотивам `game-feel` (awesome-gamedev-agent-skills, Apache-2.0) и `feel-pass` (gstack-game, MIT) | ощущение от действий (game feel): цепочка отклика, оценка /14, правки на слоях `late_91*` в пределах комфорта |
| `perekladka` | свой | перекладка (cut-out) 2D-мультсериала: позы, замах, захлёст, пружина, липсинк, игра, темп монтажа 9:16, оценка /14 |
| `threejs-shaders` | [CloudAI-X/threejs-skills](https://github.com/CloudAI-X/threejs-skills) `b1c6230` (20.01.2026), MIT (по README) | GLSL, `ShaderMaterial`, свои эффекты |
| `threejs-lighting` | там же | свет, тени, настроение сцены |
| `threejs-materials` | там же | выбор и настройка материалов |
| `threejs-debug-profiler` | [majidmanzarpour/threejs-game-skills](https://github.com/majidmanzarpour/threejs-game-skills) `8286774` (27.09.2026), MIT (`LICENSE` в папке) | ошибки отрисовки, тормоза, память |

**Сторонние навыки написаны под Three.js r160+ и Vite, игра — r128 без сборщика.** Поправки — `R128.md` (на него ссылается
каждый сторонний навык). Тексты навыков не переписаны, только добавлена пометка в начало — обновлять копированием из источника
с повторным добавлением пометки.
