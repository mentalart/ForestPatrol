//@@ wait=1500
// релиз final06: 2-4 «В брюхе у кита» — новые участки в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// залив — Пелагея играет прилив, Потап по дну снимает корабль с ребра и подымает язык колокола, Прошка у ракушки с рыбкой гонит корабли
// к горлу; сердце кита — все нотки в долю одной кнопкой; пузырь с Пелагеей — Йоша поливает; реснички — один удар за двоих.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-4'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(4);}return me().kind;};
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);if(extra)extra(h,i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.st=()=>U.st()+' errs='+_errs.length;
'solo='+ZC.G.solo
//@@
// залив: Пелагея — прилив; Потап по дну — корабль с ребра и язык колокола; Прошка — течение к горлу
const D=ZC.W.warp24('bay');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}toKind('pelageya');const r=[go(12,-46,6),go(13.2,-41,6)];U.tap('KeyR');ZC.tick(150);
if(D.BAY.state!=='high')throw new Error('залив не в приливе: '+r.join()+' '+st());toKind('potap');r.push(go(12,-46,6),go(12.4,-50,8),go(D.SHIPS[1].x+1.6,-51.2,8));U.tap('KeyE');ZC.tick(30);
if(D.SHIPS[1].stuck)throw new Error('корабль на ребре: '+r.join()+' '+st());r.push(go(27.6,-57.4,8));U.tap('KeyE');ZC.tick(10);if(!D.F.tongue)throw new Error('язык не поднят: '+r.join()+' '+st());
let t=0;while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}toKind('proshka');r.push(go(12,-46,6),go(12.4,-59.4,10));me().face=Math.PI/2;U.tap('KeyR');ZC.tick(4);if(D.CB.dir!==1)throw new Error('течение не к горлу: '+D.CB.dir+' '+r.join());
t=0;while(!D.F.jamOpen&&t<1500){ZC.tick(1);t++;}if(!D.F.jamOpen)throw new Error('завал не разобран');'bay solo '+r.join()
//@@
// сердце кита: все нотки — одной кнопкой
const D=ZC.W.warp24('heart');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const r=[go(-2,-89,6)];let t=0;while(!ZC.G.cine&&t<200){ZC.tick(1);t++;}while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}
t=0;while(!D.RH.on&&t<300){ZC.tick(1);t++;}if(!D.RH.on)throw new Error('лад не начался: '+r.join()+' '+st());
for(let i=0;i<60*20&&D.RH.on;i++){for(const n of D.RH.notes)if(n.st===0&&Math.abs(D.RH.t-n.tb)<0.03&&!n.pr){n.pr=1;ZC.press('KeyR');}ZC.tick(1);}
if(!D.RH.done)throw new Error('сердце не в ладу: hits='+D.RH.hits);'heart solo hits='+D.RH.hits+'/'+D.RH.n
//@@
// пузырь: Йоша поливает с уступа; реснички — по удару
let t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}for(let k=0;k<3;k++){ZC.skip();ZC.tick(30);}if(!ZC.W.flags.caught)throw new Error('пузыря нет');toKind('yosha');if(me().kind!=='yosha')throw new Error('не за Йошу: '+me().kind);
const Y=me();Y.pos.set(6.4,4.2,-98.6);Y.vel.set(0,0,0);ZC.tick(10);U.tap('KeyE');ZC.tick(150);if(!ZC.W.flags.freed)throw new Error('Пелагея не свободна');
for(const x of[-5,0,5]){const a=me();a.pos.set(x-1.1,0,-113.2);a.vel.set(0,0,0);ZC.tick(4);a.face=Math.atan2(x-a.pos.x,-114-a.pos.z);ZC.press('KeyF');ZC.tick(40);}
ZC.tick(90);for(let k=0;k<4;k++){ZC.skip();ZC.tick(40);}ZC.tick(120);if(ZC.W.levelId==='2-4')throw new Error('уровень не пройден: '+st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-4 solo done errs=0'
