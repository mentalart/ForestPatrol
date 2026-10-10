//@@ wait=1500
// релиз final06: 1-4 — мини-босс Аука в ОДИНОЧНОМ режиме (late_99zg_auka14.js). Герои неуязвимы (проверяется ход боя).
// 1 «Где я?» — аукнуть (зов), к золотому дуплу, отбить «ау-шар», бить оглушённого;
// 2 «Подголоски» — Пелагею оставить у левой стены лицом к ней (держит взглядом), Прошкой распутать лешачат, бить растерявшегося;
// 3 «Большое АУ» — Пелагею оставить на правом пне-эхо; надул щёки — Прошка на левый пень и «Ау!»: зов не снимает Пелагею с пня,
//   оставленная аукает вместе — эхо столкнулось; ролик-дружба, выход.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=31337;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.setSolo(true);ZC.tick(5);ZC.FIN.warp('arena');ZC.tick(10);U.toKind('proshka');
window.A=()=>ZC.W.k14.auka;window.E=()=>A().e;window.INV=()=>{for(const h of Object.values(ZC.HERO))if(h.active)h.iT=Math.max(h.iT||0,0.5);};
window.DEF=(h,i)=>{const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.18);if(bo)ZC.press('KeyG');
  const w=ZC.W.enemies.find(q=>q.alive&&q.state==='wind'&&q.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press('ShiftLeft');}else if(left<0.16&&w.left===null)ZC.press('KeyG');}
  const L=A().leaf;if(L&&L.st==='tele'&&E().tgt===h&&L.t>L.tele-0.25)ZC.press('ShiftLeft');};
window.HIT=(h,t,i)=>{const dx=t.pos.x-h.pos.x,dz=t.pos.z-h.pos.z,d=Math.hypot(dx,dz);if(d>1.9+t.r)U.step(0,t.pos.x,t.pos.z,1.6+t.r);else{U.rel(0);h.face=Math.atan2(dx,dz);if(i%10===0)ZC.press('KeyF');}};
U.goto(0,0,-196,5);ZC.tick(5);const c=!!ZC.G.cine;U.nocine();ZC.tick(10);
['solo='+ZC.G.solo,'cine='+c,'ph='+A().ph,'me='+U.me().kind,A().ph===1?'intro ok':'FAIL intro']
//@@
const r=[];const t0=ZC.G.time;
for(let i=0;i<60*150&&A().ph===1;i++){INV();const e=E(),h=U.me();DEF(h,i);
  if(e.state==='hide'){const m=A().dbg().HL.find(q=>q.markT>0);if(!m){if(i%90===0)ZC.press('Digit1');U.rel(0);}else U.step(0,m.mx,m.mz,0.6);}
  else if(e.dazeT>0||e.state==='broken')HIT(h,e,i);else{const d=Math.hypot(e.pos.x-h.pos.x,e.pos.z-h.pos.z);if(d>5.5)U.step(0,e.pos.x,e.pos.z,5);else U.rel(0);}
  ZC.tick(1);}
U.rel(0);U.nocine();ZC.tick(10);r.push('t='+(ZC.G.time-t0).toFixed(0),'ph='+A().ph,A().ph===2?'phase1 ok':'FAIL phase1 emb='+E().embers);r
//@@
// этап 2: Пелагея оставлена у левой стены лицом к ней
const r=[];const t0=ZC.G.time;U.toKind('pelageya');U.goto(0,-3.6,-203.5,5,0.4);U.me().face=-Math.PI/2;ZC.tick(2);const pe=U.me();U.toKind('proshka');ZC.tick(2);
r.push('keeper='+pe.kind+' f='+pe.following+' @'+pe.pos.x.toFixed(1));let meets=0,lw=0;
for(let i=0;i<60*200&&A().ph===2;i++){INV();const e=E(),h=U.me(),D=A().dbg();DEF(h,i);
  if(e.dazeT>0||e.state==='broken')HIT(h,e,i);
  else{const al=ZC.W.enemies.filter(q=>q.alive&&q.kind==='leshonok'&&q.state!=='spawn');let t=null,bd=99;for(const q of al){const d=Math.hypot(q.pos.x-h.pos.x,q.pos.z-h.pos.z);if(d<bd){bd=d;t=q;}}
    if(t){if(bd>2.1)U.step(0,t.pos.x,t.pos.z,1.8);else{U.rel(0);h.face=Math.atan2(t.pos.x-h.pos.x,t.pos.z-h.pos.z);if(((t.state==='stagger'&&!t.openHit)||t.state==='broken'||t.dazeT>0)&&i%8===0)ZC.press('KeyF');}}else U.rel(0);}
  ZC.tick(1);}
U.rel(0);U.nocine();ZC.tick(10);r.push('t='+(ZC.G.time-t0).toFixed(0),'ph='+A().ph,A().ph===3?'phase2 ok':'FAIL phase2 emb='+E().embers+' lsh='+A().lsh.length);r
//@@
// этап 3: Пелагея на правом пне-эхо, Прошка на «АУ» — на левый пень и зов
const r=[];const t0=ZC.G.time;const ES=A().dbg().ES;U.toKind('pelageya');U.goto(0,ES[1].x,ES[1].z,6,0.5);const pe=U.me();U.toKind('proshka');ZC.tick(2);
r.push('keeper='+pe.kind+' @'+pe.pos.x.toFixed(1)+','+pe.pos.z.toFixed(1));let winds=0,pw=0,daz=0;
for(let i=0;i<60*200&&A().ph===3;i++){INV();const a=A(),e=E(),h=U.me(),D=a.dbg();
  if(D.ring&&h.grounded){const d=Math.hypot(h.pos.x,h.pos.z+205);if(d-D.ring.r>0.2&&d-D.ring.r<0.9)ZC.press('Space');}
  if(a.windT>0){if(pw<=0)winds++;if(U.step(0,ES[0].x,ES[0].z,0.5)&&i%20===0)ZC.press('Digit1');}
  else if(e.dazeT>0||e.state==='broken')HIT(h,e,i);else U.rel(0);
  if(e.dazeT>5&&pw>0)daz++;pw=a.windT;ZC.tick(1);}
U.rel(0);ZC.tick(5);U.nocine();ZC.tick(20);
r.push('winds='+winds,'keeper@'+pe.pos.x.toFixed(1)+','+pe.pos.z.toFixed(1),'t='+(ZC.G.time-t0).toFixed(0),'ph='+A().ph,A().ph===4&&ZC.W.k14.arena.cleared?'phase3 ok':'FAIL phase3 emb='+E().embers);r
//@@
const u=U.goto(0,0,-220,14,0.5);ZC.tick(20);['out '+u,'lv='+ZC.W.levelId,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(ZC.W.flags.out||ZC.W.levelId!=='1-4')&&!_errs.length?'auka14solo ok':'FAIL auka14solo']
