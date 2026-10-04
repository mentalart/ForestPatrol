//@@ wait=1500
// релиз: «сочный бой» (late_91b_juice) и «мир, боссы, вдвоём, микс» (late_91c_juice_world) — docs/23_vfx_sfx.md, перенесено с полигона.
// Застава Добрыни: удар даёт hit-stop/проседание/лесенку, замах — нить цели и блик, урон — кромку и лепесток; полоска босса —
// представление, этап (стингер), последний удар; плиты вдвоём — аккорд; трава и кусты, перо, микшер, настройки 100/50/0.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.addEventListener('error',e=>window._errs.push(String(e.message).slice(0,200)));
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.JX=ZC.FIN.juice;window.JW=ZC.FIN.juiceW;window.CNT={};
for(const [o,ks] of [[JX.snd,['hit','glint','note','hurt','unravel','swish']],[JW.snd,['sub','stinger','shower','chord','zvyak','rustle']]])for(const k of ks){const f=o[k];o[k]=function(){CNT[k]=(CNT[k]||0)+1;return f.apply(this,arguments);};}
window.PUT=(h,x,z,face)=>{h.pos.set(x,h.pos.y,z);h.vel.set(0,0,0);if(face!=null)h.face=face;ZC.tick(2);};
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.G.manual=true;ZC.startFrom(ZC.LV('z-d'));ZC.tick(60);NOCINE();ZC.tick(30);
JSON.stringify({lvl:ZC.W.levelId,foes:ZC.W.enemies.length,set:[ZC.FIN.set.shakeK,ZC.FIN.set.flashK,ZC.FIN.set.caps,ZC.FIN.set.rumble],errs:_errs.length})
//@@
// удар по мороку: ждём окно (оглушён/открыт) — бьём; считаем hit-stop, проседание, звук, лесенку
{const h=U.act(0);let hs=0,sq=0;for(let i=0;i<60*25&&!(CNT.hit>=2);i++){const e=ZC.W.enemies.filter(e=>e.alive).sort((a,b)=>Math.hypot(a.pos.x-h.pos.x,a.pos.z-h.pos.z)-Math.hypot(b.pos.x-h.pos.x,b.pos.z-h.pos.z))[0];if(!e){ZC.tick(5);continue;}
    e.open=0.5;PUT(h,e.pos.x,e.pos.z+1.5,Math.PI);ZC.press('KeyF');for(let j=0;j<20;j++){ZC.tick(1);hs=Math.max(hs,ZC.G.hitstop);sq=Math.max(sq,e._sqA||0);}h.iT=2;}
  window.R1={hs:+hs.toFixed(3),sq,hit:CNT.hit||0,note:CNT.note||0,combo:JX.combo[0].n};}
JSON.stringify(R1)
//@@
// замах: нить цели и блик
{const h=U.act(0);let ring=false;const c0=CNT.glint||0;for(let i=0;i<60*12;i++){ZC.tick(1);h.iT=2;if(ZC.W.enemies.some(e=>e._jt&&e._jt.ring.visible))ring=true;if(ring&&(CNT.glint||0)>c0)break;}window.R2={ring,glint:(CNT.glint||0)-c0};}
JSON.stringify(R2)
//@@ shot=tfin_juice_fight.png
// урон: кромка, лепесток, «ой»; подписи к звукам включаются в настройках
{ZC.FIN.set.caps=true;const h=U.act(0),p=ZC.players[0];h.iT=0;p.petals=3;const e=ZC.W.enemies.find(e=>e.alive)||{pos:h.pos.clone()};const ok=JW.T.damage(h,{kind:'enemy',ref:e});ZC.tick(3);
  const edge=Math.max(...[...document.querySelectorAll('div')].filter(d=>/255, ?110, ?150/.test(d.style.background)).map(d=>+d.style.opacity||0));
  window.R3={ok,petals:p.petals,petal:JX.parts.filter(x=>x.kind==='petal').length,edge,hurt:CNT.hurt||0,caps:[...document.querySelectorAll('div')].filter(d=>/^\[ой!/.test(d.textContent)).length};ZC.FIN.set.caps=false;}
JSON.stringify(R3)
//@@
// две плиты разом, на них герои разных игроков — общий аккорд
{const c0=CNT.chord||0;const a=JW.T.plate(-2.5,-6),b=JW.T.plate(2.5,-6);const h0=U.act(0),h1=U.act(1);PUT(h0,-2.5,-6);PUT(h1,2.5,-6);a.pressed=b.pressed=true;ZC.tick(3);window.R5={chord:(CNT.chord||0)-c0};a.pressed=b.pressed=false;ZC.tick(2);}
JSON.stringify(R5)
//@@
// мир 1: трава и кусты (шейдер ветра + шорох), мир 3: перо светится
{ZC.startFrom(ZC.LV('1-1'));ZC.tick(60);NOCINE();ZC.tick(20);const bush=(ZC.W._jwBush||[]).length;const P=JW.push.value;const h=U.act(0);
  let rus=0;const B=(ZC.W._jwBush||[]).filter(b=>Math.abs(b.y-h.pos.y)<0.6);const b=B.sort((p,q)=>Math.hypot(p.x-h.pos.x,p.z-h.pos.z)-Math.hypot(q.x-h.pos.x,q.z-h.pos.z))[0];
  if(b){ZC.hold('KeyA',true);for(let i=0;i<30;i++){h.pos.set(b.x+1.2-i*0.08,b.y+0.02,b.z);ZC.tick(1);}ZC.hold('KeyA',false);rus=CNT.rustle||0;}
  window.R6={bush,near:B.length,push:[P[0].w,P[4].w],rus};}
JSON.stringify(R6)
//@@
// полоска босса (как у Лешего, Водяного, Горыныча) на 1-1: представление → этап 2 (стингер) → этап 3, полоска пуста — последний удар
{const bb=document.getElementById('bossbar');bb.style.display='block';bb.innerHTML='<b>Леший-Путаник</b> · фаза 1 / 3 <span class="seg"><i style="width:100%"></i></span>';ZC.tick(3);
  const intro=JW.bw.seen&&(CNT.sub||0)===1&&JW.hushT>0;bb.innerHTML='<b>Леший-Путаник</b> · фаза 2 / 3 <span class="seg"><i style="width:60%"></i></span>';ZC.tick(3);const st2=CNT.stinger||0;
  bb.innerHTML='<b>Леший-Путаник</b> · фаза 3 / 3 <span class="seg"><i style="width:40%"></i></span>';ZC.tick(3);bb.innerHTML='<b>Леший-Путаник</b> · фаза 3 / 3 <span class="seg"><i style="width:0%"></i></span>';ZC.tick(3);
  const last=JW.bw.done;ZC.tick(120);window.R4={intro,st2,st3:CNT.stinger||0,last,shower:CNT.shower||0};bb.style.display='none';
  bb.style.display='block';bb.innerHTML='<b style="color:#ffd76a">0:45</b> · <span>богатырское время</span>';const was=JW.bw.ph;ZC.tick(3);R4.zastIgnored=JW.bw.ph===was;bb.style.display='none';}
JSON.stringify(R4)
//@@
{ZC.startFrom(ZC.LV('3-1'));ZC.tick(60);NOCINE();ZC.tick(30);R6.magic=JW.magic.length;R6.magicLive=JW.magic.filter(m=>m.sp&&m.sp.visible).length;}
JSON.stringify([R4,R6])
//@@ shot=tfin_juice_sky.png
// настройки: тряска и вспышки — 100/50/0; «Вспышки 0 %» — без кромки и без белой вспышки
{const s=ZC.FIN.set;s.flashK=0.5;s.shakeK=0.5;ZC.FIN.applySettings();const soft=document.body.classList.contains('fin-softflash');s.flashK=0;ZC.FIN.applySettings();const none=document.body.classList.contains('fin-noflash');
  s.flashK=1;s.shakeK=1;ZC.FIN.applySettings();window.R7={soft,none,back:!document.body.classList.contains('fin-noflash')&&!document.body.classList.contains('fin-softflash'),mix:!!(JW.mix&&(JW.mix.ready||!window.AudioContext))};}
const ok=R1.hs>=0.04&&R1.sq>0&&R1.hit>=1&&R1.note>=1&&R2.ring&&R2.glint>=1&&R3.ok&&R3.petal>=1&&R3.edge>0.3&&R3.hurt>=1&&R3.caps>=1&&R4.intro&&R4.st2===1&&R4.st3===2&&R4.last&&R4.shower===1&&R4.zastIgnored&&R5.chord===1&&R6.near>0&&R6.rus>=1&&R6.push[0]===1&&R6.magic>0&&R7.soft&&R7.none&&R7.back&&_errs.length===0;
(ok?'tfin_juice ok ':'FAIL tfin_juice ')+JSON.stringify({R1,R2,R3,R4,R5,R6,R7,errs:_errs.slice(0,3)})
