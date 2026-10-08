// Контролируемый опыт: те же «дети» с теми же умениями (обучение выключено), те же встречи — но в арене мира 1 (детские настройки включены:
// замах 0,9 с, окно отбива 0,40, красный знак ×1,5, Пробой 9 с) и в арене мира 2 (настройки как у остальной игры). Разница — чистый эффект настроек.
//   node tools/playtest/ab_kids.js 7-8 out.json
const {chromium}=require('../tests/pw');
const path=require('path'),fs=require('fs');
const D=path.join(__dirname,'data');
const roster=JSON.parse(fs.readFileSync(path.join(D,'roster.json'),'utf8'));
const grp=process.argv[2];const outFile=process.argv[3]||path.join(D,'ab_'+grp+'.json');
const people=roster.filter(r=>r.group===grp);
const COMPS={'2 кикиморки':[['kiki',2]],'кикиморка и рак':[['kiki',1],['rak',1]],'пень в коре':[['stump',1]],'два паутинника':[['tat',2]],'две щуки-стрелка':[['shchuka',2]]};
(async()=>{
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:800,height:450}});
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'..','tests','vendor/three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+path.join(__dirname,'out','pt_build.html')+'?debug=1');await page.waitForTimeout(1200);
  await page.evaluate(fs.readFileSync(path.join(__dirname,'..','tests','helpers.js'),'utf8'));
  for(const f of['pt_scope.js','pt_persona.js'])await page.evaluate(code=>{ZC.X(code);},fs.readFileSync(path.join(__dirname,f),'utf8'));
  await page.evaluate(()=>{U.go();});
  const res={};
  for(const arena of[['1-1','детские настройки (мир 1)'],['2-1','обычные настройки (мир 2)']]){
    await page.evaluate(lv=>{ZC.setSolo(false);PT.noPersona();PT.arenaSetup(lv);},arena[0]);
    for(const r of people){
      const P=Object.assign({},r.params,{learn:0});const know={parry:0.5,roll:0.6};
      for(const [cn,groups] of Object.entries(COMPS)){
        const acc={n:0,clear:0,downs:0,hits:0,sec:0};
        for(let rep=0;rep<4;rep++){
          const x=await page.evaluate(([groups,P,id,path,seed,know])=>{PT.noPersona();return PT.arena({groups,enc:99,who:[{id,pi:0,path,P,seed,know:Object.assign({},know)}],maxSec:60});},[groups,P,r.id+arena[0],r.path,rep*101+r.id.charCodeAt(2)*7+r.id.charCodeAt(1),know]);
          acc.n++;acc.clear+=x.cleared?1:0;acc.downs+=x.downs[0];acc.hits+=x.hits[0];acc.sec+=x.sec;}
        (res[arena[1]]=res[arena[1]]||[]).push({id:r.id,path:r.path,comp:cn,...acc});
      }
    }
    console.log(arena[1],'готово');
  }
  fs.writeFileSync(outFile,JSON.stringify(res));
  await browser.close();
})();
