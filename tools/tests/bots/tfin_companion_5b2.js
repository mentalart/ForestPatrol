//@@ wait=1500
// релиз final06: напарник-бот в битве 5-Б2: пролог (полёт на Горыныче), красные круги, замки героев, Леший и стадия 3. Человека (Игрок 1) играет скрипт: стоит, неуязвим, в нужный миг жмёт «умение» на «три» и бьёт нить сказа.
window.SEED=n=>{let q=n;Math.random=()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};};SEED(12345);
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
    if(i===60*25){const L=E5.fr.leshy.m.g.position;out.push('LESHY@'+L.x.toFixed(1)+','+L.z.toFixed(1)+' zones='+(K5.zones||[]).map(z=>'0x'+z.children[0].material.color.getHex().toString(16)+'@'+z.position.x.toFixed(1)+','+z.position.z.toFixed(1)+' r='+z.children[0].geometry.parameters.outerRadius).join(';')+' boltT='+(K5.nat&&K5.nat.boltT)+' inR='+E5.es.inR+' fight='+K5.fight+' hold='+(E5.es.inR)+' downed='+ZC.players[1].downed+' h.iT='+A(1).iT+' knock='+A(1).knockT+' hp='+pos(A(1))+' other='+pos(ZC.players[1].heroes[1-ZC.players[1].act])+' human='+pos(A(0))+' rows='+(E5.es.rows||[]).length);}if(i>60*25&&i<60*25+120&&i%30===0)out.push('~'+pos(A(1))+' v='+Math.hypot(A(1).vel.x,A(1).vel.z).toFixed(1)+' '+CO.mode);if(i%(60*10)===0)out.push('['+(i/60).toFixed(0)+'s '+CO.mode+' '+pos(A(1))+' cur='+E5.cur+' ui='+ZC.G.ui+']');if(E5.cur!==n)break;}
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
//@@
// стадия 2: Леший в цепи — бот встаёт в зелёный круг, уходит из красных кругов; обе молнии рвут замки
SEED(4242);
const t0=GOS(2);const out=[];let minP=3;
for(let i=0;i<60*120&&!E5.free.leshy;i++){for(const k of['proshka','potap'])H[k].iT=99;ZC.players[0].petals=3;ZC.tick(1);minP=Math.min(minP,ZC.players[1].petals);}
if(!E5.free.leshy)throw new Error('Леший не освобождён: clasp='+(E5.es.clasp||0)+' '+pos(A(1))+' '+CO.mode);
'leshy free clasp='+E5.es.clasp+' minPetals='+minP
//@@
// замки: Кощей сковал героя человека — бот освобождает ударами; сковали бота — он меняет героя
SEED(4242);
const t0=GOS(2);const K=ZC.FIN.k5;
const hu=A(0);K.lockHero(hu);ZC.tick(2);let ok=false;
for(let i=0;i<60*20;i++){for(const k of['proshka','potap'])H[k].iT=99;ZC.tick(1);if(!K.locks[hu.kind]){ok=true;break;}}
if(!ok)throw new Error('замок не сбит: '+pos(A(1))+' '+CO.mode+' hp='+JSON.stringify(Object.keys(K.locks).map(k=>K.locks[k].hp)));
const b=A(1);K.lockHero(b);ZC.tick(2);let sw=false;for(let i=0;i<60*6;i++){for(const k of['proshka','potap'])H[k].iT=99;ZC.tick(1);if(A(1)!==b){sw=true;break;}}
if(!sw)throw new Error('бот не сменил героя');
'locks ok'
//@@
// стадия 3: туман и мороки — бот ловит капли, бьёт Кощея в окне, веретено Кикиморы, мороков; нить сказа — вместе с человеком
SEED(4242);
const t0=GOS(3);const ES=E5.es;let downs=0,wasDown=false,bound=false;
const HT=()=>ZC.W.hittables.find(t=>t.r===1.4);
for(let i=0;i<60*300&&E5.cur===3&&!E5.done[3];i++){for(const k of['proshka','potap'])H[k].iT=99;ZC.players[0].petals=3;ZC.players[1].petals=3;ZC.tick(1);
  for(const b of ZC.W.bolts)if(b.tgt===A(0)&&!b.refl&&b.left===null&&b.eta<0.2)ZC.press('KeyG');   // человек отбивает свои капли
  if(ES.down&&!wasDown)downs++;wasDown=ES.down;
  if(ES.fight&&ES.down&&ES.spes<=0&&!bound){bound=true;const t=HT();if(t)t.onHit(A(0));}}
if(!E5.done[3])throw new Error('стадия 3 не пройдена: spes='+ES.spes+' downs='+downs+' kiki='+!!E5.free.kiki+' '+pos(A(1))+' '+CO.mode+' pet='+ZC.players[1].petals+' downed='+ZC.players[1].downed+' ui='+ZC.G.ui+' cast='+!!ES.cast+' castT='+ES.castT+' blobT='+(ES.blobT&&ES.blobT.toFixed(1))+' walk='+ES.walk+' gone='+(ES.gone||[]).join('')+' bolts='+ZC.W.bolts.length+' real='+ES.real+' fight='+ES.fight+' KSvis='+ZC.W.dbg5e().KS.g.visible+'@'+ZC.W.dbg5e().KS.g.position.x.toFixed(1)+','+ZC.W.dbg5e().KS.g.position.y.toFixed(1)+','+ZC.W.dbg5e().KS.g.position.z.toFixed(1)+' down='+ES.down+' walkJump='+ES.walkJump+' logs='+E5.logs.slice(-8).join(','));
'stage3 ok downs='+downs+' kiki='+!!E5.free.kiki
//@@
// стадия 1: замок на цепи Кота-часов — бот сбивает его ударами, пока свечи горят (человек стоит)
SEED(4242);
const t0=GOS(1);const CK=E5.clock;let seen=false,broke=false;
for(let i=0;i<60*90&&!broke;i++){for(const k of['proshka','potap'])H[k].iT=99;ZC.players[0].petals=3;ZC.players[1].petals=3;ZC.tick(1);
  const L=CK.locks.find(q=>q.alive);if(L)seen=true;else if(seen)broke=true;}
if(!seen)throw new Error('замок на цепи Кота не появился');if(!broke)throw new Error('замок на цепи Кота не сбит: '+pos(A(1))+' '+CO.mode+' locks='+CK.locks.length);
'clock lock ok'
