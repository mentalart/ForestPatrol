/* ============================== РЕЛИЗ · ОЗВУЧКА РЕПЛИК (final06) ============================== */
// Реплики персонажей с записанным голосом — во всей игре: ролики, сценки и подсказки уровней, хаб, эпилог (ремарки рассказчика
// остаются субтитрами). Голоса — ElevenLabs v4 через Higgsfield; каталог — build/voice/lines.json, записи (MP3) сборка встраивает
// в VOX_LINES. У реплики с записью вместо синтезированного «бормотания» (babble) звучит голос, субтитр держится до конца фразы,
// музыка и мелодия колыбельной приглушаются; новая реплика обрывает прежнюю с коротким затуханием, а в ролике время на миг
// замедляется, чтобы голос успел договорить до следующей реплики. Пропуск ролика, пауза и смена уровня — голос затихает.
// Громкость — «Голоса» (FIN.set.vox).
const VOX={map:new Map(),lul:{},cur:null,bus:null};
const voxKey=(who,text)=>(who||'-')+'|'+String(text).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
for(const e of VOX_LINES){VOX.map.set(voxKey(e.who,e.text),e);if(e.lul)VOX.lul[e.lul]=e;}
const voxOn=()=>!!AC&&!(FIN.set.vox<=0);
function voxDecode(e){if(e.buf)return Promise.resolve(e.buf);if(e.pending)return e.pending;if(!AC)return Promise.resolve(null);
  // версия для Pages (build_final.py --pages): записи лежат рядом файлами (e.src) и подгружаются при загрузке уровня; иначе — внутри (e.b64)
  const raw=e.b64?Promise.resolve().then(()=>{const bin=atob(e.b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u.buffer;})
    :e.src?fetch(e.src).then(r=>{if(!r.ok)throw new Error(r.status);return r.arrayBuffer();}):Promise.reject(new Error('нет записи'));
  e.pending=raw.then(buf=>new Promise(res=>{try{AC.decodeAudioData(buf,b=>{e.buf=b;res(b);},()=>{e.bad=true;res(null);});}catch(err){e.bad=true;res(null);}}),()=>{e.bad=true;e.pending=null;return null;});return e.pending;}
function voxBus(){if(!VOX.bus){VOX.bus=AC.createGain();VOX.bus.connect(AC.destination);}VOX.bus.gain.value=0.9*(FIN.set.vox!=null?FIN.set.vox:1);return VOX.bus;}
function voxStop(fade){const c=VOX.cur;if(!c||!AC)return;VOX.cur=null;if(FIN.voxEv)try{FIN.voxEv(c.e.id,'stop',fade||0.08);}catch(err){}const t=AC.currentTime,f=fade||0.08;
  try{c.g.gain.cancelScheduledValues(t);c.g.gain.setValueAtTime(c.g.gain.value,t);c.g.gain.linearRampToValueAtTime(0,t+f);c.s.stop(t+f+0.02);}catch(err){}}
function voxStart(e,b){if(!b)return;voxStop(0.06);const s=AC.createBufferSource();s.buffer=b;const g=AC.createGain();g.gain.value=e.gain||1;s.connect(g);g.connect(voxBus());
  s.start();const c={s,g,e,end:AC.currentTime+b.duration,g0:G.time};VOX.cur=c;VOX.played=(VOX.played||0)+1;s.onended=()=>{if(VOX.cur===c)VOX.cur=null;};
  if(FIN.voxEv)try{FIN.voxEv(e.id,'main',1);}catch(err){}}   // FIN.voxEv — для съёмки трейлера: какая запись и когда зазвучала
function voxPlay(e){if(!voxOn())return false;if(e.buf){voxStart(e,e.buf);return true;}const t0=performance.now();
  voxDecode(e).then(b=>{if(performance.now()-t0<450)voxStart(e,b);});return true;}   // не успела раскодироваться — не догоняем реплику
// записи уровня (и общие, lv 'g') раскодируются заранее, при загрузке уровня — чтобы голос звучал без задержки;
// раскодированные записи других уровней отпускаются — в памяти держится только текущий уровень
function voxPrep(){if(!AC||!W)return;for(const e of VOX_LINES){if(e.lv===W.levelId||e.lv==='g')voxDecode(e);else if(e.buf){e.buf=null;e.pending=null;}}}
{const _bab=babble;babble=function(who,text){VOX.babbled=(VOX.babbled||0)+1;return _bab(who,text);};}
// FIN.vox — для настроек и ботов: каталог, текущая запись, счётчики, say/initAudio (функции игры закрыты в её области видимости)
FIN.vox={lines:VOX_LINES,find:(who,text)=>VOX.map.get(voxKey(who,text))||null,get cur(){return VOX.cur?VOX.cur.e.id:null;},get played(){return VOX.played||0;},
  get babbled(){return VOX.babbled||0;},get slowed(){return VOX.slowed||0;},get sub(){return subT;},say:(who,text,dur)=>say(who,text,dur),audio:()=>initAudio(),stop:voxStop,prep:voxPrep,cine:def=>play(def)};
// пока звучит голос — музыка тише (множитель в FIN.music.tick)
Object.defineProperty(FIN,'voxDuck',{get(){return VOX.cur&&AC&&AC.currentTime<VOX.cur.end?0.45:1;}});
{const _say=say;say=function(who,text,dur,noVoice){const e=VOX.map.get(voxKey(who,text));
  if(e&&!e.bad&&voxOn()){_say(who,text,Math.max(dur||2.5,e.dur+0.35),true);voxPlay(e);return;}_say(who,text,dur,noVoice);};}
// колыбельная: мелодия — тихий аккомпанемент под спетую строчку
{const _lul=lullaby;lullaby=function(notes,beat,delay,vol){const k=notes===LUL1?'LUL1':notes===LUL2?'LUL2':'';const e=VOX.lul[k];
  _lul(notes,beat,delay,e&&!e.bad&&voxOn()?(vol||0.17)*0.35:vol);};}
{const _ia=initAudio;initAudio=function(){_ia();voxPrep();};}
{const _ll=loadLevel;loadLevel=function(i){voxStop(0.1);_ll(i);voxPrep();};}
CINE.on('end',d=>{if(d.skipped)voxStop(0.12);});
// ролик ждёт голос: если следующая реплика ролика (или его конец) наступит раньше, чем договорит текущий голос, время ролика
// идёт медленнее (не медленнее 20%), пока фраза не закончится; на одну реплику — не больше 3,2 с добавки, дальше как было
{const _play=play;play=function(def){_play(def);const S=G.cine;if(S&&def){S._says=def.says||[];S._hold=0;S._holdAt=-1;S._g0=G.time;}};}
{const _st=step;step=function(dt){const c=G.cine;   // ждём только голос, начатый в этом ролике (g0 ≥ начала ролика)
  if(c&&c._says&&c._says.length&&VOX.cur&&VOX.cur.g0>=c._g0&&AC&&G.state==='play'){const rem=Math.min(VOX.cur.end-AC.currentTime,VOX.cur.e.dur-(G.time-VOX.cur.g0)),nx=c._says[c.yi],nt=nx?nx[0]:c.dur;
    if(c._holdAt!==c.yi){c._holdAt=c.yi;c._hold=0;}
    const until=nt-c.t;if(rem>0.05&&until<rem+0.12&&c._hold<3.2){const k=Math.max(0.2,Math.min(1,until/(rem+0.12)));c.t-=dt*(1-k);c._hold+=dt*(1-k);VOX.slowed=(VOX.slowed||0)+dt*(1-k);}}
  _st(dt);};}
{const _r=render;render=function(){_r();if(VOX.cur&&G.state==='pause')voxStop(0.2);};}
