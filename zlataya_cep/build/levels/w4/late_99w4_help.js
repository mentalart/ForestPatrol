/* ============================== МИР 4 · ПОМОЩЬ ПО ПРОМАХАМ (docs/39, УР.2) ============================== */
// Промах — неудачное нажатие (SFX.miss: «рано», «остыло», «качнуло»…) или падение в огонь. Помощь растёт по ступеням:
//   1 — короткая подсказка с мигающей кнопкой · 2 — подсказка и стрелка над целью · 3 — короткий повтор урока (через 8 с герой показывает сам).
// Удачное действие (нет промахов 20 с) сбрасывает ступень. Подсказка — по месту: что сейчас главное в уровне (W4H.ctx).
const W4H={n:0,lvl:0,last:-99,shown:-99,arrow:null,log:[]};FIN.w4h=W4H;
{const kb=(pi,a)=>K(pi,a);
// что подсказать сейчас: {text(pi), tgt() — точка для стрелки, lesson — id урока (late_99w4_lessons.js)}
W4H.ctx=function(){const F=W.flags,id=W.levelId;
  if(id==='4-1'){if(F.stage==='forge')return {text:pi=>pi?'Прыгай на рычаг мехов '+kb(1,'jump')+'.':'Бей '+kb(0,'attack')+', когда жёлтый кружок мал.',tgt:()=>new V3(0,1.6,-14),lesson:'forge41'};
    if(F.stage==='r4')return {text:pi=>'«БИТЬ» — '+kb(pi,'attack')+' на раз-два-три, «ДЕРЖАТЬ» — '+kb(pi,'item')+' на четыре.',tgt:()=>new V3(0,1.8,-50.8)};
    return {text:pi=>'Остыло — положи в горн и возьми снова '+kb(pi,'item')+'.',tgt:()=>new V3(-5.2,1.6,-15.6)};}
  if(id==='4-2'){if(F.stage==='b')return {text:pi=>'Корку из заводи — клещами '+kb(pi,'item')+' на струю.',tgt:()=>new V3(5,0.6,-9.5),lesson:'carry42'};
    return {text:pi=>'Корка тает: дождись новой — и прыгай '+kb(pi,'jump')+' сразу.',tgt:()=>HERO.yosha.pos.clone().add(new V3(0,2,0)),lesson:'crust42'};}
  if(id==='4-3')return {text:pi=>'Жми '+kb(pi,'skill')+' на «ух-нем», после «эй».',tgt:()=>HERO.potap.pos.clone().add(new V3(0,2.6,0)),lesson:'song43'};
  if(id==='4-4')return {text:pi=>'Лава идёт по борозде — обходи её или жди, пока стечёт.',tgt:()=>W.PLOW?W.PLOW.g.position.clone().add(new V3(0,2,0)):null,lesson:'plow44'};
  if(id==='4-5'&&F.stage==='hold')return {text:pi=>pi?'Стык — Йоша '+kb(1,'skill')+', пролёт — Пелагея на плиту.':'Шарик — в середину. Синее — '+kb(0,'guard')+', красное — '+kb(0,'roll')+'.',tgt:()=>HERO.potap.pos.clone().add(new V3(0,3.4,0)),lesson:'hold45'};
  if(id==='4-5')return {text:pi=>'Доску клещами '+kb(pi,'item')+' — на край моста.',tgt:null};
  return null;};
function arrowAt(p){if(W4H.arrow&&W4H.arrow.parent)W4H.arrow.parent.remove(W4H.arrow);if(!p)return;const g=new THREE.Group(),mt=MB(0xffd76a,{transparent:true,opacity:0.95,depthTest:false,fog:false});
  const c=new THREE.Mesh(new THREE.ConeGeometry(0.4,0.8,4),mt);c.rotation.x=Math.PI;c.renderOrder=10;g.add(c);g.position.copy(p);g.userData.y0=p.y;g.userData.t=4.5;W.group.add(g);W4H.arrow=g;}
W4H.miss=function(why){if(!W||W.world!==4||W.levelId==='4-B'||G.cine||G.state!=='play')return;const now=G.time;
  if(now-W4H.last>20)W4H.lvl=0;W4H.last=now;W4H.n++;if(now-W4H.shown<3)return;   // не чаще раза в 3 с
  const c=W4H.ctx();if(!c)return;W4H.lvl=Math.min(3,W4H.lvl+1);W4H.shown=now;W4H.log.push(W.levelId+':'+why+':'+W4H.lvl);
  const L=FIN.lesson,w4l=FIN.w4l;
  if(W4H.lvl>=3&&c.lesson&&w4l&&!L.on&&(!G.manual||G.flags.w4lessons)){W4H.lvl=1;w4l.run(c.lesson,true);return;}
  for(const pi of[0,1]){const t=c.text(pi);tip(pi,'<span class="w4h-'+W4H.lvl+'">'+(W4H.lvl>=2?'Ещё разок! ':'')+t+'</span>',W4H.lvl>=2?4:2.6);}
  if(W4H.lvl>=2&&c.tgt)arrowAt(c.tgt());};
// источники промахов
{const _m=SFX.miss;SFX.miss=function(){const r=_m.apply(this,arguments);try{W4H.miss('miss');}catch(e){}return r;};}
{const _of=onFall;onFall=function(h){const r=_of.apply(this,arguments);try{if(W&&W.world===4&&h&&h.active)W4H.miss('fall');}catch(e){}return r;};}
// стрелка покачивается и гаснет
{const _st=step;step=function(dt){_st(dt);const a=W4H.arrow;if(!a)return;a.userData.t-=dt;a.position.y=a.userData.y0+0.3*Math.abs(Math.sin(G.time*4));a.rotation.y+=dt*2.5;
  if(a.userData.t<=0||!a.parent||G.cine){if(a.parent)a.parent.remove(a);W4H.arrow=null;}};}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);W4H.lvl=0;W4H.last=-99;W4H.shown=-99;W4H.arrow=null;};}
}
