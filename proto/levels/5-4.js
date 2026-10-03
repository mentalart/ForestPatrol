/* ============================== МИР 5 · 5-4 «ЯЙЦО» — гусельный · «Калинка» 88 → 104 ============================== */
// внутри яйца — Кощеев бальный зал, золотой и перевёрнутый · бег по ленте в долю · пол переворачивается раз в 4 доли в куплете и раз в 8 — в припеве
// знаки вещей на ленте работают сами в долю · в припеве пугала бьют в такт жёлтым — защита в долю · клетка из чёрных ниток — Йоша, ковшик мёртвой воды
// «Лад»: промах не сбрасывает — нить подтягивает; фраза повторяется, пока оба не попадут · последний припев — все четверо на подушке · ролик «Моё»
function build54(){
  W.zvenAway=true;W.world=5;setTheme('egg');W.name='5-4 · Яйцо';W.sub='Остров Буян · гусельный уровень · «Калинка»';W.camX=12;const F=W.flags;F.stage='intro';
  W.abil.roll=true;W.abil.toss=true;W.abil.owl=true;W.fallY=-12;W.readHints=true;W.vestPull=true;const T=HERO;
  const SPEED=4.2,LANE=[-2.6,2.6];
  const PH=[{n:16,bpm:88,type:'verse',name:'Куплет — медленно',sub:'прыгай в долю · пол раз в четыре доли переворачивается',sign:'clew'},{n:16,bpm:104,type:'chorus',name:'Припев!',sub:'быстро · жёлтое солнышко на ленте — защита в долю, в лад',sign:'gusli'},
    {n:16,bpm:92,type:'verse',name:'Второй куплет',sub:'светомостки сами вспыхивают — лишь бы в долю',sign:'pero'},{n:16,bpm:104,type:'chorus',name:'Припев — клетка!',sub:'Йоша — ковшик мёртвой воды по чёрным ниткам, по ниткам',sign:'kleshi'},
    {n:16,bpm:104,type:'final',name:'Последний припев — на подушке, мягко',sub:'все четверо · последние доли — дружно, вместе'}];
  const bt=[],bph=[],bi=[];{let t=0;PH.forEach((p,k)=>{const B=60/p.bpm;for(let i=0;i<p.n;i++){bt.push(t);bph.push(k);bi.push(i);t+=B;}});bt.push(t);}
  const NB=bt.length-1,END_T=bt[NB],B0=60/PH[0].bpm;const zAt=t=>-t*SPEED;
  const flipK=k=>{const p=PH[bph[k]],i=bi[k];return p.type==='verse'?i%4===3:p.type==='chorus'?i%8===7:false;};
  // что делать в долю k: прыжок, а в припеве у пугала — защита (у игроков в разные доли)
  const act=(pi,k)=>{const p=PH[bph[k]],i=bi[k];if(p.type==='chorus'&&!flipK(k)&&(pi===0?i%4===1:i%4===3))return 'guard';return 'jump';};
  const beatB=k=>bt[Math.min(NB,k+1)]-bt[k];
  /* ---------- зал: пол и потолок одинаково золотые, люстры, колонны — всё это переворачивается ---------- */
  const zEnd=zAt(END_T)-14;colBox(-9,9,-4,0,zEnd-10,24,false);wall(-9.2,-9,zEnd-10,24);wall(9,9.2,zEnd-10,24);wall(-9.2,9.2,24,24.2);
  const hall=new THREE.Group();hall.position.y=4;W.group.add(hall);const gA=M(0xd8a840,{emissive:0x604010,emissiveIntensity:0.25}),gB=M(0xf0e0b0),red=M(0xa02028),gold=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5});
  for(let z=24;z>zEnd-10;z-=2)for(let x=-8;x<8;x+=2){const c=((x+z)/2)%2===0?gA:gB;const t1=new THREE.Mesh(new THREE.BoxGeometry(2,0.2,2),c);t1.position.set(x+1,-4.1,z-1);hall.add(t1);const t2=t1.clone();t2.position.y=4.1;hall.add(t2);}
  for(let z=20;z>zEnd-10;z-=8)for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(0.45,0.55,8,12),gB);c.position.set(s*8.4,0,z);hall.add(c);for(const y of[-3.8,3.8]){const cap=new THREE.Mesh(new THREE.BoxGeometry(1.4,0.4,1.4),gold);cap.position.set(s*8.4,y,z);hall.add(cap);}}
  for(let z=16;z>zEnd-10;z-=12){const ch=new THREE.Group();ch.position.set(0,3.2,z);hall.add(ch);ch.add(new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,1.6,4),gold));const ring=new THREE.Mesh(new THREE.TorusGeometry(1.2,0.08,6,20),gold);ring.rotation.x=Math.PI/2;ring.position.y=-0.8;ch.add(ring);
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const cd=new THREE.Mesh(new THREE.SphereGeometry(0.12,6,5),M(0xfff0c0,{emissive:0xffc040,emissiveIntensity:1}));cd.position.set(Math.cos(a)*1.2,-0.6,Math.sin(a)*1.2);ch.add(cd);}
    const low=ch.clone();low.position.y=-3.2;low.rotation.x=Math.PI;hall.add(low);}
  for(let z=10;z>zEnd-10;z-=14)for(const s of[-1,1]){const cur=new THREE.Mesh(new THREE.BoxGeometry(0.2,7,3),red);cur.position.set(s*8.9,0,z);hall.add(cur);}
  const water=new THREE.Mesh(new THREE.PlaneGeometry(18,Math.abs(zEnd-10)+34),M(0x7ad8ff,{transparent:true,opacity:0.35,emissive:0x2a8aa0,emissiveIntensity:0.4,depthWrite:false}));water.rotation.x=-Math.PI/2;water.position.set(0,-0.3,(24+zEnd-10)/2);W.group.add(water);
  let flipA=0,flipTo=0;
  /* ---------- лента: золотые плитки на каждую долю, жёлтое солнышко — защита, широкая полоса — переворот ---------- */
  const tiles=[];const tileM=()=>M(0xffd76a,{emissive:0xffa020,emissiveIntensity:0.3,transparent:true,opacity:0.95}),sunM=()=>M(0xfff08a,{emissive:0xffe040,emissiveIntensity:0.4,transparent:true,opacity:0.95});
  for(let k=0;k<NB;k++){const z0=zAt(bt[k]);if(flipK(k)){const m=addMesh(new THREE.BoxGeometry(8.6,0.14,1.3),tileM(),0,0.05,z0);m.material.color.setHex(0xffc040);tiles.push({pi:2,k,m});continue;}
    for(const pi of[0,1]){const a=act(pi,k);const m=addMesh(new THREE.BoxGeometry(1.7,0.14,1.3),a==='guard'?sunM():tileM(),LANE[pi],0.05,z0);tiles.push({pi,k,m,a});}}
  // знаки вещей на ленте: работают сами в долю
  const signStrips=[];PH.forEach((p,j)=>{if(!p.sign)return;const k0=bt.findIndex((_,k)=>bph[k]===j);const z0=zAt(bt[k0])+1.5;const ic=signIcon(p.sign,1.1);ic.position.set(0,2.8,z0);W.group.add(ic);signStrips.push({ic,j,z:z0});
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.2,0.07,6,28),MB(SIGN_COL[p.sign]));ring.rotation.x=Math.PI/2;ring.position.set(0,0.1,z0);W.group.add(ring);});
  // струны клубка между плитками в первом куплете, светомостки во втором — вспыхивают в долю
  const beams=[];for(let k=0;k<NB-1;k++){const p=PH[bph[k]];if(p.type!=='verse')continue;const z0=zAt(bt[k]),z1=zAt(bt[k+1]);for(const pi of[0,1]){const m=addMesh(new THREE.BoxGeometry(p.sign==='clew'?0.1:1.1,0.06,Math.abs(z1-z0)-1.3),p.sign==='clew'?M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6}):M(0xffe8a0,{emissive:0xffc040,emissiveIntensity:0.4,transparent:true,opacity:0.8}),LANE[pi],0.06,(z0+z1)/2);beams.push({m,k});}}
  // звенья и орешки над долями: попал — летит в лапы
  const itemAt={};const put=(pi,k,kind)=>{const it=(kind==='link'?linkItem:nutItem)(LANE[pi],3.2,zAt(bt[k]));itemAt[pi+':'+k]=it;return it;};
  put(0,7,'link');put(1,16+9,'nut');put(0,32+5,'nut');put(1,32+13,'link');put(0,48+2,'nut');W.linkTotal++;   // третье звено — Звенышко
  /* ---------- пугала-мороки: пляшут в припеве, бьют жёлтым в долю ---------- */
  const scare=[];for(let k=0;k<NB;k++)for(const pi of[0,1]){if(act(pi,k)!=='guard')continue;const g=new THREE.Group();g.position.set(LANE[pi]+(pi?1.6:-1.6),0,zAt(bt[k]));W.group.add(g);const P=scarecrowPole(0,0,0);W.group.remove(P.g);g.add(P.g);P.g.position.set(0,0,0);W.cyls.pop();
    const ring=new THREE.Mesh(new THREE.TorusGeometry(0.5,0.06,6,20),MB(COL.yellow,{transparent:true,opacity:0.9}));ring.position.set(0,3.6,0);g.add(ring);scare.push({g,k,pi,ring,down:false});}
  /* ---------- подушка с иглой и клетка Звенышка ---------- */
  const cz=zAt(END_T)-4;const cush=new THREE.Group();cush.position.set(0,0,cz);W.group.add(cush);{const c=addMesh(new THREE.CylinderGeometry(4.6,5,0.9,20),red,0,0.45,0,cush);c.scale.y=0.9;for(let i=0;i<4;i++){const t=addMesh(new THREE.SphereGeometry(0.35,8,6),gold,Math.cos(i*Math.PI/2)*4.4,0.8,Math.sin(i*Math.PI/2)*4.4,cush);}}
  colBox(-5,5,-1,0.85,cz-5,cz+5,false);
  const needle=makeNeedle(1.6);needle.g.position.set(0,0.9,cz-1.4);needle.g.rotation.z=Math.PI/2;
  const cageZ=zAt(bt[48+8]);const cage=new THREE.Group();cage.position.set(LANE[1]+1.9,0,cageZ);W.group.add(cage);const bm=M(0x141018);for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const b=addMesh(new THREE.CylinderGeometry(0.03,0.03,1.8,4),bm,Math.cos(a)*0.55,0.9,Math.sin(a)*0.55,cage);b.rotation.z=rand(-0.2,0.2);}
  addMesh(new THREE.TorusGeometry(0.55,0.04,4,20),bm,0,1.8,0,cage).rotation.x=Math.PI/2;addMesh(new THREE.TorusGeometry(0.55,0.04,4,20),bm,0,0.05,0,cage).rotation.x=Math.PI/2;
  const zv=makeZven();zv.mode='script';zv.vis=true;zv.pos.set(cage.position.x,0.9,cageZ);zv.link.material.emissiveIntensity=0.08;zv.light.intensity=0.15;zv.g.scale.setScalar(0.8);
  const V=makeVestZ(helperOf(4));W.zven=V;V.pos.set(0,3,6);W.zvenGoal=()=>new V3(0,3.4,active(0).pos.z-4);W.zvenFree=true;
  /* ---------- песня ---------- */
  const MEL={verse:[76,0,74,72, 71,0,69,71, 72,0,74,71, 69,0,0,0],chorus:[76,74,72,71, 69,72,76,0, 76,74,72,71, 69,71,69,0],final:[76,74,72,71, 69,72,76,0, 76,74,72,71, 69,71,69,81]};
  const BASS={verse:[45,52,45,52, 43,50,43,50, 41,48,41,48, 40,47,45,45],chorus:[45,45,52,52, 45,45,52,52, 45,45,52,52, 40,40,45,45],final:[45,45,52,52, 45,45,52,52, 45,45,52,52, 40,40,45,57]};
  const S={t:-4*B0,B:B0,lastK:-5,state:'cine',show:true,judged:[{},{}],hits:[[],[]],tries:[[],[]],rep:{},combo:[0,0],best:[0,0],pulse:0,phase:0,flips:0,scares:0,together:0,bt,act,NB};W.song=S;W.S54=S;
  const winOf=pi=>(LADWIN[players[pi].path]||0.1)+(W.ladBonus||0);
  const nearK=(t)=>{let best=-1,bd=1e9;for(let k=Math.max(0,S.lastK-2);k<Math.min(NB,S.lastK+3);k++){const d=Math.abs(t-bt[k]);if(d<bd){bd=d;best=k;}}return best;};
  const phr=k=>Math.floor(k/8);
  function combo(pi,ok){if(ok){S.combo[pi]++;S.best[pi]=Math.max(S.best[pi],S.combo[pi]);if(S.combo[pi]%8===0){banner('Лад ×'+S.combo[pi]+'!',PCSS[pi],1,pi?'Пелагея':'Прошка');SFX.ok();}}else S.combo[pi]=0;}
  const pullLine=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1,5),MB(COL.gold,{transparent:true,opacity:0.9}));W.group.add(pullLine);pullLine.visible=false;let pullT=0;
  function pull(pi){const a=active(pi),b=active(1-pi);const pa=a.pos.clone().add(new V3(0,0.8,0)),pb=b.pos.clone().add(new V3(0,0.8,0));pullLine.position.copy(pa).lerp(pb,0.5);pullLine.scale.set(1,pa.distanceTo(pb),1);pullLine.quaternion.setFromUnitVectors(new V3(0,1,0),pb.sub(pa).normalize());pullLine.visible=true;pullT=0.45;
    a.vel.y=3.4;a.grounded=false;SFX.thread();}
  function judge(pi,k,ok,d,how){S.judged[pi][k]=ok?'hit':'miss';const p=phr(k);S.tries[pi][p]=(S.tries[pi][p]||0)+1;if(ok)S.hits[pi][p]=(S.hits[pi][p]||0)+1;combo(pi,ok);const h=active(pi);
    if(ok){floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),how==='guard'?'Защита — в долю!':flipK(k)?'Переворот!':'В долю!',how==='guard'?'#fff08a':'#ffe36b');burst(new V3(h.pos.x,0.3,zAt(bt[k])),0xffd76a,6,3);
      const it=itemAt[pi+':'+k];if(it&&!it.taken){const from=it.pos.clone();anim(0.5,q=>{if(it.taken)return;it.base=lerp(from.y,h.pos.y+1,q);it.pos.x=lerp(from.x,h.pos.x,q);it.pos.z=lerp(from.z,h.pos.z-0.4,q);if(q>=1)takeItem(it,h);});}
      if(how==='guard'){const sc=scare.find(s=>s.k===k&&s.pi===pi);if(sc&&!sc.down){sc.down=true;S.scares++;anim(0.8,q=>{sc.g.rotation.y=q*12;sc.g.rotation.z=(sc.pi?-1:1)*q*1.4;sc.g.position.y=-q*0.4;});SFX.parry();}}
      if(PH[bph[k]].type==='final'&&bi[k]>=12&&S.judged[1-pi][k]==='hit'){S.together++;ringFx(new V3(0,1,cz),COL.gold,3);}}
    else{floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),d===undefined?'нить подтянула':d<0?'рано':'поздно','#dddddd');pull(pi);
      if(how==='guard'){const sc=scare.find(s=>s.k===k&&s.pi===pi);if(sc&&!sc.down){sc.down=true;anim(0.4,q=>{sc.g.rotation.y=q*4;});later(0.4,()=>{sc.g.visible=false;});}}}}
  function onBeat(k){if(k<0){tone(1760,0.06,'square',0.05);banner(['Раз','Два','Три','Четыре!'][k+4],'#ffe7a0',0.5,k===-1?'на каждую золотую плитку прыгай':'');return;}
    if(k>=NB){S.state='stop';endSong();return;}
    const p=PH[bph[k]],i=bi[k];S.B=beatB(k);S.phase=bph[k];
    // лад: фраза повторяется, если оба в основном промахнулись; клетку не открыли — припев ещё раз
    if(i%8===0&&k>0){const q=phr(k)-1;const bad=[0,1].every(pi=>(S.tries[pi][q]||0)>0&&(S.hits[pi][q]||0)<(S.tries[pi][q]||0)*0.5);
      if(bad&&(S.rep[q]||0)<2){S.rep[q]=(S.rep[q]||0)+1;rewind(q,'Лад! Фразу — ещё раз');return;}
      if(bph[k]===4&&i===0&&!F.freed){rewind(q,'Клетка всё закрыта — припев ещё разок!');return;}
      if(bph[k]===4&&i===8&&S.together<2&&(S.rep[q]||0)<2){S.rep[q]=(S.rep[q]||0)+1;}}
    if(i===0){banner(p.name,'#ffd76a',2,p.sub);if(p.type==='chorus'||p.type==='final')F.chorus=true;else F.chorus=false;}
    const mel=MEL[p.type][i],bass=BASS[p.type][i];if(mel){tone(mf(mel),p.type==='verse'?0.55:0.3,'triangle',0.13,mf(mel)*0.997);gusli(mel-12,0,0.08);}tone(mf(bass),0.4,'sine',0.17);if(p.type!=='verse'&&i%2===1)tone(mf(bass+12),0.15,'square',0.03,null,S.B/2);
    tone(2600,0.04,'square',0.03);rumble(0,0.02,0.05);rumble(1,0.02,0.05);S.pulse=1;
    if(flipK(k)){flipTo+=Math.PI;S.flips++;tone(mf(81),0.3,'sine',0.08);}
    // пугала поднимают руки за долю до удара
    for(const sc of scare)if(sc.k===k+1&&!sc.down){anim(S.B,q=>{sc.ring.scale.setScalar(1.8-q*0.8);});}
    if(p.type==='chorus'&&bph[k]===3&&i===4&&!F.freed){bark(zv,'zven','<i>(тускло)</i> дзинь…',1.6);F.cageOn=true;}}
  function rewind(q,msg){const k0=q*8,k1=k0+8,dt=bt[k1]-bt[k0];S.t-=dt;S.lastK=k0-1;for(const pi of[0,1]){S.hits[pi][q]=0;S.tries[pi][q]=0;for(let k=k0;k<k1;k++)delete S.judged[pi][k];}
    for(const sc of scare)if(sc.k>=k0&&sc.k<k1){sc.down=false;sc.g.visible=true;sc.g.rotation.set(0,0,0);sc.g.position.y=0;}
    for(const h of HEROES)placeOnGround(h,h.pos.x,h.pos.z+dt*SPEED,0);SFX.whoosh();banner(msg,'#ffe7a0',2,'под звон бубенца прыгай — в такт');}
  // игрок ведёт прыжок и защиту; второй герой бежит следом
  W.custom=(pi,h,dt,c)=>{
    if(c.lock||S.state!=='play'){for(const q of players[pi].heroes){q.vel.x=damp(q.vel.x,0,10,dt);q.vel.z=damp(q.vel.z,0,10,dt);}return;}
    if(tap(pi,'swap')){if(G.solo)soloSwap();else doSwap(pi);}
    const hh=active(pi),oo=other(pi);const want=zAt(S.t);hh.vel.z=-SPEED+(want-hh.pos.z)*5;hh.vel.x=(LANE[pi]-hh.pos.x)*8;hh.face=Math.PI;
    {const tx=LANE[pi]+(pi?0.8:-0.8),tz=hh.pos.z+1.8;oo.vel.x=(tx-oo.pos.x)*6;oo.vel.z=(tz-oo.pos.z)*6;oo.face=Math.PI;}
    hh.guard=btn(pi,'guard');
    const k=nearK(S.t);const inWin=k>=0&&Math.abs(S.t-bt[k])<beatB(Math.max(0,k-1))*0.5&&!S.judged[pi][k];
    if(tap(pi,'jump')&&(hh.grounded||hh.coyote>0)){hh.vel.y=6.4;hh.grounded=false;hh.coyote=0;SFX.jump();if(inWin){const d=S.t-bt[k];judge(pi,k,act(pi,k)==='jump'&&Math.abs(d)<=winOf(pi),d,'jump');}}
    if(tap(pi,'guard')&&inWin&&act(pi,k)==='guard'){const d=S.t-bt[k];judge(pi,k,Math.abs(d)<=winOf(pi)+0.03,d,'guard');}
    if(tap(pi,'skill')&&pi===1&&F.cageOn&&!F.freed){if(hh.kind!=='yosha'){tip(1,'Нитки Йоша режет. Смени на него '+K(1,'swap')+' и из ковшика полей '+K(1,'skill')+'.',2);}else if(Math.abs(hh.pos.z-cageZ)<7){freeZven();}else tip(1,'Ближе к клетке подойди — она справа, на ленте.',1.6);}};
  function freeZven(){F.freed=true;F.cageOn=false;const Y=T.yosha;ladle(Y);SFX.water();burst(cage.position.clone().add(new V3(0,1,0)),0xa0e8ff,20,4);anim(0.6,k=>{cage.scale.set(1+k,1-k*0.9,1+k);});later(0.6,()=>{cage.visible=false;});
    zv.link.material.emissiveIntensity=0.9;zv.light.intensity=1.1;zv.g.scale.setScalar(1);zv.mode='script';anim(0.6,k=>{zv.pos.y=0.9+k*2.4;});later(0.3,()=>{SFX.dzin?SFX.dzin():SFX.bell();say('zven','Дзинь! Успели, успели!',2.6,true);banner('Звенышко свободно!','#ffd76a',2.4,'подсказки снова его голосом звучат');giveLink(cage.position.clone().add(new V3(0,1.5,0)),Y,1.5,1);});
    later(1.4,()=>{V.g.visible=false;W.zven=zv;zv.mode='lead';W.zvenFree=true;W.readHints=false;W.vestPull=false;G.flags.zvenBack=true;});}
  W.updates.push(dt=>{
    if(S.state==='play'&&!G.cine){S.t+=dt;while(S.state==='play'&&S.lastK+1<=NB&&S.t>=(S.lastK+1<0?(S.lastK+1)*B0:bt[S.lastK+1])-1e-6){S.lastK++;onBeat(S.lastK);}
      for(const pi of[0,1])for(let k=Math.max(0,S.lastK-2);k<=S.lastK&&k<NB;k++){if(AUTO(pi)&&!S.judged[pi][k]&&S.t>=bt[k]){const ah=active(pi),w=act(pi,k);if(w==='jump'&&ah.grounded){ah.vel.y=6.4;ah.grounded=false;}else if(w!=='jump')ah.atkT=0.2;judge(pi,k,true,0,w);}
        if(!S.judged[pi][k]&&S.t>bt[k]+winOf(pi)+0.08)judge(pi,k,false,undefined,act(pi,k));}}
    S.pulse=Math.max(0,S.pulse-dt*4);if(pullT>0){pullT-=dt;if(pullT<=0)pullLine.visible=false;}
    // переворот: зал вращается вокруг ленты
    flipA=damp(flipA,flipTo,6,dt);hall.rotation.z=flipA;
    let fl=0;if(S.state==='play'&&S.t>-0.2){const k=Math.max(0,S.lastK);const d=Math.min(Math.abs(S.t-bt[k]),Math.abs(bt[Math.min(NB,k+1)]-S.t));fl=Math.max(0,1-d/0.16);}
    for(const t of tiles){const near=Math.abs(t.m.position.z-active(0).pos.z)<26;t.m.visible=near;if(near)t.m.material.emissiveIntensity=0.25+1.0*fl;}
    for(const b of beams){const near=Math.abs(b.m.position.z-active(0).pos.z)<26;b.m.visible=near&&fl>0.25;}
    water.position.y=damp(water.position.y,F.chorus&&S.phase===1?0.35:-0.3,2,dt);
    signStrips.forEach(s=>{s.ic.rotation.y+=dt*2;s.ic.scale.setScalar(1+0.3*fl);});
    if(!F.freed){zv.pos.set(cage.position.x+Math.sin(G.time)*0.1,0.9,cageZ);}});
  /* ---------- конец песни: подушка, игла поднимается — «Моё» ---------- */
  function endSong(){F.stage='moyo';W.custom=null;W.song=null;const pe=T.pelageya,pr=T.proshka,po=T.potap,yo=T.yosha;
    [pr,po,pe,yo].forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,cz+2.2,0.9);h.face=Math.PI;});
    const K5=makeKoschei();K5.g.position.set(0,0,cz-14);K5.g.rotation.y=0;K5.g.scale.setScalar(1.15);const nb=makeNotebook();nb.g.scale.setScalar(0.9);nb.g.visible=false;
    play({dur:25,fov:44,camK:2.2,shots:[shot(0,[0,3,cz+8],[0,1.4,cz-1.4]),shot(4.6,[4,2.6,cz+4],[0,2.4,cz-9]),shot(9,[1.6,3.8,cz-0.4],[0,3,cz-2.4]),shot(13.4,[-2.4,2,cz+3.6],[-0.8,1.4,cz+2.2]),shot(18,[2.6,3,cz-1],[0,2.8,cz-3])],
      says:[[0.3,3.6,null,'<i>Мы попадаем в последние доли вместе — и игла поднимается в воздух, светясь. Варя тянется за ней Пелагеей…</i>',true],[4,3.6,null,'<i>…и музыка обрывается. В зал Кощей входит.</i>',true],
        [9.4,2.6,'koschei','<i>(очень тихо)</i> Моё. Моё.'],[12.2,4.2,null,'<i>Он на Звенышко оглянулся — Звенышко в тетрадку нырнуло.</i><br><i>Пелагея тетрадку к себе прижала — и не дрогнула.</i>',true],
        [16.6,4.2,null,'<i>Кощей на неё смотрит — долго-долго.</i>',true],[21,3.2,null,'<i>Потом яйцо раскалывается — и мы падаем на ступени терема.</i>',true]],
      events:[{t:0.3,fn:()=>{anim(3,k=>{needle.g.position.y=0.9+k*2.2;needle.g.rotation.z=Math.PI/2*(1-k);needle.glow.material.opacity=0.25+k*0.5;});}},{t:3.4,fn:()=>{anim(0.6,k=>{pe.pos.z=cz+2.2-k*1.4;});}},
        {t:4,fn:()=>{SFX.gate();const f=K5.g.position.clone();anim(4.5,k=>{K5.g.position.lerpVectors(f,new V3(0,0.9,cz-2.6),k);K5.body.rotation.z=Math.sin(k*20)*0.02;});}},
        {t:8.6,fn:()=>{anim(0.8,k=>{K5.armR.rotation.x=-k*1.3;});later(0.8,()=>{needle.g.position.set(0.3,3.6,cz-1.8);anim(1,k=>{needle.g.position.lerp(new V3(0.35,3.2,cz-2.2),k);});});}},
        {t:12.2,fn:()=>{nb.g.visible=true;nb.g.position.set(pe.pos.x+0.2,1.9,pe.pos.z-0.3);const f=zv.pos.clone();anim(1,k=>{zv.pos.lerpVectors(f,nb.g.position,k);});later(1,()=>{zv.vis=false;zv.g.visible=false;burst(nb.g.position.clone(),COL.gold,10,2);});K5.head.rotation.y=0.5;}},
        {t:16.6,fn:()=>{K5.head.rotation.y=-0.2;K5.head.rotation.x=0.15;}},
        {t:21.2,fn:()=>{SFX.crash();shake(0,0.4,0.6);shake(1,0.4,0.6);$('flash').style.transition='opacity .5s';$('flash').style.opacity=1;}}],
      end:()=>{W.anims.length=0;flushGifts();F.out=true;setTimeout(()=>{$('flash').style.opacity=0;},600);banner('Игла — у Кощея в руке','#a0ffb8',2.6,'в лавке у Векши — пляска «Калинка», загляни!');later(1.6,finishLevel);}});}
  function intro(){F.stage='introCine';HEROES.forEach((h,i)=>{placeOnGround(h,LANE[i<2?0:1]+(i%2?-0.8:0.8),6+(i%2)*1.8,0);h.face=Math.PI;});const egg=makeEgg(2);egg.g.position.set(0,0.4,2);
    play({dur:12,fov:46,camK:2.6,shots:[shot(0,[4,2.4,8],[0,1,2]),shot(4.4,[0,6,14],[0,2,-10])],
      says:[[0.3,3.8,null,'<i>Яйцо в лапах Пелагеи трескается — и нас затягивает внутрь.</i>',true],[4.4,3.8,null,'<i>Внутри — Кощеев бальный зал, золотой, вверх дном.</i><br><i>«Калинка» играет: куплет медленный, а припев — бегом.</i>',true],[8.6,3,'pelageya','…посреди зала — игла.']],
      events:[{t:0.4,fn:()=>{anim(3,k=>{egg.g.scale.setScalar(2+k*0.6);egg.g.rotation.z=Math.sin(k*30)*0.1*k;});}},{t:3.6,fn:()=>{egg.g.visible=false;$('flash').style.opacity=0.8;later(0.3,()=>{$('flash').style.opacity=0;});}}],
      end:()=>{W.anims.length=0;F.stage='song';S.state='play';HEROES.forEach((h,i)=>{placeOnGround(h,LANE[i<2?0:1]+(i%2?-0.8:0.8),6+(i%2)*1.8,0);h.face=Math.PI;});snapCams();}});}
  W.camFn=()=>{const a=active(0),b=active(1);const z=Math.min(a.pos.z,b.pos.z);return {pos:new V3(0,5.2,z+8.5),look:new V3(0,1.3,z-5),roll:Math.sin(flipA)*0.25,k:6};};
  /* ---------- рисунки кнопок и задачи ---------- */
  prompt(1,'skill',()=>headOf(active(1)),()=>F.cageOn&&!F.freed&&active(1).kind==='yosha'&&Math.abs(active(1).pos.z-cageZ)<9,'полей чёрные нитки!');
  prompt(1,'swap',()=>headOf(active(1)),()=>F.cageOn&&!F.freed&&active(1).kind!=='yosha','Йоша — к клетке');
  for(const pi of[0,1])prompt(pi,'guard',()=>headOf(active(pi)),()=>{const k=Math.max(0,S.lastK+1);return S.state==='play'&&k<NB&&act(pi,k)==='guard'&&bt[k]-S.t<0.6;});
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const mk=pi=>[
    OR(()=>'«Калинка»! Прыжок '+K(pi,'jump')+' на каждую золотую плитку — в долю, по бубенцу.<br>Широкая полоса — пол переворачивается. Жёлтое солнышко — защита '+K(pi,'guard')+' в долю, к лицу.',()=>S.phase>=3||F.freed,()=>[],null,'…прыгаем в долю — и на потолок приземляемся.'),
    OR(pi?()=>'Клетка из чёрных ниток — справа! Йоша '+K(1,'swap')+', ковшик мёртвой воды '+K(1,'skill')+'.':()=>'Клетка из чёрных ниток! Там что-то тусклое… Йоша нитки режет — держи долю.',()=>F.freed,()=>[cage],null,'…клетка. А в ней — что-то еле живое.'),
    OR(()=>'Последний припев — на подушке, все четверо. Последние доли — вместе.',()=>F.stage==='moyo',()=>[cush]),
    O('Игла…',()=>false,()=>[])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.spawns=[[new V3(LANE[0]+0.8,0,6),new V3(LANE[0]-0.8,0,7.8)],[new V3(LANE[1]+0.8,0,6),new V3(LANE[1]-0.8,0,7.8)]];W.startAct=[0,0];
  W.pauseLine='Внутри яйца — «Калинка». Прыжок на каждую золотую плитку в долю, широкая полоса — пол переворачивается.<br>В припеве жёлтое солнышко — защита в долю. Клетка из чёрных ниток — Йоша ковшиком разрезает.<br>Промах не страшен: нить подтянет, фраза повторится снова.';
  W.onStart=()=>{intro();};
  flushDecor();}

