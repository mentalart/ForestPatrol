const path=require('path');const root=path.resolve(__dirname,'../..');
const {chromium}=require(path.join(root,'tools/tests/pw'));
const html=process.argv[2]||path.join(root,'zlataya_cep/zlataya_cep_final06.html');
(async()=>{const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const out={};
 for(const [w,h] of [[1280,720],[1920,1080],[1024,576]]){
  const page=await browser.newPage({viewport:{width:w,height:h}});
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(root,'tools/tests/vendor/three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+html+'?debug=1');await page.waitForTimeout(1500);
  out[w+'x'+h]=await page.evaluate(()=>{
    const R={};const fs=(el)=>parseFloat(getComputedStyle(el).fontSize);
    const mk=(cls,id,txt,parent)=>{const d=document.createElement('div');if(cls)d.className=cls;if(id)d.id=id;d.innerHTML=txt||'Тест';(parent||document.body).appendChild(d);return d;};
    const probe=[];
    const add=(name,el)=>{R[name]=+fs(el).toFixed(1);};
    // существующие
    for(const [n,id] of [['subs','subs'],['banner','banner'],['bossbar','bossbar'],['skip','skip']]){const e=document.getElementById(id);if(e)add(n,e);}
    const b=document.getElementById('banner');if(b){b.innerHTML='Х<small>у</small>';add('banner small',b.querySelector('small'));}
    // карточки подсказок
    const c=mk('hn-card','tmp_hn','<div class="hn-head">Голова</div><div class="hn-body">Тело</div>');add('hn-card body',c);add('hn-head',c.firstChild);
    const hs=mk('hn-card','tmp_hn2','<div class="hn-head hn-short">Кратко</div><div class="hn-body">Тело</div>');add('hn-short head',hs.firstChild);add('hn-short body',hs.lastChild);
    const t=mk('tip',null,'x');add('.tip (скрыт)',t);const o=mk('obj',null,'x');add('.obj (скрыт)',o);const f=mk('float',null,'x');add('float',f);
    // боссовые подсказки 4-Б
    let tut=document.getElementById('finTut'),bh=document.getElementById('finBossHint');
    if(!tut){tut=mk(null,'finTut','');bh=mk(null,'finBossHint','');}
    tut.innerHTML='<div class="ft-head"><span class="ft-tag">Т</span>Заголовок</div><div class="ft-body"><div class="ft-text">Текст</div></div><div class="ft-keys"><span class="ft-key">K</span></div><div class="ft-go">Нажми</div>';
    add('finTut .ft-head',tut.querySelector('.ft-head'));add('finTut .ft-text',tut.querySelector('.ft-text'));add('finTut .ft-key',tut.querySelector('.ft-key'));add('finTut .ft-go',tut.querySelector('.ft-go'));add('finTut .ft-tag',tut.querySelector('.ft-tag'));
    bh.innerHTML='<div class="fh-row"><div class="fh-main"><div class="fh-title"><span class="ft-tag">Т</span>Заг</div><div class="fh-text">Текст</div></div><div class="fh-keys"><span class="ft-key">K</span></div></div>';
    add('finBossHint .fh-title',bh.querySelector('.fh-title'));add('finBossHint .fh-text',bh.querySelector('.fh-text'));add('finBossHint .ft-key',bh.querySelector('.ft-key'));
    // табличка Соловья
    R['solsign (фикс.)']=22;
    return R;});
  await page.close();}
 console.log(JSON.stringify(out,null,1));await browser.close();})();
