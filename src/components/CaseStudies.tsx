import { caseStudies } from '../data/content';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function CaseStudies() {
  return (
    <section className="section section--light" id="case-studies">
      <div className="container">
        <SectionHead
          center
          eyebrow="Case studies"
          title="Teams that *stopped chasing* candidates"
          body="Three hiring teams, the problem each one started with, and what changed."
        />

        <div className="grid case-grid">
          {caseStudies.map((study, index) => (
            <Reveal as="article" key={study.company} className="case-card" delay={index}>
              <header className="case-head">
                <h3>{study.company}</h3>
                <span className="case-tag">{study.industry}</span>
              </header>
              <p className="case-stat">
                <strong>{study.stat}</strong>
                {study.statLabel}
              </p>
              <dl className="case-body">
                <div>
                  <dt>Challenge</dt>
                  <dd>{study.challenge}</dd>
                </div>
                <div>
                  <dt>What changed</dt>
                  <dd>{study.approach}</dd>
                </div>
              </dl>
              <ul className="ticks case-results">
                {study.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
              <a className="case-link" href="#contact">
                Request the full case study <span aria-hidden="true">&rarr;</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
