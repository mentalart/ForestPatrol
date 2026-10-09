//@@ wait=1500
// релиз final06: 2-Б «Водяной», мельница (late_99s_k2b_chase.js) — тормоз колеса виден и берётся с прохода:
// Потап нажимает умение у прохода к колесу (≈2 м от тормоза) — колесо держится и не отпускается тут же
// (раньше хватал с 2.3 м, а отпускал дальше 1.7 м — «Отпустил колесо» сразу); круг у тормоза светится, пока колесо не держат;
// подсказка для не-Потапа у колеса; отошёл от тормоза — колесо снова крутится.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{swap:'KeyQ',sk:'KeyE',it:'KeyR',at:'KeyF',j:'Space',B:['KeyA','KeyD','KeyW','KeyS']},{swap:'KeyK',sk:'KeyL',it:'Semicolon',at:'Comma',j:'KeyM',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(KEYS[pi].swap);ZC.tick(6);}return U.act(pi).kind===kind;};
// в погоне камера впереди, лицом к героям (W.camYaw=π): «вверх» — к валу, «вниз» — от него; WALK — к точке по повороту камеры (оба игрока — разом, если pts[1])
window.HOLD=(pi,dx,dz)=>{const inv=Math.abs(ZC.W.camYaw)>1,B=KEYS[pi].B;ZC.hold(B[0],inv?dx>0.25:dx<-0.25);ZC.hold(B[1],inv?dx<-0.25:dx>0.25);ZC.hold(B[2],inv?dz>0.25:dz<-0.25);ZC.hold(B[3],inv?dz<-0.25:dz>0.25);};
window.REL=pi=>KEYS[pi].B.forEach(k=>ZC.hold(k,false));
window.WALK2=(pts,max,extra)=>{const n=Math.round((max||8)*60),done=[!pts[0],!pts[1]];let r='TIMEOUT';
  for(let i=0;i<n;i++){for(const pi of[0,1]){if(done[pi])continue;const h=U.act(pi),[x,z]=pts[pi],dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.5){done[pi]=true;REL(pi);continue;}HOLD(pi,dx,dz);if(extra)extra(h,i,pi);}
    if(done[0]&&done[1]){r='t='+(i/60).toFixed(2);break;}ZC.tick(1);}REL(0);REL(1);ZC.tick(1);return r;};
window.WALK=(pi,x,z,max,extra)=>WALK2(pi?[null,[x,z]]:[[x,z],null],max,extra);
window.PATH=(pi,pts,max)=>pts.map(p=>WALK(pi,p[0],p[1],max||6)).join('/');
window.SWIM=(h,i,pi)=>{if(h.grounded&&h.groundRef&&h.groundRef.water&&i%20===0)ZC.press(KEYS[pi].j);};
window.D2=()=>ZC.W.dbg2b();window.st=()=>U.st()+' wave='+D2().WV.z.toFixed(1)+' ck='+D2().WV.ck+' errs='+_errs.length;
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
if(!U.cine(200))throw new Error('нет ролика погони');ZC.tick(5);'chase on'
//@@
const D=D2(),CH=D.CH,MZ=CH.MZ;if(!CH.warp('mill'))throw new Error('нет warp');ZC.tick(5);const r=[ACT(0,'potap'),ACT(1,'pelageya')];
r.push(WALK2([[0,MZ+3.0],[-1,MZ+3.4]],6));ZC.tick(20);const ring=ZC.W.group.children.find(o=>o.geometry&&o.geometry.type==='RingGeometry'&&Math.abs(o.position.z-CH.millHold.z)<0.01);
if(!ring||!ring.visible)throw new Error('круга у тормоза нет: '+st());if(CH.mill.held)throw new Error('колесо держится само: '+st());
const tz=ZC.W.tipZones.find(z=>z.cond(1,U.act(1))),tp=tz?String(tz.text(1)):'';if(!(tp.includes('светящийся круг у тормоза')||tp.includes('встань в круг')))throw new Error('нет подсказки для Пелагеи: '+tp.slice(0,80));
const dd=Math.hypot(U.act(0).pos.x-CH.millHold.x,U.act(0).pos.z-CH.millHold.z);if(dd<1.75||dd>2.3)throw new Error('Потап не у прохода: d='+dd.toFixed(2)+' '+r.join()+' '+st());
U.tap('KeyE');ZC.tick(60);if(!CH.mill.potap||!CH.mill.held)throw new Error('колесо отпущено сразу: d='+dd.toFixed(2)+' '+st());if(ring.visible)throw new Error('круг не погас');
r.push(WALK(0,4.5,MZ+4.5,4));ZC.tick(30);if(CH.mill.potap||CH.mill.held)throw new Error('ушёл — а колесо держится: '+st());
'mill grab d='+dd.toFixed(2)+' tip=ok '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=k2bmill.png
