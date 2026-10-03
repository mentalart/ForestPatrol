//@@
ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const H=ZC.HERO,W=ZC.W;const r=[];
H.proshka.pos.set(-1,10,-50);H.pelageya.pos.set(1,10,-50);H.potap.pos.set(-3,10,-44);H.yosha.pos.set(3,10,-44);[H.proshka,H.pelageya,H.potap,H.yosha].forEach(h=>h.vel.set(0,0,0));ZC.tick(5);
U.tap('KeyR');r.push(U.walkTo(0,0,-54.2,4));ZC.tick(120);const F=W.flocks.find(f=>f.name==='bridge');r.push('on='+F.on,'at='+F.list.filter(s=>s.at).length);
r.push(U.walkTo(1,0.1,-67.5,6),U.st());r.push(U.walkTo(0,0,-67.5,6),U.st(),'fight='+W.flags.fight);r
//@@ shot=w32d.png
ZC.tick(1);
//@@
if(!U.act(1).lit)U.tap('Semicolon');if(!U.act(0).lit)U.tap('KeyR');const r2=[U.brawl(70),U.st()];r2
//@@ shot=w32e.png
ZC.tick(1);
//@@
const r3=['cleared='+ZC.W.flags.cleared];if(U.act(1).lit)U.tap('Semicolon');r3.push(U.walkTo(0,0.4,-91.5,6),U.walkTo(0,0,-93.8,3));ZC.tick(20);r3.push('c6y='+ZC.W.clouds[6].y.toFixed(2));ZC.tick(330);r3.push('c6y='+ZC.W.clouds[6].y.toFixed(2),U.walkTo(0,0,-98,3),U.st());
r3.push(U.walkTo(1,0,-93.8,6));ZC.tick(20);ZC.tick(10);r3.push(U.st());r3
