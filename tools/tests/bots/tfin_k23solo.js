//@@ wait=1500
// релиз final06: 2-3 «Невод» — новые участки в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// протока — Пелагея на плоту, Прошка играет течение и остаётся доигрывать, Потап прыгает на плот; у водоворота — Совиный взор,
// тайное течение с уступа, плот плывёт дальше; озеро — Потап и Йоша на камнях невода, Пелагея у восточной раковины, Прошка играет
// западное течение и остаётся, Пелагея — навстречу; ёрш пойман, рыбий суд, конец уровня. Проверка: всё проходится одним игроком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-3'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(4);}return me().kind;};
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);if(extra)extra(h,i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.jumpTo=(x,z,max)=>go(x,z,max,h=>{if(h.grounded&&Math.hypot(x-h.pos.x,z-h.pos.z)<2.2)ZC.press('Space');});
window.callAll=(near)=>{U.tap('Digit1');for(let i=0;i<60*12;i++){ZC.tick(1);if(i>60&&['proshka','potap','pelageya','yosha'].every(k=>Math.hypot(H[k].pos.x-me().pos.x,H[k].pos.z-me().pos.z)<(near||6)))return 't='+(i/60).toFixed(1);if(i%240===239)U.tap('Digit1');}return 'TIMEOUT';};
window.st=()=>U.st()+' errs='+_errs.length;
'solo='+ZC.G.solo
//@@
// протока: Пелагея на плот; Прошка — течение на юг и остаётся; Потап — на плот; у водоворота Пелагея: взор, уступ, тайное течение
const D=ZC.W.warp23('protoka');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}toKind('pelageya');const r=[go(0.4,-37.8,6)];
toKind('proshka');r.push(go(-4.4,-34.4,6));me().face=Math.PI;U.tap('KeyR');ZC.tick(4);if(D.C1.dir!==-1)throw new Error('течение не на юг: '+D.C1.dir);toKind('potap');if(!H.proshka.kwHold)throw new Error('Прошка не доигрывает');
r.push(jumpTo(-0.4,-39,6));let t=0;while(!D.WH.met&&t<900){ZC.tick(1);t++;}if(!D.WH.met)throw new Error('плот не доплыл до водоворота: '+D.RAFT.z.toFixed(1)+' '+r.join()+' '+st());
toKind('pelageya');U.tap('KeyE');ZC.tick(20);if(!D.F.hidFound)throw new Error('тайное течение не найдено');r.push(jumpTo(2.5,-47.5,5));me().face=-Math.PI/2;U.tap('KeyR');ZC.tick(20);
if(D.WH.on)throw new Error('водоворот не распался: '+r.join()+' '+st());r.push(jumpTo(D.RAFT.x,D.RAFT.z,5));t=0;while(D.RAFT.z>-56&&t<1200){ZC.tick(1);t++;}
if(D.RAFT.z>-56)throw new Error('плот не доплыл: '+D.RAFT.z.toFixed(1)+' '+r.join());r.push(go(0,-60,6),callAll(6));'protoka solo '+r.join()
//@@
// озеро: Потап — северный камень, Йоша — южный, Пелагея — к восточной раковине; Прошка играет западное и остаётся; Пелагея — навстречу
const D=ZC.W.warp23('lake');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const r=[];toKind('potap');r.push(go(0,-62.9,6));toKind('yosha');r.push(go(-11,-63,6),go(-11,-83,8),go(0,-83.1,6));ZC.tick(10);
if(!D.NS.every(s=>s.hero))throw new Error('камни невода не заняты: '+r.join()+' '+st());toKind('pelageya');r.push(go(10.2,-73,12));
toKind('proshka');r.push(go(-10.2,-73,10));me().face=Math.PI/2;U.tap('KeyR');ZC.tick(4);toKind('pelageya');if(!H.proshka.kwHold)throw new Error('Прошка не доигрывает');me().face=-Math.PI/2;U.tap('KeyR');ZC.tick(4);
if(D.CW.dir!==1||D.CE.dir!==-1)throw new Error('течения не навстречу: '+D.CW.dir+'/'+D.CE.dir+' '+r.join()+' '+st());let t=0;while(!D.YR.caught&&t<900){ZC.tick(1);t++;}
if(!D.YR.caught)throw new Error('ёрш не пойман: x='+D.YR.x.toFixed(1));t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}while(ZC.G.cine&&t<4000){ZC.tick(1);t++;}ZC.tick(300);'lake solo '+r.join()+' out='+!!ZC.W.flags.out
//@@
if(ZC.W.levelId==='2-3'&&!ZC.W.flags.out)throw new Error('уровень не пройден: '+st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-3 solo done errs=0'
