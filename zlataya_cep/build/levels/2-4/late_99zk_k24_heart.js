/* ============================== РЕЛИЗ final06 · 2-4: ЯЗЫК КОЛОКОЛА НЕСЁТ ПОТАП, ЛУЖИ ДЫШАТ С СЕРДЦЕМ, КОРАБЛЬ С КУПОЛОМ, ГЛАЗА ВОДЯНОГО ============================== */
// По разбору мира 2 (выбранные правки c27, c22, c33):
//  1) «Несём язык колокола»: поднятый со дна язык не исчезает — Потап несёт его над головой до сердца кита (z < −88), там — «донёс!».
//  2) Сердце — ритм уровня: кислые лужи сжимаются на каждый «тук» и снова растекаются — проходить в такт.
//  3) Один из кораблей в заливе — китежский: с луковкой и крестом на палубе.
//  4) Глаза Водяного в тёмной воде залива.
const K24H={eyes:[],carry:null};
function k24Heart(){K24H.eyes=[];K24H.carry=null;const D=W.dbg24?W.dbg24():null;if(!D)return;const F=D.F,HB=D.HB;
  // 3) корабль с куполом (дальний из трёх)
  {const R=D.SHIPS[2],gm=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),wm=M(0xe8e0cc);const g=new THREE.Group();g.position.set(0,0.9,0);R.g.add(g);
    addMesh(new THREE.CylinderGeometry(0.45,0.45,0.7,10),wm,0,0.35,0,g);const on=addMesh(new THREE.SphereGeometry(0.55,12,9),gm,0,1.05,0,g);on.scale.y=1.25;
    addMesh(new THREE.ConeGeometry(0.2,0.5,8),gm,0,1.75,0,g);addMesh(new THREE.BoxGeometry(0.05,0.45,0.05),gm,0,2.15,0,g);addMesh(new THREE.BoxGeometry(0.26,0.05,0.05),gm,0,2.2,0,g);
    g.traverse(c=>{c.userData.noBatch=true;});}
  // 4) глаза Водяного в заливе
  K24H.eyes.push(k21Eyes(33.2,D.BAY.level+0.3,-41.5),k21Eyes(33.2,D.BAY.level+0.3,-59));
  for(const E of K24H.eyes)E.g.rotation.y=-Math.PI/2;
  // 1) язык колокола над головой Потапа
  const tm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6});const cg=new THREE.Group();cg.visible=false;W.group.add(cg);
  addMesh(new THREE.CylinderGeometry(0.1,0.1,1.5,8),tm,0,0,0,cg).rotation.z=Math.PI/2;addMesh(new THREE.SphereGeometry(0.3,10,8),tm,0.85,0.05,0,cg);
  cg.traverse(c=>{c.userData.noBatch=true;});K24H.carry=cg;
  for(const a of D.ACID){a.r0=a.r;}
  {const _w=W.warp24;W.warp24=where=>{const r=_w(where);if(where==='heart')F.tongueHome=true;return r;};}   // перенос к сердцу (боты) — язык уже донесён
  W.updates.push(dt=>{const P=HERO.potap;
    if(F.tongue&&!F.tongueHome&&!G.cine){cg.visible=true;cg.position.set(P.pos.x,P.pos.y+P.d.height+0.55+Math.sin(G.time*3)*0.06,P.pos.z);cg.rotation.y=P.face||0;
      if(P.pos.z<-88){F.tongueHome=true;cg.visible=false;banner('Донёс!','#ffd76a',1.8,'язык колокола — у сердца, в целости');bark(P,'potap','Тяжёлый… как положено. Донёс!',2.2);SFX.ok();}}
    else if(F.tongueHome||!F.tongue)cg.visible=false;
    // 2) лужи сжимаются на «тук» (HB.pulse = 1 в миг удара) и снова растекаются
    for(const a of D.ACID){const k=1-0.45*HB.pulse;a.r=a.r0*k;a.m.scale.setScalar(k);}
    vodEyesTick(K24H.eyes,dt);});}
FIN.k24Heart=K24H;
{const _b=build24;build24=function(){_b();try{k24Heart();}catch(err){console.error('k24 heart',err);}};}
