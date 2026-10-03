//@@
ZC.startFrom(ZC.LV('2-3'));ZC.G.manual=true;ZC.tick(40);ZC.skip();ZC.tick(10);
const r=[];U.tap('KeyQ');ZC.tick(3);r.push(U.walkTo(0,-10.5,-4.5,6));U.tap('KeyR');ZC.tick(20);U.tap('KeyQ');ZC.tick(3);r.push(U.walkTo(0,-3.5,-4.5,6));U.tap('KeyR');ZC.tick(20);
r.push(U.walkTo(1,-1,-12.5,8),U.walkTo(1,-10.5,-12.5,8),U.walkTo(1,-10.5,-11.5,3));U.tap('Semicolon');ZC.tick(20);U.tap('KeyK');ZC.tick(3);r.push(U.walkTo(1,-1,-12.5,8),U.walkTo(1,-3.5,-11.5,8));U.tap('Semicolon');ZC.tick(30);
r.push(U.obj());r
//@@ shot=w23a.png
ZC.tick(2);
//@@
const r2=[U.walkTo(1,-4.3,-8,4)];U.tap('KeyL');ZC.tick(40);r2.push(U.obj());r2.push(U.walkTo(1,-3.5,-11.5,4));U.tap('Semicolon');ZC.tick(200);
r2.push('lvl='+ZC.W.waters[0].level.toFixed(2),U.obj());ZC.tick(120);r2.push(U.walkTo(0,-6.5,-3.2,4),U.until(()=>ZC.W.links>0,3),U.obj());r2
//@@ shot=w23b.png
ZC.tick(2);
