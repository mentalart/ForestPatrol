//@@ wait=1500
// релиз final06: напарник-бот проходит бой 1-Б «Леший-Путаник» за Игрока 2: руки-коряги (отбить, кувырок, мост-рука на плечо, удар по макушке), прятки двойников (струна на колышках,
// бить упавшего настоящего), хоровод (бег по стрелкам, прыжок перед скакалкой, «Тяни-потяни», Богатырский мах вдвоём). Человека (Игрок 1) играет скрипт: в этапах 1–2 стоит в стороне,
// в хороводе бежит свою дорожку, жмёт удар на «ТРИ!» и бьёт мах.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.W=ZC.W;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(60);window.W=ZC.W;CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);window.K=ZC.FIN.k1b;
['phase='+F().phase,'hands='+W.enemies.filter(e=>e.kind==='hand').length,'me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode]
//@@
// этап 1: человек стоит в стороне; бот отбивает левую руку, кувыркается от правой, бежит по мосту-руке к плечу и бьёт по макушке (три трофея)
me().pos.set(0,0,10);me().vel.set(0,0,0);P[0].petals=3;const L=[];let last='',n=0;
for(;n<60*150&&F().phase===1;n++){ZC.tick(1);if(n%60===0){P[0].petals=3;me().pos.set(0,0,10);}const m=CO.mode;if(m!==last){L.push((n/60).toFixed(0)+'s '+m+' head='+F().head);last=m;}}
L.push('head='+F().head,'phase='+F().phase,'petals='+P[1].petals,(F().phase>1||F().head>=3)?'hands ok':'FAIL hands');
L.slice(-8)
//@@
// ролик «Ах так? Нате вам — четыре Лешего!», потом этап 2: двойники; бот натягивает струну на колышках и бьёт упавшего настоящего (два круга)
me().pos.set(0,0,10);me().vel.set(0,0,0);const L=[];let last='',n=0;
for(;n<60*20&&F().phase!==2;n++){if(ZC.G.cine)ZC.skip();ZC.tick(1);}
L.push('phase='+F().phase,'doubles='+W.doubles.length,'stakes='+W.stakes.filter(s=>!s.used).length);
for(n=0;n<60*170&&F().phase===2;n++){ZC.tick(1);if(n%60===0){P[0].petals=3;me().pos.set(0,0,10);}if(ZC.G.cine)ZC.skip();const m=CO.mode;if(m!==last){L.push((n/60).toFixed(0)+'s '+m+' round='+F().round);last=m;}}
L.push('round='+F().round,'phase='+F().phase,(F().phase>=3||F().round>=2)?'hide ok':'FAIL hide');L.slice(-9)
//@@
// этап 3, хоровод: человек бежит свою дорожку, прыгает перед скакалкой, на «ТРИ!» жмёт удар и бьёт мах; бот — свою
for(let i=0;i<20&&F().phase!==3;i++){if(ZC.G.cine)ZC.skip();ZC.tick(30);}for(let i=0;i<10&&ZC.G.cine;i++){ZC.skip();ZC.tick(20);}
const S=K.s3,C=K.cur.C;window.wrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;};
window.hum=function(sec,until){const pv={};let n=0;const pi=0,kk=U.K[0];
  while(n<60*sec&&!(until&&until())){const h=me(),ha=Math.atan2(h.pos.z-C.z,h.pos.x-C.x);
    if(S.st==='run'){const ta=ha+0.5,tx=C.x+Math.cos(ta)*6,tz=C.z+Math.sin(ta)*6,dx=tx-h.pos.x,dz=tz-h.pos.z;ZC.hold(kk.B[0],dx<-0.25);ZC.hold(kk.B[1],dx>0.25);ZC.hold(kk.B[2],dz<-0.25);ZC.hold(kk.B[3],dz>0.25);
      S.ropes.forEach((rp,ri)=>{const dn=wrap(-rp.th-ha),p=pv[ri];pv[ri]=dn;if(p!=null&&dn>0&&dn<1.3&&p>dn){const tc=dn/((p-dn)*60);if(tc<0.28&&tc>0.04&&h.pos.y<0.05)ZC.press(kk.j);}});}
    else{kk.B.forEach(q=>ZC.hold(q,false));if(S.st==='pull'&&S.press[0]===null&&S.pt>=2.3)ZC.press(kk.a);
      if(S.st==='mah'&&S.boss){const b=S.boss;const dist=Math.hypot(h.pos.x-(C.x+2.9),h.pos.z-C.z);   // человек обходит пень по дуге на восточную сторону (бот — на западной)
        if(dist>0.3){const diff=wrap(0-ha),ta=Math.abs(diff)<0.2?0:ha+Math.sign(diff)*Math.min(Math.abs(diff),0.5),rr=Math.abs(diff)<0.2?2.9:4.4,tx=C.x+Math.cos(ta)*rr,tz=C.z+Math.sin(ta)*rr,dx=tx-h.pos.x,dz=tz-h.pos.z;
          ZC.hold(kk.B[0],dx<-0.25);ZC.hold(kk.B[1],dx>0.25);ZC.hold(kk.B[2],dz<-0.25);ZC.hold(kk.B[3],dz>0.25);}
        else{h.face=Math.atan2(C.x-h.pos.x,C.z-h.pos.z);const bt=bot(),ready=Math.hypot(bt.pos.x-(C.x-3.2),bt.pos.z-C.z)<2.2||b.t>2;if(b.state==='broken'&&!(b.finT>0)&&ready&&n%20===0)ZC.press(kk.a);}}}   // человек ждёт напарника на его стороне
    ZC.tick(1);n++;}
  kk.B.forEach(q=>ZC.hold(q,false));return n/60;};
const t=hum(200,()=>F().won||ZC.W.levelId!=='1-B');
['phase='+F().phase,'st='+S.st,'round='+S.round,'laps='+S.laps.join('/'),'pulls='+S.pulls,'hits='+S.hits+' jumps='+S.jumps+' fails='+S.fails,'won='+!!F().won,'t='+t.toFixed(0),'bot='+CO.mode,(F().won?'hoorovod ok':'FAIL hoorovod')]
//@@
for(let i=0;i<12&&ZC.G.cine;i++){ZC.skip();ZC.tick(30);}ZC.tick(120);
['lvl='+ZC.W.levelId,'won='+!!F().won,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(F().won&&!_errs.length)?'1-B ok':'FAIL 1-B']
