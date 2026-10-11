/* ============================== МИР 1 · ДРЕМУЧИЙ ЛЕС · 1-1 «ИЗБУШКА, ПОВЕРНИСЬ» ============================== */
// ввод клубка: бросок, возврат, нить к нити · подкидка Потапа · кикиморки: жёлтый сигнал и отбив
function build11(){
  W.zvenAway=true;   // Звенышко улетает вперёд и появляется, только когда нужно
  setTheme('forest');W.name='1-1 · «Избушка, повернись»';W.sub='Дремучий лес · клубок-путеводитель';W.camX=9;const F=W.flags;F.stage='hut';
  ground(-11,11,-62,10);ground(-11,11,-120,-88);
  wall(-11.2,-11,-120,10);wall(11,11.2,-120,10);wall(-11.2,11.2,10,10.2);wall(-11.2,11.2,-120.2,-120);
  edgeTrees(-118,8,-11,11);
  // указатели со стёртыми надписями (лес забыл тропы)
  for(const[x,z]of[[-8.5,-4],[8.4,-44]]){addMesh(new THREE.CylinderGeometry(0.07,0.08,1.8,6),M(0x6b4a2b),x,0.9,z);const b=addMesh(new THREE.BoxGeometry(1.2,0.35,0.08),M(0x9a7a50),x+0.3,1.55,z);b.rotation.z=-0.1;}
  bell(0,3);bell(-3,-14);bell(0,-36);bell(1.8,-60.2);bell(0,-92);HEROES.forEach(h=>{h.trash=null;h.bedT=0;});
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
  /* ---------- самая широкая лужа: нить к нити ---------- */
  const water=new THREE.Mesh(new THREE.PlaneGeometry(22,26),MB(0x2a4f6a));water.rotation.x=-Math.PI/2;water.position.set(0,-1.2,-75);W.group.add(water);
  for(let i=0;i<6;i++)addMesh(new THREE.CylinderGeometry(0.08,0.08,1.4,5),M(0x6a8a3a),rand(-9,9),-0.6,rand(-86,-64));
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
  const gateObj=pi=>O(()=>'Калитка ждёт две лапки разом: встань героем на лапку, смени '+K(pi,'swap')+' — второй встанет на другую.<br>Постойте вдвоём секунду — и калитка откроется насовсем.',
    ()=>!!F.out,()=>(endLink.taken?[]:[endLink.g]).concat(PL.map(p=>p.g)));
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
      if(TRB.state==='ground'||TRB.state==='carry'){const a=[active(0),active(1)],bp=TRB.g.position,mid=new V3((a[0].pos.x+a[1].pos.x)/2,0,(a[0].pos.z+a[1].pos.z)/2);const ok=a.every(h=>!players[h.player].downed)&&(TRB.state==='carry'?hd(a[0].pos,a[1].pos)<(G.solo?9:5.5):G.solo?(a.some(h=>ctrl(h)&&hd(h.pos,bp)<1.9)&&hd(a[0].pos,a[1].pos)<9):a.every(h=>hd(h.pos,bp)<1.9));
        if(ok){if(TRB.state==='ground'){TRB.state='carry';SFX.latch();if(G.solo)for(const h of a)if(!ctrl(h)){h.following=true;h.stuck=0;}floatText(bp.clone().add(new V3(0,1.2,0)),'Взяли! Вместе!','#ffd76a');}
          bp.x=damp(bp.x,mid.x,14,dt);bp.z=damp(bp.z,mid.z,14,dt);bp.y=damp(bp.y,0.9,8,dt);TRB.g.rotation.y=Math.atan2(a[1].pos.x-a[0].pos.x,a[1].pos.z-a[0].pos.z)+Math.PI/2;
          if(hd(bp,HEAP)<2.6){TRB.state='fly';toHeap(TRB.g,()=>{TRB.state='done';});}}
        else{if(TRB.state==='carry'){TRB.state='ground';SFX.thud();floatText(bp.clone().add(new V3(0,1.2,0)),'Бух! Вдвоём держите — не роняйте!','#ffd0d0');}bp.y=damp(bp.y,0,10,dt);
          if(!F.troughTold&&a.some(h=>hd(h.pos,bp)<1.8)){F.troughTold=true;for(const q of[0,1])tip(q,'Корыто тяжёлое — вдвоём его берите:<br>Оба к нему подойдите.',3);}}}
      if(!F.cleanDone&&TR.length&&cleanN()>=TR.length+1){F.cleanDone=true;SFX.ok();banner('Двор чист!','#ffffff',1.8,'Баба Яга довольна — ворчит, да не бранится');later(1.4,giveClews);}}
    // калитка-упрямица
    for(const p of PL){p.on=HEROES.some(h=>!(h.active&&players[h.player].downed)&&!h.cling&&Math.hypot(h.pos.x-p.x,h.pos.z-p.z)<0.85&&h.pos.y<0.6);p.pm.emissiveIntensity=p.on?1.0:0.2;p.g.position.y=p.on?-0.05:0;}
    {const want=(PL[0].on&&PL[1].on)||(PL[2].on&&PL[3].on),under=HEROES.some(h=>Math.abs(h.pos.x)<2.4&&Math.abs(h.pos.z-GZ)<0.9);gShut=want?0:gShut+dt;const g0=gOpen;
      // для малышей: две лапки нажаты вместе секунду — калитка остаётся открытой для всех (четвёрку по очереди расставлять не нужно)
      F.gateT=want?(F.gateT||0)+dt:0;if(F.gateT>1&&!F.gateKept){F.gateKept=true;floatText(new V3(0,3.9,GZ),'Так и быть — открыто насовсем! Проходите!','#e0d0a0');}
      gOpen=damp(gOpen,(want||F.gateKept||gShut<0.5||(under&&gOpen>0.5))?1:0,6,dt);gateCol.on=gOpen<0.6;leaves.forEach(L=>{L.lv.rotation.y=L.sd*gOpen*1.5;});gmouth.rotation.z=gOpen>0.5?Math.PI:0;gmouth.position.y=gOpen>0.5?-0.02:-0.1;
      if(g0<0.6&&gOpen>=0.6){SFX.gate();if(!F.gateTold){F.gateTold=true;floatText(new V3(0,3.9,GZ),'Ну ладно, так и быть — проходите!','#e0d0a0');}}
      if(!want&&!F.oneTold&&PL.some(p=>p.on)){F.oneTold=true;SFX.miss();floatText(new V3(0,3.9,GZ),'Одного не пущу! Обе лапки держите, обе!','#e0d0a0');}}
    if(F.bye&&!F.out&&HEROES.every(h=>h.pos.z<GZ-1.4)){F.out=true;SFX.ok();banner('Калитка всех пропустила!','#ffd76a',2.2,'всей гурьбой — в Дремучий лес');floatText(new V3(0,3.9,GZ),'Вот это компания — хоть куда!','#e0d0a0');later(1.8,finishLevel);}
    yaga.head.rotation.y=Math.sin(G.time*0.7)*0.4;for(const h of HEROES)h.extraY=F.stage==='yard'&&inMud(h)?-0.28:0;});
  W.zvenGoal=()=>{const a=HEROES.reduce((m,h)=>h.pos.z<m.pos.z?h:m);let z=a.pos.z-4.5;
    if(F.stage==='hut'||F.stage==='turn')z=Math.max(z,-21);else if(F.stage!=='yard')z=Math.max(z,-24);else if(!F.glued)z=Math.max(z,-61.5);
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
  W.objectives[0]=common(0).concat([
    O(()=>'Звено на крыше сарая! Прошкой рядом с Потапом встань,<br>Смени на Потапа, жми '+K(0,'skill')+' — он подкинет, только глянь!',()=>roofLink.taken||active(0).pos.z<-62.5,()=>[roofLink.g],()=>({kind:'proshka',action:'jump',from:new V3(-4.2,0,-58),to:new V3(-6,3.4,-58)})),
    O(()=>'Лужа широка — одной нити мало.<br>Бросьте клубки ОБА у края '+K(0,'item')+' — нить к нити пристала.',()=>active(0).pos.z<-88.5,()=>[pitMark],()=>({kind:active(0).kind,action:'walk',from:new V3(-1,0,-62),to:new V3(-1,0,-76)})),
    gateObj(0)]);
  W.objectives[1]=common(1).concat([
    O(()=>'Звено на голубятне! Пелагеей на стог взберись,<br>Прыгни, держи '+K(1,'jump')+' — долетишь, не боись!',()=>dovLink.taken||active(1).pos.z<-62.5,()=>[dovLink.g],()=>({kind:'pelageya',action:'glide',from:new V3(6.5,2.2,-57.8),to:new V3(9.4,2.3,-62.2)})),
    O(()=>'Лужа широка — одной нити мало.<br>Бросьте клубки ОБА у края '+K(1,'item')+' — твоя к другу пристала.',()=>active(1).pos.z<-88.5,()=>[pitMark],()=>({kind:active(1).kind,action:'walk',from:new V3(1,0,-62),to:new V3(1,0,-76)})),
    gateObj(1)]);
  W.tipZones.push({cond:(pi,h)=>F.stage==='clean'&&!!h.trash,text:pi=>'Мусор несёшь — неси в кучу у забора, не зевай!'},
    {cond:(pi,h)=>F.stage==='clean'&&!!TRB.g&&(TRB.state==='ground'||TRB.state==='carry')&&hd(h.pos,TRB.g.position)<3,text:pi=>'Корыто тяжело — несите вдвоём!'},
    {cond:(pi,h)=>h.pos.z<-96&&h.pos.z>GZ&&!gateOpen(),text:pi=>'Встаньте двумя героями на две лапки — калитка откроется для всех.'},
    {cond:(pi,h)=>F.stage==='yard'&&h.pos.z<-35.3&&h.pos.z>-38&&!W.threads.some(t=>t.owner===pi&&!t.ret),text:pi=>'По грядке — только по нити: брось клубок '+K(pi,'item')+'.'},
    {cond:(pi,h)=>F.stage==='yard'&&h.pos.z<-59&&h.pos.z>-63&&W.threads.some(t=>t.owner!==pi&&!t.ret),text:pi=>'Нить друга лежит — брось свою рядом.'});
  W.onGlue=()=>{F.glued=true;};
  W.spawns=[[new V3(-3.5,0,5),new V3(-5.5,0,6)],[new V3(3.5,0,5),new V3(5.5,0,6)]];W.startAct=[0,0];
  W.pauseLine='Звенышко в Дремучий лес ведёт.<br>У Яги клубок-путеводитель ждёт:<br>Куда бросишь — туда и катится,<br>Золотою нитью путь стелется.';
  W.onStart=()=>{later(0.8,()=>say('zven','Скажите ей, как в сказке.',2.6,true));};
  flushDecor();}

