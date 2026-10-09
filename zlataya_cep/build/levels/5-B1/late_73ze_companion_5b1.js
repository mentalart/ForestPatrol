/* ============================== РЕЛИЗ final06 · 5-Б1 «КОЩЕЙ В ТЕРЕМЕ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Бой «выстоять»: тени-двойники своих героев бот бьёт общим боем (щит, кувырок, удар в Пробой). Во второй части, когда рядом нет врагов, носит золотые слитки клещами в горн у стены
// (знак клещей на весь терем): взять свободный слиток, положить в гнездо у горна — снова искры. Длинный мах с жёлудем — рогатка человека; в третьей части Кощей проходит насквозь — делать нечего.
const K5B={w:null,t:{}};
CMP.k5b=K5B;
const k5b=()=>{if(K5B.w!==W){K5B.w=W;K5B.t={};}return K5B;};
const k5bTap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
const K5B_FORGE={x:-11.0,z:-16};
CMP.route('5-B1',[
  {id:'gold',done:()=>W.flags.stage==='book'||!!W.flags.out,run:(h,hh)=>{const K=k5b(),F=W.flags;if(G.cine||F.stage!=='fight'||!F.phase2||F.phase3)return 'follow';
    h.following=false;const car=heroCarry(h)&&heroCarry(h).gold?heroCarry(h):null;
    if(car){if(hd(h.pos,K5B_FORGE)>0.5||Math.hypot(h.vel.x,h.vel.z)>1.2){cmpGoto(h,K5B_FORGE.x,K5B_FORGE.z,0.25);return;}h.face=-Math.PI/2;k5bTap(K,'put',0.6,'item');return;}
    const g=W.hots.filter(it=>it.gold&&!it.gone&&!it.carrier&&!it.flying).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos))[0];
    if(!g)return 'follow';
    if(hd(g.pos,h.pos)>1.0){cmpGoto(h,g.pos.x,g.pos.z+0.8,0.4);return;}
    h.face=Math.atan2(g.pos.x-h.pos.x,g.pos.z-h.pos.z);k5bTap(K,'take',0.5,'item');}}
]);
