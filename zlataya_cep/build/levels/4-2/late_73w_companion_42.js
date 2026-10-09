/* ============================== РЕЛИЗ final06 · 4-2 «РЕКА СМОРОДИНА»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/4-2.js. Йоша: ручей прыгает с края; на бурлящую струю носит корки клещами (делает их в заводи, перекладывает «чехардой»);
// на разливе плывёт плотом (корка на течении), паровые столбы поливает; лавопад спускает первым и гасит затвор жёлоба; с той стороны завесы гасит её, когда Потап уже внизу; плиту запруды остужает.
// Ящерки на сваях: шары отбивает щитом, сами они — не его забота (рогатка у человека).
const K42={w:null,tap:{}};
CMP.k42=K42;
const k42=()=>{if(K42.w!==W){K42.w=W;K42.tap={};K42.rt=0;K42.wait=0;K42.go=false;}return K42;};
const k42Tap=(K,k,gap,act)=>{if(!(K.tap[k]>G.time-gap)){K.tap[k]=G.time;cmpTap(act);return true;}return false;};
const k42Spd=h=>Math.hypot(h.vel.x,h.vel.z);
const k42On=h=>h.groundRef&&h.groundRef.crust&&!h.groundRef.gone?h.groundRef:null;
const k42Car=h=>{const c=h.carry&&!h.carry.gone?h.carry:null;return c&&c.kind==='korka'?c:null;};
// ящерки на сваях в огне — к ним не подходят (их шары — только щитом)
{const _ig=CMP.ignore;CMP.ignore=e=>(_ig&&_ig(e))||e.kind==='lizard';}
const K42_STAIRS=[[1.0,-64.8],[1.0,-69.6],[0.4,-73.0]];
const K42_X=0,K42_POOL={x:5,z:-9.5},K42_STAND={x:2.3,z:-9.5},K42_EDGE=-12.85;
const k42Near=(a,b,r)=>hd(a,b)<r;
// впереди на (dx,dz) от героя открытая лава (ни земли, ни корки на высоте ног)
const k42Open=(h,dx,dz)=>{const x=h.pos.x+dx,z=h.pos.z+dz,g=groundAt(x,z,h.pos.y+0.6,0),L=lavaAt(x,z);return !!L&&!(g.ref&&g.ref.crust)&&g.y<L.y-0.2;};
// человек (Игрок 1) рядом с местом начала — бот начинает дело, только когда друг подошёл (корки живут 8 секунд)
const k42Ready=(h,hh,at,r)=>hd(hh.pos,at)<(r||6)||hd(h.pos,hh.pos)<3;
CMP.route('4-2',[
  // ручей (4,2 м, прыжок Йоши ~4 м — не хватит): корка у самого края, по ней до дальнего конца и прыжок на тот берег; друг прыгает сам
  {id:'brook',first:true,done:()=>HERO.yosha.pos.z<-6.6&&(HERO.yosha.pos.y>-0.5||HERO.yosha.pos.z<-26),run:(h,hh)=>{const K=k42(),F=W.flags;if(F.stage==='intro'||G.cine)return 'follow';if(!cmpWant('yosha'))return;
    const T=TIMING[players[1].path]||TIMING.mid;cmpBolts(h,T);h.following=false;
    const cr=W.crusts.find(c=>!c.gone&&Math.abs(c.x-K42_X)<1.4&&c.z<-1.8&&c.z>-4.8&&c.t>1.5);
    if(!cr){if(hd(h.pos,{x:K42_X,z:-1.3})>0.35||k42Spd(h)>0.9){cmpGoto(h,K42_X,-1.3,0.15);return;}
      h.face=Math.PI;if(h.skillCd<=0)k42Tap(K,'water',1.2,'skill');return;}
    if(h.pos.z>-3.7){cmpGoto(h,K42_X,-4.2,0.15);return;}
    cmpGoto(h,K42_X,-9,0.3);if(h.grounded)k42Tap(K,'j',0.4,'jump');}},
  // бурлящая струя: корка из заводи → на струю; вторая; Йоша на одной берёт заднюю и кладёт вперёд (чехарда) — до дальнего берега
  {id:'chan',first:true,done:()=>HERO.yosha.pos.z<-21.6&&(HERO.yosha.pos.y>-0.5||HERO.yosha.pos.z<-26),run:(h,hh)=>{const K=k42(),F=W.flags;if(F.stage==='intro'||G.cine)return 'follow';
    if(h.pos.z>-6.6&&!k42On(h))return 'follow';if(!cmpWant('yosha'))return;
    const T=TIMING[players[1].path]||TIMING.mid;cmpBolts(h,T);h.following=false;
    const on=k42On(h),car=k42Car(h),cs=W.crusts.filter(c=>!c.gone),occ=c=>HEROES.some(q=>q.groundRef===c);
    const lane=c=>Math.abs(c.x-K42_X)<1.6&&c.z<-12.2&&c.z>-20.4;
    if(!on){
      if(h.pos.z<-19.6){                                  // дальний берег: лишнюю корку — обратно на струю, другу
        if(car){if(Math.abs(h.pos.z+20.7)>0.35||k42Spd(h)>0.9){cmpGoto(h,K42_X,-20.7,0.15);return;}h.face=0;k42Tap(K,'drop',0.6,'item');return;}
        cmpGoto(h,K42_X,-22,0.3);return;}
      if(h.pos.z<-13.3)return;                           // в воздухе или на краю корки
      const A=cs.find(c=>lane(c)&&c.z>-15.3&&c.t>2.4);       // корка у края (пусть и с другом на ней)
      if(car){
        if(A){if(h.pos.z>-12.6&&Math.abs(h.pos.x-K42_X)>0.5)cmpGoto(h,K42_X,-12.4,0.25);else cmpGoto(h,K42_X,A.z-0.75,0.25);return;}   // к краю корки вдоль берега, потом на её дальний конец
        if(!k42Ready(h,hh,{x:K42_X,z:-12.5}))return 'follow';
        if(hd(h.pos,{x:K42_X,z:K42_EDGE})>0.35||k42Spd(h)>0.9){cmpGoto(h,K42_X,K42_EDGE,0.2);return;}
        h.face=Math.PI;k42Tap(K,'drop',0.6,'item');return;}
      const pc=cs.find(c=>Math.abs(c.x-3.7)<1.5&&Math.abs(c.z-K42_POOL.z)<1.5&&c.t>1.5&&!occ(c));
      if(!A&&!k42Ready(h,hh,K42_STAND,7))return 'follow';
      if(hd(h.pos,K42_STAND)>0.4||k42Spd(h)>0.9){cmpGoto(h,K42_STAND.x,K42_STAND.z,0.2);return;}
      h.face=Math.PI/2;
      if(pc){k42Tap(K,'grab',0.6,'item');return;}
      if(h.skillCd<=0)k42Tap(K,'water',1.2,'skill');return;}
    // на корке
    if(h.pos.z<-18.9){cmpGoto(h,K42_X,-22,0.3);if(h.grounded)k42Tap(K,'j',0.45,'jump');return;}
    const behind=cs.find(c=>c!==on&&lane(c)&&c.z>on.z+0.5&&!occ(c)),ahead=cs.find(c=>c!==on&&lane(c)&&c.z<on.z-0.5&&c.t>1.2);
    if(car){
      if(ahead){cmpGoto(h,K42_X,ahead.z,0.25);return;}
      const fz=on.z-0.8;if(Math.abs(h.pos.z-fz)>0.3||Math.abs(h.pos.x-K42_X)>0.45||k42Spd(h)>0.9){cmpGoto(h,K42_X,fz,0.15);return;}
      h.face=Math.PI;k42Tap(K,'drop',0.6,'item');return;}
    if(behind){h.face=Math.atan2(behind.x-h.pos.x,behind.z-h.pos.z);k42Tap(K,'grab',0.5,'item');return;}
    if(ahead){cmpGoto(h,K42_X,ahead.z,0.25);return;}}},
  // разлив: корка на течении — плот; друг прыгает на плот сразу; Йоша стоит в середине, едет до берега, сходит. Полоса x=±2,3 — между паровыми столбами
  {id:'raft',first:true,done:()=>HERO.yosha.pos.z<-42.5&&(HERO.yosha.pos.y>-0.5||HERO.yosha.pos.z<-47),run:(h,hh)=>{const K=k42(),F=W.flags;if(G.cine||F.stage==='intro')return 'follow';if(h.pos.z>-20.6)return 'follow';if(!cmpWant('yosha'))return;
    const T=TIMING[players[1].path]||TIMING.mid;cmpBolts(h,T);h.following=false;
    const on=k42On(h);
    if(on&&on.raft){cmpGoto(h,on.x,on.z,0.2);return;}                       // едет стоя в середине плота
    if(on||h.pos.z<-26.3){                                                      // плот остановился у берега (или шагнули на него) — на берег
      if(h.pos.z<-39){cmpGoto(h,K.lane,-44,0.3);if(h.grounded)k42Tap(K,'j',0.45,'jump');}return;}
    if(K.lane===undefined||h.pos.z>-22)K.lane=h.pos.x>=0?2.3:-2.3;
    if(!k42Ready(h,hh,{x:K.lane,z:-25},5))return 'follow';
    const rf=W.crusts.find(c=>!c.gone&&c.raft&&c.z<-26.1&&c.z>-30.5&&Math.abs(c.x-K.lane)<1.2&&c.age<1.7);
    if(rf){if(rf.age>0.7)cmpGoto(h,rf.x,rf.z,0.2);return;}                   // ждёт, пока друг запрыгнет, и сам на плот
    if(hd(h.pos,{x:K.lane,z:-25.4})>0.35||k42Spd(h)>0.9){cmpGoto(h,K.lane,-25.4,0.15);return;}
    h.face=Math.PI;if(h.skillCd<=0)k42Tap(K,'water',1.5,'skill');}},
  // лавопад, ярус 0→1: Йоша спускается первым по каскаду — корка на каждую ступень; внизу гасит затвор жёлоба (оступится — Потап поймает)
  {id:'cascade',first:true,done:()=>!!W.flags.valve,run:(h,hh)=>{const K=k42(),F=W.flags;if(G.cine||F.stage!=='fall')return 'follow';if(!cmpWant('yosha'))return;
    const T=TIMING[players[1].path]||TIMING.mid;cmpBolts(h,T);h.following=false;
    if(h.pos.y<-1.9&&h.pos.z<-56.4){const vs={x:2.8,z:-57.6};if(hd(h.pos,vs)>0.4){cmpGoto(h,vs.x,vs.z,0.2);return;}
      h.face=Math.PI/2;if(h.skillCd<=0&&k42Spd(h)<1.2)k42Tap(K,'water',1.0,'skill');return;}
    if(h.pos.z>-51.4&&hd(h.pos,{x:-0.4,z:h.pos.z})>0.5){cmpGoto(h,-0.4,-51.3,0.25);return;}   // к краю лавопада
    if(!h.grounded||k42Spd(h)>2.5&&h.pos.z>-51.9)return;
    if(k42Open(h,0,-0.85)){h.face=Math.PI;if(k42Spd(h)<1.2&&h.skillCd<=0)k42Tap(K,'water',1.0,'skill');return;}
    cmpGoto(h,-0.4,-57.6,0.3);}},
  // огненная завеса, запруда, ступени: Потап подкидывает друзей — Йоша встаёт к нему вплотную; с той стороны гасит завесу, когда Потап подошёл (8 с),
  // и плиту запруды, как только человек собьёт щеколду (шесть секунд); когда все внизу — по застывшим ступеням вниз
  {id:'lower',first:true,done:()=>W.flags.stage==='cut2'||!!W.flags.out,run:(h,hh)=>{const K=k42(),F=W.flags;if(G.cine||!['tier1','dam','down'].includes(F.stage))return 'follow';if(!cmpWant('yosha'))return;
    const T=TIMING[players[1].path]||TIMING.mid;cmpBolts(h,T);h.following=false;
    const Po=HERO.potap,K2=W.k42;if(h.tossT>0)return;
    const north=Po.pos.y>-3.4&&Po.pos.z>-61.2&&hd(Po.pos,{x:0,z:-60})<14;           // Потап ещё по ту сторону завесы
    if(h.pos.y>-3.4&&h.pos.z>-61.2){                                                   // Йоша тоже по эту: к Потапу — подкинет
      if(F.stage!=='tier1')return 'follow';
      if(hd(h.pos,Po.pos)>12||Po.pos.y>-1.5||Po.pos.y<-2.7)return 'follow';
      const gx=Po.pos.x+(Po.pos.x<2?0.95:-0.95),gz=Po.pos.z;if(hd(h.pos,{x:gx,z:gz})>0.35)cmpGoto(h,gx,gz,0.2);return;}
    const DAMSP={x:-3.4,z:-65.1},CURSP={x:0.2,z:-62.7};
    const plate=K2&&K2.dam()==='hot';
    if(plate||(!north&&F.stage!=='down')){                                              // плита в протоке — к ней
      if(hd(h.pos,DAMSP)>0.4){cmpGoto(h,DAMSP.x,DAMSP.z,0.2);return;}
      h.face=Math.atan2(-3.6-h.pos.x,-67.8-h.pos.z);if(plate&&h.skillCd<=0)k42Tap(K,'water',0.5,'skill');return;}
    if(north){                                                                           // Потапу пройти: завеса остыть
      if(hd(h.pos,CURSP)>0.5){cmpGoto(h,CURSP.x,CURSP.z,0.25);return;}
      h.face=0;if(K2&&K2.cur()<=0&&Po.pos.z<-58.2&&h.skillCd<=0)k42Tap(K,'water',1.0,'skill');return;}
    cmpPath(h,K42_STAIRS,0.4,0.7);}}
]);
