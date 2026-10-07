//@@
// безопасность: повреждённое хранилище (гардероб, настройки, сохранение) не ломает запуск, звук, «Главы» и «Продолжить»
// гардероб {owned:1,wear:'x'} раньше не давал игре запуститься; нечисловые sfx/mus роняли AudioParam.value; null и не тот тип в сохранении роняли «Продолжить»
localStorage.clear();const S=(k,v)=>localStorage.setItem('zlatayaCep.'+k+'.v1',typeof v==='string'?v:JSON.stringify(v));
S('wardrobe',{owned:1,wear:'x'});S('settings',{sfx:'abc',mus:'x',ts:'<b>'});S('save',{v:1,G:{flags:null,done:5,got:[1],links:'abc'}});'set'
//@@ reload=1
const F=ZC.FIN,bad=[];if(F.set.sfx!==0.8||F.set.mus!==0.7||F.set.ts!==1)bad.push('settings '+JSON.stringify([F.set.sfx,F.set.mus,F.set.ts]));
try{F.chapterList();F.saveSummary(F.readSave());}catch(e){bad.push('menu '+e.message);}
if(bad.length)throw new Error(bad.join('; '));'start ok title='+F.titleOn
//@@ key=Space wait=600
'key'
//@@
if(!ZC.FIN.ac())throw new Error('нет аудиоконтекста');'audio ok'
//@@
const F=ZC.FIN,bad=[];try{F.continueGame();ZC.tick(60);}catch(e){bad.push('continue '+e.message);}
const g=ZC.G;if(!g.flags||typeof g.flags!=='object'||Array.isArray(g.flags)||!g.done||typeof g.links!=='number')bad.push('поля G испорчены');
if(bad.length)throw new Error(bad.join('; '));'continue ok '+ZC.W.levelId
//@@
// сохранение без G — как отсутствующее
localStorage.setItem('zlatayaCep.save.v1','{}');'set'
//@@ reload=1
const F=ZC.FIN;try{F.chapterList();F.saveSummary(F.readSave());}catch(e){throw new Error('menu '+e.message);}
if(F.readSave()!==null)throw new Error('readSave не null');localStorage.clear();'save {} ok'
