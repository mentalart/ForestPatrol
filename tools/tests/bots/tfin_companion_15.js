//@@ wait=1500
// релиз final06: напарник-бот проходит 1-5 «Кикиморина прялка» за Игрока 2: нитяные мороки на полу, на каждом этаже овина — в кольцо, клубок в колышек, прыжок на паутинку
// (оба героя), Пелагея рубит старую нить Совиным взором, бой на чердаке. Человека (Игрок 1) играет скрипт: те же приёмы на своих кольцах.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(30);CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
['stage='+F().stage,'me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode]
//@@
// нитяные мороки на полу: бьют оба
window.hb=max=>{for(let i=0;i<max*60;i++){const al=ZC.W.enemies.filter(e=>e.alive);if(!al.length)return 'cleared t='+(i/60).toFixed(1);if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}
  const vis=al.filter(e=>e.g.visible!==false&&e.state!=='hide'&&e.state!=='spawn');
  if(!U.def(0,i)){const h=me();let e=null,bd=99;for(const x of vis){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}if(e)U.hit(0,e,i);else U.rel(0);}ZC.tick(1);}U.rel(0);return 'TIMEOUT '+ZC.W.enemies.filter(e=>e.alive).map(e=>e.state).join(',');};
const r=[U.until(()=>ZC.W.enemies.some(e=>e.alive),12)];const hr=hb(80);r.push(hr,'petals='+P[0].petals+','+P[1].petals,'mode='+CO.mode,(/cleared/.test(hr)&&P[1].petals===3)?'foes ok':'FAIL foes');r
//@@
// человек поднимается активным героем: кольцо → клубок в колышек → ждёт струну друга → на серединку, прыжок
window.RG=[[-1.8,-20.2,0],[-5.9,-25,3.4]];window.SK=[[-5.2,-11.9],[-9.6,-29.3]];window.WB=[[-3.5,-16,0.26],[-7.75,-27.15,3.66]];
window.hasStr=(pi,t)=>{const s=[[[-5.2,-11.9],[-5.2,-20.1]],[[-9.6,-29.3],[-5.9,-29.3]]][t][pi];return ZC.W.threads.some(q=>q.string&&!q.sag&&q.owner===pi&&q.stake&&Math.hypot(q.stake.x-s[0],q.stake.z-s[1])<0.3);};
window.webAt=t=>{const c=WB[t];return ZC.W.webs.some(w=>Math.hypot(w.x-c[0],w.z-c[1])<1.5&&Math.abs(w.y-c[2])<0.8);};
window.climbH=t=>{const g=RG[t],s=SK[t],r=[];r.push(U.goto(0,g[0],g[1],12,0.3));me().face=Math.atan2(s[0]-g[0],s[1]-g[1]);
  for(let i=0;i<6&&!hasStr(0,t);i++){ZC.press('KeyR');ZC.tick(30);}
  r.push('str='+hasStr(0,t),U.until(()=>webAt(t),25),'web='+webAt(t));const c=WB[t];r.push(U.goto(0,c[0],c[1],8,0.3));ZC.tick(5);ZC.press('Space');r.push(U.until(()=>me().pos.y>(t?6.4:2.9),4),'y='+me().pos.y.toFixed(1));return r.join(' ');};
const r=[climbH(0),'bot '+pos(bot())+' '+CO.mode,'tier ok? '+(me().pos.y>2.9)];r.push(me().pos.y>2.9?'tier0 ok':'FAIL tier0');r
//@@
// старая нить: бот (Пелагея на галерее) включает Совиный взор и рубит её; человек — на своё кольцо второго этажа
const r=[];r.push(climbH(1),'cut='+!!F().cut,'bot '+pos(bot())+' '+CO.mode);r.push(me().pos.y>6.4?'tier1 ok':'FAIL tier1');r
//@@
// бот поднимает обоих героев на чердак; на чердаке — пять нитяных мороков, бой общий
const u=U.until(()=>ZC.HERO.pelageya.pos.y>6.4&&ZC.HERO.yosha.pos.y>6.4,70);
['climb '+u,'P='+pos(ZC.HERO.pelageya),'Y='+pos(ZC.HERO.yosha),'cut='+!!F().cut,'strings='+ZC.W.threads.filter(q=>q.string).length,(u!=='TIMEOUT'&&F().cut)?'climb ok':'FAIL climb']
//@@
// чердак: пять нитяных мороков — бьют оба; потом ролик с веретеном и звеном, уровень пройден
const r=[U.until(()=>ZC.W.enemies.some(e=>e.alive&&e.pos.y>6),10),'foes='+ZC.W.enemies.filter(e=>e.alive).length];
r.push(hb(120),'petals='+P[0].petals+','+P[1].petals);
const u=U.until(()=>F().out||ZC.W.levelId!=='1-5',45);if(ZC.G.cine){ZC.skip();ZC.tick(30);}const u2=U.until(()=>F().out||ZC.W.levelId!=='1-5',20);
r.push('out '+u+' '+u2,'out='+!!F().out,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(F().out&&!_errs.length)?'1-5 ok':'FAIL 1-5');r
