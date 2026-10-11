/* ============================== РЕЛИЗ final06 · 5-2 «ЗАЯЦ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/5-2.js (W.k52: номер круга и кольцо героя). Четыре героя — четыре столба: на каждом круге оба героя Игрока 2 (Пелагея, Йоша) встают на свои кольца —
// активный идёт на своё, потом смена, и второй идёт на своё (оставленный стоит столбом). Когда оба на местах, а оставленный друг человека ещё нет — «Ко мне!»: он сам покатится на кольцо.
// Круг 2: перегрызенная мышью нить — клубок по знаку (RB), мышь рядом — удар. Хамелей перед кругами — общий бой напарника. Подкидка Прошки Потапом в конце — человек.
const K52={w:null,t:{}};
CMP.k52=K52;
const k52=()=>{if(K52.w!==W){K52.w=W;K52.t={};}return K52;};
const k52Tap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
CMP.route('5-2',[
  {id:'hunt',first:true,done:()=>['toss','end'].includes(W.flags.stage)||!!W.flags.out,run:(h,hh)=>{const K=k52(),F=W.flags;if(G.cine||F.stage!=='hunt'||!W.k52)return 'follow';
    const k=Math.min(2,W.k52.circle()),on=x=>hd(x.pos,W.k52.spot(k,x.kind))<0.6;
    const mine=[HERO.pelageya,HERO.yosha],need=mine.filter(x=>!on(x));
    h.following=false;const o=other(1);if(o)o.following=false;
    // круг 2: перегрызенную мышью нить — клубком по знаку (связывает любой из двоих: у каждой нити один конец — герой Игрока 2); мышь рядом — спугнуть ударом
    if(W.k52.TH&&W.k52.TH.some(t=>t.cut)){k52Tap(K,'retie',0.8,'item');return;}
    const ms=(W.k52.MICE||[]).find(q=>q.alive&&hd(q.pos,h.pos)<5);if(ms){if(hd(ms.pos,h.pos)>1.3){cmpGoto(h,ms.pos.x,ms.pos.z,0.8);return;}h.face=Math.atan2(ms.pos.x-h.pos.x,ms.pos.z-h.pos.z);k52Tap(K,'mouse',0.4,'attack');return;}
    if(!need.length){                                                                     // оба на кольцах — стоим столбами; другу, у которого оставленный не на кольце, — «Ко мне!»
      const f0=other(0);if(f0&&!on(f0)&&hd(f0.pos,W.k52.spot(k,f0.kind))>1.0)k52Tap(K,'call',1.5,'call');return;}
    if(need.includes(h)){const p=W.k52.spot(k,h.kind);cmpGoto(h,p.x,p.z,0.15);return;}   // активный идёт на своё кольцо
    cmpWant(need[0].kind);}}                                                              // иначе — смена на того, кто ещё не на месте
]);
