//@@ wait=1500
// релиз final06: 2-1 «Гусли Садко» вдвое длиннее (late_99e_k21.js) — новые участки вдвоём настоящими нажатиями:
// Г2 «Переливная улица» (Потап на заслонке на дне, перелив: прилив у одного = отлив у другого, лодкой к террасе, верёвка — ворота друга),
// Ж2 «Палаты Морского царя» (играют гусли — царь пляшет, двери открыты, волны прыгаем; оставленный доигрывает),
// З2 «Сад Китежа» (Потап по дну до якоря и ракушки, отлив, оставленный держит; Йоша растит лесенки; подъём по листьям), ворота — уровень пройден.
// Плюс начало: напев Садко после подарка гуслей. Звеньев 4.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',attack:'KeyF',swap:'KeyQ',skill:'KeyE',item:'KeyR'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',attack:'Comma',swap:'KeyK',skill:'KeyL',item:'Semicolon'}];
window.ACT=(pi,kind)=>{if(U.act(pi).kind!==kind){U.tap(KEYS[pi].swap);ZC.tick(4);}return U.act(pi).kind===kind;};
// идти, перепрыгивая волны палат
window.WALKW=(pi,x,z,max)=>U.walkTo(pi,x,z,max,(h)=>{const D=ZC.W.dbg21();for(const w of D.WAV){const d=h.pos.z-w.z;if(d>0.6&&d<2.2&&h.grounded&&h.pos.y<0.8){ZC.press(KEYS[pi].jump);break;}}});
// подняться по листьям водоросли-лесенки
window.CLIMB=(pi,S)=>{const K=KEYS[pi],B=[K.left,K.right,K.up,K.down];let n=0;for(const L of S.leaves){const c=L.col;let ok=false;
  for(let i=0;i<240;i++){const h=U.act(pi),dx=c.x-h.pos.x,dz=c.z-h.pos.z,d=Math.hypot(dx,dz);ZC.hold(B[0],dx<-0.12);ZC.hold(B[1],dx>0.12);ZC.hold(B[2],dz<-0.12);ZC.hold(B[3],dz>0.12);
    if(h.grounded&&h.groundRef===c&&d<0.45){ok=true;break;}if(h.grounded&&c.maxy>h.pos.y+0.2&&d<1.7)ZC.press(K.jump);ZC.tick(1);}
  B.forEach(k=>ZC.hold(k,false));ZC.tick(2);if(!ok)return 'stuck@'+n+' '+U.act(pi).pos.toArray().map(v=>v.toFixed(2));n++;}return 'ok';};
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
'links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal
//@@
// напев Садко: после подарка гуслей — отдельная сценка с четырьмя звуками
const F=ZC.W.flags;F.stage='sadko';ZC.W.waterTargets.find(w=>w.active()).onWater();let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(30);
const d1=ZC.G.cine?ZC.G.cine.dur:0;if(Math.abs(d1-8.2)>0.01)throw new Error('нет сценки «напев Садко»: '+d1);ZC.skip();ZC.tick(5);if(!ZC.W.abil.gusli)throw new Error('гуслей нет');'tune scene ok'
//@@
// Г2: Потап — на заслонку на дне левого канала (левый в отливе), Прошка играет прилив у левой ракушки
const D=ZC.W.warp21('perel');ZC.tick(20);ZC.skip();for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(10);
if(!ACT(0,'potap'))throw new Error('нет Потапа');const r=[U.walkTo(0,-10.2,-80.2,5),U.walkTo(0,-10.2,-86,6),U.walkTo(0,-2.8,-95,8)];ZC.tick(20);
if(!D.SLU.held())throw new Error('Потап не встал на заслонку: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2)));
ACT(0,'proshka');ZC.tick(5);r.push(U.walkTo(0,-9.8,-79.4,8));U.tap('KeyR');ZC.tick(160);
if(D.CL.state!=='high'||D.CR.state!=='low')throw new Error('перелив не сработал: '+D.CL.state+'/'+D.CR.state+' '+r.join());
const py=ZC.HERO.potap.pos.y;if(py>-1.9)throw new Error('Потап всплыл: '+py.toFixed(2));'sluice ok potap y='+py.toFixed(2)+' '+r.join()
//@@ shot=k21_perel_flow.png
// Прошка: в воду, на лодку, на террасу, верёвка — открывает ворота Пелагеи
const D=ZC.W.dbg21();const r=[U.walkTo(0,-8.3,-100,8),U.walkTo(0,-8.3,-104.5,4,(h)=>{if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('Space');})];ZC.tick(30);
r.push(U.walkTo(0,-8.3,-109.2,4,(h)=>{if(h.grounded&&h.pos.y<3.1)ZC.press('Space');}));ZC.tick(20);r.push(U.walkTo(0,-5.9,-110.4,3));ZC.tick(5);
ZC.HERO.proshka.face=Math.PI/2;U.tap('KeyF');ZC.tick(30);if(!D.ropes[0].pulled)throw new Error('левая верёвка не дёрнута: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2)));
if(!D.PG[1].open)throw new Error('ворота Пелагеи не открылись');'left rope ok '+r.join()
//@@
// Пелагея: прилив справа (Потап на заслонке держит — левый уходит в отлив), на лодку, на террасу, верёвка — ворота Прошки;
// в канале плавает щука — её каплю Пелагея отбивает щитом (SH)
window.SH=pi=>h=>{if(ZC.W.bolts.some(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2))ZC.press(pi?'Period':'KeyG');};
const D=ZC.W.dbg21();ACT(1,'pelageya');const r=[U.walkTo(1,9.8,-79.4,8)];U.tap('Semicolon');ZC.tick(160);if(D.CR.state!=='high'||D.CL.state!=='low')throw new Error('правый прилив не пошёл: '+D.CR.state);
r.push(U.walkTo(1,8.3,-100,8,SH(1)),U.walkTo(1,8.3,-104.5,4,(h,i)=>{SH(1)(h);if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('KeyM');}));ZC.tick(30);
r.push(U.walkTo(1,8.3,-109.2,4,(h)=>{SH(1)(h);if(h.grounded&&h.pos.y<3.1)ZC.press('KeyM');}));ZC.tick(20);r.push(U.walkTo(1,5.9,-110.4,3,SH(1)));ZC.tick(5);ZC.HERO.pelageya.face=-Math.PI/2;U.tap('Comma');ZC.tick(30);
if(!D.ropes[1].pulled||!D.PG[0].open)throw new Error('правая верёвка/левые ворота: '+r.join()+' '+U.act(1).pos.toArray().map(v=>v.toFixed(2)));
r.push(U.walkTo(0,-6,-114,5),U.walkTo(1,6,-114,5),U.walkTo(0,-6,-117.5,4),U.walkTo(1,6,-117.5,4));if(!(U.act(0).pos.z<-113&&U.act(1).pos.z<-113))throw new Error('не прошли ворота: '+r.join());'perelivnaya ok'
//@@ shot=k21_perel_done.png
// Ж2: Прошка играет у стула гусляра — царь пляшет; Прошку оставляем (доигрывает), Потап и Пелагея бегут через волны
const D=ZC.W.warp21('dance');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(10);
ACT(0,'proshka');ACT(1,'pelageya');const r=[U.walkTo(0,-7.8,-183.2,5)];U.tap('KeyR');ZC.tick(20);if(!(D.KING.hum>4))throw new Error('царь не пляшет: '+D.KING.hum);
U.tap('KeyQ');ZC.tick(10);if(!ZC.HERO.proshka.kwHold)throw new Error('оставленный Прошка не доигрывает');
r.push(WALKW(1,6,-200,8),WALKW(1,7.8,-211.6,8));U.tap('Semicolon');ZC.tick(10);if(!(D.KING.hum>5))throw new Error('у трона не сыграли: '+r.join()+' '+U.act(1).pos.toArray().map(v=>v.toFixed(1)));
'pelageya at throne seat '+r.join()+' hum='+D.KING.hum.toFixed(1)
//@@ shot=k21_dance.png
// Потап бежит следом (оставленный Прошка ещё играет) — пока оба активных не за дверями, царь пляшет; потом ролик и жемчужинки
const D=ZC.W.dbg21();let fr=0;const keep=()=>{if(++fr%150===0)ZC.press('Semicolon');};   // Пелагея у трона подыгрывает, пока Потап идёт
const W2=(x,z,m)=>U.walkTo(0,x,z,m,(h,i)=>{keep();const D2=ZC.W.dbg21();for(const w of D2.WAV){const d=h.pos.z-w.z;if(d>0.6&&d<2.2&&h.grounded&&h.pos.y<0.8){ZC.press('Space');break;}}});
const r=[W2(-6,-200,10),W2(-7,-216,8),U.walkTo(0,-7,-219,3)];ZC.tick(5);r.push(U.walkTo(1,7,-216,4),U.walkTo(1,7,-219,3));ZC.tick(5);
if(!D.F.kingDone)throw new Error('царь не закончил: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(1))+' hum='+D.KING.hum.toFixed(1));
let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(60);if(D.HD.some(q=>q.col.on))throw new Error('двери закрылись после пляски');'dance ok nuts='+ZC.W.nuts
//@@
// З2: сад залит; Потап по дну — к якорю (поднять) и к ракушке (отлив); оставляем его — держит отлив
const D=ZC.W.warp21('garden');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(10);
if(D.GARD.state!=='high')throw new Error('сад не залит');ACT(0,'potap');const r=[U.walkTo(0,8.2,-237.6,5),U.walkTo(0,8.2,-243,6),U.walkTo(0,4,-256.8,8)];ZC.tick(10);
U.tap('KeyE');ZC.tick(60);if(!D.F.anchor)throw new Error('якорь не поднят: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2)));
r.push(U.walkTo(0,0.6,-245.6,6));U.tap('KeyR');ZC.tick(20);if(D.GARD.state!=='low')throw new Error('отлив в саду не сыгран: '+D.GARD.state+' '+r.join());
U.tap('KeyQ');ZC.tick(5);if(!ZC.HERO.potap.kwHold)throw new Error('оставленный Потап не держит отлив');ZC.tick(150);'garden low, potap holds '+r.join()
//@@ shot=k21_garden_low.png
// Йоша: вниз по ступеням, полить оба ростка; подъём по лесенке на террасу; через 10+15 с родник снова наполнит сад
const D=ZC.W.dbg21();ACT(1,'yosha');const r=[U.walkTo(1,8.2,-237.6,5),U.walkTo(1,8.2,-243,6),U.walkTo(1,-4,-256.6,8)];ZC.HERO.yosha.face=Math.PI;U.tap('KeyL');ZC.tick(60);
r.push(U.walkTo(1,4,-256.6,6));ZC.HERO.yosha.face=Math.PI;U.tap('KeyL');ZC.tick(90);if(!D.KS[0].grown||!D.KS[1].grown)throw new Error('ростки не выросли: '+r.join()+' '+D.KS.map(s=>s.grown));
r.push(CLIMB(1,D.KS[1]));r.push(U.walkTo(1,4,-260.4,3));if(!(U.act(1).pos.y>4.3))throw new Error('Йоша не на террасе: '+r.join()+' '+U.act(1).pos.toArray().map(v=>v.toFixed(2)));
'yosha up '+r.join()
//@@ shot=k21_garden_up.png
// Прошка (если сад ещё в отливе) — вниз и по другой лесенке; иначе Потап снова сыграет отлив
const D=ZC.W.dbg21();const r=[];let w=0;while(D.GARD.state==='low'&&w<2400){ZC.tick(1);w++;}r.push('waited '+(w/60).toFixed(1));ACT(0,'potap');r.push(U.walkTo(0,0.6,-245.6,8));U.tap('KeyR');ZC.tick(20);ACT(0,'proshka');
r.push(U.walkTo(0,-8.2,-237.6,6),U.walkTo(0,-8.2,-243,6),U.walkTo(0,-4,-256.6,8),CLIMB(0,D.KS[0]),U.walkTo(0,-4,-260.4,3));
if(!(U.act(0).pos.y>4.3))throw new Error('Прошка не на террасе: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2))+' gard='+D.GARD.state);'proshka up '+r.join()
//@@
// ворота: звено и конец уровня
const r=[U.walkTo(0,-2,-265,5),U.walkTo(1,2,-265,5),U.walkTo(0,-0.5,-272.6,6),U.walkTo(1,2,-270,4),U.walkTo(0,-1,-279,4),U.walkTo(1,2,-279,4)];ZC.tick(120);
'links='+ZC.W.links+' nuts='+ZC.W.nuts+' out='+!!ZC.W.flags.out+' state='+ZC.G.state+' lvl='+ZC.W.levelId+' '+r.join()
//@@
if(!ZC.W.flags.out&&ZC.W.levelId==='2-1')throw new Error('уровень не пройден');if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-1 done errs=0'
