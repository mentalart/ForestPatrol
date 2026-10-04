/* ============================== РЕЛИЗ final06 · 3-2: РОЛИКИ — ГЕРОИ ЛИЦОМ К КАМЕРЕ, ЧИСТЫЙ КАДР ============================== */
// Правило эталонных роликов (docs/13_koschei_cines.md): говорящий в кадре и лицом к камере, спиной к зрителю никто не стоит.
// В роликах 3-2 камера часто стоит со стороны, куда герои не смотрят (ответные планы, облёты), — и герои оказывались спиной.
// Теперь каждый кадр ролика: герой, повёрнутый к камере спиной или боком больше чем на ~65°, плавно разворачивается вполоборота
// к ней (в ту сторону, куда смотрел, — взгляд на собеседника сохраняется); говорящий — почти в лицо камере. Герой, которого
// ролик ведёт шагом, не трогается. Баран и Пушок, когда говорят, тоже поворачиваются к камере. Звенышко у самого объектива
// (ближе 2,4 м) прячется, чтобы не закрывать кадр; баннер этапа во время ролика не висит поверх него.
const CN32={on:true,turns:0,zHid:false};FIN.cine32=CN32;
CN32.dbg=()=>({renderer,scene,CINE,camS});   // для ботов: сцена, рендерер, режиссёр
// камера ролика — поза режиссёра (late_82): camS принимает её только при отрисовке
function c32Cam(){const cd=CINE.CD&&CINE.CD();return cd&&cd.S===G.cine&&cd.pose&&cd.pose.pos?cd.pose.pos:G.cine&&G.cine.camPos?G.cine.camPos:camS.position;}
function c32Turn(face,x,z,lim){const cp=c32Cam(),to=Math.atan2(cp.x-x,cp.z-z),d=angN(face-to);return Math.abs(d)>lim?to+Math.sign(d)*lim:face;}
{const _step=step;step=function(dt){_step(dt);if(!W||W.levelId!=='3-2')return;const Z=W.zven;
  if(!G.cine||!CN32.on){if(CN32.zHid&&Z&&Z.g){Z.g.visible=true;CN32.zHid=false;}return;}
  const S=FIN.actors&&FIN.actors.speaker,sp=S&&S.until>G.time?S.who:null,cp=c32Cam();
  for(const h of HEROES){if(!h.g||!h.g.visible||h.hidden)continue;const pp=h._c32p||(h._c32p=h.pos.clone());const mv=hd(pp,h.pos)>0.02;pp.copy(h.pos);if(mv)continue;
    if(hd(h.pos,cp)>34)continue;const f=c32Turn(h.face,h.pos.x,h.pos.z,sp===h.kind?0.45:1.15);if(f!==h.face){h.face=f;CN32.turns++;}}
  const B=W.ram32,LB=W.lamb32;
  if(sp==='baran'&&B&&B.e&&B.e.alive)B.e.face=c32Turn(B.e.face,B.e.pos.x,B.e.pos.z,0.6);
  if(sp==='pushok'&&LB&&LB.face!=null)LB.face=c32Turn(LB.face,LB.pos.x,LB.pos.z,0.6);
  if(Z&&Z.g){const near=Z.g.position.distanceTo(cp)<2.4;if(near!==CN32.zHid){Z.g.visible=!near;CN32.zHid=near;}}
  const bn=$('banner');if(bn&&bn.style.opacity!=='0'&&G.cine.t>0.3&&!(G.cine.t>G.cine.dur-0.1))bn.style.opacity=0;};}
