import { companyLogos } from '../data/content';
import { Reveal } from './Reveal';

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="logo-row" aria-hidden={hidden || undefined}>
      {companyLogos.map((logo) => (
        <li key={logo.name} className={logo.style}>
          {logo.name}
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section className="logos" aria-label="Customers">
      <Reveal className="container">
        <p>Trusted by talent teams at</p>
        <div className="logo-marquee">
          <div className="logo-track">
            <LogoRow />
            <LogoRow hidden />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
