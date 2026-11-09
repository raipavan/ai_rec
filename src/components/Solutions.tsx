import { industries } from '../data/content';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function Solutions() {
  return (
    <section className="section" id="solutions">
      <div className="container">
        <SectionHead
          eyebrow="Solutions by industry"
          title="Built for the way your sector hires"
          body="Compliance rules, licensing checks, seasonal spikes — every industry hires differently. These playbooks ship with the platform, not as a services upsell."
        />

        <div className="grid grid-3">
          {industries.map((industry, index) => (
            <Reveal
              as="article"
              key={industry.title}
              className="card industry-card"
              delay={index % 3}
            >
              <span className="icon-tile">
                <Icon name={industry.icon} />
              </span>
              <h3>{industry.title}</h3>
              <p>{industry.body}</p>
              <p className="stat">
                <strong>{industry.statValue}</strong>
                {industry.statLabel}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
