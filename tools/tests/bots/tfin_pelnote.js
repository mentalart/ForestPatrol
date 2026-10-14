//@@ wait=1500
// релиз final06: пролог, ролик «Колыбельная» — Тишка забыл слова, Пелагея глядит в тетрадку, чешет пером за ушком («?»),
// смущается (румянец, крыло к клюву) и вздыхает («…»). Проверки: тетрадка всё время на столе (не летит сквозь Пелагею),
// кончик пера у точки за ухом и перо не входит в голову, кончики крыльев — тоже; румянец есть; после ролика пера нет, ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(20);
const P=ZC.players;P[0].heroes[P[0].act].pos.set(-2,0,1.4);P[1].heroes[P[1].act].pos.set(2.2,0,1.4);let n=0;while(!ZC.G.cine&&n<200){ZC.tick(1);n++;}
window._pn={nbMax:0,quill:9,wings:9,tip:0,blush:0};
window.T=t=>{for(let i=0;i<6000&&ZC.G.cine&&ZC.G.cine.t<t;i++){ZC.tick(1);const s=ZC.FIN.pelNote();if(!s.on)continue;
  const c=ZC.FIN.proDbg().ctx.NB_TABLE;if(s.nb&&ZC.G.cine.t<28)_pn.nbMax=Math.max(_pn.nbMax,Math.hypot(s.nb[0]-c.x,s.nb[1]-c.y,s.nb[2]-c.z));
  if(s.T>7.8&&s.T<12.6){_pn.quill=Math.min(_pn.quill,s.quill);_pn.wings=Math.min(_pn.wings,s.wings);_pn.blush=Math.max(_pn.blush,s.blush);}
  if(s.T>9.2&&s.T<9.85)_pn.tip=Math.max(_pn.tip,s.tip);}
  ZC.FIN.occ.frame();return ZC.G.cine?+ZC.G.cine.t.toFixed(2):-1;};
'cine dur='+ZC.G.cine.dur+' pelNote='+JSON.stringify(ZC.FIN.pelNote())
//@@ shot=pelnote_1.png
T(8.2)+' — глядит в тетрадку'
//@@ shot=pelnote_2.png
T(9.45)+' — чешет пером за ушком: '+JSON.stringify(ZC.FIN.pelNote())
//@@ shot=pelnote_3.png
T(10.3)+' — смущается'
//@@ shot=pelnote_4.png
T(11.0)+' — вздыхает'
//@@
T(13);
if(_pn.nbMax>0.02)throw new Error('тетрадка уходила со стола: '+_pn.nbMax.toFixed(2));
if(_pn.quill<1)throw new Error('перо входит в голову: '+_pn.quill);
if(_pn.wings<1)throw new Error('крыло входит в голову: '+_pn.wings);
if(_pn.tip>0.07)throw new Error('кончик пера не у уха: '+_pn.tip);
if(_pn.blush<0.5)throw new Error('нет румянца: '+_pn.blush);
JSON.stringify(_pn)
//@@
T(99);const s=ZC.FIN.pelNote();if(s.on)throw new Error('поза Пелагеи не снята после ролика');if(_errs.length)throw new Error('ошибки: '+_errs[0]);
['cine='+!!ZC.G.cine,'stage='+ZC.W.flags.stage,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:'')].join(' · ')
