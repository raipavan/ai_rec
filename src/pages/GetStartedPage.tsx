import { navigate, useHash } from '../lib/router';
import { DemoVideo } from '../components/DemoVideo';
import { LeadForm } from '../components/LeadForm';
import { Icon } from '../components/Icon';
import { SkCtaBanner, SkLogoMarquee } from '../components/SeekOutUI';

const intents = [
  {
    id: 'request-demo',
    label: 'Request demo',
    title: 'See it with your own role.',
    body: 'Bring a job description and the questions your team wants answered. We will prepare a focused product walkthrough.',
  },
  {
    id: 'book-meeting',
    label: 'Book meeting',
    title: 'Make time for a useful conversation.',
    body: 'Tell us your timezone and a few preferred times. This is a meeting request, not an instant calendar booking.',
  },
  {
    id: 'start-free-trial',
    label: 'Start free trial',
    title: 'Explore a pilot for your team.',
    body: 'Tell us what you want to evaluate. Our team will confirm trial availability, scope, and access.',
  },
  {
    id: 'contact-sales',
    label: 'Contact sales',
    title: 'Talk through the practical details.',
    body: 'Hiring volume, integrations, procurement, or rollout. Give us the context and we will route your email.',
  },
];

export function GetStartedPage() {
  const hash = useHash();
  const intent = intents.find((item) => `#${item.id}` === hash) ?? intents[0];

  return (
    <main className="sk-page">
      {/* SeekOut /requestdemo/ Conversion Hero */}
      <section className="sk-hero">
        <div className="container">
          <div className="sk-hero-grid sk-hero-grid--wide" style={{ alignItems: 'start' }}>
            <div>
              <span className="sk-eyebrow">
                <Icon name="rocket" /> LIVE PLATFORM WALKTHROUGH
              </span>
              <h1 className="sk-hero-title">
                See it run on a role <span className="accent">you&apos;re hiring for.</span>
              </h1>
              <p className="sk-hero-sub">{intent.body}</p>

              {/* Floating Candidate Match UI Preview Card (SeekOut /requestdemo/) */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: 14,
                  padding: '16px 20px',
                  marginBottom: 24,
                  maxWidth: 460,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Priya Sundaram · Top Match</strong>
                  <span
                    style={{
                      background: '#34D399',
                      color: '#092825',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      padding: '3px 10px',
                      borderRadius: 9999,
                    }}
                  >
                    96% Match
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(247,251,248,0.78)' }}>
                  Senior Frontend Architect · React, TypeScript, Distributed UI · Rediscovered Silver Medalist
                </p>
              </div>

              <ul className="sk-checklist" style={{ color: '#f7fbf8' }}>
                <li style={{ color: 'rgba(247,251,248,0.88)' }}>Your role and hiring goals set the agenda</li>
                <li style={{ color: 'rgba(247,251,248,0.88)' }}>Live walkthrough of AI scoring &amp; ATS sync</li>
                <li style={{ color: 'rgba(247,251,248,0.88)' }}>No credit card or commitment required</li>
              </ul>

              <div className="sk-hero-stats">
                <div className="sk-hero-stat">
                  <strong>1B+</strong>
                  <span>Profiles &amp; archives</span>
                </div>
                <div className="sk-hero-stat">
                  <strong>750+</strong>
                  <span>Hiring teams</span>
                </div>
                <div className="sk-hero-stat">
                  <strong>4.8 ★</strong>
                  <span>Recruiter rating</span>
                </div>
              </div>
            </div>

            {/* Right Column: White Conversion Form Card + Dark Trial Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  background: '#ffffff',
                  color: '#0f2926',
                  borderRadius: 16,
                  padding: 28,
                  boxShadow: '0 28px 60px -16px rgba(0, 0, 0, 0.45)',
                }}
              >
                <h2 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '1.65rem', margin: '0 0 12px', color: '#0f2926' }}>
                  {intent.label}
                </h2>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
                  {intents.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigate(`/get-started#${item.id}`)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 9999,
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        border: '1px solid',
                        cursor: 'pointer',
                        background: intent.id === item.id ? '#123F3B' : '#f8fafc',
                        borderColor: intent.id === item.id ? '#123F3B' : '#cbd5e1',
                        color: intent.id === item.id ? '#ffffff' : '#334155',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <LeadForm
                  key={intent.id}
                  subject={intent.label}
                  fields={[
                    { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
                    { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email' },
                    { name: 'company', label: 'Company', required: true, autoComplete: 'organization' },
                    {
                      name: 'volume',
                      label: 'Annual hiring volume',
                      type: 'select',
                      options: ['Under 100 hires', '100–1,000 hires', 'More than 1,000 hires'],
                    },
                    {
                      name: 'message',
                      label:
                        intent.id === 'book-meeting'
                          ? 'Preferred times, timezone and what you want to discuss'
                          : 'What would you like to explore?',
                      type: 'textarea',
                      wide: true,
                    },
                  ]}
                  submitLabel="Prepare my enquiry"
                  hint="Creates an email draft. Review and send it from your email app."
                />
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 14,
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <strong style={{ display: 'block', color: '#ffffff', fontSize: '0.95rem' }}>
                    Not ready to talk to anyone?
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(247,251,248,0.75)' }}>
                    Watch the 30-sec guided workflow tour first.
                  </span>
                </div>
                <a className="sk-btn-outline-light" href="#watch-product-tour">
                  Watch tour
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SkLogoMarquee />

      <section className="sk-band sk-band--cream" id="watch-product-tour">
        <div className="container split">
          <div className="split-copy">
            <span className="sk-pill-tag">GUIDED TOUR</span>
            <h2 className="sk-serif-h2">A first look. On your time.</h2>
            <p className="sk-section-sub">
              Follow the product from candidate pipeline to hiring insights in this short walkthrough.
            </p>
            <a className="sk-card-link" style={{ marginTop: 14 }} href="/products">
              Explore the full platform <Icon name="arrow-right" />
            </a>
          </div>
          <DemoVideo />
        </div>
      </section>

      <SkCtaBanner />
    </main>
  );
}
