#!/usr/bin/env python3
"""metrics.py — сводные метрики боссов из логов перехватчика. Печатает JSON и таблицы Markdown."""
import json,os,re,sys,statistics as S,itertools
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import jsx
SP=os.path.dirname(os.path.abspath(__file__))
OUT=os.environ.get('BOSS_AUDIT_OUT','/tmp/boss_audit')   # сюда run_bot.sh пишет логи <бот>.json
B={
 '1-Б':dict(lv=['1-B'],logs=['tfin_k1b','tfin_k1bhands','tfin_k1bhide','tfin_k1b3','tfin_k1b3solo','tfin_k1bcine'],mul=2.5),
 '2-Б':dict(lv=['2-B'],logs=['tfin_k2bboss','tfin_k2b','tfin_k2bbosssolo','tfin_k2bmill'],mul=2.2),
 '3-Б':dict(lv=['3-B'],logs=['tfin_k3bboss','tfin_k3b','tfin_k3bbosssolo','tfin_k3bsolo'],mul=1.8),
 '4-Б':dict(lv=['4-B'],logs=['tfin_boss4b','tfin_gor4','tfin_uzda','tfin_gorend','tfin_gorsolo'],mul=1.0),
 '5-Б1':dict(lv=['5-B1'],logs=['t5b1'],mul=1.0),
 '5-Б2':dict(lv=['5-B2'],logs=['tk5e_flow','tk5e_lesson','tk5e_lesson2','tk5e_prolog','tk5e_solo','tk5e_smoke'],mul=1.0),
 'Ворон 3-1':dict(lv=['3-1'],logs=['tfin_sky31boss'],mul=1.8),
 'Баран 3-2':dict(lv=['3-2'],logs=['tfin_sky32boss'],mul=1.8),
 'Рак 2-1':dict(lv=['2-1'],logs=['tfin_k21'],mul=2.2,tmin=231),
 'Лихо 5-1':dict(lv=['5-1'],logs=['t51'],mul=1.0,tmin=240),
 'Яга 1-1':dict(lv=['1-1'],logs=['tfin_yaga11'],mul=2.5),
}
def inter(a,b):
    x=max(0,min(a[0]+a[2],b[0]+b[2])-max(a[0],b[0]));y=max(0,min(a[1]+a[3],b[1]+b[3])-max(a[1],b[1]));return x*y
def one(name,cfg):
    R=dict(boss=name,logs=[])
    tips={};bsub={};say={};cut={};plays={}
    shk=[];hs=0;fl=0;perf=[];ovl={}
    for lg in cfg['logs']:
        p=f'{OUT}/{lg}.json'
        if not os.path.exists(p): continue
        R['logs'].append(lg)
        ev=[e for e in json.load(open(p)) if e.get('lv') in cfg['lv'] and e['t']>=cfg.get('tmin',0)]
        cur={}
        for e in ev:
            k=e['k']
            if k=='tip': tips.setdefault(e['text'],dict(w=jsx.nwords(e['text']),d=(e['dur'] or 2)*cfg['mul']))
            elif k=='banner':
                if e.get('sub'): bsub.setdefault(e['sub'],dict(w=jsx.nwords(e['sub']),d=(e['dur'] or 1.5)*cfg['mul']))
            elif k in('say','sayP'): say.setdefault((e.get('who',''),e['text']),dict(w=jsx.nwords(e['text']),v=e.get('v',0)>0,d=e.get('dur') or 2.5))
            elif k=='play':
                key=(e['dur'],tuple(s['text'][:20] for s in e['says'][:2]))
                plays.setdefault(key,dict(dur=e['dur'],n=len(e['says']),v=sum(1 for s in e['says'] if s['v']>0)))
                for s in e['says']: cut.setdefault((s['who'],s['text']),dict(w=jsx.nwords(s['text']),v=s['v']>0,d=s['d']))
            elif k=='shake': shk.append((e['t'],e['a']))
            elif k=='hitstop': hs+=1
            elif k=='flash': fl+=1
            elif k=='perf' and 'ms' in e: perf.append(e)
            elif k=='dom':
                if e['rect'] and e['text']: cur[e['id']]=(e['rect'],e['text'])
                else: cur.pop(e['id'],None)
                for (a,(ra,ta)),(b,(rb,tb)) in itertools.combinations(cur.items(),2):
                    if e['id'] not in(a,b) or 'skaz' in (a,b) or 'card' in (a,b): continue
                    ar=inter(ra,rb)
                    if ar>0:
                        pc=100*ar/min(ra[2]*ra[3],rb[2]*rb[3]);key=tuple(sorted((a,b)))
                        if pc>ovl.get(key,0): ovl[key]=pc
    def agg(D,withd=True):
        if not D: return None
        w=[v['w'] for v in D.values()];r=dict(n=len(D),mean=round(S.mean(w),1),mx=max(w),gt7=sum(1 for x in w if x>7),share7=round(100*sum(1 for x in w if x>7)/len(w)))
        if withd:
            rt=[v['w']/v['d'] for v in D.values() if v['d']]
            r.update(dur=round(S.mean(v['d'] for v in D.values()),1),ok7=sum(1 for x in rt if x<=0.5),ok10=sum(1 for x in rt if x<=1.7),rate=round(S.mean(rt),2))
        return r
    R['tip']=agg(tips);R['bsub']=agg(bsub)
    R['say']=agg(say,False);R['cut']=agg(cut,False)
    R['voiced']=(sum(1 for v in say.values() if v['v'])+sum(1 for v in cut.values() if v['v']),len(say)+len(cut))
    R['plays']=sorted((p['dur'],p['n'],p['v']) for p in plays.values())
    R['shake_max']=max([a for _,a in shk] or [0]);
    ts=sorted(t for t,_ in shk);pk=0;j=0
    for i,t in enumerate(ts):
        while ts[j]<t-1:j+=1
        pk=max(pk,i-j+1)
    R['shake_peak']=pk;R['hitstop']=hs;R['flash']=fl
    R['ovl']={'×'.join(k):round(v) for k,v in ovl.items() if v>=10}
    if perf:
        ms=sorted(e['ms'] for e in perf);R['perf']=dict(n=len(perf),med=ms[len(ms)//2],p95=ms[min(len(ms)-1,int(len(ms)*0.95))],mx=ms[-1],calls=max(e['calls'] for e in perf),tri=max(e['tri'] for e in perf),fx=max(e['fx'] for e in perf))
    return R
if __name__=='__main__':
    out=[one(n,c) for n,c in B.items()]
    json.dump(out,open(f'{OUT}/metrics.json','w'),ensure_ascii=False,indent=1)
    for r in out:
        print(r['boss'],'logs',r['logs'])
        for k in('tip','bsub','say','cut'): print('  ',k,r[k])
        print('   озвучено',r['voiced'],'ролики',[(d,n,v) for d,n,v in r['plays']])
        print('   тряска max',r['shake_max'],'пик/с',r['shake_peak'],'hitstop',r['hitstop'],'flash',r['flash'],'перекрытия',r['ovl'])
        if 'perf' in r: print('   perf',r['perf'])
