//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.phase,U.st(),'foes='+W.enemies.map(e=>e.kind+':'+e.signals.join('/')+':'+e.pi).join(','),U.obj());r
//@@ shot=w4ba.png
ZC.tick(30);
//@@
// фаза 1: левую — Игрок 1, правую — Игрок 2
const W=ZC.W,H=ZC.HERO,F=W.flags;const r2=[];
r2.push(U.brawl(60),'phase='+F.phase,W.enemies.map(e=>e.state+':'+e.embers).join(','));r2
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r3=[];const Y=H.yosha,P=H.proshka;
if(U.act(1)!==Y){U.tap('KeyK');ZC.tick(3);}
const log=[];let acorns=0,waters=0;
for(let k=0;k<90&&F.phase===2;k++){
  // рогатка по жёлудю
  if(F.longInh>0&&P.skillCd<=0){const m=W.enemies[1];P.face=Math.atan2(m.pos.x-P.pos.x,m.pos.z-P.pos.z);U.tap('KeyE');acorns++;}
  // Йоша — сытых
  const sat=W.enemies.find(e=>e.sat>0&&e.state!=='broken');
  if(sat){for(let i=0;i<120;i++){const dx=sat.pos.x-Y.pos.x,dz=sat.pos.z-Y.pos.z;const B=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];const far=Math.hypot(dx,dz)>2.4;ZC.hold(B[0],far&&dx<-0.3);ZC.hold(B[1],far&&dx>0.3);ZC.hold(B[2],far&&dz<-0.3);ZC.hold(B[3],far&&dz>0.3);if(!far){Y.face=Math.atan2(dx,dz);if(Y.skillCd<=0){ZC.press('KeyL');waters++;ZC.tick(25);break;}}ZC.tick(1);}['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].forEach(q=>ZC.hold(q,false));}
  U.brawl(1.2);
  if(k%6===0)log.push(k+':'+W.enemies.map(e=>e.state[0]+e.embers+(e.sat>0?'s':'')).join(','));}
r3.push(log.join(' '),'acorns='+acorns,'waters='+waters,'phase='+F.phase);r3
//@@ shot=w4bb.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r4=['phase='+F.phase];
r4.push(U.walkTo(0,-7.8,2.4,6),U.walkTo(1,-6.2,2.4,6));U.act(0).face=Math.atan2(0.8,0.6);U.act(1).face=Math.atan2(-0.8,0.6);ZC.tick(2);U.tap('KeyR');ZC.tick(20);U.tap('Semicolon');ZC.tick(20);
// несём вдвоём к шее
for(let i=0;i<60*8;i++){const tx=0,tz=-10.8;for(const pi of[0,1]){const h=U.act(pi);const B=pi?['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']:['KeyA','KeyD','KeyW','KeyS'];const ox=pi?0.9:-0.9;const dx=tx+ox-h.pos.x,dz=tz-h.pos.z;ZC.hold(B[0],dx<-0.3);ZC.hold(B[1],dx>0.3);ZC.hold(B[2],dz<-0.3);ZC.hold(B[3],dz>0.3);}ZC.tick(1);if(Math.hypot(U.act(0).pos.x+0.9,U.act(0).pos.z+10.8)<0.6&&Math.hypot(U.act(1).pos.x-0.9,U.act(1).pos.z+10.8)<0.6)break;}
['KeyA','KeyD','KeyW','KeyS','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].forEach(k=>ZC.hold(k,false));ZC.tick(5);
r4.push(U.st(),'phase='+F.phase);ZC.press('KeyE');ZC.press('KeyL');ZC.tick(30);r4.push('won='+F.won,!!ZC.G.cine);r4
//@@
ZC.tick(300);ZC.skip();ZC.tick(300);[ZC.W.levelId,ZC.G.done['4-B']]
