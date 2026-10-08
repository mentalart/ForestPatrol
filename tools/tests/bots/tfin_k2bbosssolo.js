//@@ wait=1500
// релиз final06: 2-Б «Водяной» — бой в одиночку (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша), на общих помощниках U.*:
// 1 — сом на мели: Прошка сбивает ус, Q — Потап хватает ус и тянет; застрял — бьём; 2 — Прошка играет у раковины, Q (оставленный держит коня) —
// Потап запрыгивает, на острове бьёт по короне; потом наоборот; 3 — Йоша поливает бутон, все на плот, Пелагея — взор, Прошка — метка, бьём;
// 4 — у своего колокола на «БОМ!» (оставленный у второго звонит сам); общий удар одним — засчитан. Проверка: проходится одним игроком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.FACE=p=>{const h=U.me();h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);};
window.HIT=(e,i,off)=>{const h=U.me(),o=off||1.9;const a=Math.atan2(h.pos.z-e.pos.z,h.pos.x-e.pos.x);if(U.step(0,e.pos.x+Math.cos(a)*(e.r*0.5+o),e.pos.z+Math.sin(a)*(e.r*0.5+o),0.9)){U.rel(0);FACE(e.pos);if(i%9===0)ZC.press('KeyF');}};
window.GUARD=()=>{const h=U.me(),bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.eta<0.9);ZC.hold('KeyG',!!bo);return !!bo;};
window.D2=()=>ZC.W.dbg2b();
ZC.FIN.k2les=ZC.FIN.k2les||{};ZC.FIN.k2les.auto=false;
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
U.cine(200);ZC.tick(5);ZC.W.warp2b('boss');U.cine(300);ZC.tick(30);U.toKind('proshka');'solo phase='+ZC.W.flags.phase
//@@
// этап 1: ус — рогатка Прошки, Q — Потап тянет; до первой тяги щитом без отбива
const D=D2(),F=ZC.W.flags,e=D.vod,S=D.S1;let beach=0,pulls=0,stuns=0,prev='';
for(let i=0;i<60*200&&F.phase===1;i++){if(S.st!==prev){if(S.st==='beached')beach++;if(S.st==='pull')pulls++;if(S.st==='stun')stuns++;prev=S.st;}
  if(e.state==='broken'||e.dazeT>0){ZC.hold('KeyG',false);if(!U.def(0,i))HIT(e,i);ZC.tick(1);continue;}if(pulls?U.def(0,i):GUARD()){ZC.tick(1);continue;}
  if(S.sh&&(S.st==='tele'||S.st==='lunge'||(S.st==='beached'&&!S.whisk))){if(U.me().kind!=='proshka')U.toKind('proshka');const sh=S.sh,a=S.a||sh,lx=sh.x-a.x,lz=sh.z-a.z,L=Math.hypot(lx,lz)||1,px=-lz/L,pz=lx/L,s=(px*(-sh.x)+pz*(-14-sh.z))>0?1:-1;
    if(U.step(0,sh.x+px*s*4.6+(0-sh.x)*0.25,sh.z+pz*s*4.6+(-14-sh.z)*0.25,1.2))U.rel(0);if(S.st==='beached'){FACE(D.whiskTip);if(i%20===0)U.tap('KeyE');}}
  else if(S.st==='beached'&&S.whisk){if(U.me().kind!=='potap')U.toKind('potap');if(U.step(0,D.whiskTip.x,D.whiskTip.z,1.2)){U.rel(0);if(i%15===0)U.tap('KeyE');}}
  else{if(S.st==='circle'&&U.me().kind!=='proshka')U.toKind('proshka');U.step(0,-2.5,-6.2,1.2);}
  ZC.tick(1);}
U.rel(0);ZC.hold('KeyG',false);if(F.phase===1)throw new Error('этап 1 не пройден: beach='+beach+' pulls='+pulls+' stuns='+stuns+' emb='+e.embers+' '+U.st());U.cine(300);ZC.tick(30);
(pulls?'':'FAIL no pull ')+'solo stage1 beach='+beach+' pulls='+pulls+' stuns='+stuns
//@@
// этап 2: сыграл у раковины → Q (оставленный держит коня) → другой запрыгивает → остров, корона
const D=D2(),F=ZC.W.flags,e=D.vod,S=D.S2,SH=D.SHOAL[1],SR=D.SH2[1];const dx=(0-SH.x)/8.6,dz=(-14-SH.z)/8.6;let rides=0,prevR=null,plays=0;const T0=ZC.G.time;U.toKind('proshka');
for(let i=0;i<60*240&&F.phase===2;i++){if(S.rider!==prevR){if(S.rider)rides++;prevR=S.rider;}const h=U.me();if(i%120===0)window._lg=(window._lg||'')+' ['+((ZC.G.time-T0)|0)+' '+S.horses.map(H=>H.state[0]).join('')+' e'+e.embers+' '+h.kind[0]+(h.kwHold?'K':'')+' '+h.pos.x.toFixed(0)+','+h.pos.z.toFixed(0)+','+h.pos.y.toFixed(0)+' '+e.state[0]+(e.dazeT>0?'D':'')+(S.onIsl?'I':'')+']';
  if(h.k2ride){ZC.tick(1);continue;}
  if(h.pos.y>2.5){if(e.dazeT>0||e.state==='broken'){U.rel(0);FACE(e.pos);if(i%9===0)ZC.press('KeyF');}ZC.tick(1);continue;}
  if(U.def(0,i)){ZC.tick(1);continue;}
  if((e.dazeT>0||e.state==='broken')&&e.pos.y<0){HIT(e,i);ZC.tick(1);continue;}
  const wait=S.horses.find(H=>H.state==='wait'&&H.ref===SR.ref);
  if(!wait&&!S.horses.some(H=>H.state==='come'&&H.ref===SR.ref)){if(U.step(0,SH.x-dx*0.5,SH.z-dz*0.5,0.8)){U.rel(0);if(i%30===0){ZC.press('KeyR');ZC.tick(4);ZC.press('KeyQ');ZC.tick(8);plays++;}}}
  else if(wait){if(h===wait.by||h.kwHold){if(i%30===0)ZC.press('KeyQ');ZC.tick(1);continue;}const hp=wait.g.position;if(U.step(0,hp.x,hp.z,0.5)){U.rel(0);if(i%12===0)ZC.press('Space');}}
  ZC.tick(1);}
U.rel(0);if(F.phase===2)throw new Error('этап 2 не пройден: plays='+plays+' rides='+rides+' emb='+e.embers+' '+U.st());const dt2=ZC.G.time-T0;if(dt2>60)throw new Error('этап 2 соло дольше 60 с: '+dt2.toFixed(0)+' с'+window._lg);U.cine(300);ZC.tick(30);'solo stage2 plays='+plays+' rides='+rides+' time='+dt2.toFixed(0)+'s'
//@@
// этап 3: Йоша поливает бутон, все на плот; Пелагея — Совиный взор; Прошка — метка; бьём
const D=D2(),F=ZC.W.flags,e=D.vod,S=D.S3,B=D.BUDS[0];let rafts=0,owls=0,marks=0,lastRaft=null;
for(let i=0;i<60*240&&F.phase===3;i++){const raft=S.rafts.find(r=>r.st!=='sink');if(raft&&raft!==lastRaft){lastRaft=raft;rafts++;}const h=U.me(),onR=raft&&h.groundRef===raft.col;
  if(!raft){if(U.me().kind!=='yosha')U.toKind('yosha');if(U.step(0,B.x,B.z+1.8,0.6)){U.rel(0);FACE(B);if(i%20===10)U.tap('KeyE');}ZC.tick(1);continue;}
  if(!onR){U.step(0,raft.col.x,raft.col.z,0.5);if(!U.def(0,i)){}ZC.tick(1);continue;}
  U.step(0,raft.col.x,raft.col.z,0.6);if(U.def(0,i)){ZC.tick(1);continue;}
  if(e.dazeT>0||e.state==='broken'){FACE(e.pos);if(i%9===0)ZC.press('KeyF');ZC.tick(1);continue;}
  if(raft.st==='go'){if(S.owl<=0){if(U.me().kind!=='pelageya')U.toKind('pelageya');else if(i%20===0){U.tap('KeyE');owls++;}}
    else{if(U.me().kind!=='proshka')U.toKind('proshka');else if(i%20===0){FACE(D.posSlot(S.real));U.tap('KeyE');marks++;}}}
  ZC.tick(1);}
U.rel(0);if(F.phase===3)throw new Error('этап 3 не пройден: rafts='+rafts+' owls='+owls+' marks='+marks+' emb='+e.embers+' '+U.st());U.cine(400);ZC.tick(30);'solo stage3 rafts='+rafts+' owls='+owls+' marks='+marks
//@@ shot=k2bbs_4.png
// этап 4: у своего колокола — на «БОМ!»; оставленный у второго звонит сам; общий удар одним
const D=D2(),F=ZC.W.flags,e=D.vod,S=D.S4,K4=D.BELL4[0];let miss=0,prev=null;
for(let i=0;i<60*120&&F.phase===4;i++){if(S.st!==prev){if(S.st==='crash')miss++;prev=S.st;}if(U.step(0,K4.x-0.6,K4.z+1.4,0.5)){U.rel(0);FACE(K4);}
  if((S.st==='come'||S.st==='strike')&&S.hit[0]==null){const left=S.strikeAt-ZC.G.time;if(left<0.05&&left>-0.12)ZC.press('KeyF');}ZC.tick(1);}
U.rel(0);if(F.phase===4)throw new Error('этап 4 не пройден: ok='+S.ok+' miss='+miss+' '+U.st());U.cine(400);ZC.tick(20);let fin=0;
for(let i=0;i<60*30&&!F.won;i++){const h=U.me(),a=Math.atan2(h.pos.z-e.pos.z,h.pos.x-e.pos.x);if(U.step(0,e.pos.x+Math.cos(a)*2.6,e.pos.z+Math.sin(a)*2.6,0.8)){U.rel(0);FACE(e.pos);if(i%20===0){ZC.press('KeyF');fin++;}}ZC.tick(1);}
U.rel(0);if(!F.won)throw new Error('общий удар одним не засчитан: '+U.st());'solo stage4 waves='+S.ok+' miss='+miss+' fin='+fin
//@@
U.cine(600);ZC.tick(200);if(!ZC.G.done['2-B'])throw new Error('уровень не пройден');if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-B boss solo done errs=0'
