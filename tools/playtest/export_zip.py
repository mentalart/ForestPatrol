#!/usr/bin/env python3
"""Собирает архив для передачи: заполненные опросники (JSON zc-opros-v1 + читаемый текст), отчёт со статистикой и выводами, графики, телеметрия, методика.
Запуск: python3 tools/playtest/export_zip.py [куда.zip]   (по умолчанию playtest_sim/zlataya-cep_simulated-playtest.zip в корне репозитория)"""
import json,os,sys,zipfile,glob,csv,io,shutil
HERE=os.path.dirname(os.path.abspath(__file__));D=os.path.join(HERE,'data');OUT=os.path.join(HERE,'out');ROOT=os.path.join(HERE,'..','..')
dest=sys.argv[1] if len(sys.argv)>1 else os.path.join(ROOT,'playtest_sim','zlataya-cep_simulated-playtest.zip')
os.makedirs(os.path.dirname(dest),exist_ok=True)
roster=json.load(open(os.path.join(D,'roster.json'),encoding='utf-8'));byid={r['id']:r for r in roster}
sessions=json.load(open(os.path.join(D,'sessions.json'),encoding='utf-8'))
SESS={m:s for s in sessions.values() for m in s['members']}
TITLE={'7-8':'7–8 лет','9-10':'9–10 лет','11-13':'11–13 лет','14plus':'14 лет и взрослые'}
def plain(p,key):
    lines=[f"«Златая цепь» — опрос {TITLE[key]}",'СИМУЛЯЦИЯ: ответы построены моделью по телеметрии ботов, это не данные живых участников',f"Отправлено: {p['submittedAt']}",f"Ответов: {p['answered']} из {p['total']}",'']
    for s,q,a in p['qa']: lines+= [f'[{s}] {q}',f'→ {a}']
    return '\n'.join(lines)+'\n'
README='''СИМУЛИРОВАННЫЙ ПЛЕЙТЕСТ «ЗЛАТОЙ ЦЕПИ» (final06) — заполненные опросники, суммарная статистика, выводы
================================================================================================

ВАЖНО. Это симуляция, а не исследование. Ни один ответ не принадлежит живому человеку.
  • Что измерено в настоящей игре ботами [ДВИЖОК]: бой (боты-«игроки» разных возрастов играют встречи с мороками в движке), тексты и число задач,
    ролики, подсказки, спавн морок по всем 36 уровням.
  • Что про людей — допущения [МОДЕЛЬ]: скорость чтения, понимание задач, терпение, слаженность пары, склонность бросить игру (файл personas.json).
  • Ответы про вкус (любимый герой, смешное, красивое) [ПЕРСОНА] — случайны по чертам персоны; популярностью их считать нельзя.
Выводы нужно подтверждать живым плейтестом (чек-лист — в конце отчёта). В каждом файле опросника стоит "simulated": true.

Состав архива
  report/ОТЧЁТ.md, report/report.html  — суммарная статистика и выводы (html — самодостаточный, с графиками)
  report/charts/*.png                    — графики
  report/stats.json                      — все числа отчёта
  surveys_filled/<опрос>/R..._*.json     — заполненные опросники в формате страниц опроса (zc-opros-v1), как их отдаёт «Сохранить файлом»
  surveys_filled/<опрос>/R..._*.txt      — то же в читаемом виде («Скопировать ответы»)
  surveys_filled/respondents.csv         — кто есть кто: группа, возраст, роль, режим, пара, путь сложности, часов в игре, дошёл ли до конца
  telemetry/                             — состав, сессии по уровням, профили уровней, результаты боевых проб, чувствительность модели
  method/                                — методика и параметры возрастных профилей (personas.json, README.md)
Код ботов и моделей — в репозитории: tools/playtest/ (ветка claude/dreamy-pasteur-1n2mmp).
'''
def main():
    zf=zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED)
    zf.writestr('README.txt',README)
    # опросники
    rows=[]
    for f in sorted(glob.glob(os.path.join(OUT,'forms','R*_*.json'))):
        d=json.load(open(f,encoding='utf-8'));rid=d['respondent']['id'];key=os.path.basename(f).split('_',1)[1][:-5]
        date=d['submittedAt'][:10]
        base=f"surveys_filled/{key}/{rid}_zlataya-cep_opros_{key}_{date}"
        zf.writestr(base+'.json',json.dumps(d,ensure_ascii=False,indent=1))
        zf.writestr(base+'.txt',plain(d,key))
        r=byid[rid];s=SESS[rid]
        rows.append([rid,TITLE[key],r['age'],r['role'],'вдвоём' if r['mode']=='pair' else 'один',r['pair'] or '',r.get('partner') or '',r['path'],s['final_paths'][rid],round(s['total_min']/60,1),
                     'да' if s['reached_end'] else 'нет',s['quit_level'] or '',d['answered'],d['total']])
    buf=io.StringIO();w=csv.writer(buf);w.writerow(['id','опрос','возраст','роль','режим','пара','напарник','путь сначала','путь в конце','часов в игре','дошёл до конца','ушёл на уровне','ответов','из']);w.writerows(rows)
    zf.writestr('surveys_filled/respondents.csv','﻿'+buf.getvalue())
    # отчёт
    rp=os.path.join(OUT,'report')
    for name,arc in(('ОТЧЁТ.md','report/ОТЧЁТ.md'),('report.html','report/report.html')):
        if os.path.exists(os.path.join(rp,name)): zf.write(os.path.join(rp,name),arc)
    for f in sorted(glob.glob(os.path.join(rp,'charts','*.png'))): zf.write(f,'report/charts/'+os.path.basename(f))
    zf.write(os.path.join(D,'stats.json'),'report/stats.json')
    # телеметрия
    for n in('roster.json','sessions.json','level_profiles.json','sensitivity.json'):
        if os.path.exists(os.path.join(D,n)): zf.write(os.path.join(D,n),'telemetry/'+n)
    merged={}
    for f in sorted(glob.glob(os.path.join(D,'probe_w*.json'))): merged.update(json.load(open(f,encoding='utf-8')))
    zf.writestr('telemetry/combat_probes.json',json.dumps(merged,ensure_ascii=False))
    for n,arc in(('personas.json','method/personas.json'),('README.md','method/README.md')): zf.write(os.path.join(HERE,n),arc)
    zf.close();print(dest,round(os.path.getsize(dest)/1024),'КБ')
main()
