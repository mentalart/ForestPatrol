/* ============================== РЕЛИЗ final06 · 3-1 «САД МОЛОДИЛЬНЫХ ЯБЛОК» — ВТРОЕ БОЛЬШЕ: КТО ЯБЛОЧКО ОТКУСИТ — ТОТ ПОМОЛОДЕЕТ ============================== */
// По сказкам «О молодильных яблоках и живой воде» и «Иван-царевич, Жар-птица и серый волк». Раньше название уровня не раскрывалось:
// яблони серые, Жар-птица облезлая — а почему «молодильных», не говорилось. Теперь сюжет прямо про это:
//   Ролик у гнезда: сад Жар-птицы — сад молодильных яблок («кто яблочко откусит — тот помолодеет»); тени Кощея яблоки покрали —
//   яблони посерели, а Жар-птица состарилась. Прежние участки (перо, светомостки и тенемостки, чаши, тёмные аллеи) — без изменений.
//   Дальше — новое. Ожившая яблоня роняет МОЛОДИЛЬНОЕ ЯБЛОЧКО: подойдёшь — в руки; несёшь над головой; удар — бросок вперёд
//   (к другу — сам прицелится, друг ловит); поднесёшь к старому — тот молодеет на глазах:
//   Ж «Дед-Садовник» — старик у ворот сада, спина колесом, ворот не отпереть. Яблочко — и он добрый молодец: ворота настежь,
//      и он сам объясняет, почему сад зовётся «молодильных яблок» и куда тени носят яблоки.
//   З «Трухлявый мост» — мост рассыпается под ногами; яблочко — и мост как новенький.
//   И «Передай яблочко» — лиловые мостки (во тьме), а яблочко светится: с ним по ним не пройти. Встаньте на островке и на том берегу
//      и перебросьте яблочко из рук в руки (или Потап подкинет Пелагею с яблочком — долетит). Дуб-старик загородил проход:
//      яблочко — и «был дуб — стал дубок».
//   К «Спящая стража» (как в сказке: стражи спят — не буди, струн на стене не задевай) — пугала-сторожа просыпаются от света
//      пера рядом и от звона струн; Йоша под струной пролезет, остальным — прыгать. Тихо прошли — орешек.
//      Старые ступени наверх рассыпались — яблочко ступеням.
//   Л «Тени-воришки» — тени уносят яблоки и боятся света: загоните в угол двумя светами (оставленный со светом тоже светит) и
//      коснитесь — яблочко вернётся на свою яблоню.
//   М «Колодец живой воды» — мини-босс Кощеев Ворон, триста лет живёт, хочет унести Кощею Царь-яблоко.
//      1 «В небе»: кружит и пикирует (красное — кувырок); две чаши-солнышка разом — ослеп и упал: в свете бей.
//      2 «Царь-яблоко»: Ворон держит Царь-яблоко, взмахом гасит перья; старое перо — железное: бить его — молодильным яблочком!
//         Три попадания — и Ворон молодеет… в воронёнка. Царь-яблоко — Жар-птице: она молодеет, сад вспыхивает золотом.
// В одиночку: оставленный держит перо и ловит яблочко, Ворон целится только в того, кем играешь, окна длиннее.
// Звеньев по-прежнему 4 (четвёртое — от Жар-птицы в конце), орешков 10.
{const L=LEVELS.find(l=>l.id==='3-1');if(L)L.nuts=10;}
WHO.sadovnik=['Дед-Садовник','#d8e0b8'];VOICE.sadovnik={f:140,w:'triangle',sp:0.14};
WHO.molodets=['Садовник','#a8e08a'];VOICE.molodets={f:210,w:'triangle',sp:0.1};
WHO.voron=['Кощеев Ворон','#a8acc8'];VOICE.voron={f:105,w:'sawtooth',sp:0.13};
WHO.voronenok=['Воронёнок','#c8c8d8'];VOICE.voronenok={f:950,w:'square',sp:0.06};
FOE.voron31={r:1.3,emb:6,sig:['red'],sp:0.01,look:'voron31',big:true};
// Кощеев Ворон: старый, взъерошенный, седые брови, в когтях (этап 2) — Царь-яблоко
FL.voron31=(inner)=>{const bk=M(0x23232e),bk2=M(0x3a3a4e,{emissive:0x101828,emissiveIntensity:0.3}),gr=M(0x8a8a96),beakM=M(0x4a4a54),gold=M(0xffc830,{emissive:0xff9a10,emissiveIntensity:0.9});
  const body=new THREE.Group();inner.add(body);const torso=new THREE.Mesh(new THREE.SphereGeometry(0.75,12,10),bk);torso.scale.set(0.9,0.95,1.35);torso.position.y=1.35;torso.castShadow=true;body.add(torso);
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2,c=new THREE.Mesh(new THREE.ConeGeometry(0.12,0.5,4),bk2);c.position.set(Math.cos(a)*0.55,1.55+Math.sin(i*2.1)*0.25,Math.sin(a)*0.75-0.2);c.rotation.set(-1.2+Math.sin(i)*0.4,0,Math.cos(a)*0.8);body.add(c);}
  const head=new THREE.Group();head.position.set(0,2.15,0.82);body.add(head);const hm=new THREE.Mesh(new THREE.SphereGeometry(0.42,12,10),bk);head.add(hm);
  const bkG=new THREE.ConeGeometry(0.14,0.7,6);bkG.rotateX(Math.PI/2);const beak=new THREE.Mesh(bkG,beakM);beak.position.set(0,-0.05,0.62);head.add(beak);
  for(const s of[-1,1]){const br=new THREE.Mesh(new THREE.BoxGeometry(0.26,0.07,0.08),gr);br.position.set(s*0.18,0.22,0.36);br.rotation.z=s*-0.35;head.add(br);}
  for(let i=0;i<4;i++){const t=new THREE.Mesh(new THREE.ConeGeometry(0.05,0.3,4),gr);t.position.set((i-1.5)*0.1,0.42,-0.05);t.rotation.x=-0.5+i*0.1;head.add(t);}
  const wings=[];for(const s of[-1,1]){const wp=new THREE.Group();wp.position.set(s*0.6,1.65,0.1);body.add(wp);
    for(let k=0;k<5;k++){const f=new THREE.Mesh(new THREE.BoxGeometry(1.5-k*0.18,0.06,0.42),k%2?bk2:bk);f.position.set(s*(0.7-k*0.04),-0.05*k,-0.25*k+0.3);f.rotation.y=s*0.18*k;wp.add(f);}wings.push({wp,s});}
  for(let i=0;i<5;i++){const t=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.05,0.9),i%2?bk2:bk);t.position.set((i-2)*0.12,1.15,-1.2);t.rotation.set(0.35,(i-2)*0.18,0);body.add(t);}
  const legs=[];for(const s of[-1,1]){const l=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.75,5),beakM);l.position.set(s*0.25,0.4,0.15);body.add(l);legs.push(l);
    for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(0.03,0.22,4),beakM);c.position.set(s*0.25+(k-1)*0.07,0.04,0.28);c.rotation.x=Math.PI/2;body.add(c);}}
  const apple=new THREE.Group();apple.position.set(0,0.55,0.75);body.add(apple);const am=new THREE.Mesh(new THREE.SphereGeometry(0.34,14,12),gold);apple.add(am);
  const lf=new THREE.Mesh(new THREE.SphereGeometry(0.12,6,4),M(0x5ab040));lf.scale.set(1.6,0.3,0.8);lf.position.set(0.1,0.36,0);apple.add(lf);apple.visible=false;
  return {body,head,wings,legs,apple,eyeY:2.24,eyeZ:1.17,eyeX:0.2,eyeS:1.15,top:2.9,lid:hp(0x23232e),noThreads:true};};
// молодильное яблочко: золотое, светится (свет — 2,4 м: тенемостки под ним гаснут); Царь-яблоко — крупнее
function appleMesh31(s){const g=new THREE.Group();const m=M(0xffc830,{emissive:0xff9a10,emissiveIntensity:0.85});const a=new THREE.Mesh(new THREE.SphereGeometry(0.2,12,10),m);a.scale.set(1,0.92,1);g.add(a);
  const st=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.02,0.12,5),M(0x6a4a2a));st.position.y=0.21;g.add(st);
  const lf=new THREE.Mesh(new THREE.SphereGeometry(0.07,6,4),M(0x5ab040));lf.scale.set(1.6,0.3,0.8);lf.position.set(0.07,0.23,0);g.add(lf);
  g.add(new THREE.Mesh(new THREE.SphereGeometry(0.42,10,8),MB(0xffe08a,{transparent:true,opacity:0.22,depthWrite:false})));
  g.scale.setScalar(s||1);g.traverse(c=>{c.userData.noBatch=true;});W.group.add(g);return g;}
// молодой садовник: тем же «скелетным» китом, что и персонажи релиза (кудри, рубаха с поясом, сапоги)
function buildMolodets31(){const R=castRig(1.55,61),SH=cc(0xffffff,0xf0ece0,0xc8c0b0),S=PAL.skins[1],HR=cc(0xc08a4a,0x8a5a2a,0x5a3a1a),BL=cc(0xe05a4a,0xc0302a,0x80201a);
  R.bone('hips','root',0,0.5,0);R.bone('chest','hips',0,0.38,0);R.bone('neck','chest',0,0.22,0);R.bone('head','neck',0,0.13,0);
  R.part('hips',KP.lathe([[0,-0.5],[0.34,-0.5],[0.36,-0.2],[0.33,0.05],[0,0.07]],9),cc(0x6a8ac0,0x4a6aa0,0x2a4a78));
  for(const s of[-1,1])R.box('hips',0.14,0.1,0.26,cc(0x8a5a3a,0x6a4026,0x4a2a18),tm(s*0.13,-0.47,0.12),{s:0});
  R.part('chest',KP.lathe([[0,-0.32],[0.38,-0.3],[0.36,-0.02],[0.3,0.14],[0.16,0.22],[0,0.23]],9),SH);R.part('chest',KP.tor(0.37,0.04,3,14),BL,tm(0,-0.27,0,Math.PI/2,0,0),{kN:0.3});
  R.box('chest',0.05,0.26,0.02,BL,tm(0.1,0,0.33),{b:0});
  R.part('neck',KP.cyl(0.08,0.1,0.14,6),S);R.part('head',hSph(0.24,8,6),S,tm(0,0,0,0,0,0,1,1.05,1));
  R.part('head',hSph(0.26,8,6),HR,tm(0,0.09,-0.05,0,0,0,1.05,0.7,1.05),{noise:0.01});for(const s of[-1,1])R.part('head',KP.cone(0.07,0.16,4),HR,tm(s*0.15,0.12,0.14,0.7,0,s*0.6),{s:0.2});
  const ns=KP.cone(0.05,0.12,5);ns.rotateX(Math.PI/2);R.part('head',ns,cc(0xffc0a0,0xf0a080,0xc07050),tm(0,-0.02,0.25),{s:0.1});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.085,0.05,0.21,0.045,cc(0x9ad08a,0x5aa04a,0x2a6a2a),{lid:S});hBrow(R,n,s*0.09,0.13,0.22,0.08,HR,-s*0.1);}
  hMouth(R,0,-0.11,0.22,0.03);
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('a'+n,'chest',s*0.36,0,0.06);R.part('a'+n,KP.cyl(0.07,0.065,0.5,6),SH,tm(0,-0.2,0.08,0.5,0,0));R.part('a'+n,hSph(0.065,6,4),S,tm(0,-0.4,0.2));}
  return R;}
function makeMolodets31(){try{const R=buildMolodets31(),o=castMake(R),B=o.rig;return regNpc(castReg(Object.assign(o,{head:B.head,arms:[B.aR,B.aL]}),{hs:1}),'molodets');}
  catch(err){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);addMesh(new THREE.CylinderGeometry(0.3,0.36,1.0,8),M(0xf0ece0),0,0.9,0,body);addMesh(new THREE.SphereGeometry(0.24,10,8),M(0xf0c8a0),0,1.62,0,body);
    addMesh(new THREE.SphereGeometry(0.26,10,8),M(0x8a5a2a),0,1.72,-0.04,body).scale.set(1,0.7,1);return {g,body};}}
function makeOldGardener31(){try{const o=makeStarik();if(o.net)o.net.visible=false;regNpc(o,'sadovnik');return o;}
  catch(err){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);addMesh(new THREE.CylinderGeometry(0.32,0.4,0.9,8),M(0x8ab0e0),0,0.8,0,body);addMesh(new THREE.SphereGeometry(0.24,10,8),M(0xf0c8a0),0,1.45,0,body);
    const bd=new THREE.ConeGeometry(0.22,0.6,8);bd.rotateX(Math.PI);addMesh(bd,M(0xffffff),0,1.15,0.12,body);return {g,body};}}
// воронёнок — во что превратился Ворон от молодильных яблок
function chickMesh31(){const g=new THREE.Group();W.group.add(g);const fl=M(0x6a6a7c),bel=M(0x9a9aac),bk=M(0xffc040);
  const b=new THREE.Mesh(new THREE.SphereGeometry(0.4,12,10),fl);b.position.y=0.42;g.add(b);const be=new THREE.Mesh(new THREE.SphereGeometry(0.3,10,8),bel);be.position.set(0,0.36,0.16);be.scale.set(1,0.9,0.6);g.add(be);
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2,p=new THREE.Mesh(new THREE.SphereGeometry(0.12,6,5),fl);p.position.set(Math.cos(a)*0.36,0.5+Math.sin(i*1.7)*0.12,Math.sin(a)*0.32);g.add(p);}
  const head=new THREE.Group();head.position.set(0,0.88,0.1);g.add(head);head.add(new THREE.Mesh(new THREE.SphereGeometry(0.26,12,10),fl));
  const bg=new THREE.ConeGeometry(0.06,0.18,6);bg.rotateX(Math.PI/2);const beak=new THREE.Mesh(bg,bk);beak.position.set(0,-0.04,0.28);head.add(beak);
  for(const s of[-1,1]){const ew=new THREE.Mesh(new THREE.SphereGeometry(0.085,8,6),M(0xffffff));ew.position.set(s*0.1,0.05,0.2);head.add(ew);const ep=new THREE.Mesh(new THREE.SphereGeometry(0.05,6,5),MAT.dark);ep.position.set(s*0.1,0.05,0.27);head.add(ep);
    const hl=new THREE.Mesh(new THREE.SphereGeometry(0.018,4,4),MB(0xffffff));hl.position.set(s*0.09,0.08,0.31);head.add(hl);}
  for(let i=0;i<3;i++){const t=new THREE.Mesh(new THREE.ConeGeometry(0.035,0.16,4),fl);t.position.set((i-1)*0.06,0.26,0);t.rotation.z=(i-1)*0.4;head.add(t);}
  const wings=[];for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.SphereGeometry(0.16,8,6),fl);w.scale.set(0.5,1,1.2);w.position.set(s*0.38,0.48,-0.02);g.add(w);wings.push(w);}
  for(const s of[-1,1]){const f=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.03,0.16),bk);f.position.set(s*0.12,0.02,0.08);g.add(f);}
  g.traverse(c=>{c.userData.noBatch=true;});return {g,head,wings};}
build31=function(){
  W.zvenAway=true;W.world=3;setTheme('heaven');W.name='3-1 · «Сад молодильных яблок»';W.sub='Небесное царство · перо Жар-птицы · кто яблочко откусит — тот помолодеет';W.camX=12;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=false;W.abil.pero=false;W.fallY=-12;W.k31=true;
  heavenDecor(-505,20);const T=HERO;
  /* ---------- А. облачный остров: гнездо Жар-птицы (прежнее) ---------- */
  cloudIsle(-8,8,-8,8,0);
  addMesh(new THREE.CylinderGeometry(1.9,2.3,0.3,18),CLOUD_TOP,0,0.15,-4.5);W.cyls.push({x:0,z:-4.5,r:2.1,miny:-1,maxy:0.3,on:true});
  const nest=nestMesh(0,0.28,-4.5,1.5);const fb=makeFirebird({bald:true});fb.g.position.set(0,0.42,-4.7);fb.g.scale.setScalar(0.95);
  const key=blackKey(1.6);key.position.set(0.6,0.57,-4.1);key.rotation.z=1.4;W.group.add(key);for(let i=0;i<6;i++){const sh=addMesh(new THREE.SphereGeometry(0.1,8,6,0,Math.PI*2,0,Math.PI/2),M(0xf4ecd8),rand(-0.8,0.8),0.44,-4.5+rand(-0.7,0.7));sh.rotation.x=rand(-1,1);}
  appleTree(-5.5,4.5,0,{s:0.9});appleTree(5.8,3.8,0,{s:0.95});bell(-3,2);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,3);
  const steps=[];for(let i=0;i<7;i++){const st=new THREE.Group();st.position.set(Math.sin(i*0.9)*2.4,-7.5+i*1.1,17-i*1.6);W.group.add(st);for(let k=0;k<3;k++){const p=new THREE.Mesh(PUFF_GEO,CLOUD_TOP);p.position.set(k*0.6-0.6,0,rand(-0.2,0.2));p.scale.set(0.8,0.35,0.8);st.add(p);}steps.push(st);}
  /* ---------- Б–Г. светомостки, тенемостки, первая яблоня (прежнее) ---------- */
  mostki('light',[[0,0,-8],[0,0,-20]]);edgeSign(1.4,0,-7.4,'light');
  cloudIsle(-4,4,-28,-20,0);const n1=nutItem(3.1,0.6,-26.6);
  mostki('shadow',[[0,0,-28],[0,0,-38]]);edgeSign(1.4,0,-27.4,'shadow');
  cloudIsle(-4,4,-46,-38,0);bell(-2.6,-40.5);
  mostki(n=>Math.floor(n/3)%2?'shadow':'light',[[0,0,-46],[0,0,-66]]);edgeSign(1.4,0,-45.4,'light');edgeSign(-1.4,0,-45.4,'shadow');
  cloudIsle(-6,6,-78,-66,0);const L1=linkItem(0,1.1,-68.2);bell(3.2,-67.6);
  const T1=appleTree(-3.4,-72.6,0,{lr:6,onRevive:()=>{banner('Яблоня ожила!','#ffe08a',2.2,'сад светлеет — и новый край открывает');SFX.ok();}});
  mostki('light',[[-6,0,-73],[-9.5,0,-73]],{on:()=>T1.revived});cloudIsle(-13.5,-9.5,-76,-70,0);const L2=linkItem(-11.5,1.1,-72);const n2=nutItem(-12.6,0.6,-75);
  /* ---------- Д. две дорожки и чаши (прежнее) ---------- */
  mostki('light',[[-5,0,-78],[-5,0,-84],[5,0,-96],[5,0,-104]],{w:2});mostki('shadow',[[5,0,-78],[5,0,-84],[-5,0,-96],[-5,0,-104]],{w:2});
  edgeSign(-6.4,0,-77.4,'light');edgeSign(6.4,0,-77.4,'shadow');const n3=nutItem(5,1.9,-81.5);
  cloudIsle(-9,9,-114,-104,0);bell(0,-105.5);
  const bowls=[bowlOf(6,-109,'light'),bowlOf(-6,-109,'shadow')];
  const L3=linkItem(0,1.3,-110.5);L3.locked=true;L3.g.visible=false;
  for(const x of[-1.6,1.6])for(const z of[-113.6,-124.4]){lantern(x,z,0);}
  lightSrc(new V3(0,0.8,-114),6,()=>F.gateOpen);lightSrc(new V3(0,0.8,-124),6,()=>F.gateOpen);
  mostki('light',[[0,0,-114],[0,0,-124]],{on:()=>F.gateOpen});
  /* ---------- Е. тёмные аллеи: тени-мороки (прежнее) ---------- */
  cloudIsle(-11,11,-152,-124,0);wall(-11.2,-11,-152,-124);wall(11,11.2,-152,-124);
  const hedgeM=M(0x6a6a7c);hedgeRow(-1,1,-147,-129,1.6,hedgeM);for(const sd of[-1,1]){hedgeRow(sd*10.6-0.4,sd*10.6+0.4,-150,-126,1.6,hedgeM);}
  hedgeRow(-7.5,-4.5,-138,-137,1.4,hedgeM);hedgeRow(4.5,7.5,-138,-137,1.4,hedgeM);bell(0,-126);
  const n4=nutItem(-9.2,0.6,-148.5);
  const T2=appleTree(-6,-149.2,0,{}),T3=appleTree(6,-149.2,0,{});
  /* ---------- общие помощники: яблочки и «старое» ---------- */
  const AP={list:[],trees:[]},AG=[];W.apples31=AP;W.agers31=AG;
  const soloK=()=>G.solo||genPath()==='easy';
  const aTree=(T,o)=>{o=o||{};T.ap={apple:null,regrow:o.regrow||0.6,noApple:!!o.noApple,re:o.re||0};AP.trees.push(T);return T;};
  function apNew(T,o){o=o||{};const king=!!o.king,g=appleMesh31(king?2.1:1);const a={g,pos:new V3(),state:o.state||'tree',tree:T||null,holder:null,king,from:null,to:null,t:0,dur:0.6,thrower:null};
    if(T)a.pos.set(T.pos.x+0.9*T.s,T.pos.y+2.0*T.s,T.pos.z+0.35);else if(o.at)a.pos.copy(o.at);g.position.copy(a.pos);
    a.light=lightSrc(a.pos,king?3.2:2.4,()=>a.state==='hand'||a.state==='fly'||a.state==='ground',3);AP.list.push(a);if(T)T.ap.apple=a;
    if(!o.quiet){burst(a.pos.clone(),0xffd76a,10,2);if(T)floatText(a.pos.clone().add(new V3(0,0.8,0)),'Молодильное яблочко!','#ffe08a');}return a;}
  function apGone(a){if(a.state==='gone')return;a.state='gone';W.group.remove(a.g);if(a.holder){a.holder.apple31=null;a.holder=null;}const i=W.lights.indexOf(a.light);if(i>=0)W.lights.splice(i,1);
    const j=AP.list.indexOf(a);if(j>=0)AP.list.splice(j,1);if(a.tree&&a.tree.ap.apple===a){a.tree.ap.apple=null;a.tree.ap.regrow=soloK()?3:4;}if(a.king&&!F.kingHome)later(1.2,()=>{if(!F.kingHome&&!AP.list.some(q=>q.king))kingRespawn();});}
  function apHand(a,h){if(a.tree&&a.tree.ap.apple===a){a.tree.ap.apple=null;a.tree.ap.regrow=a.tree.ap.re||(soloK()?5:7);}a.tree=null;a.state='hand';a.holder=h;h.apple31=a;SFX.nut();
    floatText(headOf(h),a.king?'Царь-яблоко!':'Яблочко в руках!','#ffe08a');if(!F.appleTold&&!a.king){F.appleTold=true;for(const pi of[0,1])tip(pi,'Молодильное яблочко! Поднеси его к старому — помолодеет.<br>Удар '+K(pi,'attack')+' — бросок вперёд: друг рядом поймает сам.',4);}}
  function apThrow(a,h){const fx=Math.sin(h.face),fz=Math.cos(h.face);let to=null,bd=9.5;
    const cand=[];for(const o of HEROES)if(o!==h&&!o.apple31)cand.push(o.pos);for(const g of AG)if(g.active()&&(g.accept?g.accept(a):!a.king))cand.push(g.pos);if(W.appleAim31)for(const p of W.appleAim31())cand.push(p);
    for(const p of cand){const dx=p.x-h.pos.x,dz=p.z-h.pos.z,d=Math.hypot(dx,dz);if(d<1||d>bd||Math.abs(p.y-h.pos.y)>3)continue;if((dx*fx+dz*fz)/d<0.82)continue;bd=d;to=new V3(p.x,p.y+0.6,p.z);}
    if(!to){const tx=h.pos.x+fx*7,tz=h.pos.z+fz*7,g=groundAt(tx,tz,h.pos.y+1.5);to=new V3(tx,(g.y>h.pos.y-3?g.y:h.pos.y)+0.4,tz);}
    a.state='fly';a.holder=null;h.apple31=null;a.from=a.pos.clone();a.to=to;a.t=0;a.dur=0.35+hd(a.from,to)*0.045;a.thrower=h;SFX.toss();floatText(headOf(h),'Лови!','#ffe08a');}
  function feed(a,g,h){apGone(a);SFX.grow();tone(880,0.2,'sine',0.08);tone(1320,0.3,'sine',0.07,null,0.12);const p=g.pos.clone().add(new V3(0,1.2,0));
    for(let i=0;i<14;i++){const ang=i/14*Math.PI*2;later(i*0.03,()=>burst(p.clone().add(new V3(Math.cos(ang)*1.2,Math.sin(i)*0.6,Math.sin(ang)*1.2)),0xffd76a,2,1.5,0.6));}
    floatText(p.clone().add(new V3(0,1.2,0)),'Молодеет!','#ffe08a');g.onApple(a,h);}
  function updApples(dt){for(const T of AP.trees){if(!T.revived||T.ap.apple||T.ap.noApple)continue;T.ap.regrow-=dt;if(T.ap.regrow<=0)apNew(T);}
    for(const a of AP.list.slice()){
      if(a.state==='tree'){a.g.position.set(a.pos.x,a.pos.y+Math.sin(G.time*2+a.pos.x)*0.05,a.pos.z);a.g.rotation.y+=dt;
        const h=HEROES.find(q=>q.active&&!q.apple31&&hd(q.pos,a.pos)<1.7&&Math.abs(q.pos.y-a.tree.pos.y)<2);if(h)apHand(a,h);}
      else if(a.state==='hand'){const h=a.holder;a.pos.set(h.pos.x,h.pos.y+heroHeight(h)+0.42,h.pos.z);a.g.position.copy(a.pos);a.g.rotation.y+=dt*2;}
      else if(a.state==='fly'){a.t+=dt;const k=Math.min(1,a.t/a.dur);a.pos.lerpVectors(a.from,a.to,k);a.pos.y+=Math.sin(k*Math.PI)*1.4;a.g.position.copy(a.pos);a.g.rotation.x+=dt*10;
        let done=false;for(const g of AG)if(g.active()&&g.thrown!==false&&(g.accept?g.accept(a):!a.king)&&hd(a.pos,g.pos)<g.r*0.8&&Math.abs(a.pos.y-(g.pos.y+1))<2.2){feed(a,g,a.thrower);done=true;break;}
        if(done||(W.onAppleFly31&&W.onAppleFly31(a)))continue;
        if(k>=1){const c=HEROES.find(q=>q!==a.thrower&&!q.apple31&&hd(q.pos,a.to)<2.1&&Math.abs(q.pos.y+0.8-a.to.y)<2.4);
          if(c){apHand(a,c);floatText(headOf(c),'Поймал!','#ffe08a');continue;}
          const g=groundAt(a.to.x,a.to.z,a.to.y+0.5);if(g.y>a.to.y-1.6){a.state='ground';a.pos.set(a.to.x,g.y,a.to.z);SFX.knock();}
          else{a.state='drop';a.t=0;floatText(a.pos.clone(),'Укатилось!','#ffe08a');}}}
      else if(a.state==='drop'){a.t+=dt;a.pos.y-=dt*(4+a.t*20);a.g.position.copy(a.pos);if(a.t>1.2)apGone(a);}
      else if(a.state==='ground'){a.g.position.set(a.pos.x,a.pos.y+0.22+Math.sin(G.time*3)*0.04,a.pos.z);a.g.rotation.y+=dt;const h=HEROES.find(q=>q.active&&(!q.apple31||(a.king&&!q.apple31.king))&&hd(q.pos,a.pos)<1.1&&Math.abs(q.pos.y-a.pos.y)<1.6);
        if(h){if(h.apple31){const o=h.apple31;o.state='ground';o.holder=null;h.apple31=null;o.pos.set(h.pos.x+Math.sin(h.face+1.6)*0.9,h.pos.y,h.pos.z+Math.cos(h.face+1.6)*0.9);}apHand(a,h);}}}
    for(const h of HEROES){const a=h.apple31;if(!a)continue;for(const g of AG)if(g.active()&&(g.accept?g.accept(a):!a.king)&&hd(h.pos,g.pos)<g.r&&Math.abs(h.pos.y-g.pos.y)<2.4){feed(a,g,h);break;}}}
  W.onAttack=(pi,h)=>{if(h.apple31&&!G.cine)apThrow(h.apple31,h);};
  W.fallHook=h=>{if(h.apple31){const a=h.apple31;floatText(a.pos.clone(),'Яблочко укатилось!','#ffe08a');apGone(a);}return false;};
  /* ---------- Ж. Дед-Садовник у ворот ---------- */
  mostki('light',[[0,0,-152],[0,0,-162]],{on:()=>F.garden});
  cloudIsle(-10,10,-196,-162,0);bell(0,-164);
  const TG=[appleTree(-6.5,-168,0,{s:1.1}),appleTree(6.5,-169,0,{s:1.05}),appleTree(-6,-183,0,{s:1.15}),appleTree(6.2,-184,0,{s:1.1})].map(t=>aTree(t));
  const n5=nutItem(6.4,0.6,-178.2);
  const OLD=makeOldGardener31();OLD.g.position.set(3.4,0,-190.6);OLD.g.rotation.y=Math.PI*0.85;if(OLD.body){OLD.body.rotation.x=0.22;}
  const YNG=makeMolodets31();YNG.g.position.set(3.4,0,-190.6);YNG.g.rotation.y=Math.PI;YNG.g.visible=false;
  {const wd=M(0x8a6a40);box(2.4,4.4,0,0.45,-191.6,-190.9,wd,{occ:false});const cane=addMesh(new THREE.CylinderGeometry(0.035,0.04,1.4,5),M(0x6a4a2a),2.7,0.7,-190.2);cane.rotation.z=0.25;OLD.cane=cane;}
  const gateM=M(0x9a7a4a),fenceM=M(0x8a6a3a),gm0=W.group.children.length;
  box(-10,-2.2,0,2.4,-195.4,-194.6,fenceM,{occ:false});box(2.2,10,0,2.4,-195.4,-194.6,fenceM,{occ:false});
  for(let x=-9.6;x<10;x+=0.8){if(Math.abs(x)<2.2)continue;addMesh(new THREE.ConeGeometry(0.12,0.4,4),fenceM,x,2.6,-195);}
  const gateCol=colBox(-2.2,2.2,0,2.6,-195.4,-194.6,false);const leaves=[];
  for(const s of[-1,1]){const lg=new THREE.Group();lg.position.set(s*2.2,0,-195);W.group.add(lg);const lf=addMesh(new THREE.BoxGeometry(2.2,2.3,0.18),gateM,-s*1.1,1.2,0,lg);
    for(let k=0;k<3;k++)addMesh(new THREE.BoxGeometry(2.1,0.1,0.24),M(0x5a4020),-s*1.1,0.4+k*0.8,0,lg);addMesh(new THREE.SphereGeometry(0.09,6,5),M(COL.gold),-s*2.0,1.2,0.14,lg);lg.traverse(c=>{c.userData.noBatch=true;});leaves.push({lg,s});}
  /* ---------- З. Трухлявый мост ---------- */
  cloudIsle(-7,7,-206,-196,0);bell(3.6,-198.6);const T8=aTree(appleTree(-4.6,-201,0,{s:1}));
  const bridgeCol=colBox(-1.5,1.5,-0.5,0,-228,-206,false);bridgeCol.on=false;
  const oldBr=new THREE.Group(),newBr=new THREE.Group();W.group.add(oldBr);W.group.add(newBr);
  {const rot=M(0x7a7470),moss=M(0x6a7a5a);for(let i=0;i<14;i++){if(i%3===1)continue;const z=-207-i*1.5,p=addMesh(new THREE.BoxGeometry(2.6,0.12,1.1),i%2?rot:moss,rand(-0.2,0.2),-0.1-rand(0,0.35),z,oldBr);p.rotation.set(rand(-0.25,0.25),rand(-0.2,0.2),rand(-0.3,0.3));}
    for(const s of[-1,1])for(let i=0;i<5;i++){const pst=addMesh(new THREE.CylinderGeometry(0.08,0.1,1.1,5),rot,s*1.45,0.1,-207-i*5,oldBr);pst.rotation.z=s*rand(0.2,0.5);}
    const fresh=M(0xc89a5a),rail=M(0x9a6a3a),flw=[0xff7aa0,0xffd84a,0xffffff];
    for(let i=0;i<15;i++)addMesh(new THREE.BoxGeometry(2.9,0.14,1.4),fresh,0,-0.07,-206.7-i*1.43,newBr);
    for(const s of[-1,1]){addMesh(new THREE.BoxGeometry(0.12,0.12,22),rail,s*1.5,0.95,-217,newBr);for(let i=0;i<6;i++){addMesh(new THREE.CylinderGeometry(0.08,0.09,1.0,6),rail,s*1.5,0.5,-206.5-i*4.3,newBr);addMesh(new THREE.SphereGeometry(0.12,6,5),M(flw[i%3]),s*1.5,1.05,-206.5-i*4.3,newBr);}}
    newBr.visible=false;oldBr.traverse(c=>{c.userData.noBatch=true;});newBr.traverse(c=>{c.userData.noBatch=true;});}
  const brPost=addMesh(new THREE.CylinderGeometry(0.18,0.24,1.3,6),M(0x6a6460),1.9,0.65,-205.6);brPost.userData.noBatch=true;
  cloudIsle(-7,7,-246,-228,0);bell(3.6,-230.5);const n6=nutItem(6,0.6,-232);const T9=aTree(appleTree(-4.6,-240,0,{s:1}));
  /* ---------- И. Передай яблочко: лиловые мостки; Дуб-старик ---------- */
  mostki('shadow',[[0,0,-246],[0,0,-252.5]],{w:1.6});edgeSign(1.4,0,-245.4,'shadow');cloudIsle(-1.8,1.8,-256.5,-252.5,0);mostki('shadow',[[0,0,-256.5],[0,0,-263]],{w:1.6});
  cloudIsle(-8,8,-300,-263,0);bell(4,-265.5);const n7=nutItem(-7,0.6,-266);
  const hedgeG=M(0x4f8a3a);hedgeRow(-8,-1.8,-279,-275,2.9,hedgeG);hedgeRow(1.8,8,-279,-275,2.9,hedgeG);
  const oakOld=new THREE.Group(),oakNew=new THREE.Group();W.group.add(oakOld);W.group.add(oakNew);
  {const bark=M(0x6a6470),lf=M(0x7a7a8a);addMesh(new THREE.CylinderGeometry(0.9,1.3,3.2,9),bark,0,1.6,-277,oakOld);
    for(const[dx,dy,dz,r]of[[0,4.0,-277,2.2],[1.6,3.6,-276.4,1.5],[-1.7,3.7,-277.4,1.6],[0.3,5.0,-277.6,1.4]])addMesh(new THREE.SphereGeometry(r,10,8),lf,dx,dy,dz,oakOld);
    for(const s of[-1,1]){const b=addMesh(new THREE.CylinderGeometry(0.22,0.35,2.4,6),bark,s*1.3,2.6,-276.6,oakOld);b.rotation.z=-s*0.9;}
    for(let i=0;i<5;i++){const r=addMesh(new THREE.CylinderGeometry(0.15,0.3,1.4,5),bark,Math.cos(i*1.3)*1.2,0.2,-277+Math.sin(i*1.3)*1.2,oakOld);r.rotation.set(Math.sin(i)*0.8,0,Math.cos(i)*0.8);}
    addMesh(new THREE.CylinderGeometry(0.05,0.07,0.6,5),M(0x7a5a3a),0,0.3,-277,oakNew);for(let i=0;i<4;i++){const l=addMesh(new THREE.SphereGeometry(0.14,6,5),M(0x6ac04a),Math.cos(i*1.6)*0.14,0.62+i*0.05,-277+Math.sin(i*1.6)*0.14,oakNew);l.scale.set(1.4,0.5,1);}
    oakNew.visible=false;oakOld.traverse(c=>{c.userData.noBatch=true;});oakNew.traverse(c=>{c.userData.noBatch=true;});}
  const oakCyl={x:0,z:-277,r:1.7,miny:-1,maxy:4,on:true,occ:true};W.cyls.push(oakCyl);
  /* ---------- К. Спящая стража и струны; старые ступени ---------- */
  cloudIsle(-5,5,-364,-300,0);bell(0,-302.5);const hedgeD=M(0x5a6a5a);hedgeRow(-5.4,-4.8,-362,-302,2.0,hedgeD);hedgeRow(4.8,5.4,-362,-302,2.0,hedgeD);
  const GUARDS=[];const STR=[];
  for(const sz of[-316,-328,-340,-352]){const g=new THREE.Group();W.group.add(g);const pm=M(0x7a5a3a);for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.07,0.09,1.3,5),pm,s*4.7,0.65,sz,g);
    const str=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,9.4,4),M(0xe8d8a0,{emissive:0x806020,emissiveIntensity:0.4}));str.rotation.z=Math.PI/2;str.position.set(0,0.9,sz);g.add(str);
    const bls=[];for(const x of[-2.4,0,2.4]){const b=new THREE.Mesh(new THREE.ConeGeometry(0.09,0.14,8),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}));b.position.set(x,0.76,sz);g.add(b);bls.push(b);}
    g.traverse(c=>{c.userData.noBatch=true;});STR.push({z:sz,y:0.9,str,bls,cd:0,shake:0});}
  const n8=nutItem(0,0.6,-361.5);n8.locked=true;n8.g.visible=false;
  const T10=aTree(appleTree(-3.4,-359.5,0,{s:0.9}));
  const stepCols=[],oldSt=new THREE.Group(),newSt=new THREE.Group();W.group.add(oldSt);W.group.add(newSt);
  {const st=M(0x8a8690),nst=M(0xe8e0f0);for(let k=0;k<10;k++){const z0=-364-k*0.6,top=0.3*(k+1);stepCols.push(colBox(-2.4,2.4,top-0.5,top,z0-0.6,z0,false));
      addMesh(new THREE.BoxGeometry(4.8,0.3,0.6),nst,0,top-0.15,z0-0.3,newSt);addMesh(new THREE.BoxGeometry(5,0.05,0.62),M(0xd0a860),0,top+0.02,z0-0.3,newSt);
      if(k%3===0){const b=addMesh(new THREE.BoxGeometry(rand(1.2,2),0.5,1),st,rand(-1.5,1.5),top-0.9,z0-0.5,oldSt);b.rotation.set(rand(-0.4,0.4),rand(-0.6,0.6),rand(-0.5,0.5));}}
    for(let i=0;i<6;i++){const b=addMesh(new THREE.DodecahedronGeometry(rand(0.2,0.45)),st,rand(-2,2),rand(0.1,0.4),-363.4-rand(0,1.2),oldSt);b.rotation.set(rand(0,3),rand(0,3),0);}
    newSt.visible=false;oldSt.traverse(c=>{c.userData.noBatch=true;});newSt.traverse(c=>{c.userData.noBatch=true;});stepCols.forEach(c=>{c.on=false;});}
  /* ---------- Л. Тени-воришки: терраса с живыми изгородями ---------- */
  const TY=3;cloudIsle(-12,12,-432,-370,TY);bell(0,-372.5,TY);const n9=nutItem(11,TY+0.6,-431);
  const OBS=[];W.obs31=OBS;const hedge3=(minx,maxx,minz,maxz,h)=>{h=h||1.7;const m0=W.group.children.length;box(minx,maxx,TY,TY+h,minz,maxz,hedgeG,{occ:false});const n=Math.max(1,Math.round(Math.max(maxx-minx,maxz-minz)/1.2));
    for(let i=0;i<n;i++){const u=(i+0.5)/n;addMesh(new THREE.SphereGeometry(Math.min(maxx-minx,maxz-minz)*0.5+0.2,8,6),hedgeG,lerp(minx,maxx,u),TY+h,lerp(minz,maxz,u)).scale.y=0.7;}fadeable(since(m0));OBS.push({minx,maxx,minz,maxz});};
  hedge3(-7,-3,-386,-385);hedge3(3,7,-394,-393);hedge3(-1,1,-404,-398);hedge3(-8,-4,-414,-413);hedge3(4,8,-420,-419);
  colBox(-12.4,-12,TY-1,TY+5,-432,-370,false);colBox(12,12.4,TY-1,TY+5,-432,-370,false);
  const TT=[appleTree(-10,-380,TY,{}),appleTree(10,-390,TY,{}),appleTree(-10,-410,TY,{}),appleTree(10,-424,TY,{})];
  const THF=[];W.thieves31=THF;
  const thiefMesh=()=>{const g=new THREE.Group();W.group.add(g);const dm=M(0x1a1428,{emissive:0x3a1a6a,emissiveIntensity:0.25});const body=new THREE.Mesh(new THREE.ConeGeometry(0.42,1.3,7),dm);body.position.y=0.7;body.scale.z=0.35;g.add(body);
    const hd2=new THREE.Mesh(new THREE.SphereGeometry(0.28,8,6),dm);hd2.position.y=1.45;hd2.scale.z=0.5;g.add(hd2);for(const s of[-1,1]){const ear=new THREE.Mesh(new THREE.ConeGeometry(0.08,0.3,4),dm);ear.position.set(s*0.15,1.7,0);g.add(ear);
      const ey=new THREE.Mesh(new THREE.SphereGeometry(0.05,6,5),MB(0xfff0b0));ey.position.set(s*0.1,1.48,0.13);g.add(ey);}
    const ap=appleMesh31(0.9);W.group.remove(ap);ap.position.set(0,1.0,-0.22);g.add(ap);g.traverse(c=>{c.userData.noBatch=true;});return {g,ap};};
  for(const[x,z]of[[-5,-388],[6,-400],[-6,-418],[5,-427]]){const m=thiefMesh();THF.push({m,pos:new V3(x,TY,z),home:new V3(x,TY,z),caught:false,face:0,wander:0,tgt:new V3(x,TY,z)});m.g.position.set(x,TY,z);}
  /* ---------- М. Колодец живой воды: арена Кощеева Ворона ---------- */
  mostki('light',[[0,TY,-432],[0,TY,-440]],{on:()=>F.thieves});
  cloudIsle(-12,12,-492,-440,TY);const ARN={x:0,z:-466,y:TY};
  for(const c of[[-12.4,-12,-492,-440],[12,12.4,-492,-440],[-12.4,12.4,-492.4,-492],[-12.4,-1.7,-440.2,-439.8],[1.7,12.4,-440.2,-439.8]])colBox(c[0],c[1],TY-1,TY+6,c[2],c[3],false);
  const arenaGate=colBox(-1.7,1.7,TY-1,TY+6,-440.2,-439.8,false);arenaGate.on=false;bell(3.6,-442.6,TY);const n10=nutItem(-11,TY+0.6,-491);
  {const st=M(0xb8b4c4),wtr=MB(0x7ae0ff,{transparent:true,opacity:0.85}),wd=M(0x8a6a40);addMesh(new THREE.CylinderGeometry(1.6,1.75,1.0,16),st,0,TY+0.5,-486);W.cyls.push({x:0,z:-486,r:1.75,miny:TY-1,maxy:TY+1,on:true,occ:false});
    const wm=addMesh(new THREE.CircleGeometry(1.35,24),wtr,0,TY+0.92,-486);wm.rotation.x=-Math.PI/2;wm.userData.noBatch=true;W.wellWater31=wm;
    for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.1,0.12,2.6,6),wd,s*1.5,TY+1.3,-486);const rf=addMesh(new THREE.ConeGeometry(2.3,1.0,4),M(0xb0503a),0,TY+3.0,-486);rf.rotation.y=Math.PI/4;
    lightSrc(new V3(0,TY+1,-486),3,()=>true);}
  const MOTHER=appleTree(-4.6,-487.5,TY,{s:1.7});
  const ABW=[bowlOf(-7,-462,'light',TY),bowlOf(7,-462,'light',TY)];
  const BT=[aTree(appleTree(-10,-450,TY,{}),{noApple:true,re:3.5}),aTree(appleTree(10,-450,TY,{}),{noApple:true,re:3.5})];
  const L4=linkItem(0,TY+1.1,-480);L4.locked=true;L4.g.visible=false;
  const beams=ABW.map(b=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.6,10,10,1,true),MB(0xffe08a,{transparent:true,opacity:0.35,depthWrite:false,side:THREE.DoubleSide}));m.visible=false;m.userData.noBatch=true;W.group.add(m);return m;});
  W.camZones.push({x:ARN.x,z:ARN.z,y:TY,r:13,camActive:()=>!G.cine&&VB.phase>=1&&VB.phase<4});
  const bb=$('bossbar');bb.style.display='none';{const _ol=W.onLeave;W.onLeave=()=>{bb.style.display='none';if(FIN.music)FIN.music.play(null);if(_ol)_ol();};}
  const VB={e:null,phase:0,ai:'fly',t:0,ang:0,tgt:null,shadow:null,hits:0,embAt:0,diveCd:3,dazeCap:0,mark:null};W.voron31=VB;
  {const sm=new THREE.Mesh(new THREE.CircleGeometry(1.4,24),MB(0x1a1030,{transparent:true,opacity:0.45,depthWrite:false}));sm.rotation.x=-Math.PI/2;sm.renderOrder=4;sm.visible=false;sm.userData.noBatch=true;W.group.add(sm);VB.shadow=sm;}
  {const lm=MB(0xff4a3a,{transparent:true,opacity:0.5,depthWrite:false});const lane=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1),lm);lane.rotation.x=-Math.PI/2;lane.renderOrder=4;lane.visible=false;lane.userData.noBatch=true;W.group.add(lane);VB.lane=lane;}
  const targets=()=>G.solo?[active(G.soloPi)]:[active(0),active(1)].filter(h=>!players[h.player].downed&&!h.cling);
  /* ---------- сюжет: ролики у гнезда ---------- */
  function intro(){F.stage='intro';const hs=HEROES;
    play({dur:6.4,fov:50,shots:[shot(0,[7,1.5,20],[0,-2,12],[5,3,12],[0,0.5,4],4.4),shot(4.4,[0,3.4,11],[0,1,-2])],
      says:[[0.3,3.4,null,'<i>Звенышко ведёт героев в небо — по облачным ступеням.</i>',true],[3.9,2.2,'zven','Дзинь! Небесное царство — чудо из чудес!']],
      events:[{t:0,fn:()=>{hs.forEach((h,i)=>{h.pos.copy(steps[0].position).add(new V3(i-1.5,0.4,0));h.vel.set(0,0,0);});}}],
      tick:(t)=>{for(let i=0;i<4;i++){const h=hs[i],k=clamp((t-i*0.25)/4.2,0,1),f=k*6.99,a=Math.floor(f),u=f-a;const s0=steps[a].position,s1=steps[Math.min(6,a+1)].position;
          const sp=W.spawns[h.player][h===players[h.player].heroes[0]?0:1];const p=a>=6?new V3(sp.x,0,sp.z):new V3(lerp(s0.x,s1.x,u)+(i-1.5)*0.9,lerp(s0.y,s1.y,u)+0.35+Math.sin(u*Math.PI)*0.8,lerp(s0.z,s1.z,u));
          if(k>=1){p.set(sp.x,0,sp.z);}h.pos.copy(p);h.vel.set(0,0,0);h.face=Math.PI;}
        steps.forEach((s,i)=>{s.position.y+=Math.sin(G.time*2+i)*0.002;});},
      end:()=>{HEROES.forEach((h,i)=>{const sp=W.spawns[h.player][players[h.player].heroes.indexOf(h)];placeOnGround(h,sp.x,sp.z,0);h.face=Math.PI;});F.stage='walk';snapCams();}});}
  function giftScene(){F.stage='gift';const pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-1.2,0);h.face=Math.atan2(0-h.pos.x,-4.7-h.pos.z);});
    const gifts=[];let ghost=null;
    play({dur:31.6,fov:46,shots:[shot(0,[3.6,2.4,1.6],[0,1.1,-4.7]),shot(6.8,[1.5,1.6,-2.4],[0,1.6,-4.7]),shot(14.2,[-2.4,1.6,-1.6],[0,1.3,-4.6]),shot(20.2,[1.6,1.6,-2.2],[0.6,0.7,-4.1]),shot(24.2,[2.2,1.4,-1.8],[pr.pos.x,0.9,pr.pos.z]),shot(26.4,[3.4,1.2,-6],[3,-4,-12])],
      says:[[0.3,3.4,null,'<i>Сад Жар-птицы в сумерках стоит, яблони серы.</i><br><i>В гнезде Жар-птица сидит — старая, облезлая, грустна без меры.</i>',true],[3.9,2.8,'zhar','Темно у меня… Перья я растеряла.'],
        [6.9,3.6,'zhar','Сад мой — сад молодильных яблок: кто яблочко откусит — тот помолодеет.'],[10.6,3.6,'zhar','Да тени чьи-то яблоки покрали: яблони посерели, а я — состарилась.'],
        [14.3,3.4,null,'<i>Последние перья из хвоста выдёргивает —</i><br><i>И каждому по перу протягивает.</i>',true],[17.8,2.4,'zhar','Верните саду свет, прошу.'],
        [20.4,3.6,null,'<i>Под нею, средь скорлупок, чёрный ключ лежит —</i><br><i>Такой же, как на нитке у Кикиморы, блестит.</i>',true],[24.3,2.1,'proshka','Ключ! Холодный, как лёд зимой…'],
        [26.5,3.2,null,'<i>Ключ сам из лапы выскользнул — и в пропасть упал.</i>',true],[29.8,1.6,'yosha','Ой.']],
      events:[{t:7.0,fn:()=>{ghost=appleMesh31(2.2);ghost.position.set(0,2.6,-4.6);burst(ghost.position.clone(),0xffd76a,16,2);SFX.flower();anim(3.4,k=>{if(ghost)ghost.rotation.y+=0.04;});}},
        {t:10.8,fn:()=>{if(!ghost)return;const g0=ghost;g0.traverse(c=>{if(c.material&&c.material.color){c.material=c.material.clone();c.material.color.setHex(0x8a8a96);if(c.material.emissive)c.material.emissiveIntensity=0;}});
          anim(2.4,k=>{g0.position.y=2.6-k*k*1.6;g0.scale.setScalar(2.2*(1-k*0.6));if(k>=1){W.group.remove(g0);burst(new V3(0,1,-4.6),0x8a8a96,10,2);}});ghost=null;SFX.miss();}},
        {t:14.4,fn:()=>{fb.tail.forEach(f=>{f.visible=false;});HEROES.forEach((h,i)=>{const fm=featherMesh(1.4);W.group.add(fm);gifts.push(fm);const a=new V3(0,1.2,-5.2),to=h.pos.clone().add(new V3(0,h.d.height*0.8,0));
          later(i*0.35,()=>{SFX.flower();anim(1.1,k=>{fm.position.lerpVectors(a,to,smooth(k));fm.position.y+=Math.sin(k*Math.PI)*1.2;fm.rotation.z=k*6;if(k>=1){W.group.remove(fm);burst(to,0xffb040,10,2);tone(1320,0.2,'sine',0.1);}});});});
          anim(1.4,k=>{fb.body.rotation.x=-Math.sin(k*Math.PI)*0.3;});}},
        {t:22.0,fn:()=>{placeOnGround(pr,0.9,-2.7,0.3);pr.face=Math.PI;const kp=key.position.clone();anim(1.2,k=>{key.position.lerpVectors(kp,pr.pos.clone().add(new V3(0.25,0.9,0.1)),smooth(k));});}},
        {t:24.3,fn:()=>{tone(2600,0.4,'sine',0.08,1800);burst(key.position.clone(),0xcfe8ff,8,1.5,0.6);}},
        {t:26.5,fn:()=>{const kp=key.position.clone();anim(3.2,k=>{key.position.set(kp.x+k*3,kp.y+Math.sin(Math.min(1,k*3)*Math.PI)*0.5-k*k*14,kp.z-k*7);key.rotation.z+=0.3;});SFX.keys();}},
        {t:29.8,fn:()=>{T.yosha.face=Math.atan2(3-T.yosha.pos.x,-12-T.yosha.pos.z);}}],
      tick:(t)=>{fb.head.rotation.x=t<14?0.3:0.1;fb.body.position.y=Math.sin(t*2)*0.02;},
      end:()=>{if(ghost){W.group.remove(ghost);ghost=null;}key.visible=false;W.anims.length=0;gifts.forEach(g=>W.group.remove(g));placeOnGround(pr,0.9,-2.2,0.3);W.abil.pero=true;F.stage='pero';
        banner('Перо Жар-птицы — жар-перо!','#ffb040',2.8,'кнопка R или ; (на джойстике RB) — зажечь иль погасить · свет помогает всем, кто рядом');
        for(const pi of[0,1])tip(pi,'У каждого героя — своё перо. Золотые мостки лишь в свете видны —<br>Зажги перо '+K(pi,'item')+', и дорожки открыты, как днём, ясны.',4.2);}});}
  function openGate(){F.gateOpen=true;SFX.gate();SFX.ok();banner('Ворота сада отворились!','#ffe08a',2.4,'свет и тьма вместе — золотой мосток горит сам');
    L3.locked=false;L3.g.visible=true;burst(L3.pos.clone(),COL.gold,16,3);if(!F.bowlBark){F.bowlBark=true;later(0.8,()=>bark(T.pelageya,'pelageya','Как выключатель — щёлк, и свет!',2));}}
  let arena=null;
  function spawnAlleys(){F.fight=true;arena=[tenFoe(-6,-133),tenFoe(-8.4,-141),tenFoe(-4.6,-145.5),tenFoe(6,-133),tenFoe(8.4,-141),tenFoe(4.6,-145.5),motylekFoe(0,-127.4,{leash:6})];
    banner('Тени-мороки!','#c8b0ff',2.4,'во тьме удар насквозь проходит — посвети пером и бей');
    later(1.2,()=>say('zven','Один свет пера держит — другой бьёт, не робей!',2.4,true));}
  W.onFirstUnravel=()=>{later(0.6,()=>bark(T.proshka,'proshka','Бумажная, а кусается — вот те раз!',2));};
  /* ---------- Ж. сценки садовника ---------- */
  function gardenerScene(){F.metGardener=true;F.stage='gard';HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-186.6,0);h.face=Math.PI;h.vel.set(0,0,0);});
    play({dur:16.4,fov:46,shots:[shot(0,[-1,2.2,-183],[3.4,1.1,-190.6]),shot(4.2,[1.8,1.4,-188.2],[3.4,1.3,-190.6]),shot(11.2,[-3,2.6,-181],[0,1.4,-192],[-2,2.4,-183],[0,2,-194],3)],
      says:[[0.3,3.6,null,'<i>У ворот сада на лавочке — старик-садовник. Борода до пояса, спина колесом.</i>',true],[4.2,3.6,'sadovnik','Здравствуйте, малые… Сто лет я этот сад стерегу. Нынче ворот не отпереть — стар.'],
        [8.0,3.2,'sadovnik','Тени Кощеевы яблоки уносят. Кощей-то сам старый — помолодеть хочет!'],[11.4,2.6,'zven','Дзинь! Молодильное яблочко ему — и помолодеет!'],[14.2,2.0,'pelageya','Оживим яблоню — сорвём яблочко!']],
      end:()=>{F.stage='free';snapCams();banner('Дед-Садовник','#d8e0b8',2.6,'оживи яблоню светом пера — яблочко само в руки упадёт · поднеси садовнику');}});}
  function youngScene(){F.young=true;F.stage='young';HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-186.4,0);h.face=Math.PI;h.vel.set(0,0,0);});
    play({dur:16.2,fov:44,shots:[shot(0,[0.6,1.8,-187.4],[3.4,1.2,-190.6]),shot(5.4,[1.4,1.7,-188.4],[3.4,1.5,-190.8]),shot(11.4,[-3.4,2.6,-184],[0,1.6,-195])],
      says:[[0.3,3.0,null,'<i>Старик откусил яблочко — и закружились вокруг него золотые искры…</i>',true],[5.6,2.8,'molodets','Ох! Будто сто годков с плеч скинул! Спина не скрипит!'],
        [8.5,2.4,'yosha','Был дедушка — стал добрый молодец!'],[11.0,2.8,'molodets','Вот почему сад зовётся — молодильных яблок! Ну, ворота — настежь!'],
        [13.9,2.3,'molodets','А тени яблоки к колодцу живой воды носят — к Ворону Кощееву.']],
      events:[{t:0.8,fn:()=>{const p=OLD.g.position.clone().add(new V3(0,1,0));SFX.grow();for(let i=0;i<40;i++)later(i*0.08,()=>{const a=i*0.6,r=1.3-i*0.02;burst(p.clone().add(new V3(Math.cos(a)*r,(i%8)*0.25-0.6,Math.sin(a)*r)),i%2?0xffd76a:0xfff6c0,2,1.2,0.6);});
          anim(3.2,k=>{OLD.g.scale.setScalar(Math.max(0.02,1-k));OLD.g.rotation.y+=0.15;if(k>=1)OLD.g.visible=false;});if(OLD.cane)OLD.cane.visible=false;}},
        {t:3.6,fn:()=>{YNG.g.visible=true;YNG.g.scale.setScalar(0.02);anim(1.6,k=>{YNG.g.scale.setScalar(Math.max(0.02,smooth(k)));YNG.g.rotation.y=Math.PI+(1-k)*6;});tone(1047,0.3,'sine',0.08);tone(1568,0.4,'sine',0.07,null,0.15);
          if(typeof FX!=='undefined'&&FX.sparkle)FX.sparkle(YNG.g.position.clone().add(new V3(0,1.4,0)),14);}},
        {t:11.6,fn:()=>{SFX.gate();leaves.forEach(L=>{anim(1.6,k=>{L.lg.rotation.y=L.s*k*1.6;});});gateCol.on=false;}}],
      end:()=>{OLD.g.visible=false;YNG.g.visible=true;YNG.g.scale.setScalar(1);YNG.g.rotation.y=Math.PI;gateCol.on=false;leaves.forEach(L=>{L.lg.rotation.y=L.s*1.6;});F.stage='free';snapCams();
        banner('Садовник помолодел!','#a8e08a',2.6,'молодильное яблочко: кто откусит — тот помолодеет');}});}
  AG.push({pos:new V3(3.4,0,-189.6),r:2.2,active:()=>F.metGardener&&!F.young,onApple:()=>later(0.3,youngScene)});
  AG.push({pos:new V3(0,0,-205.0),r:2.4,active:()=>!F.bridge,onApple:(a,h)=>{F.bridge=true;bridgeCol.on=true;newBr.visible=true;newBr.scale.set(1,1,0.02);newBr.position.z=-206*(1-0.02);
      anim(1.6,k=>{const s=Math.max(0.02,smooth(k));newBr.scale.z=s;newBr.position.z=-206*(1-s);oldBr.position.y=-k*3;if(k>=1)oldBr.visible=false;});brPost.material=M(0xc89a5a);
      banner('Мост помолодел!','#ffe08a',2.4,'был трухлявый — стал как новенький');later(1.0,()=>bark(T.potap,'potap','Ишь ты! Брёвнышко к брёвнышку — как вчера срубили.',2.6));}});
  AG.push({pos:new V3(0,0,-275.4),r:2.6,active:()=>!F.oak,onApple:()=>{F.oak=true;oakNew.visible=true;oakNew.scale.setScalar(0.02);anim(1.8,k=>{oakOld.scale.setScalar(Math.max(0.02,1-k*0.98));oakOld.position.y=-k*0.4;oakNew.scale.setScalar(Math.max(0.02,k));if(k>=1)oakOld.visible=false;});
      later(0.9,()=>{oakCyl.on=false;});banner('Был дуб — стал дубок!','#a8e08a',2.4,'молодильное яблочко и дуб в росток превратило');later(1.2,()=>bark(T.proshka,'proshka','Ой… перестарались. Ну ничего — подрастёт!',2.6));}});
  AG.push({pos:new V3(0,0,-362.6),r:2.4,active:()=>!F.steps,onApple:()=>{F.steps=true;stepCols.forEach(c=>{c.on=true;});newSt.visible=true;newSt.scale.set(1,0.02,1);anim(1.4,k=>{newSt.scale.y=Math.max(0.02,smooth(k));oldSt.position.y=-k*2;if(k>=1)oldSt.visible=false;});
      banner('Ступени помолодели!','#ffe08a',2.2,'наверх — в сад, где тени яблоки прячут');}});
  /* ---------- К. спящая стража ---------- */
  function guardSpawn(){F.guards=true;for(const[x,z]of[[-3.4,-310],[3.4,-322],[-3.4,-334],[3.4,-346]]){const e=pugaloFoe(x,z,{leash:5});e.state='idle';e.t=0;e.g.position.y=e.baseY;e.sleep=true;e.noMove=true;e.cd=99;e.alert=0;e.sx=x;e.face=x<0?Math.PI/2:-Math.PI/2;e.zT=rand(0,2);
      const t0=e.tick;e.noCam=true;e.tick=(e,dt)=>{if(t0)t0(e,dt);e.noCam=!!e.sleep;if(!e.sleep)return;e.cd=99;e.face=e.sx<0?Math.PI/2:-Math.PI/2;
        const lit=HEROES.some(h=>heroLight(h)&&hd(h.pos,e.pos)<5&&Math.abs(h.pos.y-e.pos.y)<2);if(lit){e.alert+=dt;if(e.alert>0.15&&!e.alertSaid){e.alertSaid=true;floatText(e.pos.clone().add(new V3(0,2.4,0)),'М-м?.. Кто светит?','#ffe0a0');}if(e.alert>1.0)wakeGuard(e,'light');}
        else{if(e.alert>0.2&&e.alertSaid){floatText(e.pos.clone().add(new V3(0,2.4,0)),'Показалось… Хр-р…','#cfd8dc');}e.alert=Math.max(0,e.alert-dt*2);e.alertSaid=e.alert>0.15&&e.alertSaid;}
        e.zT-=dt;if(e.zT<=0&&HEROES.some(h=>h.active&&hd(h.pos,e.pos)<14)){e.zT=rand(2.5,4);floatText(e.pos.clone().add(new V3(0.3,2.3,0)),'Хр-р… З-з-з…','#c8c8e8');}};
      const p0=e.post;e.post=(e,dt,k)=>{if(p0)p0(e,dt,k);if(e.sleep){e.body.rotation.x=0.35;e.eyeMat.emissiveIntensity=0.05;}else e.body.rotation.x=0;};
      e.onDeath=()=>{if(!F.guardTold){F.guardTold=true;}};GUARDS.push(e);}}
  function wakeGuard(e,why){if(!e.sleep||!e.alive)return;e.sleep=false;e.noMove=false;e.cd=1.0;SFX.red();floatText(e.pos.clone().add(new V3(0,2.5,0)),'Кто тут?! Держи вора!','#ff8a7a');F.woke=(F.woke||0)+1;
    if(!F.wakeTold){F.wakeTold=true;later(0.5,()=>say('zven',why==='string'?'Струна зазвенела — стража проснулась!':'Свет стражу разбудил! Гаси перо рядом с ними!',2.4,true));}}
  function updStrings(dt){for(const S of STR){S.cd=Math.max(0,S.cd-dt);S.shake=Math.max(0,S.shake-dt);S.str.position.y=S.y+(S.shake>0?Math.sin(G.time*60)*0.04:0);S.bls.forEach((b,i)=>{b.rotation.z=S.shake>0?Math.sin(G.time*40+i)*0.5:0;});
      for(const h of HEROES){if(!h.active){h._pz31=h.pos.z;continue;}const pz=h._pz31===undefined?h.pos.z:h._pz31;h._pz31=h.pos.z;if((pz-S.z)*(h.pos.z-S.z)>0&&Math.abs(h.pos.z-S.z)>0.3)continue;
        if(Math.abs(h.pos.x)>4.7||S.cd>0)continue;if(h.pos.y>S.y-0.05||h.pos.y+heroHeight(h)<S.y)continue;
        S.cd=1.5;S.shake=1.2;SFX.bell();tone(1760,0.3,'triangle',0.1);tone(2093,0.3,'triangle',0.08,null,0.1);floatText(new V3(h.pos.x,1.6,S.z),'Дзынь-дзынь!','#ffe08a');
        const near=GUARDS.filter(e=>e.alive&&e.sleep).sort((a,b)=>Math.abs(a.pos.z-S.z)-Math.abs(b.pos.z-S.z)).slice(0,2);near.forEach(e=>wakeGuard(e,'string'));}}}
  /* ---------- Л. тени-воришки ---------- */
  function thievesStart(){F.thiefRun=true;banner('Тени-воришки!','#c8b0ff',2.6,'тени уносят молодильные яблоки — света боятся: загоните в угол двумя светами и коснитесь');later(1.0,()=>bark(T.pelageya,'pelageya','Окружаем! Свет с двух сторон — им и деться некуда.',2.6));}
  function blocked(x,z){if(Math.abs(x)>11.4||z>-370.6||z<-431.4)return true;for(const o of OBS)if(x>o.minx-0.45&&x<o.maxx+0.45&&z>o.minz-0.45&&z<o.maxz+0.45)return true;return false;}
  function updThieves(dt){if(!F.thiefRun)return;let n=0;const sp0=G.solo?4.6:5.3;
    for(const t of THF){if(t.caught){n++;continue;}const L=[];for(const h of HEROES)if(heroLight(h)&&Math.abs(h.pos.y-TY)<2)L.push(h.pos);for(const a of AP.list)if(a.state==='hand'||a.state==='ground')L.push(a.pos);
      let fx=0,fz=0,near=99;for(const p of L){const dx=t.pos.x-p.x,dz=t.pos.z-p.z,d=Math.hypot(dx,dz);if(d<near)near=d;if(d<8){fx+=dx/(d*d+0.3);fz+=dz/(d*d+0.3);}}
      let vx=0,vz=0,sp=0;if(near<8){const l=Math.hypot(fx,fz)||1;vx=fx/l;vz=fz/l;sp=near<4.5?sp0:sp0*0.6;}else{t.wander-=dt;if(t.wander<=0){t.wander=rand(2,4);t.tgt.set(t.home.x+rand(-3,3),TY,t.home.z+rand(-3,3));}const dx=t.tgt.x-t.pos.x,dz=t.tgt.z-t.pos.z,d=Math.hypot(dx,dz);if(d>0.3){vx=dx/d;vz=dz/d;sp=1.4;}}
      if(sp>0){const st=sp*dt;let nx=t.pos.x+vx*st,nz=t.pos.z+vz*st;if(blocked(nx,nz)){if(!blocked(nx,t.pos.z))nz=t.pos.z;else if(!blocked(t.pos.x,nz))nx=t.pos.x;else{nx=t.pos.x;nz=t.pos.z;}}t.pos.x=nx;t.pos.z=nz;t.face=angDamp(t.face,Math.atan2(vx,vz),8,dt);}
      t.m.g.position.set(t.pos.x,TY+Math.abs(Math.sin(G.time*(sp>2?14:5)))*0.15,t.pos.z);t.m.g.rotation.y=t.face;
      const c=HEROES.find(h=>heroLight(h)&&hd(h.pos,t.pos)<1.35&&Math.abs(h.pos.y-TY)<1.6);
      if(c){t.caught=true;n++;SFX.unravel();burst(t.pos.clone().add(new V3(0,1,0)),0x3a1a6a,18,4);floatText(t.pos.clone().add(new V3(0,2,0)),'Поймал! Яблочко — домой!','#ffe08a');
        const tree=TT.find(q=>!q.revived)||TT[0];const ap=t.m.ap,from=t.pos.clone().add(new V3(0,1,0)),to=tree.pos.clone().add(new V3(0,2.2,0));t.m.g.remove(ap);W.group.add(ap);
        anim(1.2,k=>{ap.position.lerpVectors(from,to,smooth(k));ap.position.y+=Math.sin(k*Math.PI)*3;if(k>=1){W.group.remove(ap);if(!tree.revived)reviveTree(tree);}});W.group.remove(t.m.g);}}
    F.thiefCount=n;if(!F.thieves&&n>=THF.length){F.thieves=true;later(0.8,()=>{banner('Яблоки вернулись!','#ffe08a',2.4,'светомосток — к колодцу живой воды');say('zven','Дзинь! Последнее, Царь-яблоко, — у колодца. Там Ворон Кощеев!',3,true);});}}
  /* ---------- М. Кощеев Ворон ---------- */
  function bossBar(){if(VB.phase<1){bb.style.display='none';return;}bb.style.display='block';const e=VB.e;const nm=['','В небе','Царь-яблоко'][Math.min(2,Math.floor(VB.phase))]||'';
    const hp=F.won?0:VB.phase>=2?(1-VB.hits/3):e?(e.state==='broken'?0.02:e.embers/e.maxEmb):1;
    bb.innerHTML='<b>Кощеев Ворон</b> · '+Math.max(1,Math.min(2,Math.floor(VB.phase)))+' / 2 · '+nm+' <span class="seg"><i style="width:'+Math.round(hp*100)+'%"></i></span>';}
  const kingAt=new V3(-3.4,TY+3.9,-486.9);let kingG=null;
  function bossIntro(){F.boss=1;F.stage='bossIntro';arenaGate.on=true;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-445,TY);h.face=Math.PI;h.vel.set(0,0,0);});
    kingG=appleMesh31(2.1);kingG.position.copy(kingAt);
    const e=makeFoe('voron31',-1.6,-486,{y:TY+3.4,leash:60,scale:1.2});VB.e=e;e.noKill=true;e.cd=99;e.noMove=true;e.maxEmb=e.embers;
    e.guardAll=()=>VB.phase>=2||(!e.litNow&&e.state!=='broken');e.darkGuard=()=>!e.litNow;e.guardText=VB.phase>=2?'старое перо — железное! Яблочком его!':'Ворон во тьме неуязвим — посвети!';
    e.tick=(e,dt)=>{e.litNow=litAt(e.pos.x,e.pos.y+1.4,e.pos.z,1.4);e.cd=99;if(VB.phase>=2)e.guardText='старое перо — железное! Молодильным яблочком его!';ravenAI(e,dt);};
    e.onFinisher=h=>{if(VB.phase===1)toRaven2();};
    e.post=(e,dt)=>{const L=e.L;if(!L.wings)return;const fl=VB.ai==='fly'||VB.ai==='mark'||VB.ai==='rise'||VB.ai==='dive'||VB.ai==='fall';const flap=VB.ai==='flapTel'?0.9+Math.sin(G.time*8)*0.1:fl?Math.sin(G.time*(VB.ai==='dive'?4:9))*0.7:0.12;
      L.wings.forEach(w=>{w.wp.rotation.z=-w.s*flap;});L.apple.visible=VB.phase>=2;L.head.rotation.x=VB.ai==='lungeTel'?0.4:(e.dazeT>0?Math.sin(G.time*10)*0.2:0);};
    if(FIN.music)FIN.music.play('boss');
    play({dur:14.4,fov:46,shots:[shot(0,[0,6,-448],[0,4.6,-482]),shot(3.6,[-3,5.4,-480],[-2,6.6,-486]),shot(8.2,[2,4.4,-452],[0,4,-446]),shot(10.6,[0,8,-450],[0,7,-470])],
      says:[[0.3,3.2,null,'<i>У колодца живой воды — яблоня-матушка, а на ней Царь-яблоко горит. На ветке — огромный чёрный ворон.</i>',true],
        [3.7,3.0,'voron','Кар-р! Царь-яблоко — Кощею! Помолодеет хозяин — весь свет заберёт!'],[6.9,1.6,'proshka','Не отдадим!'],
        [8.6,2.0,'voron','Триста лет живу — и не таких видал! Кар-р!'],[10.8,3.4,'zven','Ворон света боится! Зажгите солнышки в обеих чашах разом!']],
      events:[{t:3.7,fn:()=>{SFX.crash();shakeAll(0.04,0.4);}},{t:10.6,fn:()=>{const p0=e.pos.clone();anim(1.4,k=>{e.pos.set(lerp(p0.x,ARN.x+6.5,k),lerp(p0.y,TY+6.5,k),lerp(p0.z,ARN.z,k));});SFX.whoosh();}}],
      end:()=>{VB.phase=1;VB.ai='fly';VB.t=0;VB.ang=0;VB.diveCd=3.2;e.pos.set(ARN.x+6.5,TY+6.5,ARN.z);F.stage='boss';snapCams();bossBar();
        banner('Кощеев Ворон · В небе','#c8b0ff',2.8,'пикирует — красное: кувырок · две чаши-солнышка разом — ослепнет и упадёт: в свете бей');}});}
  function ravenAI(e,dt){if(G.cine||VB.phase<1||VB.phase===1.5||VB.phase>=3)return;if(e.state==='broken'||e.state==='spawn'||e.state==='dying'){VB.shadow.visible=false;VB.lane.visible=false;return;}
    VB.t+=dt;const P=e.pos;
    if(VB.phase===1){const bothSun=ABW.every(b=>b.on);
      switch(VB.ai){
        case 'fly':{VB.ang+=dt*0.55;P.set(ARN.x+Math.cos(VB.ang)*6.5,TY+6.5+Math.sin(G.time*1.7)*0.3,ARN.z+Math.sin(VB.ang)*6.5);e.face=VB.ang+Math.PI;
          if(bothSun){dazzle(e);break;}VB.diveCd-=dt;if(VB.diveCd<=0){const c=targets();if(c.length){const onB=c.filter(h=>ABW.some(b=>hd(h.pos,b)<1.3));const L=onB.length?onB:c;VB.tgt=L[Math.floor(Math.random()*L.length)];
              VB.ai='mark';VB.t=0;VB.dur=soloK()?1.6:1.2;SFX.red();floatText(P.clone().add(new V3(0,1,0)),'Кар-р! Сейчас клюну!','#ff8a7a');}VB.diveCd=soloK()?6:4.5;}break;}
        case 'mark':{const h=VB.tgt;VB.shadow.visible=true;VB.shadow.position.set(h.pos.x,h.pos.y+0.06,h.pos.z);VB.shadow.material.opacity=0.25+0.4*(VB.t/VB.dur);VB.shadow.scale.setScalar(1.6-0.6*VB.t/VB.dur);
          VB.ang+=dt*0.55;P.set(ARN.x+Math.cos(VB.ang)*6.5,TY+6.5,ARN.z+Math.sin(VB.ang)*6.5);if(bothSun){VB.shadow.visible=false;dazzle(e);break;}
          if(VB.t>VB.dur){VB.ai='dive';VB.t=0;VB.from=P.clone();VB.to=h.pos.clone();VB.hitDone=false;SFX.whoosh();}break;}
        case 'dive':{const k=Math.min(1,VB.t/0.45);P.lerpVectors(VB.from,VB.to,k);P.y=lerp(VB.from.y,VB.to.y,k*k);e.face=Math.atan2(VB.to.x-VB.from.x,VB.to.z-VB.from.z);VB.shadow.visible=k<1;
          if(k>=1&&!VB.hitDone){VB.hitDone=true;VB.shadow.visible=false;const h=VB.tgt;const rolled=h.rollT>0||G.time-(h.lastRoll||-9)<0.5;
            if(!rolled&&hd(h.pos,VB.to)<1.6&&Math.abs(h.pos.y-VB.to.y)<1.6){damageHero(h,{kind:'enemy',ref:e});VB.ai='perch';VB.t=0;VB.dur=1.0;}
            else{floatText(P.clone().add(new V3(0,2.6,0)),'Мимо! Ворон открыт — бей!','#ffe36b');e.dazeT=soloK()?3.2:2.5;VB.ai='perch';VB.t=0;VB.dur=e.dazeT;SFX.thud();}}break;}
        case 'perch':{P.y=TY;if(VB.t>VB.dur&&!(e.dazeT>0)){VB.ai='rise';VB.t=0;VB.from=P.clone();}break;}
        case 'fall':{const k=Math.min(1,VB.t/0.8);P.lerpVectors(VB.from,VB.fallTo,k);P.y=lerp(VB.from.y,TY,k*k);if(k>=1){VB.ai='stun';VB.t=0;SFX.thud();shakeAll(0.05,0.35);burst(P.clone(),0xffffff,20,4);}break;}
        case 'stun':{P.y=TY;if(e.state!=='broken'&&e.embers>0&&VB.embAt-e.embers>=3&&e.dazeT>0){e.dazeT=0;floatText(P.clone().add(new V3(0,3,0)),'Кар! Прозрел!','#ff8a7a');}
          if(!(e.dazeT>0)&&e.state!=='broken'){VB.ai='rise';VB.t=0;VB.from=P.clone();}break;}
        case 'rise':{const k=Math.min(1,VB.t/0.9),to=new V3(ARN.x+Math.cos(VB.ang)*6.5,TY+6.5,ARN.z+Math.sin(VB.ang)*6.5);P.lerpVectors(VB.from,to,smooth(k));if(k>=1){VB.ai='fly';VB.diveCd=soloK()?4.5:3.4;}break;}}
      beams.forEach((m,i)=>{const on=ABW[i].on;m.visible=on;if(on){const b=ABW[i];m.position.set(b.x,TY+5,b.z);m.material.opacity=bothSun?0.55:0.25;}});return;}
    // этап 2: на земле, с Царь-яблоком; бить — молодильными яблочками
    const face=(p,k)=>{e.face=angDamp(e.face,Math.atan2(p.x-P.x,p.z-P.z),k,dt);};P.y=TY;
    switch(VB.ai){
      case 'walk':{const c=targets();let h=null,bd=1e9;for(const q of c){const d=hd(q.pos,P);if(d<bd){bd=d;h=q;}}if(h){face(h.pos,4);if(bd>2.6){const sp=2.0*dt;P.x+=(h.pos.x-P.x)/bd*sp;P.z+=(h.pos.z-P.z)/bd*sp;}}
        P.x=clamp(P.x,-10.5,10.5);P.z=clamp(P.z,-490,-442);
        if(VB.t>VB.dur&&h){VB.tgt=h;VB.t=0;if(Math.random()<0.6||bd>6){VB.ai='lungeTel';VB.dur=soloK()?1.3:1.0;SFX.red();floatText(P.clone().add(new V3(0,3.2,0)),'Кар-р!','#ff8a7a');}
          else{VB.ai='flapTel';VB.dur=soloK()?1.5:1.2;SFX.blue();floatText(P.clone().add(new V3(0,3.2,0)),'Задую ваши перья!','#c8b0ff');}}break;}
      case 'lungeTel':{const h=VB.tgt;if(VB.t<VB.dur-0.3)face(h.pos,6);const dx=Math.sin(e.face),dz=Math.cos(e.face);VB.lane.visible=true;VB.lane.scale.set(1,5,1);VB.lane.position.set(P.x+dx*2.5,TY+0.07,P.z+dz*2.5);VB.lane.rotation.z=-e.face+Math.PI;
        VB.lane.material.opacity=0.25+0.35*Math.abs(Math.sin(G.time*10));if(VB.t>VB.dur){VB.lane.visible=false;VB.ai='lunge';VB.t=0;VB.from=P.clone();VB.dir=new V3(dx,0,dz);VB.hitDone=false;SFX.whoosh();}break;}
      case 'lunge':{const k=Math.min(1,VB.t/0.35);P.copy(VB.from).addScaledVector(VB.dir,4.5*k);P.x=clamp(P.x,-10.5,10.5);P.z=clamp(P.z,-490,-442);
        if(!VB.hitDone)for(const h of HEROES){if(!h.active||hd(h.pos,P)>e.r+0.4)continue;VB.hitDone=true;const rolled=h.rollT>0||G.time-(h.lastRoll||-9)<0.5;if(rolled){floatText(headOf(h),'Увернулся!','#ffe36b');e.dazeT=soloK()?3:2.4;}else damageHero(h,{kind:'enemy',ref:e});}
        if(k>=1){VB.ai='recover';VB.t=0;VB.dur=e.dazeT>0?e.dazeT:1.3;}break;}
      case 'flapTel':{if(VB.t>VB.dur){SFX.whoosh();shakeAll(0.04,0.3);ringFx(P.clone(),0x6a4aa0,6);for(const h of HEROES){if(hd(h.pos,P)>6.2)continue;if(h.lit&&h.active){h.lit=false;featherFx(h);floatText(headOf(h),'Задул перо!','#c8b0ff');}
            if(h.active){const dx=h.pos.x-P.x,dz=h.pos.z-P.z,d=Math.hypot(dx,dz)||1;h.vel.x=dx/d*7;h.vel.z=dz/d*7;h.vel.y=4;h.grounded=false;h.knockT=0.35;}}
          if(!F.flapTold){F.flapTold=true;later(0.4,()=>say('zven','Перья задул! А яблочки светят — их не задуть!',2.4,true));}VB.ai='recover';VB.t=0;VB.dur=1.1;}break;}
      case 'recover':{if(VB.t>VB.dur&&!(e.dazeT>0)){VB.ai='walk';VB.t=0;VB.dur=rand(1.4,2.2);}break;}}}
  function dazzle(e){VB.ai='fall';VB.t=0;VB.from=e.pos.clone();VB.fallTo=new V3(ARN.x+rand(-2,2),TY,ARN.z+rand(-1,2));e.dazeT=soloK()?8:6;VB.embAt=e.embers;SFX.flower();
    floatText(e.pos.clone().add(new V3(0,1.4,0)),'Кар! Ослеп!','#ffe08a');if(!F.dazzTold){F.dazzTold=true;later(0.6,()=>say('zven','Ослеп! В свете — бейте!',2,true));}}
  function toRaven2(){VB.phase=1.5;const e=VB.e;e.dazeT=0;e.state='idle';beams.forEach(m=>{m.visible=false;});VB.shadow.visible=false;
    play({dur:9.2,fov:46,shots:[shot(0,[3,5,-470],[-3.4,5.6,-487]),shot(3.6,[4,4.4,-458],[e.pos.x,4.4,e.pos.z])],
      says:[[0.3,2.6,'voron','Кар-р! Не дамся! Царь-яблоко — моё!'],[3.0,3.4,'zven','Старое перо — железное, пером его не пронять! А молодильным яблочком — попробуйте!'],[6.6,2.4,'yosha','Яблочком — по Ворону? Помолодеет!']],
      events:[{t:0.4,fn:()=>{const p0=e.pos.clone();anim(1.2,k=>{e.pos.set(lerp(p0.x,kingAt.x,k),lerp(p0.y,kingAt.y-1,k)+Math.sin(k*Math.PI)*2,lerp(p0.z,kingAt.z+1,k));});}},
        {t:1.6,fn:()=>{if(kingG){W.group.remove(kingG);kingG=null;}SFX.keys();const p0=e.pos.clone();anim(1.0,k=>{e.pos.set(lerp(p0.x,0,k),lerp(p0.y,TY,k),lerp(p0.z,-470,k));});}},
        {t:3.0,fn:()=>{BT.forEach(t=>{if(!t.revived)reviveTree(t);t.ap.noApple=false;t.ap.regrow=0.2;});}}],
      end:()=>{VB.phase=2;VB.ai='walk';VB.t=0;VB.dur=1.6;VB.hits=0;e.pos.set(0,TY,-470);e.noMove=true;BT.forEach(t=>{if(!t.revived)reviveTree(t);t.ap.noApple=false;});snapCams();bossBar();
        banner('Кощеев Ворон · Царь-яблоко','#c8b0ff',2.8,'бросайте в Ворона молодильные яблочки '+K(0,'attack')+' — когда он замахнулся иль открыт · взмах гасит перья');}});}
  W.appleAim31=()=>VB.phase===2&&VB.e&&VB.e.alive?[VB.e.pos]:[];
  W.onAppleFly31=a=>{if(VB.phase!==2||a.king)return false;const e=VB.e;if(!e||!e.alive||hd(a.pos,e.pos)>1.9||Math.abs(a.pos.y-(e.pos.y+1.2))>2)return false;
    const open=VB.ai==='lungeTel'||VB.ai==='flapTel'||VB.ai==='recover'||e.dazeT>0;
    if(!open){if(!a.dodged){a.dodged=true;const s=Math.random()<0.5?-1:1,rx=Math.cos(e.face)*s,rz=-Math.sin(e.face)*s;e.pos.x=clamp(e.pos.x+rx*2,-10.5,10.5);e.pos.z=clamp(e.pos.z+rz*2,-490,-442);floatText(e.pos.clone().add(new V3(0,3,0)),'Кар! Мимо!','#cfd8dc');SFX.miss();
        if(!F.dodgeTold){F.dodgeTold=true;for(const pi of[0,1])tip(pi,'Ворон увёртывается! Бросай, когда он замахнулся (красное или взмах) — или после промаха, пока открыт.',3.2);}}return false;}
    apGone(a);VB.hits++;SFX.grow();shakeAll(0.04,0.3);for(let i=0;i<20;i++)later(i*0.03,()=>burst(e.pos.clone().add(new V3(rand(-1,1),1+rand(0,1.6),rand(-1,1))),0xffd76a,2,2,0.6));
    const s=1.2*(1-0.18*VB.hits);anim(0.6,k=>{e.inner.scale.setScalar(lerp(e.inner.scale.x,s,k));});floatText(e.pos.clone().add(new V3(0,3.2,0)),'Молодеет!','#ffe08a');
    if(VB.hits===1)later(0.4,()=>bark(e,'voron','Кар! Пёрышки… мягкие стали!',2.2));else if(VB.hits===2)later(0.4,()=>bark(e,'voron','Кар-р… что со мной? Я… маленький?!',2.4));else later(0.5,chickScene);
    VB.ai='recover';VB.t=0;VB.dur=1.2;e.dazeT=0;return true;};
  let CH=null;
  function kingRespawn(){if(F.kingHome)return;const at=CH?CH.g.position.clone().add(new V3(1.2,0,0.6)):new V3(0,TY,-470);const a=apNew(null,{king:true,state:'ground',at:at});a.pos.y=TY;floatText(a.pos.clone().add(new V3(0,1,0)),'Царь-яблоко вернулось!','#ffe08a');}
  function chickScene(){VB.phase=3;const e=VB.e;VB.lane.visible=false;const at=e.pos.clone();F.stage='chick';
    play({dur:12.6,fov:44,shots:[shot(0,[at.x+3,TY+2.2,at.z+3.6],[at.x,TY+1,at.z]),shot(5.2,[at.x-2.4,TY+1.4,at.z+2.4],[at.x,TY+0.6,at.z]),shot(9.2,[0,TY+5,-468],[0,TY+3,-484])],
      says:[[0.3,2.6,null,'<i>Третье яблочко — и Ворон съёжился, закружился в золотых искрах…</i>',true],[3.2,1.6,'voronenok','Кар?.. Пи-пи!'],[4.9,2.0,'proshka','Ворон — воронёнком стал!'],
        [7.0,2.0,'pelageya','Какой маленький… Не бойся.'],[9.3,3.0,'zven','Царь-яблоко — Жар-птице! Вон она летит — еле крыльями машет!']],
      events:[{t:0.4,fn:()=>{SFX.unravel();anim(1.6,k=>{e.inner.scale.setScalar(Math.max(0.02,0.55*(1-k)));e.inner.rotation.y+=0.3;});for(let i=0;i<30;i++)later(i*0.05,()=>burst(at.clone().add(new V3(Math.cos(i)*1.2,0.5+(i%6)*0.3,Math.sin(i)*1.2)),0xffd76a,2,1.5,0.6));}},
        {t:2.0,fn:()=>{e.alive=false;e.state='dying';W.group.remove(e.g);const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);CH=chickMesh31();CH.g.position.set(at.x,TY,at.z);CH.g.scale.setScalar(0.05);anim(0.8,k=>{CH.g.scale.setScalar(Math.max(0.05,k));});
          const a=apNew(null,{king:true,state:'ground',at:new V3(at.x+1.3,TY,at.z+0.8)});SFX.dzin();}},
        {t:9.2,fn:()=>{fb.g.visible=true;fb.g.position.set(-14,TY+12,-500);const from=fb.g.position.clone(),to=new V3(0,TY+1.05,-484.4);anim(3.2,k=>{fb.g.position.lerpVectors(from,to,smooth(k));fb.g.position.y+=Math.sin(k*Math.PI)*1.5;fb.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(k*18)*0.5;});});fb.g.rotation.y=0;}}],
      end:()=>{fb.g.position.set(0,TY+1.05,-484.4);fb.g.rotation.y=0;F.stage='king';VB.phase=3;snapCams();bossBar();bb.style.display='none';
        banner('Воронёнок!','#c8c8d8',2.4,'Царь-яблоко — Жар-птице, к колодцу');}});}
  AG.push({pos:new V3(0,TY,-483.6),r:2.6,active:()=>F.stage==='king'&&!F.kingHome,accept:a=>a.king,onApple:()=>{F.kingHome=true;later(0.3,finale);}});
  function finale(){F.won=true;F.stage='end';if(FIN.music)FIN.music.play(null);HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-480.6,TY);h.face=Math.PI;h.vel.set(0,0,0);});
    const sky0=scene.background.clone(),sky1=new THREE.Color(0xa8a0e0);
    play({dur:22,fov:46,shots:[shot(0,[2.4,TY+2.2,-480.4],[0,TY+1.6,-484.4]),shot(5.2,[0,TY+3.4,-476],[0,TY+2.6,-486]),shot(10.4,[-6,TY+5,-470],[0,TY+2,-486],[-4,TY+6,-468],[0,TY+3,-488],4),shot(15.6,[2.6,TY+2,-479.4],[0,TY+1.8,-484.4])],
      says:[[0.3,3.0,null,'<i>Жар-птица откусила Царь-яблоко — и вспыхнула, как заря.</i>',true],[3.6,3.0,'zhar','Светло! Как прежде. Спасибо, малые, спасибо!'],[6.8,3.2,'zhar','Молодой я стала — и сад мой молодой! Яблочки опять золотые.'],
        [10.2,2.6,'molodets','Сад ожил! Ну, теперь только поливать — живой водой из колодца!'],[13.0,3.0,'zhar','А воронёнка я сама выращу — пусть растёт добрым.'],[16.2,3.6,'zhar','А ключ… Ключ не мой. Кто-то подбросил, видно.<br>Держитесь от него подальше — ох, недоброе в нём, обидно.']],
      events:[{t:0.4,fn:()=>{fb.tail.forEach(f=>{f.visible=true;f.userData.mats.forEach(m=>{m.color.setHex(0xff6a2a);m.emissiveIntensity=0.9;});});anim(3.0,k=>{fb.bloom(k);fb.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(k*30)*0.6;});});SFX.grow();
          burst(new V3(0,TY+1.8,-484.4),0xffb040,30,5);ringFx(new V3(0,TY,-484.4),0xffc860,8);if(typeof CINE!=='undefined'&&CINE.flashDip)CINE.flashDip('#fff0c8',0.45);}},
        {t:3.4,fn:()=>{for(const t of W.trees)if(!t.revived){const cb=t.onRevive;t.onRevive=null;reviveTree(t,true);t.onRevive=cb;}SFX.ok();if(W.wellWater31)W.wellWater31.material.color.setHex(0xa8f4ff);}},
        {t:9.8,fn:()=>{YNG.g.visible=true;YNG.g.position.set(-3,TY,-479);YNG.g.rotation.y=Math.PI*0.9;if(CH){CH.g.position.set(1.6,TY,-482.6);}}},
        {t:13.0,fn:()=>{if(CH){const p0=CH.g.position.clone(),to=new V3(0.9,TY+1.3,-484.6);anim(1.2,k=>{CH.g.position.lerpVectors(p0,to,smooth(k));CH.g.position.y+=Math.sin(k*Math.PI)*0.8;});}SFX.dzin();}},
        {t:17.6,fn:()=>{if(typeof FX!=='undefined'&&FX.confetti)FX.confetti(new V3(0,TY+2.4,-482),40);L4.locked=false;L4.g.visible=true;L4.g.position.set(0,TY+6,-485);const p1=new V3(0,TY+1.1,-480.4);anim(1.6,k=>{L4.g.position.lerpVectors(new V3(0,TY+6,-485),p1,smooth(k));});L4.pos.copy(p1);}}],
      tick:(t)=>{scene.background.lerpColors(sky0,sky1,clamp((t-1)/5,0,1));scene.fog.color.copy(scene.background);if(CH)CH.wings.forEach((w,i)=>{w.rotation.z=(i?1:-1)*Math.abs(Math.sin(G.time*14))*0.5;});},
      end:()=>{L4.locked=false;L4.g.visible=true;L4.g.position.set(0,TY+1.1,-480.4);L4.pos.copy(L4.g.position);arenaGate.on=false;scene.background.copy(sky1);scene.fog.color.copy(sky1);F.stage='link';snapCams();bb.style.display='none';
        banner('Сад Жар-птицы светится!','#ffb040',2.4,'звено от Жар-птицы — возьмите');}});}
  /* ---------- главный шаг уровня ---------- */
  W.updates.push(dt=>{
    if(F.stage==='walk'&&[0,1].some(pi=>active(pi).pos.z<-0.4&&active(pi).pos.z>-8))giftScene();
    for(const B of bowls){const on=B.test();if(on!==B.on){B.on=on;if(on){SFX.plate();floatText(new V3(B.x,1.4,B.z),B.type==='light'?'Солнце!':'Звёзды!',B.type==='light'?'#ffd76a':'#c8b0ff');}}B.inner.emissiveIntensity=B.on?0.9+0.3*Math.sin(G.time*8):0.08;}
    for(const B of ABW){const on=VB.phase===1&&B.test();if(on!==B.on){B.on=on;if(on){SFX.plate();floatText(new V3(B.x,TY+1.4,B.z),'Солнышко!','#ffd76a');}}B.inner.emissiveIntensity=B.on?0.9+0.3*Math.sin(G.time*8):0.08;}
    if(!F.gateOpen&&bowls.every(b=>b.on))openGate();
    if(!F.fight&&F.gateOpen&&[0,1].some(pi=>active(pi).pos.z<-125.4&&active(pi).pos.z>-152))spawnAlleys();
    if(F.fight&&!F.cleared&&arena.every(e=>!e.alive)){F.cleared=true;SFX.ok();banner('Аллеи чисты!','#ffe08a',2,'две яблони у выхода — обе оживите');}
    if(!F.garden&&T2.revived&&T3.revived){F.garden=true;SFX.grow();banner('Сад ожил!','#ffe08a',2.4,'светомосток — в глубь сада');hedgeM.color.setHex(0x4f8a3a);}
    {const k=W.trees.filter(t=>t.revived).length/W.trees.length;const c=new THREE.Color(0x3a3470).lerp(new THREE.Color(0x7a78c0),k);if(VB.phase>=1&&!F.won)c.lerp(new THREE.Color(0x2a2448),0.5);if(F.stage!=='end'&&F.stage!=='link'){scene.background.copy(c);scene.fog.color.copy(c);}amb.intensity=0.52+0.2*k;}
    if(!F.metGardener&&!G.cine&&F.garden&&[0,1].some(pi=>active(pi).pos.z<-176&&active(pi).pos.z>-196))gardenerScene();
    updApples(dt);
    if(!F.guards&&[0,1].some(pi=>active(pi).pos.z<-286))guardSpawn();
    if(F.guards){updStrings(dt);if(!F.passed&&[0,1].some(pi=>active(pi).pos.z<-357)){F.passed=true;if(!F.woke){F.quiet=true;n8.locked=false;n8.g.visible=true;burst(n8.pos.clone(),COL.gold,16,3);banner('Тише воды, ниже травы!','#ffe08a',2.4,'стража не проснулась — орешек за ловкость');}}}
    if(!F.thiefRun&&[0,1].some(pi=>active(pi).pos.z<-372&&active(pi).pos.y>TY-0.5))thievesStart();
    updThieves(dt);
    if(!F.boss&&F.thieves&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-443&&active(pi).pos.y>TY-0.5))bossIntro();
    if(VB.phase>=1&&VB.phase<3)bossBar();
    if(CH&&F.stage!=='end'){CH.g.rotation.y=Math.sin(G.time*0.8)*0.6;CH.wings.forEach((w,i)=>{w.rotation.z=(i?1:-1)*Math.abs(Math.sin(G.time*6))*0.3;});}
    if(F.stage==='link'&&L4.taken&&!F.out){F.out=true;later(0.6,()=>{banner('Сад молодильных яблок','#ffe08a',2.4,'в лавке у Векши — венок из яблоневого цвета, загляни!');later(1.8,finishLevel);});}
    fb.wings.forEach(w=>{if(F.stage!=='end'&&F.stage!=='chick')w.wp.rotation.z=w.s*(0.2+Math.sin(G.time*1.5)*0.05);});});
  /* ---------- рисунки кнопок ---------- */
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.pero&&!h().lit&&h().pos.z<-4&&h().pos.z>-9,'зажечь перо');
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.pero&&h().lit&&h().pos.z<-24&&h().pos.z>-28.2&&Math.abs(h().pos.x)<2.5,'погасить');
    prompt(pi,'item',()=>headOf(h()),()=>{const z=h().pos.z;if(z>-46||z<-66||h().grounded)return false;const n=Math.floor((-46-z)/(20/13));return (Math.floor(n/3)%2?'shadow':'light')!==(h().lit?'light':'shadow');},'в прыжке!');
    prompt(pi,'item',()=>headOf(h()),()=>!T1.revived&&!h().lit&&hd(h().pos,T1.pos)<4,'посвети у яблони');
    prompt(pi,'item',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.kind==='ten'&&!e.litNow&&hd(e.pos,h().pos)<4)&&!h().lit,'посвети');
    prompt(pi,'item',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.kind==='motylek'&&!e.both&&hd(e.pos,h().pos)<5)&&!h().lit,'зажгите вместе!');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help)||W.bolts.some(b=>b.tgt===h()&&!b.refl&&b.eta<0.8));
    prompt(pi,'attack',()=>headOf(h()),()=>!h().apple31&&W.enemies.some(e=>e.alive&&e.kind!=='voron31'&&hd(e.pos,h().pos)<4&&(e.state==='broken'||(e.litNow&&e.state==='stagger'&&!e.openHit))),'');
    prompt(pi,'item',()=>headOf(h()),()=>!h().lit&&!h().apple31&&AP.trees.some(t=>!t.revived&&!t.ap.noApple&&hd(t.pos,h().pos)<3.2&&Math.abs(t.pos.y-h().pos.y)<1.5),'оживи яблоню');
    prompt(pi,'attack',()=>headOf(h()),()=>!!h().apple31&&(HEROES.some(o=>o!==h()&&!o.apple31&&hd(o.pos,h().pos)<9&&hd(o.pos,h().pos)>2.2)||(VB.phase===2&&VB.e&&VB.e.alive&&hd(VB.e.pos,h().pos)<9)),'бросить');
    prompt(pi,'item',()=>headOf(h()),()=>h().lit&&F.guards&&GUARDS.some(e=>e.alive&&e.sleep&&hd(e.pos,h().pos)<7),'погаси — стража!');
    prompt(pi,'jump',()=>headOf(h()),()=>F.guards&&h().kind!=='yosha'&&h().grounded&&STR.some(S=>Math.abs(h().pos.z-S.z)<1.6&&Math.abs(h().pos.x)<4.7),'через струну');
    prompt(pi,'roll',()=>headOf(h()),()=>(VB.ai==='mark'||VB.ai==='lungeTel')&&VB.tgt===h(),'кувырок!');
    prompt(pi,'item',()=>headOf(h()),()=>VB.phase===1&&!h().lit&&ABW.some(b=>hd(b,h().pos)<1.6),'солнышко в чашу');}
  /* ---------- задачи ---------- */
  const nearT=(TT)=>()=>[TT.g];
  const ravText=pi=>VB.phase<2?'Кощеев Ворон кружит. Две чаши-солнышка — встаньте в обе со светом пера '+K(pi,'item')+' разом: ослепнет и упадёт — в свете бей '+K(pi,'attack')+'.<br>Тень на земле — пикирует: кувырок '+K(pi,'roll')+'.':
    VB.phase<3?'Пером Ворона не пронять. Сорви молодильное яблочко с яблони у края и брось '+K(pi,'attack')+' в Ворона — когда он замахнулся или открыт ('+VB.hits+' из 3).':'Царь-яблоко — Жар-птице, к колодцу!';
  const mk=pi=>[
    O('Небесное царство! Звенышко к гнезду Жар-птицы ведёт.',()=>F.stage!=='walk'&&F.stage!=='intro',()=>[fb.g]),
    O('Жар-птица…',()=>W.abil.pero,()=>[fb.g]),
    O(()=>'Золотые мостки лишь в свете видны. Зажги перо '+K(pi,'item')+' —<br>И по золотой дорожке ступай вперёд.',()=>active(pi).pos.z<-20.5,()=>[W.tiles[3].m],()=>({kind:active(pi).kind,action:'walk',from:new V3(0,0,-7),to:new V3(0,0,-19)})),
    O(()=>'Лиловые мостки лишь во тьме видны. Погаси перо '+K(pi,'item')+'.',()=>active(pi).pos.z<-38.5,()=>[W.tiles[12].m]),
    O(()=>'Три шага по золоту, три — по лиловому. Где сменяются — прыгни '+K(pi,'jump')+',<br>И в прыжке перо '+K(pi,'item')+' жми — не оступишься, не сникнешь.',()=>active(pi).pos.z<-66.5,()=>[L1.g],()=>({kind:active(pi).kind,action:'jump',from:new V3(0,0,-50),to:new V3(0,0,-54)})),
    O(()=>'Серая яблоня. С горящим пером три секунды постой —<br>Засияют яблоки золотой красой.',()=>T1.revived||active(pi).pos.z<-78.5,nearT(T1)),
    O(pi?()=>'Две дорожки: одному нужен свет, другому — тьма. На перекрёстке — по очереди ступай.<br>На острове две чаши: в солнце — со светом, в звёзды — без света, так и знай.':()=>'Две дорожки: золотая да лиловая. Идите рядом — у одного свет, у другого тьма.<br>Встаньте в чаши вдвоём — вот и вся кутерьма.',
      ()=>F.gateOpen,()=>bowls.map(b=>b.g)),
    O(()=>'Тёмные аллеи, тут тени-мороки. Во тьме удар насквозь — посвети пером '+K(pi,'item')+' и бей '+K(pi,'attack')+'.<br>Мотылёк раскроется, лишь коль оба перья зажжёте рядом — вдвоём, без робей.',()=>F.cleared,()=>arena?arena.filter(e=>e.alive).map(e=>e.g):[]),
    O('У выхода две яблони — оживите обе: с горящим пером постойте рядом.',()=>F.garden,()=>[T2.g,T3.g]),
    O('Сад ожил! По светомостку — в глубь сада.',()=>active(pi).pos.z<-176,()=>[OLD.g]),
    O(()=>'Старик-садовник у ворот. Оживи яблоню светом пера — молодильное яблочко само в руки упадёт.<br>Поднеси его садовнику: кто яблочко откусит — тот помолодеет.',()=>F.young,()=>F.young?[]:[OLD.g].concat(TG.filter(t=>!t.revived).slice(0,1).map(t=>t.g))),
    O(()=>'Мост трухлявый — под ногами рассыпается. Сорви яблочко (оживи яблоню) — и к мосту: пусть помолодеет!',()=>F.bridge&&active(pi).pos.z<-229,()=>F.bridge?[]:[brPost,T8.g]),
    O(()=>'Дуб-старик за лиловыми мостками. А лиловые мостки — во тьме, яблочко же светится: с ним не пройти!<br>Встаньте на островке и за мостками без света — и перебросьте яблочко '+K(pi,'attack')+' из рук в руки.',()=>F.oak,()=>F.oak?[]:[oakOld,T9.g]),
    O(()=>'Стража спит. Не свети пером рядом — разбудишь; струн не задень — зазвенят.<br>Йоша под струной пролезет, остальным — прыгать '+K(pi,'jump')+'.',()=>active(pi).pos.z<-359,()=>GUARDS.filter(e=>e.alive).map(e=>e.g)),
    O(()=>'Старые ступени рассыпались. Оживи яблоню — яблочко ступеням!',()=>F.steps,()=>F.steps?[]:[oldSt,T10.g]),
    O(()=>'Тени-воришки уносят яблоки — и света боятся. Загоните тень в угол двумя светами и коснитесь со светом ('+(F.thiefCount||0)+' из 4).',()=>F.thieves,()=>THF.filter(t=>!t.caught).map(t=>t.m.g)),
    O(()=>F.boss?ravText(pi):'Светомосток — к колодцу живой воды.',()=>F.kingHome,()=>VB.phase===3?AP.list.filter(a=>a.king).map(a=>a.g).concat([fb.g]):VB.e&&VB.e.alive?[VB.e.g]:[]),
    O('Звено от Жар-птицы — возьми!',()=>false,()=>[L4.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>W.abil.pero&&h.pos.z<-46&&h.pos.z>-66&&h.pos.y>-1,text:pi=>'Коль перо сменишь стоя — провалишься! Прыгни '+K(pi,'jump')+' и жми '+K(pi,'item')+' в прыжке —<br>Приземлишься на нужный мосток, на верной дощечке.'},
    {cond:(pi,h)=>h.pos.z<-78&&h.pos.z>-104&&Math.abs(h.pos.x)<3,text:pi=>'Перекрёсток: свет друга лиловые мостки рядом гасит.<br>Пропусти друга — потом ступай сам, всё и сладится.'},
    {cond:(pi,h)=>W.enemies.some(e=>e.alive&&e.kind==='motylek'&&!e.both&&hd(e.pos,h.pos)<8),text:pi=>'Мотылёк раскроется лишь в свете двух героев: два пера '+K(pi,'item')+' рядом зажгите.'+(G.solo?'<br>В одиночку: зажги перо, смени героя '+K(pi,'swap')+' — свет у оставленного не гаснет.':'')},
    {cond:(pi,h)=>W.enemies.some(e=>e.alive&&e.kind==='ten'&&hd(e.pos,h.pos)<6)&&!h.lit,text:pi=>'Тень плоская — удар насквозь идёт. Зажги перо '+K(pi,'item')+':<br>В свете тень настоящей станет — бей её, вперёд!'},
    {cond:(pi,h)=>!F.bridge&&h.pos.z<-203&&h.pos.z>-208,text:pi=>'Мост трухлявый — не держит. Поднеси к нему молодильное яблочко — помолодеет!'},
    {cond:(pi,h)=>!F.oak&&!!h.apple31&&h.pos.z<-240&&h.pos.z>-247,text:pi=>'С яблочком на лиловые мостки нельзя — оно светит, мостки гаснут.<br>Пусть друг без света встанет на островке — брось '+K(pi,'attack')+', он поймает.'+(G.solo?' В одиночку: поставь героя на островке, смени — и брось.':'')},
    {cond:(pi,h)=>F.thiefRun&&!F.thieves&&h.pos.z<-372,text:pi=>'Тень убегает от света. Двумя светами с двух сторон — в угол, и коснись.'+(G.solo?'<br>Оставь героя со светом в проходе — тень к нему не сунется.':'')});
  W.spawns=[[new V3(-2.6,0,4.4),new V3(-4.4,0,5.6)],[new V3(2.6,0,4.4),new V3(4.4,0,5.6)]];W.startAct=[0,0];
  W.pauseLine='Сад молодильных яблок: кто яблочко откусит — тот помолодеет. Перо: RB зажигает и гасит; серые яблони от света оживают.<br>Ожившая яблоня роняет яблочко: поднеси к старому — помолодеет; удар — бросок другу.<br>Яблочко светится: лиловые мостки под ним гаснут. Стража просыпается от света и звона струн.';
  // для ботов: FIN.warp('gardener'|'bridge'|'pass'|'oak'|'guards'|'steps'|'thieves'|'boss')
  W.warp31=(where)=>{const P={gardener:[0,-172,0],bridge:[0,-199,0],pass:[0,-236,0],oak:[0,-268,0],guards:[0,-304,0],steps:[0,-358,0],thieves:[0,-374,TY],boss:[0,-441.6,TY]}[where];if(!P)throw new Error('нет участка '+where);
    W.abil.pero=true;if(F.stage==='walk'||F.stage==='intro')F.stage='free';F.gateOpen=true;F.cleared=true;F.fight=true;arena=arena||[];if(!T2.revived)reviveTree(T2,true);if(!T3.revived)reviveTree(T3,true);F.garden=true;
    const ord=['gardener','bridge','pass','oak','guards','steps','thieves','boss'],k=ord.indexOf(where);
    if(k>=1){F.metGardener=true;F.young=true;OLD.g.visible=false;YNG.g.visible=true;gateCol.on=false;leaves.forEach(L=>{L.lg.rotation.y=L.s*1.6;});}
    if(k>=2){F.bridge=true;bridgeCol.on=true;newBr.visible=true;oldBr.visible=false;}
    if(k>=4){F.oak=true;oakCyl.on=false;oakOld.visible=false;oakNew.visible=true;}
    if(k>=6){F.guards=true;F.passed=true;F.steps=true;stepCols.forEach(c=>{c.on=true;});newSt.visible=true;oldSt.visible=false;}
    if(k>=7){F.thiefRun=true;F.thieves=true;THF.forEach(t=>{t.caught=true;W.group.remove(t.m.g);});TT.forEach(t=>{if(!t.revived)reviveTree(t,true);});}
    FIN.warpTo(P[0],P[1],P[2]);for(const pi of[0,1])players[pi].cp.set(P[0],P[2],P[1]);};
  W.onStart=()=>{later(0.1,intro);};
  flushDecor();flushPuffs();};
// авторская режиссура новых роликов (late_86): настроение, эмоции героев, акценты
if(typeof DIR!=='undefined'){
  DIR.push({lv:'3-1',dur:31.6,cues:[[3.8,dMood(NIGHT,0.16)],[7.1,dSpark(10,0xffd76a)],[10.9,dMood(COLD,0.14)],[24.4,dDZ(0.2,1.0,1.0)],[24.5,dEmo('proshka','surprise')],[29.9,dEmo('yosha','flinch')]]},
    {lv:'3-1',dur:16.4,mood:[COLD,0.1],cues:[[11.5,dEmo('yosha','joy')],[14.3,dEmo('pelageya','pride')]]},
    {lv:'3-1',dur:16.2,mood:[GOLD,0.14],cues:[[1.0,dSpark(14,0xffd76a)],[3.7,dSlow(0.5,0.6)],[8.6,dAll('joy',0.1)],[11.7,dEmo('potap','nod')]]},
    {lv:'3-1',dur:14.4,mood:[NIGHT,0.16],cues:[[3.8,dTrauma(0.35)],[6.9,dEmo('proshka','effort')],[10.9,dEmo('pelageya','pride')]]},
    {lv:'3-1',dur:9.2,mood:[NIGHT,0.14],cues:[[3.1,dEmo('yosha','surprise')]]},
    {lv:'3-1',dur:12.6,mood:[GOLD,0.12],cues:[[0.5,dSlow(0.5,0.8)],[3.3,dAll('laugh',0.1)],[7.1,dEmo('pelageya','tilt')]]},
    {lv:'3-1',dur:22,mood:[GOLD,0.18],cues:[[0.5,dSlow(0.45,0.8)],[3.7,dAll('joy',0.08)],[17.7,dConf(40)]]});}
