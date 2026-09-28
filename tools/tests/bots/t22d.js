//@@
ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(10);const F=ZC.W.flags;F.mast=true;F.garden=true;ZC.tick(80);
ZC.W.enemies.forEach(e=>{e.alive=false;ZC.W.group.remove(e.g);});ZC.W.enemies.length=0;
const H=ZC.HERO;H.proshka.pos.set(-1,0,-56);H.pelageya.pos.set(1,0,-56);ZC.tick(5);const Z3=ZC.W.waters[2];
U.tap('KeyR');ZC.tick(20);U.tap('Semicolon');ZC.tick(150);
U.walkTo(0,-0.6,-61,4);const log=[];let lt=0;
for(let i=0;i<400;i++){ZC.tick(1);const h=H.proshka;if(h.launchT!==lt){lt=h.launchT;log.push('L@'+h.pos.y.toFixed(2)+' z'+h.pos.z.toFixed(2));}if(h.pos.y>6.9&&h.pos.y<7.4&&i%2===0)log.push(h.pos.y.toFixed(2)+' v'+h.vel.y.toFixed(1)+' z'+h.pos.z.toFixed(2)+' x'+h.pos.x.toFixed(2));if(log.length>30)break;}
log.join(' | ')
