// Снимки для вики: по кадру с каждого уровня (после вступительного ролика, без интерфейса) — wiki/images/<id>.jpg
//   node tools/wiki_shots.js [id …]   (релиз сначала собрать: python3 zlataya_cep/build/build_final.py)
const {chromium}=require('./tests/pw.js'),path=require('path'),fs=require('fs');
const HTML=path.join(__dirname,'..','zlataya_cep','zlataya_cep_final06.html'),OUT=path.join(__dirname,'..','wiki','images');
(async()=>{fs.mkdirSync(OUT,{recursive:true});
  const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const p=await b.newPage({viewport:{width:960,height:540}});
  await p.goto('file://'+HTML+'?debug=1&hq=1');await p.waitForFunction(()=>window.ZC&&ZC.LEVELS,null,{timeout:120000});
  const ids=process.argv.slice(2).length?process.argv.slice(2):await p.evaluate(()=>ZC.LEVELS.map(l=>l.id));
  for(const id of ids){const t0=Date.now();
    try{const ok=await p.evaluate(id=>{const i=ZC.LV(id);if(i<0)return false;ZC.startFrom(i);ZC.G.manual=true;
        for(let k=0;k<40;k++){ZC.tick(10);if(ZC.G.cine)ZC.skip();}ZC.tick(240);if(ZC.G.cine)ZC.skip();ZC.tick(60);ZC.G.manual=false;return true;},id);
      if(!ok){console.log('skip',id);continue;}
      await p.waitForTimeout(1500);await p.addStyleTag({content:'body>*:not(#c){opacity:0!important}'});await p.waitForTimeout(300);await p.screenshot({path:path.join(OUT,id+'.jpg'),type:'jpeg',quality:78,timeout:120000});
      console.log('ok',id,((Date.now()-t0)/1000).toFixed(0)+'s');}catch(e){console.log('ERR',id,String(e.message).split('\n')[0]);}}
  await b.close();})();
