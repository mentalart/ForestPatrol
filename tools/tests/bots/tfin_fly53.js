//@@
// 5-3 шторм: светится столб — молния бьёт туда, где Горыныч будет через 1,5 с; кто остался под столбом — «Ай! Молния»
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-3'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);
const W=ZC.W,F=W.flags,K=W.k53;W.CLOUDS[0].state='gone';K.GP.set(0,10,-560);ZC.tick(2);const r=['stage='+F.stage,'seg2='+!!F.seg2];
for(let i=0;i<60*6&&!K.bolts.length;i++)ZC.tick(1);const b=K.bolts[0];r.push('bolt='+!!b);if(b){for(let i=0;i<100&&!b.done;i++){K.GP.x=b.x;K.GP.z=Math.max(K.GP.z,b.z);ZC.tick(1);}}
r.push('hits='+(F.boltHits||0));r.push(F.seg2&&(F.boltHits||0)>=1?'ok':'FAIL bolt');r
//@@
// волна встаёт стеной: низко — «Волна!», отбрасывает назад; высоко — «Над волной!»
const W=ZC.W,F=W.flags,K=W.k53;const r=[];const s0=K.SWELLS[0],s1=K.SWELLS[1];K.GP.set(0,5,s0.z+40);for(let i=0;i<60*25&&!s0.passed;i++){K.GP.y=5;ZC.tick(1);}r.push('low hit='+(F.swellHits||0),'passed='+s0.passed);
K.GP.set(0,21,s1.z+40);for(let i=0;i<60*25&&!s1.passed;i++){K.GP.y=21;ZC.tick(1);}r.push('high ok='+(F.swellOk||0));r.push((F.swellHits||0)>=1&&(F.swellOk||0)>=1?'ok':'FAIL swell');r
//@@
// погоня: пролёт сквозь облачную арку — рывок (скорость +4, кадр шире)
const W=ZC.W,F=W.flags,K=W.k53;const r=[];K.CLOUDS.forEach(c=>{c.state='gone';c.g.visible=false;});const a=K.ARCH[0];K.GP.set(a.x,a.y-3,a.z+20);for(let i=0;i<60*4&&!a.passed;i++){K.GP.x=a.x;K.GP.y=a.y-3;ZC.tick(1);}
r.push('arches='+(F.arches||0),'archT='+K.GV.archT.toFixed(2),'seg3='+!!F.seg3);ZC.tick(30);r.push('sp='+K.GV.sp.toFixed(1),'fov='+W.camFov().toFixed(1));r.push((F.arches||0)>=1&&F.seg3?'ok':'FAIL arch');r
//@@
// утка поймана — яйцо у Пелагеи, потом зеркальце (Кощей один в тереме), уровень пройден
const W=ZC.W,F=W.flags,K=W.k53;for(let i=0;i<60*20&&F.stage==='fly';i++){if(F.duck){K.GP.x=K.DK.pos.x;K.GP.y=K.DK.pos.y-3.5;K.DK.pos.z=K.GP.z-3;}ZC.tick(1);}const r=['stage='+F.stage];
let mv=false;for(let i=0;i<60*60&&ZC.W.levelId==='5-3';i++){if(ZC.G.cine&&ZC.G.cine.dur===7.5)mv=true;if(ZC.G.cine&&ZC.G.cine.dur!==7.5&&i%30===0)ZC.skip();ZC.tick(1);}
r.push('mirror='+mv,'lv='+ZC.W.levelId);r.push(mv&&ZC.W.levelId!=='5-3'?'ok':'FAIL end');r
