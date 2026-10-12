//@@
// 4-3 (docs/39, 43.1–43.5): песня голосом (запев Потапа, хор «Ух-нем!», голоса попавших героев), темп по куплетам 2,6 → 2,3 → 2,9 с,
// перекличка на Лисёнке (такт ждёт запева игрока с Потапом), на Ёжике запев сам и окно 1,2 с, три «Рывка» подряд — «Раззудись!»,
// мель — два «Рывка» подряд, на горе ящерка на свае выбивает уголь, Прошка сбивает её рогаткой.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.startFrom(ZC.LV('4-3'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(2);
window.W=ZC.W;window.H=ZC.HERO;window.K=W.k43;window.S=()=>W.song;window.SL=()=>ZC.FIN.song43.log.join(' ');
// все четверо — в кольца
window.inRings=()=>{['potap','pelageya','proshka','yosha'].forEach((n,i)=>{const r=W.RINGS[i],h=H[n];h.pos.set(r.x,r.y,r.z);h.vel.set(0,0,0);});ZC.tick(3);};inRings();
// такт: дождаться начала (ожидания запева) или нужного времени такта
window.untilWait=()=>{for(let i=0;i<60*8;i++){if(S().wait)return true;ZC.tick(1);}return false;};
window.untilU=(a,b)=>{for(let i=0;i<60*8;i++){const s=S();if(!s.wait&&s.k>=0&&s.u>a&&s.u<b)return true;ZC.tick(1);}return false;};
// один такт: запев (если ждёт), потом «ух-нем» — оба игрока или только Игрок 1
window.cycle=(both)=>{const k0=S().k;if(S().wait)ZC.press('KeyE');ZC.tick(2);untilU(1.15,1.5);ZC.press('KeyE');if(both)ZC.press('KeyL');for(let i=0;i<60*6&&S().k===k0+0;i++)ZC.tick(1);for(let i=0;i<60*6&&!(S().k>k0);i++)ZC.tick(1);};
chk(untilWait(),'перекличка: такт не ждёт запева Потапа');chk(Math.abs(S().C-2.6)<0.01,'темп начала не 2,6: '+S().C);
const k0=S().k;ZC.press('KeyE');ZC.tick(2);chk(!S().wait,'запев кнопкой Игрока 1 не начал такт');chk(SL().includes('potap:Эй,'),'запев не звучит: '+SL());
chk(Math.abs(S().w1-S().w0-1.0)<0.01,'окно на Лисёнке не 1 с: '+(S().w1-S().w0));
untilU(1.15,1.5);chk(SL().includes('chorus:Ух-нем!'),'хор «Ух-нем!» не звучит');ZC.press('KeyE');ZC.press('KeyL');ZC.tick(3);
chk(/proshka:Ух-нем!|potap:Ух-нем!/.test(SL())&&/pelageya:Ух-нем!|yosha:Ух-нем!/.test(SL()),'голоса героев в хоре: '+SL());
const e=ZC.FIN.vox.find('chorus','Ух-нем!');chk(e&&e.dur>0.3,'нет записи хора');
'call ok C='+S().C+' n='+ZC.FIN.song43.n
//@@
// Ёжик: запев сам (такт не ждёт), окно 1,2 с
ZC.players[0].path='easy';for(let i=0;i<60*8;i++){const k=S().k;ZC.tick(1);if(S().k>k)break;}ZC.tick(2);
chk(!S().wait,'Ёжик: такт ждёт запева');chk(Math.abs(S().w1-S().w0-1.2)<0.01,'Ёжик: окно не 1,2 с: '+(S().w1-S().w0).toFixed(2));
ZC.players[0].path='mid';'easy ok'
//@@
// три «Рывка» подряд — «Раззудись!»; мель — баржа встаёт, один «Рывок» мало, два подряд — сошли
const F=W.flags;const log=[];
for(let t=0;t<14&&!F.shoal;t++){cycle(true);log.push(W.BARGE.z.toFixed(1));}
chk(SL().includes('chorus:Раззудись!'),'«Раззудись!» не прозвучал: '+log.join(','));
chk(F.shoal&&Math.abs(W.BARGE.z-K.SH)<0.1,'мель не держит баржу: B='+W.BARGE.z.toFixed(2)+' '+log.join(','));
cycle(true);const z1=W.BARGE.z;chk(F.shoalN===1&&!F.shoalOk&&Math.abs(z1-K.SH)<0.1,'мель: после одного рывка n='+F.shoalN+' ok='+F.shoalOk);
cycle(false);chk(F.shoalN===0&&!F.shoalOk,'мель: неполный такт не сбросил счёт: n='+F.shoalN);
cycle(true);cycle(true);ZC.tick(60);chk(F.shoalOk&&W.BARGE.z<K.SH-1,'мель: два рывка подряд не сняли баржу: B='+W.BARGE.z.toFixed(1));
'shoal ok B='+W.BARGE.z.toFixed(1)+' '+log.join(',')
//@@
// темп: по ровному 2,3 с, в гору 2,9 с
for(let t=0;t<8&&W.BARGE.z>-15;t++)cycle(true);cycle(true);chk(Math.abs(S().C-2.3)<0.01,'темп по ровному не 2,3: '+S().C+' B='+W.BARGE.z.toFixed(1));
W.BARGE.z=-33;W.BARGE.tz=-33;for(const L of W.LOGS){L.gone=true;L.c.on=false;}ZC.tick(5);inRings();
for(let t=0;t<6&&W.flags.stage!=='hill';t++)cycle(true);chk(W.flags.stage==='hill','нет стадии hill');cycle(false);cycle(false);
chk(Math.abs(S().C-2.9)<0.01,'темп в гору не 2,9: '+S().C);'tempo ok'
//@@
// ящерка на свае: свечение — плевок — уголь выбит; рогатка Прошки (вне лямки, мимо такта) сбивает её
const F=W.flags,P=H.proshka,LZ=K.LZ;F.fireTold=true;
if(U.act(0)!==P){U.tap('KeyQ');ZC.tick(3);}
U.walkTo(0,-4.2,-44,5);P.face=-Math.PI/2;ZC.tick(2);U.tap('KeyR');ZC.tick(3);chk(P.carry&&P.carry.kind==='ugol','уголь не взят');
let hit=false;for(let i=0;i<60*12;i++){ZC.tick(1);if(F.lizHits){hit=true;break;}}
chk(hit&&!(P.carry&&!P.carry.gone),'ящерка не выбила уголь: on='+LZ.on+' cd='+LZ.cd.toFixed(1)+' d='+Math.hypot(P.pos.x-LZ.x,P.pos.z-LZ.z).toFixed(1));
P.face=Math.atan2(LZ.x-P.pos.x,LZ.z-P.pos.z);untilU(0.1,0.7);ZC.press('KeyE');for(let i=0;i<90&&!(LZ.down>0);i++)ZC.tick(1);
chk(LZ.down>0,'рогатка не сбила ящерку');
'lizard ok hits='+F.lizHits+' down='+LZ.down.toFixed(1)
//@@
const ok=!BAD.length&&!_errs.length;(ok?'tfin_w43 ok':'FAIL tfin_w43 '+BAD.join(' | ')+' errs='+_errs.join(' | '))
