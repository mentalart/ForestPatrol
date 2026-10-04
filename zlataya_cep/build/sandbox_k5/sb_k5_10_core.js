/* ============================== ПОЛИГОН КОЩЕЯ · ЯДРО: сцены, флажки, оценки, панель (docs/24_koschei_proposals.md, шаги 1–6) ============================== */
// Только для сборки --k5sandbox. Сцены: полёт на Горыныче (шаг 5), этапы 1–4 (шаги 1–3), Цепной великан (шаг 4), страница сказки (шаг 6).
// Флажки шагов 1–3 включают и выключают новое прямо в этапах; Ё — всё новое вкл/выкл; «Настоящий 5-Б2» — бой, как в релизе.
const K5SB={all:true,f:{},r:{},mode:'s1',scene:null,t:0,
  feats:[
    ['cam','1','Камера арены и крупные планы','камера ниже и ближе, Кощей нависает; в окно — наезд; в начале этапа — крупно лицо'],
    ['music','1','Музыка этапов и «оркестр»','своя тема Кощея; каждый этап добавляет инструмент мира (балалайка, гусли, жалейка, молот, колокола)'],
    ['fewText','1','Меньше надписей','всплывают только ключевые: окно, «Очухался!», «Вместе!»; урон и удары — звуком и вспышкой'],
    ['face','1','Мимика и позы Кощея','насмешка, злость, удивление, усталость, страх, раскаяние; позы-замахи до удара'],
    ['arena','2','Арена меняется по этапам','морок-лес и свечи · ливень и лужи · облака и тень-великан · трещины и костяной мост'],
    ['friends','3','Друзья и инструменты миров','Леший + клубок · Водяной + гусли · Жар-птица + перо · Горыныч + клещи (кнопка «предмет» R / ;)'],
    ['giant','4','Цепной великан, «матрёшка», ковка в такт','рука великана — подъём на плечо; сундук → заяц → утка → яйцо → игла; ковка вдвоём в такт'],
    ['flight','5','Полёт на Горыныче','вступление: у каждого игрока своя голова; огонь по воронам, свет пера по тучам'],
    ['page','6','Страница сказки','2D-страница тетрадки: маленький Кощей и друзья встают рядом по строчкам']],
  scenes:{},order:['flight','s1','s2','s3','s4','s5','page'],
  names:{flight:'Полёт на Буян',s1:'Этап 1 · Чёрные свечи',s2:'Этап 2 · Ключ и искорка',s3:'Этап 3 · Буря',s4:'Этап 4 · Меч Бессмертного',s5:'Этап 5 · Игла: Цепной великан',page:'Финал · Жил-был мальчишка'}};
FIN.k5s=K5SB;K5SB.feats.forEach(f=>K5SB.f[f[0]]=true);
try{const o=JSON.parse(localStorage.getItem('zc_k5sb_v1')||'null');if(o){Object.assign(K5SB.f,o.f||{});Object.assign(K5SB.r,o.r||{});if(o.all===false)K5SB.all=false;}}catch(e){}
K5SB.save=()=>{try{localStorage.setItem('zc_k5sb_v1',JSON.stringify({f:K5SB.f,r:K5SB.r,all:K5SB.all}));}catch(e){}};
const k5on=k=>K5SB.all&&!!K5SB.f[k];
const k5noRay=o=>{o.raycast=()=>{};return o;};
// сборка полигона — без озвучки: ролики настоящего 5-Б2 считают время по длине записей и без них дают пустое время звуку — такие вызовы пропускаем
{const AP=AudioParam.prototype;for(const f of ['exponentialRampToValueAtTime','linearRampToValueAtTime','setValueAtTime','setTargetAtTime']){const o=AP[f];AP[f]=function(v,t){if(!isFinite(v)||!isFinite(t))return this;return o.apply(this,arguments);};}}

/* ---------- помощники сцены ---------- */
function k5Label(text,x,y,z,col,w){const c=document.createElement('canvas');c.width=512;c.height=128;const g=c.getContext('2d');g.fillStyle='rgba(20,18,26,0.72)';
  if(g.roundRect){g.beginPath();g.roundRect(4,14,504,100,26);g.fill();}else g.fillRect(4,14,504,100);let fs=50;g.font='600 '+fs+'px system-ui,sans-serif';
  while(g.measureText(text).width>470&&fs>22){fs-=2;g.font='600 '+fs+'px system-ui,sans-serif';}g.fillStyle=col||'#ffe8a8';g.textAlign='center';g.textBaseline='middle';g.fillText(text,256,66);
  const s=k5noRay(new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false,fog:false})));s.scale.set(w||4.4,(w||4.4)/4,1);s.position.set(x,y,z);W.group.add(s);return s;}
// телеграф: красный круг на земле заполняется к удару (2-Б); k.fire() — в конце
function k5Tele(pos,r,dur,col,onFire){const g=new THREE.Group();g.position.set(pos.x,(pos.y||0)+0.06,pos.z);W.group.add(g);
  const ring=k5noRay(new THREE.Mesh(new THREE.RingGeometry(r*0.92,r,40),new THREE.MeshBasicMaterial({color:col||0xff4a3a,transparent:true,opacity:0.85,depthWrite:false,fog:false})));ring.rotation.x=-Math.PI/2;g.add(ring);
  const fill=k5noRay(new THREE.Mesh(new THREE.CircleGeometry(r,40),new THREE.MeshBasicMaterial({color:col||0xff4a3a,transparent:true,opacity:0.32,depthWrite:false,fog:false})));fill.rotation.x=-Math.PI/2;fill.scale.setScalar(0.01);g.add(fill);
  const T={g,r,t:0,dur,done:false,cancel(){if(!T.done){T.done=true;W.group.remove(g);}},pos:g.position};
  K5SB.tick.push(dt=>{if(T.done)return true;T.t+=dt;const k=Math.min(1,T.t/dur);fill.scale.setScalar(Math.max(0.01,k));ring.material.opacity=0.6+0.35*Math.sin(G.time*(10+k*20));
    if(k>=1){T.done=true;W.group.remove(g);try{onFire&&onFire(T);}catch(e){console.error(e);}return true;}});return T;}
// урон зоной: кувырок спасает
function k5sHurt(pos,r,y){let n=0;for(const pi of [0,1]){const h=active(pi);if(players[pi].downed||h.rollT>0)continue;if(hd(h.pos,pos)<r&&Math.abs(h.pos.y-(y==null?pos.y||0:y))<2.2){if(damageHero(h,{kind:'hazard',ref:{pos}}))n++;}}return n;}
// молния в точку
function k5sBolt(p,col){const g=new THREE.Group();W.group.add(g);const m=new THREE.MeshBasicMaterial({color:col||0xd8b8ff,transparent:true,opacity:1,depthWrite:false,fog:false});
  let a=new V3(p.x+rand(-1,1),p.y+16,p.z+rand(-1,1));for(let i=0;i<6;i++){const b=i===5?p.clone():new V3(p.x+rand(-0.8,0.8),p.y+16-(i+1)*16/6,p.z+rand(-0.8,0.8));const d=a.distanceTo(b);
    const c=k5noRay(new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,d,5),m));c.position.copy(a).lerp(b,0.5);c.lookAt(b);c.rotateX(Math.PI/2);g.add(c);a=b;}
  if(FIN.fx)FIN.fx.sparks(p.clone().add(new V3(0,0.3,0)),14,0xe8d0ff);ringFx(p,0xb070ff,2.4);if(typeof jxSprite==='function')jxSprite('dot',0xe0c8ff,p.clone().add(new V3(0,1,0)),5,0.25,{op:0.9,shape:'flash'});
  AUD.ready()&&(AUD.nz({type:'lowpass',f0:2400,f1:120,d:0.9,v:0.22,a:0.002,wet:0.4}),AUD.osc({f0:90,f1:40,d:0.8,v:0.25}));
  K5SB.tick.push(dt=>{m.opacity-=dt*4;if(m.opacity<=0){W.group.remove(g);return true;}});}
K5SB.tick=[];
// надписи: при «Меньше надписей» в полигоне всплывают только ключевые
const K5KEY=/Очухался|Вместе|ПРОБОЙ|Открыт|Окно|имя|Потап!|Йоша!|Прошка!|Пелагея!|Великан|Игла|Поймал|Ковка/i;
{const _ft=floatText;floatText=function(pos,text,col){if(W&&W.levelId==='k5sb'&&k5on('fewText')&&!K5KEY.test(String(text)))return;return _ft.apply(this,arguments);};}
// подпись-всплывашка полигона (вне фильтра — только для ключевых событий)
const k5Say=(pos,t,c)=>floatText(pos,t,c);

/* ---------- музыка: тема Кощея + «оркестр собирается» ---------- */
function k5Music(stage){const M=FIN.music;if(!M||!M.TR)return;const TR=M.TR;if(!k5on('music')){M.play('boss');return;}
  const key='k5s'+stage;if(!TR[key]&&TR.boss){const T=JSON.parse(JSON.stringify(TR.boss));T.root=(TR.boss.root||57)-5;T.sc='aeo';T.bpm=stage===5?118:stage===4?112:96;
    const W_=['w1','w2','w3','w4','w5'];for(let i=0;i<Math.min(stage,5);i++){const S=TR[W_[i]];if(!S||!S.v)continue;const vs=S.v.filter(v=>!v.drum).slice(0,1).concat(S.v.filter(v=>v.drum).slice(0,i===3?1:0));
      for(const v of vs){const c=JSON.parse(JSON.stringify(v));c.vol=(v.vol||0.05)*0.55;T.v.push(c);}}
    TR[key]=T;}
  M.play(key);}

/* ---------- уровень полигона ---------- */
function buildK5S(){const S=K5SB.scenes[K5SB.mode]||K5SB.scenes.s1;K5SB.tick.length=0;K5SB.t=0;W.name='Полигон Кощея';W.sub=K5SB.names[K5SB.mode];W.camX=12;W.fallY=-8;
  W.abil.roll=true;W.abil.toss=true;W.abil.owl=true;W.spawns=[[new V3(-2,0,8),new V3(-4,0,9)],[new V3(2,0,8),new V3(4,0,9)]];
  S.build();K5SB.scene=S;
  for(let pi=0;pi<2;pi++)W.objectives[pi]=[O(()=>(S.goal?S.goal(pi):'Полигон Кощея')+'<br><small>Tab — панель · N — следующая сцена · Ё — новое вкл/выкл</small>',()=>false,()=>[]),O('…',()=>false,()=>[])];
  W.pauseLine='Полигон Кощея: '+K5SB.names[K5SB.mode]+'. Tab — панель, N — следующая сцена.';
  W.updates.push(dt=>{K5SB.t+=dt;for(let i=K5SB.tick.length-1;i>=0;i--){let r;try{r=K5SB.tick[i](dt);}catch(e){console.error('k5 tick',e);r=true;}if(r===true)K5SB.tick.splice(i,1);}if(S.update)S.update(dt);});
  W.onLeave=()=>{const bb=$('bossbar');if(bb)bb.style.display='none';if(S.leave)S.leave();};}
LEVELS.push({id:'k5sb',name:'Полигон Кощея',build:buildK5S});
// страница сказки и полёт — без пейзажа мира (обрывы, долина, трава вокруг поляны)
if(FIN.dressWorld){const _d=FIN.dressWorld;FIN.dressWorld=function(){if(W&&W.levelId==='k5sb'&&(K5SB.mode==='page'||K5SB.mode==='flight'))return;return _d.apply(this,arguments);};}
K5SB.go=mode=>{K5SB.mode=mode;try{HN.html=['','',''];HN.shown=[false,false,false];HN.objK=['','',''];}catch(e){}try{localStorage.setItem('zc_k5sb_mode',mode);}catch(e){}const i=LV('k5sb');if(G.state==='play'&&W.levelId==='k5sb'){loadLevel(i);}else{startFrom(i);}k5Badge();};
K5SB.next=d=>{const o=K5SB.order,i=o.indexOf(K5SB.mode);K5SB.go(o[(i+(d||1)+o.length)%o.length]);};

/* ---------- панель ---------- */
const K5P={};
function k5Panel(){const st=document.createElement('style');st.textContent=`
#k5Badge{position:fixed;left:12px;bottom:12px;z-index:60;font:600 14px/1.2 system-ui,sans-serif;padding:7px 12px;border-radius:10px;cursor:pointer;user-select:none;box-shadow:0 2px 10px rgba(0,0,0,.35)}
#k5Badge.on{background:#7a4ad8;color:#fff}#k5Badge.off{background:#555;color:#eee}
#k5Panel{position:fixed;right:12px;top:12px;bottom:12px;width:min(480px,calc(100vw - 24px));z-index:61;background:rgba(24,22,30,.95);color:#f3efe6;font:13px/1.35 system-ui,sans-serif;border-radius:14px;padding:12px 14px;overflow:auto;display:none;box-shadow:0 4px 24px rgba(0,0,0,.5)}
#k5Panel h3{margin:4px 0 8px;font-size:16px}#k5Panel h4{margin:12px 0 6px;font-size:13px;color:#d8b8ff}
#k5Panel .row{display:grid;grid-template-columns:22px 1fr auto;gap:6px;align-items:start;padding:6px 0;border-top:1px solid rgba(255,255,255,.08)}
#k5Panel .row small{display:block;color:#bdb6a8}#k5Panel button{font:12px system-ui;padding:3px 8px;border-radius:6px;border:1px solid #777;background:#3a3644;color:#fff;cursor:pointer;margin:2px}
#k5Panel .rt button.sel.y{background:#2f9e5b;border-color:#2f9e5b}#k5Panel .rt button.sel.n{background:#b4433c;border-color:#b4433c}#k5Panel .rt button.sel.m{background:#c38a1f;border-color:#c38a1f}
#k5Panel .sc button.cur{background:#7a4ad8;border-color:#7a4ad8}#k5Panel textarea{width:100%;height:70px;margin-top:6px;background:#111;color:#eee;border:1px solid #555;border-radius:6px;font:12px system-ui}
#k5Panel .help{color:#bdb6a8;font-size:12px}`;document.head.appendChild(st);
  const b=document.createElement('div');b.id='k5Badge';document.body.appendChild(b);b.onclick=()=>k5ToggleAll();K5P.badge=b;
  const P=document.createElement('div');P.id='k5Panel';document.body.appendChild(P);K5P.panel=P;k5PanelHtml();
  P.addEventListener('change',ev=>{const t=ev.target;if(t.dataset.f){K5SB.f[t.dataset.f]=t.checked;K5SB.save();k5Badge();if(/^(cam|music|arena|friends|face)$/.test(t.dataset.f)&&W.levelId==='k5sb')K5SB.go(K5SB.mode);}});
  P.addEventListener('input',ev=>{if(ev.target.dataset.note!==undefined){K5SB.r._note=ev.target.value;K5SB.save();}});
  P.addEventListener('click',ev=>{const t=ev.target;try{uiAudio();}catch(e){}
    if(t.dataset.r){K5SB.r[t.dataset.r]=K5SB.r[t.dataset.r]===t.dataset.v?undefined:t.dataset.v;K5SB.save();k5PanelHtml();}
    if(t.dataset.go){K5SB.go(t.dataset.go);k5PanelHtml();}
    if(t.dataset.real!==undefined){k5Show(false);startFrom(LV('5-B2'));}
    if(t.dataset.copy!==undefined){const txt=k5Report(),o=P.querySelector('[data-out]');o.style.display='block';o.value=txt;o.select();try{navigator.clipboard.writeText(txt);t.textContent='Скопировано ✓';}catch(e){}}});
  P.addEventListener('keydown',ev=>ev.stopPropagation());
  addEventListener('keydown',ev=>{if(ev.code==='Tab'){ev.preventDefault();k5Show(P.style.display!=='block');}if(ev.code==='Backquote'){ev.preventDefault();k5ToggleAll();}
    if(ev.code==='KeyN'&&G.state==='play'&&!G.cine){K5SB.next(1);}},true);
  k5Badge();}
function k5PanelHtml(){const P=K5P.panel,RT=[['y','Да'],['m','Доработать'],['n','Нет']];
  let h='<h3>Полигон Кощея · шаги 1–6</h3><div class="help">Tab — панель · N — следующая сцена · Ё (`) — новое вкл/выкл (флажки шагов 1–3 — в этапах 1–4) · Esc — пауза.<br>Номера — шаги плана docs/24_koschei_proposals.md.</div>';
  h+='<h4>Сцены</h4><div class="sc">'+K5SB.order.map(m=>'<button data-go="'+m+'" class="'+(m===K5SB.mode?'cur':'')+'">'+K5SB.names[m]+'</button>').join('')+'<button data-real>Настоящий 5-Б2 (как в релизе)</button></div>';
  h+='<h4>Предложения</h4>'+K5SB.feats.map(([k,n,t,d])=>'<div class="row"><input type="checkbox" data-f="'+k+'"'+(K5SB.f[k]?' checked':'')+(+n>=4?' disabled title="отдельная сцена"':'')+'><div><b>Шаг '+n+' · '+t+'</b><small>'+d+'</small></div><div class="rt">'+RT.map(([c,l])=>'<button data-r="'+k+'" data-v="'+c+'" class="'+c+(K5SB.r[k]===c?' sel':'')+'">'+l+'</button>').join('')+'</div></div>').join('');
  h+='<h4>Отчёт</h4><div class="help">Заметки своими словами — попадут в отчёт. Кнопка копирует оценки: пришлите их в чат.</div><textarea data-note>'+(K5SB.r._note||'')+'</textarea><button data-copy>Скопировать отчёт</button><textarea data-out readonly style="display:none"></textarea>';
  P.innerHTML=h;}
function k5Show(on){K5P.panel.style.display=on?'block':'none';if(on)k5PanelHtml();}
function k5ToggleAll(){K5SB.all=!K5SB.all;K5SB.save();k5Badge();if(W.levelId==='k5sb'&&/^s[1-4]$/.test(K5SB.mode))K5SB.go(K5SB.mode);}
function k5Badge(){const b=K5P.badge;if(!b)return;b.className=K5SB.all?'on':'off';b.textContent=(K5SB.all?'● НОВОЕ':'○ КАК СЕЙЧАС')+' · '+K5SB.names[K5SB.mode]+' · N — дальше';}
function k5Report(){const L={y:'да',m:'доработать',n:'нет'};let s='Полигон Кощея — отчёт\n';for(const [k,n,t] of K5SB.feats)s+='- Шаг '+n+' '+t+': '+(K5SB.r[k]?L[K5SB.r[k]]:'без оценки')+(K5SB.f[k]?'':' (выключено)')+'\n';
  if(K5SB.r._note)s+='Заметки: '+K5SB.r._note+'\n';return s;}

/* ---------- запуск: сразу полигон ---------- */
finBoot=function(){FIN.applyQuality();FIN.applySettings();loadLevel(0);G.state='menu';
  try{const m=localStorage.getItem('zc_k5sb_mode');if(m&&K5SB.order.indexOf(m)>=0)K5SB.mode=m;}catch(e){}
  const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:rgba(14,10,24,.9);color:#f3efe6;font:15px/1.45 system-ui,sans-serif;padding:16px';
  o.innerHTML='<div style="max-width:600px;text-align:center"><div style="font-size:26px;font-weight:700;margin-bottom:8px">Златая цепь · Полигон Кощея</div>'+
    '<div style="opacity:.85;margin-bottom:14px">Шаги 1–6 плана переделки 5-Б2: полёт на Горыныче, четыре этапа (камера, музыка, мимика, арены, друзья и инструменты миров), Цепной великан и страница сказки. Сборка без озвучки.<br><b>Tab</b> — панель с флажками, оценками и сценами · <b>N</b> — следующая сцена · <b>Ё</b> — новое вкл/выкл.</div>'+
    '<button data-n="1" style="font:600 16px system-ui;padding:12px 22px;margin:6px;border-radius:10px;border:0;background:#2f9e5b;color:#fff;cursor:pointer">Один игрок</button>'+
    '<button data-n="2" style="font:600 16px system-ui;padding:12px 22px;margin:6px;border-radius:10px;border:0;background:#3a6fd8;color:#fff;cursor:pointer">Двое</button>'+
    '<div style="opacity:.7;margin-top:14px;font-size:13px">WASD, пробел, F — удар, G — щит, Shift — кувырок, E — умение, R — предмет (инструмент мира), 1 — «Ко мне!», Q — смена героя.<br>Enter — один игрок.</div></div>';
  document.body.appendChild(o);
  const go=n=>{if(!o.parentNode)return;o.remove();uiAudio();setSolo(n===1);K5SB.go(K5SB.mode);};
  o.addEventListener('click',ev=>{const n=ev.target.dataset&&ev.target.dataset.n;if(n)go(+n);});
  addEventListener('keydown',function k(ev){if(ev.code==='Enter'&&o.parentNode){removeEventListener('keydown',k);go(1);}});};
setTimeout(k5Panel,0);
