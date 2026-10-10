/* ============================== РЕЛИЗ final06 · 1-4 «ЛЕШИЙ ВОДИТ»: ЧУДО-ГОРОШИНА ДЛЯ ЧУДО-ГРЯДКИ ЛУКОМОРЬЯ ============================== */
// В лесу Лешего спрятана чудо-горошина — одна на всю игру: висит над самым дальним от начала уровня орешком (берёшь орешек — берёшь
// и её). Подобрал — G.garden.pea=1; в Лукоморье её сажают на чудо-грядку у курятника (proto/levels/luko_5b_farm.js): три похода —
// и горох до неба, по листьям — на облако, там сундучок с жерновцами. Дедка о ней намекает, чудо-грядка — тоже.
function pea14Place(){if(!W||W.levelId!=='1-4'||(G.garden&&G.garden.pea>0))return;const s=HEROES[0].pos;let best=null,bd=-1;
  for(const it of W.items){if(it.kind!=='nut'||it.owl)continue;const d=Math.hypot(it.pos.x-s.x,it.pos.z-s.z);if(d>bd){bd=d;best=it;}}if(!best)return;
  const g=new THREE.Group();g.position.set(best.pos.x,best.base+0.85,best.pos.z);W.group.add(g);
  const pea=part(g,new THREE.SphereGeometry(0.2,14,10),M(0x9ae07a,{emissive:0x3a9a20,emissiveIntensity:0.9}),0,0,0);
  for(const s2 of[-1,1]){const l=part(g,new THREE.SphereGeometry(0.11,8,5),M(0x6ac04a),s2*0.17,0.14,0);l.scale.set(1.4,0.3,0.7);l.rotation.z=-s2*0.5;}
  const gl=new THREE.Mesh(new THREE.SphereGeometry(0.42,12,8),MB(0xc8ffa0,{transparent:true,opacity:0.25,depthWrite:false}));g.add(gl);
  W.items.push({kind:'pea',g,pos:g.position,base:best.base+0.85,taken:false});}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);try{pea14Place();}catch(e){console.error('pea14',e);}};}
{const _ti=takeItem;takeItem=function(it,h){if(it.kind!=='pea')return _ti.apply(this,arguments);if(it.taken)return;it.taken=true;W.group.remove(it.g);burst(it.pos.clone(),0x9ae07a,18,3);SFX.ok();
  if(!G.garden)G.garden={beds:[0,1,2,3].map(()=>({crop:null,stage:0,wet:false})),trip:G.trips||0};if(!(G.garden.pea>0))G.garden.pea=1;
  banner('Чудо-горошина!','#b8f0a0',3,'посади её на чудо-грядке у Дедки — вырастет до неба');};}
