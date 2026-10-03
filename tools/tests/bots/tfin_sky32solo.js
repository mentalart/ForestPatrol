//@@ wait=1500
// релиз final06: 3-2 «Облачные пастбища» втрое длиннее — новые участки ОДНИМ игроком (Q — по кругу Прошка → Потап → Пелагея → Йоша):
// Пушок — зажёг, сменил героя, зажёг второе перо; уступ — свет оставлен у уступа, Йоша поливает Пушка и прыгает, Потап — тоже;
// светомостки — Потап со светом; радуги — Йоша со своим светом, толстушку — Потап; Овчарня — Прошка ведёт барашков. Проверки — исключением.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const W=ZC.W,H=ZC.HERO,F=W.flags,LB=W.lamb32;ZC.FIN.warp('lamb');ZC.tick(10);for(const h of Object.values(H)){h.lit=false;h.following=false;}
U.toKind('proshka');H.proshka.pos.set(-1.4,15,-104.6);H.potap.pos.set(1.4,15,-104.6);ZC.tick(3);U.tap('KeyR');ZC.tick(20);if(F.lambFree)throw new Error('одно перо растопило нить');
U.toKind('potap');U.tap('KeyR');ZC.tick(10);if(!ZC.G.cine)throw new Error('одиночный: нет ролика Пушка lit='+[H.proshka.lit,H.potap.lit]);U.nocine();ZC.tick(10);'solo lamb ok '+LB.mode
//@@
const W=ZC.W,H=ZC.HERO,LB=W.lamb32;ZC.FIN.warp('cliff');ZC.tick(10);for(const h of Object.values(H)){h.lit=false;h.following=false;}
U.toKind('proshka');H.proshka.pos.set(0,15,-127.2);H.proshka.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(150);
U.toKind('yosha');const Y=H.yosha;Y.pos.set(LB.pos.x+1.5,15,LB.pos.z+0.4);Y.vel.set(0,0,0);ZC.tick(3);Y.face=Math.atan2(LB.pos.x-Y.pos.x,LB.pos.z-Y.pos.z);U.tap('KeyE');ZC.tick(40);if(!(LB.puffT>0))throw new Error('одиночный: Пушок не распушился');
// Йоша по-настоящему: подходит к Пушку, прыгает на него, держит вперёд
const jumpOn=(h)=>{for(let i=0;i<60*3;i++){const dx=LB.pos.x-h.pos.x,dz=LB.pos.z-h.pos.z,d=Math.hypot(dx,dz),up=h.pos.y>LB.pos.y+1.3;ZC.hold('KeyA',!up&&dx<-0.2);ZC.hold('KeyD',!up&&dx>0.2);ZC.hold('KeyW',up||dz<-0.2||d<0.9);ZC.hold('KeyS',!up&&dz>0.2&&d>0.9);if(d<1.3&&h.grounded)ZC.press('Space');if(h.pos.y>18.9&&h.pos.z<-128.3&&h.grounded)break;ZC.tick(1);}U.rel(0);return h.pos.y>18.9&&h.pos.z<-128.3;};
const yUp=jumpOn(Y);if(!yUp)throw new Error('одиночный: Йоша не запрыгнула: '+U.st()+' puff='+LB.puffT.toFixed(1));
U.toKind('potap');const P=H.potap;P.pos.set(LB.pos.x-1.2,15,LB.pos.z+0.6);P.vel.set(0,0,0);ZC.tick(5);const pUp=jumpOn(P);if(!pUp)throw new Error('одиночный: Потап не запрыгнул: '+U.st()+' puff='+LB.puffT.toFixed(1));
'solo cliff ok '+U.st()
//@@
const W=ZC.W,H=ZC.HERO;ZC.FIN.warp(2.2,-165,19.2);ZC.tick(10);U.nocine();ZC.tick(5);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('potap');const P=H.potap;P.pos.set(0,19.2,-166.5);P.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(5);
for(let i=0;i<60*14;i++){const t=P.pos.z>-176.2?-176.8:-189;U.step(0,0,t,0.4);if(P.pos.z<-188.6)break;ZC.tick(1);}U.rel(0);if(P.pos.z>-188.4)throw new Error('одиночный: Потап не перешёл светомостки: '+U.st());
// зовём остальных — Звенышко подтягивает отставших
U.goto(0,0,-196,4);ZC.press('KeyC');ZC.tick(300);'solo wind ok '+U.st()
//@@
const W=ZC.W,H=ZC.HERO;ZC.FIN.warp('rainbow2');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
const R2=W.rains[1],R3=W.rains[2];U.toKind('yosha');const Y=H.yosha;Y.pos.set(-2.2,19.2,-223.2);Y.vel.set(0,0,0);Y.face=Math.PI;ZC.tick(3);U.tap('KeyR');ZC.tick(3);U.tap('KeyE');ZC.tick(60);
if(!R2.bow.on)throw new Error('одиночный: радуга 2 не встала rain='+R2.rain.toFixed(1)+' lit='+Y.lit);
U.toKind('potap');const P=H.potap;P.pos.set(0,19.2,-224);P.vel.set(0,0,0);ZC.tick(3);U.goto(0,0,-227,4);U.goto(0,-1.0,-240.6,8);if(P.pos.z>-238)throw new Error('одиночный: Потап не на островке '+U.st());
U.tap('KeyR');ZC.tick(5);U.goto(0,-1.2,-241.4,2);ZC.tick(5);U.tap('KeyE');ZC.tick(60);if(!R3.bow.on)throw new Error('одиночный: радуга 3 не встала');
U.goto(0,0,-243.2,3);U.goto(0,0,-258,8);if(P.pos.z>-256.4)throw new Error('одиночный: по радуге 3 не перешёл '+U.st());'solo rainbows ok '+U.st()
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;ZC.FIN.warp('pen');ZC.tick(30);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka');const Pr=H.proshka;U.tap('KeyR');ZC.tick(3);let dmg=0;
const lead=(gx,gz)=>{for(const[x,z,w]of[[gx*0.8,gz,90],[gx*0.4,-279,0],[0,-283.6,60],[0,-276,30]]){for(let i=0;i<60*10;i++){if(U.def(0,i)){ZC.tick(1);continue;}if(U.step(0,x,z,0.5))break;ZC.tick(1);}U.rel(0);for(let i=0;i<w;i++){U.def(0,i);ZC.tick(1);}}return F.penCount;};
const r=[lead(-9,-263),lead(9,-266),lead(-9,-285)];for(let k=0;k<4&&!F.penned;k++){const s=W.herd32.find(q=>!q.penned);if(!s)break;r.push(lead(s.pos.x/0.8,s.pos.z));}
if(!F.penned)throw new Error('одиночный: не все барашки в кошаре '+r+' n='+F.penCount);U.cine(200);U.nocine();ZC.tick(10);
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'solo pen ok '+r+' errs=0'
