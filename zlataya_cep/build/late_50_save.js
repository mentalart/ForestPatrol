/* ============================== РЕЛИЗ · СОХРАНЕНИЯ И НАСТРОЙКИ ============================== */
const SAVE_KEY='zlatayaCep.save.v1',SET_KEY='zlatayaCep.settings.v1';
const SAVE_FIELDS=['stats','playTime','links','flags','done','got','nutsGot','forgedLinks','forgedW','zbest','gems','gemsSpent','nutsSpent','nutsHub','trips','garden','hen','owned','secrets','tales','medals'];
FIN.plain=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
// повреждённое сохранение (не объект, нет G) — как отсутствующее: иначе «Главы» и «Продолжить» падают
FIN.readSave=()=>{try{const d=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');return FIN.plain(d)&&FIN.plain(d.G)?d:null;}catch(e){return null;}};
// автосохранение: после каждого пройденного уровня, в Лукоморье — раз в полминуты и при выходе в меню
FIN.saveGame=function(){if(!G.hub)return false;try{const d={v:1,ver:FIN.ver,t:Date.now(),paths:players.map(p=>p.path),solo:!!G.solo,co:!!(FIN.co&&FIN.co.on),G:{}};
  SAVE_FIELDS.forEach(k=>{if(G[k]!==undefined&&G[k]!==null)d.G[k]=JSON.parse(JSON.stringify(G[k]));});localStorage.setItem(SAVE_KEY,JSON.stringify(d));
  const el=$('finSave');if(el){el.classList.remove('fin-on');void el.offsetWidth;el.classList.add('fin-on');}return true;}catch(e){return false;}};
{const _fin=finishLevel;finishLevel=function(){_fin();FIN.saveGame();};}
{const _end=endGame;endGame=function(){FIN.saveGame();_end();};}
setInterval(()=>{if(G.state==='play'&&W&&W.levelId==='luko'&&!G.cine&&!G.trans&&!G.manual)FIN.saveGame();},30000);
// сводка для кнопки «Продолжить»: где остановились, сколько звеньев, сколько играли
FIN.saveSummary=d=>{if(!d)return '';const g=d.G||{};const done=Object.keys(g.done||{}).filter(k=>g.done[k]);let last='';for(const l of LEVELS)if(done.includes(l.id))last=l.name.replace(/^[^·]*·\s*/,'');
  const wn=[1,2,3,4,5].filter(w=>(g.flags||{})['w'+w+'done']||(w===1&&(g.flags||{}).voiceDone)).length;const m=Math.floor((g.playTime||0)/60);
  const got=Object.values(g.got||{}).reduce((x,y)=>x+(+y||0),0);return 'Лукоморье · '+(wn?'миров пройдено: '+wn+' · ':'')+'звеньев собрано: '+got+(last?' · последний: '+last:'')+' · '+(m>=60?Math.floor(m/60)+' ч '+m%60+' мин':m+' мин');};
// продолжить: вернуть всё сохранённое и выйти на Лукоморье (или сразу в выбранную главу)
FIN.resetState=function(){for(const k in G.stats)G.stats[k]=0;G.playTime=0;G.links=0;G.flags={};G.done={};G.got={};G.nutsGot={};G.forgedLinks=0;G.forgedW={1:0,2:0,3:0,4:0,5:0};G.zbest={};G.gems={};G.gemsSpent=0;G.nutsSpent=0;G.nutsHub=0;G.trips=0;
  G.garden=null;G.hen=null;G.owned={};G.secrets={};G.tales={};document.body.classList.remove('photo');players.forEach(p=>{p.enc={};p.shieldTaught=false;p.closedTaught=false;p.staggerSeen=0;p.blue=0;p.act=0;});};
FIN.applySave=function(d){FIN.resetState();if(!d||!FIN.plain(d.G))return;
  // поле берём, только если его тип совпал с исходным (после resetState): null, строка вместо объекта и т.п. из повреждённого сохранения пропускаются
  for(const k of SAVE_FIELDS){const v=d.G[k],cur=G[k];if(v===undefined||v===null)continue;
    if(cur!=null?(typeof v!==typeof cur||Array.isArray(v)!==Array.isArray(cur)):typeof v!=='object')continue;
    G[k]=JSON.parse(JSON.stringify(v));}
  G.hub=true;if(d.paths)players.forEach((p,i)=>{if(d.paths[i])p.path=d.paths[i];});if(typeof d.solo==='boolean'&&d.solo!==G.solo)setSolo(d.solo);if(FIN.co&&!d.solo&&typeof d.co==='boolean')FIN.co.set(d.co);};
FIN.continueGame=function(lv){const d=FIN.readSave();if(!d)return;FIN.applySave(d);loadLevel(lv===undefined?LV('luko'):lv);hideMenu();};
// какие главы открыты: пройденные, Лукоморье и следующая по порядку
FIN.chapterList=function(){const d=FIN.readSave(),g=d?d.G:{},done=g.done||{},all=!!(g.flags&&g.flags.w5done);const out=[];let nextOpen=true;
  LEVELS.forEach((l,i)=>{if(!(l.world||['p','luko','epi'].includes(l.id)))return;const ok=all||i===0||!!done[l.id]||(l.id==='luko'&&!!d)||(nextOpen&&d&&l.world);if(l.world&&!done[l.id]&&d)nextOpen=false;
    out.push({i,id:l.id,name:l.name,world:l.world||0,open:ok,got:(g.got||{})[l.id]||0,links:l.links||0,nuts:(g.nutsGot||{})[l.id]||0,nutT:l.nuts||0,boss:!!l.boss,done:!!done[l.id]});});return out;};
// ---------- настройки ----------
FIN.saveSettings=()=>{try{localStorage.setItem(SET_KEY,JSON.stringify(FIN.set));}catch(e){}};
FIN.applySettings=function(){const s=FIN.set;G.subs=!!s.subs;document.documentElement.style.setProperty('--fts',String(s.ts||1));s.shake=s.shakeK>=1;s.flash=s.flashK>0;document.body.classList.toggle('fin-noflash',s.flashK<=0);document.body.classList.toggle('fin-softflash',s.flashK>0&&s.flashK<1);
  if(master)master.gain.value=0.22*s.sfx;if(FIN.music)FIN.music.setVol(s.mus);};
FIN.shakeK=()=>FIN.set.shakeK!=null?FIN.set.shakeK:(FIN.set.shake?1:0.15);FIN.flashK=()=>FIN.set.flashK!=null?FIN.set.flashK:(FIN.set.flash?1:0);
{const _sh=shake;shake=function(pi,amp,dur){_sh(pi,amp*FIN.shakeK(),dur);};}
{const _ia=initAudio;initAudio=function(){const was=!!AC;_ia();if(!was&&AC){FIN.applySettings();if(FIN.music)FIN.music.start();}};}
