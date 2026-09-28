//@@
ZC.startFrom(ZC.LV('3-4'));ZC.G.manual=true;ZC.tick(30);const H=ZC.HERO,W=ZC.W,S=W.shipS;const r=[W.name,'S='+S.z.toFixed(1)];
// все на борт
U.tap('KeyK');ZC.tick(3);r.push(U.path(1,[[2,-1],[0.9,-3],[0.9,-7.9]],3));U.tap('Semicolon');ZC.tick(3);r.push('lit='+U.act(1).lit,'slit='+S.lit,'stage='+W.flags.stage,!!ZC.G.cine);r
//@@ shot=w34a.png
ZC.tick(120);
//@@
ZC.skip();ZC.tick(5);const S=ZC.W.shipS;const r2=['stage='+ZC.W.flags.stage,'y='+S.y.toFixed(2),U.st()];U.tap('KeyK');ZC.tick(3);
ZC.tick(300);r2.push('S='+S.z.toFixed(1)+' sp='+S.speed.toFixed(2)+' roll='+S.roll.toFixed(2),U.st());r2
//@@ shot=w34b.png
ZC.tick(1);
//@@
// Потап к правому борту — крен
const S=ZC.W.shipS,H=ZC.HERO;U.tap('KeyQ');ZC.tick(3);const r3=[];const hold=(pi,dx,sec)=>{const k=pi?(dx>0?'ArrowRight':'ArrowLeft'):(dx>0?'KeyD':'KeyA');ZC.hold(k,true);ZC.tick(Math.round(sec*60));ZC.hold(k,false);};
hold(0,1,0.8);ZC.tick(90);r3.push('roll='+S.roll.toFixed(2)+' rollT='+S.rollT.toFixed(2),U.st());hold(0,-1,1.6);ZC.tick(90);r3.push('roll='+S.roll.toFixed(2),U.st(),'S='+S.z.toFixed(1),'gust='+JSON.stringify(ZC.W.flags.gustA||null));r3
