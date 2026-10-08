#!/usr/bin/env python3
"""Состав симулированного плейтеста: 10 пар (20 человек) + 5 одиночек. Детерминированно (seed): те же числа при каждом запуске.
Каждому респонденту — возрастная группа (personas.json), возраст, роль, игровой опыт, индивидуальные параметры «игрока» (с отклонением
от группового) и черты вкуса для ответов на опросник. Запуск: python3 tools/playtest/make_roster.py → tools/playtest/data/roster.json"""
import json,os,random,math
HERE=os.path.dirname(os.path.abspath(__file__))
P=json.load(open(os.path.join(HERE,'personas.json'),encoding='utf-8'))
G=P['groups'];GM=P['gaming']
SEED=20261007

# (id, группа, возраст, роль, игровой опыт 0/1/2, устройство ввода, полоса возраста для 14+, пара, режим, место)
R=[
 # пары
 ('R01','7-8', 8,'child',  1,'клавиатура',None,   'P01','pair',2),
 ('R02','14+',38,'parent', 0,'клавиатура','35–44','P01','pair',1),
 ('R03','7-8', 7,'child',  0,'клавиатура',None,   'P02','pair',2),
 ('R04','14+',41,'parent', 1,'клавиатура','35–44','P02','pair',1),
 ('R05','7-8', 8,'child',  1,'клавиатура',None,   'P03','pair',1),
 ('R06','11-13',12,'sibling',2,'клавиатура',None, 'P03','pair',2),
 ('R07','7-8', 7,'friend', 0,'клавиатура',None,   'P04','pair',1),
 ('R08','7-8', 8,'friend', 1,'клавиатура',None,   'P04','pair',2),
 ('R09','9-10',10,'child', 1,'клавиатура',None,   'P05','pair',2),
 ('R10','14+',36,'parent', 1,'клавиатура','35–44','P05','pair',1),
 ('R11','9-10', 9,'friend',1,'клавиатура',None,   'P06','pair',1),
 ('R12','9-10',10,'friend',2,'геймпад',  None,    'P06','pair',2),
 ('R13','9-10',10,'sibling',1,'клавиатура',None,  'P07','pair',2),
 ('R14','11-13',13,'sibling',2,'геймпад', None,   'P07','pair',1),
 ('R15','11-13',12,'friend',1,'клавиатура',None,  'P08','pair',1),
 ('R16','11-13',12,'friend',2,'клавиатура',None,  'P08','pair',2),
 ('R17','11-13',13,'child', 1,'клавиатура',None,  'P09','pair',2),
 ('R18','14+',44,'parent', 0,'клавиатура','35–44','P09','pair',1),
 ('R19','14+',16,'friend', 2,'геймпад',  '14–17','P10','pair',1),
 ('R20','14+',29,'friend', 1,'клавиатура','25–34','P10','pair',2),
 # одиночки
 ('R21','7-8', 8,'solo',   1,'клавиатура',None,   None,'solo',1),
 ('R22','9-10', 9,'solo',  1,'клавиатура',None,   None,'solo',1),
 ('R23','11-13',11,'solo', 1,'клавиатура',None,   None,'solo',1),
 ('R24','11-13',13,'solo', 2,'геймпад',  None,    None,'solo',1),
 ('R25','14+',27,'solo',   2,'клавиатура','25–34',None,'solo',1),
]
KIDS_WITH={ # с кем играл (для вопроса «с кем»)
 'parent':'С мамой или папой','sibling':'С братом или сестрой','friend':'С другом или подругой','child':'С мамой или папой','solo':'Один (одна)'}

def lognorm(rng,sd): return math.exp(rng.gauss(0,sd))
def clamp(x,a,b): return max(a,min(b,x))

def build(row,pairmap):
    rid,grp,age,role,gam,inp,band,pair,mode,seat=row
    rng=random.Random(f'{SEED}-{rid}')
    g=G[grp]
    sd=0.14
    gk=str(gam)
    p={
     'rt':     g['rt']*lognorm(rng,sd)*GM['rt'][gk],
     'rtSd':   g['rtSd']*lognorm(rng,0.1),
     'timeSd': g['timeSd']*lognorm(rng,sd)*GM['timeSd'][gk],
     'lapse':  clamp(g['lapse']*lognorm(rng,0.25)*GM['lapse'][gk],0.01,0.45),
     'habitHold':clamp(g['habitHold']+rng.gauss(0,0.12),0.02,0.95),
     'pParry': clamp(g['pParry']*lognorm(rng,0.3)*GM['pParry'][gk],0.0,0.92),
     'pRoll':  clamp(g['pRoll']*lognorm(rng,0.2)*GM['pRoll'][gk],0.05,0.98),
     'learn':  clamp(g['learn']*lognorm(rng,0.25),0.005,0.1),
     'mash':   clamp(g['mash']+rng.gauss(0,0.12),0.02,0.97),
     'moveErr':clamp(g['moveErr']*lognorm(rng,0.25),0.02,0.6),
     'nav':    g['nav']*lognorm(rng,0.12)*GM['nav'][gk],
     'readCps':g['readCps']*lognorm(rng,0.2),
     'patienceMin':g['patienceMin']*lognorm(rng,0.25),
     'confuseMean':g['confuseMean']*lognorm(rng,0.25),
    }
    if inp=='геймпад': p['ctrlLiteracy']=clamp(g['ctrlLiteracy']*0.95+0.05,0,1)
    else: p['ctrlLiteracy']=clamp(g['ctrlLiteracy']+rng.gauss(0,0.08),0.1,1)
    # путь сложности
    pp=g['pathProb'];r=rng.random();path='easy' if r<pp['easy'] else 'mid' if r<pp['easy']+pp['mid'] else 'hard'
    if role=='parent' and grp=='14+':   # родитель играет с ребёнком: «Лёгкий» или «Средний» — как у ребёнка
        path='easy' if rng.random()<0.5 else 'mid'
    # вкус и склад (0..1), для ответов на опросник
    young=grp in('7-8','9-10')
    traits={
     'enthu': clamp(rng.gauss(0.72 if young else 0.58,0.15),0.15,0.98),
     'crit':  clamp(rng.gauss(0.18 if grp=='7-8' else 0.28 if grp=='9-10' else 0.5 if grp=='11-13' else 0.62,0.14),0.02,0.95),
     'humor': clamp(rng.gauss(0.65,0.2),0.05,1),
     'action':clamp(rng.gauss(0.6,0.22),0.05,1),
     'puzzle':clamp(rng.gauss(0.5,0.22),0.05,1),
     'music': clamp(rng.gauss(0.55,0.22),0.05,1),
     'art':   clamp(rng.gauss(0.55,0.2),0.05,1),
     'fear':  clamp(rng.gauss({'7-8':0.5,'9-10':0.32,'11-13':0.18,'14+':0.1}[grp],0.18),0.0,1),
     'social':clamp(rng.gauss(0.65,0.2),0.05,1),
     'collect':clamp(rng.gauss(0.5,0.25),0.0,1),
     'verbal':clamp(rng.gauss({'7-8':0.25,'9-10':0.45,'11-13':0.6,'14+':0.8}[grp],0.15),0.05,1),   # охота писать развёрнуто
    }
    d={'id':rid,'group':grp,'age':age,'role':role,'gaming':gam,'input':inp,'mode':mode,'pair':pair,'seat':seat,'path':path,
       'ageBand':band,'with':KIDS_WITH[role] if role!='solo' else 'Один (одна)','params':{k:round(v,4) for k,v in p.items()},
       'traits':{k:round(v,3) for k,v in traits.items()},
       'device':rng.choice(['Компьютер','Ноутбук','Ноутбук']) if grp!='14+' else rng.choice(['Настольный ПК','Ноутбук','Ноутбук','Mac']),
       'browser':rng.choice(['Chrome','Chrome','Chrome','Edge','Яндекс Браузер','Firefox'])}
    return d

def main():
    pairmap={}
    for r in R:
        if r[7]: pairmap.setdefault(r[7],[]).append(r[0])
    roster=[build(r,pairmap) for r in R]
    for d in roster:
        if d['pair']: d['partner']=[x for x in pairmap[d['pair']] if x!=d['id']][0]
    # в паре у ребёнка и родителя уровень «щедрого окна» единый: путь родителя не жёстче пути ребёнка
    byid={d['id']:d for d in roster}
    order={'easy':0,'mid':1,'hard':2}
    for d in roster:
        if d.get('partner') and d['role']=='parent':
            kid=byid[d['partner']]
            if order[d['path']]>order[kid['path']]: d['path']=kid['path']
    out=os.path.join(HERE,'data','roster.json');os.makedirs(os.path.dirname(out),exist_ok=True)
    json.dump(roster,open(out,'w',encoding='utf-8'),ensure_ascii=False,indent=1)
    from collections import Counter
    print(len(roster),'респондентов:',Counter(d['group'] for d in roster),Counter(d['mode'] for d in roster),Counter(d['path'] for d in roster))
main()
