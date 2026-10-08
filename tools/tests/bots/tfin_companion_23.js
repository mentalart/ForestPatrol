//@@ wait=1500
// релиз final06: напарник-бот проходит 2-3 «Невод» за Игрока 2 (Пелагея и Йоша): камни невода и клубки, мёртвая вода Йоши, перелёт Пелагеи через пропасть, золотая рыбка, протока и плот,
// Совиный взор и тайное течение, озеро с Ершом, лодка и отмель у кита. Человека (Игрок 1) играет скрипт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.W=ZC.W;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',swap:'KeyQ',skill:'KeyE',item:'KeyR',attack:'KeyF',guard:'KeyG'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',swap:'KeyK',skill:'KeyL',item:'Semicolon',attack:'Comma',guard:'Period'}];
window.ACT=(pi,kind)=>{if(U.act(pi).kind!==kind){U.tap(KEYS[pi].swap);ZC.tick(4);}return U.act(pi).kind===kind;};
window.REL=pi=>{const K=KEYS[pi];[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));};
window.JUMPTO=(pi,x,z,max)=>U.walkTo(pi,x,z,max,(h)=>{if(h.grounded&&Math.hypot(x-h.pos.x,z-h.pos.z)<2.2)ZC.press(KEYS[pi].jump);});
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.other=()=>ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'];
ZC.startFrom(ZC.LV('2-3'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);window.W=ZC.W;CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
['me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode,'task='+F().task]
//@@
// сундук: человек ставит Прошку и Потапа на северные камни и бросает клубки; бот — на южные; Йоша поливает серёдку; на прилив невод держат трое
const N=ZC.W.dbg23().stones.filter(s=>s.net.id===1),r=[];
ACT(0,'proshka');r.push(U.walkTo(0,N[0].x,N[0].z+0.3,10));U.tap('KeyR');ZC.tick(10);r.push('s0='+N[0].set);U.tap('KeyQ');ZC.tick(5);r.push(U.walkTo(0,N[1].x,N[1].z+0.3,10));U.tap('KeyR');ZC.tick(10);r.push('s1='+N[1].set);
const L=[];let last='';for(let i=0;i<60*60&&!N[0].net.laid;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' set='+N.map(s=>s.set?1:0).join(''));last=m;}}
r.push('laid='+N[0].net.laid,'set='+N.map(s=>s.set?1:0).join(''),'bot='+pos(bot())+' '+CO.mode,N.map(s=>s.hero?s.hero.kind:'-').join());r.concat(L)
//@@
// нити срастаются мёртвой водой Йоши; потом прилив с углов (трое держат); сундук всплывает
const N=ZC.W.dbg23().stones.filter(s=>s.net.id===1),NN=N[0].net,r=[];const L=[];let last='';
for(let i=0;i<60*40&&!(NN.formed&&NN.zone.state==='high');i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' formed='+NN.formed+' z='+NN.zone.state);last=m;}}
r.push('formed='+NN.formed,'zone='+NN.zone.state,'held='+NN.held,'bot='+pos(bot()));r.concat(L)
//@@
// сундук приехал — бот подходит и открывает; второе дело: человек (Прошка и Потап) — на ближние камни, бросает клубки; бот: Пелагея планирует к дальнему камню
const N1=ZC.W.dbg23().stones.filter(s=>s.net.id===1)[0].net;let t=0;while(!N1.done&&t<600){ZC.tick(1);t++;}
const L=[];let last='';for(let i=0;i<60*30&&F().task<2;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('task='+F().task,'chest ok='+(F().task>=2),'bot='+pos(bot())+' '+CO.mode);L
//@@
const N=ZC.W.dbg23().stones.filter(s=>s.net.id===2),NN=N[0].net,r=[];ZC.tick(60);
ACT(0,'proshka');put(me(),N[0].x,N[0].z+1.5);ZC.tick(5);r.push(U.walkTo(0,N[0].x,N[0].z,6));U.tap('KeyR');ZC.tick(10);U.tap('KeyQ');ZC.tick(5);put(me(),N[1].x,N[1].z+1.5);ZC.tick(5);r.push(U.walkTo(0,N[1].x,N[1].z,6));U.tap('KeyR');ZC.tick(10);
r.push('set='+N.map(s=>s.set?1:0).join(''),'heroes='+N.map(s=>s.hero?s.hero.kind:'-').join());
const L=[];let last='';for(let i=0;i<60*60&&!(NN.tight);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' set='+N.map(s=>s.set?1:0).join('')+' held='+NN.held+' z='+NN.zone.state);last=m;}}
r.push('tight='+NN.tight,'set='+N.map(s=>s.set?1:0).join(''),'bot='+pos(bot())+' '+CO.mode,'pel='+pos(H.pelageya));r.concat(L)
//@@
// Йоша по неводу за звеном; потом возвращаются
const L=[];let last='';for(let i=0;i<60*40&&F().task<3;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('task='+F().task,'bot='+pos(bot())+' '+CO.mode,F().task>=3?'link2 ok':'FAIL link2');L
//@@
// золотая рыбка: человек (Прошка и Потап) — кольца 1 и 2 по порядку; бот — 3 и 4; все четверо на кольцах; прилив — невод поднимает рыбку
const R=ZC.W.dbg23().stones.filter(s=>s.net.id===3),NN=R[0].net,r=[];ZC.tick(60);
put(me(),R[0].x-1.5,R[0].z-1.5);ZC.tick(3);ACT(0,'proshka');r.push(U.walkTo(0,R[0].x,R[0].z,6));U.tap('KeyR');ZC.tick(10);U.tap('KeyQ');ZC.tick(5);put(me(),R[1].x-1.5,R[1].z-1.5);ZC.tick(3);r.push(U.walkTo(0,R[1].x,R[1].z,6));U.tap('KeyR');ZC.tick(10);
r.push('set='+R.map(s=>s.set?1:0).join(''),'heroes='+R.map(s=>s.hero?s.hero.kind:'-').join());
const L=[];let last='';for(let i=0;i<60*70&&F().task<4;i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%600===0){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' oth='+pos(other())+' set='+R.map(s=>s.set?1:0).join('')+' held='+NN.held+' z='+NN.zone.state+' next='+NN.next);last=m;}}
r.push('task='+F().task,'set='+R.map(s=>s.set?1:0).join(''),'held='+NN.held,'bot='+pos(bot())+' '+CO.mode,F().task>=4?'fish ok':'FAIL fish');r.concat(L)
//@@
// протока: человек — течение с причала; бот: оба героя на плот, Совиный взор, уступ, тайное течение; дальше на песок
const D=ZC.W.warp23('protoka');ZC.tick(20);CO.routes['2-3'].forEach(s=>{s.fin=false;});put(me(),-3,-33);put(bot(),2,-33);put(other(),3,-32.5);ZC.tick(10);
const r=[];const L=[];let last='';
for(let i=0;i<60*20;i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%300===0){L.push('p1 '+(i/60).toFixed(0)+'s '+m+' '+pos(bot())+' raft='+D.RAFT.z.toFixed(1)+' on='+(bot().groundRef===D.RAFT.col)+'/'+(other().groundRef===D.RAFT.col));last=m;}if(bot().groundRef===D.RAFT.col&&other().groundRef===D.RAFT.col)break;}
r.push('aboard '+(bot().groundRef===D.RAFT.col)+'/'+(other().groundRef===D.RAFT.col));
// человек играет течение на юг у ракушки и остаётся
ACT(0,'proshka');r.push(U.walkTo(0,-4.4,-34.4,6));ZC.HERO.proshka.face=Math.PI;U.tap('KeyR');ZC.tick(4);r.push('C1='+D.C1.dir);U.tap('KeyQ');ZC.tick(4);
for(let i=0;i<60*70&&!(H.pelageya.pos.z<-58&&H.yosha.pos.z<-58);i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%300===0){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' raft='+D.RAFT.z.toFixed(1)+' WH='+D.WH.on+' hid='+F().hidFound);last=m;}}
r.push('pel='+pos(H.pelageya),'yos='+pos(H.yosha),'WH='+D.WH.on,(H.pelageya.pos.z<-58&&H.yosha.pos.z<-58)?'raft ok':'FAIL raft');r.concat(L)
//@@
// озеро: человек — Потап на северный камень, Прошка у западной ракушки (течение на восток); бот: Йоша на южный камень, Пелагея у восточной ракушки (на запад); ёрш пойман
const D=ZC.W.warp23('lake');ZC.tick(20);CO.routes['2-3'].forEach(s=>{s.fin=false;});put(me(),-3,-61);put(bot(),2,-61);put(other(),3,-60.5);ZC.tick(10);
const r=[];ACT(0,'potap');put(ZC.HERO.potap,-1,-61.5);ZC.tick(3);r.push(U.walkTo(0,0,-62.9,6));ACT(0,'proshka');put(ZC.HERO.proshka,-9,-69);ZC.tick(3);r.push(U.walkTo(0,-10.2,-73,8));ZC.HERO.proshka.face=Math.PI/2;
const L=[];let last='';for(let i=0;i<60*90&&!D.YR.caught;i++){if(i%90===0&&(D.CW.dir!==1||D.CW.t<2.5)){ZC.HERO.proshka.face=Math.PI/2;U.tap('KeyR');}ZC.tick(1);const m=CO.mode;if(m!==last||i%450===0){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' oth='+pos(other())+' CW='+D.CW.dir+' CE='+D.CE.dir+' ns='+D.NS.map(s=>s.hero?1:0).join('')+' yx='+D.YR.x.toFixed(1));last=m;}}
r.push('caught='+D.YR.caught,'bot='+pos(bot()),D.YR.caught?'lake ok':'FAIL lake');r.concat(L)
//@@
// лодка старика: человек играет «Течение» с причала и прыгает следом; бот: оба героя в лодку, Пелагея рубит заросли с носа; у отмели — на берег
for(let k=0;k<6;k++){let t0=0;while(ZC.G.cine&&t0<4000){ZC.skip();ZC.tick(5);t0+=5;}ZC.tick(40);}
const D=ZC.W.warp23('pier');ZC.tick(20);CO.routes['2-3'].forEach(s=>{s.fin=false;});put(me(),-3,-92);put(bot(),2,-92);put(other(),3,-91.5);ZC.tick(10);F().task=9;
const L=[];let last='';
for(let i=0;i<60*20;i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%300===0){L.push('p1 '+(i/60).toFixed(0)+'s '+m+' '+pos(bot())+' raft='+D.RAFT3.z.toFixed(1)+' on='+(bot().groundRef===D.RAFT3.col)+'/'+(other().groundRef===D.RAFT3.col));last=m;}if(bot().groundRef===D.RAFT3.col&&other().groundRef===D.RAFT3.col)break;}
const r=['aboard '+(bot().groundRef===D.RAFT3.col)+'/'+(other().groundRef===D.RAFT3.col)];
ACT(0,'proshka');r.push(U.walkTo(0,-4.4,-93.6,6));ZC.HERO.proshka.face=Math.PI;U.tap('KeyR');ZC.tick(4);r.push('C3='+D.C3.dir);U.tap('KeyQ');ZC.tick(4);
for(let i=0;i<60*90&&F().task<11;i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%450===0){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' raft='+D.RAFT3.z.toFixed(1)+' kelp='+D.KELP.map(k=>k.gone?'x':k.hp).join('')+' task='+F().task);last=m;}}
r.push('task='+F().task,'pel='+pos(H.pelageya),'yos='+pos(H.yosha),F().task>=11?'pier ok':'FAIL pier');r.concat(L)
//@@
// усы: Пелагея щекочет нижние, Прошка (человек) — верхние рогаткой; зевок; в пасть; «Глоть!» — 2-4
const D=ZC.W.dbg23();const r=[];let shots=0;
put(me(),0,-139.5);ZC.tick(5);ACT(0,'proshka');put(ZC.HERO.proshka,0,-139.5);ZC.tick(5);
for(let i=0;i<60*70&&D.F.task<12;i++){const Wh=D.WHI;const p=U.act(0);ZC.HERO.proshka.face=Math.PI;
  if(!([Wh[0],Wh[1]].some(q=>q.t<=0))&&[Wh[2],Wh[3]].some(q=>q.t<=0)&&i%24===0){ZC.press('KeyE');shots++;}ZC.tick(1);}
r.push('task='+D.F.task,'whi='+D.WHI.map(q=>q.t.toFixed(1)).join('/')+' shots='+shots,'bot='+pos(bot())+' '+CO.mode);
if(D.F.task>=12){for(let i=0;i<60*20&&D.F.task<13;i++){const h=U.act(0),K=KEYS[0],dx=0-h.pos.x,dz=-149-h.pos.z;ZC.hold(K.left,dx<-0.3);ZC.hold(K.right,dx>0.3);ZC.hold(K.up,dz<-0.3);ZC.hold(K.down,dz>0.3);ZC.tick(1);}REL(0);}
let t=0;while(ZC.W.levelId!=='2-4'&&t<60*14){ZC.tick(1);t++;}r.push('lvl='+ZC.W.levelId,'done23='+ZC.G.done['2-3'],'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(ZC.W.levelId==='2-4'&&!_errs.length)?'2-3 ok':'FAIL 2-3');r
//@@
