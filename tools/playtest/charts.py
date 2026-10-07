#!/usr/bin/env python3
"""Графики отчёта (matplotlib) → tools/playtest/out/report/charts/*.png. Читает data/stats.json, sessions.json, level_profiles.json.
Цвета: возраст — порядковая шкала, поэтому один оттенок (синий) от светлого к тёмному; теплота — оранжевая шкала одного оттенка.
Запуск: python3 tools/playtest/charts.py"""
import json,os,collections
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
HERE=os.path.dirname(os.path.abspath(__file__));D=os.path.join(HERE,'data');CH=os.path.join(HERE,'out','report','charts');os.makedirs(CH,exist_ok=True)
J=lambda p:json.load(open(p,encoding='utf-8'))
S=J(os.path.join(D,'stats.json'));sessions=J(os.path.join(D,'sessions.json'));prof=J(os.path.join(D,'level_profiles.json'));cat=J(os.path.join(HERE,'levels_catalog.json'));roster={r['id']:r for r in J(os.path.join(D,'roster.json'))}
GR=['7-8','9-10','11-13','14+'];GL={'7-8':'7–8 лет','9-10':'9–10 лет','11-13':'11–13 лет','14+':'14+ и взрослые'}
COL={'7-8':'#8db4ec','9-10':'#4f8fe0','11-13':'#2a5db0','14+':'#14336b'}
INK='#1f1d1a';MUTED='#5d5a54';GRID='#e6e3dc';SURF='#fcfcfb'
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':10,'axes.edgecolor':GRID,'axes.labelcolor':MUTED,'xtick.color':MUTED,'ytick.color':MUTED,'text.color':INK,'axes.facecolor':SURF,'figure.facecolor':SURF,'axes.spines.top':False,'axes.spines.right':False})
HEAT=LinearSegmentedColormap.from_list('warm',['#fdf1e4','#f8c79a','#ee8f4f','#d4541b','#8c2a08'])
LV=[k for k in sorted(cat,key=lambda k:cat[k]['order']) if k in S['levels_table']]
def lab(lv): return f"{lv}  {cat[lv]['name'][:26]}"

def heat(key,title,fname,vmin,vmax,fmt='{:.1f}',note=''):
    M=[];mask=[]
    for lv in LV:
        row=[]
        for g in GR:
            b=S['levels_table'][lv]['by_group'].get(g)
            row.append(float('nan') if not b or b['n']<2 else b[key])
        M.append(row)
    import numpy as np
    A=np.array(M,dtype=float)
    fig,ax=plt.subplots(figsize=(7.4,0.27*len(LV)+1.6))
    im=ax.imshow(A,cmap=HEAT,vmin=vmin,vmax=vmax,aspect='auto')
    ax.set_xticks(range(4));ax.set_xticklabels([GL[g] for g in GR]);ax.xaxis.tick_top()
    ax.set_yticks(range(len(LV)));ax.set_yticklabels([lab(l) for l in LV],fontsize=8.5)
    for i in range(len(LV)):
        for j in range(4):
            v=A[i,j]
            if v==v: ax.text(j,i,fmt.format(v),ha='center',va='center',fontsize=8,color='white' if (v-vmin)/(vmax-vmin)>0.55 else INK)
            else: ax.text(j,i,'—',ha='center',va='center',fontsize=8,color=MUTED)
    for sp in ax.spines.values(): sp.set_visible(False)
    ax.tick_params(length=0)
    cb=fig.colorbar(im,ax=ax,fraction=0.03,pad=0.02);cb.outline.set_visible(False)
    fig.suptitle(title,x=0.02,ha='left',fontsize=11.5,fontweight='bold',y=0.995)
    if note: fig.text(0.02,0.005,note,fontsize=8,color=MUTED,ha='left')
    fig.tight_layout(rect=(0,0.02,1,0.97));fig.savefig(os.path.join(CH,fname),dpi=150);plt.close(fig)

def combat_world():
    ws=['пролог','мир 1','мир 2','мир 3','мир 4','мир 5']
    fig,ax=plt.subplots(figsize=(7.4,3.9))
    ends=[]
    for g in GR:
        y=[S['combat'][g].get(w,{}).get('downs_per_enc') for w in ws]
        xs=[i for i,v in enumerate(y) if v is not None];ys=[v for v in y if v is not None]
        ax.plot(xs,ys,'-o',color=COL[g],lw=2,ms=6,mec='white',mew=1.2,label=GL[g])
        ends.append([ys[-1],g,xs[-1]])
    ends.sort();gap=0.028
    for i in range(1,len(ends)):
        if ends[i][0]-ends[i-1][0]<gap: ends[i][0]=ends[i-1][0]+gap     # подписи концов не наезжают друг на друга
    for yv,g,xv in ends: ax.text(xv+0.1,yv,GL[g],color=INK,fontsize=8.5,va='center')
    ax.set_xticks(range(len(ws)));ax.set_xticklabels(ws);ax.set_xlim(-0.2,5.9)
    ax.set_ylabel('«падений» (клубок ниток) на встречу с мороками');ax.grid(axis='y',color=GRID)
    ax.set_title('Бой в движке: падения на одну встречу по мирам',loc='left',fontsize=11.5,fontweight='bold')
    ax.axvspan(-0.2,1.5,color='#f1ede4',zorder=0);ax.text(0.65,ax.get_ylim()[1]*0.96,'детские настройки\n(пролог и мир 1)',ha='center',va='top',fontsize=8,color=MUTED)
    fig.tight_layout();fig.savefig(os.path.join(CH,'c2_combat_by_world.png'),dpi=150);plt.close(fig)

def reading_hist():
    import numpy as np
    objs=[o for lv,P in prof.items() if not lv.startswith('z-') for o in P['objectives'] if o['words']>1]
    w=[o['words'] for o in objs];cpw=sum(o['chars'] for o in objs)/sum(o['words'] for o in objs)
    fig,ax=plt.subplots(figsize=(7.4,3.8))
    ax.hist(w,bins=range(0,52,2),color='#b9c7da',edgecolor=SURF,linewidth=1.5)
    sp={'7-8':3.0,'9-10':5.5,'11-13':9.0,'14+':14.0}
    top=ax.get_ylim()[1]
    for g,c in sp.items():
        x=15*c/cpw
        ax.axvline(x,color=COL[g],lw=2);ax.text(x+0.5,top*(0.97-0.1*GR.index(g)),f'{GL[g]}: {x:.0f} слов',color=INK,fontsize=8.5,va='top',bbox=dict(fc=SURF,ec='none',pad=1.5))
    ax.set_xlabel('слов в задаче уровня');ax.set_ylabel('число задач');ax.grid(axis='y',color=GRID)
    ax.set_title(f'Длина задач ({len(w)} задач Игрока 1) и сколько слов читают за 15 с',loc='left',fontsize=10.5,fontweight='bold')
    fig.tight_layout();fig.savefig(os.path.join(CH,'c4_reading.png'),dpi=150);plt.close(fig)

def retention():
    order=[l for l in sorted(cat,key=lambda k:cat[k]['order']) if l in prof and not l.startswith('z-') and l not in('luko',)]
    fig,ax=plt.subplots(figsize=(7.4,3.8))
    for g in GR:
        mem=[r['id'] for r in roster.values() if r['group']==g]
        alive=[]
        for lv in order:
            n=0
            for mid in mem:
                s=[s for s in sessions.values() if mid in s['members']][0]
                if lv in [l['lv'] for l in s['levels']]: n+=1
            alive.append(n/len(mem))
        ax.step(range(len(order)),alive,where='post',color=COL[g],lw=2.2,label=GL[g])
        ax.text(len(order)-0.9,alive[-1]+0.015*(GR.index(g)-1.5),GL[g],fontsize=8.5,va='center',color=INK)
    ax.set_xticks(range(0,len(order),2));ax.set_xticklabels([order[i] for i in range(0,len(order),2)],rotation=60,fontsize=8)
    ax.set_ylim(0,1.05);ax.set_xlim(0,len(order)+4);ax.set_ylabel('доля ещё играющих');ax.grid(axis='y',color=GRID)
    ax.set_title('Сколько участников доходит до каждого уровня (модель ухода из игры)',loc='left',fontsize=11,fontweight='bold')
    fig.tight_layout();fig.savefig(os.path.join(CH,'c5_retention.png'),dpi=150);plt.close(fig)

def group_bars():
    fig,axs=plt.subplots(1,4,figsize=(9.2,3.1))
    items=[('hours','часов в игре'),('stuck_min_lvl','минут «застрял» на уровень'),('downs_lvl','падений на уровень'),('understood','доля понятых задач')]
    for ax,(k,t) in zip(axs,items):
        v=[S[k][g] for g in GR];b=ax.bar(range(4),v,color=[COL[g] for g in GR],width=0.7)
        for i,x in enumerate(v): ax.text(i,x,f'{x:.2f}' if x<10 else f'{x:.1f}',ha='center',va='bottom',fontsize=8.5)
        ax.set_xticks(range(4));ax.set_xticklabels(['7–8','9–10','11–13','14+'],fontsize=8.5);ax.set_title(t,fontsize=9.5,loc='left',fontweight='bold');ax.set_ylim(0,max(v)*1.22)
        ax.grid(axis='y',color=GRID);ax.set_axisbelow(True)
    fig.tight_layout();fig.savefig(os.path.join(CH,'c6_groups.png'),dpi=150);plt.close(fig)

def solo_pair():
    fig,axs=plt.subplots(1,3,figsize=(8.4,3.0))
    for ax,(k,t) in zip(axs,[('stuck_min_lvl','минут «застрял» на уровень'),('hours','часов в игре'),('completion','доля дошедших до конца')]):
        v=[S['solo_vs_pair'][m][k] for m in('pair','solo')]
        ax.bar([0,1],v,color=['#2a5db0','#d4541b'],width=0.6)
        for i,x in enumerate(v): ax.text(i,x,f'{x:.2f}',ha='center',va='bottom',fontsize=9)
        ax.set_xticks([0,1]);ax.set_xticklabels(['вдвоём','один']);ax.set_title(t,fontsize=9.5,loc='left',fontweight='bold');ax.set_ylim(0,max(v)*1.25);ax.grid(axis='y',color=GRID);ax.set_axisbelow(True)
    fig.tight_layout();fig.savefig(os.path.join(CH,'c7_solo_pair.png'),dpi=150);plt.close(fig)

def ab_chart():
    ab=S.get('ab') or {}
    if not ab: return
    gs=[g for g in('7-8','9-10') if g in ab]
    fig,axs=plt.subplots(1,3,figsize=(8.6,3.1))
    items=[('hits_per_fight','попаданий по герою за бой'),('downs_per_fight','падений за бой'),('clear','выиграно за минуту (доля)')]
    for ax,(k,t) in zip(axs,items):
        w=0.36
        for j,(lab,col) in enumerate((('детские настройки (мир 1)','#2a5db0'),('обычные (мир 2)','#d4541b'))):
            v=[]
            for g in gs:
                key=[a for a in ab[g] if a.startswith('детские' if j==0 else 'обычные')][0];v.append(ab[g][key][k])
            xs=[i+(j-0.5)*w for i in range(len(gs))]
            ax.bar(xs,v,width=w*0.92,color=col,label=lab)
            for x,y in zip(xs,v): ax.text(x,y,f'{y:.2f}' if k!='clear' else f'{round(100*y)}%',ha='center',va='bottom',fontsize=8)
        ax.set_xticks(range(len(gs)));ax.set_xticklabels([GL[g] for g in gs],fontsize=8.5);ax.set_title(t,fontsize=9.5,loc='left',fontweight='bold');ax.grid(axis='y',color=GRID);ax.set_axisbelow(True)
        ax.set_ylim(0,ax.get_ylim()[1]*1.15)
    axs[0].legend(fontsize=7.5,frameon=False,loc='upper left')
    fig.suptitle('Те же дети, те же встречи: детские настройки мира 1 против обычных',x=0.01,ha='left',fontsize=10.5,fontweight='bold')
    fig.tight_layout(rect=(0,0,1,0.93));fig.savefig(os.path.join(CH,'c8_ab_kids.png'),dpi=150);plt.close(fig)

if __name__=='__main__':
    heat('diff','Воспринимаемая трудность уровней (1 — легко … 5 — очень трудно)','c1_diff_heatmap.png',1,5,'{:.1f}','Модель: минуты «застрял», падения и неудачные встречи → шкала 1–5; «—» — менее двух участников дошли до уровня.')
    heat('stuck_min','Минут «застрял» на уровне (непонятная задача, ожидание подсказки)','c3_stuck_heatmap.png',0,10,'{:.1f}','Среднее по участникам; считается из текстов задач каждого уровня и возраста игрока.')
    combat_world();reading_hist();retention();group_bars();solo_pair();ab_chart()
    print('графики:',sorted(os.listdir(CH)))
