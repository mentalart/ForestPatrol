/* ============================== РЕЛИЗ · КИНО 4: ЗВУК РОЛИКОВ ============================== */
// Звук привязан к событиям режиссёра (CINE.on): въезд полос — «вздох» и колокольчик, выход — нисходящий звон; whip — свист с панорамой;
// шторка — мультяшные «буп»; удар — суббас и шум; hit-stop — щелчок; slow-mo — «вуумм» вниз; награда — колокольная россыпь и хлопки конфетти;
// FOV-punch — «вуф»; dolly-zoom — комичное «ууу»; эмоции героев — свистульки, «боинг», дрожь, мини-фанфара. Под роликом — тихая «воздушная» подложка.
const CA={bed:null,last:{}};
const caOk=(k,gap)=>{const t=performance.now()/1000;if(CA.last[k]&&t-CA.last[k]<gap)return false;CA.last[k]=t;return true;};
function bedOn(){if(!AUD.ready()||CA.bed)return;const s=AC.createBufferSource();s.buffer=AUD.noise;s.loop=true;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=520;f.Q.value=0.4;
  const g=AC.createGain();g.gain.value=0.0001;g.gain.exponentialRampToValueAtTime(0.022,AC.currentTime+1.2);s.connect(f);f.connect(g);g.connect(master);s.start();CA.bed={s,g,f};}
function bedOff(){const b=CA.bed;if(!b||!AC)return;CA.bed=null;const t=AC.currentTime;b.g.gain.cancelScheduledValues(t);b.g.gain.setValueAtTime(Math.max(0.0001,b.g.gain.value),t);b.g.gain.exponentialRampToValueAtTime(0.0001,t+0.9);b.s.stop(t+1);}
CINE.on('start',()=>{if(!AUD.ready())return;bedOn();if(!caOk('start',0.8))return;
  AUD.nz({type:'highpass',f0:1800,f1:5200,d:0.7,v:0.035,a:0.55,wet:0.4});[293.66,440].forEach((f,i)=>AUD.osc({type:'triangle',f0:f,d:1.4,v:0.035,a:0.45,at:0.02*i,wet:0.5,vib:0.004}));AUD.bell(1760,{v:0.03,d:1.2,at:0.45,wet:0.7});});
CINE.on('end',d=>{bedOff();if(!AUD.ready()||d.chained)return;if(d.skipped){AUD.nz({f0:3000,f1:300,d:0.22,v:0.06,q:1.4});return;}
  AUD.bell(1318,{v:0.025,d:1,wet:0.7});AUD.bell(988,{v:0.025,d:1.2,at:0.12,wet:0.7});AUD.nz({f0:1600,f1:350,d:0.8,v:0.03,a:0.2,q:0.8,wet:0.3});});
CINE.on('whip',()=>{AUD.nz({f0:420,f1:5200,f2:700,d:0.32,q:1.8,v:0.12,a:0.03,pan0:-0.8,pan1:0.8,wet:0.2});});
CINE.on('iris',d=>{if(d.dir==='open')AUD.osc({f0:300,f1:900,d:0.28,v:0.06,glide:0.22,wet:0.3});else AUD.osc({f0:900,f1:260,d:0.26,v:0.06,glide:0.22});});
CINE.on('dip',()=>{AUD.nz({type:'lowpass',f0:300,f1:1200,f2:250,d:0.5,v:0.05,q:0.6,wet:0.3});});
CINE.on('blendIn',()=>{AUD.nz({f0:300,f1:1400,d:0.8,v:0.03,a:0.35,q:0.7,wet:0.3});});
CINE.on('blendOut',()=>{AUD.nz({f0:1200,f1:300,d:0.9,v:0.025,a:0.3,q:0.7,wet:0.3});});
CINE.on('punch',d=>{if(d.deg<=-3.5&&caOk('punch',0.25)){AUD.thump({f0:95,f1:55,d:0.3,v:0.14});AUD.nz({type:'lowpass',f0:500,f1:150,d:0.25,v:0.05});}});
CINE.on('slowmo',()=>{if(!caOk('slow',0.5))return;AUD.osc({type:'sawtooth',f0:520,f1:120,d:0.7,v:0.035,lp:1800,lp1:300,glide:0.6,wet:0.6});AUD.nz({type:'lowpass',f0:1200,f1:200,d:0.8,v:0.04,wet:0.6});});
CINE.on('hitstop',()=>{if(!caOk('hs',0.12))return;AUD.nz({type:'highpass',f0:5000,d:0.03,v:0.1,a:0.001});AUD.thump({f0:80,f1:40,d:0.2,v:0.12});});
CINE.on('impact',d=>{const a=d.amp||0.2;AUD.thump({f0:140,f1:38,d:0.3+a*0.3,v:0.14+a*0.22});AUD.nz({type:'lowpass',f0:2200,f1:180,d:0.3+a*0.25,v:0.05+a*0.1,a:0.003,wet:0.25});
  if(a>=0.3)for(let i=0;i<5;i++)AUD.osc({type:'triangle',f0:rand(300,700),f1:rand(150,260),d:0.06,v:0.025,at:0.08+i*rand(0.04,0.09)});});
CINE.on('accent',d=>{if(d.type==='reward'){if(d.bad){AUD.osc({type:'triangle',f0:392,f1:311,d:0.6,v:0.05,wet:0.4});AUD.osc({type:'triangle',f0:294,f1:233,d:0.7,v:0.04,at:0.12,wet:0.4});return;}
    [1046,1175,1318,1568,1760,2093].forEach((f,i)=>AUD.bell(f,{v:0.04,d:0.9,at:i*0.055,wet:0.55,pan:(i-2.5)*0.25}));[523,659,784].forEach(f=>AUD.osc({type:'triangle',f0:f,d:0.9,v:0.035,a:0.02,at:0.3,wet:0.4}));
    for(let i=0;i<6;i++)AUD.nz({type:'highpass',f0:2500,d:0.035,v:0.07,a:0.001,at:0.05+i*rand(0.05,0.12),pan0:rand(-0.7,0.7)});}
  else if(d.type==='flash'){for(let i=0;i<5;i++)AUD.bell(rand(2400,4200),{v:0.018,d:0.6,at:i*0.04,wet:0.7,pan:rand(-0.5,0.5)});AUD.nz({type:'highpass',f0:4000,f1:8000,d:0.5,v:0.03,a:0.1,wet:0.5});}});
CINE.on('dollyzoom',()=>{AUD.osc({type:'sine',f0:220,f1:760,d:1.1,v:0.05,glide:0.9,trem:9,wet:0.4});AUD.osc({type:'triangle',f0:110,f1:380,d:1.1,v:0.03,glide:0.9});});
// эмоции героев
const EMO_SND={joy:()=>{AUD.osc({f0:560,f1:1250,d:0.28,v:0.05,glide:0.22});AUD.bell(1568,{v:0.03,d:0.6,at:0.55});},cheer:()=>{AUD.osc({f0:560,f1:1250,d:0.28,v:0.05,glide:0.22});AUD.osc({f0:600,f1:1350,d:0.28,v:0.04,glide:0.22,at:0.75});},
  hop:()=>{AUD.osc({f0:320,f1:520,d:0.22,v:0.04,vib:0.06,vibF:14});},surprise:()=>{AUD.osc({f0:480,f1:1500,d:0.4,v:0.05,glide:0.3,vib:0.02,vibF:9});},
  fear:()=>{AUD.osc({type:'triangle',f0:190,f1:170,d:0.9,v:0.05,trem:18});},pride:()=>{[784,1046,1318].forEach((f,i)=>AUD.osc({type:'square',f0:f,d:i===2?0.45:0.13,v:0.025,at:i*0.12,lp:2600,wet:0.3}));},
  tilt:()=>{AUD.osc({f0:400,f1:540,d:0.2,v:0.035});},flinch:()=>{AUD.osc({f0:260,f1:120,d:0.14,v:0.05});AUD.nz({type:'highpass',f0:3000,d:0.02,v:0.05,a:0.001});},
  droop:()=>{AUD.osc({type:'triangle',f0:420,f1:250,d:0.5,v:0.035,glide:0.45});},effort:()=>{AUD.nz({f0:700,f1:300,d:0.12,v:0.05,q:1});AUD.osc({type:'triangle',f0:200,f1:140,d:0.12,v:0.05});}};
CINE.on('emote',d=>{if(!G.cine)return;const f=EMO_SND[d.type];if(f&&caOk('emo'+d.type,0.16))f();});
{const _ll=loadLevel;loadLevel=function(i){bedOff();_ll(i);};}
