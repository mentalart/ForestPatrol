/* ============================== РЕЛИЗ · ЗВУК: ИНСТРУМЕНТЫ И ЗАНОВО ОЗВУЧЕННЫЕ ЭФФЕКТЫ РОЛИКОВ ============================== */
// Всё синтезируется в браузере и идёт через общий регулятор «Звуки» (master). Добавлены шумовые источники с фильтрами,
// реверберация (сгенерированный импульс), панорама. Эффекты, которые звучат в роликах (свист, удар, звон, брызги, кузня, рожок…),
// озвучены заново: слоями вместо одного осциллятора.
const AUD={noise:null,rev:null,revIn:null};FIN.aud=AUD;
AUD.ready=()=>{if(!AC||!master)return false;if(AUD.noise)return true;
  const n=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;AUD.noise=n;
  const len=Math.floor(AC.sampleRate*1.9),ir=AC.createBuffer(2,len,AC.sampleRate);for(let c=0;c<2;c++){const x=ir.getChannelData(c);for(let i=0;i<len;i++){const k=i/len;x[i]=(Math.random()*2-1)*Math.pow(1-k,3.2)*(k<0.01?k/0.01:1);}}
  AUD.rev=AC.createConvolver();AUD.rev.buffer=ir;AUD.revIn=AC.createGain();AUD.revIn.gain.value=1;const wet=AC.createGain();wet.gain.value=0.55;AUD.revIn.connect(AUD.rev);AUD.rev.connect(wet);wet.connect(master);return true;};
// выход: сухой в master, часть — в реверберацию, с панорамой
AUD.out=(node,wet,pan)=>{let n=node;if(pan&&AC.createStereoPanner){const p=AC.createStereoPanner();p.pan.value=clamp(pan,-1,1);n.connect(p);n=p;}n.connect(master);if(wet){const g=AC.createGain();g.gain.value=wet;n.connect(g);g.connect(AUD.revIn);}return n;};
AUD.env=(t,a,d,v,shape)=>{const g=AC.createGain();g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(0.0002,v),t+Math.max(0.003,a));if(shape==='hold')g.gain.setValueAtTime(v,t+a+d*0.6);g.gain.exponentialRampToValueAtTime(0.0001,t+a+d);return g;};
// шум через фильтр с проходом частоты f0→f1 (и f2 в конце)
AUD.nz=(o)=>{if(!AUD.ready())return;const t=AC.currentTime+(o.at||0),d=o.d||0.4,s=AC.createBufferSource();s.buffer=AUD.noise;s.loop=true;const f=AC.createBiquadFilter();f.type=o.type||'bandpass';f.Q.value=o.q||1.2;
  f.frequency.setValueAtTime(o.f0||800,t);if(o.f1)f.frequency.exponentialRampToValueAtTime(o.f1,t+(o.f2?d*0.5:d));if(o.f2)f.frequency.exponentialRampToValueAtTime(o.f2,t+d);
  const g=AUD.env(t,o.a||0.02,d,o.v||0.1,o.shape);s.connect(f);f.connect(g);let p=null;
  if(o.pan0!=null&&AC.createStereoPanner){p=AC.createStereoPanner();p.pan.setValueAtTime(o.pan0,t);p.pan.linearRampToValueAtTime(o.pan1!=null?o.pan1:o.pan0,t+d);g.connect(p);AUD.out(p,o.wet);}else AUD.out(g,o.wet);
  s.start(t,Math.random()*1.5);s.stop(t+d+0.1);};
// тон: тип, скольжение f0→f1, вибрато, тремоло
AUD.osc=(o)=>{if(!AUD.ready())return;const t=AC.currentTime+(o.at||0),d=o.d||0.3,x=AC.createOscillator(),F=f=>clamp(f,20,16000);x.type=o.type||'sine';x.frequency.setValueAtTime(F(o.f0),t);if(o.f1)x.frequency.exponentialRampToValueAtTime(F(o.f1),t+(o.glide||d));
  let src=x;const g=AUD.env(t,o.a||0.01,d,o.v||0.1,o.shape);
  if(o.vib){const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=o.vibF||6;lg.gain.value=o.f0*o.vib;l.connect(lg);lg.connect(x.frequency);l.start(t);l.stop(t+d+0.05);}
  if(o.lp){const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(o.lp,t);if(o.lp1)f.frequency.exponentialRampToValueAtTime(o.lp1,t+d);f.Q.value=o.q||0.8;src.connect(f);src=f;}
  if(o.trem){const tg=AC.createGain(),l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=o.trem;lg.gain.value=0.5;tg.gain.value=0.5;l.connect(lg);lg.connect(tg.gain);src.connect(tg);src=tg;l.start(t);l.stop(t+d+0.05);}
  src.connect(g);AUD.out(g,o.wet,o.pan);x.start(t);x.stop(t+d+0.05);};
// колокольчик: неровные обертоны, у каждого свой спад
AUD.bell=(f,o)=>{o=o||{};const v=o.v||0.08,d=o.d||1.1;[[1,1],[2.76,0.45],[5.4,0.22],[8.93,0.1]].forEach(([m,a],i)=>{if(f*m<15000)AUD.osc({f0:f*m,d:d/(1+i*0.7),v:v*a,a:0.004,at:o.at,wet:o.wet==null?0.4:o.wet,pan:o.pan});});};
AUD.thump=(o)=>{AUD.osc({f0:o.f0||130,f1:o.f1||42,d:o.d||0.35,v:o.v||0.3,a:0.004,at:o.at});};
// ---------- эффекты роликов, озвученные заново ----------
Object.assign(SFX,{
  whoosh:()=>{AUD.nz({f0:260,f1:2600,f2:420,d:0.75,q:1.6,v:0.14,a:0.2,pan0:-0.5,pan1:0.5,wet:0.25});AUD.osc({f0:180,f1:620,d:0.6,v:0.02,type:'triangle',glide:0.35});},
  crash:()=>{AUD.thump({f0:150,f1:50,d:0.3,v:0.26});AUD.nz({type:'lowpass',f0:3200,f1:400,d:0.35,v:0.16,a:0.004,wet:0.2});for(let i=0;i<6;i++)AUD.osc({type:'square',f0:rand(180,520),f1:rand(90,160),d:0.07,v:0.035,at:0.03+i*rand(0.04,0.07),lp:1800});},
  thud:()=>{AUD.thump({f0:120,f1:45,d:0.28,v:0.32});AUD.nz({type:'lowpass',f0:600,f1:160,d:0.18,v:0.1,a:0.003});},
  gate:()=>{AUD.osc({type:'sawtooth',f0:95,f1:72,d:0.65,v:0.05,lp:900,trem:22,wet:0.2});AUD.osc({type:'sawtooth',f0:190,f1:150,d:0.55,v:0.022,lp:1400,trem:17,at:0.05});AUD.thump({f0:140,f1:70,d:0.2,v:0.12,at:0.55});},
  dzin:()=>{AUD.bell(2093,{v:0.06,d:1.2,wet:0.6});AUD.bell(3136,{v:0.035,d:0.9,at:0.03,wet:0.6});AUD.bell(2637,{v:0.03,d:0.8,at:0.12,wet:0.6});AUD.nz({type:'highpass',f0:6000,d:0.5,v:0.018,a:0.01,wet:0.5});},
  keys:()=>{for(let i=0;i<8;i++)AUD.bell(rand(2600,4200),{v:0.012,d:0.35,at:i*rand(0.05,0.12),wet:0.5,pan:rand(-0.6,0.6)});},
  rip:()=>{AUD.nz({type:'highpass',f0:3200,f1:700,d:0.26,v:0.12,a:0.005,q:0.9});AUD.osc({type:'sawtooth',f0:420,f1:130,d:0.22,v:0.04,lp:1500,at:0.05});},
  splash:()=>{AUD.nz({f0:1400,f1:260,d:0.45,v:0.14,q:0.8,a:0.004,wet:0.25});for(let i=0;i<6;i++)AUD.osc({f0:rand(500,1100),f1:rand(1300,2200),d:0.06,v:0.035,at:0.05+i*rand(0.03,0.07),glide:0.05});},
  water:()=>{for(let i=0;i<5;i++)AUD.osc({f0:rand(400,800),f1:rand(1000,1800),d:0.07,v:0.05,at:i*rand(0.03,0.06),glide:0.06,wet:0.2});},
  grow:()=>{[392,494,587,784,988].forEach((f,i)=>AUD.bell(f*2,{v:0.035,d:0.7,at:i*0.1,wet:0.5}));AUD.nz({f0:400,f1:2400,d:1.1,v:0.035,a:0.5,q:0.7,wet:0.4});},
  link:()=>{[784,988,1318].forEach((f,i)=>AUD.bell(f*2,{v:0.045,d:0.9,at:i*0.07,wet:0.5}));AUD.osc({f0:1318,d:0.5,v:0.03,type:'triangle',at:0.2,wet:0.4});},
  ok:()=>{[523,659,784,1046].forEach((f,i)=>{AUD.osc({type:'triangle',f0:f,d:0.28,v:0.07,at:i*0.08,wet:0.25});AUD.bell(f*2,{v:0.015,d:0.4,at:i*0.08});});},
  bell:()=>{AUD.bell(1046,{v:0.1,d:1.6,wet:0.5});AUD.bell(1568,{v:0.04,d:1.2,at:0.02,wet:0.5});},
  knot:()=>{AUD.bell(990*1.5,{v:0.05,d:0.6});AUD.bell(1480*1.5,{v:0.04,d:0.6,at:0.1});AUD.osc({f0:990,f1:1480,d:0.3,v:0.04,glide:0.12});},
  flower:()=>{AUD.bell(1760,{v:0.03,d:0.6,wet:0.5});AUD.osc({f0:1200,f1:1800,d:0.15,v:0.03});},
  wave:()=>{AUD.nz({type:'lowpass',f0:250,f1:900,f2:200,d:1.8,v:0.08,a:0.6,q:0.6,wet:0.3});},
  horn:()=>{[233,349,466].forEach((f,i)=>{AUD.osc({type:'sawtooth',f0:f,d:0.95,v:0.05,a:0.08,lp:600,lp1:1800,at:i*0.05,wet:0.35,vib:0.006,vibF:5});});},
  hammer:()=>{AUD.thump({f0:130,f1:60,d:0.2,v:0.26});[1,2.4,3.9,5.7].forEach((m,i)=>AUD.osc({f0:620*m,d:0.5/(1+i*0.6),v:0.05/(1+i),a:0.002,wet:0.35}));AUD.nz({type:'highpass',f0:4000,d:0.08,v:0.08,a:0.002});},
  latch:()=>{AUD.nz({type:'highpass',f0:2500,d:0.04,v:0.12,a:0.002});AUD.thump({f0:240,f1:120,d:0.18,v:0.18,at:0.05});},
  thwip:()=>{AUD.nz({f0:600,f1:3200,d:0.12,v:0.1,q:2,a:0.004});AUD.osc({type:'triangle',f0:900,f1:300,d:0.12,v:0.06});},
  toss:()=>{AUD.osc({type:'triangle',f0:300,f1:950,d:0.3,v:0.12,glide:0.25});AUD.nz({f0:500,f1:2000,d:0.3,v:0.05,q:1.4});},
  swish:()=>{AUD.nz({f0:500,f1:2400,d:0.14,v:0.08,q:1.6,a:0.01});}});
