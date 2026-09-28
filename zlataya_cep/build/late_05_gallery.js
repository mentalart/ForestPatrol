/* ============================== РЕЛИЗ final03 · ВИТРИНА (для разработки и документации) ============================== */
// FIN.kitGallery(['fir',['oak',1],…]) — кит-объекты рядами на лужайке, своя камера; FIN.kitGallery(null) — назад в игру.
// FIN.showcase(fn) — то же для произвольной сцены: fn(group) наполняет группу, возвращает {c:центр, d:дистанция}.
FIN.gallery=null;
// FIN.stats(): отрисовки (draw calls) и треугольники за весь кадр — с тенями и обоими экранами
renderer.info.autoReset=false;FIN.frameStats={calls:0,tris:0};FIN.stats=()=>Object.assign({},FIN.frameStats,{geos:renderer.info.memory.geometries,progs:(renderer.info.programs||[]).length});
{const _render=render;render=function(){FIN.U.time.value=performance.now()/1000;renderer.info.reset();const GL=FIN.gallery;if(!GL){_render();FIN.frameStats.calls=renderer.info.render.calls;FIN.frameStats.tris=renderer.info.render.triangles;return;}const c=GL.c;
  sun.target.position.copy(c);sun.position.copy(c).add(W.sunOff);const sc=sun.shadow.camera,want=Math.ceil(GL.d*0.9);if(sc.right!==want){sc.left=-want;sc.right=want;sc.top=want;sc.bottom=-want;sc.updateProjectionMatrix();}
  renderer.shadowMap.needsUpdate=true;GL.cam.aspect=innerWidth/innerHeight;GL.cam.updateProjectionMatrix();renderer.setViewport(0,0,innerWidth,innerHeight);renderer.setScissor(0,0,innerWidth,innerHeight);renderer.render(scene,GL.cam);};}
FIN.showcase=function(fill,o){o=o||{};document.body.classList.toggle('fin-gallery',!!fill);if(FIN.gallery){scene.remove(FIN.gallery.g);FIN.gallery=null;}const vis=v=>{W.group.visible=v;HEROES.forEach(h=>{h.g.visible=v;});};
  if(!fill){vis(true);return null;}vis(!!o.keepWorld);const g=new THREE.Group();scene.add(g);const r=fill(g)||{};const c=r.c||new V3(),d=r.d||12;
  const cam=new THREE.PerspectiveCamera(o.fov||38,innerWidth/innerHeight,0.1,600);const yaw=o.yaw!=null?o.yaw:0.55,pitch=o.pitch!=null?o.pitch:0.42;
  cam.position.set(c.x+Math.sin(yaw)*Math.cos(pitch)*d,c.y+Math.sin(pitch)*d,c.z+Math.cos(yaw)*Math.cos(pitch)*d);cam.lookAt(c);FIN.gallery={g,cam,c,d};return FIN.gallery;};
FIN.kitGallery=function(list,o){o=o||{};if(!list)return FIN.showcase(null);return FIN.showcase(g=>{const cols=o.cols||Math.ceil(Math.sqrt(list.length)),sp=o.sp||4.2,rows=Math.ceil(list.length/cols);
  const gr=new THREE.Mesh(sBoxGeo(cols*sp+2,0.4,rows*sp+2,{b:0.1,cell:1.2,topAmp:0.03,seed:5}),new THREE.MeshLambertMaterial({color:0x7ab04c}));gr.position.set(0,-0.2,(rows-1)*sp/2);gr.receiveShadow=true;g.add(gr);
  list.forEach((it,i)=>{const [name,v,mn]=Array.isArray(it)?it:[it,0];const mat=KMAT[mn||(/tuft|bunting/.test(name)?'windD':/glow|crystal|lanternGlass/i.test(name)?'glow':'vc')];
    const m=new THREE.Mesh(kit(name,v),mat);m.position.set((i%cols-(cols-1)/2)*sp,0,Math.floor(i/cols)*sp);m.castShadow=m.receiveShadow=true;m.scale.setScalar(o.scale&&o.scale[name]||1);g.add(m);
    const gl=KIT[name+'Glass']?name+'Glass':KIT[name.replace(/Post$/,'')+'Glass']?name.replace(/Post$/,'')+'Glass':null;if(gl){const q=new THREE.Mesh(kit(gl,v),KMAT.glow);q.position.copy(m.position);g.add(q);}});
  return {c:new V3(0,o.cy||1.2,(rows-1)*sp/2),d:o.d||Math.max(cols,rows)*sp*1.25};},o);};
