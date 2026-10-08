/* ============================== РЕЛИЗ · ОБЩИЙ ШАБЛОН УРОКА FIN.lesson (движок интерактивного ролика 4-Б, вынесен без смены поведения) ============================== */
// Урок — ролик из шагов: крупная карточка «значок + фраза + кнопки игроков» (#finTut), камера на цели; шаг с wait ЖДЁТ нажатия показанной кнопки.
//  • Нажал — «Получилось!» и дальше; не нажал за 8 с (wait.timeout) — герои показывают приём сами («Смотри — вот так!»).
//  • Пропуск и «осталось N с» — как у всех роликов (late_76b_cine_skip.js: оба держат прыжок 1 с, один из пары — 2 с, в паузе — «Пропустить ролик»).
//  • Озвучка шага — по id реплики (step.voice): если записи нет, остаётся субтитр; повтор — сокращённо (L.reminder, ≤ 5 с, «Напоминание»).
//  • «Показать урок ещё раз» в паузе: уровень регистрирует L.reg(id, fn, can); паузу и F-3 («повтор после двух падений») обслуживает L.again().
// Шаг: {dur, p, l (камера), p2, l2, card:{tag,title,icon,text,keys,go,okText}, wait:{who,a,timeout,sync}, at (когда ждать), voice (id реплики),
//       enter(s), done(s,auto), each(s,pi), update(s,u,dt)}; opt: {fov, begin(), cleanup(), end()}. Значки карточек — L.icons[имя] (SVG).
const L=FIN.lesson={on:false,card:null,hint:null,icons:{},reg:{},runs:0,steps:0,autos:0,last:null};
const LWHO=[{n:'Игрок 1',c:'#e0784a'},{n:'Игрок 2',c:'#6cc4b8'}];
L.dom=function(){if(L.card&&L.card.isConnected)return;const mk=id=>{const d=document.createElement('div');d.id=id;document.body.appendChild(d);return d;};L.card=mk('finTut');L.hint=mk('finBossHint');};
L.keys=function(keys,got){if(!keys||!keys.length)return '';return '<div class="ft-keys">'+keys.map(k=>{const w=LWHO[k.pi];const st=got&&got[k.pi]?'done':k.wait?'wait':'';
  return '<span class="ft-key '+st+'">'+(G.solo?'':'<span class="ft-who" style="background:'+w.c+'">'+w.n+'</span>')+K(k.pi,k.a)+(k.label?' '+k.label:'')+'</span>';}).join('')+'</div>';};
L.cardHTML=function(c,got,st){return '<div class="ft-head"><span class="ft-tag">'+c.tag+'</span>'+c.title+'</div><div class="ft-body"><div class="ft-ico">'+(L.icons[c.icon]||'')+'</div><div class="ft-text">'+c.text+'</div></div>'+
  L.keys(c.keys,got)+(st==='wait'?'<div class="ft-go">'+(c.go||'Нажми!')+'</div>':st==='ok'?'<div class="ft-go okt">'+(c.okText||'Получилось!')+'</div>':st==='auto'?'<div class="ft-go okt">Смотри — вот так!</div>':'')+'<div class="ft-skip">пропустить — оба держат прыжок</div>';};
L.show=function(c,got,st){L.dom();if(!c){L.card.classList.remove('on','ok');return;}L.card.innerHTML=L.cardHTML(c,got,st);L.card.classList.add('on');L.card.classList.toggle('ok',st==='ok');};
L.tap=function(pi,a){return G.solo?(tap(0,a)||tap(1,a)):tap(pi,a);};
L.who=function(w){if(G.solo)return [G.soloPi];return w==='both'||w==='any'?[0,1]:[w];};
// озвучка шага по id реплики (нет записи/каталога — молча, остаётся карточка)
L.say=function(id){try{const e=FIN.vox&&FIN.vox.lines.find(x=>x.id===id);if(e&&!e.bad)FIN.vox.say(e.who,e.text,e.dur||3);}catch(err){}};
L.run=function(steps,opt){opt=opt||{};L.on=true;L.runs++;L.last={steps,opt};L.dom();if(opt.begin)opt.begin();$('banner').style.opacity=0;
  let T=0;const shots=[];for(const s of steps){s.t0=T;shots.push(shot(T,s.p,s.l,s.p2,s.l2,s.dur,s.cut!==false));T+=s.dur;}
  const st={i:-1,wt:0};
  play({dur:T+0.25,fov:opt.fov||47,camK:3.4,shots,
    tick:(t,dt)=>{const i=t>=T?-1:steps.findIndex(s=>t>=s.t0&&t<s.t0+s.dur);
      if(i!==st.i){st.i=i;if(i<0)return;const s=steps[i];s.got={};s.okAt=null;s.auto=false;s.first=null;st.wt=0;L.steps++;if(s.enter)s.enter(s);if(s.voice)L.say(s.voice);L.show(s.card,s.got,s.wait?'':null);}
      if(i<0)return;const s=steps[i];
      // ролик стоит на ожидании, но не раньше 0,85 с: иначе пропуск (доступен с 0,8 с) не включится
      if(s.wait&&s.okAt==null){const at=s.t0+(s.at!=null?s.at:0.8);if(t>=at){if(G.cine)G.cine.t=Math.max(at,0.85);st.wt+=dt;if(st.wt<dt*1.5)L.show(s.card,s.got,'wait');
          const need=L.who(s.wait.who);
          for(const pi of need)if(!s.got[pi]&&L.tap(pi,s.wait.a)){
            if(s.wait.sync&&s.first!=null&&G.time-s.first>s.wait.sync){s.got={};s.first=null;floatText(active(pi).pos.clone().add(new V3(0,2.2,0)),'Ещё раз — вместе, дружно!','#ffd9a0');SFX.miss();}
            s.got[pi]=true;if(s.first==null)s.first=G.time;if(s.each)s.each(s,pi);tone(900+pi*200,0.08,'triangle',0.2);L.show(s.card,s.got,'wait');}
          if(s.wait.sync&&s.first!=null&&G.time-s.first>s.wait.sync&&!need.every(pi=>s.got[pi])){s.got={};s.first=null;L.show(s.card,s.got,'wait');}
          if(need.every(pi=>s.got[pi])){s.okAt=t;if(s.done)s.done(s,false);SFX.ok();L.show(s.card,s.got,'ok');}
          else if(st.wt>(s.wait.timeout||8)){s.okAt=t;s.auto=true;L.autos++;need.forEach(pi=>{s.got[pi]=true;});if(s.done)s.done(s,true);L.show(s.card,s.got,'auto');}
          // получилось — досматриваем результат ~2.6 с и дальше, без пустого ожидания
          if(s.okAt!=null&&G.cine&&s.t0+s.dur-t>2.6)G.cine.t=s.t0+s.dur-2.6;}}
      if(s.update)s.update(s,t-s.t0,dt);},
    end:()=>{L.on=false;L.show(null);if(opt.cleanup)opt.cleanup();if(opt.end)opt.end();}});
  const cd=CINE.CD&&CINE.CD();if(cd&&cd.S===G.cine){cd.inserts=false;cd.cover=[];cd.calm=true;}};
// сокращённое напоминание (≤ 5 с): шаг с кадром и карточкой, метка «Напоминание»
L.reminder=function(step,opt){step.dur=Math.min(step.dur||4.5,5);step.card=Object.assign({},step.card,{tag:'Напоминание'});return L.run([step],opt);};
// «уже объясняли»: G.flags[key][n]
L.seen=(key,n)=>!!(G.flags[key]&&G.flags[key][n]);
L.mark=(key,n)=>{G.flags[key]=G.flags[key]||{};G.flags[key][n]=true;};
// повтор урока: уровень регистрирует fn (запустить полный урок текущего места) и can (есть ли что показать сейчас)
L.regLevel=(id,fn,can)=>{L.reg[id]={fn,can:can||(()=>true)};};
L.has=()=>{const r=W&&L.reg[W.levelId];if(!r)return false;try{return !!r.can();}catch(e){return false;}};
L.again=function(){if(!L.has()||L.on||G.cine||G.trans)return false;try{L.reg[W.levelId].fn();}catch(e){console.error('lesson again',e);return false;}return true;};
