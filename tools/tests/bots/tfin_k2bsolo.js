//@@ wait=1500
// релиз final06: 2-Б «Водяной» в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// «Погоня Водяного» — камера лицом к героям (клавиши по экрану), вал медленнее; Потап поднимает дуб, прилив у ручья и вплавь, «Ко мне!», Йоша поливает гребешок, одна верёвка
// за двоих; у омута — прежний бой одним игроком (фазы, пузырь из рогатки, мах).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(4);}return me().kind;};
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    const inv=Math.abs(ZC.W.camYaw)>1;ZC.hold(B0[0],inv?dx>0.25:dx<-0.25);ZC.hold(B0[1],inv?dx<-0.25:dx>0.25);ZC.hold(B0[2],inv?dz>0.25:dz<-0.25);ZC.hold(B0[3],inv?dz<-0.25:dz>0.25);if(extra)extra(h,i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.SWIM=(h)=>{if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('Space');};
window.callAll=(near)=>{U.tap('Digit1');for(let i=0;i<60*12;i++){ZC.tick(1);if(i>60&&['proshka','potap','pelageya','yosha'].every(k=>Math.hypot(H[k].pos.x-me().pos.x,H[k].pos.z-me().pos.z)<(near||6)))return 't='+(i/60).toFixed(1);if(i%240===239)U.tap('Digit1');}return 'TIMEOUT';};
window.CINE=(max)=>{let t=0;while(!ZC.G.cine&&t<(max||300)){ZC.tick(1);t++;}const was=!!ZC.G.cine;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}return was;};
window.SBRAWL=function(max,list){const n=Math.round((max||30)*60);const B=['KeyA','KeyD','KeyW','KeyS'];   // бой одним героем (в одиночку обе раскладки ведут одного героя — U.brawl тут мешает сам себе)
  for(let i=0;i<n;i++){const alive=(list||ZC.W.enemies).filter(e=>e.alive);if(!alive.length){B.forEach(k=>ZC.hold(k,false));return 'cleared t='+(i/60).toFixed(1);}
    const h=me();let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}
    const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z;const far=bd>1.9+e.r&&!(e.state==='wind'&&e.tgt===h);B.forEach(b=>ZC.hold(b,false));
    if(far){const inv=Math.abs(ZC.W.camYaw)>1;ZC.hold(B[0],inv?dx>0.3:dx<-0.3);ZC.hold(B[1],inv?dx<-0.3:dx>0.3);ZC.hold(B[2],inv?dz>0.3:dz<-0.3);ZC.hold(B[3],inv?dz<-0.3:dz>0.3);}
    const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo)ZC.press('KeyG');
    const w=alive.find(x=>x.state==='wind'&&x.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press('ShiftLeft');}else if(left<0.16&&w.left===null)ZC.press('KeyG');}
    if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0||(e.shell&&(i%12===0)))){h.face=Math.atan2(dx,dz);if(i%9===0)ZC.press('KeyF');}
    ZC.tick(1);}
  B.forEach(k=>ZC.hold(k,false));return 'TIMEOUT alive='+(list||ZC.W.enemies).filter(e=>e.alive).map(e=>e.kind+':'+e.state+':'+e.embers).join(',');};
window.st=()=>U.st()+' errs='+_errs.length;
if(!CINE(200))throw new Error('нет ролика погони');ZC.tick(5);'solo='+ZC.G.solo+' wave='+ZC.W.dbg2b().WV.z.toFixed(1)
//@@
// погоня: дуб, ручей, «Ко мне!», гребешок, верёвка
const D=ZC.W.dbg2b();toKind('potap');const r=[go(0,59.8,8)];U.tap('KeyE');ZC.tick(20);if(!D.F.oak)throw new Error('дуб не поднят: '+r.join()+' '+st());
r.push(go(-6.2,46.6,6));U.tap('KeyR');ZC.tick(130);if(D.STR.state!=='high')throw new Error('ручей не в приливе: '+st());r.push(go(-2,36.4,8,SWIM));if(!(me().pos.z<37.6&&me().pos.y>0.6))throw new Error('не переплыл: '+r.join()+' '+st());
r.push(callAll(8));toKind('yosha');r.push(go(0,33,5),go(0.6,24.6,6));me().face=0;U.tap('KeyE');ZC.tick(40);if(!D.F.reeds)throw new Error('камыш не вырос: '+r.join()+' '+st());
r.push(go(-5.2,18.2,6));me().face=Math.PI;U.tap('KeyF');ZC.tick(20);if(!D.F.gate)throw new Error('плетень: '+r.join()+' '+st());r.push(go(0,9.6,6));ZC.tick(20);if(!D.F.chaseDone)throw new Error('погоня не кончилась: '+r.join()+' '+st());
'chase solo '+r.join()+' wave='+D.WV.z.toFixed(1)+' ck='+D.WV.ck
//@@
// у омута: ролик — новый бой начался (весь бой одним игроком — tfin_k2bbosssolo)
if(!CINE(200))throw new Error('нет ролика у омута');ZC.tick(30);const F=ZC.W.flags,D2=ZC.W.dbg2b();if(F.phase!==1||!D2.BS.ride)throw new Error('бой не начался: '+F.phase);
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-B solo chase+start ok errs=0'
