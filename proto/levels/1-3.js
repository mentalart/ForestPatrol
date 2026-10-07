/* ============================== 1-3 «КОЛОБОК» — гусельный уровень ============================== */
// «Ах вы, сени, мои сени» · пять частей: опушка (96), речка (104), лисья тропа (112), волчья чаща (116, бой на бегу), гуси-лебеди (120, бой в полёте) · пляска на гуслях в три стадии
const LADWIN={easy:0.15,mid:0.10,hard:0.06};   // окно попадания в долю, с
// мелодия-заглушка (гусли): по две восьмые на долю; бас — на долю
const SONG_V=[[74,74],[76,74],[72,71],[69,0],[71,72],[74,72],[71,69],[67,0],[74,74],[76,74],[72,71],[69,71],[72,71],[69,66],[67,0],[67,0]];
const SONG_C=[[79,78],[76,74],[76,78],[79,0],[79,78],[76,74],[72,71],[69,0],[71,72],[74,76],[74,72],[71,69],[71,72],[69,66],[67,0],[67,0]];
const SONG_BASS=[43,50,43,50,48,55,43,50,43,50,48,55,50,45,43,43];
const mf=m=>440*Math.pow(2,(m-69)/12);
function gusli(m,delay,v){if(!m)return;const f=mf(m);tone(f,0.42,'triangle',v||0.16,f*0.995,delay);tone(f*2,0.22,'sine',(v||0.16)*0.35,null,delay);}
function makeBeast(kind){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);
  part(body,new THREE.SphereGeometry(0.5,14,10),M(0x4a2440),0,0.55,0);for(let i=0;i<7;i++){const t=part(body,new THREE.TorusGeometry(rand(0.48,0.58),0.03,5,22),M([0x9a4482,0x5a2a6a,0xb0609a][i%3]),0,0.55,0);t.rotation.set(rand(0,3),rand(0,3),rand(0,3));}
  const eye=M(0xfff3a0,{emissive:0xfff3a0,emissiveIntensity:1});for(const s of[-1,1])part(body,new THREE.SphereGeometry(0.08,8,6),eye,s*0.16,0.68,0.42);
  const hat=new THREE.Group();hat.position.y=0.95;body.add(hat);
  if(kind==='hare'){const c=M(0xd8d4cc);part(hat,new THREE.CylinderGeometry(0.34,0.38,0.14,12),c,0,0,0);for(const s of[-1,1]){const e=part(hat,new THREE.CylinderGeometry(0.07,0.1,0.7,6),c,s*0.15,0.38,0);e.rotation.z=-s*0.15;part(hat,new THREE.BoxGeometry(0.06,0.5,0.02),M(0xf0a0b0),s*0.15,0.4,0.07).rotation.z=-s*0.15;}}
  else if(kind==='wolf'){const c=M(0x7a7a84);part(hat,new THREE.CylinderGeometry(0.36,0.4,0.16,12),c,0,0,0);for(const s of[-1,1]){const e=part(hat,new THREE.ConeGeometry(0.12,0.34,4),c,s*0.2,0.22,0);e.rotation.z=-s*0.2;}
    const sn=new THREE.ConeGeometry(0.14,0.4,6);sn.rotateX(Math.PI/2);part(hat,sn,c,0,-0.05,0.38);}
  else{const c=M(0x7a5234);part(hat,new THREE.SphereGeometry(0.4,12,8,0,Math.PI*2,0,Math.PI/2),c,0,-0.05,0);for(const s of[-1,1])part(hat,new THREE.SphereGeometry(0.12,8,6),c,s*0.28,0.26,0);}
  const ringM=MB(COL.yellow,{transparent:true,opacity:0.9});const ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.06,6,30),ringM);ring.position.y=2.0;g.add(ring);
  const sun=new THREE.Mesh(new THREE.SphereGeometry(0.2,12,10),M(COL.yellow,{emissive:COL.yellow,emissiveIntensity:1.3}));sun.position.y=2.0;g.add(sun);
  return {g,body,ring,ringM,sun};}
function makeRunFox(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const o=M(0xe0782a),wt=M(0xfff4e8),dk=M(0x2a1a10);
  const tor=part(body,new THREE.SphereGeometry(0.42,12,10),o,0,0.55,0);tor.scale.set(0.8,0.75,1.35);part(body,new THREE.SphereGeometry(0.26,10,8),wt,0,0.5,0.32).scale.set(0.9,0.8,1);
  const head=new THREE.Group();head.position.set(0,0.85,0.55);body.add(head);part(head,new THREE.SphereGeometry(0.26,12,10),o,0,0,0);
  const sn=new THREE.ConeGeometry(0.13,0.34,8);sn.rotateX(Math.PI/2);part(head,sn,wt,0,-0.06,0.28);part(head,new THREE.SphereGeometry(0.05,6,5),dk,0,-0.04,0.46);
  for(const s of[-1,1]){const e=part(head,new THREE.ConeGeometry(0.1,0.28,4),o,s*0.14,0.26,-0.02);e.rotation.z=-s*0.25;part(head,new THREE.SphereGeometry(0.045,6,5),dk,s*0.1,0.06,0.2);}
  const tail=new THREE.Group();tail.position.set(0,0.62,-0.5);body.add(tail);const tc=new THREE.ConeGeometry(0.2,0.9,8);tc.rotateX(-Math.PI/2);part(tail,tc,o,0,0.1,-0.4);part(tail,new THREE.SphereGeometry(0.13,8,6),wt,0,0.1,-0.86);
  const legs=[];for(const[x,z]of[[-0.16,0.32],[0.16,0.32],[-0.16,-0.3],[0.16,-0.3]]){const l=new THREE.Group();l.position.set(x,0.42,z);body.add(l);part(l,new THREE.CylinderGeometry(0.05,0.05,0.4,6),dk,0,-0.2,0);legs.push(l);}
  return {g,body,head,tail,legs};}
function makeRunGoose(){const g=new THREE.Group();W.group.add(g);const w=M(0xffffff),or=M(0xff9a2a);
  part(g,new THREE.SphereGeometry(0.45,12,10),w,0,0,0).scale.set(0.9,0.6,1.5);const neck=part(g,new THREE.CylinderGeometry(0.08,0.11,0.8,8),w,0,0.35,0.62);neck.rotation.x=0.5;
  part(g,new THREE.SphereGeometry(0.15,10,8),w,0,0.72,0.86);const bk=new THREE.ConeGeometry(0.06,0.24,6);bk.rotateX(Math.PI/2);part(g,bk,or,0,0.68,1.06);
  const wings=[-1,1].map(s=>{const p=new THREE.Group();p.position.set(s*0.3,0.12,0);g.add(p);part(p,new THREE.BoxGeometry(1.3,0.05,0.6),w,s*0.65,0,0);return p;});
  return {g,wings};}
function build13(){W.soloMirror=true;
  W.zvenAway=true;   // Звенышко улетает вперёд и появляется, только когда нужно
  setTheme('forest');W.name='1-3 · «Колобок»';W.sub='Дремучий лес · гусельный раннер · «Ах вы, сени, мои сени» · пять частей и пляска';W.camX=8;const F=W.flags;
  // пять частей: у каждой свой темп, скорость, погода и своя новая штука; четвёртая и пятая — бой на бегу и в полёте
  const PARTS=[{name:'Солнечная опушка',short:'Опушка',bpm:96,speed:4.4,tr:0,sky:0x8fd0f0,fog:0xa8dcec,sunC:0xfff4dc,sunI:1.0,amb:0.72,
      sub:'подкова-магнит искры тянет · гриб-прыгун подкидывает'},
    {name:'Через речку',short:'Речка',bpm:104,speed:5.2,tr:2,sky:0x78c4ec,fog:0x96d2ee,sunC:0xfff0d0,sunI:0.95,amb:0.7,
      sub:'в мосту дыры · бочки катятся навстречу · перо схвати — гусь понесёт!'},
    {name:'Лисья тропа',short:'Лисья тропа',bpm:112,speed:6.2,tr:4,sky:0xf2a262,fog:0xe8a070,sunC:0xffb070,sunI:0.85,amb:0.62,
      sub:'сзади лиса крадётся — не споткнись, не упади!'},
    {name:'Волчья чаща',short:'Чаща',bpm:116,speed:6.4,tr:5,sky:0x4a6a5a,fog:0x5a7a66,sunC:0xc8e0c0,sunI:0.7,amb:0.58,
      sub:'красный круг — на другую дорожку или кувырком · жёлтый — щит в такт, потом бей · кабан — прыжком'},
    {name:'Гуси-лебеди',short:'Гуси',bpm:120,speed:7.2,tr:7,sky:0xf0b890,fog:0xf4c8a0,sunC:0xffe0b0,sunI:0.95,amb:0.7,
      sub:'летим на гусях! ворона красная — вбок · коршун жёлтый — щит в такт и бей · туча — облети · вожак — щит вдвоём'}];
  const PB=32,END=160,LANES=[[-5.2,-3.2,-1.2],[1.2,3.2,5.2]];
  const mir=(pi,l)=>pi?2-l:l;   // у второго игрока дорожки зеркально: 0 — у края тропы
  const NP=PARTS.length,partOf=k=>clamp(Math.floor(k/PB),0,NP-1);
  const BT={};{let t=0;BT[0]=0;for(let k=1;k<=END+12;k++){t+=60/PARTS[partOf(k-1)].bpm;BT[k]=t;}for(let k=-1;k>=-8;k--)BT[k]=k*60/PARTS[0].bpm;}
  const PT=[],PZ=[];for(let p=0;p<NP;p++){PT.push(BT[p*PB]);PZ.push(p?PZ[p-1]-(PT[p]-PT[p-1])*PARTS[p-1].speed:0);}
  const partAtT=t=>{let p=0;while(p+1<NP&&t>=PT[p+1])p++;return p;};
  const zAt=t=>{const p=partAtT(t);return PZ[p]-(t-PT[p])*PARTS[p].speed;};
  const zK=k=>zAt(BT[k]);
  const Z1=PZ[1],Z2=PZ[2],Z3=PZ[3],Z4=PZ[4],ZE=zK(END),ZM=zK(END-5);   // ZM — луг, куда садятся гуси
  scene.background=new THREE.Color(PARTS[0].sky);scene.fog=new THREE.Fog(PARTS[0].fog,30,95);sun.color.set(PARTS[0].sunC);sun.intensity=PARTS[0].sunI;amb.intensity=PARTS[0].amb;
  /* ---------- мир: опушка → мост через речку → лисья тропа → волчья чаща → обрыв и долина (летим) → луг ---------- */
  const ZF=ZE-34;
  ground(-9,9,Z1-2,22);colBox(-9,9,-4,0,Z2+2,Z1-2,false);ground(-9,9,Z3,Z2+2,0,M(0x7a8a3a));ground(-9,9,Z4,Z3,0,M(0x3f5a34));ground(-9,9,ZF,ZM,0,M(0x8aa84a));
  wall(-9.2,-9,ZF,22);wall(9,9.2,ZF,22);wall(-9.2,9.2,22,22.2);wall(-9.2,9.2,ZF-0.2,ZF);
  const pathM=M(0xc8a060),pathM2=M(0x9a7248),pathM3=M(0x6a5a3a);
  {const p=new THREE.Mesh(new THREE.PlaneGeometry(13.4,24-Z1),pathM);p.rotation.x=-Math.PI/2;p.position.set(0,0.015,(22+Z1-2)/2);p.receiveShadow=true;W.group.add(p);}
  {const L=Z2+2-Z3,p=new THREE.Mesh(new THREE.PlaneGeometry(13.4,L),pathM2);p.rotation.x=-Math.PI/2;p.position.set(0,0.015,(Z2+2+Z3)/2);p.receiveShadow=true;W.group.add(p);}
  {const L=Z3-Z4,p=new THREE.Mesh(new THREE.PlaneGeometry(13.4,L),pathM3);p.rotation.x=-Math.PI/2;p.position.set(0,0.015,(Z3+Z4)/2);p.receiveShadow=true;W.group.add(p);}
  for(const x of[-4.2,-2.2,2.2,4.2]){const l=new THREE.Mesh(new THREE.PlaneGeometry(0.08,22-Z4),MB(0xf0dca0,{transparent:true,opacity:0.45}));l.rotation.x=-Math.PI/2;l.position.set(x,0.03,(22+Z4)/2);W.group.add(l);}
  for(let z=18;z>Z4;z-=1.6){if(z<Z1-2&&z>Z2+2)continue;addMesh(new THREE.SphereGeometry(0.22,6,5),M([0x7ab04a,0x5a9a3a][Math.abs(Math.round(z))%2]),0,0.12,z).scale.y=0.7;}   // межа посередине
  // опушка: берёзы, цветы, бабочки
  edgeTrees(Z1-1,20,-9,9);
  for(let z=10;z>Z1;z-=rand(5,8)){for(const s of[-1,1]){const x=s*rand(7.2,8.6);addMesh(new THREE.CylinderGeometry(0.12,0.15,3.2,7),M(0xf0ece0),x,1.6,z);
      for(let i=0;i<3;i++)addMesh(new THREE.BoxGeometry(0.26,0.04,0.02),MAT.dark,x,0.6+i*0.9,z+0.14);addMesh(new THREE.SphereGeometry(0.9,10,8),M(0x8ac04a),x,3.5,z);}}
  const FLC=[0xff6a8a,0xffd23a,0xffffff,0x9a7aff,0xff9a3a];
  for(let z=16;z>Z1;z-=rand(1.2,2.4))for(const s of[-1,1]){const x=s*rand(6.9,8.8),c=FLC[(Math.random()*FLC.length)|0];
    addMesh(new THREE.CylinderGeometry(0.02,0.02,0.4,4),M(0x3f8a3a),x,0.2,z);addMesh(new THREE.SphereGeometry(0.13,8,6),M(c,{emissive:c,emissiveIntensity:0.15}),x,0.42,z);}
  const flies=[];for(let i=0;i<14;i++){const g=new THREE.Group();W.group.add(g);const c=FLC[i%FLC.length];
    const ws=[-1,1].map(s=>{const w=new THREE.Mesh(new THREE.PlaneGeometry(0.22,0.18),MB(c,{side:THREE.DoubleSide}));w.position.x=s*0.11;g.add(w);return w;});
    g.userData={x:(i%2?1:-1)*rand(6.5,8.5),z:rand(Z1+4,12),ph:rand(0,6.28)};flies.push({g,ws});}
  // речка: вода, мост из досок, перила, камыш, кувшинки, утки
  {const L=Z1-Z2+10,w=new THREE.Mesh(new THREE.PlaneGeometry(120,L),M(0x3a9ad0,{transparent:true,opacity:0.88}));w.rotation.x=-Math.PI/2;w.position.set(0,-0.7,(Z1+Z2)/2);W.group.add(w);}
  ground(-60,-15,Z2+1,Z1-1,-0.2);ground(15,60,Z2+1,Z1-1,-0.2);
  for(let z=Z1-3;z>Z2+3;z-=rand(2.2,3.4))for(const s of[-1,1]){decorFir(s*rand(16,22),z,rand(1.1,2.0),true,-0.2);}
  const plankA=M(0xa8743e),plankB=M(0x94622f);let pi_=0;
  for(let z=Z1-2;z>Z2+2;z-=1.05){addMesh(new THREE.BoxGeometry(13.8,0.12,0.96),(pi_++%2)?plankA:plankB,0,-0.06,z-0.52).castShadow=false;}
  for(let z=Z1-2;z>Z2+2;z-=3){for(const s of[-1,1]){addMesh(new THREE.CylinderGeometry(0.1,0.12,1.2,6),M(0x7a4a24),s*7.0,0.5,z);addMesh(new THREE.CylinderGeometry(0.22,0.26,2.6,8),M(0x5a3a1c),s*6.4,-1.4,z);}}
  for(const s of[-1,1]){const c=new THREE.CylinderGeometry(0.06,0.06,Z1-Z2-4,6);c.rotateX(Math.PI/2);addMesh(c,M(0x8a5a2e),s*7.0,1.05,(Z1+Z2)/2);}
  for(let z=Z1-2;z>Z2+2;z-=rand(1.4,2.6))for(const s of[-1,1]){const x=s*rand(8.2,13);for(let i=0;i<3;i++)addMesh(new THREE.CylinderGeometry(0.025,0.03,rand(0.8,1.5),4),M(0x5a8a3a),x+rand(-0.3,0.3),-0.1,z+rand(-0.3,0.3));
    if(Math.random()<0.5){const l=addMesh(new THREE.CircleGeometry(rand(0.3,0.5),10),M(0x4a9a4a),s*rand(9,14),-0.66,z);l.rotation.x=-Math.PI/2;if(Math.random()<0.3)addMesh(new THREE.SphereGeometry(0.1,8,6),M(0xffc0d8),l.position.x,-0.58,z);}}
  const ducks=[];for(let i=0;i<6;i++){const g=new THREE.Group();W.group.add(g);part(g,new THREE.SphereGeometry(0.28,10,8),M(0xffe070),0,0,0).scale.set(1,0.8,1.3);part(g,new THREE.SphereGeometry(0.16,8,6),M(0xffe070),0,0.25,0.25);
    const bk=new THREE.ConeGeometry(0.05,0.16,5);bk.rotateX(Math.PI/2);part(g,bk,M(0xff8a2a),0,0.22,0.44);g.userData={x:(i%2?1:-1)*rand(10,16),z:rand(Z2+6,Z1-6),ph:rand(0,6.28)};ducks.push(g);}
  // лисья тропа: вечер, рыжие клёны, светлячки
  edgeTrees(Z3+1,Z2+1,-9,9);
  for(let z=Z2-2;z>Z3+4;z-=rand(4,7))for(const s of[-1,1]){const x=s*rand(7.4,8.8);addMesh(new THREE.CylinderGeometry(0.14,0.2,2.6,7),M(0x5a3a22),x,1.3,z);
    const c=[0xe0501e,0xf08a1e,0xc8341e][(Math.random()*3)|0];addMesh(new THREE.SphereGeometry(1.1,10,8),M(c),x,3.1,z).scale.y=0.85;}
  const bugs=[];for(let i=0;i<40;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.06,6,5),MB(0xfff27a));m.userData={x:(i%2?1:-1)*rand(5,9),z:rand(Z3+2,Z2-2),y:rand(0.6,2.6),ph:rand(0,6.28)};W.group.add(m);bugs.push(m);}
  // волчья чаща: тёмные ели стеной, мшистые камни, глаза в кустах
  edgeTrees(Z4+1,Z3+1,-8.6,8.6);for(let z=Z3-2;z>Z4+2;z-=rand(2,3.4))for(const s of[-1,1]){decorFir(s*rand(7.6,8.6),z,rand(1.4,2.2),true);if(Math.random()<0.45)addMesh(new THREE.DodecahedronGeometry(rand(0.4,0.8)),M(0x5a6a50),s*rand(6.8,7.4),0.3,z+rand(-1,1));}
  const eyes=[];for(let i=0;i<18;i++){const g=new THREE.Group();const s=i%2?1:-1;g.position.set(s*rand(7.4,9.5),rand(0.6,1.6),rand(Z4+4,Z3-3));g.rotation.y=-s*Math.PI/2;W.group.add(g);
    for(const dx of[-0.11,0.11])part(g,new THREE.SphereGeometry(0.06,6,5),MB(0xfff27a),dx,0,0);g.userData.ph=rand(0,6.28);eyes.push(g);}
  // обрыв и долина: летим на гусях высоко над рекой и лесом, внизу — облака
  {const cliff=M(0x7a6a52);box(-9,9,-10,0,Z4-0.8,Z4,cliff,{occ:false});box(-9,9,-10,0,ZM,ZM+0.8,cliff,{occ:false});
    const vg=new THREE.Mesh(new THREE.PlaneGeometry(160,Z4-ZM+40),M(0x5a7a3a));vg.rotation.x=-Math.PI/2;vg.position.set(0,-10,(Z4+ZM)/2);W.group.add(vg);
    const rv=new THREE.Mesh(new THREE.PlaneGeometry(10,Z4-ZM+40),M(0x4aa0d8,{emissive:0x1a4a6a,emissiveIntensity:0.3}));rv.rotation.x=-Math.PI/2;rv.rotation.z=0.12;rv.position.set(4,-9.9,(Z4+ZM)/2);W.group.add(rv);
    for(let z=Z4-3;z>ZM+3;z-=rand(1.6,2.6))for(let n=0;n<3;n++)decorFir(rand(-40,40),z+rand(-1,1),rand(1.6,3),true,-10);
    W.puffs=W.puffs||[];for(let z=Z4-4;z>ZM+2;z-=rand(3,5))for(const s of[-1,1])W.puffs.push({x:s*rand(8,16),y:rand(-2.5,0.5),z,s:rand(1.4,2.6)});}
  edgeTrees(ZF+2,ZM-1,-9,9);
  // арки-ворота на входе в каждую часть
  function arch(z,col,lamps){const g=new THREE.Group();g.position.set(0,0,z);W.group.add(g);const wm=M(0x8a5a2e);for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.2,0.24,4.2,8),wm,s*7.4,2.1,0,g);
    const b=new THREE.BoxGeometry(15.4,0.36,0.36);addMesh(b,wm,0,4.2,0,g);
    for(let i=0;i<13;i++){const f=new THREE.Mesh(new THREE.ConeGeometry(0.28,0.6,3),M(col[i%col.length],{emissive:col[i%col.length],emissiveIntensity:0.2}));f.rotation.z=Math.PI;f.position.set(-6.6+i*1.1,3.75,0);g.add(f);}
    if(lamps)for(const s of[-1,1]){const l=addMesh(new THREE.SphereGeometry(0.24,10,8),MB(0xffd070),s*4,3.5,0,g);l.castShadow=false;}return g;}
  arch(-2,[0xff6a8a,0xffd23a,0x6ac0ff]);arch(Z1+1,[0x6ac0ff,0xffffff,0x3a8ad0]);arch(Z2+1,[0xff8a2a,0xc8341e,0xffd23a],true);arch(Z3+1,[0x7a7a84,0x3a5a3a,0xc8341e],true);arch(Z4+1.5,[0xffffff,0xffc0d0,0xffd23a]);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,6);
  const kol=makeKolobok();kol.g.position.set(0,0,-6);
  const foxes=[0,1].map(()=>{const f=makeRunFox();f.g.visible=false;f.d=12;return f;});
  const geese=[0,1].map(()=>{const g=makeRunGoose();g.g.visible=false;return g;});const kgoose=makeRunGoose();kgoose.g.visible=false;   // и Колобку — свой гусь
  const streaks=[];for(let i=0;i<22;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.04,2.4),MB(0xffffff,{transparent:true,opacity:0}));m.userData={x:(i%2?1:-1)*rand(2.5,8),y:rand(0.6,4.5),dz:rand(0,30)};W.group.add(m);streaks.push(m);}
  /* ---------- песня и состояние ---------- */
  const S={t:BT[-4],B:60/PARTS[0].bpm,bph:0,lastK:-5,state:'play',off:[0,0],lane:[1,1],strings:[],beasts:[],obst:[],sparks:[],items:[],picks:[],hits:[[0,0,0,0,0],[0,0,0,0,0]],tries:[[0,0,0,0,0],[0,0,0,0,0]],rep:[0,0,0,0,0],foes:[],parries:[0,0],counters:[0,0],duos:0,skipCheck:-1,
    combo:[0,0],best:[0,0],got:[0,0],fin:null,ft:0,show:true,kolZ:-6,lit:[false,false,false,false],fly:[-1e9,-1e9],mag:[-1e9,-1e9],fox:[0,0],foxK:[0,0],foxOff:false,foxCaught:[0,0],sh:[[0,0,0,0,0],[0,0,0,0,0]],st:[[0,0,0,0,0],[0,0,0,0,0]],part:0,told:[{},{}],finale:[0,0]};S.BT=BT;W.song=S;
  const kinds=['hare','wolf','bear'];
  const laneOf=(pi,x)=>{let b=0,bd=9;LANES[pi].forEach((l,i)=>{const d=Math.abs(l-x);if(d<bd){bd=d;b=i;}});return b;};
  const lx=(pi,l)=>LANES[pi][mir(pi,l)];
  const ph=k=>partOf(Math.floor(k));
  function addString(pi,k,item,lanes){lanes=(lanes||[0,1,2]).map(l=>mir(pi,l)).sort();const z=zK(k),x0=LANES[pi][lanes[0]],x1=LANES[pi][lanes[lanes.length-1]],g=new THREE.Group();g.position.set((x0+x1)/2,0,z);W.group.add(g);
    const w=x1-x0+1.8;for(const s of[-1,1]){addMesh(new THREE.CylinderGeometry(0.06,0.08,0.7,6),M(0x7a5634),s*w/2,0.35,0,g);addMesh(new THREE.BoxGeometry(0.05,0.22,0.1),M(COL.yellow,{emissive:0x806000,emissiveIntensity:0.5}),s*w/2,0.62,0.05,g);}
    const mat=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.7});const c=new THREE.CylinderGeometry(0.035,0.035,w,6);c.rotateZ(Math.PI/2);const str=addMesh(c,mat,0,0.22,0,g);
    const s={pi,k,z,g,str,mat,used:false,vib:0,ph:ph(k),lanes};S.strings.push(s);
    if(item){const it=(item==='link'?linkItem:nutItem)((x0+x1)/2,4.3,z-2.2);S.items.push({it,ph:s.ph,pi,kind:item});s.item=it;}return s;}
  function addBeast(pi,k){const b=makeBeast(kinds[(k/4+pi)%3|0]);const z=zK(k),x0=pi?8:-8;b.g.position.set(x0,0,z);
    const be={pi,k,z,b,res:null,t:0,ph:ph(k),x0,lx:LANES[pi][1]};S.beasts.push(be);return be;}
  function addObst(type,pi,k,lanes){const z=zK(k),g=new THREE.Group();W.group.add(g);const L=LANES[pi];let x=L[1];lanes=(lanes||[0,1,2]).map(l=>mir(pi,l));
    const o={type,pi,k,z,g,lanes,hit:false,ph:ph(k)};
    if(type==='log'){g.position.set(L[1],0,z);const c=new THREE.CylinderGeometry(0.3,0.34,6.2,10);c.rotateZ(Math.PI/2);addMesh(c,M(0x6b4a2b),0,0.3,0,g);for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.CircleGeometry(0.3,10),M(0xd2a870));e.rotation.y=s*Math.PI/2;e.position.set(s*3.11,0.3,0);g.add(e);}
      for(let i=0;i<3;i++)addMesh(new THREE.SphereGeometry(0.1,6,5),M(0x5a8a3a),rand(-2.5,2.5),0.55,rand(-0.1,0.1),g);}
    else if(type==='stump'){x=L[lanes[0]];g.position.set(x,0,z);addMesh(new THREE.CylinderGeometry(0.62,0.75,1.0,10),M(0x8a5a32),0,0.5,0,g);addMesh(new THREE.CylinderGeometry(0.62,0.62,0.05,10),M(0xd8b888),0,1.02,0,g);
      for(let i=0;i<4;i++){const a=i/4*Math.PI*2;const r=addMesh(new THREE.ConeGeometry(0.16,0.6,5),M(0x5a3d22),Math.sin(a)*0.7,0.12,Math.cos(a)*0.7,g);r.rotation.x=Math.cos(a)*1.2;r.rotation.z=-Math.sin(a)*1.2;}
      addMesh(new THREE.SphereGeometry(0.16,8,6),M(0xd05a3a),0.2,1.12,0.1,g);}
    else if(type==='branch'){g.position.set(L[1],0,z);const c=new THREE.CylinderGeometry(0.16,0.2,6.4,8);c.rotateZ(Math.PI/2);addMesh(c,M(0x5a4028),0,1.25,0,g);
      for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.1,0.12,1.3,6),M(0x5a4028),s*3.1,0.62,0,g);for(let i=0;i<7;i++)addMesh(new THREE.ConeGeometry(0.22,0.5,5),M(0x3f7a3a),-2.7+i*0.9,1.5,0,g).rotation.z=Math.PI;}
    else if(type==='pit'){o.len=PARTS[ph(k)].speed*0.8;g.position.set(L[1],0,z-o.len/2);const pit=new THREE.Mesh(new THREE.PlaneGeometry(6.2,o.len),MB(ph(k)===1?0x1a4a6a:0x14100c));pit.rotation.x=-Math.PI/2;pit.position.y=0.035;g.add(pit);
      for(const s of[-1,1]){const e=addMesh(new THREE.BoxGeometry(6.2,0.1,0.22),M(0x5a3a1a),0,0.05,s*o.len/2,g);e.castShadow=false;}
      for(let i=0;i<7;i++){const sp=addMesh(new THREE.BoxGeometry(0.16,0.06,rand(0.3,0.6)),M(0x94622f),rand(-3,3),0.06,(i%2?1:-1)*(o.len/2-0.1),g);sp.rotation.y=rand(-0.6,0.6);}}
    else if(type==='hole'){x=L[lanes[0]];o.len=2.2;g.position.set(x,0,z-1.1);const h=new THREE.Mesh(new THREE.PlaneGeometry(1.9,2.2),MB(0x1a4a6a));h.rotation.x=-Math.PI/2;h.position.y=0.04;g.add(h);
      for(const s of[-1,1]){const e=addMesh(new THREE.BoxGeometry(1.9,0.1,0.2),M(0x6a4020),0,0.05,s*1.1,g);e.rotation.y=rand(-0.15,0.15);e.castShadow=false;}
      const ring=new THREE.Mesh(new THREE.RingGeometry(0.3,0.42,16),MB(0xbfe8ff,{transparent:true,opacity:0.5}));ring.rotation.x=-Math.PI/2;ring.position.y=0.05;g.add(ring);o.ring=ring;}
    else if(type==='barrel'){x=L[lanes[0]];g.position.set(x,0,z-12);const b=new THREE.Group();b.position.y=0.42;g.add(b);const c=new THREE.CylinderGeometry(0.42,0.42,0.9,12);c.rotateZ(Math.PI/2);
      addMesh(c,M(0x9a5a2a),0,0,0,b);for(const s of[-0.28,0.28]){const hp=new THREE.TorusGeometry(0.43,0.04,5,16);hp.rotateY(Math.PI/2);addMesh(hp,M(0x3a3a3a),s,0,0,b);}
      addMesh(new THREE.CircleGeometry(0.3,10),M(0xffc84a),0.46,0,0,b).rotation.y=Math.PI/2;o.body=b;o.bz=z-12;g.visible=false;}
    else if(type==='mush'){x=L[lanes[0]];g.position.set(x,0,z);addMesh(new THREE.CylinderGeometry(0.22,0.3,0.45,10),M(0xf4ecd8),0,0.22,0,g);
      const cap=addMesh(new THREE.SphereGeometry(0.72,14,10,0,Math.PI*2,0,Math.PI/2),M(0xe03a2a,{emissive:0x400a00,emissiveIntensity:0.4}),0,0.4,0,g);cap.scale.y=0.7;o.cap=cap;
      for(let i=0;i<7;i++){const a=i/7*Math.PI*2,r=i?0.45:0;addMesh(new THREE.SphereGeometry(0.09,6,5),M(0xffffff),Math.sin(a)*r,0.4+0.5*0.7*(i?0.72:1),Math.cos(a)*r,g);}}
    S.obst.push(o);return o;}
  function addPick(kind,pi,k,lane){const l=mir(pi,lane),x=LANES[pi][l],z=zK(k),g=new THREE.Group();g.position.set(x,1.0,z);W.group.add(g);
    if(kind==='magnet'){const t=new THREE.TorusGeometry(0.32,0.1,8,18,Math.PI);addMesh(t,M(0xd82a2a,{emissive:0x600000,emissiveIntensity:0.5}),0,0,0,g);for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.2,0.16,0.2),M(0xe8e8f0),s*0.32,-0.06,0,g);}
    else{const f=addMesh(new THREE.SphereGeometry(0.2,10,8),M(0xffffff,{emissive:0x8090a0,emissiveIntensity:0.4}),0,0,0,g);f.scale.set(0.35,1.9,0.12);f.rotation.z=0.4;addMesh(new THREE.CylinderGeometry(0.015,0.015,0.9,4),M(0xd8c8a0),0.08,-0.1,0,g).rotation.z=0.4;}
    const glow=new THREE.Mesh(new THREE.RingGeometry(0.5,0.62,20),MB(kind==='magnet'?0xff8a8a:0xbfe0ff,{transparent:true,opacity:0.7,side:THREE.DoubleSide}));glow.rotation.x=-Math.PI/2;glow.position.y=-0.95;g.add(glow);
    const q={kind,pi,k,z,g,lane:l,taken:false,ph:ph(k)};S.picks.push(q);return q;}
  function sparkRow(pi,k0,k1,lane,arc,y0){for(let k=k0;k<=k1+1e-6;k+=0.5){const kk=Math.max(0,Math.min(END,k)),z=zAt(BT[Math.floor(kk)]+(kk%1)*(BT[Math.floor(kk)+1]-BT[Math.floor(kk)]));
      const x=typeof lane==='function'?lane(k):lx(pi,lane),y=(y0||0.9)+(arc?Math.sin((k-k0)/(k1-k0||1)*Math.PI)*arc:0);
      const m=new THREE.Mesh(new THREE.OctahedronGeometry(0.17),M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.9}));m.position.set(x,y,z);W.group.add(m);S.sparks.push({pi,m,taken:false,ph:ph(kk)});}}
  const zig=(pi,k0)=>k=>lx(pi,[0,1,2,1][Math.floor((k-k0)*1)%4]);
  /* ---------- бой на бегу (части 4–5): красное — уйди с дорожки, жёлтое — щит в такт и бей, кабан — прыгай, вожак — щит вдвоём ---------- */
  function makeBird(col,sc){const g=new THREE.Group();W.group.add(g);const m=M(col);part(g,new THREE.SphereGeometry(0.34,10,8),m,0,0,0).scale.set(0.8,0.7,1.4);part(g,new THREE.SphereGeometry(0.2,10,8),m,0,0.18,0.42);
    const bk=new THREE.ConeGeometry(0.07,0.26,6);bk.rotateX(Math.PI/2);part(g,bk,M(0xe0b020),0,0.14,0.68);for(const sx of[-1,1])part(g,new THREE.SphereGeometry(0.05,6,5),MB(0xfff3a0),sx*0.09,0.24,0.56);
    const wings=[-1,1].map(sx=>{const p=new THREE.Group();p.position.set(sx*0.25,0.08,0);g.add(p);part(p,new THREE.BoxGeometry(1.0,0.04,0.46),m,sx*0.5,0,0);return p;});g.scale.setScalar(sc||1);return {g,wings,body:g};}
  const FCOL={red:0xff4a3a,yellow:COL.yellow,white:0xffffff,blue:0x6ab0ff};
  function addFoe(type,pi,k,lanes){const air=ph(k)===4,z=zK(k);const f={type,pi,k,z,ph:ph(k),res:null,t:0,lane:1,air,y0:air?3.4:0,press:[null,null]};
    if(type==='lunge'){f.m=makeBeast('wolf');f.col='red';}
    else if(type==='paw'){f.m=makeBeast('bear');f.col='yellow';}
    else if(type==='boar'){f.m=makeBeast('bear');f.col='white';for(const sx of[-1,1]){const t=part(f.m.body,new THREE.ConeGeometry(0.06,0.32,5),M(0xfff4e0),sx*0.18,0.42,0.46);t.rotation.x=-1.1;}f.m.body.scale.set(1.15,0.85,1.3);}
    else if(type==='crow'){f.m=makeBird(0x2a2a34,1.2);f.col='red';}
    else if(type==='hawk'){f.m=makeBird(0x8a5a2a,1.4);f.col='yellow';}
    else if(type==='storm'){f.lanes=lanes.map(l=>mir(pi,l));f.col='blue';const g=new THREE.Group();W.group.add(g);f.m={g,body:g};const xs=f.lanes.map(l=>LANES[pi][l]);
      for(const x of xs){for(let i=0;i<4;i++){const c=new THREE.Mesh(PUFF_GEO,M(0x4a4a60));c.scale.set(rand(0.6,0.9),rand(0.4,0.55),rand(0.5,0.7));c.position.set(x+rand(-0.6,0.6),4.9+rand(-0.15,0.2),z+rand(-0.4,0.4));g.add(c);}
        const bolt=new THREE.Mesh(new THREE.BoxGeometry(0.1,1.6,0.1),MB(0xbfe0ff,{transparent:true,opacity:0.9}));bolt.position.set(x,3.9,z);g.add(bolt);(f.bolts=f.bolts||[]).push(bolt);}}
    else if(type==='duo'){f.pi=2;f.col='yellow';if(air){f.m=makeRunGoose();f.m.g.scale.setScalar(1.9);f.m.g.traverse(o=>{if(o.material&&o.material.color&&o.material.color.getHex()===0xffffff)o.material=M(0x8a8a94);});}
      else{f.m=makeBeast('wolf');f.m.g.scale.setScalar(1.7);}}
    if(f.m.ring){f.m.ring.visible=false;f.m.sun.visible=false;}f.m.g.visible=false;
    if(type!=='storm'){const mk=new THREE.Mesh(new THREE.RingGeometry(0.55,0.82,26),MB(FCOL[f.col],{transparent:true,opacity:0.7,side:THREE.DoubleSide,depthWrite:false}));mk.rotation.x=-Math.PI/2;mk.renderOrder=2;mk.visible=false;W.group.add(mk);f.mk=mk;}
    if(type==='duo')f.rings=[0,1].map(q=>{const rr=new THREE.Mesh(new THREE.TorusGeometry(1,0.07,6,30),MB(COL.yellow,{transparent:true,opacity:0.9}));rr.rotation.x=Math.PI/2;rr.visible=false;W.group.add(rr);return rr;});
    S.foes.push(f);return f;}
  const foeWin=pi=>winOf(pi)*1.4;
  function foeOk(pi,f,text,bonus){f.res=f.res||'dodge';S.tries[pi][f.ph]++;S.hits[pi][f.ph]++;combo(pi,true);const h=active(pi);if(bonus){S.got[pi]+=bonus*mult(pi);}
    floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),text,'#ffe36b');}
  function foeBad(pi,f,text){f.res='hit';S.tries[pi][f.ph]++;stumble(pi,text);}
  function parry13(pi,f){f.res='parry';f.cw=S.t+0.9;S.parries[pi]++;SFX.parry();const h=active(pi);shake(pi,0.03,0.12);burst(f.m.g.position.clone().add(new V3(0,0.9,0)),COL.yellow,12,4);foeOk(pi,f,'Отбил! Бей!',2);
    teach(pi,'counter','Отбил! Теперь бей '+K(pi,'attack')+' — сдачи дашь,<br>Ещё искры получишь — вот и весь сказ.');}
  function counter13(pi,f){f.res='counter';S.counters[pi]++;SFX.finisher();const h=active(pi);h.atkT=0.28;shake(pi,0.05,0.2);burst(f.m.g.position.clone().add(new V3(0,0.9,0)),COL.gold,16,5);S.got[pi]+=3*mult(pi);
    floatText(f.m.g.position.clone().add(new V3(0,2.2,0)),'Бац! +'+3*mult(pi),'#ffd76a');f.t=0;}
  /* ---------- партитура: у обоих игроков свои дорожки, препятствия зеркальны ---------- */
  for(const pi of[0,1]){
    // часть 1 · Солнечная опушка — струны в такт, коряги, пни, подкова-магнит, гриб-прыгун
    // правило: после струны или гриба (долгий полёт) следующее препятствие — не раньше чем через 3 доли
    sparkRow(pi,1,3,1);addString(pi,4);sparkRow(pi,5,7,0);addObst('log',pi,8);sparkRow(pi,7.5,8.5,1,1.4);addString(pi,10);
    addObst('stump',pi,13,[1]);sparkRow(pi,12,14,0);addObst('stump',pi,15,[0]);addObst('stump',pi,15,[2]);
    addPick('magnet',pi,17,1);sparkRow(pi,18,24.5,zig(pi,18));addObst('log',pi,19);addString(pi,21,pi===1?'nut':null);
    addObst('mush',pi,24,[0]);sparkRow(pi,24.2,26,0,3.2,1.2);addObst('stump',pi,27,[1]);addObst('stump',pi,27,[2]);addObst('log',pi,28);
    addString(pi,30,pi===0?'link':null);sparkRow(pi,31,31.5,1);
    // часть 2 · Через речку — дыры в мосту, бочки, звери, гусь-лебедь, обвал моста
    sparkRow(pi,33,35,1);addObst('hole',pi,34,[0]);addObst('hole',pi,36,[2]);addObst('hole',pi,38,[1]);sparkRow(pi,37,39,0);
    addObst('barrel',pi,41,[1]);addObst('barrel',pi,43,[0]);addBeast(pi,45);
    addPick('goose',pi,47,1);sparkRow(pi,48,53.5,zig(pi,48),0,3.6);if(pi===0)nutItem(lx(pi,1),3.6,zK(51));
    addString(pi,50,null,[1]);addObst('pit',pi,50.3);addBeast(pi,56);addObst('branch',pi,58);addString(pi,61,pi===1?'link':null,[1]);addObst('pit',pi,61.3);sparkRow(pi,62,63.5,1);
    // часть 3 · Лисья тропа — всё быстрее, лиса сзади, в конце три струны подряд
    sparkRow(pi,65,67,1);addObst('log',pi,66);addObst('stump',pi,68,[0]);addObst('stump',pi,68,[1]);addObst('barrel',pi,70,[2]);addObst('barrel',pi,72,[1]);
    addBeast(pi,74);addPick('magnet',pi,76,1);sparkRow(pi,77,82.5,zig(pi,77));addObst('branch',pi,78);addObst('mush',pi,80,[1]);sparkRow(pi,80.2,82,1,3.4,1.2);
    if(pi===0)nutItem(lx(pi,1),4.4,zK(81));addString(pi,83,pi===1?'nut':null);addObst('log',pi,86);addBeast(pi,88);
    [89,92,95].forEach(k=>addString(pi,k));sparkRow(pi,89,95,1,0.8);
    // часть 4 · Волчья чаща — бой на бегу: волк (красный) — уйди с дорожки или кувырок, медведь (жёлтый) — щит в такт и бей, кабан — прыгай, вожак — щит вдвоём
    sparkRow(pi,97,98.5,1);addFoe('lunge',pi,99);addFoe('paw',pi,102);sparkRow(pi,103,105,0);addFoe('boar',pi,106);addFoe('lunge',pi,109);addFoe('paw',pi,111);
    if(pi===0)addFoe('duo',pi,114);sparkRow(pi,115,116,1);addFoe('paw',pi,117);addFoe('lunge',pi,119);addFoe('lunge',pi,121);addFoe('boar',pi,123);if(pi===0)addFoe('duo',pi,125);
    if(pi===1)nutItem(lx(pi,1),1.1,zK(105));
    // часть 5 · Гуси-лебеди — летим: ворона (красная) — в сторону, коршун (жёлтый) — щит в такт и бей, туча — облети, вожак стаи — щит вдвоём
    sparkRow(pi,128,130.5,1,0,3.9);addFoe('crow',pi,131);addFoe('hawk',pi,134);sparkRow(pi,135,137,0,0,3.9);addFoe('storm',pi,138,[1]);addFoe('crow',pi,141);addFoe('hawk',pi,143);
    if(pi===0)addFoe('duo',pi,146);sparkRow(pi,147,148.5,2,0.6,3.9);addFoe('crow',pi,149);addFoe('storm',pi,151,[0,2]);addFoe('hawk',pi,153);addFoe('crow',pi,155);addFoe('crow',pi,157);if(pi===0)addFoe('duo',pi,159);
    if(pi===0)nutItem(lx(pi,0),4.0,zK(136));}
  W.linkTotal++;   // третье звено отдаст Колобок
  const winOf=pi=>(LADWIN[players[pi].path]||0.1)+(W.ladBonus||0);
  const nearK=t=>{let best=S.lastK,bd=1e9;for(let q=S.lastK-1;q<=S.lastK+2;q++){if(BT[q]===undefined)continue;const d=Math.abs(t-BT[q]);if(d<bd){bd=d;best=q;}}return best;};
  const judge=t=>{const k=nearK(t),d=t-BT[k];return {k,d};};
  const onBeat_=(pi,j)=>Math.abs(j.d)<=winOf(pi);
  const judgeF=(t,pi,bb,mul)=>{const k=Math.round(t/bb),d=t-k*bb;return {k,d,ok:Math.abs(d)<=winOf(pi)*(mul||1)};};
  const mult=pi=>S.combo[pi]>=16?3:S.combo[pi]>=8?2:1;
  const flying=pi=>S.fly[pi]>S.t;
  function combo(pi,ok){if(ok){S.combo[pi]++;S.best[pi]=Math.max(S.best[pi],S.combo[pi]);if(S.combo[pi]%8===0){banner('Лад ×'+S.combo[pi]+'!',PCSS[pi],1.1,'искры считаются ×'+mult(pi));SFX.ok();}
      if(S.combo[pi]===4&&pi===1&&!F.got){F.got=true;bark(HERO.pelageya,'pelageya','Поняла я, поняла!',2);}}else S.combo[pi]=0;}
  function teach(pi,key,html){if(S.told[pi][key])return;S.told[pi][key]=true;tip(pi,html,2.8);}
  function startPart(p){S.part=p;const P=PARTS[p];banner('Часть '+(p+1)+' · '+P.name,'#ffd76a',2.2,P.sub);SFX.gate();
    if(p===1)later(0.6,()=>say('zven','Речка! Мост старенький — под ноги глядите. Дзинь!',2.6,true));
    if(p===2){later(0.6,()=>say('zven','Ой, лиса! Бегите — да не спотыкайтесь!',2.4,true));foxes.forEach((f,i)=>{f.g.visible=true;f.d=12;S.fox[i]=0;S.foxK[i]=S.lastK;});}
    if(p===3)later(0.6,()=>say('zven','Волчья чаща! Красный круг — прыг в сторону. Жёлтый — щит, и сдачи!',3,true));
    if(p===4)later(0.6,()=>say('zven','Летим! Вороны — облетай, коршуна — щитом, а вожака — вдвоём!',3,true));}
  function onBeat(k){const p=partOf(Math.max(0,k)),bi=((k%16)+16)%16,chorus=Math.floor(k/16)%2===1,line=(k<0?SONG_C:chorus?SONG_C:SONG_V)[bi],tr=PARTS[p].tr,bl=60/PARTS[p].bpm;
    if(k<0){const n=k+4;tone(1760,0.06,'square',0.05);if(n>=0)banner(['Раз','Два','Три','Четыре!'][n],'#ffe7a0',0.5,n===3?'Колобок катится — бегом за ним, бегом!':'');}
    else{gusli(line[0]?line[0]+tr:0,0,0.17);gusli(line[1]?line[1]+tr:0,bl/2,0.14);tone(mf(SONG_BASS[bi]+tr),0.5,'sine',0.2);tone(2600,0.05,'square',0.035);
      if(p===2){tone(3200,0.03,'square',0.025,null,bl/2);if(bi%4===0)tone(90,0.12,'sine',0.25,50);}}
    rumble(0,0.02,0.05);rumble(1,0.02,0.05);S.pulse=1;
    if(k>0&&k%PB===0&&k!==S.skipCheck&&k<=END){const pp=k/PB-1,lk=S.items.find(q=>q.ph===pp&&q.kind==='link'&&!q.it.taken);
      if(lk&&S.st[lk.pi][pp]>0&&S.sh[lk.pi][pp]<S.st[lk.pi][pp]*0.5&&S.rep[pp]<2){S.rep[pp]++;rewind(pp);return;}}
    if(k>=0&&k%PB===0&&k<END)startPart(k/PB);
    // лиса отстаёт, если 6 долей не спотыкаться
    if(S.part===2&&!S.foxOff)for(const pi of[0,1])if(S.fox[pi]>0&&k-S.foxK[pi]>=6){S.fox[pi]--;S.foxK[pi]=k;floatText(active(pi).pos.clone().add(new V3(0,active(pi).d.height+0.8,0)),'Лиса отстала!','#ffe0a0');}
    if(k===3*PB-4&&!S.foxOff){S.foxOff=true;foxes.forEach(f=>{f.trip=0.001;});later(0.3,()=>{SFX.knock();banner('Лиса о корень — спотыкнулась!','#ffb070',1.8,'и кубарем — в кусты, вот так!');});}
    if(k===3*PB){for(const pi of[0,1])if(S.finale[pi]>=3){S.got[pi]+=10;floatText(active(pi).pos.clone().add(new V3(0,2.2,0)),'Три струны подряд — вот лад! +10','#ffe36b');}}
    if(k===4*PB-2){S.fly=[BT[END]+0.3,BT[END]+0.3];geese.forEach(g=>{g.warn=false;});SFX.toss();banner('Гуси-лебеди подхватили — ввысь!','#ffffff',1.8,'держитесь — над обрывом летим!');}
    if(k===END){S.state='stop';W.camFn=null;stopScene();}}
  function rewind(p){const k0=p*PB,k1=(p+1)*PB,t0=S.t;S.t=BT[k0]+(S.t-BT[k1]);S.lastK=k0;S.skipCheck=k1;S.hits[0][p]=S.hits[1][p]=S.tries[0][p]=S.tries[1][p]=0;S.sh[0][p]=S.sh[1][p]=S.st[0][p]=S.st[1][p]=0;const dz=zAt(S.t)-zAt(t0);
    for(const s of S.strings)if(s.ph===p)s.used=false;
    for(const o of S.obst)if(o.ph===p){o.hit=false;if(o.type==='barrel'){o.g.visible=false;o.bz=o.z-12;}if(o.type==='mush'&&o.cap)o.cap.scale.y=0.7;}
    for(const b of S.beasts)if(b.ph===p){b.res=null;b.t=0;b.b.g.visible=true;b.b.g.position.set(b.x0,0,b.z);b.b.body.rotation.set(0,0,0);}
    for(const q of S.picks)if(q.ph===p){q.taken=false;q.g.visible=true;}
    S.fly=[-1e9,-1e9];S.mag=[-1e9,-1e9];S.fox=[0,0];S.foxK=[k0,k0];S.finale=[0,0];
    if(p===2){S.foxOff=false;foxes.forEach(f=>{f.trip=0;f.leap=0;f.d=12;f.body.rotation.x=0;f.g.visible=true;});}
    for(const h of HEROES)placeOnGround(h,h.pos.x,h.pos.z+dz,0);S.kolZ+=dz;stitch();SFX.whoosh();banner('Ещё разок!','#ffe7a0',2,'звенья в этой части остались — прыгайте на струны под бубенец');snapCams();}
  function stumble(pi,text,pull){const h=active(pi);S.stumbles=(S.stumbles||0)+1;S.stLog=(S.stLog||[]);S.stLog.push(pi+':'+(text||'').slice(0,6)+'@'+S.lastK);S.off[pi]=Math.max(-3,S.off[pi]-1.6);h.vel.y=pull?7:4;h.grounded=false;SFX.knock();shake(pi,0.03,0.15);combo(pi,false);
    floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),text||'Спотык!','#ffd0e0');S.hurtT=S.hurtT||[0,0];S.hurtT[pi]=0.5;
    if(S.part===2&&!S.foxOff){S.fox[pi]=Math.min(3,S.fox[pi]+1);S.foxK[pi]=S.lastK;if(S.fox[pi]>=3){const n=Math.min(5,S.got[pi]);S.got[pi]-=n;S.fox[pi]=1;S.foxCaught[pi]++;foxes[pi].leap=0.001;
        later(0.2,()=>{SFX.knock();floatText(h.pos.clone().add(new V3(0,h.d.height+1.2,0)),n?'Лиса '+n+' искр утащила!':'Лиса цапнула — а искр-то и нет!','#ffb070');});}
      else floatText(h.pos.clone().add(new V3(0,h.d.height+1.2,0)),'Лиса ближе!','#ffb070');}}
  function bump(pi,be){be.res='bump';stumble(pi,'Толк! Не больно, ничего!');teach(pi,'beastMiss','Зверь катится к тебе — щит '+K(pi,'guard')+' жми,<br>Как станет кружок точкой — не спеши!');}
  function dance(pi,be){be.res='dance';S.hits[pi][be.ph]++;S.tries[pi][be.ph]++;SFX.parry();floatText(be.b.g.position.clone().add(new V3(0,2.4,0)),'Пляшет!','#ffe36b');
    spawnSpark(be.b.g.position.clone().add(new V3(0,1,0)),[COL.gold,0x6ad0ff,0xff6a8a][be.k%3]);combo(pi,true);}
  function gotSpark(pi,sp){sp.taken=true;W.group.remove(sp.m);const n=mult(pi);S.got[pi]+=n;tone(1500+rand(0,400)+(n-1)*300,0.08,'sine',0.1,2200);}
  // игрок ведёт дорожку (стик/стрелки влево-вправо), прыжок, кувырок и защиту; второй герой бежит следом
  W.custom=(pi,h,dt,c)=>{
    if(c.lock||S.state==='stop'||S.state==='cine'){for(const q of players[pi].heroes){q.vel.x=damp(q.vel.x,0,10,dt);q.vel.z=damp(q.vel.z,0,10,dt);}active(pi).guard=false;return;}
    if(tap(pi,'swap'))doSwap(pi);const hh=active(pi),oo=other(pi);
    if(S.state==='final'){hh.vel.x=damp(hh.vel.x,0,10,dt);hh.vel.z=damp(hh.vel.z,0,10,dt);oo.vel.x=0;oo.vel.z=0;hh.face=angDamp(hh.face,Math.atan2(kol.g.position.x-hh.pos.x,kol.g.position.z-hh.pos.z),6,dt);
      const act=a=>{if(!S.fin)return;const P=FST[S.fs];const j=judgeF(rT(S.ft),pi,S.B2,1.7);const b=((j.k%P.n)+P.n)%P.n,top=hh.pos.clone().add(new V3(0,hh.d.height+0.6,0));
        if(j.ok&&S.ft>-S.B2*0.5&&P.act(b)===a&&need13(P,b,pi)){S.fin[b][pi]=true;floatText(top,a==='C'?'Хлоп!':'В такт!',PCSS[pi]);}
        else if(j.ok&&S.ft>-S.B2*0.5)floatText(top,!need13(P,b,pi)?'теперь черёд друга':a==='J'?'теперь — хлопок щитом!':'сейчас прыжок!','#dddddd');
        else floatText(top,j.d<0?'рано':'поздно','#dddddd');};
      if(tap(pi,'jump')&&hh.grounded){hh.vel.y=7.2;hh.grounded=false;SFX.jump();act('J');}
      if(tap(pi,'guard')){hh.atkT=0.2;tone(900,0.06,'square',0.08);burst(hh.pos.clone().add(new V3(0,1.2,0)),0xffe08a,6,2);act('C');}
      return;}
    const nv=uiNav(pi);if(nv.dx){const nl=clamp(S.lane[pi]+nv.dx,0,2);if(nl!==S.lane[pi]){S.lane[pi]=nl;tone(660+nl*80,0.05,'triangle',0.06);}}
    if(Math.abs(c.iz)>0.2)S.off[pi]=clamp(S.off[pi]+c.iz*dt*1.6,-3,0.7);else S.off[pi]=damp(S.off[pi],0,0.7,dt);
    const spd=PARTS[partAtT(Math.max(0,S.t))].speed,hz=hh.pos.z+(G.rLat||0)*spd,xL=LANES[pi][S.lane[pi]],want=zAt(S.t)-S.off[pi];hh.vel.z=-spd+(want-hh.pos.z)*5;hh.vel.x=(xL-hh.pos.x)*11;hh.face=Math.PI+clamp(-hh.vel.x*0.04,-0.4,0.4);
    {const tx=xL+(pi?0.55:-0.55),tz=hh.pos.z+1.8;oo.vel.x=(tx-oo.pos.x)*6;oo.vel.z=(tz-oo.pos.z)*6;oo.face=Math.PI;}
    const fl=flying(pi);
    if(fl){hh.vel.y=(3.4-hh.pos.y)*5+GRAV*dt;hh.grounded=false;hh.coyote=0;oo.pos.set(hh.pos.x+(pi?0.35:-0.35),hh.pos.y+0.05,hh.pos.z+0.9);oo.vel.set(0,0,0);oo.face=Math.PI;}   // второй герой сидит на том же гусе
    hh.guard=btn(pi,'guard');
    if(tap(pi,'roll')&&hh.grounded&&hh.rollT<=0){hh.rollT=0.55;SFX.roll();}
    if(!fl&&tap(pi,'jump')&&(hh.grounded||hh.coyote>0)){const j=judge(rT(S.t));const s=S.strings.find(q=>q.pi===pi&&!q.used&&Math.abs(q.z-hz)<1.3&&q.lanes.includes(S.lane[pi]));
      hh.grounded=false;hh.coyote=0;
      if(s){s.used=true;s.vib=1;S.tries[pi][s.ph]++;S.st[pi][s.ph]++;
        if(onBeat_(pi,j)){hh.vel.y=14;S.hits[pi][s.ph]++;S.sh[pi][s.ph]++;s.ok=true;SFX.toss();if(s.k>=89)S.finale[pi]++;if(s.item&&!s.item.taken){const it=s.item,from=it.pos.clone();anim(0.5,k=>{if(it.taken)return;it.base=lerp(from.y,hh.pos.y+1,k);it.pos.x=lerp(from.x,hh.pos.x,k);it.pos.z=lerp(from.z,hh.pos.z-0.5,k);if(k>=1)takeItem(it,hh);});}   // звено само летит к тому, кто попал в такт
          gusli(79+(s.k%4)*2+PARTS[S.part].tr,0,0.2);floatText(hh.pos.clone().add(new V3(0,hh.d.height+0.7,0)),'В такт!','#ffe36b');burst(new V3(xL,0.3,s.z),COL.gold,12,3);combo(pi,true);}
        else{hh.vel.y=7.6;SFX.jump();gusli(55,0,0.12);floatText(hh.pos.clone().add(new V3(0,hh.d.height+0.7,0)),j.d<0?'рано':'поздно','#dddddd');combo(pi,false);
          teach(pi,'strMiss','На струну прыгай ровно тогда,<br>Когда бубенец наверху подскочит — да!');}}
      else{hh.vel.y=8.6;SFX.jump();}}
    if(tap(pi,'guard')){const be=S.beasts.find(q=>q.pi===pi&&!q.res&&Math.abs(q.z-hz)<3.6);if(be){const d=rT(S.t)-BT[be.k];if(Math.abs(d)<=winOf(pi))dance(pi,be);
      else{floatText(hh.pos.clone().add(new V3(0,hh.d.height+0.6,0)),d<0?'рано':'поздно','#dddddd');combo(pi,false);}}
      const f=S.foes.find(q=>q.pi===pi&&!q.res&&(q.type==='paw'||q.type==='hawk')&&Math.abs(rT(S.t)-BT[q.k])<0.5);
      if(f){const d=rT(S.t)-BT[f.k];if(Math.abs(d)<=foeWin(pi))parry13(pi,f);else floatText(hh.pos.clone().add(new V3(0,hh.d.height+0.6,0)),(d<0?'рано':'поздно')+' — щит держи!','#dddddd');}
      const du=S.foes.find(q=>q.type==='duo'&&!q.res&&Math.abs(rT(S.t)-BT[q.k])<0.5);if(du&&du.press[pi]===null)du.press[pi]=rT(S.t)-BT[du.k];}
    if(tap(pi,'attack')){hh.atkT=Math.max(hh.atkT,0.2);const f=S.foes.find(q=>q.pi===pi&&q.res==='parry'&&S.t<q.cw);if(f)counter13(pi,f);else SFX.swish();}
    // препятствия
    const myLane=laneOf(pi,hh.pos.x);
    for(const o of S.obst){if(o.pi!==pi||o.hit)continue;const oz=o.type==='barrel'?o.bz:o.z,dz=hh.pos.z-oz;
      if(fl){if(dz<-1.2&&o.type!=='mush'){o.hit=true;if(o.type!=='pit'){S.tries[pi][o.ph]++;S.hits[pi][o.ph]++;combo(pi,true);}}continue;}
      if(o.type==='log'&&Math.abs(dz)<0.5&&hh.pos.y<0.55){o.hit=true;stumble(pi,'Коряга!');teach(pi,'log','Коряга поперёк тропы — прыгни '+K(pi,'jump')+' через неё!');}
      else if(o.type==='stump'&&Math.abs(dz)<0.7&&o.lanes.includes(myLane)&&hh.pos.y<0.95){o.hit=true;stumble(pi,'Пень!');teach(pi,'stump','Пень на дорожке — на соседнюю беги '+K(pi,'left')+K(pi,'right')+'!');}
      else if(o.type==='branch'&&Math.abs(dz)<0.45&&hh.rollT<=0&&hh.pos.y<1.5){o.hit=true;stumble(pi,'Ветка!');teach(pi,'branch','Низкая ветка — кувырком '+K(pi,'roll')+' под ней проскочи!');}
      else if(o.type==='pit'&&dz<-0.05&&dz>-o.len&&hh.grounded&&hh.pos.y<0.2){o.hit=true;stumble(pi,'Нить подтянула!',true);placeOnGround(hh,hh.pos.x,o.z-o.len-0.4,0);hh.vel.y=6;hh.grounded=false;
        teach(pi,'pit','Мост обвалился! Лишь со струны перелетишь:<br>Средняя дорожка, прыжок '+K(pi,'jump')+' под бубенец — и взлетишь.');}
      else if(o.type==='hole'&&dz<-0.1&&dz>-2.1&&o.lanes.includes(myLane)&&hh.grounded&&hh.pos.y<0.2){o.hit=true;SFX.splash();burst(new V3(hh.pos.x,0.1,hh.pos.z),0x9ad8ff,12,3);stumble(pi,'Плюх! Доска сломалась!',true);
        teach(pi,'hole','Дыра в мосту — на другую дорожку '+K(pi,'left')+K(pi,'right')+' или прыгни '+K(pi,'jump')+' через дыру!');}
      else if(o.type==='barrel'&&o.g.visible&&Math.abs(dz)<0.65&&o.lanes.includes(myLane)&&hh.pos.y<0.75){o.hit=true;stumble(pi,'Бум! Бочка');teach(pi,'barrel','Бочка навстречу катится — вбок беги или прыгни '+K(pi,'jump')+'!');}
      else if(o.type==='mush'&&Math.abs(dz)<0.75&&o.lanes.includes(myLane)&&hh.pos.y<0.6){o.hit=true;hh.vel.y=15.5;hh.grounded=false;SFX.toss();tone(520,0.2,'triangle',0.2,1200);if(o.cap)o.cap.scale.y=0.35;
        floatText(hh.pos.clone().add(new V3(0,hh.d.height+0.7,0)),'Прыг!','#ff9a9a');S.tries[pi][o.ph]++;S.hits[pi][o.ph]++;combo(pi,true);}
      if(!o.hit&&dz<-1.2&&o.type!=='pit'&&o.type!=='mush'){o.hit=true;S.tries[pi][o.ph]++;S.hits[pi][o.ph]++;combo(pi,true);}}
    for(const q of S.picks){if(q.pi!==pi||q.taken)continue;if(Math.abs(q.z-hh.pos.z)<0.9&&q.lane===myLane&&hh.pos.y<2.6){q.taken=true;q.g.visible=false;
      if(q.kind==='magnet'){S.mag[pi]=S.t+8*60/PARTS[S.part].bpm;banner('Подкова-магнит!',PCSS[pi],1.4,'искры сами к тебе летят');SFX.ok();}
      else{S.fly[pi]=S.t+7*60/PARTS[S.part].bpm;banner('Гусь-лебедь!',PCSS[pi],1.4,'над мостом летим — искры в небе собирай');SFX.toss();geese[pi].g.visible=true;}}}
    for(const sp of S.sparks){if(sp.taken||sp.pi!==pi)continue;const p=sp.m.position;if(Math.abs(p.z-hh.pos.z)<0.7&&Math.abs(p.x-hh.pos.x)<0.8&&Math.abs(p.y-(hh.pos.y+0.6))<1.1)gotSpark(pi,sp);}};
  /* ---------- HUD раннера ---------- */
  document.body.classList.add('run13');
  let hud=document.getElementById('run13');if(!hud){hud=document.createElement('div');hud.id='run13';$('mapui').parentNode.appendChild(hud);}
  hud.innerHTML='<div class="rbar">'+PARTS.map((P,i)=>'<div class="rseg s'+i+'"><span>'+P.short+'</span></div>').join('')+'<i class="rk"></i><i class="rp r0"></i><i class="rp r1"></i></div>'+
    [0,1].map(pi=>'<div class="rpl p'+pi+'"><div class="rsp"><em>✦</em><b>0</b><u></u></div><div class="rpw"></div><div class="rfox"></div></div>').join('');
  hud.style.display='block';
  const HE={k:hud.querySelector('.rk'),p:[hud.querySelector('.r0'),hud.querySelector('.r1')],pl:[0,1].map(pi=>{const e=hud.querySelector('.rpl.p'+pi);return {e,b:e.querySelector('b'),u:e.querySelector('u'),pw:e.querySelector('.rpw'),fox:e.querySelector('.rfox')};}),segs:[...hud.querySelectorAll('.rseg')],cache:{}};
  const FOXI='<svg viewBox="0 0 20 20"><path d="M3 4 L7 8 L13 8 L17 4 L16 12 Q10 18 4 12Z" fill="#e0782a"/><path d="M7 12 Q10 15 13 12 L10 16Z" fill="#fff"/></svg>';
  const MAGI='<svg viewBox="0 0 20 20"><path d="M4 3 V10 A6 6 0 0 0 16 10 V3 H12 V10 A2 2 0 0 1 8 10 V3Z" fill="#fff"/><rect x="4" y="3" width="4" height="3" fill="#ccd"/><rect x="12" y="3" width="4" height="3" fill="#ccd"/></svg>';
  const GOOI='<svg viewBox="0 0 20 20"><ellipse cx="9" cy="12" rx="7" ry="4" fill="#fff"/><path d="M13 11 Q15 4 17 4" stroke="#fff" stroke-width="2.4" fill="none"/><path d="M17 3 L20 4.5 L17 5.5Z" fill="#ff9a2a"/></svg>';
  const prog=z=>clamp(-z/(-ZE),0,1);
  function hudTick(){const on=S.state==='play'&&!G.cine;hud.style.display=on?'block':'none';if(!on)return;
    HE.k.style.left=(prog(kol.g.position.z)*100).toFixed(1)+'%';[0,1].forEach(pi=>{HE.p[pi].style.left=(prog(active(pi).pos.z)*100).toFixed(1)+'%';});
    HE.segs.forEach((e,i)=>e.classList.toggle('on',i===S.part));
    for(const pi of[0,1]){const P=HE.pl[pi],m=mult(pi),fl=flying(pi),mg=S.mag[pi]>S.t;const key=S.got[pi]+'|'+m+'|'+fl+'|'+mg+'|'+S.fox[pi]+'|'+S.part+'|'+((S.hurtT&&S.hurtT[pi]>0)?1:0);
      if(HE.cache[pi]===key)continue;HE.cache[pi]=key;P.b.textContent=S.got[pi];P.u.textContent=m>1?'×'+m:'';P.u.style.display=m>1?'inline-block':'none';
      P.pw.innerHTML=(mg?'<span class="pw mg">'+MAGI+'подкова</span>':'')+(fl?'<span class="pw gs">'+GOOI+'гусь</span>':'');
      P.fox.innerHTML=S.part===2&&!S.foxOff?'<span>лиса</span>'+[0,1,2].map(i=>'<i class="'+(i<S.fox[pi]?'on':'')+'">'+FOXI+'</i>').join(''):'';
      P.e.classList.toggle('hurt',!!(S.hurtT&&S.hurtT[pi]>0));}}
  const palC=[new THREE.Color(),new THREE.Color(),new THREE.Color()];
  W.updates.push(dt=>{
    if(S.state==='play'&&!G.cine){S.t+=dt;while(BT[S.lastK+1]!==undefined&&S.t>=BT[S.lastK+1]-1e-6&&S.state==='play'){S.lastK++;onBeat(S.lastK);}
      const k=S.lastK;if(BT[k]!==undefined&&BT[k+1]!==undefined){S.B=BT[k+1]-BT[k];S.bph=clamp((S.t-BT[k])/S.B,0,1);}}
    if(S.state==='final'&&!G.cine&&S.fin)finalTick(dt);
    if(S.hurtT)for(const pi of[0,1])S.hurtT[pi]=Math.max(0,S.hurtT[pi]-dt);
    S.pulse=Math.max(0,(S.pulse||0)-dt*4);
    for(const sp of S.sparks)if(!sp.taken)sp.m.rotation.y+=dt*3;
    // подкова-магнит: искры сами летят к герою
    for(const pi of[0,1])if(S.mag[pi]>S.t&&S.state==='play'){const hh=active(pi);for(const sp of S.sparks){if(sp.taken||sp.pi!==pi)continue;const p=sp.m.position,dz=p.z-hh.pos.z;if(dz<-10||dz>1.5)continue;
      p.lerp(new V3(hh.pos.x,hh.pos.y+0.8,hh.pos.z),Math.min(1,dt*9));if(p.distanceTo(new V3(hh.pos.x,hh.pos.y+0.8,hh.pos.z))<0.6)gotSpark(pi,sp);}}
    for(const s of S.strings){if(!s.used&&S.state==='play'&&rT(S.t)>BT[s.k]+0.35){s.used=true;S.tries[s.pi][s.ph]++;S.st[s.pi][s.ph]++;if(flying(s.pi)){S.hits[s.pi][s.ph]++;S.sh[s.pi][s.ph]++;}}
      if(s.vib>0){s.vib=Math.max(0,s.vib-dt*1.5);s.str.position.y=0.22+Math.sin(G.time*60)*0.06*s.vib;s.mat.emissiveIntensity=0.7+s.vib;}}
    for(const be of S.beasts){const g=be.b.g,bl=60/PARTS[be.ph].bpm,dtB=(BT[be.k]-S.t)/bl;
      if(!be.res){if(dtB>1)be.lx=LANES[be.pi][S.lane[be.pi]];const k=smooth(1-(dtB-2)/2);g.position.x=lerp(be.x0,be.lx,clamp(k,0,1));g.position.z=be.z;be.b.body.rotation.x=-(1-k)*6;
        be.b.ring.visible=be.b.sun.visible=dtB<3&&dtB>-0.3;be.b.ring.scale.setScalar(lerp(0.3,2.0,clamp(dtB/2.5,0,1)));be.b.ring.rotation.x=Math.PI/2;be.b.ringM.color.setHex(Math.abs(dtB)<0.2?0xffffff:COL.yellow);
        be.b.sun.scale.setScalar(1+0.3*S.pulse);
        if(dtB<2.6&&dtB>2.4)teach(be.pi,'beast','Зверь выкатится на твою дорожку.<br>Жди, пока кружок станет точкой, — и щит '+K(be.pi,'guard')+' немножко!');
        if(rT(S.t)>BT[be.k]+winOf(be.pi)+0.04&&S.state==='play'){S.tries[be.pi][be.ph]++;if(flying(be.pi)){be.res='gone';S.hits[be.pi][be.ph]++;}
          else if(Math.abs(active(be.pi).pos.z-be.z)<3.5&&Math.abs(active(be.pi).pos.x-be.lx)<1.2)bump(be.pi,be);else be.res='gone';}}
      else{be.b.ring.visible=be.b.sun.visible=false;be.t+=dt;const s=be.pi?1:-1;
        if(be.res==='dance'){g.position.x=be.lx+s*Math.min(2.4,be.t*6);g.position.y=Math.abs(Math.sin(be.t*10))*0.4;be.b.body.rotation.y+=dt*9;}
        else{g.position.x=be.lx+s*be.t*8;be.b.body.rotation.x-=dt*10;if(be.t>1.2)g.visible=false;}}}
    // враги частей 4–5
    for(const f of S.foes){const bl=60/PARTS[f.ph].bpm,dtB=(BT[f.k]-S.t)/bl,P=f.pi===2?null:f.pi;const g=f.m.g;
      if(S.state!=='play'){g.visible=false;if(f.mk)f.mk.visible=false;if(f.rings)f.rings.forEach(q=>{q.visible=false;});continue;}
      if(dtB>4.2||(f.res&&f.t>1.4)){g.visible=false;if(f.mk)f.mk.visible=false;if(f.rings)f.rings.forEach(q=>{q.visible=false;});if(f.res)f.t+=dt;continue;}
      if(f.res)f.t+=dt;
      const hh=P===null?null:active(P);
      if(f.type==='lunge'||f.type==='crow'||f.type==='boar'){if(!f.locked){f.lane=S.lane[P];if(dtB<(f.type==='boar'?1.6:1.2))f.locked=true;}
        const x=LANES[P][f.lane],zz=f.z-Math.max(-2,dtB)*bl*(f.type==='crow'?5:4.2);g.visible=true;g.position.set(x,f.type==='crow'?f.y0+Math.max(0,dtB)*1.1:f.y0,zz);g.rotation.y=0;
        if(f.m.wings)f.m.wings.forEach((w,i)=>{w.rotation.z=(i?-1:1)*Math.sin(G.time*14)*0.7;});else f.m.body.rotation.x-=dt*8;
        f.mk.visible=!f.res&&dtB>-0.1;f.mk.position.set(x,f.y0+0.05,f.z);f.mk.material.opacity=f.locked?0.55+0.35*Math.sin(G.time*18):0.3;f.mk.scale.setScalar(f.locked?1:0.8);
        if(!f.res&&dtB<=-0.05){const inL=laneOf(P,hh.pos.x)===f.lane;
          if(f.type==='lunge'){if(inL&&hh.rollT<=0)foeBad(P,f,'Волк цапнул!');else foeOk(P,f,inL?'Кувырок!':'Увернулся!',1);}
          else if(f.type==='crow'){if(inL)foeBad(P,f,'Ворона клюнула!');else foeOk(P,f,'Увернулся!',1);}
          else{if(inL&&hh.pos.y<0.6)foeBad(P,f,'Кабан!');else foeOk(P,f,inL?'Перепрыгнул!':'Мимо!',1);}
          if(f.res==='hit'&&f.type==='lunge')teach(P,'lunge','Красный круг — волк прыгнет на твою тропу!<br>Беги на другую '+K(P,'left')+K(P,'right')+' или кувырком '+K(P,'roll')+' — ко лбу!');
          if(f.res==='hit'&&f.type==='crow')teach(P,'crow','Красный круг в небе — ворона пикирует вниз!<br>На другую дорожку '+K(P,'left')+K(P,'right')+' перелети — берегись!');
          if(f.res==='hit'&&f.type==='boar')teach(P,'boar','Кабан несётся навстречу — прыгни '+K(P,'jump')+' через него!');}}
      else if(f.type==='paw'||f.type==='hawk'){const x=LANES[P][S.lane[P]];if(!f.res||f.res==='parry'&&S.t<f.cw){f.lx=x;}
        let zz=zAt(S.t)-S.off[P]-1.5-Math.max(0,dtB)*bl*3.2,yy=f.y0+(f.type==='hawk'?0.4:0);
        if(f.res==='counter'){zz-=f.t*8;yy+=f.t*5;g.rotation.x+=dt*14;}else if(f.res==='parry'){g.rotation.y+=dt*9;}else if(f.res==='block'||f.res==='hit'||(f.res==='parry'&&S.t>=f.cw)){f.lx+=(P?1:-1)*dt*7;}
        g.visible=true;g.position.set(f.lx,yy,zz);if(f.m.wings)f.m.wings.forEach((w,i)=>{w.rotation.z=(i?-1:1)*Math.sin(G.time*(f.res?8:12))*0.7;});
        if(f.m.ring){f.m.ring.visible=f.m.sun.visible=!f.res&&dtB<3&&dtB>-0.3;f.m.ring.scale.setScalar(lerp(0.3,2.0,clamp(dtB/2.5,0,1)));f.m.ring.rotation.x=Math.PI/2;f.m.ringM.color.setHex(Math.abs(dtB)<0.2?0xffffff:COL.yellow);}
        f.mk.visible=!f.res&&dtB<3;f.mk.position.set(hh.pos.x,hh.pos.y+0.06,hh.pos.z);f.mk.scale.setScalar(lerp(0.55,2.2,clamp(dtB/3,0,1)));f.mk.material.opacity=Math.abs(dtB)<0.25?0.95:0.6;
        if(dtB<2.6&&dtB>2.4)teach(P,f.type,(f.type==='paw'?'Медведь замахнулся':'Коршун летит на тебя')+'! Кружок жёлтый сжимается —<br>Жми щит '+K(P,'guard')+', как станет маленьким, — удар отражается!');
        if(!f.res&&rT(S.t)>BT[f.k]+foeWin(P)+0.04){if(btn(P,'guard')){f.res='block';S.tries[P][f.ph]++;S.hits[P][f.ph]++;floatText(hh.pos.clone().add(new V3(0,hh.d.height+0.7,0)),'Закрылся!','#cfe0ff');SFX.shield();}
          else{foeBad(P,f,f.type==='paw'?'Лапой!':'Клюнул!');}}}
      else if(f.type==='storm'){g.visible=true;f.bolts.forEach(b=>{b.visible=Math.sin(G.time*23+b.position.x)>0.2;});
        if(!f.res&&Math.abs(hh.pos.z-f.z)<0.8&&f.lanes.includes(laneOf(P,hh.pos.x))){foeBad(P,f,'Гром!');teach(P,'storm','Грозовая туча — облети её сторонкой '+K(P,'left')+K(P,'right')+'!');}
        else if(!f.res&&hh.pos.z<f.z-1){foeOk(P,f,'Облетел!',1);}}
      else if(f.type==='duo'){const zz=Math.min(active(0).pos.z,active(1).pos.z)-1.8-Math.max(0,dtB)*bl*3.4;g.visible=true;g.position.set(0,f.y0+(f.air?0.3:0),f.res==='ok'?zz-f.t*9:zz);g.rotation.y=f.air?Math.PI:0;
        if(f.air&&f.m.wings)f.m.wings.forEach((w,i)=>{w.rotation.z=(i?-1:1)*Math.sin(G.time*6)*0.6;});if(f.res==='ok'){g.position.y+=f.t*3;}
        const u=clamp(1-dtB,0,1);f.rings.forEach((q,pi)=>{const h=active(pi);q.visible=!f.res&&dtB<2.2;q.position.set(h.pos.x,h.pos.y+0.08,h.pos.z);q.scale.setScalar(lerp(2.2,0.5,clamp((2.2-dtB)/2.2,0,1)));q.material.color.setHex(Math.abs(dtB)<0.2?0xffffff:COL.yellow);});
        f.mk.visible=false;
        if(dtB<2.4&&dtB>2.2&&!f.told){f.told=true;floatText(g.position.clone().add(new V3(0,2.6,0)),f.air?'Вожак стаи!':'Волк-вожак!','#ffe08a');for(const pi of[0,1])teach(pi,'duo','Вожак! Кружки сжимаются у обоих —<br>Жмите щит '+K(pi,'guard')+' вместе, как станут малы, — вас двое!');}
        if(!f.res&&rT(S.t)>BT[f.k]+Math.max(foeWin(0),foeWin(1))*1.2+0.05){const ok=[0,1].map(pi=>f.press[pi]!==null&&Math.abs(f.press[pi])<=foeWin(pi)*1.2);
          if(ok[0]&&ok[1]){f.res='ok';f.t=0;S.duos++;SFX.horn();banner('Богатырский щит!','#ffd76a',1.4,'вдвоём, в одну долю · каждому +5 искр');for(const pi of[0,1]){foeOk(pi,f,'Вместе!',5);burst(active(pi).pos.clone().add(new V3(0,1,0)),0xffffff,12,4);}}
          else{f.res='miss';f.t=0;for(const pi of[0,1]){if(ok[pi]){S.tries[pi][f.ph]++;S.hits[pi][f.ph]++;floatText(active(pi).pos.clone().add(new V3(0,2.2,0)),'Закрылся! Ждём друга — вместе, раз-два-три!','#cfe0ff');}else foeBad(pi,f,'Вместе — в одну долю, в лад!');}}}}}
    for(const e of eyes){e.userData.ph+=dt;e.visible=Math.sin(e.userData.ph*0.9)>-0.5;}
    // бочки катятся навстречу и приходят на свою долю
    for(const o of S.obst){if(o.type!=='barrel')continue;const tl=BT[o.k]-S.t;if(S.state!=='play'){continue;}
      if(tl<3.4&&tl>-2.5){if(!o.g.visible){o.g.visible=true;if(!o.hit)floatText(new V3(o.g.position.x,1.6,o.z-tl*3.5),'Бочка!','#ffd0a0');}o.bz=o.z-tl*3.5;o.g.position.z=o.bz;o.body.rotation.x+=dt*3.5/0.42;}
      else if(tl<=-2.5)o.g.visible=false;}
    for(const q of S.picks)if(!q.taken){q.g.rotation.y+=dt*2.4;q.g.position.y=1.0+Math.sin(G.time*3+q.k)*0.15;}
    // гусь под героем
    for(const pi of[0,1]){const g=geese[pi],hh=active(pi);if(flying(pi)&&S.state==='play'){g.g.visible=true;g.g.position.set(hh.pos.x,hh.pos.y-0.35,hh.pos.z);g.g.rotation.y=Math.PI;g.wings.forEach((w,i)=>{w.rotation.z=(i?-1:1)*Math.sin(G.time*10)*0.6;});
        if(S.fly[pi]-S.t<1.2&&!g.warn){g.warn=true;floatText(hh.pos.clone().add(new V3(0,1.8,0)),'Гусь устал — садимся','#e0f0ff');}}
      else if(g.g.visible){g.g.position.y+=dt*4;g.g.position.z-=dt*6;if(g.g.position.y>9){g.g.visible=false;g.warn=false;}}}
    // лиса бежит позади
    for(const pi of[0,1]){const f=foxes[pi];if(!f.g.visible)continue;const hh=active(pi);
      if(f.trip){f.trip+=dt;f.g.position.z+=dt*(2+f.trip*4);f.body.rotation.x-=dt*9;f.g.position.y=Math.max(0,Math.sin(f.trip*5)*0.6);if(f.trip>2.2)f.g.visible=false;continue;}
      const want=[12,3.6,2.1,0.9][S.fox[pi]];f.d=damp(f.d,want,f.leap?8:2.2,dt);if(f.leap){f.leap+=dt;if(f.leap>0.8)f.leap=0;}
      f.g.position.set(damp(f.g.position.x,hh.pos.x+(pi?0.4:-0.4),6,dt),f.leap?Math.sin(Math.min(1,f.leap/0.8)*Math.PI)*1.2:0,hh.pos.z+f.d);f.g.rotation.y=Math.PI;
      const r=G.time*14;f.legs.forEach((l,i)=>{l.rotation.x=Math.sin(r+(i%2?Math.PI:0)+(i>1?1.2:0))*0.8;});f.tail.rotation.y=Math.sin(G.time*6)*0.4;f.body.position.y=Math.abs(Math.sin(r))*0.08;}
    // декор: бабочки, утки, светлячки
    for(const b of flies){const u=b.g.userData;u.ph+=dt;b.g.position.set(u.x+Math.sin(u.ph*0.7)*0.8,1.1+Math.sin(u.ph*1.3)*0.4,u.z+Math.cos(u.ph*0.5)*0.8);b.ws.forEach((w,i)=>{w.rotation.y=(i?-1:1)*Math.abs(Math.sin(u.ph*14))*1.2;});}
    for(const d of ducks){const u=d.userData;u.ph+=dt*0.5;d.position.set(u.x+Math.sin(u.ph)*1.2,-0.62+Math.sin(u.ph*3)*0.03,u.z+Math.cos(u.ph)*1.2);d.rotation.y=u.ph+Math.PI/2;}
    for(const m of bugs){const u=m.userData;u.ph+=dt;m.position.set(u.x+Math.sin(u.ph*0.8)*0.5,u.y+Math.sin(u.ph*1.6)*0.3,u.z+Math.cos(u.ph*0.6)*0.5);m.visible=Math.sin(u.ph*2.2)>-0.4;}
    // небо и свет меняются от части к части
    {const z=(active(0).pos.z+active(1).pos.z)/2,p=z>Z1?0:z>Z2?1:z>Z3?2:z>Z4?3:4,z0=[0,Z1,Z2,Z3,Z4][p],f=p?clamp((z0-z)/14,0,1):1,a=PARTS[Math.max(0,p-1)],b=PARTS[p];
      palC[0].set(a.sky);palC[1].set(b.sky);scene.background.copy(palC[0]).lerp(palC[1],f);palC[0].set(a.fog);palC[1].set(b.fog);scene.fog.color.copy(palC[0]).lerp(palC[1],f);
      palC[0].set(a.sunC);palC[1].set(b.sunC);sun.color.copy(palC[0]).lerp(palC[1],f);sun.intensity=lerp(a.sunI,b.sunI,f);amb.intensity=lerp(a.amb,b.amb,f);}
    // полосы скорости: на лисьей тропе и в полёте
    {const fast=S.state==='play'&&(S.part>=2||flying(0)||flying(1)),mz=(active(0).pos.z+active(1).pos.z)/2;for(const m of streaks){const u=m.userData;u.dz=(u.dz+dt*34)%30;m.position.set(u.x,u.y,mz-22+u.dz);m.material.opacity=damp(m.material.opacity,fast?0.45:0,4,dt);m.visible=m.material.opacity>0.02;}}
    if(S.state==='play'){S.kolZ=Math.min(S.kolZ,zAt(S.t)-(S.part===2?8:6.5));const air=S.lastK>=4*PB-2;kol.g.position.set(Math.sin(S.t*1.3)*0.5,damp(kol.g.position.y,air?3.3:0,3,dt),S.kolZ);kol.ball.rotation.x-=dt*PARTS[S.part].speed/0.55;
      kgoose.g.visible=air;if(air){kgoose.g.position.set(kol.g.position.x,kol.g.position.y-0.3,kol.g.position.z);kgoose.g.rotation.y=Math.PI;kgoose.wings.forEach((w,i)=>{w.rotation.z=(i?-1:1)*Math.sin(G.time*9)*0.6;});}}
    kol.ball.position.y=0.55+Math.abs(Math.sin((S.state==='final'?S.ft/S.B2:S.lastK+S.bph)*Math.PI))*(S.state==='final'?0.6:0.35);
    if(S.state==='play'&&S.pulse>0.95&&Math.random()<0.35)floatText(kol.g.position.clone().add(new V3(rand(-0.4,0.4),1.5,0)),['♪','♫'][Math.random()<0.5?0:1],'#ffe7a0');
    hudTick();});
  // камера раннера: сзади и чуть сверху, смотрит вперёд по тропе
  const runCam=()=>{const a=active(0),b=active(1),mz=(a.pos.z+b.pos.z)/2,my=Math.max(a.pos.y,b.pos.y),sp=PARTS[S.part].speed,d=7.4+sp*0.3,fx=S.part===2&&!S.foxOff?1:0;
    return {pos:new V3((a.pos.x+b.pos.x)*0.12,4.2+my*0.55+fx*0.9,mz+d+fx*0.8),look:new V3((a.pos.x+b.pos.x)*0.08,0.9+my*0.5,mz-8+fx*2.5),k:6};};
  const prevLeave=W.onLeave;W.onLeave=()=>{document.body.classList.remove('run13');const e=document.getElementById('run13');if(e)e.style.display='none';if(prevLeave)prevLeave();};
  /* ---------- финал: пляска на гуслях — четыре струны зажигаются, когда оба прыгают в одну долю ---------- */
  let gus=null;
  function buildGusli(z){const g=new THREE.Group();g.position.set(0,0,z);W.group.add(g);addMesh(new THREE.BoxGeometry(9,0.3,3.4),M(0x9a6a3c),0,0.15,0,g);addMesh(new THREE.BoxGeometry(9.2,0.12,0.3),M(0x6b3f22),0,0.34,-1.6,g);addMesh(new THREE.BoxGeometry(9.2,0.12,0.3),M(0x6b3f22),0,0.34,1.6,g);
    for(let i=0;i<5;i++)addMesh(new THREE.TorusGeometry(0.3,0.05,6,14),M(0xc0302a),-3.6+i*1.8,0.32,0,g).rotation.x=Math.PI/2;
    const strs=[];for(let i=0;i<4;i++){const m=M(0x8a7a50,{emissive:0x000000});const c=new THREE.CylinderGeometry(0.05,0.05,8.6,6);c.rotateZ(Math.PI/2);const s=addMesh(c,m,0,0.42,-1.1+i*0.73,g);
      const num=makeDigit(0.5,MB(0x8a7a50));num.position.set(-4.9,0.9,-1.1+i*0.73);num.rotation.x=-0.6;g.add(num);strs.push({s,m,num});}
    W.cyls.push({x:0,z,r:0.1,miny:-1,maxy:0,on:false});
    const rings=[0,1].map(pi=>{const r=new THREE.Mesh(new THREE.TorusGeometry(1,0.06,6,30),MB(PCOL[pi],{transparent:true,opacity:0.9}));r.rotation.x=Math.PI/2;W.group.add(r);return r;});
    return {g,z,strs,rings};}
  // три стадии пляски: раз-два (вместе) → перекличка (по очереди) → хоровод (прыжок и хлопок щитом, быстрее)
  const FST=[{name:'Пляска · раз-два',bpm:66,n:4,line:12,tr:2,sub:'прыгайте вдвоём на каждый звон — вместе прыгнули, струна загорелась',act:b=>'J',who:b=>2},
    {name:'Пляска · перекличка',bpm:78,n:8,line:8,tr:4,sub:'по очереди: оранжевый звон — Прошка прыгает, сиреневый — Пелагея. Две ноты — одна струна',act:b=>'J',who:b=>b%2},
    {name:'Пляска · хоровод',bpm:90,n:8,line:0,tr:5,sub:'над головой подсказка: прыжок — прыгайте вдвоём, щит — хлопок щитом вдвоём',act:b=>'JJCJJCCJ'[b],who:b=>2}];
  S.FST=FST;
  function startFinal(st){const P=FST[st];S.state='final';S.fs=st;S.B2=60/P.bpm;S.ft=-4*S.B2;S.fk=-5;S.fin=Array.from({length:P.n},()=>[false,false]);S.fres=Array(P.n).fill(null);S.lit=[false,false,false,false];
    if(gus)gus.strs.forEach(q=>{q.m.color.setHex(0x8a7a50);q.m.emissive.setHex(0x000000);q.m.emissiveIntensity=0;});
    banner(P.name+' · '+(st+1)+' / 3','#ffd76a',2.8,P.sub);}
  const need13=(P,b,pi)=>P.who(b)===2||P.who(b)===pi;
  function finalTick(dt){const P=FST[S.fs],per=P.n/4;S.ft+=dt;const k=Math.floor(S.ft/S.B2+1e-6);
    while(S.fk<k){S.fk++;const n=S.fk;if(n<0){tone(1760,0.06,'square',0.05);banner(['И-и…','раз…','два…','три…'][n+4]||'','#ffe7a0',0.5);}
      else{const b=n%P.n,si=Math.floor(b/per),li=(P.line+b)%16,line=SONG_C[li];gusli(line[0]+P.tr,0,0.14);if(S.fs>0&&line[1])gusli(line[1]+P.tr,S.B2/2,0.1);tone(mf(SONG_BASS[li]+P.tr),0.5,'sine',0.2);tone(2600,0.05,'square',0.04);S.pulse=1;
        if(P.act(b)==='C')tone(180,0.08,'square',0.12);
        const q=gus.strs[si];if(!S.lit[si])q.m.color.setHex(P.who(b)===2?(P.act(b)==='C'?0xbfe0ff:0xfff0a0):PCOL[P.who(b)]);}
      rumble(0,0.02,0.05);rumble(1,0.02,0.05);}
    const win=Math.max(winOf(0),winOf(1))*1.7;
    for(let b=0;b<P.n;b++){const bt=b*S.B2;if(S.fin&&rT(S.ft)>bt+win&&S.fres[b]===null){const w=P.who(b),ok=w===2?S.fin[b][0]&&S.fin[b][1]:S.fin[b][w];S.fres[b]=ok?'ok':'bad';const si=Math.floor(b/per);
        if(b%per===per-1&&!S.lit[si]){let all=true;for(let q=si*per;q<=b;q++)if(S.fres[q]!=='ok')all=false;
          if(all){S.lit[si]=true;const q=gus.strs[si];q.m.color.setHex(COL.gold);q.m.emissive.setHex(0xffb000);q.m.emissiveIntensity=1;[0,4,7].forEach((d,i)=>gusli(67+si*2+d+S.fs*2,i*0.05,0.18));burst(new V3(0,0.6,gus.z-1.1+si*0.73),COL.gold,16,4);
            kol.g.position.x=-3+si*2;kol.g.position.y=0.3;floatText(new V3(0,1.6,gus.z),'Струна '+(si+1)+'!','#ffd76a');}
          else{gus.strs[si].m.color.setHex(0x8a7a50);floatText(new V3(0,1.4,gus.z-1.1+si*0.73),P.who(b)===2?'почти… вместе!':'почти… по очереди, по очереди!','#dddddd');}}}}
    const nb=((Math.ceil(S.ft/S.B2-1e-6)%P.n)+P.n)%P.n,u=(((S.ft/S.B2)%1)+1)%1;
    for(const pi of[0,1]){const h=active(pi),r=gus.rings[pi];r.visible=S.ft>-S.B2&&need13(P,nb,pi);r.position.set(h.pos.x,0.08,h.pos.z);r.scale.setScalar(lerp(2.0,0.45,u));r.material.color.setHex(P.act(nb)==='C'?COL.yellow:PCOL[pi]);}
    if(S.ft>(P.n-1)*S.B2+win+0.02){if(S.lit.every(x=>x)){S.fin=null;gus.rings.forEach(r=>{r.visible=false;});SFX.ok();
        if(S.fs<2){banner('Струны горят!','#ffd76a',1.8,S.fs===0?'дальше — перекличка: по очереди, чередом':'дальше — хоровод: быстрее да с хлопками');[0,4,7,12].forEach((d,i)=>later(i*0.12,()=>gusli(64+d+S.fs*2,0,0.16)));later(2.2,()=>startFinal(S.fs+1));}
        else{S.state='done';banner('Вместе!','#ffd76a',2,'все три пляски — ваши, вот так лад!');SONG_C.forEach((l,i)=>{later(i*0.28,()=>{gusli(l[0]+2,0,0.16);gusli(l[1]?l[1]+2:0,0.14,0.13);});});later(1.6,giftScene);}}
      else{S.ft-=P.n*S.B2;S.fk-=P.n;S.fin=Array.from({length:P.n},()=>[false,false]);S.fres=Array(P.n).fill(null);}}}
  function stopScene(){const T=HERO;if(players[0].act!==0)doSwap(0);if(players[1].act!==0)doSwap(1);const pr=T.proshka;
    foxes.forEach(f=>{f.g.visible=false;});geese.forEach(g=>{g.g.visible=false;});kgoose.g.visible=false;kol.g.position.y=0;
    const kx=pr.pos.x+0.6,kz=pr.pos.z-2.6;
    play({dur:22,fov:48,
      shots:[shot(0,[pr.pos.x+4,2.6,pr.pos.z+3],[kx,0.8,kz]),shot(3.2,[kx+1.4,1.3,kz-2.4],[kx,0.8,kz]),shot(6.6,[pr.pos.x-1.6,1.9,pr.pos.z-1.2],[pr.pos.x,1.0,pr.pos.z]),
        shot(11,[kx+1.2,1.3,kz-2.2],[kx,0.8,kz]),shot(14,[pr.pos.x-1.8,2.0,pr.pos.z-1.4],[pr.pos.x,1.0,pr.pos.z]),shot(18.8,[4.5,2.4,pr.pos.z+2.2],[2.6,0.8,pr.pos.z])],
      says:[[1.0,2.2,null,'<i>Музыка замирает. Колобок пред Прошкой встаёт</i><br><i>И зажмуривается — вот-вот его съедят, он ждёт.</i>',true],[3.4,3.2,'kolobok','Ну, ешь. В сказке лиса меня всегда съедает — таков уж сказ.'],
        [6.8,3.8,'proshka','<i>(фыркает)</i> Не буду я тебя есть. Ты же из теста, в тебе никакой конструкции.'],[11.2,2.4,'kolobok','А так можно было, правда?'],
        [14.1,4.2,'proshka','Катишься сам? Значит, внутри пружина. Ладно. Пусть будет волшебная пружина.'],[18.8,3,null,'<i>Пелагея в тетрадке нового Колобка рисует,</i><br><i>А Прошка будто не видит — и бровью не поведёт, не ревнует.</i>',true]],
      events:[{t:0,fn:()=>{kol.g.position.set(kx,0,kz);kol.g.rotation.y=Math.atan2(pr.pos.x-kx,pr.pos.z-kz);pr.face=Math.atan2(kx-pr.pos.x,kz-pr.pos.z);kol.lids.forEach(l=>{l.rotation.x=0.2;});}},
        {t:11,fn:()=>{kol.lids[0].rotation.x=-0.5;}},{t:11.6,fn:()=>{kol.lids[1].rotation.x=-0.5;}},
        {t:18.8,fn:()=>{const pe=T.pelageya;pe.face=Math.PI/2;floatText(pe.pos.clone().add(new V3(0,1.6,0)),'✎','#e7c3ff');}}],
      end:()=>{kol.lids.forEach(l=>{l.rotation.x=-0.5;});const z0=T.proshka.pos.z-5;gus=buildGusli(z0);kol.g.position.set(0,0.3,z0);
        [[0,-2.8],[1,-4.2],[2,2.8],[3,4.2]].forEach(([i,x])=>{const h=HEROES[i];placeOnGround(h,x,z0+(i%2?3.8:2.6),0);h.face=Math.PI;});snapCams();
        banner('Песня сызнова — пляска на гуслях!','#ffd76a',2.4,'три пляски: раз-два, перекличка да хоровод');later(1.4,()=>startFinal(0));}});}
  function giftScene(){const T=HERO,pr=T.proshka,kp=kol.g.position;
    play({dur:7.5,fov:48,shots:[shot(0,[kp.x+3,2.4,kp.z+4.5],[kp.x,1,kp.z+1])],
      says:[[0.5,3.4,'kolobok','Я теперь буду рассказывать, что лиса попалась хорошая.']],
      events:[{t:3.8,fn:()=>{const it=linkItem(kp.x,1.6,kp.z);W.linkTotal--;anim(1.0,k=>{it.base=1.6+k*0.2;it.pos.lerpVectors(new V3(kp.x,1.6,kp.z),pr.pos.clone().add(new V3(0,1.2,0)),smooth(k));if(k>=1)takeItem(it,pr);});}}],
      end:()=>{banner('Лад: '+S.best[0]+' и '+S.best[1]+' подряд','#ffe7a0',2.6,'искры: '+S.got[0]+' + '+S.got[1]);later(1.4,()=>{F.out=true;finishLevel();});}});}
  W.zvenGoal=()=>new V3(kol.g.position.x*0.5,3.2,kol.g.position.z+1.5);W.zvenFree=true;
  /* ---------- рисунки кнопок и задачи ---------- */
  const ahead=(pi,f,d)=>S.obst.some(o=>o.pi===pi&&!o.hit&&f(o)&&(o.type==='barrel'?o.bz:o.z)<active(pi).pos.z&&active(pi).pos.z-(o.type==='barrel'?o.bz:o.z)<(d||4.5));
  const blocked=(pi,l)=>ahead(pi,o=>(o.type==='stump'||o.type==='hole'||o.type==='barrel')&&o.lanes.includes(l),6.5);
  const nextStr=pi=>S.strings.find(q=>q.pi===pi&&!q.used&&q.z<active(pi).pos.z+1.3);
  for(const pi of[0,1]){
    const play_=()=>S.state==='play'&&!flying(pi);
    prompt(pi,'jump',()=>headOf(active(pi)),()=>play_()&&(()=>{const s=nextStr(pi);return s&&Math.abs(s.z-active(pi).pos.z)<2.6&&s.lanes.includes(S.lane[pi]);})(),'в такт');
    prompt(pi,'jump',()=>headOf(active(pi)),()=>play_()&&ahead(pi,o=>o.type==='log'),'коряга');
    prompt(pi,'roll',()=>headOf(active(pi)),()=>play_()&&ahead(pi,o=>o.type==='branch',5),'ветка');
    prompt(pi,'right',()=>headOf(active(pi)),()=>play_()&&blocked(pi,S.lane[pi])&&S.lane[pi]<2&&!blocked(pi,S.lane[pi]+1),'в сторону');
    prompt(pi,'left',()=>headOf(active(pi)),()=>play_()&&blocked(pi,S.lane[pi])&&S.lane[pi]>0&&(S.lane[pi]===2||blocked(pi,S.lane[pi]+1))&&!blocked(pi,S.lane[pi]-1),'в сторону');
    const pitNear=()=>ahead(pi,o=>o.type==='pit',10);
    prompt(pi,'right',()=>headOf(active(pi)),()=>play_()&&pitNear()&&S.lane[pi]<1,'к струне');
    prompt(pi,'left',()=>headOf(active(pi)),()=>play_()&&pitNear()&&S.lane[pi]>1,'к струне');
    prompt(pi,'guard',()=>headOf(active(pi)),()=>play_()&&S.beasts.some(b=>b.pi===pi&&!b.res&&Math.abs(b.z-active(pi).pos.z)<5),'в такт');
    const nbF=()=>{const P=FST[S.fs];return ((Math.ceil(S.ft/S.B2-0.2)%P.n)+P.n)%P.n;};
    prompt(pi,'jump',()=>headOf(active(pi)),()=>S.state==='final'&&!!S.fin&&(()=>{const P=FST[S.fs],b=nbF();return P.act(b)==='J'&&need13(P,b,pi);})(),()=>S.fin&&FST[S.fs].who(nbF())===2?'вместе':'твой звон');
    prompt(pi,'guard',()=>headOf(active(pi)),()=>S.state==='final'&&!!S.fin&&FST[S.fs].act(nbF())==='C','хлоп вдвоём');
    const foeNear=(f,d)=>S.foes.some(q=>q.pi===pi&&!q.res&&f(q)&&(BT[q.k]-S.t)<d&&(BT[q.k]-S.t)>-0.1);
    prompt(pi,'guard',()=>headOf(active(pi)),()=>S.state==='play'&&foeNear(q=>q.type==='paw'||q.type==='hawk',1.2),'щит в такт');
    prompt(pi,'attack',()=>headOf(active(pi)),()=>S.state==='play'&&S.foes.some(q=>q.pi===pi&&q.res==='parry'&&S.t<q.cw),'бей!');
    prompt(pi,'jump',()=>headOf(active(pi)),()=>S.state==='play'&&foeNear(q=>q.type==='boar',0.9),'кабан');
    prompt(pi,'move',()=>headOf(active(pi)),()=>S.state==='play'&&foeNear(q=>(q.type==='lunge'||q.type==='crow')&&q.locked&&q.lane===S.lane[pi],1.3),'в сторону!');
    prompt(pi,'move',()=>headOf(active(pi)),()=>S.state==='play'&&S.foes.some(q=>q.type==='storm'&&q.pi===pi&&!q.res&&q.lanes.includes(S.lane[pi])&&active(pi).pos.z-q.z<14&&active(pi).pos.z>q.z),'туча — облети');
    prompt(pi,'guard',()=>headOf(active(pi)),()=>S.state==='play'&&S.foes.some(q=>q.type==='duo'&&!q.res&&(BT[q.k]-S.t)<1.3&&(BT[q.k]-S.t)>-0.1),'вдвоём!');
    W.objectives[pi]=[
      O(()=>'За Колобком беги! Дорожки — '+K(pi,'left')+K(pi,'right')+'.<br>Струна поперёк тропы — прыгай '+K(pi,'jump')+' под бубенец: подкинет — будешь браво!',()=>S.lastK>=PB,()=>{const s=nextStr(pi);return s?[s.g]:[];}),
      O(()=>'Мост через речку. Дыры да бочки — обегай стороной.<br>Возьми перо — гусь-лебедь понесёт над мостом, над водой.',()=>S.lastK>=2*PB,()=>S.picks.filter(q=>q.pi===pi&&!q.taken&&q.kind==='goose').map(q=>q.g)),
      O(()=>'Лиса сзади! Трижды подряд не споткнись — искры утащит.<br>А в конце — три струны подряд, кто вперёд обрящет!',()=>S.lastK>=3*PB||S.state!=='play',()=>[]),
      O(()=>'Волчья чаща! Красный круг — на другую дорожку '+K(pi,'left')+K(pi,'right')+' или кувырок '+K(pi,'roll')+'.<br>Жёлтый — щит '+K(pi,'guard')+' в такт, потом бей '+K(pi,'attack')+'. Кабан — прыжок '+K(pi,'jump')+'. Вожак — щит вдвоём, дружок.',()=>S.lastK>=4*PB||S.state!=='play',()=>S.foes.filter(q=>(q.pi===pi||q.pi===2)&&!q.res&&q.m.g.visible).map(q=>q.m.g)),
      O(()=>'Гуси-лебеди! Красная ворона — перелети на соседнюю тропку.<br>Жёлтый коршун — щит '+K(pi,'guard')+' в такт и бей '+K(pi,'attack')+'. Туча — облети. Вожак — щит вдвоём, в охотку.',()=>S.state!=='play',()=>S.foes.filter(q=>(q.pi===pi||q.pi===2)&&!q.res&&q.m.g.visible).map(q=>q.m.g)),
      O(()=>{const st=S.fs||0,P=FST[st];return 'Пляска на гуслях '+(st+1)+' / 3 · '+(st===0?'прыгайте '+K(pi,'jump')+' вместе на каждый звон —<br>Четыре струны зажгите — вот вам и лад, и звон!':st===1?'по очереди: '+(pi?'твой звон — сиреневый':'твой звон — оранжевый')+', прыгай '+K(pi,'jump')+' на свой.<br>Четыре струны зажгите — пусть поют над головой!':'над головой подсказка: прыжок '+K(pi,'jump')+' вдвоём иль хлопок щитом '+K(pi,'guard')+' вдвоём.<br>Четыре струны зажгите — вот и пляс, и гром!');},()=>S.state==='done',()=>[kol.g]),
      O('Колобок звено отдаёт',()=>false,()=>[kol.g])];}
  W.spawns=[[new V3(LANES[0][1],0,10),new V3(LANES[0][1]-0.55,0,11.8)],[new V3(LANES[1][1],0,10),new V3(LANES[1][1]+0.55,0,11.8)]];W.startAct=[0,0];
  W.pauseLine='Колобок катится по опушке, через речку, лисьей тропой да волчьей чащей,<br>А там гуси-лебеди всех несут над долиной, над пущей.<br>Беги за ним: дорожки, прыжки, струны под бубенец;<br>Красное — в сторону, жёлтое — щит в такт и бей. Три пляски на гуслях вдвоём — всему венец.';
  W.onStart=()=>{S.state='cine';play({dur:5.2,fov:50,shots:[shot(0,[0,3,6],[0,0.8,-6]),shot(2.6,[2,1.6,-2],[0,0.8,-6])],
    says:[[0.3,2.4,'kolobok','Я от бабушки ушёл, я от дедушки ушёл…'],[2.7,2.4,'zven','Колобок весь в песне. Бегите в такт — догоните!']],
    tick:t=>{kol.ball.rotation.y=Math.sin(t*3)*0.3;kol.ball.position.y=0.55+Math.abs(Math.sin(t*5))*0.3;},end:()=>{S.state='play';W.camFn=runCam;snapCams();}});};
  flushDecor();flushPuffs();}

