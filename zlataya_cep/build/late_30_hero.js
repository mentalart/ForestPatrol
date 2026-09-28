/* ============================== РЕЛИЗ · ЖИВЫЕ ГЕРОИ: блики в глазах, моргание, приседание, пыль ============================== */
const SHINE_M=new THREE.MeshBasicMaterial({color:0xffffff}),SHINE_G=new FIN.orig.Sphere(1,6,4);
// зрачок — маленький тёмный шар; ему добавляется белый блик, а у героев — ещё и моргание
function eyeShine(root,blinkList){root.traverse(o=>{if(!o.isMesh||o.userData.shine||!o.geometry||o.geometry.type!=='SphereGeometry')return;const r=o.geometry.parameters&&o.geometry.parameters.radius;
  if(!r||r>0.085||r<0.02||!o.material||!o.material.color)return;const c=o.material.color;if(c.r+c.g+c.b>0.4)return;o.userData.shine=true;
  const s=new THREE.Mesh(SHINE_G,SHINE_M);s.scale.setScalar(r*0.36);s.position.set(r*0.38,r*0.42,r*0.66);s.userData.shine=true;o.add(s);
  if(blinkList){blinkList.push(o);if(o.parent)for(const sib of o.parent.children){if(sib===o||!sib.isMesh||sib.geometry.type!=='SphereGeometry')continue;const R=sib.geometry.parameters.radius;
      if(R>r&&R<0.2&&sib.position.distanceTo(o.position)<R&&sib.material.color&&sib.material.color.r>0.8)blinkList.push(sib);}}});}
HEROES.forEach(h=>{h.eyes=[];eyeShine(h.body,h.eyes);h.blinkT=2+Math.random()*3;});
FIN.afterLoadHero=()=>{eyeShine(W.group,null);};
{const _anim=animHero;animHero=function(h,dt){_anim(h,dt);const b=h.body;if(!b)return;
  // приземление — присесть и пыль; отрыв — вытянуться; пружина возвращает форму
  const vy=h._vy||0;if(h._wasG===false&&h.grounded&&vy<-5){h._sq=Math.min(0.26,-vy*0.017);h._sqv=0;
      if(-vy>8.5&&FIN.set.quality!=='low'&&!G.cine)burst(new V3(h.pos.x,h.pos.y+0.08,h.pos.z),0xe6dcc4,5,1.4,0.55);}
    else if(h._wasG===true&&!h.grounded&&h.vel.y>4){h._sq=-0.15;h._sqv=0;}
  h._wasG=h.grounded;h._vy=h.vel.y;
  if(h._sq){h._sqv+=(-h._sq*190-h._sqv*13)*dt;h._sq+=h._sqv*dt;if(Math.abs(h._sq)<0.004&&Math.abs(h._sqv)<0.06){h._sq=0;h._sqv=0;}
    if(!G.cine){const s=h._sq;b.scale.set(1+s*0.65,1-s,1+s*0.65);h._sqOn=true;}}
  else if(h._sqOn){h._sqOn=false;if(!G.cine)b.scale.set(1,1,1);}
  // моргание раз в 2–5 секунд
  if(h.eyes&&h.eyes.length){h.blinkT-=dt;const k=h.blinkT<0.12&&h.blinkT>0?0.12:1;for(const e of h.eyes)e.scale.y=k;if(h.blinkT<=0)h.blinkT=2+Math.random()*3.2;}};}
