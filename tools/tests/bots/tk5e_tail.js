//@@
// @timeout=1500
// Битва с Кощеем (сборка --k5epic, docs/28_koschei_epic_build.md): хвост прохода: стадии 10–12 с прыжка (для быстрой проверки).
// Прежние этапы (стадии 1, 2, 8, 9, 12) выигрываются отладочными вызовами (их проверяют боты релиза), новые механики — через их же
// цели (удары, предмет, «Ко мне!»): Кот-часы и замки, Леший и молния, мороки и кудель, четыре страницы и поездки домой, витязи,
// великан, «Без имён», «Тянем-потянем», Сказ по памяти. Ролики и карточки пропускаются.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];window.H=ZC.HERO;
window.FIGHT=n=>E5.OLD[n]?K5.fight:(n>=4&&n<=7?(E5.es.step==='walk'||E5.es.fight):E5.es.fight);
window.WAITCUR=(n,max)=>{for(let i=0;i<(max||60*150);i++){if(E5.cur===n&&!ZC.G.cine&&ZC.G.ui!=='skaz'&&FIGHT(n))return 'cur'+n+'@'+(i/60).toFixed(0)+'s';
    if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0){ZC.press('Space');ZC.press('KeyM');}ZC.tick(1);}
  throw new Error('WAITCUR '+n+': cur='+E5.cur+' ui='+ZC.G.ui+' cine='+!!ZC.G.cine+' fight='+K5.fight+' es='+JSON.stringify({f:E5.es.fight,st:E5.es.step,ph:E5.es.ph})+' log='+(E5.logs||[]).slice(-6).join(',')+' errs='+_errs.slice(0,3).join(' / '));};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}};
window.PUT=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.05,z);h.vel.set(0,0,0);};
window.HT=(p,r)=>ZC.W.hittables.filter(t=>t.alive()&&Math.hypot(t.pos.x-p.x,t.pos.z-p.z)<(r||1.5));
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.BREAK=()=>{const kb=K5.KB;kb.embers=0;kb.state='broken';kb.t=0;kb.pos.y=0;ZC.tick(3);kb.k5hit(kb,A(0));ZC.tick(2);kb.k5hit(kb,A(1));ZC.tick(10);};
for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(10);ZC.G.manual=true;ZC.tick(20);{const D=ZC.W.dbg5e();window.THREE=D.THREE;window.k5Zone=D.k5Zone;}CHK(WAITCUR(10))
//@@ shot=k5e_f10.png
// стадия 10: корни Лешего держат ногу — заклёпки; великан на колене; на плечо — в замок на груди вдвоём
const r=[];const ES=E5.es;r.push('start root='+ES.root+' A0='+A(0).pos.toArray().map(v=>v.toFixed(1))+' A1='+A(1).pos.toArray().map(v=>v.toFixed(1))+' k0='+A(0).kind+' k1='+A(1).kind);for(let k=0;k<2;k++){const x=k?2.2:-2.2;for(let i=0;i<200&&ES.root!==k&&!ES.knee[k];i++){PUT(A(0),x+0.6,-17.4);TK(1);}for(let i=0;i<8&&!ES.knee[k];i++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.3);if(t)t.onHit(A(0));ZC.tick(3);}}
r.push('knees='+ES.knee.join(',')+' ph='+ES.ph);TK(120);PUT(A(0),1.7,-18.6,7.5);PUT(A(1),1.9,-19.2,7.5);ZC.tick(2);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.6);if(t){t.onHit(A(0));t.onHit(A(1));}r.push('ph='+ES.ph);try{r.push(WAITCUR(11,60*60));}catch(e){throw new Error(r.join(' | ')+' :: '+e.message);}CHK(r.join(' | '))
//@@ shot=k5e_f11.png
// стадия 11: «Ко мне!» обоих — трещина; удар с двух сторон — стена пала; четыре друга вспоминают себя — окна; нить
const r=[];const ES=E5.es;ZC.W.pingCall(0,A(0));ZC.W.pingCall(1,A(1));TK(40);const cr=E5.stage[11].targets(0)[0];r.push('crack='+!!cr);
if(cr){PUT(A(0),cr.position.x-1,cr.position.z);PUT(A(1),cr.position.x+1,cr.position.z);ZC.W.onAttack(0,A(0));ZC.W.onAttack(1,A(1));}TK(180);r.push('ph='+ES.ph+' names='+Object.keys(ZC.G.flags.names||{}).join(','));
for(let k=0;k<12&&ES.spes>0;k++){for(let i=0;i<400&&!ES.mv&&!(ES.win>0);i++)TK(1);if(ES.mv){const p=E5.stage[11].targets(0)[0].position;PUT(A(0),p.x-0.6,p.z);PUT(A(1),p.x+0.6,p.z);ZC.hold('KeyG',true);ZC.hold('Period',true);for(let i=0;i<120&&ES.mv;i++){PUT(A(0),p.x-0.6,p.z);PUT(A(1),p.x+0.6,p.z);ZC.tick(1);}ZC.hold('KeyG',false);ZC.hold('Period',false);}
  for(let i=0;i<120&&!(ES.win>0);i++)TK(1);for(let j=0;j<3&&ES.win>0&&ES.spes>0;j++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t)t.onHit(A(j%2));ZC.tick(22);}}
r.push('mem='+ES.mem.join(',')+' spes='+ES.spes);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t){t.onHit(A(0));ZC.tick(2);t.onHit(A(1));}r.push(WAITCUR(12,60*120));r.push('names.proshka='+!!(ZC.G.flags.names||{}).proshka);CHK(r.join(' | '))
//@@ shot=k5e_f12.png
// стадия 12: застёжка выкована → «Тянем-потянем» в такт, рывок Кощея — щиты, последний рывок — Йоша → сцена «Цепь» → конец уровня
const r=[];TK(60);K5.forge.n=K5.forge.need;ZC.W.dbg5e().stageWin(5);for(let i=0;i<300&&!E5.es.repkaAtk;i++)TK(1);r.push('repka='+!!E5.es.repkaAtk);
const R0=E5.es.rp;for(let i=0;i<60*40&&R0&&!R0.done;i++){ZC.hold('KeyG',!!R0.surge);ZC.hold('Period',!!R0.surge);
  if(R0.pullAt!=null&&Math.abs(R0.t-R0.pullAt)<0.05&&R0.lastPullBeat!==R0.beat&&!R0.last){E5.es.repkaAtk(A(0),0);E5.es.repkaAtk(A(1),1);}if(R0.last)E5.es.repkaAtk(H.yosha,1);ZC.tick(1);}
ZC.hold('KeyG',false);ZC.hold('Period',false);r.push('repka done='+!!(R0&&R0.done)+' k='+(R0&&R0.k));
for(let i=0;i<60*200&&ZC.W.flags.stage!=='chain';i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0){ZC.press('Space');ZC.press('KeyM');}ZC.tick(1);}
r.push('stage='+ZC.W.flags.stage+' ending='+(ZC.G.flags.ending||[]).join(','),'logs='+E5.logs.length);if(ZC.W.flags.stage!=='chain')throw new Error('нет сцены «Цепь»: '+r.join(' | '));CHK('k5epic flow ok '+r.join(' | '))
