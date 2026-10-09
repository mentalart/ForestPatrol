/* ============================== РЕЛИЗ final06 · МИР 3: ПОМОЩНИКИ НАПАРНИКА-БОТА — ПЕРО (СВЕТ И ТЬМА) И МОСТКИ ============================== */
// Светомостки твёрдые там, где в 5 м от плитки горит чьё-то перо, тенемостки — где света нет (litAt: считаются все четыре героя, а не только ведомые).
// Перо Игрока 2 — клавиша «предмет» активного героя; у оставленного перо горит или не горит, как он его оставил.
// w3Lit(h,want) — привести перо к нужному (раз в 0,4 с), true — уже такое; w3Path(h,pts,stop,adv) — пройти по точкам, меняя перо на стыках мостков: на земле — сразу,
// на плитке — прыжком вперёд и сменой пера в воздухе (стоя на плитке сменить — провалишься); перед тенемостком ждёт, пока чужой свет в 5 м погаснет (не дольше 12 с),
// а с горящим пером — пока друг не сойдёт с тенемостка в 5 м впереди (не дольше 8 с).
const W3C={w:null,tl:0,jt:0,ws:0,hs:0,p:null};
CMP.w3=W3C;                                                                       // состояние помощников — для проверки ботом
const w3c=()=>{if(W3C.w!==W){W3C.w=W;W3C.tl=0;W3C.jt=0;W3C.ws=0;W3C.hs=0;W3C.p=null;}return W3C;};
const w3Lit=(h,want)=>{want=!!want;if(!!h.lit===want)return true;const K=w3c();if(W.abil.pero&&!(K.tl>G.time-0.4)){K.tl=G.time;cmpTap('item');}return false;};
// плитка мостка (включённого), под точкой (x,z), твёрдая она сейчас или нет
const w3TileAt=(x,z)=>{for(const t of W.tiles){if(t.on&&!t.on())continue;const dx=x-t.x,dz=z-t.z,R=t.l+t.w;if(dx*dx+dz*dz>R*R)continue;
  const u=dx*t.sa+dz*t.ca,v=dx*t.ca-dz*t.sa;if(Math.abs(u)<=t.l/2+0.08&&Math.abs(v)<=t.w/2+0.14)return t;}return null;};
// кто-то стоит на тенеплитке в 5,3 м от точки (x,z) — моё перо её погасит
const w3Hurts=(h,x,z)=>HEROES.some(q=>q!==h&&q.groundRef&&q.groundRef.tile&&q.groundRef.type==='shadow'&&hd(q.pos,{x,z})<5.3);
function w3Path(h,pts,stop,adv){const K=w3c();
  if(!K.p||K.p.key!==pts||K.p.kind!==h.kind)K.p={key:pts,kind:h.kind,i:0};const p=K.p;
  while(p.i<pts.length-1&&Math.hypot(pts[p.i][0]-h.pos.x,pts[p.i][1]-h.pos.z)<(adv||0.9))p.i++;
  const last=p.i===pts.length-1,s=last?(stop||0.35):0.5,tx=pts[p.i][0],tz=pts[p.i][1],d=Math.hypot(tx-h.pos.x,tz-h.pos.z);
  if(last&&d<=s){K.ws=0;K.hs=0;return true;}
  const ux=(tx-h.pos.x)/(d||1),uz=(tz-h.pos.z)/(d||1),nx=h.pos.x+ux*1.3,nz=h.pos.z+uz*1.3,ah=w3TileAt(nx,nz),un=h.groundRef&&h.groundRef.tile?h.groundRef:null;
  if(ah){const need=ah.type==='light';
    if(!!h.lit!==need){                                                           // стык: перо надо сменить
      if(!un){w3Lit(h,need);return false;}                                         // на земле — сменить и подождать
      if(!h.grounded){w3Lit(h,need);cmpGoto(h,tx,tz,s);return false;}               // в воздухе — менять
      if(!(K.jt>G.time-0.5)){K.jt=G.time;cmpTap('jump');}cmpGoto(h,tx,tz,s);return false;   // на плитке — прыжок вперёд
    }
    if(!need&&!un&&litAt(ah.x,ah.y,ah.z)){if(!K.ws)K.ws=G.time;if(G.time-K.ws<12)return false;}   // чужой свет гасит тенемосток впереди — ждём
    else K.ws=0;}
  else K.ws=0;
  if(h.lit&&w3Hurts(h,nx,nz)&&!w3Hurts(h,h.pos.x,h.pos.z)){if(!K.hs)K.hs=G.time;if(G.time-K.hs<8)return false;}   // друг на тенемостке впереди — не гасить ему дорогу
  else K.hs=0;
  cmpGoto(h,tx,tz,s);return false;}
