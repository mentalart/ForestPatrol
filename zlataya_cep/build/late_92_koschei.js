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
// Подсказки — как у Горыныча: интерактивные карточки перед каждым этапом (движок t4Run) и живые подсказки в бою.
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
  if(f.t>=f.dur){K5FX.splice(i,1);try{if(f.end)f.end();}catch(e){console.error('k5fx end',e);}}}}
function k5Prop(o){o.userData.noBatch=true;o.userData.dress=true;o.traverse(q=>{q.userData.noBatch=true;q.userData.sty=true;q.castShadow=false;});W.group.add(o);return o;}
const k5Del=o=>{if(o&&o.parent)o.parent.remove(o);};
// красный круг: сюда ударит; fire(p) — в конце
function k5Zone(p,r,dur,col,fire){const g=k5Prop(new THREE.Group());g.position.set(p.x,0.06,p.z);
  const ring=new THREE.Mesh(new THREE.RingGeometry(r*0.88,r,36),MB(col,{transparent:true,opacity:0.9,side:THREE.DoubleSide,depthWrite:false}));ring.rotation.x=-Math.PI/2;g.add(ring);
  const fill=new THREE.Mesh(new THREE.CircleGeometry(r,36),MB(col,{transparent:true,opacity:0.32,side:THREE.DoubleSide,depthWrite:false}));fill.rotation.x=-Math.PI/2;fill.position.y=0.01;g.add(fill);
  K5.zones=(K5.zones||[]);K5.zones.push(g);
  k5fx(dur,k=>{fill.scale.setScalar(Math.max(0.02,k));ring.material.opacity=0.45+0.55*Math.abs(Math.sin(G.time*(5+k*16)));},()=>{k5Del(g);const i=K5.zones.indexOf(g);if(i>=0)K5.zones.splice(i,1);if(g.userData.dead)return;if(fire)fire(new V3(p.x,0,p.z));});return g;}
function k5Beam(p,col,h){const m=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.34,h||16,8),MB(col||0xd8b0ff,{transparent:true,opacity:0.95})));m.position.set(p.x,(h||16)/2,p.z);
  k5fx(0.35,k=>{m.material.opacity=0.95*(1-k);m.scale.set(1-k*0.6,1,1-k*0.6);},()=>k5Del(m));}
function k5Thread(from,to){const m=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,1,5),MB(COL.gold,{transparent:true,opacity:1})));
  k5fx(1.3,k=>{const a=from(),b=to(),d=b.clone().sub(a),L=d.length();m.position.copy(a).addScaledVector(d,0.5);m.scale.set(1,L,1);m.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());m.material.opacity=k<0.7?1:1-(k-0.7)/0.3;},()=>k5Del(m));}
function k5OrbMesh(r){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),MB(0x6a2ad0)));g.add(new THREE.Mesh(new THREE.SphereGeometry(r*1.7,12,10),MB(0xb070ff,{transparent:true,opacity:0.28,depthWrite:false})));
  const c=new THREE.Mesh(new THREE.SphereGeometry(r*0.45,8,6),MB(0xffe0ff));g.add(c);return k5Prop(g);}
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
