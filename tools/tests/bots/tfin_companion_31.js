//@@ wait=1500
// релиз final06: напарник-бот проходит 3-1 «Сад молодильных яблок» за Игрока 2 (Пелагея или Йоша, одним героем): светомосток и тенемосток, мосток вперемежку (перо меняет в прыжке),
// две дорожки и чаши (роль — по человеку), тёмные аллеи (тени, мотылёк), две яблони у выхода, светомосток в сад, Дед-Садовник и трухлявый мост (яблочки), «передай яблочко» обоими героями,
// спящая стража (перо погашено, струны — прыжком), ступени, тени-воришки, Кощеев Ворон (чаши-солнышки, яблочки), Царь-яблоко и звено. Человека (Игрок 1) играет скрипт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.lit?'*':'');
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.FALLS=()=>ZC.G.stats.falls||0;
window.RESET31=()=>{ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;U.walkTo(0,-1,-2,5);ZC.tick(3);U.nocine();ZC.tick(60);U.nocine();ZC.tick(10);window.H=ZC.HERO;return 'pero='+ZC.W.abil.pero;};
window.WARP=where=>{ZC.FIN.warp(where);ZC.tick(10);for(const h of Object.values(ZC.HERO)){h.following=false;h.lit=false;}ZC.tick(20);};
window.BR0=()=>{const alive=ZC.W.enemies.filter(e=>e.alive);const h=me(),k={g:'KeyG',a:'KeyF',r:'ShiftLeft',B:['KeyA','KeyD','KeyW','KeyS']};k.B.forEach(b=>ZC.hold(b,false));if(!alive.length)return;
  let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,far=bd>1.9+e.r&&!(e.state==='wind'&&e.tgt===h);
  if(far){ZC.hold(k.B[0],dx<-0.3);ZC.hold(k.B[1],dx>0.3);ZC.hold(k.B[2],dz<-0.3);ZC.hold(k.B[3],dz>0.3);}
  const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo)ZC.press(k.g);const w=alive.find(x=>x.state==='wind'&&x.tgt===h);
  if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press(k.r);}else if(left<0.16&&w.left===null)ZC.press(k.g);}
  if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0)){h.face=Math.atan2(dx,dz);if(((window._bi=(window._bi||0)+1)>>1)%9===0)ZC.press(k.a);}};
window.HITV=()=>{const e=ZC.W.voron31&&ZC.W.voron31.e;if(!e||!e.alive)return;const h=me(),k={a:'KeyF',B:['KeyA','KeyD','KeyW','KeyS']};k.B.forEach(b=>ZC.hold(b,false));
  const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,far=Math.hypot(dx,dz)>2.4;if(far){ZC.hold(k.B[0],dx<-0.3);ZC.hold(k.B[1],dx>0.3);ZC.hold(k.B[2],dz<-0.3);ZC.hold(k.B[3],dz>0.3);}
  else{h.face=Math.atan2(dx,dz);if(((window._bi=(window._bi||0)+1)>>1)%9===0)ZC.press(k.a);}};
RESET31();
['pero='+ZC.W.abil.pero,'stage='+F().stage,'bot='+pos(bot()),CO.mode,!!CO.routes['3-1']]
//@@
// светомосток, тенемосток, мосток вперемежку: бот один (человек стоит у входа), перо меняет сам, в прыжке на стыках; ни одного падения
if(!CO.routes['3-1'])throw new Error('нет маршрута 3-1');const f0=FALLS();const L=[];
for(let i=0;i<60*70&&bot().pos.z>-71;i++){ZC.tick(1);if(i%300===0)L.push((i/60).toFixed(0)+'s '+pos(bot())+' '+CO.mode);}
if(bot().pos.z>-71)throw new Error('бот не дошёл до острова: '+pos(bot())+' '+L.join(' | '));if(FALLS()-f0)throw new Error('падения на мостках: '+(FALLS()-f0)+' '+L.join(' | '));
'bridges ok '+pos(bot())+' falls=0'
//@@
// две дорожки: человек со светом — светлой, бот берёт тёмную (чаша-звёзды); оба на чашах — ворота настежь
const f0=FALLS();put(me(),-5,-75);put(bot(),0.5,-73);put(H.potap,1,-72);put(H.yosha,-1,-72);ZC.tick(30);if(!me().lit)U.tap('KeyR');ZC.tick(5);
const r=U.path(0,[[-5,-79],[-5,-84],[5,-96],[5,-104],[5,-108],[6,-109]],6);for(let i=0;i<60*30&&!F().gateOpen;i++){U.step(0,6,-109,0.2);ZC.tick(1);}U.rel(0);
if(!F().gateOpen)throw new Error('ворота не открылись: path='+r+' me='+pos(me())+' bot='+pos(bot())+' role='+CO.k31.role);if(CO.k31.role!=='shadow')throw new Error('роль бота: '+CO.k31.role);
if(FALLS()-f0)throw new Error('падения на дорожках: '+(FALLS()-f0));'paths ok role='+CO.k31.role+' bot='+pos(bot())
//@@
// то же наоборот: человек без света — тёмной дорожкой, бот берёт светлую (чаша-солнце)
RESET31();const f0=FALLS();put(me(),5,-75);put(bot(),0.5,-73);put(H.potap,1,-72);put(H.yosha,-1,-72);ZC.tick(30);if(me().lit)U.tap('KeyR');ZC.tick(5);
const r=U.path(0,[[5,-79],[5,-84],[-5,-96],[-5,-104],[-5,-108],[-6,-109]],6);for(let i=0;i<60*30&&!F().gateOpen;i++){U.step(0,-6,-109,0.2);ZC.tick(1);}U.rel(0);
if(!F().gateOpen)throw new Error('ворота не открылись: path='+r+' me='+pos(me())+' bot='+pos(bot())+' role='+CO.k31.role);if(CO.k31.role!=='light')throw new Error('роль бота: '+CO.k31.role);
if(FALLS()-f0)throw new Error('падения на дорожках: '+(FALLS()-f0));'paths2 ok role='+CO.k31.role+' bot='+pos(bot())
//@@
// тёмные аллеи: человек со светом стоит у входа; бот сам гасит теней (обходит изгородь), мотылёк раскрывается от двух перьев, две яблони, светомосток в сад
RESET31();const f0=FALLS();F().gateOpen=true;F().fight=false;put(me(),0,-124.5);put(bot(),0.8,-109);put(H.potap,1.5,-123);put(H.yosha,-1.5,-123);ZC.tick(30);if(!me().lit)U.tap('KeyR');ZC.tick(5);
const L=[];for(let i=0;i<60*200&&!(bot().pos.z<-167&&F().garden);i++){ZC.tick(1);if(i%900===0)L.push((i/60).toFixed(0)+'s bot='+pos(bot())+' '+CO.mode+' en='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind[0]+e.embers+e.state[0]).join('')+' trees='+ZC.W.trees.filter(t=>t.revived).length);}
if(!F().cleared)throw new Error('аллеи не очищены: '+L.join(' | '));if(!F().garden)throw new Error('яблони не ожили: trees='+ZC.W.trees.filter(t=>t.revived).length+' '+pos(bot()));if(bot().pos.z>-167)throw new Error('бот не перешёл светомосток: '+pos(bot()));
if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0));'alleys ok falls=0 bot='+pos(bot())
//@@
// садовник и трухлявый мост: бот один — яблоня, яблочко, садовник помолодел; яблоня у моста, яблочко, мост
RESET31();WARP('gardener');const f0=FALLS();const L=[];let last='';
for(let i=0;i<60*150&&!F().bridge;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);const m=CO.mode+'/'+F().stage+(bot().apple31?'/apple':'');if(m!==last){L.push((i/60).toFixed(0)+'s '+m);last=m;}}
if(!F().young)throw new Error('садовник не помолодел: '+L.join(' | '));if(!F().bridge)throw new Error('мост не помолодел: '+L.join(' | ')+' '+pos(bot()));'gardener+bridge ok '+pos(bot())
//@@
// передай яблочко: бот сам обоими героями — яблочко с яблони, второй на островок, бросок, на дальний берег, бросок, к дубу; дубок
RESET31();WARP('pass');const f0=FALLS();const L=[];let last='';
for(let i=0;i<60*240&&!F().oak;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);const m='rl'+CO.k31.rl;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
if(!F().oak)throw new Error('дуб не помолодел: '+L.join(' | ')+' apples='+ZC.W.apples31.list.map(a=>a.state).join());if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0)+' '+L.join(' | '));'pass ok falls=0 '+L.length+' states'
//@@
// спящая стража (перо погашено, струны — прыжком), ступени (яблочко), тени-воришки (со светом): бот один
RESET31();WARP('guards');const f0=FALLS();const L=[];let last='';
for(let i=0;i<60*200&&!F().thieves;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);const m=CO.mode+(F().woke?'/WOKE':'');if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
if(F().woke)throw new Error('стража проснулась: woke='+F().woke+' '+L.join(' | '));if(!F().quiet)throw new Error('нет орешка за тишину: '+L.join(' | '));if(!F().steps)throw new Error('ступени не помолодели');
if(!F().thieves)throw new Error('воришки не пойманы: '+F().thiefCount+' '+L.join(' | ')+' '+pos(bot()));if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0));'guards+steps+thieves ok quiet='+F().quiet+' thieves='+F().thiefCount
//@@
// Кощеев Ворон: человек со светом на левой чаше, бот — на правой (оба разом — ослеп и упал); яблочки в Ворона; Царь-яблоко — Жар-птице; звено — выход из уровня
RESET31();WARP('boss');const W=ZC.W,V=W.voron31;const f0=FALLS();const L=[];let pa='';let dazz=0,hits=0;
for(let i=0;i<60*300&&!F().out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}
  const e=V.e;if(V.phase===0)U.step(0,0,-448,0.6);
  else if(V.phase===1){if(e&&(e.dazeT>0||e.state==='broken')){if(!me().lit)U.tap('KeyR');HITV();}else{U.step(0,-7,-462,0.3);if(!me().lit&&Math.hypot(me().pos.x+7,me().pos.z+462)<1)U.tap('KeyR');}}
  else U.rel(0);
  ZC.tick(1);if(V.ai==='fall'&&pa!=='fall')dazz++;pa=V.ai;hits=V.hits;if(i%900===0)L.push((i/60).toFixed(0)+'s ph'+V.phase+' '+V.ai+' '+CO.mode+' bot='+pos(bot())+' hits='+V.hits);}
U.rel(0);if(!F().won)throw new Error('Ворон не побеждён: '+L.join(' | ')+' phase='+V.phase+' stage='+F().stage);if(!F().out)throw new Error('нет выхода из уровня (звено): stage='+F().stage+' '+pos(bot())+' '+L.join(' | '));
if(!hits)throw new Error('яблочки не попали');if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'boss ok dazzled='+dazz+' hits='+hits+' out='+F().out+' errs=0'
