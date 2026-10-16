/* ============================== РЕЛИЗ · СОЧНЫЙ ВЫСТРЕЛ МОРОКА-СТРЕЛКА: 8 шагов «make a magic attack» (стенд «до/после» — late_91j_bolt_lab) ============================== */
// Синяя капля мороков-стрелков (W.bolts: spawnBolt / updateBolts в 05_foes_moroki) летела точкой, молча, без следа и пропадала при попадании.
// Механику (скорость, окно отбива, урон, eta/left) не трогаем — только ощущение. Каждый шаг — свой флаг BFX.f.*, BFX.on=false — прежнее поведение.
//  1 charge — за время замаха капля собирается в точке вылета из ничего, к ней стягиваются искорки;
//  2 core   — в полёте белое ядро, оболочка и ореол цвета капли, пульсация;
//  3 trail  — шлейф из затухающих копий и огоньков; у отбитой капли — длиннее и золотой («летит уже наша»);
//  4 burst  — на попадании вспышка и искры конусом по полёту; в морока — крупнее, волна и стоп-кадр; в щит — веер искр назад;
//  5 react  — морок от вернувшейся капли белеет (PUNCH из late_91h), сжимается-подпрыгивает и отъезжает; герой — толчок камеры;
//  6 sound  — нарастающий заряд, «вжух» на вылете, «бум» на попадании, «дзинь» щита, звонкий отбив;
//  7 after  — на мороке ~1,3 с тлеет пятно цвета капли с искорками, плавно гаснет;
//  8 num    — упругое «−1» у морока; «Сама себя!» и потеря нескольких угольков — крупнее и золотом, как крит.
// Вспышки — × jxFl() (настройка «Вспышки»: 0 % — без вспышек), тряска — shake() (× «Тряска»), число частиц — × FXQ().
const BFX={on:true,f:{charge:true,core:true,trail:true,burst:true,react:true,sound:true,after:true,num:true},
  stats:{charges:0,shots:0,trails:0,bursts:0,reacts:0,sounds:0,afters:0,nums:0,parries:0,shields:0,heroHits:0,foeHits:0},
  ch:new Map(),known:new Map(),pt:[],fl:[],dy:[],af:[],sq:[],ev:[],inUB:false,grp:null};
FIN.boltFx=BFX;
const bfOn=k=>BFX.on&&BFX.f[k];
const bfFl=()=>typeof jxFl==='function'?jxFl():1;
const bfQ=()=>typeof FXQ==='function'?FXQ():1;
const bfSnd=()=>bfOn('sound')&&typeof AUD!=='undefined'&&AUD.ready();
const bfPan=(p,pi)=>typeof jxPan==='function'?jxPan(p,pi||0):0;
const BF_GOLD=0xffc94a;

/* ---------- общие ресурсы: мягкое свечение (спрайт), шар, кэш материалов ---------- */
const BF_GLOW=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.22,'rgba(255,255,255,0.75)');g.addColorStop(0.55,'rgba(255,255,255,0.18)');g.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=g;x.fillRect(0,0,64,64);const t=new THREE.CanvasTexture(c);return t;})();
const BF_SPH=new THREE.SphereGeometry(1,14,10),BF_MAT={};
const bfAdd=(col,op)=>{const k=col+'_'+op;return BF_MAT[k]||(BF_MAT[k]=new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false}));};
const BF_CORE=new THREE.MeshBasicMaterial({color:0xffffff});
function bfSprite(col,op,s){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:BF_GLOW,color:col,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false}));
  m.scale.setScalar(s);m.renderOrder=5;if(typeof jxNoRay==='function')jxNoRay(m);return m;}
const bfKill=m=>{if(!m)return;if(m.parent)m.parent.remove(m);if(m.isSprite&&m.material)m.material.dispose();};
const bfMesh=(mat,s)=>{const m=new THREE.Mesh(BF_SPH,mat);m.scale.setScalar(s);m.castShadow=false;m.renderOrder=4;if(typeof jxNoRay==='function')jxNoRay(m);return m;};
// цвет капли: свой у уровня (K5X.bolt и др. кладут свою сетку) — берём с первого непрозрачного меша
function bfCol(b){if(b.col!=null)return b.col;let c=null;if(b.g)b.g.traverse(o=>{if(c==null&&o.isMesh&&o.material&&!o.material.transparent&&o.material.color)c=o.material.color.getHex();});return c==null?COL.blue:c;}
const bfTop=e=>e.pos.clone().add(new V3(0,(e.L&&e.L.top||1.4)*(e.s||1),0));

/* ---------- 1. заряд: капля растёт в точке вылета, искорки стягиваются к ней ---------- */
function bfCharge(e,dt){let C=BFX.ch.get(e);const k=clamp(e.t/(e.wdur||0.5),0,1),col=e.boltCol||COL.blue;
  if(!C){C={g:new THREE.Group(),t:0,sp:0,col};C.core=bfMesh(BF_CORE,0.12);C.shell=bfMesh(bfAdd(col,0.55),0.2);C.glow=bfSprite(col,0.9,1);
    C.g.add(C.core,C.shell,C.glow);W.group.add(C.g);BFX.ch.set(e,C);BFX.stats.charges++;
    if(bfSnd()){const d=Math.max(0.25,e.wdur/(e.slow||1)),pan=bfPan(e.pos);BFX.stats.sounds++;
      jxOS({type:'sine',f0:220,f1:740,d,glide:d,v:0.035,vib:0.03,vibF:11,pan});jxNZ({f0:500,f1:2600,d,v:0.035,q:2.2,a:d*0.8,pan});}}
  C.t+=dt;C.g.position.copy(bfTop(e));const s=0.15+0.85*k*k,pu=1+0.1*Math.sin(C.t*40);
  C.core.scale.setScalar(0.11*s);C.shell.scale.setScalar(0.22*s*pu);C.glow.scale.setScalar((0.5+1.1*s)*pu);C.glow.material.opacity=0.35+0.55*k;
  C.sp-=dt;if(C.sp<=0&&k<0.95){C.sp=0.045/bfQ();const a=rand(0,6.283),b=rand(-0.6,0.9),r=rand(0.9,1.4);
    const m=bfMesh(bfAdd(col,0.9),rand(0.035,0.06)),o=new V3(Math.cos(a)*Math.cos(b)*r,Math.sin(b)*r,Math.sin(a)*Math.cos(b)*r);m.position.copy(C.g.position).add(o);W.group.add(m);
    BFX.pt.push({m,o,C,t:0,life:rand(0.18,0.28)});}}
function bfChargeEnd(e){const C=BFX.ch.get(e);if(!C)return;bfKill(C.glow);if(C.g.parent)C.g.parent.remove(C.g);BFX.ch.delete(e);}

/* ---------- 2–3. капля в полёте: ядро, ореол, пульсация; шлейф из копий и огоньков ---------- */
function bfInit(b){const col=bfCol(b),D={col,hist:[],gh:[],t:0,fx:0,prev:b.p.clone(),dir:new V3(0,0,1),refl:!!b.refl,core:null,glow:null};
  if(bfOn('core')){D.core=bfMesh(BF_CORE,0.2);D.glow=bfSprite(b.refl?BF_GOLD:col,0.85,1.9);b.g.add(D.core,D.glow);}
  if(bfOn('trail')){const n=b.refl?12:8;for(let i=0;i<n;i++){const m=bfMesh(bfAdd(i<2?0xffffff:(b.refl?BF_GOLD:col),0.55*(1-i/n)+0.08),0.01);W.group.add(m);D.gh.push(m);}BFX.stats.trails++;}
  BFX.known.set(b,D);
  if(!b.refl){BFX.stats.shots++;
    if(bfSnd()){const pan=bfPan(b.p);BFX.stats.sounds++;jxNZ({type:'bandpass',f0:2600,f1:520,d:0.3,v:0.13,q:1.1,a:0.004,pan});jxOS({type:'triangle',f0:900,f1:300,d:0.2,v:0.045,pan});}
    if(bfOn('burst')&&bfFl()>0)bfFlash(b.p.clone(),D.col,1.3,0.12);}
  return D;}
function bfFly(b,D,dt){D.t+=dt;const p=b.p;const mv=p.clone().sub(D.prev);if(mv.lengthSq()>1e-6)D.dir.copy(mv).normalize();D.prev.copy(p);
  if(D.core){const pu=1+0.08*Math.sin(D.t*26);b.g.scale.setScalar(0.7*pu*(b.refl?1.15:1));D.glow.material.opacity=0.75+0.2*Math.sin(D.t*31);}
  if(D.gh.length){D.hist.unshift(p.clone());const n=D.gh.length,step=2;if(D.hist.length>n*step+1)D.hist.length=n*step+1;
    for(let i=0;i<n;i++){const q=D.hist[Math.min(D.hist.length-1,i*step+1)],m=D.gh[i];m.position.copy(q);m.scale.setScalar((b.refl?0.24:0.2)*(1-i/n)*(0.85+0.15*Math.sin(D.t*30+i)));}
    D.fx-=dt;if(D.fx<=0&&typeof fxAdd==='function'){D.fx=0.035/bfQ();const c=b.refl?(Math.random()<0.5?BF_GOLD:0xffffff):(Math.random()<0.5?D.col:0xffffff);
      fxAdd('octa',c,p.clone().add(new V3(rand(-0.08,0.08),rand(-0.08,0.08),rand(-0.08,0.08))),D.dir.clone().multiplyScalar(-rand(0.5,1.5)).add(new V3(0,rand(0.2,0.8),0)),{s:rand(0.04,0.07),life:rand(0.25,0.4),g:-1,drag:2.5,spin:10});}}}
// капля кончилась — шлейф догорает за 0,2 с, а не пропадает
function bfEnd(b){const D=BFX.known.get(b);if(!D)return null;BFX.known.delete(b);if(D.glow)bfKill(D.glow);if(D.gh.length)BFX.dy.push({gh:D.gh,t:0,s0:D.gh.map(m=>m.scale.x)});return D;}

/* ---------- 4. вспышка и искры ---------- */
function bfFlash(p,col,size,life){const k=bfFl();if(k<=0)return;const m=bfSprite(0xffffff,1,0.1);m.position.copy(p);W.group.add(m);
  const r=bfSprite(col,0.9,0.1);r.position.copy(p);W.group.add(r);BFX.fl.push({m,r,t:0,life:life*(k<1?0.6:1),size:size*(k<1?0.75:1)});}
function bfSparks(p,dir,col,n,sp,fan){n=Math.max(3,Math.round(n*bfQ()));const pal=[0xffffff,col,0xfff4d0,col];
  for(let i=0;i<n;i++){let v;if(typeof pnCone==='function'){v=pnCone(dir,sp*0.6,sp,-0.5,3.5,fan);v.y+=dir.y*sp*0.5;}else v=new V3(rand(-1,1),rand(0,1),rand(-1,1)).multiplyScalar(sp);
    if(typeof pnStreak==='function')pnStreak(p.clone(),v,pal[i%pal.length],rand(0.035,0.06),rand(0.18,0.3));
    else if(typeof fxAdd==='function')fxAdd('tetra',pal[i%pal.length],p.clone(),v,{s:0.06,life:0.3,g:6});}
  if(typeof fxAdd==='function')for(let i=0;i<Math.round(n*0.5);i++){const a=rand(0,6.283),s=rand(1,2.6);
    fxAdd('star',i%2?col:0xffffff,p.clone(),new V3(Math.cos(a)*s,rand(1,3),Math.sin(a)*s),{s:rand(0.06,0.1),life:rand(0.4,0.7),g:3,drag:2,spin:8});}}
function bfBurst(p,dir,col,kind){if(!bfOn('burst'))return;BFX.stats.bursts++;
  if(kind==='foe'){bfFlash(p,col,3.4,0.16);bfSparks(p,dir,col,20,9,0.55);try{ringFx(new V3(p.x,p.y-1.1,p.z),col,2.2);}catch(err){}
    G.hitstop=Math.max(G.hitstop,0.06*(typeof JX!=='undefined'&&JX.s?JX.s.hs:1));}
  else if(kind==='shield'){bfFlash(p,0xfff4d0,1.8,0.1);bfSparks(p,dir.clone().negate(),0xfff0b0,12,7,1.1);}
  else if(kind==='parry'){bfFlash(p,BF_GOLD,2.2,0.12);bfSparks(p,dir.clone().negate(),BF_GOLD,12,7,0.8);}
  else if(kind==='fizzle'){if(typeof fxAdd==='function')for(let i=0;i<5;i++)fxAdd('octa',col,p.clone(),new V3(rand(-1,1),rand(0.5,1.5),rand(-1,1)),{s:0.05,life:0.4,g:-1,drag:2});}
  else{bfFlash(p,col,2.4,0.13);bfSparks(p,dir,col,12,7,0.7);}}

/* ---------- 5. реакция цели ---------- */
function bfReact(e,dir,big){if(!bfOn('react')||!e||!e.alive)return;BFX.stats.reacts++;
  if(typeof pnFlash==='function'&&bfFl()>0)pnFlash(e,0.07);
  BFX.sq=BFX.sq.filter(s=>s.e!==e);BFX.sq.push({e,t:0,a:big?0.32:0.22});
  if(typeof pnKnock==='function')pnKnock(e,new V3(dir.x,0,dir.z).normalize(),big?5:4);}

/* ---------- 6. звук попадания ---------- */
function bfHitSnd(kind,p,pi){if(!bfSnd())return;const pan=bfPan(p,pi);BFX.stats.sounds++;
  if(kind==='foe'){jxTH({f0:130,f1:36,d:0.34,v:0.32,pan});jxNZ({type:'lowpass',f0:3200,f1:260,d:0.22,v:0.16,a:0.002,pan});jxNZ({type:'highpass',f0:4200,d:0.03,v:0.12,a:0.0005,pan});
    jxBL(1568,{v:0.04,d:0.6,wet:0.5,pan});}
  else if(kind==='shield'){jxBL(1760,{v:0.05,d:0.5,wet:0.4,pan});jxNZ({type:'highpass',f0:3000,d:0.05,v:0.1,a:0.001,pan});jxTH({f0:200,f1:80,d:0.12,v:0.12,pan});}
  else if(kind==='parry'){jxNZ({type:'bandpass',f0:600,f1:3400,d:0.24,v:0.12,q:1.2,a:0.004,pan});jxBL(1318,{v:0.045,d:0.5,wet:0.5,pan});}
  else{jxTH({f0:170,f1:48,d:0.24,v:0.24,pan});jxNZ({type:'lowpass',f0:2200,f1:300,d:0.18,v:0.13,a:0.002,pan});jxOS({f0:640,f1:180,d:0.14,v:0.05,pan});}}

/* ---------- 7. последствия: тлеющее пятно с искорками ---------- */
function bfAfter(e,col,life){if(!bfOn('after')||!e||!e.g)return;BFX.stats.afters++;const old=BFX.af.find(a=>a.e===e);if(old){old.t=0;old.life=life;return;}
  const s=bfSprite(col,0.7,1.6);e.g.add(s);s.position.set(0,(e.L&&e.L.top||1.4)*0.55,0);BFX.af.push({e,s,col,t:0,life,sp:0});}

/* ---------- 8. число: упругое «−1» (крит — крупнее и золотом) ---------- */
{const st=document.createElement('style');st.textContent=
  '.float .bfx-n{display:inline-block;font-size:30px;color:#fff1b8;animation:bfxPop .55s cubic-bezier(.2,1.7,.4,1) both}'+
  '.float .bfx-n.crit{font-size:44px;color:#ffb02e;text-shadow:0 2px 3px #000,0 0 14px rgba(255,160,40,.8)}'+
  '@keyframes bfxPop{0%{transform:scale(.2)}35%{transform:scale(1.4)}60%{transform:scale(.9)}100%{transform:scale(1)}}';document.head.appendChild(st);}
function bfNum(e,n,crit){if(!bfOn('num')||!e||typeof floatText!=='function')return;BFX.stats.nums++;
  const p=bfTop(e).add(new V3(0,0.25,0));floatText(p,'−'+n,crit?'#ffb02e':'#fff1b8');
  try{const f=floats[floats.length-1];if(f){f.life=0.95;f.els.forEach(el=>{el.innerHTML='<span class="bfx-n'+(crit?' crit':'')+'">−'+n+'</span>';});}}catch(err){}}

/* ---------- исходы капли: кто кого ловит внутри updateBolts ---------- */
{const _sb=shieldBlock;shieldBlock=function(h){if(BFX.inUB)BFX.ev.push({k:'shield',h});return _sb.apply(this,arguments);};}
{const _hh=hitHero;hitHero=function(e,h){if(BFX.inUB)BFX.ev.push({k:'hit',h,e});return _hh.apply(this,arguments);};}
{const _ub=updateBolts;updateBolts=function(dt){
  if(!BFX.on||!W.bolts.length)return _ub.apply(this,arguments);
  const before=W.bolts.slice(),emb=new Map();for(const b of before)if(b.from)emb.set(b.from,{n:b.from.embers,alive:b.from.alive});
  BFX.ev.length=0;BFX.inUB=true;try{_ub.apply(this,arguments);}finally{BFX.inUB=false;}
  try{bfOutcomes(before,emb);}catch(err){console.error('bolt fx',err);}};}
function bfOutcomes(before,emb){const now=new Set(W.bolts),was=new Set(before),used=new Set();
  for(const b of before){if(now.has(b))continue;const D=bfEnd(b),col=D?D.col:bfCol(b),dir=D?D.dir:new V3(0,0,1),p=b.p.clone();
    if(b.t>5){bfBurst(p,dir,col,'fizzle');continue;}
    if(b.refl){const e=b.from,E=emb.get(e)||{n:0,alive:false};if(!E.alive)continue;const lost=Math.max(0,E.n-(e.embers||0)),crit=lost>=2||(!e.alive&&E.n>1);
      BFX.stats.foeHits++;bfBurst(p,dir,col,'foe');bfReact(e,dir,crit);bfHitSnd('foe',p,b.tgt&&b.tgt.player);
      if(bfOn('react')){const pi=b.tgt&&b.tgt.player!=null?b.tgt.player:null;shake(pi,0.04,0.15);}
      bfAfter(e,crit?BF_GOLD:col,1.3);if(lost>0)bfNum(e,lost,crit);continue;}
    const nb=W.bolts.find(x=>x.refl&&x.from===b.from&&!was.has(x));
    if(nb){BFX.stats.parries++;bfBurst(p,dir,col,'parry');bfHitSnd('parry',p,b.tgt&&b.tgt.player);continue;}
    let ev=BFX.ev.find(v=>!used.has(v)&&v.h===b.tgt);if(!ev)ev=BFX.ev.find(v=>!used.has(v)&&v.k==='shield');if(!ev)continue;used.add(ev);
    if(ev.k==='shield'){BFX.stats.shields++;bfBurst(p,dir,col,'shield');bfHitSnd('shield',p,ev.h.player);}
    else{BFX.stats.heroHits++;bfBurst(p,dir,col,'hero');bfHitSnd('hero',p,ev.h.player);if(bfOn('react'))shake(ev.h.player,0.035,0.14);bfAfter(ev.h,col,0.6);}}}

/* ---------- кадр ---------- */
function bfClear(){for(const C of BFX.ch.values()){bfKill(C.glow);if(C.g.parent)C.g.parent.remove(C.g);}BFX.ch.clear();
  for(const [b,D] of BFX.known){bfKill(D.glow);bfKill(D.core);D.gh.forEach(bfKill);if(b.g)b.g.scale.setScalar(0.7);}BFX.known.clear();
  BFX.pt.forEach(p=>bfKill(p.m));BFX.fl.forEach(f=>{bfKill(f.m);bfKill(f.r);});BFX.dy.forEach(d=>d.gh.forEach(bfKill));BFX.af.forEach(a=>bfKill(a.s));
  BFX.pt.length=BFX.fl.length=BFX.dy.length=BFX.af.length=BFX.sq.length=0;}
function bfTick(dt){
  if(BFX.grp!==W.group){bfClear();BFX.grp=W.group;}
  // 1. заряд
  for(const e of W.enemies){const want=bfOn('charge')&&e.alive&&e.def&&e.def.ranged&&e.state==='wind'&&e.sig==='blue';if(want)bfCharge(e,dt);else if(BFX.ch.has(e))bfChargeEnd(e);}
  for(const e of BFX.ch.keys())if(!W.enemies.includes(e))bfChargeEnd(e);
  for(let i=BFX.pt.length-1;i>=0;i--){const p=BFX.pt[i];p.t+=dt;const k=p.t/p.life;if(k>=1||!p.C.g.parent){bfKill(p.m);BFX.pt.splice(i,1);continue;}
    p.m.position.copy(p.C.g.position).addScaledVector(p.o,1-k*k);}
  // 2–3. полёт
  for(const b of W.bolts){let D=BFX.known.get(b);if(!D)D=bfInit(b);bfFly(b,D,dt);}
  for(const b of BFX.known.keys())if(!W.bolts.includes(b))bfEnd(b);
  for(let i=BFX.dy.length-1;i>=0;i--){const d=BFX.dy[i];d.t+=dt;const k=1-d.t/0.2;if(k<=0){d.gh.forEach(bfKill);BFX.dy.splice(i,1);continue;}d.gh.forEach((m,j)=>m.scale.setScalar(d.s0[j]*k));}
  // 4. вспышки
  for(let i=BFX.fl.length-1;i>=0;i--){const f=BFX.fl[i];f.t+=dt;const k=f.t/f.life;if(k>=1){bfKill(f.m);bfKill(f.r);BFX.fl.splice(i,1);continue;}
    const e=1-Math.pow(1-k,3);f.m.scale.setScalar(f.size*0.6*e+0.1);f.m.material.opacity=1-k;f.r.scale.setScalar(f.size*(0.4+0.8*e));f.r.material.opacity=0.9*(1-k)*(1-k);}
  // 5. сжатие-подскок морока (поверх масштаба, который updateFoe ставит каждый кадр)
  for(let i=BFX.sq.length-1;i>=0;i--){const s=BFX.sq[i];s.t+=dt;const e=s.e;if(s.t>0.45||!e.alive||!e.body){BFX.sq.splice(i,1);continue;}
    const w=s.a*Math.sin(s.t*28)*Math.exp(-s.t*9);e.body.scale.x*=1+w;e.body.scale.z*=1+w;e.body.scale.y*=1-w;}
  // 7. тление
  for(let i=BFX.af.length-1;i>=0;i--){const a=BFX.af[i];a.t+=dt;const k=a.t/a.life,e=a.e;
    if(k>=1||!e.g||!e.g.parent||(e.alive===false&&e.state!=='dying')){bfKill(a.s);BFX.af.splice(i,1);continue;}
    a.s.material.opacity=0.7*(1-k)*(0.75+0.25*Math.sin(a.t*18));a.s.scale.setScalar(1.6*(1-0.4*k));
    a.sp-=dt;if(a.sp<=0&&typeof fxAdd==='function'){a.sp=(0.06+0.12*k)/bfQ();const top=(e.L&&e.L.top||(e.d&&e.d.height)||1.4)*(e.s||1);
      fxAdd('octa',Math.random()<0.6?a.col:0xffffff,e.pos.clone().add(new V3(rand(-0.4,0.4),rand(0.2,top),rand(-0.4,0.4))),new V3(rand(-0.3,0.3),rand(0.8,1.8),rand(-0.3,0.3)),{s:rand(0.035,0.06),life:rand(0.4,0.7),g:-0.5,drag:1.5,spin:8});}}}
{const _step=step;step=function(dt){_step(dt);
  if(!BFX.on&&!BFX.ch.size&&!BFX.known.size&&!BFX.pt.length&&!BFX.fl.length&&!BFX.dy.length&&!BFX.af.length)return;
  if(!BFX.on){bfClear();return;}
  try{bfTick(dt);}catch(err){console.error('bolt fx tick',err);bfClear();}};}
