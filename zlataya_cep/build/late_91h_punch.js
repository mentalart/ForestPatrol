/* ============================== РЕЛИЗ · СОЧНЫЙ УДАР: вспышка, щелчок, искры по удару, отброс, стоп и толчок, хлопок (docs/23_vfx_sfx.md) ============================== */
// По приёму «make hits punchy» (5 шагов + хлопок), принято по стенду «до/после». Работает поверх late_91b_juice (hit-stop, звук, лесенка)
// и late_91e_foe_death (смерть); каждый шаг — свой флаг PUNCH.f.*, выключенный шаг (или «Сочный бой» выкл) = прежнее поведение.
//  1 вспышка — всё тело морока белое 0,065 с (держится всю заморозку); «Вспышки 50 %» — вдвое короче, «0 %» — без неё; с костями — нет;
//  2 звук — поверх JXSND.hit сухой щелчок и хруст ровно в кадр контакта;
//  3 искры — сноп штрихов конусом ~40° по направлению удара + осколки семейства врага (нить, вода, лес, огонь, свет — DTH_FAM из late_91e);
//  4 отброс — морок отъезжает от героя (mMove: стены, поводок; летящих не трогаем, большие — втрое слабее), героя на земле чуть отдаёт назад;
//  5 стоп и толчок — hit-stop 80 мс (кора 100, добивание 110), камера ударившего толкается по направлению удара и дрожит;
//  ★ хлопок — перед смертью морок раздувается шариком и мигает белым, на хлопке волна, конфетти цветов семейства и «Хлоп!» (хуки в late_91e).
const PUNCH={on:true,f:{flash:true,sound:true,sparks:true,knock:true,stop:true,pop:true},fl:[],kn:[],st:[],
  stats:{hits:0,flashes:0,sparks:0,knocks:0,recoils:0,kicks:0,pops:0,maxW:0}};
FIN.punch=PUNCH;
const pnOn=k=>PUNCH.on&&PUNCH.f[k]&&(typeof JX==='undefined'||JX.on);
const pnFl=()=>typeof jxFl==='function'?jxFl():1;
const pnFam=e=>(typeof DTH_FAM!=='undefined'&&e&&e.def&&DTH_FAM[e.def.look])||'';
const pnQ=()=>typeof FXQ==='function'?FXQ():1;

/* ---------- 1. белый силуэт: подмена материалов тела (не базовых, не прозрачных, без костей) ---------- */
const PN_WHITE=new THREE.MeshLambertMaterial({color:0xffffff,emissive:0xffffff});
function pnWhite(e,on){if(!e||!e.g)return;
  if(on){if(e._pnW)return;const skip=new Set([e.S&&e.S.sig,e.spin,e.br,e.satRim]);if(e.embersM)for(const m of e.embersM)skip.add(m.m);const L=[];
    e.g.traverse(o=>{if(!o.isMesh||o.isSkinnedMesh||skip.has(o))return;const mt=o.material;if(!mt||Array.isArray(mt)||mt.isMeshBasicMaterial||mt.transparent)return;L.push(o);});
    for(const o of L){o.userData._pnM=o.material;o.material=PN_WHITE;}e._pnW=L;PUNCH.stats.maxW=Math.max(PUNCH.stats.maxW,L.length);}
  else{if(!e._pnW)return;for(const o of e._pnW){if(o.material===PN_WHITE&&o.userData._pnM)o.material=o.userData._pnM;o.userData._pnM=null;}e._pnW=null;}}
function pnFlash(e,dur){const k=pnFl();if(k<=0)return;e._pnF=Math.max(e._pnF||0,dur*(k<1?0.5:1));pnWhite(e,true);if(!PUNCH.fl.includes(e))PUNCH.fl.push(e);PUNCH.stats.flashes++;}
PUNCH.unwhite=e=>{if(e){e._pnF=0;pnWhite(e,false);}};
// мигание перед хлопком (late_91e): держит и белую вспышку последнего удара
PUNCH.flicker=(e,on)=>pnWhite(e,pnFl()>0&&(on||(e._pnF||0)>0));
PUNCH.popOn=()=>pnOn('pop');

/* ---------- 2. щелчок и хруст в кадр контакта ---------- */
function pnClick(h,e,heavy){if(typeof AUD==='undefined'||!AUD.ready())return;const H=heavy?1.3:1,pan=typeof jxPan==='function'?jxPan(e.pos,h.player):0,r=rand(0.95,1.05);
  jxNZ({type:'highpass',f0:4200*r,d:0.012,v:0.2*H,a:0.0005,q:0.7,pan});
  jxNZ({f0:1500*r,q:1.3,d:0.07,v:0.08*H,a:0.001,pan});
  jxTH({f0:170*r,f1:50,d:0.12,v:0.1*H,pan});}
function pnPopSnd(e){if(typeof AUD==='undefined'||!AUD.ready())return;const pan=typeof jxPan==='function'?jxPan(e.pos,0):0;
  jxNZ({type:'highpass',f0:900,d:0.06,v:0.26,a:0.0005,q:0.7,pan});jxTH({f0:150,f1:40,d:0.13,v:0.22,pan});jxBL(1320,{v:0.035,d:0.3,wet:0.4,pan});}
PUNCH.squeak=e=>{if(typeof AUD==='undefined'||!AUD.ready()||!pnOn('sound'))return;jxOS({f0:320,f1:980,d:0.16,v:0.035,glide:0.14,pan:typeof jxPan==='function'?jxPan(e.pos,0):0});};

/* ---------- 3. искры по направлению удара: штрихи (свои) + осколки семейства (FIN.fx) ---------- */
const PN_ST={'':[0xffffff,0xfff0b0,0xffd76a,0xffb347],thread:[0xffffff,0xfff4d0,0xffd76a,0xe0c8ff],water:[0xffffff,0xd8f6ff,0x9ae0f0,0x5cc6e8],
  forest:[0xfff6c8,0xf0ffd0,0xd8f08a,0xffd76a],fire:[0xfff0b0,0xffc24a,0xff8a2a,0xff5a1a],light:[0xffffff,0xfff4d0,0xe8dcff,0xd0f0ff]};
const PN_LIGHT={ten:0xb89cff,tucha:0xbfe6ff,motylek:0xffd0e8};
const PN_BOX=new THREE.BoxGeometry(1,1,1),PN_MAT={},PN_T=new V3();
const pnMat=c=>PN_MAT[c]||(PN_MAT[c]=new THREE.MeshBasicMaterial({color:c}));
function pnCone(dir,sp0,sp1,up0,up1,spread){const a=Math.atan2(dir.z,dir.x)+rand(-spread,spread),sp=rand(sp0,sp1);return new V3(Math.cos(a)*sp,rand(up0,up1),Math.sin(a)*sp);}
function pnStreak(pos,v,col,w,life){if(PUNCH.st.length>140||!W||!W.group)return;const m=new THREE.Mesh(PN_BOX,pnMat(col));if(typeof jxNoRay==='function')jxNoRay(m);
  m.position.copy(pos);m.scale.setScalar(0.001);m.renderOrder=4;m.castShadow=false;W.group.add(m);PUNCH.st.push({m,v,t:0,life,w,grp:W.group});}
function pnSparks(e,cp,dir,heavy){
  const fam=pnFam(e),pal=PN_ST[fam]||PN_ST[''],q=pnQ(),n=Math.max(4,Math.round((heavy?18:12)*q)),big=e.big?1.4:1;
  for(let i=0;i<n;i++){const v=pnCone(dir,6*big,11*big,-0.3,4,0.35);pnStreak(cp,v,pal[i%pal.length],rand(0.04,0.075)*big,rand(0.2,0.34));}
  PUNCH.stats.sparks+=n;
  const fx=FIN.fx;if(!fx||typeof fxAdd!=='function')return;
  const look=e.def&&e.def.look,col=e.def&&e.def.col,m=Math.max(2,Math.round((heavy?7:4)*q)),add=(g,c,v,o)=>fxAdd(g,c,cp.clone(),v,o);
  for(let i=0;i<m;i++){
    if(fam==='thread')add('conf',col?col[1+i%3]:(i%2?0xd8d0f0:0xb0b0c0),pnCone(dir,2.5,4.5,1.5,3.5,0.5),{s:rand(0.06,0.09),life:rand(0.5,0.8),g:5,drag:1.5,spin:10,flutter:1});
    else if(fam==='water')add('tetra',i%2?0x9ae0f0:0xd8f6ff,pnCone(dir,3,5,1.5,3.5,0.45),{s:rand(0.05,0.08),life:rand(0.45,0.7),g:13,spin:5});
    else if(fam==='forest'){if(i%2)add('conf',i%4===1?0x7ac050:0xa8d870,pnCone(dir,2,3.5,1.5,3,0.6),{s:rand(0.08,0.12),life:rand(0.7,1),g:3,drag:2,spin:6,flutter:1});
      else add('tetra',0x9a7a4a,pnCone(dir,3,5,2,4,0.45),{s:rand(0.05,0.08),life:rand(0.5,0.75),g:12,spin:9});}
    else if(fam==='fire'){if(i%3)add('octa',i%2?0xff9a3a:0xffc24a,pnCone(dir,3,5.5,1.5,4,0.45),{s:rand(0.035,0.06),life:rand(0.45,0.7),g:4,drag:1,spin:12});
      else add('tetra',0x7a726c,pnCone(dir,2,3.5,1,2.5,0.5),{s:rand(0.05,0.08),life:rand(0.5,0.8),g:2,drag:2.5,spin:4});}
    else if(fam==='light')add('star',PN_LIGHT[look]||0xfff4c0,pnCone(dir,2,3.5,0.5,2,0.6),{s:rand(0.08,0.13),life:rand(0.6,0.9),g:-1.5,drag:1.5,spin:6});
    else add('tetra',col?col[1]:0xe6dcc4,pnCone(dir,3,5,2,4,0.45),{s:rand(0.05,0.09),life:rand(0.5,0.75),g:12,spin:9});}}

/* ---------- 4. отброс ---------- */
function pnKnock(e,dir,sp){if(e.noMove||!e.pos)return;
  try{const g=groundAt(e.pos.x,e.pos.z,e.pos.y+STEP,undefined,undefined,e.bottom);if(!g||Math.abs(g.y-e.pos.y)>0.3)return;}catch(err){return;}   // летит или висит — не трогаем
  e._pnK={x:dir.x,z:dir.z,v:sp*(e.big?0.35:1),t:0};if(!PUNCH.kn.includes(e))PUNCH.kn.push(e);PUNCH.stats.knocks++;}
function pnRecoil(h,dir,air){if(air||!h.grounded||h.knockT>0||h.cling||h.hang||h.rollT>0||!h.vel)return;
  h.vel.x=-dir.x*2.4;h.vel.z=-dir.z*2.4;h.knockT=0.07;PUNCH.stats.recoils++;}

/* ---------- 5. толчок камеры ударившего по направлению удара ---------- */
function pnKick(pi,dir,a){if(typeof rigs==='undefined')return;const R=[rigs[pi],typeof shared!=='undefined'?shared:null];
  for(const r of R){if(!r||!r.shOff)continue;r.shOff.set(-dir.x*a,a*0.3,-dir.z*a);r.shTick=0.06;r.shT=Math.max(r.shT||0,0.1);r.shAmp=Math.max(r.shAmp||0,a*0.5);}
  PUNCH.stats.kicks++;}

/* ---------- ★ хлопок (вызывается из late_91e на миг разлёта) ---------- */
const PN_CONF={'':[0xffffff,0xffd76a,0xe6dcc4],thread:[0xffffff,0xd8c8ff,0xffd76a],water:[0xffffff,0xd8f6ff,0x9ae0f0],forest:[0x7ac050,0xa8d870,0xffe27a],
  fire:[0xffc24a,0xff8a2a,0x7a726c],light:[0xfff4c0,0xe8dcff,0xffffff]};
const PN_RING={'':0xfff0c0,thread:0xffffff,water:0xbfeaff,forest:0xe8ffc0,fire:0xffb060,light:0xfff4d0};
PUNCH.pop=(e,c,floor)=>{if(!pnOn('pop'))return;const fam=pnFam(e),pal=PN_CONF[fam]||PN_CONF[''],col=e.def&&e.def.col,n=Math.round(14*pnQ());
  try{ringFx(floor.clone(),PN_RING[fam]||0xfff0c0,2.4*(e.s||1));}catch(err){}
  if(typeof fxAdd==='function')for(let i=0;i<n;i++){const a=rand(0,6.283),sp=rand(2,4.5);
    fxAdd('conf',fam==='thread'&&col&&i%3===0?col[1]:pal[i%pal.length],c.clone(),new V3(Math.cos(a)*sp,rand(2.5,5.5),Math.sin(a)*sp),{s:rand(0.08,0.12),life:rand(0.9,1.3),g:4,drag:1.6,spin:10,flutter:1});}
  floatText(c.clone().add(new V3(0,0.9,0)),'Хлоп!','#ffd34d');
  if(pnOn('sound'))pnPopSnd(e);
  if(pnOn('stop')){G.hitstop=Math.max(G.hitstop,0.05*(typeof JX!=='undefined'?JX.s.hs:1));shake(e._pnBy==null?null:e._pnBy,0.04,0.15);}
  PUNCH.stats.pops++;};

/* ---------- удар по мороку ---------- */
{const _eh=enemyHit;enemyHit=function(e,h,air){
  if(!PUNCH.on||!e||!h||!e.alive||(typeof JX!=='undefined'&&!JX.on))return _eh.apply(this,arguments);
  const emb=e.embers,alive=e.alive,sh=e.shell?Object.values(e.shell).filter(Boolean).length:0;
  const r=_eh.apply(this,arguments);
  try{const sh2=e.shell?Object.values(e.shell).filter(Boolean).length:0,kill=alive&&!e.alive,plate=sh2<sh,open=e.embers<emb;
    const kind=kill?'kill':plate?'plate':open?'open':'closed';if(kind==='closed')return r;
    PUNCH.stats.hits++;e._pnBy=h.player;
    let dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z;const d=Math.hypot(dx,dz);if(d<0.05){dx=Math.sin(h.face);dz=Math.cos(h.face);}else{dx/=d;dz/=d;}
    const dir=new V3(dx,0,dz),top=(e.L&&e.L.top||1.4)*(e.s||1),cp=e.pos.clone().add(new V3(-dx*e.r*0.8,top*0.5,-dz*e.r*0.8)),heavy=kind!=='open';
    if(pnOn('flash'))pnFlash(e,0.065);
    if(pnOn('sound'))pnClick(h,e,heavy);
    if(pnOn('sparks'))pnSparks(e,cp,dir,heavy);
    if(pnOn('knock')){pnKnock(e,dir,kind==='kill'?3:6);pnRecoil(h,dir,air);}
    if(pnOn('stop')){G.hitstop=Math.max(G.hitstop,({open:0.08,plate:0.1,kill:0.11})[kind]*(typeof JX!=='undefined'?JX.s.hs:1));
      shake(h.player,kind==='open'?0.04:0.05,0.12);pnKick(h.player,dir,kind==='open'?0.07:0.1);}}
  catch(err){console.error('punch hit',err);}
  return r;};}

/* ---------- кадр: вспышки, отброс, штрихи (dt уже замедлен hit-stop'ом) ---------- */
function pnTick(dt){
  for(let i=PUNCH.fl.length-1;i>=0;i--){const e=PUNCH.fl[i];e._pnF-=dt;
    if(e._pnF<=0||!e.g||!e.g.parent){e._pnF=0;PUNCH.fl.splice(i,1);const D=e._dth;if(!(D&&!D.popped&&e.state==='dying'))pnWhite(e,false);}
    else if(e._pnW){PN_WHITE.color.setHex(0xffffff);PN_WHITE.emissive.setHex(0xffffff);}}
  for(let i=PUNCH.kn.length-1;i>=0;i--){const e=PUNCH.kn[i],K=e._pnK;
    if(!K||K.t>0.28||!e.g||!e.g.parent||(!e.alive&&e.state!=='dying')){e._pnK=null;PUNCH.kn.splice(i,1);continue;}
    K.t+=dt;const sp=K.v*Math.exp(-9*K.t);if(sp>0.2)mMove(e,K.x,K.z,sp,dt);}
  for(let i=PUNCH.st.length-1;i>=0;i--){const p=PUNCH.st[i],m=p.m;p.t+=dt;const k=p.t/p.life;
    if(k>=1||p.grp!==W.group){if(m.parent)m.parent.remove(m);PUNCH.st.splice(i,1);continue;}
    p.v.y-=7*dt;p.v.multiplyScalar(Math.exp(-4.5*dt));m.position.addScaledVector(p.v,dt);
    const w=Math.max(0.001,p.w*(1-k));m.scale.set(w,w,Math.min(0.55,0.06+p.v.length()*0.05));PN_T.copy(m.position).add(p.v);m.lookAt(PN_T);}}
{const _step=step;step=function(dt){_step(dt);if(!PUNCH.fl.length&&!PUNCH.kn.length&&!PUNCH.st.length)return;
  try{pnTick(dt);}catch(err){console.error('punch tick',err);PUNCH.fl.forEach(e=>pnWhite(e,false));PUNCH.fl.length=0;PUNCH.kn.length=0;}};}
PUNCH.white=PN_WHITE;FIN.dbgHit=(e,h,air)=>enemyHit(e,h,air);   // для ботов (ZC.FIN.dbgHit(враг, герой))
