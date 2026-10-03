// ---- продолжение late_99f_k22.js (внутри build22, часть 2 из 4): печка по хребту, бока и колья, пахари, пляска, роща — части склеиваются сборкой по имени файла ----
  // садитесь на печку оба — и поехали. Раки встают поперёк дороги — печка стоит, пока не прогоните; дыхание кита гонит волну через
  // хребет — держись: щит или прыжок, иначе смоет назад, догоняй. Хребет узкий, по бокам — море.
  ground(-3.5,3.5,-140,-100,4.5,hump,skinSide);
  for(let z=-102;z>-140;z-=3.2)for(const s of[-1,1])addMesh(new THREE.ConeGeometry(0.28,0.9,5),skinSide,s*3.2,4.9,z+rand(-0.6,0.6)).rotation.z=-s*0.4;   // наросты по краю хребта
  const stove=stoveMesh22();const STV={g:stove.g,x:-7.8,z:-85.6,s:0,state:'home',col:colBox(-9.1,-6.5,4.5,5.5,-87.3,-83.9,false),wave:null,waveT:3.5,crabs:[],stopT:0,smoke:0};
  const PATH=[[0,-100.5],[0.9,-110],[-0.9,-120],[0.7,-130],[0,-137.5]],SEG=[];let PL=0;for(let i=0;i<PATH.length-1;i++){const a=PATH[i],b=PATH[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]);SEG.push({a,b,L,s0:PL});PL+=L;}
  const pathAt=s=>{s=clamp(s,0,PL);for(const q of SEG)if(s<=q.s0+q.L){const k=(s-q.s0)/q.L;return [lerp(q.a[0],q.b[0],k),lerp(q.a[1],q.b[1],k),Math.atan2(q.b[0]-q.a[0],q.b[1]-q.a[1])];}const q=SEG[SEG.length-1];return [q.b[0],q.b[1],Math.atan2(q.b[0]-q.a[0],q.b[1]-q.a[1])];};
  const stovePlace=(x,z,ry)=>{const dx=x-STV.x,dz=z-STV.z;STV.x=x;STV.z=z;stove.g.position.set(x,4.5,z);stove.g.rotation.y=ry+Math.PI;
    const c=STV.col;c.minx=x-1.3;c.maxx=x+1.3;c.minz=z-1.7;c.maxz=z+1.7;if(dx||dz)for(const h of HEROES)if(h.groundRef===c&&h.grounded&&!h.cling){h.pos.x+=dx;h.pos.z+=dz;}};
  stovePlace(-7.8,-85.6,0);
  const nutSpine=nutItem(-2.6,5.2,-125);
  /* ---------- 6. бока: «все бока его изрыты, частоколы в рёбра вбиты» ---------- */
  // рёбра ходят ходуном (соседние — навстречу друг другу): с ребра на ребро прыгай, когда сошлись. На трёх рёбрах — частокол:
  // Потап выдёргивает кол, из раны сочится морок — Йоша лечит живой водой. Вылечили все три — кит открывает глаз (ролик).
  const ribSkin=M(0x7a8aa6),foldM=M(0x4a5a74);
  ground(-10,10,-146,-140,4.5,hump,skinSide);ground(-10,10,-186,-146,3.7,foldM,skinSide);ground(-10,10,-212,-186,4.5,hump,skinSide);   // складка между рёбрами (3.7): из неё на ребро выпрыгнет и Потап
  for(let x=-9;x<=9;x+=3)WB.props.push({g:addMesh(new THREE.ConeGeometry(0.3,0.6,5),M(0xdad8c8),x,4.8,-143.5),y:4.8,h:0.4});
  const RIB=[];for(let i=0;i<6;i++){const z0=-149.5-i*6.2,g=new THREE.Group();g.position.set(0,0,z0);W.group.add(g);
    addMesh(new THREE.BoxGeometry(20,1.1,3.0),ribSkin,0,3.95,0,g);addMesh(new THREE.BoxGeometry(20.2,0.12,3.1),M(0x95a5c0),0,4.5,0,g);
    for(let k=0;k<6;k++)addMesh(new THREE.ConeGeometry(0.2,0.45,5),M(0xdad8c8),-8.5+k*3.4,4.7,rand(-1,1),g);
    g.traverse(c=>{c.userData.noBatch=true;});RIB.push({i,z0,g,col:colBox(-10,10,3.4,4.5,z0-1.5,z0+1.5,false),z:z0,y:0,pal:null});}
  const RB={A:1.1,per:4.2,t:0,healed:0};
  const PALS=[1,3,5].map((ri,n)=>{const R=RIB[ri],g=new THREE.Group();R.g.add(g);const pw=M(0x8a6a44);for(let x=-9.6;x<=9.6;x+=0.6){const p=addMesh(new THREE.CylinderGeometry(0.1,0.12,1.9,5),pw,x,5.4,-1.1,g);addMesh(new THREE.ConeGeometry(0.11,0.3,5),pw,x,6.5,-1.1,g);}
    addMesh(new THREE.BoxGeometry(19.4,0.12,0.12),pw,0,5.9,-1.1,g);const stake=new THREE.Group();stake.position.set(2.6,4.5,-0.6);R.g.add(stake);addMesh(new THREE.CylinderGeometry(0.24,0.3,2.8,7),M(0x6a4a2a),0,1.0,0,stake);addMesh(new THREE.ConeGeometry(0.3,0.5,7),M(0x6a4a2a),0,2.6,0,stake);
    const mist=new THREE.Group();mist.visible=false;R.g.add(mist);const mm=MB(0x3a1450,{transparent:true,opacity:0.55,depthWrite:false});for(let k=0;k<14;k++)addMesh(new THREE.SphereGeometry(rand(0.5,0.9),8,6),mm,-9+k*1.4,5.2+rand(-0.3,0.3),-1.1,mist);
    const P={n,R,g,stake,mist,col:colBox(-10,10,4.5,6.6,R.z0-1.35,R.z0-0.85,false),pulled:false,healed:false};R.pal=P;g.traverse(c=>{c.userData.noBatch=true;});stake.traverse(c=>{c.userData.noBatch=true;});return P;});
  PALS.forEach(P=>{W.lifts.push({pos:new V3(),active:()=>!P.pulled&&hd(P.lp,HERO.potap.pos)<2.4,onLift:h=>pullStake(P,h)});P.lp=new V3();
    W.waterTargets.push({pos:new V3(),active:()=>P.pulled&&!P.healed,onWater:h=>healWound(P,h),pri:1});});
  const LIFTS_PAL=W.lifts.slice(-3),WT_PAL=W.waterTargets.slice(-3);
  function pullStake(P,h){if(P.pulled)return;P.pulled=true;SFX.toss();shakeAll(0.05,0.4);tone(90,0.8,'sine',0.25,50);floatText(new V3(P.lp.x,7,P.lp.z),'О-ох!','#cfe8ff');
    anim(1.0,k=>{P.stake.position.y=4.5+k*2.2;P.stake.rotation.z=k*1.4;P.stake.position.x=2.6+k*2;});later(1.0,()=>{P.stake.visible=false;});
    anim(1.2,k=>{P.g.rotation.x=-1.4*smooth(k);P.g.position.y=-k*1.6;});later(1.2,()=>{P.g.visible=false;});P.mist.visible=true;
    later(0.4,()=>bark(h,'potap','Ух! Вот так занозища!',1.8,true));
    if(!F.woundTold){F.woundTold=true;for(const p of[0,1])tip(p,'Из раны сочится морок — не пройти. Йоша, полей живой водой '+K(1,'skill')+' — заживёт!',3.4);}}
  function healWound(P,h){if(P.healed)return;P.healed=true;P.col.on=false;SFX.grow();RB.healed++;RB.A=1.1*(1-0.22*RB.healed);WB.calm=Math.max(0.55,1-0.15*RB.healed);
    anim(1.2,k=>{P.mist.scale.setScalar(1-k*0.9);P.mist.children.forEach(c=>{c.material.opacity=0.55*(1-k);});});later(1.2,()=>{P.mist.visible=false;});
    for(let i=0;i<14;i++)burst(new V3(rand(-9,9),5,P.R.z),[0x9fe6ff,COL.gold][i%2],3,3);tone(160,1.4,'sine',0.2,110);floatText(new V3(P.lp.x,7,P.lp.z),'Ах-х… полегчало…','#9fe6ff');
    if(RB.healed===3)later(1.2,eyeScene);}
  const flankEye=eye22(12.6,3.6,-196,1.9,1);
  const nutRib=nutItem(-9.2,5.1,-208);
  const remR=[prilip22(-4,-161.9,4.5,{leash:8}),prilip22(5,-174.3,4.5,{leash:8})];
  /* ---------- 7. губа: «мужички на губе пашут»; кит зевает — тянет к пасти ---------- */
  const fieldM=M(0x7a5a3a);ground(-7.4,10,-266,-212,4.5,fieldM,skinSide);ground(-10,-7.4,-266,-212,4.5,hump,skinSide);
  for(let x=-6;x<=9;x+=1.5){addMesh(new THREE.BoxGeometry(0.7,0.18,53),M(0x5a3e26),x,4.59,-239).receiveShadow=true;}   // борозды
  {const lip=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,54,10,1,false,0,Math.PI),M(0xc87a8a));lip.rotation.set(Math.PI/2,0,Math.PI/2);lip.position.set(-9.6,4.6,-239);W.group.add(lip);}
  box(-10,-8.4,4.5,6.2,-266,-212,M(0xb8707a),{occ:false});   // губа кита — валиком у левого края; за ней пасть
  const plows=[{x:-2.5,z:-226},{x:4.5,z:-242}].map((p,i)=>{const H=horse22(p.x,4.5,p.z-2.6,Math.PI);const pl=plough22(p.x,4.5,p.z,Math.PI);const man=folk22(p.x+0.5,4.5,p.z+1.3,{kind:'man',ry:Math.PI,who:'pahar',shirt:[0xf0f0e0,0xd04a3a][i]});
    W.cyls.push({x:p.x,z:p.z-1.3,r:1.2,miny:3,maxy:6.5,on:true});return Object.assign(p,{H,pl,man,free:false});});
  const BARN=[{x:-2.5,y:4.5,z:-229.6,hp:3},{x:4.5,y:4.5,z:-245.6,hp:3},{x:-8.9,y:6.3,z:-252,hp:1,high:true}].map(b=>{const g=new THREE.Group();g.position.set(b.x,b.y,b.z);W.group.add(g);const bm=M(0xe0dcc8),dk=M(0x5a5048);
    for(let k=0;k<7;k++){const c=addMesh(new THREE.CylinderGeometry(0.16,0.26,0.36,6),bm,rand(-0.5,0.5),0.18,rand(-0.5,0.5),g);addMesh(new THREE.CylinderGeometry(0.06,0.06,0.04,6),dk,c.position.x,0.37,c.position.z,g);}
    g.traverse(c=>{c.userData.noBatch=true;});const B=Object.assign(b,{g,gone:false});
    if(b.high){const mk=markMesh(0.9);mk.position.set(b.x,b.y+1.0,b.z);W.group.add(mk);B.mk=mk;W.marks.push({pos:new V3(b.x,b.y+0.5,b.z),active:()=>!B.gone,onHit:()=>knockBarn(B)});}
    else W.hittables.push({pos:new V3(b.x,b.y+0.4,b.z),r:1.0,push:false,alive:()=>!B.gone,onHit:h=>{B.hp--;SFX.knock();burst(new V3(b.x,b.y+0.5,b.z),0xe0dcc8,6,2);floatText(new V3(b.x,b.y+1.4,b.z),B.hp>0?'Тук!':'','#ffffff');if(B.hp<=0)knockBarn(B);}});
    return B;});
  function knockBarn(B){if(B.gone)return;B.gone=true;SFX.brk();anim(0.6,k=>{B.g.scale.setScalar(1-k);B.g.position.y=B.y+k*0.6;});later(0.6,()=>{B.g.visible=false;if(B.mk)B.mk.visible=false;});for(let i=0;i<10;i++)burst(new V3(B.x,B.y+0.5,B.z),0xe0dcc8,3,3);
    floatText(new V3(B.x,B.y+1.6,B.z),'Морской жёлудь — долой!','#ffe08a');
    if(BARN.every(b=>b.gone)&&!F.plough){F.plough=true;later(0.6,()=>{say('pahar','Ай да детки! Пошла соха, пошла родимая! Проходите, путь открыт!',3.4);SFX.gate();anim(1.4,k=>{fence.position.y=-2.2*k;});fenceCol.on=false;
      plows.forEach(p=>{anim(5,k=>{p.H.g.position.z=p.z-2.6-k*3;p.pl.position.z=p.z-k*3;p.man.g.position.z=p.z+1.3-k*3;});});});}
    else if(!B.high){const p=plows.find(q=>Math.abs(q.x-B.x)<0.1);if(p){p.free=true;anim(1.2,k=>{p.H.nk.rotation.x=Math.sin(k*Math.PI*4)*0.3;});}}}
  const fence=new THREE.Group();W.group.add(fence);for(let x=-7.2;x<=9.6;x+=0.55)addMesh(new THREE.CylinderGeometry(0.06,0.07,1.6,5),M(0x8a6a44),x,5.3,-263.6,fence);for(const y of[4.9,5.6])addMesh(new THREE.BoxGeometry(17,0.08,0.1),M(0x8a6a44),1.2,y,-263.6,fence);
  const fenceCol=colBox(-7.4,10,4.5,6.4,-263.9,-263.3,false);
  const YW={t:5,ph:'calm'};const gullsL=[chaika22(2,-222,4.5,{leash:12}),chaika22(-3,-250,4.5,{leash:12})];
  const nutField=nutItem(9.2,5.1,-255);
  /* ---------- 8. «между глаз мальчишки пляшут»: хоровод, плясовые камни — прыгай в такт ---------- */
  ground(-10,10,-304,-266,4.5,hump,skinSide);
  const eyesE=[eye22(-11.6,4.4,-284,2.0,-1),eye22(11.6,4.4,-284,2.0,1)];
  const DC={x:0,z:-284,beat:0,bt:1.15,score:[0,0],need:6,done:false,on:false,stones:[],boys:[]};
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2,x=Math.sin(a)*5.4,z=DC.z+Math.cos(a)*5.4;const g=new THREE.Group();g.position.set(x,4.5,z);W.group.add(g);const mat=M(0xd8c8a8,{emissive:0xffffff,emissiveIntensity:0});
    addMesh(new THREE.CylinderGeometry(0.85,0.95,0.16,14),mat,0,0.08,0,g);g.traverse(c=>{c.userData.noBatch=true;});DC.stones.push({i,x,z,g,mat,lit:-1});}
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2;DC.boys.push(folk22(Math.sin(a)*2.0,4.5,DC.z+Math.cos(a)*2.0,{kind:'boy',s:0.75,who:i===0?'malec':null,ry:a+Math.PI/2}));}
  const foreCol=colBox(-10,10,4.5,6.6,-303.6,-303,false);const fore=new THREE.Group();W.group.add(fore);for(let x=-9.6;x<=9.6;x+=0.8){addMesh(new THREE.CylinderGeometry(0.05,0.05,1.5,5),M(0xd8b050),x,5.25,-303.3,fore);}
  for(const y of[5.0,5.8])addMesh(new THREE.BoxGeometry(19.6,0.06,0.06),M(0xd03a3a),0,y,-303.3,fore);
  /* ---------- 9. «а в дубраве, меж усов, ищут девушки грибов» ---------- */
  ground(-10,10,-356,-304,4.5,M(0x6aa060),skinSide);
  {let sd=3131;const rr=(a,b)=>{sd=(sd*16807)%2147483647;return a+(b-a)*sd/2147483647;};for(let i=0;i<12;i++){const x=rr(-9,9),z=rr(-352,-308);if(Math.abs(x)<2.4)continue;oak22(x,4.5,z,rr(0.8,1.15));}}
  for(let i=0;i<5;i++){const z=-310-i*9;whisker22([[-13,4,z+2],[-6,9.5+i%2,z],[0,10.6,z-1.5],[6,9.6,z-0.5],[13,4.2,z+1.5]]);}
  const girls=[folk22(-4,4.5,-314,{kind:'girl',basket:true,who:'devica',scarf:0xff6a8a,ry:0.6}),folk22(5,4.5,-326,{kind:'girl',basket:true,scarf:0xffd040,ry:-0.8}),folk22(-3,4.5,-340,{kind:'girl',basket:true,scarf:0x8ad0ff,ry:0.3})];
  const MUSH=[[-7,-312,1],[6.5,-317,1],[-2,-321,0],[8,-330,1],[-8,-333,1],[3,-338,0],[-5.5,-345,1],[7.5,-346,1],[0.5,-349,0]].map(([x,z,real])=>{const g=new THREE.Group();g.position.set(x,4.5,z);W.group.add(g);g.visible=false;
    addMesh(new THREE.CylinderGeometry(0.1,0.13,0.35,7),M(0xf0e8d8),0,0.17,0,g);const cap=addMesh(new THREE.SphereGeometry(0.32,10,8,0,Math.PI*2,0,Math.PI/2),M(real?0x9a5a2a:0xe02a2a),0,0.32,0,g);cap.scale.y=0.7;
    if(!real)for(let k=0;k<5;k++)addMesh(new THREE.SphereGeometry(0.05,5,4),M(0xffffff),Math.cos(k*1.3)*0.18,0.48,Math.sin(k*1.3)*0.18,g);
    const glow=addMesh(new THREE.TorusGeometry(0.5,0.05,6,16),MB(real?0xffe08a:0xff5a5a,{transparent:true,opacity:0}),0,0.06,0,g);glow.rotation.x=Math.PI/2;g.traverse(c=>{c.userData.noBatch=true;});
    return {x,z,real:!!real,g,glow,got:false,seen:0};});
  const GR={got:0,need:5,done:false};
  const curtain=new THREE.Group();W.group.add(curtain);for(let x=-9.6;x<=9.6;x+=0.45){const h=rand(3.6,5.4);addMesh(new THREE.CylinderGeometry(0.06,0.03,h,4),M(0x2a3448),x,4.5+h/2,-355.4+rand(-0.2,0.2),curtain);}
  const curtCol=colBox(-10,10,4.5,10,-355.8,-355,false);
  const nutGrove=nutItem(-9.2,5.1,-330);
  /* ---------- 10. голова: кит икает — и ныряет; на макушке — колыбельная в два голоса ---------- */
  ground(-10,10,-394,-356,4.5,M(0x6a7a96),skinSide);box(-10,10,4.5,5.5,-400,-394,M(0x6a7a96));box(-10,10,4.5,6.5,-406,-400,M(0x6a7a96));box(-10,10,4.5,7.5,-412,-406,M(0x6a7a96));box(-10,10,4.5,8.5,-424,-412,M(0x6a7a96));
  colBox(-10.6,-10,-12,30,-430,-350,false);colBox(10,10.6,-12,30,-430,-350,false);colBox(-10.6,10.6,-12,12.5,-424.6,-424,false);   // на макушке стены выше: с 8.5 м через обычные не перешагнуть
  for(let i=0;i<10;i++)addMesh(new THREE.CylinderGeometry(0.04,0.04,2.4,5),M(0x3a4050),rand(-9,9),5.5,rand(-392,-370)).rotation.z=rand(-0.5,0.5);   // щетинки
  const BH2={x:0,z:-419};addMesh(new THREE.CylinderGeometry(0.9,1.1,0.12,16),M(0x2a3040),BH2.x,8.53,BH2.z).receiveShadow=true;
  const col2=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.9,1,14,1,true),MB(0xe8f8ff,{transparent:true,opacity:0.5,side:THREE.DoubleSide,depthWrite:false}));col2.position.set(BH2.x,8.5,BH2.z);col2.visible=false;W.group.add(col2);
  const glint=new THREE.Mesh(new THREE.OctahedronGeometry(0.22),MB(0xffe08a));glint.visible=false;W.group.add(glint);
  // колыбельная в три куплета: 1) в лад с дыханием — волна от дыхала дошла до круга у ракушек, играй обе разом (3 строки);
  // 2) сонные звёздочки — видны лишь Совиным взором Пелагеи, ловить прыжком, летят киту в глаза (4 штуки);
  // 3) в четыре голоса — из макушки подымаются ещё две ракушки, все четыре звучат разом (оставленные держат напев) 3 с
  const LS={stage:0,per:4.6,bt:0,tb:-99,judged:true,toned:false,lines:0,got:0,lonT:0};
  const LUL=[0,1,2,3].map(i=>({i,hum:0,press:-99,off:i>1,ring(h){const was=this.hum;this.press=G.time;this.hum=LS.stage===3?6:1.0;if(was<=0)[60,64,67,72].forEach((m,k)=>gusli(m+[0,-5,4,-8][i],k*0.18,0.1));}}));
  const lulShells=[[-3.6,-419],[3.6,-419],[0,-414.6],[0,-423.2]].map(([x,z],i)=>kwShell('dance',x,z,8.5,LUL[i],{ry:Math.PI,say:['Спи, кит, спи…','Баю-бай, кит…','Сон да дрёма…','Тише, море…'][i]}));
  lulShells.forEach(S=>{S.g.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;});});   // светятся в лад и подымаются — не в пачку
  lulShells.slice(2).forEach(S=>{S.g.position.y=8.5-2.4;});   // третья и четвёртая — до последнего куплета спрятаны в макушке
  // волна дыхания: кольцо бежит от дыхала; бледный круг через обе ракушки — где играть
  const lulRing=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,48),MB(0xfff0b0,{transparent:true,opacity:0,depthWrite:false}));lulRing.rotation.x=Math.PI/2;lulRing.position.set(BH2.x,8.62,BH2.z);lulRing.visible=false;W.group.add(lulRing);
  const lulMark=new THREE.Mesh(new THREE.TorusGeometry(3.6,0.05,4,64),MB(0xffe08a,{transparent:true,opacity:0.22,depthWrite:false}));lulMark.rotation.x=Math.PI/2;lulMark.position.set(BH2.x,8.58,BH2.z);lulMark.visible=false;W.group.add(lulMark);
  [lulRing,lulMark].forEach(m=>{m.userData.noBatch=true;});
  const STARS=[0,1,2,3].map(i=>{const g=new THREE.Group();W.group.add(g);g.visible=false;const st=addMesh(new THREE.OctahedronGeometry(0.3),MB(0xfff2a0),0,0,0,g);
    const halo=addMesh(new THREE.SphereGeometry(0.55,10,8),MB(0xffe08a,{transparent:true,opacity:0.25,depthWrite:false}),0,0,0,g);g.traverse(c=>{c.userData.noBatch=true;});
    return {i,g,st,halo,a:i/4*Math.PI*2+0.4,r:[4.4,3.0,4.6,3.4][i],y:11.0,seen:0,got:false};});
  const LYR=['Баю-баю, Рыба-кит, — море тихо говорит.','Спят на ниве мужички, спят в дубраве боровички.','Спят мальчишки меж бровей — спи и ты, кит, поскорей!'];
  const headEye=eye22(12.8,6.6,-416,2.2,1);
  const gullsH=[];const FN={dive:false,lull:0,done:false};
  // облако над головой — сюда фонтан донесёт героев; там звено
  const cloudG=new THREE.Group();W.group.add(cloudG);for(let i=0;i<14;i++)addMesh(new THREE.SphereGeometry(rand(1.4,2.4),10,8),MB(0xffffff,{transparent:true,opacity:0.95}),rand(-5,5),21.4+rand(-0.4,0.3),-438+rand(-5,5),cloudG).castShadow=false;
  colBox(-6,6,21,22,-444,-432,false);{const cm=MB(0xffffff,{transparent:true,opacity:0.96});for(let x=-5.2;x<=5.2;x+=1.7)for(let z=-443.2;z<=-432.8;z+=1.7){const r=rand(1.0,1.5);addMesh(new THREE.SphereGeometry(r,10,8),cm,x+rand(-0.4,0.4),22-r+rand(0.15,0.45),z+rand(-0.4,0.4),cloudG).castShadow=false;}}   /* облако: невидимая опора, сверху — пушистые клубы */const endLink=linkItem(0,23.2,-438);const nutCloud=nutItem(4.2,22.6,-441);
  const RAIN=rainbow22(0,8.5,-428,13);RAIN.visible=false;RAIN.scale.setScalar(0.01);
  const fountainCol=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.6,1,18,1,true),MB(0xe8f8ff,{transparent:true,opacity:0.6,side:THREE.DoubleSide,depthWrite:false}));fountainCol.visible=false;fountainCol.position.set(BH2.x,8.5,BH2.z);W.group.add(fountainCol);
  const B={t:0,popped:[false,false]};const fglint=new THREE.Mesh(new THREE.OctahedronGeometry(0.16),MB(0xffe08a));fglint.visible=false;W.group.add(fglint);   // в фонтане мелькает золото
  function bylina(){const T=HERO;
    play({dur:12.4,fov:48,shots:[shot(0,[2.6,1.9,3.2],[T.potap.pos.x,1.3,T.potap.pos.z]),shot(6,[0,4,10],[0,1,0]),shot(8.2,[1.8,1.8,2.2],[T.potap.pos.x,1.4,T.potap.pos.z])],
      says:[[0.3,2.6,'potap','Как говаривал Илья…'],[3.1,2.4,'potap','Илья… какой Илья?'],[5.8,2.4,null,'<i>Потап молчит — долго, тяжело.</i>',true],[8.3,2.8,'potap','Забыл. Совсем забыл, как сказка эта начинается…'],[11.1,1.4,null,'<i>Никто не смеётся. Грустно всем немножко.</i>',true]],
      events:[{t:0,fn:()=>{T.potap.face=Math.PI*0.2;}},{t:5.8,fn:()=>{T.potap.face=Math.PI;}}],end:()=>{later(0.6,()=>say('zven','Рыба-кит! Тише — спит он. Вода тут одна на всех!',2.8,true));}});}
  W.onWater=(z,st)=>{if(z===Z2&&st==='high'&&!F.hiTold){F.hiTold=true;bark(HERO.pelageya,'pelageya','Погоди, я пройду… Всё, давай, твой черёд!',2.4);}};
  W.updates.push(dt=>{
    // ворота к фонтану: открываются, когда оба сделали своё
    if(!G2.open&&F.mast&&F.garden){G2.open=true;SFX.gate();SFX.ok();g2col.on=false;anim(1.2,k=>{g2.position.y=-3.4*smooth(k);});banner('Ворота открыты!','#ffffff',1.8,'договорились — и прошли вдвоём');}
    if(plateG.done&&!F.garden){F.garden=true;wgate.latched=true;SFX.ok();floatText(new V3(8,1.8,-45.5),'Калитка открыта!','#ffffff');}
    // фонтан дыхания — в лад с китом: два пузыря-отсчёта лопаются перед выдохом, на выдохе бьёт фонтан
    const t=((WB.t-(WB.per-7.5))%WB.per+WB.per)%WB.per,hi=Z3.level>Z3.floor+1.2,wl=Math.max(0,Z3.level);
    bubs.forEach((m,i)=>{const pop=3.5+i;const vis=t<pop;if(vis&&B.popped[i]&&t<1)B.popped[i]=false;m.visible=vis;if(vis)m.scale.setScalar(Math.min(1,t/1.2)*(1+0.06*Math.sin(G.time*6)));
      if(!vis&&!B.popped[i]){B.popped[i]=true;tone(1400-i*300,0.12,'sine',0.25,500);burst(m.position.clone(),0xe8fcff,10,3);}});
    const ex=t>5.5&&t<8.5;col.visible=ex;fglint.visible=ex&&hi;if(ex){const H=hi?6.4:1.2,k=Math.min(1,(t-5.5)/0.3)*(t>8.2?(8.5-t)/0.3:1);col.scale.set(1,Math.max(0.01,H*k),1);col.position.y=wl+H*k/2;fglint.position.set(BH.x+Math.sin(G.time*5)*0.3,wl+H*k*0.75,BH.z);fglint.rotation.y+=0.2;
      if(!B.sfx){B.sfx=true;SFX.whoosh();SFX.splash();}
      for(const h of HEROES){if(h.cling||(h.launchT&&G.time-h.launchT<1.2))continue;if(hd(h.pos,BH)<1.5&&h.pos.y<wl+0.6&&h.grounded){h.launchT=G.time;h.vel.y=Math.sqrt(2*GRAV*(hi?6.2:1.1));h.vel.z=hi?-(-62.4-1.4-h.pos.z)/-1.05:0;h.vel.x=-h.pos.x*0.9;h.grounded=false;h.groundRef=null;h.tossT=1.4;h.aimT=hi?1.1:0;h.following=false;
        floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),hi?'До облаков!':'Плюх…',hi?'#ffffff':'#cfe8ff');if(!hi&&!F.lowTold){F.lowTold=true;tip(h.player,'В отлив фонтан еле плещет. Прилив сыграйте, как кит выдыхает!',3);}}}}
    else B.sfx=false;
    flag.rotation.y=Math.sin(G.time*2)*0.3;});
  W.hittables.push({pos:new V3(-6.5,3.3,-36),r:1.0,push:false,alive:()=>!F.mast,onHit:h=>{if(h.pos.y<2.9)return;F.mast=true;SFX.latch();SFX.ok();anim(0.8,k=>{rope.scale.y=1-0.5*k;flag.position.y=5.3-2*k;});
    banner('Сходни опущены!','#ffffff',1.6,'верёвку дёрнули — ворота наполовину открыты');}});
  /* ---------- щука, печка, икота ---------- */
  function pikeScene(b,h){F.pikeFree=true;const P=HERO.potap;
    play({dur:12.6,fov:48,shots:[shot(0,[b.x+2.6,6.6,b.z+3.2],[b.x,5.2,b.z]),shot(3.6,[3.4,6.4,-82.6],[0,3.6,-90]),shot(8.4,[-3.6,6.4,-80.8],[-7.8,5.6,-85])],
      says:[[0.3,3,null,'<i>Потап ведро поднимает — а в нём щука, зубастая, с венчиком.</i>',true],[3.6,4.4,'shchuka','Отпусти меня в пруд! Слово тебе дам: скажешь «По щучьему велению, по моему хотению» — всё сделается.'],
        [8.3,3.8,'potap','По щучьему велению, по моему хотению — ступай, печка, сама к голове кита!']],
      events:[{t:0.5,fn:()=>{anim(1.2,k=>{b.g.position.y=4.5+Math.sin(k*Math.PI)*0.8;b.g.rotation.z=k*1.1*(b.x<0?-1:1);});}},
        {t:1.6,fn:()=>{pikeFish.g.visible=true;const a=new V3(b.x,5.6,b.z),to=new V3(0,PZ.level,-90);anim(1.3,k=>{pikeFish.g.position.lerpVectors(a,to,k);pikeFish.g.position.y+=Math.sin(k*Math.PI)*2.2;pikeFish.g.rotation.x=k*3;});
          later(1.3,()=>{SFX.splash();for(let i=0;i<10;i++)burst(new V3(rand(-1,1),PZ.level+0.3,-90+rand(-1,1)),0xcff8ff,3,3);pikeFish.g.rotation.x=0;});}},
        {t:3.4,fn:()=>{anim(0.8,k=>{pikeFish.g.position.y=PZ.level+0.3+k*0.5;});}},
        {t:9.4,fn:()=>{SFX.ok();STV.state='out';}}],
      tick:(t)=>{if(t>3.4){pikeFish.g.rotation.z=Math.sin(t*3)*0.12;pikeFish.tail.rotation.y=Math.sin(t*9)*0.4;}},
      end:()=>{STV.state=STV.state==='home'?'out':STV.state;anim(1.2,k=>{pikeFish.g.position.y=PZ.level+0.8-k*1.6;});later(1.3,()=>{pikeFish.g.visible=false;});
        banner('По щучьему велению!','#9fe6ff',2.6,'печка сама едет к хребту — садитесь на неё оба');}});}
  W.updates.push(dt=>{
    for(const lp of LILY)lp.position.y=Math.max(2.45,PZ.level+0.02);
    // ведро со щукой светится под Совиным взором
    for(const b of BUCK){b.glow.material.opacity=b.pike&&W.owlT>0&&!F.pikeFree?0.6+0.35*Math.sin(G.time*8):0;if(b.pike&&W.owlT>0&&!F.pikeFree&&Math.random()<dt*8)burst(new V3(b.x,5.6,b.z),0xffe08a,2,1.2,0.5);}
    // печка
    if(STV.state==='out'){const to=pathAt(0);const dx=to[0]-STV.x,dz=to[1]-STV.z,d=Math.hypot(dx,dz);if(d<0.05){STV.state='wait';}else{const st=Math.min(d,3.4*dt);stovePlace(STV.x+dx/d*st,STV.z+dz/d*st,Math.atan2(dx,dz));}}
    const ctl=[0,1].filter(pi=>!G.solo||pi===G.soloPi).map(pi=>active(pi));const aboard=h=>h.groundRef===STV.col;
    if(STV.state==='wait'&&ctl.every(aboard)){STV.state='ride';SFX.ok();banner('Печка, поезжай!','#ffd9a0',1.8,'раки на дороге — гоните их; волна — щит '+K(0,'guard')+' / '+K(1,'guard')+' или прыжок');
      STV.crabs=[crab(-1.6,-111,null,{y:4.5,leash:2.4}),crab(1.4,-127,null,{y:4.5,leash:2.4})];for(const e of STV.crabs)e.stove=true;}
    if(STV.state==='ride'){const p0=pathAt(STV.s);const block=STV.crabs.find(e=>e.alive&&Math.hypot(e.pos.x-p0[0],e.pos.z-p0[1])<3.6&&e.pos.z<p0[1]+0.5);
      if(block){if(STV.stopT<=0)floatText(new V3(p0[0],7.4,p0[1]),'Рак дорогу загородил!','#ffb0a0');STV.stopT=1;}else STV.stopT=Math.max(0,STV.stopT-dt);
      if(!block)STV.s=Math.min(PL,STV.s+2.3*dt);const p=pathAt(STV.s);stovePlace(p[0],p[1],p[2]);
      // волна дыхания кита: знак за 1,2 с, потом гребень поперёк печки
      STV.waveT-=dt;if(STV.waveT<=0&&!STV.wave&&STV.s<PL-3){STV.waveT=5.2;const sd=Math.random()<0.5?-1:1;const m=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.9,3.8),MB(0xe8fbff,{transparent:true,opacity:0}));m.renderOrder=6;W.group.add(m);
        STV.wave={sd,t:-1.2,m};SFX.wave();floatText(new V3(p[0]+sd*2.6,7.6,p[1]),'Волна! Держись!','#cff8ff');}
      if(STV.wave){const w=STV.wave;w.t+=dt;const x=p[0]+w.sd*(4.2-w.t*7.5);w.m.position.set(x,5.95,p[1]);w.m.material.opacity=w.t<0?0.25+0.2*Math.sin(G.time*16):0.75;
        if(w.t>=0)for(const h of HEROES){if(!aboard(h)||h.cling||h.guard)continue;if(Math.abs(h.pos.x-x)<0.65&&h.pos.y<5.5+0.85){h.vel.z=6.5;h.vel.y=5;h.vel.x=0;h.grounded=false;h.groundRef=null;SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Смыло! Догоняй!','#cff8ff');}}
        if(w.t>1.2){W.group.remove(w.m);STV.wave=null;}}
      STV.smoke-=dt;if(STV.smoke<=0){STV.smoke=0.25;burst(stove.chim.getWorldPosition(new V3()),0xd8d8d8,2,1.2,0.9);}
      if(STV.s>=PL&&!STV.crabs.some(e=>e.alive)){STV.state='done';F.stove='done';SFX.ok();banner('Приехали!','#ffd9a0',1.8,'дальше — бока кита: частокол в рёбрах');if(STV.wave){W.group.remove(STV.wave.m);STV.wave=null;}}}
    stove.face.rotation.z=STV.state==='ride'?Math.sin(G.time*6)*0.05:0;});
  W.onOwl=h=>{if(hd(h.pos,{x:0,z:-330})<26&&!GR.done)for(const m of MUSH)if(!m.got)m.seen=6;if(!F.pikeFree&&hd(h.pos,{x:0,z:-89})<14)later(0.3,()=>floatText(new V3(BUCK[PIKE_AT].x,6.4,BUCK[PIKE_AT].z),'Тут щука!','#e7c3ff'));};
  /* ---------- ролики нового пути ---------- */
  function kitIntro(){const T=HERO;
    play({dur:12.6,fov:50,shots:[shot(0,[34,26,-60],[0,2,-120],[-30,30,-210],[0,2,-280],7),shot(7,[6,9,52],[0,2,30])],
      says:[[0.3,6.4,null,'<i>Поперёк моря лежит Чудо-юдо Рыба-кит: все бока его изрыты, частоколы в рёбра вбиты,</i><br><i>на хвосте сыр-бор шумит, на спине село стоит, мужички на губе пашут, между глаз мальчишки пляшут…</i>',true],
        [7,4.6,null,'<i>…а в дубраве, меж усов, ищут девушки грибов. Десять лет лежит кит — и дышит тяжко.</i>',true]],
      events:[{t:2.5,fn:()=>{WB.t=WB.per-4.5;}}],end:()=>{later(0.4,bylina);}});}
