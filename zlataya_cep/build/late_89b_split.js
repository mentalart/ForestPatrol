/* ============================== РЕЛИЗ final06 · ЭКРАН НА ДВОИХ: наклонная линия, тени панелей, настройки ============================== */
// Ядро — в движке (proto/engine/08_zven_tasks_camera.js, SPLIT): когда делить экран, стороны по кадру, линия и доля экрана, «всегда вместе».
// Здесь — то, что нужно только релизу:
// · SPLIT.diag — наклонная линия раздела (как в играх LEGO: поперёк направления между героями). Панель Игрока 1 рисуется прямо на экран
//   своей рамкой, панель Игрока 2 — в текстуру (с MSAA, как холст) и ложится поверх по своей стороне линии. Прямая линия рисуется,
//   как раньше, двумя окнами — без текстуры. Наклонная «сама» — на высокой графике (это вторая отрисовка почти всего экрана).
// · SPLIT.orbitDev — насколько камера игрока повёрнута правым стиком относительно общей: линия уходит к прямой (у камер разный «вперёд»).
// · SPLIT.paneShadow — на высокой графике у каждой панели своя карта теней вокруг своего героя (иначе одна на середину пары, мутная вдали).
// · Настройки: «Экран на двоих» (сам делится / всегда общий / всегда у каждого свой) и «Линия раздела» (сама / наклонная / слева и
//   справа / сверху и снизу) — FIN.set.splitMode, FIN.set.splitLayout.
// Для ботов: FIN.split — {spl: SPLIT, panes(), focus(pi,доля,с), frame() — кадр, draws — сколько раз рисовалась наклонная линия, rt(), shared, rigs, cams, camS}.
if(FIN.set.splitMode===undefined)FIN.set.splitMode='auto';if(FIN.set.splitLayout===undefined)FIN.set.splitLayout='auto';
const SPV={rt:null,w:0,h:0,draws:0,v2:new THREE.Vector2(),sc:new THREE.Scene(),oc:new THREE.OrthographicCamera(-1,1,1,-1,0,1)};
SPV.mat=new THREE.ShaderMaterial({uniforms:{tMap:{value:null},uN:{value:new THREE.Vector2(1,0)},uL:{value:new THREE.Vector3()},uR:{value:new THREE.Vector2(1,1)}},
  vertexShader:'void main(){gl_Position=vec4(position.xy,0.0,1.0);}',
  fragmentShader:'uniform sampler2D tMap;uniform vec2 uN;uniform vec3 uL;uniform vec2 uR;void main(){vec2 p=gl_FragCoord.xy;if(dot(p-uL.xy,uN)<uL.z)discard;gl_FragColor=texture2D(tMap,p/uR);}',
  depthTest:false,depthWrite:false,toneMapped:false});
{const q=new THREE.Mesh(new THREE.PlaneGeometry(2,2),SPV.mat);q.frustumCulled=false;SPV.sc.add(q);}
FIN.split={spl:SPLIT,rt:()=>SPV.rt,get draws(){return SPV.draws;},panes:()=>PANES,focus:splitFocus,frame:()=>render(),shared,rigs,cams,camS,paneHas,sep:splitSep,fr:splitFrame,ground:(x,z)=>groundAt(x,z,99,0).y};
// текстура панели — размером с холст; WebGL2 — со сглаживанием, как у холста (иначе вторая панель «зубастее» первой)
function spvRT(w,h){if(SPV.rt&&SPV.w===w&&SPV.h===h)return SPV.rt;if(SPV.rt)SPV.rt.dispose();SPV.w=w;SPV.h=h;const o={depthBuffer:true,stencilBuffer:true};
  if(renderer.capabilities.isWebGL2&&THREE.WebGLMultisampleRenderTarget){SPV.rt=new THREE.WebGLMultisampleRenderTarget(w,h,o);SPV.rt.samples=4;}else SPV.rt=new THREE.WebGLRenderTarget(w,h,o);
  return SPV.rt;}
SPLIT.diag=function(P,Wd,H,o){const pr=renderer.getPixelRatio(),bs=renderer.getDrawingBufferSize(SPV.v2),BW=bs.x,BH=bs.y,rt=spvRT(BW,BH);SPV.draws++;
  for(const Q of P){const b=Q.box,cam=Q.real;cam.setViewOffset(Wd,H,b[0]+Wd/2-Q.A[0],b[1]+H/2-Q.A[1],b[2],b[3]);cam.updateProjectionMatrix();if(SPLIT.paneShadow)SPLIT.paneShadow(Q.pi);
    if(Q.pi===0){renderer.setViewport(b[0],H-b[1]-b[3],b[2],b[3]);renderer.setScissor(b[0],H-b[1]-b[3],b[2],b[3]);renderer.render(scene,cam);continue;}
    const x=Math.floor(b[0]*pr),y=Math.floor((H-b[1]-b[3])*pr);rt.viewport.set(x,y,Math.min(BW,Math.ceil((b[0]+b[2])*pr))-x,Math.min(BH,Math.ceil((H-b[1])*pr))-y);
    rt.scissor.copy(rt.viewport);rt.scissorTest=true;renderer.setRenderTarget(rt);renderer.render(scene,cam);renderer.setRenderTarget(null);}
  // поверх — панель Игрока 2 по своей стороне линии (в пикселях холста, y снизу)
  const U=SPV.mat.uniforms;U.tMap.value=rt.texture;U.uN.value.set(SPLIT.n.x,-SPLIT.n.y);U.uL.value.set(BW/2,BH/2,o*pr);U.uR.value.set(BW,BH);
  const ac=renderer.autoClear;renderer.autoClear=false;renderer.setViewport(0,0,Wd,H);renderer.setScissor(0,0,Wd,H);
  try{renderer.render(SPV.sc,SPV.oc);}finally{renderer.autoClear=ac;}};
// тени панели: свет и карта теней — вокруг своего героя, карта перерисовывается перед панелью
function spvShadow(pi){const h=active(pi),sc=sun.shadow.camera;sun.target.position.set(h.pos.x,0,h.pos.z);sun.position.copy(sun.target.position).add(W.sunOff);
  if(sc.right!==20){sc.left=-20;sc.right=20;sc.top=20;sc.bottom=-20;sc.updateProjectionMatrix();}renderer.shadowMap.needsUpdate=true;}
SPLIT.orbitDev=()=>{const C=FIN.cam;if(!C||G.solo)return 0;return Math.max(Math.abs(camWrap(C.p[0].yaw-C.s.yaw)),Math.abs(camWrap(C.p[1].yaw-C.s.yaw)));};
function spvSync(){const S=FIN.set;G.splitMode=S.splitMode||'auto';G.splitLayout=S.splitLayout||'auto';SPLIT.autoDyn=S.quality==='high';
  SPLIT.paneShadow=S.quality==='high'&&renderer.shadowMap.enabled?spvShadow:null;}
{const _st=step;step=function(dt){spvSync();_st(dt);};}
spvSync();
// ---------- настройки и «Управление» ----------
const SPLM=['auto','together','apart'],SPLMN={auto:'сам делится',together:'всегда общий',apart:'у каждого свой'},
  SPLMS={auto:'общий, пока вы рядом; разошлись — у каждого своя половина',together:'отставшего Звенышко подтянет к другу',apart:'каждый видит своего героя всегда'};
const SPLL=['auto','dynamic','vertical','horizontal'],SPLLN={auto:'сама',dynamic:'наклонная',vertical:'слева и справа',horizontal:'сверху и снизу'},
  SPLLS={auto:'на высокой графике — наклонная, на узком экране — сверху и снизу',dynamic:'поперёк пути к другу: друг всегда за линией',vertical:'кто левее на экране, тот и слева',horizontal:'кто выше на экране, тот и сверху'};
const spvCyc=(L,v,d)=>L[(Math.max(0,L.indexOf(v))+(d<0?-1:1)+L.length)%L.length];
{const _ss=settingsScreen;settingsScreen=function(){const s=_ss(),S=FIN.set;if(G.solo)return s;const at=s.items.findIndex(it=>it.label==='Джойстики местами');
  const sv=()=>{FIN.saveSettings();spvSync();};
  s.items.splice(at<0?s.items.length-1:at,0,
    {label:'Экран на двоих',val:()=>SPLMN[S.splitMode]||SPLMN.auto,sub:()=>SPLMS[S.splitMode]||SPLMS.auto,side:d=>{S.splitMode=spvCyc(SPLM,S.splitMode,d);sv();}},
    {label:'Линия раздела',val:()=>SPLLN[S.splitLayout]||SPLLN.auto,sub:()=>SPLLS[S.splitLayout]||SPLLS.auto,side:d=>{S.splitLayout=spvCyc(SPLL,S.splitLayout,d);sv();}});
  return s;};}
{const _cs=controlsScreen;controlsScreen=function(){const s=_cs(),h=s.html;
  s.html=()=>h().replace('Пауза — Esc','Экран на двоих и линия раздела — в «Настройках»; за линией — твой друг, у края — сколько до него метров. Пауза — Esc');return s;};}
