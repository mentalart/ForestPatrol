/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ФИНАЛ — ЗАЧЕМ ПУТАЛ, ЦЕПОЧКА ИЗ ДУПЛА, ДОРОГА СВЕТЛЯКОВ ============================== */
// Было: Леший садится на пень, говорит «Проиграл… путь укажу», Прошка шутит про шапку — и всё: ни причины, ни награды, ни дороги (16 с, 3 плана).
// Стало (ручная постановка def.kino, docs/40_kino_pravila.md; 28,5 с, 7 планов) — мини-история «зачем путал → что вернул → куда дальше»:
//   1 общий: распутанный Леший плюхается на пень, лешачата хлопают, листопад;            2 Леший крупно: «Проиграл, что ж… Теперь я вам должен — путь укажу.»;
//   3 двое: Прошка выходит вперёд — «Дедушка Леший, а зачем ты нас путал?»;            4 Леший крупно, смущён: «Ворона Кощеева нашептала — вот я и путал.» (за ним
//     над ёлками пролетает чёрная ворона — первый след Кощея в мире после ключа на чёрной нитке в 1-5);
//   5 деталь: из дупла выглядывает сова, из дупла поднимается золотая цепочка — «Держите: цепочка золотая — ворона в дупло спрятала.», цепочка летит Прошке;
//   6 герои: Прошка поднимает цепочку, Йоша прыгает, Потап смеётся — «(тихо) А шапка-то, между прочим, помогает.»;
//   7 над плечом Лешего вдоль тропы: он поднимает руку, ёлки расступаются, по тропе бегут светляки — «Светлячки дорогу укажут. Позовёте — приду!»
//   (долг Лешего — светлячки в 4-4). Цепочка — та, что Кузьма после боя вешает на дуб (первая цепь); звенья игрока не меняются.
// Конец и пропуск — как раньше (прототип: баннер «Леший-Путаник распутан!», finishLevel); всё своё убирается в end.
const K1FN={on:false,st:{}};K1B.fin=K1FN;
{const _fn=K1B.finale;K1B.finale=function(scale){const o=_fn(scale);K1FN.L=o;return o;};}
function k1fnFir(g,s){const f=new THREE.Group();f.position.set(s*1.1,0,-27.4);g.add(f);addMesh(GEO.trunk,M(0x5a3d22),0,0.6,0,f);addMesh(GEO.cone1,M(0x2f5a34),0,2.0,0,f);addMesh(GEO.cone2,M(0x2f5a34),0,3.1,0,f);f.scale.setScalar(1.4);return f;}
function k1fnChain(g){const c=new THREE.Group();g.add(c);const mat=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.9});
  for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(0.11,0.035,6,12),mat);m.position.y=-i*0.17;m.rotation.y=i%2?Math.PI/2:0;c.add(m);}c.visible=false;return c;}
function k1fnOwl(g){const o=new THREE.Group();g.add(o);addMesh(new THREE.SphereGeometry(0.22,10,8),M(0x8a6a4a),0,0,0,o);
  for(const s of[-1,1]){addMesh(new THREE.SphereGeometry(0.075,8,6),M(0xffe27a,{emissive:0xffc840,emissiveIntensity:0.8}),s*0.09,0.04,0.17,o);addMesh(new THREE.SphereGeometry(0.035,6,4),MAT.dark,s*0.09,0.04,0.235,o);
    const t=addMesh(new THREE.ConeGeometry(0.05,0.14,4),M(0x8a6a4a),s*0.12,0.22,0,o);t.rotation.z=-s*0.3;}
  const b=addMesh(new THREE.ConeGeometry(0.035,0.09,4),M(0xe0a040),0,-0.04,0.23,o);b.rotation.x=Math.PI/2;o.scale.setScalar(0.01);return o;}
function k1fnCrow(g){const c=new THREE.Group();g.add(c);const bm=M(0x15151c);addMesh(new THREE.SphereGeometry(0.28,8,6),bm,0,0,0,c).scale.set(0.8,0.7,1.4);
  addMesh(new THREE.SphereGeometry(0.16,8,6),bm,0,0.08,0.38,c);const bk=addMesh(new THREE.ConeGeometry(0.05,0.18,4),M(0x4a4a50),0,0.06,0.56,c);bk.rotation.x=Math.PI/2;
  const w=[-1,1].map(s=>{const p=new THREE.Group();p.position.set(s*0.18,0.05,0);c.add(p);addMesh(new THREE.BoxGeometry(0.9,0.04,0.36),bm,s*0.45,0,0,p);return p;});c.visible=false;return {c,w};}
{const _end=K1B.cine.end;K1B.cine.end=function(d){d=_end(d);const L=K1FN.L,H=HERO;if(!L||typeof KS!=='function')return d;
  const g=new THREE.Group();k1Add(g);const L1=k1fnFir(g,-1),R1=k1fnFir(g,1),chain=k1fnChain(g),owl=k1fnOwl(g),crow=k1fnCrow(g),fl=[];
  const HO=new V3(0.43,2.13,-15.03);   // дупло (кость hips Лешего на пне, масштаб 1,3)
  try{if(L.rig&&L.rig.hips){L.g.updateMatrixWorld(true);const p=L.rig.hips.getWorldPosition(new V3());HO.set(p.x+0.43,p.y-0.13,p.z+0.97);}}catch(e){}
  owl.position.copy(HO).add(new V3(0,0.05,0.12));
  K1FN.on=true;K1FN.st={chain:0,owl:0,crow:0,firs:0};const D={npc:null};
  if(typeof regNpc==='function'&&!ACT.npcs.some(n=>n.o===L))D.npc=regNpc(L,'leshy')&&ACT.npcs[ACT.npcs.length-1];
  const pr=()=>H.proshka;
  d.kino=true;d.dur=28.5;d.fov=48;d.mood=['#ffe6b0',0.05];
  d.says=[[3.2,5.4,'leshy','<i>(садится на пень)</i> Проиграл, что ж…<br>Теперь я вам должен — путь укажу.'],
    [8.9,2.7,'proshka','Дедушка Леший, а зачем ты нас путал?'],
    [11.8,3.8,'leshy','Ворона Кощеева нашептала — вот я и путал.'],
    [15.9,4.5,'leshy','Держите: цепочка золотая — ворона в дупло спрятала.'],
    [20.8,2.7,'proshka','<i>(тихо)</i> А шапка-то, между прочим, помогает.'],
    [23.8,4.1,'leshy','Светлячки дорогу укажут. Позовёте — приду!']];
  d.shots=[KS(0,[0,6.6,-2.6],[0,2.6,-14.5],{move:'push',amp:0.6}),                                              // 1 общий: на пень
    KS(3.0,[0.6,4.6,-10.6],[0,3.6,-16],{trk:KC.fcam(L,6.2,0.2,0.1,0.15),tr:'cut'}),                              // 2 Леший крупно
    KS(8.7,[2.6,3.1,-13.8],[-1.2,1.2,-10.2],{move:'truck',amp:0.5,tr:'whip'}),                                    // 3 Прошка спрашивает (за плечом Лешего)
    KS(11.6,[-0.8,4.4,-11.0],[0,3.8,-16],{trk:KC.fcam(L,5.4,-0.3,0.15,0.2),tr:'cut'}),                         // 4 Леший смущён, за ним — ворона
    KS(15.6,[2.1,2.7,-12.0],[HO.x,HO.y+0.2,HO.z],{move:'push',amp:0.35,tr:'dip'}),                                     // 5 деталь: дупло, сова, цепочка
    KS(20.4,[-0.6,2.9,-14.9],[-1.0,1.4,-10.6],{move:'pull',amp:0.4,tr:'whip'}),                                   // 6 герои: цепочка у Прошки
    KS(23.6,[3.6,6.6,-10.2],[0,2.0,-27],{p2:[2.2,6.0,-13.2],l2:[0,1.8,-29.5],dur:4.9,tr:'dip'})];                  // 7 над плечом Лешего — тропа
  d.events=(d.events||[]).filter(e=>e.t<7&&e.t!==2).concat([   // без «чешет мох» на 2 с — рука закрывала лицо говорящего

    {t:0.05,fn:()=>{L.g.position.y=2.2;anim(0.7,k=>{L.g.position.y=0.7+1.5*(1-CINE.E.outBack(k));});later(0.62,()=>{shakeAll(0.05,0.3);if(K1B.fx)K1B.fx.leaves(new V3(0,0.6,-16),24,{spd:1.6,up:0.8});});}},
    {t:8.7,fn:()=>{const h=pr();if(!h)return;const a=h.pos.clone(),b=new V3(-1.3,0,-11.3);anim(0.8,k=>{const q=CINE.E.inOutCubic?CINE.E.inOutCubic(k):k;h.pos.set(lerp(a.x,b.x,q),0,lerp(a.z,b.z,q));h.face=Math.PI;});}},
    {t:12.0,fn:()=>{crow.c.visible=true;K1FN.st.crow=1;anim(3.2,k=>{crow.c.position.set(-9+18*k,6.2+Math.sin(k*Math.PI)*1.2,-23.5);crow.c.rotation.y=Math.PI/2;crow.w.forEach((p,i)=>{p.rotation.z=(i?-1:1)*Math.sin(G.time*14)*0.6;});});later(3.25,()=>{crow.c.visible=false;});}},
    {t:15.8,fn:()=>{K1FN.st.owl=1;anim(0.5,k=>{owl.scale.setScalar(Math.max(0.01,CINE.E.outBack(k)));});}},
    {t:16.6,fn:()=>{chain.visible=true;K1FN.st.chain=1;const a=HO.clone().add(new V3(0,0.3,0.15));anim(0.9,k=>{chain.position.copy(a).add(new V3(0,0.5*CINE.E.outBack(k),0.2*k));chain.rotation.y=k*4;});}},
    {t:19.0,fn:()=>{const a=chain.position.clone();anim(1.0,k=>{const h=pr();const b=h?h.pos.clone().add(new V3(0,2.55,0)):a;chain.position.lerpVectors(a,b,k);chain.position.y+=Math.sin(k*Math.PI)*1.4;chain.rotation.y+=0.2;});later(1.02,()=>{K1FN.held=true;});
      anim(0.4,k=>{owl.scale.setScalar(Math.max(0.01,1-k));});}},
    {t:23.9,fn:()=>{K1FN.st.firs=1;const s0=L.rig&&L.rig.shR?L.rig.shR.rotation.z:0;anim(0.8,k=>{if(L.rig&&L.rig.shR)L.rig.shR.rotation.z=lerp(s0,-1.7,CINE.E.outBack(k));});
      later(0.4,()=>anim(1.4,k=>{const q=CINE.E.outBack(k);L1.position.x=-1.1-2.9*q;R1.position.x=1.1+2.9*q;L1.rotation.z=0.25*q;R1.rotation.z=-0.25*q;}));}},
    {t:24.9,fn:()=>{for(let i=0;i<12;i++)later(i*0.12,()=>{const m=new THREE.Mesh(new THREE.SphereGeometry(0.13,6,5),new THREE.MeshBasicMaterial({color:0xfff3a0}));m.position.set(Math.sin(i*1.7)*0.6,0.7,-18.5-i*0.9);g.add(m);fl.push(m);});}}]);
  d.cues=[[0.6,()=>{try{KSND.thud(0);}catch(e){}}],[1.0,()=>K1B.emo(L,'dizzy',2)],[3.1,()=>K1B.emo(L,'sheepish',0)],[3.3,KC.all('nod')],
    [8.8,KC.emo('proshka','tilt')],[9.4,KC.emo('pelageya','tilt')],[11.7,()=>K1B.emo(L,'sheepish',0)],[12.1,()=>{try{KSND.caw(0);KSND.flaps(0.3);}catch(e){}}],[13.0,KC.emo('yosha','surprise')],[13.4,KC.emo('potap','flinch')],
    [15.85,()=>{try{KSND.trill(0);}catch(e){}}],[16.6,()=>{try{KSND.magic(0);}catch(e){}for(let i=0;i<6;i++)spawnSpark(HO.clone().add(new V3(0,0.6,0.2)),COL.gold);}],[17.2,()=>K1B.emo(L,'laugh',1.4)],
    [20.0,()=>{try{KSND.yay(0);}catch(e){}const h=pr();if(h)for(let i=0;i<8;i++)spawnSpark(h.pos.clone().add(new V3(0,2,0)),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);}],[20.1,KC.emo('proshka','pride')],[20.3,KC.emo('yosha','hop')],[20.6,KC.emo('pelageya','joy')],
    [22.6,KC.emo('potap','laugh')],[22.8,()=>K1B.emo(L,'laugh',1.6)],[24.3,()=>{try{KSND.poof(0);}catch(e){}if(K1B.fx)K1B.fx.leaves(new V3(0,3,-27.4),30,{spd:2,up:1.2});}],[25.2,()=>{try{KSND.fanfare(0);}catch(e){}}],[26.0,KC.all('cheer')]];
  const tk=d.tick;d.tick=(t,dt)=>{if(tk)tk(t,dt);fl.forEach((m,i)=>{m.position.y=0.7+Math.sin(G.time*3+i)*0.2;});
    if(K1FN.held){const h=pr();if(h)chain.position.copy(h.pos).add(new V3(0,2.55+Math.sin(G.time*4)*0.05,0));chain.rotation.y+=0.03;}
    if(owl.scale.x>0.05)owl.rotation.y=Math.sin(G.time*2)*0.4;};
  const oe=d.end;d.end=()=>{K1FN.on=false;K1FN.held=false;k1Del(g);if(D.npc){const j=ACT.npcs.indexOf(D.npc);if(j>=0)ACT.npcs.splice(j,1);}if(oe)oe();
    if(K1B.bal&&K1B.bal.winSub)banner('Леший-Путаник распутан!','#ffd76a',2.4,K1B.bal.winSub());};   // звёзды мастерства — подписью к итогу, после ролика (раньше баннер висел поверх ролика)
  return d;};}
{const _ll=loadLevel;loadLevel=function(i){K1FN.on=false;K1FN.held=false;K1FN.L=null;_ll(i);};}
