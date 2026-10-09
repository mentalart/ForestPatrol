/* ============================== РЕЛИЗ final06 · 3-2: ГРОМОВОЙ БАРАН — ОБУЧАЮЩИЕ КАРТОЧКИ ПЕРЕД ЭТАПАМИ И ЖИВЫЕ ПОДСКАЗКИ ============================== */
// Как у Горыныча и Кощея (late_87_boss4b, движок t4Run): перед каждым этапом — интерактивный ролик из карточек «что делать»; шаг ждёт
// нажатия показанной кнопки (не нажал за 8 с — показывает сам), и приём срабатывает по-настоящему: Йоша поливает стожок, тучка плачет,
// перо зажигается, встаёт радуга. При повторе этапа — короткое напоминание. В бою — подсказки по событию (Баран разбегается, увяз,
// тень-круг молнии, дождик без радуги, радуга стоит, кольцо по туче, Пушок испугался…) и по времени без успехов: стрелка над целью,
// мигающая кнопка, «✓ Молодец!» на правильное нажатие. В одиночном режиме тексты — для одного героя.
// Для ботов: FIN.tut32.auto=false — без карточек; FIN.tut32.stage(n) — показать карточки этапа n.
Object.assign(T4I,{
  ram:'<svg viewBox="0 0 64 64"><circle cx="30" cy="36" r="17" fill="#e8e4f8" stroke="#6a6aa0" stroke-width="3"/><circle cx="44" cy="30" r="9" fill="#5a5070"/><path d="M40 22 C30 12 18 20 26 30" fill="none" stroke="#d8a830" stroke-width="5" stroke-linecap="round"/><path d="M6 36 H14 M8 28 H15 M8 44 H15" stroke="#ff7a6a" stroke-width="4" stroke-linecap="round"/></svg>',
  stog:'<svg viewBox="0 0 64 64"><circle cx="22" cy="40" r="12" fill="#ffffff" stroke="#8ab0ff" stroke-width="3"/><circle cx="40" cy="40" r="13" fill="#ffffff" stroke="#8ab0ff" stroke-width="3"/><circle cx="31" cy="26" r="12" fill="#ffffff" stroke="#8ab0ff" stroke-width="3"/><path d="M50 14 C46 20 46 24 50 26 C54 24 54 20 50 14Z" fill="#6ac8ff"/></svg>',
  feather:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="#ffd76a" opacity=".25"/><path d="M18 50 C20 30 34 14 48 10 C46 26 36 42 18 50Z" fill="#ff9a3a" stroke="#c8501a" stroke-width="2.5"/><path d="M18 50 L40 22" stroke="#fff2b0" stroke-width="2.5"/></svg>',
  rain:'<svg viewBox="0 0 64 64"><circle cx="24" cy="22" r="11" fill="#aaa6c8"/><circle cx="38" cy="20" r="13" fill="#aaa6c8"/><circle cx="46" cy="28" r="8" fill="#aaa6c8"/><path d="M20 38 L17 46 M30 38 L27 48 M40 38 L37 46 M50 38 L47 48" stroke="#6ac8ff" stroke-width="4" stroke-linecap="round"/></svg>',
  bow:'<svg viewBox="0 0 64 64"><path d="M6 52 A26 26 0 0 1 58 52" fill="none" stroke="#ff5a5a" stroke-width="5"/><path d="M12 52 A20 20 0 0 1 52 52" fill="none" stroke="#ffd23a" stroke-width="5"/><path d="M18 52 A14 14 0 0 1 46 52" fill="none" stroke="#5ad86a" stroke-width="5"/><path d="M24 52 A8 8 0 0 1 40 52" fill="none" stroke="#5a8aff" stroke-width="5"/></svg>',
  bolt:'<svg viewBox="0 0 64 64"><ellipse cx="32" cy="52" rx="22" ry="7" fill="#1a2a60" stroke="#9fd0ff" stroke-width="3"/><path d="M36 4 L22 30 H32 L26 50 L44 22 H34 L40 4Z" fill="#fff6a0" stroke="#c8a010" stroke-width="2" stroke-linejoin="round"/></svg>',
  stomp:'<svg viewBox="0 0 64 64"><ellipse cx="32" cy="46" rx="26" ry="9" fill="none" stroke="#bfe4ff" stroke-width="4"/><path d="M32 38 V10 M23 19 L32 9 L41 19" stroke="#9ff0a8" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  lamb:'<svg viewBox="0 0 64 64"><circle cx="28" cy="38" r="13" fill="#ffffff" stroke="#c8c0e8" stroke-width="3"/><circle cx="42" cy="32" r="8" fill="#f2d8dc"/><circle cx="44" cy="31" r="1.8" fill="#4a3a50"/><circle cx="32" cy="32" r="28" fill="#ffd76a" opacity=".18"/></svg>'});
const TUT32={auto:true,on:false,cards:[0,0,0,0],seen:{},props:[]};FIN.tut32=TUT32;
const B32H={cur:null,until:0,cd:{},last:-99,cycle:0,arrows:[],prog:0,ph:0,grace:0,emb:-1,bow:false,stuck:false};
const b32P=pi=>G.solo?G.soloPi:pi;
const b32Of=kind=>{const h=HERO[kind];return h?h.player:0;};
const b32Sw=kind=>{const h=HERO[kind];return h&&!h.active?' (переключись '+K(b32P(h.player),'swap')+')':'';};
const b32Del=o=>{if(o&&o.parent)o.parent.remove(o);};
const b32AY=22.4,b32ARC={x:0,z:-316};
function b32Sb(){return (W.stogs||[]).slice(-4);}
function b32Rain(n){return (W.rains||[]).find(r=>r.name===n);}
function b32Lit(h){if(h&&!h.lit&&!h.cling){h.lit=true;featherFx(h);}}
// ---------- интерактивные карточки перед этапом ----------
function b32Tut(n){const B=W.ram32,LB=W.lamb32,solo=G.solo,P0=b32P(0),PY=b32P(b32Of('yosha')),PP=b32P(b32Of('potap'));if(!B||!B.e)return;
  const st=(p,l,dur,card,o)=>Object.assign({dur,p,l,card},o||{});
  const SB=b32Sb(),S0=SB.find(s=>!s.puffy&&s.gone<=0)||SB[0],RW=b32Rain('rw'),RE=b32Rain('re');const AY=b32AY;
  const WIDE=[[0,29.5,-299.5],[0,23.2,-317]],TOP=[[5.5,31,-305],[0,27.6,-316]];
  const SC=S0?[[S0.x+(S0.x<0?4.2:-4.2),AY+3.4,S0.z+5.6],[S0.x,AY+0.9,S0.z]]:WIDE;
  const RC=RW?[[RW.x+5.6,AY+3.6,RW.z+6.2],[RW.x+2.2,AY+1.6,RW.z]]:WIDE;
  let S=[];
  if(TUT32.seen[n]){const txt={1:['ram','Этап 1 · Таран','Йоша поливает стожок '+K(PY,'skill')+' — он <b>пухлый</b>. Свети пером '+K(P0,'item')+' <b>за стожком</b> — Баран побежит и увязнет.<br>Увяз — <b>бей в свете</b>, Потап — <b>за рога</b>!'],
      2:['bow','Этап 2 · Гроза','Тень-круг — <b>уйди</b> или <b>щит</b>. Тучку польёт Йоша (или выжмет Потап), <b>рядом зажги перо</b> — по радуге наверх и бей в свете. Кольцо по туче — <b>прыгай</b>!'],
      3:['lamb','Этап 3 · Пушок','Баран увяз в стожке — <b>веди Пушка светом пера</b> к батюшке. Пушок боится, когда Баран бежит рядом!']}[n];
    S=[st(WIDE[0],WIDE[1],4.6,{tag:'Ещё раз',title:txt[1],icon:txt[0],text:txt[2]})];}
  else if(n===1){S=[
    st(WIDE[0],WIDE[1],4.6,{tag:'Как победить',title:'Этап 1 из 3 · Таран',icon:'ram',text:'Громовой Баран <b>бежит на свет пера</b>. Красная дорожка под ним — куда помчится.<br>Сам по себе он твёрдый: шерсть искрит. Надо, чтобы он <b>увяз</b>!'}),
    st(SC[0],SC[1],8,{tag:solo?'Йоша':'Игрок '+(PY+1)+' · Йоша',title:'Живая вода — стожок пухлый',icon:'stog',text:'Сухой стожок Баран разметает. Полей его <b>живой водой</b>'+b32Sw('yosha')+' — станет <b>пухлым</b>, мягким, как перина.',keys:[{pi:PY,a:'skill',label:'вода',wait:true}],go:'Полей!',okText:'Пухлый!'},
      {wait:{who:PY,a:'skill'},at:1.2,done:()=>{if(S0&&!S0.puffy)stogPuff32(S0);}}),
    st(SC[0],SC[1],8,{tag:solo?'Свет':'Игрок '+(P0+1),title:'Встань за стожком и посвети',icon:'feather',text:'Зажги перо '+K(P0,'item')+' и встань <b>за пухлым стожком</b>. Баран побежит на свет — и <b>увязнет</b> в облаке. А ты в последний миг — <b>в сторону</b>!',keys:[{pi:P0,a:'item',label:'перо',wait:true}],go:'Зажги перо!',okText:'Светит!'},
      {wait:{who:P0,a:'item'},at:1.2,done:()=>{b32Lit(active(P0));}}),
    st([B.e.pos.x+3.4,AY+3.2,B.e.pos.z+5],[B.e.pos.x,AY+1.4,B.e.pos.z],7.5,{tag:'Увяз — бейте!',title:'В свете шерсть мягкая',icon:'hit',text:'Увяз — <b>бейте в свете пера</b>: без света шерсть грозовая, удар отскочит.<br>Потап — <b>за рога</b> '+K(PP,'skill')+b32Sw('potap')+'!',keys:[{pi:P0,a:'attack',label:'удар',wait:true}],go:'Бей!',okText:'Попал!'},
      {wait:{who:P0,a:'attack'},at:0.8,done:()=>{const e=B.e;FX.stars&&FX.stars(e.pos.clone().add(new V3(0,1.8,0)),10);floatText(e.pos.clone().add(new V3(0,3,0)),'Вот так!','#fff2b0');}}),
    st(WIDE[0],WIDE[1],2.8,{tag:'Вперёд!',title:'Стожок — свет — удар!',icon:'go',text:'Подсказки будут рядом.'},{enter:()=>{SFX.ok();}})];}
  else if(n===2){S=[
    st(TOP[0],TOP[1],4.8,{tag:'Как победить',title:'Этап 2 из 3 · Гроза',icon:'ram',text:'Баран обернулся <b>тучей</b> и залез наверх. Дорога к нему — <b>радуга</b>.<br>А с тучи бьют молнии!'}),
    st(WIDE[0],WIDE[1],8,{tag:'Молния',title:'Тень-круг — уходи!',icon:'bolt',text:'Под героем темнеет <b>круг</b> — сюда ударит молния. <b>Кувыркнись</b> прочь или подними <b>щит</b>.',keys:[{pi:P0,a:'roll',label:'кувырок',wait:true}],go:'Кувырок!',okText:'Увернулся!'},
      {wait:{who:P0,a:'roll'},at:1.4,enter:()=>{const h=active(P0);const g=new THREE.Group();const d=new THREE.Mesh(new THREE.CircleGeometry(1.5,28),MB(0x1a2a60,{transparent:true,opacity:0.45,depthWrite:false}));d.rotation.x=-Math.PI/2;d.renderOrder=4;g.add(d);
        const r=new THREE.Mesh(new THREE.TorusGeometry(1.5,0.06,6,30),MB(0x9fd0ff,{transparent:true,opacity:0.9}));r.rotation.x=Math.PI/2;g.add(r);g.position.set(h.pos.x,h.pos.y+0.06,h.pos.z);t4Prop(g);},
       done:()=>{const h=active(P0);if(h.grounded)h.vel.y=4;FX.dust&&FX.dust(h.pos.clone(),8);SFX.crash();shakeAll(0.03,0.2);}}),
    st(RC[0],RC[1],8.5,{tag:solo?'Йоша':'Игрок '+(PY+1)+' · Йоша',title:'Тучка плачет — дождик',icon:'rain',text:'Полей тучку <b>живой водой</b>'+b32Sw('yosha')+' — пойдёт дождик. Восточную тучку-толстушку <b>выжмет Потап</b> '+K(PP,'skill')+'.',keys:[{pi:PY,a:'skill',label:'вода',wait:true}],go:'Полей тучку!',okText:'Дождик!'},
      {wait:{who:PY,a:'skill'},at:1.2,done:()=>{if(RW&&RW.rain<=0.3)rainStart32(RW,'yosha');}}),
    st(RC[0],RC[1],8.5,{tag:'Солнышко',title:'Перо рядом с тучкой — радуга!',icon:'feather',text:'Дождик идёт — нужно <b>солнышко</b>. Зажги перо '+K(P0,'item')+' <b>рядом с тучкой</b> — встанет радуга-дуга.',keys:[{pi:P0,a:'item',label:'перо',wait:true}],go:'Зажги перо!',okText:'Радуга!'},
      {wait:{who:P0,a:'item'},at:1.0,done:()=>{b32Lit(active(P0));if(RW){if(RW.rain<=0.3)rainStart32(RW,'yosha');RW.rain=Math.max(RW.rain,rainDur32());const Bw=RW.bow;if(!Bw.on){Bw.on=true;Bw.k=0;SFX.flower();const mid=Bw.P(0.5,0);floatText(new V3(mid[0],mid[1]+0.8,mid[2]),'Радуга-дуга!','#ffe08a');}}}}),
    st(TOP[0],TOP[1],8,{tag:'Наверху',title:'По радуге — и бей в свете!',icon:'bow',text:'Пока идёт дождик — <b>по радуге наверх</b>. Наверху посвети на Барана и <b>бей</b>.<br>Побежит по туче <b>кольцо</b> — <b>прыгай</b>, не то сдует!',keys:[{pi:P0,a:'jump',label:'прыжок',wait:true}],go:'Прыгай!',okText:'Перепрыгнул!'},
      {wait:{who:P0,a:'jump'},at:1.4,enter:()=>{const r=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,32),MB(0xbfe4ff,{transparent:true,opacity:0.9}));r.rotation.x=Math.PI/2;r.position.set(b32ARC.x,b32AY+5.3,b32ARC.z);r.userData.ring=true;t4Prop(r);},
       update:(s,u)=>{for(const o of T4.props)if(o.userData.ring)o.scale.setScalar(0.6+((u*0.8)%1)*2.9);}}),
    st(WIDE[0],WIDE[1],2.8,{tag:'Вперёд!',title:'Дождик, солнышко, радуга!',icon:'go',text:'Подсказки будут рядом.'},{enter:()=>{SFX.ok();}})];}
  else if(n===3){const LC=LB?[[LB.pos.x+3.2,AY+2.6,LB.pos.z+4.6],[LB.pos.x,AY+0.8,LB.pos.z]]:WIDE;S=[
    st([0,25.6,-305],[0,23.4,-318],5,{tag:'Как победить',title:'Этап 3 из 3 · Пушок',icon:'lamb',text:'Гроза иссякла, но на рогах — <b>чёрная нить</b>: батюшка не узнаёт своих. Узнает — только <b>сынка Пушка</b>!'}),
    st(LC[0],LC[1],8,{tag:'Пушок',title:'Пушок бежит за светом',icon:'feather',text:'Зажги перо '+K(P0,'item')+' — Пушок побежит <b>за тобой</b>. Веди его к батюшке.',keys:[{pi:P0,a:'item',label:'перо',wait:true}],go:'Зажги перо!',okText:'Бежит!'},
      {wait:{who:P0,a:'item'},at:1.0,done:()=>{b32Lit(active(P0));}}),
    st(SC[0],SC[1],7.5,{tag:'Сначала',title:'Пусть Баран увязнет',icon:'stog',text:'Когда Баран бежит рядом, <b>Пушок пугается</b> и удирает. Пухлый стожок '+(solo?'(живая вода Йоши)':'— Йоша польёт')+' '+K(PY,'skill')+' — Баран увязнет, и тогда <b>подводите Пушка</b>.'}),
    st(WIDE[0],WIDE[1],2.8,{tag:'Вперёд!',title:'Пушок — к батюшке!',icon:'go',text:'Подсказки будут рядом.'},{enter:()=>{SFX.ok();}})];}
  if(!S.length)return;TUT32.on=true;TUT32.seen[n]=true;TUT32.cards[n]++;
  t4Run(S,{end:()=>{TUT32.on=false;B32H.grace=G.time+3;B32H.prog=G.time;}});}
TUT32.stage=n=>b32Tut(n);
// ---------- живые подсказки в бою ----------
function b32ArrowsClear(){for(const a of B32H.arrows)b32Del(a);B32H.arrows=[];}
const b32Tg=t=>t&&t.isVector3?t.clone():t&&t.d&&t.pos?headOf(t).add(new V3(0,0.5,0)):t&&t.e?t.e.pos.clone().add(new V3(0,3.6,0)):t&&t.g&&t.cloud?new V3(t.x,t.y+3.4,t.z):t&&t.g&&t.cyl?new V3(t.x,t.y+2.4,t.z):t&&t.pos?t.pos.clone().add(new V3(0,1.6,0)):new V3();
function b32HintShow(key,c,targets,expect,dur){if(B32H.cur&&B32H.cur.key===key&&B32H.until>G.time)return;B32H.cur={key,c,expect:(expect||[]).map(e=>[b32P(e[0]),e[1],e[2]])};B32H.until=G.time+(dur||6);B32H.last=G.time;B32H.cd[key]=G.time;t4Dom();
  const kh=t4Keys(B32H.cur.expect.map(e=>({pi:e[0],a:e[1],label:e[2]||'',wait:true})),{}).replace('class="ft-keys"','class="fh-keys"');
  T4.hint.innerHTML='<div class="fh-row"><div class="ft-ico">'+(T4I[c.icon]||'')+'</div><div class="fh-main"><div class="fh-title"><span class="ft-tag">'+c.tag+'</span>'+c.title+'</div><div class="fh-text">'+c.text+'</div></div>'+kh+'</div>';
  T4.hint.classList.add('on');T4.hint.classList.remove('ok');tone(1320,0.1,'triangle',0.12);tone(1760,0.12,'sine',0.08,null,0.08);
  b32ArrowsClear();B32H.arrows=(targets||[]).filter(Boolean).map(t=>{const ar=t4Arrow(c.col||0xffd76a);ar.userData.tgt=t;ar.position.copy(b32Tg(t));ar.userData.noBatch=true;ar.traverse(q=>{q.userData.noBatch=true;q.castShadow=false;});W.group.add(ar);return ar;});}
function b32HintHide(ok){if(!B32H.cur||!T4.hint)return;if(ok){T4.hint.classList.add('ok');let k=T4.hint.querySelector('.fh-keys');if(!k){k=document.createElement('div');k.className='fh-keys';if(T4.hint.firstChild)T4.hint.firstChild.appendChild(k);}
    k.innerHTML='<span class="fh-ok">✓ Молодец!</span>';B32H.until=Math.min(B32H.until,G.time+1.1);}
  else{T4.hint.classList.remove('on');B32H.cur=null;b32ArrowsClear();}}
function b32Ctx(key,fn,cd){if(B32H.cur&&B32H.until>G.time&&!/^g\d/.test(B32H.cur.key))return;if(G.time-(B32H.cd[key]||-99)<(cd||6))return;fn();}
function b32Cycle(list){if(B32H.cur)return;list[B32H.cycle%list.length]();B32H.cycle++;}
function b32HintTick(dt){const B=W.ram32,LB=W.lamb32,now=G.time,solo=G.solo;const ph=B&&B.phase;
  if(!B||!B.e||G.cine||G.state!=='play'||!(ph===1||ph===2||ph===3)||W.flags.won){if(B32H.cur)b32HintHide(false);return;}
  const e=B.e,SB=b32Sb(),RW=b32Rain('rw'),RE=b32Rain('re'),PY=b32Of('yosha'),PP=b32Of('potap');
  // успехи: угольки гаснут, Баран увяз, радуга встала — сбрасывают таймер «без успехов»
  const stuck=B.ai==='stuck',bow=!!(RW&&RW.bow.on||RE&&RE.bow.on);
  if(ph!==B32H.ph){B32H.ph=ph;B32H.prog=now;B32H.cycle=0;B32H.emb=e.embers;}
  if(e.embers<B32H.emb||stuck&&!B32H.stuck||bow&&!B32H.bow){B32H.prog=now;if(B32H.cur&&/^g\d/.test(B32H.cur.key))b32HintHide(true);}
  B32H.emb=e.embers;B32H.stuck=stuck;B32H.bow=bow;
  for(const a of B32H.arrows){a.position.copy(b32Tg(a.userData.tgt)).add(new V3(0,0.35*Math.abs(Math.sin(now*4)),0));a.rotation.y+=dt*2.5;}
  if(B32H.cur&&T4.hint&&!T4.hint.classList.contains('ok')){for(const [pi,a] of B32H.cur.expect)if(t4Tap(pi,a)){b32HintHide(true);break;}}
  if(B32H.cur&&now>B32H.until)b32HintHide(false);
  if(now<(B32H.grace||0))return;
  const idle=now-Math.max(B32H.last,B32H.prog);const lit=HEROES.some(h=>heroLight(h));
  const puffy=SB.filter(s=>s.puffy&&s.gone<=0),dry=SB.filter(s=>!s.puffy&&s.gone<=0);
  const wet=()=>b32Ctx('water',()=>b32HintShow('water',{tag:'Йоша',title:'Полей стожок!',icon:'stog',text:'Живой водой'+b32Sw('yosha')+' — стожок станет <b>пухлым</b>, и Баран в нём увязнет.',col:0x8ab0ff},dry.slice(0,2),[[PY,'skill','вода']],5),9);
  if(ph===1){
    if(stuck&&e.litNow)b32Ctx('hit',()=>b32HintShow('hit',{tag:'Увяз!',title:solo?'Бей в свете!':'Бейте в свете! Потап — за рога!',icon:'hit',text:'Шерсть мягкая, пока светит перо. '+(solo?'Бей!':'Бейте, а Потап — <b>за рога</b>'+b32Sw('potap')+'.'),col:0xffe08a},[B],solo?[[0,'attack','удар']]:[[0,'attack','удар'],[PP,'skill','за рога']],4),6);
    else if(stuck&&!e.litNow)b32Ctx('lit1',()=>b32HintShow('lit1',{tag:'Увяз!',title:'Посвети на него!',icon:'feather',text:'Без света шерсть грозовая — удар отскочит. Зажги перо и подойди.',col:0xffd76a},[B],[[0,'item','перо']],4),6);
    else if(B.ai==='paw'&&B.tgt&&!puffy.some(s=>hd(s,B.tgt.pos)<3))b32Ctx('hide',()=>b32HintShow('hide',{tag:'Разбегается!',title:puffy.length?'За пухлый стожок!':'В сторону!',icon:'ram',text:puffy.length?'Встань за стожком, в последний миг — вбок!':'Красная дорожка — туда он помчится. <b>Кувырок</b> в сторону!',col:0xff7a6a},puffy.length?puffy.slice(0,1):[B.tgt],[[B.tgt.player,'roll','кувырок']],3),5);
    else if(!puffy.length&&dry.length)wet();
    else if(!lit&&idle>5)b32Ctx('lure',()=>b32HintShow('lure',{tag:'Приманка',title:'Зажги перо за стожком',icon:'feather',text:'Баран бежит на свет — встань за стожком.',col:0xffd76a},puffy.slice(0,1),[[0,'item','перо']],5),9);
    else if(idle>10)b32Cycle([()=>b32HintShow('g1',{tag:'Подсказка',title:'Стожок — свет — удар',icon:'ram',text:'Баран увяз — бейте в свете пера.'},puffy.slice(0,1),null),
      ()=>b32HintShow('g2',{tag:'Подсказка',title:'Сухой стожок не держит',icon:'stog',text:'Разметал стожок? Через пару секунд он вырастет снова — <b>полейте</b> его.'},dry.slice(0,1),null)]);}
  if(ph===2){const onTop=HEROES.filter(h=>h.active&&h.pos.y>b32AY+4.6&&hd(h.pos,b32ARC)<3.8);const rain=[RW,RE].filter(R=>R&&R.rain>0&&!R.bow.on);
    const mine=B.strikes&&B.strikes.find(s=>!s.done&&s.t<0.7&&HEROES.some(h=>h.active&&hd(h.pos,s.at)<1.6));
    if(mine){const h=HEROES.find(h=>h.active&&hd(h.pos,mine.at)<1.6);b32Ctx('strike',()=>b32HintShow('strike',{tag:'Молния!',title:'Тень-круг — уходи!',icon:'bolt',text:'<b>Кувырок</b> из круга или <b>щит</b>!',col:0x9fd0ff},[mine.at.clone().setY(b32AY+1.4)],[[h.player,'roll','кувырок'],[h.player,'guard','щит']],2.4),7);}
    else if(onTop.length&&B.stompT>0&&B.stompT<1.1)b32Ctx('stomp',()=>b32HintShow('stomp',{tag:'Кольцо!',title:'Прыгай!',icon:'stomp',text:'Кольцо бежит по туче — <b>прыгни</b>, не то сдует.',col:0xbfe4ff},[onTop[0]],onTop.map(h=>[h.player,'jump','прыжок']),2.4),5);
    else if(onTop.length&&!e.litNow)b32Ctx('lit2',()=>b32HintShow('lit2',{tag:'Наверху',title:'Посвети на Барана!',icon:'feather',text:'В свете пера грозовая шерсть мягчеет — тогда <b>бей</b>.',col:0xffd76a},[B],onTop.map(h=>[h.player,'item','перо']),4),7);
    else if(onTop.length&&e.litNow&&idle>3)b32Ctx('hit2',()=>b32HintShow('hit2',{tag:'Наверху',title:'Бей!',icon:'hit',text:'Шерсть мягкая — <b>бей</b>, пока светит перо.',col:0xffe08a},[B],onTop.map(h=>[h.player,'attack','удар']),4),7);
    else if(bow&&!onTop.length)b32Ctx('climb',()=>b32HintShow('climb',{tag:'Радуга!',title:'По радуге — наверх!',icon:'bow',text:'Радуга стоит, пока дождик. Бегите по ней!',col:0xffe08a},[new V3(b32ARC.x,b32AY+6.6,b32ARC.z)],null,5),8);
    else if(rain.length)b32Ctx('sun',()=>b32HintShow('sun',{tag:'Дождик есть',title:'Зажги перо рядом с тучкой!',icon:'feather',text:'Нужно <b>солнышко</b>: встань с пером рядом с тучкой — встанет радуга.',col:0xffd76a},rain,[[0,'item','перо'],[1,'item','перо']].slice(0,solo?1:2),5),7);
    else if(!bow&&idle>3)b32Ctx('cloud',()=>b32HintShow('cloud',{tag:'Радуга — дорога',title:'Дождик для радуги',icon:'rain',text:'Йоша — <b>полей западную тучку</b>'+b32Sw('yosha')+(solo?'; или Потап выжмет восточную.':'. Потап — <b>выжми восточную</b>'+b32Sw('potap')+'.'),col:0x9fd8ff},[RW,RE].filter(Boolean),solo?[[PY,'skill','вода']]:[[PY,'skill','вода'],[PP,'skill','выжать']],6),10);}
  if(ph===3&&LB){const near=hd(LB.pos,e.pos);
    if(LB.scared>0)b32Ctx('scared',()=>b32HintShow('scared',{tag:'Пушок',title:'Пушок испугался!',icon:'lamb',text:'Сначала пусть Баран увязнет в стожке.',col:0xf4f0ff},[LB],null,4),8);
    else if((stuck||B.ai==='bonk')&&near>2.5)b32Ctx('lead',()=>b32HintShow('lead',{tag:'Скорей!',title:'Веди Пушка к батюшке!',icon:'lamb',text:'Баран стоит — зажги перо, Пушок побежит.',col:0xffd76a},[LB,B],[[0,'item','перо']],4),6);
    else if(!puffy.length&&dry.length)wet();
    else if(!lit&&idle>4)b32Ctx('lure3',()=>b32HintShow('lure3',{tag:'Пушок',title:'Зажги перо',icon:'feather',text:'Пушок бежит <b>за светом пера</b>.',col:0xffd76a},[LB],[[0,'item','перо']],4),8);
    else if(idle>10)b32Cycle([()=>b32HintShow('g1',{tag:'Подсказка',title:'Стожок — потом Пушок',icon:'stog',text:'Баран увяз — теперь ведите Пушка к нему.'},puffy.slice(0,1),null)]);}}
// ---------- запуск: после каждого ролика смены этапа ----------
{const _step=step;step=function(dt){_step(dt);if(!W||W.levelId!=='3-2')return;const B=W.ram32;if(!B)return;
  const ph=B.phase;if(TUT32.auto&&!G.cine&&G.state==='play'&&(ph===1||ph===2||ph===3)&&TUT32.last!==ph){TUT32.last=ph;b32Tut(ph);}
  if(ph<1)TUT32.last=0;
  try{b32HintTick(dt);}catch(e){console.error('sky32 hint',e);}};}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);TUT32.last=0;TUT32.on=false;B32H.cur=null;B32H.arrows=[];B32H.cd={};B32H.ph=0;B32H.grace=0;if(T4.hint)T4.hint.classList.remove('on');};}
