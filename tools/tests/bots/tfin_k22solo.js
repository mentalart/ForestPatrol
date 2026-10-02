//@@ wait=1500
// релиз final06: 2-2 «Рыба-кит» — новые участки в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// деревня на горбу — Совиный взор Пелагеи, прилив в пруду (общая вода — просьба исполняется сама), Потап выпускает щуку; печка едет,
// когда сел тот, кем играешь; раки — бой, волна — щит Потапа; голова кита — икота, «Ко мне!» и конец уровня.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(4);}return me().kind;};
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);if(extra)extra(h,i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.callAll=(near)=>{U.tap('Digit1');for(let i=0;i<60*12;i++){ZC.tick(1);if(i>60&&['proshka','potap','pelageya','yosha'].every(k=>Math.hypot(H[k].pos.x-me().pos.x,H[k].pos.z-me().pos.z)<(near||6)))return 't='+(i/60).toFixed(1);if(i%240===239)U.tap('Digit1');}return 'TIMEOUT';};
window.SBRAWL=function(max,list){const n=Math.round((max||30)*60);const B=['KeyA','KeyD','KeyW','KeyS'];   // бой одним героем (в одиночку обе раскладки ведут одного героя — U.brawl тут мешает сам себе)
  for(let i=0;i<n;i++){const alive=(list||ZC.W.enemies).filter(e=>e.alive);if(!alive.length){B.forEach(k=>ZC.hold(k,false));return 'cleared t='+(i/60).toFixed(1);}
    const h=me();let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}
    const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z;const far=bd>1.9+e.r&&!(e.state==='wind'&&e.tgt===h);B.forEach(b=>ZC.hold(b,false));
    if(far){const inv=Math.abs(ZC.W.camYaw)>1;ZC.hold(B[0],inv?dx>0.3:dx<-0.3);ZC.hold(B[1],inv?dx<-0.3:dx>0.3);ZC.hold(B[2],inv?dz>0.3:dz<-0.3);ZC.hold(B[3],inv?dz<-0.3:dz>0.3);}
    const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo)ZC.press('KeyG');
    const w=alive.find(x=>x.state==='wind'&&x.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press('ShiftLeft');}else if(left<0.16&&w.left===null)ZC.press('KeyG');}
    if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0||(e.shell&&(i%12===0)))){h.face=Math.atan2(dx,dz);if(i%9===0)ZC.press('KeyF');}
    ZC.tick(1);}
  B.forEach(k=>ZC.hold(k,false));return 'TIMEOUT alive='+(list||ZC.W.enemies).filter(e=>e.alive).map(e=>e.kind+':'+e.state+':'+e.embers).join(',');};
window.st=()=>U.st()+' errs='+_errs.length;
window.BOARD=(max)=>{const D=ZC.W.dbg22();for(let i=0;i<(max||6)*60;i++){const h=me();if(h.groundRef===D.STV.col){rel();return 't='+(i/60).toFixed(2);}
    const dx=D.STV.x-h.pos.x,dz=D.STV.z-h.pos.z,d=Math.hypot(dx,dz);ZC.hold(B0[0],dx<-0.2);ZC.hold(B0[1],dx>0.2);ZC.hold(B0[2],dz<-0.2);ZC.hold(B0[3],dz>0.2);if(h.grounded&&d<2.8)ZC.press('Space');ZC.tick(1);}rel();return 'TIMEOUT';};
'solo='+ZC.G.solo
//@@
// деревня: Совиный взор — ведро со щукой светится; прилив в пруду; Потап выпускает щуку — печка выезжает
const D=ZC.W.warp22('village');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}toKind('pelageya');const r=[go(2,-88,6)];U.tap('KeyE');ZC.tick(20);
const pk=D.BUCK[D.PIKE_AT];if(!(pk.glow.material.opacity>0.2))throw new Error('ведро со щукой не светится');
toKind('potap');r.push(go(0.6,-84.2,8));U.tap('KeyR');ZC.tick(220);if(D.PZ.state!=='high')throw new Error('пруд не наполнился: '+D.PZ.state+' '+r.join()+' '+st());
r.push(go(pk.x+(pk.x<0?1.3:-1.3),pk.z,8));U.tap('KeyE');ZC.tick(10);if(!D.F.pikeFree)throw new Error('щука не выпущена: '+r.join()+' '+st());
let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}t=0;while(D.STV.state!=='wait'&&t<900){ZC.tick(1);t++;}if(D.STV.state!=='wait')throw new Error('печка не выехала');'village solo '+r.join()
//@@
// печка: сел Потап — поехали; раки — бой (только с тем, что загородил); волна — щит
const D=ZC.W.dbg22();const r=[BOARD(10)];ZC.tick(5);if(D.STV.state!=='ride')throw new Error('печка не поехала: '+r.join()+' '+st());
for(let i=0;i<60*120&&D.STV.state!=='done';i++){const crab=D.STV.crabs.find(e=>e.alive&&Math.hypot(e.pos.x-D.STV.x,e.pos.z-D.STV.z)<7);
  if(crab){ZC.hold('KeyG',false);const rb=SBRAWL(25,[crab]);r.push('crab:'+rb,'board:'+BOARD(8));continue;}
  const w=D.STV.wave;ZC.hold('KeyG',!!w&&w.t>-0.7&&w.t<1.3);const h=me();if(h.groundRef!==D.STV.col&&h.grounded){r.push('board:'+BOARD(8));continue;}ZC.tick(1);}
ZC.hold('KeyG',false);if(D.STV.state!=='done')throw new Error('не доехали: '+r.join()+' '+st());'ride solo '+r.join()
//@@
// голова кита: икота; «Ко мне!» — и конец уровня
const r=[go(0,-144,6)];let t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(20);r.push(callAll(6),go(0,-156,6),callAll(6),go(0,-163,5));ZC.tick(120);
if(ZC.W.levelId==='2-2'&&!ZC.W.flags.out)throw new Error('уровень не пройден: '+r.join()+' '+st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-2 solo done errs=0 '+r.join()
