/* ============================== ПОЛИГОН · ЗАХОД 1: ОЩУЩЕНИЕ БОЯ, ТЕЛЕГРАФЫ, УРОН (docs/23_vfx_sfx.md) ==============================
// Итоги захода 1: всё принято, кроме шагов по поверхностям (шумно от четырёх героев) — шаги убраны; приземление осталось.
// Панель общая для заходов: заход 2 (sb_30_juice2.js) добавляет свои предложения в JU.feats (группа 2) и разделы в JU.ext. */
// Только для сборки --sandbox. Каждое предложение — свой флажок (JU.f), всё вместе — JU.all (клавиша Ё / `).
// Выключено — игра звучит и выглядит как в релизе: обёртки зовут исходные функции.
const JU={all:true,f:{},s:{hs:1,vol:1,fx:1},r:{},parts:[],ext:[],round:1,combo:[{n:0,t:-9},{n:0,t:-9}],pick:{n:0,t:-9},ctxH:null,inHit:false,muteTone:false,duckT:0,
  feats:[
    ['hitstop','2.1','Hit-stop на каждом попадании','обычное попадание — 50 мс, кора отлетела — 90 мс, отбив — 70 мс'],
    ['hitsnd','2.2','Слоистый звук удара','взмах + контакт + хвост; у каждого героя свой «вес», разброс высоты'],
    ['hitflash','2.3','Вспышка и «проседание» морока','белая вспышка 1–2 кадра, морок сжимается и пружинит'],
    ['ladder','2.4','Лесенка нот','серия ударов и звенья подряд — каждый раз на ступень выше по ладу мира'],
    ['sigsnd','3.1','Свой звук каждого сигнала','жёлтый — бубенец, красный — рык вверх, синий — «бульк-вжух»'],
    ['glint','3.2','Блик перед ударом','за 0,15 с до удара — звёздочка и «дзинь»'],
    ['target','3.3','Чья цель','нить от морока и кольцо под героем — цветом игрока'],
    ['moves','доп.','Звуки движений','прыжок, приземление, кувырок, щит, отбив — слоями, у героев разные'],
    ['hurt','4.1','Удар по герою','кромка экрана, лепесток слетает, мягкое «ой», музыка приседает'],
    ['lowpetal','4.2','Последний лепесток','тихое сердцебиение, лепесток в HUD вздрагивает'],
    ['clew','4.3','Клубок распускается и сшивается','нить, искры, глиссандо гуслей вниз и вверх']]};
FIN.ju=JU;JU.feats.forEach(f=>{JU.f[f[0]]=true;f[4]=1;});   // f[4] — номер захода
JU.load=()=>{try{const o=JSON.parse(localStorage.getItem('zc_sandbox_v2')||'null');if(o){Object.assign(JU.f,o.f||{});Object.assign(JU.s,o.s||{});Object.assign(JU.r,o.r||{});if(o.all===false)JU.all=false;}}catch(e){}};
JU.save=()=>{try{localStorage.setItem('zc_sandbox_v2',JSON.stringify({f:JU.f,s:JU.s,r:JU.r,all:JU.all}));}catch(e){}};
const juOn=k=>JU.all&&!!JU.f[k];
const juV=v=>v*JU.s.vol;
const JKIND={potap:0.72,proshka:1,pelageya:1.12,yosha:1.32};
const juK=h=>(h&&JKIND[h.kind])||1;
// панорама: где источник на экране (в раздельном — ещё и чья половина)
function juPan(pos,pi){try{if(!pos||!PANES.length)return 0;const n=PANES.length,P=n>1?PANES[pi===1?1:0]:PANES[0];const v=pos.clone().project(P.cam);let x=clamp(v.x,-1,1)*0.55;if(n>1)x=x*0.5+(pi===1?0.4:-0.4);return clamp(x,-0.9,0.9);}catch(e){return 0;}}
// тон прототипа можно заглушить на время вызова исходного звука (чтобы сохранить его побочные действия)
{const _tone=tone;tone=function(){if(JU.muteTone)return;return _tone.apply(this,arguments);};}
const juMuted=fn=>{JU.muteTone=true;try{return fn();}finally{JU.muteTone=false;}};

/* ---------- звуки ---------- */
const juNZ=o=>{o.v=juV(o.v||0.1);AUD.nz(o);},juOS=o=>{o.v=juV(o.v||0.1);AUD.osc(o);},juBL=(f,o)=>{o=o||{};o.v=juV(o.v||0.08);AUD.bell(f,o);},juTH=o=>{o.v=juV(o.v||0.3);AUD.osc({f0:o.f0||130,f1:o.f1||42,d:o.d||0.3,v:o.v,a:0.004,at:o.at,pan:o.pan});};
const juHz=m=>440*Math.pow(2,(m-69)/12);
const JLAD_MODE={dor:[0,2,3,5,7,9,10],aeo:[0,2,3,5,7,8,10],lyd:[0,2,4,6,7,9,11],phr:[0,1,3,5,7,8,10],mix:[0,2,4,5,7,9,10]};
const JLAD_W={1:[57,'dor'],2:[52,'aeo'],3:[53,'lyd'],4:[52,'phr'],5:[50,'mix'],0:[55,'mix']};
function ladHz(n){const L=JLAD_W[W.world]||JLAD_W[0],m=JLAD_MODE[L[1]];n=Math.min(n,13);return juHz(L[0]+12+m[n%7]+12*Math.floor(n/7));}
const JSND={
  swish(h){const k=juK(h),r=rand(0.94,1.06)*k,pan=h?juPan(h.pos,h.player):0;juNZ({f0:380*r,f1:2600*r,f2:620*r,d:k<0.8?0.26:k>1.2?0.15:0.2,q:1.4,v:0.11*(k<0.8?1.2:1),a:0.02,pan0:pan-0.15,pan1:pan+0.15,wet:0.12});
    if(k<0.8)juOS({type:'triangle',f0:110,f1:70,d:0.2,v:0.04,pan});},
  hit(h,heavy){const k=juK(h),r=rand(0.95,1.05),pan=h?juPan(h.pos,h.player):0,H=heavy?1.35:1;
    juNZ({type:'highpass',f0:3200*r,d:0.035,v:0.12*H,a:0.002,q:0.7});                                 // контакт — щелчок
    if(h&&h.kind==='potap'){juTH({f0:150*r,f1:45,d:0.24,v:0.36*H,pan});juNZ({type:'lowpass',f0:900,f1:200,d:0.16,v:0.12*H,a:0.003,pan});}
    else if(h&&h.kind==='pelageya'){juOS({type:'triangle',f0:320*r,f1:170,d:0.09,v:0.1*H,pan});juBL(1568*r,{v:0.05*H,d:0.45,wet:0.45,pan});}
    else if(h&&h.kind==='yosha'){juOS({f0:950*r,f1:480,d:0.08,v:0.1*H,glide:0.07,pan});juNZ({type:'highpass',f0:5200,d:0.18,v:0.03*H,a:0.01,wet:0.4,pan});}
    else{juOS({type:'triangle',f0:300*r,f1:140,d:0.1,v:0.14*H,pan});juNZ({f0:1300*r,f1:500,d:0.09,v:0.1*H,q:1.1,pan});}
    juNZ({type:'lowpass',f0:1800,f1:300,d:0.3,v:0.025*H,a:0.01,wet:0.6});},                          // хвост в реверберацию
  ember(){juNZ({type:'highpass',f0:2400,f1:900,d:0.22,v:0.035,a:0.004,q:0.8});juOS({f0:520,f1:300,d:0.14,v:0.03});},
  clink(h){const r=rand(0.96,1.04),pan=h?juPan(h.pos,h.player):0;juOS({type:'square',f0:1050*r,f1:880*r,d:0.06,v:0.035,lp:3000,pan});juBL(2200*r,{v:0.03,d:0.28,wet:0.3,pan});juNZ({f0:3000,q:4,d:0.05,v:0.06,a:0.002,pan});},
  jump(h){const k=juK(h),pan=h?juPan(h.pos,h.player):0;juNZ({f0:500*k,f1:2200*k,d:0.13,v:0.05,q:1.2,pan});juOS({type:'triangle',f0:280*k,f1:520*k,d:0.11,v:0.045,glide:0.1,pan});},
  land(h,w,surf){const k=juK(h),pan=h?juPan(h.pos,h.player):0;juTH({f0:130/k,f1:48,d:0.15,v:0.2*w*(k<0.8?1.4:1),pan});JSND.step(surf,h,1.6*w);},
  roll(h){const pan=h?juPan(h.pos,h.player):0;juNZ({type:'lowpass',f0:1600,f1:380,d:0.26,v:0.1,a:0.02,q:0.6,pan});juTH({f0:110,f1:60,d:0.1,v:0.1,at:0.14,pan});},
  shield(h){const pan=h?juPan(h.pos,h.player):0;juTH({f0:210,f1:90,d:0.13,v:0.24,pan});juNZ({f0:900,q:2,d:0.1,v:0.12,a:0.002,pan});juOS({type:'square',f0:420,f1:300,d:0.08,v:0.03,lp:1200,pan});},
  parry(h){const pan=h?juPan(h.pos,h.player):0;juBL(1568,{v:0.075,d:0.95,wet:0.55,pan});juBL(2349,{v:0.045,d:0.7,at:0.012,wet:0.55,pan});juNZ({type:'highpass',f0:5200,d:0.28,v:0.05,a:0.004,wet:0.4,pan});juTH({f0:190,f1:60,d:0.16,v:0.16,pan});},
  hurt(h){const pan=h?juPan(h.pos,h.player):0,f={potap:230,proshka:420,pelageya:520,yosha:600}[h&&h.kind]||420;
    juNZ({type:'lowpass',f0:900,f1:200,d:0.26,v:0.13,a:0.006,q:0.6,pan});                           // мягкое «пух»
    juOS({type:'sawtooth',f0:f,f1:f*0.68,d:0.24,v:0.045,lp:1500,lp1:650,glide:0.2,vib:0.012,vibF:9,a:0.02,pan});   // «ой»
    juOS({type:'triangle',f0:f*1.5,f1:f,d:0.3,v:0.025,at:0.06,wet:0.3,pan});},
  yellow(p){juBL(1320,{v:0.06,d:0.5,wet:0.35,pan:p});juBL(1760,{v:0.05,d:0.45,at:0.06,wet:0.35,pan:p});for(let i=0;i<4;i++)juBL(rand(2600,3600),{v:0.012,d:0.18,at:0.02+i*0.035,wet:0.2,pan:p});},
  red(p){juOS({type:'sawtooth',f0:78,f1:150,d:0.5,v:0.1,lp:500,lp1:1500,trem:26,glide:0.45,a:0.05,pan:p});juNZ({type:'lowpass',f0:380,f1:1000,d:0.45,v:0.07,a:0.08,q:0.8,pan:p});},
  blue(p){juOS({f0:250,f1:1150,d:0.24,v:0.08,glide:0.18,pan:p});juNZ({f0:700,f1:3200,d:0.32,v:0.05,q:1.6,a:0.05,pan0:p-0.3,pan1:p+0.3,wet:0.2});juOS({f0:420,f1:900,d:0.06,v:0.03,at:0.02,pan:p});},
  glint(p){juBL(3136,{v:0.04,d:0.32,wet:0.5,pan:p});juOS({f0:2600,f1:4300,d:0.08,v:0.022,glide:0.06,pan:p});},
  note(n,pan,bell){const f=ladHz(n);if(bell){juBL(f*2,{v:0.04,d:0.6,wet:0.45,pan});}else{juOS({type:'triangle',f0:f*2,d:0.22,v:0.05,a:0.004,wet:0.3,pan});}},
  heart(p){juTH({f0:72,f1:44,d:0.13,v:0.16,pan:p});juTH({f0:66,f1:42,d:0.12,v:0.11,at:0.19,pan:p});},
  unravel(p){juOS({type:'triangle',f0:900,f1:240,d:0.75,v:0.05,glide:0.7,wet:0.5,pan:p});juNZ({type:'highpass',f0:4000,f1:1500,d:0.5,v:0.02,a:0.02,pan:p});},
  stitch(r,p){juOS({type:'triangle',f0:500+r*800,d:0.06,v:0.03,a:0.003,pan:p});},
  revive(p){[0,2,4,7,9].forEach((s,i)=>juBL(juHz(72+s),{v:0.04,d:0.6,at:i*0.07,wet:0.5,pan:p}));juOS({type:'triangle',f0:300,f1:1200,d:0.45,v:0.035,glide:0.4,wet:0.4,pan:p});},
  step(surf,h,w){if(!AUD.ready())return;const k=juK(h)*rand(0.93,1.07),W8=(w||1)*(h&&h.kind==='potap'?1.35:h&&h.kind==='yosha'?0.7:1),pan=h?juPan(h.pos,h.player):0;
    switch(surf){
      case 'wood':juTH({f0:230*k,f1:120*k,d:0.07,v:0.09*W8,pan});juNZ({f0:900*k,q:2,d:0.05,v:0.04*W8,a:0.002,pan});break;
      case 'stone':juNZ({f0:2400*k,q:3,d:0.035,v:0.06*W8,a:0.002,pan});juTH({f0:160*k,f1:90*k,d:0.04,v:0.05*W8,pan});break;
      case 'water':juNZ({f0:1300*k,f1:500,d:0.12,v:0.06*W8,q:1,a:0.004,pan});juOS({f0:500*k,f1:1200*k,d:0.05,v:0.02*W8,glide:0.04,at:0.03,pan});break;
      case 'cloud':juNZ({type:'lowpass',f0:700*k,f1:250,d:0.13,v:0.05*W8,q:0.5,a:0.01,pan});break;
      case 'sand':juNZ({f0:1600*k,q:1.5,d:0.08,v:0.04*W8,a:0.004,pan});break;
      default:juNZ({type:'highpass',f0:2500*k,f1:4000*k,d:0.07,v:0.035*W8,q:0.7,a:0.004,pan});}}};
JU.snd=JSND;

/* ---------- обёртки звуков прототипа: включено — новый звук, выключено — исходный ---------- */
JU.orig={};
function juWrapSfx(name,feat,fresh,keepSide){const o=SFX[name];if(!o)return;JU.orig[name]=o;
  SFX[name]=function(){if(!juOn(feat))return o.apply(this,arguments);if(keepSide)juMuted(()=>o.apply(this,arguments));try{fresh.apply(this,arguments);}catch(e){console.error('sandbox sfx',name,e);}};}
const juHeroBy=f=>{let b=null,bv=-1e9;for(const h of HEROES){const v=f(h);if(v>bv){bv=v;b=h;}}return b;};
juWrapSfx('swish','hitsnd',()=>JSND.swish(juHeroBy(h=>h.atkT)));
juWrapSfx('clink','hitsnd',()=>JSND.clink(JU.ctxH));
juWrapSfx('ember','hitsnd',function(){if(JU.inHit)JSND.ember();else JU.orig.ember();});
juWrapSfx('jump','moves',()=>JSND.jump(juHeroBy(h=>h.grounded?-9:h.vel.y)));
juWrapSfx('land','moves',()=>{});                                  // приземление озвучивает animHero ниже — с поверхностью
juWrapSfx('roll','moves',()=>JSND.roll(juHeroBy(h=>h.rollT)));
juWrapSfx('shield','moves',()=>JSND.shield(JU.ctxH),true);
juWrapSfx('parry','moves',()=>{JSND.parry(JU.ctxH);if(juOn('hitstop'))G.hitstop=Math.max(G.hitstop,0.07*JU.s.hs);},true);
juWrapSfx('hurt','hurt',()=>JSND.hurt(JU.ctxH));
juWrapSfx('link','ladder',()=>{const P=JU.pick;if(G.time-P.t>2.5)P.n=0;P.t=G.time;JSND.note(P.n++,0,true);juNZ({type:'highpass',f0:6000,d:0.25,v:0.02,a:0.01,wet:0.5});});
juWrapSfx('nut','ladder',()=>{const P=JU.pick;if(G.time-P.t>2.5)P.n=0;P.t=G.time;JSND.note(P.n++,0,true);});
['yellow','red','blue'].forEach(s=>juWrapSfx(s,'sigsnd',()=>{const e=JU.ctxFoe;JSND[s](e&&e.tgt?juPan(e.pos,e.tgt.player):0);}));
{const _fw=foeWind;foeWind=function(e){JU.ctxFoe=e;try{return _fw.apply(this,arguments);}finally{JU.ctxFoe=null;}};}
{const _sb=shieldBlock;shieldBlock=function(h){JU.ctxH=h;try{return _sb.apply(this,arguments);}finally{JU.ctxH=null;}};}
{const _pf=parryFoe;parryFoe=function(e,h){JU.ctxH=h;try{return _pf.apply(this,arguments);}finally{JU.ctxH=null;}};}

/* ---------- частицы полигона: спрайты-вспышки, блики, лепестки ---------- */
const JTEX={};
function juTex(kind){if(JTEX[kind])return JTEX[kind];const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');
  if(kind==='star'){x.translate(32,32);x.fillStyle='#fff';for(let i=0;i<4;i++){x.rotate(Math.PI/2);x.beginPath();x.moveTo(0,-31);x.quadraticCurveTo(3,-3,31,0);x.quadraticCurveTo(3,3,0,31);x.fill();}
    const g=x.createRadialGradient(0,0,0,0,0,14);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(-16,-16,32,32);}
  else{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.35,'rgba(255,255,255,0.8)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);}
  return JTEX[kind]=new THREE.CanvasTexture(c);}
function juSprite(kind,col,pos,size,life,o){o=o||{};const m=new THREE.SpriteMaterial({map:juTex(kind),color:col,transparent:true,depthTest:false,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
  const s=new THREE.Sprite(m);s.position.copy(pos);s.scale.setScalar(0.01);s.renderOrder=10;W.group.add(s);JU.parts.push({kind:'spr',m:s,t:0,life,size,op:o.op==null?1:o.op,spin:o.spin||0,shape:o.shape||'pop'});return s;}
const JPETAL_G=new THREE.PlaneGeometry(0.26,0.38);
function juPetal(h){const m=new THREE.Mesh(JPETAL_G,new THREE.MeshBasicMaterial({color:0xff9ab8,side:THREE.DoubleSide,transparent:true}));m.position.copy(h.pos).add(new V3(0,heroHeight(h)*0.9,0));m.scale.set(1.4,1.4,1.4);W.group.add(m);
  JU.parts.push({kind:'petal',m,t:0,life:3.2,v:new V3(rand(-1.6,1.6),3.6,rand(-1.6,1.6)),floor:h.pos.y+0.05,ph:rand(0,6)});}
function juPartsTick(dt){for(let i=JU.parts.length-1;i>=0;i--){const p=JU.parts[i];p.t+=dt;const k=p.t/p.life;
    if(k>=1||!p.m.parent){if(p.m.parent)p.m.parent.remove(p.m);p.m.material.dispose();JU.parts.splice(i,1);continue;}
    if(p.kind==='spr'){const sc=p.shape==='flash'?p.size*(0.8+0.4*k):p.size*Math.sin(Math.min(1,k)*Math.PI);p.m.scale.setScalar(Math.max(0.01,sc));p.m.material.opacity=p.op*(p.shape==='flash'?1-k:1);p.m.material.rotation+=p.spin*dt;}
    else if(p.kind==='petal'){if(p.m.position.y>p.floor){p.v.y-=5.5*dt;p.v.multiplyScalar(1-1.6*dt);p.v.y=Math.max(p.v.y,-1.2);p.m.position.addScaledVector(p.v,dt);p.m.position.x+=Math.sin(p.t*7+p.ph)*0.6*dt;p.m.rotation.set(Math.sin(p.t*5+p.ph)*1.2,p.t*3,Math.cos(p.t*4)*0.8);}
      else{p.m.position.y=p.floor;p.m.rotation.x=-Math.PI/2;}if(k>0.75)p.m.material.opacity=1-(k-0.75)/0.25;}}}

/* ---------- удар по мороку: hit-stop, вспышка, проседание, звук, лесенка ---------- */
{const _eh=enemyHit;enemyHit=function(e,h,air){if(!e||!JU.all){return _eh.apply(this,arguments);}
  const emb=e.embers,alive=e.alive,sh=e.shell?Object.values(e.shell).filter(Boolean).length:0;JU.ctxH=h;JU.inHit=true;let r;
  try{r=_eh.apply(this,arguments);}finally{JU.inHit=false;JU.ctxH=null;}
  try{const sh2=e.shell?Object.values(e.shell).filter(Boolean).length:0;const kill=alive&&!e.alive,open=e.embers<emb,plate=sh2<sh;
    const kind=kill?'kill':plate?'plate':open?'open':'closed';if(!h)return r;
    if(juOn('hitstop'))G.hitstop=Math.max(G.hitstop,({open:0.05,plate:0.09,kill:0,closed:0.02})[kind]*JU.s.hs);
    if(juOn('hitflash')){e._sqT=0;e._sqA=kind==='closed'?0.08:kind==='open'?0.2:0.28;if(kind!=='closed'){const top=(e.L&&e.L.top||1.4)*(e.s||1);juSprite('dot',0xffffff,e.pos.clone().add(new V3(0,top*0.5,0)),e.r*3.4*(0.6+0.4*JU.s.fx),0.1,{op:0.9*JU.s.fx,shape:'flash'});}}
    if(juOn('hitsnd')&&kind!=='closed')JSND.hit(h,kind!=='open');
    if(juOn('ladder')&&kind!=='closed'){const C=JU.combo[h.player];if(G.time-C.t>1.6)C.n=0;C.t=G.time;JSND.note(C.n++,juPan(e.pos,h.player));}}catch(err){console.error('sandbox hit',err);}
  return r;};}

/* ---------- урон по герою: кромка экрана, лепесток, «ой», приседание музыки ---------- */
const JV={};{const css='position:fixed;top:0;bottom:0;pointer-events:none;opacity:0;z-index:40;background:radial-gradient(ellipse at center,rgba(255,120,160,0) 52%,rgba(255,110,150,0.62) 100%)';
  for(const [k,l,w] of [['full',0,100],['l',0,50],['r',50,50]]){const d=document.createElement('div');d.style.cssText=css+';left:'+l+'%;width:'+w+'%';document.body.appendChild(d);JV[k]={el:d,a:0};}}
{const _dh=damageHero;damageHero=function(h,src){JU.ctxH=h;let ok;try{ok=_dh.apply(this,arguments);}finally{JU.ctxH=null;}
  if(ok&&juOn('hurt')){try{const split=PANES.length>1,v=split?(h.player===1?JV.r:JV.l):JV.full;v.a=0.9*JU.s.fx;juPetal(h);JU.duckT=0.35;}catch(e){console.error(e);}}
  return ok;};}
// музыка приседает на миг: JU.duckT читает микшер (sb_30_juice2.js, шина музыки). Прежняя подмена FIN.voxDuck не действовала —
// это свойство только для чтения (late_91_voice.js).

/* ---------- телеграфы: блик перед ударом, нить и кольцо цели ---------- */
const JTGT_G={ring:new THREE.RingGeometry(0.55,0.74,32),line:new THREE.BoxGeometry(0.07,0.03,1)};JTGT_G.ring.rotateX(-Math.PI/2);
function juTarget(e){if(e._jt)return e._jt;const mr=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.8,depthWrite:false,fog:false}),ml=mr.clone();
  const ring=new THREE.Mesh(JTGT_G.ring,mr),line=new THREE.Mesh(JTGT_G.line,ml);ring.renderOrder=line.renderOrder=6;W.group.add(ring);W.group.add(line);return e._jt={ring,line};}
{const _uf=updateFoe;updateFoe=function(e,dt){const r=_uf.apply(this,arguments);try{juFoe(e,dt);}catch(err){console.error('sandbox foe',err);}return r;};}
function juFoe(e,dt){const w=e.alive&&e.state==='wind'&&e.tgt;
  // проседание после удара
  if(e._sqA&&e.body){e._sqT=(e._sqT||0)+dt;const s=e._sqA*Math.exp(-e._sqT*16)*Math.cos(e._sqT*38);if(e._sqT>0.5)e._sqA=0;else e.body.scale.multiply(new V3(1+s*0.6,1-s,1+s*0.6));}
  // блик за 0,15 с до удара
  if(!w)e._gl=false;
  if(w&&!e._gl&&juOn('glint')){const left=(e.wdur-e.t)/(e.slow||1);if(left<=0.17){e._gl=true;const top=(e.L&&e.L.top||1.4)*(e.s||1),f=new V3(Math.sin(e.face),0,Math.cos(e.face));
      juSprite('star',e.sig==='red'?0xffd0c0:e.sig==='blue'?0xd8ecff:0xfff6c0,e.pos.clone().add(new V3(0,top*0.78,0)).addScaledVector(f,e.r*0.6),(e.big?2.4:1.5)*(0.6+0.4*JU.s.fx),0.22,{spin:6});JSND.glint(juPan(e.pos,e.tgt.player));}}
  // чья цель
  const T=e._jt;if(!(w&&juOn('target'))){if(T){T.ring.visible=false;T.line.visible=false;}return;}
  const t=juTarget(e),h=e.tgt,col=h.player===1?COL.p2:COL.p1,k=clamp(e.t/e.wdur,0,1);t.ring.visible=t.line.visible=true;
  t.ring.material.color.setHex(col);t.line.material.color.setHex(col);t.ring.position.set(h.pos.x,h.pos.y+0.07,h.pos.z);t.ring.scale.setScalar(1.25-0.35*k+0.06*Math.sin(G.time*20));t.ring.material.opacity=0.55+0.4*k;
  const a=new V3(e.pos.x,e.pos.y+0.12,e.pos.z),b=new V3(h.pos.x,h.pos.y+0.12,h.pos.z),d=a.distanceTo(b);t.line.position.copy(a).lerp(b,0.5);t.line.lookAt(b);t.line.scale.set(1,1,Math.max(0.01,d-0.7));t.line.material.opacity=0.35+0.45*k;}

/* ---------- герои: приземление (с поверхностью) ---------- */
JU.surf=h=>{if(W.sbSurf){const s=W.sbSurf(h.pos.x,h.pos.z);if(s)return s;}if(h.groundRef)return 'wood';return ({1:'grass',2:'sand',3:'cloud',4:'stone',5:'grass'})[W.world]||'grass';};
{const _a=animHero;animHero=function(h,dt){_a(h,dt);try{juHero(h,dt||0);}catch(e){console.error('sandbox hero',e);}};}
function juHero(h,dt){const play=G.state==='play'&&!G.cine&&h.body&&h.body.visible!==false;
  if(play&&juOn('moves')&&h._jG===false&&h.grounded&&(h._jVy||0)<-4)JSND.land(h,clamp(-(h._jVy)/12,0.35,1.2),JU.surf(h));
  h._jG=h.grounded;h._jVy=h.vel.y;}

/* ---------- кадр: частицы, кромка, сердцебиение, клубок ---------- */
{const _st=step;step=function(dt){_st(dt);try{juTick(dt);}catch(e){console.error('sandbox tick',e);}};}
function juTick(dt){juPartsTick(dt);JU.duckT=Math.max(0,JU.duckT-dt);
  for(const k in JV){const v=JV[k];if(v.a>0){v.a=Math.max(0,v.a-dt*1.6);}v.el.style.opacity=v.a.toFixed(3);}
  // последний лепесток
  for(const pi of [0,1]){const p=players[pi],E=hudEls[pi];if(!E)continue;const el=E.petals[0];
    const low=juOn('lowpetal')&&G.state==='play'&&!G.cine&&p.petals===1&&!p.downed&&!(G.solo&&pi===1);
    if(!low){if(p._jHB){p._jHB=0;p._jHBn=-1;el.style.transform='';el.style.filter='';}continue;}
    if(!p._jHB)p._jHB=1.149;p._jHB+=dt;const ph=p._jHB%1.15,nb=Math.floor(p._jHB/1.15);if(nb!==p._jHBn){p._jHBn=nb;JSND.heart(PANES.length>1?(pi?0.45:-0.45):0);}
    const beat=Math.max(Math.exp(-ph*14),0.7*Math.exp(-Math.max(0,ph-0.19)*14)*(ph>0.19?1:0));el.style.transform='scale('+(1+0.35*beat).toFixed(3)+') rotate('+(Math.sin(G.time*18)*6*beat).toFixed(1)+'deg)';el.style.filter='drop-shadow(0 0 '+(8*beat).toFixed(1)+'px #ff6a9a)';}
  // клубок: распустился, сшивается, сшит
  for(const h of HEROES){const p=players[h.player];const down=!!h._down||(p.downed&&active(h.player)===h);const rev=h._down?(h._down.rev||0):(p.downed&&active(h.player)===h?p.revT:0);
    const pan=juPan(h.pos,h.player),pos=h.pos.clone().add(new V3(0,0.6,0));
    if(down&&!h._jDown&&juOn('clew')){JSND.unravel(pan);if(FIN.fx){FIN.fx.dust(h.pos.clone(),14,h.player?COL.p2:COL.p1,1.2);FIN.fx.sparkle(pos,8,0xffffff);}ringFx(h.pos,h.player?COL.p2:COL.p1,2.2);}
    if(down&&juOn('clew')&&rev>(h._jRev||0)+0.001){h._jSt=(h._jSt||0)+dt;if(h._jSt>0.12){h._jSt=0;JSND.stitch(rev,pan);if(FIN.fx)FIN.fx.sparkle(pos,3,0xfff2b0);}}
    if(!down&&h._jDown&&juOn('clew')){if((h._jRev||0)>0.6){JSND.revive(pan);if(FIN.fx){FIN.fx.stars(pos,10,0xffd76a);FIN.fx.sparkle(pos,14,0xffffff);}ringFx(h.pos,COL.gold,2.6);}}
    h._jDown=down;h._jRev=rev;}}

/* ---------- панель: флажки, сила, оценки, «было / стало», отчёт ---------- */
const JP={};
function juPanel(){const st=document.createElement('style');st.textContent=`
#juBadge{position:fixed;left:12px;bottom:12px;z-index:60;font:600 14px/1.2 system-ui,sans-serif;padding:7px 12px;border-radius:10px;cursor:pointer;user-select:none;box-shadow:0 2px 10px rgba(0,0,0,.35)}
#juBadge.on{background:#2f9e5b;color:#fff}#juBadge.off{background:#555;color:#eee}
#juPanel{position:fixed;right:12px;top:12px;bottom:12px;width:min(470px,calc(100vw - 24px));z-index:61;background:rgba(24,22,30,.94);color:#f3efe6;font:13px/1.35 system-ui,sans-serif;border-radius:14px;padding:12px 14px;overflow:auto;display:none;box-shadow:0 4px 24px rgba(0,0,0,.5)}
#juPanel h3{margin:4px 0 8px;font-size:16px}#juPanel h4{margin:12px 0 6px;font-size:13px;color:#ffd76a}
#juPanel .row{display:grid;grid-template-columns:22px 1fr auto;gap:6px;align-items:start;padding:6px 0;border-top:1px solid rgba(255,255,255,.08)}
#juPanel .row small{display:block;color:#bdb6a8}#juPanel .rt button{font:12px system-ui;margin-left:2px;padding:2px 6px;border-radius:6px;border:1px solid #666;background:#333;color:#eee;cursor:pointer}
#juPanel .rt button.sel.y{background:#2f9e5b;border-color:#2f9e5b}#juPanel .rt button.sel.n{background:#b4433c;border-color:#b4433c}#juPanel .rt button.sel.m{background:#c38a1f;border-color:#c38a1f}
#juPanel .sl{display:grid;grid-template-columns:150px 1fr 44px;gap:8px;align-items:center;margin:4px 0}
#juPanel .ab{display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center;padding:2px 0}#juPanel .ab button,#juPanel .act button{font:12px system-ui;padding:3px 8px;border-radius:6px;border:1px solid #777;background:#3a3644;color:#fff;cursor:pointer}
#juPanel .act{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}#juPanel textarea{width:100%;height:70px;margin-top:6px;background:#111;color:#eee;border:1px solid #555;border-radius:6px;font:12px system-ui}
#juPanel .help{color:#bdb6a8;font-size:12px}`;document.head.appendChild(st);
  const b=document.createElement('div');b.id='juBadge';document.body.appendChild(b);b.onclick=()=>juToggleAll();JP.badge=b;
  const P=document.createElement('div');P.id='juPanel';document.body.appendChild(P);JP.panel=P;
  const RT=[['y','Да'],['m','Доработать'],['n','Нет']];
  let html='<h3>Полигон эффектов · заход '+JU.round+'</h3><div class="help">Tab — панель · Ё (`) — всё новое вкл/выкл · Esc — пауза.<br>Флажок — включить предложение; справа — ваша оценка. Номера — разделы документа 23_vfx_sfx.md.</div>';
  const row=([k,n,t,d])=>'<div class="row"><input type="checkbox" data-f="'+k+'"'+(JU.f[k]?' checked':'')+'><div><b>'+n+' · '+t+'</b><small>'+d+'</small></div><div class="rt">'+RT.map(([c,l])=>'<button data-r="'+k+'" data-v="'+c+'" class="'+c+(JU.r[k]===c?' sel':'')+'">'+l+'</button>').join('')+'</div></div>';
  for(let r=JU.round;r>=1;r--){const fs=JU.feats.filter(f=>f[4]===r);if(fs.length)html+='<h4>'+(r===JU.round?'Заход '+r+' — новое':'Заход '+r+' — принято (для сравнения)')+'</h4>'+fs.map(row).join('');}
  for(const x of JU.ext)if(x.html)html+=x.html();
  html+='<h4>Сила (заход 1)</h4>'+[['hs','Hit-stop',0,2],['vol','Громкость новых звуков',0,2],['fx','Яркость вспышек',0,2]].map(([k,l,a,z])=>'<div class="sl"><span>'+l+'</span><input type="range" min="'+a+'" max="'+z+'" step="0.05" value="'+JU.s[k]+'" data-s="'+k+'"><span data-sv="'+k+'">'+Math.round(JU.s[k]*100)+'%</span></div>').join('');
  const AB=[['Взмах','swish'],['Удар (Прошка)','hitP'],['Удар (Потап)','hitT'],['Удар (Пелагея)','hitL'],['Удар (Йоша)','hitY'],['Закрылся (кланк)','clink'],['Прыжок','jump'],['Кувырок','roll'],['Щит','shield'],['Отбив','parry'],['Ой! (урон)','hurt'],['Жёлтый сигнал','yellow'],['Красный сигнал','red'],['Синий сигнал','blue'],['Блик','glint'],['Звено','link'],['Лесенка ×8','ladder'],['Сердцебиение','heart'],['Клубок распустился','unravel'],['Подшили','revive']];
  for(const x of JU.ext)if(x.ab)AB.push(...x.ab);
  html+='<h4>Послушать: было / стало</h4>'+AB.map(([l,k])=>'<div class="ab"><span>'+l+'</span><button data-ab="'+k+'" data-w="0">▶ было</button><button data-ab="'+k+'" data-w="1">▶ стало</button></div>').join('');
  html+='<h4>Отчёт</h4><div class="help">Заметки своими словами — попадут в отчёт. Кнопка копирует оценки и настройки: пришлите их в чат.</div><textarea data-note>'+(JU.r._note||'')+'</textarea><div class="act"><button data-copy>Скопировать отчёт</button><button data-reset>Сбросить оценки</button></div><textarea data-out readonly style="display:none"></textarea>';
  P.innerHTML=html;
  P.addEventListener('change',ev=>{const t=ev.target;if(t.dataset.f){JU.f[t.dataset.f]=t.checked;JU.save();juBadge();}});
  P.addEventListener('input',ev=>{const t=ev.target;for(const x of JU.ext)if(x.input)x.input(t);if(t.dataset.s){JU.s[t.dataset.s]=+t.value;P.querySelector('[data-sv="'+t.dataset.s+'"]').textContent=Math.round(t.value*100)+'%';JU.save();}if(t.dataset.note!==undefined){JU.r._note=t.value;JU.save();}});
  P.addEventListener('click',ev=>{const t=ev.target;uiAudio();
    if(t.dataset.r){JU.r[t.dataset.r]=JU.r[t.dataset.r]===t.dataset.v?undefined:t.dataset.v;P.querySelectorAll('[data-r="'+t.dataset.r+'"]').forEach(x=>x.classList.toggle('sel',JU.r[t.dataset.r]===x.dataset.v));JU.save();}
    if(t.dataset.ab)juAB(t.dataset.ab,t.dataset.w==='1');
    for(const x of JU.ext)if(x.click)x.click(t);
    if(t.dataset.copy!==undefined){const txt=juReport(),o=P.querySelector('[data-out]');o.style.display='block';o.value=txt;o.select();try{navigator.clipboard.writeText(txt);t.textContent='Скопировано ✓';setTimeout(()=>t.textContent='Скопировать отчёт',1600);}catch(e){document.execCommand&&document.execCommand('copy');}}
    if(t.dataset.reset!==undefined){for(const k in JU.r)if(k!=='_note')delete JU.r[k];P.querySelectorAll('.rt button').forEach(x=>x.classList.remove('sel'));JU.save();}});
  P.addEventListener('keydown',ev=>ev.stopPropagation());
  addEventListener('keydown',ev=>{if(ev.code==='Tab'){ev.preventDefault();juShowPanel(P.style.display!=='block');}if(ev.code==='Backquote'){ev.preventDefault();juToggleAll();}},true);
  juBadge();}
function juShowPanel(on){JP.panel.style.display=on?'block':'none';}
function juToggleAll(){JU.all=!JU.all;JU.save();juBadge();if(!JU.all){for(const k in JV)JV[k].a=0;for(const e of W.enemies)if(e._jt){e._jt.ring.visible=false;e._jt.line.visible=false;}}for(const x of JU.ext)if(x.toggle)x.toggle(JU.all);}
function juBadge(){const b=JP.badge;if(!b)return;b.className=JU.all?'on':'off';b.textContent=JU.all?'● НОВОЕ ('+JU.feats.filter(([k])=>JU.f[k]).length+'/'+JU.feats.length+') · Ё — сравнить':'○ КАК В РЕЛИЗЕ · Ё — включить новое';}
function juReport(){const L={y:'да',m:'доработать',n:'нет'};let s='Полигон эффектов, заход '+JU.round+' — отчёт\n';
  for(let r=JU.round;r>=1;r--){s+=(r===JU.round?'Новое (заход '+r+'):':'Принятое заходом '+r+':')+'\n';
    for(const [k,n,t,,rr] of JU.feats)if(rr===r)s+='- '+n+' '+t+': '+(JU.r[k]?L[JU.r[k]]:'без оценки')+(JU.f[k]?'':' (выключено)')+'\n';}
  for(const x of JU.ext)if(x.report)s+=x.report();
  s+='Сила: hit-stop '+Math.round(JU.s.hs*100)+'%, громкость новых звуков '+Math.round(JU.s.vol*100)+'%, вспышки '+Math.round(JU.s.fx*100)+'%\n';
  if(JU.r._note)s+='Заметки: '+JU.r._note+'\n';return s;}
// «было / стало» для одного звука: было — исходная функция релиза, стало — новый звук (независимо от флажков)
function juAB(k,fresh){if(!AUD.ready())return;const H={hitP:HERO.proshka,hitT:HERO.potap,hitL:HERO.pelageya,hitY:HERO.yosha};
  if(!fresh){for(const x of JU.ext)if(x.play&&x.play(k,false))return;const o=JU.orig;const m={swish:'swish',clink:'clink',jump:'jump',roll:'roll',shield:'shield',parry:'parry',hurt:'hurt',yellow:'yellow',red:'red',blue:'blue',link:'link'}[k];
    if(m&&o[m]){o[m]();return;}
    if(H[k]){o.swish&&o.swish();setTimeout(()=>JU.orig.ember&&JU.orig.ember(),120);return;}
    if(k==='unravel'||k==='glint'||k==='heart'){floatText(active(0).pos.clone().add(new V3(0,2.4,0)),'в релизе звука нет','#dddddd');return;}
    if(k==='revive'){SFX.ok();return;}if(k==='ladder'){for(let i=0;i<8;i++)setTimeout(()=>JU.orig.link&&JU.orig.link(),i*180);return;}return;}
  for(const x of JU.ext)if(x.play&&x.play(k,fresh))return;
  if(H[k]){JSND.swish(H[k]);setTimeout(()=>{JSND.hit(H[k],false);JSND.note(0,0);},90);return;}
  if(k==='ladder'){for(let i=0;i<8;i++)setTimeout(()=>JSND.note(i,0,true),i*180);return;}
  if(k==='link'){JSND.note(0,0,true);return;}if(k==='heart'){JSND.heart(0);return;}if(k==='unravel'){JSND.unravel(0);return;}if(k==='revive'){JSND.revive(0);return;}
  if(k==='yellow'||k==='red'||k==='blue'||k==='glint'){JSND[k](0);return;}
  JSND[k](HERO.proshka);}
// панель строится после всех модулей полигона (заход 2 добавляет предложения и разделы)
setTimeout(()=>{JU.load();juPanel();for(const x of JU.ext)if(x.ready)x.ready();},0);
