// ---- продолжение build5B2 (k5epic, часть 6): БИТВА В ДВЕНАДЦАТЬ СТАДИЙ — контроллер (docs/27_koschei_epic_proposals.md) ----
  // Прежние пять этапов остаются как есть (их механики настроены и проверены) и стали стадиями 1, 2, 8, 9, 12; поверх них — новые
  // слои (Кот-часы, друзья), между ними — новые стадии 3, 10, 11 и четыре страницы-портала 4–7. Каждая стадия: start(o) / tick(dt) /
  // end(); пройдена — E.won(n): строка пролога встаёт золотом над дубом, дальше переход E.after(n).
  const E=FIN.k5e;E.on=true;E.cur=null;E.free={};E.done={};E.fails=E.fails||{};E.stage={};E.layer={};E.cine={};
  const ES={};E.es=ES;
  // реплика друга: короткая — над головой и субтитром, длинная — только субтитром (не громоздить надписи над полем)
  const barkS=(o,who,t,d,nv)=>{if(o===KS||String(t).replace(/<[^>]*>/g,'').length>28)say(who,t,d,true);else bark(o,who,t,d,true);};   // Кощей — только субтитром: надпись над ним закрывала бы его удары   // состояние текущей стадии — очищается при смене
  const OLD={1:1,2:2,8:3,9:4,12:5},EP={1:1,2:2,3:8,4:9,5:12};E.OLD=OLD;
  const HUBST=[1,2,3,8,9,10,11,12],CLOCK=[1,2,3,9,12];E.isHub=n=>HUBST.indexOf(n)>=0;
  // кто к началу стадии n уже свободен (прыжок к стадии из панели — мир как после прохождения прежних)
  const FREE_AT={kot:2,leshy:3,kiki:4,yaga:5,vod:6,zhar:7,solo:7,gor:8,vit:10,zven:12};
  const FREE_N=['kot','leshy','kiki','yaga','vod','zhar','solo','gor','vit'];
  E.freeCount=()=>FREE_N.filter(k=>E.free[k]).length;
  function applyFree(n){for(const k in FREE_AT)E.free[k]=n>=FREE_AT[k];if(E.hubFree)E.hubFree();}
  E.sky=K5L.sky(OAK);
  /* ---------- подсказки текстом — только в начале стадии ---------- */
  // Первые HINT_S секунд игры (без роликов и меню) видны карточки задачи и событий; потом они гаснут и не заслоняют Кощея и его
  // удары — остаются подсказки в мире: кнопки над целями, стрелки, кольца (late_94: карточка боя становится кнопкой над целью).
  // Полный текст стадии и текущей цели — в паузе (Esc). Окно открывается заново: новая стадия, повтор, вход на страницу, отрезок пролога.
  const titleOn=()=>{try{const lv=$('level');return G.time-HN.titleT<4.2&&!!lv&&lv.style.opacity==='1';}catch(e){return false;}};   // заставка с именем уровня — карточки ждут её (late_79)
  const HINT_S=10;E.hintLeft=HINT_S;E.hintReset=s=>{E.hintLeft=s||HINT_S;};E.quiet=()=>E.hintLeft<=0;W.hintsOff=()=>E.quiet();
  {let base=W.pauseLine||'';Object.defineProperty(W,'pauseLine',{configurable:true,set:v=>{base=v;},get:()=>{let g='';try{if(E.cur!=null){const a=E.goal(0),b=G.solo?'':E.goal(1);g=a+(b&&b!==a?'<br>'+b:'');}}catch(e){}return base+(g?'<br><br>'+g:'');}});}
  /* ---------- музыка: «оркестр собирается» ---------- */
  E.music=mode=>{const n=E.cur;if(n>=4&&n<=7&&!mode){if(FIN.music)FIN.music.play(['','','','','w1','w2','w3','w4'][n]);return;}K5L.music(mode||(n===8?'storm':'ink'),E.freeCount());};
  /* ---------- строка пролога вместо полосы босса ---------- */
  E.prog=n=>{if(ES.prog!=null)return ES.prog;if(n===1)return candles.filter(c=>!c.lit).length/candles.length;
    if(OLD[n]&&K5.live&&KB.maxEmb){if(KB.state==='broken')return 0.95;return Math.min(0.9,1-KB.embers/KB.maxEmb);}
    if(n===12&&K5.forge)return 0.5*K5.forge.n/Math.max(1,K5.forge.need);return 0;};
  E.bar=()=>{bb.style.display='none';const n=E.cur;if(n==null||G.cine||G.state!=='play'){K5L.hud.hide();return;}
    let sp=0,mx=0;if(OLD[n]&&OLD[n]>=2&&K5.live){sp=Math.max(0,KB.embers);mx=KB.maxEmb;}else if(ES.spes!=null){sp=ES.spes;mx=ES.spesMax;}
    K5L.hud.show(n,E.prog(n),sp,mx,E.note?E.note(n):'');};
  // камера новых стадий Лукоморья: выше и дальше обычной — видно всю поляну и Кощея; d — насколько дальше
  E.arenaCam=(on,d)=>{if(!on){W.camFn=null;return;}d=d||0;W.camFn=()=>{const hs=k5Heroes();const a=hs[0]?hs[0].pos:C,b=hs[1]?hs[1].pos:a;const mid=new V3((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);const sp=hd(a,b);
      return {pos:new V3(mid.x*0.7,mid.y+8.5+sp*0.25+d*0.6,mid.z+11+sp*0.35+d),look:new V3(mid.x*0.8,mid.y+1.2,mid.z-5),k:3};};};
  /* ---------- уход со стадии и начало стадии ---------- */
  E.leave=()=>{const n=E.cur;if(n==null)return;K5.st=0;const L=OLD[n]?E.layer[n]:E.stage[n];if(L&&L.end)try{L.end();}catch(e){console.error('k5e end',e);}
    if(E.clock)E.clock.off();W.camFn=null;K5.listen=false;K5.fight=false;ES.fight=false;clearAdds(true);natReset();if(E.pageOff)E.pageOff();for(const k in ES)delete ES[k];};
  E.go=(n,o)=>{o=o||{};E.leave();E.hintReset(o.retry?6:HINT_S);for(const p of players){p.tipT=0;}E.cur=n;K5E.cur=n;try{K5E.badge&&K5E.badge();}catch(e){}F.k5e=n;applyFree(n);
    for(let i=1;i<n;i++)if(E.done[i]||o.warp)E.sky.add(i,false);
    // прыжок к стадии: имена — как после частей Сказа (начало — после 3, помощник — после 7, Прошка — после 11)
    if(o.warp){G.flags.names=Object.assign(G.flags.names||{},n>=4?{potap:true}:{},n>=8?{yosha:true}:{},n>=12?{proshka:true}:{});}
    if(E.isHub(n)&&E.hub)E.hub(n);W.pauseLine=(E.PAUSE&&E.PAUSE[n])||W.pauseLine;
    if(OLD[n]){stageStart(OLD[n],!!o.retry);const L=E.layer[n];if(L&&L.start)L.start(o);}
    else{const S=E.stage[n];if(S&&S.start)S.start(o);}
    if(CLOCK.indexOf(n)>=0&&E.clock)E.clock.on(n);E.music();E.bar();K5L.hud.hide();
    // небо по стадиям: гроза — только в стадии 8; на заре — светло
    {const ST={8:1,9:0.4,10:0.15,11:0.55,12:0.2};if(window.k5StormSet)k5StormSet(ST[n]||0,!OLD[n]);}};
  // стадия пройдена: строка встаёт золотом, через миг — переход
  E.won=n=>{if(E.cur!==n||E.done[n]&&E.wonT===n)return;E.done[n]=true;E.wonT=n;K5.fight=false;ES.fight=false;K5.listen=false;if(E.clock)E.clock.off();
    E.sky.add(n,true);SFX.horn&&SFX.horn();banner(K5L.LINES[n],'#ffd76a',3.2,'строка вернулась в сказку');K5L.hud.hide();E.log('won'+n);
    later(1.4,()=>{if(E.cur===n)E.after(n);});};
  E.after=n=>{switch(n){
    case 1:trans1();break;                                  // купол лопнул, ключи → стадия 2
    case 2:E.cine.mist(()=>E.go(3));break;                  // Кощей напускает туман
    case 3:E.cine.tear(()=>skaz1());break;                  // «в сказки!» — листы-страницы; Сказ: начало → стадия 4
    case 4:case 5:case 6:E.pageHome(n,()=>E.go(n+1));break; // поездка домой → следующая страница
    case 7:E.pageHome(7,()=>trans2());break;                // на Горыныче домой → буря (trans2 → Сказ: помощник → trans2b → стадия 8)
    case 8:trans3();break;                                  // меч → стадия 9
    case 9:E.cine.gold(()=>E.go(10));break;                 // «над златом чахнет»
    case 10:E.cine.falseDeath(()=>E.go(11));break;          // великан рассыпался… и чернила снова
    case 11:trans4();break;                                 // игла → застёжка → стадия 12
    case 12:E.repka(()=>finale());break;}};                 // «Тянем-потянем», потом сцена «Цепь» и конец Сказа
  E.flow=k=>{const nx={intro:1,trans1:2,skaz1:4,trans2b:8,trans3:9,lift:12}[k];if(nx)E.go(nx);};
  E.oldWin=n=>{const e=EP[n];if(e)E.won(e);};
  E.lose=(msg)=>{if(!ES.fight)return;ES.fight=false;const n=E.cur;E.fails[n]=(E.fails[n]||0)+1;const f=$('flash');if(f){f.style.transition='opacity .6s';f.style.opacity=1;}
    say('zven',msg||'Сбился сказ — беда невелика:<br>Начнём сначала, с этого листка!',3.4,true);later(1.4,()=>{if(f)f.style.opacity=0;if(E.cur===n)E.go(n,{retry:true});});};
  E.log=t=>{(E.logs=E.logs||[]).push(t);};
  /* ---------- общий шаг: тики новых стадий, слоёв и Лукоморья ---------- */
  W.updates.push(dt=>{const n=E.cur;if(n==null)return;if(E.hintLeft>0&&!G.cine&&!G.ui&&!G.trans&&G.state==='play'&&!titleOn())E.hintLeft-=dt;
    if(!K5.live&&KB.alive){KB.cd=Math.max(KB.cd||0,2);if(KB.state==='ready'||KB.state==='wind'||KB.state==='strike')KB.state='k5off';}   // невидимый Кощей вне своих стадий не бьёт
    if(E.hubTick)try{E.hubTick(dt);}catch(e){console.error('k5e hub',e);}
    if(!G.cine){const L=OLD[n]?E.layer[n]:E.stage[n];if(L&&L.tick)try{L.tick(dt);}catch(e){console.error('k5e tick '+n,e);}
      // новые стадии: все четверо клубочками — стадия заново
      if(!OLD[n]&&ES.fight&&HEROES.length&&HEROES.every(h=>!!h._down||(h.active&&players[h.player].downed)))E.lose('Все четверо — клубочки!<br>Начнём сначала, с этого листка!');}
    if(Math.floor(G.time*4)!==E.bt){E.bt=Math.floor(G.time*4);if(!OLD[n]||!K5.fight)E.bar();}});
  /* ---------- цели над полем ---------- */
  E.goal=pi=>{const n=E.cur;if(n==null)return 'Битва с Кощеем';const L=OLD[n]?E.layer[n]:E.stage[n];const own=L&&L.goal?L.goal(pi):'';
    if(OLD[n]&&K5.fight)return (own?own+'<br>':'')+'<small>'+objText(pi)+'</small>';return own||K5L.LINES[n];};
  E.targets=pi=>{const n=E.cur;const L=OLD[n]?E.layer[n]:E.stage[n];if(L&&L.targets)return L.targets(pi);return OLD[n]?objTg(pi):[];};
  for(const pi of[0,1])W.objectives[pi]=[O(()=>E.goal(pi),()=>F.stage==='chain',()=>E.targets(pi))];
  /* ---------- начало уровня: пролог (полёт) → вступление на Лукоморье → стадия 1; или прыжок к выбранной стадии ---------- */
  // состояние мира «после вступления»: Кощей у дуба, тетрадка на камне, купол (стадия 1)
  E.prep=()=>{W.anims.length=0;KA.reset();KS.g.visible=true;KS.g.position.copy(KP);KS.g.rotation.y=0;KS.armR.rotation.x=0;book.g.visible=true;book.g.userData.free=true;
    book.g.position.set(-3.5,1.0,-19);book.g.rotation.set(0,0,0);dome.visible=true;dome.scale.setScalar(1);gor.g.position.y=-0.6;gor.g.scale.y=0.75;W.clampR={x:C.x,z:C.z,r:R};Z.mode='lead';};
  E.start=()=>{K5.auto=true;const n=K5E.startAt|0;
    if(n===0&&E.prologue){E.prologue(()=>{E.cine.intro(()=>{E.prep();E.go(1);});});return;}
    E.prep();if(n===1){E.cine.intro(()=>{E.prep();E.go(1);});return;}
    for(let i=1;i<n;i++)E.done[i]=true;E.go(n,{warp:true});};
  // для ботов и отладки
  W.dbg5e=()=>({E,ES,K5,KB,KS,F,candles,C,R,OAK,KP,ANV,stageStart,stageWin,heroesHome,clearAdds,k5Zone,K5L,V3,THREE,light:()=>({bg:scene.background.getHexString(),fog:scene.fog?scene.fog.color.getHexString()+' '+scene.fog.near.toFixed(0)+'-'+scene.fog.far.toFixed(0):'-',amb:amb.intensity.toFixed(2),sun:sun.intensity.toFixed(2),storm:(K5.storm||0).toFixed(2),vig:(document.getElementById('k5storm')||{style:{}}).style.opacity,filt:(renderer.domElement.style.filter||'')})});
