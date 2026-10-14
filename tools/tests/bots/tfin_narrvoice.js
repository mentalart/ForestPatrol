//@@ wait=1500
// релиз final06: ремарки рассказчика в роликах миров 1 и 2 (курсивные строки без имени) читает Сказительница — записи <уровень>_sNN
// в build/voice/lines.json (who: null, voice: reader). Проверки: у каждой такой записи есть длительность и она находится по тексту
// субтитра (say(null, текст)); самая длинная против паузы ремарка (1-3_s01: запись ~6,4 с в паузу 2,2 с) звучит до конца — ролик ждёт
// голос Сказительницы дольше обычного (до 4,5 с добавки, late_91_voice.js), следующая реплика её не обрывает; ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.V=ZC.FIN.vox;V.audio();window.L=V.lines;window.N=L.filter(e=>e.voice==='reader'&&!e.who&&/^[12]-/.test(e.lv));
if(N.length<70)throw new Error('ремарок Сказительницы '+N.length+' — меньше 70');
const bad=N.filter(e=>!e.dur||V.find(null,e.text)!==e);if(bad.length)throw new Error('не находятся по тексту: '+bad.map(e=>e.id).join(','));
ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(20);window.Y1=L.find(e=>e.id==='1-3_s01');window.Y2=L.find(e=>e.id==='1-3_s02');
'ремарок '+N.length+' · 1-3_s01 '+Y1.dur+'s в паузу 2.2s'
//@@
if(!Y1.buf||!Y2.buf)throw new Error('записи 1-3 не раскодированы');const s0=V.slowed;
V.cine({dur:8,says:[[0.2,2.2,null,Y1.text,true],[2.4,3,null,Y2.text,true]]});let t1=null,t2=null;
for(let i=0;i<60*20&&ZC.G.cine;i++){ZC.tick(1);if(V.cur==='1-3_s01'&&t1==null)t1=ZC.G.time;if(V.cur==='1-3_s02'&&t2==null)t2=ZC.G.time;}
if(t1==null||t2==null)throw new Error('ремарки ролика: '+t1+' '+t2);const gap=t2-t1,sl=V.slowed-s0;
if(gap<Y1.dur*0.94)throw new Error('вторая ремарка оборвала первую: через '+gap.toFixed(2)+' с при записи '+Y1.dur);
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'wait: 2-я через '+gap.toFixed(2)+'с ≥ '+Y1.dur+', замедление '+sl.toFixed(2)+'с · errs=0'
