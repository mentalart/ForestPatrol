//@@
// 5-Б2 короткий путь: карточка перед боем (новый вход) — «Короткий путь — 7 стадий» первым у одиночки; потом две страницы на выбор
window.E5=ZC.FIN.k5e;ZC.setSolo(true);ZC.G.flags.k5eAt=0;E5.goStage(0);ZC.G.manual=true;ZC.tick(5);E5.routeAsk=true;E5.routeAsked=false;ZC.G.flags.k5eAt=0;E5.startAt=0;E5.start();ZC.tick(3);
const t1=document.getElementById('skaz').textContent;const r=['ui='+ZC.G.ui,t1.slice(0,80)];ZC.press('Space');ZC.tick(3);const t2=document.getElementById('skaz').textContent;r.push(t2.slice(0,40));
ZC.press('KeyS');ZC.tick(2);ZC.press('Space');ZC.tick(3);ZC.press('KeyS');ZC.tick(2);ZC.press('Space');ZC.tick(5);r.push('route='+JSON.stringify(ZC.G.flags.k5eRoute));E5.routeAsk=false;
const rt=ZC.G.flags.k5eRoute;r.push(/Короткий путь/.test(t1.split('☁')[1]||'')&&rt&&rt.short&&rt.pages.length===2?'ok':'FAIL card');r
//@@
// пропуски: 2 → 3, 4 (не выбрана) → первая выбранная, 8 → 9, 10 → 11; полоса «шаг k / 7»; двери невыбранных страниц скрыты
const E=E5;ZC.G.manual=true;E.goStage(1);ZC.tick(10);for(let i=0;i<30&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}E.routeSet({short:true,pages:[5,6]});const r=[];
E.go(2);ZC.tick(5);r.push('2→'+E.cur);E.go(4);ZC.tick(5);r.push('4→'+E.cur);E.go(8);ZC.tick(5);r.push('8→'+E.cur);E.go(10);ZC.tick(5);r.push('10→'+E.cur);
r.push(ZC.FIN.k5e.stageLabel(11),ZC.FIN.k5e.stageLabel(5));E.pagesShow(true,false);r.push('doors='+[1,2,3,4].map(w=>E.pages[w].g.visible?1:0).join(''));
r.push('done='+[2,4,8,10].map(n=>E.done[n]?1:0).join(''));
const ok=r[0]==='2→3'&&r[1]==='4→5'&&r[2]==='8→9'&&r[3]==='10→11'&&r[4]==='шаг 6 / 7'&&!E.pages[1].g.visible&&!E.pages[4].g.visible;E.routeSet(null);r.push(ok?'ok':'FAIL route');r
//@@
// после последней выбранной страницы (6): поездка домой → Сказ (помощник) → сразу стадия 9 (буря 8 — «за кадром»)
const E=E5;E.routeSet({short:true,pages:[5,6]});E.go(6,{warp:true});ZC.tick(10);E.won(6);const r=[];let seen='';
for(let i=0;i<60*240&&E.cur!==9;i++){if(ZC.G.cine&&i%10===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0){ZC.press('Space');ZC.press('KeyM');}if(E.cur!==6&&!seen)seen='cur='+E.cur;if(ZC.G.ui==='ride'||ZC.G.ui)void 0;ZC.tick(1);}
r.push('cur='+E.cur,'done8='+!!E.done[8],'yosha='+!!(ZC.G.flags.names||{}).yosha);E.routeSet(null);r.push(E.cur===9&&E.done[8]?'ok':'FAIL after page');r
//@@
// Средний путь — облегчённые стадии (5Б2-3): в стадии 10 нет цепи-аркана и груд злата
const E=E5;E.fullStages=false;ZC.G.manual=true;E.goStage(10);ZC.tick(10);for(let i=0;i<40&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const ES=E.es;const r=['lite='+E.lite(),'cur='+E.cur];const n0=(E.logs||[]).length;
for(let i=0;i<60*25;i++){ES.lasT=Math.min(ES.lasT||9,0.5);ES.coinT=Math.min(ES.coinT||9,0.5);ZC.tick(1);}const lg=(E.logs||[]).slice(n0);
r.push('lassoAim='+lg.includes('lassoAim'),'pile='+lg.includes('pile'),'piles='+(ES.piles?ES.piles.length:'-'));r.push(E.lite()&&!lg.includes('lassoAim')&&!lg.includes('pile')?'ok':'FAIL lite');r
