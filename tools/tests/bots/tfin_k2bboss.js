//@@ wait=1500
// релиз final06: 2-Б «Водяной» — бой в четыре этапа (late_99j_k2b.js, docs/23_vodyanoy_boss.md), вдвоём настоящими нажатиями:
// 1 «Сом-перевозчик» — шары отбиваем щитом в последний миг; сом на мели — Прошка сбивает ус рогаткой, Потап хватает ус («раз-два-три»),
//   Водяной застрял на мели — бьём; 2 «Водяные кони» — один играет у раковины на мели, другой запрыгивает на замершего коня, на острове бьёт
//   по короне (роли меняются); 3 «Омут-зеркало» — Йоша поливает бутон, оба на кувшинку-плот, Пелагея — Совиный взор, Прошка метит
//   настоящего, бьём; 4 «Великий вал» — каждый у своего колокола, бьёт на «БОМ!»; три волны — вал расступается, общий удар разом.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.K2=U.K;window.REL=pi=>K2[pi].B.forEach(k=>ZC.hold(k,false));
window.STEP=(pi,x,z,tol)=>U.step(pi,x,z,tol);
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(K2[pi].s);ZC.tick(8);}return U.act(pi).kind===kind;};
window.FACE=(pi,p)=>{const h=U.act(pi);h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);};
window.HIT=(pi,e,i,off)=>{const h=U.act(pi),o=off||1.9;const a=Math.atan2(h.pos.z-e.pos.z,h.pos.x-e.pos.x);if(STEP(pi,e.pos.x+Math.cos(a)*(e.r*0.5+o),e.pos.z+Math.sin(a)*(e.r*0.5+o),0.9)){REL(pi);FACE(pi,e.pos);if(i%9===pi*4)ZC.press(K2[pi].a);}};
window.D2=()=>ZC.W.dbg2b();
window.GUARD=pi=>{const h=U.act(pi),bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.eta<0.9);ZC.hold(K2[pi].g,!!bo);return !!bo;};
ZC.FIN.k2les=ZC.FIN.k2les||{};ZC.FIN.k2les.auto=false;
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
U.cine(200);ZC.tick(5);const D=ZC.W.warp2b('boss');U.cine(300);ZC.tick(30);'phase='+ZC.W.flags.phase+' s1='+D2().S1.st+' scale='+D2().vod.s.toFixed(2)
//@@ shot=k2bb_1.png
// этап 1: Прошка зовёт Потапа «Ко мне!»; сом на мели — рогатка в ус, Потап тянет; застрял — бьём
const D=D2(),F=ZC.W.flags,e=D.vod,S=D.S1;ACT(0,'proshka');ACT(1,'pelageya');U.tap('Digit1');ZC.tick(10);let refl=0,beach=0,pulls=0,stuns=0,prev='';
for(let i=0;i<60*170&&F.phase===1;i++){if(S.st!==prev){if(S.st==='beached')beach++;if(S.st==='pull')pulls++;if(S.st==='stun')stuns++;prev=S.st;}
  for(const pi of[0,1]){if(e.state==='broken'||e.dazeT>0){if(!U.def(pi,i))HIT(pi,e,i);continue;}if(pulls?U.def(pi,i):GUARD(pi))continue;   // до первой тяги — щитом (без отбива), чтобы проверить путь «ус»
    if(pi===0&&S.sh&&(S.st==='tele'||S.st==='lunge'||(S.st==='beached'&&!S.whisk))){   // Прошка — сбоку от дорожки, к мели; сом на мели — рогатку в ус
      if(ACT(0,'proshka')){const sh=S.sh,a=S.a||sh,lx=sh.x-a.x,lz=sh.z-a.z,L=Math.hypot(lx,lz)||1,px=-lz/L,pz=lx/L,s=(px*(-sh.x)+pz*(-14-sh.z))>0?1:-1;
        if(STEP(0,sh.x+px*s*4.6+(0-sh.x)*0.25,sh.z+pz*s*4.6+(-14-sh.z)*0.25,1.2))REL(0);if(S.st==='beached'){FACE(0,D.whiskTip);if(i%20===0)U.tap('KeyE');}}continue;}
    if(pi===0&&S.st==='beached'&&S.whisk){if(ACT(0,'potap')&&STEP(0,D.whiskTip.x,D.whiskTip.z,1.2)){REL(0);if(i%15===0)U.tap('KeyE');}continue;}
    if(pi===0&&S.st==='circle'&&U.act(0).kind!=='proshka'){ACT(0,'proshka');U.tap('Digit1');continue;}
    STEP(pi,pi?2.5:-2.5,-6.2,1.2);}
  ZC.tick(1);}
[0,1].forEach(REL);ZC.hold('KeyG',false);ZC.hold('Period',false);if(F.phase===1)throw new Error('этап 1 не пройден: beach='+beach+' pulls='+pulls+' stuns='+stuns+' st='+S.st+' emb='+e.embers+' zap='+D.BS.zap.toFixed(2)+' '+U.st());
U.cine(300);ZC.tick(30);(pulls?'':'FAIL no pull ')+'stage1 ok beach='+beach+' pulls='+pulls+' stuns='+stuns+' → phase '+F.phase
//@@ shot=k2bb_2.png
// этап 2: один играет у раковины (юго-западная мель), другой запрыгивает на коня; на острове — по короне; роли меняются
const D=D2(),F=ZC.W.flags,e=D.vod,S=D.S2,SH=D.SHOAL[1],SR=D.SH2[1];const C={x:0,z:-14};const dx=(C.x-SH.x)/8.6,dz=(C.z-SH.z)/8.6;let rides=0,role=0,prevR=null,isl=0;let lastRide=0;const LOG=[];
for(let i=0;i<60*200&&F.phase===2;i++){const player=role%2===0?1:0,rider=1-player;const wait=S.horses.find(H=>H.state==='wait'&&H.ref===SR.ref);
  if(S.rider!==prevR){if(S.rider){rides++;lastRide=i;}prevR=S.rider;}if(S.onIsl&&S.onIsl!==D.__lastIsl){D.__lastIsl=S.onIsl;isl++;role++;}
  if(i-lastRide>60*40){lastRide=i;role++;}   // 40 с без коня — поменяться ролями
  if(i%600===0){const a=U.act(0),b=U.act(1);LOG.push((i/60)+'s r'+role+' '+a.kind+'@'+a.pos.x.toFixed(1)+','+a.pos.y.toFixed(1)+','+a.pos.z.toFixed(1)+' '+b.kind+'@'+b.pos.x.toFixed(1)+','+b.pos.y.toFixed(1)+','+b.pos.z.toFixed(1)+' hum='+SR.ref.hum.toFixed(1)+' H='+S.horses.map(H=>H.state[0]+(H.ref===SR.ref?'*':'')).join('')+' dz='+e.dazeT.toFixed(1)+' st='+e.state+' e='+e.pos.x.toFixed(1)+','+e.pos.y.toFixed(1)+','+e.pos.z.toFixed(1));}
  for(const pi of[0,1]){const h=U.act(pi);if(h.k2ride)continue;
    if(h.pos.y>2.5){if(e.dazeT>0||e.state==='broken'){REL(pi);FACE(pi,e.pos);if(i%9===pi*4)ZC.press(K2[pi].a);}continue;}   // на острове
    if(U.def(pi,i))continue;
    if((e.dazeT>0||e.state==='broken')&&e.pos.y<0){HIT(pi,e,i);continue;}
    if(pi===player){if(STEP(pi,SH.x-dx*0.5,SH.z-dz*0.5,0.8)){REL(pi);if(!wait&&SR.ref.hum<0.5&&!S.horses.some(H=>H.state==='come')&&i%20===pi*10)ZC.press(K2[pi].i);}}
    else{const sx=SH.x+dx*1.6,sz=SH.z+dz*1.6;if(STEP(pi,sx,sz,0.6)){REL(pi);if(wait&&i%12===0)ZC.press(K2[pi].j);}}}
  ZC.tick(1);}
[0,1].forEach(REL);if(F.phase===2)throw new Error(LOG.slice(-8).join(' | ')+' этап 2 не пройден: rides='+rides+' isl='+isl+' emb='+e.embers+' flowers='+ZC.FIN.k2v.flowersLeft(e.k2)+' '+U.st());
U.cine(300);ZC.tick(30);'stage2 ok rides='+rides+' isl='+isl+' → phase '+F.phase
//@@ shot=k2bb_3.png
// этап 3: Йоша поливает бутон → Пелагея и Прошка на плот; Совиный взор — настоящий; рогатка — метка; бьём
const D=D2(),F=ZC.W.flags,e=D.vod,S=D.S3,B=D.BUDS[0];ACT(0,'proshka');ACT(1,'yosha');let rafts=0,owls=0,marks=0,prevO=0,lastRaft=null;
for(let i=0;i<60*200&&F.phase===3;i++){const raft=S.rafts.find(r=>r.st!=='sink');if(raft&&raft!==lastRaft){lastRaft=raft;rafts++;}if(S.owl>0&&prevO<=0)owls++;prevO=S.owl;
  for(const pi of[0,1]){const h=U.act(pi);const onR=raft&&h.groundRef===raft.col;
    if(!raft){if(pi===1){if(ACT(1,'yosha')&&STEP(1,B.x,B.z+1.8,0.6)){REL(1);FACE(1,B);if(i%20===10)U.tap('KeyL');}}else{if(U.def(pi,i))continue;STEP(0,B.x-2.4,B.z+2.2,1);}continue;}
    if(pi===1&&h.kind==='yosha'){ACT(1,'pelageya');continue;}
    if(!onR){if(raft.st==='wait'||raft.st==='go'){STEP(pi,raft.col.x,raft.col.z,0.5);if(U.def(pi,i))continue;}continue;}
    STEP(pi,raft.col.x+(pi?0.6:-0.6),raft.col.z,0.5);if(U.def(pi,i))continue;
    if(e.dazeT>0||e.state==='broken'){FACE(pi,e.pos);if(i%9===pi*4)ZC.press(K2[pi].a);continue;}
    if(pi===1&&S.owl<=0&&i%30===15)U.tap('KeyL');
    if(pi===0&&S.owl>0&&i%20===0){const p=D.posSlot(S.real);FACE(0,p);U.tap('KeyE');marks++;}}
  ZC.tick(1);}
[0,1].forEach(REL);if(F.phase===3)throw new Error('этап 3 не пройден: rafts='+rafts+' owls='+owls+' marks='+marks+' emb='+e.embers+' dz='+e.dazeT.toFixed(1)+' '+U.st());
U.cine(400);ZC.tick(30);'stage3 ok rafts='+rafts+' owls='+owls+' marks='+marks+' → phase '+F.phase
//@@ shot=k2bb_4.png
// этап 4: каждый у своего колокола, удар на «БОМ!»; вал расступился — общий удар разом
const D=D2(),F=ZC.W.flags,e=D.vod,S=D.S4,B=D.BELL4;let ok=0,miss=0,prev=null;
for(let i=0;i<60*120&&F.phase===4;i++){if(S.st!==prev){if(S.st==='crash')miss++;prev=S.st;}
  for(const pi of[0,1]){const K4=B[pi];if(STEP(pi,K4.x+(pi?0.6:-0.6),K4.z+1.4,0.5)){REL(pi);FACE(pi,K4);}
    if((S.st==='come'||S.st==='strike')&&S.hit[pi]==null){const left=S.strikeAt-ZC.G.time;if(left<0.05&&left>-0.12)ZC.press(K2[pi].a);}}
  ZC.tick(1);}
[0,1].forEach(REL);if(F.phase===4)throw new Error('этап 4 не пройден: ok='+S.ok+' miss='+miss+' st='+S.st+' '+U.st());
U.cine(400);ZC.tick(20);let fin=0;
for(let i=0;i<60*30&&!F.won;i++){let at=0;for(const pi of[0,1]){const h=U.act(pi);const a=Math.atan2(h.pos.z-e.pos.z,h.pos.x-e.pos.x);if(STEP(pi,e.pos.x+Math.cos(a)*2.6,e.pos.z+Math.sin(a)*2.6,0.8)){REL(pi);FACE(pi,e.pos);at++;}}
  if(at===2&&i%20===0){ZC.press('KeyF');ZC.press('Comma');fin++;}ZC.tick(1);}
[0,1].forEach(REL);if(!F.won)throw new Error('общий удар не засчитан: fin='+fin+' st='+e.state+' '+U.st());'stage4 ok waves='+S.ok+' miss='+miss+' fin='+fin
//@@ shot=k2bb_5.png
U.cine(600);ZC.tick(200);if(!ZC.G.done['2-B'])throw new Error('уровень не пройден: lvl='+ZC.W.levelId);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-B boss done errs=0'
//@@
// конь не возвращается после этапа 2 (баг: всадник на острове добил Водяного за 3 с — конь через 3 с снова появлялся и висел до конца боя)
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);U.cine(200);ZC.tick(5);const D=ZC.W.warp2b('boss2');ZC.tick(60);const S=D.S2,H=S.horses.find(q=>q.state==='run');
D.s2Mount(H,U.act(0));for(let i=0;i<60*4&&!S.onIsl;i++)ZC.tick(1);if(!S.onIsl)throw new Error('всадник не на острове');D.scene3();U.cine(400);ZC.tick(60*4);
const vis=S.horses.filter(q=>q.g.visible).length;if(vis)throw new Error('кони видны после этапа 2: '+vis+' '+S.horses.map(q=>q.state).join());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'horses gone after stage 2'
