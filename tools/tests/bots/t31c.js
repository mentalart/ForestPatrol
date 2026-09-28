//@@
ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(10);ZC.skip();ZC.tick(5);U.walkTo(0,-1,-2,5);ZC.skip();ZC.tick(5);
const H=ZC.HERO;H.proshka.pos.set(4,0,-76);H.pelageya.pos.set(-4,0,-76);H.potap.pos.set(2,0,-70);H.yosha.pos.set(-2,0,-70);[H.proshka,H.pelageya,H.potap,H.yosha].forEach(h=>h.vel.set(0,0,0));ZC.tick(3);
U.tap('Semicolon');ZC.tick(3);const r=['p2lit='+U.act(1).lit,'p1lit='+U.act(0).lit];
r.push(U.path(1,[[-5,-84],[5,-96],[5,-104],[6,-109]]),U.st());
r.push(U.path(0,[[5,-84],[-5,-96],[-5,-104],[-6,-109]]));ZC.tick(20);r.push(U.st(),'gate='+ZC.W.flags.gateOpen,U.obj());r
//@@ shot=w31g.png
ZC.tick(1);
//@@
const r2=[U.walkTo(0,0,-110.5,3),'links='+ZC.W.links,U.path(0,[[0,-124.8],[-1,-126.5]]),U.path(1,[[6,-112],[0.2,-113],[0.2,-124.8],[1,-126.5]]),'fight='+ZC.W.flags.fight];
if(!U.act(0).lit)U.tap('KeyR');ZC.tick(2);r2.push('lit '+U.act(0).lit+U.act(1).lit);r2.push(U.brawl(60));r2.push(U.st());r2
//@@ shot=w31h.png
ZC.tick(1);
//@@
const r3=['cleared='+ZC.W.flags.cleared];r3.push(U.walkTo(0,-4.2,-148.5,6),U.walkTo(1,4.2,-148.5,6));ZC.tick(220);r3.push('garden='+ZC.W.flags.garden);
r3.push(U.path(0,[[0,-151],[0,-162.5],[-1,-166.5]]),U.path(1,[[0.2,-151],[0.2,-162.5],[1,-166.5]]),!!ZC.G.cine,ZC.W.flags.stage,U.st());r3
//@@ shot=w31i.png
ZC.tick(240);
//@@
ZC.skip();ZC.tick(200);[ZC.W.levelId,ZC.G.done['3-1'],ZC.G.got['3-1']]
