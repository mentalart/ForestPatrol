/* ============================== РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ»: ЭФФЕКТЫ ВОДЫ — ОМУТ, БРЫЗГИ, КОЛЬЦА, ТЕЛЕГРАФЫ, ГРОЗА, ВАЛ-«ТРУБА» ============================== */
// Омут: круглая гладь со своим шейдером — волны по вершинам, кольца от ударов, пена у берега, на гребнях и спиралью воронки, френель,
//   блик солнца, каустика на дне; воронка проваливает середину (настоящая воронка). Уровень гладь берёт у участка воды (механика прежняя).
// Брызги — меши-капли (вытянуты по скорости), корона брызг, кольца на воде, водяная пыль; столб гейзера — ядро, пенная шапка, дождь капель.
// Телеграфы — круги и дорожки, которые ЗАПОЛНЯЮТСЯ к удару: видно, когда ударит. Язык цвета игры: жёлтое — щит, красное — кувырок, синее — отбить.
// Гроза: дождь, молнии (вспышка света, гром), луч солнца сквозь тучи. Капли на «объективе» по краям экрана — когда вал близко.
// Вал: загнутый гребень (труба), пена по гребню, брызги, пыль, тень перед валом, обломки на гребне; высота пульсирует, гребень опадает и встаёт.
// FIN.k2fx: всё по уровню 2-Б, чистится само при смене уровня.
const K2FX={drops:null,live:[],puffs:[],rings:[],teles:[],tick:[],ripI:0,om:null};FIN.k2fx=K2FX;
const K2COL={red:0xff4a3a,yellow:0xffd24a,blue:0x4ab0ff,white:0xeafcff};
{const _ll=loadLevel;loadLevel=function(i){K2FX.reset();_ll(i);};}
K2FX.reset=()=>{K2FX.live.length=0;K2FX.puffs.length=0;K2FX.rings.length=0;K2FX.teles.length=0;K2FX.tick.length=0;K2FX.drops=null;K2FX.om=null;K2FX.ripU=null;K2FX.flashL=null;K2FX.rainO=null;K2FX.dropsK=0;
  if(K2FX.roarN){try{K2FX.roarN.src.stop();}catch(e){}K2FX.roarN=null;}if(K2FX.scr)K2FX.scr.style.opacity='0';};
const K2_SOFT=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,'rgba(255,255,255,0.9)');g.addColorStop(0.45,'rgba(255,255,255,0.35)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);})();
function k2Add(o){o.userData.noBatch=true;o.userData.noBatchL=true;o.raycast=()=>{};W.group.add(o);return o;}
function k2Del(o){if(o&&o.parent)o.parent.remove(o);}
/* ---------- капли: один InstancedMesh на уровень ---------- */
const K2_DROP_N=260,K2M4=new THREE.Matrix4(),K2Q=new THREE.Quaternion(),K2V1=new V3(),K2V2=new V3(),K2UP=new V3(0,1,0);
function k2Drops(){if(K2FX.drops&&K2FX.drops.parent)return K2FX.drops;const g=new THREE.IcosahedronGeometry(1,1);
  const m=new THREE.MeshBasicMaterial({color:0xeefcff,transparent:true,opacity:0.85,depthWrite:false});const im=new THREE.InstancedMesh(g,m,K2_DROP_N);im.frustumCulled=false;im.count=0;im.renderOrder=7;
  k2Add(im);K2FX.drops=im;return im;}
// одна капля: p — откуда, v — скорость, s — размер; surf() — где гладь (капля падает в воду — колечко)
K2FX.drop=(p,v,s,o)=>{if(K2FX.live.length>=K2_DROP_N)return;k2Drops();K2FX.live.push({p:p.clone(),v:v.clone(),s:s||0.12,t:0,life:(o&&o.life)||2.2,y0:(o&&o.floor!=null)?o.floor:-99,ring:!(o&&o.noRing)});};
K2FX.crown=(p,s,o)=>{s=s||1;const n=Math.round(14+10*s);for(let i=0;i<n;i++){const a=i/n*Math.PI*2+Math.random()*0.3,sp=rand(1.6,3.4)*s;
    K2FX.drop(p,new V3(Math.cos(a)*sp,rand(3.5,6.5)*Math.sqrt(s),Math.sin(a)*sp),rand(0.08,0.16)*Math.sqrt(s),o);}
  K2FX.ring(p.x,p.y+0.04,p.z,2.2*s,0.9);K2FX.ring(p.x,p.y+0.05,p.z,1.2*s,0.6);K2FX.mist(p,Math.round(3+3*s),s);K2FX.rip(p.x,p.z,0.6*s);};
K2FX.splash=(p,s,dir)=>{s=s||1;const n=Math.round(10*s);for(let i=0;i<n;i++){const v=new V3(rand(-1.6,1.6)*s,rand(2.5,5.5)*Math.sqrt(s),rand(-1.6,1.6)*s);if(dir)v.addScaledVector(dir,rand(1,3));K2FX.drop(p,v,rand(0.07,0.14)*Math.sqrt(s));}
  K2FX.mist(p,2,s*0.7);K2FX.rip(p.x,p.z,0.35*s);};
/* ---------- кольца на воде ---------- */
const K2_RING_G=new THREE.RingGeometry(0.86,1,48),K2_TRIM_G=new THREE.RingGeometry(0.9,1,40),K2_DISC_G=new FIN.orig.Circle(0.9,40),K2_CYL_G=new FIN.orig.Cylinder(0.8,1.25,1,14,4,true),K2_CYL2_G=new FIN.orig.Cylinder(1.15,1.7,1,14,1,true),K2_BALL_G=new FIN.orig.Sphere(1,8,6);
K2FX.ring=(x,y,z,r,dur,col)=>{const m=new THREE.Mesh(K2_RING_G,new THREE.MeshBasicMaterial({color:col||0xf4feff,transparent:true,opacity:0.8,depthWrite:false,side:THREE.DoubleSide}));
  m.rotation.x=-Math.PI/2;m.position.set(x,y,z);m.renderOrder=6;k2Add(m);K2FX.rings.push({m,r:r||2,t:0,dur:dur||1});return m;};
/* ---------- водяная пыль ---------- */
K2FX.mist=(p,n,s)=>{s=s||1;for(let i=0;i<(n||4);i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:K2_SOFT,color:0xeef8ff,transparent:true,opacity:0.5,depthWrite:false}));
    sp.position.set(p.x+rand(-0.6,0.6)*s,p.y+rand(0.2,1.2)*s,p.z+rand(-0.6,0.6)*s);sp.scale.setScalar(rand(1,1.8)*s);sp.renderOrder=8;k2Add(sp);
    K2FX.puffs.push({m:sp,v:new V3(rand(-0.6,0.6),rand(0.4,1.2),rand(-0.6,0.6)).multiplyScalar(s),t:0,dur:rand(1.2,2.2),s0:sp.scale.x});}};
/* ---------- столб воды (гейзер, всплеск) ---------- */
K2FX.column=(x,y,z,h,dur,r)=>{r=r||0.9;dur=dur||1.2;const g=new THREE.Group();g.position.set(x,y,z);k2Add(g);
  const cm=new THREE.MeshBasicMaterial({color:0xcff4ff,transparent:true,opacity:0.62,depthWrite:false,side:THREE.DoubleSide});const core=new THREE.Mesh(K2_CYL_G,cm);g.add(core);
  const om=new THREE.MeshBasicMaterial({color:0xf8ffff,transparent:true,opacity:0.35,depthWrite:false,side:THREE.DoubleSide});const outer=new THREE.Mesh(K2_CYL2_G,om);g.add(outer);
  const cap=new THREE.Group();g.add(cap);const fm=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.9,depthWrite:false});for(let i=0;i<7;i++){const b=new THREE.Mesh(K2_BALL_G,fm);b.scale.setScalar(r*rand(0.35,0.6));b.position.set(rand(-0.5,0.5)*r,rand(-0.2,0.3)*r,rand(-0.5,0.5)*r);cap.add(b);}
  g.traverse(c=>{c.renderOrder=7;c.userData.noBatch=true;c.userData.noBatchL=true;});K2FX.crown(new V3(x,y,z),Math.min(1.6,r*0.9));
  K2FX.anim(dur,k=>{const s=Math.sin(Math.min(1,k)*Math.PI),hh=Math.max(0.01,h*Math.min(1,k*2.6)*(k<0.7?1:1-(k-0.7)/0.3));core.scale.set(r*(1+0.15*s),hh,r*(1+0.15*s));core.position.y=hh/2;outer.scale.set(r,hh*0.7,r);outer.position.y=hh*0.35;
    cap.position.y=hh;cap.scale.setScalar(0.6+0.6*s);cm.opacity=0.62*Math.min(1,(1-k)*3);om.opacity=0.35*Math.min(1,(1-k)*3);fm.opacity=0.9*Math.min(1,(1-k)*2.5);core.rotation.y+=0.15;
    if(Math.random()<0.6&&k<0.8)K2FX.drop(new V3(x+rand(-r,r),y+hh,z+rand(-r,r)),new V3(rand(-2,2),rand(0,2.5),rand(-2,2)),rand(0.08,0.15));},()=>k2Del(g));
  return g;};
/* ---------- телеграф: круг заполняется к удару ---------- */
K2FX.tele=(x,y,z,r,dur,kind,o)=>{o=o||{};const col=K2COL[kind||'red']||kind,g=new THREE.Group();g.position.set(x,y+0.07,z);k2Add(g);
  const rim=new THREE.Mesh(K2_TRIM_G,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:0.85,depthWrite:false,side:THREE.DoubleSide}));rim.rotation.x=-Math.PI/2;rim.scale.setScalar(r);g.add(rim);
  const fill=new THREE.Mesh(K2_DISC_G,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:0.32,depthWrite:false,side:THREE.DoubleSide}));fill.rotation.x=-Math.PI/2;fill.position.y=0.01;g.add(fill);
  g.traverse(c=>{c.renderOrder=6;c.userData.noBatch=true;c.userData.noBatchL=true;});const T={g,t:0,dur,done:false,follow:o.follow||null,cancel(){T.done=true;k2Del(g);}};
  K2FX.anim(dur,k=>{if(T.done)return;if(T.follow){const p=T.follow();g.position.x=p.x;g.position.z=p.z;}fill.scale.setScalar(r*Math.max(0.02,k));rim.material.opacity=0.6+0.35*Math.abs(Math.sin(k*dur*(4+k*10)));fill.material.opacity=0.22+0.3*k;},
    ()=>{if(T.done)return;T.done=true;fill.material.opacity=0.85;fill.scale.setScalar(r);K2FX.anim(0.25,k=>{fill.material.opacity=0.85*(1-k);rim.material.opacity=0.85*(1-k);g.scale.setScalar(1+k*0.2);},()=>k2Del(g));});
  return T;};
// дорожка: заполняется от начала к концу
K2FX.lane=(a,b,w,dur,kind,y)=>{const col=K2COL[kind||'red']||kind,len=Math.hypot(b.x-a.x,b.z-a.z),g=new THREE.Group();g.position.set(a.x,(y||0)+0.07,a.z);g.rotation.y=Math.atan2(b.x-a.x,b.z-a.z);k2Add(g);
  const mk=(op)=>new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,depthWrite:false,side:THREE.DoubleSide});
  const edge=[-1,1].map(s=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(0.16,len),mk(0.85));m.rotation.x=-Math.PI/2;m.position.set(s*w/2,0,len/2);g.add(m);return m;});
  const fill=new THREE.Mesh(new THREE.PlaneGeometry(w,1),mk(0.3));fill.rotation.x=-Math.PI/2;g.add(fill);const tip=new THREE.Mesh(new THREE.ConeGeometry(w*0.45,w*0.7,3),mk(0.7));tip.rotation.x=Math.PI/2;tip.position.z=len+w*0.3;g.add(tip);
  g.traverse(c=>{c.renderOrder=6;c.userData.noBatch=true;c.userData.noBatchL=true;});const T={g,done:false,cancel(){T.done=true;k2Del(g);}};
  K2FX.anim(dur,k=>{if(T.done)return;const L=Math.max(0.05,len*k);fill.scale.y=L;fill.position.z=L/2;edge.forEach(e=>{e.material.opacity=0.55+0.4*Math.abs(Math.sin(k*dur*(5+k*12)));});},
    ()=>{if(T.done)return;T.done=true;K2FX.anim(0.3,k=>{fill.material.opacity=0.7*(1-k);edge.forEach(e=>{e.material.opacity=0.8*(1-k);});tip.material.opacity=0.7*(1-k);},()=>k2Del(g));});
  return T;};
/* ---------- маленький аниматор (переживает G.cine — эффекты роликов тоже идут) ---------- */
K2FX.anim=(dur,fn,end)=>{K2FX.tick.push({t:0,dur,fn,end});};
/* ---------- омут: гладь со своим шейдером ---------- */
const K2_OMUT_VS=`uniform float uT;uniform float uSwirl;uniform float uChop;uniform float uR;uniform vec2 uC;uniform vec4 uRip[8];
varying vec3 vW;varying float vH;varying float vR;varying float vFoam;
#include <fog_pars_vertex>
float wv(vec2 p,float t){return sin(p.x*0.55+t*1.3)*0.5+sin(p.y*0.7-t*1.1)*0.4+sin((p.x+p.y)*1.1+t*2.0)*0.22+sin((p.x-p.y)*1.7-t*2.6)*0.12;}
void main(){vec4 wp=modelMatrix*vec4(position,1.0);vec2 d=wp.xz-uC;float rn=clamp(length(d)/uR,0.0,1.0);
  float h=wv(wp.xz,uT)*(0.05+0.2*uChop)*smoothstep(1.0,0.82,rn);float rip=0.0;
  for(int i=0;i<8;i++){vec4 q=uRip[i];float age=uT-q.z;if(age>0.0&&age<3.0){float dd=length(wp.xz-q.xy);float fr=age*4.2;rip+=sin((dd-fr)*4.5)*exp(-abs(dd-fr)*1.6)*(1.0-age/3.0)*q.w;}}
  h+=rip*0.32;float fun=uSwirl*2.6*pow(1.0-rn,2.0);float ang=atan(d.y,d.x);h-=fun;h+=uSwirl*0.12*sin(ang*3.0+rn*9.0-uT*4.0)*(1.0-rn);
  wp.y+=h;vH=h+fun;vR=rn;vFoam=clamp(abs(rip)*2.2,0.0,1.0);vW=wp.xyz;vec4 mvPosition=viewMatrix*wp;gl_Position=projectionMatrix*mvPosition;
  #include <fog_vertex>
}`;
const K2_OMUT_FS=`uniform float uT;uniform float uSwirl;uniform float uChop;uniform float uLight;uniform float uA;uniform vec2 uC;uniform vec3 uDeep;uniform vec3 uShal;uniform vec3 uSky;
varying vec3 vW;varying float vH;varying float vR;varying float vFoam;
#include <fog_pars_fragment>
float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hs(i),hs(i+vec2(1.0,0.0)),f.x),mix(hs(i+vec2(0.0,1.0)),hs(i+vec2(1.0,1.0)),f.x),f.y);}
void main(){vec3 n=normalize(cross(dFdx(vW),dFdy(vW)));if(n.y<0.0)n=-n;vec3 V=normalize(cameraPosition-vW);float fr=pow(1.0-max(dot(n,V),0.0),3.0);
  vec2 d=vW.xz-uC;float ang=atan(d.y,d.x);float r=length(d);
  vec3 col=mix(uShal,uDeep,smoothstep(0.98,0.25,vR)+uSwirl*0.35*(1.0-vR));
  vec2 q=vW.xz*0.8+vec2(uT*0.25,uT*0.18);float c=abs(vn(q)-vn(q*1.6+3.1));col+=pow(1.0-smoothstep(0.0,0.1,c),2.0)*0.1;
  col=mix(col,uSky,fr*0.6);vec3 L=normalize(vec3(-0.4,0.85,-0.45));col+=pow(max(dot(n,normalize(L+V)),0.0),80.0)*0.85;
  float shore=smoothstep(0.88,0.99,vR+(vn(vW.xz*2.0+uT*0.4)-0.5)*0.06);float crest=smoothstep(0.1+0.12*(1.0-uChop),0.22+0.14*(1.0-uChop),vH)*0.7;
  float spir=uSwirl*smoothstep(0.7,0.95,sin(ang*3.0+r*1.5-uT*3.2))*smoothstep(1.0,0.35,vR);
  float foam=clamp(shore+crest+vFoam+spir,0.0,1.0)*smoothstep(0.25,0.6,vn(vW.xz*3.2+uT*0.6)+0.3);
  col=mix(col,vec3(0.94,1.0,1.0),foam);col+=uLight*vec3(0.35,0.4,0.5);
  gl_FragColor=vec4(col,clamp(mix(uA,1.0,max(foam*0.9,fr*0.45)),0.0,1.0));
  #include <fog_fragment>
}`;
function k2DiscGeo(R,rings,seg){const P=[],I=[];P.push(0,0,0);for(let i=1;i<=rings;i++){const r=R*Math.pow(i/rings,0.8);for(let j=0;j<seg;j++){const a=j/seg*Math.PI*2;P.push(Math.cos(a)*r,0,Math.sin(a)*r);}}
  for(let j=0;j<seg;j++)I.push(0,1+(j+1)%seg,1+j);for(let i=1;i<rings;i++){const a0=1+(i-1)*seg,a1=1+i*seg;for(let j=0;j<seg;j++){const j1=(j+1)%seg;I.push(a0+j,a0+j1,a1+j,a0+j1,a1+j1,a1+j);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setIndex(I);g.computeVertexNormals();return g;}
K2FX.omut=(C,R,zone,o)=>{o=o||{};const U=THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uT:{value:0},uSwirl:{value:0},uChop:{value:0.2},uR:{value:R},uC:{value:new THREE.Vector2(C.x,C.z)},
    uRip:{value:[0,1,2,3,4,5,6,7].map(()=>new THREE.Vector4(0,0,-99,0))},uLight:{value:0},uA:{value:0.8},uDeep:{value:new THREE.Color(0x0e4a5e)},uShal:{value:new THREE.Color(0x3aa6b4)},uSky:{value:new THREE.Color(0xbfe6f0)}}]);
  const mat=new THREE.ShaderMaterial({uniforms:U,vertexShader:K2_OMUT_VS,fragmentShader:K2_OMUT_FS,transparent:true,depthWrite:false,fog:true,side:THREE.DoubleSide});mat.extensions.derivatives=true;mat.userData.noOcc=true;
  const m=new THREE.Mesh(k2DiscGeo(R,30,96),mat);m.position.set(C.x,zone.level+0.02,C.z);m.renderOrder=3;m.frustumCulled=false;k2Add(m);
  // каустика на дне: светлая сетка, видна сквозь воду
  const cmat=new THREE.ShaderMaterial({uniforms:{uT:U.uT,uK:{value:1}},vertexShader:'varying vec3 vW;void main(){vec4 w=modelMatrix*vec4(position,1.0);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader:'uniform float uT;uniform float uK;varying vec3 vW;float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hs(i),hs(i+vec2(1.0,0.0)),f.x),mix(hs(i+vec2(0.0,1.0)),hs(i+vec2(1.0,1.0)),f.x),f.y);}'+
      'void main(){vec2 q=vW.xz*0.7+vec2(uT*0.3,-uT*0.22);float c=abs(vn(q)-vn(q*1.5+vec2(uT*0.2,4.0)));float k=pow(1.0-smoothstep(0.0,0.09,c),3.0);gl_FragColor=vec4(vec3(0.55,0.85,0.8)*k*0.55*uK,1.0);}',
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const cau=new THREE.Mesh(new FIN.orig.Circle(R,48),cmat);cau.rotation.x=-Math.PI/2;cau.position.set(C.x,zone.floor+0.03,C.z);cau.renderOrder=2;k2Add(cau);
  const O={m,mat,U,cau,cmat,zone,C,R,swirl:0,chop:0.2,light:0,hide:false};K2FX.om=O;K2FX.ripU=U.uRip.value;K2FX.ripI=0;
  zone.k2hide=true;if(zone.top)zone.top.userData.fin3=true;return O;};
K2FX.rip=(x,z,amp)=>{const L=K2FX.ripU;if(!L)return;const q=L[K2FX.ripI++%8];q.set(x,z,G.time,amp==null?0.6:amp);};
// участок воды омута: свою коробку и гладь не рисует (рисует шейдер), механика — прежняя
{const _dw=drawWater;drawWater=function(z){_dw(z);if(z.k2hide){z.box.visible=false;z.top.visible=false;if(z.mw&&z.mw.pts)z.mw.pts.visible=false;}};}
/* ---------- гроза: дождь, молния, гром; луч солнца ---------- */
K2FX.rain=(on,o)=>{o=o||{};let R=K2FX.rainO;if(!R){const n=700,pos=new Float32Array(n*6),vel=new Float32Array(n);for(let i=0;i<n;i++){vel[i]=rand(14,20);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const m=new THREE.LineBasicMaterial({color:0xcfe4f0,transparent:true,opacity:0.45,depthWrite:false});
    const L=new THREE.LineSegments(g,m);L.frustumCulled=false;L.renderOrder=8;k2Add(L);R=K2FX.rainO={L,pos,vel,n,on:false,k:0,c:o.c||new V3(0,0,-14),box:o.box||[30,16,30],seeded:false};}
  R.on=on;if(o.c)R.c.copy(o.c);};
K2FX.flash=(a)=>{if(!K2FX.flashL){const L=new THREE.DirectionalLight(0xdfe8ff,0);L.position.set(-10,30,-20);k2Add(L);K2FX.flashL=L;}K2FX.flashK=Math.max(K2FX.flashK||0,a==null?1:a);};
K2FX.lightning=(at)=>{if(!K2FX.flashL)K2FX.flash(0);const p=at||new V3(rand(-30,30),0,rand(-60,-35));const pts=[];let x=p.x,y=48,z=p.z;pts.push(new V3(x,y,z));while(y>p.y+4){x+=rand(-2.2,2.2);y-=rand(2.5,5);z+=rand(-1,1);pts.push(new V3(x,Math.max(y,p.y),z));}
  const g=new THREE.BufferGeometry().setFromPoints(pts);const bolt=new THREE.Line(g,new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:1}));bolt.renderOrder=9;k2Add(bolt);
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:K2_SOFT,color:0xbfd8ff,transparent:true,opacity:0.8,depthWrite:false,fog:false}));glow.position.set(p.x,30,p.z);glow.scale.setScalar(40);k2Add(glow);
  K2FX.flash(1);later(0.12,()=>K2FX.flash(0.8));K2FX.anim(0.45,k=>{bolt.material.opacity=k<0.3?1:Math.max(0,1-(k-0.3)/0.7);glow.material.opacity=0.8*(1-k);},()=>{k2Del(bolt);k2Del(glow);});
  try{CINE.moodFlash('#c8d8ff',0.16,0.6);}catch(e){}
  later(rand(0.4,0.9),()=>{if(FIN.aud){FIN.aud.nz({type:'lowpass',f0:400,f1:120,f2:60,d:2.4,v:0.22,a:0.02,q:0.5,wet:0.5});FIN.aud.thump({f0:70,f1:30,d:1.2,v:0.25});}else tone(50,1.6,'sawtooth',0.12,30);});};
K2FX.beam=(pos,on)=>{let B=K2FX.beamO;if(!B||!B.m.parent){const m=new THREE.Mesh(new FIN.orig.Cylinder(1.6,7,46,24,1,true),new THREE.ShaderMaterial({uniforms:{uK:{value:0},uT:{value:0}},
      vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:'uniform float uK;uniform float uT;varying vec2 vUv;void main(){float a=smoothstep(0.0,0.35,vUv.y)*smoothstep(1.0,0.7,vUv.y)*(0.6+0.4*sin(vUv.x*40.0+uT*2.0));gl_FragColor=vec4(vec3(1.0,0.93,0.7)*a*0.5*uK,1.0);}',
      transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));m.renderOrder=9;k2Add(m);B=K2FX.beamO={m,k:0,on:false};}
  B.on=on;if(pos)B.m.position.set(pos.x,pos.y+23,pos.z);};
/* ---------- капли на «объективе»: по краям экрана, когда вал близко ---------- */
function k2Screen(){if(K2FX.scr)return K2FX.scr;const d=document.createElement('div');d.id='k2drops';d.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;z-index:4;transition:none';
  for(let i=0;i<22;i++){const e=document.createElement('i');const edge=i%4,u=Math.random()*100,s=rand(18,64);const pos=edge===0?`left:${u}%;top:${rand(-2,10)}%`:edge===1?`left:${u}%;bottom:${rand(-2,10)}%`:edge===2?`top:${u}%;left:${rand(-2,8)}%`:`top:${u}%;right:${rand(-2,8)}%`;
    e.style.cssText=`position:absolute;${pos};width:${s}px;height:${s*rand(1,1.4)}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,0.75),rgba(190,230,255,0.25) 35%,rgba(120,180,220,0.12) 60%,rgba(255,255,255,0) 72%);box-shadow:inset -2px -3px 6px rgba(255,255,255,0.35)`;d.appendChild(e);}
  document.body.appendChild(d);K2FX.scr=d;return d;}
K2FX.screenDrops=(k)=>{K2FX.dropsK=Math.max(K2FX.dropsK||0,k);};
/* ---------- рёв воды: петля шума, громкость — по близости ---------- */
K2FX.roar=(v)=>{try{if(!FIN.aud||!FIN.aud.ready())return;let N=K2FX.roarN;if(!N){const s=AC.createBufferSource();s.buffer=FIN.aud.noise;s.loop=true;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=380;f.Q.value=0.7;
      const g=AC.createGain();g.gain.value=0;s.connect(f);f.connect(g);g.connect(master);s.start();N=K2FX.roarN={src:s,f,g};}
    const t=AC.currentTime;N.g.gain.setTargetAtTime(Math.max(0,Math.min(0.32,v))*(FIN.set&&FIN.set.sfx!=null?FIN.set.sfx:1),t,0.15);N.f.frequency.setTargetAtTime(260+v*1400,t,0.2);}catch(e){}};
/* ---------- вал: загнутый гребень («труба»), шейдер, пена, брызги, тень, обломки ---------- */
// профиль (z — вперёд, куда идёт вал; y — вверх), высота 1: спина → гребень → губа → под губой → лицо → подошва
const K2_VAL_PROF=[[-7,0.12,0],[-4,0.3,0.05],[-2,0.55,0.12],[-0.6,0.86,0.22],[0.4,1.0,0.32],[1.3,0.98,0.42],[2.0,0.82,0.52],[2.3,0.6,0.6],[2.05,0.5,0.66],[1.4,0.66,0.72],
  [0.8,0.7,0.78],[0.45,0.5,0.84],[0.5,0.28,0.9],[0.9,0.1,0.95],[1.6,0.0,1.0]];
const K2_VAL_VS=`uniform float uT;uniform float uPulse;uniform float uLip;attribute float aV;varying float vV;varying vec3 vW;varying float vX;
#include <fog_pars_vertex>
void main(){vec3 p=position;float lipK=smoothstep(0.35,0.62,aV)*(1.0-smoothstep(0.62,0.95,aV)*0.6);float w=sin(p.x*0.45+uT*2.2)*0.06+sin(p.x*1.3-uT*3.1)*0.03;
  p.y*=1.0+(w+uPulse)*smoothstep(0.1,0.4,aV);p.z+=lipK*(uLip+sin(p.x*0.7+uT*1.7)*0.08);vV=aV;vX=p.x;vec4 wp=modelMatrix*vec4(p,1.0);vW=wp.xyz;vec4 mvPosition=viewMatrix*wp;gl_Position=projectionMatrix*mvPosition;
  #include <fog_vertex>
}`;
const K2_VAL_FS=`uniform float uT;uniform float uA;varying float vV;varying vec3 vW;varying float vX;
#include <fog_pars_fragment>
float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hs(i),hs(i+vec2(1.0,0.0)),f.x),mix(hs(i+vec2(0.0,1.0)),hs(i+vec2(1.0,1.0)),f.x),f.y);}
void main(){vec3 n=normalize(cross(dFdx(vW),dFdy(vW)));vec3 V=normalize(cameraPosition-vW);float fr=pow(1.0-abs(dot(n,V)),2.5);
  vec3 deep=vec3(0.06,0.3,0.4),lit=vec3(0.24,0.62,0.72),sky=vec3(0.62,0.82,0.9);
  float face=smoothstep(0.62,0.9,vV);vec3 col=mix(deep,lit,smoothstep(0.2,0.55,vV)*0.8+face*0.4);
  float st=vn(vec2(vX*1.5,vV*14.0-uT*3.0));col+=(st-0.5)*0.12;col=mix(col,sky,fr*0.3);
  float lip=smoothstep(0.36,0.43,vV)*(1.0-smoothstep(0.55,0.63,vV));float toe=smoothstep(0.93,1.0,vV);float back=smoothstep(0.05,0.0,vV);
  float streak=smoothstep(0.62,0.8,vn(vec2(vX*3.0,vV*30.0-uT*4.0)))*smoothstep(0.62,0.85,vV)*0.35;
  float foam=clamp((lip*1.1+toe*0.7+back)*smoothstep(0.35,0.65,vn(vec2(vX*2.6+uT*0.7,vV*20.0+uT*1.5))+0.15)+streak,0.0,1.0);
  col=mix(col,vec3(0.95,1.0,1.0),foam);gl_FragColor=vec4(col,clamp(uA+foam*0.4+fr*0.2,0.0,1.0));
  #include <fog_fragment>
}`;
K2FX.val=(Wd,Ht,o)=>{o=o||{};const P=K2_VAL_PROF,nx=o.nx||48,pos=[],av=[],idx=[];
  for(let i=0;i<=nx;i++){const x=-Wd/2+Wd*i/nx;for(const q of P){pos.push(x,q[1],q[0]);av.push(q[2]);}}
  const np=P.length;for(let i=0;i<nx;i++)for(let j=0;j<np-1;j++){const a=i*np+j,b=a+np;idx.push(a,b,a+1,a+1,b,b+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('aV',new THREE.Float32BufferAttribute(av,1));g.setIndex(idx);g.computeVertexNormals();
  const U=THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uT:{value:0},uPulse:{value:0},uLip:{value:0},uA:{value:o.alpha||0.86}}]);
  const mat=new THREE.ShaderMaterial({uniforms:U,vertexShader:K2_VAL_VS,fragmentShader:K2_VAL_FS,transparent:true,depthWrite:false,fog:true,side:THREE.DoubleSide});mat.extensions.derivatives=true;mat.userData.noOcc=true;
  const root=new THREE.Group();k2Add(root);const body=new THREE.Group();root.add(body);const mesh=new THREE.Mesh(g,mat);mesh.renderOrder=5;mesh.frustumCulled=false;body.add(mesh);const ZS=Ht*(o.depth||0.55);body.scale.set(1,Ht,ZS);
  // пена по гребню: шарики пены вдоль губы
  const fm=new THREE.MeshBasicMaterial({color:0xf6ffff,transparent:true,opacity:0.92,depthWrite:false});const nf=Math.max(8,Math.round(Wd*1.6));
  const foam=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,0),fm,nf);foam.frustumCulled=false;foam.renderOrder=6;root.add(foam);const fp=[];for(let i=0;i<nf;i++)fp.push({x:-Wd/2+Wd*(i+0.5)/nf+rand(-0.3,0.3),ph:rand(0,6),s:rand(0.28,0.5)*Math.sqrt(Ht/5)});
  // тень перед валом
  const sh=new THREE.Mesh(new THREE.PlaneGeometry(Wd,Ht*1.1),new THREE.MeshBasicMaterial({color:0x06202a,transparent:true,opacity:0.28,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.renderOrder=2;root.add(sh);
  // обломки на гребне: брёвна, лодка, вёдра
  const deb=[];if(o.debris!==false){const wood=M(0x7a5a34),wood2=M(0x5a4024),iron=M(0x8a8a90);const mk=[()=>{const d=new THREE.Group();addMesh(new THREE.CylinderGeometry(0.22,0.24,2.4,7),wood,0,0,0,d).rotation.z=Math.PI/2;return d;},
      ()=>{const d=new THREE.Group();addMesh(new THREE.BoxGeometry(0.9,0.3,2.0),wood2,0,0,0,d);addMesh(new THREE.BoxGeometry(0.75,0.2,1.7),wood,0,0.15,0,d);addMesh(new THREE.ConeGeometry(0.45,0.7,4),wood2,0,0,1.3,d).rotation.x=Math.PI/2;return d;},
      ()=>{const d=new THREE.Group();addMesh(new THREE.CylinderGeometry(0.25,0.2,0.45,8),wood,0,0,0,d);addMesh(new THREE.TorusGeometry(0.25,0.03,4,10),iron,0,0.12,0,d).rotation.x=Math.PI/2;return d;}];
    const nd=Math.round(Wd/3.5);for(let i=0;i<nd;i++){const d=mk[i%3]();d.traverse(c=>{c.castShadow=false;});root.add(d);deb.push({d,x:-Wd/2+Wd*(i+0.5)/nd+rand(-0.8,0.8),ph:rand(0,6),sp:rand(0.6,1.4)});}}
  k2Dyn(root);
  const VA={root,body,mesh,U,foam,fp,sh,deb,W:Wd,H:Ht,ZS,lip:0,pulse:0,t:rand(0,9),spray:o.spray!==false,
    set(x,y,z,ry){root.position.set(x,y,z);if(ry!=null)root.rotation.y=ry;},
    tick(dt){VA.t+=dt;const t=VA.t;U.uT.value=t;VA.pulse=Math.sin(t*1.3)*0.06+Math.sin(t*0.53)*0.05;U.uPulse.value=VA.pulse;U.uLip.value=VA.lip+Math.sin(t*0.9)*0.25;
      const H=VA.H*(1+VA.pulse),zs=ZS,lipZ=(1.6+VA.lip+Math.sin(t*0.9)*0.25)*zs,lipY=0.96*H;
      for(let i=0;i<VA.fp.length;i++){const f=VA.fp[i];const b=Math.sin(t*3+f.ph);K2V1.set(f.x,lipY+b*0.18*zs*0.3,lipZ*0.82+Math.cos(t*2+f.ph)*0.15);K2Q.setFromAxisAngle(K2UP,t+f.ph);K2V2.setScalar(f.s*(0.85+0.3*b));K2M4.compose(K2V1,K2Q,K2V2);VA.foam.setMatrixAt(i,K2M4);}
      VA.foam.instanceMatrix.needsUpdate=true;sh.position.set(0,0.04-root.position.y+(VA.groundY!=null?VA.groundY:root.position.y),2.4*zs+H*0.5);
      for(const q of VA.deb){q.d.position.set(q.x+Math.sin(t*0.4+q.ph)*0.6,H*0.98+Math.sin(t*2+q.ph)*0.25,0.6*zs+Math.sin(t*1.3+q.ph)*0.4);q.d.rotation.set(Math.sin(t*q.sp+q.ph)*0.6,t*0.3*q.sp,Math.cos(t*q.sp*0.8+q.ph)*0.5);}
      if(VA.spray&&root.visible&&Math.random()<dt*VA.W*1.2){const lx=rand(-VA.W/2,VA.W/2);K2V1.set(lx,lipY,lipZ).applyMatrix4(root.matrixWorld);K2V2.set(0,0,1).transformDirection(root.matrixWorld);
        K2FX.drop(K2V1,new V3(rand(-0.8,0.8),rand(1,3),0).addScaledVector(K2V2,rand(2,5)),rand(0.1,0.18),{noRing:true,life:1.4});if(Math.random()<0.25)K2FX.mist(K2V1,1,0.9);}}};
  return VA;};
/* ---------- шаг всех эффектов ---------- */
function k2fxTick(dt){if(!W||W.levelId!=='2-B')return;const sdt=dt;
  for(let i=K2FX.tick.length-1;i>=0;i--){const a=K2FX.tick[i];a.t+=sdt;const k=Math.min(1,a.t/a.dur);try{a.fn(k);}catch(e){console.error('k2fx anim',e);}if(k>=1){K2FX.tick.splice(i,1);try{if(a.end)a.end();}catch(e){console.error('k2fx end',e);}}}
  // капли
  const im=K2FX.drops;if(im){let n=0;const L=K2FX.live;for(let i=L.length-1;i>=0;i--){const d=L[i];d.t+=dt;d.v.y-=13*dt;d.p.addScaledVector(d.v,dt);
      const O=K2FX.om,surf=O&&O.zone&&Math.hypot(d.p.x-O.C.x,d.p.z-O.C.z)<O.R?O.zone.level:d.y0;
      if(d.t>d.life||(d.v.y<0&&d.p.y<surf)){if(d.ring&&d.p.y<surf+0.3&&d.s>0.11&&Math.random()<0.35)K2FX.ring(d.p.x,surf+0.05,d.p.z,0.6,0.5);L.splice(i,1);continue;}}
    for(const d of L){const sp=d.v.length();K2V1.copy(d.v).multiplyScalar(1/(sp||1));K2Q.setFromUnitVectors(K2UP,K2V1);K2V2.set(d.s,d.s*(1+Math.min(2.2,sp*0.22)),d.s);K2M4.compose(d.p,K2Q,K2V2);im.setMatrixAt(n++,K2M4);}
    im.count=n;im.instanceMatrix.needsUpdate=true;}
  for(let i=K2FX.rings.length-1;i>=0;i--){const r=K2FX.rings[i];r.t+=dt;const k=r.t/r.dur;r.m.scale.setScalar(0.25+r.r*k);r.m.material.opacity=0.8*(1-k);if(k>=1){k2Del(r.m);K2FX.rings.splice(i,1);}}
  for(let i=K2FX.puffs.length-1;i>=0;i--){const p=K2FX.puffs[i];p.t+=dt;const k=p.t/p.dur;p.m.position.addScaledVector(p.v,dt);p.m.scale.setScalar(p.s0*(1+k*1.6));p.m.material.opacity=0.5*(1-k);if(k>=1){k2Del(p.m);K2FX.puffs.splice(i,1);}}
  const O=K2FX.om;if(O){const U=O.U;U.uT.value=G.time;U.uSwirl.value=damp(U.uSwirl.value,O.swirl,1.5,dt);U.uChop.value=damp(U.uChop.value,O.chop,1.2,dt);U.uLight.value=damp(U.uLight.value,(K2FX.flashK||0),12,dt);
    const lv=O.zone.level;O.m.position.y=lv+0.02;O.m.visible=!O.hide&&lv>O.zone.floor+0.15;O.cau.visible=O.m.visible;O.cmat.uniforms.uK.value=clamp((lv-O.zone.floor)/1.5,0,1);}
  if(K2FX.flashL){K2FX.flashK=Math.max(0,(K2FX.flashK||0)-dt*4.5);K2FX.flashL.intensity=K2FX.flashK*2.2;}
  const R=K2FX.rainO;if(R){R.k=damp(R.k,R.on?1:0,1.5,dt);R.L.visible=R.k>0.02;R.L.material.opacity=0.45*R.k;if(R.L.visible){const P=R.pos,b=R.box,c=R.c;
      for(let i=0;i<R.n;i++){const j=i*6;let y=P[j+1];if(!R.seeded||y<c.y-2){const x=c.x+rand(-b[0],b[0]),z=c.z+rand(-b[2],b[2]);y=R.seeded?c.y+b[1]:c.y+rand(-2,b[1]);P[j]=x;P[j+2]=z;P[j+3]=x-0.08;P[j+5]=z-0.04;}
        y-=R.vel[i]*dt;P[j+1]=y;P[j+4]=y+0.7;}R.seeded=true;R.L.geometry.attributes.position.needsUpdate=true;}}
  const B=K2FX.beamO;if(B&&B.m.parent){B.k=damp(B.k,B.on?1:0,1.2,dt);B.m.visible=B.k>0.01;B.m.material.uniforms.uK.value=B.k;B.m.material.uniforms.uT.value=G.time;}
  if(K2FX.dropsK>0.01||(K2FX.scr&&K2FX.scr.style.opacity!=='0')){const d=k2Screen();const v=Math.min(1,K2FX.dropsK);d.style.opacity=v<0.02?'0':v.toFixed(2);K2FX.dropsK=Math.max(0,K2FX.dropsK-dt*0.8);}}
{const _st=step;step=function(dt){_st(dt);try{k2fxTick(dt);}catch(e){console.error('k2fx',e);}};}
