/* ============================== РЕЛИЗ final07 · СОВМЕСТИМОСТЬ: Three r186 + WebGPU под кодом, написанным для r128 ============================== */
// Отдельный скрипт сразу после Three r186 (сборка `build_final.py --gpu`), до кода прототипа. Прототип и модули final06 писались
// под r128 и WebGLRenderer; здесь — всё, чтобы тот же код работал на WebGPURenderer (а где WebGPU нет — на его запасном WebGL2):
//  1. цвет и свет как в r128: без управления цветом, вывод без sRGB, «старая» яркость источников (×π) и затухание точечных
//     источников по формуле r128 — числа цветов и света в игре подбирались под это;
//  2. удалённые в r144 имена *BufferGeometry, флаги материалов r128 (skinning, morphTargets), заглушка ShaderChunk;
//  3. стандартные материалы — их узловые версии (те же параметры), на них ставятся шейдеры TSL (gpu_early.js);
//  4. ShaderMaterial: GLSL под WebGPU не работает — материал ищется в каталоге переводов на TSL (FIN_GPU.port, по тексту
//     шейдера); у перевода те же uniforms, их значения меняет код игры как раньше. Без перевода материал не рисуется,
//     а его имя попадает в FIN_GPU.missing (бот tfin_gpu требует пустой список);
//  5. точки крупнее пикселя: в WebGPU точки только в 1 px, поэтому Points рисует вложенный спрайт с экземплярами — по квадрату
//     на точку, позиции и цвета берутся из той же геометрии;
//  6. new THREE.WebGLRenderer(...) создаёт WebGPURenderer: `?webgl` в адресе (или браузер без WebGPU) — запасной WebGL2.
//     Кадры до готовности устройства пропускаются.
(function(){
const T=window.THREE;if(!T||!T.WebGPURenderer)return;const L=T.TSL,PI=Math.PI;
const G=window.FIN_GPU={backend:null,missing:[],ports:[],warned:{},ready:false,renderer:null,forceGL:/[?&]webgl(\b|=)/.test(location.search)||!navigator.gpu};
// ---------- 0. браузеры: r186 пишет swizzle:'rgba' (новая запись спецификации), Chrome до ~142 ждёт словарь и падает на createView ----------
if(window.GPUTexture&&!GPUTexture.prototype._finSw){const cv=GPUTexture.prototype.createView;GPUTexture.prototype._finSw=true;
  GPUTexture.prototype.createView=function(d){if(d&&typeof d.swizzle==='string'){d=Object.assign({},d);const sw=d.swizzle;delete d.swizzle;
      if(sw!=='rgba'){try{return cv.call(this,Object.assign({},d,{swizzle:sw}));}catch(e){const c=sw.split('');try{return cv.call(this,Object.assign({},d,{swizzle:{r:c[0],g:c[1],b:c[2],a:c[3]}}));}catch(e2){}}}}
    return cv.call(this,d);};}
// ---------- 1. цвет и свет как в r128 ----------
T.ColorManagement.enabled=false;
{const up=T.AnalyticLightNode.prototype.update;T.AnalyticLightNode.prototype.update=function(f){up.call(this,f);this.color.multiplyScalar(PI);};
 const hu=T.HemisphereLightNode.prototype.update;T.HemisphereLightNode.prototype.update=function(f){hu.call(this,f);this.groundColorNode.value.multiplyScalar(PI);};}
// точечный источник: затухание r128 — (1 − d/дальность)^decay, decay по умолчанию 1
class LegacyPointLightNode extends T.PointLightNode{
  setupDirect(builder){const lv=this.getLightVector(builder),d=lv.length(),c=this.cutoffDistanceNode,k=this.decayExponentNode;
    const att=L.select(c.greaterThan(0).and(k.greaterThan(0)),L.pow(L.saturate(d.div(c).oneMinus()),k),L.float(1));
    return {lightDirection:lv.normalize(),lightColor:this.colorNode.mul(att)};}}
{const PL=T.PointLight;class PointLight extends PL{constructor(color,intensity,distance=0,decay=1){super(color,intensity,distance,decay);}}T.PointLight=PointLight;G.PointLightClasses=[PL,PointLight];}
// ---------- 2. имена r128 ----------
['Box','Sphere','Cylinder','Cone','Plane','Circle','Torus','TorusKnot','Ring','Dodecahedron','Icosahedron','Octahedron','Tetrahedron','Lathe','Extrude','Shape','Tube','Polyhedron','Capsule']
  .forEach(n=>{if(T[n+'Geometry']&&!T[n+'BufferGeometry'])T[n+'BufferGeometry']=T[n+'Geometry'];});
['skinning','morphTargets','morphNormals'].forEach(k=>{if(!(k in T.Material.prototype))T.Material.prototype[k]=false;});
T.ShaderChunk=T.ShaderChunk||new Proxy({},{get:(o,k)=>k in o?o[k]:''});
// ---------- 3. стандартные материалы → узловые ----------
G.orig={};
[['MeshBasicMaterial','MeshBasicNodeMaterial'],['MeshLambertMaterial','MeshLambertNodeMaterial'],['MeshPhongMaterial','MeshPhongNodeMaterial'],['MeshStandardMaterial','MeshStandardNodeMaterial'],
 ['MeshPhysicalMaterial','MeshPhysicalNodeMaterial'],['MeshToonMaterial','MeshToonNodeMaterial'],['MeshNormalMaterial','MeshNormalNodeMaterial'],['MeshMatcapMaterial','MeshMatcapNodeMaterial'],
 ['PointsMaterial','PointsNodeMaterial'],['SpriteMaterial','SpriteNodeMaterial'],['LineBasicMaterial','LineBasicNodeMaterial'],['LineDashedMaterial','LineDashedNodeMaterial'],['ShadowMaterial','ShadowNodeMaterial']]
  .forEach(([a,b])=>{if(T[b]){G.orig[a]=T[a];T[a]=T[b];}});
// ---------- 4. ShaderMaterial → перевод на TSL ----------
// мост к uniforms: код игры пишет u.value — значение уходит в узел TSL (векторы и цвета — тот же объект)
// тип берётся из объявления в GLSL (нужен, когда значение пока null: текстура появится позже)
const EMPTY_TEX=new T.DataTexture(new Uint8Array([0,0,0,255]),1,1);EMPTY_TEX.needsUpdate=true;
const glslType=(src,k)=>{const m=new RegExp('uniform\\s+(\\w+)\\s+(?:[\\w,\\s]*?\\b)?'+k+'\\b').exec(src||'');return m?m[1]:null;};
const defOf=t=>t==='vec2'?new T.Vector2():t==='vec3'?new T.Vector3():t==='vec4'?new T.Vector4():t==='mat3'?new T.Matrix3():t==='mat4'?new T.Matrix4():0;
// общий объект uniform (FIN.U.time, ETH.uni…) у нескольких материалов — один узел на всех: иначе второй материал перехватил бы значения первого
G.bridge=function(uniforms,src){const out={};for(const k in uniforms||{}){const u=uniforms[k];if(!u||typeof u!=='object')continue;if(u.__gpuNode){out[k]=u.__gpuNode;continue;}const v=u.value;let n;const ty=glslType(src,k);
    if((v&&v.isTexture)||ty==='sampler2D'){n=L.texture(v&&v.isTexture?v:EMPTY_TEX);const tn=n;Object.defineProperty(u,'value',{get:()=>tn.value===EMPTY_TEX?null:tn.value,set:x=>{tn.value=x||EMPTY_TEX;},configurable:true,enumerable:true});Object.defineProperty(u,'__gpuNode',{value:n,enumerable:false});out[k]=n;continue;}
    else if(Array.isArray(v))n=L.uniformArray(v);
    else n=L.uniform(v===undefined||v===null?defOf(ty):v);
    if(!Array.isArray(v))Object.defineProperty(u,'value',{get:()=>n.value,set:x=>{n.value=x;},configurable:true,enumerable:true});
    Object.defineProperty(u,'__gpuNode',{value:n,enumerable:false});
    out[k]=n;}return out;};
// перевод: test(текст шейдера, параметры) → make(параметры, узлы uniforms) возвращает узловой материал
G.port=function(name,test,make){G.ports.push({name,test,make});};
const MAT_KEYS=['transparent','opacity','side','depthWrite','depthTest','blending','blendSrc','blendDst','blendEquation','alphaTest','visible','toneMapped','polygonOffset','polygonOffsetFactor','polygonOffsetUnits','colorWrite','premultipliedAlpha','wireframe','name'];
// UniformsUtils (в сборке WebGPU его нет): копия uniforms — значения клонируются
const cloneU=src=>{const d={};for(const k in src||{}){d[k]={};for(const q in src[k]){const v=src[k][q];
    d[k][q]=v&&(v.isColor||v.isMatrix3||v.isMatrix4||v.isVector2||v.isVector3||v.isVector4||v.isTexture||v.isQuaternion)?v.clone():Array.isArray(v)?v.slice():v;}}return d;};
T.UniformsUtils=T.UniformsUtils||{clone:cloneU,merge:us=>{const m={};for(const u of us){const c=cloneU(u);for(const k in c)m[k]=c[k];}return m;}};
// UniformsLib: модули подмешивают uniforms тумана в свой шейдер; в WebGPU туман сцены материал берёт сам — здесь только объекты-заглушки
T.UniformsLib=T.UniformsLib||{fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new T.Color(0xffffff)}},common:{},lights:{},points:{},sprite:{}};
const NODE_SLOTS=['colorNode','opacityNode','positionNode','vertexNode','fragmentNode','outputNode','emissiveNode','maskNode','alphaTestNode','normalNode','depthNode','sizeNode','rotationNode','scaleNode','backdropNode','backdropAlphaNode'];
function makeShader(p,raw){p=p||{};const src=(p.vertexShader||'')+'\n/**/\n'+(p.fragmentShader||'');
  for(const P of G.ports){let ok=false;try{ok=P.test(src,p);}catch(e){}if(!ok)continue;
    const m=P.make(p,G.bridge(p.uniforms,src),src);for(const k of MAT_KEYS)if(p[k]!==undefined&&k!=='name')m[k]=p[k];
    // как в r128: свой шейдер без тонмаппинга и тумана, если в GLSL нет их кусков
    m.fog=!!p.fog&&src.includes('#include <fog_fragment>');m._finNoTM=!src.includes('#include <tonemapping_fragment>');m.extensions=p.extensions||{};m.isShaderMaterial=!raw;m.isRawShaderMaterial=!!raw;m.gpuPort=P.name;
    // новые uniforms (mt.uniforms=UniformsUtils.clone(...)) — узлы строятся заново на них; clone() — тот же перевод с копией uniforms
    let cur=p.uniforms||{};Object.defineProperty(m,'uniforms',{get:()=>cur,set:v=>{if(v===cur)return;cur=v||{};const m2=P.make(p,G.bridge(cur,src),src);for(const k of NODE_SLOTS)if(k in m2)m[k]=m2[k];m.needsUpdate=true;},configurable:true});
    m.clone=function(){const c=makeShader(Object.assign({},p,{uniforms:cloneU(cur)}),raw);for(const k of MAT_KEYS)if(this[k]!==undefined)c[k]=this[k];c.userData=JSON.parse(JSON.stringify(this.userData||{}));return c;};
    return m;}
  const key=src.replace(/\s+/g,' ').slice(0,160);if(!G.warned[key]){G.warned[key]=1;G.missing.push(key);console.warn('final07: нет перевода шейдера на TSL —',key);}
  const m=new T.MeshBasicNodeMaterial({visible:false});m.uniforms=p.uniforms||{};m.extensions={};m.isShaderMaterial=true;m.gpuPort=null;return m;}
T.ShaderMaterial=function(p){return makeShader(p,false);};T.RawShaderMaterial=function(p){return makeShader(p,true);};
// ---------- 5. точки крупнее пикселя — спрайт с экземплярами ----------
// атрибут геометрии точек — по экземпляру: WebGL2 берёт делитель у самого атрибута, поэтому он помечается как экземплярный
// (геометрию точек рисует только этот спрайт — Points сам больше не рисуется)
G.instAttr=a=>{if(!a.isInstancedBufferAttribute){a.isInstancedBufferAttribute=true;a.meshPerAttribute=1;}return L.instancedBufferAttribute(a);};
{const P0=T.Points;
 class Points extends P0{constructor(g,m){super(g,m);this.isPoints=false;this.isGPoints=true;const s=new T.Sprite();s.frustumCulled=false;s.raycast=()=>{};s.castShadow=false;s.userData.gpoints=true;
     this._spr=s;this.add(s);s.onBeforeRender=()=>this._gsync();this._gsync();}
   _gsync(){const s=this._spr,g=this.geometry,m=this.material;if(!g||!m||!g.attributes.position)return;
     if(m._gpPos&&m._gpPos!==g.attributes.position&&m._gpOwner!==this){if(!this._ownMat){this._ownMat=m.clone();}}   // один материал на разные геометрии — своя копия
     const mm=this._ownMat&&m._gpOwner!==this?this._ownMat:m;if(mm._gpOwner===undefined)mm._gpOwner=this;
     if(mm!==m){for(const k of ['opacity','visible','size','transparent'])mm[k]=m[k];if(m.color)mm.color.copy(m.color);}
     const pa=g.attributes.position;mm._gpGeo=g;if(mm._gpCustom){if(mm._builtFor!==g)mm.needsUpdate=true;}   // свой шейдер точек (gpu_shaders.js) строит узлы сам
     else if(mm._gpPos!==pa){mm._gpPos=pa;mm.positionNode=G.instAttr(pa);
       const ca=g.attributes.color;if(ca&&m.vertexColors){const cn=G.instAttr(ca);mm.colorNode=L.vec4(L.materialColor).mul(L.vec4(L.vec3(cn.xyz),1));mm.vertexColors=false;}mm.needsUpdate=true;}
     if(s.material!==mm)s.material=mm;s.count=Math.max(0,Math.min(pa.count,g.drawRange.count)-(g.drawRange.start||0));s.visible=this.visible;}}
 T.Points=Points;}
// ---------- 6. рендерер ----------
const V2=new T.Vector2(),V4=new T.Vector4();
// кадр из текстуры ?offscreen — на холст-подложку поверх холста игры (под интерфейсом): так его видят снимки ботов
G.blit=async function(){if(!G.offscreen||!G.renderer)return 0;await G.fresh();const r=G.renderer,R=G.offRT;if(!R)return 0;const w=R.width,h=R.height;let px=await r.readRenderTargetPixelsAsync(R,0,0,w,h);
  px=new Uint8Array(px.buffer,px.byteOffset,px.byteLength);const row=px.length/h;if(row!==w*4){const o=new Uint8Array(w*h*4);for(let y=0;y<h;y++)o.set(px.subarray(y*row,y*row+w*4),y*w*4);px=o;}   // строки WebGPU выровнены по 256 байт
  let c=G.blitCanvas;const gc=r.domElement;if(!c){c=G.blitCanvas=document.createElement('canvas');c.id='gpuBlit';c.style.cssText='position:absolute;pointer-events:none;';gc.parentNode.insertBefore(c,gc.nextSibling);}
  const b=gc.getBoundingClientRect();Object.assign(c.style,{left:b.left+'px',top:b.top+'px',width:b.width+'px',height:b.height+'px'});c.width=w;c.height=h;
  const d=new Uint8ClampedArray(px.length);for(let i=0;i<px.length;i+=4){d[i]=px[i];d[i+1]=px[i+1];d[i+2]=px[i+2];d[i+3]=255;}c.getContext('2d').putImageData(new ImageData(d,w,h),0,0);return w*h;};
// Под автоматизацией (боты, navigator.webdriver) кадры не сдерживает показ на экране: программный GPU (SwiftShader) копит очередь
// на десятки секунд, и любое чтение кадра (снимок, readPixels) ждёт её всю. Поэтому кадр игры рисуется, только когда GPU закончил
// предыдущий; в пропущенных кадрах логика идёт как обычно, на экране — прежняя картинка. Рисование из кода бота (вне кадра) — всегда.
G.throttle=!!navigator.webdriver;G.inFrame=false;G.skip=false;G.drew=false;G.busy=false;G.freshQ=[];
G.gpuIdle=function(){const b=G.renderer&&G.renderer.backend;if(!b)return Promise.resolve();
  if(b.device)return b.device.queue.onSubmittedWorkDone();
  const gl=b.gl;if(!gl||!gl.fenceSync)return Promise.resolve();const f=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);gl.flush();
  return new Promise(res=>{const poll=()=>{const st=gl.clientWaitSync(f,0,0);if(st===gl.TIMEOUT_EXPIRED)setTimeout(poll,4);else{gl.deleteSync(f);res();}};poll();});};
// свежий кадр: обещание выполнится, когда GPU дорисует первый кадр, начатый после вызова (не дольше 20 с)
G.fresh=()=>new Promise(res=>{const t=setTimeout(res,20000);G.freshQ.push(()=>{clearTimeout(t);res();});});
if(G.throttle){const raf=window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame=f=>raf(t=>{G.skip=G.busy;G.inFrame=true;G.drew=false;try{f(t);}finally{G.inFrame=false;
    if(G.drew){G.busy=true;const q=G.freshQ;G.freshQ=[];G.gpuIdle().then(()=>{G.busy=false;q.forEach(r=>r());});}}});}
T.WebGLRenderer=function(p){p=Object.assign({},p||{});const r=new T.WebGPURenderer(Object.assign(p,{forceWebGL:G.forceGL}));G.renderer=r;
  r.outputColorSpace=T.LinearSRGBColorSpace;
  // тонмаппинг — в материалах (gpu_early.js, кривая late_10); рендереру — «без тонмаппинга», а запрошенный режим запоминаем
  G.toneMapping=T.NoToneMapping;Object.defineProperty(r,'toneMapping',{get:()=>G.tmRenderer||T.NoToneMapping,set:v=>{if(v!==T.NoToneMapping)G.toneMapping=v;},configurable:true});   // «без тонмаппинга» ставит и снимает постобработка — запрошенный режим не трогаем
  const lib=r.library;for(const C of G.PointLightClasses)lib.lightNodes.set(C,LegacyPointLightNode);
  // ?offscreen (для ботов на настоящем WebGPU в headless, где показ на холст не работает): всё, что шло на холст, — в текстуру того же размера
  G.offscreen=/[?&]offscreen\b/.test(location.search);
  const _render=r.render.bind(r);
  // сплит-экран: в WebGPU очистка кадра (loadOp clear) стирает всю цель, а не прямоугольник ножниц, как в WebGL, — вторая половина
  // стирала первую. Поэтому при ножницах не на весь холст половина очищается квадратом цвета фона на дальней глубине
  // (только в своих ножницах), а сам кадр рисуется без очистки.
  const CQ={};
  const clearPane=s=>{if(!CQ.scene){CQ.col=L.uniform(new T.Color());const m=new T.MeshBasicNodeMaterial();m.depthTest=false;m.depthWrite=true;m.fog=false;m.toneMapped=false;m._finNoTM=true;
      m.vertexNode=L.vec4(L.positionGeometry.xy,1,1);m.colorNode=L.vec4(CQ.col,1);const q=new T.Mesh(new T.PlaneGeometry(2,2),m);q.frustumCulled=false;
      CQ.scene=new T.Scene();CQ.scene.add(q);CQ.cam=new T.OrthographicCamera();}
    if(s&&s.background&&s.background.isColor)CQ.col.value.copy(s.background);else r.getClearColor(CQ.col.value);_render(CQ.scene,CQ.cam);};
  const draw=(s,c)=>{const sc=r.getScissor(V4),sz=r.getSize(V2);
    const part=r.getScissorTest()&&(sc.x>0||sc.y>0||sc.z<sz.x||sc.w<sz.y)&&(r.autoClear||s&&s.background&&s.background.isColor);
    if(!part)return _render(s,c);
    const ac=[r.autoClearColor,r.autoClearDepth,r.autoClearStencil];r.autoClearColor=r.autoClearDepth=r.autoClearStencil=false;
    try{clearPane(s);return _render(s,c);}finally{r.autoClearColor=ac[0];r.autoClearDepth=ac[1];r.autoClearStencil=ac[2];}};
  r.render=function(s,c){if(!G.ready)return;if(G.inFrame){if(G.skip)return;G.drew=true;}
    const tg=r.getRenderTarget();if(tg!==null){if(!tg.finMRT)return _render(s,c);
      const m=r.getMRT();r.setMRT(tg.finMRT);try{return _render(s,c);}finally{r.setMRT(m);}}   // текстура панели постобработки: цвет + свечение
    if(G.offscreen){const sz=r.getDrawingBufferSize(V2),pr=r.getPixelRatio(),rt=G.offRT&&G.offRT.width===sz.x&&G.offRT.height===sz.y?G.offRT:null;
      if(!rt){if(G.offRT)G.offRT.dispose();G.offRT=new T.RenderTarget(sz.x,sz.y,{samples:4});G.offRT.finScreen=true;}
      const R=G.offRT;R.viewport.copy(r.getViewport(V4)).multiplyScalar(pr).round();R.scissor.copy(r.getScissor(V4)).multiplyScalar(pr).round();R.scissorTest=r.getScissorTest();   // половины сплита — как на холсте
      r.setRenderTarget(R);try{return draw(s,c);}finally{r.setRenderTarget(null);}}
    return draw(s,c);};
  G.rawRender=r.render.bind(r);   // без обёрток модулей (постобработка рисует ими свои проходы)
  r.init().then(()=>{G.ready=true;G.backend=r.backend&&r.backend.isWebGPUBackend?'webgpu':'webgl2';document.documentElement.dataset.gpu=G.backend;})
    .catch(e=>{console.error('final07: рендерер не запустился',e);});
  return r;};
})();
