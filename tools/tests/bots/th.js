'state='+ZC.G.state
//@@ wait=1500
ZC.press('ArrowRight');
//@@ wait=1500
ZC.press('KeyD');
//@@ wait=1500
ZC.press('ArrowRight');
//@@ wait=2500
ZC.press('Enter');
//@@ shot=h1.png
ZC.G.manual=true;'state='+ZC.G.state+' lvl='+ZC.W.levelId+' done='+JSON.stringify(ZC.G.done)+' got='+JSON.stringify(ZC.G.got)+' hub='+ZC.G.hub+' startIdx='+ZC.G.startIdx
//@@
// уровень пройден -> Лукоморье (хаб)
ZC.W.links=3;ZC.W.nuts=4;ZC.tick(2);const W=ZC.W;
// вызвать finishLevel через флаг выхода 1-2: переместить героя за финиш
W.flags.sagged=false;const h=U.act(0);ZC.W.enemies.forEach(e=>{e.alive=false;});ZC.tick(5);'arena?'
