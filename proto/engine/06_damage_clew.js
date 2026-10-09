/* ============================== УРОН, КЛУБОК НИТОК И ПОДШИВАНИЕ (закон доброго дивана) ============================== */
// Единственная точка снятия лепестка. Источник — только морок или опасность мира: герой задеть героя не может.
function damageHero(h,src){if(!src||(src.kind!=='enemy'&&src.kind!=='hazard'))return false;if(HEROES.indexOf(src.ref)>=0)return false;
  if(!h.active||h.cling)return false;const p=players[h.player];if(p.downed||h.iT>0||(h.power&&h.power.t>0&&h.kind==='potap'))return false;
  p.petals=Math.max(W.noLose?1:0,p.petals-(W.noPetals?0:1));h.iT=1.2;h.hurtT=1.2;SFX.hurt();shake(h.player,0.05,0.25);
  if(src.ref&&src.ref.pos){const dx=h.pos.x-src.ref.pos.x,dz=h.pos.z-src.ref.pos.z,d=Math.hypot(dx,dz)||1;const kk=W.world===4&&W.lavas.length&&((h.groundRef&&h.groundRef.crust)||overLava(h))?0.15:1;h.vel.x=dx/d*6*kk;h.vel.z=dz/d*6*kk;h.vel.y=4*kk;h.grounded=kk<1&&h.grounded;h.knockT=0.3*kk;
    if(src.ref.kind==='tat'){h.vel.x*=0.15;h.vel.z*=0.15;h.vel.y=2;h.knockT=0.15;}   // паутинник щиплет, а не отбрасывает
    if(src.ref.kind==='tyagun'){h.vel.x=-dx/d*4.5;h.vel.z=-dz/d*4.5;h.vel.y=2.5;h.knockT=0.28;floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Тянет!','#9fe6ff');}}
  floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),W.noPetals?'Ох!':'-1 лепесток','#ff9ab8');
  if(p.petals===0){p.downed=true;p.downT=10;p.revT=0;h.guard=false;tip(1-p.i,'Друг клубком ниток рассыпался! Подойди — зашей.',3);}
  return true;}
function updateDowned(pi,dt){const p=players[pi],h=active(pi);h.vel.x=damp(h.vel.x,0,8,dt);h.vel.z=damp(h.vel.z,0,8,dt);p.downT-=dt;
  // любой герой напарника стоит рядом секунду — клубок подшит, герой встаёт с двумя лепестками
  const rr=W.vest==='kit'?6:1.4,near=players[1-pi].heroes.some(o=>!(o.active&&players[1-pi].downed)&&hd(o.pos,h.pos)<rr&&Math.abs(o.pos.y-h.pos.y)<(W.vest==='kit'?3:1.5));
  if(near){p.revT+=dt;if(p.revT>=1){p.downed=false;p.petals=2;h.iT=2;G.stats.revives++;SFX.ok();floatText(h.pos.clone().add(new V3(0,1.6,0)),'Подшили!','#7ee08a');}}
  else p.revT=Math.max(0,p.revT-dt*0.5);
  if(p.downed&&p.downT<=0){p.downed=false;p.petals=3;placeOnGround(h,p.cp.x,p.cp.z,p.cp.y);h.iT=2;tip(pi,'Снова в пути! Все лепестки на месте.',2);}}
/* богатырский выход: полная синяя шкала — Смена выпускает второго героя со своей силой */
const POWER={potap:['Медвежья сила',6,'каждый удар ломает скорлупу'],proshka:['Меч-кладенец',6,'меч сам рубит ближних'],pelageya:['Вещий взор',5,'мороки вдвое медленнее'],yosha:['Живой родник',1,'всем по лепестку']};
function bogatyrExit(pi,h){const p=players[pi],P=POWER[h.kind];p.blue=0;h.power={t:P[1]};SFX.horn();banner('Богатырский выход!',PCSS[pi],2,h.d.name+' — «'+P[0]+'»: '+P[2]);ringFx(h.pos,COL.gold,4);
  if(h.kind==='pelageya')G.slowFoes=5;
  if(h.kind==='yosha'){for(const q of players){q.petals=Math.min(3,q.petals+1);if(q.downed){q.downed=false;q.petals=2;active(q.i).iT=2;}}burst(h.pos.clone().add(new V3(0,1,0)),0x7ad8ff,24,6);}}
function updatePowers(dt){G.slowFoes=Math.max(0,(G.slowFoes||0)-dt);for(const h of HEROES){if(!h.power||h.power.t<=0)continue;h.power.t-=dt;
  if(h.kind==='proshka'&&h.active){h.power.cd=(h.power.cd||0)-dt;if(h.power.cd<=0){let best=null,bd=3.2;for(const e of W.enemies){if(!e.alive)continue;const d=hd(e.pos,h.pos);if(d<bd){bd=d;best=e;}}
    if(best){h.power.cd=0.45;h.face=Math.atan2(best.pos.x-h.pos.x,best.pos.z-h.pos.z);h.atkT=0.28;SFX.swish();enemyHit(best,h,false);}}}}}

/* ============================== КЛУБОК-ПУТЕВОДИТЕЛЬ (RB): нить-тропка, нить к нити, струны на колышках, паутинки ============================== */
const THREAD_GEO=new THREE.CylinderGeometry(0.06,0.06,1,6);THREAD_GEO.rotateX(Math.PI/2);THREAD_GEO.translate(0,0,0.5);
const PATH_GEO=new THREE.PlaneGeometry(1,1);PATH_GEO.rotateX(-Math.PI/2);PATH_GEO.translate(0,0,0.5);
function standingOn(t){return !!t&&HEROES.some(h=>h.groundRef===t);}
const thY=(t,u)=>t.string?lerp(t.y,t.y2,clamp(u/Math.max(t.len,0.01),0,1)):t.y;
// нить друга рядом (до 3,5 м в сторону) — наш клубок пристегнётся к её кончику и продолжит в ту же сторону
function findHost(pi,h){let best=null,bd=1e9;
  for(const o of W.threads){if(o.owner===pi||o.child||o.string||o.ret)continue;const px=h.pos.x-o.sx,pz=h.pos.z-o.sz,u=px*o.dx+pz*o.dz,lat=Math.abs(px*o.dz-pz*o.dx);
    if(u>-4.5&&u<o.max+1.5&&lat<3.5&&Math.abs(h.pos.y-o.y)<1.6){const d=lat+Math.max(0,-u)*0.5;if(d<bd){bd=d;best=o;}}}
  return best;}
function canContinue(pi){if(!W.abil.clew||players[pi].downed)return false;const mine=W.threads.find(t=>t.owner===pi&&!t.ret&&!t.string);if(mine&&(mine.child||mine.parent||mine.string||standingOn(mine)))return false;return !!findHost(pi,active(pi));}
function throwYarn(pi){const p=players[pi],h=active(pi);if(p.downed||h.hang)return;
  if(!W.abil.clew){if(p.lockedTip<=0){p.lockedTip=4;tip(pi,'Клубок вам Баба Яга подарит — в первом мире.',2.4);}return;}
  // струна на колышке висит, пока её не смотают: RB там, откуда её бросили, — смотать. Струн у игрока до трёх
  const mine=W.threads.find(t=>t.owner===pi&&!t.ret&&!t.string);
  if(!mine){const at=W.threads.find(t=>t.owner===pi&&t.string&&!t.sag&&!t.ret&&hd(h.pos,t.anchor)<1.3&&Math.abs(h.pos.y-t.anchor.y)<1.2);
    if(at){if(HEROES.some(q=>q!==h&&q.groundRef===at)){tip(pi,'По струне кто-то идёт — погоди, пока дойдёт.',1.8);SFX.miss();return;}
      removeThread(at);floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Струна смотана','#ffd76a');SFX.thread();p.yarnCd=0.3;return;}
    const strs=W.threads.filter(t=>t.owner===pi&&t.string&&!t.ret);if(strs.length>=3){const old=strs.find(t=>!standingOn(t));if(old)removeThread(old);else{tip(pi,'Больше трёх струн нельзя, а на всех кто-то стоит.',1.8);return;}}}
  if(mine){ // повторный бросок сматывает свою нить, если на ней никто не стоит и она не склеена с другом
    if(mine.child||mine.parent){tip(pi,'Твоя нить с нитью друга склеена. Это мостик — смотать нельзя.',1.8);SFX.miss();return;}
    {const on=HEROES.filter(q=>q.groundRef===mine);if(on.some(q=>q!==other(pi))){tip(pi,'На твоей нити кто-то стоит — смотать нельзя.',1.8);SFX.miss();return;}on.forEach(q=>teleportBehind(q,h));}
    removeThread(mine);floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Клубок смотан','#ffd76a');}
  if(p.yarnCd>0)return;
  const host=findHost(pi,h);let ang,sx,sz,y;
  if(host){ang=Math.atan2(host.dx,host.dz);y=host.y;sx=host.sx+host.dx*host.len;sz=host.sz+host.dz*host.len;}
  else{ang=h.face;const fwd=Math.atan2(-Math.sin(W.camYaw),-Math.cos(W.camYaw));let da=ang-fwd;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;
    // бросок почти вперёд выравнивается строго вперёд; брошенный в сторону колышка — летит к колышку
    const st=nearStake(h,ang),snap=W.aimSnap?W.aimSnap(h,ang):null;if(snap!==null)ang=snap;else if(st)ang=Math.atan2(st.x-h.pos.x,st.z-h.pos.z);else if(Math.abs(da)<0.55)ang=fwd;
    y=(h.grounded?h.pos.y:h.lastGroundY)+0.02;sx=h.pos.x+Math.sin(ang)*0.3;sz=h.pos.z+Math.cos(ang)*0.3;}
  const onStone=W.pawStones.find(s=>hd(s,h.pos)<1.1&&Math.abs(s.y-h.pos.y)<0.5);
  const t={owner:pi,hero:h,sx,sz,y,y2:y,dx:Math.sin(ang),dz:Math.cos(ang),len:0,max:15,grow:true,life:W.threadLife,glued:false,gluedWith:null,tied:null,parent:host||null,child:null,waiting:!!host,
    string:false,stake:null,thick:!!(onStone&&h.kind==='potap'),anchor:h.pos.clone(),sag:0,ret:false};
  if(onStone&&h.kind!=='potap')tip(pi,'С камня с медвежьей лапой толстую струну лишь Потап натянет.',2.4);
  t.mat=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.9});t.mesh=new THREE.Mesh(THREAD_GEO,t.mat);t.mesh.position.set(sx,y+0.08,sz);t.mesh.rotation.y=ang;
  t.pmat=MB(0xffd76a,{transparent:true,opacity:0.38,depthWrite:false});t.path=new THREE.Mesh(PATH_GEO,t.pmat);t.path.position.set(sx,y+0.03,sz);t.path.rotation.y=ang;
  t.ball=new THREE.Mesh(new THREE.SphereGeometry(0.17,10,8),t.mat);t.ball.castShadow=true;t.mesh.scale.z=0.001;t.path.scale.z=0.001;W.group.add(t.mesh,t.path,t.ball);
  if(t.thick){t.mesh.scale.x=t.mesh.scale.y=2.2;}
  if(host){host.child=t;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'К нити друга пристёгиваю!','#ffd76a');}
  W.threads.push(t);SFX.thread();p.yarnCd=0.4;}
function nearStake(h,ang){let best=null,bd=1e9;for(const s of W.stakes){const dx=s.x-h.pos.x,dz=s.z-h.pos.z,d=Math.hypot(dx,dz);if(d<1||d>15.5)continue;
  let da=Math.atan2(dx,dz)-ang;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;if(Math.abs(da)<0.5&&d<bd){bd=d;best=s;}}return best;}
function glue(a,b,at){if(a.gluedWith===b)return;a.glued=b.glued=true;a.gluedWith=b;b.gluedWith=a;a.life=b.life=Math.max(12,W.threadLife+2);
  const k=new THREE.Mesh(new THREE.TorusGeometry(0.25,0.08,8,16),M(COL.gold,{emissive:0xffc000,emissiveIntensity:1.2}));k.position.copy(at).add(new V3(0,0.15,0));W.group.add(k);a.knot=k;
  if(W.onGlue)W.onGlue(a,b);SFX.knot();G.stats.glue++;banner('Нити склеились!','#ffc93c',1.8,'Мостик держится, пока по нему идут-бегут');burst(at.clone().add(new V3(0,0.3,0)),COL.gold,16,4);}
function makeString(t,s){t.grow=false;t.string=true;t.stake=s;s.used=t;const dx=s.x-t.sx,dz=s.z-t.sz,l=Math.hypot(dx,dz)||1;t.dx=dx/l;t.dz=dz/l;t.len=l;t.y2=s.y;t.life=Infinity;
  t.mesh.rotation.y=t.path.rotation.y=Math.atan2(t.dx,t.dz);SFX.knot();burst(new V3(s.x,s.y,s.z),COL.gold,10,3);
  floatText(new V3(s.x,s.y+0.8,s.z),t.thick?'Толстая струна!':(Math.abs(t.y2-t.y)/l>0.14?'Струна вниз — съезжай, катись!':'Струна!'),'#ffd76a');
  if(W.onString)W.onString(t);}
function removeThread(t){if(t.child)t.child.parent=null;if(t.parent)t.parent.child=null;if(t.stake){t.stake.used=null;}
  if(t.knot)W.group.remove(t.knot);if(t.tied){t.tied.tied=null;if(t.tied.ring)t.tied.ring.visible=false;}
  for(const h of HEROES)if(h.groundRef===t){h.groundRef=null;h.grounded=false;h.hang=false;}
  W.threads.splice(W.threads.indexOf(t),1);W.group.remove(t.mesh,t.path);
  // клубок сам катится обратно и по дороге подхватывает орешки и искры
  t.ret=true;const from=t.ball.position.clone();W.returning.push({ball:t.ball,from,h:t.hero,t:0});}
// струна держится, пока бросивший стоит на месте (или оставлен Сменой); отпустил под кем-то — проседает в ряску
function releaseString(t,turned){if(t.sag||!W.threads.includes(t))return;const on=HEROES.filter(h=>h.groundRef===t&&h!==t.hero);
  if(!on.length){removeThread(t);return;}
  t.sag=0.001;t.sagOn=on;SFX.splash();floatText(new V3(t.sx+t.dx*t.len/2,t.y+0.6,t.sz+t.dz*t.len/2),'Плюх!','#9fd8a0');
  if(W.onSag)W.onSag(t,turned,on);}
// Тать-Паутинник: мост дороже героя — грызёт нить, на которой никто не стоит (толстую и склеенную не трогает). Встал на нить — отступает; пока грызёт — открыт
function tatTarget(e){let best=null,bd=6,bp=null;for(const t of W.threads){if(t.ret||t.thick||t.glued||t.gluedWith||t.sag||t.grow||t.waiting||standingOn(t))continue;
    const u=clamp((e.pos.x-t.sx)*t.dx+(e.pos.z-t.sz)*t.dz,0,t.len),px=t.sx+t.dx*u,pz=t.sz+t.dz*u,py=thY(t,u);if(Math.abs(py-e.pos.y)>1.6)continue;
    const d=Math.hypot(px-e.pos.x,pz-e.pos.z);if(d<bd){bd=d;best=t;bp=new V3(px,py,pz);}}
  return best?{t:best,p:bp,d:bd}:null;}
function tatFoe(x,z,o){const e=makeFoe('tat',x,z,Object.assign({leash:9},o||{}));e.chew=null;e.chewT=0;e.stuckT=0;e.prov=0;e.nearT=0;
  const stop=why=>{if(e.chew)e.chew.gnaw=0;e.chew=null;e.spMul=1;if(why)floatText(e.pos.clone().add(new V3(0,1.3,0)),why,'#ffd0a0');};
  const calm=()=>{e.cd=Math.max(e.cd,0.5);if(e.state==='ready')e.state='idle';};
  e.tick=(e,dt)=>{if(e.state==='spawn')return;
    // не воюет первым: дерётся, только если задели или прижали вплотную
    if(e.flashT>0)e.prov=8;else e.prov=Math.max(0,e.prov-dt);
    const hn=HEROES.some(h=>h.active&&!players[h.player].downed&&hd(h.pos,e.pos)<2.2&&Math.abs(h.pos.y-e.pos.y)<1.6);e.nearT=hn&&!e.chew?e.nearT+dt:0;if(e.nearT>1)e.prov=Math.max(e.prov,4);
    if(e.chew){const t=e.chew;
      if(!W.threads.includes(t)||t.ret||t.sag||t.glued){stop();return;}
      if(standingOn(t)){stop('Отступил!');e.prov=0;const dx=e.pos.x-e.chewP.x,dz=e.pos.z-e.chewP.z,d=Math.hypot(dx,dz)||1;mMove(e,dx/d,dz/d,9,0.12);return;}   // стоят на нити — отскочил
      if(e.state==='stagger'||e.state==='broken'){stop('Сорвался!');return;}
      e.spMul=0;t.gnaw=G.time;calm();if(e.state!=='broken')e.open=Math.max(e.open,0.2);   // занят нитью: не дерётся, спину подставил
      if(e.state==='idle')e.face=angDamp(e.face,Math.atan2(e.chewP.x-e.pos.x,e.chewP.z-e.pos.z),6,dt);
      e.chewT-=dt;if(e.chewT<=0){const p=e.chewP.clone();stop();removeThread(t);
        const r=W.returning.findIndex(q=>q.ball===t.ball);if(r>=0){W.group.remove(W.returning[r].ball);W.returning.splice(r,1);}   // клубок не вернулся — перегрыз
        SFX.rip();burst(p.clone().add(new V3(0,0.2,0)),0x8a6a4a,12,3);burst(p.clone().add(new V3(0,0.2,0)),COL.gold,8,2);floatText(p.clone().add(new V3(0,0.9,0)),'Перегрыз нить!','#ffb070');
        if(W.onTatCut)W.onTatCut(t,e);}
      return;}
    if(e.state!=='idle'){e.spMul=1;return;}
    const q=tatTarget(e);
    if(!q){e.stuckT=0;if(e.prov>0){e.spMul=1;return;}
      e.spMul=0;calm();const dh=hd(e.pos,e.home);if(dh>0.4)mMove(e,(e.home.x-e.pos.x)/dh,(e.home.z-e.pos.z)/dh,e.def.sp*0.8,dt);return;}   // нитей нет — домой, караулить
    e.spMul=0;calm();   // к герою не идёт — идёт к нити
    if(q.d>1.1){const px=e.pos.x,pz=e.pos.z;mMove(e,(q.p.x-e.pos.x)/q.d,(q.p.z-e.pos.z)/q.d,e.def.sp,dt);e.face=angDamp(e.face,Math.atan2(q.p.x-e.pos.x,q.p.z-e.pos.z),6,dt);
      e.stuckT=Math.hypot(e.pos.x-px,e.pos.z-pz)<dt*0.3?e.stuckT+dt:0;if(e.stuckT<0.4||q.d>2.4)return;}   // ближе не подойти (трясина) — грызёт с края
    e.chew=q.t;e.chewP=q.p;e.chewT=2.0;e.stuckT=0;SFX.thread();floatText(e.pos.clone().add(new V3(0,1.3,0)),'Грызёт нить!','#ffd0a0');};
  e.post=e=>{const g=!!e.chew;e.L.jaw.forEach((j,i)=>{j.rotation.y=(i?1:-1)*(0.1+Math.abs(Math.sin(G.time*(g?18:3)))*(g?0.6:0.15));});if(g&&e.state==='idle')e.body.rotation.x=0.35;};
  const od=e.onDeath;e.onDeath=x=>{if(e.chew)e.chew.gnaw=0;e.chew=null;if(od)od(x);};
  return e;}
function updateThreads(dt){
  for(const t of W.threads.slice()){
    if(t.sag){t.sag+=dt;const k=Math.min(1,t.sag/0.35),sy=W.sagY;t.y=lerp(t.y,sy,k*0.35);t.y2=lerp(t.y2,sy,k*0.35);
      for(const h of t.sagOn){h.hang=false;if(h.groundRef===t)h.pos.y=Math.min(h.pos.y,thY(t,(h.pos.x-t.sx)*t.dx+(h.pos.z-t.sz)*t.dz));}
      if(t.sag>1.1){for(const h of t.sagOn)toHummock(h);removeThread(t);continue;}}
    else if(t.waiting){const hs=t.parent;
      if(!hs||W.threads.indexOf(hs)<0){t.waiting=false;t.parent=null;}
      else{t.sx=hs.sx+hs.dx*hs.len;t.sz=hs.sz+hs.dz*hs.len;t.y=t.y2=hs.y;if(!hs.grow){t.waiting=false;glue(t,hs,new V3(t.sx,t.y,t.sz));}}}
    else if(t.grow){t.len=Math.min(t.max,t.len+32*dt);const tx=t.sx+t.dx*t.len,tz=t.sz+t.dz*t.len;
      for(const s of W.stakes){if(!t.grow)continue;if(Math.hypot(tx-s.x,tz-s.z)<1.0&&Math.hypot(s.x-t.sx,s.z-t.sz)>1.6&&s.y-t.y<4.5&&t.y-s.y<4.5){
        if(s.thickOnly&&!t.thick){t.grow=false;tip(t.owner,'Тонкая нить сюда не достанет. Нужна толстая струна —<br>Её Потап с камня с медвежьей лапой натянет сполна.',2.6);break;}makeString(t,s);}}
      if(t.grow&&W.threadStop){const r=W.threadStop(t,tx,tz);if(r==='kill'){removeThread(t);continue;}if(r)t.grow=false;}
      if(t.grow)for(const b of W.boxes){if(b.on&&b.maxy>t.y+0.35&&b.miny<t.y+1&&tx>b.minx&&tx<b.maxx&&tz>b.minz&&tz<b.maxz){t.grow=false;break;}}
      if(t.grow)for(const c of W.cyls){if(c.on&&!c.mover&&c.maxy>t.y+0.35&&c.miny<t.y+1&&Math.hypot(tx-c.x,tz-c.z)<c.r){t.grow=false;break;}}
      if(t.grow)for(const m of W.movers){if(Math.hypot(tx-m.pos.x,tz-m.pos.z)<m.trunkR+0.45&&!m.tied){t.grow=false;
        if(m.tieable&&m.tieable()){t.tied=m;m.tied=t;t.life=Infinity;m.ring.visible=true;SFX.knot();floatText(new V3(m.pos.x,2.2,m.pos.z),'Ель привязана!','#ffd76a');}
        else floatText(new V3(m.pos.x,2.2,m.pos.z),'Привязать можно лишь у колышка','#dddddd');break;}}
      for(const o of W.threads){if(!t.grow||o===t||o.owner===t.owner||o===t.parent||o===t.child||o.string)continue;const ends=[[o.sx,o.sz],[o.sx+o.dx*o.len,o.sz+o.dz*o.len]];
        for(const e of ends)if(Math.hypot(tx-e[0],tz-e[1])<1.6&&Math.abs(o.y-t.y)<0.7){glue(t,o,new V3(tx,t.y,tz));t.grow=false;break;}}
      if(t.len>=t.max)t.grow=false;}
    // клубок по дороге подхватывает орешки
    const bx=t.sx+t.dx*t.len,bz=t.sz+t.dz*t.len;pickByBall(bx,thY(t,t.len)+0.2,bz);
    // струна на колышке держится, пока её не смотают (RB). Толстую держит Потап с камня: ушёл, когда по ней идут, — проседает в ряску
    if(t.string&&!t.sag){if(t.thick){const hh=t.hero;const off=hd(hh.pos,t.anchor)>0.9||Math.abs(hh.pos.y-t.anchor.y)>0.7||players[hh.player].downed||hh.cling;
      if(off&&HEROES.some(q=>q!==hh&&q.groundRef===t))releaseString(t,false);}}
    else if(!t.string){const occupied=standingOn(t)||standingOn(t.gluedWith)||standingOn(t.parent)||standingOn(t.child);t.life-=dt;
      if(t.life<=0&&!occupied){removeThread(t);continue;}}
    const ang=Math.atan2(t.dx,t.dz),L=t.string?Math.hypot(t.len,t.y2-t.y):t.len;
    t.mesh.position.set(t.sx,t.y+0.08,t.sz);t.path.position.set(t.sx,t.y+0.03,t.sz);t.mesh.rotation.set(t.string?-Math.atan2(t.y2-t.y,t.len):0,ang,0,'YXZ');t.path.visible=!t.string;
    t.mesh.scale.z=Math.max(0.001,L);t.path.scale.z=Math.max(0.001,t.len);t.path.scale.x=t.glued?1.7:1.0;t.ball.position.set(bx,thY(t,t.len)+0.17,bz);
    if(t.gnaw&&G.time-t.gnaw<0.15){const on=Math.sin(G.time*24)>0;t.mat.emissive.setHex(on?0xffffff:0xffb000);t.mat.emissiveIntensity=on?1.9:0.2;t.pmat.opacity=on?0.5:0.12;}   // Паутинник грызёт — мигает белым
    else{if(t.gnaw){t.gnaw=0;t.mat.emissive.setHex(0xffb000);}
    if(t.string){t.mat.emissiveIntensity=W.blink?(Math.sin(G.time*20)>0?1.7:0.1):0.9+0.3*Math.sin(G.time*6);}
    else if(t.life<3){const on=Math.sin(G.time*14)>0;t.mat.emissiveIntensity=on?1.3:0.1;t.pmat.opacity=on?0.42:0.1;}else{t.mat.emissiveIntensity=0.9;t.pmat.opacity=0.38;}}}
  for(let i=W.returning.length-1;i>=0;i--){const r=W.returning[i];r.t+=dt/0.55;const to=r.h.pos.clone().add(new V3(0,0.4,0));r.ball.position.lerpVectors(r.from,to,Math.min(1,r.t));r.ball.position.y+=Math.sin(Math.min(1,r.t)*Math.PI)*0.8;
    pickByBall(r.ball.position.x,r.ball.position.y,r.ball.position.z);if(r.t>=1){W.group.remove(r.ball);W.returning.splice(i,1);}}
  // паутинка: две струны крест-накрест — упругий батут в перекрестье
  W.webs.length=0;const ss=W.threads.filter(t=>t.string&&!t.sag);
  for(let i=0;i<ss.length;i++)for(let j=i+1;j<ss.length;j++){const a=ss[i],b=ss[j],den=a.dx*b.dz-a.dz*b.dx;if(Math.abs(den)<0.2)continue;
    const wx=b.sx-a.sx,wz=b.sz-a.sz,ua=(wx*b.dz-wz*b.dx)/den,ub=(wx*a.dz-wz*a.dx)/den;if(ua<0.3||ua>a.len-0.3||ub<0.3||ub>b.len-0.3)continue;
    const ya=thY(a,ua),yb=thY(b,ub);if(Math.abs(ya-yb)<0.8)W.webs.push({x:a.sx+a.dx*ua,y:Math.max(ya,yb),z:a.sz+a.dz*ua});}
  if(!W.webMeshes)W.webMeshes=[];while(W.webMeshes.length<W.webs.length){const g=new THREE.Group();const m=MB(0xfff2b0,{transparent:true,opacity:0.85});
    for(let k=0;k<4;k++){const r=new THREE.Mesh(new THREE.TorusGeometry(0.2+k*0.17,0.025,4,24),m);r.rotation.x=Math.PI/2;g.add(r);}W.group.add(g);W.webMeshes.push(g);}
  W.webMeshes.forEach((g,i)=>{const w=W.webs[i];g.visible=!!w;if(w){g.position.set(w.x,w.y+0.08,w.z);g.rotation.y+=dt;g.scale.setScalar(1+0.08*Math.sin(G.time*7));}});
  if(!W.glueHints)W.glueHints=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.TorusGeometry(0.55,0.08,8,24),MB(COL.gold,{transparent:true,opacity:0.85}));m.rotation.x=Math.PI/2;m.visible=false;W.group.add(m);return m;});
  for(const pi of[0,1]){const m=W.glueHints[pi],ok=canContinue(pi);m.visible=ok;
    if(ok){const hs=findHost(pi,active(pi));m.position.set(hs.sx+hs.dx*hs.len,hs.y+0.14,hs.sz+hs.dz*hs.len);m.scale.setScalar(1+0.25*Math.sin(G.time*8+pi));m.material.color.setHex(PCOL[pi]);}}}
function pickByBall(x,y,z){for(const it of W.items){if(it.taken||it.locked||it.kind!=='nut'||(it.owl&&W.owlT<=0))continue;if(Math.hypot(it.pos.x-x,it.pos.z-z)<1.1&&Math.abs(it.pos.y-y)<1.6)takeItem(it,null);}
  for(const s of W.sparks){if(s.m.position.distanceTo(new V3(x,y,z))<1.2){s.free=0;s.t=0.36;}}}
// упал в ряску со струны — сам выбирается на ближайшую кочку (без колокольчика и без потери лепестков)
function toHummock(h){let best=null,bd=1e9;for(const k of W.hummocks){const d=hd(k,h.pos);if(d<bd){bd=d;best=k;}}
  if(best){placeOnGround(h,best.x+rand(-0.4,0.4),best.z+rand(-0.4,0.4),best.y+0.5);burst(h.pos.clone().add(new V3(0,0.4,0)),0x4a7a4a,10,3);}}
