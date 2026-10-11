//@@
// 4-5 «Калинов мост» в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша): крюки, доски и стыки,
// цепь к вороту, Потап к лапе; мост держит сам, пока ведёшь Пелагею и Йошу; трещины перед бегом — Йоша; бег Потапа — до лозы.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.setSolo(true);ZC.startFrom(ZC.LV('4-5'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);U.nocine();
window.H=ZC.HERO;window.st=()=>U.st()+' errs='+_errs.length+' '+_errs.join(' | ');
// в одиночке клавиши Игрока 2 слышит тот, кем сейчас играешь: ведём героя стрелками, если он у Игрока 2
window.as=k=>{const r=U.toKind(k);if(r!==k)throw new Error('не взять '+k+': '+U.me().kind+' '+st());return r;};
'solo='+ZC.G.solo+' '+ZC.W.flags.stage+' me='+U.me().kind
//@@
// крюки и доски: Прошка жёлудями сбивает крюки и носит доски, Йоша сращивает стыки
const W=ZC.W,F=W.flags,P=H.proshka,Y=H.yosha;const r=[];
as('proshka');r.push(U.walkTo(0,-1.2,-5.5,3));P.face=Math.PI;ZC.tick(2);U.tap('KeyE');ZC.tick(40);P.face=Math.PI;U.tap('KeyE');ZC.tick(60);
if(!F.chains)throw new Error('цепи не опустились: '+st());
const log=[];
for(let i=0;i<8;i++){as('proshka');
  U.path(0,[[0,-7],[-3.6,-2]],4);P.face=-Math.PI/2;ZC.tick(2);U.tap('KeyR');ZC.tick(3);const got=P.carry&&P.carry.kind;
  const z0=-8-2.75*i;U.path(0,[[-1.5,-5],[0,-6],[0,z0+0.45]],4);P.face=Math.PI;P.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(30);
  as('yosha');U.path(1,[[1.2,-5],[0.8,z0-1.2]],4);Y.face=Math.PI;ZC.tick(2);while(Y.skillCd>0)ZC.tick(1);U.tap('KeyE');ZC.tick(40);
  log.push(i+':'+got+'/'+W.SLOTS.map(q=>(q.placed?'P':'-')+(q.fused?'F':'')).join(''));}
if(!F.half)throw new Error('полмоста не готово: '+log.join(' ')+' '+st());
'half solo '+log.join(' ')
//@@
// Прошка по цепи к вороту; Кикимора; Потап к лапе
const W=ZC.W,F=W.flags;const r=[];
ZC.tick(120);as('proshka');r.push(U.path(0,[[0,-30.6],[1.4,-31.6],[1.4,-52.8],[2.4,-54]],4));U.tap('KeyR');ZC.tick(30);
if(!F.winch)throw new Error('ворот не взят: '+r.join()+' '+st());ZC.tick(60);U.nocine();
as('potap');r.push(U.walkTo(0,0,-31,6));U.tap('KeyE');ZC.tick(30);ZC.tick(60);U.nocine();ZC.tick(5);
if(F.stage!=='hold')throw new Error('удержание не началось: '+F.stage+' '+r.join()+' '+st());
'hold solo me='+U.me().kind+' '+r.join()
//@@
// мост держит Потап сам (оставленный), а я веду Пелагею и Йошу: стык — мёртвая вода, пролёт — Пелагея на плиту
const W=ZC.W,F=W.flags,HD=W.HD,Y=H.yosha,Pe=H.pelageya,SEC=W.SEC;
const B2=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];
function go2(x,z,max,glide){const n=Math.round((max||6)*60);for(let i=0;i<n;i++){const h=U.me();const dx=x-h.pos.x,dz=z-h.pos.z;ZC.hold(B2[0],dx<-0.2);ZC.hold(B2[1],dx>0.2);ZC.hold(B2[2],dz<-0.2);ZC.hold(B2[3],dz>0.2);
  if(glide){if(i===2)ZC.press('Space');ZC.hold('Space',i>2&&!h.grounded);}if(Math.hypot(dx,dz)<0.4&&(!glide||h.grounded))break;ZC.tick(1);}B2.forEach(k=>ZC.hold(k,false));ZC.hold('Space',false);ZC.tick(1);}
function water(){for(let i=0;i<120&&Y.skillCd>0;i++)ZC.tick(1);Y.face=Math.PI;ZC.press('KeyE');ZC.tick(36);}
const log=[];
for(let s=0;s<6;s++){const S=SEC[s];
  if(!S.span){as('yosha');go2(0.3,S.z0+0.6,6);if(!S.ok)water();if(!S.ok)water();log.push('j'+s+':'+S.ok);}
  else{as('pelageya');go2(-0.3,S.z0+0.5,8);go2(-0.2,S.plate.z,4,true);ZC.tick(18);log.push('s'+s+':'+S.ok+'@'+Pe.pos.z.toFixed(1));as('yosha');go2(0.3,S.z1+0.3,8);}}
as('pelageya');go2(-0.3,-53,10);as('yosha');go2(0.5,-53.2,10);
let t=0;while(F.stage==='hold'&&t<60*40){ZC.tick(1);t++;}
if(F.stage!=='run')throw new Error('переход не засчитан: '+F.stage+' HDt='+HD.t.toFixed(1)+' '+log.join(' ')+' '+st());
'across solo '+log.join(' ')+' HDt='+HD.t.toFixed(1)+' spirit='+HD.spirit.toFixed(2)
//@@
// бег Потапа: Йоша сращивает треснувшие доски, потом сам Потап бежит до лозы
const W=ZC.W,F=W.flags,Y=H.yosha,SEC=W.SEC;const r=[];
as('yosha');r.push(U.walkTo(1,0.3,-49.2,4));Y.face=0;ZC.tick(2);U.tap('KeyE');ZC.tick(60);r.push(U.walkTo(1,0.3,-42.5,4));Y.face=0;ZC.tick(2);U.tap('KeyE');ZC.tick(60);
r.push('fixed='+SEC.map(S=>S.ok?'+':'-').join(''));r.push(U.walkTo(1,0.3,-50,4),U.walkTo(1,0.3,-53.2,4));
as('potap');r.push(U.walkTo(0,0,-49,25));
if(!(F.vine||ZC.G.cine))throw new Error('Потап не добежал: '+F.stage+' '+r.join()+' '+st());
'run solo '+r.join()
//@@
ZC.tick(500);ZC.skip();ZC.tick(300);ZC.skip();ZC.tick(300);
const ok=ZC.G.done['4-5']&&!_errs.length;(ok?'tso45 ok ':'FAIL tso45 ')+[ZC.W.levelId,ZC.G.done['4-5'],ZC.G.got['4-5'],'errs='+_errs.length]
