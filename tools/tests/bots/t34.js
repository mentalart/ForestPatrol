//@@
// 3-4 «Летучий корабль» вдвоём, весь полёт: порыв у мачты, бочки, орешки под бортом, ущелье по нарастающей (уступ, высокий уступ, камень — рогаткой,
// теснина, три подряд, камень — мимо, низкая арка — нырок), «держись за мачту», ветры с трёх сторон, камни во тьме — Совиный взор, рваный парус — Йоша,
// вороны на подлёте — рогаткой, ключ, ворона уносит фонарь — погоня по тенемосткам, гроза (молния, свист, низкая туча), посадка; потом — награда за чистый полёт
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.F=()=>ZC.W.flags;window.S=()=>ZC.W.shipS;window.KK=()=>ZC.W.k34;window.H=ZC.HERO;
// шаг корабля с пропуском роликов; D — герой игрока pi к точке на палубе (lx, lz — от середины корабля)
// KEEP — Пелагея (Игрок 2) стоит у фонаря и держит щит у мачты (крен не утащит); отнесло — возвращается
window.KEEP=false;window.keep=()=>{if(!window.KEEP)return;const h=U.act(1),s=S();if(h.kind!=='pelageya')return;const far=Math.hypot(h.pos.x-s.x,h.pos.z-s.z-0.9)>0.45;
  if(far){ZC.hold('Period',false);U.step(1,s.x,s.z+0.9,0.3);}else{U.rel(1);ZC.hold('Period',true);}};
window.TK=()=>{if(ZC.G.cine){ZC.skip();ZC.tick(5);}keep();ZC.tick(1);};
window.T=n=>{for(let i=0;i<n;i++)TK();};
window.UNTIL=(c,sec,each)=>{for(let i=0;i<sec*60;i++){if(c())return true;if(each)each(i);TK();}return false;};
window.D=(pi,lx,lz,sec,tol)=>{const s=S();for(let i=0;i<(sec||4)*60;i++){if(U.step(pi,s.x+lx,s.z+lz,tol||0.3)){U.rel(pi);return true;}TK();}U.rel(pi);return false;};
window.KIND=(pi,k)=>U.toKind(k,pi);
window.LX=h=>(h.pos.x-S().x).toFixed(1);
window.R=[];window.BAD=[];window.CK=(c,m)=>{if(!c)window.BAD.push(m);};
ZC.startFrom(ZC.LV('3-4'));ZC.G.manual=true;ZC.tick(30);
const k=KK();R.push(ZC.W.name,'ledges='+k.LEDGES.length,'barrels='+k.BARRELS.length,'nuts='+ZC.W.nutTotal,'links='+ZC.W.linkTotal);
// пристань: Пелагеей к фонарю, зажечь перо — взлёт
KIND(1,'pelageya');D(1,0,0.9,6);U.tap('Semicolon');ZC.tick(3);R.push('lit='+S().lit,'stage='+F().stage);
UNTIL(()=>F().stage==='fly',20);window.KEEP=true;CK(F().launched,'launch');R.push('launched='+F().launched+' y='+S().y.toFixed(1));R
//@@ shot=t34_launch.png
ZC.tick(1);
//@@
// порыв у мачты: Потап в кружок, щит
const r=[];KIND(0,'potap');D(0,0.6,0.2,4);UNTIL(()=>F().gustA&&F().gustA.t>=F().gustA.tel,10);ZC.hold('KeyG',true);UNTIL(()=>!F().gustA,5);ZC.hold('KeyG',false);
r.push('gust1 torn='+F().torn.toFixed(0)+' S='+S().z.toFixed(0));
// бочка: Потап к правой бочке — умение: перекинул к левому борту
const b=KK().BARRELS[1];D(0,b.lx-Math.sign(b.lx||1)*0.95,b.lz,5);const lx0=KK().BARRELS.map(b=>b.lx.toFixed(1)).join('/');ZC.press('KeyE');T(60);r.push('barrels '+lx0+'→'+KK().BARRELS.map(b=>b.lx.toFixed(1)).join('/')+' throws='+(F().throws||0));
// орешки под бортом слева: Потап к левому борту — крен влево
const n0=ZC.W.nuts;D(0,-1.9,2,5);UNTIL(()=>S().z<-56,20);CK(F().throws>=1,'barrel');CK(ZC.W.nuts-n0>=2,'arcA');r.push('roll='+S().roll.toFixed(2),'arcNuts='+(ZC.W.nuts-n0)+'/3');r
//@@
// уступ справа (z −74): Потап у левого борта — крен влево
const r=[];UNTIL(()=>KK().LEDGES[0].done,15);r.push('L0 bumps='+F().bumps+' roll='+S().roll.toFixed(2));
// высокий уступ слева (−92): обе бочки и Потап — к правому борту, крен 30°
const B=KK().BARRELS;B.forEach(b=>{b.fly=true;b.lx=0;});   // дальше бочки не мешают: проверяем крен героями
H.yosha.pos.set(S().x,S().y+0.3,S().z+4.2);KIND(0,'proshka');D(0,1.8,3.5,6);KIND(0,'potap');D(0,1.8,2.2,6);UNTIL(()=>S().z-KK().LEDGES[1].z<4,15);r.push('rollT='+S().rollT.toFixed(2)+' w='+KK().weight());
UNTIL(()=>KK().LEDGES[1].done,8);r.push('L1(big) bumps='+F().bumps);
// камень над ущельем (−101): Прошкой — рогаткой
const St=KK().STONES[0];KIND(0,'proshka');UNTIL(()=>Math.hypot(St.pos.x-H.proshka.pos.x,St.pos.z-H.proshka.pos.z)<12.5,10);const pr=H.proshka;pr.face=Math.atan2(St.pos.x-pr.pos.x,St.pos.z-pr.pos.z);ZC.press('KeyE');T(40);
CK(F().bumps===0,'L0/L1');CK(St.done&&!St.fall,'stone0');r.push('stone0 done='+!!St.done+' fall='+!!St.fall+' bumps='+F().bumps);r
//@@
// теснина (−114): Потап к левому борту, бочки справа — вес поровну, корабль ровно
const r=[];D(0,0,3.5,4);KIND(0,'potap');D(0,0,1,6);UNTIL(()=>KK().LEDGES[2].done,15);r.push('L2(both) roll='+S().roll.toFixed(2)+' bumps='+F().bumps);
// три подряд: справа, слева, справа — бочки поровну, Потап от борта к борту
const L=KK().LEDGES;
for(const i of[3,4,5]){const s=L[i].s;UNTIL(()=>S().z-L[i].z<11,10);D(0,-s*1.85,2.2,3,0.4);UNTIL(()=>L[i].done,6);r.push('trio'+(i-2)+' roll='+S().roll.toFixed(2)+' bumps='+F().bumps);}
// камень над аркой (−152) — не сбиваем: упадёт на палубу, царапина
CK(F().bumps===0,'both/trio');UNTIL(()=>KK().STONES[1].done,20);CK(F().bumps===1,'stone1 fall');r.push('stone1 bumps='+F().bumps);r
//@@
// низкая арка (−166): Пелагея гасит перо — корабль ныряет; за аркой — зажигает
const r=[];UNTIL(()=>F().diveNow,15);ZC.press('Semicolon');ZC.tick(2);r.push('dive lit='+S().lit+' pel.lit='+H.pelageya.lit);
UNTIL(()=>KK().ARCHES[0].done,15);r.push('arch y='+S().y.toFixed(2)+' dives='+(F().dives||0)+' bumps='+F().bumps);
UNTIL(()=>!F().diveNow,8);ZC.press('Semicolon');ZC.tick(2);UNTIL(()=>S().y>2.6,8);CK(F().dives===1&&S().lit,'arch');r.push('relit='+S().lit+' y='+S().y.toFixed(1));r
//@@ shot=t34_arch.png
ZC.tick(1);
//@@
// крыло: ролик, потом «держись за мачту» — Потап и Пелагея щит у мачты
const r=[];UNTIL(()=>F().stage==='brace',25);r.push('stage='+F().stage,'roll='+S().roll.toFixed(2));
ZC.hold('KeyG',true);UNTIL(()=>F().stage!=='brace',14);ZC.hold('KeyG',false);
CK(F().braceHeld>6&&S().lit&&F().stage==='hold','brace');r.push('held='+F().braceHeld.toFixed(1)+'/'+F().braceT.toFixed(1),'lit='+S().lit,'pel@'+LX(H.pelageya),'stage='+F().stage);r
//@@ shot=t34_brace.png
ZC.tick(1);
//@@
// ветры: с борта — Потап к наветренному борту; на фонарь — щит между ветром и фонарём; у мачты — щит у мачты
const r=[];
for(let n=0;n<8&&!F().holdDone;n++){if(!UNTIL(()=>F().gustA||F().holdDone,10))break;if(F().holdDone)break;const g=F().gustA;
  const p=g.k==='side'?[g.s*1.85,2.6]:g.k==='lantern'?[g.s*1.0,0.25]:[0.6,0.2];D(0,p[0],p[1],2.4,0.25);if(g.k!=='side')ZC.hold('KeyG',true);UNTIL(()=>F().gustA!==g,5);ZC.hold('KeyG',false);
  r.push(g.k+(g.s>0?'+':'-')+':'+F().gusts);}
CK(F().holdDone&&F().gusts>=3,'winds');r.push('holdDone='+!!F().holdDone,'torn='+F().torn.toFixed(0));r
//@@
// тёмные тучи: камень во тьме — Совиный взор Пелагеи, Потап от камня; орешки под правым бортом
const r=[];const L=KK().LEDGES,n0=ZC.W.nuts;
for(const i of[6,7]){UNTIL(()=>F().owlNeed===L[i],25);const seen0=L[i].seen;ZC.press('KeyL');ZC.tick(3);r.push('owl'+(i-5)+' seen '+seen0+'→'+!!L[i].seen);
  D(0,-L[i].s*1.9,2.2,5);UNTIL(()=>L[i].done,15);r.push('hid'+(i-5)+' bumps='+F().bumps);if(i===6)UNTIL(()=>S().z<-216,10);}
CK(L[6].seen&&L[7].seen,'owl');CK(ZC.W.nuts-n0>=1,'arcB');r.push('arcNuts2='+(ZC.W.nuts-n0)+'/2');
// рваный парус: Йошей к мачте — мёртвой водой
KK().tearSail();const t0=F().torn;ZC.hold('Period',false);KIND(1,'yosha');D(1,-0.9,-1,4);ZC.press('KeyL');T(40);r.push('torn '+t0.toFixed(0)+'→'+F().torn.toFixed(0),'patched='+(F().patched||0),'lit='+S().lit);CK(F().patched===1&&F().torn===0,'sail');KIND(1,'pelageya');T(30);r
//@@
// вороны летят: Прошкой — рогаткой на подлёте
const r=[];KIND(0,'proshka');UNTIL(()=>F().wave>0,40);
let hit=false;UNTIL(()=>F().slung>0,8,i=>{const e=KK().crows().find(c=>c.alive&&c.appr&&c.appr.t>0.4);const pr=H.proshka;if(e&&i%20===0){pr.face=Math.atan2(e.pos.x-pr.pos.x,e.pos.z-pr.pos.z);ZC.press('KeyE');}});
CK(F().slung>=1,'sling');r.push('slung='+(F().slung||0),'crows='+KK().crows().length);
// севшая ворона весит: крен к ней
UNTIL(()=>KK().crows().some(c=>c.alive&&!c.appr),10);const w=KK().weight();r.push('w with crows='+w);r
//@@
// ключ: ворона на палубе гибнет — ключ отлетает к борту; Потап у этого борта ловит
const r=[];KIND(0,'potap');const c=KK().crows().find(c=>c.alive&&!c.appr&&!c.flying);
if(c){c.noMove=true;c.cd=99;const s=Math.sign(c.pos.x-S().x)||1,lz=c.pos.z-S().z;H.potap.pos.set(S().x+s*1.7,KK().deckY(S().x+s*1.7)+0.3,S().z+lz+(lz>0?0.9:-0.9));T(12);const n0=ZC.W.nuts;KK().kill(c);T(150);CK(ZC.G.flags.key34,'key');r.push('key34='+!!ZC.G.flags.key34,'nuts+'+(ZC.W.nuts-n0));}
else r.push('no deck crow');
// ворона уносит фонарь: погоня по тенемосткам (перо погасить), ворону побить — фонарь вернётся
const c2=KK().crows().find(c=>c.alive&&!c.appr&&!c.flying);
if(c2){window.KEEP=false;ZC.hold('Period',false);KK().startChase(c2);T(100);const st=F().stolen;r.push('stolen='+!!st+' lan='+ZC.W.k34.lanPos.y.toFixed(1)+' lit='+S().lit);
  const h=U.act(1);if(h.lit){ZC.press('Semicolon');ZC.tick(2);}
  const tl=ZC.W.tiles.filter(t=>t.type==='shadow'&&t.on&&t.on()),way=[[tl[0].x-st.P.s*0.6,tl[0].z]].concat(tl.map(t=>[t.x,t.z]));let wi=0;
  const ok=UNTIL(()=>!F().stolen,30,i=>{const e=st.c;if(!e.alive)return;const d=Math.hypot(e.pos.x-h.pos.x,e.pos.z-h.pos.z);if(wi<way.length){if(U.step(1,way[wi][0],way[wi][1],0.45))wi++;}else if(d>2.0)U.step(1,e.pos.x,e.pos.z,1.6);else{U.rel(1);h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);U.def(1,i);if(i%9===4)ZC.press('Comma');}});
  U.rel(1);CK(ok&&!st.c.alive,'chase');r.push('chase '+(ok?'ok':'TIMEOUT')+' thief alive='+st.c.alive+' t='+st.t.toFixed(1)+' h@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+' fell='+ZC.G.stats.falls);
  // назад к фонарю, перо — в фонарь
  KIND(1,'pelageya');D(1,0,0.9,8);if(!U.act(1).lit)U.tap('Semicolon');ZC.tick(3);window.KEEP=true;r.push('relit='+S().lit);}
else r.push('no crow for chase');r
//@@ shot=t34_chase.png
ZC.tick(1);
//@@
// добить ворон вдвоём
const r=[];window.KEEP=false;ZC.hold('Period',false);for(let n=0;n<6&&!F().crowsDone;n++){r.push(U.brawl(25));T(60);}D(1,0,0.9,4);window.KEEP=true;if(!U.act(1).lit){U.tap('Semicolon');ZC.tick(3);}UNTIL(()=>F().crowsDone,20);CK(F().crowsDone,'crows');r.push('crowsDone='+!!F().crowsDone,'S='+S().z.toFixed(0),'bumps='+F().bumps);r
//@@
// гроза: молния рвёт парус, свист Соловья — вес к правому борту, низкая туча — нырок, ветер на фонарь — щит, камень во тьме — молния/взор
const r=[];KIND(0,'potap');UNTIL(()=>F().strike,40);r.push('strike torn='+F().torn.toFixed(0));
UNTIL(()=>F().gustA&&F().gustA.why,20);const g=F().gustA;D(0,g.s*1.85,2.6,2.4,0.25);UNTIL(()=>!F().gustA,5);r.push('whistle side'+(g.s>0?'+':'-')+' w='+KK().weight());
UNTIL(()=>F().diveNow,30);ZC.press('Semicolon');UNTIL(()=>KK().ARCHES[1].done,25);r.push('cloud y='+S().y.toFixed(2)+' dives='+(F().dives||0));UNTIL(()=>!F().diveNow,10);ZC.press('Semicolon');ZC.tick(3);
UNTIL(()=>F().gustA&&F().gustA.k==='lantern',25);const g2=F().gustA;D(0,g2.s*1.0,0.25,2.4,0.25);ZC.hold('KeyG',true);UNTIL(()=>!F().gustA,5);ZC.hold('KeyG',false);r.push('lantern gust lit='+H.pelageya.lit);
const L=KK().LEDGES[10];UNTIL(()=>L.seen||L.done,20,i=>{if(F().owlNeed===L&&i%60===0)ZC.press('KeyL');});D(0,-L.s*1.9,2,5);UNTIL(()=>L.done,15);CK(F().strike&&F().dives===2,'storm');r.push('storm rock seen='+!!L.seen+' bumps='+F().bumps);r
//@@
// посадка и на берег
const r=[];UNTIL(()=>F().landed,40);window.KEEP=false;ZC.hold('Period',false);UNTIL(()=>F().stage==='landed',15);
UNTIL(()=>F().out,30,i=>{if(i%30===0){U.rel(0);U.rel(1);}U.step(0,-1,-340,0.6);U.step(1,1,-340,0.6);});U.rel(0);U.rel(1);
CK(F().out,'landing');r.push('out='+!!F().out,'bumps='+F().bumps,'nuts='+ZC.W.nuts+'/'+ZC.W.nutTotal,'links='+ZC.W.links+'/'+ZC.W.linkTotal,'clean34='+!!ZC.G.flags.clean34);r
//@@
// награда за чистый полёт: ни одной царапины — Капитанский свисток
ZC.startFrom(ZC.LV('3-4'));ZC.G.manual=true;ZC.tick(30);const wear=KK().wearOk();const f=F();f.launched=true;f.landed=true;f.stage='landed';f.crowsDone=true;f.bumps=0;
for(const h of Object.values(ZC.HERO))if(h&&h.pos)h.pos.set(0,3.2,-340);T(200);
let own=false;try{own=!!JSON.parse(localStorage.getItem('zlatayaCep.wardrobe.v1')).owned.svistok34;}catch(e){}const r=['clean34='+!!ZC.G.flags.clean34,'svistok34='+own,'wear='+wear];
CK(own&&wear&&ZC.G.flags.clean34,'reward');localStorage.setItem('t34bad',JSON.stringify(window.BAD.concat(window._errs.map(e=>'ERR '+e))));
// свисток — на Потапа (после перезагрузки гардероб наденет его)
try{const d=JSON.parse(localStorage.getItem('zlatayaCep.wardrobe.v1'));d.wear=d.wear||{};d.wear.potap=d.wear.potap||{};d.wear.potap.neck='svistok34';localStorage.setItem('zlatayaCep.wardrobe.v1',JSON.stringify(d));}catch(e){}r
//@@ reload=1
// одиночный режим, свисток на Потапе: взлёт, ущелье, «держись за мачту» и ветры — без ошибок, смена героя на боку корабля не ломает игру
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.F=()=>ZC.W.flags;window.S=()=>ZC.W.shipS;
const me=()=>{const p=ZC.players[ZC.G.soloPi];return p.heroes[p.act];},B=['KeyA','KeyD','KeyW','KeyS'],rel=()=>B.forEach(k=>ZC.hold(k,false));
const step=(x,z)=>{const h=me(),dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>0.3;ZC.hold(B[0],far&&dx<-0.25);ZC.hold(B[1],far&&dx>0.25);ZC.hold(B[2],far&&dz<-0.25);ZC.hold(B[3],far&&dz>0.25);};
ZC.startFrom(ZC.LV('3-4'));ZC.G.manual=true;ZC.tick(30);ZC.setSolo(true);ZC.tick(5);const r=['solo='+ZC.G.solo];
for(let i=0;i<16&&me().kind!=='pelageya';i++){ZC.press('KeyQ');ZC.tick(i<4?6:12);}for(let i=0;i<300&&!S().lit;i++){step(S().x,S().z+0.9);ZC.tick(1);if(i===200){rel();ZC.press('KeyR');}}rel();if(!S().lit&&!me().lit){ZC.press('KeyR');ZC.tick(2);}
let sw=0;for(let i=0;i<60*150&&F().stage!=='hold';i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}const h=me();
  if(F().stage==='brace'){if(i%90===0){ZC.press('KeyQ');sw++;}}else if(h.kind==='pelageya'){const far=Math.hypot(h.pos.x-S().x,h.pos.z-S().z-0.9)>0.4;if(far)step(S().x,S().z+0.9);else rel();if(!far&&!h.lit&&!F().diveNow&&i%20===0)ZC.press('KeyR');if(F().diveNow&&h.lit&&i%20===0)ZC.press('KeyR');}ZC.tick(1);}rel();
r.push('stage='+F().stage,'S='+S().z.toFixed(0),'bumps='+F().bumps,'dives='+(F().dives||0),'me='+me().kind,'swaps in brace='+sw);for(let i=0;i<60*20;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}r.push('after='+F().stage+' gusts='+F().gusts);
let bad=[];try{bad=JSON.parse(localStorage.getItem('t34bad')||'[]');}catch(e){}bad=bad.concat(window._errs.map(e=>'ERR '+e));if(F().stage!=='hold'&&F().stage!=='fly')bad.push('solo stage '+F().stage);if(!F().wingDone)bad.push('solo wing');
r.push(bad.length?'FAIL t34: '+bad.join(', '):'t34 ok');r
