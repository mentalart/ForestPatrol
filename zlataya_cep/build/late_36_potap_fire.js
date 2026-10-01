/* ============================== РЕЛИЗ final06 · ПОТАП: ОГНЕННЫЕ КУЛАКИ, МАХ ИЗ-ЗА ГОЛОВЫ, ОГНЕННЫЙ СЕРП ============================== */
// По видео-референсу (Потап против Горыныча на лаве):
// - кулаки Потапа горят золотым огнём: белая сердцевина, живое пламя вокруг лапы, мягкое свечение;
// - удар — широкий мах лапой из-за головы через верх вперёд-вниз: замах с разворотом корпуса от врага, затем выпад вперёд,
//   корпус доворачивается в удар, вторая лапа прижата к груди; лапы чередуются (правая, левая, правая…);
// - за лапой — один толстый огненный серп (сердцевина → жёлтый → оранжевый → тёмно-красная рваная кромка), он проходит
//   дугой перед Потапом и смотрит на камеру сзади-сверху, поэтому виден со спины; с передней кромки сыплются искры;
// - попал — вспышка огня, искры и клубы серого дыма (белая звезда «бах» из late_34 у Потапа выключена).
// Кулаки разгораются, когда рядом враги или Потап только что бил, и гаснут в мирной обстановке и в роликах без боя.
// Механика удара (время, дальность, урон, отбрасывание) не меняется — только поза и эффекты. Прежние три «когтя» у Потапа выключены.
const PF={fists:new Map(),live:[],smoke:[],pool:[],spool:[]};FIN.potap=PF;
// мягкое пятно (свечение) и клочковатое облачко (дым) — текстуры из канваса
const PF_TEX=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.3,'rgba(255,255,255,0.6)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);})();
const PF_SMOKE_TEX=(()=>{const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');let q=7;const r=()=>{q=(q*16807)%2147483647;return q/2147483647;};
  for(let i=0;i<9;i++){const cx=30+r()*36,cy=30+r()*36,rr=16+r()*16;const g=x.createRadialGradient(cx,cy,0,cx,cy,rr);g.addColorStop(0,'rgba(255,255,255,0.75)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,96,96);}
  return new THREE.CanvasTexture(c);})();
// ---------- огненный кулак ----------
const PF_FL_VS='varying vec3 vN;varying vec3 vV;varying vec3 vP;void main(){vP=position;vN=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.0);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}';
const PF_NOISE=`float pfH(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}
float pfN(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(mix(pfH(i),pfH(i+vec3(1.0,0.0,0.0)),f.x),mix(pfH(i+vec3(0.0,1.0,0.0)),pfH(i+vec3(1.0,1.0,0.0)),f.x),f.y),
             mix(mix(pfH(i+vec3(0.0,0.0,1.0)),pfH(i+vec3(1.0,0.0,1.0)),f.x),mix(pfH(i+vec3(0.0,1.0,1.0)),pfH(i+vec3(1.0,1.0,1.0)),f.x),f.y),f.z);}`;
const PF_FL_FS=`uniform float uT;uniform float uK;varying vec3 vN;varying vec3 vV;varying vec3 vP;`+PF_NOISE+`
void main(){float fr=1.0-abs(dot(normalize(vN),normalize(vV)));
  float n=pfN(vP*11.0+vec3(0.0,-uT*7.0,0.0))*0.6+pfN(vP*23.0+vec3(0.0,-uT*11.0,0.0))*0.4;float up=clamp(vP.y*3.0+0.5,0.0,1.0);
  float a=(0.3+0.8*n)*(1.0-fr*0.55)*(1.0-up*0.35)*uK;if(a<0.02)discard;
  vec3 c=mix(vec3(0.95,0.3,0.03),vec3(1.0,0.72,0.16),n);c=mix(c,vec3(1.0,0.92,0.6),(1.0-fr)*0.55);gl_FragColor=vec4(c,min(0.95,a));}`;
function pfFist(h,n){const B=h.rig,hb=B&&B['hand'+n];if(!hb)return null;const g=new THREE.Group();g.position.set(0,-0.04,0.04);
  const flame=new THREE.Mesh(new THREE.SphereGeometry(0.22,14,10),new THREE.ShaderMaterial({uniforms:{uT:{value:0},uK:{value:0}},vertexShader:PF_FL_VS,fragmentShader:PF_FL_FS,
    transparent:true,depthWrite:false,fog:false,toneMapped:false}));flame.scale.set(1,1.25,1);flame.position.y=0.03;
  const core=new THREE.Mesh(new THREE.SphereGeometry(0.075,10,8),new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,toneMapped:false}));
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:PF_TEX,color:0xff7418,transparent:true,depthWrite:false,fog:false,toneMapped:false}));glow.scale.setScalar(0.7);
  for(const o of[g,flame,core,glow]){o.userData.noBatch=true;o.userData.occEx=true;o.renderOrder=12;o.frustumCulled=false;}
  g.add(glow);g.add(flame);g.add(core);hb.add(g);g.visible=false;return {g,flame,core,glow,hb,n,k:0,flare:0,emb:0};}
function pfFists(h){let F=PF.fists.get(h);if(F&&F.every(f=>f&&f.hb===h.rig['hand'+f.n]&&f.g.parent===f.hb))return F;
  if(F)for(const f of F)if(f&&f.g.parent)f.g.parent.remove(f.g);F=[pfFist(h,'L'),pfFist(h,'R')];PF.fists.set(h,F);return F;}
function pfFight(h){if(G.time-(h._pfAtk||-9)<2.5)return 1;for(const e of (W.enemies||[]))if(e.alive&&e.pos&&Math.hypot(e.pos.x-h.pos.x,e.pos.z-h.pos.z)<12)return 0.7;return 0;}
function pfFistTick(h,dt){const F=pfFists(h);if(!F[0])return;const want=h.g.visible?pfFight(h):0;
  for(const f of F){if(!f)continue;f.k+=(want-f.k)*(1-Math.exp(-(want>f.k?9:2.2)*dt));f.flare=Math.max(0,f.flare-dt/0.35);const k=Math.min(1.25,f.k+f.flare*0.8);
    f.g.visible=k>0.02;if(!f.g.visible)continue;const fl=1+Math.sin(G.time*23+(f.n==='L'?0:2))*0.06+Math.sin(G.time*37)*0.04;
    f.flame.material.uniforms.uT.value=G.time;f.flame.material.uniforms.uK.value=Math.min(1,k);f.flame.scale.set(fl*(0.8+0.35*k),fl*(0.95+0.5*k),fl*(0.8+0.35*k));
    f.core.material.opacity=Math.min(1,0.2+0.6*k);f.core.scale.setScalar(0.8+0.3*k);f.glow.material.opacity=Math.min(0.55,0.4*k);f.glow.scale.setScalar(0.55+0.4*k);
    // угольки поднимаются от горящей лапы
    f.emb-=dt*(2+6*k);if(f.emb<=0&&FX.sparkle){f.emb=1;const p=new V3();f.g.getWorldPosition(p);FX.sparkle(p,1,Math.random()<0.5?0xffb040:0xffe080);}}}
// ---------- поза удара: мах из-за головы, выпад, лапы чередуются ----------
// ключи по доле удара u (0…1): рука (x: минус — вперёд/вверх), плечо (в сторону; минус — поперёк тела), локоть,
// разворот корпуса (плюс — к бьющей лапе), наклон вперёд, выпад бёдер вперёд (м)
const PF_KEYS=[[0.0,-0.9,0.35,-0.9,0.15,0.0,0.0],[0.28,-2.8,0.7,-0.5,0.5,-0.12,-0.04],[0.55,-1.45,-0.25,-0.1,-0.45,0.32,0.17],[0.8,-0.75,-0.55,-0.35,-0.6,0.22,0.12],[1.0,-0.6,0.1,-0.4,0.0,0.0,0.0]];
function pfKey(u){let a=PF_KEYS[0],b=PF_KEYS[PF_KEYS.length-1];for(let i=0;i<PF_KEYS.length-1;i++)if(u>=PF_KEYS[i][0]&&u<=PF_KEYS[i+1][0]){a=PF_KEYS[i];b=PF_KEYS[i+1];break;}
  const q=(u-a[0])/Math.max(1e-3,b[0]-a[0]),s=q*q*(3-2*q);return a.map((v,i)=>v+(b[i]-v)*s);}
function pfPose(h){const B=h.rig;if(!B||!B.armL||!B.chest||!B.hips)return;if(h._pfZ0===undefined)h._pfZ0=B.hips.position.z;
  if(!(h.atkT>0)||h.rollT>0||h.hang||h.cling){if(h._pfLunge){B.hips.position.z=h._pfZ0;h._pfLunge=0;}return;}
  const u=Math.min(1,Math.max(0,1-h.atkT/0.28)),w=u<0.08?u/0.08:u>0.88?(1-u)/0.12:1,sg=h._pfSide||-1,n=sg>0?'L':'R',m=sg>0?'R':'L',K=pfKey(u);
  const mix=(o,p,v)=>{o[p]+=(v-o[p])*w;};
  mix(B['arm'+n].rotation,'x',K[1]);mix(B['shoulder'+n].rotation,'z',sg*K[2]);mix(B['elbow'+n].rotation,'x',K[3]);
  mix(B['arm'+m].rotation,'x',-1.05);mix(B['shoulder'+m].rotation,'z',-sg*0.12);mix(B['elbow'+m].rotation,'x',-1.45);
  mix(B.chest.rotation,'y',sg*K[4]);mix(B.chest.rotation,'x',K[5]);if(B.head)mix(B.head.rotation,'y',-sg*K[4]*0.5);
  B.hips.position.z=h._pfZ0+K[6]*w;h._pfLunge=1;
  // бьющий кулак вспыхивает в миг удара
  const F=PF.fists.get(h);if(F){const f=F[sg>0?0:1];if(f&&u>0.4&&u<0.6)f.flare=1;}}
// ---------- огненный серп ----------
const PF_CR_VS='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
const PF_CR_FS=`uniform float uProg;uniform float uLen;uniform float uAlpha;uniform float uT;uniform float uGlow;varying vec2 vUv;`+PF_NOISE+`
void main(){float u=vUv.x,v=vUv.y;float head=uProg,tail=uProg-uLen;
  float mid=clamp((u-tail)/max(head-tail,1e-3),0.0,1.0);float w=0.05+0.95*pow(sin(clamp(pow(mid,1.6)*0.92+0.04,0.0,1.0)*3.14159),1.2);   // серп: острые концы, толстый ближе к голове
  float n=pfN(vec3(u*14.0-uT*9.0,v*4.0,uT*2.0));float d=(1.0-v)/w;   // 0 — наружная (острая) кромка, 1 — внутренняя (рваная)
  float body=1.0-smoothstep(0.62+0.3*n,0.95+0.3*n,d);float band=smoothstep(tail,tail+0.08,u)*(1.0-smoothstep(head,head+0.025,u));
  float a=band*body*uAlpha;if(uGlow>0.5){a=band*(1.0-smoothstep(0.1,1.6,d))*0.3*uAlpha;}if(a<0.015)discard;
  vec3 c=mix(vec3(1.0,0.99,0.9),vec3(1.0,0.88,0.38),smoothstep(0.05,0.4,d));c=mix(c,vec3(1.0,0.52,0.1),smoothstep(0.42,0.75,d));c=mix(c,vec3(0.75,0.14,0.03),smoothstep(0.8,1.0,d));
  if(uGlow>0.5)c=vec3(1.0,0.48,0.08);
  c=mix(c,vec3(1.0,0.98,0.86),smoothstep(head-0.14,head,u)*(1.0-smoothstep(0.0,0.6,d))*0.7);gl_FragColor=vec4(c,a);}`;
// сектор кольца в плоскости XY (перед героем, лицом к камере сзади-сверху); u — вдоль дуги по ходу маха
function pfArcGeo(r0,r1,a0,a1,n){const P=[],U=[],I=[];for(let i=0;i<=n;i++){const t=i/n,a=a0+(a1-a0)*t,c=Math.cos(a),s=Math.sin(a);P.push(c*r0,s*r0,0,c*r1,s*r1,0);U.push(t,0,t,1);
    if(i<n){const k=i*2;I.push(k,k+1,k+2,k+1,k+3,k+2);}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));g.setIndex(I);return g;}
// дуга короче полукруга: от плеча бьющей лапы через макушку вниз на другую сторону (как коготь в референсе), центр — на груди
const PF_A={L:[Math.PI*0.2,Math.PI*1.08],R:[Math.PI*0.8,-Math.PI*0.08],r0:0.62,r1:1.04,rm:0.9,y:0.58,z:0.58,tilt:0.42};
const PF_ARC={R:pfArcGeo(PF_A.r0,PF_A.r1,PF_A.R[0],PF_A.R[1],40),L:pfArcGeo(PF_A.r0,PF_A.r1,PF_A.L[0],PF_A.L[1],40),
  RG:pfArcGeo(PF_A.r0-0.1,PF_A.r1+0.1,PF_A.R[0],PF_A.R[1],40),LG:pfArcGeo(PF_A.r0-0.1,PF_A.r1+0.1,PF_A.L[0],PF_A.L[1],40)};
function pfCrMat(glow){return new THREE.ShaderMaterial({uniforms:{uProg:{value:0},uLen:{value:0.8},uAlpha:{value:1},uT:{value:0},uGlow:{value:glow?1:0}},vertexShader:PF_CR_VS,fragmentShader:PF_CR_FS,
  transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,toneMapped:false,blending:THREE.NormalBlending});}
function pfCrescent(){let o=PF.pool.find(p=>!p.busy);if(o)return o;const g=new THREE.Group(),m=new THREE.Mesh(PF_ARC.R,pfCrMat(false)),gl=new THREE.Mesh(PF_ARC.RG,pfCrMat(true));
  m.renderOrder=13;gl.renderOrder=12;for(const x of[g,m,gl]){x.userData.noBatch=true;x.userData.occEx=true;x.frustumCulled=false;}g.add(gl);g.add(m);o={g,m,gl,busy:false};PF.pool.push(o);return o;}
function potapSlash(h){if(!W||!W.group)return;const sg=h._pfSide=-(h._pfSide||1);h._pfAtk=G.time;
  const o=pfCrescent();o.busy=true;o.m.geometry=PF_ARC[sg>0?'L':'R'];o.gl.geometry=PF_ARC[sg>0?'LG':'RG'];
  // плоскость серпа перед героем: наклон вперёд — лицом к камере сзади-сверху; чуть развёрнута к бьющей лапе
  o.g.position.set(h.pos.x,h.pos.y+PF_A.y,h.pos.z);o.g.rotation.set(0,h.face,0);
  for(const x of[o.m,o.gl]){x.position.set(0,0,PF_A.z);x.rotation.set(PF_A.tilt,sg*0.18,0,'YXZ');const U=x.material.uniforms;U.uProg.value=0;U.uAlpha.value=0;}
  if(!o.g.parent)W.group.add(o.g);PF.live.push({o,h,t:-0.05,dur:0.17,sp:0,sg});
  if(FX.dust)FX.dust(h.pos.clone(),6,0xd8c8a8,0.7);}
function pfCrTick(dt){for(let k=PF.live.length-1;k>=0;k--){const L=PF.live[k];L.t+=dt;const q=L.t/L.dur;
    for(const x of[L.o.m,L.o.gl]){const U=x.material.uniforms;U.uT.value=G.time;U.uLen.value=0.68;U.uProg.value=Math.max(0,Math.min(1.8,q*1.25));U.uAlpha.value=L.t<0?0:Math.max(0,1-Math.max(0,q-1)*1.4);}
    const h=L.h;if(h){L.o.g.position.x+=(h.pos.x-L.o.g.position.x)*0.5;L.o.g.position.z+=(h.pos.z-L.o.g.position.z)*0.5;}   // серп держится за Потапом
    // искры с передней кромки серпа
    L.sp-=dt;if(q>0&&q<1&&L.sp<=0&&FX.sparkle){L.sp=0.025;const A=PF_A[L.sg>0?'L':'R'],a=A[0]+(A[1]-A[0])*Math.min(1,q*1.25),r=PF_A.rm;
      const p=new V3(Math.cos(a)*r,Math.sin(a)*r,0).applyEuler(L.o.m.rotation).add(L.o.m.position).applyEuler(L.o.g.rotation).add(L.o.g.position);FX.sparkle(p,2,Math.random()<0.5?0xffc040:0xff7a20);}
    if(q>1.9){L.o.busy=false;if(L.o.g.parent)L.o.g.parent.remove(L.o.g);PF.live.splice(k,1);}}}
// ---------- дым при попадании ----------
function pfPuff(){let s=PF.spool.find(x=>!x.busy);
  if(!s){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:PF_SMOKE_TEX,color:0x9a948e,transparent:true,depthWrite:false,fog:false}));sp.userData.noBatch=true;sp.userData.occEx=true;sp.renderOrder=11;s={sp,busy:false};PF.spool.push(s);}
  s.busy=true;return s;}
function pfSmoke(p){if(!W||!W.group)return;const n=Math.round(4*(FXQ?FXQ():1))+1;
  // вспышка огня в точке удара (вместо белой звезды «бах», которой в референсе нет)
  {const s=pfPuff();s.fl=1;s.sp.material.map=PF_TEX;s.sp.material.color.setHex(0xffa23a);s.sp.position.copy(p);s.v=new V3(0,0.3,0);s.t=0;s.life=0.2;s.s0=0.5;s.s1=1.5;s.rot=0;s.sp.material.rotation=0;s.sp.material.opacity=1;
    if(!s.sp.parent)W.group.add(s.sp);PF.smoke.push(s);}
  for(let i=0;i<n;i++){const s=pfPuff();s.fl=0;s.sp.material.map=PF_SMOKE_TEX;
    const a=Math.random()*Math.PI*2;s.sp.position.copy(p).add(new V3(Math.cos(a)*0.25,Math.random()*0.3,Math.sin(a)*0.25));s.v=new V3(Math.cos(a)*0.7,0.9+Math.random()*0.6,Math.sin(a)*0.7);
    s.t=0;s.life=0.75+Math.random()*0.35;s.s0=0.5+Math.random()*0.3;s.s1=1.5+Math.random()*0.7;s.rot=(Math.random()-0.5)*2;s.sp.material.rotation=Math.random()*6;s.sp.material.opacity=0;
    s.sp.material.color.setHex(i%2?0x8c8680:0xa8a29a);if(!s.sp.parent)W.group.add(s.sp);PF.smoke.push(s);}
  if(FX.sparks)FX.sparks(p,10,0xff9a30);if(FX.sparkle)FX.sparkle(p,4,0xffe080);}
function pfSmokeTick(dt){for(let k=PF.smoke.length-1;k>=0;k--){const s=PF.smoke[k];s.t+=dt;const q=s.t/s.life;s.sp.position.addScaledVector(s.v,dt);s.v.multiplyScalar(Math.exp(-2.2*dt));
    const e=1-Math.pow(1-Math.min(1,q),3);s.sp.scale.setScalar(s.s0+(s.s1-s.s0)*e);s.sp.material.rotation+=s.rot*dt;s.sp.material.opacity=s.fl?Math.max(0,1-q*q)*0.95:Math.min(1,q*6)*Math.max(0,1-q)*0.8;
    if(q>=1){s.busy=false;if(s.sp.parent)s.sp.parent.remove(s.sp);PF.smoke.splice(k,1);}}}
// ---------- подключение ----------
{const _sf=slashFx;slashFx=function(h){if(h&&h.kind==='potap'){potapSlash(h);return;}return _sf.apply(this,arguments);};}
{const _anim=animHero;animHero=function(h,dt){_anim(h,dt);if(h.kind!=='potap')return;try{pfPose(h);pfFistTick(h,dt||0);}catch(e){console.error('potap fire',e);}};}
// у Потапа вместо звезды «бах» (late_34) — вспышка огня и дым
{const _si=slImpact;slImpact=function(p,col){if(PF.hit)return;return _si.apply(this,arguments);};}
{const _eh=enemyHit;enemyHit=function(e,h){PF.hit=!!(h&&h.kind==='potap');let r;try{r=_eh.apply(this,arguments);}finally{PF.hit=false;}try{if(h&&h.kind==='potap'&&e&&e.pos){const p=e.pos.clone().lerp(h.pos,0.3);p.y=(e.pos.y+h.pos.y)/2+Math.max(0.6,(e.r||0.6)*0.9);pfSmoke(p);}}catch(err){}return r;};}
{const _step=step;step=function(dt){_step(dt);try{pfCrTick(dt);pfSmokeTick(dt);}catch(e){console.error('potap fire',e);}};}
{const _ll=loadLevel;loadLevel=function(i){for(const L of PF.live)L.o.busy=false;PF.live.length=0;for(const s of PF.smoke)s.busy=false;PF.smoke.length=0;_ll(i);};}
// для ботов: сила огня кулаков [левый, правый], какой лапой был последний удар (1 — левой, −1 — правой)
PF.fistK=h=>{const F=PF.fists.get(h);return F?F.map(f=>f?+f.k.toFixed(2):null):null;};PF.side=h=>h._pfSide||0;
