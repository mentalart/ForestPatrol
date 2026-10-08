#!/usr/bin/env python3
"""inv.py <boss> файлы... → TSV инвентаря строк: kind,file:line,call,words,voiced,text. Сводка в stderr."""
import sys,json,re,os,statistics
sys.path.insert(0,os.path.dirname(__file__))
import jsx
R=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))+'/'   # корень репозитория
vl=json.load(open(R+'zlataya_cep/build/voice/lines.json',encoding='utf-8'))['lines']
def norm(t): return re.sub(r'\s+',' ',re.sub(r'<[^>]*>','',t)).strip().lower().replace('ё','е')
VOX={}
for x in vl: VOX.setdefault(norm(x['text']),[]).append(x)
KIND={'tip':'TIP','banner':'BANNER','O':'OBJ','say':'SAY','sayP':'SAY','bark':'SAY','floatText':'FLOAT','prompt':'PROMPT','hitHero':'HINT','say2':'SAY'}
def classify(r):
    c=r['call'];k=r['key']
    if c in KIND:
        kd=KIND[c]
        if kd=='BANNER': return 'BANNER' if r['argi']==0 else 'BANNER_SUB'
        if kd=='SAY' and c=='bark' and r['argi']!=2: return 'OTHER'
        if kd=='SAY' and c=='say' and r['argi']!=1: return 'OTHER'
        if kd=='TIP' and r['argi']!=1: return 'OTHER'
        if kd=='OBJ' and r['argi']!=0: return 'OTHER'
        return kd
    if k=='says' or (c=='play' and k=='says'): return 'CUT'
    if c.endswith('tipZones.push') and k=='text': return 'TIPZONE'
    if k in('text','title','tag','go','okText'): return 'CARD_'+k
    if k in('say',): return 'LSAY'
    return 'OTHER'
def run(files):
    rows=[]
    for f in files:
        if f.endswith('.py'):continue
        try: rs,_,_,_=jsx.extract(R+f if not f.startswith('/') else f)
        except Exception as e: print('ERR',f,e,file=sys.stderr);continue
        for r in rs:
            tx=jsx.strip_html(r['text'])
            if len(tx)<3: continue
            kind=classify(r)
            n=jsx.nwords(tx)
            v=VOX.get(norm(tx))
            rows.append(dict(kind=kind,loc=os.path.basename(f)+':'+str(r['line']),call=r['call'],words=n,voiced=bool(v),text=tx))
    return rows
if __name__=='__main__':
    boss=sys.argv[1];rows=run(sys.argv[2:])
    os.makedirs(os.environ.get('BOSS_AUDIT_OUT','/tmp/boss_audit'),exist_ok=True)
    with open(os.environ.get('BOSS_AUDIT_OUT','/tmp/boss_audit')+f'/inv_{boss}.tsv','w',encoding='utf-8') as o:
        for r in rows: o.write('\t'.join([r['kind'],r['loc'],r['call'],str(r['words']),'V' if r['voiced'] else '',r['text']])+'\n')
    from collections import Counter
    c=Counter(r['kind'] for r in rows)
    print(boss,dict(c),file=sys.stderr)
    for kd in ('TIP','BANNER','BANNER_SUB','OBJ','TIPZONE','SAY','CUT','CARD_text','FLOAT','PROMPT','HINT','LSAY'):
        w=[r['words'] for r in rows if r['kind']==kd]
        if w: print(f"  {kd:11} n={len(w):3} mean={statistics.mean(w):5.1f} med={statistics.median(w):4.1f} max={max(w):3} >10={sum(1 for x in w if x>10):3} voiced={sum(1 for r in rows if r['kind']==kd and r['voiced'])}",file=sys.stderr)
