/* ============================== РЕЛИЗ · ЗАПУСК ============================== */
{const _loadLevel=loadLevel;loadLevel=function(i){_loadLevel(i);buildHorizon();scatterDecor();FIN.afterLoadHero();if(FIN.afterLoad)FIN.afterLoad(i);};}
function finBoot(){if(/[?&]debug/.test(location.search)&&!/[?&]hq/.test(location.search))FIN.set.quality='low';   // тесты-боты: быстрая графика, если не попросили ?hq
  FIN.applyQuality();FIN.applySettings();loadLevel(0);G.state='menu';FIN.titleOn=true;document.body.classList.add('fin-title');
  if(/[?&]debug/.test(location.search))FIN.openTitle(true);else FIN.splash();}
