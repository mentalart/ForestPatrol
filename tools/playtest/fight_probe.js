// Боевые пробы: сессия (пара или одиночка) проходит все встречи с мороками в реальном движке — в порядке кампании, своим «человеческим» контроллером.
//   node tools/playtest/fight_probe.js S01,S02,… [out.json]        (id сессий — ниже; по умолчанию все)
// Встречи берутся из профилей уровней (data/level_profiles.json: спавн морок в прогонах оракулов). Что по ходу сессии меняется, как у живых:
//   • опыт: знание отбива/кувырка растёт от удач и ударов (pt_persona.js);
//   • путь сложности: два провала подряд — игроки выбирают путь проще (в паре — по общему согласию, ребёнок просит родителя);
//   • первые встречи с каждым знаком — замедленные (учебное замедление игры) только пока их не потратил пролог.
const {chromium}=require('../tests/pw');
const path=require('path'),fs=require('fs');
const D=path.join(__dirname,'data');
const roster=JSON.parse(fs.readFileSync(path.join(D,'roster.json'),'utf8'));
const prof=JSON.parse(fs.readFileSync(path.join(D,'level_profiles.json'),'utf8'));
const cat=JSON.parse(fs.readFileSync(path.join(__dirname,'levels_catalog.json'),'utf8'));
const byId=Object.fromEntries(roster.map(r=>[r.id,r]));
// сессии: пара (оба респондента) или одиночка
const sessions={};
for(const r of roster){const sid=r.pair?r.pair:'S'+r.id;(sessions[sid]=sessions[sid]||[]).push(r.id);}
const WORLD_LEVEL={0:'p',1:'1-1',2:'2-1',3:'3-1',4:'4-1',5:'5-1'};
// морок, у которых победа требует особого инструмента уровня (рогатка, лава…): в арене заменяются стрелком-щукой — тот же знак, та же капля
const SURR={puzyr:'shchuka',lizard:'shchuka',k5candle:'shchuka',zhemchug:'shchuka',k5key:'kiki',tucha:'kiki'};   // тучка «в свете мягкая» — без света уровня она жёстче, чем в игре
const BIG=new Set(['leshyBoss','vodyanoy','solovei','golova','k5kos','grombaran','voron31','otshel','otshel2']);
function encounterList(){
  const out=[];
  // пролог: три учебных морока (замедление, подсказки) — реальная первая встреча со всеми знаками
  out.push({lv:'p',world:0,i:0,groups:[['morok',1]],tutorial:true,key:'p#0'},{lv:'p',world:0,i:1,groups:[['morok',2]],tutorial:true,key:'p#1'},{lv:'p',world:0,i:2,groups:[['morok',1],['kiki',1]],tutorial:true,key:'p#2'});
  const lvls=Object.keys(prof).filter(l=>prof[l].encounters.length&&!l.startsWith('z-')&&l!=='5-B2').sort((a,b)=>(cat[a]?cat[a].order:99)-(cat[b]?cat[b].order:99));
  for(const lv of lvls){let i=0,bossN=0;const isBoss=/-B\d?$/.test(lv);
    for(const e of prof[lv].encounters){
      const kinds=e.kinds.map(k=>SURR[k]||k);
      for(let rep=0;rep<e.count;rep++){
        // большие волны — по три мороча за раз (в игре они подходят по очереди)
        const big=kinds.filter(k=>BIG.has(k)),small=kinds.filter(k=>!BIG.has(k));
        if(isBoss&&bossN>=3)continue;           // у боссов — до трёх боёв на уровень: особые стадии арена не повторяет
        const bk={};big.forEach(k=>bk[k]=(bk[k]||0)+1);
        for(const [b,n] of Object.entries(bk)){if(isBoss&&bossN>=3)break;out.push({lv,world:prof[lv].world,i:i++,groups:[[b,Math.min(n,3)]],boss:true,key:lv+'#'+(i-1)});bossN++;}
        for(let c=0;c<small.length&&!(isBoss&&bossN>=3);c+=3){const ch=small.slice(c,c+3),g={};ch.forEach(k=>g[k]=(g[k]||0)+1);
          const bl=['shchuka'].filter(k=>g[k]>2);bl.forEach(k=>g[k]=2);       // стрелков — не больше двух за раз
          out.push({lv,world:prof[lv].world,i:i++,groups:Object.entries(g),key:lv+'#'+(i-1)});if(isBoss)bossN++;}}}}
  // 5-Б2 — финал с Кощеем: двенадцать особых стадий; арена их не воспроизводит, в пробах его нет (в модели — по числу этапов и роликам)
  return out;
}
(async()=>{
  const ids=(process.argv[2]&&process.argv[2]!=='all')?process.argv[2].split(','):Object.keys(sessions);
  const outFile=process.argv[3]||path.join(D,'probe_'+ids.join('_')+'.json');
  const enc=encounterList();
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:800,height:450}});
  page.on('pageerror',e=>console.log('PAGEERROR',e.message));
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'..','tests','vendor/three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+path.join(__dirname,'out','pt_build.html')+'?debug=1');await page.waitForTimeout(1200);
  await page.evaluate(fs.readFileSync(path.join(__dirname,'..','tests','helpers.js'),'utf8'));
  for(const f of['pt_scope.js','pt_persona.js'])await page.evaluate(code=>{ZC.X(code);},fs.readFileSync(path.join(__dirname,f),'utf8'));
  await page.evaluate(()=>{U.go();});
  const result={};const t0=Date.now();
  for(const sid of ids){
    const members=sessions[sid].map(id=>byId[id]);const solo=members.length===1&&members[0].mode==='solo';
    // кто за каким игроком: seat 1 → pi 0, seat 2 → pi 1
    const who=members.map(m=>({id:m.id,pi:solo?0:(m.seat-1),path:m.path,P:m.params,seed:0}));
    if(!solo&&who[0].pi===who[1].pi)who[1].pi=1-who[0].pi;
    const log=[];let curWorld=-1,fail=0,spent=false;
    await page.evaluate(()=>{PT.noPersona();});
    for(const e of enc){
      if(e.world!==curWorld){curWorld=e.world;await page.evaluate(([lv,solo])=>{ZC.setSolo(false);PT.arenaSetup(lv);if(solo)ZC.setSolo(true);},[WORLD_LEVEL[e.world],solo]);}
      const seed=(sid.split('').reduce((a,c)=>a+c.charCodeAt(0),0)*131+log.length*7919)>>>0;
      who.forEach((w,k)=>w.seed=seed+k*17);
      const encSlow=e.tutorial?0:99;      // замедление — только в прологе: к 1-1 «первые три встречи с каждым знаком» уже потрачены
      let res;
      try{res=await page.evaluate(([groups,who,enc,maxSec])=>PT.arena({groups,who,enc,maxSec}),[e.groups,who,encSlow,e.boss?90:60]);}
      catch(err){log.push({key:e.key,err:String(err.message).slice(0,120)});continue;}
      // провал: не победили за отведённое время или кто-то упал
      const failed=Object.values(res.downs).some(d=>d>0);          // падение (клубок ниток) — повод усомниться в пути; «не успели за минуту» — нет
      fail=failed?fail+1:0;let switched=null;
      const NEED={'7-8':2,'9-10':3,'11-13':3,'14+':4},need=Math.min(...members.map(m=>NEED[m.group]));   // самый нетерпеливый в паре решает
      if(fail>=need){const ord=['hard','mid','easy'];
        // самый «жёсткий» путь в группе уступает: меняет путь тот, у кого он тяжелее; ребёнок в паре с родителем — путь общий и становится лёгким
        const cur=ord.indexOf(who.reduce((m,w)=>ord.indexOf(w.path)<ord.indexOf(m)?w.path:m,'easy'));
        if(cur<ord.length-1){const nw=ord[cur+1];who.forEach(w=>{if(ord.indexOf(w.path)<ord.indexOf(nw))w.path=nw;});switched=nw;fail=0;}}
      log.push({key:e.key,lv:e.lv,world:e.world,groups:e.groups,boss:!!e.boss,tutorial:!!e.tutorial,cleared:res.cleared,sec:res.sec,hits:res.hits,downs:res.downs,def:res.def,plan:res.plan,know:res.know,paths:who.map(w=>w.path),switched});
    }
    result[sid]={members:sessions[sid],solo,log,finalPaths:Object.fromEntries(who.map(w=>[w.id,w.path])),
      wall:Math.round((Date.now()-t0)/1000)};
    console.log(sid,'встреч',log.length,'исход:',log.filter(l=>l.cleared).length,'побед,',log.reduce((a,l)=>a+(l.downs?Object.values(l.downs).reduce((x,y)=>x+y,0):0),0),'падений; путь →',JSON.stringify(result[sid].finalPaths),(Date.now()-t0)/1000+'s');
    fs.writeFileSync(outFile,JSON.stringify(result));
  }
  await browser.close();
})();
