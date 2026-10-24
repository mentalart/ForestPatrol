// Серия 1 «Звенышко», четвёртая редакция (9:16) — сценарий zlataya_cep/docs/51_ser01_v4_plan.md, ритм — аниматик
// (tools/mult2d/animatic.py, раскадровка art/ser01v4/sb/), материал — стайл-фреймы art/ser01v4/ (плоский коллаж из бумаги и фетра).
// Этот файл — общее: длины записей, реплики, сборка планов, свет сцены, декорации. Сцены — s4_1.js … s4_4.js (порядок файлов = порядок
// сцен), серия — MD.eps.ser01v4. План — S.shot(длина, рисунок(ctx, t, lt, L), реплики [[id, сдвиг]], переход).
'use strict';
(() => {
const {seg, ease, clamp, twos} = MD, SP = MD.spr;

// ---------- длины записей (с), voice/ser01/ser01_1NN.wav ----------
const DUR = {101: 2.5, 102: 1.83, 103: 1.42, 104: 2.14, 105: 2.79, 106: 2.78, 107: 5.8, 108: 4.77, 109: 3.32, 110: 5.25, 111: 3.29,
  112: 2.27, 113: 0.55, 114: 1.65, 115: 2.01, 116: 2.1, 117: 1.42, 118: 1.11, 119: 1.53, 120: 3.06, 121: 2.37, 122: 2.21, 123: 2.56,
  124: 2.92, 125: 1.31, 126: 2.42, 127: 2.94, 128: 1.8, 129: 5.09, 130: 4.29, 131: 3.3, 132: 0.73, 133: 0.42, 134: 5.46, 135: 2.55,
  136: 4.2, 137: 4.0, 138: 2.39, 139: 2.23, 140: 2.88, 141: 2.04};
const WHO = {proshka: ['Прошка', '#FFA05C'], potap: ['Потап', '#E9C08A'], yosha: ['Йоша', '#6FE0D0'], pelageya: ['Пелагея', '#CDA8FF'],
  tishka: ['Тишка', '#FFC2A0'], zven: ['Звенышко', '#FFD75E'], koschei: ['Кощей', '#9FF6FF']};
const LINES = {
  101: ['proshka', 'Тревога! Патруль — на выход!'], 102: ['proshka', 'Хэк! Щас рекорд будет!'], 103: ['potap', 'Всех донесу! Разом!'],
  104: ['yosha', 'Без помощи! Смотрите!'], 105: ['pelageya', 'Я тут… уже давно.'], 106: ['proshka', 'Две минуты сорок! Позор, патруль!'],
  107: ['pelageya', 'Журнал патруля. Запись сорок вторая. Учебная тревога.', 1], 108: ['pelageya', 'Кто пришёл первым — опять никто не заметил.', 1],
  109: ['proshka', 'Пелагея — дежурная. Ты всё равно тихо сидишь.'], 110: ['pelageya', 'Запись сорок третья. Над морем что-то порвалось. Я это слышала.', 1],
  111: ['pelageya', 'Ребята… над морем вспыхнуло.'], 112: ['proshka', 'Дежурная докладывает громко и чётко!'], 113: ['pelageya', 'Ух!'],
  114: ['yosha', 'Ух! Совиная тревога!'], 115: ['pelageya', 'Кто-то летит. Много.'], 116: ['potap', 'Это у меня в животе летит. Есть хочу.'],
  117: ['zven', 'Помоги-и-ите…'], 118: ['pelageya', 'Там кто-то плачет.'], 119: ['yosha', 'Это Тишка храпит.'],
  120: ['pelageya', 'Запись сорок четвёртая. Значит, сама.', 1], 121: ['zven', 'Дзинь! Цепь… дуб… Ко… Ко…'], 122: ['potap', 'Ко-ко? Курица, что ли?'],
  123: ['zven', 'Ко-щей! Порвал! Всё по-рва-лось!'], 124: ['proshka', 'Говорящая гайка. Научно невозможно.'], 125: ['zven', 'Сам ты гайка!'],
  126: ['yosha', 'Чур, я держу! Я аккуратно!'], 127: ['tishka', 'Блестяшка… моя…'], 128: ['pelageya', 'Не кричи. Покажи.'],
  129: ['zven', 'Кот сказки сказывал — цепь звенела. Пришла тень — цепь не стерпела.'], 130: ['zven', 'Звенья — врассыпную… А Кот замолчал. Камнем стал.'],
  131: ['proshka', 'Хэк! Длинный, как жердь! Кощей-жердей!'], 132: ['proshka', 'Тре…'], 133: ['pelageya', 'Тсс.'],
  134: ['pelageya', 'Спи, бельчонок, тише-тише… Сказку ветер не услышит.'], 135: ['proshka', '…Сорок секунд. Рекорд.'],
  136: ['potap', 'Пелагея… ты ведь всё слышала. С самого начала?'], 137: ['pelageya', 'Запись сорок пятая. Первый настоящий вызов.'],
  138: ['pelageya', 'Собрать цепь. Разбудить Кота.'], 139: ['proshka', 'Камень будить? Научно…'], 140: ['zven', 'Дзинь! Ещё как научно! К морю!'],
  141: ['koschei', 'И тут… смеются.'],
};

// ---------- сборка: план не короче своих реплик ----------
const SHOTS = [], VOICE = [], SUBS = [], TRANS = [], CUES = [];
let T = 0;
const id = n => 'ser01_' + n;
const shot = (len, draw, lines = [], tr = null) => {
  const a = T; for (const [n, off] of lines) len = Math.max(len, off + DUR[n] + .25);
  T += len; const s = {a, b: T, len, draw: (ctx, t) => draw(ctx, t, t - a, len)};
  SHOTS.push(s);
  for (const [n, off] of lines) { const [who, text, vo] = LINES[n], [name, color] = WHO[who];
    VOICE.push({id: id(n), who: vo ? 'vo' : who, at: a + off}); SUBS.push({a: a + off, b: Math.min(a + off + DUR[n] + .4, T + .35), who: vo ? name + ' · журнал' : name, color, text}); }
  if (tr) TRANS.push({at: a, ...tr});
  return s;
};
const D = n => DUR[n];
// Звуковая метка: cue(план, время в плане, имя) → ep.cues → timeline.json → audio_s4.py.
const cue = (s, lt, name) => { CUES.push({t: +(s.a + lt).toFixed(3), name}); return s; };

// ---------- свет сцены на куклах (арт-дирекшен v4: герой освещён светом сцены и стоит на тени) ----------
// LIGHT[имя] — фильтр холста для кукол: тёплая лампа, ночь, ледяная тишина, янтарь театра.
const LIGHT = {
  warm: 'sepia(.18) saturate(1.12) brightness(1.02)',
  lamp: 'sepia(.3) saturate(1.2) brightness(1.05)',
  night: 'brightness(.78) saturate(.85) hue-rotate(-8deg)',
  ice: 'brightness(.62) saturate(.55) hue-rotate(-18deg) contrast(1.05)',
  amber: 'sepia(.42) saturate(1.3) brightness(.98)',
  dawn: 'sepia(.22) saturate(1.15) brightness(1.06)',
};
// Говорящий: рот по меткам, моргание, авто-игра по звуку поверх позы.
const play = (who, t, st = {}) => {
  const sp = MD.speech(who, t), blink = MD.blinkAuto(t, who.length * 7 + 1);
  return {t, ...st, mouth: st.mouth ?? MD.mouth(who, t), eyes: blink && !st.noBlink ? 'shut' : st.eyes,
    brow: Math.max(st.brow || 0, sp.brow), tilt: (st.tilt || 0) + sp.tilt, bob: (st.bob || 0) + sp.bob,
    armR: (st.armR || 0) + (st.gest === false ? 0 : sp.gest * (.35 + .25 * Math.sin(twos(t) * 3.1)))};
};
// Актёр в свете сцены: a.light — ключ LIGHT; a.rim — контровой свет цветом источника.
const A = (ctx, name, a, st = {}) => {
  ctx.save(); const f = LIGHT[a.light]; if (f) ctx.filter = f;
  if (a.rim) { ctx.shadowColor = a.rim; ctx.shadowBlur = a.rimBlur ?? 22; }
  MD.actor(ctx, name, a, {t: st.t ?? 0, ...st}); ctx.restore();
};
// Слушает: моргает, дышит, смотрит на говорящего (look), реагирует (st поверх).
const listen = (who, t, st = {}) => ({t, mouth: 'X', eyes: MD.blinkAuto(t, who.length * 11 + 3) ? 'shut' : st.eyes, ...st});
const grain = (ctx, a = .22) => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a; ctx.fillStyle = MD.grain(ctx); ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore(); };
const vignette = (ctx, a = .38, col = '10,8,20') => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const g = ctx.createRadialGradient(540, 900, 520, 540, 960, 1260); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore(); };
const flash = (ctx, t, t0, d = .35, col = '255,246,220') => { const u = seg(t, t0, t0 + d); if (u > 0 && u < 1) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(${col},${(1 - u) * .9})`; ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore(); } };

// ---------- фон-картина v4 на весь кадр (ChatGPT, 1024×1536): чуть крупнее кадра, глубина d — параллакс с героями (d = 1) ----------
// Координаты мира: картина вписана по высоте с запасом o.s (1.08) — 1 px картины = 1920·1.08/1536 = 1.35 px мира; центр (540, 960).
const PK = 1920 * 1.08 / 1536;
const plate = (ctx, t, cam, key, d = .92, o = {}) => MD.layer(ctx, t, cam, d, c => {
  const im = MD.SPR['bg/' + key], s = (o.s ?? 1.08) * MD.H / im.height;
  SP(c, 'bg/' + key, o.x ?? 540, o.y ?? 960, {s, shadow: 0, alpha: o.alpha});
  if (o.over) o.over(c);
});
// Точка картины (px исходника 1024×1536) → мир, при s = 1.08 и центре (540, 960).
const at = (px, py) => [540 + (px - 512) * PK, 960 + (py - 768) * PK];
// Тёплый свет лампы/фонаря — мягкое пятно (lighter) и холодный ночной тон.
const glowAt = (c, x, y, r, a = .35, col = '255,190,90') => MD.radial(c, x, y, r, `rgba(${col},${a})`);
// Звенышко: живое колечко с глазами (pup.zven), хвост золотой нити.
const zven = (ctx, x, y, s = .5, st = {}) => { ctx.save(); ctx.translate(x, y); MD.pup.zven(ctx, {s, glow: .8, ...st}); ctx.restore(); };
const trail = (c, pts, a = 1) => { if (pts.length < 2) return; const p = new Path2D(); p.moveTo(pts[0][0], pts[0][1]); for (const q of pts.slice(1)) p.lineTo(q[0], q[1]); MD.glow(c, p, '#F0C04A', 4, 14, a); };
// Золотые буквы сыплются из сломанной речи Звенышка (сказки забываются).
const letters = (c, t, x, y, seed, n = 7) => { const R = MD.rng(seed), A = 'СКАЗКАЦЕПЬДУБ';
  c.save(); c.font = `48px ${MD.FONT.display}`; c.textAlign = 'center';
  for (let i = 0; i < n; i++) { const ph = (t * .6 + R()) % 1, xx = x + (R() - .5) * 260 + Math.sin(t * 2 + i) * 20, yy = y - 80 + ph * 420;
    c.globalAlpha = (1 - ph) * .9; c.fillStyle = '#F0C04A'; c.shadowColor = '#FFD75E'; c.shadowBlur = 10;
    c.save(); c.translate(xx, yy); c.rotate((R() - .5) * 2 + ph * 3); c.fillText(A[i % A.length], 0, 0); c.restore(); }
  c.restore(); };

// Реквизит v4 (sprites/props4/<имя>, лист art/props4/sheet.png); пока спрайта нет — бумажная заглушка того же размера.
const prop = (c, name, x, y, o = {}) => {
  const AL = {lamp: 'lantern', hammock_l: 'hammock', hammock_r: 'hammock', notebook_closed: 'notebook'};
  const k = 'props4/' + (AL[name] || name);
  if (MD.SPR[k]) return SP(c, k, x, y, {shadow: .6, ...o});
  const w = o.w || 120; c.save(); c.translate(x, y); if (o.rot) c.rotate(o.rot);
  if (name === 'lever') { MD.paper(c, MD.P(`M-12,0 L12,0 L8,${-w} L-8,${-w}Z`), '#6A4A2E', {shadow: .5}); MD.paper(c, MD.circle(0, -w, w * .14), '#C8322A', {shadow: .5}); }
  else if (name === 'cone') { for (let i = 0; i < 4; i++) MD.paper(c, MD.ellipse(0, -w * .3 + i * w * .2, w * (.28 - i * .04), w * .14), i % 2 ? '#7A4A2A' : '#9A5E34', {shadow: .4}); }
  else MD.paper(c, MD.P(`M${-w / 2},${-w * .3} L${w / 2},${-w * .3} L${w / 2},${w * .3} L${-w / 2},${w * .3}Z`), '#B8794A', {shadow: .5});
  c.restore();
};
MD.s4prop = prop;
// Силуэт теневого театра (sprites/sil4/<имя>, лист art/sil4/sheet.png) — чёрная бумага; заглушка — простая фигура.
const SIL = {
  oak: 'M-40,0 L-30,-420 C-260,-430 -330,-620 -200,-720 C-160,-900 160,-900 200,-720 C330,-620 260,-430 30,-420 L40,0Z',
  cat: 'M-40,0 L-30,-160 C-60,-200 -60,-260 -30,-280 L-40,-320 L-15,-300 L15,-300 L40,-320 L30,-280 C60,-260 60,-200 30,-160 L40,0Z',
  cat_stone: 'M-40,0 L-30,-160 C-60,-200 -60,-260 -30,-280 L-40,-320 L-15,-300 L15,-300 L40,-320 L30,-280 C60,-260 60,-200 30,-160 L90,-260 L100,-250 L40,-120 L40,0Z',
  koschei: 'M-30,0 L-20,-520 L-50,-560 L-30,-640 L-20,-600 L-10,-660 L0,-610 L10,-660 L20,-600 L30,-640 L50,-560 L20,-520 L30,0Z',
  koschei_reach: 'M-30,0 L-20,-520 L-50,-560 L-30,-640 L-20,-600 L-10,-660 L0,-610 L10,-660 L20,-600 L30,-640 L50,-560 L20,-520 L-160,-420 L-170,-400 L20,-470 L30,0Z',
  crow: 'M-60,0 C-30,-30 30,-30 60,0 C30,-10 -30,-10 -60,0Z',
};
const sil = (c, name, x, y, o = {}) => {
  const k = 'sil4/' + name; c.save(); c.globalAlpha *= o.alpha ?? 1;
  if (MD.SPR[k]) { const im = MD.SPR[k], sc = (o.h || 600) / im.height;
    if (o.col) {   // перекраска силуэта (Кот каменеет): временный холст, цвет поверх формы
      const tc = sil.tc || (sil.tc = document.createElement('canvas')); tc.width = im.width; tc.height = im.height; const g = tc.getContext('2d');
      g.clearRect(0, 0, tc.width, tc.height); g.drawImage(im, 0, 0); g.globalCompositeOperation = 'source-atop'; g.fillStyle = o.col; g.fillRect(0, 0, tc.width, tc.height);
      c.save(); c.translate(x, y); if (o.rot) c.rotate(o.rot); if (o.flip) c.scale(-1, 1); c.drawImage(tc, -im.width * sc / 2, -im.height * sc, im.width * sc, im.height * sc); c.restore(); }
    else SP(c, k, x, y, {shadow: 0, ay: 1, s: sc, rot: o.rot, flip: o.flip});
    c.restore(); return; }
  c.translate(x, y); if (o.rot) c.rotate(o.rot); const s = (o.h || 600) / 700; c.scale(o.flip ? -s : s, s);
  c.fillStyle = o.col || '#120C10'; c.fill(MD.P(SIL[name] || SIL.cat)); c.restore();
};
MD.s4sil = sil;
// «Z-z-z» спящего.
const zzz = (c, t, x, y) => { c.save(); c.font = `52px ${MD.FONT.display}`; c.fillStyle = 'rgba(255,246,230,.85)';
  for (let i = 0; i < 3; i++) { const u = (t * .5 + i / 3) % 1; c.globalAlpha = Math.sin(u * Math.PI); c.fillText('z', x + u * 60 + i * 8, y - u * 160); } c.restore(); };
// Почерк в журнале: строки прорисовываются по ходу записи (dur — длина голоса).
const writing = (c, t, lt, x, y, w, lines, dur) => { c.save(); MD.paper(c, MD.P(`M${x - 30},${y - 120} L${x + w + 40},${y - 130} L${x + w + 50},${y + lines.length * 90 + 20} L${x - 20},${y + lines.length * 90 + 30}Z`), '#F6EBD2', {shadow: .3}); c.font = `54px ${MD.FONT.body}`; c.fillStyle = '#3A2A3A'; c.textBaseline = 'alphabetic';
  lines.forEach((ln, i) => { const k = seg(lt, .3 + i * dur / lines.length, .3 + (i + 1) * dur / lines.length); if (k <= 0) return;
    c.save(); c.beginPath(); c.rect(x, y + i * 90 - 70, w * k * 1.1, 100); c.clip(); c.fillText(ln, x, y + i * 90); c.restore(); });
  c.restore(); };

MD.s4 = {prop, zzz, writing, all: SHOTS, DUR, LINES, WHO, shot, cue, D, play, listen, A, LIGHT, grain, vignette, flash, plate, at, PK, glowAt, zven, trail, letters};
let EP = null;
Object.defineProperty(MD.eps, 'ser01v4', {configurable: true, enumerable: true, get: () => EP || (EP = {dur: T, subBottom: .975, shots: SHOTS, trans: TRANS,
  voiceDir: 'voice/ser01', voice: VOICE, subs: SUBS, cues: CUES, post(ctx) { vignette(ctx, .3); grain(ctx, .12); }})});
})();
