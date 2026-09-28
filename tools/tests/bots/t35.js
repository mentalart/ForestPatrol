//@@
ZC.startFrom(ZC.LV('3-5'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(5);const W=ZC.W,H=ZC.HERO;const r=[W.name,W.geese.length];
// гусь видит свет: ставим Прошку со светом в пятно гуся 1
const q=W.geese[0];U.tap('KeyR');ZC.tick(2);H.proshka.pos.set(q.fp.x,0,q.fp.z);ZC.tick(3);let t=0;while(q.state==='fly'&&t<200){H.proshka.pos.set(q.fp.x,0.3,q.fp.z);ZC.tick(1);t++;}
r.push('state='+q.state);ZC.tick(60);r.push(U.st(),'lit='+H.proshka.lit,'geese='+(ZC.G.stats.geese||0));r
//@@
const W=ZC.W,H=ZC.HERO;W.gooseCalm=9999;const r2=[];
r2.push(U.path(0,[[0,-8],[0,-18.5],[0,-26]],3));U.tap('KeyR');ZC.tick(2);r2.push(U.path(0,[[0,-36.5],[0,-40]],3),U.st());
// Йоша к гнезду
U.tap('KeyK');ZC.tick(3);H.yosha.pos.set(2,0,-40);H.yosha.vel.set(0,0,0);ZC.tick(3);r2.push(U.walkTo(1,0,-44,4),!!ZC.G.cine,W.flags.stage);ZC.tick(30);ZC.skip();ZC.tick(5);r2.push('chase='+W.flags.chase,'links='+W.links);r2
//@@ shot=w35a.png
ZC.tick(1);
//@@
// печка: Прошка первым, съедает
const W=ZC.W,H=ZC.HERO;const r3=[];if(U.act(0).lit)U.tap('KeyR');r3.push(U.path(0,[[0,-50],[0,-58],[0,-63]],3),'pie='+!!W.flags.pie);U.tap('KeyE');ZC.tick(120);r3.push('ate='+W.flags.ate);
r3.push(U.path(1,[[0,-50],[0,-58],[0.8,-63.5]],3));ZC.tick(20);H.potap.pos.set(-1,0,-63.5);H.pelageya.pos.set(1.4,0,-64);ZC.tick(400);r3.push('link='+W.links,U.st(),'hidden='+[H.proshka.hidden,H.potap.hidden]);r3
//@@ shot=w35b.png
ZC.tick(1);
//@@
// яблонька: Прошка ест, Йоша поливает; прячемся
const W=ZC.W,H=ZC.HERO;W.gooseCalm=9999;const r4=['links='+W.links];
const L=(pi,on)=>{if(U.act(pi).lit!==on)U.tap(pi?'Semicolon':'KeyR');ZC.tick(2);};
L(0,true);r4.push(U.path(0,[[3,-65],[3,-72],[0,-73.5],[0,-83]],3));L(0,false);r4.push(U.path(0,[[0,-96],[0,-101.6]],3),'ask='+W.flags.treeAsk);U.tap('KeyE');ZC.tick(30);r4.push('eat='+W.flags.treeEat);
L(1,true);r4.push(U.path(1,[[3,-65],[3,-72],[0,-73.5],[0,-83]],3));L(1,false);r4.push(U.path(1,[[0,-96],[1,-101.8]],3));U.tap('KeyL');ZC.tick(40);r4.push('water='+W.flags.treeWater,'done='+W.flags.treeDone);
H.potap.pos.set(-1.2,0,-102);H.pelageya.pos.set(1.5,0,-102.5);ZC.tick(420);r4.push('links='+W.links,U.st());r4
//@@
// речка: Прошка по запруде, Пелагея — Совиный взор
const W=ZC.W,H=ZC.HERO;W.gooseCalm=9999;const r5=[];const L=(pi,on)=>{if(U.act(pi).lit!==on)U.tap(pi?'Semicolon':'KeyR');ZC.tick(2);};L(0,false);r5.push(U.path(0,[[0,-121]],3));L(0,true);r5.push(U.path(0,[[0,-135],[3,-137]],3),'ask='+W.flags.riverAsk);U.tap('KeyE');ZC.tick(60);r5.push('dam='+W.flags.dam);
U.tap('KeyK');ZC.tick(3);H.pelageya.pos.set(-2,0,-136);H.pelageya.vel.set(0,0,0);ZC.tick(3);U.tap('KeyL');ZC.tick(30);r5.push('hollow='+W.flags.hollow,'rdone='+W.flags.riverDone);
H.proshka.pos.set(0,0,-139);H.potap.pos.set(-1,0,-139.5);H.yosha.pos.set(1,0,-139.2);H.pelageya.pos.set(0.5,0,-138.4);ZC.tick(420);r5.push('links='+W.links,W.flags.stage,!!ZC.G.cine);r5
//@@
const W=ZC.W,H=ZC.HERO;W.gooseCalm=9999;const r6=[];r6.push(U.walkTo(0,0,-148,3),!!ZC.G.cine,W.flags.stage);ZC.tick(10);ZC.skip();ZC.tick(5);r6.push(W.flags.stage,'final='+W.flags.final);
if(!U.act(0).lit)U.tap('KeyR');if(!U.act(1).lit)U.tap('Semicolon');ZC.tick(2);
r6.push(U.path(0,[[0,-152],[0,-190.5]],4),U.path(1,[[0.2,-151],[0.2,-152],[0.2,-190.5]],4),W.flags.stage,!!ZC.G.cine);ZC.tick(60);r6
//@@ shot=w35c.png
ZC.tick(900);
//@@
ZC.skip();ZC.tick(200);[ZC.W.levelId,ZC.G.done['3-5'],ZC.G.got['3-5']]
