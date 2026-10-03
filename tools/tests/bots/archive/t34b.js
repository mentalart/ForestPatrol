//@@
ZC.startFrom(ZC.LV('3-4'));ZC.G.manual=true;ZC.tick(30);const H=ZC.HERO,W=ZC.W,S=W.shipS;
U.path(1,[[2,-1],[0.9,-3],[0.9,-7.9]],3);U.tap('Semicolon');ZC.tick(3);ZC.skip();ZC.tick(5);U.tap('KeyK');ZC.tick(3);U.tap('KeyQ');ZC.tick(3);
// Потап к мачте: ждём порыв
const r=[];U.walkTo(0,0.6,S.z,3);let t=0;while(!W.flags.gustA&&t<1200){ZC.tick(1);t++;U.walkTo(0,S.x+0.7,S.z-0.2,0.05);}r.push('gust at S='+S.z.toFixed(1));
ZC.hold('KeyG',true);ZC.tick(130);ZC.hold('KeyG',false);r.push(U.st(),'S='+S.z.toFixed(1));r
//@@
// ущелье: уступы — держим Потапа на нужном борту
const W=ZC.W,S=W.shipS,H=ZC.HERO;const r2=[];const L=[{z:-76,s:1},{z:-93,s:-1},{z:-109,s:1},{z:-125,s:-1}];
let guard=0;while(S.z>-141&&guard<60*60){guard++;const n=L.find(q=>S.z-q.z>-0.5&&!(S.z<q.z-0.3));const want=n?(-n.s*1.8):0;U.walkTo(0,S.x+want,S.z-2.4,0.05);ZC.tick(1);}
r2.push('S='+S.z.toFixed(1),'bumps='+(W.flags.bumps||0),'stage='+W.flags.stage,U.st());r2
//@@ shot=w34c.png
ZC.tick(1);
//@@
const W=ZC.W,S=W.shipS;const r3=[!!ZC.G.cine,W.flags.stage];ZC.tick(60);ZC.skip();ZC.tick(5);r3.push(W.flags.stage,U.st());
// держим мачту в порывах
let g=0;while(W.flags.stage==='hold'&&g<60*30){g++;U.walkTo(0,S.x+0.7,S.z-0.2,0.05);ZC.hold('KeyG',!!W.flags.gustA);ZC.tick(1);}ZC.hold('KeyG',false);r3.push('stage='+W.flags.stage,'gusts='+W.flags.gusts,'S='+S.z.toFixed(1));r3
//@@
// тёмные тучи: сбегать за звеном на облако справа (z=-166)
const W=ZC.W,S=W.shipS,H=ZC.HERO;U.tap('KeyQ');ZC.tick(3);const r4=['act='+U.act(0).kind];
let g=0;while(S.z>-164.2&&g<60*60){g++;U.walkTo(0,S.x+1.2,S.z,0.05);ZC.tick(1);}r4.push('S='+S.z.toFixed(1));
const tl=W.tiles.filter(t=>Math.abs(t.z+166)<1);r4.push('tiles '+tl.map(t=>t.solid?1:0).join(''));
U.walkTo(0,S.x+1.7,-166,2);ZC.hold('KeyD',true);ZC.press('Space');ZC.tick(20);ZC.hold('KeyD',false);r4.push(U.path(0,[[5,-166],[7.4,-166]],2),'links='+W.links,U.st());r4.push(U.path(0,[[3,-166],[1.2,S.z-2]],2),U.st(),'S='+S.z.toFixed(1));r4
//@@ shot=w34d.png
ZC.tick(1);
//@@
// вороны
const W=ZC.W,S=W.shipS;let g=0;while(W.flags.wave===0&&g<60*60){g++;ZC.tick(1);}const r5=['S='+S.z.toFixed(1),'wave='+W.flags.wave];
U.tap('KeyQ');ZC.tick(2);r5.push(U.brawl(60,['parry','parry']));ZC.tick(120);r5.push(U.brawl(60),'crowsDone='+W.flags.crowsDone,'S='+S.z.toFixed(1),'lit='+S.lit,U.st());r5
//@@
const W=ZC.W,S=W.shipS;let g=0;while(!W.flags.landed&&g<60*90){g++;ZC.tick(1);}const r6=['landed='+W.flags.landed,'S='+S.z.toFixed(1),!!ZC.G.cine];ZC.skip();ZC.tick(5);
r6.push(U.path(0,[[1.3,S.z+1],[1.3,S.z-3],[0,-312]],3),U.path(1,[[1.3,S.z-3],[1,-312]],3),U.st());ZC.tick(200);r6.push(ZC.W.levelId,ZC.G.done['3-4'],ZC.G.got['3-4']);r6
