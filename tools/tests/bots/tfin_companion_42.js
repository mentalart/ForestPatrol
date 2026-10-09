//@@ wait=1500
// релиз final06: напарник-бот проходит 4-2 «Река Смородина» за Игрока 2 (Йоша): ручей (корка у края и прыжок), бурлящая струя (корки из заводи клещами, чехарда до дальнего берега),
// разлив (плот на течении между паровыми столбами), лавопад (спуск по каскаду на корках, затвор жёлоба), завеса (встаёт к Потапу — подкинет; гасит завесу, когда Потап подошёл),
// запруда (плиту, сбитую рогаткой человека, остужает за шесть секунд) и ступени вниз. Человека (Игрок 1) играет скрипт: прыгает на корки и плот, подкидывает Потапом, стреляет по щеколде Прошкой.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.carry&&!h.carry.gone?'+'+h.carry.kind:'');
window.FALLS=()=>ZC.G.stats.falls||0;
window.RESET42=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('4-2'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='4-2')break;}ZC.skip();ZC.tick(10);U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(30);window.H=ZC.HERO;return F().stage;};
// бот и человек в точке; стадия уровня выставлена, как будто дошли сами
window.PUT=(stage,x,z,hx,hz)=>{F().stage=stage;H.yosha.pos.set(x,0,z);H.proshka.pos.set(hx,0,hz);H.potap.pos.set(hx+1,0,hz);H.pelageya.pos.set(x+1,0,z);for(const k of Object.keys(H)){H[k].vel.set(0,0,0);H[k].following=false;}ZC.tick(5);};
// человек рогаткой сбивает ящерок-плевуний (метки на сваях): каждые полсекунды — все видимые
window.SHOOT=i=>{if(i%30===0)ZC.W.marks.filter(m=>m.active()).forEach(m=>m.onHit());};
RESET42();
['stage='+F().stage,'bot='+pos(bot()),CO.mode,!!CO.routes['4-2']]
//@@
// ручей: корка у самого края, по ней до дальнего конца и прыжок на тот берег (прыжок Йоши ~4 м — ручей 4,2 м)
if(!CO.routes['4-2'])throw new Error('нет маршрута 4-2');RESET42();PUT('a',2,7,-1,8);const f0=FALLS();const L=[];let lm='';
for(let i=0;i<60*20&&!(H.yosha.pos.z<-6.6&&H.yosha.pos.y>-0.5);i++){ZC.tick(1);SHOOT(i);if(CO.mode!==lm){L.push((i/60).toFixed(1)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(!(H.yosha.pos.z<-6.6))throw new Error('ручей не пройден: '+pos(bot())+' '+L.join(' | '));if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0));
'brook ok '+pos(bot())
//@@
// бурлящая струя: человек рядом (идёт за ботом по корке, как живой); корки из заводи, чехарда до дальнего берега без падений
RESET42();PUT('b',0,-8,1.2,-12.2);const W=ZC.W,P=H.proshka,Y=H.yosha;const f0=FALLS();const pf=()=>P.pos.y<-0.4?1:0;const L=[];let lm='';
for(let i=0;i<60*60&&!(Y.pos.z<-21.6&&Y.pos.y>-0.5);i++){ZC.tick(1);SHOOT(i);if(CO.mode!==lm){L.push((i/60).toFixed(1)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}
  // человек идёт за ботом по коркам: ближайшая корка впереди, что живёт ещё секунду-другую (на берег — прыжком)
  const cs=W.crusts.filter(c=>!c.gone&&c.t>1.5&&c.z<P.pos.z-0.9&&Math.hypot(c.x-P.pos.x,c.z-P.pos.z)<2.6).sort((a,b)=>b.z-a.z);
  if(cs[0]){U.step(0,0,cs[0].z-0.3,0.2);}else if(Y.pos.z<-20&&P.pos.z>-20.6&&P.pos.z<-18){U.step(0,0,-22,0.3);if(P.grounded&&P.pos.z<-19)ZC.press('Space');}else U.rel(0);}
U.rel(0);if(!(Y.pos.z<-21.6&&Y.pos.y>-0.5))throw new Error('струя не пройдена: '+pos(bot())+' '+CO.mode+' '+L.slice(-6).join(' | '));if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0));
'channel ok '+pos(bot())+' human '+pos(P)+' falls='+(FALLS()-f0)
//@@
// разлив: плот на течении (человек запрыгивает) — между паровыми столбами до берега, без падений; ящерки на сваях стреляют
RESET42();PUT('c',0.5,-22,2,-23);const W=ZC.W,P=H.proshka,Y=H.yosha;const f0=FALLS();let boarded=0;const L=[];let lm='';
for(let i=0;i<60*40&&!(Y.pos.z<-42.5&&Y.pos.y>-0.5);i++){ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(1)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}
  const rf=W.crusts.find(c=>!c.gone&&c.raft&&c.z<-26&&c.z>-31);if(rf&&!boarded&&rf.age>0.2){U.step(0,rf.x,rf.z,0.2);if(Math.hypot(P.pos.x-rf.x,P.pos.z-rf.z)<0.9)boarded=1;}else U.rel(0);}
U.rel(0);if(!(Y.pos.z<-42.5&&Y.pos.y>-0.5))throw new Error('разлив не пройден: '+pos(bot())+' '+CO.mode+' '+L.slice(-6).join(' | '));if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0));
'raft ok '+pos(bot())+' human '+pos(P)
//@@
// лавопад: ролик «Сиди тут»; Йоша по каскаду на корках, внизу гасит затвор жёлоба (оступится — Потап поймает)
RESET42();PUT('d',0,-45,1.5,-44.5);const W=ZC.W,f0=FALLS();H.proshka.pos.set(1.5,0,-48.2);for(let i=0;i<120&&!ZC.G.cine;i++)ZC.tick(1);ZC.skip();ZC.tick(10);U.nocine();ZC.tick(5);
if(F().stage!=='fall')throw new Error('нет стадии fall: '+F().stage);const L=[];let lm='';
for(let i=0;i<60*60&&!F().valve;i++){ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(1)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(!F().valve)throw new Error('затвор не остужен: '+pos(bot())+' '+CO.mode+' '+L.slice(-5).join(' | '));
'cascade ok valve stage='+F().stage+' falls='+(FALLS()-f0)+' caught='+!!F().caught
//@@
// завеса, запруда, ступени: человек — Потапом подкидывает Йошу, идёт сквозь застывшую завесу; потом Прошкой сбивает щеколду и спускается; бот гасит завесу и раскалённую плиту, идёт вниз
RESET42();const W=ZC.W,F2=F();F2.stage='tier1';F2.valve=true;W.noSwap=null;
for(const k of Object.keys(H)){H[k].following=false;}
H.potap.pos.set(0.0,-2.2,-59.0);H.proshka.pos.set(-3,-2.2,-58.5);H.pelageya.pos.set(-3,-2.2,-58.0);H.yosha.pos.set(3.5,-2.2,-58);for(const k of Object.keys(H))H[k].vel.set(0,0,0);ZC.tick(10);
ZC.press('KeyQ');ZC.tick(5);const Po=H.potap,Pr=H.proshka,Y=H.yosha;let tossed=0,shot=0,swapped=0;const L=[];let lm='';
for(let i=0;i<60*90&&!(F2.stage==='cut2'||F2.out);i++){ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(1)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}
  if(!tossed){Po.face=Math.PI;if(Math.hypot(Y.pos.x-Po.pos.x,Y.pos.z-Po.pos.z)<1.6&&Y.grounded&&i>30){ZC.press('KeyE');tossed=i;}else U.rel(0);}
  else if(Po.pos.y>-3.4){if(W.k42.cur()>0.5)U.step(0,0,-64,0.3);else if(Po.pos.z>-59.4)U.step(0,0,-59.4,0.2);else U.rel(0);}
  else if(!swapped){U.rel(0);ZC.press('KeyQ');swapped=1;ZC.tick(5);Pr.pos.set(1.5,-4.2,-63.6);Pr.vel.set(0,0,0);ZC.tick(5);}
  else if(!shot||W.k42.dam()==='up'&&F2.stage==='dam'&&i%60===0&&shot<4){const mk=W.marks.find(m=>m.active());if(mk){Pr.face=Math.atan2(mk.pos.x-Pr.pos.x,mk.pos.z-Pr.pos.z);ZC.tick(1);ZC.press('KeyE');shot++;}}
  else if(F2.stage==='down'){U.step(0,1.2,-72,0.4);}}
U.rel(0);if(!tossed)throw new Error('Потап не подкинул Йошу: '+pos(bot())+' '+CO.mode);if(!(F2.stage==='cut2'||F2.out))throw new Error('низ не достигнут: stage='+F2.stage+' '+pos(bot())+' Po '+pos(Po)+' '+CO.mode+' '+L.slice(-6).join(' | '));
'lower ok stage='+F2.stage+' shots='+shot
//@@
// финал: ролик внизу, уровень пройден; ошибок в консоли нет
const F3=F();for(let i=0;i<60*60&&!F3.out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}
if(!F3.out)throw new Error('уровень не завершён: stage='+F3.stage+' '+pos(bot())+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'end ok out='+F3.out
