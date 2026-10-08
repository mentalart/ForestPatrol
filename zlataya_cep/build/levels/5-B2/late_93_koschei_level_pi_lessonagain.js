// ---- «Показать урок ещё раз» из паузы для акта I (F-8: FIN.lesson.regLevel; тот же пункт меню, что у 4-Б) ----
// Стадии 1–3: стадия начинается заново (E.go с retry) и урок идёт снова — как при двух неудачах. Пролог: урок текущего отрезка.
{const E=FIN.k5e,LEGN={forest:'pro',gorge:'pro_gorge',sea:'pro_sea',sky:'pro_sky',write:'pro_write',three:'pro_three'};
  const key=()=>{const n=E.cur;if(n>=1&&n<=3)return n;if(n===0&&E.pro&&E.pro.on)return LEGN[E.pro.leg]||null;return null;};
  E.lessonAgainKey=key;
  FIN.lesson.regLevel('5-B2',()=>{const k=key();if(k==null||!K5.auto)return;E.lessonN[k]=0;
    if(typeof k==='number')E.go(k,{retry:true});else E.lesson(k,()=>{});},
    ()=>!!K5.auto&&key()!=null&&!!E.LES[key()]);}

// Озвученные реплики Звенышка из убранных шагов урока стадии 2 (ключ, искорка, ветер, руки): урок теперь про одну механику (Леший),
// а записи остаются в каталоге озвучки. Тексты не менять — сборка ищет их по тексту. Вернуть в бой/урок — решение владельца (B6-c).
FIN.k5e.LESSON_SPARE={k07:'Друг в цепях — не зевай:<br>По замку бей, выручай!',k08:'Отбил — и искра к другу мчит!<br>По очереди — спесь слетит!',
  n04:'Ветер! Щит держи — не сдует!<br>Пусть Кощей сколько хочет дует!',n05:'Где земля трещит — не стой:<br>Схватит лапой костяной!'};
