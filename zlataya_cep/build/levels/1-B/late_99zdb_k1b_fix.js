/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ПРАВКИ ПО АУДИТУ — РУКИ БЕЗ ГЛАЗ И НА ЗЕМЛЕ, ГОЛОС НЕ ОБРЫВАЕТСЯ И НЕ ПРОПАДАЕТ ============================== */
// Аудит 1-Б (журнал docs/changes): пункты А1–А3, А5, А7, А8, Ж1.
// А1. У рук-коряг нет глаз: облик `hand` без общих глаз мороков (foeFace, late_18_foes.js) и без светящихся шариков прототипа (makeFoe).
// А2. Урок 1 начинается сразу после появления рук, когда они ещё вылезают из земли (g.y от −1,5 до 0 за 0,8 с): показ («demo») ставит их на землю.
// А3. Ладонь не проваливается: после всех поз (замах, удар, «увязла», отдых, смахивание с моста) самый низкий коготь и дно ладони
//     поднимаются до земли (≥ −0,06 м — когти «Сгреба» чуть скребут траву); «увязла» и отдых больше не заваливают пальцы в землю.
// А5. Ролик не обрывает реплику, начатую в бою («Ну всё, довольно, хватит!» → «Ах так? Нате вам…»): ролик со своими репликами ждёт конца голоса.
// А7. Запись 1-Б, не успевшая раскодироваться за 0,45 с, не выбрасывается: звучит с того места, где была бы (если до конца больше 0,6 с);
//     записи первого ролика раскодируются первыми.
// А8. Пауза в ролике не гасит голос насовсем: после паузы реплика продолжается с места остановки.
// Ж1. Всплывающие надписи — в роде героя: у Пелагеи «Перепрыгнула!», «Увернулась!».
// Мост шире у ладони (16.10): настил руки-моста был 1,5 м шириной на всю длину, а сама рука на вид — почти 2 м; на первых метрах, где разбегаются
//     и заходят на мост сбоку, герой соскальзывал. Теперь первые 5,5 м — 3,2 м шириной (и мох-настил там шире), дальше — 2 м; пока рука лежит мостом,
//     ладонь не отталкивает героев (раньше отталкивала, если рука уже поднялась, а мост ещё держали).
const K1X={clamp:-0.06,lift:0,waitT:0,cineEnd:-9};K1B.fix=K1X;
/* ---------- А1: руки без глаз ---------- */
{const _fh=FL.hand;FL.hand=function(){const L=_fh.apply(this,arguments);L.noFace=true;return L;};}
{const _hd=K1B.hand;K1B.hand=function(e){_hd(e);const L=e.L,inner=e.inner;
  for(const c of inner.children.slice())if(c.isMesh&&(c.material===e.eyeMat||(c.material===MAT.dark&&Math.abs(c.position.y-L.eyeY)<1e-6)))inner.remove(c);};}
/* ---------- А2–А3: ладонь на земле ---------- */
const K1X_PTS=K1N_TIPS.map(p=>p.clone().add(new V3(0,0.05,0))).concat([new V3(0,-0.3,0.52),new V3(0.3,-0.25,0.7),new V3(-0.3,-0.25,0.7)]),K1X_V=new V3();
function k1xLow(e){e.g.updateMatrixWorld(true);let m=1e9;for(const p of K1X_PTS){K1X_V.copy(p);e.L.arm.localToWorld(K1X_V);if(K1X_V.y<m)m=K1X_V.y;}return m;}
function k1xGround(){const c=K1B.cur;if(!c||!W.enemies)return;let moved=false;
  for(const e of W.enemies){if(e.kind!=='hand'||!e.alive||!e.L||!e.L.arm||e.state==='dying')continue;
    if(e.state==='demo'&&e.pos.y<e.baseY)e.pos.y=e.baseY;   // урок поймал руку посреди появления
    if(e.state==='spawn')continue;
    const k1=e.k1;if(k1&&!k1.sweep&&(e.dazeT>0||k1.stuck||(k1.dp==='stuck')||k1.restK>0.01)){   // «увязла» и отдых: пальцы не в землю, а на неё
      const st=e.dazeT>0||k1.stuck||k1.dp==='stuck';e.L.arm.rotation.x=st?0.12+Math.sin(G.time*14)*0.05:Math.min(e.L.arm.rotation.x,0.08*(k1.restK||0));}
    const lo=k1xLow(e);if(lo<K1X.clamp){const d=(K1X.clamp-lo)/Math.max(0.001,e.g.scale.y);e.body.position.y+=d;moved=true;K1X.lift=Math.max(K1X.lift,d);}}
  if(moved&&typeof k1UpdateArms==='function')k1UpdateArms(c,1e-6);}   // рука от плеча — к поднятой кисти в этом же кадре
K1X.low=e=>k1xLow(e);
/* ---------- мост шире у ладони ---------- */
function k1xWide(){const c=K1B.cur;if(!c||!c.ramps)return;
  for(const r of c.ramps){if(r.k1w)continue;r.k1w=true;const rp=r.cols[0];if(!rp||!W.ramps)continue;rp.w=Math.max(rp.w,1.0);
    const L1=Math.min(5.5,rp.len*0.55),wide={x0:rp.x0,z0:rp.z0,y0:rp.y0,y1:rp.y0+(rp.y1-rp.y0)*L1/rp.len,dx:rp.dx,dz:rp.dz,len:L1,w:1.6,k1wide:true};
    const i=W.ramps.indexOf(rp);W.ramps.splice(i<0?W.ramps.length:i,0,wide);r.cols.push(wide);   // перед настилом: последние два в W.ramps — по-прежнему настил и площадка на плече
    if(r.g){const a=Math.atan2(rp.dx,rp.dz),sl=Math.atan2(wide.y1-wide.y0,L1),m=new THREE.Mesh(new THREE.BoxGeometry(3.2,0.08,L1/Math.cos(sl)),M(0x6aa338));
      m.position.set(rp.x0+rp.dx*L1/2,(wide.y0+wide.y1)/2+0.04,rp.z0+rp.dz*L1/2);m.rotation.set(0,a,0,'YXZ');m.rotation.x=-sl;m.raycast=()=>{};r.g.add(m);}}
  for(const e of W.enemies)if(e.kind==='hand'&&e.k1){const lay=c.ramps.some(r=>r.hand===e);if(lay!==!!e.k1ghost){e.k1ghost=lay;e.ghostly=lay;}}}   // для ботов: самая низкая точка ладони
{const _st=step;step=function(dt){_st(dt);if(!K1B.cur||!W||W.levelId!=='1-B')return;try{k1xWide();k1xGround();}catch(err){console.error('k1x',err);}};}
/* ---------- А5: ролик ждёт голос, начатый в бою ---------- */
const k1xVoxLeft=()=>{try{if(!VOX.cur||!AC)return 0;return Math.max(0,VOX.cur.end-AC.currentTime);}catch(err){return 0;}};
{const _pl=play;play=function(def){
  if(W&&W.levelId==='1-B'&&!G.cine&&def&&def.says&&def.says.length&&!def.k1wait&&VOX.cur&&VOX.cur.k1out){const rem=Math.min(3,k1xVoxLeft()),first=def.says[0][0]||0;   // ждём только реплику, начатую в бою (не в прошлом ролике)
    if(rem-first>0.15){def.k1wait=true;K1X.waitT+=rem-first;later(rem-first+0.1,()=>{if(W.levelId==='1-B'&&!G.cine)play(def);else _pl(def);});return;}}
  return _pl.apply(this,arguments);};}
CINE.on('end',()=>{K1X.cineEnd=G.time;});
// запись, начатая вне ролика (реплика в бою), помечена: только её ждёт следующий ролик
{const _vs=voxStart;voxStart=function(e,b){_vs(e,b);if(VOX.cur&&VOX.cur.e===e)VOX.cur.k1out=!G.cine;};}
/* ---------- А7: поздняя запись звучит с нужного места; первый ролик — первым ---------- */
function k1xStartAt(e,b,off){if(!b)return;voxStop(0.06);const s=AC.createBufferSource();s.buffer=b;const g=AC.createGain();g.gain.value=e.gain||1;s.connect(g);g.connect(voxBus());
  off=clamp(off||0,0,Math.max(0,b.duration-0.05));s.start(0,off);const c={s,g,e,end:AC.currentTime+b.duration-off,g0:G.time-off};VOX.cur=c;VOX.played=(VOX.played||0)+1;
  s.onended=()=>{if(VOX.cur===c)VOX.cur=null;};if(FIN.voxEv)try{FIN.voxEv(e.id,'main',1);}catch(err){}}
{const _vp=voxPlay;voxPlay=function(e){if(!e||!String(e.id).startsWith('1-B_')||e.buf||!voxOn())return _vp(e);
  const t0=G.time,cine=G.cine;voxDecode(e).then(b=>{if(!b)return;const late=G.time-t0;   // опоздание — по игровому времени: на нём стоят ролик и субтитр
    if(late<0.45){voxStart(e,b);return;}if(G.cine!==cine||late>e.dur-0.6||(VOX.cur&&VOX.cur.e!==e))return;K1X.late=(K1X.late||0)+1;k1xStartAt(e,b,late);});return true;};}
{const _vr=voxPrep;voxPrep=function(){if(AC&&W&&W.levelId==='1-B'){for(const id of['1-B_s01','1-B_s02','1-B_011','1-B_k01','1-B_k02'])
    {const e=VOX_LINES.find(q=>q.id===id);if(e)voxDecode(e);}}return _vr();};}
/* ---------- А8: пауза в ролике — голос продолжается после паузы ---------- */
// на паузе голос гасит late_91 (в render) — запоминаем, где он был; продолжаем в первом же шаге игры после паузы
{const _r=render;render=function(){
  if(VOX.cur&&G.state==='pause'&&W&&W.levelId==='1-B'&&G.cine&&AC){const c=VOX.cur,b=c.s&&c.s.buffer;if(b&&!K1X.held){const off=b.duration-(c.end-AC.currentTime);if(off>=0&&off<b.duration-0.3)K1X.held={e:c.e,b,off,cine:G.cine};}}
  _r();};}
{const _st=step;step=function(dt){if(K1X.held&&G.state==='play'){const h=K1X.held;K1X.held=null;if(G.cine===h.cine&&W.levelId==='1-B'&&voxOn()&&!VOX.cur)try{k1xStartAt(h.e,h.b,h.off);}catch(err){}}_st(dt);};}
/* ---------- Ж1: род героя во всплывающих надписях ---------- */
const K1X_FEM={'Перепрыгнул!':'Перепрыгнула!','Увернулся!':'Увернулась!','Отбил!':'Отбила!','Отвлёк!':'Отвлекла!'};
{const _ft=floatText;floatText=function(p,t,c){if(W&&W.levelId==='1-B'&&K1X_FEM[t]&&p&&HERO.pelageya){let best=null,bd=3.5;for(const h of HEROES){const d=Math.hypot(h.pos.x-p.x,h.pos.z-p.z);if(d<bd){bd=d;best=h;}}
    if(best===HERO.pelageya)t=K1X_FEM[t];}return _ft.call(this,p,t,c);};}
{const _ll=loadLevel;loadLevel=function(i){K1X.held=null;K1X.lift=0;_ll(i);};}
