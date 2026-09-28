// Склейка кадров по два в ряд: node grid.js out.png a.png b.png ...
const {chromium}=require('./pw');const fs=require('fs');
(async()=>{const [,,out,...ims]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:360*Math.ceil(ims.length/2)}});
 await p.setContent('<body style="margin:0;display:grid;grid-template-columns:640px 640px;background:#000">'+ims.map(f=>'<img src="data:image/png;base64,'+fs.readFileSync(f).toString('base64')+'" style="width:640px;height:360px">').join('')+'</body>');
 await p.waitForTimeout(300);await p.screenshot({path:out});await b.close();})();
