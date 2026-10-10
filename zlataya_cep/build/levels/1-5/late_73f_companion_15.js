/* ============================== РЕЛИЗ final06 · 1-5 «КИКИМОРИНА ПРЯЛКА»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Подворье Кикиморы — пять частей (proto/levels/1-5.js, общее — W.k15):
//   сени: кикиморки — общий бой; мотовило — бот встаёт на свободную площадку (подальше от человека), наверху сходит на полати и клубком
//     заводит мотовило, если внизу кто-то стоит на площадке;
//   ткацкая: человек на подножке — бот у челнока бросает клубок в зев; иначе бот сам держит подножку;
//   овин: на каждом этаже — в кольцо, клубок в колышек, ждёт струну друга, прыжок на серединку (оба героя); Пелагея на галерее рубит старую нить;
//   сушильня: Пелагея включает Совиный взор, идёт просветами, низкие нити — прыжком; встаёт на свободную плиту засова;
//   повить: свою струну — поперёк струны человека (паутинка), встаёт за паутинкой, от белой нити — прыжок, от рывка — кувырок;
//     кокон слетел — общий бой; три веретена — Пелагея Совиным взором находит настоящее и бьёт.
const KM15_S=[[[-5.2,-11.9],[-5.2,-20.1]],[[-9.6,-29.3],[-5.9,-29.3]],[[-6,-33.7],[1,-33.7]]];
const KM15_R=[[[-1.8,-20.2,0],[-1.8,-11.8,0]],[[-5.9,-25,3.4],[-9.6,-25,3.4]],[[1,-30.1,7],[-6,-30.1,7]]];
const KM15_W=[[-3.5,-16,0.26],[-7.75,-27.15,3.66],[-2.5,-31.9,7.26]];
const KM15_HOOK=[-6.9,-9.5];                                   // у крюка старой нити на галерее (мишень — в 1,4 м к востоку)
const KM15_DRY=[[-2.5,-35.6],[4,-36.2],[4,-39.2],[4,-42.2],[-5.2,-42.2],[-5.2,-45.2],[-4,-45.4],[-4,-48.2]];   // просветы сушильни; низкие нити — прыжком
const KM15_SPOT=[[4,-60.5],[-4,-60.5],[4,-67.5],[-4,-67.5]];   // откуда бросать струну на повити (первое — кольцо Игрока 2)
const KM15={w:null,t:0,hunt:0};
const km15=()=>{if(KM15.w!==W){KM15.w=W;KM15.t=0;KM15.hunt=0;}return KM15;};
const km15K=()=>W.k15;
const km15Tier=h=>!km15K().inBarn(h)?-1:h.pos.y>6.4?2:h.pos.y>2.9?1:0;
const km15Str=(pi,t)=>{const s=KM15_S[t][pi];return W.threads.some(q=>q.string&&!q.sag&&q.owner===pi&&q.stake&&Math.hypot(q.stake.x-s[0],q.stake.z-s[1])<0.3);};
const km15Web=t=>{const c=KM15_W[t];return W.webs.some(w=>Math.hypot(w.x-c[0],w.z-c[1])<1.5&&Math.abs(w.y-c[2])<0.8);};
const km15Tap=(a,gap)=>{if(KM15.t>G.time-(gap||1))return;KM15.t=G.time;cmpTap(a);};
// пересекаются ли отрезки (струна человека и наша будущая) где-то посередине — там будет паутинка
function km15Cross(ax,az,bx,bz,cx,cz,dx,dz){const r1x=bx-ax,r1z=bz-az,r2x=dx-cx,r2z=dz-cz,den=r1x*r2z-r1z*r2x;if(Math.abs(den)<1e-3)return false;
  const u=((cx-ax)*r2z-(cz-az)*r2x)/den,v=((cx-ax)*r1z-(cz-az)*r1x)/den;return u>0.15&&u<0.85&&v>0.15&&v<0.85;}
CMP.route('1-5',[
  // сени: кикиморки — общий бой; этот шаг ведёт бота к тем, что стоят в стороне
  {id:'foesA',done:()=>{const K=km15K();return K.aFoes.started&&K.aFoes.list.every(e=>!e.alive);},run:h=>{
    const al=km15K().aFoes.list.filter(e=>e.alive&&e.state!=='spawn'&&e.state!=='dying');if(W.flags.stage!=='play'||!al.length)return 'follow';
    al.sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos));cmpGoto(h,al[0].pos.x,al[0].pos.z,3);}},
  // мотовило: на свободную площадку; наверху — на полати и клубком заводить мотовило
  {id:'lift',done:()=>!!W.flags.liftDone||active(1).pos.z<28.4,run:(h,hh)=>{km15();const K=km15K(),F=W.flags;if(F.stage!=='play')return 'follow';
    if(h.pos.y>4.1&&h.pos.z<31.45){                                                                  // на полатях
      const below=K.PL.find(P=>P.y<1&&K.weightOn(P)>0);if(!below||K.LIFT.wind>=0){cmpGoto(h,h.pos.x,30,0.4);return;}
      if(cmpGoto(h,1.4,29.4,0.35)>0.35)return;h.face=Math.atan2(K.reel.position.x-h.pos.x,K.reel.position.z-h.pos.z);km15Tap('item',1.2);return;}
    const on=K.PL.find(P=>h.groundRef===P.col);
    if(on){if(on.y>K.LIFT.top-0.1)cmpGoto(h,on.cx,30.2,0.3);return;}                               // поднялся — сходит на полати; иначе стоит и ждёт
    const P=K.PL.slice().sort((a,b)=>Math.abs(b.cx-hh.pos.x)-Math.abs(a.cx-hh.pos.x)).find(q=>q.y<1.2)||K.PL[1];
    const d=cmpGoto(h,P.cx,33,0.5);if(d<2.4&&h.grounded&&h.pos.y<P.y-0.3)km15Tap('jump',0.6);}},
  // ткацкий стан: человек на подножке — бот у челнока; иначе бот держит подножку
  {id:'loom',done:()=>!!W.flags.loomDone,run:(h,hh)=>{const K=km15K();if(W.flags.stage!=='play')return 'follow';if(h.pos.z>28.6){cmpGoto(h,0,27.4,0.4);return;}
    const humanPedal=hh.groundRef===K.treadleCol;
    if(humanPedal){if(cmpGoto(h,K.spotRing.position.x,K.spotRing.position.z,0.3)>0.3)return;h.face=Math.PI;if(K.LOOM.open)km15Tap('item',1.3);return;}
    cmpGoto(h,-6.5,25.5,0.25);}},
  // нитяные мороки на полу овина: бой общий
  {id:'foes',done:()=>{const K=km15K();return W.flags.spFled||(K.floorFoes.started&&K.floorFoes.list.every(e=>!e.alive));},run:h=>{
    const al=km15K().floorFoes.list.filter(e=>e.alive&&e.state!=='spawn'&&e.state!=='dying');if(!al.length)return 'follow';
    al.sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos));cmpGoto(h,al[0].pos.x,al[0].pos.z,3);}},
  // подъём по паутинкам: все герои Игрока 2 на чердак (пока веретено не удрало)
  {id:'climb',done:()=>!!W.flags.spFled||(km15Tier(HERO.pelageya)===2&&km15Tier(HERO.yosha)===2),run:h=>{km15();const F=W.flags;if(F.stage!=='play')return 'follow';
    const T=k=>km15Tier(HERO[k]),lo=Math.min(...['pelageya','yosha'].map(k=>T(k)<0?0:T(k))),cand=['pelageya','yosha'].filter(k=>Math.max(0,T(k))===lo);
    const cut=T('pelageya')===1&&!F.cut,k=cut?'pelageya':(cand.includes(h.kind)?h.kind:cand[0]);if(!cmpWant(k))return;
    const ti=Math.max(0,km15Tier(h)),tgt=KM15_R[Math.min(ti,2)][1];
    if(cut){                                                                   // Совиный взор, потом удар по мишени у крюка
      if(Math.hypot(h.pos.x-KM15_HOOK[0],h.pos.z-KM15_HOOK[1])>0.5){cmpGoto(h,KM15_HOOK[0],KM15_HOOK[1],0.3);return;}
      h.face=Math.PI/2;if(W.owlT<=0)km15Tap('skill',1.2);else km15Tap('attack',0.5);return;}
    if(ti>=2)return;
    if(km15Web(ti)){const c=KM15_W[ti];if(Math.hypot(h.pos.x-c[0],h.pos.z-c[1])>0.5){cmpGoto(h,c[0],c[1],0.3);return;}if(h.grounded)cmpTap('jump');return;}   // обе струны лежат — на серединку и прыжок
    const st=KM15_S[ti][1];
    if(Math.hypot(h.pos.x-tgt[0],h.pos.z-tgt[1])>0.45||Math.abs(h.pos.y-tgt[2])>0.8){cmpGoto(h,tgt[0],tgt[1],0.25);return;}                       // в своё кольцо
    if(!km15Str(1,ti)){h.face=Math.atan2(st[0]-tgt[0],st[1]-tgt[1]);km15Tap('item',1);}}},                                                        // клубок в колышек; ждёт струну друга
  // сушильня: Пелагея — Совиный взор, просветами, низкие нити прыжком; потом на свободную плиту засова
  {id:'dry',done:()=>!!W.flags.latch,run:(h,hh)=>{const K=km15K(),F=W.flags;if(!F.spFled||F.stage!=='play')return 'follow';
    if(h.pos.z>-34.6&&hh.pos.z>-34.6)return 'follow';const up=k=>HERO[k].pos.y>6.4||HERO[k].pos.z<-34.4,k=up('pelageya')||!up('yosha')?'pelageya':'yosha';if(!cmpWant(k))return;   // ведёт того, кто уже наверху
    if(h.pos.z>-48){if(k==='pelageya'&&W.owlT<=0&&h.pos.z>-46)km15Tap('skill',6.5);
      for(const w of K.WIRES)if(w.y<7.5&&h.grounded&&h.pos.x>w.x0&&h.pos.x<w.x1&&h.pos.z-w.z>0.35&&h.pos.z-w.z<0.95)cmpTap('jump');
      cmpPath(h,KM15_DRY,0.4,0.6);return;}
    const free=K.plates.find(p=>!HEROES.some(q=>q.player===0&&q.groundRef===p.col))||K.plates[1];cmpGoto(h,free.x,-49.8,0.3);}},
  // повить: войти за дверь вслед за человеком — тогда начнётся бой
  {id:'arena',done:()=>km15K().B.phase>0,run:(h,hh)=>{if(!W.flags.latch||hh.pos.z>-52.4)return 'follow';cmpGoto(h,clamp(hh.pos.x+2,-3,3),Math.min(-54.6,hh.pos.z-0.5),0.4);}},
  // повить: Веретенник
  {id:'boss',first:true,done:()=>!!W.flags.bossWon,run:(h,hh)=>{const K=km15K(),B=K.B,e=B.e;if(B.phase<1||B.phase===1.5||!e)return 'follow';
    if(B.mode==='decoy'){if(!cmpWant('pelageya'))return;if(W.owlT<=0)km15Tap('skill',6.5);const r=B.decoys.find(d=>d.real&&d.alive);if(!r||W.owlT<=0)return;
      const p=r.g.position;if(cmpGoto(h,p.x+1.6,p.z+1.6,0.9)>0.9)return;h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);km15Tap('attack',0.45);return;}
    if(B.mode==='sweepW'||B.mode==='sweep'){if(h.grounded&&hd(h.pos,e.pos)<9.6&&B.mode==='sweep')km15Tap('jump',0.3);return;}
    if(!B.cocoon||e.state==='broken')return 'follow';                                         // кокон слетел — общий бой
    if(B.mode==='aim'&&B.tgt===h&&B.mt>0.7&&!W.webs.some(w=>w.y>6&&hd(w,h.pos)<5)){km15Tap('roll',0.8);return;}
    if(W.enemies.some(q=>q!==e&&q.alive&&hd(q.pos,h.pos)<5))return 'follow';                 // мороки рядом — общий бой
    const mine=W.threads.find(t=>t.owner===1&&t.string&&!t.sag&&t.sz<-52.4),his=W.threads.find(t=>t.owner===0&&t.string&&!t.sag&&t.sz<-52.4);
    const web=W.webs.find(w=>w.y>6);
    if(web){const dx=web.x-e.pos.x,dz=web.z-e.pos.z,d=Math.hypot(dx,dz)||1;cmpGoto(h,clamp(web.x+dx/d*3.2,-10.5,10.5),clamp(web.z+dz/d*3.2,-73,-54),0.5);return;}   // за паутинкой
    if(mine&&!his)return;                                                                       // своя струна есть — ждём струну человека
    // своя струна — поперёк струны человека (или из точки по умолчанию)
    let best=null;for(const s of KM15_SPOT)for(const st of K.ARS){if(Math.hypot(st.x-s[0],st.z-s[1])>15.2)continue;
      if(his&&!km15Cross(his.sx,his.sz,his.stake.x,his.stake.z,s[0],s[1],st.x,st.z))continue;const dd=Math.hypot(s[0]-h.pos.x,s[1]-h.pos.z);if(!best||dd<best.d)best={s,st,d:dd};}
    if(!best)best={s:[4,-60.5],st:K.AR_G[1].st};
    if(cmpGoto(h,best.s[0],best.s[1],0.3)>0.3)return;h.face=Math.atan2(best.st.x-h.pos.x,best.st.z-h.pos.z);km15Tap('item',2.5);}},   // не скрестились — новая струна (старая уйдёт, их не больше трёх)
  {id:'end',done:()=>!!W.flags.out,run:()=>'follow'},
]);
