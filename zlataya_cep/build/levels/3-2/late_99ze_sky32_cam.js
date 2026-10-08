/* ============================== РЕЛИЗ final06 · 3-2: ГРОМОВОЙ БАРАН — КАМЕРА БОЯ ============================== */
// Раньше арену держала круглая зона камеры: взгляд в центр арены, жёсткий угол, Баран у верхней кромки под плашками. Теперь — камера «вписывает»
// всё важное: оба героя, Баран (на этапе 2 — на туче, выше), Пушок (этап 3), неотыгранная молния и конец дорожки разбега. Расстояние считается
// по границам кадра (с запасом под HUD сверху), центр сдвинут так, чтобы действие шло ниже плашек и карточек подсказок, а Баран не прятался
// за верхней кромкой. Камера стоит строго с юга (без поворота): управление «вперёд» не меняется. Толчки по событиям боя: разбег — чуть шире,
// увяз — наезд на оглушённого Барана, топот — шире. Орбита правым стиком в бою не работает (как в боях 2-Б и 3-Б: арена — своя камера).
// FIN.cam32: .on = false — прежняя зона; .kick(имя) — толчок; .now() — текущая цель (для ботов).
const CAM32={on:true,D:19,look:new V3(0,23,-316),pos:new V3(0,34,-297),zoomS:0,zoomV:0,pitch:0.62,out:{pos:new V3(),look:new V3(),k:3.2},inited:false,t:0,runs:0};FIN.cam32=CAM32;
{const _ll=loadLevel;loadLevel=function(i){CAM32.inited=false;CAM32.zoomS=CAM32.zoomV=0;if(W&&W.camFn===cam32Fn)W.camFn=null;_ll(i);if(W&&W.levelId==='3-2'&&W.ram32)cam32Attach(W.ram32);};}
const CAM32_KICK={charge:0.07,stuck:-0.05,bonk:-0.04,stomp:0.06};
CAM32.kick=n=>{const z=CAM32_KICK[n];if(z!=null)CAM32.zoomV=clamp(CAM32.zoomV+z,-0.2,0.16);};
function cam32Fn(){return CAM32.out;}
function cam32Aspect(){const w=innerWidth||1280,h=innerHeight||720;return clamp(w/h,0.9,2.4);}
// ключевые точки кадра: [x,y,z,вес]; конец дорожки разбега — не в счёт (камера не должна уезжать от героев ради подсказки)
function cam32Pts(B,dt){const P=[],e=B.e,LB=B.LB||W.lamb32,fy=CAM32.fy||(CAM32.fy=new Map()),fk=dt==null?0:Math.min(1,dt*1.7);
  const hs=G.solo?[active(G.soloPi),active(1-G.soloPi)]:[active(0),active(1)];
  hs.forEach((h,i)=>{if(!h||!h.pos||h.hidden)return;const w=(G.solo&&i?0.6:1)/2,hh=(typeof heroHeight==='function'&&heroHeight(h))||1.8;let y=fy.has(h)&&CAM32.inited?fy.get(h):h.pos.y;y+=(h.pos.y-y)*fk;fy.set(h,y);   // высота — сглаженная: прыжок не дёргает отъезд камеры, подъём по радуге — отслеживается
    P.push([h.pos.x,y-0.1,h.pos.z,w],[h.pos.x,y+hh+0.2,h.pos.z,w]);});   // ноги и макушка — целиком, не по пояс
  if(e&&e.alive){const w=B.phase===2?0.75:0.68,top=((e.L&&e.L.top)||2.7)*(e.s||1)+0.3;P.push([e.pos.x,e.pos.y,e.pos.z,w],[e.pos.x,e.pos.y+top,e.pos.z,w]);}
  if(B.phase===3&&LB&&LB.mode==='free')P.push([LB.pos.x,LB.pos.y,LB.pos.z,0.45],[LB.pos.x,LB.pos.y+0.9,LB.pos.z,0.45]);
  if(B.phase===2)for(const s of B.strikes)if(!s.done)P.push([s.at.x,B.AY+0.3,s.at.z,0.35]);
  return P;}
// цель камеры: рамка из точек (по краям — запас; сверху больше — там плашки и карточки подсказок, снизу меньше), расстояние — минимальное, при котором всё влезло
function cam32Solve(B,dt){const P=cam32Pts(B,dt);if(!P.length)return;let wx=0,wy=0,wz=0,ws=0;for(const p of P){wx+=p[0]*p[3];wy+=p[1]*p[3];wz+=p[2]*p[3];ws+=p[3];}
  const F=new V3(wx/ws,wy/ws,wz/ws);const pitch=B.phase===2?0.56:0.68,u=new V3(0,Math.sin(pitch),Math.cos(pitch)),f=u.clone().negate(),r=new V3().crossVectors(f,CAM32_UP).normalize(),up=new V3().crossVectors(r,f).normalize();
  const tv=Math.tan(27.5*Math.PI/180),th=tv*cam32Aspect(),MX=0.84,TOP=0.5,BOT=0.8;
  const Q=P.map(p=>{const rel=new V3(p[0]-F.x,p[1]-F.y,p[2]-F.z);return{x:rel.dot(r),y:rel.dot(up),z:rel.dot(f)};});
  let xmin=1e9,xmax=-1e9,ymin=1e9,ymax=-1e9;for(const q of Q){xmin=Math.min(xmin,q.x);xmax=Math.max(xmax,q.x);ymin=Math.min(ymin,q.y);ymax=Math.max(ymax,q.y);}
  const xm=(xmin+xmax)/2,ym=(ymin+ymax)/2,cen=(TOP-BOT)/2;let D=15,lift=0;
  for(;D<31;D+=0.4){lift=ym-cen*D*tv;let ok=true;for(const q of Q){const dep=D+q.z;if(dep<1)continue;if(Math.abs(q.x-xm)/(dep*th)>MX||(q.y-lift)/(dep*tv)>TOP||(q.y-lift)/(dep*tv)<-BOT){ok=false;break;}}if(ok)break;}
  if(!CAM32.inited){CAM32.D=D;CAM32.inited=true;}else CAM32.D=damp(CAM32.D,D,B.ai==='stuck'?1.4:2.2,dt);
  CAM32.zoomV*=Math.exp(-dt*1.7);CAM32.zoomS=damp(CAM32.zoomS,B.ai==='stuck'&&B.phase!==2?-0.1:0,2.5,dt);
  const Dz=CAM32.D*(1+CAM32.zoomS+CAM32.zoomV),L=F.clone().addScaledVector(r,xm).addScaledVector(up,ym-cen*CAM32.D*tv);L.x=clamp(L.x,-7,7);CAM32.look.copy(L);CAM32.pos.copy(L).addScaledVector(u,Dz);CAM32.pitch=pitch;
  CAM32.out.pos.copy(CAM32.pos);CAM32.out.look.copy(CAM32.look);CAM32.out.k=B.ai==='stuck'?2.6:3.4;}
const CAM32_UP=new V3(0,1,0);
// для ботов: где на экране (−1…1) точка мира при нынешней позе камеры; ключевые точки кадра
CAM32.ndc=p=>{const c=new THREE.PerspectiveCamera(55,cam32Aspect(),0.1,1000);c.position.copy(shared.pos);c.up.set(0,1,0);c.lookAt(shared.look);c.updateMatrixWorld();return p.clone().project(c);};
CAM32.keys=()=>{const B=W&&W.ram32;return B&&B.e?cam32Pts(B).map(p=>new V3(p[0],p[1],p[2])):[];};
CAM32.now=()=>({pos:CAM32.pos.clone(),look:CAM32.look.clone(),D:CAM32.D,active:W&&W.camFn===cam32Fn});
CAM32.snap=()=>{const B=W&&W.ram32;if(!B||!B.e)return;CAM32.inited=false;cam32Solve(B,0.016);shared.pos.copy(CAM32.pos);shared.look.copy(CAM32.look);};
function cam32Attach(B){B.on('go',()=>{if(CAM32.on){W.camFn=cam32Fn;CAM32.inited=false;CAM32.zoomS=CAM32.zoomV=0;CAM32.snap();}});
  B.on('finale',()=>{if(W.camFn===cam32Fn)W.camFn=null;});}
{const _step=step;step=function(dt){_step(dt);if(!W||W.levelId!=='3-2')return;const B=W.ram32;if(!B)return;const want=CAM32.on&&B.e&&B.phase>=1&&B.phase<4&&!W.k32off;
  if(want){if(!W.camFn){W.camFn=cam32Fn;CAM32.inited=false;}if(W.camFn===cam32Fn){try{cam32Solve(B,Math.min(dt,0.1));CAM32.runs++;}catch(err){console.error('cam32',err);}}}
  else if(W.camFn===cam32Fn)W.camFn=null;};}
