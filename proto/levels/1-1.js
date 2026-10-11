/* ============================== МИР 1 · ДРЕМУЧИЙ ЛЕС · 1-1 «ИЗБУШКА, ПОВЕРНИСЬ» ============================== */
// ввод клубка: бросок, возврат, нить к нити · подкидка Потапа · кикиморки: жёлтый сигнал и отбив
function build11(){
  W.zvenAway=true;   // Звенышко улетает вперёд и появляется, только когда нужно
  setTheme('forest');W.name='1-1 · «Избушка, повернись»';W.sub='Дремучий лес · клубок-путеводитель';W.camX=9;const F=W.flags;F.stage='hut';W.fallY=-2.4;
  const ZE=-246;   // уровень вдвое длиннее: за калиткой — вороны Кощея, яблонька, печка, воронья роща, молочная речка и теремок
  ground(-11,11,-62,10);ground(-11,11,-192,-88);ground(-11,11,ZE,-204);
  wall(-11.2,-11,ZE,10);wall(11,11.2,ZE,10);wall(-11.2,11.2,10,10.2);wall(-11.2,11.2,ZE-0.2,ZE);
  edgeTrees(ZE+2,8,-11,11);
  W.dressAvoid=(x,z)=>Math.abs(x)<13&&((z<-60&&z>-90)||(z<-190&&z>-206));   // в провалы (болото, речка) деревья среднего плана не сажать — не торчат из воды
  // указатели со стёртыми надписями (лес забыл тропы)
  for(const[x,z]of[[-8.5,-4],[8.4,-44]]){addMesh(new THREE.CylinderGeometry(0.07,0.08,1.8,6),M(0x6b4a2b),x,0.9,z);const b=addMesh(new THREE.BoxGeometry(1.2,0.35,0.08),M(0x9a7a50),x+0.3,1.55,z);b.rotation.z=-0.1;}
  bell(0,3);bell(-3,-14);bell(0,-36);bell(1.8,-60.2);bell(0,-92);bell(-8.5,-118);bell(8.6,-146);bell(-9,-187.6);bell(8.6,-210);HEROES.forEach(h=>{h.trash=null;h.bedT=0;});
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2,-2);
  nutItem(-6.5,0.6,-7);
  /* ---------- избушка задом к нам, пеньки с лапками ---------- */
  const hut=makeHut();hut.g.position.set(0,0,-28);hut.g.rotation.y=Math.PI;const hutCol=colBox(-1.7,1.7,0,5,-29.7,-26.3,true);
  fadeable(hut.g);
  const porchLink=linkItem(0,4.2,-30.6);porchLink.g.visible=true;
  const seats=[-6,-2,2,6].map(x=>stumpSeat(x,-19));
  const yaga=makeYaga();yaga.g.position.set(0,2.3,-26.6);yaga.g.visible=false;
  const turn={on:false,t:0,done:false};
  W.rzt={state:'wait',t:0,beat:-1,press:[null,null],onDone:()=>{turn.on=true;F.stage='turn';say(null,'Все: «Избушка, избушка, повернись к лесу задом, к нам передом!»',3,true);
    [0,1].forEach(pi=>players[pi].heroes.forEach(h=>floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Избушка, повернись!',PCSS[pi])));}};
  /* ---------- двор: лужи грязи (вязнешь по колено), нити-тропки ---------- */
  // грядки Бабы Яги: вскопаны бороздами и засажены до самого плетня — пешком не пройти, только по золотой нити
  const mud=[[-11,-0.35,-51,-38],[0.35,11,-51,-38]];
  for(const[a,b,c,d]of mud){const m=new THREE.Mesh(new THREE.PlaneGeometry(b-a,d-c),M(0x3a2814));m.rotation.x=-Math.PI/2;m.position.set((a+b)/2,0.02,(c+d)/2);W.group.add(m);
    for(let z=c+0.7;z<d-0.3;z+=1.3){const r=addMesh(new THREE.BoxGeometry(b-a-0.3,0.22,0.55),M(0x5a3a1e),(a+b)/2,0.1,z);r.castShadow=false;
      for(let x=a+0.7;x<b-0.4;x+=rand(0.85,1.25)){const k=Math.random();
        if(k<0.45){const c2=addMesh(new THREE.SphereGeometry(rand(0.22,0.3),8,6),M(0x5f9a3a),x,0.34,z);c2.scale.y=0.75;addMesh(new THREE.SphereGeometry(0.15,8,6),M(0x8ac05a),x,0.44,z);}
        else if(k<0.8){for(let j=0;j<3;j++){const l=addMesh(new THREE.ConeGeometry(0.05,0.44,4),M(0x3f8a3a),x+rand(-0.08,0.08),0.42,z+rand(-0.08,0.08));l.rotation.z=rand(-0.3,0.3);}}
        else{addMesh(new THREE.CylinderGeometry(0.025,0.03,0.9,4),M(0x8a6a44),x,0.55,z);addMesh(new THREE.SphereGeometry(0.1,6,5),M(0xe05a3a),x,0.95,z);}}}}
  const inMud=h=>h.pos.y<0.1&&!(h.groundRef&&h.groundRef.owner!==undefined)&&mud.some(([a,b,c,d])=>h.pos.x>a&&h.pos.x<b&&h.pos.z>c&&h.pos.z<d);
  W.slowZone=inMud;
  {const fm=W.group.children.length;box(-0.35,0.35,0,1.2,-52,-37,M(0x7a5634),{occ:false});for(let z=-37.5;z>-52;z-=1.4)addMesh(new THREE.CylinderGeometry(0.1,0.12,1.5,6),M(0x5a3a1a),0,0.75,z);fadeable(since(fm));}
  nutItem(-5.5,0.5,-50.6);nutItem(5.5,0.5,-50.6);
  // сарай у колодца: на крышу — только подкидкой Потапа; стог и голубятня — для Пелагеи
  const shedMark=W.group.children.length;box(-8.8,-4.6,0,3.3,-60,-56,M(0x8a5a32));
  addMesh(new THREE.BoxGeometry(4.4,0.16,4.2),M(0x6b3f22),-6.7,3.38,-58);fadeable(since(shedMark));
  const well=W.group.children.length;addMesh(new THREE.CylinderGeometry(0.8,0.9,0.9,12),MAT.stone,-2.2,0.45,-57);addMesh(new THREE.BoxGeometry(0.1,1.6,0.1),M(0x5a3a1a),-2.9,1.3,-57);addMesh(new THREE.BoxGeometry(0.1,1.6,0.1),M(0x5a3a1a),-1.5,1.3,-57);
  addMesh(new THREE.ConeGeometry(1.0,0.6,4),M(0x6b3f22),-2.2,2.3,-57).rotation.y=Math.PI/4;W.cyls.push({x:-2.2,z:-57,r:0.9,miny:-1,maxy:0.9,on:true});
  const roofLink=linkItem(-6.7,4.1,-58);
  box(5.5,7.5,0,1.1,-57,-55.2,M(0xd8b04a));box(5.9,7.1,0,2.2,-58.6,-57,M(0xd8b04a));addMesh(new THREE.ConeGeometry(0.9,0.8,8),M(0xe0c060),6.5,2.6,-57.8);   // стог
  box(8.6,10.2,-2,2.3,-63,-61.4,M(0x9a6a3c));addMesh(new THREE.ConeGeometry(1.1,0.9,4),M(0x6b3f22),9.4,3.1,-62.2).rotation.y=Math.PI/4;                   // голубятня
  const dovLink=linkItem(9.4,3.1,-62.2);
  /* ---------- болото за сараем: нить к нити; живёт, как в 1-2 — рогоз, кувшинки, лягушки, а чудо болотное сталкивает с нити ---------- */
  const bog=new THREE.Mesh(new THREE.PlaneGeometry(22,26),M(0x1f2a1c));bog.rotation.x=-Math.PI/2;bog.position.set(0,-0.45,-75);bog.receiveShadow=true;W.group.add(bog);
  for(let i=0;i<26;i++){const d=addMesh(new THREE.CircleGeometry(rand(0.3,0.9),10),M(0x4a6a2a),rand(-10,10),-0.43,rand(-87,-63));d.rotation.x=-Math.PI/2;d.castShadow=false;}   // ряска
  const SW=swampLife({zA:-88,zB:-62,busy:(x,z)=>Math.abs(x)<3,onRope:h=>h.groundRef.owner!==undefined&&!h.groundRef.string&&h.pos.z<-63&&h.pos.z>-87,
    n:{stalk:70,sedge:80,leaf:45,snag:4,spots:16,frog:9},chuTip:pi=>'Пузыри у нити! Из болота лезет болотное чудо — столкнёт в трясину, и назад к колокольчику.<br>Отойди подальше или закройся щитом '+K(pi,'guard')+'.'});
  const pitMark=box(-11,11,-0.05,0.03,-62.1,-62,M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.25}),{solid:false}).mesh;
  const endLink=linkItem(0,1.1,-94);nutItem(-8,0.6,-100);nutItem(8,0.6,-104);
  /* ---------- уборка после кикиморок: мусор — в кучу у забора, корыто — только вдвоём ---------- */
  const HEAP=new V3(-8.9,0,-25.6),heapG=new THREE.Group();heapG.position.copy(HEAP);W.group.add(heapG);
  for(const[x,z,w,d]of[[0,-0.75,1.7,0.1],[0,0.75,1.7,0.1],[-0.8,0,0.1,1.5],[0.8,0,0.1,1.5]])addMesh(new THREE.BoxGeometry(w,0.5,d),M(0x7a5634),x,0.25,z,heapG);
  const pile=addMesh(new THREE.ConeGeometry(0.6,0.5,8),M(0x5a6a3a),0,0.2,0,heapG);pile.scale.setScalar(0.01);let heapN=0;W.cyls.push({x:HEAP.x,z:HEAP.z,r:0.85,miny:-1,maxy:0.5,on:true});
  const TR=[],TRB={g:null,state:'none'};
  /* мусор: у каждого — грязное пятно, мухи и зелёный вонючий дымок, а сам предмет узнаётся с первого взгляда (кость, огрызок, битый горшок, ведро, тряпка…) */
  function trashFlies(g,n,r,h){const fl=[],st=[];
    for(let i=0;i<n;i++){const m=addMesh(new THREE.SphereGeometry(0.045,5,4),MB(0x15110c),0,h,0,g);m.castShadow=false;fl.push({m,a:rand(0,6.28),r:rand(0.5,1)*r,s:rand(3,6)*(i%2?1:-1),h:h+rand(-0.1,0.2)});}
    for(let i=0;i<3;i++){const m=addMesh(new THREE.SphereGeometry(0.2,7,5),MB(0x8fd04a,{transparent:true,opacity:0,depthWrite:false}),0,0.3,0,g);m.castShadow=false;st.push({m,ph:i/3,x:rand(-0.15,0.15)*r,z:rand(-0.15,0.15)*r});}
    g.userData.fx={fl,st};}
  function trashFx(g){const fx=g.userData.fx;if(!fx)return;const t=G.time;
    for(const f of fx.fl){const a=f.a+t*f.s;f.m.position.set(Math.cos(a)*f.r,f.h+Math.sin(t*9+f.a)*0.06,Math.sin(a*1.3)*f.r);}
    for(const s of fx.st){const k=(t*0.45+s.ph)%1;s.m.position.set(s.x+Math.sin(k*6+s.ph*9)*0.1,0.25+k*1.0,s.z);s.m.material.opacity=0.5*Math.sin(k*Math.PI);s.m.scale.setScalar(0.6+k*1.0);}}
  function trashMesh(kind){const g=new THREE.Group(),mess=addMesh(new THREE.CircleGeometry(0.75,10),M(0x45331f),0,0.025,0,g);mess.rotation.x=-Math.PI/2;mess.scale.set(1.15,0.9,1);mess.castShadow=false;g.userData.mess=mess;
    if(kind==='bone'){const w=M(0xf1e9cf);   // рыбий скелет: хребет, рёбра, голова с глазницей, хвост
      addMesh(new THREE.BoxGeometry(0.95,0.05,0.06),w,0,0.07,0,g);
      for(let i=-3;i<=3;i++){const r=addMesh(new THREE.BoxGeometry(0.04,0.035,0.36),w,i*0.11,0.07,0,g);r.rotation.y=i*0.12;}
      const hd0=addMesh(new THREE.SphereGeometry(0.15,8,6),w,0.58,0.1,0,g);hd0.scale.set(1.3,0.8,1);addMesh(new THREE.SphereGeometry(0.04,6,5),M(0x1a1208),0.64,0.17,0.07,g);
      const tl=addMesh(new THREE.ConeGeometry(0.2,0.3,3),w,-0.62,0.07,0,g);tl.rotation.z=-Math.PI/2;tl.scale.set(1,1,0.25);}
    else if(kind==='core'){const a=new THREE.Group();a.position.set(0,0.3,0);a.rotation.z=1.25;g.add(a);   // яблочный огрызок: мякоть, красная кожура на концах, косточки
      addMesh(new THREE.LatheGeometry([[0,0],[0.25,0.04],[0.28,0.14],[0.1,0.3],[0.1,0.5],[0.28,0.66],[0.25,0.76],[0,0.8]].map(([x,y])=>new THREE.Vector2(x,y)),10),M(0xefe0a8),0,-0.4,0,a);
      for(const y of[-0.34,0.34]){const t=addMesh(new THREE.TorusGeometry(0.26,0.05,5,10),M(0xc8321e),0,y,0,a);t.rotation.x=Math.PI/2;}
      addMesh(new THREE.CylinderGeometry(0.03,0.03,0.4,5),M(0x4a2e14),0,0.55,0,a);for(const[x,y]of[[0.1,-0.05],[-0.08,0.1]])addMesh(new THREE.SphereGeometry(0.035,5,4),M(0x1a1208),x,y,0.1,a);}
    else if(kind==='pot'){const c=M(0xb4623a,{side:THREE.DoubleSide});   // горшок с выбитым боком и черепки вокруг
      addMesh(new THREE.CylinderGeometry(0.34,0.24,0.42,10,1,true,0.4,4.2),c,0,0.21,0,g);const d=addMesh(new THREE.CircleGeometry(0.24,10),M(0x2a160c),0,0.03,0,g);d.rotation.x=-Math.PI/2;
      for(let i=0;i<4;i++){const an=i*1.7+0.5,s=addMesh(i%2?new THREE.ConeGeometry(0.16,0.04,3):new THREE.BoxGeometry(0.24,0.035,0.17),c,Math.cos(an)*0.58,0.05,Math.sin(an)*0.5,g);s.rotation.set(rand(-0.2,0.2),rand(0,3),rand(-0.2,0.2));}}
    else if(kind==='bucket'){const gr=M(0x6f7a80,{side:THREE.DoubleSide});   // дырявое ведро набок, дужка рядом
      const b=addMesh(new THREE.CylinderGeometry(0.3,0.23,0.5,10,1,true),gr,0,0.3,0,g);b.rotation.z=Math.PI/2;const m=addMesh(new THREE.CircleGeometry(0.28,10),M(0x2e2a26),-0.2,0.3,0,g);m.rotation.y=-Math.PI/2;
      const bd=addMesh(new THREE.TorusGeometry(0.29,0.025,4,12),M(0x3a3f44),-0.1,0.3,0,g);bd.rotation.y=Math.PI/2;
      const hn=addMesh(new THREE.TorusGeometry(0.26,0.018,4,12,Math.PI),M(0x3a3f44),0.15,0.03,0.5,g);hn.rotation.x=Math.PI/2;}
    else if(kind==='rag'){const cols=[0x8a6a96,0x6a4a76,0xa88fb0];   // драная тряпка с бахромой
      for(let i=0;i<3;i++){const r=addMesh(new THREE.CircleGeometry(0.4-i*0.07,7),M(cols[i],{side:THREE.DoubleSide}),i*0.1-0.1,0.04+i*0.025,i*0.08,g);r.rotation.set(-Math.PI/2+rand(-0.15,0.15),0,rand(0,3));}
      for(let i=0;i<4;i++){const f=addMesh(new THREE.BoxGeometry(0.04,0.015,0.25),M(0x8a6a96),0.35+i*0.06,0.04,-0.2+i*0.12,g);f.rotation.y=rand(-0.5,0.5);}}
    else if(kind==='lapot'){   // стоптанный лапоть: плетёный башмак с верёвочками
      const l=addMesh(new THREE.SphereGeometry(0.3,10,7),M(0xc9a35e),0,0.14,0,g);l.scale.set(1.5,0.5,0.8);
      for(let i=-3;i<=3;i++){const s=addMesh(new THREE.BoxGeometry(0.035,0.03,0.4),M(0x8a6a34),i*0.12,0.25-Math.abs(i)*0.012,0,g);s.rotation.y=0.35;}
      addMesh(new THREE.SphereGeometry(0.1,6,5),M(0xc9a35e),0.45,0.2,0,g);for(const z of[-1,1]){const t=addMesh(new THREE.BoxGeometry(0.4,0.02,0.02),M(0x2a1e12),-0.45,0.05,z*0.12,g);t.rotation.y=z*0.7;}}
    else if(kind==='spoon'){const w=M(0xc89a5a);   // сломанная ложка: черпак и обломок ручки
      const b=addMesh(new THREE.SphereGeometry(0.17,8,6),w,0.2,0.07,0,g);b.scale.set(1.3,0.45,1);const st=addMesh(new THREE.CylinderGeometry(0.035,0.035,0.5,5),w,-0.2,0.06,0,g);st.rotation.z=Math.PI/2;
      const st2=addMesh(new THREE.CylinderGeometry(0.035,0.035,0.28,5),w,-0.55,0.06,0.3,g);st2.rotation.set(0,0.6,Math.PI/2);}
    else{const c=addMesh(new THREE.SphereGeometry(0.3,9,7),M(0x8aa84a),0,0.24,0,g);c.scale.set(1,0.8,1);   // гнилая капуста с бурыми пятнами и оборванными листьями
      for(let i=0;i<4;i++){const an=i*1.6;addMesh(new THREE.SphereGeometry(0.09,6,5),M(0x5a4a24),Math.cos(an)*0.2,0.3+i%2*0.08,Math.sin(an)*0.2,g);}
      for(let i=0;i<3;i++){const l=addMesh(new THREE.CircleGeometry(0.22,7),M(0x6f8a3a,{side:THREE.DoubleSide}),Math.cos(i*2.1)*0.42,0.05,Math.sin(i*2.1)*0.42,g);l.rotation.x=-Math.PI/2;}}
    trashFlies(g,3,0.55,0.75);return g;}
  function startClean(){F.stage='clean';const spots=[[-7,-22],[7,-22],[-6.5,-31],[6.5,-31],[0,-16.5],[-3.8,-23.8],[4,-17.6],[-8.4,-17.4],[7.8,-28.8]],kinds=['bone','core','pot','bucket','rag','lapot','spoon','cabbage','bone'];
    spots.forEach(([x,z],i)=>{const g=trashMesh(kinds[i%kinds.length]);g.scale.setScalar(1.35);g.position.set(x,0,z);W.group.add(g);TR.push({g,state:'ground',by:null});later(i*0.08,()=>anim(0.5,k=>{g.position.y=Math.sin(k*Math.PI)*0.8;}));});
    const tb=new THREE.Group();tb.position.set(5.6,0,-25.2);W.group.add(tb);addMesh(new THREE.BoxGeometry(1.7,0.35,0.8),M(0x8a5a32),0,0.18,0,tb);addMesh(new THREE.BoxGeometry(1.5,0.1,0.6),M(0x2f2a18),0,0.34,0,tb);   // корыто с помоями: гнилые кочерыжки, кости торчком, мухи
    for(let i=0;i<6;i++)addMesh(new THREE.SphereGeometry(rand(0.13,0.2),6,5),M([0x6f8a3a,0x4a3a22,0x9a7a3a][i%3]),-0.55+i*0.22,0.42,rand(-0.15,0.15),tb);
    for(const[x,r]of[[-0.3,0.5],[0.35,-0.6]]){const bn=M(0xf1e9cf),b=addMesh(new THREE.CylinderGeometry(0.03,0.03,0.6,5),bn,x,0.6,0.1,tb);b.rotation.z=r;addMesh(new THREE.SphereGeometry(0.06,6,5),bn,x-Math.sin(r)*0.3,0.6+Math.cos(r)*0.3,0.1,tb);}
    trashFlies(tb,5,0.9,0.95);TRB.g=tb;TRB.state='ground';
    later(0.6,()=>bark(yaga,'yaga','Ну? Сам себя мусор не уберёт!<br>Всё — в кучу у забора, вперёд!',2.8));}
  // нести вдвоём (корыто, полено, брёвна теремка): берут, когда оба рядом (в одиночке — ты рядом, напарник подтянется), разошлись — уронили;
  // донесли до goal (ближе R) — onArrive; tell — подсказка, когда к лежачему подошли
  function pairCarry(C,dt,goal,R,tell,onArrive){if(C.state!=='ground'&&C.state!=='carry')return;const a=[active(0),active(1)],bp=C.g.position,mid=new V3((a[0].pos.x+a[1].pos.x)/2,0,(a[0].pos.z+a[1].pos.z)/2);
    const ok=a.every(h=>!players[h.player].downed)&&(C.state==='carry'?hd(a[0].pos,a[1].pos)<(G.solo?9:5.5):G.solo?(a.some(h=>ctrl(h)&&hd(h.pos,bp)<1.9)&&hd(a[0].pos,a[1].pos)<9):a.every(h=>hd(h.pos,bp)<1.9));
    if(ok){if(C.state==='ground'){C.state='carry';SFX.latch();if(G.solo)for(const h of a)if(!ctrl(h)){h.following=true;h.stuck=0;}floatText(bp.clone().add(new V3(0,1.2,0)),'Взяли! Вместе!','#ffd76a');}
      bp.x=damp(bp.x,mid.x,14,dt);bp.z=damp(bp.z,mid.z,14,dt);bp.y=damp(bp.y,0.9,8,dt);C.g.rotation.y=Math.atan2(a[1].pos.x-a[0].pos.x,a[1].pos.z-a[0].pos.z)+Math.PI/2;
      if(hd(bp,goal)<R){C.state='fly';onArrive();}}
    else{if(C.state==='carry'){C.state='ground';SFX.thud();floatText(bp.clone().add(new V3(0,1.2,0)),'Бух! Вдвоём держите — не роняйте!','#ffd0d0');}bp.y=damp(bp.y,0,10,dt);
      if(a.some(h=>hd(h.pos,bp)<1.8))tell();}}
  const cleanN=()=>TR.filter(t=>t.state==='done').length+(TRB.state==='done'?1:0);
  function toHeap(g,done,keep){const from=g.position.clone(),to=HEAP.clone().add(new V3(rand(-0.3,0.3),0.35+heapN*0.03,rand(-0.3,0.3)));anim(0.5,k=>{g.position.lerpVectors(from,to,k);g.position.y+=Math.sin(k*Math.PI)*1.2;
      if(k>=1){if(keep){heapG.add(g);g.scale.setScalar(0.5);g.position.set(rand(-0.4,0.4),0.3+rand(0,0.25),rand(-0.4,0.4));g.rotation.set(rand(-0.4,0.4),rand(0,6.28),rand(-0.4,0.4));}else W.group.remove(g);heapN++;pile.scale.setScalar(Math.min(1.4,0.3+heapN*0.12));SFX.thud();burst(HEAP.clone().add(new V3(0,0.6,0)),0x8a6a44,8,2);done();}});}
  /* ---------- Калитка-упрямица: пускает, только если нажаты обе лапки; за ней — ещё две ---------- */
  const GZ=-107,wick=M(0x9a7a4a);
  for(const[a,b]of[[-11,-2.2],[2.2,11]]){box(a,b,0,2.0,GZ-0.25,GZ+0.25,wick,{occ:false});colBox(a,b,2.0,4.5,GZ-0.25,GZ+0.25,false);for(let x=a+0.3;x<b;x+=0.6)addMesh(new THREE.ConeGeometry(0.09,0.35,5),M(0x7a5a34),x,2.15,GZ);}
  for(const sd of[-1,1])addMesh(new THREE.CylinderGeometry(0.16,0.18,3.0,8),M(0x6b4a2b),sd*2.3,1.5,GZ);addMesh(new THREE.BoxGeometry(5.0,0.34,0.4),M(0x6b4a2b),0,3.0,GZ);
  const gface=new THREE.Group();gface.position.set(0,3.0,GZ+0.22);W.group.add(gface);for(const sd of[-1,1]){part(gface,new THREE.SphereGeometry(0.14,10,8),M(0xffffff),sd*0.5,0.02,0);part(gface,new THREE.SphereGeometry(0.06,8,6),MAT.dark,sd*0.5,0.02,0.11);}
  const gmouth=part(gface,new THREE.TorusGeometry(0.2,0.04,6,14,Math.PI),M(0x3a2410),0,-0.1,0.06);
  const leaves=[];for(const sd of[-1,1]){const lv=new THREE.Group();lv.position.set(sd*2.2,0,GZ);W.group.add(lv);addMesh(new THREE.BoxGeometry(2.1,2.1,0.16),wick,-sd*1.05,1.05,0,lv);for(let k=0;k<4;k++)addMesh(new THREE.BoxGeometry(2.0,0.06,0.2),M(0x7a5a34),-sd*1.05,0.3+k*0.5,0,lv);leaves.push({lv,sd});}
  const gateCol=colBox(-2.2,2.2,0,4.5,GZ-0.25,GZ+0.25,false);
  const PL=[[-5.5,-102.5],[5.5,-102.5],[-5.5,-111.5],[5.5,-111.5]].map(([x,z])=>{const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.8,0.85,0.12,20),M(0x8a5a32),0,0.06,0,g);
    const pm=M(0xffd76a,{emissive:0xb07a10,emissiveIntensity:0.2});for(let k=0;k<3;k++){const t=addMesh(new THREE.BoxGeometry(0.09,0.02,0.44),pm,Math.sin((k-1)*0.55)*0.2,0.13,0.1,g);t.rotation.y=(k-1)*0.55;}addMesh(new THREE.BoxGeometry(0.09,0.02,0.3),pm,0,0.13,-0.24,g);   // курья лапка
    return {g,x,z,pm,on:false};});
  let gOpen=0,gShut=0;const gateOpen=()=>gOpen>0.6,onPlate=h=>PL.some(p=>Math.hypot(h.pos.x-p.x,h.pos.z-p.z)<0.85);
  W.noSplitFn=()=>F.stage==='yard'&&!F.out&&[0,1].every(pi=>active(pi).pos.z<-92);   // у калитки лапки в 11 м друг от друга: экран не делим — калитка и обе лапки в кадре
  W.clean11={TR,TRB,HEAP,PL,gateOpen:()=>gateOpen(),cleanN:()=>cleanN()};   // для проверки ботом
  const gateObj=pi=>O(()=>'Калитка открыта, пока лапки нажаты! Двое — на лапки снаружи, двое других проходят '+K(pi,'swap')+'.<br>Вошедшие встают на лапки внутри — и пропускают оставшихся.',
    ()=>!!F.out,()=>(endLink.taken?[]:[endLink.g]).concat(PL.map(p=>p.g)));
  /* ====================== ЗА КАЛИТКОЙ: вороны Кощея — яблонька, печка, воронья роща, молочная речка; теремок ====================== */
  // Вороны кружат над героями; один за другим пикирует: круг с тенью на земле — отбеги, закройся щитом или спрячься (под яблоньку, у печки, в дыму,
  // над молочной речкой — в пару не видят). Схватил — назад к колокольчику. Без дыма в вороньей роще пикируют без передышки.
  Object.assign(WHO,{voron:['Ворон Кощея','#b8b8d8'],yablonya:['Яблонька','#a8e07a'],pechka:['Печка','#ffb080'],mysh:['Мышка-норушка','#d8c8c0'],kvak:['Лягушка-квакушка','#9fe07a'],
    zayka:['Зайчик-побегайчик','#e8e8f4'],lisa:['Лисичка-сестричка','#ff9a50'],volk:['Волчок — серый бочок','#a8b0c0']});
  F.logs=0;F.apples=0;
  const caw=()=>{tone(430,0.16,'sawtooth',0.07,250);later(0.2,()=>tone(400,0.2,'sawtooth',0.07,230));};
  /* ---------- яблонька: отряси — ударь по стволу; съешьте по яблочку — опустит ветки и укроет ---------- */
  const YB={x:5.2,z:-132,pos:new V3(5.2,0.4,-132),d:{height:2.6}},yt=new THREE.Group();yt.position.set(YB.x,0,YB.z);W.group.add(yt);
  addMesh(new THREE.CylinderGeometry(0.26,0.36,2.4,8),M(0x6b4a2b),0,1.2,0,yt);
  for(const s of[-1,1]){addMesh(new THREE.SphereGeometry(0.09,8,6),M(0xffffff),s*0.12,1.7,0.27,yt);addMesh(new THREE.SphereGeometry(0.045,6,5),MAT.dark,s*0.12,1.7,0.35,yt);}   // глазки на стволе
  const crown=new THREE.Group();crown.position.y=2.9;yt.add(crown);
  for(const[x,y,z,r]of[[0,0.2,0,1.5],[-0.9,-0.2,0.3,1.1],[0.9,-0.1,-0.2,1.15],[0.2,0.5,-0.7,1.0]])addMesh(new THREE.SphereGeometry(r,10,8),M(0x4f9a3a),x,y,z,crown);
  const APL=[];for(let i=0;i<7;i++){const a=i/7*Math.PI*2;APL.push({m:addMesh(new THREE.SphereGeometry(0.17,8,6),M(0xd8302a,{emissive:0x400808,emissiveIntensity:0.3}),Math.cos(a)*1.3,-0.4+(i%2)*0.6,Math.sin(a)*1.3+0.25,crown),down:false,eaten:false});}
  W.cyls.push({x:YB.x,z:YB.z,r:0.4,miny:-1,maxy:2.4,on:true});
  const ybNut=nutItem(YB.x+0.4,3.4,YB.z+0.6);
  function shakeApple(){F.shaken=true;SFX.thud();burst(new V3(YB.x,3,YB.z),0x6fb04a,16,3);anim(0.9,k=>{crown.rotation.z=Math.sin(k*Math.PI*6)*0.12*(1-k);});
    APL.forEach((ap,i)=>{const wp=new V3();ap.m.getWorldPosition(wp);crown.remove(ap.m);W.group.add(ap.m);ap.m.position.copy(wp);const a=rand(0,6.3),r=rand(1.5,2.6);ap.x=YB.x+Math.cos(a)*r;ap.z=YB.z+Math.sin(a)*r;
      later(i*0.07,()=>anim(0.5,k=>{ap.m.position.set(lerp(wp.x,ap.x,k),lerp(wp.y,0.17,k)+Math.sin(k*Math.PI)*0.4,lerp(wp.z,ap.z,k));if(k>=1)ap.down=true;}));});
    anim(0.7,k=>{ybNut.base=lerp(3.4,0.6,k);});
    later(0.6,()=>bark(YB,'yablonya','Ох, легче стало! Съешьте по яблочку — укрою от ворон.',2.8));}
  W.hittables.push({pos:new V3(YB.x,1.2,YB.z),r:0.9,alive:()=>F.stage==='crows'&&!F.shaken,onHit:()=>shakeApple()});
  /* ---------- печка: полено вдвоём — растопится, угостит пирожками, а дым из трубы укроет воронью рощу ---------- */
  const PC={x:-6,z:-157.2,pos:new V3(-6,0.6,-155.6),d:{height:2.2}},PCF={x:-6,z:-154.8},pm=M(0xf2ece0);
  box(-7.2,-4.8,0,1.5,-158.6,-155.9,pm);box(-7.2,-4.8,1.5,2.1,-158.6,-157.2,pm);box(-6.5,-5.7,2.1,3.6,-158.4,-157.6,pm);box(-7.2,-4.8,0.82,0.92,-155.9,-155.4,pm,{solid:false});
  addMesh(new THREE.BoxGeometry(2.42,0.12,0.04),M(0xc83a2a),-6,1.36,-155.88);addMesh(new THREE.CircleGeometry(0.5,16,0,Math.PI),M(0x1a1008),-6,0.4,-155.88);addMesh(new THREE.PlaneGeometry(1.0,0.4),M(0x1a1008),-6,0.2,-155.88);
  for(const s of[-1,1]){addMesh(new THREE.SphereGeometry(0.13,8,6),M(0xffffff),-6+s*0.5,1.08,-155.86);addMesh(new THREE.SphereGeometry(0.06,6,5),MAT.dark,-6+s*0.5,1.06,-155.74);
    addMesh(new THREE.CircleGeometry(0.12,10),M(0xf0a0a0),-6+s*0.85,0.82,-155.88);addMesh(new THREE.BoxGeometry(0.28,0.05,0.04),M(0x5a3a2a),-6+s*0.5,1.28,-155.86).rotation.z=-s*0.2;}   // глаза, брови, румянец
  const fire=addMesh(new THREE.ConeGeometry(0.3,0.55,6),M(0xff8020,{emissive:0xff6000,emissiveIntensity:1.5}),-6,0.3,-156.3);fire.visible=false;fire.castShadow=false;
  const PIES=[];for(let i=0;i<4;i++){const m=addMesh(new THREE.SphereGeometry(0.17,10,6,0,Math.PI*2,0,Math.PI/2),M(0xe0a050,{emissive:0x603010,emissiveIntensity:0.3}),-6.75+i*0.5,0.92,-155.62);m.scale.set(1.3,0.7,0.9);m.visible=false;PIES.push(m);}
  const pieBy=new Set();
  {const fm=W.group.children.length;for(let i=0;i<9;i++){const c=addMesh(new THREE.CylinderGeometry(0.2,0.2,1.3,7),M(i%2?0x8a5a32:0x7a4a28),8.6,0.2+Math.floor(i/3)*0.36,-152.4+(i%3)*0.42-Math.floor(i/3)*0.2);c.rotation.z=Math.PI/2;}fadeable(since(fm));}   // поленница
  const LG={g:new THREE.Group(),state:'ground'};LG.g.position.set(6.2,0,-150.4);W.group.add(LG.g);{const c=addMesh(new THREE.CylinderGeometry(0.26,0.26,2.2,9),M(0x8a5a32),0,0.26,0,LG.g);c.rotation.z=Math.PI/2;
    for(const s of[-1,1]){const e=addMesh(new THREE.CircleGeometry(0.25,9),M(0xe0c090),s*1.11,0.26,0,LG.g);e.rotation.y=s*Math.PI/2;}}
  nutItem(-8.6,0.6,-153.4);
  // дым: клубы из трубы и пелена над вороньей рощей
  const smokeM=()=>MB(0xcfd0d6,{transparent:true,opacity:0,depthWrite:false});
  const PUFF=[];for(let i=0;i<10;i++){const m=addMesh(new THREE.SphereGeometry(0.5,8,6),smokeM(),-6.1,3.7,-158);m.castShadow=false;PUFF.push({m,t:i*0.35});}
  const fogM=smokeM(),FOG=[];for(let i=0;i<28;i++){const m=addMesh(new THREE.SphereGeometry(rand(1.4,2.3),8,6),fogM,rand(-10,10),rand(2.0,4.2),rand(-185,-161));m.castShadow=false;m.userData.noBatch=true;FOG.push({m,x:m.position.x,ph:rand(0,6.3)});}
  /* ---------- воронья роща: сухие берёзы, гнёзда, вороны на гнёздах ---------- */
  {const fm=W.group.children.length;for(let z=-162.5,i=0;z>-185;z-=3.6,i++)for(const s of[-1,1]){const x=s*rand(7.4,10.2),h=rand(3.8,5.2);addMesh(new THREE.CylinderGeometry(0.16,0.22,h,7),M(0xe8e4dc),x,h/2,z+rand(-1,1));
      for(let k=0;k<3;k++)addMesh(new THREE.BoxGeometry(0.3,0.06,0.3),M(0x2a2a2a),x,0.6+k*h*0.28,z);
      if((i+(s>0?1:0))%2===0){const n=addMesh(new THREE.TorusGeometry(0.42,0.16,6,12),M(0x4a3a24),x,h+0.05,z);n.rotation.x=Math.PI/2;}}fadeable(since(fm));}
  for(const[x,z,ry]of[[-8.6,-169.7,0.9],[8.8,-176.9,-0.8]]){const r=makeRaven();r.g.position.set(x,4.9,z);r.g.rotation.y=ry;r.g.scale.setScalar(1.1);r.wings.forEach(w=>{w.rotation.z=-w.userData.s*0.15;});}   // сидят на гнёздах
  nutItem(-9.4,0.6,-178.5);
  /* ---------- молочная речка, кисельные берега: по нити ---------- */
  {const m=new THREE.Mesh(new THREE.PlaneGeometry(22,12),M(0xf6f3ea,{emissive:0x302e28,emissiveIntensity:0.3}));m.rotation.x=-Math.PI/2;m.position.set(0,-0.55,-198);W.group.add(m);
    for(const zc of[-190.3,-205.7]){const k=new THREE.Mesh(new THREE.PlaneGeometry(22,3.4),M(0xd88aa0));k.rotation.x=-Math.PI/2;k.position.set(0,0.03,zc);W.group.add(k);
      for(let i=0;i<14;i++){const b=addMesh(new THREE.SphereGeometry(rand(0.25,0.5),8,6),M(0xe0a0b4),rand(-10.5,10.5),0.02,zc+rand(-1.5,1.5));b.scale.y=0.25;b.castShadow=false;}}}
  const steamM=MB(0xffffff,{transparent:true,opacity:0.16,depthWrite:false}),STEAM=[];for(let i=0;i<10;i++){const m=addMesh(new THREE.SphereGeometry(rand(0.8,1.3),8,6),steamM,rand(-9,9),0.2,rand(-203,-193));m.castShadow=false;STEAM.push({m,ph:rand(0,6.3)});}
  const inKisel=h=>h.pos.y<0.2&&!(h.groundRef&&h.groundRef.owner!==undefined)&&((h.pos.z<-188.6&&h.pos.z>-192)||(h.pos.z<-204&&h.pos.z>-207.4))&&Math.abs(h.pos.x)<11;
  W.slowZone=h=>inMud(h)||inKisel(h);
  /* ---------- теремок: сруб стоит, верх раскатился — брёвна вдвоём, конёк — подкидкой Потапа на леса ---------- */
  const TM={x:0,z:-232},tmG=new THREE.Group();tmG.position.set(TM.x,0,TM.z);W.group.add(tmG);const logM=[M(0xb07a44),M(0x9a6a3a)];
  const tmRing=(par,y,m)=>{for(const z of[2.1,-2.1]){const c=addMesh(new THREE.CylinderGeometry(0.22,0.22,4.9,8),m,0,y,z,par);c.rotation.z=Math.PI/2;}
    for(const x of[2.1,-2.1]){const c=addMesh(new THREE.CylinderGeometry(0.22,0.22,4.9,8),m,x,y+0.22,0,par);c.rotation.x=Math.PI/2;}};
  for(let k=0;k<5;k++)tmRing(tmG,0.22+k*0.44,logM[k%2]);
  addMesh(new THREE.BoxGeometry(1.1,1.6,0.1),M(0x4a2e18),0,0.8,2.36,tmG);addMesh(new THREE.BoxGeometry(1.4,0.14,0.16),M(0xe8e0d0),0,1.66,2.38,tmG);addMesh(new THREE.BoxGeometry(1.7,0.24,0.8),M(0x8a5a32),0,0.12,2.75,tmG);   // дверь, наличник, крылечко
  const VEN=[0,1,2].map(k=>{const v=new THREE.Group();tmG.add(v);for(let j=0;j<2;j++)tmRing(v,2.42+(k*2+j)*0.44,logM[(k*2+j+1)%2]);
    if(k===1)for(const x of[-1.1,1.1]){addMesh(new THREE.BoxGeometry(0.9,0.8,0.08),M(0xe8e0d0),x,3.5,2.36,v);addMesh(new THREE.BoxGeometry(0.62,0.54,0.06),M(0x3a5a8a,{emissive:0x101830,emissiveIntensity:0.4}),x,3.5,2.4,v);
      for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.28,0.74,0.06),M(0x4a7ac0),x+s*0.6,3.5,2.42,v);}
    v.visible=false;return v;});
  const ROOF=new THREE.Group();tmG.add(ROOF);for(const s of[-1,1]){const r=addMesh(new THREE.BoxGeometry(3.4,0.14,5.4),M(0xc0503a),s*1.25,5.9,0,ROOF);r.rotation.z=-s*0.7;}
  {const sh=new THREE.Shape();sh.moveTo(-2.4,0);sh.lineTo(2.4,0);sh.lineTo(0,2.0);sh.lineTo(-2.4,0);for(const z of[2.32,-2.32])addMesh(new THREE.ShapeGeometry(sh),M(0xb07a44,{side:THREE.DoubleSide}),0,4.84,z,ROOF);
    addMesh(new THREE.CircleGeometry(0.32,12),M(0xe8e0d0),0,5.6,2.34,ROOF);}   // фронтон и слуховое окошко
  ROOF.visible=false;
  const tmCol=colBox(TM.x-2.35,TM.x+2.35,0,2.4,TM.z-2.35,TM.z+2.35,true);
  // леса у теремка: на настил — только подкидкой Потапа; на настиле — конёк с петушком и звено
  {const fm=W.group.children.length;box(2.6,5.4,3.0,3.3,TM.z-1.4,TM.z+1.4,M(0x9a7a50));for(const[x,z]of[[2.75,-1.25],[5.25,-1.25],[2.75,1.25],[5.25,1.25]])addMesh(new THREE.CylinderGeometry(0.09,0.11,3.0,6),M(0x6b4a2b),x,1.5,TM.z+z);fadeable(since(fm));}
  const TOSS={x:4.0,z:-229.6};{const m=new THREE.Mesh(new THREE.RingGeometry(0.75,0.95,24),MB(0xffd76a,{transparent:true,opacity:0.55,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(TOSS.x,0.04,TOSS.z);W.group.add(m);}
  const KON={g:new THREE.Group()};KON.g.position.set(4.4,3.42,TM.z-0.6);W.group.add(KON.g);
  {const b=addMesh(new THREE.CylinderGeometry(0.12,0.12,2.4,7),M(0xb07a44),0,0.12,0,KON.g);b.rotation.x=Math.PI/2;const ck=new THREE.Group();ck.position.set(0,0.3,1.1);KON.g.add(ck);KON.cock=ck;   // конёк и петушок
    part(ck,new THREE.SphereGeometry(0.26,10,8),M(0xe8a030),0,0.2,0).scale.set(0.8,1,1.1);part(ck,new THREE.SphereGeometry(0.15,8,6),M(0xe8a030),0,0.48,0.16);part(ck,new THREE.ConeGeometry(0.05,0.14,4),M(0xffd040),0,0.46,0.34).rotation.x=Math.PI/2;
    for(let i=0;i<3;i++)part(ck,new THREE.ConeGeometry(0.05,0.14,4),M(0xd82a1a),0,0.62,0.08+i*0.07);for(let i=0;i<4;i++){const t=part(ck,new THREE.ConeGeometry(0.06,0.42,4),M([0x2a6a3a,0xd82a1a][i%2]),(i-1.5)*0.06,0.32,-0.3);t.rotation.x=-0.9+i*0.12;}}
  linkItem(4.0,3.95,TM.z+0.4);
  const LOGS=[[-7.2,-214.5,0.3],[7.0,-217.2,-0.5],[-7.0,-224.5,0.9]].map(([x,z,ry])=>{const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;W.group.add(g);
    const c=addMesh(new THREE.CylinderGeometry(0.22,0.22,2.6,8),logM[0],0,0.22,0,g);c.rotation.z=Math.PI/2;for(const s of[-1,1]){const e=addMesh(new THREE.CircleGeometry(0.21,8),M(0xe0c090),s*1.31,0.22,0,g);e.rotation.y=s*Math.PI/2;}
    return {g,state:'ground'};});
  nutItem(9.4,0.6,-238);
  const BEAST=[['mysh',-3.4,-227.6],['kvak',-5.0,-230.2],['zayka',-4.4,-234.8],['lisa',6.9,-227.4],['volk',7.4,-235.0]].map(([k,x,z])=>{const b=makeTeremBeast(k);b.g.position.set(x,0,z);b.g.rotation.y=Math.atan2(-x,TM.z+4-z);b.pos=b.g.position;b.d={height:1.2};b.hop=0;return b;});
  const beast=k=>BEAST.find(b=>b.kind===k);
  const cheer=()=>BEAST.forEach((b,i)=>later(i*0.1,()=>{b.hop=0.6;if(i%2===0)floatText(b.pos.clone().add(new V3(0,1.6,0)),['Ура!','Ай да мастера!','Ура-а!'][i%3],'#fff2c0');}));
  /* ---------- вороны ---------- */
  const RV={on:false,flee:false,L:[0,1,2].map(i=>Object.assign(makeRaven(),{a:i*2.1,i})),dive:null,cd:2.5,grabs:0,blocks:0,dodges:0,lost:0};
  RV.L.forEach(r=>{r.g.visible=false;r.g.position.set(0,14,-150);});
  RV.ring=new THREE.Mesh(new THREE.CircleGeometry(1.5,28),MB(0x10101a,{transparent:true,opacity:0,depthWrite:false}));RV.rim=new THREE.Mesh(new THREE.TorusGeometry(1.5,0.07,6,40),MB(0xffd040,{transparent:true,opacity:0,depthWrite:false}));
  for(const m of[RV.ring,RV.rim]){m.rotation.x=-Math.PI/2;m.userData.noBatch=true;m.castShadow=false;W.group.add(m);}
  const sheltered=h=>(F.appleHide&&hd(h.pos,YB)<3.1)||(F.smoke&&hd(h.pos,PCF)<2.8);
  const hidden=h=>h.pos.z>GZ-1.5||(h.pos.z<-187&&h.pos.z>-208.5)||(F.smoke&&h.pos.z<-159&&h.pos.z>-187)||sheltered(h);
  const nest=z=>!F.smoke&&z<-159&&z>-187;
  const ravTarget=()=>[0,1].map(pi=>active(pi)).filter(h=>ctrl(h)&&!players[h.player].downed&&!h.cling&&!(W.ravSkip&&W.ravSkip(h))&&h.pos.y>-0.4&&!hidden(h));
  function ravUpdate(dt){const t=G.time,hs=[active(0),active(1)],cx=(hs[0].pos.x+hs[1].pos.x)*0.25,cz=Math.min(hs[0].pos.z,hs[1].pos.z)-3;
    for(const r of RV.L){r.wings.forEach(w=>{w.rotation.z=w.userData.s*Math.sin(t*10+r.i*1.7)*0.7;});if(RV.dive&&RV.dive.r===r)continue;
      let tx,ty,tz;if(RV.flee){tx=r.g.position.x+(r.i-1)*6;ty=24;tz=r.g.position.z-30;}else{r.a+=dt*0.9;tx=cx+Math.cos(r.a)*6;ty=8+Math.sin(t*1.3+r.i)*0.6;tz=cz+Math.sin(r.a)*4;}
      const p=r.g.position,ox=p.x,oz=p.z;p.x=damp(p.x,tx,1.6,dt);p.y=damp(p.y,ty,1.6,dt);p.z=damp(p.z,tz,1.6,dt);if(Math.hypot(p.x-ox,p.z-oz)>1e-3)r.g.rotation.y=Math.atan2(p.x-ox,p.z-oz);}
    if(RV.flee){RV.flee+=dt;if(RV.flee>4)RV.L.forEach(r=>{r.g.visible=false;});RV.ring.material.opacity=RV.rim.material.opacity=0;RV.dive=null;return;}
    const D=RV.dive;
    if(!D){RV.ring.material.opacity=Math.max(0,RV.ring.material.opacity-dt*2);RV.rim.material.opacity=Math.max(0,RV.rim.material.opacity-dt*3);if(G.cine)return;RV.cd-=dt;if(RV.cd>0)return;
      const c=ravTarget();if(!c.length){RV.cd=0.5;return;}const h=c[Math.floor(rand(0,c.length))];
      RV.dive={r:RV.L[Math.floor(rand(0,3))],h,st:'mark',t:0,x:h.pos.x,z:h.pos.z,y:Math.max(0,h.pos.y),mt:nest(h.pos.z)?1.0:1.5};caw();return;}
    D.t+=dt;const r=D.r,p=r.g.position;
    if(D.st==='mark'){if(hidden(D.h)){D.st='up';D.t=0;RV.lost++;floatText(new V3(D.x,2.4,D.z),'Карр? Куда подевался?','#d8d8ff');return;}
      D.x=D.h.pos.x;D.z=D.h.pos.z;D.y=Math.max(0,D.h.grounded?D.h.pos.y:D.y);p.x=damp(p.x,D.x,3,dt);p.y=damp(p.y,D.y+6,3,dt);p.z=damp(p.z,D.z+1.5,3,dt);r.g.rotation.y=Math.PI;
      RV.ring.material.opacity=Math.min(0.55,D.t/D.mt*0.6);RV.ring.scale.setScalar(0.6+0.4*Math.min(1,D.t/D.mt));RV.rim.material.opacity=0.45+0.4*Math.sin(t*14);
      if(D.t>=D.mt){D.st='dive';D.t=0;D.from=p.clone();caw();}}
    else if(D.st==='dive'){const k=Math.min(1,D.t/0.5);p.set(lerp(D.from.x,D.x,k),lerp(D.from.y,D.y+0.9,k*k),lerp(D.from.z,D.z,k));RV.rim.material.opacity=0.85;
      if(k>=1){D.st='up';D.t=0;const h=D.h;
        if(hd(h.pos,D)<1.5&&Math.abs(h.pos.y-D.y)<1.6&&!players[h.player].downed&&!hidden(h)){
          if(h.guard){RV.blocks++;SFX.shield();h.vel.x=(h.pos.x-D.x)*1.5;h.vel.z=(h.pos.z-D.z)*1.5;h.knockT=0.15;floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Устоял за щитом! Карр!','#9fe0ff');}
          else{RV.grabs++;SFX.splash();burst(h.pos.clone().add(new V3(0,1,0)),0x23232e,14,3);floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Карр! Утащил!','#d8d8ff');onFall(h);}}
        else{RV.dodges++;SFX.thud();burst(new V3(D.x,0.3,D.z),0x8a7a5a,8,2);floatText(new V3(D.x,1.8,D.z),'Карр! Промахнулся!','#d8d8ff');}}}
    else{const k=Math.min(1,D.t/0.8);p.y=lerp(D.y+0.9,D.y+7,k);RV.ring.material.opacity=Math.max(0,RV.ring.material.opacity-dt*2);RV.rim.material.opacity=0;
      if(k>=1){RV.dive=null;RV.cd=nest(D.z)?rand(0.4,0.8):D.z<-208?rand(5.5,8.5):rand(3.2,5.5);}}
    RV.ring.position.set(D.x,D.y+0.06,D.z);RV.rim.position.set(D.x,D.y+0.08,D.z);}
  /* ---------- сцены ---------- */
  function crowsArrive(){if(F.stage!=='yard')return;F.stage='crows';RV.L.forEach((r,i)=>{r.g.visible=true;r.g.position.set((i-1)*8,16,-150);});
    play({dur:7.6,fov:50,shots:[shot(0,[0,2.2,-112],[0,5.5,-128]),shot(3.4,[2.6,1.7,-114],[0,3.6,-123])],
      says:[[0.3,2.2,'zven','Ой! Вороны! Чёрные, Кощеевы!'],[2.5,2.8,'voron','Карр! Кощей велел: клубочки отнять, в Дремучий лес не пускать!'],[5.4,2.0,'proshka','Ха! Сперва догоните!']],
      events:[{t:2.4,fn:caw},{t:5.4,fn:()=>{try{ACT.emote(HERO.proshka,'pride');}catch(e){}}}],
      end:()=>{RV.on=true;RV.cd=2.5;banner('Вороны Кощея!','#d8d8ff',2.8,'круг с тенью — сейчас спикирует: отбеги, закройся щитом или спрячься');}});}
  function teremHi(){F.tmHi=true;const T=HERO;bark(beast('mysh'),'mysh','Ой, беда-беда! Медведь на теремок сел — брёвна раскатились!',3.0);
    later(3.1,()=>bark(T.proshka,'proshka','Потап, это не ты, случаем?',2.2));later(5.4,()=>bark(T.potap,'potap','Я на теремки не сажусь! Я на пеньки сажусь.',2.6));
    later(8.1,()=>bark(beast('zayka'),'zayka','Помогите венцы сложить: брёвна — вдвоём к срубу!',2.8));}
  function logDone(L){const k=F.logs,from=L.g.position.clone(),to=new V3(TM.x,2.6+k*0.88,TM.z);anim(0.6,q=>{L.g.position.lerpVectors(from,to,q);L.g.position.y+=Math.sin(q*Math.PI)*2;
      if(q>=1){W.group.remove(L.g);L.state='done';const v=VEN[k];v.visible=true;anim(0.5,z=>{v.position.y=(1-z)*1.6;});SFX.thud();shakeAll(0.03,0.3);burst(to,0xb07a44,12,3);}});
    F.logs=k+1;tmCol.maxy=2.4+0.88*F.logs;cheer();
    if(F.logs===3){later(0.7,()=>{ROOF.visible=true;anim(0.6,z=>{ROOF.scale.set(1,z,1);});SFX.ok();banner('Сруб готов!','#ffd76a',2,'теперь конёк с петушком — на крышу');});
      later(1.6,()=>bark(beast('lisa'),'lisa','Теперь конёк на крышу! Кто полегче — на леса, Потап подкинет!',3.0));}}
  function konekUp(){F.konek=true;const from=KON.g.position.clone(),to=new V3(TM.x,6.95,TM.z);SFX.knot();
    anim(0.9,q=>{KON.g.position.lerpVectors(from,to,q);KON.g.position.y+=Math.sin(q*Math.PI)*1.5;KON.g.rotation.y=-q*Math.PI*2;
      if(q>=1){KON.g.rotation.y=0;burst(to,COL.gold,18,4);[0,0.25,0.5,0.8].forEach((d,i)=>later(d,()=>tone([520,660,780,990][i],0.18,'square',0.06,[560,700,820,1040][i])));
        floatText(to.clone().add(new V3(0,1.2,0)),'Ку-ка-ре-ку!','#ffd76a');say(null,'Петушок на коньке: «Ку-ка-ре-ку!»',2.2,true);RV.flee=0.001;cheer();
        later(1.8,()=>{caw();say('voron','Карр! Петушок! Улетаем к Кощею — ни с чем!',2.6);});later(4.6,housewarm);}});}
  function housewarm(){if(F.stage==='end')return;F.stage='end';const T=HERO,DC=new V3(0,0,-225.2),hs=[T.proshka,T.potap,T.pelageya,T.yosha];let squeeze=0,ring=0;
    play({dur:12,fov:50,shots:[shot(0,[0,3.4,-218.4],[0,3.0,-231]),shot(3.0,[2.6,1.7,-225.6],[0,1.1,-229.6]),shot(6.6,[0,7.5,-215.5],[0,1,-228],[5.5,6.2,-219],[0,1,-228],5.4)],
      says:[[0.3,2.6,'mysh','Теремок краше прежнего! Заходите в гости!'],[3.0,1.6,'potap','Чур, я первый!'],[4.7,2.0,'potap','Ой… Не пролезаю…'],
        [6.6,2.6,'zayka','Ха-ха! Медведю — почётное место на крылечке!'],[9.2,2.6,'zven','Новоселье! Все в хоровод — дзинь-дзинь!']],
      events:[{t:0,fn:()=>{hs.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-224.8,0);h.face=Math.PI;h.vel.set(0,0,0);});}},
        {t:3.0,fn:()=>{squeeze=1;}},{t:4.6,fn:()=>{squeeze=2;shakeAll(0.05,0.5);SFX.thud();floatText(new V3(0,2.6,-229.4),'Застрял!','#ffd9a0');anim(0.4,k=>{tmG.scale.set(1+Math.sin(k*Math.PI*4)*0.04,1,1);});}},
        {t:5.6,fn:()=>{squeeze=3;}},{t:6.6,fn:()=>{BEAST.forEach((b,i)=>later(i*0.12,()=>{b.hop=0.6;floatText(b.pos.clone().add(new V3(0,1.6,0)),'Ха-ха!','#fff2c0');}));}},
        {t:8.6,fn:()=>{ring=1;SFX.ok();}}],
      tick:(t)=>{const P=T.potap;if(squeeze===1){const k=Math.min(1,(t-3.0)/1.4);P.pos.set(lerp(0.4,0,k),0,lerp(-224.8,-229.3,k));P.face=Math.PI;}
        else if(squeeze===2){P.pos.z=-229.3+Math.sin(t*30)*0.05;}else if(squeeze===3){const k=Math.min(1,(t-5.6)/0.5);P.pos.z=lerp(-229.3,-226.6,k);P.face=0;}
        if(ring){const all=hs.map(h=>({o:h,p:h.pos})).concat(BEAST.map(b=>({o:b,p:b.g.position})));all.forEach((q,i)=>{const a=(t-8.6)*0.9+i/all.length*Math.PI*2;
            q.p.set(DC.x+Math.cos(a)*3.6,Math.abs(Math.sin((t-8.6)*6+i))*0.35,DC.z+Math.sin(a)*3.6);if(q.o.face!==undefined)q.o.face=a+Math.PI;else q.o.g.rotation.y=-a;});}
        for(const h of HEROES)h.vel.set(0,0,0);},
      end:()=>{F.done=true;for(const h of HEROES)placeOnGround(h,h.pos.x,h.pos.z,0);banner('Теремок спасён!','#ffd76a',2.6,'вороны улетели к Кощею ни с чем — у зверей новоселье!');later(1.8,finishLevel);}});}
  W.part11={RV,YB,APL,LG,PC,PCF,LOGS,TM,TOSS,KON,ybNut,SW,sheltered,hidden};   // для проверки ботом и напарника
  W.updates.push(dt=>{
    if(F.stage==='crows'||F.stage==='end')ravUpdate(dt);
    // яблоки: подбежал — съел; два съедено — яблонька опускает ветки
    for(const ap of APL){if(!ap.down||ap.eaten)continue;for(const pi of[0,1]){const h=active(pi);if(hd(h.pos,ap)<0.85&&h.pos.y<1){ap.eaten=true;ap.m.visible=false;F.apples++;SFX.nut();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Хрум! Сладкое!','#ffd0c0');break;}}}
    if(F.apples>=2&&!F.appleHide){F.appleHide=true;anim(0.8,k=>{crown.position.y=2.9-0.5*k;crown.scale.setScalar(1+0.25*k);});later(0.3,()=>bark(YB,'yablonya','Прячьтесь под ветки — ворон не углядит!',2.6));}
    // печка: зовёт, полено — вдвоём, пирожки, дым
    if(F.stage==='crows'&&!F.pcHi&&HEROES.some(h=>h.active&&hd(h.pos,PCF)<7)){F.pcHi=true;bark(PC,'pechka','Озябла я, детушки… Подкиньте полешко — пирожком угощу, дымком от ворон укрою!',3.4);}
    if(F.stage==='crows')pairCarry(LG,dt,PCF,2.3,()=>{if(!F.logTold){F.logTold=true;for(const q of[0,1])tip(q,'Полено тяжёлое — вдвоём его берите:<br>Оба к нему подойдите.',3);}},()=>{const from=LG.g.position.clone(),to=new V3(-6,0.4,-156.4);
      anim(0.6,k=>{LG.g.position.lerpVectors(from,to,k);LG.g.position.y+=Math.sin(k*Math.PI)*1.2;LG.g.scale.setScalar(1-0.6*k);if(k>=1){W.group.remove(LG.g);LG.state='done';F.smoke=true;fire.visible=true;PIES.forEach(m=>{m.visible=true;});
        SFX.ok();burst(new V3(-6,0.8,-155.8),0xff9030,18,3);banner('Печка растопилась!','#ffb070',2.2,'дым над рощей — вороны не видят');later(0.5,()=>bark(PC,'pechka','Ух, жарко! Берите пирожки — а дым мой воронью глаза застит!',3.0));}});});
    if(F.smoke){fire.scale.y=1+Math.sin(G.time*13)*0.15;
      for(const h of HEROES)if(h.active&&!pieBy.has(h.kind)&&pieBy.size<4&&hd(h.pos,PCF)<1.7){const m=PIES[pieBy.size];pieBy.add(h.kind);m.visible=false;SFX.nut();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ням! Ржаной пирожок!','#ffe0a0');}
      for(const p of PUFF){p.t+=dt;const k=(p.t%3.5)/3.5;p.m.position.set(-6.1+k*0.8,3.7+k*3.2,-158-k*4);p.m.scale.setScalar(0.6+k*2.2);p.m.material.opacity=0.5*Math.sin(k*Math.PI);}
      fogM.opacity=Math.min(0.3,fogM.opacity+dt*0.15);for(const f of FOG)f.m.position.x=f.x+Math.sin(G.time*0.3+f.ph)*0.8;}
    for(const s of STEAM){const k=(G.time*0.25+s.ph)%1;s.m.position.y=-0.3+k*1.6;s.m.scale.setScalar(0.2+Math.sin(k*Math.PI));}
    for(const h of HEROES)if(inKisel(h))h.extraY=-0.18;
    // теремок: звери, брёвна, конёк
    if(F.stage==='crows'&&!F.tmHi&&[0,1].some(pi=>active(pi).pos.z<-209))teremHi();
    for(const b of BEAST){b.hop=Math.max(0,b.hop-dt);if(F.stage!=='end')b.g.position.y=Math.sin(Math.max(0,b.hop)/0.6*Math.PI)*0.6;b.head.rotation.x=F.logs||F.stage==='end'?Math.sin(G.time*3+b.g.position.x)*0.08:0.35;}
    if(F.stage==='crows'&&F.tmHi&&F.logs<3){const busy=LOGS.find(L=>L.state==='carry');for(const L of LOGS)if(!busy||busy===L)pairCarry(L,dt,new V3(TM.x,0,TM.z+3.4),2.6,
      ()=>{if(!F.logTold2){F.logTold2=true;for(const q of[0,1])tip(q,'Бревно тяжёлое — вдвоём его берите:<br>Оба к нему подойдите.',3);}},()=>logDone(L));}
    if(F.stage==='crows'&&!F.konek)for(const h of HEROES)if(h.pos.y>2.3&&hd(h.pos,KON.g.position)<1.6){if(F.logs>=3)konekUp();else if(!F.konTold){F.konTold=true;tip(h.player,'Сперва венцы сложите — брёвна к срубу!',2.6);}break;}
  });
  W.abil.clew=false;W.abil.toss=false;W.threadLife=10;
  /* ---------- кикиморки из луж ---------- */
  const puddles=[[-7,-22],[7,-22],[-6.5,-31],[6.5,-31],[0,-16.5]];
  for(const[x,z]of puddles){const m=new THREE.Mesh(new THREE.CircleGeometry(1.3,16),M(0x3a3a20));m.rotation.x=-Math.PI/2;m.position.set(x,0.03,z);W.group.add(m);}
  const arena={x:0,z:-23,r:9,started:false,cleared:false,hold:0,list:[]};arena.camActive=()=>arena.started&&(!arena.cleared||arena.hold>0);W.camZones.push(arena);
  function yagaTalk(){F.stage='yaga';const T=HERO;yaga.g.visible=true;hut.inner.visible=true;
    play({dur:13.5,fov:50,shots:[shot(0,[0,3.2,-18.5],[0,3.4,-26.5]),shot(4.6,[-2.6,1.6,-19],[-4,0.9,-21.5]),shot(7.2,[0.3,3.9,-24.6],[0,3.9,-26.6]),shot(9.6,[0,9,-10],[0,0,-24])],
      says:[[0.4,3.8,null,'<i>(Баба Яга выглядывает, очень недовольная, в очках. За её спиной — пустые рамки портретов.)</i>',true],
        [1.2,3.4,'yaga','Кикиморки мне весь двор изгадили, грязь развели. Приберёте — дам клубок.'],[4.8,2.4,'proshka','Клубок ниток? Я вам сам верёвку сплету.'],[7.3,2.2,'yaga','…'],[9.8,2.6,'zven','Кикиморки! Защищайтесь, не зевайте!']],
      events:[{t:0,fn:()=>{anim(0.8,k=>{hut.doorMat.emissiveIntensity=k*0.6;});}},{t:9.6,fn:spawnKiki}],
      tick:(t)=>{yaga.head.rotation.x=t>7&&t<9.4?-0.25:0;yaga.body.position.y=Math.sin(G.time*2)*0.02;},
      end:()=>{if(!arena.started)spawnKiki();F.stage='fight';}});}
  function spawnKiki(){if(arena.started)return;arena.started=true;SFX.splash();arena.list=puddles.map(([x,z])=>makeFoe('kiki',x,z,{leash:8}));banner('Кикиморки!','#b9f0a0',1.8,'лохматые, в тине, с ложками деревянными');}
  function giveClews(){F.stage='gift';const T=HERO;
    play({dur:12.5,fov:50,shots:[shot(0,[0,3.4,-17],[0,2.6,-26.5]),shot(3.2,[-1.8,2.0,-20.5],[0,1.6,-24]),shot(9.0,[0,4,-14],[0,1,-26])],
      says:[[0.3,2.6,'yaga','Вот это двор — любо-дорого глядеть!<br>Каждому по клубку, помощнички, — владеть!'],[3.2,2.2,'yaga','<i>(Потапу, на ухо)</i> В Лешем лесу шапку наизнанку наденьте, а то закружит.'],
        [5.4,2.0,'yaga','<i>(Пелагее)</i> В Лешем лесу шапку наизнанку наденьте…'],[7.4,1.6,'yaga','<i>(Йоше)</i> …а то закружит.'],[9.1,2.4,null,'<i>Прошка закатывает глаза.</i>',true]],
      events:[{t:0.8,fn:()=>{HEROES.forEach((h,i)=>{const b=new THREE.Mesh(new THREE.SphereGeometry(0.17,10,8),M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.9}));W.group.add(b);const a=new V3(0,3.2,-26),to=h.pos.clone().add(new V3(0,1,0));
          anim(0.9+i*0.15,k=>{b.position.lerpVectors(a,to,k);b.position.y+=Math.sin(k*Math.PI)*2;if(k>=1){W.group.remove(b);burst(to,COL.gold,8,2);SFX.knot();}});});}},
        {t:9.1,fn:()=>floatText(T.proshka.pos.clone().add(new V3(0,1.8,0)),'Ну-ну…','#ff9a66')}],
      end:()=>{F.stage='yard';W.abil.clew=true;W.abil.toss=true;yaga.g.position.set(-1.1,1.1,-26.1);banner('Клубок-путеводитель!','#ffd76a',2.6,'кнопка R (у второго игрока ;, на джойстике RB): клубок покатится — золотую нить потянет');}});}
  W.onString=null;
  W.updates.push(dt=>{
    // избушка переминается с ноги на ногу; после «на раз-два-три» поворачивается и приседает
    if(!turn.on){hut.house.position.y=2.3+Math.abs(Math.sin(G.time*2))*0.1;hut.legs.forEach((l,i)=>{l.rotation.x=Math.sin(G.time*2+i*Math.PI)*0.12;});}
    else if(!turn.done){turn.t+=dt;const k=smooth(turn.t/2.4);hut.g.rotation.y=Math.PI*(1-k);hut.house.position.y=2.3+Math.abs(Math.sin(turn.t*9))*0.35*(1-k)-k*1.2;
      hut.legs.forEach((l,i)=>{l.scale.y=1-0.5*k;l.position.y=2.3-1.2*k;l.rotation.x=Math.sin(turn.t*9+i*Math.PI)*0.3*(1-k);});yaga.g.position.y=2.3-1.2*k;
      if(turn.t>1&&!turn.shook){turn.shook=true;shakeAll(0.05,0.6);SFX.gate();}
      if(k>=1){turn.done=true;porchLink.base=1.0;porchLink.pos.z=-24.3;yaga.g.position.set(0,1.1,-26.4);later(0.3,yagaTalk);}}
    if(arena.started&&!arena.cleared&&arena.list.every(e=>!e.alive)){arena.cleared=true;arena.hold=1.6;SFX.ok();banner('Кикиморки убежали!','#ffffff',1.8,'а мусор бросили — давайте двор приберём');later(1.2,startClean);}
    if(arena.cleared)arena.hold-=dt;
    if(F.stage==='yard'&&!F.bye&&[0,1].every(pi=>active(pi).pos.z<-92)){F.bye=true;bark(yaga,'yaga','Помогли старухе — старуха добро не забудет.',2.6);later(0.2,()=>{yaga.g.position.set(0,1.1,-26.4);});}
    // грядки: наступил — вязнешь и выбираешься обратно на край; по нити — можно
    for(const h of HEROES){if(h.cling)continue;if(h.grounded&&inMud(h)){h.bedT=(h.bedT||0)+dt;if(h.bedT>0.3){h.bedT=0;placeOnGround(h,h.pos.x,h.pos.z>-44.5?-37.4:-51.6,0);SFX.knock();burst(h.pos.clone().add(new V3(0,0.3,0)),0x5a3a1e,8,2);
        if(h.active)tip(h.player,F.stage==='yard'?'Грядку не топчи — брось клубок '+K(h.player,'item')+'!':'По грядке не пройти. Сперва клубок у Яги возьмите.',2.6);}}else h.bedT=0;}
    // мусор: мухи и вонючий дымок вьются над каждым куском и над корытом
    for(const it of TR)if(it.state!=='fly')trashFx(it.g);if(TRB.g&&TRB.state!=='fly'&&TRB.state!=='done')trashFx(TRB.g);
    // уборка двора
    if(F.stage==='clean'){
      for(const it of TR){if(it.state!=='ground')continue;for(const h of HEROES){if(!h.active||h.trash||players[h.player].downed)continue;if(hd(h.pos,it.g.position)<1.0&&h.pos.y<1.2){it.state='carry';it.by=h;h.trash=it;it.g.scale.setScalar(0.85);it.g.userData.mess.visible=false;SFX.nut();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Подобрал!','#e0d0a0');break;}}}
      for(const h of HEROES){const it=h.trash;if(!it)continue;it.g.position.set(h.pos.x,h.pos.y+heroHeight(h)+0.3,h.pos.z);it.g.rotation.y+=dt*2;if(hd(h.pos,HEAP)<2.3){h.trash=null;it.state='fly';toHeap(it.g,()=>{it.state='done';},true);}}
      pairCarry(TRB,dt,HEAP,2.6,()=>{if(!F.troughTold){F.troughTold=true;for(const q of[0,1])tip(q,'Корыто тяжёлое — вдвоём его берите:<br>Оба к нему подойдите.',3);}},()=>toHeap(TRB.g,()=>{TRB.state='done';}));
      if(!F.cleanDone&&TR.length&&cleanN()>=TR.length+1){F.cleanDone=true;SFX.ok();banner('Двор чист!','#ffffff',1.8,'Баба Яга довольна — ворчит, да не бранится');later(1.4,giveClews);}}
    // калитка-упрямица
    for(const p of PL){p.on=HEROES.some(h=>!(h.active&&players[h.player].downed)&&!h.cling&&Math.hypot(h.pos.x-p.x,h.pos.z-p.z)<0.85&&h.pos.y<0.6);p.pm.emissiveIntensity=p.on?1.0:0.2;p.g.position.y=p.on?-0.05:0;}
    {const want=(PL[0].on&&PL[1].on)||(PL[2].on&&PL[3].on),under=HEROES.some(h=>Math.abs(h.pos.x)<2.4&&Math.abs(h.pos.z-GZ)<0.9);gShut=want?0:gShut+dt;const g0=gOpen;
      // открыта, пока нажаты обе наружные или обе внутренние лапки (и полсекунды после — успеть шагнуть); сошли — закрылась
      gOpen=damp(gOpen,(want||gShut<0.5||(under&&gOpen>0.5))?1:0,6,dt);gateCol.on=gOpen<0.6;leaves.forEach(L=>{L.lv.rotation.y=L.sd*gOpen*1.5;});gmouth.rotation.z=gOpen>0.5?Math.PI:0;gmouth.position.y=gOpen>0.5?-0.02:-0.1;
      if(g0<0.6&&gOpen>=0.6){SFX.gate();if(!F.gateTold){F.gateTold=true;floatText(new V3(0,3.9,GZ),'Ну ладно, так и быть — проходите!','#e0d0a0');}}
      if(!want&&g0>=0.6&&gOpen<0.6&&F.gateTold&&!F.shutTold){F.shutTold=true;SFX.miss();floatText(new V3(0,3.9,GZ),'Сошли с лапок — закрываюсь! Держите, коли пускать хотите.','#e0d0a0');}
      if(!want&&!F.oneTold&&PL.some(p=>p.on)){F.oneTold=true;SFX.miss();floatText(new V3(0,3.9,GZ),'Одного не пущу! Обе лапки держите, обе!','#e0d0a0');}}
    if(F.bye&&!F.out&&HEROES.every(h=>h.pos.z<GZ-1.4)){F.out=true;SFX.ok();banner('Калитка всех пропустила!','#ffd76a',2.2,'всей гурьбой — в Дремучий лес');floatText(new V3(0,3.9,GZ),'Вот это компания — хоть куда!','#e0d0a0');later(1.6,crowsArrive);}
    yaga.head.rotation.y=Math.sin(G.time*0.7)*0.4;for(const h of HEROES)h.extraY=F.stage==='yard'&&inMud(h)?-0.28:0;});
  W.zvenGoal=()=>{const a=HEROES.reduce((m,h)=>h.pos.z<m.pos.z?h:m);let z=a.pos.z-4.5;
    if(F.stage==='hut'||F.stage==='turn')z=Math.max(z,-21);else if(F.stage!=='yard'&&F.stage!=='crows'&&F.stage!=='end')z=Math.max(z,-24);else if(!F.glued)z=Math.max(z,-61.5);
    return new V3(clamp(a.pos.x*0.5,-8,8),Math.max(a.pos.y,0)+2.2,z);};
  W.onFirstUnravel=null;
  /* ---------- рисунки кнопок ---------- */
  const T=HERO;
  for(const pi of[0,1]){
    prompt(pi,'swap',()=>headOf(other(pi)),()=>W.rzt.state!=='done'&&seats.some(s=>s.hero===active(pi))&&!seats.some(s=>s.hero===other(pi))&&hd(other(pi).pos,active(pi).pos)<14);
    prompt(pi,'call',()=>headOf(active(pi)),()=>W.rzt.state!=='done'&&seats.some(s=>s.hero===active(pi))&&!seats.some(s=>s.hero===other(pi))&&hd(other(pi).pos,active(pi).pos)>=14);
    prompt(pi,'skill',()=>headOf(active(pi)),()=>W.rzt.state==='count'&&W.rzt.t>=1.6);
    prompt(pi,'swap',()=>headOf(active(pi)),()=>gateOpen()&&onPlate(active(pi))&&(active(pi).pos.z>GZ?other(pi).pos.z>GZ:other(pi).pos.z>GZ),()=>active(pi).pos.z>GZ?'проходи!':'держи лапку');
    prompt(pi,'item',()=>headOf(active(pi)),()=>F.stage==='yard'&&!W.threads.some(t=>t.owner===pi)&&((active(pi).pos.z<-35&&active(pi).pos.z>-38.5)||(active(pi).pos.z<-59&&active(pi).pos.z>-62.4)));
    prompt(pi,'guard',()=>headOf(active(pi)),()=>W.enemies.some(e=>e.alive&&e.tgt===active(pi)&&e.state==='wind'&&e.help));
    prompt(pi,'attack',()=>headOf(active(pi)),()=>W.enemies.some(e=>e.alive&&((e.state==='broken'&&hd(e.pos,active(pi).pos)<6)||(e.tgt===active(pi)&&e.state==='stagger'&&!e.openHit&&players[pi].staggerSeen<=3))));}
  for(const pi of[0,1]){
    prompt(pi,'guard',()=>headOf(active(pi)),()=>!!RV.dive&&RV.dive.h===active(pi)&&RV.dive.st!=='up','щит!');
    prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='crows'&&!F.shaken&&hd(active(pi).pos,YB)<2.8,'отряси!');
    prompt(pi,'item',()=>headOf(active(pi)),()=>F.stage==='crows'&&!W.threads.some(t=>t.owner===pi&&!t.ret)&&active(pi).pos.z<-188.4&&active(pi).pos.z>-192.2);}
  prompt(0,'skill',()=>headOf(T.potap),()=>F.stage==='crows'&&F.logs>=3&&!F.konek&&T.potap.active&&hd(T.potap.pos,TOSS)<3.2&&HEROES.some(o=>o!==T.potap&&hd(o.pos,T.potap.pos)<2.4));
  prompt(0,'swap',()=>headOf(T.potap),()=>F.stage==='crows'&&F.logs>=3&&!F.konek&&T.proshka.active&&hd(T.proshka.pos,TOSS)<1.6&&hd(T.potap.pos,T.proshka.pos)<3);
  prompt(0,'skill',()=>headOf(T.potap),()=>F.stage==='yard'&&T.potap.active&&!roofLink.taken&&hd(T.potap.pos,{x:-6.7,z:-58})<5&&HEROES.some(o=>o!==T.potap&&hd(o.pos,T.potap.pos)<2.4));
  prompt(0,'swap',()=>headOf(T.potap),()=>F.stage==='yard'&&T.proshka.active&&!roofLink.taken&&hd(T.proshka.pos,{x:-6.7,z:-58})<5&&hd(T.potap.pos,T.proshka.pos)<3);
  /* ---------- задачи ---------- */
  const both=pi=>O(()=>'Все четверо — на пеньки с лапками! Смени '+K(pi,'swap')+' или кликни '+K(pi,'call')+',<br>На счёт «ТРИ» — свой приём '+K(pi,'skill')+' жми, будь готов!',()=>W.rzt.state==='done',()=>seats.map(s=>s.g),
    ()=>({kind:other(pi).kind,action:'walk',from:other(pi).pos.clone(),to:new V3(seats[pi?3:0].x,0.3,-19)}));
  const common=pi=>[
    O('Избушка к нам задом стоит. Звенышко: «Скажите ей, как в сказке, — пусть повернёт!»',()=>active(pi).pos.z<-14||W.rzt.state!=='wait',()=>[hut.house]),
    both(pi),
    O('Избушка поворачивается…',()=>F.stage==='fight'||F.stage==='yard'||F.stage==='gift',()=>[hut.house]),
    O(()=>'Кикиморки! Солнышко <i class="sg y"></i> над ней — щитом '+K(pi,'guard')+' закройся,<br>Огоньки погасли — бей '+K(pi,'attack')+', не бойся!',()=>arena.cleared,()=>arena.list.map(e=>e.g)),
    O(()=>'Кикиморки намусорили! Подойди — мусор сам возьмётся.<br>В кучу у забора неси: '+cleanN()+' / '+(TR.length+1)+'. Корыто — вдвоём несётся.',()=>F.stage==='gift'||F.stage==='yard',()=>TR.filter(t=>t.state==='ground'||t.state==='carry').map(t=>t.g).concat(TRB.state==='ground'||TRB.state==='carry'?[TRB.g]:[],[heapG])),
    O('Баба Яга клубки раздаёт…',()=>F.stage==='yard',()=>[yaga.g]),
    O(()=>'На грядках капуста — топтать не смей!<br>Брось клубок '+K(pi,'item')+' — и по нити, как по дощечке, скорей.',()=>active(pi).pos.z<-51.5,()=>[],()=>({kind:active(pi).kind,action:'walk',from:new V3(pi?5.5:-5.5,0,-37),to:new V3(pi?5.5:-5.5,0,-51)}))];
  const part2=pi=>[
    O(()=>'Вороны Кощея! Круг с тенью — сейчас спикирует:<br>отбеги, закройся щитом '+K(pi,'guard')+' — или беги к яблоньке.',()=>!!F.shaken||active(pi).pos.z<-150,()=>[yt]),
    O(()=>'Яблонька: «Отрясите меня — ударь '+K(pi,'attack')+' по стволу,<br>съешьте по яблочку — укрою от ворон!»',()=>!!F.appleHide||active(pi).pos.z<-150,()=>F.shaken?APL.filter(a=>a.down&&!a.eaten).map(a=>a.m):[yt]),
    O('Печка озябла: «Подкиньте полешко — дымком от ворон укрою!»<br>Полено тяжёлое — вдвоём несите.',()=>!!F.smoke||active(pi).pos.z<-187.5,()=>LG.state==='done'?[]:[LG.g]),
    O('В дыму вороны не видят — бегом через воронью рощу!',()=>active(pi).pos.z<-187.5),
    O(()=>'Молочная речка, кисельные берега. Брось клубок '+K(pi,'item')+' —<br>по нити на тот берег!',()=>active(pi).pos.z<-205||!!F.tmHi),
    O(()=>'Теремок развалился! Брёвна вдвоём к срубу несите: '+F.logs+' / 3.',()=>F.logs>=3,()=>LOGS.filter(l=>l.state==='ground'||l.state==='carry').map(l=>l.g)),
    O(pi?'Конёк с петушком — на крышу! Встань рядом с Потапом у лесов —<br>он подкинет на настил.':()=>'Конёк с петушком — на крышу! Прошкой встань в круг у лесов, рядом Потап,<br>смени '+K(0,'swap')+' на Потапа, жми '+K(0,'skill')+' — подкинет на настил!',()=>!!F.konek,()=>[KON.g]),
    O('Новоселье в теремке!',()=>!!F.done)];
  W.objectives[0]=common(0).concat([
    O(()=>'Звено на крыше сарая! Прошкой рядом с Потапом встань,<br>Смени на Потапа, жми '+K(0,'skill')+' — он подкинет, только глянь!',()=>roofLink.taken||active(0).pos.z<-62.5,()=>[roofLink.g],()=>({kind:'proshka',action:'jump',from:new V3(-4.2,0,-58),to:new V3(-6,3.4,-58)})),
    O(()=>'Лужа широка — одной нити мало.<br>Бросьте клубки ОБА у края '+K(0,'item')+' — нить к нити пристала.',()=>active(0).pos.z<-88.5,()=>[pitMark],()=>({kind:active(0).kind,action:'walk',from:new V3(-1,0,-62),to:new V3(-1,0,-76)})),
    gateObj(0)].concat(part2(0)));
  W.objectives[1]=common(1).concat([
    O(()=>'Звено на голубятне! Пелагеей на стог взберись,<br>Прыгни, держи '+K(1,'jump')+' — долетишь, не боись!',()=>dovLink.taken||active(1).pos.z<-62.5,()=>[dovLink.g],()=>({kind:'pelageya',action:'glide',from:new V3(6.5,2.2,-57.8),to:new V3(9.4,2.3,-62.2)})),
    O(()=>'Лужа широка — одной нити мало.<br>Бросьте клубки ОБА у края '+K(1,'item')+' — твоя к другу пристала.',()=>active(1).pos.z<-88.5,()=>[pitMark],()=>({kind:active(1).kind,action:'walk',from:new V3(1,0,-62),to:new V3(1,0,-76)})),
    gateObj(1)].concat(part2(1)));
  W.tipZones.push({cond:(pi,h)=>!!RV.dive&&RV.dive.h===h&&RV.dive.st==='mark',text:pi=>'Ворон пикирует! Отбеги из круга или закройся щитом '+K(pi,'guard')+'.'},
    {cond:(pi,h)=>F.stage==='crows'&&!F.smoke&&h.pos.z<-158&&h.pos.z>-187,text:pi=>'Воронья роща — без дыма не пройти, заклюют!<br>Растопите печку: полено вдвоём несите.'},
    {cond:(pi,h)=>inKisel(h),text:pi=>'Кисель вязкий — ноги вязнут. Брось клубок '+K(pi,'item')+' — по нити через речку.'},
    {cond:(pi,h)=>F.stage==='crows'&&LOGS.some(L=>(L.state==='ground'||L.state==='carry')&&hd(h.pos,L.g.position)<3),text:pi=>'Бревно тяжело — несите вдвоём!'},
    {cond:(pi,h)=>F.stage==='clean'&&!!h.trash,text:pi=>'Мусор несёшь — неси в кучу у забора, не зевай!'},
    {cond:(pi,h)=>F.stage==='clean'&&!!TRB.g&&(TRB.state==='ground'||TRB.state==='carry')&&hd(h.pos,TRB.g.position)<3,text:pi=>'Корыто тяжело — несите вдвоём!'},
    {cond:(pi,h)=>h.pos.z<-96&&h.pos.z>GZ&&!gateOpen(),text:pi=>'Встаньте двумя героями на две лапки — калитка откроется.<br>Сойдёте — закроется: проходят те, кто не держит.'},
    {cond:(pi,h)=>!F.out&&h.pos.z<GZ&&h.pos.z>-116&&HEROES.some(o=>o.pos.z>GZ),text:pi=>'Друзья остались снаружи! Встаньте на две лапки внутри — калитка их пропустит.'},
    {cond:(pi,h)=>F.stage==='yard'&&h.pos.z<-35.3&&h.pos.z>-38&&!W.threads.some(t=>t.owner===pi&&!t.ret),text:pi=>'По грядке — только по нити: брось клубок '+K(pi,'item')+'.'},
    {cond:(pi,h)=>F.stage==='yard'&&h.pos.z<-59&&h.pos.z>-63&&W.threads.some(t=>t.owner!==pi&&!t.ret),text:pi=>'Нить друга лежит — брось свою рядом.'});
  W.onGlue=()=>{F.glued=true;};
  W.spawns=[[new V3(-3.5,0,5),new V3(-5.5,0,6)],[new V3(3.5,0,5),new V3(5.5,0,6)]];W.startAct=[0,0];
  W.pauseLine='Звенышко в Дремучий лес ведёт.<br>У Яги клубок-путеводитель ждёт:<br>Куда бросишь — туда и катится,<br>Золотою нитью путь стелется.<br>А за калиткой — вороны Кощеевы кружат, да теремок зверей ждёт.';
  W.onStart=()=>{later(0.8,()=>say('zven','Скажите ей, как в сказке.',2.6,true));};
  flushDecor();}

