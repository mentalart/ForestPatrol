/* ============================== РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ» — ВДВОЕ ДЛИННЕЕ; БОЙ — ТРИ ЭТАПА ПО ОБРАЗЦУ КОЩЕЯ ============================== */
// Перед омутом — «Погоня Водяного» (сказка «Морской царь и Василиса Премудрая»): после «Бом» в 2-5 Водяной проснулся, река встаёт валом и
// гонит героев к омуту. Дуб поперёк тропы — Потап поднимет; ручей — прилив гуслями и вплавь; за скалами гребешок Василисы — Йоша польёт,
// камыш встанет стеной и задержит вал; плетень у омута — две верёвки дёрнуть разом. Догнал вал — к последней отметке. Дальше — прежний бой.
// Камера в погоне — впереди героев, лицом к ним (W.camYaw=π): видно и героев, и вал за спиной; бегут «на камеру» (вниз по экрану).
build2B=function(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('whirl');sky('day');W.name='2-Б · «Водяной»';W.sub='Босс мира 2 · погоня и омут · три этапа: водяные кони, воронка, великий вал';W.camX=16;const F=W.flags;F.phase=0;F.fin=[-9,-9];
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-8;W.waterCol=0x3a8aa0;W.waterOp=0.46;
  const C={x:0,z:-14},R=11,T=HERO,bank=M(0x7a8a6a),rock=M(0x6a6a64);
  ground(-16,16,-3,8,1,bank);ground(-16,16,-32,-25,1,bank);ground(-16,-11,-25,-3,1,bank);ground(11,16,-25,-3,1,bank);ground(-11,11,-25,-3,-2,M(0x4a5a4a));
  wall(-16.2,-16,-32,8);wall(16,16.2,-32,8);wall(-16.2,16.2,-32.2,-32);
  {const rw=new THREE.Mesh(new THREE.CylinderGeometry(R,R,3.2,48,1,true),M(0x5a6a5a,{side:THREE.BackSide}));rw.position.set(C.x,-0.5,C.z);W.group.add(rw);
    const rg=new THREE.Mesh(new THREE.RingGeometry(R,17,48),M(0x7a8a6a,{side:THREE.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.set(C.x,1.01,C.z);rg.receiveShadow=true;W.group.add(rg);}
  for(let i=0;i<36;i++){const a=i/36*Math.PI*2;decorFir(C.x+Math.cos(a)*rand(19,26),C.z+Math.sin(a)*rand(19,26),rand(1.2,2),true,1);}
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(500,500),M(0x2f6a80));sea.rotation.x=-Math.PI/2;sea.position.y=-3;W.group.add(sea);
  // высокая скала за омутом — там стоит тонкая чёрная фигура
  addMesh(new THREE.CylinderGeometry(1.6,3.4,10,8),rock,-15,5,-31);const ko=makeKoschei();ko.g.position.set(-15,10,-31);ko.g.rotation.y=0.5;ko.g.scale.setScalar(0.9);ko.g.visible=false;
  const glint=new THREE.Mesh(new THREE.SphereGeometry(0.12,8,6),MB(0xffffff));glint.visible=false;W.group.add(glint);
  const snag=addMesh(new THREE.CylinderGeometry(0.5,0.7,4,8),M(0x5a4028),0.8,-1.4,-14.6);snag.rotation.z=1.2;
  // четыре раковины по краям омута
  const zone=waterZone(-11,11,-25,-3,-2,0.8,{floor:-2,shell:false,curb:false});
  zone.noGusli=true;   // гусли в омуте — только родники и колокола (этапы 2 и 3)
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,2);W.zvenFree=true;
  const arena={x:C.x,z:C.z,r:R-2,camActive:()=>!G.cine&&F.phase>=1};W.camZones.push(arena);
  bell(0,4,1);bell(-4,80,1);bell(-4,35.6,1);
  const bb=$('bossbar');bb.style.display='none';W.onLeave=()=>{bb.style.display='none';};
  let vod=null;
  /* ---------- бой с Водяным: три этапа по образцу Кощея — «Водяные кони», «Воронка», «Великий вал» ----------
     1 «Водяные кони»: Водяной скачет по омуту на пенной волне — не достать. Кидает водяные шары: отбей в последний миг — шар летит в него;
       три попадания — свалился с волны, оглушён: бей. Рывок через омут — красная дорожка: кувырок или в сторону. Из воды — раки и щуки.
     2 «Воронка»: омут крутится, пловцов тянет к середине; гейзеры — красный круг под героем, через миг бьёт столб. Четыре родника по краю:
       сыграть два противоположных разом (оставленный держит напев) — встречное течение глушит воронку, вода уходит, Водяной закружился;
       из воронки лезут тягуны и пузырники.
     3 «Великий вал»: Водяной вырос и поднял весь омут стеной. Валы катятся через омут — прячься за валун. Три колокола Китежа по краю —
       зазвонить разом: Водяной съёживается, оглушён — бей; добить — богатырский мах вдвоём (в одиночку — одним).
     В одиночку: волна и гейзеры реже, миньонов меньше, оглушение дольше; родники и колокола — «оставленный держит напев». */
  const BS={ang:-Math.PI/2,ride:false,hits:0,throwT:2.5,dashT:9,dash:null,minT:5,adds:[],geyT:2.5,stall:0,waveT:5,wave:null,stun:false,grow:1,lonT:0};
  const SOLO=()=>!!G.solo,maxAdds=()=>SOLO()?2:4,PR=7.4;
  const at=(a,r)=>new V3(C.x+Math.cos(a)*r,0,C.z+Math.sin(a)*r);
  const live=()=>HEROES.filter(h=>h.active&&!h.cling&&!h.kwHold&&!players[h.player].downed);   // кто держит напев — не мишень (иначе одному не собрать)
  const pick=()=>{const L=live();return L[Math.floor(Math.random()*L.length)]||active(0);};
  const surf=()=>Math.max(zone.level,zone.floor)+0.02;
  // ---------- водяные эффекты ----------
  function column(x,z,h,dur,r){const m=new THREE.Mesh(new THREE.CylinderGeometry(r||0.9,(r||0.9)*1.35,1,16,1,true),MB(0xcff4ff,{transparent:true,opacity:0.6,depthWrite:false,side:THREE.DoubleSide}));
    const y0=surf();m.position.set(x,y0,z);m.userData.noBatch=true;W.group.add(m);
    anim(dur||1.2,k=>{const s=Math.sin(Math.min(1,k)*Math.PI);m.scale.set(1+0.2*s,Math.max(0.01,h*s),1+0.2*s);m.position.y=y0+h*s/2;m.material.opacity=0.65*s;m.rotation.y+=0.2;if(k>=1)W.group.remove(m);});
    for(let i=0;i<12;i++)later(i*0.05,()=>burst(new V3(x+rand(-0.7,0.7),y0+rand(0.4,h),z+rand(-0.7,0.7)),[0xe8fbff,0x9ae0f0,0xffffff][i%3],3,3.4,0.5));}
  function ripple(x,z,r1,dur,col){const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.09,6,48),MB(col||0xe8fbff,{transparent:true,opacity:0.85,depthWrite:false}));m.rotation.x=-Math.PI/2;
    m.position.set(x,surf()+0.08,z);m.userData.noBatch=true;W.group.add(m);anim(dur||1,k=>{m.scale.setScalar(0.3+r1*k);m.material.opacity=0.85*(1-k);if(k>=1)W.group.remove(m);});}
  function warnDisc(x,z,r,dur){const m=new THREE.Mesh(new THREE.CircleGeometry(r,28),MB(0xff5a4a,{transparent:true,opacity:0.3,depthWrite:false}));m.rotation.x=-Math.PI/2;
    m.position.set(x,surf()+0.06,z);m.userData.noBatch=true;W.group.add(m);anim(dur,k=>{m.material.opacity=0.22+0.3*Math.abs(Math.sin(k*dur*7));m.scale.setScalar(0.6+0.4*Math.min(1,k*3));if(k>=1)W.group.remove(m);});}
  function hurtAt(p,r,label){for(const h of live()){if(Math.hypot(h.pos.x-p.x,h.pos.z-p.z)>r)continue;if(damageHero(h,{kind:'hazard',ref:{pos:p}})&&label)floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),label,'#9fe6ff');}}
  // пенный гребень под Водяным, на котором он скачет
  const crest=new THREE.Group();W.group.add(crest);crest.visible=false;{const fm=MB(0xf4fdff,{transparent:true,opacity:0.85,depthWrite:false});const wm=MB(0x6ad0e8,{transparent:true,opacity:0.6,depthWrite:false});
    const w=new THREE.Mesh(new THREE.SphereGeometry(1,16,10,0,Math.PI*2,0,Math.PI/2),wm);w.scale.set(2.6,1.1,3.4);crest.add(w);
    for(let i=0;i<9;i++){const f=new THREE.Mesh(new THREE.SphereGeometry(rand(0.35,0.6),8,6),fm);f.position.set(rand(-2,2),rand(0.6,1.2),rand(-2.8,2.8));crest.add(f);}crest.traverse(c=>{c.userData.noBatch=true;});}
  // стена воды за Водяным (этап 3) и вал, что катится через омут
  const wallW=new THREE.Mesh(new THREE.BoxGeometry(24,1,2.4),MB(0x2f8ab0,{transparent:true,opacity:0.78,depthWrite:false}));wallW.position.set(C.x,-2,C.z-11.5);wallW.visible=false;wallW.userData.noBatch=true;W.group.add(wallW);
  const valG=new THREE.Group();W.group.add(valG);valG.visible=false;{const vm=MB(0x7ad0e8,{transparent:true,opacity:0.6,depthWrite:false,side:THREE.DoubleSide}),fm=MB(0xf4fdff,{transparent:true,opacity:0.9,depthWrite:false});
    const b=new THREE.Mesh(new THREE.BoxGeometry(22,2.6,1.2),vm);b.position.y=1.3;valG.add(b);for(let i=0;i<16;i++){const f=new THREE.Mesh(new THREE.SphereGeometry(rand(0.4,0.7),8,6),fm);f.position.set(-10.5+i*1.4,2.6+rand(-0.2,0.2),rand(-0.3,0.3));valG.add(f);}valG.traverse(c=>{c.userData.noBatch=true;});}
  // валуны-укрытия (этап 3): за ними вал не достаёт
  const ROCKS=[[-5.6,-12.6],[0,-10.4],[5.6,-12.6]].map(([x,z])=>{const g=new THREE.Group();g.position.set(x,-2.6,z);W.group.add(g);const m=addMesh(new THREE.DodecahedronGeometry(1.25),rock,0,0,0,g);m.scale.set(1.2,1,0.9);
    g.visible=false;const cyl={x,z,r:1.3,miny:-3,maxy:-0.6,on:false};W.cyls.push(cyl);return {x,z,g,cyl};});
  // родники (этап 2) и колокола Китежа (этап 3): ракушки по краю омута; сыграл — звучит 3 с; оставленный герой держит напев 15 с
  const mkRef=(dur)=>({hum:0,off:true,dur,ring(h){this.hum=Math.max(this.hum,this.dur);SFX.ok();}});
  const SP=[[0,-23.4,0],[9.4,-14,-Math.PI/2],[0,-4.6,Math.PI],[-9.4,-14,Math.PI/2]].map(([x,z,ry],i)=>{const S=kwShell('dance',x,z,-1.0,mkRef(3),{ry,r:2.4,say:['Родник!','Течение!','Родник!','Течение!'][i]});S.g.visible=false;S.g.traverse(c=>{c.userData.noBatch=true;});return S;});
  const BELL=[[-9.4,-17.5,Math.PI/2],[9.4,-17.5,-Math.PI/2],[0,-4.6,Math.PI]].map(([x,z,ry])=>{const S=kwShell('ring',x,z,-1.0,mkRef(4),{ry,r:2.4,say:'Дзинь!'});S.kind='dance';S.g.visible=false;S.g.traverse(c=>{c.userData.noBatch=true;});return S;});
  const showShells=(L,on)=>{for(const S of L){S.ref.off=!on;S.ref.hum=0;if(on&&!S.g.visible){S.g.visible=true;S.g.scale.setScalar(0.01);anim(0.8,k=>{S.g.scale.setScalar(Math.max(0.01,smooth(k)));});column(S.x,S.z,2.4,0.8,0.5);}else if(!on)S.g.visible=false;}};
  const humming=S=>S.ref.hum>0;
  const setBar=()=>{const e=vod;const hp=e&&e.alive?Math.max(0,e.embers)/e.maxEmb:0;const nm=['','Водяные кони','Воронка','Великий вал'][Math.max(1,Math.min(3,F.phase))];
    bb.innerHTML='<b>Водяной</b> · '+Math.max(1,Math.min(3,F.phase))+' / 3 · '+nm+' <span class="seg"><i style="width:'+Math.round((F.won?0:hp)*100)+'%"></i></span>';};
  function addMinion(kind,near){if(BS.adds.filter(e=>e.alive).length>=maxAdds())return null;const a=near!=null?near+rand(-0.6,0.6):rand(0,Math.PI*2),p=at(a,rand(3.5,8.4));
    const e=makeFoe(kind,p.x,p.z,{y:-2,leash:9});BS.adds.push(e);column(p.x,p.z,2.6,0.9,0.6);ripple(p.x,p.z,3,0.8);SFX.splash();return e;}
  function clearAdds(){for(const e of BS.adds){if(!e.alive)continue;e.alive=false;column(e.pos.x,e.pos.z,2,0.7,0.5);W.group.remove(e.g);const k=W.enemies.indexOf(e);if(k>=0)W.enemies.splice(k,1);}BS.adds.length=0;}
  /* ---------- Водяной ---------- */
  function spawnVod(){vod=makeFoe('vodyanoy',C.x,C.z,{y:-2,leash:14,scale:0.9});vod.def=Object.assign({},vod.def,{ranged:false});vod.noKill=true;vod.noMove=true;vod.embers=vod.maxEmb=8;vod.big=true;vod.slowAtk=0;
    vod.shell=null;Object.values(vod.L.plates||{}).forEach(p=>{p.visible=false;});
    vod.guardAll=()=>!(vod.dazeT>0)&&vod.state!=='broken';vod.guardText='не достать — сперва оглушите!';
    vod.onReflect=b=>{const e=vod;burst(e.pos.clone().add(new V3(0,2.4,0)),0x9ae0f0,14,4);
      if(F.phase===1&&BS.ride){BS.hits++;SFX.splash();floatText(e.pos.clone().add(new V3(0,4,0)),BS.hits<3?'Захлебнулся! '+BS.hits+' / 3':'Свалился!','#9fe6ff');if(BS.hits>=3)fall();}
      else if(e.dazeT>0)emberOut(e,1,'Капля вернулась!');};
    vod.onFinisher=h=>{if(F.phase===1){F.phase=1.5;later(0.4,scene2);return;}if(F.phase===2){F.phase=2.5;later(0.4,scene3);return;}
      if(F.phase===3&&!F.won){F.fin[h.player]=G.time;if(SOLO())F.fin[1-h.player]=G.time;SFX.finisher();ringFx(vod.pos,COL.gold,3);floatText(vod.pos.clone().add(new V3(0,4,0)),'Мах!','#ffd76a');
        if(Math.abs(F.fin[0]-F.fin[1])<0.8){win();}
        else if(!F.finTold){F.finTold=true;for(const pi of[0,1])tip(pi,'Водяной оглушён! Ударьте '+K(pi,'attack')+' оба разом — Богатырский мах!',3);}}};
    vod.tick=(e,dt)=>{if(G.cine)return;if(e.state!=='broken'&&!(e.dazeT>0)){e.cd=Math.max(e.cd,1);if(e.state==='ready'||e.state==='wind')e.state='idle';}};
    vod.post=(e)=>{const hd2=e.L.head;if(BS.ride){e.body.rotation.x=0.3;e.body.position.y=Math.sin(G.time*5)*0.12;}else if(e.dazeT>0){e.body.rotation.z=Math.sin(G.time*6)*0.18;}
      if(hd2)hd2.rotation.z=Math.sin(G.time*3)*0.05+(e.dazeT>0?Math.sin(G.time*9)*0.2:0);};}
  // этап 1: свалился с волны — оглушён
  function fall(){const e=vod;BS.ride=false;BS.hits=0;BS.dash=null;crest.visible=false;e.dazeT=SOLO()?10:8;e.pos.y=-2;column(e.pos.x,e.pos.z,4,1.1,1.6);ripple(e.pos.x,e.pos.z,6,1.2);shakeAll(0.06,0.5);SFX.crash();
    banner('Свалился с волны!','#9fe6ff',2,'Водяной оглушён — бейте '+K(0,'attack')+' / '+K(1,'attack')+'!');}
  function remount(){const e=vod;BS.ride=true;BS.throwT=1.6;BS.dashT=7;crest.visible=true;column(e.pos.x,e.pos.z,3,0.9,1.4);bark({g:e.g},'vod','Н-но, волна! Ещё прокачу!',1.8);}
  // этап 2: встречное течение
  function stall(){const e=vod;BS.stall=SOLO()?12:10;setWater(zone,'low');e.dazeT=BS.stall;e.pos.set(C.x,-2,C.z);SFX.crash();shakeAll(0.06,0.6);
    for(const S of SP)column(S.x,S.z,3,1,0.7);column(C.x,C.z,5,1.3,2);ripple(C.x,C.z,10,1.4);
    banner('Встречное течение!','#9fe6ff',2.2,'воронка встала — Водяной закружился, бейте!');addMinion('tyagun');if(!SOLO())addMinion('puzyr');}
  // этап 3: звон Китежа
  function bellStun(){const e=vod;BS.stun=true;BS.wave=null;valG.visible=false;SFX.bell();later(0.3,()=>SFX.bell());for(const S of BELL)column(S.x,S.z,4,1.2,0.5);
    anim(1.4,k=>{BS.grow=1.5-0.5*smooth(k);wallW.scale.y=Math.max(0.01,9*(1-k));wallW.position.y=-2+4.5*(1-k);e.pos.z=lerp(C.z-8.5,C.z,smooth(k));});later(1.4,()=>{wallW.visible=false;});
    for(let i=0;i<18;i++)later(i*0.08,()=>burst(new V3(rand(-10,10),rand(0,5),C.z-11+rand(-1,1)),0xe8fbff,4,4));e.dazeT=SOLO()?13:11;e.embers=e.maxEmb=6;
    banner('Звон Китежа!','#ffd76a',2.4,'Водяной съёжился — бейте! А как оглушите — Богатырский мах вдвоём');}
  function regrow(){const e=vod;BS.stun=false;BS.waveT=5;wallW.visible=true;showShells(BELL,true);anim(1.4,k=>{BS.grow=1+0.5*smooth(k);wallW.scale.y=Math.max(0.01,9*k);wallW.position.y=-2+4.5*k;e.pos.z=lerp(C.z,C.z-8.5,smooth(k));});
    bark({g:e.g},'vod','Ух! Опять вырос — опять смою!',2);}
  function win(){F.won=true;SFX.horn();banner('Богатырский мах!','#ffd76a',2,'вместе — вдвое сильней');G.stats.bogatyr++;shakeAll(0.08,0.6);clearAdds();showShells(BELL,false);valG.visible=false;wallW.visible=false;
    ROCKS.forEach(r=>{r.g.visible=false;r.cyl.on=false;});BS.grow=1;vod.g.scale.setScalar(1);later(1.2,ending);}
  function card(title,sub,tipFn){banner(title,'#7ad0a0',3,sub);later(0.6,()=>{for(const p of[0,1])tip(p,tipFn(p),5);});}
  function start1(){F.phase=1;BS.ride=true;crest.visible=true;BS.ang=-Math.PI/2;BS.throwT=2.4;BS.dashT=9;BS.minT=4;try{CINE.mood('#6f9cff',0.12);}catch(e){}
    card('Этап 1 · Водяные кони','Водяной скачет по омуту на волне',p=>'Водяной кидает водяные шары — <i class="sg b"></i> щит '+K(p,'guard')+' в последний миг: шар полетит в него.<br>Три попадания — свалится с волны, оглушён: бей '+K(p,'attack')+'! Красная дорожка — рывок: кувырок '+K(p,'roll')+'.');}
  function scene2(){const e=vod;e.dazeT=0;e.state='idle';e.embers=e.maxEmb=8;clearAdds();
    play({dur:8.4,fov:48,shots:[shot(0,[6,4.2,-4],[0,0,-14]),shot(3.4,[0,9,-2],[0,-1,-14],[3,11,-4],[0,-1,-14],5)],
      says:[[0.3,2.8,'vod','Буль-буль! Ах так? Закручу омут воронкой!'],[3.6,3,null,'<i>Вода поднялась и пошла по кругу — всё быстрей, быстрей…</i>',true],[6.6,1.8,'zven','Родники по краю! Встречным течением!']],
      events:[{t:0.4,fn:()=>{column(e.pos.x,e.pos.z,6,1.4,1.6);SFX.wave();}},{t:2.8,fn:()=>{setWater(zone,'high');ripple(C.x,C.z,10,1.6);shakeAll(0.05,1);}},{t:4,fn:()=>{showShells(SP,true);}}],
      tick:()=>{swirlFx.visible=true;swirlFx.rotation.z+=0.06;swirlFx.position.y=surf()+0.05;},
      end:()=>{F.phase=2;showShells(SP,true);setWater(zone,'high');BS.geyT=2.5;e.pos.set(C.x,-1.6,C.z);try{CINE.mood('#4f7cff',0.16);}catch(err){}
        card('Этап 2 · Воронка','омут крутится — тянет к середине',p=>'Четыре родника по краю. Сыграйте '+K(p,'item')+' два противоположных — разом: встречное течение остановит воронку!<br>В одиночку: сыграй, смени героя '+K(p,'swap')+' — оставленный держит напев, а ты — к другому. Красный круг — сейчас ударит гейзер!');}});}
  function scene3(){const e=vod;e.dazeT=0;e.state='idle';clearAdds();showShells(SP,false);BS.stall=0;setWater(zone,'low');
    play({dur:10.4,fov:50,shots:[shot(0,[0,3,-3],[0,1.5,-14]),shot(3.6,[9,6,-2],[0,4,-22],[6,8,0],[0,4,-22],4),shot(7.6,[0,6,4],[0,2,-16])],
      says:[[0.3,3,'vod','Ну, держитесь! Весь омут — на вас! Валом смою!'],[3.8,3.4,null,'<i>Водяной вырос выше ёлок, а за ним встала стена воды.</i>',true],[7.6,2.6,'zven','Колокола Китежа! Зазвоните разом!']],
      events:[{t:0.6,fn:()=>{SFX.wave();shakeAll(0.07,1.4);anim(2.6,k=>{BS.grow=1+0.5*smooth(k);e.pos.z=lerp(C.z,C.z-8.5,smooth(k));});}},
        {t:2.4,fn:()=>{wallW.visible=true;anim(2,k=>{wallW.scale.y=Math.max(0.01,9*smooth(k));wallW.position.y=-2+4.5*smooth(k);});for(let i=0;i<20;i++)later(i*0.1,()=>burst(new V3(rand(-10,10),rand(0,6),C.z-11),0xe8fbff,4,4));}},
        {t:6,fn:()=>{ROCKS.forEach((r,i)=>{r.g.visible=true;r.cyl.on=true;anim(0.8,k=>{r.g.position.y=-2.6+1.4*smooth(k);});later(i*0.15,()=>column(r.x,r.z,2,0.7,1));});showShells(BELL,true);}}],
      end:()=>{F.phase=3;BS.waveT=4;BS.stun=false;wallW.visible=true;ROCKS.forEach(r=>{r.g.visible=true;r.cyl.on=true;r.g.position.y=-1.2;});showShells(BELL,true);try{CINE.mood('#3a5aa8',0.2);}catch(err){}
        card('Этап 3 · Великий вал','Водяной поднял весь омут стеной',p=>'Вал катится через омут — прячься за валун!<br>Три колокола Китежа по краю — зазвоните '+K(p,'item')+' все три разом (оставленный держит звон): Водяной съёжится — бей!');}});}
  /* ---------- НОВОЕ «Погоня Водяного» (сказка «Морской царь и Василиса Премудрая»): вал гонится за героями к омуту ---------- */
  // После «Бом» в 2-5 Водяной проснулся: река за спиной встаёт валом и гонит героев к омуту. На тропе — дуб поперёк (Потап поднимет:
  // «Эх, дубинушка, ухнем!»), ручей (в отлив не выбраться — прилив гуслями, и вплавь), узкий проход в скалах и за ним гребешок
  // Василисы — Йоша польёт его живой водой, когда все прошли, и камыш встанет стеной, вал завязнет; у омута плетень с двумя верёвками —
  // дёрнуть разом. Догнал вал — назад к последней отметке (успехи остаются). В одиночку вал медленнее.
  ground(-7,7,46,90,1,bank);ground(-7,7,38,46,-2.6,M(0x5a5040));ground(-7,7,8,38,1,bank);
  wall(-7.4,-7,8,90);wall(7,7.4,8,90);wall(-7.4,7.4,90,90.4);wall(-16.2,-7,8,8.2);wall(7,16.2,8,8.2);
  for(let z=12;z<90;z+=rand(2.6,4.2))for(const sd of[-1,1])decorFir(sd*rand(8.6,13),z,rand(1.1,1.8),true,1);
  for(let i=0;i<22;i++){const sd=Math.random()<0.5?-1:1;addMesh(new THREE.ConeGeometry(0.05,rand(0.8,1.4),3),M(0x6a8a3a),sd*rand(5.6,6.9),1.5,rand(39,45)).castShadow=false;}   // камыш у ручья
  const STR=waterZone(-7,7,38,46,-2.6,0.9,{start:'low',floor:-2.6,shell:{x:-6.2,z:46.7,y:1},curb:false});
  // дуб поперёк тропы
  const oak=new THREE.Group();oak.position.set(0,1,58);W.group.add(oak);{const om=M(0x6a4a2a),lm=M(0x4f7a3a);const tr=addMesh(new THREE.CylinderGeometry(0.85,0.95,14,10),om,0,0.9,0,oak);tr.rotation.z=Math.PI/2;
    for(let i=0;i<6;i++){const b=addMesh(new THREE.CylinderGeometry(0.12,0.2,2.2,6),om,rand(-6,6),1.6+rand(0,0.8),rand(-0.6,0.6),oak);b.rotation.set(rand(-0.8,0.8),0,rand(-0.8,0.8));}
    for(let i=0;i<6;i++)addMesh(new THREE.SphereGeometry(rand(0.7,1.1),7,6),lm,rand(-6,6),2.4+rand(0,0.6),rand(-0.8,0.8),oak);}
  const oakCol=colBox(-7,7,1,3.8,57.1,58.9,true);
  W.lifts.push({pos:new V3(0,1,59.7),active:()=>!F.oak,onLift:h=>{F.oak=true;oakCol.on=false;SFX.toss();shakeAll(0.05,0.4);anim(1.4,k=>{oak.position.x=-k*10;oak.rotation.z=k*0.5;oak.position.y=1-k*0.8;});
    bark(h,'potap','Эх, дубинушка, ухнем!',1.8,true);}});
  // скалы и проход; гребешок Василисы за ним
  box(-7,-1.6,1,4.6,28,32,rock);box(1.6,7,1,4.6,28,32,rock);
  const comb=new THREE.Group();comb.position.set(0,1.05,26.2);W.group.add(comb);{const cm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.5});addMesh(new THREE.BoxGeometry(0.9,0.12,0.22),cm,0,0.06,0,comb);
    for(let i=0;i<9;i++)addMesh(new THREE.BoxGeometry(0.05,0.05,0.34),cm,-0.4+i*0.1,0.06,0.26,comb);}
  const reeds=new THREE.Group();reeds.position.set(0,1,30);reeds.visible=false;W.group.add(reeds);{const rm=M(0x6a9a3a);for(let i=0;i<34;i++){const c=addMesh(new THREE.ConeGeometry(0.08,rand(2.2,3.4),4),rm,rand(-1.5,1.5),1.4,rand(-0.9,0.9),reeds);c.rotation.z=rand(-0.15,0.15);}}
  const reedCol=colBox(-1.6,1.6,1,3.4,29,31,true);reedCol.on=false;
  W.waterTargets.push({pos:new V3(0,1,26.2),pri:1,active:()=>!F.reeds&&WV.on,onWater:()=>{F.reeds=true;F.reedT=7;reedCol.on=true;reeds.visible=true;reeds.scale.set(1,0.05,1);anim(0.9,k=>{reeds.scale.y=Math.max(0.05,k);});comb.visible=false;
    SFX.grow();burst(new V3(0,2,30),0x9affb0,20,4);banner('Гребешок — и камыш стеной!','#9affb0',2,'как у Василисы Премудрой: вал в камыше завязнет');bark(HERO.yosha,'yosha','Гребешок за спину — лес стеной!',1.8,true);}});
  // плетень у омута: две верёвки — разом
  {const wm=M(0x8a6a40);box(-7,-2,1,4.2,15.6,16.4,wm);box(2,7,1,4.2,15.6,16.4,wm);for(let x=-6.8;x<7;x+=0.5)if(Math.abs(x)>2.1)addMesh(new THREE.CylinderGeometry(0.08,0.09,3.6,5),wm,x,2.8,16.5).castShadow=false;}
  const gateG=[-1,1].map(sd=>{const g=new THREE.Group();g.position.set(sd*2,1,16);W.group.add(g);addMesh(new THREE.BoxGeometry(2,3,0.3),M(0x9a7a4a),-sd*1,1.5,0,g);return g;});
  const gateCol=colBox(-2,2,1,4.2,15.7,16.3,true);
  const RP=[-99,-99],ropes=[-1,1].map((sd,i)=>{const g=new THREE.Group();g.position.set(sd*5.2,1,17.1);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.05,0.05,2.6,5),M(0xd8c090),0,2.2,0,g);
    const b=addMesh(new THREE.ConeGeometry(0.22,0.36,10),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),0,0.9,0,g);return {g,b,sd};});
  ropes.forEach((R,i)=>W.hittables.push({pos:new V3(R.sd*5.2,2,17.1),r:1.1,push:false,alive:()=>!F.gate,onHit:h=>{RP[i]=G.time;if(G.solo)RP[1-i]=G.time;SFX.latch();anim(0.4,k=>{R.g.position.y=1-Math.sin(k*Math.PI)*0.4;});
    if(Math.abs(RP[0]-RP[1])<0.8){F.gate=true;gateCol.on=false;SFX.gate();gateG.forEach((g,j)=>anim(1,k=>{g.rotation.y=(j?-1:1)*k*1.6;}));banner('Плетень открыт!','#ffffff',1.6,'к омуту!');}
    else floatText(new V3(R.sd*5.2,3.6,17.1),'Разом! Вместе дёргайте!','#ffd9a0');}}));
  // вал: стена воды гонится по тропе; за ней — разлив
  const WV={z:98,on:false,hold:0,ck:82,sp:()=>G.solo?2.2:2.8,snd:0};
  const wave=new THREE.Group();W.group.add(wave);{const wm=M(0x4aa0b8,{transparent:true,opacity:0.78,emissive:0x0a4a5a,emissiveIntensity:0.4,depthWrite:false});const wb=addMesh(new THREE.BoxGeometry(14.4,4.6,2.6),wm,0,3.3,0.4,wave);wb.castShadow=false;wb.renderOrder=5;
    const fm=M(0xeafcff,{emissive:0x9ae0f0,emissiveIntensity:0.5});const crest=addMesh(new THREE.CylinderGeometry(0.7,0.7,14.4,10),fm,0,5.6,-0.6,wave);crest.rotation.z=Math.PI/2;crest.castShadow=false;
    const fl=new THREE.Mesh(new THREE.PlaneGeometry(14.4,90),M(0x3a8aa0,{transparent:true,opacity:0.6,depthWrite:false}));fl.rotation.x=-Math.PI/2;fl.position.set(0,1.5,46);fl.renderOrder=4;wave.add(fl);}
  wave.visible=false;
  const CKS=[82,56.4,36.4,25.4,13];
  function waveCaught(){SFX.splash();SFX.wave();shakeAll(0.07,0.6);banner('Вал догнал!','#cff8ff',1.8,'назад, к последней отметке — и бегом!');
    WV.z=WV.ck+13;WV.hold=1.6;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,WV.ck-0.6*(i%2),1);h.following=!h.active||(G.solo&&h.player!==G.soloPi);});snapCams();G.stats.falls=(G.stats.falls||0)+1;
    if(F.reeds&&!F.reedsDown&&WV.ck>31){F.reeds=false;reedCol.on=false;reeds.visible=false;comb.visible=true;}}   // камыш вырос раньше, чем все прошли — гребешок снова
  function chaseScene(){
    play({dur:8.6,fov:50,shots:[shot(0,[0,4.2,72],[0,3.6,92]),shot(4.2,[5.4,3,74],[0,1.8,82])],
      says:[[0.3,3.2,null,'<i>Река за спиной вздыбилась — встала валом до самых крон.</i>',true],[3.6,2.4,'vod','Кто звенел? Кто будил? Догоню-у-у!'],[6.2,2.2,'zven','Бежим! К омуту, скорее!']],
      events:[{t:0.4,fn:()=>{wave.visible=true;WV.z=104;anim(3.4,k=>{WV.z=104-k*8;wave.position.z=WV.z;});SFX.wave();tone(60,2.2,'sawtooth',0.16,40);shakeAll(0.05,1.4);}}],
      end:()=>{WV.on=true;WV.z=96;WV.hold=0.6;W.camYaw=Math.PI;snapCams();banner('Погоня!','#cff8ff',2.4,'вал за спиной — бегите вниз, к нам!');
        for(const pi of[0,1])tip(pi,'Вал гонится! Дуб поперёк — Потап поднимет '+K(0,'skill')+'; ручей — прилив гуслями '+K(pi,'item')+', и вплавь;<br>за скалами — гребешок: Йоша польёт его '+K(1,'skill')+', когда все прошли.',4.6);}});}
  W.updates.push(dt=>{
    if(!WV.on||G.cine||F.chaseDone)return;
    const ctl=G.solo?[G.soloPi]:[0,1];   // в одиночку — только тот, кем играешь (остальные догонят по «Ко мне!» или у омута)
    for(const c of CKS)if(c<WV.ck&&ctl.every(pi=>active(pi).pos.z<c))WV.ck=c;
    if(WV.hold>0)WV.hold-=dt;
    else if(F.reeds&&!F.reedsDown&&WV.z<=31.6){WV.z=31.6;F.reedT-=dt;reeds.rotation.x=Math.sin(G.time*9)*0.03;if(F.reedT<=0){F.reedsDown=true;reedCol.on=false;SFX.crash();anim(0.8,k=>{reeds.scale.y=Math.max(0.15,1-k);});floatText(new V3(0,4,30),'Прорвал камыш!','#cff8ff');}}
    else WV.z-=WV.sp()*dt;
    WV.z=Math.max(WV.z,9);wave.position.z=WV.z;wave.children[0].scale.y=1+Math.sin(G.time*3)*0.04;
    WV.snd-=dt;if(WV.snd<=0){WV.snd=2.2;SFX.wave();}
    if(Math.random()<dt*10)burst(new V3(rand(-6.5,6.5),5.8,WV.z-0.4),0xeafcff,2,2.4);
    const near=Math.min(...ctl.map(pi=>active(pi).pos.z>WV.z-14?WV.z-active(pi).pos.z:99));if(near<5&&Math.random()<dt*3)shakeAll(0.02,0.2);
    for(const pi of ctl){const h=active(pi);if(h.pos.z>WV.z-0.6){waveCaught();break;}}
    if(F.gate&&ctl.every(pi=>active(pi).pos.z<10.4)){F.chaseDone=true;WV.on=false;W.camYaw=0;SFX.crash();anim(1.6,k=>{wave.position.y=-k*5;wave.position.z=WV.z-k*12;});later(1.7,()=>{wave.visible=false;});later(1.2,intro);}});
  /* ---------- сюжет ---------- */
  function intro(){bb.style.display='block';HEROES.forEach((h,i)=>{placeOnGround(h,-4.5+i*3,4,1);h.face=Math.PI;});ko.g.visible=true;
    play({dur:15,fov:48,camK:2.6,shots:[shot(0,[6,6,10],[-8,5,-26]),shot(4.4,[-11,8.6,-24],[-15,11.4,-31],[-12,9.4,-25.6],[-15,11.6,-31],3),shot(9.2,[4,2.2,-6],[0.8,0,-14.6])],
      says:[[0.3,4,null,'<i>Омут. На высокой скале — фигура чёрная, тонкая,</i><br><i>Смотрит сверху; на руке перстень блестит звонкий.</i>',true],[4.6,3.6,null,'<i>Подошли герои ближе — а на скале уж никого.</i>',true],
        [9.3,3.2,null,'<i>На коряге Водяной сидит — толстый, в тине,</i><br><i>Хохочет пузырями на трясине.</i>',true],[12.4,2.4,'vod','Буль-буль-буль! Кто там звенел, кто спать мешал?']],
      events:[{t:1.6,fn:()=>{glint.visible=true;const p=new V3();ko.hand.getWorldPosition(p);glint.position.copy(p);anim(0.8,k=>{glint.scale.setScalar(1+Math.sin(k*Math.PI)*3);});later(0.9,()=>{glint.visible=false;});tone(3200,0.3,'sine',0.12);}},
        {t:7.6,fn:()=>{anim(0.8,k=>{ko.g.scale.setScalar(0.9*(1-k)+0.001);});later(0.85,()=>{ko.g.visible=false;ko.g.scale.setScalar(0.9);});SFX.keys();}},
        {t:9.2,fn:()=>{spawnVod();vod.state='idle';vod.g.position.set(0.8,-1.2,-14.6);}},{t:12.4,fn:()=>{for(let i=0;i<10;i++)later(i*0.12,()=>burst(vod.pos.clone().add(new V3(rand(-1,1),3.6,1)),0xcff8ff,3,2));for(let i=0;i<5;i++)tone(rand(160,260),0.14,'sine',0.2,rand(90,140),i*0.12);}}],
      end:()=>{if(!vod)spawnVod();vod.g.position.set(C.x,-2,C.z);F.phase=1;snag.visible=false;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-5.2,-2);h.face=Math.PI;});W.clampR={x:C.x,z:C.z,r:R-0.7};snapCams();
        start1();}});}
  function ending(){const e=vod;
    play({dur:20,fov:48,camK:2.4,shots:[shot(0,[5,2.6,-5],[0,1.2,-14]),shot(6.8,[0,12,6],[0,0,-16]),shot(12.4,[3.6,1.6,-6.4],[T.yosha.pos.x,0.6,T.yosha.pos.z]),shot(15.6,[-10,9,-22],[-15,11.2,-31])],
      says:[[0.3,3,null,'<i>Водяной звено выплёвывает…</i>',true],[3.4,3.2,null,'<i>…и опять омут закрутить собирается. Но сверху колокола Китежа звенят —</i><br><i>Медленно, как колыбельная, звенят-звенят.</i>',true],
        [8,3.4,null,'<i>Водяной зевает, на дно опускается —</i><br><i>Засыпает, пузырями пускается.</i>',true],[12.4,2.6,'yosha','<i>(шёпотом)</i> Тише. Пусть спит, не будите.'],[15.6,3.6,null,'<i>На скале перстень блеснул — и тонкая тень ушла.</i>',true]],
      events:[{t:0.6,fn:()=>{const L=linkItem(e.pos.x,3,e.pos.z);const to=T.proshka.pos.clone();anim(1.2,k=>{L.base=3+Math.sin(k*Math.PI)*3;L.pos.x=lerp(e.pos.x,to.x,k);L.pos.z=lerp(e.pos.z,to.z,k);});later(1.3,()=>takeItem(L,T.proshka));}},
        {t:3.4,fn:()=>{for(let i=0;i<8;i++)later(i*0.9,()=>{tone(523*[1,0.84,0.75,0.84][i%4],1.6,'sine',0.22);tone(262,1.8,'sine',0.1);});lullaby(LUL1,0.55,0.4,0.12);}},
        {t:8,fn:()=>{anim(3,k=>{e.g.position.y=-2-k*0.6;e.body.rotation.x=-0.6*k;});for(let i=0;i<14;i++)later(1+i*0.5,()=>{burst(e.pos.clone().add(new V3(0,2.6,1)),0xcff8ff,3,1.5);if(i%4===0)floatText(e.pos.clone().add(new V3(0,3.4,0)),'З-з-з…','#cfe8ff');});}},
        {t:15.4,fn:()=>{ko.g.visible=true;ko.g.rotation.y=Math.PI*0.8;glint.visible=true;const p=new V3();ko.hand.getWorldPosition(p);glint.position.copy(p);anim(0.8,k=>{glint.scale.setScalar(1+Math.sin(k*Math.PI)*3);});SFX.keys();
          later(2.6,()=>{anim(0.8,k=>{ko.g.scale.setScalar(0.9*(1-k)+0.001);});glint.visible=false;});}}],
      end:()=>{F.out=true;banner('Водяной спит','#ffd76a',2.4,'колокола Китежа буйную воду убаюкали');later(2.2,finishLevel);}});}
  W.updates.push(dt=>{setBar();if(!vod||G.cine)return;const e=vod;
    vod.g.scale.setScalar(BS.grow);for(const S of SP.concat(BELL)){S.ref.hum=Math.max(0,S.ref.hum-dt);if(S.g.visible){S.gm.emissiveIntensity=S.ref.hum>0?0.6+0.4*Math.sin(G.time*10):0.25;S.ico.rotation.z=S.ref.hum>0?Math.sin(G.time*9)*0.4:0;}}
    /* ---------- этап 1: Водяные кони ---------- */
    if(F.phase===1){
      if(BS.ride){const D=BS.dash;
        if(D){D.t+=dt;if(D.t>D.warn){const k=Math.min(1,(D.t-D.warn)/D.go);e.pos.x=lerp(D.a.x,D.b.x,k);e.pos.z=lerp(D.a.z,D.b.z,k);
            if(Math.random()<dt*20)burst(new V3(e.pos.x,surf()+0.5,e.pos.z),0xe8fbff,3,3,0.5);
            for(const h of live()){if(D.hit.has(h))continue;if(Math.hypot(h.pos.x-e.pos.x,h.pos.z-e.pos.z)<1.7){D.hit.add(h);if(damageHero(h,{kind:'hazard',ref:e}))floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Окатило!','#9fe6ff');}}
            if(k>=1){BS.dash=null;BS.ang=Math.atan2(D.b.z-C.z,D.b.x-C.x);ripple(e.pos.x,e.pos.z,5,1);BS.dashT=SOLO()?11:8;}}}
        else{BS.ang+=dt*(SOLO()?0.45:0.58);const p=at(BS.ang,PR);e.pos.x=p.x;e.pos.z=p.z;
          BS.throwT-=dt;if(BS.throwT<=0){BS.throwT=SOLO()?3.4:2.4;const h=pick();spawnBolt(e,h);floatText(e.pos.clone().add(new V3(0,3.6,0)),'Лови!','#9fe6ff');}
          BS.dashT-=dt;if(BS.dashT<=0){const a=e.pos.clone(),b=at(BS.ang+Math.PI,PR);BS.dash={a,b,t:0,warn:1.3,go:1.0,hit:new Set()};
            const mid=a.clone().add(b).multiplyScalar(0.5),len=a.distanceTo(b);const s=new THREE.Mesh(new THREE.PlaneGeometry(2.6,len),MB(0xff5a4a,{transparent:true,opacity:0.35,depthWrite:false}));
            s.rotation.x=-Math.PI/2;s.rotation.z=-Math.atan2(b.x-a.x,b.z-a.z);s.position.set(mid.x,surf()+0.06,mid.z);s.userData.noBatch=true;W.group.add(s);
            anim(2.3,k=>{s.material.opacity=0.2+0.3*Math.abs(Math.sin(k*14));if(k>=1)W.group.remove(s);});bark({g:e.g},'vod','Поберегись!',1.2);
            if(!F.dashTold){F.dashTold=true;for(const p of[0,1])tip(p,'Красная дорожка — Водяной сейчас промчится! Уйди в сторону или кувырок '+K(p,'roll')+'.',3);}}}
        e.pos.y=damp(e.pos.y,-1.4+Math.sin(G.time*4)*0.15,6,dt);e.face=BS.dash?Math.atan2(BS.dash.b.x-BS.dash.a.x,BS.dash.b.z-BS.dash.a.z):BS.ang+Math.PI;
        crest.position.set(e.pos.x,surf(),e.pos.z);crest.rotation.y=e.face;crest.scale.y=1+0.12*Math.sin(G.time*6);
        if(Math.random()<dt*6)burst(new V3(e.pos.x+rand(-1.5,1.5),surf()+0.6,e.pos.z+rand(-1.5,1.5)),0xf4fdff,2,2,0.5);
        BS.minT-=dt;if(BS.minT<=0){BS.minT=SOLO()?12:8;addMinion(Math.random()<0.5?'rak':'shchuka',BS.ang);if(!SOLO())addMinion('rak');}}
      else if(!(e.dazeT>0)&&e.state!=='broken')remount();}
    /* ---------- этап 2: Воронка ---------- */
    else if(F.phase===2){const st=BS.stall>0;swirlFx.visible=true;swirlFx.position.y=surf()+0.05;swirlFx.rotation.z+=dt*(st?0.3:2.2);swirlFx.material.opacity=st?0.12:0.35;
      if(!st){e.pos.set(C.x,damp(e.pos.y,zone.level-1.3,3,dt),C.z);e.face+=dt*2;
        // воронка: пловцов тянет к середине (кто держит напев — стоит)
        for(const h of HEROES){if(h.cling||h.kwHold||(h.active&&players[h.player].downed))continue;if(h.pos.y<zone.level-1.4)continue;const dx=C.x-h.pos.x,dz=C.z-h.pos.z,d=Math.hypot(dx,dz)||1;if(d<2.4)continue;
          const k=(SOLO()?0.9:1.2)*dt;h.pos.x+=(dx/d*0.45+dz/d)*k;h.pos.z+=(dz/d*0.45-dx/d)*k;}
        // гейзеры: красный круг под героем — через 1,3 с столб
        BS.geyT-=dt;if(BS.geyT<=0){BS.geyT=SOLO()?3:2.1;const h=pick(),p=new V3(h.pos.x,0,h.pos.z);warnDisc(p.x,p.z,1.5,1.3);later(1.3,()=>{if(F.phase!==2||G.cine)return;column(p.x,p.z,4.5,1.2,1.1);ripple(p.x,p.z,3,0.8);SFX.splash();hurtAt(p,1.5,'Гейзер!');});
          if(!F.geyTold){F.geyTold=true;for(const q of[0,1])tip(q,'Красный круг под тобой — сейчас ударит гейзер! Отплыви в сторону.',2.6);}}
        if((humming(SP[0])&&humming(SP[2]))||(humming(SP[1])&&humming(SP[3])))stall();
        else if(SP.some(humming)){BS.lonT-=dt;if(BS.lonT<=0){BS.lonT=3.5;const i=SP.findIndex(humming),j=(i+2)%4;floatText(new V3(SP[j].x,2.4,SP[j].z),'И этот родник — разом!','#9fe6ff');}}}
      else{BS.stall-=dt;e.pos.y=damp(e.pos.y,-2,4,dt);if(BS.stall<=0&&e.state!=='broken'){setWater(zone,'high');for(const S of SP)S.ref.hum=0;e.dazeT=0;banner('Воронка снова!','#9fe6ff',1.8,'родники — опять встречным течением');bark({g:e.g},'vod','Ха! Кружу-верчу!',1.6);}}}
    /* ---------- этап 3: Великий вал ---------- */
    else if(F.phase===3&&!F.won){
      if(!BS.stun){e.pos.set(C.x,-1.6,C.z-8.5);e.face=0;
        const V=BS.wave;if(!V){BS.waveT-=dt;if(BS.waveT<1.6&&!BS.waveWarn){BS.waveWarn=true;bark({g:e.g},'vod','Ва-а-ал!',1.4);tone(70,1.4,'sine',0.25,45);shakeAll(0.03,1.4);
              if(!F.valTold){F.valTold=true;for(const p of[0,1])tip(p,'Вал идёт! Спрячься за валун — с южной стороны. У колокола Китежа вал тоже расступается.',3);}}
            if(BS.waveT<=0){BS.waveWarn=false;BS.wave={z:C.z-10,hit:new Set()};valG.visible=true;SFX.wave();}}
          else{V.z+=dt*(SOLO()?6:7.5);valG.position.set(C.x,-2,V.z);if(Math.random()<dt*14)burst(new V3(rand(-10,10),2,V.z),0xf4fdff,3,3,0.5);
            for(const h of live()){if(V.hit.has(h)||Math.abs(h.pos.z-V.z)>0.8)continue;V.hit.add(h);const safe=ROCKS.some(r=>Math.abs(h.pos.x-r.x)<1.5&&h.pos.z>r.z&&h.pos.z-r.z<3.2);
              const bell=BELL.some(S=>Math.hypot(h.pos.x-S.x,h.pos.z-S.z)<2);   // у колокола Китежа вал расступается
              if(safe||bell){floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),bell?'Колокол укрыл!':'Укрылся!','#cfe8ff');continue;}
              if(damageHero(h,{kind:'hazard',ref:{pos:new V3(h.pos.x,0,V.z-2)}})){h.vel.z=9;h.vel.y=4;floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Смыло!','#9fe6ff');}}
            if(V.z>C.z+11){BS.wave=null;valG.visible=false;BS.waveT=SOLO()?13:10;if(Math.random()<0.7)addMinion('shchuka');}}
        if(BELL.every(humming))bellStun();
        else if(BELL.some(humming)){BS.lonT-=dt;if(BS.lonT<=0){BS.lonT=3.5;floatText(new V3(0,3,C.z),'Звонят '+BELL.filter(humming).length+' из 3 — нужно все три разом!','#ffd76a');}}}
      else{if(!(e.dazeT>0)&&e.state!=='broken')regrow();}}
    else{swirlFx.visible=false;}
    if(wallW.visible&&Math.random()<dt*18)burst(new V3(rand(-11,11),wallW.position.y+wallW.scale.y/2,wallW.position.z+rand(-0.6,0.6)),[0xf4fdff,0xcff4ff][Math.floor(rand(0,2))],3,2.4,0.6);   // пена по гребню стены
    if(F.phase!==2)swirlFx.visible=false;});
  const swirlFx=new THREE.Mesh(new THREE.RingGeometry(1.5,10,40,1,0,Math.PI*1.6),MB(0xcff8ff,{transparent:true,opacity:0.3,side:THREE.DoubleSide,depthWrite:false}));swirlFx.rotation.x=-Math.PI/2;swirlFx.position.set(C.x,0.9,C.z);swirlFx.visible=false;W.group.add(swirlFx);
  /* ---------- рисунки кнопок и задачи ---------- */
  const myShell=h=>{const S=FIN.kwShellAt(h);return S&&(SP.includes(S)||BELL.includes(S))?S:null;};
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>{const S=myShell(h());return !!S&&!S.ref.off&&S.ref.hum<1;},'сыграй!');
    prompt(pi,'swap',()=>headOf(h()),()=>{const L=h().kwLast;return !!L&&G.time-L.t<3.5&&(SP.some(S=>S.ref===L.ref)||BELL.some(S=>S.ref===L.ref))&&Math.hypot(h().pos.x-L.x,h().pos.z-L.z)<1.2;},'оставь — держит напев');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help)||W.bolts.some(b=>b.tgt===h()&&!b.refl&&b.eta<0.8),'отбей!');
    prompt(pi,'roll',()=>headOf(h()),()=>(W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help))||(BS.dash&&BS.dash.t<BS.dash.warn));
    prompt(pi,'attack',()=>headOf(h()),()=>vod&&(vod.state==='broken'||vod.dazeT>0)&&hd(vod.pos,h().pos)<5,'бей!');}
  const ph1=pi=>O(()=>BS.ride?'Этап 1 · Водяные кони. Водяной скачет на волне — не достать. Водяной шар <i class="sg b"></i> — щит '+K(pi,'guard')+' в последний миг: шар — в него! '+BS.hits+' / 3.<br>Красная дорожка — рывок: в сторону или кувырок '+K(pi,'roll')+'. Раки и щуки — бей.'
      :'Свалился с волны — оглушён! Бей '+K(pi,'attack')+', пока не очухался!',()=>F.phase>1,()=>vod?[vod.g]:[]);
  const ph2=pi=>O(()=>BS.stall>0?'Воронка встала — Водяной закружился! Бей '+K(pi,'attack')+'! Тягуны тянут — кувырок '+K(pi,'roll')+'.'
      :'Этап 2 · Воронка тянет к середине. Родники по краю: два противоположных — сыграйте '+K(pi,'item')+' разом!<br>Сыграл — смени героя '+K(pi,'swap')+': оставленный держит напев. Красный круг — гейзер, отплыви!',()=>F.phase>2,()=>BS.stall>0?[vod.g]:SP.filter(S=>!humming(S)).map(S=>S.g));
  const ph3=pi=>O(()=>BS.stun?'Звон Китежа! Водяной съёжился — бей '+K(pi,'attack')+'! Оглушён — Богатырский мах: оба разом!'
      :'Этап 3 · Великий вал. Вал идёт — за валун! Колокола Китежа по краю: все три — разом '+K(pi,'item')+' ('+BELL.filter(humming).length+' / 3).<br>Сыграл — смени героя '+K(pi,'swap')+': оставленный держит звон.',()=>!!F.won,()=>BS.stun?[vod.g]:BELL.filter(S=>!humming(S)).map(S=>S.g));
  const oc1=pi=>O(pi?()=>'Вал по пятам! Дуб поперёк тропы — Потап его поднимет. Беги следом!':()=>'Вал по пятам! Дуб поперёк тропы — Потап его поднимет '+K(0,'skill')+' (смени героя '+K(0,'swap')+').',()=>!!F.oak,()=>[oak]);
  const oc2=pi=>O(()=>'Ручей: в отлив из него не выбраться. Прилив гуслями '+K(pi,'item')+' у ракушки — и вплавь!',()=>active(pi).pos.z<37.6&&active(pi).pos.y>0.6,()=>[STR.shell.g]);
  const oc3=pi=>O(pi?()=>'За скалами — гребешок Василисы. Все прошли — Йоша, полей его живой водой '+K(1,'skill')+': камыш встанет стеной!':()=>'За скалами — гребешок Василисы: Йоша польёт — и камыш встанет стеной. Проходи скорей!',()=>!!F.reeds||active(pi).pos.z<20,()=>F.reeds?[]:[comb]);
  const oc4=pi=>O(()=>'Плетень на запоре: две верёвки — дёрните разом '+K(pi,'attack')+'!',()=>!!F.gate,()=>ropes.map(R=>R.g));
  for(const pi of[0,1])W.objectives[pi]=[oc1(pi),oc2(pi),oc3(pi),oc4(pi),O('К омуту!',()=>!!F.chaseDone,()=>[]),O('Омут…',()=>F.phase>=1,()=>[]),ph1(pi),ph2(pi),ph3(pi),O('Колокола Китежа…',()=>false,()=>[])];
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.oak&&T.potap.active&&hd(T.potap.pos,{x:0,z:59.7})<2.3,'ухнем!');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'item',()=>headOf(h()),()=>WV.on&&inZone(STR,h(),1.2)&&STR.state==='low','прилив');prompt(pi,'attack',()=>headOf(h()),()=>!F.gate&&ropes.some(R=>hd(h().pos,{x:R.sd*5.2,z:17.1})<1.8),'разом!');}
  prompt(1,'skill',()=>headOf(T.yosha),()=>!F.reeds&&WV.on&&T.yosha.active&&hd(T.yosha.pos,{x:0,z:26.2})<3,'гребешок!');
  W.tipZones.push({cond:(pi,h)=>WV.on&&h.pos.z>37.6&&h.pos.z<46.2&&h.pos.y<0.4,text:pi=>'Из ручья в отлив не выбраться. Прилив '+K(pi,'item')+' — и вверх!'});
  W.spawns=[[new V3(-1.5,1,80),new V3(-3,1,82)],[new V3(1.5,1,80),new V3(3,1,82)]];W.startAct=[0,0];
  W.pauseLine='Погоня: вал по пятам — дуб поднять, ручей переплыть, гребешок за спину, плетень дёрнуть разом.<br>Водяной, три этапа. Водяные кони: шары отбивай щитом в последний миг — три попадания, и свалится с волны; красная дорожка — рывок.<br>Воронка: два противоположных родника — разом, оставленный держит напев; красный круг — гейзер. Великий вал: прячься за валун; три колокола Китежа — разом; добить — вдвоём.';
  W.onStart=()=>{later(0.4,chaseScene);};
  W.dbg2b=()=>({F,WV,STR,oakCol,reedCol,gateCol,ropes,RP,vod,CKS,wave,zone,BS,SP,BELL,ROCKS,scene2,scene3,valG});
  W.warp2b=(where)=>{if(where==='boss'){F.oak=F.reeds=F.reedsDown=F.gate=true;oakCol.on=reedCol.on=gateCol.on=false;F.chaseDone=true;WV.on=false;wave.visible=false;W.camYaw=0;intro();}
    else{const z={oak:62,stream:52,pass:34,gate:22}[where];F.oak=true;oakCol.on=false;oak.visible=false;if(z<40)setWater(STR,'high');if(where==='gate'){F.reeds=F.reedsDown=true;}WV.ck=z;WV.z=z+14;WV.on=true;wave.visible=true;W.camYaw=Math.PI;
      HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,z,1);h.following=false;});snapCams();}return W.dbg2b();};
  flushDecor();}
