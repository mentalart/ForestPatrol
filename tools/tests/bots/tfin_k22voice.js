//@@ wait=1500
// релиз final06: 2-2 «Рыба-кит» — вступительный ролик (kitIntro, late_99f_k22_p2_stove.js) озвучен целиком: шесть строк Сказительницы
// (Ершов: «Поперёк моря лежит Чудо-юдо Рыба-кит…», записи 2-2_s01…s06, голос cast.reader) звучат по порядку, без «бормотания»; ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.V=ZC.FIN.vox;V.audio();window.L=V.lines;window.WANT=['2-2_s01','2-2_s02','2-2_s03','2-2_s04','2-2_s05','2-2_s06'];
const miss=WANT.filter(id=>!L.find(e=>e.id===id));if(miss.length)throw new Error('нет в каталоге: '+miss.join(','));
ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(2);
'2-2: '+WANT.map(id=>id+' '+L.find(e=>e.id===id).dur+'s').join(' ')
//@@
const lv=L.filter(e=>WANT.includes(e.id));if(lv.some(e=>!e.buf))throw new Error('не раскодированы: '+lv.filter(e=>!e.buf).map(e=>e.id).join(','));
window._seq=[];window._b0=V.babbled;let last=null,n=0;while(!ZC.G.cine&&n<400){ZC.tick(1);n++;}if(!ZC.G.cine)throw new Error('ролик не начался');
const t0=ZC.G.time;for(let i=0;i<60*40&&ZC.G.cine;i++){ZC.tick(1);const c=V.cur;if(c&&c!==last)window._seq.push(c+'@'+ZC.G.cine.t.toFixed(1));last=c;}
const got=window._seq.map(s=>s.split('@')[0]).filter(id=>id.startsWith('2-2_s'));
if(got.join()!==WANT.join())throw new Error('прозвучали '+window._seq.join(' ')+' вместо '+WANT.join(' '));
if(V.babbled!==window._b0)throw new Error('бормотание: '+(V.babbled-window._b0));if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'kitIntro: '+window._seq.join(' ')+' · ролик '+(ZC.G.time-t0).toFixed(1)+'с · babble=0 · errs=0'
