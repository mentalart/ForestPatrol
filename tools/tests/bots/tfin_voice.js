//@@ wait=1500
// релиз final06: озвучка всей игры. У всех реплик каталога build/voice/lines.json есть записи; в ролике «Колыбельная» записи звучат
// по порядку, вместо «бормотания» (babble), субтитр держится до конца фразы; сценки уровня (лесенка) тоже с голосом; при громкости
// «Голоса» 0 — снова бормотание; пропуск ролика глушит голос; ролик, где голос длиннее паузы до следующей реплики, замедляется
// и дожидается конца фразы (реплики Яги из финала 1-1).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.V=ZC.FIN.vox;V.audio();window.L=V.lines;if(L.length<600)throw new Error('записей '+L.length+' — меньше 600');
if(L.some(e=>!e.dur))throw new Error('без длительности: '+L.filter(e=>!e.dur).map(e=>e.id).join(','));
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(20);
// все записи уровня раскодированы заранее (загрузка уровня)
window._dec=()=>L.filter(e=>e.buf).length;'lines='+L.length+' минут='+(L.reduce((a,e)=>a+e.dur,0)/60).toFixed(1)
//@@
const lv=L.filter(e=>e.lv==='p'||e.lv==='g');if(lv.some(e=>!e.buf))throw new Error('не раскодированы: '+lv.filter(e=>!e.buf).map(e=>e.id).join(','));
'decoded='+_dec()+'/'+L.length+' (уровень и общие: '+lv.length+') bad='+L.filter(e=>e.bad).map(e=>e.id).join(',')
//@@
// «Колыбельная»: оба героя на жёлтых пятнах (final06: после падения с самокатом Прошка смеётся над собой — p05d; смех Тишки, Потапа
// и Пелагеи звучит поверх и текущей записью не становится)
const P=ZC.players;P[0].heroes[P[0].act].pos.set(-2,0,1.4);P[1].heroes[P[1].act].pos.set(2.2,0,1.4);window._seq=[];window._b0=V.babbled;let last=null,n=0;
while(!ZC.G.cine&&n<200){ZC.tick(1);n++;}
for(let i=0;i<60*40&&ZC.G.cine;i++){ZC.tick(1);const c=V.cur;if(c&&c!==last){window._seq.push(c+'@'+ZC.G.cine.t.toFixed(1));}last=c;}
const want=['p01_bayu','p02_zabyl','p03_malyshi','p04_samokat','p05_haha','p05d_prokatilsya','p06_bezhim'];const got=window._seq.map(s=>s.split('@')[0]);
if(want.join()!==got.join())throw new Error('в ролике прозвучали '+window._seq.join(' ')+' вместо '+want.join(' '));
if(V.babbled!==window._b0)throw new Error('бормотание при озвученных репликах: '+(V.babbled-window._b0));
'cine voices: '+window._seq.join(' ')+' babble=0'
//@@
// сценка у лесенки: реплики уровня с голосом, субтитр не короче записи
const b1=V.babbled;const e=V.find('potap','Стой, не бойся ничего —<br>Подниму тебя легко!');V.say('potap','Стой, не бойся ничего —<br>Подниму тебя легко!',1.0);const cur1=V.cur;const st=V.sub;
V.say('yosha','Сам управлюсь — я не мал!',1.6);const cur2=V.cur;
if(cur1!=='p10_podnimu'||cur2!=='p11_sam')throw new Error('реплики уровня: '+cur1+', '+cur2);if(st<e.dur)throw new Error('субтитр '+st+' короче записи '+e.dur);
if(V.babbled!==b1)throw new Error('бормотание: '+(V.babbled-b1));
'level voices: '+cur1+' '+cur2+' sub='+st.toFixed(2)+'≥'+e.dur.toFixed(2)
//@@
// громкость «Голоса» 0 — бормотание вместо записи; пропуск ролика глушит голос
const vol=ZC.FIN.set.vox;ZC.FIN.set.vox=0;const b2=V.babbled;V.stop(0.01);V.say('proshka','Щас подкручу механизм —<br>Держи лесенку, дружок!',2.4);const off=[V.cur,V.babbled-b2];ZC.FIN.set.vox=vol;
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(20);const P2=ZC.players;P2[0].heroes[P2[0].act].pos.set(-2,0,1.4);P2[1].heroes[P2[1].act].pos.set(2.2,0,1.4);
let k=0;while(!(ZC.G.cine&&V.cur)&&k<400){ZC.tick(1);k++;}const during=V.cur;ZC.skip();ZC.tick(3);const after=V.cur;
if(off[0]||!off[1])throw new Error('при громкости 0: cur='+off[0]+' babble='+off[1]);if(!during||after)throw new Error('пропуск ролика: during='+during+' after='+after);
['vox0: babble='+off[1],'skip: '+during+' → '+after,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')].join(' · ')
//@@ wait=1500
// ролик ждёт голос: две реплики Яги, запись первой длиннее паузы до второй — время ролика замедляется, вторая начинается после конца первой
// (пауза после шага — записи уровня 1-1 раскодируются в фоне; ролик ждёт по часам звука, бот меряет по времени игры — допуск 6 %)
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);window.Y1=L.find(e=>e.id==='1-1_006');window.Y2=L.find(e=>e.id==='1-1_007');
'1-1: '+Y1.dur+'s в паузу 2.2s'
//@@
if(!Y1.buf||!Y2.buf)throw new Error('реплики 1-1 не раскодированы: уровень '+ZC.W.levelId+' pending='+!!Y1.pending+' bad='+!!Y1.bad+' b64='+(Y1.b64||'').length+' decoded='+_dec());const s0=V.slowed;
V.cine({dur:6,says:[[0.2,2.2,'yaga',Y1.text],[2.4,2,'yaga',Y2.text]]});let t1=null,t2=null,ct2=null;
for(let i=0;i<60*14&&ZC.G.cine;i++){ZC.tick(1);if(V.cur==='1-1_006'&&t1==null)t1=ZC.G.time;if(V.cur==='1-1_007'&&t2==null){t2=ZC.G.time;ct2=ZC.G.cine&&ZC.G.cine.t;}}
if(t1==null||t2==null)throw new Error('реплики ролика: '+t1+' '+t2);const gap=t2-t1,sl=V.slowed-s0;
if(gap<Y1.dur*0.94)throw new Error('вторая реплика оборвала первую: через '+gap.toFixed(2)+' с при записи '+Y1.dur);if(sl<0.5)throw new Error('ролик не замедлился: '+sl.toFixed(2));
'wait: 2-я через '+gap.toFixed(2)+'с ≥ '+Y1.dur+' (по ролику '+(ct2||0).toFixed(2)+'), замедление '+sl.toFixed(2)+'с · errs='+window._errs.length
