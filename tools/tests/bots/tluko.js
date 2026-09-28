//@@
ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(5);ZC.G.hub=true;ZC.loadLevel(ZC.LV('luko'));ZC.tick(30);ZC.skip();ZC.tick(60);ZC.skip();ZC.tick(30);[ZC.W.name,ZC.W.flags.mode,ZC.W.flags.stage,U.st()].join(' | ')
//@@
const r=[U.walkTo(0,-1.2,-17.6,6),U.walkTo(1,1.2,-17.6,6)];ZC.tick(40);r.join(' ')
//@@ shot=wlk1.png
ZC.tick(1);
//@@
U.tap('Space');ZC.tick(10);'ui='+ZC.G.ui
//@@ shot=wlk2.png
ZC.tick(1);
//@@
U.tap('Space');ZC.tick(66);'ui='+ZC.G.ui+' cine='+!!ZC.G.cine+' trans='+!!ZC.G.trans
//@@ shot=wlk3.png
ZC.tick(1);
//@@
ZC.tick(60+40);'trans='+(ZC.G.trans&&ZC.G.trans.t.toFixed(2))+' lvl='+ZC.W.levelId
//@@ shot=wlk4.png
ZC.tick(1);
//@@
ZC.tick(36);'trans='+(ZC.G.trans&&ZC.G.trans.t.toFixed(2))+' lvl='+ZC.W.levelId
//@@ shot=wlk5.png
ZC.tick(1);
//@@
ZC.tick(26);'trans='+(ZC.G.trans&&ZC.G.trans.t.toFixed(2))+' lvl='+ZC.W.levelId
//@@ shot=wlk6.png
ZC.tick(1);
//@@
ZC.tick(60);'trans='+!!ZC.G.trans+' lvl='+ZC.W.levelId+' rt='+document.getElementById('rtrans').style.display
