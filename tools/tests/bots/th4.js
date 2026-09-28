U.go();ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(5);ZC.skip();ZC.tick(5);ZC.finishLevel();ZC.tick(120);
'lvl='+ZC.W.levelId+' mode='+ZC.W.flags.mode+' cine='+!!ZC.G.cine
//@@
ZC.skip();ZC.tick(10);const t0=document.getElementById('skaz').innerText.replace(/\n/g,' / ');U.tap('ArrowDown');U.tap('KeyM');const t1=document.getElementById('skaz').innerText.replace(/\n/g,' / ');
U.tap('Space');U.tap('KeyD');U.tap('Space');U.tap('KeyM');const t2=document.getElementById('skaz').innerText.replace(/\n/g,' / ');U.tap('KeyA');U.tap('Space');U.tap('KeyM');ZC.tick(3);
'ui='+ZC.G.ui+' | '+t0+' || '+t1+' || '+t2+' || skaz='+JSON.stringify(ZC.G.flags.skaz)+' cine='+!!ZC.G.cine
//@@ shot=h5.png
ZC.skip();ZC.tick(60*3.2);const c=!!ZC.G.cine;const d=ZC.G.cine?ZC.G.cine.dur:0;ZC.tick(60*20);'voiceCine='+c+' dur='+d
//@@ shot=h6.png
ZC.skip();ZC.tick(60*2);'state='+ZC.G.state+' voiceDone='+!!ZC.G.flags.voiceDone+' coils='+ZC.G.flags.coils+' card='+document.getElementById('card').innerText.slice(0,400).replace(/\n/g,' / ')
