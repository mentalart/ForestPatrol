//@@
// 5-Б1: над героем — счётчик одинаковых защит подряд (щит ×3 из 5), пока тень не переняла
Math.random=(()=>{let q=31;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-B1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);
const W=ZC.W,F=W.flags,K=W.k5b1;ZC.players[0].defLog=['r','g','g','g'];ZC.tick(3);const L=K.heroLbl[0];const r=['stage='+F.stage,'lbl='+L.visible,'txt='+L.userData.txt];
r.push(F.stage==='fight'&&L.visible&&/щит ×3/.test(L.userData.txt)?'ok':'FAIL label');r
//@@
// фаза 3: Потап со щитом на пути Кощея — время фазы стоит, «закрыли N с»; ≥ 6 с — Пелагея вырывает страницу
const W=ZC.W,F=W.flags,K=W.k5b1,H=ZC.HERO;W.bossNext();ZC.tick(5);W.bossNext();ZC.tick(60);const r=['phase3='+!!F.phase3];
if(ZC.players[0].heroes[ZC.players[0].act].kind!=='potap'){ZC.press('KeyQ');ZC.tick(3);}const po=H.potap,pe=H.pelageya;const t0=F.p3t;ZC.hold('KeyG',true);
for(let i=0;i<60*9;i++){const kp=K.KS.g.position;const dx=pe.pos.x-kp.x,dz=pe.pos.z-kp.z,dl=Math.hypot(dx,dz)||1;po.pos.set(kp.x+dx/dl*1.6,0,kp.z+dz/dl*1.6);ZC.tick(1);}ZC.hold('KeyG',false);
function lerpN(a,b,k){return a+(b-a)*k;}
r.push('cover='+(F.cover||0).toFixed(1),'p3t +'+(F.p3t-t0).toFixed(1),'pageTold='+!!F.pageTold);
for(let i=0;i<60*60&&F.stage!=='book';i++)ZC.tick(1);for(let i=0;i<60*30&&ZC.W.levelId==='5-B1';i++){if(ZC.G.cine&&i%20===0)ZC.skip();ZC.tick(1);}
r.push('b1page='+ZC.G.flags.b1page,'b1cover='+ZC.G.flags.b1cover,'lv='+ZC.W.levelId);r.push((F.cover||0)>=6&&ZC.G.flags.b1page===true?'ok':'FAIL cover');r
