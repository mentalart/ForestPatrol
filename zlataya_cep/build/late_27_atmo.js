/* ============================== РЕЛИЗ final03 · АТМОСФЕРА: частицы, ореолы, волны и пена, лава, море ============================== */
// У каждого мира своя атмосфера: светлячки, листья, пыльца, пузырьки, угли, искры; ореолы у светящегося (одна отрисовка на всех);
// вода участков — с волнами и пеной, лава переливается, у острова — живое море с пеной у подножий.
const ATMO={parts:null,glow:null,ocean:null,foam:null,waterFoam:[],focus:new V3()};FIN.atmo=ATMO;
// мягкие спрайты рисуются кодом (canvas), внешних текстур нет
function spriteTex(kind){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');
  if(kind==='leaf'){x.translate(32,32);x.rotate(0.6);x.fillStyle='#fff';x.beginPath();x.moveTo(0,-26);x.quadraticCurveTo(18,-4,0,26);x.quadraticCurveTo(-18,-4,0,-26);x.fill();x.strokeStyle='rgba(0,0,0,0.25)';x.lineWidth=2;x.beginPath();x.moveTo(0,-22);x.lineTo(0,22);x.stroke();}
  else if(kind==='bubble'){x.strokeStyle='rgba(255,255,255,0.9)';x.lineWidth=5;x.beginPath();x.arc(32,32,22,0,Math.PI*2);x.stroke();x.fillStyle='rgba(255,255,255,0.8)';x.beginPath();x.arc(24,24,6,0,Math.PI*2);x.fill();}
  else{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.25,'rgba(255,255,255,0.75)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);}
  const t=new THREE.CanvasTexture(c);return t;}
const ATEX={};const atex=k=>ATEX[k]||(ATEX[k]=spriteTex(k));
// ---------- частицы у камеры ----------
const PART_CFG={fireflies:{n:70,tex:'dot',col:[0xeaff8a,0xfff0a0],size:0.32,add:true,vy:0,drift:0.5,blink:true,box:[26,5,30],y0:0.4},
  leaves:{n:60,tex:'leaf',col:[0x8cc04a,0xd8c048,0x6aa040],size:0.3,add:false,vy:-0.55,drift:0.9,box:[30,10,32],y0:0.5,spin:true},
  autumn:{n:70,tex:'leaf',col:[0xf0a040,0xe06a28,0xf6d050],size:0.32,add:false,vy:-0.6,drift:1.1,box:[30,10,32],y0:0.5},
  pollen:{n:90,tex:'dot',col:[0xfff6d0,0xffffff,0xfff0a0],size:0.12,add:true,vy:0.05,drift:0.35,box:[28,7,30],y0:0.3},
  bubbles:{n:80,tex:'bubble',col:[0xd8fbff],size:0.22,add:false,vy:0.9,drift:0.3,box:[26,10,30],y0:-1},
  embers:{n:90,tex:'dot',col:[0xffb040,0xff7020,0xffe080],size:0.2,add:true,vy:1.1,drift:0.6,box:[28,9,30],y0:-1,blink:true},
  sparkles:{n:80,tex:'dot',col:[0xfff4c0,0xd8d0ff,0xffffff],size:0.18,add:true,vy:0.15,drift:0.3,box:[30,8,32],y0:0,blink:true},
  dust:{n:60,tex:'dot',col:[0xfff0d8],size:0.09,add:true,vy:0.02,drift:0.15,box:[22,6,24],y0:0.4}};
const THEME_PARTS={evening:'fireflies',dark:'fireflies',swamp:'fireflies',forest:'leaves',valy:'autumn',sunset:'pollen',buyan:'pollen',dawn:'pollen',sea:'pollen',whirl:'pollen',
  kitezh:'bubbles',belly:'bubbles',smorodina:'embers',forgein:'embers',heaven:'sparkles',skynight:'sparkles',skyday:'sparkles',egg:'sparkles',barn:'dust',terem:'dust'};
function makeParts(kind){const c=PART_CFG[kind];if(!c)return null;const n=Math.round(c.n*(FIN.set.quality==='low'?0.4:FIN.set.quality==='mid'?0.7:1));
  const pos=new Float32Array(n*3),col=new Float32Array(n*3),D=[],cc=new THREE.Color();
  for(let i=0;i<n;i++){D.push({x:(Math.random()-0.5)*c.box[0],y:c.y0+Math.random()*c.box[1],z:(Math.random()-0.5)*c.box[2],ph:Math.random()*6.28,sp:0.6+Math.random()*0.8});cc.setHex(c.col[i%c.col.length]);col[i*3]=cc.r;col[i*3+1]=cc.g;col[i*3+2]=cc.b;}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
  const m=new THREE.PointsMaterial({size:c.size,map:atex(c.tex),vertexColors:true,transparent:true,depthWrite:false,blending:c.add?THREE.AdditiveBlending:THREE.NormalBlending,opacity:c.add?0.9:0.95,alphaTest:c.add?0:0.2});
  const p=new THREE.Points(g,m);p.frustumCulled=false;p.userData.dress=true;p.renderOrder=6;return {p,D,c,col0:col.slice(),n};}
function tickParts(dt){const P=ATMO.parts;if(!P)return;const c=P.c,a=P.p.geometry.attributes.position.array,col=P.p.geometry.attributes.color.array,f=ATMO.focus,t=G.time,bx=c.box[0]/2,bz=c.box[2]/2;
  for(let i=0;i<P.n;i++){const d=P.D[i];d.y+=c.vy*d.sp*dt;d.x+=Math.sin(t*0.7*d.sp+d.ph)*c.drift*dt;d.z+=Math.cos(t*0.5*d.sp+d.ph*1.3)*c.drift*dt;
    if(d.y>c.y0+c.box[1])d.y=c.y0;if(d.y<c.y0)d.y=c.y0+c.box[1];
    let x=f.x+d.x,z=f.z+d.z;if(x<f.x-bx){d.x+=bx*2;x+=bx*2;}if(x>f.x+bx){d.x-=bx*2;x-=bx*2;}if(z<f.z-bz){d.z+=bz*2;z+=bz*2;}if(z>f.z+bz){d.z-=bz*2;z-=bz*2;}
    a[i*3]=x;a[i*3+1]=f.y+d.y;a[i*3+2]=z;if(c.blink){const k=0.35+0.65*Math.max(0,Math.sin(t*2.2*d.sp+d.ph));col[i*3]=P.col0[i*3]*k;col[i*3+1]=P.col0[i*3+1]*k;col[i*3+2]=P.col0[i*3+2]*k;}}
  P.p.geometry.attributes.position.needsUpdate=true;if(c.blink)P.p.geometry.attributes.color.needsUpdate=true;}
// ---------- ореолы у светящегося: точки одним мешем ----------
const GLOW_MAX=160;
function makeGlow(){const pos=new Float32Array(GLOW_MAX*3),col=new Float32Array(GLOW_MAX*3),sz=new Float32Array(GLOW_MAX);const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));g.setAttribute('size',new THREE.BufferAttribute(sz,1));g.setDrawRange(0,0);
  const m=new THREE.ShaderMaterial({uniforms:{uScale:{value:600}},vertexShader:'attribute float size;varying vec3 vC;uniform float uScale;void main(){vC=color;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=size*uScale/max(0.5,-mv.z);gl_Position=projectionMatrix*mv;}',
    fragmentShader:'varying vec3 vC;void main(){vec2 d=gl_PointCoord-0.5;float r=dot(d,d)*4.0;float a=exp(-r*3.2)*(1.0-r);if(a<=0.0)discard;gl_FragColor=vec4(vC*a,1.0);}',
    vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const p=new THREE.Points(g,m);p.frustumCulled=false;p.renderOrder=7;p.userData.dress=true;return {p,list:[]};}
const glowVis=o=>{while(o){if(!o.visible)return false;if(o===W.group||o===scene)return true;o=o.parent;}return false;};
// источник: меш со свечением (сила — по его материалу) или неподвижная точка
FIN.glowMesh=(m,k)=>{if(!ATMO.glow||ATMO.glow.list.length>=GLOW_MAX)return;if(!m.geometry.boundingSphere)m.geometry.computeBoundingSphere();ATMO.glow.list.push({m,k:k||1,r:m.geometry.boundingSphere.radius});};
FIN.glowAt=(x,y,z,color,size)=>{if(!ATMO.glow||ATMO.glow.list.length>=GLOW_MAX)return;ATMO.glow.list.push({p:new V3(x,y,z),c:new THREE.Color(color),s:size||1});};
const GW=new V3(),GS=new V3();
function tickGlow(){const Gl=ATMO.glow;if(!Gl)return;const A=Gl.p.geometry.attributes,pos=A.position.array,col=A.color.array,sz=A.size.array;let n=0;
  for(const e of Gl.list){let x,y,z,r,g,b,s;if(e.m){const m=e.m,mt=m.material;if(!m.parent||!glowVis(m)||!mt||!mt.emissive)continue;const I=(mt.emissiveIntensity||0)*e.k;if(I<0.05)continue;
      m.getWorldPosition(GW);m.getWorldScale(GS);x=GW.x;y=GW.y;z=GW.z;r=mt.emissive.r*I;g=mt.emissive.g*I;b=mt.emissive.b*I;s=Math.min(4,e.r*Math.max(GS.x,GS.y,GS.z)*3.2+0.25);if(mt.transparent)s*=mt.opacity;}
    else{x=e.p.x;y=e.p.y;z=e.p.z;r=e.c.r;g=e.c.g;b=e.c.b;s=e.s;}
    const L=Math.max(r,g,b);if(L>1){r/=L;g/=L;b/=L;}pos[n*3]=x;pos[n*3+1]=y;pos[n*3+2]=z;col[n*3]=r*0.55;col[n*3+1]=g*0.55;col[n*3+2]=b*0.55;sz[n]=s;n++;}
  Gl.p.geometry.setDrawRange(0,n);A.position.needsUpdate=A.color.needsUpdate=A.size.needsUpdate=true;Gl.p.material.uniforms.uScale.value=renderer.domElement.height*0.9;}
function collectGlows(){let k=0;W.group.traverse(o=>{if(k>=GLOW_MAX-20||!o.isMesh||o.isInstancedMesh||o.userData.dress)return;const mt=o.material;if(!mt||Array.isArray(mt)||!mt.emissive)return;
    const L=Math.max(mt.emissive.r,mt.emissive.g,mt.emissive.b);if(L<0.25)return;if(!o.geometry.boundingSphere)o.geometry.computeBoundingSphere();if(o.geometry.boundingSphere.radius>1.6)return;
    const pz=o.getWorldPosition(GW);if(!isFinite(pz.x))return;FIN.glowMesh(o,1);k++;});}
// ---------- волны: вода участков, море ----------
FIN.fxHook.wave=(sh,m)=>{sh.uniforms.uTime=FIN.U.time;sh.uniforms.uAmp={value:m.userData.amp||0.06};
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uTime;\nuniform float uAmp;').replace('#include <begin_vertex>',
  '#include <begin_vertex>\n\tvec4 wWP = modelMatrix * vec4( transformed, 1.0 );\n\ttransformed.z += ( sin( wWP.x * 0.8 + uTime * 1.5 ) * 0.5 + sin( wWP.z * 1.1 - uTime * 1.1 ) * 0.35 + sin( ( wWP.x + wWP.z ) * 0.43 + uTime * 0.7 ) * 0.45 ) * uAmp;');};
FIN.fxHook.lava=(sh)=>{sh.uniforms.uTime=FIN.U.time;sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;').replace('#include <begin_vertex>','#include <begin_vertex>\n\tvWP = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uTime;\nvarying vec3 vWP;').replace('vec3 totalEmissiveRadiance = emissive;',
  'float lvB = 0.5 + 0.5 * sin( vWP.x * 0.9 + sin( vWP.z * 0.6 + uTime * 0.8 ) * 1.7 + uTime * 1.3 );\n\tvec3 totalEmissiveRadiance = emissive * ( 0.72 + 0.55 * lvB * lvB );\n\tdiffuseColor.rgb *= 0.85 + 0.3 * lvB;');};
// пена: полоса по краю прямоугольника (в плоскости XY — как у воды прототипа), внутренний край неровный
function foamRectGeo(w,d,band){const P=[],hw=w/2,hd=d/2;const edge=(x0,y0,x1,y1,nx,ny)=>{const L=Math.hypot(x1-x0,y1-y0),n=Math.max(1,Math.round(L/0.6));for(let i=0;i<n;i++){const t0=i/n,t1=(i+1)/n;
      const a=[x0+(x1-x0)*t0,y0+(y1-y0)*t0],b=[x0+(x1-x0)*t1,y0+(y1-y0)*t1];const bw0=band*(0.5+h3(q4(a[0]),q4(a[1]),3)),bw1=band*(0.5+h3(q4(b[0]),q4(b[1]),3));
      const a2=[a[0]+nx*bw0,a[1]+ny*bw0],b2=[b[0]+nx*bw1,b[1]+ny*bw1];P.push(a[0],a[1],0,b[0],b[1],0,b2[0],b2[1],0,a[0],a[1],0,b2[0],b2[1],0,a2[0],a2[1],0);}};
  edge(-hw,-hd,hw,-hd,0,1);edge(hw,-hd,hw,hd,-1,0);edge(hw,hd,-hw,hd,0,-1);edge(-hw,hd,-hw,-hd,1,0);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));return g;}
const FOAM_M=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.55,depthWrite:false,side:THREE.DoubleSide});FOAM_M.userData.shared=true;
function dressWater(){ATMO.waterFoam.length=0;for(const z of (W.waters||[])){const t=z.top;if(!t||t.userData.fin3)continue;t.userData.fin3=true;const w=z.maxx-z.minx,d=z.maxz-z.minz;
    const g=new THREE.PlaneGeometry(w,d,Math.max(2,Math.min(60,Math.round(w/0.9))),Math.max(2,Math.min(90,Math.round(d/0.9))));t.geometry=g;t.material.userData.fx='wave';t.material.userData.amp=0.05;t.material.needsUpdate=true;
    const f=new THREE.Mesh(foamRectGeo(w,d,0.45),FOAM_M);f.position.z=0.02;f.renderOrder=5;f.userData.dress=true;t.add(f);ATMO.waterFoam.push(f);}
  for(const L of (W.lavas||[])){const m=L.m;if(!m||!m.material||m.material.userData.fx)continue;m.material.userData.fx='lava';m.material.needsUpdate=true;}}
// ---------- море вокруг острова: плоскость за камерой (по сетке, волны в мировых координатах), пена у подножий ----------
const OCEAN_COL={sea:0x3a9cc8,sunset:0x3a86b4,buyan:0x46a4c6,dawn:0x5e90bc,whirl:0x357f94};
function makeOcean(y){const S=320,N=80,g=new THREE.PlaneGeometry(S,S,N,N).toNonIndexed();const m=new THREE.MeshLambertMaterial({color:OCEAN_COL[W.theme||'sunset']||0x3a90c0});
  m.userData.fx='wave';m.userData.amp=0.22;m.userData.kit=true;const o=new THREE.Mesh(g,m);o.rotation.x=-Math.PI/2;o.position.y=y;o.receiveShadow=true;o.userData.dress=true;o.userData.sty=true;o.frustumCulled=false;
  o.userData.cell=S/N;return o;}
function foamSkirts(B,y){const P=[];for(const r of B.rects){if((r.maxx-r.minx)*(r.maxz-r.minz)<2)continue;const g=foamRectGeo(r.maxx-r.minx+1.6,r.maxz-r.minz+1.6,-1.2);const p=g.attributes.position.array;
    for(let i=0;i<p.length;i+=3)P.push(p[i]+(r.minx+r.maxx)/2,y+0.12,-p[i+1]+(r.minz+r.maxz)/2);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));const m=new THREE.Mesh(g,FOAM_M);m.renderOrder=5;m.userData.dress=true;return m;}
// ---------- кадр ----------
function tickAtmo(dt){const f=ATMO.focus;try{if(G.cine&&G.cine.cam&&typeof shared!=='undefined')f.copy(shared.look);else{const a=active(0).pos,b=active(1).pos;f.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);}}catch(e){}
  tickParts(dt);tickGlow();const k=0.45+0.12*Math.sin(G.time*1.7);FOAM_M.opacity=k;
  const O=ATMO.ocean;if(O){const c=O.userData.cell*2;O.position.x=Math.round(f.x/c)*c;O.position.z=Math.round(f.z/c)*c;}}
FIN.dressAtmo=function(kind,B){ATMO.parts=null;ATMO.glow=null;ATMO.ocean=null;const pk=THEME_PARTS[W.theme||'sunset'];if(pk&&FIN.set.quality!=='low'||pk==='fireflies'){ATMO.parts=makeParts(pk);if(ATMO.parts)W.group.add(ATMO.parts.p);}
  ATMO.glow=makeGlow();W.group.add(ATMO.glow.p);
  if(kind==='sea'&&DRESS.oceanY!=null&&B){ATMO.ocean=makeOcean(DRESS.oceanY+(DRESS.seaPlane?0.04:0));W.group.add(ATMO.ocean);W.group.add(foamSkirts(B,DRESS.oceanY));}};
FIN.afterDress=function(){try{dressScatter();}catch(e){console.error('scatter',e);}try{dressWater();collectGlows();}catch(e){console.error('atmo',e);}if(FIN.afterDress2)FIN.afterDress2();};
{const _step=step;step=function(dt){_step(dt);tickAtmo(dt);};}
