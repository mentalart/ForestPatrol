//@@
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(5);const G=ZC.G;['3-1','3-2','3-3','3-4','3-5','3-B'].forEach(id=>{G.done[id]=true;G.got[id]=4;});G.forgedW[3]=20;G.forgedLinks=59;
ZC.loadLevel(ZC.LV('luko'));ZC.tick(30);const r=[ZC.W.flags.mode,!!G.cine];ZC.skip();ZC.tick(5);r.push(G.ui);
// P2 начало, P1 помощник, конец вместе
U.tap('ArrowDown');U.tap('KeyM');ZC.tick(3);U.tap('KeyS');U.tap('Space');ZC.tick(3);U.tap('Space');U.tap('KeyM');ZC.tick(5);r.push(G.ui,!!G.cine,JSON.stringify(G.flags.skaz3));r
//@@ shot=hw3d.png
ZC.tick(400);
//@@
ZC.skip();ZC.tick(30);const r2=[ZC.W.flags.stage,!!ZC.G.cine];ZC.tick(900);r2
//@@ shot=hw3e.png
ZC.tick(1);
//@@
ZC.skip();ZC.tick(30);const r3=[ZC.W.flags.stage,!!ZC.G.cine];ZC.tick(60*20);r3
//@@ shot=hw3f.png
ZC.tick(60*14);
//@@ shot=hw3g.png
ZC.tick(60*8);
//@@
ZC.skip();ZC.tick(240);[ZC.G.flags.w3done,ZC.G.state,document.getElementById('card').innerText.slice(0,300)]
//@@ shot=hw3h.png
ZC.tick(1);
//@@
// обратно на Лукоморье: голый дуб
ZC.G.state='play';document.getElementById('menu').classList.add('hide');ZC.loadLevel(ZC.LV('luko'));ZC.tick(90);[ZC.W.flags.mode,ZC.W.zven.vis,ZC.W.linkLabel()]
//@@ shot=hw3i.png
ZC.tick(1);
