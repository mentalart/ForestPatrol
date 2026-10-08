//@@ wait=300
ZC.start();ZC.G.manual=true;ZC.tick(2);'start'
//@@ key=Space wait=1200
PR.audInit()
//@@ wait=300
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);ZC.skip();ZC.tick(10);try{ZC.W.warp2b('boss1');}catch(e){}ZC.tick(120);ZC.skip();ZC.tick(60);
let a=PR.names().mus.join(',');ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(10);ZC.skip();ZC.tick(10);try{ZC.W.warp3b('boss1');}catch(e){}ZC.tick(120);ZC.skip();ZC.tick(60);
a+=' || '+PR.names().mus.join(',')
//@@
(async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));const out=[];
  const run=async(name,f,ms)=>{PR.audReset();try{f();}catch(e){out.push([name,'ERR '+e.message]);return;}await sleep(ms);out.push([name,PR.audGet()]);};
  const skip=['title','hub','w1','w2','w3','w4','w5','boss','epi','jxBoss2','jxBoss3','k1b1','k1b2','k1b3','k1b3b','k1b4'];
  for(const n of PR.names().mus){if(skip.includes(n))continue;await run('mus:'+n,()=>PR.musPlay(n),5600);PR.musPlay(null);await sleep(500);}
  PR.musPlay(null);return JSON.stringify(out);})()
