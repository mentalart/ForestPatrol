//@@ wait=1500
// релиз final06: 2-4 «В брюхе у кита» вдвое длиннее (late_99h_k24.js) — новые участки вдвоём настоящими нажатиями:
// залив тридцати кораблей: завал за озером, прилив — корабли всплывают, Потап по дну снимает корабль с ребра и подымает язык колокола,
// течение — корабли уходят в горло, завал разобран; сердце кита: нотки в долю, 11 из 16 — ровное сердце, дальше пузырь с Пелагеей,
// реснички вдвоём — кит чихает, конец уровня.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{swap:'KeyQ',skill:'KeyE',item:'KeyR'},{swap:'KeyK',skill:'KeyL',item:'Semicolon'}];
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(KEYS[pi].swap);ZC.tick(6);}return U.act(pi).kind===kind;};
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
ZC.startFrom(ZC.LV('2-4'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(40);NOCINE();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
'links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal
//@@
// залив: прилив — Пелагея у ракушки; Потап по дну снимает корабль с ребра и подымает язык колокола
const D=ZC.W.warp24('bay');ZC.tick(20);NOCINE();if(!D.jamCol.on)throw new Error('завала нет');ACT(1,'pelageya');const r=[U.walkTo(1,12,-46,6),U.walkTo(1,13.2,-41,6)];U.tap('Semicolon');ZC.tick(150);
if(D.BAY.state!=='high')throw new Error('залив не в приливе: '+r.join()+' '+U.st());ACT(0,'potap');r.push(U.walkTo(0,12,-46,6),U.walkTo(0,12.4,-50,8),U.walkTo(0,D.SHIPS[1].x+1.6,-51.2,8));U.tap('KeyE');ZC.tick(30);
if(D.SHIPS[1].stuck)throw new Error('корабль на ребре: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2)));if(ZC.HERO.potap.pos.y>-1.5)throw new Error('Потап всплыл');
r.push(U.walkTo(0,27.6,-57.4,8));U.tap('KeyE');ZC.tick(10);if(!D.F.tongue)throw new Error('язык не поднят: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2)));let t=0;while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}'bay potap ok '+r.join()
//@@ shot=k24_bay.png
// течение — Прошка у ракушки с рыбкой лицом к горлу; корабли уходят; завал разобран
const D=ZC.W.dbg24();ACT(0,'proshka');const r=[U.walkTo(0,12,-46,6),U.walkTo(0,12.4,-59.4,10)];ZC.HERO.proshka.face=Math.PI/2;U.tap('KeyR');ZC.tick(4);if(D.CB.dir!==1)throw new Error('течение не к горлу: '+D.CB.dir+' '+r.join());
let t=0;while(!D.F.jamOpen&&t<1500){ZC.tick(1);t++;}if(!D.F.jamOpen)throw new Error('завал не разобран: ships='+D.SHIPS.map(R=>R.out+':'+R.x.toFixed(1)).join());'ships out t='+(t/60).toFixed(1)
//@@
// сердце кита: в лад
const D=ZC.W.warp24('heart');ZC.tick(20);NOCINE();const r=[U.walkTo(0,-2,-89,6),U.walkTo(1,2,-89,6)];let t=0;while(!ZC.G.cine&&t<200){ZC.tick(1);t++;}while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}
t=0;while(!D.RH.on&&t<300){ZC.tick(1);t++;}if(!D.RH.on)throw new Error('лад не начался: '+r.join());
for(let i=0;i<60*20&&D.RH.on;i++){for(const n of D.RH.notes)if(n.st===0&&Math.abs(D.RH.t-n.tb)<0.03&&!n.pr){n.pr=1;ZC.press(n.pi?'Semicolon':'KeyR');}ZC.tick(1);}
if(!D.RH.done)throw new Error('сердце не в ладу: hits='+D.RH.hits);'heart ok hits='+D.RH.hits+'/'+D.RH.n
//@@ shot=k24_heart.png
// пузырь с Пелагеей, Йоша поливает, реснички вдвоём — кит чихает
let t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}for(let k=0;k<3;k++){ZC.skip();ZC.tick(30);}if(!ZC.W.flags.caught)throw new Error('пузыря нет');if(U.act(1).kind!=='yosha')throw new Error('Игрок 2 не за Йошу: '+U.act(1).kind);
const Y=U.act(1);Y.pos.set(6.4,4.2,-98.6);Y.vel.set(0,0,0);ZC.tick(10);ZC.press('KeyL');ZC.tick(150);if(!ZC.W.flags.freed)throw new Error('Пелагея не свободна');
for(const x of[-5,0,5]){const a=U.act(0),b=U.act(1);a.pos.set(x-1.1,0,-113.2);b.pos.set(x+1.1,0,-113.2);a.vel.set(0,0,0);b.vel.set(0,0,0);ZC.tick(4);
 a.face=Math.atan2(x-a.pos.x,-114-a.pos.z);b.face=Math.atan2(x-b.pos.x,-114-b.pos.z);ZC.press('KeyF');ZC.press('Comma');ZC.tick(40);}
ZC.tick(90);for(let k=0;k<4;k++){ZC.skip();ZC.tick(40);}ZC.tick(120);'end lvl='+ZC.W.levelId
//@@
if(ZC.W.levelId==='2-4')throw new Error('уровень не пройден');if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-4 done errs=0'
