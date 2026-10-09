/* ============================== МИР 5 · 5-1 «СУНДУК НА ДУБЕ» — остров, дуб и Лихо Одноглазое ============================== */
// Часть 1 «Остров на море лежит»: причал Горыныча и Алатырь-камень · Лебедь и коршун (рогатка или волна гуслями) · Голова в ущелье
// (дует: Потап со щитом впереди, Йоша под усами щекочет нос пером — чих) · хрустальный залив (свет по хрусталикам, эстафета) и белка ·
// пугала на лугу · дупло с игрушками, тетрадкой и зеркальцем Кощея. Часть 2 «Дуб»: ярусы клубка, гуслей и пера, Лихо на корне.
// Часть 3 «Лихо»: поляна, горн и ключ — четыре цепи упали, а сундук висит на пятой, чёрной; её конец — у Лиха в лапе ·
// ловушка взгляда · побег в шкурах к корням · бой без ударов: зеркальце (Лихо увидит себя) → счёт овечек через бревно →
// колыбельная и щекотка лапы («замри!») · лапа разжалась — сундук падает, из него заяц.
function build51(){
  W.zvenAway=true;W.world=5;setTheme('buyan');sky('buyan');W.name='5-1 · Сундук на дубе';W.sub='Остров Буян · вещь по знаку · не смотри Лиху в глаз';W.camX=13;const F=W.flags;F.stage='intro';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.threadLife=10;W.fallY=-6;W.readHints=true;W.vestPull=true;W.wade=wade5;const T=HERO;
  const barkM=M(0x5e4c3e),barkD=M(0x3e342c),sandM=M(0xd8c088),sandS=M(0xb89a6a),grassM=M(0x7a9a58),rockM=M(0x8a8478),rockT=M(0x9a948a),mossM=M(0x6a7a48);
  const Z=makeVestZ(helperOf(4));W.zven=Z;Z.pos.set(0,2.4,88);
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(700,700),M(0x3a8ab8));sea.rotation.x=-Math.PI/2;sea.position.set(0,-0.7,0);W.group.add(sea);
  const tv5=new V3(),tv6=new V3();
  /* ---------- часть 1: причал, заводь, ущелье, залив ---------- */
  ground(-10,14,84,104,0,sandM,sandS);ground(-10,14,50,84,0,sandM,sandS);ground(-10,14,24,50,0,M(0xc8b484),rockM);
  ground(-10,14,17,24,0,sandM,sandS);ground(1,5,9.5,12.5,0.25,rockT,rockM);ground(9.8,12.2,9.8,12.2,0.25,rockT,rockM);ground(-10,14,-2,3,0,sandM,sandS);
  ground(-10,14,-30,-2,0,grassM);
  wall(-10.2,-10,-30,104);wall(14,14.2,-30,104);wall(-10,14,104,104.2);
  for(let z=102;z>-30;z-=rand(2.5,4)){if(z>54&&z<80)continue;addMesh(new THREE.DodecahedronGeometry(rand(0.8,1.6)),rockM,rand(15,18),0.2,z).rotation.set(rand(0,3),rand(0,3),0);}
  for(let z=78;z>56;z-=rand(3,5))addMesh(new THREE.DodecahedronGeometry(rand(0.4,0.7)),rockM,rand(14.4,15.2),-0.3,z).rotation.set(rand(0,3),rand(0,3),0);
  const alatyr=makeAlatyr(1,81);
  const gor=makeGorynych5(0.8);gor.g.position.set(8,0,93);gor.g.rotation.y=Math.PI*0.95;W.cyls.push({x:8,z:93,r:3,miny:-1,maxy:4,on:true});
  bell(-6,92);bell(-2.7,47.5);bell(-1.2,20.6);bell(0.2,-1.2);bell(-6,-20);
  const N1=nutItem(12.5,0.6,20),N2=nutItem(-8.8,0.6,-26),N6=nutItem(-8.5,0.6,82),N7=nutItem(11,0.85,11);
  const NB=[nutItem(-5.2,1.4,1.8),nutItem(-6.8,1.4,1.8)];NB.forEach(it=>{it.locked=true;it.g.visible=false;});   // орешки белки — в ролике
  // дуб — огромный и засохший: ствол слева, ярусы — корни и ветви
  {const tr=addMesh(new THREE.CylinderGeometry(12,15.5,52,22),barkM,-25.5,22,-60);tr.castShadow=false;
    for(let i=0;i<9;i++){const a=i/9*Math.PI-Math.PI/2,r=addMesh(new THREE.CylinderGeometry(1.4,2.4,12,8),barkD,-14+Math.cos(a)*2,0.5,-10-i*14);r.rotation.z=1.25;r.rotation.y=rand(-0.3,0.3);}
    for(let i=0;i<10;i++){const b=addMesh(new THREE.CylinderGeometry(0.6,1.4,rand(18,26),8),barkD,-14+rand(0,8),rand(34,46),-40-i*9);b.rotation.z=rand(0.9,1.4);b.rotation.y=rand(-0.5,0.5);}
    const hol=new THREE.Mesh(new THREE.CircleGeometry(1.7,20),MB(0x140e0a));hol.position.set(-9.95,1.6,-14);hol.rotation.y=Math.PI/2;hol.scale.set(1,1.3,1);W.group.add(hol);}
  const toys=makeToys();toys.g.position.set(-8.6,0,-14);toys.g.rotation.y=Math.PI/2;const kid=makeKidBook();kid.g.position.set(-8.4,0.02,-12.8);kid.g.rotation.y=0.3;
  const L1=linkItem(-8.6,1.0,-15.6);
  /* ---------- заводь: Лебедь и коршун ---------- */
  const swan=makeSwan5();const SW0=new V3(18.5,-0.62,67);swan.g.position.copy(SW0);swan.g.rotation.y=-Math.PI/2;
  const kite=makeKite5();kite.g.visible=false;
  const KT={st:'off',t:0,ang:0,pos:new V3(14,5.6,67),emb:4,gHits:0,from:new V3(),to:new V3(),wave:0,hitCd:0,waveCd:0};kite.g.position.copy(KT.pos);
  const kMark=markMesh(1.4);kMark.visible=false;W.group.add(kMark);
  const waveM=new THREE.Mesh(new THREE.TorusGeometry(1.6,0.45,8,28,Math.PI*1.4),M(0xcff4ff,{transparent:true,opacity:0.85,emissive:0x2ab0c0,emissiveIntensity:0.3}));waveM.rotation.x=-Math.PI/2;waveM.rotation.z=Math.PI*0.8;waveM.visible=false;waveM.userData.noBatch=true;W.group.add(waveM);
  const waveSign=signMark(9,0,67,'gusli',{r:5,on:()=>F.stage==='kite'});
  /* ---------- ущелье: Голова ---------- */
  box(-10,-3,0,9,24,44,rockM);box(5,14,0,9,24,27.5,rockM);box(10.5,14,0,9,27.5,35.5,rockM);box(5,14,0,9,35.5,44,rockM);
  for(let i=0;i<10;i++){addMesh(new THREE.DodecahedronGeometry(rand(1,2.2)),rockM,rand(-9,-4),rand(8.5,9.5),rand(25,43)).rotation.set(rand(0,3),rand(0,3),0);addMesh(new THREE.DodecahedronGeometry(rand(1,2.2)),rockM,rand(6,13),rand(8.5,9.5),rand(25,43)).rotation.set(rand(0,3),rand(0,3),0);}
  const golova=makeGolova5();const GH=new V3(1,0,34);golova.g.position.copy(GH);
  const headCol=[{x:1,z:34,r:3.4,miny:-1,maxy:9,on:true}];W.cyls.push(headCol[0]);
  const headBoxes=[colBox(-3.2,-1.4,-1,9,29,36),colBox(3.4,5.2,-1,9,29,36),colBox(-1.5,3.5,0.72,2.2,36.8,38.9),colBox(-1.7,0.3,-1,1.3,36.4,38.9),colBox(1.7,3.7,-1,1.3,36.4,38.9)];
  const tickSign=signMark(1,0,38.2,'pero',{r:0.95,dy:2,keep:2.2,noArea:true,on:()=>F.stage==='head'});
  const windFx=[];for(let i=0;i<22;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.04,rand(1.2,2.4)),MB(0xffffff,{transparent:true,opacity:0,depthWrite:false}));m.userData.noBatch=true;W.group.add(m);windFx.push({m,x:rand(-3,5),y:rand(0.4,3.2),z:rand(39,56),sp:rand(10,16)});}
  const HB={ph:'out',t:0,tick:0};   // выдох / вдох
  /* ---------- залив: хрусталики, белка ---------- */
  const crA=makeCrystal5(4.5,0,18.1),crB=makeCrystal5(3,0.25,11),crC=makeCrystal5(4.5,0,1.9);crA.ax.rotation.y=0;crC.ax.rotation.y=0;
  const CR={axisNS:false,rotCd:0,aLit:false,cLit:false,pow:false};crB.ax.rotation.y=Math.PI/2;
  const lightNear=(c)=>HEROES.some(h=>heroLight(h)&&hd(h.pos,c.pos)<2.4&&Math.abs(h.pos.y-(c.pos.y-1.25))<2);
  const segAB=()=>CR.aLit||(CR.pow&&CR.axisNS),segBC=()=>CR.cLit||(CR.pow&&CR.axisNS),segBD=()=>CR.pow&&!CR.axisNS;
  const tAB=mostki('light',[[3,0,16.9],[3,0.25,12.4]],{w:2.1}),tBC=mostki('light',[[3,0.25,9.6],[3,0,3.1]],{w:2.1}),tBD=mostki('light',[[4.4,0.25,11],[9.7,0.25,11]],{w:1.6});
  tAB.forEach(t=>{t.beam=segAB;});tBC.forEach(t=>{t.beam=segBC;});tBD.forEach(t=>{t.beam=segBD;});
  const bmAB=beamMesh(),bmBC=beamMesh(),bmBD=beamMesh();
  signMark(3,0,20.4,'pero',{r:3,keep:4.5});signMark(3,0,-0.6,'pero',{r:3,keep:4.5});
  W.hittables.push({pos:new V3(3,1.2,11),r:1.1,push:false,alive:()=>!G.cine&&F.stage==='lagoon',onHit:h=>{if(CR.rotCd>0)return;CR.rotCd=0.45;CR.axisNS=!CR.axisNS;SFX.latch();SFX.flower();
    const from=crB.ax.rotation.y,to=CR.axisNS?0:Math.PI/2;anim(0.35,k=>{crB.ax.rotation.y=lerp(from,to,smooth(k));});floatText(crB.pos.clone().add(new V3(0,1,0)),CR.axisNS?'Хрусталик повернулся: луч — через залив':'Хрусталик повернулся: луч — к камню','#e8f8ff');
    if(!F.rotTold&&CR.axisNS){F.rotTold=true;later(0.4,()=>sayP('Тут написано… хрусталик передаёт свет дальше.',3));}}});
  const house=makeCrystalHouse5();house.g.position.set(-6,0,0.4);W.cyls.push({x:-6,z:0.4,r:1.3,miny:-1,maxy:3,on:true});
  {const tr=addMesh(new THREE.CylinderGeometry(0.25,0.35,2.4,7),M(0x6b4a2b),-8.4,1.2,-1.4);for(let i=0;i<4;i++)addMesh(new THREE.ConeGeometry(2.2-i*0.45,1.7,9),M(0x2f6a3a),-8.4,2.4+i*1.05,-1.4);W.cyls.push({x:-8.4,z:-1.4,r:0.6,miny:-1,maxy:5,on:true});}
  const belka=makeBelka5();belka.g.position.set(-6,0.25,0.4);belka.g.visible=false;
  /* ---------- луг: знаки, хамелей, пугало ---------- */
  // знаки на лугу: хамелей перенимает ближайший — у пера (свети) или у гуслей (капли); дальше к корням — клубок
  signMark(7.5,0,-9,'pero',{r:4,keep:14});signMark(-5,0,-7,'gusli',{r:4});
  let meadowFoes=[];const spawnMeadow=()=>{if(!meadowFoes.length)meadowFoes=[hameleyFoe(1,-13,{leash:7}),pugaloFoe(4.5,-15)];};
  /* ---------- зеркальце Кощея: лежит в мешке в дупле, в бою — на пеньке ---------- */
  const MR=Object.assign(makeMirror5(),{holder:null,rest:new V3(-8.35,0.12,-13.55),state:'hollow'});MR.g.position.copy(MR.rest);MR.face.rotation.x=-Math.PI/2;
  /* ---------- часть 2 · дуб: ярус клубка — колышки крест-накрест, паутинка — наверх ---------- */
  ground(-10,10,-64,-30,3.4,mossM,barkM);wall(10,10.2,-64,-30);
  signMark(-2,0,-23,'clew');
  const RG=[holdRing(0.4,0,-25.4,0),holdRing(-4.4,0,-25.4,1)];const SK=[stake(-4.4,-29.8,0,{h:0.6}),stake(0.4,-29.8,0,{h:0.6})];
  const LAND=new V3(-2,3.4,-32.4);
  W.onWeb=h=>{if(!F.webTold){F.webTold=true;later(0.3,()=>bark(T.pelageya,'pelageya','<i>(шёпотом)</i> Как у Кикиморы, точь-в-точь.',2));}
    if(h.pos.y>2)return;const vy=h.vel.y,dy=LAND.y-h.pos.y,disc=vy*vy-2*GRAV*dy;if(disc<=0)return;const ft=(vy+Math.sqrt(disc))/GRAV;const tx=LAND.x+rand(-1.2,1.2),tz=LAND.z+rand(-0.3,0.3);h.vel.x=(tx-h.pos.x)/ft;h.vel.z=(tz-h.pos.z)/ft;h.aimT=ft+0.05;h.following=false;};
  W.onString=t=>{const ss=W.threads.filter(q=>q.string&&!q.sag);if(ss.length===1&&!F.crossTold){F.crossTold=true;tip(1-t.owner,'Струна друга висит. Брось свою поперёк!',3);}};
  /* ---------- замки на цепях: четыре золотые цепи с замками, пятая — чёрная, через сук, к Лиху ---------- */
  const CHEST=new V3(1,24,-95);const chest=makeChest5();chest.g.position.copy(CHEST);chest.g.rotation.y=0.3;
  addMesh(new THREE.CylinderGeometry(0.9,1.6,26,8),barkD,-8,30,-95).rotation.z=1.35;
  const BOUGH=new V3(1.4,28.4,-95.2),PULLEY=new V3(-6,18.6,-137.6),CHAIN_REST=new V3(-6,0.25,-137.6);
  {const a=new V3(-15,27,-104),b=new V3(-4.4,18.2,-139),d=b.clone().sub(a),br=addMesh(new THREE.CylinderGeometry(0.7,1.5,d.length(),8),barkD,(a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);br.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());br.castShadow=false;
    addMesh(new THREE.TorusGeometry(0.45,0.14,6,14),M(0x5a5460),PULLEY.x,PULLEY.y+0.35,PULLEY.z).rotation.y=Math.PI/2;}   // сук дуба над поляной и блок на нём: пятая цепь переброшена через него
  const hang5=chainLine(new V3(1,25.2,-95),new V3(1.2,28.2,-95.1),0x3e3a46);
  const chain5=chainLive(150);let chainOn=true,chainEnd=null;const pawW=new V3();
  const LOCKS=[];
  function lockMesh(x,y,z,item,pi){const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const iron=M(0x4a4a54);
    addMesh(new THREE.CylinderGeometry(0.35,0.45,1.1,8),M(0x6a5a4a),0,0.55,0,g);const body=addMesh(new THREE.BoxGeometry(0.9,0.75,0.35),iron,0,1.55,0,g);
    const sh=new THREE.Group();sh.position.set(-0.28,1.9,0);g.add(sh);addMesh(new THREE.TorusGeometry(0.28,0.07,6,14,Math.PI),iron,0.28,0,0,sh);
    const ic=signIcon(item,0.45);ic.position.set(0,1.55,0.22);g.add(ic);
    if(pi!==undefined&&pi!==null){const r=addMesh(new THREE.TorusGeometry(0.62,0.05,6,24),MB(PCOL[pi]),0,0.05,0,g);r.rotation.x=Math.PI/2;}
    const ch=chainLine(new V3(x,y+2.1,z),CHEST.clone().add(new V3(0,0.3,0)));W.cyls.push({x,z,r:0.5,miny:-1,maxy:y+1.9,on:true});
    const L={g,sh,body,ch,x,y,z,pos:new V3(x,y+1.4,z),open:false,item,pi};LOCKS.push(L);return L;}
  function openLock(L,quiet){if(L.open)return;L.open=true;const ch=L.ch;
    if(quiet){L.sh.rotation.y=-1.4;L.sh.position.y=2.1;ch.visible=false;chest.g.rotation.z=0.05*LOCKS.filter(q=>q.open).length;return;}
    SFX.latch();SFX.gate();anim(0.5,k=>{L.sh.rotation.y=-k*1.4;L.sh.position.y=1.9+k*0.2;});burst(L.pos.clone().add(new V3(0,0.6,0)),COL.gold,16,3);
    anim(1.2,k=>{ch.position.y=-k*k*6;ch.rotation.z=k*0.2;if(k>=1)ch.visible=false;});floatText(L.pos.clone().add(new V3(0,1.4,0)),'Замок открыт! Цепь упала — звяк!','#ffd76a');
    const n=LOCKS.filter(q=>q.open).length;banner('Замок '+['клубка','гуслей','пера','пера','клещей'][LOCKS.indexOf(L)]+' открыт','#ffd76a',1.8,n>=5?'золотых цепей больше нет — а сундук висит…':'золотых цепей на сундуке осталось: '+[4,3,3,2,1,0][Math.min(5,n)]);
    chest.g.rotation.z=0.05*n;}
  const lk1=lockMesh(3.2,3.4,-31.2,'clew');
  const L2=linkItem(9,4.4,-31.2);bell(-3.8,-31,3.4);const N3=nutItem(-9.2,4.0,-31);
  /* ---------- переправа 1: гребень коры, Лихо на корне, кольцо-приманка ---------- */
  box(-6.5,6,3.4,7.8,-35,-34,barkD);W.covers.push({minx:-6.6,maxx:6.1,miny:3.4,maxy:7.8,minz:-35.2,maxz:-33.8});
  const bait1=baitRing(8.2,3.4,-38.5);
  addMesh(new THREE.CylinderGeometry(1.4,1.8,1.2,10),barkD,-1.5,4.0,-45);
  const likho1=likho({x:-1.5,y:4.6,z:-45,face:0.75,R:18,on:()=>F.likho1&&!F.likho2&&(F.stage==='cross1'||F.stage==='well'),onCatch:(h)=>{likhoCatch(h,new V3(-2+rand(-1,1),3.4,-31.8));if(!F.caughtTold){F.caughtTold=true;later(1,()=>sayP('…Лихо ближайшего видит.<br>Пусть разглядывает кого-то в кольце — никого не обидит.',3.6));}}});
  likho1.g.visible=false;
  /* ---------- ярус гуслей: колодец в дупле — прилив поднимает ---------- */
  box(-10.4,-10,3.4,11.5,-64,-54,barkD);box(-2,-1.6,3.4,11.5,-64,-54,barkD);box(-10,-8,3.4,11.5,-54.4,-54,barkD);box(-4.6,-2,3.4,11.5,-54.4,-54,barkD);box(-8,-4.6,6.4,11.5,-54.4,-54,barkD);
  box(-1.6,10,3.4,11.5,-64,-54,barkM);W.covers.push({minx:-10.6,maxx:-1.4,miny:3.3,maxy:11.6,minz:-64,maxz:-54.2});
  const well=waterZone(-10,-2,-64,-54.4,3.65,9.3,{shell:false,curb:false,floor:3.4,dur:3,onChange:(z)=>{if(z.state==='high'&&!F.tideTold){F.tideTold=true;later(0.8,()=>sayP('…как в колодце. На воде держитесь.',2.6));}}});
  signMark(-6,3.4,-58.5,'gusli',{r:6,dy:7,noArea:true});
  const L3=linkItem(-6,9.9,-60.5);
  /* ---------- ярус пера: светомостки — Игроку 1, тенемостки — Игроку 2 ---------- */
  ground(-10,10,-70,-64,9,mossM,barkM);wall(-10.2,-10,-100,-64);wall(10,10.2,-100,-64);
  bell(-3.6,-65.6,9);const lk2=lockMesh(-6,9,-67.5,'gusli');
  signMark(0,9,-67.5,'pero',{r:8,keep:36});
  const lightP=mostki('light',[[-7,9,-70.1],[-7,9,-86.1]]),shadowP=mostki('shadow',[[7,9,-70.1],[7,9,-86.1]]);
  ground(-9.5,-4.5,-90.6,-86,9,mossM,barkM);ground(4.5,9.5,-90.6,-86,9,mossM,barkM);
  const lk3a=lockMesh(-7,9,-89,'pero',0),lk3b=lockMesh(7,9,-89,'pero',1);
  const L4=linkItem(7,10.1,-78);W.linkTotal++;   // над тенемостками; пятое — из сундука
  const gateB=box(-10,10,9,12.6,-91.2,-90.6,barkD);const gateVis=[];for(let i=0;i<9;i++){const b=addMesh(new THREE.CylinderGeometry(0.22,0.3,3.8,6),barkD,-9+i*2.25,10.8,-90.9);b.rotation.z=rand(-0.4,0.4);gateVis.push(b);}
  let bridges=null;
  /* ---------- крона и корень вниз, на поляну ---------- */
  ground(-10,10,-100,-90.6,9,mossM,barkM);bell(0,-95,9);const N4=nutItem(9,9.6,-99);
  W.ramps=[{x0:0,z0:-100,y0:9,y1:0,dx:0,dz:-1,len:16,w:4}];{const rp=addMesh(new THREE.BoxGeometry(8,0.6,Math.hypot(16,9)),barkM.clone(),0,4.2,-108);rp.rotation.x=-Math.atan2(9,16);fadeable([rp]);}
  /* ---------- часть 3 · поляна под кроной: горн с ключами, замок клещей, отара ---------- */
  ground(-12,40,-146,-114,0,grassM);wall(-12.2,-12,-146,-114);wall(40,40.2,-146,-114);wall(-12,40,-146.2,-146);
  for(let x=-10;x<40;x+=rand(3,5))addMesh(new THREE.DodecahedronGeometry(rand(0.9,1.6)),rockM,x,0.3,-148).rotation.set(rand(0,3),rand(0,3),0);
  bell(-3,-117.5);const N5=nutItem(38,0.6,-144);
  box(4.5,5.6,0,6,-126.5,-110,barkD);box(4.5,5.6,0,6,-144,-129.2,barkD);W.covers.push({minx:4.4,maxx:5.7,miny:-1,maxy:6.2,minz:-126.7,maxz:-109.8},{minx:4.4,maxx:5.7,miny:-1,maxy:6.2,minz:-144.2,maxz:-129});
  for(let i=0;i<4;i++){addMesh(new THREE.CylinderGeometry(1.1,1.4,1.8,10),M(0xd8b860),20+i*2.6,0.9,-116);addMesh(new THREE.ConeGeometry(1.2,1,10),M(0xc8a850),20+i*2.6,2.3,-116);W.cyls.push({x:20+i*2.6,z:-116,r:1.3,miny:-1,maxy:2.8,on:true});}
  const bait2=baitRing(6.9,0,-127.9);
  const forge=makeForge(33,-121.5,0,{ry:Math.PI});forgeZone(33,1.2,-121.5,1.5);
  const keys=[hotItem('kluch',32.3,1.2,-121.3,{name:'kluch'}),hotItem('kluch',33.7,1.2,-121.3,{name:'kluch'})];
  signMark(29,0,-127,'kleshi',{r:9});
  W.onPick=(h,it)=>{it.lastBy=h.player;};
  const lk4=lockMesh(25.5,0,-133,'kleshi');const KH=[0,1].map(pi=>{const p=new V3(25.5+(pi?0.35:-0.35),1.55,-132.8);const s=hotSocket(p.x,p.y,p.z,{r:1.4,keep:true,accept:it=>it.kind==='kluch'&&it.heat>0.2&&it.lastBy===pi&&!lk4.open,
      onPut:(it)=>{SFX.latch();floatText(p.clone().add(new V3(0,0.8,0)),'Скважина '+(pi+1)+' — ключ!','#ffb070');it.respawn=false;if(KH.every(k=>k.item))later(0.6,()=>{openLock(lk4);chainScene();});}});
    addMesh(new THREE.TorusGeometry(0.1,0.03,6,12),MB(PCOL[pi]),p.x,p.y,p.z+0.2,lk4.g.parent);return s;});
  const flockA=flock5({path:[[24,-138],[16,-133],[9.8,-128]],r:3.3,speed:1.1,on:()=>F.stage==='escape'}),flockB=flock5({path:[[1,-127.8],[-6.5,-124.5]],r:3.3,speed:1.1,on:()=>F.stage==='escape'});
  const likho2=likho({x:11,y:0,z:-129,face:-1.2,R:19,on:()=>['cross2','forge','escape','chest'].includes(F.stage)||/^boss/.test(F.stage),onCatch:(h)=>{
      if(F.stage==='escape'){escapeReset();return;}if(/^boss/.test(F.stage)){bossCatch(h);return;}likhoCatch(h,new V3(rand(-1.5,1.5),0,-117));}});
  likho2.g.visible=false;let forgeFoes=null;
  /* ---------- арена у корней: пенёк для зеркальца, три кольца-приманки, бревно; знаки для колыбельной и щекотки ---------- */
  const AR={x:-3.5,z:-132.6,r:8.8},LOGZ=-131.5,LIKHO_SIT=new V3(-3.5,0,-136.4);
  const SPOTS=[new V3(-3.5,0,-136.4),new V3(-8.2,0,-131.8),new V3(1.2,0,-132.2)];
  addMesh(new THREE.CylinderGeometry(0.42,0.5,0.7,9),barkM,0.6,0.35,-126.4);W.cyls.push({x:0.6,z:-126.4,r:0.45,miny:-1,maxy:0.7,on:true});
  const STUMP=new V3(0.6,1.0,-126.4);
  const bRings=[];   // кольца появляются в бою (baitRing сразу работает — поэтому создаются там)
  const LOG=new THREE.Group();LOG.position.set(-3.5,0.1,LOGZ);W.group.add(LOG);{const lg=addMesh(new THREE.CylinderGeometry(0.24,0.28,5.6,10),M(0x7a5634),0,0,0,LOG);lg.rotation.z=Math.PI/2;
    for(const s of[-1,1]){const c=addMesh(new THREE.CircleGeometry(0.26,10),M(0xc8a070),s*2.81,0,0,LOG);c.rotation.y=s*Math.PI/2;}for(let i=0;i<3;i++){const k=addMesh(new THREE.ConeGeometry(0.08,0.35,4),M(0x5a4030),-1.5+i*1.4,0.24,0.05,LOG);k.rotation.z=0.6;}}
  const lullSign=signMark(-0.2,0,-134.3,'gusli',{r:2.6,noArea:true,on:()=>F.stage==='boss3'});
  const tickSign3=signMark(-6.7,0,-134.6,'pero',{r:2.4,keep:4,noArea:true,on:()=>F.stage==='boss3'});
  const PAW3=new V3(-6.6,0,-135.8);
  const coils=[];   // три витка цепи на лапе: щекотка — виток соскальзывает
  const bossBeam=beamMesh(0xfff2b0,0.09);
  const bb=$('bossbar');W.onLeave=()=>{bb.style.display='none';};
  const B={ph:0,refl:0,reflT:0,count:0,lastT:0,lastBy:null,sleep:0.8,claw:0,clawT:0,peekT:9,warn:0,peek:0,peekHit:new Set(),wakeT:0,faceOn:false};F.B=B;
  /* ---------- пятая цепь: от сука над сундуком — к лапе Лиха (или лежит на поляне, пока Лиха нет) ---------- */
  W.updates.push(dt=>{if(!chainOn){chain5.im.visible=false;return;}let end=CHAIN_REST;
    if(chainEnd)end=chainEnd;else if(likho2.g.visible){likho2.m.arms[0].paw.getWorldPosition(pawW);end=pawW;}
    chain5.set([end,PULLEY,BOUGH],1.4+0.25*Math.sin(G.time*0.9));});
  /* ---------- ролики части 1 ---------- */
  function intro(){F.stage='introCine';HEROES.forEach((h,i)=>{placeOnGround(h,-3.5+i*2.2,88,0);h.face=Math.PI;});
    const H=gor.heads;
    play({dur:21,fov:48,camK:2.4,shots:[shot(0,[14,6,102],[7,4,92]),shot(4.2,[-2,3,95],[8,5.6,93]),shot(12.2,[4,3.4,88],[1,1.2,81]),shot(17,[0,5,92],[1,1,80])],
      says:[[0.3,3.6,null,'<i>Горыныч высаживает нас на Буяне. Средняя голова трижды напоминает, как положено.</i>',true],[4.4,2.4,'gorL','Лиху в глаз не смотрите — ни-ни.'],[6.9,2.2,'gorR','Не смотрите, говорю вам!'],
        [9.2,3.2,'gorM','И главное: Лиху в глаз не смотрите. Кто посмотрел — того Лихо и сцапает.'],[12.6,3.6,null,'<i>У берега — бел-горюч Алатырь-камень лежит,</i><br><i>По нему четыре знака бегут: клубок, гусли, перо, клещи — горит.</i>',true],
        [16.4,2.6,null,'<i>Горыныч на камень дышит — знаки разгораются.</i>',true],[19,2,'proshka','Буян. Ну, пошли — не боимся.']],
      events:[{t:4.4,fn:()=>{anim(0.5,k=>{H[0].jaw.rotation.x=Math.sin(k*Math.PI)*0.5;});}},{t:6.9,fn:()=>{anim(0.5,k=>{H[2].jaw.rotation.x=Math.sin(k*Math.PI)*0.5;});}},{t:9.2,fn:()=>{anim(3,k=>{H[1].jaw.rotation.x=Math.abs(Math.sin(k*Math.PI*5))*0.4;});}},
        {t:16.4,fn:()=>{const from=new V3(7,5.4,90.4);for(let i=0;i<14;i++)later(i*0.07,()=>{const p=from.clone().lerp(new V3(1,1.6,81.6),i/14);burst(p,0xff8a30,4,2);});SFX.whoosh();
          later(1,()=>{alatyr.runes.forEach((r,i)=>later(i*0.25,()=>{r.traverse(o=>{if(o.isMesh)o.material.emissiveIntensity=1.2;});burst(r.getWorldPosition(new V3()),SIGN_COL[['clew','gusli','pero','kleshi'][i]],10,2);SFX.flower();}));});}}],
      tick:(t)=>{H[1].g.position.y=H[1].base.y+Math.sin(t*1.5)*0.1;},
      end:()=>{W.anims.length=0;alatyr.runes.forEach(r=>r.traverse(o=>{if(o.isMesh)o.material.emissiveIntensity=1.0;}));F.stage='bay';HEROES.forEach((h,i)=>{placeOnGround(h,-3.5+i*2.2,87,0);h.face=Math.PI;});snapCams();
        banner('Вещь по знаку','#ffd76a',3,'своих вещей нет: кнопка '+K(0,'item')+' / '+K(1,'item')+' берёт ту, чей знак на земле нарисован рядом');}});}
  function kiteIntro(){F.stage='kiteCine';F.kiteStarted=true;HEROES.forEach((h,i)=>{placeOnGround(h,4+(i%2)*1.8,74-Math.floor(i/2)*1.6,0);faceTo(h,18,67);});kite.g.visible=true;KT.st='circle';KT.t=0;
    play({dur:9.4,fov:46,camK:2.6,shots:[shot(0,[2,4.4,79],[16,4,67]),shot(4.4,[9,2.2,73],[18,1.2,67])],
      says:[[0.3,3.8,null,'<i>У берега бьётся белая Лебедь, а над ней кружит чёрный коршун.</i>',true],[4.4,2.2,'yosha','Коршун! Он её заклюёт!'],[6.9,2.2,'proshka','Не заклюёт. У меня рогатка!']],
      tick:(t,dt)=>{kiteTick(dt||0);},
      end:()=>{W.anims.length=0;F.stage='kite';KT.st='circle';KT.t=0;W.clampR={x:2,z:67,r:12.4};if(!F.kiteCam){F.kiteCam=true;W.camZones.push({x:8.6,z:67.5,r:8.4,camActive:()=>F.stage==='kite'&&!G.cine});}snapCams();
        banner('Коршун!','#ffd0a0',3.2,'нацелился — стреляй из рогатки (Прошка, '+K(0,'skill')+') или играй на гуслях у воды '+K(0,'item')+' / '+K(1,'item')+' — волна · упал на песок — бей!');}});}
  function swanScene(){F.stage='swanCine';const sw=swan.g;HEROES.forEach((h,i)=>{placeOnGround(h,6+(i%2)*1.6,68.8-Math.floor(i/2)*2.6+(i%2)*0.6,0);faceTo(h,12.6,67);});
    play({dur:34,fov:44,camK:2.4,shots:[shot(0,[7,2.6,73],[13.5,0.8,67]),shot(6,[10.2,1.5,69.6],[12.8,1.5,67]),shot(12.7,[9,2,72],[6.5,1,68]),shot(15,[10.2,1.5,69.6],[12.8,1.5,67]),shot(23,[9,2,72],[6.5,1,68]),shot(24,[10.2,1.5,69.6],[12.8,1.5,67]),shot(31.8,[7,4.5,74],[-6,18,-50])],
      says:[[0.3,3.6,null,'<i>Коршун рассыпается чёрными нитками. Лебедь выходит на берег — во лбу у неё горит звезда.</i>',true],[4.2,2.5,'lebed','Спасибо вам, мои спасители!'],[6.9,1.8,'potap','Мы — Лесной патруль.'],
        [8.9,3.8,'lebed','Знаю, зачем вы пришли. Сундук на дубе висит на пяти цепях.'],[12.9,2.1,'pelageya','Тут написано… на четырёх.'],[15.2,4.4,'lebed','Четыре — с замками. А пятую держит в лапе Лихо Одноглазое.'],
        [19.8,3.2,'lebed','Лихо не победить. Его можно только усыпить.'],[23.2,0.8,'yosha','А как?'],[24.1,3.7,'lebed','Пусть сперва на себя поглядит. В дупле у дуба — зеркальце.'],
        [28,3.8,'lebed','А дорогу к дубу сторожит Голова. Спит — да дует!'],[32,1.8,null,'<i>Лебедь улетает к дубу.</i>',true]],
      events:[{t:0.3,fn:()=>{const f=sw.position.clone();anim(3.2,k=>{sw.position.lerpVectors(f,new V3(12.8,0,67),smooth(k));sw.position.y=lerp(f.y,0.02,smooth(k));});}},
        {t:32,fn:()=>{swan.wings.forEach(w=>{w.w.rotation.z=0;});const f=sw.position.clone();anim(2.2,k=>{sw.position.set(f.x-k*14,f.y+k*k*16,f.z-k*30);swan.wings.forEach(w=>{w.w.rotation.z=w.s*Math.sin(k*40)*0.9;});});SFX.whoosh();}}],
      tick:(t)=>{sw.rotation.y=t<32?-Math.PI/2:Math.atan2(-14,-30);swan.head.rotation.x=Math.sin(t*2)*0.05;},
      end:()=>{W.anims.length=0;sw.visible=false;F.swanDone=true;F.stage='toHead';W.clampR=null;HEROES.forEach((h,i)=>{placeOnGround(h,-2+i*1.6,62,0);h.face=Math.PI;});snapCams();}});}
  function headIntro(){F.stage='headCine';HEROES.forEach((h,i)=>{placeOnGround(h,-1.6+i*1.4,49.5,0);h.face=Math.PI;});
    play({dur:13.4,fov:46,camK:2.6,shots:[shot(0,[1,4.5,53],[1,4.2,34]),shot(4.8,[4.6,2.2,44],[1,2.6,37]),shot(9.8,[1,2.4,47],[0,1,43])],
      says:[[0.3,4.2,null,'<i>Проход между скалами загородила огромная Голова в шлеме. Она спит — и дышит, как буря.</i>',true],[4.8,2.2,'golova','Хр-р-р… Фу-у-у-у…'],
        [7.2,2.8,'potap','Я — впереди, со щитом. Прячьтесь за меня.'],[10.2,2.6,'yosha','А я пролезу под усами!']],
      events:[{t:7.2,fn:()=>{T.potap.face=0;}},{t:10.2,fn:()=>{T.potap.face=Math.PI;T.yosha.face=0;}}],
      tick:(t,dt)=>{headTick(dt||0,true);},
      end:()=>{W.anims.length=0;F.stage='head';HB.ph='out';HB.t=0;HEROES.forEach((h,i)=>{placeOnGround(h,-1.6+i*1.4,51.5,0);h.face=Math.PI;});snapCams();
        banner('Голова дует','#e8f0ff',3.2,'Потап — щит '+K(0,'guard')+' навстречу ветру, друзья — за его спиной · Йоша пролезет под усы и пощекочет нос пером '+K(1,'item'));}});}
  function sneeze(){F.stage='sneeze';SFX.whoosh();SFX.crash();shakeAll(0.12,0.6);bark({g:golova.g,pos:GH.clone().add(new V3(0,6,3))},'golova','А… а… АПЧХИ-И-И!',2.2);
    anim(0.5,k=>{golova.body.rotation.x=-Math.sin(k*Math.PI)*0.18;});
    for(const h of HEROES){if(h.pos.z<36||h.pos.z>60||h.pos.x<-4||h.pos.x>6)continue;h.vel.set(rand(-1.5,1.5),7,13);h.grounded=false;h.knockT=0.6;h.lit=false;}
    for(let i=0;i<30;i++)burst(GH.clone().add(new V3(rand(-1,3),rand(1,3),4+rand(0,8))),0xffffff,3,6);
    later(1.6,headWake);}
  function headWake(){F.stage='headCine2';HEROES.forEach((h,i)=>{placeOnGround(h,-1.6+i*1.4,45.5,0);h.face=Math.PI;});golova.lids.forEach(l=>{l.rotation.x=-0.9;});
    play({dur:17.2,fov:46,camK:2.6,shots:[shot(0,[3.2,3,47],[1,4,36]),shot(4.5,[-1,2,49],[1,1.4,45]),shot(7,[3.2,3,47],[1,4,36]),shot(10.4,[-1,2,49],[1,1.4,45]),shot(12.4,[1,6,49],[5,2.4,32])],
      says:[[0.3,4,'golova','Кто тут щекочется?! Ух, как чихнулось-то славно!'],[4.5,2.1,'proshka','Пропусти нас к дубу, Голова!'],[7,3.2,'golova','Ступайте, малые. Да Лиху в глаз не смотрите!'],
        [10.4,2.1,'proshka','Да знаем мы, знаем!'],[12.6,4,null,'<i>Голова откатывается в сторону — проход свободен.</i>',true]],
      events:[{t:0.3,fn:()=>{anim(3,k=>{golova.brows.forEach((b,i)=>{b.position.y=4.25+Math.sin(k*Math.PI*4)*0.08;});golova.mouth.scale.y=0.3+Math.abs(Math.sin(k*Math.PI*6))*0.4;});}},
        {t:7,fn:()=>{anim(3,k=>{golova.mouth.scale.y=0.3+Math.abs(Math.sin(k*Math.PI*6))*0.4;});}},
        {t:12.6,fn:()=>{rollHead(false);}}],
      end:()=>{W.anims.length=0;rollHead(true);F.headDone=true;F.stage='toLagoon';HEROES.forEach((h,i)=>{placeOnGround(h,-1.6+i*1.4,40,0);h.face=Math.PI;});snapCams();}});}
  function rollHead(done){const HE=new V3(7.4,0,31);
    if(done){windFx.forEach(w=>{w.m.visible=false;});golova.g.position.copy(HE);golova.g.rotation.set(0,-Math.PI/2+0.3,0);golova.body.rotation.set(0,0,0);headCol[0].on=false;headBoxes.forEach(b=>{b.on=false;});if(!F.headCol2){F.headCol2=true;W.cyls.push({x:HE.x,z:HE.z,r:3.0,miny:-1,maxy:9,on:true});}return;}
    SFX.thud();const f=golova.g.position.clone();anim(2.6,k=>{const q=smooth(k);golova.g.position.lerpVectors(f,HE,q);golova.body.rotation.x=-q*Math.PI*1.6;golova.g.rotation.y=-q*(Math.PI/2-0.3);if(k>=1)golova.body.rotation.x=0;});
    later(2.6,()=>{SFX.crash();shakeAll(0.05,0.3);});}
  function lagoonIntro(){F.stage='lagoonCine';HEROES.forEach((h,i)=>{placeOnGround(h,-1+i*1.6,22.6,0);h.face=Math.PI;});
    play({dur:11.6,fov:46,camK:2.6,shots:[shot(0,[3,3.4,27],[3,0.5,9]),shot(4.8,[-2.4,2.6,5.8],[-6,1.6,0.4]),shot(8.4,[6.4,2.6,22],[3,1.3,17.6])],
      says:[[0.3,4.4,null,'<i>За проходом — залив. На том берегу под елью стоит хрустальный дом, а в нём темно.</i>',true],[4.8,3,'belka','<i>(издалека)</i> Ой, темно-то как! Кто свет погасил?'],
        [8.2,3,'pelageya','Тут написано… хрусталик передаёт свет дальше.']],
      end:()=>{W.anims.length=0;F.stage='lagoon';snapCams();
        banner('Хрустальный залив','#e8f8ff',3.4,'один светит пером у хрусталика — по лучу идёт дорожка · на островке поверни хрусталик ударом · с того берега посвети в ответ');}});}
  function belkaScene(){F.stage='belkaCine';HEROES.forEach((h,i)=>{placeOnGround(h,-4.2+i*1.4,2.3-(i%2)*0.7,0);});HEROES.forEach(h=>faceTo(h,-6,0.4));
    play({dur:19.4,fov:44,camK:2.6,shots:[shot(0,[-2.2,2.6,5.4],[-6,1.2,0.4]),shot(6,[-4.2,1.3,3.2],[-6,1.1,0.6]),shot(12.8,[-1,2.2,6.2],[-3.4,1,2])],
      says:[[0.3,3.4,null,'<i>Хрустальный дом засиял. Из него выглядывает белка с золотым орешком.</i>',true],[3.9,3.6,'belka','Светло! Спасибо! Держите орешки — скорлупки золотые!'],
        [7.7,5,'belka','Лихо-то одноглазое никогда не спит. Считать не умеет — вот и овечек не сосчитает.'],[12.9,1.8,'yosha','Так мы ему поможем!'],
        [15,4.1,'pelageya','Тут написано… за заливом — луг, а за лугом — дуб.']],
      events:[{t:0.3,fn:()=>{belka.g.visible=true;const f=new V3(-6,0.25,0.4);anim(1,k=>{belka.g.position.set(f.x+k*0.4,0.25+Math.sin(k*Math.PI)*0.6,f.z+k*1.4);});}},
        {t:4.2,fn:()=>{NB.forEach((it,i)=>{it.locked=false;it.g.visible=true;const to=HEROES[i*2+1];const f=it.pos.clone();anim(1.1,k=>{if(it.taken)return;it.base=lerp(f.y,to.pos.y+1.2,k)+Math.sin(k*Math.PI)*1.2;it.pos.x=lerp(f.x,to.pos.x,k);it.pos.z=lerp(f.z,to.pos.z,k);if(k>=1)takeItem(it,to);});});}}],
      tick:(t)=>{belka.g.rotation.y=Math.sin(t*1.3)*0.4;belka.tail.rotation.x=Math.sin(t*5)*0.15;},
      end:()=>{W.anims.length=0;NB.forEach(it=>{if(!it.taken){it.locked=false;takeItem(it,T.yosha);}});F.lagoonDone=true;F.stage='meadow';HEROES.forEach((h,i)=>{placeOnGround(h,-2.5+i*1.6,1,0);h.face=Math.PI;});snapCams();
        later(1,()=>sayP('…пугала-стражи. Распутаем, как всегда, не впервой.',2.8));}});}
  function hollowScene(){F.hollow=true;const pe=T.pelageya,pr=T.proshka;placeOnGround(pe,-6.8,-13,0);placeOnGround(pr,-6.6,-15.2,0);placeOnGround(T.potap,-4.6,-12,0);placeOnGround(T.yosha,-5,-15.8,0);
    faceTo(pe,-8.4,-12.8);faceTo(pr,-8.6,-14.2);faceTo(T.potap,-8.6,-14);faceTo(T.yosha,-8.6,-14);
    play({dur:31.4,fov:44,camK:3,shots:[shot(0,[-4,2.2,-11.5],[-8.8,0.4,-14]),shot(5,[-6.2,1.2,-11.6],[-8.4,0.1,-12.8]),shot(11.4,[-5.2,1.4,-16.4],[-7.6,0.7,-14.6]),shot(17,[-6.4,1.3,-12.2],[-8.3,0.6,-13.5]),shot(25.2,[-5,1.5,-16.6],[-7.4,0.8,-14.4])],
      says:[[0.3,4,null,'<i>В дупле у корней — мешок со старыми игрушками:</i><br><i>Молоточек деревянный, свистулька да наковаленка с орех, как с полушками.</i>',true],
        [4.6,3,null,'<i>Рядом — тетрадка детская, почерк кривой.</i>',true],[7.6,3,'pelageya','«Сказка про Кощея, что победил».'],[10.6,2.2,'pelageya','Дальше… пусто. Вся страница пуста.'],
        [13.2,3.6,'proshka','Он что, тоже… мастерил, как я?'],
        [17.2,4,null,'<i>На дне мешка — круглое зеркальце. Мальчишка Кощей когда-то спрашивал его: «Я ли на свете всех сильней?»</i>',true],
        [21.4,3.6,'zerk','Ты силён, Кощеюшка, спору нет. Да только ты — один.'],[25.4,2.4,'yosha','Оно разговаривает!'],[28.2,2.8,'proshka','Берём. Пусть Лихо на себя посмотрит.']],
      events:[{t:0.3,fn:()=>{anim(1.2,k=>{toys.ham.rotation.z=-k*0.3;toys.ham.position.y=0.05+k*0.15;});}},{t:13.2,fn:()=>{anim(1.2,k=>{toys.ham.position.set(lerp(-0.4,0.9,k),lerp(0.2,0.9,k),lerp(0.1,-0.4,k));});}},
        {t:15.5,fn:()=>{if(!L1.taken)takeItem(L1,pr);}},
        {t:17.2,fn:()=>{const f=MR.g.position.clone();anim(1.4,k=>{MR.g.position.set(f.x+k*0.35,f.y+smooth(k)*0.9,f.z+k*0.2);MR.face.rotation.x=-Math.PI/2*(1-smooth(k));MR.g.rotation.y=Math.PI/2*smooth(k);});}},
        {t:21.4,fn:()=>{anim(3.4,k=>{MR.glow.material.opacity=0.35*Math.sin(k*Math.PI);});}},
        {t:28.2,fn:()=>{const f=MR.g.position.clone();anim(0.8,k=>{MR.g.position.lerpVectors(f,pe.pos.clone().add(new V3(0,1.2,0)),k);MR.g.scale.setScalar(1-k*0.8);});}}],
      end:()=>{W.anims.length=0;if(!L1.taken)takeItem(L1,pr);MR.state='taken';MR.g.visible=false;toys.ham.position.set(-0.4,0.05,0.1);F.stage=F.meadowClear?'clew':'meadow';snapCams();later(0.6,()=>sayP('…ярус клубка. Знак — у корней.',2.4));}});}
  function likhoArrives(L,at,line){L.g.visible=true;L.R0=L.Rgeo;const to=at.clone(),from=to.clone().add(new V3(18,14,-6));L.pos.copy(from);SFX.whoosh();anim(1.2,k=>{L.pos.lerpVectors(from,to,smooth(k));L.pos.y+=Math.sin(k*Math.PI)*6;if(k>=1){SFX.crash();shake(0,0.25,0.4);shake(1,0.25,0.4);burst(to.clone().add(new V3(0,0.5,0)),0x8a7a5a,20,5);}});
    later(1.3,()=>{bark(L,'likho','Ух! Ух-ху!',1.8);banner('Лихо Одноглазое','#e8d0a0',3.4,line);});}
  /* ---------- ролики части 3: пятая цепь, ловушка, шкуры, побег ---------- */
  function chainScene(){F.stage='chainCine';const L=likho2;L.mode='hold';L.noCatch=true;L.reach=null;
    play({dur:12.6,fov:46,camK:2.4,shots:[shot(0,[11,19,-106],[1,23.4,-95.4]),shot(5.2,[14,9,-112],[4,14,-108]),shot(8.6,[20,3,-124],[L.pos.x,3,L.pos.z])],
      says:[[0.3,4.6,null,'<i>Четыре золотые цепи упали. Сундук качается… и не падает: он висит на пятой, чёрной цепи.</i>',true],[5.2,3.2,'pelageya','Тут написано… пятая цепь. Как Лебедь говорила.'],
        [8.6,2.4,'likho','Моё! Не отдам!']],
      events:[{t:0.3,fn:()=>{anim(4,k=>{chest.g.rotation.x=Math.sin(k*Math.PI*3)*0.25*(1-k);});}},{t:8.6,fn:()=>{const a=L.m.arms[0].a;anim(1.2,k=>{a.rotation.x=-Math.sin(k*Math.PI)*1.2;});SFX.knock();}}],
      tick:(t)=>{const Y=T.yosha;L.yaw=Math.atan2(Y.pos.x-L.pos.x,Y.pos.z-L.pos.z);L.g.rotation.y=L.yaw;},
      end:()=>{W.anims.length=0;chest.g.rotation.x=0;skinsScene();}});}
  // после четвёртого замка Лихо ищет, кто открыл замки: ходит по поляне и озирается, в лапе — пятая цепь. Прятаться — в отаре, под овечьими шкурами
  const LOOKOUT=new V3(11,0,-140.5);
  function skinsScene(){F.stage='skinsCine';const L=likho2;L.mode='hold';L.noCatch=true;L.reach=null;const from=L.pos.clone();
    HEROES.forEach((h,i)=>{placeOnGround(h,23.4+(i%2)*1.6,-137.6+Math.floor(i/2)*1.4,0);faceTo(h,L.pos.x,L.pos.z);});
    play({dur:15.6,fov:46,camK:2.6,shots:[shot(0,[22,4.2,-121],[11,4.6,-131]),shot(3.5,[28.2,2.2,-132.2],[24.2,1,-137]),shot(5.2,[28,3,-130],[24,1,-137]),shot(12.2,[20,4,-128],[21,1,-137.6])],
      says:[[0.3,3,'likho','Ух-ху! Кто замки трогал?! Найду!'],[3.5,1.6,'yosha','Оно нас ищет!'],[5.2,1.9,'proshka','Так. Конструкция простая.'],[7.2,4.8,'proshka','Овца — такое же укрытие, как печка и яблонька. Только ходячее.'],
        [12.2,3.2,null,'<i>Мы накрываемся шкурами — и идём, как овцы: медленно.</i>',true]],
      events:[{t:0.3,fn:()=>{SFX.red();const a=L.m.arms[1].a;anim(1.4,k=>{a.rotation.x=-Math.sin(k*Math.PI)*1.6;});}},
        {t:1.6,fn:()=>{SFX.whoosh();anim(2.2,k=>{L.pos.lerpVectors(from,LOOKOUT,smooth(k));L.pos.y=Math.abs(Math.sin(k*Math.PI*2))*1.4;if(k>=1){L.pos.y=0;SFX.crash();shakeAll(0.05,0.3);}});}},
        {t:5.2,fn:()=>{HEROES.forEach(h=>{h.face=-Math.PI/2;});}},{t:12.2,fn:()=>{HEROES.forEach((h,i)=>later(i*0.3,()=>skinOn(h)));SFX.whoosh();}}],
      tick:(t)=>{if(t<1.6)L.yaw=Math.atan2(22-from.x,-121-from.z);else if(t<3.8)L.yaw=Math.atan2(LOOKOUT.x-from.x,LOOKOUT.z-from.z);else L.yaw=Math.PI*0.5+Math.sin((t-3.8)*0.8)*1.2;L.g.rotation.y=L.yaw;},
      end:()=>{W.anims.length=0;L.pos.copy(LOOKOUT);L.g.scale.setScalar(L.s);L.ride=null;L.perch=null;L.noCatch=false;L.mode='sweep';L.turn=0.5;L.sweepDir=1;L.sweepPitch=-0.22;L.countEvery=8;L.countDur=4.6;L.countT=0;L.cd=2;
        HEROES.forEach(h=>skinOn(h));F.stage='escape';F.esc0=true;for(const pi of[0,1])other(pi).following=true;if(G.solo)for(const h of HEROES)if(h!==active(G.soloPi))h.following=true;snapCams();
        banner('Побег в овечьих шкурах','#ffffff',2.6,'Шагом в стаде — к корням дуба');}});}
  function escapeReset(){SFX.miss();banner('Лихо заметило!','#ffd0d0',1.8,'ещё раз — от первого стада, сначала');$('flash').style.opacity=0.6;later(0.3,()=>{$('flash').style.opacity=0;});
    flockA.k=0;flockA.pos.set(24,0,-138);flockB.k=0;flockB.pos.set(1,0,-127.8);HEROES.forEach((h,i)=>{placeOnGround(h,23.2+(i%2)*1.6,-138.6+Math.floor(i/2)*1.4,0);h.vel.set(0,0,0);h.face=-Math.PI/2;});for(const pi of[0,1]){other(pi).following=true;players[pi].cp.set(24,0,-138);}if(G.solo)for(const h of HEROES)if(h!==active(G.soloPi))h.following=true;likho2.cd=2;likho2.countT=0;}
  /* ---------- бой с Лихом: зеркальце → счёт овечек → колыбельная и щекотка ---------- */
  function setBar(){if(!B.ph||B.ph>3){bb.style.display='none';return;}bb.style.display='block';const seg=(k,n,col)=>'<span class="seg" style="width:120px;display:inline-block"><i style="width:'+Math.round(clamp(k/n,0,1)*100)+'%'+(col?';background:'+col:'')+'"></i></span>';
    const t=B.ph===1?'зеркальце '+B.refl+' / 3 '+seg(B.refl,3):B.ph===2?'овечки '+B.count+' / 8 '+seg(B.count,8):'сон '+seg(B.sleep,1,'#9ab8ff')+' · витки цепи '+B.claw+' / 3';
    bb.innerHTML='<b>Лихо Одноглазое</b> · фаза '+B.ph+' / 3 · '+t;}
  function arenaOn(){W.clampR={x:AR.x,z:AR.z,r:AR.r};if(!F.arenaCam){F.arenaCam=true;W.camZones.push({x:AR.x,z:AR.z-0.8,r:9.2,camActive:()=>/^boss[123]$/.test(F.stage)&&!G.cine});}}
  function bossIntro(){F.stage='bossCine';F.bossStarted=true;const L=likho2;HEROES.forEach(h=>skinOff(h));L.countEvery=0;L.counting=false;L.reach=null;L.noCatch=true;L.mode='hold';L.sweepPitch=undefined;
    flockB.pos.set(-10.4,0,-120.4);flockB.k=flockB.path.length-1;flockA.k=flockA.path.length-1;
    HEROES.forEach((h,i)=>{placeOnGround(h,-8.6+i*1.5,-122.4-(i%2)*0.6,0);faceTo(h,-3.5,-136);});const from=L.perch?L.perch.clone():L.pos.clone(),to=LIKHO_SIT.clone();L.perch=null;L.ride=null;
    play({dur:24.4,fov:46,camK:2.4,shots:[shot(0,[2,4.4,-117],[-3,2,-132]),shot(6.6,[-3.5,3,-126.4],[-3.5,4.4,-136.4]),shot(11.4,[3,12,-117],[1,23,-96]),shot(15,[-4,2,-119.6],[-6,1.1,-123]),shot(21.5,[-3.5,3,-126.4],[-3.5,4.4,-136.4])],
      says:[[0.3,1.9,'likho','Ух-у-у-у!'],[2.3,4.2,null,'<i>Лихо в два прыжка догоняет героев и садится у корней дуба. Чёрная цепь — у него в лапе.</i>',true],[6.6,3.2,'likho','Ух-ху! Сундук — мой! Я — сторож!'],
        [11.4,3.4,null,'<i>Высоко над ним на пятой цепи качается сундук.</i>',true],[15,3.6,'pelageya','Тут написано… Лихо не бьют. Лихо усыпляют.'],[18.7,2.6,'proshka','Зеркальце! Пусть на себя посмотрит!'],
        [21.5,2.8,'potap','Только в глаз ему не смотрим. Спиной!']],
      events:[{t:0.4,fn:()=>{SFX.whoosh();anim(1.3,k=>{L.pos.lerpVectors(from,to,smooth(k));L.pos.y+=Math.sin(k*Math.PI)*6;L.g.scale.setScalar(lerp(L.g.scale.x,L.s,k));if(k>=1){SFX.crash();shakeAll(0.06,0.4);burst(to.clone().add(new V3(0,0.4,0)),0x8a7a5a,22,5);}});}},
        {t:21.5,fn:()=>{MR.state='stump';MR.rest.copy(STUMP);MR.g.visible=true;MR.g.scale.setScalar(1);burst(STUMP.clone(),0xfff4c0,12,2);}}],
      tick:(t)=>{L.yaw=0;L.g.rotation.y=0;},
      end:()=>{W.anims.length=0;L.pos.copy(to);L.g.scale.setScalar(L.s);MR.state='stump';MR.rest.copy(STUMP);MR.g.visible=true;MR.g.scale.setScalar(1);
        HEROES.forEach((h,i)=>{placeOnGround(h,-8.6+i*1.5,-124.6-(i%2)*0.4,0);faceTo(h,-3.5,-136);});
        if(!bRings.length){bRings.push(baitRing(-3.5,0,-125.4),baitRing(-11,0,-134.6),baitRing(3.4,0,-136.8));}
        F.stage='boss1';B.ph=1;B.refl=0;arenaOn();L.mode='watch';L.noCatch=false;L.idleLook=new V3(-3.5,0,-125);L.R0=16;L.turn=(Math.PI/2)/3;L.cd=2.5;snapCams();setBar();
        banner('Лихо Одноглазое · фаза 1','#e8d0a0',3.4,'Возьми зеркальце, встань спиной к Лиху');}});}
  function bossCatch(h){if(MR.holder===h){MR.holder=null;MR.state='stump';MR.rest.set(h.pos.x,h.pos.y+0.9,h.pos.z);floatText(h.pos.clone().add(new V3(0,2,0)),'Зеркальце упало','#e8f4ff');}
    likhoCatch(h,new V3(-3.5+rand(-2,2),0,-125));}
  const lookDot=(h,L)=>{const e=likhoEye(L),dx=e.x-h.pos.x,dz=e.z-h.pos.z,d=Math.hypot(dx,dz)||1;return (Math.sin(h.face)*dx+Math.cos(h.face)*dz)/d;};
  const isBack=(h,L)=>lookDot(h,L)<-0.35,eyeToEye=(h,L)=>lookDot(h,L)>0.5;   // спиной — зеркальце смотрит на Лихо; лицом — «посмотрел Лиху в глаз»
  const soloFollower=h=>G.solo&&h.following&&h!==active(G.soloPi);   // в одиночку Лихо не замечает помощников, которые идут за тобой (оставленный в кольце — приманка, его видно)
  likho1.ignore=soloFollower;likho1.noReach=soloFollower;
  likho2.ignore=h=>(F.stage==='boss1'&&MR.holder===h)||soloFollower(h);
  likho2.noReach=h=>(F.stage==='boss1'&&MR.holder===h&&!eyeToEye(h,likho2))||soloFollower(h);
  likho2.walk=(L,dt)=>{if(!L.goal)return;const d=hd(L.pos,L.goal);if(d<0.08){L.goal=null;L.m.legs.forEach(l=>{l.rotation.x=0;});if(B.refl===2&&F.stage==='boss1'){L.mode='sweep';L.turn=0.7;L.sweepDir=1;L.sweepT=0;}return;}
    const st=Math.min(d,1.8*dt);L.pos.x+=(L.goal.x-L.pos.x)/d*st;L.pos.z+=(L.goal.z-L.pos.z)/d*st;L.m.legs.forEach((l,k)=>{l.rotation.x=Math.sin(G.time*7+k*Math.PI)*0.4;});};
  function reflectTick(dt){const L=likho2,h=MR.holder;let ok=false;B.faceOn=false;
    if(h&&!(L.daze>0)&&!L.goal){const e=likhoEye(L),mp=MR.face.getWorldPosition(tv5),v=tv6.subVectors(mp,e),d=v.length();
      if(d<L.R&&d>1){const dir=likhoDir(L),ang=Math.acos(clamp(v.dot(dir)/d,-1,1));const inCone=ang<LIKHO_HALF*1.35;const back=isBack(h,L);
        if(inCone&&back&&!coverBlocks(e,mp,W.covers))ok=true;if(inCone&&!back)B.faceOn=true;}}
    W.mir51={holder:MR.holder&&MR.holder.kind,ok,faceOn:B.faceOn};
    B.reflT=ok?B.reflT+dt:Math.max(0,B.reflT-dt*2);
    if(ok){bossBeam.set(likhoEye(L),MR.face.getWorldPosition(tv5));bossBeam.material.opacity=0.35+0.5*Math.min(1,B.reflT/0.3)+0.1*Math.sin(G.time*40);}else bossBeam.visible=false;
    if(B.reflT>0.3)reflect();}
  function reflect(){B.refl++;B.reflT=0;const L=likho2;L.daze=4.4;L.reach=null;L.seeT=[0,0];L.cd=1.2;bossBeam.visible=false;SFX.horn();tone(1400,0.5,'sine',0.14,700);shakeAll(0.04,0.3);
    const e=likhoEye(L);burst(e,0xfff2b0,24,5);ringFx(MR.face.getWorldPosition(new V3()),0xfff2b0,2.2);floatText(e.clone().add(new V3(0,1.2,0)),'Лихо увидело само себя!','#fff2b0');
    bark(L,'likho',['Ух?! Это кто такой страшный?!','Опять он! Одноглазый!','У-у-у… глаз устал…'][B.refl-1],2.6);setBar();G.stats.likhoMirror=(G.stats.likhoMirror||0)+1;
    if(B.refl>=3)later(2.8,yawnScene);}
  function yawnScene(){F.stage='boss12';const L=likho2;L.daze=0;L.goal=null;L.mode='hold';L.noCatch=true;L.reach=null;MR.holder=null;MR.state='taken';MR.g.visible=false;bossBeam.visible=false;
    HEROES.forEach((h,i)=>{placeOnGround(h,-6.8+i*2.2,-128.8,0);faceTo(h,-3.5,-136);});const from=L.pos.clone();
    play({dur:15,fov:46,camK:2.6,shots:[shot(0,[-3.5,3.2,-125],[-3.5,3.6,-136.4]),shot(8.6,[1.4,2.4,-127],[-3.5,0.4,-131.5]),shot(11.4,[-7.4,2.2,-125.4],[-4,1,-129])],
      says:[[0.3,3.6,null,'<i>Лихо трёт глаз и тяжело садится у бревна.</i>',true],[4,4.5,'likho','Уа-а-ах… Спать хочу… а уснуть не могу!'],[8.6,2.6,'proshka','Овечек посчитай — сразу уснёшь!'],
        [11.4,1.9,'yosha','Чур, я — овечка!'],[13.4,1.6,null,'<i>Все снова накрываются шкурами.</i>',true]],
      events:[{t:0.3,fn:()=>{anim(1.6,k=>{L.pos.lerpVectors(from,LIKHO_SIT,smooth(k));L.yaw=lerp(L.yaw,0,k);L.g.rotation.y=L.yaw;});}},{t:2,fn:()=>{anim(1,k=>{sitPose(k);});}},
        {t:4,fn:()=>{anim(2.6,k=>{mouthK(Math.sin(k*Math.PI)*2.2);});}},{t:13.4,fn:()=>{HEROES.forEach(h=>skinOn(h));SFX.whoosh();}}],
      end:()=>{W.anims.length=0;L.pos.copy(LIKHO_SIT);L.yaw=0;sitPose(1);mouthK(0);HEROES.forEach(h=>{skinOn(h);h.logSide=undefined;});
        HEROES.forEach((h,i)=>{placeOnGround(h,-6.8+i*2.2,-128.8,0);faceTo(h,-3.5,-136);});
        F.stage='boss2';B.ph=2;B.count=0;B.lastT=G.time;B.lastBy=null;snapCams();setBar();
        banner('Фаза 2 · считаем овечек','#ffffff',3.4,'Прыгайте через бревно по очереди, 8 раз');}});}
  function mouthK(k){const mo=likho2.m.mouth;if(!mo.userData.s0)mo.userData.s0=mo.scale.clone();const s0=mo.userData.s0;mo.scale.set(s0.x*(1+k*0.35),s0.y*(1+k),s0.z);}
  function sitPose(k){const m=likho2.m;m.body.position.y=-0.75*k;m.legs.forEach(l=>{l.rotation.x=-1.2*k;l.position.y=0.65+0.25*k;l.position.z=0.35*k;});}
  const COUNT=['Одна овечка…','Две овечки…','Три…','Четыре…','Пять…','Шесть…','Семь…','Во-о-семь…'];
  function countTick(dt){const L=likho2;for(const h of HEROES){if(!h.grounded)h.airT=G.time;}
    for(const pi of[0,1]){if(G.solo&&pi!==G.soloPi)continue;const h=active(pi);if(players[pi].downed)continue;const side=h.pos.z>LOGZ?1:-1;
      if(h.logSide===undefined){h.logSide=side;continue;}if(side===h.logSide)continue;h.logSide=side;if(h.pos.x<-6.5||h.pos.x>-0.5)continue;
      const air=!h.grounded||G.time-(h.airT||-9)<0.8;   // прыгнул у бревна и перешагнул — тоже овечкаif(!air){floatText(h.pos.clone().add(new V3(0,1.4,0)),'Овечки прыгают!','#ffffff');continue;}
      const gap=G.time-B.lastT;if(gap<0.5&&B.lastBy===h)continue;
      if(gap<0.6&&B.lastBy&&B.lastBy!==h&&B.count>0){B.count=Math.max(0,B.count-2);B.lastT=G.time;B.lastBy=h;SFX.miss();bark(L,'likho','Ух? Две разом? Сбилось!',2);setBar();
        if(!F.twoTold){F.twoTold=true;for(const q of[0,1])tip(q,'Прыгайте по очереди: сначала один, потом другой',3.4);}continue;}
      B.count++;B.lastT=G.time;B.lastBy=h;SFX.plate();say('likho',COUNT[B.count-1],1.6);floatText(likhoEye(L).clone().add(new V3(0,1.3,0)),String(B.count),'#fff2b0');burst(h.pos.clone().add(new V3(0,0.8,0)),0xffffff,8,2);setBar();
      if(B.count>=8){F.stage='boss2done';later(1.4,sleepScene);return;}}
    if(B.count>0&&G.time-B.lastT>(G.solo?9:7)){B.count--;B.lastT=G.time;B.lastBy=null;bark(L,'likho','Ух? Где овечки?',1.8);setBar();}}
  function sleepScene(){F.stage='boss23';const L=likho2;L.mode='hold';L.noCatch=true;HEROES.forEach(h=>skinOff(h));
    HEROES.forEach((h,i)=>{placeOnGround(h,-7.4+i*2.4,-127.6,0);faceTo(h,-3.5,-136);});
    play({dur:13.6,fov:46,camK:2.6,shots:[shot(0,[-3.5,2.6,-127.4],[-3.5,2.8,-136.4]),shot(5.6,[-9.6,2.4,-130.6],[-7.2,0.8,-135.6]),shot(10.8,[-6.4,2.2,-125.6],[-4,1,-129.4])],
      says:[[0.3,3,'likho','…хр-р-р… хр-р-р…'],[3.4,3.4,null,'<i>Лихо уснуло. Но цепь трижды обмотана вокруг лапы, и лапа сжата крепко-крепко.</i>',true],[7,3.7,'pelageya','Тут написано… во сне лапа от щекотки разжимается.'],
        [10.8,2.4,'yosha','А я спою колыбельную на гуслях!']],
      events:[{t:0.3,fn:()=>{anim(2.2,k=>{sleepPose(k);});}}],
      end:()=>{W.anims.length=0;sleepPose(1);addCoils();likho2.g.updateMatrixWorld(true);likho2.m.arms[0].paw.getWorldPosition(tv5);PAW3.set(tv5.x,0,tv5.z);
        tickSign3.x=PAW3.x+0.4;tickSign3.z=PAW3.z+1.2;tickSign3.g.position.set(tickSign3.x,0.03,tickSign3.z);F.stage='boss3';B.ph=3;B.sleep=0.8;B.claw=0;B.clawT=0;B.peekT=10;B.warn=0;B.peek=0;snapCams();setBar();
        banner('Фаза 3 · не разбуди!','#c8d8ff',3.4,'Играйте гуслями у головы, щекочите лапу пером');}});}
  function sleepPose(k){const m=likho2.m;m.lid.rotation.x=lerp(-1.25,1.1,k);m.head.rotation.x=0.45*k;m.head.rotation.z=0;const a=m.arms[0].a;a.rotation.z=lerp(-0.28,-0.55,k);a.rotation.x=lerp(0,-0.25,k);}
  function addCoils(){if(coils.length)return;const paw=likho2.m.arms[0].paw;for(let i=0;i<3;i++){const c=new THREE.Mesh(new THREE.TorusGeometry(0.5,0.09,6,16),M(0x3e3a46,{emissive:0x14121c,emissiveIntensity:0.3}));c.position.y=0.1-i*0.16;c.rotation.x=Math.PI/2;c.userData.noBatch=true;paw.add(c);coils.push(c);}}
  function sleepTick(dt){const L=likho2,m=L.m;
    if(F.stage==='bossWake'){B.wakeT-=dt;if(B.wakeT<=0){F.stage='boss3';B.sleep=0.6;B.peekT=9;bark(L,'likho','…ладно… сплю…',2);anim(1.2,k=>{sleepPose(k);});setBar();}return;}
    // храп и дыхание
    const br=Math.sin(G.time*1.6);m.body.scale.set(1+br*0.02,1+br*0.03,1);if(!(B.peek>0)&&!(B.warn>0)){mouthK(Math.max(0,br)*1.2);if(Math.random()<dt*0.5)floatText(likhoEye(L).clone().add(new V3(0.6,0.8,0)),'Хр-р…','#c8d8ff');}
    B.sleep=Math.max(0,B.sleep-0.035*dt);
    // щекотка: горящее перо у лапы — виток за витком
    const tick=!(B.peek>0)&&HEROES.some(h=>heroLight(h)&&hd(h.pos,PAW3)<2.1);
    if(tick){B.clawT+=dt/4;B.sleep=Math.max(0,B.sleep-0.06*dt);const a=m.arms[0].a;a.rotation.y=Math.sin(G.time*18)*0.08;if(Math.random()<dt*0.8)floatText(PAW3.clone().add(new V3(0,1.6,0)),'Хи-хи… щекотно…','#ffe0f0');
      if(B.clawT>=1){B.clawT=0;B.claw++;const c=coils[B.claw-1];if(c){const f=c.position.y;anim(0.6,k=>{c.position.y=f-k*1.2;c.scale.setScalar(1+k*0.4);if(k>=1)c.visible=false;});}SFX.latch();burst(PAW3.clone().add(new V3(0,1,0)),0xfff2b0,12,3);
        floatText(PAW3.clone().add(new V3(0,1.8,0)),B.claw<3?'Виток соскользнул! Лапа разжимается':'Лапа разжалась!','#ffd76a');B.sleep=Math.max(0,B.sleep-0.1);setBar();
        if(B.claw>=3){F.stage='bossEnd';later(0.8,finale);return;}}}
    else m.arms[0].a.rotation.y=0;
    // приоткрывает глаз: сначала храп стихает (1,2 с), потом 2,6 с смотрит — кто шевелится, тот будит
    if(!(B.warn>0)&&!(B.peek>0)){B.peekT-=dt;if(B.peekT<=0){B.warn=1.2;floatText(likhoEye(L).clone().add(new V3(0,1.2,0)),'…хр… хр…?','#ffd0d0');tone(220,0.3,'sine',0.12,180);
      if(!F.peekTold){F.peekTold=true;for(const q of[0,1])tip(q,'Храп стих — Лихо приоткроет глаз. Замри!',3.4);}}}
    if(B.warn>0){B.warn-=dt;if(B.warn<=0){B.warn=0;B.peek=2.6;B.peekHit.clear();L.yaw=rand(-0.5,0.5);SFX.red();}}
    if(B.peek>0){B.peek-=dt;m.lid.rotation.x=0.25;m.head.rotation.x=0.1;L.yaw+=Math.sin(G.time*1.4)*0.35*dt;L.g.rotation.y=L.yaw;L.pitch=-0.3;L.R=11;
      const e=likhoEye(L);L.cone.visible=true;L.cone.position.copy(e);L.cone.scale.setScalar(L.R/L.Rgeo*1.3);L.cone.lookAt(e.clone().add(likhoDir(L)));L.cone.material.opacity=0.2;L.cone.material.color.setHex(0xffc0a0);
      for(const pi of[0,1]){if(G.solo&&pi!==G.soloPi)continue;const h=active(pi);if(B.peekHit.has(h))continue;const mv=Math.hypot(h.vel.x,h.vel.z)>0.9||h.rollT>0||!h.grounded;
        if(!mv)continue;const c=h.pos.clone().add(new V3(0,0.6,0)),v=c.clone().sub(e),d=v.length();if(d>L.R)continue;if(v.dot(likhoDir(L))/d<Math.cos(LIKHO_HALF*1.3))continue;
        B.peekHit.add(h);B.sleep=Math.max(0,B.sleep-0.3);floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Шевельнулся!','#ff9a8a');SFX.red();bark(L,'likho','Ух…? Кто тут ходит?',1.8);setBar();}
      if(B.peek<=0){B.peek=0;B.peekT=rand(8.5,11);m.lid.rotation.x=1.1;m.head.rotation.x=0.45;L.cone.visible=false;}}
    if(B.sleep<=0){wake();return;}
    if(Math.random()<dt*4)setBar();}
  function wake(){F.stage='bossWake';B.wakeT=3.2;B.peek=0;B.warn=0;const L=likho2,m=L.m;m.lid.rotation.x=-1.25;m.head.rotation.x=0;SFX.crash();shakeAll(0.08,0.5);bark(L,'likho','УХ! Кто меня будит?!',2.2);
    for(const h of HEROES){if(hd(h.pos,L.pos)>9)continue;const dx=h.pos.x-L.pos.x,dz=h.pos.z-L.pos.z,d=Math.hypot(dx,dz)||1;h.vel.set(dx/d*6,5,dz/d*6);h.grounded=false;h.knockT=0.5;h.lit=false;}
    if(B.claw>0){const c=coils[B.claw-1];if(c){c.visible=true;c.position.y=0.1-(B.claw-1)*0.16;c.scale.setScalar(1);}B.claw--;}B.clawT=0;B.sleep=0;setBar();
    for(const q of[0,1])tip(q,'Проснулось! Играй колыбельную, потом замри',3.4);}
  function lullaby5(pi){const h=active(pi),p=players[pi];if((p.gusCd||0)>0)return;p.gusCd=1.3;gusliFx(h,'high');lullaby([67,64,67,64,62,64,60],0.16,0,0.12);
    floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Баю-баюшки-баю…','#c8d8ff');if(F.stage!=='boss3')return;B.sleep=Math.min(1,B.sleep+0.2);setBar();
    for(let i=0;i<5;i++)later(i*0.2,()=>floatText(likhoEye(likho2).clone().add(new V3(rand(-0.8,0.8),0.6+i*0.2,0)),'♪','#c8d8ff'));}
  // победа: лапа разжалась — цепь уходит вверх, сундук падает с дуба закрытым; крышку поднимают вдвоём — и только тогда выскакивает заяц
  const CHEST_REST=new V3(-2,0,-127.6);
  function finale(){F.stage='end';const L=likho2;B.ph=4;setBar();L.cone.visible=false;
    const pw=L.m.arms[0].paw.getWorldPosition(new V3());HEROES.forEach((h,i)=>{placeOnGround(h,-8.4+i*1.6,-124.2-(i%2)*0.6,0);faceTo(h,-2,-128);});
    play({dur:15.2,fov:48,camK:2.4,shots:[shot(0,[PAW3.x-0.6,2.4,PAW3.z+4.6],[PAW3.x,1.2,PAW3.z]),shot(3.6,[13,21,-105],[1,23,-95.5],[9,9,-111],[0,3,-113],3.4),shot(7.2,[2,2.8,-121.6],[-2,0.5,-127.6]),
        shot(8.8,[-3.5,2.6,-127.4],[-3.5,2.2,-136.4]),shot(11,[-5.6,1.8,-120.8],[-2.6,0.8,-125.6])],
      says:[[0.3,3.2,null,'<i>Последний виток соскальзывает, лапа разжимается — и цепь уходит вверх.</i>',true],[3.6,3.6,null,'<i>Сундук срывается с дуба, катится по корню — и падает на поляну.</i>',true],
        [8.8,2.2,'likho','Хр-р… моё… хр-р…'],[11,3.9,'pelageya','Тут написано… крышку поднимают вдвоём. Тихо-тихо.']],
      events:[{t:0.5,fn:()=>{SFX.whoosh();chainEnd=pw.clone();const f=pw.clone();anim(2.2,k=>{if(k<0.6)chainEnd.lerpVectors(f,PULLEY,(k/0.6)*(k/0.6));else chainEnd.lerpVectors(PULLEY,BOUGH,(k-0.6)/0.4);if(k>=1){chainOn=false;}});coils.forEach(c=>{c.visible=false;});}},
        {t:3.6,fn:()=>{hang5.visible=false;const c=chest.g.position,f=c.clone(),a=new V3(1,9.6,-97.5),b=new V3(0,9.4,-100.5),r=new V3(0,0.4,-116.5),to=CHEST_REST;
          anim(3.6,k=>{if(k<0.28){const q=k/0.28;c.lerpVectors(f,a,q*q);}else if(k<0.4){const q=(k-0.28)/0.12;c.lerpVectors(a,b,q);c.y+=Math.sin(q*Math.PI)*1.4;}else if(k<0.75){const q=(k-0.4)/0.35;c.lerpVectors(b,r,q);}else{const q=(k-0.75)/0.25;c.lerpVectors(r,to,q);c.y+=Math.sin(q*Math.PI)*0.6;}chest.g.rotation.x+=0.07;});
          later(1.0,()=>{SFX.crash();shakeAll(0.08,0.4);burst(a.clone(),0xc8a060,16,4);});later(3.6,()=>{chestDown();SFX.crash();shakeAll(0.1,0.4);burst(CHEST_REST.clone().add(new V3(0,0.6,0)),0xc8a060,20,5);});}}],
      tick:(t)=>{const m=L.m;m.body.scale.set(1,1+Math.sin(t*1.6)*0.03,1);mouthK(Math.max(0,Math.sin(t*1.6))*1.2);},
      end:()=>{W.anims.length=0;chainOn=false;chestDown();F.stage='chest';F.lift=[-9,-9];snapCams();
        banner('Сундук!','#ffd76a',3.4,G.solo?'Подними крышку '+K(G.soloPi,'attack')+' — тихо!':'Оба жмите '+K(0,'attack')+' и '+K(1,'attack')+' у сундука');}});}
  function chestDown(){if(F.chestDown)return;F.chestDown=true;chest.g.position.copy(CHEST_REST);chest.g.rotation.set(0,0.3,0);W.cyls.push({x:CHEST_REST.x,z:CHEST_REST.z,r:0.95,miny:-1,maxy:1.3,on:true});}
  // «Раз-два — взяли!»: удар у сундука — рука на крышке; у другого игрока — тоже в пределах 1,5 с, и крышка поднимается (в одиночном — сразу)
  function liftTry(h){if(F.stage!=='chest')return;const pi=h.player,now=G.time;if(now-F.lift[pi]<0.4)return;F.lift[pi]=now;
    anim(0.35,k=>{chest.lid.rotation.x=-Math.sin(k*Math.PI)*0.22;});SFX.knock();
    if(G.solo||now-F.lift[1-pi]<1.5){hareScene();return;}
    floatText(CHEST_REST.clone().add(new V3(0,1.9,0)),'Тяжёлая! Вдвоём — разом','#ffe6a0');tip(1-pi,'Встань у сундука, жми '+K(1-pi,'attack')+' вместе',3.4);}
  W.hittables.push({pos:CHEST_REST.clone().add(new V3(0,0.6,0)),r:1.3,push:false,alive:()=>F.stage==='chest'&&!G.cine,onHit:h=>liftTry(h)});
  function hareScene(){F.stage='hareCine';HEROES.forEach((h,i)=>{placeOnGround(h,-5.2+i*1.3,-124.9-(i%2)*0.5,0);faceTo(h,CHEST_REST.x,CHEST_REST.z);});
    play({dur:17.6,fov:48,camK:2.4,shots:[shot(0,[0.4,1.7,-123.6],[-2,0.7,-127.6]),shot(1.8,[2,2.1,-122.2],[-0.8,0.95,-126.6]),shot(4.8,[-5.6,1.8,-120.8],[-2.6,0.8,-125.6]),
        shot(9.4,[-3.5,2.6,-127.4],[-3.5,2.2,-136.4]),shot(13,[-7.4,2,-121],[-5,1,-124.4]),shot(15,[-4,3,-118.6],[4,1,-127])],
      says:[[0.3,1.9,'potap','<i>(шёпотом)</i> Раз-два — взяли!'],[2,2.6,null,'<i>Крышка поднимается — а из сундука выскакивает заяц!</i>',true],[4.8,2.4,'yosha','Заяц! А в нём — утка, что ль?'],[7.2,1.8,'pelageya','…да, да.'],
        [9.4,3.6,'pelageya','Тут написано… не буди лихо, пока оно тихо.'],[13,2.6,'potap','<i>(шёпотом)</i> На цыпочках — за зайцем!']],
      events:[{t:1.1,fn:()=>{anim(0.6,k=>{chest.lid.rotation.x=-k*1.8;});SFX.flower();const hr=makeHare();hr.g.position.set(CHEST_REST.x,0.6,CHEST_REST.z);hr.g.rotation.y=0.6;F.hare=hr;const p0=hr.g.position.clone(),p1=new V3(-0.6,0,-126.4);
          burst(p0.clone().add(new V3(0,1,0)),0xffffff,14,4);burst(p0.clone().add(new V3(0,1.2,0)),COL.gold,12,3);anim(0.8,k=>{hr.g.position.lerpVectors(p0,p1,k);hr.g.position.y+=Math.sin(k*Math.PI)*1.4;});}},
        {t:2.1,fn:()=>{const hr=F.hare;if(!hr)return;anim(3.6,k=>{hr.ears.forEach((e,i)=>{e.rotation.x=Math.sin(k*30+i)*0.25;});hr.g.rotation.y=0.6+Math.sin(k*Math.PI*2)*0.5;});}},
        {t:2.5,fn:()=>{giveLink(CHEST_REST.clone().add(new V3(0,1.5,0)),T.proshka,1.6,1.2);}},
        {t:15,fn:()=>{const hr=F.hare;if(!hr)return;const p0=hr.g.position.clone();SFX.whoosh();anim(2.8,k=>{hr.g.position.set(p0.x+k*21,Math.abs(Math.sin(k*Math.PI*6))*1.3,p0.z-k*1.4);hr.g.rotation.y=Math.atan2(21,-1.4);hr.ears.forEach(e=>{e.rotation.x=Math.sin(k*40)*0.3;});});}}],
      tick:(t)=>{const m=likho2.m;m.body.scale.set(1,1+Math.sin(t*1.6)*0.03,1);mouthK(Math.max(0,Math.sin(t*1.6))*1.2);},
      end:()=>{W.anims.length=0;flushGifts();F.out=true;chest.lid.rotation.x=-1.8;banner('Сундук открыт — заяц удрал!','#ffd76a',2.6,'Загляни к Векше — там шкура-плащ');later(1.8,finishLevel);}});}
  likho2.ctrl=(L,dt)=>{const m=L.m;
    if(F.stage==='boss1'){if(L.daze>0){L.daze-=dt;m.lid.rotation.x=1.1;m.arms[1].a.rotation.x=-2.2+Math.sin(G.time*9)*0.25;m.head.rotation.z=Math.sin(G.time*5)*0.2;L.cone.visible=false;L.fang.visible=false;
        if(L.daze<=0){m.lid.rotation.x=-1.25;m.arms[1].a.rotation.x=0;m.head.rotation.z=0;if(B.refl<3){L.goal=SPOTS[B.refl].clone();floatText(likhoEye(L).clone().add(new V3(0,1,0)),'Ух… где он?','#e8d0a0');}}return true;}
      if(L.mode==='sweep'){L.sweepT=(L.sweepT||0)+dt;if(L.sweepT>6){L.sweepT=0;L.sweepDir=-(L.sweepDir||1);}}
      return false;}
    if(F.stage==='boss2'||F.stage==='boss2done'){L.yaw=0;L.pitch=-0.72;L.g.rotation.y=0;m.head.rotation.x=0.3;const e=likhoEye(L);L.cone.visible=true;L.cone.position.copy(e);L.cone.scale.setScalar(9/L.Rgeo);L.cone.lookAt(e.clone().add(likhoDir(L)));L.cone.material.opacity=0.12;L.cone.material.color.setHex(0xffe6a8);
      m.lid.rotation.x=lerp(-1.25,0.2,B.count/8)+Math.sin(G.time*2)*0.05;return true;}
    if(F.stage==='boss3'||F.stage==='bossWake'){sleepTick(dt);return true;}
    if(F.stage==='chest'){const br=Math.sin(G.time*1.6);m.body.scale.set(1+br*0.02,1+br*0.03,1);mouthK(Math.max(0,br)*1.2);if(Math.random()<dt*0.5)floatText(likhoEye(L).clone().add(new V3(0.6,0.8,0)),'Хр-р…','#c8d8ff');return true;}
    if(F.stage==='boss23'||F.stage==='boss12'||F.stage==='bossEnd'||F.stage==='end')return true;
    return false;};
  /* ---------- шаги частей: коршун, ветер Головы, хрусталики, зеркальце ---------- */
  function kiteTick(dt){KT.t+=dt;KT.hitCd=Math.max(0,KT.hitCd-dt);KT.wave=Math.max(0,KT.wave-dt);KT.waveCd=Math.max(0,KT.waveCd-dt);const sw=swan.g.position;const k0=kite;
    const flap=(sp,a)=>{k0.wings.forEach(w=>{w.w.rotation.z=w.s*Math.sin(G.time*sp)*a;});};
    switch(KT.st){
      case 'circle':{KT.ang+=dt*0.9;KT.pos.set(14+Math.cos(KT.ang)*5.5,5.6+Math.sin(KT.t*2)*0.4,67+Math.sin(KT.ang)*5.5);k0.g.rotation.set(0,Math.atan2(-Math.sin(KT.ang),Math.cos(KT.ang)),-0.3);flap(5,0.35);
        if(KT.t>4.2&&F.stage==='kite'){KT.st='aim';KT.t=0;KT.from.copy(KT.pos);SFX.red();floatText(sw.clone().add(new V3(0,2,0)),'Коршун целится!','#ff9a8a');}break;}
      case 'aim':{KT.pos.lerpVectors(KT.from,tv5.set(sw.x-0.5,4.8,sw.z),smooth(Math.min(1,KT.t/0.8)));k0.g.rotation.set(0.5,Math.PI/2,0);flap(14,0.5);if(KT.t>1.9){KT.st='dive';KT.t=0;KT.from.copy(KT.pos);}break;}
      case 'dive':{const k=Math.min(1,KT.t/0.55);KT.pos.lerpVectors(KT.from,tv5.set(sw.x,0.5,sw.z),k*k);k0.g.rotation.set(1.1,Math.PI/2,0);flap(3,0.1);
        if(k>=1){if(KT.wave>0){SFX.splash();kiteDown('wave');}else{SFX.knock();burst(sw.clone().add(new V3(0,0.8,0)),0xffffff,14,4);floatText(sw.clone().add(new V3(0,1.8,0)),'Лебедь вскрикнула!','#ffd0d0');
            anim(0.5,q=>{swan.body.rotation.z=Math.sin(q*Math.PI)*0.4;});KT.st='rise';KT.t=0;KT.from.copy(KT.pos);if(!F.kiteMissTold){F.kiteMissTold=true;for(const q of[0,1])tip(q,'Коршун целится — рогатка Прошки или гусли!',3.2);}}}break;}
      case 'rise':{const k=Math.min(1,KT.t/1.2);KT.pos.lerpVectors(KT.from,tv5.set(14+Math.cos(KT.ang)*5.5,5.6,67+Math.sin(KT.ang)*5.5),smooth(k));k0.g.rotation.set(-0.3,-Math.PI/2,0);flap(10,0.5);if(k>=1){KT.st='circle';KT.t=0;}break;}
      case 'fall':{const k=Math.min(1,KT.t/0.9);KT.pos.lerpVectors(KT.from,KT.to,k);KT.pos.y+=Math.sin(k*Math.PI)*1.5;k0.g.rotation.set(KT.t*6,Math.PI/2,KT.t*4);
        if(k>=1){KT.st='ground';KT.t=0;KT.gHits=0;SFX.thud();shakeAll(0.03,0.2);k0.g.rotation.set(0,Math.PI/2,1.2);banner('Коршун на песке!','#ffe0a0',1.6,'бейте '+K(0,'attack')+' / '+K(1,'attack')+' — распутаем');}break;}
      case 'ground':{k0.g.rotation.set(0,Math.PI/2,1.2+Math.sin(G.time*12)*0.08);flap(12,0.12);if(KT.t>5.5){KT.st='rise';KT.t=0;KT.from.copy(KT.pos);floatText(KT.pos.clone().add(new V3(0,1.4,0)),'Взлетел!','#ffd0d0');}break;}}
    kite.g.position.copy(KT.pos);kMark.visible=F.stage==='kite'&&(KT.st==='aim'||KT.st==='dive');if(kMark.visible){kMark.position.copy(KT.pos).add(tv5.set(0,-0.2,0));kMark.lookAt(camS.position);kMark.scale.setScalar(1.3+0.2*Math.sin(G.time*10));}
    // волна: кольцо воды поднимается вокруг Лебеди, Лебедь ныряет
    waveM.visible=KT.wave>0;if(waveM.visible){const w=KT.wave/1.6;waveM.position.set(sw.x,-0.7+Math.sin(w*Math.PI)*1.2,sw.z);waveM.scale.setScalar(1+0.3*(1-w));}
    if(F.stage==='kite'||F.stage==='kiteCine')sw.y=damp(sw.y,KT.wave>0?-1.15:SW0.y,6,dt);}
  function kiteDown(why){if(KT.st!=='aim'&&KT.st!=='dive')return;KT.st='fall';KT.t=0;KT.from.copy(KT.pos);KT.to.set(10.2,0.35,67+rand(-3,3));SFX.knock();burst(KT.pos.clone(),0x3a2a24,14,4);
    floatText(KT.pos.clone().add(new V3(0,1,0)),why==='shot'?'Попал! Коршун падает':'Волна! Мокрые крылья','#ffe0a0');kMark.visible=false;}
  function kiteDone(){KT.st='off';SFX.unravel();const c=KT.pos.clone().add(new V3(0,0.6,0));burst(c,0x3a2a24,24,6);burst(c,0x6a3a8a,14,5);burst(c,COL.gold,10,4);for(let i=0;i<6;i++)spawnSpark(c,[COL.gold,0x6ad0ff,0xff6a8a][i%3]);
    kite.g.visible=false;F.kiteDone=true;banner('Коршун распутан!','#ffd76a',2,'Лебедь спасена');later(1.4,swanScene);}
  W.marks.push({pos:KT.pos,active:()=>F.stage==='kite'&&(KT.st==='aim'||KT.st==='dive'),onHit:()=>{kiteDown('shot');}});
  W.hittables.push({pos:KT.pos,r:1.7,push:false,alive:()=>F.stage==='kite'&&KT.st==='ground',onHit:h=>{if(KT.hitCd>0)return;KT.hitCd=0.35;KT.emb--;KT.gHits++;SFX.ember();burst(KT.pos.clone().add(new V3(0,0.6,0)),0x6a3a8a,10,3);
    floatText(KT.pos.clone().add(new V3(0,1.4,0)),KT.emb>0?'Распутываем! Ещё '+KT.emb:'Распутан!','#ffb060');if(KT.emb<=0)kiteDone();else if(KT.gHits>=2)later(0.3,()=>{if(KT.st!=='ground')return;KT.st='rise';KT.t=0;KT.from.copy(KT.pos);floatText(KT.pos.clone().add(new V3(0,1.4,0)),'Вырвался! Ещё раз','#ffd0d0');});}});
  function waveFn(pi){const h=active(pi),p=players[pi];if(KT.waveCd>0){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Волна ещё не вернулась','#9fe6ff');return;}KT.waveCd=1.6;gusliFx(h,'high');
    if(KT.st==='aim'||KT.st==='dive'){KT.wave=1.6;SFX.wave();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Волна!','#9fe6ff');}
    else{KT.wave=0.8;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Рано! Жди, когда коршун нацелится','#9fe6ff');}}
  function headTick(dt,cine){HB.t+=dt;const dur=HB.ph==='out'?3.4:1.8;if(HB.t>dur){HB.t=0;HB.ph=HB.ph==='out'?'in':'out';if(HB.ph==='out'&&!cine&&Math.random()<0.35)floatText(GH.clone().add(new V3(0,3,5)),'Фу-у-у!','#e8f0ff');}
    const out=HB.ph==='out',k=out?Math.min(1,HB.t/0.35,(dur-HB.t)/0.3):0;golova.cheeks.forEach(c=>{c.scale.setScalar(1+(out?0.12*k:0.04*Math.sin(HB.t/dur*Math.PI)));});
    golova.mouth.scale.y=0.3+(out?0.35*k:0);golova.must.forEach(q=>{q.m.position.y=q.y+(out?Math.sin(G.time*18+q.t*6)*0.06*k:0);});
    for(const w of windFx){w.m.visible=out&&k>0.15&&!cine||out&&cine;if(!w.m.visible)continue;w.z+=w.sp*dt;if(w.z>57){w.z=39;w.x=rand(-3,5);w.y=rand(0.4,3.2);}w.m.position.set(w.x,w.y,w.z);w.m.material.opacity=0.55*k;}
    if(cine||F.stage!=='head')return;
    // ветер: только в выдох, только управляемых; за щитом Потапа (щит навстречу ветру) не дует; сам Потап — чуть-чуть
    for(const h of HEROES)h.windT=Math.max(0,(h.windT||0)-dt);
    if(out)for(const h of HEROES){if(!h.active||h.cling||h.knockT>0)continue;if(!(h.pos.x>-3.4&&h.pos.x<5.4&&h.pos.z>36&&h.pos.z<58&&h.pos.y<4))continue;if(h.pos.x>0.2&&h.pos.x<1.8&&h.pos.z<38.95)continue;   // под усами ветра нет; по бокам от бороды — дует
      let w=clamp(1-(h.pos.z-38.9)/19,0,1)*0.45+0.55;const po=T.potap,shieldOn=po.active&&po.guard&&Math.cos(po.face)<-0.6;
      if(h===po&&shieldOn)w*=0.1;else if(shieldOn&&h!==po&&h.pos.z>po.pos.z-0.3&&h.pos.z<po.pos.z+4.5&&Math.abs(h.pos.x-po.pos.x)<1.5)w=0;
      if(w<=0){h.shelterT=0.3;continue;}const push=13*w*k*dt;const r=collideXZ(h.pos.x,h.pos.z+push,h.d.radius,h.pos.y,h.pos.y+heroHeight(h));h.pos.x=r.x;h.pos.z=r.z;h.windT=0.3;}
    // щекотка: Йоша с горящим пером под усами
    const tk=HEROES.some(h=>heroLight(h)&&hd(h.pos,tickSign)<0.9);if(tk){HB.tick+=dt;if(Math.random()<dt*2)floatText(GH.clone().add(new V3(rand(-0.4,0.4),2.8,4.2)),['Хм…','М-м…','А…'][Math.floor(rand(0,3))],'#ffe0c0');golova.nose.scale.set(0.9+Math.sin(G.time*20)*0.04,1.1,1.1);}
    else HB.tick=Math.max(0,HB.tick-dt*0.5);if(HB.tick>1.6){HB.tick=0;sneeze();}}
  function crystalTick(dt){CR.rotCd=Math.max(0,CR.rotCd-dt);CR.aLit=lightNear(crA);CR.cLit=lightNear(crC);CR.pow=CR.aLit||CR.cLit;
    const on=[segAB(),segBC(),segBD()],bm=[bmAB,bmBC,bmBD],ends=[[crA.pos,crB.pos],[crB.pos,crC.pos],[crB.pos,tv5.set(11,1.4,11)]];
    bm.forEach((m,i)=>{if(on[i]){m.set(ends[i][0],ends[i][1]);m.material.opacity=0.5+0.15*Math.sin(G.time*8+i);}else m.visible=false;});
    const glow=(c,lit)=>{c.mat.emissiveIntensity=damp(c.mat.emissiveIntensity,lit?1.0:0.12,6,dt);c.piv.rotation.y+=dt*(lit?1.2:0.2);};glow(crA,CR.aLit||segAB());glow(crB,CR.pow);glow(crC,CR.cLit||segBC());
    const hl=CR.cLit||F.lagoonDone;house.glass.emissiveIntensity=damp(house.glass.emissiveIntensity,hl?0.9:0.1,3,dt);house.glow.material.opacity=damp(house.glow.material.opacity,hl?0.25:0,3,dt);}
  function mirrorTick(dt){if(MR.state==='hollow'){return;}if(MR.state==='taken'){MR.g.visible=false;return;}MR.g.visible=true;
    if(MR.holder){const h=MR.holder,fx=Math.sin(h.face),fz=Math.cos(h.face);MR.g.position.set(h.pos.x-fx*0.1,h.pos.y+heroHeight(h)+0.5,h.pos.z-fz*0.1);MR.g.rotation.set(0,h.face+Math.PI,0);MR.face.rotation.set(0,0,0);}
    else{MR.g.position.copy(MR.rest);MR.g.position.y+=Math.sin(G.time*2)*0.06;MR.g.rotation.set(0,G.time*0.8,0);MR.face.rotation.set(0,0,0);}
    MR.glow.material.opacity=damp(MR.glow.material.opacity,B.reflT>0?0.5:(!MR.holder&&F.stage==='boss1'?0.12:0),10,dt);}
  function pickMirror(pi){const h=active(pi);MR.holder=h;MR.state='held';SFX.latch();floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Зеркальце!','#e8f4ff');
    if(!F.mirTold){F.mirTold=true;tip(pi,'Встань спиной к Лиху, на линии взгляда',3.4);}}
  function dropMirror(pi){const h=MR.holder;MR.holder=null;MR.state='stump';MR.rest.set(h.pos.x,h.pos.y+0.9,h.pos.z);SFX.plate();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Положил зеркальце','#e8f4ff');}
  W.itemSign=pi=>{const h=active(pi);if(G.cine)return null;
    if(F.stage==='kite'&&signNear(h)===waveSign)return waveFn;
    if(F.stage==='boss1'){if(MR.holder===h)return dropMirror;if(!MR.holder&&hd(h.pos,MR.rest)<1.9)return pickMirror;if(MR.holder&&!MR.holder.active&&hd(h.pos,MR.holder.pos)<1.9)return pickMirror;}
    if(F.stage==='boss3'&&signNear(h)===lullSign)return lullaby5;
    return null;};
  /* ---------- логика: переходы между частями ---------- */
  const inWellZone=h=>h.pos.x>-10&&h.pos.x<-2&&h.pos.z<-54.3&&h.pos.z>-64&&h.pos.y>3;
  W.updates.push(dt=>{
    if(F.stage==='kite'||F.stage==='kiteCine'){if(!G.cine)kiteTick(dt);}else if(swan.g.visible&&!G.cine){swan.g.position.y=SW0.y+Math.sin(G.time*1.4)*0.04;}
    if(F.stage==='head'&&!G.cine)headTick(dt,false);
    if(F.stage==='lagoon'||F.stage==='toLagoon'||F.stage==='meadow'||F.stage==='belkaCine')crystalTick(dt);
    mirrorTick(dt);
    if(F.stage==='boss1'&&!G.cine)reflectTick(dt);else bossBeam.visible=false;
    if(F.stage==='boss2'&&!G.cine)countTick(dt);
    if(G.cine)return;
    if(F.stage==='bay'&&HEROES.some(h=>h.active&&h.pos.z<79.5))kiteIntro();
    if(F.stage==='toHead'&&HEROES.some(h=>h.active&&h.pos.z<51))headIntro();
    if(F.stage==='toLagoon'&&HEROES.some(h=>h.active&&h.pos.z<24))lagoonIntro();
    if(F.stage==='lagoon'&&[0,1].every(pi=>{const h=active(pi);return h.pos.z<3.3&&h.pos.z>-2.5&&h.pos.y>-0.5;}))belkaScene();
    if(F.stage==='meadow'||F.stage==='clew'){spawnMeadow();if(!F.meadowClear&&meadowFoes.every(e=>!e.alive)){F.meadowClear=true;SFX.ok();banner('Пугала распутаны!','#ffd76a',2,'дальше — к дубу, вперёд');if(F.stage==='meadow'&&F.hollow)F.stage='clew';}
      if(!F.hollow&&HEROES.some(h=>h.active&&(hd(h.pos,{x:-8.6,z:-14})<4.2||h.pos.z<-19)))hollowScene();
      if(F.stage==='meadow'&&F.hollow&&F.meadowClear)F.stage='clew';}
    if(!F.likho1&&HEROES.some(h=>h.active&&h.pos.y>3&&h.pos.z<-30)&&lk1.open){F.likho1=true;F.stage='cross1';likhoArrives(likho1,new V3(-1.5,4.6,-45),'Оставь героя в кольце-приманке, обойди сзади');}
    if(F.stage==='cross1'&&HEROES.some(h=>h.active&&inWellZone(h))){F.stage='well';}
    if(F.stage==='well'&&!F.likho2&&HEROES.every(h=>h.pos.z<-50||inWellZone(h))){F.likho2=true;likho1.g.visible=false;likho1.on=()=>false;}
    if(F.stage==='well'&&lk2.open)F.stage='pero';
    if(F.stage==='pero'&&lk3a.open&&lk3b.open&&!bridges){gateB.col.on=false;gateB.mesh.visible=false;gateVis.forEach(b=>{anim(0.8,k=>{b.position.y=10.8+k*6;b.rotation.z+=0.05;});later(0.8,()=>{b.visible=false;});});SFX.gate();
      bridges=[box(-7.8,-6.2,8.6,9,-86.2,-70,barkM),box(6.2,7.8,8.6,9,-86.2,-70,barkM)];banner('Ветви расплелись','#ffd76a',2.2,'верхушка дуба открыта · мостки корой обросли — своих кликните');F.stage='crown';
      later(2.6,()=>sayP('Тут написано… вон она, пятая цепь — чёрная. Уходит вниз, на поляну.',3.6));}
    if(F.stage==='crown'&&HEROES.some(h=>h.active&&h.pos.z<-110&&h.pos.y<4)){F.stage='cross2';W.camX=42;likhoArrives(likho2,new V3(11,0,-129),'Приманка в кольце — и в обход стороной');}
    if(['cross2','forge','escape'].includes(F.stage))likho2.R0=F.stage==='forge'?13:F.stage==='escape'?16:19;
    if(F.stage==='cross2'&&HEROES.some(h=>h.active&&h.pos.x>21)){F.stage='forge';forgeFoes=[pugaloFoe(28.5,-119),pugaloFoe(30,-128.5)];banner('Пугала у горна — стерегут!','#ffd76a',2,'распутайте — и за ключом, скорей');}
    if(F.stage==='forge'&&forgeFoes&&!F.forgeClear&&forgeFoes.every(e=>!e.alive)){F.forgeClear=true;later(0.5,()=>sayP('…замок раскалён. Ключ — в горне.<br>Каждому — своя скважина, вот и весь секрет.',3.4));}
    if(F.stage==='escape'){for(const h of HEROES)if(!h.skin)skinOn(h);
      if([0,1].every(pi=>{if(G.solo&&pi!==G.soloPi)return true;const h=active(pi);return h.pos.x<-4&&h.pos.z>-128.5;}))bossIntro();}});
  /* ---------- рисунки кнопок ---------- */
  const lockNear=(h,L)=>!L.open&&hd(h.pos,L)<2.4&&Math.abs(h.pos.y-L.y)<1.6;
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'attack',()=>headOf(h()),()=>!G.cine&&[lk1,lk2].some(L=>lockNear(h(),L)),'отпереть замок');
    prompt(pi,'attack',()=>headOf(h()),()=>!G.cine&&lockNear(h(),pi?lk3b:lk3a),'отпереть свой замок');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&(signNear(h())||{}).item==='clew'&&h().pos.y<1&&RG.some(r=>r.pi===pi&&hd(r,h().pos)<1.2),'клубок к колышку');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&(signNear(h())||{}).item==='gusli'&&well.state==='low'&&inWellZone(h()),'гусли: прилив');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&(signNear(h())||{}).item==='pero'&&!h().lit&&pi===0&&h().pos.z>-71&&h().pos.z<-60,'перо: свет');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&pi===1&&(signNear(h())||{}).item==='pero'&&!h().lit&&h().pos.z>-30&&h().pos.z<-2&&!!meadowFoes[0]&&meadowFoes[0].alive,'перо: свет');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&W.hots.some(it=>!it.gone&&!it.carrier&&it.heat>0.1&&hd(it.pos,h().pos)<1.8)&&!heroCarry(h()),'возьми ключ клещами');
    prompt(pi,'item',()=>headOf(h()),()=>{const it=heroCarry(h());return !G.cine&&!!it&&hd(h().pos,lk4)<2.6;},'в замок');
    prompt(pi,'jump',()=>headOf(h()),()=>!G.cine&&W.webs.some(w=>Math.hypot(w.x-h().pos.x,w.z-h().pos.z)<2.2&&Math.abs(w.y-h().pos.y)<1),'на паутинку');
    prompt(pi,'swap',()=>headOf(h()),()=>!G.cine&&(F.stage==='cross1'||F.stage==='cross2'||F.stage==='boss1')&&inBait(h())&&MR.holder!==h(),'оставь его тут');
    prompt(pi,'call',()=>headOf(h()),()=>!G.cine&&(F.stage==='cross1'||F.stage==='cross2'||F.stage==='well')&&HEROES.some(q=>!q.active&&q.player===pi&&inBait(q))&&!inBait(h())&&hd(h().pos,q0(pi))>9,'позови его');
    prompt(pi,'roll',()=>headOf(h()),()=>W.likhos.some(L=>L.reach&&L.reach.h===h()));
    // часть 1 и бой
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&F.stage==='kite'&&signNear(h())===waveSign&&KT.st==='aim','волна!');
    prompt(pi,'attack',()=>headOf(h()),()=>!G.cine&&F.stage==='kite'&&KT.st==='ground'&&hd(h().pos,KT.pos)<3.4,'бей!');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&F.stage==='head'&&signNear(h())===tickSign&&!h().lit,'пощекотать');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&F.stage==='lagoon'&&(signNear(h())||{}).item==='pero'&&!h().lit&&(hd(h().pos,crA.pos)<2.6||hd(h().pos,crC.pos)<2.6),'перо: свет');
    prompt(pi,'attack',()=>headOf(h()),()=>!G.cine&&F.stage==='lagoon'&&hd(h().pos,crB.pos)<2.2,'повернуть');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&F.stage==='boss1'&&!MR.holder&&hd(h().pos,MR.rest)<1.9,'зеркальце');
    prompt(pi,'jump',()=>headOf(h()),()=>!G.cine&&F.stage==='boss2'&&Math.abs(h().pos.z-LOGZ)<1.8&&h().pos.x>-6.4&&h().pos.x<-0.6,'прыг!');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&F.stage==='boss3'&&signNear(h())===lullSign,'колыбельная');
    prompt(pi,'item',()=>headOf(h()),()=>!G.cine&&F.stage==='boss3'&&signNear(h())===tickSign3&&!h().lit,'пощекотать лапу');
    prompt(pi,'attack',()=>headOf(h()),()=>!G.cine&&F.stage==='chest'&&hd(h().pos,CHEST_REST)<2.8,'поднять крышку');}
  const q0=pi=>{const q=HEROES.find(x=>!x.active&&x.player===pi);return q?q.pos:new V3();};
  prompt(0,'skill',()=>headOf(T.proshka),()=>!G.cine&&F.stage==='kite'&&T.proshka.active&&(KT.st==='aim'||KT.st==='dive'),'в коршуна!');
  prompt(0,'guard',()=>headOf(T.potap),()=>!G.cine&&F.stage==='head'&&T.potap.active&&T.potap.pos.z<58&&T.potap.pos.z>38.5&&!T.potap.guard,'щит');
  prompt(0,'label',()=>{const h=MR.holder||T.potap;return headOf(h).add(new V3(0,1.1,0));},()=>F.stage==='boss1'&&!!MR.holder&&B.faceOn&&!G.cine,'спиной к Лиху!');
  W.onAttack=(pi,h)=>{for(const L of[lk1,lk2])if(lockNear(h,L)){openLock(L);if(L===lk1)later(0.8,()=>sayP('…а дальше за нами кто-то глядит.',2.6));if(L===lk2)later(0.8,()=>sayP('…перо. Свет — Прошке с Потапом, тень — нам с Йошей.',3.2));}
    const mine=pi?lk3b:lk3a,theirs=pi?lk3a:lk3b;if(lockNear(h,mine))openLock(mine);else if(lockNear(h,theirs))tip(pi,'Этот замок — '+(pi?'первому':'второму')+' игроку. Твой — на другой ветке.',2.2);};
  /* ---------- задачи ---------- */
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const AFTER=(...st)=>()=>st.includes(F.stage)||F.bossStarted;
  const mk=pi=>[
    OR('Буян…',()=>F.stage!=='intro'&&F.stage!=='introCine',()=>[alatyr.g]),
    OR('Идите вдоль берега к дубу. Там кто-то кричит…',()=>!!F.kiteStarted,()=>[swan.g]),
    OR(()=>'Коршун бьёт Лебедь! Нацелился — стреляй из рогатки: Прошка, '+K(0,'skill')+'. Или на знаке гуслей у воды '+K(pi,'item')+' — волна спрячет Лебедь. Упал на песок — бей '+K(pi,'attack'),()=>!!F.kiteDone,()=>[kite.g],null,'Тут написано… коршуна — рогаткой или волной.'),
    O('Лебедь…',()=>!!F.swanDone,()=>[swan.g]),
    OR(pi?()=>'Голова дует! Йоша, держись за спиной Потапа. У самой Головы — под усы, и пощекочи нос пером '+K(1,'item'):()=>'Голова дует! Потап, держи щит '+K(0,'guard')+' навстречу ветру — друзья спрячутся за тобой. Шагай, когда Голова вдыхает',
      ()=>!!F.headDone,()=>[golova.g],null,'Тут написано… за щитом ветер не страшен.'),
    OR(()=>'Хрустальный залив. Посвети пером '+K(pi,'item')+' у хрусталика — по лучу пройдёт светлая дорожка. Хрусталик на островке поверни ударом '+K(pi,'attack')+'. С того берега посвети в ответ другу',
      ()=>!!F.lagoonDone,()=>[crA.g,crB.g,crC.g],null,'Тут написано… хрусталик передаёт свет дальше.'),
    OR(()=>'Пугала-стражи Кощея! Распутайте их: защита — щит иль отбив, погасли угольки — удар '+K(pi,'attack')+'.<br>Хамелей ближайший знак перенимает: у пера — посвети '+K(pi,'item')+', у гуслей — капли отбивай, мой друг.',()=>F.meadowClear,()=>meadowFoes.filter(e=>e.alive).map(e=>e.g),null,'…пугала-стражи. Распутаем, как всегда, не впервой.'),
    OR('В дупле у корней что-то лежит — поглядим…',()=>F.hollow,()=>[toys.g],null,'…дупло. А в нём — мешок.'),
    OR(()=>'Ярус клубка. Встань в своё кольцо, брось клубок '+K(pi,'item')+' к колышку:<br>Две струны крест-накрест — паутинка. Прыжок с неё — наверх, под самую макушку.',()=>HEROES.some(h=>h.active&&h.pos.y>3&&h.pos.z<-29.5)||lk1.open,()=>[RG[pi].g],null,'…колышки, паутинка — и медведь взлетает.'),
    OR(()=>'Замок на цепи сундука: удар '+K(pi,'attack')+' у замка.',()=>lk1.open,()=>[lk1.g],null,'…четыре цепи, на каждой — замок со своим знаком.'),
    OR(()=>'Лихо! Ближайшего разглядывает. Одного героя в кольце-приманке оставь ('+K(pi,'swap')+'),<br>Другим — в обход, у Лиха за спиной, к дуплу-колодцу. Увидело — кувырок '+K(pi,'roll')+', не бойся.',()=>F.stage!=='cross1'&&F.stage!=='clew'&&(F.likho1||F.stage!=='meadow'),()=>[bait1.g],null,'…кто у ствола оставлен — тот приманка.'),
    OR(()=>'Ярус гуслей: колодец в дупле. Гусли по знаку '+K(pi,'item')+' — прилив подымет.<br>Всех — «Ко мне!» '+K(pi,'call')+', никто не застынет.',()=>lk2.open,()=>[lk2.g],null,'…прилив подымает нас, как в колодце.'),
    OR(pi?()=>'Ярус пера. Твоя ветка справа: тенемостки без света держат — не зажигай. А замок — в конце.':()=>'Ярус пера. Зажги перо у знака '+K(0,'item')+': твоя ветка слева — светомостки, замок — в конце.',()=>lk3a.open&&lk3b.open,()=>[(pi?lk3b:lk3a).g],null,pi?'…тенемостки. Без света, во тьме.':'…светомостки. Живо, не думая.'),
    OR('Крона открыта. Вниз по корню — на поляну!',AFTER('cross2','forge','chainCine','skinsCine','escape','end','chest','hareCine'),()=>[]),
    OR(()=>'Лихо спрыгнуло на поляну — в лапе у него пятая цепь. Приманка — в кольцо, остальные — в обход, к горну у дальнего края',AFTER('forge','chainCine','skinsCine','escape','end','chest','hareCine'),()=>[bait2.g],null,'…то же правило: кто в кольце — того и разглядывает Лихо.'),
    OR(()=>'Ярус клещей: ключ в горне раскалён. Клещи по знаку '+K(pi,'item')+' —<br>Ключ возьми да в свою скважину вставь (твой цвет) — вот и весь предмет.',()=>lk4.open,()=>forgeFoes&&forgeFoes.some(e=>e.alive)?forgeFoes.filter(e=>e.alive).map(e=>e.g):[keys[pi].g,lk4.g],null,'…замок раскалён, ключ в горне лежит.'),
    OR(()=>'В шкурах — к корням дуба! В отаре Лихо не видит, идём шагом. Лихо считает овец («Раз… два… пять?..») — тут и перебегай ко второй отаре',()=>!!F.bossStarted,()=>[flockB.list[0].m.g],null,'…Лихо считать не умеет — собьётся.'),
    OR(()=>'Лихо смотрит на того, кто ближе, а на зеркальце не глядит. Один — в золотое кольцо (Лихо уставится на него). Второй — возьми зеркальце '+K(pi,'item')+' и встань между ними спиной к Лиху',
      ()=>B.refl>=3||B.ph>=2,()=>MR.holder?[likho2.g]:[MR.g],null,'Тут написано… Лихо на зеркальце не глядит. Встань у него на пути.'),
    OR(()=>'Считаем овечек! Прыгай через бревно '+K(pi,'jump')+' — Лихо считает. По очереди: двое сразу — собьётся. Нужно восемь',()=>B.ph>=3,()=>[LOG],null,'Тут написано… по одной овечке.'),
    OR(()=>'Не разбуди! Гусли у головы '+K(pi,'item')+' — колыбельная. Перо у лапы '+K(pi,'item')+' — щекочи, витки цепи соскользнут. Храп стих — замри!',()=>B.claw>=3||F.stage==='end',()=>[likho2.g],null,'Тут написано… не буди лихо, пока оно тихо.'),
    OR(()=>G.solo?'Сундук упал! Подними крышку: встань у сундука и нажми '+K(pi,'attack')+'. Тихо — Лихо спит':'Сундук упал! Крышку поднимают вдвоём: оба у сундука — и '+K(pi,'attack')+' разом. Тихо — Лихо спит',
      ()=>F.stage==='hareCine'||!!F.out,()=>[chest.g],null,'Тут написано… крышку поднимают вдвоём. Тихо-тихо.')];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>!!meadowFoes[0]&&meadowFoes[0].alive&&meadowFoes[0].mode==='pero'&&!meadowFoes[0].litNow&&hd(meadowFoes[0].pos,h.pos)<8,text:pi=>'Встань на знак пера и зажги '+K(pi,'item')+'!'});
  W.tipZones.push({cond:(pi,h)=>!!heroCarry(h),text:pi=>'Горячий ключ: жми '+K(pi,'item')+' — в замок вставишь.'});
  W.tipZones.push({cond:(pi,h)=>!!h.skin&&!h.inFlock&&F.stage==='escape',text:pi=>'Вернись к овцам — Лихо тебя видит!'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='head'&&(h.windT||0)>0&&h!==T.potap,text:(pi,h)=>pi?(h&&h.kind!=='yosha'?'Ветер сдувает! Возьми Йошу '+K(1,'swap')+' — он пролезет под усы. Держись за спиной Потапа':'Ветер сдувает! Встань за спину Потапу — он держит щит навстречу ветру'):'Ветер сдувает! Возьми Потапа '+K(0,'swap')+' и держи щит '+K(0,'guard')+' навстречу ветру'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='head'&&h===T.yosha&&hd(h.pos,tickSign)<1.2&&!h.lit,text:pi=>'Йоша под усами! Нажми '+K(pi,'item')+' — пощекочи Голову пёрышком'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='head'&&h.kind!=='yosha'&&h.pos.z<40.4&&h.pos.x>-0.5&&h.pos.x<2.5,text:pi=>'Под усы пролезет только Йоша — он самый маленький'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='lagoon'&&h.pos.z>9&&h.pos.z<13&&h.pos.x>0.5&&h.pos.x<5.5&&!CR.axisNS,text:pi=>'Хрусталик светит не туда. Ударь его '+K(pi,'attack')+' — он повернётся'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='lagoon'&&h.pos.z<3.3&&!CR.cLit&&HEROES.some(q=>q.player!==pi&&q.pos.z>16),text:pi=>'Посвети пером '+K(pi,'item')+' у хрусталика — свет дойдёт.'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='boss1'&&MR.holder===h&&B.faceOn,text:pi=>'Не смотри Лиху в глаз — отвернись!'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='boss1'&&MR.holder===h&&!B.faceOn&&!HEROES.some(q=>inBait(q)),text:pi=>'Друг — в кольцо, ты — с зеркальцем между.'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='boss3'&&B.warn>0,text:pi=>'Храп стих — Лихо сейчас приоткроет глаз. Замри!'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='boss3'&&B.sleep<0.3,text:pi=>'Лихо ворочается! Скорее колыбельную: гусли у головы '+K(pi,'item')});
  W.spawns=[[new V3(-2.4,0,87),new V3(-4.4,0,88)],[new V3(2.4,0,87),new V3(4.4,0,88)]];W.startAct=[0,0];
  W.pauseLine='Остров Буян. Своей вещи нет: RB берёт ту, чей знак нарисован на земле рядом. Лебедь спасают от коршуна рогаткой или волной, Голову — щитом Потапа и пёрышком Йоши, залив — светом хрусталиков. Четыре замка сундука — четыре вещи, пятую цепь держит Лихо. После ключей Лихо ищет воров — прячьтесь в отаре под овечьими шкурами. Лихо не бьют — Лихо усыпляют: зеркальце, счёт овечек, колыбельная. Упавший сундук открывают вдвоём. Лиху в глаз не смотреть!';
  // для ботов: перейти сразу к части уровня (всё, что раньше, — будто пройдено)
  W.warp51=(to)=>{const ORDER=['head','lagoon','meadow','glade','keys','boss1','boss2','boss3'],n=ORDER.indexOf(to);if(n<0)return 'no '+to;G.cine=null;
    kite.g.visible=false;KT.st='off';F.kiteStarted=F.kiteDone=F.swanDone=true;swan.g.visible=false;W.clampR=null;HB.ph='in';
    const put=(x,y,z)=>{HEROES.forEach((h,i)=>{placeOnGround(h,x-1.6+i*1.2,z,y);h.face=Math.PI;h.vel.set(0,0,0);});for(const pi of[0,1])players[pi].cp.set(x,y,z);snapCams();};
    if(n===0){F.stage='toHead';put(1,0,54);return 'ok';}
    rollHead(true);F.headDone=true;if(n===1){F.stage='toLagoon';put(1,0,30);return 'ok';}
    F.lagoonDone=true;NB.forEach(it=>{if(!it.taken){it.locked=false;takeItem(it,T.yosha);}});if(n===2){F.stage='meadow';spawnMeadow();put(1,0,1);return 'ok';}
    spawnMeadow();meadowFoes.forEach(e=>{e.alive=false;e.g.visible=false;});F.meadowClear=true;F.hollow=true;MR.state='taken';if(!L1.taken)takeItem(L1,T.proshka);F.likho1=F.likho2=true;likho1.on=()=>false;
    [lk1,lk2,lk3a,lk3b].forEach(L=>openLock(L,true));if(!bridges){gateB.col.on=false;gateB.mesh.visible=false;gateVis.forEach(b=>{b.visible=false;});bridges=[box(-7.8,-6.2,8.6,9,-86.2,-70,barkM),box(6.2,7.8,8.6,9,-86.2,-70,barkM)];}
    if(n===3){F.stage='crown';put(0,9,-97);return 'ok';}
    F.forgeClear=true;W.camX=42;likho2.g.visible=true;if(n===4){likho2.pos.set(11,0,-129);F.stage='forge';put(25.5,0,-130.6);openLock(lk4);chainScene();return 'ok';}
    openLock(lk4,true);likho2.pos.copy(LOOKOUT);F.stage='escape';HEROES.forEach(h=>skinOn(h));put(-6.5,0,-124.5);bossIntro();G.cine.skip();G.cine.t=G.cine.dur;G.cine.end();G.cine=null;
    if(n===5)return 'ok';
    B.refl=3;yawnScene();G.cine.skip();G.cine.t=G.cine.dur;G.cine.end();G.cine=null;if(n===6)return 'ok';
    B.count=8;sleepScene();G.cine.skip();G.cine.t=G.cine.dur;G.cine.end();G.cine=null;return 'ok';};
  W.dbg51={chest,MR,KT,golova,swan,kite,belka,CR,HB,B,flockA,flockB,CHEST_REST};   // для ботов
  W.onStart=()=>{intro();};
  flushDecor();}

