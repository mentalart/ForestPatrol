/* ============================== РЕЛИЗ · 5-Б1 «КОЩЕЙ В ТЕРЕМЕ» · короткие надписи (docs/34 5Б1-2) ============================== */
// «ПРОБОЙ!» повторяется на каждом Пробое тени (≈ 17 раз за фазу): в 5-Б1 подпись «Бей скорей — добей его!» только в первый раз, дальше — одно слово.
// Остальные баннеры и подсказки боя — в proto/levels/5-B1.js (≤ 7 слов, 3,5 с × tipMul мира 5 = 5 с).
{const _bn=banner;banner=function(text,color,dur,sub){
  if(W&&W.levelId==='5-B1'&&text==='ПРОБОЙ!'){const F=W.flags;if(F.pryvSaid){sub='';dur=Math.min(dur||1.1,1.1);}else{F.pryvSaid=true;sub='Бей скорей!';dur=3.5;}}
  return _bn.call(this,text,color,dur,sub);};}
