import json,os
OUT=os.environ.get('BOSS_AUDIT_OUT','/tmp/boss_audit')
M={r['boss']:r for r in json.load(open(OUT+'/metrics.json'))}
order=['1-Б','2-Б','3-Б','4-Б','5-Б1','5-Б2']
mini=['Яга 1-1','Рак 2-1','Ворон 3-1','Баран 3-2','Лихо 5-1']
f=lambda x:('%.1f'%x).replace('.',',')
def row_text(k):
    r=M[k];t=r['tip'];b=r['bsub']
    cell=lambda d,key:'—' if not d else d[key]
    ts='—' if not t else f"{t['n']} × {f(t['mean'])} ({t['mx']})"
    t7='—' if not t else f"{t['share7']} %"
    td='—' if not t else f(t['dur'])
    t10='—' if not t else f"{t['ok10']} из {t['n']}"
    bs='—' if not b else f"{b['n']} × {f(b['mean'])} ({b['mx']})"
    b10='—' if not b else f"{b['ok10']} из {b['n']}"
    v=r['voiced'];vs=f"{v[0]} из {v[1]} ({round(100*v[0]/max(1,v[1]))} %)"
    return f"| {k} | {ts} | {t7} | {td} | {t10} | {bs} | {b10} | {vs} |"
out=[]
out.append("| Босс | `TIP`: шт. × слов (макс.) | `TIP` длиннее 7 слов | `TIP` на экране, с (с tipMul) | `TIP` читаемы 10-леткой (≤ 1,7 сл/с) | Подписи баннера: шт. × слов (макс.) | читаемы 10-леткой | Озвучено реплик |")
out.append("|---|---|---|---|---|---|---|---|")
for k in order+mini: out.append(row_text(k))
out.append("")
out.append("| Босс | Ролики внутри боя, с (по порядку) | Сумма, с |")
out.append("|---|---|---|")
for k in order+mini:
    pl=[p[0] for p in M[k]['plays']]
    if k=='5-Б2':
        out.append("| 5-Б2 | 23 урока: 12 стадийных (39–69 с, сумма 611 с) + 11 прочих (дверь, «репка», поездки, пролог; 14–69 с, сумма 341 с); 14 роликов стадий в `tk5e_flow`: 9–58 с, сумма 238 с | **952 + ≈ 240 = ≈ 1190** |")
        continue
    if k=='4-Б':
        out.append("| 4-Б | вход 20; рык 6,8; **обучение этапов 48,7 + 51,6 + 37,2 (интерактивное, предел)**; напоминание 4,8; финал 32,5 | 201,6 (из них обучение 137,5) |")
        continue
    out.append(f"| {k} | {', '.join(str(round(x,1)).replace('.',',') for x in pl) or '—'} | {f(sum(pl))} |")
out.append("")
out.append("| Босс | Тряска: макс. / пик в секунду | hit-stop (шт.) | вспышки `#flash` | Перекрытия HUD (≥ 10 % меньшего окна) |")
out.append("|---|---|---|---|---|")
for k in order+mini:
    r=M[k];ov='; '.join(f"{a} {b} %" for a,b in r['ovl'].items()) or '—'
    out.append(f"| {k} | {('%.2f'%r['shake_max']).replace('.',',')} / {r['shake_peak']} | {r['hitstop']} | {r['flash']} | {ov} |")
open(OUT+'/metrics_tables.md','w',encoding='utf-8').write('\n'.join(out))
print('\n'.join(out))
