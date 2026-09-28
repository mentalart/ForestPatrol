//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('4-3'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'act='+U.act(0).kind+','+U.act(1).kind);r
//@@ shot=w43a.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r2=[];const P=H.proshka,Y=H.yosha;
r2.push(U.walkTo(0,-0.5,-9.2,3),U.walkTo(1,-2.3,-11.3,3));
const log=[];let lastK=-1;
for(let i=0;i<60*30;i++){const S=W.song;if(!S)break;const u=((S.t%2.6)+2.6)%2.6,k=Math.floor(S.t/2.6);
  if(u>1.2&&u<1.5&&k!==lastK){lastK=k;ZC.press('KeyE');ZC.press('KeyL');}
  if(i%156===0)log.push(ZC.W.links+'/'+RS());
  ZC.tick(1);}
function RS(){return ['proshka','potap','pelageya','yosha'].map(n=>H[n].pos.z.toFixed(1)).join(',');}
r2.push(log.join(' '),'links='+W.links,U.obj());r2
//@@ shot=w43b.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r3=[];const K1={jump:['Space','KeyM'],swap:['KeyQ','KeyK'],pull:['KeyE','KeyL']};
const log=[];let lastK=-1;
for(let i=0;i<60*60;i++){const S=W.song;if(!S)break;const u=((S.t%2.6)+2.6)%2.6,k=Math.floor(S.t/2.6);
  if(u>1.05&&u<1.4&&k!==lastK){lastK=k;
    const near=W.RINGS.filter(r=>r.blocked||W.LOGS.some(L=>r.z>L.z+0.25&&r.z<L.z+0.9));const sw=[false,false],jp=[false,false];
    for(const r of near){if(!r.hero)continue;const pi=r.hero.player;if(r.hero.active)jp[pi]=true;else sw[pi]=true;}
    for(const pi of[0,1]){if(jp[pi])ZC.press(K1.jump[pi]);else if(sw[pi]){ZC.press(K1.swap[pi]);}}
    ZC.tick(1);ZC.press('KeyE');ZC.press('KeyL');log.push(H.potap.pos.z.toFixed(1)+'|'+k+':'+near.map(r=>r.i+(r.hero?r.hero.kind[0]+(r.hero.active?'*':''):'-')).join('')+(sw[0]||sw[1]?'S':'')+(jp[0]||jp[1]?'J':''));}
  ZC.tick(1);if(W.RINGS.every(r=>r.z<W.LOGS[2].z-0.6))break;}
r3.push(log.join(' '),U.st(),'B='+W.BARGE.z.toFixed(1),W.RINGS.map(r=>r.i+':'+(r.hero?r.hero.kind:'-')+'@'+r.z.toFixed(1)).join(' '),U.obj(),'links='+W.links);r3
//@@ shot=w43c.png
ZC.tick(1);
//@@
// в гору: Прошка и Йоша бегают с углём, Потап и Пелагея держат лямку
const W=ZC.W,H=ZC.HERO,F=W.flags;const r4=[];const P=H.proshka,Y=H.yosha;
if(U.act(0)!==P){U.tap('KeyQ');ZC.tick(2);}if(U.act(1)!==Y){U.tap('KeyK');ZC.tick(2);}
let lastK=-1;const log=[];let trips=0;
function pullTick(){const S=W.song;if(!S)return;const u=((S.t%2.6)+2.6)%2.6,k=Math.floor(S.t/2.6);if(u>1.2&&u<1.5&&k!==lastK){lastK=k;ZC.press('KeyE');ZC.press('KeyL');}}
function goTick(pi,x,z,max){const B=pi?['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']:['KeyA','KeyD','KeyW','KeyS'];const n=Math.round((max||6)*60);for(let i=0;i<n;i++){const h=U.act(pi);const dx=x-h.pos.x,dz=z-h.pos.z;ZC.hold(B[0],dx<-0.25);ZC.hold(B[1],dx>0.25);ZC.hold(B[2],dz<-0.25);ZC.hold(B[3],dz>0.25);if(Math.hypot(dx,dz)<0.45)break;pullTick();ZC.tick(1);}B.forEach(k=>ZC.hold(k,false));ZC.tick(1);}
for(let t=0;t<6&&F.stage!=='end';t++){const pile=W.BARGE.z<-44?[-5.4,-56]:[-5.4,-44];
  goTick(0,pile[0]+1.2,pile[1],6);P.face=-Math.PI/2;ZC.tick(2);U.tap('KeyR');ZC.tick(3);const got=!!P.carry;
  const sz=W.FIRESOCK.pos.z;goTick(0,1.1,sz,8);P.face=Math.PI/2;P.vel.set(0,0,0);ZC.tick(2);U.tap('KeyR');for(let i=0;i<30;i++){pullTick();ZC.tick(1);}
  log.push('trip'+t+':'+got+' fire='+W.FIRE.t.toFixed(1)+' B='+W.BARGE.z.toFixed(1));
  for(let i=0;i<60*6;i++){pullTick();ZC.tick(1);if(F.stage==='end')break;}}
r4.push(log.join(' | '),F.stage,!!ZC.G.cine,'B='+W.BARGE.z.toFixed(1));r4
//@@ shot=w43d.png
ZC.tick(300);
//@@
ZC.tick(300);ZC.skip();ZC.tick(300);[ZC.W.levelId,ZC.G.done['4-3'],ZC.G.got['4-3']]
