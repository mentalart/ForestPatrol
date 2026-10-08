#!/usr/bin/env python3
"""Симулятор сессий плейтеста: пары (10) и одиночки (5) проходят кампанию уровень за уровнем.
Откуда числа (метка «база» — что чем подтверждено):
  [ДВИЖОК]  встречи с мороками, падения, удары, время боя — fight_probe.js: контроллер «игрока» дерётся в настоящем движке (probe_*.json);
            тексты и число задач, ролики, подсказки, спавн — профили уровней из прогонов ботов-оракулов (level_profiles.json);
            подсказки игры застрявшему (через 10/13/20 с ореол цели, через 20/27/40 с показ действия) — документы игры.
  [МОДЕЛЬ]  чтение (скорость по возрасту), понимание задач, застревание, слаженность пары, усталость и уход из игры, ритм-нажатия, вкус —
            допущения personas.json и констант ниже; их можно менять и пересчитать.
Запуск: python3 tools/playtest/sim_sessions.py  → tools/playtest/data/sessions.json"""
import json,os,math,random,glob,re,collections
HERE=os.path.dirname(os.path.abspath(__file__));D=os.path.join(HERE,'data')
J=lambda n:json.load(open(os.path.join(D,n),encoding='utf-8'))
roster=J('roster.json');prof=J('level_profiles.json')
cat=json.load(open(os.path.join(HERE,'levels_catalog.json'),encoding='utf-8'));PER=json.load(open(os.path.join(HERE,'personas.json'),encoding='utf-8'))
byid={r['id']:r for r in roster}
probes={}
for f in sorted(glob.glob(os.path.join(os.environ.get('PT_PROBE_DIR',D),'probe_w*.json'))): probes.update(json.load(open(f,encoding='utf-8')))
SEED=20261007
ORDER=sorted(cat,key=lambda k:cat[k]['order'])
sessions={}
for r in roster: sessions.setdefault(r['pair'] if r['pair'] else 'S'+r['id'],[]).append(r['id'])

clamp=lambda x,a,b:max(a,min(b,x))
TUNE={'comp':0.0,'read':1.0,'conf':1.0,'nav':1.0,'skipcine':1.0}      # для анализа чувствительности (sensitivity.py): сдвиги допущений модели
if os.environ.get('SIM_TUNE'): TUNE.update(json.loads(os.environ['SIM_TUNE']))
rcps=lambda m:m['params']['readCps']*TUNE['read']
navf_=lambda m:m['params']['nav']*TUNE['nav']
# --- [МОДЕЛЬ] понимание задач: база и наклон по группе (вероятность понять цель с первого прочтения при нагрузке 1,5) ---
COMP={'7-8':(0.42,0.20),'9-10':(0.65,0.17),'11-13':(0.82,0.13),'14+':(0.93,0.09)}
SKIPCINE={'7-8':0.05,'9-10':0.10,'11-13':0.30,'14+':0.25}
QUIT={'7-8':(0.012,1.6),'9-10':(0.009,1.1),'11-13':(0.006,0.6),'14+':(0.004,0.3)}   # базовый риск бросить за уровень; рост от усталости за час
HINT=PER['hintSeconds'];ORDP={'easy':0,'mid':1,'hard':2}
RUNNER_SEC={'1-3':200,'3-3':300,'5-4':220}                    # длина ритм-уровней (песня), с
BOSS_STAGES={'1-B':3,'2-B':4,'3-B':4,'4-B':3,'5-B1':3,'5-B2':12}   # этапы босса (вики «Боссы»): арена даёт один этап
RHYTHM_WIN={'1-3':{'easy':0.20,'mid':0.12,'hard':0.06},'3-3':0.31,'5-4':0.32}   # окно попадания в долю, с (код уровней; в 1-3 — детская версия мира 1)
RHYTHM_NOTES={'1-3':90,'3-3':140,'5-4':100}
HUB={'forge':1.2,'shop':1.5,'garden':1.0,'hen':0.6,'tales':1.0,'zastava':2.5}   # минут за заход, если заходили

def norm_cdf(x): return 0.5*(1+math.erf(x/math.sqrt(2)))
def obj_load(o):
    words=re.findall(r'[А-Яа-яЁё]+',o['text']);lw=sum(1 for w in words if len(w)>=9)/max(1,len(words))
    return o['words']/12+0.8*o['keys']+0.9*o['coop']+0.7*o['swap']+4*lw

def simulate(sid,mids):
    members=[byid[i] for i in mids];solo=len(members)==1
    rng=random.Random(f'{SEED}-{sid}')
    probe=probes.get(sid)
    plog=collections.defaultdict(list)
    if probe:
        for e in probe['log']:
            if 'lv' in e: plog[e['lv']].append(e)
    pimap={m['id']:(0 if solo else m['seat']-1) for m in members}
    adult=[m for m in members if m['group']=='14+']
    child=[m for m in members if m['group']!='14+']
    support=bool(adult and child)                     # родитель/взрослый рядом с ребёнком
    has_voice=rng.random()<0.6                        # есть ли в браузере русский голос для «читать задачи вслух»
    res={'sid':sid,'members':mids,'solo':solo,'support':support,'has_voice':has_voice,'levels':[],'quit_level':None,'path_switches':[]}
    cum_min=0.0;alive=True;ent={m['id']:{'levels':0,'downs':0,'hits':0,'stuck_n':0,'stuck_sec':0.0,'asks':0,'unread':0,'cine_skipped':0,'min':0.0} for m in members}
    paths={m['id']:m['path'] for m in members}
    for lv in ORDER:
        if lv not in prof: continue
        P=prof[lv];C=cat[lv]
        if lv.startswith('z-'):   # Застава — по желанию (азарт и возраст)
            tries=[m for m in members if m['group']!='7-8' and m['traits']['collect']>0.45]
            if not tries or not alive: continue
        if not alive: break
        lrng=random.Random(f'{SEED}-{sid}-{lv}')
        pl=plog.get(lv,[])
        # путь на этом уровне — по последней записи пробы (там игроки меняют путь после провалов)
        if pl:
            for e in pl:
                if e.get('switched'): res['path_switches'].append({'lv':lv,'to':e['switched']})
            last=pl[-1]['paths'];
            for mid_,p in zip(probe['members'],last): paths[mid_]=p      # порядок — как в fight_probe.js (состав сессии)
        easiest=min(paths.values(),key=lambda p:-ORDP[p]) if False else max(paths.values(),key=lambda p:-ORDP[p])
        # самый лёгкий путь в паре задаёт окна босса и подсказки («закон щедрого окна» игры)
        kidsw=bool(C.get('kids'))
        h1,h2=(HINT['world1'] if kidsw else HINT['other'])[easiest]
        conf=TUNE['conf']*sum(m['params']['confuseMean'] for m in members)/len(members)*(0.8 if not solo else 1.0)
        rec={'lv':lv,'name':C['name'],'world':C['world'],'type':C['type'],'path':easiest,'read_s':0.0,'exec_s':0.0,'stuck_s':0.0,'cine_s':0.0,'combat_s':0.0,'down_s':0.0,'runner_s':0.0,
             'stuck':[],'asks':0,'unread':0,'understood':0,'objs':P['n_obj'],'enc':len(pl),'enc_fail':0,'members':{}}
        # ---------- ролики ----------
        skip=min(1,TUNE['skipcine']*sum(SKIPCINE[m['group']] for m in members)/len(members))
        cs=P['cine_sec']*(1-skip*0.8);rec['cine_s']=cs
        for m in members: ent[m['id']]['cine_skipped']+=skip*P['n_cine']
        # ---------- задачи ----------
        reader=max(members,key=rcps);fluent=rcps(reader)>=6
        for o in P['objectives']:
            ch=o['chars']
            if fluent: tr=ch/min(rcps(reader),14)*(1.3 if (len(members)>1 and any(m['group']!='14+' and rcps(m)<6 for m in members)) else 1.0)   # вслух — медленнее
            else: tr=ch/max(rcps(m) for m in members)
            tts=kidsw and has_voice and any(PER['groups'][m['group']]['readAloudP']>0.3 for m in members)
            if tts: tr=min(tr,ch/12.0)
            # понимание
            load=obj_load(o);ps=[]
            for m in members:
                b,sl=COMP[m['group']];p=b+TUNE['comp']-sl*(load-1.5)-0.12*C['demand']['l']*(1 if m['group'] in('7-8','9-10') else 0.5)
                p+=0.06*(m['gaming']-1)+0.15*(m['params']['readCps']*TUNE['read']/PER['groups'][m['group']]['readCps']-1)*(1 if m['group'] in('7-8','9-10') else 0.4)
                if tts and m['group'] in('7-8','9-10'): p+=0.12
                ps.append(clamp(p,0.03,0.98))
            if solo: pu=ps[0]
            else: pu=1-(1-ps[0])*(1-ps[1]*0.85)
            if not fluent and ch/max(rcps(m) for m in members)>25 and not tts: rec['unread']+=1   # задача не прочитана целиком
            understood=lrng.random()<pu
            if understood: rec['understood']+=1
            else:
                S=min(lrng.expovariate(1/conf),h2+8)
                helper=max(members,key=lambda m:ps[members.index(m)])
                if support and lrng.random()<max(ps)*0.9:
                    S=min(S,lrng.uniform(6,18));rec['asks']+=1
                    for m in child: ent[m['id']]['asks']+=1
                else:
                    S=max(S,min(h1,S+4))     # раньше ореола цели помощи ждать нечего
                rec['stuck'].append({'obj':o['idx'],'sec':round(S,1),'text':o['text'][:90]});rec['stuck_s']+=S
            # выполнение
            dt=o['dt'] if o['dt'] is not None else (P['dt_mean'] or 15.0)
            base=12+dt
            navs=[navf_(m) for m in members]
            navf=max(navs) if o['coop'] else sum(navs)/len(navs)
            lit=sum(m['params']['ctrlLiteracy'] for m in members)/len(members)
            coord=0.0
            if o['coop']: coord=(14*(1.6-0.6*lit)) if solo else 9*(1+0.8*abs(navs[0]-navs[-1]))
            rec['exec_s']+=base*navf+coord+(1-lit)*0.35*base;rec['read_s']+=tr
        # ---------- бой (движок) ----------
        dn={m['id']:0 for m in members};ht={m['id']:0 for m in members}
        for e in pl:
            rec['combat_s']+=e['sec']
            for m in members:
                k=str(pimap[m['id']])
                if solo: dn[m['id']]+=sum(e['downs'].values());ht[m['id']]+=sum(e['hits'].values())
                else: dn[m['id']]+=e['downs'].get(k,0);ht[m['id']]+=e['hits'].get(k,0)
            if not e['cleared'] or sum(e['downs'].values())>0: rec['enc_fail']+=1
        stages=BOSS_STAGES.get(lv)
        if stages and pl:
            boss_s=sum(e['sec'] for e in pl if e.get('boss'));rec['combat_s']+=boss_s*(stages-1)*0.8
        dtot=sum(dn.values()) if not solo else dn[members[0]['id']]
        rec['down_s']=dtot*(22 if solo else 10)
        # ---------- ритм (окно из кода уровней × разброс нажатия) ----------
        miss=None
        if lv in RUNNER_SEC:
            rec['runner_s']=RUNNER_SEC[lv];rec['exec_s']*=0.35
            w=RHYTHM_WIN[lv];w=w[easiest] if isinstance(w,dict) else w
            miss={}
            for m in members:
                sg=0.5*m['params']['timeSd']+0.02;ph=2*norm_cdf(w/sg)-1
                if solo and lv in('3-3','5-4'): ph*=0.85      # вторую дорожку ведёт помощник — а своя без пары сложнее
                miss[m['id']]=round(1-ph,3)
        # ---------- итог по уровню ----------
        rec['min']=round((rec['read_s']+rec['exec_s']+rec['stuck_s']+rec['cine_s']+rec['combat_s']+rec['down_s']+rec['runner_s'])/60,2)
        for m in members:
            mid=m['id'];pat=m['params']['patienceMin']
            F=rec['stuck_s']/60+0.4*dn[mid]+0.6*rec['enc_fail']+(0.8 if (miss and miss[mid]>0.35) else 0)+0.04*rec['unread']
            ref=0.45*pat;diff=1+4*(1-math.exp(-F/ref))
            dem=(C['demand']['r']+C['demand']['c']+C['demand']['l']+C['demand']['p'])/4          # «вызов» уровня даже без досады: не бывает «совсем легко» там, где много парных задач и боёв
            floor=1.3+1.7*dem+{'easy':-0.3,'mid':0.0,'hard':0.4}[paths[mid]]
            diff=max(diff,floor)
            gap=sum(w*max(0,C['demand'][k]-cap) for k,w,cap in[('r',1.0,clamp(1-(m['params']['rt']-0.35)/0.8,0.1,1)),('c',0.8,clamp(0.35+0.55*m['params']['ctrlLiteracy']+(0.1 if not solo else 0),0.1,1)),
                      ('l',0.9,COMP[m['group']][0]),('p',0.7,clamp(1-m['params']['timeSd']/0.25,0.1,1)),('e',0.5,clamp(pat/15,0.1,1))])
            rec['members'][mid]={'downs':dn[mid],'hits':ht[mid],'F':round(F,2),'diff':round(diff,2),'gap':round(gap,2),'miss':None if not miss else miss[mid],'minutes':rec['min']}
            e=ent[mid];e['levels']+=1;e['downs']+=dn[mid];e['hits']+=ht[mid];e['stuck_n']+=len(rec['stuck']);e['stuck_sec']+=rec['stuck_s'];e['unread']+=rec['unread'];e['min']+=rec['min']
        # ---------- хаб ----------
        hub=0.0
        if lv not in('luko','epi') and not lv.startswith('z-'):
            hub=HUB['forge']+sum(HUB[a]*lrng.random()*2*(sum(m['traits']['collect'] for m in members)/len(members)) for a in('shop','garden','hen','tales') if lrng.random()<0.5+0.3*(sum(m['traits']['collect'] for m in members)/len(members)))
            if any(m['group'] in('7-8','9-10') for m in members): hub*=1.3
        rec['hub_min']=round(hub,2);rec['min']+=hub;cum_min+=rec['min']
        res['levels'].append(rec)
        # ---------- бросает ли игру ----------
        if lv not in('luko',) and not lv.startswith('z-'):
            base_q=sum(QUIT[m['group']][0] for m in members)/len(members);fat=sum(QUIT[m['group']][1] for m in members)/len(members)
            Fm=sum(rec['members'][m['id']]['F']/(0.45*m['params']['patienceMin']) for m in members)/len(members)
            pq=clamp(base_q+0.012*max(0,Fm-0.6)+0.004*(cum_min/60)*fat,0,0.35)*(0.5 if support else 1.0)
            if members[0]['id']=='R25': pq=0.0      # профессиональный тестер проходит до конца
            if lrng.random()<pq:
                res['quit_level']=lv;alive=False
    # ---------- итог по сессии ----------
    res['total_min']=round(sum(l['min'] for l in res['levels']),1)
    res['ent']={k:{kk:(round(vv,1) if isinstance(vv,float) else vv) for kk,vv in v.items()} for k,v in ent.items()}
    res['final_paths']=paths
    played=[l['lv'] for l in res['levels']]
    res['levels_played']=len(played);res['reached_end']=('epi' in played) or ('5-B2' in played and res['quit_level'] is None)
    return res

def main():
    out={}
    for sid,mids in sessions.items(): out[sid]=simulate(sid,mids)
    json.dump(out,open(os.path.join(D,'sessions.json'),'w',encoding='utf-8'),ensure_ascii=False)
    print('сессий',len(out),'проб',len(probes))
    for sid,r in out.items():
        print(sid.ljust(5),'/'.join(r['members']),'уровней',r['levels_played'],'мин %5.0f'%r['total_min'],'до конца' if r['reached_end'] else 'ушли на '+str(r['quit_level']),
              'падений',sum(v['downs'] for v in r['ent'].values()),'застр.',sum(len(l['stuck']) for l in r['levels']),'пути',r['final_paths'])
if __name__=='__main__': main()
