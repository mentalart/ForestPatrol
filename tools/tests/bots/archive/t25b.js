//@@
ZC.startFrom(ZC.LV('2-5'));ZC.G.manual=true;ZC.tick(30);const F=ZC.W.flags;const H=ZC.HERO;F.voice='sunk';F.given=true;
const L1=ZC.W.waters[1],R1=ZC.W.waters[2];H.proshka.pos.set(-4,0,-28.5);H.pelageya.pos.set(4,0,-28.5);ZC.tick(5);
const r=[];r.push(U.walkTo(0,-4,-30.8,3));U.tap('KeyR');ZC.tick(150);r.push('L1='+L1.level.toFixed(2));H.proshka.face=Math.PI;U.tap('KeyE');ZC.tick(60);r.push('b1='+F.b1);
r.push(U.walkTo(1,4,-30.8,3));U.tap('Semicolon');ZC.tick(150);r.push('R1='+R1.level.toFixed(2),U.walkTo(1,5,-35.8,6),U.st());H.pelageya.face=Math.PI;U.tap('Comma');ZC.tick(30);r.push('b2='+F.b2);ZC.tick(200);
r.push(U.walkTo(1,1.2,-45,6),U.walkTo(1,0,-49,4),U.walkTo(1,0,-55,6),U.st());r
//@@ shot=w25c.png
ZC.tick(2);
//@@
const F=ZC.W.flags;const H=ZC.HERO;const DL=ZC.W.waters[3],DR=ZC.W.waters[4];
H.proshka.pos.set(-4,3,-54.8);H.pelageya.pos.set(4,3,-54.8);ZC.tick(5);const r=[];
r.push(U.walkTo(0,-4,-55.8,3));U.tap('KeyR');r.push(U.walkTo(1,4,-55.8,3));U.tap('Semicolon');ZC.tick(150);r.push('DL='+DL.level.toFixed(2)+' DR='+DR.level.toFixed(2));
r.push(U.walkTo(1,5,-60.8,6),U.st());H.pelageya.face=Math.PI;H.proshka.face=Math.PI;U.tap('KeyE');ZC.tick(40);r.push('dbL='+F.dbL);U.tap('Comma');ZC.tick(30);r.push('dbR='+F.dbR+' b3='+F.b3);ZC.tick(200);
r.push(U.walkTo(0,1.4,-70,6),U.walkTo(0,0,-73,4),U.walkTo(0,0,-79,6),U.st());r
