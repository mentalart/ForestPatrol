/* ============================== РЕЛИЗ final06 · 4-3 «ЭЙ, УХНЕМ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/4-3.js (W.RINGS, W.LOGS, W.BARGE, W.FIRE, W.FIRESOCK, W.song). Лямка на четверых: герои Игрока 2 встают в свободные кольца
// (оставленный держит кольцо сам), на «ух-нем» бот жмёт «умение» по часам песни; у бревна кольцо проходит только прыгнувшим героем —
// бот прыгает активным и, поменявшись, оставленным. В гору без огня не идёт: активный герой бегает за углём из куч (клещи) и бросает в топку баржи с берега.
const K43={w:null,k:-9,hit:false,jmp:0,swp:0,t:{}};
CMP.k43=K43;
const k43=()=>{if(K43.w!==W){Object.assign(K43,{w:W,k:-9,hit:false,jmp:0,swp:0,t:{}});}return K43;};
const k43Tap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
const K43_C=2.6;
// кольца, где стоит герой Игрока 2
const k43Mine=()=>W.RINGS.filter(r=>r.hero&&r.hero.player===1);
// кольцу вот-вот проходить бревно (за рывок лямка уходит до 4,5 м вперёд)
const k43Log=r=>W.LOGS.some(L=>!L.gone&&r.z>L.z+0.25&&r.z<L.z+4.9);
CMP.route('4-3',[
  {id:'pull',done:()=>['end'].includes(W.flags.stage)||!!W.flags.out,run:(h,hh)=>{const K=k43(),F=W.flags,S=W.song;if(G.cine||!S||!['pull','hill'].includes(F.stage))return 'follow';
    const o=other(1),u=((S.t%K43_C)+K43_C)%K43_C,k=Math.floor(S.t/K43_C);
    if(k!==K.k){K.k=k;K.hit=false;K.jmp=0;K.swp=0;}
    const mine=k43Mine(),inRing=x=>mine.some(r=>r.hero===x),fireOut=W.FIRE.t<9;
    // ---- ухнем по часам песни ----
    if(u>=1.1&&u<1.9&&!K.hit&&mine.length){K.hit=true;cmpTap('skill');}
    // ---- бревно: прыгнул — кольцо пройдёт; оставленному — смена героя (оба нужны: прыжок, смена, прыжок) ----
    const need=x=>mine.some(r=>r.hero===x&&(r.blocked||k43Log(r)));
    if(mine.length){
      const sw=()=>{if(G.time-(CMP.swapT||-9)<0.6)return false;CMP.swapT=G.time;cmpTap('swap');return true;};
      if(u<0.9&&need(o)&&!need(h)&&K.swp<1){if(sw()){K.swp=1;return;}}                               // нужный прыгун — активным
      else if(u>=1.12&&u<1.45&&need(h)&&h.grounded&&K.jmp<1){K.jmp=1;cmpTap('jump');}
      else if(u>=1.3&&u<1.75&&K.jmp===1&&need(o)&&K.swp<2){if(sw())K.swp=2;}
      else if(u>=1.5&&u<1.9&&K.swp===2&&K.jmp===1&&need(h)&&h.grounded){K.jmp=2;cmpTap('jump');}}
    // ---- уголь: активный бегает, пока оставленный держит кольцо; в гору без огня не идёт ----
    const runner=inRing(o)&&F.stage==='hill'&&fireOut;
    const car=h.carry&&!h.carry.gone&&h.carry.kind==='ugol'?h.carry:null;
    if(runner||car){
      const sk=W.FIRESOCK.pos;
      if(car){if(hd(h.pos,sk)>3.3||Math.abs(h.pos.z-sk.z)>1.3){cmpGoto(h,1.05,sk.z,0.25);return;}
        h.face=Math.PI/2;k43Tap(K,'drop',0.6,'item');return;}
      const co=W.hots.filter(i=>i.kind==='ugol'&&!i.gone&&!i.carrier&&!i.socket&&!i.flying&&i.heat>0.05).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos))[0];
      if(co){if(hd(co.pos,h.pos)>1.1){cmpGoto(h,co.pos.x+0.5,co.pos.z,0.35);return;}h.face=Math.atan2(co.pos.x-h.pos.x,co.pos.z-h.pos.z);k43Tap(K,'take',0.5,'item');return;}}
    // ---- кольцо: активный встаёт в свободное, если не занят ----
    if(!inRing(h)&&!(mine.length>=2)){
      const fr=W.RINGS.filter(r=>!r.hero||r.hero===h).sort((a,b)=>hd(a,h.pos)-hd(b,h.pos))[0];
      if(fr){cmpGoto(h,fr.x,fr.z,0.2);return;}}
  }}
]);
