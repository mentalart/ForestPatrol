/* ============================== РЕЛИЗ final06 · 3-4 «ЛЕТУЧИЙ КОРАБЛЬ»: НАПАРНИК-БОТ — ФОНАРЩИЦА ============================== */
// Положения — из proto/levels/3-4.js: корабль W.shipS {x,y,z,roll}, фонарь у мачты (S.x, S.z+0.05). Корабль летит, пока рядом с фонарём (1,8 м) горит чьё-то перо.
// Бот ведёт Пелагею: зажигает перо у фонаря на пристани (старт), весь полёт стоит у фонаря с горящим пером (вороны хватают фонарь только у НЕактивного хранителя —
// активная Пелагея его не отдаёт), бьёт ворон, что подлетели, не отходя от фонаря дальше 1,4 м; после посадки идёт к гнезду. Ветер, мачта и крен от веса Потапа — дело человека (Игрок 1).
const K34={w:null};
CMP.k34=K34;
const k34=()=>{if(K34.w!==W){K34.w=W;}return K34;};
const k34Spot=()=>{const S=W.shipS;return [S.x,S.z+0.9];};   // у фонаря, посередине палубы: порыв отбросит на 1,6 м — за борт не вылетит
CMP.route('3-4',[
  // пристань: к фонарю и зажечь перо — корабль взлетает
  {id:'dock',done:()=>!!W.flags.launched,run:h=>{k34();if(!cmpWant('pelageya'))return;const sp=k34Spot();cmpGoto(h,sp[0],sp[1],0.3);if(hd(h.pos,{x:sp[0],z:sp[1]})<1.0)w3Lit(h,true);}},
  // полёт: хранитель фонаря; вороны — бой у мачты
  {id:'fly',first:true,done:()=>!!W.flags.landed,run:(h,hh)=>{k34();const F=W.flags;if(G.cine||!F.launched)return 'follow';if(!cmpWant('pelageya'))return;w3Lit(h,true);
    const sp=k34Spot(),S=W.shipS,lan={x:S.x,z:S.z+0.05},near=W.enemies.filter(e=>cmpAlive(e)&&hd(e.pos,h.pos)<7);
    if(near.length){cmpFight(h,hh,near,TIMING[players[1].path]||TIMING.mid);if(hd(h.pos,lan)>1.4)cmpGoto(h,sp[0],sp[1],0.2);return;}
    if(hd(h.pos,{x:sp[0],z:sp[1]})>0.35)cmpGoto(h,sp[0],sp[1],0.3);}},
  // посадка: к гнезду Гусей-лебедей
  {id:'land',first:true,done:()=>!!W.flags.out,run:h=>{k34();const F=W.flags;if(G.cine||!F.landed)return 'follow';cmpGoto(h,0,-314,0.5);}}
]);
