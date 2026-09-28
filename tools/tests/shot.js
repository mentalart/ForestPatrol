// Один кадр страницы: node shot.js <index.html> <out.png> [js перед кадром] [ожидание, мс]
const {chromium}=require('./pw');
const path=require('path');
(async()=>{
  const [,,html,out,code,waitMs]=process.argv;
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  const logs=[];page.on('console',m=>logs.push(m.type()+': '+m.text()));page.on('pageerror',e=>logs.push('PAGEERROR: '+e.message+'\n'+e.stack));
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'vendor/three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+path.resolve(html)+'?debug=1');
  await page.waitForTimeout(1500);
  if(code){const res=await page.evaluate(code);if(res!==undefined)console.log('>',JSON.stringify(res));}
  if(waitMs)await page.waitForTimeout(+waitMs);
  await page.screenshot({path:out});
  if(logs.length)console.log(logs.join('\n'));
  await browser.close();
})();
