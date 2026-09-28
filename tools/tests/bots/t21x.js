U.go();ZC.loadLevel(ZC.LV('2-1'));ZC.tick(20);for(let k=0;k<6;k++){ZC.skip();ZC.tick(30);}ZC.W.abil.gusli=true;ZC.W.flags.stage='street';ZC.W.flags.book=true;
const H=ZC.HERO;for(const[h,x]of[[H.proshka,-3],[H.potap,-5],[H.pelageya,3],[H.yosha,5]]){h.pos.set(x,0,-77);h.vel.set(0,0,0);}ZC.tick(20);U.st()
//@@
// шлюзы: в воду, прилив, на ступеньку
const r=[];const I=['KeyR','Semicolon'];
function lock(zIn,zOut){r.push(U.walkTo(0,-3,zIn,6),U.walkTo(1,3,zIn,6));ZC.press(I[0]);ZC.tick(150);r.push('y='+U.act(0).pos.y.toFixed(2));r.push(U.walkTo(0,-3,zOut,6),U.walkTo(1,3,zOut,6));r.push('after y='+U.act(0).pos.y.toFixed(2)+'/'+U.act(1).pos.y.toFixed(2));}
lock(-84,-90.5);lock(-92,-98.5);lock(-100,-106.5);r.join(' ')+' | '+U.st()
//@@ shot=k21a.png
// лифт
const r=[U.walkTo(0,-1,-112.5,6),U.walkTo(1,1,-112.5,6)];ZC.press('KeyR');ZC.tick(160);r.push('y='+U.act(0).pos.y.toFixed(2));r.push(U.walkTo(0,-1,-118.5,6),U.walkTo(1,1,-118.5,6));ZC.tick(30);
r.join(' ')+' | enemies='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind).join(',')+' split='+ZC.G.splitTarget
//@@ shot=k21b.png
// бой: раков снимаем, щуку сажаем на мель отливом и бьём
for(const pi of[0,1]){const p=ZC.players[pi];p.cp.set(0,0,-119);p.downed=false;p.petals=3;p.downT=0;}
for(const e of ZC.W.enemies)if(e.alive&&e.kind==='rak')e.alive=false;
const r=[U.walkTo(0,-3.2,-124.5,6)];ZC.press('KeyR');ZC.tick(150);
const pk=ZC.W.enemies.filter(e=>e.alive&&e.kind==='shchuka').sort((a,b)=>Math.hypot(a.pos.x,a.pos.z+127)-Math.hypot(b.pos.x,b.pos.z+127))[0];r.push('pike flop='+pk.flop);
const h=U.act(0);h.pos.set(pk.pos.x-1.2,0,pk.pos.z);h.vel.set(0,0,0);ZC.tick(2);const e0=pk.embers;
const tr=[];for(let i=0;i<60*8&&pk.alive;i++){h.face=Math.atan2(pk.pos.x-h.pos.x,pk.pos.z-h.pos.z);if(i%22===0)ZC.press('KeyF');ZC.tick(1);if(i%30===0)tr.push(h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+' e'+pk.embers+' '+pk.state+' d='+ZC.players[0].downed);}r.push('pike '+e0+'->'+pk.embers+' '+pk.state+' alive='+pk.alive);if(pk.alive)pk.alive=false;
ZC.tick(90);r.join(' ')+' gateOpen='+ZC.W.gates.map(g=>g.forceOpen).join(',')+' '+U.st()
//@@
// две раковины
for(const pi of[0,1]){const p=ZC.players[pi];p.cp.set(0,0,-139);p.downed=false;p.petals=3;}const r=[U.walkTo(0,-4,-138.5,8),U.walkTo(1,4,-138.5,8),U.walkTo(0,-4,-146,6),U.walkTo(1,4,-146,6)];ZC.press('KeyR');ZC.press('Semicolon');ZC.tick(180);r.push('grate='+!!ZC.W.flags.grate);
r.push(U.walkTo(0,-2,-160,8),U.walkTo(1,2,-160,8),U.walkTo(0,-1,-170,6),U.st());ZC.tick(60);r.join(' ')+' lvl='+ZC.W.levelId+' got='+JSON.stringify(ZC.G.got)
