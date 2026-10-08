;(function(){
const PR=window.PR=window.PR||{};
PR.audInit=function(){
  if(!AC)return 'noAC';
  try{jwMixInit();}catch(e){return 'nomix '+e.message;}
  if(PR.AN)return 'again state='+AC.state;
  const mk=n=>{const a=AC.createAnalyser();a.fftSize=2048;a.smoothingTimeConstant=0;n.connect(a);return a;};
  PR.AN={mus:mk(JM.mus),sfx:mk(JM.sfx),vox:mk(JM.vox),all:mk(JM.lim)};PR.AB=new Float32Array(2048);PR.AL={};
  PR.audReset=()=>{for(const k in PR.AN)PR.AL[k]={pk:0,ss:0,n:0,rmsMax:0};};PR.audReset();
  PR.AI=setInterval(()=>{for(const k in PR.AN){PR.AN[k].getFloatTimeDomainData(PR.AB);let pk=0,ss=0;for(let i=0;i<2048;i++){const v=PR.AB[i],a=v<0?-v:v;if(a>pk)pk=a;ss+=v*v;}
    const r=PR.AL[k];if(r.pk<pk)r.pk=pk;r.ss+=ss/2048;r.n++;const rm=Math.sqrt(ss/2048);if(r.rmsMax<rm)r.rmsMax=rm;}},20);
  return 'ok state='+AC.state;};
const db=v=>v>1e-6?+(20*Math.log10(v)).toFixed(1):-120;
PR.audGet=()=>{const o={};for(const k in PR.AL){const r=PR.AL[k];o[k]=[db(r.pk),db(Math.sqrt(r.ss/Math.max(1,r.n))),db(r.rmsMax)];}return o;};
PR.t=(...a)=>tone(...a);
PR.sfxs=SFX;
PR.names=()=>({mus:Object.keys(FIN.music.TR||{}),sfx:Object.keys(SFX)});
PR.snd={};
try{PR.snd.g4roar=()=>G4S.roar();PR.snd.g4rumble=()=>G4S.rumble();}catch(e){}
try{PR.snd.k2roar=()=>K2FX.roar(1);}catch(e){}
PR.babble=(w,t)=>babble(w,t);
PR.voxPlay=id=>{const e=FIN.vox.lines.find(x=>x.id===id);if(!e)return Promise.resolve('no '+id);return voxDecode(e).then(()=>{PR.audReset();return voxPlay(e)?('play dur='+(e.dur||'?')):'no-play';});};
PR.musPlay=n=>FIN.music.play(n);
})();
