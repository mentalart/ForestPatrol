//@@
// Мир 1: сохранение внутри длинных уровней (late_97w_w1_chapters.js). 1-1: орешек со двора, перескок за калитку — точка 'gate',
// карточка «Часть II · За калиткой», в сохранении — номер взятого орешка; дальше ворона прилетают своим ходом
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CH1={};window.objText=pi=>{const W=ZC.W,o=W.objectives[pi][ZC.players[pi].obj];if(!o)return 'нет';const t=typeof o.text==='function'?o.text():o.text;return String(t).replace(/<[^>]+>/g,' ').slice(0,60);};
window.grab=()=>{const W=ZC.W,it=W.items.find(i=>i.kind==='nut'&&!i.taken&&!i.locked&&!i.owl&&i.g.visible);if(!it)return 'нет орешка';const h=ZC.players[0].heroes[ZC.players[0].act];
  h.pos.set(it.pos.x,Math.max(0,it.pos.y-0.6),it.pos.z);h.vel.set(0,0,0);ZC.tick(4);return 'nuts='+W.nuts;};
window.chOk=(id,at,re)=>{const s=ZC.G.flags.ch1,el=document.getElementById('w1card');return s&&s.lv===id&&s.at===at&&(!re||el&&re.test(el.textContent));};
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
const W=ZC.W,F=W.flags,G=ZC.G;const r=[grab()];W.warp11('gate');for(let i=0;i<40&&F.stage!=='crows';i++){if(G.cine)ZC.skip();ZC.tick(5);}
for(let i=0;i<20&&G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(10);const el=document.getElementById('w1card');
r.push('stage='+F.stage,'at='+(G.flags.ch1&&G.flags.ch1.at),'items='+(G.flags.ch1&&G.flags.ch1.items.length),'card='+(el?el.textContent.slice(0,40):'none'),'obj0='+objText(0));
CH1['1-1']={links:W.links,nuts:W.nuts};r.push(F.stage==='crows'&&chOk('1-1','gate',/Часть II · За калиткой/)&&G.flags.ch1.items.length>=1?'ok':'FAIL 1-1 gate');r
//@@
// 1-1: новый вход — «Продолжить с: Часть II · За калиткой» → сразу за калитку, орешек со двора засчитан; дальше 10 с игры без ошибок
const G=ZC.G;G.flags.ch1ask=true;ZC.loadLevel(ZC.LV('1-1'));ZC.G.manual=true;let n=0;for(;n<400&&G.ui!=='skaz';n++)ZC.tick(1);const txt=document.getElementById('skaz').textContent;
const r=['ui='+G.ui+' n='+n,txt.slice(0,80)];ZC.press('Space');ZC.tick(20);const W=ZC.W,F=W.flags;for(let i=0;i<20&&F.stage!=='crows';i++){if(G.cine)ZC.skip();ZC.tick(5);}
for(let i=0;i<20&&G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(600);
r.push('stage='+F.stage,'nuts='+W.nuts+'/'+CH1['1-1'].nuts,'z='+ZC.HERO.potap.pos.z.toFixed(1),'obj0='+objText(0));
r.push(F.stage==='crows'&&W.nuts===CH1['1-1'].nuts&&W.links===CH1['1-1'].links&&/За калиткой/.test(txt)?'ok':'FAIL 1-1 resume');r
//@@
// 1-2: перескок к туману — Журавль с Цаплей поженились, камыши расступились; точка 'fog', карточка «Часть II · Туман»; задача — уже туман
Math.random=(()=>{let q=31;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.G.flags.ch1ask=false;
ZC.startFrom(ZC.LV('1-2'));ZC.G.manual=true;ZC.tick(30);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
const W=ZC.W,F=W.flags,G=ZC.G;const r=[grab()];W.warp12('fog');ZC.tick(30);for(let i=0;i<20&&G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(10);
const el=document.getElementById('w1card');r.push('wed='+F.wed.stage,'reeds='+W.sw12.reedCol.on,'at='+(G.flags.ch1&&G.flags.ch1.at),'card='+(el?el.textContent.slice(0,32):'none'),'obj0='+objText(0),'obj1='+objText(1));
CH1['1-2']={links:W.links,nuts:W.nuts};r.push(chOk('1-2','fog',/Часть II · Туман/)&&!W.sw12.reedCol.on&&/Туман/.test(objText(1))?'ok':'FAIL 1-2 fog');r
//@@
// 1-2: продолжить с тумана; 10 с игры — без ошибок, задача — туман
const G=ZC.G;G.flags.ch1ask=true;ZC.loadLevel(ZC.LV('1-2'));ZC.G.manual=true;let n=0;for(;n<400&&G.ui!=='skaz';n++)ZC.tick(1);const txt=document.getElementById('skaz').textContent;
const r=['ui='+G.ui+' n='+n,txt.slice(0,70)];ZC.press('Space');ZC.tick(20);const W=ZC.W,F=W.flags;for(let i=0;i<20&&G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(600);
r.push('wed='+F.wed.stage,'nuts='+W.nuts+'/'+CH1['1-2'].nuts,'z='+ZC.HERO.potap.pos.z.toFixed(1),'obj1='+objText(1));
r.push(F.wed.stage==='done'&&W.nuts===CH1['1-2'].nuts&&/Туман/.test(objText(1))&&/Туман/.test(txt)?'ok':'FAIL 1-2 resume');r
//@@
// 1-5: три точки — 'ovin' (Часть II · Овин), 'dry' (Часть III · Сушильня), 'boss' (тихо: бой с Веретенником начинается сам); ранняя не перетирает позднюю
Math.random=(()=>{let q=5;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.G.flags.ch1ask=false;
ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(30);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
const W=ZC.W,F=W.flags,G=ZC.G,r=[];W.warp15('ovin');ZC.tick(20);const el=()=>document.getElementById('w1card');r.push('at='+G.flags.ch1.at,el().textContent.slice(0,28),'obj0='+objText(0));const ok1=chOk('1-5','ovin',/Часть II · Овин/);
W.warp15('dry');ZC.tick(20);r.push('at='+G.flags.ch1.at,el().textContent.slice(0,32),'obj0='+objText(0));const ok2=chOk('1-5','dry',/Часть III · Сушильня/);
W.warp15('boss');ZC.tick(10);for(let i=0;i<30&&(G.cine||W.k15.B.phase<1);i++){if(G.cine)ZC.skip();ZC.tick(5);}ZC.tick(120);
r.push('at='+G.flags.ch1.at,'phase='+W.k15.B.phase,'obj0='+objText(0));const ok3=chOk('1-5','boss')&&W.k15.B.phase>=1;
CH1['1-5']={links:W.links,nuts:W.nuts};r.push(ok1&&ok2&&ok3?'ok':'FAIL 1-5 rooms '+[ok1,ok2,ok3]);r
//@@
// 1-5: продолжить с повити — бой идёт; уровень пройден — запись стирается
const G=ZC.G;G.flags.ch1ask=true;ZC.loadLevel(ZC.LV('1-5'));ZC.G.manual=true;let n=0;for(;n<400&&G.ui!=='skaz';n++)ZC.tick(1);const txt=document.getElementById('skaz').textContent;
const r=['ui='+G.ui+' n='+n,txt.slice(0,70)];ZC.press('Space');ZC.tick(20);const W=ZC.W;for(let i=0;i<30&&(G.cine||W.k15.B.phase<1);i++){if(G.cine)ZC.skip();ZC.tick(5);}ZC.tick(300);
r.push('phase='+W.k15.B.phase,'latch='+W.flags.latch);const okB=W.k15.B.phase>=1&&W.flags.latch&&/Повить/.test(txt);
ZC.finishLevel();r.push('after finish='+JSON.stringify(G.flags.ch1||null));G.flags.ch1ask=false;r.push(okB&&!G.flags.ch1?'ok':'FAIL 1-5 resume/finish');r
