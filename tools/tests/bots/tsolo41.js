//@@
ZC.setSolo(true);ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(20);const W=ZC.W,G=ZC.G,FG=W.FG;const r=['solo='+G.solo];
r.push(U.walkTo(0,0,-7.5,4));ZC.tick(30);ZC.skip();ZC.tick(5);r.push(W.flags.stage);
FG.made=4;FG.done=4;FG.onRack=4;ZC.tick(2);r.push(U.until(()=>W.abil.kleshi,8),W.flags.stage);r
//@@
const W=ZC.W,H=ZC.HERO;const r3=[];const F=W.flags;
const hot=n=>W.hots.find(i=>i.name===n);
r3.push(U.walkTo(0,-5.9,-14.1,4));U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(3);r3.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r3.push(U.path(0,[[-3.4,-14],[-2,-17],[3,-23.4]],4));U.act(0).face=Math.PI;ZC.tick(2);U.tap('KeyR');ZC.tick(40);r3.push('g1='+F.g1);
r3.push(U.path(0,[[-2,-17],[-3.4,-14],[-4.4,-14.1]],4));U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(3);r3.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r3.push(U.path(0,[[-3.4,-14],[-2,-17],[0,-25],[0,-38],[2.3,-40.3]],4));U.act(0).face=Math.PI;ZC.tick(2);U.tap('KeyR');ZC.tick(80);r3.push('g2='+F.g2);r3
//@@ shot=so41_gate.png
ZC.tick(1);
//@@
// бой: камера над цехом, стена у ворот полупрозрачная
const W=ZC.W,F=W.flags;const r=[];r.push(U.walkTo(0,0,-45,4),'fight='+F.fight,'zone='+(ZC.W.camZones.some(z=>z.camActive())));ZC.tick(90);
const faded=W.fades.filter(f=>f.k<0.9).length;r.push('faded='+faded,'fades='+W.fades.length);r
//@@ shot=so41_fight.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];W.enemies.forEach(e=>{if(e.alive){e.state='dying';e.t=0;e.alive=false;}});ZC.tick(80);r.push('cleared='+F.cleared);
H.proshka.pos.set(-3.4,0,-14);H.proshka.vel.set(0,0,0);ZC.tick(3);r.push(U.walkTo(0,-6.0,-14.2,3));U.act(0).pos.x=-6.0;U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(3);r.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r.push(U.path(0,[[-3.4,-14],[-2,-17],[0,-25],[0,-40],[0,-50],[0,-56.2]],5));U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(60);r.push('lit='+F.lit);ZC.tick(420);r.push('stage='+F.stage,!!ZC.G.cine);r
//@@
// «В четыре руки» в одиночку: берёшь один конец — второй подхватывает помощник
const W=ZC.W,H=ZC.HERO,F=W.flags,B=W.BIG,G=ZC.G;const r=['stage='+F.stage,'ctl='+U.act(G.soloPi).kind];
const E=()=>{const c=Math.cos(B.ang),s=Math.sin(B.ang);return [[B.pos.x-1.1*c,B.pos.z+1.1*s],[B.pos.x+1.1*c,B.pos.z-1.1*s]];};
r.push(U.walkTo(G.soloPi,E()[0][0]-0.2,E()[0][1]+0.7,6));ZC.press('KeyR');ZC.tick(3);r.push('hold='+!!B.hold[0]+'/'+!!B.hold[1]);
const KB=['KeyA','KeyD','KeyW','KeyS'];let maxd=0;
for(let i=0;i<60*12&&!B.placed;i++){const h=U.act(G.soloPi);const tx=-1.25,tz=-50.8;const dx=tx-h.pos.x,dz=tz-h.pos.z;ZC.hold(KB[0],dx<-0.2);ZC.hold(KB[1],dx>0.2);ZC.hold(KB[2],dz<-0.2);ZC.hold(KB[3],dz>0.2);
  if(B.hold[0]&&B.hold[1])maxd=Math.max(maxd,Math.hypot(B.hold[0].h.pos.x-B.hold[1].h.pos.x,B.hold[0].h.pos.z-B.hold[1].h.pos.z));ZC.tick(1);}
KB.forEach(k=>ZC.hold(k,false));r.push('placed='+B.placed,'stage='+F.stage,'maxd='+maxd.toFixed(2));r.join(' | ')
//@@ shot=so41_r4.png
ZC.tick(1);
//@@
// куём: ты на «БИТЬ», помощник держит и поворачивает; на середине меняетесь сами — теперь ты поворачиваешь
const W=ZC.W,H=ZC.HERO,F=W.flags,R=W.R4,G=ZC.G;const r=[];r.push(U.walkTo(G.soloPi,1.2,-49.1,4));let half=null,acts=0;
for(let i=0;i<60*60&&F.stage==='r4';i++){const k=Math.round(R.t/R.B),d=R.t-k*R.B,b=((k%4)+4)%4;const me=U.act(G.soloPi);
  const onS=Math.hypot(me.pos.x-1.2,me.pos.z+49.1)<1.0,onH=Math.hypot(me.pos.x+2.4,me.pos.z+50.8)<1.0;
  if(R.prog>=R.need/2&&half===null)half=(i/60).toFixed(1);
  if(Math.abs(d)<0.03&&!R.beatDone[k]){if(b!==3&&onS){ZC.press('KeyF');acts++;}else if(b===3&&onH){ZC.press('KeyR');acts++;}}
  ZC.tick(1);}
r.push('half@'+half,'prog='+R.prog,'stage='+F.stage,'acts='+acts,U.st());r
//@@
const W=ZC.W,F=W.flags,H=ZC.HERO,G=ZC.G;const r=['stage='+F.stage];ZC.press('Digit1');ZC.tick(2);
// закалка: Йоша — позвать и отойти, он польёт сам; или взять Йошу
r.push(U.until(()=>F.stage==='rung'||F.stage==='end',9),'stage='+F.stage,'yosha d='+Math.hypot(H.yosha.pos.x,H.yosha.pos.z+50.8).toFixed(1),'ctl='+U.act(G.soloPi).kind);r
