//@@ wait=1500
// релиз final06: 2-5 «Китеж звонит» — новые участки в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// мосты-призраки — Прошка звонит и остаётся доигрывать, Потап идёт по правому мосту, за провалом звонит и остаётся, Пелагея и Йоша —
// по левому, «Ко мне!» — подтягиваются остальные; Светлояр — Пелагея оставлена на Феврониином камне, Йоша идёт по отражению;
// напев Садко — четверо у четырёх раковин, Q и гусли по порядку; главный колокол — язык и «Бом». Проверка: всё проходится одним игроком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-5'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(4);}return me().kind;};
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);if(extra)extra(h,i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.path=(pts,max)=>{const out=[];for(const [x,z] of pts){const h=me();const L=Math.hypot(x-h.pos.x,z-h.pos.z),n=Math.max(1,Math.ceil(L/0.7)),x0=h.pos.x,z0=h.pos.z;for(let i=1;i<=n;i++){const q=go(x0+(x-x0)*i/n,z0+(z-z0)*i/n,max||3);if(q==='TIMEOUT')return 'TIMEOUT@'+me().pos.x.toFixed(1)+','+me().pos.z.toFixed(1);}}return 'ok';};
window.callAll=(near)=>{U.tap('Digit1');for(let i=0;i<60*12;i++){ZC.tick(1);if(i>60&&['proshka','potap','pelageya','yosha'].every(k=>Math.hypot(H[k].pos.x-me().pos.x,H[k].pos.z-me().pos.z)<(near||6)))return 't='+(i/60).toFixed(1);if(i%240===239)U.tap('Digit1');}return 'TIMEOUT';};
window.CINE=(max)=>{let t=0;while(!ZC.G.cine&&t<(max||300)){ZC.tick(1);t++;}const was=!!ZC.G.cine;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}return was;};
window.st=()=>U.st()+' errs='+_errs.length;
'solo='+ZC.G.solo
//@@
// мосты: Прошка звонит и остаётся; Потап — по правому; за провалом звонит и остаётся; Пелагея и Йоша — по левому; «Ко мне!»
const D=ZC.W.warp25('ghost');ZC.tick(5);CINE(200);ZC.tick(20);toKind('proshka');const r=[go(-6.4,-77.6,6)];U.tap('KeyR');ZC.tick(4);toKind('potap');if(!H.proshka.kwHold)throw new Error('Прошка не доигрывает: '+st());
r.push(go(4.6,-79.6,8),go(4.6,-99.6,10));if(!(H.potap.pos.z<-98.6&&H.potap.pos.y>5))throw new Error('Потап не перешёл: '+r.join()+' '+st());
r.push(go(6.4,-100.8,4));U.tap('KeyR');ZC.tick(4);toKind('pelageya');if(!H.potap.kwHold||!D.brL.solid)throw new Error('Потап не держит левый мост: '+st());
r.push(go(-4.6,-80.4,6),go(-4.6,-99.6,8));toKind('yosha');r.push(go(-4.6,-80.4,6),go(-4.6,-99.6,8));if(!(H.pelageya.pos.z<-98.6&&H.yosha.pos.z<-98.6&&H.yosha.pos.y>5))throw new Error('Пелагея/Йоша не перешли: '+r.join()+' '+st());
r.push(callAll(5));if(!['proshka','potap'].every(k=>H[k].pos.z<-98&&H[k].pos.y>5))throw new Error('не подтянулись: '+r.join()+' '+st());'bridges solo '+r.join()
//@@
// Светлояр: Пелагея на Феврониином камне (оставлена); Йоша — по отражению; «Ко мне!» на том берегу
const D=ZC.W.dbg25();toKind('pelageya');const r=[go(-6.6,-100.6,6)];toKind('yosha');ZC.tick(30);if(!D.F.look)throw new Error('камень не кажет: '+st());
r.push(go(-1.5,-101.6,6),path(D.STN.filter(s=>!s.side).map(s=>[s.x,s.z]).concat([[1.6,-121]]),4));if(!(me().pos.z<-120.2&&me().pos.y>5))throw new Error('Йоша не прошла: '+r.join()+' '+st());
r.push(callAll(5));if(!['proshka','potap','pelageya'].every(k=>H[k].pos.z<-119.5&&H[k].pos.y>5))throw new Error('не подтянулись: '+r.join()+' '+st());'lake solo '+r.join()
//@@
// напев Садко: четверо у четырёх раковин, Q и гусли по порядку (жёлтый, синий, розовый, зелёный)
const D=ZC.W.dbg25();const spots={proshka:[-5,-137.3],potap:[5,-137.3],pelageya:[-5,-127.3],yosha:[5,-127.3]};const r=[];
for(const k of['proshka','potap','pelageya','yosha']){toKind(k);const [x,z]=spots[k];r.push(go(x,-122.6,6),go(x,z,8));}
for(const k of['proshka','potap','pelageya','yosha']){toKind(k);ZC.tick(45);U.tap('KeyR');ZC.tick(10);}
if(!D.F.tune)throw new Error('напев не сложился: '+D.TN.i+' '+r.join()+' '+st());CINE(120);ZC.tick(20);if(D.mosC.on)throw new Error('ворота не ушли');'tune solo '+r.join()
//@@
// главный колокол: стычка, язык, вчетвером на «ТРИ» (в одиночку — одна кнопка)
const D=ZC.W.dbg25(),F=D.F;const r=[go(-2,-146.4,8)];ZC.tick(30);if(!D.arena.started)throw new Error('стычка не началась: '+st());
ZC.W.enemies.forEach(e=>{if(e.alive){e.alive=false;ZC.W.group.remove(e.g);}});ZC.tick(60);if(!CINE(300))throw new Error('нет ролика с языком');ZC.tick(20);
const sp=[[0.88,-150.12],[-0.88,-150.12],[-0.88,-151.88],[0.88,-151.88]];const four=()=>[H.proshka,H.potap,H.pelageya,H.yosha].forEach((h,i)=>{h.pos.set(sp[i][0],6.7,sp[i][1]);h.vel.set(0,0,0);});four();ZC.tick(20);
for(let s=0;s<3;s++){for(let i=0;i<300;i++){ZC.tick(1);if(F.cnt&&F.cnt.t>2.05&&F.cnt.t<2.2&&F.cnt.p[0]===null&&F.cnt.p[1]===null){ZC.press('Space');ZC.tick(1);break;}}r.push('sw='+(F.cnt&&F.cnt.sw));ZC.tick(80);four();ZC.tick(10);}
if(!F.bomWait)throw new Error('не раскачали: '+r.join());ZC.tick(60*24);ZC.skip();ZC.tick(100);'bell solo '+r.join()
//@@
if(ZC.W.levelId==='2-5'&&!ZC.G.done['2-5'])throw new Error('уровень не пройден: '+st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-5 solo done errs=0'
