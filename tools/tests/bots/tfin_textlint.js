//@@ wait=900
// Проверка текстов задач (план мира 1, U2): не падает, только предупреждает. По всем уровням, у обоих игроков:
//   · задача длиннее 12 слов без краткой строки (o.short ← tools/playtest/task_short.py) — «WARN длинная»;
//   · карточка задачи молчит: для того, что читает «Читать вслух» (краткая строка, если есть, иначе полный текст), нет записи Байи
//     (FIN.readVoice.find ← voice/read/read.json, озвучка — tools/voice/harvest_read.js + read_tts.py) — «WARN молчит».
// Итог: «textlint: уровней N · длинных без краткой X · молчат Y» и строки WARN (CI выносит их в предупреждения PR — tools/tests/textlint_warn.py).
window.LINT=(()=>{const F=ZC.FIN,R=F.readAloud,RV=F.readVoice,P=ZC.players,warn=[],per={};let nLong=0,nMute=0,nLv=0;
  F.set.readAloud=true;F.set.readAloudAll=true;F.set.vox=0;R.mock=()=>{};
  const plain=h=>String(h==null?'':h).replace(/<br\s*\/?>/g,' ').replace(/<kbd>[\s\S]*?<\/kbd>|<span class="pb [^"]*">[\s\S]*?<\/span>/g,' ').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
  const words=t=>t.split(' ').filter(w=>/[A-Za-zА-Яа-яЁё0-9]/.test(w)).length;
  const ld=id=>{if(ZC.G.state!=='play')ZC.startFrom(ZC.LV(id));else ZC.loadLevel(ZC.LV(id));ZC.G.manual=true;ZC.tick(6);for(let q=0;q<8&&ZC.G.cine;q++){ZC.skip();ZC.tick(3);}};
  for(const id of ZC.LEVELS.map(l=>l.id)){try{ld(id);}catch(e){warn.push('WARN '+id+': не загрузился ('+e.message+')');continue;}
    const W=ZC.W;if(!W||!W.objectives)continue;nLv++;P[0].path='easy';P[1].path='easy';ZC.G.solo=false;const seen=new Set();
    for(let pi=0;pi<2;pi++)(W.objectives[pi]||[]).forEach((o,j)=>{if(!o)return;let full='',sh='';
      try{full=typeof o.text==='function'?o.text():o.text;sh=o.short?o.short(pi):'';}catch(e){return;}
      const t=plain(full);if(!t)return;const k=t+'|'+plain(sh);if(seen.has(k))return;seen.add(k);
      const n=words(t),tag=id+'#'+j+(pi?' p2':'');
      if(n>12&&!sh){nLong++;per[id]=(per[id]||0)+1;warn.push('WARN длинная '+tag+' ('+n+' слов, нет краткой строки): '+t.slice(0,90));}
      let rd='';try{rd=R.text('<div class="hn-rd">'+String(sh||full)+'</div>');}catch(e){}
      if(rd&&!RV.find(rd)){nMute++;warn.push('WARN молчит '+tag+' (нет записи): '+rd.slice(0,90));}});}
  return {sum:'textlint: уровней '+nLv+' · длинных без краткой '+nLong+' · молчат '+nMute,warn,per};})();
LINT.sum
//@@
LINT.warn.length?LINT.warn:['WARN нет']
//@@
// не падает никогда: предупреждения — не ошибки
'textlint ok · '+LINT.sum.replace('textlint: ','')
