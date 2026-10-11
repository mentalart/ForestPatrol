/* ============================== 4-3 «ЭЙ, УХНЕМ»: ПЕСНЯ ГОЛОСОМ (docs/39, 43.1) ============================== */
// Записи Silero (tools/voice/song43.py, 4-3_s01…s18): запев Потапа звучит в начале такта, хор «Ух-нем!» — на «ух-нем» (это и есть окно нажатия),
// голос героя вступает в хор, когда его игрок попал; три «Рывка» подряд — хор «Раззудись!». Прототип зовёт W.sing(вид, …) — см. proto/levels/4-3.js.
// Записи играют своим источником поверх реплик (не обрывают их и не обрываются ими), громкость — «Голоса». FIN.song43 — счётчик и журнал для ботов.
const SONG43={n:0,log:[]};FIN.song43=SONG43;
{const sp43=(who,text,gain)=>{SONG43.log.push(who+':'+text);if(SONG43.log.length>40)SONG43.log.shift();const e=FIN.vox.find(who,text);if(!e||e.bad||!voxOn())return false;
    const go=b=>{if(!b||G.state!=='play')return;const s=AC.createBufferSource();s.buffer=b;const g=AC.createGain();g.gain.value=gain;s.connect(g);g.connect(voxBus());s.start();SONG43.n++;};
    if(e.buf)go(e.buf);else voxDecode(e).then(go);return true;};
  const sing43=(kind,a)=>{if(kind==='solo')sp43('potap',a,0.95);else if(kind==='chorus')sp43('chorus','Ух-нем!',0.6);
    else if(kind==='hit')for(const k of new Set(a))sp43(k,'Ух-нем!',0.45);else if(kind==='razz')sp43('chorus','Раззудись!',0.9);};
  const _b=build43;build43=function(){_b.apply(this,arguments);W.sing=sing43;};}
