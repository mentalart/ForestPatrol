// ---- продолжение build5B2 (часть p6b): ОБУЧАЮЩИЕ КАТСЦЕНЫ — общий движок ----
  // По отзыву: в бою нет ни подсказок, ни карточек «как победить». Вместо них — после основного ролика каждой стадии идёт обучающая
  // катсцена: Звенышко показывает на самом поле, как устроен бой и что сделать, чтобы победить. Герои и Кощей разыгрывают приёмы
  // по сценарию (настоящие снаряды и урон здесь не нужны — реквизит, позы и эффекты), ролик пропускается как обычный (оба держат прыжок).
  // Сцену урока описывает модуль стадии: E.LES[n]=L=>{…} — L.beat(сек,{cam,say,ev}) добавляет кадр, реплику и события; помощники
  // показа — L.orb, L.tele, L.sig, L.guard, L.hit, L.roll, L.pips… (ниже). Урок идёт при первом входе в стадию и ещё раз после
  // двух неудач (каждый третий вход); при обычном повторе («Сбился сказ») его нет.
  E.LES={};E.lessonSeen={};E.lessonN={};E.lessonOn=null;
  const kbd=a=>G.solo?K(0,a):K(0,a)+' или '+K(1,a);            // клавиши действия: одному — своя, вдвоём — обе (Игрок 1 / Игрок 2)
  const kbd1=a=>K(0,a),kbd2=a=>G.solo?K(0,a):K(1,a);
  E.kbd=kbd;
  // сколько показывать строку: у записанной реплики — её длина, у новой — по длине текста (детям читать небыстро)
  const lessonLen=(t,who)=>{const e=FIN.vox&&FIN.vox.find&&FIN.vox.find(who,t);if(e&&e.dur)return e.dur+0.5;return Math.max(2.6,1.5+String(t).replace(/<[^>]*>/g,'').length/11);};
  function Lesson(n){const L={n,dur:0,shots:[],says:[],evs:[],undo:[],props:[],checks:[],ticks:[],solo:G.solo};
    // beat(d, {cam:[p,l]|[p,l,p2,l2], fov, say:[кто,текст,(через,(на сколько))], says:[…], ev:[[через,fn]…], zv:[x,y,z]}): d=null — по длине реплики
    L.beat=(d,o)=>{o=o||{};const t=L.dur,ss=(o.say?[o.say]:[]).concat(o.says||[]);if(d==null)d=Math.max(2.6,...ss.map(s=>(s[2]==null?0.2:s[2])+lessonLen(s[1],s[0])));
      if(o.cam)L.checks.push({t:t,d:d,cam:o.cam,fov:o.fov||46,need:o.need||[]});
      if(o.cam){const c=o.cam,x={fov:o.fov||46,move:o.move||'none'};if(o.fov2)x.fov2=o.fov2;
        L.shots.push(c.length>2?MV(t,c[0],c[1],c[2],c[3]||c[1],d,Object.assign(x,{ease:'inOutSine'})):SH(t,c[0],c[1],x));}
      for(const s of ss){const at=s[2]==null?0.2:s[2];L.says.push([t+at,s[3]||Math.max(1.6,Math.min(lessonLen(s[1],s[0]),d-at-0.05)),s[0],s[1],true]);}
      if(o.zv)L.evs.push({t:t+0.1,fn:()=>zvenTo(new V3(o.zv[0],o.zv[1],o.zv[2]),0.9)});
      for(const e of o.ev||[])L.evs.push({t:t+e[0],fn:e[1]});
      L.dur+=d;return L;};
    L.at=(dt,fn)=>L.evs.push({t:L.dur+dt,fn});                    // событие внутри уже добавленного кадра (dt — от конца)
    L.add=o=>{k5Prop(o);L.props.push(o);return o;};                // реквизит урока — уберётся в конце
    L.later=(t,fn)=>anim(Math.max(0.01,t),k=>{if(k>=1)fn();});   // как later, но не переживёт ролик (при пропуске W.anims очищается)
    L.atT=(tt,fn)=>L.evs.push({t:tt,fn});                           // событие в абсолютный момент урока (с)
    L.tick=fn=>{L.ticks.push(fn);};                                // что делать каждый кадр: fn(t, dt) — t в секундах урока (камера и автопилот по времени)
    L.on=fn=>{L.undo.push(fn);};                                   // что вернуть после урока
    // ---------- участники ----------
    L.h=k=>T[k];
    L.put=(h,x,z,face)=>{placeOnGround(h,x,z,0);h.face=face==null?Math.PI:face;h.vel.set(0,0,0);return h;};
    L.look=(h,p)=>{h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);};
    L.walk=(h,x,z,dur,face)=>hWalk(h,x,z,dur||0.8,face);
    L.kos=(x,z,face,vis)=>{KS.g.position.set(x,KS.g.position.y<0.2?0:KS.g.position.y,z);KS.g.rotation.y=face==null?0:face;KS.g.visible=vis!==false;return KS;};
    L.pose=(name,o)=>{try{KA.pose(name,o||{});}catch(e){}};
    L.emo=(h,t)=>{try{ACT.emote(h,t);}catch(e){}};
    // ---------- приёмы героев ----------
    L.guard=(h,sec)=>{h._demoGuard=G.time+(sec||1.1);SFX.shield();};
    L.hit=(h,at)=>{if(at)L.look(h,at);h.atkT=0.28;SFX.swish();};
    L.roll=(h,dx,dz,dur)=>{const d=Math.hypot(dx,dz)||1,f=h.pos.clone();h.rollDir.set(dx/d,0,dz/d);h.rollT=0.38;h.iT=0.4;h.lastRoll=G.time;SFX.swish();
      anim(dur||0.4,k=>{h.pos.x=f.x+dx*CE.outCubic(k);h.pos.z=f.z+dz*CE.outCubic(k);h.vel.set(0,0,0);});};
    L.jump=(h,hgt)=>{const y0=h.pos.y;SFX.jump();anim(0.55,k=>{h.pos.y=y0+Math.sin(k*Math.PI)*(hgt||1.5);h.vel.set(0,0,0);});};
    // успех: звёзды и звон над героем или в точке
    L.ok=p=>{const q=p.isVector3?p:hH(p);FX.stars(q.clone().add(new V3(0,0.3,0)),10,0xffe08a);FX.sparkle(q,8,0xffffff);SFX.ok();};
    // ---------- эффекты показа ----------
    // шар из from в to: arc — высота дуги, col — цвет, on(p) — что сделать на месте; возвращает объект с .m
    L.orb=(from,to,dur,o)=>{o=o||{};const g=L.add(new THREE.Group());const core=new THREE.Mesh(new THREE.SphereGeometry(o.r||0.34,12,10),M(o.dark===false?0xfff0c0:0x1c1028,{emissive:o.col||0x8a40ff,emissiveIntensity:0.9}));g.add(core);
      g.add(k5Glow(o.col||0xb070ff,(o.r||0.34)*5));g.position.copy(from);k5Trail(g,o.col||0xb070ff,{life:0.4,size:0.4});
      anim(dur,k=>{g.position.lerpVectors(from,to,k);g.position.y+=Math.sin(k*Math.PI)*(o.arc||0);if(k>=1){k5Del(g);if(o.on)o.on(to);}});return g;};
    // красный/жёлтый круг на земле: заполняется за dur — «сюда ударит»
    L.tele=(p,r,dur,col,on)=>{col=col||0xff3a30;const g=L.add(new THREE.Group());g.position.set(p.x,0.08,p.z);const rim=new THREE.Mesh(new THREE.RingGeometry(0.93,1,48),k5Add(col,{opacity:0.9}));rim.rotation.x=-Math.PI/2;rim.scale.setScalar(r);g.add(rim);
      const fl=new THREE.Mesh(new THREE.CircleGeometry(1,40),k5Add(col,{opacity:0.45}));fl.rotation.x=-Math.PI/2;g.add(fl);
      anim(dur,k=>{fl.scale.setScalar(Math.max(0.01,r*k));if(k>=1){k5Ring(new V3(p.x,0.15,p.z),col,r*0.6,r*1.4,0.4);k5Del(g);if(on)on(p);}});return g;};
    // сигнал замаха на груди Кощея: yellow — щит, red — кувырок, blue — отбить шар
    L.sig=(kind,sec)=>{const col={yellow:0xffd23a,red:0xff3a30,blue:0x4aa0ff}[kind]||0xffd23a;const g=L.add(new THREE.Group());g.add(k5Glow(col,2.4));
      const r=new THREE.Mesh(new THREE.TorusGeometry(0.5,0.08,6,28),k5Add(col,{opacity:0.95}));g.add(r);{const sf=kind==='red'?SFX.red:SFX.yellow;if(sf)sf();}
      const f=()=>{g.position.copy(KS.g.position).add(new V3(0,2.9,1.0).applyAxisAngle(new V3(0,1,0),KS.g.rotation.y));};f();
      k5fx(sec||1.0,k=>{f();g.scale.setScalar(0.7+0.5*k+0.12*Math.sin(G.time*30));r.rotation.z+=0.2;},()=>k5Del(g));return g;};
    // угольки спеси над Кощеем: pips(n) — ряд n огоньков; .out(i) — погасить один, .all() — все
    L.pips=(n,col)=>{const g=L.add(new THREE.Group()),P=[];for(let i=0;i<n;i++){const s=k5Glow(col||0xff9a3a,0.62);s.position.set((i-(n-1)/2)*0.7,0,0);g.add(s);P.push({s,on:true});}
      const f=()=>{g.position.copy(KS.g.position).add(new V3(0,5.1,0));};f();const tk=k5fx(999,()=>{f();P.forEach((q,i)=>{q.s.material.opacity=q.on?0.8+0.2*Math.sin(G.time*8+i):0;});},()=>k5Del(g));
      const O={g,P,out:i=>{const q=P[i==null?P.findIndex(z=>z.on):i];if(q&&q.on){q.on=false;SFX.ember();FX.sparks(g.position.clone().add(q.s.position),6,0xffa040);}},all:()=>P.forEach((q,i)=>O.out(i)),
        count:()=>P.filter(q=>q.on).length};L.on(()=>{tk.t=tk.dur;});return O;};
    // круг на земле, пульсирует sec секунд (зелёный — «встань сюда», золотой — «бей здесь»)
    L.ring=(p,r,col,sec)=>{const g=L.add(new THREE.Group());g.position.set(p.x,0.09,p.z);const rim=new THREE.Mesh(new THREE.RingGeometry(r-0.28,r,44),k5Add(col||0x9fe070,{opacity:0.8}));rim.rotation.x=-Math.PI/2;g.add(rim);
      const fl=new THREE.Mesh(new THREE.CircleGeometry(r-0.28,40),k5Add(col||0x9fe070,{opacity:0.14}));fl.rotation.x=-Math.PI/2;g.add(fl);
      k5fx(sec||3,k=>{rim.material.opacity=0.55+0.35*Math.sin(G.time*7);const e=k<0.1?k/0.1:k>0.85?(1-k)/0.15:1;g.scale.setScalar(Math.max(0.01,e));},()=>k5Del(g));return g;};
    // молния в точку (картинка и звук; урона нет)
    L.bolt=p=>{k5Bolt(p,0xd8b0ff);k5s('strike');shakeAll(0.04,0.25);FX.dust(p.clone(),10,0x6a5a7a);};
    // летучий ключ Кощея: летит из from к to по дуге
    L.key=(from,to,dur,on)=>{const g=L.add(new THREE.Group());FL.k5key(g);g.position.copy(from);k5s('keyFly');FX.sparkle(from,10,0xc080ff);
      anim(dur,k=>{g.position.lerpVectors(from,to,k);g.position.y+=Math.sin(k*Math.PI)*1.2;g.rotation.y+=0.25;if(k>=1){k5Del(g);if(on)on(to);}});return g;};
    // ветер: белые струи по полю sec секунд, dir — куда дует
    L.wind=(dir,sec)=>{k5s('wind');k5fx(sec,(k,dt)=>{K5WIND.mode='lin';K5WIND.dir.copy(dir);K5WIND.k=0.9*(k<0.15?k/0.15:k>0.85?(1-k)/0.15:1);k5WindTick(dt,C);},()=>{K5WIND.k=0;if(K5WIND.mesh)K5WIND.mesh.visible=false;});};
    // костлявая рука из трещины в точке p: трещина (warn с), рука встаёт и сжимается
    L.hand=(p,warn)=>{const q=p.clone().setY(0);k5s('crack');const cr=k5Decal(K5TEX.crack,0x3a2410,1.5,new V3(q.x,0.07,q.z),0);L.props.push(cr);k5fx(warn+0.3,k=>{cr.material.opacity=Math.min(1,k*3)*0.95;},()=>k5Del(cr));FX.dust(q.clone().add(new V3(0,0.1,0)),6,0x7a6a5a,0.8);
      L.later(warn,()=>{const H=k5HandMake(q);L.props.push(H.g);k5s('handUp');FX.dust(q.clone().add(new V3(0,0.2,0)),14,0x6a4a3a,1.3);k5Ring(new V3(q.x,0.1,q.z),0xc8b090,0.3,2.0,0.45,0.12);
        k5fx(1.7,k=>{const t=k*1.7;if(t<0.22)H.g.position.y=lerp(-2.2,0,CE.outBack(t/0.22));else if(t<1.2){H.g.position.y=0;H.set(t<0.34?1:clamp(1-(t-0.34)/0.18,0,1));}else{H.set(clamp((t-1.2)/0.2,0,1)*0.6);H.g.position.y=-(t-1.2)*4.5;}},()=>k5Del(H.g));});};
    // полоса на земле (по ней пойдут ёлки): прозрачная, мигает sec секунд
    L.strip=(z,len,w,col,sec)=>{const m=L.add(new THREE.Mesh(new THREE.PlaneGeometry(len,w),k5Add(col||0x7aff9a,{opacity:0})));m.rotation.x=-Math.PI/2;m.position.set(C.x,0.07,z);
      k5fx(sec||3,k=>{m.material.opacity=(k<0.85?0.14+0.16*Math.sin(G.time*14):0.1*(1-k)/0.15);},()=>k5Del(m));return m;};
    // три чёрные ёлки пробегают поперёк поляны по полосе z (dir — слева направо или обратно)
    L.trees=(z,dir,sec)=>{const mat=M(0x1e2a24,{emissive:0x2a1048,emissiveIntensity:0.4}),trunk=M(0x3a2a1a),gs=[];
      for(let i=0;i<3;i++){const g=L.add(new THREE.Group());addMesh(new THREE.CylinderGeometry(0.15,0.2,1,6),trunk,0,0.5,0,g);for(let j=0;j<3;j++)addMesh(new THREE.ConeGeometry(1.1-j*0.25,1.4,7),mat,0,1.1+j*0.8,0,g);gs.push(g);}
      const x0=dir>0?-13:13;k5s('swing');anim(sec||3,k=>{gs.forEach((g,i)=>{g.position.set(x0+dir*(k*26-i*1.8),0,z+(i-1)*0.4);g.rotation.z=Math.sin(G.time*12)*0.05;});if(k>=1)gs.forEach(k5Del);});};
    // зелёная ёлка-укрытие вырастает/перебегает к точке
    L.sprucePop=(x,z,life)=>{const g=L.add(new THREE.Group());g.position.set(x,0,z);const m=M(0x2e5a2e),dk=M(0x5a3a1e);addMesh(new THREE.CylinderGeometry(0.15,0.22,1,6),dk,0,0.5,0,g);
      for(let i=0;i<3;i++)addMesh(new THREE.ConeGeometry(1.25-i*0.3,1.6,7),m,0,1.2+i*0.9,0,g);g.scale.setScalar(0.01);FX.dust(new V3(x,0.1,z),10,0x5a4a3a);anim(0.6,k=>g.scale.setScalar(Math.max(0.01,CE.outBack(k))));if(life)L.later(life,()=>anim(0.4,k=>{g.scale.setScalar(Math.max(0.01,1-k));if(k>=1)k5Del(g);}));return g;};
    // ---------- готовые номера: возвращают список событий для ev: [[через, fn]…] ----------
    // шар летит в героя; в последний миг щит; шар возвращается к источнику (o.back — сколько летит назад, o.then(p) — что тогда)
    L.parry=(t0,h,from,o)=>{o=o||{};const d=o.dur||2.4,bk=o.back||1.0,col=o.col||0x8a40ff,tgt=()=>hH(h);
      return [[t0,()=>{L.look(h,from);k5Flash(from,col,2,0.3);k5s('cast');L.orb(from,tgt(),d,{col,arc:o.arc||0.4});}],
        [t0+d-0.35,()=>{L.guard(h,0.9);}],
        [t0+d,()=>{SFX.parry();FX.sparks(tgt().add(new V3(0,0.2,0.4)),14,0xffe08a);k5Flash(tgt(),0xffe08a,2.4,0.3);L.orb(tgt(),from,bk,{col:0xffd76a,dark:false,arc:0.5,on:p=>{L.ok(p);if(o.then)o.then(p);}});}]];};
    // герой бьёт цель n раз с промежутком gap; each(i, p) — после каждого удара
    L.strikes=(t0,h,at,n,gap,each)=>{const ev=[];for(let i=0;i<n;i++)ev.push([t0+i*(gap||0.45),()=>{L.hit(h,at);FX.sparks(at.clone(),8,0xffe08a);SFX.clink();if(each)each(i,at);}]);return ev;};
    // красный круг на земле заполняется — герой кувырком уходит — удар приходит в пустой круг (hit(p) — свой эффект удара)
    L.dodge=(t0,h,p,r,dur,away,hit)=>{dur=dur||1.6;away=away||new V3(2.6,0,0);
      return [[t0,()=>{L.tele(p,r,dur,0xff3a30,q=>{if(hit)hit(q);else{k5Bolt(q,0xd8b0ff);k5s('strike');shakeAll(0.04,0.2);}});}],
        [t0+dur-0.5,()=>{L.roll(h,away.x,away.z,0.45);}],[t0+dur+0.5,()=>{L.ok(h);}]];};
    // золотая нить сказа вокруг Кощея (как в победе): bindBeat — готовая сцена
    L.bind=()=>bindBeat();
    // Кощей выбит из сил: поза и звёздочки по кругу
    L.dizzy=sec=>{L.pose('slump',{});const f=KS.g.position;k5fx(sec||2,k=>{if(Math.random()<0.25)FX.stars(new V3(f.x,f.y+4.4,f.z),2,0xfff2b0);});};
    // нить к цели: линия от a() к b() на sec секунд (как нити сказа)
    L.thread=(a,b,sec,col)=>{const m=L.add(new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1,5),k5Add(col||0xffd060,{opacity:0.9})));
      k5fx(sec||1.5,k=>{const p=a(),q=b(),d=q.clone().sub(p);m.position.copy(p).addScaledVector(d,0.5);m.scale.set(1,Math.max(0.01,d.length()),1);m.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());m.material.opacity=0.9*(k<0.85?1:(1-k)/0.15);},()=>k5Del(m));return m;};
    return L;}
  E.lesson=(n,go)=>{const mk=E.LES[n],c=E.lessonN[n]=(E.lessonN[n]||0)+1;
    if(!mk||!K5.auto||!(c===1||c%3===0)){go();return;}
    const L=Lesson(n);
    // что вернуть: герои и Кощей — на места, Звенышко — как было
    const kl=K5.log.length,el=(E.logs||[]).length;
    const snap=HEROES.map(h=>({h,p:h.pos.clone(),f:h.face,v:h.g.visible})),ks={p:KS.g.position.clone(),r:KS.g.rotation.y,v:KS.g.visible,rx:KS.g.rotation.x},zs={mode:Z.mode,pos:Z.pos.clone(),vis:Z.vis,shown:Z.shown};
    const fin=()=>{for(const s of snap){s.h.pos.copy(s.p);s.h.face=s.f;s.h.vel.set(0,0,0);s.h._demoGuard=0;s.h.atkT=0;s.h.rollT=0;s.h.iT=0;s.h._em=null;}
      KS.g.position.copy(ks.p);KS.g.rotation.set(ks.rx,ks.r,0);KS.g.visible=ks.v;try{KA.reset();}catch(e){}
      for(const f of L.undo.splice(0))try{f();}catch(e){console.error('lesson undo',e);}
      for(const o of L.props)k5Del(o);L.props.length=0;W.anims.length=0;K5.log.length=Math.min(K5.log.length,kl);if(E.logs)E.logs.length=Math.min(E.logs.length,el);Z.mode=zs.mode;Z.pos.copy(zs.pos);Z.vis=zs.vis;Z.shown=zs.shown;CINE.mood&&CINE.mood(null,0);};
    try{mk(L);}catch(e){console.error('lesson '+n,e);fin();go();return;}
    // проверка кадров: каждая точка need (мировые x,y,z) должна быть в кадре в начале и в конце плана — вне кадра или под субтитром = предупреждение
    E.lessonWarn=[];{const cam=new THREE.PerspectiveCamera(46,16/9,0.1,500),pt=new V3();let bi=0;
      for(const c of L.checks){bi++;for(const need of c.need||[]){const at=typeof need==='function'?need():need;for(const k of(c.cam.length>2?[0,1]:[0])){
        const pp=k?c.cam[2]:c.cam[0],ll=k?(c.cam[3]||c.cam[1]):c.cam[1];cam.fov=c.fov;cam.position.set(pp[0],pp[1],pp[2]);cam.lookAt(ll[0],ll[1],ll[2]);cam.updateMatrixWorld(true);cam.updateProjectionMatrix();
        pt.set(at[0],at[1],at[2]).project(cam);if(Math.abs(pt.x)>0.93||pt.y>0.9||pt.y<-0.62||pt.z>1)E.lessonWarn.push('кадр '+bi+' ('+c.t.toFixed(1)+' с, '+(k?'конец':'начало')+'): точка '+at.map(q=>q.toFixed(1))+' → x='+pt.x.toFixed(2)+' y='+pt.y.toFixed(2));}}}}
    if(!L.dur){fin();go();return;}
    E.lessonOn=n;E.log('lesson'+n);
    play({dur:L.dur+0.3,fov:46,camK:3.2,shots:L.shots,says:L.says,events:L.evs,tick:L.ticks.length?(t,dt)=>{for(const f of L.ticks)f(t,dt);}:undefined,end:()=>{E.lessonOn=null;fin();go();}});
    const cd=CINE.CD&&CINE.CD();if(cd&&cd.S===G.cine){cd.inserts=false;cd.cover=[];cd.calm=true;}};
