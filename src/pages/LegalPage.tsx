import { useState } from 'react';
import { Icon } from '../components/Icon';
import { SkCtaBanner, SkHero } from '../components/SeekOutUI';

const privacySections = [
  {
    num: '1',
    title: 'Introduction',
    content: `TalentPool365 (“we”, “us”, “our”) provides an AI-powered recruitment platform designed to help organizations source, screen, assess, and hire candidates effectively. This Privacy Policy explains what personal data we collect, how we use it, who we share it with, and the choices you have.

This policy applies to:
• Visitors to our website
• Customers and their authorised users (recruiters, hiring managers, administrators)
• Candidates whose data is processed through our platform on behalf of our customers

By using our website or services, you acknowledge this policy. If you do not agree, please do not use our services.`,
  },
  {
    num: '2',
    title: 'Our Role: Controller and Processor',
    content: `When you visit our website or sign up as a customer, we act as the data controller for that information.
When our customers upload or collect candidate data (resumes, assessments, interviews), the customer is the data controller and TalentPool365 acts as the data processor, handling data strictly on their lawful instructions.

If you are a candidate and have questions about how an employer uses your data, please contact that hiring organization directly. We assist employers in responding promptly to candidate data requests.`,
  },
  {
    num: '3',
    title: 'Information We Collect',
    content: `We collect information necessary to provide recruitment intelligence and platform services:

Information you provide:
• Name, work email, phone number, company name, and job title
• Account and billing details
• Support requests, messages, and demo quote submissions

Candidate data processed on behalf of customers:
• Resumes and profile details: contact information, work history, education, skills, certifications
• Assessment responses and scores across technical, aptitude, cognitive, and behavioral evaluations
• Interview responses, which may include video, audio, text, or code submissions and transcripts
• Communication history, such as emails and WhatsApp messages sent through the platform
• Hiring outcomes and recruiter feedback scorecards

Information collected automatically:
• IP address, device type, browser characteristics, referring URLs, and usage analytics.`,
  },
  {
    num: '4',
    title: 'How We Use Information',
    content: `We use personal data to:
• Provide, operate, and continuously improve our recruitment platform
• Parse resumes, semantically match and rank candidates, run assessments, and conduct interviews
• Send operational service messages, security alerts, and customer support responses
• Process payments and manage commercial accounts
• Prevent, investigate, and detect security incidents or fraudulent use
• Comply with statutory and legal obligations`,
  },
  {
    num: '5',
    title: 'Legal Basis for Processing (GDPR)',
    content: `Where the European General Data Protection Regulation (GDPR) applies, we process data based on:
• Contract Performance: To provide our software services under subscription agreements
• Legitimate Interests: To secure, debug, and optimize our services, balanced against individual rights
• Consent: For opt-in candidate communications (e.g., WhatsApp job alerts) and optional cookies
• Legal Obligation: To meet regulatory, taxation, and statutory requirements

For candidate data, employers are responsible for establishing their own lawful basis prior to data processing.`,
  },
  {
    num: '6',
    title: 'AI and Automated Processing',
    content: `TalentPool365 uses AI models to assist human recruiters in screening, matching, ranking, and evaluating candidates. Crucially:
• Our features are built to support human decision-making, not replace it.
• Final hiring, rejection, and offer decisions are made exclusively by human recruiters and hiring managers.
• Candidate scores and rankings are fully explainable, detailing specific skill and experience matches.
• Where regulations confer rights regarding automated processing, candidates may request human review and an explanation through the hiring employer.`,
  },
  {
    num: '7',
    title: 'How We Share Information',
    content: `We never sell candidate or customer personal data. We share information only with:
• Customers: Candidate data is accessible only by the employer or staffing agency that collected it.
• Service Providers: Trusted cloud hosting, database, email, and security partners bound by strict confidentiality and Data Processing Agreements.
• Integrated Platforms: Third-party ATS, HRMS, calendar, or video platforms you explicitly authorize.
• Legal Authorities: When required by subpoena, court order, or applicable law to protect life and safety.`,
  },
  {
    num: '8',
    title: 'International Data Transfers',
    content: `Data may be processed in secure data centers in the European Union, India, or the United States. Where cross-border transfers occur, we implement European Commission Standard Contractual Clauses (SCCs) and robust technical safeguards to ensure adequate data protection standards globally.`,
  },
  {
    num: '9',
    title: 'Cookies and Tracking',
    content: `We use necessary session cookies to maintain secure authentication and preferences. You can manage or disable optional tracking cookies via your browser settings or our website privacy preferences panel.`,
  },
  {
    num: '10',
    title: 'Data Retention',
    content: `We retain personal data only as long as needed for legitimate recruitment purposes or as specified by employer contracts:
• Customer Account Data: Maintained for the duration of the active agreement plus standard statutory periods.
• Candidate Data: Retained strictly in accordance with retention rules configured by the employer data controller, after which it is deleted or returned.`,
  },
  {
    num: '11',
    title: 'Data Security',
    content: `We employ enterprise-grade technical and organizational security controls:
• AES-256 encryption at rest and TLS 1.3 encryption in transit
• Multi-factor authentication (MFA) and strict role-based access control (RBAC)
• Immutable audit logs tracking all candidate data access, modifications, and exports
• Continuous vulnerability scanning and regular independent security audits.`,
  },
  {
    num: '12',
    title: 'Your Privacy Rights',
    content: `Depending on your jurisdiction (including GDPR in Europe and the Digital Personal Data Protection Act, 2023 in India), you have rights to:
• Access the personal data held about you
• Rectify inaccurate or incomplete records
• Request erasure (the “Right to be Forgotten”)
• Restrict or object to specific processing activities
• Receive your data in a portable, structured format
• Nominate a representative or seek grievance redressal

Candidates should contact the prospective employer directly, and we will assist them in honoring your request.`,
  },
  {
    num: '13',
    title: 'Children’s Privacy',
    content: `Our services are designed exclusively for employment and recruitment among working adults. We do not knowingly collect information from minors under 18 years of age.`,
  },
  {
    num: '14',
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy periodically to reflect technological or legal changes. Material revisions will be highlighted on this website with an updated effective date.`,
  },
  {
    num: '15',
    title: 'Contact Us',
    content: `For privacy inquiries, Data Protection Officer (DPO) contact, or data subject requests, email privacy@talentpool365.com or contact our compliance office at TalentPool365 headquarters.`,
  },
];

const termsSections = [
  {
    num: '1',
    title: 'Acceptance of Terms',
    content: `These Terms of Service (“Terms”) govern your access to and use of the TalentPool365 platform and associated software services. By registering an account, executing an order form, or accessing the platform, you agree to be bound by these Terms on behalf of your organization (“Customer”).`,
  },
  {
    num: '2',
    title: 'The Services',
    content: `TalentPool365 grants Customer a non-exclusive, non-transferable subscription right to access our AI-powered recruitment platform, including sourcing, screening, assessments, video/voice interviews, recruiter workspaces, and integrations.`,
  },
  {
    num: '3',
    title: 'Accounts and Access',
    content: `Customer administrators are responsible for managing authorized user credentials, assigning appropriate role permissions, and maintaining account security. Customer must notify TalentPool365 immediately upon suspecting any unauthorized account access.`,
  },
  {
    num: '4',
    title: 'Customer Responsibilities',
    content: `Customer agrees to:
• Use the platform exclusively for lawful recruitment and human resources purposes
• Ensure a valid legal basis, and provide all necessary candidate notices and obtain consents prior to uploading resumes, recording interviews, or sending WhatsApp communications
• Adhere to all applicable labor, anti-discrimination, and privacy statutes
• Ensure all final hiring and rejection decisions are made by human recruiters following review of AI outputs.`,
  },
  {
    num: '5',
    title: 'Acceptable Use',
    content: `Customer shall not reverse engineer, decompile, scrape, or probe platform security. Customer may not resell access, send unsolicited spam communications, or use platform outputs to construct a competing recruitment AI system.`,
  },
  {
    num: '6',
    title: 'AI Features and Limitations',
    content: `AI matching scores, candidate rankings, skill assessments, and interview summaries are assistive evaluation tools. Customer acknowledges that AI outputs are recommendations that must be verified by qualified human professionals before making hiring determinations.`,
  },
  {
    num: '7',
    title: 'Candidate Data and Intellectual Property',
    content: `Customer retains all ownership and intellectual property rights in candidate data and company materials uploaded to the platform. TalentPool365 retains all rights, title, and interest in and to the platform software, algorithms, UI designs, and documentation.`,
  },
  {
    num: '8',
    title: 'Third-Party Services and Integrations',
    content: `Customer’s connection and use of third-party platforms (e.g. Workday, Slack, WhatsApp, Zoom) are governed by the respective terms of those third-party providers. TalentPool365 is not liable for third-party platform availability or policy changes.`,
  },
  {
    num: '9',
    title: 'Fees, Billing and Payment',
    content: `Subscription fees are billed in advance on an annual or monthly schedule as specified in Customer’s order form. Fees are non-refundable except where explicitly required by law.`,
  },
  {
    num: '10',
    title: 'Free Trials',
    content: `Free trials are provided for evaluation purposes for up to 14 days. At the conclusion of the trial period, access terminates unless Customer subscribes to an active paid plan.`,
  },
  {
    num: '11',
    title: 'Confidentiality and Security',
    content: `Both parties agree to treat non-public business, technical, and candidate data as confidential, applying no less than reasonable care. TalentPool365 implements robust SOC2 and ISO-aligned technical security safeguards.`,
  },
  {
    num: '12',
    title: 'Disclaimers and Limitation of Liability',
    content: `To the maximum extent permitted by law, TalentPool365 disclaims all warranties regarding candidate fitness for a specific role. Total liability under any claim arising from these Terms is limited to the aggregate subscription fees paid by Customer during the twelve (12) months preceding the incident.`,
  },
  {
    num: '13',
    title: 'Governing Law and Dispute Resolution',
    content: `These Terms are governed by applicable commercial laws without regard to conflict of law principles. Any dispute shall first be addressed through good-faith executive negotiation prior to formal arbitration.`,
  },
];

export function LegalPage() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'gdpr'>('privacy');

  return (
    <main className="sk-page">
      <SkHero
        eyebrow="SECURITY & COMPLIANCE"
        eyebrowIcon="shield"
        title="Security and Trust at TalentPool365"
        subtitle="Explore TalentPool365's complete Privacy Policy, Terms of Service, and GDPR compliance framework. We protect candidate and corporate data with enterprise rigor."
        primaryCta={{ label: 'Contact Trust Team →', href: '/company/contact' }}
        secondaryCta={{ label: 'Read Privacy Policy', href: '#legal-docs' }}
        image="/assets/pages/hero-security.jpg"
        imageAlt="TalentPool365 security and compliance illustration"
      />

      <section className="sk-band sk-band--cream" id="legal-docs">
        <div className="container legal-layout-new">
          <aside className="legal-sidebar-menu">
            <div className="legal-sidebar-box">
              <h3>Legal Navigation</h3>
              <ul className="legal-nav-pills">
                <li>
                  <button
                    type="button"
                    className={activeTab === 'privacy' ? 'is-active' : ''}
                    onClick={() => setActiveTab('privacy')}
                  >
                    <Icon name="shield" /> Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={activeTab === 'terms' ? 'is-active' : ''}
                    onClick={() => setActiveTab('terms')}
                  >
                    <Icon name="file-check" /> Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={activeTab === 'gdpr' ? 'is-active' : ''}
                    onClick={() => setActiveTab('gdpr')}
                  >
                    <Icon name="clipboard-check" /> GDPR Compliance & DPA
                  </button>
                </li>
              </ul>

              <div className="legal-contact-card">
                <h4>Data Protection Officer</h4>
                <p>Have questions about candidate data or compliance?</p>
                <a className="more-link" href="mailto:privacy@talentpool365.com">
                  privacy@talentpool365.com
                </a>
              </div>
            </div>
          </aside>

          <main className="legal-body-container">
            {activeTab === 'privacy' && (
              <div className="legal-document-view">
                <div className="document-intro-banner">
                  <span className="badge-tag">Official Policy</span>
                  <h2>TalentPool365 Privacy Policy</h2>
                  <p className="doc-date">Effective Date: November 2026 · Compliant with GDPR & DPDP Act 2023</p>
                </div>

                <div className="legal-sections-flow">
                  {privacySections.map((sec) => (
                    <article key={sec.num} className="legal-policy-clause">
                      <h3>
                        <span className="clause-num">{sec.num}.</span> {sec.title}
                      </h3>
                      <div className="clause-text">
                        {sec.content.split('\n\n').map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="legal-document-view">
                <div className="document-intro-banner">
                  <span className="badge-tag">Subscription Terms</span>
                  <h2>TalentPool365 Terms of Service</h2>
                  <p className="doc-date">Effective Date: November 2026 · Commercial SaaS Terms</p>
                </div>

                <div className="legal-sections-flow">
                  {termsSections.map((sec) => (
                    <article key={sec.num} className="legal-policy-clause">
                      <h3>
                        <span className="clause-num">{sec.num}.</span> {sec.title}
                      </h3>
                      <div className="clause-text">
                        {sec.content.split('\n\n').map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gdpr' && (
              <div className="legal-document-view">
                <div className="document-intro-banner">
                  <span className="badge-tag">Data Protection Agreement</span>
                  <h2>GDPR, DPDP & Responsible AI Framework</h2>
                  <p className="doc-date">Technical & Organizational Measures (TOMs) Documentation</p>
                </div>

                <div className="gdpr-cards-grid">
                  <div className="card gdpr-box">
                    <h3>Candidate Consent Tracking</h3>
                    <p>Automated opt-in consent capture for SMS, WhatsApp, and candidate profile storage with time-stamped records.</p>
                  </div>
                  <div className="card gdpr-box">
                    <h3>Automated Data Retention & Erasure</h3>
                    <p>Configurable retention rules per country with automated 1-click candidate profile anonymization and deletion.</p>
                  </div>
                  <div className="card gdpr-box">
                    <h3>Subject Access Requests (SAR)</h3>
                    <p>Instant PDF export containing all candidate records, test answers, scores, and recruiter feedback notes.</p>
                  </div>
                  <div className="card gdpr-box">
                    <h3>Explainable Fair Hiring AI</h3>
                    <p>Anti-bias algorithms that remove demographic proxies and provide transparent score breakdowns with mandatory human oversight.</p>
                  </div>
                </div>

                <div style={{ marginTop: 32 }}>
                  <a className="btn btn-primary" href="/company/contact">
                    Request Executable Data Processing Agreement (DPA)
                  </a>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      <SkCtaBanner
        title="Need a Security Review or executable DPA?"
        subtitle="Our Data Protection Officer and security architects are ready to support your compliance review."
        primary={{ label: 'Contact Trust Team →', href: '/company/contact' }}
      />
    </main>
  );
}