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
  m.userData.shared=true;m.userData.kit=true;m.userData.batch=true;BAT_MAT[k]=m;return m;}
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
function batSnap(m){return {m,mw:m.matrixWorld.elements.slice(),par:m.parent,geo:m.geometry,mat:m.material,sig:batMatSig(m.material),cast:m.castShadow};}
function batChanged(p){const m=p.m;if(m.parent!==p.par||m.geometry!==p.geo||m.material!==p.mat||m.castShadow!==p.cast||!batVis(m))return true;
  const a=m.matrixWorld.elements,b=p.mw;for(let i=0;i<16;i++)if(Math.abs(a[i]-b[i])>1e-5)return true;return batMatSig(m.material)!==p.sig;}
// локальные пачки: живые группы (NPC, враги, ворота, поплавки…) — их неподвижные относительно группы меши сливаются в пачку-ребёнка группы
function batSnapL(m){return {m,loc:true,ml:m.matrix.elements.slice(),vis:m.visible,par:m.parent,geo:m.geometry,mat:m.material,sig:batMatSig(m.material),cast:m.castShadow};}
function batChangedL(p){const m=p.m;if(m.parent!==p.par||m.geometry!==p.geo||m.material!==p.mat||m.castShadow!==p.cast||m.visible!==p.vis)return true;
  const a=m.matrix.elements,b=p.ml;for(let i=0;i<16;i++)if(Math.abs(a[i]-b[i])>1e-5)return true;return batMatSig(m.material)!==p.sig;}
function batOkL(m){if(!m.isMesh||m.isInstancedMesh||m.isSkinnedMesh||m.userData.bat||m.userData.batchMesh||m.userData.noBatchL)return false;if(!m.parent||m.parent===W.group||m.parent===scene||!m.parent.isObject3D)return false;
  if(m.renderOrder!==0||m.layers.mask!==1||m.onBeforeRender!==THREE.Object3D.prototype.onBeforeRender||!m.visible||!m.matrixAutoUpdate)return false;const mt=m.material;
  if(!mt||Array.isArray(mt)||!(mt.isMeshPhongMaterial||mt.isMeshBasicMaterial)||mt.map||mt.vertexColors||mt.userData.fx||mt.userData.batch||mt.alphaTest>0||mt.side===THREE.BackSide||!mt.visible)return false;
  if(mt.transparent&&mt.opacity<0.99||mt.blending!==THREE.NormalBlending)return false;const g=m.geometry;if(!g||!g.attributes.position||g.attributes.position.count>12000||(g.morphAttributes&&g.morphAttributes.position))return false;
  const e=m.matrix.elements;for(let i=0;i<16;i++)if(!isFinite(e[i]))return false;return !!(m.userData.batchNo||m.userData.noBatch);}
function batScanLocal(){const now=BAT.t,byPar=new Map();W.group.traverse(m=>{if(m.userData.batPendL||!batOkL(m))return;let a=byPar.get(m.parent);if(!a){a=[];byPar.set(m.parent,a);}a.push(m);});
  for(const [par,ms] of byPar){if(ms.length<3)continue;for(const m of ms){m.userData.batPendL=true;BAT.pendL.push({s:batSnapL(m),t:now});}}
  const keep=[],ready=new Map();for(const q of BAT.pendL){const m=q.s.m;if(!m.parent){m.userData.batPendL=false;continue;}if(batChangedL(q.s)){m.userData.batPendL=false;m.userData.batStrikeL=(m.userData.batStrikeL||0)+1;if(m.userData.batStrikeL>=2)m.userData.noBatchL=true;continue;}
    if(now-q.t>=1.2){let a=ready.get(m.parent);if(!a){a=[];ready.set(m.parent,a);}a.push(m);}else keep.push(q);}
  for(const [par,ms] of ready){if(ms.length<2){ms.forEach(m=>{m.userData.batPendL=false;});continue;}const mt=ms[0].material;
    const groups=new Map();for(const m of ms){m.userData.batPendL=false;const k=(m.material.isMeshBasicMaterial?'b'+(m.material.fog?'':'n')+(m.material.toneMapped?'':'t'):'l')+(m.material.side===THREE.DoubleSide?'d':'f')+(m.castShadow?'c':'')+(m.receiveShadow?'r':'');let a=groups.get(k);if(!a){a=[];groups.set(k,a);}a.push(m);}
    for(const [k,arr] of groups){if(arr.length<2)continue;const cell={key:'L'+par.uuid+'|'+k,items:[],mesh:null,dead:0,local:par};BAT.cells.set(cell.key,cell);for(const m of arr){const p={m};p.cell=cell;cell.items.push(p);BAT.prox.push(p);BAT.stats.local++;}BAT.dirty.add(cell);}}
  BAT.pendL=keep;}
// живое — вне пачек (помечается на уровень)
function batBlacklist(){const mark=o=>{if(o&&o.traverse)o.traverse(c=>{c.userData.batchNo=true;});};const pick=o=>o&&(o.g||o.mesh||o.m||o.group||o.box||null);
  for(const k of['enemies','items','bells','gates','plates','movers','lifts','likhos','baits','shots','debris','fx','clouds','tiles','surfs','flocks','geese','trees','returning','sparks','flocks5','grabs'])
    for(const o of (W[k]||[])){mark(pick(o));if(o&&o.isObject3D)mark(o);}
  if(W.zven&&W.zven.g)mark(W.zven.g);if(FIN.actors)for(const n of FIN.actors.npcs)mark(n.o&&n.o.g);for(const z of (W.waters||[])){mark(z.box);mark(z.top);for(const f of (z.floaters||[]))mark(pick(f)||f);}}
function batKey(m){m.geometry.boundingSphere||m.geometry.computeBoundingSphere();B_V.copy(m.geometry.boundingSphere.center).applyMatrix4(m.matrixWorld);const mt=m.material;
  return Math.floor(B_V.x/BAT_CELL)+','+Math.floor(B_V.z/BAT_CELL)+'|'+(mt.isMeshBasicMaterial?'b'+(mt.fog?'':'n')+(mt.toneMapped?'':'t'):'l')+(mt.side===THREE.DoubleSide?'d':'f')+(m.castShadow?'c':'')+(m.receiveShadow?'r':'');}
// сборка ячейки: неиндексированная геометрия, позиции относительно W.group, цвет = материал × (1 + aShade), свечение = emissive × сила
function batBuild(cell){if(cell.mesh){if(cell.mesh.parent)cell.mesh.parent.remove(cell.mesh);cell.mesh.geometry.dispose();cell.mesh=null;}
  const fin=m=>{const e=m.matrixWorld.elements;for(let i=0;i<16;i++)if(!isFinite(e[i]))return false;return true;};
  for(const p of cell.items)if(!p.out&&!fin(p.m)){p.out=true;p.m.userData.batStrike=9;}
  const live=[];for(const p of cell.items){if(p.out){p.m.userData.bat=false;p.m.layers.set(0);if(cell.local){p.m.userData.batStrikeL=(p.m.userData.batStrikeL||0)+1;if(p.m.userData.batStrikeL>=2)p.m.userData.noBatchL=true;}else{p.m.userData.batStrike=(p.m.userData.batStrike||0)+1;if(p.m.userData.batStrike>=2)p.m.userData.noBatch=true;}p.gone=true;}else live.push(p);}
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
function batEject(p){const cell=p.cell;p.out=true;p.outT=BAT.t;const m=p.m;m.layers.set(0);BAT.stats.ejected++;if(BAT.log&&BAT.log.length<40)BAT.log.push(batWhy(p.snap)+' '+(m.name||m.geometry.type));
  if(cell.mesh&&p.count){const A=cell.mesh.geometry.attributes.position.array,s=p.start*3,e=(p.start+p.count)*3;p.saved=A.slice(s,e);const x=A[s],y=A[s+1],z=A[s+2];for(let i=s;i<e;i+=3){A[i]=x;A[i+1]=y;A[i+2]=z;}cell.dead+=p.count;BAT.upd.add(cell);}}
function batRestore(p){const cell=p.cell;if(!cell.mesh||!p.saved)return;cell.mesh.geometry.attributes.position.array.set(p.saved,p.start*3);cell.dead-=p.count;p.saved=null;p.out=false;p.m.layers.set(BAT_LAYER);BAT.upd.add(cell);BAT.stats.restored++;}
function batAdd(p){const key=batKey(p.m);let cell=BAT.cells.get(key);if(!cell){cell={key,items:[],mesh:null,dead:0};BAT.cells.set(key,cell);}p.cell=cell;p.out=false;cell.items.push(p);BAT.dirty.add(cell);}
function batReset(){for(const c of BAT.cells.values())if(c.mesh)c.mesh.geometry.dispose();for(const p of BAT.prox)if(p.m.userData.bat){p.m.layers.set(0);p.m.userData.bat=false;}
  BAT.cells.clear();BAT.prox=[];BAT.pend=[];BAT.pendL=[];BAT.dirty.clear();BAT.upd.clear();BAT.st='warm';BAT.t=0;BAT.scanT=0;BAT.stats={batched:0,local:0,cells:0,ejected:0,restored:0};}
function batScan(first){const now=BAT.t;W.group.traverse(m=>{if(!m.isMesh||m.userData.bat||m.userData.batPend||!batOk(m))return;m.userData.batPend=true;BAT.pend.push({s:batSnap(m),t:now});});
  const keep=[];for(const q of BAT.pend){const m=q.s.m;if(!m.parent){m.userData.batPend=false;continue;}if(batChanged(q.s)){m.userData.batPend=false;m.userData.batStrike=(m.userData.batStrike||0)+1;if(m.userData.batStrike>=2)m.userData.noBatch=true;continue;}
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
FIN.afterDress2=function(){batReset();};
{const _step=step;step=function(dt){_step(dt);try{batTick(dt);}catch(e){console.error('batch',e);BAT.on=false;}};}
// диагностика: что рисуется отдельно и почему (для разработки)
FIN.batchDiag=function(){const R={};const add=k=>{R[k]=(R[k]||0)+1;};W.group.traverse(m=>{if(!(m.isMesh||m.isPoints||m.isLine||m.isSprite))return;if(!batVis(m)){add('hidden');return;}
  if(m.userData.bat&&m.layers.mask!==1){add('batched');return;}if(m.userData.bat){add('ejected');return;}if(m.userData.batchMesh){add('batchMesh');return;}if(m.isInstancedMesh){add('instanced');return;}if(!m.isMesh){add('points/lines');return;}
  const mt=m.material;if(m.userData.noBatch){add('noBatch');return;}if(m.userData.batchNo){add('blacklist');return;}if(Array.isArray(mt)){add('multimat');return;}if(mt.map){add('map');return;}if(mt.vertexColors){add('vcolor');return;}if(mt.userData.fx){add('fx');return;}
  if(mt.transparent&&mt.opacity<0.99||mt.blending!==THREE.NormalBlending){add('transp');return;}if(!(mt.isMeshPhongMaterial||mt.isMeshBasicMaterial)){add(mt.type);return;}if(m.renderOrder!==0){add('renderOrder');return;}
  if(m.onBeforeRender!==THREE.Object3D.prototype.onBeforeRender){add('onBeforeRender');return;}if(m.userData.batPend){add('pending');return;}add('other');});return R;};
