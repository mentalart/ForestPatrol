/* ============================== РЕЛИЗ final06 · 3-Б «СОЛОВЕЙ-РАЗБОЙНИК»: ЭФФЕКТЫ — ВИДИМЫЙ ЗВУК, ВЕТЕР, РВУЩИЕСЯ ОБЛАКА, НОЧЬ, ВИХРЬ ============================== */
// Волна свиста — не цилиндр, а кольцо «звуковой ряби»: бегущие полосы, завитушки «фью», листья и пух на фронте. Цвет — язык игры:
//   белая — прыжок, синяя — за щит, золотая — вдвоём, фиолетовая — гасит свет, красная — уйди.
// Ветер: полосы ветра по гнезду (вихрем или от Соловья), листья, пух и перья; «облака рвутся кругом» — облака вокруг гнезда тянутся в клочья
// от середины и снова сходятся. Ночь (этап 2): звёзды, луна, светлячки. Вихрь (этап 3): воронка с полосами и листьями по спирали.
// «Солнечный зайчик» (этап 2): пятно и луч от щита. Пух на «объективе» (подушки дочек). Телеграфы, капли и вспышка — общие с 2-Б (FIN.k2fx).
// FIN.k3fx: всё по уровню 3-Б, чистится само при смене уровня.
const K3FX={parts:[],curls:[],tick:[],wind:null,cl:null,night:null,vortex:null,fl:null,fluffK:0};FIN.k3fx=K3FX;
K3FX.COL={white:0xf6fbff,blue:0x5ab4ff,gold:0xffd24a,purple:0xb080ff,red:0xff4a3a,green:0x5ad88a};
{const _ll=loadLevel;loadLevel=function(i){K3FX.reset();_ll(i);};}
K3FX.reset=()=>{K3FX.parts.length=0;K3FX.curls.length=0;K3FX.tick.length=0;K3FX.wind=null;K3FX.cl=null;K3FX.night=null;K3FX.vortex=null;K3FX.pim=null;K3FX.fluffK=0;
  if(K3FX.fl)K3FX.fl.style.opacity='0';try{FIN.U.wind.value=1;}catch(e){}};
function k3Add(o){o.userData.noBatch=true;o.userData.noBatchL=true;o.raycast=()=>{};W.group.add(o);return o;}
function k3Del(o){if(o&&o.parent)o.parent.remove(o);}
K3FX.anim=(dur,fn,end)=>{K3FX.tick.push({t:0,dur,fn,end});};
const K3_CANV=(w,h,draw)=>{const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);return new THREE.CanvasTexture(c);};
const K3_SOFT=K3_CANV(64,64,(x)=>{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.4,'rgba(255,255,255,0.45)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);});
// завитушка «фью»: спираль с хвостиком
const K3_CURL=K3_CANV(64,64,(x)=>{x.strokeStyle='rgba(255,255,255,0.95)';x.lineWidth=5;x.lineCap='round';x.beginPath();for(let i=0;i<=60;i++){const a=i/60*Math.PI*3.2,r=3+i*0.42;const px=32+Math.cos(a)*r,py=30+Math.sin(a)*r;if(!i)x.moveTo(px,py);else x.lineTo(px,py);}x.lineTo(62,40);x.stroke();});
/* ---------- частицы: листья, перья, пух, прутья, светлячки — один InstancedMesh ---------- */
const K3_PN=420,K3M4=new THREE.Matrix4(),K3Q=new THREE.Quaternion(),K3E=new THREE.Euler(),K3V1=new V3(),K3V2=new V3(),K3C1=new THREE.Color();
const K3_PT={leaf:{g:1.4,drag:1.6,fl:1.2,sx:0.26,sy:0.18},feather:{g:0.9,drag:1.8,fl:1.6,sx:0.12,sy:0.42},down:{g:0.25,drag:2.2,fl:0.8,sx:0.13,sy:0.13},
  twig:{g:9,drag:0.3,fl:0,sx:0.07,sy:0.7},fly:{g:-0.15,drag:1.2,fl:0.6,sx:0.09,sy:0.09},spark:{g:-0.4,drag:1.5,fl:0.3,sx:0.07,sy:0.07}};
function k3Pim(){if(K3FX.pim&&K3FX.pim.parent)return K3FX.pim;const g=new THREE.PlaneGeometry(1,1);const m=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide,fog:true});
  const im=new THREE.InstancedMesh(g,m,K3_PN);im.frustumCulled=false;im.count=0;im.renderOrder=7;im.setColorAt(0,K3C1.set(0xffffff));k3Add(im);K3FX.pim=im;return im;}
// p — откуда, v — скорость, kind — вид частицы, col — цвет; o: life, s (размер), spiral:{c,w} (по спирали вверх)
K3FX.part=(p,v,kind,col,o)=>{if(K3FX.parts.length>=K3_PN)return null;o=o||{};k3Pim();const T=K3_PT[kind]||K3_PT.leaf;
  const q={p:p.clone(),v:v.clone(),T,col:new THREE.Color(col),t:0,life:o.life||rand(1.6,2.8),s:(o.s||1)*rand(0.8,1.2),rx:rand(0,6),ry:rand(0,6),rz:rand(0,6),sp:rand(2,7)*(Math.random()<0.5?-1:1),ph:rand(0,6),spiral:o.spiral||null,wind:o.wind!==false};
  K3FX.parts.push(q);return q;};
K3FX.burst=(p,kind,cols,n,sp,o)=>{for(let i=0;i<(n||10);i++){const a=rand(0,6.28),u=rand(0.3,1)*(sp||3);K3FX.part(p,new V3(Math.cos(a)*u,rand(0.6,1.4)*(sp||3)*0.8,Math.sin(a)*u),kind,cols[i%cols.length],o);}};
K3FX.feathers=(p,n,cols)=>K3FX.burst(p,'feather',cols||[0x9a6a3e,0x6a4428,0xf2dfb4],n||12,3.2,{life:3.2});
K3FX.down=(p,n)=>K3FX.burst(p,'down',[0xffffff,0xf4f0ff,0xfff8f0],n||24,2.6,{life:3.4});
K3FX.flies=(p,n)=>{for(let i=0;i<(n||12);i++)K3FX.part(p.clone().add(new V3(rand(-0.6,0.6),rand(0,1.2),rand(-0.6,0.6))),new V3(rand(-0.8,0.8),rand(0.6,1.8),rand(-0.8,0.8)),'fly',i%3?0xe0ff7a:0xfff2a0,{life:rand(1.6,2.8),wind:false});};
K3FX.twigs=(p,n,dir)=>{for(let i=0;i<(n||8);i++){const v=new V3(rand(-2,2),rand(4,8),rand(-2,2));if(dir)v.addScaledVector(dir,rand(3,7));K3FX.part(p,v,'twig',i%2?0x8a6a40:0x6a4a2a,{life:2.4,wind:false});}};
K3FX.sparks=(p,n,col)=>{for(let i=0;i<(n||10);i++){const a=rand(0,6.28);K3FX.part(p,new V3(Math.cos(a)*rand(1,3),rand(1,3),Math.sin(a)*rand(1,3)),'spark',col||0xffe08a,{life:0.9,wind:false});}};
/* ---------- волна свиста: кольцо звуковой ряби ---------- */
const K3_WAVE_G=new FIN.orig.Cylinder(1,1,1,72,1,true);
const K3_WAVE_VS='varying vec2 vUv;\n#include <fog_pars_vertex>\nvoid main(){vUv=uv;vec4 mvPosition=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mvPosition;\n#include <fog_vertex>\n}';
const K3_WAVE_FS='uniform vec3 uCol;uniform float uT;uniform float uA;varying vec2 vUv;\n#include <fog_pars_fragment>\nvoid main(){float y=vUv.y;float rip=0.5+0.5*sin(y*20.0-uT*15.0);float band=0.5+0.5*sin(vUv.x*6.2831*28.0+uT*3.0);'+
  'float edge=smoothstep(0.0,0.1,y)*smoothstep(1.0,0.45,y);float lip=smoothstep(0.82,0.95,y)*smoothstep(1.0,0.96,y);float a=uA*(edge*(0.32+0.6*rip)*(0.8+0.2*band)+lip*0.7);'+
  'gl_FragColor=vec4(uCol*(0.85+0.35*rip)+lip*0.4,clamp(a,0.0,1.0));\n#include <fog_fragment>\n}';
K3FX.wave=(kind,h)=>{const col=new THREE.Color(K3FX.COL[kind]||kind);const mat=new THREE.ShaderMaterial({uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uCol:{value:col},uT:{value:0},uA:{value:0.85}}]),
    vertexShader:K3_WAVE_VS,fragmentShader:K3_WAVE_FS,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:true});
  const m=new THREE.Mesh(K3_WAVE_G,mat);m.renderOrder=6;k3Add(m);const Wv={m,mat,h,col,kind,r:1,t:0,
    set(src,r){Wv.r=r;m.position.set(src.x,(src.y||0)+h/2,src.z);m.scale.set(r,h,r);},
    tick(dt,src){Wv.t+=dt;mat.uniforms.uT.value=G.time;
      // на фронте: листья, пух, завитушки «фью»
      if(Math.random()<dt*Math.min(14,Wv.r*1.6)){const a=rand(0,6.28),p=new V3(src.x+Math.cos(a)*Wv.r,(src.y||0)+rand(0.2,h),src.z+Math.sin(a)*Wv.r),out=new V3(Math.cos(a),0,Math.sin(a));
        K3FX.part(p,out.clone().multiplyScalar(rand(4,7)).setY(rand(0.5,2)),Math.random()<0.6?'leaf':'down',Math.random()<0.6?(Math.random()<0.5?0x7aa04a:0xc0a050):0xffffff,{life:1.2});
        if(Math.random()<0.25)K3FX.curl(p,out.multiplyScalar(6),col);}},
    fade(k){mat.uniforms.uA.value=0.85*k;},del(){k3Del(m);}};
  return Wv;};
K3FX.curl=(p,v,col)=>{if(K3FX.curls.length>14)return;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:K3_CURL,color:col||0xffffff,transparent:true,opacity:0.9,depthWrite:false}));sp.position.copy(p);sp.scale.setScalar(rand(0.5,0.8));sp.renderOrder=8;k3Add(sp);
  K3FX.curls.push({m:sp,v:v.clone(),t:0,life:0.9,rot:rand(-4,4)});};
/* ---------- ветер: полосы по гнезду (вихрем или от источника) ---------- */
K3FX.windOn=(C,R)=>{let Wd=K3FX.wind;if(!Wd){const n=70,pos=new Float32Array(n*6);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const L=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false}));L.frustumCulled=false;L.renderOrder=8;k3Add(L);
    const st=[];for(let i=0;i<n;i++)st.push({a:rand(0,6.28),r:rand(1.5,R+2),y:rand(0.3,4.5),len:rand(0.8,2.6),sp:rand(0.7,1.3),d:rand(0,R)});
    Wd=K3FX.wind={L,pos,st,n,C:new V3(C.x,0,C.z),R,mode:'swirl',src:null,k:0,tk:0,spd:1};}
  return Wd;};
// mode: 'swirl' — по кругу, 'blow' — от src наружу, 'pull' — к src; k — сила 0…1
K3FX.windSet=(mode,k,src)=>{const Wd=K3FX.wind;if(!Wd)return;Wd.mode=mode||Wd.mode;Wd.tk=k;if(src)Wd.src=new V3(src.x,0,src.z);};
// скорость ветра в точке (для частиц и сноса героев уровнем)
K3FX.windVel=(p)=>{const Wd=K3FX.wind;if(!Wd||Wd.k<0.02)return null;const s=Wd.src||Wd.C;const dx=p.x-s.x,dz=p.z-s.z,d=Math.hypot(dx,dz)||1;
  if(Wd.mode==='swirl')return new V3(-(p.z-Wd.C.z),0,p.x-Wd.C.x).normalize().multiplyScalar(5*Wd.k);return new V3(dx/d,0,dz/d).multiplyScalar((Wd.mode==='pull'?-3:6)*Wd.k);};
/* ---------- «облака рвутся кругом»: облака вокруг гнезда тянутся в клочья от середины ---------- */
K3FX.cloudRing=(C,o)=>{o=o||{};const n=o.n||20,np=5,mat=new THREE.MeshLambertMaterial({color:0xece6ff,transparent:true,opacity:0.95,emissive:0x40386a,emissiveIntensity:0.25});
  const im=new THREE.InstancedMesh(new FIN.orig.Sphere(1,9,7),mat,n*np);im.frustumCulled=false;im.renderOrder=1;im.castShadow=false;k3Add(im);
  const L=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2+rand(-0.12,0.12),r=rand(o.r0||19,o.r1||30),y=rand(o.y0!=null?o.y0:-7,o.y1!=null?o.y1:1.5);
    for(let k=0;k<np;k++)L.push({a,r,y,ox:rand(-2.4,2.4),oy:rand(-0.5,0.8),oz:rand(-1.4,1.4),s:rand(1.4,2.6)});}
  const Cl={im,mat,L,C:new V3(C.x,0,C.z),k:0,tk:0,hold:0,dirty:true,
    tear(k,hold){Cl.tk=Math.max(Cl.tk,k);Cl.hold=Math.max(Cl.hold,hold||1.2);},
    upd(dt){Cl.hold=Math.max(0,Cl.hold-dt);if(Cl.hold<=0)Cl.tk=Math.max(0,Cl.tk-dt*0.5);const nk=damp(Cl.k,Cl.tk,Cl.tk>Cl.k?6:1.4,dt);if(Math.abs(nk-Cl.k)<1e-4&&!Cl.dirty)return;Cl.k=nk;Cl.dirty=false;const k=Cl.k,t=G.time;
      L.forEach((q,i)=>{const ca=Math.cos(q.a),sa=Math.sin(q.a);const rr=q.r+k*5+q.ox*ca*k*1.5;const tang=q.ox*(1-0.4*k);
        K3V1.set(Cl.C.x+ca*(rr)+(-sa)*tang+ca*q.oz*0.3,q.y+q.oy+Math.sin(t*0.3+i)*0.15,Cl.C.z+sa*rr+ca*tang+sa*q.oz*0.3);
        K3E.set(0,-q.a,0);K3Q.setFromEuler(K3E);K3V2.set(q.s*(1+k*1.8),q.s*(0.62-0.25*k),q.s*(0.8-0.35*k));K3M4.compose(K3V1,K3Q,K3V2);im.setMatrixAt(i,K3M4);});
      im.instanceMatrix.needsUpdate=true;mat.opacity=0.95-0.45*k;}};
  K3FX.cl=Cl;Cl.upd(0);return Cl;};
/* ---------- ночь: звёзды, луна, светлячки ---------- */
K3FX.nightOn=(C)=>{let N=K3FX.night;if(N)return N;const sp=new Float32Array(420*3);for(let i=0;i<420;i++){const a=rand(0,6.28),e=rand(0.12,1.3),r=120;sp[i*3]=C.x+Math.cos(a)*Math.cos(e)*r;sp[i*3+1]=Math.sin(e)*r*0.8+4;sp[i*3+2]=C.z+Math.sin(a)*Math.cos(e)*r;}
  const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(sp,3));const sm=new THREE.PointsMaterial({color:0xffffff,size:2.2,sizeAttenuation:false,transparent:true,opacity:0,depthWrite:false,fog:false});
  const stars=new THREE.Points(sg,sm);stars.frustumCulled=false;stars.renderOrder=0;k3Add(stars);
  const mt=K3_CANV(128,128,(x)=>{const g=x.createRadialGradient(64,64,10,64,64,64);g.addColorStop(0,'rgba(255,250,220,0.9)');g.addColorStop(0.35,'rgba(255,240,200,0.35)');g.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=g;x.fillRect(0,0,128,128);
    x.fillStyle='#fff6d8';x.beginPath();x.arc(64,64,24,0,Math.PI*2);x.fill();x.fillStyle='rgba(200,190,160,0.5)';for(const[a,b,r]of[[56,58,5],[72,70,4],[66,52,3],[58,74,3]]){x.beginPath();x.arc(a,b,r,0,Math.PI*2);x.fill();}});
  const moon=new THREE.Sprite(new THREE.SpriteMaterial({map:mt,transparent:true,opacity:0,depthWrite:false,fog:false}));moon.position.set(C.x+46,52,C.z-96);moon.scale.setScalar(26);k3Add(moon);
  const fn=46,fp=new Float32Array(fn*3),fs=[];for(let i=0;i<fn;i++)fs.push({a:rand(0,6.28),r:rand(1,13),y:rand(0.4,4),w:rand(0.2,0.6),ph:rand(0,6)});
  const fg=new THREE.BufferGeometry();fg.setAttribute('position',new THREE.BufferAttribute(fp,3));const fm=new THREE.PointsMaterial({map:K3_SOFT,color:0xe6ff8a,size:0.5,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  const flies=new THREE.Points(fg,fm);flies.frustumCulled=false;flies.renderOrder=8;k3Add(flies);
  N=K3FX.night={stars,sm,moon,flies,fm,fp,fs,fn,C:new V3(C.x,0,C.z),k:0,tk:0};return N;};
K3FX.nightSet=(k)=>{if(K3FX.night)K3FX.night.tk=k;};
/* ---------- вихрь: воронка с полосами, листья по спирали ---------- */
const K3_VX_FS='uniform float uT;uniform float uK;varying vec2 vUv;void main(){float s=0.5+0.5*sin(vUv.x*6.2831*5.0+vUv.y*14.0-uT*9.0);float a=smoothstep(0.0,0.12,vUv.y)*smoothstep(1.0,0.6,vUv.y)*(0.12+0.4*s*s)*uK;gl_FragColor=vec4(vec3(0.92,0.96,1.0),a);}';
K3FX.vortexOn=(pos,o)=>{o=o||{};let V=K3FX.vortex;if(V){V.g.position.set(pos.x,pos.y||0,pos.z);return V;}const g=new THREE.Group();g.position.set(pos.x,pos.y||0,pos.z);k3Add(g);const H=o.h||9;
  const mk=(rt,rb,sp)=>{const m=new THREE.Mesh(new FIN.orig.Cylinder(rt,rb,H,40,1,true),new THREE.ShaderMaterial({uniforms:{uT:{value:0},uK:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:K3_VX_FS,transparent:true,depthWrite:false,side:THREE.DoubleSide}));m.position.y=H/2;m.renderOrder=7;m.userData.sp=sp;g.add(m);return m;};
  const L=[mk(2.8,1.0,1.6),mk(2.2,0.7,-2.3)];V=K3FX.vortex={g,L,H,k:0,tk:0};return V;};
K3FX.vortexSet=(k)=>{if(K3FX.vortex)K3FX.vortex.tk=k;};
/* ---------- «солнечный зайчик»: пятно на стволе и луч от щита ---------- */
const K3_SPOT=K3_CANV(64,64,(x)=>{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,240,1)');g.addColorStop(0.3,'rgba(255,240,170,0.9)');g.addColorStop(0.62,'rgba(255,220,120,0.35)');g.addColorStop(1,'rgba(255,210,100,0)');x.fillStyle=g;x.fillRect(0,0,64,64);});
K3FX.spot=()=>{const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:K3_SPOT,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));sp.renderOrder=9;k3Add(sp);
  const bm=new THREE.Mesh(new FIN.orig.Cylinder(0.05,0.16,1,8,1,true),new THREE.MeshBasicMaterial({color:0xfff0b0,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));bm.renderOrder=9;k3Add(bm);
  const S={sp,bm,set(from,to,k,size){if(!(k>0.01)){sp.material.opacity=0;bm.material.opacity=0;return;}sp.position.copy(to);sp.scale.setScalar((size||1.3)*(0.85+0.15*Math.sin(G.time*20)));sp.material.opacity=Math.min(1,k);
      const d=K3V1.subVectors(to,from),L=d.length();bm.position.copy(from).addScaledVector(d,0.5);bm.scale.set(1,L,1);K3Q.setFromUnitVectors(new V3(0,1,0),d.normalize());bm.quaternion.copy(K3Q);bm.material.opacity=0.55*Math.min(1,k);}};
  return S;};
/* ---------- пух на «объективе»: подушки дочек ---------- */
function k3Fluff(){if(K3FX.fl)return K3FX.fl;const d=document.createElement('div');d.id='k3fluff';d.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;z-index:4';
  for(let i=0;i<26;i++){const e=document.createElement('i');const s=rand(40,140);e.style.cssText=`position:absolute;left:${rand(-5,95)}%;top:${rand(-5,95)}%;width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0.55) 35%,rgba(255,255,255,0) 70%)`;d.appendChild(e);}
  document.body.appendChild(d);K3FX.fl=d;return d;}
K3FX.fluff=(k)=>{K3FX.fluffK=Math.max(K3FX.fluffK||0,k);};
/* ---------- шаг всех эффектов ---------- */
function k3fxTick(dt){if(!W||W.levelId!=='3-B')return;
  for(let i=K3FX.tick.length-1;i>=0;i--){const a=K3FX.tick[i];a.t+=dt;const k=Math.min(1,a.t/a.dur);try{a.fn(k);}catch(e){console.error('k3fx anim',e);}if(k>=1){K3FX.tick.splice(i,1);try{if(a.end)a.end();}catch(e){console.error('k3fx end',e);}}}
  const im=K3FX.pim;if(im){let n=0;const L=K3FX.parts;
    for(let i=L.length-1;i>=0;i--){const q=L[i],T=q.T;q.t+=dt;if(q.t>q.life){L.splice(i,1);continue;}
      if(q.spiral){const S=q.spiral;S.a+=dt*S.w;S.y+=dt*S.up;const r=S.r0+(S.r1-S.r0)*Math.min(1,S.y/S.h);q.p.set(S.c.x+Math.cos(S.a)*r,S.c.y+S.y,S.c.z+Math.sin(S.a)*r);}
      else{q.v.y-=T.g*dt;q.v.multiplyScalar(Math.max(0,1-T.drag*dt));if(q.wind){const wv=K3FX.windVel(q.p);if(wv)q.v.addScaledVector(wv,dt*1.5);}
        q.p.addScaledVector(q.v,dt);if(T.fl){q.p.x+=Math.sin(q.t*4+q.ph)*T.fl*dt;q.p.z+=Math.cos(q.t*3.3+q.ph)*T.fl*dt;}}
      q.rx+=q.sp*dt;q.ry+=q.sp*0.7*dt;const fade=Math.min(1,(q.life-q.t)/0.5,q.t/0.08);
      K3E.set(q.rx,q.ry,q.rz);K3Q.setFromEuler(K3E);K3V2.set(T.sx*q.s*fade,T.sy*q.s*fade,1);K3M4.compose(q.p,K3Q,K3V2);im.setMatrixAt(n,K3M4);im.setColorAt(n,q.col);n++;}
    im.count=n;im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;}
  for(let i=K3FX.curls.length-1;i>=0;i--){const c=K3FX.curls[i];c.t+=dt;const k=c.t/c.life;c.m.position.addScaledVector(c.v,dt);c.m.material.rotation+=c.rot*dt;c.m.material.opacity=0.9*(1-k);c.m.scale.multiplyScalar(1+dt*0.6);if(k>=1){k3Del(c.m);K3FX.curls.splice(i,1);}}
  const Wd=K3FX.wind;if(Wd){Wd.k=damp(Wd.k,Wd.tk,2.2,dt);Wd.L.visible=Wd.k>0.02;Wd.L.material.opacity=0.55*Wd.k;
    if(Wd.L.visible){const P=Wd.pos,s=Wd.src||Wd.C;for(let i=0;i<Wd.n;i++){const q=Wd.st[i],j=i*6;
        if(Wd.mode==='swirl'){q.a+=dt*(2.4/Math.max(1.5,q.r))*q.sp*(1+Wd.k);const a2=q.a-q.len/q.r;P[j]=Wd.C.x+Math.cos(q.a)*q.r;P[j+1]=q.y;P[j+2]=Wd.C.z+Math.sin(q.a)*q.r;P[j+3]=Wd.C.x+Math.cos(a2)*q.r;P[j+4]=q.y+0.05;P[j+5]=Wd.C.z+Math.sin(a2)*q.r;}
        else{const dir=Wd.mode==='pull'?-1:1;q.d+=dt*9*q.sp*dir;if(q.d>Wd.R+4)q.d=rand(1,3);if(q.d<1)q.d=Wd.R+rand(1,4);const ca=Math.cos(q.a),sa=Math.sin(q.a),d2=q.d-q.len*1.6*dir;
          P[j]=s.x+ca*q.d;P[j+1]=q.y;P[j+2]=s.z+sa*q.d;P[j+3]=s.x+ca*d2;P[j+4]=q.y;P[j+5]=s.z+sa*d2;}}
      Wd.L.geometry.attributes.position.needsUpdate=true;
      if(Math.random()<dt*14*Wd.k){const a=rand(0,6.28),r=rand(2,Wd.R);K3FX.part(new V3(Wd.C.x+Math.cos(a)*r,rand(0.3,3),Wd.C.z+Math.sin(a)*r),new V3(0,rand(0.5,1.5),0),Math.random()<0.7?'leaf':'down',Math.random()<0.5?0x7aa04a:Math.random()<0.5?0xc0a050:0xffffff,{life:2});}}
    try{FIN.U.wind.value=1+Wd.k*5;}catch(e){}}
  if(K3FX.cl)K3FX.cl.upd(dt);
  const N=K3FX.night;if(N){N.k=damp(N.k,N.tk,1.2,dt);const k=N.k;N.sm.opacity=k;N.moon.material.opacity=k;N.fm.opacity=0.9*k;N.stars.visible=N.moon.visible=N.flies.visible=k>0.02;
    if(N.flies.visible){const t=G.time;for(let i=0;i<N.fn;i++){const q=N.fs[i];const a=q.a+t*q.w*0.3;N.fp[i*3]=N.C.x+Math.cos(a)*q.r+Math.sin(t*q.w+q.ph)*0.6;N.fp[i*3+1]=q.y+Math.sin(t*1.3*q.w+q.ph)*0.4;N.fp[i*3+2]=N.C.z+Math.sin(a)*q.r+Math.cos(t*q.w+q.ph)*0.6;}
      N.flies.geometry.attributes.position.needsUpdate=true;N.fm.size=0.42+0.12*Math.sin(G.time*3);}}
  const V=K3FX.vortex;if(V){V.k=damp(V.k,V.tk,2,dt);V.g.visible=V.k>0.02;V.L.forEach(m=>{m.material.uniforms.uT.value=G.time*m.userData.sp;m.material.uniforms.uK.value=V.k;});
    if(V.g.visible&&Math.random()<dt*24*V.k){const c=V.g.position.clone();K3FX.part(c,new V3(),Math.random()<0.75?'leaf':'down',Math.random()<0.5?0x7aa04a:0xc0a050,{life:3.4,spiral:{c,a:rand(0,6.28),w:rand(4,6),y:0,up:rand(2.4,3.4),r0:0.9,r1:2.6,h:V.H}});}}
  if(K3FX.fluffK>0.01||(K3FX.fl&&K3FX.fl.style.opacity!=='0')){const d=k3Fluff();const v=Math.min(1,K3FX.fluffK);d.style.opacity=v<0.02?'0':v.toFixed(2);K3FX.fluffK=Math.max(0,K3FX.fluffK-dt*0.6);}}
{const _st=step;step=function(dt){_st(dt);try{k3fxTick(dt);}catch(e){console.error('k3fx',e);}};}
