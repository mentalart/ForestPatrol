#!/usr/bin/env python3
"""Суммарная статистика симулированного плейтеста → data/stats.json и графики (out/report/charts/*.png).
Читает: roster, sessions.json (телеметрия), level_profiles, probe_*.json (бой в движке), out/forms/*.json (заполненные опросники).
Запуск: python3 tools/playtest/aggregate.py"""
import json,os,glob,collections,statistics as st,math,sys
HERE=os.path.dirname(os.path.abspath(__file__));D=os.path.join(HERE,'data');OUT=os.path.join(HERE,'out','report');CH=os.path.join(OUT,'charts')
os.makedirs(CH,exist_ok=True)
J=lambda p:json.load(open(p,encoding='utf-8'))
roster=J(os.path.join(D,'roster.json'));byid={r['id']:r for r in roster}
sessions=J(os.path.join(D,'sessions.json'));prof=J(os.path.join(D,'level_profiles.json'));cat=J(os.path.join(HERE,'levels_catalog.json'))
probes={}
for f in sorted(glob.glob(os.path.join(os.environ.get('PT_PROBE_DIR',D),'probe_w*.json'))): probes.update(J(f))
forms={}
for f in glob.glob(os.path.join(HERE,'out','forms','R*_*.json')):
    d=J(f);forms[d['respondent']['id']]=d
GR=['7-8','9-10','11-13','14+'];GL={'7-8':'7–8 лет','9-10':'9–10 лет','11-13':'11–13 лет','14+':'14+ и взрослые'}
mean=lambda a:sum(a)/len(a) if a else None
def r1(x,n=1): return None if x is None else round(x,n)
LV=[k for k in sorted(cat,key=lambda k:cat[k]['order']) if k in prof and not k.startswith('z-') and k not in('luko','epi')]
S={}
# ---------------------------------------------------------------- участники
S['n']={'respondents':len(roster),'pairs':sum(1 for r in roster if r['mode']=='pair')//2,'solo':sum(1 for r in roster if r['mode']=='solo'),'by_group':{g:sum(1 for r in roster if r['group']==g) for g in GR},
        'by_group_mode':{g:{'pair':sum(1 for r in roster if r['group']==g and r['mode']=='pair'),'solo':sum(1 for r in roster if r['group']==g and r['mode']=='solo')} for g in GR}}
# ---------------------------------------------------------------- по участникам
rows={}
for sid,s in sessions.items():
    nl=[l for l in s['levels'] if l['lv'] not in('luko','epi') and not l['lv'].startswith('z-')]
    nlev=max(1,len(nl))
    for mid in s['members']:
        r=byid[mid];e=s['ent'][mid]
        rows[mid]={'id':mid,'group':r['group'],'mode':r['mode'],'role':r['role'],'sid':sid,'hours':s['total_min']/60,'levels':len(nl),'end':s['reached_end'],'quit':s['quit_level'],
          'downs_lvl':e['downs']/nlev,'hits_lvl':e['hits']/nlev,'stuck_n_lvl':sum(len(l['stuck']) for l in nl)/nlev,'stuck_min_lvl':sum(l['stuck_s'] for l in nl)/60/nlev,'asks':e['asks'],
          'unread_lvl':sum(l['unread'] for l in nl)/nlev,'understood':sum(l['understood'] for l in nl)/max(1,sum(l['objs'] for l in nl)),'path_final':s['final_paths'][mid],'path0':r['path'],
          'switches':len(s['path_switches']),'support':s['support'],'F_lvl':sum(l['members'][mid]['F'] for l in nl)/nlev,'diff':mean([l['members'][mid]['diff'] for l in nl])}
S['members']=rows
def grp(key,fn=mean,filt=None):
    return {g:r1(fn([v[key] for v in rows.values() if v['group']==g and (filt is None or filt(v))]),2) for g in GR}
S['hours']=grp('hours');S['levels']=grp('levels');S['downs_lvl']=grp('downs_lvl');S['hits_lvl']=grp('hits_lvl');S['stuck_n_lvl']=grp('stuck_n_lvl');S['stuck_min_lvl']=grp('stuck_min_lvl')
S['understood']=grp('understood');S['unread_lvl']=grp('unread_lvl');S['F_lvl']=grp('F_lvl');S['diff']=grp('diff')
S['completion']={g:r1(mean([1 if v['end'] else 0 for v in rows.values() if v['group']==g]),2) for g in GR}
S['quit_levels']={g:[v['quit'] for v in rows.values() if v['group']==g and v['quit']] for g in GR}
S['solo_vs_pair']={m:{'hours':r1(mean([v['hours'] for v in rows.values() if v['mode']==m]),1),'stuck_min_lvl':r1(mean([v['stuck_min_lvl'] for v in rows.values() if v['mode']==m]),2),'downs_lvl':r1(mean([v['downs_lvl'] for v in rows.values() if v['mode']==m]),2),
   'completion':r1(mean([1 if v['end'] else 0 for v in rows.values() if v['mode']==m]),2)} for m in('pair','solo')}
S['path_final']={g:dict(collections.Counter(v['path_final'] for v in rows.values() if v['group']==g)) for g in GR}
S['path0']={g:dict(collections.Counter(v['path0'] for v in rows.values() if v['group']==g)) for g in GR}
S['path_switch_sessions']=sum(1 for s in sessions.values() if s['path_switches'])
# ---------------------------------------------------------------- по уровням × группам
lvg={}
for sid,s in sessions.items():
    for l in s['levels']:
        if l['lv'] not in LV: continue
        for mid in s['members']:
            g=byid[mid]['group'];m=l['members'][mid]
            lvg.setdefault(l['lv'],{}).setdefault(g,[]).append({'F':m['F'],'downs':m['downs'],'hits':m['hits'],'diff':m['diff'],'min':l['min'],'stuck_s':l['stuck_s'],'stuck_n':len(l['stuck']),'asks':l['asks'],'unread':l['unread'],
               'objs':l['objs'],'understood':l['understood'],'read_s':l['read_s'],'exec_s':l['exec_s'],'combat_s':l['combat_s'],'enc_fail':l['enc_fail'],'miss':m['miss'],'solo':s['solo']})
S['levels_table']={}
for lv in LV:
    S['levels_table'][lv]={'name':cat[lv]['name'],'world':cat[lv]['world'],'type':cat[lv]['type'],'n_obj':prof[lv]['n_obj'],'words':prof[lv]['words'],'words_per_obj':prof[lv]['words_per_obj'],'coop_obj':prof[lv]['coop_obj'],
        'cine_sec':prof[lv]['cine_sec'],'enc':sum(e['count'] for e in prof[lv]['encounters']),'by_group':{}}
    for g in GR:
        a=lvg.get(lv,{}).get(g)
        if not a: S['levels_table'][lv]['by_group'][g]=None;continue
        S['levels_table'][lv]['by_group'][g]={'n':len(a),'F':r1(mean([x['F'] for x in a]),2),'downs':r1(mean([x['downs'] for x in a]),2),'diff':r1(mean([x['diff'] for x in a]),2),'min':r1(mean([x['min'] for x in a]),1),
            'stuck_min':r1(mean([x['stuck_s'] for x in a])/60,2),'stuck_n':r1(mean([x['stuck_n'] for x in a]),1),'unread':r1(mean([x['unread'] for x in a]),2),'understood':r1(sum(x['understood'] for x in a)/max(1,sum(x['objs'] for x in a)),2),
            'read_s':r1(mean([x['read_s'] for x in a]),0),'combat_s':r1(mean([x['combat_s'] for x in a]),0)}
# сводка «проблемные места»: по группе — топ уровней по F
S['hot']={}
for g in GR:
    tab=[(lv,t['by_group'][g]['F'],t['by_group'][g]['n']) for lv,t in S['levels_table'].items() if t['by_group'].get(g)]
    S['hot'][g]=[(lv,F,n) for lv,F,n in sorted(tab,key=lambda x:-x[1])[:6]]
# разложение «досады» F на причины для самых трудных уровней и ритм-промахи
S['hot_detail']={}
for g in GR:
    S['hot_detail'][g]=[]
    for lv,F,n in S['hot'][g]:
        a=lvg[lv][g]
        S['hot_detail'][g].append({'lv':lv,'name':cat[lv]['name'],'F':F,'n':n,'stuck_min':r1(mean([x['stuck_s'] for x in a])/60,2),'combat':r1(mean([0.4*x['downs']+0.6*x['enc_fail'] for x in a]),2),
            'unread':r1(mean([x['unread'] for x in a]),1),'read_min':r1(mean([x['read_s'] for x in a])/60,1),'minutes':r1(mean([x['min'] for x in a]),1),'solo':sum(1 for x in a if x['solo'])})
S['rhythm']={lv:{g:r1(mean([x['miss'] for x in lvg.get(lv,{}).get(g,[]) if x['miss'] is not None]),2) for g in GR if [x for x in lvg.get(lv,{}).get(g,[]) if x['miss'] is not None]} for lv in('1-3','3-3','5-4')}
# ---------------------------------------------------------------- бой (движок)
cm={g:collections.defaultdict(lambda:collections.Counter()) for g in GR}   # g -> world -> счётчики
tut={g:[] for g in GR};plan={g:collections.Counter() for g in GR};know={g:[] for g in GR};boss={g:[] for g in GR};kinds_down=collections.Counter();kinds_n=collections.Counter()
SHOOT={'shchuka'}
for sid,p in probes.items():
    s=sessions[sid];solo=p['solo']
    for e in p['log']:
        if 'groups' not in e: continue
        kinds={k for k,_ in e['groups']}
        for mid in p['members']:
            r=byid[mid];g=r['group'];pi=0 if solo else r['seat']-1;k=str(pi)
            dn=sum(e['downs'].values()) if solo else e['downs'].get(k,0);ht=sum(e['hits'].values()) if solo else e['hits'].get(k,0)
            w='пролог' if e['world']==0 else 'мир '+str(e['world'])
            c=cm[g][w];c['n']+=1;c['downs']+=dn;c['hits']+=ht;c['cleared']+=1 if e['cleared'] else 0;c['sec']+=e['sec']
            if e.get('tutorial'): tut[g].append((e['sec'],ht))
            if e.get('boss'): boss[g].append((e['lv'],dn,ht,e['sec'],e['cleared']))
            pl=e['plan'].get(k) if not solo else e['plan'].get('0')
            if pl:
                for kk,v in pl.items(): plan[g][kk]+=v
            for kd in kinds:
                kinds_n[kd]+=1;kinds_down[kd]+=dn
    for mid in p['members']:
        r=byid[mid];last=[e for e in p['log'] if 'know' in e][-1];pi=0 if solo else r['seat']-1
        kn=last['know'].get(str(pi)) or last['know'].get('0')
        if kn: know[r['group']].append(kn)
S['combat']={g:{w:{'enc':v['n'],'downs_per_enc':r1(v['downs']/v['n'],3),'hits_per_enc':r1(v['hits']/v['n'],2),'clear':r1(v['cleared']/v['n'],2),'sec':r1(v['sec']/v['n'],1)} for w,v in sorted(cm[g].items())} for g in GR}
S['tutorial']={g:{'sec':r1(mean([a for a,b in tut[g]]),1),'hits':r1(mean([b for a,b in tut[g]]),2)} for g in GR if tut[g]}
S['plan']={g:{'plans':plan[g]['plans'],'late':r1(plan[g]['late']/max(1,plan[g]['plans']),3),'lapse':r1(plan[g]['lapse']/max(1,plan[g]['plans']),3),'parry_try':r1(plan[g]['parryTry']/max(1,plan[g]['plans']),3),'roll_try':r1(plan[g]['rollTry']/max(1,plan[g]['plans']),3),
   'guard_only':r1(plan[g]['guardOnly']/max(1,plan[g]['plans']),3),'miskey':r1(plan[g]['miskey']/max(1,plan[g]['plans']),3)} for g in GR}
S['know_final']={g:{'parry':r1(mean([k['parry'] for k in know[g]]),2),'roll':r1(mean([k['roll'] for k in know[g]]),2)} for g in GR if know[g]}
S['kind_down_rate']={k:r1(kinds_down[k]/kinds_n[k],3) for k in kinds_n if kinds_n[k]>=8}
# ---------------------------------------------------------------- A/B: детские настройки мира 1 против обычных (ab_kids.js)
S['ab']={}
for g in('7-8','9-10'):
    fp=os.path.join(D,'ab_'+g+'.json')
    if not os.path.exists(fp): continue
    ab=J(fp);S['ab'][g]={}
    for arena,rows_ in ab.items():
        n=sum(r['n'] for r in rows_)
        S['ab'][g][arena]={'fights':n,'downs_per_fight':r1(sum(r['downs'] for r in rows_)/n,3),'hits_per_fight':r1(sum(r['hits'] for r in rows_)/n,2),'clear':r1(sum(r['clear'] for r in rows_)/n,2),'sec':r1(sum(r['sec'] for r in rows_)/n,1),
            'by_comp':{c:{'hits':r1(sum(r['hits'] for r in rows_ if r['comp']==c)/max(1,sum(r['n'] for r in rows_ if r['comp']==c)),2),'clear':r1(sum(r['clear'] for r in rows_ if r['comp']==c)/max(1,sum(r['n'] for r in rows_ if r['comp']==c)),2)} for c in sorted({r['comp'] for r in rows_})}}
# ---------------------------------------------------------------- чтение и текст
rd={}
for lv in LV+['p']:
    if lv not in prof: continue
    P=prof[lv];objs=P['objectives']
    for g,cps in(('7-8',3.0),('9-10',5.5),('11-13',9.0),('14+',14.0)):
        pass
S['reading']={'per_level':{lv:{'n_obj':prof[lv]['n_obj'],'words':prof[lv]['words'],'wpo':prof[lv]['words_per_obj'],'max_words':prof[lv]['max_words'],'long':prof[lv]['long_word_share'],'coop':prof[lv]['coop_obj'],'key':prof[lv]['key_obj'],'swap':prof[lv]['swap_obj']} for lv in prof if lv not in('z-i','z-d','z-a')}}
allobj=[o for lv,P in prof.items() if not lv.startswith('z-') for o in P['objectives'] if o['words']>1]
S['reading']['total_obj']=len(allobj);S['reading']['words_total']=sum(o['words'] for o in allobj);S['reading']['words_mean']=r1(mean([o['words'] for o in allobj]),1);S['reading']['words_median']=st.median([o['words'] for o in allobj])
S['reading']['gt20']=sum(1 for o in allobj if o['words']>20);S['reading']['gt25']=sum(1 for o in allobj if o['words']>25);S['reading']['coop_total']=sum(1 for o in allobj if o['coop']);S['reading']['swap_total']=sum(1 for o in allobj if o['swap']);S['reading']['key_total']=sum(1 for o in allobj if o['keys']);S['reading']['keystrict_total']=sum(1 for o in allobj if o.get('keystrict'))
for g,cps in(('7-8',3.0),('9-10',5.5),('11-13',9.0),('14+',14.0)):
    t=[o['chars']/cps for o in allobj];S['reading'][g]={'mean_read_s':r1(mean(t),1),'share_gt20s':r1(sum(1 for x in t if x>20)/len(t),2),'share_gt30s':r1(sum(1 for x in t if x>30)/len(t),2)}
S['reading']['kids_levels']=[lv for lv in prof if cat.get(lv,{}).get('kids')];S['reading']['kids_obj']=sum(prof[lv]['n_obj'] for lv in S['reading']['kids_levels']);S['reading']['all_obj']=sum(P['n_obj'] for lv,P in prof.items() if not lv.startswith('z-'))
S['reading']['cine_sec_total']=r1(sum(P['cine_sec'] for P in prof.values()),0)
# озвучены ли сами задачи: совпадение начала задачи с записанной репликой (voice/lines.json)
import re as _re
try:
    _L=J(os.path.join(HERE,'..','..','zlataya_cep','build','voice','lines.json'))['lines']
    _n=lambda t:' '.join(_re.sub(r'[^а-яё0-9 ]','',_re.sub(r'<[^>]*>',' ',t.lower())).split())
    _lines=[_n(x['text']) for x in _L]
    _hit=_tot=0
    for lv,P in prof.items():
        if lv.startswith('z-'): continue
        for o in P['objectives']:
            if o['words']<4: continue
            _tot+=1;f=' '.join(_n(o['text']).split()[:6])
            if any(f in l for l in _lines): _hit+=1
    S['voice']={'recorded_lines':len(_L),'tasks':_tot,'tasks_voiced':_hit}
except Exception as e: S['voice']={'err':str(e)}
# ---------------------------------------------------------------- опросы
def vals(g,q,fn=lambda x:x): return [fn(f['answers'][q]) for f in forms.values() if f['respondent']['group']==g and q in f['answers'] and f['answers'][q] not in(None,'na')]
def num(g,q): return [x for x in vals(g,q) if isinstance(x,(int,float))]
def avg(g,q): a=num(g,q);return (r1(mean(a),2),len(a)) if a else None
def dist(g,q):
    c=collections.Counter()
    for x in vals(g,q):
        if isinstance(x,list):
            for y in x: c[y]+=1
        else: c[x]+=1
    return dict(c.most_common())
sv={}
for g in GR:
    sv[g]={'n':sum(1 for f in forms.values() if f['respondent']['group']==g),'stars':avg(g,'stars'),'answered_pct':r1(mean([f['answered']/f['total'] for f in forms.values() if f['respondent']['group']==g]),2)}
for g in('7-8','9-10'):
    for q in('story_like','hints','fight','slash','buttons','coop','pretty','looks','music','ending','movies','sounds','skazy','koschei','downed','split'):
        if avg(g,q): sv[g][q]=avg(g,q)
for g in('11-13','14+'):
    pass
sv['7-8'].update({'end':dist('7-8','end'),'hard':dist('7-8','hard'),'stuck':dist('7-8','stuck'),'read':dist('7-8','read'),'scary':dist('7-8','scary'),'again':dist('7-8','again'),'story_clear':dist('7-8','story_clear'),'hero':dist('7-8','hero'),'world_best':dist('7-8','world_best'),'world_worst':dist('7-8','world_worst'),'fun':dist('7-8','fun'),'boss':dist('7-8','boss')})
sv['9-10'].update({'done':dist('9-10','done'),'hard':avg('9-10','hard'),'signals':dist('9-10','signals'),'stuck':dist('9-10','stuck'),'recommend':dist('9-10','recommend'),'subs':dist('9-10','subs'),'story_clear':dist('9-10','story_clear'),'hero':dist('9-10','hero'),'levels_best':dist('9-10','levels_best'),'ability':dist('9-10','ability'),'path':dist('9-10','path')})
for q in('story','clarity','villain','humor','choices','combat','signals','controls','camera','hints','coop_fun','split','solo','helper','downed','nps'):
    if avg('11-13',q): sv['11-13'][q]=avg('11-13',q)
sv['11-13'].update({'pace':dist('11-13','pace'),'dialog':dist('11-13','dialog'),'combat_bad':dist('11-13','combat_bad'),'lv_best':dist('11-13','lv_best'),'lv_worst':dist('11-13','lv_worst'),'style':dist('11-13','style'),'hours':dist('11-13','hours'),'done':dist('11-13','done'),'bugs':dist('11-13','bugs'),'roles':dist('11-13','roles'),'screen':dist('11-13','screen'),'sequel':dist('11-13','sequel'),'gamer':dist('11-13','gamer')})
for q in('edu','onboard','perf','nps'):
    if avg('14+',q): sv['14+'][q]=avg('14+',q)
sv['14+'].update({'age_fit':dist('14+','age_fit'),'scary':dist('14+','scary'),'paths':dist('14+','paths'),'lv_best':dist('14+','lv_best'),'lv_worst':dist('14+','lv_worst'),'access':dist('14+','access'),'voice':dist('14+','voice'),'price':dist('14+','price'),'buy':dist('14+','buy'),'bugs':dist('14+','bugs'),'hours':dist('14+','hours'),'done':dist('14+','done'),'role':dist('14+','role'),'exp':dist('14+','exp')})
# матрицы: среднее по строкам
def mat(g,q):
    acc=collections.defaultdict(list)
    for f in forms.values():
        if f['respondent']['group']!=g: continue
        m=f['answers'].get(q)
        if isinstance(m,dict):
            for k,v in m.items():
                if isinstance(v,(int,float)): acc[k].append(v)
    return {k:(r1(mean(v),2),len(v)) for k,v in acc.items()}
for g,qs in(('9-10',('worlds','bosses','luko')),('11-13',('heroes','worlds','special','bosses','diff','abilities','av')),('14+',('nar','mech','diff','eco','coop','solo','ui','vis','snd'))):
    for q in qs: sv[g]['m_'+q]=mat(g,q)
S['survey']=sv
# ---------------------------------------------------------------- согласованность: телеметрия ↔ ответы
pairs=[]
for mid,r in rows.items():
    f=forms.get(mid)
    if not f: continue
    a=f['answers']
    sd=None
    if r['group']=='9-10' and 'hard' in a: sd=a['hard']
    elif r['group']=='7-8' and 'hard' in a: sd={'Легко':1,'В самый раз':2,'Трудно':4,'Очень трудно':5}.get(a['hard'])
    if sd is not None: pairs.append((r['diff'],sd))
def corr(x,y):
    mx,my=mean(x),mean(y);sx=math.sqrt(sum((a-mx)**2 for a in x));sy=math.sqrt(sum((b-my)**2 for b in y));return sum((a-mx)*(b-my) for a,b in zip(x,y))/(sx*sy) if sx and sy else None
S['consistency']={'n':len(pairs),'r_diff_vs_selfreport':r1(corr([p[0] for p in pairs],[p[1] for p in pairs]),2) if len(pairs)>3 else None}
json.dump(S,open(os.path.join(D,'stats.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1,default=list)
print('stats.json записан;','проб',len(probes),'форм',len(forms))
