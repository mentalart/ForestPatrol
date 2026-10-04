// ---- продолжение build5B2 (k5epic, часть 14): АКТ III — стадии 8 (буря), 9 (витязи), 10 (Цепной великан) ----
  /* ================= стадия 8 «Колдун несёт богатыря»: прежняя буря + Кощей уносит героя, свист Соловья, Горыныч в небе ================= */
  // Кощей пикирует и уносит героя в тучу (красный круг — кувырок спасает). Схваченный висит в кулаке; тёмный шар летит ко второму —
  // тот отбивает шар другу в небо, схваченный отбивает Кощею в лицо: Кощей разжимает кулак, Жар-птица ловит. Колокол под дубом — свист
  // Соловья: Кощея сдувает ниже, угольки гаснут. Горыныч кружит над поляной и жжёт воронов.
  const gorFly=makeGorynych();gorFly.g.scale.setScalar(0.9);gorFly.g.visible=false;K5L.noRay(gorFly.g);
  function grabTry(){const hs=k5Heroes();if(hs.length<2||ES.grab)return;const h=hs[Math.floor(rand(0,2))];const p=h.pos.clone();barkS(KS,'koschei','А этого — в тучи! Через леса, через моря!',1.6,true);
    k5Zone(p,1.7,G.solo?1.8:1.4,0xc040ff,q=>{if(E.cur!==8||!K5.fight)return;const t=k5Heroes().find(x=>hd(x.pos,q)<1.8&&x.rollT<=0&&G.time-(x.lastRoll||-9)>0.3);if(!t){floatText(q.clone().add(new V3(0,2,0)),'Увернулся!','#9fe0ff');return;}
      ES.grab={h:t,t:0};E.log('grab');k5s('flyUp');floatText(t.pos.clone().add(new V3(0,2,0)),'Унёс!','#c8a8ff');later(0.6,()=>say('zven','Шар — другу в небо! Пусть отобьёт Кощею в лицо!',2.8,true));
      const other=k5Heroes().find(x=>x!==t);if(other&&!K5.orbs.length)later(1.2,()=>{if(ES.grab&&K5.fight)orbThrow(other);});});}
  function grabTick(dt){const G0=ES.grab;if(!G0)return;G0.t+=dt;const h=G0.h,hand=KB.pos.clone().add(new V3(0.8,2.2,0.6));h.pos.copy(hand);h.vel.set(0,0,0);h.grounded=false;
    if(K5.log.length&&K5.log[K5.log.length-1]==='orbhit'&&K5.log.length!==G0.lg){G0.lg=K5.log.length;release(true);return;}
    if(G0.t>(G.solo?7:9)||players[h.player].downed){release(false);}}
  function release(caught){const h=ES.grab.h;ES.grab=null;if(caught){floatText(h.pos.clone().add(new V3(0,1.6,0)),'Жар-птица поймала!','#ffd060');const f=h.pos.clone(),to=new V3(C.x+rand(-3,3),0,C.z+4);
      anim(1.0,k=>{h.pos.lerpVectors(f,to,CE.inOutSine(k));h.pos.y=f.y*(1-k)+Math.sin(k*Math.PI)*1.5;h.vel.set(0,0,0);});later(1.02,()=>placeOnGround(h,to.x,to.z,0));E.log('caught');}
    else{damageHero(h,{kind:'hazard',ref:{pos:h.pos.clone().add(new V3(0,1,0))}});placeOnGround(h,h.pos.x,h.pos.z,0);floatText(h.pos.clone().add(new V3(0,1.6,0)),'Бросил!','#ff9ab8');}}
  E.layer[8]={start(){ES.grabT=G.solo?99:14;ES.grab=null;ES.dark=true;gorFly.g.visible=E.free.gor;gor.g.visible=!E.free.gor;
      E.onWhistle=()=>{if(E.cur===8&&K5.live&&KB.state!=='broken'){K5.dip=2.5;emberOut(KB,1,'Сдуло!');k5StormSet(Math.max(0.4,K5.storm-0.2));}};},
    tick(dt){if(!K5.fight)return;grabTick(dt);if(!ES.grab&&KB.state==='k5cast'){ES.grabT-=dt;if(ES.grabT<=0){ES.grabT=G.solo?99:17;grabTry();}}
      if(E.free.gor){const a=G.time*0.35;gorFly.g.position.set(C.x+Math.cos(a)*14,11,C.z+Math.sin(a)*10);gorFly.g.rotation.y=-a;ES.burnT=(ES.burnT||6)-dt;
        if(ES.burnT<=0){ES.burnT=G.solo?6:8;const r=K5.adds.find(e=>e.kind==='k5raven'&&e.alive);if(r){const p=r.pos.clone();k5Pillar(p.clone().setY(0),0xff8a30,8,0.6,0.6);FX.sparks(p.clone().add(new V3(0,1,0)),16,0xff8a30);k5Kill(r);floatText(p.clone().add(new V3(0,2,0)),'Горыныч!','#ffb060');}}}},
    end(){if(ES.grab)release(false);gorFly.g.visible=false;gor.g.visible=true;E.onWhistle=null;},
    goal:pi=>ES.grab?(ES.grab.h.player===pi?'Ты у Кощея в кулаке! Шар летит — <b>щит</b> '+K(pi,'guard')+' в последний миг — Кощею в лицо!':'Друга унесли! Тёмный шар — <b>отбей щитом</b> '+K(pi,'guard')+' в последний миг — он полетит к другу!'):
      (E.free.solo?'Колокол под дубом — удар или рогатка: <b>Соловей свистнет</b>, Кощея сдует.':''),targets:pi=>[]};
  /* ================= стадия 9 «И тридцать витязей прекрасных»: прежний меч + знамёна Заставы, витязи и богатыри из моря ================= */
  // Из моря выходят тридцать витязей, с ними дядька морской (Водяной); строй ведут Илья, Добрыня и Алёша. Трубит рог — у каждого знамени
  // должен стоять герой: тогда богатыри Богатырским махом сметают костяных щитников и Кощей теряет уголёк. Не успели — встаёт ещё щитник.
  const BAN=[new V3(-8.6,0,-12.5),new V3(8.6,0,-12.5)];
  const banners=BAN.map((p,i)=>{const g=k5Prop(new THREE.Group());g.position.copy(p);addMesh(new THREE.CylinderGeometry(0.07,0.07,3.4,6),M(0x6a4a2a),0,1.7,0,g);
    const fl=addMesh(new THREE.PlaneGeometry(1.4,1.0),M(i?0x2a5ab8:0xb83a2a,{side:THREE.DoubleSide,emissive:i?0x0a1a40:0x400a0a}),0.72,2.9,0,g);g.userData.fl=fl;
    const r=new THREE.Mesh(new THREE.RingGeometry(1.4,1.7,32),k5Add(0xffd76a,{opacity:0.5}));r.rotation.x=-Math.PI/2;r.position.y=0.06;g.add(r);g.userData.r=r;g.visible=false;K5L.noRay(g);return g;});
  const VIT=[];{const kinds=['i','d','a'];for(let i=0;i<9;i++){const b=makeBogatyr(kinds[i%3]);b.g.scale.setScalar(i<3?1.15:0.9);b.g.visible=false;K5L.noRay(b.g);VIT.push(b);}}
  function vitLine(on){VIT.forEach((b,i)=>{b.g.visible=on;const x=-8+i*2,z=i<3?6.5:8.6;b.g.position.set(x,0,z);b.g.rotation.y=Math.PI;b.home=new V3(x,0,z);});}
  function vitCharge(){E.log('vitCharge');SFX.horn&&SFX.horn();say('ilya','За Лукоморье! Богатырским махом — разом!',2.2,true);
    VIT.forEach((b,i)=>{const f=b.home.clone(),to=new V3(C.x+(i-4)*1.6,0,C.z+1);anim(0.9,k=>{b.g.position.lerpVectors(f,to,CE.inOutSine(k));});later(1.0,()=>{anim(1.2,k=>{b.g.position.lerpVectors(to,f,CE.inOutSine(k));});});});
    later(0.9,()=>{shakeAll(0.08,0.4);k5Ring(new V3(C.x,0.1,C.z+1),0xffd76a,1,9,0.6,0.1);for(const e of K5.adds.slice())if(e.kind==='k5bone'&&e.alive){FX.dust(e.pos.clone(),10,0xe8e0c8);k5Kill(e);}if(K5.live&&KB.state!=='broken')emberOut(KB,1,'Витязи!');});}
  E.layer[9]={start(){ES.hornT=10;ES.warn=false;banners.forEach(b=>{b.visible=true;});vitLine(true);if(E.free.vod){FR.vod.m.g.visible=true;FR.vod.m.g.position.set(-10,0,9.5);}
      later(1,()=>{if(E.cur===9)say('vod','О заре прихлынут волны — и витязи из вод выходят! Держите знамёна, ребятки!',3.4,true);});},
    tick(dt){if(!K5.fight)return;ES.hornT-=dt;const warnT=3.2;if(ES.hornT<warnT&&!ES.warn){ES.warn=true;floatText(BAN[0].clone().add(new V3(0,4,0)),'Рог! К знамёнам!','#ffd76a');floatText(BAN[1].clone().add(new V3(0,4,0)),'Рог! К знамёнам!','#ffd76a');}
      banners.forEach((b,i)=>{b.userData.fl.rotation.y=Math.sin(G.time*3+i)*0.3;const at=k5Heroes().some(h=>hd(h.pos,BAN[i])<1.8);b.userData.r.material.opacity=ES.warn?(at?0.95:0.35+0.4*Math.abs(Math.sin(G.time*8))):0.25;b.userData.r.material.color.set(at?0x9fff9a:0xffd76a);});
      if(ES.hornT<=0){ES.hornT=G.solo?16:13;ES.warn=false;const need=G.solo?1:2,got=BAN.filter(p=>k5Heroes().some(h=>hd(h.pos,p)<1.8)).length;
        if(got>=need)vitCharge();else{floatText(C.clone().add(new V3(0,4,4)),'Строй отходит!','#ff9ab8');if(K5.adds.filter(e=>e.kind==='k5bone'&&e.alive).length<4)boneMake(C.x+rand(-5,5),C.z+rand(-3,4));}}},
    end(){banners.forEach(b=>{b.visible=false;});vitLine(false);},
    goal:pi=>'Трубит рог — встаньте <b>у знамён</b> Заставы'+(G.solo?'':' (оба!)')+': богатыри сметут щитников.',targets:pi=>ES.warn?banners:[]};
  /* ================= стадия 10 «Там царь Кащей над златом чахнет» (новая): Цепной великан ================= */
  // Кощей стягивает всё золото — звенья цепи, сокровища — в великана. Великан сгорбился над златом у дуба. Кулак бьёт в красный круг и
  // лежит 6 с — по руке можно взбежать на плечо; с неба сыплются монеты сходящимися кольцами. Колени держат заклёпки-замки: встань у
  // ноги — Леший подымет корни, нога замрёт — бей заклёпку. Обе — великан падает на колено (волна Водяного). Тогда — на плечо (по руке или
  // Горыныч поднимет по «Ко мне!»), и вдвоём — удар в замок на груди. Внутри — детский деревянный молоточек.
  const GC=new V3(0,0,-19);const GLINK=new THREE.TorusGeometry(0.42,0.11,6,12),GLM=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.45});
  const giant=new THREE.Group();giant.position.copy(GC);k5Prop(giant);giant.visible=false;const glinks=[];
  function gChain(par,a,b,n){for(let i=0;i<n;i++){const m=new THREE.Mesh(GLINK,GLM);m.position.lerpVectors(a,b,(i+0.5)/n);m.lookAt(b);m.rotateY(Math.PI/2);if(i%2)m.rotateX(Math.PI/2);par.add(m);glinks.push(m);}}
  const legs=[-1,1].map(s=>{const g=new THREE.Group();g.position.set(s*2.2,0,0);giant.add(g);gChain(g,new V3(0,0,0),new V3(-s*0.2,6.5,0),9);return g;});
  for(let y=6.5;y<=11.5;y+=1.25)for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const m=new THREE.Mesh(GLINK,GLM);m.position.set(Math.cos(a)*2.6,y,Math.sin(a)*1.6);m.rotation.y=-a;giant.add(m);glinks.push(m);}
  const gHead=new THREE.Mesh(new THREE.DodecahedronGeometry(1.6,0),M(0x2a2230,{emissive:0x2a0a3a}));gHead.position.set(0,13.6,0);giant.add(gHead);for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(0.25,8,6),MB(0xb070ff));e.position.set(s*0.6,13.9,1.35);giant.add(e);}
  const crown=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.5,0.9,8,1,true),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6,side:THREE.DoubleSide}));crown.position.set(0,15.3,0);giant.add(crown);
  gChain(giant,new V3(-2.8,11,0),new V3(-4.2,5.5,1.5),7);
  const gArm=new THREE.Group();gArm.position.set(3.2,10.5,0);giant.add(gArm);gChain(gArm,new V3(0,0,0),new V3(0,-10,0),12);const fist=new THREE.Mesh(new THREE.DodecahedronGeometry(1.1,0),GLM);fist.position.set(0,-10.4,0);gArm.add(fist);
  const heart=new THREE.Group();heart.position.set(0,8.8,1.7);giant.add(heart);const heartLock=K5L.lock();heartLock.scale.setScalar(2.2);heart.add(heartLock);const hammer=new THREE.Group();heart.add(hammer);hammer.visible=false;
  addMesh(new THREE.CylinderGeometry(0.06,0.06,0.9,6),M(0x9a6a3a),0,-0.2,0,hammer);addMesh(new THREE.BoxGeometry(0.5,0.25,0.25),M(0xb88a50),0,0.3,0,hammer);
  const kneeR=[-1,1].map(s=>{const r=K5L.lock();r.scale.setScalar(1.3);r.position.set(s*2.2,3.1,0.6);giant.add(r);return r;});
  K5L.noRay(giant);
  const SHW=new V3(GC.x+3.2,10.5,GC.z);const shPlat={minx:SHW.x-1.7,maxx:SHW.x+1.7,miny:SHW.y-0.6,maxy:SHW.y,minz:SHW.z-1.4,maxz:SHW.z+1.8,on:false,occ:false};W.boxes.push(shPlat);
  const gCyls=[-1,1].map(s=>{const c={x:GC.x+s*2.2,z:GC.z,r:1.0,miny:-1,maxy:6,on:false};W.cyls.push(c);return c;});
  // рука лежит — по ней можно идти: поверхность по отрезку кулак → плечо
  W.surfs.push((x,z,reach)=>{const Rm=ES.ramp;if(E.cur!==10||!Rm)return null;const dx=Rm.b.x-Rm.a.x,dz=Rm.b.z-Rm.a.z,L2=dx*dx+dz*dz;let t=((x-Rm.a.x)*dx+(z-Rm.a.z)*dz)/L2;if(t<-0.05||t>1.02)return null;t=clamp(t,0,1);
    const px=Rm.a.x+dx*t,pz=Rm.a.z+dz*t;if(Math.hypot(x-px,z-pz)>1.3)return null;const y=Rm.a.y+(Rm.b.y-Rm.a.y)*t;if(y>reach+0.001)return null;return {y};});
  const rootsM=k5Prop(new THREE.Group());for(let i=0;i<6;i++){const c=addMesh(new THREE.CylinderGeometry(0.1,0.18,3,5),M(0x5a3a1a),Math.cos(i)*0.8,1.2,Math.sin(i)*0.8,rootsM);c.rotation.z=0.5*Math.cos(i*2);}rootsM.visible=false;K5L.noRay(rootsM);
  function kneeW(i){const p=new V3();kneeR[i].getWorldPosition(p);return p;}
  W.hittables.push({pos:new V3(),r:1.3,alive:()=>E.cur===10&&ES.fight&&ES.ph==='knees'&&ES.root!=null&&!ES.knee[ES.root],onHit:h=>{const i=ES.root;ES.kHp[i]-=(h.kind==='potap'?2:1);SFX.clink();FX.sparks(kneeW(i),10,0xffd060);
      if(ES.kHp[i]<=0){ES.knee[i]=true;kneeR[i].visible=false;ES.root=null;ES.rootT=0;rootsM.visible=false;K5L.gold(kneeW(i),16);floatText(kneeW(i).add(new V3(0,1,0)),'Заклёпка долой!','#ffe08a');E.log('knee'+i);if(ES.knee[0]&&ES.knee[1])kneel();}
      else floatText(kneeW(i).add(new V3(0,1,0)),'ещё!','#ffe08a');}});
  const kneeHt=W.hittables[W.hittables.length-1];
  W.hittables.push({pos:new V3(),r:1.6,alive:()=>E.cur===10&&ES.fight&&ES.ph==='heart',onHit:h=>{const pi=h.player;if(h.pos.y<SHW.y-1)return;ES.hb[pi]=G.time;const both=G.solo||Math.abs(ES.hb[0]-ES.hb[1])<1.2;FX.sparks(heart.getWorldPosition(new V3()),12,0xffd060);
      if(both){ES.ph='open';E.log('heart');heartOpen();}else floatText(heart.getWorldPosition(new V3()).add(new V3(0,1.2,0)),'Вдвоём — разом!','#ffe08a');}});
  const heartHt=W.hittables[W.hittables.length-1];
  function kneel(){ES.ph='heart';ES.prog=0.6;barkS(FR.vod.m,'vod','Волна — под колено!',1.4,true);const wv=k5Prop(new THREE.Mesh(new THREE.BoxGeometry(22,3,1),k5eMB(0x7ad8ff,{opacity:0.6})));wv.position.set(0,1.5,8);
    k5fx(1.2,k=>{wv.position.z=8-k*24;},()=>k5Del(wv));later(0.9,()=>{const y0=giant.position.y;anim(0.8,k=>{giant.position.y=y0-3*CE.outBack(k);});shakeAll(0.1,0.5);k5s('stomp');SHW.y=7.5;shPlat.miny=6.9;shPlat.maxy=7.5;shPlat.on=true;
      floatText(SHW.clone().add(new V3(0,2,0)),'Великан на колене! На плечо — и в грудь, вдвоём!','#ffe08a');});}
  function heartOpen(){heartLock.visible=false;hammer.visible=true;K5L.gold(heart.getWorldPosition(new V3()),30);k5Flash(heart.getWorldPosition(new V3()),0xffe0a0,6,0.6);k5s('reveal');
    later(0.4,()=>say('pelageya','Это же… его молоточек. Детский. Деревянный.',3,true));later(3.2,()=>{giantFall();});}
  function giantFall(){E.log('giantFall');shPlat.on=false;ES.ramp=null;shakeAll(0.15,1.0);k5s('shatter');const parts=glinks.map(m=>{const p=new V3();m.getWorldPosition(p);const q=new THREE.Quaternion();m.getWorldQuaternion(q);W.group.attach(m);return {m,v:new V3(rand(-4,4),rand(2,7),rand(-4,4))};});
    k5fx(2.2,(k,dt)=>{for(const P of parts){if(P.m.position.y>0.3){P.v.y-=12*dt;P.m.position.addScaledVector(P.v,dt);P.m.rotation.x+=dt*3;}else P.m.position.y=0.3;}});
    later(2.2,()=>{for(const P of parts){const f=P.m.position.clone(),to=OAK.clone().add(new V3(rand(-2,2),rand(1,8),rand(-2,2)));k5fx(1.2+rand(0,0.6),k=>{P.m.position.lerpVectors(f,to,k);P.m.position.y+=Math.sin(k*Math.PI)*4;},()=>{k5Del(P.m);});}glinks.length=0;});
    for(const h of HEROES)if(h.pos.y>1.5)placeOnGround(h,h.pos.x,h.pos.z+3,0);later(3.6,()=>{giant.visible=false;E.won(10);});}
  E.stage[10]={start(o){E.hub(10);K5L.themeTo('sunset',1);K5.fight=false;liveBoss(false);KS.g.visible=false;dome.visible=false;candles.forEach(c=>{c.g.visible=false;});heroesHome(10);W.clampR={x:C.x,z:C.z-1,r:12.5};E.arenaCam(true,4);
      if(!glinks.length)return E.go(11);giant.visible=true;giant.position.copy(GC);SHW.y=10.5;shPlat.miny=9.9;shPlat.maxy=10.5;shPlat.on=true;gCyls.forEach(c=>{c.on=true;});kneeR.forEach(r=>{r.visible=true;});heartLock.visible=true;hammer.visible=false;
      Object.assign(ES,{ph:'knees',knee:[false,false],kHp:[G.solo?3:4,G.solo?3:4],root:null,rootT:0,arm:'rest',at:2.5,coinT:5,hb:[-9,-9],ramp:null,prog:0,spes:null,fight:false});gArm.quaternion.identity();gArm.scale.set(1,1,1);
      E.cards(10,()=>{ES.fight=true;});},
    tick(dt){if(!ES.fight)return;giant.position.y=(ES.ph==='knees'?0:giant.position.y)+(ES.ph==='knees'?Math.sin(G.time*1.1)*0.12:0);gHead.rotation.y=Math.sin(G.time*0.6)*0.3;kneeHt.pos.copy(ES.root!=null?kneeW(ES.root):new V3(0,-99,0));heartHt.pos.copy(heart.getWorldPosition(new V3()));
      if(E.free.zhar){const a=G.time*0.9,t=ES.ph==='knees'&&ES.root!=null?kneeW(ES.root):heart.getWorldPosition(new V3());FR.zhar.m.g.position.set(t.x+Math.cos(a)*2,t.y+2,t.z+Math.sin(a)*2);}
      ES.prog=ES.ph==='knees'?(ES.knee[0]+ES.knee[1])*0.3:ES.ph==='heart'?0.6:0.95;
      // Леший: встал у ноги на секунду — корни держат её 7 с
      if(ES.ph==='knees'){if(ES.root!=null){ES.rootT-=dt;if(ES.rootT<=0){ES.root=null;rootsM.visible=false;}}
        else for(let i=0;i<2;i++){if(ES.knee[i])continue;const p=new V3(GC.x+(i?2.2:-2.2),0,GC.z);if(k5Heroes().some(h=>hd(h.pos,p)<2.4)){ES.rootW=(ES.rootW||0)+dt;if(ES.rootW>0.8){ES.rootW=0;ES.root=i;ES.rootT=7;rootsM.visible=true;rootsM.position.copy(p);
              barkS(FR.leshy.m,'leshy','Корни, держите!',1.2,true);floatText(p.clone().add(new V3(0,4,0)),'Нога замерла — бей заклёпку!','#b8e070');E.log('root'+i);}break;}}}
      // кулак: замах (красный круг) → удар → рука лежит 6 с (по ней — на плечо) → подъём
      const st=ES.arm;ES.at-=dt;const Q0=new THREE.Quaternion(),sh=new V3(GC.x+3.2,giant.position.y+10.5,GC.z);
      if(st==='rest'&&ES.at<=0&&ES.ph!=='open'){const h=nearH(GC);if(h){let dx=h.pos.x-sh.x,dz=h.pos.z-sh.z;const L=Math.hypot(dx,dz)||1;if(L>10){dx*=10/L;dz*=10/L;}ES.F=new V3(sh.x+dx,0,sh.z+dz);ES.arm='raise';ES.at=G.solo?1.7:1.3;
          k5Zone(ES.F.clone(),2.3,ES.at,0xff3030,()=>{});}}
      else if(st==='raise'){gArm.quaternion.slerp(new THREE.Quaternion().setFromUnitVectors(new V3(0,-1,0),new V3(0,0.75,-0.66).normalize()),Math.min(1,dt*3));
        if(ES.at<=0){const dir=ES.F.clone().add(new V3(0,0.6,0)).sub(sh);gArm.quaternion.setFromUnitVectors(new V3(0,-1,0),dir.clone().normalize());gArm.scale.set(1,dir.length()/10.4,1);
          ES.arm='down';ES.at=6;ES.ramp={a:new V3(ES.F.x,0.6,ES.F.z),b:sh.clone()};shakeAll(0.12,0.4);FX.dust(ES.F.clone().setY(0.2),20,0x8a7a6a,2);k5s('stomp');for(const h of k5Heroes())if(hd(h.pos,ES.F)<2.3&&h.pos.y<1.5)k5Hurt(h,ES.F);}}
      else if(st==='down'){if(ES.at<=0){ES.arm='up';ES.at=1;ES.ramp=null;}}
      else if(st==='up'){gArm.quaternion.slerp(Q0,Math.min(1,dt*4));gArm.scale.y+=(1-gArm.scale.y)*Math.min(1,dt*4);if(ES.at<=0){gArm.quaternion.copy(Q0);gArm.scale.y=1;ES.arm='rest';ES.at=G.solo?3.4:2.4;}}
      // монеты: сходящиеся кольца
      ES.coinT-=dt;if(ES.coinT<=0&&ES.ph!=='open'){ES.coinT=G.solo?9:7;const h=nearH(GC)||active(0);const c=h.pos.clone();c.y=0;const ring=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.8,1,48),k5Add(0xffd060,{opacity:0.9})));ring.rotation.x=-Math.PI/2;ring.position.set(c.x,0.1,c.z);
        const S0={r:9,hit:new Set()};k5fx(2.6,(k,dt2)=>{S0.r=9*(1-k)+0.6;ring.scale.setScalar(S0.r);if(Math.random()<0.5)FX.sparkle(new V3(c.x+Math.cos(G.time*7)*S0.r,2,c.z+Math.sin(G.time*7)*S0.r),1,0xffd060);
          for(const x of k5Heroes()){if(S0.hit.has(x))continue;if(Math.abs(hd(x.pos,c)-S0.r)<0.5&&x.pos.y<0.6){S0.hit.add(x);k5Hurt(x,c);}}},()=>k5Del(ring));}},
    end(){giant.visible=false;shPlat.on=false;gCyls.forEach(c=>{c.on=false;});ES.ramp=null;rootsM.visible=false;W.camFn=null;},
    goal:pi=>ES.ph==='knees'?'Встань у ноги великана — <b>Леший подымет корни</b>, нога замрёт: бей <b>заклёпку</b> на колене '+K(pi,'attack')+'. Кулак лежит — по руке можно взбежать.':
      ES.ph==='heart'?'Великан на колене! На <b>плечо</b> — по лежащей руке'+(E.free.gor?' или «Ко мне!» — Горыныч поднимет':'')+' — и <b>вдвоём</b> удар в замок на груди.':'',
    targets:pi=>ES.ph==='knees'?kneeR.filter((r,i)=>!ES.knee[i]):ES.ph==='heart'?[heart]:[]};
  // «Ко мне!» в стадии 10: Горыныч поднимает героя на плечо великана
  {const _pc=W.pingCall;W.pingCall=(pi,h)=>{if(E.cur===10&&ES.fight&&ES.ph==='heart'&&E.free.gor&&h.pos.y<2){const f=h.pos.clone(),to=SHW.clone().add(new V3(rand(-0.6,0.6),0.1,rand(-0.3,0.6)));
      gorFly.g.visible=true;anim(1.2,k=>{h.pos.lerpVectors(f,to,CE.inOutSine(k));h.pos.y+=Math.sin(k*Math.PI)*4;h.vel.set(0,0,0);gorFly.g.position.copy(h.pos).add(new V3(0,1.6,0));});later(1.25,()=>{gorFly.g.visible=false;h.pos.copy(to);h.vel.set(0,0,0);});E.log('gorLift');return;}
    if(_pc)_pc(pi,h);};}
  /* ---------- ролики акта III ---------- */
  // после стадии 9: «над златом чахнет» — Кощей стягивает золото, из звеньев встаёт великан
  E.cine.gold=done=>{heroLine(-4.5);KS.g.visible=true;KS.g.position.set(GC.x,0,GC.z+2);KS.g.rotation.y=0;sword.visible=false;giant.visible=false;
    play({dur:10,fov:48,camK:2.2,k5:{mood:[GOLD,0.14],cues:[[5.6,()=>{CINE.trauma(0.3);CINE.punch(-5);}]]},
      shots:[SH(0,[GC.x+3,2.6,GC.z+8],[GC.x,2.4,GC.z+2],{fov:42}),MV(4.6,[0,6,10],[0,6,-19],[0,9,16],[0,8,-19],5.4,{ease:'outCubic',fov:56})],
      says:[[0.4,3.4,'koschei','Не взять меня ни мечом, ни сказкой?<br>Так возьму я всё золото — и сам стану великаном!'],[5.8,3.4,null,'<i>Там царь Кащей над златом чахнет… Встал из звеньев великан — выше дуба.</i>',true]],
      events:[{t:1,fn:()=>{KA.pose('cast',{antic:0.3,snap:true});k5s('cast');k5Gather(()=>KS.g.position.clone().add(new V3(0,3,0)),0xffd060,1.2,30,6);}},
        {t:5.4,fn:()=>{K5L.ink(KS.g.position.clone().add(new V3(0,2,0)),20);KS.g.visible=false;giant.visible=true;giant.scale.setScalar(0.01);anim(1.2,k=>giant.scale.setScalar(Math.max(0.01,CE.outBack(k))));k5s('reveal');shakeAll(0.12,0.8);}}],
      end:()=>{W.anims.length=0;KA.reset();giant.scale.setScalar(1);done();}});};
  // после стадии 10: ложная смерть — тишина, победа… и чернила снова
  E.cine.falseDeath=done=>{heroLine(-6);KS.g.visible=true;KS.g.position.set(GC.x,0,GC.z+2);KS.g.rotation.set(-1.3,0,0);KS.g.position.y=0.4;
    play({dur:13,fov:46,camK:2.2,k5:{mood:[WARM,0.12],cues:[[7.2,()=>CINE.mood(DARK,0.2)],[9.6,()=>{CINE.trauma(0.3);CINE.dutch(0.05);}],[12,()=>CINE.dutch(0)]]},
      shots:[SH(0,[GC.x+2.4,1.6,GC.z+6],[GC.x,0.6,GC.z+2],{fov:40}),SH(3.6,[0,4,4],[0,1,-8],{fov:50}),MV(7,[GC.x+1.6,1.2,GC.z+5],[GC.x,1,GC.z+2],[GC.x+1.2,2.4,GC.z+6],[GC.x,2.6,GC.z+2],6,{ease:'inOutSine',fov:38})],
      says:[[0.6,3,null,'<i>Рассыпался великан. Лежит Кощей — не шелохнётся.</i>',true],[3.8,2.6,'proshka','Победили?.. Победили!'],[7.4,2.4,null,'<i>…А из тетрадки тихо течёт чернило.</i>',true],[9.8,3,'koschei','Бессмертный я. Забыли?']],
      events:[{t:3.6,fn:()=>{K5L.music('gold',E.freeCount());emAll('cheer',0.08)();}},{t:7.0,fn:()=>{if(FIN.music)FIN.music.play(null);K5L.ink(KS.g.position.clone().add(new V3(0,0.6,0)),30);K5L.pool(KS.g.position,3,6);}},
        {t:9.4,fn:()=>{anim(1.2,k=>{KS.g.rotation.x=-1.3*(1-k);KS.g.position.y=0.4*(1-k);});KA.pose('threat',{antic:0.3});k5s('reveal');}},{t:9.6,fn:emAll('fear',0.08)}],
      end:()=>{W.anims.length=0;KA.reset();KS.g.rotation.set(0,0,0);KS.g.position.y=0;done();}});};
  E.CARDS[10]=[{p:[0,12,10],l:[0,6,-19],card:{tag:'Как победить',title:'Стадия 10 из 12 · Там царь Кащей над златом чахнет',icon:'anvil',text:'Великан из золотых звеньев. Кулак бьёт в <b>красный круг</b> и лежит — по руке можно взбежать. Кольца монет сходятся — выйди из кольца.'}},
    {p:[3,4,-10],l:[2.2,2.6,-19],card:{tag:'Друзья',title:'Леший и заклёпки',icon:'lock',text:'Встань у <b>ноги</b> великана — Леший подымет корни, нога замрёт. Бей <b>заклёпку</b> на колене. Обе заклёпки — Водяной подсечёт великана волной.'}},
    {p:[6,12,-8],l:[3.2,8,-19],card:{tag:'Вместе',title:'На плечо — и в сердце',icon:'spark',text:'На колене великан ниже: взбеги по лежащей руке на <b>плечо</b> (или «Ко мне!» — Горыныч поднимет) и ударьте <b>вдвоём</b> в замок на груди.'}}];
