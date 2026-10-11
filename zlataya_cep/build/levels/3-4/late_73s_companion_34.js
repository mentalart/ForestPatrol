/* ============================== РЕЛИЗ final06 · 3-4 «ЛЕТУЧИЙ КОРАБЛЬ»: НАПАРНИК-БОТ — ФОНАРЩИЦА ============================== */
// Положения — из proto/levels/3-4.js: корабль W.shipS {x,y,z,roll}, фонарь у мачты (S.x, S.z+0.05). Корабль летит, пока рядом с фонарём (1,8 м) горит чьё-то перо.
// Бот ведёт Пелагею: зажигает перо у фонаря на пристани (старт), весь полёт стоит у фонаря с горящим пером (вороны хватают фонарь только у НЕактивного хранителя —
// активная Пелагея его не отдаёт), бьёт ворон, что подлетели, не отходя от фонаря дальше 1,4 м; перед аркой и низкой тучей гасит перо (W.flags.diveNow —
// корабль ныряет), за ними зажигает; камень во тьме (W.flags.owlNeed) — Совиный взор; «держись за мачту» (stage 'brace') — щит у мачты;
// фонарь утащен (W.flags.stolen) — гасит перо и бежит по тенемосткам бить ворону. После посадки идёт к гнезду. Ветер, крен, бочки, рогатка — дело человека (Игрок 1).
const K34={w:null,g:false,ot:-9};
CMP.k34=K34;
const k34=()=>{if(K34.w!==W){K34.w=W;if(K34.g)cmpKey('guard',false);K34.g=false;K34.ot=-9;}return K34;};
const k34Spot=()=>{const S=W.shipS;return [S.x,S.z+0.9];};   // у фонаря, посередине палубы: порыв отбросит на 1,6 м — за борт не вылетит
CMP.route('3-4',[
  // пристань: к фонарю и зажечь перо — корабль взлетает
  {id:'dock',done:()=>!!W.flags.launched,run:h=>{k34();if(!cmpWant('pelageya'))return;const sp=k34Spot();cmpGoto(h,sp[0],sp[1],0.3);if(hd(h.pos,{x:sp[0],z:sp[1]})<1.0)w3Lit(h,true);}},
  // полёт: хранитель фонаря; вороны — бой у мачты
  {id:'fly',first:true,done:()=>!!W.flags.landed,run:(h,hh)=>{const K=k34();const F=W.flags;if(G.cine||!F.launched)return 'follow';if(!cmpWant('pelageya'))return;
    const sp=k34Spot(),S=W.shipS,lan={x:S.x,z:S.z+0.05};
    const brace=F.stage==='brace';if(brace!==!!K.g){K.g=brace;cmpKey('guard',brace);}
    if(F.stolen){const c=F.stolen.c;w3Lit(h,false);if(cmpAlive(c)&&hd(c.pos,h.pos)<3.2){cmpFight(h,hh,[c],TIMING[players[1].path]||TIMING.mid);return;}cmpGoto(h,c.pos.x,c.pos.z,1.2);return;}
    w3Lit(h,!F.diveNow);
    if(F.owlNeed&&players[1].owlCd<=0&&!(K.ot>G.time-1)){K.ot=G.time;cmpTap('skill');}
    const near=W.enemies.filter(e=>cmpAlive(e)&&!e.appr&&hd(e.pos,h.pos)<7);
    if(near.length&&!brace){cmpFight(h,hh,near,TIMING[players[1].path]||TIMING.mid);if(hd(h.pos,lan)>1.4)cmpGoto(h,sp[0],sp[1],0.2);return;}
    if(hd(h.pos,{x:sp[0],z:sp[1]})>0.35)cmpGoto(h,sp[0],sp[1],0.3);}},
  // посадка: к гнезду Гусей-лебедей
  {id:'land',first:true,done:()=>!!W.flags.out,run:h=>{k34();const F=W.flags;if(G.cine||!F.landed)return 'follow';if(K34.g){K34.g=false;cmpKey('guard',false);}cmpGoto(h,0,-340,0.5);}}
]);
