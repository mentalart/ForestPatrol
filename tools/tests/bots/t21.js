//@@
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(10);
const r=[U.walkTo(0,-3,-11,6),U.until(()=>ZC.G.cine,2)];ZC.skip();ZC.tick(5);r.push(ZC.W.flags.stage);
r.push(U.walkTo(1,-4.2,-13.4,8));ZC.HERO.yosha;r
//@@
// Йоша: переключиться и полить
U.tap('KeyK');ZC.tick(5);const r2=[U.walkTo(1,-4.3,-13.6,6)];U.tap('KeyL');ZC.tick(40);r2.push(ZC.W.flags.stage,!!ZC.G.cine);r2.push(U.obj());r2
//@@ shot=w21b.png
ZC.tick(200);
//@@
ZC.skip();ZC.tick(5);const r3=[ZC.W.abil.gusli,ZC.W.flags.stage];
// фонтан: P1 к чаше, прилив
r3.push(U.walkTo(0,-3.2,-17.5,5));U.tap('KeyR');ZC.tick(150);r3.push('lvl='+ZC.W.waters[0].level.toFixed(2));
// на доску
r3.push(U.walkTo(0,-1.4,-18,4));r3.push(U.st(),'links='+ZC.W.links);r3
//@@ shot=w21c.png
ZC.tick(2);
