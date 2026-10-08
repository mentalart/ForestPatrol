//@@ wait=1500
// релиз final06: напарник-бот проходит 1-4 «Леший водит» за Игрока 2: после «Пелагею увели» Йоша ползёт под корнями и поливает ёлку-замок; ведёт обоих героев
// по тропе ёлок-ходунов; привязывает ёлки-ворота клубком у столба; на поляне Пелагея открывает Совиным взором серебряную тропу, нить ложится по серебру; бой и выход.
// Человека (Игрок 1) играет скрипт: доходит до похищения, сбивает три шишки-замка рогаткой Прошки (встаёт на их следы), на арену выходит сам и бьёт своих лешачат.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(30);CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
['stage='+F().stage,'me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode]
//@@
// человек выходит за черту z<-23.5 — «Пелагею увели» (ролик пропускаем); на кольце Пелагея, бот берёт Йошу
const r=[U.goto(0,-2,-12,12,0.6),U.goto(0,-2,-24.5,15,0.6)];const u=U.until(()=>ZC.G.cine||F().stage==='rescue',10);U.nocine();ZC.tick(60);
r.push('stage='+F().stage,'pe.inRing='+ZC.HERO.pelageya.inRing,'bot='+pos(bot()),'mode='+CO.mode);r
//@@
// Йоша поливает ёлку-замок
const u=U.until(()=>F().watered,40);['water '+u,'watered='+!!F().watered,'bot='+pos(bot()),F().watered?'water ok':'FAIL water']
//@@
// человек: Прошка встаёт на след каждой шишки-замка и бьёт из рогатки (E)
const RC={x:7.3,z:-33},RR=2.15,r=[];U.toKind('proshka');
for(const i of[3,4,5]){const a=i/8*Math.PI*2,nx=Math.cos(a),nz=Math.sin(a),f={x:RC.x+nx*RR,z:RC.z+nz*RR},sp={x:Math.max(-1,Math.min(1.4,f.x+nx*6.2)),z:f.z+nz*6.2},c={x:f.x+nx*0.5,z:f.z+nz*0.5};
  const h=me();h.pos.set(sp.x,0,sp.z);h.vel.set(0,0,0);ZC.tick(3);h.face=Math.atan2(c.x-sp.x,c.z-sp.z);ZC.tick(2);
  for(let k=0;k<4&&!ZC.W.marks.length;k++)ZC.tick(1);const n0=ZC.W.marks.filter(m=>m.active()).length;ZC.press('KeyE');ZC.tick(70);r.push('cone'+i+' '+n0+'→'+ZC.W.marks.filter(m=>m.active()).length);}
r.push('ringOpen='+!!F().ringOpen,F().ringOpen?'cones ok':'FAIL cones');r
//@@
// ёлки-ходуны: бот ведёт обоих героев по тропе к воротам и привязывает правую ёлку у столба; левую привязывает человек (встаёт спиной, поворачивается, когда ёлка у столба)
const g=ZC.W.movers.filter(q=>q.tieable),gl=g[0],gr=g[1],L=[];let last='';
for(let i=0;i<60*120&&!(gr.tied&&gl.tied);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}
  if(bot().pos.z<-60&&!gl.tied){const h=me();if(Math.hypot(h.pos.x+2.8,h.pos.z+68.6)>0.6){h.pos.set(-2.8,0,-68.6);h.vel.set(0,0,0);}
    if(Math.hypot(gl.pos.x+3.35,gl.pos.z+71)<1.2&&Math.abs(gl.pos.x-h.pos.x)<0.5){h.face=Math.PI;if(i%40===0)ZC.press('KeyR');}else h.face=0;}}
L.push('tied L/R='+!!gl.tied+'/'+!!gr.tied,'bot='+pos(bot()),(gl.tied&&gr.tied)?'gates ok':'FAIL gates');L
//@@
// оба героя бота — за воротами, в проходе
const u=U.until(()=>ZC.HERO.yosha.pos.z<-74&&ZC.HERO.pelageya.pos.z<-74,25);const gg=ZC.W.movers.filter(q=>q.tieable);['pass '+u,'y='+pos(ZC.HERO.yosha),'p='+pos(ZC.HERO.pelageya),'act='+bot().kind,'mode='+CO.mode+' wp='+(CO.wp?CO.wp.i:'-'),'gates='+gg.map(q=>q.pos.x.toFixed(1)+(q.tied?'T':'')).join(','),u!=='TIMEOUT'?'pass ok':'FAIL pass']
//@@
// поляна Лешего: Пелагея открывает Совиным взором серебряную тропу, клубок ложится по серебру — ёлки замирают
const L=[];let last='';for(let i=0;i<60*60&&!F().silver;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('seenSilver='+!!F().seenSilver,'silver='+!!F().silver,'bot='+pos(bot())+' face='+bot().face.toFixed(2),'threads='+ZC.W.threads.filter(t=>t.owner===1).map(t=>'len'+t.len.toFixed(1)+' d'+t.dx.toFixed(2)+','+t.dz.toFixed(2)+' s'+t.sx.toFixed(1)+','+t.sz.toFixed(1)+(t.grow?'g':'')+(t.ret?'r':'')).join(';'),'walkers='+ZC.W.movers.filter(m=>m.noGaze).map(m=>m.pos.x.toFixed(0)+','+m.pos.z.toFixed(0)).join(' '),F().silver?'silver ok':'FAIL silver');L
//@@
// бот идёт по серебру через колючие стены; человек выходит на поляну лешачат; лешачата прячутся за ёлками и выпрыгивают — бьют оба
const r=[U.until(()=>bot().pos.z<-100,40),'bot='+pos(bot())];me().pos.set(-3,0,-103);me().vel.set(0,0,0);
window.hb=max=>{for(let i=0;i<max*60;i++){const al=ZC.W.enemies.filter(e=>e.alive);if(F().out)return 'out';if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}
  const bar=ZC.W.gates.find(g=>g.link==='g');if(bar&&bar.forceOpen&&!al.length)return 'cleared t='+(i/60).toFixed(1);
  const vis=al.filter(e=>e.g.visible!==false&&e.state!=='hide'&&e.state!=='spawn');
  if(!U.def(0,i)){const h=me();let e=null,bd=99;for(const x of vis){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}if(e)U.hit(0,e,i);else U.rel(0);}ZC.tick(1);}U.rel(0);return 'TIMEOUT '+ZC.W.enemies.filter(e=>e.alive).map(e=>e.state).join(',');};
r.push(hb(90),'petals='+P[0].petals+','+P[1].petals,'bot='+pos(bot()));r
//@@
// выход: лешачата распутаны — бот к выходу за звеном, уровень пройден
const u=U.until(()=>F().out||ZC.W.levelId!=='1-4',30);
['out '+u,'out='+!!F().out,'bot='+pos(bot())+' mode='+CO.mode,'me='+pos(me()),'links='+ZC.W.items.filter(q=>q.kind==='link'&&q.taken).length+'/'+ZC.W.linkTotal,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(F().out&&!_errs.length&&ZC.W.items.some(q=>q.kind==='link'&&q.taken&&q.pos.z<-110))?'1-4 ok':'FAIL 1-4']
