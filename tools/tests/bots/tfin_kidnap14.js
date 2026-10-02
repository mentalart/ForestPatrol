//@@ wait=1500
// релиз final06: 1-4 «Леший водит» (late_99b_kidnap14.js) — шапки из мха сидят на кости головы и не плавают; ролик «Пелагею увели»:
// Пелагея на тропе, ёлки за спиной открывают глаза, обступают, кружат хороводом, вихрем уносят её через изгородь в кольцо.
// Проверки: шапки на голове (в ходьбе — вместе с головой, у Прошки «на нос» — на голове, не провалилась); по ходу ролика —
// Пелагея на тропе, ёлки рядом с ней, глаза, хоровод и вихрь, полёт над изгородью, приземление в центре кольца, ёлки на местах,
// коллизии кольца и изгороди; вырез late_88 после ролика включён; пропуск посреди вихря — всё на местах; без ошибок.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.SNAP=()=>{ZC.FIN.occ.frame();const gl=ZC.FIN.occ.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.T=t=>{for(let i=0;i<6000&&ZC.G.cine&&ZC.G.cine.t<t;i++){ZC.tick(1);if(i%6==0&&ZC.FIN.ui)ZC.FIN.ui(0.1);}SNAP();return ZC.G.cine?+ZC.G.cine.t.toFixed(2):-1;};
const V3=window.THREE.Vector3;
// шапка на голове: родитель — кость головы (у Йоши — тело), центр шапки над головой не дальше 0,45 м по горизонтали и выше её центра
window.HAT=h=>{const hat=h.hat,hp=new V3(),bp=new V3();hat.getWorldPosition(hp);const head=h.kind==='yosha'?h.body:h.rig.head;head.getWorldPosition(bp);
  return {par:hat.parent===head,vis:hat.visible,dxz:+Math.hypot(hp.x-bp.x,hp.z-bp.z).toFixed(3),dy:+(hp.y-bp.y).toFixed(3),y:+hat.position.y.toFixed(3)};};
ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
'cine='+!!ZC.G.cine
//@@ shot=k14_hats.png
T(4.3);const H=ZC.HERO,r={};for(const k of['potap','pelageya','yosha'])r[k]=HAT(H[k]);
for(const k in r){const q=r[k];if(!q.par||!q.vis||q.dxz>0.45||q.dy<-0.05)throw new Error('шапка '+k+' не на голове: '+JSON.stringify(q));}JSON.stringify(r)
//@@
// в ходьбе шапка идёт вместе с головой: смещение от кости головы не меняется
ZC.skip();ZC.tick(20);U.tap('Digit1');U.tap('Digit0');const pe=ZC.HERO.pelageya,d=[];const q0=HAT(pe);for(let i=0;i<40;i++){ZC.hold('ArrowUp',true);ZC.tick(3);const q=HAT(pe);d.push(Math.abs(q.dy-q0.dy)+Math.abs(q.dxz-q0.dxz));}ZC.hold('ArrowUp',false);
const dm=Math.max(...d);if(dm>0.02)throw new Error('шапка Пелагеи плавает относительно головы: '+dm.toFixed(3));'walk drift='+dm.toFixed(4)
//@@
const r=[U.walkTo(0,-2,-12,4),U.walkTo(1,2,-12,4),U.walkTo(0,-2,-22.6,6)];U.act(0).pos.set(-2,0,-23.7);let n=0;while(!ZC.G.cine&&n<300){ZC.tick(1);n++;}
if(!ZC.G.cine||Math.abs(ZC.G.cine.dur-25.5)>0.01)throw new Error('ролик «Пелагею увели» не начался');window.K=ZC.FIN.k14Dbg();window.PE=ZC.HERO.pelageya;
window.RING=()=>ZC.W.cyls.filter(c=>Math.abs(c.r-0.72)<1e-6);'cine '+ZC.G.cine.dur+' occ='+ZC.FIN.occ.on
//@@ shot=k14_k1_path.png
T(1.2);const S={x:1.3,z:-26.2},d=Math.hypot(PE.pos.x-S.x,PE.pos.z-S.z);if(d>0.3)throw new Error('Пелагея не на тропе: '+PE.pos.x.toFixed(2)+','+PE.pos.z.toFixed(2));
if(ZC.FIN.occ.on)throw new Error('в ролике вырез late_88 не выключен');'pe on path d='+d.toFixed(2)
//@@ shot=k14_k2_eyes.png
T(5.3);const on=K.dis.length===8&&K.flies.some(q=>q.m.visible);if(!on)throw new Error('нет ёлок/светлячков');'t=5.3 flies'
//@@ shot=k14_k3_whirl.png
T(7.4);const S={x:1.3,z:-26.2},dm=Math.max(...K.c.ring.map(f=>Math.hypot(f.g.position.x-S.x,f.g.position.z-S.z)));
if(dm>2.8)throw new Error('ёлки не кружат вокруг Пелагеи: до '+dm.toFixed(2)+' м');if(!K.vortex.g.visible)throw new Error('вихря нет');'whirl r<='+dm.toFixed(2)
//@@ shot=k14_k4_top.png
T(8.9)
//@@ shot=k14_k5_carry.png
T(10.6);if(!(PE.pos.x>1.8&&PE.pos.x<7.2&&(PE.extraY||0)>1))throw new Error('Пелагею не несёт вихрь: '+PE.pos.x.toFixed(2)+' y+'+(PE.extraY||0).toFixed(2));'carry x='+PE.pos.x.toFixed(2)+' y+'+PE.extraY.toFixed(2)
//@@ shot=k14_k6_land.png
T(12.4)
//@@ shot=k14_k7_ring.png
T(13.4);const RC={x:7.3,z:-33};if(Math.hypot(PE.pos.x-RC.x,PE.pos.z-RC.z)>0.3)throw new Error('Пелагея не в центре кольца');const rr=RING();
if(rr.filter(c=>c.on).length!==8)throw new Error('коллизии кольца не включены: '+rr.filter(c=>c.on).length);if(K.vortex.g.visible)throw new Error('вихрь не убран');
const de=Math.max(...K.c.ring.map(f=>Math.abs(Math.hypot(f.g.position.x-RC.x,f.g.position.z-RC.z)-K.c.RR)));if(de>0.1)throw new Error('ёлки не встали кольцом: '+de.toFixed(2));'ring ok de='+de.toFixed(3)
//@@ shot=k14_k8_hat.png
T(21.9);const q=HAT(ZC.HERO.proshka);if(!q.par||!q.vis)throw new Error('шапка Прошки не на голове: '+JSON.stringify(q));JSON.stringify(q)
//@@
T(99);ZC.tick(30);const H=ZC.HERO,q=HAT(H.proshka);if(ZC.G.cine)throw new Error('ролик не закончился');
if(!q.par||!q.vis||q.dxz>0.45||q.dy<-0.05)throw new Error('шапка Прошки «на нос» провалилась: '+JSON.stringify(q));
if(!H.pelageya.inRing||ZC.W.flags.stage!=='rescue')throw new Error('после ролика Пелагея не в кольце');if(!ZC.FIN.occ.on)throw new Error('вырез late_88 не включён после ролика');
'proshka hat '+JSON.stringify(q)+' stage='+ZC.W.flags.stage
//@@
// пропуск посреди вихря: Пелагея в кольце, ёлки на местах, изгородь с коллизиями, вихрь убран
ZC.startFrom(ZC.LV('1-4'));ZC.tick(30);ZC.skip();ZC.tick(20);U.act(0).pos.set(-2,0,-23.7);let n=0;while(!ZC.G.cine&&n<300){ZC.tick(1);n++;}window.K=ZC.FIN.k14Dbg();window.PE=ZC.HERO.pelageya;
T(10.4);ZC.skip();ZC.tick(5);const RC={x:7.3,z:-33};const rr=RING();
if(ZC.G.cine)throw new Error('пропуск не сработал');if(Math.hypot(PE.pos.x-RC.x,PE.pos.z-RC.z)>0.3||(PE.extraY||0)>0.01)throw new Error('после пропуска Пелагея не в кольце');
if(rr.filter(c=>c.on).length!==8||K.vortex.g.parent)throw new Error('после пропуска кольцо/вихрь не на местах');if(!ZC.FIN.occ.on)throw new Error('после пропуска вырез late_88 выключен');
'skip ok · errs='+_errs.length+(_errs[0]?' '+_errs[0]:'')
//@@
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'errs=0'
