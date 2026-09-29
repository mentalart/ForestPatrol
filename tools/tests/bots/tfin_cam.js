//@@ shot=fin_cam_default.png wait=300
// релиз final04, камера правым стиком: дефолт не меняется, мёртвая зона, нелинейный отклик, разгон и инерция, пределы наклона, инверсия,
// ходьба относительно камеры, общий экран (оба стика, ±55°), сплит (у каждого своя), автовозврат и его прерывание, столкновения, ролик, падение
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(a.map(x=>x&&x.stack?x.stack.slice(0,200):String(x)).join(' '));ce(...a);};}
const C=ZC.FIN.cam,D=ZC.FIN.occ.dbg;C.fdt=1/30;ZC.FIN.occ.fdt=0.05;window.deg=r=>Math.round(r*180/Math.PI*10)/10;
window.hold=(pi,x,y,n)=>{C.stick[pi]={x,y};ZC.tick(n);C.stick[pi]=null;};
window.gsync=()=>{const gl=D.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);return b[0];};
window.pose=()=>{ZC.FIN.occ.frame();gsync();return {p:D.camS.position.clone(),q:D.camS.quaternion.clone()};};
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(150);
const a=pose();C.on=false;const b=pose();C.on=true;const c=pose();
['split='+ZC.G.split,'default same='+(a.p.distanceTo(b.p)<1e-6&&a.p.distanceTo(c.p)<1e-6),'yaw='+deg(C.s.yaw),'errs='+window._errs.length]
//@@
// мёртвая зона и отклик: 0,1 — ничего; 0,5 против 1,0 — примерно (0,35/0,85)² ≈ 0,17
const C=ZC.FIN.cam;hold(0,0.1,0.05,60);const dz=C.s.yaw;ZC.FIN.camReturnAll();ZC.tick(60);
hold(0,0.5,0,20);const y5=C.s.vy;ZC.tick(90);ZC.FIN.camReturnAll();ZC.tick(60);hold(0,1,0,20);const y10=C.s.vy;
// инерция: после отпускания скорость гаснет за ~0,3 с, угол ещё немного доезжает
const yA=C.s.yaw;ZC.tick(6);const vMid=C.s.vy;ZC.tick(40);const yB=C.s.yaw,vEnd=C.s.vy;
['deadzone yaw='+deg(dz),'ratio 0.5/1.0='+(y5/y10).toFixed(2),'v full='+deg(y10)+'°/s','coast='+deg(yB-yA)+'°','v after 0.1s='+deg(vMid),'v end='+deg(vEnd)]
//@@ shot=fin_cam_shared_yaw.png wait=300
// общий экран: поворот не больше ±55°, оба стика складываются
const C=ZC.FIN.cam;ZC.FIN.camReturnAll();ZC.tick(60);hold(0,1,0,120);const lim=C.s.yaw;hold(1,-1,0,30);const back2=C.s.yaw;ZC.tick(40);ZC.FIN.occ.frame();
['shared yaw limit='+deg(lim),'p2 turns back='+(back2>lim),'pos cam='+ZC.FIN.occ.dbg.camS.position.toArray().map(v=>v.toFixed(1))]
//@@ shot=fin_cam_pitch.png wait=300
// наклон: −10° … +50°, стик вверх — камера ниже (смотрит вверх), инверсия переворачивает
const C=ZC.FIN.cam,S=ZC.FIN.set;ZC.FIN.camReturnAll();ZC.tick(60);hold(0,0,1,150);const pMax=C.s.pitch;hold(0,0,-1,200);const pMin=C.s.pitch;
S.camInvY=true;ZC.FIN.camReturnAll();ZC.tick(60);hold(0,0,1,20);const inv=C.s.pitch;S.camInvY=false;S.camInvX=true;ZC.FIN.camReturnAll();ZC.tick(60);hold(0,1,0,20);const invx=C.s.yaw;S.camInvX=false;
ZC.FIN.camReturnAll();ZC.tick(60);hold(0,0,1,150);ZC.tick(30);
['pitch max='+deg(pMax),'min='+deg(pMin),'invY stick down → '+(inv<0?'ниже':'выше'),'invX stick right → yaw '+(invx>0?'+':'-')]
//@@
// ходьба относительно камеры: повернули общий вид на −40°, «вперёд» (W) ведёт от камеры
const C=ZC.FIN.cam,D=ZC.FIN.occ.dbg,P=ZC.players;ZC.FIN.camReturnAll();ZC.tick(60);hold(0,1,0,22);ZC.tick(40);const yaw=C.s.yaw;ZC.FIN.occ.frame();
const f=new THREE.Vector3(0,0,-1).applyQuaternion(D.camS.quaternion);f.y=0;f.normalize();const h=P[0].heroes[P[0].act],p0=h.pos.clone();ZC.hold('KeyW',true);ZC.tick(40);ZC.hold('KeyW',false);ZC.tick(5);
const mv=h.pos.clone().sub(p0);mv.y=0;const ang=Math.acos(Math.max(-1,Math.min(1,mv.clone().normalize().dot(f))));
['yaw='+deg(yaw),'moved='+mv.length().toFixed(2),'angle to camera forward='+deg(ang)+'°','ok='+(ang<0.2)]
//@@
// сплит: развели героев — автовозврат, дальше у каждого своя камера
const C=ZC.FIN.cam,P=ZC.players,G=ZC.G;hold(0,1,0,20);const before=C.s.yaw,r0=C.returns;
const h0=P[0].heroes[P[0].act],h1=P[1].heroes[P[1].act];let n=0;ZC.hold('KeyA',true);ZC.hold('ArrowRight',true);while(G.splitTarget<0.5&&n<600){ZC.tick(1);n++;}ZC.hold('KeyA',false);ZC.hold('ArrowRight',false);
const r1=C.returns;ZC.tick(45);const mid=C.s.yaw;ZC.tick(30);
hold(0,-1,0,40);ZC.tick(30);
['split after '+n+' ticks','returns +'+(r1-r0),'shared yaw '+deg(before)+' → '+deg(mid)+' → '+deg(C.s.yaw),'p0 yaw='+deg(C.p[0].yaw),'p1 yaw='+deg(C.p[1].yaw),'split='+G.split.toFixed(2),'eff0='+deg(C.effYaw(0)),'eff1='+deg(C.effYaw(1))]
//@@ shot=fin_cam_split.png wait=300
ZC.FIN.occ.frame();gsync();
//@@
// прерывание возврата стиком; слияние — снова возврат
const C=ZC.FIN.cam,P=ZC.players,G=ZC.G;hold(1,1,0,30);const y1=C.p[1].yaw;ZC.FIN.camReturnAll();ZC.tick(10);hold(1,0.6,0,1);const kept=!C.p[1].ret;const y2=C.p[1].yaw;
const r0=C.returns;let n=0;const h0=P[0].heroes[P[0].act],h1=P[1].heroes[P[1].act];ZC.hold('KeyD',true);ZC.hold('ArrowLeft',true);while(G.splitTarget>0.5&&n<900){ZC.tick(1);n++;}ZC.hold('KeyD',false);ZC.hold('ArrowLeft',false);ZC.tick(50);
['interrupted='+kept,'p1 yaw '+deg(y1)+' → '+deg(y2),'merge after '+n+' ticks','returns +'+(C.returns-r0),'p0='+deg(C.p[0].yaw),'p1='+deg(C.p[1].yaw),'shared='+deg(C.s.yaw)]
//@@
// столкновения: стена за повёрнутой камерой — камера подъезжает; у дефолта — нет
const C=ZC.FIN.cam,D=ZC.FIN.occ.dbg,W=ZC.W;ZC.FIN.camReturnAll();ZC.tick(60);ZC.FIN.occ.frame();const L0=D.camS.position.clone();hold(0,1,0,14);ZC.tick(30);ZC.FIN.occ.frame();
const cp=D.camS.position.clone();const look=cp.clone().add(new THREE.Vector3(0,0,-1).applyQuaternion(D.camS.quaternion).multiplyScalar(cp.distanceTo(L0)));
// коробка на полпути от героя к камере
const hp=ZC.players[0].heroes[ZC.players[0].act].pos,mid=hp.clone().lerp(cp,0.6);const m=new THREE.Mesh(new THREE.BoxGeometry(3,6,3),new THREE.MeshLambertMaterial({color:0x777777}));m.position.copy(mid);W.group.add(m);
const bx={minx:mid.x-1.5,maxx:mid.x+1.5,miny:mid.y-3,maxy:mid.y+3,minz:mid.z-1.5,maxz:mid.z+1.5,on:true,mesh:m};W.boxes.push(bx);
const d0=cp.distanceTo(hp);for(let i=0;i<30;i++)ZC.FIN.occ.frame();const d1=D.camS.position.distanceTo(hp);
W.boxes.splice(W.boxes.indexOf(bx),1);W.group.remove(m);for(let i=0;i<60;i++)ZC.FIN.occ.frame();gsync();const d2=D.camS.position.distanceTo(hp);
['cam dist free='+d0.toFixed(1),'with wall='+d1.toFixed(1),'after='+d2.toFixed(1),'pulled in='+(d1<d0-1)]
//@@
// падение и ролик — к дефолту
const C=ZC.FIN.cam,P=ZC.players;hold(0,1,0,30);const y0=C.s.yaw;const h=P[0].heroes[P[0].act];h.pos.y=-40;h.vel.set(0,-5,0);let n=0;while(n<200&&!C.s.ret&&Math.abs(C.s.yaw)>0.001){ZC.tick(1);n++;}ZC.tick(50);const yf=C.s.yaw;
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.FIN.boss4b.auto=false;ZC.tick(30);ZC.skip();ZC.tick(20);hold(0,1,0,30);const y1=C.s.yaw;ZC.FIN.boss4bStage(1);ZC.tick(50);const inCine=!!ZC.G.cine,yc=C.s.yaw;ZC.skip();ZC.tick(5);
['fall: '+deg(y0)+' → '+deg(yf),'cine start: '+deg(y1)+' → '+deg(yc)+' (cine='+inCine+')','errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
//@@
// одиночный режим: общий экран, полный круг, стик любого джойстика
const C=ZC.FIN.cam;ZC.setSolo(true);ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(60);
hold(1,1,0,90);const y=C.s.yaw;ZC.setSolo(false);
['solo yaw='+deg(y)+' (больше 55° — полный круг)','split='+ZC.G.split,'errs='+window._errs.length]
