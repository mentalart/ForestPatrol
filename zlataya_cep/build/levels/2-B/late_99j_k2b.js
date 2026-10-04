/* ============================== РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ» — ПОГОНЯ С ВАЛОМ И БОЙ В ЧЕТЫРЕ ЭТАПА (docs/23_vodyanoy_boss.md) ============================== */
// Погоня (≈190 м) — late_99s_k2b_chase.js; облик Водяного, сома и коней — late_99q_k2b_vod.js; вода, брызги, телеграфы, вал — late_99r_k2b_fx.js.
// Водяной — не злодей, а «буйная вода»: колокол Китежа замолчал, его разбудили. Дедушка с лягушачьим лицом, бородой до пояса и короной
// из кувшинок; ездит на соме. Омут всегда полон, уровень воды — механика этапов; на мелях по краю можно стоять.
//  1 «Сом-перевозчик»: сом кружит с Водяным на спине, бросается на мель по красной дорожке (сом прижался, хвост бьёт, бульк нарастает)
//    и бьётся на ней — окно. Прошка сбивает ус рогаткой (сом мотает головой), Потап хватает ус и тянет «раз-два-три» — сом на мели,
//    Водяной кувырком в воду и застревает: бейте. Шары Водяного — синий круг под героем: щит в последний миг — шар летит в него.
//  2 «Водяные кони»: табун из волн скачет кругами вокруг острова; свист Водяного (щёки, руки вверх) — кони меняют ряд. Раковина на мели:
//    сыграл — ближний конь замер у мели; садится ДРУГОЙ (в одиночку: сыграл, сменил героя — оставленный держит напев) — конь несёт на остров:
//    удар по короне — облетают кувшинки (окно 5 с), потом свист — и волной смывает назад.
//  3 «Омут-зеркало»: воронка, три отражения — бьют все, настоящий один. Совиный взор Пелагеи показывает настоящего, Прошка метит его
//    рогаткой — метка горит 6 с, по метке бьют все. Плавать к середине не даёт воронка — Йоша поливает бутон: кувшинка-плот на двоих,
//    воронка сама несёт его к отражениям. Гейзеры читаются: пузыри, купол воды, нарастающий гул — потом столб.
//  4 «Великий вал»: Водяной втрое выше, за ним стена воды; омут уходит к валу — на дне камни Китежа и три колокола. Ритм: вал идёт
//    тремя волнами — средний колокол отбивает «раз-два-три», на «бом» каждый бьёт свой колокол (в одиночку оставленный у второго звонит сам).
//    Три верных удара — вал расступается, луч солнца; Водяной на дне хлопает губами, как рыба, — общий удар двоих с замедлением.
// Сквозное: шкала запала (отбивы шаров) — полная: оглушение; за окно не больше 3–4 ударов («очухался»); проиграл этап — с начала этапа;
// реплики-реакции и эмоции (злость → обида → усталость → сон); музыка по этапам; всплывающих надписей — только ключевые.
{const _ft=floatText;FIN.k2ft=_ft;floatText=function(pos,text,color){if(W&&W.k2quiet&&W.k2quiet(String(text)))return;return _ft.apply(this,arguments);};}
const K2_DOME_G=new FIN.orig.Sphere(1.2,12,8,0,Math.PI*2,0,Math.PI/2);   // купол гейзера — одна геометрия на все
build2B=function(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('whirl');sky('day');W.name='2-Б · «Водяной»';W.sub='Босс мира 2 · погоня с валом и омут · сом, кони, зеркало, великий вал';W.camX=16;const F=W.flags;F.phase=0;F.fin=[-9,-9];
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-8;W.waterCol=0x3a8aa0;W.waterOp=0.46;
  const C={x:0,z:-14},R=11,T=HERO,bank=M(0x7a8a6a),rock=M(0x6a6a64),V=FIN.k2v,FX=FIN.k2fx,SOLO=()=>!!G.solo,ft=FIN.k2ft;
  ground(-16,16,-3,8,1,bank);ground(-16,16,-32,-25,1,bank);ground(-16,-11,-25,-3,1,bank);ground(11,16,-25,-3,1,bank);ground(-11,11,-25,-3,-2,M(0x6a7a58));
  wall(-16.2,-16,-32,8);wall(16,16.2,-32,8);wall(-16.2,16.2,-32.2,-32);
  {const rw=new THREE.Mesh(new THREE.CylinderGeometry(R,R,3.2,48,1,true),M(0x5a6a5a,{side:THREE.BackSide}));rw.position.set(C.x,-0.5,C.z);W.group.add(rw);
    const rg=new THREE.Mesh(new THREE.RingGeometry(R,17,48),M(0x7a8a6a,{side:THREE.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.set(C.x,1.01,C.z);rg.receiveShadow=true;W.group.add(rg);}
  for(let i=0;i<36;i++){const a=i/36*Math.PI*2;decorFir(C.x+Math.cos(a)*rand(19,26),C.z+Math.sin(a)*rand(19,26),rand(1.2,2),true,1);}
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(500,500),M(0x2f6a80));sea.rotation.x=-Math.PI/2;sea.position.y=-3;W.group.add(sea);
  addMesh(new THREE.CylinderGeometry(1.6,3.4,10,8),rock,-15,5,-31);const ko=makeKoschei();ko.g.position.set(-15,10,-31);ko.g.rotation.y=0.5;ko.g.scale.setScalar(0.9);ko.g.visible=false;
  const glint=new THREE.Mesh(new THREE.SphereGeometry(0.12,8,6),MB(0xffffff));glint.visible=false;W.group.add(glint);
  const snag=addMesh(new THREE.CylinderGeometry(0.5,0.7,4,8),M(0x5a4028),0.8,-0.4,-14.6);snag.rotation.z=1.2;
  // омут всегда полон: гладь — свой шейдер (late_99r), механика — участок воды
  const zone=waterZone(-11,11,-25,-3,-2,0.8,{floor:-2,shell:false,curb:false,start:'high'});zone.noGusli=true;
  const OM=FX.omut(C,R,zone);
  // камни Китежа на дне (видны сквозь воду, а на этапе 4 — открываются)
  {const st=M(0xb8b0a0),st2=M(0x8a8478),gd=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3});
    for(const[x,z,ry]of[[-7.5,-13,0.3],[7.2,-15,-0.4],[-3.5,-21,0.9],[4,-6.5,0.2],[-4.8,-6.8,-0.6],[3.4,-21.5,-0.8]]){const g=new THREE.Group();g.position.set(x,-2,z);g.rotation.y=ry;W.group.add(g);
      addMesh(new THREE.BoxGeometry(1.6,0.6,1.1),st,0,0.3,0,g);addMesh(new THREE.CylinderGeometry(0.28,0.32,rand(1.2,2.2),8),st2,0.5,0.9,0,g).rotation.z=rand(-0.5,0.5);}
    const dome=new THREE.Group();dome.position.set(1.5,-2,-23.5);W.group.add(dome);addMesh(new THREE.CylinderGeometry(1,1,1.4,10),st,0,0.7,0,dome);addMesh(new THREE.SphereGeometry(1.0,10,8),gd,0,1.7,0,dome).scale.set(1,1.3,1);addMesh(new THREE.ConeGeometry(0.2,0.8,6),gd,0,3.0,0,dome);}
  // мели по краю: на них стоят; сюда бросается сом
  const SHOAL=[Math.PI*0.25,Math.PI*0.75,Math.PI*1.25,Math.PI*1.75].map((a,i)=>{const x=C.x+Math.cos(a)*8.6,z=C.z+Math.sin(a)*8.6,g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);
    addMesh(new THREE.SphereGeometry(2.15,14,8),M(0xc8b884),0,0.25,0,g).scale.set(1,0.36,1);for(let k=0;k<5;k++)addMesh(new THREE.DodecahedronGeometry(rand(0.18,0.32)),M(0x9a9488),rand(-1.2,1.2),0.9,rand(-1.2,1.2),g);
    for(let k=0;k<12;k++){const r=rand(1.2,1.9),b=rand(0,6.28);addMesh(new THREE.ConeGeometry(0.05,rand(0.7,1.3),3),M(0x6a8a3a),Math.cos(b)*r,1.3,Math.sin(b)*r,g).castShadow=false;}
    const col={x,z,r:1.95,miny:-3,maxy:1.0,on:true};W.cyls.push(col);return {x,z,a,g,col,i};});
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,2);W.zvenFree=true;
  const arena={x:C.x,z:C.z+2,r:R-1,camActive:()=>!G.cine&&F.phase>=1};W.camZones.push(arena);
  bell(0,4,1);
  const bb=$('bossbar');bb.style.display='none';W.onLeave=()=>{bb.style.display='none';try{FIN.music.play(null);}catch(e){}FX.roar(0);};
  let vod=null;
  /* ---------- общее ---------- */
  const BS={zap:0,winHits:0,cap:4,lastEmb:0,stun:0,stage:{},quietT:0,idleT:0};F.bs=BS;
  const live=()=>HEROES.filter(h=>h.active&&!h.cling&&!h.kwHold&&!h.k2ride&&!players[h.player].downed);
  const pick=()=>{const L=live();return L[Math.floor(Math.random()*L.length)]||active(0);};
  const at=(a,r)=>new V3(C.x+Math.cos(a)*r,0,C.z+Math.sin(a)*r);
  const surf=()=>Math.max(zone.level,zone.floor)+0.02;
  const hurtAt=(p,r,why)=>{for(const h of live()){if(Math.hypot(h.pos.x-p.x,h.pos.z-p.z)>r)continue;if(h.rollT>0)continue;if(damageHero(h,{kind:'hazard',ref:{pos:p}})){h.vel.x+=(h.pos.x-p.x)*2;h.vel.z+=(h.pos.z-p.z)*2;h.vel.y=5;}}};
  const key=(p,text,col)=>ft(p.clone?p.clone():new V3(p.x,p.y,p.z),text,col||'#ffe9a0');   // ключевая надпись (окно, оглушение, промах) — мимо фильтра
  // всплывающих надписей в бою — только ключевые: остальное звуком и вспышкой
  const QUIET=/Уголёк|искра|закрылся|Щит!|не достать|не пробить|мимо|Отбил|Капля|лепесток|Окатило|Ой! Не больно|Увернулся|Открыт|Сверху|Удар!|Одним махом|насквозь|Добивающий|Щёлк|Живая вода|Совиный взор|Глаза отдыхают|Держусь|Спасибо/;
  W.k2quiet=t=>F.phase>=1&&!F.out&&QUIET.test(t);
  const sayV=(text,dur,emo)=>{if(!vod)return;bark({g:vod.g,pos:vod.pos,d:{height:vod.L.top*vod.s}},'vod',text,dur||1.8);V.say(vod.k2,Math.min(2.2,(dur||1.8)*0.8));if(emo)V.set(vod.k2,null,emo);};
  const LINES={tease:['Ах вы, головастики!','Буль-буль! Не поймаете!','Ха! Мокрые пятки!','Кто в омут — тот мой!'],hurt:['Ой! Борода!','Ус не трожь!','Ой, корона…','Ай-ай, кувшиночки мои!'],
    tired:['Уф… запыхался…','Ох, годы мои водяные…'],angry:['Ну, держитесь!','Всех перекупаю!','Сейчас как плесну!']};
  const line=k=>{const L=LINES[k];return L[Math.floor(Math.random()*L.length)];};
  // музыка по этапам (темы — в late_40_music: FIN.music.TR)
  const MUS=()=>{try{const TR=FIN.music.TR;if(!TR||TR.vod1)return;const B=TR.boss;
      TR.vod1=Object.assign({},B,{bpm:116,root:43});TR.vod2=Object.assign({},B,{bpm:124,root:45,v:B.v.concat([{i:'tamb',drum:'x.x.x.x.x.x.x.x.',vol:0.02}])});
      TR.vod3=Object.assign({},B,{bpm:108,root:41,sc:'aeo',v:B.v.filter(v=>v.i!=='kick').concat([{i:'frame',drum:'x.....x.....x...',vol:0.04}])});
      TR.vod4=Object.assign({},B,{bpm:75,root:45,v:B.v.concat([{i:'kick',drum:'x...x...x...x...',vol:0.12},{i:'frame',drum:'x.x.x.x.x.x.x.x.',vol:0.05}])});}catch(e){}};
  const music=n=>{MUS();try{FIN.music.play(n);}catch(e){}};
  // полоса босса: этап, сила, запал
  const setBar=()=>{if(bb.style.display!=='block')return;const e=vod,ph=Math.max(1,Math.min(4,Math.floor(F.phase||1)));const hp=e&&e.alive?Math.max(0,e.embers)/e.maxEmb:0;
    const nm=['','Сом-перевозчик','Водяные кони','Омут-зеркало','Великий вал'][ph];const prog=ph===4?(BS.s4?BS.s4.ok/3:0):0;
    bb.innerHTML='<b>Водяной</b> · '+ph+' / 4 · '+nm+' <span class="seg"><i style="width:'+Math.round((F.won?0:ph===4?1-prog:hp)*100)+'%"></i></span>'+
      (ph<4?' <span class="seg" style="width:70px;background:#26303a"><i style="width:'+Math.round(BS.zap*100)+'%;background:linear-gradient(90deg,#9fe6ff,#fff)"></i></span>':'');};
  /* ---------- Водяной ---------- */
  function spawnVod(){vod=V.boss(C.x,C.z,{y:-1.4,scale:1});vod.def=Object.assign({},vod.def,{ranged:false});vod.embers=vod.maxEmb=8;vod.slowAtk=0;BS.lastEmb=vod.embers;
    vod.state='idle';vod.g.position.y=-1.4;vod.guardAll=()=>!(vod.dazeT>0)&&vod.state!=='broken';vod.guardText='не достать';
    vod.onReflect=b=>{const e=vod;FX.splash(e.pos.clone().add(new V3(0,e.L.top*e.s*0.7,0)),1.3);SFX.splash();zapAdd(SOLO()?0.5:0.34);};
    vod.onFinisher=h=>{if(F.phase===1){F.phase=1.5;BS.winHits=0;later(0.4,scene2);return;}if(F.phase===2){F.phase=2.5;later(0.4,scene3);return;}if(F.phase===3){F.phase=3.5;later(0.4,scene4);return;}
      if(F.phase===4.5&&!F.won){F.fin[h.player]=G.time;if(SOLO())F.fin[1-h.player]=G.time;SFX.finisher();ringFx(vod.pos,COL.gold,3);FX.crown(vod.pos.clone().setY(-1.9),1.2);
        if(Math.abs(F.fin[0]-F.fin[1])<0.8)win();else if(!F.finTold){F.finTold=true;for(const pi of[0,1])tip(pi,'Ударьте '+K(pi,'attack')+' ОБА РАЗОМ — Богатырский мах!',3);}}};
    vod.tick=(e,dt)=>{if(G.cine)return;if(e.state!=='broken'&&!(e.dazeT>0)){e.cd=Math.max(e.cd,1);if(e.state==='ready'||e.state==='wind')e.state='idle';}
      if(e.state==='broken'&&F.phase<5)e.t=Math.min(e.t,0.5);};   // пробой ждёт добивающего — не гаснет сам
    vod.k2post=(e)=>{const R2=e.k2;const h=live()[0];if(h){const a=Math.atan2(h.pos.x-e.pos.x,h.pos.z-e.pos.z)-e.face;R2.st.look[0]=clamp(Math.sin(a),-1,1);}};}
  // запал: отбивы — полная шкала → оглушение
  function zapAdd(k){if(!(F.phase>=1&&F.phase<4))return;BS.zap=Math.min(1,BS.zap+k);if(BS.zap>=1&&!(vod.dazeT>0)&&vod.state!=='broken')zapStun();}
  function zapStun(){BS.zap=0;const e=vod;SFX.crash();shakeAll(0.07,0.5);F.slow=0.3;FX.crown(e.pos.clone().setY(surf()),1.6);CINE.moodFlash&&CINE.moodFlash('#bfe6ff',0.18,0.8);
    key(e.pos.clone().add(new V3(0,e.L.top*e.s+0.6,0)),'Запал погас — оглушён!','#bfe6ff');sayV(line('hurt'),1.6,'hurt');
    if(F.phase===1){s1Fall(true);}else if(F.phase===2){s2Fall();}else if(F.phase===3){s3Open(SOLO()?6:4.5,true);}}
  function winStart(dur,cap){const e=vod;BS.zoom=1;e.dazeT=dur;e.state='recover';BS.winHits=0;BS.cap=cap||(SOLO()?4:4);BS.lastEmb=e.embers;V.set(e.k2,'dazed','hurt');}
  // попадания в окно: не больше BS.cap — «очухался»
  function winTick(){const e=vod;if(!e)return;if(e.embers<BS.lastEmb){const n=BS.lastEmb-e.embers;BS.winHits+=n;for(let i=0;i<n;i++){FX.splash(e.pos.clone().add(new V3(rand(-1,1),e.L.top*e.s*0.6,rand(-1,1))),0.8);}
      if(F.phase===2){const p=V.dropFlower(e.k2);if(p){for(let i=0;i<8;i++)FX.drop(p,new V3(rand(-1.5,1.5),rand(1,3),rand(-1.5,1.5)),0.12,{noRing:true});}}
      if(e.dazeT>0&&BS.winHits>=BS.cap&&e.state!=='broken'){e.dazeT=0.01;key(e.pos.clone().add(new V3(0,e.L.top*e.s+0.4,0)),'Очухался!','#cfe8ff');sayV(line('angry'),1.6,'angry');}}
    BS.lastEmb=e.embers;}
  /* ================= ЭТАП 1 «СОМ-ПЕРЕВОЗЧИК» ================= */
  const SOM=V.som();SOM.g.visible=false;SOM.g.scale.setScalar(1.05);
  const S1={st:'off',t:0,ang:-Math.PI/2,throwT:2.6,lungeT:7,sh:null,a:null,b:null,lane:null,whisk:false,beat:-1,tw:null,dbl:false};BS.s1=S1;
  const somAt=(p,face,y)=>{SOM.g.position.set(p.x,y!=null?y:surf()-0.18,p.z);SOM.g.rotation.y=face;};
  const whiskTip=new V3();
  W.marks.push({pos:whiskTip,active:()=>F.phase===1&&S1.st==='beached'&&!S1.whisk,onHit:()=>{S1.whisk=true;S1.t=0;S1.dur=SOLO()?10:8;SOM.thrash=1.6;SFX.latch();FX.splash(whiskTip.clone(),0.8);
    key(whiskTip.clone().add(new V3(0,1,0)),'Ус сбит! Потап — хватай!','#ffd76a');sayV('Ус не трожь!',1.4,'angry');whiskMat.emissiveIntensity=1;}});
  const whiskMat=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0});const whiskGlow=new THREE.Mesh(new THREE.SphereGeometry(0.32,10,8),whiskMat);whiskGlow.visible=false;W.group.add(whiskGlow);
  W.lifts.push({pos:whiskTip,active:()=>F.phase===1&&S1.st==='beached'&&S1.whisk,onLift:h=>{S1.st='pull';S1.t=0;S1.beat=-1;S1.puller=h;S1.anchor=h.pos.clone();SFX.latch();bark(h,'potap','Держу ус! Раз…',1.4,true);}});
  function s1Start(){F.phase=1;S1.st='circle';S1.t=0;S1.throwT=2.4;S1.lungeT=SOLO()?8:6.5;SOM.g.visible=true;vod.embers=vod.maxEmb=8;BS.lastEmb=8;BS.zap=0;vod.setScale(1.2);V.set(vod.k2,'ride','angry');music('vod1');
    card(1,'Этап 1 · Сом-перевозчик','Водяной верхом на соме',p=>p===0?'Сом бросится на мель — Прошка, сбей ему ус из рогатки '+K(0,'skill')+';<br>Потап хватает ус '+K(0,'skill')+' — и «раз-два-три»! Позови Потапа поближе '+K(0,'call')+'.':
      'Синий круг под тобой — летит шар: щит '+K(1,'guard')+' в последний миг — шар полетит в Водяного.<br>Красная дорожка — сом бросается: в сторону или кувырок '+K(1,'roll')+'.');}
  function s1Lunge(){const h=pick();let best=SHOAL[0],bd=1e9;for(const S of SHOAL){const d=Math.hypot(S.x-h.pos.x,S.z-h.pos.z);if(d<bd){bd=d;best=S;}}
    S1.sh=best;const dir=new V3(best.x-C.x,0,best.z-C.z).normalize();S1.b=new V3(best.x-dir.x*2.1,0,best.z-dir.z*2.1);S1.a=SOM.g.position.clone();S1.st='tele';S1.t=0;S1.dur=SOLO()?1.7:1.4;
    S1.lane=FX.lane(new V3(S1.a.x,0,S1.a.z),new V3(best.x,0,best.z),2.8,S1.dur,'red',surf());V.set(vod.k2,'grab','angry');sayV(Math.random()<0.5?'Поберегись!':'Н-но, сомушка!',1.2);
    if(!F.lungeTold){F.lungeTold=true;for(const p of[0,1])tip(p,'Красная дорожка заполняется — сом сейчас бросится! В сторону или кувырок '+K(p,'roll')+'.<br>Бросился на мель — бьётся там: Прошка, рогатку в ус!',3.6);}}
  function s1Fall(zap){const e=vod;S1.st='stun';S1.t=0;const p=zap?SOM.g.position.clone():new V3(S1.sh.x+(C.x-S1.sh.x)*0.2,0,S1.sh.z+(C.z-S1.sh.z)*0.2);
    const from=e.pos.clone(),to=new V3(p.x,zap?-1.4:0.1,p.z);anim(0.9,k=>{e.pos.lerpVectors(from,to,k);e.pos.y+=Math.sin(k*Math.PI)*2.5;e.inner.rotation.x=k*Math.PI*2;});later(0.95,()=>{e.inner.rotation.x=0;});
    winStart(SOLO()?9:6,4);V.set(e.k2,'dazed','hurt');SFX.crash();later(0.8,()=>{FX.crown(to.clone().setY(surf()),1.5);shakeAll(0.06,0.5);});key(p.clone().setY(4),zap?'Свалился с сома!':'Застрял на мели! Бейте!','#9fe6ff');
    if(!zap)sayV('Ой-ой! Борода в песке!',1.8,'hurt');}
  function s1Remount(){const e=vod;S1.st='remount';S1.t=0;const from=e.pos.clone();V.set(e.k2,'ride','angry');sayV(line('tease'),1.6);
    anim(1.0,k=>{const to=SOM.saddle.getWorldPosition(new V3());e.pos.lerpVectors(from,to,k);e.pos.y+=Math.sin(k*Math.PI)*2.2;});}
  function s1Tick(dt){const e=vod,S=S1;S.t+=dt;SOM.tick(dt);
    const saddle=()=>{SOM.g.updateMatrixWorld(true);const p=SOM.saddle.getWorldPosition(new V3());e.pos.set(p.x,p.y-0.2,p.z);e.face=SOM.g.rotation.y;};
    if(S.st==='circle'){S.ang+=dt*(SOLO()?0.4:0.52);const p=at(S.ang,5.6);somAt(p,S.ang+Math.PI);SOM.thrash=0;SOM.amp=1;SOM.sp=1;saddle();
      S.throwT-=dt;if(S.throwT<=0){S.throwT=SOLO()?3.6:2.6;const h=pick();V.set(e.k2,'throw');S.tw={h,t:0,tele:FX.tele(h.pos.x,surf(),h.pos.z,1.0,0.9,'blue',{follow:()=>h.pos})};}
      if(S.tw){S.tw.t+=dt;if(S.tw.t>0.9){spawnBolt(e,S.tw.h);S.tw=null;later(0.6,()=>{if(F.phase===1&&S1.st==='circle')V.set(e.k2,'ride');});}}
      S.lungeT-=dt;if(S.lungeT<=0&&!S.tw){S.lungeT=SOLO()?9:(S.dbl?4:6.5);s1Lunge();}}
    else if(S.st==='tele'){const k=S.t/S.dur;SOM.amp=0.4;SOM.thrash=0;SOM.g.position.y=surf()-0.18-k*0.35;saddle();SOM.g.rotation.y=Math.atan2(S.b.x-S.a.x,S.b.z-S.a.z);
      if(Math.random()<dt*8){const tp=new V3(0,0,-6).applyMatrix4(SOM.g.matrixWorld);FX.splash(tp.setY(surf()),0.7);}
      if(Math.floor(S.t*5)!==Math.floor((S.t-dt)*5))tone(90+k*260,0.12,'sine',0.18,140+k*300);   // бульк нарастает
      if(S.t>=S.dur){S.st='lunge';S.t=0;S.hit=new Set();SFX.wave();}}
    else if(S.st==='lunge'){const k=Math.min(1,S.t/0.75),p=new V3().lerpVectors(S.a,S.b,smooth(k));somAt(p,Math.atan2(S.b.x-S.a.x,S.b.z-S.a.z));SOM.g.position.y=surf()-0.18+Math.sin(k*Math.PI)*0.8;SOM.open=1;saddle();
      const head=new V3(0,0,2.2).applyMatrix4(SOM.g.matrixWorld);if(Math.random()<dt*20)FX.splash(head.clone().setY(surf()),0.9);
      for(const h of live()){if(S.hit.has(h))continue;if(Math.hypot(h.pos.x-head.x,h.pos.z-head.z)<2.0&&h.rollT<=0){S.hit.add(h);if(damageHero(h,{kind:'hazard',ref:{pos:head}})){h.vel.y=6;}}}
      if(k>=1){S.st='beached';S.t=0;S.whisk=false;S.dur=SOLO()?4.6:3.6;SOM.open=0.4;SOM.thrash=1;SOM.g.position.y=0.25;SOM.g.rotation.x=-0.12;FX.crown(S.b.clone().setY(0.6),1.4);SFX.crash();shakeAll(0.05,0.4);
        sayV(S.dbl?'Ах, опять мимо!':'Тпру, сомушка! Застрял!',1.6,'surprise');}}
    else if(S.st==='beached'||S.st==='pull'){SOM.whUp=damp(SOM.whUp,1,4,dt);SOM.thrash=S.st==='pull'?0.6:(S.whisk?1.6:1);saddle();SOM.tipPos(1,whiskTip);whiskGlow.position.copy(whiskTip);whiskGlow.visible=true;whiskMat.emissiveIntensity=S.whisk?0.8+0.4*Math.sin(G.time*10):0.25;
      if(S.st==='beached'&&S.t>S.dur){S.st='back';S.t=0;whiskGlow.visible=false;sayV('Ха! Не поймали!',1.6,'happy');}
      if(S.st==='pull'){const h=S.puller;if(h&&!(h.active&&players[h.player].downed)){h.pos.x=S.anchor.x;h.pos.z=S.anchor.z;h.vel.set(0,0,0);h.face=Math.atan2(SOM.g.position.x-h.pos.x,SOM.g.position.z-h.pos.z);h.atkT=0.2;}
        const b=Math.min(2,Math.floor(S.t/0.75));if(b!==S.beat){S.beat=b;SFX.beat&&SFX.beat(b);banner(['РАЗ','ДВА','ТРИ!'][b],b===2?'#ffc93c':'#ffffff',0.7,'');SOM.g.position.x+=(S.sh.x-SOM.g.position.x)*0.18;SOM.g.position.z+=(S.sh.z-SOM.g.position.z)*0.18;}
        if(S.t>2.3){S.st='haul';S.t=0;}}}
    else if(S.st==='haul'){const k=Math.min(1,S.t/0.9);SOM.roll=k*1.3;SOM.thrash=0.4;SOM.g.position.y=0.25+Math.sin(k*Math.PI)*0.6;whiskGlow.visible=false;
      if(S.t<dt*1.5){SFX.toss();shakeAll(0.06,0.5);sayV('А-а-ай! Сомушка!',1.4,'surprise');}if(k>=1)s1Fall(false);}
    else if(S.st==='stun'){if(S.som0==null)S.som0=1;SOM.thrash=S.t<3?0.8:0.3;if(!(e.dazeT>0)&&e.state!=='broken'){S.st='back';S.t=0;S.som0=null;s1Remount();}}
    else if(S.st==='remount'){SOM.roll=Math.max(0,SOM.roll-dt*2);if(S.t>1.05){S.st='back';S.t=0;}}
    else if(S.st==='back'){SOM.whUp=damp(SOM.whUp,0,3,dt);SOM.roll=Math.max(0,SOM.roll-dt*2);SOM.g.rotation.x=0;SOM.thrash=0;const tgt=at(S.ang,5.6);const p=SOM.g.position;p.x=damp(p.x,tgt.x,2.2,dt);p.z=damp(p.z,tgt.z,2.2,dt);p.y=damp(p.y,surf()-0.18,3,dt);
      SOM.g.rotation.y=Math.atan2(tgt.x-p.x,tgt.z-p.z)||SOM.g.rotation.y;saddle();if(S.t>1.4){S.st='circle';S.lungeT=SOLO()?7:5;S.dbl=vod.embers<=4;V.set(e.k2,'ride','angry');}}}
  /* ================= ЭТАП 2 «ВОДЯНЫЕ КОНИ» ================= */
  const ISL={g:new THREE.Group(),col:{x:C.x,z:C.z,r:2.7,miny:-3,maxy:3.2,on:false},y:-4};ISL.g.position.set(C.x,-4,C.z);W.group.add(ISL.g);W.cyls.push(ISL.col);
  {const im=M(0x6a7064),mm=M(0x4a7a3a);addMesh(new THREE.CylinderGeometry(2.6,3.3,6,10),im,0,-3,0,ISL.g);addMesh(new THREE.CylinderGeometry(2.7,2.7,0.3,12),mm,0,0.05,0,ISL.g);
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2;addMesh(new THREE.DodecahedronGeometry(rand(0.4,0.7)),im,Math.cos(a)*2.6,rand(-1,0),Math.sin(a)*2.6);}
    for(let i=0;i<10;i++){const a=rand(0,6.28),r=rand(1.6,2.5);addMesh(new THREE.ConeGeometry(0.05,rand(0.6,1.1),3),M(0x6a8a3a),Math.cos(a)*r,0.6,Math.sin(a)*r,ISL.g).castShadow=false;}}
  ISL.g.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;});
  const S2={st:'off',t:0,horses:[],throwT:5,whistT:9,rider:null,ride:null,ring:[3.8,5.2],washT:0};BS.s2=S2;
  const shellRef=(i)=>({i,hum:0,dur:6,off:true,by:null,ring(h){this.hum=Math.max(this.hum,this.dur);this.by=h||null;s2Tame(this,h);}});
  const SH2=SHOAL.map((S,i)=>{const dx=(S.x-C.x)/8.6,dz=(S.z-C.z)/8.6,ref=shellRef(i);const sh=kwShell('dance',S.x+dx*0.9,S.z+dz*0.9,1.0,ref,{ry:Math.atan2(-dx,-dz),r:2.6,say:'Тпру, конёк!'});
    sh.g.visible=false;sh.g.traverse(c=>{c.userData.noBatch=true;});return sh;});
  function s2Start(){F.phase=2;S2.st='run';S2.t=0;S2.throwT=5;S2.whistT=SOLO()?11:8.5;vod.embers=vod.maxEmb=6;BS.lastEmb=6;BS.zap=0;vod.setScale(1.5);V.resetFlowers(vod.k2);V.set(vod.k2,'conduct','happy');
    vod.pos.set(C.x,3.2,C.z);vod.face=0;SH2.forEach(S=>{S.g.visible=true;S.ref.off=false;});music('vod2');FX.rain(true,{c:new V3(C.x,0,C.z)});OM.chop=0.7;
    if(!S2.horses.length)for(let i=0;i<4;i++){const H=V.horse();H.g.scale.setScalar(1.15);H.ang=i/4*Math.PI*2;H.lane=i%2;H.r=S2.ring[H.lane];S2.horses.push(H);}
    S2.horses.forEach(H=>{H.g.visible=true;H.frozen=0;H.state='run';});
    card(2,'Этап 2 · Водяные кони','табун из волн скачет вокруг острова',p=>'Сыграй '+K(p,'item')+' у раковины на мели — ближний конь замрёт. Садится ДРУГОЙ: подпрыгни '+K(p,'jump')+' к коню —<br>он вынесет на остров. Там бей по короне '+K(p,'attack')+'! '+(SOLO()?'Одному: сыграл — смени героя '+K(p,'swap')+', оставленный держит коня.':'Потом — поменяйтесь.'));}
  function s2Tame(ref,h){if(F.phase!==2)return;const S=SHOAL[ref.i];let best=null,bd=1e9;for(const H of S2.horses){if(H.state!=='run')continue;const p=H.g.position,d=Math.hypot(p.x-S.x,p.z-S.z);if(d<bd){bd=d;best=H;}}
    if(!best){key(new V3(S.x,3,S.z),'Все кони заняты','#cfe8ff');return;}const dx=(C.x-S.x)/8.6,dz=(C.z-S.z)/8.6;best.state='come';best.ref=ref;best.to=new V3(S.x+dx*3.1,0,S.z+dz*3.1);best.t=0;best.by=h;
    sayV('Эй! Чей это напев?!',1.6,'surprise');}
  function s2Mount(H,h){H.state='ride';H.rider=h;h.k2ride=H;S2.rider=h;H.t=0;H.from=H.g.position.clone();SFX.toss();FX.splash(H.g.position.clone().setY(surf()),1);
    key(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Верхом!','#ffe9a0');bark(h,h.kind,'Но-о, водяной! К острову!',1.6,true);}
  function s2Island(H){const h=H.rider;h.k2ride=null;H.state='gone';H.rider=null;placeOnGround(h,C.x+(h.pos.x-C.x>0?1.9:-1.9),C.z+1.5,3.2);h.vel.set(0,0,0);H.g.visible=false;FX.crown(H.g.position.clone(),1.6);
    winStart(SOLO()?7:5,3);V.set(vod.k2,'dazed','surprise');sayV('Ой! Как ты сюда?!',1.6,'surprise');S2.washT=SOLO()?7.2:5.2;S2.onIsl=h;
    later(3,()=>{if(F.phase!==2||H.state!=='gone')return;H.state='run';H.g.visible=true;H.r=S2.ring[H.lane];});}   // этап уже кончился — конь не возвращается
  function s2Wash(){const h=S2.onIsl;S2.onIsl=null;V.set(vod.k2,'whistle','angry');sayV('Фью-у-ить! Смою!',1.4);FX.column(C.x,surf(),C.z,5,1.4,2.4);SFX.wave();
    for(const q of HEROES){if(Math.hypot(q.pos.x-C.x,q.pos.z-C.z)<3&&q.pos.y>2.5){const a=Math.atan2(q.pos.z-C.z,q.pos.x-C.x);q.vel.set(Math.cos(a)*7,7,Math.sin(a)*7);q.grounded=false;}}
    later(1.2,()=>{if(F.phase===2)V.set(vod.k2,'conduct','angry');});}
  function s2Fall(){const e=vod;const a=rand(0,6.28),to=new V3(C.x+Math.cos(a)*3.6,-1.4,C.z+Math.sin(a)*3.6),from=e.pos.clone();anim(0.9,k=>{e.pos.lerpVectors(from,to,k);e.pos.y+=Math.sin(k*Math.PI)*2;});
    later(0.85,()=>FX.crown(to.clone().setY(surf()),1.6));winStart(SOLO()?6:4.5,3);S2.fallen=true;}
  function s2Tick(dt){const e=vod,S=S2;S.t+=dt;S.lightT=(S.lightT==null?6:S.lightT)-dt;if(S.lightT<=0){S.lightT=rand(8,14);FX.lightning();}
    if(e.dazeT>0||e.state==='broken'){}else if(S.fallen){S.fallen=false;const from=e.pos.clone();anim(1,k=>{e.pos.lerpVectors(from,new V3(C.x,3.2,C.z),k);e.pos.y+=Math.sin(k*Math.PI)*2;});later(1,()=>V.set(e.k2,'conduct','angry'));}
    else if(!S.onIsl&&!S.fallen&&Math.hypot(e.pos.x-C.x,e.pos.z-C.z)<0.5)e.pos.set(C.x,3.2,C.z);
    if(S.onIsl&&!(e.dazeT>0)&&e.state!=='broken'){S.washT=0;s2Wash();}
    // кони: по кругу; свист — меняют ряд
    S.whistT-=dt;if(S.whistT<=0&&!(e.dazeT>0)){S.whistT=SOLO()?12:9;V.set(e.k2,'whistle','angry');sayV('Фью-у-ить!',1.0);S.swap=1.2;
      for(const H of S.horses)if(H.state==='run'){const r=S.ring[1-H.lane];const t=FX.tele(C.x,surf(),C.z,r+1.1,1.2,'red');t.g.children[1].visible=false;}}
    if(S.swap>0){S.swap-=dt;if(S.swap<=0){for(const H of S.horses)if(H.state==='run')H.lane=1-H.lane;later(0.8,()=>{if(F.phase===2&&!(e.dazeT>0))V.set(e.k2,'conduct','happy');});}}
    for(const H of S.horses){H.frozen=H.state==='wait'?1:0;H.tick(dt);
      if(H.state==='run'){H.ang+=dt*(SOLO()?0.42:0.55)*(H.lane?1:-1.25);H.r=damp(H.r,S.ring[H.lane],2.4,dt);const p=at(H.ang,H.r);const d=(H.lane?1:-1);
        H.g.position.set(p.x,surf()-0.5+Math.abs(Math.sin(G.time*6+H.ang))*0.15,p.z);H.g.rotation.y=H.ang*-1+(d>0?0:Math.PI);
        if(Math.random()<dt*6)FX.drop(H.g.position.clone().add(new V3(0,0.4,0)),new V3(rand(-1,1),rand(1.5,3),rand(-1,1)),0.1);
        for(const h of live()){if(Math.hypot(h.pos.x-p.x,h.pos.z-p.z)<1.5&&h.pos.y<1.9&&h.rollT<=0){if(damageHero(h,{kind:'hazard',ref:{pos:p}})){h.vel.x+=(h.pos.x-p.x)*4;h.vel.z+=(h.pos.z-p.z)*4;h.vel.y=5;FX.splash(h.pos.clone(),0.8);}}}}
      else if(H.state==='come'){H.t+=dt;const p=H.g.position;p.x=damp(p.x,H.to.x,3,dt);p.z=damp(p.z,H.to.z,3,dt);H.g.rotation.y=Math.atan2(H.to.x-p.x,H.to.z-p.z)||H.g.rotation.y;if(H.t>1.1){H.state='wait';H.t=0;SFX.ok();}}
      else if(H.state==='wait'){H.t+=dt;H.g.rotation.y=Math.atan2(C.x-H.g.position.x,C.z-H.g.position.z);const held=H.ref&&H.ref.hum>0;
        if(!held&&H.t>1){H.state='run';H.ref=null;}
        for(const h of HEROES){if(!h.active||h.k2ride||players[h.player].downed)continue;const d=Math.hypot(h.pos.x-H.g.position.x,h.pos.z-H.g.position.z);
          if(d<1.9&&!h.grounded&&h.vel.y>0.5){if(h===H.by||h.kwHold){if(!H.noTold){H.noTold=1;key(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Кто играет — держит коня. Садится другой!','#ffe9a0');}continue;}s2Mount(H,h);break;}}}
      else if(H.state==='ride'){H.t+=dt;const k=Math.min(1,H.t/2.2),to=new V3(C.x,0,C.z),p=new V3().lerpVectors(H.from,to,smooth(k));const up=k>0.7?Math.sin((k-0.7)/0.3*Math.PI*0.5)*4:0;
        H.g.position.set(p.x,surf()-0.5+up,p.z);H.g.rotation.y=Math.atan2(to.x-H.from.x,to.z-H.from.z);const h=H.rider;h.pos.set(p.x,H.g.position.y+2.0,p.z);h.vel.set(0,0,0);h.grounded=true;h.knockT=0.1;h.face=H.g.rotation.y;
        if(Math.random()<dt*14)FX.drop(H.g.position.clone(),new V3(rand(-1.5,1.5),rand(1,3),rand(-1.5,1.5)),0.12);if(k>=1)s2Island(H);}}
    // шары по пловцам — реже
    S.throwT-=dt;if(S.throwT<=0&&!(e.dazeT>0)&&e.state!=='broken'){S.throwT=SOLO()?7:5;const h=pick();if(h&&!h.k2ride){const t=FX.tele(h.pos.x,surf(),h.pos.z,1.0,0.9,'blue',{follow:()=>h.pos});V.set(e.k2,'throw');later(0.9,()=>{if(F.phase===2&&!(vod.dazeT>0)){spawnBolt(vod,h);later(0.6,()=>{if(F.phase===2&&!(vod.dazeT>0))V.set(vod.k2,'conduct');});}});}}}
  /* ================= ЭТАП 3 «ОМУТ-ЗЕРКАЛО» ================= */
  const S3={st:'off',t:0,ang:0,slots:[0,1,2],real:0,fakes:[],mark:null,shuffleT:8,geyT:3,throwT:4,rafts:[],buds:[],owl:0};BS.s3=S3;
  const S3R=2.4,SPIT=6.8;
  const markS=(()=>{const g=new THREE.Group();const m=new THREE.Mesh(new THREE.TorusGeometry(1.0,0.12,6,24),MB(0xffd76a,{transparent:true,opacity:0.95}));g.add(m);
    const st=new THREE.Mesh(new THREE.OctahedronGeometry(0.45,0),MB(0xfff2b0));g.add(st);g.visible=false;W.group.add(g);g.traverse(c=>{c.userData.noBatch=true;c.renderOrder=9;});return {g,m,st};})();
  function s3MkFake(i){const g=new THREE.Group();W.group.add(g);const R2=V.rig(g,{eyeMat:vod.eyeMat,seed:1});g.scale.setScalar(1.3);g.visible=false;const dummy={pos:g.position,L:{top:R2.top},s:1.1,alive:true,def:{selfBreak:false},
      onReflect:b=>{FX.splash(g.position.clone().add(new V3(0,3,0)),1);zapAdd(0.15);}};dummy.s=1.3;return {g,R:R2,dummy,i,pop:0};}
  const posSlot=(i)=>{const a=S3.ang+i/3*Math.PI*2;return new V3(C.x+Math.cos(a)*S3R,-0.9,C.z+Math.sin(a)*S3R);};
  function s3Who(slot){return slot===S3.real?{real:true,g:vod.g,pos:vod.pos}:S3.fakes.find(f=>f.slot===slot);}
  for(let i=0;i<3;i++)W.marks.push({pos:new V3(),slot:i,active(){const p=posSlot(this.slot);this.pos.set(p.x,1.8,p.z);return F.phase===3&&S3.st==='fight'&&!(vod.dazeT>0)&&vod.state!=='broken'&&!s3Popped(this.slot);},onHit(){s3Shot(this.slot);}});
  const s3Popped=slot=>{const f=S3.fakes.find(q=>q.slot===slot);return !!(f&&f.pop>0);};
  function s3Shot(slot){if(slot===S3.real){S3.mark=SOLO()?8:6;s3Open(S3.mark,false);markS.g.visible=true;key(vod.pos.clone().add(new V3(0,4.5,0)),'Настоящий! Метка горит — бейте!','#ffd76a');sayV('Ай! Нашли меня…',1.6,'hurt');}
    else{const f=S3.fakes.find(q=>q.slot===slot);if(!f)return;f.pop=3;f.g.visible=false;FX.column(f.g.position.x,surf(),f.g.position.z,4,1.1,1.2);key(f.g.position.clone().add(new V3(0,3,0)),'Отражение!','#cfe8ff');sayV('Ха-ха! Мимо — отражение!',1.6,'happy');}}
  function s3Open(dur,zap){winStart(dur,3);V.set(vod.k2,'dazed','hurt');if(zap){markS.g.visible=true;}}
  // бутоны кувшинок: живая вода Йоши — плот на двоих; воронка несёт его к отражениям
  const BUDS=[Math.PI*0.5,Math.PI*0.5+2.1,Math.PI*0.5-2.1].map((a,i)=>{const x=C.x+Math.cos(a)*7.6,z=C.z+Math.sin(a)*7.6,g=new THREE.Group();g.position.set(x,0.8,z);W.group.add(g);
    addMesh(new FIN.orig.Cylinder(0.7,0.7,0.06,12,1,false,0.35,Math.PI*2-0.35),M(0x4f8a3a),0,0,0,g);const bud=addMesh(new THREE.ConeGeometry(0.22,0.55,6),M(0xf4c0d0,{emissive:0x803050,emissiveIntensity:0.3}),0,0.3,0,g);
    g.visible=false;g.traverse(c=>{c.userData.noBatch=true;});const B={g,bud,x,z,a,cool:0,i};
    W.waterTargets.push({pos:new V3(x,0.8,z),pri:1.5,active:()=>F.phase===3&&S3.st==='fight'&&g.visible&&B.cool<=0&&!S3.rafts.some(r=>r.bud===B),onWater:()=>s3Raft(B)});return B;});
  function s3Raft(B){B.cool=8;B.g.visible=false;SFX.grow();const g=new THREE.Group();W.group.add(g);const pm=M(0x4f9a3e);addMesh(new FIN.orig.Cylinder(1.8,1.8,0.14,18,1,false,0.3,Math.PI*2-0.3),pm,0,0,0,g);
    addMesh(new THREE.ConeGeometry(0.3,0.5,8),M(0xf8f0f4),1.0,0.25,0.6,g);addMesh(new THREE.ConeGeometry(0.2,0.4,8),M(0xf4b0c4),1.0,0.32,0.6,g);g.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;});
    const col={x:B.x,z:B.z,r:1.8,miny:-3,maxy:surf()+0.1,on:true};W.cyls.push(col);const Rf={g,col,bud:B,a:B.a,r:7.6,t:0,st:'wait',life:SOLO()?20:16};S3.rafts.push(Rf);g.position.set(B.x,surf(),B.z);g.scale.setScalar(0.05);
    anim(0.8,k=>{g.scale.setScalar(Math.max(0.05,k));});FX.crown(new V3(B.x,surf(),B.z),1);key(new V3(B.x,2.5,B.z),'Кувшинка-плот! На двоих','#9affb0');bark(T.yosha,'yosha','Расти, кувшинка, — неси нас!',1.6,true);}
  function s3Start(){F.phase=3;S3.st='fight';S3.t=0;S3.ang=0;S3.shuffleT=9;S3.geyT=SOLO()?4:3;S3.throwT=4;vod.embers=vod.maxEmb=6;BS.lastEmb=6;BS.zap=0;vod.setScale(1.3);vod.r=1.2;V.set(vod.k2,'idle','happy');
    if(!S3.fakes.length)S3.fakes=[s3MkFake(0),s3MkFake(1)];S3.real=Math.floor(Math.random()*3);let k=0;for(let i=0;i<3;i++)if(i!==S3.real){S3.fakes[k].slot=i;S3.fakes[k].g.visible=true;S3.fakes[k].pop=0;k++;}
    BUDS.forEach(B=>{B.g.visible=true;B.cool=0;});OM.swirl=1;OM.chop=0.4;music('vod3');FX.rain(true,{c:new V3(C.x,0,C.z)});
    card(3,'Этап 3 · Омут-зеркало','три отражения — настоящий один',p=>p===1?'Совиный взор '+K(1,'skill')+' — отражения станут прозрачной водой, а настоящий останется.<br>К середине не доплыть — Йоша, полей бутон '+K(1,'skill')+': кувшинка-плот на двоих!':
      'Прошка, метни рогатку '+K(0,'skill')+' в настоящего — метка горит, все бьют '+K(0,'attack')+'.<br>К середине — только на кувшинке-плоту: воронка сама понесёт.');}
  function s3Geyser(){const h=pick();if(!h)return;const p=new V3(h.pos.x,0,h.pos.z),dur=SOLO()?1.5:1.2;FX.tele(p.x,surf(),p.z,1.5,dur,'red');
    const dome=new THREE.Mesh(K2_DOME_G,MB(0xcff4ff,{transparent:true,opacity:0.45,depthWrite:false}));dome.position.set(p.x,surf(),p.z);dome.scale.set(1,0.05,1);dome.userData.noBatch=dome.userData.noBatchL=true;W.group.add(dome);
    for(let i=0;i<10;i++)later(i*dur/10,()=>{FX.drop(new V3(p.x+rand(-0.9,0.9),surf()-0.3,p.z+rand(-0.9,0.9)),new V3(0,rand(1,2.4),0),0.08,{noRing:true,life:0.4});});
    anim(dur,k=>{dome.scale.set(1,0.05+k*0.8,1);dome.material.opacity=0.25+k*0.35;});later(0,()=>tone(70,dur,'sine',0.18,240));
    later(dur,()=>{W.group.remove(dome);if(F.phase!==3||G.cine)return;FX.column(p.x,surf(),p.z,5,1.2,1.1);SFX.splash();hurtAt(p,1.5);});}
  function s3Tick(dt){const e=vod,S=S3;S.t+=dt;S.lightT=(S.lightT==null?7:S.lightT)-dt;if(S.lightT<=0){S.lightT=rand(9,15);FX.lightning();}S.owl=Math.max(0,S.owl-dt);const open=e.dazeT>0||e.state==='broken';
    if(!open){S.ang+=dt*(SOLO()?0.22:0.3);markS.g.visible=false;}
    const rp=posSlot(S.real);e.pos.x=damp(e.pos.x,rp.x,6,dt);e.pos.z=damp(e.pos.z,rp.z,6,dt);e.pos.y=damp(e.pos.y,-0.9,4,dt);e.face=Math.atan2(e.pos.x-C.x,e.pos.z-C.z);
    if(markS.g.visible){markS.g.position.set(e.pos.x,e.pos.y+e.L.top*e.s+0.9,e.pos.z);markS.g.rotation.y+=dt*3;markS.m.material.opacity=0.6+0.4*Math.sin(G.time*10);}
    for(const f of S.fakes){const p=posSlot(f.slot);f.g.position.set(p.x,-0.9,p.z);f.g.rotation.y=Math.atan2(p.x-C.x,p.z-C.z);V.anim(f.R,dt);f.R.st.pose=e.k2.st.pose==='dazed'?'idle':e.k2.st.pose;f.R.st.emo=e.k2.st.emo;
      if(f.pop>0){f.pop-=dt;if(f.pop<=0){f.g.visible=true;FX.column(p.x,surf(),p.z,3,0.9,1);}}V.ghost(f.R,S.owl>0);}
    // перетасовка: ныряют и всплывают на новых местах
    S.shuffleT-=dt;if(S.shuffleT<=0&&!open){S.shuffleT=SOLO()?11:8.5;for(let i=0;i<3;i++){const p=posSlot(i);FX.column(p.x,surf(),p.z,3,0.8,1.2);}S.real=(S.real+1+Math.floor(Math.random()*2))%3;let k=0;for(let i=0;i<3;i++)if(i!==S.real){S.fakes[k].slot=i;k++;}
      sayV('Буль! Угадай, где я!',1.6,'happy');}
    // гейзеры и шары
    if(!open){S.geyT-=dt;if(S.geyT<=0){S.geyT=SOLO()?4.2:3;s3Geyser();}S.throwT-=dt;if(S.throwT<=0){S.throwT=SOLO()?6:4.2;const who=[{e:vod},...S.fakes.filter(f=>f.pop<=0).map(f=>({e:f.dummy}))][Math.floor(Math.random()*3)]||{e:vod};const h=pick();
        if(h&&who.e){FX.tele(h.pos.x,surf(),h.pos.z,1.0,0.9,'blue',{follow:()=>h.pos});later(0.9,()=>{if(F.phase===3&&!(vod.dazeT>0)&&who.e.alive)spawnBolt(who.e,h);});}}}
    // воронка: пловцов кружит и к середине не пускает (выплёвывает)
    for(const h of HEROES){if(h.cling||h.kwHold)continue;const onRaft=S.rafts.some(r=>h.groundRef===r.col);if(onRaft)continue;if(!(h.groundRef&&h.groundRef.water))continue;
      const dx=h.pos.x-C.x,dz=h.pos.z-C.z,d=Math.hypot(dx,dz)||1;const k=(SOLO()?0.8:1.1)*dt;h.pos.x+=(-dz/d)*k*1.2+(dx/d)*k*0.15;h.pos.z+=(dx/d)*k*1.2+(dz/d)*k*0.15;
      if(d<SPIT){h.pos.x=C.x+dx/d*SPIT;h.pos.z=C.z+dz/d*SPIT;h.vel.x=dx/d*6;h.vel.z=dz/d*6;h.vel.y=5;h.grounded=false;if(!h.k2spit||G.time-h.k2spit>2){h.k2spit=G.time;FX.splash(h.pos.clone(),0.9);
          if(!F.spitTold){F.spitTold=true;key(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Воронка не пускает! Нужен плот','#9fe6ff');}}}}
    // плоты
    for(const B of BUDS){B.cool=Math.max(0,B.cool-dt);if(B.cool<=0&&!S.rafts.some(r=>r.bud===B))B.g.visible=true;B.bud.rotation.y+=dt;}
    for(let i=S.rafts.length-1;i>=0;i--){const Rf=S.rafts[i];Rf.t+=dt;const riders=HEROES.filter(h=>h.groundRef===Rf.col&&h.grounded);
      if(Rf.st==='wait'&&riders.length&&Rf.t>0.6){Rf.st='go';Rf.t=0;SFX.wave();if(SOLO())for(const h of HEROES)if(!riders.includes(h)&&!h.kwHold&&hd(h.pos,Rf.col)<10){placeOnGround(h,Rf.col.x+rand(-0.8,0.8),Rf.col.z+rand(-0.8,0.8),surf()+0.4);h.vel.set(0,0,0);h.following=true;}}
      // в одиночку тот, кем играешь, прыгает на плот (после смены героя он мог остаться в воде)
      if(SOLO()&&Rf.st==='go'){const me=active(G.soloPi);if(!riders.includes(me)&&!me.kwHold&&me.groundRef&&me.groundRef.water&&hd(me.pos,C)<9.5){placeOnGround(me,Rf.col.x+rand(-0.6,0.6),Rf.col.z+rand(-0.6,0.6),surf()+0.4);me.vel.set(0,0,0);FX.splash(me.pos.clone(),0.7);riders.push(me);}}
      // пустой плот возвращается к краю — забрать тех, кого воронка выплюнула
      if(Rf.st==='go'){if(riders.length){Rf.empty=0;}else if((Rf.empty=(Rf.empty||0)+dt)>1.5){Rf.st='ret';}}
      else if(Rf.st==='ret'){Rf.r=damp(Rf.r,7.3,1.4,dt);if(riders.length&&Rf.r>6.9){Rf.st='go';Rf.empty=0;}else if(Math.abs(Rf.r-7.3)<0.15){Rf.st='wait';Rf.t=0;}}
      const ox=Rf.col.x,oz=Rf.col.z;if(Rf.st==='go'){if(open&&riders.length){const ra=Math.atan2(e.pos.z-C.z,e.pos.x-C.x);let d=ra-Rf.a;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;Rf.a+=clamp(d,-1.6*dt,1.6*dt);Rf.r=damp(Rf.r,3.9,2,dt);}
        else{Rf.a+=dt*0.55;Rf.r=damp(Rf.r,4.7,1.0,dt);}Rf.life-=(open?0:dt);if(Rf.life<=0){Rf.st='sink';Rf.t=0;}}
      else if(Rf.st==='sink'){Rf.g.position.y-=dt*0.6;if(Rf.t>1.2){Rf.col.on=false;W.group.remove(Rf.g);W.cyls.splice(W.cyls.indexOf(Rf.col),1);S.rafts.splice(i,1);continue;}}
      if(Rf.st!=='sink'){const x=C.x+Math.cos(Rf.a)*Rf.r,z=C.z+Math.sin(Rf.a)*Rf.r;Rf.col.x=x;Rf.col.z=z;Rf.col.maxy=surf()+0.1;Rf.g.position.set(x,surf()+0.03+Math.sin(G.time*2+i)*0.03,z);Rf.g.rotation.y+=dt*0.6;
        const dx=x-ox,dz=z-oz;for(const h of riders){h.pos.x+=dx;h.pos.z+=dz;}}}}
  W.onOwl=(h)=>{if(F.phase===3&&S3.st==='fight'){S3.owl=4;key(h.pos.clone().add(new V3(0,h.d.height+1.2,0)),'Вижу настоящего!','#e7c3ff');}};
  /* ================= ЭТАП 4 «ВЕЛИКИЙ ВАЛ» ================= */
  const S4={st:'off',t:0,ok:0,wave:0,beatLen:0.8,hit:[null,null],val:null,wall:null,bells:[],beat:-1};BS.s4=S4;
  const BELL4=[[-6.4,-10.2],[6.4,-10.2],[0,-5.6]].map(([x,z],i)=>{const g=new THREE.Group();g.position.set(x,-8,z);W.group.add(g);const wd=M(0x6a4a2a),gd=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3});
    for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.3,4.2,0.3),wd,s*1.3,2.1,0,g);addMesh(new THREE.BoxGeometry(3.0,0.35,0.4),wd,0,4.3,0,g);addMesh(new THREE.ConeGeometry(0.4,0.6,6),gd,0,4.75,0,g);
    addMesh(new THREE.CylinderGeometry(0.05,0.05,1.2,5),M(0x4a4a50),0,3.7,0,g);const B=bigBell(0,3.1,0,1.25,{pitch:[1,1.26,0.75][i]});g.add(B.g);B.g.position.set(0,3.1,0);
    const ringT=new THREE.Mesh(new THREE.TorusGeometry(1.6,0.08,6,32),MB(i===2?0xffffff:PCOL[i],{transparent:true,opacity:0}));ringT.rotation.x=-Math.PI/2;ringT.position.set(x,-1.95,z);W.group.add(ringT);
    const appr=new THREE.Mesh(new THREE.TorusGeometry(1.6,0.06,6,32),MB(i===2?0xffffff:PCOL[i],{transparent:true,opacity:0}));appr.rotation.x=-Math.PI/2;appr.position.set(x,-1.94,z);W.group.add(appr);
    [g,ringT,appr].forEach(o=>o.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;}));
    const K4={g,B,x,z,i,ringT,appr,last:-9};if(i<2)W.hittables.push({pos:new V3(x,-1.2,z),r:1.7,push:false,alive:()=>F.phase===4&&S4.st!=='off',onHit:h=>s4Ring(K4,h)});return K4;});
  const beatHud=(()=>{const d=document.createElement('div');d.id='k2beat';d.style.cssText='position:fixed;left:50%;top:21%;transform:translateX(-50%);display:none;gap:14px;z-index:6;pointer-events:none;font:700 22px ZCComfortaa,sans-serif;color:#fff;text-shadow:0 2px 6px #000';
    for(let i=0;i<4;i++){const s=document.createElement('span');s.textContent=['РАЗ','ДВА','ТРИ','БОМ!'][i];s.style.cssText='opacity:0.35;transition:transform .1s';d.appendChild(s);}document.body.appendChild(d);return d;})();
  const onLeave0=W.onLeave;W.onLeave=()=>{onLeave0();beatHud.style.display='none';beatHud.remove();};
  function s4Ring(K4,h){if(G.time-K4.last<0.25)return;K4.last=G.time;K4.B.ring();FX.ring(K4.x,-1.9,K4.z,5,0.8,0xffe08a);
    if(S4.st==='strike'||S4.st==='come'){const dt0=G.time-S4.strikeAt;const win=(players[h.player].path==='easy'?0.45:0.35)+(SOLO()?0.08:0);
      if(Math.abs(dt0)<=win){S4.hit[K4.i]=G.time;key(new V3(K4.x,1.6,K4.z),'Бом!','#ffd76a');}else{key(new V3(K4.x,1.6,K4.z),dt0<0?'Рано!':'Поздно!','#cfe8ff');}}}
  function s4Start(){F.phase=4;S4.st='gap';S4.t=0;S4.ok=0;S4.wave=0;S4.beat=-1;music('vod4');FX.rain(false);beatHud.style.display='flex';
    // герои у колоколов: Игрок 1 — у левого, Игрок 2 — у правого (в одиночку оставленный у второго звонит сам)
    HEROES.forEach((h,i)=>{const B=BELL4[h.player];placeOnGround(h,B.x+(i%2?1.2:-1.2),B.z+1.8,-1.8);h.vel.set(0,0,0);h.following=false;});snapCams();
    card(4,'Этап 4 · Великий вал','три волны — три удара колоколов',p=>'Средний колокол отбивает «раз — два — три». На «БОМ!» ударь свой колокол '+K(p,'attack')+' — круг сойдётся с кругом.<br>'+(SOLO()?'Одному: у второго колокола стоит оставленный — он звонит сам, в лад.':'Оба разом — и волна разобьётся о звон!')+' Три верных удара — вал расступится.');}
  function s4NewWave(){S4.st='come';S4.t=0;S4.hit=[null,null];S4.strikeAt=G.time+S4.beatLen*4;S4.beat=-1;const VA=S4.roll||(S4.roll=FX.val(22,3.2,{alpha:0.85,debris:false}));VA.root.visible=true;VA.lip=0;
    V.set(vod.k2,'roar','angry');sayV(['Ва-а-ал!','Ещё волна!','Весь омут — на вас, держитесь!'][S4.wave]||'Ва-а-ал!',1.6);}
  function s4Tick(dt){const S=S4;S.t+=dt;const VA=S.roll;if(S.wall)S.wall.tick(dt);if(VA&&VA.root.visible)VA.tick(dt);
    if(S.st==='gap'){if(S.t>(S.wave?1.6:2.2))s4NewWave();}
    else if(S.st==='come'||S.st==='strike'){const left=S.strikeAt-G.time,k=1-left/(S.beatLen*4);
      const z=lerp(C.z-11,BELL4[0].z+0.4,clamp(k,0,1.1));VA.set(C.x,-2,z-2.0*3.2*0.55,0);VA.groundY=-2;
      const b=Math.floor(k*4);if(b!==S.beat&&b>=0&&b<4){S.beat=b;[...beatHud.children].forEach((s,i)=>{s.style.opacity=i===b?'1':'0.35';s.style.transform=i===b?'scale(1.35)':'scale(1)';s.style.color=i===3&&b===3?'#ffd76a':'#fff';});
        if(b<3){BELL4[2].B.ring();FX.ring(BELL4[2].x,-1.9,BELL4[2].z,4,0.6);tone(220,0.2,'triangle',0.12);}}
      for(const K4 of BELL4){if(K4.i===2)continue;const q=clamp(left/(S.beatLen*3),0,1);K4.appr.material.opacity=left>0?0.85:0;K4.appr.scale.setScalar(1+q*2.4);K4.ringT.material.opacity=0.85;}
      // оставленный у колокола звонит сам, в лад (в одиночку)
      if(SOLO()&&left<=0.02&&left>-0.1)for(const K4 of BELL4.slice(0,2)){if(S.hit[K4.i]!=null)continue;const holder=HEROES.find(h=>!(h.active&&h.player===G.soloPi)&&hd(h.pos,K4)<3.2);if(holder){S.hit[K4.i]=G.time;K4.B.ring();K4.last=G.time;key(new V3(K4.x,1.6,K4.z),'Бом!','#ffd76a');}}
      if(left<=0.3)S.st='strike';
      const win=0.45+(SOLO()?0.08:0);
      if(S.hit[0]!=null&&S.hit[1]!=null){s4Good();}
      else if(left<-win){s4Miss();}}
    else if(S.st==='part'||S.st==='crash'){if(S.t>1.4){S.st='gap';S.t=0;BELL4.forEach(K4=>{K4.appr.material.opacity=0;});}}}
  function s4Good(){const S=S4,VA=S.roll;S.ok++;S.wave++;S.st='part';S.t=0;SFX.horn&&SFX.horn();shakeAll(0.05,0.4);beatHud.children[3].style.transform='scale(1.6)';
    const p=VA.root.position.clone();for(let i=0;i<14;i++)later(i*0.04,()=>FX.splash(new V3(rand(-10,10),-1,p.z+2),1.5));FX.ring(C.x,-1.9,BELL4[0].z,14,1.2,0xffe08a);anim(0.6,k=>{VA.root.scale.set(1+k*0.6,Math.max(0.01,1-k),1);},()=>{VA.root.visible=false;VA.root.scale.set(1,1,1);});
    banner(['Раз!','Два!','Три!'][S.ok-1]||'Бом!','#ffd76a',1,S.ok<3?'волна разбилась о звон':'');sayV(S.ok<3?line('hurt'):'Ох… звон-то какой…',1.6,S.ok<3?'hurt':'tired');
    if(S.ok>=3){S.st='done';later(1.0,sceneParting);}}
  function s4Miss(){const S=S4,VA=S.roll;S.st='crash';S.t=0;SFX.crash();SFX.wave();shakeAll(0.08,0.6);const L=HEROES.filter(h=>h.active&&!players[h.player].downed);
    for(const h of L){if(damageHero(h,{kind:'hazard',ref:{pos:new V3(h.pos.x,-2,h.pos.z-3)}})){h.vel.z=7;h.vel.y=4;}FX.splash(h.pos.clone(),1.2);}VA.root.visible=false;
    key(new V3(C.x,1,BELL4[0].z),S.hit[0]==null&&S.hit[1]==null?'Не в лад! Ждите «БОМ!»':'Нужно оба колокола — разом!','#cfe8ff');sayV(line('tease'),1.6,'happy');
    if(!F.s4Told){F.s4Told=true;for(const p of[0,1])tip(p,'Смотри на круг у своего колокола: сойдётся с кольцом — бей '+K(p,'attack')+'! На «БОМ!»',3);}}
  /* ---------- камера арены: дальше и ниже — виден горизонт и вал; окно уязвимости — короткий наезд ---------- */
  function arenaCam(){const a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1),mid=new V3((a.pos.x+b.pos.x)/2,0,(a.pos.z+b.pos.z)/2);let look,off;
    if(F.phase>=4&&F.phase<4.5){look=new V3(lerp(C.x,mid.x,0.3),4.2,C.z-7);off=new V3(0,8.5,27);}
    else if(F.phase>=4.5&&F.phase<5){look=new V3(lerp(C.x,mid.x,0.4),-0.6,lerp(C.z-1.5,mid.z,0.35));off=new V3(0,7.5,15);}
    else if(F.phase>=2&&F.phase<3){look=new V3(lerp(C.x,mid.x,0.3),3.2,lerp(C.z-1.5,mid.z,0.25));off=new V3(0,8.6,18.5);}
    else{look=new V3(lerp(C.x,mid.x,0.3),1.4,lerp(C.z-1.2,mid.z,0.3));off=new V3(0,9.4,16.8);}
    off.multiplyScalar(1-0.2*BS.zoom);return {pos:look.clone().add(off),look,k:3};}
  BS.zoom=0;
  /* ---------- общий шаг боя ---------- */
  W.updates.push(dt=>{setBar();BS.zoom=Math.max(0,BS.zoom-dt*0.8);if(!vod||G.cine||F.out)return;const e=vod;e.dazeT=e.dazeT||0;
    if(F.phase>=1&&F.phase<4)winTick();
    if(F.phase===1)s1Tick(dt);else if(F.phase===2)s2Tick(dt);else if(F.phase===3)s3Tick(dt);else if(F.phase===4)s4Tick(dt);
    // эмоции по силе: злость → обида → усталость
    if(F.phase>=1&&F.phase<4&&!(e.dazeT>0)&&e.state!=='broken'){const k=e.embers/e.maxEmb;const st=e.k2.st;if(st.emo!=='surprise'&&st.emo!=='happy')st.emo=k>0.6?'angry':k>0.3?'hurt':'tired';}
    if(e.state==='broken'&&F.phase<4){V.set(e.k2,'dazed','tired');if(!F.brTold||F.brTold!==F.phase){F.brTold=F.phase;key(e.pos.clone().add(new V3(0,e.L.top*e.s+0.8,0)),'Пробой! Добивай!','#fff2b0');}}
    // рассыпался клубком — подсказка этапа (одна на этап); вдвоём рассыпались разом — этап сначала (сила Водяного — как в начале этапа)
    for(const p of[0,1]){if(players[p].downed&&BS.downTold!==F.phase+':'+p&&W.k2hint){BS.downTold=F.phase+':'+p;tip(p,W.k2hint(p),5);}}
    if(!SOLO()&&F.phase>=1&&F.phase<4&&players[0].downed&&players[1].downed&&!BS.wiped){BS.wiped=true;e.embers=e.maxEmb;BS.lastEmb=e.embers;BS.zap=0;e.dazeT=0;if(e.state==='broken')e.state='idle';
      if(F.phase===2)V.resetFlowers(e.k2);banner('Этап сначала!','#cfe8ff',2.4,'отметка у входа — и снова в омут');sayV(line('tease'),1.8,'happy');}
    if(BS.wiped&&!players[0].downed&&!players[1].downed)BS.wiped=false;
    // долгая заминка — одна подсказка
    BS.idleT+=dt;if(BS.idleT>28){BS.idleT=0;for(const p of[0,1])tip(p,W.k2hint?W.k2hint(p):'',4);}});
  // ---------- карточка этапа: баннер + одна подсказка на игрока ----------
  function card(n,title,sub,tipFn){banner(title,'#7ad0a0',3,sub);W.k2hint=tipFn;BS.idleT=0;later(0.8,()=>{for(const p of[0,1])tip(p,tipFn(p),5.5);});}
  /* ---------- ролики ---------- */
  const play2=def=>{play(def);try{const cd=CINE.CD&&CINE.CD();if(cd&&cd.S===G.cine){cd.inserts=false;cd.cover=[];}}catch(err){}};   // без авто-врезок: крупный Водяной, врезка «по оси взгляда» попадала внутрь него
  function intro(){bb.style.display='block';OM.chop=0.25;HEROES.forEach((h,i)=>{placeOnGround(h,-4.5+i*3,4,1);h.face=Math.PI;});ko.g.visible=true;
    play2({dur:16,fov:48,camK:2.6,shots:[shot(0,[6,6,10],[-8,5,-26]),shot(4.4,[-11,8.6,-24],[-15,11.4,-31],[-12,9.4,-25.6],[-15,11.6,-31],3),shot(9.2,[-7,4.2,-5],[0.8,2.4,-14.6]),shot(12.6,[4.5,3.4,-5],[0.8,3.2,-14.6],[6,4,-6.5],[0.8,3.4,-14.6],3)],
      says:[[0.3,4,null,'<i>Омут. На высокой скале — фигура чёрная, тонкая,</i><br><i>Смотрит сверху; на руке перстень блестит звонкий.</i>',true],[4.6,3.6,null,'<i>Подошли герои ближе — а на скале уж никого.</i>',true],
        [9.3,3.2,null,'<i>На коряге Водяной сидит — дед лягушачий, борода в тине,</i><br><i>Корона из кувшинок на макушке, на соме, как на перине.</i>',true],[12.6,2.6,'vod','Буль-буль-буль! Кто там звенел, кто спать мешал?'],[14.6,1.4,'zven','Держитесь вместе!']],
      events:[{t:1.6,fn:()=>{glint.visible=true;const p=new V3();ko.hand.getWorldPosition(p);glint.position.copy(p);anim(0.8,k=>{glint.scale.setScalar(1+Math.sin(k*Math.PI)*3);});later(0.9,()=>{glint.visible=false;});tone(3200,0.3,'sine',0.12);}},
        {t:7.6,fn:()=>{anim(0.8,k=>{ko.g.scale.setScalar(0.9*(1-k)+0.001);});later(0.85,()=>{ko.g.visible=false;ko.g.scale.setScalar(0.9);});SFX.keys();}},
        {t:9.2,fn:()=>{spawnVod();vod.state='idle';vod.setScale(1.2);V.set(vod.k2,'idle','neutral');SOM.g.visible=true;somAt(new V3(C.x+0.8,0,C.z-0.6),0.6);SOM.g.updateMatrixWorld(true);const p=SOM.saddle.getWorldPosition(new V3());vod.pos.set(p.x,p.y-0.2,p.z);vod.face=0.6;
          FX.crown(new V3(C.x,surf(),C.z),2);snag.visible=false;}},
        {t:12.6,fn:()=>{V.set(vod.k2,'roar','angry');for(let i=0;i<10;i++)later(i*0.12,()=>FX.drop(vod.pos.clone().add(new V3(rand(-1,1),3.6,1)),new V3(rand(-1,1),rand(2,4),rand(0,2)),0.14));SOM.thrash=1;}}],
      tick:(t,dt)=>{if(vod&&SOM.g.visible){SOM.tick(dt);SOM.g.updateMatrixWorld(true);const p=SOM.saddle.getWorldPosition(new V3());vod.pos.set(p.x,p.y-0.2,p.z);vod.face=SOM.g.rotation.y;}},
      end:()=>{if(!vod)spawnVod();F.phase=1;snag.visible=false;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-5.4,1);h.face=Math.PI;h.following=false;});W.clampR={x:C.x,z:C.z,r:R-0.7};W.camFn=arenaCam;snapCams();s1Start();}});}
  function scene2(){const e=vod;e.dazeT=0;e.state='idle';S1.st='off';whiskGlow.visible=false;
    play2({dur:9,fov:48,shots:[shot(0,[7,4,-4],[0,1,-14]),shot(3.6,[0,9,-1],[0,1,-14],[3,10,-3],[0,1,-14],5)],
      says:[[0.3,3,'vod','Ах так?! Сом устал — кони не устанут!'],[3.8,3,null,'<i>Из омута поднялся остров, а вокруг поскакал табун — гривы из пены.</i>',true],[7,1.8,'zven','Раковины на мелях! Сыграйте — конь замрёт!']],
      events:[{t:0.4,fn:()=>{V.set(e.k2,'roar','angry');FX.column(SOM.g.position.x,surf(),SOM.g.position.z,4,1,2);later(0.4,()=>{SOM.g.visible=false;});}},
        {t:1.6,fn:()=>{ISL.col.on=true;anim(2,k=>{ISL.g.position.y=-4+4*smooth(k);});FX.column(C.x,surf(),C.z,6,1.6,2.6);shakeAll(0.05,1.2);const from=e.pos.clone();anim(1.6,k=>{e.pos.lerpVectors(from,new V3(C.x,3.2,C.z),smooth(k));e.pos.y+=Math.sin(k*Math.PI)*2;});}},
        {t:3.6,fn:()=>{K2FX.lightning();s2Start();V.set(e.k2,'conduct','happy');}},{t:6.5,fn:()=>K2FX.lightning()}],
      tick:(t,dt)=>{for(const H of S2.horses){H.tick(dt);}},end:()=>{if(F.phase!==2)s2Start();}});}
  function scene3(){const e=vod;e.dazeT=0;e.state='idle';S2.st='off';S2.horses.forEach(H=>{if(H.g.visible)FX.crown(H.g.position.clone().setY(surf()),1.2);H.g.visible=false;H.state='off';if(H.rider){H.rider.k2ride=null;H.rider=null;}});   // табун рассыпается пенойSH2.forEach(S=>{S.g.visible=false;S.ref.off=true;S.ref.hum=0;});
    play2({dur:9.5,fov:50,shots:[shot(0,[0,4,-3],[0,2,-14]),shot(4,[8,7,-5],[0,0,-14],[6,9,-2],[0,-1,-14],5)],
      says:[[0.3,2.8,'vod','Буль-буль… А ну-ка, угадайте, где я!'],[3.6,3.4,null,'<i>Омут закрутился воронкой — и Водяных стало трое.</i>',true],[7.2,2,'zven','Пелагея, Совиный взор! Прошка — рогатку!']],
      events:[{t:0.6,fn:()=>{OM.swirl=1;SFX.wave();anim(2,k=>{ISL.g.position.y=-4*smooth(k);});later(2,()=>{ISL.col.on=false;});const from=e.pos.clone();anim(1.4,k=>{e.pos.lerpVectors(from,new V3(C.x,-0.9,C.z),k);});}},
        {t:4,fn:()=>{s3Start();}},{t:5.5,fn:()=>K2FX.lightning()}],
      end:()=>{if(F.phase!==3)s3Start();}});}
  function scene4(){const e=vod;e.dazeT=0;e.state='idle';S3.st='off';S3.fakes.forEach(f=>{f.g.visible=false;});BUDS.forEach(B=>{B.g.visible=false;});S3.rafts.forEach(Rf=>{Rf.col.on=false;W.group.remove(Rf.g);W.cyls.splice(W.cyls.indexOf(Rf.col),1);});S3.rafts.length=0;markS.g.visible=false;
    vod.r=FOE.vodyanoy.r*1.3;
    play2({dur:12,fov:52,shots:[shot(0,[0,2.5,-2],[0,3,-16]),shot(3.8,[10,5,0],[0,6,-22],[8,6,2],[0,7,-22],4),shot(8.2,[5.5,2.2,0.5],[-2,0,-12])],
      says:[[0.3,3,'vod','Ну, держитесь! Весь омут — на вас! Валом смою!'],[3.8,3.6,null,'<i>Водяной вырос выше ёлок, за ним встала стена воды — а омут ушёл к ней, до дна.</i>',true],
        [7.6,2.2,null,'<i>А на дне — камни Китежа и три колокола.</i>',true],[10,1.8,'zven','В лад! На «бом» — бейте!']],
      events:[{t:0.5,fn:()=>{OM.swirl=0;SFX.wave();shakeAll(0.07,1.6);V.set(e.k2,'roar','angry');const from=e.pos.clone();anim(2.6,k=>{e.setScale(lerp(1.3,3.0,smooth(k)));e.pos.lerpVectors(from,new V3(C.x,-2,C.z-8.6),smooth(k));e.face=0;});}},
        {t:2.2,fn:()=>{S4.wall=FX.val(30,13,{alpha:0.9,depth:0.2});S4.wall.set(C.x,-2,C.z-15.5,0);S4.wall.groundY=-2;S4.wall.root.scale.set(1,0.01,1);anim(2.2,k=>{S4.wall.root.scale.y=Math.max(0.01,smooth(k));});
          setWater(zone,'low');for(let i=0;i<16;i++)later(i*0.1,()=>FX.splash(new V3(rand(-10,10),0,C.z-10),1.6));}},
        {t:6,fn:()=>{BELL4.forEach((K4,i)=>{anim(1.2,k=>{K4.g.position.y=-8+6*smooth(k);});later(i*0.2,()=>FX.column(K4.x,-2,K4.z,3,0.9,1.4));});}}],
      tick:(t,dt)=>{if(S4.wall)S4.wall.tick(dt);},
      end:()=>{BELL4.forEach(K4=>{K4.g.position.y=-2;});e.setScale(3.0);e.pos.set(C.x,-2,C.z-8.6);e.face=0;s4Start();}});}
  function sceneParting(){const e=vod;beatHud.style.display='none';FIN.music.play('');
    play2({dur:7,fov:50,shots:[shot(0,[3.4,1.1,-2.6],[-0.5,6,-20]),shot(3.4,[5.5,3,-4],[0,-0.6,-13.5],[4.5,2.6,-5],[0,-0.8,-13.5],3)],
      says:[[0.4,2.6,null,'<i>Звон Китежа — и вал расступился.</i>',true],[3.6,2.2,'vod','Ой-ой… вода ушла… буль… буль…'],[5.8,1.2,'zven','Вместе — разом!']],
      events:[{t:0.3,fn:()=>{const Wl=S4.wall;if(Wl){const L=Wl.root;anim(2.4,k=>{L.scale.x=1+k*0.9;L.scale.y=Math.max(0.01,1-k);L.position.y=-2-k*3;},()=>{L.visible=false;});}FX.beam(new V3(C.x,-2,C.z-4),true);
          SFX.horn&&SFX.horn();for(let i=0;i<20;i++)later(i*0.08,()=>FX.splash(new V3(rand(-12,12),2,C.z-12+rand(-1,1)),1.8));}},
        {t:1.2,fn:()=>{const from=e.pos.clone();anim(2.2,k=>{e.setScale(lerp(3.0,1.4,smooth(k)));e.pos.lerpVectors(from,new V3(C.x,-2,C.z-1.5),smooth(k));});V.set(e.k2,'fish','surprise');}}],
      end:()=>{F.phase=4.5;e.state='broken';e.t=0;e.bdur=999;e.embers=0;e.setScale(1.4);e.pos.set(C.x,-2,C.z-1.5);V.set(e.k2,'fish','surprise');banner('Общий удар!','#ffd76a',2.6,'ударьте '+K(0,'attack')+' и '+K(1,'attack')+' разом — Богатырский мах');
        for(const p of[0,1])tip(p,'Водяной на дне хлопает губами! Подбегите и ударьте '+K(p,'attack')+' ОБА РАЗОМ.',4);}});}
  function win(){F.won=true;F.phase=5;SFX.horn();banner('Богатырский мах!','#ffd76a',2,'вместе — вдвое сильней');G.stats.bogatyr++;F.slow=0.9;shakeAll(0.09,0.8);K2FX.flash(1);try{CINE.moodFlash('#ffe08a',0.3,1.4);}catch(err){}
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2;later(i*0.04,()=>FX.crown(new V3(C.x+Math.cos(a)*rand(2,8),-1.9,C.z+Math.sin(a)*rand(2,8)),1.4));}FX.beam(null,false);
    BELL4.forEach(K4=>K4.B.ring());later(1.4,ending);}
  function ending(){const e=vod;bb.style.display='none';beatHud.style.display='none';FIN.music.play(null);
    // Китеж поднимается куполами вдали
    const kz=new THREE.Group();kz.position.set(0,-14,-62);W.group.add(kz);{const wl=M(0xf0e8d8),gd=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.5});
      for(const[x,h,s]of[[-14,8,1],[-7,11,1.2],[0,14,1.5],[7,10,1.1],[14,7,0.9]]){addMesh(new THREE.CylinderGeometry(1.6*s,1.8*s,h,10),wl,x,h/2,0,kz);addMesh(new THREE.SphereGeometry(1.5*s,12,9),gd,x,h+1.2*s,0,kz).scale.set(1,1.35,1);addMesh(new THREE.ConeGeometry(0.25*s,1.4*s,6),gd,x,h+3.2*s,0,kz);}}
    play2({dur:24,fov:48,camK:2.4,shots:[shot(0,[5,1.2,-3],[0,-0.6,-13.5]),shot(6.6,[0,10,8],[0,0,-20]),shot(11.4,[0,4,-6],[0,6,-60],[0,6,-8],[0,8,-60],4),shot(16.2,[T.yosha.pos.x-2.6,T.yosha.pos.y+1.5,T.yosha.pos.z+2.8],[T.yosha.pos.x,T.yosha.pos.y+0.4,T.yosha.pos.z]),shot(19.6,[-10,9,-22],[-15,11.2,-31])],
      says:[[0.3,3,null,'<i>Водяной звено выплёвывает…</i>',true],[3.4,3.2,'vod','Ладно уж… Не буду буянить, коль звонить будете.'],[6.8,3.6,null,'<i>Колокола Китежа звенят медленно, как колыбельная;</i><br><i>Вода светлеет, омут полнится — тихий, хрустальный.</i>',true],
        [11.6,3.6,null,'<i>А вдали над морем — золотые купола: Китеж-град слушает свой звон.</i>',true],[16.2,2.8,'yosha','<i>(шёпотом)</i> Тише. Пусть спит, не будите.'],[19.6,3.6,null,'<i>На скале перстень блеснул — и тонкая тень ушла.</i>',true]],
      events:[{t:0.6,fn:()=>{V.set(e.k2,'idle','tired');e.state='idle';const L=linkItem(e.pos.x,1,e.pos.z);const to=T.proshka.pos.clone();anim(1.2,k=>{L.base=1+Math.sin(k*Math.PI)*3;L.pos.x=lerp(e.pos.x,to.x,k);L.pos.z=lerp(e.pos.z,to.z,k);});later(1.3,()=>takeItem(L,T.proshka));}},
        {t:3.4,fn:()=>{V.set(e.k2,'yawn','tired');}},
        {t:6.8,fn:()=>{for(let i=0;i<8;i++)later(i*0.9,()=>{tone(523*[1,0.84,0.75,0.84][i%4],1.6,'sine',0.22);tone(262,1.8,'sine',0.1);BELL4[i%3].B.ring();});lullaby(LUL1,0.55,0.4,0.12);
          setWater(zone,'high');OM.chop=0.05;OM.U.uDeep.value.set(0x2a7a8e);OM.U.uShal.value.set(0x7ad6d8);V.set(e.k2,'sleep','sleep');SOM.g.visible=true;somAt(new V3(C.x+4,0,C.z+2),2.2);SOM.roll=0;SOM.amp=0.5;
          anim(3,k=>{SOM.roll=Math.sin(k*Math.PI*2)*1.6;});}},
        {t:7,fn:()=>{for(let i=0;i<14;i++)later(1+i*0.6,()=>{FX.drop(e.pos.clone().add(new V3(0,3.4,0.8)),new V3(0,1.2,0.4),0.14,{noRing:true});if(i%4===0)ft(e.pos.clone().add(new V3(0,4.6,0)),'З-з-з…','#cfe8ff');});}},
        {t:11.4,fn:()=>{anim(4,k=>{kz.position.y=-14+14*smooth(k);});SFX.horn&&SFX.horn();BELL4.forEach(K4=>{const y0=K4.g.position.y;anim(3.5,k=>{K4.g.position.y=y0-7*smooth(k);});});}},   // колокола уходят на дно, звеня
        {t:16.2,fn:()=>{if(F.kitten&&CH.kit){const kp=CH.kit.g.position;ft(kp.clone().add(new V3(0,0.9,0)),'Мур-р…','#ffd0a0');tone(220,0.6,'sine',0.08,180);}}},
        {t:19.4,fn:()=>{ko.g.visible=true;ko.g.rotation.y=Math.PI*0.8;glint.visible=true;const p=new V3();ko.hand.getWorldPosition(p);glint.position.copy(p);anim(0.8,k=>{glint.scale.setScalar(1+Math.sin(k*Math.PI)*3);});SFX.keys();
          later(2.6,()=>{anim(0.8,k=>{ko.g.scale.setScalar(0.9*(1-k)+0.001);});glint.visible=false;});}}],
      tick:(t,dt)=>{SOM.tick(dt);if(S4.wall)S4.wall.tick(dt);},
      end:()=>{F.out=true;W.camFn=null;banner('Водяной спит','#ffd76a',2.4,'колокола Китежа буйную воду убаюкали');later(2.2,finishLevel);}});}
  /* ---------- погоня (late_99s) ---------- */
  const CH=FIN.k2chase({bank,rock,intro});
  /* ---------- рисунки кнопок и задачи боя ---------- */
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'guard',()=>headOf(h()),()=>W.bolts.some(b=>b.tgt===h()&&!b.refl&&b.eta<0.8),'отбей!');
    prompt(pi,'roll',()=>headOf(h()),()=>F.phase===1&&S1.st==='tele'&&Math.hypot(h().pos.x-S1.sh.x,h().pos.z-S1.sh.z)<5);
    prompt(pi,'attack',()=>headOf(h()),()=>vod&&(vod.state==='broken'||vod.dazeT>0)&&hd(vod.pos,h().pos)<4+vod.r,()=>F.phase===4.5?'разом!':'бей!');
    prompt(pi,'jump',()=>headOf(h()),()=>F.phase===2&&S2.horses.some(H=>H.state==='wait'&&H.by!==h()&&!h().kwHold&&Math.hypot(h().pos.x-H.g.position.x,h().pos.z-H.g.position.z)<3),'верхом!');
    prompt(pi,'item',()=>headOf(h()),()=>{if(F.phase!==2)return false;const S=FIN.kwShellAt(h());return !!S&&SH2.includes(S)&&S.ref.hum<1;},'сыграй!');
    prompt(pi,'swap',()=>headOf(h()),()=>SOLO()&&F.phase===2&&SH2.some(S=>S.ref.by===h()&&S.ref.hum>0)&&!h().kwHold,'оставь — держит коня');
    prompt(pi,'attack',()=>headOf(h()),()=>F.phase===4&&(S4.st==='come'||S4.st==='strike')&&BELL4.slice(0,2).some(K4=>hd(K4,h().pos)<3.2),'на «БОМ!»');}
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&((F.phase===1&&S1.st==='beached'&&!S1.whisk)||(F.phase===3&&!(vod&&vod.dazeT>0))),()=>F.phase===3?'в настоящего!':'в ус!');
  prompt(0,'skill',()=>headOf(T.potap),()=>T.potap.active&&F.phase===1&&S1.st==='beached'&&S1.whisk&&hd(T.potap.pos,whiskTip)<2.6,'хватай ус!');
  prompt(0,'swap',()=>headOf(active(0)),()=>F.phase===1&&S1.st==='beached'&&((!S1.whisk&&!T.proshka.active)||(S1.whisk&&!T.potap.active)),()=>S1.whisk?'Потап!':'Прошка!');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>T.pelageya.active&&F.phase===3&&S3.owl<=0&&!(vod&&vod.dazeT>0),'взор!');
  prompt(1,'skill',()=>headOf(T.yosha),()=>T.yosha.active&&F.phase===3&&BUDS.some(B=>B.g.visible&&hd(T.yosha.pos,B)<3.2),'полей бутон!');
  const ph=(n,fn,done,tg)=>pi=>O(()=>fn(pi),done,tg);
  const OF=[ph(1,pi=>S1.st==='stun'?'Водяной застрял на мели — бей '+K(pi,'attack')+'!':S1.st==='beached'||S1.st==='pull'?(S1.whisk?'Потап, хватай ус '+K(0,'skill')+' — раз, два, три!':'Сом на мели! Прошка — рогатку в ус '+K(0,'skill')+'!'):
        'Этап 1 · Сом-перевозчик. Синий круг — щит '+K(pi,'guard')+' в последний миг; красная дорожка — в сторону.<br>Сом бросится на мель — сбей ему ус и тяни! Запал: '+Math.round(BS.zap*100)+'%',()=>F.phase>1,()=>vod?[vod.g]:[]),
    ph(2,pi=>S2.onIsl?'На острове! Бей по короне '+K(pi,'attack')+' — кувшинки облетают!':'Этап 2 · Водяные кони. Сыграй у раковины '+K(pi,'item')+' — конь замрёт; садится другой '+K(pi,'jump')+'.<br>Красный круг на воде — кони меняют ряд.',()=>F.phase>2,()=>F.phase===2?SH2.map(S=>S.g):[]),
    ph(3,pi=>vod&&vod.dazeT>0?'Метка горит — бей настоящего '+K(pi,'attack')+'!':'Этап 3 · Омут-зеркало. Совиный взор — настоящий; рогатка — метка; плот-кувшинка — к середине.',()=>F.phase>3,()=>F.phase===3?[vod.g]:[]),
    ph(4,pi=>F.phase===4.5?'Водяной на дне! Ударьте '+K(pi,'attack')+' ОБА РАЗОМ!':'Этап 4 · Великий вал. На «БОМ!» — бей свой колокол '+K(pi,'attack')+'. Волн разбито: '+S4.ok+' / 3',()=>!!F.won,()=>F.phase>=4?BELL4.slice(0,2).map(K4=>K4.g):[])];
  for(const pi of[0,1])W.objectives[pi]=[...CH.objectives.map(f=>f(pi)),O('Омут…',()=>F.phase>=1,()=>[]),...OF.map(f=>f(pi)),O('Колокола Китежа…',()=>false,()=>[])];
  W.spawns=[[new V3(-1.5,1,196),new V3(-3,1,198)],[new V3(1.5,1,196),new V3(3,1,198)]];W.startAct=[0,0];
  W.pauseLine='Погоня: вал по пятам — дуб, мельница (Потап держит колесо), кувшинки по напеву, ручей, развилка со шлюзом, камыш, лодка Садко, плетень.<br>'+
    'Водяной, четыре этапа. Сом: шары отбивай щитом в последний миг, сом на мели — рогатку в ус, Потап тянет. Кони: сыграй у раковины — садится другой.<br>'+
    'Зеркало: Совиный взор, рогатка в настоящего, кувшинка-плот. Вал: на «БОМ!» — каждый свой колокол; потом общий удар.';
  W.onStart=()=>{later(0.4,CH.chaseScene);};
  W.dbg2b=()=>({F,WV:CH.WV,CH,STR:CH.STR,oakCol:CH.oakCol,reedCol:CH.reedCol,gateCol:CH.gateCol,ropes:CH.ropes,RP:CH.RP,vod,CKS:CH.CKS,wave:CH.VAL.root,zone,BS,S1,S2,S3,S4,SOM,SHOAL,SH2,BUDS,BELL4,ISL,OM,whiskTip,
    scene2,scene3,scene4,sceneParting,ending,posSlot,s1Start,s2Start,s3Start,s4Start,s2Mount,s2Island});
  // для ботов: 'boss' — сразу к омуту; 'boss2'…'boss4' — к этапу; участки погони — CH.warp
  W.warp2b=(where)=>{if(where==='boss'){CH.skip();intro();return W.dbg2b();}
    const m=/^boss([1-4])$/.exec(where);if(m){CH.skip();const n=+m[1];W.camFn=arenaCam;snag.visible=false;bb.style.display='block';if(!vod)spawnVod();SOM.g.visible=n===1;W.clampR={x:C.x,z:C.z,r:R-0.7};HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-5.4,1);h.following=false;});snapCams();
      if(n===1)s1Start();else if(n===2){ISL.col.on=true;ISL.g.position.y=0;s2Start();}else if(n===3)s3Start();else{setWater(zone,'low');zone.level=zone.floor;zone.t=1;S4.wall=FX.val(30,13,{alpha:0.9,depth:0.2});S4.wall.set(C.x,-2,C.z-15.5,0);S4.wall.groundY=-2;
        BELL4.forEach(K4=>{K4.g.position.y=-2;});vod.setScale(3.0);vod.pos.set(C.x,-2,C.z-8.6);s4Start();}return W.dbg2b();}
    CH.warp(where);return W.dbg2b();};
  flushDecor();};
