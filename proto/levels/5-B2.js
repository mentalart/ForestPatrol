/* ============================== МИР 5 · 5-Б2 «КОЩЕЙ БЕССМЕРТНЫЙ И ЗЛАТАЯ ЦЕПЬ» — финал без ударов ============================== */
// X не бьёт — над ней облачко воспоминания · волны: Потап держит, Йоша и выбор воды, Прошка куёт · Богатырский щит · Сказ по памяти: начало, помощник, конец
// имена возвращаются по одному: Потап, Йоша, Прошка, Пелагея · три концовки настоящие · ролик «Цепь»
function build5B2(){
  W.zvenAway=false;W.world=5;setTheme('dawn');sky('dawn');W.name='5-Б2 · Кощей Бессмертный и Златая цепь';W.sub='Остров Буян · финал · без ударов';W.camX=18;const F=W.flags;F.stage='intro';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.noLose=true;W.noPetals=true;W.fallY=-12;const T=HERO;const C=new V3(0,0,-13),R=11;
  if(!G.flags.names)G.flags.names={};
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(700,700),M(0x6a8ab8,{emissive:0x302030,emissiveIntensity:0.2}));sea.rotation.x=-Math.PI/2;sea.position.set(0,-0.7,0);W.group.add(sea);
  ground(-22,22,-42,16,0,M(0x6a8a58));wall(-22.2,-22,-42,16);wall(22,22.2,-42,16);wall(-22,22,-42.2,-42);wall(-22,22,16,16.2);
  for(let i=0;i<30;i++){const a=i/30*Math.PI*2;addMesh(new THREE.DodecahedronGeometry(rand(0.8,1.5)),M(0x8a8478),Math.cos(a)*24,0.2,-13+Math.sin(a)*28).rotation.set(rand(0,3),rand(0,3),0);}
  // засохший дуб: витки цепи растут на стволе по мере звеньев
  const OAK=new V3(0,0,-28);const trunk=addMesh(new THREE.CylinderGeometry(2.2,3.2,18,14),M(0x6a5a4a),OAK.x,9,OAK.z);W.cyls.push({x:OAK.x,z:OAK.z,r:3,miny:-1,maxy:18,on:true});
  const branches=[];for(let i=0;i<9;i++){const b=addMesh(new THREE.CylinderGeometry(0.25,0.55,rand(6,9),6),M(0x6a5a4a),OAK.x+Math.cos(i)*2,14+rand(0,4),OAK.z+Math.sin(i)*1.5);b.rotation.z=Math.cos(i*1.7)*1.1;b.rotation.x=Math.sin(i*1.3)*0.6;branches.push(b);}
  const leaves=[];for(let i=0;i<16;i++){const l=addMesh(new THREE.SphereGeometry(rand(1.6,2.6),10,8),M(0x4f8a3a),OAK.x+rand(-6,6),rand(15,21),OAK.z+rand(-4,4));l.visible=false;l.scale.setScalar(0.01);leaves.push(l);}
  const coil=new THREE.Group();coil.position.copy(OAK);W.group.add(coil);const coilLinks=[];
  function addCoilLink(){const i=coilLinks.length;const a=i*0.42,r=3.1-i*0.012;const m=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.05,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6}));m.position.set(Math.cos(a)*r,0.8+i*0.16,Math.sin(a)*r);m.rotation.set(Math.PI/2,a,i%2?Math.PI/2:0);coil.add(m);coilLinks.push(m);return m;}
  // наковальня Кузьмы, камень для тетрадки, родник у корней
  const anvil=makeAnvil(6,-19,0,1.2);const anvilCyl=W.cyls[W.cyls.length-1];const stoneB=addMesh(new THREE.DodecahedronGeometry(0.9),M(0x9a948a),-3.5,0.5,-19);stoneB.scale.set(1.3,0.6,1);W.cyls.push({x:-3.5,z:-19,r:1,miny:-1,maxy:0.9,on:true});
  const spring=new V3(-6.5,0,-18.5);{const sp=addMesh(new THREE.CylinderGeometry(1,1.1,0.2,16),M(0x7ad8ff,{emissive:0x2a8aa0,emissiveIntensity:0.5,transparent:true,opacity:0.8}),spring.x,0.1,spring.z);for(let i=0;i<8;i++){const a=i/8*6.28;addMesh(new THREE.DodecahedronGeometry(0.3),M(0x9a948a),spring.x+Math.cos(a)*1.2,0.15,spring.z+Math.sin(a)*1.2);}}
  // Горыныч — как большая тёплая скала; должники по краю; помощники из Сказов у дуба
  const gor=makeGorynych5(0.75);gor.g.position.set(-13,-0.6,-25);gor.g.rotation.y=0.8;W.cyls.push({x:-13,z:-25,r:3.4,miny:-1,maxy:4,on:true});
  const HK=helpers5();const debt=[['yaga',()=>makeYaga(),[-17,-4]],['leshy',()=>makeLeshy(1),[17,-6]],['kiki',()=>makeKikimora(),[16,0.5]]].filter(([k])=>!HK.some(h=>h===k||(k==='leshy'&&h==='leshy4')||(k==='kiki'&&h==='kiki4')||(k==='yaga'&&h==='yaga3')));
  const DB={};debt.forEach(([k,f,[x,z]])=>{const m=f();m.g.position.set(x,0,z);m.g.rotation.y=Math.atan2(C.x-x,C.z-z);DB[k]=m;W.cyls.push({x,z,r:0.8,miny:-1,maxy:2.5,on:true});});
  const HPOS=[[-5.5,-25.5],[-2.6,-31],[2.6,-31],[5.5,-25.5]];const HM=HK.map((k,i)=>{const d=HELPER5[k]||HELPER5.leshy;const m=d[1]();if(k==='kit'){m.g.position.set(-26,-1.2,-30);m.g.rotation.y=0.4;}else{m.g.position.set(HPOS[i][0],k==='zhar'||k==='sirin'?2.2:0,HPOS[i][1]);m.g.rotation.y=Math.atan2(C.x-HPOS[i][0],C.z-HPOS[i][1]);}return {k,m,name:d[0]};});
  const yagaM=DB.yaga||(HM.find(h=>h.k==='yaga'||h.k==='yaga3')||{}).m;
  const kot=makeKot();kot.g.position.set(-2,0,-22.4);kot.g.rotation.y=0.3;W.cyls.push({x:-2,z:-22.4,r:0.7,miny:-1,maxy:2,on:true});
  const KS=makeKoschei();KS.g.scale.setScalar(1.15);KS.g.position.set(20,0,-12);const KP=new V3(-1.6,0,-23.2);
  const book=makeNotebook();book.g.scale.setScalar(0.9);book.g.visible=false;const ndl=makeNeedle(1.3);KS.hand.add(ndl.g);ndl.g.position.set(0,-0.1,0.1);ndl.g.scale.setScalar(0.45);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,6);
  const bb=$('bossbar');W.onLeave=()=>{bb.style.display='none';};
  F.links=0;F.skaz=0;
  function setBar(){bb.style.display='block';bb.style.borderColor='#ffd76a';bb.innerHTML='<b style="color:#ffd76a">Златая цепь</b> · звенья '+F.links+' · Сказы '+F.skaz+' / 3 <small style="opacity:.75">· X не бьёт — ☁ вспоминаем</small>';}
  /* ---------- цепи из земли: отбив выбивает звено — оно летит к дубу ---------- */
  const chains=[];let dryFlip=false;
  function spawnChain(pi){const h=active(pi);let x=0,z=0;for(let t=0;t<8;t++){const a=rand(0,6.28),r=rand(3.2,4.4);x=h.pos.x+Math.cos(a)*r;z=h.pos.z+Math.sin(a)*r;if(Math.hypot(x-C.x,z-C.z)<R-1)break;}
    const e=makeFoe('cep',x,z,{pi,leash:1});e.noMove=true;e.noKill=true;e.life=0;e.strikes=0;burst(new V3(x,0.4,z),0x6a5a4a,12,3);SFX.crash();chains.push(e);return e;}
  function retract(e){e.alive=false;burst(e.pos.clone().add(new V3(0,0.6,0)),0x6a5a4a,10,3);W.group.remove(e.g);const i=chains.indexOf(e);if(i>=0)chains.splice(i,1);}
  function clearChains(){chains.slice().forEach(retract);}
  let st0=0;const statN=()=>G.stats.parries+G.stats.mahs;
  function linkToOak(from,mult){const n=mult||1;for(let j=0;j<n;j++){const m=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.05,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.8}));W.group.add(m);const f=from.clone().add(new V3(rand(-0.3,0.3),1.2,0)),to=OAK.clone().add(new V3(0,1+coilLinks.length*0.16,3));
    anim(0.9+j*0.1,k=>{m.position.lerpVectors(f,to,k);m.position.y+=Math.sin(k*Math.PI)*3;m.rotation.x+=0.3;if(k>=1){W.group.remove(m);addCoilLink();F.links++;setBar();SFX.link();}});}}
  function fallLink(from){const m=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.05,6,12),M(COL.gold));W.group.add(m);const f=from.clone().add(new V3(0,1.2,0)),to=OAK.clone().add(new V3(rand(-2,2),9,2.5));
    anim(0.9,k=>{m.position.lerpVectors(f,to,k);m.position.y+=Math.sin(k*Math.PI)*3;});later(0.9,()=>{const p=m.position.clone();anim(0.8,k=>{m.position.set(p.x,lerp(p.y,0.1,k*k),p.z+k);});floatText(p,'сухая ветка не держит — хрусть','#d8c8a0');later(1.6,()=>W.group.remove(m));});}
  /* ---------- Богатырский щит: общий кружок над обоими, защита в одну долю ---------- */
  const ringM=[0,1].map(pi=>{const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,32),MB(COL.gold,{transparent:true,opacity:0.95}));m.rotation.x=Math.PI/2;m.visible=false;W.group.add(m);return m;});
  const RG={on:false,t:0,press:[null,null],after:null,tries:0};
  function startRing(after){F.stage='ring';RG.on=true;RG.t=0;RG.press=[null,null];RG.after=after;clearChains();SFX.yellow();banner('Кощей цепи в кольцо сводит!','#ffe08a',1.8,'над обоими один кружок — закройтесь щитом '+K(0,'guard')+' + '+K(1,'guard')+' вместе, в лад');
    anim(0.8,k=>{KS.armR.rotation.x=-k*2.4;});}
  W.onGuardTap=(pi)=>{if(RG.on&&RG.press[pi]===null)RG.press[pi]=RG.t;};
  function ringTick(dt){if(!RG.on)return;RG.t+=dt;const u=clamp(1-RG.t/1.4,0,1);for(const pi of[0,1]){const h=active(pi),m=ringM[pi];m.visible=true;m.position.set(h.pos.x,h.pos.y+h.d.height+0.8,h.pos.z);m.scale.setScalar(0.4+u*1.6);m.material.color.setHex(u<0.12?0xffffff:COL.gold);}
    if(RG.t>=1.4+0.35){RG.on=false;ringM.forEach(m=>{m.visible=false;});KS.armR.rotation.x=0;const win=TIMING[genPath()].parry+0.12;const hit=[0,1].map(pi=>RG.press[pi]!==null&&Math.abs(RG.press[pi]-1.4)<=win);
      if(hit[0]&&hit[1]){SFX.horn();G.stats.shields++;banner('Богатырский щит!','#ffd76a',2,'волна назад отлетает — из цепи горсть звеньев высыпается');bark(T.yosha,'yosha','Вместе, разом!',1.4);for(const pi of[0,1]){const h=active(pi);burst(h.pos.clone().add(new V3(0,1,0)),0xffffff,14,4);}linkToOak(KP.clone(),4);RG.tries=0;const a=RG.after;RG.after=null;later(1.6,a);}
      else{RG.tries++;for(const pi of[0,1]){const h=active(pi);if(!hit[pi]){h.vel.set(-(h.pos.x-KP.x)*0.5,4,-(h.pos.z-KP.z)*0.3);h.grounded=false;h.knockT=0.3;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'не в долю, не в лад','#dddddd');}}
        banner('Не вместе — волна опять','#ffd0d0',1.8,'оба щитом закройтесь в тот миг, как кружок сожмётся');const a=RG.after;later(2.2,()=>startRing(a));}}}
  /* ---------- ход финала ---------- */
  function intro(){F.stage='introCine';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,4,0);h.face=Math.PI;});
    play({dur:35,fov:46,camK:2,shots:[shot(0,[14,9,14],[0,4,-24]),shot(6.4,[-10,3,-14],[-13,1.2,-25]),shot(11.4,[0,4,-4],[0,2.2,-28]),shot(16.6,[10,3,-8],[KP.x+4,2.4,KP.z]),shot(23,[-1,2.2,-15.4],[-3.5,0.8,-19]),shot(27.4,[0,6,2],[0,1.6,-18])],
      says:[[0.3,4.6,null,'<i>Буян, засохший дуб, рассвет. Горыныч к корням Кузьмину наковальню несёт —</i><br><i>И ложится рядом, как скала тёплая, ждёт.</i>',true],
        [6.4,4.6,null,'<i>По краю поляны стоят должники, а ближе всех к дубу — четверо, кого мы выбирали помощниками в Сказах. Они ничего не делают. Они слушают.</i>',true],
        [11.6,4.4,null,'<i>Кощей приходит сам, с тетрадкой под мышкой. Кладёт её на камень — как чужую вещь, которую вернуть стыдно, а не вернуть нельзя.</i>',true],
        [16.8,2.8,'koschei','Дочитал. Там конца нет.'],[19.8,3.2,null,'<i>Пелагея на последнюю страницу глядит: «Жил-был мальчишка…» —</i><br><i>И больше ни строчки, ни слова, ни книжки.</i>',true],
        [23.4,3.8,'koschei','Всё равно сказок не будет.<br>В них я всегда один — никто не полюбит.'],[27.6,3,null,'<i>Кощей руку подымает — и по всей поляне из земли цепи лезут.</i>',true],[31,3.2,'zven','Сегодня только защищаемся и вспоминаем.']],
      events:[{t:11.6,fn:()=>{const f=KS.g.position.clone();KS.g.rotation.y=-Math.PI/2;anim(4.4,k=>{KS.g.position.lerpVectors(f,new V3(-2.4,0,-18),k);});book.g.visible=true;}},
        {t:15.2,fn:()=>{book.g.position.set(-3.5,1.0,-19);KS.g.rotation.y=Math.PI*0.2;}},{t:19.8,fn:()=>{const pe=T.pelageya;placeOnGround(pe,-2.6,-17.4,0);faceTo(pe,-3.5,-19);}},
        {t:23.2,fn:()=>{const f=KS.g.position.clone();anim(1.4,k=>{KS.g.position.lerpVectors(f,KP,k);});KS.g.rotation.y=0;}},{t:27.6,fn:()=>{anim(1,k=>{KS.armR.rotation.x=-k*2.2;});for(let i=0;i<10;i++)later(i*0.15,()=>{burst(new V3(rand(-9,9),0.3,rand(-18,0)),0x6a5a4a,8,3);SFX.crash();});}}],
      tick:(t)=>{if(t<6)gor.g.position.y=-0.6;},
      end:()=>{W.anims.length=0;KS.g.position.copy(KP);KS.g.rotation.y=0;KS.armR.rotation.x=0;book.g.visible=true;book.g.position.set(-3.5,1.0,-19);
        HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-2,0);h.face=Math.PI;});W.clampR={x:C.x,z:C.z,r:R};snapCams();setBar();Z.mode='lead';wave1();}});}
  function force(pi,kind){const p=players[pi];const i=p.heroes.findIndex(h=>h.kind===kind);if(i<0||p.act===i)return;p.act=i;p.heroes.forEach((h,k)=>{h.active=k===i;h.following=false;});}
  function wave1(){F.stage='w1';F.need=F.links+6;force(0,'potap');force(1,'pelageya');placeOnGround(T.pelageya,T.potap.pos.x,T.potap.pos.z+2.2,0);st0=statN();banner('Волна 1 · Потап держит','#ffd76a',3,'жёлтый и синий — щит '+K(0,'guard')+', красный — кувырок '+K(0,'roll')+' · отбей удар — и звено выбьешь');
    later(0.5,()=>say('zven','Держать надо не мост — весь мир за спиной!',2.8,true));F.spawnT=0.2;F.maxCh=[2,1];}
  function skaz1(){F.stage='skaz1';clearChains();skazClouds({who:1,title:'Сказ по памяти · начало',sub:'Пелагея шагает вперёд и сказывать начинает. Время останавливается. Начало — Игрок второй выбирает.',
      opts:['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным']},i=>{const t=['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным'][i];F.sk1=t;F.skaz=1;setBar();
      const pe=T.pelageya,po=T.potap;play({dur:14,fov:44,camK:2.4,shots:[shot(0,[pe.pos.x+2,1.8,pe.pos.z+2.6],[pe.pos.x,1,pe.pos.z]),shot(4.4,[3,3,-12],[KP.x,2.4,KP.z]),shot(7.4,[po.pos.x-2,1.8,po.pos.z+2.6],[po.pos.x,1.2,po.pos.z])],
        says:[[0.3,3.8,'pelageya',t+'…'],[4.4,2.4,null,'<i>Кощей руку опускает.</i>',true],[6.8,1.8,'proshka','Продолжай.'],[8.8,4,'pelageya','…и рядом с ним стоял Потап. Он держал — не отпускал.']],
        events:[{t:4.4,fn:()=>{anim(1,k=>{KS.armR.rotation.x=-2.2*(1-k);});}},{t:8.8,fn:()=>{G.flags.names.potap=true;SFX.ok();floatText(po.pos.clone().add(new V3(0,2.6,0)),'Потап','#e0b27a');banner('Имя вернулось: Потап','#e0b27a',2.4);}}],
        end:()=>{W.anims.length=0;wave2();}});});}
  function wave2(){F.stage='w2';F.need=F.links+6;F.full=true;F.oakW=0;force(0,'potap');force(1,'yosha');st0=statN();F.maxCh=[3,0];F.spawnT=1;
    banner('Волна 2 · Йоша и выбор воды','#9fe6ff',3,'ковшик один: польёшь дуб — ветки звенья удержат; польёшь щит Потапа — он снова силён');later(1.2,()=>say('zven','Тебе или дубу? Каждый ковшик — выбор!',2.6,true));}
  const oakWT={pos:OAK.clone().add(new V3(0,0,4.6)),pri:0.8,active:()=>F.stage==='w2'&&F.full,onWater:()=>{F.full=false;F.oakW++;SFX.grow();const n=Math.min(leaves.length,F.oakW*3);for(let i=0;i<n;i++){const l=leaves[i];if(!l.visible){l.visible=true;anim(0.8,k=>l.scale.setScalar(Math.max(0.01,k*0.7)));}}
      floatText(OAK.clone().add(new V3(0,5,3)),'Ветка зазеленела — звенья держит!','#b8f090');if(F.oakW===1){later(0.3,()=>bark(T.potap,'potap','Дубу! Я держу — не бойся!',1.8));nameYosha();}}};
  const potWT={pos:T.potap.pos,pri:0.5,active:()=>F.stage==='w2'&&F.full,onWater:()=>{F.full=false;players[0].spirit=1;F.potShield=8;floatText(T.potap.pos.clone().add(new V3(0,2.6,0)),'Дух вернулся — щит выстоит!','#9fe6ff');nameYosha();}};
  W.waterTargets.push(oakWT,potWT);
  function nameYosha(){if(G.flags.names.yosha)return;later(0.8,()=>{bark(T.yosha,'yosha','Я смогу! Держите, держите!',2.2);G.flags.names.yosha=true;SFX.ok();banner('Имя вернулось: Йоша','#8fe0d4',2.4);});}
  function skaz2(){F.stage='skaz2';clearChains();const names=HM.map(h=>h.name);skazClouds({who:0,title:'Сказ по памяти · помощник',sub:'Кто мальчишке помогал? Помощник у дуба стоит. Выбирает Игрок первый.',opts:names},i=>{const h=HM[i];F.sk2=h.name;F.sk2k=h.k;F.skaz=2;setBar();
      const f=h.m.g.position.clone();play({dur:15,fov:44,camK:2.2,shots:[shot(0,[f.x+3,2.4,f.z+5],[f.x,1.2,f.z]),shot(5,[-1,1.8,-14],[-3.5,0.9,-19]),shot(10,[-12,2.2,-1],[yagaM?yagaM.g.position.x:-17,1.2,yagaM?yagaM.g.position.z:-4])],
        says:[[0.3,4,'pelageya','И помогал ему в том '+h.name.replace(/^./,c=>c.toLowerCase())+'.'],[4.6,4.6,null,'<i>Выбранный шаг вперёд делает. Кощей на камень садится —</i><br><i>Руки на колени кладёт и слушает, не шевелится.</i>',true],
          [9.8,4.4,null,'<i>Яга на краю поляны глаз метлой утирает —</i><br><i>Мол, от пыли это, никто не узнает.</i>',true]],
        events:[{t:0.3,fn:()=>{if(h.k!=='kit'){const to=f.clone().add(new V3(-f.x*0.2,0,2));anim(1.4,k=>{h.m.g.position.lerpVectors(f,to,smooth(k));});}else{anim(1.6,k=>{h.m.g.position.y=-1.2+Math.sin(k*Math.PI)*1.5;});}}},
          {t:4.8,fn:()=>{KS.g.position.set(-3.5,-0.4,-20.2);KS.g.rotation.y=0.4;}},{t:10,fn:()=>{if(yagaM)anim(2,k=>{yagaM.g.rotation.z=Math.sin(k*Math.PI*3)*0.12;});}}],
        end:()=>{W.anims.length=0;KS.g.position.copy(KP);KS.g.rotation.y=0;wave3();}});});}
  function wave3(){F.stage='w3';banner('Волна 3 · Прошка куёт','#ffb070',3,'Кощей в последний раз встаёт — и все цепи из земли разом тянет');later(1.2,()=>startRing(liftScene));}
  function liftScene(){F.stage='lift';const pr=T.proshka;force(0,'proshka');placeOnGround(pr,5,-16.6,0);
    play({dur:9,fov:44,camK:2.4,shots:[shot(0,[9,3,-13],[5,1,-20]),shot(4.6,[2,2,-15],[3.4,2,-23])],
      says:[[0.3,4,null,'<i>Прошка к наковальне бежит — и изобретение его впервые не подвело:</i><br><i>Подъёмник из клещей да цепи наковальню к самым корням подняло.</i>',true],[4.8,3.2,'proshka','Я же говорил, что конструкция рабочая.']],
      events:[{t:1,fn:()=>{const f=anvil.position.clone(),to=new V3(3.6,0.9,-22.2);anim(3,k=>{anvil.position.lerpVectors(f,to,smooth(k));anvil.position.y+=Math.sin(k*Math.PI)*1.2;});SFX.latch();}}],
      end:()=>{W.anims.length=0;anvil.position.set(3.6,0.9,-22.2);anvilCyl.x=3.6;anvilCyl.z=-22.2;anvilCyl.maxy=2;placeOnGround(pr,3.6,-20.4,0);pr.face=Math.PI;forgeStart();}});}
  const FG={on:false,t:0,k:-3,pressed:{},res:[],cyc:0};const fring=new THREE.Mesh(new THREE.TorusGeometry(1,0.06,6,28),MB(COL.gold,{transparent:true,opacity:0.9}));fring.rotation.x=Math.PI/2;fring.visible=false;W.group.add(fring);
  function forgeStart(){F.stage='forge';FG.on=true;FG.t=-1.5;FG.k=-3;FG.pressed={};FG.res=[];FG.cyc=0;force(1,'pelageya');st0=statN();F.maxCh=[0,2];F.spawnT=1.5;placeOnGround(T.potap,5.6,-20.6,0);T.potap.guard=true;
    banner('Прошка застёжку куёт','#ffb070',3,'бей '+K(0,'attack')+' в такт — дзинь, дзинь, дзинь · Варя и Потап держат щиты у наковальни');}
  const FB=0.7;W.RG=RG;W.FG=FG;
  function forgeTick(dt){FG.t+=dt;const cyc=Math.floor(FG.t/(6*FB)),u=FG.t-cyc*6*FB;if(FG.t<0){if(Math.floor(FG.t/FB)!==FG.k){FG.k=Math.floor(FG.t/FB);tone(1760,0.05,'square',0.05);}return;}
    if(cyc!==FG.cyc){FG.cyc=cyc;FG.pressed={};if(cyc>=4){forgeEnd();return;}}
    const beats=[1,2,3].map(b=>b*FB);const next=beats.find((b,i)=>!FG.pressed[i]&&u<b+0.3);const pr=T.proshka;
    if(next!==undefined){const k=clamp((next-u)/FB,0,1);fring.visible=true;fring.position.set(anvil.position.x,anvil.position.y+0.9,anvil.position.z);fring.scale.setScalar(lerp(0.3,1.6,k));fring.material.color.setHex(k<0.15?0xffffff:COL.gold);}else fring.visible=false;
    if(tap(0,'attack')){const i=beats.findIndex((b,j)=>!FG.pressed[j]&&Math.abs(u-b)<0.4);if(i>=0){FG.pressed[i]=true;const ok=Math.abs(u-beats[i])<=0.18+(W.ladBonus||0);FG.res.push(ok);pr.atkT=0.3;SFX.hammer?SFX.hammer():SFX.clink();burst(anvil.position.clone().add(new V3(0,1,0)),ok?0xffe080:0xff8040,ok?12:6,3);floatText(anvil.position.clone().add(new V3(0,1.8,0)),ok?'Дзинь!':'тук','#ffe08a');if(ok)tone(1980,0.12,'triangle',0.08);}}
    beats.forEach((b,i)=>{if(!FG.pressed[i]&&u>b+0.4){FG.pressed[i]=true;FG.res.push(false);}});}
  function forgeEnd(){FG.on=false;fring.visible=false;clearChains();const good=FG.res.filter(x=>x).length;G.flags.claspQ=good/12;F.stage='needle';const pr=T.proshka;
    play({dur:13,fov:42,camK:2.4,shots:[shot(0,[pr.pos.x+2.6,1.8,pr.pos.z+2],[pr.pos.x,1,pr.pos.z-0.6]),shot(5,[1,2.4,-18],[KS.g.position.x,2.8,KS.g.position.z])],
      says:[[0.3,4.4,null,'<i>Кощей на молот в лапах Прошки долго глядит —</i><br><i>Потом сам иглу протягивает, молчит.</i>',true],[5,4,'koschei','Держи. Ровней держи. Вот так, вот так.'],[9.4,3.2,null,good>=10?'<i>Узор на застёжке тонок, как у Кузьмы.</i>':'<i>Застёжка скована — Прошкиными руками.</i>',true]],
      events:[{t:0.3,fn:()=>{const f=KS.g.position.clone();anim(3,k=>{KS.g.position.lerpVectors(f,new V3(pr.pos.x-1.2,0,pr.pos.z-1.4),k);});KS.g.rotation.y=Math.PI*0.3;}},{t:5,fn:()=>{anim(1,k=>{KS.armR.rotation.x=-k*1.2;});}},
        {t:7.4,fn:()=>{G.flags.names.proshka=true;SFX.ok();banner('Имя вернулось: Прошка','#ff9a66',2.4);const w=ndl.g.getWorldPosition(new V3());W.group.add(ndl.g);ndl.g.position.copy(w);ndl.g.scale.setScalar(1);anim(1,k=>{ndl.g.position.lerpVectors(w,pr.pos.clone().add(new V3(0.3,1,0.4)),k);});}}],
      end:()=>{W.anims.length=0;KS.armR.rotation.x=0;KS.g.position.copy(KP);KS.g.rotation.y=0;skaz3();}});}
  const ENDS=['И ушёл он — и был таков','И простили его — и прощенья он просил','И позвали его слушать — сел он в круг'],ENDK=['ushel','proshen','slushat'];
  function skaz3(){F.stage='skaz3';skazClouds({who:2,title:'Сказ по памяти · конец',sub:'Последняя рамка осталась — чем сказка про мальчишку кончится.<br>Все три — настоящие. Наводите вместе, как хочется.',opts:ENDS},arr=>{F.skaz=3;setBar();F.ends=arr;
      G.flags.ending=arr.map(i=>ENDK[i]);G.flags.skaz5=[F.sk1,F.sk2,arr.map(i=>ENDS[i]).join(' — а иные сказывают: ')];
      if(arr.length>1){say('kot','<i>(разводит лапами)</i> А иные сказывают, что было иначе, — вот как…',3.4,true);later(3.6,chainScene);}else chainScene();});}
  /* ---------- ролик «Цепь» ---------- */
  function chainScene(){F.stage='chain';const pe=T.pelageya,yo=T.yosha,pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*1.8,-15.5,0);faceTo(h,KP.x,KP.z);});KS.g.position.set(-0.6,0,-19.4);KS.g.rotation.y=Math.PI*0.9;
    const keys=new THREE.Group();keys.position.set(-0.3,1.9,-19);W.group.add(keys);for(let i=0;i<5;i++){const k=blackKey(1.4);k.position.x=(i-2)*0.08;keys.add(k);}KS.body.children.forEach(()=>{});
    const thread=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,4),MB(COL.gold));thread.visible=false;W.group.add(thread);const ya=yagaM?yagaM.g.position:new V3(-10,0,-14);const E=F.ends[0];
    const tail=E===0?[[43,4.6,null,'<i>И ушёл он — и был таков: Кощей по воде уходит, не оглянувшись,</i><br><i>А на ветке дуба перстень его остался, блеснувши.</i>',true]]
      :E===1?[[43,4.6,null,'<i>И простили его — и прощенья он просил: пред Котом на колено встал, перстень отдал</i><br><i>И на дальний берег жить ушёл — там свой дом и сыскал.</i>',true]]
      :[[43,4.6,null,'<i>И позвали его слушать: Кощей у дуба остался, с перстнем на руке,</i><br><i>Рядом с Котом сидит — у корней, в тишине.</i>',true]];
    play({dur:49,fov:44,camK:2,shots:[shot(0,[4,3,-12],[-0.6,2,-19.4]),shot(4.6,[ya.x+4,2.4,ya.z+3],[ya.x,1.2,ya.z]),shot(8.4,[1,2,-17],[-2,1,-22.4]),shot(12.4,[-4,1.6,-18],[-2,1.2,-22.4]),shot(19,[4.2,2.6,-11.6],[-0.6,2.8,-19.4]),
        shot(23.4,[pe.pos.x+2,1.8,pe.pos.z+2.4],[pe.pos.x,1.1,pe.pos.z]),shot(28,[yo.pos.x+2,1.4,yo.pos.z+2.2],[yo.pos.x,0.7,yo.pos.z]),shot(31.6,[0,4,-12],[0,4,-28]),shot(37,[8,8,-14],[0,6,-28]),shot(42.4,[6,4,-10],[E===0?-8:E===1?-2:-1,2,E===0?-34:-22])],
      says:[[0.3,4,null,'<i>Что бы мы ни выбрали, сначала происходит одно и то же.</i>',true],[4.6,2.2,null,'<i>Кощей Яге связку чёрных ключей отдаёт.</i>',true],[6.6,1.8,'koschei','Больше не приманю — ни гуся, ни ворона.'],
        [8.4,3.8,null,'<i>Из кармана золотую ниточку достаёт — Коту возвращает.</i><br><i>Кот первый вдох делает — и говорит: хрипло, а словами отвечает.</i>',true],
        [12.4,5,'kot','Прости меня. Я записал тебя проигравшим, потому что так было проще рассказывать.'],[17.6,1.6,'koschei','Перепиши.'],[19.4,3.4,'kot','<i>(качает головой, показывает лапой на Пелагею)</i> Не я. Она уж сказала.'],
        [23.4,2.6,'koschei','Пелагея. Пелагея…'],[26.2,1.6,null,'<i>Над её портретом загорается последнее имя.</i>',true],[28,2.6,'yosha','Я — Йоша! Мы все вспомнили, все!'],[30.4,1.8,'koschei','<i>(тише)</i> Пелагея… Расскажи ещё, прошу.'],
        [32.4,4.2,null,'<i>Прошка иглу в цепь застёжкой вставляет — цепь смыкается.</i>',true],[37,5.4,null,'<i>Кот Учёный по ней кругом идёт — направо песнь заводит,</i><br><i>Налево сказку говорит. И первая сказка у него — наша, выходит.</i>',true]].concat(tail),
      events:[{t:4.6,fn:()=>{const f=keys.position.clone();anim(1.6,k=>{keys.position.lerpVectors(f,ya.clone().add(new V3(0.4,1.2,0.4)),smooth(k));keys.position.y+=Math.sin(k*Math.PI)*1.5;});SFX.keys();}},
        {t:8.6,fn:()=>{thread.visible=true;const f=new V3(-0.4,1.6,-19.2),to=kot.g.position.clone().add(new V3(0,1.3,0.3));anim(1.8,k=>{thread.position.lerpVectors(f,to,k);thread.rotation.z+=0.1;});later(1.9,()=>{thread.visible=false;burst(to,COL.gold,16,2);SFX.dzin();kot.lids.forEach(l=>{l.rotation.x=-0.5;});G.flags.kotVoice=true;});}},
        {t:12.4,fn:()=>{kot.head.rotation.x=0.2;}},{t:19.4,fn:()=>{kot.g.rotation.y=Math.atan2(pe.pos.x-kot.g.position.x,pe.pos.z-kot.g.position.z);}},
        {t:23.4,fn:()=>{KS.g.rotation.y=Math.atan2(pe.pos.x-KS.g.position.x,pe.pos.z-KS.g.position.z);}},{t:26,fn:()=>{G.flags.names.pelageya=true;SFX.ok();banner('Имя вернулось: Пелагея','#d7a6ec',2.6);}},
        {t:28,fn:()=>{anim(0.6,k=>{yo.pos.y=Math.sin(k*Math.PI)*1.2;});G.flags.nameless=false;}},
        {t:32.6,fn:()=>{const f=ndl.g.position.clone(),to=OAK.clone().add(new V3(0,1+coilLinks.length*0.16,3.2));anim(1.4,k=>{ndl.g.position.lerpVectors(f,to,k);});later(1.5,()=>{SFX.link();SFX.horn();for(let i=0;i<8;i++)addCoilLink();burst(to,COL.gold,30,5);ringFx(OAK.clone().add(new V3(0,2,0)),COL.gold,5);
          leaves.forEach((l,i)=>later(i*0.08,()=>{l.visible=true;anim(0.8,k=>l.scale.setScalar(Math.max(0.01,k)));}));trunk.material.color.setHex(0x7a5a3e);});}},
        {t:37.2,fn:()=>{const f=kot.g.position.clone();anim(5,k=>{const a=k*Math.PI*2;kot.g.position.set(OAK.x+Math.sin(a)*3.4,1.2+k*3,OAK.z+Math.cos(a)*3.4);kot.g.rotation.y=a+Math.PI/2;});lullaby([67,71,74,72,71,69,67],0.42,0,0.12);}},
        {t:43,fn:()=>{if(E===0){const f=KS.g.position.clone();KS.g.rotation.y=Math.PI;anim(5,k=>{KS.g.position.lerpVectors(f,new V3(-10,-0.3,-40),k);});const ring=addMesh(new THREE.TorusGeometry(0.1,0.03,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.8}),OAK.x+2.4,7.2,OAK.z+1);}
          else if(E===1){KS.g.position.set(kot.g.position.x+1,0,kot.g.position.z+1.4);anim(1,k=>{KS.body.position.y=-k*0.9;});}
          else{KS.g.position.set(OAK.x+2.2,0,OAK.z+3.4);KS.g.rotation.y=Math.PI*0.8;}}}],
      tick:(t)=>{if(t>12.4&&t<22)kot.head.rotation.x=0.2+Math.sin(t*6)*0.05;},
      end:()=>{W.anims.length=0;bb.style.display='none';G.flags.names={potap:true,yosha:true,proshka:true,pelageya:true};G.flags.nameless=false;G.flags.kotVoice=true;G.flags.w5done=true;G.flags.coils=5;
        G.done['5-B2']=true;G.hub=true;banner('Златая цепь скована!','#ffd76a',3,'звено руками Прошки сковано и словом Пелагеи держится');later(2.6,()=>goLevel('epi'));}});}
  /* ---------- логика ---------- */
  W.updates.push(dt=>{
    if(G.cine)return;ringTick(dt);if(F.stage==='forge'&&FG.on)forgeTick(dt);
    if(F.stage==='w1'||F.stage==='w2'||F.stage==='forge'){
      // отбивы → звенья к дубу
      const n=statN();while(st0<n){st0++;const e=chains.find(q=>q.alive)||{pos:KP};if(F.stage==='w2'&&F.oakW===0){dryFlip=!dryFlip;if(dryFlip){fallLink(e.pos);continue;}}linkToOak(e.pos,F.stage==='w2'&&F.oakW>1?2:1);}
      // цепи вырастают возле героев
      for(const pi of[0,1]){const mine=chains.filter(e=>e.alive&&e.pi===pi);for(const e of mine){e.life+=dt;if(e.state==='broken'||e.life>9)retract(e);}
        if(mine.length<F.maxCh[pi]){F['sp'+pi]=(F['sp'+pi]||0)-dt;if(F['sp'+pi]<=0){F['sp'+pi]=F.stage==='w2'?1.4:2;spawnChain(pi);}}}
      if(F.potShield>0){F.potShield-=dt;T.potap.iT=Math.max(T.potap.iT,0.1);}
      if(F.stage==='w1'&&F.links>=F.need&&!RG.on&&!RG.after){startRing(skaz1);}
      if(F.stage==='w2'&&F.links>=F.need&&!RG.on&&!RG.after){if(!G.flags.names.yosha)nameYosha();startRing(skaz2);}
      if(F.stage==='w2'&&!F.full&&hd(T.yosha.pos,spring)<1.8){F.full=true;SFX.water();floatText(T.yosha.pos.clone().add(new V3(0,1.6,0)),'Ковшик полон','#9fe6ff');}}});
  W.onAttack=(pi,h)=>{floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'☁ вспоминаем…','#e8f0ff');};
  /* ---------- рисунки кнопок и задачи ---------- */
  const Y=T.yosha;prompt(1,'skill',()=>headOf(Y),()=>F.stage==='w2'&&F.full&&(hd(Y.pos,oakWT.pos)<3.4||hd(Y.pos,T.potap.pos)<3.2),'полить');
  prompt(1,'label',()=>new V3(spring.x,2,spring.z),()=>F.stage==='w2'&&!F.full,'набери воды');
  prompt(0,'attack',()=>headOf(T.proshka),()=>F.stage==='forge'&&fring.visible,'в такт');
  const mk=pi=>[
    O('Финал…',()=>F.stage!=='intro'&&F.stage!=='introCine',()=>[KS.g]),
    O(()=>'Волна 1: Потап щит держит, за ним — Пелагея. Отбей '+K(pi,'guard')+' в миг удара — звено к дубу улетит.<br>Красный зубец — кувырок '+K(pi,'roll')+'. Удар X тут не поможет — не спит.',()=>F.skaz>=1,()=>chains.filter(e=>e.alive&&e.pi===pi).map(e=>e.g)),
    O(pi?()=>'Волна 2: Йоша поливает '+K(1,'skill')+' — дуб (ветки звенья удержат) иль щит Потапа (он снова силён).<br>Ковшик пуст — к роднику беги, вот и весь закон.':()=>'Волна 2: Потап держит щит. Подскажи Варе, кого полить — тебя или дуб',()=>F.skaz>=2,()=>pi?[trunk]:chains.filter(e=>e.alive).map(e=>e.g)),
    O(pi?()=>'Волна 3: Прошка куёт. Держи щиты вкруг наковальни.':()=>'Волна 3: Прошка у наковальни — бей '+K(0,'attack')+' в такт: дзинь, дзинь, дзинь.',()=>F.skaz>=3||F.stage==='chain',()=>[anvil]),
    O('Сказ по памяти сказывают…',()=>false,()=>[])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.spawns=[[new V3(-3,0,4),new V3(-1,0,4)],[new V3(1,0,4),new V3(3,0,4)]];W.startAct=[0,0];
  W.pauseLine='Финал. X не бьёт — сегодня лишь защищаемся да вспоминаем.<br>Отбивы звенья из цепей Кощея выбивают — к дубу они летят, мы их не теряем.<br>Общий кружок — Богатырский щит вдвоём. Сказ по памяти: начало, помощник, конец — собираем.';
  W.onStart=()=>{intro();};
  flushDecor();}

