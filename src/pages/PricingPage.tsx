import { useState } from 'react';
import { CinematicCard } from '../components/CinematicMotion';
import { LeadForm, type LeadField } from '../components/LeadForm';
import { SkCtaBanner, SkFaq, SkHero } from '../components/SeekOutUI';

const quoteFields: LeadField[] = [
  { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company name', required: true, autoComplete: 'organization' },
  {
    name: 'size',
    label: 'Company size',
    type: 'select',
    options: ['1–50 employees', '51–250 employees', '251–1,000 employees', '1,000+ employees'],
  },
  {
    name: 'volume',
    label: 'Annual hiring volume',
    type: 'select',
    options: ['Under 50 hires/yr', '50–200 hires/yr', '200–1,000 hires/yr', '1,000+ hires/yr'],
  },
  {
    name: 'systems',
    label: 'Systems to integrate (ATS/HRMS)',
    placeholder: 'e.g. Workday, Greenhouse, SAP, Slack...',
    wide: true,
  },
  {
    name: 'compliance',
    label: 'Specific security or compliance needs',
    type: 'textarea',
    placeholder: 'GDPR, SOC2, custom data residency, SSO, custom SLA...',
    wide: true,
  },
];

const comparisonFeatures = [
  { feature: 'AI Candidate Discovery', starter: '✓', pro: '✓', ent: '✓' },
  { feature: 'Resume Database Search', starter: '✓', pro: '✓', ent: '✓' },
  { feature: 'Resume Parsing & Matching', starter: '✓', pro: '✓', ent: '✓' },
  { feature: 'Candidate Ranking & Shortlisting', starter: 'Basic', pro: 'Advanced', ent: 'Advanced' },
  { feature: 'AI Assessments (Tech, Aptitude, Cognitive)', starter: 'Basic', pro: 'Full suite', ent: 'Full suite' },
  { feature: 'AI Interviews (Video, Voice, Coding)', starter: 'Limited', pro: '✓ (Unlimited)', ent: '✓ (Unlimited)' },
  { feature: 'Proctoring & Anti-Cheat Monitoring', starter: '–', pro: '✓', ent: '✓' },
  { feature: 'Recruiter Workspace & Collaboration', starter: 'Basic', pro: '✓', ent: '✓' },
  { feature: 'Approval Workflows & Audit Chains', starter: '–', pro: '✓', ent: 'Custom multi-tier' },
  { feature: 'WhatsApp & Email Automation', starter: 'Email only', pro: '✓ (WhatsApp & Email)', ent: '✓ (WhatsApp & Email)' },
  { feature: 'Analytics & Reporting Dashboards', starter: 'Basic KPIs', pro: '✓ (Full Funnel)', ent: 'Advanced + BI Sync' },
  { feature: 'ATS & HRMS Integrations', starter: '–', pro: '✓ (Certified)', ent: '✓ + Custom Webhooks' },
  { feature: 'Developer REST API Access', starter: '–', pro: '–', ent: '✓ (Full Access)' },
  { feature: 'Audit Trails & Advanced Security', starter: '–', pro: '–', ent: '✓ (Enterprise Vault)' },
  { feature: 'Single Sign-On (SAML / SSO)', starter: '–', pro: '–', ent: '✓' },
  { feature: 'Support & SLAs', starter: 'Email support', pro: 'Priority support', ent: 'Dedicated Account Manager' },
];

const faqs = [
  {
    q: 'Can I change plans later?',
    a: 'Yes. You can upgrade or adjust your plan at any time as your hiring needs expand. Upgrades take effect immediately and are prorated.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! You can explore TalentPool365 on a 14-day free trial without a credit card. Test AI candidate discovery, resume parsing, and automated interviews on your own roles.',
  },
  {
    q: 'Do you offer discounts for annual billing?',
    a: 'Yes. Organizations choosing annual billing receive a 20% discount across Starter and Professional plans, as well as included onboarding assistance.',
  },
  {
    q: 'Is my candidate data secure and GDPR compliant?',
    a: 'Absolutely. All candidate resumes, test scores, and interview recordings are protected with AES-256 encryption at rest and TLS in transit. We support full GDPR data erasure and right-to-access requests.',
  },
];

export function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <main className="sk-page">
      <SkHero
        eyebrow="TRANSPARENT PRICING"
        eyebrowIcon="chart"
        title="Plans that scale with your hiring ambitions"
        subtitle="Whether you are making your first hire or running recruitment across multiple countries, start small, upgrade when you are ready, and only pay for the hiring power you need."
        primaryCta={{ label: 'Start 14-day free trial →', href: '/get-started#start-free-trial' }}
        secondaryCta={{ label: 'Compare plans', href: '#compare-plans' }}
        image="/assets/pages/hero-pricing.jpg"
        imageAlt="Scalable pricing plans illustration"
      />

      {/* SeekOut Soft Mint Trial Banner + Pricing Cards */}
      <section className="sk-band sk-band--white" id="plans">
        <div className="container">
          <div className="sk-promo-banner" style={{ marginBottom: 44 }}>
            <div>
              <h2>Try TalentPool365 free for 14 days</h2>
              <p>Run AI sourcing, semantic resume screening, and automated interviews on a live role. No credit card required.</p>
            </div>
            <a className="sk-btn-orange" href="/get-started#start-free-trial">
              Get free trial →
            </a>
          </div>

          <div className="pricing-toggle-wrap">
            <span className={!annual ? 'is-selected' : ''}>Monthly Billing</span>
            <button
              type="button"
              className={`pricing-toggle-switch${annual ? ' is-annual' : ''}`}
              onClick={() => setAnnual(!annual)}
              aria-label="Toggle annual or monthly billing"
            >
              <span className="toggle-dot" />
            </button>
            <span className={annual ? 'is-selected' : ''}>
              Annual Billing <em>Save 20%</em>
            </span>
          </div>

          <div className="pricing-plans-grid">
            {/* Starter Plan */}
            <CinematicCard className="pricing-plan-card" variant="up" delay={0}>
              <div className="plan-card-header">
                <span className="plan-badge">Starter Plan</span>
                <h3>Starter</h3>
                <p className="plan-target">Best for startups and small teams making their first hires.</p>
                <div className="plan-price">
                  <strong>{annual ? '$79' : '$99'}</strong>
                  <span>/ user / month</span>
                </div>
                <p className="plan-trial-note">Free for 14 days, no card required</p>
              </div>
              <div className="plan-body">
                <h4>Everything you need to move from spreadsheets to smarter hiring:</h4>
                <ul className="ticks">
                  <li>AI candidate discovery and resume database search</li>
                  <li>Resume parsing and AI candidate matching</li>
                  <li>Basic assessments and automated interviews</li>
                  <li>Candidate pipeline and email automation</li>
                  <li>Interview scheduling calendar sync</li>
                  <li>Up to 5 active jobs and 500 candidates/month</li>
                  <li>Standard email support</li>
                </ul>
              </div>
              <div className="plan-card-footer">
                <a className="sk-btn-outline-dark" style={{ width: '100%' }} href="/get-started#start-free-trial">
                  Start Free Trial
                </a>
              </div>
            </CinematicCard>

            {/* Professional Plan */}
            <CinematicCard className="pricing-plan-card is-popular" variant="zoom" delay={1}>
              <div className="popular-ribbon">Most Popular</div>
              <div className="plan-card-header">
                <span className="plan-badge plan-badge--popular">Professional Plan</span>
                <h3>Professional</h3>
                <p className="plan-target">Best for growing and mid-sized companies hiring across teams.</p>
                <div className="plan-price">
                  <strong>{annual ? '$199' : '$249'}</strong>
                  <span>/ user / month</span>
                </div>
                <p className="plan-trial-note">Billed annually or monthly</p>
              </div>
              <div className="plan-body">
                <h4>Everything in Starter, plus more automation &amp; insight:</h4>
                <ul className="ticks">
                  <li>Advanced AI screening, ranking and smart shortlisting</li>
                  <li>Full AI assessments: technical, aptitude, cognitive and behavioral</li>
                  <li>AI video, voice and coding interviews with proctoring</li>
                  <li>WhatsApp integration and automated follow-ups</li>
                  <li>Team collaboration, feedback scorecards and approval workflows</li>
                  <li>Analytics and reporting KPI dashboards</li>
                  <li>ATS, HRMS and video platform integrations</li>
                  <li>Higher active job and candidate capacity</li>
                  <li>Priority technical support</li>
                </ul>
              </div>
              <div className="plan-card-footer">
                <a className="sk-btn-orange" style={{ width: '100%' }} href="/get-started#book-meeting">
                  Book a Demo &amp; Trial →
                </a>
              </div>
            </CinematicCard>

            {/* Enterprise Plan */}
            <CinematicCard className="pricing-plan-card" variant="up" delay={2}>
              <div className="plan-card-header">
                <span className="plan-badge">Enterprise Plan</span>
                <h3>Enterprise</h3>
                <p className="plan-target">Best for large and global organizations with complex hiring needs.</p>
                <div className="plan-price">
                  <strong style={{ fontSize: '2rem' }}>Custom</strong>
                  <span>tailored to volume</span>
                </div>
                <p className="plan-trial-note">Volume discounts &amp; custom contracts</p>
              </div>
              <div className="plan-body">
                <h4>Everything in Professional, plus scale &amp; control:</h4>
                <ul className="ticks">
                  <li>Unlimited high-volume candidate hiring pipeline</li>
                  <li>Advanced role-based access and custom approval chains</li>
                  <li>Full immutable audit trails and compliance security controls</li>
                  <li>Developer REST API access &amp; custom webhooks</li>
                  <li>Diversity analytics and recruiter productivity leaderboard</li>
                  <li>Single sign-on (SAML / SSO) and custom data residency</li>
                  <li>Dedicated account manager &amp; guided rollout</li>
                  <li>Guaranteed 99.9% uptime SLA</li>
                </ul>
              </div>
              <div className="plan-card-footer">
                <a className="sk-btn-green" style={{ width: '100%' }} href="#custom-quote">
                  Contact Sales for Quote
                </a>
              </div>
            </CinematicCard>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table in Warm Cream Band */}
      <section className="sk-band sk-band--cream" id="compare-plans">
        <div className="container">
          <div className="sk-section-head">
            <span className="sk-pill-tag">DETAILED BREAKDOWN</span>
            <h2 className="sk-serif-h2">TalentPool365 plans &amp; features</h2>
            <p className="sk-section-sub">
              Review side-by-side capabilities so you select the exact hiring power your team requires.
            </p>
          </div>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '40%' }}>Platform Capability</th>
                  <th scope="col" style={{ width: '20%' }}>Starter</th>
                  <th scope="col" style={{ width: '20%' }} className="is-popular-col">Professional</th>
                  <th scope="col" style={{ width: '20%' }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td>{row.starter}</td>
                    <td className="is-popular-col"><strong>{row.pro}</strong></td>
                    <td>{row.ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Request Custom Quote Form */}
      <section className="sk-band sk-band--white" id="custom-quote">
        <div className="container">
          <div className="sk-split" style={{ alignItems: 'start' }}>
            <div className="sk-split-copy">
              <span className="sk-pill-tag">ENTERPRISE &amp; HIGH VOLUME</span>
              <h2 className="sk-serif-h2">Need something different? Let’s build a plan around you.</h2>
              <p className="sk-section-sub">
                If you hire at high volumes, need specialized ATS/HRMS integrations, or have strict compliance
                and data residency requirements, our enterprise solutions architects will configure a custom plan.
              </p>
              <ul className="sk-checklist" style={{ marginTop: 20 }}>
                <li>Custom requisition &amp; candidate allowances</li>
                <li>Tailored enterprise onboarding &amp; recruiter training</li>
                <li>Security review &amp; Data Protection Impact Assessment (DPIA) assistance</li>
                <li>Dedicated Customer Success Manager and bespoke SLAs</li>
              </ul>
            </div>

            <div className="sk-card" style={{ padding: 32 }}>
              <h3 style={{ marginBottom: 16 }}>Request a Custom Quote</h3>
              <LeadForm
                fields={quoteFields}
                submitLabel="Request Custom Quote"
                hint="We respond with a structured proposal within one business day."
                subject="Custom Enterprise Quote Request"
              />
            </div>
          </div>
        </div>
      </section>

      <SkFaq title="Frequently asked billing questions" items={faqs} />
      <SkCtaBanner />
    </main>
  );
}
