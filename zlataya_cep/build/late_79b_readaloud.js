/* ============================== РЕЛИЗ · МИР 1 ДЛЯ ДЕТЕЙ 7–11 · ЗАДАЧИ ВСЛУХ ============================== */
// Задачи и подсказки в игре — только текст, а озвучены лишь реплики героев. Здесь — очередь чтения и правила («один раз», «Повтори», карточки),
// а сам голос — записи Silero «baya» в late_91d_readvoice.js. Голоса браузера (Web Speech API, в Windows это Microsoft Irina) в игре нет:
// тексту без записи читать нечем — он молчит (озвучить: tools/voice/read_tts.py, см. 09_final06.md).
//  • Новая карточка (задача или подсказка) читается сама, когда простоит на экране 0,7 с и никто не говорит. Каждый текст — один раз за игру:
//    ключ текста без цифр и знаков (счётчик «мусора 3 / 10» не делает задачу новой), по первым 60 буквам. Повторов сама игра не делает.
//  • H на клавиатуре или LB на джойстике — «Повтори»: прочитать всё, что сейчас на экране.
//  • Кнопки в тексте не произносятся (они нарисованы рядом), знаки боя читаются словами: «жёлтый знак», «красный знак».
//  • Включается и выключается в «Настройки → Читать задачи вслух» и на экране «Кто играет?»; работает на пролог и мир 1 (W.kids), а в остальных мирах —
//    по пункту «Читать во всех мирах» (авто / да / нет; авто — если кто-то идёт Ёжиком или Лисёнком).
//  • RA.mock — подмена голоса для ботов (текст уходит в функцию вместо звука). Без неё и без записей (late_91d) читать нечем: RA.can() = false.
const RA=FIN.readAloud={mock:null,q:[],cand:[null,null,null,null,null,null],said:{},gap:0,speaking:false,out:null};
RA.status=()=>RA.mock?'голос: пробный':'нет записанного голоса';
RA.can=()=>kidsRead()&&!!RA.mock;
// вне пролога и мира 1 вслух читает, если «Читать во всех мирах» = да, а при «авто» — когда кто-то идёт Ёжиком или Лисёнком
RA.all=()=>{const v=FIN.set.readAloudAll;return v==null?players.some(p=>p.path==='easy'||p.path==='mid'):!!v;};
RA.allLabel=()=>{const v=FIN.set.readAloudAll;return v==null?'авто':v?'да':'нет';};
RA.cycleAll=d=>{const v=FIN.set.readAloudAll,L=[null,true,false],i=L.indexOf(v==null?null:v);FIN.set.readAloudAll=L[(i+(d<0?2:1))%3];FIN.saveSettings();FIN.applySettings();};
RA.say=function(text,now){if(!text||!RA.mock)return;if(!now)FIN.kids.lv().read++;RA.mock(text);};   // звук — late_91d_readvoice.js
RA.test=()=>{RA.q.length=0;RA.say('Привет! Я буду читать задачи вслух.',true);};
RA.key=t=>String(t).toLowerCase().replace(/[0-9]+/g,'').replace(/[^a-zа-яё ]+/g,' ').replace(/\s+/g,' ').trim().slice(0,60);
// включить и выключить: пауза, настройки, «Кто играет?» — одним способом; выключили — замолчала сразу
RA.toggle=()=>{const S=FIN.set;S.readAloud=!kidsRead();FIN.saveSettings();FIN.applySettings();if(S.readAloud)RA.test();else RA.stop();};
RA.stop=()=>{RA.q.length=0;RA.speaking=false;};
// текст карточки без кнопок: знаки боя — словами, пары «первый / второй» — только первый вариант
function raText(html){if(!html)return '';const d=document.createElement('div');d.innerHTML=html;const b=d.querySelector('.hn-rd')||d.querySelector('.hn-body')||d;   // у задачи есть краткая строка (крупная, ≤ 12 слов) — читаем её, а не весь текст
  b.querySelectorAll('kbd,.pb,.hn-k2,.hn-p2,.hn-v2>i').forEach(e=>e.remove());
  b.querySelectorAll('i.sg').forEach(e=>{const c=e.className,w=/ y\b/.test(c)?'жёлтый знак':/ r\b/.test(c)?'красный знак':/ b\b/.test(c)?'синий знак':'знак';e.replaceWith(' '+w+' ');});
  b.querySelectorAll('br').forEach(e=>e.replaceWith(' '));
  let t=(b.textContent||'').replace(/[◆✦]/g,' ').replace(/\s+/g,' ').replace(/\s+([,.!?:;])/g,'$1').trim();
  if(t.length>170){t=t.slice(0,170);const k=Math.max(t.lastIndexOf('.'),t.lastIndexOf('!'),t.lastIndexOf('?'));t=k>60?t.slice(0,k+1):t.replace(/\s+\S*$/,'');}   // ключ записи (late_91d) — по этому тексту, так что длину не менять
  return t;}
// слова идут через «Повтори»/автоповтор: показанные сейчас карточки (общая, потом личные)
// карточки боссов (подсказка Горыныча, урок 4-Б, табличка Соловья) — тоже карточки слоя: индексы 3–5
function raBoss(){const out=[];[[3,'finBossHint','.fh-title,.fh-text'],[4,'finTut','.ft-head,.ft-text'],[5,'solsign','']].forEach(([i,id,q])=>{const e=$(id);if(!e||e.classList.contains('hn-gone')||!(e.classList.contains('on')||(id==='solsign'&&e.style.display==='block')))return;
    const d=e.cloneNode(true);d.querySelectorAll('.ft-tag,.ft-ico,.ss-ico,.ft-skip,kbd,.pb,.fh-keys,.ft-keys').forEach(x=>x.remove());
    const t=(q?[...d.querySelectorAll(q)].map(x=>x.textContent).join('. '):d.textContent).replace(/[◆✦✓]/g,' ').replace(/\s+/g,' ').replace(/\s+([,.!?:;])/g,'$1').replace(/([.!?])\./g,'$1').trim();if(t)out.push({i,t});});return out;}
// урок 4-Б идёт в ролике (G.cine) — его карточку читаем и тогда
const raTut=()=>{const e=$('finTut');return !!(e&&e.classList.contains('on'));};
function raCards(){const out=[];if(typeof HN==='undefined')return out;for(const i of[2,0,1]){if(!HN.shown[i])continue;if(G.solo&&i<2&&i!==G.soloPi)continue;const t=raText(HN.html[i]);if(t)out.push({i,t});}return out.concat(raBoss());}
RA.cards=raCards;RA.text=raText;   // для ботов и сбора текстов озвучки (tools/voice/harvest_read.js)
function raTick(){
  const live=W&&(W.kids||RA.all())&&G.state==='play'&&(!G.cine||raTut())&&!G.trans&&!G.ui&&RA.can();
  if(!live){if(RA.q.length||RA.speaking){RA.stop();}for(let i=0;i<6;i++)RA.cand[i]=null;return;}
  const now=performance.now(),cards=raCards(),busy=FIN.voxDuck<1||(typeof subT!=='undefined'&&subT>0.1);
  // «Повтори»
  if(tap(0,'help')||tap(1,'help')){FIN.kids.lv().help++;RA.q.length=0;RA.gap=0;const L=cards.slice();if(L.length){RA.say(L[0].t,true);RA.q.push(...L.slice(1).map(c=>c.t));}return;}
  for(const c of cards){const k=RA.key(c.t),cd=RA.cand[c.i];
    if(!k)continue;if(!cd||cd.k!==k){RA.cand[c.i]={k,t0:now};continue;}
    if(now-cd.t0<700||busy)continue;
    if(!RA.said[k]){RA.said[k]=now;RA.q.push(c.t);}}   // один раз за игру
  for(let i=0;i<6;i++)if(!cards.some(c=>c.i===i))RA.cand[i]=null;
  if(RA.q.length&&!busy&&!RA.speaking&&now>RA.gap){const t=RA.q.shift();RA.say(t,false);RA.gap=now+1500;}}
{const _ui=updateUI;updateUI=function(dt){_ui(dt);try{raTick();}catch(e){console.error('readaloud',e);}};}
// пауза и меню — тишина
{const _sm=showMenu;showMenu=function(mode){if(mode==='pause')RA.stop();_sm(mode);};}
