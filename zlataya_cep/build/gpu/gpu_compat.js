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
T.WebGLRenderer=function(p){p=Object.assign({},p||{});const r=new T.WebGPURenderer(Object.assign(p,{forceWebGL:G.forceGL}));G.renderer=r;
  r.outputColorSpace=T.LinearSRGBColorSpace;
  // тонмаппинг — в материалах (gpu_early.js, кривая late_10); рендереру — «без тонмаппинга», а запрошенный режим запоминаем
  G.toneMapping=T.NoToneMapping;Object.defineProperty(r,'toneMapping',{get:()=>G.tmRenderer||T.NoToneMapping,set:v=>{G.toneMapping=v;},configurable:true});
  const lib=r.library;for(const C of G.PointLightClasses)lib.lightNodes.set(C,LegacyPointLightNode);
  const _render=r.render.bind(r);r.render=function(s,c){if(!G.ready)return;return _render(s,c);};
  r.init().then(()=>{G.ready=true;G.backend=r.backend&&r.backend.isWebGPUBackend?'webgpu':'webgl2';document.documentElement.dataset.gpu=G.backend;})
    .catch(e=>{console.error('final07: рендерер не запустился',e);});
  return r;};
})();
