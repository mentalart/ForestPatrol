//@@ shot=m3a.png
ZC.G.startIdx=ZC.LV('3-4');ZC.menu('menu');
//@@
ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(5);const G=ZC.G;['3-1','3-2'].forEach(id=>{G.done[id]=true;G.got[id]=4;});ZC.loadLevel(ZC.LV('luko'));ZC.tick(60);U.walkTo(0,-2,-18,6);ZC.press('Space');ZC.tick(10);[G.ui]
//@@ shot=m3b.png
ZC.tick(2);
