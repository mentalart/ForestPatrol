//@@
// релиз: детские настройки (late_74/75/79b — Ёжик/Лёгкий путь, подсказки дольше, стрелка над героем, красный знак, чтение задач) работают в прологе и во
// всех мирах 1–5, а не только в мире 1 (docs/29_full_audit.md, 2.1; FIN.kids.worlds). Лукоморье, эпилог и Застава — как прежде.
// На каждом уровне: W.kids, W.tipMul ≥ 2,5, окна боя Лёгкого пути (замах 0,9 с, отбив 0,40, Пробой 9 с — на Богатырском прежние) и стрелка над активным героем;
// на уровнях без детских настроек — стандартные окна и без стрелки (настройки возвращаются после выхода из мира).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.startFrom(ZC.LV('luko'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(10);
window.BAD=[];window.RES=[];window.K1=ZC.FIN.kids;
window.look=id=>{ZC.loadLevel(ZC.LV(id));for(let k=0;k<8;k++){ZC.tick(30);U.nocine();}ZC.tick(20);const W=ZC.W,T=K1.timing(),p=ZC.players[0],h=p.heroes[p.act],arrow=h.g.children.find(c=>c.userData&&c.userData.kidsArrow);
  return {kids:!!W.kids,tip:W.tipMul||1,lead:T.easy.lead,parry:T.easy.parry,broken:T.easy.broken,midBroken:T.mid.broken,arrow:!!(arrow&&arrow.visible),cine:!!ZC.G.cine,state:ZC.G.state,cling:!!h.cling,hid:!!h.hidden,vis:h.g.visible,kind:h.kind};};
window.KIDS_LV=['p','1-1','1-3','2-1','2-4','3-1','3-3','4-1','4-3','5-1','5-3','2-B','3-B','4-B','5-B2'];window.PLAIN_LV=['luko','epi','z-i'];
'ok'
//@@
const r=[];for(const id of KIDS_LV){const o=look(id);r.push(id+(o.kids?'✓':'✗'));
  if(!o.kids)BAD.push(id+': детские настройки не включены');
  if(!(o.tip>=2.5))BAD.push(id+': подсказки не дольше (tipMul '+o.tip+')');
  if(o.lead!==0.9||o.parry!==0.4||o.broken!==9||o.midBroken!==5)BAD.push(id+': окна боя Лёгкого пути '+o.lead+'/'+o.parry+'/'+o.broken+'/'+o.midBroken+' (нужно 0,9/0,4/9/5)');
  if(!o.arrow)BAD.push(id+': нет стрелки над активным героем ('+JSON.stringify({cine:o.cine,state:o.state,cling:o.cling,hid:o.hid,vis:o.vis,kind:o.kind})+')');}
RES.push('детские: '+r.join(' '));RES.join(' · ')
//@@
const r=[];for(const id of PLAIN_LV){const o=look(id);r.push(id+(o.kids?'✓':'✗'));
  if(o.kids)BAD.push(id+': детские настройки включены там, где их нет');
  if(o.lead===0.9||o.broken===9)BAD.push(id+': окна Лёгкого пути остались от прошлого уровня: '+o.lead+'/'+o.broken);
  if(o.arrow)BAD.push(id+': стрелка осталась');}
RES.push('обычные: '+r.join(' '));
if(window._errs.length)BAD.push('ошибки консоли: '+window._errs.slice(0,2).join(' | '));
if(BAD.length)throw new Error('FAIL tfin_kidsw: '+BAD.join(' ; ')+' · '+RES.join(' · '));
'tfin_kidsw ok · '+RES.join(' · ')
