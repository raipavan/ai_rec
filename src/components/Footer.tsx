import { footerColumns, footerLegalLinks } from '../data/content';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="/" aria-label="TalentPool365 home">
              <img
                className="brand-logo"
                src="/assets/talentpool365-logo-light.png"
                alt=""
                width="462"
                height="76"
              />
            </a>
            <p>The AI recruitment platform for teams that measure hiring in days.</p>
            <div className="footer-reading">
              <p>A little perspective for your next hiring day.</p>
              <a href="/blog">Read our hiring notes <span aria-hidden="true">&nbsp;→</span></a>
            </div>
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
