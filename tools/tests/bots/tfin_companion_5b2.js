//@@ wait=1500
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;window.CO=ZC.FIN.co;window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];window.H=ZC.HERO;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.FIGHT=n=>E5.OLD[n]?K5.fight:(n>=4&&n<=7?(E5.es.step==='walk'||E5.es.fight):E5.es.fight);
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0){ZC.press('Space');}ZC.tick(1);}};
window.GOS=n=>{for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(n);ZC.G.manual=true;ZC.tick(20);CO.set(true);CO.skill=1;
  for(let i=0;i<60*120;i++){if(E5.cur===n&&!ZC.G.cine&&ZC.G.ui!=='skaz'&&FIGHT(n))return i;if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');ZC.tick(1);}return -1;};
window.SURVEY=(n,sec)=>{const t0=GOS(n);const out=['st'+n+' ready@'+t0];const lm={};
  for(let i=0;i<60*sec;i++){for(const k of['proshka','potap'])H[k].iT=99;ZC.players[0].petals=3;ZC.players[1].petals=3;ZC.tick(1);if(ZC.G.cine&&i%3===0)ZC.skip();
    if(i%(60*10)===0)out.push('['+(i/60).toFixed(0)+'s '+CO.mode+' '+pos(A(1))+' cur='+E5.cur+' ui='+ZC.G.ui+']');if(E5.cur!==n)break;}
  out.push('end cur='+E5.cur+' logs='+(E5.logs||[]).slice(-4).join(','));return out.join(' ');};
['ok']
//@@
// пролог: человек стоит, жмёт огонь и «три»; бот сам берёт курс, бьёт своих ворон, отбивает свои капли и жмёт «три»
const st0=ZC.G.stats.parries||0;
for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(0);ZC.G.manual=true;ZC.tick(20);CO.set(true);CO.skill=1;
const PRO=E5.pro;let leg='',legs=[],fireH=0,tm=0,seen=new Set(),refl=new Set(),d1=0;
for(let i=0;i<60*400&&E5.cur!==1;i++){
  if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');
  if(PRO.on&&!ZC.G.cine){
    if(i%27===0)ZC.press('KeyF');
    const C0=PRO.cnt;if(C0&&C0.press[0]===null&&C0.t>=1.5-0.02)ZC.press('KeyE');
    if(PRO.leg!==leg){leg=PRO.leg;legs.push(leg+'@'+(i/60).toFixed(0));}}
  if(PRO.on){const X=E5.proX();for(const d of X.drops){if(d.pi===1&&!seen.has(d)){seen.add(d);d1++;}if(d.refl)refl.add(d);}}
  ZC.tick(1);}
if(E5.cur!==1)throw new Error('пролог не пройден: leg='+PRO.leg+' legs='+legs.join(',')+' crows='+PRO.crows+' cnt='+JSON.stringify(PRO.cnt&&PRO.cnt.press)+' tries='+PRO.tries+' '+CO.mode);
['pro ok legs='+legs.join(',')+' crows='+PRO.crows+' orbs='+PRO.orbs+' hits='+PRO.hits+' wards='+PRO.wards+' parries='+((ZC.G.stats.parries||0)-st0)+' tries='+PRO.tries+' dropsP2='+d1+' refl='+refl.size]
//@@
// пролог, отрезок «Через моря», огонь бота отключён: вороны Игрока 2 успевают бросить капли — бот отбивает их щитом в последний миг (и они сбивают воронов)
for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(0);ZC.G.manual=true;ZC.tick(20);CO.set(true);CO.skill=1;
const P2=E5.pro;const seen2=new Set(),refl2=new Set();let seaT=0;
for(let i=0;i<60*200&&P2.leg!=='sky'&&E5.cur!==1;i++){
  if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');
  if(ZC.FIN.co.k5b2)ZC.FIN.co.k5b2.t.fire=1e9;
  if(P2.on){const X=E5.proX();for(const d of X.drops){if(d.pi===1&&!seen2.has(d)){seen2.add(d);}if(d.pi===1&&d.refl)refl2.add(d);}}
  ZC.tick(1);}
if(!(seen2.size>0))throw new Error('капель в бота не было (leg='+P2.leg+')');
if(!(refl2.size>0&&refl2.size>=seen2.size-1))throw new Error('капли не отбиты щитом: брошено '+seen2.size+' отбито '+refl2.size);
['shield ok drops='+seen2.size+' refl='+refl2.size]
