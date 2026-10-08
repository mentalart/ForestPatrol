/* «Человеческий» боевой контроллер и боевая арена плейтеста. Выполняется ВНУТРИ области видимости игры (ZC.X), после pt_scope.js.
   Контроллер нажимает те же клавиши, что живой игрок (BIND[pi]), и опирается только на то, что видит игрок: замах морока (знак и время),
   летящую каплю, открытого морока. Возраст задаёт параметры P (personas.json → roster.json):
     rt, rtSd — время «увидел → начал действовать», с; timeSd — разброс момента нажатия, с; lapse — доля замахов, не замеченных вовсе;
     habitHold — привычка держать щит, пока враг рядом; pParry, pRoll — склонность целиться в отбив / кувырок (растёт с опытом: learn);
     mash — как часто бьёт по закрытому врагу; moveErr — неточность подхода и поворота; ctrlLiteracy — доля верно нажатых клавиш.
   Результат арены — честные числа движка: сколько раз героя задели, упал ли, сколько секунд ушло на группу морок. */
(function(){
  const PT=window.PT;if(!PT||PT.persona)return;
  PT.rng=seed=>{let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};};
  const gauss=r=>{let u=0;while(!u)u=r();const v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);};
  PT.CTL=[null,null];
  PT.persona=(pi,P,seed,know)=>{PT.pre=PT.preImpl;PT.CTL[pi]={pi,P,r:PT.rng(seed),t:0,sched:[],plans:new Map(),bplans:new Map(),cue:new Map(),
    k:know||{parry:P.pParry,roll:P.pRoll},nextAtk:0,wob:0,wobT:0,openAt:new Map(),dn:0,rev:0,lastStag:0,lastDef:0,lastPet:3,parryUntil:0,
    st:{plans:0,late:0,lapse:0,parryTry:0,rollTry:0,guardOnly:0,atk:0,wasted:0,miskey:0}};return PT.CTL[pi];};
  PT.noPersona=()=>{PT.CTL=[null,null];PT.pre=null;};

  const keyOf=(pi,a)=>BIND[pi][a];
  function learn(C,p){   // опыт: что получилось — то и закрепляется
    const P=C.P,k=C.k;
    if((p.staggerSeen||0)>C.lastStag){C.lastStag=p.staggerSeen;k.parry=Math.min(0.97,k.parry+P.learn);}                    // отбил — понравилось
    const dl=(p.defLog||[]).length;if(dl>C.lastDef){const add=dl-C.lastDef;C.lastDef=dl;k.parry=Math.min(0.97,k.parry+P.learn*0.25*add);}   // щит держит — подсказка «жми в последний миг» читается
    if(p.petals<C.lastPet){k.roll=Math.min(0.99,k.roll+P.learn);k.parry=Math.min(0.97,k.parry+P.learn*0.4);}C.lastPet=p.petals;}
  function run(C,dt){
    const pe=G.solo?G.soloPi:C.pi,kp=G.solo?0:C.pi,P=C.P,r=C.r,p=players[pe],h=active(pe);C.t+=dt;   // в одиночке управляют тем, кто сейчас активен, клавишами игрока 1
    const rel=a=>down.delete(keyOf(kp,a)),hold=a=>down.add(keyOf(kp,a)),tp=a=>pressed.add(keyOf(kp,a));
    const relAll=()=>{['guard','left','right','up','down'].forEach(rel);PADS.axes[kp]={x:0,y:0};};
    if(G.cine||G.trans||G.state!=='play'){relAll();return;}
    if(p.downed){relAll();C.sched.length=0;if(G.solo){C.dn+=dt;if(C.dn>P.rt*1.4){tp('swap');C.dn=0;}}return;}
    C.dn=0;if(h.cling){relAll();return;}
    learn(C,p);
    const slowK=G.slowFoes>0?0.5:1,motor=()=>Math.abs(gauss(r))*P.timeSd*0.5;
    const sched=(t,a)=>C.sched.push({t:C.t+Math.max(0,t),a});
    const miskey=()=>{if(r()<(1-P.ctrlLiteracy)*0.2){C.st.miskey++;return true;}return false;};
    // ---- упреждение: морок пригнулся («ready») за 0,45 с до знака — опытный игрок уже ждёт удара ----
    for(const e of W.enemies){const mine=e.alive&&e.tgt===h&&(e.state==='ready'||e.state==='wind');
      if(!mine){C.cue.delete(e);continue;}
      if(e.state==='ready'&&!C.cue.has(e))C.cue.set(e,r()<Math.min(0.95,C.k.parry*1.1+0.1)?C.t:null);}
    // ---- новые замахи на меня ----
    for(const e of W.enemies){if(!e.alive||e.tgt!==h||e.state!=='wind'||C.plans.has(e))continue;
      const dur=Math.max(0,(e.wdur-e.t)/(e.slow*slowK));let rt=Math.max(0.14,P.rt+P.rtSd*gauss(r))*(e.help?0.93:1);
      const cueT=C.cue.get(e);if(cueT!=null)rt=Math.max(0.12,rt-(C.t-cueT));
      C.plans.set(e,{sig:e.sig,dur});C.st.plans++;
      if(e.sig==='blue')continue;                           // капля — по ней отдельно
      if(r()<P.lapse){C.st.lapse++;continue;}               // не заметил замаха
      if(rt+0.03>=dur){C.st.late++;continue;}               // заметил поздно
      if(e.sig==='red'){
        if(r()<Math.max(C.k.roll,e.help?0.5:0)){if(!miskey()){const tt=Math.max(rt+motor(),dur-0.1-r()*0.28+P.timeSd*gauss(r)*0.7);sched(Math.min(tt,dur+0.02),'roll');C.st.rollTry++;}}
        else{sched(rt,'gOn');sched(dur+0.15,'gOff');C.st.guardOnly++;}   // красный не закрывается щитом — не поможет
      }else{
        // на «Лёгком» и в первых встречах у морока виден сжимающийся круг — по нему целятся даже те, кто приёма не знает
        const tryP=r()<Math.max(C.k.parry,e.help?0.3+0.4*P.ctrlLiteracy:0);
        if(tryP&&!miskey()){const tt=dur-0.08+P.timeSd*gauss(r);if(tt>rt){sched(tt,'gTap');C.parryUntil=C.t+tt+0.1;C.st.parryTry++;}else{sched(rt+motor(),'gOn');}}
        else sched(rt+motor(),'gOn');
        sched(dur+0.12,'gOff');}
    }
    for(const [e] of C.plans)if(!e.alive||e.state!=='wind'||e.tgt!==h)C.plans.delete(e);
    // ---- капли ----
    for(const b of W.bolts){if(b.tgt!==h||b.refl||b.t<0.03||C.bplans.has(b))continue;
      const eta=b.eta,rt=Math.max(0.12,P.rt*0.8+P.rtSd*0.8*gauss(r));C.bplans.set(b,1);
      if(r()<P.lapse*0.6){C.st.lapse++;continue;}
      if(rt+0.03>=eta){C.st.late++;continue;}
      if(r()<Math.max(C.k.parry,0.25)&&!miskey()){const tt=eta-0.16-r()*0.08+P.timeSd*gauss(r);if(tt>rt){sched(tt,'gTap');C.parryUntil=C.t+tt+0.1;C.st.parryTry++;}else sched(rt+motor(),'gOn');}   // капля исчезает за 0,6 м до героя (≈0,09 с) — целятся в «чуть раньше»
      else sched(rt+motor(),'gOn');
      sched(eta+0.12,'gOff');}
    for(const [b] of C.bplans)if(W.bolts.indexOf(b)<0)C.bplans.delete(b);
    // ---- исполнить назначенное ----
    C.sched.sort((a,b)=>a.t-b.t);
    while(C.sched.length&&C.sched[0].t<=C.t){const s=C.sched.shift();
      if(s.a==='gOn')C.gOn=true;else if(s.a==='gOff')C.gOn=false;
      else if(s.a==='gTap'){C.gOn=true;rel('guard');C.pend='tap';}          // новое нажатие: сперва отпустить, потом нажать (в следующем кадре)
      else if(s.a==='roll'&&W.abil.roll){C.gOn=false;tp('roll');}}
    // ---- привычка держать щит, пока враг рядом ----
    const foes=W.enemies.filter(e=>e.alive&&e.state!=='spawn'&&e.state!=='dying'&&e.state!=='hide');
    let tgt=null,bd=1e9;for(const e of foes){const d=hd(e.pos,h.pos);if(d<bd){bd=d;tgt=e;}}
    if(!C.habitSet){C.habit=r()<P.habitHold;C.habitSet=true;}
    const open=e=>e.state==='broken'||e.dazeT>0||(e.state==='stagger'&&!e.openHit)||e.open>0;
    const threat=foes.some(e=>e.tgt===h&&(e.state==='wind'||e.state==='ready'));
    const habitOn=C.habit&&tgt&&bd<5&&!open(tgt)&&C.t>C.parryUntil;
    if(C.pend==='tap'){hold('guard');tp('guard');C.pend=null;}
    else if(C.gOn||habitOn)hold('guard');else rel('guard');
    // ---- движение и удары ----
    if(!tgt){PADS.axes[kp]={x:0,y:0};
      // друг упал — подойти и постоять рядом (подшить)
      const q=players[1-pe];if(q&&q.downed&&!G.solo){C.rev+=dt;if(C.rev>P.rt*1.2){const o=active(1-pe),dx=o.pos.x-h.pos.x,dz=o.pos.z-h.pos.z,d=Math.hypot(dx,dz);if(d>0.9){const b=camBack();PADS.axes[kp]={x:(dx*b.z-dz*b.x)/d,y:(dx*b.x+dz*b.z)/d};}}}else C.rev=0;
      return;}
    C.rev=0;
    const dx=tgt.pos.x-h.pos.x,dz=tgt.pos.z-h.pos.z,reach=h.d.range*0.9+tgt.r;
    C.wobT-=dt;if(C.wobT<=0){C.wob=gauss(r)*P.moveErr*1.1;C.wobT=0.4+r()*0.5;}
    const holdPos=threat&&(C.gOn||C.sched.length);                          // замах на меня — не бегаю, а защищаюсь
    const standOff=tgt.def.ranged&&!open(tgt);                              // стрелков игрок не догоняет, а ждёт каплю на расстоянии
    if(!standOff&&bd>reach*0.85&&!holdPos&&!(tgt.state==='wind'&&tgt.tgt===h)){
      const ang=Math.atan2(dx,dz)+C.wob,sp=0.55+0.45*(1-P.moveErr),b=camBack();const wx=Math.sin(ang),wz=Math.cos(ang);
      PADS.axes[kp]={x:(wx*b.z-wz*b.x)*sp,y:(wx*b.x+wz*b.z)*sp};}
    else PADS.axes[kp]={x:0,y:0};
    if(bd<=reach+0.35&&h.atkCd<=0&&h.rollT<=0&&!h.hang&&!threat){
      const o=open(tgt);if(o&&!C.openAt.has(tgt))C.openAt.set(tgt,C.t+P.rt*0.45*(0.6+r()));
      if(!o)C.openAt.delete(tgt);
      const ready=o?C.t>=C.openAt.get(tgt):r()<P.mash*0.035;
      if(ready&&C.t>=C.nextAtk){const err=gauss(r)*P.moveErr*0.5;h.face=Math.atan2(dx,dz)+err;if(!C.pend){tp('attack');}C.nextAtk=C.t+0.36+0.12*P.moveErr+r()*0.1;C.st.atk++;if(!o)C.st.wasted++;}}
  }
  PT.preImpl=dt=>{for(const C of PT.CTL)if(C)run(C,dt);};PT.pre=PT.preImpl;

  // ---------- арена ----------
  // spec: {groups:[[kind,n],…], who:[{pi,path,P,seed,know}], maxSec, enc}
  PT.arenaSetup=levelId=>{ZC.startFrom(ZC.LV(levelId));G.manual=true;for(let i=0;i<30;i++){step(1/60);pressed.clear();}
    for(let k=0;k<12&&(G.cine||G.trans);k++){if(G.cine)ZC.skip();for(let i=0;i<20;i++){step(1/60);pressed.clear();}}for(let i=0;i<40;i++){step(1/60);pressed.clear();}
    // своя ровная площадка далеко от всего уровня
    ground(-18,18,400,440);wall(-18.2,-18,400,440);wall(18,18.2,400,440);wall(-18.2,18.2,399.8,400);wall(-18.2,18.2,440,440.2);
    W.abil.roll=true;for(const p of players)p.cp.set(0,0,404);
    return {world:W.world,kids:!!W.kids,timing:JSON.parse(JSON.stringify(TIMING))};};
  PT.arenaClear=()=>{for(const e of W.enemies.slice()){try{W.group.remove(e.g);}catch(x){}}W.enemies.length=0;for(const b of W.bolts.slice()){try{W.group.remove(b.g);}catch(x){}}W.bolts.length=0;
    for(const p of players){p.petals=3;p.downed=false;p.spirit=1;p.spiritLock=0;p.revT=0;}for(const h of HEROES){h.iT=0;h.knockT=0;h.rollT=0;h.vel.set(0,0,0);}};
  PT.arena=function(spec){
    PT.arenaClear();
    const ids=spec.who.map(w=>w.pi);
    ids.forEach((pi,i)=>{const h=active(pi);h.pos.set(-2+4*i,0,404);h.vel.set(0,0,0);h.face=0;placeOnGround(h,h.pos.x,404,0);});
    for(let pi=0;pi<2;pi++)if(!ids.includes(pi)){const h=active(pi);h.pos.set(-16+32*pi,0,436);h.vel.set(0,0,0);}   // не участвует — подальше
    const foes=[];let k=0;const tot=spec.groups.reduce((a,g)=>a+g[1],0);
    for(const [kind,n] of spec.groups)for(let i=0;i<n;i++){const ang=(k/Math.max(1,tot)-0.5)*1.6,rr=7.5+((k*37)%3);const x=Math.sin(ang)*rr,z=404+Math.cos(ang)*rr+4;
      const e=makeFoe(kind,x,z,{leash:14});if(e){e.baseY=0;foes.push(e);}k++;}
    for(const w of spec.who){if(w.path)players[w.pi].path=w.path;if(spec.enc!==undefined)players[w.pi].enc={yellow:spec.enc,red:spec.enc,blue:spec.enc};
      if(!PT.CTL[w.pi]||PT.CTL[w.pi].id!==w.id){PT.persona(w.pi,w.P,w.seed,w.know);PT.CTL[w.pi].id=w.id;}
      const C=PT.CTL[w.pi];C.plans.clear();C.bplans.clear();C.cue.clear();C.sched.length=0;C.habitSet=false;C.gOn=false;C.pend=null;C.openAt.clear();C.lastPet=3;C.lastDef=(players[w.pi].defLog||[]).length;C.lastStag=players[w.pi].staggerSeen||0;}
    const hit0=PT.ev.length,maxN=Math.round((spec.maxSec||90)*60);
    const dm0={};for(const w of spec.who){const p=players[w.pi];dm0[w.pi]={log:(p.defLog||[]).length,st:{...(PT.CTL[w.pi].st)}};}
    let n=0;for(;n<maxN;n++){
      if(foes.every(e=>!e.alive))break;
      if(G.cine)ZC.skip();
      step(1/60);pressed.clear();
    }
    const cleared=foes.every(e=>!e.alive),ev=PT.ev.slice(hit0);
    const res={cleared,sec:+((n)/60).toFixed(1),hits:{},downs:{},def:{},plan:{},know:{}};
    for(const w of spec.who){const any=G.solo;   // в одиночке игрок водит обоих героев по очереди — считаем все попадания и падения
      res.hits[w.pi]=ev.filter(e=>e.k==='hit'&&(any||e.pi===w.pi)).length;res.downs[w.pi]=ev.filter(e=>e.k==='down'&&(any||e.pi===w.pi)).length;
      const lg=(players[w.pi].defLog||[]).slice(dm0[w.pi].log);res.def[w.pi]={g:lg.filter(x=>x==='g').length,r:lg.filter(x=>x==='r').length};
      const st=PT.CTL[w.pi].st,s0=dm0[w.pi].st;res.plan[w.pi]={};for(const kk in st)res.plan[w.pi][kk]=st[kk]-s0[kk];
      res.know[w.pi]={parry:+PT.CTL[w.pi].k.parry.toFixed(3),roll:+PT.CTL[w.pi].k.roll.toFixed(3)};}
    res.left=foes.filter(e=>e.alive).map(e=>e.kind);
    PT.arenaClear();
    return res;};
  return PT;
})();
