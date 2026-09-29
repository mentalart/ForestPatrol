//@@
// релиз final06: 5-Б2 — крупные планы (камера W.camFn): купол и свечи, Кощей с мечом (замах), полёт и шар, ворон, щитник, игла у наковальни. Запускать с URLQ='&hq=1'.
window.K5=ZC.FIN.k5;window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];window.skipAll=n=>{for(let i=0;i<(n||6);i++){if(ZC.G.cine){ZC.skip();ZC.tick(3);}else break;}};
window.cam=(p,l)=>{ZC.W.camFn=()=>({pos:new THREE.Vector3(...p),look:new THREE.Vector3(...l),k:30});};
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(5);skipAll();ZC.tick(60);K5.auto=false;
cam([4,4.2,-12],[-1.6,1.6,-21]);ZC.tick(40);ZC.FIN.occ.frame();'st='+K5.st
//@@ shot=koshart_1.png
cam([-4.2,2.6,-3.4],[-7.6,1.3,-7.4]);ZC.tick(40);ZC.FIN.occ.frame();'candle'
//@@ shot=koshart_2.png
K5.stageStart(2);ZC.tick(40);const kb=K5.KB;kb.pos.set(0,0,-12);cam([3.2,2.8,-7.6],[0,2.2,-12]);ZC.tick(20);kb.tgt=A(0);kb.state='wind';kb.t=0;kb.wdur=9;kb.sig='yellow';ZC.tick(25);ZC.FIN.occ.frame();'wind'
//@@ shot=koshart_3.png
K5.stageStart(4);ZC.tick(40);const kb=K5.KB;kb.pos.set(0,0,-12);cam([3.4,2.6,-7.4],[0,2.4,-12]);ZC.tick(20);kb.tgt=A(0);kb.state='wind';kb.t=0;kb.wdur=9;kb.sig='red';ZC.tick(25);ZC.FIN.occ.frame();'sword'
//@@ shot=koshart_4.png
K5.stageStart(3);ZC.tick(200);const kb=K5.KB;const o=K5.orbThrow(A(0));ZC.tick(25);cam([kb.pos.x+5,kb.pos.y-1,kb.pos.z+7],[kb.pos.x,kb.pos.y+1.5,kb.pos.z]);ZC.tick(15);ZC.FIN.occ.frame();'fly storm='+K5.storm.toFixed(2)
//@@ shot=koshart_5.png
const rv=ZC.W.enemies.find(e=>e.kind==='k5raven')||K5.ravenMake();rv.pos.set(2,1.2,-6);rv.state='k5x';cam([rv.pos.x+2.4,1.8,rv.pos.z+2.8],[rv.pos.x,1.1,rv.pos.z]);ZC.tick(20);ZC.FIN.occ.frame();'raven'
//@@ shot=koshart_6.png
K5.stageStart(2);ZC.tick(30);const key=K5.keyMake(A(1));ZC.tick(60);cam([A(1).pos.x+2.6,2,A(1).pos.z+3],[A(1).pos.x,1.1,A(1).pos.z]);K5.lockHero(A(0));ZC.tick(20);ZC.FIN.occ.frame();'key & lock'
//@@ shot=koshart_7.png
K5.stageStart(5);ZC.tick(40);const pr=ZC.HERO.proshka;pr.pos.set(K5.ANV.x,0,K5.ANV.z+1.4);K5.needle.holder=pr;cam([K5.ANV.x+3,2.6,K5.ANV.z+4.4],[K5.ANV.x,1.2,K5.ANV.z]);ZC.tick(30);ZC.FIN.occ.frame();'anvil forging='+K5.forging()
