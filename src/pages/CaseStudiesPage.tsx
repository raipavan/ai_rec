import { useState } from 'react';
import { AnimatedValue } from '../components/AnimatedValue';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { SkCtaBanner, SkHero, SkLogoMarquee, SkVectorArt } from '../components/SeekOutUI';

interface CaseStudyStory {
  id: string;
  company: string;
  industry: string;
  size: string;
  useCase: string;
  title: string;
  challenge: string;
  solution: string[];
  featuresUsed: string[];
  results: { stat: string; label: string }[];
  bulletResults: string[];
  quote: { text: string; author: string; role: string };
  whatsNext: string;
}

const caseStudiesData: CaseStudyStory[] = [
  {
    id: 'apex-bpo',
    company: 'Apex Global BPO',
    industry: 'BPO & Contact Centers',
    size: 'Enterprise',
    useCase: 'High Volume Hiring',
    title: 'How Apex Global BPO filled 200 customer support agent roles in 3 weeks with automated voice screening',
    challenge: 'Apex received over 8,500 applications for multi-lingual contact center agent positions across two cities. The 4-person recruiting team was overwhelmed by manual resume screening and telephone screening rounds, leading to a 38-day average hiring cycle and severe candidate drop-off before day one.',
    solution: [
      'Deployed bulk AI resume parsing and keyword-agnostic skill extraction to process all 8,500+ resumes within 24 hours.',
      'Configured asynchronous voice-based AI interviews to assess spoken fluency, active listening, and tone 24/7 without recruiter calls.',
      'Automated WhatsApp follow-up sequences and instant slot self-scheduling for final manager panel interviews.',
    ],
    featuresUsed: ['AI Candidate Screening', 'Voice-Based Interviews', 'WhatsApp Integration', 'Smart Shortlisting'],
    results: [
      { stat: '72%', label: 'Reduction in time-to-hire' },
      { stat: '8,500+', label: 'Candidates screened automatically' },
      { stat: '3 wks', label: 'To fill 200 open seats' },
      { stat: '91%', label: 'Offer acceptance rate' },
    ],
    bulletResults: [
      'Time-to-hire plummeted from 38 days to 11 days',
      'Over 600 recruiter hours saved during a single ramp-up quarter',
      'First-round screening completion rate rose to 94% on mobile devices',
      'Zero candidate leakage through automated WhatsApp engagement nudges',
    ],
    quote: {
      text: 'TalentPool365 turned our highest-stress quarterly hiring drive into a smooth, predictable system. Voice interviews let us evaluate spoken language at scale without our recruiters having to spend all day on repetitive screening calls.',
      author: 'Priya Sundaram',
      role: 'Head of Talent Acquisition, Apex Global BPO',
    },
    whatsNext: 'Apex is rolling out TalentPool365 across 4 additional international delivery hubs and integrating conversational language tests for Portuguese and German hiring.',
  },
  {
    id: 'novatech-solutions',
    company: 'NovaTech Cloud Solutions',
    industry: 'IT & Technology',
    size: 'Mid-Market',
    useCase: 'Contract Staffing',
    title: 'How NovaTech slashed engineering hiring cycles from 42 days to 12 days using live AI coding evaluations',
    challenge: 'NovaTech was scaling its cloud architecture and DevOps practice for multi-cloud enterprise clients. Senior engineers were spending 15+ hours weekly evaluating technical tests and conducting preliminary technical phone screens, creating bottlenecks in delivery roadmap.',
    solution: [
      'Implemented semantic AI candidate discovery across dormant resume archives and developer networks.',
      'Replaced take-home assignments with automated live coding interviews featuring real-time test cases and proctoring.',
      'Established transparent scorecards comparing code cleanliness, algorithmic efficiency, and problem-solving reasoning side by side.',
    ],
    featuresUsed: ['AI Candidate Discovery', 'Coding Interviews', 'Technical Assessments', 'Recruiter Workspace'],
    results: [
      { stat: '68%', label: 'Faster tech offer releases' },
      { stat: '15 hrs', label: 'Saved per senior engineer/week' },
      { stat: '4.4×', label: 'Outreach response rate' },
      { stat: '96%', label: 'Candidate interview satisfaction' },
    ],
    bulletResults: [
      'Technical screening completed within 48 hours of application submission',
      'Engineering interview hours reduced by 74% across 32 engineering managers',
      'Candidate drop-off dropped to under 6% due to instant code feedback and flex scheduling',
    ],
    quote: {
      text: 'Instead of our engineering leaders arguing over take-home zip files, TalentPool365 provides an objective, code-playback scorecard. We hire top-tier developers before competitors even schedule their first round.',
      author: 'Marcus Vance',
      role: 'VP of Engineering, NovaTech Cloud',
    },
    whatsNext: 'NovaTech is integrating TalentPool365 with Jira and GitHub to automatically calibrate assessment difficulty against upcoming sprint requirements.',
  },
  {
    id: 'crestview-health',
    company: 'Crestview Healthcare Network',
    industry: 'Healthcare',
    size: 'Large Enterprises',
    useCase: 'High Volume Hiring',
    title: 'How Crestview eliminated credential verification delays and staffed 450 nurses and allied health specialists',
    challenge: 'Staffing ICU nurses and certified technicians across 14 hospital campuses was hampered by multi-week credential verification, state licensing checks, and complex shift requirements, causing costly agency nurse spend.',
    solution: [
      'Automated extraction and verification of clinical licenses, nursing council certifications, and BLS/ACLS compliance upon application.',
      'Created specialized shift-matched talent pools matching staff availability with campus weekend and night rosters.',
      'Introduced self-service video interviews allowing medical directors to review clinical situational judgement at convenient times.',
    ],
    featuresUsed: ['Resume Parsing & Skill Extraction', 'Talent Pool Management', 'Automated Video Interviews', 'Pre-Onboarding'],
    results: [
      { stat: '24 days', label: 'Saved per clinical hire' },
      { stat: '450+', label: 'Nurses & technicians onboarded' },
      { stat: '100%', label: 'Credential audit compliance' },
      { stat: '42%', label: 'Reduction in agency contractor spend' },
    ],
    bulletResults: [
      'Credential verification time reduced from 16 days to under 3 hours',
      'Zero compliance deficiencies during state healthcare accreditation audit',
      'Day-one readiness improved to 98% with automated document pre-onboarding checklists',
    ],
    quote: {
      text: 'In healthcare, an unfilled position directly impacts patient care. TalentPool365 took the clerical nightmare out of clinical licensing and credentialing so our nursing supervisors could focus on patient-facing interviews.',
      author: 'Dr. Elena Rostova',
      role: 'Chief Medical & Talent Officer, Crestview Health',
    },
    whatsNext: 'Crestview is deploying TalentPool365 across rural emergency clinics and introducing automated annual credential renewal tracking.',
  },
  {
    id: 'vanguard-financial',
    company: 'Vanguard Capital Partners',
    industry: 'BFSI',
    size: 'Enterprise',
    useCase: 'Campus Hiring',
    title: 'How Vanguard screened 12,000 university applicants for wealth management with zero human bias',
    challenge: 'Vanguard’s nationwide campus recruitment drive for quantitative analysts and wealth advisors attracted over 12,000 resumes. Reviewers were biased toward familiar university brand names, missing extraordinary talent from non-target institutions.',
    solution: [
      'Implemented blind AI screening that stripped university names, photos, and demographic proxies, focusing strictly on competencies.',
      'Conducted randomized cognitive reasoning and financial aptitude assessments with AI-proctored verification.',
      'Automated multi-evaluator approval chains and structured scorecards for final executive panel rounds.',
    ],
    featuresUsed: ['Cognitive Tests', 'Fair Hiring AI', 'Candidate Ranking', 'Audit Trails'],
    results: [
      { stat: '12,000+', label: 'Campus applicants assessed' },
      { stat: '3.2×', label: 'Increase in diversity representation' },
      { stat: '100%', label: 'Auditable decision trails' },
      { stat: '14 days', label: 'From campus test to final offers' },
    ],
    bulletResults: [
      'Target university bias eliminated; hired graduates from 48 non-traditional colleges',
      'Full compliance audit trail produced for banking regulatory inspections',
      'Offer-to-joining ratio reached a historic high of 93%',
    ],
    quote: {
      text: 'The explainable AI scorecards gave our executive committee complete confidence. Every candidate was ranked on genuine mathematical and behavioral aptitude, creating our most diverse and high-performing cohort to date.',
      author: 'Alistair Finch',
      role: 'Global Head of Early Careers, Vanguard Capital',
    },
    whatsNext: 'Vanguard is rolling out TalentPool365 for lateral wealth advisory recruitment and internal mobility transitions.',
  },
  {
    id: 'nordic-retail',
    company: 'Nordic Living Retail Group',
    industry: 'Retail',
    size: 'Large Enterprises',
    useCase: 'High Volume Hiring',
    title: 'How Nordic Living staffed 65 stores for holiday peak season in 14 days using WhatsApp automation',
    challenge: 'Nordic Living needed 1,200 seasonal sales associates across Scandinavian and UK store locations. Store managers were inundated with paper applications and missed follow-ups while trying to run busy retail floors.',
    solution: [
      'Placed QR codes in stores and social ads linking directly to an automated WhatsApp career chatbot.',
      'Chatbot collected basic availability, customer service situational choices, and language preferences in 4 minutes.',
      'Approved candidates picked available 15-minute in-store interview slots directly from store manager Google Calendars.',
    ],
    featuresUsed: ['AI Chatbot', 'WhatsApp Integration', 'Interview Scheduling', 'Talent Pool Management'],
    results: [
      { stat: '1,200', label: 'Seasonal hires completed' },
      { stat: '4 mins', label: 'Average candidate application time' },
      { stat: '88%', label: 'WhatsApp response rate within 1 hr' },
      { stat: '0 hrs', label: 'Store manager phone scheduling time' },
    ],
    bulletResults: [
      'Peak seasonal staffing target completed 10 days ahead of schedule',
      'Talent pool of silver-medalist seasonal associates automatically banked for summer season',
      'Store manager satisfaction rating rose to 96% compared to prior year manual process',
    ],
    quote: {
      text: 'Our store managers are retailers, not recruitment administrators. Giving candidates a WhatsApp bot to apply and book their own interviews freed our store leads to focus on customer service and holiday merchandise.',
      author: 'Karin Lindqvist',
      role: 'Director of People Operations, Nordic Living Group',
    },
    whatsNext: 'Nordic Living is expanding TalentPool365 to permanent assistant store manager hiring and internal department cross-training.',
  },
  {
    id: 'titan-manufacturing',
    company: 'Titan Precision Manufacturing',
    industry: 'Manufacturing',
    size: 'Enterprise',
    useCase: 'Contract Staffing',
    title: 'How Titan filled 350 skilled CNC machinist & floor supervisor roles across 6 plants',
    challenge: 'Titan struggled with multi-plant talent shortages for specialized precision machinists, welding inspectors, and plant safety leads. Local print ads and regional staffing agencies caused fragmented data, high fees, and unfilled assembly lines.',
    solution: [
      'Centralized all plant hiring into one Recruiter Workspace with role-based plant supervisor permissions.',
      'Parsed technical ITI diplomas, welding certifications, and shift preferences automatically into clean records.',
      'Sent automated offer letters with digital e-signatures to candidate phones for immediate acceptance.',
    ],
    featuresUsed: ['Recruiter Workspace', 'Skill Extraction', 'Offer Letter Generation', 'E-Signature Integration'],
    results: [
      { stat: '350', label: 'Certified technicians hired' },
      { stat: '58%', label: 'Reduction in agency commission fees' },
      { stat: '2.4 days', label: 'Average offer-to-signed speed' },
      { stat: '99%', label: 'Plant shift coverage rate' },
    ],
    bulletResults: [
      'Plant downtime reduced to zero across all 6 manufacturing facilities',
      'Centralized visibility allowed plant managers to share vetted candidates across neighboring regions',
      'Full compliance verification before candidate set foot on factory floor',
    ],
    quote: {
      text: 'Having a single dashboard that tells us the hiring status across all six plants with automated digital offer signing transformed our operations. We haven’t had an idle assembly shift in six months.',
      author: 'Rajesh Mehra',
      role: 'VP Operations & HR, Titan Precision Manufacturing',
    },
    whatsNext: 'Titan is integrating TalentPool365 with its ERP system for automated factory gate pass and biometric security onboarding.',
  },
];

const industries = ['All', 'IT & Technology', 'Healthcare', 'BFSI', 'Manufacturing', 'Retail', 'BPO & Contact Centers'];
const useCases = ['All', 'High Volume Hiring', 'Campus Hiring', 'Contract Staffing'];
const companySizes = ['All', 'Mid-Market', 'Large Enterprises', 'Enterprise'];

export function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedUseCase, setSelectedUseCase] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [activeStory, setActiveStory] = useState<CaseStudyStory | null>(null);

  const filteredStories = caseStudiesData.filter((story) => {
    const matchInd = selectedIndustry === 'All' || story.industry === selectedIndustry;
    const matchUse = selectedUseCase === 'All' || story.useCase === selectedUseCase;
    const matchSize = selectedSize === 'All' || story.size === selectedSize;
    return matchInd && matchUse && matchSize;
  });

  return (
    <main className="sk-page">
      <SkHero
        eyebrow="CUSTOMER STORIES"
        eyebrowIcon="trend"
        title="TalentPool365 Customers Delivering Proven Results"
        subtitle="Real hiring challenges, real results. Explore how recruiting teams across industries use TalentPool365 to cut time-to-hire, improve candidate quality, and scale without adding headcount."
        primaryCta={{ label: 'Book a demo →', href: '/get-started#book-meeting' }}
        secondaryCta={{ label: 'Browse case studies', href: '#stories-grid' }}
        stats={[
          { value: '68%', label: 'Faster time-to-hire' },
          { value: '14 days', label: 'Saved per hire' },
          { value: '250K+', label: 'Candidates screened' },
        ]}
        aside={<SkVectorArt kind="customers" />}
      />

      <SkLogoMarquee />

      {/* Results at a Glance Section */}
      <section className="section section--light" id="results-at-glance">
        <div className="container">
          <SectionHead
            eyebrow="Results at a glance"
            title="Measurable recruitment impact *backed by customer data*"
            body="Every hire leaves a trail of data. Here is what talent acquisition teams achieve when they automate repetitive manual work."
          />

          <div className="metrics-row-cards">
            <Reveal as="div" className="metric-banner-card" delay={0}>
              <span className="metric-banner-val">
                <AnimatedValue value="68%" />
              </span>
              <strong className="metric-banner-label">Faster time-to-hire</strong>
              <p>Average reduction in days elapsed from requisition opening to signed offer.</p>
            </Reveal>

            <Reveal as="div" className="metric-banner-card" delay={1}>
              <span className="metric-banner-val">
                <AnimatedValue value="14 days" />
              </span>
              <strong className="metric-banner-label">Days saved per hire</strong>
              <p>Recruiter and hiring manager hours returned to high-touch candidate conversations.</p>
            </Reveal>

            <Reveal as="div" className="metric-banner-card" delay={2}>
              <span className="metric-banner-val">
                <AnimatedValue value="250,000+" />
              </span>
              <strong className="metric-banner-label">Candidates screened</strong>
              <p>Applications parsed, semantically matched, and ranked without manual data entry.</p>
            </Reveal>

            <Reveal as="div" className="metric-banner-card" delay={3}>
              <span className="metric-banner-val">
                <AnimatedValue value="75%" />
              </span>
              <strong className="metric-banner-label">Reduction in manual screening effort</strong>
              <p>Eliminating resume sorting, scheduling back-and-forth, and initial phone tag.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Case Study Section */}
      <section className="section" id="featured-story">
        <div className="container">
          <SectionHead
            eyebrow="Featured customer story"
            title="Spotlight: Scaling high-volume hiring *without scaling headcount*"
          />

          <Reveal as="div" className="featured-case-box">
            <div className="featured-case-head">
              <div>
                <span className="badge-tag">BPO & Contact Centers</span>
                <span className="badge-meta">High Volume Hiring · 1,000+ employees</span>
                <h2 className="featured-case-title">
                  Apex Global BPO: Filling 200 agent roles in 3 weeks with automated voice screening
                </h2>
              </div>
              <div className="featured-case-stat-pill">
                <strong>72%</strong>
                <span>Faster time-to-hire</span>
              </div>
            </div>

            <div className="featured-case-grid">
              <div className="featured-case-col">
                <h3>The Challenge</h3>
                <p>
                  Apex faced 8,500+ applicants for bilingual agent roles across two regional centers.
                  Manual telephone screening created a 38-day backlog and 40% candidate leakage before
                  first interviews could even be scheduled.
                </p>
                <div className="featured-features-used">
                  <strong>Features used:</strong>
                  <div className="tag-chips">
                    <span>AI Candidate Screening</span>
                    <span>Voice-Based Interviews</span>
                    <span>WhatsApp Integration</span>
                    <span>Smart Shortlisting</span>
                  </div>
                </div>
              </div>

              <div className="featured-case-col">
                <h3>The Solution & Results</h3>
                <ul className="ticks">
                  <li>8,500+ applications parsed and ranked in under 24 hours</li>
                  <li>Asynchronous voice interviews evaluated spoken fluency around the clock</li>
                  <li>Automated WhatsApp nudges kept candidates engaged through offer acceptance</li>
                  <li>Over 600 recruiter hours saved in a single quarter</li>
                </ul>
                <div className="featured-quote">
                  <blockquote>
                    “TalentPool365 turned our highest-stress quarterly hiring drive into a smooth,
                    predictable system. Voice interviews let us evaluate spoken language at scale without
                    our recruiters having to spend all day on repetitive screening calls.”
                  </blockquote>
                  <cite>— Priya Sundaram, Head of Talent Acquisition, Apex Global BPO</cite>
                </div>
              </div>
            </div>

            <div className="featured-case-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setActiveStory(caseStudiesData[0])}
              >
                Read full case study breakdown <Icon name="arrow-right" />
              </button>
              <a className="btn btn-outline" href="/get-started#book-meeting">
                Book a demo for your team
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Case Studies Explorer Section */}
      <section className="section section--light" id="stories-grid">
        <div className="container">
          <SectionHead
            eyebrow="Explore case studies"
            title="Filter by your industry, size *or hiring use case*"
            body="See how teams with your exact recruitment constraints use TalentPool365 to transform their talent pipeline."
          />

          {/* Multi-Dimensional Filter Toolbar */}
          <div className="case-filter-toolbar">
            <div className="filter-group">
              <span className="filter-label">Industry:</span>
              <div className="filter-chips">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    className={`filter-opt${selectedIndustry === ind ? ' is-active' : ''}`}
                    onClick={() => setSelectedIndustry(ind)}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-subgroups">
              <div className="filter-group">
                <span className="filter-label">Use Case:</span>
                <div className="filter-chips">
                  {useCases.map((uc) => (
                    <button
                      key={uc}
                      type="button"
                      className={`filter-opt${selectedUseCase === uc ? ' is-active' : ''}`}
                      onClick={() => setSelectedUseCase(uc)}
                    >
                      {uc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <span className="filter-label">Company Size:</span>
                <div className="filter-chips">
                  {companySizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`filter-opt${selectedSize === sz ? ' is-active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="case-results-count" role="status">
            Showing {filteredStories.length} customer case {filteredStories.length === 1 ? 'study' : 'studies'}
          </p>

          {/* Stories Grid */}
          <div className="stories-cards-grid">
            {filteredStories.map((story, idx) => (
              <Reveal as="article" key={story.id} className="story-card" delay={idx % 3}>
                <div className="story-card-top">
                  <span className="story-industry-tag">{story.industry}</span>
                  <span className="story-size-tag">{story.size}</span>
                </div>

                <h3 className="story-company-name">{story.company}</h3>
                <h4 className="story-card-headline">{story.title}</h4>

                <div className="story-stats-grid">
                  {story.results.slice(0, 2).map((res) => (
                    <div key={res.label} className="story-stat-cell">
                      <strong>{res.stat}</strong>
                      <span>{res.label}</span>
                    </div>
                  ))}
                </div>

                <p className="story-challenge-preview">
                  <strong>Challenge:</strong> {story.challenge}
                </p>

                <div className="story-card-actions">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm story-expand-btn"
                    onClick={() => setActiveStory(story)}
                  >
                    Read Full Case Study <Icon name="arrow-right" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {!filteredStories.length && (
            <div className="empty-state">
              <h3>No matching case studies found</h3>
              <p>Try resetting your filters to see more stories.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSelectedIndustry('All');
                  setSelectedUseCase('All');
                  setSelectedSize('All');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Individual Case Study Modal / Full Story Viewer */}
      {activeStory && (
        <div className="modal-backdrop" onClick={() => setActiveStory(null)}>
          <div
            className="modal-container case-study-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-story-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveStory(null)}
              aria-label="Close case study details"
            >
              ×
            </button>

            <div className="modal-content-scroll">
              <div className="modal-case-header">
                <div className="tag-chips">
                  <span className="badge-tag">{activeStory.industry}</span>
                  <span className="badge-meta">{activeStory.size}</span>
                  <span className="badge-meta">{activeStory.useCase}</span>
                </div>
                <h2 id="modal-story-title" className="modal-case-title">
                  {activeStory.title}
                </h2>
                <div className="modal-snapshot-bar">
                  <div>
                    <span className="snapshot-lbl">Company</span>
                    <strong>{activeStory.company}</strong>
                  </div>
                  <div>
                    <span className="snapshot-lbl">Industry</span>
                    <strong>{activeStory.industry}</strong>
                  </div>
                  <div>
                    <span className="snapshot-lbl">Organization</span>
                    <strong>{activeStory.size}</strong>
                  </div>
                  <div>
                    <span className="snapshot-lbl">Key Solution</span>
                    <strong>{activeStory.useCase}</strong>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="modal-results-banner">
                <h3>Key Outcomes Verified</h3>
                <div className="modal-results-cells">
                  {activeStory.results.map((r) => (
                    <div key={r.label} className="modal-stat-box">
                      <strong>{r.stat}</strong>
                      <span>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Challenge */}
              <div className="modal-case-section">
                <h3>The Challenge</h3>
                <p>{activeStory.challenge}</p>
              </div>

              {/* The Solution */}
              <div className="modal-case-section">
                <h3>The Solution with TalentPool365</h3>
                <ul className="modal-solution-list">
                  {activeStory.solution.map((step) => (
                    <li key={step}>
                      <Icon name="clipboard-check" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <div className="features-badge-group">
                  <strong>Platform modules deployed:</strong>
                  <div className="tag-chips">
                    {activeStory.featuresUsed.map((feat) => (
                      <span key={feat} className="feature-pill">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* The Results Detail */}
              <div className="modal-case-section">
                <h3>Verified Business Results</h3>
                <ul className="ticks">
                  {activeStory.bulletResults.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              {/* Customer Quote */}
              <div className="modal-quote-box">
                <blockquote>“{activeStory.quote.text}”</blockquote>
                <cite>
                  <strong>{activeStory.quote.author}</strong>
                  <span>{activeStory.quote.role}</span>
                </cite>
              </div>

              {/* What's Next */}
              <div className="modal-case-section">
                <h3>What’s Next</h3>
                <p>{activeStory.whatsNext}</p>
              </div>

              <div className="modal-footer-cta">
                <a className="btn btn-primary" href="/get-started#book-meeting">
                  Book a demo with our team
                </a>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setActiveStory(null)}
                >
                  Close story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Don't see your industry banner */}
      <section className="section custom-industry-band">
        <div className="container split">
          <div className="split-copy">
            <span className="eyebrow">Custom hiring models</span>
            <h2>
              Don’t see your industry? <em className="accent">We can tailor TalentPool365 to fit.</em>
            </h2>
            <p>
              Whether you are hiring specialized maritime engineers, academic researchers, or creative directors,
              our configurable scoring rubrics and assessments adapt to your exact requirements.
            </p>
            <div className="hero-action-buttons" style={{ marginTop: 24 }}>
              <a className="btn btn-primary" href="/company/contact">
                Talk to our hiring team
              </a>
              <a className="btn btn-outline" href="/pricing">
                See pricing options
              </a>
            </div>
          </div>
          <div className="card custom-industry-box">
            <h3>Share your hiring scenario</h3>
            <p>Tell us what is slow or broken in your hiring process, and we’ll show you a tailored workflow walkthrough.</p>
            <ul className="ticks">
              <li>Custom rubric and assessment matching</li>
              <li>Workflow mapping with your existing ATS/HRMS</li>
              <li>Dedicated pilot on your actual candidate data</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Analyst Recognition Strip in Warm Cream Band */}
      <section className="sk-band sk-band--cream">
        <div className="container">
          <div className="sk-section-head sk-section-head--center">
            <span className="sk-pill-tag">ANALYST &amp; PEER RECOGNITION</span>
            <h2 className="sk-serif-h2">Recognized by the teams who use it every day</h2>
          </div>
          <div className="sk-grid-4">
            <article className="sk-card" style={{ textAlign: 'center', alignItems: 'center' }}>
              <span className="sk-pill-tag" style={{ marginBottom: 4 }}>G2 Leader</span>
              <h3>4.8 / 5 Rating</h3>
              <p>Top-rated Enterprise AI Recruiting &amp; Talent Intelligence suite.</p>
            </article>
            <article className="sk-card" style={{ textAlign: 'center', alignItems: 'center' }}>
              <span className="sk-pill-tag" style={{ marginBottom: 4 }}>TrustRadius</span>
              <h3>Top Rated 2026</h3>
              <p>Verified buyer satisfaction for automated candidate screening.</p>
            </article>
            <article className="sk-card" style={{ textAlign: 'center', alignItems: 'center' }}>
              <span className="sk-pill-tag" style={{ marginBottom: 4 }}>HR Executive</span>
              <h3>Top HR Product</h3>
              <p>Awarded for explainable, fair-hiring AI evaluation rubrics.</p>
            </article>
            <article className="sk-card" style={{ textAlign: 'center', alignItems: 'center' }}>
              <span className="sk-pill-tag" style={{ marginBottom: 4 }}>SOC 2 Type II</span>
              <h3>Enterprise Trust</h3>
              <p>Audited security, GDPR compliance, and zero model training on client data.</p>
            </article>
          </div>
        </div>
      </section>

      <SkCtaBanner
        title="Ready to join them?"
        subtitle="See how TalentPool365 handles your toughest open requisition with live candidate sourcing, screening, and structured scorecards."
      />
    </main>
  );
}