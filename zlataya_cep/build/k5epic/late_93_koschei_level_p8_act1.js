// ---- продолжение build5B2 (k5epic, часть 8): АКТ I «ЧЁРНАЯ СТРОКА» — стадии 1–3 и их ролики ----
  if(!WHO.ilya){WHO.ilya=['Илья Муромец','#e0d0b0'];WHO.dobrynya=['Добрыня','#b8d0f0'];WHO.alyosha=['Алёша','#f0c0a0'];WHO.ryaba=['Курочка Ряба','#f4e0a0'];}
  const nearH=p=>{let b=null,bd=1e9;for(const h of k5Heroes()){const d=hd(h.pos,p);if(d<bd){bd=d;b=h;}}return b;};
  const kosHand=()=>KS.hand.getWorldPosition(new V3());
  // удар-буква из руки Кощея по герою (общий для стадий Лукоморья)
  E.letterAt=(ch,h,o)=>{const from=kosHand().add(new V3(0,1.2,0)),c=h.pos.clone();c.y=0;const d=new V3(c.x-KS.g.position.x,0,c.z-KS.g.position.z).normalize();
    try{KA.pose('castR',{antic:0.2});}catch(e){}return K5L.letter(ch,from,ch==='Л'?KS.g.position.clone().setY(0):c,d,o);};
  /* ================= стадия 1 «У лукоморья дуб зелёный»: прежние чёрные свечи + пары, удары-буквы, Йоша поливает дуб ================= */
  // свечи связаны чернильной нитью попарно: погасла одна, а напарница горит — через 6 с первая зажжётся снова; пара погасла — дуб зеленеет
  const PAIRS=[[0,1],[2,3],[5,6],[4,7]],pairOf=i=>{for(const p of PAIRS){if(p[0]===i)return p[1];if(p[1]===i)return p[0];}return -1;};
  const threads=PAIRS.map(([a,b])=>{const m=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,1,5),k5Add(0x9a50ff,{opacity:0.7})));m.visible=false;return {a,b,m};});
  function threadsTick(){for(const T of threads){const A=candles[T.a],B=candles[T.b],on=E.cur===1&&!G.solo&&A.lit&&B.lit;T.m.visible=on||(E.cur===1&&!G.solo&&(A.lit!==B.lit));if(!T.m.visible)continue;
    const p=A.pos.clone().add(new V3(0,1.8,0)),q=B.pos.clone().add(new V3(0,1.8,0)),d=q.clone().sub(p);T.m.position.copy(p).addScaledVector(d,0.5);T.m.scale.set(1,d.length(),1);T.m.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());
    T.m.material.opacity=A.lit&&B.lit?0.35:0.5+0.4*Math.sin(G.time*10);T.m.material.color.set(A.lit&&B.lit?0x9a50ff:0xff70a0);}}
  {const _co=candleOff;candleOff=function(e,txt){const was=e.lit;_co(e,txt);if(!was||E.cur!==1||G.solo)return;const j=pairOf(e.idx),P=candles[j];if(!P)return;
      if(P.lit){e.relT=Math.min(e.relT,6+2*(E.fails[1]||0));floatText(P.pos.clone().add(new V3(0,2.9,0)),'и эту — скорей!','#ffb0d0');}
      else{e.relT=Math.max(e.relT,40);P.relT=Math.max(P.relT,40);const T=threads.find(t=>(t.a===e.idx&&t.b===j)||(t.b===e.idx&&t.a===j));if(T){const p=T.m.position.clone();K5L.gold(p,16);k5Flash(p,0xffd76a,2,0.3);}
        const out=PAIRS.filter(([a,b])=>!candles[a].lit&&!candles[b].lit).length;E.oakGreen(out/4*0.5,true);if(!E.said_y){E.said_y=true;barkS(T_.yosha,'yosha','Пару погасили! Дуб полью — пусть зеленеет!',2.2,true);}
        k5Pillar(OAK.clone().setY(0),0x9fe0a0,7,1.4,1.0);}};}
  const T_=T;
  E.layer[1]={start(){ES.lt=6;},
    tick(dt){threadsTick();if(!K5.fight)return;if(K5.listen)return;ES.lt-=dt;   // удары-буквы — только в песнь
      if(ES.lt<=0){ES.lt=G.solo?11:8.5;const hs=k5Heroes();if(hs.length){const h=hs[Math.floor(rand(0,hs.length))];E.letterAt(Math.random()<0.5?'О':'Х',h);}}},
    end(){threads.forEach(t=>{t.m.visible=false;});},
    pics:pi=>['two','+','fire','no'],
    goal:pi=>'Погасите <b>чёрные свечи</b> — парами, обе в пару. Кот налево — сказку говорит: Кощей не колдует.',targets:pi=>candles.filter(c=>c.lit).map(c=>c.g)};
  /* ================= стадия 2 «Там леший бродит»: прежние ключи, искорка и природа + скованный Леший ================= */
  // Леший в чёрной цепи ведёт ряды ёлок поперёк поляны; две застёжки ошейника рвёт только Кощеева молния — заманить её к Лешему
  const LSH_IN=new V3(8.2,0,-8.6);
  function rowMake(){const z=rand(C.z-8,C.z+7),dir=Math.random()<0.5?-1:1,x0=dir>0?-12:12,trees=[];const tele=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(24,2.2),k5Add(0x7aff9a,{opacity:0.0})));tele.rotation.x=-Math.PI/2;tele.position.set(C.x,0.06,z);
    for(let i=0;i<3;i++){const g=k5Prop(new THREE.Group());const m=M(0x1e2a24,{emissive:0x2a1048,emissiveIntensity:0.4});addMesh(new THREE.CylinderGeometry(0.15,0.2,1,6),M(0x3a2a1a),0,0.5,0,g);for(let j=0;j<3;j++)addMesh(new THREE.ConeGeometry(1.1-j*0.25,1.4,7),m,0,1.1+j*0.8,0,g);
      g.position.set(x0-dir*i*1.8,0,z+rand(-0.4,0.4));K5L.noRay(g);trees.push(g);}
    const arr=[-6,0,6].map(x=>{const a=K5PIC.spr(['>'],1.6);a.material.rotation=dir>0?0:Math.PI;a.position.set(C.x+x,1.2,z);k5Prop(a);return a;});   // куда пойдут ёлки
    const RW={z,dir,trees,tele,arr,t:0,hit:new Set()};ES.rows.push(RW);if(!ES.saidRow){ES.saidRow=true;barkS(FR.leshy.m,'leshy','Ой, ноги сами идут! Берегитесь, ребятушки!',2.4,true);}return RW;}
  function rowsTick(dt){for(const RW of ES.rows.slice()){RW.t+=dt;if(RW.t<1.4){RW.tele.material.opacity=0.12+0.15*Math.sin(G.time*14);RW.arr.forEach((a,i)=>{a.position.x+=RW.dir*dt*1.5;a.material.opacity=0.6+0.4*Math.sin(G.time*10+i);});continue;}RW.tele.material.opacity=Math.max(0,RW.tele.material.opacity-dt);RW.arr.forEach(a=>{a.visible=false;});
      for(const g of RW.trees){g.position.x+=RW.dir*6*dt;g.rotation.z=Math.sin(G.time*12)*0.05;for(const h of k5Heroes()){if(RW.hit.has(h))continue;if(Math.abs(h.pos.x-g.position.x)<1.0&&Math.abs(h.pos.z-g.position.z)<1.1&&h.pos.y<2){RW.hit.add(h);k5Hurt(h,g.position);}}}
      if(RW.t>6.5){RW.trees.forEach(k5Del);k5Del(RW.tele);RW.arr.forEach(k5Del);ES.rows.splice(ES.rows.indexOf(RW),1);}}}
  // молния, ударившая рядом с Лешим, рвёт застёжку ошейника
  function boltWatch(){const now=new Set(K5.zones||[]);for(const z of ES.zw||[]){if(now.has(z)||z.userData.dead)continue;const p=z.position;if(!FR.leshy.free&&hd(p,FR.leshy.m.g.position)<2.6){ES.clasp=(ES.clasp||0)+1;
        K5L.gold(FR.leshy.m.g.position.clone().add(new V3(0,2.2,0)),14);k5s('keyBreak');K5PIC.float(FR.leshy.m.g.position.clone().add(new V3(0,3.4,0)),ES.clasp>=2?['friend','star']:['lock','>','check']);{const f=FR.leshy.m.g.position.clone().add(new V3(ES.clasp>1?0.8:-0.8,4.2,0)),sp=k5Prop(K5PIC.spr(['lock'],1.1)),to=f.clone().add(new V3(rand(-3,3),5,rand(-2,2)));k5fx(0.9,k=>{sp.position.lerpVectors(f,to,k);sp.material.opacity=1-k;sp.material.rotation=k*6;},()=>k5Del(sp));}E.log('clasp');
        if(ES.clasp>=2){E.freeF('leshy');barkS(FR.leshy.m,'leshy','Спасибо, ребятушки! Ну, Кощей, держись — мой лес теперь за них!',3,true);banner('Леший свободен!','#b8e070',2.6,'теперь щит в последний миг — гасите угольки Кощея');later(0.8,()=>{const f=FR.leshy.m.g.position.clone();anim(1.2,k=>FR.leshy.m.g.position.lerpVectors(f,FR.leshy.home,k));E.sprucesOn();});}}}
    ES.zw=[...now];}
  // ---- стадия 2: как победить — подсказки в мире (после первых секунд стадии карточек нет) ----
  // 1) Леший в цепи: зелёный круг и стрелка у Лешего, над ним «застёжки ○○», лиловый луч от Лешего к Кощею («лес питает Кощея»);
  //    кто встал в круг — «жди молнию»: Кощей бьёт молнией в того, кто у Лешего (и скоро), красный круг — «кувырок»;
  // 2) Леший свободен — над тем, на кого замахнулся Кощей: «щит — в последний миг» / «СЕЙЧАС!», красный замах — «кувырок»;
  // 3) спесь сбита — «бей рядом с ним» (late_94, кнопки над Кощеем).
  const LG={g:null,n:-1};const LG_R=2.5;
  const nearLeshy=h=>!!h&&hd(h.pos,FR.leshy.m.g.position)<LG_R;
  function leshyGuideMake(){const g=k5Prop(new THREE.Group());const ring=new THREE.Mesh(new THREE.RingGeometry(LG_R-0.35,LG_R,40),k5Add(0x9fe070,{opacity:0.7}));ring.rotation.x=-Math.PI/2;ring.position.y=0.08;g.add(ring);
    const fill=new THREE.Mesh(new THREE.CircleGeometry(LG_R-0.35,40),k5Add(0x9fe070,{opacity:0.12}));fill.rotation.x=-Math.PI/2;fill.position.y=0.07;g.add(fill);
    const ar=t4Arrow(0x9fe070);ar.position.y=5.6;g.add(ar);const beam=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,1,6,1,true),k5Add(0x9a60ff,{opacity:0.5})));
    const locks=[-0.8,0.8].map(x=>{const sp=K5PIC.spr(['lock'],1.1);sp.position.set(x,4.2,0);g.add(sp);return sp;});const aim=k5Prop(K5PIC.spr(['lightning'],1.5));aim.visible=false;
    K5L.noRay(g);K5L.noRay(beam);Object.assign(LG,{g,ring,fill,ar,beam,locks,aim,n:-1});}
  function leshyGuideTick(dt){const on=E.cur===2&&K5.fight&&!E.free.leshy&&!G.cine;if(!LG.g){if(!on)return;leshyGuideMake();}
    LG.g.visible=on;LG.beam.visible=on;if(!on){LG.aim.visible=false;return;}const L=FR.leshy.m.g.position;LG.g.position.set(L.x,0,L.z);
    const k=0.5+0.5*Math.sin(G.time*4),inR=k5Heroes().some(nearLeshy);LG.ring.material.opacity=inR?0.95:0.35+0.45*k;LG.fill.material.opacity=inR?0.28:0.1;LG.ar.position.y=5.4+0.35*k;LG.ar.rotation.y+=dt*2.5;LG.ar.visible=!inR;
    const n=ES.clasp||0;if(LG.n!==n){LG.n=n;LG.locks.forEach((sp,i)=>{sp.visible=i>=n;});}LG.locks.forEach((sp,i)=>{sp.position.y=4.2+Math.sin(G.time*3+i)*0.15;});
    // кто ждёт в круге — над ним молния: чем ближе удар, тем чаще мигает
    {const w=k5Heroes().find(nearLeshy),N0=K5.nat;LG.aim.visible=!!w&&!!N0;if(LG.aim.visible){const f=N0.boltT<1.5?14:5;LG.aim.position.copy(headOf(w)).add(new V3(0,1.9,0));LG.aim.material.opacity=0.55+0.45*Math.abs(Math.sin(G.time*f));LG.aim.scale.setScalar(1.5*(1+0.15*Math.sin(G.time*f)));}}
    const a=L.clone().add(new V3(0,2.2,0)),b=kosTop(),d=b.clone().sub(a),len=d.length();LG.beam.position.copy(a).addScaledVector(d,0.5);LG.beam.scale.set(1,len,1);LG.beam.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());
    LG.beam.material.opacity=0.25+0.3*Math.abs(Math.sin(G.time*6));
    // кто стоит у Лешего — в того и молния, и скоро (иначе ждать её — дело случая)
    const N=K5.nat;if(N&&inR&&!(K5.zones||[]).some(isBolt)){ES.inR=(ES.inR||0)+dt;if(ES.inR>0.8&&N.boltT>1.4)N.boltT=1.4;}else ES.inR=0;}
  const isBolt=z=>!!(z&&z.children&&z.children[0]&&z.children[0].material.color.getHex()===0xff4a5a);
  K5.boltPick=hs=>E.cur===2&&!E.free.leshy?hs.find(nearLeshy)||null:null;
  for(const pi of[0,1]){const me=()=>G.solo?active(G.soloPi):active(pi),st2=()=>E.cur===2&&K5.fight&&!G.cine&&(!G.solo||pi===0),top=()=>headOf(me()).add(new V3(0,0.4,0));
    const redUnder=h=>(K5.zones||[]).find(z=>hd(z.position,h.pos)<1.8);   // красный — молния, бурый — трещина с рукой
    // к Лешему — тот, кто ближе, пока никто не стоит в круге
    prompt(pi,'label',top,()=>{if(!st2()||E.free.leshy)return false;const hs=G.solo?[me()]:[active(0),active(1)];if(hs.some(nearLeshy))return false;
      return hs.slice().sort((a,b)=>hd(a.pos,FR.leshy.m.g.position)-hd(b.pos,FR.leshy.m.g.position))[0]===me();},'к Лешему — в зелёный круг');
    prompt(pi,'label',top,()=>st2()&&!E.free.leshy&&nearLeshy(me())&&!redUnder(me()),'стой — жди молнию Кощея');
    prompt(pi,'roll',top,()=>st2()&&!!redUnder(me()),()=>{const z=redUnder(me());return z&&!isBolt(z)?'рука из трещины — уходи!':!E.free.leshy&&nearLeshy(me())?'уходи — молния порвёт застёжку':'уходи из круга!';});
    // замах Кощея по тебе: жёлтый — щит в последний миг, красный — кувырок
    {prompt(pi,'guard',top,()=>false);const pr=W.prompts[W.prompts.length-1];
      pr.cond=()=>{if(!st2()||!K5.live||KB.state!=='wind'||KB.tgt!==me()||redUnder(me()))return false;const left=KB.wdur-KB.t;
        if(KB.sig==='red'){pr.action='roll';pr.note='красный — кувырок';}else{pr.action='guard';pr.note=left<0.35?'СЕЙЧАС!':K5.spark&&K5.spark.pi===me().player?'щит в последний миг — с искоркой вдвое':'щит — в последний миг';}return true;};}}
  E.layer[2]={start(){ES.rows=[];ES.rowT=5;ES.clasp=0;ES.zw=[];if(!E.free.leshy){FR.leshy.m.g.position.copy(LSH_IN);FR.leshy.m.g.rotation.y=Math.atan2(C.x-LSH_IN.x,C.z-LSH_IN.z);}else E.sprucesOn();},
    tick(dt){if(!K5.fight)return;rowsTick(dt);boltWatch();
      if(!E.free.leshy&&!K5.listen){ES.rowT-=dt;if(ES.rowT<=0){ES.rowT=G.solo?11:8;rowMake();}}
      if(!E.free.leshy&&KB.embers<2&&KB.state!=='broken'){KB.embers=2;if(G.time>(ES.holdT||0)){ES.holdT=G.time+6;K5PIC.float(FR.leshy.m.g.position.clone().add(new V3(0,3.6,0)),['friend','chain','>','lightning']);}}
      leshyGuideTick(dt);},
    end(){for(const RW of ES.rows||[]){RW.trees.forEach(k5Del);k5Del(RW.tele);(RW.arr||[]).forEach(k5Del);}if(LG.g){LG.g.visible=false;LG.aim.visible=false;}if(!E.free.leshy)FR.leshy.m.g.position.copy(FR.leshy.home);},
    pics:pi=>E.free.leshy?['koschei','>','@guard','>','@attack']:['friend','ring','>','lightning','>','@roll'],
    goal:pi=>E.free.leshy?'<b>Леший свободен.</b> Отбивайте удары Кощея <b>щитом '+K(pi,'guard')+' в последний миг</b> — гаснут угольки спеси. Спесь сбита — бейте '+K(pi,'attack')+' рядом с ним.<br>«Ко мне!» '+K(pi,'call')+' — ёлка встанет рядом, укроет от ветра и молний.':
      '<b>Как победить:</b> 1) пока Леший в цепи, Кощея не сломить — встань в <b>зелёный круг</b> у Лешего, Кощей ударит молнией — уходи кувырком '+K(pi,'roll')+': молния рвёт застёжку (их две);<br>2) отбивайте удары щитом '+K(pi,'guard')+' в последний миг — гаснут угольки; 3) спесь сбита — бейте '+K(pi,'attack')+' рядом с ним.',
    targets:pi=>E.free.leshy?[]:[FR.leshy.m.g]};
  // стадия 3 «Там лес и дол видений полны» — в своём модуле: late_93_koschei_level_p8b_stage3.js
  /* ================= ролики акта I ================= */
  // вступление на Лукоморье: дуб почернел, друзья в чёрных цепях, Кощей на дубе переписывает пролог
  E.cine.intro=done=>{F.stage='introCine';heroLine(8.5);const po=T.potap,pr=T.proshka,yo=T.yosha,pe=T.pelageya;KS.g.visible=true;KS.g.position.set(0.4,6.4,-24.7);KS.g.rotation.y=0;book.g.visible=true;book.g.userData.free=false;
    candles.forEach(c=>{c.g.visible=true;candleSet(c,false);});dome.visible=false;RING.g.visible=true;RING.set(Math.PI/2);const ink=K5L.textSpr(K5L.INK[1],12,{col:'#2a1040',glow:'#a060ff',stroke:'#c8a0ff'});k5Prop(ink);ink.position.set(OAK.x,15,OAK.z+2);ink.material.opacity=0;
    K5L.theme('dawn',1);
    play({dur:27,fov:46,camK:2.2,k5:{mood:[WARM,0.1],cues:[[9.4,()=>CINE.mood(COLD,0.14)],[13.2,()=>{CINE.trauma(0.2);CINE.flashDip('#c8a0ff',0.3);}],[20.4,()=>CINE.punch(-5)]]},
      shots:[MV(0,[0,9,24],[0,6,-26],[0,6,14],[0,5,-26],5,{ease:'inOutSine'}),
        SH(5,[2.4,3.6,-21.5],[0,2.8,-25],{fov:40}),
        MV(8.6,[3.2,7.4,-19.5],[0.4,7.6,-24.7],[2.4,7.0,-20.5],[0.4,7.4,-24.7],4,{ease:'inOutSine',fov:38}),
        MV(12.6,[0,4,6],[0,12,-26],[0,3,10],[0,14,-26],3.6,{ease:'outCubic',fov:52}),
        SH(16.2,[-10,3,-4],[-15,1.4,-4],{fov:42}),
        MV(19.2,[4,4,-8],[0.4,4,-24],[2,3,-12],[-1.6,2,-23],4,{ease:'inOutSine',fov:46}),
        SH(23.2,[0,2.4,2.2],[0,1.4,8.5],{fov:46})],
      says:[[0.3,4.4,null,'<i>У лукоморья дуб зелёный, златая цепь на дубе том…</i><br><i>Так было. А сегодня — тихо: и дуб почернел, и Кот молчит.</i>',true],
        [5.2,3.4,null,'<i>Кот Учёный ходит по цепи — да голоса нет. Ни песни, ни сказки.</i>',true],
        [8.9,4.0,'koschei','Я дочитал вашу тетрадку. В каждой сказке Кот вписал меня — последним.<br>Теперь пишу я!'],
        [13.0,3.6,null,'<i>Махнул Кощей пером — и строка в небе почернела: «У лукоморья дуб засохший…»</i>',true],
        [16.4,3.0,'yaga','Ох, голубчики… цепь-то чёрная — держит! Не пускает!'],
        [19.6,3.4,'koschei','Восемь чёрных свеч — моим словам охрана.<br>Попробуйте задуть, коль не страшно!'],
        [23.4,3.4,'zven','Сегодня мы не деремся — защищайтесь!<br>И сказку вспоминайте, не сдавайтесь!']],
      events:[{t:1,fn:()=>HEROES.forEach((h,i)=>hWalk(h,-3+i*2,-2.6,4,Math.PI))},{t:5.4,fn:()=>{RING.set(Math.PI/2-0.3);}},{t:9.0,fn:pose('proud')},
        {t:12.6,fn:()=>{KA.pose('cast',{antic:0.3,snap:true});k5s('cast');k5Gather(()=>kosHand(),0xc090ff,0.35,14,2);}},
        {t:13.1,fn:()=>{k5fx(1.2,k=>{ink.material.opacity=k;});K5L.ink(new V3(0,12,-26),20);for(const k in FR)if(FR[k].c&&FR[k].c.on)k5Flash(FR[k].c.g.getWorldPosition(new V3()),0x9a50ff,2.4,0.5);}},
        {t:16.6,fn:npcEm(FR.yaga.m,'droop')},{t:18.4,fn:()=>{const f=KS.g.position.clone();anim(0.9,k=>{KS.g.position.lerpVectors(f,KP,CE.inOutCubic(k));KS.g.position.y=f.y*(1-k)+Math.sin(k*Math.PI)*2;});later(0.9,()=>{k5s('stomp');shakeAll(0.06,0.3);FX.dust(KP.clone(),14,0x5a4a6a);});}},
        {t:20.0,fn:()=>{KA.pose('cast',{antic:0.32,anticK:0.45,snap:true});k5s('cast');}},
        {t:20.4,fn:()=>{dome.visible=true;dome.scale.setScalar(0.01);anim(0.9,k=>dome.scale.setScalar(Math.max(0.01,CE.outBack(k))));k5Pillar(KP.clone(),0x9a60ff,9,1.2,1.2);k5s('barrier');}},
        {t:21.4,fn:()=>candles.forEach((c,i)=>later(i*0.16,()=>{candleSet(c,true);k5s('candleOn');const p=c.pos.clone().add(new V3(0,1.8,0));FX.sparkle(p,10,0xb070ff);k5Flash(p,0xb070ff,2.2,0.35);})) },
        {t:23.0,fn:()=>zvenTo(new V3(0.8,2.2,-0.4),0.9)}],
      tick:t=>{if(book.g.visible&&!book.g.userData.free){lHand.getWorldPosition(book.g.position);book.g.rotation.set(0,KS.g.rotation.y,0.2);}},
      end:()=>{k5Del(ink);W.anims.length=0;KA.reset();done();}});};
  // после стадии 2: туман и мороки
  E.cine.mist=done=>{heroLine(-5.5);KS.g.position.set(KP.x,0,KP.z+3);KS.g.rotation.y=0;KS.g.visible=true;
    play({dur:9,fov:46,camK:2.4,k5:{mood:[DARK,0.14]},
      shots:[SH(0,[KP.x+3,2.6,KP.z+8],[KP.x,2.6,KP.z+3],{fov:42}),MV(3.4,[0,9,4],[0,1,-13],[0,6,8],[0,1,-13],5.6,{ease:'inOutSine',fov:50})],
      says:[[0.4,3.0,'koschei','Не сломить меня в лоб? Так заморочу!<br>Туман, вставай! Мороки, ко мне!'],[4.6,3.6,'pelageya','Их четверо… а настоящий — один.<br>Совиным взором увижу, какой!']],
      events:[{t:0.3,fn:()=>{KA.pose('castR',{antic:0.2});k5s('cast');}},{t:3.4,fn:()=>K5L.themeTo('ink',3)},{t:3.6,fn:()=>{for(const s of S3_A)K5L.ink(new V3(s[0],0.4,s[1]),14);}}],
      end:()=>{W.anims.length=0;KA.reset();done();}});};
  // после стадии 3: «Тогда я вас — в сказки!» — Кощей вырывает четыре листа, листы встают дверями по краям Лукоморья
  E.cine.tear=done=>{heroLine(-5.5);KS.g.visible=true;KS.g.position.set(C.x,0,C.z-3);KS.g.rotation.y=0;if(E.pagesShow)E.pagesShow(true,false);
    play({dur:11,fov:46,camK:2.4,k5:{mood:[DARK,0.12],cues:[[3.3,()=>{CINE.trauma(0.25);CINE.punch(-4);}]]},
      shots:[SH(0,[C.x+3,2.8,C.z+3],[C.x,3,C.z-3],{fov:42}),MV(3.2,[0,14,10],[0,0,-12],[0,16,14],[0,0,-12],7.8,{ease:'inOutSine',fov:56})],
      says:[[0.3,3.0,'koschei','Ах так?! Ну, раз вы такие сказочные —<br>так и ступайте в сказки! Да в мои!'],[4.2,3.4,null,'<i>Вырвал Кощей из тетрадки четыре листа — и разлетелись листы по Лукоморью дверями.</i>',true],
        [7.8,3.0,'zven','Там друзья наши заперты! Найдём — и домой!']],
      events:[{t:3.2,fn:()=>{KA.pose('threat',{antic:0.25});k5s('shatter');if(E.pagesShow)E.pagesShow(true,true);}},{t:6.4,fn:()=>{K5L.ink(KS.g.position.clone().add(new V3(0,2,0)),30);KS.g.visible=false;k5s('blink');}}],
      end:()=>{W.anims.length=0;KA.reset();K5L.themeTo('dawn',1.5);done();}});};
  // карточки «как победить» перед новыми стадиями (движок карточек 4-Б); при повторе — коротко
  E.CARDS={};E.cards=(n,go)=>{const c=E.CARDS[n];if(!c||!K5.auto){go();return;}const seen=E.seenCards=E.seenCards||{};const steps=(seen[n]?c.slice(0,1):c).map(s=>{const o=Object.assign({dur:seen[n]?3.6:5},s);o.card=Object.assign({},s.card);const m=FIN.k5pic&&FIN.k5pic.CARD[o.card.title];
    if(m&&m.k){const who=G.solo?[G.soloPi]:[0,1];o.wait={who:G.solo?G.soloPi:'both',a:m.k,timeout:12};o.card.keys=who.map(pi=>({pi,a:m.k}));o.dur=Math.max(o.dur,6);}return o;});seen[n]=true;t4Run(steps,{end:go});};   // карточка с кнопкой ждёт, пока её нажмут
