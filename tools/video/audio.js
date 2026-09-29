// Звуковая дорожка трейлера: node tools/video/audio.js [--out DIR]
// Открывает игру (?debug), запускает её собственный звук (музыка — FIN.music, эффекты — tone() и FIN.aud) и в реальном времени пишет выход
// через MediaRecorder. Музыка: трек каждого сегмента из meta.json (в ритм-шотах — без фоновой музыки: там поёт сама песня). Эффекты:
// все вызовы синтеза, записанные при съёмке кадров (snd.json, время от начала сегмента), проигрываются в тот же миг — звук совпадает с картинкой.
const {chromium}=require('../tests/pw');const path=require('path'),fs=require('fs');
const arg=(k,d)=>{const i=process.argv.indexOf(k);return i<0?d:process.argv[i+1];};
const ROOT=path.join(__dirname,'..','..');const HTML=path.join(ROOT,'zlataya_cep','zlataya_cep_final06.html');const OUT=path.resolve(arg('--out',path.join(__dirname,'out')));
const segs=fs.readdirSync(OUT).filter(d=>/^\d\d_/.test(d)&&fs.existsSync(path.join(OUT,d,'meta.json'))).sort();
let T=0;const plan={music:[],snd:[]};
for(const d of segs){const m=JSON.parse(fs.readFileSync(path.join(OUT,d,'meta.json'),'utf8')),s=JSON.parse(fs.readFileSync(path.join(OUT,d,'snd.json'),'utf8'));const dur=m.frames/m.fps;
  plan.music.push({t:T,track:m.music||''});for(const e of s)if(e.t<dur)plan.snd.push({t:T+e.t,k:e.k,a:e.a});T+=dur;}
plan.total=T;console.log('segments',segs.length,'total',T.toFixed(2)+'s','sounds',plan.snd.length);
(async()=>{const browser=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:640,height:360}});page.on('pageerror',e=>console.log('PAGEERROR',e.message));
  await page.addInitScript(()=>{const raf=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=function(cb){if(cb&&cb.name==='frame')return 0;return raf(cb);};
    // всё, что уходит в динамики, дублируется в запись
    const C=AudioNode.prototype.connect;AudioNode.prototype.connect=function(dst){const r=C.apply(this,arguments);try{const ctx=this.context;if(dst===ctx.destination){if(!ctx.__rec)ctx.__rec=ctx.createMediaStreamDestination();C.call(this,ctx.__rec);}}catch(e){}return r;};});
  await page.goto('file://'+HTML+'?debug=1');await page.waitForTimeout(1500);
  const b64=await page.evaluate(async(plan)=>{initAudio();FIN.aud.ready();FIN.music.start();FIN.music.setVol(FIN.set.mus!=null?FIN.set.mus:1);
    const ctx=AC;if(ctx.state!=='running')await ctx.resume();if(!ctx.__rec)ctx.__rec=ctx.createMediaStreamDestination();
    const rec=new MediaRecorder(ctx.__rec.stream,{mimeType:'audio/webm;codecs=opus',audioBitsPerSecond:192000});const chunks=[];rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    const _tone=window.tone,A=FIN.aud,_osc=A.osc,_nz=A.nz;rec.start(250);const t0=ctx.currentTime+0.6;let si=0,mi=0;
    FIN.music.play(plan.music[0].track);
    await new Promise(res=>{const iv=setInterval(()=>{const now=ctx.currentTime,vt=now-t0;FIN.music.tick();
        while(mi<plan.music.length&&plan.music[mi].t-0.8<=vt){FIN.music.play(plan.music[mi].track);mi++;}
        while(si<plan.snd.length&&plan.snd[si].t<vt+1.0){const e=plan.snd[si++],off=Math.max(0,t0+e.t-now);
          try{if(e.k==='tone'){const a=e.a.slice();while(a.length<6)a.push(undefined);a[5]=(a[5]||0)+off;_tone.apply(window,a);}
            else{const o=Object.assign({},e.a[0]);o.at=(o.at||0)+off;(e.k==='osc'?_osc:_nz)(o);}}catch(err){}}
        if(vt>plan.total+0.6){clearInterval(iv);res();}},25);});
    rec.stop();await new Promise(r=>rec.onstop=r);const blob=new Blob(chunks,{type:'audio/webm'});const buf=new Uint8Array(await blob.arrayBuffer());
    let s='';for(let i=0;i<buf.length;i+=32768)s+=String.fromCharCode.apply(null,buf.subarray(i,i+32768));return btoa(s);},plan);
  fs.writeFileSync(path.join(OUT,'audio.webm'),Buffer.from(b64,'base64'));console.log('audio.webm',(b64.length*0.75/1024).toFixed(0)+' KB');await browser.close();})();
