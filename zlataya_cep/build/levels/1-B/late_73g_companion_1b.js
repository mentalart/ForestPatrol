/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: НАПАРНИК-БОТ БЬЁТСЯ ЗА ИГРОКА 2 ============================== */
// Бот за Игрока 2 проходит три этапа боя, как живой игрок:
//   1. «Руки-коряги»: отбить левую (щитом) и увернуться от правой (кувырком) — это общий бой бота; когда рука пробита и легла мостом, бот бежит по ней к плечу и бьёт по макушке;
//   2. «Ищи-свищи»: если струна для двойников ещё не натянута — встаёт перед свободным колышком и бросает клубок; упавшего настоящего двойника находит и бьёт;
//   3. «Хоровод»: бежит по дорожке вокруг Лешего по стрелкам, прыгает перед скакалкой, на «ТРИ!» жмёт удар «Тяни-потяни», потом — Богатырский мах вместе с человеком.
// Положения и состояния — из proto/levels/1-B.js и late_99zb_k1b_hoorovod.js (FIN.k1b.cur.C — центр поляны, FIN.k1b.s3 — состояние хоровода).
const KB={w:null,t:0,path:null,pathOf:null,pv:{},hit:0,pull:-1};
const kb=()=>{if(KB.w!==W){KB.w=W;KB.t=0;KB.path=null;KB.pathOf=null;KB.pv={};KB.hit=0;KB.pull=-1;}return KB;};
const kbWrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;};
CMP.route('1-B',[
  // этап 1: пробитая рука — мост на плечо, оттуда удар по макушке (бой с руками — общий)
  {id:'hands',first:true,done:()=>W.flags.phase>=2,run:(h,hh,dt)=>{kb();if(W.flags.phase!==1)return 'follow';
    if(players[0].downed&&h.pos.y<1)return 'follow';                                         // друг рассыпался клубком — сначала подшить
    const b=W.enemies.find(e=>e.kind==='hand'&&e.state==='broken'&&e.alive);
    if(!b){KB.path=null;KB.pathOf=null;const hn=W.enemies.filter(e=>e.kind==='hand'&&e.alive).sort((a,c)=>hd(a.pos,h.pos)-hd(c.pos,h.pos))[0];
      if(hn&&hd(hn.pos,h.pos)>6.5){cmpGoto(h,hn.pos.x,hn.pos.z,6);return;}return 'follow';}   // руки не нападают, пока не подойдёшь: идёт к ближней, дальше — общий бой   // руки не нападают, пока не подойдёшь: выходит на поляну
    const rp=(W.ramps||[]).slice(-2);if(rp.length<2)return 'follow';
    if(KB.pathOf!==rp[0]){KB.pathOf=rp[0];const r=rp[0],f=rp[1];KB.path=[[r.x0-r.dx*1.6,r.z0-r.dz*1.6]];for(let k=1;k<=8;k++)KB.path.push([r.x0+r.dx*r.len*k/8,r.z0+r.dz*r.len*k/8]);KB.wi=-1;KB.wt=G.time;KB.path.push([f.x0+f.dx*f.len,f.z0+f.dz*f.len]);}   // рампа руки, потом площадка на плече
    const end=KB.path[KB.path.length-1],atEnd=Math.hypot(h.pos.x-end[0],h.pos.z-end[1])<0.5;
    if(!atEnd){cmpPath(h,KB.path,0.3,0.6);
      if(CMP.wp&&CMP.wp.key===KB.path){if(CMP.wp.i!==KB.wi){KB.wi=CMP.wp.i;KB.wt=G.time;}else if(G.time-KB.wt>1.2&&CMP.wp.i<KB.path.length-1){CMP.wp.i++;KB.wt=G.time;}}   // стоит на месте — следующая точка
      if(!(h.pos.y>4.5))return;}   // рампа узкая (0,75 м от оси): точки пути — с малым допуском, входит строго вдоль оси
    h.face=Math.atan2(0-h.pos.x,-24.2-h.pos.z);if(!(KB.t>G.time-0.45)){KB.t=G.time;cmpTap('attack');}}},
  // этап 2: струна на колышках; упавшего настоящего — бить
  {id:'hide',first:true,done:()=>W.flags.phase>=3,run:(h,hh,dt)=>{kb();if(W.flags.phase!==2||!W.doubles||players[0].downed)return 'follow';
    const fr=W.doubles.find(d=>d.state==='fallen'&&d.real);
    if(fr){const d=hd(fr.pos,h.pos);if(d>2.0){cmpGoto(h,fr.pos.x,fr.pos.z,1.8);return;}h.face=Math.atan2(fr.pos.x-h.pos.x,fr.pos.z-h.pos.z);if(!(KB.t>G.time-0.4)){KB.t=G.time;cmpTap('attack');}return;}
    if(W.threads.some(t=>t.string&&!t.sag&&!t.ret))return;                                     // струна уже лежит (своя или друга) — ждёт, пока двойник споткнётся
    const C=FIN.k1b.cur.C,st=W.stakes.find(s=>!s.used&&Math.hypot(s.x-C.x,s.z-C.z)>3);if(!st)return 'follow';
    const sx=C.x+(st.x-C.x)*0.25,sz=C.z+(st.z-C.z)*0.25;
    if(Math.hypot(h.pos.x-sx,h.pos.z-sz)>0.6){cmpGoto(h,sx,sz,0.4);return;}
    h.face=Math.atan2(st.x-h.pos.x,st.z-h.pos.z);if(!(KB.t>G.time-1)){KB.t=G.time;cmpTap('item');}}},
  // этап 3: хоровод — бег по стрелкам, прыжок перед скакалкой, «Тяни-потяни», Богатырский мах
  {id:'hoorovod',first:true,done:()=>!!W.flags.won,run:(h,hh,dt)=>{kb();const S=FIN.k1b&&FIN.k1b.s3;if(W.flags.phase!==3||!S||!S.on||players[0].downed)return 'follow';const C=FIN.k1b.cur.C;
    if(!cmpWant('pelageya'))return;                                                           // Богатырский мах дотягивается только удлинённым ударом Пелагеи (3 м; у Йоши 1,9)
    if(S.st==='run'){const ha=Math.atan2(h.pos.z-C.z,h.pos.x-C.x),ta=ha+0.5,tx=C.x+Math.cos(ta)*6,tz=C.z+Math.sin(ta)*6;cmpAxes(tx-h.pos.x,tz-h.pos.z,1);
      S.ropes.forEach((rp,ri)=>{const dn=kbWrap(-rp.th-ha),p=KB.pv[ri];KB.pv[ri]=dn;
        if(p!=null&&dn>0&&dn<1.3&&p>dn){const tc=dn*dt/(p-dn);if(tc<0.3&&tc>0.03&&h.pos.y<0.05)cmpTap('jump');}});return;}
    KB.pv={};
    // свой пост у Лешего: ближе, если у героя короткий удар (Йоша), чтобы дотянуться до центра
    const dp=S.boss?Math.max(2.6,Math.min(3.2,h.d.range*0.9+(S.boss.r||1)-0.2)):3.2;
    if(S.st==='pull'){cmpGoto(h,C.x-dp,C.z,0.4);if(S.press[1]===null&&S.pt>=2.2)cmpTap('attack');return;}   // «Тяни-потяни»: на свою сторону, на «ТРИ!» — удар
    if(S.st==='mah'&&S.boss){const b=S.boss,d=Math.hypot(h.pos.x-C.x,h.pos.z-C.z);                  // Богатырский мах: по Лешему со своей стороны, вторым — сразу за человеком (окно ≈ 0,4 с)
      if(d>dp+1.2){cmpGoto(h,C.x-dp,C.z,0.4);return;}if(d>dp+0.25)cmpGoto(h,C.x-dp,C.z,0.2);h.face=Math.atan2(C.x-h.pos.x,C.z-h.pos.z);
      const wait=b.state==='broken'&&!(b.finT>0)&&b.t<b.bdur-1.3&&!players[0].downed;
      if(b.state==='broken'&&!wait)cmpTap('attack');return;}
    return 'follow';}},
]);
