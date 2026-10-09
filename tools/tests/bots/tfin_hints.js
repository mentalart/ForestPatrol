//@@
// релиз final06: подсказки — одна карточка на игрока под его панелью, общая — по центру (late_79_hints.js). Проверки:
// одинаковая у обоих задача (с разными кнопками) — одна общая карточка с кнопками «первый / второй»; одинаковые подсказки — тоже;
// почти одинаковые тексты (общее начало, различие в паре слов) — тоже одной, различия цветами игроков; подсказка, которая
// пересказывает задачу, не показывается; одиночная игра — подсказки только тому, кем играешь; идёт подсказка
// босса — подсказки игроков молчат, общая карточка — ниже неё; на нескольких уровнях — нет двух карточек с одним и тем же,
// карточки не наезжают друг на друга, на панели игроков, счётчик и «весточку». Кадры hints_*.png.
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.H=ZC.FIN.hints;window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.norm=s=>String(s||'').replace(/<kbd>[\s\S]*?<\/kbd>|<span class="pb [^"]*">[\s\S]*?<\/span>/g,' ').replace(/<[^>]*>/g,' ').replace(/[«»"“”.,!?:;—–\-()…◆]/g,' ').replace(/\s+/g,' ').trim().toLowerCase();
window.on=id=>{const e=document.getElementById(id);return !!(e&&e.classList.contains('on')&&!e.classList.contains('hn-yield')&&getComputedStyle(e).visibility!=='hidden');};
window.cards=()=>['hint0','hint1','hintS'].filter(on).map(id=>({id,el:document.getElementById(id),html:document.getElementById(id).innerHTML}));
window.oldOn=()=>['tip0','tip1','obj0','obj1'].filter(id=>getComputedStyle(document.getElementById(id)).display!=='none');
// повтор: две карточки с одним текстом или одна почти целиком пересказывает другую
window.dups=()=>{const C=cards(),out=[];for(let a=0;a<C.length;a++)for(let b=a+1;b<C.length;b++){const x=C[a].html,y=C[b].html;if(norm(x)===norm(y)||H.cover(x,y)>=0.6||H.cover(y,x)>=0.6)out.push(C[a].id+'≈'+C[b].id);}return out;};
window.hit=(r,q)=>Math.max(0,Math.min(r.right,q.right)-Math.max(r.left,q.left))*Math.max(0,Math.min(r.bottom,q.bottom)-Math.max(r.top,q.top))>6;
window.overlaps=()=>{const C=cards(),out=[];const rr=id=>{const e=document.getElementById(id);if(!e)return null;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<0.05)return null;return e.getBoundingClientRect();};
  const ban=document.getElementById('banner'),banR=ban&&ban.innerHTML.trim()&&+(ban.style.opacity||0)>0.05?ban.getBoundingClientRect():null;   // баннер — по заданной прозрачности (переход в браузере без экрана не идёт)
  const fixed=['hud0','hud1','links','vest','bossbar','finBossHint'].map(id=>[id,rr(id)]).concat([['banner',banR]]).filter(x=>x[1]);
  for(let a=0;a<C.length;a++){const r=C[a].el.getBoundingClientRect();for(const [id,q] of fixed)if(hit(r,q))out.push(C[a].id+'×'+id);for(let b=a+1;b<C.length;b++)if(hit(r,C[b].el.getBoundingClientRect()))out.push(C[a].id+'×'+C[b].id);}return out;};
window.go=id=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(20);for(let k=0;k<8;k++){if(ZC.G.cine)ZC.skip();ZC.sim(0.5);}};
// разбор текстов: слияние кнопок, «пересказ», заголовок
const m=H.merge('Брось клубок <kbd>R</kbd> к середине','Брось клубок <kbd>;</kbd> к середине');chk(m&&/hn-k2/.test(m)&&/R/.test(m)&&/;/.test(m),'кнопки не слились: '+m);
chk(H.merge('Иди налево','Иди направо')===null,'разные тексты слились');
chk(H.cover('Невод держат двое на камнях. Течения навстречу с двух ракушек','Ёрш в озере озорует! Невод поперёк озера держат двое на камнях. Двое у раковин — течения навстречу с двух ракушек')>=0.6,'пересказ не узнан');
chk(H.cover('Колокольчик! Коль упадёшь — сюда вернёшься','Первое дело — сундук на дне. Видишь четыре камня?')<0.3,'разные тексты — «пересказ»');
chk(H.short('Ёрш Ершович в озере озорует! Невод поперёк озера держат двое.')==='Ёрш Ершович в озере озорует!','заголовок: '+H.short('Ёрш Ершович в озере озорует! Невод поперёк озера держат двое.'));
// почти одинаковые тексты с общим началом — одним текстом, различия цветами игроков; разные роли (начало разное) — не склеивать
const f=H.fuzzy('Вал по пятам! Дуб поперёк тропы — Потап его поднимет <kbd>E</kbd> (смени героя <kbd>Q</kbd>).','Вал по пятам! Дуб поперёк тропы — Потап его поднимет. Беги следом!');
chk(f&&/hn-p1/.test(f)&&/hn-p2/.test(f)&&/смени героя/.test(f)&&/Беги следом/.test(f)&&(f.match(/Вал по пятам/g)||[]).length===1,'почти одинаковые не склеились: '+f);
const fs=H.fuzzy('<i class="sg y"></i> Солнышко! Защита <kbd>G</kbd>','<i class="sg y"></i> Солнышко! Защита <kbd>.</kbd> — в последний миг.');   // у второго щит уже выучен — хвост
chk(fs&&/hn-k2/.test(fs)&&/hn-v1 hn-p2">— в последний миг/.test(fs),'хвост одного игрока: '+fs);
chk(H.fuzzy('Левая голова — твоя: <kbd>WASD</kbd> её ведут.','Правая голова — твоя: <kbd>↑←↓→</kbd> её ведут.')===null,'склеились разные роли');
const pr=H.pair('Левая голова — твоя: <kbd>WASD</kbd> её ведут. Вместе тянете дольше секунды — Горыныч разгоняется.','Правая голова — твоя: <kbd>↑←↓→</kbd> её ведут. Вместе тянете дольше секунды — Горыныч разгоняется.');
chk(pr&&/Горыныч/.test(pr.s)&&/Левая/.test(pr.a)&&/Правая/.test(pr.b)&&!/Горыныч/.test(pr.a+pr.b),'общая фраза и свои: '+JSON.stringify(pr));
['merge='+!!m,'fuzzy='+!!f,'замечаний '+BAD.length]
//@@
// 2-3: задача у обоих одна — одна общая карточка, старые окна скрыты
go('2-3');const C=cards();const s=document.getElementById('hintS');
chk(on('hintS'),'нет общей карточки');chk(oldOn().length===0,'старые окна видны: '+oldOn());chk(/hn-k2/.test(s.innerHTML),'в общей карточке нет кнопок обоих');
chk(!C.some(c=>c.id!=='hintS'&&norm(c.html)===norm(s.innerHTML)),'задача и в общей, и в личной');chk(dups().length===0,'повторы: '+dups());chk(overlaps().length===0,'наложения: '+overlaps());
['cards='+C.map(c=>c.id).join(','),'dups='+dups().join(','),'over='+overlaps().join(',')]
//@@ shot=hints_23.png
// как на присланном снимке: обоим одна и та же подсказка — в общую карточку; подсказка-пересказ задачи — не видна
const W=ZC.W,o0=W.objectives[0][ZC.players[0].obj],ot=typeof o0.text==='function'?o0.text():o0.text;
for(const pi of[0,1]){const h=ZC.players[pi].heroes[ZC.players[pi].act];h.pos.set(pi?1.2:-1.2,0,1);h.vel.set(0,0,0);}   // с колокольчика — он то и дело напоминает о себе
for(const pi of[0,1])ZC.players[pi].tipT=0;   // своя подсказка у игрока («Колокольчик!») — снять: в ботах она убывает только при обновлении интерфейса
W.tipZones.unshift({cond:()=>true,text:pi=>'Невод держат двое на камнях. Встань у ракушки лицом к середине озера '+(pi?'<kbd>;</kbd>':'<kbd>R</kbd>')+'.'});ZC.sim(0.5);
const same=()=>{const a=document.getElementById('tip0').innerHTML,b=document.getElementById('tip1').innerHTML;return /ракушки/.test(a)&&H.merge(a,b)!==null;};
for(let i=0;i<12&&!same();i++)ZC.sim(0.5);   // у игрока может быть своя подсказка поважнее (клубок, колокольчик) — дождаться, пока у обоих та же
let C=cards();const one=C.filter(c=>/ракушки/.test(c.html));chk(same(),'у игроков так и не совпала подсказка');chk(one.length===1&&one[0].id==='hintS','одинаковая подсказка не в одной общей карточке: '+one.map(c=>c.id));chk(dups().length===0,'повторы: '+dups());
W.tipZones[0].text=pi=>ot;ZC.sim(0.5);C=cards();chk(C.filter(c=>norm(c.html).includes(norm(ot).slice(0,40))).length===(o0.short?0:1),'подсказка-пересказ задачи видна отдельно');   // у задачи есть краткая строка — в карточке она, а полного текста (его повторяла бы подсказка) нет
W.tipZones.shift();ZC.sim(0.5);{const lv=document.getElementById('level');lv.style.transition='none';lv.style.opacity=0;}   // для кадра: в браузере без экрана заставка с именем уровня не успевает погаснуть
['shared tip='+one.length,'cards='+cards().map(c=>c.id)]
//@@
// идёт подсказка босса — подсказки игроков молчат, общая карточка — под ней
const W=ZC.W;W.tipZones.unshift({cond:pi=>pi===0,text:()=>'Красный зубец — кувырок, жми в последний миг!'});ZC.sim(0.5);const tip0=(cards().find(c=>c.id==='hint0')||{}).html||'';const had=/зубец/.test(tip0);
let b=document.getElementById('finBossHint'),made=false;if(!b){b=document.createElement('div');b.id='finBossHint';document.body.appendChild(b);made=true;}b.innerHTML='<div>Подсказка босса: щит в последний миг, а второй — со спины</div>';b.classList.add('on');b.style.opacity=1;ZC.sim(0.5);
chk(had,'у первого игрока нет своей подсказки');chk(!cards().some(c=>c.id==='hint0'&&c.html===tip0),'при подсказке босса видна подсказка игрока');chk(overlaps().length===0,'наложения при подсказке босса: '+overlaps());
const over=overlaps().join(',');b.classList.remove('on');if(made)b.remove();else b.style.opacity='0';W.tipZones.shift();ZC.sim(0.5);['before='+had,'over='+over]
//@@
// баннер события поверх («Вал догнал!» висит по нескольку секунд) — общая карточка сжимается в одну строку над ним, ничто ни на что
// не наезжает; баннер ушёл — карточка снова целиком. Баннер выставляется так же, как его показывает игра (функция banner из бота не
// видна, а при обновлении интерфейса баннер без своего таймера сразу гаснет), раскладка карточек — сразу, через FIN.hints.layout
const sh=on('hintS'),s=document.getElementById('hintS'),h0=s.getBoundingClientRect().height,b=document.getElementById('banner');
b.innerHTML='Вал догнал!<small>Все назад, к последней отметке — и бегом!</small>';b.style.color='#fff';b.style.opacity=1;H.layout();
const cmp=s.classList.contains('hn-cmp'),h1=s.getBoundingClientRect().height;
chk(sh,'нет общей карточки до баннера');chk(cmp&&on('hintS'),'общая карточка не сжалась в строку над баннером');chk(h1<h0,'сжатая карточка не ниже: '+Math.round(h0)+' → '+Math.round(h1));chk(overlaps().length===0,'наложения с баннером: '+overlaps());
window.BAN={cmp,h0,h1,over:overlaps().join(',')};['cmp='+cmp,'h='+Math.round(h0)+'→'+Math.round(h1),'over='+BAN.over]
//@@
{const b=document.getElementById('banner'),s=document.getElementById('hintS');b.style.opacity=0;H.layout();chk(on('hintS')&&!s.classList.contains('hn-cmp')&&!s.classList.contains('hn-yield'),'общая карточка не вернулась после баннера');}
['back='+on('hintS')]
//@@ shot=hints_solo.png
// одиночная игра: подсказки — только тому, кем играешь
ZC.setSolo(true);go('2-3');const W=ZC.W;W.tipZones.unshift({cond:()=>true,text:pi=>pi?'Подсказка второго':'Подсказка первого'});ZC.sim(0.5);const sp=ZC.G.soloPi,C=cards();
chk(!C.some(c=>/Подсказка (первого|второго)/.test(c.html)&&!(sp===0?/первого/:/второго/).test(c.html)),'в одиночку видна подсказка второго героя');chk(dups().length===0,'повторы в одиночку: '+dups());chk(overlaps().length===0,'наложения в одиночку: '+overlaps());
W.tipZones.shift();ZC.sim(0.5);['soloPi='+sp,'cards='+C.map(c=>c.id+':'+norm(c.html).slice(0,30)).join(' | ')]
//@@
ZC.setSolo(false);
// уровни разных миров (2-Б и 3-Б — почти одинаковые задачи с разными словами у игроков): нет повторов и наложений за 8 с игры
window.R=[];window.lv=ids=>{for(const id of ids){go(id);let d=0,o=0,mx=0,n=0;for(let i=0;i<16;i++){ZC.hold('KeyW',i%4<2);ZC.hold('ArrowUp',i%4<2);ZC.sim(0.5);if(ZC.G.cine){ZC.skip();continue;}if(ZC.G.ui)continue;n++;if(dups().length){d++;if(d===1)R.push(id+' повтор: '+dups()+' '+cards().map(c=>norm(c.html).slice(0,50)).join(' | '));}if(overlaps().length){o++;if(o===1)R.push(id+' наложение: '+overlaps());}mx=Math.max(mx,cards().length);}
  ZC.hold('KeyW',false);ZC.hold('ArrowUp',false);R.push(id+': кадров '+n+' повторов '+d+' наложений '+o+' карточек max '+mx);chk(d===0,id+': повторы');chk(o===0,id+': наложения');chk(mx<=3,id+': карточек '+mx);}return R.length;};
lv(['1-1','1-2','2-1','2-3','2-B'])
//@@
lv(['3-1','3-B','4-1','5-1','luko']);
R.concat(['errs='+ERR.length+(ERR[0]?' '+ERR[0]:''),'замечания: '+(BAD.join('; ')||'нет'),BAD.length===0&&ERR.length===0?'ok':'FAIL'])
