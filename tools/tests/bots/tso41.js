//@@
// 4-1 «Кузня Кузьмы и Демьяна» в одиночном режиме (клавиши Игрока 1, Q — по кругу): ковка — Прошка бьёт в такт, мехи и закалку
// оставленные делают сами; двери жаром; болваны — Йоша поливает, Прошка срывает латы; заготовку второй конец держит помощник;
// ковка вдвоём — помощник бьёт и поворачивает в свою долю, на середине меняемся; закалка — Йоша.
window._errs=[];window.FAILS=[];window.FAILE=m=>{FAILS.push(String(m).slice(0,400));return new Error(m);};window.addEventListener('error',e=>FAILS.push(String(e.message).slice(0,300)));{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.setSolo(true);ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(20);
window.H=ZC.HERO;window.st=()=>U.st()+' errs='+_errs.length+' '+_errs.join(' | ');
const r=[U.walkTo(0,0,-7.5,4),ZC.W.flags.stage];ZC.tick(30);ZC.skip();ZC.tick(5);U.nocine();r.push(ZC.W.flags.stage,'me='+U.me().kind);r
//@@
// ковка: Прошка бьёт в такт; Пелагея качает мехи сама, Йоша закаливает сам
const W=ZC.W,FG=W.FG;U.toKind('proshka');const r2=[U.walkTo(0,0,-12.6,3)];let last=-1;const hs=[];
for(let i=0;i<60*240&&!W.abil.kleshi;i++){const u=((FG.t%FG.B)+FG.B)%FG.B/FG.B;const beat=Math.floor(FG.t/FG.B);
  if(FG.t>0&&u<0.08&&beat!==last&&FG.made<FG.total){last=beat;ZC.press('KeyF');}
  if(i%600===0)hs.push(FG.heat.toFixed(2)+'/'+FG.made+'/'+FG.done);ZC.tick(1);}
if(!W.abil.kleshi)throw FAILE('клещи не выкованы: '+hs.join(' ')+' '+st());
'forge solo '+hs.join(' ')
//@@
U.toKind('proshka');const W=ZC.W,H=ZC.HERO;const r3=[];const F=W.flags;
const hot=n=>W.hots.find(i=>i.name===n);
r3.push(U.walkTo(0,-5.9,-14.1,4));U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(3);r3.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r3.push(U.path(0,[[-3.4,-14],[-2,-17],[3,-23.4]],4));U.act(0).face=Math.PI;ZC.tick(2);r3.push('vel='+Math.hypot(U.act(0).vel.x,U.act(0).vel.z).toFixed(2));U.tap('KeyR');ZC.tick(40);r3.push('g1='+F.g1,'sp='+hot('slitok').pos.toArray().map(v=>v.toFixed(2)),'heat='+hot('slitok').heat.toFixed(2));
// гвоздь
r3.push(U.path(0,[[-2,-17],[-3.4,-14],[-4.4,-14.1]],4));U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(3);r3.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r3.push(U.path(0,[[-3.4,-14],[-2,-17],[0,-25],[0,-38],[2.3,-40.3]],4));U.act(0).face=Math.PI;ZC.tick(2);U.tap('KeyR');ZC.tick(80);r3.push('g2='+F.g2,U.obj());
// уголь в печь подъёмника
r3.push(U.path(0,[[0,-38],[0,-25],[-2,-17],[-3.4,-14],[-5.2,-14.2]],5));U.act(0).face=Math.PI;r3.push(U.st(),W.hots.map(i=>i.kind+':'+i.pos.x.toFixed(1)+','+i.pos.y.toFixed(1)+','+i.pos.z.toFixed(1)+':'+i.heat.toFixed(2)+(i.gone?'G':'')).join(' '));U.act(0).pos.x=-5.2;U.act(0).vel.set(0,0,0);U.tap('KeyR');ZC.tick(3);r3.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r3.push(U.path(0,[[-3.4,-14],[-2,-17],[0,-25],[3,-28.6]],4));U.act(0).face=Math.atan2(1.2,-1.2);ZC.tick(2);U.tap('KeyR');ZC.tick(20);
r3.push(U.walkTo(0,6.1,-33,3));ZC.tick(420);r3.push(U.st());r3.push(U.walkTo(0,9.2,-33,3),U.walkTo(0,9.4,-37.6,3),'links='+W.links);if(!(W.flags.g1&&W.flags.g2))throw FAILE('ворота: '+r3.join(' '));r3
//@@
// болваны одним героем за раз
const W=ZC.W,F=W.flags,P=H.proshka,Y=H.yosha;U.toKind('proshka');P.pos.set(0,0,-40);P.vel.set(0,0,0);ZC.tick(5);U.walkTo(0,0,-45,3);ZC.tick(120);
const B=['KeyA','KeyD','KeyW','KeyS'];const rel=()=>B.forEach(k=>ZC.hold(k,false));
const mv=(x,z,stop)=>{const h=U.me();const dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>stop;ZC.hold(B[0],far&&dx<-0.3);ZC.hold(B[1],far&&dx>0.3);ZC.hold(B[2],far&&dz<-0.3);ZC.hold(B[3],far&&dz>0.3);if(!far)h.face=Math.atan2(dx,dz);return !far;};
const log=[];
for(let i=0;i<60*150&&!F.cleared;i++){P.iT=99;Y.iT=99;const al=W.enemies.filter(e=>e.alive);if(!al.length)break;
  const hotE=al.find(e=>e.armor==='hot'),coolE=al.find(e=>e.armor==='cool'),offE=al.find(e=>e.armor==='off');
  if(coolE){if(U.me()!==P){rel();U.toKind('proshka');}if(mv(coolE.pos.x,coolE.pos.z,1.6)&&i%10===0)ZC.press('KeyR');}
  else if(offE){if(U.me()!==P){rel();U.toKind('proshka');}if(!U.def(0,i)&&mv(offE.pos.x,offE.pos.z,1.4)&&i%9===0)ZC.press('KeyF');}
  else if(hotE){if(U.me()!==Y){rel();U.toKind('yosha');if(Math.hypot(Y.pos.x-hotE.pos.x,Y.pos.z-hotE.pos.z)>8){Y.pos.set(hotE.pos.x+2,0,hotE.pos.z+2);Y.vel.set(0,0,0);}}if(mv(hotE.pos.x,hotE.pos.z,2.2)&&Y.skillCd<=0)ZC.press('KeyE');}
  if(i%600===0)log.push(al.map(e=>e.armor+':'+e.state+':'+e.embers).join(','));ZC.tick(1);}
rel();ZC.tick(30);
if(!F.cleared)throw FAILE('цех не чист: '+log.join(' | ')+' '+W.enemies.filter(e=>e.alive).map(e=>e.armor+':'+e.state).join(','));
'golems solo '+log.join(' | ')
//@@
U.toKind('proshka');const W=ZC.W,H=ZC.HERO;const r5=[];const F=W.flags;ZC.tick(200);
// горячий слиток в большой горн
H.proshka.pos.set(-3.4,0,-14);H.proshka.vel.set(0,0,0);ZC.tick(3);r5.push(U.walkTo(0,-6.0,-14.2,3));U.act(0).pos.x=-6.0;U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(3);r5.push('carry='+(U.act(0).carry&&U.act(0).carry.kind));
r5.push(U.path(0,[[-3.4,-14],[-2,-17],[0,-25],[0,-40],[0,-50],[0,-56.2]],5));U.act(0).face=Math.PI;U.tap('KeyR');ZC.tick(60);r5.push('lit='+F.lit,'stage='+F.stage,!!ZC.G.cine);ZC.tick(420);r5
//@@
// «В четыре руки»: Прошка берёт один конец, второй подхватывает помощник
const W=ZC.W,F=W.flags,B=W.BIG;U.nocine();U.toKind('proshka');const r=['stage='+F.stage];
const E=()=>{const c=Math.cos(B.ang),s=Math.sin(B.ang);return [[B.pos.x-1.1*c,B.pos.z+1.1*s],[B.pos.x+1.1*c,B.pos.z-1.1*s]];};
r.push(U.walkTo(0,E()[0][0]-0.2,E()[0][1]+0.7,6));ZC.press('KeyR');ZC.tick(3);r.push('hold='+!!B.hold[0]+'/'+!!B.hold[1]);
r.push(U.walkTo(0,-1.25,-50.4,10));ZC.tick(10);
if(!B.placed)throw FAILE('заготовка не на наковальне: '+r.join(' | ')+' big='+B.pos.toArray().map(v=>v.toFixed(1))+' '+st());
'carry solo '+r.join(' | ')
//@@
// куём вдвоём: я на «БИТЬ» бью на 1-2-3, помощник поворачивает на 4; на середине помощник меняет нас местами
const W=ZC.W,F=W.flags,R=W.R4;const r=[];r.push(U.walkTo(0,1.2,-49.1,4));let acts=0,half=false;
for(let i=0;i<60*60&&F.stage==='r4';i++){if(!half&&R.prog>=R.need/2){half=true;r.push('half@'+(i/60).toFixed(1));ZC.tick(40);}
  const k=Math.round(R.t/R.B),d=R.t-k*R.B,b=((k%4)+4)%4;
  if(k>=0&&Math.abs(d)<0.009){if(b===3&&half)ZC.press('KeyR');else if(b!==3&&!half)ZC.press('KeyF');acts++;}ZC.tick(1);}
r.push('prog='+R.prog,'stage='+F.stage,'acts='+acts);
if(F.stage==='r4')throw FAILE('ковка вдвоём не кончилась: '+r.join(' | ')+' '+st());
// закалка: Йоша (сам польёт, если рядом; иначе — берём Йошу)
ZC.tick(60*7);if(F.stage==='quench'){U.toKind('yosha');r.push(U.walkTo(0,1.6,-48.6,6));H.yosha.face=Math.atan2(-H.yosha.pos.x,-50.5-H.yosha.pos.z);ZC.press('KeyE');ZC.tick(40);}
r.push('after='+F.stage);r.join(' | ')
//@@
ZC.tick(300);ZC.skip();ZC.tick(300);ZC.skip();ZC.tick(300);
const ok=ZC.G.done['4-1']&&!_errs.length&&!FAILS.length;(ok?'tso41 ok ':'FAIL tso41 '+FAILS.join(' || ')+' ')+[ZC.W.levelId,ZC.G.done['4-1'],ZC.G.got['4-1'],'errs='+_errs.length]
