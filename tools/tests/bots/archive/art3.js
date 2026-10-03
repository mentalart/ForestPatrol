//@@
ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(10);ZC.skip();ZC.tick(5);U.walkTo(0,-1,-2,5);ZC.skip();ZC.tick(5);const H=ZC.HERO;
H.proshka.pos.set(-1,0,-11);H.pelageya.pos.set(1,0,-24);H.potap.pos.set(-3,0,-4);H.yosha.pos.set(2,0,-26);ZC.tick(3);U.tap('KeyR');ZC.tick(60);
//@@ shot=a31.png
ZC.tick(1);
//@@
ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(10);ZC.skip();ZC.tick(5);U.walkTo(0,-1,-2,5);ZC.skip();ZC.tick(5);const W=ZC.W,H=ZC.HERO;W.flags.gateOpen=true;
H.proshka.pos.set(-4,0,-131);H.pelageya.pos.set(3,0,-131);H.potap.pos.set(-6,0,-127);H.yosha.pos.set(5,0,-127);ZC.tick(3);U.tap('KeyR');ZC.tick(3);H.potap.lit=true;ZC.tick(200);
//@@ shot=a31b.png
ZC.tick(1);
//@@
ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const H=ZC.HERO;H.proshka.pos.set(5,0.6,-5);H.pelageya.pos.set(-5,0.6,-4);ZC.tick(10);U.tap('KeyR');U.tap('Semicolon');ZC.tick(200);
//@@ shot=a32.png
ZC.tick(1);
//@@
ZC.startFrom(ZC.LV('3-4'));ZC.G.manual=true;ZC.tick(30);U.tap('KeyK');ZC.tick(3);U.path(1,[[2,-1],[0.9,-3],[0.9,-7.9]],3);U.tap('Semicolon');ZC.tick(3);ZC.skip();ZC.tick(5);U.tap('KeyK');ZC.tick(3);
const S=ZC.W.shipS;while(S.z>-72){ZC.tick(1);}U.tap('KeyQ');ZC.tick(2);U.walkTo(0,S.x-1.6,S.z-2.5,2);ZC.tick(60);
//@@ shot=a34.png
ZC.tick(1);
//@@
ZC.startFrom(ZC.LV('3-5'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(5);const H=ZC.HERO;H.proshka.pos.set(0,0,-24);H.pelageya.pos.set(2,0,-23);ZC.tick(60);
//@@ shot=a35.png
ZC.tick(1);
//@@
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');Object.values(ZC.HERO).forEach(h=>{h.iT=99;});
sol.embers=0;sol.state='broken';sol.t=0;sol.bdur=9;sol.perch=false;sol.pos.set(0,0,-11.4);ZC.tick(2);const h=U.act(0);U.walkTo(0,0.3,-9.2,3);h.face=Math.PI;U.tap('KeyF');ZC.tick(200);U.tap('Semicolon');ZC.tick(120);
//@@ shot=a3b.png
ZC.tick(1);
