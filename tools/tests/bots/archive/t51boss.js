//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags;const r=[W.warp51('boss1'),F.stage,U.st()];ZC.tick(60);r.push('act='+U.act(0).kind+','+U.act(1).kind);r
//@@ shot=b51a.png
ZC.tick(5);
//@@
// фаза 1: P1 — в северное кольцо, P2 — зеркальце и на линию взгляда спиной
window.B51={eye(){const L=ZC.W.likhos[1];const p=new THREE.Vector3();L.m.eye.getWorldPosition(p);return p;},
  stand(pi,x,z,max){return U.walkTo(pi,x,z,max||6);},
  faceAway(pi){const h=U.act(pi),e=B51.eye();h.face=Math.atan2(h.pos.x-e.x,h.pos.z-e.z);}};
const W=ZC.W,F=W.flags,B=F.B;const r=[];const L=W.likhos[1];
r.push(U.walkTo(0,-3.5,-125.4,6));r.push('bait='+W.baits.some(b=>Math.hypot(b.x-U.act(0).pos.x,b.z-U.act(0).pos.z)<1.2));
r.push(U.walkTo(1,0.6,-125.3,6));U.tap('Semicolon');ZC.tick(3);r.push('holder='+(W.flags.B&&ZC.W.flags.B&&'?'));r
//@@
const W=ZC.W,F=W.flags,B=F.B;const r=[];const L=W.likhos[1];r.push('refl='+B.refl,'yaw='+L.yaw.toFixed(2),'tgt='+(L.tgt&&L.tgt.kind));
const between=(t)=>{const e=B51.eye(),b=U.act(0).pos;return [e.x+(b.x-e.x)*t,e.z+(b.z-e.z)*t];};
let log=[];for(let n=0;n<3&&B.refl<3;n++){const r0=B.refl;
  // ждём, пока Лихо дойдёт и повернётся
  for(let i=0;i<60*8;i++){if(!L.goal&&!(L.daze>0))break;ZC.tick(1);}
  if(B.refl===2){ // метёт взглядом: встать в 5 м спиной и ждать
    const e=B51.eye();U.path(1,[[e.x+4.5,U.act(1).pos.z],[e.x+4.5,e.z+5.2],[e.x,e.z+5.2]],6);B51.faceAway(1);for(let i=0;i<60*14&&B.refl===r0;i++){B51.faceAway(1);ZC.tick(1);}}
  else{const [x,z]=between(0.45);log.push('go '+x.toFixed(1)+','+z.toFixed(1));U.path(1,[[x+4.5,U.act(1).pos.z],[x+4.5,z],[x,z]],6);B51.faceAway(1);for(let i=0;i<60*6&&B.refl===r0;i++){B51.faceAway(1);ZC.tick(1);}}
  log.push(JSON.stringify(ZC.W.mir51)+' refl='+B.refl+' reflT='+B.reflT.toFixed(2)+' faceOn='+B.faceOn+' yaw='+L.yaw.toFixed(2)+' mode='+L.mode);}
r.push(log.join(' | '),'stage='+F.stage);r
//@@ shot=b51b.png
ZC.tick(5);
//@@
const W=ZC.W,F=W.flags,B=F.B;const r=[F.stage];ZC.tick(240);if(ZC.G.cine){ZC.skip();ZC.tick(3);}r.push(F.stage,'ph='+B.ph,U.st());r
//@@ shot=b51c.png
ZC.tick(5);
//@@
// фаза 2: прыгаем через бревно по очереди
const W=ZC.W,F=W.flags,B=F.B;const r=[];r.push(U.walkTo(0,-5,-130.2,6),U.walkTo(1,-2,-130.2,6));const K=[['KeyW','KeyS','Space'],['ArrowUp','ArrowDown','KeyM']];
let log=[];for(let n=0;n<14&&B.count<8&&F.stage==='boss2';n++){const pi=n%2,h=U.act(pi),k=K[pi];const north=h.pos.z>-131.5;ZC.hold(north?k[0]:k[1],true);ZC.tick(4);ZC.press(k[2]);ZC.tick(34);ZC.hold(k[0],false);ZC.hold(k[1],false);ZC.tick(40);log.push(B.count);}
r.push('counts='+log.join(','),'stage='+F.stage);r
//@@ shot=b51d.png
ZC.tick(5);
//@@
const W=ZC.W,F=W.flags,B=F.B;const r=[F.stage];ZC.tick(120);if(ZC.G.cine){ZC.skip();ZC.tick(3);}r.push(F.stage,'ph='+B.ph,'sleep='+B.sleep.toFixed(2),U.st());r
//@@ shot=b51e.png
ZC.tick(5);
//@@
// фаза 3: P2 — гусли у головы, P1 — перо у лапы
const W=ZC.W,F=W.flags,B=F.B;const r=[];const gs=W.signs.find(s=>s.item==='gusli'&&s.on&&s.on()&&s.z<-130),ps=W.signs.find(s=>s.item==='pero'&&s.on&&s.on()&&s.z<-130);
r.push('gs='+(gs&&gs.x.toFixed(1)+','+gs.z.toFixed(1)),'ps='+(ps&&ps.x.toFixed(1)+','+ps.z.toFixed(1)));
r.push(U.walkTo(1,gs.x,gs.z,6),U.walkTo(0,ps.x,ps.z,6));U.tap('KeyR');ZC.tick(2);r.push('lit='+U.act(0).lit);
let log=[];for(let i=0;i<60*60&&F.stage!=='end'&&F.stage!=='bossEnd';i++){if(i%100===0)ZC.press('Semicolon');if(i%300===0)log.push('s'+B.sleep.toFixed(2)+'c'+B.claw+(B.peek>0?'P':'')+(F.stage==='bossWake'?'W':''));ZC.tick(1);}
r.push(log.join(' '),'stage='+F.stage,'claw='+B.claw);r
//@@ shot=b51f.png
ZC.tick(200);
//@@ shot=b51g.png
ZC.tick(300);
//@@
// сундук: вдвоём разом — крышка поднимается
const W=ZC.W,F=W.flags;const r=[F.stage];if(ZC.G.cine)ZC.skip();ZC.tick(5);r.push(F.stage);const C=W.dbg51.chest.g.position;
for(const pi of[0,1]){U.walkTo(pi,C.x+(pi?1.4:-1.4),C.z+1.3,6);const h=U.act(pi);h.face=Math.atan2(C.x-h.pos.x,C.z-h.pos.z);}U.tap('KeyF');ZC.tick(8);U.tap('Comma');ZC.tick(60);r.push(F.stage);
if(ZC.G.cine)ZC.skip();ZC.tick(300);r.push(F.stage,'links='+W.links+'/'+W.linkTotal,'nuts='+W.nuts+'/'+W.nutTotal,'lv='+W.levelId);r
