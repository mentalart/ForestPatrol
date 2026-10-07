//@@
// @timeout=3000
// tsec_sweep — прогонщик по всем уровням (аудит, этапы 2+3): ловит баги движка и уровней, не читая код уровней.
//   1) по каждому уровню — отдельно вдвоём и в одиночку — одна строка:
//      id/режим | ошибки страницы | NaN/Infinity (герои, враги, камеры) | герой за картой | calls, geometries, textures | W.updates/timers/anims
//      красная строка начинается с «RED»; остальные — справочные (кроме них бот ничего не печатает, пока не кончил)
//   2) утечки: luko → уровень → luko ×10 на 1-1, 2-1, 3-1, 4-1 — геометрии, текстуры и куча JS после 2-го и 10-го круга;
//   3) ролики: ZC.skip() посреди ролика на каждом уровне, смерть и пауза во время ролика;
//   4) смена героя (soloSwap) посреди боя; 5) большой кадр: step с dt=0,5 с (и контроль с обычным dt) — герой не за картой, не сквозь стену.
// Достижимость задач — tallobj, бюджет отрисовок — tfin_budget (здесь не повторяются). Ожидаемые «отложенные» красные — в S.KNOWN (id причины).
window.S={RED:[],INFO:[],KNOWN:{}};
window.__errs=[];
addEventListener('error',e=>__errs.push('E:'+String(e.message).slice(0,100)));
addEventListener('unhandledrejection',e=>__errs.push('R:'+String(e.reason&&e.reason.message||e.reason).slice(0,100)));
{const ce=console.error;console.error=(...a)=>{__errs.push('c:'+String(a[0]&&a[0].stack||a[0]).split('\n')[0].slice(0,100));ce.apply(console,a);};}
S.O=ZC.FIN.occ;S.D=S.O.dbg;S.R=S.D.renderer;S.O.fdt=0.05;
const f=v=>Number.isFinite(v);
S.f=f;
S.bad3=p=>!p||!(f(p.x)&&f(p.y)&&f(p.z));
S.fmt=p=>p?[p.x,p.y,p.z].map(v=>f(v)?v.toFixed(1):String(v)).join(','):'-';
S.IDS=ZC.LEVELS.map(l=>l.id);
S.ALLK=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight'];
S.relAll=()=>S.ALLK.forEach(k=>ZC.hold(k,false));
// NaN/Infinity в позициях и скоростях героев, позициях врагов, камерах
S.nan=()=>{const o=[];
  for(const k in ZC.HERO){const h=ZC.HERO[k];if(S.bad3(h.pos))o.push('hero.'+k+'.pos='+S.fmt(h.pos));if(S.bad3(h.vel))o.push('hero.'+k+'.vel='+S.fmt(h.vel));}
  (ZC.W.enemies||[]).forEach((e,i)=>{if(S.bad3(e.pos))o.push('foe.'+(e.kind||i)+'='+S.fmt(e.pos));});
  [['cam0',S.D.cams[0]],['cam1',S.D.cams[1]],['camS',S.D.camS]].forEach(([n,c])=>{if(S.bad3(c.position)||![c.quaternion.x,c.quaternion.y,c.quaternion.z,c.quaternion.w,c.fov,c.aspect].every(f))o.push(n+'='+S.fmt(c.position));});
  return o;};
// границы уровня: коробки, цилиндры, колокольчики, плиты, места старта (+ запас) — герой дальше них «за картой»
S.ext=()=>{const W=ZC.W;let a=1e9,b=-1e9,c=1e9,d=-1e9,top=-1e9,n=0;const add=(x,z,y)=>{if(!f(x)||!f(z))return;a=Math.min(a,x);b=Math.max(b,x);c=Math.min(c,z);d=Math.max(d,z);n++;if(f(y))top=Math.max(top,y);};
  for(const x of W.boxes){add(x.minx,x.minz,x.maxy);add(x.maxx,x.maxz);}
  for(const x of W.cyls){add(x.x-x.r,x.z-x.r,x.maxy);add(x.x+x.r,x.z+x.r);}
  for(const x of W.bells)add(x.x,x.z);for(const x of W.plates)add(x.x,x.z);
  for(const sp of (W.spawns||[]))for(const v of sp)if(v)add(v.x,v.z,v.y);
  return {a,b,c,d,top,fall:W.fallY||-9,n,nb:W.boxes.length+W.cyls.length};};
S.oob=E=>{const o=[],m=14;if(E.fall<-100||E.nb<3)return o;   // уровни без дна (fallY ≤ −100: полёт 5-3, пролог 5-Б2 в коридоре x=−900) и без коллизий — «за картой» не определить
  for(const k in ZC.HERO){const p=ZC.HERO[k].pos;if(!f(p.x)||!f(p.y)||!f(p.z))continue;
  if(p.x<E.a-m||p.x>E.b+m||p.z<E.c-m||p.z>E.d+m)o.push(k+'@'+S.fmt(p));else if(p.y<E.fall-0.5)o.push(k+'v'+S.fmt(p));else if(p.y>E.top+80)o.push(k+'^'+S.fmt(p));}return o;};
// у каждого игрока ровно один активный герой, и это heroes[act]
S.inv=()=>{const o=[];ZC.players.forEach((p,pi)=>{const a=p.heroes.filter(h=>h.active);if(a.length!==1)o.push('p'+pi+' active='+a.length);else if(p.heroes[p.act]!==a[0])o.push('p'+pi+' act!=active');});return o;};
S.lens=()=>{const W=ZC.W;return [W.updates.length,W.timers.length,W.anims.length];};
S.mem=()=>{const m=S.R.info.memory;return [m.geometries,m.textures];};
S.frame=()=>{S.O.frame();S.O.frame();const s=ZC.FIN.stats();return {calls:s.calls,tris:s.tris,geo:S.R.info.memory.geometries,tex:S.R.info.memory.textures};};
S.keysDown=(solo,ph)=>{const P=[['KeyW','ArrowUp'],['KeyD','ArrowRight'],['KeyW','ArrowUp'],['KeyA','ArrowLeft'],['KeyS','ArrowDown']][ph];S.relAll();ZC.hold(P[0],true);ZC.hold(P[1],true);};
// побродить, нажимая всё подряд (как smoke, но по сторонам); onTick(i) — проверки
S.wander=(frames,onTick)=>{let ph=-1;for(let i=0;i<frames;i++){const q=Math.min(4,Math.floor(i/60));if(q!==ph){ph=q;S.keysDown(ZC.G.solo,q);}
  if(i%20===0){ZC.press('KeyR');ZC.press('Semicolon');}if(i%33===0){ZC.press('KeyF');ZC.press('Comma');}if(i%47===0){ZC.press('KeyE');ZC.press('KeyL');}
  if(i%70===35){ZC.press('KeyQ');ZC.press('KeyK');}if(i%25===5){ZC.press('Space');ZC.press('KeyM');}
  ZC.tick(1);if(ZC.G.cine)ZC.skip();if(onTick&&i%10===9)onTick(i);}S.relAll();};
// один уровень, один режим → запись
S.run=(id,solo)=>{const r={id,solo,exc:[],nan:[],oob:[],inv:[],cine:false,mode:true,L:null,Lg:null,fr:null,geo0:0};const e0=__errs.length;
  try{
    ZC.setSolo(solo);r.geo0=S.R.info.memory.geometries;ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(20);r.mode=!!ZC.G.solo===solo;
    for(let q=0;q<8&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}r.cine=!!ZC.G.cine;
    const E=S.ext();r.E=E;
    const sn=tag=>{const n=S.nan();if(n.length&&r.nan.length<3)r.nan.push(tag+':'+n[0]);const o=S.oob(E);if(o.length&&r.oob.length<3)r.oob.push(tag+':'+o[0]);const v=S.inv();if(v.length&&r.inv.length<3)r.inv.push(tag+':'+v[0]);};
    sn('start');S.wander(300,i=>sn('t'+i));ZC.tick(60);sn('end');
    r.L=S.lens();ZC.tick(300);r.Lg=S.lens().map((v,k)=>v-r.L[k]);sn('idle');
    r.fr=S.frame();r.fr.split=ZC.G.split>0.5;r.fr.lim=r.fr.split?900:600;sn('frame');
  }catch(e){r.exc.push(String(e.message).slice(0,100)+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(-60));}
  r.exc=r.exc.concat(__errs.slice(e0).slice(0,3));return r;};
S.GROW=40;   // рост W.timers/W.anims за 5 с «стояния» — утечка
S.lineOf=r=>{const over=r.fr&&r.fr.calls>r.fr.lim;const red=r.exc.length||r.nan.length||r.oob.length||r.inv.length||r.cine||!r.mode||over||(r.Lg&&(r.Lg[1]>S.GROW||r.Lg[2]>S.GROW));
  const s=[r.id+(r.solo?'/solo':'/duo'),r.exc.length?'ERR '+r.exc.join(' ; '):'-',r.nan.length?'NAN '+r.nan.join(' '):'-',(r.oob.length?'OOB '+r.oob.join(' '):'-')+(r.inv.length?' INV '+r.inv.join(' '):'')+(r.cine?' CINE-STUCK':'')+(r.mode?'':' SOLO-MODE-LOST'),
    r.fr?'calls='+r.fr.calls+(over?'>'+r.fr.lim+' БЮДЖЕТ':'')+(r.fr.split?'[2]':'[1]')+' geo='+r.fr.geo+'(+'+(r.fr.geo-r.geo0)+') tex='+r.fr.tex:'-',r.L?'upd/tim/anim='+r.L.join('/')+' grow5s='+r.Lg.join('/'):'-'].join(' | ');
  if(red)S.RED.push(s);return (red?'RED ':'    ')+s;};
S.sweep=(solo,from,to)=>S.IDS.slice(from,to).map(id=>S.lineOf(S.run(id,solo))).join('\n');
'tsec_sweep: '+S.IDS.length+' уровней'
//@@
(()=>{return 'duo 0..12\n'+S.sweep(false,0,12);})()
//@@
(()=>{return 'duo 12..24\n'+S.sweep(false,12,24);})()
//@@
(()=>{return 'duo 24..\n'+S.sweep(false,24,99);})()
//@@
(()=>{return 'solo 0..12\n'+S.sweep(true,0,12);})()
//@@
(()=>{return 'solo 12..24\n'+S.sweep(true,12,24);})()
//@@
(()=>{ZC.setSolo(true);return 'solo 24..\n'+S.sweep(true,24,99);})()
//@@
// утечки: luko → уровень → luko ×10 по четырём мирам; геометрии/текстуры — на каждом посещении, куча JS — после сборки мусора (gc=1) после 2-го и 10-го круга
(()=>{ZC.setSolo(false);S.LK=['1-1','2-1','3-1','4-1'];S.leak={};S.LK.forEach(id=>S.leak[id]={});S.round=0;
  S.go=id=>{ZC.goLevel(id);for(let i=0;i<600&&(ZC.G.trans||ZC.W.levelId!==id);i++)ZC.tick(1);if(ZC.W.levelId!==id){S.INFO.push('goLevel не дошёл до '+id+' → loadLevel');ZC.loadLevel(ZC.LV(id));ZC.tick(2);}};
  S.circle=()=>{S.round++;for(const id of S.LK){S.go('luko');ZC.tick(30);S.frame();S.go(id);ZC.tick(60);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(60);const fr=S.frame();S.leak[id][S.round]=[fr.geo,fr.tex];}};
  ZC.startFrom(ZC.LV('luko'));ZC.G.manual=true;ZC.tick(30);S.circle();S.circle();return 'круги 1–2: '+JSON.stringify(S.leak);})()
//@@ gc=1
(()=>{S.h2=window.__heap;S.hp2=performance.memory?performance.memory.usedJSHeapSize:-1;return 'куча после круга 2: '+(S.h2/1048576).toFixed(1)+' МБ (CDP), performance.memory='+(S.hp2/1048576).toFixed(1);})()
//@@
(()=>{while(S.round<10)S.circle();return 'круги 3–10: '+JSON.stringify(S.leak);})()
//@@ gc=1
(()=>{const h10=window.__heap,hp10=performance.memory?performance.memory.usedJSHeapSize:-1;const out=['куча после круга 10: '+(h10/1048576).toFixed(1)+' МБ (CDP) против '+(S.h2/1048576).toFixed(1)+' после 2-го; performance.memory '+(hp10/1048576).toFixed(1)+' против '+(S.hp2/1048576).toFixed(1)];
  let red=false;for(const id of S.LK){const a=S.leak[id][2],b=S.leak[id][10];const dg=b[0]-a[0],dt=b[1]-a[1];const bad=dg>20||dt>10;if(bad)red=true;out.push((bad?'RED ':'    ')+'leak '+id+': geometries '+a[0]+'→'+b[0]+' ('+(dg>=0?'+':'')+dg+'), textures '+a[1]+'→'+b[1]+' ('+(dt>=0?'+':'')+dt+')');}
  const dh=(h10-S.h2)/1048576;if(dh>25){red=true;out.push('RED leak: куча JS +'+dh.toFixed(1)+' МБ между 2-м и 10-м кругом');}
  if(red)S.RED.push(out.filter(l=>/^RED/.test(l)).join(' ; '));return out.join('\n');})()
//@@
// ролики: пропуск посреди ролика, смерть во время ролика (вдвоём и в одиночку); пауза — ниже, по настоящему кадровому циклу
(()=>{S.how='';S.waitCine=(id,solo)=>{ZC.setSolo(solo);ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(2);for(let t=0;t<180&&!ZC.G.cine;t++)ZC.tick(1);S.how='на входе';
    // ролика на входе нет — бродим до 20 с (ролики у триггеров и по ходу уровня) и останавливаемся на первом
    if(!ZC.G.cine){let ph=-1;for(let i=0;i<1200&&!ZC.G.cine;i++){const q=Math.floor(i/90)%5;if(q!==ph){ph=q;S.keysDown(solo,q);}if(i%20===0){ZC.press('KeyR');ZC.press('Semicolon');}if(i%33===0){ZC.press('KeyF');ZC.press('Comma');}if(i%25===5){ZC.press('Space');ZC.press('KeyM');}ZC.tick(1);}S.relAll();S.how='в ходу уровня';}
    return ZC.G.cine;};
  S.midCine=c=>{const want=Math.min(c.dur*0.45,4);for(let t=0;t<3000&&ZC.G.cine===c&&c.t<want;t++)ZC.tick(1);};
  S.drain=()=>{let n=0;for(;n<12&&ZC.G.cine;n++){ZC.skip();ZC.tick(5);}return n;};
  S.moved=()=>{const B=U.K[0].B,h=()=>U.hero(0);let best=0;for(const k of[B[2],B[1],B[3],B[0]]){const x0=h().pos.x,z0=h().pos.z;ZC.hold(k,true);ZC.tick(25);ZC.hold(k,false);ZC.tick(5);best=Math.max(best,Math.hypot(h().pos.x-x0,h().pos.z-z0));}return best;};
  S.cineTest=(id,solo)=>{const r={id,solo,notes:[],nocine:false,dur:0,skips:0};const e0=__errs.length;
    try{
      const c=S.waitCine(id,solo);
      if(!c)r.nocine=true;
      else{r.dur=+c.dur.toFixed(1);r.how=S.how;S.midCine(c);
        r.skips=S.drain();if(ZC.G.cine)r.notes.push('G.cine остался после '+r.skips+' пропусков (ZC.skip)');if(ZC.G.skipT)r.notes.push('G.skipT='+ZC.G.skipT.toFixed(2)+' после пропуска');
        ZC.tick(30);const m=S.moved();if(m<0.5)r.notes.push('после пропуска ролика герой не двигается (смещение '+m.toFixed(2)+' м)');
        const nn=S.nan();if(nn.length)r.notes.push('NaN после пропуска: '+nn[0]);const iv=S.inv();if(iv.length)r.notes.push('inv после пропуска: '+iv[0]);}
      // смерть во время ролика: герой «рассыпался» посреди ролика; ролик досматривается, герой встаёт сам за 15 с
      const c2=S.waitCine(id,solo);
      if(c2){S.midCine(c2);const pi=ZC.G.solo?ZC.G.soloPi:0,p=ZC.players[pi];p.petals=0;p.downed=true;p.downT=10;p.revT=0;
        ZC.tick(20);const left=S.drain();if(ZC.G.cine)r.notes.push('смерть в ролике: G.cine остался');
        for(let t=0;t<960&&p.downed;t++)ZC.tick(1);if(p.downed)r.notes.push('смерть в ролике: герой лежит и через 16 с (downT='+p.downT.toFixed(1)+')');
        const nn=S.nan();if(nn.length)r.notes.push('смерть в ролике: NaN '+nn[0]);const iv=S.inv();if(iv.length)r.notes.push('смерть в ролике: '+iv[0]);}
    }catch(e){r.notes.push('EXC '+String(e.message).slice(0,100)+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(-60));}
    r.notes=r.notes.concat(__errs.slice(e0).slice(0,2).map(x=>'ERR '+x));return r;};
  S.cineLine=r=>{const red=r.notes.length;const s=[r.id+(r.solo?'/solo':'/duo'),r.nocine?'ролика нет за 20 с (не покрыто)':'ролик '+r.dur+' с ('+r.how+'), пропусков '+r.skips,red?r.notes.join(' ; '):'ok'].join(' | ');if(red)S.RED.push('cine '+s);return (red?'RED ':'    ')+s;};
  S.cineSweep=(solo,from,to)=>S.IDS.slice(from,to).map(id=>S.cineLine(S.cineTest(id,solo))).join('\n');
  return 'ролики: готово';})()
//@@
(()=>'cine duo 0..18\n'+S.cineSweep(false,0,18))()
//@@
(()=>'cine duo 18..\n'+S.cineSweep(false,18,99))()
//@@
(()=>'cine solo 0..18\n'+S.cineSweep(true,0,18))()
//@@
(()=>'cine solo 18..\n'+S.cineSweep(true,18,99))()
//@@
// пауза посреди ролика (вдвоём и в одиночку). Кадровый цикл frame() в G.manual не идёт, поэтому — по его правилам: Esc → showMenu('pause') (ZC.menu),
// пока пауза, step не вызывается; Esc в меню паузы → hideMenu (ZC.menuKey). Ролик стоит, после паузы идёт дальше, пропуск его заканчивает.
(()=>{S.pauseTest=(id,solo)=>{const notes=[];const e0=__errs.length;let info='ролика нет за 20 с (не покрыто)';
    try{const c=S.waitCine(id,solo);
      if(c){S.midCine(c);const t0=c.t;ZC.menu('pause');const st=ZC.G.state;const mh=document.getElementById('menu').classList.contains('hide');
        if(st!=='pause')notes.push('showMenu(pause) в ролике: state='+st);if(mh)notes.push('меню паузы скрыто');
        ZC.menuKey('Escape');const st2=ZC.G.state,mh2=document.getElementById('menu').classList.contains('hide');
        if(st2!=='play')notes.push('Esc в паузе не вернул игру (state='+st2+')');if(!mh2)notes.push('меню паузы осталось на экране');
        if(ZC.G.cine!==c)notes.push('пауза оборвала ролик');if(Math.abs(c.t-t0)>1e-9)notes.push('ролик сдвинулся от паузы ('+t0.toFixed(2)+'→'+c.t.toFixed(2)+')');
        ZC.tick(30);if(ZC.G.cine===c&&!(c.t>t0+0.4))notes.push('после паузы ролик не идёт ('+t0.toFixed(2)+'→'+c.t.toFixed(2)+')');
        // пауза уже под конец: Esc → пропуск → Esc
        ZC.menu('pause');ZC.skip();ZC.menuKey('Escape');ZC.tick(5);S.drain();if(ZC.G.cine)notes.push('G.cine остался после паузы и пропуска');if(ZC.G.state!=='play')notes.push('state='+ZC.G.state+' после паузы и пропуска');
        const nn=S.nan();if(nn.length)notes.push('NaN '+nn[0]);const iv=S.inv();if(iv.length)notes.push(iv[0]);
        info='пауза в ролике '+c.dur.toFixed(1)+' с ('+S.how+')';}
    }catch(e){notes.push('EXC '+String(e.message).slice(0,100)+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(-60));}
    if(ZC.G.state!=='play'){try{ZC.menuKey('Escape');}catch(e){}}
    const er=__errs.slice(e0).slice(0,2);if(er.length)notes.push('ERR '+er.join(' ; '));
    const l=id+(solo?'/solo':'/duo')+' | '+info+' | '+(notes.length?notes.join(' ; '):'ok');if(notes.length)S.RED.push('pause '+l);return (notes.length?'RED ':'    ')+l;};
  return 'пауза в ролике (вдвоём)\n'+S.IDS.map(id=>S.pauseTest(id,false)).join('\n');})()
//@@
(()=>'пауза в ролике (одиночка)\n'+S.IDS.map(id=>S.pauseTest(id,true)).join('\n'))()
//@@
// смена героя посреди боя (одиночка): на каждом уровне с врагами — телепорт к ближайшему, бой и Q каждые 25 кадров
(()=>{S.swapFight=id=>{const r={id,foes:0,swaps:0,notes:[]};const e0=__errs.length;
  try{ZC.setSolo(true);ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(20);S.drain();
    const W=ZC.W,foes=W.enemies.filter(e=>e.alive&&!S.bad3(e.pos));r.foes=foes.length;
    if(foes.length){const E=S.ext(),e=foes[0],h=U.me();h.pos.set(e.pos.x-1.3,e.pos.y+0.1,e.pos.z);h.vel.set(0,0,0);ZC.tick(5);const s0=ZC.G.stats.swaps;
      for(let i=0;i<480;i++){const t=W.enemies.find(x=>x.alive)||e,m=U.me();m.face=Math.atan2(t.pos.x-m.pos.x,t.pos.z-m.pos.z);
        if(i%8===0)ZC.press('KeyF');if(i%50===20)ZC.press('KeyG');if(i%25===12)ZC.press('KeyQ');if(i%90===60)ZC.press('KeyE');ZC.tick(1);if(ZC.G.cine)ZC.skip();
        if(i%5===0){const n=S.nan(),v=S.inv(),o=S.oob(E);
          if(n.length&&r.notes.length<3)r.notes.push('NaN '+n[0]);if(v.length&&r.notes.length<3)r.notes.push('inv '+v[0]);if(o.length&&r.notes.length<3)r.notes.push('OOB '+o[0]);
          if(ZC.G.soloPi!==0&&ZC.G.soloPi!==1&&r.notes.length<3)r.notes.push('soloPi='+ZC.G.soloPi);
          const me=U.me();if(me.cling&&r.notes.length<3)r.notes.push('управляемый герой cling');if(!me.active&&r.notes.length<3)r.notes.push('U.me() не активен');}}
      r.swaps=ZC.G.stats.swaps-s0;}
  }catch(e){r.notes.push('EXC '+String(e.message).slice(0,100)+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(-60));}
  r.notes=r.notes.concat(__errs.slice(e0).slice(0,2).map(x=>'ERR '+x));return r;};
  S.swapLine=r=>{const red=r.notes.length;const s=[r.id+'/solo',r.foes?'врагов '+r.foes+', смен '+r.swaps:'врагов нет',red?r.notes.join(' ; '):'ok'].join(' | ');if(red)S.RED.push('swap '+s);return (red?'RED ':'    ')+s;};
  return 'смена героя в бою\n'+S.IDS.map(id=>S.swapLine(S.swapFight(id))).join('\n');})()
//@@
// большой кадр: step(dt=0,5) — герой не за картой, не пролетает сквозь стену (и контроль с обычным dt: там красное — настоящий баг)
(()=>{const STEP=0.36;
  S.crosses=(x0,z0,x1,z1,b,r)=>{const e=1e-3,minx=b.minx-r+e,maxx=b.maxx+r-e,minz=b.minz-r+e,maxz=b.maxz+r-e;let t0=0,t1=1;const dx=x1-x0,dz=z1-z0;
    for(const [p,q,lo,hi] of [[-dx,x0-minx,0,0],[dx,maxx-x0,0,0],[-dz,z0-minz,0,0],[dz,maxz-z0,0,0]]){if(Math.abs(p)<1e-12){if(q<0)return false;}else{const u=q/p;if(p<0){if(u>t1)return false;if(u>t0)t0=u;}else{if(u<t0)return false;if(u<t1)t1=u;}}}
    return t0<t1;};
  S.big=(id,dt,frames)=>{const r={id,dt,tunnel:[],emb:[],oob:[],nan:[]};const e0=__errs.length;
    try{ZC.setSolo(false);ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(20);S.drain();ZC.tick(10);const W=ZC.W,E=S.ext();
      for(let ph=0;ph<5;ph++){S.keysDown(false,ph);
        for(let i=0;i<frames;i++){const hs=ZC.players.map(p=>p.heroes[p.act]),p0=hs.map(h=>({x:h.pos.x,y:h.pos.y,z:h.pos.z})),f0=ZC.G.stats.falls;
          ZC.step(dt);if(ZC.G.cine){ZC.skip();}
          hs.forEach((h,k)=>{const a=p0[k],b=h.pos;if(!S.f(b.x)||!S.f(b.y)||!S.f(b.z)){if(r.nan.length<2)r.nan.push(h.kind+'='+S.fmt(b));return;}
            const tele=ZC.G.stats.falls!==f0||Math.hypot(b.x-a.x,b.z-a.z)>14||Math.abs(b.y-a.y)>8;if(tele)return;
            const rad=h.d.radius,y0=Math.min(a.y,b.y),y1=Math.max(a.y,b.y);
            for(const bx of W.boxes){if(!bx.on||bx.maxy<=y0+STEP||bx.miny>=y1+1.0)continue;
              if(S.crosses(a.x,a.z,b.x,b.z,bx,rad)){const inside=b.x>bx.minx-rad+0.02&&b.x<bx.maxx+rad-0.02&&b.z>bx.minz-rad+0.02&&b.z<bx.maxz+rad-0.02;
                const msg=h.kind+' ('+a.x.toFixed(1)+','+a.z.toFixed(1)+')→('+b.x.toFixed(1)+','+b.z.toFixed(1)+') коробка x'+bx.minx.toFixed(1)+'…'+bx.maxx.toFixed(1)+' z'+bx.minz.toFixed(1)+'…'+bx.maxz.toFixed(1)+' y'+bx.miny.toFixed(1)+'…'+bx.maxy.toFixed(1);
                if(inside){if(r.emb.length<2)r.emb.push(msg);}else if(r.tunnel.length<2)r.tunnel.push(msg);break;}}
            const o=S.oob(E);if(o.length&&r.oob.length<2)r.oob.push(o[0]);});
          const n=S.nan();if(n.length&&r.nan.length<2)r.nan.push(n[0]);}}
      S.relAll();
    }catch(e){r.emb.push('EXC '+String(e.message).slice(0,100)+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(-60));}
    r.err=__errs.slice(e0).slice(0,2);return r;};
  S.bigLine=(a,b)=>{const g=r=>[r.tunnel.length?'TUNNEL '+r.tunnel.join(' | '):'',r.emb.length?'EMBED '+r.emb.join(' | '):'',r.oob.length?'OOB '+r.oob.join(' ; '):'',r.nan.length?'NAN '+r.nan.join(' ; '):'',r.err.length?'ERR '+r.err.join(' ; '):''].filter(Boolean).join(' ');
    const ca=g(a),cb=g(b);const red=ca||cb;const s=a.id+' | dt=1/60: '+(ca||'ok')+' | dt=0.5: '+(cb||'ok');if(ca)S.RED.push('bigdt-control '+s);else if(cb)S.RED.push('bigdt '+s);return (red?'RED ':'    ')+s;};
  S.bigSweep=(from,to)=>S.IDS.slice(from,to).map(id=>S.bigLine(S.big(id,1/60,60),S.big(id,0.5,6))).join('\n');
  return 'большой кадр: готово';})()
//@@
(()=>'bigdt 0..18\n'+S.bigSweep(0,18))()
//@@
(()=>'bigdt 18..\n'+S.bigSweep(18,99))()
//@@
// итог
(()=>{const red=S.RED.length;return 'SUMMARY tsec_sweep: red='+red+(red?'\n'+S.RED.map(x=>'  RED '+x.slice(0,260)).join('\n'):'')+(S.INFO.length?'\nINFO '+S.INFO.join(' ; '):'');})()
