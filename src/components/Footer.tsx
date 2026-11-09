import { useState, type FormEvent } from 'react';
import { footerColumns, footerLegalLinks } from '../data/content';

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
    event.currentTarget.reset();
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#home" aria-label="TalentPool365 home">
              <img
                className="brand-logo"
                src="/assets/talentpool365-logo-light.png"
                alt=""
                width="462"
                height="76"
              />
            </a>
            <p>The AI recruitment platform for teams that measure hiring in days.</p>
            <form className="newsletter" onSubmit={onSubmit}>
              <label className="newsletter-label" htmlFor="nl-email">
                Hiring notes, once a month
              </label>
              <div className="newsletter-row">
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
                <button className="btn btn-accent btn--sm" type="submit">
                  Subscribe
                </button>
              </div>
              <p className="newsletter-hint" aria-live="polite">
                {subscribed
                  ? "You're on the list — the first notes arrive next month."
                  : 'One short email. Unsubscribe anytime.'}
              </p>
            </form>
          </div>

          <div className="footer-cols">
            {footerColumns.map((column) => (
              <div className="footer-col" key={column.title}>
                <h4>{column.title}</h4>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} TalentPool365 B.V. All rights reserved.</p>
          <ul>
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
