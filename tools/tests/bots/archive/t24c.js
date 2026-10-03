//@@
ZC.startFrom(ZC.LV('2-4'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);const F=ZC.W.flags;const H=ZC.HERO;
ZC.W.enemies.filter(e=>e.pi===0).forEach(e=>{e.alive=false;ZC.W.group.remove(e.g);});ZC.W.enemies.splice(0,ZC.W.enemies.length,...ZC.W.enemies.filter(e=>e.alive));
const r=[];r.push(U.walkTo(0,-16,-22,6));U.tap('KeyE');ZC.tick(60);r.push('bell1='+F.bell1);
U.tap("KeyQ");ZC.tick(3);r.push(U.walkTo(0,-17.5,-13,6),U.walkTo(0,-11,-20,6),U.walkTo(0,-10.6,-21.6,6));H.potap.face=Math.atan2(-9.4-H.potap.pos.x,-22.5-H.potap.pos.z);U.tap('KeyF');ZC.tick(120);r.push('barrel='+F.barrel);
H.yosha.pos.set(9,0,-24);ZC.tick(5);r.push(U.walkTo(1,6.4,-28.4,4));U.tap('KeyL');ZC.tick(60);
r.push(U.walkTo(1,9,-38.2,5));U.tap('KeyL');ZC.tick(60);r.push('tongue='+F.tongue,U.walkTo(1,9,-52,6),U.st());ZC.tick(200);r.push('c3T='+(F.c3T||0).toFixed(1));U.tap('Digit0');ZC.tick(20);r.push('ask='+F.ask);r
//@@ shot=w24c.png
ZC.tick(2);
//@@
const F=ZC.W.flags;const H=ZC.HERO;const r=[];U.tap('KeyQ');ZC.tick(3);r.push(U.walkTo(0,-18,-2,8),U.st());H.proshka.face=Math.atan2(-22.6-H.proshka.pos.x,2.6-H.proshka.pos.z);U.tap('KeyE');ZC.tick(60);r.push('bell2='+F.bell2);
r.push(U.walkTo(1,9,-58,6));r.push(U.fight(1,'parry',60));r.push(U.walkTo(1,10.4,-66.2,5));U.tap('KeyL');ZC.tick(40);r.push('final='+F.final,'cine='+!!ZC.G.cine);r
//@@ shot=w24d.png
ZC.tick(600);
//@@ shot=w24e.png
ZC.tick(500);
//@@ shot=w24f.png
ZC.tick(300);
//@@
ZC.skip();ZC.tick(100);[ZC.W.levelId,ZC.G.done['2-4'],ZC.G.got['2-4'],ZC.G.nutsGot['2-4']]
