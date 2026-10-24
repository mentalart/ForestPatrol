// Покадровая съёмка 2D-серии: node tools/mult2d/shoot.js --ep proba [--out DIR] [--part k/n] [--at 1.2,4.5 → отдельные кадры]
// [--mids → по кадру из середины каждого плана, out/<серия>/mid_NN.jpg — раскадровка для проверки]
// Всегда пишет out/<серия>/timeline.json — планы и реплики для звука (audio_<серия>.py).
// Браузер — Playwright, а если его нет — установленный Chrome или Edge напрямую по протоколу DevTools (CHROME=путь к браузеру).
const fs = require('fs'), path = require('path'), http = require('http'), os = require('os'), {spawn} = require('child_process');
const TYPES = {'.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.ttf': 'font/ttf'};
// свой сервер: спрайты и метки рта грузятся fetch, а холст с картинками из file:// нельзя прочитать
const serve = () => new Promise(ok => { const s = http.createServer((q, r) => {
  const f = path.join(__dirname, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(__dirname) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, {'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream'}); fs.createReadStream(f).pipe(r);
}); s.listen(0, '127.0.0.1', () => ok(s)); });
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const ep = arg('ep', 'proba'), out = path.resolve(arg('out', path.join(__dirname, 'out', ep))), fps = +arg('fps', 24);
const onErr = m => { console.error('ошибка страницы:', m); process.exitCode = 1; };

// Страница: {ev(fn, arg) — выполнить fn(arg) в странице и вернуть результат, close()}
const viaPlaywright = async url => {
  const {chromium} = require('playwright');
  const b = await chromium.launch(), p = await b.newPage({viewport: {width: 540, height: 960}});
  p.on('pageerror', e => onErr(e.message));
  await p.goto(url);
  return {ev: (fn, a) => p.evaluate(fn, a), close: () => b.close()};
};
const viaCDP = async url => {
  const exe = process.env.CHROME || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/chromium', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(f => fs.existsSync(f));
  if (!exe) throw new Error('нет ни Playwright, ни Chrome/Edge (CHROME=путь к браузеру)');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mult2d-'));
  const br = spawn(exe, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${dir}`, '--window-size=540,960', '--no-first-run',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding', url], {stdio: ['ignore', 'ignore', 'pipe']});
  const port = await new Promise((ok, bad) => { let e = ''; br.stderr.on('data', d => { e += d; const m = e.match(/ws:\/\/127\.0\.0\.1:(\d+)\//); if (m) ok(m[1]); });
    br.on('exit', () => bad(new Error('браузер закрылся: ' + e.slice(-300)))); });
  let pg; for (let i = 0; i < 50 && !pg; i++) { pg = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(x => x.type === 'page'); if (!pg) await new Promise(r => setTimeout(r, 100)); }
  const ws = new WebSocket(pg.webSocketDebuggerUrl); await new Promise(ok => ws.onopen = ok);
  let id = 0; const wait = new Map();
  ws.onmessage = m => { const j = JSON.parse(m.data);
    if (j.method === 'Runtime.exceptionThrown') onErr(j.params.exceptionDetails.exception?.description || j.params.exceptionDetails.text);
    if (j.id && wait.has(j.id)) { wait.get(j.id)(j); wait.delete(j.id); } };
  const send = (method, params = {}) => new Promise(ok => { wait.set(++id, ok); ws.send(JSON.stringify({id, method, params})); });
  await send('Runtime.enable');
  const ev = async (fn, a) => { const r = await send('Runtime.evaluate', {expression: `(${fn})(${JSON.stringify(a)})`, awaitPromise: true, returnByValue: true});
    if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text); return r.result.result.value; };
  return {ev, close: async () => { ws.close(); br.kill(); await new Promise(r => setTimeout(r, 300)); try { fs.rmSync(dir, {recursive: true, force: true}); } catch (e) {} }};
};

(async () => {
  fs.mkdirSync(out, {recursive: true});
  const srv = await serve(), url = `http://127.0.0.1:${srv.address().port}/index.html?ep=${ep}&shoot=1`;
  let p; try { p = await viaPlaywright(url); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; p = await viaCDP(url); }
  for (let i = 0; !(await p.ev(() => window.READY === true)); i++) { if (i > 300) throw new Error('страница не загрузилась'); await new Promise(r => setTimeout(r, 100)); }
  const dur = await p.ev(() => MD.ep.dur);
  // разметка серии для звука (audio_<серия>.py): планы и реплики
  fs.writeFileSync(path.join(out, 'timeline.json'), JSON.stringify(await p.ev(() => ({dur: MD.ep.dur, shots: MD.ep.shots.map(s => [s.a, s.b]), voice: MD.ep.voice || [], cues: MD.ep.cues || []})), null, 0));
  let at = arg('at');
  if (process.argv.includes('--mids')) {
    const mids = await p.ev(() => MD.ep.shots.map(s => +((s.a + s.b) / 2).toFixed(2)));
    for (const [i, t] of mids.entries()) { const url = await p.ev(t => { MD.render(t); return MD.canvas.toDataURL('image/jpeg', .8); }, t);
      fs.writeFileSync(path.join(out, `mid_${String(i).padStart(2, '0')}.jpg`), Buffer.from(url.split(',')[1], 'base64')); }
    console.log(mids.join(' ')); await p.close(); srv.close(); return;
  }
  if (at) {   // отдельные кадры для проверки
    for (const t of at.split(',').map(Number)) {
      const url = await p.ev(t => { MD.render(t); return MD.canvas.toDataURL('image/jpeg', .9); }, t);
      fs.writeFileSync(path.join(out, `at_${t.toFixed(2)}.jpg`), Buffer.from(url.split(',')[1], 'base64'));
    }
    await p.close(); srv.close(); return;
  }
  const N = Math.round(dur * fps), [k, n] = (arg('part', '0/1')).split('/').map(Number);
  const t0 = Date.now();
  for (let f = k; f < N; f += n) {
    const url = await p.ev(t => { MD.render(t); return MD.canvas.toDataURL('image/jpeg', .93); }, f / fps);
    fs.writeFileSync(path.join(out, String(f).padStart(5, '0') + '.jpg'), Buffer.from(url.split(',')[1], 'base64'));
    if (f % 48 === k) console.log(`кадр ${f}/${N} · ${((Date.now() - t0) / 1000).toFixed(0)} с`);
  }
  await p.close(); srv.close();
})();
