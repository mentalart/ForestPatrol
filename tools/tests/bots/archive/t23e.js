//@@
ZC.startFrom(ZC.LV('2-3'));ZC.G.manual=true;ZC.tick(40);ZC.skip();ZC.tick(10);const F=ZC.W.flags;F.task=2;const H=ZC.HERO;
const r=['nc='+ZC.W.noCarry.length];H.pelageya.pos.set(0,3.05,-16.8);H.pelageya.vel.set(0,0,0);let log=[];
for(let i=0;i<10;i++){const yp=H.yosha.pos.z;ZC.tick(1);if(Math.abs(H.yosha.pos.z-yp)>3)log.push('TP0 i='+i+' pel='+H.pelageya.pos.z.toFixed(1)+','+H.pelageya.pos.y.toFixed(1));}
ZC.hold('ArrowUp',true);ZC.press('KeyM');ZC.hold('KeyM',true);
for(let i=0;i<200;i++){const yp=H.yosha.pos.z;ZC.tick(1);if(Math.abs(H.yosha.pos.z-yp)>3){log.push('TP at i='+i+' pel='+H.pelageya.pos.z.toFixed(1)+','+H.pelageya.pos.y.toFixed(1)+' g='+H.pelageya.grounded+' nc='+ZC.W.noCarry.length);}}
ZC.hold('ArrowUp',false);ZC.hold('KeyM',false);r.push(log.join(';'),U.st());r
