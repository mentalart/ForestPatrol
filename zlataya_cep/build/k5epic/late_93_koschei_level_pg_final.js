// ---- продолжение build5B2 (k5epic, часть 16): СТАДИЯ 12, «ТЯНЕМ-ПОТЯНЕМ», ПРОЛОГ-ПОГОНЯ, тексты паузы ----
  /* ================= стадия 12 «Златая цепь на дубе том»: прежняя игла + кузнецы, Векша, Курочка Ряба ================= */
  // Застёжку из иглы куют в такт у наковальни (как прежде), Кузьма и Демьян рядом. Векша бросает орешки — Кощей на миг замирает;
  // Курочка Ряба катит золотое яичко тому, у кого остался один лепесток.
  const dem12=makeSmith('demyan',false);dem12.g.visible=false;K5L.noRay(dem12.g);
  const ryaba=(()=>{const g=k5Prop(new THREE.Group());addMesh(new THREE.SphereGeometry(0.42,10,8),M(0xf4f0e8),0,0.5,0,g);addMesh(new THREE.SphereGeometry(0.24,8,6),M(0xf4f0e8),0,0.95,0.28,g);addMesh(new THREE.ConeGeometry(0.08,0.2,5),M(0xf0a020),0,0.95,0.55,g).rotation.x=Math.PI/2;
    addMesh(new THREE.BoxGeometry(0.06,0.18,0.2),M(0xd82a2a),0,1.2,0.28,g);g.visible=false;K5L.noRay(g);return {g};})();
  // Глубже: дуб — живой счётчик ковки: каждый верный удар — золотое звено летит к дубу и вплетается в цепь на стволе, дуб зеленеет.
  // Кот учёный ходит по цепи кругом: идёт направо — песнь заводит (у наковальни золотой круг — такт шире), налево — сказку говорит
  // (Кощей заслушался — 3 с стоит, бить можно больше). Кощей пишет «Чёрным пером»: лиловая черта по земле, через 1,6 с — чернильная
  // стена на 2,5 с. Атлас: progress-visual, ally buffs (окно такта, оглушение), delayed-activation line + lingering wall. Бот — tk5e_s12.
  const oakRing=k5Prop(new THREE.Group());oakRing.visible=false;const OAKL=[];{const gm=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6}),lg=new THREE.TorusGeometry(0.32,0.08,6,12);
    for(let i=0;i<24;i++){const a=i/24*Math.PI*2*3,y=4+i*0.32,r=2.75-i*0.012;const m=new THREE.Mesh(lg,gm);m.position.set(OAK.x+Math.cos(a)*r,y,OAK.z+Math.sin(a)*r);m.rotation.set(Math.PI/2,a,i%2?Math.PI/2:0);m.visible=false;oakRing.add(m);OAKL.push(m);}}
  K5L.noRay(oakRing);
  const songR=k5Prop(new THREE.Mesh(new THREE.RingGeometry(2.4,2.7,40),k5Add(0xffd76a,{opacity:0})));songR.rotation.x=-Math.PI/2;songR.raycast=()=>{};
  function linkFly(n){const m=OAKL[Math.min(OAKL.length-1,n-1)];if(!m)return;const to=m.position.clone();const f=ANV.clone().add(new V3(0,1.4,0));const L=k5Prop(new THREE.Mesh(new THREE.TorusGeometry(0.32,0.08,6,12),M(COL.gold,{emissive:0xffa020,emissiveIntensity:1})));
    k5fx(0.9,k=>{L.position.lerpVectors(f,to,CE.inOutSine(k));L.position.y+=Math.sin(k*Math.PI)*3;L.rotation.x+=0.3;},()=>{k5Del(L);for(let i=0;i<Math.max(1,Math.round(OAKL.length/((K5.forge&&K5.forge.need)||12)));i++){const q=OAKL[ES.linkN++];if(q)q.visible=true;}K5L.gold(to,8);
      E.oakGreen(Math.min(0.9,0.2+0.7*(K5.forge?K5.forge.n/Math.max(1,K5.forge.need):0)),true);});E.log('link');}
  function penLine(){const hs=k5Heroes();if(!hs.length)return;const h=hs[Math.floor(rand(0,hs.length))];const a=rand(0,Math.PI);const d=new V3(Math.cos(a),0,Math.sin(a));const c=new V3(h.pos.x,0.07,h.pos.z);
    const A0=c.clone().addScaledVector(d,-7),B0=c.clone().addScaledVector(d,7);const ln=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(0.35,14),k5Add(0x9a50ff,{opacity:0.2})));ln.rotation.x=-Math.PI/2;ln.rotation.z=-a+Math.PI/2;ln.position.copy(c);ln.raycast=()=>{};
    try{KA.pose('cast',{snap:true});later(0.4,()=>KA.reset());}catch(e){}k5s('magic');ES.pens.push({ln,c,d,t:0,wall:null,hit:new Set()});E.log('pen');}
  function penTick(dt){for(const P of ES.pens.slice()){P.t+=dt;if(P.t<1.6){P.ln.material.opacity=0.2+0.6*(P.t/1.6)*(0.6+0.4*Math.sin(G.time*18));continue;}
      if(!P.wall){P.wall=k5Prop(new THREE.Mesh(new THREE.BoxGeometry(0.5,2.2,14),M(0x140a20,{emissive:0x4a1a7a,emissiveIntensity:0.6,transparent:true,opacity:0.9})));P.wall.position.copy(P.c).setY(1.1);P.wall.rotation.y=Math.atan2(P.d.x,P.d.z);
        P.ln.material.opacity=0.8;K5L.ink(P.c.clone().add(new V3(0,1,0)),20);shakeAll(0.05,0.25);k5s('crack');}
      for(const h of k5Heroes()){if(P.hit.has(h))continue;const v=h.pos.clone().sub(P.c);v.y=0;const along=v.dot(P.d),side=Math.abs(v.x*P.d.z-v.z*P.d.x);if(Math.abs(along)<7&&side<0.6&&h.pos.y<2.2&&h.rollT<=0){P.hit.add(h);k5Hurt(h,P.c);}}
      if(P.t>4.1){k5Del(P.wall);k5Del(P.ln);ES.pens.splice(ES.pens.indexOf(P),1);}}}
  function kotTick(dt){if(!kot||!kot.g)return;ES.kotA+=dt*0.35;const a=ES.kotA,r=3.0;kot.g.position.set(OAK.x+Math.cos(a)*r,5.6,OAK.z+Math.sin(a)*r);kot.g.rotation.y=-a;
    const right=Math.sin(a)>0;if(right!==ES.kotRight){ES.kotRight=right;if(right){ES.song=5;W.ladBonus=0.12;songR.material.opacity=0.8;barkS(kot,'kot','Иду направо — песнь завожу! Куй в лад!',2,true);E.log('song');}
      else{ES.tale=3;K5.listen=true;if(K5.live&&KB.state!=='broken')KB.dazeT=Math.max(KB.dazeT||0,3);barkS(kot,'kot','Иду налево — сказку говорю… Кощей, слушай!',2,true);floatText(KS.g.position.clone().add(new V3(0,3.6,0)),'Заслушался!','#ffe08a');E.log('tale');}}
    if(ES.song>0){ES.song-=dt;songR.position.set(ANV.x,0.08,ANV.z);songR.scale.setScalar(1+0.06*Math.sin(G.time*6));if(Math.random()<dt*5)FX.sparkle(ANV.clone().add(new V3(rand(-2,2),rand(1,3),rand(-2,2))),1,0xffd76a);if(ES.song<=0){W.ladBonus=0;songR.material.opacity=0;}}
    if(ES.tale>0){ES.tale-=dt;if(Math.random()<dt*4)FX.sparkle(KS.g.position.clone().add(new V3(rand(-1,1),3,rand(-1,1))),1,0xfff4c0);if(ES.tale<=0)K5.listen=false;}}
  E.layer[12]={start(){dem12.g.visible=true;dem12.g.position.set(ANV.x-2.2,0,ANV.z-1.2);dem12.g.rotation.y=0.6;kuzma.g.position.set(ANV.x+2.2,0,ANV.z-1.0);kuzma.g.rotation.y=-0.6;
      ryaba.g.visible=true;ryaba.g.position.set(-10,0,-8);belka.g.position.set(10.5,0,-7.5);ES.nutT=9;ES.eggT=0;oakRing.visible=true;OAKL.forEach(m=>{m.visible=false;});Object.assign(ES,{linkN:0,fN:0,pens:[],penT:8,kotA:Math.PI*0.5,kotRight:null,song:0,tale:0});ES.kot0=kot&&kot.g?{p:kot.g.position.clone(),r:kot.g.rotation.y}:null;K5X.motes('gold',new V3(C.x,0,C.z),13,120,7);K5X.rays(new V3(C.x,0,C.z-6),0xffd8a0,5,{spread:12,op:0.2});
      later(1.2,()=>{if(E.cur===12)say('kuzma','Куй, Прошка! Не лупи — слушай металл. Мы рядом!',2.6,true);});},
    tick(dt){if(!K5.fight)return;kotTick(dt);penTick(dt);if(K5.forge&&K5.forge.n>ES.fN){for(let n=ES.fN+1;n<=K5.forge.n;n++)linkFly(n);ES.fN=K5.forge.n;}
      if(K5.live&&KB.state!=='broken'){ES.penT-=dt;if(ES.penT<=0){ES.penT=G.solo?9:6.5;penLine();}}
      ES.nutT-=dt;ryaba.g.rotation.y=Math.sin(G.time*2)*0.4;
      if(ES.nutT<=0&&K5.live&&KB.state!=='broken'){ES.nutT=G.solo?10:13;const f=belka.g.position.clone().add(new V3(0,1.4,0)),to=KS.g.position.clone().add(new V3(0,2.4,0));const n=k5Prop(new THREE.Mesh(new THREE.SphereGeometry(0.2,8,6),M(0x7ad06a,{emissive:0x2a8a30})));
        k5fx(0.8,k=>{n.position.lerpVectors(f,to,k);n.position.y+=Math.sin(k*Math.PI)*3;},()=>{k5Del(n);KB.dazeT=Math.max(KB.dazeT||0,1.6);K5L.gold(to,10);floatText(to.clone().add(new V3(0,1,0)),'Орешек-изумруд!','#9fe0a0');});E.log('nut');}
      ES.eggT-=dt;if(ES.eggT<=0)for(const pi of[0,1]){const p=players[pi];if(p.downed||p.petals>1)continue;const h=active(pi);ES.eggT=25;const e=k5Prop(new THREE.Mesh(new THREE.SphereGeometry(0.3,10,8),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.7})));e.scale.set(1,1.3,1);
        const f=ryaba.g.position.clone().add(new V3(0,0.4,0));k5fx(1.0,k=>{e.position.lerpVectors(f,h.pos.clone().add(new V3(0,0.4,0)),k);e.rotation.z+=0.3;},()=>{k5Del(e);p.petals=Math.min(3,p.petals+1);K5L.gold(h.pos.clone().add(new V3(0,1,0)),12);floatText(h.pos.clone().add(new V3(0,2,0)),'Золотое яичко! +лепесток','#ffe08a');});
        barkS(ryaba,'ryaba','Ко-ко! Держи яичко — не простое, золотое!',1.8,true);E.log('egg');break;}},
    end(){W.ladBonus=0;K5.listen=false;songR.material.opacity=0;oakRing.visible=false;(ES.pens||[]).forEach(P=>{k5Del(P.ln);if(P.wall)k5Del(P.wall);});ES.pens=[];if(ES.kot0&&kot&&kot.g){kot.g.position.copy(ES.kot0.p);kot.g.rotation.y=ES.kot0.r;}},
    pics:pi=>ES.rp?['two','sync','pull','@attack']:ES.song>0?['hammer','notes','@attack']:ES.tale>0?['koschei','>','@attack']:['hammer','notes','+','pen','run'],
    goal:pi=>(ES.song>0?'Кот поёт — <b>куй в лад</b>: такт шире. ':ES.tale>0?'Кот сказку говорит — <b>Кощей заслушался</b>: бейте! ':'')+'Лиловая черта — <b>Чёрное перо</b>: уйди, сейчас встанет стена.',targets:pi=>[]};
  E.layer[12].bot={pen:()=>penLine(),pens:()=>ES.pens,links:()=>OAKL.filter(m=>m.visible).length,kot:()=>({song:ES.song,tale:ES.tale,a:ES.kotA}),turnKot:a=>{ES.kotA=a;}};
  for(const pi of[0,1]){const me=()=>G.solo?active(G.soloPi):active(pi),st12=()=>E.cur===12&&K5.fight&&!G.cine&&(!G.solo||pi===0),top=()=>headOf(me()).add(new V3(0,0.6,0));
    prompt(pi,'label',top,()=>st12()&&(ES.pens||[]).some(P=>P.t<1.6&&(()=>{const v=me().pos.clone().sub(P.c);v.y=0;return Math.abs(v.dot(P.d))<7&&Math.abs(v.x*P.d.z-v.z*P.d.x)<1.0;})()),'черта! — уйди');}
  /* ================= «Тянем-потянем»: последняя чёрная цепь вросла в корни дуба ================= */
  // Встают все, как в «Репке»: Дедка за цепь, Яга за Дедку, Пелагея за Ягу, Потап за Пелагею, Кот за Потапа — и мышка Йоша последней.
  // Прошка считает: «Раз — два — ТЯНИ!» — оба удар в такт; Кощей дёргает — оба щит. Последний рывок — самый маленький: Йоша.
  E.repka=done=>{K5.fight=false;ES.fight=false;if(E.clock)E.clock.off();E.log('repka');const root=new V3(OAK.x,0.6,OAK.z+3.2),endP=new V3(C.x,1.0,C.z+2);
    KS.g.visible=true;KS.g.position.set(OAK.x+1.6,0,OAK.z+4.2);KS.g.rotation.y=Math.PI*0.8;sword.visible=false;try{KA.pose('threat');}catch(e){}
    let ch=chainLine(root,endP,0x1a1020);const team=[['ded',ded],['yaga',FR.yaga.m],['pelageya',T.pelageya],['potap',T.potap],['kot',kot],['yosha',T.yosha]];
    k5force(0,'potap');k5force(1,'yosha');if(G.solo)k5force(0,'yosha');
    const slot=i=>new V3(lerp(root.x,endP.x,0.18+i*0.15),0,lerp(root.z,endP.z,0.18+i*0.15)+0.0);
    team.forEach(([k,o],i)=>{const g=o.g||o;const s=slot(i);if(o.pos){placeOnGround(o,s.x+0.5,s.z,0);o.face=Math.PI;}else{g.position.set(s.x+0.5,0,s.z);g.rotation.y=Math.PI;}});
    placeOnGround(T.proshka,endP.x+2.6,endP.z+1.6,0);T.proshka.face=-Math.PI/2;
    const R0={k:0,beat:0,t:0,pull:[-9,-9],surge:null,surgeT:6,last:false,done:false};ES.rp=R0;ES.prog=0.95;
    // по отзыву «механика невнятная»: ритм виден — кольцо сходится к центру и вспыхивает зелёным на «ТЯНИ!»; над героями в этот миг —
    // кнопка удара и значок «тянем»; рывок Кощея — значок щита; ряд из шести звеньев над корнями — сколько уже вытянули
    const per0=0.7,nextPull=t=>{const bar=per0*4;const n=Math.round((t-per0*3)/bar);return per0*3+n*bar;};R0.next=nextPull;R0.per=per0;
    const tgtR=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.75,1.0,40),k5Add(0x9ff0a8,{opacity:0.9})));tgtR.rotation.x=-Math.PI/2;tgtR.position.copy(endP).setY(0.11);
    const prog=k5Prop(new THREE.Group());prog.position.set(root.x,4.2,root.z+1);const progSp=[0,1,2,3,4,5].map(i=>{const sp=K5PIC.spr(['gchain'],0.9);sp.position.set((i-2.5)*1.0,0,0);sp.material.opacity=0.25;prog.add(sp);return sp;});
    R0.vis=[tgtR,prog];
    const beatR=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.9,1.05,40),k5Add(0xffd76a,{opacity:0.9})));beatR.rotation.x=-Math.PI/2;
    K5L.music('gold',E.freeCount());say('proshka','Все за цепь! Я считаю: раз — два — ТЯНИ!',3,true);floatText(endP.clone().add(new V3(0,3,0)),'На «ТЯНИ!» — удар '+K(0,'attack')+(G.solo?'':' + '+K(1,'attack'))+' разом. Кощей дёрнет — щит!','#ffe08a');
    const per=per0;const tickF=dt=>{if(R0.done||G.cine||E.cur!==12)return;R0.t+=dt;const nb=Math.floor(R0.t/per),ph=(R0.t%(per*4))/(per*4);beatR.position.copy(endP).setY(0.1);beatR.scale.setScalar(0.9+(1-ph)*3.2);
      const near=Math.abs(R0.t-nextPull(R0.t))<0.45;beatR.material.color.set(near?0x9ff0a8:0xffd76a);tgtR.scale.setScalar(near?1.25+0.15*Math.sin(G.time*20):1);R0.near=near&&!R0.surge;
      progSp.forEach((sp,i)=>{sp.material.opacity=i<R0.k?1:0.25;sp.scale.setScalar(i<R0.k?1.0+0.06*Math.sin(G.time*5+i):0.9);});
      if(nb!==R0.beat){R0.beat=nb;const pull=nb%4===3;if(AUD.ready())(pull?AUD.bell(523,{v:0.06,d:0.8}):AUD.osc({f0:880,d:0.05,v:0.02}));floatText(T.proshka.pos.clone().add(new V3(0,1.8,0)),pull?'ТЯНИ!':['раз','два','и…'][nb%4],pull?'#ffd76a':'#ffffff');if(pull)R0.pullAt=R0.t;}
      // все держат свои места
      R0.lean=Math.max(0,(R0.lean||0)-dt*2.2);const fwd=R0.surge?Math.min(0.6,R0.surge.t*0.6):0;
      team.forEach(([k,o],i)=>{const s=slot(i);const back=R0.k*1.4+R0.lean*0.5-fwd;if(o.pos){o.pos.x=s.x+0.5;o.pos.z=s.z+back;o.vel.set(0,0,0);o.face=Math.PI;}else{const g=o.g||o;g.position.set(s.x+0.5,0,s.z+back);g.rotation.x=-0.35*R0.lean+0.25*fwd;}});
      // рывок Кощея: щит обоих
      R0.surgeT-=dt;if(!R0.surge&&R0.surgeT<=0&&!R0.last){R0.surge={t:0};R0.surgeT=G.solo?7:5.5;barkS(KS,'koschei','Не отдам!',1,true);try{KA.pose('threat',{antic:0.2});}catch(e){}}
      if(R0.surge){R0.surge.t+=dt;const ok=G.solo?active(G.soloPi).guard:(active(0).guard&&active(1).guard);if(R0.surge.t>1.0){if(!ok&&R0.k>0){R0.k=Math.max(0,R0.k-1);floatText(endP.clone().add(new V3(0,2.4,0)),'Перетянул! Щиты!','#ff9ab8');shakeAll(0.06,0.3);}
          else if(ok)floatText(endP.clone().add(new V3(0,2.4,0)),'Удержали!','#9fe0ff');R0.surge=null;}else K5L.ink(root.clone().add(new V3(rand(-1,1),0.4,rand(-1,1))),1);}
      ES.prog=0.95;K5L.hud.show(12,0.7+0.3*R0.k/6,0,0,'тянем-потянем '+R0.k+' / 6');};
    W.updates.push(tickF);
    ES.repkaAtk=(h,pi)=>{if(R0.done||R0.surge)return;const np=nextPull(R0.t),win=Math.abs(R0.t-np)<0.45;R0.pullAt=np;
      if(R0.last){if(h.kind==='yosha'||G.solo){finish();}return;}
      if(!win){floatText(h.pos.clone().add(new V3(0,1.8,0)),'не в такт','#cccccc');return;}R0.pull[pi]=R0.t;const both=G.solo||Math.abs(R0.pull[0]-R0.pull[1])<0.6;
      if(both&&R0.lastPullAt!==np){R0.lastPullAt=np;R0.k++;R0.lean=1;k5s('pSoft');FX.dust(root.clone(),10,0x5a4a3a);floatText(endP.clone().add(new V3(0,2.6,0)),'Тянем-потянем! '+R0.k+' / 6','#ffe08a');E.log('pull');
        if(R0.k>=5){R0.last=true;say('pelageya','Вытянуть не можем… Позвали мышку! Йоша — последний рывок!',3,true);floatText(T.yosha.pos.clone().add(new V3(0,1.6,0)),'Йоша: удар '+K(G.solo?0:1,'attack')+'!','#ffd76a');}}};
    function finish(){R0.done=true;E.log('repkaDone');k5s('shatter');shakeAll(0.12,0.8);k5Flash(root.clone(),0xffe0a0,8,0.6);K5L.gold(root.clone().add(new V3(0,1,0)),40);k5Del(ch);ch=chainLine(root,endP,COL.gold);
      const i=W.updates.indexOf(tickF);if(i>=0)W.updates.splice(i,1);k5Del(beatR);(R0.vis||[]).forEach(o=>k5Del(o));try{KA.pose('slump');}catch(e){}const f=KS.g.position.clone();anim(0.8,k=>{KS.g.position.set(f.x,Math.sin(k*Math.PI)*1.2,f.z+k*1.5);});
      E.oakGreen(1,true);later(1.4,()=>{barkS(kot,'kot','…И там я был, и мёд я пил; у моря видел дуб зелёный…',4,true);});later(5.6,()=>{k5Del(ch);ES.repkaAtk=null;done();});}};
  // подсказки «Тянем-потянем» над героями: в миг «ТЯНИ!» — удар; рывок Кощея — щит; последний рывок — Йоша
  for(const pi of[0,1]){const me=()=>G.solo?active(G.soloPi):active(pi),on=()=>E.cur===12&&ES.rp&&!ES.rp.done&&!G.cine&&(!G.solo||pi===0),top=()=>headOf(me()).add(new V3(0,0.6,0));
    prompt(pi,'attack',top,()=>on()&&!ES.rp.last&&ES.rp.near,K5PIC.h(['pull','!'],30));
    prompt(pi,'guard',top,()=>on()&&!!ES.rp.surge,K5PIC.h(['shield'],30));
    prompt(pi,'attack',top,()=>on()&&ES.rp.last&&(G.solo||me().kind==='yosha'),K5PIC.h(['pull','star'],30));}
  // удар во время «Репки»
  {const _oa=W.onAttack;W.onAttack=(pi,h)=>{if(E.cur===12&&ES.repkaAtk){ES.repkaAtk(h,pi);return;}if(_oa)_oa(pi,h);};}
  /* ---------- тексты паузы по стадиям ---------- */
  E.PAUSE=[];for(let n=0;n<=12;n++)E.PAUSE[n]='<b>'+K5E.NAMES[n]+'</b><br><i>'+K5L.LINES[n]+'</i><br>Битва с Кощеем: двенадцать строк пролога — двенадцать стадий. Tab — панель стадий и оценок.';
