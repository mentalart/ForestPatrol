//@@ wait=1500
// релиз final06: общая система воды мира 2 (late_99d_kitezh_water.js) на испытательной площадке за началом 2-1:
// перелив через заслонку (закрыта — вода стоит; Потап держит на дне — отлив у одного = прилив у другого), Потап тяжёлый — в глубокой воде
// остаётся на дне; течение с раковины-рыбки — туда, куда смотрит герой, плот несёт героя; оставленный держит напев 15 с;
// звон — колокол гудит, невидимые мостки твёрдые, потом гаснут; рогатка звонит издалека; Совиный взор показывает контур;
// живая вода растит водоросль-лесенку. Всё — настоящими нажатиями.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);ZC.W.flags.stage='street';ZC.W.flags.book=true;ZC.W.abil.gusli=true;
const T=ZC.FIN.kwTest(),K=T.KW,W=ZC.W;const pave=T.M(0x9aa094);
T.ground(-2,2,14,24,0,pave);T.ground(-10,10,24,26,0,pave);T.ground(-10,10,36,60,0,pave);
// перелив: две заводи и заслонка на дне левой (глубокой)
window.A=T.waterZone(-10,-2,14,24,-2.4,1,{floor:-2.4,shell:{x:-2.8,z:23.4,y:0}});A.heavy=true;window.B=T.waterZone(2,10,14,24,-2.4,1,{floor:-2.4,start:'high',shell:{x:2.8,z:23.4,y:0}});
T.ground(-10,-2,14,24,-2.4,pave);T.ground(2,10,14,24,-2.4,pave);
window.SL=ZC.FIN.kwSluice(-6,-2.4,19,{heavy:true});window.LK=ZC.FIN.kwLink(A,B,{open:()=>SL.held(),via:new THREE.Vector3(0,-1.6,19)});
// течение с плотом
window.CZ=T.waterZone(-10,10,26,36,-1.2,0.6,{floor:-1.2,start:'high',shell:false});T.ground(-10,10,26,36,-1.2,pave);
window.CU=ZC.FIN.kwCurrent({minx:-10,maxx:10,minz:26,maxz:36},{axis:'x',zone:CZ,shells:[{x:-8.5,z:25.3,y:0}]});window.RA=ZC.FIN.kwRaft(CU,-6.5,31,2.4,3,{h:0.5});
// звон и невидимые мостки
window.BE=ZC.FIN.kwBell(0,5,44,0.8,{shells:[{x:-2.5,z:39,y:0}]});window.GH=ZC.FIN.kwGhost(-1,1,0,1.2,46,48,{bells:[BE]});
window.KE=ZC.FIN.kwKelp(6,0,40,3.6);
const P=ZC.players;const pl=(h,x,y,z)=>{h.pos.set(x,y,z);h.vel.set(0,0,0);h.grounded=false;};window.PL=pl;
'arena ok links='+K.links.length+' cur='+K.currents.length+' bells='+K.bells.length
//@@
// 1. перелив: заслонка закрыта — вода стоит
const H=ZC.HERO,P=ZC.players;PL(H.proshka,-8,0.2,12);PL(H.potap,-6,0.2,12.5);ZC.tick(20);
if(P[1].act!==0)U.tap('KeyK');PL(H.pelageya,5,1.2,19);ZC.tick(20);U.tap('Semicolon');ZC.tick(150);
if(B.state!=='high')throw new Error('заслонка закрыта, а вода ушла: B='+B.state);
// Потап — на дно левой заводи, на круг заслонки (P1: Потап)
if(P[0].act===0)U.tap('KeyQ');ZC.tick(5);PL(H.potap,-6,-2.2,19);ZC.tick(40);if(!SL.held())throw new Error('Потап не держит заслонку: '+H.potap.pos.toArray().map(v=>v.toFixed(2)));
ZC.tick(80);U.tap('Semicolon');ZC.tick(160);
if(B.state!=='low'||A.state!=='high')throw new Error('перелив не сработал: A='+A.state+' B='+B.state);
const py=H.potap.pos.y;if(py>-1.6)throw new Error('Потап всплыл в глубокой воде: y='+py.toFixed(2));
'link ok A='+A.state+' B='+B.state+' potap y='+py.toFixed(2)+' level='+A.level.toFixed(2)
//@@ shot=kw_link.png
// 2. течение: Прошка у раковины-рыбки смотрит на +x, играет — плот с Пелагеей плывёт
const H=ZC.HERO,P=ZC.players;if(P[0].act!==0)U.tap('KeyQ');ZC.tick(5);PL(H.proshka,-8.5,0.2,24.6);H.proshka.face=Math.PI/2;PL(H.pelageya,-6.5,1.2,31);ZC.tick(30);
const x0=RA.x;U.tap('KeyR');ZC.tick(2);if(CU.dir!==1)throw new Error('течение не пошло по взгляду: dir='+CU.dir);
// сразу сменить героя — оставленный Прошка держит напев
U.tap('KeyQ');ZC.tick(5);if(!H.proshka.kwHold)throw new Error('оставленный не держит напев');
ZC.tick(60*12);const x1=RA.x,pe=H.pelageya.pos.x;if(CU.dir!==1)throw new Error('течение стихло раньше 15 с при оставленном: '+CU.dir);
if(!(x1>x0+5))throw new Error('плот не плывёт: '+x0.toFixed(2)+'→'+x1.toFixed(2));if(Math.abs(pe-x1)>1.6)throw new Error('Пелагею не везёт плот: '+pe.toFixed(2)+' плот '+x1.toFixed(2));
ZC.tick(60*5);if(CU.dir!==0||H.proshka.kwHold)throw new Error('напев не стих через 15 с');'current ok raft '+x0.toFixed(1)+'→'+x1.toFixed(1)
//@@ shot=kw_current.png
// 3. звон: раковина-колокольчик — мостки твёрдые 6 с; рогатка звонит издалека; Совиный взор — контур
const H=ZC.HERO,P=ZC.players;if(P[0].act!==1)U.tap('KeyQ');ZC.tick(5);PL(H.potap,-2.5,0.2,39.3);ZC.tick(20);if(GH.col.on)throw new Error('мостки твёрдые без звона');
U.tap('KeyR');ZC.tick(10);if(!(BE.hum>5)||!GH.col.on)throw new Error('звон не включил мостки: hum='+BE.hum);ZC.tick(60*6.5);if(GH.col.on)throw new Error('мостки не погасли');
if(P[0].act!==0)U.tap('KeyQ');ZC.tick(5);PL(H.proshka,0,0.2,37);H.proshka.face=0;ZC.tick(20);U.tap('KeyE');ZC.tick(60);if(!GH.col.on)throw new Error('рогатка не позвонила');
ZC.tick(60*7);if(P[1].act!==0)U.tap('KeyK');ZC.tick(5);PL(H.pelageya,2,0.2,42);ZC.tick(10);U.tap('KeyL');ZC.tick(20);
if(!(GH.mat.opacity>0.05)||GH.col.on)throw new Error('Совиный взор не показал контур: '+GH.mat.opacity.toFixed(2));'ring ok owl='+GH.mat.opacity.toFixed(2)
//@@ shot=kw_owl.png
// 4. Йоша поливает росток — водоросль-лесенка
const H=ZC.HERO,P=ZC.players;if(P[1].act!==1)U.tap('KeyK');ZC.tick(5);PL(H.yosha,6,0.2,38.6);H.yosha.face=0;ZC.tick(20);U.tap('KeyL');ZC.tick(120);
if(!KE.grown||KE.leaves.filter(l=>l.col.on).length<3)throw new Error('лесенка не выросла');'kelp ok leaves='+KE.leaves.length
//@@ shot=kw_kelp.png
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'errs=0'
