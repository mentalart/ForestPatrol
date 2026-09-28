//@@
ZC.startFrom(ZC.LV('2-3'));ZC.G.manual=true;ZC.tick(40);ZC.skip();ZC.tick(10);const F=ZC.W.flags;F.task=3;const H=ZC.HERO;
const r=[];const go=(pi,x)=>{r.push(U.walkTo(pi,x,-1.8,8),U.walkTo(pi,x,-4.1,3));};
U.tap('KeyQ');ZC.tick(3);go(0,3.9);
// ошибка порядка: Йоша на 3-е кольцо
U.tap('KeyK');ZC.tick(3);go(1,7.7);U.tap('Semicolon');ZC.tick(10);r.push('wrongSet='+ZC.W.flags.task);
U.tap('KeyR');ZC.tick(20);go(1,5.8);U.tap('Semicolon');ZC.tick(20);
U.tap('KeyQ');ZC.tick(3);go(0,7.7);U.tap('KeyR');ZC.tick(20);
U.tap('KeyK');ZC.tick(3);go(1,9.6);U.tap('Semicolon');ZC.tick(40);
r.push(U.obj());
r.push(U.st());U.tap('Semicolon');ZC.tick(200);r.push('z3='+ZC.W.waters[1].level.toFixed(2),'cine='+!!ZC.G.cine,'task='+F.task);r
//@@ shot=w23f.png
ZC.tick(2);
//@@
ZC.tick(120);
//@@ shot=w23g.png
ZC.tick(2);
//@@
ZC.skip();ZC.tick(80);[ZC.W.levelId,ZC.G.done['2-3'],ZC.G.got['2-3']]
