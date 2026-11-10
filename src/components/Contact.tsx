import { useState, type FormEvent } from 'react';
import { Reveal } from './Reveal';

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="split" style={{ alignItems: 'start' }}>
          <Reveal className="split-copy" variant="left">
            <h2>Talk to a human who knows hiring</h2>
            <p>
              No SDR scripts, no 45-minute qualification gauntlet. You get a product specialist and,
              if you want, a working pilot on your own data within a week.
            </p>
            <ul className="ticks" style={{ marginTop: 20 }}>
              <li>Reply within one business day</li>
              <li>Live demo on your real requisitions</li>
              <li>Pilot sandbox with your data — free</li>
            </ul>
            <p style={{ marginTop: 28 }}>
              <strong style={{ color: 'var(--color-primary)' }}>Prefer email?</strong>
              <br />
              <a href="mailto:sales@talentpool365.com">sales@talentpool365.com</a>
              <br />
              <span className="caption">+31 20 240 8365 · Amsterdam · Bengaluru · Austin</span>
            </p>
          </Reveal>

          <Reveal className="form-panel" variant="right" delay={1}>
            <form onSubmit={onSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-name">
                    Full name <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input id="f-name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="f-email">
                    Work email <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input id="f-email" name="email" type="email" autoComplete="email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-company">
                    Company <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input id="f-company" name="company" type="text" autoComplete="organization" required />
                </div>
                <div className="field">
                  <label htmlFor="f-size">Hiring volume</label>
                  <select id="f-size" name="volume" defaultValue="10 – 100 hires / year">
                    <option>Under 10 hires / year</option>
                    <option>10 – 100 hires / year</option>
                    <option>100 – 1,000 hires / year</option>
                    <option>1,000+ hires / year</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-msg">What are you hiring for?</label>
                <textarea
                  id="f-msg"
                  name="message"
                  placeholder="Roles, current tools, what's slowing you down…"
                />
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                Talk to sales
              </button>
              <p className="hint caption" style={{ marginTop: 14 }} aria-live="polite">
                {sent
                  ? 'Thanks — a product specialist will reply within one business day.'
                  : 'By submitting you agree to our privacy policy. We never share your details.'}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
