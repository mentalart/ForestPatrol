#!/usr/bin/env python3
"""Чувствительность выводов к допущениям модели: симуляция сессий пересчитывается с другими зерном и сдвигами допущений
(понимание задач, скорость чтения, «застревание», скорость хода, доля пропуска роликов). Бой (боевые пробы в движке) не пересчитывается.
Для каждого сценария берутся «самые трудные места» по группам (топ-5 уровней по минутам досады F) и сравниваются с базовым прогоном.
Запуск: python3 tools/playtest/sensitivity.py → data/sensitivity.json"""
import json,os,sys,collections,random
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import sim_sessions as SS
HERE=SS.HERE;D=SS.D
GR=['7-8','9-10','11-13','14+']
LV=[k for k in sorted(SS.cat,key=lambda k:SS.cat[k]['order']) if k in SS.prof and not k.startswith('z-') and k not in('luko','epi')]
def run(tune=None,seed=None):
    SS.TUNE.update({'comp':0.0,'read':1.0,'conf':1.0,'nav':1.0,'skipcine':1.0});SS.TUNE.update(tune or {})
    SS.SEED=seed if seed is not None else 20261007
    res={sid:SS.simulate(sid,mids) for sid,mids in SS.sessions.items()}
    # F по уровню и группе
    acc=collections.defaultdict(lambda:collections.defaultdict(list));tot=collections.defaultdict(list);stuck=collections.defaultdict(list)
    for sid,r in res.items():
        for l in r['levels']:
            if l['lv'] not in LV: continue
            for mid,m in l['members'].items():
                g=SS.byid[mid]['group'];acc[g][l['lv']].append(m['F']);stuck[g].append(l['stuck_s']/60)
        for mid in r['members']: tot[SS.byid[mid]['group']].append(r['total_min']/60)
    top={g:[lv for lv,_ in sorted(((lv,sum(v)/len(v)) for lv,v in acc[g].items()),key=lambda x:-x[1])[:5]] for g in GR}
    return {'top':top,'hours':{g:sum(tot[g])/len(tot[g]) for g in GR},'stuck_min_lvl':{g:sum(stuck[g])/len(stuck[g]) for g in GR},'completion':sum(1 for r in res.values() if r['reached_end'])/len(res)}
def main():
    base=run()
    scen={'comp −0,10':{'comp':-0.10},'comp +0,10':{'comp':0.10},'чтение ×0,75':{'read':0.75},'чтение ×1,3':{'read':1.3},'застревание ×0,7':{'conf':0.7},'застревание ×1,4':{'conf':1.4},
          'ходьба ×0,8':{'nav':0.8},'ходьба ×1,25':{'nav':1.25},'ролики не пропускают':{'skipcine':0.0},'ролики пропускают ×2':{'skipcine':2.0}}
    out={'base':base,'scenarios':{},'seeds':{}}
    for nm,t in scen.items(): out['scenarios'][nm]=run(t)
    for sd in range(1,9): out['seeds'][sd]=run(None,20261007+sd)
    # устойчивость: доля сценариев, где уровень остаётся в топ-5 своей группы (по сравнению с базой)
    stab={g:{} for g in GR}
    allr=list(out['scenarios'].values())+list(out['seeds'].values())
    for g in GR:
        for lv in base['top'][g]:
            stab[g][lv]=round(sum(1 for r in allr if lv in r['top'][g])/len(allr),2)
    out['stability']=stab
    out['range']={g:{'hours':[round(min(r['hours'][g] for r in allr),1),round(max(r['hours'][g] for r in allr),1)],'stuck_min_lvl':[round(min(r['stuck_min_lvl'][g] for r in allr),2),round(max(r['stuck_min_lvl'][g] for r in allr),2)]} for g in GR}
    out['range']['completion']=[round(min(r['completion'] for r in allr),2),round(max(r['completion'] for r in allr),2)]
    out['n_scenarios']=len(allr)
    json.dump(out,open(os.path.join(D,'sensitivity.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
    print('сценариев',len(allr));print(json.dumps(stab,ensure_ascii=False));print(json.dumps(out['range'],ensure_ascii=False))
if __name__=='__main__': main()
