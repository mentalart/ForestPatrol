//@@
// релиз: потолок общего экрана на разлёт героев (docs/29_full_audit.md, 7.4; proto/engine/08_zven_tasks_camera.js, CAM_SEP_CAP / CAM_SEP_SPLIT).
// В драке экран не делился даже при разлёте, а камера отъезжала на 0,8 м за каждый метр: при разлёте 20 м Йоша занимал 2,2 % высоты кадра (16 px
// при 720p), а ближний герой уходил за кадр. Теперь в драке отъезд ограничен, а от разлёта 16 м экран делится и в драке.
// Бой — G.fightT (флаг «рядом бой» fightNear), героев ставим прямо по оси уровня.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(60);
U.toKind('yosha',1);ZC.tick(30);
window.BAD=[];window.RES=[];window.A=U.act(0);window.B=U.act(1);
const bx=ZC.W.boxes.filter(b=>b.maxz-b.minz<150&&b.maxx-b.minx<150);window.ZMIN=Math.min(...bx.map(b=>b.minz));window.ZMAX=Math.max(...bx.map(b=>b.maxz));
window.Z0=A.pos.z;window.DIR=(ZMAX-Z0)>(Z0-ZMIN)?1:-1;window.X0=A.pos.x;
window.proj=(h,cam)=>{const t=new THREE.Vector3(h.pos.x,h.pos.y+h.d.height,h.pos.z).project(cam),b=new THREE.Vector3(h.pos.x,h.pos.y,h.pos.z).project(cam);
  return {frac:(t.y-b.y)/2,inView:Math.abs(b.x)<1&&Math.abs(t.y)<1&&Math.abs(b.y)<1&&b.z<1};};
// поставить героев на разлёт sep (A — на месте, B — вдоль оси уровня), fight — держать «бой», прокрутить 5 с и снять кадр
window.scn=(sep,fight)=>{A.pos.set(X0,A.pos.y+0.3,Z0);A.vel.set(0,0,0);B.pos.set(X0,B.pos.y+0.3,Z0+DIR*sep);B.vel.set(0,0,0);
  for(let i=0;i<300;i++){if(fight)ZC.G.fightT=100;ZC.tick(1);}
  ZC.sim(0.05);const cams=ZC.FIN.panesCam(),sp=cams.length>1,cb=sp?cams[1]:cams[0],ca=cams[0];
  const pb=proj(B,cb),pa=proj(A,ca);return {split:sp,fb:pb.frac,fa:pa.frac,inView:pb.inView&&pa.inView,sep:Math.hypot(A.pos.x-B.pos.x,A.pos.z-B.pos.z),fell:B.pos.y<-3||A.pos.y<-3};};
window.chk=(name,ok,info)=>{RES.push(name+': '+info);if(!ok)BAD.push(name+': '+info);};
window.fmt=(r)=>'разлёт '+r.sep.toFixed(1)+' м, '+(r.split?'два экрана':'общий')+', Йоша '+(r.fb*100).toFixed(1)+' % кадра ('+Math.round(r.fb*720)+' px)'+(r.inView?'':', КТО-ТО ЗА КАДРОМ');
'ok'
//@@
// общий экран: Йоша — не мельче 2,2–2,4 % высоты кадра (≈ 16–17 px при 720p; до правки при разлёте 15 м — 2,0 %, при 20 м — 2,2 % и ближний герой за кадром), оба в кадре;
// от разлёта 16 м (в драке) — два экрана, обратно общий — с 12 м
const r8=scn(8,true);chk('бой, разлёт 8 м: общий экран',!r8.fell&&!r8.split&&r8.fb>=0.024&&r8.inView,fmt(r8));
const r15=scn(15,true);chk('бой, разлёт 15 м: общий экран',!r15.fell&&!r15.split&&r15.fb>=0.022&&r15.inView,fmt(r15));
const r20=scn(20,true);chk('бой, разлёт 20 м: экран делится',!r20.fell&&r20.split&&r20.fb>=0.04&&r20.inView,fmt(r20));
const r30=scn(30,true);chk('бой, разлёт 30 м: экран делится',!r30.fell&&r30.split&&r30.fb>=0.04&&r30.inView,fmt(r30));
const r20n=scn(20,false);chk('без боя, разлёт 20 м: два экрана',!r20n.fell&&r20n.split&&r20n.fb>=0.04&&r20n.inView,fmt(r20n));
const r10=scn(10,true);chk('бой, разлёт 10 м: снова общий',!r10.fell&&!r10.split&&r10.fb>=0.024&&r10.inView,fmt(r10));
if(window._errs.length)BAD.push('ошибки консоли: '+window._errs.slice(0,2).join(' | '));
if(BAD.length)throw new Error('FAIL tfin_camcap: '+BAD.join(' ; ')+' · '+RES.join(' · '));
'tfin_camcap ok · '+RES.join(' · ')
