Ты генерируешь озвучку через ElevenLabs MCP (инструменты mcp__5a8636a7-de9b-4e0e-b2cf-d0716a3436db__creative_*; схемы загрузи через ToolSearch: "select:mcp__5a8636a7-de9b-4e0e-b2cf-d0716a3436db__creative_generate_speech,mcp__5a8636a7-de9b-4e0e-b2cf-d0716a3436db__creative_get_flow_run_status").

Файл заданий: JOBS (JSON-массив {id, vid, prompt, ...}). Лог: LOG (строки «id session_id»). Результат каждого задания — /home/user/ForestPatrol/tools/voice/raw/<id>.mp3.

Порядок:
1. Прочитай файл заданий (python3/cat). Пропусти задания, у которых файл raw/<id>.mp3 уже есть (непустой). Если в логе уже есть session_id для задания, а файла нет — НЕ генерируй заново: только запроси статус по этому session_id и скачай.
2. Пачками по 9 заданий: в ОДНОМ сообщении до 9 вызовов creative_generate_speech с параметрами: flow_id "SXsFkJd1Ogdn2W0FRay3", model_id "eleven_v4", voice_id = vid, prompt = prompt (ровно как в файле, с тегами в квадратных скобках), generations_count 1, language "ru" если такой параметр есть. Сразу допиши в LOG строки «id session_id» (echo >>).
3. Подожди (poll_after_seconds; используй `sleep` в Bash не дольше нужного, если запрещён — просто следующий вызов), затем ОДИН вызов creative_get_flow_run_status по всем session_ids пачки. Если не всё готово — повтори статус позже. Для каждого готового: `curl -sSL -o /home/user/ForestPatrol/tools/voice/raw/<id>.mp3 "<content_url>"`. Проверь размер > 1 КБ.
4. Следующая пачка.

Правила: НИКОГДА не повторяй вызов генерации для задания, у которого уже есть session_id (это тратит кредиты). Если генерация упала (has_failures) — запиши id в LOG как «id FAILED <причина>» и иди дальше, не повторяй. Не правь никаких файлов репозитория, кроме raw/ и LOG.
В конце ответь кратко: сколько файлов скачано, список id без файла (и причины). Без пересказа ответов статуса.
