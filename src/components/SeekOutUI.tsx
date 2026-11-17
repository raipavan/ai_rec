import { useState, type ReactNode } from 'react';
import type { IconName } from '../data/content';
import { Icon } from './Icon';

interface HeroStat {
  value: string;
  label: string;
}

interface SkHeroProps {
  eyebrow?: string;
  eyebrowIcon?: IconName;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: HeroStat[];
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
  centered?: boolean;
  children?: ReactNode;
}

export function SkHero({
  eyebrow,
  eyebrowIcon = 'rocket',
  title,
  subtitle,
  primaryCta = { label: 'Book a demo →', href: '/get-started#book-meeting' },
  secondaryCta,
  stats,
  image,
  imageAlt = '',
  aside,
  centered = false,
  children,
}: SkHeroProps) {
  if (centered) {
    return (
      <section className="sk-hero sk-hero--centered">
        <div className="container">
          {eyebrow && (
            <span className="sk-eyebrow">
              <Icon name={eyebrowIcon} /> {eyebrow}
            </span>
          )}
          <h1 className="sk-hero-title">{title}</h1>
          <p className="sk-hero-sub">{subtitle}</p>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="sk-hero">
      <div className="container">
        <div className="sk-hero-grid">
          <div>
            {eyebrow && (
              <span className="sk-eyebrow">
                <Icon name={eyebrowIcon} /> {eyebrow}
              </span>
            )}
            <h1 className="sk-hero-title">{title}</h1>
            <p className="sk-hero-sub">{subtitle}</p>
            <div className="sk-hero-actions">
              {primaryCta && (
                <a className="sk-btn-orange" href={primaryCta.href}>
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a className="sk-btn-outline-light" href={secondaryCta.href}>
                  {secondaryCta.label}
                </a>
              )}
            </div>
            {stats && stats.length > 0 && (
              <div className="sk-hero-stats">
                {stats.map((s) => (
                  <div key={s.label} className="sk-hero-stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sk-hero-media">
            {aside ? aside : image ? <img src={image} alt={imageAlt} className="sk-hero-img" /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

const ENTERPRISE_LOGOS = [
  'FINTECH LABS',
  'CLOUDSCALE',
  'APEX HEALTH',
  'METRO SYSTEMS',
  'VERIDIAN TECH',
  'GLOBAL RETAIL',
];

export function SkLogoMarquee({
  label = 'TRUSTED BY TALENT ACQUISITION TEAMS AT GROWING ENTERPRISES',
}: {
  label?: string;
}) {
  return (
    <section className="sk-marquee">
      <div className="container">
        <p className="sk-marquee-label">{label}</p>
        <div className="sk-marquee-row">
          {ENTERPRISE_LOGOS.map((name) => (
            <span key={name} className="sk-marquee-logo">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkCtaBanner({
  title = 'Bring a role you are hiring for.',
  subtitle = 'See TalentPool365 source, screen, and shortlist live candidates for your toughest open requisition in 15 minutes.',
  primary = { label: 'Book a demo →', href: '/get-started#book-meeting' },
  secondary = { label: 'Start free trial', href: '/get-started#start-free-trial' },
}: {
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="sk-cta-banner">
      <div className="container">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div className="sk-cta-actions">
          <a className="sk-btn-orange" href={primary.href}>
            {primary.label}
          </a>
          {secondary && (
            <a className="sk-btn-outline-light" href={secondary.href}>
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function SkFaq({
  title = 'Frequently asked questions',
  items,
}: {
  title?: string;
  items: { q: string; a: string }[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="sk-band sk-band--white">
      <div className="container">
        <div className="sk-section-head sk-section-head--center">
          <span className="sk-pill-tag">FAQ</span>
          <h2 className="sk-serif-h2">{title}</h2>
        </div>
        <div className="sk-faq-list">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className={`sk-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="sk-faq-btn"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <span>{item.q}</span>
                  <Icon name="chevron-down" />
                </button>
                {isOpen && <div className="sk-faq-body">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export type VectorArtKind =
  | 'customers'
  | 'about'
  | 'solutions'
  | 'how-it-works'
  | 'support'
  | 'demo'
  | 'cover-1'
  | 'cover-2'
  | 'cover-3';

export function SkVectorArt({ kind, className = '' }: { kind: VectorArtKind; className?: string }) {
  if (kind === 'customers') {
    return (
      <svg viewBox="0 0 420 300" className={`sk-hero-img ${className}`.trim()} aria-hidden="true">
        <rect width="420" height="300" rx="18" fill="#0F3532" />
        <circle cx="340" cy="60" r="85" fill="#184E48" opacity="0.6" />
        <rect x="44" y="60" width="210" height="140" rx="14" fill="#FCF8F2" />
        <rect x="64" y="84" width="90" height="12" rx="6" fill="#123F3B" />
        <rect x="64" y="106" width="140" height="8" rx="4" fill="#94A3B8" />
        <rect x="64" y="136" width="32" height="44" rx="6" fill="#BEE8D5" />
        <rect x="108" y="118" width="32" height="62" rx="6" fill="#146E63" />
        <rect x="152" y="100" width="32" height="80" rx="6" fill="#FF7A00" />
        <rect x="196" y="124" width="32" height="56" rx="6" fill="#123F3B" />
        <rect x="210" y="138" width="166" height="106" rx="14" fill="#FFFFFF" />
        <circle cx="250" cy="176" r="18" fill="#E6F4F0" />
        <path d="M242 176l6 6 12-12" stroke="#146E63" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="280" y="164" width="74" height="10" rx="5" fill="#123F3B" />
        <rect x="280" y="182" width="54" height="8" rx="4" fill="#94A3B8" />
        <rect x="234" y="210" width="118" height="16" rx="8" fill="#FF7A00" />
      </svg>
    );
  }

  if (kind === 'about') {
    return (
      <svg viewBox="0 0 420 300" className={`sk-hero-img ${className}`.trim()} aria-hidden="true">
        <rect width="420" height="300" rx="18" fill="#0F3532" />
        <circle cx="210" cy="150" r="108" fill="#164A45" />
        <line x1="210" y1="150" x2="110" y2="85" stroke="#BEE8D5" strokeWidth="2.5" strokeDasharray="5 5" />
        <line x1="210" y1="150" x2="315" y2="88" stroke="#BEE8D5" strokeWidth="2.5" strokeDasharray="5 5" />
        <line x1="210" y1="150" x2="118" y2="220" stroke="#BEE8D5" strokeWidth="2.5" strokeDasharray="5 5" />
        <line x1="210" y1="150" x2="310" y2="218" stroke="#BEE8D5" strokeWidth="2.5" strokeDasharray="5 5" />
        <circle cx="210" cy="150" r="42" fill="#FF7A00" />
        <circle cx="210" cy="150" r="24" fill="#FCF8F2" />
        <circle cx="110" cy="85" r="26" fill="#FCF8F2" />
        <circle cx="110" cy="80" r="8" fill="#123F3B" />
        <path d="M96 99c0-7 6-11 14-11s14 4 14 11" fill="#146E63" />
        <circle cx="315" cy="88" r="26" fill="#BEE8D5" />
        <circle cx="315" cy="83" r="8" fill="#123F3B" />
        <path d="M301 102c0-7 6-11 14-11s14 4 14 11" fill="#123F3B" />
        <circle cx="118" cy="220" r="24" fill="#BEE8D5" />
        <circle cx="310" cy="218" r="24" fill="#FCF8F2" />
      </svg>
    );
  }

  if (kind === 'solutions' || kind === 'how-it-works') {
    return (
      <svg viewBox="0 0 420 300" className={`sk-hero-img ${className}`.trim()} aria-hidden="true">
        <rect width="420" height="300" rx="18" fill="#0F3532" />
        <rect x="40" y="54" width="150" height="86" rx="12" fill="#FCF8F2" />
        <rect x="56" y="74" width="68" height="10" rx="5" fill="#123F3B" />
        <rect x="56" y="94" width="110" height="8" rx="4" fill="#94A3B8" />
        <rect x="56" y="112" width="48" height="12" rx="6" fill="#FF7A00" />
        <rect x="230" y="54" width="150" height="86" rx="12" fill="#E6F4F0" />
        <rect x="246" y="74" width="80" height="10" rx="5" fill="#123F3B" />
        <rect x="246" y="94" width="104" height="8" rx="4" fill="#64748B" />
        <rect x="246" y="112" width="64" height="12" rx="6" fill="#146E63" />
        <rect x="95" y="164" width="230" height="90" rx="14" fill="#FFFFFF" />
        <circle cx="135" cy="209" r="22" fill="#FF7A00" />
        <path d="M126 209l6 6 13-13" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="172" y="192" width="120" height="12" rx="6" fill="#123F3B" />
        <rect x="172" y="214" width="90" height="9" rx="4.5" fill="#94A3B8" />
      </svg>
    );
  }

  if (kind === 'support' || kind === 'demo') {
    return (
      <svg viewBox="0 0 420 260" className={`sk-hero-img ${className}`.trim()} aria-hidden="true">
        <rect width="420" height="260" rx="16" fill="#0F3532" />
        <rect x="44" y="42" width="332" height="176" rx="14" fill="#FCF8F2" />
        <circle cx="84" cy="84" r="18" fill="#123F3B" />
        <rect x="114" y="74" width="120" height="10" rx="5" fill="#123F3B" />
        <rect x="114" y="92" width="80" height="8" rx="4" fill="#94A3B8" />
        <rect x="280" y="74" width="68" height="24" rx="12" fill="#E6F4F0" />
        <rect x="66" y="128" width="288" height="14" rx="7" fill="#E2E8F0" />
        <rect x="66" y="128" width="204" height="14" rx="7" fill="#146E63" />
        <rect x="66" y="162" width="130" height="32" rx="16" fill="#FF7A00" />
        <rect x="210" y="162" width="144" height="32" rx="16" fill="#E6F4F0" />
      </svg>
    );
  }

  // Resource Card Cover Art (cover-1, cover-2, cover-3)
  const bg = kind === 'cover-1' ? '#123F3B' : kind === 'cover-2' ? '#164E48' : '#0F3532';
  const accent = kind === 'cover-1' ? '#FF7A00' : kind === 'cover-2' ? '#BEE8D5' : '#34D399';
  return (
    <svg viewBox="0 0 480 180" className={`sk-cover-svg ${className}`.trim()} aria-hidden="true">
      <rect width="480" height="180" fill={bg} />
      <circle cx="400" cy="40" r="90" fill="#ffffff" opacity="0.06" />
      <circle cx="90" cy="160" r="70" fill={accent} opacity="0.18" />
      <rect x="38" y="42" width="180" height="96" rx="12" fill="#FCF8F2" />
      <rect x="56" y="64" width="96" height="10" rx="5" fill="#123F3B" />
      <rect x="56" y="84" width="140" height="8" rx="4" fill="#94A3B8" />
      <rect x="56" y="102" width="84" height="14" rx="7" fill={accent} />
      <rect x="244" y="54" width="196" height="72" rx="12" fill="rgba(255,255,255,0.12)" />
      <circle cx="282" cy="90" r="18" fill={accent} />
      <rect x="314" y="78" width="98" height="10" rx="5" fill="#FFFFFF" />
      <rect x="314" y="96" width="68" height="8" rx="4" fill="#BEE8D5" />
    </svg>
  );
}
