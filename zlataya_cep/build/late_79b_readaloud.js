/* ============================== РЕЛИЗ · МИР 1 ДЛЯ ДЕТЕЙ 7–11 · ЗАДАЧИ ВСЛУХ ============================== */
// Задачи и подсказки в игре — только текст, а озвучены лишь реплики героев (в коде 260 задач и 170 подсказок без голоса). Пока нет записей
// (Eleven v4 через Higgsfield, см. 09_final06.md), задачи читает вслух голос браузера (Web Speech API), если в нём есть русский голос.
//  • Новая карточка (задача или подсказка) читается сама, когда простоит на экране 0,7 с и никто не говорит.
//  • Не отвечает ребёнок дольше ~14 с (время без успеха из late_75) — задача читается ещё раз, один раз на задачу.
//  • H на клавиатуре или LB на джойстике — «Повтори»: прочитать всё, что сейчас на экране.
//  • Кнопки в тексте не произносятся (они нарисованы рядом), знаки боя читаются словами: «жёлтый знак», «красный знак».
//  • Включается и выключается в «Настройки → Читать задачи вслух» и на экране «Кто играет?»; работает на пролог и мир 1 (W.kids).
//  • Нет русского голоса — ничего не читает, и в настройках об этом сказано.
const RA=FIN.readAloud={ok:false,voice:null,mock:null,q:[],cand:[null,null,null],said:{},rep:{},gap:0,speaking:false,out:null};
function raVoices(){try{const L=(window.speechSynthesis?speechSynthesis.getVoices():[]).filter(v=>/^ru/i.test(v.lang));RA.voice=L.find(v=>v.localService)||L[0]||null;}catch(e){RA.voice=null;}RA.ok=!!RA.voice;}
raVoices();try{if(window.speechSynthesis)speechSynthesis.onvoiceschanged=raVoices;}catch(e){}
RA.status=()=>!window.speechSynthesis?'в этом браузере нет голоса':RA.mock?'голос: пробный':RA.ok?'голос: '+RA.voice.name:'русский голос не найден — вслух читать не будет';
RA.can=()=>kidsRead()&&(RA.ok||!!RA.mock);
RA.say=function(text,now){if(!text)return;if(!now)FIN.kids.lv().read++;if(RA.mock){RA.mock(text);return;}if(!RA.ok)return;
  try{if(now)speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.voice=RA.voice;u.lang=RA.voice.lang;u.rate=0.9;u.pitch=1.1;u.volume=Math.max(0,Math.min(1,FIN.set.vox!=null?FIN.set.vox:1));
    u.onend=u.onerror=()=>{RA.speaking=false;};RA.speaking=true;speechSynthesis.speak(u);}catch(e){RA.speaking=false;}};
RA.test=()=>{RA.q.length=0;RA.say('Привет! Я буду читать задачи вслух.',true);};
RA.stop=()=>{RA.q.length=0;RA.speaking=false;try{if(window.speechSynthesis)speechSynthesis.cancel();}catch(e){}};
// текст карточки без кнопок: знаки боя — словами, пары «первый / второй» — только первый вариант
function raText(html){if(!html)return '';const d=document.createElement('div');d.innerHTML=html;const b=d.querySelector('.hn-body')||d;
  b.querySelectorAll('kbd,.pb,.hn-k2,.hn-p2,.hn-v2>i').forEach(e=>e.remove());
  b.querySelectorAll('i.sg').forEach(e=>{const c=e.className,w=/ y\b/.test(c)?'жёлтый знак':/ r\b/.test(c)?'красный знак':/ b\b/.test(c)?'синий знак':'знак';e.replaceWith(' '+w+' ');});
  b.querySelectorAll('br').forEach(e=>e.replaceWith(' '));
  let t=(b.textContent||'').replace(/[◆✦]/g,' ').replace(/\s+/g,' ').replace(/\s+([,.!?:;])/g,'$1').trim();
  if(t.length>170){t=t.slice(0,170);const k=Math.max(t.lastIndexOf('.'),t.lastIndexOf('!'),t.lastIndexOf('?'));t=k>60?t.slice(0,k+1):t.replace(/\s+\S*$/,'');}   // длинные реплики голос браузера обрывает
  return t;}
// слова идут через «Повтори»/автоповтор: показанные сейчас карточки (общая, потом личные)
function raCards(){const out=[];if(typeof HN==='undefined')return out;for(const i of[2,0,1]){if(!HN.shown[i])continue;if(G.solo&&i<2&&i!==G.soloPi)continue;const t=raText(HN.html[i]);if(t)out.push({i,t});}return out;}
function raTick(){
  const live=W&&W.kids&&G.state==='play'&&!G.cine&&!G.trans&&!G.ui&&RA.can();
  if(!live){if(RA.q.length||RA.speaking){RA.stop();}for(let i=0;i<3;i++)RA.cand[i]=null;return;}
  const now=performance.now(),cards=raCards(),busy=FIN.voxDuck<1||(typeof subT!=='undefined'&&subT>0.1);
  // «Повтори»
  if(tap(0,'help')||tap(1,'help')){FIN.kids.lv().help++;RA.q.length=0;RA.gap=0;const L=cards.slice();if(L.length){RA.say(L[0].t,true);RA.q.push(...L.slice(1).map(c=>c.t));}return;}
  for(const c of cards){const k=c.t.toLowerCase(),cd=RA.cand[c.i];
    if(!cd||cd.k!==k){RA.cand[c.i]={k,t0:now};continue;}
    if(now-cd.t0<700||busy)continue;
    const idle=c.i===2?Math.max(players[0].idle,players[1].idle):players[c.i].idle;
    if(!RA.said[k]){RA.said[k]=now;RA.q.push(c.t);}
    else if(idle>14&&!RA.rep[k]&&now-RA.said[k]>8000){RA.rep[k]=1;RA.q.push(c.t);}}
  for(let i=0;i<3;i++)if(!cards.some(c=>c.i===i))RA.cand[i]=null;
  if(RA.q.length&&!busy&&!RA.speaking&&now>RA.gap){const t=RA.q.shift();RA.say(t,false);RA.gap=now+1500;}}
{const _ui=updateUI;updateUI=function(dt){_ui(dt);try{raTick();}catch(e){console.error('readaloud',e);}};}
// пауза и меню — тишина
{const _sm=showMenu;showMenu=function(mode){if(mode==='pause')RA.stop();_sm(mode);};}
