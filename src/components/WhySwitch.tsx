import type { JSX } from 'react';
import { switchRows, type SwitchVisualKind } from '../data/content';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

const searchResults = [
  { initials: 'MC', name: 'Maya Chen', meta: 'Product Designer · 7 yrs · Amsterdam', score: '96' },
  { initials: 'TW', name: 'Tomas Weber', meta: 'Senior UX Designer · 6 yrs · Remote', score: '92' },
  { initials: 'AB', name: 'Aisha Bello', meta: 'Product Designer · 5 yrs · Rotterdam', score: '88' },
];

const rubric = [
  { label: 'Go & distributed systems', score: '96' },
  { label: 'Kubernetes in production', score: '91' },
  { label: 'API design & review', score: '87' },
  { label: 'Incident ownership', score: '82' },
];

const waveform = [38, 62, 48, 86, 56, 94, 70, 42, 64, 88, 52, 76, 40, 68, 58, 90, 46, 72, 60, 84, 50, 66];

function SearchVisual() {
  return (
    <>
      <div className="proof-head">
        <span className="proof-title">Searching 6 sources</span>
        <span className="proof-badge">214 matches</span>
      </div>
      <p className="proof-query">Senior product designer · Amsterdam</p>
      <ul className="proof-list">
        {searchResults.map((result) => (
          <li key={result.name}>
            <span className="proof-avatar">{result.initials}</span>
            <span>
              <strong>{result.name}</strong>
              <small>{result.meta}</small>
            </span>
            <span className="proof-score">{result.score}</span>
          </li>
        ))}
      </ul>
      <p className="proof-foot">ATS · LinkedIn · Referrals · Job boards · Talent pool</p>
    </>
  );
}

function ScoreVisual() {
  return (
    <>
      <div className="proof-head">
        <span className="proof-title">Match breakdown</span>
        <span className="proof-badge">94 / 100</span>
      </div>
      <p className="proof-role">Senior Backend Engineer — Meridian Health</p>
      <ul className="proof-bars">
        {rubric.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <b>{item.score}</b>
            <span className="proof-bar">
              <i style={{ width: `${item.score}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <ul className="proof-chips">
        <li>Go</li>
        <li>Kubernetes</li>
        <li>Event-driven</li>
        <li>+ 14 matched</li>
      </ul>
      <p className="proof-note">Reasons attached · reviewed by A. Mehta</p>
    </>
  );
}

function InterviewVisual() {
  return (
    <>
      <div className="proof-head">
        <span className="proof-title">AI interview · Backend</span>
        <span className="proof-badge proof-badge--live">Scored</span>
      </div>
      <div className="proof-wave">
        {waveform.map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="proof-transcript">
        <p>
          <span>02:14</span>
          &ldquo;We sharded the orders table by tenant and moved reads to replicas&hellip;&rdquo;
        </p>
        <p>
          <span>02:31</span>
          &ldquo;&hellip;which took p95 latency from 840ms down to 210ms.&rdquo;
        </p>
      </div>
      <div className="proof-rubric">
        <div>
          <span>System design</span>
          <b>4.6</b>
        </div>
        <div>
          <span>Depth</span>
          <b>4.8</b>
        </div>
        <div>
          <span>Communication</span>
          <b>4.4</b>
        </div>
      </div>
    </>
  );
}

const visuals: Record<SwitchVisualKind, () => JSX.Element> = {
  search: SearchVisual,
  score: ScoreVisual,
  interview: InterviewVisual,
};

export function WhySwitch() {
  return (
    <section className="section section--tint" id="why-switch">
      <div className="container">
        <SectionHead
          variant="left"
          eyebrow="Why teams switch"
          title="The tools are fine. The handoffs are where hiring dies."
          body="Every system in your stack is decent on its own. The cost shows up between them — resumes re-read, candidates re-contacted, decisions re-explained. TalentPool365 closes those gaps instead of adding another tab."
        />

        <div className="switch-rows">
          {switchRows.map((row, index) => {
            const flip = index % 2 === 1;
            const Visual = visuals[row.visual];

            return (
              <div className={`split switch-row${flip ? ' split--flip' : ''}`} key={row.title}>
                <Reveal className="split-media" variant={flip ? 'right' : 'left'}>
                  <div className="proof" aria-hidden="true">
                    <Visual />
                  </div>
                </Reveal>
                <Reveal className="split-copy" variant={flip ? 'left' : 'right'} delay={1}>
                  <p className="eyebrow">{row.eyebrow}</p>
                  <h3 className="switch-title">{row.title}</h3>
                  <p>{row.body}</p>
                  <ul className="ticks">
                    {row.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
