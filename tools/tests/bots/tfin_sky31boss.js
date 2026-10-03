//@@ wait=1500
// релиз final06: 3-1 «Сад молодильных яблок» — мини-босс Кощеев Ворон вдвоём (late_99p_sky31.js):
// 1 «В небе» — Прошка и Пелагея со светом встают в обе чаши-солнышка: Ворон слепнет и падает — бьём в свете;
// 2 «Царь-яблоко» — Пелагея срывает молодильное яблочко и бросает в Ворона, когда тот замахнулся или открыт: три попадания —
// воронёнок; Царь-яблоко — Жар-птице: финальный ролик, звено, уровень пройден.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(20);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
U.nocine();ZC.tick(5);const W=ZC.W,H=ZC.HERO;ZC.FIN.warp('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka',0);U.toKind('pelageya',1);U.goto(0,0,-445,5);ZC.tick(5);if(!ZC.G.cine)throw new Error('нет ролика Ворона: '+U.st());U.nocine();ZC.tick(10);
const VB=W.voron31;if(VB.phase!==1)throw new Error('этап не 1: '+VB.phase);'raven phase='+VB.phase
//@@
const W=ZC.W,H=ZC.HERO,VB=W.voron31,e=VB.e;const Pr=H.proshka,Pe=H.pelageya;Pr.lit=true;Pe.lit=true;let falls=0,prev='';const t0=ZC.G.time;
for(let i=0;i<60*120&&VB.phase===1;i++){for(const h of Object.values(H))if(h.active)h.iT=Math.max(h.iT,0.5);
  if(VB.ai==='stun'||VB.ai==='perch'&&e.dazeT>0||e.state==='broken'){if(prev!=='stun'&&VB.ai==='stun')falls++;U.hit(0,e,i);U.hit(1,e,i);}
  else{U.step(0,-7,-462,0.3);U.step(1,7,-462,0.3);}prev=VB.ai;ZC.tick(1);}
U.rel(0);U.rel(1);if(VB.phase<1.5)throw new Error('этап 1 не пройден: falls='+falls+' emb='+e.embers+' ai='+VB.ai+' '+U.st());U.nocine();ZC.tick(10);
'raven1 ok falls='+falls+' t='+(ZC.G.time-t0).toFixed(0)
//@@ shot=sky31_raven.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,VB=W.voron31,e=VB.e,AP=W.apples31;const Pr=H.proshka,Pe=H.pelageya;if(VB.phase!==2)throw new Error('не этап 2: '+VB.phase);let thr=0;const t0=ZC.G.time;
for(let i=0;i<60*150&&VB.phase===2;i++){for(const h of Object.values(H))if(h.active)h.iT=Math.max(h.iT,0.5);
  if(!Pe.apple31){const a=AP.list.filter(q=>q.state==='tree'||q.state==='ground').sort((p,q)=>Math.hypot(p.pos.x-Pe.pos.x,p.pos.z-Pe.pos.z)-Math.hypot(q.pos.x-Pe.pos.x,q.pos.z-Pe.pos.z))[0];if(a)U.step(1,a.pos.x,a.pos.z,0.4);}
  else{const d=Math.hypot(e.pos.x-Pe.pos.x,e.pos.z-Pe.pos.z);const open=VB.ai==='lungeTel'||VB.ai==='flapTel'||VB.ai==='recover'||e.dazeT>0;
    if(d>6.5)U.step(1,e.pos.x+(Pe.pos.x>e.pos.x?3:-3),e.pos.z+3,0.5);else{U.rel(1);Pe.face=Math.atan2(e.pos.x-Pe.pos.x,e.pos.z-Pe.pos.z);if(open&&i%10===0){ZC.press('Comma');thr++;}}}
  U.step(0,e.pos.x-2.5,e.pos.z+2.5,0.6);if(VB.ai==='lungeTel'&&VB.tgt===Pr&&VB.t>VB.dur-0.25)ZC.press('ShiftLeft');ZC.tick(1);}
U.rel(0);U.rel(1);if(VB.phase<3)throw new Error('этап 2 не пройден: hits='+VB.hits+' throws='+thr+' '+U.st());U.nocine();ZC.tick(10);'raven2 ok hits='+VB.hits+' throws='+thr+' t='+(ZC.G.time-t0).toFixed(0)
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags,AP=W.apples31;const Pr=H.proshka;const k=AP.list.find(a=>a.king);if(!k)throw new Error('нет Царь-яблока');
U.goto(0,k.pos.x,k.pos.z,6);ZC.tick(5);if(!Pr.apple31||!Pr.apple31.king)throw new Error('Царь-яблоко не в руках: '+U.st());U.goto(0,0,-482.6,8);ZC.tick(30);if(!F.kingHome)throw new Error('Жар-птица не получила яблоко: '+U.st());
'king ok'
//@@ shot=sky31_finale.png wait=300
ZC.tick(500);
//@@
const W=ZC.W,F=W.flags;U.nocine();ZC.tick(20);const L4=W.items.filter(i=>i.kind==='link').pop();U.goto(0,L4.pos.x,L4.pos.z,6);ZC.tick(240);
if(ZC.W.levelId==='3-1'&&!ZC.G.done['3-1'])throw new Error('уровень не пройден: link='+L4.taken+' stage='+F.stage+' '+U.st());
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'3-1 boss coop done errs=0 lvl='+ZC.W.levelId
