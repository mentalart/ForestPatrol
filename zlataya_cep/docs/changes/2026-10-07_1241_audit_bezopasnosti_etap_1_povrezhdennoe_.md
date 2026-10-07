## Аудит безопасности, этап 1: повреждённое хранилище не ломает запуск и «Продолжить»
- Гардероб, настройки и сохранение из `localStorage` проверяются по типу: гардероб `{"owned":1,"wear":"x"}` раньше не давал игре запуститься, нечисловые `sfx`/`mus` роняли инициализацию звука, `{}`/`null`/не тот тип в сохранении ломали «Главы» и «Продолжить» (`02_render_heroes.js`, `fin_early.js`, `late_50_save.js`).
- Новый бот `tsec_storage` (в `regress_list_final.txt` и `affected_map.txt` у `late_50_save.js` и `fin_early.js`): на старом коде падает, на новом проходит.
- `tools/voice/fetch.js`: только https, `--` перед url, проверка `id` из `lines.json`; `bots.yml`: `permissions: contents: read`.
- Отчёт этапа — `zlataya_cep/docs/30_audit.md` (там же — что проверено без находок и решения для владельца).
