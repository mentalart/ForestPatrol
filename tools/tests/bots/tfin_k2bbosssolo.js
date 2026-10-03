//@@ wait=1500
// релиз final06: 2-Б «Водяной» — бой в одиночку (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша), на общих помощниках U.*:
// 1 — шары отбиваем щитом сами, свалился — бьём, добиваем; 2 — Прошка играет северный родник и уступает (держит напев), Потап плывёт к южному;
// 3 — Прошка и Потап держат два колокола, Пелагея звонит в третий; съёжился — бьём; мах одним — засчитан. Проверка: проходится одним игроком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.SPOT=S=>[S.x*0.86,S.z+(S.z>-6?-1:S.z<-20?1:0)];
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
U.cine(200);ZC.tick(5);ZC.W.warp2b('boss');U.cine(300);ZC.tick(30);U.toKind('proshka');'solo phase='+ZC.W.flags.phase
//@@
const D=ZC.W.dbg2b(),F=ZC.W.flags,e=D.vod;let falls=0,was=true;
for(let i=0;i<60*180&&F.phase===1;i++){if(!U.def(0,i)){if(e.dazeT>0||e.state==='broken')U.hit(0,e,i);else U.step(0,-2.6,-8.4);}if(was&&!D.BS.ride)falls++;was=D.BS.ride;ZC.tick(1);}
U.rel(0);if(F.phase===1)throw new Error('этап 1 не пройден: hits='+D.BS.hits+' falls='+falls+' emb='+e.embers+' '+U.st());U.cine(300);ZC.tick(30);'solo stage1 falls='+falls
//@@
const D=ZC.W.dbg2b(),F=ZC.W.flags,e=D.vod,S=D.SP,r=[];let stalls=0;
for(let n=0;n<6&&F.phase===2;n++){if(D.BS.stall<=0){U.toKind('proshka');r.push('h='+U.playHold(0,S[0],SPOT(S[0])));U.toKind('potap');
    for(let k=0;k<60*20&&D.BS.stall<=0&&F.phase===2;k++){if(U.def(0,k))continue;const [x,z]=SPOT(S[2]);if(U.step(0,x,z,0.9)){U.rel(0);if(S[2].ref.hum<0.5&&k%20===0)ZC.press('KeyR');}else U.swim(0,k);ZC.tick(1);}}
  if(D.BS.stall>0)stalls++;for(let i=0;i<60*14&&D.BS.stall>0&&F.phase===2;i++){if(!U.def(0,i))U.hit(0,e,i);ZC.tick(1);}
  for(let i=0;i<60*6&&e.state==='broken'&&F.phase===2;i++){U.hit(0,e,i);ZC.tick(1);}}
U.rel(0);if(F.phase===2)throw new Error('этап 2 не пройден: stalls='+stalls+' '+r.join()+' emb='+e.embers+' '+U.st());U.cine(300);ZC.tick(30);'solo stage2 stalls='+stalls+' '+r.join()
//@@ shot=k2bbs_3.png
const D=ZC.W.dbg2b(),F=ZC.W.flags,e=D.vod,B=D.BELL,r=[];let stuns=0;
for(let n=0;n<6&&!F.won;n++){U.toKind('proshka');r.push('b0='+U.playHold(0,B[0],SPOT(B[0])));r.push('b1='+U.playHold(0,B[1],SPOT(B[1])));const k0=U.me().kind;
  for(let k=0;k<60*20&&!D.BS.stun;k++){if(U.def(0,k))continue;const [x,z]=SPOT(B[2]);if(U.step(0,x,z,0.9)){U.rel(0);if(B[2].ref.hum<0.5&&k%20===0)ZC.press('KeyR');}ZC.tick(1);}
  if(D.BS.stun)stuns++;for(let i=0;i<60*16&&(D.BS.stun||e.state==='broken')&&!F.won;i++){if(!U.def(0,i))U.hit(0,e,i);ZC.tick(1);}r.push(k0+':'+(F.won?'won':'again'));}
U.rel(0);if(!F.won)throw new Error('этап 3 не пройден: stuns='+stuns+' '+r.join()+' emb='+e.embers+' '+U.st());'solo stage3 stuns='+stuns+' '+r.join()
//@@
U.cine(400);ZC.tick(200);if(!ZC.G.done['2-B'])throw new Error('уровень не пройден');if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-B boss solo done errs=0'
