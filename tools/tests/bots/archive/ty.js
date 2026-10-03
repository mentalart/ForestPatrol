U.go();ZC.loadLevel(5);ZC.tick(60*3);'cine='+!!ZC.G.cine+' '+U.st()
//@@ shot=n1.png
ZC.skip();ZC.tick(10);const H=ZC.HERO;'gaze='+ZC.W.gaze+' hats='+[H.proshka.hatOn,H.potap.hatOn,H.pelageya.hatOn,H.yosha.hatOn].join(',')+' | '+U.obj()
//@@
U.tap('Digit1');U.tap('Digit0');const r=[U.walkTo(0,-2,-12,4),U.walkTo(1,2,-12,4)];ZC.tick(20);r.join(',')+' '+U.st()+' falls='+ZC.G.stats.falls
//@@ shot=n2.png
const r=[U.walkTo(0,-2,-24.5,6)];ZC.tick(60*4);r+' cine='+!!ZC.G.cine+' stage='+ZC.W.flags.stage
//@@ shot=n3.png
ZC.skip();ZC.tick(20);const H=ZC.HERO;[U.st(),'ring='+H.pelageya.inRing,'act1='+ZC.players[1].act,'nose='+H.proshka.hatOn,U.obj()].join(' | ')
//@@

const r=[U.walkTo(1,9.9,-10,6),U.walkTo(1,9.9,-22,6),U.walkTo(1,1.4,-24,6),U.walkTo(1,1.4,-33,6),U.walkTo(1,3.6,-33,3)];ZC.tick(5);const H=ZC.HERO;H.yosha.face=Math.PI/2;ZC.tick(5);r.join(',')+' '+U.st()+' watered='+!!ZC.W.flags.watered

//@@ wait=300 shot=y1.png
'x'
