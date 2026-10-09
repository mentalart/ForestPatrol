/* ============================== МОРОКИ (язык боя v4: сигнал → защита → запал гаснет → Пробой → X) ============================== */
// Все враги — нитяные мороки в облике существ: удар распутывает, а не убивает. Живые существа мороками не бывают.
const FOE={
 morok:{r:0.62,emb:3,sig:['yellow'],sp:1.7,look:'ball',col:[0x4a2440,0x9a4482,0x5a2a6a,0xb0609a]},   // пролог: колючий клубок
 kiki:{r:0.55,emb:3,sig:['yellow'],sp:2.2,look:'kiki'},                                              // кикиморка с ложкой
 stump:{r:0.95,emb:8,sig:['yellow','red'],sp:1.2,look:'stump',big:true,shell:true},                  // пень-ворчун в коре
 leshonok:{r:0.55,emb:3,sig:['yellow'],sp:2.6,look:'leshonok'},                                      // лешачонок в шапке из мха
 thread:{r:0.6,emb:3,sig:['yellow','blue','red'],sp:2.1,look:'ball',col:[0x55555f,0xb0b0c0,0x6e6e7c,0xd8d8e4],ranged:true}, // нитяной морок из прялки
 tat:{r:0.5,emb:3,sig:['yellow','red'],sp:2.4,look:'tat',ranged:false},                          // тать-паутинник: грызёт нить, на которой никто не стоит
 hand:{r:0.9,emb:4,sig:['yellow'],sp:3.0,look:'hand'},                                              // рука-коряга Лешего (1-Б)
 leshyBoss:{r:1.8,emb:9,sig:['yellow','red'],sp:0.01,look:'leshyBoss',big:true,shell:true},         // Леший в коре, фаза 3
 shchuka:{r:0.62,emb:3,sig:['blue'],sp:1.9,look:'pike',col:[0x4f6f5c,0x9ab8a4,0x5e7e6a,0xc8dccc],ranged:true,selfBreak:true},   // щука-морок: пузырь-капля; вернули — «сама себя»
 rak:{r:0.62,emb:3,sig:['red','yellow'],sp:2.0,look:'crab'},                                          // рак-щипач: красная хватка, в отливе вязнет в грядках
 tinnik:{r:0.6,emb:4,sig:['yellow'],sp:1.1,look:'tina'},                                              // тинник у горла кита: медленный, запал 4
 tyagun:{r:0.6,emb:3,sig:['red'],sp:2.0,look:'tyagun'},                                           // тягун: угорь колодца — под водой неуязвим, в отлив на мели, хватает и тянет
 puzyr:{r:0.66,emb:3,sig:['blue','yellow'],sp:1.4,look:'puff',ranged:true},                           // пузырник: надувается — рогатка прерывает
 vodyanoy:{r:2.1,emb:8,sig:['blue'],sp:0.01,look:'vod',big:true,shell:true},                        // Водяной: буйная вода, а не злодей
 ten:{r:0.55,emb:3,sig:['yellow','blue'],sp:2.3,look:'ten'},                                         // тень-морок: плоская, уязвима только в свете
 tucha:{r:0.8,emb:3,sig:['blue'],sp:1.3,look:'tucha'},                                               // грозовая тучка: молния-капля; в свете мягкая
 motylek:{r:0.5,emb:3,sig:['yellow'],sp:2.3,look:'motylek'},                                       // двусветный мотылёк: раскрывается только в свете обоих сразу
 vorona:{r:0.55,emb:3,sig:['red','yellow'],sp:2.6,look:'vorona'},                                    // ворона-морок с чёрным ключом: красная хватка
 solovei:{r:1.5,emb:8,sig:['yellow'],sp:0.01,look:'solovei',big:true},                              // Соловей-Разбойник: свист, а не злодей
 bolvan:{r:0.75,emb:3,sig:['yellow','red'],sp:1.2,look:'bolvan'},                                    // чугунный болван в раскалённых латах: полить, сорвать клещами
 lizard:{r:0.5,emb:3,sig:['blue'],sp:0.01,look:'lizard',ranged:true},                                // жар-ящерка на свае: огонёк отбить — упадёт в огонь
 pechnik:{r:0.6,emb:3,sig:['red','yellow'],sp:1.4,look:'pechnik'},                                 // печник: остывший неуязвим — накорми горячим из клещей
 zmeenysh:{r:0.5,emb:3,sig:['yellow','red'],sp:2.4,look:'snake'},                                    // змеёныш: в лаве сильный, на сухом ленивый
 golova:{r:1.2,emb:4,sig:['yellow'],sp:0.01,look:'golova',big:true},
 pugalo:{r:0.6,emb:3,sig:['yellow','red'],sp:1.7,look:'pugalo'},                                     // пугало-страж Кощея: соломой машет, рукавом хватает
 hameley:{r:0.55,emb:3,sig:['yellow'],sp:2.0,look:'hameley'},                                      // хамелей: перенимает ближайший знак — слабость меняется
 dvoynik:{r:0.55,emb:3,sig:['yellow','blue','red'],sp:2.3,look:'dvoynik',ranged:true},
 cep:{r:0.6,emb:3,sig:['yellow','blue','red'],sp:0.01,look:'cep',ranged:true}};                    // цепь Кощея из земли (финал): отбив выбивает золотое звено             // тень-двойник: чёрная копия героя, перенимает любимую защиту                               // голова Горыныча: у каждой свой запал                              // Соловей-Разбойник: свист, а не злодей                         // Водяной: буйная вода, а не злодей
function foeSignals(parent,y){const sig=new THREE.Group();sig.position.y=y;parent.add(sig);
  const sy=new THREE.Group();sig.add(sy);const sunM=M(COL.yellow,{emissive:COL.yellow,emissiveIntensity:1.3});part(sy,new THREE.SphereGeometry(0.2,14,10),sunM,0,0,0);
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const c=part(sy,new THREE.ConeGeometry(0.05,0.16,5),sunM,Math.cos(a)*0.31,Math.sin(a)*0.31,0);c.rotation.z=a-Math.PI/2;}
  const sr=new THREE.Group();sig.add(sr);const rm=M(COL.red,{emissive:COL.red,emissiveIntensity:1.2});part(sr,new THREE.ConeGeometry(0.2,0.6,6),rm,0,0.08,0);
  for(let i=0;i<4;i++){const c=part(sr,new THREE.ConeGeometry(0.08,0.32,5),rm,Math.cos(i*Math.PI/2)*0.22,-0.05,Math.sin(i*Math.PI/2)*0.22);c.rotation.z=-Math.cos(i*Math.PI/2)*1.3;c.rotation.x=Math.sin(i*Math.PI/2)*1.3;}
  const sb=new THREE.Group();sig.add(sb);const blm=M(COL.blue,{emissive:COL.blue,emissiveIntensity:1.2});part(sb,new THREE.SphereGeometry(0.22,14,10),blm,0,0.12,0);
  const dg=new THREE.ConeGeometry(0.215,0.42,14);dg.rotateX(Math.PI);part(sb,dg,blm,0,-0.18,0);
  const halo=new THREE.Mesh(new THREE.SphereGeometry(0.42,14,10),MB(0xffffff,{transparent:true,opacity:0.28,depthWrite:false}));sig.add(halo);
  const tRing=new THREE.Mesh(new THREE.TorusGeometry(1,0.035,6,32),MB(0xffffff,{transparent:true,opacity:0.9}));sig.add(tRing);
  sy.visible=sr.visible=sb.visible=false;sig.visible=false;return {sig,sy,sr,sb,halo,tRing};}
function foeLook(kind,inner,def){
  if(def.look==='ball'){const c=def.col;part(inner,new THREE.SphereGeometry(0.5,14,10),M(c[0]),0,0.62,0);const threads=[];
    for(let i=0;i<11;i++){const t=part(inner,new THREE.TorusGeometry(rand(0.47,0.6),0.035,6,26),M(c[1+i%3]),0,0.62,0);t.rotation.set(rand(0,Math.PI),rand(0,Math.PI),rand(0,Math.PI));threads.push(t);}
    const pm=M(0x2a1426),up=new V3(0,1,0),cg=new THREE.ConeGeometry(0.05,0.26,5);
    for(let i=0;i<24;i++){const y=1-2*(i+0.5)/24,r=Math.sqrt(1-y*y),th=i*2.39996;const d=new V3(Math.cos(th)*r,y,Math.sin(th)*r);if(d.z>0.5&&Math.abs(d.x)<0.55&&d.y>-0.25&&d.y<0.6)continue;
      const m=part(inner,cg,pm,d.x*0.56,0.62+d.y*0.56,d.z*0.56);m.quaternion.setFromUnitVectors(up,d);}
    return {threads,eyeY:0.72,eyeZ:0.44,top:1.3};}
  if(def.look==='tat'){const c=M(0x5a4a3a),c2=M(0x9a8660),dk=M(0x2a2018);const b=part(inner,new THREE.SphereGeometry(0.36,12,10),c,0,0.42,-0.05);b.scale.set(0.9,0.8,1.35);
    for(let i=0;i<6;i++){const t=part(inner,new THREE.TorusGeometry(rand(0.3,0.38),0.025,5,20),i%2?c2:dk,0,0.42,-0.05);t.rotation.set(rand(0,Math.PI),rand(0,Math.PI),0);t.scale.z=1.3;}   // нитки морока
    for(const sd of[-1,1])for(let i=0;i<3;i++){const l=part(inner,new THREE.CylinderGeometry(0.025,0.02,0.55,4),dk,sd*0.38,0.25,-0.3+i*0.25);l.rotation.z=sd*1.1;}   // паучьи лапки
    const jaw=[];for(const sd of[-1,1]){const j=new THREE.Group();j.position.set(sd*0.12,0.34,0.4);inner.add(j);const cn=part(j,new THREE.ConeGeometry(0.06,0.28,5),M(0xd8c8a8),0,0,0.12);cn.rotation.x=Math.PI/2;jaw.push(j);}   // жвала
    return {jaw,eyeY:0.5,eyeZ:0.36,top:0.9};}
  if(def.look==='kiki'){const b=M(0x4f6a36),dk=M(0x2f4a24);const cap=capsule(0.34,0.35,b);cap.position.y=0.6;inner.add(cap);
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const h=part(inner,new THREE.ConeGeometry(0.07,0.5,4),dk,Math.cos(a)*0.33,0.35,Math.sin(a)*0.33);h.rotation.x=Math.PI;}   // космы в тине
    for(let i=0;i<5;i++)part(inner,new THREE.SphereGeometry(0.08,8,6),M(0x7ab04a),rand(-0.25,0.25),rand(0.5,1.0),0.3).scale.set(1,0.4,1);                       // ряска
    const arm=new THREE.Group();arm.position.set(0.36,0.75,0.05);inner.add(arm);part(arm,new THREE.CylinderGeometry(0.05,0.05,0.5,6),b,0.1,-0.1,0).rotation.z=-0.6;
    const sp=new THREE.Group();sp.position.set(0.3,0.05,0.15);arm.add(sp);part(sp,new THREE.CylinderGeometry(0.025,0.025,0.55,5),M(0xc89a5a),0,0.25,0);part(sp,new THREE.SphereGeometry(0.1,8,6),M(0xc89a5a),0,0.55,0).scale.set(1,0.5,1.3); // ложка
    return {arm,eyeY:0.8,eyeZ:0.3,top:1.2};}
  if(def.look==='stump'){const bark=M(0x5a3d22),wood=M(0xc8a070,{emissive:0x000000});part(inner,new THREE.CylinderGeometry(0.72,0.86,1.3,12),wood,0,0.65,0);
    const top=part(inner,new THREE.CylinderGeometry(0.72,0.72,0.06,12),M(0xd8b888),0,1.32,0);for(const r of[0.5,0.3]){const t=part(inner,new THREE.TorusGeometry(r,0.02,4,20),M(0x8a6a44),0,1.36,0);t.rotation.x=Math.PI/2;}
    for(let i=0;i<5;i++){const a=i/5*Math.PI*2;const rt=part(inner,new THREE.ConeGeometry(0.2,0.8,5),bark,Math.sin(a)*0.85,0.15,Math.cos(a)*0.85);rt.rotation.x=Math.cos(a)*1.3;rt.rotation.z=-Math.sin(a)*1.3;}
    const plates={};for(const[k,a]of[['f',0],['r',Math.PI/2],['b',Math.PI],['l',-Math.PI/2]]){const pl=new THREE.Group();pl.rotation.y=a;inner.add(pl);
      part(pl,new THREE.BoxGeometry(0.95,1.15,0.14),bark,0,0.66,0.83);for(let j=0;j<3;j++)part(pl,new THREE.BoxGeometry(0.06,1.1,0.05),M(0x3a2614),-0.3+j*0.3,0.66,0.92);plates[k]=pl;}
    for(const s of[-1,1]){const br=part(inner,new THREE.CylinderGeometry(0.07,0.1,0.9,6),bark,s*0.9,1.0,0);br.rotation.z=s*0.9;}
    part(inner,new THREE.BoxGeometry(0.4,0.08,0.05),MAT.dark,0,0.55,0.95);   // ворчливый рот
    return {plates,eyeY:0.95,eyeZ:0.93,top:1.7,wood};}
  if(def.look==='hand'){const bark=M(0x5a4028),moss=M(0x3d5a2a);part(inner,new THREE.CylinderGeometry(0.35,0.45,1.2,8),moss,0,0.9,-0.2).rotation.x=0.5;
    part(inner,new THREE.SphereGeometry(0.5,10,8),bark,0,0.5,0.2).scale.set(1.2,0.7,1);for(let k=0;k<3;k++){const f=part(inner,new THREE.ConeGeometry(0.14,1.1,5),bark,(k-1)*0.32,0.35,0.75);f.rotation.x=1.35;}
    const arm=new THREE.Group();inner.add(arm);return {arm,eyeY:0.75,eyeZ:0.55,top:1.6};}
  if(def.look==='leshyBoss'){const moss=M(0x3d5a2a),bark=M(0x5a4028),eye=M(0xd8ff6a,{emissive:0xc8ff40,emissiveIntensity:1.3});
    part(inner,new THREE.CylinderGeometry(1.0,1.45,2.8,12),moss,0,1.4,0);const hd2=part(inner,new THREE.SphereGeometry(0.85,14,10),bark,0,3.3,0.1);const bdg=new THREE.ConeGeometry(0.75,1.8,8);bdg.rotateX(Math.PI);part(inner,bdg,M(0x2e4420),0,2.4,0.55);
    for(const s of[-1,1]){part(inner,new THREE.SphereGeometry(0.16,8,6),eye,s*0.3,3.45,0.8);const a=part(inner,new THREE.ConeGeometry(0.12,1.9,5),bark,s*0.6,4.4,0);a.rotation.z=-s*0.5;const a2=part(inner,new THREE.ConeGeometry(0.08,1,5),bark,s*1.1,4.7,0);a2.rotation.z=-s*1.1;}
    const plates={};for(const[k,a]of[['f',0],['r',Math.PI/2],['b',Math.PI],['l',-Math.PI/2]]){const pl=new THREE.Group();pl.rotation.y=a;inner.add(pl);
      part(pl,new THREE.BoxGeometry(1.6,2.2,0.2),bark,0,1.3,1.45);for(let j=0;j<4;j++)part(pl,new THREE.BoxGeometry(0.08,2.1,0.06),M(0x3a2614),-0.6+j*0.4,1.3,1.57);plates[k]=pl;}
    return {plates,eyeY:3.45,eyeZ:0.86,top:5.0};}
  if(def.look==='pike'){const c=def.col;const body=new THREE.Group();body.position.y=0.55;inner.add(body);
    const bg=new THREE.CylinderGeometry(0.34,0.24,1.3,12);bg.rotateX(Math.PI/2);part(body,bg,M(c[0]),0,0,-0.05);
    const hg=new THREE.ConeGeometry(0.3,0.75,12);hg.rotateX(Math.PI/2);part(body,hg,M(c[0]),0,0.04,0.95);
    const jaw=new THREE.Group();jaw.position.set(0,-0.1,0.62);body.add(jaw);const jg=new THREE.ConeGeometry(0.22,0.62,10);jg.rotateX(Math.PI/2);part(jaw,jg,M(c[2]),0,0,0.3);
    for(let i=0;i<5;i++)part(jaw,new THREE.ConeGeometry(0.03,0.09,4),M(0xf4f0e8),(i-2)*0.07,0.07,0.22+Math.abs(i-2)*0.03);
    const tail=new THREE.Group();tail.position.set(0,0,-0.72);body.add(tail);part(tail,new THREE.BoxGeometry(0.05,0.62,0.42),M(c[1]),0,0,-0.2);
    part(body,new THREE.BoxGeometry(0.05,0.3,0.42),M(c[1]),0,0.36,-0.32);for(const sd of[-1,1]){const f=part(body,new THREE.BoxGeometry(0.28,0.04,0.2),M(c[1]),sd*0.36,-0.12,0.2);f.rotation.z=sd*0.4;}
    for(let i=0;i<4;i++){const t=part(body,new THREE.TorusGeometry(0.33-i*0.02,0.028,5,20),M(c[1+i%3]),0,0,-0.45+i*0.26);t.rotation.set(rand(-0.2,0.2),rand(-0.2,0.2),0);}   // нитки морока
    return {eyeY:0.72,eyeZ:0.86,top:1.15,jaw,tail,fish:body};}
  if(def.look==='tyagun'){const sk=M(0x34485a),bl=M(0x6a8a9a),fin=M(0x6a2a3a);const fish=new THREE.Group();fish.position.y=0.4;inner.add(fish);const segs=[];
    for(let i=0;i<7;i++){const sg=part(fish,new THREE.SphereGeometry(0.27-i*0.025,10,8),i%2?sk:bl,0,0,0.42-i*0.28);sg.scale.set(1,0.85,1.3);segs.push(sg);}
    part(fish,new THREE.SphereGeometry(0.3,10,8),sk,0,0.06,0.68).scale.set(1,0.8,1.3);part(fish,new THREE.BoxGeometry(0.34,0.05,0.26),fin,0,-0.08,0.98);   // голова и пасть-присоска
    for(let i=0;i<6;i++)part(fish,new THREE.BoxGeometry(0.04,0.28-i*0.03,0.26),fin,0,0.3-i*0.02,0.34-i*0.28);   // гребень
    return {fish,segs,eyeY:0.6,eyeZ:0.9,top:1.0};}
  if(def.look==='crab'){const c=M(0xb0503a),dk=M(0x7a2a1a);const b=part(inner,new THREE.SphereGeometry(0.5,14,10),c,0,0.45,0);b.scale.set(1.12,0.5,0.85);
    for(let i=0;i<3;i++){const t=part(inner,new THREE.TorusGeometry(0.42-i*0.09,0.03,5,20),dk,0,0.62+i*0.03,-0.05-i*0.05);t.rotation.x=Math.PI/2;}
    for(const sd of[-1,1])for(let i=0;i<3;i++){const l=part(inner,new THREE.CylinderGeometry(0.04,0.03,0.55,5),dk,sd*0.56,0.25,-0.25+i*0.22);l.rotation.z=sd*1.0;}
    for(const sd of[-1,1])part(inner,new THREE.CylinderGeometry(0.03,0.03,0.3,5),dk,sd*0.16,0.74,0.28);
    const arm=new THREE.Group();arm.position.set(0,0.5,0.35);inner.add(arm);
    for(const sd of[-1,1]){const cl=new THREE.Group();cl.position.set(sd*0.44,0,0.18);arm.add(cl);part(cl,new THREE.SphereGeometry(0.2,10,8),c,0,0,0.1).scale.set(0.8,0.6,1.3);
      const a=part(cl,new THREE.ConeGeometry(0.08,0.36,6),c,0.06*sd,0.05,0.44);a.rotation.x=Math.PI/2;const bb=part(cl,new THREE.ConeGeometry(0.07,0.3,6),dk,-0.05*sd,-0.05,0.4);bb.rotation.x=Math.PI/2;}
    return {arm,eyeY:0.92,eyeZ:0.3,top:1.1};}
  if(def.look==='tina'){const c=M(0x3a5a2a),l=M(0x6a8a3a);part(inner,new THREE.SphereGeometry(0.5,12,10),c,0,0.65,0).scale.set(1,1.1,1);
    for(let i=0;i<18;i++){const a=i/18*Math.PI*2;const st=part(inner,new THREE.ConeGeometry(0.06,0.9,4),i%2?l:c,Math.cos(a)*0.42,0.35,Math.sin(a)*0.42);st.rotation.x=Math.PI+Math.sin(a)*0.25;st.rotation.z=Math.cos(a)*0.25;}
    for(let i=0;i<6;i++)part(inner,new THREE.SphereGeometry(0.06,6,5),M(0xa0d0ff,{transparent:true,opacity:0.6}),rand(-0.4,0.4),rand(0.95,1.3),rand(-0.3,0.3));
    return {eyeY:0.82,eyeZ:0.44,top:1.3};}
  if(def.look==='puff'){const c=M(0xd8c060),dk=M(0x8a6a2a);const puff=new THREE.Group();puff.position.y=0.66;inner.add(puff);part(puff,new THREE.SphereGeometry(0.48,14,10),c,0,0,0);
    const up=new V3(0,1,0),cg=new THREE.ConeGeometry(0.05,0.22,5);for(let i=0;i<30;i++){const y=1-2*(i+0.5)/30,r=Math.sqrt(1-y*y),th=i*2.39996;const d=new V3(Math.cos(th)*r,y,Math.sin(th)*r);if(d.z>0.55&&Math.abs(d.x)<0.5)continue;const m=part(puff,cg,dk,d.x*0.5,d.y*0.5,d.z*0.5);m.quaternion.setFromUnitVectors(up,d);}
    for(const sd of[-1,1]){const f=part(puff,new THREE.BoxGeometry(0.04,0.2,0.28),dk,sd*0.5,0,0);f.rotation.y=sd*0.6;}
    part(puff,new THREE.TorusGeometry(0.08,0.03,6,12),M(0xc05a3a),0,-0.12,0.47);
    return {puff,eyeY:0.8,eyeZ:0.44,top:1.3};}
  if(def.look==='vod'){const skin=M(0x5a7a5a),belly=M(0x8aa878),tina=M(0x3a5a2a),shellM=M(0xe8d8c8);
    const b=part(inner,new THREE.SphereGeometry(1.6,16,12),skin,0,1.5,0);b.scale.set(1.15,1,1);part(inner,new THREE.SphereGeometry(1.1,14,10),belly,0,1.3,0.75).scale.set(1,1,0.6);
    const head=new THREE.Group();head.position.set(0,3.0,0.3);inner.add(head);part(head,new THREE.SphereGeometry(0.9,14,10),skin,0,0,0).scale.set(1.2,0.85,1);
    const mouth=part(head,new THREE.TorusGeometry(0.4,0.08,6,16,Math.PI),MAT.dark,0,-0.28,0.82);mouth.rotation.z=Math.PI;
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2;const st=part(head,new THREE.ConeGeometry(0.07,1.0,4),tina,Math.cos(a)*0.8,0.1,Math.sin(a)*0.7);st.rotation.x=Math.PI+Math.sin(a)*0.3;st.rotation.z=Math.cos(a)*0.3;}
    const bd=new THREE.ConeGeometry(0.5,1.1,8);bd.rotateX(Math.PI);part(head,bd,tina,0,-0.8,0.62);
    for(const sd of[-1,1]){const arm=part(inner,new THREE.CylinderGeometry(0.28,0.22,1.4,8),skin,sd*1.7,1.3,0.3);arm.rotation.z=sd*0.9;part(inner,new THREE.SphereGeometry(0.34,8,6),skin,sd*2.3,0.8,0.5);}
    const plates={};for(const[k,a]of[['f',0],['r',Math.PI/2],['b',Math.PI],['l',-Math.PI/2]]){const pl=new THREE.Group();pl.rotation.y=a;inner.add(pl);
      for(let i=0;i<5;i++){const sh=part(pl,new THREE.SphereGeometry(0.34,10,6,0,Math.PI*2,0,Math.PI/2),shellM,(i-2)*0.42,1.1+Math.abs(i-2)*0.12,1.66);sh.rotation.x=Math.PI/2;}plates[k]=pl;}
    return {plates,eyeY:3.2,eyeZ:1.16,top:4.0,head};}
  if(def.look==='ten'){const mat=M(0x1a1428,{emissive:0x3a1a6a,emissiveIntensity:0.05});part(inner,new THREE.CylinderGeometry(0.26,0.5,1.2,10),mat,0,0.62,0);
    part(inner,new THREE.SphereGeometry(0.34,12,10),mat,0,1.4,0);for(const s of[-1,1]){const e=part(inner,new THREE.ConeGeometry(0.1,0.42,4),mat,s*0.2,1.8,0);e.rotation.z=-s*0.3;const a=part(inner,new THREE.ConeGeometry(0.08,0.8,4),mat,-s*0.5,0.85,0.05);a.rotation.z=s*2.5;}
    for(let i=0;i<5;i++){const f=part(inner,new THREE.ConeGeometry(0.12,0.4,4),mat,(i-2)*0.18,0.06,0);f.rotation.x=Math.PI;}
    const arm=new THREE.Group();arm.position.set(0.42,1.0,0.1);inner.add(arm);const cl=part(arm,new THREE.ConeGeometry(0.07,0.7,4),mat,0.1,-0.2,0.2);cl.rotation.x=1.2;
    return {mat,arm,eyeY:1.45,eyeZ:0.3,top:2.0};}
  if(def.look==='tucha'){const mat=M(0x6a6680,{emissive:0x000000});const cloud=new THREE.Group();cloud.position.y=2.1;inner.add(cloud);
    for(const[dx,dy,dz,s]of[[0,0,0,0.6],[0.5,-0.05,0.1,0.45],[-0.5,-0.05,0,0.47],[0.15,0.25,-0.1,0.42],[-0.2,-0.2,0.25,0.4]])part(cloud,new THREE.SphereGeometry(s,12,10),mat,dx,dy,dz);
    const bolt=new THREE.Group();cloud.add(bolt);const bm=MB(0xcfe0ff);for(let i=0;i<4;i++){const s2=part(bolt,new THREE.BoxGeometry(0.07,0.55,0.07),bm,(i%2?0.12:-0.12),-0.55-i*0.45,0.1);s2.rotation.z=i%2?0.5:-0.5;}bolt.visible=false;
    return {mat,cloud,bolt,eyeY:2.15,eyeZ:0.55,top:2.8};}
  if(def.look==='motylek'){const bm=M(0x3a2a4a),wm=M(0x9a8ab0,{transparent:true,opacity:0.8,side:THREE.DoubleSide});const body=new THREE.Group();body.position.y=1.0;inner.add(body);
    part(body,new THREE.CylinderGeometry(0.1,0.06,0.6,8),bm,0,0,0).rotation.x=Math.PI/2;part(body,new THREE.SphereGeometry(0.13,10,8),bm,0,0.03,0.32);
    for(const sd of[-1,1]){const a=part(body,new THREE.CylinderGeometry(0.01,0.01,0.36,4),bm,sd*0.07,0.2,0.42);a.rotation.x=-0.6;a.rotation.z=-sd*0.4;}   // усики
    const wings=[],spots=[];for(const sd of[-1,1]){const wp=new THREE.Group();wp.position.set(sd*0.08,0.04,0.02);body.add(wp);
      const wg=part(wp,new THREE.CircleGeometry(0.5,16),wm,sd*0.48,0,0);wg.rotation.x=-Math.PI/2;wg.scale.set(1,1.3,1);
      const c=PCOL[sd<0?0:1],sm=M(c,{emissive:c,emissiveIntensity:0.12,transparent:true,opacity:0.75,side:THREE.DoubleSide});const sp=part(wp,new THREE.CircleGeometry(0.2,14),sm,sd*0.52,0.012,0.04);sp.rotation.x=-Math.PI/2;   // пятно-свет: у каждого крыла свой игрок
      wings.push({wp,s:sd});spots.push(sm);}
    return {wings,spots,body,eyeY:1.06,eyeZ:0.34,top:1.4};}
  if(def.look==='vorona'){const bk=M(0x1e1e26),bk2=M(0x2e2e3a),bm=M(0x4a4a50);part(inner,new THREE.SphereGeometry(0.42,12,10),bk,0,0.6,0).scale.set(0.85,0.9,1.2);
    part(inner,new THREE.SphereGeometry(0.26,12,10),bk,0,1.05,0.3);const bg=new THREE.ConeGeometry(0.08,0.34,6);bg.rotateX(Math.PI/2);part(inner,bg,bm,0,1.0,0.62);
    part(inner,new THREE.BoxGeometry(0.4,0.04,0.5),bk2,0,0.7,-0.55).rotation.x=-0.4;
    const wings=[];for(const sd of[-1,1]){const wp=new THREE.Group();wp.position.set(sd*0.32,0.8,0);inner.add(wp);part(wp,new THREE.BoxGeometry(0.8,0.05,0.5),bk2,sd*0.4,0,0);wings.push({wp,sd});}
    for(const sd of[-1,1])part(inner,new THREE.CylinderGeometry(0.025,0.025,0.3,4),bm,sd*0.12,0.15,0);
    const key=new THREE.Group();key.position.set(0,0.78,0.42);inner.add(key);part(key,new THREE.CylinderGeometry(0.008,0.008,0.3,4),MB(0xd0c8b0),0,-0.1,0);const k2=blackKey(1.2);k2.position.y=-0.25;key.add(k2);
    return {wings,key,eyeY:1.1,eyeZ:0.52,top:1.5};}
  if(def.look==='pugalo'){const straw=M(0xd8b860),sack=M(0xc8b090),shirt=M(0x8a3a3a),wood=M(0x7a5634),hatM=M(0x5a4a3a);
    part(inner,new THREE.CylinderGeometry(0.07,0.08,1.6,6),wood,0,0.8,0);part(inner,new THREE.CylinderGeometry(0.34,0.44,0.9,8),shirt,0,1.25,0);for(let i=0;i<3;i++)part(inner,new THREE.BoxGeometry(0.16,0.14,0.02),M([0x4a6a8a,0xd8c060,0x6a8a4a][i]),(i-1)*0.2,1.1+i*0.12,0.4);
    const arm=new THREE.Group();arm.position.y=1.55;inner.add(arm);part(arm,new THREE.BoxGeometry(1.8,0.1,0.1),wood,0,0,0);
    for(const sd of[-1,1]){part(arm,new THREE.CylinderGeometry(0.14,0.12,0.7,6),shirt,sd*0.55,0,0).rotation.z=Math.PI/2;for(let k=0;k<5;k++){const t=part(arm,new THREE.ConeGeometry(0.05,0.34,4),straw,sd*(0.98+k*0.01),(k-2)*0.05,(k%2?0.05:-0.05));t.rotation.z=-sd*Math.PI/2;}}
    part(inner,new THREE.SphereGeometry(0.32,10,8),sack,0,2.0,0);for(let i=0;i<5;i++)part(inner,new THREE.BoxGeometry(0.03,0.08,0.02),MAT.dark,-0.12+i*0.06,1.86,0.3);
    part(inner,new THREE.ConeGeometry(0.4,0.55,10),hatM,0,2.5,0);part(inner,new THREE.CylinderGeometry(0.56,0.56,0.04,12),hatM,0,2.25,0);for(let k=0;k<7;k++){const t=part(inner,new THREE.ConeGeometry(0.04,0.32,4),straw,rand(-0.25,0.25),0.72,rand(-0.25,0.25));t.rotation.x=Math.PI;}
    return {arm,eyeY:2.04,eyeZ:0.28,top:2.8};}
  if(def.look==='hameley'){const bm=M(0xffd23a,{emissive:0xffd23a,emissiveIntensity:0.25});const body=new THREE.Group();inner.add(body);part(body,new THREE.SphereGeometry(0.46,14,10),bm,0,0.6,0).scale.set(1,0.9,1.1);
    for(let i=0;i<5;i++){const c=part(body,new THREE.ConeGeometry(0.08,0.3,5),bm,0,1.02-i*0.03,0.24-i*0.16);c.rotation.x=-0.3-i*0.2;}   // гребень
    const tail=part(body,new THREE.TorusGeometry(0.2,0.06,6,14,Math.PI*1.5),bm,0,0.32,-0.5);tail.rotation.y=Math.PI/2;for(const sd of[-1,1])part(body,new THREE.SphereGeometry(0.12,8,6),M(0x2a2a2a),sd*0.3,0.14,0.18);
    return {bm,body,eyeY:0.72,eyeZ:0.42,top:1.2};}
  if(def.look==='cep'){const im=M(0x3a3a44),gm=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5});const ch=new THREE.Group();inner.add(ch);for(let i=0;i<7;i++){const l=part(ch,new THREE.TorusGeometry(0.2,0.07,6,12),i===6?gm:im,0,0.2+i*0.3,0);l.rotation.y=i%2?Math.PI/2:0;l.scale.set(1,1.4,1);}
    const hook=part(inner,new THREE.TorusGeometry(0.28,0.08,6,14,Math.PI*1.3),im,0,2.5,0.1);hook.rotation.z=Math.PI*0.6;part(inner,new THREE.SphereGeometry(0.34,10,8),M(0x1a1620),0,2.2,0);
    return {chain:ch,eyeY:2.25,eyeZ:0.28,top:2.7};}
  if(def.look==='dvoynik'){const d=HERO_DEF[DV_KIND],sm=M(0x1c1428,{emissive:0x4a2090,emissiveIntensity:0.55});const g2=new THREE.Group();inner.add(g2);HB[DV_KIND](g2,()=>sm);g2.scale.setScalar(1.08);
    const rim=part(inner,new THREE.TorusGeometry(d.radius+0.1,0.04,6,24),MB(0x8a5ad0,{transparent:true,opacity:0.7}),0,0.05,0);rim.rotation.x=Math.PI/2;
    return {mat:sm,eyeY:d.height*0.78,eyeZ:d.radius*0.95,top:d.height+0.25};}
  if(def.look==='bolvan'){const iron=M(0x3e3c44),clay=M(0xa0704a);part(inner,new THREE.CylinderGeometry(0.55,0.65,1.3,10),clay,0,0.85,0);part(inner,new THREE.SphereGeometry(0.42,12,10),iron,0,1.8,0);
    for(const s of[-1,1]){part(inner,new THREE.CylinderGeometry(0.2,0.22,0.6,8),iron,s*0.3,0.2,0);part(inner,new THREE.SphereGeometry(0.28,10,8),iron,s*0.75,1.3,0);}
    const plateM=M(0xff6a20,{emissive:0xff3000,emissiveIntensity:0.7});const plate=new THREE.Group();inner.add(plate);part(plate,new THREE.BoxGeometry(1.2,1.1,0.2),plateM,0,1.0,0.55);for(let i=0;i<3;i++)part(plate,new THREE.BoxGeometry(1.0,0.05,0.05),M(0x2a2a30),0,0.7+i*0.3,0.67);
    part(inner,new THREE.BoxGeometry(0.9,0.12,0.9),iron,0,2.05,0);const arm=new THREE.Group();arm.position.set(0.75,1.3,0);inner.add(arm);part(arm,new THREE.CylinderGeometry(0.16,0.2,0.9,8),iron,0,-0.4,0.2).rotation.x=0.5;
    return {plate,plateM,arm,eyeY:1.85,eyeZ:0.38,top:2.3};}
  if(def.look==='pechnik'){const wh=M(0xe8e0d0),br=M(0xb05a3a),dk=M(0x2a2420);part(inner,new THREE.BoxGeometry(0.9,0.75,0.9),wh,0,0.72,0);part(inner,new THREE.BoxGeometry(0.98,0.1,0.98),br,0,1.12,0);
    part(inner,new THREE.CylinderGeometry(0.1,0.12,0.42,8),br,0.26,1.36,-0.26);for(const sx of[-1,1])for(const sz of[-1,1])part(inner,new THREE.CylinderGeometry(0.07,0.05,0.4,6),dk,sx*0.32,0.18,sz*0.32);   // труба и лапки
    const doorM=M(0x3a2a20,{emissive:0xff5a10,emissiveIntensity:0.08});const door=part(inner,new THREE.BoxGeometry(0.46,0.3,0.05),doorM,0,0.6,0.46);
    const slotM=M(0xff7a20,{emissive:0xff4a00,emissiveIntensity:0.05});const slot=part(inner,new THREE.BoxGeometry(0.42,0.06,0.3),slotM,0,1.18,-0.16);   // гнездо на спине
    const arm=new THREE.Group();arm.position.set(0.5,0.8,0);inner.add(arm);part(arm,new THREE.BoxGeometry(0.12,0.12,0.5),br,0,0,0.2);   // заслонка-лапа
    return {slot,slotM,door,doorM,arm,eyeY:0.9,eyeZ:0.47,top:1.6};}
  if(def.look==='lizard'){const c=M(0xd8501a,{emissive:0x802000,emissiveIntensity:0.5}),dk=M(0x7a2a10);const b=part(inner,new THREE.SphereGeometry(0.32,10,8),c,0,0.35,0);b.scale.set(0.8,0.6,1.5);
    part(inner,new THREE.SphereGeometry(0.22,10,8),c,0,0.45,0.5);for(const s of[-1,1])for(const z of[-0.2,0.25]){const l=part(inner,new THREE.CylinderGeometry(0.04,0.04,0.3,5),dk,s*0.28,0.2,z);l.rotation.z=s*0.9;}
    const tail=new THREE.Group();tail.position.set(0,0.35,-0.45);inner.add(tail);part(tail,new THREE.ConeGeometry(0.14,0.8,6),c,0,0,-0.4).rotation.x=-Math.PI/2;for(let i=0;i<4;i++)part(inner,new THREE.ConeGeometry(0.05,0.14,4),M(0xffc040,{emissive:0xff8000,emissiveIntensity:0.8}),0,0.58,0.3-i*0.2);
    return {tail,eyeY:0.55,eyeZ:0.66,top:0.9};}
  if(def.look==='snake'){const mat=M(0xff6a1a,{emissive:0xff3000,emissiveIntensity:0.6});const segs=[];for(let i=0;i<6;i++){const s2=part(inner,new THREE.SphereGeometry(0.24-i*0.025,10,8),mat,0,0.25,0.3-i*0.28);segs.push(s2);}
    part(inner,new THREE.SphereGeometry(0.26,10,8),mat,0,0.42,0.5).scale.set(1,0.8,1.3);return {segs,mat,eyeY:0.5,eyeZ:0.72,top:0.9};}
  if(def.look==='golova'){const sk=M(0x4a8a3a),dk=M(0x2a5a24);const head=new THREE.Group();head.position.y=0.8;inner.add(head);part(head,new THREE.SphereGeometry(0.8,14,10),sk,0,0,0).scale.set(1,0.85,1.3);
    const sn=part(head,new THREE.BoxGeometry(0.9,0.4,0.9),sk,0,-0.12,0.95);const jaw=new THREE.Group();jaw.position.set(0,-0.35,0.5);head.add(jaw);part(jaw,new THREE.BoxGeometry(0.8,0.16,1.0),dk,0,0,0.4);
    for(let i=0;i<5;i++)part(jaw,new THREE.ConeGeometry(0.05,0.14,4),M(0xf4f0e8),(i-2)*0.15,0.12,0.8);for(const s of[-1,1]){const h2=part(head,new THREE.ConeGeometry(0.12,0.6,5),dk,s*0.45,0.6,-0.3);h2.rotation.x=-0.6;}
    return {head,jaw,eyeY:1.05,eyeZ:0.85,top:1.9};}
  if(def.look==='solovei'){const L=soloveiBody(inner);return Object.assign(L,{arm:L.staff,eyeY:2.89,eyeZ:0.6,top:3.9});}
  // лешачонок
  const b=M(0x3d6224);const cap=capsule(0.3,0.25,b);cap.position.y=0.5;inner.add(cap);
  const hat=part(inner,new THREE.ConeGeometry(0.36,0.45,8),M(0x2e5a2a),0,1.02,0);part(inner,new THREE.TorusGeometry(0.33,0.06,6,16),M(0x4a7a3a),0,0.82,0).rotation.x=Math.PI/2;
  for(const s of[-1,1]){const t=part(inner,new THREE.ConeGeometry(0.04,0.4,4),M(0x5a4028),s*0.3,1.0,-0.05);t.rotation.z=-s*0.9;}
  return {eyeY:0.62,eyeZ:0.27,top:1.3,hat};}
function makeFoe(kind,x,z,o){o=o||{};const def=FOE[kind];const s=o.scale||1;
  const g=new THREE.Group();g.position.set(x,(o.y||0)-1.5,z);W.group.add(g);const body=new THREE.Group();g.add(body);const inner=new THREE.Group();inner.scale.setScalar(s);body.add(inner);
  const L=foeLook(kind,inner,def);
  const eyeMat=M(0xfff3a0,{emissive:0xfff3a0,emissiveIntensity:1});for(const sd of[-1,1]){part(inner,new THREE.SphereGeometry(0.1,10,8),eyeMat,sd*0.16,L.eyeY,L.eyeZ);part(inner,new THREE.SphereGeometry(0.045,8,6),MAT.dark,sd*0.16,L.eyeY,L.eyeZ+0.09);}
  const top=L.top*s,S=foeSignals(g,top+0.75);
  const n=def.emb,embers=[],er=n>3?0.55:0.3;for(let i=0;i<Math.max(n,8);i++){const em=M(0xff7a1a,{emissive:0xff5a00,emissiveIntensity:1});const a=i/n*Math.PI*2;
    const m=part(g,new THREE.SphereGeometry(n>3?0.085:0.1,8,6),em,n>3?Math.cos(a)*er:(i-1)*0.3,top+0.28,n>3?Math.sin(a)*er:0);m.visible=i<n;embers.push({m,mat:em});}
  const spin=new THREE.Group();spin.position.y=top+0.4;g.add(spin);const sm=M(0xe8d8b0,{emissive:0x806020,emissiveIntensity:0.3});
  for(let i=0;i<3;i++){const sp=new THREE.Group();const a=i/3*Math.PI*2;sp.position.set(Math.cos(a)*0.5,0,Math.sin(a)*0.5);spin.add(sp);
    part(sp,new THREE.ConeGeometry(0.07,0.22,6),sm,0,0.11,0);const c2=new THREE.ConeGeometry(0.07,0.22,6);c2.rotateX(Math.PI);part(sp,c2,sm,0,-0.11,0);}spin.visible=false;
  const br=new THREE.Mesh(new THREE.TorusGeometry(def.r*1.6,0.07,6,30),MB(0xfff2b0,{transparent:true,opacity:0.9}));br.rotation.x=Math.PI/2;br.position.y=0.1;br.visible=false;g.add(br);
  const satRim=new THREE.Mesh(new THREE.TorusGeometry(def.r*1.3,0.05,6,30),MB(0xff5a5a,{transparent:true,opacity:0.8}));satRim.rotation.x=Math.PI/2;satRim.position.y=0.3;satRim.visible=false;g.add(satRim);
  const e={kind,def,g,body,inner,L,pos:g.position,baseY:o.y||0,pi:o.pi,harmless:!!o.harmless,tutorial:!!o.tutorial,big:!!def.big,face:o.face||0,r:def.r*s,s,state:'spawn',t:0,cd:rand(1.2,2.0),
    embers:n,maxEmb:n,alive:true,signals:o.signals||def.sig,sig:null,lastSig:null,sameCount:0,tgt:null,S,eyeMat,embersM:embers,spin,br,satRim,home:new V3(x,o.y||0,z),leash:o.leash||6,
    wdur:0.5,slow:1,left:null,openHit:false,open:0,flashT:0,bdur:4,kx:0,kz:0,shell:def.shell?{f:true,b:true,l:true,r:true}:null,plateCd:0,sat:0,finT:0,finBy:-1,onDeath:o.onDeath||null};
  W.enemies.push(e);return e;}
const timingOf=pi=>TIMING[players[pi].path];
const genPath=()=>(players[0].path==='easy'||players[1].path==='easy')?'easy':(players[0].path==='mid'||players[1].path==='mid')?'mid':'hard';   // закон щедрого окна
function foeTarget(e){if(e.pi!==undefined){const h=active(e.pi);return (players[e.pi].downed||h.cling)?null:h;}
  let best=null,bd=12;for(const pi of[0,1]){const h=active(pi);if(players[pi].downed||h.cling)continue;const d=hd(h.pos,e.pos);if(d<bd&&Math.abs(h.pos.y-e.pos.y)<2.4){bd=d;best=h;}}return best;}
function canWind(e,h){const pi=h.player,lim=players[pi].path==='easy'?1:2;let n=0;for(const o of W.enemies)if(o!==e&&o.alive&&(o.state==='wind'||o.state==='ready')&&o.tgt&&o.tgt.player===pi)n++;return n<lim;}
function mMove(e,dx,dz,sp,dt){if(e.noMove)return;const nx=e.pos.x+dx*sp*dt,nz=e.pos.z+dz*sp*dt;const r=collideXZ(nx,nz,e.r,e.pos.y,e.pos.y+1.3,true);const g=groundAt(r.x,r.z,e.pos.y+STEP,undefined,undefined,e.bottom);
  if(g.y>e.pos.y-1.0&&hd(new V3(r.x,0,r.z),e.home)<e.leash){e.pos.x=r.x;e.pos.z=r.z;e.pos.y=g.y;}}
function foeWind(e){const h=e.tgt,p=players[h.player],T=timingOf(h.player);e.state='wind';e.t=0;e.left=null;
  let s=e.signals[Math.floor(Math.random()*e.signals.length)];if(e.signals.length>1&&s===e.lastSig&&e.sameCount>=1){const alt=e.signals.filter(x=>x!==s);s=alt[Math.floor(Math.random()*alt.length)];}
  if(e.pickSig)s=e.pickSig(e,h,s);e.sameCount=s===e.lastSig?e.sameCount+1:0;e.lastSig=s;e.sig=s;e.wdur=T.lead*(e.big?1.25:1);
  // первые три встречи с каждым сигналом на Лёгком и Среднем пути — у морока время вдвое медленнее, рядом проступает кнопка
  const n=p.enc[s]||0;e.slow=(n<3&&p.path!=='hard')?0.5:1;p.enc[s]=n+1;e.help=n<3||p.path==='easy';
  (s==='yellow'?SFX.yellow:s==='red'?SFX.red:SFX.blue)();}
function foeStrike(e){const h=e.tgt;if(!h)return;const pi=h.player,T=timingOf(pi);
  if(e.sig==='blue'){spawnBolt(e,h);return;}
  const d=hd(h.pos,e.pos);
  if(e.sig==='red'&&(h.rollT>0||G.time-(h.lastRoll||-9)<0.45)){foeDodge(e,h);return;}
  if(d>e.r+2.0||Math.abs(h.pos.y-e.pos.y)>1.6||h.cling||players[pi].downed){floatText(e.pos.clone().add(new V3(0,2.2,0)),'мимо','#dddddd');return;}
  if(e.sig==='red'){hitHero(e,h,h.guard?'<i class="sg r"></i> Красный зубец щит не держит — кувырок '+K(pi,'roll')+'!':'<i class="sg r"></i> Красный зубец — кувырок '+K(pi,'roll')+'!');return;}
  const left=e.left;
  if(left!==null&&left<=T.mah+1e-6){oneSwoop(e,h);return;}
  if(left!==null&&left<=T.parry+1e-6){parryFoe(e,h);return;}
  if(h.guard){shieldBlock(h);return;}
  hitHero(e,h,'<i class="sg y"></i> Солнышко вспыхнуло — защиту '+K(pi,'guard')+' жми!');}
function hitHero(e,h,tipText){const pi=h.player;
  if(e.harmless){const dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,dd=Math.hypot(dx,dz)||1;h.vel.x=dx/dd*5;h.vel.z=dz/dd*5;h.vel.y=3.5;h.grounded=false;h.knockT=0.25;SFX.knock();shake(pi,0.03,0.15);
    floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Ой! Не больно — ничего!','#ffd0e0');}
  else damageHero(h,{kind:'enemy',ref:e});
  if(tipText)tip(pi,tipText,2.4);}
function foeDodge(e,h){G.stats.dodges++;(players[h.player].defLog=players[h.player].defLog||[]).push('r');SFX.roll();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Увернулся!','#ffe36b');
  // кувырок от красного сам ставит героя сбоку, а у морока на миг открыта спина
  const rx=Math.cos(e.face),rz=-Math.sin(e.face),side=((h.pos.x-e.pos.x)*rx+(h.pos.z-e.pos.z)*rz)>=0?1:-1,dd=e.r+h.d.radius+0.7;
  const nx=e.pos.x+rx*side*dd,nz=e.pos.z+rz*side*dd,g=groundAt(nx,nz,h.pos.y+STEP);if(g.y>h.pos.y-0.6){h.pos.x=nx;h.pos.z=nz;}h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);
  e.dazeT=3;e.state='recover';e.t=-2.2;e.left=null;floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+1.0,0)),'Открыт! Бей!','#ffe36b');
  const p=players[h.player];if(!p.dazeTaught){p.dazeTaught=true;tip(h.player,'Увернулся — враг закружился! Бей '+K(h.player,'attack')+'!',2.8);}}
function parryFoe(e,h){const pi=h.player;G.stats.parries++;(players[pi].defLog=players[pi].defLog||[]).push('g');SFX.parry();shake(pi,0.04,0.15);burst(e.pos.clone().add(new V3(0,1,0)).lerp(h.pos,0.5),COL.yellow,12,5);
  floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Отбил!','#ffe36b');const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz)||1;e.kx=dx/d;e.kz=dz/d;
  e.state='stagger';e.t=0;e.openHit=false;players[pi].staggerSeen++;spawnSpark(e.pos.clone().add(new V3(0,1.2,0)),0x6ad0ff);if(e.darkGuard&&e.darkGuard()){floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+0.6,0)),e.guardText||'насквозь','#cfd8dc');return;}emberOut(e,1,'Отбив!');}
function shieldBlock(h){const pi=h.player,p=players[pi];G.stats.shields++;(p.defLog=p.defLog||[]).push('g');SFX.shield();p.spirit=Math.max(0,p.spirit-timingOf(pi).cost);
  floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Щит!','#cfe8ff');burst(h.pos.clone().add(new V3(Math.sin(h.face)*0.7,h.d.height*0.5,Math.cos(h.face)*0.7)),0xffffff,6,3);
  if(p.spirit<=0.01){p.spiritLock=1;tip(pi,'Щит устал! Секунду защищаться нельзя.',1.8);}
  else if(!p.shieldTaught){p.shieldTaught=true;tip(pi,'Щит держит! Нажми '+K(pi,'guard')+' в последний миг — отобьёшь.',3.4);}}
function oneSwoop(e,h){const pi=h.player;G.stats.mahs++;SFX.mah();G.hitstop=0.4;stitch();shake(pi,0.05,0.3);ringFx(e.pos,COL.gold,3);
  floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Одним махом!','#ffd76a');
  p7(pi);
  if(e.darkGuard&&e.darkGuard()){e.state='stagger';e.t=0;e.openHit=false;floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+0.6,0)),e.guardText||'насквозь','#cfd8dc');return;}
  if(e.tutorial){e.embers=1;emberOut(e,1,'Одним махом!');return;}       // учебный морок пролога: X остаётся за игроком
  if(!e.big){unravel(e);return;}                                        // мелкий морок распутан сразу
  emberOut(e,5,'Одним махом!');}                                         // крупный теряет пять угольков
function p7(pi){const p=players[pi];p.chain=(G.time-(p.lastMah||-9)<2)?(p.chain||1)+1:1;p.lastMah=G.time;if(p.chain===7){banner('Семерых — одним махом!','#ffd76a',2.4,'семь махов подряд — вот удаль!');G.stats.seven++;}}
function emberOut(e,n,label){e.embers=Math.max(0,e.embers-n);SFX.ember();floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+1.1,0)),label+' Уголёк погас','#ffb060');
  if(e.embers<=0&&e.state!=='broken'){e.state='broken';e.t=0;e.bdur=TIMING[genPath()].broken;SFX.brk();banner('ПРОБОЙ!','#fff2b0',1.1,'Бей скорей — добей его!');}}
function hitSide(e,h){let a=Math.atan2(h.pos.x-e.pos.x,h.pos.z-e.pos.z)-e.face;while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;
  return Math.abs(a)<Math.PI/4?'f':Math.abs(a)>Math.PI*0.75?'b':a>0?'r':'l';}
function knockPlate(e,side){e.shell[side]=false;const pl=e.L.plates[side];const wp=new V3();pl.children[0].getWorldPosition(wp);pl.visible=false;
  burst(wp,0x5a3d22,14,5,1.4);SFX.brk();floatText(wp.clone().add(new V3(0,0.8,0)),'Кора отлетела!','#e0c090');}
function enemyHit(e,h,air){if(!e.alive)return;
  if(e.state==='broken'){finisher(e,h);return;}
  if(e.state==='spawn'||e.state==='dying'||e.state==='hide')return;
  if(e.guardAll&&e.guardAll()){SFX.clink();floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+0.6,0)),e.guardText||'не пробить','#cfd8dc');return;}
  e.flashT=0.12;const pw=h.power&&h.power.t>0&&h.kind==='potap';const side=hitSide(e,h);
  // скорлупа: слетает та, с чьей стороны ударил (в лоб — только когда морок шатается)
  if(e.shell&&e.shell[side]&&(side!=='f'||e.state==='stagger'||pw)){if(e.shellLock&&e.shellLock()){SFX.clink();floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+0.6,0)),e.shellLockText||'не пробить','#cfd8dc');return;}knockPlate(e,side);if(!pw)return;}
  const dazed=e.dazeT>0;const open=dazed||(e.state==='stagger'&&!e.openHit)||e.open>0||air||pw||(e.shell&&!e.shell[side]&&e.plateCd<=0)||(e.sideOpen&&(side==='l'||side==='r'||side==='b'));
  if(open){if(e.state==='stagger'&&!dazed)e.openHit=true;if(!dazed)e.open=0;e.plateCd=0.45;shake(h.player,0.03,0.12);burst(e.pos.clone().add(new V3(0,1,0)),0xffffff,6,3);emberOut(e,(air||pw)?2:1,air?'Сверху!':'Удар!');return;}
  SFX.clink();floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+0.6,0)),'закрылся','#cfd8dc');const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz)||1;mMove(e,dx/d,dz/d,6,0.05);
  const p=players[h.player];if(!p.closedTaught){p.closedTaught=true;tip(h.player,e.shell?'Спереди кора — зайди сбоку. Красный зубец — кувырок.':'Не попасть! Отбей '+K(h.player,'guard')+', потом бей '+K(h.player,'attack')+'.',3);}}
function finisher(e,h){
  if(e.noKill){if(e.onFinisher)e.onFinisher(h);return;}
  if(e.big&&e.finT>0){if(e.finBy!==h.player){e.bogatyr=true;}return;}
  G.stats.finishers++;SFX.finisher();G.hitstop=0.14;shakeAll(0.05,0.35);ringFx(e.pos,COL.gold,3.5);floatText(e.pos.clone().add(new V3(0,2.4,0)),'Добивающий мах!','#ffd76a');
  if(e.big){e.finT=0.45;e.finBy=h.player;if(G.solo)e.bogatyr=true;return;}   // окно для второго игрока — Богатырский мах
  unravel(e);}
function unravel(e){if(!e.alive)return;e.state='dying';e.t=0;e.alive=false;SFX.unravel();
  const c=e.pos.clone().add(new V3(0,0.7,0)),n=e.big?(e.bogatyr?14:9):5;burst(c,e.def.col?e.def.col[1]:0x6a8a4a,18,6);burst(c,COL.gold,10,5);
  if(e.bogatyr){SFX.horn();banner('Богатырский мах!','#ffd76a',1.8,'вместе — вдвое сильней');G.stats.bogatyr++;}
  for(let i=0;i<n;i++)spawnSpark(c,[COL.gold,0x6ad0ff,0xff6a8a][i%3]);
  if(e.onDeath)e.onDeath(e);
  if(!W.firstUnravel){W.firstUnravel=true;if(W.onFirstUnravel)W.onFirstUnravel(e);}}
function updateFoe(e,dt){if(e.tick&&e.alive)e.tick(e,dt);const slowK=(G.slowFoes>0?0.5:1);const edt=dt*slowK;e.t+=edt*(e.state==='wind'?e.slow:1);e.flashT=Math.max(0,e.flashT-dt);e.open=Math.max(0,e.open-dt);e.plateCd=Math.max(0,e.plateCd-dt);if(e.dazeT>0){e.dazeT-=dt;if(e.state==='broken'||e.state==='dying'||e.state==='stagger')e.dazeT=0;else if(e.state!=='recover'){e.state='recover';e.t=Math.min(e.t,0.8-e.dazeT);}}
  if(e.finT>0){e.finT-=dt;if(e.finT<=0){if(e.needBoth&&!e.bogatyr){e.state='idle';e.t=0;e.embers=3;e.cd=1.2;SFX.miss();floatText(e.pos.clone().add(new V3(0,e.L.top+0.6,0)),'Вместе — в одно окошко!','#ffd76a');for(const pi of[0,1])tip(pi,'Большой морок оглушён! Ударьте '+K(pi,'attack')+' оба разом — Богатырский мах!',3);}else unravel(e);}}
  const h=e.state==='wind'||e.state==='ready'?e.tgt:foeTarget(e);
  const d=h?hd(e.pos,h.pos):99,near=h&&d<11;const faceTo=(q,k)=>{e.face=angDamp(e.face,Math.atan2(q.x-e.pos.x,q.z-e.pos.z),k,dt);};
  const reach=e.def.ranged?6.5:2.6+e.r*0.4,sp=e.def.sp*slowK*(e.spMul===undefined?1:e.spMul);
  switch(e.state){
   case 'spawn':e.g.position.y=lerp(e.baseY-1.5,e.baseY,smooth(e.t/0.8));if(e.t>0.8){e.state='idle';e.t=0;e.g.position.y=e.baseY;}break;
   case 'idle':if(near){faceTo(h.pos,5);const want=e.def.ranged?4.5:1.6+e.r*0.5;if(d>want)mMove(e,(h.pos.x-e.pos.x)/d,(h.pos.z-e.pos.z)/d,sp,dt);else if(e.def.ranged&&d<3)mMove(e,-(h.pos.x-e.pos.x)/d,-(h.pos.z-e.pos.z)/d,sp*0.6,dt);
       e.cd-=edt;if(e.cd<=0&&d<reach&&canWind(e,h)){e.state='ready';e.t=0;e.tgt=h;}}
     else{const dh=hd(e.pos,e.home);if(dh>0.4)mMove(e,(e.home.x-e.pos.x)/dh,(e.home.z-e.pos.z)/dh,sp*0.7,dt);}break;
   case 'ready':if(!e.tgt||players[e.tgt.player].downed){e.state='idle';break;}faceTo(e.tgt.pos,5);if(e.t>0.45)foeWind(e);break;
   case 'wind':if(e.tgt)faceTo(e.tgt.pos,3);if(e.t>=e.wdur){e.state='strike';e.t=0;foeStrike(e);}break;
   case 'strike':if(e.t>0.25){e.state='recover';e.t=0;}break;
   case 'recover':if(e.t>0.8){e.state='idle';e.t=0;e.tgt=null;e.cd=rand(1.0,1.7)+((h&&players[h.player].path==='easy')?0.8:0);}break;
   case 'stagger':if(e.t<0.3)mMove(e,e.kx,e.kz,3.5,dt);if(e.t>(h&&players[h.player].path==='easy'?1.7:1.25)){e.state='idle';e.t=0;e.cd=0.9;e.tgt=null;}break;
   case 'broken':if(e.t>e.bdur&&e.finT<=0){e.state='idle';e.t=0;e.embers=e.big?3:1;e.cd=1.2;floatText(e.pos.clone().add(new V3(0,2.3,0)),'Опять запутался!','#ffffff');}break;
   case 'hide':if(e.hideUntil&&G.time>e.hideUntil){e.state='idle';e.g.visible=true;}break;
   case 'dying':e.g.scale.setScalar(Math.max(0.01,1-e.t/0.6));e.inner.rotation.y+=dt*14;if(e.t>0.6){W.group.remove(e.g);W.enemies.splice(W.enemies.indexOf(e),1);}return;}
  // визуал
  e.g.rotation.y=e.face;const w=e.state==='wind',k=w?clamp(e.t/e.wdur,0,1):0,S=e.S;
  S.sig.visible=w;S.sig.rotation.y=-e.face;S.sy.visible=w&&e.sig==='yellow';S.sr.visible=w&&e.sig==='red';S.sb.visible=w&&e.sig==='blue';
  if(w){S.tRing.visible=!!e.help;S.tRing.scale.setScalar(lerp(1.9,0.44,k));S.sig.scale.setScalar(0.8+0.45*k);S.halo.material.color.setHex(e.sig==='yellow'?COL.yellow:e.sig==='red'?COL.red:COL.blue);S.halo.scale.setScalar(1+0.25*Math.sin(G.time*30));S.sr.rotation.y+=dt*9;}
  const ec=w?(e.sig==='yellow'?COL.yellow:e.sig==='red'?COL.red:COL.blue):(e.flashT>0?0xffffff:0xfff3a0);e.eyeMat.color.setHex(ec);e.eyeMat.emissive.setHex(ec);
  e.embersM.forEach((m,i)=>{if(i>=e.maxEmb+2){m.m.visible=false;return;}const on=i<e.embers;m.m.visible=i<Math.max(e.maxEmb,e.embers);m.mat.color.setHex(on?0xff7a1a:0x3a3a3a);m.mat.emissive.setHex(on?0xff5a00:0x000000);m.mat.emissiveIntensity=on?1+0.3*Math.sin(G.time*8+i):0;});
  e.spin.visible=e.state==='broken'||e.dazeT>0;if(e.spin.visible)e.spin.rotation.y+=dt*(e.dazeT>0?9:5);e.br.visible=e.state==='broken';if(e.br.visible)e.br.scale.setScalar(1+Math.sin(G.time*8)*0.08);
  e.satRim.visible=e.sat>0;if(e.sat>0)e.satRim.scale.setScalar(1+0.1*Math.sin(G.time*10));
  const b=e.body;b.position.set(0,0,e.state==='strike'?Math.sin(e.t/0.25*Math.PI)*0.7:0);
  b.rotation.x=e.state==='broken'?0.5:e.state==='stagger'?-0.45:(e.state==='ready'||w)?-0.25-0.15*k:0;
  b.rotation.z=Math.sin(G.time*1.6+e.home.x)*0.1;b.scale.set(1,e.state==='broken'?0.75:1,1).multiplyScalar(1+e.sat*0.08);
  b.position.y=e.state==='broken'?-0.12:Math.abs(Math.sin(G.time*2.2+e.home.z))*0.06;
  if(e.L.threads){e.inner.rotation.y+=dt*(e.state==='broken'?0.4:1.2);e.L.threads.forEach((t,i)=>{t.rotation.z+=dt*(0.3+i*0.05);});}
  if(e.L.arm)e.L.arm.rotation.x=w?-1.2*k:e.state==='strike'?0.8:Math.sin(G.time*3)*0.1;
  if(e.post)e.post(e,dt,k);}
/* синяя капля: снаряд — щит держит, вовремя нажатая защита отправляет её обратно */
function spawnBolt(e,h){const g=dropMesh(COL.blue);g.scale.setScalar(0.7);const p=e.pos.clone().add(new V3(0,e.L.top*e.s,0));g.position.copy(p);W.group.add(g);
  W.bolts.push({g,p:g.position,from:e,tgt:h,v:6.5,left:null,eta:9,refl:false,t:0});}
function dropMesh(color){const g=new THREE.Group();const m=M(color,{emissive:color,emissiveIntensity:1.3});part(g,new THREE.SphereGeometry(0.3,14,10),m,0,0.1,0);
  const c=new THREE.ConeGeometry(0.29,0.55,14);c.rotateX(Math.PI);part(g,c,m,0,-0.28,0);g.add(new THREE.Mesh(new THREE.SphereGeometry(0.58,12,10),MB(color,{transparent:true,opacity:0.25,depthWrite:false})));return g;}
function updateBolts(dt){for(let i=W.bolts.length-1;i>=0;i--){const b=W.bolts[i];b.t+=dt;
  if(!b.refl&&W.wideShield){const P=HERO.potap;if(P.active&&P.guard&&b.tgt!==P&&!players[0].downed){const dx=b.p.x-P.pos.x,dz=b.p.z-P.pos.z,dl=Math.hypot(dx,dz);
    if(dl<1.5&&Math.abs(b.p.y-P.pos.y-1)<1.6&&(dx*Math.sin(P.face)+dz*Math.cos(P.face))/(dl||1)>0.1){W.group.remove(b.g);W.bolts.splice(i,1);shieldBlock(P);floatText(P.pos.clone().add(new V3(0,2.5,0)),'Широкий щит!','#e0b27a');continue;}}}
  const to=b.refl?b.from.pos.clone().add(new V3(0,1,0)):b.tgt.pos.clone().add(new V3(0,heroHeight(b.tgt)*0.6,0));const dv=to.clone().sub(b.p),d=dv.length();b.eta=d/b.v;
  b.p.addScaledVector(dv.normalize(),Math.min(d,b.v*dt*(b.refl?1.6:1)));b.g.rotation.y+=dt*6;
  if(d<0.6||b.t>5){W.group.remove(b.g);W.bolts.splice(i,1);if(b.t>5)continue;
    if(b.refl){if(b.from.alive){burst(b.p.clone(),COL.blue,12,4);if(b.from.onReflect)b.from.onReflect(b);else if(b.from.def.selfBreak&&b.from.embers>0){floatText(b.from.pos.clone().add(new V3(0,2.2,0)),'Ик!','#9fd0ff');emberOut(b.from,b.from.embers,'Сама себя!');if(W.onSelfBreak)W.onSelfBreak(b.from);}else emberOut(b.from,1,'Капля вернулась!');}continue;}
    const h=b.tgt,pi=h.player,T=timingOf(pi);if(players[pi].downed||h.cling)continue;
    if(b.left!==null&&b.left<=T.parry+0.05){SFX.parry();G.stats.parries++;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Отбил каплю!','#9fd0ff');
      const nb={...b,refl:true,t:0,g:dropMesh(COL.blue)};nb.g.scale.setScalar(0.7);nb.g.position.copy(b.p);nb.p=nb.g.position;W.group.add(nb.g);W.bolts.push(nb);continue;}
    if(h.guard){shieldBlock(h);continue;}
    hitHero(b.from,h,'<i class="sg b"></i> Синяя капля — защита '+K(pi,'guard')+', в последний миг!');}}}
/* искры: летят к герою сами, если он ближе 3,5 м; несобранные за 4 с уплывают к ближнему мороку — он их «жуёт» */
const SPARK_GEO=new THREE.SphereGeometry(0.1,8,6);
function spawnSpark(p,color){const m=new THREE.Mesh(SPARK_GEO,MB(color,{transparent:true}));m.position.copy(p);W.group.add(m);
  const halo=new THREE.Mesh(SPARK_GEO,MB(color,{transparent:true,opacity:0.35,depthWrite:false}));halo.scale.setScalar(2.3);m.add(halo);
  W.sparks.push({m,v:new V3(rand(-3,3),rand(3,6),rand(-3,3)),t:0,color,free:0});}
function updateSparks(dt){for(let i=W.sparks.length-1;i>=0;i--){const s=W.sparks[i];s.t+=dt;const p=s.m.position;let tgt=null,bd=3.5;
  if(s.t>0.35)for(const h of (W.passiveCollect?HEROES:[active(0),active(1)])){if(h.active&&players[h.player].downed)continue;if(h.cling)continue;if(s.noLit&&heroLight(h))continue;const d=p.distanceTo(new V3(h.pos.x,h.pos.y+0.7,h.pos.z));if(d<bd){bd=d;tgt=h;}}
  if(tgt){const to=new V3(tgt.pos.x,tgt.pos.y+0.7,tgt.pos.z).sub(p),d=to.length();s.v.lerp(to.multiplyScalar(14/Math.max(d,0.01)),1-Math.exp(-8*dt));
    if(d<0.45){collectSpark(s,tgt);W.group.remove(s.m);W.sparks.splice(i,1);continue;}}
  else{s.free+=dt;let eat=null,ed=9;if(s.free>4)for(const e of W.enemies){if(!e.alive||e.harmless||e.state==='dying')continue;const d=p.distanceTo(e.pos.clone().add(new V3(0,1,0)));if(d<ed){ed=d;eat=e;}}
    if(eat){const to=eat.pos.clone().add(new V3(0,1,0)).sub(p),d=to.length();s.v.lerp(to.multiplyScalar(6/Math.max(d,0.01)),1-Math.exp(-4*dt));
      if(d<0.6){eat.embers=Math.min(eat.maxEmb+2,eat.embers+1);eat.sat=Math.min(3,eat.sat+1);SFX.ember();W.group.remove(s.m);W.sparks.splice(i,1);
        if(W.onEat)W.onEat(eat);if(!G.flags.chew&&W.abil.clew){G.flags.chew=true;bark(HERO.proshka,'proshka','Он наши слова жуёт — ишь какой!',2.2);}continue;}}
    else{s.v.multiplyScalar(Math.exp(-2*dt));s.v.y+=s.t>0.6?1.4*dt:-6*dt;}}
  p.addScaledVector(s.v,dt);s.m.material.opacity=s.free>6?Math.max(0,1-(s.free-6)/2):1;if(s.free>8||p.y>18){W.group.remove(s.m);W.sparks.splice(i,1);}}}
function collectSpark(s,h){G.stats.sparks++;W.sparksGot=(W.sparksGot||0)+1;SFX.spark();const p=players[h.player];if(s.color===0xff6a8a&&p.petals<3)p.petals++;
  if(s.color===0x6ad0ff&&(W.abil.clew||W.abil.gusli||W.abil.pero||W.abil.kleshi)){p.blue=Math.min(1,p.blue+0.14);if(p.blue>=1&&!p.blueTold){p.blueTold=true;tip(h.player,'Полоска полна! Смени героя '+K(h.player,'swap')+' — богатырский удар.',3.5);}}
  floatText(h.pos.clone().add(new V3(0,h.d.height+0.4,0)),'+искра','#fff6c0');}

