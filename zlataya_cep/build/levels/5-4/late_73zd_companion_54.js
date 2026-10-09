/* ============================== РЕЛИЗ final06 · 5-4 «ЯЙЦО»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/5-4.js (W.S54: песня «Калинка», доли bt, действие act(pi,k), оценка judged). Игрок 2 — правая дорожка: прыжок на каждую золотую плитку в долю, а на жёлтое солнышко
// (припев) — защита в долю; клетка из чёрных ниток — Йоша, ковшик мёртвой воды (смена и «умение» рядом с клеткой). Последние доли — вместе с человеком.
const K54={w:null,t:{}};
CMP.k54=K54;
const k54=()=>{if(K54.w!==W){K54.w=W;K54.t={};}return K54;};
const k54Tap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
CMP.route('5-4',[
  {id:'song',first:true,done:()=>W.flags.stage==='moyo'||!!W.flags.out,run:(h,hh)=>{const K=k54(),F=W.flags,S=W.S54;if(G.cine||!S||S.state!=='play')return 'follow';
    // клетка с Звенышком: Йоша поливает нитки, пока клетка рядом (на ленте справа)
    if(F.cageOn&&!F.freed){if(!cmpWant('yosha'))return;if(h.skillCd<=0)k54Tap(K,'cage',0.7,'skill');}
    // доли: нажать в момент доли (оценка ±0,1 с); прыжок — только с земли
    for(let k=Math.max(0,S.lastK);k<=S.lastK+1&&k<S.NB;k++){const d=S.bt[k]-S.t;
      if(d<0.02&&d>-0.03&&!S.judged[1][k]){const a=S.act(1,k);if(a==='guard')cmpTap('guard');else if(h.grounded||h.coyote>0)cmpTap('jump');}}
  }}
]);
