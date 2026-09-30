/* ============================== РЕЛИЗ final06 · 5-1 «СУНДУК НА ДУБЕ»: НОВЫЕ ЖИТЕЛИ ОСТРОВА В РОЛИКАХ ============================== */
// Лебедь, Голова, белка и зеркальце Кощея — в реестре персонажей (late_83): камера роликов наезжает на говорящего и вставляет его
// крупный план, персонаж дышит и кивает, а «вырез перед героями» (late_88) его не прорезает.
{const wr=(f,id,fix)=>function(){const o=f.apply(this,arguments);if(fix)fix(o);return regNpc(o,id);};
  makeSwan5=wr(makeSwan5,'lebed');makeBelka5=wr(makeBelka5,'belka');makeMirror5=wr(makeMirror5,'zerk');
  makeGolova5=wr(makeGolova5,'golova',o=>{o.head=o.face;});}
