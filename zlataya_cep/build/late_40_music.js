/* ============================== РЕЛИЗ · МУЗЫКА: народные мотивы для меню, Лукоморья, каждого мира и боссов ============================== */
// Синтез в браузере: балалайка (щипок), гусли (перебор), жалейка (свирель с вибрато), бубен и барабан, бурдон.
// В ритм-уровнях своя песня — фоновая музыка там молчит; в роликах чуть тише.
FIN.music=(()=>{let bus=null,cur=null,want=null,t0=0,vox=[],loops=0,vol=FIN.set.mus,noise=null,started=false,swapT=0;
  const SC={dor:[0,2,3,5,7,9,10],mix:[0,2,4,5,7,9,10],aeo:[0,2,3,5,7,8,10],ion:[0,2,4,5,7,9,11],lyd:[0,2,4,6,7,9,11],phr:[0,1,3,5,7,8,10]};
  const hz=m=>440*Math.pow(2,(m-69)/12);
  function nb(){const b=AC.createBuffer(1,AC.sampleRate*0.5,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b;}
  function out(g){g.connect(bus);}
  function envG(t,a,d,v,lin){const g=AC.createGain();g.gain.setValueAtTime(0.0001,t);if(lin)g.gain.linearRampToValueAtTime(v,t+a);else g.gain.exponentialRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+d);return g;}
  const INST={
    pluck(f,t,d,v){const o=AC.createOscillator(),o2=AC.createOscillator(),fl=AC.createBiquadFilter(),g=envG(t,0.004,Math.max(0.25,d*1.1),v);o.type='sawtooth';o2.type='triangle';o.frequency.value=f;o2.frequency.value=f*2.004;
      fl.type='lowpass';fl.Q.value=3;fl.frequency.setValueAtTime(Math.min(9000,f*9),t);fl.frequency.exponentialRampToValueAtTime(f*1.4,t+Math.max(0.2,d));o.connect(fl);o2.connect(fl);fl.connect(g);out(g);const e=t+d*1.2+0.35;o.start(t);o2.start(t);o.stop(e);o2.stop(e);},
    harp(f,t,d,v){const o=AC.createOscillator(),o2=AC.createOscillator(),g=envG(t,0.003,1.2+d,v),g2=envG(t,0.003,0.5+d*0.4,v*0.35);o.type='triangle';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*2;
      o.connect(g);o2.connect(g2);out(g);out(g2);const e=t+d+1.4;o.start(t);o2.start(t);o.stop(e);o2.stop(e);},
    bell(f,t,d,v){const o=AC.createOscillator(),o2=AC.createOscillator(),g=envG(t,0.002,2.2,v),g2=envG(t,0.002,0.9,v*0.4);o.type='sine';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*2.76;o.connect(g);o2.connect(g2);out(g);out(g2);o.start(t);o2.start(t);o.stop(t+2.5);o2.stop(t+2.5);},
    flute(f,t,d,v){const o=AC.createOscillator(),o2=AC.createOscillator(),lfo=AC.createOscillator(),lg=AC.createGain(),g=AC.createGain();o.type='sine';o2.type='triangle';o.frequency.value=f;o2.frequency.value=f;
      lfo.frequency.value=5.1;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*0.007,t+Math.min(0.35,d*0.5));lfo.connect(lg);lg.connect(o.frequency);lg.connect(o2.frequency);
      const g2=AC.createGain();g2.gain.value=0.18;o2.connect(g2);g2.connect(g);o.connect(g);g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(v,t+0.07);g.gain.setValueAtTime(v*0.92,t+Math.max(0.08,d*0.75));g.gain.exponentialRampToValueAtTime(0.0001,t+d+0.08);
      out(g);const e=t+d+0.12;o.start(t);o2.start(t);lfo.start(t);o.stop(e);o2.stop(e);lfo.stop(e);},
    drone(f,t,d,v){for(const k of[1,1.004,0.5]){const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=f*k;g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(v*(k===0.5?0.7:0.5),t+Math.min(1.5,d*0.3));g.gain.setValueAtTime(v*(k===0.5?0.7:0.5),t+d*0.8);g.gain.linearRampToValueAtTime(0.0001,t+d);o.connect(g);out(g);o.start(t);o.stop(t+d+0.05);}},
    kick(f,t,d,v){const o=AC.createOscillator(),g=envG(t,0.003,0.22,v);o.type='sine';o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(48,t+0.18);o.connect(g);out(g);o.start(t);o.stop(t+0.3);},
    tamb(f,t,d,v){const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=envG(t,0.002,0.12,v);s.buffer=noise;fl.type='highpass';fl.frequency.value=5200;s.connect(fl);fl.connect(g);out(g);s.start(t);s.stop(t+0.2);},
    frame(f,t,d,v){const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=envG(t,0.002,0.16,v);s.buffer=noise;fl.type='bandpass';fl.frequency.value=900;fl.Q.value=1.5;s.connect(fl);fl.connect(g);out(g);s.start(t);s.stop(t+0.22);}};
  // треки: лад, темп, голоса. Мелодии — [ступень, доли]; null — пауза. Ступени считаются от тоники лада, 7 — октава выше.
  const TR={
    title:{bpm:74,root:62,sc:'dor',len:16,v:[
      {i:'drone',drone:[0],oct:-24,vol:0.05},
      {i:'harp',arp:[0,6,0,4],per:4,pat:[0,2,4,7,4,2,4,7],st:0.5,oct:0,vol:0.06},
      {i:'flute',oct:12,vol:0.075,seq:[[[4,1],[3,.5],[2,.5],[0,1.5],[null,.5],[1,1],[2,1],[4,2],[5,1],[4,.5],[3,.5],[2,1],[1,1],[0,3],[null,1]],
        [[7,1.5],[6,.5],[5,1],[4,1],[5,1],[4,.5],[3,.5],[2,2],[3,1],[2,1],[1,1],[-1,1],[0,3],[null,1]]]}]},
    hub:{bpm:92,root:55,sc:'mix',len:16,v:[
      {i:'pluck',oct:0,vol:0.055,seq:[[[0,.5],[2,.5],[4,.5],[4,.5],[5,.5],[4,.5],[2,1],[3,.5],[3,.5],[2,.5],[1,.5],[0,1],[null,1],[4,.5],[4,.5],[5,.5],[6,.5],[7,1],[6,.5],[5,.5],[4,.5],[2,.5],[3,.5],[1,.5],[0,2]],
        [[7,.5],[6,.5],[5,.5],[4,.5],[5,1],[4,.5],[2,.5],[3,1],[2,.5],[1,.5],[0,1],[null,1],[2,.5],[3,.5],[4,1],[5,.5],[4,.5],[2,.5],[1,.5],[0,1],[-3,1],[0,2]]]},
      {i:'flute',oct:12,vol:0.04,every:2,seq:[[[null,8],[4,2],[5,1],[4,1],[2,2],[0,2]]]},
      {i:'pluck',oct:-12,vol:0.05,seq:[[[0,1],[4,1],[0,1],[4,1],[3,1],[0,1],[4,1],[0,1],[0,1],[4,1],[0,1],[4,1],[3,1],[4,1],[0,2]]]},
      {i:'tamb',drum:'..x...x...x...x.',vol:0.02}]},
    w1:{bpm:100,root:57,sc:'dor',len:16,v:[
      {i:'pluck',oct:0,vol:0.055,seq:[[[0,.5],[0,.5],[2,.5],[4,.5],[3,.5],[2,.5],[1,1],[2,.5],[2,.5],[4,.5],[5,.5],[4,1],[null,1],[5,.5],[6,.5],[7,.5],[6,.5],[5,.5],[4,.5],[3,.5],[2,.5],[1,.5],[2,.5],[0,1],[null,1]],
        [[4,1],[3,.5],[2,.5],[3,1],[4,1],[5,.5],[4,.5],[3,.5],[2,.5],[1,2],[2,.5],[3,.5],[4,.5],[2,.5],[3,1],[1,1],[0,2],[null,2]]]},
      {i:'flute',oct:12,vol:0.035,every:2,seq:[[[null,4],[7,2],[6,1],[5,1],[4,3],[null,1],[2,2],[1,1],[0,1]]]},
      {i:'pluck',oct:-12,vol:0.05,seq:[[[0,1],[null,1],[4,1],[null,1],[6,1],[null,1],[4,1],[null,1]]]},
      {i:'frame',drum:'x.......x.......',vol:0.035},{i:'tamb',drum:'....x.......x...',vol:0.02}]},
    w2:{bpm:64,root:52,sc:'aeo',len:16,v:[
      {i:'drone',drone:[0],oct:-12,vol:0.05},
      {i:'harp',arp:[0,5,3,4],per:4,pat:[0,4,7,9,7,4],st:0.5,oct:0,vol:0.05},
      {i:'bell',oct:12,vol:0.05,seq:[[[4,3],[null,1],[2,2],[1,2],[0,4],[null,4]],[[7,2],[6,2],[4,4],[5,2],[4,2],[2,4]]]}]},
    w3:{bpm:84,root:53,sc:'lyd',len:16,v:[
      {i:'harp',arp:[0,1,0,4],per:4,pat:[0,2,4,7,9,7,4,2],st:0.5,oct:0,vol:0.05},
      {i:'flute',oct:12,vol:0.07,seq:[[[4,1.5],[3,.5],[4,1],[6,1],[7,2],[6,1],[4,1],[3,1.5],[2,.5],[3,1],[1,1],[0,4]],[[2,1],[3,1],[4,1],[6,1],[7,1.5],[8,.5],[7,1],[6,1],[4,2],[3,1],[1,1],[2,1],[0,3]]]},
      {i:'drone',drone:[0],oct:-24,vol:0.035}]},
    w4:{bpm:112,root:52,sc:'phr',len:16,v:[
      {i:'pluck',oct:0,vol:0.045,seq:[[[0,.25],[0,.25],[7,.25],[0,.25],[3,.25],[0,.25],[4,.25],[3,.25],[1,.25],[1,.25],[7,.25],[1,.25],[4,.25],[1,.25],[3,.25],[1,.25]]]},
      {i:'pluck',oct:12,vol:0.05,every:1,seq:[[[null,4],[4,1],[3,.5],[1,.5],[0,2],[null,4],[5,1],[4,.5],[3,.5],[1,2]]]},
      {i:'drone',drone:[0],oct:-24,vol:0.05},
      {i:'kick',drum:'x..x..x.x..x..x.',vol:0.08},{i:'tamb',drum:'..x...x...x...x.',vol:0.02}]},
    w5:{bpm:96,root:50,sc:'mix',len:16,v:[
      {i:'pluck',oct:0,vol:0.05,seq:[[[0,.5],[4,.5],[4,.5],[5,.5],[6,1],[5,.5],[4,.5],[2,1],[3,.5],[2,.5],[1,1],[0,1],[4,.5],[5,.5],[6,.5],[7,.5],[6,1],[4,1],[5,.5],[4,.5],[2,.5],[1,.5],[0,2]]]},
      {i:'flute',oct:12,vol:0.045,every:2,seq:[[[7,2],[6,1],[4,1],[5,2],[4,2],[2,2],[1,1],[2,1],[0,4]]]},
      {i:'pluck',oct:-12,vol:0.05,seq:[[[0,1],[4,1],[0,1],[4,1],[6,1],[4,1],[0,2]]]},
      {i:'frame',drum:'x.......x.......',vol:0.03},{i:'tamb',drum:'....x.......x...',vol:0.02}]},
    boss:{bpm:128,root:45,sc:'aeo',len:16,v:[
      {i:'pluck',oct:0,vol:0.045,seq:[[[0,.25],[7,.25],[0,.25],[3,.25],[0,.25],[4,.25],[3,.25],[2,.25]],[[5,.25],[7,.25],[5,.25],[3,.25],[4,.25],[7,.25],[4,.25],[2,.25]]]},
      {i:'pluck',oct:-12,vol:0.06,seq:[[[0,.5],[0,.5],[0,.5],[0,.5],[5,.5],[5,.5],[4,.5],[4,.5]]]},
      {i:'flute',oct:12,vol:0.045,every:2,seq:[[[4,2],[3,1],[2,1],[1,2],[0,2],[5,2],[4,1],[3,1],[2,4]]]},
      {i:'kick',drum:'x...x...x...x.x.',vol:0.09},{i:'frame',drum:'....x.......x...',vol:0.04},{i:'tamb',drum:'..x...x...x...x.',vol:0.025}]},
    epi:{bpm:68,root:60,sc:'ion',len:16,v:[
      {i:'harp',arp:[0,5,3,4],per:4,pat:[0,2,4,7,4,2],st:0.5,oct:-12,vol:0.05},
      {i:'flute',oct:12,vol:0.06,seq:[[[4,2],[5,1],[4,1],[2,2],[0,2],[3,2],[2,1],[1,1],[0,4]],[[7,2],[6,1],[5,1],[4,2],[2,2],[3,1],[4,1],[2,1],[1,1],[0,4]]]}]}};
  const midi=(T,deg,oct)=>{const s=SC[T.sc],n=s.length,o=Math.floor(deg/n),k=((deg%n)+n)%n;return T.root+oct+s[k]+12*o;};
  function begin(name){cur=name;vox=[];loops=0;if(!name)return;const T=TR[name];t0=AC.currentTime+0.12;
    T.v.forEach(v=>vox.push({v,beat:0,i:0,sq:0}));}
  function schedule(){if(!cur)return;const T=TR[cur],spb=60/T.bpm,now=AC.currentTime,until=now+0.25;
    for(const x of vox){const v=x.v;let guard=0;
      while(t0+x.beat*spb<until&&guard++<64){const t=t0+x.beat*spb;const loop=Math.floor(x.beat/T.len);
        if(v.drone){if(x.beat%T.len===0)INST.drone(hz(midi(T,v.drone[0],v.oct)),t,T.len*spb,v.vol);x.beat+=T.len;continue;}
        if(v.drum){const s=v.drum,k=Math.round(x.beat*4)%s.length;if(s[k]==='x')INST[v.i](0,t,0.1,v.vol*(0.85+Math.random()*0.3));x.beat+=0.25;continue;}
        if(v.arp){const ci=Math.floor((x.beat%T.len)/v.per)%v.arp.length,pi=Math.round((x.beat%v.per)/v.st)%v.pat.length;INST[v.i](hz(midi(T,v.arp[ci]+v.pat[pi],v.oct)),t,v.st*spb,v.vol*(pi===0?1.15:0.9));x.beat+=v.st;continue;}
        const every=v.every||0,seqs=v.seq,sq=seqs[loop%seqs.length];if(every>1&&loop%every!==every-1){x.beat=(loop+1)*T.len;x.i=0;continue;}
        const nt=sq[x.i%sq.length];if(nt[0]!==null){const f=hz(midi(T,nt[0],v.oct));INST[v.i](f,t,nt[1]*spb*0.95,v.vol*(0.9+Math.random()*0.15));
          if(v.i==='pluck'&&nt[1]>=1&&Math.random()<0.25)INST.pluck(f,t+nt[1]*spb*0.5,nt[1]*spb*0.4,v.vol*0.6);}
        x.beat+=nt[1];x.i++;const sumB=sq.reduce((a,n)=>a+n[1],0);if(x.i>=sq.length){x.i=0;const blk=T.len%sumB<1e-6?sumB:Math.max(sumB,T.len);x.beat=Math.ceil((x.beat-1e-6)/blk)*blk;}}}}
  function pick(){if(FIN.titleOn)return 'title';if(!W||G.state==='menu')return cur;const L=LEVELS[G.levelIdx]||{};const S=W.song;
    if(S&&(S.state==='play'||S.state==='final'||S.state==='count'))return null;if(G.ui==='repka'||G.ui==='lubok')return cur;
    if(L.id==='luko'||L.id==='p')return 'hub';if(L.id==='epi')return 'epi';if(L.boss)return 'boss';return ['hub','w1','w2','w3','w4','w5'][L.world||0]||'hub';}
  return {TR,   // темы — уровни могут добавить свои (2-Б: vod1…vod4 по этапам боя)
    start(){if(!AC||started)return;started=true;bus=AC.createGain();bus.gain.value=0;bus.connect(AC.destination);noise=nb();},
    setVol(v){vol=v;},play(n){want=n;},
    tick(){if(!AC||!started)return;const w=want!==undefined&&want!==null?want:pick();
      const now=performance.now(),dt=Math.min(0.2,(now-(this.lt||now))/1000);this.lt=now;const duck=(G.cine?0.55:G.state==='pause'?0.35:1)*(FIN.voxDuck||1),target=w===cur?0.16*vol*duck:0;const g=bus.gain.value;bus.gain.value=g+(target-g)*(1-Math.exp(-dt*(target<g?5:2.5)));
      if(w!==cur&&bus.gain.value<0.004){begin(w);}if(cur)schedule();},
    get cur(){return cur;}};})();
{const _r=render;render=function(){_r();if(FIN.music)FIN.music.tick();};}
