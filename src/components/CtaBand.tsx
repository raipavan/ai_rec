import { Reveal } from './Reveal';

export function CtaBand() {
  return (
    <section className="cta-band on-dark">
      <span className="cta-bg" aria-hidden="true" />
      <span className="grain" aria-hidden="true" />
      <div className="container cta-inner">
        <Reveal>
          <h2>See it on your own requisitions</h2>
          <p>
            Bring one live role to the demo. We'll run it through sourcing, screening and interview
            scoring — live, in 30 minutes.
          </p>
        </Reveal>
        <Reveal className="cta-actions" delay={1}>
          <a className="btn btn-primary" href="#contact">
            Book a live demo
          </a>
          <a className="btn btn-outline" href="#pricing">
            Start free trial
          </a>
        </Reveal>
      </div>
    </section>
  );
}
