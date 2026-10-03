// релиз: какие «прозрачные стены» после деления на куски (late_88 occSplitFades) всё ещё шире 4,5 м — они растворяются узором целиком.
// Для каждого уровня печатает такие куски: размер коробки (x×y×z), число мешей, центр (x,низ,z), тип геометрии и число вершин первого меша.
window.O=ZC.FIN.occ;O.fdt=0.05;
window.wide=id=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}const W=ZC.W;W.group.updateMatrixWorld(true);
  const box=new Map(),cnt=new Map(),first=new Map();for(const m of W.fadeMeshes){const f=m.userData.fadeRef;if(!f)continue;const b=new THREE.Box3().setFromObject(m);if(b.isEmpty())continue;cnt.set(f,(cnt.get(f)||0)+1);if(!box.has(f)){box.set(f,b.clone());first.set(f,m);}else box.get(f).union(b);}
  const out=[];for(const [f,b] of box){const sx=b.max.x-b.min.x,sz=b.max.z-b.min.z,sy=b.max.y-b.min.y;if((sx>4.5||sz>4.5)&&sy>=1.2){const c=b.getCenter(new THREE.Vector3()),m=first.get(f),g=m.geometry;
    out.push(sx.toFixed(1)+'x'+sy.toFixed(1)+'x'+sz.toFixed(1)+'/'+cnt.get(f)+'@'+c.x.toFixed(0)+','+b.min.y.toFixed(0)+','+c.z.toFixed(0)+':'+g.type.replace('Geometry','').replace('Buffer','')+g.attributes.position.count+(m.visible?'':'-hid'));}}
  return id+' fades='+W.fades.length+' parts='+(O.fadeParts||0)+(out.length?' WIDE['+out.length+']: '+out.join(' '):'');};
window.R=ZC.LEVELS.map(L=>L.id);R.length
//@@
R.slice(0,Math.ceil(R.length/2)).map(wide).filter(s=>/WIDE/.test(s))
//@@
R.slice(Math.ceil(R.length/2)).map(wide).filter(s=>/WIDE/.test(s))
