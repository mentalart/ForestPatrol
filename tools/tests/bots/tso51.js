//@@
// 5-1 в одиночном режиме: коршун, Голова (Потап со щитом, потом Йоша под усы), залив (оставленный светит у хрусталика), бой с Лихом (оставленный — в кольце / щекочет лапу)
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.setSolo(true);ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,G=ZC.G;ZC.skip();ZC.tick(5);
window.S={h(){return ZC.players[G.soloPi].heroes[ZC.players[G.soloPi].act];},pi(){return G.soloPi;},walk(x,z,m){return U.walkTo(G.soloPi,x,z,m||6);},path(p,m){return U.path(G.soloPi,p,m||6);},
  key(a){const K=[{item:'KeyR',attack:'KeyF',skill:'KeyE',swap:'KeyQ',jump:'Space',guard:'KeyG',call:'Digit1'},{item:'Semicolon',attack:'Comma',skill:'KeyL',swap:'KeyK',jump:'KeyM',guard:'Period',call:'Digit0'}];return K[G.soloPi][a];},
  tap(a){U.tap(S.key(a));},to(kind){for(let i=0;i<4&&S.h().kind!==kind;i++){S.tap('swap');ZC.tick(2);}return S.h().kind;},
  eye(){const L=ZC.W.likhos[1];const p=new THREE.Vector3();L.m.eye.getWorldPosition(p);return p;},faceAway(){const h=S.h(),e=S.eye();h.face=Math.atan2(h.pos.x-e.x,h.pos.z-e.z);}};
const r=['solo='+G.solo,W.flags.stage,S.h().kind];r
//@@
// коршун: Прошка стреляет, упал — бьёт
const W=ZC.W,F=W.flags,G=ZC.G,D=W.dbg51;const r=[];r.push(S.path([[-4,80],[-3,77]]));ZC.tick(5);ZC.skip();ZC.tick(5);r.push(F.stage,S.to('proshka'));S.walk(8,70);
for(let i=0;i<60*70&&F.stage==='kite';i++){const h=S.h();const mk=W.marks.find(m=>m.active());if(mk&&i%24===0){h.face=Math.atan2(mk.pos.x-h.pos.x,mk.pos.z-h.pos.z);S.tap('skill');}
  if(D.KT.st==='ground'){if(Math.hypot(D.KT.pos.x-h.pos.x,D.KT.pos.z-h.pos.z)>2.3)S.walk(D.KT.pos.x-1.6,D.KT.pos.z,1);h.face=Math.atan2(D.KT.pos.x-h.pos.x,D.KT.pos.z-h.pos.z);if(i%12===0)S.tap('attack');}
  ZC.tick(1);}
r.push('kiteDone='+F.kiteDone,F.stage);ZC.tick(100);if(ZC.G.cine)ZC.skip();ZC.tick(5);r.push(F.stage);r
//@@
// Голова: Потап зовёт всех «Ко мне!», идёт со щитом; в вдох — Йоша под усы и перо
const W=ZC.W,F=W.flags,G=ZC.G,D=W.dbg51,H=ZC.HERO;const r=[];r.push(S.to('potap'));S.tap('call');ZC.tick(30);r.push(S.walk(1,50.5));ZC.tick(3);r.push(F.stage);ZC.skip();ZC.tick(3);r.push(F.stage);
const po=H.potap;S.tap('call');ZC.tick(10);const K=S.key.bind(S);
for(let i=0;i<60*50;i++){ZC.hold('KeyG',true);ZC.hold('KeyW',po.pos.z>39.5);ZC.hold('KeyA',po.pos.x>1.2);ZC.hold('KeyD',po.pos.x<0.8);ZC.tick(1);if(po.pos.z<39.7&&i>60)break;}
['KeyW','KeyA','KeyD'].forEach(k=>ZC.hold(k,false));r.push('potap z='+po.pos.z.toFixed(2),'yosha '+H.yosha.pos.x.toFixed(1)+','+H.yosha.pos.z.toFixed(1));
for(let i=0;i<60*6&&D.HB.ph!=='in';i++)ZC.tick(1);ZC.hold('KeyG',false);r.push(S.to('yosha'));const yo=S.h();
for(let i=0;i<60*3;i++){const tz=38.2,tx=1,B=['KeyA','KeyD','KeyW','KeyS'];ZC.hold(B[2],yo.pos.z>tz+0.15);ZC.hold(B[3],yo.pos.z<tz-0.25);ZC.hold(B[0],yo.pos.x>tx+0.15);ZC.hold(B[1],yo.pos.x<tx-0.15);ZC.tick(1);if(Math.hypot(yo.pos.x-1,yo.pos.z-38.2)<0.3)break;}
['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));r.push('yosha '+yo.pos.x.toFixed(2)+','+yo.pos.z.toFixed(2));S.tap('item');ZC.tick(2);r.push('lit='+yo.lit);
r.push(U.until(()=>F.stage!=='head',6));ZC.tick(120);if(ZC.G.cine)ZC.skip();ZC.tick(5);r.push(F.stage);r
//@@
// залив: Потап светит у A и остаётся; Йоша — через островок, поворачивает B, светит у C; снова Потап — по лучу через залив
const W=ZC.W,F=W.flags,G=ZC.G,H=ZC.HERO;const r=[];r.push(S.to('potap'),S.path([[0.5,30],[1,23]]));ZC.tick(3);ZC.skip();ZC.tick(3);r.push(F.stage);
r.push(S.walk(3.4,19.2,4));S.tap('item');ZC.tick(3);r.push(S.walk(4.2,19.4,3),'litA='+S.h().lit);
r.push(S.to('yosha'),S.path([[2.6,19],[2.8,17.2],[3,14],[3,12.2],[1.8,11.4]]));const y=S.h();y.face=Math.atan2(3-y.pos.x,11-y.pos.z);ZC.tick(2);S.tap('attack');ZC.tick(30);
r.push(S.path([[1.8,10],[3,9.4],[3,5],[3,2.6],[3.2,0.6]]));S.tap('item');ZC.tick(3);r.push('litC='+y.lit,S.walk(4.2,0.7,2));ZC.tick(10);
r.push(S.to('potap'),S.path([[2.8,19],[2.8,17],[3,12.2],[3,11.9]]),S.path([[1.8,11],[2.4,9.6],[3,5],[2.8,2.2]]));ZC.tick(20);r.push(F.stage);ZC.tick(60);if(ZC.G.cine)ZC.skip();ZC.tick(5);r.push(F.stage,'lagoonDone='+F.lagoonDone);r
//@@
// бой, фаза 1: Потап — в кольцо (оставлен), Пелагея с зеркальцем — на линию взгляда спиной к Лиху
const W=ZC.W,F=W.flags,G=ZC.G,B=F.B;const r=[W.warp51('boss1'),F.stage];ZC.tick(30);const L=W.likhos[1];
r.push(S.to('potap'),S.walk(-3.5,-125.4));r.push(S.to('pelageya'),S.walk(0.6,-125.3));S.tap('item');ZC.tick(3);r.push('holder='+W.mir51.holder);
const between=(t)=>{const e=S.eye(),b=ZC.HERO.potap.pos;return [e.x+(b.x-e.x)*t,e.z+(b.z-e.z)*t];};let log=[];
for(let n=0;n<4&&B.refl<3;n++){const r0=B.refl;for(let i=0;i<60*8;i++){if(!L.goal&&!(L.daze>0))break;ZC.tick(1);}
  if(B.refl===2){const e=S.eye();S.path([[e.x+4.5,S.h().pos.z],[e.x+4.5,e.z+5.2],[e.x,e.z+5.2]]);S.faceAway();for(let i=0;i<60*16&&B.refl===r0;i++){S.faceAway();ZC.tick(1);}}
  else{const [x,z]=between(0.45);S.path([[x+4.5,S.h().pos.z],[x+4.5,z],[x,z]]);S.faceAway();for(let i=0;i<60*6&&B.refl===r0;i++){S.faceAway();ZC.tick(1);}}
  log.push('refl='+B.refl);}
r.push(log.join(','),F.stage);r
//@@
// фаза 2: одна овечка прыгает туда-сюда
const W=ZC.W,F=W.flags,G=ZC.G,B=F.B;const r=[];ZC.tick(240);if(ZC.G.cine){ZC.skip();ZC.tick(3);}r.push(F.stage);r.push(S.walk(-3.5,-130.2));
let log=[];for(let n=0;n<16&&B.count<8&&F.stage==='boss2';n++){const h=S.h();const north=h.pos.z>-131.5;const k=north?'KeyW':'KeyS';ZC.hold(k,true);ZC.tick(4);S.tap('jump');ZC.tick(34);ZC.hold(k,false);ZC.tick(50);log.push(B.count);}
r.push('counts='+log.join(','),F.stage);r
//@@
// фаза 3: Прошка щекочет лапу (оставлен с горящим пером), Пелагея — колыбельная
const W=ZC.W,F=W.flags,G=ZC.G,B=F.B;const r=[];ZC.tick(120);if(ZC.G.cine){ZC.skip();ZC.tick(3);}r.push(F.stage);
const gs=W.signs.find(s=>s.item==='gusli'&&s.on&&s.on()&&s.z<-130),ps=W.signs.find(s=>s.item==='pero'&&s.on&&s.on()&&s.z<-130);
r.push(S.to('proshka'),S.walk(ps.x,ps.z));S.tap('item');ZC.tick(3);r.push('lit='+S.h().lit);r.push(S.to('pelageya'),S.walk(gs.x,gs.z));
let log=[];for(let i=0;i<60*80&&F.stage!=='end'&&F.stage!=='bossEnd';i++){if(i%100===0)S.tap('item');if(i%300===0)log.push('s'+B.sleep.toFixed(2)+'c'+B.claw+(B.peek>0?'P':'')+(F.stage==='bossWake'?'W':''));ZC.tick(1);}
r.push(log.join(' '),'stage='+F.stage,'claw='+B.claw);ZC.tick(60);if(ZC.G.cine)ZC.skip();ZC.tick(300);r.push('lv='+ZC.W.levelId);r
