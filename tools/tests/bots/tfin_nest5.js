//@@
// матрёшка мира 5: под названием уровня — сундук → заяц → утка → яйцо → игла; пройденные (5-1, 5-2) золотые, текущая (утка) мигает
ZC.startFrom(ZC.LV('5-3'));ZC.G.manual=true;ZC.tick(20);const lv=document.getElementById('level');const n=lv.querySelector('.fin-nest5');const r=['nest='+!!n];
if(n){const cells=[...n.querySelectorAll(':scope > span[style*="flex-direction"]')];r.push('cells='+cells.length,'gold='+cells.filter(c=>/ffd76a/.test(c.innerHTML)).length,'anim='+cells.findIndex(c=>/finNest/.test(c.getAttribute('style'))));}
// карта-рушник: список Острова Буяна — полоска сверху
const mu=document.getElementById('mapui');const keep=[mu.style.display,mu.innerHTML];mu.style.display='flex';mu.innerHTML='<div><h3>Остров Буян</h3><div>5-1 · Сундук на дубе</div></div>';ZC.G.ui='map';
ZC.tick(20);const onMap=!!mu.querySelector('.fin-nest5');ZC.G.ui=null;mu.style.display=keep[0];mu.innerHTML=keep[1];r.push('map='+onMap);
r.push(n&&r[1]==='cells=5'&&r[2]==='gold=2'&&r[3]==='anim=2'?'ok':'FAIL nest');r
