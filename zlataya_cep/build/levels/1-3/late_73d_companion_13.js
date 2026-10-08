/* ============================== РЕЛИЗ final06 · 1-3 «КОЛОБОК»: НАПАРНИК-БОТ БЕЖИТ СВОЮ ДОРОЖКУ ============================== */
// Раннер ведёт героев сам (W.custom): у каждого игрока свои дорожки, струны под бубенец, звери, враги и пляска-финал. Бот за Игрока 2 играет свою дорожку, как живой игрок:
// уходит с дорожки, где впереди пень, дыра или бочка, берёт перья на пути, прыгает на струны в такт, кувыркается под ветками, щитом встречает зверя, лапу и коршуна
// в такт и отвечает ударом, вожака держит вместе с человеком, в пляске-финале прыгает и хлопает щитом в свою долю. Ход — по образцу бота t13v (человек играет Игрока 1 так же).
const K13={bk:-9,fk:-9};
const k13Left=()=>{PADS.axes[1]={x:-1,y:0};},k13Right=()=>{PADS.axes[1]={x:1,y:0};};
function k13Run(h,dt){const S=W.song;if(!S||(S.state!=='play'&&S.state!=='final'))return 'follow';
  const BT=S.BT,w=Math.max(0.03,dt*1.1);
  if(S.state==='final'){                                           // пляска: прыжок или хлопок щитом в свою долю
    if(!S.fin)return;const P=S.FST[S.fs],k=Math.round(S.ft/S.B2),d=S.ft-k*S.B2;
    if(k>=0&&Math.abs(d)<w&&K13.fk!==S.fs*1000+k){K13.fk=S.fs*1000+k;const b=k%P.n,who=P.who(b);if(who===2||who===1)cmpTap(P.act(b)==='C'?'guard':'jump');}
    return;}
  const i=CMP.tick,oz=o=>o.type==='barrel'?o.bz:o.z;
  // какая дорожка свободна: пни, дыры, бочки в ближайших 7 м; перед обвалом — на середину
  const bad=l=>S.obst.some(x=>x.pi===1&&!x.hit&&(x.type==='stump'||x.type==='hole'||x.type==='barrel')&&x.lanes.includes(l)&&oz(x)<h.pos.z+0.8&&h.pos.z-oz(x)<7.5);
  const pit=S.obst.some(x=>x.pi===1&&!x.hit&&x.type==='pit'&&x.z<h.pos.z+0.5&&h.pos.z-x.z<12);
  const pick=S.picks.find(q=>q.pi===1&&!q.taken&&q.z<h.pos.z&&h.pos.z-q.z<9);
  const lane=S.lane[1];let want=lane;
  if(pit)want=1;else if(pick&&!bad(pick.lane))want=pick.lane;
  else if(bad(want)){const c=[1,0,2].filter(l=>!bad(l));if(c.length)want=c.sort((a,b)=>Math.abs(a-lane)-Math.abs(b-lane))[0];}
  if(want!==lane&&i%6===3){if(want<lane)k13Left();else k13Right();}
  // прыжок: коряга впереди, струна в такт; ветка — кувырком
  const lg=S.obst.find(x=>x.pi===1&&!x.hit&&x.type==='log'&&x.z<h.pos.z&&h.pos.z-x.z<1.25);
  const br=S.obst.find(x=>x.pi===1&&!x.hit&&x.type==='branch'&&x.z<h.pos.z&&h.pos.z-x.z<1.6);
  const hole=S.obst.find(x=>x.pi===1&&!x.hit&&x.type==='hole'&&x.lanes.includes(lane)&&x.z<h.pos.z&&h.pos.z-x.z<0.9);
  const s=S.strings.find(q=>q.pi===1&&!q.used&&Math.abs(q.z-h.pos.z)<1.3&&q.lanes.includes(lane));
  const since=S.bph*S.B,onB=since<Math.max(0.0175,dt*1.05)||(1-S.bph)*S.B<0.006;
  if(s&&onB&&h.grounded)cmpTap('jump');
  else if((lg||hole)&&h.grounded&&!s)cmpTap('jump');
  if(br&&h.grounded&&h.rollT<=0)cmpTap('roll');
  const b=S.beasts.find(q=>q.pi===1&&!q.res&&Math.abs(q.z-h.pos.z)<3.6);if(b&&onB&&S.lastK===b.k)cmpTap('guard');
  for(const f of S.foes){if(f.res&&f.res!=='parry')continue;const d=BT[f.k]-S.t;
    if((f.type==='lunge'||f.type==='crow')&&!f.res&&f.locked&&f.lane===lane&&f.pi===1&&d<0.9&&d>0){                     // красный круг или ворона: на другую дорожку
      const c=[0,1,2].filter(l=>l!==f.lane&&!bad(l)),nl=c.length?c.sort((a,b)=>Math.abs(a-lane)-Math.abs(b-lane))[0]:(f.lane===0?1:f.lane-1);
      if(i%3===0){if(nl<lane)k13Left();else k13Right();}}
    if(f.type==='boar'&&!f.res&&f.pi===1&&f.lane===lane&&d<0.22&&d>0.05&&h.grounded)cmpTap('jump');                   // кабан — прыжком
    if(f.type==='storm'&&!f.res&&f.pi===1&&f.lanes.includes(lane)&&h.pos.z-f.z<10&&h.pos.z>f.z){                       // туча — облететь
      const c=[0,1,2].filter(l=>!f.lanes.includes(l));if(i%3===0&&c.length){const nl=c.sort((a,b)=>Math.abs(a-lane)-Math.abs(b-lane))[0];if(nl<lane)k13Left();else k13Right();}}
    if((f.type==='paw'||f.type==='hawk')&&f.pi===1){if(!f.res&&Math.abs(d)<w)cmpTap('guard');                           // лапа, коршун — щит в такт, потом удар
      if(f.res==='parry'&&S.t>BT[f.k]+0.15&&!f.cn){f.cn=1;cmpTap('attack');}}
    if(f.type==='duo'&&!f.res&&Math.abs(d)<w)cmpTap('guard');}                                                       // вожак — щит вдвоём
}
CMP.route('1-3',[{id:'runner',done:()=>false,run:(h,hh,dt)=>k13Run(h,dt)}]);   // до конца уровня; когда раннер молчит (ролик, пауза), бот повторяет за человеком
