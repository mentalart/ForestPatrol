/* ============================== РЕЛИЗ final05 · ВРАГИ НА УРОВНЕ ГЕРОЕВ: low-poly модели мороков, выразительные глаза, живая мимика ============================== */
// Все виды мороков собраны китом (цвета — палитра в вершинах, фаски, шум, тон по граням), с теми же частями, что двигает логика прототипа
// (нити клубка, рука, пасть, хвост, крылья, латы-пластины, сегменты, облако и молния, пятна мотылька…). Материалы, которые логика
// перекрашивает (тень в свете, тучка, хамелей, печник, болван, пень, змеёныш), сохранены — геометрия новая.
// Глаза как у героев: белок, радужка светится тем же материалом, что у прототипа (цвет = знак удара: жёлтый, красный, синий), зрачок,
// блик, веки моргают, брови: на замахе хмурятся, оглушённый — брови вверх и глаза в кучку, при распутывании — зажмуривается.
const hp=h=>{const c=new THREE.Color(h),l=c.clone().lerp(new THREE.Color(1,1,1),0.3),d=c.clone().multiplyScalar(0.6);return [l.getHex(),h,d.getHex()];};
// жёсткая деталь: KGeo → один меш (цвет в вершинах), либо со своим материалом логики
function fk(parent,fill,o){o=o||{};const K=new KGeo(o.H||1.5,o.seed||7);K.vary=false;fill(K);const m=new THREE.Mesh(K.build(),o.mat||KMAT.vc);m.castShadow=o.shadow!==false;m.receiveShadow=false;
  if(o.pos)m.position.set(o.pos[0],o.pos[1],o.pos[2]);parent.add(m);return m;}
const up_=new V3(0,1,0),fq=new THREE.Quaternion();
function spikeM(d,r,len){fq.setFromUnitVectors(up_,d);return new THREE.Matrix4().compose(d.clone().multiplyScalar(r),fq,new V3(1,1,1));}
function fib(n,i){const y=1-2*(i+0.5)/n,r=Math.sqrt(1-y*y),th=i*2.39996;return new V3(Math.cos(th)*r,y,Math.sin(th)*r);}
const FL={};   // новые облики по def.look
// ---------- клубок-морок (пролог) и нитяной морок: шар из спутанных ниток, колючки; нити крутятся ----------
FL.ball=(inner,def)=>{const c=def.col;fk(inner,K=>{K.add(KP.ico(0.5,1),hp(c[0]),tm(0,0.62,0),{noise:0.03,kN:0.35});
    for(let i=0;i<26;i++){const d=fib(26,i);if(d.z>0.45&&Math.abs(d.x)<0.6&&d.y>-0.3&&d.y<0.65)continue;K.add(KP.cone(0.055,0.26,4),hp(0x3a1a34),spikeM(d,0.55).premultiply(tm(0,0.62,0)),{kN:0.2});}
    K.add(hSph(0.1,6,4),hp(0x2a1020),tm(0,0.5,0.46,0,0,0,1.6,0.7,0.5),{kN:0});   // рот-щель
  });
  const threads=[];for(let i=0;i<11;i++){const t=fk(inner,K=>K.add(KP.tor(0.5+((i*37)%13)/100,0.032,3,14),hp(c[1+i%3]),null,{kN:0.4}),{pos:[0,0.62,0],shadow:false});t.rotation.set((i*1.7)%3.1,(i*2.3)%3.1,(i*0.9)%3.1);threads.push(t);}
  return {threads,eyeY:0.74,eyeZ:0.44,top:1.3,eyeS:1.15,lid:hp(c[0])};};
// ---------- тать-паутинник: паучок из ниток, жвала ----------
FL.tat=(inner)=>{fk(inner,K=>{K.add(hSph(0.36,8,6),hp(0x5a4a3a),tm(0,0.42,-0.05,0,0,0,0.9,0.8,1.35),{noise:0.015});
    for(let i=0;i<6;i++)K.add(KP.tor(0.32+i*0.012,0.022,3,14),hp(i%2?0x9a8660:0x2a2018),tm(0,0.42,-0.05,(i*1.1)%3,(i*0.7)%3,0,1,1,1.3));
    for(const sd of[-1,1])for(let i=0;i<3;i++){K.add(KP.cyl(0.026,0.022,0.34,4),hp(0x2a2018),tm(sd*0.34,0.44,-0.3+i*0.25,0,0,sd*0.9));K.add(KP.cyl(0.022,0.016,0.34,4),hp(0x2a2018),tm(sd*0.56,0.2,-0.3+i*0.25,0,0,-sd*0.35));}});
  const jaw=[];for(const sd of[-1,1]){const j=new THREE.Group();j.position.set(sd*0.12,0.34,0.4);inner.add(j);const cn=KP.cone(0.06,0.28,5);cn.rotateX(Math.PI/2);fk(j,K=>K.add(cn,hp(0xd8c8a8),tm(0,0,0.12),{s:0.2}));jaw.push(j);}
  return {jaw,eyeY:0.52,eyeZ:0.34,top:0.9,eyeS:0.95,lid:hp(0x5a4a3a)};};
// ---------- кикиморка: зелёная болотная малявка в тине, с ложкой ----------
FL.kiki=(inner)=>{const B=hp(0x5a7a3e),DK=hp(0x2f4a24);fk(inner,K=>{K.add(KP.lathe([[0,0.22],[0.32,0.24],[0.36,0.5],[0.33,0.8],[0.24,0.98],[0,1.04]],9),B,null,{noise:0.01});
    for(let i=0;i<14;i++){const a=i/14*Math.PI*2;K.add(KP.cone(0.07,0.55,3),i%2?DK:hp(0x4a6a2e),tm(Math.cos(a)*0.32,0.42,Math.sin(a)*0.32,Math.PI+Math.sin(a)*0.15,0,Math.cos(a)*0.15),{kN:0.1});}
    for(let i=0;i<5;i++)K.add(hIco(0.06),hp(0x9ad05a),tm(Math.sin(i*1.9)*0.22,0.55+i*0.09,0.3),{s:0.2});
    const ns=KP.cone(0.04,0.14,4);ns.rotateX(Math.PI/2);K.add(ns,B,tm(0,0.72,0.35),{s:0.1});K.add(hSph(0.07,6,4),hp(0x2a1a14),tm(0,0.6,0.32,0,0,0,1.6,0.6,0.5),{kN:0});
    for(const s of[-1,1]){K.add(KP.cone(0.05,0.2,3),B,tm(s*0.32,0.92,0,0,0,-s*1.1),{s:0.1});K.add(KP.cyl(0.04,0.04,0.25,5),DK,tm(s*0.12,0.1,0.02));}});
  const arm=new THREE.Group();arm.position.set(0.36,0.75,0.05);inner.add(arm);fk(arm,K=>{K.add(KP.cyl(0.05,0.045,0.5,6),B,tm(0.1,-0.1,0,0,0,-0.6));});
  const sp=new THREE.Group();sp.position.set(0.3,0.05,0.15);arm.add(sp);fk(sp,K=>{K.add(KP.cyl(0.025,0.025,0.55,5),PAL.plank,tm(0,0.25,0));K.add(hSph(0.1,6,4),PAL.plank,tm(0,0.55,0,0,0,0,1,0.45,1.3));});
  return {arm,eyeY:0.8,eyeZ:0.3,top:1.2,eyeS:1.05,lid:B};};
// ---------- пень-ворчун: живой пень в коре-латах (пластины сбиваются), корни, ветки-руки, ворчливый рот ----------
FL.stump=(inner)=>{const bark=hp(0x6a4a2a),wood=M(0xc8a070,{emissive:0x000000});
  const core=new THREE.Mesh(KP.bcyl(0.8,1.3,0.08,12),wood);core.position.y=0.65;core.castShadow=true;inner.add(core);
  fk(inner,K=>{K.add(KP.cyl(0.74,0.74,0.06,12),hp(0xe8c898),tm(0,1.33,0),{s:0.2});for(const r of[0.52,0.32,0.14])K.add(KP.tor(r,0.018,3,16),hp(0x9a7a4a),tm(0,1.37,0,Math.PI/2,0,0),{kN:0});
    for(let i=0;i<5;i++){const a=i/5*Math.PI*2;K.add(KP.cone(0.22,0.85,5),bark,tm(Math.sin(a)*0.85,0.15,Math.cos(a)*0.85,Math.cos(a)*1.3,0,-Math.sin(a)*1.3),{noise:0.02});}
    for(const s of[-1,1]){K.add(KP.cyl(0.07,0.1,0.9,6),bark,tm(s*0.9,1.0,0,0,0,s*0.9));K.add(hIco(0.13),PAL.leaf,tm(s*1.25,1.35,0),{s:0.1});}
    K.add(hSph(0.1,6,4),hp(0x2a1a10),tm(0,0.55,0.97,0,0,0,2,0.6,0.4),{kN:0});   // ворчливый рот
    K.add(hSph(0.09,6,3),PAL.mush,tm(0.35,1.42,0.3,0,0,0,1,0.5,1),{s:0.1});K.add(KP.cyl(0.03,0.035,0.1,5),PAL.cream,tm(0.35,1.37,0.3));});
  const plates={};for(const[k,a]of[['f',0],['r',Math.PI/2],['b',Math.PI],['l',-Math.PI/2]]){const pl=new THREE.Group();pl.rotation.y=a;inner.add(pl);
    fk(pl,K=>{K.box(0.95,1.15,0.14,bark,tm(0,0,0),{b:0.04,amp:0.01});for(let j=0;j<3;j++)K.box(0.06,1.1,0.05,hp(0x3a2614),tm(-0.3+j*0.3,0,0.09),{b:0.01});},{pos:[0,0.66,0.83]});plates[k]=pl;}
  return {plates,eyeY:0.98,eyeZ:0.95,top:1.7,wood,eyeS:1.25,lid:bark};};
// ---------- лешачонок: малыш в шапке из мха, рожки-сучки ----------
FL.leshonok=(inner)=>{const B=hp(0x4a7a2c);fk(inner,K=>{K.add(KP.lathe([[0,0.1],[0.3,0.12],[0.33,0.4],[0.3,0.65],[0.2,0.82],[0,0.86]],9),B,null,{noise:0.01});
    for(const s of[-1,1]){K.add(KP.cyl(0.06,0.07,0.2,5),hp(0x5a4028),tm(s*0.13,0.05,0));K.add(KP.cone(0.04,0.4,4),hp(0x5a4028),tm(s*0.3,1.0,-0.05,0,0,-s*0.9));K.add(hIco(0.07),PAL.leaf,tm(s*0.46,1.15,-0.05),{s:0.1});}
    const ns=KP.cone(0.035,0.12,4);ns.rotateX(Math.PI/2);K.add(ns,hp(0x6a4a2a),tm(0,0.5,0.33),{s:0.1});K.add(hSph(0.05,5,4),hp(0x2a1a10),tm(0,0.42,0.3,0,0,0,1.5,0.6,0.5),{kN:0});});
  const hat=fk(inner,K=>{K.add(KP.cone(0.38,0.48,8),hp(0x2e5a2a),tm(0,1.04,0),{noise:0.015});K.add(KP.tor(0.34,0.07,4,14),hp(0x5a8a3a),tm(0,0.82,0,Math.PI/2,0,0),{noise:0.01});K.add(hIco(0.06),PAL.mush,tm(0.1,1.3,0.1),{s:0.2});});
  return {eyeY:0.62,eyeZ:0.27,top:1.3,hat,eyeS:0.95,lid:B};};
// ---------- рука-коряга Лешего ----------
FL.hand=(inner)=>{const bark=hp(0x5a4028),moss=hp(0x3d5a2a);fk(inner,K=>{K.add(KP.cyl(0.35,0.45,1.2,8),moss,tm(0,0.9,-0.2,0.5,0,0),{noise:0.03});K.add(hSph(0.5,8,6),bark,tm(0,0.5,0.2,0,0,0,1.2,0.7,1),{noise:0.03});
    for(let k=0;k<3;k++){K.add(KP.cone(0.14,1.1,5),bark,tm((k-1)*0.32,0.35,0.75,1.35,0,(k-1)*0.1),{noise:0.02});K.add(hIco(0.08),moss,tm((k-1)*0.32,0.42,0.5),{s:0.1});}
    for(let i=0;i<4;i++)K.add(hSph(0.16,6,4),moss,tm(Math.sin(i*1.7)*0.3,0.8+i*0.12,-0.2-i*0.12,0,0,0,1.2,0.5,1),{noise:0.02});});
  const arm=new THREE.Group();inner.add(arm);return {arm,eyeY:0.75,eyeZ:0.55,top:1.6,eyeS:1.2,lid:bark};};
// ---------- Леший в коре (фаза 3 босса 1-Б) ----------
FL.leshyBoss=(inner)=>{const moss=hp(0x3d5a2a),bark=hp(0x5a4028);fk(inner,K=>{K.add(KP.lathe([[0,0],[1.45,0],[1.3,0.5],[1.15,1.4],[1.0,2.8],[0,2.82]],12),moss,null,{noise:0.04});
    K.add(hSph(0.85,9,7),bark,tm(0,3.3,0.1),{noise:0.03});const bd=KP.cone(0.75,1.8,8);bd.rotateX(Math.PI);K.add(bd,hp(0x2e4420),tm(0,2.4,0.55),{noise:0.04});
    K.add(KP.cone(0.1,0.3,5),bark,tm(0,3.25,0.95,Math.PI/2+0.3,0,0),{s:0.1});K.add(hSph(0.16,6,4),hp(0x1a1008),tm(0,2.95,0.85,0,0,0,1.8,0.5,0.4),{kN:0});
    for(const s of[-1,1]){K.add(KP.cone(0.12,1.9,5),bark,tm(s*0.6,4.4,0,0,0,-s*0.5),{noise:0.02});K.add(KP.cone(0.08,1,5),bark,tm(s*1.1,4.7,0,0,0,-s*1.1));for(let j=0;j<3;j++)K.add(hIco(0.18),PAL.leaf,tm(s*(0.9+j*0.3),5.0+j*0.15,(j-1)*0.15),{s:0.1});
      K.add(hSph(0.3,6,4),moss,tm(s*0.35,3.75,0.2,0,0,0,1.3,0.6,1),{noise:0.02});}});
  const plates={};for(const[k,a]of[['f',0],['r',Math.PI/2],['b',Math.PI],['l',-Math.PI/2]]){const pl=new THREE.Group();pl.rotation.y=a;inner.add(pl);
    fk(pl,K=>{K.box(1.6,2.2,0.2,bark,tm(0,0,0),{b:0.06,amp:0.02});for(let j=0;j<4;j++)K.box(0.08,2.1,0.06,hp(0x3a2614),tm(-0.6+j*0.4,0,0.12),{b:0.01});},{pos:[0,1.3,1.45]});plates[k]=pl;}
  return {plates,eyeY:3.45,eyeZ:0.86,top:5.0,eyeS:2.4,eyeX:0.32,lid:bark};};
// ---------- щука-морок: зубастая щука в нитях; пасть и хвост двигаются ----------
FL.pike=(inner,def)=>{const c=def.col;const body=new THREE.Group();body.position.y=0.55;inner.add(body);const bg=KP.cyl(0.34,0.24,1.3,10);bg.rotateX(Math.PI/2);const hg=KP.cone(0.3,0.75,10);hg.rotateX(Math.PI/2);
  fk(body,K=>{K.add(bg,hp(c[0]),tm(0,0,-0.05),{noise:0.01});K.add(hg,hp(c[0]),tm(0,0.04,0.95));K.add(hSph(0.28,8,5),hp(c[3]),tm(0,-0.12,0.1,0,0,0,1,0.5,2.2),{s:0.2});
    K.box(0.05,0.3,0.42,hp(c[1]),tm(0,0.36,-0.32,0.2,0,0),{b:0.01});for(const sd of[-1,1])K.box(0.28,0.04,0.2,hp(c[1]),tm(sd*0.36,-0.12,0.2,0,0,sd*0.4),{b:0.01});
    for(let i=0;i<4;i++)K.add(KP.tor(0.33-i*0.02,0.026,3,14),hp(c[1+i%3]),tm(0,0,-0.45+i*0.26,0.1*(i-1.5),0.1*i,0));
    for(let i=0;i<6;i++)K.add(hIco(0.04),hp(c[2]),tm(Math.sin(i)*0.2,0.2,-0.5+i*0.18),{s:-0.2});});
  const jaw=new THREE.Group();jaw.position.set(0,-0.1,0.62);body.add(jaw);const jg=KP.cone(0.22,0.62,10);jg.rotateX(Math.PI/2);
  fk(jaw,K=>{K.add(jg,hp(c[2]),tm(0,0,0.3));for(let i=0;i<5;i++)K.add(KP.cone(0.03,0.09,4),PAL.white,tm((i-2)*0.07,0.07,0.22+Math.abs(i-2)*0.03),{s:0.3});});
  const tail=new THREE.Group();tail.position.set(0,0,-0.72);body.add(tail);fk(tail,K=>{K.add(KP.cone(0.3,0.45,4),hp(c[1]),tm(0,0,-0.22,-Math.PI/2,0,0,0.18,1,1.4));});
  return {eyeY:0.74,eyeZ:0.84,top:1.15,jaw,tail,fish:body,eyeS:0.9,lid:hp(c[0])};};
// ---------- тягун: угорь колодца, сегменты извиваются ----------
FL.tyagun=(inner)=>{const fish=new THREE.Group();fish.position.y=0.4;inner.add(fish);const segs=[];
  for(let i=0;i<7;i++){const sg=fk(fish,K=>{K.add(hSph(0.27-i*0.025,7,5),hp(i%2?0x34485a:0x6a8a9a),tm(0,0,0,0,0,0,1,0.85,1.3));K.box(0.04,0.26-i*0.03,0.24,hp(0x8a3a4a),tm(0,0.28-i*0.02,0),{b:0.01});},{pos:[0,0,0.42-i*0.28]});segs.push(sg);}
  fk(fish,K=>{K.add(hSph(0.3,8,6),hp(0x34485a),tm(0,0.06,0.68,0,0,0,1,0.8,1.3));K.add(KP.tor(0.12,0.04,3,10),hp(0x8a3a4a),tm(0,-0.04,0.98));K.add(hSph(0.08,5,4),hp(0x1a1418),tm(0,-0.04,1.0,0,0,0,1,1,0.4),{kN:0});});
  return {fish,segs,eyeY:0.6,eyeZ:0.9,top:1.0,eyeS:0.85,lid:hp(0x34485a)};};
// ---------- рак-щипач: панцирь, глаза на стебельках, клешни ----------
FL.crab=(inner)=>{const c=hp(0xc0603a),dk=hp(0x7a2a1a);fk(inner,K=>{K.add(hSph(0.5,9,6),c,tm(0,0.45,0,0,0,0,1.12,0.5,0.85),{noise:0.01});for(let i=0;i<3;i++)K.add(KP.tor(0.42-i*0.09,0.028,3,14),dk,tm(0,0.62+i*0.03,-0.05-i*0.05,Math.PI/2,0,0));
    for(const sd of[-1,1]){for(let i=0;i<3;i++){K.add(KP.cyl(0.04,0.03,0.4,5),dk,tm(sd*0.5,0.36,-0.25+i*0.22,0,0,sd*0.9));K.add(KP.cyl(0.03,0.02,0.3,5),dk,tm(sd*0.72,0.14,-0.25+i*0.22,0,0,-sd*0.3));}
      K.add(KP.cyl(0.03,0.03,0.3,5),dk,tm(sd*0.16,0.74,0.28));}
    K.add(hSph(0.07,5,4),hp(0x3a1008),tm(0,0.42,0.42,0,0,0,1.6,0.6,0.4),{kN:0});});
  const arm=new THREE.Group();arm.position.set(0,0.5,0.35);inner.add(arm);
  for(const sd of[-1,1]){const cl=new THREE.Group();cl.position.set(sd*0.44,0,0.18);arm.add(cl);const a=KP.cone(0.08,0.36,6);a.rotateX(Math.PI/2);const b=KP.cone(0.07,0.3,6);b.rotateX(Math.PI/2);
    fk(cl,K=>{K.add(hSph(0.2,7,5),c,tm(0,0,0.1,0,0,0,0.8,0.6,1.3));K.add(a,c,tm(0.06*sd,0.05,0.44));K.add(b,dk,tm(-0.05*sd,-0.05,0.4));});}
  return {arm,eyeY:0.92,eyeZ:0.3,top:1.1,eyeS:0.85,eyeX:0.16,lid:c};};
// ---------- тинник: тинистый шар в пузырьках ----------
FL.tina=(inner)=>{const c=hp(0x3a5a2a),l=hp(0x6a8a3a);fk(inner,K=>{K.add(KP.ico(0.5,1),c,tm(0,0.65,0,0,0,0,1,1.1,1),{noise:0.04});
    for(let i=0;i<18;i++){const a=i/18*Math.PI*2;K.add(KP.cone(0.06,0.9,3),i%2?l:c,tm(Math.cos(a)*0.42,0.35,Math.sin(a)*0.42,Math.PI+Math.sin(a)*0.25,0,Math.cos(a)*0.25),{kN:0.1});}
    K.add(hSph(0.1,6,4),hp(0x16240e),tm(0,0.52,0.44,0,0,0,1.5,0.7,0.4),{kN:0});});
  fk(inner,K=>{for(let i=0;i<6;i++)K.add(hIco(0.06),hp(0xa0d0ff),tm(Math.sin(i*2.2)*0.4,1.0+i*0.05,Math.cos(i*1.7)*0.3),{s:0.3});},{shadow:false,mat:KMAT.glow});
  return {eyeY:0.84,eyeZ:0.44,top:1.3,eyeS:1.1,lid:c};};
// ---------- пузырник: рыба-ёж, надувается ----------
FL.puff=(inner)=>{const c=hp(0xe0c860),dk=hp(0x8a6a2a);const puff=new THREE.Group();puff.position.y=0.66;inner.add(puff);
  fk(puff,K=>{K.add(hSph(0.48,9,7),c);K.add(hSph(0.3,7,5),hp(0xfff0c0),tm(0,-0.2,0.2,0,0,0,1.2,0.7,1),{s:0.2});
    for(let i=0;i<30;i++){const d=fib(30,i);if(d.z>0.55&&Math.abs(d.x)<0.5)continue;K.add(KP.cone(0.05,0.22,4),dk,spikeM(d,0.5));}
    for(const sd of[-1,1])K.box(0.04,0.2,0.28,hp(0xf08a3a),tm(sd*0.5,0,0,0,sd*0.6,0),{b:0.01});K.add(KP.tor(0.08,0.03,4,12),hp(0xd06a4a),tm(0,-0.12,0.47));});
  return {puff,eyeY:0.8,eyeZ:0.44,top:1.3,eyeS:1.1,lid:c};};
// ---------- Водяной: буйный дед-водяник — зелёный, тина вместо волос, борода, ракушки-пластины ----------
FL.vod=(inner)=>{const skin=hp(0x5a8a5a),belly=hp(0x9ab888),tina=hp(0x3a5a2a),shellP=hp(0xf0e0d0);
  fk(inner,K=>{K.add(hSph(1.6,10,8),skin,tm(0,1.5,0,0,0,0,1.15,1,1),{noise:0.03});K.add(hSph(1.1,9,7),belly,tm(0,1.3,0.75,0,0,0,1,1,0.6),{s:0.1});
    for(const sd of[-1,1]){K.add(KP.cyl(0.28,0.22,1.4,7),skin,tm(sd*1.7,1.3,0.3,0,0,sd*0.9));K.add(hSph(0.36,7,5),skin,tm(sd*2.3,0.8,0.5));for(let k=0;k<3;k++)K.add(KP.cone(0.06,0.25,4),skin,tm(sd*2.3+(k-1)*0.14,0.55,0.7,0.5,0,0));}});
  const head=new THREE.Group();head.position.set(0,3.0,0.3);inner.add(head);
  fk(head,K=>{K.add(hSph(0.9,9,7),skin,tm(0,0,0,0,0,0,1.2,0.85,1));K.add(hSph(0.4,7,4),hp(0x1a2418),tm(0,-0.3,0.78,0,0,0,1.2,0.35,0.3),{kN:0});
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2;K.add(KP.cone(0.08,1.0,3),tina,tm(Math.cos(a)*0.8,0.1,Math.sin(a)*0.7,Math.PI+Math.sin(a)*0.3,0,Math.cos(a)*0.3),{kN:0.1});}
    const bd=KP.cone(0.5,1.1,8);bd.rotateX(Math.PI);K.add(bd,tina,tm(0,-0.8,0.62),{noise:0.03});K.add(KP.cone(0.12,0.3,5),skin,tm(0,-0.05,0.95,Math.PI/2+0.2,0,0),{s:0.1});
    for(const s of[-1,1])K.add(KP.cone(0.15,0.3,4),skin,tm(s*1.05,0.05,0,0,0,-s*1.6),{s:-0.1});
    K.add(KP.cyl(0.45,0.55,0.25,10),hp(0xd8b040),tm(0,0.68,0),{s:0.1});for(let i=0;i<6;i++){const a=i/6*Math.PI*2;K.add(KP.cone(0.08,0.25,4),hp(0xd8b040),tm(Math.cos(a)*0.45,0.9,Math.sin(a)*0.45),{s:0.2});}});   // корона из ракушек
  const plates={};for(const[k,a]of[['f',0],['r',Math.PI/2],['b',Math.PI],['l',-Math.PI/2]]){const pl=new THREE.Group();pl.rotation.y=a;inner.add(pl);
    fk(pl,K=>{for(let i=0;i<5;i++)K.add(new FIN.orig.Sphere(0.34,8,4,0,Math.PI*2,0,Math.PI/2),shellP,tm((i-2)*0.42,Math.abs(i-2)*0.12,0,Math.PI/2,0,0),{kN:0.3,noise:0.01});},{pos:[0,1.1,1.66]});plates[k]=pl;}
  return {plates,eyeY:3.2,eyeZ:1.16,top:4.0,head,eyeS:2.2,eyeX:0.4,lid:skin};};
// ---------- тень-морок: плоская тёмная фигура, видна в свете (материал — как у прототипа) ----------
FL.ten=(inner)=>{const mat=M(0x1a1428,{emissive:0x3a1a6a,emissiveIntensity:0.05});
  fk(inner,K=>{K.add(KP.lathe([[0,0],[0.52,0],[0.4,0.3],[0.3,0.7],[0.26,1.1],[0,1.2]],9),WHT,null,{noise:0.02});K.add(hSph(0.34,8,6),WHT,tm(0,1.4,0));
    for(const s of[-1,1]){K.add(KP.cone(0.1,0.42,4),WHT,tm(s*0.2,1.8,0,0,0,-s*0.3));K.add(KP.cone(0.08,0.8,4),WHT,tm(-s*0.5,0.85,0.05,0,0,s*2.5));}
    for(let i=0;i<7;i++)K.add(KP.cone(0.12,0.42,4),WHT,tm((i-3)*0.14,0.06,Math.sin(i)*0.1,Math.PI,0,(i-3)*0.1),{noise:0.02});},{mat});
  const arm=new THREE.Group();arm.position.set(0.42,1.0,0.1);inner.add(arm);const cl=KP.cone(0.07,0.7,4);fk(arm,K=>{K.add(cl,WHT,tm(0.1,-0.2,0.2,1.2,0,0));for(let k=0;k<3;k++)K.add(KP.cone(0.03,0.2,3),WHT,tm(0.1+(k-1)*0.05,-0.45,0.45,1.6,0,0));},{mat});
  return {mat,arm,eyeY:1.45,eyeZ:0.3,top:2.0,eyeS:0.95,lid:hp(0x1a1428)};};
// ---------- грозовая тучка: пухлая сердитая туча, молния (материал облака — как у прототипа) ----------
FL.tucha=(inner)=>{const mat=M(0x6a6680,{emissive:0x000000});const cloud=new THREE.Group();cloud.position.y=2.1;inner.add(cloud);
  fk(cloud,K=>{for(const[dx,dy,dz,s]of[[0,0,0,0.62],[0.52,-0.05,0.1,0.46],[-0.52,-0.05,0,0.48],[0.15,0.28,-0.1,0.44],[-0.22,-0.22,0.25,0.4],[0.3,-0.25,-0.2,0.36],[-0.35,0.2,-0.15,0.38]])K.add(KP.ico(s,1),WHT,tm(dx,dy,dz),{noise:0.02,kN:0.5});},{mat});
  fk(cloud,K=>{K.add(hSph(0.1,6,4),hp(0x2a2838),tm(0,-0.22,0.56,0,0,0,1.8,0.7,0.4),{kN:0});});
  const bolt=new THREE.Group();cloud.add(bolt);const bm=MB(0xfff6a0);for(let i=0;i<4;i++){const s2=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.55,0.07),bm);s2.position.set(i%2?0.12:-0.12,-0.55-i*0.45,0.1);s2.rotation.z=i%2?0.5:-0.5;bolt.add(s2);}bolt.visible=false;
  return {mat,cloud,bolt,eyeY:2.15,eyeZ:0.58,top:2.8,eyeS:1.2,lid:hp(0x6a6680)};};
// ---------- двусветный мотылёк: пушистое тельце, усики, крылья с пятнами-светом игроков ----------
FL.motylek=(inner)=>{const body=new THREE.Group();body.position.y=1.0;inner.add(body);const bc=hp(0x5a4a6a);
  fk(body,K=>{const t=KP.cyl(0.11,0.06,0.62,7);t.rotateX(Math.PI/2);K.add(t,bc,tm(0,0,0),{noise:0.01});for(let i=0;i<4;i++)K.add(KP.tor(0.1-i*0.01,0.02,3,10),hp(0x8a7aa0),tm(0,0,-0.2+i*0.12));
    K.add(hSph(0.14,7,5),bc,tm(0,0.03,0.32));K.add(hSph(0.12,6,4),hp(0xe8e0f0),tm(0,-0.02,0.2,0,0,0,1.2,0.8,0.6),{s:0.2});
    for(const sd of[-1,1]){K.add(KP.cyl(0.01,0.012,0.36,4),bc,tm(sd*0.07,0.2,0.42,-0.6,0,-sd*0.4));K.add(hIco(0.03),hp(0xffe070),tm(sd*0.14,0.36,0.52),{s:0.2});}});
  const wm=M(0xb0a0c8,{transparent:true,opacity:0.85,side:THREE.DoubleSide});const wingShape=s=>{const sh=new THREE.Shape();sh.moveTo(0,0);sh.bezierCurveTo(s*0.3,0.55,s*0.95,0.6,s*0.95,0.15);sh.bezierCurveTo(s*0.95,-0.15,s*0.7,-0.25,s*0.55,-0.2);sh.bezierCurveTo(s*0.7,-0.5,s*0.35,-0.65,0,-0.15);return new THREE.ShapeGeometry(sh,6);};
  const wings=[],spots=[];for(const sd of[-1,1]){const wp=new THREE.Group();wp.position.set(sd*0.08,0.04,0.02);body.add(wp);
    const wg=new THREE.Mesh(wingShape(sd),wm);wg.rotation.x=-Math.PI/2;wp.add(wg);
    const c=PCOL[sd<0?0:1],sm=M(c,{emissive:c,emissiveIntensity:0.12,transparent:true,opacity:0.85,side:THREE.DoubleSide});const sp=new THREE.Mesh(new THREE.CircleGeometry(0.2,14),sm);sp.rotation.x=-Math.PI/2;sp.position.set(sd*0.55,0.012,-0.1);wp.add(sp);
    const rim=new THREE.Mesh(new THREE.RingGeometry(0.2,0.25,14),M(0x3a2a4a,{side:THREE.DoubleSide}));rim.rotation.x=-Math.PI/2;rim.position.set(sd*0.55,0.011,-0.1);wp.add(rim);
    wings.push({wp,s:sd});spots.push(sm);}
  return {wings,spots,body,eyeY:1.08,eyeZ:0.4,top:1.4,eyeS:0.75,eyeX:0.09,lid:bc};};
// ---------- ворона-морок с чёрным ключом ----------
FL.vorona=(inner)=>{const bk=hp(0x2a2a36),bk2=hp(0x3e3e4c),bm=hp(0x6a6a70);fk(inner,K=>{K.add(hSph(0.42,8,6),bk,tm(0,0.6,0,0,0,0,0.85,0.9,1.2));K.add(hSph(0.26,8,6),bk,tm(0,1.05,0.3));
    const bg=KP.cone(0.08,0.36,5);bg.rotateX(Math.PI/2);K.add(bg,hp(0x5a5a60),tm(0,1.0,0.62),{s:0.1});for(let i=0;i<5;i++)K.add(KP.cone(0.08,0.5,3),i%2?bk2:bk,tm((i-2)*0.07,0.68,-0.55,-1.8,(i-2)*0.2,0,1,1,0.3));
    for(const sd of[-1,1]){K.add(KP.cyl(0.025,0.025,0.3,4),bm,tm(sd*0.12,0.15,0));K.add(KP.cone(0.06,0.12,3),bm,tm(sd*0.12,0.02,0.05,Math.PI/2,0,0));}
    for(let i=0;i<3;i++)K.add(KP.cone(0.04,0.18,3),bk2,tm((i-1)*0.05,1.3,0.25,-0.5,0,(i-1)*0.3));});
  const wings=[];for(const sd of[-1,1]){const wp=new THREE.Group();wp.position.set(sd*0.32,0.8,0);inner.add(wp);fk(wp,K=>{for(let k=0;k<4;k++)K.add(KP.cone(0.13,0.8-k*0.1,3),k%2?bk2:bk,tm(sd*(0.2+k*0.15),0,-0.05+k*0.06,-Math.PI/2+0.1,0,-sd*1.4,1,1,0.25));});wings.push({wp,sd});}
  const key=new THREE.Group();key.position.set(0,0.78,0.42);inner.add(key);fk(key,K=>K.add(KP.cyl(0.008,0.008,0.3,4),hp(0xd0c8b0),tm(0,-0.1,0)),{shadow:false});const k2=blackKey(1.2);k2.position.y=-0.25;key.add(k2);
  return {wings,key,eyeY:1.1,eyeZ:0.5,top:1.5,eyeS:0.85,eyeX:0.12,lid:bk};};
// ---------- пугало-страж: мешок-голова со стежками, шляпа, солома, рубаха в заплатках ----------
FL.pugalo=(inner)=>{const straw=hp(0xe0c070),sack=hp(0xd8c0a0),shirt=hp(0x9a3a3a),wood=hp(0x7a5634),hat=hp(0x5a4a3a);
  fk(inner,K=>{K.add(KP.cyl(0.07,0.08,1.6,6),wood,tm(0,0.8,0));K.add(KP.lathe([[0,-0.45],[0.46,-0.45],[0.4,0],[0.36,0.3],[0.2,0.45],[0,0.46]],9),shirt,tm(0,1.25,0),{noise:0.015});
    for(let i=0;i<3;i++)K.box(0.16,0.14,0.02,[hp(0x4a6a8a),hp(0xd8c060),hp(0x6a8a4a)][i],tm((i-1)*0.2,1.1+i*0.12,0.42),{b:0.005});
    for(let k=0;k<8;k++)K.add(KP.cone(0.05,0.3,3),straw,tm(Math.cos(k*0.8)*0.3,0.78,Math.sin(k*0.8)*0.3,Math.PI,0,0));
    K.add(hSph(0.32,8,6),sack,tm(0,2.0,0),{noise:0.01});for(let i=0;i<5;i++)K.box(0.03,0.08,0.02,hp(0x3a2a1a),tm(-0.12+i*0.06,1.86,0.3),{b:0});K.box(0.24,0.015,0.02,hp(0x3a2a1a),tm(0,1.86,0.3),{b:0});
    K.add(KP.cone(0.4,0.55,10),hat,tm(0,2.5,0));K.add(KP.cyl(0.56,0.56,0.04,12),hat,tm(0,2.25,0));K.add(KP.tor(0.4,0.03,3,12),hp(0xc04a3a),tm(0,2.3,0,Math.PI/2,0,0));
    for(let k=0;k<7;k++)K.add(KP.cone(0.04,0.32,3),straw,tm(Math.cos(k*0.9)*0.25,1.72,Math.sin(k*0.9)*0.25,Math.PI,0,0));});
  const arm=new THREE.Group();arm.position.y=1.55;inner.add(arm);fk(arm,K=>{K.box(1.8,0.1,0.1,wood,null,{b:0.02});for(const sd of[-1,1]){K.add(KP.cyl(0.14,0.12,0.7,6),shirt,tm(sd*0.55,0,0,0,0,Math.PI/2));
    for(let k=0;k<5;k++)K.add(KP.cone(0.05,0.34,3),straw,tm(sd*(0.98+k*0.01),(k-2)*0.05,(k%2?0.05:-0.05),0,0,-sd*Math.PI/2));}});
  return {arm,eyeY:2.06,eyeZ:0.27,top:2.8,eyeS:0.95,lid:sack};};
// ---------- хамелей: ящерка-хамелеон, перенимает цвет знака (материал — как у прототипа) ----------
FL.hameley=(inner)=>{const bm=M(0xffd23a,{emissive:0xffd23a,emissiveIntensity:0.25});const body=new THREE.Group();inner.add(body);
  fk(body,K=>{K.add(hSph(0.46,9,7),WHT,tm(0,0.6,0,0,0,0,1,0.9,1.15));K.add(hSph(0.3,8,6),WHT,tm(0,0.72,0.4,0,0,0,1,0.9,1.1));
    for(let i=0;i<6;i++)K.add(KP.cone(0.07,0.26,4),WHT,tm(0,1.02-i*0.04,0.3-i*0.16,-0.3-i*0.2,0,0));K.add(KP.tor(0.2,0.06,4,12,Math.PI*1.6),WHT,tm(0,0.35,-0.52,0,Math.PI/2,0));
    for(const sd of[-1,1])for(const z of[-0.2,0.25])K.add(KP.cyl(0.05,0.05,0.35,5),WHT,tm(sd*0.35,0.25,z,0,0,sd*0.7));},{mat:bm});
  return {bm,body,eyeY:0.8,eyeZ:0.56,top:1.2,eyeS:1.0,eyeX:0.18,lid:hp(0xffd23a)};};
// ---------- цепь Кощея из земли: звенья, крюк, золотое звено ----------
FL.cep=(inner)=>{const im=hp(0x4a4a56),gm=GD_C;const ch=new THREE.Group();inner.add(ch);
  for(let i=0;i<7;i++){const l=fk(ch,K=>K.add(KP.tor(0.2,0.075,5,12),i===6?gm:im,null,{kN:0.5,s:i===6?0.2:0}),{pos:[0,0.2+i*0.3,0]});l.rotation.y=i%2?Math.PI/2:0;l.scale.set(1,1.4,1);if(i===6){l.material=KMAT.glow;}}
  fk(inner,K=>{K.add(KP.tor(0.28,0.08,5,14,Math.PI*1.3),im,tm(0,2.5,0.1,0,0,Math.PI*0.6));K.add(KP.ico(0.34,1),hp(0x201a28),tm(0,2.2,0),{noise:0.02});for(let i=0;i<5;i++){const d=fib(5,i);K.add(KP.cone(0.06,0.2,4),im,spikeM(d,0.34).premultiply(tm(0,2.2,0)));}});
  return {chain:ch,eyeY:2.25,eyeZ:0.3,top:2.7,eyeS:0.9,lid:hp(0x201a28)};};
// ---------- чугунный болван в раскалённых латах ----------
FL.bolvan=(inner)=>{const iron=hp(0x4e4c56),clay=hp(0xb0805a);fk(inner,K=>{K.add(KP.bcyl(0.62,1.3,0.08,10),clay,tm(0,0.85,0),{noise:0.02});K.add(KP.ico(0.42,1),iron,tm(0,1.8,0),{noise:0.015});
    for(const s of[-1,1]){K.add(KP.cyl(0.2,0.22,0.6,7),iron,tm(s*0.3,0.2,0));K.add(KP.ico(0.28,1),iron,tm(s*0.75,1.3,0));}
    K.box(0.9,0.12,0.9,iron,tm(0,2.05,0),{b:0.03});for(let i=0;i<4;i++)K.add(hIco(0.05),hp(0x8a8a94),tm(Math.cos(i*1.57)*0.36,2.1,Math.sin(i*1.57)*0.36),{s:0.3});
    K.box(0.3,0.05,0.04,hp(0x1a1a20),tm(0,1.66,0.4),{b:0.01});});
  const plateM=M(0xff6a20,{emissive:0xff3000,emissiveIntensity:0.7});const plate=new THREE.Group();inner.add(plate);
  const pm=new THREE.Mesh(sBoxGeo(1.2,1.1,0.2,{b:0.05}),plateM);pm.position.set(0,1.0,0.55);pm.castShadow=true;plate.add(pm);fk(plate,K=>{for(let i=0;i<3;i++)K.box(1.0,0.05,0.05,hp(0x2a2a30),tm(0,0.7+i*0.3,0.67),{b:0.01});});
  const arm=new THREE.Group();arm.position.set(0.75,1.3,0);inner.add(arm);fk(arm,K=>{K.add(KP.cyl(0.16,0.2,0.9,7),iron,tm(0,-0.4,0.2,0.5,0,0));K.add(KP.ico(0.22,1),iron,tm(0,-0.82,0.42));});
  return {plate,plateM,arm,eyeY:1.86,eyeZ:0.38,top:2.3,eyeS:1.05,lid:iron};};
// ---------- печник: печка на лапках с заслонкой и гнездом для угля ----------
FL.pechnik=(inner)=>{const wh=PAL.plaster,br=hp(0xb05a3a),dk=hp(0x2a2420);fk(inner,K=>{K.box(0.9,0.75,0.9,wh,tm(0,0.72,0),{b:0.06});K.box(0.98,0.1,0.98,br,tm(0,1.12,0),{b:0.02});
    K.add(KP.cyl(0.1,0.12,0.42,7),br,tm(0.26,1.36,-0.26));for(const sx of[-1,1])for(const sz of[-1,1])K.add(KP.cyl(0.07,0.05,0.4,5),dk,tm(sx*0.32,0.18,sz*0.32));
    for(let i=0;i<3;i++)K.add(KP.ico(0.05,0),[PAL.blue,PAL.red,PAL.green][i],tm(-0.25+i*0.25,0.95,0.46,0,0,0,1,1,0.3),{s:0.2});});
  const doorM=M(0x3a2a20,{emissive:0xff5a10,emissiveIntensity:0.08});const door=new THREE.Mesh(sBoxGeo(0.46,0.3,0.05,{b:0.015}),doorM);door.position.set(0,0.52,0.46);door.castShadow=true;inner.add(door);
  const slotM=M(0xff7a20,{emissive:0xff4a00,emissiveIntensity:0.05});const slot=new THREE.Mesh(sBoxGeo(0.42,0.06,0.3,{b:0.01}),slotM);slot.position.set(0,1.18,-0.16);inner.add(slot);
  const arm=new THREE.Group();arm.position.set(0.5,0.8,0);inner.add(arm);fk(arm,K=>K.box(0.12,0.12,0.5,br,tm(0,0,0.2),{b:0.02}));
  return {slot,slotM,door,doorM,arm,eyeY:0.9,eyeZ:0.47,top:1.6,eyeS:1.0,lid:wh};};
// ---------- жар-ящерка: тёмная, как уголь, с огненным брюшком и гребнем — видна на лаве ----------
FL.lizard=(inner)=>{const c=hp(0x3a2a2a),glow=hp(0xffa040);fk(inner,K=>{K.add(hSph(0.32,8,6),c,tm(0,0.35,0,0,0,0,0.8,0.6,1.5),{noise:0.01});K.add(hSph(0.22,7,5),c,tm(0,0.45,0.5,0,0,0,1,0.85,1.2));
    for(const s of[-1,1])for(const z of[-0.2,0.25]){K.add(KP.cyl(0.04,0.04,0.3,5),c,tm(s*0.28,0.2,z,0,0,s*0.9));K.add(hIco(0.05),c,tm(s*0.4,0.08,z+0.03));}
    K.add(hSph(0.07,5,4),hp(0x1a0c08),tm(0,0.38,0.68,0,0,0,1.6,0.5,0.4),{kN:0});});
  fk(inner,K=>{K.add(hSph(0.22,7,5),glow,tm(0,0.25,0.05,0,0,0,0.9,0.4,1.4));for(let i=0;i<4;i++)K.add(KP.cone(0.05,0.16,4),hp(0xffd060),tm(0,0.58,0.3-i*0.2));},{mat:KMAT.glow,shadow:false});
  const tail=new THREE.Group();tail.position.set(0,0.35,-0.45);inner.add(tail);fk(tail,K=>{K.add(KP.cone(0.14,0.8,6),c,tm(0,0,-0.4,-Math.PI/2,0,0));});fk(tail,K=>{K.add(KP.cone(0.06,0.3,4),hp(0xffc040),tm(0,0,-0.78,-Math.PI/2,0,0));},{mat:KMAT.glow,shadow:false});
  return {tail,eyeY:0.56,eyeZ:0.66,top:0.9,eyeS:0.8,eyeX:0.13,lid:c};};
// ---------- змеёныш: огненная змейка из сегментов (материал — как у прототипа) ----------
FL.snake=(inner)=>{const mat=M(0xff6a1a,{emissive:0xff3000,emissiveIntensity:0.6});const segs=[];
  for(let i=0;i<6;i++){const s2=new THREE.Mesh(KP.ico(0.24-i*0.025,1),mat);s2.position.set(0,0.25,0.3-i*0.28);s2.castShadow=true;inner.add(s2);segs.push(s2);}
  fk(inner,K=>{K.add(hSph(0.26,8,6),WHT,tm(0,0.42,0.5,0,0,0,1,0.8,1.3));for(const s of[-1,1])K.add(KP.cone(0.04,0.14,3),WHT,tm(s*0.12,0.6,0.42,-0.4,0,-s*0.3));},{mat});
  fk(inner,K=>{K.add(hSph(0.06,5,4),hp(0x2a0a04),tm(0,0.35,0.8,0,0,0,1.6,0.5,0.4),{kN:0});K.add(KP.cone(0.02,0.12,3),hp(0xff4060),tm(0,0.33,0.86,Math.PI/2,0,0));});
  return {segs,mat,eyeY:0.52,eyeZ:0.7,top:0.9,eyeS:0.8,eyeX:0.12,lid:hp(0xff6a1a)};};
// ---------- голова Горыныча (4-Б): рогатая, с пастью ----------
FL.golova=(inner)=>{const sk=hp(0x5a9a4a),dk=hp(0x2a5a24);const head=new THREE.Group();head.position.y=0.8;inner.add(head);
  fk(head,K=>{K.add(hSph(0.8,9,7),sk,tm(0,0,0,0,0,0,1,0.85,1.3),{noise:0.015});K.box(0.9,0.4,0.9,sk,tm(0,-0.12,0.95),{b:0.12});
    for(const s of[-1,1]){K.add(KP.cone(0.12,0.6,5),hp(0xf0e8d0),tm(s*0.45,0.6,-0.3,-0.6,0,-s*0.2),{s:0.2});K.add(hIco(0.06),hp(0x1a2a14),tm(s*0.2,-0.02,1.4),{kN:0});K.add(KP.cone(0.12,0.3,3),dk,tm(s*0.75,0.1,-0.1,0,0,-s*1.4));}
    for(let i=0;i<5;i++)K.add(KP.cone(0.1,0.3,4),dk,tm(0,0.7-i*0.05,0.1-i*0.3,-0.4,0,0));});
  const jaw=new THREE.Group();jaw.position.set(0,-0.35,0.5);head.add(jaw);fk(jaw,K=>{K.box(0.8,0.16,1.0,dk,tm(0,0,0.4),{b:0.05});for(let i=0;i<5;i++)K.add(KP.cone(0.05,0.14,4),PAL.white,tm((i-2)*0.15,0.12,0.8),{s:0.3});});
  return {head,jaw,eyeY:1.05,eyeZ:0.9,top:1.9,eyeS:1.4,eyeX:0.3,lid:sk};};
{const _fl=foeLook;foeLook=function(kind,inner,def){const f=FL[def.look];if(f){try{const L=f(inner,def,kind);L.castLook=true;return L;}catch(err){console.error('foeLook '+def.look,err);for(const c of inner.children.slice())inner.remove(c);}}return _fl(kind,inner,def);};}
// ---------- глаза и брови морока ----------
const FE_LID=new FIN.orig.Sphere(1,8,4,0,Math.PI*2,0,Math.PI/2),FE_SCL=new FIN.orig.Sphere(1,9,7),FE_HL=new THREE.IcosahedronGeometry(1,0);
function foeFace(e){const L=e.L,inner=e.inner;if(L.noFace||e.def.look==='dvoynik')return;
  // старые глаза: светящиеся шарики и зрачки прототипа
  for(const c of inner.children.slice())if(c.isMesh&&(c.material===e.eyeMat||(c.material===MAT.dark&&Math.abs(c.position.y-L.eyeY)<1e-6)))inner.remove(c);
  const sol=inner.userData.castSol;if(sol){for(const n of['L','R']){const b=sol.rig['eye'+n];if(!b)continue;const ir=new THREE.Mesh(new THREE.SphereGeometry(0.05,8,6),e.eyeMat);ir.position.z=0.06;b.add(ir);}e.ff={sol:true};return;}
  const es=L.eyeS||Math.max(1,Math.min(2.4,e.def.r/0.6)),r=0.1*es,ex=L.eyeX||Math.max(0.15,r*1.35),lidK=(L.lid||hp(0x3a2a3a));
  const face={eyes:[],lids:[],brows:[],blink:1+Math.random()*3,bt:-1,ang:0,surp:0,shut:0,r};
  const sclM=new THREE.MeshLambertMaterial({color:0xfbf8ee}),lidM=new THREE.MeshLambertMaterial({color:lidK[1]}),brM=new THREE.MeshLambertMaterial({color:new THREE.Color(lidK[2]).multiplyScalar(0.55)});
  sclM.userData.noOcc=true;
  for(const s of[-1,1]){const g=new THREE.Group();g.position.set(s*ex,L.eyeY,L.eyeZ);inner.add(g);
    const sc=new THREE.Mesh(FE_SCL,sclM);sc.scale.set(r,r*1.1,r*0.8);g.add(sc);
    const ir=new THREE.Mesh(FE_SCL,e.eyeMat);ir.scale.set(r*0.62,r*0.68,r*0.35);ir.position.z=r*0.55;g.add(ir);
    const pu=new THREE.Mesh(FE_SCL,MAT.dark);pu.scale.set(r*0.3,r*0.34,r*0.2);pu.position.z=r*0.78;g.add(pu);
    const hl=new THREE.Mesh(FE_HL,MB(0xffffff));hl.scale.setScalar(r*0.17);hl.position.set(r*0.25,r*0.3,r*0.86);g.add(hl);
    const lp=new THREE.Group();g.add(lp);const ld=new THREE.Mesh(FE_LID,lidM);ld.scale.set(r*1.12,r*1.2,r*0.92);lp.add(ld);lp.rotation.x=-2.3;
    const bw=new THREE.Mesh(sBoxGeo(r*1.4,r*0.32,r*0.4,{b:r*0.08}),brM);bw.position.set(0,r*1.25,r*0.35);g.add(bw);
    face.eyes.push({g,s,pu,ir});face.lids.push(lp);face.brows.push({m:bw,s});}
  e.ff=face;}
{const _mf=makeFoe;makeFoe=function(){const e=_mf.apply(this,arguments);try{if(e&&e.L)foeFace(e);}catch(err){console.error('foeFace',err);}return e;};}
function foeFaceTick(e,dt){const F=e.ff;if(!F||F.sol||!e.g.visible)return;const st=e.state,w=st==='wind'||st==='ready'||st==='strike';
  F.blink-=dt;if(F.blink<=0&&F.bt<0){F.bt=0;F.blink=1.8+Math.random()*3.2;}let lid=0;if(F.bt>=0){F.bt+=dt;const u=F.bt/0.16;lid=u<0.5?u*2:Math.max(0,2-u*2);if(u>=1)F.bt=-1;}
  const dizzy=st==='broken'||e.dazeT>0||st==='stagger',dying=st==='dying'||!e.alive;
  F.ang+=((w?1:0)-F.ang)*Math.min(1,dt*10);F.surp+=((dizzy?1:0)-F.surp)*Math.min(1,dt*8);F.shut+=((dying?1:0)-F.shut)*Math.min(1,dt*12);
  const L0=Math.max(lid,F.shut,F.ang*0.28,F.surp*0.2);F.lids.forEach(l=>{l.rotation.x=-2.3+L0*3.5;});
  F.brows.forEach(b=>{b.m.rotation.z=b.s*(F.ang*0.55-F.surp*0.35);b.m.position.y=F.r*(1.25-F.ang*0.18+F.surp*0.25);});
  // оглушён — глаза «в кучку» и кружатся; иначе — смотрит на свою цель
  const t=G.time*9;F.eyes.forEach(E=>{let px=0,py=0;if(F.surp>0.3){px=Math.cos(t+E.s)*0.25*F.surp;py=Math.sin(t+E.s)*0.25*F.surp;}else if(e.tgt){const a=Math.atan2(e.tgt.pos.x-e.pos.x,e.tgt.pos.z-e.pos.z)-e.g.rotation.y;px=Math.max(-0.3,Math.min(0.3,Math.sin(a)*0.3));}
    E.pu.position.x=px*F.r;E.pu.position.y=py*F.r;E.ir.position.x=px*F.r*0.6;E.ir.position.y=py*F.r*0.6;});}
{const _uf=updateFoe;updateFoe=function(e,dt){_uf(e,dt);try{foeFaceTick(e,dt);}catch(err){console.error('foeFaceTick',err);e.ff=null;}};}
FIN.foeLooks=FL;
