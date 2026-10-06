//@@
// @timeout=1500
// Битва с Кощеем (сборка --k5epic) в одиночном режиме: новые механики стадий 3–7 и 10–12 одним игроком — кудель тянет Кикимора сама,
// клубок на ногу дважды, Садко держит воду, замок клетки — один свет, второй конец узды несёт Демьян, стену зовёт одна рябь,
// «Тянем-потянем» — одно нажатие. Каждая стадия — прыжком; пройдена — следующая стадия началась.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;window.ME=()=>ZC.players[ZC.G.soloPi].heroes[ZC.players[ZC.G.soloPi].act];
window.FIGHT=n=>E5.OLD[n]?K5.fight:(n>=4&&n<=7?(E5.es.step==='walk'||E5.es.fight):E5.es.fight);
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');ZC.tick(1);}};
window.WAITCUR=(n,max)=>{for(let i=0;i<(max||60*150);i++){if(E5.cur===n&&!ZC.G.cine&&ZC.G.ui!=='skaz'&&FIGHT(n))return 'cur'+n+'@'+(i/60).toFixed(0)+'s';TK(1);}
  throw new Error('WAITCUR '+n+': cur='+E5.cur+' ui='+ZC.G.ui+' fight='+K5.fight+' es='+JSON.stringify({f:E5.es.fight,st:E5.es.step,ph:E5.es.ph})+' log='+(E5.logs||[]).slice(-6).join(',')+' errs='+_errs.slice(0,3).join(' / '));};
window.PUT=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.05,z);h.vel.set(0,0,0);};
window.HTR=r=>ZC.W.hittables.filter(t=>t.alive()&&t.r===r);window.FULL10=()=>{for(const pi of[0,1])ZC.players[pi].petals=3;};
// стадия 10: на колене — на плечо, удар в замок на груди; оковы — замки на лежащей руке; глаза — оба круга у ног
window.HEART=hs=>{const ES=E5.es;for(let i=0;i<60*8&&ES.ph!=='heart';i++){FULL10();TK(1);}for(let i=0;i<120;i++){FULL10();TK(1);}hs.forEach((h,j)=>PUT(h,1.7+j*0.2,-18.6-j*0.6,7.5));ZC.tick(2);const t=HTR(1.6)[0];if(t)hs.forEach(h=>t.onHit(h));TK(2);return 'пробой'+ES.breaks+' ph='+ES.ph;};
window.WRISTS=hs=>{const ES=E5.es;for(let i=0;i<60*8&&ES.ph!=='wrists';i++){FULL10();TK(1);}for(let i=0;i<60*14&&ES.arm!=='down';i++){hs.forEach((h,j)=>PUT(h,3+j,-12));if(ES.arm==='rest'&&ES.at>0.3)ES.at=0.3;FULL10();TK(1);}
  for(let k=0;k<20&&ES.ph==='wrists'&&ES.arm==='down';k++){const t=HTR(1.3)[0];if(!t)break;PUT(hs[0],t.pos.x,t.pos.z,t.pos.y-1);t.onHit(hs[0]);TK(2);}return 'оковы='+ES.wHp.join(',')+' ph='+ES.ph;};
window.EYES=hs=>{const ES=E5.es;for(let i=0;i<60*8&&ES.ph!=='eyes';i++){FULL10();TK(1);}for(let i=0;i<60*8&&ES.ph==='eyes';i++){if(hs.length>1){PUT(hs[0],-2.2,-17.8);PUT(hs[1],2.2,-17.8);}else PUT(hs[0],i<90?-2.2:2.2,-17.8);FULL10();TK(1);}
  return 'корни='+ES.r2.map(v=>v.toFixed(1)).join(',')+' ph='+ES.ph;};
window.BREAK3=hs=>[HEART(hs),WRISTS(hs),HEART(hs),EYES(hs),HEART(hs)].join(' ');
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.GO=n=>{E5.goStage(n);ZC.G.manual=true;ZC.tick(20);return WAITCUR(n);};
window.SILL=w=>{const P=E5.pages[w];for(let i=0;i<300&&E5.es.step!=='fight';i++){PUT(ME(),P.pos.x,P.pos.z);TK(1);}for(let i=0;i<300&&!E5.es.fight;i++)TK(1);return 'in'+w+'='+E5.es.fight;};
ZC.setSolo(true);for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(3);ZC.G.manual=true;ZC.tick(20);{const D=ZC.W.dbg5e();window.THREE=D.THREE;}CHK(WAITCUR(3))
//@@
// стадия 3: веретено (удар Потапа) — Кикимора свободна; Кощей сбит (S3.down — сбивание проверяет tk5e_s3); окна; нить одним
const ES=E5.es,S3=E5.s3,r=[];{const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.1);if(t)t.onHit(ZC.HERO.potap);}r.push('kiki='+!!E5.free.kiki);
for(let k=0;k<8&&ES.spes>0;k++){for(let j=0;j<400&&ES.down;j++)ZC.tick(1);ZC.tick(50);S3.down('бот');for(let j=0;j<6&&ES.down&&ES.spes>0;j++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t)t.onHit(ME());ZC.tick(25);}}
r.push('spes='+ES.spes);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t)t.onHit(ME());TK(30);r.push('done3='+!!E5.done[3]);if(!E5.done[3])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// страница 1: застряла в дубе (бот), клубок дважды на каждую ногу, «Повернись!» одним ударом, Кощей с крыши
const r=[GO(4),SILL(1)];const A1=E5.ar[1],S=A1.S;A1.bot.stuck();ZC.tick(2);for(let li=0;li<2;li++)for(let k=0;k<2;k++){const lp=A1.legW(li),ot=A1.legW(1-li),dx=lp.x-ot.x,dz=lp.z-ot.z,dl=Math.hypot(dx,dz)||1;PUT(ME(),lp.x+dx/dl*0.9,lp.z+dz/dl*0.9);const f=ZC.W.itemSign(0);if(f)f(0);ZC.tick(2);}
r.push('tied='+S.tied.join(','));TK(20);const cs=A1.targets(0);if(cs[0]){PUT(ME(),cs[0].position.x,cs[0].position.z);ZC.W.onAttack(0,ME());}TK(200);for(let k=0;k<8&&!S.done;k++){A1.bot.roofHit(ME());TK(30);}TK(120);r.push('done='+S.done+' won='+!!E5.done[4]);if(!E5.done[4])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// страница 2: Садко держит воду сам; три переклички; Благовест одним ударом
const r=[GO(5),SILL(2)];const A2=E5.ar[2],S=A2.S;
for(let round=0;round<6&&S.chain<3;round++){for(let i=0;i<60*30&&S.ph!=='answer';i++)TK(1);TK(60);A2.bot.answer();r.push('chain='+S.chain);}
for(let i=0;i<60*10&&S.ph!=='final';i++)TK(1);TK(100);for(let k=0;k<3&&S.ph==='final';k++){A2.bot.blag(ME());TK(100);}r.push('благовест='+S.fin);
TK(240);r.push('won='+!!E5.done[5]);if(!E5.done[5])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// страница 3: один свет — замки подряд (пара 1 — ночь, пара 2 — Жар-птица свободна); кольцо на клюве одним ударом дважды
const r=[GO(6),SILL(3)];const A3=E5.ar[3],S=A3.S;const W8=(ph)=>{for(let i=0;i<60*10&&S.ph!==ph;i++)TK(1);return S.ph;};
for(const ph of['night','wind']){for(let k=0;k<5&&S.ph!==ph&&S.ph!=='free';k++){S.whT=99;A3.bot.light(ME(),0);A3.bot.lock(0,ME());A3.bot.lock(1,ME());TK(5);}r.push(W8(ph));}
const So=A3.SOL;for(let k=0;k<4&&S.ph==='wind';k++){PUT(ME(),So.x,So.z+1.8);A3.bot.ring(ME());TK(90);}r.push('кольцо='+S.ring);
TK(480);r.push('won='+!!E5.done[6]);if(!E5.done[6])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// страница 4: ковка (Демьян качает меха), второй конец узды — Демьян, у Горыныча — один удар, когда голова опустилась
const r=[GO(7),SILL(4)];const X=900,A4=E5.ar[4],S=A4.S;A4.bot.forge();
const br=A4.bot.bridle().clone();PUT(ME(),br.x-1.1,br.z);const f=ZC.W.itemSign(0);if(f)f(0);ZC.tick(2);r.push('carry='+!!S.carry);
for(let z=ME().pos.z;z>-15.0;){S.blobT=99;const wait=S.eye>0.2||(S.fire&&S.fire.t<1.6&&Math.abs(ME().pos.x-(X+[-2,0,2][S.fire.li]))<1.2);ME().face=S.eye>0.2?0:Math.PI;const x=S.fire?[X+1,X+2,X-1][S.fire.li]:X-1;PUT(ME(),x,z);ZC.tick(1);if(!wait)z-=0.25;if(!S.carry)break;}
for(let i=0;i<60*20&&S.ph==='crown';i++){S.biteT=99;PUT(ME(),X,-12.3);ME().face=S.eye>0.2?0:Math.PI;if(S.hd==='low'&&S.eye<0.2&&i%15===0)ZC.W.onAttack(0,ME());TK(1);}TK(300);
r.push('ph='+S.ph+' won='+!!E5.done[7]);if(!E5.done[7])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// стадия 10: корни, заклёпки, плечо — один удар в замок на груди
const r=[GO(10)];const ES=E5.es;for(let k=0;k<2;k++){const x=k?2.2:-2.2;for(let i=0;i<500&&ES.root!==k&&!ES.knee[k];i++){PUT(ME(),x+0.6,-17.4);TK(1);}for(let i=0;i<8&&!ES.knee[k];i++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.3);if(t)t.onHit(ME());ZC.tick(3);}}
r.push(BREAK3([ME()]));TK(600);r.push('won='+!!E5.done[10]);if(!E5.done[10])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// стадия 11: одна рябь — спутник откликается; один удар в трещину; щит у замершего друга; окна; нить
const r=[GO(11)];const ES=E5.es;ZC.W.pingCall(0,ME());TK(90);const cr=E5.stage[11].targets(0)[0];r.push('crack='+!!cr);if(cr){PUT(ME(),cr.position.x-1,cr.position.z);ZC.W.onAttack(0,ME());}TK(180);r.push('ph='+ES.ph);
for(let k=0;k<14&&ES.spes>0;k++){for(let i=0;i<400&&!ES.mv&&!(ES.win>0);i++)TK(1);if(ES.mv){const p=E5.stage[11].targets(0)[0].position;ZC.hold('KeyG',true);for(let i=0;i<120&&ES.mv;i++){PUT(ME(),p.x,p.z);ZC.tick(1);}ZC.hold('KeyG',false);}
  for(let i=0;i<120&&!(ES.win>0);i++)TK(1);for(let j=0;j<3&&ES.win>0&&ES.spes>0;j++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t)t.onHit(ME());ZC.tick(22);}}
r.push('mem='+ES.mem+' spes='+ES.spes);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t)t.onHit(ME());TK(200);r.push('won='+!!E5.done[11]);if(!E5.done[11])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// стадия 12: игла (отладкой) → «Тянем-потянем» одним → сцена «Цепь»
const r=[GO(12)];TK(60);K5.forge.n=K5.forge.need;ZC.W.dbg5e().stageWin(5);for(let i=0;i<300&&!E5.es.repkaAtk;i++)TK(1);const R0=E5.es.rp;
for(let i=0;i<60*40&&R0&&!R0.done;i++){ZC.hold('KeyG',!!R0.surge);if(R0.near&&Math.abs(R0.t-R0.next(R0.t))<0.1&&R0.lastPullAt!==R0.next(R0.t)&&!R0.last)E5.es.repkaAtk(ME(),0);if(R0.last)E5.es.repkaAtk(ME(),0);ZC.tick(1);}ZC.hold('KeyG',false);
r.push('repka='+!!(R0&&R0.done));for(let i=0;i<60*200&&ZC.W.flags.stage!=='chain';i++)TK(1);r.push('stage='+ZC.W.flags.stage);if(ZC.W.flags.stage!=='chain')throw new Error(r.join(' | '));CHK('k5epic solo ok '+r.join(' | '))
