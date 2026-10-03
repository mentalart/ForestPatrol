//@@
ZC.startFrom(ZC.LV('2-5'));ZC.G.manual=true;ZC.tick(30);const F=ZC.W.flags;const H=ZC.HERO;F.voice='sunk';F.given=true;F.b1=F.b2=F.b3=true;
H.proshka.pos.set(-3,6,-76.8);H.pelageya.pos.set(3,6,-76.8);H.potap.pos.set(-4,6,-76.6);H.yosha.pos.set(4,6,-76.6);ZC.tick(5);ZC.tick(30);
const t0=ZC.G.time;const ty=ZC.W.enemies.find(e=>e.kind==='tyagun'),MZ=ZC.W.waters.find(z=>z.minx===-6&&z.maxx===6&&z.minz===-88);const L=[];
U.walkTo(0,-4,-79.5,3);U.tap('KeyR');let res='';
for(let k=0;k<30&&ZC.W.enemies.some(e=>e.alive);k++){if(ty.alive&&(ty.silt||(MZ.state==='high'&&!ty.up))){const h=U.act(0);const inz=h.pos.x>MZ.minx-1&&h.pos.x<MZ.maxx+1&&h.pos.z>MZ.minz-1&&h.pos.z<MZ.maxz+1;if(!inz)U.walkTo(0,-4,-80,4);U.tap('KeyR');L.push('g'+MZ.state[0]);ZC.tick(20);}
  if(!ty.alive&&MZ.state==='low'&&ZC.W.enemies.some(e=>e.alive&&e.kind==='puzyr')){U.tap('KeyR');L.push('up');ZC.tick(150);}
  res=U.brawl(4);}
['clear '+(ZC.G.time-t0).toFixed(1)+'s',res,L.join(''),'alive='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind).join(',')]
