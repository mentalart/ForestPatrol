/* ============================== РЕЛИЗ · ЕДИНЫЙ FX-API БОССОВ (FIN.bossfx) ============================== */
// docs/33_boss_standard.md п. 6, docs/34_boss_audit.md X-9 / F-4. Одна точка для вспышек, тряски, hit-stop и телеграфа на боссовых уровнях и мини-боссах.
// Потолки живут только здесь: на всю игру они не распространяются (общий shake() не трогаем — зовут bossfx.shake).
//  • bossfx.k() — множитель «Вспышки» (FIN.flashK: 0 / 0,5 / 1).
//  • bossfx.flash(a,o) — вспышка на весь экран через #flash: яркость a·flashK; при flashK=0 — ничего. o.in/o.out — секунды перехода, o.hold — через сколько
//    погасить (без hold гасит вызывающий: opacity=0). Возвращает фактическую яркость (0 — вспышки нет).
//  • bossfx.light(a,o) — то же для светового импульса сцены (молния): возвращает a·flashK или 0; o.echo — повтор той же молнии (не считается в «3 в секунду»).
//  • bossfx.shake(a,dur,o) — тряска через shake(): a ≤ 0,09, разово (o.once) ≤ 0,15; берёт максимум, не сумму; o.pi — игрок (по умолчанию оба).
//  • bossfx.hitstop(t) — G.hitstop = max(…, min(t, 0,16)).
//  • bossfx.tele(pose,fill,strike,window,o) — нормализованный телеграф {pose,fill,strike,window}: заливка ≥ o.min (0,5), окно ≥ o.win (0).
//  • Потолки на боссовых уровнях и мини-боссах (bossfx.on()) действуют сами: shake() — ≤ 0,09, короткий толчок (≤ 0,5 с) ≤ 0,15; G.hitstop — сеттер с потолком 0,16 с.
//    Множители «Тряска»/«Вспышки» (late_50 / flashK) остаются под обёрткой и продолжают действовать. bossfx.onshake(pi,a,d) — хук ботов: получает итоговую амплитуду.
//  • Частицы (FX.list) на боссовых уровнях и мини-боссах — не больше bossfx.MAXFX = 120 живых (docs/33 п. 6): fxAdd сверх потолка молча пропускает новую, старые доживают.
//  • bossfx.stat — счётчики для ботов: {flash,light,full,dropped,lastA}; bossfx.log — последние вспышки {t,a,full}.
(function(){
  const B=FIN.bossfx={MAXSHAKE:0.09,MAXONCE:0.15,MAXHS:0.16,MAXPS:3,MAXFX:120,FULL_GAP:8,stat:{flash:0,light:0,full:0,dropped:0,lastA:0},log:[],_t:[],_full:-99};
  const now=()=>(typeof G!=='undefined'&&G&&typeof G.time==='number'?G.time:0);
  B.k=()=>{const k=FIN.flashK?FIN.flashK():1;return k==null||isNaN(k)?1:Math.max(0,Math.min(1,k));};
  // можно ли показать ещё одну вспышку: ≤ 3 за секунду (эхо молнии не считается)
  function admit(echo){const t=now();if(B._t.length&&t<B._t[B._t.length-1]-0.5)B._t.length=0;B._t=B._t.filter(x=>t-x<1);if(echo&&B._t.length)return true;if(B._t.length>=B.MAXPS)return false;B._t.push(t);return true;}
  function note(a,full){const t=now();B.log.push({t:+t.toFixed(2),a:+a.toFixed(3),full:!!full});if(B.log.length>60)B.log.shift();B.stat.lastA=a;}
  B.light=(a,o)=>{o=o||{};a=a==null?1:a;if(!(a>0))return 0;const k=B.k();if(k<=0||!admit(o.echo)){if(k>0)B.stat.dropped++;return 0;}B.stat.light++;note(a*k,false);return a*k;};
  B.flash=(a,o)=>{o=o||{};a=a==null?1:a;if(!(a>0))return 0;const k=B.k(),f=typeof $==='function'?$('flash'):null;if(k<=0||!f)return 0;
    if(!admit(false)){B.stat.dropped++;return 0;}
    const t=now();let full=a>=0.5;if(full){if(t-B._full<B.FULL_GAP&&t>=B._full)a=Math.min(a,0.45),full=false;else{B._full=t;B.stat.full++;}}
    const eff=a*k;B.stat.flash++;note(eff,full);
    const soft=document.body.classList.contains('fin-softflash');f.style.transition='opacity '+(o.in!=null?o.in:0.08)+'s';f.style.opacity=Math.min(1,soft?eff/0.5:eff);// .fin-softflash в fin.css уже вдвое гасит #flash — компенсируем, чтобы итог был a·flashK
    if(o.hold!=null)setTimeout(()=>{f.style.transition='opacity '+(o.out!=null?o.out:0.5)+'s';f.style.opacity=0;},o.hold*1000);
    return eff;};
  B.clear=()=>{const f=typeof $==='function'?$('flash'):null;if(f){f.style.opacity=0;}};
  B.shake=(a,dur,o)=>{o=o||{};const m=o.once?B.MAXONCE:B.MAXSHAKE;a=Math.min(a||0,m);if(!(a>0))return 0;shake(o.pi==null?null:o.pi,a,dur==null?0.3:dur);return a;};
  B.hitstop=t=>{t=Math.min(t||0,B.MAXHS);if(t>0&&typeof G!=='undefined')G.hitstop=Math.max(G.hitstop||0,t);return t;};
  B.tele=(pose,fill,strike,win,o)=>{o=o||{};return {pose,fill:Math.max(fill||0,o.min==null?0.5:o.min),strike,window:Math.max(win||0,o.win||0)};};
  // ——— потолки на боссовых уровнях: оборачиваем присваиванием, общий движок не трогаем ———
  const MINI={'1-1':1,'3-1':1,'3-2':1};   // M-4b: Яга 1-1 — hit-stop «взмаха» 0,40 → 0,16
  B.on=()=>{try{const L=LEVELS[G.levelIdx];return !!(L&&(L.boss||MINI[L.id]));}catch(e){return false;}};
  B.capShake=(a,d)=>{if(!(a>0))return a;return Math.min(a,(d==null||d<=0.5)?B.MAXONCE:B.MAXSHAKE);};
  {const _sh=shake;shake=function(pi,amp,dur){if(B.on())amp=B.capShake(amp,dur);if(B.onshake)B.onshake(pi,amp,dur);return _sh.call(this,pi,amp,dur);};}
  {const _fa=fxAdd;fxAdd=function(){if(FX.list.length>=B.MAXFX&&B.on()){B.stat.fxCut=(B.stat.fxCut||0)+1;return null;}return _fa.apply(this,arguments);};}
  B.raw=(pi,a,d)=>shake(pi,a,d);B.shAmp=()=>Math.max(rigs[0].shAmp,rigs[1].shAmp,shared.shAmp);   // для ботов: вызов «как из игры» и текущая амплитуда
  {let hs=G.hitstop||0;Object.defineProperty(G,'hitstop',{configurable:true,enumerable:true,get(){return hs;},set(v){v=+v||0;if(v>B.MAXHS&&B.on()){B.stat.hsCut=(B.stat.hsCut||0)+1;v=B.MAXHS;}hs=v;}});}
})();
