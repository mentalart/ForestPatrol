//@@ wait=1500
// релиз final06: напарник-бот в бою с Водяным (2-Б) за Игрока 2 (Пелагея и Йоша), человека (Игрок 1: Прошка и Потап) играет скрипт. Этап 1 «Сом-перевозчик»: бот держит щит, уходит
// от красной дорожки, в окне бьёт; 2 «Водяные кони»: бот играет у раковины (человек садится на коня), потом человек играет — бот запрыгивает и бьёт по короне; 3 «Омут-зеркало»: Йоша
// поливает бутон, Пелагея на плоту — Совиный взор; 4 «Великий вал»: свой колокол на «БОМ!»; общий удар — вместе с человеком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.P=ZC.players;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.D2=()=>ZC.W.dbg2b();
window.ACT=(kind)=>{for(let i=0;i<3&&U.act(0).kind!==kind;i++){U.tap('KeyQ');ZC.tick(6);}return U.act(0).kind===kind;};
window.REL0=()=>U.rel(0);
window.STEP=(x,z,tol)=>U.step(0,x,z,tol);
window.FACE=p=>{const h=U.act(0);h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);};
window.HIT=(e,i,off)=>{const h=U.act(0),o=off||1.9;const a=Math.atan2(h.pos.z-e.pos.z,h.pos.x-e.pos.x);if(STEP(e.pos.x+Math.cos(a)*(e.r*0.5+o),e.pos.z+Math.sin(a)*(e.r*0.5+o),0.9)){REL0();FACE(e.pos);if(i%9===0)ZC.press('KeyF');}};
window.GUARD=()=>{const h=U.act(0),bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.eta<0.9);ZC.hold('KeyG',!!bo);return !!bo;};
window.st=()=>{const e=D2().vod,R=D2().S3.rafts[0];return 'me='+pos(me())+' bot='+pos(bot())+' '+CO.mode+' ph='+F().phase+' G='+ZC.G.state+(ZC.G.cine?' cine':'')+(ZC.G.ui?' ui':'')+' vod='+(e?e.state+'/'+e.embers+'/'+(e.dazeT||0).toFixed(1)+'@'+e.pos.x.toFixed(1)+','+e.pos.z.toFixed(1):'-')+(R?' raft='+R.st+'/'+R.r.toFixed(1)+'/'+R.a.toFixed(2)+'/'+R.life.toFixed(0):'')+' t='+ZC.G.time.toFixed(0)+' errs='+_errs.length+' HE '+Object.values(ZC.HERO).map(h=>h.kind[0]+(h.active?'*':'')+(R&&h.groundRef===R.col?'R':'')+(h.following?'f':'')+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)).join(' ');};
window.DOWNS=[0,0];window.TRACK=()=>{for(const p of[0,1]){const d=!!P[p].downed;if(d&&!DOWNS['p'+p])DOWNS[p]++;DOWNS['p'+p]=d;}};
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
CO.set(true);CO.skill=1;
U.cine(200);ZC.tick(5);const D=ZC.W.warp2b('boss');U.cine(300);ZC.tick(60);if(!CO.routes['2-B'])throw new Error('нет маршрута 2-Б');
'phase='+F().phase+' s1='+D2().S1.st+' bot='+pos(bot())+' '+CO.mode
//@@ shot=cmp2bb_1.png
// этап 1: человек — Прошка зовёт Потапа, рогатка в ус сома на мели, Потап тянет; бот — щит на шары, от красной дорожки, в окне бьёт Водяного
const D=D2(),F0=F(),e=D.vod,S=D.S1;ACT('proshka');U.tap('Digit1');ZC.tick(10);let beach=0,pulls=0,stuns=0,prev='',botHits=0;const L=[];
for(let i=0;i<60*170&&F0.phase===1;i++){TRACK();if(S.st!==prev){if(S.st==='beached')beach++;if(S.st==='pull')pulls++;if(S.st==='stun')stuns++;prev=S.st;if(i%1===0&&L.length<30)L.push((i/60).toFixed(0)+'s '+S.st+' bot='+pos(bot())+' '+CO.mode);}
  const open=e.state==='broken'||e.dazeT>0;
  if(open){if(!U.def(0,i))HIT(e,i);}
  else if(pulls?U.def(0,i):GUARD()){}
  else if(S.sh&&(S.st==='tele'||S.st==='lunge'||(S.st==='beached'&&!S.whisk))){
    if(ACT('proshka')){const sh=S.sh,a=S.a||sh,lx=sh.x-a.x,lz=sh.z-a.z,Ln=Math.hypot(lx,lz)||1,px=-lz/Ln,pz=lx/Ln,s=(px*(-sh.x)+pz*(-14-sh.z))>0?1:-1;
      if(STEP(sh.x+px*s*4.6+(0-sh.x)*0.25,sh.z+pz*s*4.6+(-14-sh.z)*0.25,1.2))REL0();if(S.st==='beached'){FACE(D.whiskTip);if(i%20===0)U.tap('KeyE');}}}
  else if(S.st==='beached'&&S.whisk){if(ACT('potap')&&STEP(D.whiskTip.x,D.whiskTip.z,1.2)){REL0();if(i%15===0)U.tap('KeyE');}}
  else if(S.st==='circle'&&U.act(0).kind!=='proshka'){ACT('proshka');U.tap('Digit1');}
  else STEP(-2.5,-6.2,1.2);
  ZC.tick(1);}
REL0();ZC.hold('KeyG',false);if(F0.phase===1)throw new Error('этап 1 не пройден: beach='+beach+' pulls='+pulls+' stuns='+stuns+' st='+S.st+' emb='+e.embers+' zap='+D.BS.zap.toFixed(2)+' '+st()+' '+L.join(' | '));
U.cine(300);ZC.tick(30);'stage1 ok beach='+beach+' pulls='+pulls+' stuns='+stuns+' downs='+DOWNS[0]+'/'+DOWNS[1]+' → phase '+F0.phase
//@@
// этап 2: сначала человек играет у раковины (до бота) — бот запрыгивает на коня и бьёт по короне; потом бот играет у раковины, ближней к человеку, человек садится на коня и бьёт сам
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);U.cine(200);ZC.tick(5);const D=ZC.W.warp2b('boss2');ZC.tick(60);window.DOWNS=[0,0];
const F0=F(),e=D.vod,S=D.S2;ACT('proshka');const C={x:0,z:-14};let rides=[0,0],isl=[0,0],prevR=null,prevI=null,played=false;const L=[];
for(let i=0;i<60*220&&F0.phase===2;i++){TRACK();const h=U.act(0);
  if(!played){played=true;const SS=D.SHOAL[1],ux=(C.x-SS.x)/8.6,uz=(C.z-SS.z)/8.6;h.pos.set(SS.x-ux*0.5,1.4,SS.z-uz*0.5);h.vel.set(0,0,0);h.following=false;ZC.tick(2);ZC.press('KeyR');ZC.tick(2);}
  if(S.horses.some(H=>H.state==='ride')){const rd=S.horses.find(H=>H.state==='ride').rider;if(rd!==prevR){prevR=rd;if(rd)rides[rd.player]++;}}else prevR=null;
  if(S.onIsl&&S.onIsl!==prevI){prevI=S.onIsl;isl[S.onIsl.player]++;}if(!S.onIsl)prevI=null;
  if(i%900===0&&L.length<14)L.push((i/60).toFixed(0)+'s '+CO.mode+' bot='+pos(bot())+' me='+pos(h)+' H='+S.horses.map(q=>q.state).join(',')+' emb='+e.embers);
  if(h.k2ride){ZC.tick(1);continue;}
  const open=e.dazeT>0||e.state==='broken';
  if(h.pos.y>2.5){if(open){REL0();FACE(e.pos);if(i%9===0)ZC.press('KeyF');}ZC.tick(1);continue;}
  if(U.def(0,i)){ZC.tick(1);continue;}
  if(open&&e.pos.y<0){HIT(e,i);ZC.tick(1);continue;}
  const H=S.horses.find(q=>(q.state==='wait'||q.state==='come')&&q.by!==h&&q.ref);
  if(H){const SS=D.SHOAL[H.ref.i],ux=(C.x-SS.x)/8.6,uz=(C.z-SS.z)/8.6;if(STEP(SS.x+ux*1.6,SS.z+uz*1.6,0.6)){REL0();if(H.state==='wait'&&i%12===0)ZC.press('Space');}}
  else STEP(-3,-3.4,1.0);
  ZC.tick(1);}
REL0();ZC.hold('KeyG',false);if(F0.phase===2)throw new Error('этап 2 не пройден: rides(me/bot)='+rides+' isl='+isl+' emb='+e.embers+' '+st()+' '+L.join(' | '));
if(!rides[1])throw new Error('бот не ездил на коне: rides='+rides+' isl='+isl+' '+L.join(' | '));if(!rides[0])throw new Error('человек не ездил: rides='+rides+' isl='+isl+' '+L.join(' | '));
U.cine(300);ZC.tick(30);'stage2 ok rides(me/bot)='+rides+' isl='+isl+' downs='+DOWNS[0]+'/'+DOWNS[1]+' → phase '+F0.phase
//@@
// этап 3: бот-Йоша поливает бутон, Пелагея на плот — Совиный взор; человек (Прошка) на плот, метка в настоящего, бьют в окне
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);U.cine(200);ZC.tick(5);const D=ZC.W.warp2b('boss3');ZC.tick(60);window.DOWNS=[0,0];
const F0=F(),e=D.vod,S=D.S3;ACT('proshka');let rafts=0,owls=0,marks=0,prevO=0,lastRaft=null,botOn=0;const L=[];
for(let i=0;i<60*220&&F0.phase===3;i++){TRACK();const raft=S.rafts.find(r=>r.st!=='sink');if(raft&&raft!==lastRaft){lastRaft=raft;rafts++;}if(S.owl>0&&prevO<=0)owls++;prevO=S.owl;
  if(raft&&bot().groundRef===raft.col)botOn++;
  if(i%600===0&&L.length<14)L.push((i/60).toFixed(0)+'s '+CO.mode+' bot='+pos(bot())+' me='+pos(me())+' raft='+(raft?raft.st:'-')+' owl='+S.owl.toFixed(1)+' emb='+e.embers);
  const h=U.act(0);const onR=raft&&h.groundRef===raft.col;
  if(U.def(0,i)){ZC.tick(1);continue;}
  if(!raft){STEP(-3,-3.4,1.0);ZC.tick(1);continue;}
  if(!onR){if(raft.st==='wait'||raft.st==='go')STEP(raft.col.x,raft.col.z,0.5);ZC.tick(1);continue;}
  STEP(raft.col.x-0.6,raft.col.z,0.5);
  if(e.dazeT>0||e.state==='broken'){FACE(e.pos);if(i%9===0)ZC.press('KeyF');}
  else if(S.owl>0&&i%20===0){const p=D.posSlot(S.real);FACE(p);U.tap('KeyE');marks++;}
  ZC.tick(1);}
REL0();if(F0.phase===3)throw new Error('этап 3 не пройден: rafts='+rafts+' owls='+owls+' marks='+marks+' botOn='+botOn+' emb='+e.embers+' dz='+e.dazeT.toFixed(1)+' '+st()+' '+L.join(' | '));
if(!owls)throw new Error('бот не включал Совиный взор');U.cine(400);ZC.tick(30);'stage3 ok rafts='+rafts+' owls='+owls+' marks='+marks+' botOn='+botOn+' downs='+DOWNS[0]+'/'+DOWNS[1]+' → phase '+F0.phase
//@@
// этап 4: каждый у своего колокола, удар на «БОМ!»; вал расступился — общий удар вместе
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);U.cine(200);ZC.tick(5);const D=ZC.W.warp2b('boss4');U.cine(400);ZC.tick(30);
const F0=F(),e=D.vod,S=D.S4,B=D.BELL4;let miss=0,prev=null;
for(let i=0;i<60*120&&F0.phase===4;i++){if(S.st!==prev){if(S.st==='crash')miss++;prev=S.st;}
  const K4=B[0];if(STEP(K4.x-0.6,K4.z+1.4,0.5)){REL0();FACE(K4);}
  if((S.st==='come'||S.st==='strike')&&S.hit[0]==null){const left=S.strikeAt-ZC.G.time;if(left<0.05&&left>-0.12)ZC.press('KeyF');}
  ZC.tick(1);}
REL0();if(F0.phase===4)throw new Error('этап 4 не пройден: ok='+S.ok+' miss='+miss+' st='+S.st+' '+st());
U.cine(400);ZC.tick(20);let fin=0;
for(let i=0;i<60*30&&!F0.won;i++){const h=U.act(0);const a=Math.atan2(h.pos.z-e.pos.z,h.pos.x-e.pos.x);if(STEP(e.pos.x+Math.cos(a)*2.6,e.pos.z+Math.sin(a)*2.6,0.8)){REL0();FACE(e.pos);if(i%20===0){ZC.press('KeyF');fin++;}}ZC.tick(1);}
REL0();if(!F0.won)throw new Error('общий удар не засчитан: fin='+fin+' st='+e.state+' '+st());'stage4 ok waves='+S.ok+' miss='+miss+' fin='+fin
//@@
U.cine(600);ZC.tick(200);if(!ZC.G.done['2-B'])throw new Error('уровень не пройден: lvl='+ZC.W.levelId);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-B boss done errs=0'
