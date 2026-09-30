// Шоты трейлера: по порядку. dur — секунды; music — трек фоновой музыки на время шота (при записи звука);
// setup — код в странице (готовит уровень, героев, режим автопилота); mode — автопилот (tools/video/autopilot.js): brawl, forward, song33, s54, k5, none.
// Помощники в странице (задаются в trailer.js): L(id) — уровень с нуля, CINE(id,t) — вступительный ролик на секунде t, PLAY(id,o) — пропустить ролики,
// дать уровню устояться, o.at — перенести героев, o.apart — развести (два экрана), o.solo — одиночный режим, o.foes — позвать мороков к героям;
// PRO(t) — пролог, ролик «Колыбельная» на секунде t; W51(часть,s) — 5-1 с нужной части; K5S(n,s) — 5-Б2, этап n, s секунд боя; K5W(n,t) — ролик после этапа n.
// final06: голоса персонажей (реплики звучат записями), щиты героев в боях, сценка с самокатом, новый 5-1 и бой с Кощеем в пять этапов.
module.exports=[
  // ---------- Пролог: Прошка несёт самокат Тишке ----------
  {id:'p_scooter',dur:6.5,music:null,setup:"PRO(14.6)",mode:'none'},
  // ---------- Мир 1 · Дремучий лес ----------
  {id:'w1_hut',dur:4,music:'w1',setup:"CINE('1-1',1.2)",mode:'none'},
  {id:'w1_yard',dur:5,music:'w1',setup:"PLAY('1-1',{foes:['kiki','kiki'],near:true})",mode:'brawl'},
  {id:'w1_split',dur:4,music:'w1',setup:"PLAY('1-2',{apart:true,foes:['morok','leshonok'],near:true})",mode:'brawl'},
  {id:'w1_kolobok',dur:5,music:'w1',setup:"PLAY('1-3',{settle:4})",mode:'forward',arg:{jump:true}},
  {id:'w1_leshy',dur:4,music:'w1',setup:"CINE('1-4',7.5)",mode:'none'},
  {id:'w1_boss',dur:5,music:'boss',setup:"PLAY('1-B',{settle:3})",mode:'brawl'},
  // ---------- Мир 2 · Подводный Китеж ----------
  {id:'w2_sadko',dur:4,music:'w2',setup:"CINE('2-1',2.5)",mode:'none'},
  {id:'w2_pike',dur:4,music:'w2',setup:"PLAY('2-1',{foes:['shchuka','rak'],near:true})",mode:'brawl'},
  {id:'w2_whale',dur:4,music:'w2',setup:"CINE('2-2',4)",mode:'none'},
  {id:'w2_rybka',dur:4,music:'w2',setup:"CINE('2-3',3)",mode:'none'},
  {id:'w2_boss',dur:5,music:'boss',setup:"PLAY('2-B',{settle:3})",mode:'brawl'},
  // ---------- Мир 3 · Небесное царство ----------
  {id:'w3_feather',dur:4,music:'w3',setup:"PLAY('3-1',{solo:true,foes:['ten','tucha'],near:true})",mode:'brawl'},
  {id:'w3_song',dur:5,music:null,setup:"PLAY('3-3',{settle:0.2})",mode:'song33'},
  {id:'w3_ship',dur:4,music:'w3',setup:"CINE('3-4',3)",mode:'none'},
  {id:'w3_boss',dur:5,music:'boss',setup:"PLAY('3-B',{settle:3})",mode:'brawl'},
  // ---------- Мир 4 · Огненная Смородина ----------
  {id:'w4_forge',dur:4,music:'w4',setup:"CINE('4-1',2)",mode:'none'},
  {id:'w4_lava_split',dur:4,music:'w4',setup:"PLAY('4-2',{apart:true,foes:['lizard','zmeenysh'],near:true})",mode:'brawl'},
  {id:'w4_barge',dur:4,music:'w4',setup:"CINE('4-3',3)",mode:'none'},
  {id:'w4_bridge',dur:4,music:'w4',setup:"CINE('4-5',2.5)",mode:'none'},
  {id:'w4_boss',dur:5,music:'boss',setup:"PLAY('4-B',{settle:3})",mode:'brawl'},
  // ---------- Мир 5 · Остров Буян ----------
  {id:'w5_island',dur:5,music:'w5',setup:"CINE('5-1',1.5)",mode:'none'},
  {id:'w5_likho',dur:4,music:'boss',setup:"W51('boss1',3)",mode:'none'},
  {id:'w5_duck',dur:4,music:'w5',setup:"CINE('5-3',2)",mode:'none'},
  {id:'w5_kalinka',dur:5,music:null,setup:"PLAY('5-4',{settle:2.5})",mode:'s54'},
  {id:'w5_terem',dur:4,music:'boss',setup:"PLAY('5-B1',{settle:2})",mode:'brawl'},
  // ---------- 5-Б2 · Кощей Бессмертный: пять этапов ----------
  {id:'k1_candles',dur:5,music:'boss',setup:"K5S(1,3)",mode:'k5'},
  {id:'k3_storm',dur:5,music:'boss',setup:"K5S(3,3)",mode:'k5'},
  {id:'k3_sword',dur:3.8,music:'boss',setup:"K5W(3,0.2)",mode:'none'},
  {id:'k3_potap',dur:3.2,music:'boss',setup:"K5W(3,6.9)",mode:'none'},
  {id:'k4_sword',dur:5,music:'boss',setup:"K5S(4,3)",mode:'k5'},
  {id:'k5_anvil',dur:5,music:'boss',setup:"K5S(5,4)",mode:'k5'},
  // ---------- Лукоморье, Застава, эпилог ----------
  {id:'hub_kot',dur:4,music:'hub',setup:"PLAY('luko',{settle:1.5})",mode:'forward'},
  {id:'zastava',dur:4,music:'hub',setup:"PLAY('z-i',{settle:2})",mode:'brawl'},
  {id:'epi',dur:5,music:'epi',setup:"CINE('epi',3)",mode:'none'}];
