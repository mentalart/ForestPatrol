/* ============================== РЕЛИЗ final06 · 3-2 «ОБЛАЧНЫЕ ПАСТБИЩА» — ВТРОЕ ДЛИННЕЕ: ПУШОК, ВЕТЕР-ВЕТРИЛО, РАДУГА-ДУГА, ОВЧАРНЯ, ГРОМОВОЙ БАРАН ============================== */
// Было: 118 м, шесть участков (облако-лифт, живая вода, ловушка «я сам», барашки-мостик, грозовые тучки, последнее облако).
// Стало: около 340 м и двенадцать участков. Первые шесть — прежние (последнее облако больше не конец), за ними — история про ягнёнка:
//   Е «Найдёныш» — на облаке дрожит ягнёнок Пушок в грозовой нити: два пера рядом зажечь — нить тает. Дальше Пушок бежит за светом.
//   Ж «Пушок-пружинка» — уступ в 4 м: польёт Йоша Пушка живой водой — распушится (он ведь облачко), прыгнешь на него — подкинет,
//      даже Потапа. Без воды Пушок подкидывает невысоко, а Потапа и вовсе не держит.
//   З «Ветер-Ветрило» (Пушкин: «Ветер, ветер! Ты могуч, ты гоняешь стаи туч») — Ветер надувает щёки и дует поперёк мостков: сдувает
//      с облака и гасит перо. Потапа не сдвинет и перо у него не задует: прячься за Потапа или за стожок. Дальние мостки — светомостки,
//      их держит свет Потапа.
//   И «Радуга-дуга» — радуга встаёт, когда солнце за спиной, а дождик впереди: Йоша поливает тучку-дождевичок (Потап — выжимает),
//      кто-то светит пером позади — по радуге идут, пока идёт дождик. Вторая переправа — в две радуги: тучку-толстушку на островке
//      выжмет только Потап. Звенышко учит: «Каждый охотник желает знать, где сидит фазан».
//   К «Овчарня» — стадо разбежалось: барашки бегут к свету — отвести всех девятерых в кошару; тучки громом пугают барашков.
//      Ветер благодарит, рассказывает про вожака и надувает лестницу к Грозовой вершине.
//   Л «Громовой Баран» — мини-босс: вожак стада, отец Пушка, в грозовой мороке (не злодей — заплутал в грозе).
//      1 «Таран»: бежит на свет; пухлый (политый) стожок — увяз: в свете бей; Потап — «за рога». Неполитый стожок разметает.
//      2 «Гроза»: Баран на грозовой туче над ареной, молнии в землю (тень-круг: уйди или щит). Радуга — дорога наверх: западную
//         тучку поливает Йоша, восточную выжимает Потап, светит кто-то позади. На туче бей в свете, а от топота — прыгай.
//      3 «Пушок»: морок почти спал, на рогах чёрная нить. Баран никого не узнаёт и носится. Подведите Пушка к батюшке, пока тот
//         увяз или стоит; Пушок пугается, если Баран мчится рядом.
//      Ролик: Пушок прижимается к отцу — нить рвётся, грозовая шерсть проливается дождём, над пастбищем радуга, стадо сбегается,
//      Ветер разгоняет тучи, с радуги падает звено.
// В одиночку: свет оставленного героя не гаснет (зажёг — сменил героя), дождик и пухлость дольше, Ветер слабее, Баран целится
// только в того, кем играешь, и дольше вязнет. Звеньев по-прежнему 4 (четвёртое — после боя), орешков 10.
{const L=LEVELS.find(l=>l.id==='3-2');if(L)L.nuts=10;}
WHO.pushok=['Пушок','#f4f0ff'];VOICE.pushok={f:700,w:'triangle',sp:0.07};
WHO.veter=['Ветер-Ветрило','#bfe4ff'];VOICE.veter={f:120,w:'sawtooth',sp:0.15};
WHO.baran=['Громовой Баран','#a8b8ff'];VOICE.baran={f:85,w:'square',sp:0.15};
FOE.grombaran={r:1.5,emb:6,sig:['red'],sp:0.01,look:'grombaran',big:true};
// Громовой Баран: белая облачная шерсть, поверх — грозовая (тёмная, искрит), золотые витые рога, тёмная морда
FL.grombaran=(inner)=>{const wool=M(0xf4f2ff,{emissive:0x6a70b0,emissiveIntensity:0.1}),stormM=M(0x3a3e5a,{emissive:0x2a4ad0,emissiveIntensity:0.3}),face=M(0x3a3448),
    horn=M(0xe8c060,{emissive:0x806020,emissiveIntensity:0.35}),hoof=M(0x2a2434),thrM=M(0x101018,{emissive:0x40ff90,emissiveIntensity:0.5});
  const body=new THREE.Group();inner.add(body);const woolG=new THREE.Group();body.add(woolG);
  for(const[dx,dy,dz,s]of[[0,1.25,0,0.95],[0.55,1.3,0.45,0.7],[-0.55,1.3,0.4,0.72],[0.5,1.25,-0.5,0.7],[-0.5,1.28,-0.5,0.72],[0,1.75,0.1,0.7],[0,1.6,-0.7,0.62],[0,1.2,0.75,0.6]]){
    const m=new THREE.Mesh(PUFF_GEO,wool);m.position.set(dx,dy,dz);m.scale.set(s,s*0.9,s);m.castShadow=true;woolG.add(m);}
  const storm=[];for(let i=0;i<13;i++){const a=i/13*Math.PI*2,m=new THREE.Mesh(PUFF_GEO,stormM);m.position.set(Math.cos(a)*0.82,1.35+Math.sin(i*1.7)*0.38,Math.sin(a)*0.82-0.05);
    m.scale.setScalar(0.42+0.12*Math.abs(Math.sin(i*2.3)));body.add(m);storm.push(m);}
  const sparks=[];const sm=MB(0xfff6a0);for(let i=0;i<4;i++){const b=new THREE.Group();for(let k=0;k<3;k++){const s2=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.34,0.05),sm);s2.position.set(k%2?0.07:-0.07,-k*0.28,0);s2.rotation.z=k%2?0.5:-0.5;b.add(s2);}
    b.position.set(Math.cos(i*1.6)*0.9,1.9,Math.sin(i*1.6)*0.9);b.visible=false;body.add(b);sparks.push(b);}
  const head=new THREE.Group();head.position.set(0,1.75,1.15);body.add(head);
  const hm=new THREE.Mesh(new THREE.SphereGeometry(0.42,12,10),face);hm.scale.set(0.85,1,1.2);head.add(hm);
  const muz=new THREE.Mesh(new THREE.SphereGeometry(0.25,10,8),face);muz.position.set(0,-0.2,0.4);head.add(muz);
  const tuft=new THREE.Mesh(PUFF_GEO,wool);tuft.scale.setScalar(0.32);tuft.position.set(0,0.38,-0.05);head.add(tuft);
  const horns=[];for(const sd of[-1,1]){const hg=new THREE.Group();hg.position.set(sd*0.36,0.2,-0.1);head.add(hg);
    const t=new THREE.Mesh(new THREE.TorusGeometry(0.3,0.1,8,18,Math.PI*1.55),horn);t.rotation.set(0,sd*Math.PI/2,-0.4);t.position.set(sd*0.12,-0.05,-0.02);hg.add(t);
    const tipM=new THREE.Mesh(new THREE.ConeGeometry(0.09,0.26,7),horn);tipM.position.set(sd*0.16,-0.3,0.24);tipM.rotation.x=1.9;hg.add(tipM);horns.push(hg);}
  const thread=new THREE.Group();head.add(thread);for(let i=0;i<3;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(0.55+i*0.05,0.025,4,22),thrM);t.rotation.set(Math.PI/2+i*0.35,i*0.6,0);t.position.y=0.15;thread.add(t);}thread.visible=false;
  const legs=[];for(const[x,z]of[[-0.42,0.5],[0.42,0.5],[-0.42,-0.5],[0.42,-0.5]]){const l=new THREE.Group();l.position.set(x,0.75,z);body.add(l);
    const c=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.09,0.75,6),face);c.position.y=-0.37;l.add(c);const hf=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.13,0.12,6),hoof);hf.position.y=-0.72;l.add(hf);legs.push(l);}
  return {body,woolG,wool,storm,stormM,sparks,head,horns,thread,legs,eyeY:1.86,eyeZ:1.58,eyeX:0.2,eyeS:1.35,top:2.7,lid:hp(0x3a3448),noThreads:true};};
// Пушок: ягнёнок-облачко с розовыми ушками, красной ленточкой и колокольчиком; пока не освобождён — в грозовой нити
function lambMesh32(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);
  const wool=M(0xffffff,{emissive:0x8a80c0,emissiveIntensity:0.12}),face=M(0xf2d8dc),dk=M(0x4a3a50),pink=M(0xff9ab0);
  const puffs=[];for(const[dx,dy,dz,s]of[[0,0.5,0,0.36],[0.2,0.55,0.14,0.26],[-0.2,0.55,0.1,0.27],[0.06,0.62,-0.22,0.27],[-0.1,0.68,0,0.25],[0,0.48,0.24,0.24]]){
    const m=new THREE.Mesh(PUFF_GEO,wool);m.position.set(dx,dy,dz);m.scale.setScalar(s);m.castShadow=true;body.add(m);puffs.push(m);}
  const head=new THREE.Group();head.position.set(0,0.68,0.36);body.add(head);
  const hm=new THREE.Mesh(new THREE.SphereGeometry(0.17,12,10),face);hm.scale.set(0.9,1,1.1);head.add(hm);
  const tuft=new THREE.Mesh(PUFF_GEO,wool);tuft.scale.setScalar(0.11);tuft.position.set(0,0.15,-0.02);head.add(tuft);
  for(const s of[-1,1]){const ew=new THREE.Mesh(new THREE.SphereGeometry(0.055,8,6),M(0xffffff));ew.position.set(s*0.075,0.03,0.14);head.add(ew);
    const ep=new THREE.Mesh(new THREE.SphereGeometry(0.03,6,5),MAT.dark);ep.position.set(s*0.078,0.03,0.185);head.add(ep);
    const hl=new THREE.Mesh(new THREE.SphereGeometry(0.011,4,4),MB(0xffffff));hl.position.set(s*0.07,0.05,0.212);head.add(hl);
    const ear=new THREE.Mesh(new THREE.SphereGeometry(0.06,8,6),pink);ear.scale.set(1.6,0.5,0.8);ear.position.set(s*0.17,0.06,-0.02);ear.rotation.z=s*0.4;head.add(ear);}
  const nose=new THREE.Mesh(new THREE.SphereGeometry(0.025,6,5),pink);nose.position.set(0,-0.04,0.18);head.add(nose);
  const rib=new THREE.Mesh(new THREE.TorusGeometry(0.13,0.025,5,14),M(0xd03a3a));rib.position.set(0,0.56,0.3);rib.rotation.x=1.2;body.add(rib);
  const bl=new THREE.Mesh(new THREE.ConeGeometry(0.05,0.07,8),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5}));bl.position.set(0,0.46,0.42);body.add(bl);
  const legs=[];for(const[x,z]of[[-0.12,0.12],[0.12,0.12],[-0.12,-0.12],[0.12,-0.12]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.28,5),dk);l.position.set(x,0.14,z);body.add(l);legs.push(l);}
  const thr=new THREE.Group();g.add(thr);const tm=M(0x2a2a4a,{emissive:0x3a4ad0,emissiveIntensity:0.6});
  for(let i=0;i<4;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(0.42-i*0.04,0.02,4,20),tm);t.position.y=0.5+i*0.07;t.rotation.set(Math.PI/2+rand(-0.5,0.5),rand(0,3),0);thr.add(t);}
  g.traverse(c=>{c.userData.noBatch=true;});return {g,body,head,legs,puffs,thr,wool};}
// облачный стожок: укрытие от ветра; политый Йошей — пухлый (в нём увязнет Громовой Баран)
function stog32(x,y,z,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const mat=M(0xe8e4f8,{emissive:0x4a3a80,emissiveIntensity:0.1});
  for(const[dx,dy,dz,s]of[[0,0.45,0,0.75],[0.35,0.4,0.25,0.5],[-0.35,0.42,-0.2,0.52],[0,0.95,0.05,0.55],[0.1,1.35,0,0.38]]){const m=new THREE.Mesh(PUFF_GEO,mat);m.position.set(dx,dy,dz);m.scale.set(s,s*0.85,s);m.castShadow=true;g.add(m);}
  const cyl={x,z,r:0.8,miny:y-1,maxy:y+1.5,on:true,occ:false};W.cyls.push(cyl);g.traverse(c=>{c.userData.noBatch=true;});
  const S={x,y,z,g,mat,cyl,puffy:false,gone:0};(W.stogs=W.stogs||[]).push(S);
  if(o.water)W.waterTargets.push({pos:new V3(x,y,z),active:()=>!S.puffy&&S.gone<=0&&(!o.on||o.on())&&Math.abs(HERO.yosha.pos.y-y)<2,onWater:()=>stogPuff32(S)});
  return S;}
function stogPuff32(S,quiet){S.puffy=true;S.g.scale.set(1.45,1.3,1.45);S.mat.color.setHex(0xffffff);S.mat.emissive.setHex(0x8ab0ff);S.mat.emissiveIntensity=0.25;S.cyl.r=1.15;
  if(!quiet){SFX.water();SFX.grow();burst(new V3(S.x,S.y+1,S.z),0xffffff,16,3);floatText(new V3(S.x,S.y+2.4,S.z),'Пухлый стожок!','#e8f4ff');}}
function stogScatter32(S,dur){S.puffy=false;S.gone=dur||7;S.g.visible=false;S.cyl.on=false;S.g.scale.set(1,1,1);S.mat.color.setHex(0xe8e4f8);S.mat.emissive.setHex(0x4a3a80);S.mat.emissiveIntensity=0.1;S.cyl.r=0.8;
  for(let i=0;i<6;i++)burst(new V3(S.x+rand(-1,1),S.y+rand(0.3,1.4),S.z+rand(-1,1)),0xf4f0ff,4,3,1.2);}
// радуга-дуга: лента из семи полос над отрезком a→b (дуга высотой H); пока горит — по ней ходят
const BOW_COL32=[0xff4a4a,0xff9a3a,0xffe84a,0x5ad06a,0x5ac8ff,0x4a6aff,0xa05aff];
function rainbow32(a,b,H,w){const dx=b[0]-a[0],dz=b[2]-a[2],L=Math.hypot(dx,dz),ux=dx/L,uz=dz/L,px=-uz,pz=ux;w=w||2.4;const N=40,pos=[],col=[],c=new THREE.Color();
  const P=(u,v)=>[a[0]+dx*u+px*v,lerp(a[1],b[1],u)+H*Math.sin(Math.PI*u)+0.05,a[2]+dz*u+pz*v];
  for(let k=0;k<7;k++){c.setHex(BOW_COL32[k]);const v0=-w/2+k*w/7,v1=v0+w/7;
    for(let i=0;i<N;i++){const u0=i/N,u1=(i+1)/N;for(const p of[P(u0,v0),P(u1,v0),P(u1,v1),P(u0,v0),P(u1,v1),P(u0,v1)]){pos.push(p[0],p[1],p[2]);col.push(c.r,c.g,c.b);}}}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
  const mat=new THREE.MeshBasicMaterial({vertexColors:true,transparent:true,opacity:0.9,side:THREE.DoubleSide,depthWrite:false});
  const m=new THREE.Mesh(geo,mat);m.renderOrder=3;m.visible=false;m.userData.noBatch=true;W.group.add(m);
  const R={a,b,H,w,ux,uz,px,pz,L,m,mat,on:false,k:0,P};(W.bows=W.bows||[]).push(R);if(W.surfs.indexOf(bowSurf32)<0)W.surfs.push(bowSurf32);return R;}
function bowSurf32(x,z,reach){let best=null;for(const R of W.bows||[]){if(!R.on||R.k<0.95)continue;const rx=x-R.a[0],rz=z-R.a[2],u=(rx*R.ux+rz*R.uz)/R.L,v=rx*R.px+rz*R.pz;
    if(u<-0.02||u>1.02||Math.abs(v)>R.w/2+0.1)continue;const uu=clamp(u,0,1),y=lerp(R.a[1],R.b[1],uu)+R.H*Math.sin(Math.PI*uu);if(y>reach+0.001)continue;if(!best||y>best.y)best={y,ref:R};}
  return best;}
// тучка-дождевичок на облачной ножке: Йоша польёт (или Потап выжмет) — пойдёт дождик; солнце (перо) позади — встанет радуга
function rainCloud32(x,y,z,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const tol=!!o.tolst,sc=tol?1.4:1;
  addMesh(new THREE.CylinderGeometry(0.12,0.22,1.5,7),M(0xd8d0f0),0,0.75,0,g);
  const cm=M(tol?0x8a86a8:0xaaa6c8,{emissive:0x1a1a3a,emissiveIntensity:0.2});const cloud=new THREE.Group();cloud.position.y=2.1;g.add(cloud);
  for(const[dx,dy,dz,s]of[[0,0,0,0.6],[0.5,-0.05,0.1,0.42],[-0.5,-0.05,0,0.44],[0.15,0.28,-0.1,0.4],[-0.2,-0.2,0.25,0.36]]){const m=new THREE.Mesh(PUFF_GEO,cm);m.position.set(dx*sc,dy*sc,dz*sc);m.scale.setScalar(s*sc);cloud.add(m);}
  const fz=0.56*sc;for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(0.07,8,6),MAT.dark);e.position.set(s*0.18*sc,0.06*sc,fz);cloud.add(e);
    if(tol){const ch=new THREE.Mesh(new THREE.SphereGeometry(0.1,8,6),M(0xd890b0));ch.position.set(s*0.34*sc,-0.08*sc,fz-0.05);cloud.add(ch);}}
  const mouth=new THREE.Mesh(new THREE.TorusGeometry(0.08*sc,0.02,5,10,Math.PI),MAT.dark);mouth.position.set(0,-0.12*sc,fz+0.01);mouth.rotation.z=Math.PI;cloud.add(mouth);
  if(o.face)cloud.rotation.y=o.face;
  const drops=[],dm=MB(0x9fd8ff,{transparent:true,opacity:0.8});for(let i=0;i<22;i++){const d=new THREE.Mesh(new THREE.BoxGeometry(0.035,0.28,0.035),dm);d.visible=false;d.userData.ph=Math.random();d.userData.dx=rand(-0.7,0.7)*sc;d.userData.dz=rand(-0.5,0.5)*sc;g.add(d);drops.push(d);}
  g.traverse(c=>{c.userData.noBatch=true;});W.cyls.push({x,z,r:0.2,miny:y-1,maxy:y+1.5,on:true});
  const bow=rainbow32(o.from,o.to,o.H||3,o.w);const dx=o.to[0]-o.from[0],dz=o.to[2]-o.from[2],dl=Math.hypot(dx,dz);
  const R={x,y,z,g,cloud,drops,bow,rain:0,dur:0,potap:o.potap!==false,yosha:o.yosha!==false,tolst:tol,dx:dx/dl,dz:dz/dl,told:false,on:o.on||null,name:o.name||''};
  W.waterTargets.push({pos:new V3(x,y,z),pri:0.4,active:()=>R.yosha&&(!R.on||R.on())&&R.rain<=0.3&&Math.abs(HERO.yosha.pos.y-y)<2.2,onWater:()=>rainStart32(R,'yosha')});
  W.lifts.push({pos:new V3(x,y,z),active:()=>R.potap&&(!R.on||R.on())&&R.rain<=0.3,onLift:()=>rainStart32(R,'potap')});
  (W.rains=W.rains||[]).push(R);return R;}
function rainDur32(){return (G.solo||genPath()==='easy')?16:12;}
function rainStart32(R,who){R.dur=R.rain=rainDur32();R.told=false;SFX.water();tone(880,0.2,'sine',0.06,660);burst(new V3(R.x,R.y+2.2,R.z),0x9fd8ff,12,2.5);
  floatText(new V3(R.x,R.y+3.2,R.z),who==='potap'?'Выжал тучку! Дождик!':'Заплакала тучка — дождик!','#cfe8ff');
  const c=R.cloud;anim(0.6,k=>{const s=1+Math.sin(k*Math.PI)*(who==='potap'?-0.3:0.15);c.scale.set(1/Math.sqrt(Math.abs(s)),s,1/Math.sqrt(Math.abs(s)));});
  if(W.onRain)W.onRain(R,who);}
function lightBehind32(R){return HEROES.some(h=>heroLight(h)&&hd(h.pos,R)<6.5&&Math.abs(h.pos.y-R.y)<2.6&&((h.pos.x-R.x)*R.dx+(h.pos.z-R.z)*R.dz)<0.8);}
function updRain32(R,dt){const en=!R.on||R.on();R.g.visible=en;const B=R.bow;if(!en){R.rain=0;B.on=false;B.m.visible=false;R.drops.forEach(d=>{d.visible=false;});return;}
  if(R.rain>0){R.rain-=dt;R.drops.forEach(d=>{d.visible=true;const ph=(d.userData.ph+G.time*1.6)%1;d.position.set(d.userData.dx,1.9-ph*2.0,d.userData.dz);});
    if(!B.on){if(lightBehind32(R)){B.on=true;B.k=0;SFX.flower();tone(1047,0.3,'sine',0.08);tone(1319,0.3,'sine',0.07,null,0.12);tone(1568,0.4,'sine',0.07,null,0.24);
        const mid=B.P(0.5,0);floatText(new V3(mid[0],mid[1]+0.8,mid[2]),'Радуга-дуга!','#ffe08a');for(let i=0;i<7;i++){const p=B.P(i/6,0);burst(new V3(p[0],p[1]+0.2,p[2]),BOW_COL32[i],6,2);}
        if(W.onBow)W.onBow(R);}
      else if(!R.told&&R.rain<R.dur-1.6){R.told=true;for(const pi of[0,1])tip(pi,'Дождик идёт, а радуги нет: солнышко должно светить <b>из-за спины</b>.<br>Зажги перо '+K(pi,'item')+' позади тучки — радуга и встанет.',3.4);}}
    if(R.rain<=0){R.rain=0;B.on=false;R.drops.forEach(d=>{d.visible=false;});floatText(new V3(R.x,R.y+3,R.z),'Дождик кончился','#cfe8ff');}}
  if(B.on){B.k=Math.min(1,B.k+dt/0.5);B.m.visible=true;B.mat.opacity=(R.rain<3&&Math.sin(G.time*14)>0?0.35:0.9)*B.k;}else{B.k=0;B.m.visible=false;}}
// Ветер-Ветрило: облачное лицо с надутыми щеками; дует поперёк мостков (+x)
function makeVeter32(){const g=new THREE.Group();W.group.add(g);const wm=M(0xeef4ff,{emissive:0x8aa8e0,emissiveIntensity:0.2}),dk=MAT.dark;
  for(const[dx,dy,dz,s]of[[0,0,0,2.2],[1.5,0.9,-0.4,1.4],[-1.5,0.9,-0.4,1.4],[0,1.7,-0.5,1.5],[1.9,-0.6,-0.6,1.2],[-1.9,-0.6,-0.6,1.2],[0,-1.4,-0.4,1.3],[2.6,0.4,-1.2,1.1],[-2.6,0.4,-1.2,1.1]]){const m=new THREE.Mesh(PUFF_GEO,wm);m.position.set(dx,dy,dz);m.scale.setScalar(s);g.add(m);}
  const cheeks=[];for(const s of[-1,1]){const c=new THREE.Mesh(PUFF_GEO,M(0xffe4ec,{emissive:0xc08aa0,emissiveIntensity:0.15}));c.position.set(s*1.25,-0.45,1.55);c.scale.setScalar(0.75);g.add(c);cheeks.push(c);
    const ew=new THREE.Mesh(new THREE.SphereGeometry(0.42,12,10),M(0xffffff));ew.position.set(s*0.75,0.55,1.95);g.add(ew);const ep=new THREE.Mesh(new THREE.SphereGeometry(0.2,10,8),dk);ep.position.set(s*0.75,0.55,2.3);g.add(ep);
    const br=new THREE.Mesh(new THREE.BoxGeometry(0.75,0.14,0.14),M(0xb8c8e8));br.position.set(s*0.8,1.15,2.0);br.rotation.z=s*0.25;g.add(br);}
  const mouth=new THREE.Mesh(new THREE.TorusGeometry(0.32,0.11,8,16),M(0x5a6aa0));mouth.position.set(0,-0.55,2.1);g.add(mouth);
  g.traverse(c=>{c.userData.noBatch=true;});return {g,cheeks,mouth};}
build32=function(){
  W.zvenAway=true;W.world=3;setTheme('heaven');W.name='3-2 · «Облачные пастбища»';W.sub='Небесное царство · тёплый свет поднимает облака · Пушок, Ветер-Ветрило и Громовой Баран';W.camX=14;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.pero=true;W.fallY=-16;W.k32=true;
  scene.background=new THREE.Color(0x4a4488);scene.fog=new THREE.Fog(0x4a4488,30,110);amb.intensity=0.56;
  heavenDecor(-345,20,{sunCol:0xffa070,sunY:10});const T=HERO;
  /* ---------- А. нижнее пастбище: облако любит тепло (прежнее) ---------- */
  cloudIsle(-9,9,-10,8,0);bell(-3,3);
  const C1=cloudLift(5,-5,0.08,6.2,{name:'c1'}),C1b=cloudLift(-5.2,-4,0.08,4.4,{name:'c1b'});
  const L1=linkItem(5,7.4,-5);const n1=nutItem(-5.2,5.6,-4);
  sheepFlock(5,{x:-3.5,y:0,z:3,r:2.6},{a:[40,0,40],b:[44,0,40]},[],{name:'deco'});
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,3);
  cloudIsle(-12,12,-17,-10.4,-5);rampWay(10.4,-5,-11,10.4,0,4.2,2);cloudIsle(8,12,4,7,0);
  /* ---------- Б. облачный луг выше: живая вода растит облака ---------- */
  const C2=cloudLift(0,-11.2,0.08,5.08,{name:'c2'});
  cloudIsle(-8,8,-30,-16,5);cloudIsle(-3,3,-16,-13.4,5);bell(3.5,-18,5);
  const C3=cloudLift(-5,-23,5.08,10.3,{name:'c3'});const L2=linkItem(-5,11.3,-23);const n2=nutItem(5.5,5.6,-28);
  /* ---------- В. обрыв: облако Потапа и соседнее, не политое ---------- */
  const C4=cloudLift(-2.2,-34,5.08,10.08,{name:'c4'}),C5=cloudLift(2.2,-34,5.08,10.08,{name:'c5'});cloudIsle(-4.5,4.5,-33,-30,5);cloudIsle(-4.5,4.5,-38,-35.7,10);
  cloudIsle(-12,12,-40,-30.4,-1);
  rampWay(10.6,-1,-31,10.6,5,-55,2);cloudIsle(9.4,14.6,-59,-55,5);rampWay(13.2,5,-57,13.2,10,-42,2);cloudIsle(8.6,14.4,-42,-38,10);
  sheepFlock(4,{x:-4,y:-1,z:-35,r:3},{a:[60,-1,0],b:[64,-1,0]},[],{name:'low'});
  /* ---------- Г. верхнее пастбище: барашки бегут к свету и складываются мостиком ---------- */
  cloudIsle(-9,9,-56,-38,10);bell(-4,-40,10);
  addMesh(new THREE.CylinderGeometry(1.2,1.5,0.25,16),CLOUD_TOP,0,10.12,-54.2);W.cyls.push({x:0,z:-54.2,r:1.3,miny:5,maxy:10.25,on:true});edgeSign(1.8,10,-54.6,'light');
  const flock=sheepFlock(6,{x:-4,y:10,z:-46,r:3},{a:[0,9.1,-56.1],b:[0,9.1,-65.9]},[{x:0,y:10.25,z:-54.2}],{name:'bridge'});
  const n3=nutItem(7.6,10.6,-39.6);
  /* ---------- Д. грозовой луг: тучки и тени ---------- */
  cloudIsle(-11,11,-92,-66,10);wall(-11.2,-11,-92,-66);wall(11,11.2,-92,-66);bell(-3,-68,10);
  const L3=linkItem(0,11.1,-69.5);const n4=nutItem(-9.4,10.6,-90.4);
  /* ---------- Е. последнее облако — наверх; там дрожит Пушок ---------- */
  const C6=cloudLift(0,-93.3,10.08,15.08,{name:'c6'});
  cloudIsle(-7,7,-110,-95.6,15);bell(3,-98,15);const n5=nutItem(5.4,15.6,-108.6);
  const LB=lambMesh32();LB.pos=new V3(0,15,-106);LB.g.position.copy(LB.pos);LB.mode='caught';LB.puffT=0;LB.face=Math.PI;LB.scared=0;LB.hop=null;LB.sq=0;LB.stuck=0;W.lamb32=LB;
  /* ---------- Ж. Пушок-пружинка: уступ в 4 м ---------- */
  cloudIsle(-7,7,-128,-110,15);bell(4.5,-113,15);
  cloudIsle(-7,7,-148,-128,19.2);bell(4.5,-131,19.2);const n6=nutItem(-5.6,19.8,-146);
  /* ---------- З. Ветер-Ветрило: мостки поперёк ветра, стожки-укрытия, светомостки ---------- */
  cloudIsle(-1.6,1.6,-162,-148,19.2);const SW=[stog32(-1.0,19.2,-153.5),stog32(-1.0,19.2,-158.5)];
  cloudIsle(-3,3,-168,-162,19.2);bell(2.2,-163.5,19.2);SW.push(stog32(-2.0,19.2,-166));const n7=nutItem(2.4,19.8,-167.2);
  mostki('light',[[0,19.2,-168],[0,19.2,-176]],{w:2});edgeSign(1.4,19.2,-167.4,'light');cloudIsle(-1.6,1.6,-179,-176,19.2);SW.push(stog32(-1.0,19.2,-177.6));
  mostki('light',[[0,19.2,-179],[0,19.2,-188]],{w:2});
  cloudIsle(-6,6,-200,-188,19.2);bell(-3.5,-190,19.2);
  const VT=makeVeter32();VT.g.position.set(-13,25,-199);VT.g.lookAt(0,20,-168);
  const WIND={st:'idle',t:3,zmin:-189,zmax:-147.5,streaks:[],blown:new Set()};
  {const sm=MB(0xffffff,{transparent:true,opacity:0.5,depthWrite:false});for(let i=0;i<16;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(rand(2.5,4.5),0.05,0.05),sm);s.visible=false;s.userData.noBatch=true;W.group.add(s);WIND.streaks.push(s);}}
  /* ---------- И. Радуга-дуга ---------- */
  const R1=rainCloud32(-2.2,19.2,-198.8,{from:[0,19.2,-200],to:[0,19.2,-214],H:3.2,name:'r1'});
  const n8=nutItem(0,23.0,-207);
  cloudIsle(-6,6,-226,-214,19.2);bell(3.5,-216,19.2);
  const R2=rainCloud32(-2.2,19.2,-224.8,{from:[0,19.2,-226],to:[0,19.2,-238],H:2.8,potap:false,name:'r2'});
  cloudIsle(-2.4,2.4,-243,-238,19.2);
  const R3=rainCloud32(-1.7,19.2,-242.2,{from:[0,19.2,-243],to:[0,19.2,-256],H:3,yosha:false,tolst:true,name:'r3'});
  /* ---------- К. Овчарня: стадо разбежалось ---------- */
  cloudIsle(-12,12,-294,-256,19.2);bell(4,-258,19.2);const n9=nutItem(10.8,19.8,-292.6);
  const PEN={x:0,z:-285,y:19.2,r:3.4};
  {const pm=M(0xf4f0ff),rm=M(0xd8cce8);for(let i=0;i<18;i++){const a=i/18*Math.PI*2;if(Math.abs(Math.atan2(Math.sin(a),Math.cos(a))-Math.PI/2)<0.5)continue;   // проход — к северу (к +z)
      const x=PEN.x+Math.cos(a)*PEN.r,z=PEN.z+Math.sin(a)*PEN.r;addMesh(new THREE.CylinderGeometry(0.12,0.15,1.2,6),pm,x,PEN.y+0.6,z);addMesh(PUFF_GEO,CLOUD_TOP,x,PEN.y+1.25,z).scale.setScalar(0.22);
      W.cyls.push({x,z,r:0.2,miny:PEN.y-1,maxy:PEN.y+1.2,on:true});
      const a2=(i+1)/18*Math.PI*2;if(Math.abs(Math.atan2(Math.sin(a2),Math.cos(a2))-Math.PI/2)<0.5)continue;const x2=PEN.x+Math.cos(a2)*PEN.r,z2=PEN.z+Math.sin(a2)*PEN.r,rl=addMesh(new THREE.BoxGeometry(0.08,0.1,Math.hypot(x2-x,z2-z)),rm,(x+x2)/2,PEN.y+0.85,(z+z2)/2);rl.rotation.y=Math.atan2(x2-x,z2-z);}
    lantern(PEN.x+1.4,PEN.z-1.6,PEN.y);}
  const HERD=[];W.herd32=HERD;
  for(const[gx,gz]of[[-9,-263],[9,-266],[-9,-285]])for(let i=0;i<3;i++){const m=makeSheep();m.g.scale.setScalar(0.9);m.g.traverse(c=>{c.userData.noBatch=true;});const home=new V3(gx+rand(-1.6,1.6),19.2,gz+rand(-1.6,1.6));
    m.g.position.copy(home);HERD.push({m,pos:home.clone(),home,penned:false,flee:0,face:rand(0,6),wander:rand(0,3),tgt:home.clone()});}
  const stormWall=colBox(-3,3,19.2,26,-295,-294,false);const stormCurtain=new THREE.Group();W.group.add(stormCurtain);
  {const cm=M(0x3a3a58,{emissive:0x2a2a8a,emissiveIntensity:0.3});for(let i=0;i<9;i++){const m=new THREE.Mesh(PUFF_GEO,cm);m.position.set(-3+i*0.75,19.6+(i%3)*1.2,-294.6);m.scale.setScalar(rand(0.9,1.4));stormCurtain.add(m);}stormCurtain.traverse(c=>{c.userData.noBatch=true;});}
  /* ---------- Л. Грозовая вершина: арена Громового Барана ---------- */
  const AY=22.4,ARC={x:0,z:-316};
  const np0=W.puffs.length;const rampR=rampWay(0,19.2,-294,0,AY,-304,3.2);W.puffs.length=np0;const rampM=W.group.children[W.group.children.length-1];rampM.visible=false;rampM.userData.noBatch=true;W.ramps.splice(W.ramps.indexOf(rampR),1);
  cloudIsle(-11,11,-328,-304,AY);
  for(const c of[[-11.4,-11,-328,-304],[11,11.4,-328,-304],[-11.4,11.4,-328.4,-328],[-11.4,-1.9,-304.2,-303.8],[1.9,11.4,-304.2,-303.8]])colBox(c[0],c[1],AY-1,AY+6,c[2],c[3],false);
  {const em=M(0xd8d0f0);for(let i=0;i<22;i++){const u=i/22,x=u<0.5?-11:11,z=-305-((u*2)%1)*22;addMesh(PUFF_GEO,em,x,AY+0.5,z).scale.set(1.1,0.7,1.1);}
    for(let i=0;i<10;i++){const x=-10.5+i*2.33;if(Math.abs(x)<2)continue;addMesh(PUFF_GEO,em,x,AY+0.5,-328.2).scale.set(1.1,0.7,1.1);addMesh(PUFF_GEO,em,x,AY+0.5,-304).scale.set(1.1,0.7,1.1);}}
  const gateCol=colBox(-1.9,1.9,AY-1,AY+6,-304.2,-303.8,false);gateCol.on=false;
  const gateFx=new THREE.Group();W.group.add(gateFx);{const cm=M(0x3a3a58,{emissive:0x3a4ad0,emissiveIntensity:0.4,transparent:true,opacity:0.85});for(let i=0;i<5;i++){const m=new THREE.Mesh(PUFF_GEO,cm);m.position.set(-1.6+i*0.8,AY+0.8+(i%2)*0.8,-304);m.scale.setScalar(0.8);gateFx.add(m);}gateFx.visible=false;gateFx.traverse(c=>{c.userData.noBatch=true;});}
  bell(3.5,-306.8,AY);
  const SB=[[-6,-310],[6,-310],[-6,-322],[6,-322]].map(([x,z])=>stog32(x,AY,z,{water:true,on:()=>F.boss>0}));
  const RW=rainCloud32(-8.4,AY,-317.8,{from:[-7.6,AY,-316],to:[-3.2,AY+5.2,-316],H:1.0,potap:false,face:Math.PI/2,on:()=>B.phase===2,name:'rw'});
  const RE=rainCloud32(8.4,AY,-317.8,{from:[7.6,AY,-316],to:[3.2,AY+5.2,-316],H:1.0,yosha:false,tolst:true,face:-Math.PI/2,on:()=>B.phase===2,name:'re'});
  const TOP={y:AY+5.2};const topG=new THREE.Group();topG.position.set(ARC.x,TOP.y,ARC.z);W.group.add(topG);const topM=M(0x4a4a6a,{emissive:0x2a3aa0,emissiveIntensity:0.35});
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2,m=new THREE.Mesh(PUFF_GEO,topM);m.position.set(Math.cos(a)*2.7,-0.45+Math.sin(i*1.9)*0.15,Math.sin(a)*2.7);m.scale.set(1.3,0.6,1.3);topG.add(m);}
  {const m=new THREE.Mesh(new THREE.CylinderGeometry(3.4,2.9,0.5,20),topM);m.position.y=-0.25;topG.add(m);}
  const topBolts=[];{const bm=MB(0xfff6a0);for(let i=0;i<3;i++){const b=new THREE.Group();for(let k=0;k<4;k++){const s2=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.6,0.06),bm);s2.position.set(k%2?0.12:-0.12,-0.8-k*0.5,0);s2.rotation.z=k%2?0.5:-0.5;b.add(s2);}b.position.set(Math.cos(i*2.1)*2.6,0,Math.sin(i*2.1)*2.6);b.visible=false;topG.add(b);topBolts.push(b);}}
  topG.visible=false;topG.traverse(c=>{c.userData.noBatch=true;});const topCyl={x:ARC.x,z:ARC.z,r:3.4,miny:TOP.y-0.7,maxy:TOP.y,on:false};W.cyls.push(topCyl);
  const L4=linkItem(0,AY+1.2,-312);L4.locked=true;L4.g.visible=false;const n10=nutItem(-10,AY+0.6,-327);
  const LAMB_HIDE=new V3(0,AY,-306.4);
  W.camZones.push({x:ARC.x,z:ARC.z,get y(){return B.phase===2?AY+2.6:AY;},r:12.5,camActive:()=>!G.cine&&B.phase>=1&&B.phase<4});
  const bb=$('bossbar');bb.style.display='none';{const _ol=W.onLeave;W.onLeave=()=>{bb.style.display='none';if(FIN.music)FIN.music.play(null);if(_ol)_ol();};}
  const B={e:null,phase:0,ai:'graze',t:0,dur:1.5,tgt:null,dir:new V3(),speed:12,hitSet:new Set(),lane:null,strikeT:3,strikes:[],stompT:-1,stompRing:null,charges:0};W.ram32=B;
  {const lm=MB(0xff4a3a,{transparent:true,opacity:0.5,depthWrite:false});const lane=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1),lm);lane.rotation.x=-Math.PI/2;lane.renderOrder=4;lane.visible=false;lane.userData.noBatch=true;W.group.add(lane);B.lane=lane;}
  {const rm=MB(0xbfe4ff,{transparent:true,opacity:0.8,depthWrite:false});const r=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,36),rm);r.rotation.x=Math.PI/2;r.visible=false;r.userData.noBatch=true;W.group.add(r);B.stompRing=r;}
  /* ---------- общие помощники ---------- */
  const soloK=()=>G.solo||genPath()==='easy';
  const nearLit=(p,r,dy)=>{let best=null,bd=r;for(const h of HEROES){if(!heroLight(h))continue;const d=hd(h.pos,p);if(d<bd&&Math.abs(h.pos.y-p.y)<(dy||3.5)){bd=d;best=h;}}return best;};
  const targets=()=>G.solo?[active(G.soloPi)]:[active(0),active(1)].filter(h=>!players[h.player].downed&&!h.cling);
  const inArena=p=>p.y>AY-1&&p.z<-304.2&&p.z>-328&&Math.abs(p.x)<11.2;
  const putLamb=(x,y,z)=>{LB.pos.set(x,y,z);LB.g.position.copy(LB.pos);LB.hop=null;};
  /* ---------- сюжет: прежние сценки ---------- */
  const say1=()=>later(0.8,()=>say('zven','Облака тёплый свет любят. Дзинь!',2.4,true));
  let arena=null;
  function spawnStorm(){F.fight=true;arena=[tuchaFoe(-5,-75,{y:10}),tuchaFoe(5,-77,{y:10}),tuchaFoe(-4,-85,{y:10}),tuchaFoe(4.5,-87,{y:10}),tenFoe(0,-81,{y:10}),tenFoe(-7,-89,{y:10}),tenFoe(7.5,-71,{y:10})];
    banner('Грозовые тучки!','#9fd0ff',2.4,'тучка искрит: синяя капля-молния — щит, в последний миг отбей назад · в свете тучка мягка');later(1.4,()=>say('zven','Свет пера — твоя защита: светлый круг с тобой идёт, не отстаёт!',2.6,true));}
  function trapArm(){F.trap='armed';bark(T.potap,'potap','Йоша, давай ко мне — довезу, не бойся.',2.6);}
  function trapFall(){F.trap='fell';meltCloud(C5);F.yoshaFloat=true;bark(T.yosha,'yosha','Я сам! Не мал, не слаб!',1.6);F.noCarry={minx:-12,maxx:12,miny:-3,maxy:2.5,minz:-40,maxz:-30.4};W.noCarry.push(F.noCarry);
    later(2.5,()=>{tip(1,'Йоша внизу, на лугу. Назад путь долог — по облачной лестнице, мимо барашков.<br>Потап ждать не станет — не до шашек.',3.6);});}
  function trapRide(){F.trap='rode';later(0.4,()=>bark(T.yosha,'yosha','Ладно. На этот раз — вези.',2.4));}
  W.onPuff=(c)=>{if(!F.puffTold){F.puffTold=true;later(0.4,()=>bark(T.pelageya,'pelageya','Я поливаю — ты подымаешь!',2.2));}};
  flock.onBridge=()=>{if(!F.sheepTold){F.sheepTold=true;later(0.3,()=>bark(T.proshka,'proshka','Живой мост! Бегом, пока свет не погас!',2.4));}};
  /* ---------- Е. Пушок: два света — нить тает ---------- */
  function lambScene(){F.lambFree=true;F.stage='lamb';const hs=HEROES;hs.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-102.4,15);h.face=Math.PI;h.vel.set(0,0,0);});
    play({dur:12.4,fov:46,shots:[shot(0,[3.2,16.6,-101.8],[0,15.6,-106]),shot(4.4,[-1.6,15.9,-104.2],[0,15.5,-106.2]),shot(8.4,[4.5,17.4,-99],[0,15.8,-110],[2.6,17.8,-100],[0,16.5,-118],3.6)],
      says:[[0.3,2.8,null,'<i>От тепла двух перьев грозовая нить тает, как иней.</i>',true],[3.2,1.4,'pushok','Бе-е…'],[4.6,2.6,'pelageya','Ягнёночек! Облачный, как пушок.'],
        [7.3,3.2,'zven','От стада отбился. Слышите, гром за облаками? Его батюшка ищет — вожак стада.'],[10.6,1.8,'proshka','Не бойся, Пушок, — доведём!']],
      events:[{t:0.6,fn:()=>{const th=LB.thr;anim(2.2,k=>{th.children.forEach((t,i)=>{t.scale.setScalar(1+k*1.5);t.material.opacity=1-k;t.material.transparent=true;t.rotation.z+=0.05*(i+1);});if(k>=1)th.visible=false;});
          SFX.flower();burst(LB.pos.clone().add(new V3(0,0.6,0)),0xffe08a,18,3);}},
        {t:3.2,fn:()=>{LB.sq=0.5;SFX.dzin();}},{t:10.6,fn:()=>{LB.sq=0.6;}}],
      end:()=>{LB.thr.visible=false;LB.mode='free';F.stage='free';snapCams();banner('Пушок с нами!','#f4f0ff',2.4,'ягнёнок бежит за светом пера · польёт Йоша — распушится');}});}
  /* ---------- З. Ветер-Ветрило: знакомство ---------- */
  function windScene(){F.windSeen=true;F.stage='wind';
    play({dur:8.6,fov:50,shots:[shot(0,[3,22.4,-146],[-8,24,-196],[1,22,-150],[-12,25,-199],5),shot(5,[-4,26,-182],[-13,25,-199])],
      says:[[0.3,3.6,'zven','«Ветер, ветер! Ты могуч, ты гоняешь стаи туч!» Дзинь!'],[3.9,3.0,'veter','Ух! Стадо по небу разбрелось — собираю, гоняю! Берегитесь, малые, — сдую!'],
        [6.9,1.6,'potap','Меня не сдует.']],
      events:[{t:3.9,fn:()=>{WIND.st='blow';WIND.t=2.4;SFX.whoosh();}}],
      end:()=>{F.stage='free';WIND.st='idle';WIND.t=2.5;snapCams();for(const pi of[0,1])tip(pi,'Ветер щёки надул — сейчас дунет! Прячься за Потапа или за стожок.<br>Потапа не сдвинет, и перо у него не задует.',4.2);}});}
  function sheltered(h){if(h.kind==='potap')return true;const P=T.potap;
    if(P.pos.x<h.pos.x&&h.pos.x-P.pos.x<3.2&&Math.abs(P.pos.z-h.pos.z)<1.4&&Math.abs(P.pos.y-h.pos.y)<1.6)return true;
    for(const S of SW)if(S.x<h.pos.x&&h.pos.x-S.x<2.8&&Math.abs(S.z-h.pos.z)<1.3&&Math.abs(S.y-h.pos.y)<1.6)return true;return false;}
  function updWind(dt){const inZone=[0,1].some(pi=>{const h=active(pi);return h.pos.z<WIND.zmax+2&&h.pos.z>WIND.zmin-8&&h.pos.y>17;});
    WIND.t-=dt;if(WIND.st==='idle'&&WIND.t<=0&&inZone&&!G.cine){WIND.st='inhale';WIND.t=soloK()?2.3:1.8;SFX.wave();tone(300,1.6,'sine',0.05,900);floatText(VT.g.position.clone().add(new V3(3,3,3)),'Фу-у-у… сейчас дуну!','#bfe4ff');}
    else if(WIND.st==='inhale'&&WIND.t<=0){WIND.st='blow';WIND.t=soloK()?1.8:2.2;SFX.whoosh();WIND.blown=new Set();}
    else if(WIND.st==='blow'&&WIND.t<=0){WIND.st='idle';WIND.t=soloK()?4.2:3.2;}
    const inh=WIND.st==='inhale'?1-WIND.t/(soloK()?2.3:1.8):0,bl=WIND.st==='blow';
    VT.cheeks.forEach(c=>{c.scale.setScalar(0.75+(bl?0.2:inh*0.75));});VT.mouth.scale.setScalar(bl?1.6:0.6+0.4*(1-inh));VT.g.position.y=25+Math.sin(G.time*0.8)*0.3;
    WIND.streaks.forEach((s,i)=>{s.visible=bl;if(bl){const ph=(G.time*1.4+i*0.37)%1;s.position.set(-14+ph*28,19.6+(i%5)*0.8,WIND.zmax-((i*7.3)%1)*(WIND.zmax-WIND.zmin));s.material.opacity=0.5*Math.sin(ph*Math.PI);}});
    if(!bl||G.cine)return;const push=soloK()?2.5:3.2;
    for(const pi of[0,1]){const h=active(pi);if(h.pos.z>WIND.zmax||h.pos.z<WIND.zmin||h.pos.y<17||players[pi].downed)continue;if(sheltered(h)){if(h.lit&&!WIND.blown.has(h)&&h.kind!=='potap'){WIND.blown.add(h);floatText(headOf(h),'Укрылся!','#bfe4ff');}continue;}
      h.pos.x+=push*dt;if(Math.random()<dt*8)burst(h.pos.clone().add(new V3(-0.4,0.6,0)),0xffffff,2,2,0.5);
      if(h.lit&&!WIND.blown.has(h)){WIND.blown.add(h);h.lit=false;featherFx(h);floatText(headOf(h),'Задуло перо!','#bfe4ff');if(!F.blowTold){F.blowTold=true;later(0.4,()=>bark(T.potap,'potap','Ко мне! За меня держитесь — у меня перо в кулаке не гаснет.',2.8));}}}}
  /* ---------- И. Радуга: реплики ---------- */
  W.onBow=(R)=>{if(!F.bowTold){F.bowTold=true;later(0.6,()=>say('zven','Каждый Охотник Желает Знать, Где Сидит Фазан! Семь цветов — дорога по небу!',3.2,true));}
    if(R===R3&&!F.bow3Told){F.bow3Told=true;later(0.5,()=>bark(T.potap,'potap','Выжал! Радуга — что твой мост, да с лентами.',2.6));}};
  W.onRain=(R,who)=>{if(R===R1&&!F.rainTold){F.rainTold=true;later(0.5,()=>bark(T.yosha,'yosha',who==='potap'?'Потап тучку выжал, как мочалку!':'Тучка заплакала! Теперь солнышко позади надо.',2.4));}};
  /* ---------- К. Овчарня ---------- */
  let herdFoes=null;
  function herdStart(){F.herd=true;herdFoes=[tuchaFoe(-5,-268,{y:19.2}),tuchaFoe(5,-273,{y:19.2}),tuchaFoe(0,-262,{y:19.2})];
    banner('Стадо разбежалось!','#f4f0ff',2.6,'барашки бегут к свету — отведите их в кошару · тучки пугают барашков');later(1.2,()=>bark(T.pelageya,'pelageya','Бедные барашки — дрожат! Светим, ведём домой.',2.4));}
  function updHerd(dt){if(!F.herd||F.herdHome)return;let n=0;const scareAt=[];if(herdFoes)for(const e of herdFoes)if(e.alive&&e.state==='wind'&&e.tgt)scareAt.push(e.tgt.pos);
    HERD.forEach((s,i)=>{let tgt,sp=1.2;
      if(s.penned){n++;s.wander-=dt;if(s.wander<=0){s.wander=rand(1.5,3.5);const a=rand(0,Math.PI*2),r=rand(0,PEN.r-1.4);s.tgt.set(PEN.x+Math.cos(a)*r,PEN.y,PEN.z+Math.sin(a)*r);}tgt=s.tgt;}
      else{if(scareAt.some(p=>hd(p,s.pos)<4.5)&&s.flee<=0){s.flee=2.6;floatText(s.pos.clone().add(new V3(0,1.4,0)),'Бе-е! Гром!','#ffffff');}
        if(s.flee>0){s.flee-=dt;tgt=s.home;sp=6;}
        else{let L=s.lead&&heroLight(s.lead)&&hd(s.lead.pos,s.pos)<14&&Math.abs(s.lead.pos.y-s.pos.y)<3?s.lead:nearLit(s.pos,10,3);s.lead=L;if(L){const a=i/HERD.length*Math.PI*2+G.time*0.2;tgt=new V3(L.pos.x+Math.cos(a)*1.8,PEN.y,L.pos.z+Math.sin(a)*1.8);sp=hd(L.pos,s.pos)>5?5.6:4.2;}
          else{s.wander-=dt;if(s.wander<=0){s.wander=rand(2,5);s.tgt.set(s.home.x+rand(-1.8,1.8),PEN.y,s.home.z+rand(-1.8,1.8));}tgt=s.tgt;}}
        if(hd(s.pos,PEN)<PEN.r-0.7){s.penned=true;n++;SFX.ok();floatText(s.pos.clone().add(new V3(0,1.4,0)),'Бе! Дома!','#ffffff');}}
      const d=hd(s.pos,tgt);if(d>0.05){const k=Math.min(1,sp*dt/d);s.pos.x+=(tgt.x-s.pos.x)*k;s.pos.z+=(tgt.z-s.pos.z)*k;s.face=angDamp(s.face,Math.atan2(tgt.x-s.pos.x,tgt.z-s.pos.z),6,dt);}
      s.pos.x=clamp(s.pos.x,-11.5,11.5);s.pos.z=clamp(s.pos.z,-293.5,-256.5);
      s.m.g.position.set(s.pos.x,s.pos.y+(d>0.1?Math.abs(Math.sin(G.time*12+i))*0.12:0),s.pos.z);s.m.g.rotation.y=s.face;s.m.legs.forEach((l,k)=>{l.rotation.x=d>0.1?Math.sin(G.time*14+k*Math.PI)*0.5:0;});});
    F.penCount=n;if(!F.penned&&n>=HERD.length){F.penned=true;later(0.6,veterScene);}}
  function veterScene(){F.stage='veter';const hs=HEROES;hs.forEach((h,i)=>{placeOnGround(h,-3+i*2,-279,19.2);h.face=Math.PI;h.vel.set(0,0,0);});VT.g.position.set(-14,27,-292);VT.g.lookAt(0,20,-282);
    play({dur:13,fov:48,shots:[shot(0,[6,23.4,-274],[0,20,-285]),shot(3.4,[3,23,-276],[-14,27,-292]),shot(9.6,[0,24,-282],[0,21,-296],[0,25,-286],[0,23,-302],3.2)],
      says:[[0.3,2.8,null,'<i>Все девять барашков — в кошаре. Ветер подлетает поближе.</i>',true],[3.4,3.2,'veter','Ух, спасибо, малые! Я стадо по всему небу гонял — да только пуще разгонял.'],
        [6.7,3.0,'veter','А вожак, Громовой Баран, грозою обернулся: сынка ищет — своих не узнаёт. Там он, на вершине.'],[9.8,1.6,'pushok','Бе-е!'],[11.4,1.6,'pelageya','Пушок, это твой папа гремит!']],
      events:[{t:9.6,fn:()=>{SFX.whoosh();stormWall.on=false;anim(1.2,k=>{stormCurtain.position.x=k*16;stormCurtain.children.forEach(m=>{m.scale.multiplyScalar(0.985);});if(k>=1)stormCurtain.visible=false;});
          W.ramps.push(rampR);rampM.visible=true;rampM.scale.set(1,1,0.05);anim(1.4,k=>{rampM.scale.z=Math.max(0.05,k);});burst(new V3(0,21,-298),0xffffff,20,4);}}],
      end:()=>{F.stage='free';stormWall.on=false;stormCurtain.visible=false;if(W.ramps.indexOf(rampR)<0)W.ramps.push(rampR);rampM.visible=true;rampM.scale.set(1,1,1);snapCams();
        banner('Грозовая вершина','#9fd0ff',2.4,'облачная лестница — наверх, к Громовому Барану');}});}
  /* ---------- Л. Громовой Баран ---------- */
  function bossBar(){if(B.phase<1){bb.style.display='none';return;}bb.style.display='block';const e=B.e;const nm=['','Таран','Гроза','Пушок'][Math.min(3,B.phase)]||'';
    const hp=F.won?0:B.phase===3?(LB.mode==='free'?0.25:0.2):e?(e.state==='broken'?0.02:e.embers/e.maxEmb):1;
    bb.innerHTML='<b>Громовой Баран</b> · '+Math.max(1,Math.min(3,B.phase))+' / 3 · '+nm+' <span class="seg"><i style="width:'+Math.round(hp*100)+'%"></i></span>';}
  function bossIntro(){F.boss=1;F.stage='bossIntro';gateCol.on=true;gateFx.visible=true;const hs=HEROES;hs.forEach((h,i)=>{placeOnGround(h,-3+i*2,-307,AY);h.face=Math.PI;h.vel.set(0,0,0);});
    putLamb(LAMB_HIDE.x,AY,LAMB_HIDE.z);LB.mode='hide';
    const e=makeFoe('grombaran',0,-320,{y:AY,leash:40,scale:1.25});B.e=e;e.noKill=true;e.cd=99;e.face=0;e.maxEmb=e.embers;
    e.guardAll=()=>B.phase===3||(!e.litNow&&e.state!=='broken');e.darkGuard=()=>!e.litNow;e.guardText='шерсть грозовая — посвети пером!';
    e.tick=(e,dt)=>{e.litNow=litAt(e.pos.x,e.pos.y+1.2,e.pos.z,1.2);e.cd=99;ramAI(e,dt);};
    e.onFinisher=h=>{if(B.phase===1)toPhase2();else if(B.phase===2)toPhase3();};
    e.post=(e,dt)=>{const L=e.L;if(!L.storm)return;const sk=B.phase===1?1:B.phase===2?1.15:0.45;L.storm.forEach((m,i)=>{m.visible=sk>0.05;m.scale.setScalar((0.42+0.12*Math.abs(Math.sin(i*2.3)))*sk*(1+0.06*Math.sin(G.time*5+i)));});
      L.stormM.emissiveIntensity=0.3+0.4*Math.max(0,Math.sin(G.time*9));L.sparks.forEach((b,i)=>{b.visible=B.phase<3&&Math.sin(G.time*23+i*2.7)>0.6;});L.thread.visible=B.phase===3;if(L.thread.visible)L.thread.rotation.y+=dt*1.5;
      const run=B.ai==='charge',paw=B.ai==='paw';L.legs.forEach((l,k)=>{l.rotation.x=run?Math.sin(G.time*22+k*Math.PI)*0.7:paw&&k<2?Math.max(0,Math.sin(G.time*14+k*Math.PI))*0.6:0;});
      L.head.rotation.x=paw?0.35:B.ai==='stuck'||B.ai==='bonk'?0.25+Math.sin(G.time*12)*0.15:0;L.horns.forEach(hg=>{hg.children.forEach(c=>{if(c.material&&c.material.emissive)c.material.emissiveIntensity=paw?0.6+0.5*Math.sin(G.time*20):0.35;});});};
    if(FIN.music)FIN.music.play('boss');
    play({dur:12.6,fov:48,shots:[shot(0,[0,25.4,-300],[0,23.6,-318]),shot(3.4,[4,24,-312],[0,24.4,-320]),shot(7.6,[-5,23.6,-309],[0,23.2,-306.4]),shot(9.8,[0,26,-302],[0,23,-316])],
      says:[[0.3,3.0,null,'<i>На вершине — гроза. В середине её — огромный баран, шерсть искрит, рога горят.</i>',true],[3.5,2.6,'baran','Кто тут?! Где мой сынок?! Бе-е-е-е!'],
        [6.3,1.4,'pushok','Бе…'],[7.8,2.0,'yosha','Пушок спрятался. Боится!'],[9.9,2.6,'zven','Он бежит на свет! Встаньте у пухлого стожка — и в сторону!']],
      events:[{t:3.5,fn:()=>{SFX.crash();shakeAll(0.06,0.6);burst(e.pos.clone().add(new V3(0,2.4,0)),0x9fd0ff,24,5);}},{t:6.3,fn:()=>{LB.sq=0.5;}}],
      end:()=>{B.phase=1;B.ai='graze';B.t=0;B.dur=2.2;F.stage='boss';snapCams();bossBar();
        banner('Громовой Баран · Таран','#9fd0ff',2.8,'бежит на свет пера · пухлый стожок (польёт Йоша) — увязнет: в свете бей, Потап — за рога');}});}
  function pickTarget(){const c=targets();if(!c.length)return null;const e=B.e;const lit=c.filter(h=>heroLight(h));const L=lit.length?lit:c;let best=L[0],bd=1e9;for(const h of L){const d=hd(h.pos,e.pos);if(d<bd){bd=d;best=h;}}return best;}
  function laneDraw(on){const e=B.e,ln=B.lane;ln.visible=on;if(!on)return;const len=14;ln.scale.set(1,len,1);ln.position.set(e.pos.x+B.dir.x*len/2,AY+0.07,e.pos.z+B.dir.z*len/2);ln.rotation.z=-Math.atan2(B.dir.x,B.dir.z)+Math.PI;ln.material.opacity=0.25+0.35*Math.abs(Math.sin(G.time*10));}
  function ramAI(e,dt){if(G.cine||B.phase<1)return;if(e.state==='broken'||e.state==='spawn'||e.state==='dying'){laneDraw(false);return;}
    if(B.phase===2){stormAI(e,dt);return;}
    B.t+=dt;e.pos.y=AY;
    const face=(p,k)=>{e.face=angDamp(e.face,Math.atan2(p.x-e.pos.x,p.z-e.pos.z),k,dt);};
    switch(B.ai){
      case 'graze':{const h=pickTarget();if(h){face(h.pos,3);const d=hd(h.pos,e.pos);if(d>5){const sp=1.6*dt;e.pos.x+=(h.pos.x-e.pos.x)/d*sp;e.pos.z+=(h.pos.z-e.pos.z)/d*sp;}}
        if(B.t>B.dur&&h){B.ai='paw';B.t=0;B.tgt=h;B.dur=B.phase===3?(soloK()?1.35:1.0):(soloK()?1.7:1.3);SFX.red();floatText(e.pos.clone().add(new V3(0,3.6,0)),B.phase===3?'Бе-е-е!':'Разбегается!','#ff8a7a');}break;}
      case 'paw':{const h=B.tgt;if(B.t<B.dur-0.35&&h){face(h.pos,6);B.dir.set(h.pos.x-e.pos.x,0,h.pos.z-e.pos.z).normalize();}laneDraw(true);
        if(B.t>B.dur){B.ai='charge';B.t=0;B.speed=B.phase===3?13.5:12;B.hitSet.clear();B.dodged=new Set();laneDraw(false);SFX.whoosh();}break;}
      case 'charge':{const st=B.speed*dt;e.pos.x+=B.dir.x*st;e.pos.z+=B.dir.z*st;e.face=Math.atan2(B.dir.x,B.dir.z);if(Math.random()<dt*20)burst(e.pos.clone().add(new V3(rand(-0.6,0.6),0.3,rand(-0.6,0.6))),0xffffff,2,2,0.8);
        for(const S of SB){if(S.gone>0)continue;if(hd(S,e.pos)<e.r+(S.puffy?1.05:0.75)){if(S.puffy){B.ai='stuck';B.t=0;B.stog=S;e.dazeT=soloK()?8:6;SFX.thud();shakeAll(0.05,0.4);burst(new V3(S.x,AY+1,S.z),0xffffff,24,4);
              floatText(e.pos.clone().add(new V3(0,3.4,0)),'Увяз в облаке!','#e8f4ff');B.embAt=e.embers;if(!F.stuckTold){F.stuckTold=true;later(0.4,()=>say('zven',B.phase===3?'Увяз! Ведите Пушка — скорей!':'Увяз! В свете бейте — шерсть мягкая стала!',2.4,true));}}
            else{stogScatter32(S,6);B.ai='bonk';B.t=0;B.dur=1.0;floatText(e.pos.clone().add(new V3(0,3.4,0)),'Разметал стожок!','#ffffff');SFX.crash();if(!F.dryTold){F.dryTold=true;for(const pi of[0,1])tip(pi,'Сухой стожок Баран разметал! Пусть Йоша польёт его живой водой '+K(1,'skill')+' — пухлый стожок его удержит.',3.4);}}
            break;}}
        if(B.ai!=='charge')break;
        for(const h of HEROES){if(!h.active||B.hitSet.has(h))continue;if(hd(h.pos,e.pos)>e.r+0.45||Math.abs(h.pos.y-e.pos.y)>1.8)continue;B.hitSet.add(h);
          if(h.rollT>0||G.time-(h.lastRoll||-9)<0.45){floatText(headOf(h),'Увернулся!','#ffe36b');G.stats.dodges++;continue;}damageHero(h,{kind:'enemy',ref:e});}
        if(Math.abs(e.pos.x)>9.6||e.pos.z>-305.4||e.pos.z<-326.6||B.t>2.2){e.pos.x=clamp(e.pos.x,-9.6,9.6);e.pos.z=clamp(e.pos.z,-326.6,-305.4);B.ai='bonk';B.t=0;B.dur=B.phase===3?(soloK()?3:2.2):1.1;SFX.thud();shakeAll(0.03,0.25);
          floatText(e.pos.clone().add(new V3(0,3.4,0)),'Бум!','#ffffff');}
        if(B.phase===3&&LB.mode==='free'&&hd(LB.pos,e.pos)<3.4&&LB.scared<=0){LB.scared=2.6;floatText(LB.pos.clone().add(new V3(0,1.2,0)),'Бе-е! Страшно!','#f4f0ff');SFX.miss();}
        break;}
      case 'stuck':{if(B.phase===1&&e.state!=='broken'&&e.embers>0&&B.embAt-e.embers>=3&&e.dazeT>0){e.dazeT=0;floatText(e.pos.clone().add(new V3(0,3.6,0)),'Вырвался!','#ff8a7a');SFX.crash();shakeAll(0.04,0.3);}
        if(!(e.dazeT>0)&&e.state!=='broken'){if(B.stog)stogScatter32(B.stog,5);B.stog=null;B.ai='graze';B.t=0;B.dur=1.6;}break;}
      case 'bonk':{if(B.t>B.dur){B.ai='graze';B.t=0;B.dur=B.phase===3?1.0:rand(1.0,1.8);}break;}}}
  // Потап — «за рога»: пока Баран увяз
  W.lifts.push({pos:new V3(),active:()=>{const e=B.e;if(!e||!e.alive||B.ai!=='stuck'||B.phase!==1)return false;W.lifts[W.lifts.indexOf(hornLift)].pos.copy(e.pos);return hd(T.potap.pos,e.pos)<e.r+1.8;},
    onLift:h=>{const e=B.e;if(B.hornT>G.time)return;B.hornT=G.time+2;SFX.toss();shakeAll(0.06,0.45);ringFx(e.pos,0xc08a48,2.6);floatText(e.pos.clone().add(new V3(0,3.6,0)),'За рога!','#ffd9a0');
      if(e.state!=='broken')emberOut(e,2,'За рога!');if(!F.hornTold){F.hornTold=true;later(0.3,()=>bark(h,'potap','Взял быка… то есть барана — за рога!',2.4));}}});
  const hornLift=W.lifts[W.lifts.length-1];
  function toPhase2(){B.phase=1.5;laneDraw(false);const e=B.e;e.dazeT=0;e.state='idle';e.t=0;if(B.stog){stogScatter32(B.stog,3);B.stog=null;}
    play({dur:7.2,fov:50,shots:[shot(0,[0,26,-302],[0,24,-318],[0,27,-304],[0,29,-316],3),shot(3.2,[6,27,-306],[0,29.6,-316])],
      says:[[0.4,2.4,'baran','Не дамся! Грому-у-у!'],[3.2,3.6,'zven','Тучей обернулся! Радуга — дорога наверх: дождик впереди, солнышко позади!']],
      events:[{t:0.6,fn:()=>{const p0=e.pos.clone();SFX.crash();anim(1.6,k=>{e.pos.set(lerp(p0.x,ARC.x,k),lerp(AY,TOP.y+0.1,k)+Math.sin(k*Math.PI)*3,lerp(p0.z,ARC.z,k));});topG.visible=true;topG.scale.setScalar(0.1);anim(1.4,k=>{topG.scale.setScalar(Math.max(0.1,k));});}},
        {t:2.4,fn:()=>{shakeAll(0.05,0.5);for(let i=0;i<3;i++)later(i*0.25,()=>{SFX.crash();});}}],
      end:()=>{B.phase=2;topG.visible=true;topG.scale.setScalar(1);topCyl.on=true;e.pos.set(ARC.x,TOP.y,ARC.z);e.baseY=TOP.y;e.maxEmb=9;e.embers=9;e.state='idle';e.noMove=true;B.strikeT=2.4;B.stompT=-1;
        snapCams();bossBar();banner('Громовой Баран · Гроза','#9fd0ff',2.8,'молния бьёт в тень-круг — уйди или щит · радуга наверх: западную тучку польёт Йоша, восточную выжмет Потап');}});}
  function strike(at){const s={at:at.clone(),t:0,dur:soloK()?1.55:1.25,done:false};const g=new THREE.Group();g.position.set(at.x,AY+0.06,at.z);W.group.add(g);g.userData.noBatch=true;
    const disc=new THREE.Mesh(new THREE.CircleGeometry(1.5,28),MB(0x1a2a60,{transparent:true,opacity:0.2,depthWrite:false}));disc.rotation.x=-Math.PI/2;disc.renderOrder=4;g.add(disc);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.5,0.06,6,30),MB(0x9fd0ff,{transparent:true,opacity:0.9}));ring.rotation.x=Math.PI/2;g.add(ring);s.g=g;s.disc=disc;s.ring=ring;B.strikes.push(s);SFX.blue();}
  function updStrikes(dt){for(let i=B.strikes.length-1;i>=0;i--){const s=B.strikes[i];s.t+=dt;const k=s.t/s.dur;
      if(!s.done){s.disc.material.opacity=0.2+0.45*k;s.ring.scale.setScalar(1-0.4*k+0.05*Math.sin(G.time*30));
        if(k>=1){s.done=true;s.t=0;const top=new V3(s.at.x,AY+12,s.at.z);const bm=MB(0xfff6a0);const bolt=new THREE.Group();let p=top.clone();for(let j=0;j<6;j++){const q=new V3(s.at.x+rand(-0.5,0.5),AY+12-(j+1)*2,s.at.z+rand(-0.5,0.5));if(j===5)q.set(s.at.x,AY,s.at.z);
            const len=p.distanceTo(q),seg=new THREE.Mesh(new THREE.BoxGeometry(0.14,len,0.14),bm);seg.position.copy(p).lerp(q,0.5);seg.quaternion.setFromUnitVectors(new V3(0,1,0),q.clone().sub(p).normalize());bolt.add(seg);p=q;}
          W.group.add(bolt);s.bolt=bolt;SFX.crash();shakeAll(0.04,0.25);ringFx(s.at.clone().setY(AY),0x9fd0ff,2);burst(s.at.clone().setY(AY+0.3),0xfff6a0,14,5);
          for(const h of HEROES){if(!h.active||hd(h.pos,s.at)>1.6||Math.abs(h.pos.y-AY)>1.5)continue;if(h.guard){SFX.shield();floatText(headOf(h),'Щит! Молния мимо!','#cfe8ff');continue;}damageHero(h,{kind:'hazard',ref:{pos:s.at}});}}}
      else{if(s.bolt)s.bolt.visible=s.t<0.18&&Math.sin(G.time*60)>-0.5;s.disc.material.opacity=Math.max(0,0.65-s.t*2);if(s.t>0.4){W.group.remove(s.g);if(s.bolt)W.group.remove(s.bolt);B.strikes.splice(i,1);}}}}
  function stormAI(e,dt){e.pos.set(ARC.x,TOP.y+Math.sin(G.time*1.4)*0.05,ARC.z);B.shut=Math.max(0,(B.shut||0)-dt);if(e.litNow&&B.shut<=0&&e.state!=='broken')e.open=Math.max(e.open,0.25);e.face+=dt*0.4;topBolts.forEach((b,i)=>{b.visible=Math.sin(G.time*17+i*2.2)>0.75;});
    B.strikeT-=dt;if(B.strikeT<=0){const c=targets().filter(h=>Math.abs(h.pos.y-AY)<1.5&&inArena(h.pos));if(c.length){const h=c[Math.floor(Math.random()*c.length)];strike(h.pos);}B.strikeT=soloK()?3.4:2.5;}
    const onTop=HEROES.filter(h=>h.active&&h.pos.y>TOP.y-0.6&&hd(h.pos,ARC)<3.8);
    if(onTop.length){if(B.stompT<0)B.stompT=soloK()?3.2:2.6;B.stompT-=dt;const tel=1.1;
      if(B.stompT<tel&&B.stompT>0){B.stompRing.visible=true;const k=1-B.stompT/tel;B.stompRing.position.set(ARC.x,TOP.y+0.1,ARC.z);B.stompRing.scale.setScalar(0.6+k*2.9);if(!B.stompSaid){B.stompSaid=true;SFX.red();floatText(e.pos.clone().add(new V3(0,3.4,0)),'Топну — сдую!','#bfe4ff');}}
      if(B.stompT<=0){B.stompRing.visible=false;B.stompSaid=false;B.shut=1.2;B.stompT=soloK()?3.6:2.9;SFX.thud();shakeAll(0.05,0.3);ringFx(new V3(ARC.x,TOP.y+0.1,ARC.z),0xbfe4ff,3.2);
        for(const h of onTop){if(!h.grounded){floatText(headOf(h),'Перепрыгнул!','#ffe36b');continue;}const dx=h.pos.x-ARC.x,dz=h.pos.z-ARC.z,d=Math.hypot(dx,dz)||1;h.vel.set(dx/d*8,7,dz/d*8);h.grounded=false;h.knockT=0.5;floatText(headOf(h),'Сдуло!','#bfe4ff');
          if(!F.stompTold){F.stompTold=true;for(const pi of[0,1])tip(pi,'Кольцо по туче бежит — прыгай '+K(pi,'jump')+', не то сдует!',2.6);}}}}
    else{B.stompT=-1;B.stompRing.visible=false;B.stompSaid=false;}}
  function toPhase3(){B.phase=2.5;const e=B.e;B.strikes.forEach(s=>{W.group.remove(s.g);if(s.bolt)W.group.remove(s.bolt);});B.strikes.length=0;B.stompRing.visible=false;
    play({dur:9.4,fov:48,shots:[shot(0,[0,27,-303],[0,26,-316]),shot(3.2,[5,24.4,-310],[0,23.2,-318]),shot(6.2,[-3,23.8,-308],[0,23,-306.4],[-2,24.6,-309],[0,23.4,-314],3)],
      says:[[0.3,2.6,null,'<i>Гроза иссякла — Баран падает на облако. Только на рогах чёрная нить держится.</i>',true],[3.3,2.6,'baran','Бе-е… Где я? Кто вы?! Не подходи!'],
        [6.2,1.4,'pushok','Бе-е-е!'],[7.6,1.8,'pelageya','Он своих не узнаёт. Пушок, позови папу!']],
      events:[{t:0.5,fn:()=>{const p0=e.pos.clone();anim(1.3,k=>{e.pos.set(p0.x,lerp(p0.y,AY,k*k),lerp(p0.z,-318,k));});topCyl.on=false;anim(1.4,k=>{topG.scale.setScalar(Math.max(0.05,1-k));if(k>=1)topG.visible=false;});
          HEROES.forEach(h=>{if(h.pos.y>AY+2){placeOnGround(h,h.pos.x*2.2,ARC.z+4,AY);}});}},
        {t:1.8,fn:()=>{SFX.thud();shakeAll(0.07,0.5);burst(new V3(0,AY+0.4,-318),0xffffff,30,5);}},{t:6.2,fn:()=>{LB.sq=0.6;}}],
      end:()=>{B.phase=3;e.pos.set(0,AY,-318);e.baseY=AY;e.noMove=false;e.state='idle';e.maxEmb=6;e.embers=6;B.ai='graze';B.t=0;B.dur=1.6;topCyl.on=false;topG.visible=false;LB.mode='free';LB.scared=0;snapCams();bossBar();
        banner('Громовой Баран · Пушок','#f4f0ff',2.8,'подведите Пушка к батюшке, пока тот увяз в стожке иль стоит · Пушок бежит за светом');}});}
  function finale(){F.won=true;F.stage='end';B.phase=4;laneDraw(false);const e=B.e;bossBar();
    HEROES.forEach((h,i)=>{placeOnGround(h,-4+i*2.6,-310,AY);h.face=Math.PI;h.vel.set(0,0,0);});LB.puffT=0;LB.scared=0;putLamb(e.pos.x+Math.sin(e.face)*1.8,AY,e.pos.z+Math.cos(e.face)*1.8);
    const sky0=scene.background.clone(),sky1=new THREE.Color(0x8a86d0);const bigBow=rainbow32([-16,AY-6,-336],[16,AY-6,-336],14,3.2);bigBow.m.renderOrder=1;
    play({dur:20,fov:46,shots:[shot(0,[3.2,24,-313],[e.pos.x,AY+1.2,e.pos.z]),shot(5.2,[0,24.6,-309],[0,24,-320]),shot(9.6,[-6,25,-306],[0,26,-332],[-3,27,-305],[0,28,-336],4),shot(14.4,[2.4,24,-312],[0,23.6,-316])],
      says:[[0.3,1.6,'pushok','Бе-е! Папа!'],[2.2,2.8,null,'<i>Баран опускает голову — и чёрная нить на рогах лопается.</i>',true],[5.3,2.8,'baran','Пушок?.. Сынок! Нашёлся… Гроза во мне гремела — своих не видел.'],
        [8.4,1.4,'pushok','Бе-е-е!'],[9.9,3.0,'veter','Ветер, ветер, я могуч — да без друзей не разогнал бы туч!'],[13.2,1.8,'zven','Дзинь! Стадо — вместе!'],
        [15.2,3.6,'baran','Спасибо, малые. Держите — с радуги звено. А тучи впредь пусть поят землю, а не пугают.']],
      events:[{t:2.2,fn:()=>{SFX.rip();SFX.unravel();e.L.thread.visible=false;for(let i=0;i<10;i++)spawnSpark(e.pos.clone().add(new V3(0,2.6,0.8)),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);if(typeof CINE!=='undefined'&&CINE.flashDip)CINE.flashDip('#fff6d8',0.4);}},
        {t:3.4,fn:()=>{const L=e.L;anim(2.2,k=>{L.storm.forEach((m,i)=>{m.position.y+=0.04;m.scale.multiplyScalar(0.97);});if(k>=1)L.storm.forEach(m=>{m.visible=false;});});L.storm.forEach(m=>{m.visible=true;});
          for(let i=0;i<4;i++)later(i*0.4,()=>{if(typeof FX!=='undefined'&&FX.drops)FX.drops(e.pos.clone().add(new V3(rand(-1,1),3,rand(-1,1))),14);});SFX.water();}},
        {t:5.3,fn:()=>{LB.sq=0.8;}},
        {t:9.6,fn:()=>{VT.g.position.set(-12,32,-334);VT.g.lookAt(0,24,-316);WIND.st='blow';WIND.t=2.4;SFX.whoosh();bigBow.k=0;SFX.flower();
          HERD.forEach((s,i)=>{s.penned=false;s.flee=0;s.pos.set(rand(-2,2),AY,-300-rand(0,3));s.home=new V3(e.pos.x+Math.cos(i/9*Math.PI*2)*3,AY,e.pos.z+Math.sin(i/9*Math.PI*2)*3);s.tgt=s.home.clone();});F.herdHome=true;}},
        {t:13.2,fn:()=>{if(typeof FX!=='undefined'&&FX.confetti)FX.confetti(new V3(0,AY+2,-314),40);SFX.ok();}},
        {t:16.6,fn:()=>{L4.locked=false;L4.g.visible=true;const p1=new V3(0,AY+1.2,-312);L4.g.position.set(0,AY+12,-330);anim(2.2,k=>{L4.g.position.set(0,lerp(AY+12,p1.y,smooth(k))+Math.sin(k*Math.PI)*2,lerp(-330,p1.z,smooth(k)));});L4.pos.copy(p1);SFX.dzin();}}],
      tick:(t,dt)=>{scene.background.lerpColors(sky0,sky1,clamp((t-3)/6,0,1));scene.fog.color.copy(scene.background);if(t>9.6){bigBow.m.visible=true;bigBow.k=Math.min(1,(t-9.6)/1.5);bigBow.mat.opacity=0.75*bigBow.k;}
        const h=HERD;if(F.herdHome)h.forEach((s,i)=>{const d=hd(s.pos,s.home);if(d>0.1){const k=Math.min(1,5*(dt||0.016)/d);s.pos.lerp(s.home,k);}s.m.g.position.set(s.pos.x,s.pos.y+(d>0.1?Math.abs(Math.sin(G.time*12+i))*0.12:0),s.pos.z);s.m.g.rotation.y=Math.atan2(e.pos.x-s.pos.x,e.pos.z-s.pos.z);});},
      end:()=>{L4.locked=false;L4.g.visible=true;L4.g.position.set(0,AY+1.2,-312);L4.pos.copy(L4.g.position);gateCol.on=false;gateFx.visible=false;scene.background.copy(sky1);scene.fog.color.copy(sky1);
        bigBow.m.visible=true;bigBow.mat.opacity=0.75;if(FIN.music)FIN.music.play(null);F.stage='link';snapCams();bb.style.display='none';
        banner('Стадо вместе!','#ffe08a',2.4,'звено с радуги — возьмите');}});}
  /* ---------- Пушок: за светом, пружинка, прыжки через щели ---------- */
  function lambBounce(){if(LB.mode==='caught')return;const top=LB.pos.y+(LB.puffT>0?1.0:0.62);
    for(const h of HEROES){if(h.vel.y>-0.5||h.cling)continue;if(hd(h.pos,LB.pos)>(LB.puffT>0?1.0:0.8))continue;if(h.pos.y>top+0.3||h.pos.y<top-0.6)continue;
      if(h.kind==='potap'&&!(LB.puffT>0)){if(!(h.lambSqT>G.time)){h.lambSqT=G.time+3;LB.sq=0.9;floatText(LB.pos.clone().add(new V3(0,1.3,0)),'Бе! Тяжело!','#f4f0ff');if(!F.potapLambTold){F.potapLambTold=true;tip(h.player,'Потапа маленький Пушок не держит. Пусть Йоша польёт его живой водой — распушится, станет пружинкой и для Потапа.',3.6);}}continue;}
      const v=LB.puffT>0?(h.kind==='potap'?14.6:15.6):12.4;h.vel.y=v;h.vel.x+=Math.sin(h.face)*1.6;h.vel.z+=Math.cos(h.face)*1.6;h.grounded=false;h.groundRef=null;h.coyote=0;h.pos.y=top+0.05;h.tossT=0.6;LB.sq=1;SFX.toss();tone(LB.puffT>0?520:700,0.15,'sine',0.08,LB.puffT>0?1040:1200);
      floatText(LB.pos.clone().add(new V3(0,1.4,0)),LB.puffT>0?'Пружинка!':'Скок!','#f4f0ff');if(!F.bounceTold&&LB.puffT>0){F.bounceTold=true;later(0.4,()=>bark(T.yosha,'yosha','Пушок — пружинка! Полью — и прыгай!',2.2));}}}
  function lambHop(to){const from=LB.pos.clone();LB.hop={from,to:to.clone(),t:0,dur:0.9};SFX.toss();floatText(from.clone().add(new V3(0,1.2,0)),'Скок-поскок!','#f4f0ff');}
  function updLamb(dt){const L=LB;L.sq=Math.max(0,L.sq-dt*3);L.puffT=Math.max(0,L.puffT-dt);L.scared=Math.max(0,L.scared-dt);
    if(L.mode==='caught'){L.body.position.y=Math.abs(Math.sin(G.time*20))*0.02;L.thr.rotation.y+=dt;
      const lit=HEROES.filter(h=>heroLight(h)&&hd(h.pos,L.pos)<4.5&&Math.abs(h.pos.y-L.pos.y)<2).length;if(lit>=2&&!G.cine&&!F.lambFree)lambScene();
      else if(lit===1&&!F.lambOneTold){F.lambOneTold=true;for(const pi of[0,1])tip(pi,'Нить толстая — одного пера мало. Зажгите рядом два пера'+(G.solo?': зажги, смени героя '+K(pi,'swap')+' и зажги второе.':'.'),3.4);}}
    else if(L.hop){const H=L.hop;H.t+=dt;const k=Math.min(1,H.t/H.dur);L.pos.lerpVectors(H.from,H.to,k);L.pos.y+=Math.sin(k*Math.PI)*Math.max(2,Math.abs(H.to.y-H.from.y)+1.5);if(k>=1){L.pos.copy(H.to);L.hop=null;L.sq=0.6;}}
    else if(!G.cine){let tgt=null,sp=3.4,stop=2.2;
      if(L.mode==='hide'||(L.scared>0&&inArena(L.pos))){tgt=LAMB_HIDE;sp=5;stop=0.3;}
      if(!tgt){const lit=nearLit(L.pos,14,3.5);if(lit){tgt=lit.pos;sp=5.2;stop=1.5;}else{let a=null,bd=1e9;for(const h of targets()){const d=hd(h.pos,L.pos);if(d<bd){bd=d;a=h;}}if(a){tgt=a.pos;stop=2.6;}}}
      let moving=false;
      if(tgt){const dx=tgt.x-L.pos.x,dz=tgt.z-L.pos.z,d=Math.hypot(dx,dz);
        const lead=G.solo?active(G.soloPi):(nearLit(L.pos,60,40)||active(0));const far=lead&&(hd(lead.pos,L.pos)>18||Math.abs(lead.pos.y-L.pos.y)>2.2);
        if(far&&lead.grounded&&!(lead.groundRef&&lead.groundRef.cloud)&&L.mode!=='hide'){L.stuck+=dt;if(L.stuck>1.2){L.stuck=0;const g=groundAt(lead.pos.x-Math.sin(lead.face)*1.4,lead.pos.z-Math.cos(lead.face)*1.4,lead.pos.y+1);
            lambHop(new V3(lead.pos.x-Math.sin(lead.face)*1.4,g.y>lead.pos.y-1.5?g.y:lead.pos.y,lead.pos.z-Math.cos(lead.face)*1.4));}}
        else L.stuck=0;
        if(!L.hop&&d>stop){const st=Math.min(d-stop,sp*dt),nx=L.pos.x+dx/d*st,nz=L.pos.z+dz/d*st,g=groundAt(nx,nz,L.pos.y+0.5);
          if(g.y>L.pos.y-1.0&&g.y<L.pos.y+0.5){L.pos.x=nx;L.pos.z=nz;L.pos.y=g.y;moving=true;}L.face=angDamp(L.face,Math.atan2(dx,dz),8,dt);}}
      const g0=groundAt(L.pos.x,L.pos.z,L.pos.y+0.5);if(!L.hop&&g0.y<L.pos.y-0.6){L.pos.y=Math.max(g0.y,L.pos.y-dt*12);if(L.pos.y<8){const a=G.solo?active(G.soloPi):active(0);putLamb(a.pos.x+1,a.pos.y,a.pos.z+1);}}
      L.walk=moving;}
    const s=L.puffT>0?1.7:1,sq=L.sq;L.g.position.copy(L.pos);L.g.rotation.y=L.face;L.body.scale.set(s*(1+0.25*sq),s*(1-0.35*sq),s*(1+0.25*sq));
    L.wool.emissiveIntensity=L.puffT>0?0.3+0.15*Math.sin(G.time*6):0.12;if(L.mode!=='caught')L.body.position.y=L.walk?Math.abs(Math.sin(G.time*14))*0.06:0;
    L.legs.forEach((l,k)=>{l.rotation.x=L.walk?Math.sin(G.time*16+k*Math.PI)*0.6:0;});L.head.rotation.x=L.scared>0?-0.3:L.walk?0:0.2+Math.sin(G.time*2)*0.1;
    lambBounce();}
  W.waterTargets.push({pos:LB.pos,pri:0.6,active:()=>LB.mode!=='caught'&&!LB.hop&&!(LB.puffT>0.5)&&Math.abs(T.yosha.pos.y-LB.pos.y)<1.8,onWater:()=>{LB.puffT=soloK()?20:15;LB.sq=0.7;SFX.water();SFX.grow();burst(LB.pos.clone().add(new V3(0,0.8,0)),0xffffff,18,3);floatText(LB.pos.clone().add(new V3(0,1.8,0)),'Распушился! Пружинка!','#e8f4ff');}});
  /* ---------- главный шаг уровня ---------- */
  W.updates.push(dt=>{
    if(F.stage==='walk'&&[0,1].some(pi=>active(pi).pos.z<4)){F.stage='free';}
    const Y=T.yosha,P=T.potap;
    if(!F.trap&&P.groundRef===C4&&C4.puffy&&Y.active&&hd(Y.pos,C4)<7&&Math.abs(Y.pos.y-5)<1.2&&Y.pos.z>-33.1)trapArm();
    if(F.trap==='armed'){if(Y.groundRef===C5&&!C5.puffy)trapFall();else if(Y.groundRef===C4)trapRide();else if(Y.groundRef===C5)F.trap='own';}
    if(F.yoshaFloat){if(Y.vel.y<-3)Y.vel.y=-3;Y.extraY=0;if(Y.grounded&&Y.pos.y<0){F.yoshaFloat=false;F.yoshaLow=true;F.lowT=0;}}
    if(F.yoshaLow){F.lowT+=dt;if(Y.pos.y>9.5&&Y.pos.z<-37){F.yoshaLow=false;W.noCarry.splice(W.noCarry.indexOf(F.noCarry),1);later(0.5,()=>bark(Y,'yosha','Ну и ладно. В другой раз… подожду.',2.8));}}
    if(!F.fight&&[0,1].some(pi=>active(pi).pos.z<-67.2&&active(pi).pos.y>9))spawnStorm();
    if(F.fight&&!F.cleared&&arena.every(e=>!e.alive)){F.cleared=true;SFX.ok();banner('Гроза прошла!','#9fd0ff',2,'последнее облако — ввысь');}
    // новые участки: упал с высоких облаков — назад к колокольчику, не дожидаясь моря облаков внизу
    for(const h of HEROES)if(h.pos.z<-110.5&&h.pos.y<9&&!h.grounded&&!G.cine)onFall(h);
    for(const S of W.stogs)if(S.gone>0){S.gone-=dt;if(S.gone<=0){S.g.visible=true;S.cyl.on=true;anim(0.5,k=>{S.g.scale.setScalar(Math.max(0.05,k));});}}
    updLamb(dt);
    if(!F.windSeen&&F.lambFree&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-145.5&&active(pi).pos.y>18.5))windScene();
    updWind(dt);
    for(const R of W.rains)updRain32(R,dt);
    if(!F.herd&&[0,1].some(pi=>active(pi).pos.z<-257&&active(pi).pos.y>18.5))herdStart();
    updHerd(dt);
    if(!F.boss&&F.penned&&!G.cine&&[0,1].some(pi=>inArena(active(pi).pos)&&active(pi).pos.z<-305.2))bossIntro();
    if(B.phase>=1&&B.phase<4){updStrikes(dt);bossBar();const e=B.e;
      if(B.phase===3&&e&&!G.cine&&LB.mode==='free'&&!LB.hop&&LB.scared<=0&&hd(LB.pos,e.pos)<e.r+1.5&&B.ai!=='paw'&&B.ai!=='charge')finale();
      const dark=B.phase===2?1:B.phase===1?0.6:0.3;scene.background.lerp(new THREE.Color(0x2a2a52).lerp(new THREE.Color(0x4a4488),1-dark),dt*1.5);scene.fog.color.copy(scene.background);}
    if(F.stage==='link'&&L4.taken&&!F.out){F.out=true;later(0.6,()=>{banner('Облачные пастбища','#ffe08a',2.4,'в лавке у Векши — тулупчик-облачко, загляни!');later(1.8,finishLevel);});}});
  /* ---------- рисунки кнопок ---------- */
  const onC=(h,c)=>h.groundRef===c;
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>!h().lit&&W.clouds.some(c=>onC(h(),c)&&c.y<c.ceil-0.5),'посвети — облако поднимется');
    prompt(pi,'jump',()=>headOf(h()),()=>W.clouds.some(c=>onC(h(),c)&&c.y>=c.ceil-0.05),'прыгай!');
    prompt(pi,'item',()=>headOf(h()),()=>!h().lit&&hd(h().pos,{x:0,z:-54.2})<1.5&&h().pos.y>9.8&&!flock.on,'посвети — барашки придут');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help)||W.bolts.some(b=>b.tgt===h()&&!b.refl&&b.eta<0.8));
    prompt(pi,'item',()=>headOf(h()),()=>!h().lit&&W.enemies.some(e=>e.alive&&!e.litNow&&e.kind!=='grombaran'&&hd(e.pos,h().pos)<5),'посвети');
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<4+(e.r||0)&&(e.state==='broken'||(e.litNow&&(e.open>0||e.dazeT>0)))&&!(e.kind==='grombaran'&&B.phase===3)),'');
    prompt(pi,'item',()=>headOf(h()),()=>LB.mode==='caught'&&!h().lit&&hd(h().pos,LB.pos)<5,'два пера рядом');
    prompt(pi,'jump',()=>headOf(h()),()=>LB.mode!=='caught'&&LB.puffT>0&&hd(h().pos,LB.pos)<2.4&&h().grounded,'на Пушка!');
    prompt(pi,'item',()=>headOf(h()),()=>!h().lit&&W.rains.some(R=>R.rain>0&&!R.bow.on&&hd(R,h().pos)<6.5&&((h().pos.x-R.x)*R.dx+(h().pos.z-R.z)*R.dz)<0.8),'солнышко позади');
    prompt(pi,'roll',()=>headOf(h()),()=>B.ai==='paw'&&B.tgt===h()&&B.phase!==2,'в сторону!');
    prompt(pi,'jump',()=>headOf(h()),()=>B.phase===2&&B.stompT>0&&B.stompT<1.1&&h().pos.y>TOP.y-0.6,'прыгай!');
    prompt(pi,'guard',()=>headOf(h()),()=>B.strikes.some(s=>!s.done&&hd(s.at,h().pos)<1.7),'щит');
    prompt(pi,'item',()=>headOf(h()),()=>!h().lit&&B.phase===3&&hd(h().pos,LB.pos)<6&&LB.mode==='free','позови Пушка светом');}
  prompt(1,'skill',()=>headOf(T.yosha),()=>T.yosha.active&&W.waterTargets.some(w=>w.active()&&hd(w.pos,T.yosha.pos)<3),'живая вода');
  prompt(0,'skill',()=>headOf(T.potap),()=>T.potap.active&&W.rains.some(R=>R.potap&&(!R.on||R.on())&&R.rain<=0.3&&hd(R,T.potap.pos)<2.3),'выжми тучку');
  prompt(0,'skill',()=>headOf(T.potap),()=>T.potap.active&&B.ai==='stuck'&&B.phase===1&&B.e&&hd(T.potap.pos,B.e.pos)<B.e.r+1.8,'за рога!');
  prompt(1,'label',()=>new V3(C4.x,C4.y+2.3,C4.z),()=>F.trap==='armed'&&Math.sin(G.time*8)>-0.3,'облако Потапа');
  prompt(1,'label',()=>new V3(C5.x,C5.y+2.3,C5.z),()=>F.trap==='armed'&&Math.sin(G.time*8+1.5)>-0.3,'соседнее, не полито');
  prompt(0,'label',()=>new V3(VT.g.position.x+2,VT.g.position.y+3.6,VT.g.position.z+2),()=>WIND.st==='inhale','сейчас дунет!');
  /* ---------- задачи ---------- */
  const ramText=pi=>B.phase<=1?'Громовой Баран бежит на свет! Встань со светом перед <b>пухлым</b> стожком (польёт Йоша '+K(1,'skill')+') — и в сторону '+K(pi,'roll')+'.<br>Увяз — в свете бей '+K(pi,'attack')+', а Потап — за рога '+K(0,'skill')+'.':
    B.phase<=2?'Баран на грозовой туче. Радуга — дорога наверх: дождик впереди, солнышко (перо) позади.<br>Молния бьёт в тень-круг — уйди или щит '+K(pi,'guard')+'; на туче бей в свете, от топота — прыгай '+K(pi,'jump')+'.':
    'Баран своих не узнаёт. Подведите Пушка к батюшке светом пера '+K(pi,'item')+' — когда тот увяз в пухлом стожке или стоит.';
  const mk=pi=>[
    O(()=>'Облачные пастбища! Звенья высоко висят.<br>Облака тепло любят: встань на облачко, зажги перо '+K(pi,'item')+' — подымет, как в сказке говорят.',()=>C1.y>3||L1.taken||active(pi).pos.z<-10.5,()=>[C1.g,L1.g],()=>({kind:active(pi).kind,action:'jump',from:new V3(3.2,0,-3.6),to:new V3(5,0.52,-5)})),
    O(pi?()=>'Облако к лугу повыше. Потап тяжёл. Смени на Йошу '+K(1,'swap')+', живой водой '+K(1,'skill')+' облако полей —<br>Станет пухлым, не растает и Потапа выдержит, ей-ей.':()=>'Облако к лугу повыше: встань да посвети.<br>Потап тяжёл — облако для него Йоша пухлым сделает в пути.',
      ()=>active(pi).pos.z<-16.3&&active(pi).pos.y>4.5,()=>[C2.g]),
    O(()=>'Высокое звено над облаком. Поднятое облако тает за пятнадцать секунд —<br>А перед тем мигает: мол, берегитесь, вот-вот капут.',()=>L2.taken||active(pi).pos.z<-31,()=>[C3.g,L2.g]),
    O(pi?()=>'Обрыв и два облака. Потап к себе зовёт. На какое облако Йоша пойдёт?':()=>'Обрыв и два облака. Потапа на пухлое облако поставь, посвети.<br>Кликни Йошу — довезёшь в пути.',()=>active(pi).pos.y>9.5&&active(pi).pos.z<-37.8,()=>[C4.g,C5.g]),
    O(()=>'Облачные барашки к свету бегут. Зажги перо '+K(pi,'item')+' на холмике у края —<br>Барашки мостиком встанут. Погасишь — разбегутся, играя.',()=>active(pi).pos.z<-66.5,()=>[flock.list[0].m.g],()=>({kind:active(pi).kind,action:'walk',from:new V3(-2,10,-50),to:new V3(0,10.25,-54.2)})),
    O(()=>'Грозовые тучки! Во тьме их не пробить — посвети '+K(pi,'item')+'.<br>Синяя молния: щитом '+K(pi,'guard')+' закройся, а в последний миг — назад отбей, не спи!',()=>F.cleared,()=>arena?arena.filter(e=>e.alive).map(e=>e.g):[]),
    O('Последнее облако — наверх!',()=>F.lambFree||active(pi).pos.y>14.5&&active(pi).pos.z<-96,()=>[C6.g]),
    O(()=>'На облаке ягнёнок дрожит — в грозовой нити запутан.<br>Два пера рядом зажгите '+K(pi,'item')+' — от тепла нить растает.',()=>F.lambFree,()=>[LB.g]),
    O(()=>'Высокий уступ. Пушок — облачко живое: польёт Йоша '+K(1,'skill')+' — распушится, станет пружинкой.<br>Пушок бежит за светом пера; прыгай на него '+K(pi,'jump')+' — подкинет, даже Потапа.',()=>active(pi).pos.y>18.6&&active(pi).pos.z<-128.4,()=>[LB.g]),
    O(()=>'Ветер-Ветрило дует поперёк мостков! Надул щёки — прячься за Потапа или за стожок.<br>Потапа не сдвинет, и перо у него не задует: светомостки держит его свет.',()=>active(pi).pos.z<-188.6&&active(pi).pos.y>18.5,()=>[VT.g]),
    O(()=>'Радуга-дуга: солнце за спиной, дождик впереди. Йоша, полей тучку '+K(1,'skill')+' (Потап — выжми '+K(0,'skill')+'),<br>а кто-то пусть светит пером '+K(pi,'item')+' позади тучки. По радуге идите, пока дождик идёт.',()=>active(pi).pos.z<-214.4&&active(pi).pos.y>18.5,()=>[R1.g]),
    O(()=>'Две радуги: тучку-дождевичок польёт Йоша, а тучку-толстушку на островке выжмет только Потап '+K(0,'skill')+'.',()=>active(pi).pos.z<-256.4&&active(pi).pos.y>18.5,()=>[R2.g,R3.g]),
    O(()=>'Стадо разбежалось! Барашки бегут к свету пера '+K(pi,'item')+' — отведите всех в кошару ('+(F.penCount||0)+' из 9).<br>Тучки громом пугают барашков — в свете тучки мягкие, бейте.',()=>F.penned,()=>F.penned?[]:HERD.filter(s=>!s.penned).slice(0,3).map(s=>s.m.g)),
    O(()=>F.boss?ramText(pi):'Облачная лестница — наверх, на Грозовую вершину.',()=>F.won,()=>B.e&&B.e.alive?[B.e.g]:[rampM]),
    O('Звено с радуги — возьми!',()=>false,()=>[L4.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>h.pos.y<-0.5&&h.pos.y>-6&&h.pos.z<-10&&h.pos.z>-17.5,text:pi=>'Нижний луг. Облачная лестница справа наверх ведёт.'},
    {cond:(pi,h)=>h.pos.y<4&&h.pos.z<-30&&h.pos.z>-60&&h.pos.x<9,text:pi=>'Ты внизу, на лугу под обрывом. Наверх — по облачной лестнице справа, вперёд.'},
    {cond:(pi,h)=>W.clouds.some(c=>h.groundRef===c&&!c.puffy&&c.meltT>9),text:pi=>'Облако мигает — сейчас растает! Прыгай иль спускайся!'},
    {cond:(pi,h)=>F.lambFree&&h.pos.z<-121&&h.pos.z>-128.5&&h.pos.y<16,text:pi=>'Уступ высок. Пусть Пушок подбежит на свет пера, Йоша польёт его '+K(1,'skill')+' — и прыгайте на него '+K(pi,'jump')+'.'+(G.solo?'<br>В одиночку: оставь героя со светом у уступа — Пушок останется с ним.':'')},
    {cond:(pi,h)=>h.kind==='yosha'&&W.rains.some(R=>R.tolst&&(!R.on||R.on())&&R.rain<=0&&hd(R,h.pos)<4),text:pi=>'Тучку-толстушку живой водой не пронять — её Потап выжмет '+K(0,'skill')+'.'},
    {cond:(pi,h)=>F.herd&&!F.penned&&h.pos.z<-256&&h.pos.z>-294&&!h.lit,text:pi=>'Барашки бегут к свету пера '+K(pi,'item')+'. Зажги — и веди их в кошару.'+(G.solo?'<br>Кто в кошаре — там и останется.':'')});
  W.spawns=[[new V3(-2.6,0,5),new V3(-4.6,0,6)],[new V3(2.6,0,5),new V3(4.6,0,6)]];W.startAct=[0,0];
  W.pauseLine='Облачные пастбища: облако под горящим пером подымается, во тьме — опускается; поднятое за пятнадцать секунд тает.<br>Живая вода Йоши делает облако (и ягнёнка Пушка) пухлым. Барашки бегут к свету.<br>Ветер сдувает, но не Потапа; радуга встаёт, когда солнце позади, а дождик впереди.';
  // для ботов и разработки: FIN.warp('lamb'|'cliff'|'wind'|'rainbow'|'rainbow2'|'pen'|'boss')
  W.warp32=(where)=>{const P={lamb:[0,-99,15],cliff:[0,-116,15],wind:[0,-140,19.2],rainbow:[0,-194,19.2],rainbow2:[0,-219,19.2],pen:[0,-259,19.2],boss:[0,-300.5,21.6]}[where];if(!P)throw new Error('нет участка '+where);
    if(where!=='lamb'&&!F.lambFree){F.lambFree=true;LB.thr.visible=false;LB.mode='free';}if(where==='wind'||where==='rainbow'||where==='rainbow2'||where==='pen'||where==='boss')F.windSeen=true;
    if(where==='boss'){F.herd=true;F.penned=true;HERD.forEach(s=>{s.penned=true;s.pos.set(PEN.x+rand(-1.5,1.5),PEN.y,PEN.z+rand(-1.5,1.5));});stormWall.on=false;stormCurtain.visible=false;if(W.ramps.indexOf(rampR)<0)W.ramps.push(rampR);rampM.visible=true;}
    FIN.warpTo(P[0],P[1],P[2]);for(const pi of[0,1])players[pi].cp.set(P[0],P[2],P[1]);if(LB.mode!=='caught')putLamb(P[0]+1.5,P[2],P[1]+1);};
  W.onStart=say1;
  flushDecor();flushPuffs();};
