/* ============================== МИР 3 · 3-5 «ГУСИ-ЛЕБЕДИ» ============================== */
// кульминация мира: свет выдаёт — взгляд гусей · Тишка у Йоши на спине · укрытия: печка, яблонька, речка — просьба помощника и все четверо внутри за 8 секунд
// запрет из сказки: не отказывайся от угощения — отказ у печки: погоня раньше, не звенья · Яга на ступе
function makeYablonka(){const g=new THREE.Group();W.group.add(g);const bark=M(0x6b4a2b),leaf=M(0x4f8a3a);addMesh(new THREE.CylinderGeometry(0.2,0.3,1.6,8),bark,0,0.8,0,g);
  for(const[dx,dy,dz,r]of[[0,2.2,0,1.3],[0.8,1.9,0.3,0.9],[-0.8,2.0,-0.2,0.9],[0.1,2.8,-0.3,0.85]])addMesh(new THREE.SphereGeometry(r,12,10),leaf,dx,dy,dz,g);
  const apples=[];for(let i=0;i<8;i++){const a=i/8*Math.PI*2;apples.push(addMesh(new THREE.SphereGeometry(0.12,8,6),M(i%3?0x9ac040:0xd04a2a),Math.cos(a)*1.1,1.8+Math.sin(i*1.9)*0.4,Math.sin(a)*1.1,g));}
  const eyes=[];for(const s of[-1,1])eyes.push(addMesh(new THREE.SphereGeometry(0.07,8,6),MAT.dark,s*0.14,1.2,0.28,g));return {g,apples,eyes};}
function build35(){
  W.zvenAway=true;W.world=3;setTheme('heaven');W.name='3-5 · «Гуси-лебеди»';W.sub='Небесное царство · свет выдаёт нас гусям';W.camX=12;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.pero=true;W.fallY=-12;const T=HERO;
  scene.background=new THREE.Color(0x3a3474);scene.fog=new THREE.Fog(0x3a3474,26,96);
  heavenDecor(-210,20);
  /* ---------- А. начало: гуси видят свет ---------- */
  cloudIsle(-8,8,-8,8,0);bell(-3,4);const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,3);
  mostki('shadow',[[0,0,-8],[0,0,-18]]);edgeSign(1.4,0,-7.4,'shadow');
  goose({x:0,z:-13,R:5,y:8,w:0.7,name:'g1'});
  cloudIsle(-5,5,-26,-18,0);const n1=nutItem(4,0.6,-24.4);
  mostki('light',[[0,0,-26],[0,0,-36]]);edgeSign(1.4,0,-25.4,'light');
  goose({x:0,z:-31,R:4.5,y:8,w:0.8,a:1.2,name:'g2'});
  /* ---------- Б. гнездо: Тишка ---------- */
  cloudIsle(-8,8,-50,-36,0);bell(-4,-38);nestMesh(0,0,-45,1.6);const tish=makeTishka();tish.g.position.set(0,0.35,-45);tish.g.scale.setScalar(0.85);
  const L1=linkItem(5.4,1.1,-47.4);
  /* ---------- В. печка ---------- */
  mostki('shadow',[[0,0,-50],[0,0,-58]]);goose({x:0,z:-54,R:6,y:8,w:-0.75,name:'g3',on:()=>F.chase});
  cloudIsle(-9,9,-74,-58,0);bell(-6,-60);const pech=makePechka();pech.g.position.set(0,0,-68);colBox(-1.3,1.3,0,2.8,-69.2,-66.8,true);
  const zStove={x:0,z:-64.4,r:2.4};const L2=linkItem(0,1.3,-65.6);L2.locked=true;L2.g.visible=false;
  /* ---------- Г. к яблоньке ---------- */
  mostki('light',[[0,0,-74],[0,0,-82]]);edgeSign(1.4,0,-73.4,'light');goose({x:0,z:-78,R:4.5,y:8,w:0.9,name:'g4',on:()=>F.chase});
  cloudIsle(-5,5,-88,-82,0);const n2=nutItem(-4,0.6,-86.6);
  mostki('shadow',[[0,0,-88],[0,0,-96]]);
  goose({x:0,z:-86,R:5,y:5.5,w:1.2,name:'early1',on:()=>F.earlyT>0});goose({x:0,z:-77,R:4,y:5.5,w:-1.1,name:'early2',on:()=>F.earlyT>0});
  cloudIsle(-9,9,-112,-96,0);bell(-6,-98);const yab=makeYablonka();yab.g.position.set(0,0,-104);W.cyls.push({x:0,z:-104,r:0.35,miny:-1,maxy:1.6,on:true});
  const zTree={x:0,z:-104,r:3};const L3=linkItem(0,3.6,-104);L3.locked=true;L3.g.visible=false;
  W.waterTargets.push({pos:new V3(0,0,-104),active:()=>F.treeAsk&&!F.treeWater,onWater:()=>{F.treeWater=true;SFX.grow();burst(new V3(0,2,-104),0x7ad8ff,14,3);bark(yab,'yablonka','Ох, хорошо! Напоил, напоил!',1.8);}});
  const n3=nutItem(7.6,0.6,-110);
  /* ---------- Д. речка с кисельными берегами ---------- */
  mostki('shadow',[[0,0,-112],[0,0,-120]]);cloudIsle(-5,5,-126,-120,0);
  mostki('light',[[0,0,-126],[0,0,-134]]);edgeSign(1.4,0,-125.4,'light');goose({x:0,z:-130,R:4.5,y:8,w:0.9,a:2,name:'g6',on:()=>F.chase});
  cloudIsle(-10,10,-152,-134,0);bell(-7,-136);
  {const milk=new THREE.Mesh(new THREE.PlaneGeometry(20,2.4),M(0xfaf6ff,{emissive:0x8a8aa0,emissiveIntensity:0.3}));milk.rotation.x=-Math.PI/2;milk.position.set(0,0.03,-142.6);W.group.add(milk);
    box(-10,10,0,0.3,-141.2,-140.4,M(0xe07aa0),{occ:false});box(-10,10,0,0.3,-145,-144,M(0xe07aa0),{occ:false});}
  const dam=new THREE.Group();dam.position.set(7.4,0,-142.6);W.group.add(dam);for(let i=0;i<5;i++)addMesh(new THREE.CylinderGeometry(0.14,0.14,1.2,6),M(0x8a6a3a),0,0.6,-1+i*0.5,dam);
  const damMark=markMesh(0.9);damMark.position.set(7.4,1.6,-141.9);W.group.add(damMark);
  W.marks.push({pos:new V3(7.4,1.6,-141.9),active:()=>F.riverAsk&&!F.dam,onHit:()=>{F.dam=true;SFX.crash();damMark.visible=false;anim(0.8,k=>{dam.rotation.z=-1.2*k;dam.position.y=-0.4*k;});burst(new V3(7.4,1,-142.6),0xfaf6ff,20,4);bark({g:dam},'rechka','Спасибо! Вода ушла — под бережком место есть, полезайте.',2.4);}});
  const hollow=new THREE.Group();hollow.position.set(0,0,-140.8);W.group.add(hollow);hollow.visible=false;addMesh(new THREE.BoxGeometry(4,0.5,0.1),MB(0x1a0a14),0,0.28,0.45,hollow);
  const zRiver={x:0,z:-139.2,r:2.4};const L4=linkItem(0,1.1,-139.6);L4.locked=true;L4.g.visible=false;
  W.onOwl=(h)=>{if(F.riverAsk&&!F.hollow&&h.pos.z<-132&&h.pos.z>-152){F.hollow=true;hollow.visible=true;SFX.owl();floatText(new V3(0,1.6,-140.6),'Под бережком — пещерка, полезайте!','#e7c3ff');}};
  /* ---------- Е. Яга и огромная пропасть ---------- */
  mostki('light',[[0,0,-152],[0,0,-188]],{w:1.8});edgeSign(1.5,0,-151.4,'light');
  for(const[z,a]of[[-160,0],[-170,2],[-180,4]])goose({x:0,z,R:5,y:11,w:0.6,a,fr:2.2,name:'fin',on:()=>F.final});
  cloudIsle(-9,9,-204,-188,0);bell(-5,-191);const n4=nutItem(-7.4,0.6,-150),n5=nutItem(7.2,0.6,-202);
  const yaga=makeStupa();yaga.g.position.set(0,5,-196);yaga.g.rotation.y=0;
  const yGeese=[];for(let i=0;i<5;i++){const g=makeGoose(0.9);yGeese.push({g,a:i/5*Math.PI*2});}
  /* ---------- укрытия: просьба помощника → все четверо внутри за 8 секунд ---------- */
  const faces=new THREE.Group();W.group.add(faces);faces.visible=false;const faceM=HEROES.map(h=>{const m=new THREE.Mesh(new THREE.SphereGeometry(0.2,10,8),M(0x6a6a7a));m.position.x=(HEROES.indexOf(h)-1.5)*0.55;faces.add(m);return m;});
  const dome=new THREE.Mesh(new THREE.SphereGeometry(1,20,14,0,Math.PI*2,0,Math.PI/2),MB(0xc8e8a0,{transparent:true,opacity:0.14,depthWrite:false}));dome.visible=false;W.group.add(dome);
  let SH=null;W.shelter35=()=>SH;   // для напарника-бота: идёт ли сейчас укрытие
  function giveLink(it){it.locked=false;it.g.visible=true;burst(it.pos.clone(),COL.gold,14,3);const h=active(0),from=it.pos.clone();anim(1.0,k=>{if(it.taken)return;it.base=lerp(from.y,h.pos.y+1.1,k)+Math.sin(k*Math.PI)*1.2;it.pos.x=lerp(from.x,h.pos.x,k);it.pos.z=lerp(from.z,h.pos.z,k);if(k>=1)takeItem(it,h);});}
  const inside=(h,z0)=>hd(h.pos,z0)<z0.r&&Math.abs(h.pos.y)<1.2;
  function openShelter(z0,name,onDone){SH={z:z0,name,t:8,state:'count',onDone};faces.visible=true;faces.position.set(z0.x,3.4,z0.z);dome.visible=true;dome.position.set(z0.x,0,z0.z);dome.scale.set(z0.r,2,z0.r);
    SFX.ok();banner('Прячемся!','#c8e8a0',2,'все четверо — внутрь за восемь секунд · кто отстал — кликните к себе');}
  function flyover(z0){for(let i=0;i<6;i++){const g=makeGoose(1.1);const x0=rand(-8,8),from=new V3(x0-26,7+rand(0,2),z0.z+rand(-4,4)),to=new V3(x0+26,7+rand(0,2),z0.z+rand(-4,4));g.g.rotation.y=Math.PI/2;
      anim(3.4,k=>{g.g.position.lerpVectors(from,to,k);g.wings.forEach(w=>{w.wp.rotation.z=w.sd*Math.sin(G.time*8+i)*0.5;});if(k>=1)W.group.remove(g.g);});}
    for(let i=0;i<4;i++)later(i*0.5,()=>{for(let j=0;j<3;j++)tone(rand(420,520),0.12,'square',0.08,rand(300,360),j*0.12);});}
  function tickShelter(dt){if(!SH)return;const z0=SH.z;const inn=HEROES.map(h=>inside(h,z0));HEROES.forEach((h,i)=>{if(inn[i]&&!h.hidden){h.hidden=true;floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'спрятался','#c8e8a0');}faceM[i].material.color.setHex(inn[i]?[0xe0784a,0xc08a48,0xb67ccc,0x6cc4b8][i]:0x5a5a6a);});
    faces.lookAt(G.split>0.5?cams[0].position:camS.position);
    if(SH.state==='count'){SH.t-=dt;if(inn.every(x=>x)||SH.t<=0){HEROES.forEach((h,i)=>{if(!inn[i]){const a=i/4*Math.PI*2;placeOnGround(h,z0.x+Math.cos(a)*1.2,z0.z+Math.sin(a)*1.2,0);h.hidden=true;burst(h.pos.clone().add(new V3(0,1,0)),0xffffff,10,3);floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Гусь принёс!','#e8f4ff');}});
        SH.state='pass';SH.t=3.6;flyover(z0);if(!inn.every(x=>x)&&!F.ferryTold){F.ferryTold=true;tip(0,'Кто не успел спрятаться — того гусь назад отнесёт.<br>Кто спрятался — на месте остаётся, вот.',3);}}}
    else if(SH.state==='pass'){SH.t-=dt;W.gooseCalm=0.5;if(SH.t<=0){HEROES.forEach(h=>{h.hidden=false;});faces.visible=false;dome.visible=false;const d=SH.onDone;SH=null;SFX.ok();if(d)d();}}}
  /* ---------- сюжет ---------- */
  function tishScene(){F.stage='tish';const Y=T.yosha;
    play({dur:10,fov:48,shots:[shot(0,[2.6,1.8,-41.6],[0,0.6,-45]),shot(5,[0,6,-34],[0,3,-52])],
      says:[[0.3,2.6,'tishka','Йоша! Я тут, я тут!'],[3,2.2,null,'<i>Йоша Тишку себе на спину берёт.</i>',true],[5.2,2.4,'yosha','Держись крепко, братец!'],[7.6,2.2,'zven','Гуси! Погоня! Бежим!']],
      events:[{t:3,fn:()=>{Y.g.add(tish.g);tish.g.position.set(0,Y.d.height+0.12,-0.1);tish.g.rotation.set(0,0,0);tish.g.scale.setScalar(0.42);SFX.ok();}},
        {t:7.6,fn:()=>{for(let i=0;i<3;i++)tone(rand(420,520),0.12,'square',0.12,rand(300,360),i*0.13);}}],
      end:()=>{if(tish.g.parent!==Y.g){Y.g.add(tish.g);tish.g.position.set(0,Y.d.height+0.12,-0.1);tish.g.scale.setScalar(0.42);}F.chase=true;F.stage='chase';banner('Погоня!','#e8f4ff',2.4,'гуси ниже летают · зажжёшь перо в белом луче — гусь к тебе нырнёт');}});}
  W.onLeave=()=>{if(tish.g.parent)tish.g.parent.remove(tish.g);};
  // печка обращается к тому, кто добежал первым
  const REFUSE={proshka:['proshka','Я не голодный, нет уж.'],pelageya:[null,'<i>Пелагея молча за крыло прячется.</i>'],potap:['potap','Я потерплю. Пусть другие поедят.'],yosha:['yosha','Я сам себе еду найду!']};
  const EAT={proshka:['proshka','<i>(с набитым ртом)</i> Ну и что это доказывает, а?'],pelageya:['pelageya','<i>(шёпотом)</i> Спасибо, спасибо…'],potap:['potap','Вкусно. Спасибо, матушка.'],yosha:['yosha','Ням! Сладкий, как мёд!']};
  function pieOffer(h){F.pie={h,t:4};pech.pie.visible=true;anim(0.6,k=>{pech.door.rotation.y=-1.4*smooth(k);});bark(pech,'pechka','Съешь, дружок, мой пирожок — спрячу, сберегу.',2.6);}
  function pieEat(){const h=F.pie.h;F.pie=null;F.ate=true;pech.pie.visible=false;SFX.ok();burst(h.pos.clone().add(new V3(0,1.2,0)),0xd0a060,10,2);const L=EAT[h.kind];later(0.4,()=>{if(L[0])bark(h,L[0],L[1],2.4);else say(null,L[1],2.4);});
    later(1.2,()=>{bark(pech,'pechka','Полезайте! Живо, живо!',1.8);openShelter(zStove,'stove',()=>{giveLink(L2);anim(0.6,k=>{pech.door.rotation.y=-1.4*(1-smooth(k));});});});}
  function pieRefuse(){const h=F.pie.h;F.pie=null;F.refused=true;pech.pie.visible=false;const L=REFUSE[h.kind];if(L[0])bark(h,L[0],L[1],2.4);else say(null,L[1],2.6);
    anim(0.5,k=>{pech.door.rotation.y=-1.4*(1-smooth(k));});later(0.6,()=>{SFX.crash();floatText(new V3(0,3,-66),'Хлоп!','#ffffff');});
    later(1.4,()=>{F.earlyT=30;flyover(zStove);banner('Гуси над головой — берегись!','#e8f4ff',2.6,'печка заслонку закрыла — погоня начнётся на полминуты раньше');L2.locked=false;L2.g.visible=true;});}
  // яблонька: Прошка сам съедает кислое яблочко, Йоша поливает
  function treeAsk(){F.treeAsk=true;bark(yab,'yablonka','Съешь моё кислое яблочко да полей меня — спрячу, сберегу.',3);}
  function riverAsk(){F.riverAsk=true;say('rechka','Запруда мне дышать не даёт. Сбейте её — спрячу под бережком.',3);later(3.2,()=>say('zven','Пелагея, посмотри Совиным взором — где под берегом место?',2.8,true));}
  function yagaScene(){F.stage='yaga';const pe=T.pelageya;
    play({dur:14,fov:46,camK:2.4,shots:[shot(0,[0,4,-146],[0,5,-196]),shot(5.4,[3,6.4,-186],[0,5.6,-196]),shot(9.6,[pe.pos.x+2,1.6,pe.pos.z+2.4],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,3.4,null,'<i>А в конце — Баба Яга на ступе, с метлой, и гуси вокруг неё.</i>',true],[5.6,2.8,'yaga','А, это вы мне двор чистили, голубчики!'],[9.8,3.6,null,'<i>Спрятаться негде. Зажигаем перья и бежим, а Пелагея планирует с Тишкой в лапах.</i>',true]],
      events:[{t:9.8,fn:()=>{pe.g.add(tish.g);tish.g.position.set(0,0.25,0.42);tish.g.scale.setScalar(0.4);}}],
      end:()=>{if(tish.g.parent!==pe.g){pe.g.add(tish.g);tish.g.position.set(0,0.25,0.42);tish.g.scale.setScalar(0.4);}F.final=true;F.stage='final';banner('Через пропасть!','#ffe08a',2.4,'на золотых мостках не спрятаться · гуси высоко — за лучами следите');}});}
  function endScene(){F.stage='end';const pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-190.5,0);h.face=Math.PI;});
    const key=blackKey(2);W.group.add(key);key.visible=false;
    play({dur:30,fov:46,camK:2.6,shots:[shot(0,[0,4,-184],[0,3,-196]),shot(6,[3,2.4,-191],[0,2.8,-196.5]),shot(14.6,[-3,2.6,-190],[0,3.4,-196]),shot(22,[1.6,2,-189],[0,3,-195])],
      says:[[0.3,3,null,'<i>Яга метлой махнула — и гуси сели, как куры.</i>',true],[3.6,2.4,null,'<i>У старшего гуся на шее — ключ чёрный.</i>',true],
        [6.2,4,'yaga','Чужим ключом моих гусей приманил, костлявый.'],[10.4,4,'yaga','Велел малыша взять — чтоб колыбельную никто не вспомнил. Ну, погоди.'],
        [14.8,3.2,null,'<i>Яга выдёргивает ключ и швыряет в пропасть. Потом смотрит на нас.</i>',true],[18.2,3.4,'yaga','Долг за мной был — считай, отдала.'],[21.8,3.4,'yaga','А за этот ещё буду должна.'],[25.4,2.8,'tishka','Спасибо, Яга, бабушка!']],
      events:[{t:0.3,fn:()=>{const from=yaga.g.position.clone();anim(2,k=>{yaga.g.position.lerpVectors(from,new V3(0,0.2,-196),smooth(k));yaga.broom.rotation.z=Math.sin(k*20)*0.6;});
          yGeese.forEach((q,i)=>{const f=q.g.g.position.clone(),to=new V3(-4+i*2,0.3,-199);anim(2.4,k=>{q.g.g.position.lerpVectors(f,to,smooth(k));});});}},
        {t:3.6,fn:()=>{key.visible=true;const g0=yGeese[2].g.g;key.position.set(g0.position.x,g0.position.y+1.1,g0.position.z+0.4);}},
        {t:14.8,fn:()=>{anim(0.5,k=>{yaga.broom.rotation.z=-k;});const from=key.position.clone();anim(2.4,k=>{key.position.set(from.x+k*9,from.y+Math.sin(Math.min(1,k*2)*Math.PI)*3-k*k*16,from.z-k*4);key.rotation.z+=0.4;});SFX.keys();}},
        {t:22,fn:()=>{const it=linkItem(0,2.4,-195.6);anim(1.2,k=>{it.base=2.4-k;it.pos.lerpVectors(new V3(0,2.4,-195.6),pr.pos.clone().add(new V3(0,1.1,0)),smooth(k));if(k>=1)takeItem(it,pr);});}}],
      tick:(t)=>{yaga.g.rotation.y=Math.sin(t*0.8)*0.2;},
      end:()=>{key.visible=false;F.out=true;banner('Тишка спасён!','#ffe08a',2.4,'в лавке у Векши — ступа-санки для Лукоморья, загляни!');later(1.8,finishLevel);}});}
  W.onGooseSee=(q,h)=>{if(!F.gooseTold){F.gooseTold=true;later(1.2,()=>say('zven','Гуси видят свет! Под белым лучом — только в темноте.',2.8,true));}};
  W.updates.push(dt=>{
    if(F.earlyT>0)F.earlyT-=dt;
    // Тишку подбирает Йоша
    if(F.stage==='walk'&&HEROES.some(h=>h.active&&hd(h.pos,{x:0,z:-45})<5)){if(T.yosha.active&&hd(T.yosha.pos,{x:0,z:-45})<1.8)tishScene();else if(!F.tishTip){F.tishTip=true;bark(tish,'tishka','Йоша! Я тут, я тут!',2);tip(1,'Тишку Йоша заберёт — на спину посадит.<br>Смени на Йошу '+K(1,'swap')+' — к гнезду иди, всё сладит.',3.2);}}
    // печка
    if(F.stage==='chase'&&!F.pie&&!F.ate&&!F.refused){const first=HEROES.find(h=>h.active&&hd(h.pos,{x:0,z:-65})<3.2);if(first)pieOffer(first);}
    if(F.pie){const p=F.pie;p.t-=dt;pech.pie.position.y=1.5+Math.sin(G.time*4)*0.05;if(p.t<=0||hd(p.h.pos,{x:0,z:-65})>6||!p.h.active)pieRefuse();}
    // яблонька
    if(F.stage==='chase'&&(F.ate||F.refused)&&!F.treeAsk&&HEROES.some(h=>h.active&&h.pos.z<-97.5&&h.pos.z>-112))treeAsk();
    if(F.treeAsk&&!F.treeDone&&F.treeEat&&F.treeWater){F.treeDone=true;openShelter(zTree,'tree',()=>{giveLink(L3);});}
    // речка
    if(F.treeDone&&!SH&&!F.riverAsk&&HEROES.some(h=>h.active&&h.pos.z<-135.5&&h.pos.z>-152))riverAsk();
    if(F.riverAsk&&!F.riverDone&&F.dam&&F.hollow){F.riverDone=true;openShelter(zRiver,'river',()=>{giveLink(L4);});}
    tickShelter(dt);
    if(F.riverDone&&!SH&&F.stage==='chase'&&HEROES.some(h=>h.active&&h.pos.z<-147))yagaScene();
    if(F.final&&!F.out&&F.stage==='final'&&[0,1].every(pi=>active(pi).pos.z<-189.5&&active(pi).pos.z>-205))endScene();
    // Яга на ступе и гуси вокруг
    if(F.stage!=='end'){yaga.g.position.y=5+Math.sin(G.time*1.3)*0.3;yaga.broom.rotation.z=Math.sin(G.time*2)*0.3;yGeese.forEach((q,i)=>{q.a+=dt*0.8;q.g.g.position.set(Math.cos(q.a)*3.4,5.4+Math.sin(q.a*2)*0.4,-196+Math.sin(q.a)*3.4);q.g.g.rotation.y=-q.a;q.g.wings.forEach(w=>{w.wp.rotation.z=w.sd*Math.sin(G.time*6+i)*0.45;});});}
    tish.g.rotation.y=Math.sin(G.time*2)*0.2;yab.eyes.forEach(e=>{e.scale.y=F.treeAsk&&!F.treeDone?1:0.4;});});
  /* ---------- рисунки кнопок ---------- */
  W.skillHook=(pi,h)=>{if(F.pie&&F.pie.h===h&&h.active){pieEat();return true;}
    if(F.treeAsk&&!F.treeEat&&h.kind==='proshka'&&hd(h.pos,{x:0,z:-104})<3.2){F.treeEat=true;h.atkT=0.28;SFX.ok();later(0.3,()=>bark(h,'proshka','<i>(морщится)</i> Кислятина… Ладно уж. Съем до огрызка.',2.6));yab.apples[1].visible=false;return true;}
    return false;};
  const P0=T.proshka;
  prompt(0,'skill',()=>headOf(F.pie?F.pie.h:P0),()=>!!F.pie&&F.pie.h.player===0,'съесть пирожок');
  prompt(1,'skill',()=>headOf(F.pie?F.pie.h:T.pelageya),()=>!!F.pie&&F.pie.h.player===1,'съесть пирожок');
  prompt(0,'label',()=>pech.pie.getWorldPosition(new V3()).add(new V3(0,0.7,0)),()=>!!F.pie,(()=>F.pie?'пирожок · '+Math.ceil(F.pie.t)+' с':''));
  prompt(0,'skill',()=>headOf(P0),()=>F.treeAsk&&!F.treeEat&&P0.active&&hd(P0.pos,{x:0,z:-104})<3.2,'кислое яблочко');
  prompt(1,'skill',()=>headOf(T.yosha),()=>F.treeAsk&&!F.treeWater&&T.yosha.active&&hd(T.yosha.pos,{x:0,z:-104})<3.2,'полить');
  prompt(0,'skill',()=>headOf(P0),()=>F.riverAsk&&!F.dam&&P0.active&&P0.pos.z<-134,'по запруде');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>F.riverAsk&&!F.hollow&&T.pelageya.active&&T.pelageya.pos.z<-134,'Совиный взор');
  prompt(0,'label',()=>new V3(0,4.6,SH?SH.z.z:0),()=>!!SH&&SH.state==='count',(()=>SH?'прячемся · '+Math.ceil(SH.t)+' с':''));
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>h().lit&&W.geese.some(q=>(!q.on||q.on())&&q.state==='fly'&&hd(q.fp,h().pos)<q.fr+3),'погаси перо!');
    prompt(pi,'call',()=>headOf(h()),()=>!!SH&&SH.state==='count'&&inside(h(),SH.z)&&!inside(other(pi),SH.z),'позови!');}
  /* ---------- задачи ---------- */
  const mk=pi=>[
    O(()=>'Гуси-лебеди Тишку унесли! Гуси свет видят.<br>Под белым лучом — лишь без света ступай; по лиловым мосткам — смело, никто не обидит.',()=>active(pi).pos.z<-18.5,()=>[W.tiles[3].m]),
    O(()=>'Золотой мосток под гусем. Жди, пока гусь отвернётся, —<br>И перо зажги '+K(pi,'item')+' на три шага, пусть не оглянётся.',()=>active(pi).pos.z<-36.5,()=>[W.tiles[10].m]),
    O(pi?()=>'Тишка в гнезде! Смени на Йошу '+K(1,'swap')+' — и на спину его посади.':()=>'Тишка в гнезде — Йоша его заберёт.',()=>F.chase,()=>[tish.g]),
    O(()=>'Погоня! У облака — печка: она спрячет.<br>Кто первым добежит — с тем и речь поведёт, не иначе.',()=>F.ate||F.refused,()=>[pech.g]),
    O(()=>F.ate?'Печка прячет: все четверо — к заслонке, живо!':'Гуси над головой! Бегом к яблоньке!',()=>F.treeAsk||F.stage!=='chase',()=>[pech.g,yab.g]),
    O(pi?()=>'Яблонька пить просит. Живой водой Йоши '+K(1,'skill')+' полей.<br>Потом все четверо — под ветки, за восемь секунд, скорей!':()=>'Яблонька. Прошкой кислое яблочко '+K(0,'skill')+' сорви.<br>Потом все четверо — под ветки, за восемь секунд, в тени!',()=>F.treeDone&&!SH,()=>[yab.g]),
    O(pi?()=>'Речка — кисельные берега. Совиный взор Пелагеи '+K(1,'skill')+' включи —<br>Он укажет, где под бережком спрятаться, — ищи!':()=>'Речку запруда перегородила. Из рогатки Прошки '+K(0,'skill')+' в жёлудь стрельни!',()=>F.riverDone&&!SH,()=>[dam,hollow]),
    O(()=>'Яга на ступе! Через пропасть — золотые мостки.<br>Перья зажгите '+K(pi,'item')+' и бегите — за лучами гусей следите, смельчаки!',()=>F.stage==='end',()=>[yaga.g]),
    O('Яга…',()=>false,()=>[yaga.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>h.lit&&W.geese.some(q=>(!q.on||q.on())&&q.state==='fly'&&hd(q.fp,h.pos)<q.fr+4),text:pi=>'Луч гуся рядом! Перо погаси '+K(pi,'item')+' — без света гусь тебя не видит.'},
    {cond:(pi,h)=>!!SH&&SH.state==='count',text:pi=>'Все четверо — внутрь! Кто отстал — кликни к себе '+K(pi,'call')+'.'});
  W.spawns=[[new V3(-2.6,0,4.6),new V3(-4.4,0,5.8)],[new V3(2.6,0,4.6),new V3(4.4,0,5.8)]];W.startAct=[0,0];
  W.pauseLine='Гуси-лебеди Тишку унесли. Гуси свет пера видят: под белым лучом — лишь во тьме ходи.<br>Укрытия прячут: просьбу исполните — и вчетвером за восемь секунд спрячьтесь, поди.<br>От угощенья не отказывайтесь — в сказке так водится.';
  W.onStart=()=>{play({dur:8.4,fov:48,shots:[shot(0,[0,3,8],[0,6,-13]),shot(4,[4,2,0],[0,1,-45])],
    says:[[0.3,3.6,null,'<i>Гуси-лебеди бельчонка Тишку унесли —</i><br><i>Того, что колыбельную забыл вдали.</i>',true],[4.2,3.6,'zven','Гуси видят свет. Тише… Где темно — идём смело.',true]],
    end:()=>{F.stage='walk';snapCams();}});};
  flushDecor();flushPuffs();}

