import { CinematicCard } from '../components/CinematicMotion';
import { Faq } from '../components/Faq';
import { LeadForm } from '../components/LeadForm';
import { SkCtaBanner, SkHero, SkVectorArt } from '../components/SeekOutUI';
import { SubNav } from '../components/SubNav';

const supportQuestions = [
  { question: 'I cannot access my workspace. What should I check?', answer: 'Confirm that you are using your organization’s workspace address and the email your administrator invited. If your organization uses single sign-on, try that sign-in option. Contact your workspace administrator or support if access is still blocked; never send your password.' },
  { question: 'A candidate is having trouble with an interview.', answer: 'Ask for the stage, approximate time and the error message, without sharing interview answers or unnecessary personal data. Check browser permissions and connection quality. If the issue affects accessibility or time limits, offer an alternative through your hiring team.' },
  { question: 'How should I report a data or permissions issue?', answer: 'Contact support with your organization, the affected workflow and a description of the unexpected access. Do not include candidate records, credentials or access tokens in email. Ask for a secure channel before sharing sensitive evidence.' },
  { question: 'Where do I find my support response times?', answer: 'Your signed agreement defines coverage, severity levels and response targets. Ask your account team for the applicable support schedule rather than relying on a general website promise.' },
];

export function SupportPage() {
  return (
    <main className="sk-page">
      <SkHero
        eyebrow="HELP & SUPPORT"
        eyebrowIcon="headset"
        title="A person on your side"
        subtitle="Find practical workflow guidance, prepare a support request, or plan onboarding training for your recruiting team."
        primaryCta={{ label: 'Prepare a support request →', href: '#raise-ticket' }}
        secondaryCta={{ label: 'Read workflow guide', href: '/how-it-works' }}
        aside={<SkVectorArt kind="support" />}
      />

      <SubNav
        label="Support sections"
        links={[
          { label: 'Help center', href: '#help-center' },
          { label: 'Documentation', href: '#documentation' },
          { label: 'Training academy', href: '#training-academy' },
          { label: 'Raise a ticket', href: '#raise-ticket' },
          { label: 'SLA & plans', href: '#support-plans' },
          { label: 'System status', href: '#system-status' },
        ]}
      />

      <section className="sk-band sk-band--cream" id="help-center">
        <div className="container">
          <div className="sk-section-head">
            <span className="sk-pill-tag">HELP CENTER</span>
            <h2 className="sk-serif-h2">Let&apos;s find your next step</h2>
          </div>

          <div className="sk-grid-3">
            <CinematicCard className="sup-desk-card" variant="up" delay={0} id="documentation">
              <div className="sup-desk-top">
                <span className="sk-pill-tag" style={{ marginBottom: 0 }}>Documentation</span>
                <span className="sup-desk-num">01</span>
              </div>
              <h3>Understand the workflow</h3>
              <p>Explore the nine hiring steps and the tools behind them. For workspace-specific setup and API documentation, ask our team.</p>
              <a className="sk-card-link" href="/how-it-works">Read the workflow guide →</a>
              <a className="sk-card-link" href="/integrations#api-documentation">Request API documentation →</a>
            </CinematicCard>

            <CinematicCard className="sup-desk-card" variant="up" delay={1} id="training-academy">
              <div className="sup-desk-top">
                <span className="sk-pill-tag" style={{ marginBottom: 0 }}>Training academy</span>
                <span className="sup-desk-num">02</span>
              </div>
              <h3>Build your team&apos;s confidence</h3>
              <p>Start with our interview checklist and scorecard workshop. Facilitated team training can be discussed with your account team.</p>
              <a className="sk-card-link" href="/resources#webinars">Open the workshop outline →</a>
              <a className="sk-card-link" href="/resources#product-videos">Watch the product video →</a>
            </CinematicCard>

            <CinematicCard className="sup-desk-card" variant="up" delay={2} id="support-plans">
              <div className="sup-desk-top">
                <span className="sk-pill-tag" style={{ marginBottom: 0 }}>SLA &amp; support plans</span>
                <span className="sup-desk-num">03</span>
              </div>
              <h3>Know your coverage</h3>
              <p>Support hours, escalation paths and response targets depend on your agreement. Request the support schedule for your plan.</p>
              <a className="sk-card-link" href="/pricing">Compare available plans →</a>
              <a className="sk-card-link" href="mailto:support@talentpool365.com?subject=Support%20coverage%20request">Request your support schedule →</a>
            </CinematicCard>
          </div>
        </div>
      </section>

      <Faq items={supportQuestions} title="Common questions. *Clear next steps.*" body="A few checks before you contact support." contactHref="#raise-ticket" />

      <section className="sk-band sk-band--cream" id="raise-ticket">
        <div className="container split">
          <div className="split-copy">
            <span className="sk-pill-tag">RAISE A TICKET</span>
            <h2 className="sk-serif-h2">Tell us what happened.</h2>
            <p className="sk-section-sub">
              Prepare a support email with the context our team needs. Your email application will open; review and send it there. Do not include passwords, access tokens, or candidate records.
            </p>
            <a className="sk-card-link" style={{ marginTop: 14 }} href="mailto:support@talentpool365.com">
              support@talentpool365.com →
            </a>
          </div>
          <LeadForm
            recipient="support@talentpool365.com"
            subject="Support request"
            fields={[
              { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
              { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email' },
              { name: 'company', label: 'Organization', required: true, autoComplete: 'organization' },
              { name: 'topic', label: 'Topic', type: 'select', options: ['Workspace access', 'Candidate interview', 'Integration', 'Data or permissions', 'Billing', 'Other'] },
              { name: 'details', label: 'What happened and what did you expect?', type: 'textarea', required: true, wide: true },
            ]}
            submitLabel="Prepare support email"
            hint="Nothing is sent until you send the email from your mail app."
          />
        </div>
      </section>

      <section className="sk-band sk-band--white" id="system-status">
        <div className="container status-panel">
          <span className="status-dot" aria-hidden="true" />
          <div>
            <span className="sk-pill-tag">System status</span>
            <h2 className="small-heading">Live status is not connected</h2>
            <p>This page does not monitor the platform. For current service availability or an incident update, contact support.</p>
            <a className="sk-card-link" href="mailto:support@talentpool365.com?subject=Service%20status%20request">
              Request a service update →
            </a>
          </div>
        </div>
      </section>

      <SkCtaBanner />
    </main>
  );
}
