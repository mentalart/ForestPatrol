//@@
ZC.startFrom(ZC.LV('2-5'));ZC.G.manual=true;ZC.tick(30);const F=ZC.W.flags;const H=ZC.HERO;F.voice='sunk';F.given=true;F.b1=F.b2=F.b3=true;
H.proshka.pos.set(-3,6,-76.8);H.pelageya.pos.set(3,6,-76.8);H.potap.pos.set(-4,6,-76.6);H.yosha.pos.set(4,6,-76.6);ZC.tick(5);ZC.tick(30);
const r=['started='+ZC.W.enemies.length];r.push(U.brawl(40));
// тягун: под водой неуязвим — отлив гуслями, бой на мели; зарылся в ил — прилив и снова отлив
const ty=ZC.W.enemies.find(e=>e.kind==='tyagun'),MZ=ZC.W.waters.find(z=>z.minx===-6&&z.maxx===6&&z.minz===-88),L=[];
for(let k=0;k<14&&ty&&ty.alive;k++){const h=U.act(0);const inz=h.pos.x>MZ.minx-1&&h.pos.x<MZ.maxx+1&&h.pos.z>MZ.minz-1&&h.pos.z<MZ.maxz+1;if(!inz)U.walkTo(0,-4,-80,4);
  if(MZ.state==='high'||ty.silt){L.push((ty.silt?'silt':'high')+'→gusli');U.tap('KeyR');ZC.tick(150);if(ty.silt||MZ.state==='high'){U.tap('KeyR');ZC.tick(150);}}
  const b=U.brawl(6);L.push(MZ.state+(ty.up?'U':'')+(ty.silt?'S':'')+':e'+ty.embers+ty.state[0]+(ty.alive?'':'†'));}
r.push('tyagun '+L.join(' '),'petals='+ZC.players.map(p=>p.petals).join('/'));if(MZ.state==='low'){U.tap('KeyR');ZC.tick(180);}r.push(U.brawl(40));r.push('alive='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state).join(','));r
//@@ shot=w25d.png
ZC.tick(2);
//@@
const F=ZC.W.flags;const H=ZC.HERO;ZC.W.enemies.forEach(e=>{if(e.alive){e.alive=false;ZC.W.group.remove(e.g);}});ZC.tick(120);
const sp=[[0.88,-82.12],[-0.88,-82.12],[-0.88,-83.88],[0.88,-83.88]];[H.proshka,H.potap,H.pelageya,H.yosha].forEach((h,i)=>{h.pos.set(sp[i][0],6.7,sp[i][1]);h.vel.set(0,0,0);});ZC.tick(20);
const r=['st='+ZC.W.waters[5].state];for(let s=0;s<3;s++){let ok=false;for(let i=0;i<300;i++){ZC.tick(1);if(F.cnt&&F.cnt.t>2.05&&F.cnt.t<2.2&&F.cnt.p[0]===null){ZC.press('Space');ZC.press('KeyM');ZC.tick(1);ok=true;break;}}r.push('sw='+(F.cnt&&F.cnt.sw));ZC.tick(80);
  [H.proshka,H.potap,H.pelageya,H.yosha].forEach((h,i)=>{h.pos.set(sp[i][0],6.7,sp[i][1]);h.vel.set(0,0,0);});ZC.tick(10);}
r.push('bomWait='+F.bomWait);ZC.tick(80);r.push('cine='+!!ZC.G.cine);r
//@@ shot=w25e.png
ZC.tick(420);
//@@ shot=w25f.png
ZC.tick(500);
//@@
ZC.skip();ZC.tick(100);[ZC.W.levelId,ZC.G.done['2-5']]
