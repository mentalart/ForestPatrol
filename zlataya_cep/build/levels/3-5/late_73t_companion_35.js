/* ============================== РЕЛИЗ final06 · 3-5 «ГУСИ-ЛЕБЕДИ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Гуси видят только горящее перо: в пятне луча (q.fp, радиус q.fr) зажжённое перо — гусь хватает. Тенемостки проходит с погашенным пером, на светомосток зажигает на переход:
// считает, где будут пятна лучей (гусь ходит по кругу q.cx,q.cz,q.R с угловой скоростью q.w), и идёт по мостку по плану «идти / подождать» — так, чтобы пятно не накрыло её (k35Plan).
// Йоша: Тишка на спину (подошла к гнезду), пирожок у печки (первой пришла — берёт угощение, не отказывается), яблонька (поливает); Пелагея: Совиный взор у речки; в укрытиях стоит внутри круга.
// Положения — из proto/levels/3-5.js: гнездо (0,-45), печка (0,-65), яблонька (0,-104), речка (0,-139), пропасть −152…−188.
const K35={w:null,sh1:0,pt:0,pg:null,pie:0,ow:0,wt:0};
CMP.k35=K35;
const k35=()=>{if(K35.w!==W){K35.w=W;K35.sh1=0;K35.pt=0;K35.pg=null;K35.pie=0;K35.ow=0;K35.wt=0;}return K35;};
// пятно луча гуся через t секунд
const k35Fp=(q,t)=>{const a=q.a+q.w*t;let x,z,fx,fz;if(q.path){const p=q.path(a);x=p.x;z=p.z;fx=p.fx;fz=p.fz;}else{x=q.cx+Math.cos(a)*q.R;z=q.cz+Math.sin(a)*q.R;fx=-Math.sin(a)*Math.sign(q.w);fz=Math.cos(a)*Math.sign(q.w);}return [x+fx*q.ahead,z+fz*q.ahead];};
// план перехода: 1 — идти, 0 — подождать; время — шагами K35_DT (0,12 с), путь — клетками K35_DS (0,3 м: за шаг до двух клеток вперёд = 5 м/с — чуть медленнее настоящих 6 м/с, чтобы был запас);
// s от −3,5 м (там перо погашено — безопасно) до конца мостка + 2,5 м. Ищет путь, на котором пятно ни разу не накроет бота (запас 1,1 м); берёт первый шаг такого пути
const K35_DT=0.12,K35_DS=0.3,K35_S0=-3.5,K35_NT=200;
function k35Plan(h,z0,z1){const dir=Math.sign(z1-z0),L=Math.abs(z1-z0),J=Math.ceil((L+0.9-K35_S0)/K35_DS),gs=W.geese.filter(q=>(!q.on||q.on())&&q.state==='fly'&&Math.abs(q.cz-(z0+z1)/2)<L/2+30);
  const fps=[];for(let k=0;k<=K35_NT;k++)fps.push(gs.map(q=>k35Fp(q,k*K35_DT)));
  const dang=(j,k)=>{const z=z0+dir*(K35_S0+j*K35_DS),F=fps[k];for(let i=0;i<gs.length;i++)if(Math.hypot(F[i][0],F[i][1]-z)<gs[i].fr+1.1)return true;return false;};
  const safe=(j,k)=>j<=0||!dang(j,k);          // в начале (s = −3,5 м) перо погашено — там всегда безопасно
  const feas=(j1,k1)=>{if(!safe(j1,k1))return false;if(j1>=J)return true;let cur=new Uint8Array(J+1);cur[j1]=1;
    for(let k=k1;k<K35_NT;k++){const nx=new Uint8Array(J+1);let any=0;for(let j=0;j<=J;j++){if(!cur[j])continue;for(let m=0;m<=2;m++){const t=Math.min(J,j+m);if(nx[t])continue;if(safe(t,k+1)){nx[t]=1;any=1;if(t>=J)return true;}}}if(!any)return false;cur=nx;}return false;};
  const s=(h.pos.z-z0)*dir,j0=clamp(Math.round((s-K35_S0)/K35_DS),0,J),lag=h.lit?1:5;      // перо ещё не горит — зажигать около 0,5 с, всё это время стоя на месте при свете
  let ok=j0<J;for(let k=1;k<lag&&ok;k++)if(dang(j0,k))ok=false;
  if(ok&&feas(Math.min(J,j0+2),lag))return 1;if(feas(j0,1))return 0;
  // безопасного пути уже нет (поздно): берём тот шаг, после которого пятно дальше всего (на мостке — как правило вперёд)
  const clr=(j,k0)=>{let m=99;for(let k=k0;k<k0+4;k++){const z=z0+dir*(K35_S0+j*K35_DS);for(let i=0;i<gs.length;i++)m=Math.min(m,Math.hypot(fps[k][i][0],fps[k][i][1]-z)-gs[i].fr);}return m;};
  return j0>0&&j0<J&&clr(Math.min(J,j0+2),1)>=clr(j0,1)?1:0;}
// светомосток z0→z1 (по x=0): true — прошла. К началу идёт с погашенным пером, на мостке перо горит; решение «идти / подождать» пересчитывает ~16 раз в секунду
function k35Cross(h,z0,z1){const K=k35(),dir=Math.sign(z1-z0),L=Math.abs(z1-z0),s=(h.pos.z-z0)*dir;
  if(s>L+0.45){w3Lit(h,false);return true;}
  if(s<K35_S0-0.9){w3Lit(h,false);cmpGoto(h,0,z0-dir*3.5,0.4);return false;}
  if(!(K.pt>G.time-0.06)){K.pt=G.time;K.pg=k35Plan(h,z0,z1);}
  if(K.pg===1){w3Lit(h,true);if(h.lit)cmpGoto(h,0,z1+dir*1.4,0.3);}
  else if(s<-1.5)w3Lit(h,false);
  return false;}
// пройти тенемосток / сушу с погашенным пером
const k35Dark=(h,x,z,stop)=>{w3Lit(h,false);if(!h.lit)cmpGoto(h,x,z,stop||0.4);};
// тенемосток с началом z0 (шириной 1,5 м): сначала к точке на его оси за 3,5 м до начала, потом прямо к tz
const k35Walk=(h,z0,tz)=>{w3Lit(h,false);if(h.lit)return;if(h.pos.z>z0+3&&Math.abs(h.pos.x)>0.4){cmpGoto(h,0,z0+3.5,0.4);return;}cmpGoto(h,0,tz,0.4);};
const k35Sh=()=>W.shelter35&&W.shelter35();
const K35_AROUND=[[2.8,-63.2],[2.8,-70.4],[0,-70.6]];                     // вокруг печки (она загораживает проход посередине)
CMP.route('3-5',[
  // старт: Йоша (Тишка поедет у неё на спине); тенемосток — без света; светомосток 1 — по плану между лучами гуся
  {id:'a',done:()=>active(1).pos.z<-37.2,run:h=>{k35();if(!cmpWant('yosha'))return;
    if(h.pos.z>-22.2)k35Walk(h,-8,-22.5);else if(k35Cross(h,-26,-36))k35Dark(h,0,-39);}},
  // гнездо: подойти к Тишке (Йошей) — сцена, погоня
  {id:'nest',done:()=>!!W.flags.chase,run:h=>{k35();if(!cmpWant('yosha'))return;k35Dark(h,0,-43.4);}},
  // печка: пришла первой — берёт пирожок (не отказывается!), в укрытии стоит внутри круга и ждёт гусей
  {id:'stove',done:()=>{const F=W.flags;return !!F.refused||(!!F.ate&&!k35Sh()&&!!K35.sh1);},run:h=>{const K=k35(),F=W.flags;if(k35Sh()&&F.ate)K.sh1=1;if(!cmpWant('yosha'))return;
    if(F.pie&&F.pie.h===h){w3Lit(h,false);if(!(K.pie>G.time-0.5)){K.pie=G.time;cmpTap('skill');}return;}
    k35Walk(h,-50,h.pos.z>-60.6?-60.8:-63.2);}},
  // светомосток 2 (гусь погони) — по плану; обойти печку; дальше тенемосток к яблоньке
  {id:'b',done:()=>active(1).pos.z<-98,run:h=>{k35();if(!cmpWant('yosha'))return;
    if(h.pos.z>-70.2){w3Lit(h,false);if(!h.lit)cmpPath(h,K35_AROUND,0.4,0.8);return;}
    if(h.pos.z>-83.7&&!k35Cross(h,-74,-82))return;
    k35Walk(h,-88,-99);}},
  // яблонька: Йоша поливает (Прошка ест яблочко), все внутрь круга
  {id:'tree',done:()=>!!W.flags.treeDone&&!k35Sh(),run:h=>{const K=k35(),F=W.flags;if(!cmpWant('yosha'))return;
    if(F.treeAsk&&!F.treeWater&&hd(h.pos,{x:0,z:-104})<3){w3Lit(h,false);if(!(K.ow>G.time-0.6)){K.ow=G.time;cmpTap('skill');}return;}
    k35Dark(h,0,-101.7);}},
  // к речке: Пелагея (Совиный взор); тенемосток, светомосток 3 — по плану
  {id:'river',done:()=>!!W.flags.riverDone&&!k35Sh(),run:h=>{const K=k35(),F=W.flags;if(!cmpWant('pelageya'))return;
    if(h.pos.z>-121.8){k35Walk(h,-112,-122.5);return;}
    if(h.pos.z>-134.7&&!F.riverAsk&&!k35Cross(h,-126,-134))return;
    if(F.riverAsk&&!F.hollow&&h.pos.z<-132){w3Lit(h,false);if(!(K.ow>G.time-0.8)){K.ow=G.time;cmpTap('skill');}return;}
    k35Dark(h,0,-137.5);}},
  // Яга: подойти к краю пропасти
  {id:'yaga',done:()=>!!W.flags.final,run:h=>{k35();if(!k35Sh())k35Dark(h,0,-148.6);}},
  // через пропасть по золотым мосткам между лучами трёх гусей — в конец, там Яга
  {id:'final',done:()=>W.flags.stage==='end'||!!W.flags.out,run:h=>{k35();if(G.cine)return 'follow';
    if(h.pos.z>-188.4&&!k35Cross(h,-152,-188))return;k35Dark(h,0,-192,0.5);}}
]);
