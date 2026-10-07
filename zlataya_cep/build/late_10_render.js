/* ============================== РЕЛИЗ · СВЕТ, НЕБО, ГОРИЗОНТ, КАЧЕСТВО ============================== */
// тема уровня запоминается: по ней выбираются силуэты на горизонте, трава и камешки
// final03: солнце — под 45° (тени читаются, свет «промо-кадра»), экспозиция ACES и цветокоррекция — по миру
const GRADE={evening:[[120,150,255,.14],[40,20,90,.2],1.5],forest:[[210,245,190,.13],[20,60,70,.18],1.45],swamp:[[190,220,150,.12],[40,50,30,.2],1.45],dark:[[150,190,220,.1],[10,30,50,.22],1.5],
  barn:[[255,200,140,.16],[60,30,10,.2],1.45],kitezh:[[140,255,240,.14],[0,40,70,.2],1.4],sea:[[255,245,220,.12],[40,120,200,.12],1.32],belly:[[255,170,170,.14],[60,0,20,.2],1.45],
  whirl:[[200,255,240,.12],[20,60,80,.18],1.4],heaven:[[255,230,190,.16],[90,60,170,.2],1.5],skynight:[[180,190,255,.12],[20,20,70,.22],1.55],smorodina:[[255,190,120,.16],[90,20,10,.22],1.38],
  forgein:[[255,170,100,.16],[60,10,0,.24],1.45],valy:[[255,210,160,.14],[80,40,30,.18],1.4],buyan:[[255,245,220,.12],[50,110,160,.12],1.32],egg:[[255,230,150,.16],[80,50,0,.2],1.4],
  terem:[[200,180,255,.12],[20,10,40,.24],1.55],dawn:[[255,200,190,.16],[80,90,160,.14],1.4],skyday:[[255,250,230,.12],[120,160,230,.12],1.32],sunset:[[255,214,168,.16],[70,44,120,.16],1.4]};
// тонмаппинг: кривая ACES (аппроксимация Нарковича) по яркости, цвет сохраняет насыщенность — пастели нет, блики мягко сворачиваются
THREE.ShaderChunk.tonemapping_pars_fragment=THREE.ShaderChunk.tonemapping_pars_fragment.replace(/vec3 CustomToneMapping\( vec3 color \) \{[^}]*\}/,
  'vec3 CustomToneMapping( vec3 color ) { color *= toneMappingExposure; float L = max( dot( color, vec3( 0.2126, 0.7152, 0.0722 ) ), 1e-4 );'+
  ' float T = clamp( ( L * ( 2.51 * L + 0.03 ) ) / ( L * ( 2.43 * L + 0.59 ) + 0.14 ), 0.0, 1.0 ); vec3 c = color * ( T / L );'+
  ' c = mix( vec3( T ), c, 1.06 - 0.36 * smoothstep( 0.75, 1.0, T ) ); return clamp( c, 0.0, 1.0 ); }');
FIN.exposure=1;renderer.toneMapping=THREE.CustomToneMapping;renderer.toneMappingExposure=FIN.exposure;
{const _setTheme=setTheme;setTheme=function(t){if(W)W.theme=t;_setTheme(t);
  if(W&&W.sunOff){const o=W.sunOff,hz=Math.hypot(o.x,o.z)||1,L=Math.max(24,o.length());W.sunOff=new V3(o.x/hz*L*0.7071,L*0.7071,o.z/hz*L*0.7071);}
  const g=GRADE[t]||GRADE.sunset,rg=a=>'rgba('+a[0]+','+a[1]+','+a[2]+','+a[3]+')',el=$('finGrade');if(el)el.style.background='linear-gradient(180deg,'+rg(g[0])+',rgba(255,255,255,0) 45%,'+rg(g[1])+')';
  FIN.exposure=1+(g[2]-1.4)*0.55;renderer.toneMappingExposure=FIN.exposure;};}
// полусферный свет: сверху — небо, снизу — отсвет земли; ровный «эмбиент» слабее, солнце сильнее — грани читаются
const hemi=new THREE.HemisphereLight(0xffffff,0x404040,0);scene.add(hemi);
const SKY={top:new THREE.Color(),hor:new THREE.Color(),bot:new THREE.Color(),hsl:{h:0,s:0,l:0}};
const skyMat=new THREE.ShaderMaterial({uniforms:{top:{value:SKY.top},hor:{value:SKY.hor},bot:{value:SKY.bot},sunDir:{value:new V3(0,0.3,-1)},sunCol:{value:new THREE.Color(1,0.86,0.62)}},
  vertexShader:'varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader:'uniform vec3 top,hor,bot,sunCol;uniform vec3 sunDir;varying vec3 vP;void main(){vec3 d=normalize(vP);float y=d.y;vec3 c=y>0.0?mix(hor,top,pow(smoothstep(0.0,0.7,y),0.75)):mix(hor,bot,smoothstep(0.0,-0.2,y));float s=max(dot(d,normalize(sunDir)),0.0);c+=sunCol*(pow(s,48.0)*0.4+pow(s,5.0)*0.12);gl_FragColor=vec4(c,1.0);}',
  side:THREE.BackSide,depthWrite:false,depthTest:false,fog:false});
const skyDome=new THREE.Mesh(new FIN.orig.Sphere(290,32,16),skyMat);skyDome.renderOrder=-20;skyDome.frustumCulled=false;scene.add(skyDome);
const followCam=m=>{m.onBeforeRender=(r,s,cam)=>{m.position.set(cam.position.x,m.userData.y0===undefined?cam.position.y:cam.position.y+m.userData.y0,cam.position.z);m.updateMatrixWorld();};};
followCam(skyDome);
// силуэты на горизонте: два хребта (дальний светлее), форма — по теме мира
const HOR={kind:null,meshes:[]};
const horKind=t=>({forest:'fir',dark:'fir',swamp:'fir',evening:'fir',dawn:'hill',valy:'hill',smorodina:'peak',forgein:null,sea:'isle',buyan:'isle',whirl:'isle',heaven:'cloud',skynight:'cloud',skyday:'cloud',kitezh:null,belly:null,barn:null,terem:null,egg:null})[t];
function ridgeGeo(R,base,h,n,spiky,seed){const pos=[];let rs=seed||1;const rnd=()=>{rs=(rs*16807)%2147483647;return (rs-1)/2147483646;};
  const ph=[rnd()*6.3,rnd()*6.3,rnd()*6.3],H=[];for(let i=0;i<=n;i++){const a=i/n*Math.PI*2;let y=h*(0.55+0.25*Math.sin(a*3+ph[0])+0.14*Math.sin(a*7+ph[1])+0.08*Math.sin(a*13+ph[2]));if(spiky)y+=(i%2?-1:1)*h*0.22*rnd();H.push(Math.max(h*0.15,y));}
  for(let i=0;i<n;i++){const a0=i/n*Math.PI*2,a1=(i+1)/n*Math.PI*2,x0=Math.sin(a0)*R,z0=Math.cos(a0)*R,x1=Math.sin(a1)*R,z1=Math.cos(a1)*R;
    pos.push(x0,base,z0,x1,base,z1,x1,H[i+1],z1, x0,base,z0,x1,H[i+1],z1,x0,H[i],z0);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));return g;}
function cloudBank(R,n,seed){const g=new THREE.Group();let rs=seed;const rnd=()=>{rs=(rs*16807)%2147483647;return (rs-1)/2147483646;};
  const m=new THREE.MeshBasicMaterial({color:0xffffff,fog:false,depthWrite:false,depthTest:false,toneMapped:false});
  for(let i=0;i<n;i++){const a=rnd()*Math.PI*2,r=R*(0.9+rnd()*0.15),s=8+rnd()*16;const c=new THREE.Mesh(new FIN.orig.Icosa(s,0),m);c.position.set(Math.sin(a)*r,-6+rnd()*6,Math.cos(a)*r);c.scale.set(1.6,0.55,1);c.renderOrder=-17;g.add(c);}
  return {g,m};}
function buildHorizon(){const k=horKind(W&&W.theme)||(W&&W.theme===undefined?'hill':null);if(k===HOR.kind)return;HOR.meshes.forEach(m=>{scene.remove(m.o);disposeTree(m.o);m.m.dispose();});HOR.meshes=[];HOR.kind=k;if(!k)return;
  if(k==='cloud'){const b=cloudBank(230,34,7);b.g.userData.y0=-14;followCam(b.g);b.g.onBeforeRender=null;scene.add(b.g);HOR.meshes.push({o:b.g,m:b.m,mix:0.15,cloud:true});return;}
  const L=k==='fir'?[[235,34,64,false,0.35],[200,18,120,true,0.62]]:k==='peak'?[[230,60,40,true,0.3],[195,26,70,true,0.6]]:k==='isle'?[[240,14,26,false,0.3],[205,7,40,false,0.5]]:[[235,30,48,false,0.3],[200,15,72,false,0.55]];
  L.forEach(([R,h,n,sp,mix],i)=>{const m=new THREE.MeshBasicMaterial({color:0x888888,fog:false,depthWrite:false,depthTest:false,side:THREE.DoubleSide,toneMapped:false});
    const o=new THREE.Mesh(ridgeGeo(R,-30,h,n,sp,11+i*7),m);o.renderOrder=-18+i;o.frustumCulled=false;o.userData.y0=-8;followCam(o);scene.add(o);HOR.meshes.push({o,m,mix,near:i===1});});}
// кадр: цвета неба из темы, свет перебалансирован на время отрисовки (логика уровней работает со старыми числами)
const WH=new THREE.Color(1,1,1),TMPC=new THREE.Color(),HEMI_SKY=new THREE.Color(0.62,0.78,1.0),HEMI_GND=new THREE.Color(0.56,0.42,0.3);
{const _render=render;render=function(){
  if(FIN.tickUI)FIN.tickUI();if(FIN.titleOn&&FIN.title){FIN.title.render();return;}
  const bg=scene.background&&scene.background.isColor?scene.background:null;skyDome.visible=!!bg;
  if(bg){const fc=scene.fog?scene.fog.color:bg;SKY.hor.copy(fc).lerp(WH,0.06);bg.getHSL(SKY.hsl);SKY.top.setHSL((SKY.hsl.h+0.015)%1,Math.min(1,SKY.hsl.s*1.15+0.04),SKY.hsl.l*0.7);SKY.bot.copy(fc).multiplyScalar(0.82);
    if(W&&W.sunOff)skyMat.uniforms.sunDir.value.copy(W.sunOff);
    for(const h of HOR.meshes){h.o.visible=true;if(h.cloud)h.m.color.copy(SKY.hor).lerp(WH,0.55);else h.m.color.copy(SKY.hor).lerp(SKY.top,h.mix*0.5).multiplyScalar(1-h.mix*0.45);}}
  else for(const h of HOR.meshes)h.o.visible=false;
  const a=amb.intensity,s=sun.intensity;hemi.color.copy(amb.color).lerp(SKY.top,0.3).lerp(HEMI_SKY,0.22);
  TMPC.copy(W&&W.grass&&W.grass.color?W.grass.color:SKY.bot);hemi.groundColor.copy(TMPC).multiplyScalar(0.6).lerp(amb.color,0.3).lerp(HEMI_GND,0.2);
  hemi.intensity=a*0.82;amb.intensity=a*0.3;sun.intensity=s*1.22;
  _render();amb.intensity=a;sun.intensity=s;};}
// качество графики: тени, их мягкость и чёткость картинки
FIN.applyQuality=function(){const q=FIN.set.quality;const pr=Math.min(window.devicePixelRatio||1,q==='high'?1.5:q==='mid'?1.25:1);renderer.setPixelRatio(pr);renderer.setSize(innerWidth,innerHeight,false);
  const sh=q!=='low';renderer.shadowMap.enabled=sh;sun.castShadow=sh;renderer.shadowMap.type=q==='high'?THREE.PCFSoftShadowMap:THREE.PCFShadowMap;
  const ms=q==='high'?2048:1024;if(sun.shadow.mapSize.x!==ms){sun.shadow.mapSize.set(ms,ms);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null;}}
  scene.traverse(o=>{if(o.material)[].concat(o.material).forEach(m=>{m.needsUpdate=true;});});};
