//@@
ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(10);const F=ZC.W.flags;F.mast=true;F.garden=true;ZC.tick(80);
ZC.W.enemies.forEach(e=>{e.alive=false;ZC.W.group.remove(e.g);});ZC.W.enemies.length=0;
const H=ZC.HERO;H.proshka.pos.set(-1,0,-56);H.pelageya.pos.set(1,0,-56);ZC.tick(5);const Z3=ZC.W.waters[2];
U.tap('KeyR');ZC.tick(20);U.tap('Semicolon');ZC.tick(150);const r=['Z3='+Z3.level.toFixed(2)];
r.push(U.walkTo(0,-0.6,-61,4),U.walkTo(1,0.6,-61,4));
let maxy=0;for(let i=0;i<660;i++){ZC.tick(1);maxy=Math.max(maxy,H.proshka.pos.y);if(H.proshka.pos.y>7.5&&H.proshka.grounded)break;}
r.push('maxy='+maxy.toFixed(2),U.st(),'links='+ZC.W.links);r
//@@ shot=w22c.png
ZC.tick(2);
//@@
const r2=[U.walkTo(0,0,-64.6,3),'links='+ZC.W.links,U.walkTo(0,2.5,-69.5,4),U.walkTo(0,2.5,-74,4),U.st()];r2
