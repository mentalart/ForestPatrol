// ---- продолжение build5B2 (k5epic, часть 8а): СТАДИЯ 1 — ПОДСКАЗКИ ПОКАЗОМ: ДВОЙНИК ГЕРОЯ И КНОПКА, БЕЗ ЗНАЧКОВ И СЛОВ ----
// По отзыву: значки-«фразы» (карточки перед стадией, цель внизу, значки над героями) непонятны ни детям, ни взрослым. На стадии 1
// их нет совсем — ни карточек, ни значков, ни надписей (late_92d: K5PIC.show() глушит всплывашки и подписи). Учит сама игра:
//  • ДВОЙНИК — светящаяся копия твоего героя твоего цвета: выходит из героя и делает то, что нужно сейчас, — бежит к свече (следы
//    на траве) и бьёт её; поднимает щит перед каплей и перед жёлтым замахом цепи — в последний миг; кувыркается вбок от красного;
//    выбегает из красного круга и из буквы Кощея туда, где не заденет; бежит к другу-клубку и ждёт рядом; бьёт замок на цепи Кота;
//    Йошей — поливает свечу. Сделал так же — двойник возвращается в героя золотом, герой подпрыгивает;
//  • КНОПКА — только та, что нужна сейчас, своего игрока, без подписи: удар — над свечой или замком, когда герой рядом; щит и
//    кувырок — над героем; смена — над Йошей. Первый раз каждый приём — «стоп-кадр»: время почти замирает, края экрана темнеют,
//    двойник показывает, кнопка бьётся, пока не нажмёшь (до 2,6 с);
//  • ПАРА: двойники обоих бьют две свечи одной нити разом — нить вспыхивает золотом; у погасшей свечи растёт чернильный огонёк
//    (скоро загорится снова), напарница вспыхивает розовым, и к ней бежит двойник того, кто ближе;
//  • ДРУЗЬЯ показывают сами: Кот упёрся в замок — подпрыгивает и мяучит, замок светится; Йоша подпрыгивает, когда его игрок у
//    свечи (ковшик гасит её разом), — над ним кнопка смены;
//  • ПО ШАГАМ (первая попытка): пока не погасите первую пару (одному — две свечи), Кощей молчит — только свечи; потом капли и цепи;
//    после второй пары — молнии, буквы и Кот-часы. Повтор стадии — всё сразу, двойник — когда нужен.
// Что игрок уже умеет (S1.L): приём удался три раза — двойник его больше не показывает, пока не ошибёшься.
{const S1={ph:2,t:0,t1:0,k0:-1,frz:null,L:[{},{}],pa:[0,1].map(()=>[0,1].map(()=>({on:false,a:'attack',at:new V3()}))),idle:[0,0],demo:[false,false],
    w:[null,null],plans:[null,null],tg:[null,null],tgT:0,cool:[0,0],lets:[],yo:{n:0,t:-99,until:0,hop:0,pi:1},kotT:0,merges:0};
  E.s1=S1;S1.live=()=>E.cur===1&&K5.st===1&&K5.fight&&!G.cine&&G.state==='play';
  const PIS=()=>G.solo?[G.soloPi]:[0,1];
  const rec=(pi,k)=>S1.L[pi][k]||(S1.L[pi][k]={ok:0,fail:0,last:'',frz:0,frzF:0});
  const need=(pi,k)=>{const r=rec(pi,k);return r.ok<3||r.last==='fail';};
  const litC=()=>candles.filter(c=>c.lit&&c.g.visible);
  const cTop=c=>c.pos.clone().add(new V3(0,(c.L.top||1.8)*(c.s||1)+1.0,0));
  const overHead=h=>headOf(h).add(new V3(0,0.55,0));
  // где встать у свечи: со стороны героя, в шаге от неё
  const standAt=(c,from)=>{const d=new V3(from.x-c.pos.x,0,from.z-c.pos.z);if(d.lengthSq()<0.01)d.set(0,0,1);d.normalize();return new V3(c.pos.x+d.x*1.25,0,c.pos.z+d.z*1.25);};
  const CK=E.clock;
  /* ---------- двойник: светящаяся копия героя своего цвета ---------- */
  const GC=[0,1].map(pi=>({pi,g:null,body:null,kind:null,a:0,cur:null,pos:new V3(),to:new V3(),arr:false,ph:0,fpT:0,fpS:1,face:0,cyc:-1,mT:0}));S1.gh=GC;
  function ghBuild(o,kind){if(o.g)k5Del(o.g);const b=buildHeroMesh(kind,true),d=HERO_DEF[kind],col=new THREE.Color(PCOL[o.pi]).lerp(new THREE.Color(0xffffff),0.18);
    o.mat=k5Add(col,{opacity:0,blending:THREE.NormalBlending});   // цвет игрока виден и на яркой траве (сложение давало белое)b.g.traverse(q=>{if(q.isMesh)q.material=o.mat;});
    o.sh=new THREE.Mesh(new THREE.CircleGeometry(d.shield*1.2,26),k5Add(0xfff0b0,{opacity:0}));o.sh.position.set(0,d.height*0.55,d.radius+0.4);b.g.add(o.sh);
    o.ring=new THREE.Mesh(new THREE.RingGeometry(0.42,0.6,28),k5Add(PCOL[o.pi],{opacity:0}));o.ring.rotation.x=-Math.PI/2;o.ring.position.y=0.07;b.g.add(o.ring);
    o.glow=k5Glow(PCOL[o.pi],1.6+d.height);o.glow.position.y=d.height*0.55;o.glow.material.opacity=0;b.g.add(o.glow);
    k5Prop(b.g);K5L.noRay(b.g);Object.assign(o,{g:b.g,body:b.body,kind,d});}
  const FPG=new THREE.CircleGeometry(0.12,10),DRG=new THREE.SphereGeometry(0.09,8,6);
  function foot(p,face,side,col){const m=k5Prop(new THREE.Mesh(FPG,k5Add(col,{opacity:0.7})));m.rotation.set(-Math.PI/2,0,-face);m.scale.set(1,1.5,1);
    m.position.set(p.x+Math.cos(face)*0.14*side,0.07,p.z-Math.sin(face)*0.14*side);k5fx(1.5,k=>{m.material.opacity=0.7*(1-k);},()=>k5Del(m));}
  function splash(from,to){const a=from.clone().add(new V3(0,0.6,0)),b=to.clone().add(new V3(0,1.6,0));
    for(let i=0;i<6;i++){const m=k5Prop(new THREE.Mesh(DRG,k5Add(0x7ad8ff,{opacity:0.9}))),d=i*0.05;m.position.copy(a);
      k5fx(0.55+d,k=>{const u=Math.max(0,(k*(0.55+d)-d)/0.55);m.position.lerpVectors(a,b,u);m.position.y+=Math.sin(u*Math.PI)*1.2;m.material.opacity=0.9*(1-u*0.5);},()=>k5Del(m));}}
  // план (pl): k — что показываем; run — бежать к to со скоростью sp; follow — стоять в герое; act — hit / guard / roll / water / wait;
  // look — куда смотреть; raise — щит поднят (пора жать); hot — бегом
  function ghTick(o,pl,rdt){const h=active(o.pi);
    if(o.mT>0){o.mT-=rdt;const k=Math.max(0,o.mT/0.35);o.pos.lerp(h.pos,1-Math.exp(-14*rdt));o.g.scale.setScalar(0.3+0.7*k);o.a=k;ghLook(o);if(o.mT<=0){o.g.scale.setScalar(1);o.a=0;o.cur=null;o.g.visible=false;}return;}
    if(!pl){if(o.g&&o.g.parent&&o.a>0){o.a=Math.max(0,o.a-rdt*2.5);ghLook(o);}if(o.a<=0)o.cur=null;return;}
    if(!o.g||!o.g.parent||o.kind!==h.kind)ghBuild(o,h.kind);
    if(o.cur!==pl.k){const fresh=!o.cur||o.a<0.05;o.cur=pl.k;o.ph=0;o.arr=!pl.run;o.cyc=-1;if(fresh){o.pos.copy(h.pos);o.a=0;FX.sparkle(headOf(h),8,PCOL[o.pi]);}if(pl.to)o.to.copy(pl.to);}
    else if(pl.to&&pl.re&&hd(pl.to,o.to)>1.5){o.to.copy(pl.to);o.arr=false;}
    o.a=Math.min(1,o.a+rdt*3);o.ph+=rdt;const b=o.body;b.rotation.set(0,0,0);b.position.set(0,0,0);o.sh.material.opacity=0;
    const lookAt=p=>{const dx=p.x-o.pos.x,dz=p.z-o.pos.z;if(dx*dx+dz*dz>0.01)o.face=Math.atan2(dx,dz);};
    if(pl.follow){o.pos.copy(h.pos);o.arr=true;}
    if(pl.run&&!o.arr){const d=hd(o.pos,o.to),st=Math.min(d,(pl.sp||6)*rdt);if(d>0.05){const dx=(o.to.x-o.pos.x)/d,dz=(o.to.z-o.pos.z)/d;o.pos.x+=dx*st;o.pos.z+=dz*st;o.face=Math.atan2(dx,dz);}o.pos.y=0;
      const w=o.ph*15;b.rotation.x=0.22;b.rotation.z=Math.sin(w)*0.1;b.position.y=Math.abs(Math.sin(w))*0.14;
      o.fpT-=rdt;if(o.fpT<=0){o.fpT=0.28;o.fpS=-o.fpS;foot(o.pos,o.face,o.fpS,PCOL[o.pi]);}if(d<0.2){o.arr=true;o.ph=0;}}
    else{const act=pl.act;
      if(act==='hit'){lookAt(pl.look);const u=(G.time%0.75)/0.75,cyc=Math.floor(G.time/0.75);   // такт по общим часам: два двойника у одной пары бьют разом
        if(u<0.4){const k=u/0.4;b.rotation.y=Math.sin(k*Math.PI)*0.9;b.rotation.x=0.25*Math.sin(k*Math.PI);}
        if(cyc!==o.cyc&&u>0.15){o.cyc=cyc;FX.sparks(pl.look.clone().add(new V3(0,1.4,0)),5,PCOL[o.pi]);}
        if(o.ph>5&&hd(h.pos,o.pos)>4.5){o.pos.copy(h.pos);o.arr=false;o.ph=0;}}   // герой не идёт — ещё раз от него
      else if(act==='guard'){lookAt(pl.look);const r=pl.raise?1:0.3;o.sh.material.opacity=(0.3+0.6*r)*o.a*(0.8+0.2*Math.sin(G.time*22));o.sh.scale.setScalar(0.75+0.35*r);b.rotation.x=-0.22*r;}
      else if(act==='roll'){const u=o.ph%1.25,k=Math.min(1,u/0.42),f=h.pos;o.pos.lerpVectors(f,o.to,smooth(k));o.pos.y=0;o.face=Math.atan2(o.to.x-f.x,o.to.z-f.z);if(k<1){b.rotation.x=k*Math.PI*2;b.position.y=0.15;}}
      else if(act==='water'){lookAt(pl.look);b.rotation.x=0.18*Math.sin(o.ph*6);const cyc=Math.floor(o.ph);if(cyc!==o.cyc){o.cyc=cyc;splash(o.pos,pl.look);}}
      else{lookAt(pl.look||h.pos);b.position.y=Math.abs(Math.sin(o.ph*6))*0.3;}}
    ghLook(o);}
  function ghLook(o){const k=o.a;o.mat.opacity=0.62*k*(0.85+0.15*Math.sin(G.time*6));o.ring.material.opacity=0.85*k;o.ring.scale.setScalar(1+0.15*Math.sin(G.time*5));o.glow.material.opacity=0.45*k;
    o.g.position.copy(o.pos);o.g.rotation.y=o.face;o.g.visible=k>0.01;}
  // получилось: двойник возвращается в героя золотом, герой подпрыгивает
  function ghMerge(pi){const o=GC[pi],h=active(pi);S1.cool[pi]=G.time+1.4;if(!o.g||!o.cur||o.a<0.05)return;o.mT=0.35;S1.merges++;
    K5L.gold(headOf(h),10);k5Flash(headOf(h),PCOL[pi],1.8,0.4);tone(1320,0.1,'triangle',0.1);tone(1760,0.14,'sine',0.08,null,0.07);try{ACT.emote(h,'hop');}catch(e){}}
  /* ---------- куда кому: свеча своей пары ---------- */
  function assign(){const tg=[null,null],lit=litC();for(const c of candles)c._urg=false;if(!lit.length)return tg;
    if(G.solo){const pi=G.soloPi,h=active(pi);tg[pi]=lit.slice().sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos))[0];return tg;}
    const H=[active(0),active(1)],ok=pi=>!players[pi].downed;
    // пара, где одна погасла, а напарница горит: к напарнице — тот, кто ближе
    const urg=PAIRS.map(([a,b])=>[candles[a],candles[b]]).filter(([A,B])=>A.lit!==B.lit&&A.g.visible).map(([A,B])=>A.lit?{L:A,O:B}:{L:B,O:A}).sort((x,y)=>x.O.relT-y.O.relT);
    if(urg.length){const u=urg[0],q=[0,1].filter(ok).sort((a,b)=>hd(H[a].pos,u.L.pos)-hd(H[b].pos,u.L.pos))[0];if(q!=null){tg[q]=u.L;u.L._urg=true;}}
    // остальным — пара, где горят обе: каждому своя свеча (сумма путей меньше)
    const free=[0,1].filter(pi=>ok(pi)&&!tg[pi]);if(!free.length)return tg;
    let best=null;for(const [a,b] of PAIRS){const A=candles[a],B=candles[b];if(!A.lit||!B.lit)continue;
      if(free.length===2){const c1=hd(H[0].pos,A.pos)+hd(H[1].pos,B.pos),c2=hd(H[0].pos,B.pos)+hd(H[1].pos,A.pos),c=Math.min(c1,c2);if(!best||c<best.c)best={c,t:c1<=c2?[A,B]:[B,A]};}
      else{const pi=free[0],a0=hd(H[pi].pos,A.pos),b0=hd(H[pi].pos,B.pos),c=Math.min(a0,b0),t=[null,null];t[pi]=a0<=b0?A:B;if(!best||c<best.c)best={c,t};}}
    if(best)for(const pi of free)tg[pi]=best.t[pi];
    for(const pi of free)if(!tg[pi]){const h=H[pi];tg[pi]=lit.filter(c=>c!==tg[1-pi]).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos))[0]||lit[0];}
    return tg;}
  /* ---------- опасность под ногами: красный круг молнии или буква Кощея ---------- */
  // k — сколько прошло (0…1, у 1 — удар); safe — ближняя точка, где не заденет
  function danger(h){const hz=[];
    for(const z of K5.zones||[]){const r0=z.children[0]&&z.children[0].geometry.parameters&&z.children[0].geometry.parameters.outerRadius||1.6;hz.push({hit:p=>hd(p,z.position)<r0+0.35,k:z.children[1]?z.children[1].scale.x:0.5});}
    for(const l of S1.lets){const k=(G.time-l.t0)/l.tele;if(k<1)hz.push({hit:p=>l.sh.hit(p),k});}
    const on=hz.filter(z=>z.hit(h.pos));if(!on.length)return null;const k=Math.max(...on.map(z=>z.k));let safe=null;
    for(const r of[1.3,2.1,3,3.9,4.8]){for(let i=0;i<16&&!safe;i++){const a=i/16*Math.PI*2,p=new V3(h.pos.x+Math.sin(a)*r,0,h.pos.z+Math.cos(a)*r);if(hd(p,C)<R-1.2&&!hz.some(z=>z.hit(p)))safe=p;}if(safe)break;}
    return {k,safe};}
  /* ---------- замок на цепи Кота ---------- */
  const lockAlive=()=>CK&&CK.live&&CK.locks.find(L=>L.alive)||null;
  function lockFor(pi){const L=lockAlive();if(!L)return null;const q=PIS().filter(x=>!players[x].downed).sort((a,b)=>hd(active(a).pos,L.pos)-hd(active(b).pos,L.pos))[0];return q===pi?L:null;}
  const lockStand=L=>{const d=new V3(L.pos.x-OAK.x,0,L.pos.z-OAK.z).normalize();return new V3(L.pos.x+d.x*0.9,0,L.pos.z+d.z*0.9);};
  /* ---------- что показать игроку сейчас ---------- */
  function planFor(pi){const h=active(pi),p=players[pi];if(!h||!h.active||p.downed||h.cling)return null;const T=timingOf(pi);
    // 1) синяя капля летит в героя — щит в последний миг
    const bo=W.bolts.find(b=>!b.refl&&b.tgt===h);
    if(bo&&bo.eta<T.parry+0.9&&need(pi,'drop'))return {k:'drop',follow:1,act:'guard',look:bo.p,raise:bo.eta<=T.parry+0.1,btn:bo.eta<T.parry+0.55?'guard':null,frz:bo.eta<=T.parry*0.85?'guard':null};
    // 2) цепь замахнулась: жёлтый — щит в последний миг, красный — кувырок вбок
    const ce=W.enemies.find(e=>e.alive&&e.k5chain&&e.state==='wind'&&e.tgt===h&&e.sig!=='blue');
    if(ce){const left=ce.wdur-ce.t;
      if(ce.sig==='yellow'&&need(pi,'yellow'))return {k:'yellow',follow:1,act:'guard',look:ce.pos,raise:left<=T.parry+0.1,btn:left<T.parry+0.5?'guard':null,frz:left<=T.parry*0.85?'guard':null};
      if(ce.sig==='red'&&need(pi,'red')){const d=new V3(h.pos.x-ce.pos.x,0,h.pos.z-ce.pos.z);if(d.lengthSq()<0.01)d.set(0,0,1);d.normalize();const s=new V3(-d.z,0,d.x);
        return {k:'red',act:'roll',to:inArena(h.pos.clone().addScaledVector(s,2.3).setY(0),1),btn:left<0.6?'roll':null,frz:left<=0.32?'roll':null};}}
    // 3) красный круг или буква под ногами — туда, где не заденет; скоро ударит — кувырок
    const dz=danger(h);if(dz&&dz.safe&&need(pi,'zone'))return {k:'zone',run:1,re:1,sp:9,to:dz.safe,act:'wait',look:h.pos,btn:dz.k>0.55?'roll':null,frz:dz.k>=0.8?'roll':null};
    if(G.time<S1.cool[pi])return null;
    // 4) друг рассыпался клубком — беги к нему и постой рядом
    if(!G.solo&&players[1-pi].downed){const o=active(1-pi),d=new V3(h.pos.x-o.pos.x,0,h.pos.z-o.pos.z);if(d.lengthSq()<0.01)d.set(0,0,1);d.normalize();
      return {k:'rev',run:1,re:1,sp:7.5,to:o.pos.clone().addScaledVector(d,0.8).setY(0),act:'wait',look:o.pos};}
    // 5) Йоша у свечи — ковшиком
    if(h.kind==='yosha'&&!(h.skillCd>0)&&need(pi,'water')){const c=litC().filter(x=>hd(x.pos,h.pos)<2.9).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos))[0];if(c)return {k:'water',follow:1,act:'water',look:c.pos,btn:'skill',bat:cTop(c)};}
    // 6) свеча: напарница горит, а погасшая вот-вот загорится — бегом к ней
    const c=S1.tg[pi];if(c&&c.lit&&c._urg&&hd(h.pos,c.pos)>2.4)return {k:'c'+c.idx,run:1,sp:8.5,to:standAt(c,h.pos),act:'hit',look:c.pos,hot:1};
    // 7) замок на цепи Кота (пока не научился)
    const L=need(pi,'lock')?lockFor(pi):null;if(L&&hd(h.pos,L.pos)>2.2)return {k:'lock',run:1,sp:7,to:lockStand(L),act:'hit',look:L.pos};
    // 8) свеча: в начале стадии и когда давно без дела
    if(c&&c.lit&&(S1.demo[pi]||S1.idle[pi]>9))return {k:'c'+c.idx,run:1,sp:6,to:standAt(c,h.pos),act:'hit',look:c.pos};
    return null;}
  /* ---------- кнопки: только нужная, без подписи ---------- */
  function keysFor(pi,pl){const h=active(pi),A=S1.pa[pi];A[0].on=A[1].on=false;if(!h||players[pi].downed||PIS().indexOf(pi)<0)return;
    if(pl&&pl.btn){A[0].on=true;A[0].a=pl.btn;A[0].at=pl.bat||overHead(h);}
    else{const c=litC().filter(x=>hd(x.pos,h.pos)<2.6).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos))[0];
      if(c&&(S1.ph===0||need(pi,'hit')||S1.idle[pi]>9||c._urg)){A[0].on=true;A[0].a='attack';A[0].at=cTop(c);}
      const L=lockAlive();if(!A[0].on&&L&&hd(L.pos,h.pos)<2.6){A[0].on=true;A[0].a='attack';A[0].at=L.pos.clone().add(new V3(0,1,0));}}
    if(S1.yo.pi===pi&&G.time<S1.yo.until){A[1].on=true;A[1].a='swap';A[1].at=overHead(HERO.yosha);}}
  for(const pi of[0,1])for(let j=0;j<2;j++){prompt(pi,'attack',()=>S1.pa[pi][j].at,()=>false);const pr=W.prompts[W.prompts.length-1];
    pr.cond=()=>{const q=S1.pa[pi][j];if(!q.on||!S1.live())return false;pr.action=q.a;return true;};}
  /* ---------- итог показанного приёма: получилось — двойник в героя; ранило — покажем ещё ---------- */
  function watchTick(pi,pl){const w=S1.w[pi],p=players[pi],k=pl?pl.k:null,same=w&&k&&(w.k===k||w.k[0]==='c'&&k[0]==='c');
    if(w&&!same){const hurt=p.petals<w.pet||p.downed,r=rec(pi,w.k[0]==='c'?'cand':w.k);
      let res=hurt?'fail':(w.k==='drop'||w.k==='yellow')?(G.stats.parries>w.par?'ok':''):w.k==='red'?'ok':w.k==='zone'?'ok':w.k==='rev'?(players[1-pi].downed?'':'ok'):'';
      if(res==='ok'){r.ok++;r.last='ok';ghMerge(pi);}else if(res==='fail'){r.fail++;r.last='fail';}S1.w[pi]=null;}
    if(pl&&!S1.w[pi])S1.w[pi]={k:pl.k,t:G.time,pet:p.petals,par:G.stats.parries,dod:G.stats.dodges};}
  /* ---------- «стоп-кадр»: первый раз каждый приём — время почти замирает, пока не нажмёшь ---------- */
  const vig=on=>{let d=document.getElementById('k5s1v');if(!d){d=document.createElement('div');d.id='k5s1v';
      d.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;transition:opacity .25s;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 42%,rgba(18,6,40,.62) 100%)';const c=$('c');if(c&&c.parentNode)c.after(d);else document.body.appendChild(d);}
    d.style.opacity=on?1:0;document.body.classList.toggle('k5s1f',!!on);};
  function frzTick(rdt){const F=S1.frz;
    if(F){F.t+=rdt;const P=S1.plans[F.pi],tapd=t4Tap(F.pi,F.a);if(tapd||!P||P.k!==F.k||F.t>2.6){S1.frz=null;vig(0);}else G.hitstop=Math.max(G.hitstop||0,0.08);return;}
    for(const pi of PIS()){const pl=S1.plans[pi];if(!pl||!pl.frz)continue;const r=rec(pi,pl.k);
      if(r.ok===0&&(r.frz===0||r.fail-r.frzF>=2)){   // ещё раз — после каждых двух неудач
        r.frz++;r.frzF=r.fail;S1.frz={pi,k:pl.k,a:pl.frz,t:0};G.hitstop=Math.max(G.hitstop||0,0.08);vig(1);tone(520,0.28,'sine',0.05,300);return;}}}
  /* ---------- пара: погасшая свеча растит чернильный огонёк, напарница зовёт ---------- */
  const RF=candles.map(()=>{const m=k5Prop(new THREE.Mesh(new THREE.ConeGeometry(0.16,0.5,8),k5Add(0x9a50ff,{opacity:0})));m.visible=false;K5L.noRay(m);return m;});
  const PG=candles.map(()=>{const s=k5Prop(k5Glow(0xff70c0,2.4));s.visible=false;return s;});
  function relTick(on){const fp=new V3();for(let i=0;i<candles.length;i++){const c=candles[i],m=RF[i],g=PG[i];
      const rel=on&&!c.lit&&c.g.visible&&c.relT<10;m.visible=rel;if(rel){const k=1-Math.min(1,c.relT/10);c.L.flame.getWorldPosition(fp);m.position.copy(fp);
        m.scale.set(0.4+0.8*k,(0.3+1.1*k)*(1+0.15*Math.sin(G.time*(6+14*k))),0.4+0.8*k);m.material.opacity=0.25+0.55*k;}
      const j=G.solo?-1:pairOf(i),O=j>=0?candles[j]:null,call=on&&c.lit&&!!O&&!O.lit&&O.relT<10;g.visible=call;
      if(call){c.L.flame.getWorldPosition(fp);g.position.copy(fp);const k=1-Math.min(1,O.relT/10);g.material.opacity=0.35+0.45*Math.abs(Math.sin(G.time*(4+8*k)));g.scale.setScalar(2+1.2*k);}}
    // два двойника бьют две свечи одной нити разом — нить вспыхивает золотом в такт
    if(on&&!G.solo){const a=GC[0],b=GC[1];if(a.cur&&b.cur&&a.cur[0]==='c'&&b.cur[0]==='c'&&a.arr&&b.arr){const i=+a.cur.slice(1),j=+b.cur.slice(1),T=threads.find(t=>(t.a===i&&t.b===j)||(t.a===j&&t.b===i));
      if(T&&T.m.visible){const u=(G.time%0.75)/0.75;T.m.material.color.set(u<0.35?0xffd76a:0x9a50ff);T.m.material.opacity=u<0.35?0.95:0.4;}}}}
  /* ---------- друзья показывают сами ---------- */
  const meow=()=>{tone(700,0.16,'triangle',0.06,980);tone(980,0.24,'triangle',0.05,560,0.15);};
  function kotTick(){const L=lockAlive();if(!L||CK.ph!=='song')return;
    L.g.scale.setScalar(1.25*(1+0.12*Math.abs(Math.sin(G.time*5))));if(!L._gl){L._gl=k5Glow(0xffd76a,2.2);L.g.add(L._gl);}L._gl.material.opacity=0.3+0.4*Math.abs(Math.sin(G.time*5));
    if(CK.a-L.a<0.32&&CK.a>L.a&&G.time>S1.kotT){S1.kotT=G.time+1.6;const n=ACT.npcs&&ACT.npcs.find(q=>q.o===kot);if(n)n.em={type:'hop',t:0,d:0.55};meow();}}   // Кот упёрся в замок
  function yoshaTick(){const Y=HERO.yosha;if(!Y||S1.ph<1)return;const q=G.solo?G.soloPi:Y.player,h=active(q);
    if(!h||h===Y||players[q].downed||rec(q,'water').ok>=2||hd(Y.pos,h.pos)>7){if(h===Y)S1.yo.until=0;return;}
    if(litC().some(c=>hd(c.pos,h.pos)<3.2)&&G.time-S1.yo.t>22&&S1.yo.n<4){S1.yo.t=G.time;S1.yo.n++;S1.yo.until=G.time+4.5;S1.yo.pi=q;}
    if(G.time<S1.yo.until&&G.time>S1.yo.hop){S1.yo.hop=G.time+0.8;try{ACT.emote(Y,'hop');}catch(e){}}}
  /* ---------- по шагам: сначала только свечи ---------- */
  function begin(){const retry=(K5.fails[1]||0)>0||(E.fails[1]||0)>0;Object.assign(S1,{ph:retry?2:0,t:0,t1:0,frz:null,w:[null,null],plans:[null,null],idle:[0,0],demo:[!retry,!retry],tg:[null,null],tgT:0,cool:[0,0]});
    S1.lets.length=0;S1.yo.until=0;vig(0);}
  function phase(){const outP=PAIRS.filter(([a,b])=>!candles[a].lit&&!candles[b].lit).length,outN=candles.filter(c=>!c.lit).length;
    if(S1.ph===0&&((G.solo?outN>=2:outP>=1)||S1.t>40)){S1.ph=1;S1.t1=S1.t;}
    if(S1.ph===1&&((G.solo?outN>=4:outP>=2)||S1.t-S1.t1>30))S1.ph=2;
    if(S1.ph<1){K5.cs0=Math.max(K5.cs0||0,1);K5.cs1=Math.max(K5.cs1||0,1);for(const c of candles)if(c.lit&&(c.state==='idle'||c.state==='spawn'))c.cd=Math.max(c.cd||0,1);}   // капли и цепи ждут
    if(S1.ph<2){K5.castT=Math.max(K5.castT==null?4:K5.castT,1);ES.lt=Math.max(ES.lt||0,1);}}                                                                       // молнии и буквы ждут
  const sync=()=>{if(K5.t0!==S1.k0){S1.k0=K5.t0;begin();}};   // новая попытка стадии (часы тикают раньше нашего шага — сверяемся и там)
  {const _ct=CK.tick;CK.tick=dt=>{if(S1.live()){sync();if(S1.ph<2)return;}_ct(dt);};}   // Кот-часы — после второй пары
  /* ---------- кто что сделал ---------- */
  for(const c of candles){const _h=c.k5hit;c.k5hit=(e,h)=>{const was=e.lit;_h(e,h);if(!was||!h||!S1.live())return;const pi=h.player,pl=S1.plans[pi];S1.idle[pi]=0;S1.demo[pi]=false;
      if(pl&&pl.k==='c'+e.idx&&GC[pi].cur===pl.k)ghMerge(pi);};}
  {const _co=candleOff;candleOff=function(e,txt){const was=e.lit;_co(e,txt);if(!was||e.lit||!S1.live())return;
      for(const h of k5Heroes())if(hd(h.pos,e.pos)<3.6){const r=rec(h.player,'hit');r.ok++;r.last='ok';S1.idle[h.player]=0;}
      if(txt==='пш-ш-ш!'){const q=G.solo?G.soloPi:HERO.yosha.player,r=rec(q,'water');r.ok++;r.last='ok';if(S1.plans[q]&&S1.plans[q].k==='water')ghMerge(q);}};}
  {const _lh=lockHit;lockHit=function(L,h,d){const was=L.alive;_lh(L,h,d);if(!S1.live()||!h)return;S1.idle[h.player]=0;if(was&&!L.alive){const r=rec(h.player,'lock');r.ok++;r.last='ok';if(GC[h.player].cur==='lock')ghMerge(h.player);}};}
  {const _la=E.letterAt;E.letterAt=(ch,h,o)=>{const sh=_la(ch,h,o);if(E.cur===1&&sh&&sh.hit){const S=K5L.SHAPES[ch]||K5L.SHAPES['О'];S1.lets.push({sh,t0:G.time,tele:((o&&o.tele)||S.tele)*(G.solo?1.2:1)});}return sh;};}
  /* ---------- кнопка бьётся (стиль один на страницу) ---------- */
  if(!document.getElementById('k5s1css')){const st=document.createElement('style');st.id='k5s1css';
    st.textContent='body.k5s1 .bub .inner{animation:k5s1b .8s ease-in-out infinite}body.k5s1f .bub .inner{animation:k5s1b .32s ease-in-out infinite}'+
      '@keyframes k5s1b{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}';document.head.appendChild(st);}
  /* ---------- шаг ---------- */
  W.updates.push(dt=>{const on=S1.live();if(document.body.classList.contains('k5s1')!==on)document.body.classList.toggle('k5s1',on);
    if(!on){if(S1.frz){S1.frz=null;vig(0);}for(const o of GC){o.cur=null;o.a=0;o.mT=0;if(o.g)o.g.visible=false;}relTick(false);for(const pi of[0,1])S1.pa[pi][0].on=S1.pa[pi][1].on=false;return;}
    sync();
    const rdt=G.hitstop>0&&!G.manual?dt/0.15:dt;S1.t+=dt;phase();
    S1.tgT-=dt;if(S1.tgT<=0||S1.tg.some((c,pi)=>c&&!c.lit)){S1.tgT=0.5;S1.tg=assign();}
    for(const pi of[0,1])S1.idle[pi]+=dt;S1.lets=S1.lets.filter(l=>G.time-l.t0<l.tele);
    yoshaTick();kotTick();relTick(true);
    S1.plans=[null,null];for(const pi of PIS())S1.plans[pi]=planFor(pi);
    for(const pi of[0,1]){watchTick(pi,S1.plans[pi]);keysFor(pi,S1.plans[pi]);ghTick(GC[pi],S1.plans[pi],rdt);}
    frzTick(rdt);});
  // для ботов
  S1.dbg=()=>({ph:S1.ph,frz:S1.frz&&S1.frz.k,plans:S1.plans.map(p=>p&&p.k),gh:GC.map(o=>o.cur&&o.a>0.3?o.cur:null),keys:S1.pa.map(A=>A.filter(q=>q.on).map(q=>q.a)),L:S1.L,merges:S1.merges});}
