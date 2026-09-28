//@@
// 2-5 колокол в одиночку: прыгает только тот, кем управляешь
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-5'));ZC.G.manual=true;ZC.tick(30);const F=ZC.W.flags;const H=ZC.HERO;F.voice='sunk';F.given=true;F.b1=F.b2=F.b3=true;
H.proshka.pos.set(-3,6,-76.8);H.pelageya.pos.set(3,6,-76.8);H.potap.pos.set(-4,6,-76.6);H.yosha.pos.set(4,6,-76.6);ZC.tick(35);
ZC.W.enemies.forEach(e=>{if(e.alive){e.state='dying';e.t=0;e.alive=false;}});ZC.tick(120);
const sp=[[0.88,-82.12],[-0.88,-82.12],[-0.88,-83.88],[0.88,-83.88]];[H.proshka,H.potap,H.pelageya,H.yosha].forEach((h,i)=>{h.pos.set(sp[i][0],6.7,sp[i][1]);h.vel.set(0,0,0);});ZC.tick(20);
const r=['solo='+ZC.G.solo];for(let s=0;s<3;s++){for(let i=0;i<300;i++){ZC.tick(1);if(F.cnt&&F.cnt.t>2.05&&F.cnt.t<2.2&&F.cnt.p[0]===null){ZC.press('Space');ZC.tick(1);break;}}r.push('sw='+(F.cnt&&F.cnt.sw));ZC.tick(80);
  [H.proshka,H.potap,H.pelageya,H.yosha].forEach((h,i)=>{h.pos.set(sp[i][0],6.7,sp[i][1]);h.vel.set(0,0,0);});ZC.tick(10);}
r.push('bomWait='+F.bomWait);r
//@@
// 4-5 держим мост: управляешь Йошей — Потап держит сам
ZC.startFrom(ZC.LV('4-5'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags,H=ZC.HERO,HD=W.HD,G=ZC.G;const r=[];
if(U.act(0)!==H.potap){ZC.press('KeyQ');ZC.tick(2);}if(U.act(1)!==H.yosha){G.soloPi=1;ZC.press('KeyQ');ZC.tick(2);}
F.stage='hold';H.potap.pos.set(0,0,-31);G.soloPi=1;let frozen=0,wasF=false;for(let i=0;i<60*35;i++){ZC.tick(1);if(HD.frozen>0&&!wasF)frozen++;wasF=HD.frozen>0;}
r.push('auto: spirit='+HD.spirit.toFixed(2),'frozen='+frozen,'good='+(HD.good||0),'sway='+HD.sway.toFixed(2),'ctl='+U.act(G.soloPi).kind);
// для сравнения: Потапом управляешь ты и ничего не жмёшь — мост раскачивается
G.soloPi=0;HD.spirit=1;HD.frozen=0;frozen=0;wasF=false;for(let i=0;i<60*25;i++){ZC.tick(1);if(HD.frozen>0&&!wasF)frozen++;wasF=HD.frozen>0;}
r.push('manual idle: spirit='+HD.spirit.toFixed(2),'frozen='+frozen);r
//@@
// 1-Б: Богатырский щит — закрываешься ты, напарник вместе с тобой
ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(30);for(let k=0;k<8&&(!ZC.W.cring||ZC.G.cine||ZC.G.trans);k++){ZC.skip();ZC.tick(60);}const W=ZC.W,c=W.cring;const r=['lvl='+W.levelId+' '+!!c];c.on=true;c.t=1.25;c.press=[null,null];ZC.press('KeyG');ZC.tick(1);r.push('press='+c.press.map(v=>v===null?'-':v.toFixed(2)).join('/'));c.on=false;r
//@@
// камера и экран: в одиночку не делится, смотрит на того, кем управляешь
ZC.startFrom(ZC.LV('1-2'));ZC.G.manual=true;ZC.tick(30);for(let k=0;k<4;k++){ZC.skip();ZC.tick(20);}const G=ZC.G,H=ZC.HERO;const r=[];const a=U.act(0),b=U.act(1);b.pos.set(a.pos.x+14,a.pos.y,a.pos.z);ZC.tick(90);r.push('split='+G.split.toFixed(2));
ZC.press('KeyQ');ZC.tick(2);ZC.press('KeyQ');ZC.tick(120);const me=U.act(G.soloPi);r.push('ctl='+me.kind);r
//@@ shot=so_cam.png
ZC.tick(1);
