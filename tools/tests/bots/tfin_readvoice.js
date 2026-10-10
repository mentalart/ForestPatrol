//@@ wait=900
// релиз final06: «Читать задачи вслух» — записанным голосом (late_91d_readvoice.js ← tools/voice/read_tts.py, голос Silero «baya»; тексты — harvest_read.js).
// Проверки: записи в релизе (READ_LINES), у задач и подсказок-зон всех уровней есть запись (≥ 85%; текст без записи молчит),
// карточки боссов (урок, подсказка боя, табличка Соловья) озвучены (tools/voice/boss_cards_init.js собирает их тексты из ботов);
// голоса браузера (Web Speech, Microsoft Irina) в игре нет: speechSynthesis.speak не зовётся ни разу, в статусе нет «запасного» голоса,
// чтение работает без русского голоса в системе, запись звучит и замолкает по RA.stop, при громкости «Голоса» 0 — тишина, у бота (RA.mock) текст
// уходит в подмену, герой заговорил — чтение замолкает, счётчик «0 / 3» не делает задачу новой (тот же ключ).
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.F=ZC.FIN;window.RV=F.readVoice;window.RA=F.readAloud;
window.WS=0;try{if(window.speechSynthesis){const sp=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=u=>{WS++;return sp(u);};}}catch(e){}   // счётчик обращений к голосу браузера
chk(RV&&RV.n>=600,'записей чтения: '+(RV&&RV.n));
F.vox.audio();F.set.readAloud=true;F.set.readAloudAll=true;F.set.vox=1;RA.mock=null;
chk(RA.can(),'читать можно без русского голоса в системе (есть записи): can='+RA.can()+' ok='+RA.ok);
chk(/Байя/.test(RA.status())&&!/запасн|Irina|Microsoft/i.test(RA.status()),'статус в настройках называет записанный голос, без запасного: '+RA.status());
chk(RA.voice===undefined&&RA.ok===undefined,'голоса браузера в чтении нет (RA.voice, RA.ok)');
chk(RV.key('Бегом по стрелкам (0 из 2). Скакалка — прыжок.')===RV.key('Бегом по стрелкам (1 из 2). Скакалка — прыжок.'),'счётчик не меняет ключ записи');
// покрытие: задачи (краткая формулировка или полный текст) и подсказки-зоны всех уровней
window.ld=id=>{if(ZC.G.state!=='play')ZC.startFrom(ZC.LV(id));else ZC.loadLevel(ZC.LV(id));ZC.G.manual=true;ZC.tick(6);for(let q=0;q<8&&ZC.G.cine;q++){ZC.skip();ZC.tick(3);}};
F.set.readAloud=false;   // пока обходим уровни, настоящее чтение не нужно
let tot=0,hit=0;const miss=[];
for(const id of ZC.LEVELS.map(l=>l.id)){ld(id);const W=ZC.W,P=ZC.players;if(!W)continue;P[0].path='easy';P[1].path='easy';ZC.G.solo=false;
  const test=(t,tag)=>{if(!t)return;tot++;if(RV.find(t))hit++;else miss.push(id+' '+tag+': '+t.slice(0,50));};
  for(let pi=0;pi<2;pi++){(W.objectives[pi]||[]).forEach((o,j)=>{try{if(!o)return;const h=o.short?o.short(pi):(typeof o.text==='function'?o.text():o.text);if(h)test(RA.text('<div class="hn-rd">'+String(h)+'</div>'),'задача '+pi+'.'+j);}catch(e){BAD.push(id+' obj'+pi+'.'+j+': '+e.message);}});
    const hero=P[pi].heroes[P[pi].act];(W.tipZones||[]).forEach((z,zi)=>{try{const h=z.text(pi,hero);if(h)test(RA.text(String(h)),'зона '+zi);}catch(e){BAD.push(id+' zone'+zi+': '+e.message);}});}}
window.COV={tot,hit,miss};F.set.readAloud=true;RA.stop();RA.said={};RA.q.length=0;chk(tot>300&&hit/tot>=0.85,'покрытие записями '+hit+'/'+tot+' ('+Math.round(100*hit/tot)+'%); без записи: '+miss.slice(0,5).join(' | '));
// карточки боссов (урок #finTut, подсказка боя #finBossHint, табличка #solsign) тоже озвучены: текст, который соберёт raBoss, находится в каталоге
const LS=F.lesson,show=(h)=>{const q=RA.cards().filter(c=>c.i>=3);return q.map(c=>c.t);};
LS.show({tag:'Урок',title:'Синяя волна',icon:'',text:'Потап, держи щит — все за ним!'},{},null);const tut=show();
chk(tut.length===1&&!!RV.find(tut[0]),'карточка урока (finTut) озвучена: '+JSON.stringify(tut));LS.show(null);
LS.dom();LS.hint.innerHTML='<div class="fh-title">Тень-круг — уходи!</div><div class="fh-text">Кувырок из круга или щит!</div>';LS.hint.classList.add('on');const hnt=show();
chk(hnt.length===1&&!!RV.find(hnt[0]),'подсказка боя (finBossHint) озвучена: '+JSON.stringify(hnt));LS.hint.classList.remove('on');LS.hint.innerHTML='';
const SS=document.getElementById('solsign')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'solsign'}));SS.textContent='Белая волна — прыг!';SS.style.display='block';const sgn=show();
chk(sgn.length===1&&!!RV.find(sgn[0]),'табличка Соловья (solsign) озвучена: '+JSON.stringify(sgn));SS.style.display='none';SS.textContent='';
chk(!!RV.find('Прошка щёлкает огонёк. Жди — тропка всплывёт сама.'),'задачи 1-2 (туман) озвучены');
// запись звучит: RA.say → декодирование → источник на шине голосов
window.T0='Привет! Я буду читать задачи вслух.';chk(!!RV.find(T0),'в каталоге есть проверочная фраза «Читать задачи вслух»');
window.waitFor=(f,ms)=>new Promise(r=>{const t0=performance.now();(function tick(){if(f()||performance.now()-t0>(ms||4000))return r(f());setTimeout(tick,50);})();});
window.LONG=RV.lines.filter(e=>e.dur>8)[0];chk(!!LONG,'в каталоге есть длинная запись (> 8 с) для проверок «замолкает»');
RA.said={};RA.q.length=0;RA.say(T0,true);chk(RA.speaking===false,'пока запись раскодируется, чтение не занято (RA.speaking=false)');
'cover='+hit+'/'+tot+' n='+RV.n
//@@ wait=100
(async()=>{
const ok=await waitFor(()=>RV.played>=1);chk(ok&&RV.last===RV.find(T0).id,'звучит запись проверочной фразы: played='+RV.played+' last='+RV.last);
await waitFor(()=>RV.cur!==null||RV.played>=1);
await waitFor(()=>RV.cur===null&&RA.speaking===false,6000);chk(RA.speaking===false,'после конца записи чтение свободно (RA.speaking=false)');
// длинная запись: RA.stop глушит её
RA.say(LONG.k,true);const on=await waitFor(()=>!!RV.cur);chk(on&&RV.cur===LONG.id,'длинная запись звучит: cur='+RV.cur);
RA.stop();chk(RV.cur===null&&RA.speaking===false,'RA.stop глушит запись: cur='+RV.cur+' speaking='+RA.speaking);
// громкость «Голоса» 0 — запись не звучит, и голос браузера не подменяет её
const p0=RV.played;F.set.vox=0;RA.say(LONG.k,true);await new Promise(r=>setTimeout(r,500));chk(RV.cur===null&&RV.played===p0,'громкость 0: запись не звучит');RA.stop();F.set.vox=1;
// бот (RA.mock): текст уходит в подмену
window.SAID=[];RA.mock=t=>SAID.push(t);const p1=RV.played;RA.say(LONG.k,true);RA.say('Совсем новый текст без записи, которого нет в каталоге.',true);
chk(SAID.length===2&&RV.played===p1,'при RA.mock текст уходит в подмену, запись не звучит: '+JSON.stringify(SAID).slice(0,120));RA.mock=null;
RA.say('Совсем новый текст без записи, которого нет в каталоге.',true);await new Promise(r=>setTimeout(r,300));chk(RV.cur===null&&RA.speaking===false,'текст без записи молчит и не берёт чужую запись');RA.stop();
// герой заговорил — чтение замолкает
RA.say(LONG.k,true);const on2=await waitFor(()=>!!RV.cur);chk(on2,'чтение звучит перед репликой героя');
const line=F.vox.lines.find(e=>e.who==='proshka'&&e.lv==='p');F.vox.say(line.who,line.text,2);
await waitFor(()=>RV.cur===null,1500);chk(RV.cur===null,'герой заговорил — чтение замолкло: cur='+RV.cur);RA.stop();
chk(WS===0,'голос браузера не звучал ни разу: speechSynthesis.speak вызван '+WS+' раз');
return BAD.length||ERR.length?'FAIL '+BAD.join(' ; ')+' errs='+ERR.slice(0,3).join(' | '):'readvoice ok cover='+COV.hit+'/'+COV.tot+' played='+RV.played;
})()
