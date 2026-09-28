//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(5);const G=ZC.G;G.flags.w4intro=false;G.flags.map4=false;ZC.loadLevel(ZC.LV('luko'));ZC.tick(90);
const r=[ZC.W.levelId,ZC.W.flags.mode,U.st()];r.push(U.walkTo(0,-2,-17.8,6));ZC.tick(2);U.tap('Space');ZC.tick(30);r.push('stage='+ZC.W.flags.stage,!!ZC.G.cine);r
//@@ shot=hw4a.png
ZC.tick(300);
//@@ shot=hw4b.png
ZC.tick(400);
//@@
ZC.skip();ZC.tick(30);const r2=['stage='+ZC.W.flags.stage,!!ZC.G.cine];ZC.tick(300);r2.push(ZC.W.flags.stage);ZC.skip();ZC.tick(200);r2.push(ZC.W.levelId,'w4intro='+ZC.G.flags.w4intro);r2
//@@
// сращиваем виток после 4-1
const G=ZC.G;G.done['4-1']=true;G.got['4-1']=4;G.flags.w4c=0;ZC.loadLevel(ZC.LV('luko'));ZC.tick(90);const W=ZC.W,H=ZC.HERO;const r3=[W.flags.mode,'scat='+(W.scat||[]).length];
r3.push(U.walkTo(0,7.9,1.5,8));H.proshka.face=Math.atan2(0.7,-0.9);ZC.tick(2);U.tap('KeyF');ZC.tick(5);r3.push('ui='+G.ui);
let hits=0,last=-1;for(let i=0;i<60*23&&G.ui==='forge';i++){ZC.tick(1);}
r3.push('ui='+G.ui,!!ZC.G.cine);ZC.tick(400);r3.push('w4c='+G.flags.w4c,'scat='+(W.scat||[]).length);r3
//@@ shot=hw4c.png
ZC.tick(200);
//@@
// ковка звеньев мира 4 и узда
const G=ZC.G;['4-1','4-2','4-3','4-4','4-5'].forEach((id,i)=>{G.done[id]=true;G.got[id]=[4,4,3,4,5][i];});G.flags.w4c=3;G.forgedW[4]=0;ZC.loadLevel(ZC.LV('luko'));ZC.tick(90);const W=ZC.W,H=ZC.HERO;const r4=[W.flags.mode,'leaves'];
r4.push(U.walkTo(0,7.9,1.5,8));H.proshka.face=Math.atan2(0.7,-0.9);ZC.tick(2);U.tap('KeyF');ZC.tick(5);r4.push('ui='+G.ui);
for(let i=0;i<60*8&&G.ui==='forge';i++){ZC.tick(1);}r4.push('fw4='+G.forgedW[4]);ZC.tick(200);r4.push(!!ZC.G.cine);ZC.skip();ZC.tick(60);r4.push('forged4='+G.flags.forged4);r4
//@@
// праздник мира 4
const G=ZC.G;G.done['4-B']=true;G.got['4-B']=0;ZC.loadLevel(ZC.LV('luko'));ZC.tick(90);const W=ZC.W;const r5=[W.flags.mode,W.flags.stage,!!ZC.G.cine];ZC.skip();ZC.tick(30);r5.push(W.flags.stage,!!ZC.G.cine);ZC.tick(200);
r5.push('stage2='+W.flags.stage);r5
//@@ shot=hw4d.png
ZC.tick(300);
//@@
const G=ZC.G,W=ZC.W;ZC.skip();ZC.tick(30);const r6=['ui='+G.ui];
//@@ shot=hw4e.png
ZC.tick(60);
//@@
const G=ZC.G,W=ZC.W;const r7=['ui='+G.ui];for(let i=0;i<20&&G.ui==='lubok';i++){U.tap('Space');ZC.tick(10);}r7.push('ui='+G.ui,!!ZC.G.cine);ZC.tick(200);ZC.skip();ZC.tick(30);r7.push('ui='+G.ui);
U.tap('Space');ZC.tick(10);U.tap('KeyM');ZC.tick(10);ZC.press('Space');ZC.press('KeyM');ZC.tick(10);r7.push('ui='+G.ui,!!ZC.G.cine,JSON.stringify(G.flags.skaz4));ZC.tick(300);ZC.skip();ZC.tick(20);r7.push('ui='+G.ui);r7
//@@ shot=hw4f.png
ZC.tick(300);
//@@
const G=ZC.G;ZC.tick(400);const r8=['ui='+G.ui,!!ZC.G.cine];ZC.skip();ZC.tick(250);r8.push('w4done='+G.flags.w4done,G.flags.coils,document.getElementById('menu').className,document.getElementById('menu').innerText.slice(0,300));r8
//@@ shot=hw4g.png
ZC.tick(5);
//@@
// после мира 4: хаб с Горынычем у моря, дуб зелёный
ZC.loadLevel(ZC.LV('luko'));ZC.tick(120);[ZC.W.flags.mode,ZC.G.flags.w4done,(ZC.W.scat||[]).length]
//@@ shot=hw4h.png
ZC.tick(5);
