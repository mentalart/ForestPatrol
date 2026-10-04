//@@
// @timeout=1500
// Битва с Кощеем (сборка --k5epic, docs/28_koschei_epic_build.md): проход всех двенадцати стадий вдвоём от стадии 1 до сцены «Цепь».
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
for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(1);ZC.G.manual=true;ZC.tick(20);{const D=ZC.W.dbg5e();window.THREE=D.THREE;window.k5Zone=D.k5Zone;}CHK(WAITCUR(1))
//@@
// стадия 1: Кот-часы — замок на цепи сбит ударом; свечи — парами; купол лопнул → ролик → стадия 2
for(const pi of[0,1])ZC.players[pi].petals=99;TK(240);const CK=E5.clock;const r=['clock='+CK.live+' ph='+CK.ph+' locks='+CK.locks.filter(L=>L.alive).length];
const L=CK.locks.find(L=>L.alive);if(L){PUT(A(0),L.pos.x-0.4,L.pos.z+1.0);for(let i=0;i<3&&L.alive;i++){L.ht.onHit(A(0));ZC.tick(2);}r.push('lock alive='+L.alive);}
const c=K5.candles;for(const x of c)for(let i=0;i<6&&x.lit;i++)x.k5hit(x,A(0));r.push('lit='+c.filter(x=>x.lit).length);r.push(WAITCUR(2));r.push('done1='+!!E5.done[1]);CHK(r.join(' | '))
//@@ shot=k5e_f2.png
// стадия 2: Леший в цепи — две молнии рядом с ним рвут ошейник; спесь Кощея сбита → нить сказа → туман → стадия 3
const r=[];const LM=E5.fr.leshy.m.g.position;for(let k=0;k<2;k++){k5Zone(LM.clone(),1.6,0.3,0xff4a5a,()=>{});TK(40);}r.push('leshy free='+!!E5.free.leshy,'spruces='+E5.spruces.length);
if(!E5.free.leshy)throw new Error('Леший не освободился: '+r.join(' '));BREAK();r.push(WAITCUR(3));CHK(r.join(' | '))
//@@ shot=k5e_f3.png
// стадия 3: веретено — Кикимора свободна; кудель-рогатка сбивает настоящего; окно — удары; нить → листы-страницы → Сказ: начало → стадия 4
const ES=E5.es;const r=[];TK(30);
for(let i=0;i<3&&!E5.free.kiki;i++){const t=ZC.W.hittables.find(t=>t.alive()&&Math.hypot(t.pos.x+7.4,t.pos.z+9.2)<1.5);if(t)t.onHit(A(0));ZC.tick(2);}r.push('kiki free='+!!E5.free.kiki);
for(let k=0;k<6&&ES.spes>0;k++){for(let j=0;j<240&&!ES.down;j++){const W0=ZC.W;if(!ES.fly&&j%30===0){PUT(A(1),-6.4,-6.2);const t=W0.hittables.find(t=>t.alive()&&Math.hypot(t.pos.x+8.2,t.pos.z+5.2)<0.5);if(t)t.onHit(A(0));}ZC.tick(1);}
  for(let j=0;j<6&&ES.down&&ES.spes>0;j++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.3);if(t)t.onHit(A(j%2));ZC.tick(25);}}
r.push('spes='+ES.spes,'log='+E5.logs.filter(x=>/sling|s3down/.test(x)).length);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.3);if(t){t.onHit(A(0));ZC.tick(2);t.onHit(A(1));}r.push('done3='+!!E5.done[3]);r.push(WAITCUR(4));r.push('names.potap='+!!(ZC.G.flags.names||{}).potap);CHK(r.join(' | '))
//@@
// страницы 1–4: порог вдвоём → арена → цель мира → поездка домой; страница 1 — клубок на ноги, «Повернись!»
window.SILL=w=>{const P=E5.pages[w];PUT(A(0),P.pos.x-0.5,P.pos.z);PUT(A(1),P.pos.x+0.5,P.pos.z);for(let i=0;i<200&&E5.es.step!=='fight';i++){PUT(A(0),P.pos.x-0.5,P.pos.z);PUT(A(1),P.pos.x+0.5,P.pos.z);TK(1);}for(let i=0;i<300&&!E5.es.fight;i++)TK(1);return 'in'+w+' step='+E5.es.step+' fight='+E5.es.fight;};
const r=[SILL(1)];const A1=E5.ar[1],S=A1.S;for(let li=0;li<2;li++){for(const pi of[0,1]){const lp=A1.legW(li);PUT(A(pi),lp.x+(pi?0.8:-0.8),lp.z+0.8);const f=ZC.W.itemSign(pi);if(f)f(pi);ZC.tick(2);}}
r.push('tied='+S.tied.join(',')+' st='+S.st);if(S.st!=='sit')throw new Error('избушка не села: '+r.join(' | ')+' log='+E5.logs.slice(-6).join(','));
TK(20);const cs=A1.targets(0);PUT(A(0),cs[0].position.x,cs[0].position.z);PUT(A(1),cs[1].position.x,cs[1].position.z);ZC.W.onAttack(0,A(0));ZC.W.onAttack(1,A(1));TK(200);r.push('st='+S.st+' done='+S.done);
r.push(WAITCUR(5));r.push('yaga free='+!!E5.free.yaga);CHK(r.join(' | '))
//@@ shot=k5e_f5.png
// страница 2: гусли у раковины — прилив; золотые колокола в порядке Кощея; три цепи → Водяной свободен
const r=[SILL(2)];const S=E5.ar[2].S;const X=500,SH=new THREE.Vector3(X,0,8.5);
for(let round=0;round<4&&S.chain<3;round++){for(let i=0;i<600&&S.ph!=='answer';i++)TK(1);PUT(A(0),SH.x,SH.z);const f=ZC.W.itemSign(0);if(f)f(0);TK(80);
  const BP=[[-7,-5],[7,-5],[-7,4],[7,4]];for(const b of S.seq.slice()){const p=new THREE.Vector3(X+BP[b][0],0,BP[b][1]);PUT(A(1),p.x,p.z+1.2);const t=ZC.W.hittables.find(t=>t.alive()&&Math.hypot(t.pos.x-p.x,t.pos.z-p.z)<0.5);if(t)t.onHit(A(1));ZC.tick(4);}r.push('chain='+S.chain);}
r.push(WAITCUR(6));r.push('vod free='+!!E5.free.vod);CHK(r.join(' | '))
//@@ shot=k5e_f6.png
// страница 3: свет печали и свет радости; замки клетки — разом
const r=[SILL(3)];const X=700;PUT(A(0),X-9.5,3);PUT(A(1),X+9.5,3);TK(10);r.push('lights='+A(0).k5lt+','+A(1).k5lt);
const L0=ZC.W.hittables.find(t=>t.alive()&&Math.hypot(t.pos.x-(X-1.65),t.pos.z+0.9)<0.6),L1=ZC.W.hittables.find(t=>t.alive()&&Math.hypot(t.pos.x-(X+1.65),t.pos.z+0.9)<0.6);
PUT(A(0),X-2.6,0);PUT(A(1),X+2.6,0);if(L0)L0.onHit(A(0));if(L1)L1.onHit(A(1));r.push('ph='+E5.ar[3].S.ph);r.push(WAITCUR(7));r.push('zhar='+!!E5.free.zhar+' solo='+!!E5.free.solo);CHK(r.join(' | '))
//@@ shot=k5e_f7.png
// страница 4: три удара в такт у наковальни; клещи вдвоём; к голове Горыныча — разом
const r=[SILL(4)];const X=900,S=E5.ar[4].S;PUT(A(0),X+4,12.6);for(let i=0;i<900&&S.ph==='forge';i++){const per=0.8,ph=(S.bt%(per*3))/(per*3);if((ph>0.88||ph<0.04)&&ZC.G.time>(window._ft||0)){window._ft=ZC.G.time+0.5;ZC.W.onAttack(0,A(0));}TK(1);}r.push('ph='+S.ph+' good='+S.good);
const br=E5.ar[4].targets(0)[0];const bp=br.position.clone();PUT(A(0),bp.x-1.1,bp.z);PUT(A(1),bp.x+1.1,bp.z);for(const pi of[0,1]){const f=ZC.W.itemSign(pi);if(f)f(pi);ZC.tick(2);}r.push('carry='+!!S.carry);
const XS=[[0.2,2.2],[-2.1,2.1],[-2.2,-0.2]];let xs=[-1.1,1.1];for(let z=bp.z;z>-16.4;){if(S.fire)xs=XS[S.fire.li];const wait=S.eye>0.2||(S.fire&&S.fire.t<1.6);A(0).face=wait&&S.eye>0.2?0:Math.PI;A(1).face=A(0).face;PUT(A(0),X+xs[0],z);PUT(A(1),X+xs[1],z);ZC.tick(1);if(!wait)z-=0.25;if(!S.carry)break;}r.push('carry@'+A(0).pos.z.toFixed(1)+'='+!!S.carry);
ZC.W.onAttack(0,A(0));ZC.W.onAttack(1,A(1));TK(30);r.push('ph='+S.ph);try{r.push(WAITCUR(8,60*240));}catch(e){throw new Error(r.join(' | ')+' :: '+e.message);}r.push('gor='+!!E5.free.gor+' names.yosha='+!!(ZC.G.flags.names||{}).yosha);CHK(r.join(' | '))
//@@ shot=k5e_f8.png
// стадия 8: буря — Кощей уносит героя, шар через схваченного; спесь сбита → меч → стадия 9
const r=[];TK(60);const ES=E5.es;ES.grabT=0;for(let i=0;i<400&&!ES.grab;i++){TK(1);}r.push('grab='+!!ES.grab);if(ES.grab){const g=ES.grab.h;for(let i=0;i<700&&ES.grab;i++){for(const o of K5.orbs){if(o.left===null&&o.eta<0.25)ZC.W.onGuardTap(o.tgt.player,o.tgt);}TK(1);}r.push('released caught='+E5.logs.includes('caught'));}
BREAK();r.push(WAITCUR(9));CHK(r.join(' | '))
//@@ shot=k5e_f9.png
// стадия 9: рог — оба у знамён: витязи сметают щитников; спесь сбита → «над златом чахнет» → стадия 10
const r=[];TK(60);const ES=E5.es;PUT(A(0),-8.6,-12.5);PUT(A(1),8.6,-12.5);ES.hornT=0.5;TK(80);r.push('charge='+E5.logs.includes('vitCharge'));BREAK();r.push(WAITCUR(10));CHK(r.join(' | '))
//@@ shot=k5e_f10.png
// стадия 10: корни Лешего держат ногу — заклёпки; великан на колене; на плечо — в замок на груди вдвоём
const r=[];const ES=E5.es;r.push('start root='+ES.root+' A0='+A(0).pos.toArray().map(v=>v.toFixed(1))+' A1='+A(1).pos.toArray().map(v=>v.toFixed(1))+' k0='+A(0).kind+' k1='+A(1).kind);for(let k=0;k<2;k++){const x=k?2.2:-2.2;for(let i=0;i<200&&ES.root!==k&&!ES.knee[k];i++){PUT(A(0),x+0.6,-17.4);TK(1);}for(let i=0;i<8&&!ES.knee[k];i++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.3);if(t)t.onHit(A(0));ZC.tick(3);}}
r.push('knees='+ES.knee.join(',')+' ph='+ES.ph);TK(120);PUT(A(0),1.7,-18.6,7.5);PUT(A(1),1.9,-19.2,7.5);ZC.tick(2);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.6);if(t){t.onHit(A(0));t.onHit(A(1));}r.push('ph='+ES.ph);try{r.push(WAITCUR(11,60*60));}catch(e){throw new Error(r.join(' | ')+' :: '+e.message);}CHK(r.join(' | '))
//@@ shot=k5e_f11.png
// стадия 11: «Ко мне!» обоих — трещина; удар с двух сторон — стена пала; четыре друга вспоминают себя — окна; нить
const r=[];const ES=E5.es;ZC.W.pingCall(0,A(0));ZC.W.pingCall(1,A(1));TK(40);const cr=E5.stage[11].targets(0)[0];r.push('crack='+!!cr);
if(cr){PUT(A(0),cr.position.x-1,cr.position.z);PUT(A(1),cr.position.x+1,cr.position.z);ZC.W.onAttack(0,A(0));ZC.W.onAttack(1,A(1));}TK(180);r.push('ph='+ES.ph+' names='+Object.keys(ZC.G.flags.names||{}).join(','));
for(let k=0;k<12&&ES.spes>0;k++){for(let i=0;i<400&&!ES.mv&&!(ES.win>0);i++)TK(1);if(ES.mv){const p=E5.stage[11].targets(0)[0].position;PUT(A(0),p.x-0.6,p.z);PUT(A(1),p.x+0.6,p.z);A(0).guard=true;A(1).guard=true;for(let i=0;i<90&&ES.mv;i++){A(0).guard=true;A(1).guard=true;PUT(A(0),p.x-0.6,p.z);PUT(A(1),p.x+0.6,p.z);ZC.tick(1);}A(0).guard=false;A(1).guard=false;}
  for(let i=0;i<120&&!(ES.win>0);i++)TK(1);for(let j=0;j<3&&ES.win>0&&ES.spes>0;j++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t)t.onHit(A(j%2));ZC.tick(22);}}
r.push('mem='+ES.mem.join(',')+' spes='+ES.spes);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t){t.onHit(A(0));ZC.tick(2);t.onHit(A(1));}r.push(WAITCUR(12,60*120));r.push('names.proshka='+!!(ZC.G.flags.names||{}).proshka);CHK(r.join(' | '))
//@@ shot=k5e_f12.png
// стадия 12: застёжка выкована → «Тянем-потянем» в такт, рывок Кощея — щиты, последний рывок — Йоша → сцена «Цепь» → конец уровня
const r=[];TK(60);K5.forge.n=K5.forge.need;ZC.W.dbg5e().stageWin(5);for(let i=0;i<300&&!E5.es.repkaAtk;i++)TK(1);r.push('repka='+!!E5.es.repkaAtk);
const R0=E5.es.rp;for(let i=0;i<60*40&&R0&&!R0.done;i++){if(R0.surge){A(0).guard=true;A(1).guard=true;}else{A(0).guard=false;A(1).guard=false;}
  if(R0.pullAt!=null&&Math.abs(R0.t-R0.pullAt)<0.05&&R0.lastPullBeat!==R0.beat&&!R0.last){E5.es.repkaAtk(A(0),0);E5.es.repkaAtk(A(1),1);}if(R0.last)E5.es.repkaAtk(H.yosha,1);ZC.tick(1);}
A(0).guard=false;A(1).guard=false;r.push('repka done='+!!(R0&&R0.done)+' k='+(R0&&R0.k));
for(let i=0;i<60*200&&ZC.W.flags.stage!=='chain';i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0){ZC.press('Space');ZC.press('KeyM');}ZC.tick(1);}
r.push('stage='+ZC.W.flags.stage+' ending='+(ZC.G.flags.ending||[]).join(','),'logs='+E5.logs.length);if(ZC.W.flags.stage!=='chain')throw new Error('нет сцены «Цепь»: '+r.join(' | '));CHK('k5epic flow ok '+r.join(' | '))
