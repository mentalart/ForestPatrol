//@@ wait=1500
// релиз final06: 2-1 «Гусли Садко» — новые участки в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// Переливная улица — Потап стоит на заслонке сам (оставленный), Пелагея и Прошка по очереди подымают свою воду; палаты Морского царя —
// играешь и меняешь героя: оставленный доигрывает 15 с; у трона Потап подыгрывает, пока идёт Пелагея; сад Китежа — Потап по дну,
// оставленный держит отлив, Йоша растит лесенки, подъём; «Ко мне!» — и к воротам. Проверка: всё проходится одним игроком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(4);}return me().kind;};
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);if(extra)extra(h,i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.waves=(h)=>{for(const w of ZC.W.dbg21().WAV){const d=h.pos.z-w.z;if(d>0.6&&d<2.2&&h.grounded&&h.pos.y<0.8){ZC.press('Space');break;}}};
window.CLIMB=(S)=>{let n=0;for(const L of S.leaves){const c=L.col;let ok=false;for(let i=0;i<240;i++){const h=me(),dx=c.x-h.pos.x,dz=c.z-h.pos.z,d=Math.hypot(dx,dz);
    ZC.hold(B0[0],dx<-0.12);ZC.hold(B0[1],dx>0.12);ZC.hold(B0[2],dz<-0.12);ZC.hold(B0[3],dz>0.12);if(h.grounded&&h.groundRef===c&&d<0.45){ok=true;break;}if(h.grounded&&c.maxy>h.pos.y+0.2&&d<1.7)ZC.press('Space');ZC.tick(1);}
  rel();ZC.tick(2);if(!ok)return 'stuck@'+n;n++;}return 'ok';};
window.callAll=()=>{U.tap('Digit1');for(let i=0;i<60*10;i++){ZC.tick(1);if(i>60&&['proshka','potap','pelageya','yosha'].every(k=>Math.hypot(H[k].pos.x-me().pos.x,H[k].pos.z-me().pos.z)<6))break;if(i%240===239)U.tap('Digit1');}};
window.st=()=>U.st()+' errs='+_errs.length;
'solo='+ZC.G.solo
//@@
// Переливная улица: Потап — на заслонку; Пелагея (справа прилив) — к террасе, верёвка; Прошка — прилив слева, к террасе, верёвка
const D=ZC.W.warp21('perel');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
toKind('potap');const r=[go(-10.2,-80.2,5),go(-10.2,-86,6),go(-2.8,-95,8)];ZC.tick(20);if(!D.SLU.held())throw new Error('Потап не на заслонке: '+r.join()+' '+st());
toKind('pelageya');r.push(go(8.3,-100,10),go(8.3,-104.5,4,h=>{if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('Space');}),go(8.3,-109.2,4,h=>{if(h.grounded&&h.pos.y<3.1)ZC.press('Space');}),go(5.9,-110.4,3));
me().face=-Math.PI/2;U.tap('KeyF');ZC.tick(20);if(!D.ropes[1].pulled)throw new Error('Пелагея не дёрнула: '+r.join()+' '+st());
toKind('proshka');r.push(go(-9.8,-79.4,10));U.tap('KeyR');ZC.tick(160);if(D.CL.state!=='high')throw new Error('левый прилив не пошёл: '+D.CL.state+' '+st());
r.push(go(-8.3,-100,8),go(-8.3,-104.5,4,h=>{if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('Space');}),go(-8.3,-109.2,4,h=>{if(h.grounded&&h.pos.y<3.1)ZC.press('Space');}),go(-5.9,-110.4,3));
me().face=Math.PI/2;U.tap('KeyF');ZC.tick(20);if(!D.ropes[0].pulled||!D.PG[0].open||!D.PG[1].open)throw new Error('ворота не открыты: '+r.join()+' '+st());
r.push(go(-6,-117.5,6));toKind('pelageya');r.push(go(6,-117.5,6));if(!(H.proshka.pos.z<-113&&H.pelageya.pos.z<-113))throw new Error('не спустились: '+r.join());'perel solo ok'
//@@
// палаты: Прошка играет у входа и остаётся доигрывать; Потап через волны к трону — подыгрывает; Пелагея проходит; Потап — следом
const D=ZC.W.warp21('dance');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
toKind('proshka');const r=[go(-7.8,-183.2,5)];U.tap('KeyR');ZC.tick(10);toKind('potap');if(!H.proshka.kwHold)throw new Error('Прошка не доигрывает');
r.push(go(7.8,-200,12,waves),go(7.8,-211.6,8,waves));U.tap('KeyR');ZC.tick(10);toKind('pelageya');if(!H.potap.kwHold)throw new Error('Потап у трона не доигрывает: '+r.join()+' '+st());
r.push(go(6,-200,10,waves),go(7,-216,8,waves),go(7,-219,3));toKind('potap');U.tap('KeyR');ZC.tick(5);r.push(go(7,-216,4),go(7,-219,3));ZC.tick(10);
if(!ZC.W.flags.kingDone)throw new Error('палаты не пройдены: '+r.join()+' '+st()+' hum='+D.KING.hum.toFixed(1));let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(30);'dance solo ok '+r.join()
//@@
// сад: Потап — якорь и отлив, оставлен; Йоша — оба ростка и наверх; потом Потап ещё раз отлив (если залило), Прошка наверх; «Ко мне!» и ворота
const D=ZC.W.warp21('garden');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
toKind('potap');const r=[go(8.2,-237.6,5),go(8.2,-243,6),go(4,-256.8,8)];U.tap('KeyE');ZC.tick(60);if(!ZC.W.flags.anchor)throw new Error('якорь: '+r.join()+' '+st());
r.push(go(0.6,-245.6,6));U.tap('KeyR');ZC.tick(20);if(D.GARD.state!=='low')throw new Error('отлив не сыгран: '+st());toKind('pelageya');toKind('yosha');
r.push(go(8.2,-237.6,6),go(8.2,-243,6),go(-4,-256.6,8));me().face=Math.PI;U.tap('KeyE');ZC.tick(60);r.push(go(4,-256.6,6));me().face=Math.PI;U.tap('KeyE');ZC.tick(90);
if(!D.KS[0].grown||!D.KS[1].grown)throw new Error('ростки: '+r.join()+' '+st());r.push(CLIMB(D.KS[1]),go(4,-260.4,3));if(!(me().pos.y>4.3))throw new Error('Йоша не наверху: '+r.join()+' '+st());
'yosha up '+r.join()
//@@
const D=ZC.W.dbg21();const r=[];let w=0;while(D.GARD.state==='low'&&w<2400){ZC.tick(1);w++;}toKind('potap');U.tap('KeyR');ZC.tick(20);if(D.GARD.state!=='low')throw new Error('второй отлив: '+st());
toKind('proshka');r.push(go(-8.2,-237.6,8),go(-8.2,-243,6),go(-4,-256.6,8),CLIMB(D.KS[0]),go(-4,-260.4,3));if(!(me().pos.y>4.3))throw new Error('Прошка не наверху: '+r.join()+' '+st());
r.push(go(0,-268,6));callAll();r.push(go(0,-279,6));ZC.tick(60);callAll();r.push(go(0,-280,4));ZC.tick(120);'end '+r.join()+' lvl='+ZC.W.levelId+' out='+!!ZC.W.flags.out
//@@
if(ZC.W.levelId==='2-1'&&!ZC.W.flags.out)throw new Error('уровень не пройден: '+st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-1 solo done errs=0'
