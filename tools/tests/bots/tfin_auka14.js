//@@ wait=1500
// релиз final06: 1-4 «Леший водит» — мини-босс Аука вдвоём (late_99zg_auka14.js). Герои неуязвимы (проверяется ход боя, а не урон).
// 1 «Где я?» — Прошка аукает (клавиша зова): настоящее дупло откликается золотом; подошёл — Аука выскочил; синий «ау-шар» отбит щитом
//   в последний миг — оглушён, бьём; три уголька — Пробой, добивающий — ролик;
// 2 «Подголоски» — Пелагея держит взглядом стены ёлок (не держит — сходятся), Прошка распутывает лешачат; Аука растерялся — бьём;
// 3 «Большое АУ» — от белого кольца прыгаем; надул щёки — оба на пнях-эхо, аукают разом: эхо столкнулось — бьём; ролик-дружба,
//   ворота открыты, выход — уровень пройден.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.setSolo(false);ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);ZC.FIN.warp('arena');ZC.tick(10);
window.A=()=>ZC.W.k14.auka;window.E=()=>A().e;window.INV=()=>{for(const h of Object.values(ZC.HERO))if(h.active)h.iT=Math.max(h.iT||0,0.5);};
U.goto(0,0,-196,5);ZC.tick(5);const c=!!ZC.G.cine;U.nocine();ZC.tick(10);
['cine='+c,'ph='+A().ph,'e='+!!E(),A().ph===1?'intro ok':'FAIL intro']
//@@
// отбить синий «ау-шар» в последний миг, бить открытого (оглушён / Пробой), сойти с красной дорожки кувырком
window.FIGHT=(pi,e,i)=>{const h=U.act(pi),k=U.K[pi];const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.18);if(bo)ZC.press(k.g);
  const L=A().leaf;if(L&&L.st==='tele'&&e.tgt===h&&L.t>L.tele-0.25)ZC.press(k.r);
  const open=e.dazeT>0||e.state==='broken';const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz);
  if(open){if(d>1.9+e.r)U.step(pi,e.pos.x,e.pos.z,1.6+e.r);else{U.rel(pi);h.face=Math.atan2(dx,dz);if(i%10===pi*5)ZC.press(k.a);}}
  else if(d>5.5)U.step(pi,e.pos.x,e.pos.z,5);else U.rel(pi);};
const r=[];let calls=0,pops=0,refl=0,prevS='';const t0=ZC.G.time;
for(let i=0;i<60*150&&A().ph===1;i++){INV();const e=E(),a=A();
  if(e.state==='hide'){const mk=a.HL?null:null;const H=A().dbg().HL,m=H.find(q=>q.markT>0);
    if(!m){if(i%90===0){ZC.press('Digit1');calls++;}U.rel(0);}else U.step(0,m.mx,m.mz,0.6);U.rel(1);}
  else{if(prevS==='hide')pops++;FIGHT(0,e,i);FIGHT(1,e,i);}
  if(e.dazeT>2.5&&prevS!=='daze')refl++;prevS=e.state==='hide'?'hide':e.dazeT>0?'daze':'';ZC.tick(1);}
U.rel(0);U.rel(1);const c=!!ZC.G.cine;U.nocine();ZC.tick(10);
r.push('calls='+calls,'pops='+pops,'dazes='+refl,'t='+(ZC.G.time-t0).toFixed(0),'cine='+c,'ph='+A().ph,A().ph===2?'phase1 ok':'FAIL phase1 emb='+E().embers+' st='+E().state);r
//@@
// этап 2: Пелагея держит взглядом ближнюю стену, Прошка бьёт лешачат; дальнюю держит ведомый Йоша (светлячок оставленного)
const r=[];let meets=0,lastW=0;const t0=ZC.G.time;const D=A().dbg();
for(let i=0;i<60*150&&A().ph===2;i++){INV();const e=E(),a=A(),W2=D.walls;
  // Пелагея — у левой стены, смотрит на неё; Йоша оставлен справа лицом к правой стене
  const pe=U.act(1);if(U.step(1,-4,-203.5,0.6)){U.rel(1);pe.face=-Math.PI/2;}const yo=ZC.HERO.yosha;yo.pos.set(4,0,-203.5);yo.face=Math.PI/2;yo.firefly=25;yo.following=false;
  const al=ZC.W.enemies.filter(q=>q.alive&&q.kind==='leshonok'&&q.state!=='spawn');
  {const w1=ZC.W.enemies.find(q=>q.alive&&q.state==='wind'&&q.tgt===pe);if(w1){const left=w1.wdur-w1.t;if(w1.sig==='red'){if(left<0.2)ZC.press('Slash');}else if(left<0.16&&w1.left===null)ZC.press('Period');}}
  if(e.dazeT>0||e.state==='broken')FIGHT(0,e,i);
  else if(al.length){const h=U.act(0);let t=al[0],bd=99;for(const q of al){const d=Math.hypot(q.pos.x-h.pos.x,q.pos.z-h.pos.z);if(d<bd){bd=d;t=q;}}
    const w=ZC.W.enemies.find(q=>q.alive&&q.state==='wind'&&q.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press('ShiftLeft');}else if(left<0.16&&w.left===null)ZC.press('KeyG');}
    if(bd>2.1)U.step(0,t.pos.x,t.pos.z,1.8);else{U.rel(0);h.face=Math.atan2(t.pos.x-h.pos.x,t.pos.z-h.pos.z);if((t.state==='stagger'&&!t.openHit)||t.state==='broken'||t.dazeT>0){if(i%8===0)ZC.press('KeyF');}}}
  else U.rel(0);
  ZC.tick(1);}
U.rel(0);U.rel(1);const c=!!ZC.G.cine;U.nocine();ZC.tick(10);
r.push('walls x='+D.walls.map(w=>w.x.toFixed(1)).join('/'),'t='+(ZC.G.time-t0).toFixed(0),'cine='+c,'ph='+A().ph,A().ph===3?'phase2 ok':'FAIL phase2 emb='+E().embers+' st='+E().state+' lsh='+A().lsh.length);r
//@@
// этап 3: прыжок от белого кольца; надул щёки — оба на пни-эхо и «Ау!» разом; эхо столкнулось — бьём
const r=[];let jumps=0,winds=0,inter=0,prevW=0;const t0=ZC.G.time;const D=A().dbg();
for(let i=0;i<60*180&&A().ph===3;i++){INV();const e=E(),a=A(),ES=D.ES;
  const R=a.dbg().ring;for(const pi of[0,1]){const h=U.act(pi);if(R&&h.grounded){const d=Math.hypot(h.pos.x-0,h.pos.z+205);if(d-R.r>0.2&&d-R.r<0.9){ZC.press(U.K[pi].j);jumps++;}}}
  if(a.windT>0){if(prevW<=0)winds++;const ok0=U.step(0,ES[0].x,ES[0].z,0.4),ok1=U.step(1,ES[1].x,ES[1].z,0.4);if(ok0&&ok1&&i%20===0){ZC.press('Digit1');ZC.press('Digit0');}}
  else if(e.dazeT>0||e.state==='broken'){if(prevW>0||a.cyc>0.9&&e.dazeT>5)inter++;FIGHT(0,e,i);FIGHT(1,e,i);}
  else{U.rel(0);U.rel(1);}
  prevW=a.windT;ZC.tick(1);}
U.rel(0);U.rel(1);const c=!!ZC.G.cine;ZC.tick(5);U.nocine();ZC.tick(20);
r.push('jumps='+jumps,'winds='+winds,'t='+(ZC.G.time-t0).toFixed(0),'cine='+c,'ph='+A().ph,'cleared='+ZC.W.k14.arena.cleared,A().ph===4&&ZC.W.k14.arena.cleared?'phase3 ok':'FAIL phase3 emb='+E().embers+' st='+E().state);r
//@@
// выход из леса
const u=U.goto(0,0,-220,12,0.5);ZC.tick(20);['out '+u,'out='+!!ZC.W.flags.out,'lv='+ZC.W.levelId,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(ZC.W.flags.out||ZC.W.levelId!=='1-4')&&!_errs.length?'auka14 ok':'FAIL auka14']
