//@@ wait=300
// замер громкости шин музыки/звуков/голоса (docs/34 §2.4, docs/33 п. 6): анализаторы на JM.mus/sfx/vox и выходе лимитера JM.lim (ZC.FIN.juiceW.mix)
// — только в боте, игровой код не меняется. «Храповик»: пороги — текущие значения ±TOL дБ; цель стандарта (разрыв голос↔музыка ≤ 24 дБ RMS) печатается, не краснит.
// Игровые SFX G4S.roar/rumble и бормотание вне области видимости: рык Горыныча — копия рецепта late_98_gor_lava.js через ZC.FIN.aud (при правке рецепта обновить).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.addEventListener('error',e=>window._errs.push(String(e.message).slice(0,200)));
ZC.start();ZC.G.manual=true;ZC.tick(2);'start'
//@@ key=Space wait=1200
'audio='+ZC.FIN.audioState()
//@@ wait=300
ZC.startFrom(ZC.LV('luko'));ZC.G.manual=true;ZC.tick(30);
window.AL={};
window.AI=(()=>{const F=ZC.FIN,M=F.juiceW&&F.juiceW.mix;if(!M)return 'noMix';
  try{F.audioState();F.vox.audio();}catch(e){}
  if(!M.ready||!M.lim)return 'noAC';const AC=M.lim.context;
  const mk=n=>{const a=AC.createAnalyser();a.fftSize=2048;a.smoothingTimeConstant=0;n.connect(a);return a;};
  const AN={mus:mk(M.mus),sfx:mk(M.sfx),vox:mk(M.vox),all:mk(M.lim)},B=new Float32Array(2048);
  window.AC_=AC;window.AM=M;window.AN=AN;
  window.reset=()=>{for(const k in AN)AL[k]={pk:0,ss:0,n:0};};reset();
  setInterval(()=>{for(const k in AN){AN[k].getFloatTimeDomainData(B);let pk=0,ss=0;for(let i=0;i<2048;i++){const v=B[i],a=v<0?-v:v;if(a>pk)pk=a;ss+=v*v;}const r=AL[k];if(r.pk<pk)r.pk=pk;r.ss+=ss/2048;r.n++;}},20);
  const db=v=>v>1e-6?+(20*Math.log10(v)).toFixed(1):-120;
  window.get=()=>{const o={};for(const k in AL){const r=AL[k];o[k]=[db(r.pk),db(Math.sqrt(r.ss/Math.max(1,r.n)))];}return o;};
  window.sleep=ms=>new Promise(r=>setTimeout(r,ms));
  // стабильность цикла отрисовки: при нагрузке rAF встаёт, и музыка занижается на десятки дБ
  window.fps=()=>new Promise(res=>{let n=0;const t0=performance.now();const f=()=>{n++;if(performance.now()-t0<1000)requestAnimationFrame(f);else res(n);};requestAnimationFrame(f);});
  return 'ok '+AC.state;})();
AI
//@@
(async()=>{if(AI!=='ok running'&&AI!=='ok suspended')return 'skip '+AI;
  window.FPS=await fps();return 'fps='+window.FPS+' (справочно: музыку тикает бот)';})()
//@@
// музыка: темы боссов по 4,5 с, замер после 1,5 с (нарастание при старте)
(async()=>{if(!window.get)return 'skip';const F=ZC.FIN,TR=F.music.TR||{};const out={};
  const names=['boss','jxBoss2','jxBoss3','k1b1','k1b2','k1b3','k1b4','vod1','vod2','vod3','vod4','sol1','sol2','sol3','sol4'];
  // темы этапов регистрируются при загрузке боссовых уровней; музыку тикаем сами (в игре её тикает render, а он встаёт под нагрузкой)
  for(const id of ['1-B','2-B','3-B']){try{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(20);
    const key={'2-B':'vod1','3-B':'sol1'}[id];if(key)try{F.warp('boss');}catch(e){}for(let i=0;key&&i<60*12&&!TR[key];i++){if(ZC.G.cine)ZC.skip();ZC.tick(1);}}catch(e){}}
  if(!window.MT)window.MT=setInterval(()=>{try{F.music.tick();}catch(e){}},16);
  // нейтральный микс: ни приглушения, ни «тишины» стингера, ни ролика (их гасит render, а он встаёт под нагрузкой) — иначе музыка плавает на 10 дБ
  const neutral=()=>{const J=F.juiceW;try{ZC.G.cine=null;J.calmT=0;J.hushT=0;if(F.juice)F.juice.duckT=0;}catch(e){}AM.mus.gain.cancelScheduledValues(0);AM.mus.gain.value=1;};
  neutral();F.music.play(null);await sleep(400);
  for(const n of names){if(!TR[n]){out[n]=null;continue;}F.music.play(n);neutral();await sleep(1500);neutral();reset();await sleep(3000);out[n]=get().all;F.music.play(null);await sleep(500);}
  window.MUS=out;return JSON.stringify(out);})()
//@@
// звуки боссов: удар (для сравнения), рык Горыныча (копия рецепта), «гул», рык Водяного, свист Соловья, бормотание без записи
(async()=>{if(!window.get)return 'skip';const F=ZC.FIN,A=F.aud,out={};
  const run=async(n,f,ms)=>{reset();try{f();}catch(e){out[n]=null;return;}await sleep(ms);out[n]=get().all;};
  const ok=A&&A.ready&&A.ready();
  if(ok){
    await run('g4roar',()=>{[66,73,101].forEach((f,i)=>A.osc({type:'sawtooth',f0:f,f1:f*1.4,glide:0.45,d:2.1,v:0.085,a:0.1,lp:600,lp1:2400,trem:23+i*6,vib:0.035,vibF:6,wet:0.5,at:i*0.02}));
      A.nz({f0:380,f1:1500,f2:520,d:2.2,q:1.2,v:0.17,a:0.12,wet:0.5,shape:'hold'});A.nz({type:'highpass',f0:2600,d:1.9,v:0.035,a:0.35,wet:0.45});A.thump({f0:64,f1:28,d:1.8,v:0.32});},3200);
    await run('g4rumble',()=>{A.nz({type:'lowpass',f0:160,f1:520,f2:140,d:2.6,q:0.7,v:0.22,a:0.3,wet:0.35});A.thump({f0:90,f1:34,d:1.2,v:0.3,at:0.1});},3200);
  }
  if(F.k2fx&&F.k2fx.roar)await run('k2roar',()=>F.k2fx.roar(1),3000);
  if(F.tone){await run('solovei_svist',()=>F.tone(1500,0.6,'sine',0.13,2200),1000);}
  await run('babble',()=>F.vox.say('koschei','Опять заблудились? Ну-ка, где я? Довольно сказок!',2),2800);
  window.SFXR=out;return JSON.stringify(out);})()
//@@
// записанные голоса боссов: воспроизведение как voxStart (источник → gain(e.gain)×0,9 → шина vox)
(async()=>{if(!window.get)return 'skip';const F=ZC.FIN,AC=AC_,out={};
  const ids=['5-B2_k20','5-B2_k27','5-B2_k13','5-B2_k23','5-B2_k15','5-B2_k29','5-B2_015','4-B_023','4-B_001','4-B_010','3-B_001','3-B_005','2-B_001','1-B_007','1-B_008','5-B1_004','5-B2_002','5-B2_003'];
  const dec=e=>new Promise(res=>{try{if(e.buf)return res(e.buf);const raw=e.b64?Uint8Array.from(atob(e.b64),c=>c.charCodeAt(0)).buffer:null;if(!raw)return res(null);AC.decodeAudioData(raw,b=>res(b),()=>res(null));}catch(x){res(null);}});
  for(const id of ids){const e=F.vox.lines.find(x=>x.id===id);if(!e){out[id]=null;continue;}const b=await dec(e);if(!b){out[id]=null;continue;}
    reset();const s=AC.createBufferSource();s.buffer=b;const g=AC.createGain();g.gain.value=(e.gain||1)*0.9;s.connect(g);g.connect(AM.vox);s.start();
    await sleep(Math.min(4200,b.duration*1000+200));out[id]=get().all;try{s.stop();}catch(x){}}
  window.VOXR=out;return JSON.stringify(out);})()
//@@
// таблица и «храповик»: порог — текущее значение ±4 дБ на шум (повторные прогоны различаются на 1–3 дБ). Значения [пик, RMS] выхода лимитера, dBFS.
// Текущее (3 прогона): музыка RMS −52…−42, звуки боссов пик −25…−22 / RMS −41…−36, голоса пик −2…−1,4 / RMS −19…−14, разрыв голос↔музыка боя ≈ 29–31 дБ.
(()=>{if(!window.MUS)return 'ok tfin_audiolevel (нет звука: '+(window.AI||'?')+') '+JSON.stringify({errs:_errs.slice(0,3)});
  const bad=[],lines=[],f1=v=>v==null?'   —  ':(''+v).padStart(6);
  const chk=(n,v,pkMax,rmsLo,rmsHi)=>{if(!v)return;if(pkMax!=null&&v[0]>pkMax)bad.push(n+' пик '+v[0]+' > '+pkMax);if(v[1]<rmsLo||v[1]>rmsHi)bad.push(n+' RMS '+v[1]+' вне ['+rmsLo+'; '+rmsHi+']');};
  for(const n in MUS){lines.push(('music:'+n).padEnd(22)+f1(MUS[n]&&MUS[n][0])+f1(MUS[n]&&MUS[n][1]));chk('music:'+n,MUS[n],-14,-57,-38);}
  for(const n in SFXR){lines.push(('sfx:'+n).padEnd(22)+f1(SFXR[n]&&SFXR[n][0])+f1(SFXR[n]&&SFXR[n][1]));chk('sfx:'+n,SFXR[n],-18,-45,-30);}   // стандарт docs/33 п. 6: пик боссового SFX ≤ −20 (сейчас −22…−25, запас до порога 4 дБ)
  for(const n in VOXR){lines.push(('vox:'+n).padEnd(22)+f1(VOXR[n]&&VOXR[n][0])+f1(VOXR[n]&&VOXR[n][1]));chk('vox:'+n,VOXR[n],-0.5,-24,-10);}
  const boss=MUS.boss&&MUS.boss[1],vox=Object.values(VOXR).filter(Boolean).map(v=>v[1]),gap=vox.length&&boss!=null?+(Math.min(...vox)-boss).toFixed(1):null;
  const spread=g=>{const a=g.filter(n=>MUS[n]).map(n=>MUS[n][1]);return a.length>1?+(Math.max(...a)-Math.min(...a)).toFixed(1):null;};
  const sp={k1b:spread(['k1b1','k1b2','k1b3','k1b4']),vod:spread(['vod1','vod2','vod3','vod4']),sol:spread(['sol1','sol2','sol3','sol4'])};
  if(gap!=null&&gap>35)bad.push('разрыв голос↔музыка '+gap+' > 35');for(const k in sp)if(sp[k]!=null&&sp[k]>9)bad.push('разброс этапов '+k+' '+sp[k]+' > 9');
  if(_errs.length)bad.push('ошибки: '+_errs.slice(0,2).join(' | '));
  return (bad.length?'FAIL tfin_audiolevel '+bad.join('; '):'ok tfin_audiolevel')+'\nTABLE(dBFS, пик/RMS, выход лимитера)\n'+lines.join('\n')+'\nGOAL разрыв голос↔музыка боя (RMS, мин. голос − boss) = '+gap+' дБ (цель ≤ 24, пока не красная; порог храповика 35)\nGOAL разброс этапов (RMS) '+JSON.stringify(sp)+' (цель ≤ 6; порог храповика 9)';})()
