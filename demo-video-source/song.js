// THE SONG: every sound comes from an event in score.js.   node song.js   (STEMS=1 writes stems, LUFS=-14 sets loudness)
// A soft bed, a pluck per wave of candidates, a marimba step for every tick of the counter,
// a held breath while the offer is signed, and a chime when it is.
const path = require('path');
const { SR, Bus, reverb } = require('./engine/audio/dsp');
const I = require('./engine/audio/instruments');
const MIX = require('./engine/audio/mix');
const Genre = require('./engine/audio/genres');
const sc = require('./score');
const { T, BEAT, DURATION, m, ev, clock, chordAt } = sc;

const N = Math.ceil(DURATION * SR);
const bus = () => new Bus(N);
const buses = { drums: bus(), bass: bus(), pad: bus(), keys: bus() };
const lead = bus(), fx = bus(), verb = bus();
const hit = (t, big) => { fx.addMono(I.thud(70, 0.14), t, big ? 0.7 : 0.55); fx.addMono(I.woodTick(0.9), t, 0.3); if (big) fx.addMono(I.crash(3), t, 0.28); };

// intro: pads and a music-box hook; the title lands on bar 1
Genre.play('lofi', { clock, from: 0, to: 2, chordAt, buses, drums: false, bassline: false });
[['G4', 0], ['C5', 1], ['E5', 2], ['G5', 3]].forEach(([n, b]) => { const x = I.musicBox(m(n)); lead.addMono(x, T(0, b), 0.22, 0.1); verb.addMono(x, T(0, b), 0.2); });
hit(ev.title, false);

// the groove runs from sourcing to the last interview
const { kicks } = Genre.play('boombap', { clock, from: 2, to: 10, chordAt, buses, gain: 0.75 });
MIX.sidechain([buses.pad, buses.keys], kicks, { depth: 0.3 });

// source: one pluck per wave of candidates, climbing the scale
const climb = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'E6'];
sc.waves.forEach((t, i) => { const x = I.pluck(m(climb[i])); lead.addMono(x, t, 0.3, i % 2 ? 0.3 : -0.3); verb.addMono(x, t, 0.12); fx.addMono(I.pop(1400 + i * 90), t, 0.12, i % 2 ? 0.3 : -0.3); });
hit(ev.source, true);

// screen / assess / interview: the cut lands, then the counter steps down a marimba scale
const fall = ['E5', 'D5', 'C5', 'A4', 'G4', 'E4'];
[ev.screen, ev.assess, ev.interview].forEach((t) => hit(t, true));
for (const k of sc.ticks) { const x = I.marimba(m(fall[k.k - 1]) + (k.stage - 1) * 2); lead.addMono(x, k.t, 0.3, 0.15); verb.addMono(x, k.t, 0.1); }

// offer: the drums stop, the pen scribbles, then the chime
Genre.play('lofi', { clock, from: 10, to: 12, chordAt, buses, drums: false, bassline: false });
hit(ev.offer, false);
fx.addMono(I.scribble(ev.sign - ev.signStart - BEAT * 0.5), ev.signStart, 0.3, 0.1);
for (const [n, d] of [['C5', 0], ['E5', 0], ['G5', 0], ['C6', 0.12], ['E6', 0.24]]) { const x = I.musicBox(m(n)); lead.addMono(x, ev.sign + d, 0.3, 0.1); verb.addMono(x, ev.sign + d, 0.3); }
fx.addMono(I.thud(90, 0.1), ev.sign, 0.45);

// the end card
const end = Genre.play('boombap', { clock, from: 12, to: 14, chordAt, buses, gain: 0.85 });
MIX.sidechain([buses.pad, buses.keys], end.kicks, { depth: 0.3 });
hit(ev.end, true);
fx.addMono(I.subBoom(1, 80, 36), ev.end, 0.4);
[['C5', 0], ['G5', 1], ['E5', 2], ['C6', 3], ['G5', 4], ['E5', 5], ['C5', 6]].forEach(([n, b]) => { const x = I.musicBox(m(n)); lead.addMono(x, T(12, b), 0.2, -0.1); verb.addMono(x, T(12, b), 0.2); });
for (const n of ['C3', 'G3', 'C4', 'E4']) { const { L, R } = I.padNote(m(n), 2.2, { attack: 0.02, release: 1.6 }); buses.pad.addStereo(L, R, T(14), 0.16); }
buses.drums.addMono(I.kick({ punch: 1.1 }), T(14), 0.8);

const room = reverb(verb, { room: 0.7, damp: 0.4 });
const stems = { ...buses, lead, fx, verb: room };
const GAIN = { drums: 0.85, bass: 0.8, pad: 1, keys: 1, lead: 1, fx: 1, verb: 0.4 };
const mix = MIX.mixdown(stems, GAIN, { stemDir: process.env.STEMS ? path.join(__dirname, 'out') : null });
MIX.highpass(mix, 28);
MIX.gate(mix, ev.sign - BEAT * 0.5, ev.sign); // a held breath before the signature lands
MIX.fadeOut(mix, DURATION - 1.2, DURATION);
const res = MIX.master(mix, 0.8, undefined, { lufs: process.env.LUFS ? +process.env.LUFS : -14 });
MIX.writeWav(path.join(__dirname, 'out', 'music.wav'), mix);
console.log(`out/music.wav  ${DURATION.toFixed(1)}s  ${res.lufs.toFixed(1)} LUFS`);
