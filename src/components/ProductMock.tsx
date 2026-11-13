import type { CSSProperties } from 'react';

/* Small coded product vignettes for the platform showcase. Decorative: the
   real description of each product sits next to them as text. */

const at = (step: number): CSSProperties => ({ '--i': step }) as CSSProperties;
const fill = (value: number, step: number): CSSProperties =>
  ({ '--w': `${value}%`, '--i': step }) as CSSProperties;

const people = [
  { initials: 'AT', name: 'Aiko Tanaka', role: 'Senior React engineer', source: 'ATS', score: 94 },
  { initials: 'DO', name: 'Daniel Okafor', role: 'Frontend lead', source: 'LinkedIn', score: 91 },
  { initials: 'SM', name: 'Sofia Marin', role: 'UI engineer', source: 'Referral', score: 88 },
  { initials: 'JW', name: 'Jonas Weber', role: 'Full-stack engineer', source: 'Job board', score: 83 },
];

function Sourcing() {
  return (
    <>
      <div className="mk-search mk-in" style={at(0)}>
        <span className="mk-search__icon" />
        Senior React engineer, fintech, Berlin
        <span className="mk-caret" />
      </div>
      <ul className="mk-rows">
        {people.map((person, i) => (
          <li key={person.name} className="mk-row mk-in" style={at(i + 1)}>
            <span className="mk-avatar">{person.initials}</span>
            <span className="mk-who">
              <b>{person.name}</b>
              {person.role}
            </span>
            <span className="mk-chip">{person.source}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Screening() {
  return (
    <>
      <ul className="mk-rows">
        {people.map((person, i) => (
          <li key={person.name} className="mk-row mk-in" style={at(i)}>
            <span className="mk-rank">{i + 1}</span>
            <span className="mk-who">
              <b>{person.name}</b>
              <span className="mk-bar">
                <i style={fill(person.score, i)} />
              </span>
            </span>
            <span className="mk-score">{person.score}</span>
          </li>
        ))}
      </ul>
      <div className="mk-why mk-in" style={at(5)}>
        <b>Why Aiko ranks first</b>
        <span className="mk-chip">6 yrs React</span>
        <span className="mk-chip">Fintech domain</span>
        <span className="mk-chip">Led a team of 5</span>
      </div>
    </>
  );
}

function Assessments() {
  return (
    <div className="mk-split">
      <div className="mk-dial mk-in" style={at(0)}>
        <svg viewBox="0 0 120 120">
          <circle className="mk-dial__track" cx="60" cy="60" r="50" />
          <circle className="mk-dial__value" cx="60" cy="60" r="50" pathLength="100" />
        </svg>
        <span>
          <b>86</b>of 100
        </span>
      </div>
      <ul className="mk-checks">
        {['Component architecture', 'State and data flow', 'Accessibility review', 'Live debugging task'].map(
          (label, i) => (
            <li key={label} className="mk-in" style={at(i + 1)}>
              <span className="mk-tick" />
              {label}
            </li>
          ),
        )}
        <li className="mk-note mk-in" style={at(5)}>
          Graded against your bar in 40 seconds
        </li>
      </ul>
    </div>
  );
}

function Interviews() {
  const bars = [38, 64, 46, 82, 58, 90, 52, 74, 40, 68, 86, 48, 72, 56, 34, 62, 78, 44, 66, 50];
  return (
    <>
      <div className="mk-wave mk-in" style={at(0)}>
        <span className="mk-rec" />
        {bars.map((height, i) => (
          <i key={i} style={{ height: `${height}%`, animationDelay: `${(i % 7) * -0.23}s` }} />
        ))}
        <span className="mk-time">12:48</span>
      </div>
      <p className="mk-quote mk-in" style={at(1)}>
        “We moved the cache to the edge, which cut the p95 from 900 to 210 ms…”
      </p>
      <ul className="mk-rubric">
        {[
          ['Problem solving', 92],
          ['Role knowledge', 84],
          ['Communication', 78],
        ].map(([label, value], i) => (
          <li key={label} className="mk-in" style={at(i + 2)}>
            <span>{label}</span>
            <span className="mk-bar">
              <i style={fill(value as number, i + 2)} />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Workspace() {
  const columns: [string, string[]][] = [
    ['Screen', ['JW', 'LR']],
    ['Interview', ['SM', 'DO']],
    ['Panel', ['PN']],
    ['Offer', []],
  ];
  return (
    <>
      <div className="mk-board">
        {columns.map(([title, cards], c) => (
          <div key={title} className="mk-col mk-in" style={at(c)}>
            <b>{title}</b>
            {cards.map((initials) => (
              <span key={initials} className="mk-card">
                <span className="mk-avatar">{initials}</span>
                <i />
              </span>
            ))}
            {title === 'Offer' ? (
              <span className="mk-card mk-card--moving">
                <span className="mk-avatar">AT</span>
                <i />
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mk-toast mk-in" style={at(6)}>
        <span className="mk-tick" />
        Panel approved Aiko Tanaka, moved to Offer
      </div>
    </>
  );
}

function Offers() {
  const funnel: [string, number, string][] = [
    ['Matched', 100, '300'],
    ['Screened', 71, '214'],
    ['Assessed', 34, '38'],
    ['Interviewed', 16, '12'],
    ['Offer', 7, '1'],
  ];
  return (
    <>
      <ul className="mk-funnel">
        {funnel.map(([label, value, count], i) => (
          <li key={label} className="mk-in" style={at(i)}>
            <span>{label}</span>
            <span className="mk-bar mk-bar--tall">
              <i style={fill(value, i)} />
            </span>
            <b>{count}</b>
          </li>
        ))}
      </ul>
      <div className="mk-toast mk-in" style={at(6)}>
        <span className="mk-tick" />
        Offer letter signed by Aiko Tanaka on day 19
      </div>
    </>
  );
}

const mocks = [Sourcing, Screening, Assessments, Interviews, Workspace, Offers];

export function ProductMock({ index, title }: { index: number; title: string }) {
  const Mock = mocks[index] ?? Sourcing;
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <div className="mock-body">
        <Mock />
      </div>
    </div>
  );
}
