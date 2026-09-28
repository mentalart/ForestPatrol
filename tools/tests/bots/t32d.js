//@@
ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const H=ZC.HERO,W=ZC.W;const r=[];
H.proshka.pos.set(0,10,-90);H.proshka.vel.set(0,0,0);ZC.tick(5);U.tap('KeyR');r.push(U.walkTo(0,0,-93.3,3));const C6=W.clouds[6];
for(let i=0;i<8;i++){ZC.tick(45);r.push(C6.y.toFixed(2)+'/'+H.proshka.pos.y.toFixed(2)+'/'+H.proshka.pos.z.toFixed(2)+(H.proshka.groundRef===C6?'on':'-')+(C6.lit?'L':''));}r
