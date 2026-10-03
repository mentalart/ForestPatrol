//@@
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(10);const F=ZC.W.flags;F.stage='gusli';ZC.W.abil.gusli=true;
const r=[U.walkTo(0,-3.2,-17.5,5)];U.tap('KeyR');ZC.tick(150);r.push(U.walkTo(0,-1.2,-18,4),'links='+ZC.W.links,U.st());r
//@@
// библиотека
const r2=[U.walkTo(0,0,-32,6),U.until(()=>ZC.G.cine,2)];ZC.tick(300);r2
//@@ shot=w21d.png
ZC.tick(2);
//@@
ZC.tick(300);
//@@ shot=w21e.png
ZC.tick(2);
//@@
ZC.skip();ZC.tick(5);const r3=[ZC.W.flags.book];
// P1: причал
r3.push(U.walkTo(0,-3,-46,8));U.tap('KeyR');ZC.tick(150);r3.push('zA='+ZC.W.waters.find(z=>z.minx<-10).level.toFixed(2));
r3.push(U.walkTo(0,-3.2,-49,5),U.st());r3
//@@ shot=w21f.png
ZC.tick(2);
//@@
const r4=[U.walkTo(0,-4.2,-54,4),U.st(),U.walkTo(0,-4.2,-58,4),U.st()];r4
//@@ shot=w21g.png
ZC.tick(2);
