//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine,W.flags.stage];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'signs='+W.signs.length,'lik='+W.likhos.length);r
//@@ shot=w51a.png
ZC.tick(30);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];
r.push(U.walkTo(0,-2,-5,4),U.walkTo(1,2,-5,4));r.push(U.brawl(60));r.push(F.stage,F.meadowClear);
r.push(U.walkTo(0,-6,-13,5));r.push('cine='+!!ZC.G.cine,F.hollow);ZC.skip();ZC.tick(5);r.push(F.stage,'links='+W.links,U.obj());r
//@@ shot=w51b.png
ZC.tick(10);
//@@
// ярус клубка
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];
r.push(U.walkTo(0,0.4,-25.2,6),U.walkTo(1,-4.4,-25.2,6));const a=U.act(0),b=U.act(1);
a.face=Math.atan2(-4.4-a.pos.x,-29.8-a.pos.z);b.face=Math.atan2(0.4-b.pos.x,-29.8-b.pos.z);
r.push('sign0='+W.signs.map(s=>Math.hypot(s.x-a.pos.x,s.z-a.pos.z).toFixed(1)).join('/'));U.tap('KeyR');ZC.tick(40);U.tap('Semicolon');ZC.tick(60);
r.push('threads='+W.threads.map(t=>t.owner+':'+t.string+':'+t.len.toFixed(1)).join(','),'webs='+W.webs.map(w=>w.x.toFixed(1)+','+w.y.toFixed(2)+','+w.z.toFixed(1)).join(';'));
r.push(U.walkTo(0,-2,-27.6,4));U.tap('Space');ZC.tick(80);r.push('P1 '+a.pos.x.toFixed(1)+','+a.pos.y.toFixed(2)+','+a.pos.z.toFixed(1));
r.push(U.walkTo(1,-2,-27.6,4));U.tap('KeyM');ZC.tick(80);r.push('P2 '+b.pos.x.toFixed(1)+','+b.pos.y.toFixed(2)+','+b.pos.z.toFixed(1));r.push(U.obj());r
//@@ shot=w51c.png
ZC.tick(10);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];
r.push(U.walkTo(0,2.2,-32,4));U.tap('KeyF');ZC.tick(30);r.push('stage='+F.stage,'likho1='+F.likho1,U.obj());ZC.tick(120);
const L=W.likhos[0];r.push('L yaw='+L.yaw.toFixed(2)+' vis='+L.g.visible+' pos='+L.pos.x.toFixed(1)+','+L.pos.y.toFixed(1)+','+L.pos.z.toFixed(1),'tgt='+(L.tgt&&L.tgt.kind));r
//@@ shot=w51d.png
ZC.tick(10);
//@@
// переправа 1: Прошка — в кольцо-приманку, Пелагея — в обход слева
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const L=W.likhos[0];let reaches=0;const mon=()=>{if(L.reach&&!mon.on){mon.on=true;reaches++;}if(!L.reach)mon.on=false;};
r.push(U.path(0,[[8,-33],[8.3,-35.5],[8.2,-38.4]],4));ZC.tick(20);r.push('P1 at '+U.act(0).pos.x.toFixed(1)+','+U.act(0).pos.z.toFixed(1)+' reaches='+reaches);
for(let i=0;i<300;i++){mon();ZC.tick(1);}r.push('L yaw='+L.yaw.toFixed(2)+' tgt='+(L.tgt&&L.tgt.kind));
U.tap('KeyQ');ZC.tick(5);r.push('P1 act='+U.act(0).kind);
const pe=U.act(1);let ok=true;for(const [x,z] of [[-8.3,-33],[-8.5,-36],[-8.5,-42],[-8.5,-48],[-7,-52.5],[-6,-56]]){const q=U.walkTo(1,x,z,4,()=>mon());if(q==='TIMEOUT'){ok=false;r.push('P2 stuck '+pe.pos.x.toFixed(1)+','+pe.pos.z.toFixed(1));break;}}
r.push('P2 at '+pe.pos.x.toFixed(1)+','+pe.pos.y.toFixed(2)+','+pe.pos.z.toFixed(1)+' reaches='+reaches+' stage='+F.stage);r
//@@ shot=w51e.png
ZC.tick(10);
//@@
// Потап поднимается по паутинке и тоже в обход; Йошу зовём
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const po=U.act(0);r.push('potap '+po.pos.x.toFixed(1)+','+po.pos.y.toFixed(1)+','+po.pos.z.toFixed(1));
r.push(U.path(0,[[-2,-20],[-2,-27.5]],6));U.tap('Space');ZC.tick(80);r.push('potap '+po.pos.x.toFixed(1)+','+po.pos.y.toFixed(2)+','+po.pos.z.toFixed(1));
r.push(U.path(0,[[-8.3,-33],[-8.5,-40],[-8.5,-48],[-7,-52.5],[-7,-57]],4));r.push('potap '+po.pos.x.toFixed(1)+','+po.pos.y.toFixed(2)+','+po.pos.z.toFixed(1));
// Йоша: зов
U.tap('Digit0');ZC.tick(400);const yo=H.yosha;r.push('yosha '+yo.pos.x.toFixed(1)+','+yo.pos.y.toFixed(2)+','+yo.pos.z.toFixed(1)+' carries='+ZC.G.stats.carries);
r.push('stage='+F.stage);r
//@@
// колодец: гусли
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];U.walkTo(1,-6,-58.5,3);U.tap('Semicolon');ZC.tick(240);const z=W.waters[0];r.push('water '+z.state+' '+z.level.toFixed(2));
r.push(U.st());r.push(U.walkTo(1,-6,-66.2,4));r.push(U.walkTo(0,-4.5,-66,4));r.push(U.st(),'links='+W.links);
U.walkTo(1,-6,-66.3,2);U.tap('Comma');ZC.tick(30);r.push('lk2 stage='+F.stage,U.obj());r
//@@ shot=w51f.png
ZC.tick(10);
//@@
// перо: Игрок 1 — свет слева, Игрок 2 — тень справа
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const a=U.act(0),b=U.act(1);
r.push(U.walkTo(0,-1,-67.5,4));U.tap('KeyR');ZC.tick(5);r.push('lit='+a.lit+' feat5='+W.feat5);
r.push(U.path(0,[[-7,-69],[-7,-75],[-7,-81],[-7,-87.5]],4));r.push('P1 '+a.pos.x.toFixed(1)+','+a.pos.y.toFixed(2)+','+a.pos.z.toFixed(1)+' lit='+a.lit);
U.tap('KeyF');ZC.tick(20);r.push('lk3a='+W.flags.stage);
r.push(U.path(1,[[7,-69],[7,-75],[7,-81],[7,-87.5]],4));r.push('P2 '+b.pos.x.toFixed(1)+','+b.pos.y.toFixed(2)+','+b.pos.z.toFixed(1)+' lit='+b.lit);
U.tap('Comma');ZC.tick(60);r.push('stage='+F.stage,'links='+W.links,U.obj());r
//@@ shot=w51g.png
ZC.tick(10);
//@@
// крона → вниз по корню на поляну
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const a=U.act(0),b=U.act(1);
r.push(U.path(0,[[-3,-93],[0,-99],[0,-108],[0,-115]],5));r.push(U.path(1,[[3,-93],[1,-99],[1,-108],[1,-114]],5));r.push(U.st(),'stage='+F.stage);ZC.tick(120);
const L=W.likhos[1];r.push('L2 vis='+L.g.visible+' '+L.pos.x.toFixed(1)+','+L.pos.z.toFixed(1)+' tgt='+(L.tgt&&L.tgt.kind)+' reach='+!!L.reach);r
//@@ shot=w51h.png
ZC.tick(10);
//@@
// переправа 2: Пелагея — приманка, Йоша и Потап — южным обходом к горну
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const L=W.likhos[1];let reaches=0,caught=0;const mon=()=>{if(L.reach&&!mon.on){mon.on=true;reaches++;}if(!L.reach)mon.on=false;};
r.push(U.path(1,[[3,-120],[3.5,-127.8],[6.9,-127.9]],4));for(let i=0;i<240;i++){mon();ZC.tick(1);}r.push('L tgt='+(L.tgt&&L.tgt.kind)+' yaw='+L.yaw.toFixed(2)+' reaches='+reaches);
U.tap('KeyK');ZC.tick(5);r.push('P2 act='+U.act(1).kind+' '+U.act(1).pos.x.toFixed(1)+','+U.act(1).pos.y.toFixed(1)+','+U.act(1).pos.z.toFixed(1));
r.push(U.path(1,[[1,-116],[0,-122],[0,-135],[1,-145],[10,-145],[20,-145],[26,-141]],5,()=>mon()));
r.push(U.path(0,[[-1,-120],[-1,-135],[0,-145],[10,-145],[20,-144.6],[24,-141]],5,()=>mon()));
r.push('reaches='+reaches,U.st(),'stage='+F.stage);r
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];r.push(U.brawl(60));r.push('forgeClear='+F.forgeClear);r.push(U.st());r
//@@ shot=w51i.png
ZC.tick(10);
//@@
// ключи: каждый свой
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const keys=W.hots.filter(i=>i.kind==='kluch');r.push('keys '+keys.map(k=>k.pos.x.toFixed(1)+','+k.pos.y.toFixed(2)+','+k.pos.z.toFixed(1)+' h='+k.heat.toFixed(2)).join(' | '));
for(const pi of[0,1]){const k=keys[pi];r.push(U.walkTo(pi,k.pos.x,k.pos.z+1.3,6));const h=U.act(pi);h.face=Math.atan2(k.pos.x-h.pos.x,k.pos.z-h.pos.z);U.tap(pi?'Semicolon':'KeyR');ZC.tick(20);r.push(pi+' carry='+!!h.carry);
  r.push(U.walkTo(pi,25.5+(pi?0.6:-0.6),-131.4,6));h.face=Math.PI;ZC.tick(2);U.tap(pi?'Semicolon':'KeyR');ZC.tick(30);r.push(pi+' carry='+!!h.carry+' stage='+F.stage);}
ZC.tick(30);r.push('stage='+F.stage,'cine='+!!ZC.G.cine);r
//@@ shot=w51j.png
ZC.tick(10);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];ZC.skip();ZC.tick(3);r.push('stage='+F.stage);ZC.tick(60*6);const L=W.likhos[1];r.push('stage='+F.stage,'looked='+F.looked,'perch='+!!L.perch);ZC.tick(60*6);r.push('stage='+F.stage,'cine='+!!ZC.G.cine);ZC.skip();ZC.tick(5);
r.push('stage='+F.stage,'countDur='+L.countDur,'R='+L.R,'perch='+!!L.perch,'noCatch='+L.noCatch);r
//@@ shot=w51m.png
ZC.tick(60);
