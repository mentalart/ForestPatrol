// Вёрстка главного меню на разных размерах окна: логотип не должен наезжать на пункты меню, пункты не должны обрезаться снизу.
// node layout_check.js [путь к html]   (по умолчанию — релизная сборка zlataya_cep/zlataya_cep_final05.html)
const {chromium}=require('./pw');const path=require('path');
const html=path.resolve(process.argv[2]||path.join(__dirname,'../../zlataya_cep/zlataya_cep_final05.html'));
const SIZES=[[1920,1080],[1920,900],[1680,860],[1536,730],[1440,700],[1366,768],[1366,620],[1280,720],[1280,560],[1024,640],[1024,520],[800,600],[2560,1080]];
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});let bad=0;
  await Promise.all([0,1].map(async part=>{const page=await b.newPage();
    await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'vendor/three.min.js'),contentType:'application/javascript'}));
    for(const [w,h] of SIZES.filter((_,i)=>i%2===part)){await page.setViewportSize({width:w,height:h});await page.goto('file://'+html+'?debug=1');await page.waitForTimeout(900);
      const r=await page.evaluate(()=>{const L=document.getElementById('finLogo').getBoundingClientRect(),tag=document.querySelector('#finLogo .fin-tag').getBoundingClientRect(),its=[...document.querySelectorAll('#finPanel .fin-item')].map(e=>e.getBoundingClientRect());
        const f=its[0],l=its[its.length-1],P=document.getElementById('finPanel').getBoundingClientRect();return {tagBottom:Math.round(tag.bottom),logoBottom:Math.round(L.bottom),firstTop:Math.round(f.top),lastBottom:Math.round(l.bottom),panelBottom:Math.round(P.bottom),n:its.length,h:innerHeight};});
      // «Главы» и «Настройки» — самые длинные экраны меню
      const sub=await page.evaluate(()=>{const m=k=>ZC.menuKey(k),meas=()=>{const its=[...document.querySelectorAll('#finPanel .fin-item')].map(e=>e.getBoundingClientRect()),P=document.getElementById('finPanel').getBoundingClientRect(),hd=document.querySelector('#finPanel .fin-head'),L=document.querySelector('#finLogo .fin-tag').getBoundingClientRect();
          return {last:Math.round(its[its.length-1].bottom),pb:Math.round(P.bottom),top:Math.round((hd||its[0]).getBoundingClientRect().top),tag:Math.round(L.bottom)};};
        const F=ZC.FIN,idx=n=>F.menu.items.findIndex(i=>i.label===n),go=n=>{F.menu.sel=idx(n);m('Enter');};go('Главы');const a=meas();m('Escape');go('Настройки');const b=meas();m('Escape');return {a,b};});
      const clipSub=[sub.a,sub.b].some(x=>x.last>x.pb+1||x.last>r.h||x.tag>x.top);
      const overlap=r.tagBottom>r.firstTop,clipped=r.lastBottom>r.panelBottom+1||r.lastBottom>r.h||clipSub;if(overlap||clipped)bad++;
      console.log((overlap||clipped?'!! ':'   ')+w+'x'+h+'  подзаголовок до '+r.tagBottom+'  первый пункт с '+r.firstTop+'  последний пункт до '+r.lastBottom+' (окно '+r.h+')'+'  | Главы до '+sub.a.last+', Настройки до '+sub.b.last+(overlap?'  НАЕЗД':'')+(clipped?'  ОБРЕЗАНО':''));}
    await page.close();}));
  await b.close();console.log(bad?'с проблемами: '+bad:'вёрстка в порядке');process.exit(bad?1:0);})();
