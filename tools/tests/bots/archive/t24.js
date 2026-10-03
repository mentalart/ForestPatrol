//@@
ZC.startFrom(ZC.LV('2-4'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);const F=ZC.W.flags;const H=ZC.HERO;
const r=[U.st(),'go='+F.go,'split='+ZC.G.splitTarget];r.push(U.brawl(40));r.push(U.obj());r
//@@ shot=w24a.png
ZC.tick(2);
//@@
const F=ZC.W.flags;const H=ZC.HERO;const r=[];
// Прошка: колокол под сводом
r.push(U.walkTo(0,-16,-22,6));U.tap('KeyE');ZC.tick(60);r.push('bell1='+F.bell1);
// Потап: бочка
U.tap('KeyQ');ZC.tick(3);r.push(U.walkTo(0,-10.6,-21.6,6));H.potap.face=Math.atan2(-9.4-H.potap.pos.x,-22.5-H.potap.pos.z);U.tap('KeyF');ZC.tick(120);r.push('barrel='+F.barrel);
// Йоша: жабра и мостки
r.push(U.walkTo(1,9,-1,5),U.walkTo(1,9,-7.8,4));U.tap('KeyL');ZC.tick(60);r.push(U.walkTo(1,9,-15.6,4));U.tap('KeyL');ZC.tick(60);r.push(U.walkTo(1,9,-23,4),U.st());r
//@@ shot=w24b.png
ZC.tick(2);
