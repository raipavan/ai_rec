import { heroProof } from '../data/content';
import { enterDelay } from '../lib/motion';
import { Icon } from './Icon';

export function Hero() {
  return (
    <section className="hero on-dark" id="home">
      <span className="grain" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow enter" style={enterDelay(0)}>
              AI recruitment platform
            </p>
            <h1 className="enter" style={enterDelay(1)}>
              Hiring that's measured in <span className="hl">days</span>, not months.
            </h1>
            <p className="lede enter" style={enterDelay(2)}>
              TalentPool365 sources, screens, assesses and interviews candidates automatically —
              so your recruiters spend their time on people worth hiring, not resumes worth skipping.
            </p>
            <div className="hero-cta enter" style={enterDelay(3)}>
              <a className="btn btn-primary" href="#contact">
                Book a live demo
              </a>
              <a className="btn btn-outline" href="#how-it-works">
                <Icon name="play" className="icon" />
                Watch the 3-min tour
              </a>
            </div>
            <ul className="hero-proof enter" style={enterDelay(4)}>
              {heroProof.map((item) => (
                <li key={item}>
                  <Icon name="shield" strokeWidth={2.4} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-visual enter" style={enterDelay(2, 120)}>
            <img
              src="/assets/dashboard-hero.jpg"
              width="1536"
              height="1024"
              fetchPriority="high"
              decoding="async"
              alt="TalentPool365 hiring dashboard showing a candidate pipeline, funnel chart and KPI cards"
            />
            <div className="hero-panel" aria-hidden="true">
              <p className="hero-panel__label">Screening complete</p>
              <p className="hero-panel__value">
                214 <span>of 300 scored in 8 min</span>
              </p>
              <div className="hero-panel__meter">
                <i />
              </div>
            </div>
            <div className="hero-chip">
              <span className="dot" aria-hidden="true">
                <Icon name="trend" />
              </span>
              <span>
                <strong>19 days</strong>median time-to-hire
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
