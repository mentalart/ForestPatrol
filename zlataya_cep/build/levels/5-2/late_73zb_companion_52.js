/* ============================== РЕЛИЗ final06 · 5-2 «ЗАЯЦ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/5-2.js (W.k52: номер круга и кольцо героя). Четыре героя — четыре столба: на каждом круге оба героя Игрока 2 (Пелагея, Йоша) встают на свои кольца —
// активный идёт на своё, потом смена, и второй идёт на своё (оставленный стоит столбом). Когда оба на местах, а оставленный друг человека ещё нет — «Ко мне!»: он сам покатится на кольцо.
// Подкидка Прошки Потапом в конце — человек.
const K52={w:null,t:{}};
CMP.k52=K52;
const k52=()=>{if(K52.w!==W){K52.w=W;K52.t={};}return K52;};
const k52Tap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
CMP.route('5-2',[
  {id:'hunt',first:true,done:()=>['toss','end'].includes(W.flags.stage)||!!W.flags.out,run:(h,hh)=>{const K=k52(),F=W.flags;if(G.cine||F.stage!=='hunt'||!W.k52)return 'follow';
    const k=Math.min(2,W.k52.circle()),on=x=>hd(x.pos,W.k52.spot(k,x.kind))<0.6;
    const mine=[HERO.pelageya,HERO.yosha],need=mine.filter(x=>!on(x));
    h.following=false;const o=other(1);if(o)o.following=false;
    if(!need.length){                                                                     // оба на кольцах — стоим столбами; другу, у которого оставленный не на кольце, — «Ко мне!»
      const f0=other(0);if(f0&&!on(f0)&&hd(f0.pos,W.k52.spot(k,f0.kind))>1.0)k52Tap(K,'call',1.5,'call');return;}
    if(need.includes(h)){const p=W.k52.spot(k,h.kind);cmpGoto(h,p.x,p.z,0.15);return;}   // активный идёт на своё кольцо
    cmpWant(need[0].kind);}}                                                              // иначе — смена на того, кто ещё не на месте
]);
