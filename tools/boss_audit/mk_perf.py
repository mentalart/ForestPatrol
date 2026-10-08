#!/usr/bin/env python3
"""mk_perf.py — нагрузка на отрисовку по боссам (вызовы, треугольники, частицы) из логов run_bot.sh.

Читает $BOSS_AUDIT_OUT/<бот>.json (по спискам ботов из metrics.B), печатает таблицу Markdown и пишет perf.json.
Не берёт: кадры загрузки уровня (≥ 1200 вызовов — сцена ещё не собрана), первые 12 с лога (или `tmin` босса из metrics.B),
логи, где значения не менялись десятки секунд (устаревший перехватчик). Время кадра не выводится: в программном
рендере (SwiftShader) оно показывает только относительную нагрузку.
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import metrics

OUT = metrics.OUT


def q(a, p):
    a = sorted(a)
    return a[min(len(a) - 1, int(len(a) * p))]


rows = []
raw = {}
for name, cfg in metrics.B.items():
    ev = []
    for log in cfg['logs']:
        f = f'{OUT}/{log}.json'
        if not os.path.exists(f):
            continue
        try:
            d = json.load(open(f))
        except Exception:
            continue
        a = [e for e in d if isinstance(e, dict) and e.get('k') == 'perf' and 'calls' in e]
        same = sum(1 for x, y in zip(a, a[1:]) if (x['calls'], x['tri']) == (y['calls'], y['tri']))
        if len(a) >= 8 and same > 0.4 * len(a):
            continue  # устаревшие замеры
        for e in a:
            if e.get('lv') in cfg['lv'] and e.get('t', 0) >= cfg.get('tmin', 12) and e['calls'] < 1200:
                ev.append((e['calls'], e['tri'], e['fx'], log))
    if not ev:
        rows.append((name, 0))
        continue
    c = [e[0] for e in ev]
    t = [e[1] for e in ev]
    f = [e[2] for e in ev]
    where = max(ev, key=lambda e: e[0])[3]
    rows.append((name, len(ev), q(c, .5), q(c, .95), max(c), q(t, .95) // 1000, max(t) // 1000, q(f, .95), max(f), where))
    raw[name] = dict(n=len(ev), callsP95=q(c, .95), callsMax=max(c), triP95=q(t, .95), triMax=max(t),
                     fxP95=q(f, .95), fxMax=max(f), maxCallsIn=where)
json.dump(raw, open(f'{OUT}/perf.json', 'w'), ensure_ascii=False, indent=1)
print('| Бой | замеров | вызовы: мед. / p95 / макс. | треугольники, тыс.: p95 / макс. | частицы: p95 / макс. | максимум вызовов — где |')
print('|---|---|---|---|---|---|')
for r in rows:
    if r[1] == 0:
        print(f'| {r[0]} | 0 | нет замера | | | |')
    else:
        print(f'| {r[0]} | {r[1]} | {r[2]} / {r[3]} / {r[4]} | {r[5]} / {r[6]} | {r[7]} / {r[8]} | {r[9]} |')
