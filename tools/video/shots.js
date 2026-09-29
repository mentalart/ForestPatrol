// Шоты трейлера: по порядку. dur — секунды; music — трек фоновой музыки на время шота (при записи звука);
// setup — код в странице (готовит уровень, героев, режим автопилота); mode — автопилот (tools/video/autopilot.js): brawl, forward, song33, s54, none.
// Помощники в странице (задаются в trailer.js): L(id) — уровень с нуля, CINE(id,t) — вступительный ролик на секунде t, PLAY(id,o) — пропустить ролики,
// дать уровню устояться, o.at — перенести героев, o.apart — развести (два экрана), o.solo — одиночный режим, o.foes — позвать мороков к героям.
module.exports=[
  // ---------- Мир 1 · Дремучий лес ----------
  {id:'w1_hut',dur:5,music:'w1',setup:"CINE('1-1',1.2)",mode:'none'},
  {id:'w1_yard',dur:5,music:'w1',setup:"PLAY('1-1',{foes:['kiki','kiki'],near:true})",mode:'brawl'},
  {id:'w1_split',dur:5,music:'w1',setup:"PLAY('1-2',{apart:true,foes:['morok','leshonok'],near:true})",mode:'brawl'},
  {id:'w1_kolobok',dur:6,music:'w1',setup:"PLAY('1-3',{settle:4})",mode:'forward',arg:{jump:true}},
  {id:'w1_leshy',dur:5,music:'w1',setup:"CINE('1-4',7.5)",mode:'none'},
  {id:'w1_wheel_solo',dur:5,music:'w1',setup:"PLAY('1-5',{solo:true,foes:['thread'],near:true})",mode:'brawl'},
  {id:'w1_boss',dur:6,music:'boss',setup:"PLAY('1-B',{settle:3})",mode:'brawl'},
  // ---------- Мир 2 · Подводный Китеж ----------
  {id:'w2_sadko',dur:4,music:'w2',setup:"CINE('2-1',2.5)",mode:'none'},
  {id:'w2_pike',dur:5,music:'w2',setup:"PLAY('2-1',{foes:['shchuka','rak'],near:true})",mode:'brawl'},
  {id:'w2_whale',dur:5,music:'w2',setup:"CINE('2-2',4)",mode:'none'},
  {id:'w2_rybka',dur:4,music:'w2',setup:"CINE('2-3',3)",mode:'none'},
  {id:'w2_inside',dur:4,music:'w2',setup:"PLAY('2-4',{solo:true,settle:2})",mode:'forward',arg:{jump:true}},
  {id:'w2_boss',dur:6,music:'boss',setup:"PLAY('2-B',{settle:3})",mode:'brawl'},
  // ---------- Мир 3 · Небесное царство ----------
  {id:'w3_feather',dur:5,music:'w3',setup:"PLAY('3-1',{solo:true,foes:['ten','tucha'],near:true})",mode:'brawl'},
  {id:'w3_song',dur:6,music:null,setup:"PLAY('3-3',{settle:0.2})",mode:'song33'},
  {id:'w3_ship',dur:5,music:'w3',setup:"CINE('3-4',3)",mode:'none'},
  {id:'w3_geese',dur:5,music:'w3',setup:"CINE('3-5',2)",mode:'none'},
  {id:'w3_boss',dur:6,music:'boss',setup:"PLAY('3-B',{settle:3})",mode:'brawl'},
  // ---------- Мир 4 · Огненная Смородина ----------
  {id:'w4_forge',dur:4,music:'w4',setup:"CINE('4-1',2)",mode:'none'},
  {id:'w4_lava_split',dur:5,music:'w4',setup:"PLAY('4-2',{apart:true,foes:['lizard','zmeenysh'],near:true})",mode:'brawl'},
  {id:'w4_barge',dur:5,music:'w4',setup:"CINE('4-3',3)",mode:'none'},
  {id:'w4_plow_solo',dur:4,music:'w4',setup:"PLAY('4-4',{solo:true,foes:['bolvan'],near:true})",mode:'brawl'},
  {id:'w4_bridge',dur:4,music:'w4',setup:"CINE('4-5',2.5)",mode:'none'},
  {id:'w4_boss',dur:6,music:'boss',setup:"PLAY('4-B',{settle:3})",mode:'brawl'},
  // ---------- Мир 5 · Остров Буян ----------
  {id:'w5_scare',dur:5,music:'w5',setup:"PLAY('5-1',{foes:['pugalo','hameley'],near:true})",mode:'brawl'},
  {id:'w5_likho',dur:4,music:'w5',setup:"CINE('5-1',9)",mode:'none'},
  {id:'w5_duck',dur:5,music:'w5',setup:"CINE('5-3',2)",mode:'none'},
  {id:'w5_kalinka',dur:6,music:null,setup:"PLAY('5-4',{settle:2.5})",mode:'s54'},
  {id:'w5_koschei',dur:5,music:'boss',setup:"PLAY('5-B1',{settle:2})",mode:'brawl'},
  {id:'w5_final',dur:5,music:'epi',setup:"CINE('5-B2',5)",mode:'none'},
  // ---------- Лукоморье, Застава, эпилог ----------
  {id:'hub_kot',dur:5,music:'hub',setup:"PLAY('luko',{settle:1.5})",mode:'forward'},
  {id:'zastava',dur:4,music:'hub',setup:"PLAY('z-i',{settle:2})",mode:'brawl'},
  {id:'epi',dur:5,music:'epi',setup:"CINE('epi',3)",mode:'none'}];
