//@@ wait=1500
// релиз final06: напарник-бот проходит 3-Б «Соловей-Разбойник» за Игрока 2 (Йоша и Пелагея): подход «Прямоезжая дорожка» (тропка, лепестки и деревья по свисту, подворотня и плита, островки, зигзаг по дубу, калитка)
// и бой в четыре этапа (плеск в клюв, Богатырский щит, корни и хвост; «зайчик» щитом на дуб; вихрь и родео; Совиный взор, общий мах; песня Пелагеи). Человека (Игрок 1) играет скрипт: Потап (колода, подворотня, калитка,
// щит), Прошка (рогатка по золотому жёлудю).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.lit?'*':'');
window.FALLS=()=>ZC.G.stats.falls||0;
window.HIM=()=>{Object.values(H).forEach(h=>{if(h.kind==='potap'||h.kind==='proshka')h.iT=Math.max(h.iT,0.5);});};
window.NEAR0=(x,z,tol)=>U.step(0,x,z,tol||0.6);
// подход: человек (Потап) катит колоду, держит подворотню (пока друг не пройдёт и не встанет на плиту), раздвигает калитку
window.RESET=(mode)=>{ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);
  if(mode){window.D=ZC.W.warp3b(mode);ZC.tick(5);U.nocine();ZC.tick(30);}else{ZC.tick(30);U.cine(600);ZC.tick(5);U.nocine();window.D=ZC.W.dbg3b();}
  window.RD=D.RD;U.toKind('potap',0);ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(30);window.h1=0;window.h2=0;window.h3=0;window.f0=FALLS();return F().phase;};
window.lift=(x,z)=>ZC.W.lifts.find(l=>Math.abs(l.pos.x-x)<0.3&&Math.abs(l.pos.z-z)<0.3);
window.HUMROAD=()=>{const z=bot().pos.z;if(!RD)return;
  if(!h1&&!RD.bigLog.done&&z<157&&z>150){h1=1;lift(0,153.1).onLift(H.potap);}
  if(!RD.gate.propped&&z<89&&z>80.5&&!h2){H.potap.following=false;H.potap.pos.set(-4.6,-8,83.6);H.potap.vel.set(0,0,0);RD.gate.holder=H.potap;}
  if(z<80.5&&z>70&&!h2){h2=1;RD.gate.holder=null;}
  if(h2===1&&RD.gate.k>0.9&&!RD.gate.propped&&z<80&&z>70){H.potap.pos.set(0,-8,79);H.potap.vel.set(0,0,0);}
  if(!h3&&z<5&&ZC.W.gateOn3b()){h3=1;ZC.W.gateOpen(H.potap);}};
// этап 1: Потап со щитом у дуба Соловья, бьёт в окне, Богатырский щит в долю, хвост
window.HUM1=(i)=>{HIM();const S1=D.S1,s=D.sol,P=H.potap;if(U.act(0).kind!=='potap')return;
  if(D.cring.on){const t=D.cring.t;if(t>1.22&&t<1.3&&D.cring.press[0]===null)ZC.press('KeyG');return;}
  if(S1.st==='down'&&s.dazeT>0){ZC.hold('KeyG',false);const h=U.act(0);if(NEAR0(s.pos.x-1.4,s.pos.z+1.6,1.0)){h.face=Math.atan2(s.pos.x-h.pos.x,s.pos.z-h.pos.z);if(i%9===0)ZC.press('KeyF');}return;}
  if(S1.sw&&S1.sw.h===P){ZC.hold('KeyG',true);return;}
  if(S1.bow){const B=S1.bow;if(B.k>=0.85){const p=D.tailHit;const h=U.act(0);if(p&&NEAR0(p.pos.x,p.pos.z,1.2)&&i%9===0){h.face=Math.atan2(p.pos.x-h.pos.x,p.pos.z-h.pos.z);ZC.press('KeyF');}}return;}
  const O=D.OAKS[S1.perch],a=O.a;NEAR0(Math.cos(a)*6,-14+Math.sin(a)*6,0.8);ZC.hold('KeyG',D.F.tellHigh>0||!!S1.inh);
  for(const w of D.waves){if(w.kind!=='low')continue;const d=Math.hypot(P.pos.x-w.src.x,P.pos.z-w.src.z)-w.r;if(d>0.4&&d<1.4&&P.grounded)ZC.press('Space');}};
// этап 4: выдох — Потап, вдох — Прошка стреляет по золотому жёлудю (когда Пелагея включила взор); сдулся — оба рядом и бьют
window.HUM4=(i)=>{const S4=D.S4,s=D.sol;HIM();const h0=U.act(0);
  if(D.F.phase===4.5){const a=NEAR0(s.pos.x-1.4,s.pos.z+1.6,0.8);if(a&&i%20===0){h0.face=Math.atan2(s.pos.x-h0.pos.x,s.pos.z-h0.pos.z);ZC.press('KeyF');}return;}
  if(S4.st==='exhale'){if(h0.kind!=='potap'&&i%10===0)ZC.press('KeyQ');ZC.hold('KeyG',h0.kind==='potap');return;}
  if(S4.st==='inhale'){ZC.hold('KeyG',false);U.rel(0);if(h0.kind!=='proshka'&&i%8===0)ZC.press('KeyQ');
    if(h0.kind==='proshka'&&h0.skillCd<=0&&ZC.W.owlT>0){let best=null,bd=1e9;for(const A of D.acorns){if(!A.g.visible)continue;const d=A.pos.distanceTo(h0.pos);if(d<bd){bd=d;best=A;}}if(best&&best.i===S4.real){ZC.press('KeyE');window.shots=(window.shots||0)+1;}}}};
window.PLAY=(max,until,human)=>{const L=[];let last='';for(let i=0;i<60*max&&!until();i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}if(human)human(i);ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}return L;};
RESET();
['phase='+F().phase,'bot='+pos(bot()),CO.mode,!!CO.routes['3-B']]
//@@
// подход «Прямоезжая дорожка»: Йоша поливает тропку, лепестки и деревья — мосты по свисту, подворотня (Потап держит, Йоша на плите), островки, зигзаг по дубу, калитка (Потап) — ролик выхода Соловья; без падений
if(!CO.routes['3-B'])throw new Error('нет маршрута 3-B');const L=PLAY(200,()=>F().phase>=1,()=>HUMROAD());
if(F().phase<1)throw new Error('не дошли до гнезда: '+pos(bot())+' '+CO.mode+' '+L.slice(-6).join(' | '));if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0)+' '+L.join(' | '));
'road ok '+pos(bot())+' falls=0 path='+RD.path
//@@
// этап 1 «Свист»: Потап — щит и окна, Йоша — плеск в клюв на вдох, окна, корни, хвост
RESET('boss1');const L=PLAY(150,()=>F().phase>=1.5,HUM1);
if(F().phase<1.5)throw new Error('этап 1 не пройден: '+pos(bot())+' '+CO.mode+' emb='+D.sol.embers+' '+L.slice(-6).join(' | '));'stage1 ok emb='+D.sol.embers+' petals='+ZC.players[1].petals
//@@
// этап 2 «Крик»: бот сам: Йоша светит в центре, Пелагея щитом пускает «зайчик» на дуб с Соловьём, упал — Йоша в свете бьёт (человек стоит)
RESET('boss2');const L=PLAY(150,()=>F().phase>=2.5,()=>HIM());
if(F().phase<2.5)throw new Error('этап 2 не пройден: '+pos(bot())+' '+CO.mode+' emb='+D.sol.embers+' '+L.slice(-6).join(' | '));'stage2 ok emb='+D.sol.embers+' petals='+ZC.players[1].petals
//@@
// этап 3 «Шип»: Пелагея — в вихрь, родео (наклон против крена; без колокола — несколько заездов), шапку сорвали — бить
RESET('boss3');const L=PLAY(200,()=>F().phase>=3.5,()=>HIM());
if(F().phase<3.5)throw new Error('этап 3 не пройден: '+pos(bot())+' '+CO.mode+' emb='+D.sol.embers+' '+L.slice(-6).join(' | '));'stage3 ok emb='+D.sol.embers+' petals='+ZC.players[1].petals
//@@
// этап 4 «Полный свист» + песня: Пелагея — Совиный взор, Прошка стреляет, общий мах, песня в долю, конец уровня
RESET('boss4');window.shots=0;const L=PLAY(200,()=>!!F().won,HUM4);
if(!F().won)throw new Error('этап 4 не пройден: '+pos(bot())+' '+CO.mode+' voices='+D.S4.voices+' '+L.slice(-6).join(' | '));
const L2=PLAY(120,()=>!!F().out,()=>HIM());if(!F().out)throw new Error('песня/финал не пройдены: '+pos(bot())+' '+CO.mode+' song='+!!ZC.W.song);
if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));'stage4+song ok shots='+shots+' out='+F().out
