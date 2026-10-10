/* ============================== РЕЛИЗ · ЗАДАЧИ И ПОДСКАЗКИ — ЗАПИСАННЫМ ГОЛОСОМ ============================== */
// «Читать задачи вслух» (late_79b_readaloud.js) раньше читало голосом браузера (Web Speech API, в Windows — Microsoft Irina). Его в игре больше нет:
// у задач и подсказок есть записи: голос Silero v4 «baya» (tools/voice/read_tts.py), около 680 записей; сборка кладёт их в READ_LINES.
//  • Запись ищется по ключу — тексту карточки без цифр и знаков (RDV.key): счётчик «0 / 3» не делает задачу новой, одна запись — для любого значения.
//  • Есть запись — звучит она (через шину голосов, громкость «Голоса» в настройках; при 0 — тишина); нет записи — тишина, запасного голоса нет.
//    Русский голос в системе не нужен (RA.can).
//  • Запись замолкает вместе с остальным чтением (RA.stop: пауза, смена уровня, ролик, выключили чтение) и когда начинает говорить герой.
//  • Тексты записей собирает tools/voice/harvest_read.js (задачи и подсказки-зоны всех уровней) и extract.js (tip(…) из кода); новые и изменённые
//    тексты озвучивает read_tts.py — до тех пор такая карточка молчит.
const RDV={map:new Map(),cur:null,last:null,seq:0,played:0,failed:0};
const rdvKey=t=>String(t==null?'':t).toLowerCase().replace(/[^a-zа-яё ]+/g,' ').replace(/\s+/g,' ').trim();
for(const e of READ_LINES)RDV.map.set(e.k,e);
function rdvStop(fade){RDV.seq++;const c=RDV.cur;if(!c)return;RDV.cur=null;const f=fade||0.08;
  try{if(AC){const t=AC.currentTime;c.g.gain.cancelScheduledValues(t);c.g.gain.setValueAtTime(c.g.gain.value,t);c.g.gain.linearRampToValueAtTime(0,t+f);c.s.stop(t+f+0.02);}}catch(err){}
  c.e.buf=null;c.e.pending=null;}
{const RA=FIN.readAloud,_say=RA.say,_stop=RA.stop,_status=RA.status;
  // бот (RA.mock) → текст уходит в подмену; запись есть → звучит она; нет записи, громкость 0 или запись испорчена → тишина (голоса браузера нет)
  RA.say=function(text,now){if(RA.mock)return _say.call(RA,text,now);
    const e=RDV.map.get(rdvKey(text));if(!e||!voxOn()||e.bad)return;
    if(!now)FIN.kids.lv().read++;
    rdvStop(0.05);const my=RDV.seq;   // RA.speaking — только когда запись реально пошла: пока она раскодируется, чтение не занято
    voxDecode(e).then(b=>{if(my!==RDV.seq)return;
      if(RA.mock||!voxOn())return;   // пока раскодировалась, чтение выключили или подменили (бот) — молчим
      if(!b){RDV.failed++;return;}   // не раскодировалась — тишина
      const s=AC.createBufferSource();s.buffer=b;const g=AC.createGain();s.connect(g);g.connect(voxBus());s.start();
      const c={s,g,e};RDV.cur=c;RDV.last=e.id;RDV.played++;RA.speaking=true;
      s.onended=()=>{if(RDV.cur===c){RDV.cur=null;RA.speaking=false;}e.buf=null;e.pending=null;};}).catch(()=>{});};
  RA.stop=function(){rdvStop(0.08);_stop.call(RA);};
  RA.can=()=>kidsRead()&&(!!RA.mock||RDV.map.size>0);
  RA.status=()=>RDV.map.size?'голос: Байя (запись)':_status();}
{const _vs=voxStart;voxStart=function(e,b){if(RDV.cur)rdvStop(0.1);_vs(e,b);};}   // герой заговорил — чтение замолкает
FIN.readVoice={get n(){return RDV.map.size;},key:rdvKey,find:t=>RDV.map.get(rdvKey(t))||null,get cur(){return RDV.cur?RDV.cur.e.id:null;},
  get played(){return RDV.played;},get last(){return RDV.last;},get lines(){return[...RDV.map.values()];},get failed(){return RDV.failed;},stop:rdvStop};
