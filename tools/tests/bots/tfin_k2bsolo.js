//@@ wait=1500
// релиз final06: 2-Б «Водяной» в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша): погоня вдвое длиннее
// (late_99s_k2b_chase.js) — камера лицом к героям (клавиши по экрану), вал медленнее; котёнок; дуб — Потап; мельница — Потап держит колесо,
// сменил героя — оставленный держит; Пелагея на тормозную плиту, оставлена — держит, Потап переходит; кувшинки и ручей — гусли; развилка —
// Прошка по уступу к рычагу; камыш — Йоша; лодка — руль и гребок одним игроком; плетень — одна верёвка за двоих; к омуту — бой начался.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));window.me=()=>U.me();window.toKind=k=>U.toKind(k);
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    const inv=Math.abs(ZC.W.camYaw)>1;ZC.hold(B0[0],inv?dx>0.25:dx<-0.25);ZC.hold(B0[1],inv?dx<-0.25:dx>0.25);ZC.hold(B0[2],inv?dz>0.25:dz<-0.25);ZC.hold(B0[3],inv?dz<-0.25:dz>0.25);if(extra)extra(me(),i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.path=(pts,max)=>pts.map(p=>go(p[0],p[1],max||6)).join('/');
window.SWIM=(h,i)=>{if(h.grounded&&h.groundRef&&h.groundRef.water&&i%20===0)ZC.press('Space');};
window.D2=()=>ZC.W.dbg2b();window.st=()=>U.st()+' wave='+D2().WV.z.toFixed(1)+' ck='+D2().WV.ck+' errs='+_errs.length;
if(!U.cine(200))throw new Error('нет ролика погони');ZC.tick(5);'solo='+ZC.G.solo+' wave='+D2().WV.z.toFixed(1)
//@@
// деревня, котёнок, дуб
const D=D2(),F=ZC.W.flags;toKind('potap');const r=[go(-1.5,183,8),go(0,168.2,8)];U.tap('KeyE');ZC.tick(20);if(!F.oak)throw new Error('дуб не поднят: '+r.join()+' '+st());if(!F.kitten)throw new Error('котёнок: '+st());
'oak kitten='+F.kitten+' '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@
// мельница: Потап держит колесо → Пелагея по лопастям на тормозную плиту (оставлена — держит) → Потап переходит
const D=D2(),CH=D.CH,MZ=CH.MZ;const r=[go(2.6,MZ+2.7,8)];U.tap('KeyE');ZC.tick(30);if(!CH.mill.potap)throw new Error('Потап не держит: '+r.join()+' '+st());
r.push(toKind('pelageya'),path([[0,MZ+2],[0,MZ-2.4],[2.6,MZ-2.9]],6));ZC.tick(10);if(!CH.millPlate.pressed)throw new Error('плита: '+r.join()+' '+st());
r.push(toKind('potap'),path([[0.2,MZ+2.4],[0.2,MZ-2.6],[-1.5,MZ-4.6]],7));ZC.tick(10);if(!CH.millDone)throw new Error('мельница не пройдена: '+r.join()+' '+st());'mill '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@
// кувшинки и ручей — гусли Потапа
const D=D2(),CH=D.CH;const r=[go(-5.2,CH.LZ0+2.5,8)];ZC.press('KeyR');ZC.tick(140);r.push(go(0,CH.LZ1-1.6,8));if(!CH.lilyDone)throw new Error('пруд: '+r.join()+' '+st());
r.push(go(-6.2,112.6,8));ZC.press('KeyR');ZC.tick(130);if(D.STR.state!=='high')throw new Error('ручей не в приливе: '+st());r.push(go(-2,102.4,10,SWIM));if(!CH.streamDone)throw new Error('не переплыл: '+r.join()+' '+st());
'lily+stream '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@
// развилка: Прошка по уступу к рычагу шлюза; камыш — Йоша
const D=D2(),F=ZC.W.flags,CH=D.CH;const r=[toKind('proshka'),path([[-4.1,97.4],[-4.1,92.4],[-2.8,CH.FZ0-11]],7)];me().face=Math.atan2(-1.9-me().pos.x,(CH.FZ0-11)-me().pos.z);ZC.press('KeyF');ZC.tick(20);
if(!F.sluice)throw new Error('шлюз: '+r.join()+' '+st());r.push(path([[-4.1,CH.FZ1+5.6],[-4.1,CH.FZ1+0.6],[-1,CH.FZ1-2]],7));if(!CH.forkDone)throw new Error('развилка: '+r.join()+' '+st());
r.push(path([[0,CH.RZ+3],[0.6,CH.RZ-5.4]],6),toKind('yosha'));me().face=0;U.tap('KeyE');ZC.tick(40);if(!F.reeds)throw new Error('камыш: '+r.join()+' '+st());'fork+reeds '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@
// лодка Садко: руль (A/D) и гребок (R) — одним игроком; обрыв
const D=D2(),F=ZC.W.flags,CH=D.CH,B=CH.boat;const r=[path([[0,CH.BZ0+0.8],[0,B.z]],6)];ZC.tick(10);if(!B.on)throw new Error('лодка не отплыла: '+r.join()+' '+st());let rows=0,i=0;
for(;i<60*20&&F.boat!==2;i++){const nx=CH.snags.filter(s=>!s.hit&&s.z<B.z&&s.z>B.z-7).sort((a,b)=>b.z-a.z)[0];let tx=0;if(nx)tx=nx.x>0?nx.x-3.2:nx.x+3.2;tx=Math.max(-4.4,Math.min(4.4,tx));
  ZC.hold('KeyA',tx>B.x+0.3);ZC.hold('KeyD',tx<B.x-0.3);if(i%24===0){ZC.press('KeyR');rows++;}ZC.tick(1);}
rel();if(F.boat!==2)throw new Error('лодка не долетела: '+st());'boat t='+(i/60).toFixed(1)+' rows='+rows+' bumps='+CH.snags.filter(s=>s.hit).length
//@@
// плетень: одна верёвка за двоих; к омуту — ролик и бой (весь бой одним игроком — tfin_k2bbosssolo)
const D=D2(),F=ZC.W.flags;const r=[go(-5.2,18.2,6)];me().face=Math.PI;U.tap('KeyF');ZC.tick(20);if(!F.gate)throw new Error('плетень: '+r.join()+' '+st());r.push(go(0,9.6,6));ZC.tick(20);
if(!F.chaseDone)throw new Error('погоня не кончилась: '+r.join()+' '+st());if(!U.cine(200))throw new Error('нет ролика у омута');ZC.tick(30);if(F.phase!==1||D2().S1.st!=='circle')throw new Error('бой не начался: '+F.phase);
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-B solo chase+start ok '+r.join()+' errs=0'
//@@ shot=k2bs_boss.png
ZC.tick(2);'ok'
