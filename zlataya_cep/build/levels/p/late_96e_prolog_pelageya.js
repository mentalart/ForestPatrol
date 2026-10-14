/* ============================== РЕЛИЗ final06 · ПРОЛОГ: ПЕЛАГЕЯ НЕ ПОМНИТ КОЛЫБЕЛЬНУЮ ============================== */
// В ролике «Колыбельная» Тишка забывал слова, Пелагея молча «убирала» тетрадку: тетрадка летела со стола к ней за спину —
// насквозь через голову, и момент был непонятен. Теперь тетрадка лежит на столе, а Пелагея — сказительница, которая знает
// сказки только по тетрадке, — отвечает по-своему: глядит в тетрадку (колыбельной там нет), поднимает перо и чешет им за
// ушком, вспоминая («?»), не вспоминает — смущается (щёки розовеют, ушки прижаты, прикрывает клюв крылом, отворачивается),
// набирает воздуху и тихо вздыхает («…», облачко у клюва). Всё молча, без реплик.
// Перо Пелагея держит в правом крыле весь ролик; кончик пера, когда она чешется, приставлен к точке за ухом снаружи головы
// (перо скользит в «ладони»), — ни перо, ни крылья не входят в голову (проверяет бот tfin_pelnote).
// Позы — добавочные каналы поверх костей (как late_83/late_96): снимаются в начале кадра, кладутся в конце; поза — функция
// времени ролика (пропуск и перемотка дают ту же картину). Ролик оборачивается поверх FIN.lulGag (late_96, late_96b).
const PQ={on:false,T:-1,h:null,ch:null,quill:null,blush:[],puff:[],grip:new V3(),tgt:new V3(),dir:new V3()};
const PQ_T0=7.8;   // план на Пелагею — раньше (был с 8,2): Тишка договорил, до Прошки 3,6 с
// точка за правым ухом (оси кости головы) — сюда кончик пера; полуоси головы для проверки ботом
const PQ_EAR=new V3(-0.22,0.16,-0.13),PQ_HEAD=[0.297,0.238,0.257],PQ_QL=0.4;
function pqQuill(){const g=new THREE.Group(),m=(c,o)=>new THREE.MeshLambertMaterial(Object.assign({color:c},o||{}));
  const sh=new THREE.Mesh(new THREE.CylinderGeometry(0.006,0.009,PQ_QL+0.03,5),m(0xd8a640));sh.position.y=(PQ_QL-0.03)/2;g.add(sh);
  const nib=new THREE.Mesh(new THREE.ConeGeometry(0.008,0.04,5),m(0x2a2030));nib.rotation.x=Math.PI;nib.position.y=-0.045;g.add(nib);
  // опахало — белое с золотым стволом, кончик сиреневый (на сиреневой Пелагее перо видно издали)
  for(const[y,sy,sx,c]of[[0.2,0.13,0.05,0xfff8ec],[0.345,0.05,0.032,0xc49ae0]]){const v=new THREE.Mesh(new THREE.SphereGeometry(1,10,6),m(c,{emissive:c,emissiveIntensity:0.25}));
    v.scale.set(sx,sy,0.008);v.position.y=y;g.add(v);}
  g.traverse(o=>{o.castShadow=true;o.userData.batchNo=true;o.userData.noBatchL=true;});return g;}
const pqS=(T,a,b)=>smooth(clamp((T-a)/(b-a),0,1));
// поза в момент T: добавки к костям (поворот x/y/z; у груди — подъём и растяжение), вес пера (0 — в крыле, 1 — за ухом), румянец
function pqPose(T){const P={wR:[0,0,0],wL:[0,0,0],hd:[0,0,0],ear:0,lid:0,brow:0,ch:0,cy:0,aim:0,blush:0,puff:-1,sc:0};
  const S=pqS,add=(a,v,k)=>{a[0]+=v[0]*k;a[1]+=v[1]*k;a[2]+=v[2]*k;};
  // держит перо у груди, «наготове» — весь ролик
  P.wR[0]=-0.35;
  if(T<PQ_T0-0.2||T>12.6)return P;
  // А. 7,8–8,5: глядит в тетрадку на столе — колыбельной там нет
  const look=S(T,PQ_T0,8.25)*(1-S(T,8.45,8.8));add(P.hd,[0.38,0,-0.06],look);P.brow+=0.02*look;
  // Б. замах (перо чуть назад) и подъём крыла к голове: 8,6–9,1; чешется 9,1–9,95; опускает 9,95–10,3
  const up=S(T,8.75,9.1)*(1-S(T,9.95,10.3)),wind=S(T,8.5,8.7)*(1-S(T,8.7,8.85));
  P.wR[0]+=0.4*wind+(-3.2+0.35)*up;P.wR[2]+=-0.08*up;P.aim=S(T,8.8,9.12)*(1-S(T,9.9,10.15));
  const scr=T>9.1&&T<9.95?Math.sin((T-9.1)*Math.PI*2*4.6)*S(T,9.1,9.2)*(1-S(T,9.85,9.95)):0;P.sc=scr;P.wR[2]+=0.08*scr;
  // глаза к небу, голова — к перу: вспоминает
  const think=S(T,8.55,8.95)*(1-S(T,9.95,10.25));add(P.hd,[-0.2,0.05,-0.2],think);P.hd[2]+=-0.05*scr;P.brow+=0.03*think;
  // В. 10,0–10,35: не вспомнила — смущается: ушки прижаты, веки ниже, щёки розовеют, левое крыло к клюву, отворачивается
  const shy=S(T,10.0,10.3),shyOut=1-S(T,11.0,11.9);
  P.ear=-0.55*shy*shyOut;P.lid=0.35*shy*(1-S(T,11.4,12.2));P.blush=shy*(1-S(T,11.8,12.6));P.brow+=-0.015*shy*shyOut;
  const cover=S(T,10.02,10.3)*(1-S(T,10.55,10.95));add(P.wL,[-1.9,0,-0.62],cover);
  add(P.hd,[0.22,0.24,0.14],shy*(1-S(T,10.75,11.3)));
  // Г. 10,4–10,75: набирает воздуху (грудь вверх) — 10,75–11,35: выдох, плечи и голова опускаются, облачко у клюва
  const inh=S(T,10.4,10.72)*(1-S(T,10.75,11.0)),exh=S(T,10.78,11.15)*(1-S(T,11.6,12.4));
  P.ch=0.06*inh-0.05*exh;P.cy=0.022*inh-0.015*exh;P.hd[0]+=-0.1*inh+0.3*exh;P.hd[1]+=0.12*exh;P.lid+=0.25*exh;
  P.wR[2]+=-0.12*exh;P.wL[2]+=0.12*exh;if(T>=10.8&&T<11.6)P.puff=(T-10.8)/0.8;
  return P;}
function pqRestore(){const c=PQ.ch;if(!c)return;for(const k in c)aRestore(c[k]);}
function pqApply(){if(!PQ.on||!PQ.h||!PQ.ch)return;const h=PQ.h,B=h.parts.rig,c=PQ.ch,P=pqPose(PQ.T);
  c.wR.nr.set(P.wR[0],P.wR[1],P.wR[2]);c.wL.nr.set(P.wL[0],P.wL[1],P.wL[2]);c.hd.nr.set(P.hd[0],P.hd[1],P.hd[2]);
  c.eL.nr.x=P.ear;c.eR.nr.x=P.ear;c.lL.nr.x=P.lid*3.25;c.lR.nr.x=P.lid*3.25;c.bL.np.y=P.brow;c.bR.np.y=P.brow;
  const sy=1+P.ch,sx=1/Math.sqrt(sy);c.chest.ns.set(sx,sy,sx);c.chest.np.y=P.cy;
  for(const k in c)aApply(c[k]);
  h.g.updateMatrixWorld(true);
  // перо: держит у кончика крыла; при aim → кончик опахала ровно в точку за ухом (перо скользит в «ладони»)
  const q=PQ.quill;if(q){const wq=new THREE.Quaternion();B.wingR.getWorldQuaternion(wq);const grip=B.wingR.localToWorld(PQ.grip.set(0,-0.45,0.03));
    const rest=new V3(0,0.45,1).normalize().applyQuaternion(wq);let base;
    if(P.aim>0){const tg=B.head.localToWorld(PQ.tgt.set(PQ_EAR.x,PQ_EAR.y+0.05*P.sc,PQ_EAR.z));const aim=tg.clone().sub(grip).normalize();
      const d=rest.clone().lerp(aim,P.aim).normalize();PQ.dir.copy(d);base=grip.clone().addScaledVector(d,-0.05).lerp(tg.clone().addScaledVector(d,-PQ_QL),P.aim);}
    else{PQ.dir.copy(rest);base=grip.clone().addScaledVector(rest,-0.05);}
    q.position.copy(base);q.quaternion.setFromUnitVectors(new V3(0,1,0),PQ.dir);q.visible=true;}
  for(const b of PQ.blush){b.material.opacity=P.blush;b.visible=P.blush>0.01;}
  const bk=B.beak.localToWorld(new V3(0,0,0.1)),fw=new V3(0,0,1).applyQuaternion(B.head.getWorldQuaternion(new THREE.Quaternion()));
  PQ.puff.forEach((p,i)=>{const u=P.puff-i*0.12;p.visible=P.puff>=0&&u>0&&u<1;if(!p.visible)return;p.position.copy(bk).addScaledVector(fw,0.05+u*0.3);p.position.y+=-0.03+u*0.05+i*0.015;
    p.scale.setScalar(0.025+u*0.05);p.material.opacity=0.55*Math.sin(Math.PI*u);});}
{const _st=step;step=function(dt){pqRestore();_st(dt);pqApply();};}
function pqOff(){pqRestore();PQ.on=false;PQ.T=-1;for(const o of[PQ.quill].concat(PQ.puff,PQ.blush))if(o&&o.parent)o.parent.remove(o);PQ.quill=null;PQ.puff=[];PQ.blush=[];PQ.ch=null;}
{const _ll=loadLevel;loadLevel=function(i){PQ.on=false;PQ.ch=null;PQ.quill=null;PQ.puff=[];PQ.blush=[];_ll(i);};}
FIN.pelNote=()=>{const h=PQ.h;if(!PQ.on||!h)return {on:false};const B=h.parts.rig,inv=new THREE.Matrix4().copy(B.head.matrixWorld).invert();
  // наибольшая «глубина» пера и кончиков крыльев внутри головы (значение эллипсоида < 1 — внутри)
  const ins=p=>{const l=p.clone().applyMatrix4(inv);return (l.x/PQ_HEAD[0])**2+(l.y/PQ_HEAD[1])**2+(l.z/PQ_HEAD[2])**2;};let mq=9;
  if(PQ.quill)for(let k=0;k<=10;k++)mq=Math.min(mq,ins(PQ.quill.position.clone().addScaledVector(PQ.dir,PQ_QL*k/10)));
  let mw=9;for(const w of[B.wingL,B.wingR])for(let k=3;k<=10;k++)mw=Math.min(mw,ins(w.localToWorld(new V3(0,-0.054*k,0))));
  const nb=PN.ctx?PN.ctx.nb.g.position:null;return {on:true,T:PQ.T,quill:+mq.toFixed(3),wings:+mw.toFixed(3),nb:nb?[+nb.x.toFixed(2),+nb.y.toFixed(2),+nb.z.toFixed(2)]:null,
    tip:PQ.quill?+PQ.quill.position.clone().addScaledVector(PQ.dir,PQ_QL).distanceTo(B.head.localToWorld(PQ_EAR.clone())).toFixed(3):-1,blush:+(PQ.blush[0]?PQ.blush[0].material.opacity:0).toFixed(2)};};
{const _lg=FIN.lulGag;FIN.lulGag=function(def,ctx){def=_lg(def,ctx);try{
  const h=HERO.pelageya,B=h&&h.parts&&h.parts.rig;if(!B||!B.wingR||!B.head)return def;const near=(a,b)=>Math.abs(a-b)<0.02;
  // прежние: «…» с болтающим клювом (8,6) и тетрадка, летящая сквозь Пелагею (9,8) — убраны; тетрадка остаётся на столе
  def.events=def.events.filter(e=>!near(e.t,8.6)&&!near(e.t,9.8));
  // план на Пелагею — с 7,8, медленный наезд до крупного
  def.shots=def.shots.map(s=>near(s.t,8.2)?shot(PQ_T0,[1.5,1.7,-0.2],[3.6,0.95,-2.6],[2.1,1.6,-1.0],[3.7,1.0,-2.75],3.6):s);
  pqOff();PQ.h=h;const A=aChan;PQ.ch={wR:A(B.wingR),wL:A(B.wingL),hd:A(B.head),eL:A(B.earL),eR:A(B.earR),lL:A(B.lidL),lR:A(B.lidR),bL:A(B.browL),bR:A(B.browR),chest:A(B.chest)};
  PQ.quill=pqQuill();W.group.add(PQ.quill);PQ.quill.visible=false;
  const bt=pnGlowTex('rgba(255,105,150,1)');for(const s of[-1,1]){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:bt,transparent:true,depthWrite:false,opacity:0}));
    sp.scale.setScalar(0.17);sp.position.set(s*0.16,-0.07,0.24);sp.visible=false;B.head.add(sp);PQ.blush.push(sp);}
  for(let i=0;i<3;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(1,8,6),new THREE.MeshBasicMaterial({color:0xf4f0ff,transparent:true,opacity:0,depthWrite:false}));p.visible=false;W.group.add(p);PQ.puff.push(p);}
  const live=t=>G.cine&&G.cine.t>=t-0.3;
  def.events.push(
    {t:9.15,fn:()=>{if(live(9.15))floatText(h.pos.clone().add(new V3(0,1.45,0)),'?','#e7c3ff');}},
    {t:9.2,fn:()=>{if(!live(9.2))return;for(let i=0;i<4;i++)AUD.nz({f0:3200,f1:5200,d:0.07,q:2,v:0.018,type:'bandpass',at:i*0.21});}},
    {t:10.02,fn:()=>{if(live(10.02))tone(880,0.09,'sine',0.03,1320);}},
    {t:10.42,fn:()=>{if(live(10.42))AUD.nz({f0:600,f1:1400,d:0.32,q:0.8,v:0.02,type:'bandpass',a:0.2});}},
    {t:10.78,fn:()=>{if(!live(10.78))return;AUD.nz({f0:1300,f1:380,d:0.85,q:0.7,v:0.035,type:'bandpass',a:0.08});floatText(h.pos.clone().add(new V3(0,1.4,0)),'…','#e7c3ff');}});
  def.events.sort((a,b)=>a.t-b.t);
  PQ.on=true;PQ.T=0;
  const tk=def.tick;def.tick=(t,dt)=>{PQ.T=t;tk(t,dt);};
  const end0=def.end;def.end=()=>{pqOff();if(end0)end0();};
}catch(e){console.error(e);}return def;};}
// метки режиссуры (late_86): «поникла» на 8,7 — больше не нужна (реакцию ставит этот модуль)
{const e=DIR.find(x=>x.lv==='p'&&Math.abs(x.dur-43.4)<0.01);if(e)e.cues=e.cues.filter(q=>!(Math.abs(q[0]-8.7)<0.01));}
