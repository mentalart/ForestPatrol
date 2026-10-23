// 2D-мультсериал «Златая цепь»: общий движок кадра (Canvas 2D, 1080×1920, 24 к/с). Стиль — docs/47_mult2d_stil.md:
// «Книжка Пелагеи» (бумажная перекладка), регистр «Палехская ночь» (золото на лаке) и упаковка «Хохлома-морф».
// Кадр — чистая функция времени: MD.render(t) рисует серию в момент t, съёмка (shoot.js) зовёт её покадрово.
'use strict';
const MD = {W: 1080, H: 1920, fps: 24, eps: {}, ep: null, scenes: []};

// ---------- числа и время ----------
MD.clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
MD.lerp = (a, b, k) => a + (b - a) * k;
MD.seg = (t, a, b) => MD.clamp((t - a) / (b - a));           // 0…1 на отрезке [a,b]
MD.twos = t => Math.floor(t * 12) / 12;                      // перекладка «на двойках»: 12 поз в секунду
MD.ease = {
  inOut: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
  out: k => 1 - Math.pow(1 - k, 3),
  in: k => k * k * k,
  back: (k, s = 1.9) => 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2),
  elastic: k => k === 0 || k === 1 ? k : Math.pow(2, -10 * k) * Math.sin((k * 10 - .75) * 2.0944) + 1,
};
MD.rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

// ---------- бумага ----------
const _paths = new Map();
MD.P = d => { let p = _paths.get(d); if (!p) { p = new Path2D(d); _paths.set(d, p); } return p; };
MD.ellipse = (cx, cy, rx, ry) => { const p = new Path2D(); p.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); return p; };
MD.circle = (cx, cy, r) => MD.ellipse(cx, cy, r, r);

MD.initGrain = () => {   // фактура бумаги: светлый шум и волокна, кладётся «умножением»
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d');
  const R = MD.rng(77), img = g.createImageData(512, 512);
  for (let i = 0; i < img.data.length; i += 4) { const v = 222 + R() * 33; img.data[i] = v; img.data[i + 1] = v * .99; img.data[i + 2] = v * .96; img.data[i + 3] = 255; }
  g.putImageData(img, 0, 0);
  for (let i = 0; i < 260; i++) {
    g.strokeStyle = R() < .5 ? 'rgba(150,130,110,.18)' : 'rgba(255,255,255,.35)'; g.lineWidth = .6 + R();
    const x = R() * 512, y = R() * 512, a = R() * 6.28, l = 6 + R() * 22;
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a + .6) * l * .5, y + Math.sin(a + .6) * l * .5, x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  MD.grainCanvas = c;
};
MD.grain = ctx => (ctx._grain || (ctx._grain = ctx.createPattern(MD.grainCanvas, 'repeat')));

// Вырезанная деталь: тень на слой ниже, цвет, фактура, светлый срез по краю.
MD.paper = (ctx, path, color, o = {}) => {
  const sh = o.shadow ?? 1;
  ctx.save();
  if (sh) { ctx.shadowColor = o.shadowColor || 'rgba(10,10,32,.5)'; ctx.shadowBlur = 16 * sh; ctx.shadowOffsetX = 5 * sh; ctx.shadowOffsetY = 10 * sh; }
  ctx.fillStyle = color; ctx.fill(path); ctx.restore();
  if (o.grain !== 0) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = o.grain ?? .55; ctx.fillStyle = MD.grain(ctx); ctx.fill(path); ctx.restore(); }
  if (o.edge !== false) { ctx.save(); ctx.strokeStyle = o.edgeColor || 'rgba(255,250,235,.22)'; ctx.lineWidth = o.edgeW || 3; ctx.stroke(path); ctx.restore(); }
};
// Золотая нить / палехская линия со свечением.
MD.glow = (ctx, path, color, w, glow = 18, alpha = 1) => {
  ctx.save(); ctx.globalAlpha = alpha; ctx.lineCap = ctx.lineJoin = 'round';
  ctx.shadowColor = color; ctx.shadowBlur = glow; ctx.strokeStyle = color; ctx.lineWidth = w; ctx.stroke(path); ctx.restore();
};
// Прорисовка линии по длине (0…1) через пунктир; len — длина пути с запасом.
MD.drawOn = (ctx, path, color, w, k, len = 3000, glow = 14) => {
  if (k <= 0) return; ctx.save(); ctx.setLineDash([len * k, len * 2]); MD.glow(ctx, path, color, w, glow); ctx.restore();
};
MD.radial = (ctx, x, y, r, inner, outer = 'rgba(0,0,0,0)', op = 'lighter', alpha = 1) => {
  ctx.save(); ctx.globalCompositeOperation = op; ctx.globalAlpha = alpha;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, inner); g.addColorStop(1, outer);
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
};
// Звёзды-блёстки: позиции от зерна, мерцание от времени.
MD.stars = (ctx, seed, n, t, color = '#F7E7B5', box = [0, 0, 1080, 1200], size = 5) => {
  const R = MD.rng(seed); ctx.save(); ctx.fillStyle = color;
  for (let i = 0; i < n; i++) {
    const x = box[0] + R() * box[2], y = box[1] + R() * box[3], ph = R() * 6.28, s = size * (.5 + R());
    ctx.globalAlpha = .45 + .55 * (.5 + .5 * Math.sin(t * (1.5 + R() * 2) + ph));
    ctx.beginPath(); ctx.moveTo(x, y - s * 1.8); ctx.lineTo(x + s * .45, y - s * .45); ctx.lineTo(x + s * 1.8, y); ctx.lineTo(x + s * .45, y + s * .45);
    ctx.lineTo(x, y + s * 1.8); ctx.lineTo(x - s * .45, y + s * .45); ctx.lineTo(x - s * 1.8, y); ctx.lineTo(x - s * .45, y - s * .45); ctx.fill();
  }
  ctx.restore();
};
// Раскладушка: слой «встаёт» из сгиба страницы (масштаб по высоте от основания с упругим доводом).
MD.pop = (ctx, t, start, baseY, fn, dur = .7) => {
  const k = MD.seg(t, start, start + dur); if (k <= 0) return;
  const s = MD.ease.back(k, 1.6);
  ctx.save(); ctx.translate(0, baseY); ctx.scale(1, Math.max(.001, s)); ctx.translate(0, -baseY); fn(); ctx.restore();
};

// ---------- камера ----------
// cam: {x,y — точка кадра в центре, z — масштаб, r — поворот, shake — сила тряски}
MD.camera = (ctx, cam, t) => {
  const s = cam.shake || 0, sx = s ? (Math.sin(t * 91) + Math.sin(t * 57)) * s : 0, sy = s ? (Math.cos(t * 83) + Math.sin(t * 61)) * s : 0;
  ctx.translate(MD.W / 2 + sx, MD.H / 2 + sy); ctx.rotate(cam.r || 0); ctx.scale(cam.z || 1, cam.z || 1);
  ctx.translate(-(cam.x ?? MD.W / 2), -(cam.y ?? MD.H / 2));
};

// ---------- субтитры (формат: 46_multserial.md — имя цветом героя, не выше 2 строк; высота центра — ep.subY, по умолчанию 64 %) ----------
MD.FONT = {display: '"Ruslan Display", Georgia, serif', ui: 'Rubik, "DejaVu Sans", sans-serif', body: 'Alegreya, Georgia, serif'};
MD.subtitle = (ctx, who, color, text, alpha = 1) => {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha = alpha; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.font = `500 54px ${MD.FONT.ui}`;
  const words = text.split(' '), lines = []; let cur = '';
  for (const w of words) { const s = cur ? cur + ' ' + w : w; if (ctx.measureText(s).width > 860 && cur) { lines.push(cur); cur = w; } else cur = s; }
  lines.push(cur);
  const cy = MD.H * (MD.ep?.subY ?? .64), lh = 66, h = 56 + lines.length * lh, y0 = cy - h / 2;
  const wMax = Math.max(...lines.map(l => ctx.measureText(l).width), 300) + 80;
  ctx.fillStyle = 'rgba(14,10,18,.62)'; ctx.beginPath(); ctx.roundRect(540 - wMax / 2, y0, wMax, h, 22); ctx.fill();
  ctx.font = `700 34px ${MD.FONT.ui}`; ctx.fillStyle = color; ctx.fillText(who.toUpperCase(), 540, y0 + 44);
  ctx.font = `500 54px ${MD.FONT.ui}`; ctx.fillStyle = '#FFF6E6';
  lines.forEach((l, i) => ctx.fillText(l, 540, y0 + 44 + (i + 1) * lh - 6));
  ctx.restore();
};

// ---------- рендер серии ----------
// Серия: MD.eps[id] = {dur, shots:[{a,b,draw(ctx,t,lt)}], subs:[{a,b,who,color,text}], trans:[{at,dur,type}]}.
MD.canvas = null; MD.ctx = null; MD.buf = [];
MD.init = id => {
  MD.ep = MD.eps[id];
  MD.canvas = document.getElementById('c'); MD.canvas.width = MD.W; MD.canvas.height = MD.H;
  MD.ctx = MD.canvas.getContext('2d');
  for (let i = 0; i < 2; i++) { const b = document.createElement('canvas'); b.width = MD.W; b.height = MD.H; MD.buf.push(b); }
  MD.initGrain();
};
MD.shotAt = (t, skip) => MD.ep.shots.find(s => s !== skip && t >= s.a && t < s.b) || MD.ep.shots[MD.ep.shots.length - 1];
MD.drawShot = (ctx, s, t) => { ctx.save(); s.draw(ctx, t, t - s.a); ctx.restore(); };
MD.render = t => {
  const ctx = MD.ctx, ep = MD.ep;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  const tr = (ep.trans || []).find(x => t >= x.at - x.dur / 2 && t < x.at + x.dur / 2);
  const cur = MD.shotAt(t);
  if (!tr) MD.drawShot(ctx, cur, t);
  else {
    const k = MD.seg(t, tr.at - tr.dur / 2, tr.at + tr.dur / 2);
    const A = MD.shotAt(tr.at - 1e-3), B = MD.shotAt(tr.at + 1e-3);
    const ca = MD.buf[0].getContext('2d'), cb = MD.buf[1].getContext('2d');
    ca.setTransform(1, 0, 0, 1, 0, 0); cb.setTransform(1, 0, 0, 1, 0, 0);
    MD.drawShot(ca, A, t); MD.drawShot(cb, B, t);   // оба плана живут во время перехода
    MD.TRANS[tr.type](ctx, MD.buf[0], MD.buf[1], k, tr);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  for (const s of ep.subs || []) {
    if (t < s.a || t >= s.b) continue;
    MD.subtitle(ctx, s.who, s.color, s.text, Math.min(MD.seg(t, s.a, s.a + .15), 1 - MD.seg(t, s.b - .15, s.b)));
  }
  if (ep.post) ep.post(ctx, t);
};

// ---------- переходы ----------
MD.TRANS = {
  cut: (ctx, A, B, k) => ctx.drawImage(k < .5 ? A : B, 0, 0),
  // перелистывание страницы: старый кадр складывается к корешку слева, под ним — новый
  page: (ctx, A, B, k) => {
    const e = MD.ease.inOut(k);
    ctx.drawImage(B, 0, 0);
    MD.radial(ctx, 0, MD.H / 2, MD.W * 1.2 * (1 - e) + 10, `rgba(0,0,0,${.45 * (1 - e)})`, 'rgba(0,0,0,0)', 'source-over');
    const w = MD.W * Math.cos(e * Math.PI / 2);
    if (w > 1) {
      ctx.save(); ctx.drawImage(A, 0, 0, MD.W, MD.H, 0, 0, w, MD.H);
      const g = ctx.createLinearGradient(0, 0, w, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${.5 * e})`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, MD.H);
      ctx.fillStyle = `rgba(255,248,230,${.6 * Math.sin(e * Math.PI)})`; ctx.fillRect(w - 6, 0, 6, MD.H); ctx.restore();
    }
  },
  // лак: тёмная капля растекается из точки, по краю — золотое кольцо-орнамент
  lacquer: (ctx, A, B, k, tr) => {
    const e = MD.ease.inOut(k), r = 2300 * e, x = tr.x ?? 540, y = tr.y ?? 700;
    ctx.drawImage(A, 0, 0);
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
    if (r > 2) { const p = new Path2D(); p.arc(x, y, r, 0, Math.PI * 2); MD.glow(ctx, p, '#E8B84A', 10, 30); const p2 = new Path2D(); p2.arc(x, y, r + 22, 0, Math.PI * 2);
      ctx.save(); ctx.setLineDash([4, 18]); MD.glow(ctx, p2, '#E8B84A', 6, 10); ctx.restore(); }
  },
  // хохлома: золотой круг из точки заливает кадр
  gold: (ctx, A, B, k, tr) => {
    const e = MD.ease.in(k), r = 2400 * e, x = tr.x ?? 540, y = tr.y ?? 960;
    ctx.drawImage(A, 0, 0);
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
    if (r > 2) { const p = new Path2D(); p.arc(x, y, r, 0, Math.PI * 2); ctx.save(); ctx.strokeStyle = '#171012'; ctx.lineWidth = 16; ctx.stroke(p); ctx.strokeStyle = '#E23B2E'; ctx.lineWidth = 6; ctx.stroke(p); ctx.restore(); }
  },
};

// ---------- спрайты из листов ChatGPT (tools/mult2d/cut.py → sprites/, manifest.json) ----------
MD.SPR = {};
MD.loadSprites = async () => {
  const man = await (await fetch('sprites/manifest.json')).json();
  await Promise.all(Object.keys(man).map(k => new Promise((ok, bad) => { const im = new Image(); im.onload = ok; im.onerror = () => bad(new Error('нет спрайта ' + k)); im.src = `sprites/${k}.png`; MD.SPR[k] = im; })));
};
// Деталь: o.s — масштаб (или o.w — ширина), o.ax/o.ay — точка опоры 0…1, o.rot, o.alpha, o.flip,
// o.shadow — бумажная тень (по умолчанию 1), o.rim — цвет свечения по краю вместо тени (лак), o.src — [sx,sy,sw,sh], o.op — режим смешения.
MD.spr = (ctx, key, x, y, o = {}) => {
  const im = MD.SPR[key]; if (!im) throw new Error('нет спрайта ' + key);
  const src = o.src || [0, 0, im.width, im.height], s = o.w ? o.w / src[2] : (o.s ?? 1), sy = o.h ? o.h / src[3] : s;
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); if (o.flip) ctx.scale(-1, 1);
  if (o.alpha != null) ctx.globalAlpha *= o.alpha; if (o.op) ctx.globalCompositeOperation = o.op;
  if (o.rim) { ctx.shadowColor = o.rim; ctx.shadowBlur = o.rimBlur ?? 18; }
  else if ((o.shadow ?? 1) > 0) { const k = o.shadow ?? 1; ctx.shadowColor = 'rgba(10,10,32,.45)'; ctx.shadowBlur = 14 * k; ctx.shadowOffsetX = 5 * k; ctx.shadowOffsetY = 9 * k; }
  ctx.drawImage(im, src[0], src[1], src[2], src[3], -(o.ax ?? .5) * src[2] * s, -(o.ay ?? .5) * src[3] * sy, src[2] * s, src[3] * sy);
  ctx.restore();
};

// ---------- игра кукол (навык perekladka): предвосхищение, захлёст, пружина, моргание, дыхание, «дрожь бумаги» ----------
// Предвосхищение и перелёт: 0→1 с замахом назад (back) перед движением и перелётом с возвратом после.
MD.anticip = (t, a, b, back = .18, over = .12) => {
  const k = MD.seg(t, a, b); if (k <= 0) return 0; if (k >= 1) return 1;
  if (k < .25) return -back * Math.sin(k / .25 * Math.PI / 2);
  const u = (k - .25) / .75; return -back + (1 + back) * MD.ease.out(u) + over * Math.sin(u * Math.PI) * u;
};
// Затухающая пружина после толчка в t0: колебание ±1 → 0 (захлёст ушей, хвоста, бусин, рукавов).
MD.spring = (t, t0, f = 3, damp = 5) => t < t0 ? 0 : Math.exp(-(t - t0) * damp) * Math.sin((t - t0) * f * 2 * Math.PI);
// Запаздывание вторичной детали: значение fn(t) с опозданием на d секунд (2–4 кадра = .08–.17 с).
MD.lag = (fn, t, d = .12) => fn(t - d);
// Позы «на двойках/тройках»: n поз в секунду.
MD.steps = (t, n = 12) => Math.floor(t * n) / n;
// Моргание: каждые 2–5 с от зерна, 0,12 с; вернёт true в кадрах моргания.
MD.blinkAuto = (t, seed = 1) => { const R = MD.rng(seed); let b = R() * 2; while (b < t + 1) { if (t >= b && t < b + .12) return true; b += 2 + R() * 3; } return false; };
// Дыхание: масштаб по высоте 1 ± amp (опора — у ног).
MD.breath = (t, amp = .012, rate = .35) => 1 + amp * Math.sin(t * rate * 2 * Math.PI);
// «Дрожь бумаги»: сдвиг детали на 0,5–1,5 px со сменой позы (на двойках) — ручная перекладка, а не векторная гладкость.
MD.boil = (t, seed, amp = 1.2, n = 12) => { const R = MD.rng(seed * 997 + Math.floor(t * n)); return [(R() - .5) * 2 * amp, (R() - .5) * 2 * amp]; };

// ---------- голоса и движение рта (Rhubarb Lip Sync: формы A–H, X — покой) ----------
MD.LIPS = {};
MD.loadLips = async (dir, ids) => { for (const id of ids) MD.LIPS[id] = (await (await fetch(`${dir}/${id}.json`)).json()).mouthCues; };
// Форма рта героя who в момент t по репликам серии ep.voice = [{id, who, at}].
MD.mouth = (who, t) => {
  for (const v of MD.ep.voice || []) {
    if (v.who !== who || t < v.at) continue;
    const c = (MD.LIPS[v.id] || []).find(c => t - v.at >= c.start && t - v.at < c.end);
    if (c) return c.value;
  }
  return 'X';
};
MD.speaking = (who, t) => MD.mouth(who, t) !== 'X';
if (typeof window !== 'undefined') window.MD = MD;
