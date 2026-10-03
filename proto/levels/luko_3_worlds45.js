  function koscheiScene(){F.stage='lost';const pe=T.pelageya,pr=T.proshka,po=T.potap,Zv=W.zven;const ko=makeKoschei();ko.g.position.set(-8,-0.2,-28);ko.g.visible=false;
    if(players[0].act!==1)doSwap(0);HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-0.6,0);h.face=Math.PI;});
    nb3=makeNotebook();nb3.g.scale.setScalar(0.9);nb3.g.position.set(pe.pos.x+0.1,0.95,pe.pos.z+0.4);Zv.mode='script';Zv.vis=true;Zv.pos.set(pe.pos.x+0.1,1.35,pe.pos.z+0.4);
    const fly=[];const scat=()=>{const all=[];coils.children.forEach(c=>c.children.forEach(r=>all.push(r)));linkRing.forEach(r=>all.push(r));
      all.forEach((r,i)=>{const wp=new V3();r.getWorldPosition(wp);r.parent.remove(r);W.group.add(r);r.position.copy(wp);const to=new V3(rand(-5,5),0.08,-7+rand(-1,5.5));fly.push({r,from:wp,to,d:rand(0.8,1.6),ph:rand(0,6)});});};
    const pullRings=()=>{for(let i=0;i<7;i++)later(i*0.13,()=>{tone(1400-i*120,0.35,'sawtooth',0.1,300);tone(2600-i*200,0.2,'triangle',0.08,900);});};
    play({dur:58,fov:46,camK:2.2,
      shots:[shot(0,[0,4.4,8],[0,2.4,-8]),shot(4.4,[-4,3,-4],[-7,1.4,-22],[-3,2.6,-2],[-3,1.6,-10],6),shot(12,[4.2,3,-1.4],[0.2,3,-5]),shot(17.4,[3.6,2.6,1.2],[0,2.6,-6]),
        shot(22,[2.8,1.6,-2.6],[1.8,0.6,-5.2]),shot(25,[-3.6,1.8,1.2],[po.pos.x,1.2,po.pos.z]),shot(29,[pe.pos.x+2.4,1.8,pe.pos.z+2.2],[pe.pos.x,1.2,pe.pos.z-0.4]),shot(35.4,[1.4,2.8,-1.2],[0.2,3.2,-4.2]),
        shot(40,[7,3.2,-1],[-4,1.2,-40],[8,4.4,1],[-6,1,-60],6),shot(47.4,[0,3.6,5],[0,5,-7]),shot(51.6,[pr.pos.x+1.6,1.2,pr.pos.z+1.8],[pr.pos.x,0.6,pr.pos.z-0.4])],
      says:[[0.4,3.2,null,'<i>Звон ключей несётся издалёка.</i>',true],[4.4,4.4,null,'<i>Не таится Кощей на сей раз:</i><br><i>Через пир идёт он медленно — все расступились тотчас.</i>',true],
        [12.2,3.6,null,'<i>Цепь на дубе он хватает обеими руками — и тянет.</i>',true],[17.6,3.8,null,'<i>Рвутся витки — будто струны лопнули звеня,</i><br><i>Сыплются звенья в траву, блестя.</i>',true],
        [22,2.8,null,'<i>Кот к корням упал — и вновь молчит.</i>',true],[25.2,3.6,null,'<i>Потап всех щитом закрыл — да что ему щит?</i><br><i>Кощей на щит и не глядит.</i>',true],
        [29,3.8,null,'<i>Он глядит на тетрадку, где Звенышко светится ярко,</i><br><i>И руку тянет — жадно, жарко.</i>',true],[33,2.4,null,'<i>Звенышко само из тетрадки рвётся прочь —</i><br><i>Чтоб тетрадку Кощей не унёс в ночь…</i>',true],
        [35.6,2.6,null,'<i>…и в кулаке у него повисает, дрожит.</i>',true],[38.4,2.4,'koschei','Сказок больше не бывать.'],[40.8,4.4,null,'<i>И уходит в море — со Звенышком вместе.</i>',true],
        [47.6,3.4,null,'<i>Дуб стоит нагой.</i>',true],[51.4,3,null,'<i>Прошка звенья в горсть собирает,</i><br><i>Не обернувшись, молвит — и зубы сжимает:</i>',true],[54.6,2.8,'proshka','Скуём заново. Не беда.']],
      events:[{t:0.4,fn:()=>{SFX.keys();later(1.4,()=>SFX.keys());later(2.8,()=>SFX.keys());}},
        {t:4.4,fn:()=>{ko.g.visible=true;ko.g.rotation.y=0.35;anim(7.4,k=>{ko.g.position.set(lerp(-8,0.1,k),-0.2+Math.min(1,k*3)*0.2,lerp(-28,-4.1,k));ko.body.rotation.z=Math.sin(k*24)*0.03;});
          later(2.6,()=>{if(fb3){const f=fb3.g.position.clone();anim(2,k=>{fb3.g.position.set(f.x-k*3,f.y+k*5,f.z-k*2);});}if(sv3){const s=sv3.g.position.clone();anim(1.2,k=>{sv3.g.position.set(s.x-k*3,Math.abs(Math.sin(k*Math.PI*3))*0.4,s.z+k*1.5);});}
            if(st3){const y=st3.g.position.clone();anim(1.6,k=>{st3.g.position.set(y.x+k*3,y.y+k*1.2,y.z+k*1.5);});}HEROES.forEach(h=>{h.face=Math.atan2(ko.g.position.x-h.pos.x,ko.g.position.z-h.pos.z);});});}},
        {t:12.2,fn:()=>{ko.g.rotation.y=Math.PI;anim(1.2,k=>{ko.armR.rotation.x=-2.2*smooth(k);});SFX.keys();}},
        {t:15.2,fn:()=>{anim(2.2,k=>{ko.body.rotation.x=0.2*Math.sin(k*Math.PI);});}},
        {t:17.6,fn:()=>{pullRings();scat();shakeAll(0.05,0.8);SFX.crash();}},
        {t:22,fn:()=>{const from=kot.g.position.clone();anim(1,k=>{kot.g.position.set(lerp(from.x,1.9,k),from.y*(1-k*k),lerp(from.z,-4.9,k));kot.body.rotation.z=k*1.2;});later(1,()=>{SFX.thud();kot.lids.forEach(l=>{l.rotation.x=1.3;});});}},
        {t:25.2,fn:()=>{po.guard=true;anim(0.6,k=>{ko.armR.rotation.x=-2.2*(1-smooth(k));});}},
        {t:29,fn:()=>{ko.g.rotation.y=Math.atan2(pe.pos.x-ko.g.position.x,pe.pos.z-ko.g.position.z);anim(1.4,k=>{ko.armR.rotation.x=-1.2*smooth(k);});nb3.g.children.forEach(c=>{if(c.material&&c.material.emissive)c.material.emissiveIntensity=0.6;});}},
        {t:33,fn:()=>{const from=Zv.pos.clone();SFX.dzin();anim(2.2,k=>{const hp=new V3();ko.hand.getWorldPosition(hp);Zv.pos.lerpVectors(from,hp,smooth(k));Zv.pos.y+=Math.sin(k*Math.PI)*0.8;});}},
        {t:35.6,fn:()=>{F.zvenCaught=true;tone(1560,0.6,'triangle',0.1,780);}},
        {t:38.4,fn:()=>{tone(95,1.4,'sine',0.2);}},
        {t:40.8,fn:()=>{po.guard=false;ko.g.rotation.y=Math.PI*0.95;SFX.keys();anim(9,k=>{ko.g.position.set(lerp(0.1,-6,k),0,lerp(-4.1,-60,k));});}},
        {t:47.4,fn:()=>{ko.g.visible=false;Zv.vis=false;oak.traverse(o=>{if(o.isMesh&&o.geometry.type==='SphereGeometry'){const s0=o.scale.x;anim(2.6,k=>{o.scale.setScalar(Math.max(0.01,s0*(1-smooth(k))));if(k>=1)o.visible=false;});}});for(let i=0;i<30;i++)later(i*0.08,()=>burst(new V3(rand(-3,3),rand(7,10),-7+rand(-3,3)),0x6a8a3a,2,1.5));}},
        {t:51.4,fn:()=>{const near=fly.slice(0,6);pr.face=Math.PI*0.2;near.forEach((f,i)=>later(i*0.3,()=>{const s=f.r.position.clone();anim(0.5,k=>{f.r.position.lerpVectors(s,pr.pos.clone().add(new V3(0,0.8,0)),k);if(k>=1)f.r.visible=false;});tone(1300+i*60,0.12,'triangle',0.08);}));}}],
      tick:(t,dt)=>{for(const f of fly){const k=clamp((t-17.6)/f.d,0,1);f.r.position.lerpVectors(f.from,f.to,smooth(k));f.r.position.y=lerp(f.from.y,0.08,k*k)+Math.sin(k*Math.PI)*0.6;f.r.rotation.x+=k<1?0.2:0;}
        if(F.zvenCaught&&t<47.4){const hp=new V3();ko.hand.getWorldPosition(hp);Zv.pos.copy(hp);}},
      end:()=>{G.flags.w3done=true;F.stage='free';ko.g.visible=false;Zv.vis=false;if(nb3)W.group.remove(nb3.g);po.guard=false;
        banner('Сказ «Соловьиная песня»','#ffd76a',2.6,'звенья мира при вас остаются · весточка: '+(G.flags.skaz3?G.flags.skaz3[1]:'Жар-птица'));later(3,()=>showMenu('end'));}});}

  /* ---------- Мир 4: без Звенышка — подсказки читает Пелагея; витки сращивают Демьяновыми клещами ---------- */
  const W4COIL=['4-1','4-2','4-4'];
  const coilPending=()=>G.flags.w3done&&!G.flags.w4done&&W4COIL.filter(id=>G.done[id]).length>(G.flags.w4c||0);
  // листва дуба возвращается с каждым витком
  function leafShow(n,anim1){const sp=[];oak.traverse(o=>{if(o.isMesh&&o.geometry.type==='SphereGeometry')sp.push(o);});const frac=[0,0.35,0.6,0.8,1][Math.min(4,n)],on=Math.round(sp.length*frac);
    sp.forEach((o,i)=>{const vis=i<on;o.material=M(new THREE.Color(0x7d8a6a).lerp(new THREE.Color(0x3f9a2c),0.35+0.15*n).getHex());if(vis&&!o.visible&&anim1){const s0=o.userData.s0||(o.userData.s0=o.scale.x||1);o.visible=true;o.scale.setScalar(0.01);anim(1.6,k=>{o.scale.setScalar(Math.max(0.01,s0*smooth(k)));});}else{if(!o.userData.s0)o.userData.s0=o.scale.x;o.visible=vis;}});}
  /* ---------- вступление к миру 4: пантомима Кота (молот), ложка Йоши, «Без Демьяновых клещей не срастить» ---------- */
  function w4Intro(){F.stage='w4intro';const pe=T.pelageya,yo=T.yosha,pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-12.6,0);h.face=Math.atan2(1.9-h.pos.x,-4.9-h.pos.z);});
    const spoon=new THREE.Group();addMesh(new THREE.CylinderGeometry(0.03,0.03,0.5,6),M(0x9a6a3a),0,0.25,0,spoon);addMesh(new THREE.SphereGeometry(0.09,8,6),M(0x9a6a3a),0,0.52,0,spoon);spoon.visible=false;W.group.add(spoon);
    const nb=makeNotebook();nb.g.scale.setScalar(0.9);nb.g.position.set(pe.pos.x+0.1,0.95,pe.pos.z+0.3);
    play({dur:25,fov:46,camK:2.4,shots:[shot(0,[4.6,2.4,-9],[1.9,0.6,-4.9]),shot(5,[5.4,2.2,-8],[2,1.2,-5]),shot(10.4,[5.6,1.8,-9.8],[1.6,0.8,-5.2]),shot(15,[7.6,2.4,-4],[10.2,1.6,-0.6]),shot(20,[pe.pos.x+2,1.5,pe.pos.z+1.6],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,4.4,null,'<i>Дуб стоит нагой. Кот от корней подымается — молча.</i>',true],[5,4.4,null,'<i>Кот на кузню лапой кажет и молот изображает:</i><br><i>Тук-тук-тук — по воздуху ударяет.</i>',true],
        [10.4,2.2,'yosha','Понял, понял — вот так раз!'],[12.4,2.6,null,'<i>Йоша ложку ему приносит — угодил!</i>',true],[15,4.2,null,'<i>Кузьма на рваную цепь у корней глядит.</i>',true],[17.4,2.6,'kuzma','Без Демьяновых клещей её не срастить.'],
        [20,4.6,'pelageya','<i>(по тетрадке)</i> …кузня Кузьмы и Демьяна<br>У огненной реки стоит — жарко там и рано.']],
      events:[{t:0.3,fn:()=>{anim(1.6,k=>{kot.body.rotation.z=1.2*(1-smooth(k));});kot.lids.forEach(l=>{l.rotation.x=-0.5;});}},
        {t:5,fn:()=>{kot.g.rotation.y=Math.atan2(10.2-kot.g.position.x,-0.6-kot.g.position.z);anim(4,k=>{kot.body.rotation.x=Math.abs(Math.sin(k*Math.PI*6))*0.3;});for(let i=0;i<3;i++)later(1+i*1.2,()=>tone(700,0.12,'triangle',0.08));}},
        {t:10.4,fn:()=>{kot.body.rotation.x=0;spoon.visible=true;const f=yo.pos.clone();anim(1.8,k=>{yo.pos.lerpVectors(f,new V3(1.2,0,-4.2),smooth(k));yo.face=Math.atan2(1.9-yo.pos.x,-4.9-yo.pos.z);spoon.position.set(yo.pos.x+0.3,0.6,yo.pos.z-0.2);});}},
        {t:13.6,fn:()=>{spoon.position.set(1.6,0.5,-4.6);anim(0.8,k=>{kot.head.rotation.x=0.4*Math.sin(k*Math.PI);});}},
        {t:15,fn:()=>{anim(0.8,k=>{kuz.head.rotation.x=0.4*smooth(k);});}}],
      end:()=>{W.anims.length=0;W.group.remove(nb.g);W.group.remove(spoon);kot.body.rotation.z=0;kot.body.rotation.x=0;kot.head.rotation.x=0;kuz.head.rotation.x=0;G.flags.w4intro=true;later(0.2,mapScene4);}});}
  function mapScene4(){F.stage='map';F.rushnik=true;map.visible=true;map.scale.z=0.01;anim(1.2,k=>{map.scale.z=Math.max(0.01,smooth(k));});icons.forEach(g=>{g.scale.y=1;});
    HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16.2,0);h.face=Math.PI;});const vz=makeVestZ(helperOf(3));vz.pos.set(0,3,-15);
    play({dur:11.4,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5]),shot(4,[3.4,2.4,-15.6],[2.1,0.4,-18.5]),shot(7.8,[2,2,-14],[2.1,6,-24])],
      says:[[0.4,3.4,null,'<i>На рушнике — огненная река,</i><br><i>Нитками цвета жара вышита слегка.</i>',true],[4,3.2,'pelageya','…четвёртый мир — Смородина огневая.'],[7.6,3,null,'<i>Весточка помощника — нырь в вышитый огонь,</i><br><i>И четверых за ней утянуло — только тронь.</i>',true]],
      events:[{t:6.9,fn:()=>{const from=vz.pos.clone(),to=new V3(2.1,0.5,-18.5);anim(1.1,k=>{vz.pos.lerpVectors(from,to,k*k);});later(1.1,()=>{ringFx(to,0xff8a3a,3);burst(to,0xffb040,20,5);vz.g.visible=false;SFX.whoosh();});}},
        {t:8.1,fn:()=>{HEROES.forEach(h=>{const from=h.pos.clone(),to=new V3(2.1,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});
          for(let i=0;i<6;i++)later(i*0.2,()=>ringFx(new V3(2.1,0.3+i*0.4,-18.5),[0xff8a3a,COL.gold][i%2],1.5+i*0.4));}},{t:10,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4&&t<6.9)vz.pos.set(2.1+Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map4=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('4-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  /* ---------- сращиваем виток: 20 секунд ковки Демьяновыми клещами; дуб зеленеет, Кот снова шепчет ---------- */
  const CG={on:false};
  function coilGame(){const n=G.flags.w4c||0;G.ui='forge';F.forging=true;const pr=T.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);
    Object.assign(CG,{on:true,t:-1.5,k:-3,B:0.75,good:0,n,done:{}});
    if(!CG.ring){CG.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,6,28),MB(COL.gold,{transparent:true,opacity:0.9}));CG.ring.rotation.x=Math.PI/2;W.group.add(CG.ring);
      CG.tongs=new THREE.Group();const tm=M(0x3a3a44);for(const s of[-1,1]){const a=addMesh(new THREE.BoxGeometry(0.06,0.05,0.9),tm,s*0.05,0,0.4,CG.tongs);a.rotation.y=-s*0.12;}CG.tongs.position.set(0,-0.8,0.2);kuz.arm.add(CG.tongs);}
    CG.ring.visible=true;CG.tongs.visible=true;banner('Чиним цепь: '+(n+1)+' из 3','#ffd76a',2.6,'Кузьма держит Демьяновы клещи · Прошка, бей '+K(0,'attack')+' в такт двадцать секунд подряд');G.uiTick=coilTick;}
  function coilTick(){const dt=1/60;CG.t+=dt;const k=Math.floor(CG.t/CG.B+1e-6);while(CG.k<k){CG.k++;if(CG.k<0)tone(1760,0.05,'square',0.05);else tone(880,0.04,'square',0.03);}
    const u=((CG.t%CG.B)+CG.B)%CG.B/CG.B;CG.ring.position.set(8.6,1.0,0.6);CG.ring.scale.setScalar(lerp(1.4,0.3,u));CG.ring.material.color.setHex(u>0.8?0xffffff:COL.gold);kuz.arm.rotation.x=-0.6;
    if(tap(0,'attack')&&CG.t>0){const kk=Math.round(CG.t/CG.B);if(!CG.done[kk]){CG.done[kk]=1;const d=Math.abs(CG.t-kk*CG.B);const ok=d<=0.2+(W.ladBonus||0);const pr=T.proshka;pr.atkT=0.28;
        later(0.06,()=>{SFX.hammer();tone(ok?2600:1700,ok?0.45:0.2,'triangle',ok?0.22:0.1);burst(new V3(8.6,1.0,0.6),ok?0xffe060:0xffa040,ok?16:6,ok?5:2);blank.material.emissiveIntensity=1.6;floatText(new V3(8.6,1.9,0.6),ok?'Дзинь!':'тук',ok?'#ffe36b':'#e0c0a0');});if(ok)CG.good++;}}
    blank.material.emissiveIntensity=damp(blank.material.emissiveIntensity,0.9,4,dt);
    if(CG.t>20)coilEnd();}
  const KOTW=['<i>(шёпотом)</i> …у лукоморья…','<i>(шёпотом)</i> …дуб зелёный…','<i>(шёпотом)</i> …златая цепь…','<i>(шёпотом)</i> …на дубе том…'];
  function coilEnd(){CG.on=false;CG.ring.visible=false;CG.tongs.visible=false;G.ui=null;G.uiTick=null;F.forging=false;kuz.arm.rotation.x=0;const n=CG.n;G.flags.w4c=n+1;const good=CG.good;
    play({dur:11,fov:46,camK:2.4,shots:[shot(0,[6,2.6,4],[8.6,1,0.6]),shot(3,[4,3.4,-1],[0,3,-7]),shot(7.4,[4.4,1.8,-2.4],[1.9,0.8,-4.9])],
      says:[[0.3,2.6,'kuzma',good>=12?'Славно сращено. Демьян бы похвалил.':'Держится. Срослось, как было.'],[3,4,null,'<i>Виток на дуб подымается — и дуб зеленеет на глазах.</i>',true],[7.4,3.2,'kot',KOTW[n]]],
      events:[{t:3,fn:()=>{const c=addCoil(n,true);c.scale.setScalar(0.01);anim(1.4,k=>c.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();leafShow(n+1,true);
        (W.scat||[]).splice(0,7).forEach((r,i)=>{const f=r.position.clone();anim(1+i*0.1,k=>{r.position.lerpVectors(f,new V3(0,1.2+n*0.62,-7),smooth(k));if(k>=1)r.visible=false;});});}},
        {t:7.4,fn:()=>{kot.body.rotation.z=0;kot.lids.forEach(l=>{l.rotation.x=-0.5;});anim(0.8,k=>{kot.head.rotation.x=-0.3*Math.sin(k*Math.PI);});}}],
      end:()=>{W.anims.length=0;banner('Виток '+(n+1)+' из 3 — на дубе','#ffd76a',2.4,n+1<3?'Кот снова шепчет, шепчет':'дуб почти зелёный, почти живой');}});}
  /* ---------- кузня перед Горынычем: на равных; узду Кузьма куёт сам — «Клещами возьмёте» ---------- */
  function forgeScene4(){F.forging=true;const pr=T.proshka,po=T.potap,pe=T.pelageya,yo=T.yosha;placeOnGround(pr,7.6,1.8,0);placeOnGround(po,6.2,2.6,0);placeOnGround(pe,6.6,0.4,0);placeOnGround(yo,7.2,3.4,0);HEROES.forEach(h=>{h.face=Math.atan2(8.6-h.pos.x,0.6-h.pos.z);});
    const uz=new THREE.Group();uz.visible=false;W.group.add(uz);const UL=hotLook('uzda',uz);
    play({dur:22,fov:46,camK:2.4,shots:[shot(0,[5,2.4,4.4],[7.4,1,1.8]),shot(8.4,[9.6,2,2.6],[9.8,1.4,-0.2]),shot(14,[7.6,1.6,3.6],[8.6,1,0.6]),shot(18,[pr.pos.x-1.4,1.3,pr.pos.z+1.6],[8.6,1,0.6])],
      says:[[0.3,3,null,'<i>Прошка с Кузьмой куёт наравне.</i><br><i>А из чего узду Горынычу делать — спорят все.</i>',true],[3.4,1.6,'proshka','Из железа, ей-же-ей!'],[5,1.6,'potap','Из верёвки, из пеньки!'],[6.6,1.8,'pelageya','Из ниточек…'],[8.4,1.2,'yosha','Из… из…'],
        [9.8,3.6,null,'<i>Пока спорят — Кузьма узду куёт молча, сам.</i>',true],[14,2.2,null,'<i>И отдаёт — горячую, пылающую.</i>',true],[16.4,2.4,'kuzma','Клещами возьмёте — не рукой.'],[19,2.6,null,'<i>Ворота к Горынычу отворились.</i>',true]],
      events:[{t:9.8,fn:()=>{for(let i=0;i<5;i++)later(i*0.7,()=>{anim(0.3,q=>{kuz.arm.rotation.x=-Math.sin(q*Math.PI)*1.3;});later(0.15,()=>{SFX.hammer();burst(new V3(8.6,1.0,0.6),0xffb040,10,3);});});}},
        {t:14,fn:()=>{uz.visible=true;uz.position.set(8.6,1.0,0.6);UL.m.emissiveIntensity=1;anim(1.4,k=>{uz.position.set(lerp(8.6,pr.pos.x+0.6,k),1.0+Math.sin(k*Math.PI)*0.6,lerp(0.6,pr.pos.z-0.4,k));});}},
        {t:19,fn:()=>{SFX.gate();SFX.ok();G.flags.forged4=true;banner('Отворились ворота 4-Б!','#ffd76a',2.6,'на рушнике-карте — Змей Горыныч, гляди!');}}],
      end:()=>{W.anims.length=0;W.group.remove(uz);F.forging=false;kuz.arm.rotation.x=0;G.flags.forged4=true;}});}
  /* ---------- праздник мира 4: Горыныч в узде возит нас; ролик «Ученик»; Сказ 4 «Одно сердце»; «Жил-был мальчишка…» ---------- */
  let gor4=null;
  function festival4(){F.stage='fest';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-14,0);h.face=Math.PI;});snapCams();gor4=makeGorynych();gor4.g.scale.setScalar(0.75);gor4.g.position.set(-30,12,-60);gor4.g.rotation.y=0.6;
    const uz=new THREE.Group();gor4.g.add(uz);uz.position.set(0,5.2,1.8);hotLook('uzda',uz).m.emissiveIntensity=0.3;
    play({dur:10,fov:48,camK:2.4,shots:[shot(0,[0,3,-6],[-10,8,-40],[0,3,-8],[0,2,-22],8)],
      says:[[0.3,3.6,null,'<i>По уговору Горыныч на Лукоморье прилетает —</i><br><i>В Кузьминой узде, смирно, не пылает.</i>',true],[4.6,2.8,'gorM','Садитесь. Уговор дороже злата.'],[7.6,2.2,'gorL','Только не пинайтесь, ребята…']],
      events:[{t:0.2,fn:()=>{const f=gor4.g.position.clone();anim(6,k=>{gor4.g.position.lerpVectors(f,new V3(0,0.4,-24),smooth(k));gor4.g.position.y+=Math.sin(k*Math.PI)*4;gor4.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(k*26)*0.5;});});}}],
      end:()=>{W.anims.length=0;gor4.g.position.set(0,0.4,-24);ride4();}});}
  const onBack=[[-0.9,6.2,0.4],[0.9,6.2,0.4],[-0.8,6.1,-1.2],[0.8,6.1,-1.2]];
  function ride4(){F.stage='ride';const g=gor4.g;
    const seat=()=>{HEROES.forEach((h,i)=>{const o=new V3(...onBack[i]).multiplyScalar(0.75).applyEuler(g.rotation);h.pos.set(g.position.x+o.x,g.position.y+o.y,g.position.z+o.z);h.vel.set(0,0,0);h.face=g.rotation.y;});};
    play({dur:16,fov:50,camK:2,shots:[shot(0,[0,15,3],[0,8.5,-30]),shot(8,[-19,13,-12],[0,9,-30],[-17,15,-6],[0,9,-32],8)],
      says:[[0.4,3.6,null,'<i>Над морем Горыныч нас несёт.</i><br><i>Головы сказывают, перебивая, — кто кого перебьёт.</i>',true],[4.4,3,'gorL','Тыщу лет тому назад…'],[7.6,2.6,'gorR','Не тыщу! Девятьсот девяносто, говорят!'],[10.4,2.6,'gorM','Тихо. Про ученика сказывайте ладом.'],[13.2,2.4,'gorL','Ну вот. Был у Кота ученик — с молотком…']],
      tick:(t)=>{const a=t/16*Math.PI*1.2;g.position.set(Math.sin(a)*12,9+Math.sin(t*1.3)*0.6,-30-Math.cos(a)*10);g.rotation.y=a+Math.PI/2;gor4.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(t*6)*0.5;});seat();},
      end:()=>{W.anims.length=0;uchenik();}});}
  // ролик «Ученик»: лубки, головы рассказывают по очереди
  const UCH=[{pic:'u1',lines:[['gorL','Тыщу лет тому назад<br>Был у Кота ученик, говорят.'],['gorR','Тощий мальчик, с молотком.'],['gorM','Сказки сам сложить мечтал тайком.']]},
    {pic:'u2',lines:[['gorR','Кот любил его сердечно.'],['gorL','Но в сказках проигравшим записал навечно.'],['gorM','Ведь кому-то проигрывать надо — таков закон.']]},
    {pic:'u3',lines:[['gorL','На последней картинке лубка — всегда он.'],['gorR','И все над ним смеются хором.']]},
    {pic:'u4',lines:[['gorM','Просил мальчишка переписать — с укором.'],['gorL','Кот же не переписал ни строчки.']]},
    {pic:'u5',lines:[['gorL','А потом он вырос — время шло…'],['gorL','…и стал костью да ключами — всё ушло.'],['gorR','Мы-то думали — злодей какой,<br>А он в сказке быть не хотел такой.']]}];
  function uchenik(){G.ui='lubok';const el=$('mapui');el.style.display='flex';let pi=0,li=0,tt=0;const g=gor4.g;
    const draw=()=>{const P=UCH[pi],L=P.lines[li],w=WHO[L[0]];el.innerHTML='<div class="lubok"><div style="font:900 22px Georgia,serif;color:#8a1a14;margin-bottom:8px">«Ученик»</div>'+(LUBOK[P.pic]||'')+
      '<div class="cap"><b style="color:'+w[1]+'">'+w[0]+':</b> '+L[1]+'</div><div class="hint" style="font:600 13px system-ui;opacity:.7">'+(pi+1)+' / '+UCH.length+' · '+K(0,'jump')+' дальше</div></div>';babble(L[0],L[1]);};
    draw();
    G.uiTick=()=>{tt+=1/60;const a=G.time*0.3;g.position.set(Math.sin(a)*12,9,-30-Math.cos(a)*10);g.rotation.y=a+Math.PI/2;HEROES.forEach((h,i)=>{const o=new V3(...onBack[i]).multiplyScalar(0.75).applyEuler(g.rotation);h.pos.set(g.position.x+o.x,g.position.y+o.y,g.position.z+o.z);h.vel.set(0,0,0);});
      if(tt>4.6||tap(0,'jump')||tap(1,'jump')){tt=0;li++;if(li>=UCH[pi].lines.length){li=0;pi++;}if(pi>=UCH.length){G.ui=null;G.uiTick=null;el.style.display='none';landing4();return;}draw();SFX.flower();}};}
  function landing4(){const pe=T.pelageya,g=gor4.g;
    play({dur:15,fov:46,camK:2.2,shots:[shot(0,[6,4,-14],[0,2,-24]),shot(5.4,[pe.pos.x+1.8,1.4,-14.6],[pe.pos.x,0.9,-16]),shot(10.4,[0,3,-8],[0,1.4,-16])],
      says:[[0.3,4.4,null,'<i>Горыныч у моря садится —</i><br><i>Пелагея всю дорогу молчала, как птица.</i>',true],[5.4,4.6,null,'<i>Потом тихонько молвит, ни на кого не глядя:</i>',true],[9.2,3,'pelageya','Он ведь тоже сочинял…']],
      events:[{t:0.2,fn:()=>{const f=g.position.clone();anim(3,k=>{g.position.lerpVectors(f,new V3(-10,0.4,-21),smooth(k));g.rotation.y=lerp(g.rotation.y,0.9,k);});
        later(3,()=>{F.landed=true;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16,0);h.face=Math.PI*0.8;});});}}],
      tick:(t)=>{if(!F.landed&&t<3){HEROES.forEach((h,i)=>{const o=new V3(...onBack[i]).multiplyScalar(0.75).applyEuler(g.rotation);h.pos.set(g.position.x+o.x,g.position.y+o.y,g.position.z+o.z);h.vel.set(0,0,0);});}},
      end:()=>{W.anims.length=0;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-1.6,0);h.face=Math.PI;});g.position.set(-10,0.4,-21);snapCams();skaz4();}});}
  function skaz4(){G.ui='skaz';const el=$('skaz');el.style.display='flex';
    const steps=[{who:0,title:'Начало выбирает Игрок первый.',opts:['Три головы всё спорили — не сговорились','У огненной реки кузня стояла','Жил-был медведь, что мост держал']},
      {who:1,title:'Помощника выбирает Игрок второй.',opts:['Демьян с молотом тяжёлым','Кикимора с куделью крепкою','Леший со светлячками-огоньками']},
      {who:2,title:'Конец — вместе: оба на одной строке, и оба жмите разом.',opts:['И понял Змей: у трёх голов — одно сердце','И по Калинову мосту опять ходят','И кузнецы от жара пробудились']}];
    let st=0;const sel=[0,0,0],both=[0,0],ok=[false,false];
    const draw=()=>{const s2=steps[st];el.innerHTML='<div class="tet"><h2>Сказ · «Одно сердце»</h2><div class="step">'+s2.title+'</div>'+
      s2.opts.map((o,i)=>'<div class="opt'+((s2.who<2?sel[st]===i:false)?' sel':'')+'">'+(s2.who===2?[0,1].map(q=>both[q]===i?'<b style="color:'+PCSS[q]+'">'+(ok[q]?'●':'○')+'</b>':'<b></b>').join(''):'')+o+'</div>').join('')+
      '<div class="hint">'+(s2.who===2?'оба: '+K(0,'left')+K(0,'right')+' / '+K(1,'left')+K(1,'right')+' · '+K(0,'jump')+' + '+K(1,'jump'):K(s2.who,'up')+K(s2.who,'down')+' · '+K(s2.who,'jump'))+'</div>'+
      '<div class="tale">'+[steps[0].opts[sel[0]],st>0?'помощник — '+steps[1].opts[sel[1]]:''].filter(x=>x).join(' · ')+'</div></div>';};
    draw();
    G.uiTick=()=>{const s2=steps[st];
      if(s2.who<2){const n=uiNav(UW(s2.who));if(n.dy||n.dx){sel[st]=(sel[st]+(n.dy||n.dx)+3)%3;SFX.swap();draw();}if(tap(UW(s2.who),'jump')){SFX.ok();st++;draw();}}
      else{for(const q of[0,1]){const n=uiNav(q);if(n.dy||n.dx){both[q]=(both[q]+(n.dy||n.dx)+3)%3;ok[q]=false;SFX.swap();draw();}if(tap(q,'jump')){ok[q]=true;if(G.solo){ok[1-q]=true;both[1-q]=both[q];}SFX.plate();draw();}}
        if(ok[0]&&ok[1]){if(both[0]===both[1]){sel[2]=both[0];SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';tell4(steps.map((x,i)=>x.opts[sel[i]]));}
          else{ok[0]=ok[1]=false;SFX.miss();banner('Конец — одной строкой!','#ffd0d0',1.4,'договоритесь — и нажмите вдвоём');draw();}}}};}
  let nb4=null;
  function tell4(t){const pe=T.pelageya,pr=T.proshka;G.flags.skaz4=t;nb4=makeNotebook();nb4.g.scale.setScalar(0.9);nb4.g.position.set(pe.pos.x+0.1,0.95,pe.pos.z+0.3);
    play({dur:15.6,fov:46,shots:[shot(0,[pe.pos.x+1.8,1.3,pe.pos.z+1.5],[pe.pos.x,0.9,pe.pos.z]),shot(8.4,[pr.pos.x-1.6,1.3,pr.pos.z+1.6],[pr.pos.x,0.9,pr.pos.z])],
      says:[[0.3,3.6,'pelageya',t[0]+'…'],[4.1,3.6,'pelageya','И помог им в том '+t[1]+'.'],[7.9,4.2,'pelageya',t[2]+'.'],[12.2,3.2,null,'<i>Пелагея сказывает ровно, гладко —</i><br><i>Но глаз не отрывает от тетрадки.</i>',true]],
      end:()=>{later(0.2,writeScene);}});}
  // «Жил-был мальчишка, который хотел сочинять сказки…» — ручка останавливается
  function writeScene(){G.ui='write';const el=$('skaz');el.style.display='flex';const txt='Жил-был мальчик — сказки сам сложить мечтал…';let n=0,tt=0,stopT=0;
    const draw=()=>{el.innerHTML='<div class="tet" style="min-width:min(560px,92vw)"><div class="step" style="opacity:.7">Пелагея переворачивает страницу и пишет:</div><div style="font:italic 700 24px Georgia,serif;color:#2a1a10;min-height:70px;padding:12px 4px">'+txt.slice(0,n)+(n<txt.length?'<span style="opacity:.5">|</span>':'')+'</div>'+
      (stopT>0?'<div class="hint" style="opacity:.8">Ручка останавливается. Дальше она не знает.</div>':'')+'</div>';};
    draw();
    G.uiTick=()=>{tt+=1/60;if(n<txt.length){if(tt>0.09){tt=0;n++;draw();if(n%3===0)tone(2200+Math.random()*400,0.02,'square',0.015);}}else{stopT+=1/60;if(stopT<0.02)draw();if(stopT>3.8||(stopT>1.2&&(tap(0,'jump')||tap(1,'jump')))){G.ui=null;G.uiTick=null;el.style.display='none';finale4();}}};}
  function finale4(){const pe=T.pelageya;if(nb4){W.group.remove(nb4.g);nb4=null;}
    play({dur:12,fov:48,camK:2.4,shots:[shot(0,[0,4,4],[0,4,-7]),shot(6,[4.4,2.6,-1.4],[1.9,1.4,-5])],
      says:[[0.3,3.6,null,'<i>Кузьма цепь на дуб подымает —</i><br><i>Снова наполовину она сияет.</i>',true],[4.2,2.4,null,'<i>Дуб зелёный. Горыныч у моря дремлет.</i>',true],[6.4,3.4,'kot','<i>(шёпотом, но словами)</i> …и днём и ночью кот учёный…'],[9.8,2,'proshka','Ну… почти что, почти.']],
      events:[{t:0.4,fn:()=>{const c=addCoil(3,true);c.scale.setScalar(0.01);anim(1.4,k=>c.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();leafShow(4,true);(W.scat||[]).splice(0).forEach(r=>{r.visible=false;});G.flags.coils=Math.max(4,G.flags.coils||0);}},
        {t:6.4,fn:()=>{kot.body.rotation.z=0;kot.lids.forEach(l=>{l.rotation.x=-0.5;});lullaby([67,71,74,72],0.4,0,0.1);}}],
      end:()=>{W.anims.length=0;G.flags.w4done=true;G.flags.coils=4;F.stage='free';banner('Сказ «Одно сердце»','#ffd76a',2.6,'цепь на дубе вновь растёт · Горыныч в узде смирён');later(3,()=>showMenu('end'));}});}
  // после мира 4 Горыныч дремлет у моря
  let gorH=null;if(G.flags.w4done){gorH=makeGorynych5(0.7);gorH.g.position.set(-10,0.4,-21);gorH.g.rotation.y=0.9;W.cyls.push({x:-10,z:-21,r:2.4,miny:-1,maxy:3,on:true});}

  /* ---------- Мир 5: Горыныч везёт на Буян · надпись на песке · Звенышко вернулось · девять звеньев на терем · «Без имён» · Лукоморье после финала ---------- */
  function sandWriting(text,sword,x,z){const cv=document.createElement('canvas');cv.width=512;cv.height=160;const c=cv.getContext('2d');c.fillStyle='rgba(0,0,0,0)';c.fillRect(0,0,512,160);
    c.strokeStyle='rgba(90,60,30,0.85)';c.fillStyle='rgba(90,60,30,0.8)';c.font='bold 54px Georgia, serif';c.textAlign='center';c.fillText(text,sword?220:256,98);
    if(sword){c.lineWidth=7;c.beginPath();c.moveTo(430,30);c.lineTo(470,130);c.moveTo(418,60);c.lineTo(462,52);c.stroke();c.beginPath();c.moveTo(405,40);c.lineTo(495,120);c.moveTo(495,40);c.lineTo(405,120);c.lineWidth=5;c.stroke();}
    const tx=new THREE.CanvasTexture(cv);const m=new THREE.Mesh(new THREE.PlaneGeometry(6,1.9),new THREE.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,0.04,z);W.group.add(m);return m;}
  function w5Intro(){F.stage='w5intro';const pe=T.pelageya,pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-5.6+i*1.4,-15.6,0);h.face=Math.atan2(-10-h.pos.x,-21-h.pos.z);});
    const H=gorH?gorH.heads:null;
    play({dur:20,fov:46,camK:2.4,shots:[shot(0,[-3,3,-12],[-10,2,-21]),shot(6.6,[-6,4,-14],[-10,5.4,-19]),shot(13.6,[pe.pos.x+2,1.5,pe.pos.z+1.8],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,3.6,null,'<i>Горыныч у моря потягивается —</i><br><i>Тремя головами разом позёвывается.</i>',true],[4,2,'gorL','Уговор есть уговор.'],[6,1.8,'gorR','Возим, возим!'],[7.8,4.2,'gorM','Садитесь — на Буян! На острове — дуб,<br>А на дубе — сундук…'],
        [12.2,4,'pelageya','…в сундуке — заяц, в зайце — утка,<br>В утке — яйцо, в яйце — игла, не шутка.'],[16.4,2.8,'proshka','Матрёшка, право, какая-то!']],
      events:[{t:0.3,fn:()=>{if(gorH)anim(2,k=>{gorH.g.position.y=0.4+Math.sin(k*Math.PI)*0.6;gorH.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(k*Math.PI*3)*0.5;});});}},
        {t:4,fn:()=>{if(H)anim(0.5,k=>{H[2].jaw.rotation.x=Math.sin(k*Math.PI)*0.5;});}},{t:6,fn:()=>{if(H)anim(0.5,k=>{H[0].jaw.rotation.x=Math.sin(k*Math.PI)*0.5;});}},{t:7.8,fn:()=>{if(H)anim(3.4,k=>{H[1].jaw.rotation.x=Math.abs(Math.sin(k*Math.PI*5))*0.4;});}}],
      end:()=>{W.anims.length=0;G.flags.w5intro=true;later(0.2,mapScene5);}});}
  function mapScene5(){F.stage='map';F.rushnik=true;map.visible=true;map.scale.z=0.01;anim(1.2,k=>{map.scale.z=Math.max(0.01,smooth(k));});icons.forEach(g=>{g.scale.y=1;});
    HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16.2,0);h.face=Math.PI;});const vz=makeVestZ(helperOf(4));vz.pos.set(0,3,-15);
    play({dur:11.4,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5]),shot(4,[5.4,2.4,-15.6],[4.2,0.4,-18.5]),shot(7.8,[4,2,-14],[4.2,6,-24])],
      says:[[0.4,3.4,null,'<i>Вышит остров: на нём — дуб стоит,</i><br><i>На дубе сундук на четырёх цепях висит.</i>',true],[4,3.2,'pelageya','…пятый мир — остров Буян, за морем-окияном.'],[7.6,3,null,'<i>Весточка — нырь в вышитое море,</i><br><i>И четверых за ней утянуло вскоре.</i>',true]],
      events:[{t:6.9,fn:()=>{const from=vz.pos.clone(),to=new V3(4.2,0.5,-18.5);anim(1.1,k=>{vz.pos.lerpVectors(from,to,k*k);});later(1.1,()=>{ringFx(to,0x7ad8ff,3);burst(to,0xffe0a0,20,5);vz.g.visible=false;SFX.whoosh();});}},
        {t:8.1,fn:()=>{HEROES.forEach(h=>{const from=h.pos.clone(),to=new V3(4.2,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});}},{t:10,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4&&t<6.9)vz.pos.set(4.2+Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map5=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('5-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  // перед яйцом: Кот пишет на мокром песке «В тереме — не победить» и рисует перечёркнутый меч
  function sandScene(){F.stage='sand';const kz=kuz;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-15.2,0);h.face=Math.PI;});let wr=null;
    play({dur:19,fov:44,camK:2.4,shots:[shot(0,[3,2.6,-13],[1,0.4,-19]),shot(6,[1,5,-15],[0.6,0,-19.6]),shot(11,[6,2,-13],[kz.g.position.x,1.4,kz.g.position.z]),shot(14.6,[2,2.2,-14],[0.4,1,-18.8])],
      says:[[0.3,4.6,null,'<i>Перед яйцом — Лукоморье. Кот подходит к воде и пишет лапой на мокром песке три слова, а рядом рисует перечёркнутый меч.</i>',true],[11,2.6,'kuzma','«В тереме — не победить». Так тому и быть.'],
        [14,4,null,'<i>Кот кивает: мол, щит держать —</i><br><i>И смотреть, и выжидать.</i>',true]],
      events:[{t:0.3,fn:()=>{const f=kot.g.position.clone();kot.g.rotation.y=Math.PI;anim(2,k=>{kot.g.position.lerpVectors(f,new V3(-3.6,0,-18.6),smooth(k));});}},{t:2.6,fn:()=>{kot.g.rotation.y=Math.PI*0.6;wr=sandWriting('В ТЕРЕМЕ — НЕ ПОБЕДИТЬ',true,0.8,-19.6);wr.material.opacity=0;anim(3,k=>{wr.material.opacity=k;});}},
        {t:14,fn:()=>{kot.g.rotation.y=0;anim(2,k=>{kot.body.rotation.x=-Math.sin(k*Math.PI)*0.3;});}}],
      end:()=>{W.anims.length=0;G.flags.sand=true;F.stage='free';kot.body.rotation.x=0;kot.g.position.set(1.9,0,-4.9);kot.g.rotation.y=-0.35;snapCams();}});}
  // девять звеньев Буяна — ворота терема
  function forgeScene5(){F.forging=true;const pr=T.proshka;placeOnGround(pr,7.6,1.8,0);pr.face=Math.atan2(8.6-7.6,0.6-1.8);
    play({dur:14,fov:46,camK:2.4,shots:[shot(0,[5,2.4,4.4],[7.4,1,1.8]),shot(7,[pr.pos.x-1.4,1.3,pr.pos.z+1.6],[8.6,1,0.6])],
      says:[[0.3,2.8,'kuzma','Девять. На терем хватит.'],[3.4,1.8,'proshka','А на цепь-то как?'],[5.4,3.4,'kuzma','Цепь — потом. Сперва — выстоять, устоять.'],[9.4,3.4,null,'<i>Отворились терема ворота.</i>',true]],
      events:[{t:9.4,fn:()=>{SFX.gate();SFX.ok();G.flags.forged5=true;banner('Терема ворота отворились!','#a0ffb8',2.6,'на рушнике-карте — 5-Б1 «Кощей в тереме», гляди!');}}],
      end:()=>{W.anims.length=0;F.forging=false;kuz.arm.rotation.x=0;G.flags.forged5=true;}});}
  // «Без имён»: пустые рамки, «ПРОЩЕНИЯ» на песке, «Я расскажу ему сказку»
  function bezImen(){F.stage='bez';G.flags.nameless=true;G.flags.names=G.flags.names||{};const pe=T.pelageya,pr=T.proshka,po=T.potap,yo=T.yosha;
    placeOnGround(po,-2.6,-14.4,0);placeOnGround(yo,-1,-14.8,0);placeOnGround(pr,1.2,-14.6,0);placeOnGround(pe,2.8,-14.2,0);HEROES.forEach(h=>{h.face=Math.PI;});let wr=null;
    if(W.zven){Z.vis=true;Z.mode='script';Z.pos.set(0.4,2.4,-16);}
    play({dur:52,fov:44,camK:2.2,shots:[shot(0,[0,3,-9],[0,1,-15]),shot(5,[po.pos.x+1.6,1.4,po.pos.z+2],[po.pos.x,1,po.pos.z]),shot(9.4,[yo.pos.x+1.6,1.2,yo.pos.z+2],[po.pos.x,1,po.pos.z]),shot(13.6,[pr.pos.x+1.4,1.2,pr.pos.z+1.8],[pr.pos.x,0.6,pr.pos.z]),
        shot(17,[3,2.6,-14],[0.6,0.2,-19.4]),shot(26,[-1,2,-15],[1,1,-18]),shot(30,[pr.pos.x-1.4,1.3,pr.pos.z+1.8],[pr.pos.x,1,pr.pos.z]),shot(34,[pe.pos.x+2,1.5,pe.pos.z+2],[pe.pos.x,1,pe.pos.z]),shot(47,[pr.pos.x-1.2,1.3,pr.pos.z+1.6],[pr.pos.x,1,pr.pos.z])],
      says:[[0.3,4.4,null,'<i>Мы приходим в себя на Лукоморье, и что-то не так. Над портретами героев — пустые рамки.</i>',true],[5,4.2,null,'<i>Я зову медвежонка — и не помню, как его зовут.</i>',true],
        [9.4,3.6,'yosha','Эй… ты… ну, тот, что мост держал…'],[13.6,3.2,null,'<i>Прошка молчит, на лапы свои глядит.</i>',true],
        [17,5,null,'<i>Кот к воде подходит, слово пишет на песке.</i><br><i>Волна сотрёт — он снова пишет, в тоске.</i>',true],[22.4,3.4,'zven','Про… ще… ни… я.'],
        [26,4,null,'<i>Кот лапой на себя, потом на море кажет —</i><br><i>И голову склоняет, ничего не скажет.</i>',true],[30,3.8,'proshka','Он прощенья хочет попросить. У него — у Кощея.'],
        [34,4.6,null,'<i>Пелагея стоит без тетрадки. У неё больше ничего не написано — не подсмотреть, не спрятаться за крыло.</i>',true],
        [38.8,5.6,'pelageya','Я расскажу ему сказку — сама её сложила,<br>Помню всю — и чем кончится, не позабыла.'],[44.8,2,null,'<i>Говорит она громко, при всех, не читая —</i><br><i>Своими словами, сама, не робея.</i>',true],[47,3.6,'proshka','Расскажи. А я скую — не подведу.']],
      events:[{t:5,fn:()=>{floatText(po.pos.clone().add(new V3(0,2.4,0)),'…?','#e0b27a');}},{t:13.6,fn:()=>{anim(1,k=>{pr.body.rotation.x=0.25*k;});}},
        {t:17,fn:()=>{const f=kot.g.position.clone();kot.g.rotation.y=Math.PI;anim(2,k=>{kot.g.position.lerpVectors(f,new V3(-3.2,0,-18.4),smooth(k));});}},
        {t:19,fn:()=>{kot.g.rotation.y=Math.PI*0.6;wr=sandWriting('ПРОЩЕНИЯ',false,0.8,-19.6);wr.material.opacity=0;anim(1.2,k=>{wr.material.opacity=k;});later(1.6,()=>{anim(0.8,k=>{wr.material.opacity=1-k;});SFX.wave&&SFX.wave();});later(2.8,()=>{anim(1.2,k=>{wr.material.opacity=k;});});}},
        {t:26,fn:()=>{kot.g.rotation.y=0;anim(3,k=>{kot.head.rotation.x=k*0.5;});}},{t:30,fn:()=>{pr.body.rotation.x=0;}}],
      end:()=>{W.anims.length=0;G.flags.bezImen=true;F.stage='free';kot.head.rotation.x=0;kot.g.position.set(1.9,0,-4.9);kot.g.rotation.y=-0.35;if(W.zven)Z.mode='lead';snapCams();
        banner('Открылся финал','#ffd76a',3,'на рушнике-карте — 5-Б2 «Кощей Бессмертный и Златая цепь», гляди!');}});}
  /* ---------- после финала: Кощей там, где его оставила сказка; тетрадка у Кота в избе — Сказ можно рассказать заново ---------- */
  let koschH=null;
  if(G.flags.w5done){const E=(G.flags.ending||['slushat'])[0];
    if(E==='ushel'){addMesh(new THREE.TorusGeometry(0.12,0.035,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.9}),1.6,5.4,-6.2);const b=new THREE.Group();b.position.set(-1.4,5.2,-6.4);W.group.add(b);addMesh(new THREE.ConeGeometry(0.16,0.26,10),M(0xb89a50,{emissive:0xffc040,emissiveIntensity:0.3}),0,0,0,b);W.updates.push(()=>{b.rotation.z=Math.sin(G.time*2)*0.3;});}
    else if(E==='proshen'){const isl=addMesh(new THREE.CylinderGeometry(6,8,2,14),M(0x7a9a58),-36,-0.4,-70);isl.castShadow=false;box(-37.5,-34.5,0.6,3,-71.5,-68.5,M(0x8a5a36),{solid:false});const rg=new THREE.ConeGeometry(2.6,1.6,4);rg.rotateY(Math.PI/4);addMesh(rg,M(0x6b3f22),-36,3.8,-70);
      koschH=makeKoschei();koschH.g.position.set(-33.4,0.6,-67.6);koschH.g.scale.setScalar(0.9);addMesh(new THREE.TorusGeometry(0.06,0.02,6,10),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.9}),0.18,0.42,0.35,kot.body);koschH=null;}
    else{koschH=makeKoschei();koschH.g.position.set(3.6,0,-5.6);koschH.g.rotation.y=-0.9;koschH.body.position.y=-0.9;W.cyls.push({x:3.6,z:-5.6,r:0.7,miny:-1,maxy:3,on:true});const ham=new THREE.Group();koschH.hand.add(ham);addMesh(new THREE.CylinderGeometry(0.02,0.02,0.3,5),M(0xc89a5a),0,-0.1,0.05,ham);addMesh(new THREE.BoxGeometry(0.08,0.08,0.12),M(0x6a4a2a),0,-0.24,0.05,ham);}
    const tish=makeTishka();tish.g.position.set(-2.4,0,-4.2);tish.g.rotation.y=0.6;W.cyls.push({x:-2.4,z:-4.2,r:0.4,miny:-1,maxy:1,on:true});
    const nb=makeNotebook();nb.g.scale.setScalar(0.8);nb.g.position.set(-12,1.0,-1.6);addMesh(new THREE.BoxGeometry(0.9,0.9,0.6),M(0x6b4424),-12,0.45,-1.6);W.cyls.push({x:-12,z:-1.6,r:0.6,miny:-1,maxy:1,on:true});
    for(const pi of[0,1]){prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,{x:-12,z:-1.6})<2.2,'пересказать Сказ');
      if(koschH)prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,koschH.g.position)<2.4,'поговорить');}}
  function retellSkaz5(pi){const B=['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным'],HK=helpers5().map(k=>(HELPER5[k]||HELPER5.leshy)[0]),EN=['И ушёл он — и был таков','И простили его — и прощенья он просил','И позвали его слушать — сел он в круг'];
    skazClouds({who:1,title:'Тетрадка Пелагеи · пятый Сказ',sub:'тот, что Кощей услыхал · сказывайте заново · начало — Игрок второй',opts:B},a=>{skazClouds({who:0,title:'Пятый Сказ · помощник',sub:'выбирает Игрок 1',opts:HK},b=>{
      skazClouds({who:2,title:'Пятый Сказ · конец',sub:'вместе · у сказки правда не одна бывает',opts:EN},c=>{G.flags.skaz5=[B[a],HK[b],c.map(i=>EN[i]).join(' — а иные сказывают: ')];G.flags.ending=c.map(i=>['ushel','proshen','slushat'][i]);
        bark(kot,'kot',B[a]+'… '+EN[c[0]]+'.',3.4);banner('Сказ пересказан','#ffd76a',2.6,'Где сказка Кощея оставит — там он и встанет, как на Лукоморье вернётесь');});});});}
  /* ---------- Застава трёх богатырей: испытания на время; успели в богатырское время — доспех богатыря в примерочную ---------- */
  const ZAST=[{id:'z-i',b:'Илья Муромец',t:'крен Калинова моста',hero:'Потапу',arm:'armI'},{id:'z-d',b:'Добрыня Никитич',t:'семерых одним махом',hero:'Прошке',arm:'armD'},{id:'z-a',b:'Алёша Попович',t:'колокольная перекличка',hero:'Пелагее',arm:'armA'}];
  const zfmt=t=>{const m=Math.floor(t/60),s=Math.floor(t%60);return (m?m+':':'')+(s<10&&m?'0':'')+s+' с';};
