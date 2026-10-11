//@@
// 5-1: сохранение по частям — начало части II (ярус клубка) записывается в сохранение, всплывает карточка «Часть II · Дуб»
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);
const W=ZC.W,F=W.flags,G=ZC.G;const r=[W.warp51('clew'),F.stage];ZC.tick(10);const el=document.getElementById('ch51card');
r.push('at='+(G.flags.ch51&&G.flags.ch51.at),'items='+(G.flags.ch51&&G.flags.ch51.items.length),'links='+W.links,'nuts='+W.nuts,'card='+(el?el.textContent:'none'));
window.CH={links:W.links,nuts:W.nuts};r.push(F.stage==='clew'&&G.flags.ch51&&G.flags.ch51.at==='clew'&&el&&/Часть II · Дуб/.test(el.textContent)?'ok':'FAIL clew checkpoint');r
//@@
// новый вход в уровень: «Продолжить с: Часть II · Дуб» → сразу на ярус клубка, собранное до точки — на месте
const G=ZC.G;G.flags.ch51ask=true;ZC.loadLevel(ZC.LV('5-1'));ZC.G.manual=true;let n=0;for(;n<400&&G.ui!=='skaz';n++)ZC.tick(1);const txt=document.getElementById('skaz').textContent;
const r=['ui='+G.ui+' n='+n,txt.slice(0,90)];ZC.press('Space');ZC.tick(20);const W=ZC.W,F=W.flags;
r.push('stage='+F.stage,'links='+W.links,'nuts='+W.nuts,'ui='+G.ui);r.push(F.stage==='clew'&&W.links===CH.links&&W.nuts===CH.nuts&&/Часть II/.test(txt)?'ok':'FAIL resume');r
//@@
// побег в шкурах: поймали после второй отары — возврат во вторую, а не к первому стаду
Math.random=(()=>{let q=99;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);
const W=ZC.W,F=W.flags,G=ZC.G,H=ZC.HERO;const r=[W.warp51('keys')];for(let q=0;q<4&&F.stage!=='escape';q++){if(G.cine)ZC.skip();ZC.tick(5);}r.push('stage='+F.stage);
const FB=W.flocks5[1];for(const h of Object.values(H))h.pos.set(FB.pos.x,0,FB.pos.z);ZC.tick(5);r.push('last='+F.lastFlock);
const L=W.likhos[1];const h0=ZC.players[0].heroes[ZC.players[0].act];h0.pos.set(FB.pos.x+8,0,FB.pos.z+4);L.onCatch(h0,L);ZC.tick(3);
const d=Math.hypot(h0.pos.x-FB.pos.x,h0.pos.z-FB.pos.z);r.push('dist to flockB='+d.toFixed(2));r.push(F.lastFlock==='B'&&d<2.5?'ok':'FAIL escape reset');r
//@@
// часть III: крона открыта — карточка «Часть III · Лихо», точка 'glade'; пройден уровень — запись стирается
Math.random=(()=>{let q=5;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);
const W=ZC.W,F=W.flags,G=ZC.G;const r=[W.warp51('glade'),F.stage];ZC.tick(10);const el=document.getElementById('ch51card');
r.push('at='+(G.flags.ch51&&G.flags.ch51.at),el?el.textContent.slice(0,40):'none');const okIII=G.flags.ch51&&G.flags.ch51.at==='glade'&&/Часть III/.test(el.textContent);
ZC.finishLevel();r.push('after finish='+JSON.stringify(G.flags.ch51||null));r.push(okIII&&!G.flags.ch51?'ok':'FAIL glade/finish');r
