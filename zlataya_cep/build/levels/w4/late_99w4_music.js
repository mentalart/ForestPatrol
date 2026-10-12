/* ============================== МИР 4 · МУЗЫКА И ПОДПИСИ К ЗВУКАМ (docs/39, ЗВ.1–ЗВ.3) ============================== */
// ЗВ.1 своя версия темы `w4` (ми фригийский) на уровень — слои: 4-1 «наковальня» вместо ударных, 4-3 медленный бас бурлаков
// (песня в 4-3 звучит сама — музыка на время песни молчит), 4-4 осенний вариант (арфа, жалейка), 4-5 тема Потапа — бас и мотив «Эй, ухнем»
// в миноре, ровный шаг. Тема уровня выбирается в pick() (late_40_music.js) по FIN.music.TR['lv_'+id].
// ЗВ.2 удары молота в 4-1 — ноты того же мотива (proto/levels/4-1.js: MOT43).
// ЗВ.3 подписи к звукам (настройка «Подписи к звукам», JW.cap): рык Горыныча, шипение корки, «остывает», ящерка набирает огонь, цепи скрипят.
{const T=FIN.music&&FIN.music.TR;if(T&&T.w4){
  const B=T.w4.v[0].seq,HI=T.w4.v[1].seq;
  const UH=[[[4,1],[3,.5],[0,1.5],[4,1],[3,.5],[0,1.5],[3,.5],[4,.5],[5,.5],[4,.5],[3,1],[2,.5],[1,.5],[0,4],[null,2]]];   // «Эй, ухнем» по ступеням лада
  const ANV=[[[0,.5],[null,.5],[0,.25],[0,.25],[null,.5],[0,.5],[null,.5],[0,.25],[0,.25],[null,.5],[0,.5],[null,.5],[0,.25],[0,.25],[null,.5],[0,.5],[null,1.5],[0,.25],[0,.25],[null,1.5]]];
  T['lv_4-1']={bpm:112,root:52,sc:'phr',len:16,v:[{i:'pluck',oct:0,vol:0.045,seq:B},{i:'drone',drone:[0],oct:-24,vol:0.05},
    {i:'bell',oct:24,vol:0.022,seq:ANV},{i:'kick',drum:'x.......x.......',vol:0.07}]};
  T['lv_4-3']={bpm:84,root:52,sc:'phr',len:16,v:[{i:'pluck',oct:-12,vol:0.06,seq:UH},{i:'drone',drone:[0],oct:-24,vol:0.05},{i:'frame',drum:'x.......x.......',vol:0.035}]};
  T['lv_4-4']={bpm:100,root:52,sc:'phr',len:16,v:[{i:'harp',arp:[0,3,5,4],per:4,pat:[0,4,7,4],st:0.5,oct:0,vol:0.04},{i:'flute',oct:12,vol:0.04,every:2,seq:HI},
    {i:'drone',drone:[0],oct:-24,vol:0.04},{i:'frame',drum:'x.....x.x.......',vol:0.03}]};
  T['lv_4-5']={bpm:92,root:52,sc:'phr',len:16,v:[{i:'pluck',oct:-12,vol:0.065,seq:UH},{i:'flute',oct:12,vol:0.035,every:2,seq:UH},
    {i:'drone',drone:[0,7],oct:-24,vol:0.05},{i:'kick',drum:'x...x...x...x...',vol:0.07},{i:'tamb',drum:'......x.......x.',vol:0.02}]};}}
// ---------- подписи к звукам ----------
const w4Cap=(text,p)=>{if(!FIN.set.caps||!JW||!JW.cap)return;let pan=null;if(p){const c=camS.position,r=new V3(1,0,0).applyQuaternion(camS.quaternion),d=p.clone().sub(c);pan=d.length()>0.1?clamp(d.dot(r)/d.length(),-1,1):0;}JW.cap(text,pan);};
FIN.w4cap=w4Cap;
{const _r=FIN.w4story&&FIN.w4story.farRoar;if(_r)FIN.w4story.farRoar=function(){_r.apply(this,arguments);w4Cap('рык Горыныча вдали');};}
if(typeof G4S!=='undefined'){const _r=G4S.roar;G4S.roar=function(){_r.apply(this,arguments);w4Cap('рык Горыныча');};}
{const _ca=crustAt;crustAt=function(x,z,y,ang,o){const c=_ca(x,z,y,ang,o);if(W.world===4)w4Cap('шипение — встала корка',new V3(x,y,z));return c;};}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);if(!W||W.world!==4)return;const fx=W.fx4;W.fx4=function(kind,p){if(fx)fx(kind,p);
    if(kind==='spit')w4Cap('ящерка набирает огонь',p);else if(kind==='chain')w4Cap('цепи скрипят',p);else if(kind==='temper')w4Cap('пар шипит',p);else if(kind==='cool')w4Cap('остывает',p);};};}
