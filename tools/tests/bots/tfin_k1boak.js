//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник» — тело-дуб и обломки трофеев (late_99x_k1b_leshy.js).
// 1) сбитые рог и гнездо с птенцами падают и исчезают (раньше тик обломков стоял — гнездо висело над головой до финального ролика);
// 2) облик: ствол древнего дуба — борозды коры, корни, наплывы, дупло с совой, трутовики, сучья с листьями и желудями. Кадры — спереди и сбоку.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(7);ZC.tick(30);ZC.skip();ZC.tick(60);window.K=ZC.FIN.k1b;window.L=K.cur.L;
const nest=L.parts.nest,horn=L.parts.hornL;K.lose(L,1);K.lose(L,2);const f0=K.fly.length;ZC.tick(60*1.2);const y1=nest.position.y.toFixed(1);ZC.tick(60*3);
(K.fly.length===0&&!nest.parent&&!horn.parent?'debris ok':'FAIL debris')+' fly '+f0+'→'+K.fly.length+' nest y@1.2s='+y1+' nest='+(nest.parent?'в сцене':'убрано')+' horn='+(horn.parent?'в сцене':'убран')+' errs='+_errs.length
//@@ shot=k1boak_front.png
// крупно спереди: Леший финала (один цветущий рог, без гнезда и бороды) прямо перед героями
const W=ZC.W,P=ZC.HERO.proshka.pos;L.g.visible=false;K.cur.arms.forEach(a=>a.g.visible=false);W.enemies.filter(e=>e.kind==='hand').forEach(e=>{if(e.mesh)e.mesh.visible=false;});
window.O=K.finale(1.3);O.g.position.set(P.x,0,P.z-6.5);O.g.rotation.y=0;O.hands.forEach(h=>h.sh.visible=true);
const V=THREE.Vector3,q=O.g.position;window.camAt=(x,y,z,ly)=>{ZC.G.cine={t:0,dur:999,cam:true,camPos:new V(q.x+x,y,q.z+z),camLook:new V(q.x,ly,q.z),snap:true,camK:4.5,fov:42,skippable:true,si:0,update(){},skip(){},end(){}};};   // своя камера ролика — крупный план
camAt(0,4.2,15,3.4);ZC.tick(60*4);
let tri=0;O.g.traverse(m=>{if(m.isMesh&&m.geometry)tri+=m.geometry.attributes.position.count/3;});'tris='+tri+' meshes='+Object.keys(O.meshes).join(',')+' errs='+_errs.length
//@@ shot=k1boak_side.png
O.g.rotation.y=-1.1;camAt(0,4,14,3.4);ZC.tick(10);'side'
//@@ shot=k1boak_back.png
O.g.rotation.y=Math.PI*0.85;ZC.tick(10);const e=_errs.length;'back errs='+e
//@@
ZC.G.cine=null;O.g.parent.remove(O.g);L.g.visible=true;ZC.tick(30);'cleanup errs='+_errs.length
//@@
