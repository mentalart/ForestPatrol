//@@
ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(5);const G=ZC.G;G.flags.w3intro=false;G.flags.map3=false;ZC.loadLevel(ZC.LV('luko'));ZC.tick(60);
const r=[ZC.W.levelId,ZC.W.flags.mode];r.push(U.walkTo(0,-2,-18-(ZC.W.shoreDZ||0),6));ZC.press('Space');ZC.tick(5);r.push(!!G.cine,ZC.W.flags.stage);r
//@@ shot=hw3a.png
ZC.tick(500);
//@@
ZC.skip();ZC.tick(30);const r2=[ZC.W.flags.stage,!!ZC.G.cine];ZC.tick(200);
//@@ shot=hw3b.png
ZC.tick(1);
//@@
ZC.skip();ZC.tick(150);[ZC.W.levelId,ZC.G.flags.w3intro,ZC.G.flags.map3,!!ZC.G.cine]
//@@
// кузня мира 3: пройдены 3-1…3-5 со звеньями
const G=ZC.G;['3-1','3-2','3-3','3-4','3-5'].forEach(id=>{G.done[id]=true;G.got[id]=4;});ZC.loadLevel(ZC.LV('luko'));ZC.tick(60);const r3=['pending='+(G.got['3-1']),ZC.W.linkLabel()];
ZC.HERO.proshka.pos.set(7.9,0,1.6);ZC.tick(3);U.tap('KeyF');ZC.tick(5);r3.push('ui='+G.ui);
for(let i=0;i<60*6;i++){const FGt=null;ZC.tick(1);}r3.push('forged3='+G.forgedW[3],!!G.cine);r3
//@@ shot=hw3c.png
ZC.tick(200);
//@@
ZC.skip();ZC.tick(10);[ZC.G.flags.forged3,ZC.W.linkLabel()]
