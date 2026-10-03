U.go();ZC.startFrom(ZC.LV('1-2'));ZC.G.manual=true;ZC.tick(5);ZC.W.links=3;ZC.finishLevel();ZC.tick(150);U.walkTo(0,-2.4,-17.8,3);U.tap('Space');ZC.tick(5);U.tap('Space');ZC.tick(150);
'lvl='+ZC.W.levelId+' ui='+ZC.G.ui+' scale='+ZC.HERO.proshka.g.scale.x
//@@
// все уровни мира пройдены: кузня
ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(5);ZC.W.links=4;ZC.finishLevel();ZC.tick(150);const n=ZC.worldLinks();
U.walkTo(0,7.9,1.6,5);const pr=U.act(0);ZC.tick(2);U.tap('KeyF');ZC.tick(10);const c=!!ZC.G.cine;ZC.tick(60*16);
'links='+n+' forgeCine='+c+' forged='+!!ZC.G.flags.forged+' '+U.st()
//@@ shot=h4.png
U.walkTo(0,-2.4,-17.8,6);U.tap('Space');ZC.tick(5);const sel=document.querySelector('#mapui .sel').innerText.replace(/\n/g,' ');U.tap('Space');ZC.tick(150);'sel='+sel+' lvl='+ZC.W.levelId
