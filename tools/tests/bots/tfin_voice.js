//@@
// релиз final06: озвучка пролога. У всех реплик каталога build/voice/lines.json есть записи; в ролике «Колыбельная» записи звучат
// по порядку, вместо «бормотания» (babble), субтитр держится до конца фразы; сценки уровня (лесенка) тоже с голосом; при громкости
// «Голоса» 0 — снова бормотание; пропуск ролика глушит голос.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.V=ZC.FIN.vox;V.audio();window.L=V.lines;if(L.length<11)throw new Error('записей '+L.length+' из 11: '+L.map(e=>e.id).join(','));
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(20);
// все записи уровня раскодированы заранее (загрузка уровня)
window._dec=()=>L.filter(e=>e.buf).length;'lines='+L.length+' dur='+L.map(e=>e.dur.toFixed(2)).join('/')
//@@ wait=1500
'decoded='+_dec()+'/'+L.length+' bad='+L.filter(e=>e.bad).map(e=>e.id).join(',')
//@@
// «Колыбельная»: оба героя на жёлтых пятнах
const P=ZC.players;P[0].heroes[P[0].act].pos.set(-2,0,1.4);P[1].heroes[P[1].act].pos.set(2.2,0,1.4);window._seq=[];window._b0=V.babbled;let last=null,n=0;
while(!ZC.G.cine&&n<200){ZC.tick(1);n++;}
for(let i=0;i<60*40&&ZC.G.cine;i++){ZC.tick(1);const c=V.cur;if(c&&c!==last){window._seq.push(c+'@'+ZC.G.cine.t.toFixed(1));}last=c;}
const want=['p01_bayu','p02_zabyl','p03_malyshi','p04_samokat','p05_haha','p06_bezhim'];const got=window._seq.map(s=>s.split('@')[0]);
if(want.join()!==got.join())throw new Error('в ролике прозвучали '+window._seq.join(' ')+' вместо '+want.join(' '));
if(V.babbled!==window._b0)throw new Error('бормотание при озвученных репликах: '+(V.babbled-window._b0));
'cine voices: '+window._seq.join(' ')+' babble=0'
//@@
// сценка у лесенки: реплики уровня с голосом, субтитр не короче записи
const b1=V.babbled;const e=V.find('potap','Стой там, я тебя подниму!');V.say('potap','Стой там, я тебя подниму!',1.0);const cur1=V.cur;const st=V.sub;
V.say('yosha','Я сам!',1.6);const cur2=V.cur;
if(cur1!=='p10_podnimu'||cur2!=='p11_sam')throw new Error('реплики уровня: '+cur1+', '+cur2);if(st<e.dur)throw new Error('субтитр '+st+' короче записи '+e.dur);
if(V.babbled!==b1)throw new Error('бормотание: '+(V.babbled-b1));
'level voices: '+cur1+' '+cur2+' sub='+st.toFixed(2)+'≥'+e.dur.toFixed(2)
//@@
// громкость «Голоса» 0 — бормотание вместо записи; пропуск ролика глушит голос
const vol=ZC.FIN.set.vox;ZC.FIN.set.vox=0;const b2=V.babbled;V.stop(0.01);V.say('proshka','Щас подкручу — держи лесенку!',2.4);const off=[V.cur,V.babbled-b2];ZC.FIN.set.vox=vol;
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(20);const P2=ZC.players;P2[0].heroes[P2[0].act].pos.set(-2,0,1.4);P2[1].heroes[P2[1].act].pos.set(2.2,0,1.4);
let k=0;while(!(ZC.G.cine&&V.cur)&&k<400){ZC.tick(1);k++;}const during=V.cur;ZC.skip();ZC.tick(3);const after=V.cur;
if(off[0]||!off[1])throw new Error('при громкости 0: cur='+off[0]+' babble='+off[1]);if(!during||after)throw new Error('пропуск ролика: during='+during+' after='+after);
['vox0: babble='+off[1],'skip: '+during+' → '+after,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')].join(' · ')
