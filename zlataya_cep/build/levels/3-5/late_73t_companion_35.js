/* ============================== РЕЛИЗ final06 · 3-5 «ГУСИ-ЛЕБЕДИ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Уровень — late_99zm_sky35.js (docs/40): туда — стелс, обратно — погоня. Гуси видят только горящее перо: в пятне луча (q.fp, радиус q.fr) зажжённое перо копит «!».
// Туда: лиловые мостки — без света; золотой под гусем — по плану «идти / подождать» (k35Plan: где будет пятно); сторож — ждёт звона колокольчика (Прошка человека),
// потом бегом со светом; щит Потапа — идёт без света в 1,4 м за Потапом (мосток держит его свет); спящий гусь — тихо со светом, проснулся — ждёт;
// яблонька — Йоша поливает; тучка — Йоша поливает облачко и идёт под ней; коса — по лиловой нити (w3Path ждёт, пока чужой свет её гасит); речка — отпивает киселька;
// пропасть — золотой со светом, лиловый без; двор Яги — стоит без света, при «замри» не шевелится; мышку накормили — Йоша к Тишке.
// Обратно: золотые мостки — только между волнами (волна прошла над ботом или до следующей больше 2,6 с), лиловые — без света; речка — Совиный взор Пелагеи;
// яблонька (без угощения) — Йоша поливает; в укрытиях стоит внутри круга, второй герой зовётся следом; вожак — Совиный взор, когда увяз; сам не светит (приманка — человек).
const K35={w:null,pt:0,pg:null,pie:0,ow:0,sk:0};
CMP.k35=K35;
const k35=()=>{if(K35.w!==W){K35.w=W;K35.pt=0;K35.pg=null;K35.pie=0;K35.ow=0;K35.sk=0;}return K35;};
// пятно луча гуся через t секунд
const k35Fp=(q,t)=>{const a=q.a+q.w*t;let x,z,fx,fz;if(q.path){const p=q.path(a);x=p.x;z=p.z;fx=p.fx;fz=p.fz;}else{x=q.cx+Math.cos(a)*q.R;z=q.cz+Math.sin(a)*q.R;fx=-Math.sin(a)*Math.sign(q.w);fz=Math.cos(a)*Math.sign(q.w);}return [x+fx*q.ahead,z+fz*q.ahead];};
// план перехода: 1 — идти, 0 — подождать; время — шагами K35_DT (0,12 с), путь — клетками K35_DS (0,3 м: за шаг до двух клеток = 5 м/с, с запасом к настоящим 6 м/с);
// s от −3,5 м (перо погашено — безопасно) до конца мостка + 2,5 м. Ищет путь, где пятно ни разу не накроет бота (запас 1,1 м); берёт первый шаг такого пути.
// Неподвижные гуси (сторож, висящие, спящий) в план не берутся — у них свои шаги.
const K35_DT=0.12,K35_DS=0.3,K35_S0=-3.5,K35_NT=200;
function k35Plan(h,z0,z1){const dir=Math.sign(z1-z0),L=Math.abs(z1-z0),J=Math.ceil((L+0.9-K35_S0)/K35_DS),gs=W.geese.filter(q=>(!q.on||q.on())&&q.state==='fly'&&q.R>0&&Math.abs(q.cz-(z0+z1)/2)<L/2+30);
  const fps=[];for(let k=0;k<=K35_NT;k++)fps.push(gs.map(q=>k35Fp(q,k*K35_DT)));
  const dang=(j,k)=>{const z=z0+dir*(K35_S0+j*K35_DS),F=fps[k];for(let i=0;i<gs.length;i++)if(Math.hypot(F[i][0],F[i][1]-z)<gs[i].fr+1.1)return true;return false;};
  const safe=(j,k)=>j<=0||!dang(j,k);
  const feas=(j1,k1)=>{if(!safe(j1,k1))return false;if(j1>=J)return true;let cur=new Uint8Array(J+1);cur[j1]=1;
    for(let k=k1;k<K35_NT;k++){const nx=new Uint8Array(J+1);let any=0;for(let j=0;j<=J;j++){if(!cur[j])continue;for(let m=0;m<=2;m++){const t=Math.min(J,j+m);if(nx[t])continue;if(safe(t,k+1)){nx[t]=1;any=1;if(t>=J)return true;}}}if(!any)return false;cur=nx;}return false;};
  const s=(h.pos.z-z0)*dir,j0=clamp(Math.round((s-K35_S0)/K35_DS),0,J),lag=h.lit?1:5;
  let ok=j0<J;for(let k=1;k<lag&&ok;k++)if(dang(j0,k))ok=false;
  if(ok&&feas(Math.min(J,j0+2),lag))return 1;if(feas(j0,1))return 0;
  const clr=(j,k0)=>{let m=99;for(let k=k0;k<k0+4;k++){const z=z0+dir*(K35_S0+j*K35_DS);for(let i=0;i<gs.length;i++)m=Math.min(m,Math.hypot(fps[k][i][0],fps[k][i][1]-z)-gs[i].fr);}return m;};
  return j0>0&&j0<J&&clr(Math.min(J,j0+2),1)>=clr(j0,1)?1:0;}
// светомосток z0→z1 (по x=0) между лучами кружащих гусей: true — прошла
function k35Cross(h,z0,z1){const K=k35(),dir=Math.sign(z1-z0),L=Math.abs(z1-z0),s=(h.pos.z-z0)*dir;
  if(s>L+0.45){w3Lit(h,false);return true;}
  if(s<K35_S0-0.9){w3Lit(h,false);cmpGoto(h,0,z0-dir*3.5,0.4);return false;}
  if(!(K.pt>G.time-0.06)){K.pt=G.time;K.pg=k35Plan(h,z0,z1);}
  if(K.pg===1){w3Lit(h,true);if(h.lit)cmpGoto(h,0,z1+dir*1.4,0.3);}
  else if(s<-1.5)w3Lit(h,false);
  return false;}
// светомосток z0→z1, когда можно (go()): у начала ждёт без света, потом со светом до конца
function k35Dash(h,z0,z1,go){const dir=Math.sign(z1-z0),s=(h.pos.z-z0)*dir,L=Math.abs(z1-z0);
  if(s>L+0.45){w3Lit(h,false);return true;}
  if(s<-0.3&&(!go()||Math.abs(h.pos.x)>0.35)){w3Lit(h,false);cmpGoto(h,0,z0-dir*1.4,0.25);return false;}
  w3Lit(h,true);if(h.lit)cmpGoto(h,0,z1+dir*1.4,0.3);else if(s<-0.3)cmpGoto(h,0,z0-dir*1.4,0.4);return false;}
// обратно: золотой — только между волнами
const k35WaveOk=h=>{const V=W.k35&&W.k35.wave();if(!V)return true;return V.on?V.z>h.pos.z+0.6:V.t>2.6;};
const k35Dark=(h,x,z,stop)=>{w3Lit(h,false);if(!h.lit)cmpGoto(h,x,z,stop||0.4);};
const k35Walk=(h,z0,tz)=>{w3Lit(h,false);if(h.lit)return;if(Math.abs(h.pos.z-z0)<4&&Math.abs(h.pos.x)>0.4&&Math.sign(tz-z0)*(h.pos.z-z0)<0){cmpGoto(h,0,z0-Math.sign(tz-z0)*3.5,0.4);return;}cmpGoto(h,0,tz,0.4);};
const k35Sh=()=>W.shelter35&&W.shelter35();
// сменить героя только с погашенным пером (оставленный со светом — добыча волне)
const k35Want=(h,kind)=>{if(h.kind!==kind&&h.lit){w3Lit(h,false);return false;}return cmpWant(kind);};
// в укрытии: стоять в круге, второго героя позвать следом
const k35Hide=(h,x,z)=>{w3Lit(h,false);cmpGoto(h,x,z,0.35);cmpCall();};
const K35_AROUND=[[2.8,-63.2],[2.8,-70.4],[0,-72.6]];                     // вокруг печки (туда)
const K35_AROUNDB=[[2.8,-70.4],[2.8,-64.6],[1.2,-64.4]];                  // вокруг печки к заслонке (обратно)
const K35_BRAID=[[3.4,-125.6],[3.4,-128.3],[1.4,-130],[3.4,-131.7],[3.4,-135.2]];
const K35_BRAIDB=[[3.4,-133.6],[3.4,-131.7],[1.4,-130],[3.4,-128.3],[3.4,-124.4]];
const K35_ABYSS_B=[['shadow',-188,-181],['light',-179,-173],['shadow',-169,-164],['light',-162,-156]];   // обратно: от двора к речке
// обратно через пропасть любым героем: лиловые — без света, золотые — между волнами; true — на островке речки
function k35AbyssB(h){if(h.pos.z>-151)return true;
  if(h.pos.z<-188.6){k35Dark(h,0,-189.6,0.4);if(Math.abs(h.pos.x)>0.6)return false;}
  for(const[t,z0,z1]of K35_ABYSS_B){if(h.pos.z>z1+0.45)continue;if(t==='light'){if(!k35Dash(h,z0,z1,()=>k35WaveOk(h)))return false;continue;}
    w3Lit(h,false);if(h.lit)return false;cmpGoto(h,0,z1+1.2,0.4);return false;}
  k35Dark(h,0,-150,0.5);return false;}
CMP.route('3-5',[
  // старт: лиловый мосток без света; золотой под гусем — по плану между лучами
  {id:'a',done:()=>active(1).pos.z<-38.6,run:h=>{k35();if(!k35Want(h,'yosha'))return;
    if(h.pos.z>-22.2)k35Walk(h,-8,-22.5);else if(k35Cross(h,-26,-36))k35Dark(h,0,-40);}},
  // сторож: ждать звона (колокольчик звякает Прошка человека), потом бегом со светом
  {id:'watch',done:()=>active(1).pos.z<-58.4,run:h=>{k35();if(!k35Want(h,'yosha'))return;
    if(h.pos.z>-47.6){k35Dark(h,0,-48.6);return;}k35Dash(h,-50,-58,()=>W.k35.watch()>2.2);}},
  // печка: угостила бота — съесть; обойти печку к мостку щита
  {id:'stove',done:()=>!!W.flags.stoveOff&&active(1).pos.z<-72,run:h=>{const K=k35(),F=W.flags;if(!k35Want(h,'yosha'))return;
    if(F.pie&&F.pie.h===h){w3Lit(h,false);if(!(K.pie>G.time-0.5)){K.pie=G.time;cmpTap('skill');}return;}
    w3Lit(h,false);if(!h.lit)cmpPath(h,K35_AROUND,0.4,0.8);}},
  // щит Потапа: без света в 1,4 м за Потапом, пока тот светит из-под щита на мостке
  {id:'shield',done:()=>active(1).pos.z<-83.4,run:h=>{k35();if(!k35Want(h,'yosha'))return;w3Lit(h,false);if(h.lit)return;const P=HERO.potap;
    if(h.pos.z<-81.8){cmpGoto(h,0,-84.6,0.4);return;}
    if(P.lit&&P.pos.z<-72.4&&P.pos.z>-86&&Math.abs(P.pos.x)<1.2){cmpGoto(h,0,Math.min(-72.6,P.pos.z+1.4),0.25);return;}
    cmpGoto(h,0,-72.6,0.4);}},
  // спящий гусь: тихо со светом; проснулся — ждать
  {id:'sleep',done:()=>active(1).pos.z<-96.4,run:h=>{k35();if(!k35Want(h,'yosha'))return;const q=W.geese.find(g=>g.name==='sleep');
    if(h.pos.z>-86.4){k35Dark(h,0,-86.6);return;}k35Dash(h,-88,-96,()=>!q||q.state==='sleep');}},
  // яблонька: Йоша поливает (яблочко срывает человек — подкидка Потапа)
  {id:'tree',done:()=>!!W.flags.appleOff,run:h=>{const K=k35(),F=W.flags;if(!k35Want(h,'yosha'))return;
    if(F.treeAsk1&&!F.treeWater1){w3Lit(h,false);if(cmpGoto(h,0.8,-102.4,0.35)<=0.5){h.face=Math.atan2(-0.8,-1.6);if(!(K.ow>G.time-0.6)){K.ow=G.time;cmpTap('skill');}}return;}
    k35Dark(h,-2,-101.6);}},
  // тучка: полить облачко, потом под тучкой со светом
  {id:'tuch',done:()=>active(1).pos.z<-120.4,run:h=>{const K=k35();if(!k35Want(h,'yosha'))return;
    if(h.pos.z>-111.4&&W.k35.tuch()<2.6){w3Lit(h,false);if(cmpGoto(h,2.4,-109.6,0.35)<=0.5){h.face=Math.atan2(0.4,-1);if(!(K.ow>G.time-0.9)){K.ow=G.time;cmpTap('skill');}}return;}
    k35Dash(h,-112,-120,()=>W.k35.tuch()>2.6);}},
  // коса: по лиловой нити без света
  {id:'braid',done:()=>active(1).pos.z<-134.8,run:h=>{k35();if(!k35Want(h,'yosha'))return;w3Lit(h,false);if(h.lit)return;
    if(h.pos.z>-124.3){cmpGoto(h,3.4,-124.8,0.3);return;}w3Path(h,K35_BRAID,0.4,0.6);}},
  // речка: отпить киселька на бережку, дальше к пропасти
  {id:'river',done:()=>!!W.flags.riverOff&&active(1).pos.z<-148.4,run:h=>{const K=k35(),F=W.flags;if(!k35Want(h,'yosha'))return;
    if(F.riverOffer&&!F.riverOff&&h.pos.z<-140.4&&h.pos.z>-145){w3Lit(h,false);if(!(K.ow>G.time-0.6)){K.ow=G.time;cmpTap('skill');}return;}
    k35Dark(h,0,F.riverOff?-148.6:-142.6);}},
  // пропасть: золотой — со светом между лучами, лиловый — без
  {id:'abyss',done:()=>!!W.flags.yard&&active(1).pos.z<-190,run:h=>{k35();if(G.cine)return 'follow';if(!k35Want(h,'yosha'))return;
    for(const[t,z0,z1]of W.abyss35){if(h.pos.z<z1-0.45)continue;if(t==='light'){if(!k35Cross(h,z0,z1))return;continue;}
      w3Lit(h,false);if(h.lit)return;cmpGoto(h,0,z1-1.2,0.4);return;}
    k35Dark(h,2,-191.4,0.5);}},
  // двор Яги: без света, при «замри» не шевелиться; накормили мышку — Йоша к Тишке
  {id:'yard',done:()=>!!W.flags.back,run:h=>{k35();if(G.cine)return;const F=W.flags,Y=W.k35.yard();if(Y.st==='stir')return;if(!k35Want(h,'yosha'))return;
    if(F.mouseFed){k35Dark(h,4.2,-201.4,0.3);return;}k35Dark(h,4,-193,0.5);}},
  // обратно через пропасть: лиловые — без света, золотые — только между волнами
  {id:'abyssB',done:()=>active(1).pos.z>-151,run:h=>{k35();if(G.cine)return;if(!k35Want(h,'yosha'))return;k35AbyssB(h);}},
  // речка прячет: Совиный взор Пелагеи, потом в круг
  {id:'riverB',done:()=>!!W.flags.riverDone&&!k35Sh(),run:h=>{const K=k35(),F=W.flags;if(G.cine)return;if(!k35Want(h,'pelageya'))return;if(h.pos.z<-151){k35AbyssB(h);return;}
    if(F.riverAsk&&!F.hollow&&h.pos.z<-132){w3Lit(h,false);if(cmpGoto(h,-1.4,-146.4,0.6)<=1.2&&!(K.ow>G.time-0.8)){K.ow=G.time;cmpTap('skill');}return;}
    if(k35Sh()||F.riverAsk)k35Hide(h,0.8,-139);else k35Dark(h,0,-146.4);}},
  // к яблоньке: коса (лиловая нить) и мосток тучки (золотой — между волнами); яблонька: полить, если нужно, и в круг
  {id:'treeB',done:()=>!!W.flags.treeDone&&!k35Sh(),run:h=>{const K=k35(),F=W.flags;if(G.cine)return;
    if(h.pos.z<-134.2){if(!k35Want(h,'yosha'))return;w3Lit(h,false);if(!h.lit)cmpGoto(h,3.4,-133.6,0.4);return;}
    if(h.pos.z<-125){if(!k35Want(h,'yosha'))return;w3Lit(h,false);if(!h.lit)w3Path(h,K35_BRAIDB,0.4,0.6);return;}
    if(h.pos.z<-111.2){if(!k35Want(h,'yosha'))return;if(h.pos.z<-121.2&&Math.hypot(h.pos.x,h.pos.z+121.5)>0.6){k35Dark(h,0,-121.5,0.4);return;}k35Dash(h,-120,-112,()=>k35WaveOk(h));return;}
    if(F.treeAsk&&F.treeRefused&&!F.treeWater2){if(!k35Want(h,'yosha'))return;w3Lit(h,false);if(cmpGoto(h,0.8,-102.4,0.35)<=0.5){h.face=Math.atan2(-0.8,-1.6);if(!(K.ow>G.time-0.6)){K.ow=G.time;cmpTap('skill');}}return;}
    k35Hide(h,-1.6,-103.2);}},
  // к печке: спящий мосток и мосток щита — золотые между волнами; обойти печку к заслонке
  {id:'stoveB',done:()=>W.flags.stage==='boss'||W.flags.stage==='end',run:h=>{k35();if(G.cine)return;if(!k35Want(h,'yosha'))return;
    if(h.pos.z<-87.4&&!k35Dash(h,-96,-88,()=>k35WaveOk(h)))return;
    if(h.pos.z<-73.4&&!k35Dash(h,-82,-74,()=>k35WaveOk(h)))return;
    if(k35Sh()){k35Hide(h,1.2,-64.4);return;}w3Lit(h,false);if(!h.lit)cmpPath(h,K35_AROUNDB,0.35,0.8);}},
  // вожак: сам не светит; увяз — Совиный взор Пелагеи рядом
  {id:'boss',done:()=>W.flags.stage==='end'||!!W.flags.out,run:h=>{const K=k35();if(G.cine)return;const V=W.k35.vz();if(!k35Want(h,'pelageya'))return;w3Lit(h,false);
    if(V.state==='stuck'&&!V.seen){const d=hd(h.pos,V.pos);if(d>8)cmpGoto(h,V.pos.x+(V.pos.x<0?3:-3),V.pos.z+3.5,0.6);else if(!(K.ow>G.time-0.8)&&players[1].owlCd<=0){K.ow=G.time;cmpTap('skill');}return;}
    cmpGoto(h,-7,-72,0.6);}}
]);
