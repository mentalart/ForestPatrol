//@@
ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(20);const W=ZC.W,H=ZC.HERO;const r=[W.name,W.world,W.vest,W.zven&&W.zven.vestKind];
r.push(U.walkTo(0,0,-7.5,4),W.flags.stage,!!ZC.G.cine);ZC.tick(30);ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj());r
//@@ shot=w41a.png
ZC.tick(1);
//@@
// ковка: Прошка бьёт в такт; Пелагея прыгает на рычаг и НЕ переключается — Йоша закаливает сам
window.NOSWAP=true;
const W=ZC.W,H=ZC.HERO,FG=W.FG;const r2=[];r2.push(U.walkTo(0,0,-12.6,3));r2.push(U.walkTo(1,-7.1,-13.8,4),'act1='+U.act(1).kind);
let last=-1,jumps=0;const hs=[];
for(let i=0;i<60*90&&!W.abil.kleshi;i++){
  const u=((FG.t%FG.B)+FG.B)%FG.B/FG.B;const beat=Math.floor(FG.t/FG.B);
  if(FG.t>0&&u<0.08&&beat!==last&&FG.made<FG.total){last=beat;ZC.press('KeyF');}
  // Пелагея: прыгать на рычаг при остывании, пока нет очереди; иначе Йоша закаливает
  const a1=U.act(1);
  if(FG.queue>0&&!window.NOSWAP){if(a1.kind==='pelageya'){ZC.press('KeyK');}else{ if(Math.hypot(a1.pos.x-4.6,a1.pos.z+14.2)>2.2){const B=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];const dx=4.6-a1.pos.x,dz=-12.4-a1.pos.z;ZC.hold(B[0],dx<-0.25);ZC.hold(B[1],dx>0.25);ZC.hold(B[2],dz<-0.25);ZC.hold(B[3],dz>0.25);}else{['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].forEach(k=>ZC.hold(k,false));a1.face=Math.PI;if(i%20===0)ZC.press('KeyL');}}}
  else if(a1.kind==='yosha'&&!(FG.queue>0)){['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].forEach(k=>ZC.hold(k,false));ZC.press('KeyK');}
  else{const B=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];const dx=-7.1-a1.pos.x,dz=-13.8-a1.pos.z;const far=Math.hypot(dx,dz)>0.5;ZC.hold(B[0],far&&dx<-0.2);ZC.hold(B[1],far&&dx>0.2);ZC.hold(B[2],far&&dz<-0.2);ZC.hold(B[3],far&&dz>0.2);if(!far&&FG.heat<0.7&&a1.grounded&&i%10===0){ZC.press('KeyM');jumps++;}}
  if(i%300===0)hs.push(FG.heat.toFixed(2)+'/'+FG.made+'/'+FG.done);
  ZC.tick(1);}
['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].forEach(k=>ZC.hold(k,false));
r2.push('kleshi='+W.abil.kleshi,'made='+FG.made,'done='+FG.done,'jumps='+jumps,hs.join(' '),U.obj());r2
//@@ shot=w41b.png
ZC.tick(60);
//@@
const W=ZC.W,H=ZC.HERO;const r3=[];const F=W.flags;
const hot=n=>W.hots.find(i=>i.name===n);
r3.push(U.walkTo(0,-5.9,-14.1,4));U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(3);r3.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r3.push(U.path(0,[[-3.4,-14],[-2,-17],[3,-23.4]],4));U.act(0).face=Math.PI;ZC.tick(2);r3.push('vel='+Math.hypot(U.act(0).vel.x,U.act(0).vel.z).toFixed(2));U.tap('KeyR');ZC.tick(40);r3.push('g1='+F.g1,'sp='+hot('slitok').pos.toArray().map(v=>v.toFixed(2)),'heat='+hot('slitok').heat.toFixed(2));
// гвоздь
r3.push(U.path(0,[[-2,-17],[-3.4,-14],[-4.4,-14.1]],4));U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(3);r3.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r3.push(U.path(0,[[-3.4,-14],[-2,-17],[0,-25],[0,-38],[2.3,-40.3]],4));U.act(0).face=Math.PI;ZC.tick(2);U.tap('KeyR');ZC.tick(80);r3.push('g2='+F.g2,U.obj());
// уголь в печь подъёмника
r3.push(U.path(0,[[0,-38],[0,-25],[-2,-17],[-3.4,-14],[-5.2,-14.2]],5));U.act(0).face=Math.PI;r3.push(U.st(),W.hots.map(i=>i.kind+':'+i.pos.x.toFixed(1)+','+i.pos.y.toFixed(1)+','+i.pos.z.toFixed(1)+':'+i.heat.toFixed(2)+(i.gone?'G':'')).join(' '));U.act(0).pos.x=-5.2;U.act(0).vel.set(0,0,0);U.tap('KeyR');ZC.tick(3);r3.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r3.push(U.path(0,[[-3.4,-14],[-2,-17],[0,-25],[3,-28.6]],4));U.act(0).face=Math.atan2(1.2,-1.2);ZC.tick(2);U.tap('KeyR');ZC.tick(20);
r3.push(U.walkTo(0,6.1,-33,3));ZC.tick(420);r3.push(U.st());r3.push(U.walkTo(0,9.2,-33,3),U.walkTo(0,9.4,-37.6,3),'links='+W.links);r3
//@@ shot=w41c.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO;const r4=[];const F=W.flags;
H.proshka.pos.set(0,0,-40);H.proshka.vel.set(0,0,0);if(U.act(1).kind!=='yosha'){U.tap('KeyK');ZC.tick(3);}H.yosha.pos.set(1.5,0,-40);H.yosha.vel.set(0,0,0);ZC.tick(5);
r4.push(U.walkTo(0,0,-45,3),'fight='+F.fight,W.enemies.length);ZC.tick(120);
const K2=[{a:'KeyF',it:'KeyR',g:'KeyG',B:['KeyA','KeyD','KeyW','KeyS']},{a:'Comma',it:'Semicolon',sk:'KeyL',g:'Period',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
const mv=(pi,x,z,stop)=>{const h=U.act(pi),k=K2[pi];const dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>stop;ZC.hold(k.B[0],far&&dx<-0.3);ZC.hold(k.B[1],far&&dx>0.3);ZC.hold(k.B[2],far&&dz<-0.3);ZC.hold(k.B[3],far&&dz>0.3);if(!far)h.face=Math.atan2(dx,dz);return !far;};
const log=[];let grabs=0,waters=0;
for(let i=0;i<60*80;i++){H.proshka.iT=99;H.yosha.iT=99;const al=W.enemies.filter(e=>e.alive);if(!al.length||al.every(e=>e.armor==='off')){log.push('off@'+(i/60).toFixed(1));break;}
  const hotE=al.find(e=>e.armor==='hot'),coolE=al.find(e=>e.armor==='cool'),offE=al.find(e=>e.armor==='off');
  // Йоша: поливает горячих
  if(hotE){if(mv(1,hotE.pos.x,hotE.pos.z,2.4)&&i%15===0){ZC.press('KeyL');waters++;}}else if(offE){if(mv(1,offE.pos.x,offE.pos.z,1.8)&&i%9===0)ZC.press('Comma');}else mv(1,U.act(1).pos.x,U.act(1).pos.z,9);
  // Прошка: срывает латы, бьёт открытых
  if(coolE){if(mv(0,coolE.pos.x,coolE.pos.z,1.6)&&i%10===0){ZC.press('KeyR');grabs++;}}else if(offE){if(mv(0,offE.pos.x,offE.pos.z,1.6)&&i%9===4)ZC.press('KeyF');}else if(hotE)mv(0,hotE.pos.x,hotE.pos.z,3.5);
  if(i%600===0)log.push(al.map(e=>e.armor+':'+e.state+':'+e.hp).join(','));
  ZC.tick(1);}
[0,1].forEach(pi=>K2[pi].B.forEach(k=>ZC.hold(k,false)));log.push(U.brawl(90));
r4.push(log.join(' | '),'grabs='+grabs,'waters='+waters,'cleared='+F.cleared,U.obj());r4
//@@ shot=w41d.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO;const r5=[];const F=W.flags;ZC.tick(200);
// горячий слиток в большой горн
H.proshka.pos.set(-3.4,0,-14);H.proshka.vel.set(0,0,0);ZC.tick(3);r5.push(U.walkTo(0,-6.0,-14.2,3));U.act(0).pos.x=-6.0;U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(3);r5.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r5.push(U.path(0,[[-3.4,-14],[-2,-17],[0,-25],[0,-40],[0,-50],[0,-56.2]],5));U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(60);r5.push('lit='+F.lit,'stage='+F.stage,!!ZC.G.cine);ZC.tick(420);r5
//@@ shot=w41e.png
ZC.tick(1);
//@@
// «В четыре руки»: несём вдвоём
const W=ZC.W,H=ZC.HERO,F=W.flags,B=W.BIG;const r=['stage='+F.stage];
if(U.act(1).kind!=='yosha'){U.tap('KeyK');ZC.tick(3);}H.yosha.pos.set(2,0,-54);H.yosha.vel.set(0,0,0);ZC.tick(3);
const E=()=>{const c=Math.cos(B.ang),s=Math.sin(B.ang);return [[B.pos.x-1.1*c,B.pos.z+1.1*s],[B.pos.x+1.1*c,B.pos.z-1.1*s]];};
r.push(U.walkTo(0,E()[0][0]-0.2,E()[0][1]+0.7,5),U.walkTo(1,E()[1][0]+0.2,E()[1][1]+0.7,5));ZC.press('KeyR');ZC.tick(2);r.push('one='+!!B.hold[0]);ZC.press('Semicolon');ZC.tick(2);r.push('hold='+!!B.hold[0]+'/'+!!B.hold[1]);
const KB=[['KeyA','KeyD','KeyW','KeyS'],['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']];
for(let i=0;i<60*10&&!B.placed;i++){for(const pi of[0,1]){const h=U.act(pi);const tx=pi?1.25:-1.25,tz=-50.8;const dx=tx-h.pos.x,dz=tz-h.pos.z;const b=KB[pi];ZC.hold(b[0],dx<-0.2);ZC.hold(b[1],dx>0.2);ZC.hold(b[2],dz<-0.2);ZC.hold(b[3],dz>0.2);}ZC.tick(1);}
KB.flat().forEach(k=>ZC.hold(k,false));r.push('placed='+B.placed,'stage='+F.stage,'big='+B.pos.toArray().map(v=>v.toFixed(1)).join(','));r.join(' | ')
//@@ shot=w41g.png
ZC.tick(1);
//@@
// куём вдвоём: Прошка бьёт, Йоша держит; на середине меняются
const W=ZC.W,H=ZC.HERO,F=W.flags,R=W.R4;const r=[];
const go=(pi,x,z)=>U.walkTo(pi,x,z,4);
r.push(go(0,1.2,-49.1),U.path(1,[[1.4,-48.6],[-1.6,-48.8],[-2.4,-50.8]],6));let swapped=false,acts=0;
for(let i=0;i<60*40&&F.stage==='r4';i++){
  if(!swapped&&R.prog>=R.need/2){swapped=true;r.push('half@'+(i/60).toFixed(1));r.push(U.path(0,[[0.2,-47.8],[-1.8,-48.4],[-2.4,-50.8]],5),U.path(1,[[-1.6,-48.6],[1.2,-49.1]],5));}
  const k=Math.round(R.t/R.B),d=R.t-k*R.B,b=((k%4)+4)%4;
  if(k>=0&&Math.abs(d)<0.009){const striker=swapped?1:0,holder=1-striker;if(b===3)ZC.press(holder?'Semicolon':'KeyR');else{ZC.press(striker?'Comma':'KeyF');}acts++;}
  ZC.tick(1);}
r.push('prog='+R.prog,'stage='+F.stage,'acts='+acts);ZC.tick(30);
// закалка
ZC.press('KeyL');ZC.tick(40);r.push('after='+F.stage,!!ZC.G.cine);r.join(' | ')
//@@ shot=w41f.png
ZC.tick(200);
//@@
ZC.tick(300);ZC.skip();ZC.tick(300);[ZC.W.levelId,ZC.G.done['4-1'],ZC.G.got['4-1'],ZC.W.links].join(' ')
