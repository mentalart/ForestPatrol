//@@ wait=300
ZC.start();ZC.G.manual=true;ZC.tick(2);'start'
//@@ key=Space wait=1200
PR.audInit()
//@@ wait=300
ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(120);ZC.skip();ZC.tick(120);ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(120);ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(120);ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(120);'names='+JSON.stringify(PR.names().mus)
//@@
(async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));const out=[];
  const run=async(name,f,ms)=>{PR.audReset();try{f();}catch(e){out.push([name,'ERR '+e.message]);return;}await sleep(ms);out.push([name,PR.audGet()]);};
  const base=['title','hub','w1','w2','w3','w4','w5','boss','epi','jxBoss2','jxBoss3'];
  for(const n of PR.names().mus){if(base.includes(n))continue;await run('mus:'+n,()=>PR.musPlay(n),5200);PR.musPlay(null);await sleep(400);}
  PR.musPlay(null);return JSON.stringify(out);})()
