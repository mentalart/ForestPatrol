//@@
// релиз: утечка видеопамяти при смене уровня. Герои ходят по кругу Лукоморье → 1-2 → 2-1 → 4-1 (пять кругов, каждый раз loadLevel и кадр):
// число геометрий и текстур в рендерере на последнем круге не должно быть больше, чем на втором (первый круг — прогрев кэшей кита; куча JS в
// headless измеряется грубо и не проверяется). Раньше newWorld() только снимал группу уровня со сцены, не освобождая буферы: на каждый заход в хаб оставалось ≈ 1 000
// лишних геометрий, за прохождение — десятки тысяч (docs/29_full_audit.md, 10.1). Заодно: после освобождения уровень рисуется так же
// (число отрисовок не падает — общие геометрии и текстуры кита загружаются заново), в консоли нет ошибок.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.startFrom(ZC.LV('luko'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(10);
window.IDS=['luko','1-2','2-1','4-1'];window.LK=[];window.NN=0;
window.cyc=n=>{for(let i=0;i<n;i++){const k=NN++,id=IDS[k%IDS.length];ZC.loadLevel(ZC.LV(id));ZC.tick(10);U.nocine();ZC.tick(5);ZC.sim(0.05);
  const g=ZC.FIN.gl(),s=ZC.FIN.stats();LK.push({id,round:Math.floor(k/IDS.length),geos:g.geometries,tex:g.textures,calls:s.calls,heap:g.heap});}};
'ok'
//@@
cyc(8)
//@@
cyc(12)
//@@
const R=k=>LK.filter(r=>r.round===k),bad=[],rows=[];
for(const id of IDS){const a=R(1).find(r=>r.id===id),z=R(4).find(r=>r.id===id);
  rows.push(id+': геометрий '+a.geos+'→'+z.geos+', текстур '+a.tex+'→'+z.tex+', отрисовок '+a.calls+'→'+z.calls);
  if(z.geos>a.geos*1.05+20)bad.push(id+' геометрии растут: '+a.geos+' → '+z.geos);
  if(z.tex>a.tex+30)bad.push(id+' текстуры растут: '+a.tex+' → '+z.tex);   // допуск: несколько холстов-вывесок 2-1 и 4-1 живут вне группы уровня (2–3 на заход)
  if(!(z.calls>0)||z.calls<a.calls*0.5)bad.push(id+' после освобождения рисуется меньше: '+a.calls+' → '+z.calls);}
if(window._errs.length)bad.push('ошибки консоли: '+window._errs.slice(0,2).join(' | '));
if(bad.length)throw new Error('FAIL tfin_leak: '+bad.join(' ; ')+' · '+rows.join(' · '));
'tfin_leak ok · '+rows.join(' · ')
