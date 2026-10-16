/* ============================== РЕЛИЗ · СТЕНД «ДО/ПОСЛЕ»: СОЧНЫЙ ВЫСТРЕЛ МОРОКА (только с ?boltlab или window.ZC_BOLTLAB; в игре не виден) ============================== */
// Поляна уровня 1-1: герой и морок-стрелок друг напротив друга, камера сбоку. Морок стреляет синей каплей, герой сам по очереди
// пропускает её, ловит щитом и отбивает (или играет человек: G — щит, в последний миг — отбив). Панель: «До» / «После» / «Чередовать»,
// флаги восьми шагов FIN.boltFx.f.*, замедление, вид морока. Механика игры не меняется: стенд только ставит сцену и камеру.
const BLAB=FIN.boltLab={want:/[?&#]boltlab/i.test(location.search+location.hash)||!!window.ZC_BOLTLAB,on:false,ready:false,
  mode:'after',scen:'auto',kind:'thread',slow:1,n:0,cur:null,e:null,h:null,spot:null,cam:null,c:null,respawn:0,lastBolt:null};
const BLAB_KINDS=[['thread','Нитяной'],['puzyr','Пузырник'],['shchuka','Щука'],['lizard','Жар-ящерка']];
const BLAB_STEPS=[['charge','1 · Заряд'],['core','2 · Ядро'],['trail','3 · След'],['burst','4 · Вспышка и искры'],['react','5 · Реакция'],['sound','6 · Звук'],['after','7 · Последствия'],['num','8 · Число']];
const BLAB_SCEN=['hit','shield','parry'],BLAB_SCEN_RU={hit:'попадание',shield:'щит',parry:'отбив'};

function blabCss(){const s=document.createElement('style');s.textContent=`
body.blab>*:not(canvas):not(#floats):not(#flash):not(#blab):not(#blabGo):not(#blabTag):not(#blabNext):not(style):not(script){display:none!important}
#blab{position:fixed;left:12px;top:12px;z-index:9999;width:260px;max-height:calc(100vh - 24px);overflow:auto;background:rgba(18,22,34,.88);color:#eef;border-radius:14px;
  padding:12px 14px;font:500 13px/1.35 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.4);user-select:none}
#blab h3{margin:0 0 6px;font-size:15px}#blab .row{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}
#blab button{flex:1 1 auto;border:0;border-radius:9px;padding:7px 8px;background:#2c3550;color:#dfe6ff;font:600 13px system-ui;cursor:pointer}
#blab button.on{background:#ffcf4a;color:#2a1d00}#blab label{display:flex;align-items:center;gap:7px;margin:3px 0;cursor:pointer}
#blab .sub{opacity:.7;font-size:12px;margin-top:4px}#blab .cap{margin-top:8px;font-weight:700;opacity:.85}
#blabTag{position:fixed;right:18px;top:14px;z-index:9999;font:900 34px system-ui;letter-spacing:.04em;color:#fff;text-shadow:0 3px 8px rgba(0,0,0,.6);pointer-events:none}
#blabTag.before{color:#ff8a7a}#blabTag.after{color:#ffd54a}
#blabNext{position:fixed;right:18px;top:58px;z-index:9999;font:700 16px system-ui;color:#fff;text-shadow:0 2px 5px rgba(0,0,0,.7);pointer-events:none}
#blabGo{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(10,14,24,.82);cursor:pointer}
#blabGo div{max-width:440px;margin:16px;padding:22px 24px;border-radius:18px;background:#1c2236;color:#eef;font:500 15px/1.45 system-ui;text-align:center}
#blabGo b{display:block;font-size:21px;margin-bottom:8px}#blabGo i{display:inline-block;margin-top:14px;padding:10px 18px;border-radius:12px;background:#ffcf4a;color:#2a1d00;font:700 16px system-ui;font-style:normal}
@media (max-width:600px){#blab{width:auto;right:12px;top:auto;bottom:12px;max-height:46vh}#blabTag{font-size:26px}}`;document.head.appendChild(s);}

function blabPanel(){const P=document.createElement('div');P.id='blab';document.body.appendChild(P);
  const tag=document.createElement('div');tag.id='blabTag';document.body.appendChild(tag);const nx=document.createElement('div');nx.id='blabNext';document.body.appendChild(nx);
  const btn=(row,label,on,fn)=>{const b=document.createElement('button');b.textContent=label;if(on)b.classList.add('on');b.onclick=e=>{e.stopPropagation();fn();blabSync();};row.appendChild(b);return b;};
  const row=cls=>{const r=document.createElement('div');r.className='row';P.appendChild(r);return r;},cap=t=>{const d=document.createElement('div');d.className='cap';d.textContent=t;P.appendChild(d);};
  P.innerHTML='<h3>Стенд: выстрел морока</h3><div class="sub">8 шагов «make a magic attack». Слева сравнить «до» и «после», ниже — включить шаги по одному.</div>';
  cap('Показ');const r1=row();BLAB.bMode={before:btn(r1,'До',0,()=>blabMode('before')),after:btn(r1,'После',1,()=>blabMode('after')),alt:btn(r1,'Чередовать',0,()=>blabMode('alt'))};
  cap('Шаги «после»');BLAB.chk={};for(const [k,ru] of BLAB_STEPS){const l=document.createElement('label');const c=document.createElement('input');c.type='checkbox';c.checked=true;
    c.onchange=()=>{FIN.boltFx.f[k]=c.checked;};l.appendChild(c);l.appendChild(document.createTextNode(ru));P.appendChild(l);BLAB.chk[k]=c;}
  const r2=row();btn(r2,'Все',0,()=>{for(const k in BLAB.chk){BLAB.chk[k].checked=true;FIN.boltFx.f[k]=true;}});btn(r2,'Ни одного',0,()=>{for(const k in BLAB.chk){BLAB.chk[k].checked=false;FIN.boltFx.f[k]=false;}});
  cap('Что делает герой');const r3=row();BLAB.bScen={auto:btn(r3,'По очереди',1,()=>{BLAB.scen='auto';}),hit:btn(r3,'Пропускает',0,()=>{BLAB.scen='hit';}),
    shield:btn(r3,'Щит',0,()=>{BLAB.scen='shield';}),parry:btn(r3,'Отбивает',0,()=>{BLAB.scen='parry';}),self:btn(r3,'Играю сам (G)',0,()=>{BLAB.scen='self';})};
  cap('Скорость');const r4=row();BLAB.bSlow={1:btn(r4,'×1',1,()=>{BLAB.slow=1;}),0.5:btn(r4,'×0,5',0,()=>{BLAB.slow=0.5;}),0.25:btn(r4,'×0,25',0,()=>{BLAB.slow=0.25;})};
  cap('Вспышки и тряска (настройка игры)');const r6=row();BLAB.bFx={};for(const k of [0,0.5,1])BLAB.bFx[k]=btn(r6,k*100+' %',0,()=>{FIN.set.flashK=k;FIN.set.shakeK=k;FIN.applySettings();});
  cap('Морок');const r5=row();BLAB.bKind={};for(const [k,ru] of BLAB_KINDS)BLAB.bKind[k]=btn(r5,ru,k===BLAB.kind,()=>{BLAB.kind=k;blabFoe();});
  const d=document.createElement('div');d.className='sub';d.textContent='«Играю сам»: G — щит; нажать G в последний миг перед попаданием — капля летит обратно.';P.appendChild(d);
  blabSync();}
function blabSync(){if(!BLAB.bMode)return;for(const k in BLAB.bMode)BLAB.bMode[k].classList.toggle('on',BLAB.mode===k);for(const k in BLAB.bScen)BLAB.bScen[k].classList.toggle('on',BLAB.scen===k);
  for(const k in BLAB.bSlow)BLAB.bSlow[k].classList.toggle('on',BLAB.slow===+k);for(const k in BLAB.bKind)BLAB.bKind[k].classList.toggle('on',BLAB.kind===k);
  if(BLAB.bFx){const fk=FIN.flashK();for(const k in BLAB.bFx)BLAB.bFx[k].classList.toggle('on',Math.abs(fk-k)<0.01);}
  const on=FIN.boltFx.on,t=document.getElementById('blabTag');if(t){t.textContent=on?'ПОСЛЕ':'ДО';t.className=on?'after':'before';}}
function blabMode(m){BLAB.mode=m;BLAB.n=0;FIN.boltFx.on=m!=='before';}

/* ---------- сцена ---------- */
function blabHero(){const p=players[0];return p.heroes[p.act];}
function blabFoe(){const S=BLAB.spot;if(!S)return;if(BLAB.e){const e=BLAB.e;e.alive=false;if(e.g&&e.g.parent)e.g.parent.remove(e.g);const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);}
  for(let i=W.bolts.length-1;i>=0;i--){const b=W.bolts[i];if(b.g.parent)b.g.parent.remove(b.g);W.bolts.splice(i,1);}
  const e=FIN.dbgFoe(BLAB.kind,S.f.x,S.f.z,{y:S.f.y,harmless:true,signals:['blue'],pi:0});e.noMove=true;e.leash=0.01;e.cd=1.2;BLAB.e=e;BLAB.respawn=0;}
function blabPlace(){const h=blabHero(),S=BLAB.spot;if(!h||!S)return;placeOnGround(h,S.h.x,S.h.z,S.h.y);h.vel.set(0,0,0);h.following=false;
  h.face=Math.atan2(S.f.x-S.h.x,S.f.z-S.h.z);players[0].cp.set(S.h.x,S.h.y,S.h.z);}
function blabSetup(){const h=blabHero();setSolo(true);
  // поляна у начала 1-1: герой на месте старта, морок в 5,8 м по оси x (стрелок бьёт с 6,5 м)
  const H=h.pos.clone(),F=H.clone().add(new V3(5.8,0,0));try{F.y=groundAt(F.x,F.z,H.y+3).y;}catch(err){}
  BLAB.spot={h:H,f:F};blabPlace();blabFoe();
  const c=H.clone().add(F).multiplyScalar(0.5).add(new V3(-1.6,1.1,0));BLAB.c=c;   // сцена правее середины: слева — панель
  const cam=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,0.1,600);cam.position.copy(c).add(new V3(-0.8,2.6,7.6));cam.lookAt(c);BLAB.cam=cam;BLAB.base=cam.position.clone();
  // телефон (экран выше, чем шире): сцена по центру и в верхней половине — внизу панель
  const m=H.clone().add(F).multiplyScalar(0.5).add(new V3(0,1.1,0));BLAB.tall={pos:m.clone().add(new V3(0,5,10)),look:m.clone().add(new V3(0,-2.2,0))};
  BLAB.ready=true;}

/* ---------- ход: кто что делает с каплей ---------- */
function blabScenFor(n){return BLAB.scen==='auto'?BLAB_SCEN[n%3]:BLAB.scen;}
function blabPre(){const h=blabHero(),e=BLAB.e;if(!h||!e)return;
  // новая капля — новый номер выстрела (для «По очереди» и «Чередовать»)
  const b=W.bolts.find(x=>!x.refl&&x.from===e);
  if(b&&b!==BLAB.lastBolt){BLAB.lastBolt=b;BLAB.cur=blabScenFor(BLAB.n);BLAB.n++;}
  if(e.state==='wind'&&!b&&BLAB.mode==='alt'){const k=Math.floor(BLAB.n/3)%2;const on=k===1;if(FIN.boltFx.on!==on){FIN.boltFx.on=on;blabSync();}}
  const sc=BLAB.scen==='self'?'self':b?BLAB.cur:blabScenFor(BLAB.n);
  if(sc==='self')return;
  const K=BIND[0].guard;
  if(sc==='shield'&&(b||e.state==='wind'))down.add(K);else down.delete(K);
  if(sc==='parry'&&b&&b.left===null&&b.eta<=0.16)pressed.add(K);}
function blabPost(){const h=blabHero(),e=BLAB.e;
  for(const o of HEROES)if(o!==h&&o.g)o.g.visible=false;
  if(h){if(!W.bolts.length&&(hd(h.pos,BLAB.spot.h)>0.6||h.vel.lengthSq()<0.01&&h.grounded&&hd(h.pos,BLAB.spot.h)>0.05)&&h.knockT<=0)blabPlace();
    h.face=Math.atan2(BLAB.spot.f.x-h.pos.x,BLAB.spot.f.z-h.pos.z);}
  if(e&&!e.alive){BLAB.respawn+=1/60;if(BLAB.respawn>1.6)blabFoe();}
  const t=document.getElementById('blabNext');if(t){const b=W.bolts.find(x=>x.from===e);const sc=b?(b.refl?'отбив':BLAB_SCEN_RU[BLAB.cur]||''):(BLAB.scen==='self'?'играете сами':BLAB.scen==='auto'?'дальше: '+BLAB_SCEN_RU[blabScenFor(BLAB.n)]:'');
    t.textContent=sc+(BLAB.mode==='alt'?' · «'+(FIN.boltFx.on?'после':'до')+'» ещё '+(3-BLAB.n%3)+' выстр.':'');}}

{const _step=step;step=function(dt){if(!BLAB.on)return _step(dt);
  if(G.cine){try{G.cine.skip();G.cine.t=G.cine.dur;}catch(err){}}
  if(!BLAB.ready){_step(dt);if(!G.cine&&G.state==='play')blabSetup();return;}
  try{blabPre();}catch(err){console.error('boltlab',err);}
  _step(dt*BLAB.slow);
  try{blabPost();}catch(err){console.error('boltlab',err);}};}

/* ---------- своя камера: сбоку, с тряской игры ---------- */
{const _rd=render;render=function(){if(!BLAB.on||!BLAB.cam)return _rd();const cam=BLAB.cam,c=BLAB.c,Wd=innerWidth,Hh=innerHeight;
  if(FIN.U&&FIN.U.time)FIN.U.time.value=performance.now()/1000;
  try{sun.target.position.copy(c);sun.position.copy(c).add(W.sunOff);}catch(err){}renderer.shadowMap.needsUpdate=true;
  const tall=Wd/Hh<1;if(tall!==BLAB.wasTall){BLAB.wasTall=tall;if(tall){cam.position.copy(BLAB.tall.pos);cam.lookAt(BLAB.tall.look);}else{cam.position.copy(BLAB.base);cam.lookAt(c);}}
  cam.position.copy(tall?BLAB.tall.pos:BLAB.base);try{if(rigs[0]&&rigs[0].shOff)cam.position.add(rigs[0].shOff);}catch(err){}
  cam.aspect=Wd/Hh;cam.fov=Wd/Hh<1?78:42;cam.updateProjectionMatrix();renderer.setViewport(0,0,Wd,Hh);renderer.setScissor(0,0,Wd,Hh);renderer.render(scene,cam);
  PANES=[{cam,x:0,w:Wd,h:Hh,pi:0,poly:null,A:[Wd/2,Hh/2]}];};}

/* ---------- запуск ---------- */
FIN.boltLabStart=function(){if(BLAB.on)return;BLAB.on=true;try{initAudio();if(AC&&AC.resume)AC.resume();}catch(err){}
  try{if(FIN.splashOn&&FIN.splashEnd)FIN.splashEnd();}catch(err){}
  document.body.classList.add('blab');const g=document.getElementById('blabGo');if(g)g.remove();blabPanel();
  if(typeof KIDS!=='undefined'&&KIDS)KIDS.seen=true;
  FIN.set.vox=0;FIN.set.mus=Math.min(FIN.set.mus,0.2);   // без голосов, музыка тише — слышно выстрел (в сохранение не пишем)
  startFrom(LV('1-1'));};
if(BLAB.want){blabCss();
  {const _fb=finBoot;finBoot=function(){_fb();
    const go=document.createElement('div');go.id='blabGo';go.innerHTML='<div><b>Стенд: выстрел морока</b>Морок-стрелок кидает синюю каплю, герой по очереди пропускает её, ловит щитом и отбивает. '+
      'Сравните «До» и «После», включайте шаги по одному, замедляйте.<br><i>Начать (со звуком)</i></div>';
    go.onclick=()=>FIN.boltLabStart();document.body.appendChild(go);};}}
