//@@
ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(10);ZC.skip();ZC.tick(5);U.walkTo(0,-1,-2,5);ZC.skip();ZC.tick(5);
const H=ZC.HERO;H.proshka.pos.set(0,0,-44);H.proshka.vel.set(0,0,0);ZC.tick(3);
U.seg=function(zb,toggle){const a=U.walkTo(0,0,zb+0.3,4);ZC.press('Space');ZC.tick(8);if(toggle)ZC.press('KeyR');ZC.tick(1);return a+' y='+U.act(0).pos.y.toFixed(2);};
U.tap('KeyR');ZC.tick(3);const r=['lit='+U.act(0).lit];
const B=[-46-3*1.538,-46-6*1.538,-46-9*1.538,-46-12*1.538];
for(const zb of B)r.push(U.seg(zb,true));r.push(U.walkTo(0,0,-68,3),U.st(),'links='+ZC.W.links,U.obj());r
//@@ shot=w31e.png
ZC.tick(1);
//@@
// яблоня: постоять с горящим пером
const r2=['lit='+U.act(0).lit];if(!U.act(0).lit)U.tap('KeyR');r2.push(U.walkTo(0,-2.2,-72.6,4));ZC.tick(200);r2.push('rev='+ZC.W.trees.find(t=>Math.abs(t.pos.z+72.6)<0.1).revived);
r2.push(U.walkTo(0,-6.2,-73,3),U.walkTo(0,-11.5,-72.5,4),'links='+ZC.W.links+' nuts='+ZC.W.nuts,U.st());r2
//@@ shot=w31f.png
ZC.tick(1);
