// ---- продолжение late_99e_k21.js (внутри build21, часть 2 из 4): торг, мостовая, палаты, переливная улица — части склеиваются сборкой по имени файла ----
  const mkt={started:false,done:false,list:[]};
  const mktGate=makeGate(-11,11,-139+D,'thread','market',{h:2.6});
  nutItem(-8.6,1.6,-134+D);
  /* ---------- Ж1. Звонкая мостовая: осётр-великан напевает напев Садко; звонкие плиты — «дзинь, дилинь» по очереди, «дон-дон» вместе ---------- */
  // дальше всё сдвинуто на 34 м: Звонкая мостовая встала между торговыми рядами и палатами Морского царя
  const S1=-34;
  ground(-11,11,-214,-180,0,M(0xa8b4a6));
  for(const x of[-9.4,9.4])for(const z of[-185,-193,-201,-209]){addMesh(new THREE.CylinderGeometry(0.4,0.48,4.6,10),stone,x,2.3,z);addMesh(new THREE.SphereGeometry(0.42,10,8),goldM,x,4.8,z);W.cyls.push({x,z,r:0.48,miny:-1,maxy:4.6,on:true});}
  const TUNE=[{x:-4.6,z:-189.5,n:67,w:'дзинь',c:0xffd23a},{x:4.6,z:-189.5,n:71,w:'дилинь',c:0x5ab8ff},{x:-4.6,z:-201,n:74,w:'дон',c:0xff7ab0},{x:4.6,z:-201,n:72,w:'дон',c:0x6ad86a}].map((t,i)=>{
    const g=new THREE.Group();g.position.set(t.x,0,t.z);W.group.add(g);const mat=M(t.c,{emissive:t.c,emissiveIntensity:0.15});
    addMesh(new THREE.CylinderGeometry(1.35,1.45,0.12,28),goldM,0,0.06,0,g);addMesh(new THREE.CylinderGeometry(1.1,1.1,0.14,28),mat,0,0.08,0,g);const rim=addMesh(new THREE.TorusGeometry(1.25,0.06,6,32),goldM,0,0.15,0,g);rim.rotation.x=Math.PI/2;
    const note=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,color:t.c,transparent:true,depthWrite:false}));note.scale.setScalar(0.9);note.position.set(0,2.0,0);note.raycast=()=>{};g.add(note);
    const word=new THREE.Sprite(new THREE.SpriteMaterial({map:k21Label(t.w,t.c),transparent:true,depthWrite:false}));word.scale.set(1.8,0.6,1);word.position.set(0,1.05,0);word.raycast=()=>{};g.add(word);
    g.traverse(c=>{c.userData.noBatch=true;});return Object.assign(t,{i,g,mat,note,on:false,fresh:false,lit:0});});
  const TS={step:0,t:0,done:false,fails:0};
  {const pl=new THREE.Mesh(new THREE.PlaneGeometry(4.2,1.7),new THREE.MeshBasicMaterial({map:K21_TUNE_TEX}));pl.position.set(0,2.6,-182.6);W.group.add(pl);for(const sx of[-1.9,1.9])addMesh(new THREE.CylinderGeometry(0.07,0.07,2.6,6),M(0x6a4020),sx,1.3,-182.7);}
  const tuneGate=new THREE.Group();W.group.add(tuneGate);for(let x=-10.6;x<=10.6;x+=0.7)addMesh(new THREE.BoxGeometry(0.12,4.2,0.12),goldM,x,2.1,-212.9,tuneGate);for(const y of[1.2,2.6,4.0])addMesh(new THREE.BoxGeometry(22,0.14,0.14),goldM,0,y,-212.9,tuneGate);
  const tgBells=[];for(let x=-9;x<=9;x+=3)tgBells.push(addMesh(new THREE.ConeGeometry(0.22,0.32,10),goldM,x,4.35,-212.9,tuneGate));
  const tuneCol=colBox(-11,11,0,4.4,-213.2,-212.6,false);
  const nutTune=nutItem(9.8,0.6,-196.6);
  const sturg=sturgeonMesh21();sturg.g.visible=false;
  /* ---------- Ж2. Палаты Морского царя: пляска в два голоса у самого трона ---------- */
  // былина о Садко: Морской царь велит играть — и пляшет так, что море ходуном ходит. Два стула гусляра — прямо перед троном:
  // царь пляшет, только когда играют оба (в два голоса); от пляски по палатам расходятся кольца-волны — играющих у трона они задевают,
  // через них прыгают. Пляс-ракушки над троном копят пляску — три колена (барыня, вприсядку, шибче); во втором колене с венца
  // сыплются жемчужинки — подбери, и пляска пойдёт быстрее. Наплясался — ролик: наверху от пляски корабли качаются; царь отворяет двери.
  const K0=-180+S1,TZ=K0-34.8;
  const hallM=M(0xc8dcd6);ground(-11,11,K0-38,K0,0,hallM);
  for(let z=K0-2;z>K0-36;z-=2.4)for(let x=-10;x<=10;x+=2.4)if(((x+z)|0)%2===0)addMesh(new THREE.BoxGeometry(2.3,0.02,2.3),M(0xe8f0ee),x,0.012,z).receiveShadow=true;   // перламутровые плиты
  for(const x of[-8.2,8.2])for(const z of[K0-6,K0-14,K0-22,K0-30]){addMesh(new THREE.CylinderGeometry(0.42,0.5,6,10),M(0xd8e8e4),x,3,z);addMesh(new THREE.TorusGeometry(0.5,0.1,6,14),goldM,x,5.6,z).rotation.x=Math.PI/2;W.cyls.push({x,z,r:0.5,miny:-1,maxy:6,on:true});}
  {const wm=W.group.children.length;box(-11,-9,0,6.4,K0-37.4,K0-36.6,wallM);box(-5,5,0,6.4,K0-37.4,K0-36.6,wallM);box(9,11,0,6.4,K0-37.4,K0-36.6,wallM);
    box(-11,11,6.4,7.0,K0-37.4,K0-36.6,wallM,{solid:false});kdome(0,K0-37,0.55,7);fadeable(since(wm));}
  const HD=[-7,7].map(x=>{const g=new THREE.Group();W.group.add(g);for(let k=0;k<6;k++)addMesh(new THREE.BoxGeometry(0.6,4.2,0.25),M(0x5aa0a0,{emissive:0x0a3a40,emissiveIntensity:0.4}),x-1.65+k*0.66,2.1,K0-37,g);
    return {g,col:colBox(x-2,x+2,0,4.4,K0-37.4,K0-36.6,false),k:0};});
  box(-3.2,3.2,0,1.2,TZ-1.8,TZ+2.2,stepM,{occ:false});
  const king=kingMesh21();king.g.position.set(0,1.2,TZ);W.cyls.push({x:0,z:TZ,r:1.1,miny:-1,maxy:4.6,on:true});
  // пляс-ракушки над троном: три колена по три ракушки
  const PLS=[];for(let i=0;i<9;i++){const a=(i-4)*0.27,g=new THREE.Group();g.position.set(Math.sin(a)*4.6,5.4+Math.cos(a)*1.2,TZ-1.4);W.group.add(g);const mat=M([0xffd23a,0x5ab8ff,0xff7ab0][Math.floor(i/3)],{emissive:[0xffb000,0x3a8aff,0xff4a8a][Math.floor(i/3)],emissiveIntensity:0.08});
    for(let k=0;k<5;k++){const r=addMesh(new THREE.BoxGeometry(0.12,0.5,0.06),mat,Math.sin((k-2)*0.3)*0.22,Math.cos((k-2)*0.3)*0.22,0,g);r.rotation.z=-(k-2)*0.3;}g.traverse(c=>{c.userData.noBatch=true;});PLS.push({g,mat});}
  // гусли — прямо перед троном: два стула, два голоса
  const SEATREF=[0,1].map(i=>({hum:0,ring(h){const was=this.hum;this.hum=6;if(was<=0)[67,71,74,79].forEach((m,k)=>gusli(m+(i?5:0),k*0.09,0.12));}}));
  const seats=[-3.6,3.6].map((x,i)=>kwShell('dance',x,TZ+6.4,0,SEATREF[i],{ry:Math.PI,say:i?'Второй голос!':'Первый голос!'}));
  for(const s of seats)box(s.x-0.55,s.x+0.55,0,0.5,s.z-0.55,s.z+0.55,M(0x8a5a2e),{occ:false});
  // рыбий хор и лучи света — пляшут вместе с царём
  const CHOIR=new THREE.Group();CHOIR.position.set(0,0,TZ);W.group.add(CHOIR);const chF=[];for(let i=0;i<12;i++){const f=new THREE.Group();const fm=M([0xffd23a,0xff7a5a,0x5ab8ff,0xe07ad8][i%4]);
    const b=addMesh(new THREE.SphereGeometry(0.2,8,6),fm,0,0,0,f);b.scale.set(0.6,0.8,1.5);const t=addMesh(new THREE.ConeGeometry(0.16,0.24,4),fm,0,0,-0.36,f);t.rotation.x=-Math.PI/2;CHOIR.add(f);chF.push({f,a:i/12*Math.PI*2,r:3.2+(i%3)*0.9,y:2+(i%4)*0.7});}
  CHOIR.traverse(c=>{c.userData.noBatch=true;});
  const RAYS=[0,1,2].map(i=>{const m=new THREE.Mesh(new THREE.ConeGeometry(2.2,14,16,1,true),MB([0xffe08a,0x9fe6ff,0xffb0d0][i],{transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
    m.position.set(0,7,TZ+4);m.userData.noBatch=true;W.group.add(m);return m;});
  const WAV=[],PRL=[];const KD={on:false,meter:0,round:0,waveT:1,side:1,lonely:0,pearlT:2,pearls:0};
  const nutHall=nutItem(-9.6,0.6,K0-27);
  // корабли наверху, у самой глади — видно лишь в ролике: от пляски их качает
  const SHIPS=new THREE.Group();SHIPS.visible=false;W.group.add(SHIPS);{const sil=MB(0x15303c,{fog:false}),sky=MB(0xbff4ff,{transparent:true,opacity:0.55,fog:false,side:THREE.DoubleSide,depthWrite:false});
    const top=new THREE.Mesh(new THREE.PlaneGeometry(90,90,1,1),sky);top.rotation.x=Math.PI/2;top.position.set(0,24,TZ);SHIPS.add(top);
    for(const [x,z,s] of[[-7,TZ+2,1.1],[2,TZ-5,1.4],[9,TZ+4,0.9]]){const sh=new THREE.Group();sh.position.set(x,22.6,z);sh.scale.setScalar(s);SHIPS.add(sh);const hull=new THREE.Mesh(new THREE.BoxGeometry(4.6,1.0,1.4),sil);sh.add(hull);
      const bow=new THREE.Mesh(new THREE.ConeGeometry(0.7,1.4,4),sil);bow.rotation.z=-Math.PI/2;bow.position.x=2.9;sh.add(bow);const mast=new THREE.Mesh(new THREE.BoxGeometry(0.12,4.2,0.12),sil);mast.position.y=2.4;sh.add(mast);
      const sail=new THREE.Mesh(new THREE.PlaneGeometry(2.4,2.4),sil);sail.position.set(0,2.8,0);sh.add(sail);sh.userData.ph=Math.random()*6;}
    SHIPS.traverse(c=>{c.userData.noBatch=true;c.castShadow=false;});}
  /* ---------- З. две раковины: левой воде — прилив, правой — отлив, одновременно (дальше на 78 м) ---------- */
  const D2=-78+S1;
  ground(-11,11,-142+D2,-140+D2,0,pave);ground(-11,-1,-156+D2,-142+D2,0,basinM);ground(1,11,-156+D2,-142+D2,0,basinM);box(-1,1,0,3.2,-156+D2,-142+D2,stepM);
  const LZ=waterZone(-11,-1,-156+D2,-142+D2,0,2.4,{shell:{x:-2.1,z:-142.6+D2,y:0}});
  const RZ=waterZone(1,11,-156+D2,-142+D2,0,2.4,{start:'high',shell:{x:2.1,z:-142.6+D2,y:0}});
  const board=(x,txt,col)=>{const b=new THREE.Mesh(new THREE.PlaneGeometry(4.2,1.3),new THREE.MeshBasicMaterial({map:scratchTex(txt,512,160,'#f4ecd8',col)}));b.position.set(x,4.6,-155.6+D2);W.group.add(b);
    addMesh(new THREE.CylinderGeometry(0.07,0.07,4.6,6),M(0x6a4020),x,2.3,-155.8+D2);return b;};
  board(-6,'↑ ПРИЛИВ ↑','#1a5a8a');board(6,'↓ ОТЛИВ ↓','#8a3a1a');
  const grate=new THREE.Group();W.group.add(grate);const gm2=M(0x5a4a3a);
  for(let x=-10.5;x<=10.5;x+=0.75)addMesh(new THREE.BoxGeometry(0.14,3.6,0.14),gm2,x,1.8,-156.5+D2,grate);for(const y of[0.8,2.2,3.4])addMesh(new THREE.BoxGeometry(22,0.16,0.16),gm2,0,y,-156.5+D2,grate);
  const grateCol=colBox(-11,11,0,3.6,-156.8+D2,-156.2+D2,false);
  /* ---------- З2. Сад Китежа: родник наполняет сад; ракушка — на дне, у неё только тяжёлый Потап; водоросли-лесенки Йоши ---------- */
  // в приливе сад — глубокий пруд: до ракушки на дне дойдёт лишь Потап (не всплывает). Отлив открывает дно: Йоша поливает ростки —
  // вырастают лесенки к террасе. Родник через 10 с снова наполняет сад — если оставленный не держит напев. На одном ростке — якорь: Потап поднимет.
  const DG=S1;   // сад сдвинут вместе со всем, что дальше
  ground(-11,11,-237+DG,-234+DG,0,pave);bell(0,-235.6+DG);
  ground(-9,9,-259+DG,-237+DG,-4,M(0x4a6a5a));ground(-11,-9,-259+DG,-237+DG,0,pave);ground(9,11,-259+DG,-237+DG,0,pave);
  for(const s of[-1,1])for(let i=0;i<9;i++){const x0=s<0?-9:7.4,x1=s<0?-7.4:9;box(x0,x1,-4,-0.4*(i+1),-237.6-0.6*i+DG,-237-0.6*i+DG,stone,{occ:false});}   // ступени на дно сада
  box(-11,11,-4,4.5,-263+DG,-259+DG,stepM);for(let i=0;i<9;i++)box(-11,11,0,4.5-0.5*(i+1),-263.33-0.33*i+DG,-263-0.33*i+DG,stepM,{occ:false});
  for(let x=-10;x<=10;x+=2.5)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,4.62,-259.1+DG);
  const GARD=waterZone(-9,9,-259+DG,-237+DG,-4,0.8,{floor:-4,start:'high',shell:{x:0,z:-246.4+DG,y:-4}});GARD.heavy=true;GARD.kwHoldable=true;GARD.holdT=0;
  GARD.lock=(pi,h,want)=>h.pos.y>-3.2?'Ракушка сада — на дне, у родника. Дотянись до неё!':null;
  {const sp=new THREE.Group();sp.position.set(0,-4,-249.4+DG);W.group.add(sp);addMesh(new THREE.CylinderGeometry(0.9,1.2,0.6,10),stone,0,0.3,0,sp);addMesh(new THREE.SphereGeometry(0.35,10,8),M(0x9fefff,{emissive:0x3ab0c0,emissiveIntensity:0.7}),0,0.65,0,sp);W.cyls.push({x:0,z:-249.4+DG,r:1.1,miny:-5,maxy:-3.4,on:true});}
  {let sd=4242;const rr=(a,b)=>{sd=(sd*16807)%2147483647;return a+(b-a)*sd/2147483647;};   // деревца с ветками-коллизиями — места одни и те же при каждой загрузке
    for(let i=0;i<10;i++){const x=rr(-8,8),z=rr(-257,-239);if(Math.abs(x)<2&&z<-245)continue;if(Math.hypot(Math.abs(x)-4,z+256.9)<2.4)continue;appleSea21(x,-4,z+DG);}}   // у лесенок — пусто
  const KS=[FIN.kwKelp(-4,-4,-256.9+DG,8.5,{last:-Math.PI/2}),FIN.kwKelp(4,-4,-256.9+DG,8.5,{last:-Math.PI/2,active:()=>!!F.anchor})];   // винтовые лесенки: верхний лист — вровень с террасой
  const anchor=new THREE.Group();anchor.position.set(4,-4,-256.9+DG);W.group.add(anchor);{const im=M(0x5a6068);addMesh(new THREE.BoxGeometry(0.16,1.6,0.16),im,0,0.8,0,anchor).rotation.z=0.5;const t=addMesh(new THREE.TorusGeometry(0.55,0.08,6,12,Math.PI),im,0.2,0.4,0,anchor);t.rotation.z=Math.PI+0.5;
    addMesh(new THREE.TorusGeometry(0.16,0.05,6,12),im,-0.38,1.5,0,anchor);}
  W.lifts.push({pos:new V3(4,-4,-256.9+DG),active:()=>!F.anchor,onLift:h=>{F.anchor=true;SFX.toss();anim(1.0,k=>{anchor.position.set(4+k*2.4,-4+Math.sin(k*Math.PI)*1.6,-256.9+DG+k*1.2);anchor.rotation.z=k*1.4;});
    later(0.5,()=>bark(h,'potap','Якорь… как пёрышко! Ну, почти.',2,true));}});
  const nutGarden=(p=>nutItem(p.x,p.y+0.6,p.z))(KS[1].padAt(11));   // орешек над листом лесенки — по пути наверх
  /* ---------- З3. Рак-Отшельник у ворот Китежа: мини-босс в два этапа (late_99m_k21_hermit.js) ---------- */
  const HB=FIN.hermitBoss({z0:-266+DG,z1:-310+DG});
  /* ---------- И. ворота Китежа (дальше на 110 м) ---------- */
  const D3=-110+S1-44;   // ворота — за ареной Рака-Отшельника
  ground(-11,11,-172+D3,-156+D3,0,pave);
  {const gm=W.group.children.length;for(const sd of[-1,1])box(sd*3.9-0.9,sd*3.9+0.9,0,5.2,-167+D3,-165.6+D3,wallM);addMesh(new THREE.BoxGeometry(9.6,1.1,1.6),wallM,0,5.75,-166.3+D3);kdome(0,-166.3+D3,0.5,6.3);fadeable(since(gm));}
  const endLink=linkItem(0,1.1,-162.6+D3);bell(0,-158.6+D3);
  FIN.kwPrompts();
  W.updates.push(dt=>{
    if(!mkt.started&&[0,1].some(pi=>active(pi).pos.z<-118.5+D&&active(pi).pos.y<3)){mkt.started=true;SFX.gate();
      mkt.list=[crab(-6.5,-126+D,null,{leash:6}),crab(6.5,-126+D,null,{leash:6}),FIN.pearlClam(0,-127+D,MP,0,{})];
      banner('Торговые ряды!','#9fd0ff',2.2,'раки щиплют красным — кувырком · Жемчужница в пруду: отлив — ахнет и раскроется');}
    if(mkt.started&&!mkt.done&&mkt.list.every(e=>!e.alive)){mkt.done=true;mktGate.forceOpen=true;SFX.ok();banner('Отбились!','#ffffff',1.8,'дальше — палаты Морского царя');}
    if(!F.grate){const ok=LZ.state==='high'&&LZ.t>=1&&RZ.state==='low'&&RZ.t>=1;
      if(ok){F.grate=true;grateCol.on=false;SFX.gate();SFX.ok();anim(1.6,k=>{grate.position.y=3.8*smooth(k);});banner('Решётка поднялась!','#ffffff',2,'вместе получилось');}}
    // Переливная улица
    if(!F.perelTold&&[0,1].some(pi=>active(pi).pos.z<-79+PZ&&active(pi).pos.z>-82+PZ)){F.perelTold=true;perelScene();}
    // Звонкая мостовая: осётр напевает напев; плиты по напеву
    if(!F.sturg&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-182.5&&active(pi).pos.z>-213)){F.sturg=true;sturgeonPass();}
    tuneTick(dt);
    // палаты: пляска в два голоса
    danceTick(dt);
    // Сад Китежа: родник наполняет сад через 10 с отлива; напев оставленного держит отлив
    GARD.holdT=Math.max(0,(GARD.holdT||0)-dt);
    if(GARD.state==='low'&&GARD.t>=1&&!G.cine){if(GARD.holdT<=0)F.gardT=(F.gardT||0)+dt;if(F.gardT>10){F.gardT=0;setWater(GARD,'high');banner('Родник опять наполнил сад!','#9fe6ff',1.8,'Потап — на дно, к ракушке; сменишь героя — оставленный подержит отлив');}}else F.gardT=0;
    if(!F.gardTold&&[0,1].some(pi=>active(pi).pos.z<-236.5+DG&&active(pi).pos.z>-240+DG)){F.gardTold=true;say('zven','Сад Китежа! Ракушка — на дне. Глубоко — только Потапу дойти!',3,true);}
    // Переливная: подсказка про Потапа, когда вода «не идёт»
    if(!F.perelLeftTold&&SLU.held()&&SLU.hero&&!kwControlled(SLU.hero)){F.perelLeftTold=true;
      for(const p of[0,1])tip(p,'Оставленный герой остаётся на месте и делает своё: Потап держит заслонку.',3.6);}
    if(!F.out&&!F.gateSeen&&!G.cine&&F.hermitWon&&[0,1].every(pi=>active(pi).pos.z<-158+D3)&&[0,1].some(pi=>active(pi).pos.z<-161+D3)){F.gateSeen=true;gateScene();}});
  W.tipZones.push({cond:(pi,h)=>[L1,L2].some(z=>inZone(z,h,0)&&z.state==='low'&&h.pos.y<z.floor+0.4),text:pi=>'Стенка высока — сыграй прилив '+K(pi,'item')+'!'},
    {cond:(pi,h)=>mkt.started&&!mkt.done&&MP.state==='high'&&hd(h.pos,{x:0,z:-127+D})<7,text:pi=>'Сыграй отлив '+K(pi,'item')+' — створки раскроются.'},
    {cond:(pi,h)=>!F.grate&&h.pos.z<-141+D2&&h.pos.z>-157+D2,text:pi=>'Левой воде — прилив, правой — отлив. На таблички гляди!'},
    {cond:(pi,h)=>h.pos.z<-80+PZ&&h.pos.z>-108+PZ&&!SLU.held(),text:pi=>'Поставь на заслонку Потапа '+K(0,'swap')+' — он удержит.'},
    {cond:(pi,h)=>h.pos.z<-80+PZ&&h.pos.z>-108+PZ&&SLU.held(),text:pi=>'Прилив у тебя '+K(pi,'item')+', отлив — у друга.'},
    {cond:(pi,h)=>h.pos.z<K0&&h.pos.z>K0-37&&F.kingMet&&!F.kingDone,text:pi=>KD.on?'Царь пляшет! Кольца-волны — прыгай '+K(pi,'jump')+'. Сбило — вернись к стулу и сыграй '+K(pi,'item')+'.'+(KD.round>=1?'<br>Жемчужинки с венца подбирай — пляска пойдёт шибче!':''):'Играйте '+K(pi,'item')+' оба! Один — смени героя '+K(pi,'swap')+'.'},
    {cond:(pi,h)=>h.pos.z<-182&&h.pos.z>-212.6&&!TS.done&&F.sturg,text:pi=>'Плиты по напеву Садко: дзинь, дилинь, дон-дон!'},
    {cond:(pi,h)=>h.pos.z<-237+DG&&h.pos.z>-259+DG&&GARD.state==='high'&&h.kind!=='potap',text:pi=>pi?'Ракушка на дне — зови друга '+K(1,'call')+'.':'Ракушка на дне — Потап дойдёт: смени '+K(0,'swap')+'.'},
    {cond:(pi,h)=>h.pos.z<-237+DG&&h.pos.z>-259+DG&&GARD.state==='low',text:pi=>(KS.some(s=>!s.grown)?'Дно открыто! Йоша, полей ростки живой водой '+K(1,'skill')+' — вырастут лесенки.<br>':'')+'Родник наполнит сад через '+Math.max(0,Math.ceil(10-(F.gardT||0)))+' с. Наверх — с листа на лист!'});
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>[L1,L2].some(z=>inZone(z,h(),0.2)&&z.state==='low'&&h().pos.y<z.floor+0.5),'прилив — наверх');
    prompt(pi,'item',()=>headOf(h()),()=>mkt.started&&!mkt.done&&inZone(MP,h(),1.2)&&MP.state==='high','отлив — Жемчужница ахнет');
    prompt(pi,'item',()=>headOf(h()),()=>!F.grate&&inZone(LZ,h(),0.2)&&LZ.state==='low','прилив!');
    prompt(pi,'item',()=>headOf(h()),()=>!F.grate&&inZone(RZ,h(),0.2)&&RZ.state==='high','отлив!');
    prompt(pi,'item',()=>headOf(h()),()=>SLU.held()&&hd(h().pos,pi?CR.shell.g.position:CL.shell.g.position)<2&&(pi?CR:CL).state==='low','прилив — лодку к террасе');
    prompt(pi,'attack',()=>headOf(h()),()=>!ropes[pi].pulled&&h().pos.y>2.9&&hd(h().pos,ropes[pi].g.position)<2,'дёрни верёвку');
    prompt(pi,'item',()=>headOf(h()),()=>GARD.state==='high'&&inZone(GARD,h(),0)&&h().pos.y<-3,'отлив — открой дно');}
  prompt(0,'swap',()=>headOf(HERO.potap),()=>!SLU.held()&&HERO.proshka.active&&active(0).pos.z<-78+PZ&&active(0).pos.z>-108+PZ,'Потапа — на заслонку');
  prompt(0,'skill',()=>headOf(HERO.potap),()=>!F.anchor&&HERO.potap.active&&hd(HERO.potap.pos,{x:4,z:-258.3+DG})<2.3&&HERO.potap.pos.y<-3,'поднять якорь');
  prompt(1,'skill',()=>headOf(HERO.yosha),()=>HERO.yosha.active&&KS.some(s=>!s.grown&&hd(s,HERO.yosha.pos)<3&&Math.abs(HERO.yosha.pos.y-s.y)<2.2&&(s===KS[0]||F.anchor)),'живая вода — росток');
  /* ---------- сюжет ---------- */
  function sadkoIntro(){F.stage='intro';
    play({dur:9.4,fov:48,shots:[shot(0,[-0.6,3.2,-7.6],[-6.4,1.2,-15]),shot(4.2,[-4.3,1.9,-12.2],[-6.3,1.4,-14.7])],
      says:[[0.3,3.8,null,'<i>На площади Садко сидит — струна на гуслях порвана,</i><br><i>И капля тёмная над ней горит, как проклятая.</i>',true],[4.3,2.6,'sadko','Без струны нет песни. Без песни — и Китеж молчит.'],[7.0,2.2,'zven','Йоша! Мёртвой водой полей — и струна срастётся!']],
      tick:(t)=>{sadko.head.rotation.x=0.25;sadko.drop.position.y=1.35+Math.sin(t*3)*0.04;},end:()=>{F.stage='sadko';}});}
