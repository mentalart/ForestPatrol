/* ============================== РЕЛИЗ final06 · 5-3 «УТКА»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/5-3.js (W.CLOUDS, W.k53: синие перья и вороны). Полёт на Горыныче: правая голова — Игрока 2. Курс бот берёт у человека (итог — среднее направление: тянем вместе — разгон),
// огонь своей головы — по воронам, щит (B) — на синее перо своей головы за 0,6 секунды до удара (перо летит обратно), на тучах Кощея — «умение» ровно на «три» (оба должны успеть в 0,4 с).
const K53={w:null,t:{}};
CMP.k53=K53;
const k53=()=>{if(K53.w!==W){K53.w=W;K53.t={};}return K53;};
const k53Tap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
CMP.route('5-3',[
  {id:'fly',first:true,done:()=>W.flags.stage==='end'||!!W.flags.out,run:(h,hh)=>{const K=k53(),F=W.flags;if(G.cine||F.stage!=='fly'||!W.k53)return 'follow';
    // курс — как у человека (стик и стрелки Игрока 1)
    for(const a of['left','right','up','down']){const c=BIND[0][a];if(down.has(c)||PADS.down.has(c))cmpKey(a,true);}PADS.axes[1]=PADS.axes[0];
    // синее перо в мою голову: щит в последние 0,6 с (раньше 0,8 нельзя — «рано»)
    for(const fe of W.k53.feathers){if(fe.pi!==1||fe.refl||fe._cm)continue;const left=fe.dur-fe.t;if(left<=0.55&&left>0.05){fe._cm=true;cmpTap('guard');}}
    // огонь по воронам: пока есть живые поблизости
    const cr=W.k53.crows.some(c=>c.alive&&!c.leave&&hd(c.pos,W.GP)<44);if(cr)k53Tap(K,'fire',0.55,'attack');
    // тучи Кощея: «раз-два-три» — на счёте «три» (T3 = 1,4 с)
    for(const cl of W.CLOUDS){if(cl.state==='count'&&cl.press[1]===null&&cl.t>=1.4-0.03&&cl.t<1.8)cmpTap('skill');}
  }}
]);
