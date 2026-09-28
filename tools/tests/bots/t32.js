//@@
ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const H=ZC.HERO,W=ZC.W;const r=[W.name];
H.proshka.pos.set(5,0.6,-5);H.proshka.vel.set(0,0,0);ZC.tick(10);r.push('on='+(H.proshka.groundRef===W.clouds[0]));U.tap('KeyR');ZC.tick(420);
r.push('c1y='+W.clouds[0].y.toFixed(2),'links='+W.links,U.st());r
//@@ shot=w32a.png
ZC.tick(1);
//@@
const H=ZC.HERO;const r2=[];ZC.tick(600);r2.push('melt? c1y='+ZC.W.clouds[0].y.toFixed(2)+' gone='+ZC.W.clouds[0].gone.toFixed(1),U.st());
// Йоша поливает облако к лугу
U.tap('KeyK');ZC.tick(3);H.yosha.pos.set(0,0,-9.9);H.yosha.vel.set(0,0,0);ZC.tick(5);U.tap('KeyL');ZC.tick(40);const C2=ZC.W.clouds[2];r2.push('c2puffy='+C2.puffy);
// Потап на облако, свет
U.tap('KeyQ');ZC.tick(3);H.potap.pos.set(0,0.6,-13);H.potap.vel.set(0,0,0);ZC.tick(10);r2.push('potapOn='+(H.potap.groundRef===C2));U.tap('KeyR');ZC.tick(400);r2.push('c2y='+C2.y.toFixed(2),U.st());
r2.push(U.walkTo(0,0,-19,4),U.st());r2
//@@ shot=w32b.png
ZC.tick(1);
