//@@ wait=1500
// релиз final06: напарник-бот проходит 1-2 «Кикиморино болото» за Игрока 2 (Йошей): колышки над кочками, высокая ветка, толстая струна Потапа, гать Журавля, туман, кувшинки,
// бесёнок, колода, стычка и выход. Человека (Игрок 1) играет скрипт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.W=ZC.W;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
ZC.startFrom(ZC.LV('1-2'));ZC.G.manual=true;ZC.tick(30);window.W=ZC.W;CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
['me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode]
//@@
// колышки над кочками (дорожка справа): бот кидает клубок и идёт по струне; Паутинник у второго колышка — общий бой
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
const L=[];let last='';for(let i=0;i<60*40&&!(H.yosha.pos.z<-24&&!ZC.W.enemies.some(e=>e.alive));i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}if(CO.mode==='follow'&&H.yosha.pos.z<-24)break;}
L.push('yosha='+pos(H.yosha),'falls='+ZC.G.stats.falls,(H.yosha.pos.z<-24)?'stakes ok':'FAIL stakes');L
//@@
// высокая ветка: бот по пенькам наверх, клубок в колышек, съезд по струне (человек стоит в стороне)
const L=[];let last='';for(let i=0;i<60*50&&!(H.yosha.pos.z<-52);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('yosha='+pos(H.yosha),'nuts='+ZC.W.nuts,(H.yosha.pos.z<-52)?'branch ok':'FAIL branch');L
//@@
// толстая струна: человек — Потапом на камень-лапу, бросок; бот идёт по ней
put(me(),0,-57.5);if(me().kind!=='potap'){ZC.press('KeyQ');ZC.tick(10);}put(me(),0,-58.6);ZC.tick(20);me().face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.tick(40);
const th=ZC.W.threads.filter(t=>t.thick&&t.string).length;const u=U.until(()=>H.yosha.pos.z<-75,25);
['thick='+th,'cross '+u,'yosha='+pos(H.yosha),(th&&u!=='TIMEOUT')?'thick ok':'FAIL thick']
//@@
// гать Журавля и Цапли: человек (Прошка) кидает пролёты и бьёт Паутинников, как в t12long; бот идёт следом Йошей, пролёт к Цапле — его, если друг не бросил
window.SW=()=>ZC.W.sw12;window.KK=[{item:'KeyR',B:['KeyA','KeyD','KeyW','KeyS']},{item:'Semicolon',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
window.faceTo=(pi,x,z)=>{const h=U.act(pi);h.face=Math.atan2(x-h.pos.x,z-h.pos.z);};window.rel=pi=>KK[pi].B.forEach(k=>ZC.hold(k,false));
window.go8=(pi,x,z,max)=>{const h=U.act(pi),B=KK[pi].B,n=Math.round((max||8)*60);for(let i=0;i<n;i++){const dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz);if(d<0.4){rel(pi);ZC.tick(1);return 't='+(i/60).toFixed(2);}
    const ax=Math.abs(dx)/d>0.38,az=Math.abs(dz)/d>0.38;ZC.hold(B[0],ax&&dx<0);ZC.hold(B[1],ax&&dx>0);ZC.hold(B[2],az&&dz<0);ZC.hold(B[3],az&&dz>0);ZC.tick(1);if(h.pos.y<-1.2){rel(pi);return 'fell';}}
  rel(pi);return 'TIMEOUT';};
window.KF=[{g:'KeyG',a:'KeyF',B:KK[0].B},{g:'Period',a:'Comma',B:KK[1].B}];
window.beat=(e,max)=>{const n=Math.round((max||30)*60);let k=0;const pi=0;
  for(let i=0;i<n;i++){if(!e.alive){rel(pi);ZC.tick(2);return 't='+(i/60).toFixed(1);}
    const h=U.act(pi),K=KF[pi],dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz);const far=d>1.5+e.r&&!(e.state==='wind'&&e.tgt===h);
    K.B.forEach(b=>ZC.hold(b,false));if(far){ZC.hold(K.B[0],dx<-0.3);ZC.hold(K.B[1],dx>0.3);ZC.hold(K.B[2],dz<-0.3);ZC.hold(K.B[3],dz>0.3);}
    if(e.state==='wind'&&e.tgt===h){const left=e.wdur-e.t;if(left<0.16&&e.left===null)ZC.press(K.g);}
    if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0)){h.face=Math.atan2(dx,dz);if(((++k)>>1)%9===0)ZC.press(K.a);}
    ZC.tick(1);if(h.pos.y<-1.2)break;}
  rel(pi);return 'TIMEOUT '+e.state+':'+e.embers;};
window.at=(s,k)=>[s.sx+s.dx*s.len*k,s.sz+s.dz*s.len*k];window.trav=(pi,pts)=>{const o=[];for(const[x,z]of pts){const q=go8(pi,x,z,8);o.push(q);if(q==='fell')break;}return o.join(',');};
F().noChudo=true;   // чудо болотное проверяется отдельно
for(const k of['proshka','potap'])put(H[k],-1.2,-86.5);for(const k of['pelageya','yosha'])put(H[k],1.2,-86.5);ZC.tick(60);
if(me().kind!=='proshka'){ZC.press('KeyQ');ZC.tick(10);}
const S=SW(),G=S.GS,GT=S.GT,r=['stage='+F().wed.stage,'bot='+pos(bot())];
r.push(go8(0,-1.6,-89.4,5));
for(let k=0;k<3;k++){const hk=[G[k].x-0.3,G[k].z+0.7];faceTo(0,G[k].x,G[k].z);ZC.press('KeyR');ZC.tick(40);const s=G[k].used;r.push('s'+(k+1)+'='+!!s);if(!s)break;
  r.push('P1 '+trav(0,[at(s,0.6),hk]),'beat'+(k+1)+' '+(GT[k]?beat(GT[k],40):'-')+' left='+F().wed.left);r.push(go8(0,hk[0]-0.3,hk[1],3));}
r.push('stage='+F().wed.stage,'bot='+pos(bot())+' '+CO.mode);r
//@@
// бот: по пролётам к берегу Цапли (последний пролёт — его), Журавль идёт по струнам, свадьба, звено
const S=SW(),G=S.GS;const L=[];let last='';for(let i=0;i<60*170&&!S.wedLink.taken;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' wed='+F().wed.stage+'/'+F().wed.seg);last=m;}}
L.push('wed='+F().wed.stage,'link taken='+!!S.wedLink.taken,'cut='+F().wed.cut,'yosha='+pos(H.yosha),'falls='+ZC.G.stats.falls,S.wedLink.taken?'gat ok':'FAIL gat');L.slice(-9)
//@@
// туман: человек (Прошка) на каждом берегу щёлкает настоящий огонёк рогаткой — тропа всплывает; бот (Йоша) идёт прыжками по кочкам, на второй и четвёртой поливает засохшую
const S=SW(),fk=S.forks,EDGE=[-156,-170.7,-188.4,-206.1,-223.8];const r=[];
for(const k of['proshka','potap'])put(H[k],-1.0,-150);for(const k of['pelageya'])put(H[k],1.0,-150);if(me().kind!=='proshka'){ZC.press('KeyQ');ZC.tick(10);}
for(let k=0;k<4;k++){const f=fk[k];put(me(),f.x*0.4,f.zs+1.4);ZC.tick(20);
  if(!f.open){const real=f.wisps.find(w=>w.real);faceTo(0,real.base.x,real.base.z);ZC.press('KeyE');ZC.tick(80);}
  const u=U.until(()=>H.yosha.pos.z<EDGE[k+1]-0.8,40);r.push('fork'+k+' open='+f.open+' cross '+u+(f.dry?' dry→'+(f.dry.dry?'dry':'wet'):''));
  if(u==='TIMEOUT'){r.push('yosha='+pos(H.yosha)+' '+CO.mode+' gr='+H.yosha.grounded,'hp='+(CO.k12.hp?JSON.stringify({b:CO.k12.hp.b,j:CO.k12.hp.j}):'-'));break;}}
r.push('yosha='+pos(H.yosha),'falls='+ZC.G.stats.falls,H.yosha.pos.z<-223?'fog ok':'FAIL fog');r
//@@
// «Царевна-лягушка»: человек (Прошка) сбивает стрелу с ольхи — Лягушка поёт; бот (Йоша) ждёт на берегу и прыгает по кувшинкам в лад, шестую завядшую поливает с пятой
const S=SW(),PD=S.PADS,FR=F().frog;const r=[];put(me(),-5.5,-238.2);ZC.tick(30);faceTo(0,S.arrow.position.x,S.arrow.position.z);ZC.press('KeyE');ZC.tick(120);r.push('sing='+FR.sing);
const f0=ZC.G.stats.falls;const u=U.until(()=>H.yosha.pos.z<-278,90);
r.push('cross '+u,'lily='+FR.lily,'yosha='+pos(H.yosha),'falls+='+(ZC.G.stats.falls-f0)+' mode='+CO.mode);r.push((u!=='TIMEOUT'&&FR.lily)?'frog ok':'FAIL frog');r
//@@
// бесёнок Балды: бот (Йоша) обходит кружок, кидает струну через омут к колышку у флажка, встаёт на кружок и по «ТРИ» бежит по струне — быстрее бесёнка
const S=SW(),RC=F().race;const r=[];put(me(),0,-262);ZC.tick(20);
const L=[];let last='';for(let i=0;i<60*60&&!RC.won;i++){ZC.tick(1);const m=CO.mode+'/'+RC.st;if(m!==last){L.push((i/60).toFixed(0)+'s '+m);last=m;}}
r.push(L.slice(-6).join(' '),'won='+RC.won+' tries='+RC.tries,'yosha='+pos(H.yosha),RC.won?'race ok':'FAIL race');r
//@@
// колода: человек (Потап) поднимает «кобылу»; бот ждёт и проходит
const S=SW(),RC=F().race;const r=[U.until(()=>RC.lift==='try',20)];put(me(),0,-314.5);if(me().kind!=='potap'){ZC.press('KeyQ');ZC.tick(10);}put(me(),0,-315.8);ZC.tick(10);ZC.press('KeyE');ZC.tick(130);
r.push('lift='+RC.lift,'col off='+!S.logCol.on,(RC.lift==='done'&&!S.logCol.on)?'log ok':'FAIL log');r
//@@
// стычка у ворот и выход: бот заходит на арену (общий бой), победа, к выходу; человек подходит следом и бьёт своих
const r=[];if(me().kind!=='proshka'){ZC.press('KeyQ');ZC.tick(10);}put(me(),-1,-331);ZC.tick(5);
const L=[];let last='';const hbf=()=>{if(ZC.W.enemies.some(e=>e.alive&&e.state!=='hide')){const al=ZC.W.enemies.filter(e=>e.alive&&e.state!=='hide'&&e.state!=='spawn'),h=me();let e=null,bd=99;for(const x of al){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}if(e&&!U.def(0,0))U.hit(0,e,ZC.G.time*60|0);}};
for(let i=0;i<60*120&&!F().out&&ZC.W.levelId==='1-2';i++){hbf();ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
r.push(L.slice(-5).join(' | '),'bot='+pos(bot()),'me='+pos(me()),'en='+ZC.W.enemies.map(e=>e.kind+':'+e.state+':'+(e.alive?1:0)).join(','),'out='+!!F().out,'foes='+ZC.W.enemies.filter(e=>e.alive).length,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(F().out&&!_errs.length)?'1-2 ok':'FAIL 1-2');r
//@@
// человек стоит в стороне, друг не бросает: бот на гати сам бросает пролёты (с ожиданием), идёт по своим струнам, не дёргаясь вперёд-назад на метре от начала, бьёт Паутинников и выходит к избушке Цапли
{const lvl=ZC.LV('1-2');ZC.startFrom(lvl);}ZC.G.manual=true;ZC.tick(30);window.W=ZC.W;window.H=ZC.HERO;CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};ZC.W.flags.noChudo=true;
for(const k of['proshka','potap'])put(H[k],-1.2,-86.5);for(const k of['pelageya','yosha'])put(H[k],1.2,-86.5);ZC.tick(60);
const L=[];let lp=null,still=0,worst=0;
for(let i=0;i<60*120&&!(H.yosha.pos.z<-141);i++){ZC.tick(1);if(i%60===0){const p=bot().pos;if(lp&&Math.hypot(p.x-lp.x,p.z-lp.z)<0.4)still++;else{worst=Math.max(worst,still);still=0;}lp={x:p.x,z:p.z};}}
worst=Math.max(worst,still);L.push('yosha='+pos(H.yosha),'longest stand='+worst+'s',(H.yosha.pos.z<-141&&worst<=14)?'gat alone ok':'FAIL gat alone');L
