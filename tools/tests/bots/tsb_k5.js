//@@ wait=1500
// «Полигон Кощея» (сборка --k5sandbox, docs/24_koschei_proposals.md, шаги 1–6): все сцены грузятся, механики срабатывают, ошибок нет;
// настоящий 5-Б2 в той же сборке не сломан. Запуск: python3 zlataya_cep/build/build_final.py --k5sandbox &&
// tools/tests/run_one.sh tsb_k5 zlataya_cep/zlataya_cep_k5sandbox.html
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.addEventListener('error',e=>window._errs.push(String(e.message).slice(0,200)));
window.S5=ZC.FIN.k5s;window.SC=()=>S5.scene;window.PUT=(h,x,z,y)=>{h.pos.set(x,y||0.05,z);h.vel.set(0,0,0);ZC.tick(2);};
window.HIT=(n)=>{for(let i=0;i<n;i++){ZC.press('KeyF');ZC.tick(22);}};
document.querySelectorAll('div').forEach(d=>{if(d.style.zIndex==='70')d.remove();});ZC.G.manual=true;Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
S5.go('s1');ZC.tick(200);
JSON.stringify({lvl:ZC.W.levelId,mode:S5.mode,boss:!!SC().B,guard:SC().B.e.guardAll(),cam:!!ZC.W.camFn,mus:ZC.FIN.music.cur,errs:_errs.length})
//@@ shot=k5_s1.png
// этап 1: клубок, Леший, свечи — купол лопается, окно, удары
{const S=SC(),h=U.act(0);ZC.press('KeyR');ZC.tick(5);const clew=S5.tick.length;ZC.press('Digit1');ZC.tick(10);const open=S.c.some(c=>c.open>0);
  for(const c of S.c){PUT(h,c.x,c.z+1.2);HIT(2);h.iT=2;}const lit=S.c.filter(c=>c.lit).length;let win=false,hits=0;
  for(let i=0;i<60*30&&!win;i++){ZC.tick(1);h.iT=2;if(S.B.state==='window')win=true;}const e0=S.B.e.embers;if(win){PUT(h,S.B.A.g.position.x,S.B.A.g.position.z+2);HIT(3);}
  window.R1={clew,open,lit,guard:S.B.e.guardAll(),win,emb:e0+'→'+S.B.e.embers,mood:S.B.mood};}
JSON.stringify(R1)
//@@
// этап 2: гусли у лужи — Водяной, ветер стихает
{S5.go('s2');ZC.tick(120);const S=SC(),h=U.act(0),p=S.pud[0];PUT(h,p.x,p.z+0.5);ZC.press('KeyR');ZC.tick(70);window.R2={pud:S.pud.length,stop:+(S5.windStop||0).toFixed(1),cd:+S.cd.toFixed(1)};}
JSON.stringify(R2)
//@@ shot=k5_s2.png
// этап 3: туча, перо — Жар-птица выжигает тучу, окно
{S5.go('s3');ZC.tick(120);const S=SC();const g0=S.B.e.guardAll();ZC.press('KeyR');for(let i=0;i<60*3;i++){ZC.tick(1);U.act(0).iT=2;}window.R3={g0,cloud:S.cloud,win:S.B.state,shadow:!!S.sh};}
JSON.stringify(R3)
//@@ shot=k5_s3.png
// этап 4: Горыныч раскаляет щит, Потап срывает клещами
{S5.go('s4');ZC.tick(120);const S=SC(),b=S.sb[1];let h=U.act(0);if(h.kind!=='potap'){ZC.press('KeyQ');ZC.tick(6);h=U.act(0);}PUT(h,b.x,b.z+1.6);ZC.press('Digit1');ZC.tick(80);const hot=b.hot>0;ZC.press('KeyR');ZC.tick(40);
  window.R4={kind:h.kind,hot,alive:S.sb.filter(x=>x.alive).length,gor:!!S.gor};}
JSON.stringify(R4)
//@@ shot=k5_s4.png
// этап 5: великан — кулак, рука-подъём, сундук, заяц, утка, яйцо, ковка
{S5.go('s5');ZC.tick(60);const S=SC();let ramp=false;for(let i=0;i<60*8&&!ramp;i++){ZC.tick(1);U.act(0).iT=2;U.act(1).iT=2;if(S.ramp)ramp=true;}
  const h=U.act(0);const y0=h.pos.y;if(ramp){const R=S.ramp;for(let k=0.05;k<=1;k+=0.05){h.pos.set(R.a.x+(R.b.x-R.a.x)*k,R.a.y+(R.b.y-R.a.y)*k+0.1,R.a.z+(R.b.z-R.a.z)*k);h.vel.set(0,0,0);ZC.tick(2);}}
  const onSh=h.pos.y>S.sh.y-1;window.R5={ramp,onSh,y:+h.pos.y.toFixed(1)};}
JSON.stringify(R5)
//@@ shot=k5_s5_arm.png
{const S=SC(),h=U.act(0);PUT(h,S.sh.x,S.sh.z+0.6,S.sh.y+0.1);HIT(4);R5.ph1=S.ph;for(let i=0;i<60;i++)ZC.tick(1);
  if(S.hare){for(let i=0;i<60*6&&S.ph==='hare';i++){h.pos.copy(S.hare.g.position);h.pos.y=0.05;ZC.tick(1);}}R5.ph2=S.ph;
  for(let i=0;i<60*10&&S.ph==='duck';i++){const D=S.duck;if(D&&D.g.position.y<2){h.pos.set(D.g.position.x,0.05,D.g.position.z+1);ZC.press('KeyF');}ZC.tick(1);h.iT=2;}R5.ph3=S.ph;
  if(S.egg){h.pos.set(S.egg.g.position.x,0.05,S.egg.g.position.z);for(let i=0;i<120&&S.ph==='egg';i++){ZC.tick(1);h.pos.x=S.egg?S.egg.g.position.x:h.pos.x;h.pos.z=S.egg?S.egg.g.position.z:h.pos.z;}}R5.ph4=S.ph;
  if(S.ph==='forge'){S.ok=[4,4];ZC.tick(5);}R5.ph5=S.ph;}
JSON.stringify(R5)
//@@ shot=k5_s5_fall.png
// полёт: огонь и свет по дорожкам, угрозы, большой огонь
{S5.go('flight');ZC.tick(30);const S=SC();for(let i=0;i<12;i++){ZC.press('KeyF');ZC.tick(25);U.act(0).iT=2;U.act(1).iT=2;}ZC.press('Space');ZC.press('KeyM');ZC.tick(5);window.R6={t:+S.t.toFixed(1),score:S.score,th:S.th.length,big:!!S.bigT,isl:+S.isl.position.z.toFixed(0)};}
JSON.stringify(R6)
//@@ shot=k5_flight.png
// страница: идём направо — друзья встают рядом с мальчишкой
{S5.go('page');ZC.tick(30);const S=SC();ZC.hold('KeyD',true);ZC.hold('ArrowRight',true);for(let i=0;i<60*70&&!S.end;i++){ZC.tick(1);if(i%40===0){ZC.press('Space');ZC.press('KeyM');}}ZC.hold('KeyD',false);ZC.hold('ArrowRight',false);
  window.R7={next:S.next,boy:+S.boy.g.position.x.toFixed(1),hx:+U.act(0).pos.x.toFixed(1),end:S.end};}
JSON.stringify(R7)
//@@ shot=k5_page.png
// настоящий 5-Б2 в этой сборке
{ZC.startFrom(ZC.LV('5-B2'));ZC.tick(80);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(60);window.R8={lvl:ZC.W.levelId,cine:!!ZC.G.cine};}
const ok=R1.lit===0&&!R1.guard&&R1.win&&R1.open&&R2.stop>0&&R3.g0&&R3.cloud===0&&R4.hot&&R4.alive===2&&R5.ramp&&R5.ph5==='done'&&R6.big&&R6.t>5&&R7.next===4&&R7.end&&R8.lvl==='5-B2'&&_errs.length===0;
(ok?'tsb_k5 ok ':'FAIL tsb_k5 ')+JSON.stringify({R1,R2,R3,R4,R5,R6,R7,R8,errs:_errs.slice(0,4)})
