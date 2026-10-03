//@@ wait=1500
// релиз final06: 2-Б «Водяной» — новый бой в одиночку (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// 1 — шары отбиваем щитом сами, свалился — бьём, добиваем; 2 — Прошка играет северный родник и уступает (держит напев), Потап плывёт к южному;
// 3 — Прошка и Потап держат два колокола, Пелагея звонит в третий; съёжился — бьём; мах одним — засчитан. Проверка: проходится одним игроком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));window.me=()=>U.act(ZC.G.soloPi);
window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(6);}return me().kind;};
window.STEP=(x,z,tol)=>{const h=me(),dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>(tol||0.5);ZC.hold(B0[0],far&&dx<-0.25);ZC.hold(B0[1],far&&dx>0.25);ZC.hold(B0[2],far&&dz<-0.25);ZC.hold(B0[3],far&&dz>0.25);return !far;};
window.CINE=(max)=>{let t=0;while(!ZC.G.cine&&t<(max||300)){ZC.tick(1);t++;}const was=!!ZC.G.cine;while(ZC.G.cine&&t<4000){ZC.tick(1);t++;}return was;};
window.DEF=(i)=>{const h=me();const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo){ZC.press('KeyG');return true;}
  const w=ZC.W.enemies.find(e=>e.alive&&e.tgt===h&&e.state==='wind');if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press('ShiftLeft');}else if(left<0.16&&w.left===null)ZC.press('KeyG');return true;}
  const m=ZC.W.enemies.find(e=>e.alive&&e.kind!=='vodyanoy'&&Math.hypot(e.pos.x-h.pos.x,e.pos.z-h.pos.z)<2.2);if(m&&i%10===0){h.face=Math.atan2(m.pos.x-h.pos.x,m.pos.z-h.pos.z);ZC.press('KeyF');}return false;};
window.HIT=(e,i)=>{const h=me();if(STEP(e.pos.x-1.6,e.pos.z+1.6,0.7)){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);if(i%9===0)ZC.press('KeyF');}};
window.SWIM=i=>{const h=me();if(h.groundRef&&h.groundRef.water&&i%30===0)ZC.press('Space');};
window.HELD=S=>Object.values(ZC.HERO).some(h=>h.kwHold&&h.kwHold.ref===S.ref);
// дойти до ракушки, сыграть и уступить (оставленный держит напев); true — держит
window.PLAYQ=(S,max)=>{ZC.tick(45);for(let k=0;k<(max||20)*60;k++){if(DEF(k))continue;if(STEP(S.x*0.86,S.z+(S.z>-6?-1:S.z<-20?1:0),0.9))break;SWIM(k);ZC.tick(1);}rel();ZC.press('KeyR');ZC.tick(3);ZC.press('KeyQ');ZC.tick(8);return HELD(S);};
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
CINE(200);ZC.tick(5);ZC.W.warp2b('boss');CINE(300);ZC.tick(30);toKind('proshka');'solo phase='+ZC.W.flags.phase
//@@
const D=ZC.W.dbg2b(),F=ZC.W.flags,e=D.vod;let falls=0,was=true;
for(let i=0;i<60*180&&F.phase===1;i++){if(!DEF(i)){if(e.dazeT>0||e.state==='broken')HIT(e,i);else STEP(-2.6,-8.4);}if(was&&!D.BS.ride)falls++;was=D.BS.ride;ZC.tick(1);}
rel();if(F.phase===1)throw new Error('этап 1 не пройден: hits='+D.BS.hits+' falls='+falls+' emb='+e.embers+' '+U.st());CINE(300);ZC.tick(30);'solo stage1 falls='+falls
//@@
const D=ZC.W.dbg2b(),F=ZC.W.flags,e=D.vod,S=D.SP,r=[];let stalls=0,was=false;
for(let n=0;n<6&&F.phase===2;n++){if(D.BS.stall<=0){toKind('proshka');r.push('h='+PLAYQ(S[0]));toKind('potap');
    for(let k=0;k<60*20&&D.BS.stall<=0&&F.phase===2;k++){if(DEF(k))continue;if(STEP(S[2].x*0.86,S[2].z-1,0.9)){rel();if(S[2].ref.hum<0.5&&k%20===0)ZC.press('KeyR');}else SWIM(k);ZC.tick(1);}}
  if(D.BS.stall>0)stalls++;for(let i=0;i<60*14&&D.BS.stall>0&&F.phase===2;i++){if(!DEF(i))HIT(e,i);ZC.tick(1);}
  for(let i=0;i<60*6&&e.state==='broken'&&F.phase===2;i++){HIT(e,i);ZC.tick(1);}}
rel();if(F.phase===2)throw new Error('этап 2 не пройден: stalls='+stalls+' '+r.join()+' emb='+e.embers+' '+U.st());CINE(300);ZC.tick(30);'solo stage2 stalls='+stalls+' '+r.join()
//@@ shot=k2bbs_3.png
const D=ZC.W.dbg2b(),F=ZC.W.flags,e=D.vod,B=D.BELL,r=[];let stuns=0;
for(let n=0;n<6&&!F.won;n++){toKind('proshka');r.push('b0='+PLAYQ(B[0]));r.push('b1='+PLAYQ(B[1]));const k0=me().kind;
  for(let k=0;k<60*20&&!D.BS.stun;k++){if(DEF(k))continue;if(STEP(B[2].x*0.86,B[2].z-1,0.9)){rel();if(B[2].ref.hum<0.5&&k%20===0)ZC.press('KeyR');}ZC.tick(1);}
  if(D.BS.stun)stuns++;for(let i=0;i<60*16&&(D.BS.stun||e.state==='broken')&&!F.won;i++){if(!DEF(i))HIT(e,i);ZC.tick(1);}r.push(k0+':'+(F.won?'won':'again'));}
rel();if(!F.won)throw new Error('этап 3 не пройден: stuns='+stuns+' '+r.join()+' emb='+e.embers+' '+U.st());'solo stage3 stuns='+stuns+' '+r.join()
//@@
CINE(400);ZC.tick(200);if(!ZC.G.done['2-B'])throw new Error('уровень не пройден');if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-B boss solo done errs=0'
