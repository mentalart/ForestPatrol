U.go();ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(5);ZC.W.links=3;ZC.W.nuts=2;ZC.W.sparksGot=20;ZC.finishLevel();ZC.tick(150);
'lvl='+ZC.W.levelId+' mode='+ZC.W.flags.mode+' label='+document.querySelector('#links span').textContent+' | '+U.obj()
//@@
// кузня
U.walkTo(0,7.9,1.6,6);ZC.tick(2);U.tap('KeyF');const G=ZC.G;const st=G.ui;let n=0,presses=0;const B=0.75;
// ждём ритм: жмём в долю Прошки (1,3,5)
const W=ZC.W;let t0=null;for(let i=0;i<60*8&&G.ui==='forge';i++){ZC.tick(1);n++;}
'ui_at_start='+st+' ui_now='+G.ui+' forged='+G.forgedLinks+' ticks='+n
//@@
const r=U.walkTo(0,9.4,7.2,6);ZC.tick(2);const h=U.act(0);const F=ZC.W.flags;const pre='r='+r+' h='+h.pos.x.toFixed(2)+','+h.pos.y.toFixed(2)+','+h.pos.z.toFixed(2)+' stage='+F.stage+' ui='+ZC.G.ui+' cine='+!!ZC.G.cine+' forging='+F.forging;
U.tap('KeyF');pre+' -> ui='+ZC.G.ui
