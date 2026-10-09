/* ============================== РЕЛИЗ final06 · 3-1 «САД МОЛОДИЛЬНЫХ ЯБЛОК»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Бот ведёт одного героя Игрока 2 (Пелагею или Йошу) — свет и тьма мостков управляются его пером (помощники w3Lit / w3Path — levels/w3/late_73o_companion_w3.js).
// Участки (положения — из proto/levels/3-1.js и build/levels/3-1/late_99p_sky31.js): светомосток и тенемосток → мосток вперемежку (смена пера в прыжке) → две дорожки к чашам
// (кому свет — тому светлая дорожка и чаша-солнце, кому тьма — тёмная и чаша-звёзды; выбирает по человеку) → светомосток к воротам.
const K31={w:null,role:null,rt:0,t:0,rl:null,A:null,jt:0,at:0,ro:0,st:0,bw:null};
CMP.k31=K31;
const k31=()=>{if(K31.w!==W){K31.w=W;K31.role=null;K31.rt=0;K31.t=0;K31.rl=null;K31.A=null;K31.jt=0;K31.at=0;K31.ro=0;K31.st=0;K31.bw=null;}return K31;};
const K31_BR=[[0,-12],[0,-19],[0,-24],[0,-34],[0,-43],[0,-50],[0,-62],[0,-72.5]];
const K31_LP=[[-5,-79],[-5,-84],[5,-96],[5,-104],[5,-108],[6,-109]];
const K31_SP=[[5,-79],[5,-84],[-5,-96],[-5,-104],[-5,-108],[-6,-109]];
const K31_GATE=[[0,-112],[0,-126.5]];
const K31_TR=[[-6,-149.2],[6,-149.2]],K31_GB=[[0,-153],[0,-167.8]];
// молодильное яблочко: у дерева T — оживить пером, дождаться яблочка и подобрать (само в руки в 1,7 м); true — в руках
const k31Tree=(x,z)=>W.apples31.trees.find(t=>Math.hypot(t.pos.x-x,t.pos.z-z)<0.6);
function k31Fetch(h,T){if(h.apple31)return true;const a=T.ap&&T.ap.apple;
  if(!T.revived){const px=T.pos.x+(T.pos.x<0?1:-1)*2.0*T.s;if(hd(h.pos,{x:px,z:T.pos.z})>0.8){cmpGoto(h,px,T.pos.z,0.5);return false;}w3Lit(h,true);return false;}
  if(a&&(a.state==='tree'||a.state==='ground')){cmpGoto(h,a.pos.x,a.pos.z,0.4);return false;}
  return false;}                                                                           // ждёт, пока вырастет новое
// «передай яблочко» через лиловые мостки (с яблочком по ним не пройти — оно светится): бот делает всё обоими героями Игрока 2 — яблочко с яблони у острова несёт первый (A) до края,
// второй (B) уходит на островок без света, A бросает яблочко B, сам идёт на дальний берег, B бросает ему, A несёт яблочко к дубу
const k31Tap=(K,k,gap,act)=>{if(!(K[k]>G.time-gap)){K[k]=G.time;cmpTap(act);return true;}return false;};
const K31_STR=[-316,-328,-340,-352];
// луч (ax,az)→(bx,bz) пересекает прямоугольник o с запасом m (изгородь на террасе)
const k31Seg=(ax,az,bx,bz,o,m)=>{let t0=0,t1=1;const dx=bx-ax,dz=bz-az,P=[-dx,dx,-dz,dz],Q=[ax-(o.minx-m),(o.maxx+m)-ax,az-(o.minz-m),(o.maxz+m)-az];
  for(let i=0;i<4;i++){if(P[i]===0){if(Q[i]<0)return false;}else{const r=Q[i]/P[i];if(P[i]<0){if(r>t1)return false;if(r>t0)t0=r;}else{if(r<t0)return false;if(r<t1)t1=r;}}}return true;};
// к точке (tx,tz) в обход живых изгородей террасы (W.obs31): сначала к торцу изгороди, потом мимо неё
function k31Go(h,tx,tz,stop){for(const o of W.obs31||[]){if(!k31Seg(h.pos.x,h.pos.z,tx,tz,o,0.5))continue;const L=o.minx-1.3,R=o.maxx+1.3;
    const ex=Math.abs(h.pos.x-L)+Math.abs(tx-L)<Math.abs(h.pos.x-R)+Math.abs(tx-R)?L:R,up=h.pos.z>(o.minz+o.maxz)/2;
    tz=Math.abs(h.pos.x-ex)>0.5?(up?o.maxz+0.3:o.minz-0.3):(up?o.minz-1.2:o.maxz+1.2);tx=ex;break;}
  cmpGoto(h,tx,tz,stop||0.3);}
const K31_BW=[[-7,-462],[7,-462]],K31_BT=[[-10,-450],[10,-450]];
const K31_B1=[[0,-247.8],[0,-252],[-1.0,-254.5]],K31_A2=[[0,-247.8],[0,-252],[1.0,-254.5],[0,-257.6],[0,-263.5]];
CMP.route('3-1',[
  // светомосток (перо горит), тенемосток (перо погашено), мосток вперемежку «три шага по золоту, три по лиловому» (смена пера в прыжке)
  {id:'bridges',done:()=>active(1).pos.z<-71,run:h=>{k31();const F=W.flags;if(!W.abil.pero||F.stage==='gift'||F.stage==='intro'||F.stage==='walk')return 'follow';
    w3Path(h,K31_BR,0.4,0.9);}},
  // две дорожки и чаши: роль — по человеку (он уже на дорожке — берёт другую; ещё не выбрал — ждёт, потом берёт светлую, если он без света, иначе тёмную)
  {id:'paths',done:()=>!!W.flags.gateOpen,run:(h,hh)=>{const K=k31();if(h.pos.z>-60)return 'follow';
    if(!K.role){const on=hh.pos.z<-77&&hh.groundRef&&hh.groundRef.tile?hh.groundRef.type:null;
      if(on)K.role=on==='light'?'shadow':'light';
      else{if(!K.rt)K.rt=G.time;if(G.time-K.rt>7||hd(hh.pos,{x:0,z:-74})<4&&G.time-K.rt>2.5)K.role=hh.lit?'shadow':'light';
        else{w3Lit(h,false);cmpGoto(h,0,-74.5,0.6);return;}}}
    const pts=K.role==='light'?K31_LP:K31_SP;
    if(w3Path(h,pts,0.25,0.9)){w3Lit(h,K.role==='light');const b=pts[pts.length-1];cmpGoto(h,b[0],b[1],0.15);}}},
  // светомосток к воротам сада: фонари зажигаются, когда чаши заняты — идти можно с пером и без
  {id:'gate',done:()=>active(1).pos.z<-126,run:h=>{k31();if(h.pos.z>-100)return 'follow';w3Path(h,K31_GATE,0.5,0.9);}},
  // тёмные аллеи: бот с горящим пером — «тень» становится настоящей, мотылёк раскрывается, когда горят оба пера рядом; бьёт общий бой
  {id:'alleys',first:true,done:()=>!!W.flags.cleared,run:(h,hh)=>{k31();const F=W.flags;if(!F.fight||h.pos.z>-124)return 'follow';w3Lit(h,true);
    const E=W.enemies.filter(e=>e.alive&&e.kind==='ten'&&e.state!=='dying'&&e.state!=='spawn');if(!E.length||E.some(e=>e.state!=='idle'||e.tgt))return 'follow';   // кто-то уже дерётся — общий бой
    let t=null,bd=99;for(const e of E){const d=hd(e.pos,h.pos);if(d<bd){bd=d;t=e;}}
    if(t&&Math.abs(h.pos.x)>1.2&&Math.abs(t.pos.x)>1.2&&(h.pos.x<0)!==(t.pos.x<0)&&h.pos.z<-127&&h.pos.z>-149&&t.pos.z<-127&&t.pos.z>-149){   // по другую сторону центральной изгороди — в обход её концом
      const dz=h.pos.z<-138?-148.4:-127.8;if(Math.abs(h.pos.z-dz)>0.8)cmpGoto(h,h.pos.x,dz,0.5);else cmpGoto(h,t.pos.x,dz,0.5);return;}
    if(t&&t.pos.z<-136.5&&h.pos.z>-136){cmpGoto(h,t.pos.x<0?-3:3,-135.5,0.5);return;}                       // за поперечной изгородью — по просвету рядом с центральной (x=±3)
    if(t&&bd>6){cmpGoto(h,t.pos.x+(h.pos.x<t.pos.x?-3:3),t.pos.z+2.5,0.8);return;}                             // спокойные тени сами не идут — подойти поближе, чтобы заметили
    return 'follow';}},
  // две яблони у выхода: стоит с пером у той, что дальше от человека (или у единственной неоживлённой), пока не оживёт
  {id:'trees',done:()=>!!W.flags.garden,run:(h,hh)=>{k31();if(!W.flags.cleared)return 'follow';
    const T=K31_TR.map(p=>W.trees.find(t=>Math.hypot(t.pos.x-p[0],t.pos.z-p[1])<0.5)).filter(t=>t&&!t.revived);if(!T.length)return;
    const t=T.length===1?T[0]:(hd(hh.pos,T[0].pos)>hd(hh.pos,T[1].pos)?T[0]:T[1]),px=t.pos.x+(t.pos.x<0?1.8:-1.8);
    if(hd(h.pos,{x:px,z:t.pos.z})>0.7){cmpGoto(h,px,t.pos.z,0.4);return;}w3Lit(h,true);}},
  // светомосток в глубь сада (горит, пока рядом чьё-то перо)
  {id:'garden',done:()=>active(1).pos.z<-167,run:h=>{k31();if(!W.flags.garden||h.pos.z>-148)return 'follow';w3Path(h,K31_GB,0.5,0.9);}},
  // Дед-Садовник: ролик, когда кто-то из героев зашёл на поляну; яблочко с ближней яблони — ему (помолодеет, ворота настежь)
  {id:'gardener',done:()=>!!W.flags.young,run:h=>{k31();const F=W.flags;if(!F.garden||h.pos.z>-167)return 'follow';
    if(!F.metGardener){cmpGoto(h,0,-181,0.6);return;}if(F.stage==='gard'||F.stage==='young')return;
    if(!k31Fetch(h,k31Tree(-6,-183)))return;cmpGoto(h,2.6,-188.4,0.4);}},
  // трухлявый мост: яблочко от яблони у моста — к мосту (мост помолодеет)
  {id:'bridge',done:()=>!!W.flags.bridge,run:h=>{k31();const F=W.flags;if(!F.young||F.stage==='young')return 'follow';
    if(!k31Fetch(h,k31Tree(-4.6,-201)))return;cmpGoto(h,0,-203.6,0.4);}},
  // передай яблочко: см. выше; состояние — K.rl: 0 яблочко у A · 1 зов B · 2 B на островок · 3 A бросает B · 4 A на дальний берег · 5 B бросает A · 6 A к дубу
  {id:'pass',done:()=>!!W.flags.oak,run:(h,hh)=>{const K=k31(),F=W.flags;if(!F.bridge||F.oak||h.pos.z>-226)return 'follow';
    if(K.rl==null){K.rl=0;K.A=h.kind;K.rt=G.time;}
    const A=HERO[K.A];const Bh=HERO[K.A==='pelageya'?'yosha':'pelageya'];
    const sw=k=>cmpWant(k);const quiet=q=>{if(q&&q!==h)q.following=false;};quiet(A);quiet(Bh);
    if(K.rl===0){if(!sw(K.A))return;if(!k31Fetch(h,k31Tree(-4.6,-240)))return;w3Lit(h,false);K.rl=1;K.rt=G.time;return;}
    if(K.rl===1){if(!sw(K.A))return;cmpGoto(h,0,-246.4,0.4);if(hd(Bh.pos,h.pos)>8&&G.time-K.rt<25){Bh.following=true;cmpCall();return;}K.rl=2;return;}
    if(K.rl===2){if(!sw(Bh.kind))return;w3Lit(h,false);if(w3Path(h,K31_B1,0.3,0.9)){cmpGoto(h,-1.0,-254.5,0.2);K.rl=3;K.rt=G.time;}return;}
    if(K.rl===3){if(!sw(K.A))return;if(hd(A.pos,{x:0,z:-246.4})>0.7){cmpGoto(h,0,-246.4,0.3);return;}
      if(Bh.apple31){K.rl=4;return;}h.face=Math.PI;if(!(K.t>G.time-1.2)){K.t=G.time;cmpTap('attack');}return;}
    if(K.rl===4){if(!sw(K.A))return;w3Lit(h,false);if(w3Path(h,K31_A2,0.3,0.9)){h.face=0;K.rl=5;K.rt=G.time;}return;}
    if(K.rl===5){if(!sw(Bh.kind))return;if(A.apple31){K.rl=6;return;}h.face=Math.PI;if(!(K.t>G.time-1.2)){K.t=G.time;cmpTap('attack');}return;}
    if(K.rl===6){if(!sw(K.A))return;cmpGoto(h,0,-273.2,0.4);}}},
  // спящая стража: перо погашено (свет будит), струны — прыжком (Йоша проходит под ними)
  {id:'guards',done:()=>active(1).pos.z<-358,run:h=>{const K=k31(),F=W.flags;if(!F.oak||h.pos.z>-282)return 'follow';
    if(h.lit){w3Lit(h,false);return;}
    for(const sz of K31_STR){const d=h.pos.z-sz;if(h.kind!=='yosha'&&h.grounded&&d>0.5&&d<1.5&&Math.abs(h.pos.x)<4.8){k31Tap(K,'jt',0.5,'jump');break;}}
    cmpGoto(h,0,-360.5,0.5);}},
  // старые ступени: яблочко от яблони у ступеней — ступеням; наверх, на террасу
  {id:'steps',done:()=>!!W.flags.steps&&active(1).pos.y>2.6,run:h=>{const F=W.flags;if(h.pos.z>-356)return 'follow';
    if(!F.steps){if(!k31Fetch(h,k31Tree(-3.4,-359.5)))return;cmpGoto(h,0,-361.2,0.4);return;}
    const K=k31();if(!K.st)K.st=G.time;if(G.time-K.st<1.8)return;cmpGoto(h,0,-375,0.5);}},
  // тени-воришки: с пером; если человек со светом рядом с тенью — встаёт по другую сторону от неё (в клещи), иначе гонит сама
  {id:'thieves',done:()=>!!W.flags.thieves,run:(h,hh)=>{k31();const F=W.flags;if(h.pos.y<2.6||h.pos.z>-368)return 'follow';
    w3Lit(h,true);if(!F.thiefRun){cmpGoto(h,0,-376,0.5);return;}
    const ts=(W.thieves31||[]).filter(t=>!t.caught);if(!ts.length)return;let t=null,bd=99;for(const q of ts){const d=hd(q.pos,h.pos);if(d<bd){bd=d;t=q;}}
    if(hh.lit&&hd(hh.pos,t.pos)<9&&hd(hh.pos,t.pos)>0.5){const dx=t.pos.x-hh.pos.x,dz=t.pos.z-hh.pos.z,d=Math.hypot(dx,dz)||1;k31Go(h,t.pos.x+dx/d*2.2,t.pos.z+dz/d*2.2,0.3);return;}
    k31Go(h,t.pos.x,t.pos.z,0.2);}},
  // светомосток к колодцу живой воды (горит, пока рядом чьё-то перо)
  {id:'arena',done:()=>!!W.flags.boss||active(1).pos.z<-444,run:h=>{k31();const F=W.flags;if(!F.thieves||h.pos.y<2.6||h.pos.z>-420)return 'follow';w3Path(h,[[0,-433],[0,-441.5],[0,-447]],0.4,0.9);}},
  // Кощеев Ворон, этап 1: бот со светом на своей чаше-солнышке (на той, где нет человека) — обе чаши разом, и Ворон слепнет; упал — бьёт в свете; пике — кувырок
  {id:'boss1',first:true,done:()=>{const V=W.voron31;return !!V&&V.phase>=1.5;},run:(h,hh)=>{const K=k31(),V=W.voron31;if(!V||V.phase!==1||G.cine||!V.e||!V.e.alive)return 'follow';const e=V.e,T=TIMING[players[1].path]||TIMING.mid;
    if(e.dazeT>0||e.state==='broken'){w3Lit(h,true);cmpFight(h,hh,[e],T);return;}
    if(K.bw==null||(hd(hh.pos,{x:K31_BW[K.bw][0],z:K31_BW[K.bw][1]})<1.3&&hd(h.pos,{x:K31_BW[K.bw][0],z:K31_BW[K.bw][1]})>1.3))K.bw=hd(hh.pos,{x:-7,z:-462})>hd(hh.pos,{x:7,z:-462})?0:1;
    if((V.ai==='mark'&&V.tgt===h&&V.t>V.dur-0.5)||(V.ai==='dive'&&V.tgt===h&&V.t<0.3)){cmpAxes(0-h.pos.x,-466-h.pos.z,1);k31Tap(K,'ro',0.7,'roll');return;}
    const b=K31_BW[K.bw];w3Lit(h,true);cmpGoto(h,b[0],b[1],0.2);}},
  // этап 2: яблочки с ближней яблони у арены — в Ворона, когда он замахнулся или открыт; держится подальше от его выпада
  {id:'boss2',first:true,done:()=>{const V=W.voron31;return !!V&&V.phase>=3;},run:(h,hh)=>{const K=k31(),V=W.voron31;if(!V||V.phase!==2||G.cine||!V.e||!V.e.alive)return 'follow';const e=V.e;
    if(!h.apple31){let T=null,bd=1e9;for(const q of K31_BT){const t=k31Tree(q[0],q[1]);if(!t)continue;const d=Math.hypot(h.pos.x-q[0],h.pos.z-q[1]);if(d<bd){bd=d;T=t;}}if(T)k31Fetch(h,T);return;}
    const d=hd(e.pos,h.pos),open=V.ai==='lungeTel'||V.ai==='flapTel'||V.ai==='recover'||e.dazeT>0;
    if(open&&d<=8.2){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);k31Tap(K,'at',0.8,'attack');return;}
    if(V.ai==='lungeTel'&&V.tgt===h&&V.t>V.dur-0.3){cmpAxes(-(e.pos.z-h.pos.z),e.pos.x-h.pos.x,1);k31Tap(K,'ro',0.7,'roll');return;}
    if(d<5.5){cmpGoto(h,h.pos.x+(h.pos.x-e.pos.x),h.pos.z+(h.pos.z-e.pos.z),0.3);return;}
    if(d>7.5)cmpGoto(h,e.pos.x+(h.pos.x-e.pos.x)*6.5/d,e.pos.z+(h.pos.z-e.pos.z)*6.5/d,0.4);}},
  // воронёнок: Царь-яблоко с земли — Жар-птице у колодца; потом звено от неё
  {id:'king',first:true,done:()=>!!W.flags.out,run:h=>{const F=W.flags,V=W.voron31;if(G.cine||!V)return 'follow';
    if(F.stage==='link'){const L=(W.items||[]).find(q=>q.kind==='link'&&!q.taken&&Math.abs(q.pos.z+480.4)<2);if(L)cmpGoto(h,L.pos.x,L.pos.z,0.3);return;}
    if(F.stage!=='king'||F.kingHome)return 'follow';
    const k=W.apples31.list.find(a=>a.king);if(!(h.apple31&&h.apple31.king)){if(k)cmpGoto(h,k.pos.x,k.pos.z,0.3);return;}cmpGoto(h,0,-481.2,0.4);}}
]);
