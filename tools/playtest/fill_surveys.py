#!/usr/bin/env python3
"""Заполнение четырёх опросников симулированными респондентами → tools/playtest/data/answers/<R..>.json ({answers, durationSec, meta}).
Дальше render_forms.js открывает настоящие страницы опросников, подставляет эти ответы и сохраняет файл кнопкой «Сохранить файлом» —
так формат (zc-opros-v1, qa, answered/total, showIf) получается тем же, что у живого участника.
Запуск: python3 tools/playtest/fill_surveys.py"""
import json,os,math,random,collections,re,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from fill_core import *
import texts_ru as T

OUT=os.path.join(D,'answers');os.makedirs(OUT,exist_ok=True)
SURVEYS={k:json.load(open(os.path.join(D,'surveys',f'survey_{k}.json'),encoding='utf-8')) for k in('7-8','9-10','11-13','14plus')}
QMAP={k:{q['id']:q for s in S['sections'] for q in s['q']} for k,S in SURVEYS.items()}

HEROES=['Прошка','Потап','Пелагея','Йоша']
CHAR_FIRST={'Кот Учёный':'p','Баба-Яга':'1-1','Кикимора':'1-2','Колобок':'1-3','Леший':'1-4','Садко':'2-1','Золотая рыбка':'2-3','Жар-птица':'3-1','Сирин':'3-3','Алконост':'3-3',
 'Змей Горыныч':'4-B','Кузьма-кузнец':'4-1','Тишка':'p','Печка':'3-5','Заяц':'5-2','Лихо Одноглазое':'5-1','Три богатыря':'z-i','Кощей':'3-B','Соловей-Разбойник':'3-B'}
PLACE_FIRST={'Бег с Колобком':'1-3','Рыба-кит':'2-2','Сад молодильных яблок':'3-1','Летучий корабль':'3-4','Кузня Кузьмы и Демьяна':'4-1','Терем Кощея':'5-B1','Лукоморье':'luko','Застава богатырей':'z-i','Штаб-сосна':'p'}
FOE_FIRST={'Морок-клубок':'p','Кикиморка':'1-1','Пенёк':'1-2','Тень':'3-1','Тучка':'3-2','Ящерка-плевунья':'4-2','Пугало':'3-1','Пузырник':'2-4','Рак':'2-1','Чугунный болван':'4-1'}
BOSS_LV={'Леший-Путаник':['1-B'],'Водяной':['2-B'],'Соловей-Разбойник':['3-B'],'Змей Горыныч':['4-B'],'Кощей Бессмертный':['5-B1','5-B2']}
ABIL_FIRST={'Рогатка Прошки':'p','Подкидка Потапа':'p','Ковшик Йоши':'p','Совиный взор Пелагеи':'p','Клубок-путеводитель':'1-1','Гусли Садко':'2-1','Перо Жар-птицы':'3-1','Кузнечные клещи':'4-1'}
def seen(E,lv): return E.has(lv)
def hub_flags(E):
    rng=seed_of('hub',E.id);c=E.t['collect'];kid=E.g in('7-8','9-10')
    f={'forge':True,'shop':rng.random()<0.45+0.45*c+(0.15 if kid else 0),'garden':rng.random()<0.25+0.5*c,'hen':rng.random()<0.25+0.5*c+(0.1 if kid else 0),
       'tales':rng.random()<0.3+0.4*c,'zastava':any(E.has(z) for z in('z-i','z-d','z-a'))}
    return f
def rate(x,rng,n=5,sd=0.09): return faces_from(x,n,rng,sd)
def n_level(E): return len([l for l in E.played if l not in('luko',)])
def world_sat(E,w):
    v=E.world_stat(w,'sat');return v
def diff_world(E,w): return E.world_stat(w,'diff')
def hours_label14(h): return 'Меньше 3 ч' if h<3 else '3–6 ч' if h<6 else '6–10 ч' if h<10 else '10–15 ч' if h<15 else 'Больше 15 ч'
def hours_label13(h): return 'Меньше 3' if h<3 else '3–6' if h<6 else '6–10' if h<10 else 'Больше 10'
def played_fraction(E): return len([l for l in E.played if not l.startswith('z-')])/33.0
def path_label(p): return {'easy':'Лёгкий','mid':'Средний','hard':'Богатырский'}[p]
def paths_used(E):
    ps={E.r['path'],E.S['final_paths'][E.id]};return [path_label(p) for p in('easy','mid','hard') if p in ps]
def mode_labels(E,rng):
    if E.solo: return ['Один (одиночный режим)']
    a=['Вдвоём на общем экране','Вдвоём, экран делился пополам']
    return a if rng.random()<0.75 else [a[rng.random()<0.5 and 0 or 1]]
def sample_games(E,rng):
    kid=['Minecraft','Roblox','Brawl Stars','Super Mario','Among Us','Toca Boca','Mario Kart','Сказочный патруль','Fall Guys','Terraria','Stumble Guys','Genshin Impact']
    teen=['Minecraft','Roblox','Brawl Stars','Genshin Impact','Fortnite','Hollow Knight','Geometry Dash','Terraria','It Takes Two','Overcooked','Among Us','Stardew Valley','Hades','Celeste']
    adult=['Stardew Valley','It Takes Two','Overcooked','Zelda: Breath of the Wild','Portal 2','Hollow Knight','Hades','The Witcher 3','Тетрис','Mario Kart','Hollow Knight','Unravel','Ori and the Blind Forest','Cuphead']
    lowadult=['Тетрис','Марио (в детстве)','Cut the Rope','Angry Birds','Три в ряд','пасьянс на телефоне']
    if E.g=='14+':
        pool=lowadult if E.r['gaming']==0 else adult
    else: pool=kid if E.g in('9-10','11-13') and E.r['gaming']<2 and E.r['age']<12 else teen
    return ', '.join(rng.sample(pool,min(len(pool),rng.choice([2,3]))))
def read_chip(E,rng):
    """справляется ли с чтением внизу экрана"""
    cps=E.p['readCps'];unread=sum(l['unread'] for l in E.S['levels'])/max(1,len(E.S['levels']))
    if E.g=='7-8': return 'Мне читал взрослый' if E.support or (E.r['role'] in('child',) and rng.random()<0.6) else ('Я не читал' if cps<2 else 'Не всегда')
    return 'Да, успевал' if cps>=8 and unread<0.4 else 'Не всегда'
def comp_frac(E): return E.understood_frac()
def level_names_in(E,pool): return [cat[l]['survey'] for l in pool if E.has(l) and cat[l].get('survey')]
def level_reason_text(E,lv,rng,style=None):
    """«где и почему» — по измеренной причине"""
    reason,val=E.reason(lv);g=E.g;C=cat[lv];scene=rng.choice(C['scene']) if C['scene'] else ''
    why=T.why(reason,g,rng)
    nm=C['survey'] or C['name']
    if g=='7-8': return f'В «{nm}». {why.capitalize()}.'
    if g=='9-10': return f'«{nm}» — {why}.'+(f' Особенно когда {scene}.' if scene and rng.random()<0.5 else '')
    if g=='11-13': return f'«{nm}»: {why}.'+(f' ({scene})' if scene and rng.random()<0.4 else '')
    return f'«{nm}» ({scene}): {why}.' if scene else f'«{nm}»: {why}.'

# =============================================================================================== 7–8 лет
def ans_78(E):
    rng=seed_of('a78',E.id);t=E.t;r=E.r;A={};n=3;ov=E.overall()
    A['age']=str(r['age']);A['with']=[r['with']]
    if E.support and r['role']=='child' and rng.random()<0.15: A['with'].append('С мамой или папой') if 'С мамой или папой' not in A['with'] else None
    pf=played_fraction(E)
    A['end']='Да, до самого конца!' if E.end else 'Почти до конца' if pf>0.7 else 'Нет, не дошёл'
    A['story_like']=rate(0.2+0.75*ov+0.1*(t['enthu']-0.6),rng,n,0.1)
    cf=comp_frac(E)+(0.25 if E.support else 0)
    A['story_clear']='Да, всё понятно' if cf>0.8 else 'Понятно немножко' if cf>0.35 else 'Было непонятно'
    A['story_about']=rng.choice(T.STORY_ABOUT if (E.end or pf>0.5) else T.STORY_ABOUT_NOEND)
    hw=[1.0,1.0,0.8,0.8]
    if E.t['action']>0.6: hw[0]+=0.6;hw[1]+=0.6
    hero=rng.choices(HEROES,weights=hw)[0]
    A['hero']=hero;A['hero_why']=rng.choice(T.HERO_WHY[hero])
    cand=[c for c,fl in CHAR_FIRST.items() if c in QMAP['7-8']['friends']['o'] and E.has(fl)] if False else None
    opts=[o['v'] for o in QMAP['7-8']['friends']['o']]
    pool=[c for c in opts if E.has(CHAR_FIRST.get(c,'p')) or c in('Заяц','Печка') and E.has('5-2')]
    w=[1.6 if c in('Кот Учёный','Колобок','Жар-птица','Змей Горыныч','Золотая рыбка') else 1.0 for c in pool]
    A['friends']=pick_w(rng,pool,w,3)
    sc=E.t['fear']*0.9+(0.25 if any(E.has(l) for l in('3-B','5-B1')) else 0)-0.1
    A['scary']='Нет, совсем не страшно' if sc<0.35 else 'Чуть-чуть страшно' if sc<0.75 else 'Было страшно'
    if A['scary']!='Нет, совсем не страшно':
        keys=[k for k,ok in(('koschei',E.has('3-B')),('leshy',E.has('1-B')),('dark',E.has('3-1')),('water',E.has('2-B')),('likho',E.has('5-1')),('boss',True)) if ok]
        A['scary_what']=rng.choice(T.SCARY_WHAT[rng.choice(keys)])
    fl=[l for l in E.played if l in T.FUNNY];A['funny']=rng.choice(T.FUNNY[rng.choice(fl)]) if fl else 'когда Звенышко звенело'
    if E.end: A['ending']=rate(0.25+0.65*ov,rng,n,0.1)
    ws=[w for w in E.seen_worlds];names={1:'Дремучий лес',2:'Подводный Китеж',3:'Небесное царство',4:'Огненная Смородина',5:'Остров Буян'}
    wsat={w:world_sat(E,w)+rng.gauss(0,0.06) for w in ws}
    opts_w=[names[w] for w in ws]+['Лукоморье']
    wsat_n={names[w]:v for w,v in wsat.items()};wsat_n['Лукоморье']=0.42+0.3*t['collect']+rng.gauss(0,0.12)
    A['world_best']=max(wsat_n,key=wsat_n.get)
    worst=min(wsat_n,key=wsat_n.get)
    A['world_worst']=worst if wsat_n[worst]<0.5 and worst!=A['world_best'] else QMAP['7-8']['world_worst']['none']
    fo=[f for f,fl in FOE_FIRST.items() if E.has(fl)]
    A['foe_funny']=rng.choice(['Кикиморка','Пенёк','Рак','Морок-клубок','Тучка','Пузырник','Тень'] if False else [f for f in fo if f in('Кикиморка','Пенёк','Рак','Морок-клубок','Тучка','Пузырник','Тень','Пугало','Чугунный болван')] or ['Морок-клубок'])
    bs=[b for b,ls in BOSS_LV.items() if any(E.has(l) for l in ls) and b in[o['v'] for o in QMAP['7-8']['boss']['o']]]
    if bs: A['boss']=max(bs,key=lambda b:max(E.fun[l] for l in BOSS_LV[b] if E.has(l))+rng.gauss(0,0.08))
    dn=sum(E.mem[l]['diff'] for l in E.played)/len(E.played)
    A['hard']='Легко' if dn<1.9 else 'В самый раз' if dn<2.7 else 'Трудно' if dn<3.5 else 'Очень трудно'
    st=sum(len(l['stuck']) for l in E.S['levels'])/max(1,len(E.S['levels']))
    A['stuck']='Да' if st>0.6 or E.ent['asks']>3 else 'Нет'
    if A['stuck']=='Да':
        lv=max([l for l in E.played if l not in('luko',)],key=lambda l:E.recs[l]['stuck_s']+rng.random());A['stuck_where']=level_reason_text(E,lv,rng)
    ch=['Драться с мороками'] if E.t['action']>0.5 else []
    optsf=[o for o in QMAP['7-8']['fun']['o']];fw=[]
    for o in optsf:
        w=1.0
        if o=='Драться с мороками': w=0.5+1.4*t['action']
        elif o=='Прыгать и лазить': w=0.9
        elif o=='Бежать с Колобком под музыку': w=(0.4+1.4*t['music']) if E.has('1-3') else 0.001
        elif o=='Лететь на Змее Горыныче': w=1.7 if E.has('5-3') else 0.001
        elif o=='Разгадывать загадки': w=0.4+1.4*t['puzzle']
        elif o=='Помогать друг другу': w=0.4+1.4*t['social']
        elif o in('Наряжать героев',): w=0.4+2*t['collect']
        elif o in('Растить огород','Кормить Курочку Рябу'): w=0.3+1.2*t['collect']
        elif o=='Собирать звенья и орешки': w=0.8+t['collect']
        elif o=='Смотреть мультики между уровнями': w=1.0
        fw.append(w)
    A['fun']=pick_w(rng,optsf,fw,3)
    hits=E.ent['hits']/max(1,n_level(E));A['fight']=rate(0.25+0.5*t['action']+0.2*(1-min(1,E.total_downs()/30)),rng,n,0.12)
    A['slash']=rate(0.55+0.4*t['art']+0.1*t['enthu'],rng,n,0.1)
    A['hints']=rate(0.15+0.7*clamp(cf,0,1)+0.1*(1 if E.support else 0),rng,n,0.12)
    A['read']=read_chip(E,rng)
    A['buttons']=rate(0.2+0.75*E.p['ctrlLiteracy'],rng,n,0.12)
    if r['with']!='Один (одна)': A['coop']=rate(0.35+0.55*t['social']+0.1*(0.3 if E.support else 0),rng,n,0.1)
    A['pretty']=rate(0.5+0.4*t['art']+0.1*t['enthu'],rng,n,0.1);A['looks']=rate(0.5+0.4*t['art']+0.1*t['enthu'],rng,n,0.1)
    pl=[p for p,fl in PLACE_FIRST.items() if E.has(fl)]
    A['place']=rng.choice(pl)
    A['music']=rate(0.4+0.5*t['music']+0.1*t['enthu'],rng,n,0.1)
    if rng.random()<0.55: A['drawing']=('__DRAW__:hero:'+hero) if rng.random()<0.7 else ('__DRAW__:place:'+A['place'])
    A['again']='Да, очень хочу!' if ov>0.62 else 'Может быть' if ov>0.38 else 'Нет'
    A['add']=rng.choice(T.ADD_78)
    pain=E.hardest(1);reason=E.reason(pain[0])[0] if pain else 'none'
    if cf<0.5 or A['read'] in('Мне читал взрослый','Не всегда'): A['change']=T.CHANGE_78['reading']
    elif E.total_downs()>6: A['change']=T.CHANGE_78['combat']
    elif not E.end: A['change']=T.CHANGE_78['save']
    else: A['change']=rng.choice([T.CHANGE_78['cine'],T.CHANGE_78['none'],T.CHANGE_78['puzzle']])
    A['stars']=int(clamp(round(1+4*ov+rng.gauss(0,0.35)+ (0.5 if t['enthu']>0.7 else 0)),3 if ov>0.4 else 1,5))
    return A

# =============================================================================================== 9–10 лет
def ans_910(E):
    rng=seed_of('a910',E.id);t=E.t;r=E.r;A={};n=5;ov=E.overall();cf=comp_frac(E)+(0.2 if E.support else 0)
    A['age']=str(r['age']);A['with']=[r['with']]
    A['mode']=mode_labels(E,rng);A['input']=['Клавиатура'] if r['input']=='клавиатура' else ['Джойстик (геймпад)']
    pf=played_fraction(E);A['done']='Всё до конца' if E.end else 'Почти всё' if pf>0.75 else 'Половину' if pf>0.4 else 'Меньше половины'
    pu=paths_used(E);A['path']=pu[0] if len(pu)==1 else pu[-1]
    if rng.random()<0.12: A['path']='Не выбирал / не знаю'
    A['story_like']=rate(0.2+0.75*ov,rng,n,0.1)
    A['story_clear']='Всё понятно' if cf>0.85 else 'Почти всё' if cf>0.45 else 'Многое непонятно'
    if A['story_clear']!='Всё понятно':
        A['story_what']=rng.choice(['Зачем Кощей порвал цепь и почему Звенышко пропало.','Сказы — не понял, что мы выбираем и зачем.','Что делать в некоторых уровнях, там много слов.','Кто такие Сирин и Алконост и зачем они.','Почему нельзя просто победить Кощея сразу.'])
    hw=[1.0,1.0,0.9,0.9];hero=rng.choices(HEROES,weights=hw)[0];A['hero']=hero;A['hero_why']=rng.choice(T.HERO_WHY[hero])
    opts=[o['v'] if isinstance(o,dict) else o for o in QMAP['9-10']['friends']['o']]
    pool=[c for c in opts if E.has(CHAR_FIRST.get(c,'p'))];w=[1.5 if c in('Кот Учёный','Колобок','Змей Горыныч','Жар-птица','Золотая рыбка','Кузьма-кузнец','Три богатыря') else 1.0 for c in pool]
    A['friends']=pick_w(rng,pool,w,3)
    bossdone=sum(1 for l in('1-B','2-B','3-B','4-B','5-B2') if E.has(l))
    A['skazy']=rate(0.35+0.4*t['verbal']+0.25*ov,rng,n,0.12) if bossdone else None
    if E.has('5-B2'): A['koschei']=rate(0.3+0.65*ov,rng,n,0.12)
    fl=[l for l in E.played if l in T.FUNNY];A['funny']=rng.choice(T.FUNNY[rng.choice(fl)]) if fl else 'когда Звенышко пищало'
    # миры
    W=A['worlds']={}
    for w,nm in T.__dict__.get('_',{}).items(): pass
    names={1:'Дремучий лес',2:'Подводный Китеж',3:'Небесное царство',4:'Огненная Смородина',5:'Остров Буян'}
    for w,nm in names.items():
        v=world_sat(E,w);W[nm]='na' if v is None else rate(v,rng,n,0.08)
    W['Лукоморье']=rate(0.55+0.3*t['collect']+0.15*t['enthu'],rng,n,0.12)
    opts=[o for o in QMAP['9-10']['levels_best']['o']]
    pool=[(l,cat[l]['survey']) for l in E.played if cat[l].get('survey') in opts]
    A['levels_best']=[nm for l,nm in sorted(pool,key=lambda x:-E.fun[x[0]])[:3]]
    hl=E.hardest(1)
    if hl: A['level_hard']=level_reason_text(E,hl[0],rng)
    B=A['bosses']={}
    for b,ls in BOSS_LV.items():
        got=[l for l in ls if E.has(l)];B[b]='na' if not got else rate(sum(E.fun[l] for l in got)/len(got)+0.08,rng,n,0.1)
    dn=sum(E.mem[l]['diff'] for l in E.played)/len(E.played);A['hard']=int(clamp(round(dn+rng.gauss(0,0.3)),1,5))
    kn=E.p['pParry']
    A['signals']='Да, сразу понял' if (r['gaming']==2 or cf>0.8) else 'Понял не сразу' if cf>0.3 else 'Так и не понял'
    ab=[o for o in QMAP['9-10']['ability']['o']];aw=[(1.6 if E.has(ABIL_FIRST[o]) and ABIL_FIRST[o]!='p' else 1.0 if E.has(ABIL_FIRST[o]) else 0.001) for o in ab]
    A['ability']=pick_w(rng,ab,aw,1)[0]
    st=sum(len(l['stuck']) for l in E.S['levels'])/max(1,len(E.S['levels']));A['stuck']='Да' if st>0.5 or E.ent['asks']>4 else 'Нет'
    if A['stuck']=='Да': A['stuck_where']=level_reason_text(E,max([l for l in E.played if l!='luko'],key=lambda l:E.recs[l]['stuck_s']+rng.random()),rng)
    A['hints']=rate(0.2+0.65*clamp(cf,0,1)+0.1*(1 if E.support else 0),rng,n,0.1)
    A['fight']=rate(0.25+0.5*t['action']+0.2*(1-min(1,E.total_downs()/30)),rng,n,0.12);A['slash']=rate(0.55+0.4*t['art']+0.1*t['enthu'],rng,n,0.1)
    if not E.solo: A['coop']=rate(0.35+0.55*t['social']+0.1*(0.3 if E.support else 0),rng,n,0.1)
    if 'Вдвоём, экран делился пополам' in A['mode']: A['split']=rate(0.45+0.3*t['enthu']+(-0.15 if E.g=='9-10' else 0),rng,n,0.15)
    A['downed']=rate(0.5+0.35*t['enthu']+0.1*(1 if E.ent['downs']>3 else 0),rng,n,0.12)
    # Лукоморье
    hf=hub_flags(E);L={}
    rows=[('Кузня Кузьмы: ковать звенья в такт','forge'),('Лавка Векши и примерочная: наряды','shop'),('Огород Дедки','garden'),('Курочка Ряба','hen'),('Сказки-лубки и пляски Кота','tales'),('Застава трёх богатырей','zastava')]
    for nm,k in rows:
        if hf[k]:
            base={'forge':0.45+0.25*t['music'],'shop':0.7+0.25*t['collect'],'garden':0.5+0.25*t['collect'],'hen':0.6+0.25*t['collect'],'tales':0.5+0.25*t['music'],'zastava':0.4+0.35*t['action']}[k]
            L[nm]=rate(base,rng,n,0.12)
        else: L[nm]='na'
    A['luko']=L
    A['luko_add']=rng.choice(['Больше нарядов и танцев.','Мини-игры: рыбалка и догонялки.','Чтобы курочка росла и приносила больше яичек.','Дом для героев, чтобы можно было его украшать.','Питомцев.','Чтобы можно было сразу выбрать любой уровень без карты.'])
    A['pretty']=rate(0.5+0.4*t['art']+0.1*t['enthu'],rng,n,0.1);A['looks']=rate(0.5+0.4*t['art']+0.1*t['enthu'],rng,n,0.1)
    A['movies']=rate(0.5+0.35*t['humor']+0.1*t['enthu'],rng,n,0.12)
    rd=read_chip(E,rng)
    A['subs']='Да, всё понятно' if rd=='Да, успевал' and cf>0.75 else 'Иногда не успевал' if cf>0.5 else 'Были непонятные слова'
    if E.support and E.p['readCps']<4 and rng.random()<0.4: A['subs']='Не читал'
    A['music']=rate(0.45+0.5*t['music'],rng,n,0.1);A['sounds']=rate(0.55+0.35*t['music'],rng,n,0.1)
    pl=[p for p,fl in PLACE_FIRST.items() if E.has(fl)];A['place']=rng.choice(pl)
    if rng.random()<0.45: A['drawing']='__DRAW__:add:'+rng.choice(['dragon','castle','ship','cat','gor','whale','fox'])
    A['stars']=int(clamp(round(1+4*ov+rng.gauss(0,0.4)),1,5))
    A['recommend']='Точно посоветую' if ov>0.62 else 'Может быть' if ov>0.4 else 'Нет'
    A['best']=rng.choice(T.BEST_910);hl=E.hardest(1)
    A['fix']=(T.why(E.reason(hl[0])[0],'9-10',rng).capitalize()+'.') if hl and E.mem[hl[0]]['F']>1.0 else rng.choice(['Исправить, чтобы не падать так часто.','Не знаю, всё классно.','Чтобы мультики можно было пропускать сразу.','Чтобы подсказки были не только текстом.'])
    A['add']=rng.choice(T.ADD_910)
    return A

# =============================================================================================== 11–13 лет
def ans_1113(E):
    rng=seed_of('a1113',E.id);t=E.t;r=E.r;A={};n=5;ov=E.overall();cf=comp_frac(E);crit=t['crit']
    A['age']=str(r['age']) if r['age'] in(11,12,13) else ('10 или меньше' if r['age']<11 else '14 или больше')
    A['gamer']=['Почти не играю','Иногда','Часто','Каждый день'][clamp(r['gaming']+rng.choice([0,0,1]),0,3)]
    A['games']=sample_games(E,rng);A['mode']=mode_labels(E,rng)
    if not E.solo:
        mp={'friend':'С другом','sibling':'С братом или сестрой','parent':'С родителем','child':'С родителем'}
        A['partner']=[mp.get(r['role'],'С другом')]
    A['input']=['Клавиатура'] if r['input']=='клавиатура' else ['Геймпад']
    pf=played_fraction(E);A['done']='На 100%: все звенья и Застава' if (E.end and any(E.has(z) for z in('z-i','z-d','z-a')) and t['collect']>0.55) else 'Сюжет до конца' if E.end else 'Почти до конца' if pf>0.7 else 'Примерно половину'
    A['hours']=hours_label13(E.hours);A['path']=paths_used(E)
    # сюжет
    A['story']=rate(0.25+0.65*ov,rng,n,0.12);A['clarity']=rate(0.25+0.65*clamp(cf+(0.15 if E.support else 0),0,1),rng,n,0.12)
    cine=sum(l['cine_s'] for l in E.S['levels'])/max(1,len(E.S['levels']))
    A['pace']='Где-то затянуто, где-то скомкано' if (cine>45 and crit>0.45) or rng.random()<0.25 else 'В самый раз' if rng.random()<0.7 else 'Слишком медленно'
    hr={}
    for h,wt in zip(HEROES,[0.7,0.7,0.65,0.65]):
        hr[h]=rate(wt+0.25*rng.random()+0.1*(t['enthu']-0.5),rng,n,0.1)
    A['heroes']=hr
    opts=[o['v'] if isinstance(o,dict) else o for o in QMAP['11-13']['npc']['o']]
    pool=[c for c in opts if E.has(CHAR_FIRST.get(c,'p'))];w=[1.6 if c in('Кот Учёный','Змей Горыныч','Баба-Яга','Кощей','Жар-птица') else 1.0 for c in pool]
    A['npc']=pick_w(rng,pool,w,1)[0]
    A['villain']=rate(0.35+0.4*ov+0.15*t['verbal'],rng,n,0.15) if E.has('3-B') else None
    A['humor']=rate(0.35+0.5*t['humor']+0.1*ov-0.25*crit,rng,n,0.12)
    dl=[]
    if crit>0.45 and E.g=='11-13': dl.append('Слишком детские')
    if rng.random()<clamp(0.2+0.5*(1-cf)+0.25*crit,0.05,0.85): dl.append('Слишком длинные')
    if not dl or rng.random()<0.6: dl.append('Нормальные' if rng.random()<0.6 else 'Живые и интересные')
    A['dialog']=dl[:2]
    A['choices']=rate(0.3+0.4*t['verbal']+0.25*ov,rng,n,0.15) if any(E.has(l) for l in('1-B','2-B')) else None
    A['moment']=rng.choice(['Когда кит чихнул и всех выбросило на берег.','Бой с Горынычем: три головы и узда.','Финал с Кощеем и страницы-порталы.','«Иди. Я держу» на Калиновом мосту.','Когда Кощей порвал цепь на дубе и забрал Звенышко.','Полёт на Горыныче в «Утке».','Погоня за Звенышком в прологе.']) if E.has('4-B') or E.has('2-4') else rng.choice(['Первая битва с Лешим.','Колобок и музыка.','Погоня за Звенышком в прологе.'])
    A['weird']=rng.choice(['Непонятно, почему нельзя сразу победить Кощея — зачем собирать все звенья.','Не очень понял связь между Сказами и самим боем.','Логика «зайца загоняют» в «Зайце» объяснена слишком поздно.','Некоторые задачи в рифму — красиво, но трудно понять, что именно делать.','Почему Кот без голоса во втором мире — не сразу понял.']) if crit>0.35 else 'Ничего странного.'
    # миры и уровни
    names={1:'Дремучий лес',2:'Подводный Китеж',3:'Небесное царство',4:'Огненная Смородина',5:'Остров Буян'}
    A['worlds']={nm:('na' if world_sat(E,w) is None else rate(world_sat(E,w),rng,n,0.08)) for w,nm in names.items()}
    opts=QMAP['11-13']['lv_best']['o']
    pool=[(l,cat[l]['survey']) for l in E.played if cat[l].get('survey') in opts]
    A['lv_best']=[nm for l,nm in sorted(pool,key=lambda x:-E.fun[x[0]])[:3]]
    A['lv_worst']=[nm for l,nm in sorted(pool,key=lambda x:E.fun[x[0]])[:3] if nm not in A['lv_best']]
    if A['lv_worst']:
        w0=[l for l,nm in sorted(pool,key=lambda x:E.fun[x[0]])[:3]]
        A['lv_worst_why']='; '.join(level_reason_text(E,l,rng) for l in w0[:2])
    SP={'Ритм-раннеры: Колобок, Сирин и Алконост, «Калинка»':['1-3','3-3','5-4'],'Полёт на Горыныче (Утка)':['5-3'],'Летучий корабль':['3-4'],'Уровни на четверых: Невод, Эй ухнем, Заяц':['2-3','4-3','5-2'],
        'Свет и тень: перо Жар-птицы':['3-1','3-2'],'Прилив и отлив: гусли Садко':['2-1','2-2','2-5'],'Лава и клещи в Смородине':['4-1','4-2','4-4']}
    A['special']={k:('na' if not [l for l in v if E.has(l)] else rate(sum(E.fun[l] for l in v if E.has(l))/len([l for l in v if E.has(l)]),rng,n,0.1)) for k,v in SP.items()}
    A['bosses']={b:('na' if not [l for l in ls if E.has(l)] else rate(sum(E.fun[l] for l in ls if E.has(l))/len([l for l in ls if E.has(l)])+0.05,rng,n,0.1)) for b,ls in BOSS_LV.items()}
    hb=[(l,E.mem[l]['F']) for l in('1-B','2-B','3-B','4-B','5-B1','5-B2') if E.has(l)]
    if hb and crit>0.3:
        l=max(hb,key=lambda x:x[1])[0];A['boss_unfair']=f'{BOSS_LV_NAME(l)}: {T.why(E.reason(l)[0],"11-13",rng)}.'
    else: A['boss_unfair']='Нечестных не было.'
    # бой
    A['diff']={nm:('na' if diff_world(E,w) is None else int(clamp(round(diff_world(E,w)+rng.gauss(0,0.25)),1,5))) for w,nm in names.items()}
    dn=E.total_downs()/max(1,n_level(E))
    A['combat']=rate(0.3+0.4*t['action']+0.25*(1-min(1,dn)),rng,n,0.12)
    cb=[]
    if cf<0.55: cb.append('Непонятные знаки над врагами')
    if dn>1.2: cb.append('Враги слишком сильные')
    if crit>0.5 and rng.random()<0.3: cb.append('Мало приёмов')
    if rng.random()<0.12: cb.append('Камера мешала')
    A['combat_bad']=cb or ['Ничего не мешало']
    A['signals']=rate(0.3+0.6*clamp(cf+0.1*r['gaming'],0,1),rng,n,0.12)
    hero_rate=lambda h:hr[h]
    ab={'Рогатка Прошки':('p','Прошка'),'Подкидка и щит Потапа':('p','Потап'),'Совиный взор и полёт Пелагеи':('p','Пелагея'),'Ковшик Йоши: живая и мёртвая вода':('p','Йоша'),'Клубок-путеводитель':('1-1',None),'Гусли Садко':('2-1',None),'Перо Жар-птицы':('3-1',None),'Кузнечные клещи':('4-1',None)}
    A['abilities']={k:('na' if not E.has(fl) else rate((0.55 if h is None else 0.4+0.5*(hr[h]-1)/4)+0.1*rng.random()+0.1*(t['puzzle']-0.5),rng,n,0.1)) for k,(fl,h) in ab.items()}
    ctrl=0.2+0.7*E.p['ctrlLiteracy']-(0.08 if r['input']=='клавиатура' and E.solo else 0);A['controls']=rate(ctrl,rng,n,0.12)
    if A['controls']<=3: A['controls_bad']=rng.choice(['Много клавиш: щит, кувырок, смена, «Ко мне» — путаюсь.','В одиночке смена героя Q по кругу — часто попадаешь не на того.','На клавиатуре неудобно держать щит и двигаться одновременно.','Кувырок на Shift — неудобно левой рукой.'])
    A['camera']=rate(0.65+0.2*rng.random()-0.1*crit,rng,n,0.1)
    A['hints']=rate(0.2+0.65*clamp(cf+0.1,0,1),rng,n,0.1)
    hl=E.hardest(1)
    A['stuck']=level_reason_text(E,hl[0],rng) if hl and E.mem[hl[0]]['F']>0.6 else 'Почти нигде не застревал.'
    # кооператив
    if not E.solo:
        A['coop_fun']=rate(0.4+0.5*t['social']+0.1*ov,rng,n,0.12)
        role=r['role']
        A['roles']='Один делал больше' if (E.support or (rng.random()<0.25)) else 'Всем было что делать'
        scr=[]
        if rng.random()<0.45: scr.append('Экран слишком часто делился и соединялся')
        if rng.random()<0.25: scr.append('Трудно понять, где мой герой')
        if rng.random()<0.2: scr.append('Мешали друг другу')
        A['screen']=scr or ['Ничего не мешало']
        if 'Вдвоём, экран делился пополам' in A['mode']: A['split']=rate(0.5+0.25*ov-0.1*crit,rng,n,0.15)
    else:
        A['solo']=rate(0.4+0.25*E.p['ctrlLiteracy']-0.1*crit,rng,n,0.12);A['helper']=rate(0.55+0.25*rng.random()-0.1*crit,rng,n,0.12)
    A['downed']=rate(0.55+0.2*t['enthu']-0.05*crit,rng,n,0.12)
    A['coop_note']=(rng.choice(['С другом весело, но когда один далеко убегает, экран делится — путаюсь.','С братом спорили, кто что нажимает на уровнях «на четверых».','Лучше вдвоём — одному труднее держать четырёх героев.','Отдельно было бы полезно показывать, кто что должен сделать.']) if not E.solo else rng.choice(['Одному играть можно, но на уровнях «на четверых» много переключаться.','Помощник нормальный, но иногда стоит не там.','Хотелось бы, чтобы «Ко мне!» работало точнее.']))
    # картинка и звук
    avr=['Графика в целом','Главные герои','Жители сказки','Мороки и боссы','Анимации и мимика','Эффекты ударов','Ролики между уровнями','Меню и интерфейс','Музыка','Звуки','Субтитры']
    base={'Графика в целом':0.7,'Главные герои':0.75,'Жители сказки':0.72,'Мороки и боссы':0.7,'Анимации и мимика':0.65,'Эффекты ударов':0.75,'Ролики между уровнями':0.7,'Меню и интерфейс':0.62,'Музыка':0.5+0.35*t['music'],'Звуки':0.65,'Субтитры':0.4+0.4*clamp(cf,0,1)+0.1*(E.p['readCps']/9-1)}
    A['av']={k:rate(base[k]+0.15*(t['art']-0.5)-0.1*crit,rng,n,0.1) for k in avr}
    A['style']='Как раз для меня' if (rng.random()<0.45 and crit<0.55) else 'Нравится, но это для младших' if crit>0.45 else 'Слишком детский' if rng.random()<0.3 else 'Как раз для меня'
    pl=[p for p,fl in PLACE_FIRST.items() if E.has(fl)];A['place']=rng.choice(pl)
    bug=[]
    if rng.random()<0.12: bug.append('Герой застревал или проваливался')
    if rng.random()<0.1: bug.append('Не пропускался ролик')
    if rng.random()<0.08: bug.append('Кнопка не срабатывала')
    A['bugs']=bug or ['Ничего такого не было']
    if bug: A['bugs_text']={'Герой застревал или проваливался':'Герой застрял у края, помог только «Ко мне!» / колокольчик.','Не пропускался ролик':'Ролик не пропускался, пока не зажали прыжок вдвоём.','Кнопка не срабатывала':'Иногда щит не срабатывал, когда нажимал очень рано.'}[bug[0]]
    A['device']=r['device'] if r['device'] in('Компьютер','Ноутбук') else 'Ноутбук'
    A['stars']=int(clamp(round(1+4*ov+rng.gauss(0,0.4)),1,5))
    nps=int(clamp(round(10*ov+rng.gauss(0,1.2)-crit*1.5),0,10));A['nps']=nps
    A['top']='1) '+rng.choice(T.BEST_1113)+' 2) '+rng.choice(T.BEST_1113)+' 3) '+rng.choice(T.BEST_1113)
    hl=E.hardest(2)
    A['worst']='1) '+(T.why(E.reason(hl[0])[0],'11-13',rng).capitalize() if hl else rng.choice(T.WORST_1113))+'. 2) '+rng.choice(T.WORST_1113)+' 3) '+rng.choice(T.WORST_1113)
    A['change']=rng.choice(['Сделал бы подсказки понятнее и короче.','Добавил бы возможность пропускать ролики сразу.','Сделал бы окна отбива шире на среднем пути.','Добавил бы озвучку задач во всех мирах.','Убрал бы лишние переключения в одиночке.'])
    A['sequel']=pick_w(rng,[o for o in QMAP['11-13']['sequel']['o']],[1.0,1.0,1.1,1.0,0.7,0.8,0.9,0.9],3)
    return A
def BOSS_LV_NAME(l): return {'1-B':'Леший-Путаник','2-B':'Водяной','3-B':'Соловей-Разбойник','4-B':'Змей Горыныч','5-B1':'Кощей в тереме','5-B2':'Кощей Бессмертный'}[l]

# =============================================================================================== 14+
def ans_14(E):
    rng=seed_of('a14',E.id);t=E.t;r=E.r;A={};n=5;ov=E.overall();cf=comp_frac(E);crit=t['crit']
    age=r['age'];A['age']='14–17' if age<18 else '18–24' if age<25 else '25–34' if age<35 else '35–44' if age<45 else '45 и старше'
    mate=byid[r['partner']] if r.get('partner') else None
    if r['id']=='R25': A['role']='Тестирую игры профессионально'
    elif mate and mate['group'] in('7-8','9-10','11-13') and r['role']=='parent': A['role']='Играл(а) вместе с ребёнком'
    elif E.solo: A['role']='Играл(а) сам(а)'
    else: A['role']='Играл(а) сам(а)'
    if A['role'] in('Играл(а) вместе с ребёнком','Наблюдал(а), как играет ребёнок'): A['kid_age']=[{'7-8':'7–8','9-10':'9–10','11-13':'11–13'}[mate['group']]]
    A['exp']=['Почти не играю','Играю иногда','Играю регулярно','Хардкорный игрок / разработчик'][clamp(r['gaming']+(1 if r['id']=='R25' else 0),0,3)]
    A['games']=sample_games(E,rng);A['mode']=mode_labels(E,rng)
    A['input']=['Клавиатура'] if r['input']=='клавиатура' else [rng.choice(['Геймпад Xbox','Геймпад Xbox','Геймпад PlayStation'])]
    pf=played_fraction(E);A['done']='100%: все звенья, самоцветы и Застава' if (E.end and any(E.has(z) for z in('z-i','z-d','z-a')) and t['collect']>0.6) else 'Сюжет до конца' if E.end else 'Почти до конца' if pf>0.7 else 'Около половины'
    A['hours']=hours_label14(E.hours);A['path']=paths_used(E)
    # нарратив (матрица): 9 утверждений
    kidsw=bool(mate and mate['group'] in('7-8','9-10')) or (E.role if hasattr(E,'role') else '') =='x'
    avg_words=sum(prof[l]['words_per_obj'] for l in E.played)/len(E.played)
    NR={'Сюжет понятен детям 7–10 лет':0.55-0.15*(avg_words>16)-0.1*(1 if E.support and mate and mate['group']=='7-8' else 0),
        'История цельная, мотивы героев и злодея ясны':0.7+0.1*ov,'Темп хороший, ролики не затянуты':0.6-0.25*(sum(l['cine_s'] for l in E.S['levels'])/len(E.S['levels'])>50)*crit,
        'Персонажи запоминаются и различаются характерами':0.78,'Диалоги естественные, юмор уместный':0.65+0.15*t['humor']-0.1*crit,
        'Фольклорная основа (Пушкин, былины, сказки) передана бережно и интересно':0.8,'Выборы в Сказах ощущаются значимыми':0.5+0.15*t['verbal'],
        'Финал и концовки работают эмоционально':0.7+0.1*ov,'Субтитры легко читать, лексика понятна детям':0.5-0.2*(avg_words>16)}
    A['nar']={k:rate(v+0.05*rng.random(),rng,n,0.1) for k,v in NR.items()}
    if not E.end: A['nar']['Финал и концовки работают эмоционально']='na'
    A['age_fit']='8+' if (mate and mate['group']=='7-8' and ov<0.6) else '6+' if rng.random()<0.25 else '8+' if rng.random()<0.55 else '10+'
    A['scary']='Пара напряжённых моментов — это нормально' if rng.random()<0.7 else ('Есть моменты, слишком страшные для малышей' if (mate and mate['group']=='7-8' and rng.random()<0.5) else 'Ничего пугающего')
    if A['scary']=='Есть моменты, слишком страшные для малышей': A['scary_what']=rng.choice(['Ролик «Сказок не будет»: Кощей рвёт цепь и забирает Звенышко — для 7-летнего тяжело.','Терем Кощея и «Без имён» — тревожная сцена, ребёнок притих.','Лихо Одноглазое и «в глаз не смотрите» — пугает младших.'])
    A['edu']=rate(0.75+0.15*rng.random(),rng,n,0.08);A['fav']=rng.choice(['Пелагея','Кот Учёный','Йоша','Баба-Яга','Змей Горыныч','Потап','Кощей','Садко'])
    if not E.has('3-B') and A['fav']=='Кощей': A['fav']='Потап'
    A['story_fix']=rng.choice(['Дать связку между мирами: почему именно эти звенья и зачем их ковать в Лукоморье.','Сократить ролики или сделать пропуск одной кнопкой для одного игрока.','Усилить мотив Кощея — его фигура появляется поздно.','Сказы хороши, но их влияние на финал надо показывать явнее.','Лишних сцен нет; нужна карта, где видно, что осталось сделать.'])
    # геймплей
    MECH={'Бой: читаемость сигналов (жёлтый кружок, красный зубец, синяя капля)':0.35+0.6*clamp(cf+0.1*r['gaming'],0,1),'Бой: отбив, кувырок, «Пробой», Богатырский мах и щит':0.5+0.35*t['action'],
          'Способности героев: рогатка, подкидка, ковшик, Совиный взор':0.75,'Чудо-вещи миров: клубок, гусли, перо, клещи':0.7+0.1*t['puzzle'],'Головоломки и совместные задачи':0.55+0.2*t['puzzle']-0.1*crit,
          'Платформинг и передвижение':0.55,'Ритм-раннеры: Колобок, Сирин и Алконост, «Калинка»':0.4+0.45*t['music'],'Особые уровни: корабль, полёт на Горыныче, уровни на четверых':0.7,'Боссы':0.65+0.2*t['action'],'Разнообразие механик по ходу игры':0.85}
    A['mech']={k:rate(v-0.1*crit+0.08*rng.random(),rng,n,0.1) for k,v in MECH.items()}
    names={1:'Дремучий лес',2:'Подводный Китеж',3:'Небесное царство',4:'Огненная Смородина',5:'Остров Буян'}
    A['diff']={nm:('na' if diff_world(E,w) is None else int(clamp(round(diff_world(E,w)+rng.gauss(0,0.25)),1,5))) for w,nm in names.items()}
    pthd=len(paths_used(E))>1 or rng.random()<0.5
    A['paths']='Не пробовали разные' if len(paths_used(E))==1 and rng.random()<0.5 else 'Заметна и уместна' if rng.random()<0.5 else 'Слабо заметна'
    A['onboard']=rate(0.5+0.25*clamp(cf,0,1)+0.1*(1 if E.hours>3 else 0),rng,n,0.1)
    opts=QMAP['14plus']['lv_best']['o'];pool=[(l,cat[l]['survey']) for l in E.played if cat[l].get('survey') in opts]
    A['lv_best']=[nm for l,nm in sorted(pool,key=lambda x:-E.fun[x[0]])[:3]];A['lv_worst']=[nm for l,nm in sorted(pool,key=lambda x:E.fun[x[0]])[:3] if nm not in A['lv_best']]
    ls=sorted(E.hardest(2))
    wl=[l for l in ls if E.mem[l]['F']>0.8]
    A['wall']='; '.join(level_reason_text(E,l,rng) for l in wl) if wl else 'Серьёзных «стен» не было; пара мест, где подсказка пришла позже, чем хотелось бы.'
    hf=hub_flags(E);ECO={'Звенья и кузня Кузьмы':'forge','Орешки, лавка Векши и примерочная':'shop','Самоцветы, сказки-лубки и карта тайников':'tales','Огород Дедки и Курочка Ряба':'garden','Застава трёх богатырей':'zastava','Карта-рушник и выбор уровня':'forge'}
    A['eco']={k:('na' if not hf[v] else rate(0.62+0.15*t['collect']-0.1*crit,rng,n,0.12)) for k,v in ECO.items()}
    # кооператив
    if not E.solo:
        CO={'Оба игрока были вовлечены':0.8-(0.25 if E.support and mate and mate['group'] in('7-8',) else 0),'Роли героев дополняют друг друга':0.85,'Экран делится и соединяется уместно':0.7-0.15*crit,'Разделённый экран удобен':0.65-0.1*crit,'Ребёнок и взрослый могут играть на равных':0.6-(0.2 if E.support and mate and mate['group']=='7-8' else 0.0)}
        A['coop']={k:rate(v+0.05*rng.random(),rng,n,0.1) for k,v in CO.items()}
        if 'Вдвоём, экран делился пополам' not in A['mode']: A['coop']['Разделённый экран удобен']='na'
        if not E.support: A['coop']['Ребёнок и взрослый могут играть на равных']='na'
    else:
        A['solo']={'Переключаться между четырьмя героями удобно':rate(0.35+0.3*E.p['ctrlLiteracy']-0.1*crit,rng,n,0.12),'Помощник справляется с задачами «вдвоём»':rate(0.6-0.1*crit+0.1*rng.random(),rng,n,0.12),'Удобно играть вторым героем, пока первый без сил':rate(0.6+0.1*rng.random(),rng,n,0.12)}
    A['coop_note']=rng.choice(['Кооператив — главный плюс; но на «четверых» один из пары легко остаётся без дела.','Подсказки в кооперативе показывают общую цель, но не показывают, чья очередь.','Ребёнку сложно удерживать контекст задач, взрослому приходится вести.','Одиночный режим с «оставленным героем» работает, но требует понимания идеи.'])
    UI={'Главное меню и пауза (в том числе с двумя геймпадами)':0.65,'HUD: читаемость, нет ли перегруза':0.6-0.1*crit,'Подсказки и задачи внизу экрана':0.5-0.1*(avg_words>16)+0.1*clamp(cf,0,1),'Сохранения и продолжение':0.55,'Камера, в том числе правый стик':0.65,'Видимость героев за препятствиями':0.7,'Управление с клавиатуры':0.6+0.1*(r['input']=='клавиатура'),'Управление с геймпада':0.75 if r['input']=='геймпад' else 'na'}
    A['ui']={k:('na' if v=='na' else rate(v+0.05*rng.random(),rng,n,0.1)) for k,v in UI.items()}
    acc=[]
    if t['crit']>0.4: acc.append('Озвучка реплик')
    if rng.random()<0.45: acc.append('Переназначение кнопок')
    if rng.random()<0.35: acc.append('Помощь в сложных местах')
    if rng.random()<0.25: acc.append('Настройка размера шрифта')
    if rng.random()<0.15: acc.append('Режим для дальтоников')
    A['access']=acc or ['Всего хватает']
    A['ux_note']=rng.choice(['Нижняя карточка задачи занимает внимание, а стихотворная форма мешает быстро найти действие.','Не хватает кнопки «повтори подсказку» во всех мирах (только в мире 1).','Пауза и меню понятны, но «Режим» (O) легко не найти.','Иногда не видно, чей именно герой подсвечен — особенно в сплите.'])
    VIS={'Общий low-poly стиль':0.8,'Окружение и атмосфера миров':0.82,'Главные герои':0.8,'Жители сказки':0.78,'Мороки и боссы':0.75,'Анимация и мимика':0.7,'Эффекты ударов и VFX':0.72,'Ролики: режиссура и камера':0.72,'Свет и палитра':0.78}
    A['vis']={k:rate(v+0.12*(t['art']-0.5)-0.05*crit,rng,n,0.08) for k,v in VIS.items()}
    A['style']=['Подходит детям','Узнаваемый и свой'] if rng.random()<0.7 else ['Подходит детям']
    pl=[p for p,fl in PLACE_FIRST.items() if E.has(fl)];A['place']=rng.choice(pl)
    A['art_note']=rng.choice(['Читаемость мороков на фоне эффектов в некоторых мирах; знаки лучше выделять контуром.','Мимика героев в роликах небогата по сравнению с хорошо проработанными окружениями.','Больше разнообразия персонажей второго плана.','Свет и тень в мире 3 — красиво, но светомостки сливаются с фоном.'])
    SND={'Музыка: фольклорный саундтрек':0.6+0.3*t['music'],'Песни в ритм-уровнях':0.55+0.3*t['music'],'Звуковые эффекты':0.72,'Баланс громкости':0.55}
    A['snd']={k:rate(v-0.05*crit,rng,n,0.1) for k,v in SND.items()}
    A['voice']='Хватает субтитров и звуков' if rng.random()<0.4 else 'Нужна полноценная озвучка героев'
    A['snd_note']=rng.choice(['Баланс голоса и музыки гуляет в роликах — реплики местами тонут.','Фольклорные мотивы хороши; в ритм-уровнях хотелось бы тише метроном.','Звуки знаков (бубенец, рык, «бульк») хорошо различимы — удачная находка.','Озвучка есть в роликах, но задачи внизу экрана не озвучены (кроме мира 1).'])
    A['device']=r['device'];A['browser']=r['browser'];A['perf']=int(clamp(rng.choice([4,4,5,5,3]),1,5))
    bug=[]
    if rng.random()<0.15: bug.append('Герой застревал или проваливался')
    if rng.random()<0.12: bug.append('Не пропускался ролик')
    if rng.random()<0.08: bug.append('Игра тормозила')
    A['bugs']=bug or ['Ничего такого не было']
    if bug: A['bug_text']={'Герой застревал или проваливался':'Герой на краю платформы вошёл в препятствие; выручил колокольчик/«Ко мне!».','Не пропускался ролик':'Ролик не пропускался одним игроком — пока второй не зажал прыжок; ребёнок ждал.','Игра тормозила':'На ноутбуке без дискретной графики проседание кадров на больших сценах (мир 5).'}[bug[0]]
    A['nps']=int(clamp(round(10*ov+rng.gauss(0,1.0)-crit*1.2+0.3),0,10));A['stars']=int(clamp(round(1+4*ov+rng.gauss(0,0.3)),1,5))
    A['price']=rng.choice(['300–700 ₽','300–700 ₽','700–1500 ₽','До 300 ₽']) if ov>0.45 else rng.choice(['До 300 ₽','Бесплатно'])
    A['buy']='Да' if ov>0.72 else 'Скорее да' if ov>0.5 else 'Скорее нет'
    A['top']='1) '+rng.choice(['фольклорная основа и юмор','кооператив на двоих с разными ролями','визуальный стиль и атмосфера миров','разнообразие механик по мирам'])+'; 2) '+rng.choice(['музыка и ритм-уровни','боссы с несколькими этапами','кузня и наряды как «мягкая» награда','язык боя: сигнал → защита → ответ'])+'; 3) '+rng.choice(['Звенышко как проводник','идея «оставленный держит»','хаб Лукоморье'])
    hl=E.hardest(2)
    A['bottom']='1) '+(T.why(E.reason(hl[0])[0],'14+',rng) if hl else 'подсказки приходят поздно')+'; 2) '+rng.choice(['много текста в задачах, озвучен только мир 1','непрозрачные парные головоломки для одиночки','в мирах 2–5 нет смягчения сложности для детей','длинные ролики и ограниченный пропуск'])+'; 3) '+rng.choice(['мало подсказок про Сказы и их роль','редкие, но заметные места, где герой застревает','избыточные переключения героев'])
    A['change']=rng.choice(['Распространить детские настройки мира 1 (окна отбива, подсказки, чтение вслух) на все миры.','Озвучить задачи во всех мирах и показывать иконки кнопок.','Дать сохранение внутри уровня.','Ускорить подсказку-ореол на длинных уровнях.','Добавить сложность «по умолчанию» отдельно для ребёнка и взрослого.'])
    if rng.random()<0.25 and r['gaming']>=1: A['contact']='да, готов(а) протестировать ещё'
    return A

ANS={'7-8':ans_78,'9-10':ans_910,'11-13':ans_1113,'14plus':ans_14}
def clean(A,key):
    """оставить только вопросы опросника, выбросить None, привести к допустимым значениям"""
    Q=QMAP[key];out={}
    for qid,v in A.items():
        if v is None or qid not in Q: continue
        out[qid]=v
    return out
def main():
    meta={}
    for rid,r in byid.items():
        E=Exp(rid);key={'7-8':'7-8','9-10':'9-10','11-13':'11-13','14+':'14plus'}[r['group']]
        A=clean(ANS[key](E),key)
        dur={'7-8':rng_dur(rid,780,1100),'9-10':rng_dur(rid,780,1000),'11-13':rng_dur(rid,780,1250),'14+':rng_dur(rid,1000,1700)}[r['group']]
        json.dump({'id':rid,'survey':key,'durationSec':dur,'answers':A},open(os.path.join(OUT,rid+'.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
        meta[rid]=len(A)
    print(len(meta),'респондентов; ответов в среднем',sum(meta.values())/len(meta))
def rng_dur(rid,lo,hi): return int(seed_of('dur',rid).uniform(lo,hi))
if __name__=='__main__': main()
