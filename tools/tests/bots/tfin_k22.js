//@@ wait=1500
// релиз final06: 2-2 «Рыба-кит» вдвое длиннее (late_99f_k22.js) — новые участки вдвоём настоящими нажатиями:
// деревня на горбу: Совиный взор Пелагеи показывает ведро со щукой, не то ведро — окунь; пруд общий — прилив; Потап выпускает щуку;
// «По щучьему велению» — печка выезжает сама; оба на печке — едет по хребту; раки перегораживают — бой; волна — щит; голова кита: икота,
// золото в струйке; звено и конец уровня. В фонтане дыхания мелькает золото.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',attack:'KeyF',guard:'KeyG',swap:'KeyQ',skill:'KeyE',item:'KeyR'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',attack:'Comma',guard:'Period',swap:'KeyK',skill:'KeyL',item:'Semicolon'}];
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(KEYS[pi].swap);ZC.tick(6);}return U.act(pi).kind===kind;};
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.REL=pi=>{const K=KEYS[pi];[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));};
// запрыгнуть на печку: идти к ней и прыгать рядом
window.BOARD=(pi,max)=>{const D=ZC.W.dbg22(),K=KEYS[pi];for(let i=0;i<(max||6)*60;i++){const h=U.act(pi);if(h.groundRef===D.STV.col){REL(pi);return 't='+(i/60).toFixed(2);}
    const dx=D.STV.x-h.pos.x,dz=D.STV.z-h.pos.z,d=Math.hypot(dx,dz);ZC.hold(K.left,dx<-0.2);ZC.hold(K.right,dx>0.2);ZC.hold(K.up,dz<-0.2);ZC.hold(K.down,dz>0.2);if(h.grounded&&d<2.3)ZC.press(K.jump);ZC.tick(1);}REL(pi);return 'TIMEOUT';};
// ехать: волна — щит; рак загородил — бой только с ним (прочие мороки уровня не отвлекают); смыло — догнать и запрыгнуть
window.RIDE=(max)=>{const D=ZC.W.dbg22();const log=[];for(let i=0;i<max*60;i++){if(D.STV.state==='done'){[0,1].forEach(REL);ZC.hold('KeyG',false);ZC.hold('Period',false);return 'done t='+(i/60).toFixed(1)+' '+log.join(',');}
    const crab=D.STV.crabs.find(e=>e.alive&&Math.hypot(e.pos.x-D.STV.x,e.pos.z-D.STV.z)<7);
    if(crab){ZC.hold('KeyG',false);ZC.hold('Period',false);const all=ZC.W.enemies;ZC.W.enemies=[crab];let rb;try{rb=U.brawl(25);}finally{ZC.W.enemies=all;}log.push('crab:'+rb);for(const pi of[0,1])log.push('board:'+BOARD(pi,8));continue;}
    const w=D.STV.wave,g=!!w&&w.t>-0.7&&w.t<1.3;ZC.hold('KeyG',g);ZC.hold('Period',g);
    for(const pi of[0,1]){const h=U.act(pi),K=KEYS[pi];if(h.groundRef===D.STV.col){REL(pi);continue;}const dx=D.STV.x-h.pos.x,dz=D.STV.z-h.pos.z,d=Math.hypot(dx,dz);
      ZC.hold(K.left,dx<-0.2);ZC.hold(K.right,dx>0.2);ZC.hold(K.up,dz<-0.2);ZC.hold(K.down,dz>0.2);if(h.grounded&&d<2.3)ZC.press(K.jump);if(i%60===0)log.push('off'+pi);}
    ZC.tick(1);}[0,1].forEach(REL);return 'TIMEOUT s='+D.STV.s.toFixed(1)+' '+log.slice(-6).join(',');};
ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
'links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal
//@@
// золото в фонтане дыхания: прилив у фонтана — на выдохе блеснёт
const W=ZC.W;W.flags.mast=true;W.flags.garden=true;const D0=W.dbg22();const Z3=D0.Z3;ZC.HERO.proshka.pos.set(0,0.3,-56);ZC.HERO.pelageya.pos.set(2,0.3,-56);ZC.tick(10);
ZC.tick(30);const st0=Z3.state;U.tap('KeyR');ZC.tick(20);const rq=!!Z3.req;U.tap('Semicolon');ZC.tick(200);const st1=Z3.state;let seen=false;for(let i=0;i<700&&!seen;i++){ZC.tick(1);W.group.traverse(o=>{if(o.isMesh&&o.geometry.type==='OctahedronGeometry'&&o.visible&&o.position.y>3)seen=true;});}
if(st1!=='high')throw new Error('фонтан не в приливе: '+[st0,rq,st1,Z3.state].join()+' '+U.st());if(!seen)throw new Error('в фонтане не блеснуло золото');'fountain gold ok'
//@@
// деревня: Совиный взор — ведро со щукой светится
const D=ZC.W.warp22('village');ZC.tick(20);NOCINE();ACT(1,'pelageya');const r=[U.walkTo(1,2,-88,6)];U.tap('KeyL');ZC.tick(20);
const b=D.BUCK[D.PIKE_AT];if(!(b.glow.material.opacity>0.2))throw new Error('ведро со щукой не светится: '+b.glow.material.opacity);'owl ok pike in '+D.PIKE_AT+' '+r.join()
//@@
// Потап поднимает не то ведро — окунь; пруд мелкий — щуку не выпустить; прилив вдвоём; выпускает щуку
const D=ZC.W.dbg22(),wrong=D.BUCK.find(b=>!b.pike),pk=D.BUCK[D.PIKE_AT];ACT(0,'potap');const r=[U.walkTo(0,wrong.x+(wrong.x<0?1.3:-1.3),wrong.z,6)];U.tap('KeyE');ZC.tick(60);
if(!wrong.tipped)throw new Error('не то ведро не опрокинулось');r.push(U.walkTo(0,pk.x+(pk.x<0?1.3:-1.3),pk.z,8));U.tap('KeyE');ZC.tick(20);if(D.F.pikeFree)throw new Error('щуку выпустили в мелкий пруд');
r.push(U.walkTo(1,0.6,-84.2,6));U.tap('Semicolon');ZC.tick(20);U.tap('KeyR');ZC.tick(200);if(D.PZ.state!=='high')throw new Error('пруд не наполнили: '+D.PZ.state+' '+r.join()+' '+U.st());
r.push(U.walkTo(0,pk.x+(pk.x<0?1.3:-1.3),pk.z,8));U.tap('KeyE');ZC.tick(10);if(!D.F.pikeFree||!ZC.G.cine)throw new Error('щука не выпущена: '+r.join()+' '+U.st());
let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}t=0;while(D.STV.state!=='wait'&&t<900){ZC.tick(1);t++;}if(D.STV.state!=='wait')throw new Error('печка не выехала: '+D.STV.state+' '+D.STV.x.toFixed(1)+','+D.STV.z.toFixed(1));'pike free, stove waits '+r.join()
//@@ shot=k22_stove.png
// на печку оба — поехали
const D=ZC.W.dbg22();ACT(0,'proshka');const r=[BOARD(0,10),BOARD(1,10)];ZC.tick(5);if(D.STV.state!=='ride')throw new Error('печка не поехала: '+r.join()+' '+D.STV.state+' '+U.st());
r.push(RIDE(120));if(D.STV.state!=='done')throw new Error('не доехали: '+r.join()+' '+U.st());'ride '+r.join()
//@@ shot=k22_ride_end.png
// голова кита: икота и золото; звено; конец уровня
const D=ZC.W.dbg22();const r=[U.walkTo(0,-1,-144,6),U.walkTo(1,1,-144,6)];let t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}if(!ZC.G.cine)throw new Error('нет ролика икоты: '+r.join()+' '+U.st());
while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(20);r.push(U.walkTo(0,0,-156,6),U.walkTo(1,1.5,-156,6),U.walkTo(0,0,-163,5),U.walkTo(1,1.5,-163,5));ZC.tick(120);
'head '+r.join()+' lvl='+ZC.W.levelId+' out='+!!ZC.W.flags.out
//@@
if(ZC.W.levelId==='2-2'&&!ZC.W.flags.out)throw new Error('уровень не пройден: '+U.st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-2 done errs=0'
