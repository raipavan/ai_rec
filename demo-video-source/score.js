// TALENTPOOL365 DEMO (16:9, ~30s): one requisition followed through the five stages.
// 300 dots are 300 candidates; every stage thins them out until one signs on day 19.
// Every figure and line of copy comes from the website's own content (heroStages).
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const MU = node ? require('./engine/music') : globalThis.MUSIC;
  const { m, makeClock, makeChords } = MU;

  const FPS = 30;
  const FORMAT = '16:9';
  const STYLE = 'flat';
  const [W, H] = U.formatSize(FORMAT);
  const SAFE = U.safeArea(W, H);
  const clock = makeClock({ bpm: 120, offset: 0.5 });
  const { T, BEAT } = clock;
  const DURATION = T(14) + 2;

  const S = { intro: [0, T(2)], source: [T(2), T(4)], screen: [T(4), T(6)], assess: [T(6), T(8)], interview: [T(8), T(10)], offer: [T(10), T(12)], end: [T(12), DURATION] };
  const loop = ['C', 'G', 'Am', 'F'];
  const { chords, chordAt } = makeChords(clock, {
    C: { notes: ['E3', 'G3', 'C4'], bass: 'C2' }, G: { notes: ['D3', 'G3', 'B3'], bass: 'G1' }, Am: { notes: ['E3', 'A3', 'C4'], bass: 'A1' }, F: { notes: ['F3', 'A3', 'C4'], bass: 'F1' },
  }, [...Array.from({ length: 14 }, (_, b) => [b, 0, 4, loop[b % 4]]), [14, 0, 4, 'C']]);

  // the five stages, copy and counts from the site
  const stages = [
    { key: 'source', label: 'Source', count: 300, note: 'profiles matched across 30+ channels', t: T(2) },
    { key: 'screen', label: 'Screen', count: 214, note: 'of 300 scored in 8 minutes', t: T(4) },
    { key: 'assess', label: 'Assess', count: 38, note: 'cleared the calibrated skills test', t: T(6) },
    { key: 'interview', label: 'Interview', count: 12, note: 'reviewed against your panel rubric', t: T(8) },
    { key: 'offer', label: 'Offer', count: 1, note: 'offer letter out for e-signature', t: T(10) },
  ];

  // 300 candidates on a 25 x 12 grid. They arrive in 12 waves, one per 8th note.
  const COLS = 25, ROWS = 12, WAVES = 12;
  const rnd = U.mulberry32(365);
  const order = Array.from({ length: COLS * ROWS }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  const rank = new Array(COLS * ROWS);
  order.forEach((idx, r) => { rank[idx] = r; }); // rank < stage.count => still in play after that stage
  const waveOrder = Array.from({ length: COLS * ROWS }, (_, i) => i);
  for (let i = waveOrder.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [waveOrder[i], waveOrder[j]] = [waveOrder[j], waveOrder[i]]; }
  const waves = Array.from({ length: WAVES }, (_, w) => T(2, w * 0.5));
  const dots = Array.from({ length: COLS * ROWS }, (_, i) => ({ col: i % COLS, row: Math.floor(i / COLS), rank: rank[i], jitter: rnd() }));
  waveOrder.forEach((idx, k) => { dots[idx].wave = Math.floor(k / (COLS * ROWS / WAVES)); dots[idx].born = waves[dots[idx].wave]; });

  // the counter steps down on 8th notes after each cut (six steps, then it rests on the new count)
  const STEPS = 6;
  const ticks = [];
  for (let s = 1; s < 4; s++) for (let k = 1; k <= STEPS; k++) ticks.push({ stage: s, k, t: stages[s].t + k * BEAT * 0.5 });

  const ev = { title: T(1), source: T(2), screen: T(4), assess: T(6), interview: T(8), offer: T(10), signStart: T(10, 2), sign: T(11), end: T(12) };
  const markers = {
    title: { t: ev.title, sync: 'av' },
    source: { t: ev.source, sync: 'av' },
    screen: { t: ev.screen, sync: 'av' },
    assess: { t: ev.assess, sync: 'av' },
    interview: { t: ev.interview, sync: 'av' },
    offer: { t: ev.offer, sync: 'av' },
    sign: { t: ev.sign, sync: 'av' },
    end: { t: ev.end, sync: 'av' },
  };

  const SCORE = { FPS, FORMAT, STYLE, W, H, SAFE, DURATION, clock, T, BEAT, S, m, chords, chordAt, stages, dots, waves, ticks, STEPS, COLS, ROWS, ev, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
