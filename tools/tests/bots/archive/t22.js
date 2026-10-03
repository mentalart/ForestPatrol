//@@
ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(10);
const Zs=ZC.W.waters;const r=[U.walkTo(0,-3,-12,5),U.walkTo(1,3,-12,5)];U.tap('KeyR');ZC.tick(30);r.push('req='+!!Zs[0].req);ZC.tick(120);r.push('Z1='+Zs[0].level.toFixed(2),U.st());
r.push(U.walkTo(0,-3,-25,6),U.walkTo(1,3,-25,6),U.st());r
//@@ shot=w22a.png
ZC.tick(2);
//@@
const Zs=ZC.W.waters;const F=ZC.W.flags;ZC.W.enemies.forEach(e=>{e.alive=false;ZC.W.group.remove(e.g);});ZC.W.enemies.length=0;
// Игрок 2: Йоша, отлив (уже низкая), к лазу
U.tap('KeyK');ZC.tick(5);const r2=[U.walkTo(1,5.5,-35,6),U.walkTo(1,5.5,-40,4),U.walkTo(1,8,-45.5,5),'garden='+F.garden];
// Игрок 1: прилив через просьбу
r2.push(U.walkTo(0,-4,-30,5));U.tap('KeyR');ZC.tick(150);r2.push('Z2='+Zs[1].level.toFixed(2));
r2.push(U.walkTo(0,-6.2,-35.4,6),U.st());U.tap('KeyF');ZC.tick(10);r2.push('mast='+F.mast,'links='+ZC.W.links);ZC.tick(30);r2
//@@ shot=w22b.png
ZC.tick(2);
