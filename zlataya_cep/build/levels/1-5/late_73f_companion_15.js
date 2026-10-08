/* ============================== РЕЛИЗ final06 · 1-5 «КИКИМОРИНА ПРЯЛКА»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// На каждом из трёх этажей овина (пол, галерея, чердак) игроки встают в свои кольца и бросают клубки в колышки: две струны крест-накрест дают паутинку-батут, прыжок на
// серединку подбрасывает на этаж выше. Бот за Игрока 2 делает это обоими героями по очереди: встаёт в кольцо, поворачивается к колышку, бросает клубок, ждёт струну друга,
// прыгает на серединку. Пелагея на галерее включает Совиный взор и рубит старую нить у крюка — тогда прялка струн не утянет. Нитяные мороки на полу и на чердаке — общий бой бота.
// Положения — из proto/levels/1-5.js: колышки и кольца по этажам [Игрок 1, Игрок 2], середины паутинок.
const KM15_S=[[[-5.2,-11.9],[-5.2,-20.1]],[[-9.6,-29.3],[-5.9,-29.3]],[[-6,-33.7],[1,-33.7]]];
const KM15_R=[[[-1.8,-20.2,0],[-1.8,-11.8,0]],[[-5.9,-25,3.4],[-9.6,-25,3.4]],[[1,-30.1,7],[-6,-30.1,7]]];
const KM15_W=[[-3.5,-16,0.26],[-7.75,-27.15,3.66],[-2.5,-31.9,7.26]];
const KM15_HOOK=[-6.9,-9.5];                                   // у крюка старой нити на галерее (мишень — в 1,4 м к востоку)
const KM15={w:null,t:0,hunt:0};
const km15=()=>{if(KM15.w!==W){KM15.w=W;KM15.t=0;KM15.hunt=0;}return KM15;};
const km15Tier=h=>h.pos.y>6.4?2:h.pos.y>2.9?1:0;
const km15Str=(pi,t)=>{const s=KM15_S[t][pi];return W.threads.some(q=>q.string&&!q.sag&&q.owner===pi&&q.stake&&Math.hypot(q.stake.x-s[0],q.stake.z-s[1])<0.3);};
const km15Web=t=>{const c=KM15_W[t];return W.webs.some(w=>Math.hypot(w.x-c[0],w.z-c[1])<1.5&&Math.abs(w.y-c[2])<0.8);};
CMP.route('1-5',[
  // нитяные мороки на полу: бой общий, этот шаг отправляет бота к тем, что стоят в стороне (пока они живы, этаж не пройден)
  {id:'foes',done:()=>{km15();if(!KM15.hunt)KM15.hunt=G.time;return (W.enemies.length>0&&!W.enemies.some(e=>e.alive))||G.time-KM15.hunt>75||HEROES.some(q=>q.pos.y>2.9);},run:h=>{
    const al=W.enemies.filter(e=>e.alive&&e.state!=='spawn'&&e.state!=='dying'&&(!e.g||e.g.visible!==false)).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos));
    if(W.flags.stage!=='play'||!al.length)return 'follow';cmpGoto(h,al[0].pos.x,al[0].pos.z,3);}},
  // подъём по паутинкам: все герои Игрока 2 на чердак
  {id:'climb',done:()=>HERO.pelageya.pos.y>6.4&&HERO.yosha.pos.y>6.4,run:h=>{km15();const F=W.flags;if(F.stage!=='play')return 'follow';
    const T=k=>km15Tier(HERO[k]),lo=Math.min(T('pelageya'),T('yosha')),cand=['pelageya','yosha'].filter(k=>T(k)===lo);
    // Пелагея на галерее сначала рубит старую нить; иначе — самый нижний из героев, начиная с ведомого
    const cut=T('pelageya')===1&&!F.cut,k=cut?'pelageya':(cand.includes(h.kind)?h.kind:cand[0]);if(!cmpWant(k))return;
    const ti=km15Tier(h),tgt=KM15_R[Math.min(ti,2)][1];
    if(cut){                                                                   // Совиный взор, потом удар по мишени у крюка
      if(Math.hypot(h.pos.x-KM15_HOOK[0],h.pos.z-KM15_HOOK[1])>0.5){cmpGoto(h,KM15_HOOK[0],KM15_HOOK[1],0.3);return;}
      h.face=Math.PI/2;if(W.owlT<=0){if(!(KM15.t>G.time-1.2)){KM15.t=G.time;cmpTap('skill');}}else if(!(KM15.t>G.time-0.5)){KM15.t=G.time;cmpTap('attack');}return;}
    if(ti>=2)return;
    if(km15Web(ti)){const c=KM15_W[ti];if(Math.hypot(h.pos.x-c[0],h.pos.z-c[1])>0.5){cmpGoto(h,c[0],c[1],0.3);return;}if(h.grounded)cmpTap('jump');return;}   // обе струны лежат — на серединку и прыжок
    const st=KM15_S[ti][1];
    if(Math.hypot(h.pos.x-tgt[0],h.pos.z-tgt[1])>0.45||Math.abs(h.pos.y-tgt[2])>0.8){cmpGoto(h,tgt[0],tgt[1],0.25);return;}                       // в своё кольцо
    if(!km15Str(1,ti)){h.face=Math.atan2(st[0]-tgt[0],st[1]-tgt[1]);if(!(KM15.t>G.time-1)){KM15.t=G.time;cmpTap('item');}}}},                     // клубок в колышек; ждёт струну друга
  // чердак: бой с пятью нитяными мороками — общий бой бота; потом ролик
  {id:'attic',done:()=>!!W.flags.out,run:()=>'follow'},
]);
