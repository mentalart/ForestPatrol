//@@ wait=1500
// релиз final06: напарник-бот проходит 2-4 «В брюхе у кита» за Игрока 2 (Пелагея и Йоша): правый берег озера (зов и живая вода на клапан), залив кораблей (прилив),
// сердце в лад (нотки Игрока 2), Йоша на клапане и ковшик на пузырь, реснички вместе с человеком. Человека (Игрок 1) играет скрипт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.W=ZC.W;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',swap:'KeyQ',skill:'KeyE',item:'KeyR',attack:'KeyF',guard:'KeyG'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',swap:'KeyK',skill:'KeyL',item:'Semicolon',attack:'Comma',guard:'Period'}];
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(KEYS[pi].swap);ZC.tick(6);}return U.act(pi).kind===kind;};
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.REL=pi=>{const K=KEYS[pi];[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));};
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.other=()=>ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'];
ZC.startFrom(ZC.LV('2-4'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(40);NOCINE();ZC.tick(10);window.W=ZC.W;CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
['me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode,'go='+F().go]
//@@
// озеро: человек стоит на левом берегу; бот сам идёт на правый берег, просит позвонить в колокол (зов) и поливает больной клапан — левые ворота открываются
const D=ZC.W.dbg24();D.F.go=true;put(me(),-6,-34);put(bot(),1,-33);put(other(),2,-32);ZC.tick(10);
const L=[];let last='';for(let i=0;i<60*40&&!(D.gates[0].open&&D.F.ask);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('ask='+D.F.ask,'gate0='+D.gates[0].open,'bot='+pos(bot())+' '+CO.mode,(D.F.ask&&D.gates[0].open)?'valve ok':'FAIL valve');L
//@@
// залив: бот (Пелагея) играет прилив; человек (Потап) по дну снимает корабль с ребра и подымает язык; течение — бот, если человек не успел; корабли ушли, завал разобран
const D=ZC.W.warp24('bay');ZC.tick(20);NOCINE();CO.routes['2-4'].forEach(s=>{s.fin=false;});put(bot(),8,-45);put(other(),7,-44.5);put(me(),9,-44);ZC.tick(10);
const r=[];const L=[];let last='';for(let i=0;i<60*40&&D.BAY.state!=='high';i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' BAY='+D.BAY.state);last=m;}}
r.push('BAY='+D.BAY.state);
ACT(0,'potap');put(ZC.HERO.potap,11.5,-46);ZC.tick(5);r.push(U.walkTo(0,12.4,-50,8),U.walkTo(0,D.SHIPS[1].x+1.6,-51.2,8));U.tap('KeyE');ZC.tick(30);r.push('stuck='+D.SHIPS[1].stuck);
r.push(U.walkTo(0,27.6,-57.4,10));U.tap('KeyE');ZC.tick(10);r.push('tongue='+D.F.tongue);let t=0;while(ZC.G.cine&&t<2000){ZC.skip();ZC.tick(5);t+=5;}
for(let i=0;i<60*60&&!D.F.jamOpen;i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%600===0){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' CB='+D.CB.dir+' ships='+D.SHIPS.map(R=>R.out?1:0).join(''));last=m;}}
r.push('jam='+D.F.jamOpen,'ships='+D.SHIPS.map(R=>R.out?1:0).join(''),'bot='+pos(bot())+' '+CO.mode,D.F.jamOpen?'bay ok':'FAIL bay');r.concat(L)
//@@
// сердце: человек играет свои нотки, бот — свои; 11 из 16
const D=ZC.W.warp24('heart');ZC.tick(20);NOCINE();CO.routes['2-4'].forEach(s=>{s.fin=false;});put(me(),-2,-89);put(bot(),2,-89);put(other(),3,-88.5);ZC.tick(10);
let t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}while(ZC.G.cine&&t<2000){ZC.skip();ZC.tick(5);t+=5;}
t=0;while(!D.RH.on&&t<300){ZC.tick(1);t++;}const L=['rh on='+D.RH.on];
for(let i=0;i<60*22&&D.RH.on;i++){for(const n of D.RH.notes)if(n.pi===0&&n.st===0&&Math.abs(D.RH.t-n.tb)<0.03&&!n.pr){n.pr=1;ZC.press('KeyR');}ZC.tick(1);}
L.push('hits='+D.RH.hits+'/'+D.RH.n,'done='+D.RH.done,'caught='+F().caught,D.RH.done||D.RH.hits>=D.RH.need?'heart ok':'FAIL heart');L
//@@
// пузырь с Пелагеей: Йоша встаёт на розовый клапан, «тук» — на уступ, ковшик на тёмную каплю
let t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}while(ZC.G.cine&&t<2000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(20);
const D=ZC.W.dbg24();const L=['caught='+F().caught,'bot='+pos(bot())];let last='';
for(let i=0;i<60*40&&!F().freed;i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%300===0){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('freed='+F().freed,'bot='+pos(bot()),F().freed?'bubble ok':'FAIL bubble');L
//@@
// реснички: человек бьёт каждую (слева направо), бот рядом бьёт тоже; вместе — кит чихает; конец уровня
const D=ZC.W.dbg24();let t=0;while(ZC.G.cine&&t<2000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(60);
const L=['freed='+F().freed,'bot='+pos(bot())+' '+CO.mode];let last='';
for(const x of[-5,0,5]){put(me(),x-1.1,-113.2);me().face=Math.atan2(x-me().pos.x,-114-me().pos.z);ZC.tick(5);
  for(let i=0;i<60*20;i++){if(i%50===0){me().face=Math.atan2(x-me().pos.x,-114-me().pos.z);ZC.press('KeyF');}ZC.tick(1);const m=CO.mode;if(m!==last){L.push(x+' '+(i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}if(i>80&&i%1===0&&F().final)break;}}
for(let k=0;k<6;k++){let t0=0;while(ZC.G.cine&&t0<3000){ZC.skip();ZC.tick(5);t0+=5;}ZC.tick(60);}
L.push('final='+F().final,'lvl='+ZC.W.levelId,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(F().final||ZC.W.levelId!=='2-4')&&!_errs.length?'2-4 ok':'FAIL 2-4');L
//@@
