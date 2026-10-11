//@@ wait=1500
// релиз final06: 2-Б «Водяной» — аудит перекрытий интерфейса (разбор мира 2, c37): «пропуск × субтитры» и «баннер × карточка задачи».
// Журнал интерфейса PR (late_96_uilog.js) сэмплирует HUD: ролик погони (в ролике жмут прыжок — видна плашка пропуска), ролик у омута, вход в этапы 1–4
// (баннеры этапов поверх карточек задач). Любое касание ≥ 1 % в парах skip×subs и banner×hint* — FAIL. Дважды: 1280×720 и 1920×1080.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.TAP=t=>{if(ZC.G.cine&&t%180===0)ZC.hold('Space',true);if(t%180===12)ZC.hold('Space',false);};
window.AUDIT=()=>{PR.reset();PR.start({perf:false});ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(30);
  let t=0;while(t<60*40){TAP(t);ZC.tick(1);t++;if(!ZC.G.cine&&t>600)break;}ZC.hold('Space',false);ZC.tick(60*8);
  ZC.W.warp2b('boss');t=0;while(t<60*60){TAP(t);ZC.tick(1);t++;if(!ZC.G.cine&&t>300)break;}ZC.hold('Space',false);ZC.tick(60*6);
  for(const w of['boss2','boss3','boss4'])ZC.W.warp2b(w),ZC.tick(60*8);
  PR.stop();const r=PR.report(),seen=Object.keys(PR.hud),bad=Object.keys(r.ovAny||{}).filter(k=>/skip.*subs|subs.*skip|banner.*hint|hint.*banner/.test(k));
  if(!seen.includes('skip')||!seen.includes('subs')||!seen.includes('banner'))throw new Error('не видели плашку пропуска, субтитры или баннер: '+seen.join());
  if(bad.length)throw new Error('перекрытия: '+bad.map(k=>k+' '+r.ovAny[k]+'%').join(', '));
  if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));return 'hud ok '+innerWidth+'x'+innerHeight+' видели: '+seen.join(',');};
'ok'
//@@
AUDIT()
//@@ vp=1920x1080
AUDIT()
