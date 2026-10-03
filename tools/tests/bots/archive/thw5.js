//@@
// после 4-Б: вступление мира 5 у моря
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(5);const G=ZC.G;G.flags.w5intro=false;G.flags.map5=false;ZC.goLevel('luko');ZC.tick(120);
const r=['lv='+ZC.W.levelId,'mode='+ZC.W.flags.mode,'stage='+ZC.W.flags.stage,'cine='+!!G.cine];if(G.cine)ZC.skip();ZC.tick(60);r.push(U.obj());
r.push(U.walkTo(0,-2,-17.8,8));U.tap('Space');ZC.tick(20);r.push('cine='+!!G.cine+' stage='+ZC.W.flags.stage);ZC.skip();ZC.tick(20);r.push('stage='+ZC.W.flags.stage,'w5intro='+G.flags.w5intro,'cine='+!!G.cine);ZC.skip();ZC.tick(120);r.push('lv='+ZC.W.levelId);r
//@@ shot=hw5a.png
ZC.tick(5);
//@@
// после 5-3: надпись на песке
const G=ZC.G;G.done['5-1']=G.done['5-2']=G.done['5-3']=true;G.got['5-1']=5;G.got['5-2']=3;G.got['5-3']=4;G.flags.sand=false;ZC.goLevel('luko');ZC.tick(120);const r=['stage='+ZC.W.flags.stage,'cine='+!!G.cine];
ZC.tick(60*8);r.push('shot');r
//@@ shot=hw5b.png
ZC.tick(5);
//@@
const G=ZC.G;const r=[];ZC.skip();ZC.tick(20);r.push('sand='+G.flags.sand,'pending='+(G.got['5-1']+G.got['5-2']+G.got['5-3']-(G.forgedW[5]||0)));
// кузня: Прошка у наковальни
const H=ZC.HERO;if(U.act(0).kind!=='proshka'){U.tap('KeyQ');ZC.tick(5);}r.push(U.walkTo(0,7.9,1.5,8));U.tap('KeyF');ZC.tick(10);r.push('ui='+G.ui);
for(let i=0;i<60*6;i++){ZC.tick(1);}r.push('forgedW5='+G.forgedW[5],'forged5='+G.flags.forged5,'cine='+!!G.cine);ZC.skip();ZC.tick(30);r.push('forged5='+G.flags.forged5,'bells='+(ZC.W.linkLabel&&ZC.W.linkLabel()));r
//@@
// после 5-Б1: «Без имён»
const G=ZC.G;G.done['5-4']=true;G.got['5-4']=3;G.flags.zvenBack=true;G.done['5-B1']=true;G.flags.nameless=true;G.flags.names={};ZC.goLevel('luko');ZC.tick(120);const r=['mode='+ZC.W.flags.mode,'stage='+ZC.W.flags.stage,'cine='+!!G.cine];ZC.tick(60*21);r.push('mid');r
//@@ shot=hw5c.png
ZC.tick(5);
//@@
const G=ZC.G;const r=[];ZC.skip();ZC.tick(30);r.push('bezImen='+G.flags.bezImen,'names='+JSON.stringify(G.flags.names));r
//@@ shot=hw5d.png
ZC.tick(5);
