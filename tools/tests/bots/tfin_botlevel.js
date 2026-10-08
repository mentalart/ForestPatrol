//@@
// релиз final06: опыт бота-напарника (late_73_companion): три уровня «Растеряша» / «Смекалка» (по умолчанию, прежний бот) / «Бывалый»;
// переключатель — пункт «Напарник в бою» в паузе (под «Режим», серый, пока играете не с ИИ напарником) и в Настройках; запоминается в настройках;
// режим в меню называется «с ИИ напарником»; слабый бот в бою заметно дольше разбирается с мороком, сильный — быстрее и без потерь.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.CO=ZC.FIN.co;window.P=ZC.players;CO.routes={};window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.me=()=>U.act(0);window.bot=()=>U.act(1);
window.lvl=()=>{ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(90);};
window.stored=()=>{try{return JSON.parse(localStorage.getItem('zlatayaCep.settings.v1')||'{}');}catch(e){return {};}};
// уровни: названия, значения по умолчанию, круг, запоминание
const names=CO.levels.map(l=>l.name).join('|');chk(names==='Растеряша|Смекалка|Бывалый',names);
chk(CO.level()===1&&CO.skill===0.85,'по умолчанию Смекалка с прежним умением: '+CO.level()+'/'+CO.skill);
chk(CO.levels[1].react===0&&CO.levels[1].miss===0&&CO.levels[1].gap===0,'Смекалка — без задержек, как прежний бот');
CO.cycleLevel(1);chk(CO.level()===2&&CO.skill===CO.levels[2].skill,'вправо: Бывалый '+CO.level());
CO.cycleLevel(1);chk(CO.level()===0&&CO.skill===CO.levels[0].skill,'ещё вправо — по кругу к Растеряше '+CO.level());
CO.cycleLevel(-1);chk(CO.level()===2,'влево — назад к Бывалому '+CO.level());
CO.setLevel(0);chk(stored().botLevel===0,'уровень запомнился в настройках: '+JSON.stringify(stored().botLevel));
CO.setLevel(1);chk(stored().botLevel===1&&CO.skill===0.85,'вернули Смекалку');
chk(CO.levels[0].skill<CO.levels[1].skill&&CO.levels[1].skill<CO.levels[2].skill,'умение растёт по уровням');
// кость отбива: доля «отбил в окне» растёт с уровнем
const share=L=>{CO.setLevel(L);let n=0;for(let i=0;i<4000;i++)if(CO.dice()==='parry')n++;return n/4000;};
const sh=[0,1,2].map(share);CO.setLevel(1);
chk(Math.abs(sh[0]-0.55)<0.05&&Math.abs(sh[1]-0.85)<0.04&&Math.abs(sh[2]-0.97)<0.03,'доли отбива по уровням: '+sh.map(v=>v.toFixed(2)).join(' '));
// режим называется «с ИИ напарником»
CO.cycle(1);CO.cycle(1);chk(CO.on&&CO.label()==='с ИИ напарником','название режима: '+CO.label());CO.set(false);ZC.setSolo(false);
if(BAD.length)throw new Error(BAD.join(' · '));
['levels ok '+names,'dice '+sh.map(v=>v.toFixed(2)).join('/'),'errs='+_errs.length]
//@@
// меню: главное («Режим» называет уровень), пауза и настройки (пункт «Напарник в бою»)
const F=ZC.FIN;F.kids.force=true;const r=[];
F.openTitle(false);const mode=F.menu.items.find(i=>i.label==='Режим');
CO.set(true);CO.setLevel(0);chk(/«Растеряша»/.test(mode.sub()),'в главном меню — имя уровня: '+mode.sub());
CO.setLevel(2);chk(/«Бывалый»/.test(mode.sub())&&/ИИ напарник/.test(mode.sub()),'имя обновилось: '+mode.sub());
chk(mode.val()==='с ИИ напарником','значение «Режима»: '+mode.val());
CO.set(false);ZC.start();
lvl();ZC.menu('pause');
let items=F.menu.items.map(i=>i.label),k=items.indexOf('Режим');chk(k>=0&&items[k+1]==='Напарник в бою','в паузе пункт идёт после «Режим»: '+items.join('|'));
let it=F.menu.items[k+1];chk(it.off===true&&it.val()==='—','без ИИ напарника пункт серый: off='+it.off+' val='+it.val());
CO.setLevel(1);CO.set(true);it=F.menu.items[k+1];chk(it.off===false&&it.val()==='Смекалка'&&/под стать/.test(it.sub()),'с ИИ напарником пункт живой: '+it.val()+' / '+it.sub());
it.side(1);chk(CO.level()===2&&it.val()==='Бывалый','← → меняют уровень: '+CO.level()+' '+it.val());it.side(-1);it.side(-1);chk(CO.level()===0&&it.val()==='Растеряша','назад: '+CO.level());
// настройки: пункт под «Сложностью», когда играет бот
F.menu.items.find(i=>i.label==='Настройки').act();
const st=F.menu.items.map(i=>i.label),ks=st.indexOf('Сложность');chk(ks>=0&&st[ks+1]==='Напарник в бою','в настройках пункт под «Сложностью»: '+st.join('|'));
F.menu.items[ks+1].side(1);chk(CO.level()===1,'в настройках меняется: '+CO.level());
F.kids.force=false;ZC.start();CO.setLevel(1);CO.set(false);
if(BAD.length)throw new Error(BAD.join(' · '));
['menus ok','items='+items.join('|')]
//@@
// бой: Растеряша дольше разбирается с кикиморкой и теряет лепестки; Бывалый — быстро и без потерь. Сумма по четырём боям на уровень.
lvl();CO.set(true);
window.fight=L=>{CO.setLevel(L);let tot=0,lost=0,dn=0;for(let k=0;k<4;k++){P[1].petals=3;P[1].downed=false;const b=bot(),e=ZC.FIN.dbgFoe('kiki',b.pos.x+2.4,b.pos.z-1.5,{y:b.pos.y});
  const t=U.until(()=>!e.alive,60);tot+=t==='TIMEOUT'?60:+t.slice(2);lost+=3-P[1].petals;if(P[1].downed)dn++;ZC.tick(60);}return {tot,lost,dn};};
const w=fight(0),s=fight(2);CO.setLevel(1);CO.set(false);
chk(w.tot>s.tot+3,'Растеряша дольше Бывалого: '+w.tot.toFixed(1)+' с против '+s.tot.toFixed(1));
chk(s.lost===0&&s.dn===0,'Бывалый без потерь: лепестков потеряно '+s.lost+', упал раз '+s.dn);
chk(s.tot<4*12,'Бывалый справляется быстро: '+s.tot.toFixed(1));
if(BAD.length)throw new Error(BAD.join(' · '));
['weak '+w.tot.toFixed(1)+'s lost='+w.lost+' down='+w.dn,'strong '+s.tot.toFixed(1)+'s lost='+s.lost,'errs='+_errs.length,_errs.length?'FAIL errs':'fight ok']
//@@
