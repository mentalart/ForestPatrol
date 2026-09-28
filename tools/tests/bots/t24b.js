//@@
ZC.startFrom(ZC.LV('2-4'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);const F=ZC.W.flags;const H=ZC.HERO;
const r=[U.st(),'go='+F.go,'split='+ZC.G.splitTarget];r.push(U.fight(0,'parry',60));r.push(U.obj());r
//@@ shot=w24a.png
ZC.tick(2);
//@@
const F=ZC.W.flags;const H=ZC.HERO;const r=[];F.bell1=true;F.barrel=true;ZC.W.flags.bell1=true;
// Йоша: сразу к зубу
H.yosha.pos.set(9,0,-24);ZC.tick(5);r.push(U.walkTo(1,6.4,-28.4,4));U.tap('KeyL');ZC.tick(60);r.push('tooth='+F.tooth+' wl='+F.wl.toFixed(2));
r
//@@
const F=ZC.W.flags;const H=ZC.HERO;const r=[];
// P1 в трюм: люк открыт
H.proshka.active&&0;r.push(U.walkTo(0,-15,-15,6),U.walkTo(0,-13.2,-18.4,4),U.until(()=>ZC.W.chests[0].open,3),'links='+ZC.W.links);
// Йоша: занавесь 1 открыта (bell1 флаг, но занавесь открывается через openCurtain) — проверим, что колокол уже открыл
r.push(U.walkTo(1,9,-38,5),U.st());r
