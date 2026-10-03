//@@ wait=1500
// релиз final06: 3-2 «Облачные пастбища» втрое длиннее (late_99o_sky32.js), вдвоём — новые участки до Громового Барана:
// Пушок (два пера — нить тает), Пушок-пружинка (полили — подкидывает и Потапа), Ветер-Ветрило (сдувает и гасит перо, за Потапом —
// укрытие), Радуга-дуга (дождик + солнце позади — по радуге проходят; вторая переправа — толстушку выжимает Потап), Овчарня
// (девять барашков к свету и в кошару, Ветер открывает лестницу). Проверки — исключением, в конце строка '… ok'.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const W=ZC.W;if(!W.warp32)throw new Error('нет W.warp32 — модуль не подключён');const H=ZC.HERO;
// длина: от старта до звена после боя
const L4=W.items.filter(i=>i.kind==='link');'links='+W.linkTotal+' nuts='+W.nutTotal+' len='+(8-(-328))
//@@
// Е: Пушок в грозовой нити — одного пера мало, два — нить тает
const W=ZC.W,H=ZC.HERO,F=W.flags,LB=W.lamb32;ZC.FIN.warp('lamb');ZC.tick(10);
H.proshka.pos.set(-1.5,15,-104.5);H.pelageya.pos.set(1.5,15,-104.5);for(const h of Object.values(H)){h.vel.set(0,0,0);h.lit=false;}ZC.tick(5);
U.tap('KeyR');ZC.tick(20);if(F.lambFree)throw new Error('нить растаяла от одного пера');
U.tap('Semicolon');ZC.tick(10);if(!ZC.G.cine)throw new Error('нет ролика Пушка: lit='+[H.proshka.lit,H.pelageya.lit]);U.nocine();ZC.tick(10);
if(LB.mode!=='free')throw new Error('Пушок не свободен: '+LB.mode);'lamb free ok mode='+LB.mode
//@@ shot=sky32_lamb.png
ZC.tick(1);
//@@
// Ж: уступ 4,2 м — без воды Пушок подкидывает невысоко, Потапа не держит; полили — подкидывает всех, даже Потапа
const W=ZC.W,H=ZC.HERO,F=W.flags,LB=W.lamb32;ZC.FIN.warp('cliff');ZC.tick(10);for(const h of Object.values(H)){h.lit=false;h.following=false;}
H.proshka.pos.set(0,15,-127.2);H.proshka.vel.set(0,0,0);H.proshka.lit=true;ZC.tick(150);const d0=Math.hypot(LB.pos.x-H.proshka.pos.x,LB.pos.z-H.proshka.pos.z);if(d0>2.4)throw new Error('Пушок не прибежал на свет: d='+d0.toFixed(2));
const drop=(h)=>{h.pos.set(LB.pos.x,LB.pos.y+1.6,LB.pos.z);h.vel.set(0,-2,0);h.grounded=false;let top=h.pos.y;for(let i=0;i<70;i++){ZC.tick(1);top=Math.max(top,h.pos.y);}return top-LB.pos.y;};
const a=drop(H.pelageya);if(a>4.0||a<2.0)throw new Error('маленький Пушок подкинул Пелагею на '+a.toFixed(2));const p=drop(H.potap);if(p>1.7)throw new Error('маленький Пушок подкинул Потапа на '+p.toFixed(2));
// Йоша поливает Пушка
U.tap('KeyK');ZC.tick(5);const Y=H.yosha;Y.pos.set(LB.pos.x+1.6,15,LB.pos.z+0.4);Y.vel.set(0,0,0);Y.face=Math.atan2(LB.pos.x-Y.pos.x,LB.pos.z-Y.pos.z);ZC.tick(3);U.tap('KeyL');ZC.tick(40);
if(!(LB.puffT>0))throw new Error('Пушок не распушился от живой воды');
const b=drop(H.pelageya),q=drop(H.potap);if(b<4.4)throw new Error('пухлый Пушок подкинул Пелагею лишь на '+b.toFixed(2));if(q<4.2)throw new Error('пухлый Пушок подкинул Потапа лишь на '+q.toFixed(2));
// по-настоящему: Потап прыгает на пухлого Пушка и держит вперёд — на уступ
ZC.tick(60);U.tap('KeyQ');ZC.tick(5);const P=H.potap;P.pos.set(LB.pos.x,LB.pos.y+1.5,LB.pos.z+0.3);P.vel.set(0,-2,0);P.grounded=false;ZC.tick(4);
for(let i=0;i<80;i++){ZC.hold('KeyW',true);ZC.tick(1);}ZC.hold('KeyW',false);ZC.tick(30);
if(!(P.pos.y>18.9&&P.pos.z<-128.3))throw new Error('Потап не запрыгнул на уступ: '+U.st());
// все наверху — Пушок сам скачет к свету наверх
H.proshka.pos.set(0,19.2,-131);H.pelageya.pos.set(1,19.2,-131);H.yosha.pos.set(-1,19.2,-131);ZC.tick(200);if(LB.pos.y<18.9)throw new Error('Пушок не поднялся на уступ: y='+LB.pos.y.toFixed(2));
'cliff ok small='+a.toFixed(1)+' potapSmall='+p.toFixed(1)+' puffy='+b.toFixed(1)+' potapPuffy='+q.toFixed(1)+' lambY='+LB.pos.y.toFixed(1)
//@@
// З: Ветер-Ветрило — дует поперёк: сдувает и гасит перо; Потапа не двигает; за Потапом — укрытие
const W=ZC.W,H=ZC.HERO,F=W.flags;ZC.FIN.warp('wind');ZC.tick(10);U.nocine();for(const h of Object.values(H)){h.following=false;}
U.toKind('proshka',0);U.toKind('pelageya',1);const Pr=H.proshka,Pe=H.pelageya,P=H.potap;
Pr.pos.set(0.6,19.2,-150);Pe.pos.set(0.6,19.2,-160.2);P.pos.set(-0.4,19.2,-160.2);[Pr,Pe,P].forEach(h=>{h.vel.set(0,0,0);});Pr.lit=true;Pe.lit=true;P.lit=true;
let blew=false;
for(let i=0;i<60*12;i++){Pr.pos.z=-150;Pe.pos.z=-160.2;Pe.pos.x=0.6;P.pos.x=-0.4;P.pos.z=-160.2;Pr.vel.x=0;if(!blew&&Pr.pos.x>1.1){blew=true;}if(blew)break;ZC.tick(1);}
if(!blew)throw new Error('Ветер не сдул Прошку: x='+Pr.pos.x.toFixed(2));ZC.tick(20);
if(Pr.lit)throw new Error('перо Прошки не задуло');if(!Pe.lit)throw new Error('перо Пелагеи задуло за Потапом');if(!P.lit)throw new Error('перо Потапа задуло');
'wind ok proshkaX='+Pr.pos.x.toFixed(2)+' pelageyaX='+Pe.pos.x.toFixed(2)+' lit='+[Pr.lit,Pe.lit,P.lit]
//@@
// З: светомостки держит свет Потапа — Потап со светом ведёт по ним Прошку
const W=ZC.W,H=ZC.HERO;ZC.FIN.warp(2.2,-165,19.2);ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('potap',0);const P=H.potap;P.pos.set(0,19.2,-166.5);P.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(5);
let fell=0;for(let i=0;i<60*14;i++){const t=P.pos.z>-176.2?-176.8:-189;U.step(0,0,t,0.4);if(P.pos.y<18)fell++;if(P.pos.z<-188.6)break;ZC.tick(1);}U.rel(0);
if(P.pos.z>-188.4)throw new Error('Потап не перешёл светомостки: '+U.st()+' fell='+fell);'tiles ok '+U.st()
//@@
// И: Радуга-дуга — дождик есть, а солнце не позади: радуги нет; перо позади тучки — радуга, по ней — на тот берег
const W=ZC.W,H=ZC.HERO;ZC.FIN.warp('rainbow');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
const R1=W.rains[0];U.toKind('yosha',1);const Y=H.yosha;Y.pos.set(-2.2,19.2,-197.2);Y.vel.set(0,0,0);Y.face=Math.PI;ZC.tick(3);U.tap('KeyL');ZC.tick(60);
if(!(R1.rain>0))throw new Error('тучка не заплакала: rain='+R1.rain);if(R1.bow.on)throw new Error('радуга без солнца');
U.toKind('proshka',0);const Pr=H.proshka;Pr.pos.set(0,19.2,-194);Pr.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(60);if(!R1.bow.on)throw new Error('радуга не встала: lit='+Pr.lit);
const r=[U.goto(0,0,-199.2,3),U.goto(0,0,-216,6)];if(Pr.pos.z>-214.5)throw new Error('по радуге не перешёл: '+r+' '+U.st());
'rainbow ok '+r+' '+U.st()
//@@ shot=sky32_bow.png
ZC.tick(1);
//@@
// И: две радуги — Йоша дождик + своё перо; Потап по радуге на островок, выжимает толстушку со своим светом
const W=ZC.W,H=ZC.HERO;ZC.FIN.warp('rainbow2');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
const R2=W.rains[1],R3=W.rains[2];U.toKind('yosha',1);const Y=H.yosha;Y.pos.set(-2.2,19.2,-223.2);Y.vel.set(0,0,0);Y.face=Math.PI;ZC.tick(3);U.tap('Semicolon');ZC.tick(3);U.tap('KeyL');ZC.tick(60);
if(!R2.bow.on)throw new Error('радуга 2 не встала: rain='+R2.rain.toFixed(1)+' lit='+Y.lit);
U.toKind('potap',0);const P=H.potap;P.pos.set(0,19.2,-224);P.vel.set(0,0,0);ZC.tick(3);const r=[U.goto(0,0,-227,4),U.goto(0,-1.0,-240.6,8)];if(P.pos.z>-238)throw new Error('Потап не дошёл до островка: '+r+' '+U.st());
U.tap('KeyR');ZC.tick(5);U.goto(0,-1.2,-241.4,2);ZC.tick(5);U.tap('KeyE');ZC.tick(60);if(!(R3.rain>0))throw new Error('толстушку не выжал: '+U.st());if(!R3.bow.on)throw new Error('радуга 3 не встала');
r.push(U.goto(0,0,-243.2,3),U.goto(0,0,-258,8));if(P.pos.z>-256.4)throw new Error('по радуге 3 не перешёл: '+r+' '+U.st());
'rainbow2 ok '+r+' '+U.st()
//@@
// К: Овчарня — барашки бегут за светом, в кошаре остаются; все девять — ролик Ветра и лестница
const W=ZC.W,H=ZC.HERO,F=W.flags;ZC.FIN.warp('pen');ZC.tick(30);for(const h of Object.values(H)){h.following=false;h.lit=false;h.iT=999;}
W.enemies.filter(e=>e.kind==='tucha').forEach(e=>{e.alive=false;W.group.remove(e.g);});U.toKind('proshka',0);const Pr=H.proshka;U.tap('KeyR');ZC.tick(3);
const lead=(gx,gz)=>{U.goto(0,gx*0.8,gz,8);ZC.tick(90);U.goto(0,gx*0.4,-279,8);U.goto(0,0,-283.6,6);ZC.tick(60);U.goto(0,0,-276,5);ZC.tick(30);return F.penCount;};
const r=[lead(-9,-263),lead(9,-266),lead(-9,-285)];ZC.tick(30);if(!F.penned)throw new Error('не все барашки в кошаре: '+r+' count='+F.penCount);
U.cine(200);U.nocine();ZC.tick(20);if(W.ramps.length<4)throw new Error('лестница к вершине не появилась');
U.goto(0,0,-300,6);if(Pr.pos.y<20.6)throw new Error('по лестнице не поднялся: '+U.st());
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'pen ok '+r+' '+U.st()+' errs=0'
