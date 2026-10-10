/* ============================== РЕЛИЗ final05 · ПЕРСОНАЖИ НА УРОВНЕ ГЕРОЕВ: скелетные low-poly модели, лица, живая анимация ============================== */
// Все жители сказки (Кот, Яга, Кикимора, Колобок, Кузьма, Леший, Кощей, Тишка и другие — см. late_17_cast2) собраны тем же китом, что и герои
// (late_15): один SkinnedMesh на материал, кости — детали лица и тела, каждая вершина жёстко привязана к своей кости, цвета — палитра в вершинах.
// Лицо как у героев: глаза с радужкой и двумя бликами, веки (моргают), брови, рот (говорит). Светящиеся части (глаза Лешего, Кощея, Кикиморы)
// — отдельный меш того же скелета со свечением. Совместимость с прототипом: части, которые двигает логика (head, armR, hand, spindle, hands[].sh,
// arm, tail…), — кости в тех же точках поворота; веки и рот, которым сценарии задают свои углы, — через прокси (углы пересчитываются);
// .visible у кости прячет её детали (масштаб 0,001). Отрисовок на персонажа — 1–3.
const CMAT=new THREE.MeshLambertMaterial({vertexColors:true,skinning:true});CMAT.userData.shared=true;CMAT.userData.kit=true;
const CGLOW=new THREE.MeshLambertMaterial({vertexColors:true,skinning:true});CGLOW.userData.fx='glow';CGLOW.userData.glow=0.9;CGLOW.userData.shared=true;CGLOW.userData.kit=true;
// риг персонажа: как у героя, но наборов вершин несколько (b — основной, g — свечение, свои — со своим материалом), скелет общий
function castRig(H,seed){const R=heroRig(H,seed);R.KS={b:R.K};R.use=k=>{R.K=R.KS[k]||(R.KS[k]=new SkGeo(H,seed));return R;};
  R.build=(body,mats)=>{mats=mats||{};const out={};let first=null,sk=null;
    for(const k in R.KS){const K=R.KS[k];if(!K.P.length)continue;const g=K.buildSk(),mesh=new THREE.SkinnedMesh(g,mats[k]||(k==='g'?CGLOW:CMAT));
      if(!first){first=mesh;mesh.add(R.map.root);mesh.updateMatrixWorld(true);sk=new THREE.Skeleton(R.bones);}
      mesh.bind(sk,new THREE.Matrix4());mesh.castShadow=k!=='g';mesh.receiveShadow=false;mesh.frustumCulled=false;mesh.userData.cast=true;body.add(mesh);out[k]=mesh;}
    return out;};
  return R;}
// .visible у кости: детали прячутся масштабом (у скелетного меша кость сама по себе не рисуется)
function bvis(b){Object.defineProperty(b,'visible',{get(){return this._vis!==false;},set(v){v=!!v;if((this._vis!==false)===v)return;this._vis=v;
  if(!v){this._s0=this.scale.clone();this.scale.setScalar(0.001);}else if(this._s0)this.scale.copy(this._s0);},configurable:true});return b;}
// прокси века: сценарий прототипа крутит полусферу-веко в своих углах (p0 — открыт, p1 — прикрыт) → угол кости-века (r0 — открыт, r1 — прикрыт)
function lidProxy(b,p0,p1,r0,r1){const rot={_x:p0};Object.defineProperty(rot,'x',{get(){return this._x;},set(v){this._x=v;b.rotation.x=r0+(v-p0)/(p1-p0)*(r1-r0);b.userData.lidHold=Math.abs(v-p0)>1e-3;}});
  return {rotation:rot,bone:b,isProxy:true};}
// прокси рта: scale.y = 1 — закрыт (как в прототипе), больше — открыт
function mouthProxy(b){const sc={_y:1,x:1,z:1};Object.defineProperty(sc,'y',{get(){return this._y;},set(v){this._y=v;b.scale.y=0.32+Math.max(0,v-1)*1.6;b.userData.hold=Math.abs(v-1)>1e-3;}});
  sc.set=function(x,y,z){this.y=y;return this;};sc.setScalar=function(v){this.y=v;return this;};return {scale:sc,bone:b,isProxy:true};}
const cc=(a,b,c)=>[a,b,c];   // свой цвет: свет, база, тень
// ---------- лицо: моргание, речь, взгляд на ближайшего героя ----------
const CAST={list:[]};FIN.cast=CAST;
function castReg(o,opt){o.face={blink:1+Math.random()*3,bt:-1,ph:Math.random()*6.28,look:0,opt:opt||{},act:null};CAST.list.push(o);return o;}
function castFace(o,dt){const R=o.rig,F=o.face;if(!R||!o.g.parent||!o.g.visible)return;
  F.blink-=dt;if(F.blink<=0&&F.bt<0){F.bt=0;F.blink=2.2+Math.random()*3.5;}let lid=0;if(F.bt>=0){F.bt+=dt;const u=F.bt/0.17;lid=u<0.5?u*2:Math.max(0,2-u*2);if(u>=1)F.bt=-1;}
  const lr=F.opt.lid||[-2.45,1.25];for(const s of['L','R']){const l=R['lid'+s];if(l&&!l.userData.lidHold)l.rotation.x=lr[0]+lid*(lr[1]-lr[0]);}
  if(!F.act&&typeof ACT!=='undefined')F.act=ACT.npcs.find(q=>q.o===o)||null;const talk=F.act&&F.act.talk>0?Math.min(1,F.act.talk*3):0;
  if(R.mouth&&!R.mouth.userData.hold){const t=0.32+talk*(0.22+0.62*Math.abs(Math.sin(G.time*13+F.ph)));R.mouth.scale.y+=(t-R.mouth.scale.y)*Math.min(1,dt*22);}
  for(const s of['L','R']){const b=R['brow'+s];if(b){if(b.userData.y0==null)b.userData.y0=b.position.y;b.position.y=b.userData.y0+talk*0.012*(F.opt.hs||1)*(1+Math.sin(G.time*5+F.ph));}}
  // взгляд: глаза поворачиваются к ближайшему герою (в пределах 9 м)
  let tgt=0;if(HEROES){const p=o.g.getWorldPosition(C_V);let best=81,bh=null;for(const h of HEROES){if(!h.active&&!h.g.visible)continue;const d=(h.pos.x-p.x)**2+(h.pos.z-p.z)**2;if(d<best){best=d;bh=h;}}
    if(bh){const wy=o.g.getWorldQuaternion(C_Q);C_E.setFromQuaternion(wy,'YXZ');let a=Math.atan2(bh.pos.x-p.x,bh.pos.z-p.z)-C_E.y;a=Math.atan2(Math.sin(a),Math.cos(a));tgt=Math.max(-0.45,Math.min(0.45,a));}}
  F.look+=(tgt-F.look)*Math.min(1,dt*6);for(const s of['L','R']){const e=R['eye'+s];if(e)e.rotation.y=F.look*0.7;}
  if(F.opt.tick)F.opt.tick(o,dt,talk);}
const C_V=new V3(),C_Q=new THREE.Quaternion(),C_E=new THREE.Euler();
{const _st=step;step=function(dt){_st(dt);for(let i=CAST.list.length-1;i>=0;i--){const o=CAST.list[i];if(!o.g.parent){if(!o.g.userData.keepCast)CAST.list.splice(i,1);continue;}try{castFace(o,dt);}catch(e){console.error('cast',e);CAST.list.splice(i,1);}}};}
{const _ll=loadLevel;loadLevel=function(i){CAST.list.length=0;_ll(i);};}
// общий вид: g → body → скелетный меш; o.rig — кости
function castMake(R,mats){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const meshes=R.build(body,mats);return {g,body,rig:R.map,meshes};}
// рука-ветка: плечо → рука → локоть → кисть (кости вниз по −y), с деталями
function cArm(R,n,parent,at,a,b,r0,r1,pal,palLow){hLimb(R,n,'',parent,at,[['shoulder',0,0,0,null],['arm',a,r0,r0*0.9,pal],['elbow',b,r0*0.9,r1,palLow||pal],['hand',0,0,0,null]]);}

/* ---------- Кот Учёный: серый полосатый, сидит; очки в золотой оправе, на шее — звено златой цепи; хвост — 7 костей (их двигает сцена Лукоморья) ---------- */
const P_KOT=cc(0xb8b0a6,0x8e8478,0x5e554c),P_KOTD=cc(0x7a7066,0x5a5148,0x3a332c);
function buildKot(){const R=castRig(2.1,31),K=P_KOT,D=P_KOTD,C=PAL.cream;
  R.bone('hips','root',0,0.55,0);R.bone('chest','hips',0,0.45,0);R.bone('neck','chest',0,0.35,0.02);R.bone('head','neck',0,0.27,0.03);
  R.part('hips',KP.lathe([[0,-0.55],[0.4,-0.54],[0.52,-0.36],[0.52,-0.12],[0.46,0.14],[0.4,0.4],[0.33,0.62],[0.26,0.8],[0,0.84]],9),K,tm(0,0,0,0,0,0,1,1,0.86));
  R.part('neck',KP.cyl(0.2,0.25,0.3,8),K,tm(0,0.02,0));
  R.part('hips',hSph(0.27,7,5),C,tm(0,0.24,0.3,0,0,0,1,1.8,0.5),{s:0.2});
  for(let i=0;i<3;i++)R.part('hips',KP.tor(0.47-i*0.05,0.035,3,12,Math.PI*1.1),D,tm(0,-0.2+i*0.24,-0.02,Math.PI/2,0,Math.PI*0.95+Math.PI,1,0.86,1),{kN:0.2});   // полосы на спине
  for(const s of[-1,1]){R.part('hips',hSph(0.27,7,5),K,tm(s*0.33,-0.34,-0.06,0,0,0,0.9,0.85,1.2));R.part('hips',hSph(0.13,6,4),C,tm(s*0.3,-0.52,0.26,0,0,0,1,0.55,1.5),{s:0.1});}
  // звено златой цепи на шее
  R.part('neck',KP.tor(0.24,0.03,4,14),PAL.gold,tm(0,-0.06,0.03,Math.PI/2+0.35,0,0),{kN:0.3,s:0.2});R.part('neck',KP.tor(0.06,0.02,4,10),PAL.gold,tm(0,-0.2,0.25,0.3,0,0,1,1.35,1),{s:0.3});
  // голова
  R.part('head',hSph(0.4,9,7),K,tm(0,0,0,0,0,0,1.12,0.95,1));for(const s of[-1,1])R.part('head',KP.cone(0.1,0.24,4),K,tm(s*0.4,-0.12,0.05,0,0,s*1.9,1,1,0.6),{s:-0.1});   // щёки-пушки
  R.part('head',hSph(0.17,7,5),C,tm(0,-0.12,0.28,0,0,0,1.35,0.8,0.85),{s:0.25});R.part('head',hIco(0.045),PAL.pink,tm(0,-0.04,0.42,0,0,0,1.3,0.8,1),{s:0.1});
  for(let i=0;i<3;i++)R.box('head',0.03,0.13,0.03,D,tm((i-1)*0.07,0.3,0.28-Math.abs(i-1)*0.02,-0.5,0,(i-1)*0.2),{b:0});   // полоски на лбу
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('ear'+n,'head',s*0.24,0.3,-0.02);R.part('ear'+n,KP.cone(0.14,0.3,4),K,tm(0,0.1,0,0,Math.PI/4,-s*0.28,1,1,0.55));R.part('ear'+n,KP.cone(0.08,0.19,4),PAL.pink,tm(-s*0.01,0.07,0.035,0,Math.PI/4,-s*0.28,1,1,0.3),{s:0.1});
    hEye(R,n,s*0.15,0.07,0.35,0.092,cc(0xe8f890,0xbcd850,0x7a9a30),{lid:K});hBrow(R,n,s*0.155,0.2,0.33,0.1,D,s*0.12);
    R.part('head',KP.tor(0.11,0.013,3,14),PAL.gold,tm(s*0.15,0.07,0.43),{kN:0,s:0.3});for(let j=0;j<3;j++)R.box('head',0.24,0.008,0.008,PAL.white,tm(s*0.3,-0.12+j*0.035,0.33,0,-s*0.35,s*(j-1)*0.18),{b:0,s:0.5});}
  R.box('head',0.08,0.012,0.012,PAL.gold,tm(0,0.08,0.44),{b:0,s:0.3});
  hMouth(R,0,-0.17,0.37,0.04);
  // передние лапы: плечо → лапа до земли; кисти — светлые «носочки»
  for(const[s,n]of[[1,'L'],[-1,'R']]){cArm(R,n,'chest',[s*0.2,-0.1,0.3],0.42,0.4,0.1,0.09,K);R.part('hand'+n,hSph(0.12,6,4),C,tm(0,-0.03,0.04,0,0,0,1,0.7,1.2),{s:0.1});}
  // хвост: 7 костей от корня — сцена ставит их по дуге
  for(let i=0;i<7;i++){const a=0.4+i*0.33;R.bone('tail'+i,'root',Math.sin(a)*0.62,0.12+i*0.02,-Math.cos(a)*0.62+0.1);R.part('tail'+i,hSph(0.135-i*0.008,6,5),i%2?D:K,tm(0,0,0,0,0,0,1,0.9,1.25),{kN:0.35});}
  return R;}
makeKot=function(){const R=buildKot(),o=castMake(R);const B=o.rig;const lids=['L','R'].map(n=>lidProxy(B['lid'+n],1.3,-0.5,-1.85,0.9));
  const tail=[];for(let i=0;i<7;i++)tail.push(B['tail'+i]);B.armL.rotation.x=-0.12;B.armR.rotation.x=-0.12;
  return castReg(Object.assign(o,{head:B.head,lids,tail}),{hs:1.4});};

/* ---------- Баба Яга: сгорбленная (горб под шалью, голова вперёд на тонкой наклонной шее), в очках с дужками, красный платок в белый горошек,
   нос крючком, подбородок-«кочерга», румяные щёки, морщинки, серьга; фартук с карманом и заплатами, пояс с ключами и связкой трав; добрая-сердитая ---------- */
const P_YSK=cc(0x8a6a8e,0x5e4462,0x3a283e),P_YJ=cc(0xa0764e,0x7a5234,0x4e3420),P_YSH=cc(0x7cb88a,0x468a62,0x28583c),P_YHR=cc(0xf0ece6,0xc4c0ba,0x8c8884);
function buildYaga(){const R=castRig(1.9,33),S=PAL.skins[2],RD=PAL.red;
  // осанка: таз прямо, спина наклонена вперёд, шея ещё круче, голова вынесена вперёд (рост и высота глаз — как были: глаза ≈ 1,72 м)
  R.bone('hips','root',0,0.6,0);R.bone('chest','hips',0,0.55,0.04);R.bone('neck','chest',0,0.33,0.1);R.bone('head','neck',0,0.2,0.1);
  // юбка до пояса, подол-«зубцы», заплатки
  R.part('hips',KP.lathe([[0,-0.6],[0.52,-0.6],[0.5,-0.42],[0.43,-0.15],[0.34,0.05],[0.27,0.18],[0.24,0.28],[0,0.3]],9),P_YSK);R.part('hips',KP.tor(0.5,0.035,3,14),RD,tm(0,-0.55,0,Math.PI/2,0,0),{kN:0.3});
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2+0.3;R.part('hips',KP.cone(0.05,0.1,3),P_YSK,tm(Math.sin(a)*0.5,-0.64,Math.cos(a)*0.5,Math.PI,0,0),{kN:0.1});}
  [[1.15,-0.3,PAL.green],[-1.2,-0.18,PAL.yellow],[2.5,-0.33,PAL.blue],[-2.3,-0.22,PAL.pink],[3.3,-0.38,PAL.green]].forEach(([a,y,c])=>{const r=0.47-(y+0.15)*0.26;
    R.box('hips',0.15,0.16,0.045,c,tm(Math.sin(a)*r,y,Math.cos(a)*r,0,a,0.12),{b:0.01,s:-0.1});});
  const ar=y=>y<-0.15?0.5-(y+0.42)/0.27*0.07:y<0.05?0.43-(y+0.15)/0.2*0.09:0.34-(y-0.05)/0.13*0.07;   // радиус юбки на высоте y
  R.part('hips',new THREE.LatheGeometry([[0.55,-0.58],[0.53,-0.42],[0.46,-0.15],[0.37,0.05],[0.33,0.13]].map(q=>new THREE.Vector2(q[0],q[1])),6,-0.62,1.24),PAL.white,null,{kN:0.2,s:0.1});   // фартук лежит на юбке
  R.part('hips',new THREE.LatheGeometry([[0.56,-0.6],[0.555,-0.5]].map(q=>new THREE.Vector2(q[0],q[1])),6,-0.62,1.24),RD,null,{kN:0.3});
  R.box('hips',0.19,0.17,0.03,PAL.yellow,tm(0,-0.34,ar(-0.34)+0.05,-0.26,0,0),{b:0.01,s:-0.1});R.box('hips',0.15,0.015,0.032,RD,tm(0,-0.275,ar(-0.275)+0.052,-0.26,0,0),{b:0});   // карман
  for(let i=0;i<4;i++){const y=-0.5+(i%2)*0.1;R.part('hips',hIco(0.026),RD,tm(-0.15+i*0.1,y,ar(y)+0.05),{s:0.1});}
  // пояс: красный кушак, пряжка, ключи слева, связка трав справа
  R.part('hips',KP.tor(0.265,0.032,3,14),RD,tm(0,0.2,0,Math.PI/2,0,0),{kN:0.3});R.box('hips',0.07,0.06,0.03,PAL.gold,tm(0,0.2,0.29),{b:0.01,s:0.1});
  R.part('hips',KP.tor(0.035,0.01,3,8),PAL.gold,tm(0.25,0.1,0.19,0.2,0.9,0),{kN:0.2});for(let i=0;i<2;i++)R.box('hips',0.014,0.1,0.012,PAL.gold,tm(0.27+i*0.03,0.02,0.225-i*0.02,0,0.5,0.1-i*0.2),{b:0});
  R.part('hips',KP.cone(0.02,0.2,4),PAL.green,tm(-0.27,0.08,0.2,Math.PI,0,0.3),{kN:0.2});R.part('hips',KP.cone(0.02,0.2,4),PAL.moss,tm(-0.3,0.08,0.18,Math.PI,0,0.42),{kN:0.2});
  R.part('hips',KP.cone(0.02,0.17,4),PAL.green,tm(-0.33,0.09,0.16,Math.PI,0,0.55),{kN:0.2});
  R.part('hips',hIco(0.032),PAL.yellow,tm(-0.31,-0.05,0.2),{s:0.2});R.part('hips',hIco(0.03),PAL.pink,tm(-0.355,-0.05,0.175),{s:0.2});R.part('hips',hIco(0.03),PAL.yellow,tm(-0.4,-0.04,0.145),{s:0.2});
  // спина: наклонена вперёд, на лопатках горб
  R.part('chest',KP.lathe([[0,0],[0.22,0],[0.27,0.12],[0.3,0.32],[0.27,0.5],[0.2,0.64],[0,0.68]],8),P_YJ,tm(0,-0.42,0,0.32,0,0,1,1,0.85));
  R.part('chest',hSph(0.17,7,5),P_YSH,tm(0,0.13,-0.15,0,0,0,1.2,0.95,1),{s:-0.05});   // горб
  // шея: тонкая, от плеч вперёд-вверх под череп; воротник-шаль не даёт ей торчать
  R.part('neck',KP.cyl(0.065,0.09,0.27,6),S,tm(0,0.095,0.05,0.46,0,0),{s:-0.1});
  R.box('neck',0.02,0.2,0.02,S,tm(0.04,0.08,0.09,0.46,0,0.05),{b:0,s:-0.3});
  // шаль на плечах: накрывает горб и плечи, спереди открыта; кайма и кисточки по подолу идут по её нижнему краю
  const SM=tm(0,0.0,-0.06,0.12,0,0),SX=1.12,SY=0.88,SZ=0.95,SR=0.36,SP=Math.PI*0.62,sy=SR*SY*Math.cos(SP),sr=SR*Math.sin(SP);
  R.part('chest',new FIN.orig.Sphere(SR,9,5,0,Math.PI*2,0,SP),P_YSH,SM.clone().multiply(tm(0,0,0,0,0,0,SX,SY,SZ)),{s:0,kN:0.3});
  R.part('chest',KP.tor(sr,0.022,3,16),PAL.gold,SM.clone().multiply(tm(0,sy,0,Math.PI/2,0,0,SX,SZ,1)),{kN:0.2});
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2,v=new V3(Math.sin(a)*sr*SX,sy-0.03,Math.cos(a)*sr*SZ).applyMatrix4(SM);R.part('chest',KP.cone(0.022,0.09,3),PAL.gold,tm(v.x,v.y,v.z,Math.PI+Math.cos(a)*0.2,0,-Math.sin(a)*0.2),{kN:0.2,s:0.1});}
  // бусы из ягод на груди
  for(let i=0;i<7;i++){const a=(i/6-0.5)*1.9;R.part('chest',hIco(0.026),i%2?PAL.mush:PAL.yellow,tm(Math.sin(a)*0.22,0.22-Math.cos(a)*0.1-0.02,0.3+Math.cos(a)*0.06,0,0,0),{s:0.1});}
  // ---------- голова ----------
  R.part('head',hSph(0.24,8,6),S,tm(0,0,0,0,0,0,1.02,1.08,1));
  for(const s of[-1,1]){R.part('head',hSph(0.055,6,4),S,tm(s*0.125,-0.03,0.175,0,0,0,1,0.7,0.55),{s:0.12});   // скулы
    R.part('head',hSph(0.03,6,4),cc(0xe8a690,0xd08470,0xa05a4a),tm(s*0.135,-0.075,0.19,0,0,0,1,0.8,0.4),{s:-0.2,kN:0.1});   // румянец
    R.part('head',hSph(0.06,6,4),S,tm(s*0.235,-0.02,-0.02,0,0,0,0.4,1,0.75),{s:0.05});   // ухо
    R.box('head',0.009,0.009,0.2,PAL.night,tm(s*0.2,0.045,0.12,0,s*0.05,0),{b:0});}   // дужки очков
  R.part('head',KP.tor(0.022,0.007,3,8),PAL.gold,tm(0.245,-0.07,-0.02,0,Math.PI/2,0),{kN:0});   // серьга
  // нос крючком: основание вперёд-вниз, кончик загибается к губам; бородавка
  const nose=KP.cone(0.052,0.2,5);R.part('head',nose,S,tm(0,0.005,0.268,1.85,0,0),{s:0.1});
  R.part('head',KP.cone(0.04,0.11,5),S,tm(0,-0.06,0.352,Math.PI+0.4,0,0),{s:0.05});
  R.part('head',hIco(0.022),cc(0xc88a70,0xa86a54,0x7a4a3a),tm(0.03,-0.03,0.305),{s:0});
  // подбородок вперёд и вверх — «кочерга»
  R.part('head',KP.cone(0.07,0.26,5),S,tm(0,-0.235,0.14,1.2,0,0),{s:0});
  // платок: поднят над бровями, сзади ниже; горошек; узел под подбородком; седые пряди
  R.part('head',new FIN.orig.Sphere(0.28,9,4,0,Math.PI*2,0,Math.PI*0.52),RD,tm(0,0.055,-0.04,-0.34,0,0),{kN:0.3});
  for(let i=0;i<16;i++){const th=0.18+Math.sqrt((i+0.5)/16)*1.2,ph=i*2.4,r=0.292,x=Math.sin(th)*Math.sin(ph)*r,y=Math.cos(th)*r,z=Math.sin(th)*Math.cos(ph)*r;
    const ca=Math.cos(-0.34),sa=Math.sin(-0.34);R.part('head',hIco(0.016),PAL.white,tm(x,0.055+y*ca-z*sa,-0.04+y*sa+z*ca),{kN:0,s:0.3});}
  R.part('head',KP.cone(0.09,0.2,4),RD,tm(0,-0.26,0.1,0.5,0,0));for(const s of[-1,1])R.part('head',KP.cone(0.05,0.2,3),RD,tm(s*0.08,-0.3,0.12,0.4,0,s*0.7),{s:-0.1});   // узел
  for(const s of[-1,1])for(let j=0;j<2;j++)R.part('head',KP.cone(0.013,0.1-j*0.015,3),P_YHR,tm(s*(0.205+j*0.01),0.06-j*0.05,0.1-j*0.04,0.2,0,s*(0.55+j*0.3)),{s:0.3});   // пряди из-под платка
  // глаза, брови, очки
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.09,0.04,0.21,0.058,cc(0x9ac0e8,0x5a8ac0,0x2a5a90),{lid:S});hBrow(R,n,s*0.09,0.1,0.2,0.075,P_YHR,-s*0.2);
    R.part('head',KP.tor(0.075,0.012,3,12),PAL.night,tm(s*0.09,0.04,0.245),{kN:0});}R.box('head',0.05,0.01,0.01,PAL.night,tm(0,0.05,0.25),{b:0});
  hMouth(R,0,-0.125,0.216,0.03);R.box('head',0.02,0.03,0.01,PAL.white,tm(0.012,-0.14,0.226),{b:0,s:0.5});   // рот и один зуб
  // руки: узловатые пальцы
  for(const[s,n]of[[1,'L'],[-1,'R']]){cArm(R,n,'chest',[s*0.27,0.15,0.17],0.3,0.28,0.07,0.06,P_YJ,P_YJ);R.part('shoulder'+n,hSph(0.085,6,4),P_YJ,tm(0,0.0,0));R.part('hand'+n,hSph(0.06,6,4),S,tm(0,-0.02,0.01));
    for(let j=0;j<4;j++)R.part('hand'+n,KP.cone(0.014,0.085+(j===1||j===2?0.015:0),4),S,tm((j-1.5)*0.028,-0.085,0.02,Math.PI+0.2,0,(j-1.5)*0.12),{s:-0.1});
    R.part('hand'+n,KP.cone(0.016,0.07,4),S,tm(s*0.055,-0.04,0.03,Math.PI-0.3,0,s*0.9),{s:-0.1});
    // сапоги с загнутым носком
    R.part('hips',hSph(0.08,6,4),PAL.night,tm(s*0.14,-0.58,0.22,0,0,0,1,0.6,1.5),{s:-0.2});R.part('hips',KP.cone(0.04,0.12,4),PAL.night,tm(s*0.14,-0.54,0.4,1.0,0,0),{s:-0.1});}
  return R;}
makeYaga=function(){const R=buildYaga(),o=castMake(R),B=o.rig;B.armL.rotation.x=-0.35;B.armR.rotation.x=-0.35;B.elbowL.rotation.x=-0.5;B.elbowR.rotation.x=-0.5;B.shoulderL.rotation.z=0.12;B.shoulderR.rotation.z=-0.12;
  return castReg(Object.assign(o,{head:B.head}),{hs:1.1});};

/* ---------- Кикимора: болотная, худенькая, волосы-тина до земли, светлые жёлтые глаза, платье из камыша, веретено в руке ---------- */
const P_KSK=cc(0xb8c89c,0x9aa88a,0x6a7a5a),P_KDR=cc(0x7a8a5a,0x55683e,0x364628);
function buildKiki(){const R=castRig(2.0,35),SK=P_KSK,HR=PAL.fir;
  R.bone('hips','root',0,0.7,0);R.bone('chest','hips',0,0.55,0);R.bone('neck','chest',0,0.3,0.02);R.bone('head','neck',0,0.2,-0.02);
  R.part('hips',KP.lathe([[0,-0.7],[0.5,-0.7],[0.44,-0.45],[0.3,-0.1],[0.2,0.12],[0,0.14]],9),P_KDR,null,{noise:0.02});
  for(let i=0;i<16;i++){const a=i/16*Math.PI*2;R.part('hips',KP.cone(0.06,0.34,3),i%2?P_KDR:PAL.moss,tm(Math.sin(a)*0.46,-0.6,Math.cos(a)*0.46,Math.PI+Math.cos(a)*0.15,0,-Math.sin(a)*0.15),{kN:0.1});}   // рваный подол-камыш
  for(let i=0;i<6;i++)R.part('hips',hIco(0.035),PAL.leaf,tm(Math.sin(i*1.9)*0.32,-0.45+i*0.07,Math.cos(i*1.9)*0.3),{s:0.3});   // ряска
  R.part('chest',KP.lathe([[0,-0.06],[0.2,-0.04],[0.21,0.1],[0.15,0.26],[0,0.28]],7),P_KDR);R.part('neck',KP.cyl(0.06,0.07,0.2,6),SK,tm(0,0,0));
  R.part('head',hSph(0.25,8,6),SK,tm(0,0,0,0,0,0,1,1.1,0.95));const ns=KP.cone(0.04,0.2,4);ns.rotateX(Math.PI/2+0.15);R.part('head',ns,SK,tm(0,-0.03,0.3),{s:0.1});
  R.part('head',new FIN.orig.Sphere(0.27,9,4,0,Math.PI*2,0,Math.PI*0.5),HR,tm(0,0.03,-0.02),{kN:0.3});
  for(let i=0;i<18;i++){const a=i/18*Math.PI*2;if(Math.cos(a)>0.55)continue;const l=0.9+((i*7)%5)*0.12;R.part('head',KP.cone(0.05,l,3),i%3?HR:PAL.moss,tm(Math.sin(a)*0.22,0.08-l/2,Math.cos(a)*0.2-0.02,Math.PI+Math.cos(a)*0.12,0,-Math.sin(a)*0.1),{kN:0.1,noise:0.01});}
  for(let i=0;i<4;i++)R.part('head',KP.cone(0.045,0.3,3),HR,tm((i-1.5)*0.1,0.12,0.2,Math.PI+0.9,0,(i-1.5)*0.2),{kN:0.2});   // чёлка
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.1,0.04,0.22,0.08,cc(0xfff8c0,0xffe060,0xc8a020),{lid:SK});hBrow(R,n,s*0.1,0.13,0.22,0.08,PAL.fir,s*0.3);
    R.use('g');R.part('eye'+n,hIco(0.035),cc(0xfff8b0,0xffe880,0xe0c050),tm(0,0,0.06));R.use('b');}
  hMouth(R,0,-0.13,0.22,0.03);
  for(const[s,n]of[[1,'L'],[-1,'R']]){cArm(R,n,'chest',[s*0.21,0.2,0.02],0.34,0.3,0.05,0.04,SK);R.part('hand'+n,hSph(0.05,6,4),SK);for(let j=0;j<3;j++)R.part('hand'+n,KP.cone(0.014,0.1,4),SK,tm((j-1)*0.02,-0.08,0.02,Math.PI+0.2,0,0));}
  // веретено: кость от корня в той же точке, что у прототипа
  R.bone('spindle','handL',0,-0.06,0.05);R.part('spindle',KP.cone(0.06,0.35,6),PAL.plank,tm(0,0.17,0));R.part('spindle',KP.cone(0.06,0.35,6),PAL.plank,tm(0,-0.17,0,Math.PI,0,0));
  R.part('spindle',KP.cyl(0.075,0.075,0.1,7),cc(0xe8e0c8,0xd8c8a0,0xa89870),null,{s:0.1});
  return R;}
makeKikimora=function(){const R=buildKiki(),o=castMake(R),B=o.rig;B.armL.rotation.x=-0.55;B.elbowL.rotation.x=-0.9;B.shoulderL.rotation.z=0.55;B.armR.rotation.x=-0.2;B.shoulderR.rotation.z=-0.15;
  return castReg(Object.assign(o,{head:B.head,spindle:B.spindle,eyes:new THREE.MeshLambertMaterial({color:0xfff3a0,emissive:0xfff3a0,emissiveIntensity:0.8})}),{hs:1.2});};

/* ---------- Колобок: румяный, с корочкой и светлой макушкой, большие глаза, веснушки-крошки, улыбка ---------- */
const P_KOL=cc(0xffd878,0xf0b848,0xc07c28);
function buildKolobok(){const R=castRig(1.1,37);R.bone('ball','root',0,0.55,0);R.bone('head','ball',0,0,0);
  R.part('ball',hSph(0.55,10,8),P_KOL,null,{kN:0.5,kG:0.4});R.part('ball',new FIN.orig.Sphere(0.555,10,3,0,Math.PI*2,0,Math.PI*0.3),cc(0xfff0b8,0xffe090,0xe0b060),tm(0,0,0),{kN:0.3,s:0.2});
  for(let i=0;i<9;i++){const a=i*2.4,y=-0.1+(i%3)*0.1;R.part('ball',hIco(0.018),cc(0xc88a40,0xa86a28,0x7a4a18),tm(Math.sin(a)*0.5,y,Math.cos(a)*0.5*0.9+0.02),{kN:0});}
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.18,0.12,0.49,0.115,cc(0x8ad0ff,0x4a90d0,0x2a5a9a),{lid:P_KOL});hBrow(R,n,s*0.19,0.29,0.5,0.1,cc(0xc88a40,0x9a6428,0x6a4018),s*0.1);
    R.part('ball',hSph(0.09,6,4),cc(0xffb0a0,0xff8a78,0xd06050),tm(s*0.32,-0.04,0.4,0,0,0,1,0.7,0.5),{kN:0.1});}
  hMouth(R,0,-0.12,0.5,0.07);return R;}
makeKolobok=function(){const R=buildKolobok(),o=castMake(R),B=o.rig;const lids=['L','R'].map(n=>lidProxy(B['lid'+n],-0.5,0.2,-1.85,0.25));
  return castReg(Object.assign(o,{ball:B.ball,lids}),{hs:1.2});};

/* ---------- Кузьма-кузнец: барсук, коренастый, кожаный фартук, красный платок, молот в руке ---------- */
const P_BGR=cc(0xa8a8ae,0x7a7a82,0x4e4e56);
function buildKuzma(){const R=castRig(1.9,39),G_=P_BGR,W_=PAL.white,D=PAL.night;
  R.bone('hips','root',0,0.55,0);R.bone('chest','hips',0,0.5,0);R.bone('neck','chest',0,0.3,0.02);R.bone('head','neck',0,0.2,-0.02);
  R.part('hips',KP.lathe([[0,-0.1],[0.4,-0.08],[0.44,0.1],[0.42,0.3],[0,0.32]],9),G_);
  R.part('chest',KP.lathe([[0,-0.2],[0.44,-0.18],[0.46,0.02],[0.4,0.2],[0.26,0.3],[0,0.32]],9),G_);
  R.box('chest',0.62,0.9,0.07,cc(0xa0704a,0x7a4e30,0x4e3020),tm(0,-0.3,0.4,-0.08,0,0),{b:0.02});R.box('chest',0.2,0.14,0.02,cc(0xa0704a,0x7a4e30,0x4e3020),tm(0,-0.35,0.45,-0.08,0,0),{b:0.01,s:-0.2});
  for(const s of[-1,1])R.box('chest',0.05,0.4,0.03,cc(0x8a5a38,0x6a4028,0x4a2a18),tm(s*0.2,0.12,0.36,-0.4,0,0),{b:0});   // лямки фартука
  R.part('chest',KP.tor(0.24,0.05,4,12),PAL.red,tm(0,0.28,0.02,Math.PI/2+0.2,0,0),{kN:0.3});R.part('chest',KP.cone(0.08,0.16,4),PAL.red,tm(0.05,0.22,0.24,2.6,0,0.3),{s:-0.1});
  // голова барсука: белая, две чёрные полосы через глаза, чёрный нос
  R.part('head',hSph(0.3,8,6),W_,tm(0,0,0,0,0,0,1,0.95,1.05));R.part('neck',KP.cyl(0.18,0.22,0.24,7),G_,tm(0,0,0));const sn=KP.cone(0.13,0.24,6);sn.rotateX(Math.PI/2);R.part('head',sn,W_,tm(0,-0.06,0.28),{s:0.1});
  for(const s of[-1,1])R.part('head',hSph(0.11,6,5),D,tm(s*0.12,0.06,0.08,0.3,0,0,0.7,0.8,2.6),{s:0,kN:0.2});
  R.part('head',hIco(0.055),D,tm(0,-0.05,0.41),{s:-0.1});
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('ear'+n,'head',s*0.22,0.18,-0.05);R.part('ear'+n,hSph(0.07,6,4),G_,tm(0,0,0,0,0,0,1,1,0.5));
    hEye(R,n,s*0.12,0.05,0.27,0.065,cc(0xb88a5a,0x8a5a30,0x5a3818),{lid:D});hBrow(R,n,s*0.13,0.14,0.27,0.09,PAL.stone,s*0.15);}
  hMouth(R,0,-0.14,0.32,0.035);
  // рука с молотом (как у прототипа: плечо в точке 0.45, 1.1, 0.1) и вторая рука
  R.bone('arm','chest',0.45,0.05,0.1);R.part('arm',KP.cyl(0.1,0.09,0.32,6),G_,tm(0,-0.16,0));R.part('arm',KP.cyl(0.09,0.08,0.28,6),G_,tm(0,-0.4,0.05));R.part('arm',hSph(0.1,6,4),G_,tm(0,-0.55,0.1));
  R.part('arm',KP.cyl(0.03,0.03,0.6,5),PAL.log,tm(0,-0.55,0.35,Math.PI/2,0,0));R.box('arm',0.2,0.16,0.16,PAL.iron,tm(0,-0.55,0.62),{b:0.03});
  cArm(R,'R','chest',[-0.45,0.05,0.05],0.3,0.28,0.1,0.09,G_);R.part('handR',hSph(0.1,6,4),G_);
  for(const s of[-1,1]){R.part('hips',KP.cyl(0.11,0.12,0.4,6),cc(0x6a6a74,0x4a4a54,0x2e2e36),tm(s*0.18,-0.35,0));R.box('hips',0.2,0.12,0.3,PAL.night,tm(s*0.18,-0.5,0.05),{s:0.1});}
  return R;}
makeKuzma=function(){const R=buildKuzma(),o=castMake(R),B=o.rig;return castReg(Object.assign(o,{head:B.head,arm:B.arm}),{hs:1.3});};

/* ---------- Леший: живое дерево-старик — кора с мхом, борода-мох, ветви-рога с листьями, руки-ветви, пальцы-сучки, светлые зелёные глаза ---------- */
function buildLeshy(){const R=castRig(4.4,41),BK=PAL.bark,MS=PAL.moss;
  R.bone('hips','root',0,1.2,0);R.bone('chest','hips',0,1.5,0);R.bone('neck','chest',0,0.6,0);R.bone('head','neck',0,0.3,0);
  R.part('hips',KP.lathe([[0,-1.2],[1.1,-1.2],[1.0,-0.95],[0.85,-0.4],[0.75,0.3],[0.7,0.6],[0,0.62]],10),BK,null,{noise:0.04});
  for(let i=0;i<5;i++){const a=i/5*Math.PI*2+0.3;R.part('hips',KP.cone(0.28,0.7,4),BK,tm(Math.sin(a)*0.95,-1.05,Math.cos(a)*0.95,0,a,Math.PI/2-0.2,1,1,0.7),{noise:0.02});}   // корни
  R.part('chest',KP.lathe([[0,-0.9],[0.72,-0.9],[0.7,-0.3],[0.62,0.2],[0.5,0.5],[0,0.6]],10),BK,null,{noise:0.03});
  for(let i=0;i<7;i++){const a=i*1.7;R.part(i<4?'hips':'chest',hSph(0.22,6,4),MS,tm(Math.sin(a)*0.7,-0.2+i*0.12-(i<4?0:0.6),Math.cos(a)*0.66,0,0,0,1.3,0.6,0.7),{noise:0.02});}   // мох
  for(let i=0;i<3;i++)R.part('chest',hSph(0.07,6,4),PAL.bark,tm(-0.3+i*0.25,-0.4+i*0.2,0.64,0,0,0,1,1.3,0.5),{s:-0.4});   // сучки-дупла
  R.part('chest',KP.cyl(0.03,0.035,0.12,5),PAL.cream,tm(0.5,0.45,0.2));R.part('chest',hSph(0.1,6,3),PAL.mush,tm(0.5,0.52,0.2,0,0,0,1,0.55,1));   // грибок на плече
  // голова-пень
  R.part('head',hSph(0.62,9,7),BK,tm(0,0,0,0,0,0,1,1.05,0.95),{noise:0.03});R.part('head',KP.cyl(0.55,0.6,0.2,9),BK,tm(0,0.55,0),{noise:0.02});
  R.part('head',KP.cyl(0.5,0.5,0.02,9),PAL.plank,tm(0,0.66,0),{s:0.2});
  const bd=KP.cone(0.6,1.5,8);bd.rotateX(Math.PI);R.part('head',bd,MS,tm(0,-0.8,0.3),{noise:0.05});for(const s of[-1,1])R.part('head',KP.cone(0.2,0.9,5),MS,tm(s*0.35,-0.7,0.35,Math.PI+0.2,0,s*0.25),{noise:0.03});
  R.part('head',KP.cone(0.1,0.3,5),BK,tm(0,-0.05,0.62,Math.PI/2+0.3,0,0),{s:0.1});   // нос-сучок
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.23,0.12,0.54,0.135,cc(0xf0ffa0,0xc8f060,0x8ab030),{lid:BK});hBrow(R,n,s*0.24,0.32,0.54,0.22,MS,s*0.2);
    R.use('e');R.part('eye'+n,hIco(0.065),cc(0xf0ffa0,0xd8ff6a,0xa8d040),tm(0,0,0.08));R.use('b');
    // ветви-рога с листочками
    R.part('head',KP.cone(0.09,1.5,5),BK,tm(s*0.5,0.95,0,0,0,-s*0.5),{noise:0.02});R.part('head',KP.cone(0.06,0.8,5),BK,tm(s*0.85,1.15,0,0,0,-s*1.1));
    for(let j=0;j<3;j++)R.part('head',hIco(0.14),PAL.leaf,tm(s*(0.7+j*0.22),1.45+j*0.12,(j-1)*0.1,j,j,0,1,0.6,1),{s:0.1});}
  hMouth(R,0,-0.3,0.55,0.07);
  // руки-ветви: плечо (кость sh) в точке ±0.75, 2.9 и кисть на конце руки — как у прототипа
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('sh'+n,'chest',s*0.75,0.2,0);R.part('sh'+n,KP.cyl(0.14,0.11,2.2,6),BK,tm(0,-1.1,0.2,0.18,0,0),{noise:0.02});R.part('sh'+n,hSph(0.2,6,4),MS,tm(0,-0.1,0.05,0,0,0,1.2,0.7,1));
    R.bone('hand'+n,'sh'+n,0,-2.2,0.35);for(let k=0;k<3;k++)R.part('hand'+n,KP.cone(0.08,0.8,5),BK,tm((k-1)*0.18,-0.3,0.1,0.4,0,(k-1)*0.2));R.part('hand'+n,hSph(0.16,6,4),BK,tm(0,0,0.05));}
  return R;}
makeLeshy=function(scale){const R=buildLeshy();const eye=new THREE.MeshLambertMaterial({vertexColors:true,skinning:true,emissive:0xc8ff40,emissiveIntensity:1.3});
  const o=castMake(R,{e:eye}),B=o.rig;o.g.scale.setScalar(scale||1.3);B.shL.rotation.z=0.3;B.shR.rotation.z=-0.3;const hands=[['L',1],['R',-1]].map(([n,s])=>({sh:bvis(B['sh'+n]),hand:B['hand'+n],s}));
  return castReg(Object.assign(o,{head:B.head,hands,eye}),{hs:3});};

/* ---------- Кощей: очень высокий и тощий, чёрно-лиловый кафтан с золотом, острая корона, узкое лицо, светящиеся зелёные глаза, связка ключей ---------- */
const P_KOS=cc(0x3a2e4a,0x221a2e,0x100c16),P_KSS=cc(0xe0dcc4,0xc8c0a4,0x8e8670);
function buildKoschei(){const R=castRig(3.9,43),KF=P_KOS,SK=P_KSS,GD=PAL.gold,TR=cc(0x6a4e8a,0x4a346a,0x2a1c40);
  R.bone('hips','root',0,1.4,0);R.bone('chest','hips',0,1.4,0);R.bone('neck','chest',0,0.6,0);R.bone('head','neck',0,0.25,0);
  R.part('hips',KP.lathe([[0,-1.4],[0.66,-1.4],[0.6,-1.0],[0.44,-0.3],[0.3,0.4],[0.24,0.9],[0,0.92]],10),KF);
  R.part('hips',KP.tor(0.64,0.04,3,16),GD,tm(0,-1.33,0,Math.PI/2,0,0),{kN:0.3});R.box('hips',0.08,2.2,0.04,GD,tm(0,-0.3,0.44,-0.2,0,0),{b:0,s:0.1});
  for(let i=0;i<5;i++)R.box('hips',0.22,0.05,0.07,TR,tm(0,-0.5+i*0.3,0.45-i*0.035,-0.2,0,0),{b:0.01});
  R.part('hips',KP.tor(0.3,0.04,3,14),GD,tm(0,0.45,0,Math.PI/2,0,0),{kN:0.3});   // пояс
  // связка ключей на поясе
  R.part('hips',KP.tor(0.08,0.015,3,10),PAL.iron,tm(-0.28,0.3,0.2,0,0.6,0),{s:0.1});for(let i=0;i<4;i++){R.box('hips',0.03,0.2,0.02,PAL.night,tm(-0.3+(i-1.5)*0.05,0.16,0.24,0,0.6,(i-1.5)*0.2),{b:0});}
  R.part('chest',KP.lathe([[0,-0.5],[0.26,-0.48],[0.3,-0.1],[0.34,0.2],[0.26,0.45],[0,0.5]],9),KF);
  R.part('chest',KP.cone(0.32,0.5,8,1),KF,tm(0,0.48,-0.08,Math.PI,0,0,1,1,0.7),{s:-0.2});   // высокий воротник
  R.part('head',hSph(0.25,8,7),SK,tm(0,0,0,0,0,0,0.82,1.28,0.88));const ns=KP.cone(0.045,0.24,4);ns.rotateX(Math.PI/2+0.25);R.part('head',ns,SK,tm(0,-0.02,0.24),{s:0.1});
  R.part('head',KP.cone(0.1,0.22,5),SK,tm(0,-0.32,0.06,Math.PI+0.2,0,0),{s:0});for(const s of[-1,1])R.part('head',hSph(0.06,5,4),cc(0xb0a890,0x969076,0x6a6452),tm(s*0.13,-0.1,0.13,0,0,0,0.6,1.2,0.6),{s:-0.3});   // впалые щёки
  for(const s of[-1,1])R.part('head',KP.cone(0.018,0.3,3),PAL.stone,tm(s*0.06,-0.14,0.2,Math.PI/2+1.1,0,s*0.5),{s:0.2});   // тонкие усы
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.085,0.06,0.2,0.062,cc(0xd0ffd8,0x7aff9a,0x30b050),{lid:SK});hBrow(R,n,s*0.09,0.15,0.2,0.1,PAL.night,-s*0.35);
    R.use('g');R.part('eye'+n,hIco(0.03),cc(0xc8ffd0,0x8affa8,0x40c060),tm(0,0,0.045));R.use('b');}
  hMouth(R,0,-0.18,0.17,0.035);
  // корона: обруч и семь зубцов
  R.bone('crown','head',0,0.3,0);R.part('crown',KP.tor(0.2,0.035,4,14),GD,tm(0,0,0,Math.PI/2,0,0),{kN:0.3,s:0.2});for(let i=0;i<7;i++){const a=i/7*Math.PI*2;R.part('crown',KP.cone(0.04,0.24,4),GD,tm(Math.cos(a)*0.2,0.11,Math.sin(a)*0.2),{s:0.25});}
  R.part('crown',hIco(0.035),PAL.red,tm(0,0.02,0.21),{s:0.3});
  // правая рука (кость armR в точке 0.3, 3.1 и кисть через 1,2 м вниз — как у прототипа) и левая
  R.bone('armR','chest',0.3,0.3,0);R.part('armR',KP.cyl(0.075,0.065,0.62,6),KF,tm(0,-0.3,0));R.part('armR',KP.cyl(0.065,0.055,0.6,6),KF,tm(0,-0.88,0));R.part('armR',KP.tor(0.07,0.02,3,8),GD,tm(0,-1.12,0,Math.PI/2,0,0),{s:0.2});
  R.bone('hand','armR',0,-1.2,0);R.part('hand',hSph(0.075,6,4),SK);for(let j=0;j<4;j++)R.part('hand',KP.cone(0.016,0.16,4),SK,tm((j-1.5)*0.03,-0.1,0.02,Math.PI+0.15,0,(j-1.5)*0.1));
  R.part('hand',KP.tor(0.022,0.009,3,8),GD,tm(0.02,-0.06,0.02,Math.PI/2,0,0),{s:0.3});R.part('hand',hIco(0.02),cc(0xc02050,0x901038,0x600020),tm(0.02,-0.04,0.045),{s:0.3});
  R.bone('armL2','chest',-0.3,0.3,0);R.part('armL2',KP.cyl(0.075,0.06,1.15,6),KF,tm(0,-0.58,0));R.part('armL2',hSph(0.075,6,4),SK,tm(0,-1.2,0));
  return R;}
makeKoschei=function(){const R=buildKoschei(),o=castMake(R),B=o.rig;B.armL2.rotation.z=-0.08;const ring=new THREE.Object3D();ring.position.set(0.02,-0.06,0.02);B.hand.add(ring);
  return castReg(Object.assign(o,{head:B.head,armR:B.armR,hand:B.hand,ring}),{hs:2.6});};

/* ---------- Тишка: бельчонок-малыш — огромный пушистый хвост завитком, кисточки на ушах, большие глаза ---------- */
const P_TSH=cc(0xe8a060,0xc9783a,0x8e4e20);
function buildTishka(){const R=castRig(0.7,45),C=P_TSH,CR=PAL.cream;
  R.bone('hips','root',0,0.24,0);R.bone('head','hips',0,0.26,0.02);
  R.part('hips',hSph(0.2,7,5),C,tm(0,0,0,0,0,0,1,1.15,0.95));R.part('hips',hSph(0.13,6,4),CR,tm(0,-0.02,0.1,0,0,0,1,1.2,0.6),{s:0.2});
  for(const s of[-1,1]){R.part('hips',hSph(0.06,5,4),C,tm(s*0.1,-0.18,0.1,0,0,0,1,0.6,1.4));R.part('hips',hSph(0.045,5,4),CR,tm(s*0.13,0.02,0.15,0,0,0,1,1,1),{s:0.1});}
  R.part('head',hSph(0.16,8,6),C,tm(0,0,0,0,0,0,1.05,0.95,1));R.part('head',hSph(0.08,6,4),CR,tm(0,-0.04,0.12,0,0,0,1.2,0.8,0.8),{s:0.2});R.part('head',hIco(0.022),PAL.night,tm(0,-0.015,0.195));
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('ear'+n,'head',s*0.08,0.14,-0.01);R.part('ear'+n,KP.cone(0.045,0.13,4),C,tm(0,0.05,0,0,Math.PI/4,-s*0.25,1,1,0.6));R.part('ear'+n,KP.cone(0.02,0.08,3),P_TSH,tm(0,0.14,0,0,0,-s*0.2),{s:-0.3});
    hEye(R,n,s*0.065,0.03,0.14,0.045,null,{lid:C});hBrow(R,n,s*0.066,0.085,0.145,0.035,cc(0xa86030,0x8a4a20,0x5a3010),s*0.1);R.part('head',hIco(0.022),PAL.pink,tm(s*0.1,-0.05,0.1,0,0,0,1,0.6,0.5),{s:0.2});}
  hMouth(R,0,-0.07,0.16,0.018);
  // хвост: кость как у прототипа (0, 0.2, −0.18 от тела), пять пушистых клубов вверх и завиток
  R.bone('tail','root',0,0.2,-0.18);[[0,0,0,0.1],[0,0.14,-0.1,0.13],[0,0.32,-0.12,0.15],[0,0.48,-0.04,0.13],[0,0.56,0.08,0.1]].forEach(([x,y,z,r],i)=>R.part('tail',KP.ico(r,0),i===4?cc(0xf6d0a0,0xe8b078,0xb87a40):cc(0xd88a48,0xb86a30,0x7a4418),tm(x,y,z,i,i*0.5,0),{noise:0.01,kN:0.35}));
  return R;}
makeTishka=function(){const R=buildTishka(),o=castMake(R),B=o.rig;return castReg(Object.assign(o,{head:B.head,tail:B.tail}),{hs:0.5});};
FIN.castBuild={kot:()=>makeKot(),yaga:()=>makeYaga(),kiki:()=>makeKikimora(),kolobok:()=>makeKolobok(),kuzma:()=>makeKuzma(),leshy:()=>makeLeshy(),koschei:()=>makeKoschei(),tishka:()=>makeTishka()};
