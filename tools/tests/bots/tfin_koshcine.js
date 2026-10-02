//@@
// релиз final06: 5-Б2 «Златая цепь», правки по отзыву 2 — все ролики уровня целиком (вступление, переходы между этапами, три Сказа,
// подъёмник, финал у наковальни, «Цепь»). Бот проигрывает каждый ролик без пропуска, доходит до середины каждого шота (кадр-образец каждого ролика — kc_<ролик>.png) и меряет
// по живой позе камеры: статичных шотов нет; в каждом ролике не меньше трёх крупностей и двух видов движения камеры; говорящий
// в кадре и лицом к камере; ролики доходят до конца без ошибок, уровень завершается эпилогом.
window.K5=ZC.FIN.k5;window.CN=ZC.FIN.cine;window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));
{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.hideUI=()=>{for(const id of['banner','bubs','floats','subs','subsb','tip0','tip1','obj0','obj1','level','skip','bossbar'])if(document.getElementById(id))document.getElementById(id).style.visibility='hidden';};
window.LOG=[];window.CUR=null;
CN.on('start',d=>{if(d.def&&d.def.k5){CUR={cd:d.cd,def:d.def,name:ZC.W.flags.stage,sh:[],spk:{},next:0};LOG.push(CUR);}});
// крупность — по высоте кадра у точки взгляда; движение — по смещению камеры за шот
window.V=THREE.Vector3;window.fh=p=>2*p.pos.distanceTo(p.look)*Math.tan(p.fov*Math.PI/360);
window.smp=()=>{const c=CUR;if(!c||ZC.G.cine!==c.cd.S)return;const cd=c.cd,P=cd.pose,i=Math.max(0,cd.si),t=cd.S.t;if(cd.blend)return;
  let s=c.sh[i];if(!s){s=c.sh[i]={n:0,p0:P.pos.clone(),l0:P.look.clone(),f0:P.fov,fh:[],path:0,lp:P.pos.clone(),ang:0,ang3:0,ld:new V().subVectors(P.look,P.pos).setY(0).normalize(),l3:new V().subVectors(P.look,P.pos).normalize()};}
  s.n++;s.path+=s.lp.distanceTo(P.pos);s.lp.copy(P.pos);s.p1=P.pos.clone();s.l1=P.look.clone();s.f1=P.fov;s.fh.push(fh(P));
  const ld=new V().subVectors(P.look,P.pos).setY(0).normalize();s.ang=Math.max(s.ang,Math.acos(Math.max(-1,Math.min(1,ld.dot(s.ld)))));s.ang3=Math.max(s.ang3,Math.acos(Math.max(-1,Math.min(1,new V().subVectors(P.look,P.pos).normalize().dot(s.l3)))));
  for(const q of c.def.says||[]){const who=q[2];if(!who||t<q[0]+0.25||t>q[0]+q[1]-0.1)continue;const L=CN.locate(who);const k=q[0]+' '+who;const o=c.spk[k]=c.spk[k]||{who,n:0,vis:0,face:0,fn:0};o.n++;
    if(!L)continue;const H=L.head();if(CN.dbg.onScreen(H,P).vis)o.vis++;let yaw=null;
    if(L.hero)yaw=L.obj.face;else if(who==='koschei')yaw=K5.KS.g.rotation.y;
    if(yaw!=null){o.fn++;const dc=new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize();if(Math.sin(yaw)*dc.x+Math.cos(yaw)*dc.z>0.17)o.face++;}}};
window.tk=n=>{for(let i=0;i<(n||1);i++){ZC.tick(1);smp();}};
// следующий шот текущего ролика; между роликами — выбор в Сказе и победа этапа
window.nx=()=>{for(let g=0;g<6000;g++){const S=ZC.G.cine;
    if(CUR&&S&&S===CUR.cd.S){const sh=CUR.cd.shots;if(CUR.next>=sh.length){tk(1);continue;}const k=CUR.next,s=sh[k],tm=s.t+s.len*0.55;
      for(let j=0;j<2400&&ZC.G.cine===S&&S.t<tm;j++)tk(1);CUR.next=k+1;hideUI();return CUR.name+' #'+k+' t='+S.t.toFixed(1)+(s.x&&s.x.tr?' '+s.x.tr:'');}
    if(S){ZC.skip();tk(3);continue;}
    if(ZC.W.levelId!=='5-B2')return 'done lvl='+ZC.W.levelId;
    if(ZC.G.ui==='skaz'){U.tap('Space');U.tap('KeyM');tk(5);continue;}
    if(K5.fight&&K5.st>=1){if(K5.st===1){const A0=ZC.players[0].heroes[ZC.players[0].act];for(const c of K5.candles)for(let i=0;i<6&&c.lit;i++)c.k5hit(c,A0);tk(2);if(!K5.fight)continue;}
      if(K5.st===5&&K5.forge)K5.forge.n=K5.forge.need;K5.stageWin(K5.st);tk(2);continue;}
    tk(1);}
  return 'TIMEOUT stage='+ZC.W.flags.stage;};
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;K5.auto=false;tk(2);['lvl='+ZC.W.levelId,'stage='+ZC.W.flags.stage,'cine='+!!ZC.G.cine,'k5='+!!CUR].join(' ')
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_intro.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_t1.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_skaz1.png
nx()
//@@
nx()
//@@ shot=kc_t2.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_skaz2.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_t2b.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_t3.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_t4.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_lift.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_needle.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@ shot=kc_chain.png
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
nx()
//@@
// дойти до эпилога и подвести итог по каждому ролику
for(let i=0;i<20000&&ZC.W.levelId==='5-B2';i++){if(ZC.G.ui==='skaz'){U.tap('Space');U.tap('KeyM');}tk(1);}
const R=[],bad=[];
for(const c of LOG){const sz=new Set(),mv=new Set(),seq=[];let stat=0;
  c.sh.forEach((s,i)=>{if(!s||s.n<3)return;const f=s.fh.slice().sort((a,b)=>a-b)[s.fh.length>>1];sz.add(f<2.8?'close':f<7?'medium':'wide');
    const d=new V().subVectors(s.p1,s.p0),fw=new V().subVectors(s.l0,s.p0).normalize(),al=d.dot(fw),vy=d.y,lat=Math.sqrt(Math.max(0,d.lengthSq()-al*al-vy*vy)),df=s.f1-s.f0;
    let m='static';const big=Math.max(Math.abs(al),Math.abs(vy),lat);
    if(s.ang3>=0.4&&s.ang3*4>d.length())m='pan';   // поворот или наклон камеры (кран вверх к небу, взгляд за падающей иглой)
    else if(big>=0.18){m=big===Math.abs(al)?(al>0?'push':'pull'):big===Math.abs(vy)?'crane':(s.ang>0.12?'orbit':'truck');}
    else if(Math.abs(df)>=1.5)m='zoom';else if(s.ang>0.05||s.l0.distanceTo(s.l1)>0.25)m='pan';
    if(m==='static'){stat++;bad.push(c.name+' #'+i+' статичный');}mv.add(m==='pull'?'push':m);seq.push(m);});
  mv.delete('static');if(sz.size<3)bad.push(c.name+': крупностей '+sz.size);if(mv.size<2)bad.push(c.name+': движений '+mv.size);
  const sp=Object.entries(c.spk).map(([k,o])=>{const v=o.n?o.vis/o.n:1,f=o.fn?o.face/o.fn:1;if(v<0.7||f<0.6)bad.push(c.name+' '+k+' вид '+v.toFixed(2)+' лицо '+f.toFixed(2));return o.who[0]+Math.round(v*100)+'/'+Math.round(f*100);});
  R.push(c.name+(c.def._ins?' (под голос +'+c.def._ins.reduce((n,q)=>n+q[1],0).toFixed(1)+' с, '+c.def.dur.toFixed(1)+' с)':'')+': шотов '+c.cd.shots.length+' крупности '+[...sz].join('+')+' движения '+[...mv].join('+')+' ['+seq.join(' ')+']'+' статичных '+stat+' | говорящие '+sp.join(' '));}
// озвучка: у каждой реплики персонажа есть запись, и запись укладывается в своё место (до следующей реплики)
const vx=[];for(const c of LOG){const ss=(c.def.says||[]).slice().sort((a,b)=>a[0]-b[0]);ss.forEach((q,i)=>{if(!q[2]||q[4])return;const e=ZC.FIN.vox.find(q[2],q[3]);
  if(!e){vx.push(c.name+' '+q[0]+' '+q[2]+': нет записи');return;}const nx=ss[i+1]?ss[i+1][0]:c.cd.def.dur,slot=nx-q[0];if(e.dur>slot+0.15)vx.push(c.name+' '+q[0]+' '+q[2]+': запись '+e.dur.toFixed(2)+' > места '+slot.toFixed(2));});}
{const e=ZC.FIN.vox.find('pelageya','А иные сказывают по-иному — что ж, пускай:<br>Две правды в сказке уживутся, так и знай!');if(!e)vx.push('skaz3 pelageya: нет записи');else if(e.dur>7.4)vx.push('skaz3 pelageya: запись '+e.dur.toFixed(2)+' > 7.4');}
bad.push(...vx);
const ok=bad.length===0&&ERR.length===0&&ZC.G.done['5-B2']&&LOG.length>=11;
R.concat(['роликов '+LOG.length,'lvl='+ZC.W.levelId,'errs='+ERR.length+(ERR.length?' '+ERR.slice(0,3).join(' | '):''),'замечания: '+(bad.join('; ')||'нет'),ok?'ok':'FAIL'])
