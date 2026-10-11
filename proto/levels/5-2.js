/* ============================== МИР 5 · 5-2 «ЗАЯЦ» — на четверых ============================== */
// четыре героя — четыре столба: между стоящими героями ближе 10 м натягивается нить; управляемый на ходу держит нить, но она мерцает
// заяц бежит к самой длинной мерцающей нити или к дырке · три круга, каждый меньше · «Ко мне!» зовёт оставленного друга закрыть дырку · финал — подкидка
// поляна — под засохшим дубом из 5-1: упавший открытый сундук, Алатырь, ручей поперёк поляны, пни · разминка: Хамелей у капусты перенял гусли
// круг 1 — знак гуслей у грядки: колыбельная усаживает зайца на 3 с · круг 2 — Кощеевы мыши грызут нить, её связывают клубком по знаку (RB) · круг 3 — заяц хитрит:
// приседает к одной нити, а бежит к другой · заяц дразнится в рифму · после финала — зеркальце из 5-1: Кощей один в тереме (mirrorVision, w5_common)
function build52(){
  W.zvenAway=true;W.world=5;setTheme('buyan');sky('buyan');W.name='5-2 · Заяц';W.sub='Остров Буян · на четверых · изгородь из нитей';W.camX=24;const F=W.flags;F.stage='intro';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.readHints=true;W.vestPull=true;const T=HERO;
  const Z=makeVestZ(helperOf(4));W.zven=Z;Z.pos.set(0,2.4,6);
  const grassM=M(0x86a860),C=new V3(0,0,-18);
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(700,700),M(0x3a8ab8));sea.rotation.x=-Math.PI/2;sea.position.set(0,-0.7,0);W.group.add(sea);
  ground(-24,24,-42,10,0,grassM);wall(-24.2,-24,-42,10);wall(24,24.2,-42,10);wall(-24,24,-42.2,-42);wall(-24,24,10,10.2);
  // поляна: кусты по кругу, капустная грядка в середине — заяц к ней всегда возвращается
  for(let i=0;i<34;i++){const a=i/34*Math.PI*2,r=rand(15,17.5);if(Math.abs(Math.sin(a/2))<0.3)continue;const b=addMesh(new THREE.SphereGeometry(rand(0.9,1.4),8,6),M(0x4f7a3a),C.x+Math.sin(a)*r,0.6,C.z+Math.cos(a)*r);b.scale.y=0.7;W.cyls.push({x:C.x+Math.sin(a)*r,z:C.z+Math.cos(a)*r,r:1.1,miny:-1,maxy:1.4,on:true});}
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2,c=addMesh(new THREE.SphereGeometry(0.34,8,6),M(0x9ad070),C.x+Math.sin(a)*0.9,0.28,C.z+Math.cos(a)*0.9);c.scale.set(1,0.7,1);}
  addMesh(new THREE.CylinderGeometry(1.6,1.7,0.12,16),M(0x6a4a2a),C.x,0.06,C.z);
  if(!WHO.zayac)WHO.zayac=['Заяц','#d8c8a8'];
  /* ---------- поляна под засохшим дубом из 5-1: ветви без листьев, корни, упавший открытый сундук, Алатырь, ручей, пни, цветы ---------- */
  const OAKP=new V3(-14,0,-39);{const bark=M(0x5e4c3e),bk2=M(0x4e3e32);addMesh(new THREE.CylinderGeometry(2.4,3.6,22,12),bark,OAKP.x,11,OAKP.z).castShadow=false;
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2+0.3,br=new THREE.Group();br.position.set(OAKP.x,12+i*1.3,OAKP.z);br.rotation.set(Math.cos(a)*0.9,0,Math.sin(a)*0.9);W.group.add(br);addMesh(new THREE.CylinderGeometry(0.25,0.6,9,6),bk2,0,4.5,0,br);}
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2,r=addMesh(new THREE.CylinderGeometry(0.4,0.9,4,6),bk2,OAKP.x+Math.cos(a)*3.2,0.3,OAKP.z+Math.sin(a)*3.2);r.rotation.set(Math.sin(a)*1.1,0,-Math.cos(a)*1.1);}
    W.cyls.push({x:OAKP.x,z:OAKP.z,r:3.8,miny:-1,maxy:22,on:true});}
  {const ch=makeChest5();ch.g.position.set(-8.5,0,-35.5);ch.g.rotation.set(0,0.7,0.12);ch.lid.rotation.x=-1.8;W.cyls.push({x:-8.5,z:-35.5,r:1.2,miny:-1,maxy:1.4,on:true});}   // сундук из 5-1 — открытый
  {const al=makeAlatyr(14,-35);al.runes.forEach(r=>r.traverse(o=>{if(o.isMesh)o.material.emissiveIntensity=0.9;}));}
  // ручей поперёк поляны: нить, натянутая над ним, — над водой
  {const sw=new THREE.Mesh(new THREE.PlaneGeometry(48,1.8),M(0x5ab0d8,{transparent:true,opacity:0.8,emissive:0x1a4a6a,emissiveIntensity:0.3,depthWrite:false}));sw.rotation.x=-Math.PI/2;sw.position.set(0,0.03,C.z+2.8);W.group.add(sw);
    for(let x=-23;x<24;x+=1.6)for(const sd of[-1,1]){const st=addMesh(new THREE.DodecahedronGeometry(rand(0.12,0.24)),M(0x9a9488),x+rand(-0.4,0.4),0.05,C.z+2.8+sd*rand(0.95,1.15));st.castShadow=false;}}
  for(const [x,z] of[[10,-12],[-10.5,-22],[4.5,-29.5],[-6,-6]]){addMesh(new THREE.CylinderGeometry(0.62,0.72,0.55,10),M(0x7a5a3a),x,0.27,z);addMesh(new THREE.CylinderGeometry(0.56,0.56,0.02,10),M(0xc8a070),x,0.56,z);W.cyls.push({x,z,r:0.7,miny:-1,maxy:0.6,on:true});}
  {const FC=[0xffe14a,0xff8ab0,0xa0c8ff,0xffffff];for(let i=0;i<70;i++){const a=rand(0,Math.PI*2),r=rand(2,22);const x=clamp(C.x+Math.sin(a)*r,-23,23),z=clamp(C.z+Math.cos(a)*r,-41,9);if(Math.abs(z-(C.z+2.8))<1.2)continue;addMesh(new THREE.SphereGeometry(0.09,5,4),MB(FC[i%4]),x,0.12,z).castShadow=false;}}
  const N=[nutItem(-11,0.6,-10),nutItem(11,0.6,-25),nutItem(-3,0.6,-31)];W.linkTotal+=3;   // три звена — за три круга
  bell(-6,-3);
  let circle=0;
  signMark(C.x,0,C.z,'gusli',{r:9,noArea:true,on:()=>F.stage!=='hunt'||circle!==1});signMark(C.x+1.6,0,C.z-1.2,'clew',{r:9,noArea:true,on:()=>F.stage==='hunt'&&circle===1});
  /* ---------- кольца трёх кругов: цифра — порядок Смены, цвет — игрок ---------- */
  const ORDER=['proshka','pelageya','potap','yosha'];const RAD=[7,5,3.2];const ANG=[-Math.PI*0.75,-Math.PI*0.25,Math.PI*0.25,Math.PI*0.75];
  const spotPos=(k,i)=>new V3(C.x+Math.sin(ANG[i])*RAD[k],0,C.z+Math.cos(ANG[i])*RAD[k]);
  const SPOTS=RAD.map((R,k)=>ORDER.map((kind,i)=>{const p=spotPos(k,i),pi=HERO_DEF[kind].player;const g=new THREE.Group();g.position.copy(p);W.group.add(g);
    const rm=MB(PCOL[pi],{transparent:true,opacity:0.9});const r=new THREE.Mesh(new THREE.TorusGeometry(0.75,0.07,6,28),rm);r.rotation.x=Math.PI/2;r.position.y=0.05;g.add(r);
    const dg=makeDigit(0.55,MB(0xffd23a));dg.position.set(0,2.4,0);g.add(dg);setDigit(dg,i+1);g.visible=false;return {g,p,kind,pi,i,k,rm,dg};}));
  const showCircle=k=>{SPOTS.forEach((row,j)=>row.forEach(s=>{s.g.visible=j===k;}));};
  const onSpot=(h,k)=>{const s=SPOTS[k][ORDER.indexOf(h.kind)];return hd(h.pos,s.p)<1.0;};
  /* ---------- нити изгороди ---------- */
  const thM=[0,1,2,3].map(()=>M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8,transparent:true,opacity:1}));
  const TH=[0,1,2,3].map(i=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1,5),thM[i]);W.group.add(m);
    const stub=new THREE.Group();W.group.add(stub);stub.visible=false;for(const sd of[-1,1]){const q=addMesh(new THREE.CylinderGeometry(0.04,0.04,0.7,5),M(COL.gold),sd*0.5,0.8,0,stub);q.rotation.z=sd*1.2;}   // обрывок перегрызенной нити
    return {m,stub,state:'none',len:0,cut:false};});
  const still=h=>!h.active||Math.hypot(h.vel.x,h.vel.z)<0.6;
  function updFence(){for(let i=0;i<4;i++){const a=T[ORDER[i]],b=T[ORDER[(i+1)%4]];const pa=a.pos.clone().add(new V3(0,0.8,0)),pb=b.pos.clone().add(new V3(0,0.8,0));const d=pa.distanceTo(pb);const t=TH[i];t.len=d;
      t.state=t.cut||d>=10?'none':(still(a)&&still(b))?'solid':'weak';t.m.visible=t.state!=='none';t.stub.visible=!!t.cut;if(t.cut){t.stub.position.copy(pa).lerp(pb,0.5);}if(!t.m.visible)continue;
      t.m.position.copy(pa).lerp(pb,0.5);t.m.scale.set(1,d,1);t.m.quaternion.setFromUnitVectors(new V3(0,1,0),pb.clone().sub(pa).normalize());
      thM[i].opacity=t.state==='solid'?1:0.35+0.5*Math.abs(Math.sin(G.time*14));thM[i].emissiveIntensity=t.state==='solid'?0.9:0.3;}}
  const edgeMid=i=>T[ORDER[i]].pos.clone().lerp(T[ORDER[(i+1)%4]].pos,0.5);
  /* ---------- заяц ---------- */
  const hare=makeHare();hare.g.scale.setScalar(1.25);const HR={pos:new V3(C.x,0,C.z),state:'free',t:0,tgt:null,edge:-1,face:0,hop:0,cd:2,escapes:0,feint:-1,lullCd:0};
  // заяц дразнится в рифму (запись голоса — voice/lines.json, без неё — субтитр)
  const TAUNT={out:['Не поймали, не поймали! Я быстрей, чем вы видали!','Я в дырку — шмыг! А вы и не вмиг!'],bonk:['Ой, изгородь! Ну ладно, ладно…'],feint:['Хи-хи! Туда гляди — а я сюда!'],lull:['Баю-бай… я только на минуточку…']};
  let tauntT=0;const taunt=kind=>{if(G.time<tauntT)return;tauntT=G.time+5;const L=TAUNT[kind],txt=L[Math.floor(rand(0,L.length))];say('zayac',txt,2.6);floatText(HR.pos.clone().add(new V3(0,2,0)),'«'+txt.split(/[!…,]/)[0]+'»','#f0e0c0');};
  // пока круг не сомкнулся — носится по всей поляне
  function hareTick(dt){HR.t+=dt;const P=HR.pos;let sp=0,to=null;
    if(HR.state==='free'){if(!HR.tgt||P.distanceTo(HR.tgt)<0.6){const a=rand(0,Math.PI*2),r=rand(2,12);HR.tgt=new V3(C.x+Math.sin(a)*r,0,C.z+Math.cos(a)*r);}to=HR.tgt;sp=6.5;}
    else if(HR.state==='center'){HR.cd-=dt;if(!HR.tgt||P.distanceTo(HR.tgt)<0.3){const a=rand(0,6.28),r=rand(0.3,1.2);HR.tgt=new V3(C.x+Math.sin(a)*r,0,C.z+Math.cos(a)*r);}to=HR.tgt;sp=1.4;
      if(HR.cd<=0&&!F.sit){// ищет дырку или самую длинную мерцающую нить
        let best=-1,bl=-1;for(let i=0;i<4;i++){const t=TH[i];if(t.state==='solid')continue;const l=t.state==='none'?99:t.len;if(l>bl){bl=l;best=i;}}
        if(best>=0){HR.state='crouch';HR.t=0;HR.edge=best;HR.feint=-1;
          // круг 3: заяц хитрит — смотрит и приседает к другой нити, а бежит к настоящей
          if(circle===2&&Math.random()<0.6){const o=[0,1,2,3].filter(i=>i!==best);HR.feint=best;HR.edge=o[Math.floor(rand(0,o.length))];floatText(P.clone().add(new V3(0,1.8,0)),'Заяц прицелился…','#ffd0a0');}
          else{SFX.red();floatText(P.clone().add(new V3(0,1.8,0)),TH[best].state==='none'?'Дырка!':'Нить мерцает!','#ff9a8a');}}else HR.cd=0.4;}}
    else if(HR.state==='lull'){to=null;if(HR.t>3){HR.state='center';HR.cd=rand(1.2,2);HR.tgt=null;floatText(P.clone().add(new V3(0,1.8,0)),'Проснулся!','#ffe0a0');}}
    else if(HR.state==='crouch'){to=null;const m=edgeMid(HR.edge);HR.face=Math.atan2(m.x-P.x,m.z-P.z);
      if(HR.feint>=0&&HR.t>0.55){HR.edge=HR.feint;HR.feint=-1;HR.t=0.35;SFX.red();floatText(P.clone().add(new V3(0,1.8,0)),'Обманул — в другую сторону!','#ff9a8a');taunt('feint');}
      if(HR.t>0.7){HR.state='dash';HR.t=0;}}
    else if(HR.state==='dash'){const m=edgeMid(HR.edge);to=m;sp=6.2;if(P.distanceTo(new V3(m.x,0,m.z))<0.7){const t=TH[HR.edge];
        if(t.state==='solid'){HR.state='center';HR.cd=rand(1.2,2);HR.tgt=null;SFX.shield();floatText(P.clone().add(new V3(0,1.8,0)),'Бум! Изгородь держит — не пройдёшь','#ffe36b');burst(P.clone().add(new V3(0,0.8,0)),COL.gold,8,3);if(Math.random()<0.4)taunt('bonk');}
        else{HR.state='out';HR.t=0;HR.escapes++;const out=P.clone().sub(C).setY(0).normalize();HR.tgt=C.clone().addScaledVector(out,12);SFX.whoosh();banner('Заяц в дырку удрал!','#ffd0d0',1.6,'сейчас заяц к капусте вернётся — держите изгородь');taunt('out');
          if(HR.escapes===1)later(0.8,()=>bark(T.yosha,'yosha','Видишь дырку у друга — кличь: «Ко мне!»<br>Его столб покатится закрывать — вот и ладно вполне!',3));}}}
    else if(HR.state==='out'){to=HR.tgt;sp=6.5;if(P.distanceTo(HR.tgt)<0.8){const a=Math.atan2(P.x-C.x,P.z-C.z)+0.9;HR.tgt=new V3(C.x+Math.sin(a)*12,0,C.z+Math.cos(a)*12);}
      if(HR.t>4.5){HR.state='back';HR.t=0;}}
    else if(HR.state==='back'){to=C;sp=6;if(P.distanceTo(C)<1.2){HR.state='center';HR.cd=rand(1.5,2.5);HR.tgt=null;}}
    else if(HR.state==='sit'){to=null;}
    if(to){const d=P.distanceTo(new V3(to.x,0,to.z));if(d>0.05){const k=Math.min(1,sp*dt/d);P.x+=(to.x-P.x)*k;P.z+=(to.z-P.z)*k;HR.face=Math.atan2(to.x-P.x,to.z-P.z)||HR.face;}}
    const moving=to&&sp>2;HR.hop+=dt*(moving?9:3);const back=HR.state==='back'&&HR.t<0.6;
    hare.g.position.set(P.x,(moving?Math.abs(Math.sin(HR.hop))*0.5:0)+(back?Math.sin(HR.t/0.6*Math.PI)*3:0),P.z);hare.g.rotation.y=HR.face;
    hare.ears.forEach((e,i)=>{e.rotation.x=HR.state==='lull'?0.9:HR.state==='sit'?Math.sin(G.time*30+i)*0.25:HR.state==='crouch'?-0.6:Math.sin(G.time*4+i)*0.1;});hare.body.position.y=HR.state==='crouch'?-0.15:0;}
  /* ---------- круг 2: Кощеевы мыши бегут из кустов к натянутой нити и перегрызают её; спугнуть — удар рядом, перегрызена — связать клубком по знаку ---------- */
  const mouseM=M(0x6a6470),MICE=[];let mouseT=4;
  function makeMouse(){const g=new THREE.Group();W.group.add(g);part(g,new THREE.SphereGeometry(0.28,10,8),mouseM,0,0.24,0).scale.set(0.9,0.8,1.4);part(g,new THREE.SphereGeometry(0.16,8,6),mouseM,0,0.34,0.36);
    for(const sd of[-1,1]){part(g,new THREE.SphereGeometry(0.09,6,5),M(0xe0a0b0),sd*0.11,0.48,0.32);part(g,new THREE.SphereGeometry(0.035,5,4),M(0x8affc0,{emissive:0x40c080,emissiveIntensity:1}),sd*0.07,0.38,0.5);}
    const tail=part(g,new THREE.CylinderGeometry(0.02,0.03,0.6,4),mouseM,0,0.18,-0.6);tail.rotation.x=1.2;return g;}
  function spawnMouse(){const free=[0,1,2,3].filter(i=>!TH[i].cut&&!MICE.some(q=>q.edge===i&&q.alive));if(!free.length||MICE.filter(q=>q.alive).length>=2||TH.filter(t=>t.cut).length>=2)return;
    const edge=free[Math.floor(rand(0,free.length))],a=rand(0,Math.PI*2),g=makeMouse();const pos=new V3(C.x+Math.sin(a)*14,0,C.z+Math.cos(a)*14);g.position.copy(pos);MICE.push({g,pos,edge,alive:true,t:0,gnaw:0});SFX.thwip();
    if(!F.miceTold){F.miceTold=true;later(0.5,()=>sayP('…Кощеевы мыши! Нить перегрызут — клубком свяжем.',3.2));}}
  function miceTick(dt){if(circle===1&&F.stage==='hunt'){mouseT-=dt;if(mouseT<=0){mouseT=rand(6,8.5);spawnMouse();}}
    for(const q of MICE){if(!q.alive)continue;q.t+=dt;const m=edgeMid(q.edge);m.y=0;const d=q.pos.distanceTo(m);
      if(circle!==1||F.stage!=='hunt'){q.alive=false;W.group.remove(q.g);continue;}
      if(d>0.4){q.pos.addScaledVector(m.clone().sub(q.pos).normalize(),Math.min(d,4.2*dt));q.g.rotation.y=Math.atan2(m.x-q.pos.x,m.z-q.pos.z);q.g.position.set(q.pos.x,Math.abs(Math.sin(q.t*18))*0.08,q.pos.z);}
      else{q.gnaw+=dt;q.g.rotation.z=Math.sin(q.t*30)*0.15;if(q.gnaw>1.4){q.alive=false;W.group.remove(q.g);TH[q.edge].cut=true;SFX.brk();burst(m.clone().add(new V3(0,0.8,0)),COL.gold,10,3);floatText(m.clone().add(new V3(0,1.4,0)),'Мышь перегрызла нить!','#ff9a8a');}}}}
  // удар рядом с мышью — убегает в кусты
  W.onAttack=(pi,h)=>{for(const q of MICE)if(q.alive&&hd(q.pos,h.pos)<1.8){q.alive=false;const f=q.pos.clone(),out=f.clone().sub(C).setY(0).normalize();anim(0.6,k=>{q.g.position.set(f.x+out.x*k*8,Math.sin(k*Math.PI)*1.2,f.z+out.z*k*8);if(k>=1)W.group.remove(q.g);});SFX.parry();floatText(f.clone().add(new V3(0,1,0)),'Кыш!','#ffe36b');}};
  W.itemSign=pi=>{if(F.stage!=='hunt')return null;const h=active(pi),sg=signNear(h);if(!sg)return null;
    if(sg.item==='clew')return ()=>{const mine=players[pi].heroes,ends=i=>[T[ORDER[i]],T[ORDER[(i+1)%4]]];let best=-1,bd=1e9;
      for(let i=0;i<4;i++){if(!TH[i].cut)continue;const e=ends(i);if(!e.some(q=>mine.includes(q)))continue;const d=hd(edgeMid(i),h.pos);if(d<bd){bd=d;best=i;}}
      if(best<0){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),TH.some(t=>t.cut)?'Свяжет тот, чья нить':'Нити целы','#e0e0e0');SFX.miss();return;}
      TH[best].cut=false;SFX.thread();const m=edgeMid(best);burst(m.clone().add(new V3(0,0.8,0)),COL.gold,14,3);floatText(m.clone().add(new V3(0,1.4,0)),'Связали клубком!','#ffe36b');F.reties=(F.reties||0)+1;};
    if(sg.item==='gusli')return ()=>{playGusli(pi);if(HR.lullCd>G.time){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Заяц ещё не устал — погоди','#e0e0e0');return;}
      if((HR.state==='center'||HR.state==='free')&&HR.pos.distanceTo(C)<9){HR.state='lull';HR.t=0;HR.lullCd=G.time+8;F.lulls=(F.lulls||0)+1;floatText(HR.pos.clone().add(new V3(0,1.8,0)),'Заяц задремал… ближе!','#c8d8ff');taunt('lull');}};
    return null;};
  /* ---------- «Ко мне!» — оставленный друга катится на своё кольцо ---------- */
  W.pingCall=(pi,h)=>{const own=other(pi);own.following=false;if(G.solo)for(const x of players[1-pi].heroes)x.following=false;if(F.stage!=='hunt')return;const q=other(1-pi);const tgtK=Math.min(2,circle);const s=SPOTS[tgtK][ORDER.indexOf(q.kind)];
    if(hd(q.pos,s.p)<1){floatText(q.pos.clone().add(new V3(0,q.d.height+0.6,0)),'Я на месте, здесь!',PCSS[1-pi]);return;}
    const from=q.pos.clone();SFX.roll();floatText(q.pos.clone().add(new V3(0,q.d.height+0.6,0)),'Качусь!',PCSS[1-pi]);q.rolling5=true;
    anim(0.9,k=>{q.pos.lerpVectors(from,s.p,smooth(k));q.face=Math.atan2(s.p.x-from.x,s.p.z-from.z);q.body.rotation.x=k<1?k*12:0;if(k>=1){q.rolling5=false;placeOnGround(q,s.p.x,s.p.z,0);q.vel.set(0,0,0);}});
    F.calls=(F.calls||0)+1;if(F.calls===2)later(1,()=>bark(T.pelageya,'pelageya','Теперь не зовём — вслух говорим!',2.2));};
  /* ---------- ход игры ---------- */
  function intro(){F.stage='introCine';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-3,0);h.face=Math.PI;});
    play({dur:14,fov:48,camK:2.6,shots:[shot(0,[0,7,6],[0,0.5,-18]),shot(5.4,[-3,1.6,-4.6],[-1,0.9,-3.2]),shot(9.4,[2.5,2,-5],[0,1,-3])],
      says:[[0.3,4,null,'<i>Заяц по поляне носится — в нём утка сидит,</i><br><i>Руками не поймать: быстрей ветра бежит.</i>',true],[5.6,3.2,'yosha','Зайца не догнать. Зайца загоняют.'],[9.4,2.4,'potap','Слушаем ежа.'],[11.6,2.4,'pelageya','Тут написано… изгородь из нитей.']],
      end:()=>{W.anims.length=0;HR.state='free';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-3,0);h.face=Math.PI;});snapCams();startHam();}});}
  // разминка: Хамелей у капусты перенял знак гуслей — плюётся каплями; распутали — загоняем зайца
  let ham=null;function startHam(){F.stage='ham';ham=hameleyFoe(C.x+3,C.z+5,{leash:8});banner('Хамелей у капусты!','#ffd76a',3,'знак гуслей перенял — распутайте');later(0.8,()=>bark(T.pelageya,'pelageya','Тут написано… у знака гуслей он плюётся каплями.',3));}
  function startHunt(){F.stage='hunt';HR.state='free';showCircle(0);SFX.ok();banner('Изгородь из нитей-ниток','#ffd76a',3,'меж героями, что ближе десяти шагов стоят, нить натягивается · пока идёшь — нить мигает');}
  function closeCircle(){const k=circle;SFX.ok();ringFx(new V3(C.x,0.1,C.z),COL.gold,RAD[k]+1);burst(new V3(C.x,1,C.z),COL.gold,20,4);giveLink(new V3(C.x,1,C.z),active(k%2),1.4,1.1);
    if(k===0&&HR.state==='free'){HR.state='back';HR.t=0;}
    if(k<2){circle=k+1;showCircle(circle);banner('Круг '+(k+1)+' сомкнулся!','#ffd76a',2.4,'сменяйтесь и подходите по одному — к кольцам поближе');
      if(k===0)later(1,()=>sayP('…смена, шаг, смена, шаг.',2.6));if(k===1)later(1,()=>bark(T.potap,'potap','Последний круг — три шага, всего три.',2.2));}
    else{circle=3;F.sit=true;HR.state='sit';HR.pos.copy(C);showCircle(-1);banner('Заяц сел в середине — попался!','#ffd76a',2.8,'Потап, подкинь '+K(0,'skill')+' Прошку — сверху на зайца он и упадёт');F.stage='toss';
      later(1,()=>bark(T.proshka,'proshka','Ну… лечу, лечу.',1.6));}}
  function finale(){F.stage='end';const pr=T.proshka,po=T.potap;
    play({dur:13,fov:46,camK:2.6,shots:[shot(0,[C.x+5,3,C.z+6],[C.x,1,C.z]),shot(4.6,[C.x+3,1.4,C.z+3.4],[C.x,0.8,C.z]),shot(8.2,[C.x,2,C.z+7],[C.x,8,C.z-6])],
      says:[[0.3,3.4,null,'<i>Потап подкидкой бросает Прошку прямо сверху — в объятия зайцу.</i>',true],[4.6,2.2,null,'<i>Заяц — апчхи!</i>',true],[6.8,3.4,null,'<i>…и утка из него выпархивает — прямо в небо.</i>',true],[10.2,2.4,'proshka','Держи её! …Улетела, эх.']],
      events:[{t:0.2,fn:()=>{placeOnGround(po,C.x+2.2,C.z+2.2,0);po.face=Math.atan2(-2.2,-2.2);placeOnGround(pr,C.x+1.6,C.z+1.6,0);const f=pr.pos.clone();anim(1.2,k=>{pr.pos.lerpVectors(f,new V3(C.x,0.9,C.z),k);pr.pos.y+=Math.sin(k*Math.PI)*5;});SFX.toss();po.atkT=0.3;}},
        {t:4.8,fn:()=>{SFX.whoosh();anim(0.5,k=>{hare.g.scale.setScalar(1.25+Math.sin(k*Math.PI)*0.3);});tone(1200,0.1,'square',0.05,300);}},
        {t:6.8,fn:()=>{const d=makeDuck();d.g.position.set(C.x,1.2,C.z);F.duck=d;anim(4,k=>{d.g.position.set(C.x+k*6,1.2+k*18,C.z-k*14);d.wings.forEach(w=>{w.w.rotation.z=w.s*Math.sin(G.time*20)*0.6;});});burst(new V3(C.x,1.4,C.z),0xc8a880,16,4);
          const hp=HR.pos.clone();anim(2.6,k=>{hare.g.position.set(hp.x-k*14,Math.abs(Math.sin(k*Math.PI*6))*1.2,hp.z+k*8);hare.g.rotation.y=Math.atan2(-14,8);});}}],
      end:()=>{W.anims.length=0;flushGifts();F.out=true;banner('Утка над морем улетела!','#ffd76a',2.6,'в лавке у Векши — заячьи уши, загляни!');
        later(1.8,()=>mirrorVision({narr:'<i>Зеркальце в мешке у Пелагеи потеплело. В нём — терем. А в тереме — Кощей. Один.</i>',line:'<i>(тихо)</i> …и опять никого.'},finishLevel));}});}
  W.skillHook=(pi,h)=>{if(F.stage!=='toss'||pi!==0)return false;if(h.kind!=='potap'){tip(0,'Подкидывает Потап. Смени на него '+K(0,'swap')+'.',2);return true;}finale();return true;};
  W.updates.push(dt=>{
    if(G.cine)return;if(F.stage==='ham'&&ham&&!ham.alive){ham=null;startHunt();}updFence();if(F.stage==='hunt'||F.stage==='toss'||F.stage==='ham')hareTick(dt);miceTick(dt);
    if(F.stage==='hunt'&&circle<3){const all=HEROES.every(h=>onSpot(h,circle)&&!h.rolling5)&&!TH.some(t=>t.cut);F.closeT=all&&HR.state!=='out'&&HR.state!=='dash'?(F.closeT||0)+dt:0;
      if(F.closeT>0.6){F.closeT=0;closeCircle();}}});
  W.camZones.push({x:C.x,y:0,z:C.z+1,r:10,camActive:()=>F.stage==='hunt'||F.stage==='toss'});
  /* ---------- рисунки кнопок и задачи ---------- */
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'call',()=>headOf(h()),()=>F.stage==='hunt'&&!G.cine&&TH.some(t=>t.state!=='solid')&&!onSpot(other(1-pi),Math.min(2,circle)),'позови — закрой дыру');
    prompt(pi,'swap',()=>headOf(h()),()=>F.stage==='hunt'&&!G.cine&&onSpot(h(),Math.min(2,circle))&&!onSpot(other(pi),Math.min(2,circle)),'переключись');}
  prompt(0,'skill',()=>headOf(T.potap),()=>F.stage==='toss'&&!G.cine,'подкидка!');
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const mk=pi=>[
    OR('Заяц…',()=>F.stage!=='intro'&&F.stage!=='introCine',()=>[hare.g]),
    OR(()=>'Хамелей у капусты знак гуслей перенял — плюётся каплями.<br>Защита — отбив '+K(pi,'guard')+', погасли угольки — удар '+K(pi,'attack')+'.',()=>F.stage!=='ham',()=>ham&&ham.alive?[ham.g]:[],null,'…хамелей. Перенял гусли — капли полетят.'),
    OR(()=>'На первый круг встаньте — все четверо: цифра и цвет — чьё кольцо.<br>Меж стоящими героями нить натянется — вот и крыльцо.',()=>circle>=1,()=>SPOTS[0].filter(s=>s.pi===pi).map(s=>s.g),null,'…оставленные — столбы, стоят.'),
    OR(()=>'Смена '+K(pi,'swap')+', шаг — по одному на кольца ближе. Дырка у друга — «Ко мне!» '+K(pi,'call')+'.<br>Мышь перегрызла нить — клубок по знаку '+K(pi,'item')+'. Мышь бежит — спугни ударом '+K(pi,'attack')+'.',()=>circle>=2,()=>SPOTS[1].filter(s=>s.pi===pi).map(s=>s.g),null,'…смена, шаг, смена, шаг.'),
    OR(()=>'Последний круг — три шага. Заяц хитрит: смотрит в одну сторону, бежит в другую.',()=>circle>=3,()=>SPOTS[2].filter(s=>s.pi===pi).map(s=>s.g),null,'…последний круг — три шага, три.'),
    OR(pi?()=>'Заяц сел в середине, ушами дрожит. Потап Прошку подкидывает.':()=>'Потап — подкидка '+K(0,'skill')+': Прошку — сверху прямо на зайца.',()=>F.stage==='end',()=>[hare.g]),
    O('Утка…',()=>false,()=>[])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>F.stage==='hunt'&&circle===0&&HR.state==='center'&&HR.lullCd<G.time&&hd(h.pos,C)<9,text:pi=>'Знак гуслей у капусты: '+K(pi,'item')+' — колыбельная, заяц задремлет.'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='hunt'&&TH.some(t=>t.cut),text:pi=>'Нить перегрызена! Клубок по знаку '+K(pi,'item')+' — свяжет тот, чья нить.'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='hunt'&&!onSpot(h,Math.min(2,circle)),text:pi=>'Твоё кольцо — с цифрой, твоего цвета. Пока идёшь — нити твои мигают,<br>А заяц это видит — и дырку примечает.'});
  W.k52={circle:()=>circle,spot:(k,kind)=>SPOTS[k][ORDER.indexOf(kind)].p,TH,MICE,HR,ham:()=>ham,ORDER};   // для бота-напарника: какой круг и где кольцо героя
  W.spawns=[[new V3(-3,0,-3),new V3(-1,0,-3)],[new V3(1,0,-3),new V3(3,0,-3)]];W.startAct=[0,0];
  W.pauseLine='Сначала — Хамелей у капусты: перенял гусли, плюётся каплями.<br>Заяц. Поймать нельзя — загоняют.<br>Четыре героя — четыре столба: ближе десяти шагов меж стоящими нить встаёт, а на ходу — мерцает.<br>На кольца круга встаньте, потом по одному — ближе.<br>Дырка у друга — «Ко мне!», и заяц не выскочит, слышишь?';
  W.onStart=()=>{intro();};
  flushDecor();}

