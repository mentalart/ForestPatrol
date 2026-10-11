/* ---------- СКАЗЫ 1–4 на Лукоморье: тексты (двустишия), помощники, сувениры у дуба, окно выбора ---------- */
// Каждая строка сказа — двустишие, у которого есть беда (начало), поступок помощника и конец трёх «настроений»: смешной, тёплый, с загадкой.
// Любые три строки вместе читаются как сказка. В строке помощника должно остаться имя (Леший, Яга, Колобок, Садко, кит, Жар, Сирин, Демьян,
// Кикимор): по нему helperOf (w2_common.js) узнаёт, какая весточка пойдёт в следующий мир. k — ключ помощника (VEST, HELPER5), acc — «про кого».
const SKFLAG=['','skaz','skaz2','skaz3','skaz4'];
const SKAZ_TAGS=['смешной конец','тёплый конец','конец с загадкой'];
const SKAZ_CONFIRM='Конец — вместе: оба на одной строке, и оба жмите разом.';
const SKAZ=[null,
 {title:'Леший-проводник',nar:'kot',pre:'',steps:[
  {who:1,title:'Начало выбирает Игрок второй.',sub:'с какой беды сказка началась?',opts:[
   {t:'Прошка с Потапом по ягоды пошли —<br>А ёлки хороводом их в чаще увели.'},
   {t:'Несли Пелагея с Йошей воды ковшок —<br>А Леший тропинку завязал в узелок!'},
   {t:'Проснулся лес — вот чудеса:<br>Кукушка мяучит, ручей течёт в небеса!'}]},
  {who:0,title:'Помощника выбирает Игрок первый.',sub:'кто выручит? он пойдёт с вами в следующий мир',opts:[
   {t:'Тут Леший светлячка в ладони поймал:<br>„Нате фонарик, чтоб лес не пугал!“',k:'leshy',acc:'Лешего со светлячком'},
   {t:'Выглянула Яга: „Не вертите головой!<br>Вот вам клубок — нитка выведет домой!“',k:'yaga',acc:'Бабу Ягу с клубком'},
   {t:'Колобок на пружинке подскочил до небес:<br>„Вижу тропинку! Шагайте через лес!“',k:'kolobok',acc:'Колобка с пружинкой'}]},
  {who:2,title:SKAZ_CONFIRM,sub:'чем сказка кончится?',opts:[
   {t:'С тех пор в лесу тропинки путаются не со зла —<br>А чтоб игра в „ищи-свищи“ весёлая была!'},
   {t:'Вернулись затемно: самовар пыхтит,<br>Кот на печи: „Ну, рассказывайте!“ — говорит.'},
   {t:'А старый пенёк им вслед подмигнул —<br>Будто что-то знал, да сам же уснул.'}]}]},
 {title:'Колокола Китежа',nar:'pelageya',pre:'<i>(шёпотом)</i> ',steps:[
  {who:0,title:'Начало выбирает Игрок первый.',sub:'с какой беды сказка началась?',opts:[
   {t:'Колокола в Китеже вдруг замолчали —<br>Рыбы-прохожие плечами пожали.'},
   {t:'Потап греб веслом, а Прошка пел —<br>Вдруг вал выше мачты на них летел!'},
   {t:'У кита заболел зуб — вот беда:<br>Глотает корабли, не глядя, без стыда!'}]},
  {who:1,title:'Помощника выбирает Игрок второй.',sub:'кто выручит? он пойдёт с вами в следующий мир',opts:[
   {t:'Садко тронул гусли — зазвенела вода:<br>В лад все запели, и ладится всё всегда!',k:'sadko',acc:'Садко с гуслями'},
   {t:'Рыба-кит подплыл и хвостом махнул:<br>Кто упал — подхватил, спас, вернул.',k:'kit',acc:'Рыбу-кита'},
   {t:'Золотая рыбка — хвост, как рассвет:<br>Нарисовала в воде золотой след.',k:'rybka',acc:'Золотую рыбку'}]},
  {who:2,title:SKAZ_CONFIRM,sub:'чем сказка кончится?',opts:[
   {t:'С тех пор в Китеже на каждый „бом“<br>Рыбы пляшут хороводом кругом.'},
   {t:'Дед Водяной под колокола уснул,<br>Ила мягкого одеяло на плечи натянул.'},
   {t:'А на самом дне один колокол ждёт:<br>Кто в него позвонит — тайну найдёт.'}]}]},
 {title:'Соловьиная песня',nar:'pelageya',pre:'<i>(вполголоса)</i> ',steps:[
  {who:1,title:'Начало выбирает Игрок второй.',sub:'с какой беды сказка началась?',opts:[
   {t:'Соловей разучился петь с утра:<br>Только „фьють“ — как дырявая труба!'},
   {t:'Прошка с Йошей в облаках заблудились —<br>В тучах серых, как в вате, закружились.'},
   {t:'В саду яблони без песни не цветут:<br>Ни яблока, ни листика — и птицы не поют.'}]},
  {who:0,title:'Помощника выбирает Игрок первый.',sub:'кто выручит? он пойдёт с вами в следующий мир',opts:[
   {t:'Жар-птица пёрышко с неба роняет —<br>Тёплым огнём все тучи прогоняет.',k:'zhar',acc:'Жар-птицу'},
   {t:'Сирин и Алконост запели хором —<br>Песня плывёт над облаками, над простором.',k:'sirin',acc:'Сирина и Алконоста'},
   {t:'Яга на ступе стрелой пролетает —<br>Кто упал, того на лету подбирает!',k:'yaga3',acc:'Бабу Ягу в ступе'}]},
  {who:2,title:SKAZ_CONFIRM,sub:'чем сказка кончится?',opts:[
   {t:'Соловей запел — да чихнул невпопад:<br>Облака разлетелись, как стая цыплят!'},
   {t:'Гуси-лебеди вернулись домой, под навес —<br>Мама-гусыня пересчитала: все здесь!'},
   {t:'А в саду одна яблоня ещё не зацвела —<br>Говорят, свою главную песню ждала.'}]}]},
 {title:'Одно сердце',nar:'pelageya',pre:'',steps:[
  {who:0,title:'Начало выбирает Игрок первый.',sub:'с какой беды сказка началась?',opts:[
   {t:'Три головы у Змея — и каждая своя:<br>Та хочет в лес, та — в реку, а третья: „А я?“'},
   {t:'Кузня у огненной реки стоит,<br>Да огонь в горне притих — и не горит.'},
   {t:'Калинов мост шатался над рекой —<br>Потап подставил плечо: „Держу! Иди, друг мой!“'}]},
  {who:1,title:'Помощника выбирает Игрок второй.',sub:'кто выручит? он пойдёт с вами в следующий мир',opts:[
   {t:'Демьян ударил молотом — искры в разлёт:<br>„Куй, пока горячо!“ — и дело идёт.',k:'demyan',acc:'Демьяна с молотом'},
   {t:'Кикимора кудель крепкую подала —<br>Что порвалось — связала, что упало — подняла.',k:'kiki4',acc:'Кикимору с куделью'},
   {t:'Леший светлячков по дороге пустил:<br>Где что запрятано — каждый посветил.',k:'leshy4',acc:'Лешего со светлячками'}]},
  {who:2,title:SKAZ_CONFIRM,sub:'чем сказка кончится?',opts:[
   {t:'Три головы чихнули враз —<br>Огненное „апчхи!“ — и пол-леса в пляс.'},
   {t:'И понял Змей: хоть голов у него три,<br>А сердце одно — и оно говорит внутри.'},
   {t:'А за мостом в тени кто-то молчит —<br>Слушает нашу сказку, а рука дрожит.'}]}]}];
const skazPlain=s=>s.replace(/<br>/g,' ');
const skazFull=t=>t.slice(0,3).map(skazPlain).join(' ');                  // сказка одной строкой (экран «мир пройден»)
const skazPick=(n,a,b,c)=>[a,b,c].map((x,i)=>SKAZ[n].steps[i].opts[x].t);   // сказ по номерам вариантов (пропуск уровней в отладке)
const skazTold=()=>[1,2,3,4].filter(n=>G.flags[SKFLAG[n]]);
function skazAcc(n){const t=G.flags[SKFLAG[n]];if(!t)return null;const k=helperOf(n),o=SKAZ[n].steps[1].opts.find(x=>x.k===k);return o?o.acc:null;}   // «про кого» была сказка n
function skazEnding(n){const t=G.flags[SKFLAG[n]];return t?SKAZ[n].steps[2].opts.findIndex(x=>x.t===t[2]):-1;}

/* ---------- окно выбора: три шага (начало · помощник · конец), для всех четырёх сказов одно ---------- */
function skazChoose(n,done){const S=SKAZ[n],el=$('skaz'),steps=S.steps,pa=n>1?skazAcc(n-1):null;G.ui='skaz';el.style.display='flex';
  let st=0;const sel=[0,0,0],both=[0,0],ok=[false,false];
  const draw=()=>{const s=steps[st];
    el.innerHTML='<div class="tet sk"><h2>Сказ · «'+S.title+'»</h2>'+(pa?'<div class="prev">прошлый сказ — про '+pa+'</div>':'')+'<div class="step">'+s.title+'<small>'+s.sub+'</small></div>'+
      s.opts.map((o,i)=>'<div class="opt'+((s.who<2?sel[st]===i:false)?' sel':'')+'">'+(s.who===2?[0,1].map(q=>both[q]===i?'<b style="color:'+PCSS[q]+'">'+(ok[q]?'●':'○')+'</b>':'<b></b>').join(''):'<b></b>')+
        '<span class="ot">'+o.t+(o.k?'<small>весточка в следующем мире: '+VEST[o.k][1]+'</small>':'')+(s.who===2?'<small>'+SKAZ_TAGS[i]+'</small>':'')+'</span></div>').join('')+
      '<div class="hint">'+(s.who===2?'оба: '+K(0,'left')+K(0,'right')+' / '+K(1,'left')+K(1,'right')+' · '+K(0,'jump')+' + '+K(1,'jump'):K(UW(s.who),'up')+K(UW(s.who),'down')+' · '+K(UW(s.who),'jump'))+'</div>'+
      (st>0?'<div class="tale">'+steps.slice(0,st).map((x,i)=>skazPlain(x.opts[sel[i]].t)).join(' ')+'</div>':'')+'</div>';};
  draw();
  G.uiTick=()=>{const s=steps[st];
    if(s.who<2){const w=UW(s.who),nv=uiNav(w);if(nv.dy||nv.dx){sel[st]=(sel[st]+(nv.dy||nv.dx)+3)%3;SFX.swap();draw();}if(tap(w,'jump')){SFX.ok();st++;draw();}}
    else{for(const q of[0,1]){const nv=uiNav(q);if(nv.dy||nv.dx){both[q]=(both[q]+(nv.dy||nv.dx)+3)%3;ok[q]=false;SFX.swap();draw();}if(tap(q,'jump')){ok[q]=true;if(G.solo){ok[1-q]=true;both[1-q]=both[q];}SFX.plate();draw();}}
      if(ok[0]&&ok[1]){if(both[0]===both[1]){sel[2]=both[0];SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';done(steps.map((x,i)=>x.opts[sel[i]].t));}
        else{ok[0]=ok[1]=false;SFX.miss();banner('Конец — одной строкой!','#ffd0d0',1.4,'договоритесь — и нажмите вдвоём');draw();}}}};}

/* ---------- помощник из сказа оживает у дуба и остаётся до следующего сказа ---------- */
const SKAZ_HELPER_AT=[-6.4,-2.4];
function skazMakeHelper(k){const d=HELPER5[k]||HELPER5.leshy,m=d[1](),fly=k==='zhar'||k==='sirin',y0=fly?2.2:k==='rybka'?1.5:k==='kit'?1.6:k==='yaga3'?0.5:0;
  m.g.position.set(SKAZ_HELPER_AT[0],y0,SKAZ_HELPER_AT[1]);m.g.rotation.y=0.7;
  if(k==='kit')m.g.scale.setScalar(0.2);if(k==='rybka')m.g.scale.setScalar(1.9);
  m.g.traverse(o=>{if(o.isLight)o.visible=false;});                               // число источников света в сцене не меняется
  const base=m.g.scale.x,y1=y0,F={m,k,y0:y1,base,dead:false};
  W.updates.push(()=>{if(F.dead)return;m.g.position.y=F.y0+Math.sin(G.time*2.2)*(y0>0?0.22:0.03);if(y0>0)m.g.rotation.y=0.7+Math.sin(G.time*0.8)*0.35;});
  F.cyl=y0>0?null:{x:SKAZ_HELPER_AT[0],z:SKAZ_HELPER_AT[1],r:0.6,miny:-1,maxy:2.2,on:true};if(F.cyl)W.cyls.push(F.cyl);
  return F;}
function skazHelperIn(F){const s=F.base;F.m.g.scale.setScalar(0.01);anim(0.7,u=>F.m.g.scale.setScalar(Math.max(0.01,smooth(u))*s));
  burst(new V3(SKAZ_HELPER_AT[0],F.y0+0.8,SKAZ_HELPER_AT[1]),0xffe08a,16,3.2);}
function skazHelperOut(F){if(!F||F.dead)return;F.dead=true;if(F.cyl)F.cyl.on=false;const s=F.base;anim(0.6,u=>F.m.g.scale.setScalar(Math.max(0.01,(1-smooth(u))*s)));
  burst(new V3(SKAZ_HELPER_AT[0],F.y0+0.8,SKAZ_HELPER_AT[1]),0xbfe8ff,10,2.5);later(0.7,()=>{F.m.g.visible=false;});}

/* ---------- сувенир конца: у каждого из 12 концов — своя вещица на поляне у дуба ---------- */
const SKAZ_SLOT=[null,[-5.2,-8.4],[-3.6,-11.4],[3.8,-11.6],[5.6,-6.2]];
const skSv=(g,geo,col,x,y,z,o)=>part(g,geo,M(col,o),x,y,z);
const SKAZ_SV=[null,
 [g=>{skSv(g,new THREE.CylinderGeometry(0.07,0.09,1.7,6),0x7a5634,0,0.85,0);                           // указатель: стрелки в разные стороны
    [[1.5,0.6],[1.2,-0.7],[0.9,2.5]].forEach(([y,r])=>{const b=new THREE.Group();b.position.y=y;b.rotation.y=r;g.add(b);skSv(b,new THREE.BoxGeometry(0.9,0.2,0.05),0xc89a5a,0.42,0,0);skSv(b,new THREE.ConeGeometry(0.14,0.25,3),0xc89a5a,0.95,0,0).rotation.z=-Math.PI/2;});},
  g=>{skSv(g,new THREE.CylinderGeometry(0.3,0.36,0.14,12),0x6a4a2a,0,0.07,0);                   // самовар
    skSv(g,new THREE.SphereGeometry(0.42,14,10),0xd8a030,0,0.68,0,{emissive:0x4a3000,emissiveIntensity:0.35}).scale.set(1,1.15,1);
    skSv(g,new THREE.CylinderGeometry(0.1,0.12,0.38,8),0xb88820,0,1.35,0);skSv(g,new THREE.ConeGeometry(0.2,0.2,10),0xd8a030,0,1.1,0);
    skSv(g,new THREE.CylinderGeometry(0.05,0.05,0.4,6),0xb88820,0.5,0.7,0).rotation.z=-1.1;
    const sm=skSv(g,new THREE.SphereGeometry(0.09,8,6),0xe8e8f0,0,1.7,0,{transparent:true,opacity:0.6});return (dt,t)=>{sm.position.y=1.7+((t*0.5)%1)*0.5;sm.material.opacity=0.6*(1-((t*0.5)%1));};},
  g=>{skSv(g,new THREE.CylinderGeometry(0.42,0.52,0.8,10),0x7a5634,0,0.4,0);skSv(g,new THREE.CylinderGeometry(0.42,0.42,0.05,10),0xc8a070,0,0.82,0);   // пенёк с одним открытым глазом
    skSv(g,new THREE.SphereGeometry(0.15,10,8),0xffffff,0.12,0.55,0.42);skSv(g,new THREE.SphereGeometry(0.065,8,6),0x1a1410,0.13,0.55,0.55);
    skSv(g,new THREE.BoxGeometry(0.28,0.04,0.05),0x3a2410,-0.2,0.55,0.46);skSv(g,new THREE.ConeGeometry(0.06,0.3,5),0x5a9a3a,-0.12,0.98,0.05);}],
 [g=>{const fr=new THREE.Group();g.add(fr);for(const s of[-1,1])skSv(fr,new THREE.CylinderGeometry(0.06,0.07,1.5,6),0x7a5634,s*0.55,0.75,0);   // колокол с пляшущими рыбками
    skSv(fr,new THREE.BoxGeometry(1.3,0.08,0.08),0x7a5634,0,1.5,0);skSv(fr,new THREE.ConeGeometry(0.28,0.4,12,1,true),0xd8a030,0,1.2,0,{side:THREE.DoubleSide,emissive:0x4a3000,emissiveIntensity:0.3});
    const fish=[0,1,2].map(i=>{const f=skSv(g,new THREE.SphereGeometry(0.12,8,6),i%2?0xff9a3a:0xffc930,0,0,0);f.scale.set(1.5,0.8,0.7);return f;});
    return (dt,t)=>fish.forEach((f,i)=>{const a=t*2+i*2.1;f.position.set(Math.cos(a)*0.95,0.4+Math.abs(Math.sin(a*2))*0.5,Math.sin(a)*0.95);f.rotation.y=-a;});},
  g=>{skSv(g,new THREE.CylinderGeometry(0.7,0.8,0.18,12),0x8a6a4a,0,0.09,0);const q=new THREE.Group();q.position.y=0.3;g.add(q);                // одеяло из ила и подушка
    skSv(q,new THREE.BoxGeometry(1.4,0.14,0.95),0x5a7aa8,0,0,0);[[-0.35,-0.22,0xe8c860],[0.35,-0.22,0xd88a8a],[-0.35,0.22,0xd88a8a],[0.35,0.22,0xe8c860]].forEach(([x,z,c])=>skSv(q,new THREE.BoxGeometry(0.5,0.05,0.34),c,x,0.09,z));
    skSv(g,new THREE.BoxGeometry(0.5,0.2,0.34),0xf4ecd8,-0.55,0.52,0);},
  g=>{skSv(g,new THREE.CylinderGeometry(0.7,0.9,0.4,10),0xc8b88a,0,0.2,0);skSv(g,new THREE.SphereGeometry(0.5,14,8,0,Math.PI*2,0,Math.PI/2),0x8a5a2a,0,0.4,0,{emissive:0x2a1400,emissiveIntensity:0.4});   // колокол на дне
    const ring=skSv(g,new THREE.TorusGeometry(0.62,0.03,6,24),0x8fd8ff,0,0.45,0,{emissive:0x4ab0e8,emissiveIntensity:1});ring.rotation.x=Math.PI/2;return (dt,t)=>{ring.scale.setScalar(1+Math.sin(t*2)*0.12);};}],
 [g=>{const cl=new THREE.Group();cl.position.y=0.9;g.add(cl);[[0,0,0.42],[0.45,-0.05,0.32],[-0.45,-0.05,0.3],[0.15,0.28,0.3]].forEach(([x,y,r])=>skSv(cl,new THREE.SphereGeometry(r,10,8),0xf4f8ff,x,y,0));   // облако с цыплятами
    [[-0.2,0.45],[0.2,0.5],[0.05,0.62]].forEach(([x,y],i)=>{skSv(cl,new THREE.SphereGeometry(0.11,8,6),0xffe060,x,y+0.18,0.1);skSv(cl,new THREE.ConeGeometry(0.03,0.08,4),0xff8a20,x,y+0.18,0.21).rotation.x=Math.PI/2;});
    return (dt,t)=>{cl.position.y=0.9+Math.sin(t*1.4)*0.12;};},
  g=>{const go=new THREE.Group();g.add(go);skSv(go,new THREE.SphereGeometry(0.34,12,8),0xf8f8fa,0,0.5,0).scale.set(1,0.8,1.4);skSv(go,new THREE.CylinderGeometry(0.06,0.08,0.5,6),0xf8f8fa,0,0.9,0.28);   // гусыня с гусятами
    skSv(go,new THREE.SphereGeometry(0.11,8,6),0xf8f8fa,0,1.18,0.32);skSv(go,new THREE.ConeGeometry(0.05,0.16,5),0xf08a20,0,1.16,0.5).rotation.x=Math.PI/2;
    [0,1,2].forEach(i=>{skSv(g,new THREE.SphereGeometry(0.1,8,6),0xffe060,-0.45+i*0.3,0.12,0.75);skSv(g,new THREE.ConeGeometry(0.025,0.07,4),0xf08a20,-0.45+i*0.3,0.12,0.84).rotation.x=Math.PI/2;});},
  g=>{skSv(g,new THREE.CylinderGeometry(0.1,0.16,1.3,6),0x6b4a2b,0,0.65,0);skSv(g,new THREE.SphereGeometry(0.62,10,8),0x6aa04a,0,1.6,0);                  // яблоня с одним нераспустившимся цветком
    const bud=skSv(g,new THREE.SphereGeometry(0.13,8,6),0xffb0d0,0.35,1.55,0.5,{emissive:0xff6aa0,emissiveIntensity:0.9});return (dt,t)=>{bud.scale.setScalar(1+Math.sin(t*2.4)*0.2);};}],
 [g=>{const em=new THREE.Group();em.position.y=0.9;g.add(em);[[0,0,0.38,0xff6a20],[0.4,0.1,0.28,0xff9a30],[-0.38,0.05,0.26,0xe84a10],[0.1,0.35,0.22,0x4a3a38]].forEach(([x,y,r,c])=>skSv(em,new THREE.SphereGeometry(r,10,8),c,x,y,0,{emissive:c,emissiveIntensity:c===0x4a3a38?0:0.7}));   // огненное «апчхи»
    return (dt,t)=>{em.rotation.y=t*1.5;em.position.y=0.9+Math.sin(t*3)*0.1;em.scale.setScalar(1+Math.sin(t*5)*0.08);};},
  g=>{const h=new THREE.Group();h.position.y=1.1;g.add(h);const gm={emissive:0xb07a10,emissiveIntensity:0.8};skSv(h,new THREE.SphereGeometry(0.3,12,10),COL.gold,-0.22,0.18,0,gm);skSv(h,new THREE.SphereGeometry(0.3,12,10),COL.gold,0.22,0.18,0,gm);   // золотое сердце
    skSv(h,new THREE.ConeGeometry(0.46,0.8,4),COL.gold,0,-0.3,0,gm).rotation.y=Math.PI/4;skSv(g,new THREE.CylinderGeometry(0.4,0.5,0.15,10),0x5a5058,0,0.07,0);return (dt,t)=>{h.rotation.y=t*1.2;h.position.y=1.1+Math.sin(t*2)*0.08;};},
  g=>{skSv(g,new THREE.CylinderGeometry(0.14,0.17,0.22,8),0x1a1410,0,0.11,0);const q=skSv(g,new THREE.CylinderGeometry(0.012,0.012,0.9,4),0xf4ecd8,0.05,0.62,0);q.rotation.z=-0.35;   // чернильница и перо у моста
    skSv(g,new THREE.ConeGeometry(0.07,0.3,5),0xf4ecd8,0.2,1.0,0).rotation.z=-0.35;skSv(g,new THREE.BoxGeometry(0.55,0.04,0.4),0xf0e6d0,-0.5,0.03,0.1).rotation.y=0.4;
    const gl=skSv(g,new THREE.SphereGeometry(0.07,8,6),0xffe08a,0,0.35,0.3,{emissive:0xffd060,emissiveIntensity:1,transparent:true,opacity:0.8});return (dt,t)=>{gl.position.y=0.45+Math.sin(t*2)*0.08;};}]];
const skazSouv={};
function skazSouvenir(n,e,pop){const[x,z]=SKAZ_SLOT[n];if(skazSouv[n]){skazSouv[n].visible=false;}const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);skazSouv[n]=g;
  const upd=SKAZ_SV[n][e](g);if(upd)W.updates.push(()=>upd(1/60,G.time));W.cyls.push({x,z,r:0.55,miny:-1,maxy:1.3,on:true});
  if(pop){g.scale.setScalar(0.01);anim(0.9,u=>g.scale.setScalar(Math.max(0.01,smooth(u))));burst(new V3(x,0.7,z),0xffe08a,16,3);}return g;}
