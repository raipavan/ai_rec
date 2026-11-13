import { useEffect, useRef, useState } from 'react';
import { navItems, sectionIds } from '../data/content';
import { useActiveSection } from '../lib/useActiveSection';
import { useScrolled } from '../lib/useScrolled';
import { Icon } from './Icon';

const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function Header() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const caretRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const progressRef = useRef<HTMLSpanElement>(null);

  // Reading-progress line along the bottom edge of the header
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const done = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${done})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const closeNavigation = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (openMenu) {
        const menu = openMenu;
        setOpenMenu(null);
        caretRefs.current[menu]?.focus();
        return;
      }

      if (open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, openMenu]);

  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openMenu]);

  const toggleMobileNav = () => {
    if (open) setOpenMenu(null);
    setOpen(!open);
  };

  return (
    <header ref={headerRef} className={`site-header${scrolled ? ' is-scrolled' : ''}${!scrolled && !open ? ' is-top' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="TalentPool365 home">
          <img
            className="brand-logo"
            src="/assets/talentpool365-logo.png"
            alt=""
            width="462"
            height="76"
          />
          <img
            className="brand-logo brand-logo--light"
            src="/assets/talentpool365-logo-light.png"
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
            {navItems.map((item) => {
              const hasMenu = Boolean(item.links?.length);
              const isOpen = openMenu === item.id;

              return (
                <li
                  key={item.id}
                  className={`nav-entry${hasMenu ? ' has-menu' : ''}${isOpen ? ' is-open' : ''}`}
                  onMouseEnter={
                    hasMenu
                      ? () => {
                          if (canHover()) setOpenMenu(item.id);
                        }
                      : undefined
                  }
                  onMouseLeave={
                    hasMenu
                      ? () => {
                          if (canHover()) setOpenMenu(null);
                        }
                      : undefined
                  }
                >
                  <div className="nav-row">
                    <a
                      href={`#${item.id}`}
                      aria-current={active === item.id ? 'page' : undefined}
                      onClick={closeNavigation}
                    >
                      {item.label}
                    </a>
                    {hasMenu ? (
                      <button
                        ref={(node) => {
                          caretRefs.current[item.id] = node;
                        }}
                        className="nav-caret"
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`nav-menu-${item.id}`}
                        aria-label={`${item.label} menu`}
                        onClick={() => setOpenMenu(isOpen ? null : item.id)}
                      >
                        <Icon name="chevron-down" />
                      </button>
                    ) : null}
                  </div>

                  {hasMenu ? (
                    <div className="nav-menu" id={`nav-menu-${item.id}`} inert={!isOpen}>
                      <div className="nav-menu-panel">
                        <div className="nav-mega">
                          {item.intro ? (
                            <div className="nav-mega-intro">
                              <p className="nav-mega-title">{item.intro.title}</p>
                              <p className="nav-mega-blurb">{item.intro.blurb}</p>
                              <img src={item.intro.image} alt="" width="1536" height="1024" loading="lazy" decoding="async" />
                            </div>
                          ) : null}
                          <ul className="nav-mega-links">
                            {item.links?.map((link) => (
                              <li key={link.label}>
                                <a href={link.href} onClick={closeNavigation}>
                                  <span className="nav-mega-label">{link.label}</span>
                                  {link.desc ? <span className="nav-mega-desc">{link.desc}</span> : null}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
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
            onClick={toggleMobileNav}
          >
            <span />
          </button>
        </div>
      </div>
      <span className="scroll-progress" ref={progressRef} aria-hidden="true" />
    </header>
  );
}
