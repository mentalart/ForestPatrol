U.go();ZC.startFrom(ZC.LV('1-2'));ZC.G.manual=true;ZC.tick(5);ZC.W.links=3;ZC.W.nuts=4;ZC.finishLevel();ZC.tick(90);
'lvl='+ZC.W.levelId+' mode='+ZC.W.flags.mode+' got='+JSON.stringify(ZC.G.got)+' nuts='+JSON.stringify(ZC.G.nutsGot)+' '+U.st()+' cine='+!!ZC.G.cine+' | '+U.obj()
//@@ shot=h2.png
ZC.tick(60);U.walkTo(0,-2.4,-17.8,3);U.tap('Space');ZC.tick(5);'ui='+ZC.G.ui+' map='+document.getElementById('mapui').innerText.replace(/\n/g,' / ')
//@@ shot=h3.png
U.tap('KeyS');U.tap('KeyS');const t1=document.querySelector('#mapui .sel').innerText;U.tap('KeyW');const t2=document.querySelector('#mapui .sel').innerText;U.tap('Space');ZC.tick(120);
t1+' -> '+t2+' | lvl='+ZC.W.levelId+' ui='+ZC.G.ui
