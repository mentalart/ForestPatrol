#!/usr/bin/env python3
"""hints.py <boss> <tipMul> log1.json log2.json ... → таблица реально показанных текстов (tip/banner/say/play-says/dom-карточки)"""
import json,sys,re,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import jsx
boss=sys.argv[1];mul=float(sys.argv[2]);logs=sys.argv[3:]
OUT=os.environ.get('BOSS_AUDIT_OUT','/tmp/boss_audit')
rows={}  # key (kind,text) -> dict
def add(kind,text,t,dur=None,src='',extra=None):
    text=text.strip()
    if not text: return
    k=(kind,text)
    r=rows.setdefault(k,dict(kind=kind,text=text,n=0,t0=t,dur=dur,src=set(),words=jsx.nwords(text),extra=extra))
    r['n']+=1;r['t0']=min(r['t0'],t);r['src'].add(src)
    if dur is not None: r['dur']=dur
VIS={}
for lg in logs:
    ev=json.load(open(lg));nm=os.path.basename(lg).replace('.json','')
    last={}
    for e in ev:
        if e['k']=='dom' and e['id'] in('hint0','hint1','hintS','finBossHint','finTut','banner','subs'):
            if e['id'] in last:
                t0,tx=last[e['id']]
                if tx: VIS.setdefault((e['id'],tx),[]).append(e['t']-t0)
            last[e['id']]=(e['t'],e['text'])
    for e in ev:
        k=e['k']
        if k=='tip': add('TIP',e['text'],e['t'],(e['dur'] or 2)*mul,nm)
        elif k=='banner':
            add('BANNER',e['text'],e['t'],(e['dur'] or 1.5)*mul,nm)
            if e.get('sub'): add('BANNER_SUB',e['sub'],e['t'],(e['dur'] or 1.5)*mul,nm)
        elif k in('say','sayP'):
            add('SAY',(e.get('who','')+': ' if e.get('who') else '')+e['text'],e['t'],e.get('dur') or 2.5,nm,extra='V%.1f'%e['v'] if e.get('v',0)>0 else '')
        elif k=='play':
            for s in e['says']:
                add('CUTSAY',(s['who'] or '')+': '+s['text'],e['t']+s['t'],s['d'],nm,extra='V%.1f'%s['v'] if s['v']>0 else '')
        elif k=='dom' and e['id'] in('hint0','hint1','hintS','finBossHint','finTut','card'):
            add('DOM_'+e['id'],e['text'],e['t'],None,nm,extra='fs=%s'%e['fs'])
        elif k=='prompt' and e.get('note'): add('PROMPT',e['note'],e['t'],None,nm)
        elif k=='float': add('FLOAT',e['text'],e['t'],None,nm)
for r in rows.values():
    if r['kind'].startswith('DOM_'):
        v=VIS.get((r['kind'][4:],r['text']))
        if v: r['dur']=max(v);r['extra']=(r.get('extra') or '')+' vis_n=%d vis_med=%.1f'%(len(v),sorted(v)[len(v)//2])
out=sorted(rows.values(),key=lambda r:(r['kind'],r['t0']))
with open(f'{OUT}/hints_{boss}.tsv','w',encoding='utf-8') as f:
    for r in out:
        rate=(r["words"]/r["dur"]) if (r.get("dur") and not r["kind"].startswith("DOM_")) else ""
        f.write('\t'.join([r['kind'],'%.1f'%r['t0'],str(r['n']),str(r['words']),'' if r['dur'] is None else '%.1f'%r['dur'],'' if rate=='' else '%.2f'%rate,r.get('extra') or '',r['text'][:200]])+'\n')
import statistics as S
print(boss,'уникальных',len(out))
for kd in ('TIP','BANNER','BANNER_SUB','SAY','CUTSAY','DOM_hintS','DOM_hint0','DOM_hint1','DOM_finBossHint','DOM_finTut','FLOAT'):
    rs=[r for r in out if r['kind']==kd]
    if not rs: continue
    w=[r['words'] for r in rs];d=[r for r in rs if r.get('dur') and not r['kind'].startswith('DOM_')]
    s=f"  {kd:16} n={len(rs):3} слов: ср={S.mean(w):4.1f} макс={max(w):2} >7={sum(1 for x in w if x>7):2}"
    if d:
        rt=[r['words']/r['dur'] for r in d]
        s+=f" | на экране ср={S.mean(r['dur'] for r in d):4.1f} с | темп ср={S.mean(rt):4.2f} сл/с, >0.5 (7л)={sum(1 for x in rt if x>0.5)}/{len(d)}, >1.2 (9л)={sum(1 for x in rt if x>1.2)}/{len(d)}, >1.7 (10л)={sum(1 for x in rt if x>1.7)}/{len(d)}"
    print(s)
