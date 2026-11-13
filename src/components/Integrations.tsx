import type { CSSProperties } from 'react';
import { integrations } from '../data/content';
import { Orbit } from './Orbit';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function Integrations() {
  return (
    <section className="section" id="integrations">
      <div className="container">
        <SectionHead
          center
          eyebrow="Integrations"
          title="Plugs into the stack *you already run*"
          body="Two-way sync with your ATS and HRMS from day one. No migration project, no duplicate entry."
        />

        <div className="int-layout">
          <Orbit />
        <Reveal className="int-grid">
          {integrations.map((integration, index) => (
            <div
              className="int-tile"
              key={integration.label}
              style={{ '--i': index } as CSSProperties}
            >
              <span className="int-mark" aria-hidden="true">
                {integration.mark}
              </span>
              {integration.label}
            </div>
          ))}
        </Reveal>
        </div>

        <Reveal
          className="section-head"
          style={{ margin: '48px auto 0', textAlign: 'center', maxWidth: 560 }}
        >
          <p className="lead" style={{ fontSize: '1rem' }}>
            Running something else? The REST API and webhooks cover custom ATS setups — most
            integrations go live in under two weeks.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
