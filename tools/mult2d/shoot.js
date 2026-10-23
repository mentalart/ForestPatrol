// Покадровая съёмка 2D-серии: node tools/mult2d/shoot.js --ep proba [--out DIR] [--part k/n] [--at 1.2,4.5 → листы PNG]
const {chromium} = require('playwright');
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const ep = arg('ep', 'proba'), out = path.resolve(arg('out', path.join(__dirname, 'out', ep))), fps = +arg('fps', 24);
(async () => {
  fs.mkdirSync(out, {recursive: true});
  const b = await chromium.launch({args: ['--allow-file-access-from-files']});
  const p = await b.newPage({viewport: {width: 540, height: 960}});
  p.on('pageerror', e => { console.error('ошибка страницы:', e.message); process.exitCode = 1; });
  await p.goto('file://' + path.join(__dirname, 'index.html') + `?ep=${ep}&shoot=1`);
  await p.waitForFunction(() => window.READY === true, null, {timeout: 30000});
  const dur = await p.evaluate(() => MD.ep.dur);
  const at = arg('at'); 
  if (at) {   // отдельные кадры для проверки
    for (const t of at.split(',').map(Number)) {
      const url = await p.evaluate(t => { MD.render(t); return MD.canvas.toDataURL('image/jpeg', .9); }, t);
      fs.writeFileSync(path.join(out, `at_${t.toFixed(2)}.jpg`), Buffer.from(url.split(',')[1], 'base64'));
    }
    await b.close(); return;
  }
  const N = Math.round(dur * fps), [k, n] = (arg('part', '0/1')).split('/').map(Number);
  const t0 = Date.now();
  for (let f = k; f < N; f += n) {
    const url = await p.evaluate(t => { MD.render(t); return MD.canvas.toDataURL('image/jpeg', .93); }, f / fps);
    fs.writeFileSync(path.join(out, String(f).padStart(5, '0') + '.jpg'), Buffer.from(url.split(',')[1], 'base64'));
    if (f % 48 === k) console.log(`кадр ${f}/${N} · ${((Date.now() - t0) / 1000).toFixed(0)} с`);
  }
  await b.close();
})();
