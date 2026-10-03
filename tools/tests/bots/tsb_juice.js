//@@ wait=1500
// полигон эффектов (сборка --sandbox, docs/23_vfx_sfx.md): уровень грузится, удар даёт hit-stop/вспышку/лесенку, колючки — урон с лепестком
// и кромкой, шаги по поверхностям, телеграф с нитью цели и бликом, клубок распускается; Ё (JU.all=false) — всё как в релизе.
// Запуск: python3 zlataya_cep/build/build_final.py --sandbox && tools/tests/run_one.sh tsb_juice zlataya_cep/zlataya_cep_sandbox.html
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.addEventListener('error',e=>window._errs.push(String(e.message).slice(0,200)));
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.JU=ZC.FIN.ju;window.CNT={};for(const k of ['step','hit','glint','unravel','hurt','note','land','swish']){const o=JU.snd[k];JU.snd[k]=function(){CNT[k]=(CNT[k]||0)+1;if(k==='step'){CNT['s_'+arguments[0]]=(CNT['s_'+arguments[0]]||0)+1;}return o.apply(this,arguments);};}
window.PUT=(h,x,z,face)=>{h.pos.set(x,0.05,z);h.vel.set(0,0,0);if(face!=null)h.face=face;ZC.tick(2);};
ZC.G.manual=true;ZC.startFrom(ZC.LV('sb'));document.querySelectorAll('div').forEach(d=>{if(/Полигон эффектов/.test(d.textContent)&&d.style.zIndex==='70')d.remove();});ZC.tick(30);NOCINE();
JSON.stringify({lvl:ZC.W.levelId,foes:ZC.W.enemies.length,items:ZC.W.items.length,errs:_errs.length})
//@@ shot=tsb_start.png
// тир: бьём манекен — hit-stop, проседание, лесенка
{const h=U.act(0),e=ZC.W.enemies.find(e=>e.sbDummy&&e.kind==='kiki');PUT(h,e.pos.x,e.pos.z+1.6,Math.PI);let hs=0,sq=0;
  for(let i=0;i<4;i++){ZC.tick(25);ZC.press('KeyF');for(let j=0;j<20;j++){ZC.tick(1);hs=Math.max(hs,ZC.G.hitstop);sq=Math.max(sq,e._sqA||0);}}
  window.R1={hs:+hs.toFixed(3),sq,combo:JU.combo[0].n,hit:CNT.hit||0,note:CNT.note||0,swish:CNT.swish||0};}
JSON.stringify(R1)
//@@
// колючки: урон, лепесток, кромка, «ой»
{const h=U.act(0),p=ZC.players[0],pet=p.petals;ZC.G.hitstop=0;PUT(h,13,-3);ZC.tick(4);const parts=JU.parts.filter(x=>x.kind==='petal').length;
  const op=Math.max(...[...document.querySelectorAll('div')].filter(d=>/rgba\(255, ?110, ?150/.test(d.style.background)).map(d=>+d.style.opacity||0));
  window.R2={petals:pet+'→'+p.petals,petal:parts,edge:op,hurt:CNT.hurt||0};PUT(h,20,-4);ZC.tick(10);R2.healed=p.petals;}
JSON.stringify(R2)
//@@
// дорожка: идём слева направо по шести поверхностям
{const h=U.act(0);PUT(h,-23,6);ZC.hold('KeyD',true);ZC.tick(60*7);ZC.hold('KeyD',false);window.R3={x:+h.pos.x.toFixed(1),steps:CNT.step||0,by:Object.keys(CNT).filter(k=>k.startsWith('s_')).map(k=>k.slice(2)+':'+CNT[k]).join(' ')};}
JSON.stringify(R3)
//@@ shot=tsb_steps.png
// сигналы: стоим у жёлтого морока, ждём замах — нить цели и блик
{const h=U.act(0),e=ZC.W.enemies.find(e=>!e.sbDummy&&e.signals[0]==='yellow'&&e.pos.x<0);PUT(h,e.pos.x,e.pos.z+2,Math.PI);let ring=false,gl=0;
  for(let i=0;i<60*6;i++){ZC.tick(1);if(e._jt&&e._jt.ring.visible)ring=true;if(e._gl)gl++;if(ring&&gl)break;}window.R4={ring,glint:CNT.glint||0,state:e.state};}
JSON.stringify(R4)
//@@ shot=tsb_signal.png
// клубок: последний лепесток → колючки → рассыпался
{const h=U.act(0),p=ZC.players[0];p.petals=1;h.iT=0;PUT(h,13,-3);ZC.tick(30);window.R5={downed:p.downed||!!h._down||Object.values(ZC.HERO).some(x=>x._down),unravel:CNT.unravel||0};}
JSON.stringify(R5)
//@@
// Ё: всё как в релизе — hit-stop не ставится, нить не рисуется
{JU.all=false;const h=U.act(0),e=ZC.W.enemies.find(e=>e.sbDummy&&e.alive);ZC.G.hitstop=0;const hit0=CNT.hit||0;PUT(h,e.pos.x,e.pos.z+1.6,Math.PI);let hs=0;
  for(let i=0;i<3;i++){ZC.tick(25);ZC.press(ZC.players[0].act===U.act(0)?'KeyF':'KeyF');for(let j=0;j<20;j++){ZC.tick(1);hs=Math.max(hs,ZC.G.hitstop);}}
  window.R6={hs,newHits:(CNT.hit||0)-hit0};JU.all=true;}
const ok=R1.hs>0.04&&R1.sq>0&&R1.combo>=1&&R2.petal>=1&&R2.edge>0.3&&R3.steps>20&&R3.by.split(' ').length>=6&&R4.ring&&R4.glint>=1&&R5.unravel>=1&&R6.hs===0&&R6.newHits===0&&_errs.length===0;
(ok?'tsb_juice ok ':'FAIL tsb_juice ')+JSON.stringify({R1,R2,R3,R4,R5,R6,errs:_errs.slice(0,3)})
//@@ shot=tsb_panel.png
// панель (Tab) открывается поверх игры
dispatchEvent(new KeyboardEvent('keydown',{code:'Tab',bubbles:true}));ZC.tick(2);document.getElementById('juPanel').style.display
