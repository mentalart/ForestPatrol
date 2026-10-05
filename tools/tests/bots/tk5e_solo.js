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
// страница 2: Садко держит воду сам; колокола по порядку
const r=[GO(5),SILL(2)];const S=E5.ar[2].S,X=500,BP=[[-7,-5],[7,-5],[-7,4],[7,4]];
for(let round=0;round<4&&S.chain<3;round++){for(let i=0;i<700&&S.ph!=='answer';i++)TK(1);TK(60);for(const b of S.seq.slice()){const p=new THREE.Vector3(X+BP[b][0],0,BP[b][1]);PUT(ME(),p.x,p.z+1.2);const t=ZC.W.hittables.find(t=>t.alive()&&Math.hypot(t.pos.x-p.x,t.pos.z-p.z)<0.5);if(t)t.onHit(ME());ZC.tick(4);}r.push('chain='+S.chain);}
TK(240);r.push('won='+!!E5.done[5]);if(!E5.done[5])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// страница 3: один свет — один замок открывает клетку (птицы помогают)
const r=[GO(6),SILL(3)];const X=700;PUT(ME(),X-9.5,3);TK(10);r.push('light='+ME().k5lt);const L0=ZC.W.hittables.find(t=>t.alive()&&Math.hypot(t.pos.x-(X-1.65),t.pos.z+0.9)<0.6);PUT(ME(),X-2.6,0);if(L0)L0.onHit(ME());
TK(480);r.push('won='+!!E5.done[6]);if(!E5.done[6])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// страница 4: ковка в такт, второй конец узды — Демьян, у Горыныча — один удар
const r=[GO(7),SILL(4)];const X=900,S=E5.ar[4].S;PUT(ME(),X+4,12.6);for(let i=0;i<900&&S.ph==='forge';i++){const per=0.8,ph=(S.bt%(per*3))/(per*3);if((ph>0.88||ph<0.04)&&ZC.G.time>(window._ft||0)){window._ft=ZC.G.time+0.5;ZC.W.onAttack(0,ME());}TK(1);}
const br=E5.ar[4].targets(0)[0];PUT(ME(),br.position.x-1.1,br.position.z);const f=ZC.W.itemSign(0);if(f)f(0);ZC.tick(2);r.push('carry='+!!S.carry);
for(let z=ME().pos.z;z>-16.4;){const wait=S.eye>0.2||(S.fire&&S.fire.t<1.6&&Math.abs(ME().pos.x-(X+[-2,0,2][S.fire.li]))<1.2);ME().face=S.eye>0.2?0:Math.PI;const x=S.fire?[X+1,X+2,X-1][S.fire.li]:X-1;PUT(ME(),x,z);ZC.tick(1);if(!wait)z-=0.25;if(!S.carry)break;}
ZC.W.onAttack(0,ME());TK(300);r.push('ph='+S.ph+' won='+!!E5.done[7]);if(!E5.done[7])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// стадия 10: корни, заклёпки, плечо — один удар в замок на груди
const r=[GO(10)];const ES=E5.es;for(let k=0;k<2;k++){const x=k?2.2:-2.2;for(let i=0;i<500&&ES.root!==k&&!ES.knee[k];i++){PUT(ME(),x+0.6,-17.4);TK(1);}for(let i=0;i<8&&!ES.knee[k];i++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.3);if(t)t.onHit(ME());ZC.tick(3);}}
TK(120);PUT(ME(),1.7,-18.6,7.5);ZC.tick(2);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.6);if(t)t.onHit(ME());TK(600);r.push('knees='+ES.knee+' won='+!!E5.done[10]);if(!E5.done[10])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// стадия 11: одна рябь — спутник откликается; один удар в трещину; щит у замершего друга; окна; нить
const r=[GO(11)];const ES=E5.es;ZC.W.pingCall(0,ME());TK(90);const cr=E5.stage[11].targets(0)[0];r.push('crack='+!!cr);if(cr){PUT(ME(),cr.position.x-1,cr.position.z);ZC.W.onAttack(0,ME());}TK(180);r.push('ph='+ES.ph);
for(let k=0;k<14&&ES.spes>0;k++){for(let i=0;i<400&&!ES.mv&&!(ES.win>0);i++)TK(1);if(ES.mv){const p=E5.stage[11].targets(0)[0].position;ZC.hold('KeyG',true);for(let i=0;i<120&&ES.mv;i++){PUT(ME(),p.x,p.z);ZC.tick(1);}ZC.hold('KeyG',false);}
  for(let i=0;i<120&&!(ES.win>0);i++)TK(1);for(let j=0;j<3&&ES.win>0&&ES.spes>0;j++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t)t.onHit(ME());ZC.tick(22);}}
r.push('mem='+ES.mem+' spes='+ES.spes);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.4);if(t)t.onHit(ME());TK(200);r.push('won='+!!E5.done[11]);if(!E5.done[11])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// стадия 12: игла (отладкой) → «Тянем-потянем» одним → сцена «Цепь»
const r=[GO(12)];TK(60);K5.forge.n=K5.forge.need;ZC.W.dbg5e().stageWin(5);for(let i=0;i<300&&!E5.es.repkaAtk;i++)TK(1);const R0=E5.es.rp;
for(let i=0;i<60*40&&R0&&!R0.done;i++){ZC.hold('KeyG',!!R0.surge);if(R0.pullAt!=null&&Math.abs(R0.t-R0.pullAt)<0.05&&R0.lastPullBeat!==R0.beat&&!R0.last)E5.es.repkaAtk(ME(),0);if(R0.last)E5.es.repkaAtk(ME(),0);ZC.tick(1);}ZC.hold('KeyG',false);
r.push('repka='+!!(R0&&R0.done));for(let i=0;i<60*200&&ZC.W.flags.stage!=='chain';i++)TK(1);r.push('stage='+ZC.W.flags.stage);if(ZC.W.flags.stage!=='chain')throw new Error(r.join(' | '));CHK('k5epic solo ok '+r.join(' | '))
