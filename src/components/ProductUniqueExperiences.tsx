import { useState } from 'react';
import type { ProductPage as ProductData } from '../data/products';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

// -------------------------------------------------------------
// 1. TALENT SOURCING EXPERIENCE
// -------------------------------------------------------------
export function SourcingExperience({ product }: { product: ProductData }) {
  const [activeSource, setActiveSource] = useState<'all' | 'db' | 'boards' | 'social' | 'pools'>('all');
  const [query, setQuery] = useState('React developer, 4+ years, Bengaluru');

  const candidates = [
    {
      name: 'Aiko Tanaka',
      source: 'Resume Database (Archive)',
      role: 'Senior Frontend Engineer',
      exp: '5.5 yrs',
      location: 'Bengaluru / Hybrid',
      score: 96,
      skills: ['React', 'TypeScript', 'Next.js', 'Redux'],
      tag: 'Silver Medalist (Q2)',
    },
    {
      name: 'Daniel Okafor',
      source: 'LinkedIn & Social',
      role: 'Staff UI Engineer',
      exp: '6 yrs',
      location: 'Bengaluru',
      score: 93,
      skills: ['React', 'System Design', 'GraphQL', 'AWS'],
      tag: 'Passive Candidate',
    },
    {
      name: 'Sofia Marin',
      source: 'Job Board Integration',
      role: 'Frontend Developer',
      exp: '4 yrs',
      location: 'Bengaluru / Remote',
      score: 89,
      skills: ['React', 'JavaScript', 'CSS Modules', 'Jest'],
      tag: 'New Applicant (1h ago)',
    },
    {
      name: 'Jonas Weber',
      source: 'Talent Pool Management',
      role: 'Full-Stack React/Node',
      exp: '5 yrs',
      location: 'Bengaluru',
      score: 87,
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      tag: 'Q3 Fintech Pool',
    },
  ];

  const filtered = candidates.filter((c) => {
    if (activeSource === 'db') return c.source.includes('Resume Database');
    if (activeSource === 'boards') return c.source.includes('Job Board');
    if (activeSource === 'social') return c.source.includes('LinkedIn');
    if (activeSource === 'pools') return c.source.includes('Talent Pool');
    return true;
  });

  return (
    <div className="product-custom-experience sourcing-experience">
      {/* Sourcing Command Center Sandbox */}
      <section className="section section--light">
        <div className="container">
          <SectionHead
            eyebrow="Interactive Command Center"
            title="Multi-channel candidate search *in real time*"
            body={product.sectionIntro || product.lede}
          />

          <div className="sourcing-terminal card">
            <div className="sourcing-search-bar">
              <span className="search-icon"><Icon name="search" /></span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across database, job boards and LinkedIn..."
                className="sourcing-input"
              />
              <button type="button" className="btn btn-primary btn-sm">
                Search All Sources
              </button>
            </div>

            <div className="sourcing-source-tabs">
              <span className="tab-label">Filter Intake Source:</span>
              <button
                type="button"
                className={`source-chip${activeSource === 'all' ? ' is-active' : ''}`}
                onClick={() => setActiveSource('all')}
              >
                All Sources (4)
              </button>
              <button
                type="button"
                className={`source-chip${activeSource === 'db' ? ' is-active' : ''}`}
                onClick={() => setActiveSource('db')}
              >
                Resume Archive
              </button>
              <button
                type="button"
                className={`source-chip${activeSource === 'boards' ? ' is-active' : ''}`}
                onClick={() => setActiveSource('boards')}
              >
                Job Boards
              </button>
              <button
                type="button"
                className={`source-chip${activeSource === 'social' ? ' is-active' : ''}`}
                onClick={() => setActiveSource('social')}
              >
                LinkedIn & Social
              </button>
              <button
                type="button"
                className={`source-chip${activeSource === 'pools' ? ' is-active' : ''}`}
                onClick={() => setActiveSource('pools')}
              >
                Talent Pools
              </button>
            </div>

            <div className="candidate-stream-grid">
              {filtered.map((cand) => (
                <div key={cand.name} className="cand-discovery-card">
                  <div className="cand-head">
                    <div>
                      <h4>{cand.name}</h4>
                      <p className="cand-role">{cand.role} · {cand.exp}</p>
                    </div>
                    <div className="cand-score-pill">
                      <strong>{cand.score}%</strong>
                      <span>Match</span>
                    </div>
                  </div>

                  <div className="cand-meta-row">
                    <span className="cand-source-badge">{cand.source}</span>
                    <span className="cand-tag-badge">{cand.tag}</span>
                  </div>

                  <div className="cand-skills-chips">
                    {cand.skills.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>

                  <div className="cand-card-action">
                    <button type="button" className="btn btn-outline btn-xs">
                      Engage & Add to Pool <Icon name="arrow-right" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Capabilities Grid */}
      <section className="section" id="capabilities">
        <div className="container">
          <SectionHead
            eyebrow="Key capabilities"
            title="Sourcing tools built to *beat the competition*"
            body="Every capability described in the TalentPool365 sourcing engine."
          />

          <div className="grid grid--2 capability-cards-grid">
            {product.capabilities.map((cap, idx) => (
              <Reveal as="article" key={cap.id} className="card capability-box" delay={idx % 2}>
                <div className="cap-badge-num">0{idx + 1}</div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 2. CANDIDATE SCREENING EXPERIENCE
// -------------------------------------------------------------
export function ScreeningExperience({ product }: { product: ProductData }) {
  const [mustHaveWeight, setMustHaveWeight] = useState(80);
  const [experienceWeight, setExperienceWeight] = useState(70);

  return (
    <div className="product-custom-experience screening-experience">
      {/* Resume Parsing & AI Matching Inspector */}
      <section className="section section--light">
        <div className="container">
          <SectionHead
            eyebrow="Parsing & Skill Extraction"
            title="See the skills behind *the job titles*"
            body={product.sectionIntro || product.lede}
          />

          <div className="screening-comparator-box card">
            <div className="screen-compare-cols">
              {/* Left Column: Raw Resume */}
              <div className="compare-col raw-resume-col">
                <span className="col-tag">Unstructured Resume (PDF/Word)</span>
                <div className="raw-doc-preview">
                  <div className="doc-line doc-title">Alex Chen — Senior Full Stack Developer</div>
                  <div className="doc-line doc-contact">chen.alex@email.com | +1 (555) 019-2834 | San Francisco, CA</div>
                  <div className="doc-section-title">WORK EXPERIENCE</div>
                  <div className="doc-paragraph">
                    Lead Engineer at FinTech Labs (2021–Present): Rebuilt core payment reconciliation pipelines using
                    Typescript, Node, and Postgres, reducing latency by 45%. Orchestrated microservices in AWS ECS.
                  </div>
                  <div className="doc-paragraph">
                    Software Engineer at WebScale Inc (2018–2021): Implemented high-traffic customer portals in React and
                    Redux. Improved bundle size by 30% through dynamic code splitting.
                  </div>
                  <div className="doc-section-title">EDUCATION & CERTIFICATIONS</div>
                  <div className="doc-paragraph">B.S. in Computer Science, UC Berkeley · AWS Certified Solutions Architect</div>
                </div>
              </div>

              {/* Right Column: AI Extracted Structured Data */}
              <div className="compare-col structured-data-col">
                <div className="structured-head">
                  <span className="col-tag col-tag--ai">AI Structured Profile & Skill Graph</span>
                  <div className="instant-score-badge">
                    <strong>94%</strong>
                    <span>Match Score</span>
                  </div>
                </div>

                <div className="structured-fields">
                  <div className="field-row">
                    <span className="field-lbl">Verified Experience:</span>
                    <strong>6.2 Years (Senior Level)</strong>
                  </div>
                  <div className="field-row">
                    <span className="field-lbl">Duplicate Status:</span>
                    <strong className="text-success">Clean (No earlier profile)</strong>
                  </div>

                  <div className="skills-extracted-group">
                    <span className="field-lbl">Extracted Hard Skills & Proficiency:</span>
                    <div className="skill-meters">
                      <div className="skill-meter-row">
                        <span>TypeScript / Node.js</span>
                        <div className="meter-track"><div className="meter-fill" style={{ width: '95%' }} /></div>
                        <em>Expert</em>
                      </div>
                      <div className="skill-meter-row">
                        <span>React / Frontend</span>
                        <div className="meter-track"><div className="meter-fill" style={{ width: '90%' }} /></div>
                        <em>Advanced</em>
                      </div>
                      <div className="skill-meter-row">
                        <span>AWS Microservices</span>
                        <div className="meter-track"><div className="meter-fill" style={{ width: '85%' }} /></div>
                        <em>Advanced</em>
                      </div>
                    </div>
                  </div>

                  <div className="smart-shortlist-verdict">
                    <span className="verdict-icon"><Icon name="clipboard-check" /></span>
                    <p>
                      <strong>Shortlist Recommendation:</strong> Top 2% candidate for Senior Full Stack requisition.
                      Verified match on all must-have backend and cloud architecture requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Criteria Weighting Sliders */}
            <div className="criteria-tuning-bar">
              <div className="tune-field">
                <label>
                  Must-have Skills Weight: <strong>{mustHaveWeight}%</strong>
                </label>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={mustHaveWeight}
                  onChange={(e) => setMustHaveWeight(Number(e.target.value))}
                />
              </div>

              <div className="tune-field">
                <label>
                  Domain Experience Weight: <strong>{experienceWeight}%</strong>
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={experienceWeight}
                  onChange={(e) => setExperienceWeight(Number(e.target.value))}
                />
              </div>

              <div className="tune-summary">
                <span>Ranked pool re-calculated automatically based on weights.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" id="capabilities">
        <div className="container">
          <SectionHead
            eyebrow="Candidate Screening Suite"
            title="From 500 applicants to *your best 10*"
            body="Review the 5 stages of automated screening in TalentPool365."
          />

          <div className="grid grid--2 capability-cards-grid">
            {product.capabilities.map((cap, idx) => (
              <Reveal as="article" key={cap.id} className="card capability-box" delay={idx % 2}>
                <div className="cap-badge-num">0{idx + 1}</div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 3. AI ASSESSMENTS EXPERIENCE
// -------------------------------------------------------------
export function AssessmentsExperience({ product }: { product: ProductData }) {
  const [testTab, setTestTab] = useState<'tech' | 'aptitude' | 'cognitive' | 'behavioral'>('tech');

  return (
    <div className="product-custom-experience assessments-experience">
      <section className="section section--light">
        <div className="container">
          <SectionHead
            eyebrow="Assessment Testing Suite"
            title="Test real ability, *not just resumes*"
            body={product.sectionIntro || product.lede}
          />

          <div className="test-simulator-box card">
            <div className="test-type-nav">
              <button
                type="button"
                className={`test-nav-btn${testTab === 'tech' ? ' is-active' : ''}`}
                onClick={() => setTestTab('tech')}
              >
                1. Technical Coding
              </button>
              <button
                type="button"
                className={`test-nav-btn${testTab === 'aptitude' ? ' is-active' : ''}`}
                onClick={() => setTestTab('aptitude')}
              >
                2. Aptitude & Reasoning
              </button>
              <button
                type="button"
                className={`test-nav-btn${testTab === 'cognitive' ? ' is-active' : ''}`}
                onClick={() => setTestTab('cognitive')}
              >
                3. Cognitive Test
              </button>
              <button
                type="button"
                className={`test-nav-btn${testTab === 'behavioral' ? ' is-active' : ''}`}
                onClick={() => setTestTab('behavioral')}
              >
                4. Behavioral Analysis
              </button>
            </div>

            <div className="test-stage-content">
              {testTab === 'tech' && (
                <div className="tech-test-view">
                  <div className="code-editor-mock">
                    <div className="editor-topbar">
                      <span>Problem: LRU Cache Implementation (TypeScript)</span>
                      <span className="timer-badge">⏱ 24:18 Remaining</span>
                    </div>
                    <pre className="code-content">
                      <code>
{`class LRUCache<K, V> {
  private capacity: number;
  private map: Map<K, V> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined;
    const value = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
}`}
                      </code>
                    </pre>
                    <div className="test-results-strip">
                      <span className="test-pass-pill">✓ 14/14 Automated Test Cases Passed</span>
                      <span className="test-perf-pill">Runtime: 42ms (Top 5%)</span>
                    </div>
                  </div>
                </div>
              )}

              {testTab === 'aptitude' && (
                <div className="aptitude-test-view">
                  <div className="quiz-question-box">
                    <span className="question-cat">Numerical & Logical Reasoning · Question 8 of 20</span>
                    <h4>A logistics network delivers 420 parcels across 6 fulfillment hubs in 4 hours. If 2 hubs are added and delivery efficiency increases by 15%, what is the expected throughput in 6 hours?</h4>
                    <div className="quiz-options-list">
                      <div className="quiz-option is-selected">A) 869 parcels (Calculated)</div>
                      <div className="quiz-option">B) 720 parcels</div>
                      <div className="quiz-option">C) 945 parcels</div>
                      <div className="quiz-option">D) 810 parcels</div>
                    </div>
                    <div className="test-results-strip">
                      <span className="test-pass-pill">✓ Answer Recorded</span>
                      <span className="test-perf-pill">Candidate Percentile: 92nd Percentile</span>
                    </div>
                  </div>
                </div>
              )}

              {testTab === 'cognitive' && (
                <div className="cognitive-test-view">
                  <div className="quiz-question-box">
                    <span className="question-cat">Critical Thinking & Pattern Recognition</span>
                    <h4>Identify the matrix transform rule that completes the sequence:</h4>
                    <div className="matrix-puzzle-grid">
                      <div className="puzzle-tile">▲ ■ ◆</div>
                      <div className="puzzle-tile">■ ◆ ▲</div>
                      <div className="puzzle-tile puzzle-target">?</div>
                    </div>
                    <p className="puzzle-hint">Measures cognitive processing speed, working memory, and deductive logic.</p>
                    <div className="test-results-strip">
                      <span className="test-pass-pill">✓ Accuracy: 96%</span>
                      <span className="test-perf-pill">Speed: 1.8s avg/question</span>
                    </div>
                  </div>
                </div>
              )}

              {testTab === 'behavioral' && (
                <div className="behavioral-test-view">
                  <div className="quiz-question-box">
                    <span className="question-cat">Situational Judgement & Culture Fit</span>
                    <h4>A critical stakeholder requests an urgent scope change 48 hours before code freeze that conflicts with compliance guidelines. How do you navigate this?</h4>
                    <div className="behavioral-breakdown">
                      <div className="trait-card">
                        <strong>Collaboration & Tact:</strong> Evaluates diplomatic communication and alignment.
                      </div>
                      <div className="trait-card">
                        <strong>Integrity & Compliance:</strong> Ensures adherence to organizational regulations.
                      </div>
                    </div>
                    <div className="test-results-strip">
                      <span className="test-pass-pill">✓ Work Style: Strategic & Collaborative</span>
                      <span className="test-perf-pill">Team Fit Index: 91/100</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scorecard Summary */}
            <div className="scorecard-report-footer">
              <div className="scorecard-item">
                <span className="score-lbl">Technical Test</span>
                <strong>94 / 100</strong>
              </div>
              <div className="scorecard-item">
                <span className="score-lbl">Aptitude Percentile</span>
                <strong>92nd %ile</strong>
              </div>
              <div className="scorecard-item">
                <span className="score-lbl">Cognitive Speed</span>
                <strong>96% Accuracy</strong>
              </div>
              <div className="scorecard-item">
                <span className="score-lbl">AI Proctoring</span>
                <strong className="text-success">100% Verified (0 flags)</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" id="capabilities">
        <div className="container">
          <SectionHead
            eyebrow="Assessment Modules"
            title="Comprehensive testing, *automated evaluation*"
            body="Review the 5 pillars of the TalentPool365 assessment engine."
          />

          <div className="grid grid--2 capability-cards-grid">
            {product.capabilities.map((cap, idx) => (
              <Reveal as="article" key={cap.id} className="card capability-box" delay={idx % 2}>
                <div className="cap-badge-num">0{idx + 1}</div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 4. AI INTERVIEWS EXPERIENCE
// -------------------------------------------------------------
export function InterviewsExperience({ product }: { product: ProductData }) {
  const [interviewMode, setInterviewMode] = useState<'video' | 'voice' | 'coding'>('video');

  return (
    <div className="product-custom-experience interviews-experience">
      <section className="section section--light">
        <div className="container">
          <SectionHead
            eyebrow="24/7 Asynchronous Interview Suite"
            title="Interview every candidate, *on their schedule, not yours*"
            body={product.sectionIntro || product.lede}
          />

          <div className="interview-simulator-deck card">
            <div className="interview-mode-selector">
              <button
                type="button"
                className={`mode-btn${interviewMode === 'video' ? ' is-active' : ''}`}
                onClick={() => setInterviewMode('video')}
              >
                <Icon name="video" /> Video Interview Mode
              </button>
              <button
                type="button"
                className={`mode-btn${interviewMode === 'voice' ? ' is-active' : ''}`}
                onClick={() => setInterviewMode('voice')}
              >
                <Icon name="headset" /> Voice-Based Screening
              </button>
              <button
                type="button"
                className={`mode-btn${interviewMode === 'coding' ? ' is-active' : ''}`}
                onClick={() => setInterviewMode('coding')}
              >
                <Icon name="clipboard-check" /> Live Coding Interview
              </button>
            </div>

            <div className="interview-interface-screen">
              {interviewMode === 'video' && (
                <div className="video-interview-mock">
                  <div className="video-feed-window">
                    <div className="candidate-webcam-box">
                      <div className="webcam-overlay">
                        <span className="rec-dot">● REC</span>
                        <span className="proctor-badge">AI Proctor: Active (Face Verified)</span>
                      </div>
                      <div className="simulated-avatar-view">
                        <div className="avatar-face-circle">JD</div>
                        <p>Jessica Davis · Senior Product Manager Candidate</p>
                      </div>
                    </div>

                    <div className="live-transcript-panel">
                      <span className="transcript-head">Live AI Transcript & Speech Analysis</span>
                      <div className="transcript-text">
                        “When leading our enterprise migration, we encountered resistance from customer success regarding
                        feature parity. I scheduled weekly open calibration sessions and built a telemetry dashboard...”
                      </div>
                      <div className="sentiment-bar">
                        <span>Clarity: <strong>94%</strong></span>
                        <span>Confidence: <strong>91%</strong></span>
                        <span>Structured Reasoning: <strong>95%</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {interviewMode === 'voice' && (
                <div className="voice-interview-mock">
                  <div className="audio-visualizer-box">
                    <div className="audio-wave">
                      <span className="bar" style={{ height: '40%' }} />
                      <span className="bar" style={{ height: '80%' }} />
                      <span className="bar" style={{ height: '60%' }} />
                      <span className="bar" style={{ height: '90%' }} />
                      <span className="bar" style={{ height: '70%' }} />
                      <span className="bar" style={{ height: '50%' }} />
                    </div>
                    <h4>AI Voice Interviewer: Question 2 of 5</h4>
                    <p className="voice-prompt">
                      “How do you handle difficult customer objections during a renewal conversation?”
                    </p>
                    <div className="voice-metrics">
                      <div className="metric-chip">Spoken Fluency: <strong>Superior</strong></div>
                      <div className="metric-chip">Tone & Professionalism: <strong>High</strong></div>
                      <div className="metric-chip">Active Listening: <strong>92%</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {interviewMode === 'coding' && (
                <div className="coding-interview-mock">
                  <div className="code-playback-viewer">
                    <div className="playback-controls">
                      <span>Live Session Replay: Python Concurrency Problem</span>
                      <span className="runtime-badge">Execution Time: 0.12s</span>
                    </div>
                    <pre className="code-content">
                      <code>
{`import asyncio

async def fetch_user_data(user_id: int):
    # Simulated non-blocking API call
    await asyncio.sleep(0.05)
    return {"user_id": user_id, "status": "active"}

async def process_batch(user_ids: list[int]):
    tasks = [fetch_user_data(uid) for uid in user_ids]
    return await asyncio.gather(*tasks)`}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>

            <div className="ai-followup-drawer">
              <span className="drawer-title">
                <Icon name="chat" /> Conversational AI Adaptive Follow-Up
              </span>
              <p>
                <strong>AI Interviewer:</strong> “You mentioned building a telemetry dashboard to monitor adoption.
                Which specific metrics convinced the executive committee to approve the next phase?”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Capabilities */}
      <section className="section" id="capabilities">
        <div className="container">
          <SectionHead
            eyebrow="Interview Suite Modules"
            title="Structured interviews, *defensible hiring evidence*"
            body="Review the 6 components of the AI interviews platform."
          />

          <div className="grid grid--2 capability-cards-grid">
            {product.capabilities.map((cap, idx) => (
              <Reveal as="article" key={cap.id} className="card capability-box" delay={idx % 2}>
                <div className="cap-badge-num">0{idx + 1}</div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 5. RECRUITER WORKSPACE EXPERIENCE
// -------------------------------------------------------------
export function WorkspaceExperience({ product }: { product: ProductData }) {
  return (
    <div className="product-custom-experience workspace-experience">
      <section className="section section--light">
        <div className="container">
          <SectionHead
            eyebrow="Central Pipeline Control"
            title="Your entire hiring process, *in one place*"
            body={product.sectionIntro || product.lede}
          />

          <div className="workspace-kanban-board card">
            <div className="workspace-board-header">
              <div>
                <h3>Requisition: Senior Cloud Infrastructure Engineers (3 Openings)</h3>
                <p>Team: Platform Infrastructure · Hiring Manager: Marcus Vance</p>
              </div>
              <div className="board-actions">
                <span className="recruiter-tag">Recruiter: Sarah Jenkins</span>
                <span className="sla-tag">SLA Target: 18 Days (On Track)</span>
              </div>
            </div>

            <div className="kanban-columns-row">
              <div className="kanban-column">
                <div className="kanban-col-head">
                  <span className="col-title">New Applicants</span>
                  <span className="col-count">142</span>
                </div>
                <div className="mini-card-slot">
                  <div className="mini-card">
                    <strong>Priya Patel</strong>
                    <span>Applied 2h ago · 88% Match</span>
                  </div>
                  <div className="mini-card">
                    <strong>Liam O'Connor</strong>
                    <span>Applied 4h ago · 91% Match</span>
                  </div>
                </div>
              </div>

              <div className="kanban-column">
                <div className="kanban-col-head">
                  <span className="col-title">Screened</span>
                  <span className="col-count">24</span>
                </div>
                <div className="mini-card-slot">
                  <div className="mini-card is-active-kanban">
                    <strong>Rohan Mehta</strong>
                    <span>AI Match Score: 92%</span>
                    <span className="reviewer-pill">Reviewed by @anita</span>
                  </div>
                </div>
              </div>

              <div className="kanban-column">
                <div className="kanban-col-head">
                  <span className="col-title">Assessed</span>
                  <span className="col-count">8</span>
                </div>
                <div className="mini-card-slot">
                  <div className="mini-card">
                    <strong>Elena Gomez</strong>
                    <span>Tech Test: 94/100</span>
                    <span className="reviewer-pill">Passed All Tests</span>
                  </div>
                </div>
              </div>

              <div className="kanban-column">
                <div className="kanban-col-head">
                  <span className="col-title">Interviewed</span>
                  <span className="col-count">4</span>
                </div>
                <div className="mini-card-slot">
                  <div className="mini-card is-highlight">
                    <strong>Sarah Lin</strong>
                    <span>Final Panel: 4.8 / 5.0</span>
                    <span className="reviewer-pill">3 Approvals Signed</span>
                  </div>
                </div>
              </div>

              <div className="kanban-column">
                <div className="kanban-col-head">
                  <span className="col-title">Offer Extended</span>
                  <span className="col-count">2</span>
                </div>
                <div className="mini-card-slot">
                  <div className="mini-card is-offer">
                    <strong>David Kim</strong>
                    <span>Offer Sent: $165k</span>
                    <span className="status-pill status-sent">Pending E-Sign</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Collaboration & Approval Chain Stepper */}
            <div className="approval-stepper-strip">
              <h4>Active Offer Approval Chain (Candidate: Sarah Lin)</h4>
              <div className="stepper-row">
                <div className="step-item is-done">
                  <span className="step-dot">✓</span>
                  <span>1. Hiring Manager Review</span>
                </div>
                <div className="step-item is-done">
                  <span className="step-dot">✓</span>
                  <span>2. Department VP Approval</span>
                </div>
                <div className="step-item is-active">
                  <span className="step-dot">●</span>
                  <span>3. Compensation Committee</span>
                </div>
                <div className="step-item">
                  <span className="step-dot">○</span>
                  <span>4. Automated Release</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" id="capabilities">
        <div className="container">
          <SectionHead
            eyebrow="Workspace Features"
            title="Recruiters and hiring managers, *working as one team*"
            body="Review the 5 core modules of the Recruiter Workspace."
          />

          <div className="grid grid--2 capability-cards-grid">
            {product.capabilities.map((cap, idx) => (
              <Reveal as="article" key={cap.id} className="card capability-box" delay={idx % 2}>
                <div className="cap-badge-num">0{idx + 1}</div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 6. CANDIDATE ENGAGEMENT EXPERIENCE
// -------------------------------------------------------------
export function EngagementExperience({ product }: { product: ProductData }) {
  const [channelTab, setChannelTab] = useState<'whatsapp' | 'chatbot' | 'email' | 'schedule'>('whatsapp');

  return (
    <div className="product-custom-experience engagement-experience">
      <section className="section section--light">
        <div className="container">
          <SectionHead
            eyebrow="Omnichannel Candidate Communication"
            title="Keep every candidate informed, *interested and moving forward*"
            body={product.sectionIntro || product.lede}
          />

          <div className="engagement-showcase-box card">
            <div className="channel-switch-buttons">
              <button
                type="button"
                className={`channel-btn${channelTab === 'whatsapp' ? ' is-active' : ''}`}
                onClick={() => setChannelTab('whatsapp')}
              >
                WhatsApp Automation (89% Open Rate)
              </button>
              <button
                type="button"
                className={`channel-btn${channelTab === 'chatbot' ? ' is-active' : ''}`}
                onClick={() => setChannelTab('chatbot')}
              >
                24/7 AI Career Chatbot
              </button>
              <button
                type="button"
                className={`channel-btn${channelTab === 'email' ? ' is-active' : ''}`}
                onClick={() => setChannelTab('email')}
              >
                Personalized Email Drips
              </button>
              <button
                type="button"
                className={`channel-btn${channelTab === 'schedule' ? ' is-active' : ''}`}
                onClick={() => setChannelTab('schedule')}
              >
                1-Click Self-Scheduling
              </button>
            </div>

            <div className="channel-preview-viewport">
              {channelTab === 'whatsapp' && (
                <div className="whatsapp-phone-mock">
                  <div className="phone-screen">
                    <div className="phone-header">
                      <div className="phone-avatar">TP</div>
                      <div>
                        <strong>TalentPool365 Careers</strong>
                        <span>Official Business Account ✓</span>
                      </div>
                    </div>
                    <div className="phone-chat-body">
                      <div className="chat-bubble chat-in">
                        Hi Michael! Congratulations on completing your application for Senior DevOps Engineer at NovaTech. 🎉
                      </div>
                      <div className="chat-bubble chat-in">
                        Your technical coding assessment is ready. Click below to start whenever suits you:
                        <div className="chat-link-btn">▶ Start 45-min Assessment</div>
                      </div>
                      <div className="chat-bubble chat-out">
                        Thanks! I just finished the test. How soon will I hear back?
                      </div>
                      <div className="chat-bubble chat-in">
                        Great job Michael! You passed all 14 test cases with a 96% score. You can now select your interview slot with Marcus Vance:
                        <div className="chat-link-btn">📅 Choose Interview Time</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {channelTab === 'chatbot' && (
                <div className="chatbot-web-mock">
                  <div className="web-chatbot-box">
                    <div className="chatbot-head">
                      <span>🤖 TalentPool365 Career Assistant</span>
                      <span className="live-status">Online 24/7</span>
                    </div>
                    <div className="chatbot-messages">
                      <div className="bot-msg">
                        Hello! Looking for an open role or have questions about our recruitment process?
                      </div>
                      <div className="user-msg">
                        Do you sponsor work visas for Senior Backend roles in Bengaluru?
                      </div>
                      <div className="bot-msg">
                        Yes! We provide full relocation and visa sponsorship for Senior and Lead engineering positions. Would you like me to match your LinkedIn profile to our open requisitions?
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {channelTab === 'email' && (
                <div className="email-drip-mock">
                  <div className="email-drip-timeline">
                    <div className="drip-step">
                      <span className="drip-time">Trigger: Instant</span>
                      <strong>Personalized Application Receipt & Timeline Walkthrough</strong>
                    </div>
                    <div className="drip-step">
                      <span className="drip-time">+24 Hours</span>
                      <strong>Assessment Invitation with Preparation Checklist</strong>
                    </div>
                    <div className="drip-step">
                      <span className="drip-time">+48 Hours</span>
                      <strong>Friendly Reminder (Only sent if assessment incomplete)</strong>
                    </div>
                    <div className="drip-step">
                      <span className="drip-time">Stage Change</span>
                      <strong>Interview Booking Link & Team Introductions</strong>
                    </div>
                  </div>
                </div>
              )}

              {channelTab === 'schedule' && (
                <div className="calendar-booking-mock">
                  <div className="calendar-picker">
                    <h4>Select a 45-minute Interview Slot</h4>
                    <p>Synced live with Panel Availability (Google Meet / Microsoft Teams)</p>
                    <div className="slot-grid">
                      <div className="slot-pill">Thursday, Nov 19 · 10:00 AM</div>
                      <div className="slot-pill is-selected">Thursday, Nov 19 · 2:30 PM (Selected)</div>
                      <div className="slot-pill">Friday, Nov 20 · 11:15 AM</div>
                      <div className="slot-pill">Friday, Nov 20 · 4:00 PM</div>
                    </div>
                    <button type="button" className="btn btn-primary" style={{ marginTop: 16 }}>
                      Confirm Meeting & Add to Calendar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" id="capabilities">
        <div className="container">
          <SectionHead
            eyebrow="Engagement Modules"
            title="Automate candidate communications *without losing the human touch*"
            body="Review the 5 capabilities powering candidate engagement."
          />

          <div className="grid grid--2 capability-cards-grid">
            {product.capabilities.map((cap, idx) => (
              <Reveal as="article" key={cap.id} className="card capability-box" delay={idx % 2}>
                <div className="cap-badge-num">0{idx + 1}</div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 7. HIRING & OFFER MANAGEMENT EXPERIENCE
// -------------------------------------------------------------
export function OfferManagementExperience({ product }: { product: ProductData }) {
  return (
    <div className="product-custom-experience offer-experience">
      <section className="section section--light">
        <div className="container">
          <SectionHead
            eyebrow="Closing & Decision Room"
            title="Close the hire *with confidence and speed*"
            body={product.sectionIntro || product.lede}
          />

          <div className="offer-decision-room card">
            {/* Finalist Comparison Matrix */}
            <div className="finalist-matrix-wrap">
              <h4>Side-by-Side Final Candidate Evaluation</h4>
              <table className="comparison-table finalist-table">
                <thead>
                  <tr>
                    <th>Evaluation Criteria</th>
                    <th>Candidate A: Sarah Lin</th>
                    <th className="is-recommended-col">Candidate B: David Kim (Top Fit)</th>
                    <th>Candidate C: Aiko Tanaka</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Technical Assessment Score</td>
                    <td>92 / 100</td>
                    <td className="is-recommended-col"><strong>96 / 100</strong></td>
                    <td>90 / 100</td>
                  </tr>
                  <tr>
                    <td>AI Video / Speech Score</td>
                    <td>89% Clarity</td>
                    <td className="is-recommended-col"><strong>94% Clarity</strong></td>
                    <td>91% Clarity</td>
                  </tr>
                  <tr>
                    <td>Hiring Panel Recommendation</td>
                    <td>Strong Hire (4/5)</td>
                    <td className="is-recommended-col"><strong>Unanimous Hire (5/5)</strong></td>
                    <td>Hire (3/5)</td>
                  </tr>
                  <tr>
                    <td>Notice Period</td>
                    <td>60 Days</td>
                    <td className="is-recommended-col"><strong>15 Days (Immediate)</strong></td>
                    <td>30 Days</td>
                  </tr>
                  <tr>
                    <td>Expected Compensation</td>
                    <td>$160k</td>
                    <td className="is-recommended-col"><strong>$155k (Within Band)</strong></td>
                    <td>$168k</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Offer Letter Auto-Generation & Digital Signature Stamp */}
            <div className="offer-generator-preview">
              <div className="offer-doc-card">
                <div className="offer-header">
                  <span className="badge-tag">Official Offer Letter</span>
                  <span className="status-badge status-signed">✓ E-Signed via TalentPool365</span>
                </div>
                <div className="offer-letter-content">
                  <p><strong>To:</strong> David Kim</p>
                  <p><strong>Position:</strong> Senior Cloud Infrastructure Architect</p>
                  <p><strong>Base Compensation:</strong> $155,000 / annum + Stock Options & Health Benefits</p>
                  <p><strong>Joining Date:</strong> December 1, 2026</p>
                  <div className="signature-box">
                    <span className="sig-label">Digitally Signed & Timestamped:</span>
                    <strong className="sig-text">David Kim (IP: 198.51.100.42 · SHA-256 Verified)</strong>
                  </div>
                </div>
              </div>

              {/* Pre-Onboarding Checklist */}
              <div className="pre-onboard-card">
                <h4>Pre-Onboarding Checklist (Zero Drop-off)</h4>
                <ul className="checklist-items">
                  <li className="is-checked">✓ Identity & Address Verification Documents Uploaded</li>
                  <li className="is-checked">✓ Laptop & IT Equipment Provisioned by Operations</li>
                  <li className="is-checked">✓ Welcome Kit & First-Week Orientation Schedule Sent</li>
                  <li>○ Day 1 Security Badge & Gate Pass Issued</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" id="capabilities">
        <div className="container">
          <SectionHead
            eyebrow="Offer Management Modules"
            title="From final interview to first day, *all in one platform*"
            body="Review the 5 capabilities that ensure successful hiring closes."
          />

          <div className="grid grid--2 capability-cards-grid">
            {product.capabilities.map((cap, idx) => (
              <Reveal as="article" key={cap.id} className="card capability-box" delay={idx % 2}>
                <div className="cap-badge-num">0{idx + 1}</div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 8. ANALYTICS & REPORTING EXPERIENCE
// -------------------------------------------------------------
export function AnalyticsExperience({ product }: { product: ProductData }) {
  return (
    <div className="product-custom-experience analytics-experience">
      <section className="section section--light">
        <div className="container">
          <SectionHead
            eyebrow="Executive Talent Intelligence"
            title="See what’s working. *Fix what isn’t.*"
            body={product.sectionIntro || product.lede}
          />

          <div className="analytics-cockpit card">
            {/* KPI Metrics Ribbon */}
            <div className="analytics-kpi-grid">
              <div className="kpi-card">
                <span className="kpi-lbl">Median Time-to-Hire</span>
                <strong className="kpi-val">18 Days</strong>
                <span className="kpi-trend text-success">↓ 35% vs Last Quarter</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-lbl">Cost per Hire</span>
                <strong className="kpi-val">$1,420</strong>
                <span className="kpi-trend text-success">↓ 28% Agency Spend</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-lbl">Offer Acceptance Rate</span>
                <strong className="kpi-val">91.4%</strong>
                <span className="kpi-trend text-success">↑ 8.2% YoY</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-lbl">Recruiter Time Saved</span>
                <strong className="kpi-val">640 hrs</strong>
                <span className="kpi-trend text-success">Across 8 Recruiters</span>
              </div>
            </div>

            {/* Source Effectiveness & Funnel Diagnostic */}
            <div className="analytics-charts-split">
              <div className="chart-box">
                <h4>Source Effectiveness & Quality of Hire</h4>
                <div className="source-bars-list">
                  <div className="source-bar-item">
                    <div className="bar-labels">
                      <span>TalentPool365 AI Discovery</span>
                      <strong>92% Conversion</strong>
                    </div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '92%' }} /></div>
                  </div>
                  <div className="source-bar-item">
                    <div className="bar-labels">
                      <span>Internal Talent Pools</span>
                      <strong>88% Conversion</strong>
                    </div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '88%' }} /></div>
                  </div>
                  <div className="source-bar-item">
                    <div className="bar-labels">
                      <span>Employee Referrals</span>
                      <strong>84% Conversion</strong>
                    </div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '84%' }} /></div>
                  </div>
                  <div className="source-bar-item">
                    <div className="bar-labels">
                      <span>Traditional Job Boards</span>
                      <strong>42% Conversion</strong>
                    </div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '42%', background: '#f59e0b' }} /></div>
                  </div>
                </div>
              </div>

              <div className="chart-box">
                <h4>Recruitment Funnel Dwell Time & Drop-Off</h4>
                <div className="funnel-steps-list">
                  <div className="funnel-step-row">
                    <span className="f-stage">1. Sourced & Applied (1,240)</span>
                    <span className="f-stat">Avg. 12 hrs</span>
                  </div>
                  <div className="funnel-step-row">
                    <span className="f-stage">2. AI Screening & Shortlisted (320)</span>
                    <span className="f-stat">Avg. 24 hrs</span>
                  </div>
                  <div className="funnel-step-row">
                    <span className="f-stage">3. Assessments Completed (110)</span>
                    <span className="f-stat">Avg. 2.1 days</span>
                  </div>
                  <div className="funnel-step-row">
                    <span className="f-stage">4. Panel Interviews (34)</span>
                    <span className="f-stat">Avg. 3.4 days</span>
                  </div>
                  <div className="funnel-step-row is-hired-row">
                    <span className="f-stage">5. Signed Hires (12)</span>
                    <span className="f-stat">Offer signed in 1.8 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" id="capabilities">
        <div className="container">
          <SectionHead
            eyebrow="Analytics Capabilities"
            title="Make every hiring decision *a data-backed one*"
            body="Review the 5 reporting capabilities built into TalentPool365."
          />

          <div className="grid grid--2 capability-cards-grid">
            {product.capabilities.map((cap, idx) => (
              <Reveal as="article" key={cap.id} className="card capability-box" delay={idx % 2}>
                <div className="cap-badge-num">0{idx + 1}</div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 9. COMPLIANCE & SECURITY EXPERIENCE
// -------------------------------------------------------------
export function ComplianceExperience({ product }: { product: ProductData }) {
  return (
    <div className="product-custom-experience compliance-experience">
      <section className="section section--light">
        <div className="container">
          <SectionHead
            eyebrow="Enterprise Trust Vault"
            title="Hire with confidence. *Your data is protected.*"
            body={product.sectionIntro || product.lede}
          />

          <div className="compliance-vault card">
            <div className="vault-badges-grid">
              <div className="vault-badge-item">
                <span className="vault-icon"><Icon name="shield" /></span>
                <strong>GDPR & DPDP Compliant</strong>
                <p>Full consent tracking, data retention policies and right-to-erasure workflows.</p>
              </div>
              <div className="vault-badge-item">
                <span className="vault-icon"><Icon name="file-check" /></span>
                <strong>Cryptographic Audit Trails</strong>
                <p>Immutable logging of all candidate reviews, score adjustments, and user decisions.</p>
              </div>
              <div className="vault-badge-item">
                <span className="vault-icon"><Icon name="users" /></span>
                <strong>Fair Hiring AI & Anti-Bias</strong>
                <p>Algorithms audited against demographic bias; explainable scores with human oversight.</p>
              </div>
              <div className="vault-badge-item">
                <span className="vault-icon"><Icon name="building" /></span>
                <strong>Enterprise Security Controls</strong>
                <p>SOC 2 Type II alignment, 256-bit AES encryption, MFA, and granular role permissions.</p>
              </div>
            </div>

            {/* Live Audit Trail Log View */}
            <div className="audit-log-terminal">
              <div className="audit-top">
                <span>Immutable Security Audit Log (Last 4 Events)</span>
                <span className="live-pill">Live Monitoring</span>
              </div>
              <div className="audit-entries">
                <div className="audit-row">
                  <span className="log-time">14:22:08 UTC</span>
                  <span className="log-user">user_recruiter_04</span>
                  <span className="log-event">Consent Logged: Candidate #94821 agreed to WhatsApp updates</span>
                  <span className="log-hash">sha256:8b4e...a91f</span>
                </div>
                <div className="audit-row">
                  <span className="log-time">13:45:19 UTC</span>
                  <span className="log-user">system_ai_model</span>
                  <span className="log-event">Fair Screening Completed: 142 resumes parsed (Demographic proxy check passed)</span>
                  <span className="log-hash">sha256:7c1a...e822</span>
                </div>
                <div className="audit-row">
                  <span className="log-time">11:02:44 UTC</span>
                  <span className="log-user">user_hiring_mgr</span>
                  <span className="log-event">Offer Approved: Candidate #94801 approved for release by VP</span>
                  <span className="log-hash">sha256:4f99...b014</span>
                </div>
                <div className="audit-row">
                  <span className="log-time">09:15:30 UTC</span>
                  <span className="log-user">user_compliance_admin</span>
                  <span className="log-event">Data Retention Policy Executed: 312 expired profiles anonymized</span>
                  <span className="log-hash">sha256:1a82...d774</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" id="capabilities">
        <div className="container">
          <SectionHead
            eyebrow="Trust & Governance Modules"
            title="Enterprise protection for *your candidate data*"
            body="Review the 5 compliance controls built into the platform."
          />

          <div className="grid grid--2 capability-cards-grid">
            {product.capabilities.map((cap, idx) => (
              <Reveal as="article" key={cap.id} className="card capability-box" delay={idx % 2}>
                <div className="cap-badge-num">0{idx + 1}</div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}