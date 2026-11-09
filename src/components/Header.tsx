import { useEffect, useRef, useState } from 'react';
import { navItems, sectionIds } from '../data/content';
import { useActiveSection } from '../lib/useActiveSection';
import { useScrolled } from '../lib/useScrolled';

export function Header() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="TalentPool365 home">
          <img
            className="brand-logo"
            src="/assets/talentpool365-logo.png"
            alt=""
            width="462"
            height="76"
          />
        </a>

        <nav
          className={`main-nav${open ? ' is-open' : ''}`}
          id="main-nav"
          aria-label="Primary"
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a className="link-quiet" href="#contact">
            Sign in
          </a>
          <a className="btn btn-primary btn--sm" href="#contact">
            Book a demo
          </a>
          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
