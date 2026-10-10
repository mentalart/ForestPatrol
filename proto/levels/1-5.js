/* ============================== 1-5 «КИКИМОРИНА ПРЯЛКА» ============================== */
// кульминация мира — подворье Кикиморы, пять частей (путь ≈ 120 м, прежде — один овин в 38 м):
//   сени-мотальня (z 50…28): мотовило-противовес — тяжёлый вниз, лёгкий вверх; клубок на мотовило — поднимает оставшегося;
//   ткацкая (z 28…4, пол 4,4): подножка открывает зев, клубок-челнок ткёт полотно-мост через провал;
//   овин (z 4…−34): паутинка крест-накрест · тянущая прялка · Совиный взор: старая нить; на чердаке веретено вырывается у Кикиморы;
//   сушильня (z −34…−52, пол 7): сторожевые нити видны Совиным взором (низкую — перепрыгнуть, высокую — обойти), засов на двоих;
//   повить (z −52…−74, пол 7): мини-босс Веретенник — рывок в паутинку, кокон, дуга нитей, липкий след; этап 2 — мороки и три веретена.
function holdRing(x,y,z,pi){const g=new THREE.Group();g.position.set(x,y+0.03,z);W.group.add(g);const m=MB(PCOL[pi],{transparent:true,opacity:0.8});
  const r=new THREE.Mesh(new THREE.TorusGeometry(0.7,0.07,6,28),m);r.rotation.x=Math.PI/2;g.add(r);const r2=new THREE.Mesh(new THREE.TorusGeometry(0.38,0.05,6,20),m);r2.rotation.x=Math.PI/2;g.add(r2);
  return {g,m,x,y,z,pi};}
/* ---------- Веретенник: веретено Кикиморы, обмотанное чёрной куделью (кокон); острие — слабое место ---------- */
function veretenLook(inner){const wood=M(0xb07a44),coc=M(0x3a1a4a,{emissive:0x4a1a6a,emissiveIntensity:0.5}),tipM=M(0xc8a060,{emissive:0x000000,emissiveIntensity:0});
  part(inner,new THREE.CylinderGeometry(0.11,0.13,3.0,8),wood,0,1.75,0);const tip=part(inner,new THREE.ConeGeometry(0.2,0.9,10),tipM,0,3.65,0);
  const bot=new THREE.ConeGeometry(0.16,0.55,8);bot.rotateX(Math.PI);part(inner,bot,wood,0,0.3,0);
  const whorl=new THREE.Group();whorl.position.y=0.75;inner.add(whorl);part(whorl,new THREE.CylinderGeometry(0.78,0.7,0.24,16),M(0xa8402a),0,0,0);
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;part(whorl,new THREE.SphereGeometry(0.07,6,5),M(0xf0d070),Math.cos(a)*0.66,0.1,Math.sin(a)*0.66);}
  const body=part(inner,new THREE.SphereGeometry(0.75,14,10),M(0xe8dcc0),0,1.9,0);body.scale.set(1,1.3,1);
  for(let i=0;i<6;i++){const t=part(inner,new THREE.TorusGeometry(0.62+((i*7)%5)*0.03,0.035,5,20),M([0xd8c08a,0xc8a868,0xf0e0b8][i%3]),0,1.9,0);t.rotation.set(Math.PI/2+(i-2.5)*0.22,i*0.5,0);}
  const cocoon=new THREE.Group();inner.add(cocoon);   // кудель обходит лицо — глаза видно всегда
  for(let i=0;i<26;i++){const y=1.0+(i%13)*0.15,a=i*2.39996,r=0.84-Math.abs(y-1.9)*0.16;if(Math.sin(a)>0.72&&y>1.6&&y<2.4)continue;const s=part(cocoon,new THREE.SphereGeometry(0.34,8,6),coc,Math.cos(a)*r,y,Math.sin(a)*r);s.scale.set(1,0.8,1);}
  for(let i=0;i<10;i++){const c=part(cocoon,new THREE.ConeGeometry(0.06,0.5,4),coc,0,0,0);const a=i*0.63+1.9,y=1.2+(i%5)*0.3;c.position.set(Math.cos(a)*0.95,y,Math.sin(a)*0.95);c.rotation.z=Math.PI/2;c.rotation.y=-a;}
  return {cocoon,tip,tipM,whorl,body,eyeY:2.05,eyeZ:0.8,top:4.1};}
function build15(){
  if(!FOE.vereten){FOE.vereten={r:1.15,emb:6,sig:['yellow','red'],sp:1.5,look:'vereten',big:true};   // Веретенник: облик — veretenLook (при первом входе в уровень)
    WHO.vereten=['Веретенник','#e8d8b0'];VOICE.vereten={f:120,w:'triangle',sp:0.12};
    const _fl=foeLook;foeLook=function(kind,inner,def){return def.look==='vereten'?veretenLook(inner):_fl(kind,inner,def);};}
  W.zvenAway=true;   // Звенышко улетает вперёд и появляется, только когда нужно
  setTheme('barn');W.name='1-5 · «Кикиморина прялка»';W.sub='Дремучий лес · подворье Кикиморы · паутинка крест-накрест';W.camX=10;const F=W.flags;
  W.abil.clew=true;W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.threadLife=10;
  const floorM=M(0x9a7a50),sideM=M(0x6a5030),plank=M(0x7a5634),wm=M(0x6a4a2a),wd=M(0x4a3218);
  const walls=[];const wall=(a,b,c,d,e,f)=>{const r=box(a,b,c,d,e,f,wm,{occ:false});r.col.camWall=true;walls.push(r.mesh);return r;};
  const acts=()=>G.solo?[active(G.soloPi)]:[active(0),active(1)];
  const gold=()=>MB(COL.gold,{transparent:true,opacity:0.85});
  const ghostOf=(kind,x,y,z,face)=>{const g=buildHeroMesh(kind,true).g;g.position.set(x,y,z);g.rotation.y=face;W.group.add(g);return g;};
  const goldRing=(x,y,z,r)=>{const g=new THREE.Group();g.position.set(x,y+0.04,z);W.group.add(g);const m=gold();for(const k of[1,0.55]){const t=new THREE.Mesh(new THREE.TorusGeometry((r||0.7)*k,0.07,6,28),m);t.rotation.x=Math.PI/2;g.add(t);}g.userData.m=m;return g;};
  /* ================= 1. СЕНИ И МОТАЛЬНЯ (z 50,4 … 28,4, пол 0): мотовило-противовес ================= */
  ground(-12,12,28.4,50.4,0,floorM,sideM);
  wall(-12.4,-12,-1,16,28,50.8);wall(12,12.4,-1,16,28,50.8);wall(-12.4,-3,-1,16,50.4,50.8);wall(3,12.4,-1,16,50.4,50.8);wall(-3,3,5,16,50.4,50.8);
  colBox(-3,3,-1,5,50.4,50.8);   // ворота во двор — за них не выйти (камере не мешают)
  box(-12,12,0,4.4,28.4,31.4,plank,{occ:false});addMesh(new THREE.BoxGeometry(24,0.12,3),floorM,0,4.42,29.9);   // полати
  wall(-12.4,-2,4.4,16,28,28.4);wall(2,12.4,4.4,16,28,28.4);wall(-2,2,8.6,16,28,28.4);   // стена с дверью в ткацкую
  {const d0=W.group.children.length;
    for(let z=48;z>29;z-=5)for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.5,16,0.5),wd,s*11.7,8,z);
    for(let i=0;i<6;i++){const r=addMesh(new THREE.BoxGeometry(0.4,0.4,22),wd,-10+i*4,15.4,39.4);r.castShadow=false;}
    for(let x=-11;x<12;x+=1.6)addMesh(new THREE.BoxGeometry(0.1,0.9,0.1),wd,x,4.9,31.3);addMesh(new THREE.BoxGeometry(24,0.1,0.14),wd,0,5.35,31.3);   // перильце полатей
    for(let i=0;i<7;i++){const h=addMesh(new THREE.BoxGeometry(1.4,0.9,1),M(0xd8b04a),rand(-11,-8),0.45,rand(36,48));h.rotation.y=rand(0,3);}   // сено
    // прялки, мотки и кудель по стенам
    for(let i=0;i<4;i++){const g=new THREE.Group();g.position.set(i%2?10.6:-10.6,0,46-i*4.6);g.rotation.y=i%2?-Math.PI/2:Math.PI/2;W.group.add(g);
      const r=addMesh(new THREE.TorusGeometry(0.9,0.06,6,24),M(0x8a5a32),0,1.6,0,g);addMesh(new THREE.BoxGeometry(0.12,1.6,0.12),M(0x5a3a1a),0,0.8,0,g);addMesh(new THREE.BoxGeometry(1.6,0.12,0.5),M(0x5a3a1a),0,0.25,0,g);r.rotation.y=0;}
    for(let i=0;i<12;i++){const sk=addMesh(new THREE.TorusGeometry(0.28,0.1,6,14),M([0xc0302a,0x3a6ad0,0xe0b020,0x3f8a45,0x9a4a6a][i%5]),i%2?11.85:-11.85,2+(i%3)*1.3,47-i*1.4);sk.rotation.y=Math.PI/2;}
    for(let i=0;i<8;i++){const x=rand(-10,10),z=rand(32,49);addMesh(new THREE.CylinderGeometry(0.01,0.01,1.4,4),M(0x6a4a2a),x,14.3,z);const c=addMesh(new THREE.ConeGeometry(0.32,1.2,7),M([0xd8c08a,0xc8a868][i%2]),x,13.1,z);c.rotation.x=Math.PI;}
    for(let i=0;i<50;i++){const st=addMesh(new THREE.BoxGeometry(0.5,0.02,0.04),M(0xd8b04a),rand(-11.5,11.5),0.02,rand(32,50));st.rotation.y=rand(0,3.14);st.castShadow=false;}
    for(const x of[-2.8,2.8])addMesh(new THREE.BoxGeometry(0.5,6,0.5),wd,x,3,50.2);addMesh(new THREE.BoxGeometry(6.1,0.5,0.5),wd,0,5.9,50.2);}   // столбы ворот
  lantern(-11.2,47,0);lantern(11.2,40,0);lantern(-11.2,30,4.4);lantern(11.2,30,4.4);
  // мотовило-противовес: две площадки на одной нити через блок под крышей. На обеих стоят — тяжелей вниз, легче вверх; поровну — стоят; пусто — в покое на 0,9 м
  const LIFT={rest:0.9,top:4.4,low:0.08,wind:-1,windT:0,told:{}};   // низ — чуть выше пола, чтобы стоящий был на площадке, а не на полу
  const PL=[[-7.6,-4.4],[4.4,7.6]].map(([x0,x1],i)=>{const col=colBox(x0,x1,0.6,0.9,31.5,34.5,false);const g=new THREE.Group();g.position.set((x0+x1)/2,0.9,33);W.group.add(g);
    addMesh(new THREE.BoxGeometry(x1-x0,0.3,3),plank,0,-0.15,0,g);for(const s of[-1,1])addMesh(new THREE.BoxGeometry(x1-x0,0.12,0.12),wd,0,0.06,s*1.45,g);
    for(const s of[-1,1])for(const t of[-1,1]){const r=addMesh(new THREE.CylinderGeometry(0.03,0.03,1,4),M(0xd8d8e4),s*1.3,0,t*1.2,g);r.userData.rope=true;}
    const ring=goldRing((x0+x1)/2,0.9,33,1.0);return {x0,x1,cx:(x0+x1)/2,col,g,ring,y:0.9,i};});
  const pulley=[];for(const P of PL){const wl=addMesh(new THREE.TorusGeometry(0.5,0.1,6,18),M(0x5a3a1a),P.cx,10,33);wl.rotation.y=Math.PI/2;pulley.push(wl);}
  addMesh(new THREE.BoxGeometry(14,0.4,0.4),wd,0,10.6,33);const overRope=addMesh(new THREE.BoxGeometry(12,0.05,0.05),M(0xd8d8e4),0,10.5,33);
  const reel=new THREE.Group();reel.position.set(0,4.4,29.8);W.group.add(reel);
  {for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.2,1.6,0.2),wd,s*0.9,0.8,0,reel);const spin=new THREE.Group();spin.position.y=1.4;reel.add(spin);reel.userData.spin=spin;
    for(let i=0;i<4;i++){const a=addMesh(new THREE.BoxGeometry(0.12,1.6,0.12),M(0x8a5a32),0,0,0,spin);a.rotation.x=i*Math.PI/4;}addMesh(new THREE.CylinderGeometry(0.22,0.22,1.7,10).rotateZ(Math.PI/2),M(0xd8d0b8),0,0,0,spin);}
  W.cyls.push({x:0,z:29.8,r:0.7,miny:4,maxy:6,on:true});
  const reelRing=goldRing(0,4.4,28.9,0.6);
  const weightOn=P=>HEROES.reduce((s,h)=>s+(h.groundRef===P.col?(h.kind==='potap'?2:1):0),0);
  function windReel(pi){const h=active(pi),w=PL.map(weightOn);let wi=w[0]>w[1]?0:w[1]>w[0]?1:-1;
    if(wi<0||PL[wi].y>LIFT.top-0.2){SFX.miss();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Мотовило крутится вхолостую','#d8d8e4');return;}
    LIFT.wind=wi;LIFT.windT=25;SFX.thread();SFX.knot();h.face=Math.atan2(reel.position.x-h.pos.x,reel.position.z-h.pos.z);
    banner('Клубок на мотовило!','#ffd76a',1.6,'нить наматывается — площадка едет вверх');F.wound=true;}
  /* ================= 2. ТКАЦКАЯ (z 28,4 … 4,4, пол 4,4): подножка + клубок-челнок = полотно-мост через провал ================= */
  ground(-12,12,22.4,28.4,4.4,floorM,sideM);ground(-12,12,9.4,11.4,4.4,floorM,sideM);ground(-12,12,4.4,9.4,0,floorM,sideM);
  for(let k=0;k<12;k++){const top=4.05-k*0.35,z0=9.4-k*(5/12);box(-3,3,0,top,z0-5/12,z0,plank,{occ:false});}   // лесенка вниз к воротам овина
  wall(-12.4,-12,-1,16,4.4,28.4);wall(12,12.4,-1,16,4.4,28.4);
  {const pit=new THREE.Mesh(new THREE.PlaneGeometry(24,11),MB(0x1a1208));pit.rotation.x=-Math.PI/2;pit.position.set(0,-5,16.9);W.group.add(pit);
    for(const z of[11.4,22.4]){const e=addMesh(new THREE.BoxGeometry(24,9.4,0.3),M(0x3a2a18),0,-0.3,z+(z>15?-0.15:0.15));e.castShadow=false;}}
  const LOOM={n:0,max:5,strip:2.2,z0:22.4,open:false,busy:0};
  const clothCol=colBox(-1.5,1.5,4.2,4.4,22.4,22.4,false);clothCol.on=false;
  const cloth=addMesh(new THREE.BoxGeometry(3,0.14,1),M(0xe8dcc0),0,4.33,22.4);cloth.scale.z=0.001;
  const clothStripes=[];for(let i=0;i<LOOM.max;i++){const s=addMesh(new THREE.BoxGeometry(3.02,0.15,0.18),M([0xc0302a,0x3a6ad0,0xe0b020,0x3f8a45,0x9a4a6a][i]),0,4.34,LOOM.z0-LOOM.strip*(i+0.5));s.visible=false;clothStripes.push(s);}
  const warp=[];for(let i=0;i<14;i++){const x=-1.4+i*(2.8/13);const m=addMesh(new THREE.CylinderGeometry(0.015,0.015,11,4).rotateX(Math.PI/2),MB(0xf0e8d8),x,4.45,16.9);m.castShadow=false;warp.push(m);}
  {for(const z of[22.6,11.2])for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.35,4,0.35),wd,s*2.4,6.4,z);
    for(const z of[22.6,11.2]){addMesh(new THREE.BoxGeometry(5.2,0.3,0.3),wd,0,8.3,z);const b=addMesh(new THREE.CylinderGeometry(0.22,0.22,4.6,10).rotateZ(Math.PI/2),M(0x8a5a32),0,4.1,z);b.castShadow=false;}}
  const reed=addMesh(new THREE.BoxGeometry(3.4,0.9,0.1),M(0x8a6a40,{transparent:true,opacity:0.75}),0,5.2,22.2);
  const treadle=box(-7.3,-5.7,4.4,4.6,24.7,26.3,M(0x8a5a32),{occ:false});const treadleCol=treadle.col;
  const treadleRing=goldRing(-6.5,4.6,25.5,0.75),spotRing=goldRing(0,4.4,23.7,0.65);
  const loomGh=[ghostOf('potap',-6.5,4.6,25.5,Math.PI),ghostOf('proshka',0,4.4,23.7,Math.PI)];
  const shuttle=new THREE.Mesh(new THREE.SphereGeometry(0.2,10,8),M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.9}));shuttle.visible=false;W.group.add(shuttle);
  function setCloth(){const L=LOOM.n*LOOM.strip;cloth.scale.z=Math.max(0.001,L);cloth.position.z=LOOM.z0-L/2;clothCol.minz=LOOM.z0-L;clothCol.on=L>0;clothStripes.forEach((s,i)=>{s.visible=i<LOOM.n;});}
  function loomThrow(pi){const h=active(pi);if(F.loomDone||LOOM.busy>0)return;
    if(!LOOM.open){SFX.miss();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Зев закрыт!','#d8d8e4');tip(pi,'Зев закрыт! Друг — на подножку.',2.4);return;}
    LOOM.busy=1.0;h.face=Math.PI;SFX.thread();const fz=LOOM.z0-LOOM.n*LOOM.strip-LOOM.strip/2;shuttle.visible=true;
    anim(0.7,k=>{shuttle.position.set(lerp(-2.8,2.8,k),4.75+Math.sin(k*Math.PI)*0.3,fz);if(k>=1)shuttle.visible=false;});
    later(0.75,()=>{LOOM.n++;setCloth();SFX.knot();burst(new V3(0,4.6,fz),COL.gold,10,3);anim(0.35,k=>{reed.position.z=lerp(22.2,fz+1.1,Math.sin(k*Math.PI));});
      floatText(new V3(0,5.6,fz),'Полоса '+LOOM.n+' / '+LOOM.max,'#ffd76a');
      if(LOOM.n>=LOOM.max){F.loomDone=true;SFX.ok();banner('Полотно-мост готов!','#ffd76a',2.2,'идите по полотну на тот берег');
        if(!F.loomFoe){F.loomFoe=true;makeFoe('thread',4,10.4,{y:4.4,leash:5});}}});}
  W.itemSign=pi=>{const h=active(pi);if(!h||players[pi].downed)return null;
    if(!F.loomDone&&hd(h.pos,spotRing.position)<1.1&&Math.abs(h.pos.y-4.4)<0.8)return loomThrow;
    if(h.pos.y>4.1&&h.pos.z>28.4&&hd(h.pos,reel.position)<2.4)return windReel;
    return null;};
  /* ================= 3. ОВИН (z 4 … −34): пол, стены, галерея (4 м), чердак (8 м) ================= */
  ground(-10,10,-34,4,0,floorM,sideM);
  {const c=[colBox(-10.4,-10,-1,16,-34.4,4),colBox(10,10.4,-1,16,-34.4,4),colBox(-10.4,10.4,-1,7,-34.4,-34),colBox(-10.4,10.4,10.2,16,-34.4,-34),colBox(-10.4,-4.5,7,10.2,-34.4,-34),colBox(-0.5,10.4,7,10.2,-34.4,-34)];
    c.forEach(q=>{q.camWall=true;});}
  wall(-12.4,-4,-1,16,4,4.4);wall(4,12.4,-1,16,4,4.4);wall(-4,4,5.6,16,4,4.4);   // передняя стена овина с воротами из ткацкой
  {const bw=W.group.children.length;for(const[w,h,x,y]of[[20.8,7,0,3.5],[20.8,5.8,0,13.1],[5.9,3.2,-7.45,8.6],[10.9,3.2,4.95,8.6]])addMesh(new THREE.BoxGeometry(w,h,0.4),wm,x,y,-34.2);   // задняя стена с дверью с чердака
    for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.4,16,38.4),wm,s*10.2,8,-15);
    for(let z=2;z>-34;z-=4)for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.5,16,0.5),wd,s*9.9,8,z);
    for(let i=0;i<5;i++){const r=addMesh(new THREE.BoxGeometry(0.4,0.4,38),wd,-8+i*4,15.4,-15);r.castShadow=false;}fadeable(since(bw));}
  for(const x of[-4.7,-0.3])addMesh(new THREE.BoxGeometry(0.4,3.4,0.6),wd,x,8.7,-34.2);addMesh(new THREE.BoxGeometry(4.8,0.4,0.6),wd,-2.5,10.3,-34.2);   // косяки двери
  const gal=W.group.children.length;box(-10,-5.5,0,3.4,-30,-6,M(0x7a5634),{occ:false});addMesh(new THREE.BoxGeometry(4.5,0.12,24),M(0x9a7a50),-7.75,3.42,-18);
  for(let z=-7;z>-30;z-=3.2)addMesh(new THREE.BoxGeometry(0.3,3.4,0.3),wd,-5.7,1.7,z);
  box(-10,5,0,7,-34,-29.5,M(0x7a5634),{occ:false});addMesh(new THREE.BoxGeometry(15,0.12,4.5),M(0x9a7a50),-2.5,7.02,-31.75);fadeable(since(gal));
  for(let i=0;i<5;i++){const h=addMesh(new THREE.BoxGeometry(1.4,0.9,1),M(0xd8b04a),rand(3,8.5),0.45,rand(-8,-2));h.rotation.y=rand(0,3);}   // сено
  lantern(-9.2,2,4);lantern(9.2,-4,0);lantern(-9.2,-20,3.4);lantern(-9.2,-32,7);
  /* ---------- эпичный овин: лучи из окон, лунное окно, пыль, нити от прялки, кудель и мотки ---------- */
  {const env=W.group.children.length;
    const rayM=MB(0xfff0c0,{transparent:true,opacity:0.07,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
    for(const[z,w]of[[-4,2.2],[-12,2.6],[-20,2.2],[-27,2.4]]){const win=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.1),MB(0xffe8b0));win.rotation.y=Math.PI/2;win.position.set(-9.98,12.2,z);W.group.add(win);
      const r=new THREE.Mesh(new THREE.PlaneGeometry(w,17),rayM);r.position.set(-4.5,6.6,z+0.6);r.rotation.set(0,Math.PI/2,-0.62);r.castShadow=false;W.group.add(r);}
    const moon=new THREE.Mesh(new THREE.CircleGeometry(1.6,28),MB(0xdfe8ff));moon.position.set(-2.5,12.4,-33.98);W.group.add(moon);
    const mf=addMesh(new THREE.TorusGeometry(1.65,0.14,8,30),M(0x4a3218),-2.5,12.4,-33.9);for(let i=0;i<2;i++){const b=addMesh(new THREE.BoxGeometry(i?0.12:3.3,i?3.3:0.12,0.1),M(0x4a3218),-2.5,12.4,-33.88);}
    const mr=new THREE.Mesh(new THREE.CylinderGeometry(1.4,2.6,12,16,1,true),MB(0xcfe0ff,{transparent:true,opacity:0.06,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));mr.position.set(-2.5,7,-30.5);mr.rotation.x=-0.5;W.group.add(mr);
    const ml=new THREE.PointLight(0xb8ccff,0.9,16,2);ml.position.set(-2.5,11,-31.5);W.group.add(ml);
    const fire=new THREE.PointLight(0xffa050,1.2,14,2);fire.position.set(5.5,3,-16);W.group.add(fire);W.barnFire=fire;
    // кудель и мотки пряжи под крышей, веретёна на стене, паутина по углам, солома
    for(let i=0;i<12;i++){const x=rand(-8,8),z=rand(-32,0);addMesh(new THREE.CylinderGeometry(0.01,0.01,1.4,4),M(0x6a4a2a),x,14.3,z);const c=addMesh(new THREE.ConeGeometry(0.32,1.2,7),M([0xd8c08a,0xc8a868][i%2]),x,13.1,z);c.rotation.x=Math.PI;}
    for(let i=0;i<10;i++){const z=-2-i*3.1;const sk=addMesh(new THREE.TorusGeometry(0.28,0.1,6,14),M([0xc0302a,0x3a6ad0,0xe0b020,0x3f8a45,0x9a4a6a][i%5]),9.85,4.4+(i%3)*1.6,z);sk.rotation.y=Math.PI/2;}
    for(let i=0;i<7;i++){const sp=new THREE.Group();sp.position.set(9.7,2+i*1.3,-8-i*2.6);W.group.add(sp);addMesh(new THREE.ConeGeometry(0.08,0.4,6),M(0xd8c8a0),0,0.2,0,sp);const c2=new THREE.ConeGeometry(0.08,0.4,6);c2.rotateX(Math.PI);addMesh(c2,M(0xd8c8a0),0,-0.2,0,sp);}
    for(const[x,y,z]of[[-9.7,14,-33.7],[9.7,14,-33.7],[-9.7,9,2],[9.7,10,3]])for(let k=0;k<4;k++){const w=new THREE.Mesh(new THREE.TorusGeometry(0.3+k*0.28,0.012,4,20,Math.PI/2),MB(0xe8e8f0,{transparent:true,opacity:0.5}));w.position.set(x,y,z);w.rotation.y=x<0?0:Math.PI;w.rotation.z=y>12?-Math.PI/2:Math.PI;W.group.add(w);}
    for(let i=0;i<70;i++){const st=addMesh(new THREE.BoxGeometry(0.5,0.02,0.04),M(0xd8b04a),rand(-9.5,9.5),0.02,rand(-33,3));st.rotation.y=rand(0,3.14);st.castShadow=false;}
    // нити от прялки расходятся по всему овину
    W.barnThreads=[];const hub=new V3(7.2,6.5,-18);for(let i=0;i<16;i++){const to=i<7?new V3(9.7,2+i*1.3,-8-i*2.6):new V3(rand(-8,8),15.2,rand(-32,1));
      const m=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.018,1,4),MB(0xd8d8e4,{transparent:true,opacity:0.55}));m.position.copy(hub).add(to).multiplyScalar(0.5);m.scale.y=hub.distanceTo(to);
      m.quaternion.setFromUnitVectors(new V3(0,1,0),to.clone().sub(hub).normalize());W.group.add(m);W.barnThreads.push(m);}
    // пыль в лучах
    const n=140,pos=new Float32Array(n*3);for(let i=0;i<n;i++){pos[i*3]=rand(-9,9);pos[i*3+1]=rand(0.5,14);pos[i*3+2]=rand(-33,2);}
    const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(pos,3));const dust=new THREE.Points(dg,new THREE.PointsMaterial({color:0xfff0c8,size:0.06,transparent:true,opacity:0.7}));W.group.add(dust);W.barnDust=dust;
    // проём ворот
    for(const x of[-4.2,4.2])addMesh(new THREE.BoxGeometry(0.6,16,0.6),M(0x4a3218),x,8,3.8);
  }
  bell(3,2);bell(-8.6,-10,3.4);bell(-8.6,-31,7);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,0);
  /* ---------- прялка до крыши и Кикимора ---------- */
  const wheel=new THREE.Group();wheel.position.set(7.2,6.5,-18);wheel.rotation.y=Math.PI/2;W.group.add(wheel);
  {const wmat=M(0x8a5a32);const rim=new THREE.Mesh(new THREE.TorusGeometry(5,0.22,8,40),wmat);wheel.add(rim);for(let i=0;i<10;i++){const sp=new THREE.Mesh(new THREE.BoxGeometry(0.14,9.8,0.14),wmat);sp.rotation.z=i/10*Math.PI;wheel.add(sp);}
    wheel.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,0.8,12).rotateX(Math.PI/2),M(0x5a3a1a)));}
  const stand=W.group.children.length;for(const dz of[-1,1]){const l=addMesh(new THREE.BoxGeometry(0.4,7,0.4),M(0x5a3a1a),8.4,3.3,-18+dz*2.4);l.rotation.x=dz*0.3;}fadeable(since(stand));
  W.cyls.push({x:8.2,z:-18,r:1.6,miny:-1,maxy:12,on:true});
  const kiki=makeKikimora();kiki.g.position.set(4.3,0,-18);kiki.g.rotation.y=-Math.PI/2;W.cyls.push({x:4.3,z:-18,r:0.7,miny:-1,maxy:2.2,on:true});
  const yarn=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,1,5),MB(0xd8d8e4));W.group.add(yarn);
  const keyThread=new THREE.Group();W.group.add(keyThread);keyThread.visible=false;{const kt=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.015,1.2,5),MB(0x101010));kt.position.y=0.6;keyThread.add(kt);
    const key=new THREE.Group();key.position.y=-0.05;keyThread.add(key);part(key,new THREE.TorusGeometry(0.07,0.02,6,14),M(0x303030),0,0.06,0);part(key,new THREE.BoxGeometry(0.03,0.18,0.03),M(0x303030),0,-0.06,0);}
  const spMark=new THREE.Group();W.group.add(spMark);{const mr=new THREE.Mesh(new THREE.TorusGeometry(0.34,0.05,8,24),M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.9}));mr.rotation.y=Math.PI/2;spMark.add(mr);spMark.add(acornMesh(1.5));}
  spMark.visible=false;
  /* ---------- колышки: по два на стене, кольца — где встать держащим ---------- */
  const S0=[stake(-5.2,-11.9,0,{h:0.6}),stake(-5.2,-20.1,0,{h:0.6})];
  const R0=[holdRing(-1.8,0,-20.2,0),holdRing(-1.8,0,-11.8,1)];
  const S1=[stake(-9.6,-29.3,3.4,{h:0.6}),stake(-5.9,-29.3,3.4,{h:0.6})];
  const R1=[holdRing(-5.9,3.4,-25,0),holdRing(-9.6,3.4,-25,1)];
  const S2=[stake(-6,-33.7,7,{h:0.6}),stake(1,-33.7,7,{h:0.6})];
  const R2=[holdRing(1,7,-30.1,0),holdRing(-6,7,-30.1,1)];
  const rings=[R0,R1,R2];
  // подсказки контурами: кто встаёт в кольцо, куда летит клубок, кто прыгает с паутинки и куда
  const STK=[S0,S1,S2];const WEBC=[new V3(-3.5,0.26,-16),new V3(-7.75,3.66,-27.15),new V3(-2.5,7.26,-31.9)];const LAND=[new V3(-7.6,3.4,-16),new V3(-7.75,7,-31.6),null];
  const guides=rings.map((R,i)=>R.map(r=>{const st=STK[i][r.pi],kind=r.pi?(i===1?'yosha':'pelageya'):(i===1?'potap':'proshka');
    const face=Math.atan2(st.x-r.x,st.z-r.z);const gh=ghostOf(kind,r.x,r.y,r.z,face);
    const dots=[];const L=Math.hypot(st.x-r.x,st.z-r.z);for(let k=1;k<L;k+=0.8){const d=new THREE.Mesh(new THREE.SphereGeometry(0.07,6,5),MB(PCOL[r.pi],{transparent:true,opacity:0.8}));
      d.position.set(r.x+(st.x-r.x)*k/L,r.y+0.15,r.z+(st.z-r.z)*k/L);W.group.add(d);dots.push(d);}
    const arrow=new THREE.Mesh(new THREE.ConeGeometry(0.28,0.6,4),MB(PCOL[r.pi]));arrow.rotation.x=Math.PI;W.group.add(arrow);
    return {r,gh,dots,arrow,st,floor:i};}));
  const jumpG=[0,1].map(i=>{const c=WEBC[i],t=LAND[i];const g=new THREE.Group();W.group.add(g);
    for(let k=1;k<12;k++){const u=k/12,y=lerp(c.y,t.y,u)+Math.sin(u*Math.PI)*2.4;const d=new THREE.Mesh(new THREE.SphereGeometry(0.09,6,5),MB(0xfff2b0,{transparent:true,opacity:0.85}));d.position.set(lerp(c.x,t.x,u),y,lerp(c.z,t.z,u));g.add(d);}
    const land=new THREE.Mesh(new THREE.TorusGeometry(0.7,0.08,6,26),MB(0xfff2b0,{transparent:true,opacity:0.85}));land.rotation.x=Math.PI/2;land.position.set(t.x,t.y+0.05,t.z);g.add(land);
    const jg=[ghostOf(i?'yosha':'potap',c.x+0.5,c.y,c.z+0.4,Math.atan2(t.x-c.x,t.z-c.z)),ghostOf(i?'pelageya':'proshka',c.x-0.5,c.y,c.z-0.4,Math.atan2(t.x-c.x,t.z-c.z))];jg.forEach(q=>g.add(q));
    g.visible=false;return {g,c,t,jg};});
  linkItem(-4.4,3.2,-16);linkItem(-7.75,6.6,-28.4);const highLink=linkItem(-2.5,11.8,-31.9);W.linkTotal++;   // четвёртое отдаст Кикимора
  nutItem(8.5,0.6,-3);nutItem(-8.4,4.0,-8);nutItem(4,7.6,-33);nutItem(-9.3,4.0,-28.3);nutItem(8.8,1.0,-27,{owl:true});
  /* ---------- старая сказочная нить: видна только Совиным взором, рвётся ударом ---------- */
  const hook=new V3(-5.9,4.5,-9.5),wheelHub=new V3(7.2,6.5,-18);
  const old=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1,6),MB(0xdfe8ff,{transparent:true,opacity:0}));W.group.add(old);
  {const mid=hook.clone().add(wheelHub).multiplyScalar(0.5);old.position.copy(mid);old.scale.y=hook.distanceTo(wheelHub);old.quaternion.setFromUnitVectors(new V3(0,1,0),wheelHub.clone().sub(hook).normalize());}
  const hookM=addMesh(new THREE.TorusGeometry(0.22,0.05,6,16),M(0x8a8a90),hook.x,hook.y,hook.z);hookM.rotation.y=Math.PI/2;
  W.hittables.push({pos:new V3(hook.x+0.4,3.4,hook.z),r:1.2,alive:()=>W.owlT>0&&!F.cut,onHit:h=>{F.cut=true;SFX.rip();burst(hook.clone(),0xdfe8ff,16,4);old.visible=false;F.pullT=0;F.warn=false;
    banner('Старая нить перерезана — прочь!','#dfe8ff',2.2,'прялка струн наших больше не утянет');bark(kiki,'kiki','Пряди… пряди?.. Что за диво…',2);}});
  /* ---------- стычки и прялка ---------- */
  const inBarn=h=>h.pos.z<4.2&&h.pos.z>-34.4;
  const aFoes={started:false,list:[]},floorFoes={started:false,list:[]};
  F.pullT=0;F.warn=false;F.stumble=0;
  function tear(){let n=0;for(const t of W.threads.slice())if(t.string&&!t.sag&&t.sz>-34.4){n++;floatText(new V3(t.sx+t.dx*t.len/2,t.y+0.8,t.sz+t.dz*t.len/2),'Прялка нить утянула!','#d8d8e4');removeThread(t);}
    if(n){SFX.rip();tip(0,'Струну утянуло, клубок воротился — бросай опять!',2.2);tip(1,'Струну утянуло, клубок воротился — бросай опять!',2.2);}}
  W.marks.push({pos:new V3(4.0,1.2,-17.5),active:()=>F.warn&&!F.done&&!F.spFled,onHit:()=>{F.warn=false;F.pullT=0;F.stumble=3;SFX.latch();SFX.keys();banner('Колесо споткнулось!','#ffd9a0',1.6,'три секунды молчит — и снова полминуты кружится');}});
  // на чердаке веретено вырывается из рук Кикиморы и улетает в дверь — на повить (там оно станет Веретенником)
  const flySp=new THREE.Group();W.group.add(flySp);flySp.visible=false;{const inn=new THREE.Group();flySp.add(inn);veretenLook(inn);}
  function spindleFlees(){F.spFled=true;F.warn=false;const from=new V3();kiki.spindle.getWorldPosition(from);
    play({dur:7.4,fov:50,shots:[shot(0,[-1.5,9.6,-26],[3.6,2,-18]),shot(3.2,[1.2,9.2,-27.5],[-2.5,8.4,-34.2])],
      says:[[0.3,2.8,'kiki','<i>(во сне)</i> Пряди… Стой! Веретено, стой!'],[3.6,3.4,'zven','Веретено удрало на повить! Скорей за ним!']],
      events:[{t:0.4,fn:()=>{kiki.spindle.visible=false;yarn.visible=false;flySp.visible=true;SFX.whoosh();SFX.keys();const a=from.clone(),b=new V3(-2.5,8.6,-33.6),c=new V3(-2.5,8.6,-44);
          anim(5.6,k=>{const q=k<0.6?k/0.6:1,p=k<0.6?a.clone().lerp(b,smooth(q)):b.clone().lerp(c,(k-0.6)/0.4);p.y+=Math.sin(q*Math.PI)*3;flySp.position.copy(p);flySp.rotation.y+=0.4;flySp.rotation.z=0.6;flySp.scale.setScalar(0.25+0.35*k);if(k>=1)flySp.visible=false;});}}],
      end:()=>{flySp.visible=false;banner('Веретено удрало!','#e8d8b0',2,'в дверь на чердаке — на повить');}});}
  /* ================= 4. СУШИЛЬНЯ (z −34,4 … −52,4, пол 7): сторожевые нити и засов на двоих ================= */
  ground(-12,12,-52.4,-34.4,7,floorM,sideM);
  wall(-12.4,-12,3,17,-52.4,-34.4);wall(12,12.4,3,17,-52.4,-34.4);wall(-12.4,-10.4,3,17,-34.4,-34);wall(10.4,12.4,3,17,-34.4,-34);
  wall(-12.4,-2,3,17,-52.8,-52.4);wall(2,12.4,3,17,-52.8,-52.4);wall(-2,2,10.4,17,-52.8,-52.4);   // стена с дверью на повить
  {for(let i=0;i<10;i++){const x=-9+(i%5)*4.5,z=-36.4-Math.floor(i/5)*7-(i%2)*1.4;const s=new THREE.Mesh(new THREE.PlaneGeometry(2.4,2.2),M([0xf0e8d8,0xe8d8c0,0xd8c8e8,0xe8c8c0][i%4],{side:THREE.DoubleSide}));s.position.set(x,10.9,z);s.rotation.z=(i%3-1)*0.04;W.group.add(s);}
    for(const z of[-36.4,-37.8,-43.4,-44.8])addMesh(new THREE.BoxGeometry(24,0.04,0.04),M(0xd8d0b8),0,12,z);
    for(let i=0;i<6;i++){const sk=addMesh(new THREE.TorusGeometry(0.28,0.1,6,14),M([0xc0302a,0x3a6ad0,0xe0b020,0x3f8a45,0x9a4a6a][i%5]),i%2?11.85:-11.85,9+(i%3)*1.2,-37-i*2.6);sk.rotation.y=Math.PI/2;}
    for(let z=-36;z>-52;z-=5)for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.5,10,0.5),wd,s*11.7,12,z);}
  lantern(-11.2,-36,7);lantern(11.2,-44,7);lantern(-11.2,-50,7);
  // сторожевые нити поперёк пути: [z, [x0, x1, высота]]; низкие (0,32 м) — перепрыгнуть, высокие (1,05 м) — обойти в просвет (Йоша пролезает и под ними)
  const WIRES=[],bellM=M(0xd8b04a,{emissive:0x806000,emissiveIntensity:0.4});
  for(const[z,segs]of[[-37.6,[[-12,2.6,8.05],[5.4,12,8.05]]],[-40.6,[[-12,12,7.32]]],[-43.6,[[-12,-6.6,8.05],[-3.8,12,8.05]]],[-46.6,[[-12,0,7.32],[0,12,8.05]]]])
    for(const[x0,x1,y]of segs){const mat=MB(0xdfe8ff,{transparent:true,opacity:0,depthWrite:false});const m=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,x1-x0,5).rotateZ(Math.PI/2),mat);m.position.set((x0+x1)/2,y,z);W.group.add(m);
      for(const x of[x0,x1]){if(Math.abs(x)<11.9){addMesh(new THREE.CylinderGeometry(0.06,0.08,2.4,6),wd,x,8.2,z);W.cyls.push({x,z,r:0.12,miny:6,maxy:9.4,on:true});}
        const b=addMesh(new THREE.ConeGeometry(0.12,0.2,8),bellM,clamp(x,-11.8,11.8),y-0.12,z);b.castShadow=false;}
      WIRES.push({z,x0,x1,y,m,mat,cd:0,flash:0});}
  const dryFoes=[];
  function tripped(w,h){(F.trips=F.trips||[]).push(w.z+':'+h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(2)+','+h.pos.z.toFixed(1)+(h.following?'f':''));w.cd=4;w.flash=1.8;SFX.bell();SFX.dzin();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Дзынь! Задели нить!','#dfe8ff');shake(h.player,0.03,0.2);
    if(!F.wireTold){F.wireTold=true;for(const pi of[0,1])tip(pi,'Нить не видна! Пелагея — Совиный взор '+K(1,'skill')+'!',3);}
    if(dryFoes.filter(e=>e.alive).length<2)dryFoes.push(makeFoe('thread',clamp(h.pos.x,-10,10),w.z-2.6,{y:7,leash:7}));}
  nutItem(-10.6,7.6,-41.8);nutItem(10.4,7.6,-48.4,{owl:true});nutItem(1,8.9,-38.2);
  // засов: обе плиты у двери нажаты — засов поднят, дверь на повить открыта
  const plates=[-6,6].map((x,i)=>{const b=box(x-0.8,x+0.8,7,7.15,-50.6,-49,M(0x8a5a32),{occ:false});return {x,col:b.col,mesh:b.mesh,ring:goldRing(x,7.15,-49.8,0.75),gh:ghostOf(i?'pelageya':'potap',x,7.15,-49.8,Math.PI)};});
  W.noSplitFn=()=>!F.latch&&acts().every(h=>h.pos.z<-34.4&&h.pos.z>-53&&h.pos.y>6.5);   // плиты засова в 12 м друг от друга: в сушильне экран общий — обе плиты и дверь в кадре
  const gateCol=colBox(-2,2,7,10.4,-52.8,-52.4);const gate=new THREE.Group();gate.position.set(0,8.7,-52.6);W.group.add(gate);
  {addMesh(new THREE.BoxGeometry(4,3.4,0.2),M(0x5a3a1a),0,0,0,gate);for(let x=-1.6;x<1.7;x+=0.8)addMesh(new THREE.BoxGeometry(0.12,3.4,0.3),wd,x,0,0,gate);addMesh(new THREE.BoxGeometry(4.6,0.3,0.4),M(0x8a8a90),0,0.4,0.15,gate);}
  function gateTo(open){gateCol.on=!open;const y0=gate.position.y,y1=open?12.1:8.7;anim(0.9,k=>{gate.position.y=lerp(y0,y1,smooth(k));});SFX.gate();}
  /* ================= 5. ПОВИТЬ (z −52,4 … −74,4, пол 7): мини-босс Веретенник ================= */
  ground(-12,12,-74.4,-52.4,7,floorM,sideM);
  wall(-12.4,-12,3,17,-74.8,-52.4);wall(12,12.4,3,17,-74.8,-52.4);wall(-12.4,12.4,3,17,-74.8,-74.4);
  for(const[x,z]of[[-9,-56],[9,-56],[-9,-71],[9,-71]]){addMesh(new THREE.CylinderGeometry(0.5,0.55,10,10),wd,x,12,z);W.cyls.push({x,z,r:0.55,miny:6,maxy:17,on:true});}
  {for(let i=0;i<6;i++){const r=addMesh(new THREE.BoxGeometry(0.4,0.4,22),wd,-10+i*4,16.4,-63.4);r.castShadow=false;}
    for(let i=0;i<10;i++){const x=rand(-10,10),z=rand(-73,-54);addMesh(new THREE.CylinderGeometry(0.01,0.01,1.4,4),M(0x6a4a2a),x,16.1,z);const c=addMesh(new THREE.ConeGeometry(0.32,1.2,7),M([0xd8c08a,0xc8a868,0x4a2a5a][i%3]),x,14.9,z);c.rotation.x=Math.PI;}
    for(let i=0;i<9;i++){const a=i*0.7,h=addMesh(new THREE.SphereGeometry(rand(0.5,0.9),8,6),M([0x3a1a4a,0xd8c08a,0x5a3a6a][i%3]),(i%2?1:-1)*rand(9.5,11),7.2,rand(-73,-55));h.scale.y=0.6;h.rotation.y=a;}   // кудель кучами по стенам
    const heap=addMesh(new THREE.SphereGeometry(1.6,12,8),M(0x3a1a4a,{emissive:0x2a0a3a,emissiveIntensity:0.4}),0,6.6,-65);heap.scale.y=0.5;W.heap=heap;}
  lantern(-11.2,-54,7);lantern(11.2,-54,7);lantern(-11.2,-73,7);lantern(11.2,-73,7);
  // колышки крестом: из кольца у входа (±4; −60,5) клубок летит в колышек напротив (∓7; −70,5) — две струны скрещиваются посередине повити
  const ARS=[stake(-7,-57.5,7,{h:0.6}),stake(7,-57.5,7,{h:0.6}),stake(-7,-70.5,7,{h:0.6}),stake(7,-70.5,7,{h:0.6})];
  const AR_G=[[-4,-60.5,ARS[3]],[4,-60.5,ARS[2]]].map(([x,z,st],pi)=>{const r=holdRing(x,7,z,pi),dots=[];const L=Math.hypot(st.x-x,st.z-z);
    for(let k=1;k<L;k+=0.9){const d=new THREE.Mesh(new THREE.SphereGeometry(0.07,6,5),MB(PCOL[pi],{transparent:true,opacity:0.5}));d.position.set(x+(st.x-x)*k/L,7.15,z+(st.z-z)*k/L);W.group.add(d);dots.push(d);}
    r.g.visible=false;return {r,dots,st};});
  nutItem(-10.8,7.6,-73);nutItem(10.8,7.6,-73);
  const AC={x:0,z:-71};
  const B={phase:0,e:null,mode:'free',mt:0,atkCd:4,cocoon:true,catchEmb:6,dir:new V3(0,0,1),run:0,lastTr:0,tgt:null,cnt:0,decoyDone:false,decoys:[],adds:[],markPos:new V3(),dodged:null,told:{}};
  W.vb15=B;
  const arenaZ={x:AC.x,y:7,z:-63.4,r:10.5,camActive:()=>B.phase>=1&&B.phase<3};W.camZones.push(arenaZ);
  const pK=()=>({easy:0,mid:1,hard:2})[genPath()]||0;
  const TM=k=>[[1.6,1.25,0.95],[1.6,1.2,0.9],[4.2,3.4,2.8],[8,9.5,11]][k][pK()];   // замах рывка · замах дуги · оборот дуги · скорость рывка
  const inArena=h=>h.pos.z<-52.6&&h.pos.y>6;
  // рывок: красная дорожка на полу; дуга: белая низкая нить вокруг; липкий след
  const aimG=new THREE.PlaneGeometry(1.8,1);aimG.rotateX(-Math.PI/2);aimG.translate(0,0,0.5);const aimM=MB(COL.red,{transparent:true,opacity:0.5,depthWrite:false});
  const aim=new THREE.Mesh(aimG,aimM);aim.visible=false;W.group.add(aim);
  const arm=new THREE.Group();arm.visible=false;W.group.add(arm);const armM=MB(0xffffff,{transparent:true,opacity:0.9});
  {const c=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,8.4,6).rotateX(Math.PI/2).translate(0,0,4.6),armM);arm.add(c);const pg=new THREE.PlaneGeometry(0.9,8.4);pg.rotateX(-Math.PI/2);pg.translate(0,0,4.6);
    const gl=new THREE.Mesh(pg,MB(0xffffff,{transparent:true,opacity:0.3,depthWrite:false}));gl.position.y=-0.25;arm.add(gl);arm.userData.gl=gl;}
  const trailM=MB(0xe8dcc0,{transparent:true,opacity:0.7,depthWrite:false}),trailG=new THREE.CircleGeometry(0.8,16);trailG.rotateX(-Math.PI/2);
  const trails=[];for(let i=0;i<32;i++){const m=new THREE.Mesh(trailG,trailM.clone());m.visible=false;W.group.add(m);trails.push({m,t:0});}
  function addTrail(p){const s=trails.find(q=>q.t<=0)||trails[0];s.t=B.phase===2?6:5;s.m.position.set(p.x,7.03,p.z);s.m.visible=true;}
  function hideTele(){aim.visible=false;arm.visible=false;}
  // приманка: кто стоит за паутинкой (паутинка — на линии рывка), на того Веретенник и бросается
  const lured=e=>{for(const h of acts()){if(players[h.player].downed||!inArena(h))continue;const ax=h.pos.x-e.pos.x,az=h.pos.z-e.pos.z,L=Math.hypot(ax,az)||1;
    for(const w of W.webs){if(Math.abs(w.y-7)>1.2)continue;const u=((w.x-e.pos.x)*ax+(w.z-e.pos.z)*az)/L;if(u<1||u>L)continue;if(Math.hypot(w.x-(e.pos.x+ax/L*u),w.z-(e.pos.z+az/L*u))<2.2)return h;}}return null;};
  const nearestActive=e=>{let best=null,bd=1e9;for(const h of acts()){if(players[h.player].downed||!inArena(h))continue;const d=hd(h.pos,e.pos);if(d<bd){bd=d;best=h;}}return best;};
  function spawnBoss(){const e=makeFoe('vereten',AC.x,AC.z,{y:7,leash:40});B.e=e;e.noKill=true;e.face=0;
    e.guardAll=()=>e.state!=='broken'&&(B.cocoon||B.catchEmb-e.embers>=3);e.darkGuard=e.guardAll;e.guardText='Кокон! Ловите в паутинку!';
    e.onFinisher=h=>{if(B.phase===1)toPhase2();else if(B.phase===2)defeat();};
    e.tick=bossTick;e.post=bossPost;B.catchEmb=e.embers;return e;}
  function rewrap(e,txt){B.cocoon=true;B.catchEmb=e.embers;burst(e.pos.clone().add(new V3(0,2,0)),0x4a1a6a,14,3);if(txt)floatText(e.pos.clone().add(new V3(0,4.6,0)),txt,'#d8c8e8');}
  function ripStrings(){let n=0;for(const t of W.threads.slice())if(t.string&&!t.sag&&t.sz<-52.4){n++;removeThread(t);}if(n){SFX.rip();floatText(new V3(B.e.pos.x,8.4,B.e.pos.z),'Нити лопнули!','#d8d8e4');}}
  function startCharge(e,h){B.mode='aim';B.mt=0;B.tgt=h;B.dodged=new Set();SFX.red();aim.visible=true;}
  function startSweep(e){B.mode='sweepW';B.mt=0;const h=nearestActive(e);B.sa=h?Math.atan2(h.pos.x-e.pos.x,h.pos.z-e.pos.z)-1.2:0;arm.visible=true;arm.position.set(e.pos.x,7.32,e.pos.z);arm.rotation.y=B.sa;SFX.whoosh();
    if(!B.told.sweep){B.told.sweep=true;for(const pi of[0,1])tip(pi,'Белая нить метёт — прыгай '+K(pi,'jump')+'!',3);}}
  function caught(e){B.mode='caught';B.mt=0;B.cocoon=false;B.catchEmb=e.embers;e.dazeT=7;hideTele();SFX.brk();SFX.knot();shakeAll(0.05,0.25);
    burst(e.pos.clone().add(new V3(0,2,0)),0x4a1a6a,22,5);burst(e.pos.clone().add(new V3(0,2,0)),COL.gold,10,4);banner('Попался!','#fff2b0',1.4,'кокон слетел — бейте острие!');
    if(!B.told.caught){B.told.caught=true;for(const pi of[0,1])tip(pi,'Попался! Бей '+K(pi,'attack')+' — с паутинки сверху вдвое!',3.4);}}
  function endCatch(e,txt){e.dazeT=0;rewrap(e,txt);ripStrings();B.mode='free';B.atkCd=2.6;}
  function bonk(e){B.mode='free';B.atkCd=2.8;e.dazeT=1.8;hideTele();SFX.thud();shakeAll(0.04,0.2);floatText(e.pos.clone().add(new V3(0,4.6,0)),'Бух! Кокон держит','#d8c8e8');
    if(!B.told.bonk){B.told.bonk=true;for(const pi of[0,1])tip(pi,'Кокон не пробить! Встань за паутинкой — пусть влетит!',3.6);}}
  W.marks.push({pos:B.markPos,active:()=>B.mode==='aim'&&B.phase>=1&&B.phase<3&&!G.cine,onHit:()=>{const e=B.e;if(!e||B.mode!=='aim')return;B.mode='free';B.atkCd=3;e.dazeT=1.6;hideTele();
    SFX.latch();floatText(e.pos.clone().add(new V3(0,4.6,0)),'Споткнулся!','#ffd9a0');}});
  function bossTick(e,dt){if(G.cine||B.phase<1||B.phase===1.5||B.phase>=3)return;e.pos.y=7;e.baseY=7;e.pos.x=clamp(e.pos.x,-10.7,10.7);e.pos.z=clamp(e.pos.z,-73.2,-53.9);   // не за стенами повити
    if(e.state==='broken'){if(B.mode!=='free'){B.mode='free';hideTele();}B.cocoon=false;return;}
    if(e.state==='hide')return;
    const tp=new V3();e.L.tip.getWorldPosition(tp);B.markPos.copy(tp);
    if(B.mode==='free'){if(!B.cocoon&&!(e.dazeT>0))rewrap(e,'Опять закутался!');
      if(e.state==='idle'||e.state==='recover'&&!(e.dazeT>0)){B.atkCd-=dt;
        if(B.atkCd<=0&&e.state==='idle'){const lh=lured(e),h=lh||nearestActive(e);if(h){B.cnt++;if(lh&&B.cnt%3===0)B.cnt++;   // приманка — сразу рывок
          if(B.phase===2&&!B.decoyDone&&B.cnt>=2)startDecoy(e);else if(B.cnt%3===0)startSweep(e);else startCharge(e,h);}else B.atkCd=1;}}
      return;}
    e.cd=Math.max(e.cd,0.8);e.spMul=0;B.mt+=dt;
    if(B.mode==='aim'){const h=B.tgt,T=TM(0),lock=B.mt>T*0.65;
      if(!lock&&h&&!players[h.player].downed){const dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz)||1;B.dir.set(dx/d,0,dz/d);}
      e.face=Math.atan2(B.dir.x,B.dir.z);aim.position.set(e.pos.x,7.05,e.pos.z);aim.rotation.y=e.face;aim.scale.z=16;aimM.opacity=lock?0.75:0.3+0.25*Math.abs(Math.sin(G.time*10));
      if(B.mt>=T){B.mode='run';B.mt=0;B.run=0;B.lastTr=0;aim.visible=false;SFX.whoosh()}return;}
    if(B.mode==='run'){const step=TM(3)*dt,nx=e.pos.x+B.dir.x*step,nz=e.pos.z+B.dir.z*step;const r=collideXZ(nx,nz,e.r,7,9.5,true);const mv=Math.hypot(r.x-e.pos.x,r.z-e.pos.z);
      e.pos.x=r.x;e.pos.z=r.z;B.run+=mv;if(B.run-B.lastTr>0.9){B.lastTr=B.run;addTrail(e.pos);}
      for(const w of W.webs)if(Math.abs(w.y-7)<1.2&&Math.hypot(w.x-e.pos.x,w.z-e.pos.z)<2.6){caught(e);return;}
      for(const h of HEROES){if(!h.active||players[h.player].downed||h.cling)continue;if(hd(h.pos,e.pos)>e.r+h.d.radius+0.25||Math.abs(h.pos.y-7)>1.6)continue;
        if(h.rollT>0||G.time-(h.lastRoll||-9)<0.45){if(!B.dodged.has(h)){B.dodged.add(h);floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Увернулся!','#ffd76a');}continue;}
        damageHero(h,{kind:'enemy',ref:e});}
      if(r.hit&&mv<step*0.6){bonk(e);return;}
      if(B.run>18){B.mode='free';B.atkCd=2.4;e.dazeT=0.9;}return;}
    if(B.mode==='sweepW'){const T=TM(1);arm.position.set(e.pos.x,7.32,e.pos.z);armM.opacity=0.45+0.45*Math.abs(Math.sin(G.time*12));arm.userData.gl.material.opacity=0.15+0.25*Math.abs(Math.sin(G.time*12));
      if(B.mt>=T){B.mode='sweep';B.mt=0;}return;}
    if(B.mode==='sweep'){const T=TM(2),a=B.sa+Math.PI*2*Math.min(1,B.mt/T);arm.rotation.y=a;armM.opacity=0.95;arm.userData.gl.material.opacity=0.35;e.face=a;
      for(const h of HEROES){if(!h.active||players[h.player].downed||h.cling)continue;const dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz);if(d<1||d>9.2||h.pos.y>7.5)continue;
        let da=Math.atan2(dx,dz)-a;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;if(Math.abs(da)<0.16)damageHero(h,{kind:'hazard',ref:e});}
      if(B.mt>=T){B.mode='free';B.atkCd=2.4;arm.visible=false;}return;}
    if(B.mode==='caught'){e.dazeT=Math.max(e.dazeT,0.2);if(B.mt>7)endCatch(e,'Очухался!');else if(B.catchEmb-e.embers>=3)endCatch(e,'Очухался!');return;}
    if(B.mode==='decoy'){return;}}
  function bossPost(e,dt){const L=e.L;L.cocoon.visible=B.cocoon;L.tipM.emissive.setHex(B.cocoon?0x000000:COL.gold);L.tipM.emissiveIntensity=B.cocoon?0:0.8+0.4*Math.sin(G.time*8);
    if(B.mode==='aim')e.inner.rotation.y+=(dt||0.016)*(8+18*Math.min(1,B.mt/TM(0)));else if(B.mode==='run')e.inner.rotation.y+=(dt||0.016)*30;else if(B.mode==='sweep'||B.mode==='sweepW')e.inner.rotation.y+=(dt||0.016)*6;
    else{const r=e.inner.rotation.y%(Math.PI*2),to=r>Math.PI?Math.PI*2:0;e.inner.rotation.y=damp(r,to,e.dazeT>0?1.5:5,dt||0.016);}L.whorl.rotation.y+=(dt||0.016)*3;}   // в покое — лицом к героям
  // этап 2: три веретена — настоящее видно Совиным взором (золотое кольцо), по пустому ударишь — рассыплется куделью
  function startDecoy(e){B.decoyDone=true;B.mode='decoy';B.mt=0;hideTele();e.state='hide';e.hideUntil=0;e.g.visible=false;const real=Math.floor(Math.random()*3);B.decoyA=0;SFX.whoosh();SFX.keys();
    burst(e.pos.clone().add(new V3(0,2,0)),0xe8dcc0,24,5);banner('Три веретена!','#e8d8b0',2,'настоящее видно Совиным взором');
    for(const pi of[0,1])tip(pi,pi?'Три веретена! Совиный взор '+K(1,'skill')+' — где золото?':'Три веретена! Пелагея увидит настоящее.',3.4);
    for(let i=0;i<3;i++){const g=new THREE.Group();W.group.add(g);const inn=new THREE.Group();g.add(inn);const L=veretenLook(inn);
      const em=M(0xfff3a0,{emissive:0xfff3a0,emissiveIntensity:1});for(const sd of[-1,1])part(inn,new THREE.SphereGeometry(0.1,10,8),em,sd*0.16,L.eyeY,L.eyeZ);
      const ring=new THREE.Mesh(new THREE.TorusGeometry(1.4,0.1,6,28),MB(COL.gold,{transparent:true,opacity:0.9}));ring.rotation.x=Math.PI/2;ring.position.y=0.1;ring.visible=false;g.add(ring);
      const d={g,inn,L,ring,real:i===real,alive:true,i};B.decoys.push(d);
      W.hittables.push({pos:g.position,r:1.2,alive:()=>d.alive&&B.mode==='decoy'&&!G.cine,onHit:h=>hitDecoy(d,h)});}}
  function hitDecoy(d,h){if(!d.alive)return;if(d.real){revealBoss(d.g.position.clone(),'Нашли!');return;}
    d.alive=false;burst(d.g.position.clone().add(new V3(0,2,0)),0xe8dcc0,20,4);SFX.unravel();floatText(d.g.position.clone().add(new V3(0,4,0)),'Пусто! Одна кудель','#e8dcc0');W.group.remove(d.g);
    tip(h.player,h.player?'Пустое! Совиный взор '+K(1,'skill')+' — где золото?':'Пустое! Пелагея увидит настоящее.',2.6);
    if(!B.decoys.some(q=>q.alive&&!q.real)){const r=B.decoys.find(q=>q.real);revealBoss(r.g.position.clone(),'Вот ты где!');}}
  function revealBoss(p,txt){const e=B.e;for(const d of B.decoys){if(d.alive&&!d.real)burst(d.g.position.clone().add(new V3(0,2,0)),0xe8dcc0,14,3);d.alive=false;W.group.remove(d.g);}B.decoys.length=0;
    e.pos.set(p.x,7,p.z);e.g.visible=true;e.state='idle';e.t=0;e.hideUntil=null;e.dazeT=2.6;B.mode='free';B.atkCd=3.2;SFX.ok();banner(txt,'#ffd76a',1.4,'вот настоящее веретено');summonAdds();}
  function summonAdds(){B.adds=B.adds.filter(a=>a.alive);for(const x of[-7,7]){if(B.adds.length>=2)break;B.adds.push(makeFoe('thread',x,-60,{y:7,leash:9}));}}
  function toPhase2(){const e=B.e;B.phase=1.5;B.mode='free';hideTele();const at=e.pos.clone();
    play({dur:8,fov:48,shots:[shot(0,[at.x+4.5,10.6,at.z+7],[at.x,8.6,at.z]),shot(3.6,[at.x-5,9.6,at.z+6],[at.x,8.8,at.z])],
      says:[[0.3,3.0,'vereten','Ой-ой! Пряду-кручу — не дамся!'],[3.6,4.0,'kiki','<i>(издалека)</i> Детки… веретено моё… троиться станет — глядите зорче!']],
      events:[{t:0.2,fn:()=>{anim(3,k=>{e.inner.rotation.y+=0.5;e.g.position.y=7+Math.sin(k*Math.PI)*0.8;});SFX.whoosh();}},{t:3.4,fn:()=>{e.g.position.y=7;rewrap(e);}}],
      end:()=>{B.phase=2;e.state='idle';e.t=0;e.finT=0;e.embers=e.maxEmb=6;rewrap(e);B.cnt=0;B.atkCd=2.5;summonAdds();banner('Веретенник · этап 2','#e8d8b0',2,'мороки в помощь — и троиться станет');}});}
  function defeat(){const e=B.e;B.phase=3;F.done=true;F.bossWon=true;hideTele();for(const a of B.adds)if(a.alive)unravel(a);for(const t of trails){t.t=0;t.m.visible=false;}
    e.alive=false;e.state='dying';e.t=0;finale(e.pos.clone(),e);}
  function introBoss(){B.phase=0.5;
    play({dur:9.6,fov:48,shots:[shot(0,[0,11,-54],[0,7.6,-64.6],[0,9.4,-57.5],[0,8.2,-64.6],4),shot(5.2,[3.6,9,-59.5],[0,9,-64.6])],
      says:[[0.4,3.2,'zven','Веретено ожило! Это Веретенник!'],[3.9,2.8,'vereten','Пряду-кручу — всех опутаю!'],[6.9,2.6,'zven','Ловите его в паутинку!']],
      events:[{t:0,fn:()=>{gateTo(false);for(const pi of[0,1])players[pi].cp.set(-4.2,7,-55.2);let k=0;for(const q of HEROES){if(q.pos.z<-53.4&&q.pos.y>6)continue;placeOnGround(q,[-1.5,1.5,-3,3][k%4],-55.4,7);q.following=true;k++;}}},
        {t:1.2,fn:()=>{const e=spawnBoss();SFX.keys();shakeAll(0.04,0.4);if(W.heap)anim(1.2,k=>{W.heap.scale.set(1-k,0.5*(1-k)+0.01,1-k);});}}],
      end:()=>{B.phase=1;B.atkCd=3;if(W.heap)W.heap.visible=false;banner('Веретенник!','#e8d8b0',2.4,'кокон не пробить — поймайте в паутинку');
        for(const pi of[0,1])tip(pi,'Встань в своё кольцо — клубок '+K(pi,'item')+' в колышек напротив!',4.4);}});}
  // следующий этап (как у боссов, Ctrl+Alt+B; им же пользуется бот-аудитор tfin_bossaudit): этап 1 → этап 2 → победа
  W.bossNext=()=>{if(G.cine||F.bossWon||!B.e||B.phase<1||B.phase===1.5)return false;hideTele();for(const d of B.decoys){if(d.alive)W.group.remove(d.g);d.alive=false;}B.decoys.length=0;
    B.e.g.visible=true;if(B.e.state==='hide'){B.e.state='idle';B.e.hideUntil=null;}if(B.phase===1)toPhase2();else defeat();return true;};
  const bb=$('bossbar');let bbOn=false;
  function bossBar(){const ph=B.phase;if(!bb)return;
    if(!G.cine&&ph>=1&&ph<3){const st=ph<2?1:2,h='<b>Веретенник</b> · этап '+st+' / 2 · '+(st===1?'поймать в паутинку':'найти настоящее');if(bb.innerHTML!==h)bb.innerHTML=h;bb.style.display='block';bbOn=true;}
    else if(bbOn){bb.style.display='none';bbOn=false;}}
  {const _ol=W.onLeave;W.onLeave=()=>{if(bb)bb.style.display='none';bbOn=false;if(_ol)_ol();};}
  /* ================= ход уровня ================= */
  W.updates.push(dt=>{
    // мотовило-противовес
    {const w=PL.map(weightOn);let T=[LIFT.rest,LIFT.rest];
      if(LIFT.wind>=0){LIFT.windT-=dt;const wi=LIFT.wind;if(w[wi]===0&&PL[wi].y>LIFT.top-0.05||LIFT.windT<=0)LIFT.wind=-1;else{T[wi]=LIFT.top;T[1-wi]=LIFT.low;}}
      // обе заняты — тяжелей вниз, легче вверх (поровну — стоят); занята одна — она опускается, пустая держится на храповике; пусто — в покой
      if(LIFT.wind<0){if(w[0]>0&&w[1]>0)T=w[0]>w[1]?[LIFT.low,LIFT.top]:w[1]>w[0]?[LIFT.top,LIFT.low]:[PL[0].y,PL[1].y];else if(w[0]>0)T=[LIFT.low,PL[1].y];else if(w[1]>0)T=[PL[0].y,LIFT.low];}
      if(w[0]>0&&w[0]===w[1]&&LIFT.wind<0&&!LIFT.told.eq){LIFT.told.eq=true;for(const pi of[0,1])tip(pi,'Поровну — стоят! Потап тяжелее: пусть встанет он.',3);}
      PL.forEach((P,i)=>{const ny=P.y+clamp(T[i]-P.y,-1.7*dt,1.7*dt),dy=ny-P.y;if(Math.abs(dy)<1e-5)return;P.y=ny;P.col.miny=ny-0.3;P.col.maxy=ny;P.g.position.y=ny;P.ring.position.y=ny+0.04;
        for(const h of HEROES)if(h.groundRef===P.col)h.pos.y+=dy;P.g.children.forEach(c=>{if(c.userData.rope){c.scale.y=10-ny;c.position.y=(10-ny)/2;}});});
      pulley.forEach((p,i)=>{p.rotation.z+=(PL[i].y-(p.userData.y||PL[i].y))*2;p.userData.y=PL[i].y;});
      reel.userData.spin.rotation.x+=dt*(LIFT.wind>=0&&PL[LIFT.wind].y<LIFT.top-0.05?6:0.2);
      const liftOn=!F.liftDone;PL.forEach(P=>{P.ring.visible=liftOn&&weightOn(P)===0;P.ring.rotation.y+=dt;});reelRing.visible=liftOn&&PL.some(P=>P.y<1&&weightOn(P)>0)&&acts().some(h=>h.pos.y>4.1&&h.pos.z>28.4);
      if(!F.liftDone&&acts().every(h=>(h.pos.z<31.4&&h.pos.y>4.1)||h.pos.z<28.4))F.liftDone=true;}
    // ткацкий стан: подножка нажата — зев открыт
    {const pressed=HEROES.some(h=>h.groundRef===treadleCol);LOOM.open=pressed&&!F.loomDone;LOOM.busy=Math.max(0,LOOM.busy-dt);
      treadle.mesh.position.y=pressed?4.42:4.5;warp.forEach((m,i)=>{const up=LOOM.open&&i%2===0;m.position.y=damp(m.position.y,up?5.05:4.45,10,dt);});
      const on=!F.loomDone;treadleRing.visible=on&&!pressed;spotRing.visible=on;[treadleRing,spotRing].forEach(r=>{r.rotation.y+=dt;r.userData.m.opacity=0.55+0.35*Math.sin(G.time*5);});
      loomGh[0].visible=on&&!pressed;loomGh[1].visible=on&&!HEROES.some(h=>hd(h.pos,spotRing.position)<1.1&&Math.abs(h.pos.y-4.4)<0.8);}
    // прялка: каждые 28 с разгоняется, 6 с струны мигают — потом утягивает; жёлудь в веретено — пауза
    if(!F.pullOn&&HEROES.some(h=>inBarn(h)&&h.pos.y>2.9)){F.pullOn=true;F.pullT=0;later(0.5,()=>bark(kiki,'kiki','<i>(замечает вас)</i> Пряди. Пряди! Прочь от прялки!',2));}   // на середине Кикимора замечает нас
    const going=F.stage==='play'&&F.pullOn&&!F.cut&&!G.cine&&!F.done&&!F.spFled;F.stumble=Math.max(0,F.stumble-dt);
    if(going&&F.stumble<=0){F.pullT+=dt;if(F.pullT>28&&!F.warn){F.warn=true;SFX.keys();banner('Прялка нити тянет-вьёт!','#d8d8e4',2,'струны мигают — в веретено из рогатки! Иль Совиным взором старую нить найди');say('kiki','Пряди. Пряди. День и ночь.',2);}
      if(F.pullT>34){F.warn=false;F.pullT=0;tear();}}
    W.blink=F.warn;spMark.visible=F.warn;
    wheel.rotation.x-=dt*(F.stumble>0?0:F.warn?5:F.done?0:0.8);kiki.body.rotation.y=Math.sin(G.time*(F.warn?9:3))*0.12;kiki.spindle.rotation.y+=dt*(F.warn?20:F.done?0:6);
    const sp=new V3();kiki.spindle.getWorldPosition(sp);spMark.position.copy(sp).add(new V3(0,0.15,0.15));
    if(!F.done&&!F.spFled){const top=new V3(7.2,6.5+Math.sin(G.time*0.8+wheel.rotation.x)*4.6,-18+Math.cos(wheel.rotation.x)*4.6),mid=top.clone().add(sp).multiplyScalar(0.5);yarn.visible=true;yarn.position.copy(mid);yarn.scale.y=top.distanceTo(sp);yarn.quaternion.setFromUnitVectors(new V3(0,1,0),top.clone().sub(sp).normalize());}
    else yarn.visible=false;
    old.material.opacity=F.cut?0:Math.min(1,W.owlT/0.4)*0.9;
    if(!F.spFled&&!G.cine&&F.stage==='play'&&acts().every(h=>inBarn(h)&&h.grounded&&h.pos.y>6.4))spindleFlees();   // оба на чердаке — веретено удирает
    // кольца, контуры и дуги прыжка — для того этажа овина, где сейчас игроки
    const tierOf=h=>!inBarn(h)?-1:h.pos.y>6.4?2:h.pos.y>2.9?1:0;
    const fl=[0,1].map(pi=>tierOf(active(pi)));
    const hasStr=(pi,i)=>W.threads.some(t=>t.string&&!t.sag&&t.owner===pi&&t.stake===STK[i][pi]);
    guides.forEach((G2,i)=>G2.forEach(q=>{const pi=q.r.pi,on=fl[pi]===i&&!hasStr(pi,i);q.r.g.visible=on;q.r.g.rotation.y+=dt;q.r.m.opacity=0.55+0.35*Math.sin(G.time*5);
      const inR=on&&hd(active(pi).pos,q.r)<0.9&&Math.abs(active(pi).pos.y-q.r.y)<0.8;q.gh.visible=on&&!inR;q.gh.position.y=q.r.y+Math.abs(Math.sin(G.time*2+pi))*0.1;
      q.dots.forEach((d,k)=>{d.visible=on;d.material.opacity=inR?0.9:0.35;d.scale.setScalar(1+0.4*Math.sin(G.time*6-k*0.6));});
      q.arrow.visible=on&&!inR;q.arrow.position.set(q.r.x,q.r.y+2.6+Math.sin(G.time*4+pi)*0.2,q.r.z);q.arrow.material.color.setHex(PCOL[pi]);}));
    jumpG.forEach((J,i)=>{const web=W.webs.some(w=>Math.hypot(w.x-J.c.x,w.z-J.c.z)<1.5&&Math.abs(w.y-J.c.y)<0.8);const need=[0,1].some(pi=>fl[pi]===i||players[pi].heroes.some(h=>tierOf(h)===i));
      J.g.visible=web&&need;J.g.children.forEach((d,k)=>{if(d.isMesh&&d.geometry.type==='SphereGeometry')d.scale.setScalar(1+0.5*Math.sin(G.time*7-k*0.5));});J.jg.forEach((q,k)=>{q.position.y=J.c.y+0.2+Math.abs(Math.sin(G.time*3+k*1.5))*0.8;});});
    if(W.barnDust){const a=W.barnDust.geometry.attributes.position;for(let i=0;i<a.count;i+=7){a.array[i*3+1]+=Math.sin(G.time+i)*0.004;}a.needsUpdate=true;W.barnDust.rotation.y=Math.sin(G.time*0.05)*0.05;}
    if(W.barnFire)W.barnFire.intensity=1.1+0.25*Math.sin(G.time*13)*Math.sin(G.time*7);
    W.barnThreads.forEach((m,i)=>{m.material.opacity=F.warn?(Math.sin(G.time*20+i)>0?0.95:0.2):0.45+0.1*Math.sin(G.time*2+i);});
    // мороки: кикиморки в сенях, нитяные — на полу овина
    if(!aFoes.started&&F.stage==='play'){aFoes.started=true;aFoes.list=[makeFoe('kiki',-4,40,{leash:8}),makeFoe('kiki',4.5,38.5,{leash:8})];banner('Кикиморки-прядильщицы!','#c8e0a8',2,'жёлтый кружок — щит, потом бей');}
    if(!floorFoes.started&&F.stage==='play'&&acts().some(h=>h.pos.z<3)){floorFoes.started=true;floorFoes.list=[makeFoe('thread',2.5,-24,{leash:9}),makeFoe('thread',-2,-26,{leash:9})];banner('Нитяные мороки!','#d8d8e4',2,'синяя капля — щитом закройся, а в последний миг — отбей назад');}
    // ширина камеры по залу
    {const mz=acts().reduce((s,h)=>s+h.pos.z,0)/acts().length;W.camX=mz<4.2&&mz>-34.2?8.5:10.2;}
    // сушильня: сторожевые нити — видны Совиным взором, мерцают вблизи и после «дзынь»
    for(const w of WIRES){w.cd=Math.max(0,w.cd-dt);w.flash=Math.max(0,w.flash-dt);const near=acts().some(h=>Math.abs(h.pos.z-w.z)<1.4&&h.pos.y>6.5&&h.pos.x>w.x0-0.5&&h.pos.x<w.x1+0.5);
      w.mat.opacity=Math.max(W.owlT>0?Math.min(1,W.owlT/0.4)*0.95:0,w.flash>0?0.9:0,near?0.14+0.08*Math.sin(G.time*9):0);
      if(w.cd>0||G.cine)continue;
      for(const h of acts()){if(players[h.player].downed||h.cling||h._wz===undefined||Math.abs(h._wz-h.pos.z)>2)continue;if((h._wz-w.z)*(h.pos.z-w.z)>0||h.pos.x<w.x0||h.pos.x>w.x1)continue;if(w.y<h.pos.y-0.02||w.y>h.pos.y+heroHeight(h))continue;tripped(w,h);break;}}   // задел — пересёк линию нити на её высоте
    for(const h of HEROES)h._wz=h.pos.z;
    // засов на двоих
    {const pr=plates.map(p=>HEROES.some(h=>h.groundRef===p.col));plates.forEach((p,i)=>{p.mesh.position.y=pr[i]?7.03:7.075;p.ring.visible=!F.latch&&!pr[i];p.gh.visible=!F.latch&&!pr[i];p.ring.rotation.y+=dt;p.ring.userData.m.opacity=0.55+0.35*Math.sin(G.time*5);});
      if(!F.latch&&pr[0]&&pr[1]){F.latch=true;SFX.latch();gateTo(true);banner('Засов открыт!','#ffd76a',1.8,'на повить — за веретеном');}
      if(!F.latch&&(pr[0]||pr[1])&&!F.plateTold){F.plateTold=true;for(const pi of[0,1])tip(pi,'Одна плита нажата. Нужны обе — вдвоём!',3);}}
    // повить: Веретенник
    if(B.phase===0&&F.latch&&!G.cine&&acts().every(h=>h.pos.z<-53.4&&h.pos.y>6.5&&!players[h.player].downed))introBoss();
    bossBar();
    {const need=B.phase>=1&&B.phase<3&&B.cocoon&&B.mode!=='decoy'&&!W.webs.some(w=>w.y>6);AR_G.forEach((q,pi)=>{const on=need&&!W.threads.some(t=>t.owner===pi&&t.string&&!t.sag&&t.sz<-52.4);
      q.r.g.visible=on;q.r.g.rotation.y+=dt;q.r.m.opacity=0.55+0.35*Math.sin(G.time*5);q.dots.forEach((d,k)=>{d.visible=on;d.scale.setScalar(1+0.4*Math.sin(G.time*6-k*0.6));});});}
    for(const t of trails){if(t.t<=0)continue;t.t-=dt;t.m.material.opacity=Math.min(0.7,t.t*0.7);if(t.t<=0)t.m.visible=false;}
    for(const h of acts()){if(!h.grounded||h.pos.y>7.4||!inArena(h))continue;if(trails.some(t=>t.t>0&&Math.hypot(t.m.position.x-h.pos.x,t.m.position.z-h.pos.z)<0.85)){h.pos.x-=h.vel.x*dt*0.55;h.pos.z-=h.vel.z*dt*0.55;
      if(!B.told.trail){B.told.trail=true;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Липко! Обойди кудель','#e8dcc0');}}}
    if(B.mode==='decoy'&&B.phase===2){B.mt+=dt;B.decoyA+=dt*0.35;for(const d of B.decoys){if(!d.alive)continue;const a=B.decoyA+d.i*Math.PI*2/3;d.g.position.set(Math.sin(a)*5.5,7,-63.4+Math.cos(a)*5.5);   // хоровод — посреди повити
        d.inn.rotation.y+=dt*2;d.g.position.y=7+Math.abs(Math.sin(G.time*2+d.i))*0.15;d.ring.visible=d.real&&W.owlT>0;d.ring.rotation.z+=dt;}
      if(B.mt>35){const r=B.decoys.find(q=>q.real);if(r)revealBoss(r.g.position.clone(),'Вот ты где!');}}
    if(B.phase===2&&B.mode!=='decoy'&&B.adds.length&&B.adds.every(a=>!a.alive)&&!B.addT)B.addT=G.time;
    if(B.addT&&G.time-B.addT>30&&B.phase===2){B.addT=0;summonAdds();}});
  W.onWeb=h=>{if(!F.webTold){F.webTold=true;bark(h,h.kind,h.kind==='potap'?'Как Илья Муромец… на батуте, ей-ей!':'Уи-и-и!',1.8);}
    // паутинка в овине подбрасывает прямо на следующий этаж; на повити — прямо вверх, чтобы ударить сверху
    if(!inBarn(h))return;const i=h.pos.y<2?0:h.pos.y<6?1:-1;if(i<0)return;const t=LAND[i],vy=h.vel.y,dy=t.y-h.pos.y,disc=vy*vy-2*GRAV*dy;if(disc<=0)return;const ft=(vy+Math.sqrt(disc))/GRAV;
    const tx=t.x+rand(-0.4,0.4),tz=t.z+rand(-0.4,0.4);h.vel.x=(tx-h.pos.x)/ft;h.vel.z=(tz-h.pos.z)/ft;h.aimT=ft+0.05;h.following=false;};
  W.onString=t=>{if(t.sz<-52.4)return;const ss=W.threads.filter(q=>q.string&&!q.sag);   // на повити — свои кольца-подсказки
    if(ss.length===1&&!F.crossTold){F.crossTold=true;tip(1-t.owner,'Струна друга уж висит. Брось свою поперёк —<br>Где скрестятся — паутинка-батут, скок!',3);}};
  {const prev=W.onOwl;W.onOwl=h=>{if(prev)prev(h);if(B.mode==='decoy'){const r=B.decoys.find(q=>q.real&&q.alive);if(r)floatText(r.g.position.clone().add(new V3(0,4.4,0)),'Вот оно — настоящее!','#ffd76a');}};}
  function finale(at,e){const T=HERO,pr=T.proshka;if(players[0].act!==0)doSwap(0);const kx=clamp(at.x+2.6,-9,9),kz=clamp(at.z+2.2,-72,-56);
    play({dur:20,fov:48,shots:[shot(0,[at.x+3,10.4,at.z+7],[at.x,8,at.z]),shot(3.6,[at.x-3,9.2,at.z+5],[at.x,7.4,at.z]),shot(8.2,[kx-2.6,9.4,kz+3.8],[kx,8.4,kz]),shot(13.6,[kx-1.8,9.2,kz+3.2],[kx,8.6,kz])],
      says:[[0.4,3.0,null,'<i>Веретенник рассыпается куделью — веретёнце падает на пол.</i>',true],[3.6,4.4,null,'<i>Из веретена выскальзывает чёрная нитка с маленьким ключом и, звеня, утягивается в щель.</i>',true],
        [8.4,3.2,'kiki','<i>(своим, ворчливым голосом)</i> Ишь, ключник… Всю ночь меня гонял.'],[13.6,4.4,'kiki','Веретено отняли — ладно. Должна буду. Кикиморы долги помнят.']],
      events:[{t:0.2,fn:()=>{SFX.unravel();burst(at.clone().add(new V3(0,2,0)),0x4a1a6a,26,6);burst(at.clone().add(new V3(0,2,0)),0xe8dcc0,20,5);
          if(e&&e.g){const g=e.g;anim(1.2,k=>{g.scale.setScalar(Math.max(0.12,1-k*0.88));g.rotation.z=k*1.4;g.position.y=7+(1-k)*0.6;});}gateTo(true);}},
        {t:3.6,fn:()=>{keyThread.visible=true;keyThread.position.set(at.x,7.1,at.z);SFX.keys();anim(3.4,k=>{keyThread.position.set(lerp(at.x,11.8,k*k),7.1,lerp(at.z,-73.8,k*k));keyThread.scale.setScalar(1-k*0.6);if(k>=1)keyThread.visible=false;});}},
        {t:7.8,fn:()=>{if(e&&e.g){W.group.remove(e.g);const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);}kiki.g.position.set(kx,7,kz);kiki.g.rotation.y=Math.atan2(at.x-kx,at.z-kz);kiki.spindle.visible=true;
          HEROES.forEach((q,i)=>{placeOnGround(q,clamp(kx-2.2+i*1.1,-11,11),kz+2.6+(i%2)*0.8,7);q.face=Math.atan2(kx-q.pos.x,kz-q.pos.z);});}},
        {t:8.2,fn:()=>{kiki.head.rotation.x=0.3;anim(1,k=>{kiki.head.rotation.z=Math.sin(k*Math.PI*3)*0.2;});}},
        {t:16,fn:()=>{const it=linkItem(kx,9.2,kz);W.linkTotal--;const from=new V3(kx,9.2,kz),to=pr.pos.clone().add(new V3(0,1.2,0));anim(1.2,k=>{it.base=9.2;it.pos.lerpVectors(from,to,smooth(k));if(k>=1)takeItem(it,pr);});}}],
      end:()=>{kiki.head.rotation.x=0;later(1.2,()=>{F.out=true;finishLevel();});}});}
  /* ---------- рисунки кнопок и задачи ---------- */
  const hasStr0=(pi,i)=>W.threads.some(t=>t.string&&!t.sag&&t.owner===pi&&t.stake===STK[i][pi]);
  const T=HERO,onFloor=(h,i)=>inBarn(h)&&(i===2?h.pos.y>6.4:i===1?h.pos.y>2.9&&h.pos.y<6.4:h.pos.y<2.9);
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>rings.some((R,i)=>onFloor(h(),i)&&hd(h().pos,R[pi])<0.9&&!hasStr0(pi,i)),'в колышек');
    prompt(pi,'item',()=>headOf(h()),()=>!F.loomDone&&LOOM.open&&hd(h().pos,spotRing.position)<1.1&&Math.abs(h().pos.y-4.4)<0.8,'в зев');
    prompt(pi,'item',()=>headOf(h()),()=>!F.liftDone&&h().pos.y>4.1&&h().pos.z>28.4&&hd(h().pos,reel.position)<2.4&&PL.some(P=>P.y<1&&weightOn(P)>0),'на мотовило');
    prompt(pi,'item',()=>headOf(h()),()=>AR_G[pi].r.g.visible&&hd(h().pos,AR_G[pi].r)<1.1,'в колышек');
    prompt(pi,'move',()=>{const g=guides.map(G2=>G2[pi]).find(q=>q.gh.visible);return g?new V3(g.r.x,g.r.y+2.2,g.r.z):headOf(h());},()=>guides.some(G2=>G2[pi].gh.visible),'встань сюда');
    prompt(pi,'jump',()=>headOf(h()),()=>W.webs.some(w=>Math.hypot(w.x-h().pos.x,w.z-h().pos.z)<2.2&&Math.abs(w.y-h().pos.y)<1),'на серединку');
    prompt(pi,'jump',()=>headOf(h()),()=>B.mode==='sweepW'&&inArena(h())&&hd(h().pos,B.e.pos)<9.4,'прыгай!');
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help)||(B.mode==='aim'&&B.tgt===h()));
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));}
  prompt(0,'skill',()=>headOf(T.proshka),()=>F.warn&&!F.done&&!F.spFled,'в веретено');
  prompt(0,'skill',()=>headOf(T.proshka),()=>B.mode==='aim'&&T.proshka.active&&inArena(T.proshka),'в острие');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>F.warn&&!F.cut&&T.pelageya.active&&W.owlT<=0,'старая нить');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>T.pelageya.active&&W.owlT<=0&&(B.mode==='decoy'||(T.pelageya.pos.z<-35.5&&T.pelageya.pos.z>-48&&T.pelageya.pos.y>6.5)),'Совиный взор');
  const web=(pi,i,nx)=>O(()=>(!hasStr0(pi,i)?'Встань в своё кольцо — там герой твой нарисован — и клубок '+K(pi,'item')+' в колышек брось.<br>Струна друга поперёк ляжет — вот и сошлось.':!W.webs.some(w=>Math.hypot(w.x-WEBC[i].x,w.z-WEBC[i].z)<1.5)?'Твоя струна готова! Ждём струну друга — крест-накрест лечь.':'Паутинка готова! На серединку прыгни '+K(pi,'jump')+' — подкинет до '+nx+'.<br>Второго героя тоже: смени '+K(pi,'swap')+' или кликни '+K(pi,'call')+' — пусть идёт следом.'),
    ()=>F.spFled||players[pi].heroes.every(h=>(inBarn(h)&&h.pos.y>(i===0?2.9:6.4))||h.pos.z<-34.4),()=>hasStr0(pi,i)?[]:[rings[i][pi].g,STK[i][pi].g]);
  const bossText=pi=>B.phase<1?'Повить! Веретенник прячется в кудели — входите оба.':B.mode==='decoy'?(pi?'Три веретена! Совиный взор '+K(1,'skill')+' — настоящее в золоте. Его и бей '+K(1,'attack')+'.':'Три веретена! Пелагея увидит настоящее — его и бей '+K(0,'attack')+'.')
    :!B.cocoon?'Попался! Бей '+K(pi,'attack')+' в острие — с паутинки сверху вдвое!'
    :'Кокон не пробить! Клубок '+K(pi,'item')+' в колышек — две струны крест-накрест.<br>Встань за паутинкой — Веретенник влетит в неё. Красная дорожка — кувырок '+K(pi,'roll')+'.';
  for(const pi of[0,1])W.objectives[pi]=[
    O(()=>'Кикиморки-прядильщицы! Жёлтый кружок — щит '+K(pi,'guard')+', потом бей '+K(pi,'attack')+'.',()=>aFoes.started&&aFoes.list.every(e=>!e.alive),()=>aFoes.list.filter(e=>e.alive).map(e=>e.g)),
    O(()=>'Мотовило: кто тяжелей — тот вниз, другой — вверх, на полати.<br>Потап тяжёлый! Наверху — клубок '+K(pi,'item')+' на мотовило: подтянет друга.',()=>!!F.liftDone,()=>F.liftDone?[]:[PL[0].g,PL[1].g,reel]),
    O(()=>'Ткацкий стан: один — на подножку, второй — клубок '+K(pi,'item')+' в зев.<br>Полотно-мост: '+LOOM.n+' / '+LOOM.max+'.',()=>!!F.loomDone,()=>F.loomDone?[]:[treadle.mesh,spotRing]),
    O('Нитяные мороки! Жёлтый кружок — щит. Синяя капля — отбей назад.<br>Красный зубец — кувырок, и никаких преград.',()=>F.spFled||(floorFoes.started&&floorFoes.list.every(e=>!e.alive)),()=>floorFoes.list.filter(e=>e.alive).map(e=>e.g)),
    web(pi,0,'галереи'),web(pi,1,'чердака'),
    O('Веретено удрало на повить! За ним — в дверь на чердаке.',()=>acts().every(h=>h.pos.z<-35.2),()=>[]),
    O(()=>'Сторожевые нити не видны! Пелагея — Совиный взор '+K(1,'skill')+'.<br>Низкую нить перепрыгни '+K(pi,'jump')+', высокую обойди.',()=>!!F.latch||acts().every(h=>h.pos.z<-47.6),()=>[]),
    O('Засов! Встаньте вдвоём на обе плиты у двери.',()=>!!F.latch,()=>plates.map(p=>p.mesh)),
    O(()=>bossText(pi),()=>!!F.bossWon,()=>B.e&&B.e.alive?[B.e.g]:[]),
    O('Веретено падает…',()=>false,()=>[kiki.g])];
  W.tipZones.push({cond:()=>F.warn&&!F.spFled,text:pi=>pi?'Прялка тянет нити! Совиный взор '+K(1,'skill')+' включи —<br>И старую нить ударом '+K(1,'attack')+' рассеки.':'Прялка тянет нити! Прошкой из рогатки '+K(0,'skill')+' в веретено стрельни —<br>Колесо споткнётся, как ни верти.'},
    {cond:(pi,h)=>W.owlT>0&&!F.cut&&!F.spFled,text:pi=>'Серебром старая сказочная нить светится — у крюка на галерее.<br>Разрежь её ударом '+K(pi,'attack')+' — да поскорее!'},
    {cond:()=>B.mode==='aim',text:pi=>pi?'Веретенник разгоняется! Красная дорожка — кувырок '+K(1,'roll')+' в сторону.':'Веретенник разгоняется! Прошка — рогаткой '+K(0,'skill')+' в острие: споткнётся!'});
  W.k15={aFoes,floorFoes,PL,LIFT,reel,LOOM,treadleCol,spotRing,WIRES,plates,ARS,AR_G,B,weightOn,inBarn,inArena};   // для напарника-бота и ботов проверки
  W.zvenGoal=()=>{const a=acts().reduce((m,h)=>h.pos.z<m.pos.z?h:m);return new V3(clamp(a.pos.x,-9,9),a.pos.y+2.4,a.pos.z-2.5);};W.zvenFree=true;
  bell(-9,46);bell(-9.4,30.2,4.4);bell(9,26,4.4);bell(-9.4,-36.4,7);bell(-4.2,-54,7);
  W.spawns=[[new V3(-2.5,0,46),new V3(-4.5,0,47)],[new V3(2.5,0,46),new V3(4.5,0,47)]];W.startAct=[0,0];
  W.pauseLine='Кикимора прядёт чужим голосом, как во сне.<br>Мотовило: тяжёлый вниз — лёгкий вверх. Ткацкий стан: подножка и клубок — полотно-мост.<br>В овине — паутинка крест-накрест, а на повити — Веретенник: ловите его в паутинку!';
  W.onStart=()=>{F.stage='intro';play({dur:13,fov:48,shots:[shot(0,[0,5,-2],[5,3,-18]),shot(4.6,[1.6,2.2,-14.6],[4.3,1.4,-18]),shot(8.6,[-1.6,3.2,-8],[-3,0.4,-16],[-0.6,2.4,-9.5],[-3,0.6,-16],3)],
    says:[[0.6,3.6,null,'<i>Кикимора прядёт в старом овине. Прялка огромная, до крыши; звенья висят высоко над колесом.</i>',true],[4.8,3,'kiki','<i>(сухим, деревянным голосом)</i> Пряди. Пряди. Не спи.'],
      [8.8,3.8,'zven','Где две струны скрестятся — паутинка. Прыгайте — подкинет до самой крыши!']],
    events:[{t:4.8,fn:()=>SFX.keys()}],end:()=>{F.stage='play';snapCams();}});};
  fadeable(walls);   // стены залов тают, когда заслоняют героев
  flushDecor();}
