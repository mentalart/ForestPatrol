//@@ wait=1500
// релиз final06: напарник-бот проходит 1-5 «Кикиморина прялка» за Игрока 2: кикиморки в сенях, мотовило (бот на свободную площадку, наверху —
// клубок на мотовило), ткацкий стан (человек на подножке — бот бросает челнок), паутинки овина (оба героя), старая нить Совиным взором,
// сушильня (Совиный взор, просветы, засов на двоих), Веретенник (струна поперёк струны человека, три веретена — Совиным взором). Человека
// (Игрок 1) играет скрипт.
// @timeout=1800
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.K15=()=>ZC.W.k15;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(30);CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
// человек дерётся с ближним живым мороком (бот — сам)
window.hb=(max,filt)=>{for(let i=0;i<max*60;i++){const al=ZC.W.enemies.filter(e=>e.alive&&(!filt||filt(e)));if(!al.length)return 'cleared t='+(i/60).toFixed(1);if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}
  const vis=al.filter(e=>e.g.visible!==false&&e.state!=='hide'&&e.state!=='spawn');
  if(!U.def(0,i)){const h=me();let e=null,bd=99;for(const x of vis){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}if(e)U.hit(0,e,i);else U.rel(0);}ZC.tick(1);}U.rel(0);return 'TIMEOUT '+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state).join(',');};
['stage='+F().stage,'me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode]
//@@
// сени: кикиморки — бьют оба
const r=[U.until(()=>ZC.W.enemies.some(e=>e.alive),6)];const hr=hb(80,e=>e.pos.z>28);r.push(hr,'petals='+P[0].petals+','+P[1].petals,'mode='+CO.mode,/cleared/.test(hr)?'foesA ok':'FAIL foesA');r
//@@
// мотовило: человек — Потапом на свободную площадку, когда бот встал на свою; бот поднимается, на полатях заводит мотовило
const r=[];if(me().kind!=='potap'){ZC.press('KeyQ');ZC.tick(10);}
window.HEROES_ON=(P,pl)=>[ZC.HERO.proshka,ZC.HERO.potap,ZC.HERO.pelageya,ZC.HERO.yosha].some(h=>h.player===pl&&h.groundRef===P.col);
const K=K15();r.push('bot on '+U.until(()=>K.PL.some(P=>K.weightOn(P)>0&&HEROES_ON(P,1)),20));
const mine=K.PL.find(P=>!HEROES_ON(P,1));r.push('me→'+mine.cx);
for(let i=0;i<360;i++){const h=me();if(U.step(0,mine.cx,33,0.5,q=>q.grounded&&Math.hypot(q.pos.x-mine.cx,q.pos.z-33)<2.4&&q.pos.y<mine.y-0.3))break;ZC.tick(1);}U.rel(0);
r.push('up '+U.until(()=>me().pos.y>4.3,30),pos(me()),pos(bot()),'wound='+!!F().wound,'mode='+CO.mode);
r.push('off '+U.goto(0,mine.cx,30.2,6,0.4));ZC.tick(30);r.push('liftDone='+!!F().liftDone,F().liftDone?'lift ok':'FAIL lift');r
//@@
// ткацкий стан: человек на подножке, бот бросает клубок-челнок
const r=[];r.push(U.goto(0,0,29,8,0.4),U.goto(0,0,27,6,0.4),U.goto(0,-6.5,25.5,8,0.3));
r.push('loom '+U.until(()=>F().loomDone,40),'n='+K15().LOOM.n,pos(bot()),'mode='+CO.mode);r.push(F().loomDone?'loom ok':'FAIL loom');r
//@@
// по мосту в овин; нитяные мороки на полу — бьют оба
const r=[U.path(0,[[0,22],[0,12],[0,10],[0,6],[0,1],[0,-14]],5)];r.push(U.until(()=>ZC.W.enemies.some(e=>e.alive&&e.pos.z<0),8));
const hr=hb(90,e=>e.pos.z<0&&e.pos.z>-34);r.push(hr,'bot '+pos(bot()),/cleared/.test(hr)?'foes ok':'FAIL foes');r
//@@
// человек поднимается: кольцо → клубок в колышек → ждёт струну друга → на серединку, прыжок
window.RG=[[-1.8,-20.2,0],[-5.9,-25,3.4]];window.SK=[[-5.2,-11.9],[-9.6,-29.3]];window.WB=[[-3.5,-16,0.26],[-7.75,-27.15,3.66]];
window.hasStr=(pi,t)=>{const s=[[[-5.2,-11.9],[-5.2,-20.1]],[[-9.6,-29.3],[-5.9,-29.3]]][t][pi];return ZC.W.threads.some(q=>q.string&&!q.sag&&q.owner===pi&&q.stake&&Math.hypot(q.stake.x-s[0],q.stake.z-s[1])<0.3);};
window.webAt=t=>{const c=WB[t];return ZC.W.webs.some(w=>Math.hypot(w.x-c[0],w.z-c[1])<1.5&&Math.abs(w.y-c[2])<0.8);};
window.climbH=t=>{const g=RG[t],s=SK[t],r=[];r.push(U.goto(0,g[0],g[1],12,0.3));me().face=Math.atan2(s[0]-g[0],s[1]-g[1]);
  for(let i=0;i<6&&!hasStr(0,t);i++){ZC.press('KeyR');ZC.tick(30);}
  r.push('str='+hasStr(0,t),U.until(()=>webAt(t),35),'web='+webAt(t));const c=WB[t];r.push(U.goto(0,c[0],c[1],8,0.3));ZC.tick(5);ZC.press('Space');r.push(U.until(()=>me().pos.y>(t?6.4:2.9),4),'y='+me().pos.y.toFixed(1));return r.join(' ');};
const r=[climbH(0),'bot '+pos(bot())+' '+CO.mode];r.push(me().pos.y>2.9?'tier0 ok':'FAIL tier0');r
//@@
// галерея: бот (Пелагея) рубит старую нить; человек — на чердак: веретено удирает (ролик)
const r=[];r.push(climbH(1),'cut='+!!F().cut,'bot '+pos(bot())+' '+CO.mode);const c=U.until(()=>F().spFled,90);if(ZC.G.cine){ZC.skip();ZC.tick(30);}
r.push('fled '+c);r.push(me().pos.y>6.4&&F().spFled?'tier1 ok':'FAIL tier1');r
//@@
// сушильня: человек — просветами, низкие нити прыжком; бот — сам; засов: человек на западную плиту, бот — на восточную
window.cross=(pts)=>{const out=[];for(const p of pts){if(p[2]){const wz=p[1];let k=0;for(;k<360;k++){if(U.step(0,p[0],wz-1.3,0.3,h=>h.grounded&&h.pos.z-wz>0.35&&h.pos.z-wz<0.9))break;ZC.tick(1);}U.rel(0);ZC.tick(10);out.push('j'+k);}
  else out.push(U.goto(0,p[0],p[1],8,0.3));}return out.join(' ');};
const r=[cross([[-2.5,-33.4],[-2.5,-36.2],[4,-36.2],[4,-39],[4,-40.6,1],[-5.2,-41.8],[-5.2,-45.2],[-4,-46.6,1],[-6,-49.8]])];
r.push('latch '+U.until(()=>F().latch,60),'bot '+pos(bot()),'trips='+(F().trips||[]).join(','),'mode='+CO.mode);
const left=ZC.W.enemies.filter(e=>e.alive&&e.pos.z<-34.4&&e.pos.z>-52.4);if(left.length)r.push(hb(40,e=>e.pos.z<-34.4&&e.pos.z>-52.4));r.push(F().latch?'dry ok':'FAIL dry');r
//@@
// повить: вход Веретенника; человек — струну из своего кольца, за паутинку, бьёт, когда кокон слетел; бот — сам
const r=[U.path(0,[[-1.5,-51],[-1.5,-56]],6)];const c=U.until(()=>ZC.G.cine,20);ZC.tick(20);ZC.skip();ZC.tick(30);const B=K15().B;r.push('cine '+c,'phase='+B.phase,'bot '+pos(bot()));
window.myStr=()=>ZC.W.threads.some(t=>t.owner===0&&t.string&&!t.sag&&t.sz<-52.4);
window.fightH=(max)=>{const B=K15().B;let catches=0,pm='';for(let i=0;i<max*60&&!F().bossWon;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}const e=B.e;
    if(B.mode!==pm){pm=B.mode;if(pm==='caught')catches++;}if(!e||B.phase<1||B.phase===1.5){ZC.tick(1);continue;}const h=me();
    if(B.mode==='decoy'||B.mode==='sweepW'){if(B.mode==='decoy')hb(0.02,q=>q.kind==='thread'&&q.alive);else U.rel(0);ZC.tick(1);continue;}
    if(B.mode==='sweep'){if(h.grounded&&i%12===0)ZC.press('Space');ZC.tick(1);continue;}
    if(!B.cocoon||e.state==='broken'){U.hit(0,e,i);ZC.tick(1);continue;}
    if(!myStr()&&!ZC.W.webs.some(w=>w.y>6)){if(U.step(0,-4,-60.5,0.3)){h.face=Math.atan2(7+4,-70.5+60.5);if(i%40===0)ZC.press('KeyR');}ZC.tick(1);continue;}
    const w=ZC.W.webs.find(q=>q.y>6);if(w){const dx=w.x-e.pos.x,dz=w.z-e.pos.z,d=Math.hypot(dx,dz)||1;U.step(0,w.x+dx/d*3.2-0.6,w.z+dz/d*3.2,0.5);}else U.rel(0);
    if(B.mode==='aim'&&B.tgt===h&&B.mt>0.9&&i%20===0&&!w)ZC.press('ShiftLeft');ZC.tick(1);}
  U.rel(0);return 'catches='+catches+' phase='+B.phase;};
r.push(fightH(420),'won='+!!F().bossWon,'petals='+P[0].petals+','+P[1].petals,'mode='+CO.mode);r.push(F().bossWon?'boss ok':'FAIL boss');r
//@@
// финал: ролик с Кикиморой и звеном — уровень пройден
const u=U.until(()=>F().out||ZC.W.levelId!=='1-5',45);if(ZC.G.cine){ZC.skip();ZC.tick(30);}const u2=U.until(()=>F().out||ZC.W.levelId!=='1-5',20);
['out '+u+' '+u2,'out='+!!F().out,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(F().out&&!_errs.length)?'1-5 ok':'FAIL 1-5']
