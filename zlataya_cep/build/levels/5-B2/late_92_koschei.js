/* ============================== РЕЛИЗ final06 · 5-Б2 «КОЩЕЙ БЕССМЕРТНЫЙ И ЗЛАТАЯ ЦЕПЬ»: ФИНАЛЬНЫЙ БОЙ В ПЯТЬ ЭТАПОВ ============================== */
// Уровень 5-Б2 собран заново (build5B2 заменён присваиванием). Сюжет прежний: героев не бьют насмерть и сами не убивают — Кощея
// не победить силой, у него сбивают «спесь» (угольки над головой, как у всех мороков) и связывают золотой нитью сказа.
// Находки souls-like, перенесённые в кооператив для детей 7–9 лет:
//   · стойка вместо здоровья (Sekiro): отбив в последний миг, удар со спины, возвращённый шар гасят угольки; погасли все — ПРОБОЙ;
//   · пять фаз с роликом и новым набором приёмов (Elden Ring, Dark Souls): купол и свечи → ключи и искорка → полёт и буря →
//     меч и прыжок → игла; в последней фазе — приёмы всех прежних («отчаяние», как у финальных боссов);
//   · ясные сигналы (жёлтый — щит, красный — кувырок, синий/шар — отбить, красный круг на земле — уйти), задержанный замах, серии;
//   · окна для наказания после серии и прыжка, «кого выбрал Кощей» — выбранный держит щит, второй заходит со спины;
//   · контрольная точка — начало этапа (упали оба — этап заново, прежние не повторяются), после неудач этап чуть легче;
//   · кооператив в каждой фазе: погасить свечи вместе, перекидывать искорку отбивами, отпирать запертого друга, отбивать шар
//     друг другу и в небо, отвлекать и заходить со спины, передавать иглу, заслонять Прошку у наковальни, щиты в такт.
// Новые помощники Кощея: чёрная свеча, летучий ключ-замок, чёрный ворон, костяной щитник (и прежние цепи из земли — теперь
// уходят под землю и выходят в другом месте, никогда не бьют невидимыми). Одиночный режим: всё проходится одним героем
// (ключ отпирается сам, свечи горят дольше, шар возвращается одним отбивом, игла идёт за тем, кем управляешь).
// Подсказок в бою нет: правила каждой стадии показывает обучающая катсцена после основного ролика (p6b_lesson).
const K5={auto:true,st:0,fight:false,e:null,fails:[0,0,0,0,0,0],seen:{},spark:null,locks:{},orbs:[],adds:[],needle:null,forge:null,log:[]};FIN.k5=K5;
// ---------- звуки магии Кощея (синтез, как остальные эффекты релиза) ----------
const K5S={
  cast:()=>{AUD.nz({f0:180,f1:1600,d:0.7,v:0.06,q:3,a:0.2,wet:0.5});AUD.osc({type:'sawtooth',f0:98,f1:196,d:0.7,v:0.03,lp:900,vib:0.03});},
  warn:()=>{AUD.osc({f0:990,f1:740,d:0.18,v:0.03});},
  strike:()=>{AUD.nz({type:'highpass',f0:2400,f1:500,d:0.25,v:0.16,a:0.002});AUD.thump({f0:95,f1:34,d:0.5,v:0.3});AUD.nz({type:'lowpass',f0:320,f1:70,d:1.3,v:0.1,a:0.05,wet:0.4});},
  orb:()=>{AUD.osc({f0:70,f1:95,d:0.9,v:0.12,trem:9});AUD.bell(392,{v:0.03,d:0.9,wet:0.7});AUD.nz({f0:300,f1:1200,d:0.8,v:0.03,q:4,wet:0.5});},
  orbPass:()=>{AUD.bell(880,{v:0.05,d:0.6,wet:0.5});AUD.osc({type:'triangle',f0:500,f1:1000,d:0.25,v:0.04});},
  orbHit:()=>{AUD.bell(1175,{v:0.05,d:0.8,wet:0.6});AUD.bell(1568,{v:0.04,d:0.9,at:0.05,wet:0.6});AUD.thump({f0:160,f1:60,d:0.3,v:0.2});},
  candleOn:()=>{AUD.nz({f0:500,f1:1900,d:0.4,v:0.06,q:2,a:0.02,wet:0.3});AUD.osc({type:'sawtooth',f0:140,f1:210,d:0.4,v:0.02,lp:700});},
  candleOff:()=>{AUD.nz({type:'highpass',f0:3200,f1:6500,d:0.55,v:0.06,a:0.01});AUD.osc({f0:620,f1:180,d:0.35,v:0.025});},
  barrier:()=>{for(let i=0;i<12;i++)AUD.bell(rand(1400,4200),{v:0.02,d:0.7,at:i*0.025,wet:0.6,pan:rand(-0.7,0.7)});AUD.nz({type:'highpass',f0:3800,d:0.7,v:0.08,a:0.003});AUD.thump({f0:130,f1:40,d:0.5,v:0.3});},
  hum:()=>{AUD.osc({f0:110,f1:118,d:1.2,v:0.03,trem:6,wet:0.4});},
  lock:()=>{AUD.nz({type:'bandpass',f0:1300,q:8,d:0.08,v:0.12,a:0.001});AUD.osc({type:'square',f0:190,f1:120,d:0.16,v:0.05,lp:1200});if(SFX.keys)SFX.keys();},
  unlock:()=>{AUD.bell(1760,{v:0.05,d:0.5});AUD.bell(2349,{v:0.04,d:0.6,at:0.06});AUD.nz({type:'bandpass',f0:2600,q:6,d:0.05,v:0.08,a:0.001});},
  keyFly:()=>{for(let i=0;i<3;i++)AUD.bell(rand(2600,3400),{v:0.012,d:0.3,at:i*0.07,wet:0.5});},
  keyBreak:()=>{for(let i=0;i<5;i++)AUD.bell(rand(2200,3600),{v:0.025,d:0.35,at:i*0.03,wet:0.4});AUD.nz({type:'highpass',f0:3000,d:0.2,v:0.07,a:0.002});},
  raven:()=>{for(let i=0;i<2;i++)AUD.osc({type:'sawtooth',f0:760,f1:430,d:0.2,v:0.045,lp:1900,vib:0.08,vibF:32,at:i*0.24});},
  flyUp:()=>{AUD.nz({f0:180,f1:1500,d:1.1,v:0.08,a:0.3,q:1,wet:0.4});AUD.osc({type:'sawtooth',f0:78,f1:170,d:1.1,v:0.03,lp:600});},
  land:()=>{AUD.thump({f0:120,f1:30,d:0.7,v:0.42});AUD.nz({type:'lowpass',f0:900,f1:100,d:0.8,v:0.15,a:0.004});},
  swing:()=>{AUD.nz({type:'bandpass',f0:700,f1:3200,d:0.22,v:0.1,q:1.5,a:0.02});},
  draw:()=>{AUD.osc({type:'sawtooth',f0:1500,f1:2300,d:1.0,v:0.018,lp:5200});AUD.bell(1760,{v:0.04,d:1.2,wet:0.6});AUD.nz({type:'highpass',f0:5000,d:0.6,v:0.03,a:0.2});},
  shock:()=>{AUD.thump({f0:90,f1:28,d:0.8,v:0.45});AUD.nz({type:'lowpass',f0:1200,f1:120,d:1.1,v:0.14,a:0.01,wet:0.3});},
  needles:()=>{for(let i=0;i<6;i++)AUD.osc({f0:rand(2200,3200),f1:rand(500,900),d:0.55,v:0.014,at:i*0.08,pan:rand(-0.6,0.6)});},
  vortex:()=>{AUD.nz({f0:260,f1:950,f2:260,d:2.6,v:0.07,q:4,pan0:-1,pan1:1,wet:0.5});AUD.osc({type:'sawtooth',f0:55,f1:70,d:2.6,v:0.04,lp:300,trem:5});},
  blink:()=>{AUD.osc({f0:300,f1:1700,d:0.25,v:0.04});AUD.nz({type:'highpass',f0:5200,d:0.2,v:0.04,a:0.002});},
  bind:()=>{if(SFX.dzin)SFX.dzin();[784,988,1175,1568].forEach((f,i)=>AUD.bell(f,{v:0.04,d:1.0,at:i*0.09,wet:0.6}));},
  thunder:()=>{AUD.nz({type:'lowpass',f0:700,f1:55,d:2.8,v:0.2,a:0.02,wet:0.5});},
  ult:()=>{AUD.osc({f0:55,d:3,v:0.2,trem:3});AUD.osc({type:'sawtooth',f0:110,f1:55,d:2.5,v:0.04,lp:500});for(let i=0;i<6;i++)AUD.nz({type:'bandpass',f0:rand(900,1800),q:6,d:0.1,v:0.06,a:0.001,at:i*0.12});},
  forge:()=>{AUD.bell(1980,{v:0.05,d:0.6,wet:0.4});AUD.nz({type:'bandpass',f0:3000,q:5,d:0.05,v:0.1,a:0.001});}};
const k5s=k=>{try{if(AUD.ready()&&K5S[k])K5S[k]();}catch(e){}};
FIN.k5sfx=K5S;
// ---------- новые помощники Кощея: облики (кит релиза) ----------
FOE.k5kos={r:0.9,emb:5,sig:['yellow'],sp:2.6,look:'k5none',big:true};
FOE.k5candle={r:0.6,emb:3,sig:['blue'],sp:0.01,look:'k5candle',ranged:true};
FOE.k5key={r:0.45,emb:1,sig:['yellow'],sp:0.01,look:'k5key'};
FOE.k5raven={r:0.5,emb:2,sig:['red'],sp:0.01,look:'k5raven'};
FOE.k5bone={r:0.6,emb:3,sig:['yellow','red'],sp:2.0,look:'k5bone'};
FL.k5none=()=>({eyeY:4.4,eyeZ:0.2,top:4.6,eyeS:0.01});
FL.k5candle=(inner)=>{const iron=hp(0x3a3640),wax=hp(0x2a2234);fk(inner,K=>{for(let i=0;i<3;i++){const a=i/3*Math.PI*2;K.add(KP.cyl(0.04,0.05,0.9,5),iron,tm(Math.cos(a)*0.28,0.4,Math.sin(a)*0.28,Math.sin(a)*0.35,0,-Math.cos(a)*0.35));}
    K.add(KP.cyl(0.36,0.3,0.08,10),iron,tm(0,0.84,0));K.add(KP.cyl(0.17,0.19,0.7,9),wax,tm(0,1.22,0));for(let i=0;i<4;i++)K.add(hSph(0.05,5,4),wax,tm(Math.cos(i*1.7)*0.17,1.0+i*0.1,Math.sin(i*1.7)*0.17,0,0,0,1,1.6,1),{s:0.1});});
  const flame=new THREE.Group();flame.position.y=1.66;inner.add(flame);const c=new THREE.Mesh(new THREE.ConeGeometry(0.13,0.42,8),MB(0xb070ff,{transparent:true,opacity:0.95}));c.position.y=0.12;flame.add(c);
  flame.add(new THREE.Mesh(new THREE.SphereGeometry(0.08,8,6),MB(0xffe0ff)));const halo=new THREE.Mesh(new THREE.SphereGeometry(0.36,10,8),MB(0x8a50ff,{transparent:true,opacity:0.25,depthWrite:false}));halo.position.y=0.1;flame.add(halo);
  return {flame,eyeY:1.12,eyeZ:0.19,top:2.0,eyeS:0.8};};
FL.k5key=(inner)=>{const iron=hp(0x2a2630),wing=hp(0x3a2a4a);const body=new THREE.Group();inner.add(body);
  fk(body,K=>{K.add(KP.tor(0.24,0.07,5,14),iron,tm(0,1.55,0));K.add(KP.cyl(0.05,0.05,0.9,6),iron,tm(0,1.0,0));K.box(0.22,0.08,0.05,iron,tm(0.1,0.62,0),{b:0.01});K.box(0.16,0.08,0.05,iron,tm(0.07,0.76,0),{b:0.01});
    for(const s of[-1,1])K.add(KP.cone(0.16,0.42,3),wing,tm(s*0.38,1.55,-0.05,0,0,s*1.4,1,1,0.3));});
  const gem=new THREE.Mesh(new THREE.OctahedronGeometry(0.1),MB(0xc080ff));gem.position.y=1.55;body.add(gem);return {body,gem,eyeY:1.6,eyeZ:0.09,top:1.9,eyeS:0.6};};
FL.k5raven=(inner)=>{const bl=hp(0x1c1824),bk=hp(0x3a3440);const body=new THREE.Group();inner.add(body);
  fk(body,K=>{K.add(hSph(0.34,8,6),bl,tm(0,0.9,0,0,0,0,1,0.85,1.35));K.add(hSph(0.22,7,5),bl,tm(0,1.12,0.38));const bkg=KP.cone(0.07,0.28,5);bkg.rotateX(Math.PI/2);K.add(bkg,hp(0x7a7060),tm(0,1.08,0.64));
    K.add(KP.cone(0.18,0.5,4),bl,tm(0,0.92,-0.5,-Math.PI/2+0.3,0,0,1,1,0.4));});
  const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.28,1.0,0);body.add(w);fk(w,K=>{K.add(KP.cone(0.28,0.95,3),bk,tm(s*0.45,0,0,0,0,-s*Math.PI/2,1,1,0.25));});wings.push({g:w,s});}
  return {body,wings,eyeY:1.18,eyeZ:0.54,top:1.5,eyeS:0.7};};
FL.k5bone=(inner)=>{const bn=hp(0xe8e0c8),dk=hp(0x2a2430),iron=hp(0x5a5660),wd=hp(0x4a3424);
  fk(inner,K=>{K.add(hSph(0.3,8,7),bn,tm(0,2.05,0,0,0,0,0.9,1.05,0.95));for(const s of[-1,1])K.add(hSph(0.07,5,4),dk,tm(s*0.1,2.08,0.25),{s:0});
    for(let i=0;i<4;i++)K.add(KP.tor(0.22-i*0.015,0.035,4,10),bn,tm(0,1.62-i*0.14,0,Math.PI/2,0,0,1,0.8,1));K.add(KP.cyl(0.05,0.05,0.8,5),bn,tm(0,1.4,-0.06));
    K.add(KP.cyl(0.2,0.24,0.18,8),bn,tm(0,0.98,0));for(const s of[-1,1]){K.add(KP.cyl(0.05,0.045,0.9,5),bn,tm(s*0.14,0.5,0));K.add(KP.cyl(0.04,0.04,0.7,5),bn,tm(s*0.34,1.35,0.1,0.3,0,s*0.25));}
    K.add(KP.cyl(0.04,0.06,1.1,6),wd,tm(0.42,1.25,0.35,-0.6,0,0.2));});
  const plate=new THREE.Group();plate.position.set(0,1.25,0.46);inner.add(plate);
  fk(plate,K=>{K.add(KP.bcyl(0.52,0.1,0.03,12),wd,tm(0,0,0,Math.PI/2,0,0));K.add(KP.tor(0.52,0.04,4,16),iron,tm(0,0,0.02));K.add(hSph(0.12,6,5),iron,tm(0,0,0.06),{s:0.1});});
  return {plate,eyeY:2.1,eyeZ:0.27,top:2.5,eyeS:0.7};};
// меч Кощея: чёрный клинок с фиолетовой кромкой, золотая гарда
function k5Sword(){const g=new THREE.Group();fk(g,K=>{K.box(0.1,1.8,0.035,hp(0x1a1622),tm(0,-1.05,0),{b:0.012});K.add(KP.cone(0.05,0.2,4),hp(0x1a1622),tm(0,-2.05,0,Math.PI,0,0,1,1,0.35));
    K.box(0.5,0.07,0.1,hp(0xd8a830),tm(0,-0.12,0),{b:0.02});K.add(KP.cyl(0.035,0.035,0.3,6),hp(0x3a2a20),tm(0,0.05,0));K.add(hSph(0.065,5,4),hp(0xd8a830),tm(0,0.22,0));});
  const edge=new THREE.Mesh(new THREE.BoxGeometry(0.035,1.75,0.06),MB(0xb070ff,{transparent:true,opacity:0.85}));edge.position.set(0.055,-1.05,0);g.add(edge);g.userData.edge=edge;
  g.traverse(o=>{o.userData.noBatch=true;o.castShadow=false;});return g;}
// ---------- эффекты: реквизит, круги на земле, шары, молнии, нить ----------
const K5FX=[];
function k5fx(dur,upd,end){const f={t:0,dur,upd,end};K5FX.push(f);return f;}
function k5fxTick(dt){for(let i=K5FX.length-1;i>=0;i--){const f=K5FX[i];f.t+=dt;const k=Math.min(1,f.t/f.dur);try{if(f.upd)f.upd(k,dt);}catch(e){console.error('k5fx',e);}
  if(f.t>=f.dur){K5FX.splice(i,1);try{if(f.end)f.end();}catch(e){console.error('k5fx end',e);}}}
  k5TrailTick(dt);k5PadTick();}
function k5Prop(o){o.userData.noBatch=true;o.userData.dress=true;o.traverse(q=>{q.userData.noBatch=true;q.userData.sty=true;q.castShadow=false;});W.group.add(o);return o;}
const k5Del=o=>{if(o&&o.parent)o.parent.remove(o);};
// красный круг: сюда ударит; fire(p) — в конце
function k5Zone(p,r,dur,col,fire){const g=k5Prop(new THREE.Group());g.position.set(p.x,0.06,p.z);
  const ring=new THREE.Mesh(new THREE.RingGeometry(r*0.88,r,36),MB(col,{transparent:true,opacity:0.9,side:THREE.DoubleSide,depthWrite:false}));ring.rotation.x=-Math.PI/2;g.add(ring);
  const fill=new THREE.Mesh(new THREE.CircleGeometry(r,36),MB(col,{transparent:true,opacity:0.32,side:THREE.DoubleSide,depthWrite:false}));fill.rotation.x=-Math.PI/2;fill.position.y=0.01;g.add(fill);
  K5.zones=(K5.zones||[]);K5.zones.push(g);
  k5fx(dur,k=>{fill.scale.setScalar(Math.max(0.02,k));ring.material.opacity=0.45+0.55*Math.abs(Math.sin(G.time*(5+k*16)));},()=>{k5Del(g);const i=K5.zones.indexOf(g);if(i>=0)K5.zones.splice(i,1);if(g.userData.dead)return;if(fire)fire(new V3(p.x,0,p.z));});return g;}
// мягкое пятно для свечений (молния, путы)
const K5GLOW=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.3,'rgba(255,255,255,0.55)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);})();
function k5Glow(col,s){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:K5GLOW,color:col,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,toneMapped:false}));sp.scale.setScalar(s);sp.raycast=()=>{};return sp;}
// удар в красный круг — молния (по отзыву: был «столб света»): ломаный разряд из туч в точку, две ветки, белая сердцевина
// в фиолетовом ореоле, два повторных проблеска, вспышка и свет на земле, искры, выжженное пятно гаснет за 2,5 с
const K5BOLT={geo:new THREE.CylinderGeometry(1,1,1,6,1,true),up:new V3(0,1,0)};
function k5Bolt(p,col){col=col||0xd8b0ff;const g=k5Prop(new THREE.Group());g.position.set(p.x,0,p.z);
  const core=MB(0xffffff,{transparent:true,opacity:1,depthWrite:false,fog:false}),glow=MB(col,{transparent:true,opacity:0.55,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
  const seg=(a,b,r,mat)=>{const d=b.clone().sub(a),L=d.length()||0.01;const m=new THREE.Mesh(K5BOLT.geo,mat);m.position.copy(a).addScaledVector(d,0.5);m.scale.set(r,L,r);m.quaternion.setFromUnitVectors(K5BOLT.up,d.normalize());m.userData.seg=true;m.renderOrder=14;g.add(m);};
  const build=()=>{for(const c of g.children.slice())if(c.userData.seg)g.remove(c);const n=11,top=16,x0=rand(-1.4,1.4),z0=rand(-1.4,1.4),pts=[];
    for(let i=0;i<=n;i++){const k=i/n,j=i&&i<n?1:0;pts.push(new V3(x0*(1-k)+rand(-0.55,0.55)*j*(1-k*0.5),top*(1-k)+rand(-0.3,0.3)*j,z0*(1-k)+rand(-0.55,0.55)*j*(1-k*0.5)));}
    for(let i=0;i<n;i++){seg(pts[i],pts[i+1],0.06,core);seg(pts[i],pts[i+1],0.24,glow);}
    for(const bi of[3,6,8]){let a=pts[bi].clone();for(let j=0;j<3;j++){const b=a.clone().add(new V3(rand(-1.2,1.2),-rand(0.8,1.5),rand(-1.2,1.2)));if(b.y<0.2)break;seg(a,b,0.035,core);seg(a,b,0.13,glow);a=b;}}};
  build();
  const fl=k5Glow(col,6);fl.position.y=0.6;g.add(fl);const top=k5Glow(0xffffff,3.2);top.position.y=0.25;g.add(top);
  const scorch=new THREE.Mesh(new THREE.CircleGeometry(1.25,24),MB(0x231a2c,{transparent:true,opacity:0.6,depthWrite:false}));scorch.rotation.x=-Math.PI/2;scorch.position.y=0.04;g.add(scorch);
  const ring=new THREE.Mesh(new THREE.RingGeometry(0.85,1,40),MB(col,{transparent:true,opacity:0.9,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));ring.rotation.x=-Math.PI/2;ring.position.y=0.07;g.add(ring);
  const light=new THREE.PointLight(col,0,16,1.6);light.position.y=2;g.add(light);
  if(FX.sparks)FX.sparks(new V3(p.x,0.3,p.z),26,0xe8d0ff);if(FX.sparkle)FX.sparkle(new V3(p.x,0.6,p.z),10,0xffffff);if(FX.dust)FX.dust(new V3(p.x,0,p.z),12,0x5a4a6a);
  let re=0;k5fx(2.5,(k,dt)=>{const t=k*2.5;if((t>0.12&&re===0)||(t>0.24&&re===1)){re++;build();}
    const on=t<0.42,fade=on?(t<0.3?1:1-(t-0.3)/0.12):0;g.children.forEach(c=>{if(c.userData.seg)c.visible=on&&(Math.sin(t*90)>-0.6||t<0.06);});
    core.opacity=fade;glow.opacity=0.55*fade;fl.material.opacity=Math.max(0,1-t/0.5);fl.scale.setScalar(6+t*6);top.material.opacity=Math.max(0,1-t/0.3);
    light.intensity=Math.max(0,4*(1-t/0.45))*(Math.sin(t*70)>-0.3?1:0.4);ring.scale.setScalar(1+t*5);ring.material.opacity=Math.max(0,0.9*(1-t/0.5));
    scorch.material.opacity=0.6*Math.max(0,1-Math.max(0,t-0.8)/1.7);},()=>k5Del(g));}
function k5Beam(p,col){k5Bolt(p,col);}   // прежнее имя — тоже молния
FIN.k5bolt=(p,col)=>k5Bolt(p,col);   // для ботов
function k5Thread(from,to){const m=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,1,5),MB(COL.gold,{transparent:true,opacity:1})));
  k5fx(1.3,k=>{const a=from(),b=to(),d=b.clone().sub(a),L=d.length();m.position.copy(a).addScaledVector(d,0.5);m.scale.set(1,L,1);m.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());m.material.opacity=k<0.7?1:1-(k-0.7)/0.3;},()=>k5Del(m));}
// урон заклинанием: кувырок спасает; щит — нет (кроме шаров)
function k5Hurt(h,src){if(!h||!h.active||players[h.player].downed||h.iT>0)return false;if(h.rollT>0||G.time-(h.lastRoll||-9)<0.3){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Увернулся!','#9fe0ff');return false;}
  return damageHero(h,{kind:'enemy',ref:{pos:src.clone?src.clone():new V3(src.x,0,src.z)}});}
const k5Heroes=()=>(G.solo?[active(G.soloPi)]:[0,1].map(pi=>active(pi))).filter(h=>h&&h.active&&!players[h.player].downed);   // в одиночном — только тот, кем управляешь
// ---------- обёртки функций прототипа (только для врагов этого боя: у них свои правила) ----------
{const _uf=updateFoe;updateFoe=function(e,dt){if(!e.alive&&e.state!=='dying')return;return _uf.apply(this,arguments);};}   // «ушедшие» враги не ходят и не бьют (прежние цепи финала продолжали бить невидимыми)
{const _eh=enemyHit;enemyHit=function(e,h,air){if(e&&e.k5hit){e.k5hit(e,h,air);return;}return _eh.apply(this,arguments);};}
{const _pf=parryFoe;parryFoe=function(e,h){if(e&&e.k5parry&&e.k5parry(e,h)===true)return;const r=_pf.apply(this,arguments);if(e&&e.k5parryPost)e.k5parryPost(e,h);return r;};}
{const _hh=hitHero;hitHero=function(e,h,tipText){if(e&&e.k5hitHero&&e.k5hitHero(e,h)===true)return;return _hh.apply(this,arguments);};}
{const _os=oneSwoop;oneSwoop=function(e,h){if(e&&e.k5swoop){e.k5swoop(e,h);return;}return _os.apply(this,arguments);};}
{const _sb=shieldBlock;shieldBlock=function(h){const r=_sb.apply(this,arguments);if(K5.onBlock)K5.onBlock(h);return r;};}
/* ============================== final06 · правки по отзыву 2: «сочные» эффекты боя и роликов, режиссура роликов финала ============================== */
// Всё светящееся — аддитивное (горит поверх тумана и грозы): вспышки, кольца, столбы света, руны и трещины на земле, шлейфы;
// lowpoly-частицы (искры, звёзды, пыль, перья) — через FX из late_84.
const K5TEX={};
{const mk=(n,f)=>{const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');f(x,n);const t=new THREE.CanvasTexture(c);return t;};
  // магический круг: два обода, двенадцать знаков, две шестиконечные звезды
  K5TEX.rune=mk(256,(x)=>{x.translate(128,128);x.strokeStyle='#fff';x.lineCap='round';x.lineJoin='round';x.lineWidth=7;x.beginPath();x.arc(0,0,118,0,Math.PI*2);x.stroke();
    x.lineWidth=3;x.beginPath();x.arc(0,0,97,0,Math.PI*2);x.stroke();
    for(let i=0;i<12;i++){x.save();x.rotate(i/12*Math.PI*2);x.lineWidth=4;x.beginPath();const g=i%4;
      if(g===0){x.moveTo(-8,-112);x.lineTo(0,-101);x.lineTo(8,-112);x.moveTo(0,-101);x.lineTo(0,-104);}else if(g===1){x.moveTo(-7,-110);x.lineTo(7,-103);x.moveTo(0,-113);x.lineTo(0,-101);}
      else if(g===2){x.arc(0,-107,6,0,Math.PI*1.6);}else{x.moveTo(-6,-102);x.lineTo(6,-113);x.moveTo(-6,-113);x.lineTo(6,-102);}x.stroke();x.restore();}
    x.lineWidth=3;for(let k=0;k<2;k++){x.beginPath();for(let i=0;i<=3;i++){const a=i/3*Math.PI*2+k*Math.PI/3-Math.PI/2;const px=Math.cos(a)*86,py=Math.sin(a)*86;i?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}
    x.lineWidth=2;x.beginPath();x.arc(0,0,30,0,Math.PI*2);x.stroke();});
  // трещины в земле: лучи с ветками от центра
  K5TEX.crack=mk(256,(x)=>{x.translate(128,128);x.strokeStyle='#fff';x.lineCap='round';
    const br=(a,r0,len,w,d)=>{let px=Math.cos(a)*r0,py=Math.sin(a)*r0;x.lineWidth=w;x.beginPath();x.moveTo(px,py);const n=5;for(let i=1;i<=n;i++){const aa=a+(Math.random()-0.5)*0.5;px+=Math.cos(aa)*len/n;py+=Math.sin(aa)*len/n;x.lineTo(px,py);
        if(d<2&&Math.random()<0.35){x.stroke();br(aa+(Math.random()<0.5?0.7:-0.7),Math.hypot(px,py),len*0.45,w*0.6,d+1);x.lineWidth=w;x.beginPath();x.moveTo(px,py);}}x.stroke();};
    for(let i=0;i<9;i++)br(i/9*Math.PI*2+Math.random()*0.4,6,100+Math.random()*16,5,0);});
  // спираль воронки
  K5TEX.spiral=mk(256,(x)=>{x.translate(128,128);for(let k=0;k<4;k++){x.beginPath();for(let i=0;i<=120;i++){const u=i/120,a=u*Math.PI*3.2+k*Math.PI/2,r=8+u*112;const px=Math.cos(a)*r,py=Math.sin(a)*r;i?x.lineTo(px,py):x.moveTo(px,py);}
      x.strokeStyle='rgba(255,255,255,'+(0.9-k*0.12)+')';x.lineWidth=10;x.lineCap='round';x.stroke();}
    const g=x.createRadialGradient(0,0,0,0,0,40);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,40,0,Math.PI*2);x.fill();});
  // вертикальная полоса для столбов света и шлейфов игл: ярко в середине, гаснет к краям
  K5TEX.beam=mk(64,(x,n)=>{const g=x.createLinearGradient(0,0,n,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(0.5,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,n,n);
    const v=x.createLinearGradient(0,0,0,n);v.addColorStop(0,'rgba(0,0,0,1)');v.addColorStop(0.25,'rgba(0,0,0,0)');x.globalCompositeOperation='destination-out';x.fillStyle=v;x.fillRect(0,0,n,n);});}
const k5Add=(col,o)=>new THREE.MeshBasicMaterial(Object.assign({color:col,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false,toneMapped:false},o||{}));
// вспышка-«пятно» света
function k5Flash(p,col,s,dur){const g=k5Prop(k5Glow(col,s));g.position.copy(p);k5fx(dur||0.35,k=>{g.material.opacity=1-k*k;g.scale.setScalar(s*(1+k*0.7));},()=>k5Del(g));return g;}
// кольцо по земле (или в воздухе: rot — наклон)
function k5Ring(p,col,r0,r1,dur,w,rot){const m=k5Prop(new THREE.Mesh(new THREE.RingGeometry(1-(w||0.14),1,56),k5Add(col)));m.rotation.x=-Math.PI/2;if(rot)m.rotation.set(rot.x,rot.y,rot.z);m.position.copy(p);m.raycast=()=>{};
  k5fx(dur||0.6,k=>{const e=CE.outCubic(k);m.scale.setScalar(lerp(r0,r1,e));m.material.opacity=0.95*(1-k);},()=>k5Del(m));return m;}
// плоская картинка на земле: руна, трещина, спираль
function k5Decal(tex,col,r,p,op){const m=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(r*2,r*2),k5Add(col,{map:tex,opacity:op==null?1:op})));m.rotation.x=-Math.PI/2;m.position.set(p.x,p.y==null?0.08:p.y,p.z);m.raycast=()=>{};return m;}
// столб света из земли
function k5Pillar(p,col,h,r,dur){const m=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(r,r*1.25,h,18,1,true),k5Add(col,{map:K5TEX.beam,opacity:0.9})));m.position.set(p.x,h/2,p.z);m.raycast=()=>{};
  const core=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(r*0.35,r*0.45,h,10,1,true),k5Add(0xffffff,{map:K5TEX.beam,opacity:0.8})));core.position.copy(m.position);
  k5fx(dur||0.9,k=>{const a=k<0.15?k/0.15:1-CE.inCubic((k-0.15)/0.85);m.material.opacity=0.9*a;core.material.opacity=0.8*a;const s=k<0.15?CE.outBack(k/0.15):1+k*0.3;m.scale.set(s,1,s);core.scale.set(s,1,s);m.rotation.y+=0.05;},()=>{k5Del(m);k5Del(core);});return m;}
// чёрные перья: ворон ушиблен или рассеян
const K5FEATH=[0x1c1824,0x2a2236,0x3a3448,0x4a2a6a];
function k5Feathers(p,n,sp){n=Math.round((n||10)*FXQ());for(let i=0;i<n;i++){const a=rand(0,6.28),s=rand(0.8,2.2)*(sp||1);fxAdd('conf',K5FEATH[i%4],p.clone().add(new V3(rand(-0.3,0.3),rand(-0.2,0.3),rand(-0.3,0.3))),new V3(Math.cos(a)*s,rand(1,3.2),Math.sin(a)*s),{s:rand(0.12,0.2),life:rand(1.1,1.7),g:2.2,drag:1.6,spin:7,flutter:1});}}
// искры с хвостами к центру: «сбор силы» перед заклинанием (anticipation)
function k5Gather(p,col,dur,n,r){const parts=[];for(let i=0;i<(n||14);i++){const s=k5Prop(k5Glow(col,rand(0.25,0.45)));const d=new V3(rand(-1,1),rand(-0.6,1),rand(-1,1)).normalize().multiplyScalar(rand(0.8,1)*(r||1.8));parts.push({s,d,o:rand(0,0.35)});}
  k5fx(dur||0.6,k=>{const P=typeof p==='function'?p():p;for(const q of parts){const u=clamp((k-q.o)/(1-q.o),0,1),e=CE.inCubic(u);q.s.position.copy(P).addScaledVector(q.d,1-e);q.s.material.opacity=u>0?Math.min(1,u*3)*(1-e*0.3):0;}},()=>parts.forEach(q=>k5Del(q.s)));}
// шлейфы: светящиеся пятна за летящим (шар, ворон, Кощей в полёте, игла)
const K5TR=[];
function k5Trail(src,col,o){o=o||{};const T={src,col,life:o.life||0.45,size:o.size||0.5,every:o.every||0.035,acc:0,on:true,parts:[],max:o.max||28};K5TR.push(T);return T;}
function k5TrailTick(dt){for(let i=K5TR.length-1;i>=0;i--){const T=K5TR[i];
    if(T.on){let p=null;try{p=typeof T.src==='function'?T.src():(T.src&&T.src.parent?T.src.getWorldPosition(new V3()):null);}catch(e){p=null;}
      if(!p)T.on=false;else{T.acc+=dt;while(T.acc>=T.every){T.acc-=T.every;if(T.parts.length<T.max){const s=k5Prop(k5Glow(typeof T.col==='function'?T.col():T.col,T.size));s.position.copy(p);T.parts.push({s,t:0});}}}}
    for(let j=T.parts.length-1;j>=0;j--){const q=T.parts[j];q.t+=dt;const k=q.t/T.life;if(k>=1){k5Del(q.s);T.parts.splice(j,1);continue;}q.s.material.opacity=(1-k)*0.8;q.s.scale.setScalar(T.size*(1-k*0.65));}
    if(!T.on&&!T.parts.length)K5TR.splice(i,1);}}
FIN.k5vfx={k5Flash,k5Ring,k5Decal,k5Pillar,k5Feathers,k5Gather,k5Trail};
// тёмный шар (по отзыву: ярче и «магичнее»): тёмное ядро в фиолетовом сиянии, вокруг — кольцо и три искры-спутника; children[0] — ядро, [1] — сияние (их красит и качает бой)
function k5OrbMesh(r){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),MB(0x3a1a7a)));g.add(k5Glow(0xb070ff,r*4.2));
  const shell=new THREE.Mesh(new THREE.IcosahedronGeometry(r*1.25,1),k5Add(0x8a50ff,{opacity:0.35,wireframe:true}));g.add(shell);
  const c=new THREE.Mesh(new THREE.SphereGeometry(r*0.42,10,8),MB(0xffe0ff));g.add(c);const ring=new THREE.Mesh(new THREE.TorusGeometry(r*1.6,0.035,5,32),k5Add(0xd0a0ff,{opacity:0.8}));g.add(ring);
  const moons=[];for(let i=0;i<3;i++){const m=k5Glow(0xf0d8ff,r*0.9);g.add(m);moons.push(m);}g.userData.k5orb={shell,ring,moons,core:c};return k5Prop(g);}
function k5OrbAnim(g,dt,gold){const O=g.userData.k5orb;if(!O)return;const t=G.time;O.shell.rotation.x+=dt*2.2;O.shell.rotation.y-=dt*3.1;O.ring.rotation.set(Math.PI/2+Math.sin(t*3)*0.5,t*4,0);
  O.moons.forEach((m,i)=>{const a=t*6+i*2.094;m.position.set(Math.cos(a)*0.62,Math.sin(a*1.3)*0.25,Math.sin(a)*0.62);});
  const col=gold?0xffd060:0x8a50ff;O.shell.material.color.setHex(col);g.children[0].material.color.setHex(gold?0xb07a10:0x3a1a7a);O.ring.material.color.setHex(gold?0xffe8a0:0xd0a0ff);g.children[1].material.color.setHex(gold?0xffc040:0xb070ff);O.core.material.color.setHex(gold?0xfff6d0:0xffe0ff);}
/* ---------- режиссура роликов финала (поверх общей камеры late_82–86) ----------
   У шота ролика может быть поле x (авторская постановка):
     ease — кривая движения ('inOutCubic', 'outCubic', 'inOutSine', 'outBack', 'outQuint'…), mdur — время движения;
     pts / lpts — промежуточные точки сплайна (CatmullRom) для камеры и для точки взгляда;
     pf(t) / lf(t) — живая позиция камеры / точка взгляда (слежение за летящим, follow-cam), lk — сглаживание взгляда;
     fov, fov2 — угол в начале и в конце шота, roll, roll2 — крен (голландский угол);
     move — живое движение поверх ('push','pull','orbit','truck','crane' или 'none'), amp — его сила;
     tr — склейка: 'cut', 'soft' (плавный перевод), 'whip' (смаз), 'dip' (через цвет), 'iris' (шторка), 'flash' (белая вспышка).
   У ролика — поле k5: {cues:[[t,fn]], mood:[цвет,сила], calm, inserts}. Авторские метки заменяют общие. */
{const _bp=basePose;basePose=function(s,t,out){const x=s.k5;if(!x)return _bp(s,t,out);
  const u=clamp((t-s.t)/s.len,0,1),um=clamp((t-s.t)/(x.mdur||s.len),0,1),k=(CE[x.ease]||CE.inOutCubic)(um),kc=clamp(k,0,1);
  if(x.curve)x.curve.getPoint(kc,out.pos);else if(s.p2)out.pos.lerpVectors(s.p,s.p2,k);else out.pos.copy(s.p);
  if(x.lcurve)x.lcurve.getPoint(kc,out.look);else if(s.l2)out.look.lerpVectors(s.l,s.l2,k);else out.look.copy(s.l);
  if(x.pf){const P=x.pf(t-s.t,k);if(P)out.pos.copy(P);}
  if(x.lf){const L=x.lf(t-s.t,k);if(L){const dt=x._t==null||t<x._t?1:clamp(t-x._t,0,0.1);x._t=t;if(!x._l||dt>=1)x._l=L.clone();else x._l.lerp(L,1-Math.exp(-(x.lk||8)*dt));out.look.copy(x._l);}}
  out.fov=x.fov!=null?lerp(x.fov,x.fov2!=null?x.fov2:x.fov,x.fov2!=null?CE.inOutSine(u):0):CD.fov0+(s.size==='close'?-3:s.size==='wide'?2:0);
  out.roll=x.roll!=null?lerp(x.roll,x.roll2!=null?x.roll2:x.roll,CE.inOutSine(u)):0;if(x.move!=='none')lifeMove(s,u,out);return out;};}
CINE.k5cut=(type)=>{if(type==='flash'){CINE.flashDip('#fff6e0',0.75);CINE.punch(-3);}else if(type==='iris'){CX.iris=0.02;CX.irisTo=1;CX.irisDur=0.42;CINE.emit('iris',{dir:'open'});}};
{const _dir=CINE.direct;CINE.direct=function(cd){_dir(cd);const D=cd.def&&cd.def.k5;if(!D)return;cd.directed=true;cd.k5=true;cd.calm=!!D.calm;cd.inserts=D.inserts===true;CINE.mood(D.mood?D.mood[0]:'#ffc890',D.mood?D.mood[1]:0.07);
  if(D.iris)cd.entryIris=true;const V=a=>new V3(a[0],a[1],a[2]),extra=[];
  cd.shots.forEach((s,i)=>{const x=cd.def.shots[i]&&cd.def.shots[i].x;if(!x)return;s.k5=x;x._l=null;x._t=null;
    if(x.move)s.move=x.move;if(x.amp!=null)s.amp=x.amp;
    if(x.pts&&s.p2)x.curve=new THREE.CatmullRomCurve3([s.p.clone()].concat(x.pts.map(V),[s.p2.clone()]),false,'centripetal');
    if(x.lpts&&s.l2)x.lcurve=new THREE.CatmullRomCurve3([s.l.clone()].concat(x.lpts.map(V),[s.l2.clone()]),false,'centripetal');
    if(x.tr&&i>0){if(x.tr==='soft'){s.cut=false;s.tr='cut';}else if(x.tr==='flash'||x.tr==='iris'){s.cut=true;s.tr='cut';extra.push({t:s.t,fn:()=>CINE.k5cut(x.tr)});}else{s.cut=true;s.tr=x.tr;}}});
  cd.cover=[];cd.cues=(D.cues||[]).map(([t,fn])=>({t,fn})).concat(extra).sort((a,b)=>a.t-b.t);cd.ci=0;};}
// кадр «на двоих»: середина между целями, отступ по стороне yaw (радианы, 0 — с +z), дистанция не меньше, чем нужно, чтобы оба влезли
function k5Two(a,b,yaw,dist,h,lh){const m=a.clone().add(b).multiplyScalar(0.5),sep=a.distanceTo(b),d=Math.max(dist,sep*1.25+1.2);
  return {p:[m.x+Math.sin(yaw)*d,(h==null?1.6:h)+m.y,m.z+Math.cos(yaw)*d],l:[m.x,(lh==null?1.0:lh)+m.y,m.z]};}
// кадр «в лицо»: камера впереди лица персонажа (face — куда он смотрит), со смещением в сторону side (радианы)
function k5Face(head,face,side,dist,dy){const a=face+(side||0);return {p:[head.x+Math.sin(a)*dist,head.y+(dy||0),head.z+Math.cos(a)*dist],l:[head.x,head.y-0.05,head.z]};}
FIN.k5cam={k5Two,k5Face};
// x.nofocus — шот, где автор держит кадр сам: автоматическая подстройка к говорящему (поднять взгляд, сузить FOV) не включается
{const _cu=cdUpdate;cdUpdate=function(dt){if(CD&&CD.k5&&CD.focus){const s=CD.shots[Math.max(0,shotAt(CD.S.t))];if(s&&s.k5&&s.k5.nofocus)CD.focus=null;}return _cu(dt);};}
/* ---------- Кощей-актёр: позы на пружинах (замах → действие → доводка), речь ртом, дыхание; только в роликах ---------- */
const K5POSE={idle:{},cast:{aRx:-2.75,aRz:-0.35,lRx:-2.75,lRz:0.35,cRx:-0.2,hRx:-0.25},castR:{aRx:-2.6,aRz:-0.2,cRx:-0.1,hRx:-0.15},point:{aRx:-1.55,aRz:0.05,cRx:0.14,hRx:0.04},
  offer:{aRx:-1.15,lRx:-1.15,aRz:0.1,lRz:-0.1,cRx:0.18,hRx:0.22},recoil:{cRx:-0.38,aRx:-0.7,aRz:-0.95,lRx:-0.7,lRz:0.95,hRx:-0.4},slump:{cRx:0.42,hRx:0.45,aRx:0.12,lRx:0.12,aRz:0.1,lRz:-0.1},
  threat:{cRx:0.26,aRx:-1.05,aRz:-0.75,lRx:-1.05,lRz:0.75,hRx:0.12},proud:{cRx:-0.14,hRx:-0.32,aRx:0.38,lRx:0.38,aRz:0.1,lRz:-0.1},sword:{aRx:-2.95,aRz:-0.12,cRx:-0.12,lRz:0.35,hRx:-0.1},
  guard:{aRx:-1.35,aRz:0.45,cRy:-0.3,lRx:-0.4,lRz:0.3},kneel:{hip:-0.95,cRx:0.32,hRx:0.25,aRx:-0.2,lRx:-0.2},sit:{hip:-0.75,cRx:0.32,hRx:0.26,aRx:-0.5,lRx:-0.5,aRz:0.2,lRz:-0.2},
  listen:{hRz:0.18,hRx:0.12,cRx:0.06},shrug:{aRx:-0.55,aRz:-0.75,lRx:-0.55,lRz:0.75,hRz:-0.15,cRx:-0.05},help:{aRx:-1.0,lRx:-0.75,cRx:0.35,hRx:0.4,lRz:-0.1}};
const K5CH=['aRx','aRz','lRx','lRz','cRx','cRy','cRz','hRx','hRy','hRz','hip'];
function k5Actor(KS){const B=KS.rig,rest={};const J={aR:KS.armR,lR:B.armL2,c:B.chest,h:KS.head,hip:B.hips};for(const k in J)if(J[k])rest[k]={x:J[k].rotation.x,y:J[k].rotation.y,z:J[k].rotation.z,py:J[k].position.y};
  const A={on:false,x:{},v:{},tg:{},k:120,c:14,anticT:0,anticTg:null,shake:0,laugh:0,mouth:B.mouth||null,m0:B.mouth?B.mouth.scale.y:1};K5CH.forEach(c=>{A.x[c]=0;A.v[c]=0;A.tg[c]=0;});
  A.pose=(name,o)=>{o=o||{};const P=K5POSE[name]||{};const tg={};K5CH.forEach(c=>{tg[c]=P[c]||0;});A.k=o.k||(o.snap?190:110);A.c=o.c||(o.snap?17:13.5);
    if(o.antic){A.anticT=o.antic;A.anticTg={};K5CH.forEach(c=>{A.anticTg[c]=A.x[c]-(tg[c]-A.x[c])*(o.anticK||0.22);});}else A.anticT=0;A.tg=tg;A.on=true;CINE.emit('k5pose',{name});};
  A.set=(c,v)=>{A.tg[c]=v;A.on=true;};
  A.tick=dt=>{if(!A.on)return;const tg=A.anticT>0?A.anticTg:A.tg;if(A.anticT>0)A.anticT-=dt;
    K5CH.forEach(c=>{A.v[c]+=((tg[c]||0)-A.x[c])*A.k*dt-A.v[c]*A.c*dt;A.x[c]+=A.v[c]*dt;});
    const X=A.x,t=G.time,sh=A.shake>0?Math.sin(t*16)*0.22*Math.min(1,A.shake):0,lg=A.laugh>0?Math.abs(Math.sin(t*22))*0.09*Math.min(1,A.laugh):0;A.shake=Math.max(0,A.shake-dt);A.laugh=Math.max(0,A.laugh-dt);
    const r=rest;if(J.aR){J.aR.rotation.x=r.aR.x+X.aRx;J.aR.rotation.z=r.aR.z+X.aRz;}if(J.lR){J.lR.rotation.x=r.lR.x+X.lRx;J.lR.rotation.z=r.lR.z+X.lRz;}
    if(J.c){J.c.rotation.x=r.c.x+X.cRx-lg;J.c.rotation.y=r.c.y+X.cRy;J.c.rotation.z=r.c.z+X.cRz+Math.sin(t*1.3)*0.02;}
    if(J.h){J.h.rotation.x=r.h.x+X.hRx+lg*0.6;J.h.rotation.y=r.h.y+X.hRy+sh;J.h.rotation.z=r.h.z+X.hRz;}if(J.hip)J.hip.position.y=r.hip.py+X.hip;
    if(A.mouth){const S=ACT.speaker,talk=S&&S.who==='koschei'&&S.until>G.time;A.mouth.scale.y=talk?A.m0*(0.6+1.4*Math.abs(Math.sin(t*13))):A.m0*(1+lg*6);}};
  A.reset=()=>{A.on=false;A.anticT=0;K5CH.forEach(c=>{A.x[c]=0;A.v[c]=0;A.tg[c]=0;});A.shake=0;A.laugh=0;const r=rest;
    for(const k in J)if(J[k]&&r[k]){J[k].rotation.set(r[k].x,r[k].y,r[k].z);J[k].position.y=r[k].py;}if(A.mouth)A.mouth.scale.y=A.m0;};
  return A;}
FIN.k5actor=k5Actor;
/* ---------- звук роликов 5-Б2 (по отзыву 2): тональный пад под настроение, позы и шаги Кощея, акценты событий ----------
   Под каждым роликом Кощея — тихий аккорд (ля минор боевой музыки уровня и его родня): холодный — ре минор, тёмный — ля минор,
   сказ — фа мажор, тёплый — до мажор, золотой — фа мажор с большой септимой; смена настроения в ролике плавно перестраивает аккорд,
   пока звучит голос — пад приглушается. Позы Кощея звучат (шорох плаща, восходящий звон чар, низкий рык угрозы, диссонанс отшатнулся,
   нисходящий вздох поник), шаги — костяной стук; события роликов — свои звуки (k5s: reveal, shatter, story, name, chain, anvil …). */
const K5PAD={on:false,o:[],g:null,col:null};
const K5PADCH={'#6f86ff':[50,57,65,74],'#7a5cff':[45,52,60,64],'#a8b0ff':[53,60,69,72],'#ffb870':[48,55,64,67],'#ffd27a':[53,60,64,69],'#c8a0ff':[45,52,60,64]};
const k5Hz=m=>440*Math.pow(2,(m-69)/12);
const k5PadN=col=>K5PADCH[String(col||'').toLowerCase()]||K5PADCH['#7a5cff'];
function k5PadOn(col){if(K5PAD.on||!AUD.ready())return;const t=AC.currentTime,g=AC.createGain(),f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=820;f.Q.value=0.6;
  g.gain.setValueAtTime(0.0001,t);g.gain.setTargetAtTime(0.028,t,0.6);f.connect(g);g.connect(master);if(AUD.revIn){const w=AC.createGain();w.gain.value=0.5;g.connect(w);w.connect(AUD.revIn);}
  const lfo=AC.createOscillator(),lg=AC.createGain();lfo.frequency.value=0.17;lg.gain.value=300;lfo.connect(lg);lg.connect(f.frequency);lfo.start(t);
  K5PAD.o=k5PadN(col).map((m,i)=>{const o=AC.createOscillator(),og=AC.createGain();o.type=i===0?'triangle':'sine';o.frequency.value=k5Hz(m);o.detune.value=i%2?7:-7;og.gain.value=i===0?0.55:0.3;o.connect(og);og.connect(f);o.start(t);return o;});
  K5PAD.lfo=lfo;K5PAD.g=g;K5PAD.col=col;K5PAD.on=true;K5PAD.duck=1;}
function k5PadTo(col){if(!K5PAD.on||!col||col===K5PAD.col||!AC)return;K5PAD.col=col;const t=AC.currentTime;
  k5PadN(col).forEach((m,i)=>{const o=K5PAD.o[i];if(!o)return;o.frequency.cancelScheduledValues(t);o.frequency.setValueAtTime(o.frequency.value,t);o.frequency.exponentialRampToValueAtTime(k5Hz(m),t+1.4);});}
function k5PadOff(){if(!K5PAD.on||!AC)return;K5PAD.on=false;const t=AC.currentTime,g=K5PAD.g;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(Math.max(0.0001,g.gain.value),t);g.gain.setTargetAtTime(0.0001,t,0.35);
  K5PAD.o.concat([K5PAD.lfo]).forEach(o=>{try{o.stop(t+1.8);}catch(e){}});K5PAD.o=[];}
function k5PadTick(){if(!K5PAD.on)return;if(!G.cine){k5PadOff();return;}const d=(FIN.voxDuck||1)<0.99?0.45:1;if(Math.abs(d-K5PAD.duck)>0.01){K5PAD.duck=d;try{K5PAD.g.gain.setTargetAtTime(0.028*d,AC.currentTime,0.18);}catch(e){}}}
{const _dir=CINE.direct;CINE.direct=function(cd){_dir(cd);const D=cd.def&&cd.def.k5;if(D)k5PadOn(D.mood?D.mood[0]:'#7a5cff');};}
{const _mood=CINE.mood;CINE.mood=function(col){if(K5PAD.on)k5PadTo(col);return _mood.apply(this,arguments);};}
CINE.on('end',()=>k5PadOff());
// звуки поз, шагов и событий роликов (синтез, как остальные эффекты)
const k5cloth=(v,f)=>AUD.nz({type:'bandpass',f0:(f||1)*450,f1:(f||1)*1500,d:0.3,v:v||0.05,q:1.1,a:0.07});
Object.assign(K5S,{
  pCast:()=>{k5cloth(0.05);AUD.osc({f0:330,f1:1320,d:0.6,v:0.03,glide:0.5,wet:0.6});for(let i=0;i<4;i++)AUD.bell(rand(1500,2600),{v:0.012,d:0.5,at:0.12+i*0.05,wet:0.7,pan:rand(-0.5,0.5)});},
  pThreat:()=>{k5cloth(0.06,0.8);AUD.osc({type:'sawtooth',f0:65,f1:55,d:0.8,v:0.05,lp:380,trem:13,wet:0.3});AUD.osc({type:'sawtooth',f0:98,f1:92,d:0.7,v:0.02,lp:500});},
  pRecoil:()=>{k5cloth(0.07,1.3);AUD.osc({type:'sawtooth',f0:233,d:0.45,v:0.03,lp:1500,wet:0.4});AUD.osc({type:'sawtooth',f0:247,d:0.45,v:0.03,lp:1500,wet:0.4});AUD.nz({type:'highpass',f0:3000,d:0.06,v:0.06,a:0.002});},
  pSigh:()=>{AUD.nz({type:'bandpass',f0:900,f1:280,d:1.0,v:0.035,q:0.8,a:0.25});AUD.osc({type:'triangle',f0:330,f1:196,d:1.0,v:0.022,glide:0.9,wet:0.5});},
  pSit:()=>{k5cloth(0.045,0.7);AUD.thump({f0:95,f1:48,d:0.25,v:0.12,at:0.25});AUD.nz({type:'lowpass',f0:600,f1:150,d:0.3,v:0.04,at:0.25});},
  pProud:()=>{k5cloth(0.045);[110,82.4].forEach((f,i)=>AUD.osc({type:'sawtooth',f0:f,d:0.35,v:0.03,lp:700,at:i*0.2,wet:0.4}));},
  pShrug:()=>{k5cloth(0.035,1.2);AUD.osc({f0:300,f1:420,d:0.15,v:0.03});AUD.osc({f0:420,f1:290,d:0.18,v:0.03,at:0.18});},
  pSoft:()=>{k5cloth(0.03,0.9);},
  step:()=>{AUD.nz({type:'bandpass',f0:1700,q:5,d:0.05,v:0.03,a:0.001});AUD.thump({f0:105,f1:60,d:0.12,v:0.07});},
  laugh:()=>{for(let i=0;i<4;i++){AUD.osc({type:'sawtooth',f0:62-i*3,f1:52-i*3,d:0.18,v:0.04,lp:520,at:i*0.22,wet:0.5});AUD.nz({type:'bandpass',f0:420,q:3,d:0.14,v:0.02,a:0.01,at:i*0.22});}},
  reveal:()=>{AUD.nz({type:'highpass',f0:1800,f1:6500,d:1.3,v:0.035,a:1.1,wet:0.6});[45,52,60,63].forEach((m,i)=>AUD.osc({type:'sawtooth',f0:k5Hz(m),d:2.6,v:0.014,a:0.9,lp:760,wet:0.7,at:i*0.04}));AUD.thump({f0:70,f1:32,d:1.1,v:0.22,at:1.1});},
  dawn:()=>{[69,76,81,84,88].forEach((m,i)=>AUD.bell(k5Hz(m),{v:0.018,d:1.6,at:0.4+i*0.32,wet:0.8,pan:(i-2)*0.3}));AUD.nz({type:'highpass',f0:2500,f1:5000,d:3,v:0.02,a:1.5,wet:0.7});},
  book:()=>{AUD.thump({f0:180,f1:90,d:0.12,v:0.1});AUD.nz({type:'bandpass',f0:1200,f1:500,d:0.18,v:0.05,q:1.5,a:0.003});},
  shatter:()=>{for(let i=0;i<16;i++)AUD.bell(rand(2200,5200),{v:0.016,d:0.45,at:0.02+i*rand(0.015,0.04),wet:0.5,pan:rand(-0.9,0.9)});AUD.nz({type:'highpass',f0:2600,f1:7000,d:0.6,v:0.08,a:0.002,wet:0.4});AUD.thump({f0:120,f1:36,d:0.6,v:0.3});},
  story:()=>{[65,69,72,77,81,84].forEach((m,i)=>AUD.osc({type:'triangle',f0:k5Hz(m),d:0.9,v:0.02,a:0.005,at:i*0.11,wet:0.7,pan:(i-2.5)*0.25}));AUD.nz({type:'highpass',f0:4000,d:1.4,v:0.015,a:0.5,wet:0.7});},
  name:()=>{[72,76,79,84].forEach((m,i)=>AUD.bell(k5Hz(m),{v:0.035,d:1.4,at:i*0.08,wet:0.6,pan:(i-1.5)*0.3}));[60,64,67].forEach(m=>AUD.osc({type:'triangle',f0:k5Hz(m),d:1.4,v:0.03,a:0.03,at:0.3,wet:0.5}));AUD.nz({type:'highpass',f0:3500,f1:8000,d:1.0,v:0.03,a:0.3,wet:0.6});},
  zven:()=>{AUD.osc({f0:900,f1:1800,d:0.35,v:0.025,glide:0.3,vib:0.03,vibF:18,wet:0.5});AUD.bell(2093,{v:0.02,d:0.6,at:0.25,wet:0.6});},
  stomp:()=>{AUD.thump({f0:100,f1:38,d:0.45,v:0.3});AUD.nz({type:'lowpass',f0:900,f1:120,d:0.45,v:0.1,a:0.004});},
  blink:()=>{AUD.osc({f0:1700,f1:300,d:0.25,v:0.035});AUD.nz({type:'highpass',f0:5200,d:0.2,v:0.04,a:0.002});},
  tink:()=>{AUD.bell(3136,{v:0.04,d:0.5,wet:0.4});AUD.bell(4186,{v:0.025,d:0.4,at:0.07,wet:0.4});AUD.nz({type:'highpass',f0:4500,d:0.06,v:0.05,a:0.001});},
  chain:()=>{for(let i=0;i<4;i++){AUD.nz({type:'bandpass',f0:rand(2200,3600),q:7,d:0.06,v:0.06,a:0.001,at:i*0.13});AUD.bell(rand(1400,2000),{v:0.012,d:0.25,at:i*0.13,wet:0.3});}},
  anvil:()=>{AUD.bell(1318,{v:0.07,d:1.2,wet:0.5});AUD.bell(1975,{v:0.04,d:1.0,wet:0.5});AUD.thump({f0:140,f1:60,d:0.25,v:0.2});AUD.nz({type:'bandpass',f0:3200,q:4,d:0.06,v:0.12,a:0.001});},
  magic:()=>{for(let i=0;i<8;i++)AUD.bell(k5Hz([79,84,86,88,91,93,96,98][i]),{v:0.014,d:0.7,at:i*0.07,wet:0.75,pan:Math.sin(i)*0.6});AUD.nz({f0:600,f1:3000,d:1.4,v:0.025,q:3,a:0.4,wet:0.6});},
  chainClose:()=>{[53,60,64,69,72,76].forEach((m,i)=>AUD.osc({type:'triangle',f0:k5Hz(m),d:3.2,v:0.03,a:0.08+i*0.03,wet:0.7}));for(let i=0;i<10;i++)AUD.bell(rand(1800,4200),{v:0.02,d:1.2,at:0.1+i*0.09,wet:0.7,pan:rand(-0.8,0.8)});AUD.thump({f0:90,f1:40,d:0.8,v:0.3});},
  leaves:()=>{AUD.nz({type:'highpass',f0:2600,f1:4800,d:1.6,v:0.04,a:0.3,wet:0.4,pan0:-0.6,pan1:0.6});},
  bolt:()=>{AUD.nz({type:'highpass',f0:2400,f1:500,d:0.35,v:0.16,a:0.001});AUD.thump({f0:80,f1:30,d:0.9,v:0.3});AUD.nz({type:'lowpass',f0:600,f1:60,d:2.2,v:0.13,a:0.05,wet:0.5});},
  whooshBig:()=>{AUD.nz({f0:250,f1:2600,f2:400,d:0.6,q:1.4,v:0.1,a:0.05,pan0:-0.7,pan1:0.7,wet:0.3});}});
const K5POSE_SND={cast:'pCast',castR:'pCast',point:'pThreat',threat:'pThreat',recoil:'pRecoil',slump:'pSigh',kneel:'pSigh',sit:'pSit',proud:'pProud',sword:'pSoft',guard:'pSoft',offer:'pSoft',help:'pSoft',listen:'pSoft',shrug:'pShrug'};
CINE.on('k5pose',d=>{if(!G.cine)return;const s=K5POSE_SND[d.name];if(s)k5s(s);});
/* ---------- отзыв 3: природа, которой повелевает Кощей — ветер, землетрясение, костлявые руки ----------
   Ветер виден струями (инстансы тонких светлых полос летят по ветру) и пылью с листьями; два вида: «вдоль» (этап 2 — слева
   направо или справа налево) и «от точки» (этап 5 — от наковальни во все стороны). Сила ветра 0…1 (k) задаёт уровень, толкает
   героев — сам уровень (late_93). Костлявая рука вылезает из треснувшей земли, растопырив пальцы, и сжимает их — хватает героя. */
const K5WIND={k:0,mode:'lin',dir:new V3(1,0,0),c:new V3(),mesh:null,data:null,dustT:0,leafT:0};
const K5W_M=new THREE.Matrix4(),K5W_Q=new THREE.Quaternion(),K5W_S=new V3(),K5W_P=new V3(),K5W_Y=new V3(0,1,0);
function k5WindMesh(){if(K5WIND.mesh&&K5WIND.mesh.parent)return K5WIND.mesh;const N=120,m=new THREE.InstancedMesh(new THREE.BoxGeometry(1,0.04,0.04),k5Add(0xf2f6ff,{opacity:0}),N);
  m.frustumCulled=false;m.raycast=()=>{};k5Prop(m);K5WIND.mesh=m;K5WIND.data=[];for(let i=0;i<N;i++)K5WIND.data.push({u:Math.random(),v:Math.random(),y:rand(0.2,3.4),sp:rand(0.85,1.3),len:rand(0.9,2.2),w:rand(0,6.28)});return m;}
function k5WindTick(dt,C0){const W0=K5WIND;if(W0.k<0.01){if(W0.mesh)W0.mesh.visible=false;return;}const m=k5WindMesh();m.visible=true;m.material.opacity=0.42*Math.min(1,W0.k*1.3);
  const d=W0.dir,px=-d.z,pz=d.x;
  W0.data.forEach((q,i)=>{let x,z,yaw;
    if(W0.mode==='lin'){q.u+=dt*q.sp*(0.55+0.65*W0.k)*0.9;if(q.u>1)q.u-=1;x=C0.x+d.x*(q.u-0.5)*34+px*(q.v-0.5)*30;z=C0.z+d.z*(q.u-0.5)*34+pz*(q.v-0.5)*30;yaw=-Math.atan2(d.z,d.x);}
    else{q.u+=dt*q.sp*(0.5+0.7*W0.k)*1.1;if(q.u>1)q.u-=1;const a=q.v*Math.PI*2,r=1.2+q.u*15;x=W0.c.x+Math.cos(a)*r;z=W0.c.z+Math.sin(a)*r;yaw=-a;}
    const fade=Math.sin(Math.PI*q.u);K5W_P.set(x,q.y+Math.sin(G.time*3+q.w)*0.15,z);K5W_Q.setFromAxisAngle(K5W_Y,yaw);K5W_S.set(q.len*(0.4+0.9*W0.k)*fade+0.01,1,1);
    K5W_M.compose(K5W_P,K5W_Q,K5W_S);m.setMatrixAt(i,K5W_M);});m.instanceMatrix.needsUpdate=true;
  W0.dustT-=dt;if(W0.dustT<=0&&W0.k>0.35){W0.dustT=0.16/W0.k;const p=W0.mode==='lin'?new V3(C0.x-d.x*rand(4,13)+px*rand(-10,10),0.1,C0.z-d.z*rand(4,13)+pz*rand(-10,10)):(()=>{const a=rand(0,6.28),r=rand(2,9);return new V3(W0.c.x+Math.cos(a)*r,0.1,W0.c.z+Math.sin(a)*r);})();FX.dust(p,4,0xb8a888,0.7);}
  W0.leafT-=dt;if(W0.leafT<=0&&W0.k>0.5){W0.leafT=0.5/W0.k;const a=rand(0,6.28);FX.leaves(new V3(C0.x+Math.cos(a)*rand(2,10),rand(0.6,2.4),C0.z+Math.sin(a)*rand(2,10)),3);}}
// костлявая рука: предплечье из двух костей, ладонь, пять пальцев по кругу; H.set(1) — растопырена вверх, H.set(0) — сжата внутрь
function k5HandMake(p){const g=k5Prop(new THREE.Group());g.position.set(p.x,-2.2,p.z);g.rotation.y=rand(0,6.28);const bone=M(0xe6dcc0,{emissive:0x3a3020,emissiveIntensity:0.25}),dk=M(0x8a7a60);
  for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.CylinderGeometry(0.055,0.075,1.15,6),bone);b.position.set(s*0.07,0.58,0);b.rotation.z=s*0.05;g.add(b);}
  const wr=new THREE.Mesh(new THREE.SphereGeometry(0.13,8,6),bone);wr.position.y=1.18;wr.scale.set(1.2,0.7,1);g.add(wr);
  const palm=new THREE.Mesh(new THREE.CylinderGeometry(0.21,0.15,0.16,7),bone);palm.position.y=1.3;g.add(palm);
  const fingers=[];for(let i=0;i<5;i++){const a=i/5*Math.PI*2+(i===0?0.25:0),f=new THREE.Group();f.position.set(Math.cos(a)*0.17,1.36,Math.sin(a)*0.17);f.rotation.y=-a;g.add(f);
    const len=i===0?0.2:0.26;const s1=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.04,len,5),bone);s1.position.y=len/2;f.add(s1);const kn=new THREE.Mesh(new THREE.SphereGeometry(0.045,6,5),dk);kn.position.y=len;f.add(kn);
    const f2=new THREE.Group();f2.position.y=len;f.add(f2);const s2=new THREE.Mesh(new THREE.ConeGeometry(0.035,len*0.95,5),bone);s2.position.y=len*0.47;f2.add(s2);fingers.push({f,f2});}
  const H={g,fingers,open:1,t:0,grab:null,dead:false};H.set=k=>{for(const q of fingers){q.f.rotation.z=lerp(0.8,-0.6,k);q.f2.rotation.z=lerp(1.0,-0.25,k);}};H.set(1);return H;}
Object.assign(K5S,{
  wind:()=>{AUD.nz({f0:300,f1:900,f2:420,d:4.6,v:0.07,q:0.8,a:0.9,pan0:-0.9,pan1:0.9,wet:0.4});AUD.nz({type:'highpass',f0:2200,f1:3800,d:4.2,v:0.025,a:1.2,wet:0.5});},
  gale:()=>{AUD.nz({f0:220,f1:700,f2:300,d:6,v:0.09,q:0.7,a:1.2,wet:0.5});AUD.nz({type:'lowpass',f0:500,f1:160,d:6,v:0.06,a:1.5});AUD.osc({type:'sawtooth',f0:62,f1:58,d:5,v:0.02,lp:300,trem:2,wet:0.5});},
  quake:()=>{AUD.nz({type:'lowpass',f0:260,f1:60,d:1.6,v:0.18,a:0.08,wet:0.3});for(let i=0;i<5;i++)AUD.thump({f0:rand(60,90),f1:28,d:0.35,v:0.16,at:i*rand(0.18,0.3)});},
  crack:()=>{AUD.nz({type:'bandpass',f0:900,f1:300,d:0.4,v:0.07,q:2,a:0.005});AUD.nz({type:'highpass',f0:3000,d:0.08,v:0.05,a:0.001,at:0.1});},
  handUp:()=>{AUD.thump({f0:110,f1:40,d:0.35,v:0.22});AUD.nz({type:'lowpass',f0:1400,f1:200,d:0.4,v:0.1,a:0.003});for(let i=0;i<5;i++)AUD.nz({type:'bandpass',f0:rand(1600,2600),q:6,d:0.04,v:0.05,a:0.001,at:0.05+i*0.04});},
  grab:()=>{for(let i=0;i<4;i++)AUD.nz({type:'bandpass',f0:rand(1800,3000),q:7,d:0.05,v:0.07,a:0.001,at:i*0.03});AUD.osc({type:'triangle',f0:240,f1:120,d:0.3,v:0.05});}});
FIN.k5nat={K5WIND,k5HandMake};
