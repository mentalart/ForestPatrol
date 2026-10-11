//@@
// мир 4: задачи по одному действию — не длиннее 12 слов (docs/39, P0.2); подсказки мест — не длиннее 20 слов.
// Слова — как в tools/playtest/task_short.py: без меток и знаков; кнопка (<kbd>) — одно слово.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
const plain=t=>String(t).replace(/<br\s*\/?>/g,' ').replace(/<kbd>[^<]*<\/kbd>/g,' КНОПКА ').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const words=t=>plain(t).split(' ').filter(w=>/[A-Za-zА-Яа-яЁё0-9]/.test(w));
const bad=[],rep=[];
for(const id of['4-1','4-2','4-3','4-4','4-5','4-B']){ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(10);const W=ZC.W;
  for(const pi of[0,1])W.objectives[pi].forEach((o,i)=>{const t=typeof o.text==='function'?o.text():o.text;const n=words(t).length;rep.push(id+'/'+pi+'#'+i+':'+n);if(n>12)bad.push(id+'/'+pi+'#'+i+' ['+n+'] '+plain(t));});
  const H=ZC.HERO;for(const z of W.tipZones){for(const pi of[0,1]){let t='';try{t=z.text(pi,ZC.players[pi].heroes[0]);}catch(e){continue;}const n=words(t).length;if(n>20)bad.push(id+' зона ['+n+'] '+plain(t));}}}
window.W4T={bad,rep};'tasks '+rep.length
//@@
(W4T.bad.length||_errs.length)?'FAIL tfin_w4tasks '+W4T.bad.join(' || ')+' errs='+_errs.join(' | '):'tfin_w4tasks ok '+W4T.rep.length
