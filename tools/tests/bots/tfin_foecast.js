//@@ shot=fin_foes_1.png wait=300
// релиз final05: враги на уровне героев — витрина всех видов мороков (новые low-poly облики, глаза с веками и бровями, радужка = знак удара).
// Проверки: у каждого вида новый облик (castLook), глаза с веками, нет ошибок; кадры рядами.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(10);
window.frow=(kinds,o)=>{window.info=[];return ZC.FIN.showcase(g=>{const W=[];kinds.forEach(k=>{const e=ZC.FIN.dbgFoe(k,0,0,{y:0});e.alive=false;ZC.W.enemies.splice(ZC.W.enemies.indexOf(e),1);e.g.position.set(0,0,0);
    const b=new THREE.Box3().setFromObject(e.inner);W.push([e,Math.max(1.2,b.max.x-b.min.x),b.max.y]);info.push(k+':'+(e.L.castLook?'new':'OLD')+(e.ff?(e.ff.sol?' sol':' eyes'+e.ff.eyes.length):' noface'));});
  const tot=W.reduce((a,x)=>a+x[1]+0.5,0);let cx=-tot/2,hm=0;for(const [e,w,h] of W){cx+=w/2+0.25;e.g.position.set(cx,0,0);g.add(e.g);cx+=w/2+0.25;hm=Math.max(hm,h);}
  const gr=new THREE.Mesh(new THREE.BoxGeometry(tot+4,0.2,6),new THREE.MeshLambertMaterial({color:0x7ab04c}));gr.position.y=-0.1;gr.receiveShadow=true;g.add(gr);
  return {c:new THREE.Vector3(0,hm*0.42,0),d:Math.max(tot*0.95,hm*2.2)};},Object.assign({yaw:0.1,pitch:0.14,fov:34},o||{}));};
frow(['morok','thread','kiki','leshonok','tat','puzyr','tinnik']);ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info.concat(['errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')])
//@@ shot=fin_foes_2.png wait=300
frow(['stump','hand','shchuka','rak','tyagun','ten']);ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info
//@@ shot=fin_foes_3.png wait=300
frow(['tucha','motylek','vorona','pugalo','hameley','cep']);ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info
//@@ shot=fin_foes_4.png wait=300
frow(['bolvan','pechnik','lizard','zmeenysh','dvoynik']);ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info
//@@ shot=fin_foes_5.png wait=300
frow(['leshyBoss','vodyanoy','golova','solovei']);ZC.tick(2);for(const k in ZC.HERO)ZC.HERO[k].g.visible=false;info.concat(['errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')])
