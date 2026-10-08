//@@ wait=1500
// релиз final06: 2-Б «Водяной» — уроки приёмов этапов 1–3 (FIN.lesson, late_99j_k2b.js): ус, тяга, конь, три роли — каждый ≤ 25 с, шаг ≤ 7 слов,
// первый показ — перед первым броском сома, «Показать ещё раз» — L.again(), пропуск одним игроком (2 с).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.L=ZC.FIN.lesson;window.D2=()=>ZC.W.dbg2b();
window.words=t=>t.replace(/<[^>]*>/g,'').trim().split(/\s+/).length;
window.rec=name=>{const st=L.last.steps,T=st.reduce((a,s)=>a+s.dur,0),w=Math.max(...st.map(s=>words(s.card.text)));
  if(T>25)throw new Error(name+': урок '+T.toFixed(1)+' с > 25');if(w>7)throw new Error(name+': шаг '+w+' слов > 7');return name+' шагов='+st.length+' длина='+T.toFixed(1)+'с слов≤'+w;};
// игра идёт без нажатий — урок досматривается сам; вернуть секунды игрового времени
window.runOut=max=>{const t0=ZC.G.time;let n=0;while(L.on&&n<60*(max||40)){ZC.tick(1);n++;}return ZC.G.time-t0;};
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
U.cine(200);ZC.tick(5);ZC.W.warp2b('boss');U.cine(300);ZC.tick(30);'phase='+ZC.W.flags.phase+' lesson='+L.on+' has='+L.has()
//@@
// этап 1: первый урок — «ус» — сам, до первого броска сома; герои показывают, когда никто не нажал
let n=0;while(!L.on&&n<60*25)ZC.tick(1),n++;if(!L.on)throw new Error('урок «ус» не показан до первого броска');
const k=ZC.FIN.k2les.last,r=[k,rec(k)];const S1=D2().S1;r.push('lungeT held='+(S1.lungeT>50));const d=runOut(30);r.push('прошло '+d.toFixed(1)+'с');
if(d>25.5)throw new Error('урок дольше 25 с: '+d.toFixed(1));ZC.tick(90);r.push('сом: '+S1.st);if(S1.st==='circle'&&S1.lungeT>50)throw new Error('бросок сома не возобновился');r
//@@
// «ещё раз» на этапе 1: ус и тяга — по одному, каждый ≤ 25 с; второй показ не мешает бою
U.nocine();ZC.tick(5);const r=[];if(!L.again())throw new Error('L.again не запустил урок этапа 1');
r.push(rec(ZC.FIN.k2les.last));let d=runOut(30);r.push('ус '+d.toFixed(1)+'с');if(d>25.5)throw new Error('ус дольше 25 с');
ZC.tick(20);r.push('следующий: '+ZC.FIN.k2les.last+' on='+L.on);if(ZC.FIN.k2les.last!=='pull')throw new Error('после «уса» не пошла «тяга»');
r.push(rec('pull'));d=runOut(30);r.push('тяга '+d.toFixed(1)+'с');if(d>25.5)throw new Error('тяга дольше 25 с');r
//@@
// этап 2: «играет — конь замер — прыжок — корона»: три шага, ≤ 25 с
U.nocine();ZC.tick(5);ZC.W.warp2b('boss2');ZC.tick(60);const r=['has='+L.has()];if(!L.again())throw new Error('L.again этапа 2 не запустился');
r.push(rec('horse'));const d=runOut(40);r.push('прошло '+d.toFixed(1)+'с');if(d>25.5)throw new Error('урок коня дольше 25 с: '+d.toFixed(1));r
//@@
// этап 3: три роли (бутон, взор, метка): три шага, ≤ 25 с
U.nocine();ZC.tick(5);ZC.W.warp2b('boss3');ZC.tick(60);const r=['has='+L.has()];if(!L.again())throw new Error('L.again этапа 3 не запустился');
r.push(rec('roles'));const d=runOut(40);r.push('прошло '+d.toFixed(1)+'с');if(d>25.5)throw new Error('урок ролей дольше 25 с: '+d.toFixed(1));r
//@@
// пропуск одним игроком: держит прыжок 2 с — урок закончился; повторно доступен
U.nocine();ZC.tick(5);if(!L.again())throw new Error('нет повтора');ZC.tick(70);ZC.hold('KeyM',true);let t=0;while(L.on&&t<60*4)ZC.tick(1),t++;ZC.hold('KeyM',false);
const r=['skip after '+(t/60).toFixed(1)+'s','on='+L.on];if(L.on)throw new Error('пропуск одним не сработал');
ZC.tick(10);r.push('again after='+L.again());ZC.skip();ZC.tick(10);r
//@@
// «Этап сначала» и сигналы не тронуты; ошибок страницы нет
U.nocine();ZC.tick(5);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-B lessons errs=0'
