/* ============================== МИР 5 · 5-Б1 «КОЩЕЙ В ТЕРЕМЕ» — бой «выстоять», заранее объявленный проигрыш ============================== */
// цель «Выстоять» вместо полоски босса · фаза 1: тени-двойники перенимают любимую защиту · фаза 2: несобранные искры — золото, клещами в горн; длинный мах с меткой-жёлудем — рогаткой
// фаза 3: Кощей поднимает иглу — неуязвим; 30 секунд закрываем Пелагею; он забирает тетрадку: «Не бойся. Я её не порву. Я хочу прочитать.»
function build5B1(){
  W.zvenAway=false;W.world=5;setTheme('terem');W.name='5-Б1 · Кощей в тереме';W.sub='Остров Буян · бой · цель — выстоять';W.camX=14;const F=W.flags;F.stage='intro';F.t=0;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.noLose=true;W.fallY=-12;const T=HERO;const C=new V3(0,0,-16),R=12;
  const P1D=75,P2D=70,P3D=30,TOT=P1D+P2D+P3D;
  const floorM=M(0x201a26),wallM=M(0x120e18),goldM=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.45}),chestM=M(0x5a3a1a);
  ground(-17,17,-42,12,0,floorM,M(0x100c14));wall(-17.2,-17,-42,12);wall(17,17.2,-42,12);wall(-17,17,-42.2,-42);wall(-17,17,12,12.2);
  for(let z=10;z>-42;z-=4)for(const s of[-1,1]){box(s>0?15.6:-17,s>0?17:-15.6,0,12,z-4,z,wallM,{solid:false});}
  // золотые сундуки до потолка
  for(let z=8;z>-40;z-=2.4)for(const s of[-1,1])for(let y=0;y<9;y+=1.25){const c=addMesh(new THREE.BoxGeometry(1.4,1.1,2),chestM,s*(14.8-rand(0,0.3)),y+0.55,z+rand(-0.2,0.2));c.castShadow=false;addMesh(new THREE.BoxGeometry(1.44,0.14,2.04),goldM,s*14.8,y+1.0,z).castShadow=false;}
  for(let x=-12;x<=12;x+=2.4)for(let y=0;y<9;y+=1.25){addMesh(new THREE.BoxGeometry(2,1.1,1.4),chestM,x,y+0.55,-40.2).castShadow=false;}
  for(let i=0;i<6;i++){const l=new THREE.PointLight(0xffc870,0.6,16,2);l.position.set(i%2?9:-9,5,4-i*8);W.group.add(l);}
  // ступени терема у входа
  for(let i=0;i<4;i++)addMesh(new THREE.BoxGeometry(10,0.3,1.2),M(0x2a2230),0,0.15+i*0.001,10.5-i*1.2);
  // трон и Кощей с иглой
  const throne=new THREE.Group();throne.position.set(0,0,-31);W.group.add(throne);addMesh(new THREE.BoxGeometry(3,1,2.4),M(0x1a1420),0,0.5,0,throne);addMesh(new THREE.BoxGeometry(3,5,0.5),M(0x1a1420),0,2.5,-1,throne);
  for(const s of[-1,1])addMesh(new THREE.ConeGeometry(0.3,1.2,6),goldM,s*1.3,5.4,-1,throne);addMesh(new THREE.BoxGeometry(3.2,0.2,0.6),goldM,0,4.9,-1,throne);W.cyls.push({x:0,z:-31,r:2,miny:-1,maxy:6,on:true});
  const KS=makeKoschei();KS.g.scale.setScalar(1.2);KS.g.position.set(0,0.2,-30.6);KS.body.position.y=-0.8;KS.body.rotation.x=-0.05;
  const ndl=makeNeedle(1.2);KS.hand.add(ndl.g);W.group.remove(ndl.g);ndl.g.position.set(0,-0.1,0.1);ndl.g.scale.setScalar(0.5);KS.hand.add(ndl.g);
  const nIcon=makeNeedle(1.5);nIcon.g.visible=false;   // над Кощеем вместо угольков — игла
  // горн у стены для золота, знак клещей
  const forge=makeForge(-13.6,-16,0,{ry:Math.PI/2});const fs=hotSocket(-12.4,1.0,-16,{r:1.7,accept:it=>it.gold,onPut:(it)=>{it.gone=true;W.group.remove(it.g);for(let i=0;i<5;i++)spawnSpark(new V3(-12,1.6,-16+rand(-0.6,0.6)),0x6ad0ff);
      SFX.whoosh();burst(new V3(-12.4,1.4,-16),0xffd23a,14,3);floatText(new V3(-12.4,2.2,-16),'Снова искры!','#ffe08a');F.goldBack=(F.goldBack||0)+1;}});
  signMark(0,0,-16,'kleshi',{r:13,noArea:true});
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,8);
  const bb=$('bossbar');W.onLeave=()=>{bb.style.display='none';};
  function setBar(){const k=clamp(F.t/TOT,0,1);const ph=F.t<P1D?'тени':F.t<P1D+P2D?'золото':'тетрадка';bb.style.display='block';bb.style.borderColor='#a0ffb8';
    const pn=F.t<P1D?1:F.t<P1D+P2D?2:3;bb.innerHTML='<b style="color:#a0ffb8">Цель: выстоять</b> · '+pn+' / 3 · '+ph+' <span class="seg" style="width:180px"><i style="width:'+Math.round(k*100)+'%;background:#a0ffb8"></i></span>';}
  /* ---------- тени-двойники ---------- */
  const SH=[['proshka',0],['potap',0],['pelageya',1],['yosha',1]];const shadows=[];
  function spawnShadow(kind,pi){const a=rand(-0.8,0.8)+(pi?0.6:-0.6);const x=C.x+Math.sin(a)*8,z=C.z-Math.cos(a)*8;const e=dvoynikFoe(kind,x,z,{pi,leash:14});e.dv=true;burst(new V3(x,1,z),0x3a1a6a,14,3);SFX.whoosh();shadows.push({e,kind,pi,t:0});return e;}
  /* ---------- длинный мах с меткой-жёлудем ---------- */
  const mark=acornMesh(2.4);mark.visible=false;W.group.add(mark);const markPos=new V3(0.9,4.6,-29.6);mark.position.copy(markPos);let swing=null;
  W.marks.push({pos:markPos,active:()=>!!swing&&swing.state==='wind',onHit:()=>{swing=null;mark.visible=false;KS.armR.rotation.x=0;tone(1600,0.4,'sine',0.2,600);floatText(markPos.clone().add(new V3(0,1,0)),'Прервали мах!','#ffe08a');SFX.ok();F.cut=(F.cut||0)+1;}});
  const waveM=MB(0x2a1a3a,{transparent:true,opacity:0.8});const wave=new THREE.Mesh(new THREE.TorusGeometry(1,0.18,6,48),waveM);wave.rotation.x=Math.PI/2;wave.visible=false;W.group.add(wave);
  function startSwing(){swing={state:'wind',t:0};mark.visible=true;SFX.yellow();banner('Длинный мах!','#ffe08a',1.6,'видишь жёлудь? Из рогатки '+K(0,'skill')+' стрельни в него');}
  function swingTick(dt){if(!swing)return;swing.t+=dt;if(swing.state==='wind'){KS.armR.rotation.x=-Math.min(2.2,swing.t*0.9);mark.position.y=markPos.y+Math.sin(G.time*6)*0.1;if(swing.t>3){swing.state='wave';swing.t=0;mark.visible=false;wave.visible=true;SFX.crash();}}
    else{const r=swing.t*11;wave.position.set(0,0.3,-29);wave.scale.setScalar(r);waveM.opacity=0.8*(1-swing.t/1.8);
      for(const h of HEROES){if(!h.active)continue;const d=hd(h.pos,{x:0,z:-29});if(Math.abs(d-r)<0.9&&h.pos.y<0.7&&h.iT<=0&&!h.waveHit){h.waveHit=true;const dx=h.pos.x,dz=h.pos.z+29,dl=Math.hypot(dx,dz)||1;h.vel.x=dx/dl*8;h.vel.z=dz/dl*8;h.vel.y=4;h.grounded=false;h.knockT=0.4;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ох! Мах','#c8b0ff');}}
      if(swing.t>1.8){swing=null;wave.visible=false;KS.armR.rotation.x=0;HEROES.forEach(h=>{h.waveHit=false;});}}}
  // Ctrl+Alt+B (релиз, late_95_dev.js): следующая часть боя — для проверки и показа; вернуть true, если перешли
  W.bossNext=()=>{if(F.stage!=='fight'||G.cine)return false;if(!F.phase2)F.t=P1D;else if(!F.phase3)F.t=P1D+P2D;else F.p3t=P3D;return true;};
  /* ---------- ход боя ---------- */
  function intro(){F.stage='introCine';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,10,0);h.face=Math.PI;});
    play({dur:20,fov:46,camK:2.2,shots:[shot(0,[0,2,16],[0,1.6,8],[0,2.4,12],[0,1.8,4],5),shot(6,[6,5,2],[0,2,-26]),shot(12,[2,3,-24],[0,3.2,-30.6]),shot(16.4,[0,6,6],[0,1,-16])],
      says:[[0.3,4,null,'<i>Тихая минута — на ступенях терема. Мы поднимаемся медленно. Звенышко летит впереди и звенит то, что Кот написал на песке.</i>',true],
        [4.4,4,'zven','Здесь не победить. Продержитесь — и посмотрите, куда он спрячет иглу.'],[8.6,3.4,null,'<i>Терем чёрный, сундуки золотые — до самого потолка.</i>',true],[12.2,3.6,null,'<i>Кощей на троне сидит — иглу держит в руке.</i>',true],
        [16.4,3.4,null,'<i>Над нами впервые висит не полоска босса, а цель: выстоять.</i>',true]],
      events:[{t:0.3,fn:()=>{HEROES.forEach((h,i)=>{const f=h.pos.clone();anim(5,k=>{h.pos.set(f.x,f.y,f.z-k*5);});});}},{t:16.4,fn:()=>{F.t=0;setBar();}}],
      tick:(t)=>{Z.pos.set(Math.sin(t)*0.6,2.6,8-t*1.4);},
      end:()=>{W.anims.length=0;F.stage='fight';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-6,0);h.face=Math.PI;});W.clampR={x:C.x,z:C.z,r:R};snapCams();setBar();Z.mode='lead';
        SH.forEach(([k,pi])=>spawnShadow(k,pi));banner('Тени-двойники!','#c8b0ff',2.6,'дерутся, как мы · одной и той же защитой их не одолеть — меняй щит, отбив и кувырок');}});}
  function toPhase2(){F.phase2=true;banner('Золото!','#ffd76a',2.6,'Кощей несобранные искры в слитки обращает · возьми клещами '+K(0,'item')+' — и в печь у стены');later(1,()=>say('zven','Слиток — в горн! Он снова станет искрами.',2.6,true));
    shadows.forEach(s=>{if(s.e.alive&&(s.kind==='potap'||s.kind==='yosha')){s.e.alive=false;s.dead=true;W.group.remove(s.e.g);burst(s.e.pos.clone().add(new V3(0,1,0)),0x3a1a6a,12,3);}});F.swingT=5;}
  function toPhase3(){F.phase3=true;F.p3t=0;SFX.gate();shake(0,0.3,0.5);shake(1,0.3,0.5);
    shadows.forEach(s=>{if(s.e.alive){s.e.alive=false;W.group.remove(s.e.g);burst(s.e.pos.clone().add(new V3(0,1,0)),0x3a1a6a,12,3);}});shadows.length=0;
    W.hots.forEach(it=>{if(it.gold&&!it.gone){it.gone=true;if(it.carrier){it.carrier.carry=null;it.carrier=null;}W.group.remove(it.g);}});swing=null;mark.visible=false;wave.visible=false;
    KS.body.position.y=0;KS.body.rotation.x=0;KS.g.position.set(0,0,-28);KS.armR.rotation.x=-2.6;nIcon.g.visible=true;
    banner('Кощей иглу подымает','#a0ffb8',3,'всё замерло · удары насквозь идут · закрываем Пелагею');later(1.2,()=>say('zven','Закройте Пелагею! Хоть немножко, хоть чуть!',2.4,true));
    later(2,()=>{Z.mode='script';});}
  function takeBook(){F.stage='book';const pe=T.pelageya;nIcon.g.visible=false;const nb=makeNotebook();nb.g.scale.setScalar(0.9);nb.g.position.set(pe.pos.x+0.2,1.0,pe.pos.z+0.3);
    play({dur:17,fov:44,camK:2.2,shots:[shot(0,[pe.pos.x+3,2.4,pe.pos.z+3],[pe.pos.x,1.2,pe.pos.z]),shot(6.4,[pe.pos.x-2,2,pe.pos.z+4],[KS.g.position.x,2.6,KS.g.position.z]),shot(10.8,[0,3,4],[0,2.6,8])],
      says:[[0.3,3.6,null,'<i>Кощей сквозь щит идёт, как сквозь дым, крыло отводит —</i><br><i>И тетрадку забирает, прочь уходит.</i>',true],[4.2,2.4,null,'<i>Просто берёт — и прочь уходит.</i>',true],
        [7,2.4,null,'<i>Уж в дверях оборачивается.</i>',true],[9.6,4.6,'koschei','Не бойся. Я её не порву.<br>Прочитать хочу — только и всего.'],[14.4,2.4,null,'<i>Звенышко у Пелагеи под крылом прячется.</i>',true]],
      events:[{t:0.3,fn:()=>{KS.g.position.set(pe.pos.x,0,pe.pos.z-1.1);KS.g.rotation.y=0;anim(0.8,k=>{KS.armR.rotation.x=-k*1.2;});later(1.6,()=>{anim(1,k=>{nb.g.position.lerpVectors(nb.g.position.clone(),KS.hand.getWorldPosition(new V3()),k);});});}},
        {t:4.2,fn:()=>{const f=KS.g.position.clone();KS.g.rotation.y=Math.PI;anim(5,k=>{KS.g.position.lerpVectors(f,new V3(0,0,9),k);nb.g.position.copy(KS.hand.getWorldPosition(new V3()));});}},
        {t:9.4,fn:()=>{KS.g.rotation.y=0;}},{t:14.4,fn:()=>{Z.pos.copy(pe.pos).add(new V3(0.4,0.8,0.2));}}],
      end:()=>{W.anims.length=0;flushGifts();F.out=true;bb.style.display='none';G.flags.nameless=true;G.flags.names={};banner('Выстояли','#a0ffb8',2.6,'потеряна: тетрадка Пелагеи');later(2,finishLevel);}});}
  W.updates.push(dt=>{
    if(F.stage!=='fight'||G.cine)return;F.t+=dt;setBar();
    // тени возвращаются из темноты
    if(!F.phase3){for(const s of shadows){if(!s.e.alive&&!s.dead){s.t+=dt;if(s.t>(F.phase2?8:5)){s.t=0;const i=shadows.indexOf(s);shadows[i]={e:spawnShadow(s.kind,s.pi),kind:s.kind,pi:s.pi,t:0};shadows.pop();}}}}
    if(!F.said&&F.t>18){F.said=true;say('koschei','<i>(ни к кому не обращаясь)</i> Я вас читал. Все ваши сказки — на один лад.',3.6);later(3.8,()=>{const y=T.yosha;bark(y,'yosha','Не все, не все!',1.6);if(y.active){y.rollT=0.38;y.iT=0.42;y.rollDir.set(Math.sin(y.face),0,Math.cos(y.face));SFX.roll();}});}
    if(F.t>=P1D&&!F.phase2)toPhase2();
    if(F.phase2&&!F.phase3){F.swingT-=dt;if(F.swingT<=0&&!swing){F.swingT=12;startSwing();}swingTick(dt);
      // несобранные искры — в золото
      for(let i=W.sparks.length-1;i>=0;i--){const s=W.sparks[i];if(s.free>3&&W.hots.filter(q=>q.gold&&!q.gone).length<6){const p=s.m.position.clone();W.group.remove(s.m);W.sparks.splice(i,1);dropGold(p);}}
      F.goldT=(F.goldT||4)-dt;if(F.goldT<=0){F.goldT=9;if(W.hots.filter(q=>q.gold&&!q.gone).length<3)dropGold(new V3(C.x+rand(-7,7),5,C.z+rand(-6,6)));}}
    if(F.t>=P1D+P2D&&!F.phase3)toPhase3();
    if(F.phase3){F.p3t+=dt;const pe=T.pelageya,left=Math.max(0.1,P3D-F.p3t);const kp=KS.g.position,dx=pe.pos.x-kp.x,dz=pe.pos.z-kp.z,d=Math.hypot(dx,dz);const sp=Math.max(0.25,(d-1.2)/left);
      if(d>1.2){kp.x+=dx/d*sp*dt;kp.z+=dz/d*sp*dt;}KS.g.rotation.y=Math.atan2(dx,dz);KS.body.rotation.z=Math.sin(G.time*3)*0.03;nIcon.g.position.set(kp.x,5.6+Math.sin(G.time*2)*0.1,kp.z);nIcon.g.rotation.y+=dt;
      for(const h of HEROES)if(h!==pe&&hd(h.pos,kp)<1.2){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'…насквозь, как дым','#a0ffb8');const ex=h.pos.x-kp.x,ez=h.pos.z-kp.z,el=Math.hypot(ex,ez)||1;h.pos.x+=ex/el*0.1;h.pos.z+=ez/el*0.1;}
      if(Math.floor(F.p3t)!==F.p3s){F.p3s=Math.floor(F.p3t);if(F.p3s%10===5)bark(T.potap,'potap',['Держу, держу!','Не пущу, не пущу…','Не пройдёт, не пройдёт…'][Math.floor(F.p3s/10)%3],1.4);}
      if(F.p3t>=P3D)takeBook();}});
  function dropGold(p){const g=new V3(clamp(p.x,-10,10),0,clamp(p.z,-26,-6));const it=hotItem('zoloto',g.x,4,g.z,{noCool:true,coolable:false,respawn:false,gold:true});it.flying=true;anim(0.6,k=>{it.pos.y=4-k*4;if(k>=1){it.flying=false;SFX.plate();burst(it.pos.clone(),0xffd23a,8,2);}});}
  // удары по Кощею проходят сквозь
  W.onAttack=(pi,h)=>{if(hd(h.pos,KS.g.position)<2.4){floatText(KS.g.position.clone().add(new V3(0,3,0)),F.phase3?'Сквозь — игла':'Неуязвим — игла при нём','#a0ffb8');}};
  /* ---------- рисунки кнопок и задачи ---------- */
  prompt(0,'skill',()=>headOf(T.proshka),()=>!!swing&&swing.state==='wind'&&T.proshka.active,'стрельни в жёлудь');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'item',()=>headOf(h()),()=>F.phase2&&!F.phase3&&!heroCarry(h())&&W.hots.some(it=>it.gold&&!it.gone&&!it.carrier&&hd(it.pos,h().pos)<1.8),'возьми слиток');
    prompt(pi,'item',()=>headOf(h()),()=>!!heroCarry(h())&&hd(h().pos,fs.pos)<3,'в печь');}
  const mk=pi=>[
    O('Терем…',()=>F.stage!=='intro'&&F.stage!=='introCine',()=>[KS.g]),
    O(()=>'Держитесь! Тени-двойники дерутся, как мы, и защиту запоминают.<br>Меняй приёмы: щит '+K(pi,'guard')+', отбив, кувырок '+K(pi,'roll')+' — пусть гадают.',()=>!!F.phase2,()=>shadows.filter(s=>s.e.alive&&s.pi===pi).map(s=>s.e.g)),
    O(()=>'Золотой слиток клещами '+K(pi,'item')+' возьми — в печь у стены брось: искрами станет опять.<br>Видишь жёлудь на длинном замахе? Из рогатки Прошки '+K(0,'skill')+' стрельни — вот так стрелять!',()=>!!F.phase3,()=>{const g=W.hots.filter(it=>it.gold&&!it.gone).map(it=>it.g);return g.length?g:[forge.bag||KS.g];}),
    O(()=>'Кощей иглу поднял — сейчас его не ранить.<br>Закройте Пелагею: Потап — щитом, Прошка стреляет, Йоша поливает — не оставить!',()=>F.stage==='book',()=>[T.pelageya.g]),
    O('…',()=>false,()=>[])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.spawns=[[new V3(-3,0,10),new V3(-1,0,10)],[new V3(1,0,10),new V3(3,0,10)]];W.startAct=[0,0];
  W.pauseLine='Кощей в тереме. Тут не победить — лишь выстоять: цель вверху, вместо полоски босса.<br>Тени любимую защиту перенимают — чередуй приёмы. Слитки — клещами в горн, без спроса.<br>Как поднимет он иглу — Пелагею закрываем.';
  W.onStart=()=>{intro();};
  flushDecor();}

