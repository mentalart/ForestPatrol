// Статический проход по всем уровням: тексты задач обоих игроков, подсказки зон, число кнопок-подсказок и колокольчиков.
//   node tools/playtest/static_levels.js  → tools/playtest/data/level_static.json
const {chromium}=require('../tests/pw');
const path=require('path'),fs=require('fs');
(async()=>{
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:960,height:540}});
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'..','tests','vendor/three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+path.join(__dirname,'out','pt_build.html')+'?debug=1');await page.waitForTimeout(1200);
  await page.evaluate(fs.readFileSync(path.join(__dirname,'..','tests','helpers.js'),'utf8'));
  const res=await page.evaluate(()=>{
    U.go();const strip=s=>String(s==null?'':s).replace(/<br\s*\/?>/g,' ').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
    const out={};
    for(let i=0;i<ZC.LEVELS.length;i++){const L=ZC.LEVELS[i];
      try{ZC.X('startFrom('+i+')');ZC.tick(5);const W=ZC.W;const o={idx:i,name:W.name||L.name||'',world:L.world,obj:[[],[]],tipZones:[],prompts:0,bells:W.bells?W.bells.length:0,abil:Object.keys(W.abil||{}).filter(k=>W.abil[k])};
        for(const pi of[0,1])(W.objectives[pi]||[]).forEach((x,j)=>{let t='';try{t=strip(typeof x.text==='function'?x.text():x.text);}catch(e){}o.obj[pi].push(t);});
        (W.tipZones||[]).forEach(z=>{try{const t=strip(z.text(0,ZC.players[0].heroes[ZC.players[0].act]));if(t)o.tipZones.push(t);}catch(e){}});
        o.prompts=(W.prompts||[]).length;
        out[L.id]=o;}catch(e){out[L.id]={err:String(e.message)};}}
    return out;});
  fs.mkdirSync(path.join(__dirname,'data'),{recursive:true});
  fs.writeFileSync(path.join(__dirname,'data','level_static.json'),JSON.stringify(res,null,1));
  console.log(Object.keys(res).length,'уровней',Object.entries(res).filter(([k,v])=>v.err).map(([k,v])=>k+':'+v.err).join(' '));
  await browser.close();
})();
