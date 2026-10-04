/* ============================== РЕЛИЗ · СОЧНЫЙ БОЙ: удар, сигналы мороков, движения, урон, клубок (docs/23_vfx_sfx.md) ============================== */
// Перенесено из «Полигона эффектов» (заход 1; шаги по поверхностям не приняты — шумно от четырёх героев).
// Удар: hit-stop на каждом попадании (50 мс; кора — 90; отбив — 70), слоистый звук со своим «весом» у героя, белая вспышка и
// проседание морока, лесенка нот по ладу мира (серия ударов, звенья подряд). Сигналы: свой звук у цвета, блик и «дзинь» за 0,15 с
// до удара, нить и кольцо цели цветом игрока. Движения: прыжок, приземление, кувырок, щит, отбив — слоями. Урон: розовая кромка
// своей половины экрана, лепесток слетает, мягкое «ой», музыка приседает (шина — late_91c), сердцебиение на последнем лепестке;
// клубок распускается и сшивается. Сила вспышек — из настроек («Вспышки» 100 / 50 / 0 %). Звуки — AUD (late_81_sfx).
const JX={on:true,s:{hs:1,vol:1},parts:[],combo:[{n:0,t:-9},{n:0,t:-9}],pick:{n:0,t:-9},ctxH:null,inHit:false,muteTone:false,duckT:0};
FIN.juice=JX;
const jxOn=()=>JX.on;
const jxV=v=>v*JX.s.vol;
// яркость вспышек из настроек: 1 / 0,5 / 0 (старое «Яркие вспышки: выкл» — 0)
const jxFl=()=>{const k=FIN.set.flashK;return k==null?(FIN.set.flash===false?0:1):k;};
const JXKIND={potap:0.72,proshka:1,pelageya:1.12,yosha:1.32};
const jxK=h=>(h&&JXKIND[h.kind])||1;
// панорама: где источник на экране (в раздельном — ещё и чья половина)
function jxPan(pos,pi){try{if(!pos||!PANES.length)return 0;const n=PANES.length,P=n>1?PANES[pi===1?1:0]:PANES[0];const v=pos.clone().project(P.cam);let x=clamp(v.x,-1,1)*0.55;if(n>1)x=x*0.5+(pi===1?0.4:-0.4);return clamp(x,-0.9,0.9);}catch(e){return 0;}}
// тон прототипа можно заглушить на время вызова исходного звука (чтобы сохранить его побочные действия)
{const _tone=tone;tone=function(){if(JX.muteTone)return;return _tone.apply(this,arguments);};}
const jxMuted=fn=>{JX.muteTone=true;try{return fn();}finally{JX.muteTone=false;}};

/* ---------- звуки ---------- */
const jxNZ=o=>{o.v=jxV(o.v||0.1);AUD.nz(o);},jxOS=o=>{o.v=jxV(o.v||0.1);AUD.osc(o);},jxBL=(f,o)=>{o=o||{};o.v=jxV(o.v||0.08);AUD.bell(f,o);},jxTH=o=>{o.v=jxV(o.v||0.3);AUD.osc({f0:o.f0||130,f1:o.f1||42,d:o.d||0.3,v:o.v,a:0.004,at:o.at,pan:o.pan});};
const jxHz=m=>440*Math.pow(2,(m-69)/12);
const JXLAD_MODE={dor:[0,2,3,5,7,9,10],aeo:[0,2,3,5,7,8,10],lyd:[0,2,4,6,7,9,11],phr:[0,1,3,5,7,8,10],mix:[0,2,4,5,7,9,10]};
const JXLAD_W={1:[57,'dor'],2:[52,'aeo'],3:[53,'lyd'],4:[52,'phr'],5:[50,'mix'],0:[55,'mix']};
function jxLad(n){const L=JXLAD_W[W.world]||JXLAD_W[0],m=JXLAD_MODE[L[1]];n=Math.min(n,13);return jxHz(L[0]+12+m[n%7]+12*Math.floor(n/7));}
const JXSND={
  swish(h){const k=jxK(h),r=rand(0.94,1.06)*k,pan=h?jxPan(h.pos,h.player):0;jxNZ({f0:380*r,f1:2600*r,f2:620*r,d:k<0.8?0.26:k>1.2?0.15:0.2,q:1.4,v:0.11*(k<0.8?1.2:1),a:0.02,pan0:pan-0.15,pan1:pan+0.15,wet:0.12});
    if(k<0.8)jxOS({type:'triangle',f0:110,f1:70,d:0.2,v:0.04,pan});},
  hit(h,heavy){const k=jxK(h),r=rand(0.95,1.05),pan=h?jxPan(h.pos,h.player):0,H=heavy?1.35:1;
    jxNZ({type:'highpass',f0:3200*r,d:0.035,v:0.12*H,a:0.002,q:0.7});                                 // контакт — щелчок
    if(h&&h.kind==='potap'){jxTH({f0:150*r,f1:45,d:0.24,v:0.36*H,pan});jxNZ({type:'lowpass',f0:900,f1:200,d:0.16,v:0.12*H,a:0.003,pan});}
    else if(h&&h.kind==='pelageya'){jxOS({type:'triangle',f0:320*r,f1:170,d:0.09,v:0.1*H,pan});jxBL(1568*r,{v:0.05*H,d:0.45,wet:0.45,pan});}
    else if(h&&h.kind==='yosha'){jxOS({f0:950*r,f1:480,d:0.08,v:0.1*H,glide:0.07,pan});jxNZ({type:'highpass',f0:5200,d:0.18,v:0.03*H,a:0.01,wet:0.4,pan});}
    else{jxOS({type:'triangle',f0:300*r,f1:140,d:0.1,v:0.14*H,pan});jxNZ({f0:1300*r,f1:500,d:0.09,v:0.1*H,q:1.1,pan});}
    jxNZ({type:'lowpass',f0:1800,f1:300,d:0.3,v:0.025*H,a:0.01,wet:0.6});},                          // хвост в реверберацию
  ember(){jxNZ({type:'highpass',f0:2400,f1:900,d:0.22,v:0.035,a:0.004,q:0.8});jxOS({f0:520,f1:300,d:0.14,v:0.03});},
  clink(h){const r=rand(0.96,1.04),pan=h?jxPan(h.pos,h.player):0;jxOS({type:'square',f0:1050*r,f1:880*r,d:0.06,v:0.035,lp:3000,pan});jxBL(2200*r,{v:0.03,d:0.28,wet:0.3,pan});jxNZ({f0:3000,q:4,d:0.05,v:0.06,a:0.002,pan});},
  jump(h){const k=jxK(h),pan=h?jxPan(h.pos,h.player):0;jxNZ({f0:500*k,f1:2200*k,d:0.13,v:0.05,q:1.2,pan});jxOS({type:'triangle',f0:280*k,f1:520*k,d:0.11,v:0.045,glide:0.1,pan});},
  land(h,w,surf){const k=jxK(h),pan=h?jxPan(h.pos,h.player):0;jxTH({f0:130/k,f1:48,d:0.15,v:0.2*w*(k<0.8?1.4:1),pan});JXSND.step(surf,h,1.6*w);},
  roll(h){const pan=h?jxPan(h.pos,h.player):0;jxNZ({type:'lowpass',f0:1600,f1:380,d:0.26,v:0.1,a:0.02,q:0.6,pan});jxTH({f0:110,f1:60,d:0.1,v:0.1,at:0.14,pan});},
  shield(h){const pan=h?jxPan(h.pos,h.player):0;jxTH({f0:210,f1:90,d:0.13,v:0.24,pan});jxNZ({f0:900,q:2,d:0.1,v:0.12,a:0.002,pan});jxOS({type:'square',f0:420,f1:300,d:0.08,v:0.03,lp:1200,pan});},
  parry(h){const pan=h?jxPan(h.pos,h.player):0;jxBL(1568,{v:0.075,d:0.95,wet:0.55,pan});jxBL(2349,{v:0.045,d:0.7,at:0.012,wet:0.55,pan});jxNZ({type:'highpass',f0:5200,d:0.28,v:0.05,a:0.004,wet:0.4,pan});jxTH({f0:190,f1:60,d:0.16,v:0.16,pan});},
  hurt(h){const pan=h?jxPan(h.pos,h.player):0,f={potap:230,proshka:420,pelageya:520,yosha:600}[h&&h.kind]||420;
    jxNZ({type:'lowpass',f0:900,f1:200,d:0.26,v:0.13,a:0.006,q:0.6,pan});                           // мягкое «пух»
    jxOS({type:'sawtooth',f0:f,f1:f*0.68,d:0.24,v:0.045,lp:1500,lp1:650,glide:0.2,vib:0.012,vibF:9,a:0.02,pan});   // «ой»
    jxOS({type:'triangle',f0:f*1.5,f1:f,d:0.3,v:0.025,at:0.06,wet:0.3,pan});},
  yellow(p){jxBL(1320,{v:0.06,d:0.5,wet:0.35,pan:p});jxBL(1760,{v:0.05,d:0.45,at:0.06,wet:0.35,pan:p});for(let i=0;i<4;i++)jxBL(rand(2600,3600),{v:0.012,d:0.18,at:0.02+i*0.035,wet:0.2,pan:p});},
  red(p){jxOS({type:'sawtooth',f0:78,f1:150,d:0.5,v:0.1,lp:500,lp1:1500,trem:26,glide:0.45,a:0.05,pan:p});jxNZ({type:'lowpass',f0:380,f1:1000,d:0.45,v:0.07,a:0.08,q:0.8,pan:p});},
  blue(p){jxOS({f0:250,f1:1150,d:0.24,v:0.08,glide:0.18,pan:p});jxNZ({f0:700,f1:3200,d:0.32,v:0.05,q:1.6,a:0.05,pan0:p-0.3,pan1:p+0.3,wet:0.2});jxOS({f0:420,f1:900,d:0.06,v:0.03,at:0.02,pan:p});},
  glint(p){jxBL(3136,{v:0.04,d:0.32,wet:0.5,pan:p});jxOS({f0:2600,f1:4300,d:0.08,v:0.022,glide:0.06,pan:p});},
  note(n,pan,bell){const f=jxLad(n);if(bell){jxBL(f*2,{v:0.04,d:0.6,wet:0.45,pan});}else{jxOS({type:'triangle',f0:f*2,d:0.22,v:0.05,a:0.004,wet:0.3,pan});}},
  heart(p){jxTH({f0:72,f1:44,d:0.13,v:0.16,pan:p});jxTH({f0:66,f1:42,d:0.12,v:0.11,at:0.19,pan:p});},
  unravel(p){jxOS({type:'triangle',f0:900,f1:240,d:0.75,v:0.05,glide:0.7,wet:0.5,pan:p});jxNZ({type:'highpass',f0:4000,f1:1500,d:0.5,v:0.02,a:0.02,pan:p});},
  stitch(r,p){jxOS({type:'triangle',f0:500+r*800,d:0.06,v:0.03,a:0.003,pan:p});},
  revive(p){[0,2,4,7,9].forEach((s,i)=>jxBL(jxHz(72+s),{v:0.04,d:0.6,at:i*0.07,wet:0.5,pan:p}));jxOS({type:'triangle',f0:300,f1:1200,d:0.45,v:0.035,glide:0.4,wet:0.4,pan:p});},
  step(surf,h,w){if(!AUD.ready())return;const k=jxK(h)*rand(0.93,1.07),W8=(w||1)*(h&&h.kind==='potap'?1.35:h&&h.kind==='yosha'?0.7:1),pan=h?jxPan(h.pos,h.player):0;
    switch(surf){
      case 'wood':jxTH({f0:230*k,f1:120*k,d:0.07,v:0.09*W8,pan});jxNZ({f0:900*k,q:2,d:0.05,v:0.04*W8,a:0.002,pan});break;
      case 'stone':jxNZ({f0:2400*k,q:3,d:0.035,v:0.06*W8,a:0.002,pan});jxTH({f0:160*k,f1:90*k,d:0.04,v:0.05*W8,pan});break;
      case 'water':jxNZ({f0:1300*k,f1:500,d:0.12,v:0.06*W8,q:1,a:0.004,pan});jxOS({f0:500*k,f1:1200*k,d:0.05,v:0.02*W8,glide:0.04,at:0.03,pan});break;
      case 'cloud':jxNZ({type:'lowpass',f0:700*k,f1:250,d:0.13,v:0.05*W8,q:0.5,a:0.01,pan});break;
      case 'sand':jxNZ({f0:1600*k,q:1.5,d:0.08,v:0.04*W8,a:0.004,pan});break;
      default:jxNZ({type:'highpass',f0:2500*k,f1:4000*k,d:0.07,v:0.035*W8,q:0.7,a:0.004,pan});}}};
JX.snd=JXSND;

/* ---------- обёртки звуков прототипа: включено — новый звук, выключено — исходный ---------- */
JX.orig={};
function jxWrapSfx(name,feat,fresh,keepSide){const o=SFX[name];if(!o)return;JX.orig[name]=o;
  SFX[name]=function(){if(!jxOn(feat))return o.apply(this,arguments);if(keepSide)jxMuted(()=>o.apply(this,arguments));try{fresh.apply(this,arguments);}catch(e){console.error('juice sfx',name,e);}};}
const jxHeroBy=f=>{let b=null,bv=-1e9;for(const h of HEROES){const v=f(h);if(v>bv){bv=v;b=h;}}return b;};
jxWrapSfx('swish','hitsnd',()=>JXSND.swish(jxHeroBy(h=>h.atkT)));
jxWrapSfx('clink','hitsnd',()=>JXSND.clink(JX.ctxH));
jxWrapSfx('ember','hitsnd',function(){if(JX.inHit)JXSND.ember();else JX.orig.ember();});
jxWrapSfx('jump','moves',()=>JXSND.jump(jxHeroBy(h=>h.grounded?-9:h.vel.y)));
jxWrapSfx('land','moves',()=>{});                                  // приземление озвучивает animHero ниже — с поверхностью
jxWrapSfx('roll','moves',()=>JXSND.roll(jxHeroBy(h=>h.rollT)));
jxWrapSfx('shield','moves',()=>JXSND.shield(JX.ctxH),true);
jxWrapSfx('parry','moves',()=>{JXSND.parry(JX.ctxH);if(jxOn('hitstop'))G.hitstop=Math.max(G.hitstop,0.07*JX.s.hs);},true);
jxWrapSfx('hurt','hurt',()=>JXSND.hurt(JX.ctxH));
jxWrapSfx('link','ladder',()=>{const P=JX.pick;if(G.time-P.t>2.5)P.n=0;P.t=G.time;JXSND.note(P.n++,0,true);jxNZ({type:'highpass',f0:6000,d:0.25,v:0.02,a:0.01,wet:0.5});});
jxWrapSfx('nut','ladder',()=>{const P=JX.pick;if(G.time-P.t>2.5)P.n=0;P.t=G.time;JXSND.note(P.n++,0,true);});
['yellow','red','blue'].forEach(s=>jxWrapSfx(s,'sigsnd',()=>{const e=JX.ctxFoe;JXSND[s](e&&e.tgt?jxPan(e.pos,e.tgt.player):0);}));
{const _fw=foeWind;foeWind=function(e){JX.ctxFoe=e;try{return _fw.apply(this,arguments);}finally{JX.ctxFoe=null;}};}
{const _sb=shieldBlock;shieldBlock=function(h){JX.ctxH=h;try{return _sb.apply(this,arguments);}finally{JX.ctxH=null;}};}
{const _pf=parryFoe;parryFoe=function(e,h){JX.ctxH=h;try{return _pf.apply(this,arguments);}finally{JX.ctxH=null;}};}

/* ---------- частицы: спрайты-вспышки, блики, лепестки ---------- */
const JXTEX={};
function jxTex(kind){if(JXTEX[kind])return JXTEX[kind];const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');
  if(kind==='star'){x.translate(32,32);x.fillStyle='#fff';for(let i=0;i<4;i++){x.rotate(Math.PI/2);x.beginPath();x.moveTo(0,-31);x.quadraticCurveTo(3,-3,31,0);x.quadraticCurveTo(3,3,0,31);x.fill();}
    const g=x.createRadialGradient(0,0,0,0,0,14);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(-16,-16,32,32);}
  else{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.35,'rgba(255,255,255,0.8)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);}
  return JXTEX[kind]=new THREE.CanvasTexture(c);}
function jxSprite(kind,col,pos,size,life,o){o=o||{};const m=new THREE.SpriteMaterial({map:jxTex(kind),color:col,transparent:true,depthTest:false,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
  const s=new THREE.Sprite(m);s.position.copy(pos);s.scale.setScalar(0.01);s.renderOrder=10;W.group.add(s);JX.parts.push({kind:'spr',m:s,t:0,life,size,op:o.op==null?1:o.op,spin:o.spin||0,shape:o.shape||'pop'});return s;}
const JXPETAL_G=new THREE.PlaneGeometry(0.26,0.38);
function jxPetal(h){const m=new THREE.Mesh(JXPETAL_G,new THREE.MeshBasicMaterial({color:0xff9ab8,side:THREE.DoubleSide,transparent:true}));m.position.copy(h.pos).add(new V3(0,heroHeight(h)*0.9,0));m.scale.set(1.4,1.4,1.4);W.group.add(m);
  JX.parts.push({kind:'petal',m,t:0,life:3.2,v:new V3(rand(-1.6,1.6),3.6,rand(-1.6,1.6)),floor:h.pos.y+0.05,ph:rand(0,6)});}
function jxPartsTick(dt){for(let i=JX.parts.length-1;i>=0;i--){const p=JX.parts[i];p.t+=dt;const k=p.t/p.life;
    if(k>=1||!p.m.parent){if(p.m.parent)p.m.parent.remove(p.m);p.m.material.dispose();JX.parts.splice(i,1);continue;}
    if(p.kind==='spr'){const sc=p.shape==='flash'?p.size*(0.8+0.4*k):p.size*Math.sin(Math.min(1,k)*Math.PI);p.m.scale.setScalar(Math.max(0.01,sc));p.m.material.opacity=p.op*(p.shape==='flash'?1-k:1);p.m.material.rotation+=p.spin*dt;}
    else if(p.kind==='petal'){if(p.m.position.y>p.floor){p.v.y-=5.5*dt;p.v.multiplyScalar(1-1.6*dt);p.v.y=Math.max(p.v.y,-1.2);p.m.position.addScaledVector(p.v,dt);p.m.position.x+=Math.sin(p.t*7+p.ph)*0.6*dt;p.m.rotation.set(Math.sin(p.t*5+p.ph)*1.2,p.t*3,Math.cos(p.t*4)*0.8);}
      else{p.m.position.y=p.floor;p.m.rotation.x=-Math.PI/2;}if(k>0.75)p.m.material.opacity=1-(k-0.75)/0.25;}}}

/* ---------- удар по мороку: hit-stop, вспышка, проседание, звук, лесенка ---------- */
{const _eh=enemyHit;enemyHit=function(e,h,air){if(!e||!JX.on){return _eh.apply(this,arguments);}
  const emb=e.embers,alive=e.alive,sh=e.shell?Object.values(e.shell).filter(Boolean).length:0;JX.ctxH=h;JX.inHit=true;let r;
  try{r=_eh.apply(this,arguments);}finally{JX.inHit=false;JX.ctxH=null;}
  try{const sh2=e.shell?Object.values(e.shell).filter(Boolean).length:0;const kill=alive&&!e.alive,open=e.embers<emb,plate=sh2<sh;
    const kind=kill?'kill':plate?'plate':open?'open':'closed';if(!h)return r;
    if(jxOn('hitstop'))G.hitstop=Math.max(G.hitstop,({open:0.05,plate:0.09,kill:0,closed:0.02})[kind]*JX.s.hs);
    if(jxOn('hitflash')){e._sqT=0;e._sqA=kind==='closed'?0.08:kind==='open'?0.2:0.28;if(kind!=='closed'&&jxFl()>0){const top=(e.L&&e.L.top||1.4)*(e.s||1);jxSprite('dot',0xffffff,e.pos.clone().add(new V3(0,top*0.5,0)),e.r*3.4*(0.6+0.4*jxFl()),0.1,{op:0.9*jxFl(),shape:'flash'});}}
    if(jxOn('hitsnd')&&kind!=='closed')JXSND.hit(h,kind!=='open');
    if(jxOn('ladder')&&kind!=='closed'){const C=JX.combo[h.player];if(G.time-C.t>1.6)C.n=0;C.t=G.time;JXSND.note(C.n++,jxPan(e.pos,h.player));}}catch(err){console.error('juice hit',err);}
  return r;};}

/* ---------- урон по герою: кромка экрана, лепесток, «ой», приседание музыки ---------- */
const JXV={};{const css='position:fixed;top:0;bottom:0;pointer-events:none;opacity:0;z-index:40;background:radial-gradient(ellipse at center,rgba(255,120,160,0) 52%,rgba(255,110,150,0.62) 100%)';
  for(const [k,l,w] of [['full',0,100],['l',0,50],['r',50,50]]){const d=document.createElement('div');d.style.cssText=css+';left:'+l+'%;width:'+w+'%';document.body.appendChild(d);JXV[k]={el:d,a:0};}}
{const _dh=damageHero;damageHero=function(h,src){JX.ctxH=h;let ok;try{ok=_dh.apply(this,arguments);}finally{JX.ctxH=null;}
  if(ok&&jxOn('hurt')){try{const split=PANES.length>1,v=split?(h.player===1?JXV.r:JXV.l):JXV.full;v.a=0.9*jxFl();if(!W.noPetals)jxPetal(h);JX.duckT=0.35;}catch(e){console.error(e);}}
  return ok;};}
// музыка приседает на миг: JX.duckT читает микшер (late_91c_juice_world.js, шина музыки).

/* ---------- телеграфы: блик перед ударом, нить и кольцо цели ---------- */
const JXTGT_G={ring:new THREE.RingGeometry(0.55,0.74,32),line:new THREE.BoxGeometry(0.07,0.03,1)};JXTGT_G.ring.rotateX(-Math.PI/2);
function jxTarget(e){if(e._jt)return e._jt;const mr=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.8,depthWrite:false,fog:false}),ml=mr.clone();
  const ring=new THREE.Mesh(JXTGT_G.ring,mr),line=new THREE.Mesh(JXTGT_G.line,ml);ring.renderOrder=line.renderOrder=6;W.group.add(ring);W.group.add(line);return e._jt={ring,line};}
{const _uf=updateFoe;updateFoe=function(e,dt){const r=_uf.apply(this,arguments);try{jxFoe(e,dt);}catch(err){console.error('juice foe',err);}return r;};}
function jxFoe(e,dt){const w=e.alive&&e.state==='wind'&&e.tgt;
  // проседание после удара
  if(e._sqA&&e.body){e._sqT=(e._sqT||0)+dt;const s=e._sqA*Math.exp(-e._sqT*16)*Math.cos(e._sqT*38);if(e._sqT>0.5)e._sqA=0;else e.body.scale.multiply(new V3(1+s*0.6,1-s,1+s*0.6));}
  // блик за 0,15 с до удара
  if(!w)e._gl=false;
  if(w&&!e._gl&&jxOn('glint')){const left=(e.wdur-e.t)/(e.slow||1);if(left<=0.17){e._gl=true;const top=(e.L&&e.L.top||1.4)*(e.s||1),f=new V3(Math.sin(e.face),0,Math.cos(e.face));
      jxSprite('star',e.sig==='red'?0xffd0c0:e.sig==='blue'?0xd8ecff:0xfff6c0,e.pos.clone().add(new V3(0,top*0.78,0)).addScaledVector(f,e.r*0.6),(e.big?2.4:1.5)*(0.6+0.4*Math.max(0.5,jxFl())),0.22,{spin:6});JXSND.glint(jxPan(e.pos,e.tgt.player));}}
  // чья цель
  const T=e._jt;if(!(w&&jxOn('target'))){if(T){T.ring.visible=false;T.line.visible=false;}return;}
  const t=jxTarget(e),h=e.tgt,col=h.player===1?COL.p2:COL.p1,k=clamp(e.t/e.wdur,0,1);t.ring.visible=t.line.visible=true;
  t.ring.material.color.setHex(col);t.line.material.color.setHex(col);t.ring.position.set(h.pos.x,h.pos.y+0.07,h.pos.z);t.ring.scale.setScalar(1.25-0.35*k+0.06*Math.sin(G.time*20));t.ring.material.opacity=0.55+0.4*k;
  const a=new V3(e.pos.x,e.pos.y+0.12,e.pos.z),b=new V3(h.pos.x,h.pos.y+0.12,h.pos.z),d=a.distanceTo(b);t.line.position.copy(a).lerp(b,0.5);t.line.lookAt(b);t.line.scale.set(1,1,Math.max(0.01,d-0.7));t.line.material.opacity=0.35+0.45*k;}

/* ---------- герои: приземление (с поверхностью) ---------- */
JX.surf=h=>{if(h.groundRef)return 'wood';return ({1:'grass',2:'sand',3:'cloud',4:'stone',5:'grass'})[W.world]||'grass';};
{const _a=animHero;animHero=function(h,dt){_a(h,dt);try{jxHero(h,dt||0);}catch(e){console.error('juice hero',e);}};}
function jxHero(h,dt){const play=G.state==='play'&&!G.cine&&h.body&&h.body.visible!==false;
  if(play&&jxOn('moves')&&h._jG===false&&h.grounded&&(h._jVy||0)<-4)JXSND.land(h,clamp(-(h._jVy)/12,0.35,1.2),JX.surf(h));
  h._jG=h.grounded;h._jVy=h.vel.y;}

/* ---------- кадр: частицы, кромка, сердцебиение, клубок ---------- */
{const _st=step;step=function(dt){_st(dt);try{jxTick(dt);}catch(e){console.error('juice tick',e);}};}
function jxTick(dt){jxPartsTick(dt);JX.duckT=Math.max(0,JX.duckT-dt);
  for(const k in JXV){const v=JXV[k];if(v.a>0){v.a=Math.max(0,v.a-dt*1.6);}v.el.style.opacity=v.a.toFixed(3);}
  // последний лепесток
  for(const pi of [0,1]){const p=players[pi],E=hudEls[pi];if(!E)continue;const el=E.petals[0];
    const low=jxOn('lowpetal')&&G.state==='play'&&!G.cine&&p.petals===1&&!p.downed&&!W.noLose&&!W.noPetals&&!(G.solo&&pi===1);
    if(!low){if(p._jHB){p._jHB=0;p._jHBn=-1;el.style.transform='';el.style.filter='';}continue;}
    if(!p._jHB)p._jHB=1.149;p._jHB+=dt;const ph=p._jHB%1.15,nb=Math.floor(p._jHB/1.15);if(nb!==p._jHBn){p._jHBn=nb;JXSND.heart(PANES.length>1?(pi?0.45:-0.45):0);}
    const beat=Math.max(Math.exp(-ph*14),0.7*Math.exp(-Math.max(0,ph-0.19)*14)*(ph>0.19?1:0));el.style.transform='scale('+(1+0.35*beat).toFixed(3)+') rotate('+(Math.sin(G.time*18)*6*beat).toFixed(1)+'deg)';el.style.filter='drop-shadow(0 0 '+(8*beat).toFixed(1)+'px #ff6a9a)';}
  // клубок: распустился, сшивается, сшит
  for(const h of HEROES){const p=players[h.player];const down=!!h._down||(p.downed&&active(h.player)===h);const rev=h._down?(h._down.rev||0):(p.downed&&active(h.player)===h?p.revT:0);
    const pan=jxPan(h.pos,h.player),pos=h.pos.clone().add(new V3(0,0.6,0));
    if(down&&!h._jDown&&jxOn('clew')){JXSND.unravel(pan);if(FIN.fx){FIN.fx.dust(h.pos.clone(),14,h.player?COL.p2:COL.p1,1.2);FIN.fx.sparkle(pos,8,0xffffff);}ringFx(h.pos,h.player?COL.p2:COL.p1,2.2);}
    if(down&&jxOn('clew')&&rev>(h._jRev||0)+0.001){h._jSt=(h._jSt||0)+dt;if(h._jSt>0.12){h._jSt=0;JXSND.stitch(rev,pan);if(FIN.fx)FIN.fx.sparkle(pos,3,0xfff2b0);}}
    if(!down&&h._jDown&&jxOn('clew')){if((h._jRev||0)>0.6){JXSND.revive(pan);if(FIN.fx){FIN.fx.stars(pos,10,0xffd76a);FIN.fx.sparkle(pos,14,0xffffff);}ringFx(h.pos,COL.gold,2.6);}}
    h._jDown=down;h._jRev=rev;}}
