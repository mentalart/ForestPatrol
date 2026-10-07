"""Ядро заполнения опросников: из телеметрии сессии и склада респондента — его «опыт» (что видел, где трудно, что понравилось).
Все субъективные оценки (нравится/не нравится, любимые герои, смешное) — МОДЕЛЬНЫЕ ответы персон, а не данные: их нельзя читать как
популярность. Объективная часть (где застревали, падали, сколько читать, сколько длилась игра) идёт из телеметрии (sim_sessions.py)."""
import json,os,math,random,collections,re
HERE=os.path.dirname(os.path.abspath(__file__));D=os.path.join(HERE,'data')
clamp=lambda x,a,b:max(a,min(b,x))
cat=json.load(open(os.path.join(HERE,'levels_catalog.json'),encoding='utf-8'))
roster=json.load(open(os.path.join(D,'roster.json'),encoding='utf-8'));byid={r['id']:r for r in roster}
sessions=json.load(open(os.path.join(D,'sessions.json'),encoding='utf-8'))
prof=json.load(open(os.path.join(D,'level_profiles.json'),encoding='utf-8'))
SESS_OF={m:sid for sid,s in sessions.items() for m in s['members']}
WORLD_NAMES={1:'Дремучий лес',2:'Подводный Китеж',3:'Небесное царство',4:'Огненная Смородина',5:'Остров Буян'}
SURVEY_LEVELS=[k for k in sorted(cat,key=lambda k:cat[k]['order']) if cat[k].get('survey') and k not in('luko',) and not k.startswith('z-')]
# «изюминка» уровня: небольшая поправка к вкусу (из описаний в вики — чем уровень запоминается), ±0.1
WOW={'1-1':0.04,'1-3':0.08,'2-2':0.08,'2-4':0.06,'3-1':0.03,'3-4':0.06,'4-1':0.04,'4-5':0.05,'5-3':0.10,'5-4':0.02,'5-2':0.0,'5-1':-0.02,'2-3':0.0,'3-5':0.02}
BOSS_OF={'1-B':'Леший-Путаник','2-B':'Водяной','3-B':'Соловей-Разбойник','4-B':'Змей Горыныч','5-B2':'Кощей Бессмертный','5-B1':'Кощей Бессмертный'}
def seed_of(*a): return random.Random('|'.join(str(x) for x in a))

class Exp:
    """опыт одного респондента"""
    def __init__(self,rid):
        self.r=byid[rid];self.id=rid;self.sid=SESS_OF[rid];self.S=sessions[self.sid]
        self.rng=seed_of('exp',rid);self.t=self.r['traits'];self.p=self.r['params'];self.g=self.r['group']
        self.recs={l['lv']:l for l in self.S['levels']}
        self.played=[l['lv'] for l in self.S['levels']]
        self.mem={lv:self.recs[lv]['members'][rid] for lv in self.played}
        self.support=self.S['support'];self.solo=self.S['solo']
        self.quit=self.S['quit_level'];self.end=self.S['reached_end']
        self.hours=self.S['total_min']/60
        self.ent=self.S['ent'][rid]
        self.fun={lv:self.level_fun(lv) for lv in self.played}
        self.seen_worlds=sorted({cat[lv]['world'] for lv in self.played if cat[lv]['world']>0})
    # ---------- вкус ----------
    def level_fun(self,lv):
        C=cat[lv];rec=self.recs[lv];m=self.mem[lv];t=self.t;rng=seed_of('fun',self.id,lv)
        x=0.58+0.2*(t['enthu']-0.6)+WOW.get(lv,0)
        ty=C['type']
        if ty=='rhythm':
            x+=0.35*(t['music']-0.5)+(-0.25 if (m['miss'] or 0)>0.35 else 0.05)
        elif ty=='four': x+=0.30*(t['social']-0.5)-(0.08 if self.solo else 0)
        elif ty=='boss': x+=0.30*(t['action']-0.5)+0.05
        elif ty=='flight': x+=0.12+0.15*(t['action']-0.5)
        elif ty in('adventure','tutorial'): x+=0.30*(t['puzzle']-0.5)+0.12*(t['action']-0.5)
        elif ty=='story': x+=0.05
        x+=0.08*min(1,rec['cine_s']/120)*(1 if self.g in('7-8','9-10') else 0.5)
        ref=0.45*self.p['patienceMin']
        x-=0.45*min(1.5,m['F']/ref)*(0.7 if self.support else 1.0)
        x+=rng.gauss(0,0.09)
        return clamp(x,0,1)
    def sat(self,lv): return clamp(self.fun[lv]*0.75+(1-(abs(self.mem[lv]['diff']-2.6)/2.4))*0.25,0,1)
    def world_levels(self,w): return [lv for lv in self.played if cat[lv]['world']==w and lv in SURVEY_LEVELS or (cat[lv]['world']==w and cat[lv]['type']=='boss')]
    def world_stat(self,w,key):
        ls=[lv for lv in self.played if cat[lv]['world']==w]
        if not ls: return None
        if key=='sat': return sum(self.sat(l) for l in ls)/len(ls)
        if key=='diff': return sum(self.mem[l]['diff'] for l in ls)/len(ls)
        if key=='F': return sum(self.mem[l]['F'] for l in ls)
        if key=='downs': return sum(self.mem[l]['downs'] for l in ls)
    def overall(self):
        sats=[self.sat(l) for l in self.played if l not in('luko',)]
        base=sum(sats)/len(sats) if sats else 0.5
        base=0.75*base+0.25*self.t['enthu']
        if not self.end: base-=0.06
        return clamp(base,0,1)
    def has(self,lv): return lv in self.recs
    def reason(self,lv):
        """главная причина трудности уровня для этого игрока: ключ + число"""
        rec=self.recs[lv];m=self.mem[lv];P=prof[lv]
        parts={'reading':0.0,'puzzle':rec['stuck_s']/60,'combat':0.4*m['downs']+0.6*rec['enc_fail'],'rhythm':0.8 if (m['miss'] or 0)>0.35 else 0.0}
        parts['reading']=0.04*rec['unread']+(rec['read_s']/60)*0.3*(1 if self.g=='7-8' else 0.3 if self.g=='9-10' else 0.1)
        if P['coop_obj']>=3 and self.solo: parts['coop_solo']=0.3*P['coop_obj']*0.2
        k=max(parts,key=parts.get);return k,parts[k]
    def hardest(self,n=3):
        lv=[l for l in self.played if l not in('luko','epi') and not l.startswith('z-')]
        return sorted(lv,key=lambda l:-self.mem[l]['F'])[:n]
    def worst_fun(self,n=3):
        lv=[l for l in self.played if cat[l].get('survey') and not l.startswith('z-') and l!='luko']
        return sorted(lv,key=lambda l:self.fun[l])[:n]
    def best_fun(self,n=3):
        lv=[l for l in self.played if cat[l].get('survey') and not l.startswith('z-') and l!='luko']
        return sorted(lv,key=lambda l:-self.fun[l])[:n]
    def total_downs(self): return self.ent['downs']
    def understood_frac(self):
        n=sum(l['objs'] for l in self.S['levels']);u=sum(l['understood'] for l in self.S['levels']);return u/max(1,n)

def faces_from(x,n,rng,sd=0.08):
    """x∈[0,1] → рожица 1..n"""
    return int(clamp(1+round(clamp(x+rng.gauss(0,sd),0,1)*(n-1)),1,n))
def pick_w(rng,items,weights,k=1,unique=True):
    items=list(items);weights=[max(1e-6,w) for w in weights];out=[]
    for _ in range(min(k,len(items))):
        s=sum(weights);r=rng.random()*s;acc=0
        for i,(it,w) in enumerate(zip(items,weights)):
            acc+=w
            if r<=acc: out.append(it);items.pop(i);weights.pop(i);break
    return out
def lvname(lv): return cat[lv]['name']
