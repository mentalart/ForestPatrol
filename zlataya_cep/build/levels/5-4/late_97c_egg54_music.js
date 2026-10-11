/* ============================== РЕЛИЗ · 5-4 «ЯЙЦО»: «КАЛИНКА» НА ИНСТРУМЕНТАХ МУЗЫКИ ИГРЫ ============================== */
// Песня уровня играла простыми тонами (треугольник и синус). Здесь — те же ноты (MEL/BASS из proto/levels/5-4.js) на инструментах FIN.music
// (late_40_music: балалайка — pluck, гусли — harp, жалейка — flute, бубен — tamb, рамочный барабан — frame, бочка — kick, колокол — bell):
// куплет — балалайка и перебор гуслей, припев — балалайка с жалейкой на октаву выше и бубен на слабые доли, последний припев — ещё и бочка на каждую долю,
// перекличка — первый игрок «поёт» балалайкой, второй — жалейкой; последняя доля — колокол. Громкость — ползунок «Музыка».
// Музыка ещё не запущена (нет звука до первого нажатия) — простые тоны, как в прототипе.
{const _b=build54;build54=function(){_b();const M=FIN.music;if(!M||!M.inst)return;const I=M.inst,hz=M.hz;
  const plain=W.songNote;   // нет — значит прототипные тоны (onBeat сам их сыграет, если W.songNote не задан)
  W.songNote=o=>{try{if(!AC||AC.state!=='running')throw 0;const t=AC.currentTime+0.01,B=o.B,ch=o.type!=='verse',fin=o.type==='final';
      if(o.mel){const f=hz(o.mel);
        if(o.call===1)I.flute(f,t,B*0.95,0.2);
        else{I.pluck(f,t,B*(ch?0.9:1.3),0.22);if(ch)I.flute(hz(o.mel+12),t,B*0.9,0.11);}}
      I.pluck(hz(o.bass),t,B*0.9,0.18);
      if(!ch)I.harp(hz(o.bass+19),t+B*0.5,B*0.45,0.07);
      I.frame(0,t,0.1,o.i%2===0?0.14:0.07);if(ch&&o.i%2===1)I.tamb(0,t,0.1,0.09);if(fin)I.kick(0,t,0.2,0.2);
      if(o.flip)I.bell(hz(81),t,0.6,0.07);if(o.last)I.bell(hz(o.mel||81),t+B*0.5,1.6,0.16);}
    catch(e){if(plain)plain(o);else{if(o.mel){tone(mf(o.mel),0.4,'triangle',0.13);}tone(mf(o.bass),0.4,'sine',0.17);}}};};}
