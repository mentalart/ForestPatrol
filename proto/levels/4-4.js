/* ============================== МИР 4 · 4-4 «ЗМИЕВЫ ВАЛЫ» ============================== */
// сочетание: клещи + лава · плуг кузнецов: клещами за раскалённый лемех — плуг едет за героем и пашет борозду
// лава из жерла течёт по бороздам со скоростью шага · мостки Потапа не пашутся — лава проходит под каменной аркой · Совиный взор — куда течь
// мёртвая вода Йоши — борозда зарастает · чугунная дверь раскаляется от лавы — Потап вышибает плечом · змеёныши: пропаши борозду в яму — лава уйдёт
function build44(){
  W.zvenAway=true;W.world=4;setTheme('valy');W.name='4-4 · «Змиевы валы»';W.sub='Огненная Смородина · плуг ведёт лаву';W.camX=11;const F=W.flags;F.stage='intro';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.kleshi=true;W.fallY=-9;const T=HERO;
  const soilM=M(0x7a5a3a),rampM=M(0x6a5034),stoneM=M(0x6a625c),plankM=M(0x9a6a3a);
  const Z=makeVestZ(helperOf(3));W.zven=Z;Z.pos.set(0,2.4,6);
  /* ---------- поле-сетка: 1 клетка = 1 м ---------- */
  const X0=-10,Z0=10,NX=20,NZ=92,N=NX*NZ;const TT=new Uint8Array(N),KF=new Uint8Array(N),LV=new Uint8Array(N),CT=new Float32Array(N);
  const WALK=1,CULV=2,SRC=4,BOWLA=8,BOWLB=16,DOOR=32,PIT=64;
  const cid=(x,z)=>{const i=Math.floor(x-X0),j=Math.floor(Z0-z);return i<0||i>=NX||j<0||j>=NZ?-1:j*NX+i;};const cx=k=>X0+(k%NX)+0.5,cz=k=>Z0-Math.floor(k/NX)-0.5;
  const rect=(x0,x1,z0,z1,fn)=>{for(let x=x0;x<x1;x++)for(let z=z0;z>z1;z--){const k=cid(x+0.5,z-0.5);if(k>=0)fn(k);}};
  // клетки борозд и лавы — инстансы
  const PG=new THREE.PlaneGeometry(1,1);PG.rotateX(-Math.PI/2);const furIM=new THREE.InstancedMesh(PG,M(0x3a2618),N),lavIM=new THREE.InstancedMesh(PG,LAVA_M,N);furIM.receiveShadow=true;lavIM.castShadow=false;
  const mZ=new THREE.Matrix4().makeScale(0,0,0),mT=new THREE.Matrix4();for(let k=0;k<N;k++){furIM.setMatrixAt(k,mZ);lavIM.setMatrixAt(k,mZ);}W.group.add(furIM);W.group.add(lavIM);
  const showFur=(k,on)=>{furIM.setMatrixAt(k,on?mT.makeTranslation(cx(k),0.02,cz(k)):mZ);furIM.instanceMatrix.needsUpdate=true;};
  const showLav=(k,on)=>{lavIM.setMatrixAt(k,on?mT.makeTranslation(cx(k),0.05,cz(k)):mZ);lavIM.instanceMatrix.needsUpdate=true;};
  const dig=k=>{if(k<0||TT[k]!==1||(KF[k]&WALK))return false;TT[k]=2;showFur(k,true);snap(k);return true;};
  // борозда сама дотягивается до жерла, чаши, ямы или порога, если до них одна клетка
  const snap=k=>{const i=k%NX,j=Math.floor(k/NX);for(let di=-2;di<=2;di++)for(let dj=-2;dj<=2;dj++){if(Math.max(Math.abs(di),Math.abs(dj))!==2)continue;const ii=i+di,jj=j+dj;if(ii<0||ii>=NX||jj<0||jj>=NZ)continue;const n=jj*NX+ii;if(!(KF[n]&(SRC|BOWLA|BOWLB|PIT|DOOR)))continue;
    const m=(j+Math.sign(dj))*NX+i+Math.sign(di);if(TT[m]===1&&!(KF[m]&WALK)){TT[m]=2;showFur(m,true);}}};
  const setLava=(k,on)=>{if(LV[k]===(on?1:0))return;LV[k]=on?1:0;showLav(k,on);};
  const heal=k=>{if(TT[k]!==2||(KF[k]&(SRC|BOWLA|BOWLB|PIT)))return;TT[k]=1;showFur(k,false);setLava(k,false);};
  const NB=k=>{const i=k%NX,out=[];for(let di=-1;di<=1;di++)for(let dj=-1;dj<=1;dj++){if(!di&&!dj)continue;const ii=i+di,n=k+dj*NX+di;if(ii<0||ii>=NX||n<0||n>=N)continue;out.push(n);}return out;};   // соседи по 8 направлениям: борозда лесенкой тоже течёт
  W.lavaCell=(x,z)=>{const k=cid(x,z);return k>=0&&LV[k]===1;};W.furrowAt=(x,z)=>{const k=cid(x,z);return k<0?-1:TT[k]*10+LV[k];};
  /* ---------- А. начало: плуг под светлячками ---------- */
  ground(-10,10,-4,14,0,soilM);wall(-10.2,-10,-82,14);wall(10,10.2,-82,14);wall(-10.2,10.2,14,14.2);bell(-6,8);const n1=nutItem(8.6,0.6,11);
  for(let z=12;z>-82;z-=rand(4,6))for(const s of[-1,1])addMesh(new THREE.DodecahedronGeometry(rand(1.2,2.2)),rampM,s*rand(12,16),0.3,z);
  /* ---------- поле А: жерло, мостки с аркой, чаша, вал с воротами ---------- */
  ground(-10,10,-29,-4,0,soilM);rect(-10,10,-4,-29,k=>{TT[k]=1;});
  rect(-8,-6,-6,-8,k=>{TT[k]=2;KF[k]|=SRC;showFur(k,true);setLava(k,true);});
  function crater(x,z){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);for(let i=0;i<9;i++){const a=i/9*Math.PI*2;addMesh(new THREE.DodecahedronGeometry(0.5),M(0x3a2a24),Math.cos(a)*1.5,0.25,Math.sin(a)*1.5,g);}const pl=new THREE.PointLight(0xff6a20,1.2,8,2);pl.position.y=1.2;g.add(pl);return g;}
  const crA=crater(-7,-7);
  // мостки Потапа: не пашутся; под каменной аркой лава проходит
  function walkway(x0,x1,z0,z1,cul){rect(x0,x1,z0,z1,k=>{KF[k]|=WALK;});for(const c of cul)rect(c[0],c[1],c[2],c[3],k=>{KF[k]&=~WALK;KF[k]|=CULV;});
    colBox(x0,x1,-1,0.3,z1,z0,false);addMesh(new THREE.BoxGeometry(x1-x0,0.3,z0-z1),plankM,(x0+x1)/2,0.15,(z0+z1)/2);
    for(const c of cul){const w=c[1]-c[0],d=c[2]-c[3];addMesh(new THREE.BoxGeometry(w+0.2,0.36,d+0.2),stoneM,(c[0]+c[1])/2,0.2,(c[2]+c[3])/2);for(const s of[-1,1])addMesh(new THREE.BoxGeometry(w>d?0.3:w+0.3,0.7,w>d?d+0.3:0.3),stoneM,(c[0]+c[1])/2+(w>d?s*(w/2+0.1):0),0.35,(c[2]+c[3])/2+(w>d?0:s*(d/2+0.1)));}}
  walkway(0,1,-4,-29,[[0,1,-16,-19]]);
  const bowlA=bowl(5,7,-23,-25,BOWLA);
  function bowl(x0,x1,z0,z1,fl){rect(x0,x1,z0,z1,k=>{TT[k]=2;KF[k]|=fl;showFur(k,true);});const g=new THREE.Group();g.position.set((x0+x1)/2,0,(z0+z1)/2);W.group.add(g);
    const r=addMesh(new THREE.TorusGeometry(1.25,0.22,8,20),stoneM,0,0.2,0,g);r.rotation.x=Math.PI/2;return g;}
  // вал с воротами; смотровой подъём на вал
  box(-10,-1.5,0,2,-31,-29,rampM);box(1.5,10,0,2,-31,-29,rampM);ground(-1.5,1.5,-31,-29,0,soilM);const gateA=ironGate(-1.5,1.5,-30,2.6);
  W.ramps=[{x0:-8.8,z0:-24,y0:0,y1:2,dx:0,dz:-1,len:5,w:1.1}];{const rp=addMesh(new THREE.BoxGeometry(2.2,0.3,5.4),rampM,-8.8,1,-26.5);rp.rotation.x=Math.atan2(2,5);}rect(-10,-7,-23,-29,k=>{TT[k]=0;});
  const L1=linkItem(-5,3.1,-30),n2=nutItem(6,2.6,-30);bell(-4,-2);
  /* ---------- поле Б: жерло справа, поперечные мостки с аркой слева, чугунная дверь в валу ---------- */
  ground(-10,10,-57,-31,0,soilM);rect(-10,10,-31,-57,k=>{TT[k]=1;});
  rect(6,8,-33,-35,k=>{TT[k]=2;KF[k]|=SRC;showFur(k,true);setLava(k,true);});const crB=crater(7,-34);
  walkway(-10,10,-45,-46,[[-6,-4,-45,-46]]);
  const bowlB=bowl(-8,-6,-51,-53,BOWLB);const chestB=chest(-8.8,0,-55,{});chestB.lock=true;bell(-3,-33);const n3=nutItem(9,0.6,-55),n4=nutItem(-9,0.6,-37.5);
  box(-10,-1.5,0,2.5,-59,-57,rampM);box(1.5,10,0,2.5,-59,-57,rampM);ground(-1.5,1.5,-59,-57,0,soilM);rect(-1.5,1.5,-56,-57,k=>{KF[k]|=DOOR;TT[k]=2;showFur(k,true);});   // желоб у порога
  const doorM=M(0x3e3c44,{emissive:0xff3000,emissiveIntensity:0});const door=new THREE.Group();door.position.set(0,0,-58);W.group.add(door);addMesh(new THREE.BoxGeometry(3,2.6,0.4),doorM,0,1.3,0,door);for(const x of[-0.9,0,0.9])addMesh(new THREE.BoxGeometry(0.12,2.4,0.5),doorM,x,1.3,0,door);
  const doorCol=colBox(-1.5,1.5,0,2.6,-58.25,-57.75,true);
  /* ---------- арена: жерло-исток, петля борозд с лавой, яма ---------- */
  ground(-10,10,-82,-59,0,soilM);rect(-10,10,-59,-82,k=>{TT[k]=1;});
  rect(-10,-8,-61,-64,k=>{TT[k]=2;KF[k]|=SRC;showFur(k,true);setLava(k,true);});const crC=crater(-9,-62.5);
  const pitK=[];rect(8,10,-60,-63,k=>{TT[k]=2;KF[k]|=PIT;showFur(k,true);pitK.push(k);});{const pm=addMesh(new THREE.CylinderGeometry(1.1,0.8,0.1,14),M(0x120a08),9,0.03,-61.5);pm.castShadow=false;}
  const pre=[];rect(-8,8,-65,-66,k=>pre.push(k));rect(7,8,-66,-76,k=>pre.push(k));rect(-8,8,-75,-76,k=>pre.push(k));rect(-8,-7,-66,-75,k=>pre.push(k));rect(-7,7,-70,-71,k=>pre.push(k));rect(-8,-7,-64,-65,k=>pre.push(k));
  pre.forEach(k=>{TT[k]=2;showFur(k,true);setLava(k,true);});bell(0,-60.5);
  // жаровня между бороздами: уголь — корм для печника (в стороне от стока к яме и от лемеха плуга)
  addMesh(new THREE.CylinderGeometry(0.55,0.35,0.4,10),M(0x3a3a40),-5,0.2,-68);addMesh(new THREE.TorusGeometry(0.52,0.05,6,16),M(0x5a5a62),-5,0.4,-68).rotation.x=Math.PI/2;W.cyls.push({x:-5,z:-68,r:0.55,miny:-1,maxy:0.4,on:true});forgeZone(-5,0.4,-68,0.8);
  const coal=hotItem('ugol',-5,0.4,-68,{coolable:false,name:'уголь'});const n5=nutItem(0,0.6,-80),L4=linkItem(-9.2,1.1,-80.6);
  /* ---------- течение лавы: фронт растёт по бороздам; если исток соединён с ямой — лава только на пути к яме ---------- */
  const FL={t:0,drainT:0};
  function flowTick(dt){FL.t+=dt;if(FL.t<0.36)return;FL.t=0;const add=[];
    for(let k=0;k<N;k++){if(!LV[k])continue;for(const n of NB(k)){if(TT[n]===2&&!LV[n]&&CT[n]<=0)add.push(n);}}
    for(const k of add){setLava(k,true);if(KF[k]&BOWLA&&!F.bowlA)bowlDone('A');if(KF[k]&BOWLB&&!F.bowlB)bowlDone('B');}
    // сток в яму: оставить лаву только на кратчайшем пути от истока к яме
    const src=[];for(let k=0;k<N;k++)if(KF[k]&SRC&&LV[k])src.push(k);const prev=new Int32Array(N).fill(-2);const q=[];for(const k of src){prev[k]=-1;q.push(k);}let hit=-1;
    for(let qi=0;qi<q.length&&hit<0;qi++){const k=q[qi];for(const n of NB(k)){if(prev[n]!==-2)continue;if(TT[n]!==2||!LV[n])continue;prev[n]=k;q.push(n);if(KF[n]&PIT){hit=n;break;}}}
    if(hit>=0){const keep=new Uint8Array(N);for(let k=hit;k>=0;k=prev[k])keep[k]=1;for(const k of src)keep[k]=1;pitK.forEach(k=>{keep[k]=1;});let cooled=0;
      for(let k=0;k<N;k++)if(LV[k]&&!keep[k]){setLava(k,false);CT[k]=6;cooled++;}if(cooled&&!F.drained){F.drained=true;SFX.whoosh();banner('Лава в яму ушла!','#ffb070',2.2,'на суше змеёныши ленивы');later(0.6,()=>sayP('…лаву не бьют — её ведут.',3));}}
    for(let k=0;k<N;k++)if(CT[k]>0)CT[k]-=0.36;}
  function bowlDone(w){if(w==='A'){F.bowlA=true;SFX.ok();later(0.8,()=>{gateA.openIt();banner('Чаша полна — ворота отворились!','#ffb070',2.4,'дальше — к чугунной двери, вперёд');});}
    else{F.bowlB=true;SFX.ok();chestB.lock=false;banner('Вторая чаша!','#ffb070',2,'сундук кузнецов отворился');}}
  /* ---------- плуг ---------- */
  const PL=makePlow();W.PLOW=PL;const plow={by:null,pos:PL.g.position,share:new V3(),ang:0};W.plowBy=()=>plow.by;   // для бота-напарника: кто держит плуг
PL.g.position.set(-3,0,-1);
  const shareAt=()=>plow.share.set(PL.g.position.x-Math.sin(plow.ang)*1.2,0,PL.g.position.z-Math.cos(plow.ang)*1.2);shareAt();
  W.grabs.push({pos:()=>new V3(plow.share.x,0,plow.share.z),r:2.8,active:()=>!G.cine&&(plow.by===null||true),onGrab:(h)=>{
    if(plow.by===h){plow.by=null;SFX.plate();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Плуг стоит','#ffb070');return;}
    if(plow.by&&plow.by!==h){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Плуг уж тянут — не мешай','#ffd0d0');return;}
    plow.by=h;SFX.latch();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Лемех — в клещи, живо!','#ffb070');if(!F.plowTold){F.plowTold=true;later(0.6,()=>bark(h,h.kind,h.kind==='proshka'?'Поехали! Пашем-пашем!':h.kind==='pelageya'?'Левее… левее, левей…':'Пашу, пашу!',1.8));}}});
  const fire=[];for(let i=0;i<12;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.06,6,4),MB(0xd8ff8a));W.group.add(m);fire.push({m,a:rand(0,6.3),r:rand(0.6,1.6),h:rand(1.4,2.6),s:rand(0.8,1.6)});}
  let walkTold=false;
  function plowTick(dt){const h=plow.by;if(h&&(h.active?players[h.player].downed:false))plow.by=null;
    if(plow.by){const h2=plow.by;const f=h2.face;const tx=h2.pos.x-Math.sin(f)*2.1,tz=h2.pos.z-Math.cos(f)*2.1;const d=Math.hypot(tx-PL.g.position.x,tz-PL.g.position.z);
      if(d>0.02){PL.g.position.x=damp(PL.g.position.x,tx,7,dt);PL.g.position.z=damp(PL.g.position.z,tz,7,dt);}
      plow.ang=Math.atan2(PL.g.position.x-h2.pos.x,PL.g.position.z-h2.pos.z);PL.g.rotation.y=plow.ang;
      const lim=F.stage==='A'||F.stage==='intro'?[-28.6,14]:F.stage==='B'?[-56.5,-31.5]:[-81.5,-59.5];PL.g.position.x=clamp(PL.g.position.x,-9.6,9.6);PL.g.position.z=clamp(PL.g.position.z,lim[0],lim[1]);
      if(hd(PL.g.position,h2.pos)>4.5){plow.by=null;floatText(h2.pos.clone().add(new V3(0,h2.d.height+0.6,0)),'Плуг отцепился','#ffd0d0');}
      shareAt();const k=cid(plow.share.x,plow.share.z);if(k>=0){if(KF[k]&WALK){if(!walkTold){walkTold=true;floatText(plow.share.clone().add(new V3(0,1.2,0)),'Мостки Потапа — не пахать, не трогать!','#ffd9a0');later(0.4,()=>sayP('…под каменной аркой — можно, пройдёт.',2.6));}}else if(dig(k)){F.plowed=true;if(Math.random()<0.3)burst(plow.share.clone().add(new V3(0,0.3,0)),0x6a4a2a,3,2,0.6);}}}
    else{PL.g.rotation.y=plow.ang;}
    PL.shareM.emissiveIntensity=0.7+0.2*Math.sin(G.time*5);
    const c=plow.by?plow.by.pos:PL.g.position;fire.forEach(f=>{f.a+=dt*f.s;f.m.position.set(c.x+Math.cos(f.a)*f.r,c.y+f.h+Math.sin(f.a*2)*0.2,c.z+Math.sin(f.a)*f.r);});}
  function movePlow(x,z){plow.by=null;PL.g.position.set(x,0,z);shareAt();burst(new V3(x,1,z),0xd8ff8a,14,3);}
  /* ---------- мёртвая вода: борозда зарастает ---------- */
  const deadWT={pos:new V3(),pri:0,k:-1,active:()=>{const Y=T.yosha;for(const d of[1.4,2.0,0.9]){const x=Y.pos.x+Math.sin(Y.face)*d,z=Y.pos.z+Math.cos(Y.face)*d;const k=cid(x,z);if(k>=0&&TT[k]===2&&!(KF[k]&(SRC|BOWLA|BOWLB|PIT))){deadWT.pos.set(cx(k),0,cz(k));deadWT.k=k;return true;}}return false;},
    onWater:()=>{const x=deadWT.pos.x,z=deadWT.pos.z;let n=0;for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const k=cid(x+dx,z+dz);if(k>=0&&TT[k]===2&&!(KF[k]&(SRC|BOWLA|BOWLB|PIT))){heal(k);n++;}}
      SFX.grow();burst(new V3(x,0.3,z),0x7ad85a,12,3);floatText(new V3(x,1,z),'Мёртвая вода — борозда заросла травой','#9fe6a0');if(!F.healTold){F.healTold=true;later(0.5,()=>bark(T.yosha,'yosha','Ошиблись — поправим, не беда.',1.8));}}};
  W.waterTargets.push(deadWT);
  /* ---------- чугунная дверь: раскаляется от лавы у порога, Потап вышибает плечом ---------- */
  F.doorHeat=0;
  W.hittables.push({pos:new V3(0,0,-57.4),r:1.9,alive:()=>!F.doorOpen,onHit:h=>{if(F.doorHeat<1){SFX.clink();floatText(new V3(0,2.8,-57.4),'Холодный чугун не поддаётся — лавой раскали!','#cfd8dc');return;}
    if(h.kind!=='potap'){SFX.clink();floatText(new V3(0,2.8,-57.4),'Раскалилась! Вышибет лишь Потап — плечом','#ffd9a0');return;}
    F.doorOpen=true;doorCol.on=false;SFX.brk();shakeAll(0.06,0.4);burst(new V3(0,1.4,-58),0xff8a3a,24,5);anim(0.9,k=>{door.rotation.x=-k*1.45;door.position.z=-58-k*1.2;});bark(h,'potap','Плечом… как Илья Муромец!',2);banner('Дверь — вон!','#ffb070',2.2,'за стеною — змеёныши');}});
  /* ---------- Совиный взор: куда лава хочет течь ---------- */
  const routes=[[[-6,-8],[-4,-11],[-2,-15],[-1,-17.5],[2,-17.5],[4,-20],[6,-24]],[[6,-35],[3,-38],[-1,-41],[-5,-43],[-5,-45.5],[-5,-48],[-2,-52],[0,-56]],[[-8,-62.5],[-3,-62.5],[2,-62.5],[6,-62.5],[8.5,-61.5]]];
  const dots=[];routes.forEach(r=>{for(let i=0;i<r.length-1;i++){const [x0,z0]=r[i],[x1,z1]=r[i+1];const n=Math.ceil(Math.hypot(x1-x0,z1-z0)/0.8);for(let j=0;j<n;j++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.12,6,4),MB(0xe7c3ff,{transparent:true,opacity:0.9}));m.position.set(lerp(x0,x1,j/n),0.35,lerp(z0,z1,j/n));m.visible=false;W.group.add(m);dots.push(m);}}});
  W.onOwl=()=>{if(!F.owlTold){F.owlTold=true;later(0.3,()=>sayP('Вижу, куда лава течь хочет!',2.2));}};
  /* ---------- мороки арены ---------- */
  let arena=null;function spawnArena(){F.fight=true;arena=[snakeFoe(-3,-65.5),snakeFoe(3,-65.5),snakeFoe(7.5,-70),snakeFoe(-7.5,-72),snakeFoe(0,-75.5),bolvanFoe(0,-70.5,{leash:8}),pechnikFoe(2.5,-68,{leash:8})];
    banner('Змеёныши!','#ff9a60',2.4,'в лаве они сильны: пропашите плугом канавку от дыры в яму — лава уйдёт');later(1.2,()=>sayP('…в борозде с лавой они сильны, на сухом — ленивы.',3.4));}
  /* ---------- сюжет ---------- */
  function intro(){const pe=T.pelageya,pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-4+i*2,6,0);h.face=Math.PI;});
    play({dur:22,fov:46,camK:2.4,shots:[shot(0,[0,9,16],[0,0,-14]),shot(5.4,[-6,2.4,3],[-3,0.8,-1]),shot(10.8,[-1,3,1],[-3,1.8,-1]),shot(15,[-9,4,-2],[-7,0.4,-7]),shot(18.6,[pr.pos.x+1.4,1.4,pr.pos.z-1.6],[pr.pos.x,0.9,pr.pos.z])],
      says:[[0.3,5,null,'<i>По старому преданию кузнецы Кузьма и Демьян запрягли Змея в плуг и пропахали Змиевы валы.</i>',true],[5.4,5,null,'<i>Плуг до сих пор стоит в поле — огромный, железный, с раскалённым лемехом.</i>',true],
        [10.8,4,null,'<i>Над плугом светлячки Лешего кружат:</i><br><i>Долг он отдаёт — дорогу кажет, как обещал, послужит.</i>',true],[15,3.4,'pelageya','…лава течёт туда, куда борозда ведёт.'],[18.6,3.2,'proshka','Лемех горячий… значит, клещами!']],
      end:()=>{W.anims.length=0;F.stage='A';snapCams();for(const pi of[0,1])tip(pi,'Клещи '+K(pi,'item')+' у плуга нажми — он поедет за тобой, канавку оставит.<br>Ещё раз '+K(pi,'item')+' — отпустить, и плуг отстанет.',4);}});}
  function endScene(){F.stage='end';const pr=T.proshka,pe=T.pelageya;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-68,0);h.face=Math.PI;});
    play({dur:17,fov:46,camK:2.4,shots:[shot(0,[0,5,-60],[0,0.6,-70]),shot(5,[pe.pos.x+1.6,1.4,pe.pos.z-1.6],[pe.pos.x,0.9,pe.pos.z]),shot(9.6,[-2,2.4,-63],[0,2,-70]),shot(13.4,[pr.pos.x-1.4,1.3,pr.pos.z-1.6],[pr.pos.x,0.9,pr.pos.z])],
      says:[[0.3,4.4,null,'<i>Лава течёт в яму ровной огненной лентой. Змеёныши расплелись в нитки.</i>',true],[5,3.6,'pelageya','…лаву не бьют — её ведут.'],
        [9.6,3.6,null,'<i>Светлячки Лешего в золотой шар собираются —</i><br><i>И звено роняют, в траве оно качается.</i>',true],[13.4,3,'proshka','Спасибо, дед! Долг отдан.']],
      events:[{t:9.6,fn:()=>{fire.forEach((f,i)=>{const from=f.m.position.clone();anim(1.4,k=>{f.m.position.lerpVectors(from,new V3(0,2.4,-70),smooth(k));});});
        giveLink(new V3(0,0,-70),pr,2.4,2.8);}}],
      end:()=>{W.anims.length=0;flushGifts();F.out=true;banner('Змиевы валы пропаханы!','#ffb070',2.4,'в лавке у Векши — шлем-котелок, загляни!');later(1.8,finishLevel);}});}
  W.linkTotal++;   // четвёртое звено отдадут светлячки Лешего
  W.updates.push(dt=>{flowTick(dt);plowTick(dt);
    dots.forEach(m=>{m.visible=W.owlT>0;});
    // дверь греется от лавы у порога
    let hot=false;for(let k=0;k<N;k++)if(KF[k]&DOOR&&LV[k]){hot=true;break;}F.doorHeat=clamp(F.doorHeat+(hot?0.35:-0.08)*dt,0,1);doorM.emissiveIntensity=F.doorHeat*(0.8+0.2*Math.sin(G.time*6));doorM.color.setHex(F.doorHeat>=1?0xff6a20:0x3e3c44);
    if(F.doorHeat>=1&&!F.doorHotTold){F.doorHotTold=true;banner('Дверь раскалилась!','#ffb070',2,'Потап плечом толкает: удар '+K(0,'attack')+' / '+K(1,'attack'));}
    // герой в борозде с лавой — «горячо!»
    for(const h of HEROES){if(h.cling||(h.active&&players[h.player].downed)||h.pos.y>0.28||!h.grounded)continue;const k=cid(h.pos.x,h.pos.z);if(k<0||!LV[k])continue;if((h.burnT||0)>0)continue;h.burnT=1;
      let bx=0,bz=0,bd=9;for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++){const n=cid(h.pos.x+dx,h.pos.z+dz);if(n>=0&&!LV[n]&&TT[n]){const d=dx*dx+dz*dz;if(d<bd){bd=d;bx=dx;bz=dz;}}}
      const d=Math.hypot(bx,bz)||1;h.vel.x=bx/d*6;h.vel.z=bz/d*6;h.vel.y=4;h.grounded=false;h.knockT=0.3;SFX.knock();floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Ай! Лава! Через борозду прыгай','#ff9a60');}
    for(const h of HEROES)if(h.burnT>0)h.burnT-=dt;
    const ah=[0,1].map(active);
    if(F.stage==='A'&&F.bowlA&&ah.some(h=>h.pos.z<-31.5)){F.stage='B';if(plow.pos.z>-29)movePlow(-2,-33);}
    if(F.stage==='B'&&F.doorOpen&&ah.some(h=>h.pos.z<-59.5)){F.stage='C';if(plow.pos.z>-57)movePlow(-4,-61);spawnArena();}
    if(F.stage==='C'&&F.fight&&!F.cleared&&arena.every(e=>!e.alive)){F.cleared=true;SFX.ok();later(1.2,endScene);}});
  /* ---------- рисунки кнопок ---------- */
  const Y=T.yosha,Pe=T.pelageya,Po=T.potap;
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>!plow.by&&hd(plow.share,h().pos)<2.8&&!G.cine,'взять плуг');
    prompt(pi,'item',()=>headOf(h()),()=>plow.by===h(),'отпустить плуг');
    prompt(pi,'item',()=>headOf(h()),()=>!heroCarry(h())&&!plow.by&&coal.heat>0.3&&!coal.gone&&!coal.carrier&&hd(coal.pos,h().pos)<2.2&&W.enemies.some(e=>e.alive&&e.kind==='pechnik'&&e.fed<=0),'дай печнику уголь');
    prompt(pi,'attack',()=>headOf(h()),()=>h()===Po&&F.doorHeat>=1&&!F.doorOpen&&hd(h().pos,{x:0,z:-57.4})<3,'плечом!');}
  prompt(1,'skill',()=>headOf(Pe),()=>Pe.active&&F.stage!=='end'&&W.owlT<=0&&!F.owlTold,'куда потечёт?');
  prompt(1,'skill',()=>headOf(Y),()=>Y.active&&deadWT.active(),'мёртвая вода');
  /* ---------- задачи ---------- */
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const mk=pi=>[
    OR(()=>'Плуг кузнецов: лемех раскалён — клещи '+K(pi,'item')+' у лемеха, и плуг за тобой пойдёт, борозду оставляя.<br>Ещё раз '+K(pi,'item')+' — отпустить, так и знай.',()=>!!F.plowed,()=>[PL.g],null,'…лемех горяч — значит, клещами бери.'),
    OR(()=>'Доведи лаву из жерла до каменной чаши: борозду от жерла к чаше пропаши.<br>Мостки Потапа не пашутся — лава пройдёт лишь под каменной аркой. Пелагея '+K(1,'skill')+' — Совиный взор: куда течь, подскажи.',()=>!!F.bowlA,()=>[bowlA],null,'…лаву не бьют — её ведут.'),
    OR(()=>'Чугунная дверь в валу: к порогу её лаву доведи — раскалится. Вышибет Потап — плечом '+K(pi,'attack')+'.<br>(Вторая чаша слева — сундук кузнецов.) Не туда пропахали — Йоша, мёртвая вода '+K(1,'skill')+', и снова — вперёд.',()=>!!F.doorOpen,()=>[door],null,'…чугун от жара мягчеет, как воск.'),
    OR(()=>'Змеёныши в бороздах с лавой! От истока в яму справа борозду пропаши — лава уйдёт, и они на сухом.<br>Болвана — полить да латы сорвать. Печник остыл — поднеси ему клещами уголь из жаровни, бей, пока горит огнём.',()=>!!F.cleared,()=>arena?[...arena.filter(e=>e.alive).map(e=>e.g),new V3(9,0,-61.5)]:[],null,'…в борозде с лавой они сильны, на сухом — ленивы.'),
    O('Светлячки Лешего…',()=>false,()=>[fire[0].m])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>W.enemies.some(e=>e.alive&&e.kind==='pechnik'&&e.fed<=0&&hd(e.pos,h.pos)<10),text:(pi,h)=>heroCarry(h)?'Неси горячее печнику — вплотную поднеси иль брось рядом':'Печник остыл — его не ударить. Клещами '+K(pi,'item')+' уголь из жаровни возьми — и поднеси ему.'},
    {cond:(pi,h)=>plow.by===h,text:pi=>'Ты пашешь — плуг за тобой едет. Лава по канавке от дыры потечёт. '+K(pi,'item')+' — отпустить.'});
  W.spawns=[[new V3(-2.6,0,9),new V3(-4.6,0,10)],[new V3(2.6,0,9),new V3(4.6,0,10)]];W.startAct=[0,0];
  W.pauseLine='Змиевы валы. Клещами за раскалённый лемех — плуг борозду за тобой пашет, и лава по бороздам течёт.<br>Мостки не пашутся — под аркой можно. Совиный взор кажет, куда течь; мёртвая вода — борозда зарастёт.<br>Дверь лава раскалит — Потап вышибет, вперёд!';
  W.onStart=()=>{later(0.4,intro);};
  flushDecor();}

