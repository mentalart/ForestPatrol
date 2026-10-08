#!/usr/bin/env python3
"""Проверка заполненных опросников (out/forms/*.json) по описанию опросов (data/surveys/survey_*.json): тип и допустимость значения каждого ответа,
лимиты «до N», условия показа (showIf), полнота. Печатает нарушения и долю отвеченных видимых вопросов. Запуск: python3 tools/playtest/validate_forms.py"""
import json,os,glob,collections
HERE=os.path.dirname(os.path.abspath(__file__));D=os.path.join(HERE,'data')
SV={k:json.load(open(os.path.join(D,'surveys',f'survey_{k}.json'),encoding='utf-8')) for k in('7-8','9-10','11-13','14plus')}
bad=[];cover=[]
for f in sorted(glob.glob(os.path.join(HERE,'out','forms','R*_*.json'))):
    d=json.load(open(f,encoding='utf-8'));key=os.path.basename(f).split('_',1)[1][:-5];S=SV[key];A=d['answers']
    Q={q['id']:q for s in S['sections'] for q in s['q']}
    def vis(q):
        c=q.get('showIf')
        if not c: return True
        if not vis(Q[c['q']]): return False
        v=A.get(c['q'])
        if v in(None,'',[]): return False
        arr=v if isinstance(v,list) else [v]
        if 'in' in c: return any(x in c['in'] for x in arr)
        if 'not' in c: return not any(x in c['not'] for x in arr)
        if 'lte' in c: return isinstance(v,(int,float)) and v<=c['lte']
        return True
    for qid,v in A.items():
        q=Q.get(qid);err=None
        if not q: bad.append((d['respondent']['id'],qid,'нет такого вопроса'));continue
        t=q['t'];opts=[o['v'] if isinstance(o,dict) else o for o in q.get('o',[])]
        if t in('chips','pick'):
            vals=v if isinstance(v,list) else [v]
            if q.get('multi') and not isinstance(v,list): err='ожидался список'
            if not q.get('multi') and isinstance(v,list): err='ожидалось одно значение'
            ok=set(opts)|({q['none']} if q.get('none') else set())
            if any(x not in ok for x in vals): err=err or 'значение не из вариантов: '+str([x for x in vals if x not in ok])
            if q.get('max') and isinstance(v,list) and len(v)>q['max']: err=err or 'больше лимита'
        elif t=='faces':
            n=q.get('n') or S['faces']
            if not (isinstance(v,int) and 1<=v<=n): err='рожица вне 1..%d'%n
        elif t=='scale':
            if not (isinstance(v,int) and 1<=v<=q.get('n',5)): err='шкала вне диапазона'
        elif t=='stars':
            if not (isinstance(v,int) and 1<=v<=5): err='звёзды вне 1..5'
        elif t=='nps':
            if not (isinstance(v,int) and 0<=v<=10): err='NPS вне 0..10'
        elif t=='yesno':
            if v not in(q.get('o') or ['Да','Нет','Не знаю']): err='не да/нет'
        elif t=='matrix':
            rows=[r['v'] if isinstance(r,dict) else r for r in q['rows']]
            if not isinstance(v,dict) or any(k not in rows for k in v) or any(not(x=='na' or (isinstance(x,int) and 1<=x<=5)) for x in v.values()): err='матрица: неверные строки/значения'
        elif t=='text':
            if not isinstance(v,str) or not v.strip(): err='пустой текст'
        elif t=='draw':
            if not (isinstance(v,str) and v.startswith('data:image')): err='рисунок не data URL'
        if err: bad.append((d['respondent']['id'],qid,err))
    total=sum(1 for q in Q.values() if vis(q));answered=sum(1 for q in Q.values() if vis(q) and q['id'] in A)
    cover.append((d['respondent']['id'],key,answered,total,d['answered'],d['total']))
print('нарушений:',len(bad))
for b in bad[:40]: print(' ',b)
print('полнота (мой счёт / счёт страницы):')
for c in cover: print(' ',c)
