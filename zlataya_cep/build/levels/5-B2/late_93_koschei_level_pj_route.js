// ---- продолжение build5B2 (часть pj): КОРОТКИЙ ПУТЬ ФИНАЛА — семь стадий вместо двенадцати ----
  // Перед боем (новый вход, без «Продолжить с…») — карточка: «Короткий путь — 7 стадий» или «Весь сказ — 12 стадий»; короткий — первым,
  // если кто-то играет на Лёгком пути или один. Короткий путь: 1 «Дуб», 3 «Видения», две страницы на выбор (из четырёх — карточками),
  // 9 «Витязи», 11 «Без имён», 12 «Златая цепь». Пропущенные — 2 «Леший», 8 «Буря», 10 «Груды злата» и две страницы — проходят «за кадром»:
  // друзья с них свободны (applyFree по номеру стадии), строки пролога над дубом встают золотом. Сюжетные мостики остаются: после 3 — Сказ
  // (начало), после последней выбранной страницы — поездка домой и Сказ (помощник), после 11 — застёжка. Выбор живёт в G.flags.k5eRoute
  // (сохранение) и возвращается при «Продолжить с…». Полоса стадии: «шаг k / 7». Боты (G.manual) карточку не видят — путь полный,
  // если не задан E.routeSet({short:true,pages:[…]}) или E.routeAsk=true.
  // 5Б2-3: на Лёгком и Среднем пути тяжёлые стадии легче — по одному-два второстепенных приёма убраны: 3 — без чернильного дождя и без
  // мороков, сходящих с пней; 6 — ночью тени не крадут свет; 7 — без взгляда Лиха и капель лавы на мосту; 10 — без цепи-аркана и груд злата.
  // Богатырский путь — всё как было; боты стадий ставят E.fullStages=true (проверяют все приёмы).
  E.lite=()=>!E.fullStages&&!players.some(p=>p.path==='hard');
  E.routeAsked=false;   // спросить путь — один раз за вход в уровень
  {const PAGEN={4:'Избушка на курьих ножках — мир 1',5:'Подводный Китеж — мир 2',6:'Темница Жар-птицы — мир 3',7:'Калинов мост — мир 4'};
   const rt=()=>{const r=G.flags.k5eRoute;return r&&r.short?r:null;};
   const order=r=>[1,3].concat(r.pages.slice().sort((a,b)=>a-b),[9,11,12]);
   const skip=n=>{const r=rt();if(!r)return false;return order(r).indexOf(n)<0;};
   E.routeSet=r=>{G.flags.k5eRoute=r?{short:!!r.short,pages:(r.pages||[4,5]).slice(0,2)}:null;};
   K5E.stageLabel=n=>{const r=rt();if(!r)return 'стадия '+n+' / 12';const k=order(r).indexOf(n);return k>=0?'шаг '+(k+1)+' / 7':'стадия '+n+' / 12';};
   // пропущенная стадия засчитана «за кадром»: строка пролога над дубом — золотом
   const pass=n=>{if(!E.done[n]){E.done[n]=true;try{E.sky.add(n,true);}catch(e){}}};
   const _go=E.go;E.go=(n,o)=>{o=o||{};if(rt()&&!o.warp&&!o.retry){let m=n;while(m<12&&skip(m)){pass(m);m++;}n=m;}return _go(n,o);};
   // после страницы: следующая выбранная страница — или домой, к Сказу о помощнике (как после седьмой)
   const _after=E.after;E.after=n=>{const r=rt();if(r&&n>=4&&n<=7){const nx=order(r).filter(p=>p>n&&p<=7)[0];for(let p=n+1;p<=7&&(!nx||p<nx);p++)if(skip(p))pass(p);
       if(nx)E.pageHome(n,()=>E.go(nx));else E.pageHome(n,()=>trans2());return;}return _after(n);};
   // двери невыбранных страниц на Лукоморье не показываем
   if(E.pagesShow){const _ps=E.pagesShow;E.pagesShow=(on,fx)=>{_ps(on,fx);const r=rt();if(r&&E.pages)for(let w=1;w<=4;w++)if(r.pages.indexOf(w+3)<0&&E.pages[w])E.pages[w].g.visible=false;};}
   // карточка выбора пути (и двух страниц) перед боем
   const askRoute=done=>{const kid=G.solo||players.some(p=>p.path==='easy');
     const SH='Короткий путь — 7 стадий (≈25 мин)',FL='Весь сказ — 12 стадий (≈1 ч)';const opts=kid?[SH,FL]:[FL,SH];
     skazClouds({who:0,title:'Битва с Кощеем',sub:'Каким путём пойдём? Выбирает Игрок первый. В коротком — две страницы-сказки на выбор.',opts},c=>{
       if(opts[c]===FL){E.routeSet(null);done();return;}
       const all=[4,5,6,7];skazClouds({who:0,title:'Первая страница',sub:'Куда шагнём в сказку? (страница — мир, где ждёт друг)',opts:all.map(p=>PAGEN[p])},a=>{const p1=all[a],rest=all.filter(p=>p!==p1);
         skazClouds({who:0,title:'Вторая страница',sub:'И ещё одна — последняя перед бурей.',opts:rest.map(p=>PAGEN[p])},b=>{E.routeSet({short:true,pages:[p1,rest[b]]});done();});});});};
   const _st=E.start;E.start=()=>{const fresh=(K5E.startAt|0)===0&&!(G.flags.k5eAt|0);
     if(fresh&&!E.routeAsked&&(!G.manual||E.routeAsk)){E.routeAsked=true;askRoute(()=>{try{FIN.saveGame();}catch(e){}_st();});return;}
     if(fresh&&!E.routeAsked&&G.manual&&!E.routeKeep)E.routeSet(null);   // бот без заданного пути — полный
     E.routeAsked=true;_st();};
   // битва окончена — выбор пути забывается (следующий вход спросит снова)
   const _won=E.won;E.won=n=>{const r=_won(n);if(n===12)G.flags.k5eRoute=null;return r;};}
