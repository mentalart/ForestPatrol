//@@ wait=1500
// полигон эффектов, заход 2 (сборка --sandbox, docs/23_vfx_sfx.md): колокольчик-«костёр», босс-манекен (представление, три этапа, слабое место,
// последний удар), плиты на двоих и удар вместе (аккорд), стрелка к другу, зов со стороны, луг (трава, кусты), перо с пыльцой, звено летит
// к герою, эмбиент, слои музыки, ограничение одинаковых звуков, лимитер, тряска/вспышки/подписи/вибрация; Ё (JU.all=false) — всё как в релизе.
// Запуск: python3 zlataya_cep/build/build_final.py --sandbox && tools/tests/run_one.sh tsb_juice2 zlataya_cep/zlataya_cep_sandbox.html
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.addEventListener('error',e=>window._errs.push(String(e.message).slice(0,200)));
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.JU=ZC.FIN.ju;window.J2=ZC.FIN.ju2;window.C=J2.cnt;
window.PUT=(h,x,z,face)=>{h.pos.set(x,0.05,z);h.vel.set(0,0,0);if(face!=null)h.face=face;h.following=false;ZC.tick(2);};
ZC.G.manual=true;ZC.setSolo(false);ZC.startFrom(ZC.LV('sb'));document.querySelectorAll('div').forEach(d=>{if(/Полигон эффектов/.test(d.textContent)&&d.style.zIndex==='70')d.remove();});ZC.tick(30);NOCINE();J2.T.audio();ZC.tick(5);
window.R0={lvl:ZC.W.levelId,round:JU.round,feats2:JU.feats.filter(f=>f[4]===2).length,feats1:JU.feats.filter(f=>f[4]===1).length,steps:JU.feats.some(f=>f[0]==='steps'),
  title:(document.querySelector('#juPanel h3')||{}).textContent,mix:J2.mix.ready,errs:_errs.length};
JSON.stringify(R0)
//@@ shot=tsb2_start.png
// 4.4 колокольчик: вспышка, кольца, фраза, «покой» в миксе; подпись
{const h=U.act(0);PUT(h,9,7.8);ZC.tick(6);window.R1={bell:C.bell||0,calm:+J2.calmT.toFixed(2),cap:C.caption||0,capEl:document.body.innerText.indexOf('[колокольчик')>=0};}
JSON.stringify(R1)
//@@ shot=tsb2_bell.png
// 7.1 луг: идём сквозь траву и куст; 7.2 перо — ореол и пыльца
{const h=U.act(0);PUT(h,-21,9.2);ZC.hold('KeyD',true);ZC.tick(60*1.4);ZC.hold('KeyD',false);ZC.tick(5);
  window.R2={x:+h.pos.x.toFixed(1),bent:C.bentMax||0,rustle:C.rustle||0,glow:J2.magic.feG.visible,pollen:J2.magic.pollen};}
JSON.stringify(R2)
//@@ shot=tsb2_meadow.png
// 7.3 звено летит к герою, счётчик подпрыгивает; 7.4 эмбиент
{const h=U.act(0),L=ZC.W.items.find(i=>i.kind==='link'&&!i.taken);PUT(h,L.pos.x,L.pos.z);ZC.tick(40);
  window.R3={pickup:C.pickup||0,bump:C.hudBump||0,bird:C.amb_bird||0,drop:C.amb_drop||0,wind:!!J2.amb.wind};}
JSON.stringify(R3)
//@@
// 8.1 слои музыки: рядом морок — бой, далеко — гаснет за 2,5 с
{const h=U.act(0),e=ZC.W.enemies.find(e=>!e.sbDummy&&!e.sbBoss&&e.alive&&e.pos.z<-8);PUT(h,e.pos.x,e.pos.z+3.5);ZC.tick(60);const b1=J2.bat;
  PUT(h,-26,16);ZC.tick(60);const b2=J2.bat;ZC.tick(60*2);window.R4={near:+b1.toFixed(2),after1s:+b2.toFixed(2),after3s:+J2.bat.toFixed(2)};}
JSON.stringify(R4)
//@@
// 8.2 не больше трёх одинаковых, 8.3 лимитер, 9.1 тряска, 9.2/9.5 вспышки, 9.4 вибрация
{const d0=C.dropped||0;for(let i=0;i<6;i++)J2.T.SFX.clink();const dropped=(C.dropped||0)-d0;ZC.tick(2);
  J2.s.shake=0;J2.T.shake(0,0.1,0.2);const sh0=J2.lastShake;J2.s.shake=0.5;J2.T.shake(0,0.1,0.2);const sh5=J2.lastShake;J2.s.shake=1;
  J2.s.flash=0.5;ZC.tick(2);const flk=getComputedStyle(document.documentElement).getPropertyValue('--j2flk').trim(),cls=document.body.className;J2.s.flash=1;
  window.R5={dropped,lim:J2.mix.limOn,sh0,sh5,flk,flkCls:/j2-flk/.test(cls),calmCls:/j2-calm/.test(cls),rumble:C.rumbleNew||0};}
JSON.stringify(R5)
//@@
// 6.1 плиты на двоих: аккорд; удар вместе по манекену — аккорд
{const a=U.act(0),b=U.act(1);PUT(a,18,6.5);PUT(b,26,6.5);ZC.tick(8);const pl={co:C.coChord||0,done:J2.co.done};
  const e=ZC.W.enemies.find(e=>e.sbCo&&e.alive);let hit=0;
  for(let i=0;i<8&&!(C.coHit>0);i++){PUT(a,e.pos.x,e.pos.z+1.4,Math.PI);PUT(b,e.pos.x,e.pos.z-1.4,0);ZC.tick(20);ZC.press('KeyF');ZC.press('Comma');ZC.tick(12);}
  window.R6={plates:pl,coHit:C.coHit||0,coChord:C.coChord||0};}
JSON.stringify(R6)
//@@ shot=tsb2_coop.png
// 6.2 стрелка к другу (он далеко, за кадром), 6.3 зов звучит с той стороны экрана, где зовущий
{const a=U.act(0),b=U.act(1);PUT(a,24,15);PUT(b,-26,-30);ZC.tick(120);const ar=C.arrowFrame||0,vis=J2.arrows.some(x=>x.style.display==='block');
  ZC.press('Digit1');ZC.tick(3);window.R7={arrow:ar,vis,call:C.call||0,pan:J2.lastCallPan};}
JSON.stringify(R7)
//@@ shot=tsb2_arrow.png
// раздел 5: босс-манекен — представление, слабое место, три этапа, последний удар
{const a=U.act(0),b=U.act(1),B=J2.boss;PUT(b,-26,16);PUT(a,18,-17);ZC.tick(5);B.reset(true);PUT(a,B.C.x,B.C.z+2.4,Math.PI);ZC.tick(10);
  const intro={st:B.state,intro:C.bossIntro||0,name:B.name&&B.name.style.opacity,hush:J2.hushT>0};ZC.tick(60*3);
  let slow=1,tries=0;while(B.state==='fight'&&tries++<160){const e=B.e;PUT(a,e.pos.x,e.pos.z+e.r+0.9,Math.PI);if(B.open){ZC.press('KeyF');}for(let j=0;j<16;j++){ZC.tick(1);slow=Math.min(slow,J2.slowK);}}
  for(let j=0;j<60*3;j++){ZC.tick(1);slow=Math.min(slow,J2.slowK);}
  window.R8={intro,hits:C.bossHit||0,weakOpen:C.weakOpen||0,zvyak:C.zvyak||0,phase:C.bossPhase||0,stinger:C.stinger||0,last:C.lastHit||0,slow,silence:C.silence||0,shower:C.shower||0,state:B.state};}
JSON.stringify(R8)
//@@ shot=tsb2_boss.png
// Ё: всё как в релизе — новые эффекты не срабатывают, микшер в обход
{JU.all=false;const s0=JSON.stringify(C);const a=U.act(0),b=U.act(1),B=J2.boss;const k0={...C};
  PUT(a,-26,16);PUT(b,-26,14);ZC.tick(30);PUT(a,9,7.8);ZC.tick(6);                       // колокольчик
  PUT(a,18,6.5);PUT(b,26,6.5);ZC.tick(8);                                                   // плиты
  PUT(a,-21,9.2);ZC.hold('KeyD',true);ZC.tick(60);ZC.hold('KeyD',false);                   // луг
  PUT(b,-26,-30);PUT(a,24,15);ZC.tick(90);ZC.press('Digit1');ZC.tick(3);                   // зов, стрелка
  PUT(b,-26,16);PUT(a,18,-17);ZC.tick(5);B.reset(true);PUT(a,B.C.x,B.C.z+2.4,Math.PI);ZC.tick(60*3);   // босс
  const d0=C.dropped||0;for(let i=0;i<6;i++)J2.T.SFX.clink();
  const keys=['bell','coChord','rustle','call','arrowFrame','bossIntro','zvyak','caption','rumbleNew','pickup','amb_bird','amb_drop','stinger','lastHit'];
  const diff=keys.filter(k=>(C[k]||0)!==(k0[k]||0)).map(k=>k+':'+(k0[k]||0)+'→'+C[k]);
  window.R9={diff,dropped:(C.dropped||0)-d0,lim:J2.mix.limOn,bat:J2.bat,arrowsHidden:J2.arrows.every(x=>x.style.display==='none'),grass:J2.meadow.bent,glow:J2.magic.feG.visible,bossSt:B.state};JU.all=true;}
const ok=R0.round===2&&R0.feats2===20&&!R0.steps&&/заход 2/.test(R0.title)&&R1.bell>=1&&R1.calm>0&&R1.capEl&&R2.bent>20&&R2.rustle>=1&&R2.glow&&R2.pollen>5&&R3.pickup>=1&&R3.bump>=1&&
  R4.near>0.9&&R4.after3s<0.05&&R4.after1s<R4.near&&R5.dropped>=3&&R5.lim===true&&R5.sh0===0&&R5.sh5===0.05&&R5.flkCls&&R6.plates.co>=1&&R6.coHit>=1&&R6.coChord>=2&&
  R7.arrow>0&&R7.call>=1&&Math.abs(R7.pan)>0.2&&R8.intro.intro>=1&&R8.intro.name==='1'&&R8.weakOpen>=1&&R8.zvyak>=1&&R8.phase>=2&&R8.stinger>=2&&R8.last>=1&&R8.slow<0.5&&R8.shower>=1&&R8.state==='dead'&&
  R9.diff.length===0&&R9.dropped===0&&R9.lim===false&&R9.arrowsHidden&&R9.grass===0&&!R9.glow&&_errs.length===0;
(ok?'tsb_juice2 ok ':'FAIL tsb_juice2 ')+JSON.stringify({R0,R1,R2,R3,R4,R5,R6,R7,R8,R9,errs:_errs.slice(0,4)})
//@@ shot=tsb2_panel.png
// панель (Tab): заход 2 сверху, заход 1 — ниже
dispatchEvent(new KeyboardEvent('keydown',{code:'Tab',bubbles:true}));ZC.tick(2);[...document.querySelectorAll('#juPanel h4')].map(x=>x.textContent).join(' | ')
