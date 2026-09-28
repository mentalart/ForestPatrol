/* ============================== РЕЛИЗ final04 · КАМЕРА ПРАВЫМ СТИКОМ: орбита вокруг героя, наклон, автовозврат, столкновения ============================== */
// Дефолтная камера прототипа не меняется: орбита — поправка (поворот и наклон) поверх её позы в момент отрисовки; при нуле поза та же, что раньше.
// · Стик X — вращение вокруг героя (или середины пары), стик Y — наклон −10°…+50° от дефолта. Мёртвая зона 0,15 (радиальная), квадратичный
//   отклик, разгон ~0,1 с и инерционное торможение ~0,25 с. Чувствительность и инверсия осей — в «Настройках».
// · Сплит: у каждого игрока своя камера и свой стик. Общий экран: камеру ведут оба (сумма стиков), поворот ограничен ±55°, чтобы «вперёд»
//   у обоих оставалось узнаваемым. Одиночный режим: полный круг. Уровни со сценарной камерой (раннер, полёт) и ролики — без орбиты.
// · Левый стик и WASD — относительно того, куда смотрит своя камера (в переходе сплита — плавно между общей и своей).
// · Столкновения: если повёрнутая камера зашла за стену или в землю, она подъезжает к герою (быстро внутрь, медленно обратно).
//   Вес столкновений растёт вместе с поворотом — у дефолтной позы поведение прежнее.
// · Автовозврат к дефолту за 0,65 с (easeInOutCubic, по кратчайшему углу): при разделении и слиянии экрана, в начале и в конце ролика,
//   после падения и возвращения к колокольчику. Прерывается, если игрок тронул стик.
// Для ботов: FIN.cam.stick[pi] = {x,y} — подменить стик; FIN.cam.fdt — шаг времени кадра для сглаживания столкновений; FIN.cam.s / FIN.cam.p[pi] — состояние; FIN.cam.effYaw(pi).
const D2R=Math.PI/180;
const CAMD={dead:0.15,yawV:2.6,pitchV:1.6,acc:12,brake:7,pMin:-10*D2R,pMax:50*D2R,sharedYaw:55*D2R,ret:0.65};
const camO=()=>({yaw:0,pitch:0,vy:0,vp:0,ret:null,col:1,touched:-9});
const CAMO={on:true,s:camO(),p:[camO(),camO()],cur:-1,stick:[null,null],lastSplit:null,lastCine:false,ft:0,returns:0};FIN.cam=CAMO;
if(FIN.set.camSens===undefined)FIN.set.camSens=1;if(FIN.set.camInvX===undefined)FIN.set.camInvX=false;if(FIN.set.camInvY===undefined)FIN.set.camInvY=false;
const camWrap=a=>{a%=Math.PI*2;if(a>Math.PI)a-=Math.PI*2;if(a<-Math.PI)a+=Math.PI*2;return a;};
const camEase=k=>k<0.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;   // easeInOutCubic
// ---------- стик ----------
const CZ={x:0,y:0};
function camRaw(pi){if(CAMO.stick[pi])return CAMO.stick[pi];const gp=PADS.gp[pi];if(!gp||!gp.axes||gp.axes.length<4)return CZ;return {x:gp.axes[2]||0,y:gp.axes[3]||0};}
function camShape(v){const m=Math.hypot(v.x,v.y);if(m<CAMD.dead)return {x:0,y:0,m:0};const k=Math.min(1,(m-CAMD.dead)/(1-CAMD.dead)),c=k*k;return {x:v.x/m*c,y:v.y/m*c,m:c};}
function camSum(a,b){const x=a.x+b.x,y=a.y+b.y,m=Math.hypot(x,y);return m>1?{x:x/m,y:y/m}:{x,y};}
function camReturn(o){if(Math.abs(camWrap(o.yaw))+Math.abs(o.pitch)<0.002){o.yaw=0;o.pitch=0;o.ret=null;return;}o.ret={t:0,y0:camWrap(o.yaw),p0:o.pitch};o.vy=0;o.vp=0;CAMO.returns++;}
function camReturnAll(){camReturn(CAMO.s);camReturn(CAMO.p[0]);camReturn(CAMO.p[1]);}
FIN.camReturnAll=camReturnAll;
function camUpd(o,v,full,live,dt){const s=live?camShape(v):{x:0,y:0,m:0};
  if(s.m>0){o.ret=null;o.touched=G.time;}
  if(o.ret){const r=o.ret;r.t+=dt;const k=camEase(Math.min(1,r.t/CAMD.ret));o.yaw=r.y0*(1-k);o.pitch=r.p0*(1-k);o.vy=0;o.vp=0;if(k>=1)o.ret=null;return;}
  const S=FIN.set,sens=S.camSens||1,ty=-s.x*CAMD.yawV*sens*(S.camInvX?-1:1),tp=s.y*CAMD.pitchV*sens*(S.camInvY?-1:1),ka=1-Math.exp(-(s.m>0?CAMD.acc:CAMD.brake)*dt);
  o.vy+=(ty-o.vy)*ka;o.vp+=(tp-o.vp)*ka;if(Math.abs(o.vy)<1e-4&&!s.m)o.vy=0;if(Math.abs(o.vp)<1e-4&&!s.m)o.vp=0;
  o.yaw+=o.vy*dt;o.pitch+=o.vp*dt;
  if(o.pitch<CAMD.pMin){o.pitch=CAMD.pMin;o.vp=Math.max(0,o.vp);}if(o.pitch>CAMD.pMax){o.pitch=CAMD.pMax;o.vp=Math.min(0,o.vp);}
  if(full)o.yaw=camWrap(o.yaw);else if(Math.abs(o.yaw)>CAMD.sharedYaw){o.yaw=Math.sign(o.yaw)*CAMD.sharedYaw;o.vy=0;}}
function camTick(dt){if(!W)return;const cine=!!G.cine;
  if(cine!==CAMO.lastCine){CAMO.lastCine=cine;camReturnAll();}
  if(G.splitTarget!==CAMO.lastSplit){if(CAMO.lastSplit!==null)camReturnAll();CAMO.lastSplit=G.splitTarget;}
  const live=CAMO.on&&!cine&&!G.trans&&!G.ui&&!W.camFn&&G.state==='play';
  if(G.solo){const a=camRaw(0),b=camRaw(1),v=Math.hypot(a.x,a.y)>=Math.hypot(b.x,b.y)?a:b;camUpd(CAMO.s,v,true,live,dt);camUpd(CAMO.p[0],CZ,true,false,dt);camUpd(CAMO.p[1],CZ,true,false,dt);return;}
  const sp=G.splitTarget>0.5;
  for(const pi of[0,1])camUpd(CAMO.p[pi],camRaw(pi),true,live&&sp,dt);
  camUpd(CAMO.s,camSum(camRaw(0),camRaw(1)),false,live&&!sp,dt);}
{const _step=step;step=function(dt){_step(dt);try{camTick(dt);}catch(e){console.error('cam',e);}};}
// ---------- куда «вперёд» для ходьбы: своя камера игрока ----------
function camEffYaw(pi){if(G.cine||!W||W.camFn)return 0;if(G.solo)return CAMO.s.yaw;const e=smooth(G.split);let d=camWrap(CAMO.p[pi].yaw-CAMO.s.yaw);return CAMO.s.yaw+d*e;}
CAMO.effYaw=camEffYaw;
{const _cb=camBack;camBack=function(){if(CAMO.cur<0)return _cb();const y=W.camYaw+camEffYaw(CAMO.cur);return new V3(Math.sin(y),0,Math.cos(y));};}
{const _up=updatePlayer;updatePlayer=function(pi,dt){CAMO.cur=pi;try{_up(pi,dt);}finally{CAMO.cur=-1;}};}
// после падения — к дефолту
{const _of=onFall;onFall=function(h){_of(h);if(h&&h.active){if(G.solo||G.splitTarget<0.5)camReturn(CAMO.s);else camReturn(CAMO.p[h.player]);}};}
// ---------- поза: поворот вокруг точки взгляда + наклон + столкновения ----------
const CUPV=new V3(0,1,0),COFF=new V3(),CSAVE=new V3();
// доля пути от взгляда до камеры, свободная от стен (коробки уровня с видимым мешем)
function camFree(L,off,dist){let t=1;const ix=Math.abs(off.x)>1e-6?1/off.x:1e6,iy=Math.abs(off.y)>1e-6?1/off.y:1e6,iz=Math.abs(off.z)>1e-6?1/off.z:1e6;
  for(const b of W.boxes){if(!b.on||!b.mesh||b.maxy-b.miny<0.5)continue;
    let a=(b.minx-L.x)*ix,e=(b.maxx-L.x)*ix,tn=Math.min(a,e),tf=Math.max(a,e);
    a=(b.miny-L.y)*iy;e=(b.maxy-L.y)*iy;tn=Math.max(tn,Math.min(a,e));tf=Math.min(tf,Math.max(a,e));
    a=(b.minz-L.z)*iz;e=(b.maxz-L.z)*iz;tn=Math.max(tn,Math.min(a,e));tf=Math.min(tf,Math.max(a,e));
    if(tf<tn||tn<=0.02||tn>=t)continue;t=tn;}   // взгляд внутри коробки (tn ≤ 0) — такую не считаем
  if(t>=1)return 1;return Math.max(1.6/dist,Math.min(1,(t*dist-0.35)/dist));}
function camApply(src,o,dt){const L=src.look;COFF.subVectors(src.pos,L);const dist=COFF.length();if(dist<0.5)return;
  if(o.yaw)COFF.applyAxisAngle(CUPV,o.yaw);
  const hor=Math.max(1e-4,Math.hypot(COFF.x,COFF.z));let el=Math.atan2(COFF.y,hor);el=Math.max(-0.2,Math.min(1.45,el+o.pitch));
  const nh=Math.cos(el)*dist;COFF.x*=nh/hor;COFF.z*=nh/hor;COFF.y=Math.sin(el)*dist;
  const w=Math.min(1,(Math.abs(camWrap(o.yaw))+Math.abs(o.pitch))/0.12),lim=w>0?1-w*(1-camFree(L,COFF,dist)):1;
  o.col+=(lim-o.col)*(1-Math.exp(-(lim<o.col?18:3.5)*dt));
  src.pos.copy(L).addScaledVector(COFF,Math.min(o.col,1));
  if(w>0){const g=groundAt(src.pos.x,src.pos.z,src.pos.y+0.2,0.1);const gy=g&&g.y>-1e8?g.y+0.45:-1e9;if(src.pos.y<gy)src.pos.y+=(gy-src.pos.y)*w;}}
{const _cp=composePose;composePose=function(src,out){const o=src===shared?CAMO.s:src===rigs[0]?CAMO.p[0]:src===rigs[1]?CAMO.p[1]:null;
  if(!o||G.cine||!W||W.camFn||(Math.abs(o.yaw)<1e-4&&Math.abs(o.pitch)<1e-4&&o.col>0.999)){if(o)o.col=1;return _cp(src,out);}
  const now=performance.now(),dt=CAMO.fdt||Math.min(0.1,Math.max(0.001,(now-(o.ft||now))/1000));o.ft=now;
  CSAVE.copy(src.pos);try{camApply(src,o,dt);_cp(src,out);}finally{src.pos.copy(CSAVE);}};}
// ---------- уровень, настройки, подсказка в «Управлении» ----------
{const _ll=loadLevel;loadLevel=function(i){_ll(i);for(const o of[CAMO.s,CAMO.p[0],CAMO.p[1]])Object.assign(o,camO());CAMO.lastSplit=null;};}
{const _ss=settingsScreen;settingsScreen=function(){const s=_ss(),S=FIN.set;const at=s.items.findIndex(it=>it.label==='Джойстики местами');
  const sv=()=>FIN.saveSettings();
  s.items.splice(at<0?s.items.length-1:at,0,
    {label:'Камера: скорость',val:()=>Math.round((S.camSens||1)*100)+'%',sub:'правый стик: вокруг героя и наклон',side:d=>{S.camSens=Math.max(0.5,Math.min(2,Math.round(((S.camSens||1)+d*0.25)*4)/4));sv();}},
    {label:'Камера: влево-вправо',val:()=>S.camInvX?'наоборот':'обычно',side:()=>{S.camInvX=!S.camInvX;sv();}},
    {label:'Камера: вверх-вниз',val:()=>S.camInvY?'наоборот':'обычно',side:()=>{S.camInvY=!S.camInvY;sv();}});
  return s;};}
{const _cs=controlsScreen;controlsScreen=function(){const s=_cs(),h=s.html;
  s.html=()=>h().replace('Пауза — Esc','Камера — правый стик: вокруг героя и наклон (в сплите у каждого своя; сама возвращается, когда экран делится или сходится). Пауза — Esc');return s;};}
