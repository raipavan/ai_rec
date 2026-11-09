import { team, timeline, values } from '../data/content';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function About() {
  return (
    <section className="section section--tint" id="about">
      <div className="container">
        <div className="split" style={{ marginBottom: 88 }}>
          <Reveal className="split-copy" variant="left">
            <p className="eyebrow">About TalentPool365</p>
            <h2>Built by recruiters who were tired of recruiting software</h2>
            <p>
              TalentPool365 started in 2019 inside a 40-person agency that was drowning in resumes.
              The first version was an internal matching tool; it cut their screening workload by
              half in a month. It became a company when their clients refused to give it back.
            </p>
            <p>
              Today the platform processes over two million interviews a year across 40 countries.
              The rule from day one still stands: AI does the busywork, recruiters make the
              decisions, and every score can be explained to a candidate, a client or a regulator.
            </p>
            <a className="btn btn-dark" href="#contact">
              Work with us — we're hiring
            </a>
          </Reveal>

          <Reveal className="split-media" variant="right" delay={1}>
            <ol className="timeline">
              {timeline.map((entry) => (
                <li key={entry.year}>
                  <span className="year">{entry.year}</span>
                  <p>
                    <strong>{entry.title}</strong> {entry.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <SectionHead eyebrow="What we optimize for" title="Four commitments we hire and ship by" />

        <div className="grid grid-4 value-grid">
          {values.map((value, index) => (
            <Reveal as="article" key={value.title} className="card" delay={index}>
              <h4>{value.title}</h4>
              <p>{value.body}</p>
            </Reveal>
          ))}
        </div>

        <SectionHead
          eyebrow="Leadership"
          title="The people accountable for the product"
          style={{ marginTop: 88 }}
        />

        <div className="grid team-grid">
          {team.map((member, index) => (
            <Reveal as="article" key={member.name} className="card team-card" delay={index}>
              <span className="team-avatar" aria-hidden="true">
                {member.initials}
              </span>
              <h4>{member.name}</h4>
              <span className="role">{member.role}</span>
              <p>{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
