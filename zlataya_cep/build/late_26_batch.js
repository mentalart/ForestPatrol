/* ============================== РЕЛИЗ final03 · ПАЧКИ СТАТИКИ: сотни мешей → десятки отрисовок ============================== */
// Через ~1,5 с после загрузки неподвижные меши уровня сливаются в пачки: ячейка 24 м × (свет/без света, двусторонность, тени).
// Цвет материала, тон по вершинам и свечение запекаются в вершины. Оригиналы остаются «заместителями» на невидимом слое 31:
// логика, коллизии, лучи (полупрозрачность стен, камера роликов) и видимость работают с ними как раньше.
// Каждый кадр (при большом числе — по трети) заместитель проверяется: сдвинулся, спрятался, перекрасился, сменил материал или геометрию →
// он сразу рисуется сам, а его треугольники в пачке схлопываются. Вернулся в прежнее состояние (стена снова непрозрачна) — треугольники
// возвращаются без пересборки. Изменившееся надолго выпадает из пачки при её пересборке; дважды — больше не объединяется.
// Живое (враги, предметы, звенышко, ворота, плиты, колокольчики, NPC, подвижные платформы, облака, ходячие ели…) в пачки не попадает.
const BAT={on:true,st:'off',t:0,cells:new Map(),prox:[],pend:[],pendL:[],scanT:0,chk:0,dirty:new Set(),upd:new Set(),stats:{batched:0,local:0,cells:0,ejected:0,restored:0}};FIN.batch=BAT;
const BAT_CELL=24,BAT_LAYER=31;
FIN.fxHook.bemis=(sh)=>{sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute vec3 aEmis;\nvarying vec3 vEmis;').replace('#include <begin_vertex>','#include <begin_vertex>\n\tvEmis = aEmis;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vEmis;').replace('vec3 totalEmissiveRadiance = emissive;','vec3 totalEmissiveRadiance = emissive + vEmis;');};
const BAT_MAT={};function batMat(k){if(BAT_MAT[k])return BAT_MAT[k];const d=k.indexOf('d')>=0,basic=k.indexOf('b')>=0;let m;
  if(basic)m=new THREE.MeshBasicMaterial({vertexColors:true,side:d?THREE.DoubleSide:THREE.FrontSide,fog:k.indexOf('n')<0,toneMapped:k.indexOf('t')<0});
  else{m=new THREE.MeshLambertMaterial({vertexColors:true,side:d?THREE.DoubleSide:THREE.FrontSide});m.userData.fx='bemis';m.defaultAttributeValues.aEmis=[0,0,0];}
  m.userData.shared=true;m.userData.kit=true;m.userData.batch=true;batLockMat(m);BAT_MAT[k]=m;return m;}
// материал пачки — один на все ячейки уровня: код уровня, растворяющий «детей группы» (material.opacity у всех children), задевал
// и меш локальной пачки внутри группы — и весь пол уровня становился невидимым (3-2: нить Пушка в ролике). Прозрачность пачки заперта.
function batLockMat(m){for(const k of['opacity','transparent']){const v=k==='opacity'?1:false;Object.defineProperty(m,k,{get:()=>v,set:x=>{if(x!==v)BAT.stats.matLock=(BAT.stats.matLock||0)+1;},configurable:true});}}
RAY.layers.enable(BAT_LAYER);   // полупрозрачность стен видит заместителей
const B_V=new V3(),B_N=new THREE.Matrix4();
function batVis(o){while(o){if(!o.visible)return false;if(o===W.group)return true;o=o.parent;}return false;}
function batMatSig(mt){return mt.uuid+'|'+mt.color.getHex()+'|'+mt.opacity+'|'+(mt.transparent?1:0)+'|'+(mt.visible?1:0)+'|'+(mt.emissive?mt.emissive.getHex()+'|'+(mt.emissiveIntensity||0):'')+'|'+(mt.map?1:0)+'|'+mt.side+'|'+(mt.depthWrite?1:0);}
function batOk(m){if(!m.isMesh||m.isInstancedMesh||m.isSkinnedMesh||m.userData.noBatch||m.userData.batchNo||m.userData.batchMesh||m.userData.bat)return false;
  if(m.renderOrder!==0||m.layers.mask!==1||m.onBeforeRender!==THREE.Object3D.prototype.onBeforeRender)return false;const mt=m.material;
  if(!mt||Array.isArray(mt)||!(mt.isMeshPhongMaterial||mt.isMeshBasicMaterial)||mt.map||mt.vertexColors||mt.userData.fx||mt.userData.batch||mt.alphaTest>0||mt.side===THREE.BackSide||!mt.visible)return false;
  if(mt.transparent&&mt.opacity<0.99||mt.blending!==THREE.NormalBlending)return false;
  const g=m.geometry;if(!g||!g.attributes.position||g.attributes.position.count>24000||(g.morphAttributes&&g.morphAttributes.position)||g.drawRange.count!==Infinity)return false;
  const e=m.matrixWorld.elements;for(let i=0;i<16;i++)if(!isFinite(e[i]))return false;return batVis(m);}
function batSnap(m){return {m,mw:m.matrixWorld.elements.slice(),ml:m.matrix.elements.slice(),par:m.parent,geo:m.geometry,mat:m.material,sig:batMatSig(m.material),cast:m.castShadow};}
function batChanged(p){const m=p.m;if(m.parent!==p.par||m.geometry!==p.geo||m.material!==p.mat||m.castShadow!==p.cast||!batVis(m))return true;
  const a=m.matrixWorld.elements,b=p.mw;for(let i=0;i<16;i++)if(Math.abs(a[i]-b[i])>1e-5)return true;return batMatSig(m.material)!==p.sig;}
// локальные пачки: живые группы (NPC, враги, ворота, поплавки…) — их неподвижные относительно группы меши сливаются в пачку-ребёнка группы
function batSnapL(m){return {m,loc:true,ml:m.matrix.elements.slice(),vis:m.visible,par:m.parent,geo:m.geometry,mat:m.material,sig:batMatSig(m.material),cast:m.castShadow};}
function batChangedL(p){const m=p.m;if(m.parent!==p.par||m.geometry!==p.geo||m.material!==p.mat||m.castShadow!==p.cast||m.visible!==p.vis)return true;
  const a=m.matrix.elements,b=p.ml;for(let i=0;i<16;i++)if(Math.abs(a[i]-b[i])>1e-5)return true;return batMatSig(m.material)!==p.sig;}
function batOkL(m){if(!m.isMesh||m.isInstancedMesh||m.isSkinnedMesh||m.userData.bat||m.userData.batchMesh||m.userData.noBatchL||m.userData.fadeRef)return false;if(!m.parent||m.parent===W.group||m.parent===scene||!m.parent.isObject3D)return false;
  if(m.renderOrder!==0||m.layers.mask!==1||m.onBeforeRender!==THREE.Object3D.prototype.onBeforeRender||!m.visible||!m.matrixAutoUpdate)return false;const mt=m.material;
  if(!mt||Array.isArray(mt)||!(mt.isMeshPhongMaterial||mt.isMeshBasicMaterial)||mt.map||mt.vertexColors||mt.userData.fx||mt.userData.batch||mt.alphaTest>0||mt.side===THREE.BackSide||!mt.visible)return false;
  if(mt.transparent&&mt.opacity<0.99||mt.blending!==THREE.NormalBlending)return false;const g=m.geometry;if(!g||!g.attributes.position||g.attributes.position.count>12000||(g.morphAttributes&&g.morphAttributes.position))return false;
  const e=m.matrix.elements;for(let i=0;i<16;i++)if(!isFinite(e[i]))return false;return !!(m.userData.batchNo||m.userData.noBatch);}
function batScanLocal(){const now=BAT.t,byPar=new Map();W.group.traverse(m=>{if(m.userData.batPendL||!batOkL(m))return;let a=byPar.get(m.parent);if(!a){a=[];byPar.set(m.parent,a);}a.push(m);});
  for(const [par,ms] of byPar){if(ms.length<3)continue;for(const m of ms){m.userData.batPendL=true;BAT.pendL.push({s:batSnapL(m),t:m.userData.batProm?now-1.3:now});m.userData.batProm=false;}}
  const keep=[],ready=new Map();for(const q of BAT.pendL){const m=q.s.m;if(!m.parent){m.userData.batPendL=false;continue;}if(batChangedL(q.s)){m.userData.batPendL=false;m.userData.batStrikeL=(m.userData.batStrikeL||0)+1;if(m.userData.batStrikeL>=2)m.userData.noBatchL=true;continue;}
    if(now-q.t>=1.2){let a=ready.get(m.parent);if(!a){a=[];ready.set(m.parent,a);}a.push(m);}else keep.push(q);}
  for(const [par,ms] of ready){if(ms.length<2){ms.forEach(m=>{m.userData.batPendL=false;});continue;}const mt=ms[0].material;
    const groups=new Map();for(const m of ms){m.userData.batPendL=false;const k=(m.material.isMeshBasicMaterial?'b'+(m.material.fog?'':'n')+(m.material.toneMapped?'':'t'):'l')+(m.material.side===THREE.DoubleSide?'d':'f')+(m.castShadow?'c':'')+(m.receiveShadow?'r':'');let a=groups.get(k);if(!a){a=[];groups.set(k,a);}a.push(m);}
    for(const [k,arr] of groups){if(arr.length<2)continue;const cell={key:'L'+par.uuid+'|'+k,items:[],mesh:null,dead:0,local:par};BAT.cells.set(cell.key,cell);for(const m of arr){const p={m};p.cell=cell;cell.items.push(p);BAT.prox.push(p);BAT.stats.local++;}BAT.dirty.add(cell);}}
  BAT.pendL=keep;}
// живое — вне пачек (помечается на уровень)
// final05: живое, появившееся позже (волны врагов на аренах, выпавшие предметы), раньше не попадало под метку — стоящий 1,5 с враг
// склеивался в статическую ячейку мира, а потом, сдвинувшись, пропадал (пачка рисовала его на старом месте). Теперь метка ставится при каждом
// сканировании, а уже склеенное живое выбрасывается из статики и рисуется само.
function batUnglue(c){const p=c.userData.batP;if(!p||!p.cell||p.cell.local||p.gone)return;if(!p.out)batEject(p,true);p.gone=true;c.userData.bat=false;c.userData.noBatch=true;c.layers.set(0);BAT.dirty.add(p.cell);}
function batBlacklist(){const mark=o=>{if(o&&o.traverse)o.traverse(c=>{c.userData.batchNo=true;if(c.userData.bat)batUnglue(c);});};const pick=o=>o&&(o.g||o.mesh||o.m||o.group||o.box||null);
  for(const k of['enemies','items','bells','gates','plates','movers','lifts','likhos','baits','shots','debris','fx','clouds','tiles','surfs','flocks','geese','trees','returning','sparks','flocks5','grabs'])
    for(const o of (W[k]||[])){mark(pick(o));if(o&&o.isObject3D)mark(o);}
  if(W.zven&&W.zven.g)mark(W.zven.g);if(FIN.actors)for(const n of FIN.actors.npcs)mark(n.o&&n.o.g);for(const z of (W.waters||[])){mark(z.box);mark(z.top);for(const f of (z.floaters||[]))mark(pick(f)||f);}}
function batKey(m){m.geometry.boundingSphere||m.geometry.computeBoundingSphere();B_V.copy(m.geometry.boundingSphere.center).applyMatrix4(m.matrixWorld);const mt=m.material;
  return Math.floor(B_V.x/BAT_CELL)+','+Math.floor(B_V.z/BAT_CELL)+'|'+(mt.isMeshBasicMaterial?'b'+(mt.fog?'':'n')+(mt.toneMapped?'':'t'):'l')+(mt.side===THREE.DoubleSide?'d':'f')+(m.castShadow?'c':'')+(m.receiveShadow?'r':'');}
// сборка ячейки: неиндексированная геометрия, позиции относительно W.group, цвет = материал × (1 + aShade), свечение = emissive × сила
function batBuild(cell){if(cell.mesh){if(cell.mesh.parent)cell.mesh.parent.remove(cell.mesh);cell.mesh.geometry.dispose();cell.mesh=null;}
  const fin=m=>{const e=m.matrixWorld.elements;for(let i=0;i<16;i++)if(!isFinite(e[i]))return false;return true;};
  for(const p of cell.items)if(!p.out&&!fin(p.m)){p.out=true;p.m.userData.batStrike=9;}
  const live=[];for(const p of cell.items){if(p.out){p.m.userData.bat=false;p.m.layers.set(0);if(cell.local){p.m.userData.batStrikeL=(p.m.userData.batStrikeL||0)+1;if(p.m.userData.batStrikeL>=2)p.m.userData.noBatchL=true;}else if(!p.m.userData.fadeRef){p.m.userData.batStrike=(p.m.userData.batStrike||0)+1;if(p.m.userData.batStrike>=2)p.m.userData.noBatch=true;}p.gone=true;}else live.push(p);}
  cell.items=live;if(!live.length)return;const basic=cell.key.indexOf('|b')>=0;
  let n=0;for(const p of live){const g=p.m.geometry;n+=g.index?g.index.count:g.attributes.position.count;}
  const P=new Float32Array(n*3),C=new Float32Array(n*3),E=basic?null:new Float32Array(n*3);let o=0,anyE=false;const host=cell.local||W.group;host.updateMatrixWorld(true);const inv=new THREE.Matrix4().copy(host.matrixWorld).invert();
  for(const p of live){const m=p.m,g=m.geometry,pos=g.attributes.position,sh=g.attributes.aShade,idx=g.index,cnt=idx?idx.count:pos.count;if(cell.local)B_N.copy(m.matrix);else B_N.multiplyMatrices(inv,m.matrixWorld);const flip=B_N.determinant()<0;
    const mt=m.material,col=mt.color,ei=mt.emissive?(mt.emissiveIntensity||0):0,er=ei?mt.emissive.r*ei:0,eg=ei?mt.emissive.g*ei:0,eb=ei?mt.emissive.b*ei:0;if(er+eg+eb>0)anyE=true;p.start=o;p.count=cnt;p.saved=null;
    for(let i=0;i<cnt;i++){const k=flip?(i%3===1?i+1:i%3===2?i-1:i):i;const j=idx?idx.getX(k):k;B_V.fromBufferAttribute(pos,j).applyMatrix4(B_N);P[o*3]=B_V.x;P[o*3+1]=B_V.y;P[o*3+2]=B_V.z;
      if(sh&&!basic){C[o*3]=col.r*Math.max(0,1+sh.getX(j));C[o*3+1]=col.g*Math.max(0,1+sh.getY(j));C[o*3+2]=col.b*Math.max(0,1+sh.getZ(j));}else{C[o*3]=col.r;C[o*3+1]=col.g;C[o*3+2]=col.b;}
      if(E){E[o*3]=er;E[o*3+1]=eg;E[o*3+2]=eb;}o++;}
    let bad=false;for(let q=p.start*3;q<o*3;q++)if(!isFinite(P[q])){bad=true;break;}
    if(bad){o=p.start;p.count=0;p.gone=true;m.userData.noBatch=true;m.userData.bat=false;m.layers.set(0);continue;}   // геометрию правит код уровня — рисуем отдельно
    p.snap=cell.local?batSnapL(m):batSnap(m);p.out=false;m.layers.set(BAT_LAYER);m.userData.bat=true;}
  cell.items=cell.items.filter(p=>!p.gone);if(!o)return;
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P.subarray(0,o*3),3));g.setAttribute('color',new THREE.BufferAttribute(C.subarray(0,o*3),3));if(E&&anyE)g.setAttribute('aEmis',new THREE.BufferAttribute(E.subarray(0,o*3),3));
  g.computeVertexNormals();g.computeBoundingSphere();g.computeBoundingBox();
  const k=cell.key,fl=k.slice(k.indexOf('|')+1),mesh=new THREE.Mesh(g,batMat(fl.replace(/[cr]/g,'')));mesh.castShadow=fl.indexOf('c')>=0;mesh.receiveShadow=fl.indexOf('r')>=0;
  mesh.userData.batchMesh=true;mesh.userData.sty=true;mesh.matrixAutoUpdate=false;(cell.local||W.group).add(mesh);cell.mesh=mesh;cell.dead=0;}
// выход из пачки (треугольники схлопываются, копия запоминается) и возврат
function batWhy(p){const m=p.m;if(m.parent!==p.par)return 'parent';if(m.geometry!==p.geo)return 'geo';if(m.material!==p.mat)return 'mat';if(!batVis(m))return 'vis';const a=m.matrixWorld.elements,b=p.mw;for(let i=0;i<16;i++)if(Math.abs(a[i]-b[i])>1e-5)return 'move';return 'sig:'+p.sig+' → '+batMatSig(m.material);}
function batEject(p,noProm){const cell=p.cell;p.out=true;p.outT=BAT.t;const m=p.m;m.layers.set(0);BAT.stats.ejected++;if(BAT.log&&BAT.log.length<40)BAT.log.push(batWhy(p.snap)+' '+(m.name||m.geometry.type));
  if(!noProm&&!cell.local)batPromote(p);
  if(cell.mesh&&p.count){const A=cell.mesh.geometry.attributes.position.array,s=p.start*3,e=(p.start+p.count)*3;p.saved=A.slice(s,e);const x=A[s],y=A[s+1],z=A[s+2];for(let i=s;i<e;i+=3){A[i]=x;A[i+1]=y;A[i+2]=z;}cell.dead+=p.count;BAT.upd.add(cell);}}
// final05: меш «сдвинулся» из-за предка (зал 5-4 переворачивается целиком, ворота, мостки на цепях) — вся группа этого предка уходит
// в локальные пачки внутри себя: дальше она двигается вместе с пачкой, одной-двумя отрисовками вместо сотен. Раньше каждый меш
// группы по отдельности дважды выпадал из статики, прежде чем попасть в локальную пачку, — и всё это время рисовался сам.
// Локальная пачка такой группы собирается сразу, без обычного ожидания (её меши относительно группы не двигаются).
// «Прозрачные стены» (fadeRef: Китеж, терем) меняют прозрачность и потом возвращаются к прежнему виду — это не повод навсегда
// выключать их из пачек: штрафов за такие перемены нет, и непрозрачная снова стена снова склеивается.
function batPromote(p){const m=p.m,s=p.snap;if(!s||!s.ml||!m.parent||m.parent!==s.par||m.parent===W.group)return;   // меш уже снят со сцены — нечего подниматьconst a=m.matrix.elements,b=s.ml;for(let i=0;i<16;i++)if(Math.abs(a[i]-b[i])>1e-5)return;
  let top=m.parent;while(top.parent&&top.parent!==W.group)top=top.parent;if(top.parent!==W.group)return;BAT.stats.promoted=(BAT.stats.promoted||0)+1;
  top.traverse(c=>{c.userData.batchNo=true;c.userData.batProm=true;if(c.userData.bat&&c!==m)batUnglue(c);});BAT.scanT=2;m.userData.batchNo=true;m.userData.noBatch=true;p.gone=true;m.userData.bat=false;BAT.dirty.add(p.cell);}
function batRestore(p){const cell=p.cell;if(!cell.mesh||!p.saved)return;cell.mesh.geometry.attributes.position.array.set(p.saved,p.start*3);cell.dead-=p.count;p.saved=null;p.out=false;p.m.layers.set(BAT_LAYER);BAT.upd.add(cell);BAT.stats.restored++;}
function batAdd(p){const key=batKey(p.m);let cell=BAT.cells.get(key);if(!cell){cell={key,items:[],mesh:null,dead:0};BAT.cells.set(key,cell);}p.cell=cell;p.out=false;cell.items.push(p);p.m.userData.batP=p;BAT.dirty.add(cell);}
function batReset(){for(const c of BAT.cells.values())if(c.mesh)c.mesh.geometry.dispose();for(const p of BAT.prox)if(p.m.userData.bat){p.m.layers.set(0);p.m.userData.bat=false;}
  BAT.cells.clear();BAT.prox=[];BAT.pend=[];BAT.pendL=[];BAT.dirty.clear();BAT.upd.clear();BAT.st='warm';BAT.t=0;BAT.scanT=0;BAT.stats={batched:0,local:0,cells:0,ejected:0,restored:0};}
function batScan(first){const now=BAT.t;if(!first)batBlacklist();W.group.traverse(m=>{if(!m.isMesh||m.userData.bat||m.userData.batPend||!batOk(m))return;m.userData.batPend=true;BAT.pend.push({s:batSnap(m),t:now});});
  const keep=[];for(const q of BAT.pend){const m=q.s.m;if(!m.parent){m.userData.batPend=false;continue;}if(batChanged(q.s)){m.userData.batPend=false;if(!m.userData.fadeRef){m.userData.batStrike=(m.userData.batStrike||0)+1;if(m.userData.batStrike>=2)m.userData.noBatch=true;}continue;}
    if(now-q.t>=(first?0.7:1.5)&&batOk(m)){m.userData.batPend=false;const p={m};BAT.prox.push(p);batAdd(p);BAT.stats.batched++;}else keep.push(q);}BAT.pend=keep;}
function batTick(dt){if(!BAT.on||!W||!W.group)return;BAT.t+=dt;
  if(BAT.st==='warm'){if(BAT.t>1.2){batBlacklist();batScan(true);BAT.st='watch';}return;}
  if(BAT.st==='watch'){if(BAT.t>2.0){batScan(true);BAT.st='live';}return;}
  const L=BAT.prox,N=L.length;if(N){const part=N>1500?Math.ceil(N/3):N;for(let c=0;c<part;c++){const p=L[BAT.chk%N];BAT.chk++;if(p.gone||!p.snap)continue;
      const ch=p.snap.loc?batChangedL(p.snap):batChanged(p.snap);if(!p.out&&ch)batEject(p);else if(p.out&&!ch)batRestore(p);
      else if(p.out&&BAT.t-p.outT>3&&p.cell.mesh&&p.cell.dead>p.cell.mesh.geometry.attributes.position.count*0.3)BAT.dirty.add(p.cell);}}
  for(const cell of BAT.upd){if(cell.mesh)cell.mesh.geometry.attributes.position.needsUpdate=true;}BAT.upd.clear();
  let n=0;for(const cell of BAT.dirty){batBuild(cell);BAT.dirty.delete(cell);if(++n>=2)break;}
  if(n){BAT.prox=L.filter(p=>!p.gone);BAT.stats.cells=[...BAT.cells.values()].filter(c=>c.mesh).length;}
  BAT.scanT+=dt;if(BAT.scanT>2){BAT.scanT=0;batScan(false);batScanLocal();}}
// final05: «прозрачные стены» пачками. С final04 стена растворяется узором в шейдере (uOccWhole = material.userData._occW), поэтому её
// меши в пачки не шли — на уровнях Китежа это ~1300 отдельных отрисовок (с тенями — вдвое больше), а стены внутри групп попадали
// в локальные пачки с общим материалом и не растворялись. Почти каждая стена — своя группа растворения, поэтому пачка собирается по
// ячейке 24 м (как статика), а номер стены лежит в вершинах (aFadeI): шейдер пачки берёт силу растворения своей стены из текстуры
// 256×8 (до 2048 стен), которая каждый кадр заполняется из тех же _occW, что крутит updateFade. Оригиналы — на слое 31 (лучи
// прозрачности их видят). Стена сдвинулась, спряталась или сменила материал — её ячейка распускается, меши снова рисуются сами.
const FB_W=256,FB_H=8;
const FB={cells:[],pend:[],idx:new Map(),chkT:0,tex:new THREE.DataTexture(new Uint8Array(FB_W*FB_H*4),FB_W,FB_H,THREE.RGBAFormat),stats:{cells:0,undone:0,meshes:0}};BAT.fade=FB;
FB.tex.magFilter=FB.tex.minFilter=THREE.NearestFilter;FB.tex.generateMipmaps=false;FB.tex.needsUpdate=true;
function fbOk(m){if(!m.isMesh||m.isInstancedMesh||m.isSkinnedMesh||m.userData.batchMesh||m.userData.fadeBat||m.userData.fbNo||m.renderOrder!==0||m.onBeforeRender!==THREE.Object3D.prototype.onBeforeRender)return false;const mt=m.material;
  if(!mt||Array.isArray(mt)||!mt.isMeshPhongMaterial||mt.map||mt.vertexColors||mt.userData.fx||mt.alphaTest>0||mt.side===THREE.BackSide||!mt.visible||mt.blending!==THREE.NormalBlending)return false;
  if((mt.userData.baseOp!==undefined?mt.userData.baseOp:mt.opacity)<0.99)return false;const g=m.geometry;if(!g||!g.attributes.position||g.attributes.position.count>24000||(g.morphAttributes&&g.morphAttributes.position))return false;
  const e=m.matrixWorld.elements;for(let i=0;i<16;i++)if(!isFinite(e[i]))return false;return batVis(m);}
function fbSnap(m){return {m,mw:m.matrixWorld.elements.slice(),geo:m.geometry,mat:m.material,col:m.material.color.getHex(),em:m.material.emissive?m.material.emissive.getHex()+'|'+m.material.emissiveIntensity:'',cast:m.castShadow};}
function fbChanged(q){const m=q.m;if(m.geometry!==q.geo||m.material!==q.mat||m.castShadow!==q.cast||!batVis(m)||m.material.color.getHex()!==q.col||(m.material.emissive?m.material.emissive.getHex()+'|'+m.material.emissiveIntensity:'')!==q.em)return true;
  const a=m.matrixWorld.elements,b=q.mw;for(let i=0;i<16;i++)if(Math.abs(a[i]-b[i])>1e-5)return true;return false;}
function fbMat(side){const mt=new THREE.MeshLambertMaterial({vertexColors:true,side});mt.userData.fx='bemis';mt.defaultAttributeValues.aEmis=[0,0,0];mt.defaultAttributeValues.aFadeI=[0];mt.userData.fadeBatch=true;
  mt.onBeforeCompile=function(sh){FIN.LowPolyMat.prototype.onBeforeCompile.call(this,sh);sh.uniforms.uFadeTex={value:FB.tex};
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aFadeI;\nvarying float vFadeI;').replace('#include <begin_vertex>','#include <begin_vertex>\n\tvFadeI = aFadeI;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform sampler2D uFadeTex;\nvarying float vFadeI;')
      .replace('float cut = uOccWhole * ( 1.0 - up );','float fdI = floor( vFadeI + 0.5 );\n\tfloat cut = max( uOccWhole, texture2D( uFadeTex, vec2( ( mod( fdI, '+FB_W+'.0 ) + 0.5 ) / '+FB_W+'.0, ( floor( fdI / '+FB_W+'.0 ) + 0.5 ) / '+FB_H+'.0 ) ).r ) * ( 1.0 - up );');};
  mt.customProgramCacheKey=function(){return 'lpfb';};return mt;}
function fbBuildCell(key,snaps){W.group.updateMatrixWorld(true);const inv=new THREE.Matrix4().copy(W.group.matrixWorld).invert();let n=0;for(const q of snaps){const g=q.m.geometry;n+=g.index?g.index.count:g.attributes.position.count;}
  const P=new Float32Array(n*3),C=new Float32Array(n*3),E=new Float32Array(n*3),I=new Float32Array(n);let o=0,anyE=false;
  for(const q of snaps){const m=q.m,g=m.geometry,pos=g.attributes.position,sh=g.attributes.aShade,idx=g.index,cnt=idx?idx.count:pos.count,fi=FB.idx.get(m.userData.fadeRef);B_N.multiplyMatrices(inv,m.matrixWorld);const flip=B_N.determinant()<0;
    const mt=m.material,col=mt.color,ei=mt.emissive?(mt.emissiveIntensity||0):0,er=ei?mt.emissive.r*ei:0,eg=ei?mt.emissive.g*ei:0,eb=ei?mt.emissive.b*ei:0;if(er+eg+eb>0)anyE=true;
    for(let i=0;i<cnt;i++){const kk=flip?(i%3===1?i+1:i%3===2?i-1:i):i;const j=idx?idx.getX(kk):kk;B_V.fromBufferAttribute(pos,j).applyMatrix4(B_N);P[o*3]=B_V.x;P[o*3+1]=B_V.y;P[o*3+2]=B_V.z;
      if(sh){C[o*3]=col.r*Math.max(0,1+sh.getX(j));C[o*3+1]=col.g*Math.max(0,1+sh.getY(j));C[o*3+2]=col.b*Math.max(0,1+sh.getZ(j));}else{C[o*3]=col.r;C[o*3+1]=col.g;C[o*3+2]=col.b;}
      E[o*3]=er;E[o*3+1]=eg;E[o*3+2]=eb;I[o]=fi;o++;}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('color',new THREE.BufferAttribute(C,3));g.setAttribute('aFadeI',new THREE.BufferAttribute(I,1));if(anyE)g.setAttribute('aEmis',new THREE.BufferAttribute(E,3));
  g.computeVertexNormals();g.computeBoundingSphere();g.computeBoundingBox();const fl=key.slice(key.indexOf('|')+1);
  const mesh=new THREE.Mesh(g,fbMat(fl.indexOf('d')>=0?THREE.DoubleSide:THREE.FrontSide));mesh.castShadow=fl.indexOf('c')>=0;mesh.receiveShadow=fl.indexOf('r')>=0;mesh.userData.batchMesh=true;mesh.userData.sty=true;mesh.userData.fadeBatch=true;mesh.matrixAutoUpdate=false;
  W.group.add(mesh);for(const q of snaps){q.m.layers.set(BAT_LAYER);q.m.userData.fadeBat=true;}FB.cells.push({mesh,snaps});FB.stats.cells++;FB.stats.meshes+=snaps.length;}
function fbUndo(c){for(const q of c.snaps){q.m.layers.set(0);q.m.userData.fadeBat=false;q.m.userData.fbStrike=(q.m.userData.fbStrike||0)+1;if(q.m.userData.fbStrike>=2)q.m.userData.fbNo=true;}
  if(c.mesh.parent)c.mesh.parent.remove(c.mesh);c.mesh.geometry.dispose();c.mesh.material.dispose();const i=FB.cells.indexOf(c);if(i>=0)FB.cells.splice(i,1);FB.stats.undone++;}
// раз в 2 с (вместе со сканированием пачек): стены — в ожидание, простоявшие неизменными 1,5 с — в пачки своих ячеек
function fbScan(){if(!W.fades||!W.fades.length)return;const now=BAT.t;W.fades.forEach((f,i)=>{if(i<FB_W*FB_H)FB.idx.set(f,i);});
  const ready=new Map(),keep=[];for(const q of FB.pend){q.m.userData.fbPend=false;if(!q.m.parent||q.m.userData.fadeBat||fbChanged(q))continue;if(now-q.t<1.5){keep.push(q);q.m.userData.fbPend=true;continue;}
    const k=batKey(q.m);let a=ready.get(k);if(!a){a=[];ready.set(k,a);}a.push(q);}
  for(const [k,arr] of ready){if(arr.length>=2)fbBuildCell(k,arr);}
  for(const m of (W.fadeMeshes||[]))if(!m.userData.fbPend&&FB.idx.has(m.userData.fadeRef)&&fbOk(m)){const q=fbSnap(m);q.t=now;m.userData.fbPend=true;keep.push(q);}FB.pend=keep;}
function fbTick(dt){if(!W.fades||!W.fades.length)return;
  // сила растворения каждой стены — в текстуру (то же значение, что у её материалов)
  const D=FB.tex.image.data;let ch=false;for(const [f,i] of FB.idx){const mt=f.mats&&f.mats[0],v=mt&&mt.userData._occW?Math.round(Math.min(1,mt.userData._occW.value)*255):0;if(D[i*4]!==v){D[i*4]=v;ch=true;}}if(ch)FB.tex.needsUpdate=true;
  FB.chkT+=dt;if(FB.chkT<0.25||!FB.cells.length)return;FB.chkT=0;for(let i=FB.cells.length-1;i>=0;i--){const c=FB.cells[i];if(c.snaps.some(fbChanged))fbUndo(c);}}
FB.tick=fbTick;FB.scan=fbScan;
{const _bs=batScanLocal;batScanLocal=function(){_bs();try{fbScan();}catch(e){console.error('fadeBatch',e);}};}
{const _bt=batTick;batTick=function(dt){_bt(dt);if(BAT.on&&W&&W.group)try{fbTick(dt);}catch(e){console.error('fadeBatch',e);}};}
{const _br=batReset;batReset=function(){_br();FB.cells=[];FB.pend=[];FB.idx=new Map();FB.tex.image.data.fill(0);FB.tex.needsUpdate=true;FB.stats={cells:0,undone:0,meshes:0};};}
FIN.afterDress2=function(){batReset();};
// final05: враг помечается живым сразу при создании — в статическую пачку мира он не попадёт даже на миг (детали врага склеиваются только локально)
{const _mf=makeFoe;makeFoe=function(){const e=_mf.apply(this,arguments);try{if(e&&e.g)e.g.traverse(c=>{c.userData.batchNo=true;});}catch(err){}return e;};}
// страховка: оригинал, спрятанный на слой 31, рисует только его пачка. Ошибка посреди пересборки ячейки (старая пачка уже снята,
// новой ещё нет) или пачка, пропавшая со сцены, оставляли невидимыми целые куски пола (3-2: острова «Высокого уступа» — видно
// только юбки-клинья и пухи под полом). Теперь такие оригиналы сразу рисуются сами; при ошибке пачки выключаются целиком.
function batBail(){for(const p of BAT.prox)if(p.m&&p.m.userData.bat){p.m.layers.set(0);p.m.userData.bat=false;p.gone=true;}
  for(const c of BAT.cells.values())if(c.mesh&&c.mesh.parent)c.mesh.parent.remove(c.mesh);BAT.cells.clear();BAT.prox=[];BAT.dirty.clear();BAT.upd.clear();BAT.on=false;}
function batGuard(){let n=0;for(const p of BAT.prox){if(p.gone||p.out||!p.m.userData.bat||!p.cell||p.cell.local)continue;const c=p.cell,mh=c.mesh;
    if(mh&&mh.visible&&mh.parent===W.group)continue;if(BAT.dirty.has(c)&&!mh)continue;   // ячейка ждёт пересборки — соберётся в ближайшие кадры
    p.m.layers.set(0);p.m.userData.bat=false;p.gone=true;n++;}
  if(n){BAT.prox=BAT.prox.filter(p=>!p.gone);BAT.stats.guarded=(BAT.stats.guarded||0)+n;}return n;}
FIN.batchGuard=batGuard;FIN.batchBail=batBail;
{const _step=step;let gT=0;step=function(dt){_step(dt);try{batTick(dt);gT+=dt;if(gT>0.5&&BAT.on&&BAT.st==='live'){gT=0;batGuard();}}catch(e){console.error('batch',e);try{batBail();}catch(e2){BAT.on=false;}}};}
// диагностика: что рисуется отдельно и почему (для разработки)
FIN.batchDiag=function(){const R={};const add=k=>{R[k]=(R[k]||0)+1;};W.group.traverse(m=>{if(!(m.isMesh||m.isPoints||m.isLine||m.isSprite))return;if(!batVis(m)){add('hidden');return;}
  if(m.userData.bat&&m.layers.mask!==1){add('batched');return;}if(m.userData.bat){add('ejected');return;}if(m.userData.batchMesh){add('batchMesh');return;}if(m.isInstancedMesh){add('instanced');return;}if(!m.isMesh){add('points/lines');return;}
  const mt=m.material;if(m.userData.noBatch){add('noBatch');return;}if(m.userData.batchNo){add('blacklist');return;}if(Array.isArray(mt)){add('multimat');return;}if(mt.map){add('map');return;}if(mt.vertexColors){add('vcolor');return;}if(mt.userData.fx){add('fx');return;}
  if(mt.transparent&&mt.opacity<0.99||mt.blending!==THREE.NormalBlending){add('transp');return;}if(!(mt.isMeshPhongMaterial||mt.isMeshBasicMaterial)){add(mt.type);return;}if(m.renderOrder!==0){add('renderOrder');return;}
  if(m.onBeforeRender!==THREE.Object3D.prototype.onBeforeRender){add('onBeforeRender');return;}if(m.userData.batPend){add('pending');return;}add('other');});return R;};
