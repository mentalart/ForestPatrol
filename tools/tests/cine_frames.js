// Кадры ролика — по одному на каждый план, одной командой (раньше моменты для снимков подбирались вручную в боте):
//   node tools/tests/cine_frames.js 1-1                         # первый ролик уровня (обычно вступление)
//   node tools/tests/cine_frames.js 2-2 --nth 1                  # второй ролик, что случится сам
//   node tools/tests/cine_frames.js 1-1 --code "ZC.W.rzt.state='done';ZC.W.rzt.onDone()"   # сперва пропустить ролики, выполнить код — и снять следующий ролик
//   node tools/tests/cine_frames.js 2-2 --warp crown             # перенести героев (FIN.warp: номер колокольчика или имя участка) — и снять следующий ролик
//   опции: --html путь (по умолчанию zlataya_cep/zlataya_cep_final06.html — сперва build_final.py), --out папка (tools/tests/shots/cine), --solo
// Печатает для каждого плана время, реплику в субтитрах и имя файла кадра.
const {chromium}=require('./pw');const path=require('path'),fs=require('fs');
const a=process.argv.slice(2),opt=k=>{const i=a.indexOf(k);return i>=0?a[i+1]:null;};
const level=a[0],nth=+(opt('--nth')||0),code=opt('--code'),warp=opt('--warp'),solo=a.includes('--solo');
const html=path.resolve(opt('--html')||path.join(__dirname,'..','..','zlataya_cep','zlataya_cep_final06.html')),out=path.resolve(opt('--out')||path.join(__dirname,'shots','cine'));
if(!level){console.log('уровень? node tools/tests/cine_frames.js 1-1 [--nth N] [--code JS] [--warp N|имя] [--solo]');process.exit(2);}
if(!fs.existsSync(html)){console.log('нет сборки '+html+' — python3 zlataya_cep/build/build_final.py');process.exit(2);}
(async()=>{fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const page=await browser.newPage({viewport:{width:1280,height:720}});
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'vendor/three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+html+'?debug=1');await page.waitForTimeout(1200);await page.evaluate(fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8'));
  const E=async f=>{try{return await page.evaluate(f);}catch(e){console.log('ОШИБКА',e.message.split('\n')[0]);await browser.close();process.exit(1);}};
  const hideTitle="{const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}}";
  await E(`ZC.setSolo(${solo});ZC.startFrom(ZC.LV(${JSON.stringify(level)}));ZC.G.manual=true;ZC.tick(5);${hideTitle}`);
  if(code||warp){await E(`U.nocine();ZC.tick(10);U.nocine();${warp?`ZC.FIN.warp(${/^\d+$/.test(warp)?warp:JSON.stringify(warp)});`:''}${code||''};0`);}
  // дождаться нужного ролика: n-й по счёту с этого места (предыдущие — пропустить)
  for(let k=0;;k++){const ok=await E(`(()=>{let t=0;while(!ZC.G.cine&&t<1800){ZC.tick(1);t++;}return !!ZC.G.cine;})()`);
    if(!ok){console.log('ролик не начался за 30 с игры'+(k?' (найдено роликов: '+k+')':''));await browser.close();process.exit(1);}
    if(k>=nth)break;await E(`ZC.skip();ZC.tick(5);0`);}
  const info=await E(`(()=>{const d=ZC.FIN.lastCine||{};return {dur:ZC.G.cine.dur,shots:(d.shots||[]).map(s=>s.t)};})()`);
  const times=(info.shots.length?info.shots:[0]).map((t,i,A)=>{const nx=i+1<A.length?A[i+1]:info.dur;return Math.min(t+Math.max(0.4,(nx-t)*0.45),nx-0.05);});
  console.log(level+': ролик '+info.dur.toFixed(1)+' с, планов '+info.shots.length);
  for(let i=0;i<times.length;i++){const r=await E(`(()=>{let n=0;while(ZC.G.cine&&ZC.G.cine.t<${times[i]}&&n<6000){ZC.tick(1);n++;}${hideTitle}
      const s=document.getElementById('subs');return {t:ZC.G.cine?ZC.G.cine.t:-1,sub:s&&s.style.display!=='none'?s.textContent.replace(/\\s+/g,' ').trim():''};})()`);
    if(r.t<0){console.log('  ролик кончился раньше плана '+(i+1));break;}
    const f=path.join(out,'cine_'+level+'_'+nth+'_'+String(i+1).padStart(2,'0')+'.png');await page.waitForTimeout(200);
    try{await page.screenshot({path:f,timeout:+(process.env.SHOT_TIMEOUT||45000)});}catch(e){console.log('  SHOT SKIPPED',path.basename(f));}
    console.log('  план '+(i+1)+' · '+r.t.toFixed(1)+' с · '+(r.sub||'—').slice(0,110)+' → '+path.relative(process.cwd(),f));}
  await browser.close();})();
