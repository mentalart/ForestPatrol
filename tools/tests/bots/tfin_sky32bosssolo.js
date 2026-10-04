//@@ wait=1500
// релиз final06: 3-2 «Облачные пастбища» — Громовой Баран ОДНИМ игроком: Йоша поливает стожок, Q — Прошка со светом за стожком,
// Баран бежит на того, кем играешь; радуга — Йоша сама (дождик + своё перо позади тучки); Пушок — Прошка со светом. Без бессмертия.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const W=ZC.W,H=ZC.HERO;ZC.FIN.tut32.auto=false;ZC.FIN.warp('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka');U.goto(0,0,-307,5);ZC.tick(5);U.nocine();ZC.tick(10);const B=W.ram32;if(B.phase!==1)throw new Error('этап не 1: '+B.phase);'solo boss phase='+B.phase
//@@
// этап 1 одним игроком: Йоша поливает, Q к Прошке (свет), стоим за стожком, увяз — бьём
window.PREP=(S)=>{if(S.puffy)return true;U.toKind('yosha');const Y=ZC.HERO.yosha;for(let i=0;i<60*8&&!S.puffy&&S.gone<=0;i++){if(U.def(0,i)){ZC.tick(1);continue;}if(U.step(0,S.x+1.4,S.z+0.8,0.4)){U.rel(0);Y.face=Math.atan2(S.x-Y.pos.x,S.z-Y.pos.z);if(i%20===0)ZC.press('KeyE');}ZC.tick(1);}U.rel(0);return S.puffy;};
window.PICK=()=>{const SB=ZC.W.stogs.slice(-4),e=ZC.W.ram32.e;return SB.filter(s=>s.gone<=0).sort((a,b)=>Math.hypot(b.x-e.pos.x,b.z-e.pos.z)-Math.hypot(a.x-e.pos.x,a.z-e.pos.z))[0]||SB[0];};
const W=ZC.W,H=ZC.HERO,B=W.ram32,e=B.e;let stucks=0,hurt=0;const p0=ZC.players[0].petals+ZC.players[1].petals;
for(let n=0;n<10&&B.phase===1;n++){const S=PICK();PREP(S);U.toKind('proshka');const Pr=H.proshka;if(!Pr.lit){U.tap('KeyR');}
  const bx=S.x+(S.x-e.pos.x)/Math.hypot(S.x-e.pos.x,S.z-e.pos.z)*1.7,bz=S.z+(S.z-e.pos.z)/Math.hypot(S.x-e.pos.x,S.z-e.pos.z)*1.7;
  for(let i=0;i<60*14&&B.ai!=='stuck'&&B.phase===1;i++){if(B.ai==='charge'&&Math.hypot(e.pos.x-Pr.pos.x,e.pos.z-Pr.pos.z)<3.2&&!S.puffy)ZC.press('ShiftLeft');U.step(0,bx,bz,0.4);ZC.tick(1);}U.rel(0);
  if(B.ai==='stuck'){stucks++;for(let i=0;i<60*9&&(B.ai==='stuck'||e.state==='broken')&&B.phase===1;i++){U.hit(0,e,i);ZC.tick(1);}}}
U.rel(0);if(B.phase<1.5)throw new Error('одиночный этап 1 не пройден: stucks='+stucks+' emb='+e.embers+' '+U.st());U.nocine();ZC.tick(10);
'solo phase1 ok stucks='+stucks+' petals '+p0+'→'+(ZC.players[0].petals+ZC.players[1].petals)
//@@
const W=ZC.W,H=ZC.HERO,B=W.ram32,e=B.e,RW=W.rains.find(r=>r.name==='rw');if(B.phase!==2)throw new Error('не этап 2: '+B.phase);U.toKind('yosha');const Y=H.yosha;if(!Y.lit)U.tap('KeyR');
let jumps=0,falls=0;for(let i=0;i<60*180&&B.phase===2;i++){
  if(ZC.players[1].downed||ZC.players[0].downed){ZC.tick(1);continue;}
  const s=B.strikes.find(q=>!q.done&&Math.hypot(q.at.x-Y.pos.x,q.at.z-Y.pos.z)<1.8&&q.t/q.dur>0.6);ZC.hold('KeyG',!!s&&Y.pos.y<24);
  if(Y.pos.y<27.2){if(!RW.bow.on){if(RW.rain<=0.3){if(U.step(0,RW.x-1.2,RW.z+1.0,0.4)){U.rel(0);Y.face=Math.atan2(RW.x-Y.pos.x,RW.z-Y.pos.z);if(i%20===0)ZC.press('KeyE');}}}else U.step(0,-2.9,-316,0.3);}
  else{if(B.stompT>0&&B.stompT<0.25&&Y.grounded){ZC.press('Space');jumps++;}else U.hit(0,e,i);}
  ZC.tick(1);}
ZC.hold('KeyG',false);U.rel(0);if(B.phase<2.5)throw new Error('одиночный этап 2 не пройден: emb='+e.embers+' '+U.st()+' petals='+ZC.players[1].petals);U.nocine();ZC.tick(10);'solo phase2 ok jumps='+jumps
//@@
const W=ZC.W,H=ZC.HERO,B=W.ram32,e=B.e,LB=W.lamb32,F=W.flags;if(B.phase!==3)throw new Error('не этап 3: '+B.phase);
for(let n=0;n<10&&!F.won;n++){const S=PICK();PREP(S);U.toKind('proshka');const Pr=H.proshka;if(!Pr.lit)U.tap('KeyR');
  const bx=S.x+(S.x-e.pos.x)/Math.hypot(S.x-e.pos.x,S.z-e.pos.z)*1.7,bz=S.z+(S.z-e.pos.z)/Math.hypot(S.x-e.pos.x,S.z-e.pos.z)*1.7;
  for(let i=0;i<60*14&&B.ai!=='stuck'&&B.ai!=='bonk'&&!F.won;i++){U.step(0,bx,bz,0.4);ZC.tick(1);}U.rel(0);
  for(let i=0;i<60*8&&(B.ai==='stuck'||B.ai==='bonk')&&!F.won;i++){U.step(0,e.pos.x+(Pr.pos.x>e.pos.x?1.4:-1.4),e.pos.z+1.6,0.4);ZC.tick(1);}U.rel(0);}
if(!F.won)throw new Error('одиночный этап 3 не пройден: '+U.st()+' lamb='+LB.pos.x.toFixed(1)+','+LB.pos.z.toFixed(1)+' scared='+LB.scared.toFixed(1));
U.nocine();ZC.tick(20);const L4=W.items.filter(i=>i.kind==='link').pop();U.goto(0,L4.pos.x,L4.pos.z,6);ZC.tick(240);
if(ZC.W.levelId==='3-2'&&!ZC.G.done['3-2'])throw new Error('одиночный: уровень не пройден link='+L4.taken);
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'3-2 boss solo done errs=0 lvl='+ZC.W.levelId
