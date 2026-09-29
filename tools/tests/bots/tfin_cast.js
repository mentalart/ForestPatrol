//@@ shot=fin_cast_row1.png wait=300
// релиз final05: персонажи на уровне героев — витрина (скелетные модели, лица). Кадры: ряд персонажей и крупные планы; проверка: у каждого
// скелетный меш, кости лица (веки, рот, глаза), API прототипа на месте, отрисовок немного.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
ZC.startFrom(ZC.LV('luko'));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(10);
window.CB=ZC.FIN.castBuild;window.info=[];
window.row=(names,o)=>ZC.FIN.showcase(g=>{let x=0;const W=[];names.forEach((n,i)=>{const c=CB[n]();const b=new THREE.Box3().setFromObject(c.g);const w=Math.max(1.2,b.max.x-b.min.x);W.push([c,w]);});
  const tot=W.reduce((a,[c,w])=>a+w+0.6,0);let cx=-tot/2;let hmax=0;for(const [c,w] of W){cx+=w/2+0.3;c.g.position.set(cx,0,0);c.g.rotation.y=0;g.add(c.g);cx+=w/2+0.3;
    const b=new THREE.Box3().setFromObject(c.g);hmax=Math.max(hmax,b.max.y);let sk=0,calls=0;c.g.traverse(m=>{if(m.isSkinnedMesh)sk++;if(m.isMesh)calls++;});
    info.push((c.face?'':'NOFACE ')+sk+'sk/'+calls+'m lid='+!!(c.rig&&c.rig.lidL)+' mouth='+!!(c.rig&&c.rig.mouth));}
  const gr=new THREE.Mesh(new THREE.BoxGeometry(tot+4,0.2,6),new THREE.MeshLambertMaterial({color:0x7ab04c}));gr.position.y=-0.1;gr.receiveShadow=true;g.add(gr);
  return {c:new THREE.Vector3(0,hmax*0.45,0),d:Math.max(tot*0.95,hmax*2.2)};},Object.assign({yaw:0.12,pitch:0.12,fov:34},o||{}));
row(['kot','yaga','kiki','kolobok','kuzma','tishka']);ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;
info.concat(['errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')])
//@@ shot=fin_cast_row2.png wait=300
info=[];row(['leshy','koschei'],{yaw:0.2,pitch:0.1});ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info
//@@ shot=fin_cast_close1.png wait=300
info=[];row(['kot','yaga','kiki'],{yaw:0.25,pitch:0.08});ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info
//@@ shot=fin_cast_close2.png wait=300
info=[];row(['kolobok','kuzma','tishka'],{yaw:-0.2,pitch:0.1});ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info
//@@ shot=fin_cast_row3.png wait=300
info=[];row(['sadko','starik','rybka','zhar','sirin','alkonost']);ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info
//@@ shot=fin_cast_row4.png wait=300
info=[];row(['solovei','likho','kuzst','demyan']);ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info
//@@ shot=fin_cast_row5.png wait=300
info=[];row(['bogI','bogD','bogA','pechka','yablonka','gor']);ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info
//@@ shot=fin_cast_row6.png wait=300
info=[];row(['hare','duck','goose','sheep','tishka','kolobok'],{yaw:0.3,pitch:0.2});ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info.concat(['errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')])
