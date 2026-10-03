/* ============================== РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ»: ПОГОНЯ С ВАЛОМ — ВДВОЕ ДЛИННЕЕ (≈190 м) ============================== */
// После «Бом» в 2-5 Водяной проснулся: река встаёт валом и гонит героев к омуту (сказка «Морской царь и Василиса Премудрая»).
// Участки сверху вниз (бегут «на камеру», W.camYaw=π):
//  1 «Деревня на сваях» — домики рушатся под валом; котёнок на крыше прыгает на голову пробегающему и едет до омута (тёплый момент, без провала);
//  2 дуб поперёк тропы — Потап поднимает («Эх, дубинушка, ухнем!»);
//  3 «Мельница на ручье» — колесо крутит течение: Потап держит его (умение у ступицы) — лопасти встают ступенями; на том берегу —
//    тормозная плита: кто на ней стоит, держит колесо для Потапа. В одиночку: Потап держит, сменил героя — оставленный держит, и наоборот;
//  4 «Кувшинки в лад» — у пруда раковина: сыграл — кувшинки всплывают рядами по нотам напева Садко, напев стих — тонут от берега;
//  5 ручей — в отлив не выбраться: прилив гуслями, и вплавь;
//  6 «Развилка на двоих» — скалистый гребень делит тропу: наверху уступ с рычагом шлюза, внизу русло с заслонкой; один открывает шлюз
//    другому — вода подхватывает и несёт вперёд (рычаг можно сбить и рогаткой снизу);
//  7 скалы и гребешок Василисы — Йоша польёт, камыш встанет стеной: вал вязнет («карман»);
//  8 «Лодка Садко» — вал поднимает лодку на гребень: руль у одного (влево-вправо), вёсла-гусли у другого (RB — гребок), коряги обходить;
//  9 обрыв — лодка слетает с водопада: замедление, гребень вала загибается над головой; 10 плетень у омута — две верёвки разом.
// Вал — загнутый гребень с пеной, брызгами и обломками (late_99r); рёв и тряска растут с близостью, у самой спины — капли на «объективе».
// Резиновая лента: вал всегда рядом, но догоняет только того, кто долго стоит. Догнал — назад к последней отметке (успехи остаются).
FIN.k2chase=function(KC){const F=W.flags,T=HERO,bank=KC.bank,rock=KC.rock,FX=FIN.k2fx;const SOLO=()=>!!G.solo;
  const ctlPis=()=>SOLO()?[G.soloPi]:[0,1],ctl=()=>ctlPis().map(pi=>active(pi));
  const CH={};F.ch=CH;
  // ---------- земля и стены коридора ----------
  // земля по участкам (сверху вниз): деревня и дуб · протока мельницы · берег · пруд · берег · ручей · развилка, скалы, причал · протока лодки · омуток под обрывом · берег у плетня
  ground(-7,7,153.9,206,1,bank);ground(-7,7,150.1,153.9,-2.6,M(0x4a4434));ground(-7,7,140,150.1,1,bank);ground(-7,7,126,140,-3.2,M(0x2a4636));ground(-7,7,112,126,1,bank);
  ground(-7,7,104,112,-2.6,M(0x5a5040));ground(-7,7,64,104,1,bank);ground(-7,7,34,64,-1.4,M(0x3a5a50));ground(-7,7,24,34,-3.6,M(0x2a4a44));ground(-7,7,8,24,1,bank);
  wall(-7.4,-7,8,206);wall(7,7.4,8,206);wall(-7.4,7.4,206,206.4);wall(-16.2,-7,8,8.2);wall(7,16.2,8,8.2);
  for(let z=12;z<204;z+=rand(2.6,4.2))for(const sd of[-1,1])decorFir(sd*rand(8.6,13),z,rand(1.1,1.8),true,1);
  /* ---------- 1. ДЕРЕВНЯ НА СВАЯХ (z 200…172): домики по краям, котёнок на крыше ---------- */
  const houses=[];{const wd=M(0x8a6a44),wd2=M(0x6a4a2c),roofM=M(0x9a5a3a),win=M(0xffe0a0,{emissive:0xffb040,emissiveIntensity:0.6});
    for(const[x,z,ry]of[[-5.4,195,0.08],[5.6,189,-0.1],[-5.5,182,0.05],[5.4,176,-0.06],[-9.5,186,0.2],[9.6,180,-0.2]]){const g=new THREE.Group();g.position.set(x,1,z);g.rotation.y=ry;W.group.add(g);
      for(const[sx,sz]of[[-1,-1],[1,-1],[-1,1],[1,1]])addMesh(new THREE.CylinderGeometry(0.1,0.12,1.4,5),wd2,sx*1.0,0.7,sz*1.0,g);
      addMesh(new THREE.BoxGeometry(2.6,1.7,2.6),wd,0,2.3,0,g);addMesh(new THREE.BoxGeometry(0.5,0.5,0.06),win,0,2.4,1.31,g);
      const rf=addMesh(new THREE.ConeGeometry(2.3,1.5,4),roofM,0,3.9,0,g);rf.rotation.y=Math.PI/4;const col=Math.abs(x)<7?colBox(x-1.2,x+1.2,1,3.2,z-1.2,z+1.2,true):null;houses.push({g,x,z,col,down:false});}}
  // котёнок: прыгает на голову тому, кто пробежит мимо, и едет до омута
  const kit=(()=>{const g=new THREE.Group();W.group.add(g);const fur=M(0xe89a4a),wh=M(0xfff2e0);addMesh(new THREE.SphereGeometry(0.2,8,6),fur,0,0.18,0,g).scale.set(1,0.9,1.3);
    const hd=addMesh(new THREE.SphereGeometry(0.15,8,6),fur,0,0.36,0.2,g);for(const s of[-1,1]){addMesh(new THREE.ConeGeometry(0.06,0.12,4),fur,s*0.08,0.5,0.2,g);addMesh(new THREE.SphereGeometry(0.03,5,4),MAT.dark,s*0.06,0.4,0.33,g);}
    addMesh(new THREE.SphereGeometry(0.07,6,5),wh,0,0.3,0.32,g);const tail=addMesh(new THREE.CylinderGeometry(0.03,0.04,0.4,5),fur,0,0.3,-0.3,g);tail.rotation.x=-0.8;g.position.set(-5.2,4.75,182);return {g,on:null,hd,tail};})();
  CH.kit=kit;
  /* ---------- 2. ДУБ (z 166) ---------- */
  const OAKZ=166;const oak=new THREE.Group();oak.position.set(0,1,OAKZ);W.group.add(oak);{const om=M(0x6a4a2a),lm=M(0x4f7a3a);const tr=addMesh(new THREE.CylinderGeometry(0.85,0.95,14,10),om,0,0.9,0,oak);tr.rotation.z=Math.PI/2;
    for(let i=0;i<6;i++){const b=addMesh(new THREE.CylinderGeometry(0.12,0.2,2.2,6),om,rand(-6,6),1.6+rand(0,0.8),rand(-0.6,0.6),oak);b.rotation.set(rand(-0.8,0.8),0,rand(-0.8,0.8));}
    for(let i=0;i<6;i++)addMesh(new THREE.SphereGeometry(rand(0.7,1.1),7,6),lm,rand(-6,6),2.4+rand(0,0.6),rand(-0.8,0.8),oak);}
  const oakCol=colBox(-7,7,1,3.8,OAKZ-0.9,OAKZ+0.9,true);
  W.lifts.push({pos:new V3(0,1,OAKZ+1.7),active:()=>!F.oak,onLift:h=>{F.oak=true;oakCol.on=false;SFX.toss();shakeAll(0.05,0.4);anim(1.4,k=>{oak.position.x=-k*10;oak.rotation.z=k*0.5;oak.position.y=1-k*0.8;});
    bark(h,'potap','Эх, дубинушка, ухнем!',1.8,true);}});
  /* ---------- 3. МЕЛЬНИЦА (z 152): колесо в протоке, лопасти-ступени ---------- */
  const MZ=152,MR=3.2,MAY=-1.9,MN=16,mill={held:false,potap:false,ang:0,spin:1.2,paddles:[]};CH.mill=mill;
  const millWater=new THREE.Mesh(new THREE.PlaneGeometry(14,3.8),M(0x3a8aa0,{transparent:true,opacity:0.72,emissive:0x0a3a4a,emissiveIntensity:0.4,depthWrite:false}));millWater.rotation.x=-Math.PI/2;millWater.position.set(0,0.25,MZ);millWater.renderOrder=3;W.group.add(millWater);
  for(const sd of[-1,1]){colBox(sd>0?1.6:-7,sd>0?7:-1.6,1,4.2,MZ+1.85,MZ+2.1,false);colBox(sd>0?1.6:-7,sd>0?7:-1.6,1,4.2,MZ-2.1,MZ-1.85,false);   // перила вдоль протоки: перепрыгнуть можно только по колесу
    for(let x=sd*1.9;Math.abs(x)<7;x+=sd*0.6)for(const zz of[MZ+2,MZ-2])addMesh(new THREE.CylinderGeometry(0.07,0.08,1.6,5),M(0x7a5a34),x,1.8,zz).castShadow=false;
    for(const zz of[MZ+2,MZ-2])addMesh(new THREE.BoxGeometry(5.2,0.1,0.1),M(0x8a6a40),sd*4.3,2.4,zz);}
  const millG=new THREE.Group();millG.position.set(0,MAY,MZ);W.group.add(millG);{const wd=M(0x8a6034),wd2=M(0x5a3a1c);const ax=addMesh(new THREE.CylinderGeometry(0.35,0.35,4.4,10),wd2,0,0,0,millG);ax.rotation.z=Math.PI/2;
    for(const sx of[-1.55,1.55]){const rim=addMesh(new THREE.TorusGeometry(MR-0.2,0.12,5,28),wd2,sx,0,0,millG);rim.rotation.y=Math.PI/2;for(let i=0;i<8;i++){const sp=addMesh(new THREE.BoxGeometry(0.1,MR*2-0.4,0.14),wd2,sx,0,0,millG);sp.rotation.x=i/8*Math.PI;}}
    for(let i=0;i<MN;i++){const th=i/MN*Math.PI*2,p=new THREE.Group();p.position.set(0,Math.cos(th)*MR,-Math.sin(th)*MR);p.rotation.x=-th;millG.add(p);addMesh(new THREE.BoxGeometry(3.0,0.16,1.24),wd,0,0,0,p);
      mill.paddles.push({g:p,i,col:colBox(-1.5,1.5,0,0.2,0,1,false)});}}
  // мельничный дом на дальнем берегу
  {const g=new THREE.Group();g.position.set(-4.6,1,MZ-4.6);W.group.add(g);addMesh(new THREE.BoxGeometry(3.4,3,3),M(0xa08a64),0,1.5,0,g);const rf=addMesh(new THREE.ConeGeometry(2.8,1.6,4),M(0x7a4a2a),0,3.8,0,g);rf.rotation.y=Math.PI/4;colBox(-6.3,-2.9,1,4,MZ-6.1,MZ-3.1,true);}
  const millBlock=colBox(-1.6,1.6,1,6,MZ-1.9,MZ+1.9,false);   // крутится — не пройти и не перепрыгнуть
  const millHold={x:2.6,z:MZ+2.7};const millPlate=plate(2.6,MZ-2.9,'k2mill',1);
  W.lifts.push({pos:new V3(millHold.x,1,millHold.z),active:()=>!mill.potap,onLift:h=>{mill.potap=true;mill.ph=h;SFX.latch();shakeAll(0.03,0.3);bark(h,'potap','Держу колесо! Беги по лопастям!',2,true);}});
  /* ---------- 4. КУВШИНКИ В ЛАД (пруд z 140…126) ---------- */
  const LZ0=140,LZ1=126;
  const pond=new THREE.Mesh(new THREE.PlaneGeometry(14,LZ0-LZ1),M(0x2f6a70,{transparent:true,opacity:0.8,emissive:0x0a3036,emissiveIntensity:0.4,depthWrite:false}));pond.rotation.x=-Math.PI/2;pond.position.set(0,0.5,(LZ0+LZ1)/2);pond.renderOrder=3;W.group.add(pond);
  const lilyRef={hum:0,dur:9,off:false,ring(h){this.hum=Math.max(this.hum,this.dur);this.by=h||null;}};
  const lilyShell=kwShell('dance',-5.6,LZ0+2.2,1,lilyRef,{ry:Math.PI,r:2.2,say:'Кувшинки, в лад!'});
  const ROWS=[];{const pm=M(0x4f8a3a),pm2=M(0x3f7a30),fl=M(0xf4f0f8),flP=M(0xf4b8c8);let n=0;
    for(let z=LZ0-1.0,i=0;z>LZ1+0.6;z-=1.75,i++){const row={i,z,up:0,want:0,pads:[]};const xs=i%2?[-4.2,-0.9,2.4,5.4]:[-5.4,-2.4,0.9,4.2];
      for(const x of xs){const g=new THREE.Group();g.position.set(x,-0.6,z);W.group.add(g);const m=addMesh(new FIN.orig.Cylinder(1.2,1.2,0.1,16,1,false,0.35,Math.PI*2-0.35),n%2?pm:pm2,0,0,0,g);m.receiveShadow=true;
        if(n%3===1){addMesh(new THREE.ConeGeometry(0.2,0.3,6),fl,0.4,0.18,0.3,g);addMesh(new THREE.ConeGeometry(0.12,0.24,6),flP,0.4,0.24,0.3,g);}n++;
        const col={x,z,r:1.2,miny:-3,maxy:-0.6,on:false};W.cyls.push(col);row.pads.push({g,col});}ROWS.push(row);}}
  CH.rows=ROWS;CH.lily=lilyRef;
  /* ---------- 5. РУЧЕЙ (дно z 104…112) ---------- */
  for(let i=0;i<22;i++){const sd=Math.random()<0.5?-1:1;addMesh(new THREE.ConeGeometry(0.05,rand(0.8,1.4),3),M(0x6a8a3a),sd*rand(5.6,6.9),1.5,rand(105,111)).castShadow=false;}
  const STR=waterZone(-7,7,104,112,-2.6,0.9,{start:'low',floor:-2.6,shell:{x:-6.2,z:112.7,y:1},curb:false});
  /* ---------- 6. РАЗВИЛКА НА ДВОИХ (z 98…80): уступ с рычагом слева, русло с заслонкой справа ---------- */
  const FZ0=98,FZ1=80;box(-1.2,1.2,1,5.2,FZ1+1,FZ0-1,rock);
  for(let i=0;i<6;i++)addMesh(new THREE.DodecahedronGeometry(rand(0.8,1.3)),rock,rand(-0.6,0.6),5+rand(0,0.6),rand(FZ1+2,FZ0-2));
  W.ramps=W.ramps||[];const ramp=(x0,z0,x1,z1,y0,y1,w)=>{const dx=x1-x0,dz=z1-z0,len=Math.hypot(dx,dz);W.ramps.push({x0,z0,dx:dx/len,dz:dz/len,len,w,y0,y1});
    const m=addMesh(new THREE.BoxGeometry(w*2,0.3,len),M(0x8a7a5a),(x0+x1)/2,(y0+y1)/2-0.15,(z0+z1)/2);m.rotation.x=Math.atan2(y1-y0,len)*(dz<0?1:-1);};
  ramp(-4.1,FZ0-1.2,-4.1,FZ0-6,1,3.2,2.8);box(-7,-1.2,1,3.2,FZ1+6,FZ0-6,M(0x8a7a5a));ramp(-4.1,FZ1+6,-4.1,FZ1+1.2,3.2,1,2.8);
  const lever=new THREE.Group();lever.position.set(-1.9,3.2,FZ0-11);W.group.add(lever);{addMesh(new THREE.BoxGeometry(0.5,0.5,0.5),M(0x5a4a3a),0,0.25,0,lever);const arm=new THREE.Group();arm.position.y=0.5;lever.add(arm);
    addMesh(new THREE.CylinderGeometry(0.07,0.07,1.4,6),M(0x8a6a40),0,0.7,0,arm);addMesh(new THREE.SphereGeometry(0.18,8,6),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.5}),0,1.45,0,arm);arm.rotation.x=0.6;lever.arm=arm;}
  const sluiceZ=FZ0-9,sluice=new THREE.Group();sluice.position.set(4.1,1,sluiceZ);W.group.add(sluice);{const wd=M(0x6a4a2a);addMesh(new THREE.BoxGeometry(5.8,3.4,0.4),wd,0,1.7,0,sluice);for(let i=0;i<5;i++)addMesh(new THREE.BoxGeometry(0.14,3.4,0.46),M(0x4a3020),-2.4+i*1.2,1.7,0,sluice);}
  for(const x of[1.2,7])addMesh(new THREE.CylinderGeometry(0.22,0.24,4.4,8),M(0x4a3020),x,3.2,sluiceZ);
  const sluiceCol=colBox(1.2,7,1,4.4,sluiceZ-0.25,sluiceZ+0.25,false);
  const flush={t:0};CH.flush=flush;
  const openSluice=(h,how)=>{if(F.sluice)return;F.sluice=true;SFX.gate();SFX.wave();lever.arm.rotation.x=-0.6;anim(1.2,k=>{sluice.position.y=1+k*3.4;});later(1.2,()=>{sluiceCol.on=false;});flush.t=4.5;
    for(let i=0;i<10;i++)later(i*0.08,()=>FX.splash(new V3(rand(1.5,6.5),1.4,sluiceZ-0.5),1.2,new V3(0,0,-1)));banner('Шлюз открыт!','#9fe6ff',1.6,'вода подхватит — держись!');if(h)bark(h,h.kind,'Шлюз — настежь! Плыви!',1.6,true);};
  W.hittables.push({pos:new V3(-1.9,4,FZ0-11),r:1.3,push:false,alive:()=>!F.sluice,onHit:h=>{if(h.pos.y>2.4)openSluice(h,'hit');}});
  W.marks.push({pos:new V3(-1.9,4.6,FZ0-11),active:()=>!F.sluice&&WV.on,onHit:()=>openSluice(null,'shot')});
  /* ---------- 7. СКАЛЫ, ГРЕБЕШОК, КАМЫШ (z 72…66) ---------- */
  const RZ=70;box(-7,-1.6,1,4.6,RZ-2,RZ+2,rock);box(1.6,7,1,4.6,RZ-2,RZ+2,rock);
  const comb=new THREE.Group();comb.position.set(0,1.05,RZ-3.8);W.group.add(comb);{const cm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.5});addMesh(new THREE.BoxGeometry(0.9,0.12,0.22),cm,0,0.06,0,comb);
    for(let i=0;i<9;i++)addMesh(new THREE.BoxGeometry(0.05,0.05,0.34),cm,-0.4+i*0.1,0.06,0.26,comb);}
  const reeds=new THREE.Group();reeds.position.set(0,1,RZ);reeds.visible=false;W.group.add(reeds);{const rm=M(0x6a9a3a);for(let i=0;i<34;i++){const c=addMesh(new THREE.ConeGeometry(0.08,rand(2.2,3.4),4),rm,rand(-1.5,1.5),1.4,rand(-0.9,0.9),reeds);c.rotation.z=rand(-0.15,0.15);}}
  const reedCol=colBox(-1.6,1.6,1,3.4,RZ-1,RZ+1,true);reedCol.on=false;
  W.waterTargets.push({pos:new V3(0,1,RZ-3.8),pri:1,active:()=>!F.reeds&&WV.on,onWater:()=>{F.reeds=true;F.reedT=SOLO()?9:7;reedCol.on=true;reeds.visible=true;reeds.scale.set(1,0.05,1);anim(0.9,k=>{reeds.scale.y=Math.max(0.05,k);});comb.visible=false;
    SFX.grow();burst(new V3(0,2,RZ),0x9affb0,20,4);banner('Гребешок — и камыш стеной!','#9affb0',2,'как у Василисы Премудрой: вал в камыше завязнет');bark(HERO.yosha,'yosha','Гребешок за спину — лес стеной!',1.8,true);}});
  /* ---------- 8. ЛОДКА САДКО (протока z 64…34) и 9. ОБРЫВ (z 34…24) ---------- */
  const BZ0=63,BZ1=34;
  const chan=new THREE.Mesh(new THREE.PlaneGeometry(14,BZ0-BZ1+1),M(0x3a96aa,{transparent:true,opacity:0.78,emissive:0x0a4050,emissiveIntensity:0.45,depthWrite:false}));chan.rotation.x=-Math.PI/2;chan.position.set(0,0.4,(BZ0+BZ1)/2);chan.renderOrder=3;W.group.add(chan);
  const pool=new THREE.Mesh(new THREE.PlaneGeometry(14,10),M(0x3a8aa0,{transparent:true,opacity:0.8,emissive:0x0a3a4a,emissiveIntensity:0.4,depthWrite:false}));pool.rotation.x=-Math.PI/2;pool.position.set(0,-1.6,29);pool.renderOrder=3;W.group.add(pool);
  const fallsM=new THREE.Mesh(new THREE.PlaneGeometry(14,2.2),M(0xcff4ff,{transparent:true,opacity:0.6,depthWrite:false,side:THREE.DoubleSide}));fallsM.position.set(0,-0.6,BZ1);fallsM.renderOrder=4;W.group.add(fallsM);
  box(-7,7,-3.6,1,22.5,24,M(0x6a6a5a));   // берег под плетнём
  const dock=box(-3,3,1,1.15,BZ0,BZ0+1.6,M(0x8a6a40));
  const SN=[[-3.2,57],[2.6,53],[0,48.5],[-3.4,44],[3.2,40.5],[-0.4,37.5]];const snags=SN.map(([x,z])=>{const g=new THREE.Group();g.position.set(x,0.3,z);W.group.add(g);
    const wm=M(0x4a3a24);addMesh(new THREE.CylinderGeometry(0.35,0.45,1.6,6),wm,0,0.3,0,g).rotation.z=0.5;for(let i=0;i<3;i++){const b=addMesh(new THREE.CylinderGeometry(0.06,0.1,1.1,5),wm,rand(-0.5,0.5),0.9,rand(-0.3,0.3),g);b.rotation.set(rand(-0.9,0.9),0,rand(-0.9,0.9));}return {g,x,z,hit:false};});
  const boat=(()=>{const g=new THREE.Group();g.position.set(0,0.4,BZ0-2);W.group.add(g);boatMesh(g,2.6,0.8,4.6);
    const red=M(0xb03a2a),gold=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.4});addMesh(new THREE.CylinderGeometry(0.06,0.07,3.2,6),M(0x5a3214),0,2.1,0.4,g);
    const sail=addMesh(new THREE.PlaneGeometry(2.2,1.8),M(0xf4e8c8,{side:THREE.DoubleSide}),0,2.4,0.35,g);sail.rotation.y=0.05;addMesh(new THREE.ConeGeometry(0.3,0.6,5),gold,0,1.3,-2.6,g).rotation.x=-Math.PI/2.4;   // нос-ладья
    for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.06,0.3,4.2),red,s*1.32,0.75,0,g);
    const oars=[-1,1].map(s=>{const o=new THREE.Group();o.position.set(s*1.3,0.85,0.2);g.add(o);addMesh(new THREE.CylinderGeometry(0.04,0.04,2.2,5),M(0x8a6a40),s*0.9,-0.2,0,o).rotation.z=s*1.1;return o;});
    return {g,x:0,z:BZ0-2,y:0.4,vx:0,sp:0,row:0,oars,on:false,fly:null,bump:0,seats:[[-0.7,1.1],[0.7,1.1],[-0.7,-0.6],[0.7,-0.6]]};})();
  CH.boat=boat;CH.snags=snags;
  const deck={k2deck:true};W.surfs.push((x,z,reach)=>(!boat.on&&F.boat!==2&&Math.abs(x-boat.x)<1.35&&Math.abs(z-boat.z)<2.25&&boat.y+0.62<=reach+0.5)?{y:boat.y+0.62,ref:deck}:null);
  W.updates.push(()=>{for(const h of HEROES){if(h.k2boat||boat.on)continue;if(h.pos.z<BZ0&&h.pos.z>BZ1&&h.pos.y<-0.4){placeOnGround(h,clamp(h.pos.x,-2.5,2.5),BZ0+1.2,1.15);h.vel.set(0,0,0);SFX.splash();
      floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Плюх! В лодку садись','#9fe6ff');}}});
  /* ---------- 10. ПЛЕТЕНЬ У ОМУТА (z 16) ---------- */
  {const wm=M(0x8a6a40);box(-7,-2,1,4.2,15.6,16.4,wm);box(2,7,1,4.2,15.6,16.4,wm);for(let x=-6.8;x<7;x+=0.5)if(Math.abs(x)>2.1)addMesh(new THREE.CylinderGeometry(0.08,0.09,3.6,5),wm,x,2.8,16.5).castShadow=false;}
  const gateG=[-1,1].map(sd=>{const g=new THREE.Group();g.position.set(sd*2,1,16);W.group.add(g);addMesh(new THREE.BoxGeometry(2,3,0.3),M(0x9a7a4a),-sd*1,1.5,0,g);return g;});
  const gateCol=colBox(-2,2,1,4.2,15.7,16.3,true);
  const RP=[-99,-99],ropes=[-1,1].map((sd,i)=>{const g=new THREE.Group();g.position.set(sd*5.2,1,17.1);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.05,0.05,2.6,5),M(0xd8c090),0,2.2,0,g);
    const b=addMesh(new THREE.ConeGeometry(0.22,0.36,10),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),0,0.9,0,g);return {g,b,sd};});
  ropes.forEach((Rr,i)=>W.hittables.push({pos:new V3(Rr.sd*5.2,2,17.1),r:1.1,push:false,alive:()=>!F.gate,onHit:h=>{RP[i]=G.time;if(SOLO())RP[1-i]=G.time;SFX.latch();anim(0.4,k=>{Rr.g.position.y=1-Math.sin(k*Math.PI)*0.4;});
    if(Math.abs(RP[0]-RP[1])<0.8){F.gate=true;gateCol.on=false;SFX.gate();gateG.forEach((g,j)=>anim(1,k=>{g.rotation.y=(j?-1:1)*k*1.6;}));banner('Плетень открыт!','#ffffff',1.6,'к омуту!');}
    else floatText(new V3(Rr.sd*5.2,3.6,17.1),'Разом! Вместе дёргайте!','#ffd9a0');}}));
  // колокольчики-отметки: упал — сюда
  bell(-4,196,1);bell(-4,160,1);bell(-4,121,1);bell(-4,99,1);bell(-4,76,1);bell(-4,21.5,1);
  /* ---------- ВАЛ ---------- */
  const WV={z:212,on:false,hold:0,ck:196,base:()=>SOLO()?2.3:2.9,snd:0,mode:'chase',gap:99};CH.WV=WV;
  const VAL=FX.val(14.6,5.6,{alpha:0.88});VAL.root.visible=false;const VZ=2.0*5.6*0.55;
  const flood=new THREE.Mesh(new THREE.PlaneGeometry(14.4,220),M(0x3a8aa0,{transparent:true,opacity:0.66,emissive:0x0a3a4a,emissiveIntensity:0.35,depthWrite:false}));flood.rotation.x=-Math.PI/2;flood.renderOrder=4;W.group.add(flood);flood.visible=false;
  const placeVal=(z,y)=>{VAL.set(0,y==null?1:y,z+VZ,Math.PI);VAL.groundY=1;flood.position.set(0,(y==null?1:y)+0.6,z+VZ+110);};
  const CKS=[196,172,163,147,124,101,78,64,22,13];
  // кого вал накрыл — к последней отметке; камыш, выросший слишком рано, — гребешок снова
  function waveCaught(){SFX.splash();SFX.wave();shakeAll(0.07,0.6);banner('Вал догнал!','#cff8ff',1.8,'назад, к последней отметке — и бегом!');FX.crown(new V3(active(0).pos.x,1,active(0).pos.z),1.4);
    WV.z=WV.ck+13;WV.hold=1.6;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,WV.ck-0.6*(i%2),1);h.vel.set(0,0,0);h.following=!h.active||(SOLO()&&h.player!==G.soloPi);});snapCams();G.stats.falls=(G.stats.falls||0)+1;
    if(F.reeds&&!F.reedsDown&&WV.ck>RZ+1){F.reeds=false;reedCol.on=false;reeds.visible=false;comb.visible=true;}
    if(lilyRef.hum>0&&WV.ck>LZ0)lilyRef.hum=0;}
  CH.chaseScene=function(){if(F.chaseDone||F.phase>=1)return;
    play({dur:8.6,fov:50,shots:[shot(0,[0,4.6,186],[0,4.2,206]),shot(4.2,[5.4,3.2,188],[0,2.2,198])],
      says:[[0.3,3.2,null,'<i>Река за спиной вздыбилась — встала валом до самых крон.</i>',true],[3.6,2.4,'vod','Кто звенел? Кто будил? Догоню-у-у!'],[6.2,2.2,'zven','Бежим! К омуту, скорее!']],
      events:[{t:0.4,fn:()=>{VAL.root.visible=true;flood.visible=true;WV.z=220;anim(3.4,k=>{WV.z=220-k*9;placeVal(WV.z);});SFX.wave();tone(60,2.2,'sawtooth',0.16,40);shakeAll(0.05,1.4);}},
        {t:2.0,fn:()=>{for(let i=0;i<8;i++)later(i*0.12,()=>FX.splash(new V3(rand(-6,6),5,WV.z-1),1.4,new V3(0,0,-1)));}}],
      tick:(t,dt)=>{VAL.tick(dt);},
      end:()=>{WV.on=true;WV.z=209;WV.hold=0.6;W.camYaw=Math.PI;snapCams();banner('Погоня!','#cff8ff',2.4,'вал за спиной — бегите вниз, к нам!');
        for(const pi of[0,1])tip(pi,'Вал гонится! Не стой — он догоняет только того, кто медлит.<br>Дуб — Потап '+K0('skill')+', колесо мельницы — Потап держит, ручей и кувшинки — гусли '+K(pi,'item')+'.',4.6);}});};
  const K0=a=>K(0,a);
  // ---------- лодка: посадка, руль и вёсла, коряги, обрыв ----------
  const inBoat=h=>Math.abs(h.pos.x-boat.x)<1.5&&Math.abs(h.pos.z-boat.z)<2.4&&h.pos.y>0.2&&h.pos.y<2.6;
  function boatStart(){if(boat.on)return;boat.on=true;F.boat=1;F.reedsDown=true;reedCol.on=false;WV.mode='boat';WV.z=Math.max(WV.z,boat.z+9);boat.sp=2.5;
    const crew=HEROES.slice();boat.crew=crew;crew.forEach((h,i)=>{h.k2boat=boat.seats[i%4];h.vel.set(0,0,0);});
    W.custom=(pi,h,dt,inp)=>{boatInput(pi,dt,inp);};SFX.wave();banner('Лодка Садко!','#9fe6ff',2.2,SOLO()?'влево-вправо — руль, '+K(G.soloPi,'item')+' — гребок':'Игрок 1 — руль (влево-вправо), Игрок 2 — вёсла-гусли '+K(1,'item'));
    bark(T.potap,'potap','В лодку! Садко, выручай!',1.8,true);}
  function boatInput(pi,dt,inp){if(!boat.on||boat.fly)return;const steer=SOLO()?pi===G.soloPi:pi===0,rower=SOLO()?pi===G.soloPi:pi===1;
    if(steer&&!inp.lock){const back=camBack(),rx=back.z;boat.want=clamp(inp.ix*(rx>=0?1:-1),-1,1);}   // камера лицом к героям: «вправо» на экране — влево по миру
    if(rower&&!inp.lock&&tap(pi,'item')){boat.row=Math.min(3,boat.row+1);boat.sp=Math.min(9,boat.sp+1.7);gusliFx(active(pi),'high');boat.oars.forEach((o,i)=>anim(0.4,k=>{o.rotation.x=Math.sin(k*Math.PI)*0.9;}));
      FX.splash(new V3(boat.x-1.6,0.5,boat.z),0.6);FX.splash(new V3(boat.x+1.6,0.5,boat.z),0.6);}}
  function boatTick(dt){const B=boat;if(!B.on)return;
    if(!B.fly){B.vx=damp(B.vx,(B.want||0)*4.2,6,dt);B.x=clamp(B.x+B.vx*dt,-4.6,4.6);B.sp=damp(B.sp,3.8,0.55,dt);B.bump=Math.max(0,B.bump-dt);B.z-=B.sp*dt*(B.bump>0?0.35:1);
      for(const S of snags){if(S.hit||Math.abs(S.z-B.z)>1.6||Math.abs(S.x-B.x)>1.75)continue;S.hit=true;B.bump=0.7;B.sp=Math.max(1.5,B.sp-2.5);SFX.thud&&SFX.thud();SFX.crash();shakeAll(0.06,0.4);FX.splash(new V3(B.x,0.8,B.z-2),1.2);
        k2say('Бух! Коряга!','#ffd9a0');anim(0.6,k=>{S.g.rotation.z=k*1.2;S.g.position.y=0.3-k*1.2;});}
      B.g.rotation.z=-B.vx*0.06+Math.sin(G.time*3)*0.03;B.g.rotation.x=Math.sin(G.time*2.3)*0.03;
      // вал — прямо за кормой, гребень загибается над головой
      WV.z=Math.min(WV.z,B.z+4.2+Math.max(0,3-B.sp)*0.5);
      if(B.z<=BZ1+0.4)boatFly();}
    else{const Fl=B.fly;Fl.t+=dt;const k=Math.min(1,Fl.t/Fl.dur);B.z=lerp(Fl.z0,Fl.z1,k);B.y=lerp(Fl.y0,Fl.y1,k)+Math.sin(k*Math.PI)*3.2;B.g.rotation.x=-0.35+k*0.7;
      WV.z=B.z+3.6;VAL.lip=1.5*Math.sin(Math.min(1,k*1.4)*Math.PI*0.5);
      if(k>=1)boatLand();}
    B.g.position.set(B.x,B.y,B.z);
    for(const h of B.crew||[]){const s=h.k2boat;if(!s)continue;h.pos.set(B.x+s[0],B.y+0.7,B.z+s[1]);h.vel.set(0,0,0);h.grounded=true;h.groundRef=null;h.face=Math.PI;h.knockT=Math.max(h.knockT,0.05);}}
  function boatFly(){const B=boat;B.fly={t:0,dur:1.5,z0:B.z,z1:25.5,y0:B.y,y1:-1.3};SFX.whoosh&&SFX.whoosh();F.slow=1.25;SFX.wave();banner('Держи-и-ись!','#ffffff',1.2,'');
    for(let i=0;i<14;i++)later(i*0.06,()=>FX.splash(new V3(rand(-6,6),0.6,BZ1),1.2,new V3(0,0,-1)));}
  function boatLand(){const B=boat;B.fly=null;B.on=false;W.custom=null;F.boat=2;FX.crown(new V3(B.x,-1.5,B.z),2);SFX.splash();SFX.crash();shakeAll(0.08,0.6);
    (B.crew||[]).forEach((h,i)=>{h.k2boat=null;placeOnGround(h,clamp(B.x-1.8+i*1.2,-6,6),21.2-0.3*(i%2),1);h.vel.set(0,0,0);h.following=SOLO()?h.player!==G.soloPi||!h.active:!h.active;});snapCams();
    anim(1.2,k=>{B.g.position.y=-1.4-k*1.2;B.g.rotation.z=k*0.9;});WV.mode='chase';WV.z=31;WV.hold=3.5;WV.ck=22;VAL.lip=0;
    banner('Перелетели!','#cff8ff',1.6,'плетень — две верёвки разом!');k2say('Вот это полёт!','#ffffff');}
  const k2say=(t,c)=>{const h=active(0);floatText(h.pos.clone().add(new V3(0,h.d.height+1.2,0)),t,c||'#ffffff');};
  CH.boatStart=boatStart;
  /* ---------- шаг погони ---------- */
  W.updates.push(dt=>{
    // мельница: колесо крутит течение; держит Потап у ступицы или кто-то на тормозной плите
    if(mill.potap){const h=mill.ph;if(!h||hd(h.pos,millHold)>1.7||(h.active&&players[h.player].downed)){mill.potap=false;mill.ph=null;if(h)floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Отпустил колесо','#ffd9a0');}}
    mill.held=mill.potap||millPlate.pressed;mill.spin=damp(mill.spin,mill.held?0:1.2,4,dt);if(!mill.held)mill.ang+=mill.spin*dt;else mill.ang=damp(mill.ang,Math.round(mill.ang/(Math.PI*2/MN))*(Math.PI*2/MN),6,dt);
    millG.rotation.x=-mill.ang;millBlock.on=!mill.held;
    for(const P of mill.paddles){const a=P.i/MN*Math.PI*2+mill.ang,y=MAY+Math.cos(a)*MR,z=MZ-Math.sin(a)*MR;
      const c=P.col;c.miny=y-0.15;c.maxy=y+0.08;c.minz=z-0.62;c.maxz=z+0.62;c.minx=-1.5;c.maxx=1.5;c.on=mill.held&&y>0.5;}
    if(Math.random()<dt*6&&!mill.held)FX.drop(new V3(rand(-1.5,1.5),MAY+MR+0.1,MZ+rand(-0.6,0.6)),new V3(0,rand(1,2),rand(-2.5,-0.5)),0.12);
    for(const h of HEROES){if(h.k2boat)continue;if(Math.abs(h.pos.z-MZ)<1.85&&h.pos.y<0.3&&h.pos.x>-7&&h.pos.x<7){placeOnGround(h,clamp(h.pos.x,-5,5),MZ+3.2,1);h.vel.set(0,0,0);FX.splash(new V3(h.pos.x,0.4,MZ),1);
        floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Течение вынесло!','#9fe6ff');}}
    // кувшинки: всплывают рядами по нотам, напев стих — тонут от берега
    lilyRef.hum=Math.max(0,lilyRef.hum-dt);for(const h of HEROES)if(h.kwHold&&h.kwHold.ref===lilyRef)lilyRef.hum=Math.max(lilyRef.hum,0.5);
    const on=lilyRef.hum>0;if(on&&!CH.lilyOn){CH.lilyOn=true;CH.lilyT=0;}if(!on&&CH.lilyOn){CH.lilyOn=false;CH.lilyOff=0;}
    if(CH.lilyOn){CH.lilyT+=dt;ROWS.forEach((r,i)=>{const w=CH.lilyT>i*0.22?1:0;if(w&&!r.want){gusli(FIN.SADKO_TUNE[i%4]+(i>=4?12:0),0,0.12);FX.ring(0,0.55,r.z,5,0.6);}r.want=w;});}
    else if(CH.lilyOff!=null){CH.lilyOff+=dt;ROWS.forEach((r,i)=>{if(CH.lilyOff>i*0.3)r.want=0;});}
    for(const r of ROWS){r.up=damp(r.up,r.want,9,dt);const y=lerp(-0.7,0.75,r.up);for(const p of r.pads){p.g.position.y=y+Math.sin(G.time*2+p.col.x)*0.02;p.col.maxy=y+0.06;p.col.on=r.up>0.6;}}
    for(const h of HEROES){if(h.k2boat)continue;if(h.pos.z<LZ0&&h.pos.z>LZ1&&h.pos.y<0.1&&Math.abs(h.pos.x)<7){placeOnGround(h,clamp(h.pos.x,-5,5),LZ0+2.4,1);h.vel.set(0,0,0);SFX.splash();FX.crown(new V3(h.pos.x,0.5,LZ0-0.5),0.6);
        floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Плюх! Кувшинки — в лад, по напеву','#9fe6ff');}}
    // шлюз: вода несёт вперёд по руслу
    if(flush.t>0){flush.t-=dt;for(const h of HEROES){if(h.k2boat||h.pos.x<1.3||h.pos.z>sluiceZ+0.5||h.pos.z<FZ1-1)continue;const r=collideXZ(h.pos.x,h.pos.z-7*dt,h.d.radius,h.pos.y,h.pos.y+heroHeight(h));h.pos.z=r.z;}
      if(Math.random()<dt*18)FX.splash(new V3(rand(1.5,6.5),1.2,rand(FZ1,sluiceZ)),0.8,new V3(0,0,-1));}
    // котёнок
    if(kit.sit){kit.tail.rotation.z=Math.sin(G.time*2)*0.3;}
    else if(!kit.on){for(const h of HEROES){if(h.active&&Math.abs(h.pos.x-kit.g.position.x)<5.8&&Math.abs(h.pos.z-kit.g.position.z)<1.8){kit.on=h;F.kitten=h.kind;SFX.ok();tone(880,0.12,'sine',0.2,1200);tone(1100,0.16,'sine',0.16,800,0.12);
          floatText(h.pos.clone().add(new V3(0,h.d.height+1.4,0)),'Мяу!','#ffd0a0');later(0.4,()=>bark(h,h.kind,'Котёнок! Держись крепче — унесу от воды!',2.2,true));break;}}
      kit.tail.rotation.z=Math.sin(G.time*4)*0.3;}
    else{const h=kit.on;kit.g.position.set(h.pos.x,h.pos.y+heroHeight(h)+0.02,h.pos.z);kit.g.rotation.y=h.face;kit.tail.rotation.z=Math.sin(G.time*6)*0.4;}
    // лодка
    if(!boat.on&&F.boat!==2&&WV.on&&ctl().every(inBoat))boatStart();
    boatTick(dt);
    if(!WV.on||G.cine||F.chaseDone)return;
    VAL.tick(dt);
    const lead=Math.max(...ctl().map(h=>h.pos.z)),gap=WV.z-lead;WV.gap=gap;
    for(const c of CKS)if(c<WV.ck&&ctl().every(h=>h.pos.z<c))WV.ck=c;
    if(WV.mode==='chase'){
      if(WV.hold>0)WV.hold-=dt;
      else if(F.reeds&&!F.reedsDown&&WV.z<=RZ+1.6&&WV.z>RZ-1&&F.boat!==2){WV.z=RZ+1.6;F.reedT-=dt;reeds.rotation.x=Math.sin(G.time*9)*0.03;if(F.reedT<=0){F.reedsDown=true;reedCol.on=false;SFX.crash();anim(0.8,k=>{reeds.scale.y=Math.max(0.15,1-k);});floatText(new V3(0,4,RZ),'Прорвал камыш!','#cff8ff');}}
      else{const sp=clamp(WV.base()*Math.pow(Math.max(0.2,gap)/7,1.35),0.45,7.5);WV.z-=sp*dt;}
      WV.z=Math.max(WV.z,F.boat===2?9:boat.z+3.5);}
    placeVal(WV.z,WV.mode==='boat'&&boat.fly?boat.y+0.4:1);
    // дома рушатся, когда вал их накрывает
    for(const Hs of houses){if(Hs.down||WV.z>Hs.z+1.5)continue;Hs.down=true;if(Hs.col)Hs.col.on=false;SFX.crash();const r0=Hs.g.rotation.z;anim(1.2,k=>{Hs.g.rotation.z=r0+k*1.2*(Hs.x>0?1:-1);Hs.g.position.y=1-k*2.6;});for(let i=0;i<6;i++)FX.splash(new V3(Hs.x,2.5,Hs.z),1);}
    // звук, тряска, капли на «объективе»
    const near=clamp(1-gap/14,0.06,1);FX.roar(near*0.3);if(gap<6)FX.screenDrops((6-gap)/6);if(gap<3&&Math.random()<dt*4)shakeAll(0.025,0.2);
    WV.snd-=dt;if(WV.snd<=0){WV.snd=2.2;if(gap<10)SFX.wave();}
    // кто остался позади вала (не управляемый) — Звенышко подтягивает
    for(const h of HEROES){if(h.k2boat||ctl().includes(h)||h.pos.z<WV.z-0.4)continue;const lead2=active(SOLO()?G.soloPi:h.player);if(lead2===h)continue;teleportBehind(h,lead2);h.following=true;}
    if(WV.mode==='chase')for(const h of ctl()){if(h.pos.z>WV.z-0.6){waveCaught();break;}}
    if(F.gate&&ctl().every(h=>h.pos.z<10.4)){F.chaseDone=true;WV.on=false;W.camYaw=0;FX.roar(0);SFX.crash();anim(1.6,k=>{placeVal(WV.z-k*10,1-k*5);});later(1.7,()=>{VAL.root.visible=false;flood.visible=false;});
      if(kit.on){const kh=kit.on;later(0.6,()=>bark(kh,kh.kind,'Котёнок цел — у омута на бережку посидит.',2.2,true));kit.on=null;kit.sit=true;const from=kit.g.position.clone(),to=new V3(-6.4,1,6.2);
        anim(0.7,k=>{kit.g.position.lerpVectors(from,to,k);kit.g.position.y+=Math.sin(k*Math.PI)*1.2;});kit.g.rotation.y=Math.PI*0.8;}later(1.2,KC.intro);}});
  // ---------- замедление: прыжок с обрыва (время игры — медленнее) ----------
  // ---------- рисунки кнопок и задачи погони ----------
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.oak&&T.potap.active&&hd(T.potap.pos,{x:0,z:OAKZ+1.7})<2.3,'ухнем!');
  prompt(0,'skill',()=>headOf(T.potap),()=>F.oak&&!mill.potap&&!CH.millDone&&T.potap.active&&hd(T.potap.pos,millHold)<2.3,'держи колесо!');
  prompt(1,'skill',()=>headOf(T.yosha),()=>!F.reeds&&WV.on&&T.yosha.active&&hd(T.yosha.pos,{x:0,z:RZ-3.8})<3,'гребешок!');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'item',()=>headOf(h()),()=>WV.on&&inZone(STR,h(),1.2)&&STR.state==='low','прилив');
    prompt(pi,'attack',()=>headOf(h()),()=>!F.gate&&ropes.some(Rr=>hd(h().pos,{x:Rr.sd*5.2,z:17.1})<1.8),'разом!');
    prompt(pi,'attack',()=>headOf(h()),()=>!F.sluice&&hd(h().pos,{x:-1.9,z:FZ0-11})<2.2&&h().pos.y>2.5,'рычаг!');
    prompt(pi,'item',()=>headOf(h()),()=>boat.on&&!boat.fly&&(SOLO()?pi===G.soloPi:pi===1),'гребок!');}
  W.tipZones.push({cond:(pi,h)=>WV.on&&h.pos.z>104&&h.pos.z<112&&h.pos.y<0.4,text:pi=>'Из ручья в отлив не выбраться. Прилив '+K(pi,'item')+' — и вверх!'},
    {cond:(pi,h)=>WV.on&&h.pos.x>1.2&&h.pos.z<sluiceZ+3&&h.pos.z>sluiceZ&&!F.sluice,text:pi=>'Заслонку открывает рычаг на уступе слева — пусть друг дёрнет.<br>Или Прошка собьёт его из рогатки '+K(0,'skill')+'.'});
  const OB=[
    pi=>O(pi?()=>'Вал по пятам! Дуб поперёк тропы — Потап его поднимет. Беги следом!':()=>'Вал по пятам! Дуб поперёк тропы — Потап его поднимет '+K(0,'skill')+' (смени героя '+K(0,'swap')+').',()=>!!F.oak,()=>[oak]),
    pi=>O(()=>'Мельница: колесо крутится — не пройти. Потап держит колесо у ступицы '+K(0,'skill')+' — беги по лопастям!<br>На том берегу встань на плиту — колесо удержишь для Потапа.',()=>!!CH.millDone,()=>[millG]),
    pi=>O(()=>'Пруд глубокий. Сыграй у раковины '+K(pi,'item')+' — кувшинки всплывут в лад. Напев стих — тонут!',()=>!!CH.lilyDone,()=>[lilyShell.g]),
    pi=>O(()=>'Ручей: в отлив из него не выбраться. Прилив гуслями '+K(pi,'item')+' у ракушки — и вплавь!',()=>!!CH.streamDone,()=>[STR.shell.g]),
    pi=>O(()=>'Развилка! Один — наверх, к рычагу шлюза '+K(pi,'attack')+', другой — вниз, к заслонке: вода понесёт!',()=>!!CH.forkDone,()=>F.sluice?[]:[lever]),
    pi=>O(pi?()=>'За скалами — гребешок Василисы. Все прошли — Йоша, полей его живой водой '+K(1,'skill')+': камыш встанет стеной!':()=>'За скалами — гребешок Василисы: Йоша польёт — и камыш встанет стеной. Проходи скорей!',()=>!!F.reeds||active(pi).pos.z<RZ-6,()=>F.reeds?[]:[comb]),
    pi=>O(()=>SOLO()?'Лодка Садко! В лодку — и прочь от вала: руль — влево-вправо, гребок — '+K(G.soloPi,'item')+'.':pi?'Лодка Садко! В лодку: ты на вёслах — гребок гуслями '+K(1,'item')+'.':'Лодка Садко! В лодку: ты у руля — влево-вправо, мимо коряг.',()=>F.boat===2,()=>[boat.g]),
    pi=>O(()=>'Плетень на запоре: две верёвки — дёрните разом '+K(pi,'attack')+'!',()=>!!F.gate,()=>ropes.map(Rr=>Rr.g)),
    pi=>O('К омуту!',()=>!!F.chaseDone,()=>[])];
  W.updates.push(()=>{if(!CH.millDone&&ctl().every(h=>h.pos.z<MZ-2.2))CH.millDone=true;if(!CH.lilyDone&&ctl().every(h=>h.pos.z<LZ1-0.2))CH.lilyDone=true;
    if(!CH.streamDone&&ctl().every(h=>h.pos.z<103.8&&h.pos.y>0.6))CH.streamDone=true;if(!CH.forkDone&&ctl().every(h=>h.pos.z<FZ1-0.2))CH.forkDone=true;});
  CH.objectives=OB;
  // ---------- для ботов: точки участков ----------
  CH.warp=(where)=>{const P={village:192,oak:170,mill:157,lily:143.5,stream:115,fork:99.5,reeds:76,boat:66,fence:21};const z=P[where];if(z==null)return false;
    F.oak=true;oakCol.on=false;oak.visible=false;if(z<157)CH.millDone=true;if(z<143.5)CH.lilyDone=true;if(z<=101){setWater(STR,'high');CH.streamDone=true;}if(z<99.5)CH.forkDone=true;
    if(z<=66){F.reeds=F.reedsDown=true;CH.forkDone=true;F.sluice=true;sluiceCol.on=false;}if(z<=21){F.boat=2;boat.g.visible=false;}
    WV.ck=z;WV.z=z+14;WV.on=true;WV.mode='chase';VAL.root.visible=true;flood.visible=true;W.camYaw=Math.PI;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,z,1);h.following=false;});snapCams();return true;};
  CH.skip=()=>{F.oak=F.reeds=F.reedsDown=F.gate=F.sluice=true;F.boat=2;CH.millDone=CH.lilyDone=CH.streamDone=CH.forkDone=true;oakCol.on=reedCol.on=gateCol.on=false;F.chaseDone=true;WV.on=false;VAL.root.visible=false;flood.visible=false;W.camYaw=0;FX.roar(0);};
  CH.STR=STR;CH.oakCol=oakCol;CH.reedCol=reedCol;CH.gateCol=gateCol;CH.ropes=ropes;CH.RP=RP;CH.VAL=VAL;CH.CKS=CKS;CH.millPlate=millPlate;CH.millHold=millHold;CH.lilyShell=lilyShell;CH.lever=lever;CH.sluiceZ=sluiceZ;
  CH.MZ=MZ;CH.LZ0=LZ0;CH.LZ1=LZ1;CH.RZ=RZ;CH.OAKZ=OAKZ;CH.FZ0=FZ0;CH.FZ1=FZ1;CH.BZ0=BZ0;CH.BZ1=BZ1;
  return CH;};
// замедление игры (прыжок с обрыва, общий удар): W.flags.slow — сколько ещё секунд; время идёт в 0,35
{const _st=step;step=function(dt){if(W&&W.levelId==='2-B'&&W.flags&&W.flags.slow>0&&!G.cine){W.flags.slow-=dt;dt*=0.35;}_st(dt);};}
