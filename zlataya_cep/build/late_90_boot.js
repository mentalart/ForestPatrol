/* ============================== РЕЛИЗ · ЗАПУСК ============================== */
// final03: после постройки — блики глаз, одевание мира (кит, планы глубины, scatter), Synty-проход по мешам, затем пачки статики
{const _loadLevel=loadLevel;loadLevel=function(i){_loadLevel(i);buildHorizon();FIN.afterLoadHero();if(FIN.dressWorld)FIN.dressWorld();FIN.styLevel();if(FIN.afterDress)FIN.afterDress();if(FIN.afterLoad)FIN.afterLoad(i);};}
function finBoot(){if(/[?&]debug/.test(location.search)&&!/[?&]hq/.test(location.search))FIN.set.quality='low';   // тесты-боты: быстрая графика, если не попросили ?hq
  FIN.applyQuality();FIN.applySettings();loadLevel(0);G.state='menu';FIN.titleOn=true;document.body.classList.add('fin-title');
  if(/[?&]debug/.test(location.search))FIN.openTitle(true);else FIN.splash();}
