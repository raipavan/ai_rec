import { useState } from 'react';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { SkCtaBanner, SkHero, SkLogoMarquee } from '../components/SeekOutUI';

interface IntegrationItem {
  name: string;
  category: 'ATS' | 'HRMS' | 'Video' | 'Communication';
  mark: string;
  tagline: string;
  description: string;
  features: string[];
}

const integrationsList: IntegrationItem[] = [
  // ATS Integrations
  {
    name: 'Workday',
    category: 'ATS',
    mark: 'W',
    tagline: 'Bring AI-powered hiring into your Workday environment.',
    description: 'Add intelligent sourcing, screening and interviews to Workday Recruiting without disrupting enterprise HR processes.',
    features: [
      'Sync candidate profiles and application status',
      'Push assessment and interview results to the candidate record',
      'Keep requisitions and job details aligned',
      'Support enterprise-scale hiring workflows',
    ],
  },
  {
    name: 'SAP SuccessFactors',
    category: 'ATS',
    mark: 'SAP',
    tagline: 'Extend SuccessFactors with AI screening and engagement.',
    description: 'Enhance SAP SuccessFactors Recruiting with automated candidate evaluation, while your HR data stays in one place.',
    features: [
      'Sync jobs, candidates and hiring stages',
      'Add AI match scores and ranked shortlists to profiles',
      'Move shortlisted candidates into your existing workflow',
      'Maintain consistent records across HR systems',
    ],
  },
  {
    name: 'Oracle HCM',
    category: 'ATS',
    mark: 'O',
    tagline: 'Add faster, smarter recruitment to Oracle HCM.',
    description: 'Use TalentPool365 to speed up screening and interviews while Oracle HCM remains your core HR platform.',
    features: [
      'Two-way sync of candidate and requisition data',
      'Assessment and interview outcomes attached to candidate records',
      'Smooth hand-off from shortlisting to offer and onboarding',
      'Designed for large, multi-location organizations',
    ],
  },
  {
    name: 'Greenhouse',
    category: 'ATS',
    mark: 'GH',
    tagline: 'Supercharge Greenhouse with AI-driven candidate insights.',
    description: 'Keep your structured Greenhouse hiring process and add automated sourcing, screening and assessments.',
    features: [
      'Import jobs and candidates from Greenhouse',
      'Send AI scores, interview summaries and scorecards back',
      'Automate scheduling and candidate follow-ups',
      'Maintain your existing pipeline stages',
    ],
  },
  {
    name: 'Lever',
    category: 'ATS',
    mark: 'L',
    tagline: 'Bring automation and AI evaluation to Lever.',
    description: 'Combine Lever’s relationship-focused recruiting with TalentPool365’s AI sourcing and screening.',
    features: [
      'Sync candidate profiles, stages and notes',
      'Surface ranked shortlists inside your Lever pipeline',
      'Reduce manual resume review and data entry',
      'Keep recruiters and hiring managers aligned in one view',
    ],
  },

  // HRMS Integrations
  {
    name: 'Zoho People',
    category: 'HRMS',
    mark: 'ZP',
    tagline: 'Send new hires to Zoho People in one step.',
    description: 'Transfer accepted candidates as new employee records, syncing role, department, location and joining date.',
    features: [
      'Transfer accepted candidates as new employee records',
      'Sync role, department, location and joining date',
      'Reduce manual work for HR operations teams',
    ],
  },
  {
    name: 'Keka',
    category: 'HRMS',
    mark: 'K',
    tagline: 'Connect hiring to onboarding in Keka.',
    description: 'Push hired candidate details into Keka automatically to kickstart payroll and onboarding without typing details twice.',
    features: [
      'Push hired candidate details into Keka automatically',
      'Pass offer information to start onboarding workflows',
      'Keep recruitment and HR teams on the same data',
    ],
  },
  {
    name: 'Darwinbox',
    category: 'HRMS',
    mark: 'DB',
    tagline: 'Align recruitment with your Darwinbox workforce data.',
    description: 'Sync approved offers and candidate profiles into enterprise Darwinbox structures across global locations.',
    features: [
      'Sync approved offers and candidate profiles',
      'Support multi-location and enterprise HR structures',
      'Maintain a consistent record from application to employee',
    ],
  },
  {
    name: 'greytHR',
    category: 'HRMS',
    mark: 'GH',
    tagline: 'Simplify handover from recruitment to HR operations.',
    description: 'Transfer joining details and employee information effortlessly, eliminating duplicate data entry for HR and payroll.',
    features: [
      'Transfer joining details and employee information',
      'Reduce duplicate data entry for HR and payroll teams',
      'Keep records accurate from offer to day one',
    ],
  },
  {
    name: 'BambooHR',
    category: 'HRMS',
    mark: 'B',
    tagline: 'Turn accepted offers into BambooHR employee profiles.',
    description: 'Create employee records from hired candidates and sync key job and personal details for fast-growing companies.',
    features: [
      'Create employee records from hired candidates',
      'Sync key job and personal details',
      'Make onboarding smoother for small and growing teams',
    ],
  },

  // Video Platforms
  {
    name: 'Microsoft Teams',
    category: 'Video',
    mark: 'T',
    tagline: 'Schedule and host interviews in Microsoft Teams.',
    description: 'Ideal for organizations already working in the Microsoft ecosystem, creating links and calendar events automatically.',
    features: [
      'Create Teams meeting links automatically when interviews are scheduled',
      'Send invites to candidates and panel members',
      'Keep interview details on the candidate profile',
      'Fit smoothly into Outlook and Microsoft 365 calendars',
    ],
  },
  {
    name: 'Zoom',
    category: 'Video',
    mark: 'Z',
    tagline: 'Connect Zoom for simple, reliable interviews.',
    description: 'A familiar choice for candidates worldwide. Generate meeting links automatically for 1-on-1 and panel interviews.',
    features: [
      'Generate Zoom meeting links automatically',
      'Schedule one-on-one and panel interviews',
      'Send reminders and rescheduling options to candidates',
      'Track interview status in your hiring pipeline',
    ],
  },
  {
    name: 'Google Meet',
    category: 'Video',
    mark: 'M',
    tagline: 'Bring Google Meet into your hiring workflow.',
    description: 'Perfect for teams on Google Workspace, syncing Meet links with Google Calendar events and candidate scorecards.',
    features: [
      'Create Google Meet links with Google Calendar events',
      'Invite interviewers and candidates in a single step',
      'Sync availability to avoid double bookings',
      'Access interview schedules from the candidate profile',
    ],
  },

  // Communication Platforms
  {
    name: 'WhatsApp',
    category: 'Communication',
    mark: 'WA',
    tagline: 'Reach candidates where they reply fastest.',
    description: 'Send updates, reminders, test links and interview details directly to WhatsApp with 89% response rates.',
    features: [
      'Send job alerts, updates and reminders over WhatsApp',
      'Manage two-way conversations from the recruiter workspace',
      'Use ready-made templates for common messages',
      'Respect candidate consent for every message',
    ],
  },
  {
    name: 'Outlook',
    category: 'Communication',
    mark: 'O',
    tagline: 'Connect your Outlook inbox and calendar to your hiring workflow.',
    description: 'Send and receive candidate emails from your own Outlook address while keeping calendar invites synchronized.',
    features: [
      'Send and receive candidate emails from your own Outlook address',
      'Sync interview schedules with your Outlook calendar',
      'Keep email conversations attached to candidate profiles',
      'Track opens and replies on outreach',
    ],
  },
  {
    name: 'Gmail',
    category: 'Communication',
    mark: 'G',
    tagline: 'Run candidate communication straight from Gmail.',
    description: 'Send personalized emails from your Gmail account, sync replies back to the candidate record, and use smart templates.',
    features: [
      'Send personalized emails from your Gmail account',
      'Sync replies back to the candidate record',
      'Use templates and automated follow-up sequences',
      'Work alongside Google Calendar for scheduling',
    ],
  },
  {
    name: 'Slack',
    category: 'Communication',
    mark: 'S',
    tagline: 'Keep your hiring team in the loop, instantly.',
    description: 'Get real-time notifications for new applicants, completed assessments and interview results directly in Slack channels.',
    features: [
      'Notifications for new applicants, completed tests & interview scores',
      'Alert hiring managers when feedback or approvals are needed',
      'Share candidate updates in dedicated role channels',
      'Cut down on status-check emails and status meetings',
    ],
  },
];

const categoryTabs = ['All Integrations', 'ATS', 'HRMS', 'Video', 'Communication'] as const;

export function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All Integrations');
  const [searchQuery, setSearchQuery] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState<'candidates' | 'jobs' | 'assessments' | 'webhooks'>('candidates');

  const filteredIntegrations = integrationsList.filter((item) => {
    const matchCat = activeCategory === 'All Integrations' || item.category === activeCategory;
    const matchSearch =
      `${item.name} ${item.tagline} ${item.description} ${item.features.join(' ')}`
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="sk-page">
      <SkHero
        eyebrow="ECOSYSTEM & API"
        eyebrowIcon="layers"
        title="Recruiting AI that works inside your stack"
        subtitle="You should not have to replace your ATS or HRMS to hire smarter. TalentPool365 syncs candidate profiles, scores, and statuses directly inside the tools your team already uses."
        primaryCta={{ label: 'Book a demo →', href: '/get-started#book-meeting' }}
        secondaryCta={{ label: 'See all integrations ↓', href: '#directory' }}
        aside={
          <div className="sk-mosaic" aria-label="Ecosystem partner mosaic">
            <div className="sk-mosaic-tile">Workday</div>
            <div className="sk-mosaic-tile">Greenhouse</div>
            <div className="sk-mosaic-tile">SAP</div>
            <div className="sk-mosaic-tile">Lever</div>
            <div className="sk-mosaic-tile sk-mosaic-tile--center">TalentPool365</div>
            <div className="sk-mosaic-tile">Oracle HCM</div>
            <div className="sk-mosaic-tile">Zoom</div>
            <div className="sk-mosaic-tile">WhatsApp</div>
            <div className="sk-mosaic-tile">Slack</div>
          </div>
        }
      />

      <SkLogoMarquee />

      {/* Why Connect Section */}
      <section className="section section--light" id="why-connect">
        <div className="container">
          <SectionHead
            eyebrow="Zero Workflow Disruption"
            title="Why connect your *existing hiring tools?*"
            body="TalentPool365 doesn't demand you rip and replace your tech stack. It adds an intelligent AI layer to your current software."
          />

          <div className="grid grid--4">
            <Reveal as="div" className="card value-card" delay={0}>
              <div className="icon-tile"><Icon name="refresh" /></div>
              <h3>No Double Entry</h3>
              <p>Candidate profiles, assessments, and status updates flow between systems automatically with zero copy-pasting.</p>
            </Reveal>

            <Reveal as="div" className="card value-card" delay={1}>
              <div className="icon-tile"><Icon name="shield" /></div>
              <h3>Keep System of Record</h3>
              <p>Your ATS remains the single source of truth while TalentPool365 supercharges sourcing, screening, and evaluations.</p>
            </Reveal>

            <Reveal as="div" className="card value-card" delay={2}>
              <div className="icon-tile"><Icon name="rocket" /></div>
              <h3>Faster Rollout</h3>
              <p>Deploy in hours rather than months. Your recruiting team keeps working in familiar interfaces without retraining.</p>
            </Reveal>

            <Reveal as="div" className="card value-card" delay={3}>
              <div className="icon-tile"><Icon name="chart" /></div>
              <h3>Complete Visibility</h3>
              <p>Assessment scores, AI transcripts, and interview shortlists appear right where your recruiters already review candidates.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section className="section" id="directory">
        <div className="container">
          <SectionHead
            eyebrow="Integration Catalog"
            title="Browse supported *connectors & platforms*"
            body="Explore certified connectors for enterprise ATS, HRMS, video interviewing, and communication platforms."
          />

          <div className="catalog-toolbar">
            <div className="filter" role="group" aria-label="Integration categories">
              {categoryTabs.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-opt${activeCategory === cat ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="field search-field">
              <label htmlFor="integration-search" className="sr-only">Search integrations</label>
              <input
                id="integration-search"
                type="search"
                placeholder="Search Workday, Slack, Zoom, WhatsApp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <p className="result-count" role="status">
            Showing {filteredIntegrations.length} verified connector{filteredIntegrations.length === 1 ? '' : 's'}
          </p>

          <div className="integration-cards-grid">
            {filteredIntegrations.map((item, idx) => (
              <Reveal as="article" key={item.name} className="integration-feature-card" delay={idx % 3}>
                <div className="integration-card-header">
                  <div className="integration-logo-badge">{item.mark}</div>
                  <div>
                    <span className="integration-cat-label">{item.category}</span>
                    <h3 className="integration-title">{item.name}</h3>
                  </div>
                </div>

                <p className="integration-tagline">{item.tagline}</p>
                <p className="integration-desc">{item.description}</p>

                <div className="integration-key-points">
                  <strong>Key capabilities:</strong>
                  <ul className="ticks">
                    {item.features.map((feat) => (
                      <li key={feat}>{feat}</li>
                    ))}
                  </ul>
                </div>

                <div className="integration-card-footer">
                  <a className="btn btn-outline btn-sm" href="/get-started#book-meeting">
                    Request Integration <Icon name="arrow-right" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {!filteredIntegrations.length && (
            <div className="empty-state">
              <h3>No integration matches your query</h3>
              <p>We are constantly expanding our integrations. Tell us which platform you use and we’ll build a connector.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Integrations');
                }}
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* What Gets Synced Section */}
      <section className="section section--light" id="what-gets-synced">
        <div className="container">
          <SectionHead
            eyebrow="Data Synchronization"
            title="What gets synced between *systems?*"
            body="Your team chooses exactly which fields and events flow between TalentPool365 and your corporate HR stack."
          />

          <div className="sync-cards-container">
            <div className="sync-box">
              <span className="sync-icon"><Icon name="users" /></span>
              <h4>Candidate & Employee Profiles</h4>
              <p>Full names, contact details, work history, education, skills, and current employer information.</p>
            </div>

            <div className="sync-box">
              <span className="sync-icon"><Icon name="briefcase" /></span>
              <h4>Job Requisitions & Roles</h4>
              <p>Department, job code, hiring manager, seniority level, compensation band, and location.</p>
            </div>

            <div className="sync-box">
              <span className="sync-icon"><Icon name="clipboard-check" /></span>
              <h4>Scores & Assessments</h4>
              <p>Match scores, technical coding evaluation reports, cognitive percentiles, and interview scorecards.</p>
            </div>

            <div className="sync-box">
              <span className="sync-icon"><Icon name="file-check" /></span>
              <h4>Offer & Pre-Onboarding Data</h4>
              <p>Signed offer letters, digital signatures, collected ID documents, and verified joining dates.</p>
            </div>
          </div>

          <div className="how-sync-works-strip">
            <h3>How integration works in 3 simple steps</h3>
            <div className="how-sync-steps">
              <div className="sync-step">
                <span className="sync-step-num">1</span>
                <strong>Connect</strong>
                <p>Link your ATS or HRMS to TalentPool365 with secure OAuth or API keys.</p>
              </div>
              <div className="sync-step">
                <span className="sync-step-num">2</span>
                <strong>Map Fields</strong>
                <p>Choose which jobs, candidates, and custom fields flow automatically.</p>
              </div>
              <div className="sync-step">
                <span className="sync-step-num">3</span>
                <strong>Hire & Automate</strong>
                <p>Run sourcing and screening; results update your ATS in real time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer API Documentation Section */}
      <section className="section" id="api-documentation">
        <div className="container">
          <SectionHead
            eyebrow="For Technical & Engineering Teams"
            title="Build on TalentPool365 with our *developer-friendly API*"
            body="If your tool isn’t in our pre-built catalog, connect it in minutes. Move candidate, job, and assessment data programmatically."
          />

          <div className="api-playground-split">
            <div className="api-info-panel">
              <h3>REST API & Real-Time Webhooks</h3>
              <p>
                The TalentPool365 API provides secure, token-based authentication with granular permissions
                and encrypted endpoints. Automate your proprietary internal workflows effortlessly.
              </p>

              <div className="api-nav-tabs">
                <button
                  type="button"
                  className={`api-tab-btn${apiEndpoint === 'candidates' ? ' is-active' : ''}`}
                  onClick={() => setApiEndpoint('candidates')}
                >
                  Candidates API
                </button>
                <button
                  type="button"
                  className={`api-tab-btn${apiEndpoint === 'jobs' ? ' is-active' : ''}`}
                  onClick={() => setApiEndpoint('jobs')}
                >
                  Jobs Requisitions
                </button>
                <button
                  type="button"
                  className={`api-tab-btn${apiEndpoint === 'assessments' ? ' is-active' : ''}`}
                  onClick={() => setApiEndpoint('assessments')}
                >
                  Assessments
                </button>
                <button
                  type="button"
                  className={`api-tab-btn${apiEndpoint === 'webhooks' ? ' is-active' : ''}`}
                  onClick={() => setApiEndpoint('webhooks')}
                >
                  Webhooks
                </button>
              </div>

              <ul className="ticks" style={{ marginTop: 20 }}>
                <li>Secure Bearer token key-based authentication with instant rotation</li>
                <li>Webhook event triggers for candidate status changes & offer acceptance</li>
                <li>Comprehensive rate limiting (up to 1,000 req/min for Enterprise)</li>
                <li>Sandbox testing environment with pre-populated dummy candidate records</li>
              </ul>

              <div style={{ marginTop: 28 }}>
                <a className="btn btn-primary" href="/company/contact">
                  Request API Sandbox Access
                </a>
              </div>
            </div>

            <div className="api-code-terminal">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="terminal-title">TalentPool365 REST API v1</span>
              </div>

              <div className="terminal-body">
                {apiEndpoint === 'candidates' && (
                  <pre>
                    <code>
{`// 1. Fetch Shortlisted Candidates
GET /v1/candidates?job_id=req_89201&status=shortlisted
Host: api.talentpool365.com
Authorization: Bearer tp365_live_sec_99a8b1...
Content-Type: application/json

// Response 200 OK
{
  "total": 12,
  "candidates": [
    {
      "id": "cand_94821",
      "name": "Alex Taylor",
      "email": "alex.taylor@example.com",
      "match_score": 94,
      "skills_matched": ["React", "TypeScript", "Node.js"],
      "assessment_status": "passed",
      "assessment_percentile": 96.4,
      "interview_completed": true,
      "recommended_action": "extend_offer"
    }
  ]
}`}
                    </code>
                  </pre>
                )}

                {apiEndpoint === 'jobs' && (
                  <pre>
                    <code>
{`// 2. Publish New Job Requisition
POST /v1/jobs
Host: api.talentpool365.com
Authorization: Bearer tp365_live_sec_99a8b1...
Content-Type: application/json

{
  "title": "Lead DevOps Engineer",
  "department": "Infrastructure",
  "location": "Bengaluru, Hybrid",
  "must_have_skills": ["Kubernetes", "Terraform", "AWS"],
  "min_experience_years": 5,
  "multi_board_syndication": ["linkedin", "naukri", "indeed"],
  "enable_ai_sourcing": true
}`}
                    </code>
                  </pre>
                )}

                {apiEndpoint === 'assessments' && (
                  <pre>
                    <code>
{`// 3. Trigger Automated Assessment & Interview
POST /v1/assessments/schedule
Host: api.talentpool365.com
Authorization: Bearer tp365_live_sec_99a8b1...

{
  "candidate_id": "cand_94821",
  "test_battery": ["technical_coding", "cognitive_reasoning"],
  "delivery_channel": "whatsapp_and_email",
  "expiration_days": 3,
  "proctoring_level": "strict"
}`}
                    </code>
                  </pre>
                )}

                {apiEndpoint === 'webhooks' && (
                  <pre>
                    <code>
{`// 4. Real-time Webhook Event Payload
POST https://your-server.com/webhooks/talentpool365
Content-Type: application/json
X-TP365-Signature: sha256=d3b07384d113edec49eaa6...

{
  "event": "offer.accepted",
  "timestamp": "2026-11-17T12:00:00Z",
  "data": {
    "candidate_id": "cand_94821",
    "job_id": "req_89201",
    "joining_date": "2026-12-01",
    "salary_ctc": "Approved",
    "e_signature_verified": true
  }
}`}
                    </code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SkCtaBanner />
    </main>
  );
}