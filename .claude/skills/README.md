# Навыки Claude для «Златой цепи»

Подгружаются сами, когда задача подходит по описанию (`description` в `SKILL.md`), или по имени: `/kino-rezhisser`.

| Навык | Откуда | Когда |
|---|---|---|
| `kino-rezhisser` | свой | постановка, переделка, аудит роликов (катсцен) |
| `threejs-shaders` | [CloudAI-X/threejs-skills](https://github.com/CloudAI-X/threejs-skills) `b1c6230` (20.01.2026), MIT (по README) | GLSL, `ShaderMaterial`, свои эффекты |
| `threejs-lighting` | там же | свет, тени, настроение сцены |
| `threejs-materials` | там же | выбор и настройка материалов |
| `threejs-debug-profiler` | [majidmanzarpour/threejs-game-skills](https://github.com/majidmanzarpour/threejs-game-skills) `8286774` (27.09.2026), MIT (`LICENSE` в папке) | ошибки отрисовки, тормоза, память |

**Сторонние навыки написаны под Three.js r160+ и Vite, игра — r128 без сборщика.** Поправки — `R128.md` (на него ссылается
каждый сторонний навык). Тексты навыков не переписаны, только добавлена пометка в начало — обновлять копированием из источника
с повторным добавлением пометки.
