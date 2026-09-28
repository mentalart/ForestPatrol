//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-B1'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'foes='+W.enemies.map(e=>e.kind+':'+e.pi).join(','));r
//@@ shot=w5b1a.png
ZC.tick(30);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];for(let q=0;q<8&&!F.phase2;q++){r.push(U.brawl(78,['shield','shield']));if(!F.phase2)ZC.tick(60);}r.push('t='+F.t.toFixed(1),'phase2='+!!F.phase2,'said='+F.said,'petals='+ZC.players.map(p=>p.petals).join('/'),'downed='+ZC.players.map(p=>p.downed).join('/'));r
//@@
// фаза 2: слитки в горн
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];let del=0;
for(let n=0;n<40&&!F.phase3;n++){const g=W.hots.find(it=>it.gold&&!it.gone&&!it.carrier&&!it.flying);if(!g){ZC.tick(30);continue;}
  const q=U.walkTo(0,g.pos.x,g.pos.z+1.1,6);const h=U.act(0);h.face=Math.atan2(g.pos.x-h.pos.x,g.pos.z-h.pos.z);U.tap('KeyR');ZC.tick(15);if(!h.carry){r.push('nopick '+q);continue;}
  U.walkTo(0,-11.2,-16,8);h.face=-Math.PI/2;U.tap('KeyR');ZC.tick(20);del++;}
r.push('delivered='+del,'goldBack='+(F.goldBack||0),'cut='+(F.cut||0),'t='+F.t.toFixed(1),'phase3='+!!F.phase3);r
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];for(let i=0;i<60*80&&F.stage==="fight";i++){if(F.phase3&&!window.P3){window.P3=1;r.push("p3 start t="+F.t.toFixed(0));}ZC.tick(1);}r.push('stage='+F.stage,'cine='+!!ZC.G.cine);ZC.skip();ZC.tick(200);r.push('lv='+ZC.W.levelId,'done='+!!ZC.G.done['5-B1']);r
