//@@
// @timeout=900
// Битва с Кощеем, пролог «погоня на Горыныче»: механики бега. Рывок от букв и обручей (скорость и поле зрения растут и спадают), цепочка ×1…×5,
// дорожка из букв, жар и жар-режим (удары гасятся), бонусы — оберег (гасит один удар), магнит (буквы летят сами), жар-перо; «впритирку».
// Полёт — клавишами; редкие события (бонус, удар, жар) вызываются через P.dbg().run. Потом то же одним игроком.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.KB=[{B:['KeyA','KeyD','KeyW','KeyS']},{B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
window.PIS=[0,1];
window.MX={sp:0,fov:0,kick:0};
window.START=solo=>{ZC.setSolo(!!solo);E5.goStage(0);ZC.G.manual=true;ZC.tick(20);PIS=solo?[0]:[0,1];
  const P=E5.pro;for(let i=0;i<60*120&&!(P.leg==='forest'&&!ZC.G.cine);i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}
  if(P.leg!=='forest'||!P.on)throw new Error('не дошли до леса: leg='+P.leg+' on='+P.on);return 'лес: z='+P.dbg().GP.z.toFixed(0);};
window.REL=()=>{for(const k of KB)k.B.forEach(b=>ZC.hold(b,false));};
// лететь прямо (руль отпущен) n кадров; пока летим — запоминаем наибольшие скорость, рывок и поле зрения
window.HOME=()=>{const D=E5.pro.dbg();if(D.GP.z<-150)D.GP.z=-90;};   // не уходить из леса: ущелье начинается роликом-уроком, а проверки ждут лес
window.COAST=n=>{REL();const P=E5.pro,D=P.dbg();for(let i=0;i<n;i++){ZC.tick(1);MX.sp=Math.max(MX.sp,D.GV.sp);MX.kick=Math.max(MX.kick,D.GV.kick);MX.fov=Math.max(MX.fov,P.fov);}};
// лес и ущелье: к ближайшему обручу или букве, мимо елей и скал (как в tk5e_prolog)
window.CTRL=()=>{const P=E5.pro,D=P.dbg(),GP=D.GP;let tx=0,ty=(D.YL[0]+D.YL[1])/2;const ahead=(z,a,b)=>GP.z-z>(a==null?-3:a)&&GP.z-z<b;
  const pg=D.pages.filter(p=>p.t>1.1&&ahead(p.s.position.z,4,70)).sort((a,b)=>b.s.position.z-a.s.position.z)[0];if(pg){tx=pg.s.position.x-D.PX;ty=pg.s.position.y-D.PY;}
  const hp=D.hoops.filter(H=>!H.done&&ahead(H.z,1,90)).sort((a,b)=>b.z-a.z)[0];if(hp){tx=hp.u;ty=hp.y-D.PY;}
  const sp=D.spires.filter(s=>s.st>=1&&s.st<9&&ahead(s.z,-3,55));
  if(sp.some(s=>s.wall))ty=D.YL[1];else for(const s of sp)if(Math.abs(tx-s.u)<6||Math.abs(GP.x-s.u)<6){tx=Math.max(-13,Math.min(13,s.u+(GP.x>=s.u?8:-8)));}
  for(const R of D.rocks)if(!R.arch&&ahead(R.z,-3,40)&&Math.abs(tx-R.u)<6)tx=Math.max(-13,Math.min(13,R.u+(GP.x>=R.u?8:-8)));
  const ar=D.rocks.find(R=>R.arch&&ahead(R.z,-3,50));if(ar&&(!hp||hp.z<ar.z-3))ty=D.YL[0];
  const dx=tx-GP.x,dy=ty-GP.y;for(const pi of PIS){const B=KB[pi].B;ZC.hold(B[0],dx<-0.5);ZC.hold(B[1],dx>0.5);ZC.hold(B[2],dy>0.5);ZC.hold(B[3],dy<-0.5);}};
window.FLY=(cond,max)=>{const P=E5.pro,D=P.dbg();for(let i=0;i<(max||60*60);i++){if(cond())return i;if(ZC.G.cine){if(i%3===0)ZC.skip();ZC.tick(1);continue;}if(P.on)CTRL();ZC.tick(1);MX.sp=Math.max(MX.sp,D.GV.sp);MX.kick=Math.max(MX.kick,D.GV.kick);MX.fov=Math.max(MX.fov,P.fov);}
  REL();throw new Error('FLY: не дождались; leg='+P.leg+' z='+D.GP.z.toFixed(0)+' sp='+D.GV.sp.toFixed(1)+' errs='+_errs.slice(0,3).join(' / '));};
CHK(START(false))
//@@
// рывок: скорость растёт и спадает, поле зрения расширяется (руль отпущен: без разгона «вместе» база ≈ 11)
const P=E5.pro,D=P.dbg();COAST(90);const sp0=D.GV.sp;MX.sp=0;MX.fov=0;D.run.kick(14);COAST(60);const spUp=MX.sp,fov=MX.fov;COAST(240);const spEnd=D.GV.sp;
if(!(spUp>sp0+8)||!(fov>4)||!(spEnd<spUp-1))throw new Error('рывок: база='+sp0.toFixed(1)+' наибольшая='+spUp.toFixed(1)+' fov+'+fov.toFixed(1)+' через 5 с='+spEnd.toFixed(1));
CHK('рывок: '+sp0.toFixed(1)+' → '+spUp.toFixed(1)+' м/с, поле зрения +'+fov.toFixed(1)+'°, потом '+spEnd.toFixed(1))
//@@
// цепочка: три подряд — ×2, обрывается, если долго ничего не ловить
const P=E5.pro,D=P.dbg();P.chain=0;P.chainT=0;D.run.chainUp(1);D.run.chainUp(1);const m1=D.run.mult();D.run.chainUp(1);const m2=D.run.mult();
if(m1!==1||m2!==2||!(P.chainT>3))throw new Error('цепочка: ×'+m1+' → ×'+m2+' chainT='+P.chainT);
const t0=P.chainT,c0=P.chain;COAST(30);if(P.chain===c0&&!(P.chainT<t0-0.3))throw new Error('таймер цепочки стоит: '+t0+' → '+P.chainT);
P.chainT=0.001;P.chain=5;COAST(1);if(P.chain>2)throw new Error('цепочка не оборвалась по таймеру: '+P.chain);CHK('цепочка: ×'+m1+' → ×'+m2+', таймер идёт, по его концу обрывается')
//@@
// дорожка из букв: Кощей рассыпает тетрадь — буквы вылетают из тучи и ложатся рядом
const P=E5.pro,D=P.dbg(),n0=D.pages.length;D.run.trailSpawn();const n1=D.pages.length;COAST(60*2);const ready=D.pages.filter(p=>p.t>1.1).length;
if(n1-n0<6||ready<4)throw new Error('дорожка: букв добавлено '+(n1-n0)+', легло '+ready);CHK('дорожка: +'+(n1-n0)+' букв, легло '+ready)
//@@
// настоящий полёт: до двух обручей и нескольких букв — рывок заметен, очки и цепочка растут; потом ещё немного — бонусы сами появляются в мире
const P=E5.pro,D=P.dbg();HOME();MX.sp=0;MX.kick=0;MX.fov=0;P.hoops=0;P.score=0;const t=FLY(()=>P.hoops>=2&&P.got>=3,60*50);
if(MX.sp<20||MX.fov<4||P.score<=0)throw new Error('полёт: наибольшая скорость '+MX.sp.toFixed(1)+' fov+'+MX.fov.toFixed(1)+' очки '+P.score+' обручей '+P.hoops+' букв '+P.got);
CHK('полёт '+(t/60).toFixed(0)+' с: наибольшая скорость '+MX.sp.toFixed(1)+' м/с, рывок '+MX.kick.toFixed(1)+', fov+'+MX.fov.toFixed(1)+'°, очки '+P.score+', обручей '+P.hoops+', букв '+P.got+', цепочка ×'+D.run.mult())
//@@ shot=k5e_runner_boost.png
ZC.tick(1);
//@@
// оберег: подобрать — следующий удар мимо (цепочка цела), второй — настоящий
const P=E5.pro,D=P.dbg();HOME();ZC.tick(1);const f=D.run.fp();REL();P.hyper=0;P.heat=0;P.ward=0;P.chain=4;P.chainT=3;D.run.bonusMake('ward',D.GP.x,f.y,f.z-2.5);COAST(6);
if(P.ward!==1)throw new Error('оберег не подобран: ward='+P.ward+' bonus='+P.bonus);
const h0=P.hits,c0=P.chain;D.run.bump('тест');if(P.hits!==h0||P.ward!==0||P.wards<1||P.chain!==c0||c0<4)throw new Error('оберег не выдержал удар: hits '+h0+'→'+P.hits+' ward='+P.ward+' chain '+c0+'→'+P.chain);
D.run.bump('тест');if(P.hits!==h0+1||P.chain!==0)throw new Error('второй удар обязан быть настоящим: hits '+P.hits+' chain='+P.chain);CHK('оберег: один удар мимо, второй — настоящий (ударов '+P.hits+')')
//@@
// магнит: буквы летят к Горынычу сами — руль отпущен, а буквы собираются
const P=E5.pro,D=P.dbg();HOME();ZC.tick(1);const f=D.run.fp();REL();P.hyper=0;P.magnet=0;D.run.bonusMake('magnet',D.GP.x,f.y,f.z-2.5);COAST(6);if(!(P.magnet>8))throw new Error('магнит не подобран: '+P.magnet);
const g0=P.got;D.run.trailSpawn();COAST(60*8);if(P.got-g0<3)throw new Error('магнит: собрано всего '+(P.got-g0)+' букв');CHK('магнит: собрано '+(P.got-g0)+' букв без руля')
//@@ shot=k5e_runner_hyper.png
// жар-режим на кадре: оранжевый шар вокруг Горыныча, кайма по краям, шкала слева
const P=E5.pro,D=P.dbg();HOME();ZC.tick(1);REL();P.hyper=0;P.ward=0;P.heat=0.95;D.run.heatUp(0.1);COAST(40);if(!(P.hyper>0))throw new Error('жар-режим не включился на кадре: leg='+P.leg);CHK('жар-режим: кадр')
//@@
// жар-перо: жар и рывок; шкала полна — жар-режим: удары гасятся, потом режим кончается и жар сбрасывается
const P=E5.pro,D=P.dbg();HOME();ZC.tick(1);const f=D.run.fp();REL();P.heat=0;P.hyper=0;P.ward=0;D.run.bonusMake('feather',D.GP.x,f.y,f.z-2.5);COAST(6);if(!(P.heat>=0.35))throw new Error('жар-перо: heat='+P.heat+' leg='+P.leg+' hyper='+P.hyper);
D.run.heatUp(1);if(!(P.hyper>5))throw new Error('жар-режим не включился: hyper='+P.hyper+' heat='+P.heat+' leg='+P.leg);
const h0=P.hits;D.run.bump('тест');D.run.bump('тест');if(P.hits!==h0||P.smashed<1)throw new Error('в жар-режиме удар прошёл: hits '+h0+'→'+P.hits);
COAST(60*4);HOME();COAST(60*4);if(P.hyper!==0||P.heat>0.5)throw new Error('жар-режим не кончился: hyper='+P.hyper+' heat='+P.heat);CHK('жар-режим: удары гасятся, кончился сам')
//@@
// «впритирку»: награда — очки, цепочка, жар
const P=E5.pro,D=P.dbg();P.chain=0;P.heat=0;const s0=P.score,n0=P.near;D.run.nearMiss({},'Впритирку!');if(P.near!==n0+1||P.score<=s0||P.chain<1||!(P.heat>0))throw new Error('впритирку: near='+P.near+' score '+s0+'→'+P.score+' chain='+P.chain+' heat='+P.heat);CHK('впритирку: очки '+s0+' → '+P.score)
//@@
// шкала жара видна в полёте, края экрана и поле зрения — тоже
const P=E5.pro,el=document.getElementById('k5eRun'),sp=document.getElementById('k5eSpeed');HOME();ZC.tick(2);
if(!el||el.style.display!=='block'||!/×/.test(el.textContent)||!sp)throw new Error('шкалы нет: '+(el&&el.style.display)+' '+(el&&el.textContent)+' k5eSpeed='+!!sp);CHK('шкала: «'+el.textContent.replace(/\s+/g,' ').slice(0,60)+'»')
//@@
// одним игроком: рывок, бонус, жар-режим — то же
START(true);const P=E5.pro,D=P.dbg();COAST(60);const sp0=D.GV.sp;D.run.kick(14);COAST(24);const spUp=D.GV.sp;
const f=D.run.fp();D.run.bonusMake('ward',D.GP.x,f.y,f.z-2.5);COAST(6);D.run.heatUp(1);
if(!(spUp>sp0+8)||P.ward!==1||!(P.hyper>5))throw new Error('один игрок: '+sp0.toFixed(1)+' → '+spUp.toFixed(1)+' ward='+P.ward+' hyper='+P.hyper);CHK('один игрок: '+sp0.toFixed(1)+' → '+spUp.toFixed(1)+' м/с, оберег и жар-режим')
