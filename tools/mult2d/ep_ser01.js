// Серия 1 «Звенышко» (9:16) — сценарий zlataya_cep/docs/49_ser01_zvenyshko.md, стиль — docs/47_mult2d_stil.md.
// Этот файл — общее для серии: длины записей, реплики, сборка планов, декорации и приёмы. Сцены — ser01_1.js … ser01_4.js
// (порядок файлов = порядок сцен), последний собирает MD.eps.ser01. Анимация — по ключам (anim.js: MD.K, MD.actor, MD.layer).
// План — S.shot(длина, рисунок(ctx, t, lt, L), реплики [[id, сдвиг]], переход): план не короче своих реплик,
// время планов и реплик считается само (DUR — длины записей: python3 tools/mult2d/voice_post.py ser01 dur).
'use strict';
(() => {
const {seg, ease, clamp, twos, PAL} = MD, SP = MD.spr;

// ---------- длины записей (с) ----------
const DUR = {
  ser01_001: 4.71, ser01_002: 2.56, ser01_003: 1.82, ser01_004: 3.02, ser01_005: 0.78, ser01_006: 2.95, ser01_007: 2.57, ser01_008: 1.98,
  ser01_009: 1.26, ser01_010: 1.21, ser01_011: 0.74, ser01_012: 1.37, ser01_013: 1.22, ser01_014: 4.42, ser01_015: 4.39, ser01_016: 3.6,
  ser01_017: 1.74, ser01_018: 1.38, ser01_019: 2.1, ser01_020: 5.25, ser01_021: 2.6, ser01_022: 0.74, ser01_023: 0.55, ser01_024: 1.0,
  ser01_025: 0.78, ser01_026: 3.21, ser01_027: 2.0, ser01_028: 1.92, ser01_029: 2.37, ser01_030: 3.23, ser01_031: 1.75, ser01_032: 1.4,
  ser01_033: 0.86, ser01_034: 2.13, ser01_035: 2.27, ser01_036: 1.85, ser01_037: 1.96, ser01_038: 4.68, ser01_039: 1.77, ser01_040: 3.29,
  ser01_041: 0.92, ser01_042: 0.53, ser01_043: 1.8, ser01_044: 2.16, ser01_045: 1.23,
};
const WHO = {kot: ['Кот Учёный', '#F0C04A'], koschei: ['Кощей', '#9FF6FF'], kolobok: ['Колобок', '#FFD27A'], proshka: ['Прошка', '#FFA05C'],
  potap: ['Потап', '#E9C08A'], yosha: ['Йоша', '#6FE0D0'], pelageya: ['Пелагея', '#CDA8FF'], tishka: ['Тишка', '#FFC2A0'], zven: ['Звенышко', '#FFD75E']};
const LINES = {
  ser01_001: ['kot', '…а Кощей, как водится, — проиграл. Тут и сказке конец!'], ser01_002: ['koschei', '(тихо) Как водится… проиграл.'],
  ser01_003: ['kot', 'А теперь — колыбельная…'], ser01_004: ['kot', '♪ Баю-баю, за рекою, серый волк живёт… ♪'],
  ser01_005: ['koschei', 'Довольно.'], ser01_006: ['kolobok', 'Я от бабушки ушёл — а от тучи — укачусь!'],
  ser01_007: ['kot', 'Кто там?! Тебя сюда не звали!'], ser01_008: ['kot', 'Разлетелись звенья по свету —'],
  ser01_009: ['kot', 'В лес дремучий…'], ser01_010: ['kot', '…в Китеж подводный…'], ser01_011: ['kot', '…за облака…'],
  ser01_012: ['kot', '…за огненную реку…'], ser01_013: ['kot', '…на остров Буян.'],
  ser01_014: ['kot', 'Без цепи сказки забываются — слово за словом рассыпаются.'],
  ser01_015: ['kot', 'А в дремучем лесу, на сосне, светит штаб огоньком в окне.'],
  ser01_016: ['kot', 'Четверо друзей там живут — Лесным патрулём их зовут.'],
  ser01_017: ['proshka', 'Сказки — сказками, а техника — вещь!'], ser01_018: ['potap', 'Держу-держу. Хо-хо!'],
  ser01_019: ['yosha', 'Сам вырастил! Я сам!'], ser01_020: ['pelageya', '(шёпотом) В некотором царстве… нет, не так…'],
  ser01_021: ['tishka', 'Сказку! Кто мне сказку на ночь?'], ser01_022: ['proshka', 'Чур, я!'], ser01_023: ['potap', 'Я!'],
  ser01_024: ['yosha', 'Нет, я сам!'], ser01_025: ['pelageya', '(шёпотом) …и я.'], ser01_026: ['pelageya', '(шёпотом) Ой… летит… к нам!'],
  ser01_027: ['tishka', '♪ Баю-баю, за рекою… ♪'], ser01_028: ['tishka', 'Дальше слов не помню я…'],
  ser01_029: ['proshka', 'Колыбельные — для малых, не для нас, для удалых!'], ser01_030: ['proshka', 'Хочешь — дам самокат, дружок? Он получше всяких строк!'],
  ser01_031: ['yosha', 'Ха-ха-ха! Вот так дела!'], ser01_032: ['potap', 'Хо-хо-хо!'], ser01_033: ['tishka', 'Хи-хи-хи!'],
  ser01_034: ['proshka', 'Ха-ха! Вот это я прокатился!'], ser01_035: ['zven', 'Дзинь-дзинь! За мной — бегом!'],
  ser01_036: ['kot', 'Кто соберёт звено к звену?'], ser01_037: ['kot', 'Кто сказку вспомнит — не одну?'],
  ser01_038: ['kot', 'Это присказка, не сказка. Сказка — будет впереди!'], ser01_039: ['koschei', 'Сказок больше не бывать.'],
  ser01_040: ['kot', 'Стоп-стоп-стоп! Это из середины. Начнём по порядку…'], ser01_041: ['kot', 'Не отдам!'],
  ser01_042: ['pelageya', 'Летит!'], ser01_043: ['zven', 'Спрячьте! Спрячьте меня!'], ser01_044: ['potap', 'Пелагея… ты ведь первая увидела?'],
  ser01_045: ['yosha', 'Ведёшь — ты!'],
};

// ---------- сборка ----------
const SHOTS = [], VOICE = [], SUBS = [], TRANS = [];
let T = 0;
const shot = (len, draw, lines = [], tr = null) => {
  const a = T; for (const [id, off] of lines) len = Math.max(len, off + DUR[id] + .3);
  T += len; const s = {a, b: T, len, draw: (ctx, t) => draw(ctx, t, t - a, len)};
  SHOTS.push(s);
  for (const [id, off] of lines) { const [who, text] = LINES[id], [name, color] = WHO[who];
    VOICE.push({id, who, at: a + off}); SUBS.push({a: a + off, b: Math.min(a + off + DUR[id] + .45, T + .4), who: name, color, text}); }
  if (tr) TRANS.push({at: a, ...tr});
  return s;
};
const D = id => DUR[id];
// Звуковые метки: cue(план, время в плане, имя) → ep.cues → out/ser01/timeline.json → audio_ser01.py (удар, «дзинь», шорох — на кадре действия).
const CUES = [];
const cue = (s, lt, name) => { CUES.push({t: +(s.a + lt).toFixed(3), name}); return s; };

// ---------- приёмы ----------
// Поза говорящего: рот по Rhubarb, моргание, авто-игра по звуку (голова, брови, жест) поверх заданной позы.
const play = (who, t, st = {}) => {
  const sp = MD.speech(who, t), blink = MD.blinkAuto(t, who.length * 7 + 1);
  return {t, ...st, mouth: st.mouth ?? MD.mouth(who, t), eyes: blink && !st.noBlink ? 'shut' : st.eyes,
    brow: Math.max(st.brow || 0, sp.brow), tilt: (st.tilt || 0) + sp.tilt, bob: (st.bob || 0) + sp.bob,
    armR: (st.armR || 0) + (st.gest === false ? 0 : sp.gest * (.35 + .25 * Math.sin(twos(t) * 3.1)))};
};
const A = (ctx, name, a, st) => MD.actor(ctx, name, a, st);
const grain = (ctx, a = .3) => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a; ctx.fillStyle = MD.grain(ctx); ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore(); };
const vignette = (ctx, a = .45, col = '10,8,20') => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const g = ctx.createRadialGradient(540, 900, 500, 540, 960, 1250); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore(); };
const flash = (ctx, t, t0, d = .35, col = '255,246,220') => { const u = seg(t, t0, t0 + d); if (u > 0 && u < 1) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(${col},${1 - u})`; ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore(); } };
const spark = (ctx, x, y, s = .16, r = 0, trail = null, glow = 1) => {   // искра-звено с хвостом кометы
  if (trail) for (let i = 1; i <= 14; i++) { const p = trail(i * .025); if (p) MD.radial(ctx, p[0], p[1], (40 - i * 2.2) * s / .16, `rgba(255,214,110,${(.34 - i * .022) * glow})`); }
  MD.radial(ctx, x, y, 150 * s / .16, `rgba(255,230,150,${.75 * glow})`);
  ctx.save(); ctx.translate(x, y); MD.pup.zven(ctx, {s, r, face: false}); ctx.restore();
};
const zvenFace = (ctx, x, y, s, st = {}) => { ctx.save(); ctx.translate(x, y); MD.pup.zven(ctx, {s, glow: .7, ...st}); ctx.restore(); };
const lightning = (ctx, t, x0, y0, n = 2, len = 6) => {
  const R = MD.rng(Math.floor(t * 12) + Math.round(x0)); ctx.save(); ctx.strokeStyle = 'rgba(200,245,255,.95)'; ctx.shadowColor = PAL.ice; ctx.shadowBlur = 18; ctx.lineWidth = 4;
  for (let k = 0; k < n; k++) { let x = x0, y = y0; ctx.beginPath(); ctx.moveTo(x, y); for (let s = 0; s < len; s++) { x += (R() - .5) * 140; y += 50 + R() * 70; ctx.lineTo(x, y); } ctx.stroke(); }
  ctx.restore();
};
const ribbon = (ctx, txt, color, k, y = 260) => {   // лента с именем героя (экранные координаты)
  if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const w = 470 * ease.back(clamp(k)); ctx.translate(540, y); ctx.rotate(-.04);
  MD.paper(ctx, MD.P(`M${-w / 2},-46 L${w / 2},-46 L${w / 2 - 28},0 L${w / 2},46 L${-w / 2},46 L${-w / 2 + 28},0 Z`), color, {shadow: .8});
  ctx.globalAlpha = clamp(k * 2 - 1); ctx.fillStyle = PAL.ink; ctx.font = `58px ${MD.FONT.display}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 4); ctx.restore();
};

// Слушатели у костра — бумажные зверята-однодетальки: зайчонок, бельчонок, ежонок. st.sleep 0…1, st.laugh, st.fall (угол).
const kid = (ctx, kind, x, y, s, st = {}) => {
  const t = st.t || 0, sl = st.sleep || 0, lb = st.laugh ? Math.abs(Math.sin(twos(t) * 10 + x)) * 8 : 0;
  ctx.save(); ctx.translate(x, y - lb); ctx.rotate((st.fall || 0) + sl * .18 * (Math.round(x) % 2 ? 1 : -1)); ctx.scale(s, s * (1 - sl * .06));
  const col = {bunny: '#D9D2C6', squirrel: '#E07A3A', hedgehog: '#7A5A44'}[kind], belly = {bunny: '#F4EEE3', squirrel: '#F6D9B0', hedgehog: '#E9C99C'}[kind];
  ctx.fillStyle = 'rgba(10,8,24,.25)'; ctx.beginPath(); ctx.ellipse(0, 4, 60, 12, 0, 0, 7); ctx.fill();
  if (kind === 'squirrel') MD.paper(ctx, MD.P('M30,-20 C90,-40 110,-130 60,-150 C30,-160 20,-120 40,-100 C60,-80 40,-50 20,-40Z'), '#C9622A', {shadow: .5});
  if (kind === 'hedgehog') MD.paper(ctx, MD.P('M-62,0 L-70,-30 L-55,-38 L-60,-62 L-38,-62 L-34,-86 L-12,-78 L0,-98 L14,-78 L36,-86 L38,-62 L60,-62 L55,-38 L70,-30 L62,0Z'), '#4A3528', {shadow: .5});
  MD.paper(ctx, MD.ellipse(0, -36, 46, 40), col, {shadow: .6});
  MD.paper(ctx, MD.ellipse(0, -28, 26, 24), belly, {shadow: .2});
  if (kind === 'bunny') for (const sx of [-1, 1]) { ctx.save(); ctx.translate(sx * 16, -100); ctx.rotate(sx * (.15 + sl * .9) + Math.sin(t * 3 + x) * .05); MD.paper(ctx, MD.ellipse(0, -30, 11, 36), col, {shadow: .4}); MD.paper(ctx, MD.ellipse(0, -28, 5, 24), '#F2B8B0', {shadow: 0}); ctx.restore(); }
  if (kind === 'squirrel') for (const sx of [-1, 1]) MD.paper(ctx, MD.P(`M${sx * 14},-108 L${sx * 30},-140 L${sx * 34},-104Z`), col, {shadow: .4});
  MD.paper(ctx, MD.circle(0, -88, 30), col, {shadow: .6});
  MD.paper(ctx, MD.ellipse(0, -78, 16, 11), belly, {shadow: .1});
  ctx.fillStyle = PAL.ink; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
  for (const sx of [-1, 1]) { if (sl > .5 || st.laugh) { ctx.beginPath(); ctx.arc(sx * 11, -92, 5, .2, Math.PI - .2, !!st.laugh); ctx.stroke(); }
    else { ctx.beginPath(); ctx.arc(sx * 11 + (st.look || 0) * 3, -93, 5, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(sx * 11 + 2, -95, 1.6, 0, 7); ctx.fill(); ctx.fillStyle = PAL.ink; } }
  ctx.beginPath(); ctx.arc(0, -80, 4, 0, 7); ctx.fill();
  if (st.laugh) { ctx.fillStyle = '#8A2A2A'; ctx.beginPath(); ctx.arc(0, -72, 7, 0, Math.PI); ctx.fill(); }
  if (sl > .8) { ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.font = '26px serif'; ctx.fillText('z', 26, -130 - (t * 20) % 30); }
  ctx.restore();
};

// ---------- декорации ----------
// Лукоморье ночью — картина luko_v (дуб с цепью, костёр, море, скала под луной). o.fire — сила огня 0…1, o.frost — иней 0…1,
// o.ice — ледяная дорожка по морю 0…1, o.cloud — [x, y, ширина] тучи, o.back(c) — у дуба, o.mid(c) — Кот, o.fg(c) — слушатели,
// o.front(c) — передний план (d = 1.25).
const LUKO = {fire: [685, 1347], oak: [300, 1000], sea: 1000};
const luko = (ctx, t, cam, o = {}) => {
  paint(ctx, t, cam, 'luko_v', .9, {over: c => {
    if (o.cloud) SP(c, 'bg/tucha', o.cloud[0], o.cloud[1], {w: o.cloud[2], rim: 'rgba(167,123,216,.8)', rimBlur: 30, alpha: o.cloudA ?? 1});
    if (o.ice) { c.save(); c.fillStyle = 'rgba(225,250,255,.7)'; c.shadowColor = '#9FF6FF'; c.shadowBlur = 24;
      c.beginPath(); c.moveTo(1200, 900); c.lineTo(1200 - 700 * o.ice, 1180 + 120 * o.ice); c.lineTo(1200 - 640 * o.ice, 1230 + 120 * o.ice); c.lineTo(1200, 960); c.fill(); c.restore(); }
  }});
  MD.layer(ctx, t, cam, 1, c => {
    const f = o.fire ?? 1, [fx, fy] = LUKO.fire, fk = (.85 + .15 * Math.sin(t * 13) * Math.sin(t * 7.3)) * f;
    MD.radial(c, fx, fy - 40, 520 * fk + 60, `rgba(255,170,70,${.35 * f})`);
    if (f < 1) MD.radial(c, fx, fy - 30, 120, `rgba(60,90,160,${.8 * (1 - f)})`, 'rgba(60,90,160,0)', 'source-over');   // костёр гаснет под инеем
    for (let i = 0; i < 6 * f; i++) { const u = ((t * .8 + i / 6) % 1); MD.radial(c, fx + Math.sin(i * 3 + t) * 30, fy - 60 - u * 260, 10 * (1 - u), `rgba(255,200,90,${1 - u})`); }   // искры костра
    if (o.back) o.back(c);
    if (o.mid) o.mid(c);
    if (o.fg) o.fg(c);
    if (o.frost) { c.save(); c.globalAlpha = .7; MD.frostGrow(c, o.frost, 11, 1150, 1650, Math.PI * .95, 380, 5); MD.frostGrow(c, o.frost * .8, 12, 1100, 1450, Math.PI * .9, 300, 4); c.restore(); }
  });
  if (o.front) MD.layer(ctx, t, cam, 1.25, o.front);
};
const KOT = {x: 430, y: 1300, s: .5};   // Кот у корней дуба
// Лаковая скала Кощея за морем. o.back — Кощей спиной, o.eyes — свечение глаз, o.frost — иней по камню, o.over(c) — поверх.
const rock = (ctx, t, cam, o = {}) => {
  MD.layer(ctx, t, cam, .1, c => { MD.set.lacquer(c, t, 41); MD.radial(c, 640, 520, 360, 'rgba(255,240,200,.85)', 'rgba(255,240,200,0)', 'source-over');
    c.fillStyle = 'rgba(250,236,200,.92)'; c.beginPath(); c.arc(640, 520, 168, 0, 7); c.fill(); MD.glow(c, MD.circle(640, 520, 170), '#E8B84A', 3, 18); });
  MD.layer(ctx, t, cam, 1, c => {
    SP(c, 'bg/skala', 560, 1920, {w: 900, ay: 1, rim: 'rgba(232,184,74,.5)', rimBlur: 14});
    if (o.koschei !== false) SP(c, 'koschei/full', 623, 612, {w: 60, ay: 1, rim: 'rgba(159,246,255,.6)', rimBlur: 12, flip: o.back});
    if (o.eyes) for (const ex of [619, 627]) MD.radial(c, ex, 445, 16 * o.eyes, `rgba(159,246,255,${o.eyes})`);
    if (o.frost) MD.frostGrow(c, o.frost, 5, 560, 1300, -Math.PI / 2, 380, 12);
    if (o.over) o.over(c);
  });
  MD.layer(ctx, t, cam, 1.15, c => lacSea(c, t, 1720));
};
const lacSea = (ctx, t, y = 1700) => {
  for (let r = 0; r < 4; r++) { const yy = y + r * 70, p = new Path2D(); p.moveTo(-300, yy);
    for (let x = -300; x <= 1400; x += 60) p.quadraticCurveTo(x + 30, yy - 26 + Math.sin(t * 2 + x * .02 + r) * 8, x + 60, yy);
    MD.glow(ctx, p, '#D9A93A', 3, 8, .9 - r * .15); }
};
const bust = (ctx, t, o = {}) => { ctx.save(); ctx.translate(o.x ?? 540, o.y ?? 930); ctx.scale(o.s ?? 3.2, o.s ?? 3.2); if (o.rot) ctx.rotate(o.rot);
  MD.pup.koscheiBust(ctx, {open: o.open ?? 1, flare: o.flare || 0, mouth: MD.mouth('koschei', t)}); ctx.restore(); };
// Ночной лес погони: слои стволов с глубиной d; иней ползёт по стволам (frost).
const trunks = (ctx, t, cam, d, seed, n, col, w0, frost = 0) => MD.layer(ctx, t, cam, d, c => {
  const R = MD.rng(seed);
  for (let i = 0; i < n; i++) { const x = -900 + i * (2900 / n) + R() * 120, w = w0 * (.7 + R() * .6);
    MD.paper(c, MD.P(`M${x - w / 2},2600 C${x - w * .4},1200 ${x - w * .3},400 ${x - w * .2},-900 L${x + w * .2},-900 C${x + w * .3},400 ${x + w * .4},1200 ${x + w / 2},2600Z`), col, {shadow: .5 + d * .3, grain: .5});
    for (let b = 0; b < 3; b++) { const by = 100 + R() * 1300, sx = R() < .5 ? -1 : 1, bl = 120 + R() * 220;
      MD.paper(c, MD.P(`M${x},${by} L${x + sx * bl},${by - 60 - R() * 80} L${x + sx * bl * .9},${by - 40 - R() * 60} L${x},${by + 22}Z`), col, {shadow: .3}); }
    if (frost) MD.frostGrow(c, frost, seed + i, x, 1900, -Math.PI / 2, 900, 5); }
});
const forestNight = (ctx, t, cam, frost = 0) => {
  MD.layer(ctx, t, cam, .02, c => { const g = c.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0B0F2A'); g.addColorStop(1, '#22305E'); c.fillStyle = g; c.fillRect(-2000, -2000, 5000, 6000); MD.stars(c, 5, 60, t, '#F7E7B5', [-300, -300, 1700, 1200], 6); });
  MD.layer(ctx, t, cam, .15, c => SP(c, 'bg/les_verh', 540, 1500, {w: 2800, ay: 1, alpha: .55, shadow: 0}));
  trunks(ctx, t, cam, .4, 31, 9, '#1F2B4A', 90);
  trunks(ctx, t, cam, .7, 32, 7, '#2A2440', 150, frost * .6);
  MD.fireflies(ctx, t, 8, 18, [0, 200, 1080, 1500]);
};
// Комната штаба: стена, круглое окно, гирлянда, лампа на цепочке, пол. o.storm — за окном буря, o.frost — иней на стекле,
// o.inWindow(c, wx, wy) — что за стеклом, o.back(c) — мебель, o.lamp — свет 0…1, o.lampSwing — качание лампы (рад), o.onLamp(c,x,y).
const ROOM = {win: [300, 520], lamp: [700, 330], floor: 1580};
const room = (ctx, t, cam, o = {}) => {
  MD.layer(ctx, t, cam, .85, c => {
    SP(c, 'bg/wall', 540, -700, {w: 2200, h: 3300, src: [0, 40, 1985, 390], ay: 0, shadow: 0});
    const [wx, wy] = ROOM.win; SP(c, 'bg/window', wx, wy, {w: 440});
    c.save(); c.beginPath(); c.arc(wx, wy, 160, 0, 7); c.clip();
    c.fillStyle = o.storm ? '#140F28' : 'rgba(26,33,72,.4)'; c.fillRect(wx - 200, wy - 200, 400, 400);
    MD.stars(c, 77, 8, t, '#F7E7B5', [wx - 160, wy - 160, 320, 320], 5);
    if (o.inWindow) o.inWindow(c, wx, wy);
    if (o.frost) { c.fillStyle = `rgba(225,250,255,${.45 * o.frost})`; c.fillRect(wx - 200, wy - 200, 400, 400); MD.frostGrow(c, o.frost, 7, wx, wy + 160, -Math.PI / 2, 260, 8); MD.frostGrow(c, o.frost, 8, wx, wy - 160, Math.PI / 2, 260, 8); }
    c.restore();
    SP(c, 'bg/flags', 540, 120, {w: 1500, ay: .1, rot: .012 * Math.sin(t * 1.6)});
  });
  MD.layer(ctx, t, cam, 1, c => {
    MD.paper(c, MD.P(`M-900,${ROOM.floor} L2000,${ROOM.floor} L2000,2700 L-900,2700 Z`), '#B65A2A', {shadow: .6});
    c.save(); c.strokeStyle = 'rgba(90,40,20,.35)'; c.lineWidth = 4; for (let x = -900; x < 2000; x += 160) { c.beginPath(); c.moveTo(x, ROOM.floor); c.lineTo(x - 120, 2700); c.stroke(); } c.restore();
    if (o.back) o.back(c);
    const lampOn = o.lamp ?? 1, [lx, ly] = ROOM.lamp, sw = o.lampSwing || 0;
    if (lampOn > 0) MD.radial(c, lx + Math.sin(sw) * 260, ly + 260, 650, `rgba(255,190,90,${.4 * lampOn})`);
    c.save(); c.translate(lx, -200); c.rotate(sw); c.strokeStyle = '#3A2A1A'; c.lineWidth = 6; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, ly + 200); c.stroke();
    SP(c, 'bg/lamp', 0, ly + 200, {w: 180, ay: .05}); if (o.onLamp) o.onLamp(c, 0, ly + 200); c.restore();
  });
};
const roomDark = (ctx, k) => { if (k > 0) MD.grade(ctx, 'rgba(20,24,70,1)', .55 * k); };
// Настил у штаба на сосне: перила, доски; o.night — ночь, o.back(c) — что стоит на настиле позади героев.
const deck = (ctx, t, cam, o = {}) => {
  MD.layer(ctx, t, cam, .03, c => { o.night ? MD.set.sky(c, t) : MD.set.sky(c, t, '#2A2E66', '#E08A6A', 31); });
  MD.layer(ctx, t, cam, .25, c => SP(c, 'bg/les_verh', 540, 1500, {w: 2800, ay: 1, shadow: .4, alpha: .9}));
  MD.layer(ctx, t, cam, .5, c => SP(c, 'bg/les_verh', 900, 1760, {w: 3200, ay: 1, shadow: .6}));
  MD.layer(ctx, t, cam, 1, c => {
    for (let x = -1180; x < 2600; x += 220) MD.paper(c, MD.P(`M${x},1300 L${x + 26},1300 L${x + 26},1570 L${x},1570Z`), '#9A5226', {shadow: .5});
    MD.paper(c, MD.P('M-1200,1290 L2600,1290 L2600,1325 L-1200,1325Z'), '#A85A2A', {shadow: .7});
    for (let x = -1200; x < 2600; x += 150) MD.paper(c, MD.P(`M${x},1560 L${x + 140},1560 L${x + 140},1660 L${x},1660Z`), x % 300 ? '#C8652F' : '#B5592A', {shadow: .5, grain: .6});
    MD.paper(c, MD.P('M-1200,1650 L2600,1650 L2600,1740 L-1200,1740Z'), '#8A4A22', {shadow: 1});
    if (o.back) o.back(c);
  });
};

// Фон-картина на весь кадр (ChatGPT, 941×1672): слегка крупнее кадра, глубина d — для параллакса с героями (d = 1).
const paint = (ctx, t, cam, key, d = .9, o = {}) => MD.layer(ctx, t, cam, d, c => {
  const im = MD.SPR['bg/' + key], s = (o.s ?? 1.12) * Math.max(MD.W / im.width, MD.H / im.height);
  SP(c, 'bg/' + key, o.x ?? 540, o.y ?? 960, {s, shadow: 0, alpha: o.alpha});
  if (o.over) o.over(c);
});
// Комната штаба на картине komnata: окно, лампа, дверь, кроватка — координаты мира при масштабе картины 1.12.
const KOM = {win: [177, 250], lamp: [576, 207], door: [963, 1175], bed: [80, 1067], floor: 1700};
const NAS = {door: [963, 1218], catapult: [117, 1230], floor: 1520};   // настил на картине nastil

// ---------- хохлома: титр и карточка ----------
const curls = [
  ['M90,420 C120,250 330,230 340,360 C348,450 230,460 224,392 C220,350 270,346 276,376', PAL.ink],
  ['M990,430 C960,260 750,240 742,370 C736,460 852,466 856,398 C860,356 810,352 806,382', PAL.red],
  ['M80,1560 C110,1730 320,1750 330,1620 C338,1530 220,1520 214,1588 C210,1630 260,1634 266,1604', PAL.red],
  ['M1000,1560 C970,1730 760,1750 750,1620 C744,1530 862,1520 866,1588 C870,1630 820,1634 816,1604', PAL.ink],
  ['M-20,1830 C120,1760 260,1860 400,1790 C540,1860 680,1760 820,1840 C920,1780 1020,1820 1100,1780', PAL.ink],
  ['M-20,120 C120,190 260,90 400,160 C540,90 680,190 820,110 C920,170 1020,130 1100,170', PAL.red],
];
const berries = [[300, 330], [326, 300], [282, 296], [760, 330], [740, 300], [782, 298], [300, 1630], [280, 1660], [322, 1664], [780, 1630], [760, 1662], [802, 1660], [540, 470], [520, 1500], [562, 1500]];
const hohloma = (ctx, u) => {   // u — время от начала, как в пробе: прорастают завитки, выпрыгивают ягоды
  ctx.fillStyle = '#F5B82E'; ctx.fillRect(0, 0, MD.W, MD.H);
  MD.radial(ctx, 540, 900, 900, 'rgba(255,236,170,.6)', 'rgba(255,236,170,0)', 'source-over');
  curls.forEach(([d, c], i) => MD.drawOn(ctx, MD.P(d), c, 16, ease.out(seg(u, .1 + i * .07, 1 + i * .07)), 1200, 0));
  for (const [x, y, r, s] of [[180, 560, .5, 1], [900, 560, -.5, -1], [180, 1430, -.5, 1], [900, 1430, .5, -1]]) {
    const k = ease.back(seg(u, .4, .9)); if (k <= 0) continue;
    ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(k * s, k); MD.paper(ctx, MD.P('M0,0 C40,-70 120,-80 170,-40 C120,10 50,30 0,0Z'), '#3FA34D', {shadow: .5}); ctx.restore(); }
  berries.forEach(([x, y], i) => { const k = ease.back(seg(u, .6 + i * .04, .95 + i * .04), 2.4); if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); MD.paper(ctx, MD.circle(0, 0, 24), '#E23B2E', {shadow: .5, grain: .3}); ctx.fillStyle = '#FFF1D6'; ctx.beginPath(); ctx.arc(-7, -8, 6, 0, 7); ctx.fill(); ctx.restore(); });
};
const word = (ctx, u, txt, y, size, t0) => { ctx.save(); ctx.font = `${size}px ${MD.FONT.display}`; ctx.textBaseline = 'alphabetic';
  const ws = [...txt].map(ch => ctx.measureText(ch).width), tot = ws.reduce((a, b) => a + b, 0); let x = 540 - tot / 2;
  [...txt].forEach((ch, i) => { const k = seg(u, t0 + i * .06, t0 + .45 + i * .06), dy = -520 * (1 - ease.back(k, 1.8)), rot = (1 - k) * (i % 2 ? .4 : -.4);
    if (k > 0) { ctx.save(); ctx.translate(x + ws[i] / 2, y + dy); ctx.rotate(rot); ctx.textAlign = 'center';
      ctx.fillStyle = '#E23B2E'; ctx.fillText(ch, 9, 9); ctx.fillStyle = PAL.ink; ctx.fillText(ch, 0, 0); ctx.restore(); }
    x += ws[i]; }); ctx.restore(); };

MD.ser01 = {all: SHOTS, DUR, LINES, WHO, shot, cue, D, play, A, grain, vignette, flash, spark, zvenFace, lightning, ribbon, kid,
  paint, KOM, NAS, hohloma, word, luko, LUKO, KOT, rock, lacSea, bust, trunks, forestNight, room, ROOM, roomDark, deck,
};
// Серия собирается при первом обращении — когда все файлы сцен уже добавили свои планы.
let EP = null;
Object.defineProperty(MD.eps, 'ser01', {configurable: true, enumerable: true, get: () => EP || (EP = {dur: T, subY: .72, shots: SHOTS, trans: TRANS,
  voiceDir: 'voice/ser01', voice: VOICE, subs: SUBS, cues: CUES, post(ctx) { vignette(ctx, .32); }})});
})();
