//@@ wait=1500
// релиз final06 · 1-5 «Кикиморина прялка», новые залы: сени (кикиморки, мотовило-противовес: тяжёлый вниз — лёгкий вверх, клубок на мотовило
// поднимает оставшегося), ткацкая (подножка открывает зев, клубок-челнок ткёт полотно-мост через провал), спуск в овин. Оба игрока — скриптом.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.F=()=>ZC.W.flags;window.P=ZC.players;window.H=ZC.HERO;
ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(30);
['stage='+F().stage,U.st(),U.obj(),'errs='+_errs.length]
//@@
// кикиморки в сенях — бьют оба
const r=[U.until(()=>ZC.W.enemies.some(e=>e.alive),6)];r.push(U.brawl(60,['parry','parry']),'petals='+P[0].petals+','+P[1].petals);
r.push(ZC.W.enemies.filter(e=>e.alive).length===0?'foes ok':'FAIL foes',U.obj());r
//@@ shot=k15_lift.png
// мотовило: Пелагея на правую площадку (та опускается, левая держится), Потап — на левую: левая тяжелее (2 > 1) — правая едет на полати
window.jumpOn=(pi,x,z)=>{for(let i=0;i<360;i++){const h=U.hero(pi);if(U.step(pi,x,z,0.5,q=>q.grounded&&Math.hypot(q.pos.x-x,q.pos.z-z)<2.4&&q.pos.y<0.5))return 'on t='+(i/60).toFixed(1);ZC.tick(1);}U.rel(pi);return 'TIMEOUT '+U.st();};
window.LP=()=>ZC.W.flags&&[ZC.W.boxes.find(b=>b.minx===-7.6&&b.minz===31.5),ZC.W.boxes.find(b=>b.minx===4.4&&b.minz===31.5)].map(b=>b.maxy.toFixed(2)).join('/');
const r=[];r.push('P2 '+jumpOn(1,6,33));ZC.tick(60);
r.push('lift '+LP());
// Игрок 1: Потап (смена) и Прошка за ним
if(U.act(0).kind!=='potap'){ZC.press('KeyQ');ZC.tick(10);}r.push('P1 '+U.act(0).kind+' '+jumpOn(0,-6,33));ZC.tick(2);
r.push(U.until(()=>+LP().split('/')[1]>4.3,6),'lift '+LP(),U.st());
r.push(+LP().split('/')[1]>4.3?'right up ok':'FAIL right up');r
//@@
// Пелагея сходит на полати, к мотовилу — клубок на мотовило: левая площадка с Потапом едет вверх
const r=[];r.push('off '+U.goto(1,4.5,30.4,6,0.4),U.goto(1,1.4,29.6,6,0.4));U.act(1).face=-Math.PI/2;ZC.press('Semicolon');ZC.tick(2);
r.push('wound='+!!F().wound,U.until(()=>+LP().split('/')[0]>4.3,6),'lift '+LP());
r.push('P1 off '+U.goto(0,-6,30.3,6,0.4),U.st());ZC.tick(60);
r.push('liftDone='+!!F().liftDone,U.obj());r.push(F().liftDone?'lift ok':'FAIL lift');r
//@@ shot=k15_loom.png
// ткацкая: Потап на подножку, Пелагея — к челноку, пять бросков клубка
const r=[];r.push('door '+U.goto(0,0,28.8,8,0.4)+' '+U.goto(0,0,27,6,0.4)+' '+U.goto(0,-6.5,25.5,8,0.3));
r.push('spot '+U.goto(1,0,28.8,8,0.4)+' '+U.goto(1,0,23.7,8,0.3));ZC.tick(30);
let n=0;for(let i=0;i<12&&!F().loomDone;i++){ZC.press('Semicolon');ZC.tick(80);n++;}
r.push('throws='+n,'loomDone='+!!F().loomDone,U.st());r.push(F().loomDone?'loom ok':'FAIL loom');r
//@@
// по полотну на тот берег, вниз по лесенке — в овин
const r=[];for(const pi of[1,0]){r.push(pi+': '+U.path(pi,[[0,22],[0,12],[0,10],[0,6],[0,2]],4));}
ZC.press('Digit1');ZC.press('Digit0');ZC.tick(300);r.push(U.st(),U.obj(),'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));
r.push('followers '+[H.proshka,H.pelageya,H.potap,H.yosha].filter(h=>h.pos.z<6).length+'/4');
r.push(U.act(0).pos.z<4&&U.act(1).pos.z<4&&!_errs.length?'rooms ok':'FAIL rooms');r
//@@
// камера правым стиком в овине: при полном повороте (общий экран ±55°, у стены) камера не выходит за стены овина
const C=ZC.FIN.cam,D=ZC.FIN.occ.dbg;C.fdt=1/30;ZC.FIN.occ.fdt=0.05;
window.pose=()=>{ZC.FIN.occ.frame();return D.camS.position.clone();};
const r=[];let bad=0;for(const[x,z]of[[-4.5,-12],[7,-22],[0,-26]]){ZC.FIN.warp(x,z,0);ZC.tick(90);
  for(const sx of[1,-1]){C.stick[0]={x:sx,y:0.6};ZC.tick(90);const p=pose();C.stick[0]=null;const ok=Math.abs(p.x)<10.35&&p.z<4.35&&p.z>-34.35;if(!ok)bad++;r.push(x+','+z+' '+sx+': '+p.x.toFixed(1)+','+p.y.toFixed(1)+','+p.z.toFixed(1)+(ok?'':' !!'));ZC.tick(60);}}
r.push(bad?'FAIL cam':'cam ok');r
