/* ============================== РЕЛИЗ · ИНТЕРФЕЙС: баннер события важнее ленты с названием уровня ============================== */
{const _banner=banner;banner=function(...a){const lv=$('level');if(lv&&lv.style.opacity==='1')lv.style.opacity=0;return _banner(...a);};}
