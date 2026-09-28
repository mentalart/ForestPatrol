U.go();ZC.loadLevel(ZC.LV('3-1'));ZC.tick(20);for(let k=0;k<5;k++){ZC.skip();ZC.tick(20);}
'enemies='+ZC.W.enemies.map(e=>e.kind+'@'+e.pos.x.toFixed(0)+','+e.pos.z.toFixed(0)+':'+e.state).join(' ')
//@@
const H=ZC.HERO;const e=ZC.W.enemies.find(q=>q.alive);let r='none';
if(e){H.proshka.pos.set(e.pos.x-8,e.pos.y,e.pos.z+2);H.pelageya.pos.set(e.pos.x+8,e.pos.y,e.pos.z+2);ZC.tick(90);r='nearFight split='+ZC.G.split.toFixed(2)+' target='+ZC.G.splitTarget+' sep='+Math.hypot(H.proshka.pos.x-H.pelageya.pos.x,H.proshka.pos.z-H.pelageya.pos.z).toFixed(1);
 H.proshka.pos.set(-4,0,10);H.pelageya.pos.set(12,0,10);ZC.tick(200);r+=' | noFight split='+ZC.G.split.toFixed(2);}
r
