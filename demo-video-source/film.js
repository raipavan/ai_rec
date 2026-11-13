// THE FILM: one requisition through five stages. 300 dots are 300 candidates; the counter on the
// right and the dots on the left are the same number, so every marimba step removes a visible batch.
(function () {
  const U = globalThis.U, G = globalThis.G, UI = globalThis.UI, S = globalThis.SCORE, Studio = globalThis.Studio;
  const { clamp, ease, lerp } = U;
  const { T, BEAT, ev, stages, dots } = S;
  const W = G.W, H = G.H;
  const C = { navy: '#172554', navy2: '#1E3A8A', ink: '#0B1535', indigo: '#4F46E5', lilac: '#A5B4FC', cyan: '#06B6D4', cyanHi: '#22D3EE', white: '#FFFFFF', mute: 'rgba(255,255,255,0.72)', faint: 'rgba(255,255,255,0.14)' };
  const FONT = 'Inter, system-ui, sans-serif';
  let LOGO = null;

  const txt = (ctx, str, x, y, o = {}) => {
    ctx.save();
    ctx.globalAlpha *= o.alpha ?? 1;
    ctx.font = `${o.weight || 500} ${o.size || 40}px ${FONT}`;
    ctx.textAlign = o.align || 'left';
    ctx.textBaseline = o.base || 'alphabetic';
    if (o.spacing !== undefined) ctx.letterSpacing = `${o.spacing}px`;
    ctx.fillStyle = o.color || C.white;
    ctx.fillText(str, x, y);
    ctx.restore();
  };
  const rr = (ctx, x, y, w, h, r, fill, stroke) => {
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
  };
  const mix = (a, b, u) => { // two #RRGGBB colours
    const p = (h, i) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
    return `rgb(${[0, 1, 2].map((i) => Math.round(lerp(p(a, i), p(b, i), u))).join(',')})`;
  };
  // a stamp: full presence on its very first frame, settling from 112% to 100%
  const stamp = (t, t0) => (t < t0 ? 0 : 1 + 0.12 * (1 - ease.outCubic(clamp((t - t0) / 0.25))));
  const fade = (t, t0, d = 0.3) => clamp((t - t0) / d);

  function backdrop(ctx, t) {
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, C.navy); g.addColorStop(1, C.navy2);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W * 0.9, H * 0.95, 0, W * 0.9, H * 0.95, 900);
    glow.addColorStop(0, 'rgba(6,182,212,0.22)'); glow.addColorStop(1, 'rgba(6,182,212,0)');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    const glow2 = ctx.createRadialGradient(W * 0.08, 0, 0, W * 0.08, 0, 800);
    glow2.addColorStop(0, 'rgba(79,70,229,0.4)'); glow2.addColorStop(1, 'rgba(79,70,229,0)');
    ctx.fillStyle = glow2; ctx.fillRect(0, 0, W, H);
  }
  function logo(ctx, cx, cy, h, alpha = 1) {
    if (!LOGO) return;
    const w = h * LOGO.width / LOGO.height;
    ctx.save(); ctx.globalAlpha *= alpha; ctx.drawImage(LOGO, cx - w / 2, cy - h / 2, w, h); ctx.restore();
  }

  // ---------- the numbers: one function both the counter and the dots read ----------
  const stageAt = (t) => { let i = 0; stages.forEach((s, k) => { if (t >= s.t) i = k; }); return i; };
  function inPlay(t) { // how many candidates are still in play
    if (t < ev.source) return 0;
    const i = stageAt(t);
    if (i === 0) return dots.filter((d) => t >= d.born).length;
    if (i === 4) return 1;
    const k = clamp(Math.floor((t - stages[i].t) / (BEAT * 0.5)), 0, S.STEPS);
    return Math.round(lerp(stages[i - 1].count, stages[i].count, ease.outQuad(k / S.STEPS)));
  }
  const lastTick = (t) => { // time of the most recent step of the counter (for the little bump)
    const i = stageAt(t);
    if (i === 0) return S.waves.filter((w) => t >= w).pop() ?? -9;
    if (i === 4) return stages[4].t;
    const k = clamp(Math.floor((t - stages[i].t) / (BEAT * 0.5)), 0, S.STEPS);
    return stages[i].t + k * BEAT * 0.5;
  };

  // ---------- the rail: five steps across the top ----------
  function rail(ctx, t) {
    const x0 = 150, x1 = 1770, y = 196, i = stageAt(t);
    logo(ctx, 150 + 183, 96, 60);
    ctx.fillStyle = C.faint; ctx.fillRect(x0, y - 2, x1 - x0, 4);
    const seg = (x1 - x0) / 5;
    const into = clamp((t - stages[i].t) / (BEAT * 8));
    ctx.fillStyle = C.cyan; ctx.fillRect(x0, y - 2, seg * (i + into), 4);
    stages.forEach((s, k) => {
      const x = x0 + seg * k, on = k <= i, cur = k === i;
      ctx.beginPath(); ctx.arc(x, y, cur ? 13 * stamp(t, s.t) : 9, 0, 7); ctx.fillStyle = on ? C.cyanHi : '#3A4A86'; ctx.fill();
      txt(ctx, s.label, x - 8, y + 58, { size: 34, weight: cur ? 700 : 500, color: cur ? C.white : on ? C.mute : 'rgba(255,255,255,0.45)' });
    });
  }

  // ---------- the field of candidates ----------
  const F = { x: 150, y: 330, cell: 42, r: 13 };
  const dotXY = (d) => [F.x + d.col * F.cell + F.cell / 2, F.y + d.row * F.cell + F.cell / 2];
  const CARD = { cx: 150 + 25 * 42 / 2, cy: 330 + 12 * 42 / 2 + 6, w: 600, h: 430 };
  function field(ctx, t) {
    const n = inPlay(t), i = stageAt(t);
    const tint = [C.lilac, mix(C.lilac, C.cyanHi, 0.35), mix(C.lilac, C.cyanHi, 0.7), C.cyanHi, C.cyanHi][i];
    const clear = i === 4 ? 1 - 0.85 * fade(t, ev.offer, 0.5) : 1; // the board empties for the offer
    for (const d of dots) {
      if (t < d.born) continue;
      const [x, y] = dotXY(d);
      const alive = d.rank < n;
      if (i === 4 && d.rank === 0) continue; // the hire is drawn by offer()
      if (alive) {
        const k = UI.pop(t, d.born, 0.3, 2.2);
        const bump = 1 + 0.25 * Math.exp(-(t - stages[i].t) * 7) * (i > 0 ? 1 : 0);
        ctx.beginPath(); ctx.arc(x, y, F.r * k * bump, 0, 7); ctx.fillStyle = tint; ctx.fill();
      } else {
        ctx.globalAlpha = clear;
        ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fillStyle = 'rgba(255,255,255,0.16)'; ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  // ---------- the panel on the right: stage, count, what happened ----------
  function panel(ctx, t) {
    const i = stageAt(t), s = stages[i], x = 1320;
    const signed = t >= ev.sign;
    const k = stamp(t, signed ? ev.sign : s.t);
    rr(ctx, x - 50, 318, 560, 540, 28, 'rgba(255,255,255,0.07)', 'rgba(255,255,255,0.16)');
    txt(ctx, signed ? 'Offer signed' : ['Sourcing', 'Screening', 'Assessments', 'Interviews', 'Offer'][i], x, 400, { size: 38, weight: 600, color: C.cyanHi });
    const bump = 1 + 0.06 * Math.exp(-(t - lastTick(t)) * 14);
    ctx.save(); ctx.translate(x, 600); ctx.scale(k * bump, k * bump);
    txt(ctx, signed ? 'Day 19' : String(inPlay(t)), 0, 0, { size: signed ? 150 : 200, weight: 800, spacing: -6 });
    ctx.restore();
    const note = signed ? 'pre-boarding already under way' : s.note;
    // the note describes the settled count, so it waits until the counter has stopped
    const settle = i === 0 ? S.waves[S.waves.length - 1] : i === 4 ? s.t : s.t + S.STEPS * BEAT * 0.5;
    const a = fade(t, (signed ? ev.sign : settle) + 0.15, 0.3);
    const words = note.split(' '); let line = ''; let y = 690;
    ctx.font = `500 38px ${FONT}`;
    for (const w of words) {
      if (ctx.measureText(line + w).width > 460 && line) { txt(ctx, line.trim(), x, y, { size: 38, color: C.mute, alpha: a }); line = ''; y += 54; }
      line += w + ' ';
    }
    txt(ctx, line.trim(), x, y, { size: 38, color: C.mute, alpha: a });
  }

  // ---------- the offer letter grows out of the last dot and gets signed ----------
  function offer(ctx, t) {
    const hire = dots.find((d) => d.rank === 0);
    const [hx, hy] = dotXY(hire);
    const u = ease.inOutCubic(clamp((t - ev.offer - 0.15) / 0.75));
    const cx = lerp(hx, CARD.cx, u), cy = lerp(hy, CARD.cy, u);
    const w = lerp(F.r * 2, CARD.w, u), h = lerp(F.r * 2, CARD.h, u);
    ctx.save();
    ctx.shadowColor = 'rgba(2,6,23,0.55)'; ctx.shadowBlur = 60 * u; ctx.shadowOffsetY = 30 * u;
    rr(ctx, cx - w / 2, cy - h / 2, w, h, lerp(F.r, 26, u), mix(C.cyanHi, C.white, u));
    ctx.restore();
    if (u < 1) return;
    const x = cx - w / 2 + 48, y = cy - h / 2;
    const a = fade(t, ev.offer + 0.9, 0.25);
    ctx.save(); ctx.globalAlpha = a;
    txt(ctx, 'Offer letter', x, y + 76, { size: 40, weight: 700, color: C.ink });
    for (let r = 0; r < 4; r++) rr(ctx, x, y + 116 + r * 36, [504, 460, 504, 300][r], 14, 7, '#E2E8F0');
    ctx.fillStyle = '#CBD5E1'; ctx.fillRect(x, y + 356, 330, 3);
    txt(ctx, 'Candidate signature', x, y + 394, { size: 24, weight: 500, color: '#64748B' });
    ctx.restore();
    // the pen
    const p = clamp((t - ev.signStart) / (ev.sign - ev.signStart - BEAT * 0.5));
    if (p > 0) {
      ctx.beginPath();
      const n = Math.floor(70 * p);
      for (let k = 0; k <= n; k++) {
        const px = x + 10 + k * 4.2, py = y + 330 - Math.sin(k * 0.55) * 26 * Math.exp(-k / 46) - Math.sin(k * 0.17) * 12;
        if (k) ctx.lineTo(px, py); else ctx.moveTo(px, py);
      }
      ctx.strokeStyle = C.indigo; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    }
    // signed
    if (t >= ev.sign) {
      const k = UI.pop(t, ev.sign, 0.3, 2.4);
      ctx.save(); ctx.translate(cx + w / 2 - 92, y + 340); ctx.scale(k, k);
      ctx.beginPath(); ctx.arc(0, 0, 44, 0, 7); ctx.fillStyle = C.cyan; ctx.fill();
      ctx.beginPath(); ctx.moveTo(-19, 1); ctx.lineTo(-5, 15); ctx.lineTo(20, -13);
      ctx.strokeStyle = C.white; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
      ctx.restore();
    }
  }

  // ---------- scenes ----------
  function intro(ctx, t) {
    backdrop(ctx, t);
    logo(ctx, W / 2, 330, 104, fade(t, 0.15, 0.5));
    // five small dots, the rail to come: four light on the music-box notes, the fifth on the title
    for (let k = 0; k < 5; k++) {
      const at = k < 4 ? T(0, k) : ev.title, on = t >= at;
      ctx.beginPath(); ctx.arc(W / 2 - 120 + k * 60, 470, on ? 11 * UI.pop(t, at, 0.3, 2.4) : 7, 0, 7);
      ctx.fillStyle = on ? C.cyanHi : '#3A4A86'; ctx.fill();
    }
    const k = stamp(t, ev.title);
    if (k > 0) {
      ctx.save(); ctx.translate(W / 2, 660); ctx.scale(k, k);
      txt(ctx, 'Follow one requisition', 0, 0, { size: 128, weight: 800, align: 'center', spacing: -4 });
      ctx.restore();
      txt(ctx, 'from the first search to a signed offer', W / 2, 760, { size: 50, weight: 500, align: 'center', color: C.mute, alpha: fade(t, ev.title + 0.3, 0.4) });
    }
  }
  function stage(ctx, t) {
    backdrop(ctx, t);
    rail(ctx, t);
    field(ctx, t);
    if (t >= ev.offer) offer(ctx, t);
    panel(ctx, t);
  }
  const RECAP = [['300', 'matched'], ['214', 'screened'], ['38', 'assessed'], ['12', 'interviewed'], ['1', 'signed']];
  function end(ctx, t) {
    backdrop(ctx, t);
    logo(ctx, W / 2, 190, 76, fade(t, ev.end + 0.2, 0.4));
    const k = stamp(t, ev.end);
    ctx.save(); ctx.translate(W / 2, 470); ctx.scale(k, k);
    txt(ctx, 'Hire in days,', 0, 0, { size: 170, weight: 800, align: 'center', spacing: -6 });
    txt(ctx, 'not months.', 0, 180, { size: 170, weight: 800, align: 'center', spacing: -6, color: C.cyanHi });
    ctx.restore();
    RECAP.forEach(([n, l], i) => {
      const at = T(13, i * 0.5), p = UI.pop(t, at, 0.28, 2);
      if (t < at) return;
      const x = W / 2 + (i - 2) * 300;
      ctx.save(); ctx.translate(x, 810); ctx.scale(p, p);
      txt(ctx, n, 0, 0, { size: 64, weight: 800, align: 'center' });
      txt(ctx, l, 0, 46, { size: 30, weight: 500, align: 'center', color: C.mute });
      ctx.restore();
    });
    const b = UI.pop(t, T(13, 3), 0.3, 2.2);
    if (t >= T(13, 3)) {
      ctx.save(); ctx.translate(W / 2, 960); ctx.scale(b, b);
      rr(ctx, -210, -44, 420, 88, 16, C.indigo);
      txt(ctx, 'Book a live demo', 0, 13, { size: 38, weight: 700, align: 'center' });
      ctx.restore();
    }
  }

  const CUTS = [ev.title, ev.source, ev.screen, ev.assess, ev.interview, ev.offer, ev.sign, ev.end];
  Studio.film({
    fadeOut: 1,
    post: { paper: 0, vignette: 0, grain: 0 },
    async init() { LOGO = await Studio.loadImage('assets/logo.png'); },
    draw(ctx, t) {
      if (t < ev.source) intro(ctx, t); else if (t < ev.end) stage(ctx, t); else end(ctx, t);
      const cut = CUTS.filter((c) => t >= c).pop();
      if (cut !== undefined && t - cut < 0.16) { ctx.fillStyle = `rgba(255,255,255,${0.4 * (1 - (t - cut) / 0.16)})`; ctx.fillRect(0, 0, W, H); }
    },
  });
})();
