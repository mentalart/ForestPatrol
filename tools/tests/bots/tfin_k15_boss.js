//@@ wait=1500
// релиз final06 · 1-5: чердак овина — веретено удирает на повить; сушильня — сторожевые нити (задел — «дзынь» и нитяной морок; Совиный взор
// показывает нити), засов на двоих; повить — мини-босс Веретенник: струны крест-накрест, рывок в паутинку — кокон слетел, удары; этап 2 —
// мороки и три веретена (настоящее — Совиным взором); финал с Кикиморой, уровень пройден. Оба игрока — скриптом.
// @timeout=1500
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.F=()=>ZC.W.flags;window.P=ZC.players;window.H=ZC.HERO;window.B=()=>ZC.W.vb15;
ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(30);
ZC.FIN.warp(-2.5,-31.2,7);ZC.tick(20);const c=U.until(()=>ZC.G.cine,3);ZC.skip();ZC.tick(30);
ZC.W.enemies.forEach(e=>{e.alive=false;e.g.visible=false;});   // мороки сеней и овина остались позади (телепорт)
['cine '+c,'spFled='+!!F().spFled,U.st(),'errs='+_errs.length]
//@@
// в дверь чердака — в сушильню; Прошка идёт напролом через высокую нить — «дзынь» и морок
const r=[];for(const pi of[0,1])r.push(pi+': '+U.path(pi,[[-2.5,-33.6],[-2.5,-35.4]],4));
const n0=ZC.W.enemies.filter(e=>e.alive).length;r.push('walk '+U.path(0,[[-2.5,-38.6]],4));ZC.tick(20);
const n1=ZC.W.enemies.filter(e=>e.alive).length;r.push('foes '+n0+'→'+n1);r.push(n1>n0?'trip ok':'FAIL trip');
r.push(U.brawl(60,['parry','parry']),U.st());ZC.FIN.warp(-2.5,-35.8,7);ZC.tick(10);r
//@@ shot=k15_owl.png
// Пелагея — Совиный взор: нити видны; проход по просветам, низкие — прыжком
const r=[];ZC.press('KeyL');ZC.tick(10);const vis=ZC.W.flags&&ZC.W.group.children.some(o=>o.isMesh&&o.material&&o.material.opacity>0.5&&o.geometry.type==='CylinderGeometry'&&Math.abs(o.position.z+40.6)<0.05);
r.push('owl visible='+vis);
window.cross=(pi,pts)=>{const out=[];for(const p of pts){if(p[2]){const wz=p[1];let k=0;for(;k<360;k++){if(U.step(pi,p[0],wz-1.3,0.3,h=>h.grounded&&h.pos.z-wz>0.35&&h.pos.z-wz<0.9))break;ZC.tick(1);}U.rel(pi);ZC.tick(10);out.push('j'+k);}
  else out.push(U.goto(pi,p[0],p[1],6,0.3));}return out.join(' ');};
const PATH=[[-2.5,-36.2],[4,-36.2],[4,-39],[4,-40.6,1],[-5.2,-41.8],[-5.2,-45.2],[-4,-46.6,1],[-4,-48.4]];
const t0=ZC.W.enemies.filter(e=>e.alive).length;r.push('P2 '+cross(1,PATH),'P1 '+cross(0,[[4,-36.2],[4,-39]].concat(PATH.slice(3))));
const t1=ZC.W.enemies.filter(e=>e.alive).length;r.push('foes '+t0+'→'+t1,'trips='+(F().trips||[]).join(','),U.st());r.push(t1===t0&&U.act(0).pos.z<-47&&U.act(1).pos.z<-47?'wires ok':'FAIL wires');r
//@@
// засов: одна плита — дверь закрыта, обе — открыта
const r=[];r.push(U.goto(0,-6,-49.8,6,0.3));ZC.tick(30);const one=!F().latch;r.push(U.goto(1,6,-49.8,8,0.3));ZC.tick(60);
r.push('one='+one,'latch='+!!F().latch);r.push(one&&F().latch?'latch ok':'FAIL latch');r
//@@ shot=k15_boss.png
// на повить — вход Веретенника (ролик)
const r=[];for(const pi of[0,1])r.push(U.path(pi,[[pi?1.5:-1.5,-51],[pi?1.5:-1.5,-56]],5));const c=U.until(()=>ZC.G.cine,4);ZC.tick(20);ZC.skip();ZC.tick(30);
r.push('cine '+c,U.st(),'down='+P[0].downed+','+P[1].downed,'cine='+!!ZC.G.cine,'phase='+B().phase,'boss='+!!(B().e&&B().e.alive),'bar='+(document.getElementById('bossbar')||{}).innerHTML);r.push(B().phase===1?'intro ok':'FAIL intro');r
//@@
// этап 1: струны в колышки (Игрок 1 — в западный, Игрок 2 — в восточный), паутинка между ними; герои — за паутинкой; ждём рывок
window.str=(pi,sx,sz,fx,fz)=>{U.goto(pi,fx,fz,8,0.3);const h=U.act(pi);h.face=Math.atan2(sx-h.pos.x,sz-h.pos.z);for(let i=0;i<4&&!ZC.W.threads.some(t=>t.string&&t.owner===pi&&t.sz<-52.4);i++){ZC.press(U.K[pi].i);ZC.tick(40);}
  return ZC.W.threads.some(t=>t.string&&t.owner===pi&&t.sz<-52.4);};
window.webUp=()=>{const a=str(0,7,-70.5,-4,-60.5),b=str(1,-7,-70.5,4,-60.5);return a+'/'+b+' webs='+ZC.W.webs.filter(w=>w.y>6).length;};
window.fightPhase=(ph,max)=>{const log=[];let catches=0,prevMode='';for(let i=0;i<max*60&&B().phase<=ph;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}const b=B(),e=b.e;
    if(b.mode!==prevMode){log.push(b.mode);prevMode=b.mode;if(b.mode==='caught')catches++;}
    if(b.mode==='decoy'){const pel=ZC.HERO.pelageya;if(ZC.W.owlT<=0&&i%30===0)ZC.press('KeyL');const r=b.decoys.find(d=>d.real&&d.alive);if(r&&ZC.W.owlT>0){U.step(1,r.g.position.x+1.4,r.g.position.z+1.4,0.8)&&(U.act(1).face=Math.atan2(r.g.position.x-U.act(1).pos.x,r.g.position.z-U.act(1).pos.z),i%10===0&&ZC.press('Comma'));}ZC.tick(1);continue;}
    if(!e||!e.alive){ZC.tick(1);continue;}
    if(b.mode==='free'&&b.cocoon&&ZC.W.webs.filter(w=>w.y>6).length===0&&i%120===0){U.rel(0);U.rel(1);log.push('web '+webUp());}
    for(const pi of[0,1]){const h=U.act(pi);
      if(b.mode==='sweepW'||b.mode==='sweep'){if(h.grounded&&i%12===pi*6)ZC.press(U.K[pi].j);continue;}
      if(!b.cocoon||e.state==='broken'){U.hit(pi,e,i);continue;}
      // стоим за паутинкой: на линии «Веретенник — паутинка», в 3 м за ней
      const w=ZC.W.webs.find(q=>q.y>6);if(w){const dx=w.x-e.pos.x,dz=w.z-e.pos.z,d=Math.hypot(dx,dz)||1;U.step(pi,w.x+dx/d*3.2+(pi?1:-1)*0.6,w.z+dz/d*3.2,0.5);}else U.rel(pi);
      if(b.mode==='aim'&&b.tgt===h&&b.mt>0.9&&i%20===0&&!w)ZC.press(U.K[pi].r);}
    ZC.tick(1);}
  U.rel(0);U.rel(1);const e=B().e;return 'catches='+catches+' emb='+(e&&e.embers)+' st='+(e&&e.state)+' '+log.slice(-30).join(',')+' petals='+P[0].petals+','+P[1].petals+' down='+P[0].downed+','+P[1].downed+' '+U.st();};
const r=['web '+webUp(),ZC.W.threads.filter(t=>t.string).map(t=>t.owner+':'+t.sx.toFixed(1)+','+t.sz.toFixed(1)+'→'+t.stake.x+','+t.stake.z).join(' ')];r.push(fightPhase(1,150),'phase='+B().phase,'petals='+P[0].petals+','+P[1].petals);r.push(B().phase>=1.5?'phase1 ok':'FAIL phase1');r
//@@
// этап 2: мороки, три веретена, снова паутинка; победа — финал
const u=U.until(()=>B().phase===2,12);if(ZC.G.cine){ZC.skip();ZC.tick(20);}const r=['p2 '+u];
r.push(fightPhase(2,360),'phase='+B().phase,'won='+!!F().bossWon);
const o=U.until(()=>F().out||ZC.W.levelId!=='1-5',40);if(ZC.G.cine){ZC.skip();ZC.tick(30);}const o2=U.until(()=>F().out||ZC.W.levelId!=='1-5',20);
r.push('out '+o+' '+o2,'links='+ZC.W.links,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));r.push(F().bossWon&&F().out&&!_errs.length?'boss ok':'FAIL boss');r
