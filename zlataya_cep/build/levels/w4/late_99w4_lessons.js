/* ============================== МИР 4 · УРОКИ НОВЫХ МЕХАНИК (общий шаблон FIN.lesson, как у 4-Б) ============================== */
// Пять коротких уроков — по одной механике, каждый перед тем, как она понадобится (docs/39, УР.1):
//   4-1 ковка (мехи → молот → закалка) · 4-2 корка и перенос корки клещами · 4-3 «ух-нем» · 4-4 плуг (ошибку стирает Йоша или засыпает Потап) · 4-5 «держать мост».
// Карточка: значок, одна фраза, кнопки; шаг ждёт кнопку, через 8 с показывает сам. Читает Пелагея (реплики 4-1_031… 4-5_023, голос Silero).
// Повтор — «Показать урок ещё раз» в паузе (L.regLevel). Боты (G.manual) уроков не видят, пока не включат G.flags.w4lessons.
const W4L={done:{},runs:0};FIN.w4l=W4L;
{const L=FIN.lesson;
const on=()=>!G.manual||!!G.flags.w4lessons;
// карточка урока — посередине экрана: взгляд камеры ниже цели на 1,4 м, чтобы цель была в верхней трети кадра, над карточкой
const S=(dur,p,l,card,o)=>Object.assign({dur,p,l:[l[0],l[1]-1.4,l[2]],card},o||{});
const hop=h=>{if(h&&h.grounded){h.vel.y=h.d.jump*0.8;h.grounded=false;}};
const pop=(h,t,col)=>{if(h)floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),t,col||'#ffd76a');};
const ap=()=>active(0),bp=()=>active(1);
// уроки: id → {lv, can() — пора ли, steps() — шаги}
const LS={
  forge41:{lv:'4-1',can:()=>W.flags.stage==='forge',steps:()=>[
    S(6,[-1.8,2.8,-7.6],[-5,0.6,-14.2],{tag:'Урок · кузня',title:'Мехи',icon:'fire',text:'Пелагея прыгает на рычаг мехов — горн жарче.',keys:[{pi:1,a:'jump'}]},
      {wait:{who:1,a:'jump'},voice:'4-1_031',done:(s,auto)=>{hop(HERO.pelageya);pop(HERO.pelageya,'Пых!','#ffb070');}}),
    S(6,[2.2,2.6,-8.4],[0,1,-14],{tag:'Урок · кузня',title:'Молот',icon:'hit',text:'Жёлтый кружок сжался — бей молотом!',keys:[{pi:0,a:'attack'}]},
      {wait:{who:0,a:'attack'},voice:'4-1_032',done:()=>{HERO.proshka.atkT=0.3;SFX.hammer?SFX.hammer():SFX.clink();burst(new V3(0,1.3,-14),0xffe060,12,3);}}),
    S(6,[7,2.6,-9.2],[4.6,0.6,-14.2],{tag:'Урок · кузня',title:'Закалка',icon:'drop',text:'Готовые клещи — в корыто. Йоша поливает.',keys:[{pi:1,a:'skill'}]},
      {wait:{who:1,a:'skill'},voice:'4-1_033',done:()=>{burst(new V3(4.6,0.8,-14.2),0xe8f4ff,14,3);SFX.water();}})]},
  crust42:{lv:'4-2',can:()=>W.flags.stage==='a',steps:()=>[
    S(6,[2.4,3,3.6],[0,-0.4,-3],{tag:'Урок · река',title:'Корка',icon:'drop',text:'Живая вода на лаву — встанет корка.',keys:[{pi:1,a:'skill'}]},
      {wait:{who:1,a:'skill'},voice:'4-2_052',done:()=>{burst(new V3(0,-0.2,-3),0xe8f4ff,14,3);SFX.water();}}),
    S(4,[2.4,3,3.6],[0,-0.4,-3],{tag:'Урок · река',title:'Корка тает',icon:'clock',text:'Корка держит недолго: мигает — прыгай дальше.'},{voice:'4-2_053'})]},
  carry42:{lv:'4-2',can:()=>W.flags.stage==='b'&&[0,1].some(pi=>active(pi).pos.z<-8.4),steps:()=>[
    S(6,[7.6,3.4,-6.4],[5,-0.4,-9.5],{tag:'Урок · струя',title:'Корку — клещами',icon:'tongs',text:'Струя бурлит. Корку из заводи неси клещами.',keys:[{pi:0,a:'item'}]},
      {wait:{who:0,a:'item'},voice:'4-2_054'}),
    S(5,[2,4,-9],[0,-0.4,-15],{tag:'Урок · струя',title:'Заднюю — вперёд',icon:'go',text:'Стоишь на корке — заднюю перекладывай вперёд.',keys:[{pi:0,a:'item'}]},
      {wait:{who:0,a:'item'},voice:'4-2_055'})]},
  song43:{lv:'4-3',can:()=>W.flags.stage==='pull',steps:()=>{const R=W.RINGS||[],r0=R[0]||{x:-2,z:-2},c=new V3(r0.x+1.5,1,r0.z-1.5);return [
    S(4,[c.x-5,3.2,c.z+6],[c.x,1.2,c.z],{tag:'Урок · лямка',title:'Песня',icon:'n123',text:'Потап запевает: «Эй…» — слушаем.'},{voice:'4-3_012',enter:()=>{tone(mf(45),0.5,'triangle',0.16);}}),
    S(7,[c.x-5,3.2,c.z+6],[c.x,1.2,c.z],{tag:'Урок · лямка',title:'«Ух-нем!»',icon:'hit',text:'На «ух-нем» — жмите вместе!',keys:[{pi:0,a:'skill'},{pi:1,a:'skill'}]},
      {wait:{who:'both',a:'skill',sync:1.2},voice:'4-3_013',enter:()=>{tone(mf(50),0.35,'triangle',0.18);tone(mf(50),0.45,'triangle',0.18,null,0.45);},
       done:()=>{for(const h of HEROES)h.atkT=0.3;pop(HERO.potap,'Ух-нем!');}})];}},
  plow44:{lv:'4-4',can:()=>W.flags.stage==='A',steps:()=>{const P=W.PLOW?W.PLOW.g.position:new V3(-3,0,-1);return [
    S(6,[P.x+3.6,3,P.z+4.6],[P.x,0.8,P.z],{tag:'Урок · плуг',title:'Лемех',icon:'tongs',text:'Лемех горячий — бери клещами. Плуг пойдёт за тобой.',keys:[{pi:0,a:'item'}]},
      {wait:{who:0,a:'item'},voice:'4-4_016'}),
    S(5,[P.x+2,6,P.z+6],[P.x,0,P.z-4],{tag:'Урок · плуг',title:'Борозда',icon:'fire',text:'Лава течёт по борозде. Куда пашешь — туда и течёт.'},{voice:'4-4_017'}),
    S(5,[P.x+2,6,P.z+6],[P.x,0,P.z-4],{tag:'Урок · плуг',title:'Ошибся?',icon:'drop',text:'Не туда — Йоша сотрёт борозду мёртвой водой.',keys:[{pi:1,a:'skill'}]},
      {wait:{who:1,a:'skill'},voice:'4-4_018'}),
    S(5,[P.x+2,6,P.z+6],[P.x,0,P.z-4],{tag:'Урок · плуг',title:'Или лапой',icon:'hit',text:'Или Потап засыплет её лапой.',keys:[{pi:0,a:'skill'}]},
      {wait:{who:0,a:'skill'},voice:'4-4_021',done:()=>{const h=HERO.potap;h.atkT=0.3;pop(h,'Лапой — и ровно!','#e8c8a0');}})];}},
  hold45:{lv:'4-5',can:()=>W.flags.stage==='hold',steps:()=>{const q=HERO.potap.pos,cp=[q.x+3.4,q.y+2.4,q.z+6.4],cl=[q.x,q.y+1.4,q.z];return [
    S(6,cp,cl,{tag:'Урок · мост',title:'Качание',icon:'go',text:'Шарик над Потапом — держи его в середине стиком.',keys:[{pi:0,a:'right'}]},
      {wait:{who:0,a:'right'},voice:'4-5_021'}),
    S(5,cp,cl,{tag:'Урок · мост',title:'Синее — щит',icon:'blue',text:'Синяя капля летит — щит!',keys:[{pi:0,a:'guard'}]},
      {wait:{who:0,a:'guard'},voice:'4-5_022',done:()=>{HERO.potap.guard=true;later(0.6,()=>{HERO.potap.guard=false;});pop(HERO.potap,'Широкий щит!','#cfe8ff');}}),
    S(5,cp,cl,{tag:'Урок · мост',title:'Красное — упрись',icon:'red',text:'Красная дрожь — упрись!',keys:[{pi:0,a:'roll'}]},
      {wait:{who:0,a:'roll'},voice:'4-5_023',done:()=>{pop(HERO.potap,'Упёрся!','#ffe36b');}})];}}};
W4L.LS=LS;
// запуск: один раз на уровень и урок (G.flags.w4l), повтор — из паузы
W4L.run=(id,again)=>{const d=LS[id];if(!d)return false;W4L.runs++;W4L.cur=id;L.mark('w4l',id);L.run(d.steps(),{end:()=>{W4L.cur=null;W4L.done[id]=true;}});
  L.regLevel(d.lv,()=>W4L.run(id,true),()=>!G.cine&&W.levelId===d.lv&&d.can());return true;};
// урок — только после секунды спокойной игры (вступительный ролик уровня часто стартует с задержкой) и не поверх ролика;
// прерванный чужим роликом урок не держит L.on
{const _st=step;step=function(dt){_st(dt);
  if(W4L.cur&&!G.cine&&L.on){L.on=false;L.show(null);W4L.cur=null;}
  if(!W||W!==W4L.w){W4L.w=W;W4L.calm=0;}
  W4L.calm=G.cine||G.trans?0:W4L.calm+dt;
  if(G.state!=='play'||G.cine||G.trans||W.world!==4||L.on||!on()||W4L.calm<1)return;
  for(const id in LS){const d=LS[id];if(d.lv!==W.levelId||L.seen('w4l',id))continue;let ok=false;try{ok=d.can();}catch(e){}
    if(ok){W4L.run(id);break;}}};}
}
