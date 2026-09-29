//@@
// 5-1 «Сундук на дубе» целиком, вдвоём: заводь (коршун) → Голова → залив → луг и дупло → ярусы дуба → поляна → пятая цепь → побег → бой с Лихом → заяц
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine,W.flags.stage];ZC.skip();ZC.tick(5);
r.push(W.flags.stage,U.st(),'signs='+W.signs.length,'lik='+W.likhos.length,'nuts='+W.nutTotal,'links='+W.linkTotal);
window.B51={eye(){const L=ZC.W.likhos[1];const p=new THREE.Vector3();L.m.eye.getWorldPosition(p);return p;},faceAway(pi){const h=U.act(pi),e=B51.eye();h.face=Math.atan2(h.pos.x-e.x,h.pos.z-e.z);}};r
//@@ shot=w51a.png
ZC.tick(10);
//@@
// заводь: коршун бьёт Лебедь — Прошка стреляет из рогатки, Пелагея — волна гуслями, упал — бьём
const W=ZC.W,F=W.flags;const r=[];r.push(U.path(0,[[-4,80],[-3,77]],6));ZC.tick(5);r.push(F.stage);ZC.skip();ZC.tick(5);r.push(F.stage);
r.push(U.walkTo(0,8,71,6),U.walkTo(1,9,65.5,6));const pr=U.act(0),D=W.dbg51;let shots=0,waves=0,grounds=0,prev='';
for(let i=0;i<60*60&&F.stage==='kite';i++){const st=D.KT.st;if(st!==prev){if(st==='ground')grounds++;prev=st;}
  const mk=W.marks.find(m=>m.active());if(mk&&i%24===0&&(i/24)%2===0){pr.face=Math.atan2(mk.pos.x-pr.pos.x,mk.pos.z-pr.pos.z);ZC.press('KeyE');shots++;}
  else if(st==='aim'&&D.KT.t>0.8&&i%30===0){ZC.press('Semicolon');waves++;}
  if(st==='ground'){for(const pi of[0,1]){const h=U.act(pi),dx=D.KT.pos.x-h.pos.x,dz=D.KT.pos.z-h.pos.z;if(Math.hypot(dx,dz)>2.4){U.walkTo(pi,D.KT.pos.x-1.6,D.KT.pos.z+(pi?-1:1),1);}h.face=Math.atan2(D.KT.pos.x-h.pos.x,D.KT.pos.z-h.pos.z);}if(i%12===0)ZC.press('KeyF');if(i%12===6)ZC.press('Comma');}
  ZC.tick(1);}
r.push('shots='+shots,'waves='+waves,'grounds='+grounds,'kiteDone='+F.kiteDone,'stage='+F.stage);r
//@@ shot=w51b.png
ZC.tick(5);
//@@
// Лебедь рассказывает про пятую цепь → Голова: Потап со щитом ведёт Йошу, Йоша под усами щекочет нос пером
const W=ZC.W,F=W.flags,H=ZC.HERO;const r=[];ZC.tick(90);if(ZC.G.cine)ZC.skip();ZC.tick(5);r.push(F.stage);
r.push(U.walkTo(0,1,50.5,6));ZC.tick(3);r.push(F.stage);ZC.skip();ZC.tick(3);r.push(F.stage);
U.tap('KeyQ');U.tap('KeyK');ZC.tick(2);r.push('act='+U.act(0).kind+','+U.act(1).kind);const po=H.potap,yo=H.yosha;
r.push(U.walkTo(0,1,52,6),U.walkTo(1,1,54,6));
for(let i=0;i<60*40;i++){ZC.hold('KeyG',true);ZC.hold('KeyW',po.pos.z>39.5);ZC.hold('KeyA',po.pos.x>1.2);ZC.hold('KeyD',po.pos.x<0.8);
  const ty=po.pos.z+1.3,tx=po.pos.x;ZC.hold('ArrowUp',yo.pos.z>ty+0.3);ZC.hold('ArrowDown',yo.pos.z<ty-0.4);ZC.hold('ArrowLeft',yo.pos.x>tx+0.3);ZC.hold('ArrowRight',yo.pos.x<tx-0.3);ZC.tick(1);if(po.pos.z<39.7&&i>60)break;}
['KeyW','KeyA','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].forEach(k=>ZC.hold(k,false));r.push('potap z='+po.pos.z.toFixed(2)+' yosha z='+yo.pos.z.toFixed(2));
// ждём вдох и — под усы
for(let i=0;i<60*6&&W.dbg51.HB.ph!=='in';i++)ZC.tick(1);
for(let i=0;i<60*6;i++){const tz=38.2,tx=1;ZC.hold('ArrowUp',yo.pos.z>tz+0.15);ZC.hold('ArrowDown',yo.pos.z<tz-0.25);ZC.hold('ArrowLeft',yo.pos.x>tx+0.15);ZC.hold('ArrowRight',yo.pos.x<tx-0.15);ZC.tick(1);if(Math.hypot(yo.pos.x-1,yo.pos.z-38.2)<0.3)break;}
['KeyG','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].forEach(k=>ZC.hold(k,false));r.push('yosha '+yo.pos.x.toFixed(2)+','+yo.pos.z.toFixed(2));
U.tap('Semicolon');ZC.tick(2);r.push('lit='+yo.lit);r.push(U.until(()=>F.stage!=='head',6));ZC.tick(120);if(ZC.G.cine)ZC.skip();ZC.tick(5);r.push(F.stage,'headDone='+F.headDone);r
//@@ shot=w51c.png
ZC.tick(5);
//@@
// хрустальный залив: Потап светит у хрусталика A, Йоша — на островок, поворачивает B, на тот берег и светит у C, Потап переходит
const W=ZC.W,F=W.flags;const r=[];r.push(U.path(0,[[0.5,30],[1,23]],6));ZC.tick(3);r.push(F.stage);ZC.skip();ZC.tick(3);r.push(F.stage);
r.push(U.walkTo(0,3.4,19.2,4));U.tap('KeyR');ZC.tick(3);r.push('litA='+U.act(0).lit);r.push(U.walkTo(0,4.2,19.4,3));ZC.tick(10);
r.push(U.path(1,[[2.6,19],[2.8,17.2],[3,14],[3,12.2],[1.8,11.4]],5));const b=U.act(1);b.face=Math.atan2(3-b.pos.x,11-b.pos.z);ZC.tick(2);U.tap('Comma');ZC.tick(30);r.push('tiles='+W.tiles.filter(t=>t.beam).map(t=>t.solid?1:0).join(''));
r.push(U.path(1,[[1.8,10],[3,9.4],[3,5],[3,2.6],[3.4,1.2]],5));r.push(U.walkTo(1,3.2,0.6,3));U.tap('Semicolon');ZC.tick(3);r.push('litC='+b.lit);r.push(U.walkTo(1,4.2,0.7,2));ZC.tick(10);
r.push(U.path(0,[[2.8,19],[2.8,17],[3,12.2],[3,11.9]],6));r.push(U.path(0,[[1.8,11],[2.4,9.6],[3,5],[2.8,2.6]],6));ZC.tick(20);r.push(F.stage,'cine='+!!ZC.G.cine);
ZC.tick(60);if(ZC.G.cine)ZC.skip();ZC.tick(5);r.push(F.stage,'lagoonDone='+F.lagoonDone,'nuts='+W.nuts);r
//@@ shot=w51d.png
ZC.tick(10);
//@@
// луг: пугала и хамелей; дупло: игрушки, тетрадка, зеркальце
const W=ZC.W,F=W.flags;const r=[];U.tap('KeyQ');U.tap('KeyK');ZC.tick(2);r.push('act='+U.act(0).kind+','+U.act(1).kind);
r.push(U.walkTo(0,-2,-6,5),U.walkTo(1,2,-6,5));r.push(U.brawl(80));r.push(F.stage,F.meadowClear);
r.push(U.walkTo(0,-6,-13,5));r.push('cine='+!!ZC.G.cine,F.hollow);ZC.skip();ZC.tick(5);r.push(F.stage,'links='+W.links,U.obj());r
//@@ shot=w51e.png
ZC.tick(10);
//@@
// ярус клубка
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];
r.push(U.walkTo(0,0.4,-25.2,6),U.walkTo(1,-4.4,-25.2,6));const a=U.act(0),b=U.act(1);
a.face=Math.atan2(-4.4-a.pos.x,-29.8-a.pos.z);b.face=Math.atan2(0.4-b.pos.x,-29.8-b.pos.z);
U.tap('KeyR');ZC.tick(40);U.tap('Semicolon');ZC.tick(60);
r.push('threads='+W.threads.map(t=>t.owner+':'+t.string+':'+t.len.toFixed(1)).join(','),'webs='+W.webs.map(w=>w.x.toFixed(1)+','+w.y.toFixed(2)+','+w.z.toFixed(1)).join(';'));
r.push(U.walkTo(0,-2,-27.6,4));U.tap('Space');ZC.tick(80);r.push('P1 '+a.pos.x.toFixed(1)+','+a.pos.y.toFixed(2)+','+a.pos.z.toFixed(1));
r.push(U.walkTo(1,-2,-27.6,4));U.tap('KeyM');ZC.tick(80);r.push('P2 '+b.pos.x.toFixed(1)+','+b.pos.y.toFixed(2)+','+b.pos.z.toFixed(1));r.push(U.obj());r
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];
r.push(U.walkTo(0,2.2,-32,4));U.tap('KeyF');ZC.tick(30);r.push('stage='+F.stage,'likho1='+F.likho1);ZC.tick(120);r
//@@
// переправа 1: Прошка — в кольцо-приманку, Пелагея — в обход слева
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const L=W.likhos[0];let reaches=0;const mon=()=>{if(L.reach&&!mon.on){mon.on=true;reaches++;}if(!L.reach)mon.on=false;};
r.push(U.path(0,[[8,-33],[8.3,-35.5],[8.2,-38.4]],4));ZC.tick(20);for(let i=0;i<300;i++){mon();ZC.tick(1);}
U.tap('KeyQ');ZC.tick(5);r.push('P1 act='+U.act(0).kind);
const pe=U.act(1);for(const [x,z] of [[-8.3,-33],[-8.5,-36],[-8.5,-42],[-8.5,-48],[-7,-52.5],[-6,-56]]){const q=U.walkTo(1,x,z,4,()=>mon());if(q==='TIMEOUT'){r.push('P2 stuck '+pe.pos.x.toFixed(1)+','+pe.pos.z.toFixed(1));break;}}
r.push('P2 at '+pe.pos.x.toFixed(1)+','+pe.pos.y.toFixed(2)+','+pe.pos.z.toFixed(1)+' reaches='+reaches+' stage='+F.stage);r
//@@
// Потап поднимается по паутинке и тоже в обход; Йошу зовём; колодец — гусли
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const po=U.act(0);
r.push(U.path(0,[[-2,-20],[-2,-27.5]],6));U.tap('Space');ZC.tick(80);
r.push(U.path(0,[[-8.3,-33],[-8.5,-40],[-8.5,-48],[-7,-52.5],[-7,-57]],4));r.push('potap '+po.pos.x.toFixed(1)+','+po.pos.y.toFixed(2)+','+po.pos.z.toFixed(1));
U.tap('Digit0');ZC.tick(400);r.push('stage='+F.stage);
U.walkTo(1,-6,-58.5,3);U.tap('Semicolon');ZC.tick(240);const z=W.waters[0];r.push('water '+z.state+' '+z.level.toFixed(2));
r.push(U.walkTo(1,-6,-66.2,4));r.push(U.walkTo(0,-4.5,-66,4));U.walkTo(1,-6,-66.3,2);U.tap('Comma');ZC.tick(30);r.push('stage='+F.stage,'links='+W.links);r
//@@
// перо: Игрок 1 — свет слева, Игрок 2 — тень справа; крона и вниз по корню
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const a=U.act(0),b=U.act(1);
r.push(U.walkTo(0,-1,-67.5,4));U.tap('KeyR');ZC.tick(5);r.push('lit='+a.lit);
r.push(U.path(0,[[-7,-69],[-7,-75],[-7,-81],[-7,-87.5]],4));U.tap('KeyF');ZC.tick(20);
r.push(U.path(1,[[7,-69],[7,-75],[7,-81],[7,-87.5]],4));U.tap('Comma');ZC.tick(60);r.push('stage='+F.stage,'links='+W.links);
r.push(U.path(0,[[-3,-93],[0,-99],[0,-108],[0,-115]],5));r.push(U.path(1,[[3,-93],[1,-99],[1,-108],[1,-114]],5));r.push('stage='+F.stage);ZC.tick(120);
const L=W.likhos[1];r.push('L2 vis='+L.g.visible+' '+L.pos.x.toFixed(1)+','+L.pos.z.toFixed(1));r
//@@ shot=w51f.png
ZC.tick(10);
//@@
// переправа 2 и горн
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const L=W.likhos[1];let reaches=0;const mon=()=>{if(L.reach&&!mon.on){mon.on=true;reaches++;}if(!L.reach)mon.on=false;};
r.push(U.path(1,[[3,-120],[3.5,-127.8],[6.9,-127.9]],4));for(let i=0;i<240;i++){mon();ZC.tick(1);}
U.tap('KeyK');ZC.tick(5);r.push('P2 act='+U.act(1).kind);
r.push(U.path(1,[[1,-116],[0,-122],[0,-135],[1,-145],[10,-145],[20,-145],[26,-141]],5,()=>mon()));
r.push(U.path(0,[[-1,-120],[-1,-135],[0,-145],[10,-145],[20,-144.6],[24,-141]],5,()=>mon()));
r.push('reaches='+reaches,'stage='+F.stage);r.push(U.brawl(60));r.push('forgeClear='+F.forgeClear);r
//@@
// ключи — каждый в свою скважину → пятая цепь
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const keys=W.hots.filter(i=>i.kind==='kluch');
for(const pi of[0,1]){const k=keys[pi];r.push(U.walkTo(pi,k.pos.x,k.pos.z+1.3,6));const h=U.act(pi);h.face=Math.atan2(k.pos.x-h.pos.x,k.pos.z-h.pos.z);U.tap(pi?'Semicolon':'KeyR');ZC.tick(20);
  r.push(U.walkTo(pi,25.5+(pi?0.6:-0.6),-131.4,6));h.face=Math.PI;ZC.tick(2);U.tap(pi?'Semicolon':'KeyR');ZC.tick(30);}
ZC.tick(30);r.push('stage='+F.stage,'cine='+!!ZC.G.cine);r
//@@ shot=w51g.png
ZC.tick(10);
//@@
// ловушка: Потап поворачивается к Лиху (защищает Йошу) — Лихо на плечах, к отаре
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];ZC.skip();ZC.tick(3);r.push('stage='+F.stage);ZC.skip();ZC.tick(3);r.push('stage='+F.stage,'act0='+U.act(0).kind,'act1='+U.act(1).kind);
for(let i=0;i<40;i++){ZC.hold('KeyA',true);ZC.tick(1);}ZC.hold('KeyA',false);ZC.tick(5);r.push('stage='+F.stage,'looked='+F.looked);ZC.tick(200);r.push('stage='+F.stage,'ride='+(W.likhos[1].ride&&W.likhos[1].ride.kind));
r.push(U.walkTo(0,24,-137,12));ZC.tick(30);r.push('stage='+F.stage,'cine='+!!ZC.G.cine);r
//@@
// побег в шкурах к корням
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];ZC.skip();ZC.tick(5);r.push('stage='+F.stage,'skins='+Object.values(H).filter(h=>h.skin).length);const L=W.likhos[1];const FA=W.flocks5[0],FB=W.flocks5[1];let resets=0;
const K=[['KeyA','KeyD','KeyW','KeyS'],['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']];
const steer=(pi,tx,tz)=>{const h=U.act(pi),dx=tx-h.pos.x,dz=tz-h.pos.z;const B=K[pi];ZC.hold(B[0],dx<-0.3);ZC.hold(B[1],dx>0.3);ZC.hold(B[2],dz<-0.3);ZC.hold(B[3],dz>0.3);};
const off=pi=>pi?1.1:-1.1;let phase='A',log=[];
for(let i=0;i<60*70;i++){
  if(phase==='A'){for(const pi of[0,1])steer(pi,FA.pos.x+off(pi)*0.6,FA.pos.z+off(pi)*0.5);if(FA.k>=FA.path.length-1&&L.counting&&L.countT%(L.countEvery+L.countDur)-L.countEvery<0.3){phase='gap';log.push('gap@'+(i/60).toFixed(1));}}
  else if(phase==='gap'){for(const pi of[0,1])steer(pi,FB.pos.x+off(pi)*0.6,FB.pos.z);if([0,1].every(pi=>Math.hypot(U.act(pi).pos.x-FB.pos.x,U.act(pi).pos.z-FB.pos.z)<FB.r-0.5))phase='B';}
  else if(phase==='B'){for(const pi of[0,1])steer(pi,FB.pos.x+off(pi)*0.5,FB.pos.z+0.5);if(F.stage!=='escape')break;}
  const hb=U.act(0);if(hb.pos.x>23.5&&phase!=='A'){phase='A';resets++;log.push('reset@'+(i/60).toFixed(1));}
  ZC.tick(1);}
K.flat().forEach(k=>ZC.hold(k,false));r.push('phase='+phase,'resets='+resets,log.join(','),'stage='+F.stage);r
//@@ shot=w51h.png
ZC.tick(10);
//@@
// бой, фаза 1: Потап — в северное кольцо, Пелагея с зеркальцем — на линию взгляда, спиной к Лиху
const W=ZC.W,F=W.flags,B=F.B,H=ZC.HERO;const r=[];if(ZC.G.cine)ZC.skip();ZC.tick(5);r.push('stage='+F.stage,'act='+U.act(0).kind+','+U.act(1).kind);const L=W.likhos[1];
r.push(U.walkTo(0,-3.5,-125.4,6));r.push(U.walkTo(1,0.6,-125.3,6));U.tap('Semicolon');ZC.tick(3);r.push('holder='+W.mir51.holder);
const between=(t)=>{const e=B51.eye(),b=U.act(0).pos;return [e.x+(b.x-e.x)*t,e.z+(b.z-e.z)*t];};let log=[];
for(let n=0;n<4&&B.refl<3;n++){const r0=B.refl;for(let i=0;i<60*8;i++){if(!L.goal&&!(L.daze>0))break;ZC.tick(1);}
  if(B.refl===2){const e=B51.eye();U.path(1,[[e.x+4.5,U.act(1).pos.z],[e.x+4.5,e.z+5.2],[e.x,e.z+5.2]],6);B51.faceAway(1);for(let i=0;i<60*16&&B.refl===r0;i++){B51.faceAway(1);ZC.tick(1);}}
  else{const [x,z]=between(0.45);U.path(1,[[x+4.5,U.act(1).pos.z],[x+4.5,z],[x,z]],6);B51.faceAway(1);for(let i=0;i<60*6&&B.refl===r0;i++){B51.faceAway(1);ZC.tick(1);}}
  log.push('refl='+B.refl);}
r.push(log.join(','),'stage='+F.stage);r
//@@ shot=w51i.png
ZC.tick(5);
//@@
// фаза 2: овечки прыгают через бревно по очереди
const W=ZC.W,F=W.flags,B=F.B;const r=[];ZC.tick(240);if(ZC.G.cine){ZC.skip();ZC.tick(3);}r.push(F.stage,'ph='+B.ph);
r.push(U.walkTo(0,-5,-130.2,6),U.walkTo(1,-2,-130.2,6));const K=[['KeyW','KeyS','Space'],['ArrowUp','ArrowDown','KeyM']];
let log=[];for(let n=0;n<20&&B.count<8&&F.stage==='boss2';n++){const pi=n%2,h=U.act(pi),k=K[pi];const north=h.pos.z>-131.5;ZC.hold(north?k[0]:k[1],true);ZC.tick(4);ZC.press(k[2]);ZC.tick(34);ZC.hold(k[0],false);ZC.hold(k[1],false);ZC.tick(40);log.push(B.count);}
r.push('counts='+log.join(','),'stage='+F.stage);r
//@@ shot=w51j.png
ZC.tick(5);
//@@
// фаза 3: Пелагея — колыбельная на гуслях у головы, Потап — щекочет лапу пером
const W=ZC.W,F=W.flags,B=F.B;const r=[];ZC.tick(120);if(ZC.G.cine){ZC.skip();ZC.tick(3);}r.push(F.stage,'ph='+B.ph);
const gs=W.signs.find(s=>s.item==='gusli'&&s.on&&s.on()&&s.z<-130),ps=W.signs.find(s=>s.item==='pero'&&s.on&&s.on()&&s.z<-130);
r.push(U.walkTo(1,gs.x,gs.z,6),U.walkTo(0,ps.x,ps.z,6));U.tap('KeyR');ZC.tick(2);r.push('lit='+U.act(0).lit);
let log=[];for(let i=0;i<60*60&&F.stage!=='end'&&F.stage!=='bossEnd';i++){if(i%100===0)ZC.press('Semicolon');if(i%300===0)log.push('s'+B.sleep.toFixed(2)+'c'+B.claw+(B.peek>0?'P':'')+(F.stage==='bossWake'?'W':''));ZC.tick(1);}
r.push(log.join(' '),'stage='+F.stage,'claw='+B.claw);r
//@@ shot=w51k.png
ZC.tick(700);
//@@ shot=w51l.png
ZC.tick(10);
//@@
const W=ZC.W,F=W.flags;const r=['cine='+!!ZC.G.cine];ZC.skip();ZC.tick(300);r.push('stage='+F.stage,'links='+W.links+'/'+W.linkTotal,'nuts='+W.nuts+'/'+W.nutTotal,'lv='+ZC.W.levelId);r
