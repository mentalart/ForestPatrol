//@@ wait=1500
// релиз final06: 3-1 «Сад молодильных яблок» — Кощеев Ворон ОДНИМ игроком: Прошка со светом оставлен в чаше, Q — Потап со
// светом во вторую чашу: Ворон слепнет — бьём; этап 2 — яблочко с яблони, бросок, когда Ворон замахнулся (и кувырок); Царь-яблоко — Жар-птице.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(20);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
U.nocine();ZC.tick(5);const W=ZC.W,H=ZC.HERO;ZC.FIN.warp('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka');U.goto(0,0,-445,5);ZC.tick(5);U.nocine();ZC.tick(10);const VB=W.voron31;if(VB.phase!==1)throw new Error('этап не 1');'solo raven phase=1'
//@@
const W=ZC.W,H=ZC.HERO,VB=W.voron31,e=VB.e;U.toKind('proshka');ZC.tick(20);const Pr=H.proshka;U.goto(0,-7,-462,6);if(!Pr.lit)U.tap('KeyR');U.toKind('potap');ZC.tick(20);const P=H.potap;if(!P.lit)U.tap('KeyR');ZC.tick(5);if(!P.lit||!Pr.lit)throw new Error('перья не зажглись '+[Pr.lit,P.lit]);const p0=ZC.players[0].petals;
for(let i=0;i<60*150&&VB.phase===1;i++){if(VB.ai==='mark'&&VB.tgt===P&&VB.t>VB.dur-0.2)ZC.press('ShiftLeft');
  if(VB.ai==='stun'||(VB.ai==='perch'&&e.dazeT>0)||e.state==='broken')U.hit(0,e,i);else U.step(0,7,-462,0.3);ZC.tick(1);}
U.rel(0);if(VB.phase<1.5)throw new Error('одиночный этап 1 не пройден emb='+e.embers+' '+U.st());U.nocine();ZC.tick(10);'solo raven1 ok petals '+p0+'→'+ZC.players[0].petals
//@@
const W=ZC.W,H=ZC.HERO,VB=W.voron31,e=VB.e,AP=W.apples31;U.toKind('proshka');ZC.tick(20);const Pr=H.proshka;let thr=0;
for(let i=0;i<60*200&&VB.phase===2;i++){if(ZC.players[0].downed){ZC.tick(1);continue;}const me=U.me();
  if(VB.ai==='lungeTel'&&VB.tgt===me&&VB.t>VB.dur-0.22)ZC.press('ShiftLeft');
  if(!me.apple31){const a=AP.list.filter(q=>q.state==='tree'||q.state==='ground').sort((p,q)=>Math.hypot(p.pos.x-me.pos.x,p.pos.z-me.pos.z)-Math.hypot(q.pos.x-me.pos.x,q.pos.z-me.pos.z))[0];if(a)U.step(0,a.pos.x,a.pos.z,0.4);}
  else{const d=Math.hypot(e.pos.x-me.pos.x,e.pos.z-me.pos.z);const open=VB.ai==='lungeTel'||VB.ai==='flapTel'||VB.ai==='recover'||e.dazeT>0;
    if(d>6)U.step(0,e.pos.x+(me.pos.x>e.pos.x?3.5:-3.5),e.pos.z+3.5,0.5);else{U.rel(0);me.face=Math.atan2(e.pos.x-me.pos.x,e.pos.z-me.pos.z);if(open&&i%10===0){ZC.press('KeyF');thr++;}}}
  ZC.tick(1);}
U.rel(0);if(VB.phase<3)throw new Error('одиночный этап 2 не пройден hits='+VB.hits+' throws='+thr+' '+U.st()+' petals='+ZC.players[0].petals);U.nocine();ZC.tick(10);'solo raven2 ok hits='+VB.hits+' throws='+thr
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags,AP=W.apples31;const k=AP.list.find(a=>a.king);if(!k)throw new Error('нет Царь-яблока');const me=U.me();U.goto(0,k.pos.x,k.pos.z,6);ZC.tick(5);U.goto(0,0,-482.6,8);ZC.tick(30);
if(!F.kingHome)throw new Error('одиночный: Жар-птица не получила Царь-яблоко '+U.st());U.cine(100);U.nocine();ZC.tick(20);const L4=W.items.filter(i=>i.kind==='link').pop();U.goto(0,L4.pos.x,L4.pos.z,6);ZC.tick(240);
if(ZC.W.levelId==='3-1'&&!ZC.G.done['3-1'])throw new Error('одиночный: уровень не пройден');if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'3-1 boss solo done errs=0 lvl='+ZC.W.levelId
