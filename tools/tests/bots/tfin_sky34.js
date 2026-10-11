//@@
// 3-4 «Летучий корабль» (late_99zn_sky34, docs/38): руль и скалы, крыло — в такт, прорехи и живая вода, Ветрило на корме,
// Ворона-Ключница (цепь, звенья, крен), высотомер, камера полёта, метки уступов.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.startFrom(ZC.LV('3-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);window.W=ZC.W;window.H=ZC.HERO;window.F=W.flags;window.S=W.shipS;
// на борт и в полёт: Пелагея у фонаря со светом
const pe=H.pelageya;U.toKind('pelageya',1);pe.pos.set(S.x,3,S.z+0.9);pe.lit=true;for(const h of Object.values(H))if(h!==pe){h.pos.set(S.x+(Math.random()-0.5),3,S.z+2);}
// Пелагея держит фонарь весь тест (порывы и крен не сбивают — это проверяют другие боты)
window.PINPE=true;W.updates.push(()=>{if(window.PINPE&&F.launched&&!ZC.G.cine){pe.pos.x=S.x;pe.pos.z=S.z+0.9;pe.vel.x=pe.vel.z=0;pe.lit=true;}});
let i=0;for(;i<60*20&&!F.launched;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}ZC.tick(20);
const r=['launched='+!!F.launched,'stage='+F.stage,'cam='+(W.camFn&&W.camFn.name),'alt='+document.getElementById('k34alt').style.display];
if(!F.launched||!W.camFn||document.getElementById('k34alt').style.display!=='block')throw new Error('полёт не начался как надо: '+r.join(' | '));r.join(' | ')
//@@
// руль: Прошка у руля жмёт вправо — корабль уходит вправо; скала слева пройдена без удара
const P=H.proshka;U.toKind('proshka',0);const r=[];S.z=-74;ZC.tick(2);P.pos.set(S.x,S.y+0.1,S.z+3.3);ZC.tick(5);r.push('helm='+(W.k34&&true));
ZC.hold('KeyD',true);for(let k=0;k<60*1.6;k++){P.pos.z=S.z+3.3;ZC.tick(1);}ZC.hold('KeyD',false);r.push('lat='+S.lat.toFixed(2));
if(!(S.lat>1.4))throw new Error('руль не ведёт корабль: '+r.join(' | '));
const b0=F.pbumps||0;for(let k=0;k<60*25&&S.z>-86;k++){P.pos.set(S.x,S.y+0.1,S.z+3.3);ZC.tick(1);}r.push('z='+S.z.toFixed(0),'bumps='+((F.pbumps||0)-b0));if((F.pbumps||0)!==b0)throw new Error('скала задета, хотя ушли рулём: '+r.join(' | '));
// без руля следующая скала (справа, x=+1.9) — если корабль справа, удар
for(let k=0;k<60*30&&S.z>-102;k++){P.pos.set(S.x-1.5,S.y+0.1,S.z-3);ZC.tick(1);}r.push('lit='+S.lit,'z2='+S.z.toFixed(0),'lat2='+S.lat.toFixed(2),'bumps2='+((F.pbumps||0)-b0));r.join(' | ')
//@@
// крыло: прибить три ведра в такт (кольцо сжалось — удар)
const r=[];S.z=-143;ZC.tick(30);r.push('stage='+F.stage);if(F.stage!=='wing')throw new Error('крыло не сломалось: '+r.join(' | '));
const P=H.proshka;U.toKind('proshka',0);let hits=0;for(let k=0;k<60*20&&F.stage==='wing'&&!ZC.G.cine;k++){const sx=S.x+1.9;P.pos.set(sx,S.y+0.1,S.z+2.4);
  const ring=W.group.children.find(m=>m.geometry&&m.geometry.type==='TorusGeometry'&&m.visible&&Math.abs(m.position.x-sx)<0.3&&Math.abs(m.position.z-(S.z+2.4))<0.3);
  if(ring&&ring.scale.x<0.75&&P.atkT<=0&&P.atkCd<=0){ZC.press('KeyF');hits++;}ZC.tick(1);}
r.push('hits='+hits,'cine='+!!ZC.G.cine);U.cine(600);ZC.tick(30);r.push('stage2='+F.stage);if(F.stage!=='hold')throw new Error('крыло не починено: '+r.join(' | '));r.join(' | ')
//@@
// тучи: прореха в парусе — Йоша поливает; Ветрило дует, если свет на корме
const r=[];F.holdDone=true;F.stage='fly';S.kick=0;S.z=-159.4;ZC.tick(240);r.push('holeK='+S.holeK.toFixed(2));if(!(S.holeK<0.9))throw new Error('прореха не порвалась: '+r.join(' | '));
const Y=H.yosha;U.toKind('yosha',1);const t=ZC.W.waterTargets.find(w=>w.active());Y.pos.set(t.pos.x+0.8,S.y+0.1,t.pos.z);ZC.tick(3);ZC.press('KeyL');ZC.tick(60);r.push('holeK2='+S.holeK.toFixed(2));
if(!(S.holeK>0.99))throw new Error('живая вода не залатала: '+r.join(' | '));
Y.lit=true;Y.pos.set(S.x,S.y+0.1,S.z+5.2);ZC.tick(20);r.push('windB='+S.windB.toFixed(1));if(!(S.windB>0.5))throw new Error('Ветрило не дует: '+r.join(' | '));Y.lit=false;r.join(' | ')
//@@
// Ворона-Ключница: цепь кренит корабль; Потап у другого борта; три звена — и цепь лопнула; потом бой
const r=[];W.enemies.forEach(e=>{e.alive=false;});F.wave=1;F.w2=false;S.z=-240;for(let k=0;k<60*4&&!(W.k34&&W.k34.st==='chain');k++)ZC.tick(1);const K=W.k34;r.push('st='+K.st,'s='+K.s);if(K.st!=='chain')throw new Error('Ключница не прилетела: '+r.join(' | '));
ZC.tick(60);r.push('pullW='+S.pullW,'roll='+S.roll.toFixed(2));if(!(Math.sign(S.roll)===K.s&&Math.abs(S.roll)>0.2))throw new Error('цепь не кренит: '+r.join(' | '));
const Po=H.potap;U.toKind('potap',0);Po.pos.set(S.x-K.s*1.8,S.y+0.1,S.z+1);for(let k=0;k<90;k++){Po.pos.x=S.x-K.s*1.8;ZC.tick(1);}r.push('rollP='+S.roll.toFixed(2));if(!(Math.abs(S.roll)<Math.abs(0.4)))throw new Error('Потап не перевесил цепь: '+r.join(' | '));
for(const L of K.links){L.mk.onHit();ZC.tick(5);}ZC.tick(60);r.push('st2='+K.st,'chained='+S.chained);if(K.st!=='fight')throw new Error('цепь не лопнула: '+r.join(' | '));
K.e.embers=0;K.e.alive=false;ZC.tick(120);r.push('kDone='+!!F.kDone);if(!F.kDone)throw new Error('Ключница не улетела: '+r.join(' | '));
r.push('errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(_errs.length)throw new Error(r.join(' | '));'3-4 sky34 ok '+r.join(' | ')
