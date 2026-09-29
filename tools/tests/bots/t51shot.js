//@@
// 5-1: кадры новых сцен (для глаз и для документов): заводь с коршуном, Лебедь, Голова, залив, белка, зеркальце, пятая цепь, три фазы боя, заяц.
// Релиз в высоком качестве: URLQ='&hq=1' tools/tests/run_one.sh t51shot zlataya_cep/zlataya_cep_final06.html
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W;ZC.skip();ZC.tick(5);
U.path(0,[[-4,80],[-3,77]],6);ZC.tick(5);ZC.skip();ZC.tick(5);U.walkTo(0,8,71,6);U.walkTo(1,9,66,6);for(let i=0;i<60*6&&W.dbg51.KT.st!=='aim';i++)ZC.tick(1);ZC.tick(40);[W.flags.stage,W.dbg51.KT.st]
//@@ shot=s51_kite.png
ZC.tick(2);
//@@
const W=ZC.W,D=W.dbg51;D.KT.emb=1;D.KT.st='ground';D.KT.t=0;D.KT.pos.set(10.2,0.35,67);ZC.tick(2);U.walkTo(1,8.8,67,4);U.act(1).face=Math.PI/2;U.tap('Comma');ZC.tick(90);ZC.tick(460);[W.flags.stage]
//@@ shot=s51_swan.png
ZC.tick(2);
//@@
const W=ZC.W;ZC.skip();ZC.tick(5);W.warp51('head');ZC.tick(5);U.walkTo(0,1,50.5,4);ZC.tick(300);[W.flags.stage]
//@@ shot=s51_head.png
ZC.tick(2);
//@@
const W=ZC.W,H=ZC.HERO;ZC.skip();ZC.tick(5);U.tap('KeyQ');U.tap('KeyK');ZC.tick(2);const po=H.potap,yo=H.yosha;U.walkTo(0,1,47,6);U.walkTo(1,1,49,6);
for(let i=0;i<60*3;i++){ZC.hold('KeyG',true);ZC.tick(1);}const r=[W.flags.stage,W.dbg51.HB.ph];r
//@@ shot=s51_wind.png
ZC.hold('KeyG',false);ZC.tick(2);
//@@
const W=ZC.W;W.warp51('lagoon');ZC.tick(5);U.walkTo(0,1,23,4);ZC.skip();ZC.tick(5);U.walkTo(0,3.4,19.2,4);U.tap('KeyR');ZC.tick(3);U.walkTo(0,4.2,19.4,3);U.path(1,[[2.6,19],[2.8,17.2],[3,14],[3,12.2],[1.8,11.4]],5);ZC.tick(30);[W.flags.stage]
//@@ shot=s51_lagoon.png
ZC.tick(2);
//@@
const W=ZC.W;const b=U.act(1);b.face=Math.atan2(3-b.pos.x,11-b.pos.z);ZC.tick(2);U.tap('Comma');ZC.tick(30);U.path(1,[[1.8,10],[3,9.4],[3,5],[3,2.6],[3.2,0.6]],5);U.tap('Semicolon');ZC.tick(3);U.walkTo(1,4.2,0.7,2);
U.path(0,[[2.8,19],[2.8,17],[3,12.2],[3,11.9]],6);U.path(0,[[1.8,11],[2.4,9.6],[3,5],[2.8,2.6]],6);ZC.tick(300);[W.flags.stage]
//@@ shot=s51_belka.png
ZC.tick(2);
//@@
const W=ZC.W;if(ZC.G.cine)ZC.skip();ZC.tick(5);W.warp51('meadow');W.flags.meadowClear=true;U.walkTo(0,-6,-13,6);ZC.tick(1300);[W.flags.stage]
//@@ shot=s51_mirror.png
ZC.tick(2);
//@@
const W=ZC.W;if(ZC.G.cine)ZC.skip();ZC.tick(5);W.warp51('glade');ZC.tick(5);U.path(0,[[-3,-93],[0,-99],[0,-108],[0,-115]],5);ZC.tick(200);[W.flags.stage]
//@@ shot=s51_chain.png
ZC.tick(2);
//@@
const W=ZC.W;W.warp51('boss1');ZC.tick(30);U.walkTo(0,-3.5,-125.4,6);U.walkTo(1,0.6,-125.3,6);U.tap('Semicolon');ZC.tick(3);U.path(1,[[2.4,-127],[2.4,-130.6],[-3.4,-130.6]],6);const h=U.act(1);h.face=0;ZC.tick(12);[W.flags.stage,JSON.stringify(W.mir51)]
//@@ shot=s51_mirror_boss.png
ZC.tick(2);
//@@
const W=ZC.W;W.warp51('boss2');ZC.tick(30);U.walkTo(0,-5,-130.2,6);U.walkTo(1,-2,-130.2,6);ZC.hold('KeyW',true);ZC.tick(4);U.tap('Space');ZC.tick(10);[W.flags.stage]
//@@ shot=s51_sheep.png
ZC.hold('KeyW',false);ZC.tick(2);
//@@
const W=ZC.W;W.warp51('boss3');ZC.tick(30);const gs=W.signs.find(s=>s.item==='gusli'&&s.on&&s.on()&&s.z<-130),ps=W.signs.find(s=>s.item==='pero'&&s.on&&s.on()&&s.z<-130);U.walkTo(1,gs.x,gs.z,6);U.walkTo(0,ps.x,ps.z,6);U.tap('KeyR');ZC.tick(60);U.tap('Semicolon');ZC.tick(20);[W.flags.stage]
//@@ shot=s51_sleep.png
ZC.tick(2);
//@@
const W=ZC.W,B=W.flags.B;B.claw=2;B.clawT=0.999;ZC.tick(60);ZC.tick(620);[W.flags.stage]
//@@ shot=s51_hare.png
ZC.tick(2);
