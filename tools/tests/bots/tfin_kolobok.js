// релиз final06: 1-3 «Колобок» — последний ролик (Колобок отдаёт звено) поставлен как пляска (late_99_kolobok_dance.js).
// Бот проходит уровень как t13v (бег, три пляски на гуслях), затем по ходу ролика снимает кадры и проверяет: ролик 12,5 с, без врезок
// и наездов на говорящего; герои в ряд и в хороводе на своих местах; звено вылетает из Колобка и засчитано Прошке; в финальной позе
// все четверо и Колобок повёрнуты к камере, Прошка держит звено над головой; после ролика — итог «Лада» и выход на Лукоморье.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
U.go();ZC.loadLevel(4);ZC.tick(10);const S=ZC.W.song;[S.state,!!ZC.G.cine,ZC.W.name,'foes='+S.foes.length].join(' | ')
//@@
ZC.skip();ZC.tick(30);const S=ZC.W.song;[S.state,S.t.toFixed(2),'camFn='+!!ZC.W.camFn].join(' | ')
//@@
window.rbot=function(n,o){o=o||{};const S=ZC.W.song;const J=['Space','KeyM'],G=['KeyG','Period'],R=['ShiftLeft','Slash'],L=['KeyA','ArrowLeft'],Rt=['KeyD','ArrowRight'];
 const LANES=[[-5.2,-3.2,-1.2],[1.2,3.2,5.2]];let log=[];let lastLane=[-1,-1];
 const oz=o2=>o2.type==='barrel'?o2.bz:o2.z;
 for(let i=0;i<n;i++){if(S.state!=='play')break;
  for(const pi of[0,1]){const h=U.act(pi);if(o.idle&&o.idle.includes(pi))continue;
   // какая дорожка свободна: пни, дыры, бочки в ближайших 7 м; перед обвалом — на середину
   const bad=l=>S.obst.some(x=>x.pi===pi&&!x.hit&&(x.type==='stump'||x.type==='hole'||x.type==='barrel')&&x.lanes.includes(l)&&oz(x)<h.pos.z+0.8&&h.pos.z-oz(x)<7.5);
   const pit=S.obst.some(x=>x.pi===pi&&!x.hit&&x.type==='pit'&&x.z<h.pos.z+0.5&&h.pos.z-x.z<12);
   const pick=S.picks.find(q=>q.pi===pi&&!q.taken&&q.z<h.pos.z&&h.pos.z-q.z<9);
   let want=S.lane[pi];if(pit)want=1;else if(pick&&!bad(pick.lane))want=pick.lane;else if(bad(want)){const c=[1,0,2].filter(l=>!bad(l));if(c.length)want=c.sort((a,b)=>Math.abs(a-S.lane[pi])-Math.abs(b-S.lane[pi]))[0];}
   if(want!==S.lane[pi]&&i%6===pi*3)ZC.press(want<S.lane[pi]?L[pi]:Rt[pi]);
   // прыжок: коряга впереди, струна в такт
   const k=S.lastK,t=S.t;let bk=null;for(const q of[k,k+1]){const d=t-(q>=0?0:0);}
   const log_=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='log'&&x.z<h.pos.z&&h.pos.z-x.z<1.25);
   const br=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='branch'&&x.z<h.pos.z&&h.pos.z-x.z<1.6);
   const hole=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='hole'&&x.lanes.includes(S.lane[pi])&&x.z<h.pos.z&&h.pos.z-x.z<0.9);
   const s=S.strings.find(q=>q.pi===pi&&!q.used&&Math.abs(q.z-h.pos.z)<1.3&&q.lanes.includes(S.lane[pi]));
   const onB=Math.abs(S.bph)<0.012||Math.abs(S.bph-1)<0.012||(S.B&&(S.bph*S.B<0.0175));
   if(s&&!(o.miss&&o.miss.includes(pi))&&onB&&h.grounded)ZC.press(J[pi]);
   else if((log_||hole)&&h.grounded&&!s)ZC.press(J[pi]);
   if(br&&h.grounded&&h.rollT<=0)ZC.press(R[pi]);
   const b=S.beasts.find(q=>q.pi===pi&&!q.res&&Math.abs(q.z-h.pos.z)<3.6);if(b&&onB&&S.lastK===b.k)ZC.press(G[pi]);
   if(!(o.nofoe&&o.nofoe.includes(pi))){const BT=S.BT;
   for(const f of S.foes){if(f.res&&f.res!=='parry')continue;const dt=BT[f.k]-S.t;
    if((f.type==='lunge'||f.type==='crow')&&!f.res&&f.locked&&f.lane===S.lane[pi]&&f.pi===pi&&dt<0.9&&dt>0){const c=[0,1,2].filter(l=>l!==f.lane&&!bad(l));const nl=c.length?c.sort((a,b)=>Math.abs(a-S.lane[pi])-Math.abs(b-S.lane[pi]))[0]:(f.lane===0?1:f.lane-1);if(i%3===0)ZC.press(nl<S.lane[pi]?L[pi]:Rt[pi]);}
    if(f.type==='boar'&&!f.res&&f.pi===pi&&f.lane===S.lane[pi]&&dt<0.22&&dt>0.05&&h.grounded)ZC.press(J[pi]);
    if(f.type==='storm'&&!f.res&&f.pi===pi&&f.lanes.includes(S.lane[pi])&&h.pos.z-f.z<10&&h.pos.z>f.z){const c=[0,1,2].filter(l=>!f.lanes.includes(l));if(i%3===0&&c.length){const nl=c.sort((a,b)=>Math.abs(a-S.lane[pi])-Math.abs(b-S.lane[pi]))[0];ZC.press(nl<S.lane[pi]?L[pi]:Rt[pi]);}}
    if((f.type==='paw'||f.type==='hawk')&&f.pi===pi){if(!f.res&&Math.abs(dt)<0.012)ZC.press(G[pi]);if(f.res==='parry'&&S.t>BT[f.k]+0.15&&!f.cn){f.cn=1;ZC.press(o.nocounter?'X':['KeyF','Comma'][pi]);}}
    if(f.type==='duo'&&!f.res&&Math.abs(dt)<0.012&&!(o.soloduo&&pi===1))ZC.press(G[pi]);}}}
  ZC.tick(1);}
 return 't='+S.t.toFixed(1)+' k='+S.lastK+' part='+S.part+' hits='+JSON.stringify(S.hits)+' tries='+JSON.stringify(S.tries)+' got='+JSON.stringify(S.got)+' combo='+JSON.stringify(S.best)+' fox='+JSON.stringify(S.fox)+' st='+(S.stumbles||0)+' log='+(S.stLog||[]).join(',')+' links='+ZC.W.links+' nuts='+ZC.W.nuts+' rep='+JSON.stringify(S.rep)+' par='+S.parries+' cnt='+S.counters+' duos='+S.duos+' foes='+S.foes.map(f=>f.type[0]+(f.res?f.res[0]:'-')).join('');};
rbot(60*63)
//@@
const S=ZC.W.song;[rbot(60*5),U.st()].join(' | ')
//@@
const S=ZC.W.song;[rbot(60*6),U.st()].join(' | ')
//@@
const S=ZC.W.song;[rbot(60*7),'fly='+(S.fly[0]>S.t),U.st()].join(' | ')
//@@
const S=ZC.W.song;[rbot(60*6),U.st()].join(' | ')
//@@
const S=ZC.W.song;[rbot(60*20),S.state,!!ZC.G.cine,U.st()].join(' | ')
//@@
ZC.tick(60*2);ZC.skip();ZC.tick(90);const S=ZC.W.song;[S.state,S.fs,S.ft&&S.ft.toFixed(2),!!S.fin,U.st()].join(' ')
//@@
window.fbot=function(sec){const S=ZC.W.song;const J=['Space','KeyM'],G=['KeyG','Period'];const log=[];let st=-1;
 for(let i=0;i<60*sec&&S.state==='final';i++){if(S.fs!==st){st=S.fs;log.push('stage'+st);}
  if(S.fin){const P=S.FST[S.fs];const k=Math.round(S.ft/S.B2),d=S.ft-k*S.B2;if(k>=0&&Math.abs(d)<0.009){const b=k%P.n;for(const pi of[0,1]){const w=P.who(b);if(w!==2&&w!==pi)continue;ZC.press(P.act(b)==='C'?G[pi]:J[pi]);}}}
  ZC.tick(1);}
 return log.join(',')+' state='+S.state+' lit='+JSON.stringify(S.lit);};
fbot(9)
//@@
fbot(12)
//@@
[fbot(20),!!ZC.G.cine].join(' ')
//@@
// ---------- ролик ----------
window.TT=t=>{let i=0;for(;i<60*20&&ZC.G.cine&&ZC.G.cine.t<t;i++){ZC.tick(1);const cs=ZC.FIN.cine.state();if(cs.insert||cs.focus)window._cam=(window._cam||[]).concat([ZC.G.cine.t.toFixed(2)+':'+(cs.insert||cs.focus)]);}return ZC.G.cine?+ZC.G.cine.t.toFixed(2):-1;};
window.FACE=()=>{const c=ZC.FIN.cine.CD(),p=c.pose.pos,o=[];for(const w of['proshka','potap','pelageya','yosha']){const h=ZC.HERO[w];let d=Math.atan2(p.x-h.pos.x,p.z-h.pos.z)-h.g.rotation.y;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;o.push([w,+d.toFixed(2)]);}return o;};
window.L0=ZC.W.links;const S=ZC.W.song;for(let i=0;i<60*4&&!ZC.G.cine;i++)ZC.tick(1);
const c=ZC.G.cine;if(!c)throw new Error('ролик не начался, state='+S.state);if(Math.abs(c.dur-12.5)>0.01)throw new Error('длина ролика '+c.dur+' — ждали 12,5');
['state='+S.state,'dur='+c.dur,'links='+L0,JSON.stringify(ZC.FIN.kolState())].join(' ')
//@@ shot=kd1_line.png
TT(1.7)+' пляшут в ряд · музыка мира: '+ZC.FIN.music.cur
//@@ shot=kd2_line2.png
TT(2.3)+''
//@@ shot=kd3_ring.png
TT(4.3)+' хоровод: '+['proshka','potap','pelageya','yosha'].map(w=>{const h=ZC.HERO[w];return w+':'+h.pos.x.toFixed(1)+','+h.pos.z.toFixed(1);}).join(' ')
//@@ shot=kd4_ring2.png
TT(6.3)+''
//@@ shot=kd5_link.png
TT(8.55)+' '+JSON.stringify(ZC.FIN.kolState())
//@@ shot=kd6_catch.png
TT(9.4)+' '+JSON.stringify(ZC.FIN.kolState())+' links='+ZC.W.links
//@@ shot=kd7_jump.png
TT(10.5)+''
//@@ shot=kd8_pose.png
TT(11.9);const st=ZC.FIN.kolState(),f=FACE(),bad=f.filter(x=>Math.abs(x[1])>0.25);
if(!st.taken)throw new Error('звено не засчитано');if(!st.tro)throw new Error('Прошка не держит звено');if(ZC.W.links!==L0+1)throw new Error('звеньев '+ZC.W.links+', ждали '+(L0+1));
if(bad.length)throw new Error('не смотрят в камеру: '+JSON.stringify(bad));
if(window._cam)throw new Error('врезки или наезды камеры: '+window._cam.slice(0,6).join(' '));
'поза: '+JSON.stringify(f)+' beats='+st.beats
//@@
for(let i=0;i<60*4&&ZC.G.cine;i++)ZC.tick(1);const on=ZC.FIN.kolState().on;if(on)throw new Error('пляска не выключилась после ролика');
for(let i=0;i<60*14&&ZC.W.levelId!=='luko';i++)ZC.tick(1);ZC.tick(60*2);
if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'links='+ZC.W.links+' got='+JSON.stringify(ZC.G.got)+' lvl='+ZC.W.levelId
