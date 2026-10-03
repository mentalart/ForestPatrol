/* ============================== РЕЛИЗ final06 · МИР 2: ПОД ВОДОЙ — КАК ПОД ВОДОЙ ============================== */
// Подводный Китеж (2-1, 2-5 — весь уровень) и подводные участки других уровней мира 2 (W.seaY — высота морской глади: кто ниже — под водой).
// Под водой: каустика — блики от волн бегут по дну, стенам и героям; столбы света сверху; глубинный туман и цвет толщи, светлое «окно» над
// головой; морской снег и цепочки пузырьков со дна; стайки рыб, большие рыбы вдали, медузы; дно — песчаные наносы, ракушки, актинии,
// горгонарии, губки, морские ежи и кораллы вместо травы; падение медленнее (вода держит), из-под лап — муть, звук глуше.
// Каждая половина экрана решает сама: под водой ли её камера (её герой). Над водой всё как было.
const SEA={k:[0,0,0],kv:0,lp:null,bed:null,base:null,dressed:false,parts:null,bub:null,fish:null,big:[],jelly:[],shafts:[],vents:[],U:{caus:{value:0},seaY:{value:1e4}}};FIN.sea=SEA;
const SEA_PAL={bg:new THREE.Color(0x08303e),fog:new THREE.Color(0x0c4252),near:3,far:42,amb:new THREE.Color(0x58a6b6),ai:0.46,sun:new THREE.Color(0xb8eee6),si:0.52,
  top:new THREE.Color(0x6fd2dc),hor:new THREE.Color(0x0f5262),bot:new THREE.Color(0x02121a)};
// весь уровень под водой (тема kitezh) — или только ниже глади W.seaY
const seaAll=()=>!!W&&W.theme==='kitezh'&&!W.seaOff;
const seaDyn=()=>!!W&&W.seaY!=null&&!W.seaOff;
function seaUnder(y){return seaAll()||(seaDyn()&&y<W.seaY-0.25);}
FIN.seaUnder=seaUnder;
// ---------- цвет: тема kitezh — глубже и синее, свет сверху ----------
GRADE.kitezh=[[90,225,255,.2],[0,16,36,.44],1.38];
{const _st=setTheme;setTheme=function(t){_st(t);if(t==='kitezh'){scene.background=SEA_PAL.bg.clone();scene.fog=new THREE.Fog(SEA_PAL.fog.getHex(),SEA_PAL.near,SEA_PAL.far);
    amb.color.copy(SEA_PAL.amb);amb.intensity=SEA_PAL.ai;sun.color.copy(SEA_PAL.sun);sun.intensity=SEA_PAL.si;W.sunOff=new V3(5,36,7);W.grass=M(0x3a7a80);}};}
// ---------- каустика: на всех гранёных материалах, сила — из общей переменной (0 — нет; над гладью — нет) ----------
{const CV='#include <common>\nvarying vec3 vCsW;';
 const CVP='#include <project_vertex>\n\t{ vec4 csw = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\tcsw = instanceMatrix * csw;\n\t#endif\n\tvCsW = ( modelMatrix * csw ).xyz; }';
 const CF='#include <common>\nvarying vec3 vCsW;\nuniform float uCaus;\nuniform float uCausY;\nuniform float uCsT;\n'+
  'float csPat( vec2 p, float t ){ vec2 i = p; float c = 1.0; for( int n = 0; n < 3; n++ ){ float tt = t * ( 1.0 - 3.5 / float( n + 1 ) );'+
  ' i = p + vec2( cos( tt - i.x ) + sin( tt + i.y ), sin( tt - i.y ) + cos( tt + i.x ) );'+
  ' c += 1.0 / length( vec2( p.x / ( sin( i.x + tt ) / 0.005 ), p.y / ( cos( i.y + tt ) / 0.005 ) ) ); }'+
  ' c /= 3.0; c = 1.17 - pow( c, 1.4 ); return pow( abs( c ), 8.0 ); }';
 const CFO='if( uCaus > 0.001 ){ vec3 csN = inverseTransformDirection( normal, viewMatrix ); float csUp = 0.25 + 0.75 * abs( csN.y );'+
  ' float csDp = max( 0.0, uCausY - vCsW.y ); float csD = clamp( ( uCausY - vCsW.y ) * 2.0, 0.0, 1.0 ) * exp( -csDp * 0.03 );'+
  ' float csV = csPat( mod( vCsW.xz * 0.42 + vec2( vCsW.y * 0.11, -vCsW.y * 0.07 ), 6.2831853 ) - 250.0, uCsT * 0.5 + 23.0 );'+
  ' outgoingLight += diffuseColor.rgb * vec3( 0.6, 1.0, 0.92 ) * min( csV * 1.3, 1.5 ) * csUp * csD * uCaus; }\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );';
 const _obc=FIN.LowPolyMat.prototype.onBeforeCompile;
 FIN.LowPolyMat.prototype.onBeforeCompile=function(sh){_obc.call(this,sh);if(this.userData.noCaus)return;sh.uniforms.uCaus=SEA.U.caus;sh.uniforms.uCausY=SEA.U.seaY;sh.uniforms.uCsT=FIN.U.time;
   sh.vertexShader=sh.vertexShader.replace('#include <common>',CV).replace('#include <project_vertex>',CVP);
   sh.fragmentShader=sh.fragmentShader.replace('#include <common>',CF).replace('gl_FragColor = vec4( outgoingLight, diffuseColor.a );',CFO);};
 const _ck=FIN.LowPolyMat.prototype.customProgramCacheKey;FIN.LowPolyMat.prototype.customProgramCacheKey=function(){return _ck.call(this)+(this.userData.noCaus?'':'c');};}
// ---------- кадр: каждая половина экрана — под водой или нет ----------
const SEA_T=new THREE.Color();
function seaViewK(cam){if(!W||!(seaAll()||seaDyn()))return 0;if(seaAll())return 1;const i=cam===camS?2:cams.indexOf(cam);return SEA.k[i<0?2:i];}
function seaApplyView(cam){const k=seaViewK(cam);SEA.kv=k;const B=SEA.base;
  SEA.U.caus.value=(FIN.seaForce||1)*k*(seaAll()?2.1:1.7)*(FIN.set.quality==='low'?0.7:1);SEA.U.seaY.value=seaAll()?(W.seaTop!=null?W.seaTop:16):W.seaY;
  if(seaDyn()&&B){scene.background.copy(B.bg).lerp(SEA_PAL.bg,k);scene.fog.color.copy(B.fog).lerp(SEA_PAL.fog,k);scene.fog.near=lerp(B.near,SEA_PAL.near,k);scene.fog.far=lerp(B.far,SEA_PAL.far,k);
    amb.color.copy(B.amb).lerp(SEA_PAL.amb,k);sun.color.copy(B.sun).lerp(SEA_PAL.sun,k);}
  if(SEA.parts)SEA.parts.p.visible=k>0.05;if(SEA.parts)SEA.parts.p.material.opacity=0.75*k;
  for(const s of SEA.shafts)s.m.visible=k>0.05;for(const o of SEA.hideUnder)o.visible=k<0.5;}
SEA.hideUnder=[];
{const _sob=scene.onBeforeRender;scene.onBeforeRender=function(r,s,cam){if(_sob)_sob.call(this,r,s,cam);try{if(W&&W.world===2)seaApplyView(cam);else if(SEA.U.caus.value){SEA.U.caus.value=0;}}catch(e){console.error('sea view',e);}};}
// небо под водой: светлое «окно» наверху, тёмная бездна внизу
{const _ob=skyDome.onBeforeRender;skyDome.onBeforeRender=function(r,s,cam){_ob.call(this,r,s,cam);const k=W&&W.world===2?seaViewK(cam):0;if(k>0){SKY.top.lerp(SEA_PAL.top,k);SKY.hor.lerp(SEA_PAL.hor,k);SKY.bot.lerp(SEA_PAL.bot,k);}};}
// ---------- спрайты: мягкая точка и пузырёк ----------
function seaPts(n,tex,size,col,add){const pos=new Float32Array(n*3),g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const m=new THREE.PointsMaterial({size,map:atex(tex),color:col,transparent:true,depthWrite:false,blending:add?THREE.AdditiveBlending:THREE.NormalBlending,opacity:0.8,alphaTest:add?0:0.15});
  const p=new THREE.Points(g,m);p.frustumCulled=false;p.userData.dress=true;p.userData.noBatch=true;p.renderOrder=6;return p;}
// ---------- новые предметы кита: актиния, горгонария, губки, ёж, мозговик, амфора, якорь ----------
KIT.anemone=v=>{const R=kRng(901+v*37),K=new KGeo(0.6,v*41+901);const p=[PAL.pink,PAL.coral,PAL.owl,PAL.hedge][v%4];K.add(KP.cyl(0.16,0.2,0.22,6),p,tm(0,0.11,0),{kN:0.3,kG:0.5});
  for(let i=0;i<12;i++){const a=i/12*6.283+R()*0.3,e=0.35+R()*0.5;K.add(KP.cone(0.035,0.42+R()*0.18,3),p,tm(Math.cos(a)*0.12,0.38,Math.sin(a)*0.12,Math.sin(a)*e,0,-Math.cos(a)*e),{kN:0.2,kG:0.9,s:0.3});}return K.build();};
KIT.seafan=v=>{const R=kRng(911+v*43),K=new KGeo(1.4,v*47+911);const p=[PAL.coral,PAL.owl,PAL.yellow][v%3];
  const br=(x,y,l,a,d)=>{const dx=Math.sin(a),dy=Math.cos(a);K.add(KP.cyl(0.025,0.035,l,3),p,tm(x+dx*l/2,y+dy*l/2,0,0,0,-a),{kN:0.2,kG:0.6});if(d>0)for(const s of[-1,1])br(x+dx*l,y+dy*l,l*0.72,a+s*(0.35+R()*0.3),d-1);};
  br(0,0,0.42,0,3);K.add(KP.sph(0.06,5,4),p,tm(0,0.02,0),{kN:0.3});return K.build();};
KIT.sponge=v=>{const R=kRng(921+v*53),K=new KGeo(0.9,v*59+921);const p=[PAL.yellow,PAL.autumn,PAL.owl,PAL.coral][v%4];const n=2+Math.floor(R()*3);
  for(let i=0;i<n;i++){const h=0.3+R()*0.55,r=0.08+R()*0.06,a=R()*6.28,d=i?0.12+R()*0.1:0;K.add(KP.lathe([[r*0.8,0],[r,h*0.2],[r*1.1,h*0.85],[r*1.25,h],[r*0.7,h],[r*0.6,h*0.3],[0,h*0.25]],7),p,tm(Math.cos(a)*d,0,Math.sin(a)*d,(R()-0.5)*0.3,0,(R()-0.5)*0.3),{kN:0.35,kG:0.4,kJ:0.2});}
  return K.build();};
KIT.urchin=v=>{const R=kRng(931+v*61),K=new KGeo(0.3,v*67+931);const p=v%2?PAL.night:PAL.owl;K.add(KP.sph(0.12,6,4),p,tm(0,0.08,0,0,0,0,1,0.75,1),{kN:0.3});
  for(let i=0;i<16;i++){const a=R()*6.283,e=0.2+R()*1.2,dx=Math.sin(e)*Math.cos(a),dy=Math.cos(e),dz=Math.sin(e)*Math.sin(a);const q=new THREE.Quaternion().setFromUnitVectors(new V3(0,1,0),new V3(dx,dy,dz));
    K.add(KP.cone(0.018,0.26,3),p,new THREE.Matrix4().compose(new V3(dx*0.17,0.08+dy*0.13,dz*0.17),q,new V3(1,1,1)),{kN:0.2,s:-0.1});}return K.build();};
KIT.brain=v=>{const K=new KGeo(0.5,v*71+941);const p=[PAL.hedge,PAL.yellow,PAL.pink][v%3];K.add(KP.sph(0.36,8,5),p,tm(0,0,0,0,0,0,1,0.62,1),{noise:0.05,kN:0.45,kJ:0.3});return K.build();};
KIT.amphora=v=>{const K=new KGeo(0.8,v*73+951);const p=v%2?PAL.cliff:PAL.autumn;K.add(KP.lathe([[0,0],[0.1,0.02],[0.2,0.18],[0.24,0.4],[0.18,0.6],[0.08,0.7],[0.09,0.8],[0.12,0.84],[0,0.84]],8),p,tm(0,0.12,0,1.35,v*1.3,0.2),{kN:0.4,kJ:0.15});
  K.add(KP.ico(0.09,0),PAL.kelp,tm(0.1,0.06,0.1,0,0,0,1.6,0.5,1.2),{kN:0.4});return K.build();};
KIT.anchor=v=>{const K=new KGeo(1.6,v*79+961);const p=PAL.iron;K.box(0.08,1.4,0.08,p,tm(0,0.7,0,0,0,0.12),{b:0.02});K.add(KP.tor(0.1,0.03,4,8),p,tm(-0.08,1.45,0,Math.PI/2,0,0));
  K.add(KP.tor(0.5,0.05,4,10,Math.PI),p,tm(0.03,0.55,0,0,0,Math.PI+0.12));K.box(0.6,0.06,0.06,p,tm(-0.02,1.15,0,0,0,0.12),{b:0.02});K.add(KP.ico(0.18,0),PAL.kelp,tm(0.4,0.1,0.1,0,0,0,1.8,0.5,1.2),{kN:0.4});return K.build();};
KIT.fish=v=>{const K=new KGeo(0.4,v*83+971);K.vary=false;const p=PAL.white;
  K.add(KP.sph(0.5,6,4),p,tm(0,0,0,0,0,0,0.32,0.55,1),{kN:0.5,kJ:0.08});K.add(KP.tri([0,0.02,-0.42],[0,0.28,-0.78],[0,-0.24,-0.78]),p,null,{kN:0,s:-0.1});
  K.add(KP.tri([0,0.24,-0.1],[0,0.42,-0.3],[0,0.2,-0.38]),p,null,{kN:0,s:-0.15});return K.build();};
KIT.jelly=v=>{const K=new KGeo(0.8,v*89+981);const p=[PAL.pink,PAL.crystal,PAL.owl][v%3];K.add(KP.lathe([[0,0.42],[0.24,0.38],[0.38,0.22],[0.42,0],[0.3,0.04],[0,0.1]],9),p,null,{kN:0.4,s:0.2});
  for(let i=0;i<6;i++){const a=i/6*6.283;K.add(KP.cyl(0.012,0.006,0.7,3),p,tm(Math.cos(a)*0.22,-0.32,Math.sin(a)*0.22,(i%2?0.2:-0.2),0,0),{s:0.1});}return K.build();};
KIT.bigfish=v=>{const K=new KGeo(1,v*97+991);const p=v%2?PAL.iron:PAL.bark;
  K.add(KP.sph(0.5,8,5),p,tm(0,0,0,0,0,0,0.42,0.42,2.2),{kN:0.5,kJ:0.06});K.add(KP.cone(0.22,0.9,4),p,tm(0,0,-1.45,-Math.PI/2,0,0,1,1,0.25),{kN:0.3});
  K.add(KP.tri([0,0,-1.75],[0,0.55,-2.3],[0,-0.45,-2.25]),p,null,{s:-0.2});K.add(KP.tri([0,0.18,0.1],[0,0.62,-0.5],[0,0.15,-0.7]),p,null,{s:-0.15});
  for(let i=0;i<5;i++)K.add(KP.cone(0.05,0.12,3),PAL.cream,tm(0,0.2,0.8-i*0.38,0,0,0),{s:0.2});
  if(v%2)for(const s of[-1,1])K.add(KP.cyl(0.012,0.006,0.7,3),PAL.bark,tm(s*0.12,-0.15,1.05,0.5,0,s*0.6));return K.build();};
// ---------- пузырьки: пул спрайтов (дыхание героев, цепочки со дна, муть) ----------
function seaBubPool(n){const p=seaPts(n,'bubble',0.2,0xe8fdff,false);const D=[];for(let i=0;i<n;i++)D.push({on:false,x:0,y:-999,z:0,vy:0,ph:0,top:0,t:0});
  return {p,D,n,i:0,emit(x,y,z,vy,top){const d=this.D[this.i];this.i=(this.i+1)%this.n;Object.assign(d,{on:true,x,y,z,vy:vy||1.4,ph:Math.random()*6.28,top:top==null?y+8:top,t:0});}};}
function seaBubTick(B,dt){const a=B.p.geometry.attributes.position.array;for(let i=0;i<B.n;i++){const d=B.D[i];if(d.on){d.t+=dt;d.y+=d.vy*dt;d.x+=Math.sin(G.time*3+d.ph)*dt*0.35;d.z+=Math.cos(G.time*2.3+d.ph)*dt*0.25;if(d.y>d.top)d.on=false;}
    a[i*3]=d.x;a[i*3+1]=d.on?d.y:-999;a[i*3+2]=d.z;}B.p.geometry.attributes.position.needsUpdate=true;}
// ---------- столб света сверху ----------
const SHAFT_VS='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
const SHAFT_FS='uniform float uT;uniform float uO;uniform float uPh;uniform vec3 uC;varying vec2 vUv;void main(){float x=abs(vUv.x-0.5)*2.0;float e=1.0-smoothstep(0.25,1.0,x);'+
  'float v=smoothstep(0.0,0.05,vUv.y)*(0.4+0.6*vUv.y);float n=0.6+0.4*sin(vUv.y*7.0+uT*0.7+uPh)*sin(vUv.x*6.0-uT*0.45+uPh*1.7);gl_FragColor=vec4(uC*e*v*n*uO,1.0);}';
function seaShaft(x,z,y0,w,h,o){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.ShaderMaterial({uniforms:{uT:FIN.U.time,uO:{value:0},uPh:{value:Math.random()*6},uC:{value:new THREE.Color(0xbff6ff)}},
    vertexShader:SHAFT_VS,fragmentShader:SHAFT_FS,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false}));
  m.position.set(x,y0+h/2,z);m.renderOrder=7;m.userData.dress=true;m.userData.noBatch=true;m.frustumCulled=false;const s={m,base:o.op,tilt:o.tilt||0};
  m.onBeforeRender=(r,sc,cam)=>{m.rotation.set(0,Math.atan2(cam.position.x-m.position.x,cam.position.z-m.position.z),s.tilt);m.updateMatrixWorld();
    const d=Math.hypot(cam.position.x-x,cam.position.z-z),f=clamp((d-3)/5,0,1)*clamp((60-d)/22,0,1);m.material.uniforms.uO.value=s.base*f*SEA.kv*(0.8+0.2*Math.sin(G.time*0.6+x));};
  W.group.add(m);SEA.shafts.push(s);return s;}
// ---------- одевание: дно, свет, жизнь ----------
function seaGround(){const R=kRng(seedOf(W.levelId)+77),S=new THREE.Color(0xd8c690),T=new THREE.Color(0x6e8a84);
  for(const g of (W.finG||[])){if(surfKind(g.mat,W.theme)!=='sea')continue;const m=g.mesh;if(!m||!m.geometry.attributes.aShade)continue;const C0=g.mat.color;
    const off=[S.r/Math.max(0.05,C0.r)-1,S.g/Math.max(0.05,C0.g)-1,S.b/Math.max(0.05,C0.b)-1].map(v=>Math.max(-0.85,Math.min(2.5,v)));
    const offT=[T.r/Math.max(0.05,C0.r)-1,T.g/Math.max(0.05,C0.g)-1,T.b/Math.max(0.05,C0.b)-1].map(v=>Math.max(-0.85,Math.min(2.5,v)));
    const pos=m.geometry.attributes.position,A=m.geometry.attributes.aShade,e=m.matrixWorld.elements;let ch=false;
    for(let i=0;i+2<pos.count;i+=3){const y0=pos.getY(i),y1=pos.getY(i+1),y2=pos.getY(i+2);if(Math.max(y0,y1,y2)-Math.min(y0,y1,y2)>0.05)continue;if(g.top<y0+e[13]-0.3)continue;
      const x=(pos.getX(i)+pos.getX(i+1)+pos.getX(i+2))/3+e[12],z=(pos.getZ(i)+pos.getZ(i+1)+pos.getZ(i+2))/3+e[14];
      const edge=Math.min(x-g.minx,g.maxx-x,z-g.minz,g.maxz-z),n=0.5+0.35*n3(Math.round(x*0.45),Math.round(z*0.45),1,7)+0.2*n3(Math.round(x*1.3),Math.round(z*1.3),2,9);
      const f=clamp((n-0.45)*1.8,0,1)*0.75+clamp((1.4-edge)/1.4,0,1)*0.5,ff=Math.min(0.85,Math.max(0,f));
      // основа — тёмный песок дна в бирюзу, наносы у краёв и пятнами — светлый песок
      for(let k2=0;k2<3;k2++)for(let c=0;c<3;c++){const j=(i+k2)*3+c,a=A.array[j],b=offT[c]+a*0.6;A.array[j]=b*(1-ff)+(off[c]+a*0.4)*ff;}ch=true;}
    if(ch)A.needsUpdate=true;}}
function seaDecor(rect){const R=kRng(seedOf(W.levelId)+91),q=FIN.set.quality,dens=q==='low'?0.4:q==='mid'?0.7:1,BL=scatterBlockers(),P=DRESS.path,items=[];
  const G0=(W.finG||[]).filter(g=>(seaAll()||(rect&&g.maxx>rect.minx&&g.minx<rect.maxx&&g.maxz>rect.minz&&g.minz<rect.maxz&&g.top<W.seaY-0.6)));
  const kinds=[['anemone',4,0.7,1.2],['sponge',4,0.8,1.3],['urchin',2,0.9,1.4],['brain',3,0.9,1.5],['coral',4,0.5,0.9],['seafan',3,0.8,1.3],['amphora',2,0.9,1.2]];
  const pick=()=>{let t=0;for(const k of kinds)t+=k[1];let u=R()*t;for(const k of kinds){u-=k[1];if(u<=0)return k;}return kinds[0];};
  for(const g of G0){const w=g.maxx-g.minx,d=g.maxz-g.minz;if(w*d<2)continue;
    // по краям участков — живые «грядки» дна
    const per=2*(w+d),n=Math.floor(per/1.6*dens);for(let i=0;i<n;i++){const u=R()*per,ins=0.3+R()*0.5;let x,z;
      if(u<w){x=g.minx+u;z=g.maxz-ins;}else if(u<w+d){x=g.maxx-ins;z=g.maxz-(u-w);}else if(u<2*w+d){x=g.maxx-(u-w-d);z=g.minz+ins;}else{x=g.minx+ins;z=g.minz+(u-2*w-d);}
      if(R()<0.3||(P&&pathDist(P,x,z)<1.7)||!scatterFree(BL,x,z,g.top,0.35))continue;const k=pick();
      items.push({name:k[0],v:Math.floor(R()*4),x,y:g.top,z,s:k[2]+R()*(k[3]-k[2]),ry:R()*6.283,mat:k[0]==='seafan'||k[0]==='anemone'?'windM':undefined,tint:0.85+R()*0.3});
      if(R()<0.4)items.push({name:R()<0.5?'shell':'starfish',v:Math.floor(R()*3),x:x+R()-0.5,y:g.top,z:z+R()-0.5,s:0.9+R()*0.5,ry:R()*6.283});}
    // кое-где посреди — одинокие кустики дна (не на тропинке)
    const m=Math.floor(w*d*0.012*dens);for(let i=0;i<m;i++){const x=g.minx+0.6+R()*(w-1.2),z=g.minz+0.6+R()*(d-1.2);if((P&&pathDist(P,x,z)<2.2)||!scatterFree(BL,x,z,g.top,0.6))continue;
      const k=R()<0.5?['anemone',0,0.6,0.9]:R()<0.5?['brain',0,0.6,1]:['urchin',0,0.8,1.1];items.push({name:k[0],v:Math.floor(R()*4),x,y:g.top,z,s:k[2]+R()*(k[3]-k[2]),ry:R()*6.283,mat:k[0]==='anemone'?'windM':undefined});}}
  // за стенами улицы: ламинарии, горгонарии, якоря и амфоры в песке
  const B=DRESS.B;if(B&&seaAll()){const len=B.maxz-B.minz;for(let i=0;i<Math.floor(len/2.6*dens);i++){const sd=R()<0.5?-1:1,x=sd>0?B.maxx+0.6+R()*5:B.minx-0.6-R()*5,z=B.minz+R()*len;
      const r=R();items.push(r<0.55?{name:'kelp',v:Math.floor(R()*4),x,y:-0.2,z,s:1.6+R()*1.8,ry:R()*6.283,mat:'windM'}:r<0.8?{name:'seafan',v:Math.floor(R()*3),x,y:-0.1,z,s:1.6+R()*1.4,ry:R()*6.283,mat:'windM'}:
        r<0.9?{name:'anchor',v:0,x,y:-0.25,z,s:1.2+R()*0.6,ry:R()*6.283,rz:0.5+R()*0.6}:{name:'amphora',v:Math.floor(R()*2),x,y:-0.1,z,s:1.4+R()*0.6,ry:R()*6.283});}}
  FIN.instKit(items);return items.length;}
function seaLife(rect){const q=FIN.set.quality,lo=q==='low',B=rect||DRESS.B;if(!B)return;const R=kRng(seedOf(W.levelId)+113);
  const y0=rect?rect.floor:(B.minTop!=null?B.minTop:0),top=rect?W.seaY:y0+16,len=B.maxz-B.minz,wid=B.maxx-B.minx;
  // столбы света
  const ns=Math.min(26,Math.round(len/7));for(let i=0;i<ns;i++)seaShaft(B.minx-3+R()*(wid+6),B.minz+(i+R())*len/ns,y0-1,1.6+R()*3.2,top-y0+14,{op:0.2+R()*0.16,tilt:(R()-0.5)*0.3});
  // морской снег у камеры
  {const n=lo?120:280,p=seaPts(n,'dot',0.09,0xd8f6ee,true);const D=[];for(let i=0;i<n;i++)D.push({x:(R()-0.5)*30,y:R()*14,z:(R()-0.5)*32,ph:R()*6.28,sp:0.5+R()});SEA.parts={p,D,n};W.group.add(p);}
  // пузырьки: дыхание героев и цепочки со дна
  SEA.bub=seaBubPool(lo?90:180);W.group.add(SEA.bub.p);SEA.vents=[];const BL=scatterBlockers(),G0=(W.finG||[]).filter(g=>!rect||(g.maxx>rect.minx&&g.minx<rect.maxx&&g.maxz>rect.minz&&g.minz<rect.maxz&&g.top<W.seaY-0.6));
  for(let i=0,tries=0;SEA.vents.length<Math.min(14,Math.round(len/12))&&tries<200;tries++){const g=G0[Math.floor(R()*G0.length)];if(!g)break;const x=g.minx+0.5+R()*(g.maxx-g.minx-1),z=g.minz+0.5+R()*(g.maxz-g.minz-1);
    if(!scatterFree(BL,x,z,g.top,0.5))continue;SEA.vents.push({x,y:g.top,z,t:R()*2,top:top});}
  // стайки рыб: один меш на всех
  const NS=lo?3:Math.min(7,2+Math.round(len/40)),PER=lo?8:12,N=NS*PER;const im=new THREE.InstancedMesh(kit('fish',0),KMAT.vcD,N);im.frustumCulled=false;im.userData.dress=true;im.castShadow=false;
  const COLS=[[0xc8d8e8,0x9ab0c8],[0xffc040,0xff9a30],[0xe0e8f0,0xff6a50],[0x8ad0e0,0x5aa0c0],[0xf0d080,0xc0a060]],schools=[],cc=new THREE.Color();
  for(let s=0;s<NS;s++){const cx=B.minx+R()*wid,cz=B.minz+(s+0.5)*len/NS,sc={c:new V3(cx,y0+5+R()*4,cz),rx:3+R()*6,rz:3+R()*7,w:(0.12+R()*0.18)*(R()<0.5?-1:1),ph:R()*6.28,y:y0+4.6+R()*4.5,f:[]};
    const cs=COLS[Math.floor(R()*COLS.length)];for(let i=0;i<PER;i++){sc.f.push({o:new V3((R()-0.5)*2.2,(R()-0.5)*1.0,(R()-0.5)*2.2),ph:R()*6.28,s:0.3+R()*0.2});cc.setHex(cs[i%2]);im.setColorAt(s*PER+i,cc);}schools.push(sc);}
  if(im.instanceColor)im.instanceColor.needsUpdate=true;W.group.add(im);SEA.fish={im,schools,PER,m:new THREE.Matrix4(),q:new THREE.Quaternion(),e:new THREE.Euler(),v:new V3(),p:new V3(),sv:new V3()};
  // большие рыбы вдали: осётр и сом
  SEA.big=[];if(!lo)for(let i=0;i<2;i++){const m=new THREE.Mesh(kit('bigfish',i),KMAT.vcD);m.scale.setScalar(1.6+R()*0.8);m.userData.dress=true;m.userData.noBatch=true;m.castShadow=false;W.group.add(m);
    SEA.big.push({m,x:(i?B.maxx+12+R()*6:B.minx-12-R()*6),y:y0+5+R()*5,z0:B.minz,z1:B.maxz,sp:(1.1+R()*0.6)*(i?1:-1),t:R()});}
  // медузы — светятся и дышат
  SEA.jelly=[];const nj=lo?3:Math.min(10,Math.round(len/14));for(let i=0;i<nj;i++){const m=new THREE.Mesh(kit('jelly',i),KMAT.glow);m.userData.dress=true;m.userData.noBatch=true;m.castShadow=false;
    const sd=R()<0.5?-1:1;const j={m,x:sd>0?B.maxx-1-R()*3:B.minx+1+R()*3,y:y0+4+R()*6,z:B.minz+R()*len,ph:R()*6.28,s:0.7+R()*0.6};m.scale.setScalar(j.s);W.group.add(m);SEA.jelly.push(j);}}
// прототипные лучи-цилиндры и шарики-рыбки Китежа заменены новыми
function seaHideProto(){W.group.traverse(o=>{if(!o.isMesh)return;const g=o.geometry,p=g&&g.parameters;
  if(p&&g.type==='CylinderGeometry'&&p.height===40&&o.material&&o.material.blending===THREE.AdditiveBlending)o.visible=false;
  else if(p&&g.type==='SphereGeometry'&&Math.abs(p.radius-0.22)<1e-6&&Math.abs(o.scale.z-1.6)<1e-6&&o.parent&&o.parent!==W.group&&o.parent.children.length===2)o.parent.visible=false;});
  W.group.children.forEach(o=>{if(o.isPoints&&o.material&&o.material.size===0.16&&!o.userData.dress)o.visible=false;});}
// уровень Китежа или с подводным участком: одеть после общего одевания мира
FIN.seaDress=function(rect){if(!W)return;try{if(!rect)seaGround();SEA.decorN=seaDecor(rect);seaLife(rect);SEA.dressed=true;}catch(e){console.error('sea dress',e);}};
{const _ll=loadLevel;loadLevel=function(i){SEA.dressed=false;SEA.parts=null;SEA.bub=null;SEA.fish=null;SEA.big=[];SEA.jelly=[];SEA.shafts=[];SEA.vents=[];SEA.hideUnder=[];SEA.k=[0,0,0];SEA.base=null;
  _ll(i);if(!W||W.world!==2)return;
  if(seaAll()){seaHideProto();FIN.seaDress(null);}
  else if(W.seaY!=null){SEA.base={bg:scene.background.clone(),fog:scene.fog.color.clone(),near:scene.fog.near,far:scene.fog.far,amb:amb.color.clone(),sun:sun.color.clone()};if(W.seaRect)FIN.seaDress(W.seaRect);}};}
// ---------- звук: под водой глуше; тихий гул толщи ----------
function seaAudio(k){if(typeof AC==='undefined'||!AC||!master)return;try{
  if(!SEA.lp){SEA.lp=AC.createBiquadFilter();SEA.lp.type='lowpass';SEA.lp.frequency.value=20000;SEA.lp.Q.value=0.7;master.disconnect();master.connect(SEA.lp);SEA.lp.connect(AC.destination);}
  SEA.lp.frequency.setTargetAtTime(lerp(20000,1500,k),AC.currentTime,0.12);
  if(k>0.05&&!SEA.bed&&AUD.ready()){const s=AC.createBufferSource();s.buffer=AUD.noise;s.loop=true;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=240;const g=AC.createGain();g.gain.value=0;
    s.connect(f);f.connect(g);g.connect(AC.destination);s.start();SEA.bed={s,g};}
  if(SEA.bed)SEA.bed.g.gain.setTargetAtTime(k*0.07*(FIN.set.sfx!=null?FIN.set.sfx:1)*(G.state==='play'?1:0),AC.currentTime,0.3);}catch(e){}}
// ---------- шаг ----------
function seaTick(dt){if(!W||W.world!==2){if(SEA.bed)seaAudio(0);seaVig(0);return;}
  // глубина каждой половины экрана: по своему герою (общий экран — по середине между героями)
  if(seaDyn()){const ys=[0,1].map(pi=>active(pi).pos.y),cy=G.cine&&G.cine.cam&&typeof shared!=='undefined'?shared.look.y:(ys[0]+ys[1])/2;
    const tg=[ys[0],ys[1],cy].map(y=>y<W.seaY-0.4?1:0);for(let i=0;i<3;i++)SEA.k[i]=damp(SEA.k[i],tg[i],4,dt);}
  const kAll=seaAll()?1:G.split>0.5?Math.max(SEA.k[0],SEA.k[1]):SEA.k[2];seaAudio(kAll);seaVig(kAll);
  if(!SEA.dressed)return;const f=ATMO.focus;
  // морской снег
  const P=SEA.parts;if(P){const a=P.p.geometry.attributes.position.array;for(let i=0;i<P.n;i++){const d=P.D[i];d.y-=dt*0.12*d.sp;d.x+=Math.sin(G.time*0.4*d.sp+d.ph)*dt*0.18;d.z+=Math.cos(G.time*0.33*d.sp+d.ph)*dt*0.14;
      if(d.y<0)d.y+=14;let x=f.x+d.x,z=f.z+d.z;if(d.x<-15)d.x+=30;if(d.x>15)d.x-=30;if(d.z<-16)d.z+=32;if(d.z>16)d.z-=32;a[i*3]=x;a[i*3+1]=f.y-2+d.y;a[i*3+2]=z;}P.p.geometry.attributes.position.needsUpdate=true;}
  // пузырьки: со дна цепочками; герои под водой дышат
  const B=SEA.bub;if(B){for(const v of SEA.vents){v.t-=dt;if(v.t<=0){v.t=0.22+Math.random()*0.3;if(Math.hypot(v.x-f.x,v.z-f.z)<40)B.emit(v.x+(Math.random()-0.5)*0.15,v.y+0.1,v.z+(Math.random()-0.5)*0.15,1.2+Math.random()*0.8,v.top);}}
    for(const h of HEROES){if(h.hidden||!h.g.visible||!seaUnder(h.pos.y+1))continue;h.seaBr=(h.seaBr||Math.random()*2)-dt;if(h.seaBr<=0){h.seaBr=1.6+Math.random()*2.2;const n=2+Math.floor(Math.random()*3);
        for(let i=0;i<n;i++)later(i*0.09,()=>{if(SEA.bub)SEA.bub.emit(h.pos.x+Math.sin(h.face)*0.3,h.pos.y+h.d.height*0.9,h.pos.z+Math.cos(h.face)*0.3,1.0+Math.random()*0.5,h.pos.y+h.d.height+6);});}}
    seaBubTick(B,dt);}
  // стайки
  const F=SEA.fish;if(F){let n=0;for(const s of F.schools){s.ph+=dt*s.w;const cx=s.c.x+Math.cos(s.ph)*s.rx,cz=s.c.z+Math.sin(s.ph)*s.rz,cy=s.y+Math.sin(s.ph*2.3)*0.6;
      const vx=-Math.sin(s.ph)*s.rx*s.w,vz=Math.cos(s.ph)*s.rz*s.w;const yaw=Math.atan2(vx,vz);
      for(const fi of s.f){const t=G.time*0.6+fi.ph;F.p.set(cx+fi.o.x+Math.sin(t)*0.3,cy+fi.o.y+Math.sin(t*1.7)*0.15,cz+fi.o.z+Math.cos(t*0.8)*0.3);
        F.e.set(Math.sin(t*1.3)*0.1,yaw+Math.sin(t*2.1)*0.25,0);F.q.setFromEuler(F.e);F.sv.setScalar(fi.s);F.m.compose(F.p,F.q,F.sv);F.im.setMatrixAt(n++,F.m);}}
    F.im.instanceMatrix.needsUpdate=true;}
  for(const b of SEA.big){b.t+=dt*b.sp/Math.max(1,b.z1-b.z0);const u=((b.t%1)+1)%1,z=b.z0+(b.sp>0?u:1-u)*(b.z1-b.z0+40)-20;b.m.position.set(b.x+Math.sin(G.time*0.3+b.y)*2,b.y+Math.sin(G.time*0.5)*0.4,z);b.m.rotation.set(0,b.sp>0?0:Math.PI,Math.sin(G.time*0.8)*0.04);}
  for(const j of SEA.jelly){j.ph+=dt;const k=Math.sin(j.ph*1.6);j.m.position.set(j.x+Math.sin(j.ph*0.3)*0.8,j.y+Math.sin(j.ph*0.5)*1.2,j.z+Math.cos(j.ph*0.25)*0.8);j.m.scale.set(j.s*(1+0.08*k),j.s*(1-0.1*k),j.s*(1+0.08*k));}}
// толща воды по краям кадра: тёмная бирюза, светлее сверху
function seaVig(k){let v=SEA.vig;if(!v){const fv=document.getElementById('finVig');if(!fv)return;v=SEA.vig=document.createElement('div');v.id='seaVig';
    v.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;background:radial-gradient(ellipse at 50% 38%,rgba(0,0,0,0) 42%,rgba(0,34,48,.38) 78%,rgba(0,14,26,.7) 100%),linear-gradient(180deg,rgba(120,230,240,.12),rgba(0,0,0,0) 38%)';fv.parentNode.insertBefore(v,fv.nextSibling);}
  const o=(k*(G.state==='play'?1:0)).toFixed(2);if(v._o!==o){v._o=o;v.style.opacity=o;}}
{const _step=step;step=function(dt){_step(dt);try{seaTick(dt);}catch(e){console.error('sea',e);}};}
// ---------- вода держит: под водой падаешь медленнее, при посадке со дна поднимается муть ----------
{const _int=integrate;integrate=function(h,dt){const was=h.grounded,vy=h.vel.y,under=W&&W.world===2&&seaUnder(h.pos.y+0.5);
  if(under&&!h.grounded&&h.vel.y<0&&!h.cling)h.vel.y+=GRAV*dt*0.2;
  _int(h,dt);if(!under)return;if(h.vel.y<-10.5)h.vel.y=-10.5;
  if(!was&&h.grounded&&vy<-5.5&&!(h.groundRef&&h.groundRef.water)&&h.g.visible){burst(h.pos.clone().add(new V3(0,0.15,0)),0xd8c89a,5,1.4,0.7);if(SEA.bub)for(let i=0;i<3;i++)SEA.bub.emit(h.pos.x+(Math.random()-0.5)*0.6,h.pos.y+0.2,h.pos.z+(Math.random()-0.5)*0.6,1.1,h.pos.y+4);}};}
// под водой в участке с гладью (W.seaY) — пузырь воздуха вокруг героя, как в Китеже
{const _hw=heroW2;heroW2=function(h,dt){if(W&&W.seaY!=null&&!W.bubbles0){const was=W.bubbles;W.bubbles=!!was||seaUnder(h.pos.y+0.6);_hw(h,dt);W.bubbles=was;return;}_hw(h,dt);};}
