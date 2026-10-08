/* ============================== РЕЛИЗ · СЛОВАРЬ СИГНАЛОВ БОССОВ (FIN.signals) ============================== */
// Таблица `docs/33_boss_standard.md` п. 3 «Словарь сигналов» в коде: ответ игрока → цвет, форма, звук. Поведение игры не меняет — это справочник
// для новых телеграфов и для бота-линтера `tfin_signals` (он ищет в коде телеграфы с цветом вне словаря и «золотую» опасность).
//  • FIN.signals.table[ответ] = {color, hex, shape, sound, danger} — ответы: shield, roll, parry, jump, dome, together, target, window.
//  • FIN.signals.color(ответ) → имя цвета для K1F.tele / K2FX.tele / FX.wave; hex(ответ) → число 0xRRGGBB; shape(ответ), sound(ответ).
//  • FIN.signals.answerOf(цвет) → ответы, которые этот цвет вправе означать; isDangerColor(цвет) — годится ли цвет для опасности (золото — нет).
//  • FIN.signals.family(hex) → имя цвета словаря по оттенку (для проверки таблиц цветов помощников); check(ответ, цвет) → true/false.
// Золотой — только «хорошее» (вместе, цель, окно): опасность никогда не золотая. Уровни этим модулем не перекрашены (решение по старым цветам — за владельцем).
(function(){
  const T={
    shield:  {color:'yellow',hex:0xffd24a,shape:'sun',    sound:'bell',     danger:true },   // щит в последний миг: солнышко/круг на земле заполняется
    roll:    {color:'red',   hex:0xff4a3a,shape:'fan',    sound:'roar',     danger:true },   // кувырок, в сторону: зубец, веер, дорожка
    parry:   {color:'blue',  hex:0x4ab0ff,shape:'drop',   sound:'blubwhoosh',danger:true },  // отбить назад: капля/шар летит в героя
    jump:    {color:'white', hex:0xf6fbff,shape:'strip',  sound:'whoosh',   danger:true },   // прыжок: низкая полоса поперёк пути
    dome:    {color:'blue',  hex:0x4ab0ff,shape:'dome',   sound:'hum',      danger:true },   // за щит Потапа: купол-тень на земле
    together:{color:'gold',  hex:0xffc83a,shape:'rings',  sound:'count123', danger:false},   // вместе: два кольца сходятся в золотое
    target:  {color:'gold',  hex:0xffc83a,shape:'mark',   sound:'clink',    danger:false},   // цель / настоящий / слабое место: кольцо, чешуйка, жёлудь + стрелка
    window:  {color:'gold',  hex:0xffc83a,shape:'stars',  sound:'chime',    danger:false}    // окно, бей: звёзды + золотое свечение
  };
  // оттенок → имя цвета словаря; «золото» от «жёлтого» оттенком не отличить — их различает назначение (опасность/награда), а не цифры
  const family=h=>{
    const r=(h>>16&255)/255,g=(h>>8&255)/255,b=(h&255)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;
    if(d<0.02||(l>0.85&&d<0.2))return 'white';
    let hu=d===0?0:mx===r?((g-b)/d+6)%6:mx===g?(b-r)/d+2:(r-g)/d+4;hu*=60;
    if(hu<20||hu>=340)return 'red';if(hu<75)return 'yellow';if(hu<165)return 'green';if(hu<260)return 'blue';if(hu<340)return 'purple';return 'red';
  };
  const S={table:T,family,
    color:a=>(T[a]||{}).color,hex:a=>(T[a]||{}).hex,shape:a=>(T[a]||{}).shape,sound:a=>(T[a]||{}).sound,
    isDangerColor:c=>c==='red'||c==='yellow'||c==='blue'||c==='white',
    answerOf:c=>Object.keys(T).filter(a=>T[a].color===c),
    check:(a,c)=>!!T[a]&&T[a].color===c};
  FIN.signals=S;
})();
