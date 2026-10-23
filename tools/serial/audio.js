// Звуковая дорожка серии: node tools/serial/audio.js --ep 1 [--out DIR]
// Открывает съёмочную сборку и в реальном времени пишет собственный звук игры (MediaRecorder): по снятым сегментам (snd.json) проигрывает
// в те же мгновения музыку (FIN.music, смена трека — метка 'mus'), эффекты (tone, AUD.osc/nz, инструменты песен) и голоса — записи реплик
// из релиза: новая реплика обрывает прежнюю, на стыке сегментов реплика затихает, пока звучит голос — музыка тише.
// Музыка в MUSIC_GAIN раз громче, чем в игре (там она нарочно тихая под голосами), тихие треки подняты отдельно — как в трейлере.
const {chromium}=require('../tests/pw');const path=require('path'),fs=require('fs');
const arg=(k,d)=>{const i=process.argv.indexOf(k);return i<0?d:process.argv[i+1];};
const EP=+arg('--ep',1);const HTML=path.join(__dirname,'out','serial.html');
const OUT=path.resolve(arg('--out',path.join(__dirname,'out','ep'+String(EP).padStart(2,'0'))));
const segs=fs.readdirSync(OUT).filter(d=>/^\d\d_/.test(d)&&fs.existsSync(path.join(OUT,d,'meta.json'))).sort();
let T=0;const plan={mus:[],snd:[],vox:[],seg:[],musK:+(process.env.MUSIC_GAIN||4)};
for(const d of segs){const m=JSON.parse(fs.readFileSync(path.join(OUT,d,'meta.json'),'utf8')),s=JSON.parse(fs.readFileSync(path.join(OUT,d,'snd.json'),'utf8'));const dur=m.frames/m.fps;
  plan.seg.push(T);for(const e of s)if(e.t<dur){if(e.k==='vox')plan.vox.push({t:T+e.t,id:e.id,kind:e.kind,g:e.g,off:e.off||0});else if(e.k==='mus')plan.mus.push({t:T+e.t,track:e.track});else plan.snd.push(Object.assign({},e,{t:T+e.t}));}T+=dur;}
plan.total=T;console.log('сегментов',segs.length,'длина',T.toFixed(2)+' с','звуков',plan.snd.length,'голосов',plan.vox.length,'смен музыки',plan.mus.length);
(async()=>{const browser=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:360,height:640}});page.on('pageerror',e=>console.log('PAGEERROR',e.message));
  await page.addInitScript(()=>{const raf=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=function(cb){if(cb&&cb.name==='frame')return 0;return raf(cb);};
    const C=AudioNode.prototype.connect;AudioNode.prototype.connect=function(dst){const r=C.apply(this,arguments);try{const ctx=this.context;if(dst===ctx.destination){if(!ctx.__rec)ctx.__rec=ctx.createMediaStreamDestination();C.call(this,ctx.__rec);}}catch(e){}return r;};});
  await page.goto('file://'+HTML+'?debug=1');await page.waitForTimeout(1500);
  const b64=await page.evaluate(async(plan)=>{const FIN=ZC.FIN;FIN.vox.audio();FIN.aud.ready();FIN.music.start();
    const ctx=FIN.ac();if(ctx.state!=='running')await ctx.resume();if(!ctx.__rec)ctx.__rec=ctx.createMediaStreamDestination();
    const rec=new MediaRecorder(ctx.__rec.stream,{mimeType:'audio/webm;codecs=opus',audioBitsPerSecond:192000});const chunks=[];rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    const _tone=FIN.tone||window.tone,A=FIN.aud,_osc=A.osc,_nz=A.nz,I=FIN.music.inst;
    const LN={};for(const e of FIN.vox.lines)LN[e.id]=e;const BUF={};
    for(const id of [...new Set(plan.vox.map(v=>v.id))]){const e=LN[id];if(!e||!e.b64)continue;
      const bin=atob(e.b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);try{BUF[id]=await ctx.decodeAudioData(u.buffer);}catch(err){}}
    const vbus=ctx.createGain();vbus.gain.value=1.0;vbus.connect(ctx.destination);let cur=null,mainEnd=0,ducked=false,vi=0,gi=1,mi=0,si=0;
    const mus0=(FIN.set.mus!=null?FIN.set.mus:1)*plan.musK;
    const TRK={title:1,w3:1,epi:1.3,w2:1.4,w4:2,w1:2.6,hub:3,boss:3,w5:3,prk_night:3,prk_quiet:3,prk_kosh:2.4};let trk=1;
    const vstop=(at,f)=>{if(!cur)return;const c=cur;cur=null;try{c.g.gain.setValueAtTime(c.g.gain.value,at);c.g.gain.linearRampToValueAtTime(0,at+f);c.s.stop(at+f+0.02);}catch(err){}mainEnd=Math.min(mainEnd,at);};
    const vplay=(v,at)=>{const b=BUF[v.id];if(!b||v.off>=b.duration)return;const s=ctx.createBufferSource();s.buffer=b;const g=ctx.createGain();g.gain.value=(LN[v.id].gain||1);
      s.connect(g);g.connect(vbus);s.start(at,v.off||0);cur={s,g};mainEnd=at+b.duration-(v.off||0);};
    rec.start(250);const t0=ctx.currentTime+0.6;FIN.music.setVol(mus0);
    await new Promise(res=>{const iv=setInterval(()=>{const now=ctx.currentTime,vt=now-t0;FIN.music.tick();
        while(mi<plan.mus.length&&plan.mus[mi].t-0.05<=vt){const tr=plan.mus[mi].track;trk=TRK[tr]||1;FIN.music.setVol(mus0*trk*(ducked?0.45:1));FIN.music.play(tr);mi++;}
        while(vi<plan.vox.length&&plan.vox[vi].t<vt+1.0){const v=plan.vox[vi++],at=t0+v.t;while(gi<plan.seg.length&&plan.seg[gi]<=v.t){vstop(t0+plan.seg[gi],0.1);gi++;}
          vstop(at,0.06);vplay(v,Math.max(at,now));}
        while(gi<plan.seg.length&&plan.seg[gi]<vt+1.0){vstop(t0+plan.seg[gi],0.1);gi++;}
        const dk=now<mainEnd;if(dk!==ducked){ducked=dk;FIN.music.setVol(mus0*trk*(dk?0.45:1));}
        while(si<plan.snd.length&&plan.snd[si].t<vt+1.0){const e=plan.snd[si++],off=Math.max(0,t0+e.t-now);
          try{if(e.k==='tone'){const a=e.a.slice();while(a.length<6)a.push(undefined);a[5]=(a[5]||0)+off;_tone.apply(window,a);}
            else if(e.k==='inst'){if(I[e.i])I[e.i](e.a[0],now+off+e.a[1],e.a[2],e.a[3]);}
            else{const o=Object.assign({},e.a[0]);o.at=(o.at||0)+off;(e.k==='osc'?_osc:_nz)(o);}}catch(err){}}
        if(vt>plan.total+0.6){clearInterval(iv);res();}},25);});
    rec.stop();await new Promise(r=>rec.onstop=r);const blob=new Blob(chunks,{type:'audio/webm'});const buf=new Uint8Array(await blob.arrayBuffer());
    let s='';for(let i=0;i<buf.length;i+=32768)s+=String.fromCharCode.apply(null,buf.subarray(i,i+32768));return btoa(s);},plan);
  fs.writeFileSync(path.join(OUT,'audio.webm'),Buffer.from(b64,'base64'));console.log('audio.webm',(b64.length*0.75/1024).toFixed(0)+' KB');await browser.close();})();
