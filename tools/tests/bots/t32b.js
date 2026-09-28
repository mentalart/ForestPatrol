//@@
ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const H=ZC.HERO,W=ZC.W;const C2=W.clouds[2];const r=[];
U.tap('KeyK');ZC.tick(3);H.yosha.pos.set(0,0,-9.9);H.yosha.vel.set(0,0,0);ZC.tick(5);U.tap('KeyL');ZC.tick(40);r.push('c2puffy='+C2.puffy);
U.tap('KeyQ');ZC.tick(3);H.potap.pos.set(0,0,-8);H.potap.vel.set(0,0,0);ZC.tick(3);r.push(U.walkTo(0,0,-11.7,4),'on='+(H.potap.groundRef===C2));U.tap('KeyR');ZC.tick(360);r.push('c2y='+C2.y.toFixed(2),U.walkTo(0,0,-19,4),U.st());
ZC.tick(300);r.push('c2y='+C2.y.toFixed(2));r.push(U.walkTo(1,0,-11.7,4));U.tap('Semicolon');ZC.tick(360);r.push(U.walkTo(1,1.2,-18.5,4),U.st());r
//@@
const H=ZC.HERO,W=ZC.W;const C4=W.clouds[4],C5=W.clouds[5];const r2=[];
if(U.act(1).lit)U.tap('Semicolon');ZC.tick(2);r2.push(U.walkTo(1,-2.2,-31.6,5));U.tap('KeyL');ZC.tick(40);r2.push('c4puffy='+C4.puffy);
if(U.act(0).lit)U.tap('KeyR');r2.push(U.walkTo(0,-2.2,-31.5,5),U.walkTo(0,-2.2,-34,3),'potOn='+(H.potap.groundRef===C4));U.tap('KeyR');ZC.tick(30);r2.push('trap='+ZC.W.flags.trap);
r2.push(U.walkTo(1,2.2,-31.6,3));r2.push(U.walkTo(1,2.2,-34,2));ZC.tick(30);r2.push('trap='+ZC.W.flags.trap,U.st());ZC.tick(200);r2.push(U.st(),'low='+ZC.W.flags.yoshaLow);r2
//@@ shot=w32c.png
ZC.tick(1);
//@@
const r3=[U.path(1,[[10.6,-31.5],[10.6,-55],[13.2,-57],[13.2,-40],[8,-40]],4),U.st(),'low='+ZC.W.flags.yoshaLow];ZC.tick(60);r3
//@@
// Потап на C4 поднялся? переход на верхнее пастбище
const H=ZC.HERO;const r4=['c4y='+ZC.W.clouds[4].y.toFixed(2),U.st()];r4
