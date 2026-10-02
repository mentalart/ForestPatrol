/* ============================== РЕЛИЗ final06 · МИР 2: ВОДА ГУСЛЕЙ — СКАЗОЧНАЯ, ПЕРЕЛИВЧАТАЯ ============================== */
// Мы и так под водой — а гусли Садко поднимают и опускают ещё какую-то воду. Пусть сразу видно: это не море, а живая
// волшебная вода гуслей. В мире 2 вода участков (waterZone) — перламутровая, с радужным переливом по краю взгляда,
// бегущими светлыми струями, золотыми искрами на глади и в толще и светящимся бортиком. Сменилась вода — из раковины
// взлетают ноты, по глади бежит радужное кольцо. Механика прежняя.
const MW={u:{uT:{value:0}}};
FIN.magicWater=MW;
const MW_HSV='vec3 hsv(float h,float s,float v){vec3 k=clamp(abs(mod(h*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);return v*mix(vec3(1.0),k,s);}\n'+
  'float hsh(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\n';
const MW_VS='varying vec3 vW;varying vec3 vN;varying vec3 vV;\n#include <fog_pars_vertex>\n'+
  'void main(){vec4 wp=modelMatrix*vec4(position,1.0);vW=wp.xyz;vN=normalize(mat3(modelMatrix)*normal);vV=cameraPosition-wp.xyz;'+
  'vec4 mvPosition=viewMatrix*wp;gl_Position=projectionMatrix*mvPosition;\n#include <fog_vertex>\n}';
// толща: перламутр, радуга по краю взгляда, у глади светлее, струи бегут вверх
const MW_FS_BOX='uniform float uT;uniform float uOp;uniform float uLevel;uniform float uFloor;varying vec3 vW;varying vec3 vN;varying vec3 vV;\n#include <fog_pars_fragment>\n'+MW_HSV+
  'void main(){if(vN.y>0.5)discard;vec3 n=normalize(vN),v=normalize(vV);float fr=pow(1.0-abs(dot(n,v)),1.5);'+
  'float hue=0.5+0.13*sin(vW.x*0.31+uT*0.45)+0.11*sin(vW.z*0.27-uT*0.38)+0.3*fr+0.05*vW.y;vec3 rb=hsv(fract(hue),0.45,1.0);'+
  'float sw=0.5+0.5*sin(vW.y*2.6-uT*1.7+1.4*sin(vW.x*0.7+uT*0.6)+1.4*sin(vW.z*0.6-uT*0.5));'+
  'float d=clamp((uLevel-vW.y)/max(0.3,uLevel-uFloor),0.0,1.0);vec3 base=mix(vec3(0.48,0.86,1.0),vec3(0.34,0.36,0.9),d);'+
  'vec3 col=mix(base,rb,0.42+0.4*fr)+vec3(1.0,0.9,0.7)*pow(sw,3.0)*0.18;'+
  'float a=uOp*(0.55+0.6*fr)+0.07*pow(sw,3.0);gl_FragColor=vec4(col,clamp(a,0.0,0.92));\n#include <fog_fragment>\n}';
// гладь: светлая сетка бликов, радужный перелив, золотые искры, светящийся бортик
const MW_FS_TOP='uniform float uT;uniform vec2 uMin;uniform vec2 uMax;varying vec3 vW;varying vec3 vN;varying vec3 vV;\n#include <fog_pars_fragment>\n'+MW_HSV+
  'void main(){vec3 n=normalize(vN),v=normalize(vV);float fr=pow(1.0-abs(dot(n,v)),1.4);vec2 p=vW.xz*0.55;vec2 q=p+vec2(uT*0.25,-uT*0.18);'+
  'float c=abs(sin(q.x*2.1+sin(q.y*1.7+uT*0.8)*1.3))+abs(sin(q.y*2.3+sin(q.x*1.9-uT*0.7)*1.2));float net=pow(max(0.0,1.0-c*0.5),6.0);'+
  'float hue=0.52+0.16*sin(p.x*0.6+uT*0.5)+0.13*sin(p.y*0.5-uT*0.4)+0.3*fr;vec3 rb=hsv(fract(hue),0.5,1.0);'+
  'vec2 g=vW.xz*2.6;vec2 cell=floor(g);float r=hsh(cell);float tw=step(0.93,r)*pow(0.5+0.5*sin(uT*4.0+r*40.0),8.0);float sp=tw*smoothstep(0.2,0.0,length(fract(g)-0.5));'+
  'float ex=min(vW.x-uMin.x,uMax.x-vW.x),ez=min(vW.z-uMin.y,uMax.y-vW.z);float rim=smoothstep(0.7,0.0,min(ex,ez));'+
  'vec3 col=mix(vec3(0.42,0.78,0.95),rb,0.62)*0.92+net*vec3(1.0,0.95,0.82)*0.45+sp*vec3(1.0,0.86,0.45)*1.4+rim*vec3(0.95,0.85,1.0)*0.3;'+
  'float a=0.3+0.2*fr+net*0.2+sp*0.5+rim*0.2;gl_FragColor=vec4(col,clamp(a,0.0,0.95));\n#include <fog_fragment>\n}';
// искры в толще: всплывают от дна к глади, мерцают
const MW_VS_PT='attribute vec3 seed;uniform float uT;uniform float uLevel;uniform float uFloor;uniform vec2 uMin;uniform vec2 uMax;uniform float uPx;varying float vA;varying vec3 vC;\n'+
  'void main(){float h=max(0.0,uLevel-uFloor);float s=0.25+seed.y*0.35;float y=uFloor+mod(seed.z*7.0+uT*s,max(h,0.01));'+
  'vec3 p=vec3(mix(uMin.x,uMax.x,seed.x)+0.3*sin(uT*0.8+seed.z*30.0),y,mix(uMin.y,uMax.y,fract(seed.x*7.13+seed.y*3.1))+0.3*cos(uT*0.7+seed.x*20.0));'+
  'vec4 mv=viewMatrix*vec4(p,1.0);gl_Position=projectionMatrix*mv;float tw=0.5+0.5*sin(uT*3.0+seed.x*50.0);'+
  'gl_PointSize=min(14.0,uPx*(0.6+0.8*seed.y)*(0.6+0.4*tw)/max(1.0,-mv.z));'+
  'vA=step(0.05,h)*smoothstep(0.0,0.3,y-uFloor)*smoothstep(0.0,0.4,uLevel-y)*(0.45+0.55*tw);vC=mix(vec3(1.0,0.88,0.5),vec3(0.75,1.0,1.0),seed.y);}';
const MW_FS_PT='varying float vA;varying vec3 vC;void main(){float d=length(gl_PointCoord-0.5);float a=smoothstep(0.5,0.0,d)*vA;if(a<0.01)discard;gl_FragColor=vec4(vC*(1.0+smoothstep(0.25,0.0,d)),a);}';
function mwMat(fs,extra,side){const u=Object.assign(THREE.UniformsUtils.clone(THREE.UniformsLib.fog),{uT:MW.u.uT},extra);
  return new THREE.ShaderMaterial({uniforms:u,vertexShader:MW_VS,fragmentShader:fs,transparent:true,depthWrite:false,fog:true,side:side||THREE.FrontSide});}
function mwDress(z){if(z.mw)return;const U={uLevel:{value:z.level},uFloor:{value:z.floor},uMin:{value:new THREE.Vector2(z.minx,z.minz)},uMax:{value:new THREE.Vector2(z.maxx,z.maxz)},uOp:{value:0.3}};
  z.box.material=mwMat(MW_FS_BOX,{uOp:U.uOp,uLevel:U.uLevel,uFloor:U.uFloor});
  const top=mwMat(MW_FS_TOP,{uMin:U.uMin,uMax:U.uMax},THREE.DoubleSide);z.top.material=top;z.topMat=top;
  // искры в толще
  const area=(z.maxx-z.minx)*(z.maxz-z.minz),n=Math.round(clamp(area*0.9,18,200)),seed=new Float32Array(n*3),pos=new Float32Array(n*3);
  for(let i=0;i<n*3;i++)seed[i]=Math.random();
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('seed',new THREE.BufferAttribute(seed,3));
  const pm=new THREE.ShaderMaterial({uniforms:{uT:MW.u.uT,uLevel:U.uLevel,uFloor:U.uFloor,uMin:U.uMin,uMax:U.uMax,uPx:{value:240}},vertexShader:MW_VS_PT,fragmentShader:MW_FS_PT,
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const pts=new THREE.Points(g,pm);pts.frustumCulled=false;pts.renderOrder=5;pts.raycast=()=>{};pts.userData.noBatch=true;W.group.add(pts);
  z.mw={U,pts,pm};}
{const _wz=waterZone;waterZone=function(minx,maxx,minz,maxz,low,high,o){const z=_wz(minx,maxx,minz,maxz,low,high,o);if(W&&W.world===2)mwDress(z);return z;};}
{const _dw=drawWater;drawWater=function(z){_dw(z);if(!z.mw)return;const U=z.mw.U;U.uLevel.value=z.level;U.uFloor.value=z.floor;
  z.mw.pts.visible=z.box.visible;z.mw.pm.uniforms.uPx.value=Math.max(120,renderer.domElement.height*0.32);};}
{const _st=step;step=function(dt){_st(dt);MW.u.uT.value=G.time;};}
// вода сменилась — из раковины взлетают ноты, по глади бежит радужное кольцо
{const _sw=setWater;setWater=function(z,st,pi){const ok=_sw(z,st,pi);if(!ok||!z.mw||!W||!W.group)return ok;
  const c=new V3((z.minx+z.maxx)/2,z.level+0.05,(z.minz+z.maxz)/2),R=Math.max(z.maxx-z.minx,z.maxz-z.minz)*0.6;
  [0xffe08a,0x9fe6ff,0xffb0d0,0xb8ffb0].forEach((col,i)=>later(i*0.12,()=>{if(!W||!W.group)return;ringFx(c.clone().setY(z.level+0.05),col,R*(0.55+i*0.15));}));
  const from=z.shell?z.shell.g.position.clone().add(new V3(0,2,0)):c.clone().add(new V3(0,0.6,0));
  for(let i=0;i<5;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,transparent:true,depthWrite:false,color:[0xffe08a,0x9fe6ff,0xffb0d0,0xb8ffb0,0xe0c8ff][i]}));
    s.scale.setScalar(0.5);s.raycast=()=>{};s.renderOrder=9;s.position.copy(from);W.group.add(s);const dx=rand(-1.6,1.6),dz=rand(-1.2,1.2),up=st==='high'?1:-0.4;
    later(i*0.09,()=>anim(1.6,k=>{s.position.set(from.x+dx*k,from.y+(1.4+up)*k+Math.sin(k*Math.PI)*0.8,from.z+dz*k);s.material.opacity=1-k;s.material.rotation=Math.sin(k*8)*0.4;if(k>=1&&W&&W.group)W.group.remove(s);}));}
  return ok;};}
