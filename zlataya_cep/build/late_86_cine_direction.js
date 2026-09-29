/* ============================== РЕЛИЗ · КИНО 5: АВТОРСКАЯ РЕЖИССУРА КЛЮЧЕВЫХ РОЛИКОВ ============================== */
// Общая система (late_82…85) оживляет все 113 роликов. Здесь — ручная постановка главных сцен: метки по времени ролика
// (реакции конкретных героев, dolly-zoom на комичном «осознании», slow-motion, голландский угол, смена настроения, конфетти).
// Ролик узнаётся по уровню и длительности (и по первой реплике, если на уровне несколько роликов одной длины).
const dH=w=>HERO[w];
const dEmo=(who,type)=>()=>{const h=HERO[who];if(h&&h.g.visible)ACT.emote(h,type);else{const n=npcByWho(who);if(n)n.em={type:type==='fear'?'surprise':type,t:0,d:0.8};}};
const dAll=(type,st)=>()=>ACT.emoteAll(type,null,st);
const dDZ=(f,dur,hold)=>()=>CINE.dollyZoom(f,dur,hold);
const dSlow=(s,d)=>()=>CINE.slowmo(s,d);
const dDutch=(a,back)=>()=>{CINE.dutch(a);if(back)later(back,()=>CINE.dutch(0));};
const dMood=(c,a)=>()=>CINE.mood(c,a);
const dConf=(n)=>()=>{const p=camFront(Math.min(5,shared.pos.distanceTo(shared.look)*0.7));FX.confetti(p,Math.round((n||40)*0.5),0.7);FX.confettiCam(n||40);CINE.rimPulse(0.8);CINE.punch(-4);CINE.emit('accent',{type:'confetti'});};
const dSpark=(n,col)=>()=>FX.sparkle(shared.look.clone(),n||8,col);
const dTrauma=a=>()=>CINE.trauma(a);
const dSpeed=a=>()=>FX.speed(a||0.9);
const dPunch=d=>()=>CINE.punch(d);
const WARM='#ffb870',GOLD='#ffd27a',COLD='#6f86ff',NIGHT='#8a7cff';
const DIR=[
  // Пролог «Колыбельная»: тёплый вечер → смешной крах самоката → тень за окном → чудо рождения Звенышка
  {lv:'p',dur:39,mood:[WARM,0.14],cues:[[1.8,dEmo('potap','nod')],[3.0,dEmo('yosha','tilt')],[6.0,dAll('tilt',0.12)],[8.7,dEmo('pelageya','droop')],[11.9,dEmo('proshka','pride')],
    [16.25,dSlow(0.4,0.35)],[16.3,dDutch(0.09,0.9)],[16.4,dEmo('proshka','surprise')],[16.9,dEmo('potap','laugh')],[17.2,dEmo('pelageya','laugh')],
    [18.9,dMood(COLD,0.2)],[19.2,dAll('fear',0.1)],[19.6,dDZ(0.24,1.3,1.6)],[24.0,dMood(WARM,0.16)],[26.25,dSlow(0.45,0.5)],[27.5,dSpark(6)],[28.6,dSpark(6,0xffd23a)],
    [32.4,dConf(44)],[32.45,dSlow(0.5,0.45)],[32.6,dAll('joy',0.08)],[35.7,dSpeed(1)],[36.4,dAll('cheer',0.06)]]},
  // 1-1: Яга ставит задачу — Прошка хорохорится
  {lv:'1-1',dur:13.5,cues:[[5.0,dEmo('proshka','pride')],[7.4,dAll('tilt',0.1)],[9.9,dAll('surprise',0.06)]]},
  {lv:'1-1',dur:12.5,mood:[WARM,0.12],cues:[[3.3,dEmo('potap','nod')],[5.5,dEmo('pelageya','nod')],[7.5,dEmo('yosha','hop')]]},
  // 1-3: Колобок ждёт, что его съедят
  {lv:'1-3',dur:22,cues:[[3.6,dAll('surprise',0.08)],[7.0,dEmo('proshka','pride')],[11.3,dDZ(0.22,0.9,1.2)],[14.3,dEmo('proshka','effort')],[18.5,dAll('joy',0.1)]]},
  // 1-4: Леший уносит Пелагею — комичный испуг
  {lv:'1-4',dur:25.5,cues:[[6.9,dDZ(0.3,0.8,1.4)],[6.9,dMood(COLD,0.18)],[7.0,dAll('fear',0.08)],[10.3,dDutch(-0.08,1.6)],[15.8,dEmo('proshka','droop')],[22,dMood(WARM,0.08)]]},
  // 1-Б: примирение с Лешим
  {lv:'1-B',dur:16,mood:[WARM,0.12],cues:[[1.0,dAll('nod',0.1)],[12.4,dEmo('proshka','pride')],[13.6,dAll('hop',0.08)]]},
  {lv:'1-B',dur:6,cues:[[0.5,dPunch(-5)],[0.6,dAll('surprise',0.06)],[0.7,dTrauma(0.3)]]},
  // 2-1: гусли запели
  {lv:'2-1',dur:20.6,mood:[WARM,0.12],cues:[[1.2,dSlow(0.5,0.5)],[2.4,dAll('joy',0.1)]]},
  // 2-4: кит глотает / чих
  {lv:'2-4',dur:11,cues:[[6.4,dAll('fear',0.06)],[6.7,dEmo('potap','effort')]]},
  {lv:'2-4',dur:16,cues:[[11.6,dEmo('yosha','pride')],[12.4,dAll('joy',0.1)]]},
  // 2-Б: Водяной просыпается — большой и смешной; и засыпает снова
  {lv:'2-B',dur:15,cues:[[10.5,dMood(COLD,0.16)],[12.4,dDZ(0.28,0.9,1.2)],[12.5,dAll('fear',0.08)],[12.6,dTrauma(0.35)]]},
  {lv:'2-B',dur:20,calm:true,mood:[NIGHT,0.12],cues:[[12.5,dEmo('yosha','droop')]]},
  // 3-1: темнота сада и холодный ключ
  {lv:'3-1',dur:24.6,cues:[[3.8,dMood(NIGHT,0.16)],[17.2,dDZ(0.2,1.0,1.0)],[17.3,dEmo('proshka','surprise')],[22.7,dEmo('yosha','flinch')]]},
  {lv:'3-1',dur:12,mood:[GOLD,0.16],cues:[[0.6,dSlow(0.5,0.5)],[4.1,dAll('joy',0.08)],[8.0,dMood(COLD,0.12)]]},
  // 3-4: корабль взлетает; авария в воздухе
  {lv:'3-4',dur:12.4,cues:[[7.0,dSpeed(0.9)],[7.1,dAll('cheer',0.08)],[9.9,dDutch(0.1,1.4)]]},
  {lv:'3-4',dur:21,cues:[[4.0,dEmo('potap','effort')],[6.9,dEmo('proshka','pride')]]},
  // 3-5: Яга разоблачает Кощея
  {lv:'3-5',dur:30,cues:[[6.3,dMood(COLD,0.12)],[10.5,dDZ(0.2,1.0,1.2)],[18.3,dMood(WARM,0.12)],[25.5,dAll('joy',0.08)]]},
  // 3-Б: Соловей свистит — «А ну, сдуло!»
  {lv:'3-B',dur:13,say:'Фью',cues:[[4.7,dAll('surprise',0.06)],[7.4,dSpeed(1)],[7.45,dTrauma(0.45)],[7.5,dDutch(0.12,1.6)],[7.55,dAll('fear',0.05)]]},
  {lv:'3-B',dur:14,mood:[GOLD,0.14],cues:[[3.9,dEmo('pelageya','pride')],[10.6,dConf(36)],[10.7,dAll('cheer',0.08)]]},
  // 4-2: Потап оберегает Йошу — доверие
  {lv:'4-2',dur:24,calm:true,cues:[[4.8,dEmo('potap','pride')],[14.8,dEmo('yosha','nod')],[21.8,dEmo('potap','nod')]]},
  // 4-3: «Эй, ухнем»
  {lv:'4-3',dur:23,cues:[[9.7,dAll('effort',0.15)],[12.9,dEmo('proshka','surprise')],[15.0,dEmo('potap','pride')]]},
  // 4-5: Потап держит мост
  {lv:'4-5',dur:23,cues:[[12.8,dSlow(0.5,0.6)],[13.1,dEmo('potap','pride')]]},
  {lv:'4-5',dur:24,mood:[WARM,0.12],cues:[[13.5,dEmo('yosha','nod')],[16.5,dEmo('potap','nod')],[18,dAll('hop',0.1)]]},
  // 4-Б: три головы Горыныча спорят
  {lv:'4-B',dur:20,cues:[[5.1,dAll('tilt',0.1)],[9.1,dAll('surprise',0.06)],[9.2,dPunch(-4)],[13.2,dAll('fear',0.06)],[16.8,dEmo('pelageya','nod')]]},
  // 5-1: «Лиху в глаз не смотрите» и ловушка
  {lv:'5-1',dur:21,cues:[[4.5,dAll('tilt',0.1)],[9.3,dDZ(0.22,1.0,1.4)],[9.4,dMood(COLD,0.14)],[19.1,dEmo('proshka','effort')]]},
  {lv:'5-1',dur:5.2,cues:[[2.6,dAll('fear',0.05)],[2.7,dPunch(-5)],[2.7,dTrauma(0.4)]]},
  // 5-1 (расширенный): коршун и Лебедь, Голова чихает, белка, зеркальце, пятая цепь, бой с Лихом, заяц
  {lv:'5-1',dur:9.4,cues:[[4.4,dEmo('yosha','fear')],[6.9,dEmo('proshka','pride')]]},
  {lv:'5-1',dur:34,mood:[WARM,0.12],cues:[[4.2,dAll('joy',0.08)],[12.9,dEmo('pelageya','tilt')],[15.2,dAll('surprise',0.06)],[19.8,dMood(COLD,0.1)],[24.1,dEmo('yosha','nod')],[28,dMood(WARM,0.1)]]},
  {lv:'5-1',dur:13.4,cues:[[0.4,dDZ(0.2,1.2,1.4)],[4.8,dTrauma(0.2)],[7.2,dEmo('potap','effort')],[10.2,dEmo('yosha','hop')]]},
  {lv:'5-1',dur:17.2,cues:[[0.3,dPunch(-4)],[0.4,dAll('surprise',0.06)],[10.4,dEmo('proshka','droop')],[12.6,dTrauma(0.3)]]},
  {lv:'5-1',dur:11.6,cues:[[4.8,dMood(COLD,0.12)],[8.2,dEmo('pelageya','nod')]]},
  {lv:'5-1',dur:19.4,mood:[WARM,0.14],cues:[[0.3,dSpark(8,0xffd23a)],[3.9,dAll('joy',0.08)],[12.9,dEmo('yosha','hop')]]},
  {lv:'5-1',dur:31.4,cues:[[7.6,dEmo('pelageya','droop')],[13.2,dEmo('proshka','tilt')],[17.2,dMood(COLD,0.12)],[21.4,dSpark(8,0xcfe8ff)],[25.4,dEmo('yosha','surprise')],[28.2,dEmo('proshka','pride')]]},
  {lv:'5-1',dur:12.6,cues:[[0.3,dDZ(0.22,1.2,1.4)],[5.2,dEmo('pelageya','nod')],[8.6,dPunch(-5)],[8.7,dAll('fear',0.06)]]},
  {lv:'5-1',dur:24.4,cues:[[0.4,dTrauma(0.5)],[6.6,dMood(COLD,0.16)],[6.7,dAll('fear',0.06)],[18.7,dEmo('proshka','pride')],[21.5,dEmo('potap','nod')]]},
  {lv:'5-1',dur:15,cues:[[4,dSlow(0.6,0.6)],[8.6,dEmo('proshka','pride')],[11.4,dEmo('yosha','hop')],[13.4,dAll('joy',0.08)]]},
  {lv:'5-1',dur:13.6,mood:[NIGHT,0.16],cues:[[10.8,dEmo('yosha','hop')]]},
  {lv:'5-1',dur:26,cues:[[3.6,dSlow(0.5,0.6)],[8.4,dConf(40)],[8.5,dAll('surprise',0.06)],[12.4,dEmo('yosha','hop')],[19.4,dMood(WARM,0.12)],[23.2,dAll('nod',0.08)]]},
  // 5-4: Кощей забирает яйцо — «Моё»
  {lv:'5-4',dur:25,cues:[[8.8,dMood(COLD,0.2)],[9.4,dDZ(0.3,1.1,1.4)],[9.6,dAll('fear',0.08)]]},
  // 5-Б1: Кощей хочет прочитать книгу
  {lv:'5-B1',dur:17,cues:[[9.7,dAll('surprise',0.1)],[10.4,dMood(WARM,0.08)]]},
  // 5-Б2: «Дочитал. Там конца нет.»
  {lv:'5-B2',dur:35,calm:true,mood:[COLD,0.14],cues:[[16.9,dDZ(0.18,1.4,1.6)],[23.5,dAll('droop',0.1)],[31,dMood(WARM,0.12)],[31.2,dAll('nod',0.08)]]},
  // 5-Б2: финал — прощение, цепь скована
  {lv:'5-B2',dur:49,calm:true,mood:[WARM,0.14],cues:[[12.5,dAll('droop',0.12)],[19.5,dEmo('pelageya','pride')],[23.6,dAll('nod',0.1)],[28.0,dSlow(0.5,0.5)],[28.1,dConf(50)],[28.2,dAll('cheer',0.08)],[30.5,dMood(GOLD,0.2)]]},
  // Эпилог: колыбельная вспомнилась
  {lv:'epi',dur:21,calm:true,mood:[NIGHT,0.14],cues:[[6.5,dAll('hop',0.14)],[6.6,dSpark(8,0xfff4c0)],[18.3,dAll('droop',0.2)]]},
  {lv:'epi',dur:24,calm:true,mood:[WARM,0.14],say:'…а ещё была сказка',cues:[[9.7,dEmo('proshka','tilt')],[17.1,dEmo('proshka','droop')],[19.5,dEmo('pelageya','pride')]]},
  // Лукоморье: Кощей крадёт сказки — кульминация хаба
  {lv:'luko',dur:58,cues:[[30,dMood(COLD,0.2)],[38.4,dDZ(0.3,1.1,1.6)],[38.5,dAll('fear',0.08)],[54.7,dEmo('proshka','pride')],[55.2,dAll('nod',0.1)],[55.5,dMood(WARM,0.14)]]},
  // Лукоморье: Кощей крадёт голос Кота
  {lv:'luko',dur:50,calm:true,mood:[NIGHT,0.16],cues:[[42.5,dAll('droop',0.12)]]},
  // Лукоморье: «Без имён» — Кощей хочет прощения
  {lv:'luko',dur:52,calm:true,mood:[NIGHT,0.12],cues:[[9.5,dEmo('yosha','tilt')],[30.1,dEmo('proshka','nod')],[38.9,dMood(WARM,0.16)],[39,dEmo('pelageya','pride')],[47.1,dEmo('proshka','effort')]]},
  // Лукоморье: пир — Потап почти вспомнил былину
  {lv:'luko',dur:26,mood:[WARM,0.14],cues:[[16.1,dEmo('potap','effort')],[19.7,dEmo('potap','joy')],[20,dAll('laugh',0.1)]]}];
CINE.direct=function(cd){CINE.mood('#ffc890',0.07);const lv=W&&W.levelId;
  const e=DIR.find(x=>x.lv===lv&&Math.abs(x.dur-cd.def.dur)<0.01&&(!x.say||((cd.def.says||[]).some(y=>String(y[3]).indexOf(x.say)===0))));
  if(!e)return;cd.directed=true;if(e.calm)cd.calm=true;if(e.mood)CINE.mood(e.mood[0],e.mood[1]);if(e.inserts===false)cd.inserts=false;
  cd.cues=e.cues.map(([t,fn])=>({t,fn})).sort((a,b)=>a.t-b.t);cd.ci=0;};
