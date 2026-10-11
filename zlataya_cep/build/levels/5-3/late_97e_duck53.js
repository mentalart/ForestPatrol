/* ============================== РЕЛИЗ · 5-3 «УТКА»: ЗВУК ПОЛЁТА — БАРАБАНЫ, ВЕТЕР ПО СКОРОСТИ, ЛИНИИ СКОРОСТИ ============================== */
// Своя тема полёта (FIN.music.TR.w5fly): тот же лад мира 5, бочка и рамочный барабан гонят вперёд, балалайка остинато, жалейка — широкая мелодия.
// Шум ветра — петля белого шума через фильтр: чем быстрее Горыныч (W.k53.GV.sp: 7 → 21), тем громче и выше; в шторм — ещё и гул.
// Разгон (тянут вместе) и рывок сквозь облачную арку — линии скорости по краям кадра (FX.speed).
FIN.music.TR.w5fly={bpm:132,root:50,sc:'mix',len:16,v:[
  {i:'pluck',oct:0,vol:0.045,seq:[[[0,.5],[0,.5],[4,.5],[0,.5],[5,.5],[0,.5],[4,.5],[2,.5]],[[1,.5],[1,.5],[5,.5],[1,.5],[6,.5],[1,.5],[5,.5],[4,.5]]]},
  {i:'flute',oct:12,vol:0.05,every:2,seq:[[[4,2],[5,1],[6,1],[7,3],[6,1],[5,2],[4,2],[2,2],[0,2]]]},
  {i:'pluck',oct:-12,vol:0.06,seq:[[[0,1],[0,1],[4,1],[4,1],[3,1],[3,1],[1,1],[4,1]]]},
  {i:'kick',drum:'x...x...x...x.x.',vol:0.08},{i:'frame',drum:'....x.......x...',vol:0.04},{i:'tamb',drum:'..x...x...x...x.',vol:0.02}]};
{const WIND={src:null,g:null,f:null};
  const windOn=()=>{if(!AC||WIND.src)return;try{const n=AC.sampleRate*2,b=AC.createBuffer(1,n,AC.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<n;i++){l=l*0.97+(Math.random()*2-1)*0.03;d[i]=l*6;}
    const s=AC.createBufferSource();s.buffer=b;s.loop=true;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=500;const g=AC.createGain();g.gain.value=0;s.connect(f);f.connect(g);g.connect(master||AC.destination);s.start();Object.assign(WIND,{src:s,g,f});}catch(e){}};
  const windOff=()=>{if(!WIND.src)return;try{WIND.g.gain.setTargetAtTime(0,AC.currentTime,0.2);const s=WIND.src;setTimeout(()=>{try{s.stop();}catch(e){}},800);}catch(e){}WIND.src=null;};
  const _b=build53;build53=function(){_b();if(FIN.music)FIN.music.play('w5fly');let spT=0;
    W.updates.push(dt=>{const K=W.k53;if(!K||!K.GV)return;const fly=W.flags.stage==='fly'&&!G.cine;if(fly)windOn();if(!WIND.src)return;const sp=K.GV.sp||10,k=clamp((sp-6)/14,0,1);
      try{WIND.g.gain.setTargetAtTime(fly?0.025+k*0.07:0,AC.currentTime,0.15);WIND.f.frequency.setTargetAtTime(380+k*1400,AC.currentTime,0.2);}catch(e){}
      spT-=dt;if(fly&&(K.GV.agreeT>1||K.GV.archT>0)&&spT<=0&&typeof FX!=='undefined'&&FX.speed){spT=0.4;FX.speed(K.GV.archT>0?1:0.7);}});
    const _ol=W.onLeave;W.onLeave=()=>{windOff();if(FIN.music)FIN.music.play(null);if(_ol)_ol();};};}
