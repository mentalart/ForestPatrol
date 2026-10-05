/* ============================== БИТВА С КОЩЕЕМ (k5epic) · ЗАПУСК: стартовый экран, выбор стадии, панель оценок ============================== */
// Только для сборки --k5epic (docs/28_koschei_epic_build.md). Файл открывается сразу на битве: выбрать «один / двое» и стадию.
// Tab — панель: стадии (перейти), оценка каждой стадии «Да / Доработать / Нет», заметки, «Скопировать отчёт» — прислать в чат.
// N — следующая стадия, B — предыдущая (для проверки; вне роликов).
const K5E=FIN.k5e=Object.assign(FIN.k5e||{},{startAt:0,r:{},notes:{},
  NAMES:['Пролог · Через леса, через моря','1 · У лукоморья дуб зелёный','2 · Там леший бродит','3 · Там лес и дол видений полны',
    '4 · Избушка там на курьих ножках','5 · Там о заре прихлынут волны','6 · В темнице там царевна тужит','7 · Следы невиданных зверей',
    '8 · Колдун несёт богатыря','9 · И тридцать витязей прекрасных','10 · Там царь Кащей над златом чахнет','11 · Без имён','12 · Златая цепь на дубе том'],
  ACTS:[[0,0,'Пролог'],[1,3,'Акт I · Чёрная строка'],[4,7,'Акт II · Неведомые дорожки'],[8,12,'Акт III · Там царь Кащей над златом чахнет']]});
try{const o=JSON.parse(localStorage.getItem('zc_k5e_v1')||'null');if(o){Object.assign(K5E.r,o.r||{});Object.assign(K5E.notes,o.notes||{});if(o.at!=null)K5E.startAt=o.at;if(o.solo!=null)K5E.solo0=o.solo;}}catch(e){}
K5E.save=()=>{try{localStorage.setItem('zc_k5e_v1',JSON.stringify({r:K5E.r,notes:K5E.notes,at:K5E.startAt,solo:G.solo}));}catch(e){}};
// без озвучки: ролики, которые считают время по длине записи, могут дать звуку пустое время — такие вызовы пропускаем
{const AP=AudioParam.prototype;for(const f of ['exponentialRampToValueAtTime','linearRampToValueAtTime','setValueAtTime','setTargetAtTime']){const o=AP[f];AP[f]=function(v,t){if(!isFinite(v)||!isFinite(t))return this;return o.apply(this,arguments);};}}
// перейти к стадии n (0 — пролог): уровень загружается заново и сразу прыгает к стадии
K5E.goStage=n=>{n=Math.max(0,Math.min(12,n|0));K5E.startAt=n;K5E.save();try{HN.html=['','',''];HN.shown=[false,false,false];HN.objK=['','',''];}catch(e){}
  const i=LV('5-B2');if(G.state==='play'&&W.levelId==='5-B2')loadLevel(i);else startFrom(i);k5eBadge();};

/* ---------- панель ---------- */
const K5EP={};
function k5ePanel(){const st=document.createElement('style');st.textContent=`
#k5eBadge{position:fixed;left:12px;bottom:12px;z-index:60;font:600 13px/1.2 system-ui,sans-serif;padding:7px 12px;border-radius:10px;cursor:pointer;user-select:none;background:#3b2a5c;color:#ffe8b0;box-shadow:0 2px 10px rgba(0,0,0,.35)}
#k5ePanel{position:fixed;right:12px;top:12px;bottom:12px;width:min(500px,calc(100vw - 24px));z-index:61;background:rgba(22,18,30,.96);color:#f3efe6;font:13px/1.35 system-ui,sans-serif;border-radius:14px;padding:12px 14px;overflow:auto;display:none;box-shadow:0 4px 24px rgba(0,0,0,.5)}
#k5ePanel h3{margin:4px 0 6px;font-size:16px;color:#ffd76a}#k5ePanel h4{margin:12px 0 4px;font-size:12px;color:#c8a8ff;text-transform:uppercase;letter-spacing:.5px}
#k5ePanel .row{display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center;padding:5px 0;border-top:1px solid rgba(255,255,255,.08)}
#k5ePanel .row.cur b{color:#ffd76a}#k5ePanel button{font:12px system-ui;padding:3px 8px;border-radius:6px;border:1px solid #6a6478;background:#352f42;color:#fff;cursor:pointer;margin:1px}
#k5ePanel .rt button.sel.y{background:#2f9e5b;border-color:#2f9e5b}#k5ePanel .rt button.sel.n{background:#b4433c;border-color:#b4433c}#k5ePanel .rt button.sel.m{background:#c38a1f;border-color:#c38a1f}
#k5ePanel textarea{width:100%;box-sizing:border-box;height:46px;margin-top:4px;background:#111;color:#eee;border:1px solid #555;border-radius:6px;font:12px system-ui}
#k5ePanel .help{color:#bdb6a8;font-size:12px}#k5ePanel .note{grid-column:1/3}
#k5ePanel .jump{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:6px;margin:6px 0 4px}
#k5ePanel .jump button{font:600 12px/1.25 system-ui;padding:7px 8px;text-align:left;border-radius:8px;background:#45386a;border-color:#7a68b0;margin:0}
#k5ePanel .jump button small{display:block;font-weight:400;opacity:.8}#k5ePanel .jump button.cur{background:#b8862a;border-color:#ffd76a}
#k5ePanel button.play{background:#2f6e4a;border-color:#4aa070}`;document.head.appendChild(st);
  const b=document.createElement('div');b.id='k5eBadge';document.body.appendChild(b);b.onclick=()=>k5eShow(K5EP.panel.style.display!=='block');K5EP.badge=b;
  const P=document.createElement('div');P.id='k5ePanel';document.body.appendChild(P);K5EP.panel=P;k5ePanelHtml();
  P.addEventListener('input',ev=>{const t=ev.target;if(t.dataset.note!=null){K5E.notes[t.dataset.note]=t.value;K5E.save();}});
  P.addEventListener('click',ev=>{const t=ev.target;try{uiAudio();}catch(e){}
    if(t.dataset.r!=null){K5E.r[t.dataset.r]=K5E.r[t.dataset.r]===t.dataset.v?undefined:t.dataset.v;K5E.save();k5ePanelHtml();}
    if(t.dataset.go!=null){k5eShow(false);K5E.goStage(+t.dataset.go);}
    if(t.dataset.copy!=null){const txt=k5eReport(),o=P.querySelector('[data-out]');o.style.display='block';o.value=txt;o.select();try{navigator.clipboard.writeText(txt);t.textContent='Скопировано ✓';}catch(e){}}});
  P.addEventListener('keydown',ev=>ev.stopPropagation());
  addEventListener('keydown',ev=>{if(ev.code==='Tab'){ev.preventDefault();k5eShow(P.style.display!=='block');}
    if(G.state==='play'&&!G.cine&&W.levelId==='5-B2'&&P.style.display!=='block'){const cur=K5E.cur==null?K5E.startAt:K5E.cur;
      if(ev.code==='KeyN')K5E.goStage(cur+1);if(ev.code==='KeyB')K5E.goStage(cur-1);}},true);
  k5eBadge();}
function k5ePanelHtml(){const P=K5EP.panel,RT=[['y','Да'],['m','Доработать'],['n','Нет']],cur=K5E.cur==null?K5E.startAt:K5E.cur;
  let h='<h3>Битва с Кощеем · тестовая сборка</h3><div class="help">Отдельный файл, в main не входит. Tab — панель · N / B — следующая / предыдущая стадия · Esc — пауза.<br>Оцените каждую стадию и напишите заметки — «Скопировать отчёт» и пришлите текст в чат.</div>';
  // переход к любой стадии одной кнопкой: уровень загружается с этой стадии (прежние — как пройденные)
  h+='<h4>Перейти к стадии</h4><div class="jump">';for(let n=0;n<=12;n++)h+='<button data-go="'+n+'"'+(n===cur?' class="cur"':'')+'>'+(n?n+'. ':'')+K5E.NAMES[n].replace(/^\d+\s*·\s*/,'')+'<small>'+(n===cur?'идёт сейчас — заново':'загрузить')+'</small></button>';h+='</div>';
  for(const [a,b,t] of K5E.ACTS){h+='<h4>'+t+'</h4>';for(let n=a;n<=b;n++)h+='<div class="row'+(n===cur?' cur':'')+'"><div><button class="play" data-go="'+n+'">▶ Играть</button> <b>'+K5E.NAMES[n]+'</b></div><div class="rt">'+RT.map(([c,l])=>'<button data-r="'+n+'" data-v="'+c+'" class="'+c+(K5E.r[n]===c?' sel':'')+'">'+l+'</button>').join('')+'</div>'+
    '<textarea class="note" data-note="'+n+'" placeholder="заметки к стадии">'+(K5E.notes[n]||'')+'</textarea></div>';}
  h+='<h4>Общее</h4><textarea data-note="all" placeholder="общие заметки">'+(K5E.notes.all||'')+'</textarea><button data-copy>Скопировать отчёт</button><textarea data-out readonly style="display:none;height:120px"></textarea>';
  P.innerHTML=h;}
function k5eShow(on){K5EP.panel.style.display=on?'block':'none';if(on)k5ePanelHtml();}
function k5eBadge(){const b=K5EP.badge;if(!b)return;const cur=K5E.cur==null?K5E.startAt:K5E.cur;b.textContent='Битва с Кощеем · '+K5E.NAMES[cur]+' · Tab — панель';}
K5E.badge=()=>k5eBadge();
function k5eReport(){const L={y:'да',m:'доработать',n:'нет'};let s='Битва с Кощеем — отчёт по тестовой сборке'+(K5E.build?' ('+K5E.build+')':'')+'\n';
  for(let n=0;n<=12;n++){const r=K5E.r[n],t=(K5E.notes[n]||'').trim();if(!r&&!t)continue;s+='- '+K5E.NAMES[n]+': '+(r?L[r]:'без оценки')+(t?' — '+t:'')+'\n';}
  if((K5E.notes.all||'').trim())s+='Общее: '+K5E.notes.all.trim()+'\n';return s;}

/* ---------- запуск: стартовый экран битвы ---------- */
finBoot=function(){FIN.applyQuality();FIN.applySettings();loadLevel(0);G.state='menu';
  const o=document.createElement('div');o.id='k5eStart';o.style.cssText='position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 30%,#2a1d44,#0c0814 75%);color:#f3efe6;font:15px/1.45 system-ui,sans-serif;padding:16px;overflow:auto';
  let solo=K5E.solo0!=null?!!K5E.solo0:false,at=K5E.startAt||0;
  const draw=()=>{let st='';for(const [a,b,t] of K5E.ACTS){st+='<div style="margin:10px 0 4px;color:#c8a8ff;font:700 12px system-ui;letter-spacing:.5px;text-transform:uppercase">'+t+'</div>';
      for(let n=a;n<=b;n++)st+='<button data-at="'+n+'" style="display:block;width:100%;text-align:left;font:600 14px system-ui;padding:7px 12px;margin:3px 0;border-radius:9px;border:1px solid '+(n===at?'#ffd76a':'#4a3e62')+';background:'+(n===at?'#4a3a1a':'#241b34')+';color:#fff;cursor:pointer">'+K5E.NAMES[n]+'</button>';}
    o.innerHTML='<div style="max-width:620px;width:100%"><div style="text-align:center;font:700 28px Georgia,serif;color:#ffd76a">Златая цепь · Битва с Кощеем</div>'+
      '<div style="text-align:center;opacity:.85;margin:6px 0 12px">Тестовая сборка финала 5-Б2: двенадцать стадий в трёх актах (docs/27). Без озвучки — реплики субтитрами.<br>Tab — панель с оценками и заметками · N / B — следующая / предыдущая стадия.</div>'+
      '<div style="text-align:center;margin-bottom:8px">'+[[false,'Двое'],[true,'Один игрок']].map(([v,l])=>'<button data-solo="'+(v?1:0)+'" style="font:600 15px system-ui;padding:9px 20px;margin:4px;border-radius:10px;border:2px solid '+(solo===v?'#ffd76a':'transparent')+';background:'+(v?'#2f7a4b':'#2f5ab8')+';color:#fff;cursor:pointer">'+l+'</button>').join('')+'</div>'+
      st+'<div style="text-align:center;margin-top:14px"><button data-go="1" style="font:700 17px system-ui;padding:12px 30px;border-radius:12px;border:0;background:#d8a020;color:#2a1a08;cursor:pointer">Начать: '+K5E.NAMES[at]+'</button></div>'+
      '<div style="opacity:.65;margin-top:12px;font-size:12px;text-align:center">Игрок 1: WASD, пробел, F — удар, G — щит, Shift — кувырок, E — умение, R — предмет, 1 — «Ко мне!», Q — смена героя.<br>Игрок 2: стрелки, M, «,» — удар, «.» — щит, / — кувырок, L — умение, ; — предмет, 0 — «Ко мне!», K — смена. Enter — начать.</div></div>';};
  draw();document.body.appendChild(o);
  const go=()=>{if(!o.parentNode)return;o.remove();uiAudio();setSolo(solo);K5E.goStage(at);};
  o.addEventListener('click',ev=>{const d=ev.target.dataset||{};if(d.solo!=null){solo=d.solo==='1';draw();}if(d.at!=null){at=+d.at;draw();}if(d.go!=null)go();});
  addEventListener('keydown',function k(ev){if(ev.code==='Enter'&&o.parentNode){removeEventListener('keydown',k);go();}});};
setTimeout(k5ePanel,0);
