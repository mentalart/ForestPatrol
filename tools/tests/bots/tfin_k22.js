//@@ wait=1500
// релиз final06: 2-2 «Рыба-кит» втрое длиннее, по «Коньку-Горбунку» (late_99f_k22.js) — вдвоём настоящими нажатиями:
// хвост — Потап валит сосну-мостик; кит дышит (выдох трясёт); фонтан бьёт на выдохе; щука в ведре и печка Емели; бока — рёбра ходят,
// Потап выдёргивает колья, Йоша лечит раны, кит открывает глаз; губа — желуди на плугах (один — рогаткой), кит зевает; хоровод между глаз;
// грибы в дубраве Совиным взором; голова — кит ныряет, колыбельная в три куплета (в лад с волной, сонные звёздочки Совиным взором, четыре голоса), фонтан до облаков, звено.
// деревня на горбу: Совиный взор Пелагеи показывает ведро со щукой, не то ведро — окунь; пруд общий — прилив; Потап выпускает щуку;
// «По щучьему велению» — печка выезжает сама; оба на печке — едет по хребту; раки перегораживают — бой; волна — щит; голова кита: икота,
// золото в струйке; звено и конец уровня. В фонтане дыхания мелькает золото.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',attack:'KeyF',guard:'KeyG',swap:'KeyQ',skill:'KeyE',item:'KeyR'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',attack:'Comma',guard:'Period',swap:'KeyK',skill:'KeyL',item:'Semicolon'}];
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(KEYS[pi].swap);ZC.tick(6);}return U.act(pi).kind===kind;};
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.REL=pi=>{const K=KEYS[pi];[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));};
// запрыгнуть на печку: идти к ней и прыгать рядом
window.BOARD=(pi,max)=>{const D=ZC.W.dbg22(),K=KEYS[pi];for(let i=0;i<(max||6)*60;i++){const h=U.act(pi);if(h.groundRef===D.STV.col){REL(pi);return 't='+(i/60).toFixed(2);}
    const dx=D.STV.x-h.pos.x,dz=D.STV.z-h.pos.z,d=Math.hypot(dx,dz);ZC.hold(K.left,dx<-0.2);ZC.hold(K.right,dx>0.2);ZC.hold(K.up,dz<-0.2);ZC.hold(K.down,dz>0.2);if(h.grounded&&d<2.3)ZC.press(K.jump);ZC.tick(1);}REL(pi);return 'TIMEOUT';};
// ехать: волна — щит; рак загородил — бой только с ним (прочие мороки уровня не отвлекают); смыло — догнать и запрыгнуть
window.RIDE=(max)=>{const D=ZC.W.dbg22();const log=[];for(let i=0;i<max*60;i++){if(D.STV.state==='done'){[0,1].forEach(REL);ZC.hold('KeyG',false);ZC.hold('Period',false);return 'done t='+(i/60).toFixed(1)+' '+log.join(',');}
    const crab=D.STV.crabs.find(e=>e.alive&&Math.hypot(e.pos.x-D.STV.x,e.pos.z-D.STV.z)<7);
    if(crab){ZC.hold('KeyG',false);ZC.hold('Period',false);const all=ZC.W.enemies;ZC.W.enemies=[crab];let rb;try{rb=U.brawl(25);}finally{ZC.W.enemies=all;}log.push('crab:'+rb);for(const pi of[0,1])log.push('board:'+BOARD(pi,8));continue;}
    const w=D.STV.wave,g=!!w&&w.t>-0.7&&w.t<1.3;ZC.hold('KeyG',g);ZC.hold('Period',g);
    for(const pi of[0,1]){const h=U.act(pi),K=KEYS[pi];if(h.groundRef===D.STV.col){REL(pi);continue;}const dx=D.STV.x-h.pos.x,dz=D.STV.z-h.pos.z,d=Math.hypot(dx,dz);
      ZC.hold(K.left,dx<-0.2);ZC.hold(K.right,dx>0.2);ZC.hold(K.up,dz<-0.2);ZC.hold(K.down,dz>0.2);if(h.grounded&&d<2.3)ZC.press(K.jump);if(i%60===0)log.push('off'+pi);}
    ZC.tick(1);}[0,1].forEach(REL);return 'TIMEOUT s='+D.STV.s.toFixed(1)+' '+log.slice(-6).join(',');};
// идти к точке; jumpIf(h) — прыгнуть, если пора
window.STEP=(pi,x,z,jumpIf)=>{const K=KEYS[pi],h=U.act(pi),dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>0.4;ZC.hold(K.left,far&&dx<-0.2);ZC.hold(K.right,far&&dx>0.2);ZC.hold(K.up,far&&dz<-0.2);ZC.hold(K.down,far&&dz>0.2);if(jumpIf&&jumpIf(h))ZC.press(K.jump);return !far;};
// по рёбрам: дойти до ребра i (ступать, когда сошлось с тем, где стоишь)
window.RIBTO=(pi,i,x,max)=>{const D=ZC.W.dbg22();for(let t=0;t<(max||14)*60;t++){const h=U.act(pi),R=D.RIB[i];if(h.groundRef===R.col&&h.grounded&&Math.abs(h.pos.x-x)<0.6){REL(pi);return 't='+(t/60).toFixed(1);}
    const cur=D.RIB.find(q=>h.groundRef===q.col);const tz=R.z+0.6,gap=cur?Math.abs(cur.z-R.z)-3.0:1;const near=Math.abs(h.pos.z-tz)<1.3;
    if(h.prilip&&t%30===0)ZC.press(pi?'Slash':'ShiftLeft');
    if(cur&&cur!==R&&gap>2.6){STEP(pi,x,h.pos.z);REL(pi);STEP(pi,x,cur.z+(R.z<cur.z?-1.0:1.0));}else STEP(pi,x,tz,hh=>hh.grounded&&(hh.groundRef!==R.col)&&(cur?!near&&gap<2.6:true));ZC.tick(1);}
  REL(pi);return 'TIMEOUT@'+U.act(pi).pos.toArray().map(v=>v.toFixed(1));};
window.HOP=(pi,x,z,max)=>{for(let t=0;t<(max||8)*60;t++){if(STEP(pi,x,z,hh=>hh.grounded&&hh.blocked)){REL(pi);return 't='+(t/60).toFixed(1);}ZC.tick(1);}REL(pi);return 'TIMEOUT@'+U.act(pi).pos.toArray().map(v=>v.toFixed(1));};
window.RIBSEQ=(pi,i,x,max)=>{const D=ZC.W.dbg22();let out='';for(let j=0;j<=i;j++){if(D.RIB[j].z0>U.act(pi).pos.z+1.6)continue;out=RIBTO(pi,j,j===i?x:0,max);if(out.startsWith('TIMEOUT'))return 'r'+j+out;}return out;};
ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();ZC.tick(30);NOCINE();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
'links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal
//@@
// хвост: Потап валит сосну через трещину; оба переходят по стволу
const D=ZC.W.dbg22();ACT(0,'potap');const r=[U.walkTo(0,4.2,33.8,6)];U.tap('KeyE');ZC.tick(100);if(!D.F.log)throw new Error('сосна не повалена: '+r.join()+' '+U.st());
r.push(U.walkTo(0,0,31,5),U.walkTo(0,0,23.5,6),U.walkTo(1,0.3,31,8),U.walkTo(1,0.3,23.5,6));if(!(U.act(0).pos.z<25&&U.act(1).pos.z<25))throw new Error('не перешли трещину: '+r.join()+' '+U.st());'tail ok '+r.join()
//@@
// дыхание кита: выдох — всех подкидывает
const D=ZC.W.dbg22();const n0=D.WB.n;let t=0,air=false;while(D.WB.n===n0&&t<1100){ZC.tick(1);t++;}for(let i=0;i<12;i++){ZC.tick(1);if(!U.act(0).grounded)air=true;}if(D.WB.n===n0)throw new Error('кит не дышит');'exhale n='+D.WB.n+' hop='+air
//@@
// золото в фонтане дыхания: прилив у фонтана — на выдохе кита блеснёт
const W=ZC.W;W.flags.mast=true;W.flags.garden=true;const D0=W.dbg22();const Z3=D0.Z3;ZC.HERO.proshka.pos.set(0,0.3,-56);ZC.HERO.pelageya.pos.set(2,0.3,-56);ZC.HERO.potap.pos.set(-2,0.3,-56);ZC.HERO.yosha.pos.set(4,0.3,-56);ZC.tick(10);
ACT(0,'proshka');ACT(1,'pelageya');ZC.tick(30);U.tap('KeyR');ZC.tick(20);U.tap('Semicolon');ZC.tick(200);const st1=Z3.state;let seen=false;for(let i=0;i<1100&&!seen;i++){ZC.tick(1);W.group.traverse(o=>{if(o.isMesh&&o.geometry.type==='OctahedronGeometry'&&o.visible&&o.position.y>3&&o.position.z>-70&&o.position.z<-50)seen=true;});}
if(st1!=='high')throw new Error('фонтан не в приливе: '+st1+' '+U.st());if(!seen)throw new Error('в фонтане не блеснуло золото');'fountain gold ok'
//@@
// деревня: Совиный взор — ведро со щукой светится
const D=ZC.W.warp22('village');ZC.tick(20);NOCINE();ACT(1,'pelageya');const r=[U.walkTo(1,2,-88,6)];U.tap('KeyL');ZC.tick(20);
const b=D.BUCK[D.PIKE_AT];if(!(b.glow.material.opacity>0.2))throw new Error('ведро со щукой не светится: '+b.glow.material.opacity);'owl ok pike in '+D.PIKE_AT+' '+r.join()
//@@
// Потап поднимает не то ведро — окунь; пруд мелкий — щуку не выпустить; прилив вдвоём; выпускает щуку
const D=ZC.W.dbg22(),wrong=D.BUCK.find(b=>!b.pike),pk=D.BUCK[D.PIKE_AT];ACT(0,'potap');const r=[U.walkTo(0,wrong.x+(wrong.x<0?1.3:-1.3),wrong.z,6)];U.tap('KeyE');ZC.tick(60);
if(!wrong.tipped)throw new Error('не то ведро не опрокинулось');r.push(U.walkTo(0,pk.x+(pk.x<0?1.3:-1.3),pk.z,8));U.tap('KeyE');ZC.tick(20);if(D.F.pikeFree)throw new Error('щуку выпустили в мелкий пруд');
r.push(U.walkTo(1,0.6,-84.2,6));U.tap('Semicolon');ZC.tick(20);U.tap('KeyR');ZC.tick(200);if(D.PZ.state!=='high')throw new Error('пруд не наполнили: '+D.PZ.state+' '+r.join()+' '+U.st());
r.push(U.walkTo(0,pk.x+(pk.x<0?1.3:-1.3),pk.z,8));U.tap('KeyE');ZC.tick(10);if(!D.F.pikeFree||!ZC.G.cine)throw new Error('щука не выпущена: '+r.join()+' '+U.st());
let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}t=0;while(D.STV.state!=='wait'&&t<900){ZC.tick(1);t++;}if(D.STV.state!=='wait')throw new Error('печка не выехала: '+D.STV.state+' '+D.STV.x.toFixed(1)+','+D.STV.z.toFixed(1));'pike free, stove waits '+r.join()
//@@ shot=k22_stove.png
// на печку оба — поехали
const D=ZC.W.dbg22();ACT(0,'proshka');const r=[BOARD(0,10),BOARD(1,10)];ZC.tick(5);if(D.STV.state!=='ride')throw new Error('печка не поехала: '+r.join()+' '+D.STV.state+' '+U.st());
r.push(RIDE(120));if(D.STV.state!=='done')throw new Error('не доехали: '+r.join()+' '+U.st());'ride '+r.join()
//@@
// бока: рёбра ходят; Потап (Игрок 1) выдёргивает колья, Йоша (Игрок 2) лечит раны; кит открывает глаз
const D=ZC.W.warp22('ribs');ZC.tick(20);NOCINE();ACT(0,'potap');ACT(1,'yosha');const r=[];
for(const P of D.PALS){const i=P.R.i;r.push('p'+i+':'+RIBSEQ(0,i,2.6,20));let k=0;for(;k<120&&!P.pulled;k++){const h=U.act(0);h.face=Math.PI;if(h.prilip&&k%30===15)ZC.press('ShiftLeft');if(k%50===0)U.tap('KeyE');ZC.tick(1);}
  r.push('y'+i+':'+RIBSEQ(1,i,0,20));for(let k2=0;k2<160&&!P.healed;k2++){U.act(1).face=Math.PI;if(U.act(1).prilip&&k2%30===15)ZC.press('Slash');if(k2%50===0)U.tap('KeyL');ZC.tick(1);}if(!P.pulled||!P.healed)throw new Error('частокол '+i+': pulled='+P.pulled+' healed='+P.healed+' '+r.join()+' '+U.st());}
let t=0;while(!ZC.G.cine&&t<240){ZC.tick(1);t++;}const eye=!!ZC.G.cine;NOCINE();r.push(RIBSEQ(0,5,0,14),RIBSEQ(1,5,1,14));r.push(HOP(0,-1,-190,8),HOP(1,1,-190,8));
if(!(U.act(0).pos.z<-186&&U.act(1).pos.z<-186))throw new Error('бока не пройдены: '+r.join()+' '+U.st());'ribs ok eye='+eye+' '+r.join()
//@@ shot=k22_ribs.png
// губа: желуди на плугах — бьём; высокий — рогаткой Прошки; кит зевает — держимся
const D=ZC.W.warp22('lip');ZC.tick(20);NOCINE();ACT(0,'proshka');ACT(1,'pelageya');const r=[];const B=D.BARN;
for(let i=0;i<60*60&&!D.F.plough;i++){for(const pi of[0,1]){const b=B.find((q,k)=>!q.gone&&!q.high&&k===pi)||B.find(q=>!q.gone&&!q.high);if(!b)continue;const h=U.act(pi);const at=STEP(pi,b.x+1.3,b.z+0.8);if(Math.hypot(h.pos.x-b.x,h.pos.z-b.z)<2&&i%12===pi*6){h.face=Math.atan2(b.x-h.pos.x,b.z-h.pos.z);U.tap(KEYS[pi].attack);}}
  if(B.filter(q=>!q.high).every(q=>q.gone)&&!B[2].gone){const h=U.act(0);STEP(0,-4,-246);if(Math.hypot(h.pos.x+4,h.pos.z+246)<1.2&&i%40===0){h.face=Math.atan2(B[2].x-h.pos.x,B[2].z-h.pos.z);U.tap('KeyE');}}ZC.tick(1);}
[0,1].forEach(REL);if(!D.F.plough)throw new Error('плуги не освобождены: '+B.map(b=>b.gone)+' '+U.st());ZC.tick(120);r.push(U.walkTo(0,0,-266,20),U.walkTo(1,1.5,-266,20));
if(!(U.act(0).pos.z<-264&&U.act(1).pos.z<-264))throw new Error('плетень не пройден: '+r.join()+' '+U.st());'lip ok yawns '+r.join()
//@@
// между глаз: хоровод — встаём на свой камушек, пока горит
const D=ZC.W.warp22('eyes');ZC.tick(20);NOCINE();const r=[U.walkTo(0,-1,-277,6),U.walkTo(1,1,-277,6)];for(let i=0;i<60*40&&!D.DC.done;i++){for(const pi of[0,1]){const S=D.DC.stones.find(q=>q.lit===pi);if(S)STEP(pi,S.x,S.z);}ZC.tick(1);}
[0,1].forEach(REL);if(!D.DC.done)throw new Error('не наплясались: '+D.DC.score+' '+U.st());ZC.tick(60);r.push(U.walkTo(0,0,-305,8),U.walkTo(1,1.5,-305,8));'dance ok score='+D.DC.score+' '+r.join()
//@@ shot=k22_eyes.png
// дубрава: Совиный взор Пелагеи — грибы светятся; Прошка собирает боровики (мухоморы обходит)
const D=ZC.W.warp22('grove');ZC.tick(20);NOCINE();ACT(1,'pelageya');ACT(0,'proshka');const r=[];
for(let i=0;i<60*80&&!D.GR.done;i++){if(i%240===0){U.tap('KeyL');}const m=D.MUSH.filter(q=>!q.got&&q.real&&q.seen>0).sort((a,b)=>Math.hypot(a.x-U.act(0).pos.x,a.z-U.act(0).pos.z)-Math.hypot(b.x-U.act(0).pos.x,b.z-U.act(0).pos.z))[0];
  if(m)STEP(0,m.x,m.z);else REL(0);if(i%180===0)STEP(1,U.act(0).pos.x+1.5,U.act(0).pos.z+1.5);ZC.tick(1);}
[0,1].forEach(REL);if(!D.GR.done)throw new Error('грибы не собраны: '+D.GR.got+' '+U.st());ZC.tick(60);'grove ok got='+D.GR.got
//@@
// голова: кит ныряет; на макушке — колыбельная в три куплета; фонтан до облаков; звено
const D=ZC.W.dbg22();const r=[U.walkTo(0,-1,-364,10),U.walkTo(1,1,-364,10)];let t=0;while(!ZC.G.cine&&t<200){ZC.tick(1);t++;}if(!D.FN.dive)throw new Error('кит не нырнул: '+r.join()+' '+U.st());NOCINE();
const S=D.lulShells,L=D.LS;ACT(0,'proshka');ACT(1,'pelageya');
// стоять у ракушки i (чуть ближе к дыхалу); сбило — вернуться
const SPOT=i=>[S[i].x*0.86,S[i].z+(i===2?-0.6:i===3?0.6:0)],ON=(pi,i)=>{const [x,z]=SPOT(i),h=U.act(pi);if(Math.hypot(h.pos.x-x,h.pos.z-z)<0.9&&Math.abs(h.pos.y-8.5)<0.6){REL(pi);return true;}STEP(pi,x,z,hh=>hh.grounded&&hh.pos.y<8.3);return false;};
// куплет 1: волна дошла до круга — обе ракушки разом
for(let i=0;i<60*90&&L.stage<2&&!ZC.G.cine;i++){for(const pi of[0,1]){if(ON(pi,pi)&&Math.abs(L.bt-0.7*L.per)<0.1&&ZC.G.time-S[pi].ref.press>1)ZC.press(KEYS[pi].item);}ZC.tick(1);}
[0,1].forEach(REL);if(L.stage<2)throw new Error('куплет 1 не спет: строк '+L.lines+' spot='+JSON.stringify([0,1].map(SPOT))+' sh='+JSON.stringify(S.map(s=>[s.x,s.z]))+' bt='+L.bt+' per='+L.per+' tb='+L.tb+' judged='+L.judged+' now='+ZC.G.time+' press='+JSON.stringify(D.LUL.map(l=>[l.press,l.hum]))+' refp='+JSON.stringify(S.map(s=>s.ref.press))+' kinds='+[0,1].map(pi=>U.act(pi).kind)+' '+U.st());r.push('v1 lines='+L.lines);
// куплет 2: Пелагея — Совиный взор; звёздочки ловит Прошка прыжком
for(let i=0;i<60*90&&L.stage<3&&!ZC.G.cine;i++){const vis=D.STARS.filter(q=>!q.got&&q.seen>0);if(!vis.length&&i%90===0)U.tap(KEYS[1].skill);
  const h=U.act(0),q=vis.sort((a,b)=>Math.hypot(a.g.position.x-h.pos.x,a.g.position.z-h.pos.z)-Math.hypot(b.g.position.x-h.pos.x,b.g.position.z-h.pos.z))[0];
  if(q){const x=q.g.position.x,z=q.g.position.z;STEP(0,x,z,hh=>hh.grounded&&Math.hypot(x-hh.pos.x,z-hh.pos.z)<0.7);}else REL(0);ZC.tick(1);}
[0,1].forEach(REL);if(L.stage<3)throw new Error('звёздочки не пойманы: '+L.got+' '+U.st());r.push('v2 got='+L.got);
// куплет 3: каждый играет, уступает (оставленный держит напев), второй герой — на свою ракушку
const st=[0,0],A=[0,1],B=[2,3];for(let i=0;i<60*90&&!D.FN.done&&!ZC.G.cine;i++){for(const pi of[0,1]){const held=Object.values(ZC.HERO).some(h=>h.kwHold&&h.kwHold.ref===S[A[pi]].ref);
    if(st[pi]===0){if(ON(pi,A[pi])){ZC.press(KEYS[pi].item);ZC.tick(2);U.tap(KEYS[pi].swap);ZC.tick(4);st[pi]=1;}}
    else{if(!held&&S[A[pi]].ref.hum<=0){U.tap(KEYS[pi].swap);ZC.tick(4);st[pi]=0;continue;}if(ON(pi,B[pi])&&S[B[pi]].ref.hum<1)ZC.press(KEYS[pi].item);}}ZC.tick(1);}
[0,1].forEach(REL);r.push('v3 lull='+D.FN.lull.toFixed(1));
if(!D.FN.done)throw new Error('колыбельная не спета: lull='+D.FN.lull.toFixed(1)+' '+U.st());t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(30);r.push(U.walkTo(0,0,-438,6),U.walkTo(1,0.4,-437,6));ZC.tick(120);
'head '+r.join()+' link='+D.endLink.taken+' lvl='+ZC.W.levelId+' out='+!!ZC.W.flags.out
//@@ shot=k22_cloud.png
if(ZC.W.levelId==='2-2'&&!ZC.W.flags.out)throw new Error('уровень не пройден: '+U.st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-2 done errs=0'
