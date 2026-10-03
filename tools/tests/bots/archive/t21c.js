//@@
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(10);const F=ZC.W.flags;F.stage='gusli';F.book=true;ZC.W.abil.gusli=true;
ZC.W.enemies.forEach(e=>{e.alive=false;ZC.W.group.remove(e.g);});ZC.W.enemies.length=0;
const H=ZC.HERO;H.proshka.pos.set(-3,0,-61);H.proshka.vel.set(0,0,0);ZC.tick(5);
const zB=ZC.W.waters.find(z=>z.minx<-5&&z.maxx<-1&&z.minz<-70&&z.floor===0);const lift=ZC.W.waters.find(z=>z.floor===-3&&z.minx<0);
const r=[U.walkTo(0,-3.2,-63,3)];U.tap('KeyR');ZC.tick(140);r.push('zB='+zB.level.toFixed(2),U.st());
r.push(U.walkTo(0,-7.8,-66,5),U.st());r
//@@ shot=w21h.png
ZC.tick(2);
//@@
const zB=ZC.W.waters.find(z=>z.minx<-5&&z.maxx<-1&&z.minz<-70&&z.floor===0);const lift=ZC.W.waters.find(z=>z.floor===-3&&z.minx<0);
U.tap('KeyR');ZC.tick(150);const r2=['lift='+lift.level.toFixed(2),U.st()];r2.push(U.walkTo(0,-8.0,-67.0,4),'links='+ZC.W.links,U.st());r2
//@@ shot=w21i.png
ZC.tick(2);
//@@
const zB=ZC.W.waters.find(z=>z.minx<-5&&z.maxx<-1&&z.minz<-70&&z.floor===0);const lift=ZC.W.waters.find(z=>z.floor===-3&&z.minx<0);
ZC.tick(60);U.tap('KeyR');ZC.tick(150);const r3=['lift='+lift.level.toFixed(2),U.st()];r3.push(U.walkTo(0,-4,-66,4),U.st());U.tap('KeyR');ZC.tick(150);r3.push(U.st(),U.walkTo(0,-3,-80,6),U.walkTo(0,0,-95,6),'links='+ZC.W.links,U.obj());r3
