// Звуковая дорожка трейлера: node tools/video/audio.js [--out DIR]
// Открывает игру (?debug), запускает её собственный звук (музыка — FIN.music, эффекты — tone() и FIN.aud) и в реальном времени пишет выход
// через MediaRecorder. Музыка: трек каждого сегмента из meta.json (в ритм-шотах — без фоновой музыки: там поёт сама песня). Эффекты:
// все вызовы синтеза, записанные при съёмке кадров (snd.json, время от начала сегмента), проигрываются в тот же миг — звук совпадает с картинкой.
// Голоса (final06): записи реплик (k:'vox' в snd.json) — в те же мгновения: новая реплика обрывает прежнюю, смех «поверх» (layer) не обрывает,
// на стыке сегментов реплика затихает; пока звучит голос, музыка тише — как в игре. Музыка в 4 раза громче игровой (MUSIC_GAIN=…): в игре она
// нарочно тихая под голосами и эффектами, а в трейлере без неё сегменты без реплик звучат почти пустыми.
const {chromium}=require('../tests/pw');const path=require('path'),fs=require('fs');
const arg=(k,d)=>{const i=process.argv.indexOf(k);return i<0?d:process.argv[i+1];};
const ROOT=path.join(__dirname,'..','..');const HTML=path.join(ROOT,'zlataya_cep','zlataya_cep_final06.html');const OUT=path.resolve(arg('--out',path.join(__dirname,'out')));
const segs=fs.readdirSync(OUT).filter(d=>/^\d\d_/.test(d)&&fs.existsSync(path.join(OUT,d,'meta.json'))).sort();
let T=0;const plan={music:[],snd:[],vox:[],seg:[],musK:+(process.env.MUSIC_GAIN||4)};   // MUSIC_GAIN — во сколько раз музыка громче, чем в игре
for(const d of segs){const m=JSON.parse(fs.readFileSync(path.join(OUT,d,'meta.json'),'utf8')),s=JSON.parse(fs.readFileSync(path.join(OUT,d,'snd.json'),'utf8'));const dur=m.frames/m.fps;
  plan.music.push({t:T,track:m.music||''});plan.seg.push(T);for(const e of s)if(e.t<dur){if(e.k==='vox')plan.vox.push({t:T+e.t,id:e.id,kind:e.kind,g:e.g,off:e.off||0});else plan.snd.push({t:T+e.t,k:e.k,a:e.a});}T+=dur;}
plan.total=T;console.log('segments',segs.length,'total',T.toFixed(2)+'s','sounds',plan.snd.length,'voice',plan.vox.filter(v=>v.kind!=='stop').length);
(async()=>{const browser=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:640,height:360}});page.on('pageerror',e=>console.log('PAGEERROR',e.message));
  await page.addInitScript(()=>{const raf=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=function(cb){if(cb&&cb.name==='frame')return 0;return raf(cb);};
    // всё, что уходит в динамики, дублируется в запись
    const C=AudioNode.prototype.connect;AudioNode.prototype.connect=function(dst){const r=C.apply(this,arguments);try{const ctx=this.context;if(dst===ctx.destination){if(!ctx.__rec)ctx.__rec=ctx.createMediaStreamDestination();C.call(this,ctx.__rec);}}catch(e){}return r;};});
  await page.goto('file://'+HTML+'?debug=1');await page.waitForTimeout(1500);
  const b64=await page.evaluate(async(plan)=>{const FIN=ZC.FIN;FIN.vox.audio();FIN.aud.ready();FIN.music.start();FIN.music.setVol(FIN.set.mus!=null?FIN.set.mus:1);
    const ctx=FIN.ac();if(ctx.state!=='running')await ctx.resume();if(!ctx.__rec)ctx.__rec=ctx.createMediaStreamDestination();
    const rec=new MediaRecorder(ctx.__rec.stream,{mimeType:'audio/webm;codecs=opus',audioBitsPerSecond:192000});const chunks=[];rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    const _tone=FIN.tone||window.tone,A=FIN.aud,_osc=A.osc,_nz=A.nz;
    // голоса: раскодировать заранее все нужные записи
    const LN={};for(const e of FIN.vox.lines)LN[e.id]=e;const BUF={};
    for(const id of [...new Set(plan.vox.filter(v=>v.kind!=='stop').map(v=>v.id))]){const e=LN[id];if(!e||!e.b64)continue;
      const bin=atob(e.b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);try{BUF[id]=await ctx.decodeAudioData(u.buffer);}catch(err){}}
    const vbus=ctx.createGain();vbus.gain.value=0.9;vbus.connect(ctx.destination);let cur=null,mainEnd=0,ducked=false,vi=0,gi=1;const mus0=(FIN.set.mus!=null?FIN.set.mus:1)*plan.musK;   // в игре музыка тихая (0,16 × громкость) — в трейлере громче
    const vstop=(at,f)=>{if(!cur)return;const c=cur;cur=null;try{c.g.gain.setValueAtTime(c.g.gain.value,at);c.g.gain.linearRampToValueAtTime(0,at+f);c.s.stop(at+f+0.02);}catch(err){}mainEnd=Math.min(mainEnd,at);};
    const vplay=(v,at)=>{const b=BUF[v.id];if(!b||v.off>=b.duration)return;const s=ctx.createBufferSource();s.buffer=b;const g=ctx.createGain();g.gain.value=(LN[v.id].gain||1)*(v.kind==='layer'?(v.g||0.8):1);
      s.connect(g);g.connect(vbus);s.start(at,v.off||0);if(v.kind==='main'){cur={s,g};mainEnd=at+b.duration-(v.off||0);}};
    rec.start(250);const t0=ctx.currentTime+0.6;let si=0,mi=0;
    FIN.music.setVol(mus0);FIN.music.play(plan.music[0].track);
    await new Promise(res=>{const iv=setInterval(()=>{const now=ctx.currentTime,vt=now-t0;FIN.music.tick();
        while(mi<plan.music.length&&plan.music[mi].t-0.8<=vt){FIN.music.play(plan.music[mi].track);mi++;}
        // голоса и стыки сегментов (на стыке реплика затихает)
        while(vi<plan.vox.length&&plan.vox[vi].t<vt+1.0){const v=plan.vox[vi++],at=t0+v.t;while(gi<plan.seg.length&&plan.seg[gi]<=v.t){vstop(t0+plan.seg[gi],0.12);gi++;}
          if(v.kind==='stop')vstop(at,v.g||0.08);else{if(v.kind==='main')vstop(at,0.06);vplay(v,Math.max(at,now));}}
        while(gi<plan.seg.length&&plan.seg[gi]<vt+1.0){vstop(t0+plan.seg[gi],0.12);gi++;}
        const dk=now<mainEnd;if(dk!==ducked){ducked=dk;FIN.music.setVol(mus0*(dk?0.4:1));}
        while(si<plan.snd.length&&plan.snd[si].t<vt+1.0){const e=plan.snd[si++],off=Math.max(0,t0+e.t-now);
          try{if(e.k==='tone'){const a=e.a.slice();while(a.length<6)a.push(undefined);a[5]=(a[5]||0)+off;_tone.apply(window,a);}
            else{const o=Object.assign({},e.a[0]);o.at=(o.at||0)+off;(e.k==='osc'?_osc:_nz)(o);}}catch(err){}}
        if(vt>plan.total+0.6){clearInterval(iv);res();}},25);});
    rec.stop();await new Promise(r=>rec.onstop=r);const blob=new Blob(chunks,{type:'audio/webm'});const buf=new Uint8Array(await blob.arrayBuffer());
    let s='';for(let i=0;i<buf.length;i+=32768)s+=String.fromCharCode.apply(null,buf.subarray(i,i+32768));return btoa(s);},plan);
  fs.writeFileSync(path.join(OUT,'audio.webm'),Buffer.from(b64,'base64'));console.log('audio.webm',(b64.length*0.75/1024).toFixed(0)+' KB');await browser.close();})();
