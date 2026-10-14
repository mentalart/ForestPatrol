//@@ wait=1500
// 1-3 «Колобок», переделка частей 1–3 (и вожак стаи в части 5): струны-гусли с кружком доли, Колобок прыгает на струне за две доли, дуга искр в полёте, плетень и бурелом
// только со струны, воздушные струны (со струны на струну), двойная струна, встречные из сказки (Заяц, Волк, Медведь — зов и ответ щитом),
// лиса запутывается в струнах, «в лад» за прыжок на «и», музыка слоями, звёзды частей, мягкий повтор последней фразы.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);
window.S=()=>ZC.W.song;const s=S();
const air=s.strings.filter(q=>q.air).length,duo=s.strings.filter(q=>q.duo).length,walls=s.obst.filter(o=>o.type==='wall').length,pits=s.obst.filter(o=>o.type==='pit');
const tales=s.tales.map(q=>q.pi+q.kind+q.k).join(','),arc=s.sparks.filter(q=>q.free).length;
['state='+s.state,'strings='+s.strings.length,'air='+air,'duo='+duo,'walls='+walls,'pitsZ='+pits.map(o=>o.z.toFixed(1)).join('/'),'tales='+tales,'arc='+arc,
 (air===6&&duo===4&&walls===4&&pits.every(o=>isFinite(o.z))&&s.tales.length===6&&arc>40)?'layout ok':'FAIL layout']
//@@
// идеальный проход частей 1–3 вдвоём: струны и воздушные струны — в долю, ответ зверю — щитом в его доли, коряги — прыжком на «и»
window.drv=function(n,kEnd){const S=ZC.W.song,BT=S.BT;
 for(let i=0;i<n&&S.state==='play'&&S.lastK<kEnd;i++){
  for(const pi of[0,1]){const K=U.K[pi],h=U.act(pi),lane=S.lane[pi],oz=o=>o.type==='barrel'?o.bz:o.z;
   const bad=l=>S.obst.some(x=>x.pi===pi&&!x.hit&&(x.type==='stump'||x.type==='hole'||x.type==='barrel')&&x.lanes.includes(l)&&oz(x)<h.pos.z+0.8&&h.pos.z-oz(x)<7.5);
   const pit=S.obst.some(x=>x.pi===pi&&!x.hit&&x.type==='pit'&&x.z<h.pos.z+0.5&&h.pos.z-x.z<14)||S.strings.some(q=>q.pi===pi&&!q.used&&q.lanes.length===1&&q.z<h.pos.z&&h.pos.z-q.z<14);
   const pick=S.picks.find(q=>q.pi===pi&&!q.taken&&q.z<h.pos.z&&h.pos.z-q.z<9);
   let want=lane;if(pit)want=S.strings.find(q=>q.pi===pi&&!q.used&&q.lanes.length===1&&q.z<h.pos.z)?S.strings.find(q=>q.pi===pi&&!q.used&&q.lanes.length===1&&q.z<h.pos.z).lanes[0]:1;
   else if(pick&&!bad(pick.lane))want=pick.lane;else if(bad(want)){const c=[1,0,2].filter(l=>!bad(l));if(c.length)want=c.sort((a,b)=>Math.abs(a-lane)-Math.abs(b-lane))[0];}
   if(want!==lane&&i%6===pi*3)ZC.press(want<lane?K.B[0]:K.B[1]);
   const onB=S.bph*S.B<0.0175;
   const st=S.strings.find(q=>q.pi===pi&&!q.used&&Math.abs(q.z-h.pos.z)<1.3&&q.lanes.includes(lane)&&(q.air?!h.grounded:h.grounded));
   const lg=S.obst.find(x=>x.pi===pi&&!x.hit&&!x.lad&&x.type==='log'&&BT[x.k]-S.t<S.B/2+0.002&&BT[x.k]-S.t>0);
   const hole=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='hole'&&x.lanes.includes(lane)&&x.z<h.pos.z&&h.pos.z-x.z<0.9);
   const br=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='branch'&&x.z<h.pos.z&&h.pos.z-x.z<1.6);
   if(st&&onB)ZC.press(K.j);else if((lg||hole)&&h.grounded&&!st)ZC.press(K.j);
   if(br&&h.grounded&&h.rollT<=0)ZC.press(K.r);
   const tl=S.tales.find(q=>q.pi===pi&&!q.res);if(tl&&onB){const r=S.lastK-tl.k;if(r>=0&&r<4&&tl.T.pat[r])ZC.press(K.g);}}
  ZC.tick(1);}
 return 'k='+S.lastK;};
const r=[drv(60*90,96)],s=S(),sum=a=>a.reduce((x,y)=>x+y,0);
const str=s.strings.filter(q=>q.ph<3),ok=str.filter(q=>q.ok||(q.k===50&&q.used)).length,tal=s.tales.map(q=>q.res).join(','),wallHit=(s.stLog||[]).filter(t=>/Плет|Бурел/.test(t)).length;
const arcT=s.sparks.filter(q=>q.free&&q.taken).length;
r.push('strings '+ok+'/'+str.length+' (50 — под гусем)','tales='+tal,'wallHit='+wallHit,'tangled='+(s.foxTangled||0),'lads='+(s.lads||0),'arcTaken='+arcT,'duo='+(s.duoStr||0),'layer='+(s.lvShown||0),
 'kolShow='+!!s.kolShow,'stars='+JSON.stringify(s.stars),'stumbles='+(s.stumbles||0)+' '+(s.stLog||[]).join(';'),'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));
r.push(ok===str.length&&s.tales.every(q=>q.res==='ok')&&!wallHit&&s.foxTangled===2&&s.lads>0&&arcT>20&&s.duoStr===2&&s.lvShown===2&&s.kolShow&&s.stars[0].slice(0,3).every(x=>x===3)&&!_errs.length?'perfect ok':'FAIL perfect');r
//@@ wait=800
// промахи: стоим — плетень перевалиться (лепесток), Заяц без ответа толкает; часть 2 без струн — обвал тянет, звено не взято — повтор последней фразы с доли 52
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);window.S=()=>ZC.W.song;const s=S(),r=[];
s.jump(8);r.push(U.until(()=>s.lastK>=31,40));
const wl=(s.stLog||[]).filter(t=>/Плет/.test(t)).length,hare=s.tales.filter(q=>q.kind==='hare').map(q=>q.res).join(',');
r.push('wallStumbles='+wl,'hare='+hare);
s.jump(58);let rep=false;for(let i=0;i<60*20&&s.lastK<70;i++){ZC.tick(1);if(s.rep[1]>0&&!rep){rep=true;r.push('rewindAt='+s.lastK);}}
const pit=(s.stLog||[]).filter(t=>/Нить/.test(t)).length;r.push('pit='+pit,'rep='+JSON.stringify(s.rep),'k='+s.lastK,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));
r.push(wl===2&&hare==='bump,bump'&&pit>=2&&s.rep[1]===1&&!_errs.length?'misses ok':'FAIL misses');r
//@@ wait=800
// со струны не в такт («рано») — всё равно высоко: плетень (доля 11) перелетаем без «перевалился», струна не засчитана;
// у обвалов (доли 50 и 61) струна поперёк всех трёх дорожек — с крайней дорожки тоже перелетаем, «Нить подтянула» нет
ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);ZC.players.forEach(p=>{p.path='hard';});window.S=()=>ZC.W.song;const s=S(),r=[];
const early=(kEnd,side)=>{for(let i=0;i<60*30&&s.state==='play'&&s.lastK<kEnd;i++){for(const pi of[0,1]){const K=U.K[pi],h=U.act(pi);
    if(side&&i%8===pi*4&&s.lane[pi]!==(pi?2:0))ZC.press(pi?K.B[1]:K.B[0]);
    const st=s.strings.find(q=>q.pi===pi&&!q.used&&!q.air&&q.lanes.includes(s.lane[pi])&&h.grounded&&h.pos.z-q.z<0.95&&h.pos.z-q.z>0.55);
    const lg=s.obst.find(o=>o.pi===pi&&!o.hit&&o.type==='log'&&h.pos.z-o.z<1.2&&h.pos.z-o.z>0.6);if((st||lg)&&h.grounded)ZC.press(K.j);}
  ZC.tick(1);}};
s.jump(6);early(13,false);const w11=s.strings.filter(q=>q.k===10),wl=(s.stLog||[]).filter(t=>/Плет/.test(t)).length;
r.push('k10 used='+w11.map(q=>q.used).join(',')+' ok='+w11.map(q=>!!q.ok).join(','),'wallStumbles='+wl);
s.jump(48);early(64,true);const ps=s.strings.filter(q=>(q.k===50||q.k===61)&&!q.air),pit=(s.stLog||[]).filter(t=>/Нить/.test(t)).length;
r.push('lanes='+ps.map(q=>q.lanes.length).join(','),'pitUsed='+ps.map(q=>q.used).join(','),'pit='+pit,'side='+s.lane.join(','));
r.push(w11.every(q=>q.used&&!q.ok)&&!wl&&ps.every(q=>q.lanes.length===3&&q.used)&&!pit?'offbeat ok':'FAIL offbeat');r
//@@
// до конца уровня: пляска и звено — без ошибок; вожак стаи (доля 191) виден — сияние вокруг и счёт «Три… Два… Раз… ЩИТ»
const s=S();s.jump(186);const du=s.foes.find(q=>q.type==='duo'&&q.k===191);let hv=false,cd=[];
for(let i=0;i<60*20&&s.state==='play';i++){ZC.tick(1);if(du.halo.visible)hv=true;if(du.cd!==undefined&&cd[cd.length-1]!==du.cd)cd.push(du.cd);}
const r=['state='+s.state,'halo='+hv,'cd='+cd.join(''),'errs='+_errs.length+(_errs[0]?' '+_errs[0]:'')];
r.push(s.state!=='play'&&hv&&cd.join('')==='3210'&&!_errs.length?'k13strings ok':'FAIL k13strings');r
