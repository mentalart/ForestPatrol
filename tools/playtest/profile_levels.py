#!/usr/bin/env python3
"""Профили уровней из прогонов ботов-«оракулов» (tools/playtest/out/oracle/*.json, run_oracle.js).
Для каждого уровня берётся лучший прогон — тот, где уровень пройден (событие done) и целей показано больше всего.
Из него: цели (текст, длина, ссылки на клавиши и «вместе»), подсказки/реплики/баннеры, ролики, спавн морок → встречи (кластеры по времени),
идеальное время прохождения. Результат — data/level_profiles.json. Запуск: python3 tools/playtest/profile_levels.py"""
import json,os,re,glob,sys
HERE=os.path.dirname(os.path.abspath(__file__))
OR=os.path.join(HERE,'out','oracle')
CAT=json.load(open(os.path.join(HERE,'levels_catalog.json'),encoding='utf-8'))
SKIP_ENC={'tfin_foekinds','tfin_foekinds1b','tfin_foekinds2','tfin_foekinds2b','tfin_foekinds3','tfin_foekinds4','tfin_foekinds5','tfin_foekinds6','tfoes','smoke','tfin_cine','tfin_foecast','tfin_foeidle'}
TOGETHER=re.compile(r'вместе|оба|обо?их|все четверо|вчетвером|хором|разом|одновременно|в такт|на счёт|вдвоём|вдвоем|двое|друг друг|друга|напарник',re.I)
KEYREF=re.compile(r'\b(Q|K|E|L|R|G|F|M|Shift)\b|«Ко мне|Пробел|смен[аиуы]|клубок|гусли|перо|клещи',re.I)
KEYSTRICT=re.compile(r'(?<![А-Яа-яЁёA-Za-z])(?:[QKELRGFMT]|Shift|Пробел|Enter|RB|RT|LT|LB|WASD)(?![А-Яа-яЁёA-Za-z])')
SWAP=re.compile(r'смен[аиуы]|смени|Q\b|K\b',re.I)

def load():
    runs={}
    for f in glob.glob(os.path.join(OR,'*.json')):
        d=json.load(open(f,encoding='utf-8'));runs[d['bot']]=d
    return runs

def encounters(foes,gap=6.0):
    """кластеры спавна морок: события, идущие друг за другом не дальше gap секунд"""
    out=[];cur=None
    for e in sorted(foes,key=lambda e:e['t']):
        if cur and e['t']-cur['t1']<=gap: cur['kinds'].append(e['kind']);cur['t1']=e['t']
        else:
            cur={'t0':e['t'],'t1':e['t'],'kinds':[e['kind']]};out.append(cur)
    return out

def level_view(run,lv):
    evs=run['ev']
    starts=[i for i,e in enumerate(evs) if e['k']=='lvl' and e['id']==lv]
    ev=[e for e in evs if e['lv']==lv]
    if not ev: return None
    if starts:
        i=starts[0];t0=evs[i]['t']
        nxt=next((e for e in evs[i+1:] if e['k']=='lvl' and e['id']!=lv),None)
        done=bool(nxt and nxt['id']=='luko' and lv!='luko')
        t1=nxt['t'] if nxt else max(e['t'] for e in ev)
    else:
        t0=min(e['t'] for e in ev);done=False;t1=max(e['t'] for e in ev)
    ev=[e for e in ev if t0-0.01<=e['t']<=t1+0.01]
    return {'ev':ev,'t0':t0,'t1':t1,'done':done}

def build():
    runs=load()
    static=json.load(open(os.path.join(HERE,'data','level_static.json'),encoding='utf-8'))
    per={}   # lv -> список (бот, вид)
    for bot,run in runs.items():
        if bot in SKIP_ENC: continue
        for lv in set(e['lv'] for e in run['ev']):
            v=level_view(run,lv)
            if v: per.setdefault(lv,[]).append((bot,v))
    prof={}
    for lv,st in static.items():
        if 'err' in st: continue
        texts=st['obj'][0]
        views=per.get(lv,[])
        # время на цель: по соседним целям в одном прогоне; берём наименьшее (оракул без лишних пауз)
        dts={}
        for bot,v in views:
            by={}
            for e in v['ev']:
                if e['k']=='obj' and e['pi']==0 and e['idx'] not in by: by[e['idx']]=e['t']
            ks=sorted(by)
            for a,b in zip(ks,ks[1:]):
                if b==a+1: dts.setdefault(a,[]).append(by[b]-by[a])
        objs=[]
        for i,t in enumerate(texts):
            w=len(re.findall(r'[A-Za-zА-Яа-яЁё0-9]+',t))
            objs.append({'idx':i,'text':t,'words':w,'chars':len(t),'coop':bool(TOGETHER.search(t)),'keys':bool(KEYREF.search(t)),'keystrict':bool(KEYSTRICT.search(t)),'swap':bool(SWAP.search(t)),
                         'dt':round(min(dts[i]),1) if i in dts else None})
        known=[o['dt'] for o in objs if o['dt'] is not None]
        dtm=round(sum(known)/len(known),1) if known else None
        # ролики, тексты, встречи — объединение по всем ботам
        cines={};tips=set();says=set();bans=set();enc={}
        best=None
        for bot,v in views:
            for e in v['ev']:
                if e['k']=='cine': cines[(round(e['dur']),e['says'])]=e
                elif e['k']=='tip': tips.add((e['text'],e['chars']))
                elif e['k']=='say': says.add((e['text'],e['chars']))
                elif e['k']=='banner': bans.add((e['text'],e['chars']))
            foes=[e for e in v['ev'] if e['k']=='foe']
            local={}
            for c in encounters(foes):
                key=tuple(sorted(c['kinds']));local[key]=local.get(key,0)+1
            for key,n in local.items(): enc[key]=max(enc.get(key,0),n)
            sc=(v['done'],len([e for e in v['ev'] if e['k']=='obj']))
            if best is None or sc>best[0]: best=(sc,bot,v)
        cl=list(cines.values())
        words=[o['words'] for o in objs]
        longw=sum(len([w for w in re.findall(r'[А-Яа-яЁё]+',o['text']) if len(w)>=9]) for o in objs)
        allw=sum(o['words'] for o in objs) or 1
        prof[lv]={'id':lv,'name':st['name'],'world':st.get('world',CAT.get(lv,{}).get('world',0)),
          'n_obj':len(objs),'words':sum(words),'chars':sum(o['chars'] for o in objs),'words_per_obj':round(sum(words)/max(1,len(objs)),1),'max_words':max(words or [0]),
          'long_word_share':round(longw/allw,3),'coop_obj':sum(o['coop'] for o in objs),'key_obj':sum(o['keys'] for o in objs),'swap_obj':sum(o['swap'] for o in objs),
          'tip_zones':len(st['tipZones']),'prompts':st['prompts'],'bells':st['bells'],
          'objectives':objs,'dt_known':len(known),'dt_mean':dtm,
          'cines':[{'dur':c['dur'],'says':c['says'],'chars':c['chars']} for c in cl],'n_cine':len(cl),'cine_sec':round(sum(c['dur'] for c in cl),1),
          'tips':len(tips),'says':len(says),'banners':len(bans),
          'say_chars':sum(c for _,c in says),'tip_chars':sum(c for _,c in tips),'banner_chars':sum(c for _,c in bans),
          'encounters':[{'kinds':list(k),'count':n} for k,n in sorted(enc.items(),key=lambda x:(-x[1],x[0]))],
          'foe_kinds':sorted({k for key in enc for k in key}),
          'oracle':{'bots':sorted({b for b,_ in views}),'best':best[1] if best else None,'complete':any(v['done'] for _,v in views),
                    'sim_sec':round(best[2]['t1']-best[2]['t0'],1) if best else None,
                    'hits':sum(1 for _,v in views for e in v['ev'] if e['k']=='hit')},
          'cat':CAT.get(lv,{})}
    return prof,runs

if __name__=='__main__':
    prof,runs=build()
    os.makedirs(os.path.join(HERE,'data'),exist_ok=True)
    json.dump(prof,open(os.path.join(HERE,'data','level_profiles.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
    print(len(runs),'прогонов →',len(prof),'уровней')
    for lv in sorted(prof,key=lambda x:(CAT.get(x,{}).get('order',99))):
        p=prof[lv];print('%-5s obj=%2d words=%4d w/obj=%4.1f coop=%2d key=%2d swap=%2d dt=%s cine=%4.0fs(%d) enc=%s %s'%(lv,p['n_obj'],p['words'],p['words_per_obj'],p['coop_obj'],p['key_obj'],p['swap_obj'],p['dt_mean'],p['cine_sec'],p['n_cine'],'+'.join('%dx%s'%(e['count'],'/'.join(e['kinds'])) for e in p['encounters'][:4])[:70],'' ))
