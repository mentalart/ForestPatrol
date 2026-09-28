//@@
// праздник 2: Сказ 2
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const G=ZC.G;['2-1','2-2','2-3','2-4','2-5'].forEach(id=>{G.done[id]=true;G.got[id]=3;G.nutsGot[id]=3;});G.done['2-B']=true;
ZC.goLevel('luko');ZC.tick(120);const r=[ZC.W.levelId,ZC.W.flags.mode,!!G.cine];ZC.skip();ZC.tick(10);r.push('ui='+G.ui);
U.tap('KeyW');ZC.tick(2);U.tap('Space');ZC.tick(5);U.tap('ArrowDown');ZC.tick(2);U.tap('KeyM');ZC.tick(5);U.tap('Space');U.tap('KeyM');ZC.tick(5);r.push('ui='+G.ui,'cine='+!!G.cine,JSON.stringify(G.flags.skaz2));r
//@@ shot=hw2a.png
ZC.tick(600);
//@@ shot=hw2b.png
ZC.tick(300);
//@@
ZC.skip();ZC.tick(200);[ZC.G.state,ZC.G.flags.w2done,ZC.G.flags.coils]
//@@ shot=hw2c.png
ZC.tick(2);
