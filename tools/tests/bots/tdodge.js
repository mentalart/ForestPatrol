U.go();ZC.loadLevel(3);ZC.tick(30);for(let k=0;k<4;k++){ZC.skip();ZC.tick(20);}const H=ZC.HERO;H.proshka.pos.set(-2,0,-84);H.pelageya.pos.set(2,0,-84);H.potap.pos.set(-4,0,-80);H.yosha.pos.set(4,0,-80);ZC.tick(60);
'arena='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state).join(',')
//@@
const H=ZC.HERO;const W=ZC.W;let log=[];let rolled=null,x0=null;
for(let i=0;i<60*20;i++){const h=U.act(0);const e=W.enemies.find(q=>q.alive&&q.tgt===h&&q.state==='wind'&&q.sig==='red');
 if(e&&!rolled&&(e.wdur-e.t)<0.18){x0=h.pos.clone();ZC.press('ShiftLeft');rolled=e;}
 if(rolled&&!log.length&&rolled.dazeT>0){log.push('daze='+rolled.dazeT.toFixed(2)+' state='+rolled.state+' rollDist='+h.pos.distanceTo(x0).toFixed(2)+' emb='+rolled.embers);}
 if(rolled&&rolled.dazeT>0){h.face=Math.atan2(rolled.pos.x-h.pos.x,rolled.pos.z-h.pos.z);if(i%22===0)ZC.press('KeyF');}
 if(rolled&&log.length===1&&rolled.dazeT<=0){log.push('after emb='+rolled.embers+' state='+rolled.state+' alive='+rolled.alive);break;}
 ZC.tick(1);}
log.join(' | ')+' roll speed check'
