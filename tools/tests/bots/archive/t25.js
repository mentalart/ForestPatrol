//@@
ZC.startFrom(ZC.LV('2-5'));ZC.G.manual=true;ZC.tick(30);const F=ZC.W.flags;const H=ZC.HERO;
const r=[U.walkTo(1,0.5,-15.6,8),'voice='+F.voice];U.tap('KeyL');ZC.tick(40);r.push('voice='+F.voice,'cine='+!!ZC.G.cine);r
//@@ shot=w25a.png
ZC.tick(300);
//@@
ZC.skip();ZC.tick(10);const F=ZC.W.flags;const H=ZC.HERO;const GW=ZC.W.waters[0];
const r=['voice='+F.voice,U.walkTo(0,2,-12,6)];U.tap('KeyR');ZC.tick(260);r.push('GW='+GW.level.toFixed(2),U.st());r.push(U.walkTo(0,4.4,-21.4,6),'cine='+!!ZC.G.cine);r
//@@ shot=w25b.png
ZC.tick(200);
//@@
ZC.skip();ZC.tick(10);const F=ZC.W.flags;const H=ZC.HERO;const GW=ZC.W.waters[0];
U.tap('KeyR');ZC.tick(260);const r=['given='+F.given,'GW='+GW.level.toFixed(2),U.st(),U.walkTo(0,-4,-29,8),U.st()];r
