//@@
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(30);const F=ZC.W.flags;const e=ZC.W.enemies[0];
const log=[];let ph=F.phase;for(let k=0;k<50&&F.phase<3;k++){U.brawl(1.5);if(F.phase!==ph){log.push('t='+k*1.5+' phase '+ph+'->'+F.phase);ph=F.phase;}}
ZC.tick(120);log.push('bubble up');
// Прошка стреляет
const H=ZC.HERO;H.proshka.face=Math.atan2(e.pos.x-H.proshka.pos.x,e.pos.z-H.proshka.pos.z);U.tap('KeyE');ZC.tick(60);log.push('st='+e.state);
const r1=U.walkTo(0,e.pos.x-2.4,e.pos.z+1.2,4),r2=U.walkTo(1,e.pos.x+2.4,e.pos.z+1.2,4);log.push(r1,r2);
H.proshka.face=Math.atan2(e.pos.x-H.proshka.pos.x,e.pos.z-H.proshka.pos.z);H.pelageya.face=Math.atan2(e.pos.x-H.pelageya.pos.x,e.pos.z-H.pelageya.pos.z);
ZC.press('KeyF');ZC.press('Comma');ZC.tick(20);log.push('won='+F.won+' cine='+!!ZC.G.cine);log
//@@ shot=w2bb.png
ZC.tick(500);
//@@ shot=w2bc.png
ZC.tick(420);
//@@
ZC.skip();ZC.tick(200);[ZC.W.levelId,ZC.G.done['2-B'],ZC.W.flags.mode,!!ZC.G.cine]
//@@ shot=w2bd.png
ZC.tick(2);
