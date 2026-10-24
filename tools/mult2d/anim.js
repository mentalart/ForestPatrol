// Движок анимации серий (поверх engine.js): ключевые позы, пути, циклы ходьбы и бега, актёр с опорой у ног,
// сжатие-растяжение, тень на земле, смаз движения, параллакс слоёв, авто-игра на реплике. Всё — чистые функции времени.
'use strict';
(() => {
const {seg, clamp, lerp, ease, twos} = MD;
const EASE = {lin: k => k, inOut: ease.inOut, out: ease.out, in: ease.in, back: k => ease.back(k, 1.7), step: k => k < 1 ? 0 : 1,
  soft: k => k * k * (3 - 2 * k), elastic: ease.elastic};

// Ключи: [[время, значение | {поле: число…}, кривая?], …] → значение в t. Кривая ключа задаёт переход ОТ этого ключа к следующему.
// Нечисловые поля берутся из ближайшего прошедшего ключа (смена глаз, рта, детали).
MD.K = (t, keys, def = 'inOut') => {
  if (!keys.length) return undefined;
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [ta, a, ea] = keys[i], [tb, b] = keys[i + 1];
    if (t < tb) { const k = EASE[ea || def]((t - ta) / (tb - ta)); return mix(a, b, k); }
  }
  return keys[keys.length - 1][1];
};
const mix = (a, b, k) => {
  if (typeof a === 'number' && typeof b === 'number') return a + (b - a) * k;
  if (a && typeof a === 'object' && !Array.isArray(a)) {
    const o = {...b, ...a}; for (const f in b) { if (typeof a[f] === 'number' && typeof b[f] === 'number') o[f] = a[f] + (b[f] - a[f]) * k; else if (!(f in a)) o[f] = b[f]; }
    return o;
  }
  if (Array.isArray(a)) return a.map((v, i) => typeof v === 'number' ? v + (b[i] - v) * k : v);
  return k < 1 ? a : b;
};
MD.mix = mix;
// Ключи «на двойках»: позы меняются 12 раз в секунду, как у перекладки.
MD.K2 = (t, keys, def) => MD.K(twos(t), keys, def);

// Путь актёра: ключи {x, y} → позиция и скорость (для поворота лицом по ходу и фазы шага).
MD.track = (t, keys, def = 'inOut') => {
  const p = MD.K(t, keys, def), q = MD.K(t + 1 / 24, keys, def);
  return {...p, vx: (q.x - p.x) * 24, vy: (q.y - p.y) * 24};
};

// ---------- циклы движения (поза → поля кукол pup.js) ----------
// Шаг: фаза в шагах (1 = полный цикл из двух шагов). amt — размах. Возвращает позу и подскок тела.
MD.walk = (ph, amt = 1) => {
  const a = Math.sin(ph * 2 * Math.PI), up = Math.abs(Math.cos(ph * 2 * Math.PI));
  return {legL: .38 * a * amt, legR: -.38 * a * amt, kneeL: Math.max(0, -a) * .3 * amt, kneeR: Math.max(0, a) * .3 * amt,
    armL: -.35 * a * amt, armR: .35 * a * amt, lean: .05 * amt, bob: -up * 14 * amt, tilt: .03 * a * amt};
};
MD.run = (ph, amt = 1) => {
  const a = Math.sin(ph * 2 * Math.PI), up = Math.abs(Math.cos(ph * 2 * Math.PI));
  return {legL: .7 * a * amt, legR: -.7 * a * amt, kneeL: Math.max(0, -a) * .6 * amt, kneeR: Math.max(0, a) * .6 * amt,
    armL: .4 - .9 * a * amt, armR: .4 + .9 * a * amt, elbowL: .6, elbowR: .6, lean: .18 * amt, bob: -up * 34 * amt, sy: 1 + .06 * up * amt};
};
// Прыжок от t0 длиной d: присед (сжатие) → взлёт (растяжение) → верх → приземление (сжатие) → пружина.
MD.jump = (t, t0, d = .6, h = 160) => {
  const pre = .12, u = (t - t0 - pre) / d;
  if (t < t0) return {y: 0, sx: 1, sy: 1};
  if (u < 0) { const k = (t - t0) / pre; return {y: 0, sx: 1 + .12 * k, sy: 1 - .14 * k, armL: -.3 * k, armR: -.3 * k}; }
  if (u < 1) { const st = 1 + .14 * (1 - Math.abs(u * 2 - 1)) * (u < .5 ? 1 : .4); return {y: -h * 4 * u * (1 - u), sx: 1 / st, sy: st, armL: 2.2, armR: 2.2, legL: .3, legR: .3}; }
  const s = MD.spring(t, t0 + pre + d, 3, 7); return {y: 0, sx: 1 - s * .12, sy: 1 + s * .14};
};
// Испуг: подскок на месте с растяжением, руки вверх, глаза «вау».
MD.startle = (t, t0) => { const j = MD.jump(t, t0, .35, 70); return {...j, eyes: t > t0 && t < t0 + 1.2 ? 'wow' : undefined, brow: t > t0 && t < t0 + 1.4 ? 1 : 0}; };
// Смех: тело качается и подпрыгивает мелко, голова запрокинута, глаза-щёлочки.
MD.laugh = (t, amt = 1) => { const b = Math.abs(Math.sin(twos(t) * 9)); return {bob: -b * 10 * amt, tilt: -.12 * amt + .06 * Math.sin(twos(t) * 18), eyes: 'shut', sy: 1 + b * .03};
};

// ---------- авто-игра на реплике (навык perekladka, п. 9): голова и жест по звуку ----------
// Возвращает {tilt, brow, armX, bob} от энергии рта говорящего: кивок на открытых гласных, брови — в начале фразы.
MD.speech = (who, t) => {
  for (const v of MD.ep.voice || []) {
    if (v.who !== who) continue; const cues = MD.LIPS[v.id] || []; if (!cues.length) continue;
    const lt = t - v.at, end = cues[cues.length - 1].end;
    if (lt < -.25 || lt > end + .3) continue;
    const open = {X: 0, A: 0, B: .3, C: .6, D: 1, E: .7, F: .3, G: .2, H: .5}[MD.mouth(who, t)] || 0;
    const start = clamp(1 - Math.abs(lt) / .35), k = seg(lt, -.2, .1) * (1 - seg(lt, end, end + .3));
    return {tilt: .05 * Math.sin(lt * 5.3) * k + open * .03, brow: Math.max(start, k * .35), gest: k, bob: -open * 5, talking: k > .5};
  }
  return {tilt: 0, brow: 0, gest: 0, bob: 0, talking: false};
};

// ---------- актёр: кукла с опорой у ног, сжатием, тенью, дыханием и бумажной дрожью ----------
// a = {x, y (пол), s, flip, sx, sy, rot, alpha, shadow, blur:[dx,dy]}; st — поза куклы (pup.js) или st.pose — поза-замещение из листа поз.
const FEET = {proshka: 530, potap: 452, yosha: 262, tishka: 235, pelageya: 400, kolobok: 232, kot: 600, zven: 0};
const SEED = {proshka: 1, potap: 2, yosha: 3, tishka: 4, pelageya: 5, kolobok: 6, kot: 7, zven: 8};
MD.FEET = FEET;
// Позы-замещения: опорная поза листа (рост куклы в ней) и рост куклы в px листа деталей — чтобы поза была того же размера, что кукла.
const POSE_REF = {proshka: ['point', 980], potap: ['walk', 900], yosha: ['proud', 680], tishka: ['hush', 600], pelageya: ['whisper', 700], kot: ['tell', 960]};
MD.POSE_REF = POSE_REF;
MD.actor = (ctx, name, a, st = {}) => {
  const t = st.t ?? 0, s = a.s ?? 1, [bx, by] = MD.boil(t, SEED[name] || 9, .7), br = MD.breath(t + (SEED[name] || 0), .012, .3);
  if (a.shadow !== false && name !== 'zven') {   // тень на полу: прижимает куклу к земле, на прыжке — меньше и светлее
    const lift = clamp(-(st.bob || 0) / 400 - (a.lift || 0) / 400, 0, .8);
    ctx.save(); ctx.globalAlpha = (a.alpha ?? 1) * .28 * (1 - lift); ctx.fillStyle = '#0B0818';
    ctx.beginPath(); ctx.ellipse(a.x, a.y + 4, (a.shadowW || 170) * s * (1 - lift * .5), 22 * s * (1 - lift * .5), 0, 0, 7); ctx.fill(); ctx.restore();
  }
  const draw = (dx, dy, alpha) => {
    ctx.save(); if (alpha != null) ctx.globalAlpha *= alpha;
    ctx.translate(a.x + bx + dx, a.y + by + dy + (st.bob || 0) * s - (a.lift || 0));
    if (a.rot) ctx.rotate(a.rot);
    ctx.scale(s * (a.flip ? -1 : 1) * (st.sx ?? 1), s * br * (st.sy ?? 1));
    if (st.pose) {   // замещение: целая поза из листа поз (ChatGPT) вместо куклы — ступни на опоре, рост как у куклы
      let k = 'p_' + st.pose; if (!MD.SPR[name + '/' + k]) k = MD.SPR[name + '/p_run0'] && /walk|run/.test(k) ? 'p_run0' : 'p_' + POSE_REF[name][0];   // нет такой позы — ближайшая
      const ref = MD.SPR[name + '/p_' + POSE_REF[name][0]];
      const ps = POSE_REF[name][1] / ref.height * (st.poseS ?? 1);
      if (st.rotP) ctx.rotate(st.rotP);
      MD.spr(ctx, name + '/' + k, 0, 0, {s: ps, ax: st.poseAx ?? .5, ay: 1, flip: st.poseFlip});
    } else { ctx.translate(0, -FEET[name]); MD.pup[name](ctx, st); }
    ctx.restore();
  };
  if (a.alpha != null) { ctx.save(); ctx.globalAlpha *= a.alpha; }
  if (a.blur) for (let i = 3; i >= 1; i--) draw(-a.blur[0] * i / 3, -a.blur[1] * i / 3, .18);
  draw(0, 0);
  if (a.alpha != null) ctx.restore();
};

// ---------- параллакс: слои с глубиной d (1 — план действия, 0 — небо, >1 — передний план) ----------
// cam = {x, y, z, r, shake}; draw(ctx) рисует слой в его координатах; чем меньше d, тем меньше слой ездит за камерой.
MD.layer = (ctx, t, cam, d, draw) => {
  ctx.save();
  const s = cam.shake || 0, sx = s ? (Math.sin(t * 91) + Math.sin(t * 57)) * s : 0, sy = s ? (Math.cos(t * 83) + Math.sin(t * 61)) * s : 0;
  const z = 1 + ((cam.z ?? 1) - 1) * d;
  ctx.translate(MD.W / 2 + sx * d, MD.H / 2 + sy * d); ctx.rotate((cam.r || 0) * d); ctx.scale(z, z);
  ctx.translate(-(MD.W / 2 + ((cam.x ?? MD.W / 2) - MD.W / 2) * d), -(MD.H / 2 + ((cam.y ?? MD.H / 2) - MD.H / 2) * d));
  draw(ctx); ctx.restore();
};
// Камера по ключам с «ударом»: cam.kick = [t0, сила] — короткий толчок масштаба и тряска (столкновение, хлопок).
MD.cam = (t, keys, kicks = []) => {
  const c = {...MD.K(t, keys)};
  for (const [t0, f] of kicks) { if (t < t0 || t > t0 + .6) continue; const k = Math.exp(-(t - t0) * 9); c.z = (c.z ?? 1) * (1 + .05 * f * k); c.shake = (c.shake || 0) + 14 * f * k; }
  return c;
};

// ---------- частицы и свет ----------
MD.dust = (ctx, t, t0, x, y, n = 8, col = 'rgba(240,225,200,.8)') => {   // облачко пыли при приземлении и ударе
  const u = seg(t, t0, t0 + .6); if (u <= 0 || u >= 1) return; const R = MD.rng(Math.round(t0 * 100) + x);
  ctx.save(); ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { const a = Math.PI + R() * Math.PI, sp = 60 + R() * 120; ctx.globalAlpha = (1 - u) * .8;
    ctx.beginPath(); ctx.arc(x + Math.cos(a) * sp * u * 1.6, y + Math.sin(a) * sp * u * .6, (10 + R() * 14) * (1 + u), 0, 7); ctx.fill(); }
  ctx.restore();
};
MD.burst = (ctx, t, t0, x, y, col = '#FFE6A0', n = 14, r = 220, d = .5) => {   // искры-лучи: удар, вспышка, «дзинь»
  const u = seg(t, t0, t0 + d); if (u <= 0 || u >= 1) return; const R = MD.rng(Math.round(t0 * 37) + n);
  ctx.save(); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.shadowColor = col; ctx.shadowBlur = 12;
  for (let i = 0; i < n; i++) { const a = R() * 6.283, r0 = r * u * (.5 + R() * .5), r1 = r0 * (.6 + .3 * u); ctx.globalAlpha = 1 - u; ctx.lineWidth = 6 * (1 - u) + 1;
    ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); ctx.lineTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); ctx.stroke(); }
  ctx.restore();
};
MD.fireflies = (ctx, t, seed, n, box, col = 'rgba(255,220,120,') => {
  const R = MD.rng(seed); ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const x = box[0] + R() * box[2] + Math.sin(t * (.4 + R()) + i) * 30, y = box[1] + R() * box[3] + Math.cos(t * (.3 + R()) + i * 2) * 24, f = .5 + .5 * Math.sin(t * (2 + R() * 3) + i);
    const g = ctx.createRadialGradient(x, y, 0, x, y, 18); g.addColorStop(0, col + (.9 * f) + ')'); g.addColorStop(1, col + '0)'); ctx.fillStyle = g; ctx.fillRect(x - 18, y - 18, 36, 36); }
  ctx.restore();
};
// Свет сцены: тёплый/холодный тон поверх кадра (multiply) и блик (screen).
MD.grade = (ctx, col, a = .25, op = 'multiply') => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = op; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore(); };
// Иней растёт от края по маске: ветвистые кристаллы, k — 0…1.
MD.frostGrow = (ctx, k, seed, x0, y0, dir, len = 300, n = 9) => {
  if (k <= 0) return; const R = MD.rng(seed); ctx.save(); ctx.strokeStyle = 'rgba(225,250,255,.85)'; ctx.shadowColor = '#9FF6FF'; ctx.shadowBlur = 8; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const a = dir + (R() - .5) * 1.4, L = len * (.5 + R() * .5) * k, x = x0 + (R() - .5) * 60, y = y0 + (R() - .5) * 60;
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); ctx.stroke();
    for (let b = 1; b < 5; b++) { const bx = x + Math.cos(a) * L * b / 5, by = y + Math.sin(a) * L * b / 5, bl = L * .22 * (1 - b / 6); ctx.lineWidth = 2;
      for (const sgn of [-1, 1]) { ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(a + sgn * .8) * bl, by + Math.sin(a + sgn * .8) * bl); ctx.stroke(); } } }
  ctx.restore();
};
// Стая ворон Кощея (vorony/: fly0…fly3 — взмах на двойках, dive — пике): n птиц вокруг (cx, cy), разлёт spread.
MD.crows = (ctx, t, cx, cy, n = 6, s = 1, spread = 160, seed = 3, flip = false, dive = false) => {
  const R = MD.rng(seed);
  for (let i = 0; i < n; i++) { const ox = (R() - .5) * spread * 2, oy = (R() - .5) * spread, ph = R() * 6, sc = .8 + R() * .4;
    const x = cx + ox + Math.sin(t * 2 + ph) * 30, y = cy + oy + Math.cos(t * 2.6 + ph) * 22;
    const k = dive ? 'dive' : 'fly' + (Math.floor(t * 12 + ph * 4) % 4);
    MD.spr(ctx, 'vorony/' + k, x, y, {s: s * sc * .9, flip, rim: 'rgba(159,246,255,.35)', rimBlur: 8}); }
};
})();
// Цикл поз-замещений: base + номер кадра (run0…run3), rate — поз в секунду (12 — «на двойках»).
MD.cycle = (t, base, n = 4, rate = 12) => base + (Math.floor(t * rate) % n + n) % n;
