//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('4-2'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'lavas='+W.lavas.length);r
//@@ shot=w42a.png
ZC.tick(1);
//@@
// ручей: Йоша делает корки и переходит
const W=ZC.W,H=ZC.HERO,F=W.flags;const r2=[];const Y=H.yosha;r2.push('act1='+U.act(1).kind);
r2.push(U.walkTo(1,0,-1.6,3));Y.face=Math.PI;ZC.tick(2);U.tap('KeyL');ZC.tick(40);r2.push('crusts='+W.crusts.length,W.crusts.map(c=>c.z.toFixed(1)).join(','));
r2.push(U.walkTo(1,0,-3.8,3),'y='+Y.pos.y.toFixed(2),'gr='+(Y.groundRef&&Y.groundRef.crust?'crust':'?'));Y.face=Math.PI;U.tap('KeyL');ZC.tick(40);
r2.push('crusts='+W.crusts.length,W.crusts.map(c=>c.z.toFixed(1)).join(','));r2.push(U.walkTo(1,0,-5.6,3));r2.push(U.walkTo(1,0,-7.6,3,(h,i)=>{if(i===2)ZC.press('KeyM');}),'y='+Y.pos.y.toFixed(2),F.stage);
// Прошка по коркам?
r2.push(U.st());ZC.tick(60);r2.push(U.st());r2
//@@ shot=w42b.png
ZC.tick(1);
//@@
// заводь и бурлящая струя: Йоша делает корку в заводи; Прошка несёт и перекладывает
const W=ZC.W,H=ZC.HERO,F=W.flags;const r3=[];const Y=H.yosha,P=H.proshka;W.enemies.forEach(e=>{e.cd=1e9;});
P.pos.set(0,0,-8.5);P.vel.set(0,0,0);ZC.tick(3);
r3.push(U.walkTo(1,2.5,-9.5,3));Y.face=Math.PI/2;ZC.tick(2);U.tap('KeyL');ZC.tick(40);r3.push('crusts='+W.crusts.filter(c=>!c.gone).map(c=>c.x.toFixed(1)+','+c.z.toFixed(1)).join(' '));
// Йоша пробует на струе
r3.push(U.walkTo(1,-2,-12.4,3));Y.face=Math.PI;U.tap('KeyL');ZC.tick(40);r3.push('crustsAfterChan='+W.crusts.filter(c=>!c.gone).length);
r3.push(U.walkTo(0,2.2,-10.4,3));P.face=Math.atan2(1.8,0.9);U.tap('KeyR');ZC.tick(3);r3.push('carry='+(P.carry&&P.carry.kind));
r3.push(U.walkTo(0,0,-12.5,3));P.face=Math.PI;P.vel.set(0,0,0);ZC.tick(2);U.tap('KeyR');ZC.tick(30);r3.push('crusts='+W.crusts.filter(c=>!c.gone).map(c=>c.x.toFixed(1)+','+c.z.toFixed(1)+':'+c.t.toFixed(1)).join(' '));
// вторая корка — Йоша делает в заводи и несёт сам на первую
r3.push(U.walkTo(1,2.5,-9.5,3));Y.face=Math.PI/2;ZC.tick(2);U.tap('KeyL');ZC.tick(40);r3.push(U.walkTo(1,2.3,-10.4,3));Y.face=Math.atan2(1.8,0.9);U.tap('Semicolon');ZC.tick(3);r3.push('ycarry='+(Y.carry&&Y.carry.kind));
r3.push(U.walkTo(1,0,-12.5,3),U.walkTo(1,0,-14.3,3),'y='+Y.pos.y.toFixed(2));Y.face=Math.PI;Y.vel.set(0,0,0);ZC.tick(2);U.tap('Semicolon');ZC.tick(30);U.walkTo(1,0.4,-15.3,2);
r3.push('crusts='+W.crusts.filter(c=>!c.gone).map(c=>c.x.toFixed(1)+','+c.z.toFixed(1)+':'+c.t.toFixed(1)).join(' '));
// чехарда: Прошка на вторую, берёт первую сзади, кладёт вперёд
r3.push(U.walkTo(0,0,-14,3),U.walkTo(0,0,-15.6,3),'py='+P.pos.y.toFixed(2),U.st(),'gref='+(P.groundRef&&P.groundRef.crust?P.groundRef.z.toFixed(1):'-'));P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);r3.push('carry='+(P.carry&&P.carry.kind));P.face=Math.PI;ZC.tick(20);r3.push('vel='+Math.hypot(P.vel.x,P.vel.z).toFixed(2));U.tap('KeyR');ZC.tick(40);r3.push('allcr='+W.crusts.map(c=>c.x.toFixed(1)+','+c.z.toFixed(1)+':'+c.t.toFixed(1)+(c.gone?'G':'')).join(' '),'lv='+(ZC.W.lavas.indexOf&&0));r3.push('hots='+W.hots.map(i=>i.kind+':'+i.pos.x.toFixed(1)+','+i.pos.y.toFixed(1)+','+i.pos.z.toFixed(1)+(i.gone?'G':'')+(i.flying?'F':'')).join(' '));
r3.push('crusts='+W.crusts.filter(c=>!c.gone).map(c=>c.x.toFixed(1)+','+c.z.toFixed(1)+':'+c.t.toFixed(1)).join(' '));
U.walkTo(1,0.4,-16.9,2);r3.push(U.walkTo(0,-0.3,-17.4,3),'py='+P.pos.y.toFixed(2));P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(20);P.face=Math.PI;ZC.tick(2);U.tap('KeyR');ZC.tick(40);
r3.push('crusts='+W.crusts.filter(c=>!c.gone).map(c=>c.x.toFixed(1)+','+c.z.toFixed(1)+':'+c.t.toFixed(1)).join(' '));
U.walkTo(1,0.4,-18.6,2);r3.push(U.walkTo(0,0,-19.6,3),U.walkTo(0,0,-21.5,3,(h,i)=>{if(i===2)ZC.press('Space');}),'py='+P.pos.y.toFixed(2),F.stage,U.st());{const tr=[];for(let i=0;i<40;i++){ZC.tick(1);tr.push(P.pos.z.toFixed(2)+','+P.pos.y.toFixed(2)+(P.grounded?'g':''));}r3.push(tr.join(' '));}r3
//@@ shot=w42c.png
ZC.tick(1);
//@@
// разлив: плоты, паровые столбы, островок со звеном
const W=ZC.W,H=ZC.HERO,F=W.flags;const r4=[];const Y=H.yosha,P=H.proshka;W.enemies.forEach(e=>{e.cd=1e9;});r4.push('P0='+P.pos.toArray().map(v=>v.toFixed(1)),'cp='+ZC.players[0].cp.toArray().map(v=>v.toFixed(1)));
Y.pos.set(1.5,0,-24.5);Y.vel.set(0,0,0);ZC.tick(3);r4.push(U.walkTo(1,1.5,-25.6,3));Y.face=Math.PI;ZC.tick(2);U.tap('KeyL');ZC.tick(40);
r4.push('rafts='+W.crusts.filter(c=>!c.gone).map(c=>c.x.toFixed(1)+','+c.z.toFixed(1)+(c.raft?'R':'')).join(' '));
r4.push(U.walkTo(0,1.5,-25.4,3),'P1='+P.pos.toArray().map(v=>v.toFixed(1)));r4.push(U.walkTo(0,1.5,-27.2,3),'pgr='+(P.groundRef&&P.groundRef.crust?'crust':'-'));
r4.push(U.walkTo(1,-0.5,-25.6,3));Y.face=Math.PI;ZC.tick(2);U.tap('KeyL');ZC.tick(30);r4.push(U.walkTo(1,-0.5,-27.1,3),'ygr='+(Y.groundRef&&Y.groundRef.crust?'crust':'-'));
const log=[];let waters=0;
for(let i=0;i<60*16;i++){
  const yr=Y.groundRef&&Y.groundRef.crust?Y.groundRef:null,pr=P.groundRef&&P.groundRef.crust?P.groundRef:null;
  if(Y.skillCd<=0&&yr){const v=W.vents.find(v=>!v.fixed&&v.mode==='mid'&&v.z<Y.pos.z&&Math.abs(v.x-Y.pos.x)<2.6&&(Math.hypot(v.x-Y.pos.x,v.z-Y.pos.z)<4.2));
    if(v){Y.face=Math.atan2(v.x-Y.pos.x,v.z-Y.pos.z);log.push('T['+W.waterTargets.filter(w=>w.active()).map(w=>(w.lava?'L':w.crust?'C':'?')+(Math.hypot(w.pos.x-Y.pos.x,w.pos.z-Y.pos.z)-(w.pri||0)).toFixed(2)).join(',')+']');U.tap('KeyL');waters++;log.push('vent@'+Y.pos.z.toFixed(1));}
    else if(pr&&pr.t<5&&pr!==yr){Y.face=Math.atan2(pr.x-Y.pos.x,pr.z-Y.pos.z);U.tap('KeyL');waters++;log.push('wP@'+pr.t.toFixed(1));}
    else if(yr.t<5&&yr.raft){Y.face=Math.PI;U.tap('KeyL');waters++;log.push('wY@'+yr.t.toFixed(1));}}
  if(i%120===0)log.push('P'+P.pos.z.toFixed(1)+','+P.pos.y.toFixed(1)+(pr?'c'+pr.t.toFixed(1):'')+' Y'+Y.pos.z.toFixed(1)+','+Y.pos.y.toFixed(1)+(yr?'c'+yr.t.toFixed(1)+(yr.raft?'R':''):''));
  if(i%6===0&&Y.pos.z<-30&&Y.pos.z>-33)log.push('y'+Y.pos.x.toFixed(2)+','+Y.pos.y.toFixed(2)+','+Y.pos.z.toFixed(2)+(yr?'c'+yr.t.toFixed(1)+(yr.raft?'R':'')+yr.x.toFixed(2)+','+yr.z.toFixed(2):'-')+' v'+Y.vel.x.toFixed(1)+','+Y.vel.y.toFixed(1)+','+Y.vel.z.toFixed(1));
  if(yr&&!yr.raft&&i>120){log.push('ystop@'+(i/60).toFixed(1));break;}
  ZC.tick(1);}
r4.push(log.join(' '),'waters='+waters,U.st(),'stage='+F.stage,'links='+W.links);r4
//@@ shot=w42d.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r5=['links='+W.links];const Y=H.yosha,P=H.proshka;
r5.push(U.walkTo(1,0,-39.3,3),'links='+W.links);Y.face=Math.PI;ZC.tick(50);U.tap('KeyL');ZC.tick(30);r5.push('rafts='+W.crusts.filter(c=>!c.gone).map(c=>c.x.toFixed(1)+','+c.z.toFixed(1)+(c.raft?'R':'')).join(' '));
r5.push(U.walkTo(1,0,-40.8,3));ZC.tick(90);r5.push(U.st());r5.push(U.walkTo(1,0,-43.5,3,(h,i)=>{if(i===2)ZC.press('KeyM');}),'stage='+F.stage);r5
//@@
// лавопад: ролик, Йоша — лестница из корок, Прошка — паровые столбы
const W=ZC.W,H=ZC.HERO,F=W.flags;const r6=[];const Y=H.yosha,P=H.proshka;W.enemies.forEach(e=>{e.cd=1e9;});
r6.push(U.walkTo(0,1.6,-48,3),F.stage,!!ZC.G.cine);ZC.tick(60);ZC.skip();ZC.tick(5);r6.push(F.stage,U.st(),'act='+U.act(0).kind+','+U.act(1).kind);
const lg=[];for(const [x,z] of [[5.2,-52.3],[5.2,-54.2],[5.2,-57.8],[5.2,-61.3],[5.2,-65]]){lg.push(U.walkTo(0,x,z,4)+'@'+P.pos.y.toFixed(1)+','+P.pos.z.toFixed(1));ZC.tick(20);}r6.push('P:'+lg.join(' '),'nuts='+W.nuts);
const log=[];let lastZ=Y.pos.z;
for(let k=0;k<14&&F.stage==='fall';k++){Y.face=Math.PI;ZC.tick(2);let tries=0;while(Y.skillCd>0&&tries<60){ZC.tick(1);tries++;}
  const tg=W.waterTargets.find(w=>w.lava&&w.active());log.push('k'+k+':'+Y.pos.y.toFixed(2)+','+Y.pos.z.toFixed(2)+(tg?'T'+tg.pos.z.toFixed(1):'-'));
  if(tg){U.tap('KeyL');ZC.tick(30);}
  const c=W.crusts.filter(c=>!c.gone).sort((a,b)=>a.z-b.z)[0];const tz=c?c.z-0.7:Y.pos.z-1.5;U.walkTo(1,-0.4,tz,2);ZC.tick(10);
  if(Y.pos.y<-5.8&&Y.pos.z<-63.8)break;}
r6.push(log.join(' '),U.st(),F.stage,'cnt='+F.cnt);r6
//@@ shot=w42e.png
ZC.tick(1);
//@@ shot=w42f.png
ZC.tick(900);
//@@
ZC.tick(500);ZC.skip();ZC.tick(300);[ZC.W.levelId,ZC.G.done['4-2'],ZC.G.got['4-2']]
