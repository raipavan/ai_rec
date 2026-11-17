import { useState, type CSSProperties, type ReactNode } from 'react';
import { About } from '../components/About';
import { AnimatedValue } from '../components/AnimatedValue';
import { CinematicCard } from '../components/CinematicMotion';
import { Contact } from '../components/Contact';
import { CtaBand } from '../components/CtaBand';
import { Icon } from '../components/Icon';
import { LeadForm, type LeadField } from '../components/LeadForm';
import { Metrics } from '../components/Metrics';
import { RailLayout, RailSteps } from '../components/RailSteps';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { SkHero, SkVectorArt } from '../components/SeekOutUI';
import { SubNav } from '../components/SubNav';
import {
  benefits,
  buildingBlocks,
  companyLinks,
  contactChannels,
  guardrails,
  hiringSteps,
  leaders,
  leadershipPrinciples,
  mediaAssets,
  offices,
  partnerPrograms,
  partnerSteps,
  platformFacts,
  pressItems,
  researchTracks,
  scoreSteps,
  vacancies,
  workPrinciples,
} from '../data/company';

interface CompanyShellProps {
  /** Words that rotate in place of the headline's accent phrase. */
  rotate?: string[];
  /** Path of this page, to mark it in the company navigation. */
  path: string;
  label: string;
  title: string;
  lede: string;
  actions?: ReactNode;
  children: ReactNode;
}

/** Shared frame of the seven company pages: hero plus the company navigation. */
function CompanyShell({ path, label, title, lede, children }: CompanyShellProps) {
  return (
    <main className="sk-page">
      <SkHero
        eyebrow={`COMPANY · ${label.toUpperCase()}`}
        eyebrowIcon="building"
        title={title.replace(/\*/g, '')}
        subtitle={lede}
        primaryCta={{ label: 'Book a demo →', href: '/get-started#book-meeting' }}
        secondaryCta={{ label: 'Contact us', href: '/company/contact' }}
        aside={<SkVectorArt kind="about" />}
      />
      <SubNav label="Company pages" links={companyLinks} current={path} />
      {children}
    </main>
  );
}

/* ---------- About us ---------- */

export function AboutPage() {
  return (
    <CompanyShell
      path="/company/about"
      label="About us"
      title="AI does the busywork. *Recruiters decide.*"
      lede="TalentPool365 began as an internal tool in a recruitment agency. It is now the hiring platform for teams in 40 countries, and the rule it started with has not changed."
    >
      <About />
      <Metrics />
      <section className="section">
        <div className="container">
          <SectionHead title="More about *the company*" />
          <div className="grid grid-3">
            {[
              { href: '/company/leadership', icon: 'users' as const, title: 'Leadership team', body: 'Who is accountable for the product, the models and your data.' },
              { href: '/company/technology', icon: 'cpu' as const, title: 'Technology & innovation', body: 'How a score gets made, and the guardrails around it.' },
              { href: '/company/careers', icon: 'briefcase' as const, title: 'Careers', body: 'Open roles in Amsterdam, Bengaluru and Austin.' },
            ].map((item, index) => (
              <Reveal key={item.href} delay={index}>
                <a className="card link-card" href={item.href}>
                  <span className="icon-tile">
                    <Icon name={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </CompanyShell>
  );
}

/* ---------- Leadership team ---------- */

export function LeadershipPage() {
  return (
    <CompanyShell
      path="/company/leadership"
      label="Leadership team"
      title="The people *accountable* for your hiring platform"
      lede="Six leaders, each with a named area they answer for. Most of them were recruiters or customers before they worked here."
    >
      <section className="section section--light">
        <div className="container">
          <div className="grid leader-grid">
            {leaders.map((leader, index) => (
              <Reveal as="article" className="card leader-card" key={leader.name} delay={index % 3}>
                <span className="avatar" aria-hidden="true">
                  {leader.initials}
                </span>
                <h3>{leader.name}</h3>
                <p className="leader-title">{leader.title}</p>
                <p>{leader.bio}</p>
                <p className="leader-owns">
                  <span>Answers for</span>
                  {leader.owns}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="How the team *leads*" />
          <div className="grid grid-3">
            {leadershipPrinciples.map((principle, index) => (
              <Reveal as="article" className="card" key={principle.title} delay={index}>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="section-foot">
            Want to work with them? <a href="/company/careers">See open roles</a>
          </p>
        </div>
      </section>
      <CtaBand />
    </CompanyShell>
  );
}

/* ---------- Careers ---------- */

const teams = ['All teams', ...Array.from(new Set(vacancies.map((vacancy) => vacancy.team)))];

const applyHref = (title: string) =>
  `mailto:careers@talentpool365.com?subject=${encodeURIComponent(`Application: ${title}`)}`;

export function CareersPage() {
  const [team, setTeam] = useState(teams[0]);
  const shown = vacancies.filter((vacancy) => team === teams[0] || vacancy.team === team);

  return (
    <CompanyShell
      path="/company/careers"
      label="Careers"
      title="Help make hiring *fair and fast*"
      rotate={['fair and fast', 'explainable', 'human-led', 'evidence-based']}
      lede="We build the tools that decide how millions of people are considered for a job. That is worth doing carefully, with people who care about getting it right."
      actions={
        <a className="btn btn-primary" href="#open-roles">
          See {vacancies.length} open roles
        </a>
      }
    >
      <section className="section section--light" id="how-we-work">
        <div className="container">
          <SectionHead title="How we *work*" />
          <div className="grid grid-4">
            {workPrinciples.map((principle, index) => (
              <Reveal as="article" className="card" key={principle.title} delay={index}>
                <span className="icon-tile">
                  <Icon name={principle.icon} />
                </span>
                <h4>{principle.title}</h4>
                <p>{principle.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="benefits">
            <h3>What you get</h3>
            <ul className="ticks">
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="open-roles">
        <div className="container">
          <SectionHead
            title="Open *roles*"
            body="Applications go to a person on the hiring team. If nothing fits, write to us anyway and say what you would like to do."
          />

          <div className="filter" role="group" aria-label="Filter roles by team">
            {teams.map((name) => (
              <button
                key={name}
                type="button"
                className="filter-opt"
                aria-pressed={team === name}
                onClick={() => setTeam(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <p className="sr-only" role="status">
            {shown.length} {shown.length === 1 ? 'role' : 'roles'} shown
          </p>

          <ul className="role-list" key={team}>
            {shown.map((vacancy, index) => (
              <li key={vacancy.title} style={{ '--i': index } as CSSProperties}>
                <div>
                  <h3>{vacancy.title}</h3>
                  <p>
                    {vacancy.team}, {vacancy.location}, {vacancy.type}
                  </p>
                </div>
                <a className="btn btn-outline btn--sm" href={applyHref(vacancy.title)}>
                  Apply<span className="sr-only"> for {vacancy.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="section-foot">
            No matching role? <a href={applyHref('Open application')}>Send an open application</a>
          </p>
        </div>
      </section>

      <section className="section section--light" id="hiring-process">
        <RailLayout
          title="How we *hire*"
          body="The same process our customers run, on our own product. You can ask to see your scores at any stage."
          steps={hiringSteps}
        />
      </section>
    </CompanyShell>
  );
}

/* ---------- Partners ---------- */

const partnerFields: LeadField[] = [
  { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company', required: true, autoComplete: 'organization' },
  {
    name: 'program',
    label: 'Partner programme',
    type: 'select',
    options: partnerPrograms.map((program) => program.title),
  },
  {
    name: 'about',
    label: 'Your business and the customers you serve',
    type: 'textarea',
    placeholder: 'Markets, typical customer size, what you would like to build or sell…',
    wide: true,
  },
];

export function PartnersPage() {
  return (
    <CompanyShell
      path="/company/partners"
      label="Partners"
      title="Build, implement or refer: *three ways* to partner"
      lede="Hiring teams rarely buy one tool on its own. We work with the companies that build, install and recommend the rest of their stack."
      actions={
        <a className="btn btn-primary" href="#become-a-partner">
          Apply to partner
        </a>
      }
    >
      <section className="section section--light" id="programs">
        <div className="container">
          <SectionHead title="Partner *programmes*" />
          <div className="grid grid-3">
            {partnerPrograms.map((program, index) => (
              <Reveal as="article" className="card program-card" key={program.title} delay={index}>
                <span className="icon-tile">
                  <Icon name={program.icon} />
                </span>
                <h3>{program.title}</h3>
                <p className="program-who">{program.who}</p>
                <p>{program.body}</p>
                <ul className="ticks">
                  {program.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="become-a-partner">
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal className="split-copy" variant="left">
              <h2>
                Become a <em className="accent">partner</em>
              </h2>
              <p>Four steps from first message to first shared customer.</p>
              <RailSteps steps={partnerSteps} className="steps--compact" />
            </Reveal>
            <Reveal className="split-media" variant="right" delay={1}>
              <LeadForm
                fields={partnerFields}
                submitLabel="Prepare partner enquiry"
                hint="A partner manager replies within two business days."
                recipient="partners@talentpool365.com"
                subject="Partner application"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </CompanyShell>
  );
}

/* ---------- Technology & innovation ---------- */

export function TechnologyPage() {
  return (
    <CompanyShell
      path="/company/technology"
      label="Technology & innovation"
      title="If the model cannot explain it, *it does not ship*"
      lede="Hiring decisions affect people's lives, so the technology is built to be checked. Here is how a score is produced, what limits are placed on it and what we are working on next."
    >
      <section className="section section--light" id="how-a-score-is-made">
        <RailLayout
          title="How a score *gets made*"
          body="The same four steps for a resume, a test answer or an interview. The last one is always a person."
          steps={scoreSteps}
        />
      </section>

      <section className="section" id="guardrails">
        <div className="container">
          <SectionHead
            title="The *guardrails*"
            body="Four limits that apply to every model on the platform. They are written into customer contracts, not just into this page."
          />
          <div className="grid grid-4">
            {guardrails.map((guardrail, index) => (
              <Reveal as="article" className="card" key={guardrail.title} delay={index}>
                <span className="icon-tile">
                  <Icon name={guardrail.icon} />
                </span>
                <h4>{guardrail.title}</h4>
                <p>{guardrail.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="section-foot">
            The controls behind these are on the{' '}
            <a href="/products/compliance-security">Compliance &amp; Security</a> page.
          </p>
        </div>
      </section>

      <section className="sk-band sk-band--cream" id="platform">
        <div className="container">
          <div className="sk-section-head">
            <span className="sk-pill-tag">INFRASTRUCTURE &amp; RELIABILITY</span>
            <h2 className="sk-serif-h2">The platform underneath</h2>
            <p className="sk-section-sub">
              Enterprise security, audited uptime, and low-latency pipelines engineered to run across global hiring teams.
            </p>
          </div>

          <div className="sk-grid-4" style={{ marginBottom: 28 }}>
            {platformFacts.map((fact, index) => (
              <CinematicCard key={fact.label} variant="zoom" delay={index} className="tech-stat-card">
                <strong className="tech-stat-val">
                  <AnimatedValue value={fact.value} />
                </strong>
                <span className="tech-stat-lbl">{fact.label}</span>
              </CinematicCard>
            ))}
          </div>

          <div className="sk-grid-3">
            {buildingBlocks.map((block, index) => (
              <CinematicCard key={block.title} variant="up" delay={index} className="sk-card sk-card--top-accent">
                <span className="sk-pill-tag" style={{ width: 'fit-content', marginBottom: 4 }}>
                  CORE LAYER 0{index + 1}
                </span>
                <h3>{block.title}</h3>
                <p>{block.body}</p>
              </CinematicCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light" id="research">
        <div className="container">
          <SectionHead
            title="What we are *working on*"
            body="Current research. None of it reaches customers until it has passed the same bias audit as everything else."
          />
          <div className="grid grid-3">
            {researchTracks.map((track, index) => (
              <Reveal as="article" className="card" key={track.title} delay={index}>
                <h3>{track.title}</h3>
                <p>{track.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </CompanyShell>
  );
}

/* ---------- News & press releases ---------- */

export function NewsPage() {
  return (
    <CompanyShell
      path="/company/news"
      label="News & press releases"
      title="News and *press releases*"
      lede="Company announcements, product launches and audit results, newest first."
      actions={
        <a className="btn btn-outline" href="#media-kit">
          Go to the media kit
        </a>
      }
    >
      <section className="section section--light" id="press-releases">
        <div className="container">
          <ol className="press-list">
            {pressItems.map((item, index) => (
              <Reveal as="li" className="press-item" key={item.title} variant={index % 2 === 0 ? 'left' : 'right'}>
                <p className="press-meta">
                  <time dateTime={item.iso}>{item.date}</time>
                  <span className="case-tag">{item.tag}</span>
                </p>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="media-kit">
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal className="split-copy" variant="left">
              <h2>
                Media <em className="accent">kit</em>
              </h2>
              <p>
                Logos and product screenshots for editorial use. Please do not recolour the logo or
                place it on a busy background.
              </p>
              <ul className="download-list">
                {mediaAssets.map((asset) => (
                  <li key={asset.href}>
                    <a href={asset.href} download>
                      {asset.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="card press-contact" variant="right" delay={1}>
              <span className="icon-tile">
                <Icon name="megaphone" />
              </span>
              <h3>Press contact</h3>
              <p>
                For interviews, data requests and comment on AI in hiring. We reply within one
                business day.
              </p>
              <a className="btn btn-primary" href="mailto:press@talentpool365.com">
                Email press@talentpool365.com
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </CompanyShell>
  );
}

/* ---------- Contact us ---------- */

export function ContactPage() {
  return (
    <CompanyShell
      path="/company/contact"
      label="Contact us"
      title="Contact *us*"
      lede="Sales, support, press and partnerships. Every message is read by a person and answered within one business day."
    >
      <Contact />

      <section className="section section--light" id="other-teams">
        <div className="container">
          <SectionHead title="Write to the *right team*" />
          <div className="grid grid-4">
            {contactChannels.map((channel, index) => (
              <Reveal as="article" className="card" key={channel.title} delay={index}>
                <span className="icon-tile">
                  <Icon name={channel.icon} />
                </span>
                <h4>{channel.title}</h4>
                <p>{channel.body}</p>
                <a className="channel-mail" href={`mailto:${channel.email}`}>
                  {channel.email}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="offices">
        <div className="container">
          <SectionHead title="Our *offices*" />
          <ul className="office-list">
            {offices.map((office, index) => (
              <Reveal as="li" key={office.city} delay={index}>
                <span className="office-pin" style={{ '--i': index } as CSSProperties}>
                  <Icon name="pin" />
                </span>
                <div>
                  <h3>{office.city}</h3>
                  <p className="office-role">{office.role}</p>
                  <p>{office.detail}</p>
                  <p className="caption">{office.hours}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </CompanyShell>
  );
}
