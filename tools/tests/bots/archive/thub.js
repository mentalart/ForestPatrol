U.go();ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(5);ZC.W.links=3;ZC.W.nuts=2;ZC.W.sparksGot=20;ZC.finishLevel();ZC.tick(150);
'lvl='+ZC.W.levelId+' mode='+ZC.W.flags.mode+' label='+document.querySelector('#links span').textContent+' | '+U.obj()
//@@
// кузня
U.walkTo(0,7.9,1.6,6);ZC.tick(2);U.tap('KeyF');const G=ZC.G;const st=G.ui;let n=0,presses=0;const B=0.75;
// ждём ритм: жмём в долю Прошки (1,3,5)
const W=ZC.W;let t0=null;for(let i=0;i<60*8&&G.ui==='forge';i++){ZC.tick(1);n++;}
'ui_at_start='+st+' ui_now='+G.ui+' forged='+G.forgedLinks+' ticks='+n
//@@
// лавка Векши
U.walkTo(0,6.4,5.2,6);ZC.tick(2);U.tap('KeyF');const ui=ZC.G.ui;const txt=document.getElementById('mapui').innerText.slice(0,200).replace(/\n/g,' / ');U.tap('Space');ZC.tick(2);
const own=JSON.stringify(ZC.G.owned);U.tap('KeyG');'ui='+ui+' owned='+own+' after='+ZC.G.ui+' | '+txt+' | label='+document.querySelector('#links span').textContent
//@@
// сказки Кота (звоночков нет)
const k=ZC.W.kot?ZC.W.kot.g.position:null;U.walkTo(0,k.x-1.5,k.z+1.2,6);ZC.tick(2);U.tap('KeyF');const ui=ZC.G.ui;const txt=document.getElementById('mapui').innerText.slice(0,260).replace(/\n/g,' / ');U.tap('Space');ZC.tick(2);const ui2=ZC.G.ui;U.tap('KeyG');
'ui='+ui+' afterBuy='+ui2+' | '+txt
//@@
// все звенья мира — ковка сверх 12 даёт звоночки
const G=ZC.G;['1-1','1-2','1-3','1-4','1-5'].forEach(id=>{G.got[id]=ZC.LEVELS[ZC.LV(id)].links;G.done[id]=true;});U.walkTo(0,7.9,1.6,6);ZC.tick(2);U.tap('KeyF');for(let i=0;i<60*8&&G.ui==='forge';i++)ZC.tick(1);const c=!!ZC.G.cine;ZC.tick(60*3);ZC.skip();ZC.tick(60);
'forged='+G.forgedLinks+' gate='+!!G.flags.forged+' cine='+c+' label='+document.querySelector('#links span').textContent
//@@
const k=ZC.W.kot.g.position;U.walkTo(0,k.x-1.8,k.z+1.4,6);ZC.tick(2);U.tap('KeyF');U.tap('Space');ZC.tick(2);const ui=ZC.G.ui;const t=document.getElementById('mapui').innerText.slice(0,160).replace(/\n/g,' / ');
'ui='+ui+' tales='+JSON.stringify(ZC.G.tales)+' | '+t
//@@ wait=300 shot=hub1.png
'x'
//@@
for(let i=0;i<60*14&&ZC.G.ui;i++)ZC.tick(1);U.walkTo(0,-2.4,-17.8,6);U.tap('Space');ZC.tick(3);U.tap('KeyF');const s=ZC.G.secrets;const t=document.querySelector('#mapui .sel').innerText.replace(/\n/g,' ');U.tap('KeyG');
'secrets='+JSON.stringify(s)+' sel='+t+' bellsSpent='+ZC.G.bellsSpent
//@@ wait=300 shot=hub2.png
'x'
