// Тексты, которые игра читает вслух (задачи и подсказки): node tools/voice/harvest_read.js [релиз.html] > тексты.json
// Запускает релиз в браузере (?debug), обходит все уровни и для каждой задачи каждого игрока берёт ровно то, что читает late_79b_readaloud.js
// (FIN.readAloud.text() — текст без кнопок и значков; у задачи с краткой формулировкой — она); плюс текст каждой подсказки-зоны уровня
// (W.tipZones, FIN.readAloud.text). Печатает JSON: {texts:[{lv,kind,text}], errors:[…]}; повторы внутри одного текста убираются.
// Нужен playwright из tools/tests (pw.js). Тексты потом озвучивает tools/voice/read_tts.py.
const path=require('path'),fs=require('fs');
const {chromium}=require(path.join(__dirname,'..','tests','pw'));
const HTML=path.resolve(process.argv[2]||path.join(__dirname,'..','..','zlataya_cep','zlataya_cep_final06.html'));
(async()=>{
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'..','tests','vendor','three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+HTML+'?debug=1');await page.waitForTimeout(1500);
  const res=await page.evaluate(()=>{
    const F=ZC.FIN,R=F.readAloud,P=ZC.players,out=[],err=[];
    F.set.readAloud=true;F.set.readAloudAll=true;F.set.vox=0;R.mock=()=>{};
    const ld=id=>{if(ZC.G.state!=='play')ZC.startFrom(ZC.LV(id));else ZC.loadLevel(ZC.LV(id));ZC.G.manual=true;ZC.tick(6);for(let q=0;q<8&&ZC.G.cine;q++){ZC.skip();ZC.tick(3);}};
    const ids=ZC.LEVELS.map(l=>l.id);
    for(const id of ids){
      try{ld(id);}catch(e){err.push('load '+id+': '+e.message);continue;}
      const W=ZC.W;if(!W)continue;
      P[0].path='easy';P[1].path='easy';ZC.G.solo=false;
      // задача: краткая формулировка (если есть), иначе полный текст — как собирает карточка (late_79_hints.js) и читает raText
      for(let pi=0;pi<2;pi++)(W.objectives[pi]||[]).forEach((o,j)=>{
        try{if(!o)return;const html=o.short?o.short(pi):(typeof o.text==='function'?o.text():o.text);
          if(html){const t=R.text('<div class="hn-rd">'+String(html)+'</div>');if(t)out.push({lv:id,kind:'task',text:t});}}
        catch(e){err.push(id+' obj'+pi+'.'+j+': '+e.message);}});
      try{for(const c of R.cards())out.push({lv:id,kind:c.i>=3?'boss':'card',text:c.t});}catch(e){err.push(id+' cards: '+e.message);}
      for(let pi=0;pi<2;pi++){const h=P[pi].heroes[P[pi].act];
        (W.tipZones||[]).forEach((z,zi)=>{try{const html=z.text(pi,h);if(html){const t=R.text(String(html));if(t)out.push({lv:id,kind:'zone',text:t});}}catch(e){err.push(id+' zone '+zi+': '+e.message);}});}
    }
    return {texts:out,errors:err};
  });
  await browser.close();
  // повторы: один и тот же текст в уровне — один раз
  const seen=new Set(),texts=[];for(const t of res.texts){const k=t.lv+'|'+t.text;if(seen.has(k))continue;seen.add(k);texts.push(t);}
  process.stdout.write(JSON.stringify({texts,errors:res.errors},null,1)+'\n');
})().catch(e=>{console.error(e);process.exit(1);});
