/* ============================== РЕЛИЗ final06 · 3-3 «СИРИН И АЛКОНОСТ»: НАПАРНИК-БОТ ПОЁТ ПАРТИЮ ИГРОКА 2 ============================== */
// Гусельный уровень: перья вспыхивают в долю (W.song: bt — время долей, ev(pi,k) — что играть Игроку 2 в долю k: jump / hold / high / guard / ничего).
// Бот жмёт прыжок (или щит в грозу) за кадр до доли — в окно попадания (LADWIN: 0,06…0,15 с) всегда; протяжную ноту держит прыжком до конца ленты; эхо — по ghost-плиткам.
// Человек (Игрок 1) играет свою партию сам; дорожки, хоровод и перекрёстки идут сами. Остальное (ролики, финал) — как у человека.
const K33={w:null,d:{}};
CMP.k33=K33;
const k33=()=>{if(K33.w!==W){K33.w=W;K33.d={};}return K33;};
CMP.route('3-3',[
  {id:'song',done:()=>!!W.flags.out,run:()=>{const K=k33(),S=W.song;if(!S)return 'follow';if(S.state!=='play')return;
    for(let k=Math.max(0,S.lastK-1);k<Math.min(S.NB,S.lastK+3);k++){const e=S.ev(1,k);if(!e||K.d[k])continue;
      const dk=S.bt[k]-S.t;if(dk>0.017)break;if(dk<-0.2){K.d[k]=1;continue;}K.d[k]=1;
      if(e==='guard'){if(!S.jg[1][k])cmpTap('guard');}else if(!S.judged[1][k])cmpTap('jump');}
    const H=S.hold[1];if(H&&S.t<H.end+0.02)cmpKey('jump',true);}}   // протяжная нота: держит до конца ленты
]);
