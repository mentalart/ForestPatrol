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
    end(){threads.forEach(t=>{t.m.visible=false;});}};
  /* ---------- обучающая катсцена стадии 1: свечи, купол, пары, молния, Кот-часы ---------- */
  E.LES[1]=L=>{const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha,cp=i=>candles[i].pos.clone().add(new V3(0,1.7,0)),cq=i=>[CAND[i][0],1.7,CAND[i][1]];
    const dop=dome.children.map(m=>m.material?m.material.opacity:0);const KF=p=>Math.atan2(p.x-KS.g.position.x,p.z-KS.g.position.z);
    const out=i=>{if(!candles[i].lit)return;candleSet(candles[i],false);k5s('candleOff');FX.dust(cp(i),10,0x4a3a5a);k5Flash(cp(i),0xb070ff,1.6,0.3);};
    const lightAll=()=>candles.forEach((c,i)=>{candleSet(c,true);FX.sparkle(cp(i),6,0xb070ff);});
    const domeBack=()=>{dome.visible=true;dome.scale.setScalar(1);dome.children.forEach((m,i)=>{if(m.material)m.material.opacity=dop[i];});};
    const catA=Math.PI/2+0.2;L.on(()=>{candles.forEach(c=>candleSet(c,true));domeBack();RING.set(E.clock&&E.clock.a!=null?E.clock.a:catA);});
    const KPt=[KP.x,2.5,KP.z],H=(x,z)=>[x,0.9,z];
    L.put(po,-3.4,-6.2);L.put(pr,-1.2,-5.8);L.put(pe,1.2,-5.8);L.put(yo,3.4,-6.2);L.kos(KP.x,KP.z,0);
    L.beat(null,{cam:[[0,10,7.5],[-1.6,0.8,-14],[0,9,5.5],[-1.6,0.4,-13]],need:[H(-3.4,-6.2),H(3.4,-6.2),KPt],says:[['pelageya','Восемь чёрных свеч — смотрите! —<br>Купол держат. Погасите!']],
      ev:[0.9,1.2,1.5,1.8,2.1,2.4,2.7,3.0].map((t,i)=>[t,()=>k5Ring(candles[i].pos.clone().setY(0.2),0xb070ff,0.4,2.0,0.8)])});
    L.beat(6.2,{cam:[[-7,8,-3],[-1.6,1.8,-18],[7,8,-3],[-1.6,1.8,-18]],need:[KPt,cq(2),cq(3),cq(7)],says:[['zven','Погаснут все восемь —',0.2,2.6],['zven','и купол лопнет!',2.7,2.4]],
      ev:[...candles.map((c,i)=>[0.6+i*0.3,()=>out(i)]),[3.4,()=>{k5Flash(KS.g.position.clone().add(new V3(0,2,0)),0xffffff,5,0.5);k5Ring(new V3(KP.x,0.2,KP.z),0xc8a0ff,1,5,0.6);K5L.gold(KS.g.position.clone().add(new V3(0,2.5,0)),16);anim(0.55,k=>{dome.scale.setScalar(1+k*0.5);dome.children.forEach((m,i)=>{if(m.material)m.material.opacity=dop[i]*(1-k);});});SFX.horn();}],
        [3.7,()=>{dome.visible=false;L.pose('recoil',{antic:0.1});}],[5.6,()=>{lightAll();domeBack();L.pose('idle');}]]});
    // щит в последний миг: свеча плюётся каплей — капля возвращается и гасит свечу
    L.beat(8.4,{cam:[[3.5,3.8,-7.5],[-5.6,1.5,-15.5]],need:[H(-4.6,-13),cq(2)],says:[['zven','Свеча плюётся синей каплей.',0.2,2.8],['zven','Щит '+kbd('guard')+' — в последний миг!',3.0,3.0],['zven','Капля вернётся — свеча погаснет!',5.2,2.9]],
      ev:[[0,()=>{L.put(po,-4.6,-13.0);L.look(po,candles[2].pos);}],...L.parry(0.6,po,cp(2),{dur:2.6,back:1.1,col:0x3a80ff,then:()=>out(2)})]});
    // вода Йоши
    L.beat(3.8,{cam:[[-2,3.6,-8.5],[5.8,1.4,-16]],need:[H(4.6,-14.3),cq(3)],says:[['zven','Йоша гасит свечу водой — '+kbd('skill')+'.',0.2,3.4]],
      ev:[[0,()=>{L.put(yo,4.6,-14.3);L.look(yo,candles[3].pos);}],[0.8,()=>{SFX.water();for(let i=0;i<7;i++)L.later(i*0.1+0.01,()=>L.orb(yo.pos.clone().add(new V3(0,1.3,0)),cp(3),0.55,{col:0x6ad0ff,r:0.13,dark:false,arc:0.9,on:i===6?()=>{out(3);L.ok(cp(3));}:null}));}]]});
    // пять ударов
    L.beat(4.2,{cam:[[5,2.8,0.5],[0,1.3,-3.8]],need:[H(0.6,-2.6),cq(4)],says:[['zven','Или бей её '+kbd('attack')+' — пять раз.',0.2,3.4]],
      ev:[[0,()=>{L.put(pr,0.6,-2.6,Math.PI);}],...L.strikes(0.6,pr,candles[4].pos.clone().add(new V3(0,1.2,0)),5,0.5,(i)=>{candles[4].embers=4-i;if(i===4){out(4);L.ok(cp(4));}})]});
    if(!G.solo)L.beat(7,{cam:[[0,6,-6],[0,1.8,-18]],need:[cq(2),cq(3),H(-5.4,-15.2)],says:[['zven','Свечи связаны парами.',0.2,2.4],['zven','Погасил одну — скорей гаси вторую,',2.7,2.2],['zven','пока первая не вспыхнула снова!',4.8,2.1]],
      ev:[[0.6,()=>{L.thread(()=>cp(2),()=>cp(3),6);}],[1.2,()=>{L.put(po,-5.4,-15.2);}],[2.9,()=>out(2)],[5.2,()=>{out(3);k5Flash(new V3(0,2.4,-18.2),0xffd76a,3,0.4);K5L.gold(new V3(0,2.4,-18.2),14);}],[6.6,()=>lightAll()]]});
    else L.beat(6,{cam:[[0,6,-6],[0,1.8,-18]],need:[cq(2),cq(3)],says:[['zven','Погасшая свеча зажжётся снова —',0.2,3.0],['zven','через полминуты. Успей обежать все!',3.2,2.7]],
      ev:[[0.6,()=>out(2)],[3.2,()=>out(3)],[5.4,()=>{candleSet(candles[2],true);FX.sparkle(cp(2),10,0xb070ff);k5s('candleOn');}]]});
    // молния в красный круг
    L.beat(6.6,{cam:[[3,6,2],[-0.8,1.5,-15]],need:[H(0,-8.6),KPt],says:[['zven','Красный круг на земле —',0.2,2.4],['zven','сюда ударит молния. Выйди — кувырок '+kbd('roll')+'!',2.6,3.6]],
      ev:[[0,()=>{L.put(pe,0,-8.6);L.put(yo,2.8,-6);KS.g.rotation.y=KF(pe.pos);}],[0.5,()=>L.pose('castR',{antic:0.2})],...L.dodge(0.7,pe,new V3(0,0,-8.6),1.7,1.7,new V3(-2.7,0,0.3))]});
    // Кот-часы
    L.beat(8,{cam:[[-6,4.5,-17],[0.5,2.8,-24.5],[-3,4.5,-17],[0.5,2.8,-24.5]],need:[[-1.6,3,KP.z],[-0.7,2.7,-24.6]],says:[['zven','Кот Учёный ходит по цепи.',0.2,2.6],['zven','Направо — песня: Кощей колдует.',2.9,2.6],['zven','Налево — сказка: Кощей слушает!',5.4,2.5]],
      ev:[[0,()=>{L.kos(KP.x,KP.z,0);}],[2.9,()=>{anim(2.4,k=>RING.set(catA-k*0.9));L.pose('cast',{antic:0.2});k5s('cast');}],[3.8,()=>k5Gather(()=>kosHand(),0xc090ff,0.5,12,2)],
        [5.4,()=>{anim(2.4,k=>RING.set(catA-0.9+k*1.4));L.pose('listen');}],[6.2,()=>FX.sparkle(KS.g.position.clone().add(new V3(0,4.6,0)),10,0xffe08a)]]});
    L.beat(3.4,{cam:[[0,6,3],[0,1.5,-12]],need:[H(-3.4,-6.2),H(3.4,-6.2)],says:[['zven','Понятно? Тогда — в бой!',0.3,2.8]],ev:[[0.2,()=>{L.pose('idle');[po,pr,pe,yo].forEach((h,i)=>{L.put(h,-3.4+i*2.3,-6.2);L.emo(h,'cheer');});}]]});};
  /* ================= стадия 2 «Там леший бродит»: прежние ключи, искорка и природа + скованный Леший ================= */
  // Леший в чёрной цепи ведёт ряды ёлок поперёк поляны; две застёжки ошейника рвёт только Кощеева молния — заманить её к Лешему
  const LSH_IN=new V3(8.2,0,-8.6);
  function rowMake(){const z=rand(C.z-8,C.z+7),dir=Math.random()<0.5?-1:1,x0=dir>0?-12:12,trees=[];const tele=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(24,2.2),k5Add(0x7aff9a,{opacity:0.0})));tele.rotation.x=-Math.PI/2;tele.position.set(C.x,0.06,z);
    for(let i=0;i<3;i++){const g=k5Prop(new THREE.Group());const m=M(0x1e2a24,{emissive:0x2a1048,emissiveIntensity:0.4});addMesh(new THREE.CylinderGeometry(0.15,0.2,1,6),M(0x3a2a1a),0,0.5,0,g);for(let j=0;j<3;j++)addMesh(new THREE.ConeGeometry(1.1-j*0.25,1.4,7),m,0,1.1+j*0.8,0,g);
      g.position.set(x0-dir*i*1.8,0,z+rand(-0.4,0.4));K5L.noRay(g);trees.push(g);}
    const RW={z,dir,trees,tele,t:0,hit:new Set()};ES.rows.push(RW);if(!ES.saidRow){ES.saidRow=true;barkS(FR.leshy.m,'leshy','Ой, ноги сами идут! Берегитесь, ребятушки!',2.4,true);}return RW;}
  function rowsTick(dt){for(const RW of ES.rows.slice()){RW.t+=dt;if(RW.t<1.4){RW.tele.material.opacity=0.12+0.15*Math.sin(G.time*14);continue;}RW.tele.material.opacity=Math.max(0,RW.tele.material.opacity-dt);
      for(const g of RW.trees){g.position.x+=RW.dir*6*dt;g.rotation.z=Math.sin(G.time*12)*0.05;for(const h of k5Heroes()){if(RW.hit.has(h))continue;if(Math.abs(h.pos.x-g.position.x)<1.0&&Math.abs(h.pos.z-g.position.z)<1.1&&h.pos.y<2){RW.hit.add(h);k5Hurt(h,g.position);}}}
      if(RW.t>6.5){RW.trees.forEach(k5Del);k5Del(RW.tele);ES.rows.splice(ES.rows.indexOf(RW),1);}}}
  // молния, ударившая рядом с Лешим, рвёт застёжку ошейника
  function boltWatch(){const now=new Set(K5.zones||[]);for(const z of ES.zw||[]){if(now.has(z)||z.userData.dead)continue;const p=z.position;if(!FR.leshy.free&&hd(p,FR.leshy.m.g.position)<2.6){ES.clasp=(ES.clasp||0)+1;
        K5L.gold(FR.leshy.m.g.position.clone().add(new V3(0,2.2,0)),14);k5s('keyBreak');{const f=FR.leshy.m.g.position.clone().add(new V3(ES.clasp>1?0.8:-0.8,4.2,0)),sp=k5Prop(K5PIC.spr(['lock'],1.1)),to=f.clone().add(new V3(rand(-3,3),5,rand(-2,2)));k5fx(0.9,k=>{sp.position.lerpVectors(f,to,k);sp.material.opacity=1-k;sp.material.rotation=k*6;},()=>k5Del(sp));}E.log('clasp');
        if(ES.clasp>=2){E.freeF('leshy');barkS(FR.leshy.m,'leshy','Спасибо, ребятушки! Ну, Кощей, держись — мой лес теперь за них!',3,true);banner('Леший свободен!','#b8e070',2.6);later(0.8,()=>{const f=FR.leshy.m.g.position.clone();anim(1.2,k=>FR.leshy.m.g.position.lerpVectors(f,FR.leshy.home,k));E.sprucesOn();});}}}
    ES.zw=[...now];}
  // ---- стадия 2: Леший в цепи — молния бьёт в того, кто стоит у него (правила — в обучающей катсцене E.LES[2]) ----
  const LG_R=2.5;
  const nearLeshy=h=>!!h&&hd(h.pos,FR.leshy.m.g.position)<LG_R;
  // кто стоит у Лешего — в того и молния, и скоро (иначе ждать её — дело случая)
  function leshyHoldTick(dt){if(E.cur!==2||!K5.fight||E.free.leshy||G.cine){ES.inR=0;return;}const N=K5.nat;
    if(N&&k5Heroes().some(nearLeshy)&&!(K5.zones||[]).some(isBolt)){ES.inR=(ES.inR||0)+dt;if(ES.inR>0.8&&N.boltT>1.4)N.boltT=1.4;}else ES.inR=0;}
  const isBolt=z=>!!(z&&z.children&&z.children[0]&&z.children[0].material.color.getHex()===0xff4a5a);
  K5.boltPick=hs=>E.cur===2&&!E.free.leshy?hs.find(nearLeshy)||null:null;
  E.layer[2]={start(){ES.rows=[];ES.rowT=5;ES.clasp=0;ES.zw=[];if(!E.free.leshy){FR.leshy.m.g.position.copy(LSH_IN);FR.leshy.m.g.rotation.y=Math.atan2(C.x-LSH_IN.x,C.z-LSH_IN.z);}else E.sprucesOn();},
    tick(dt){if(!K5.fight)return;rowsTick(dt);boltWatch();
      if(!E.free.leshy&&!K5.listen){ES.rowT-=dt;if(ES.rowT<=0){ES.rowT=G.solo?11:8;rowMake();}}
      if(!E.free.leshy&&KB.embers<2&&KB.state!=='broken'){KB.embers=2;}
      leshyHoldTick(dt);},
    end(){for(const RW of ES.rows||[]){RW.trees.forEach(k5Del);k5Del(RW.tele);}if(!E.free.leshy)FR.leshy.m.g.position.copy(FR.leshy.home);}};
  /* ---------- обучающая катсцена стадии 2: Леший в цепи, ёлки, щит и искорка, ключ, непогода, нить ---------- */
  E.LES[2]=L=>{const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha,LS=FR.leshy.m,LP0=LSH_IN.clone(),H=(x,z)=>[x,0.9,z],KPt=[KP.x,2.6,KP.z+3];
    const lp=()=>LS.g.position.clone().add(new V3(0,2.4,0)),kt=()=>KS.g.position.clone().add(new V3(0,3.2,0));
    L.on(()=>{if(!E.free.leshy){LS.g.position.copy(LP0);LS.g.rotation.y=Math.atan2(C.x-LP0.x,C.z-LP0.z);}for(const k in K5.locks)unlock(K5.locks[k],null,true);K5.locks={};});
    L.put(po,-3.2,-6.0);L.put(pr,-1.1,-5.6);L.put(pe,1.1,-5.6);L.put(yo,3.2,-6.0);L.kos(KP.x,KP.z+3,0);
    const pips=L.pips(6);pips.g.visible=false;const locks=[-1,1].map(s=>{const g=K5L.lock();L.add(g);g.scale.setScalar(1.3);g.visible=false;return {g,s};});const lockAt=()=>{locks.forEach(q=>{if(q.g.visible)q.g.position.copy(LS.g.position).add(new V3(q.s*0.9,4.0+Math.sin(G.time*3+q.s)*0.1,0));});};const lfx=k5fx(999,lockAt);L.on(()=>{lfx.t=lfx.dur;});
    const lockPop=i=>{const q=locks[i],f=q.g.position.clone();k5s('keyBreak');K5L.gold(f,12);k5Flash(f,0xffd76a,2,0.3);k5fx(0.7,k=>{q.g.position.set(f.x+q.s*k*1.6,f.y+Math.sin(k*3)*0.8-k*k*2,f.z);q.g.rotation.z=k*5;q.g.scale.setScalar(1.3*(1-k*0.6));},()=>{q.g.visible=false;});};
    const strike=(t0,h,sig,res)=>[[t0,()=>{KS.g.rotation.y=Math.atan2(h.pos.x-KS.g.position.x,h.pos.z-KS.g.position.z);L.sig(sig,1.5);L.pose('cast',{antic:0.2});}],[t0+1.1,()=>{L.guard(h,0.8);}],
      [t0+1.5,()=>{L.pose('point',{snap:true});SFX.parry();FX.sparks(hH(h).add(new V3(0,0.2,0.3)),14,0xffe08a);k5Flash(hH(h),0xffe08a,2.4,0.3);CINE.punch(-3);if(res)res();}]];
    // 1. Леший в цепи кормит Кощея
    L.beat(5.6,{cam:[[-4,7.5,-1.5],[4,1.8,-13]],need:[[8.2,2,-8.6],KPt],says:[['zven','Леший закован в чёрную цепь.',0.2,2.8],['zven','Пока он в цепи — Кощея не победить.',2.7,2.8]],
      ev:[[0.4,()=>{LS.g.position.copy(LP0);LS.g.rotation.y=Math.atan2(C.x-LP0.x,C.z-LP0.z);locks.forEach(q=>{q.g.visible=true;q.g.position.copy(LS.g.position).add(new V3(q.s*0.9,4.0,0));});}],[0.8,()=>L.thread(lp,kt,5,0x9a60ff)],[1.2,()=>npcEm(LS,'droop')()]]});
    // 2. молния рвёт застёжки
    L.beat(9.6,{cam:[[2,5.5,2],[5,1.6,-10],[5,5.5,0],[5.5,1.8,-10]],need:[H(5.2,-8),[8.2,2,-8.6]],says:[['zven','Встань в зелёный круг у Лешего.',0.2,2.6],['zven','Кощей ударит молнией — уйди кувырком '+kbd('roll')+'!',2.9,3.4],['zven','Молния разобьёт застёжку на цепи.',6.4,2.9]],
      ev:[[0,()=>{L.put(pe,5.3,-8.2);L.look(pe,LS.g.position);}],[0.1,()=>L.ring(LS.g.position,2.5,0x9fe070,3.2)],
        [2.6,()=>L.pose('castR',{antic:0.2})],...L.dodge(2.8,pe,new V3(5.3,0,-8.2),1.6,1.5,new V3(-2.4,0,1.2),q=>{L.bolt(q);lockPop(0);}),
        [6.6,()=>{L.put(po,5.0,-8.6);L.look(po,LS.g.position);L.ring(LS.g.position,2.5,0x9fe070,2.6);L.pose('castR',{antic:0.2});}],...L.dodge(6.8,po,new V3(5.0,0,-8.6),1.6,1.5,new V3(-2.4,0,1.0),q=>{L.bolt(q);lockPop(1);}),
        [8.9,()=>{K5L.gold(lp(),16);SFX.horn();npcEm(LS,'cheer')();}]]});
    // 3. ряды ёлок
    L.beat(6.2,{cam:[[0,6.5,0],[0,1.2,-11]],need:[H(0,-11),H(-6,-11)],says:[['zven','Леший гонит ёлки поперёк поляны.',0.2,2.6],['zven','Зелёная полоса — по ней побегут. Не стой!',2.9,3.0]],
      ev:[[0,()=>{L.put(po,-2,-11.2);L.put(yo,2,-11.2);L.look(po,new V3(0,0,-20));L.look(yo,new V3(0,0,-20));}],[0.6,()=>{L.strip(-11.2,24,2.4,0x7aff9a,3.0);}],[1.4,()=>{L.walk(po,-2,-8.4,1);L.walk(yo,2,-8.4,1);}],
        [3.4,()=>L.trees(-11.2,1,2.6)],[5.6,()=>L.ok(po)]]});
    // 4. Леший свободен — ёлки на нашей стороне
    L.beat(5,{cam:[[0,6,2],[3,1.8,-10]],need:[H(-2,-8)],says:[['zven','Леший свободен! «Ко мне!» '+kbd('call')+' —',0.2,2.4],['zven','ёлка встанет рядом и укроет.',2.5,2.3]],
      ev:[[0,()=>{L.put(po,-2,-8.4);L.put(pe,2,-8.4);}],[0.3,()=>{const f=LS.g.position.clone(),to=FR.leshy.home;anim(1.4,k=>LS.g.position.lerpVectors(f,to,CE.inOutSine(k)));}],[1.0,()=>{k5s('stomp');L.sprucePop(po.pos.x-1.2,po.pos.z-1.4,3.6);L.sprucePop(pe.pos.x+1.2,pe.pos.z-1.4,3.6);}]]});
    // 5. щит в последний миг, искорка
    L.beat(11,{cam:[[-9,5,-7],[-1,1.8,-14.5]],need:[H(-3,-12),H(3,-12),[-1,2.6,-15.5]],says:[['zven','Кощей замахнулся — щит '+kbd('guard')+' в последний миг!',0.2,4.2],['zven','Отбил — и угольки спеси гаснут.',4.6,2.8],['zven','Отбил — и искра к другу мчит!<br>По очереди — спесь слетит!',7.0,3.9]],
      ev:[[0,()=>{L.put(po,-3,-12);L.put(pe,3,-12);L.kos(-1,-16.5,0);pips.g.visible=true;}],...strike(0.6,po,'yellow',()=>{pips.out();L.pose('recoil',{antic:0});}),
        [4.8,()=>L.orb(hH(po),hH(pe).add(new V3(0,0.6,0)),1.0,{col:0xffe08a,r:0.16,dark:false,arc:1.2,on:p=>{L.ok(p);}})],
        ...strike(7.0,pe,'yellow',()=>{pips.out();pips.out();L.pose('recoil',{antic:0});})]});
    // 6. красный — кувырок
    L.beat(4.6,{cam:[[-8,4.5,-8],[-1,1.8,-14.5]],need:[H(-3,-12),[-1,2.6,-15.5]],says:[['zven','Красный зубец — щит не спасёт.',0.2,2.4],['zven','Кувырок '+kbd('roll')+'!',2.5,2.0]],
      ev:[[0,()=>{L.kos(-1,-16.5,0);KS.g.rotation.y=Math.atan2(po.pos.x-KS.g.position.x,po.pos.z-KS.g.position.z);}],[0.4,()=>{L.sig('red',1.9);L.pose('cast',{antic:0.2});}],[1.9,()=>L.roll(po,-2.4,0.6,0.45)],[2.2,()=>{L.pose('point',{snap:true});SFX.miss();k5Ring(new V3(po.pos.x+2.4,0.2,po.pos.z-0.6),0xff5a4a,0.3,1.8,0.4);}],[2.9,()=>{L.ok(po);L.pose('idle');}]]});
    // 7. летучий ключ
    L.beat(8.8,{cam:[[-7,5.5,-2.5],[0.5,1.6,-11]],need:[H(2,-9.5),H(-2,-8.4)],says:[['zven','Друг в цепях — не зевай:<br>По замку бей, выручай!',0.2,3.9],['zven','Летучий ключ — сбей щитом, пока не упал.',4.4,3.2]],
      ev:[[0,()=>{L.put(pe,2,-9.5);L.put(po,-2,-8.4);L.kos(-1,-17,0);}],[0.5,()=>{L.pose('cast',{antic:0.2});L.key(kt().add(new V3(0,1.6,0)),pe.pos.clone().add(new V3(0,3,0)),1.6,()=>{lockHero(pe);})}],
        [2.6,()=>L.walk(po,0.9,-8.8,0.5)],...L.strikes(3.3,po,pe.pos.clone().add(new V3(0,1,0)),5,0.42),[5.6,()=>{if(K5.locks[pe.kind])unlock(K5.locks[pe.kind],po);}]]});
    // 8. ветер и руки из земли
    L.beat(10,{cam:[[-8,5,-3],[0,1.4,-9]],need:[H(-2,-9),H(2,-9)],says:[['zven','Ветер! Щит держи — не сдует!<br>Пусть Кощей сколько хочет дует!',0.2,4.9],['zven','Где земля трещит — не стой:<br>Схватит лапой костяной!',5.2,4.1]],
      ev:[[0,()=>{L.put(po,-2,-9);L.put(pe,2,-9);L.look(po,new V3(2,0,-9));L.look(pe,new V3(2,0,-9));L.kos(-1,-16,0);}],[0.4,()=>L.pose('cast',{antic:0.2})],[0.6,()=>L.wind(new V3(1,0,0),3.6)],
        [0.8,()=>{L.guard(po,3.4);const px=po.pos.x,qx=pe.pos.x;anim(3.2,k=>{const tt=k*3.2;po.pos.x=px+tt*0.12;pe.pos.x=qx+(tt<1.8?tt:1.8+(tt-1.8)*0.2);pe.vel.set(0,0,0);po.vel.set(0,0,0);});}],[2.6,()=>{L.guard(pe,1.8);}],
        [5.6,()=>L.hand(new V3(-2,0,-9),1.0)],[6.4,()=>L.walk(po,-3.4,-8.4,0.5)],[7.6,()=>{L.ok(po);}]]});
    // 9. спесь сбита — нить сказа
    L.beat(7.6,{cam:[[-6,4,-8],[-1,2,-15.5],[5,4,-9],[-1,2,-15.5]],need:[H(-2.6,-14),H(0.6,-14),[-1,2.6,-16]],says:[['zven','Он без сил! Не мешкай, друг, —<br>Нитью сказа — вкруг да вкруг!',0.4,4.9],['zven','Оба — удар рядом с ним!',5.2,2.3]],
      ev:[[0,()=>{L.put(po,-2.6,-14.6);L.put(pe,0.6,-14.6);L.kos(-1,-16.5,0);}],[0.2,()=>{pips.all();L.dizzy(4);}],[5.0,()=>{L.hit(po,KS.g.position);L.hit(pe,KS.g.position);}],[5.5,()=>{SFX.mah();L.bind();}]]});
  };
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
