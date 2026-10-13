/* ============================== РЕЛИЗ · БОГАТЫРСКИЙ ВЫХОД: СИЛУ ВИДНО НА КАЖДОМ ГЕРОЕ ============================== */
// Механика — прототип (06_damage_clew.js: bogatyrExit / updatePowers и крючки bogatyrFx, bogatyrSwing, bogatyrBlock, bogatyrEnd). Здесь — подача.
// Было: золотой обруч толщиной 6 см у ног, одинаковый у всех четырёх (крутился вокруг своей оси — вращения не видно), баннер и шкала 9×32 px.
//  • Предвкушение: шкала от 70% дрожит (near), на герое — голубые искорки, каждая искра звенит выше; искра, что наполнила, — вихрь звёзд.
//  • Включение: хит-стоп 0,3 с, наезд камеры, тряска, столб света над каждым героем игрока в цвете героя, кольцо-волна (мороки
//    отшатываются — прототип), возглас героя. «Богатырская дружина» (выходы двух игроков разом) — второй горн и общее кольцо.
//  • Пока идёт: у ног — вращающийся круг-оберег цвета героя, над головой — знак силы (меч, лапа, глаз, капля). У каждого своя отметка:
//    Прошка — светящийся клинок в руке, авто-удар — своя золотая широкая дуга и «Кладенец!»; Потап — крупнее на 18%, шаги пылят,
//    «Не берёт!» со звездой, скорлупа слетает с тяжёлым звоном; Пелагея — венец и тихая рябь, мороки голубеют (свечение,
//    песочные часы над головой, иней следом), их сигналы звучат с низким эхом; Йоша — фонтан, капли летят к каждому герою.
//  • HUD: портреты в рамке цвета силы и значок силы с кольцом-таймером; у второго игрока — строка о том, что сделал выход друга;
//    лепестки вспыхивают от Йоши, запасной лепесток — четвёртый, голубой.
//  • Конец: последние 2 с знак и круг мигают, потом осыпаются искрами; нисходящий звук и «Сила ушла»; Потап сдувается до своего роста.
const BG={col:{proshka:0xff8a2a,potap:0xffc23a,pelageya:0xc08cff,yosha:0x4fe0d0},css:{proshka:'#ff8a2a',potap:'#ffc23a',pelageya:'#c08cff',yosha:'#4fe0d0'},
  shout:{proshka:'Кладенец, руби!',potap:'Ну-ка, разойдись!',pelageya:'Вижу вас насквозь!',yosha:'Водица живая!'},
  tex:{},fx:[],fW:null,foes:new Map(),px:0,pv:0,last:0,nearT:[0,0],note:[{t:0},{t:0}],flash:[0,0],kladT:-9,potapHit:false};
FIN.bogatyr=BG;BG.dbg={hurt:(h,e)=>damageHero(h,{kind:'enemy',ref:e})};   // для бота tfin_bogatyr
const bgFX=(n,...a)=>{try{if(typeof FX!=='undefined'&&FX[n])FX[n](...a);}catch(e){}};
const bgNoRay=o=>{o.raycast=()=>{};o.userData.noBatch=true;o.userData.occEx=true;return o;};
const bgHead=(h,k)=>h.pos.clone().add(new V3(0,heroHeight(h)*(h._bg?h._bg.sc:1)+(k||0),0));
// ---------- текстуры: круг-оберег, свечение, луч, песочные часы, знаки сил ----------
function bgTex(kind){if(BG.tex[kind])return BG.tex[kind];const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),P=Math.PI;
  if(kind==='rune'){x.strokeStyle='#fff';x.lineWidth=7;x.beginPath();x.arc(64,64,55,0,P*2);x.stroke();x.lineWidth=3;x.beginPath();x.arc(64,64,39,0,P*2);x.stroke();
    for(let i=0;i<8;i++){const a=i/8*P*2;x.save();x.translate(64+Math.cos(a)*47,64+Math.sin(a)*47);x.rotate(a);x.fillStyle='#fff';x.fillRect(-3,-10,6,20);x.restore();}
    for(let i=0;i<8;i++){const a=(i+0.5)/8*P*2;x.beginPath();x.arc(64+Math.cos(a)*47,64+Math.sin(a)*47,3.5,0,P*2);x.fillStyle='#fff';x.fill();}}
  else if(kind==='glow'){const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.35,'rgba(255,255,255,.5)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,128);}
  else if(kind==='beam'){const g=x.createLinearGradient(0,0,0,128);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(0.55,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,1)');x.fillStyle=g;x.fillRect(0,0,128,128);}
  else if(kind==='clock'){x.fillStyle='rgba(16,30,60,.7)';x.beginPath();x.arc(64,64,56,0,P*2);x.fill();x.strokeStyle='#bfe6ff';x.lineWidth=6;x.stroke();
    x.fillStyle='#e8f6ff';x.fillRect(38,26,52,8);x.fillRect(38,94,52,8);x.beginPath();x.moveTo(44,34);x.lineTo(84,34);x.lineTo(68,64);x.lineTo(84,94);x.lineTo(44,94);x.lineTo(60,64);x.closePath();x.globalAlpha=0.35;x.fill();
    x.globalAlpha=1;x.fillStyle='#8fd0ff';x.beginPath();x.moveTo(52,40);x.lineTo(76,40);x.lineTo(64,58);x.fill();x.beginPath();x.moveTo(64,74);x.lineTo(80,92);x.lineTo(48,92);x.fill();}
  else{const col=BG.css[kind]||'#ffd76a';x.fillStyle='rgba(22,16,34,.82)';x.beginPath();x.arc(64,64,55,0,P*2);x.fill();x.strokeStyle=col;x.lineWidth=9;x.stroke();x.strokeStyle='#fff';x.lineWidth=3;x.beginPath();x.arc(64,64,59,0,P*2);x.stroke();
    x.fillStyle='#fff';x.beginPath();
    if(kind==='proshka'){x.moveTo(64,16);x.lineTo(73,30);x.lineTo(73,78);x.lineTo(55,78);x.lineTo(55,30);x.closePath();x.fill();x.fillStyle=col;x.fillRect(38,78,52,10);x.fillRect(59,88,10,18);x.beginPath();x.arc(64,109,7,0,P*2);x.fill();}
    else if(kind==='potap'){x.ellipse(64,82,23,19,0,0,P*2);x.fill();for(const[a,b]of[[36,56],[52,38],[76,38],[92,56]]){x.beginPath();x.arc(a,b,10,0,P*2);x.fill();}}
    else if(kind==='pelageya'){x.moveTo(16,64);x.quadraticCurveTo(64,14,112,64);x.quadraticCurveTo(64,114,16,64);x.fill();x.fillStyle=col;x.beginPath();x.arc(64,64,18,0,P*2);x.fill();x.fillStyle='#1a1028';x.beginPath();x.arc(64,64,8,0,P*2);x.fill();}
    else{x.moveTo(64,16);x.bezierCurveTo(72,40,98,58,98,80);x.arc(64,80,34,0,P,false);x.bezierCurveTo(30,58,56,40,64,16);x.fill();x.fillStyle=col;x.beginPath();x.arc(52,84,8,0,P*2);x.fill();}}
  const t=new THREE.CanvasTexture(c);BG.tex[kind]=t;return t;}
// круги и кольца — обычное смешивание (на светлой траве сложение выжигает цвет в белое), столб и свечения — сложение
const bgAdd=(col,map,o)=>new THREE.MeshBasicMaterial(Object.assign({color:col,map,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,toneMapped:false},o||{}));
const bgSpr=(map,col,s,o)=>{const m=bgNoRay(new THREE.Sprite(new THREE.SpriteMaterial(Object.assign({map,color:col||0xffffff,transparent:true,depthWrite:false,depthTest:false,fog:false,toneMapped:false},o||{}))));m.scale.setScalar(s||1);m.renderOrder=14;return m;};
const BG_DEC=new THREE.PlaneGeometry(2.5,2.5);BG_DEC.rotateX(-Math.PI/2);
const BG_BEAM=new THREE.CylinderGeometry(0.75,0.75,10,20,1,true);BG_BEAM.translate(0,5,0);
const BG_RING=new THREE.TorusGeometry(1,0.06,6,40);BG_RING.rotateX(Math.PI/2);
const BG_DROP=new THREE.IcosahedronGeometry(0.14,0);
// ---------- одноразовые эффекты мира: столб, кольцо-волна, капля Йоши ----------
function bgFxList(){if(BG.fW!==W){for(const f of BG.fx)if(f.m.parent)f.m.parent.remove(f.m);BG.fx.length=0;for(const o of BG.foes.values())if(o.g.parent)o.g.parent.remove(o.g);BG.foes.clear();BG.fW=W;}return BG.fx;}
function bgBeam(pos,col,life){if(!W||!W.group)return;const m=bgNoRay(new THREE.Mesh(BG_BEAM,bgAdd(col,bgTex('beam'),{opacity:0,blending:THREE.AdditiveBlending})));m.position.copy(pos);m.renderOrder=13;m.frustumCulled=false;W.group.add(m);bgFxList().push({kind:'beam',m,t:0,life:life||1.3});}
function bgRing(pos,col,r,life,th){if(!W||!W.group)return;const m=bgNoRay(new THREE.Mesh(BG_RING,bgAdd(col,null,{opacity:0.9})));m.position.copy(pos);m.position.y+=0.2;m.renderOrder=13;W.group.add(m);bgFxList().push({kind:'ring',m,t:0,life:life||0.6,r:r||5,th:th||1});}
function bgDrop(from,to,delay){if(!W||!W.group)return;const m=bgNoRay(new THREE.Mesh(BG_DROP,new THREE.MeshBasicMaterial({color:0x9ff0ff,fog:false,toneMapped:false})));m.position.copy(from);m.visible=false;W.group.add(m);bgFxList().push({kind:'drop',m,t:-(delay||0),life:0.7,a:from.clone(),h:to});}
function bgFxTick(dt){const L=bgFxList();for(let i=L.length-1;i>=0;i--){const f=L[i];f.t+=dt;const k=f.t/f.life;let done=k>=1;
    if(f.kind==='beam'){f.m.scale.set(1-0.35*Math.max(0,k),Math.min(1,f.t/0.15),1-0.35*Math.max(0,k));f.m.material.opacity=0.95*Math.min(1,f.t/0.1)*(1-k*k);}
    else if(f.kind==='ring'){const q=1-Math.pow(1-Math.min(1,k),3);f.m.scale.set(0.5+(f.r-0.5)*q,f.th,0.5+(f.r-0.5)*q);f.m.material.opacity=0.9*(1-k);}
    else if(f.kind==='drop'){if(f.t<0)continue;f.m.visible=true;const b=bgHead(f.h,-0.3),q=Math.min(1,k);f.m.position.lerpVectors(f.a,b,q);f.m.position.y+=Math.sin(Math.PI*q)*2.2;f.m.rotation.y+=dt*8;
      if(done){bgFX('drops',b.clone(),9);bgRing(f.h.pos.clone(),0x7ad8ff,1.6,0.45,0.6);}}
    if(done){if(f.m.parent)f.m.parent.remove(f.m);if(f.m.material)f.m.material.dispose();L.splice(i,1);}}}
// ---------- знаки силы на герое (живут в группе героя: идут за ним, растут с Потапом) ----------
function bgMake(h){const c=BG.col[h.kind]||0xffd76a,S={age:0,sc:1,out:false,outT:0,dur:h.power.t,dust:0,rip:0.4,drp:0,spk:0};
  S.dec=bgNoRay(new THREE.Mesh(BG_DEC,bgAdd(c,bgTex('rune'),{opacity:0})));S.dec.position.y=0.07;S.dec.renderOrder=12;h.g.add(S.dec);
  S.emb=bgSpr(bgTex(h.kind),0xffffff,0.8);h.g.add(S.emb);
  if(h.kind==='proshka'&&h.rig&&h.rig.handR){   // светящийся клинок в руке: сердцевина и ореол
    const b=new THREE.Group(),core=bgNoRay(new THREE.Mesh(new THREE.BoxGeometry(0.05,0.62,0.018),new THREE.MeshBasicMaterial({color:0xfff6d0,fog:false,toneMapped:false,transparent:true})));
    core.position.y=-0.36;const glow=bgNoRay(new THREE.Mesh(new THREE.BoxGeometry(0.14,0.72,0.05),bgAdd(0xffc040,null,{opacity:0.45,blending:THREE.AdditiveBlending})));glow.position.y=-0.36;
    const tip=new THREE.Object3D();tip.position.y=-0.68;b.add(core,glow,tip);b.rotation.x=-1.15;h.rig.handR.add(b);S.blade=b;S.bladeTip=tip;S.bladeMats=[core.material,glow.material];}
  if(h.kind==='pelageya'){const g=new THREE.Group(),m=bgAdd(0xffe08a,null,{opacity:0.95});
    const t=bgNoRay(new THREE.Mesh(new THREE.TorusGeometry(0.2,0.035,5,20),m));t.rotation.x=Math.PI/2;g.add(t);
    for(let i=0;i<5;i++){const a=i/5*Math.PI*2,p=bgNoRay(new THREE.Mesh(new THREE.ConeGeometry(0.045,0.16,4),m));p.position.set(Math.cos(a)*0.2,0.08,Math.sin(a)*0.2);g.add(p);}
    g.position.y=heroHeight(h)+0.1;h.g.add(g);S.crown=g;S.crownMat=m;}
  h._bg=S;return S;}
function bgDropFrom(h){const S=h._bg;if(!S)return;for(const k of['dec','emb','crown'])if(S[k]&&S[k].parent)S[k].parent.remove(S[k]);if(S.blade&&S.blade.parent)S.blade.parent.remove(S.blade);
  if(S.sc!==1)h.g.scale.setScalar(1);h._bg=null;}
function bgHero(h,dt){const pw=!!(h.power&&h.power.t>0);let S=h._bg;
  if(pw&&(!S||S.out)){if(S)bgDropFrom(h);S=bgMake(h);}
  if(!S)return;
  if(!h.power){bgDropFrom(h);return;}   // уровень сменился (power=null) — без проводов, рост — как был
  S.age+=dt;const t=pw?h.power.t:0;if(pw&&t>S.dur)S.dur=t;   // «Дружина» добавляет 2 с
  const hide=!!G.cine||h.hidden||!h.g.visible;
  if(!pw&&!S.out){S.out=true;S.outT=0;if(!hide){const p=bgHead(h,1.45);bgFX('sparkle',p,12,BG.col[h.kind]);bgFX('stars',p,5,BG.col[h.kind]);}}
  const inA=Math.min(1,S.age/0.3),blink=pw&&t<2?(Math.floor(G.time*(t<1?14:8))%2?0.3:1):1,outA=S.out?Math.max(0,1-S.outT/0.35):1,a=inA*blink*outA;
  if(S.out)S.outT+=dt;
  S.dec.visible=!hide;S.dec.material.opacity=0.85*a;S.dec.rotation.y+=dt*1.7;S.dec.scale.setScalar(1+0.06*Math.sin(G.time*6));
  S.emb.visible=!hide&&a>0.02;S.emb.material.opacity=a;S.emb.position.y=heroHeight(h)+1.45+Math.sin(G.time*3)*0.08;S.emb.scale.setScalar(0.8*(1+0.45*Math.max(0,1-S.age/0.3))*(S.out?1+S.outT:1));
  if(S.blade){S.blade.visible=!hide&&a>0.02;S.bladeMats[0].opacity=a;S.bladeMats[1].opacity=0.45*a*(0.8+0.2*Math.sin(G.time*20));
    S.spk-=dt;if(pw&&!hide&&S.spk<=0&&(h.atkT>0||h.moving)){S.spk=h.atkT>0?0.03:0.12;const p=new V3();S.bladeTip.getWorldPosition(p);bgFX('sparkle',p,1,0xfff0b0);}}
  if(S.crown){S.crown.visible=!hide&&a>0.02;S.crownMat.opacity=0.95*a;S.crown.rotation.y+=dt*1.2;
    S.rip-=dt;if(pw&&!hide&&S.rip<=0){S.rip=1.1;bgRing(h.pos.clone(),0xc8a0ff,3.4,0.9,0.5);}}
  if(h.kind==='potap'){const want=pw?1.18:1;S.sc+=(want-S.sc)*(1-Math.exp(-7*dt));if(Math.abs(S.sc-want)<0.003)S.sc=want;h.g.scale.setScalar(S.sc);
    S.dust-=dt;if(pw&&!hide&&h.grounded&&Math.hypot(h.vel.x,h.vel.z)>2.5&&S.dust<=0){S.dust=0.32;bgFX('dust',h.pos.clone(),6,0xd8c8a8,1.2);if(h.active)shake(h.player,0.012,0.08);}}
  if(h.kind==='yosha'){S.drp-=dt;if(pw&&!hide&&S.drp<=0){S.drp=0.12;bgFX('drops',bgHead(h,0.1),2);}}
  if(S.out&&S.outT>0.4&&S.sc===1)bgDropFrom(h);}
{const _a=animHero;animHero=function(h,dt){_a(h,dt);if(h.aura)h.aura.visible=false;try{bgHero(h,dt);}catch(e){console.error('bogatyr',e);}};}
// ---------- включение ----------
function bgOnset(pi,mate){const p=players[pi];
  if(!G.cine){G.hitstop=Math.max(G.hitstop||0,0.3);BG.pv-=6*13;}
  shake(pi,0.06,0.4);
  for(const h of p.heroes){const c=BG.col[h.kind];bgBeam(h.pos.clone(),c,1.3);bgRing(h.pos.clone(),c,5,0.55,1.4);bgFX('stars',bgHead(h,0.3),8,c);bgFX('sparkle',bgHead(h,-0.4),10,c);
    if(h.kind==='yosha'){let d=0;for(const q of HEROES)if(!q.hidden&&q.g.visible){bgDrop(bgHead(h,0.2),q,d);d+=0.08;}}}
  // возглас: тот, кем играют, — вслух (с субтитром), второй — надписью над головой
  const a=active(pi),o=other(pi);try{bark(a,a.kind,BG.shout[a.kind],1.8);}catch(e){}floatText(bgHead(o,0.9),BG.shout[o.kind],(WHO[o.kind]||[0,'#fff'])[1]);
  // строка у друга: что ему дал или что значит этот выход
  const ks=p.heroes.map(h=>h.kind),parts=[];
  if(ks.includes('pelageya'))parts.push('Пелагея: мороки вдвое медленнее');if(ks.includes('yosha'))parts.push('Йоша: всем по лепестку');
  if(!parts.length)parts.push(p.heroes.map(h=>h.d.name).join(' и ')+' — богатырский выход!');
  bgNote(1-pi,parts.join(' · '),PCSS[pi]);
  if(ks.includes('yosha'))BG.flash=[1.2,1.2];
  if(mate){later(0.25,()=>SFX.horn());const b=active(1-pi);const mid=a.pos.clone().lerp(b.pos,0.5);bgRing(mid,0xffd76a,Math.max(6,hd(a.pos,b.pos)*0.6+3),0.8,1.6);
    for(const q of players[1-pi].heroes)if(q.power&&q.power.t>0)bgBeam(q.pos.clone(),0xffd76a,1.1);bgNote(pi,'Богатырская дружина! Каждому +2 с','#ffd76a');}}
{const _f=bogatyrFx;bogatyrFx=function(pi,mate){_f(pi,mate);try{bgOnset(pi,mate);}catch(e){console.error('bogatyr',e);}};}
// ---------- предвкушение: шкала от 70% ----------
{const _cs=collectSpark;collectSpark=function(s,h){const p=players[h.player],b0=p.blue;_cs(s,h);try{if(p.blue>b0&&p.blue>=0.69){
    tone(520+p.blue*700,0.16,'triangle',0.07);tone(1040+p.blue*1400,0.1,'sine',0.04,null,0.05);bgFX('sparkle',bgHead(h,0.2),6,0x9fd6ff);
    if(p.blue>=1){bgFX('stars',bgHead(h,0.4),10,0x9fd6ff);bgRing(h.pos.clone(),0x6ad0ff,2.2,0.4,0.8);}}}catch(e){console.error('bogatyr',e);}};}
// ---------- Кладенец: своя дуга (золотая, шире обычной) ----------
if(typeof SL_STYLE!=='undefined')SL_STYLE.kladenets={col:0xffd23a,core:0xffffff,edge:0x8a5a10,r0:0.3,r1:2.25,arc:3.4,n:3,lag:0.12,roll:0.42,off:0.0,rad:0.25,dur:0.26,lines:true,spark:0xfff0a0};
{const _s=bogatyrSwing;bogatyrSwing=function(h,e){_s(h,e);try{h._slA=h.atkT;   // обычная лента героя не рисуется — у Кладенца своя
    if(typeof slashFx==='function')slashFx({kind:'kladenets',pos:h.pos,face:h.face,d:h.d});tone(1320,0.12,'triangle',0.05);
    if(G.time-BG.kladT>1.2&&e&&e.pos){BG.kladT=G.time;floatText(e.pos.clone().add(new V3(0,(e.L?e.L.top*e.s:1.4)+0.9,0)),'Кладенец!','#ffe08a');}}catch(err){console.error('bogatyr',err);}};}
// ---------- Медвежья сила: «Не берёт!» со звездой, скорлупа слетает тяжело ----------
{const _b=bogatyrBlock;bogatyrBlock=function(h,src){const was=h.power&&h.power.blkT;_b(h,src);try{if(h.power&&h.power.blkT!==was){const p=bgHead(h,-0.3);
    if(typeof slImpact==='function')slImpact(p,BG.col.potap);bgFX('sparks',p,10,0xffd27a);tone(1560,0.18,'triangle',0.06);tone(196,0.22,'square',0.05);}}catch(e){console.error('bogatyr',e);}};}
{const _eh=enemyHit;enemyHit=function(e,h){BG.potapHit=!!(h&&h.kind==='potap'&&h.power&&h.power.t>0);try{return _eh.apply(this,arguments);}finally{BG.potapHit=false;}};}
{const _kp=knockPlate;knockPlate=function(e){const r=_kp.apply(this,arguments);if(BG.potapHit)try{const p=e.pos.clone().add(new V3(0,1,0));bgFX('sparks',p,14,0xffd27a);bgFX('stars',p,5);tone(110,0.3,'square',0.09,60);}catch(err){}return r;};}
// ---------- Вещий взор: мороки голубеют, над ними песочные часы, иней следом; сигналы — с низким эхом ----------
function bgFoes(dt){const on=G.slowFoes>0&&!G.cine;bgFxList();
  if(on)for(const e of W.enemies){if(!e.alive||e.state==='dying'||BG.foes.has(e)||!e.g)continue;const g=new THREE.Group();
    const glow=bgSpr(bgTex('glow'),0x6ab8ff,1,{opacity:0,blending:THREE.AdditiveBlending,depthTest:true});const clk=bgSpr(bgTex('clock'),0xffffff,0.7,{opacity:0});g.add(glow,clk);W.group.add(g);BG.foes.set(e,{g,glow,clk,a:0,fr:Math.random()*0.3});}
  for(const[e,o]of BG.foes){const live=e.alive&&e.state!=='dying'&&W.enemies.indexOf(e)>=0;o.a=Math.max(0,Math.min(1,o.a+(on&&live?dt*4:-dt*4)));
    if(o.a<=0&&!(on&&live)){if(o.g.parent)o.g.parent.remove(o.g);BG.foes.delete(e);continue;}
    const top=e.L?e.L.top*e.s:1.4,vis=e.g.visible!==false;o.g.visible=vis;o.g.position.copy(e.pos);
    o.glow.position.y=top*0.5;o.glow.scale.setScalar((e.r||0.6)*3.2+top*0.6);o.glow.material.opacity=0.55*o.a;
    o.clk.position.y=top+0.6+Math.sin(G.time*2+o.fr*20)*0.06;o.clk.material.opacity=o.a;o.clk.material.rotation=Math.sin(G.time*1.5+o.fr*10)*0.25;
    o.fr-=dt;if(on&&live&&vis&&o.fr<=0){o.fr=0.22;bgFX('sparkle',e.pos.clone().add(new V3(0,top*0.4,0)),1,0xbfe6ff);}}}
for(const n of['yellow','red']){const _o=SFX[n];if(typeof _o==='function')SFX[n]=function(){const r=_o.apply(this,arguments);if(G.slowFoes>0)tone(n==='red'?92:123,0.5,'sine',0.13,70,0.06);return r;};}
// ---------- конец силы игрока: нисходящий звук и «Сила ушла» ----------
{const _e=bogatyrEnd;bogatyrEnd=function(h){_e(h);try{const p=players[h.player];if(p.heroes.some(q=>q.power&&q.power.t>0))return;
    tone(660,0.55,'sine',0.08,220);tone(990,0.35,'triangle',0.04,330,0.05);if(!G.cine){const a=active(h.player);floatText(bgHead(a,0.7),'Сила ушла','#e8d8b0');}}catch(e){console.error('bogatyr',e);}};}
// ---------- HUD: рамки портретов, значок силы с кольцом-таймером, строка у друга, вспышка лепестков, запасной лепесток ----------
const BG_ICO={proshka:'<path d="M12 2l2 3v9h-4V5z"/><rect x="7" y="14" width="10" height="2.2"/><rect x="11" y="16" width="2" height="4"/>',
  potap:'<ellipse cx="12" cy="15" rx="5" ry="4.2"/><circle cx="6" cy="9.5" r="2.1"/><circle cx="9.6" cy="6" r="2.1"/><circle cx="14.4" cy="6" r="2.1"/><circle cx="18" cy="9.5" r="2.1"/>',
  pelageya:'<path d="M2 12q10-9 20 0q-10 9-20 0z"/><circle cx="12" cy="12" r="3.3" fill="#1a1028"/>',
  yosha:'<path d="M12 2q2 5 6 9a6.2 6.2 0 1 1-12 0q4-4 6-9z"/>'};
function bgNote(pi,text,col){const n=BG.note[pi];n.text=text;n.col=col;n.t=3.5;}
function bgHud(dt){for(const pi of[0,1]){const p=players[pi],E=hudEls[pi];if(!E||!E.el)continue;
    if(!E.bgNote||!E.el.contains(E.bgNote)){E.bgNote=document.createElement('div');E.bgNote.className='bgnote';E.el.appendChild(E.bgNote);
      const pe=E.el.querySelector('.petals');E.bgSpare=document.createElement('div');E.bgSpare.className='petal bgspare';if(pe)pe.appendChild(E.bgSpare);}
    const n=BG.note[pi];n.t-=dt;const nv=n.t>0&&!G.cine;if(E.bgNote._v!==nv||E.bgNote._t!==n.text){E.bgNote._v=nv;E.bgNote._t=n.text;E.bgNote.textContent=n.text||'';E.bgNote.style.borderColor=n.col||'';E.bgNote.classList.toggle('on',nv);}
    E.bgSpare.style.display=p.spare>0?'':'none';
    BG.flash[pi]=Math.max(0,BG.flash[pi]-dt);const fl=BG.flash[pi]>0;E.petals.forEach(el=>el.classList.toggle('bgflash',fl));
    const bl=bogatyrLeft(pi);E.blue.classList.toggle('near',bl<=0&&p.blue>=0.69&&p.blue<1);
    p.heroes.forEach((h,i)=>{const el=E.ports[i];if(!el)return;const S=h._bg,on=!!(h.power&&h.power.t>0);
      if(!el.bgIco){const d=document.createElement('span');d.className='bgico';el.appendChild(d);el.bgIco=d;}
      if(el.bgIco._k!==h.kind){el.bgIco._k=h.kind;el.bgIco.innerHTML='<svg viewBox="0 0 24 24">'+(BG_ICO[h.kind]||'')+'</svg>';}
      el.classList.toggle('bgpow',on);el.classList.toggle('bgend',on&&h.power.t<2);
      if(on){el.style.setProperty('--bgc',BG.css[h.kind]);el.style.setProperty('--bgk',Math.max(0,Math.min(1,h.power.t/((S&&S.dur)||h.power.t))).toFixed(3));}});}}
{const _u=updateUI;updateUI=function(dt){_u(dt);try{bgHud(dt);}catch(e){console.error('bogatyr',e);}};}
// ---------- кадр: эффекты мира, мороки, предвкушение; наезд камеры — пружина в реальном времени ----------
{const _s=step;step=function(dt){_s(dt);try{bgFxTick(dt);bgFoes(dt);
    for(const pi of[0,1]){const p=players[pi];BG.nearT[pi]-=dt;if(!G.cine&&p.blue>=0.69&&p.blue<1&&!bogatyrLeft(pi)&&BG.nearT[pi]<=0){BG.nearT[pi]=0.3;bgFX('sparkle',bgHead(active(pi),0.1),1,0x9fd6ff);}}}catch(e){console.error('bogatyr',e);}};}
{const _r=render;render=function(){const now=performance.now()/1000,dt=Math.min(0.05,Math.max(0,now-(BG.last||now)));BG.last=now;
  BG.pv+=(-190*BG.px-12*BG.pv)*dt;BG.px+=BG.pv*dt;if(Math.abs(BG.px)<0.01&&Math.abs(BG.pv)<0.05){BG.px=0;BG.pv=0;}
  const k=BG.px;if(!k||G.cine||!W){_r();return;}
  const had=Object.prototype.hasOwnProperty.call(W,'camFov'),f0=W.camFov,s0=SPLIT.fov;W.camFov=()=>(f0?f0():55)+k;SPLIT.fov=s0+k;
  try{_r();}finally{if(had)W.camFov=f0;else delete W.camFov;SPLIT.fov=s0;}};}
