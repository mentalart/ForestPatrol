//@@ wait=1500
// 3-Б «Соловей-Разбойник»: подход «Прямоезжая дорожка» в одиночку (клавиши Игрока 1, Q — по кругу героев), оставленный держит:
// колода — Потап; тропка — Йоша; мосты после свиста; подворотня: Потап держит, Q — Пелагея проходит и встаёт на плиту (держит для Потапа),
// Q — Потап проходит и подпирает подворотню насовсем; облачка; уступы дуба-сторожа; калитка в ободе — ролик и этап 1
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(40);window.D=ZC.W.dbg3b();window.RD=D.RD;window.H=ZC.HERO;window.Y=-8;U.cine(600);ZC.tick(5);
window.GO=(x,z,max,o)=>{o=o||{};const n=(max||20)*60;let t=0;for(;t<n;t++){const h=U.me();if((RD.tellOn||RD.wave)&&!o.noHide){U.rel(0);ZC.hold('KeyG',h.kind==='potap');ZC.tick(1);continue;}ZC.hold('KeyG',false);
    for(const L of RD.logs){if(L.on&&Math.abs(h.pos.z-L.z)<2.2&&L.z<h.pos.z&&h.grounded)ZC.press('Space');}if(U.step(0,x,z,o.tol||0.6))break;ZC.tick(1);}U.rel(0);ZC.hold('KeyG',false);return t>=n?'TIMEOUT@'+U.me().pos.z.toFixed(1):'ok';};
window.CALL=()=>{U.tap('Digit1');ZC.tick(2);return 'call';};
['solo='+ZC.G.solo,U.toKind('potap'),CALL(),_errs.length].join(' ')
//@@
const r=[];r.push(GO(0,153.9,25));U.me().face=Math.PI;U.tap('KeyE');ZC.tick(30);r.push('log='+RD.bigLog.done);
r.push(U.toKind('yosha'),CALL());r.push(GO(0,139.6,20));U.me().face=Math.PI;U.tap('KeyE');ZC.tick(40);r.push('path='+RD.path);
r.push(GO(0,122,30));for(let k=0;k<4&&U.me().pos.z>109;k++){r.push(U.until(()=>RD.petT>3.3,16));r.push(GO(0,108.4,6,{noHide:true}));}
r.push(GO(-2.4,104.4,10));for(let k=0;k<4&&U.me().pos.z>96;k++){r.push(U.until(()=>RD.TREES[0].col.on,16));r.push(GO(-2.4,93.6,6,{noHide:true,tol:0.5}));}
CALL();r.push(GO(0,90,8));for(let i=0;i<60*8&&Object.values(H).some(h=>h.pos.z>96);i++)ZC.tick(1);r.push('all='+Object.values(H).map(h=>h.pos.z.toFixed(0)).join('/'));
r.push('z='+U.me().pos.z.toFixed(1),'errs='+_errs.length);if(U.me().pos.z>95)throw new Error('соло: до заставы '+r.join(' | '));r.join(' | ')
//@@
// застава в одиночку
const r=[];r.push(U.toKind('potap'));r.push(GO(-4.6,83.7,14));U.me().face=Math.PI;U.tap('KeyE');ZC.tick(20);r.push('holder='+!!RD.gate.holder);
r.push(U.toKind('pelageya'));r.push(U.goto(0,4.4,79.8,10,0.4));ZC.tick(20);r.push('plate='+RD.gate.open);r.push(U.toKind('potap'));r.push(U.goto(0,0,78,10,0.6));ZC.tick(30);r.push('propped='+!!RD.gate.propped,CALL());
r.push(GO(0,71,10));r.push('z='+U.me().pos.z.toFixed(1),'errs='+_errs.length);if(!RD.gate.propped)throw new Error('соло застава: '+r.join(' | '));r.join(' | ')
//@@
// облачка, дуб-сторож, обод
const r=[];const ISL=[[-1.4,67.2],[1.2,63.9],[-1.2,60.6],[1.4,57.3]];
for(let k=0;k<6&&U.me().pos.z>53;k++){U.goto(0,0,71,8,0.6);r.push('w'+(U.until(()=>!!RD.wave,16),U.until(()=>!RD.wave,8))+' '+U.me().kind+' z'+U.me().pos.z.toFixed(1));for(const[x,z]of ISL){const h=U.me();for(let i=0;i<90;i++){const far=!U.step(0,x,z,0.5);if(far&&h.grounded&&Math.hypot(h.pos.x-x,h.pos.z-z)<3.6&&Math.hypot(h.pos.x-x,h.pos.z-z)>1.6)ZC.press('Space');if(!far)break;ZC.tick(1);}U.rel(0);if(k<2)r.push(x+':'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+' '+RD.ISL.map(I=>I.on?1:0).join(''));if(h.pos.y<Y-1)break;}
  if(U.me().pos.y>=Y-0.5){const h=U.me();for(let i=0;i<90&&h.pos.z>52.5;i++){U.step(0,0,51,0.5);if(h.grounded&&h.pos.z<56.6&&h.pos.z>55.4)ZC.press('Space');ZC.tick(1);}U.rel(0);}if(U.me().pos.z>53)ZC.tick(80);}
r.push('isl z='+U.me().pos.z.toFixed(1));
const WP=[[-7.2,44.4],[0,42,1],[7.4,42],[7.6,39],[0,39,1],[-7.4,39],[-7.6,36],[0,36,1],[7.4,36],[7.6,33],[0,33,1],[-7.4,33],[-8,30],[-8,10],[0,1]];let wi=0;
for(let s=0;s<60*150&&wi<WP.length;s++){const h=U.me();const[x,z,wait]=WP[wi];if(h.pos.y<-7.6&&wi>1&&h.pos.z<44.5){wi=0;continue;}
  if(U.step(0,x,z,0.45)){const md=Math.hypot(h.pos.x,h.pos.z+14);if(wait&&(RD.tellOn||(RD.wave&&RD.wave.r<md+1)||RD.whT<2.8)){U.rel(0);ZC.tick(1);continue;}wi++;}ZC.tick(1);}U.rel(0);r.push('climb wi='+wi+' y='+U.me().pos.y.toFixed(1));
r.push(U.toKind('potap'),CALL());r.push(U.goto(0,0,0.4,10,0.5));U.me().face=Math.PI;U.tap('KeyE');ZC.tick(30);r.push(U.goto(0,0,-5,6,0.6));r.push(U.cine(300));ZC.tick(30);
r.push('phase='+D.F.phase,'errs='+_errs.length+' '+_errs.slice(0,3).join(' / '));if(D.F.phase!==1||_errs.length)throw new Error('соло обод: '+r.join(' | '));'3-B road solo ok '+r.join(' | ')
