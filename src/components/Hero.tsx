import { useEffect, useRef, useState } from 'react';
import { heroProof, heroRoles, heroStages } from '../data/content';
import { enterDelay, prefersReducedMotion } from '../lib/motion';
import { useAutoRotate } from '../lib/useAutoRotate';
import { Icon } from './Icon';
import { Network } from './Network';

/** Swaps the role in the headline every few seconds. Static under reduced motion. */
function useRotatingRole(count: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [count]);

  return index;
}

export function Hero() {
  const role = useRotatingRole(heroRoles.length);
  const journey = useAutoRotate<HTMLDivElement>(heroStages.length, 3400);
  const sectionRef = useRef<HTMLElement>(null);

  // 3D: the dashboard leans toward the pointer and its floating cards shift with depth
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty('--px', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
      section.style.setProperty('--py', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
    };
    section.addEventListener('pointermove', onMove, { passive: true });
    return () => section.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section className="hero on-dark" id="home" ref={sectionRef}>
      <span className="hero-bg" aria-hidden="true" />
      <span className="grain" aria-hidden="true" />
      <Network />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="enter" style={enterDelay(0)}>
              <span className="sr-only">Hire the people you need in days, not months.</span>
              <span aria-hidden="true">
                <span className="h1-line">
                  Hire{' '}
                <span className="role-swap">
                  <span className="accent role-word" key={role}>
                    {heroRoles[role]}
                  </span>
                  </span>
                </span>
                <span className="h1-line">in days,</span> <span className="h1-line">not months.</span>
              </span>
            </h1>
            <p className="lede enter" style={enterDelay(1)}>
              TalentPool365 sources, screens, assesses and interviews candidates automatically —
              so your recruiters spend their time on people worth hiring, not resumes worth skipping.
            </p>
            <div className="hero-cta enter" style={enterDelay(2)}>
              <a className="btn btn-primary" href="#contact">
                Book a live demo
              </a>
              <a className="btn btn-outline" href="#demo">
                <Icon name="play" className="icon" />
                Watch the 30-sec tour
              </a>
            </div>
            <ul className="hero-proof enter" style={enterDelay(3)}>
              {heroProof.map((item) => (
                <li key={item}>
                  <Icon name="shield" strokeWidth={2.4} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="hero-visual enter"
            style={enterDelay(2, 120)}
            ref={journey.ref}
            {...journey.holdProps}
          >
            <div className="hero-shot">
              <img
                src="/assets/dashboard-hero.jpg"
                width="1536"
                height="1024"
                fetchPriority="high"
                decoding="async"
                alt="TalentPool365 hiring dashboard showing a candidate pipeline, funnel chart and KPI cards"
              />
            </div>

            <div className="hero-chip">
              <span className="dot" aria-hidden="true">
                <Icon name="trend" />
              </span>
              <span>
                <strong>19 days</strong>median time-to-hire
              </span>
            </div>

            <div className="journey" role="group" aria-label="Follow one requisition through the platform">
              <ol className="journey-rail">
                {heroStages.map((item, i) => (
                  <li
                    key={item.label}
                    className={
                      i < journey.index ? 'is-done' : i === journey.index ? 'is-active' : undefined
                    }
                  >
                    <button
                      type="button"
                      aria-current={i === journey.index ? 'step' : undefined}
                      onClick={() => journey.select(i)}
                    >
                      <span className="journey-dot" aria-hidden="true" />
                      {item.label}
                    </button>
                    {i === journey.index ? (
                      <span
                        className={`journey-fill${journey.running ? ' is-running' : ''}`}
                        key={`${journey.index}-${journey.running}`}
                        aria-hidden="true"
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
              {journey.canAutoPlay ? (
                <button
                  className="auto-toggle"
                  type="button"
                  aria-label={journey.paused ? 'Play the hiring walkthrough' : 'Pause the hiring walkthrough'}
                  onClick={journey.togglePaused}
                >
                  <Icon name={journey.paused ? 'play' : 'pause'} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
