import { useRef, useState, type CSSProperties } from 'react';
import type { ProductPage as ProductData } from '../data/products';
import { CinematicCard, useScrollProgressTrack } from './CinematicMotion';
import { Icon } from './Icon';
import { SectionHead } from './SectionHead';

// -------------------------------------------------------------
// 1. TALENT SOURCING EXPERIENCE (SEEKOUT RECRUIT DESIGN)
// Reference: https://www.seekout.com/solutions/recruit/
// -------------------------------------------------------------
export function SourcingExperience({ product }: { product: ProductData }) {
  void product;
  const [activePreset, setActivePreset] = useState<string>('react');
  const [activeSource, setActiveSource] = useState<'all' | 'db' | 'boards' | 'social' | 'pools'>('all');
  const [biasReducer, setBiasReducer] = useState<boolean>(false);

  const presets: Record<string, { query: string; role: string; skills: string[]; location: string }> = {
    react: {
      query: 'Senior React Developer, 4+ years, Bengaluru (Notice < 30 days)',
      role: 'Senior Frontend Engineer',
      skills: ['React', 'TypeScript', 'Next.js', 'Redux', 'System Design'],
      location: 'Bengaluru / Hybrid',
    },
    cloud: {
      query: 'Staff DevOps & Cloud Architect with Kubernetes & Terraform',
      role: 'Staff DevOps Architect',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
      location: 'Remote / Bengaluru',
    },
    nurse: {
      query: 'ICU Specialist Nurse with ACLS/BLS and state clinical license',
      role: 'Critical Care Staff Nurse',
      skills: ['ICU Protocol', 'BLS / ACLS', 'Patient Triage', 'State RN License'],
      location: 'Metro Hospitals',
    },
  };

  const sampleCandidates = [
    {
      name: biasReducer ? 'Candidate #89201' : 'Aiko Tanaka',
      title: 'Senior Frontend Engineer',
      company: biasReducer ? '[Current Top Tech Employer]' : 'FinTech Labs Global',
      exp: '5.5 yrs',
      location: 'Bengaluru, India',
      source: 'Resume Database (Archive)',
      score: 96,
      avatar: 'AT',
      skills: ['React', 'TypeScript', 'Next.js', 'State Management'],
      tag: 'Rediscovered Silver Medalist',
      githubStats: '48 Repos · Top 5% TS Contributor',
      patent: 'Co-inventor: Real-time Data Streaming UI',
    },
    {
      name: biasReducer ? 'Candidate #89202' : 'Daniel Okafor',
      title: 'Staff UI Systems Architect',
      company: biasReducer ? '[Leading E-Commerce Platform]' : 'OmniScale Commerce',
      exp: '6.2 yrs',
      location: 'Bengaluru / Hybrid',
      source: 'LinkedIn & Social',
      score: 93,
      avatar: 'DO',
      skills: ['React', 'GraphQL', 'AWS Microservices', 'Micro-frontends'],
      tag: 'Passive Candidate (Not actively applying)',
      githubStats: '12 Stars · 140 PRs merged',
      patent: 'Published: Distributed Design Tokens',
    },
    {
      name: biasReducer ? 'Candidate #89203' : 'Sofia Marin',
      title: 'Frontend Developer (UI/UX Specialist)',
      company: biasReducer ? '[Healthcare Tech Venture]' : 'CareCloud Health',
      exp: '4.0 yrs',
      location: 'Bengaluru / Remote',
      source: 'Job Board Integration',
      score: 89,
      avatar: 'SM',
      skills: ['React', 'JavaScript (ES6+)', 'TailwindCSS', 'Jest'],
      tag: 'Applicant (Applied 2h ago)',
      githubStats: 'Active OSS Maintainer',
      patent: 'Certified: Web Accessibility (WCAG 2.1)',
    },
  ];

  return (
    <div className="seekout-recruit-page">
      {/* 1. Seekout-Style Hero Section with Interactive Live Search Console */}
      <section className="seekout-hero-section">
        <div className="container">
          <div className="seekout-hero-header">
            <span className="seekout-eyebrow-pill">
              <Icon name="search" /> SEEKOUT SOURCING · AGENTIC AI RECRUITING
            </span>
            <h1 className="seekout-hero-title">
              Find the right candidates <span className="text-highlight">before your competitors do.</span>
            </h1>
            <p className="seekout-hero-subtitle">
              TalentPool365 searches your resume database, job boards, and social networks at the same time.
              It ranks the best-fit people so your team spends time talking to candidates instead of hunting for them.
            </p>
            <div className="seekout-hero-ctas">
              <a className="btn btn-primary btn-lg" href="/get-started#book-meeting">
                Book a Live Demo
              </a>
              <a className="btn btn-outline btn-lg" href="/get-started#start-free-trial">
                Start Free Trial
              </a>
              <span className="cta-note">No credit card required · Full ATS sync in 15 mins</span>
            </div>
          </div>

          {/* SeekOut Search Console Interactive Visual */}
          <div className="seekout-console card">
            <div className="console-topbar">
              <div className="console-agent-status">
                <span className="pulsing-green-dot" />
                <strong>AI Sourcing Agent Active:</strong> Scanning 1B+ global profiles and your ATS archive
              </div>
              <div className="console-toggle-bias">
                <label className="toggle-switch-label">
                  <input
                    type="checkbox"
                    checked={biasReducer}
                    onChange={(e) => setBiasReducer(e.target.checked)}
                  />
                  <span>Bias-Reducer Mode (Blind Screening)</span>
                </label>
              </div>
            </div>

            {/* Natural Language Prompt & Presets Bar */}
            <div className="console-search-box">
              <span className="search-symbol"><Icon name="search" /></span>
              <input
                type="text"
                value={presets[activePreset].query}
                readOnly
                className="console-search-input"
                aria-label="Target search query"
              />
              <button type="button" className="btn btn-primary btn-sm">
                Search 1B+ Profiles
              </button>
            </div>

            {/* Quick Preset Queries */}
            <div className="console-preset-chips">
              <span className="preset-label">Example Role Rubrics:</span>
              <button
                type="button"
                className={`preset-pill${activePreset === 'react' ? ' is-active' : ''}`}
                onClick={() => setActivePreset('react')}
              >
                Senior React Engineer (Bengaluru)
              </button>
              <button
                type="button"
                className={`preset-pill${activePreset === 'cloud' ? ' is-active' : ''}`}
                onClick={() => setActivePreset('cloud')}
              >
                Staff DevOps & Cloud Architect
              </button>
              <button
                type="button"
                className={`preset-pill${activePreset === 'nurse' ? ' is-active' : ''}`}
                onClick={() => setActivePreset('nurse')}
              >
                Certified Critical Care Nurse
              </button>
            </div>

            {/* Channel Source Filter Bar */}
            <div className="console-channels-bar">
              <span className="channels-title">Integrated Intake Channels:</span>
              <div className="channel-filter-pills">
                <button
                  type="button"
                  className={`chan-pill${activeSource === 'all' ? ' is-active' : ''}`}
                  onClick={() => setActiveSource('all')}
                >
                  All Channels (1,420 Found)
                </button>
                <button
                  type="button"
                  className={`chan-pill${activeSource === 'db' ? ' is-active' : ''}`}
                  onClick={() => setActiveSource('db')}
                >
                  ATS & Resume Archive (312)
                </button>
                <button
                  type="button"
                  className={`chan-pill${activeSource === 'social' ? ' is-active' : ''}`}
                  onClick={() => setActiveSource('social')}
                >
                  LinkedIn & GitHub (840)
                </button>
                <button
                  type="button"
                  className={`chan-pill${activeSource === 'boards' ? ' is-active' : ''}`}
                  onClick={() => setActiveSource('boards')}
                >
                  Job Boards (Indeed/Naukri: 268)
                </button>
              </div>
            </div>

            {/* Candidates Live Match Stream */}
            <div className="console-candidates-list">
              {sampleCandidates.map((cand) => (
                <div key={cand.name} className="seekout-candidate-row">
                  <div className="cand-avatar-col">
                    <div className="cand-circle-avatar">{biasReducer ? '?' : cand.avatar}</div>
                  </div>

                  <div className="cand-info-col">
                    <div className="cand-title-line">
                      <h3>{cand.name}</h3>
                      <span className="source-tag">{cand.source}</span>
                      <span className="status-tag">{cand.tag}</span>
                    </div>
                    <p className="cand-subtitle">
                      {cand.title} · <strong>{cand.company}</strong> · {cand.exp} · {cand.location}
                    </p>

                    <div className="cand-skills-row">
                      {cand.skills.map((s) => (
                        <span key={s} className="verified-skill-badge">
                          ✓ {s}
                        </span>
                      ))}
                    </div>

                    <div className="cand-intel-row">
                      <span className="intel-pill"><Icon name="cpu" /> {cand.githubStats}</span>
                      <span className="intel-pill"><Icon name="shield" /> {cand.patent}</span>
                    </div>
                  </div>

                  <div className="cand-actions-col">
                    <div className="match-score-badge">
                      <strong>{cand.score}%</strong>
                      <span>Smart Match</span>
                    </div>
                    <button type="button" className="btn btn-outline btn-sm">
                      1-Click Outreach
                    </button>
                    <button type="button" className="btn btn-text btn-xs">
                      Clone Candidate Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Enterprise Social Proof / Logo Bar */}
      <section className="seekout-logos-section">
        <div className="container">
          <p className="logos-lead">
            TRUSTED BY TALENT ACQUISITION TEAMS AT WORLD-CLASS ENTERPRISES
          </p>
          <div className="seekout-logos-grid">
            <div className="logo-item">SALESFORCE</div>
            <div className="logo-item">MERCK & CO</div>
            <div className="logo-item">VMWARE</div>
            <div className="logo-item">UIPATH</div>
            <div className="logo-item">SIEMENS HEALTH</div>
            <div className="logo-item">LOCKHEED MARTIN</div>
          </div>
        </div>
      </section>

      {/* 3. Results & Impact Metrics Banner */}
      <section className="seekout-stats-section">
        <div className="container">
          <div className="seekout-stats-grid">
            <div className="seekout-stat-card">
              <strong className="stat-number">10×</strong>
              <span className="stat-title">Faster Search Across Pools</span>
              <p>Natural-language search scans dormant ATS archives and external networks simultaneously.</p>
            </div>
            <div className="seekout-stat-card">
              <strong className="stat-number">4.2×</strong>
              <span className="stat-title">Higher Outreach Response</span>
              <p>Personalized AI emails tailored to candidate code repositories, publications and background.</p>
            </div>
            <div className="seekout-stat-card">
              <strong className="stat-number">68%</strong>
              <span className="stat-title">Less Passive Sourcing Time</span>
              <p>Eliminate manual Boolean string crafting with automatic semantic skill expansion.</p>
            </div>
            <div className="seekout-stat-card">
              <strong className="stat-number">1B+</strong>
              <span className="stat-title">Talent Pool Profiles</span>
              <p>Global professional records, GitHub engineering data, clinical registries and publications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Alternating Editorial Feature Bands (SeekOut Recruit Exact Design) */}
      <div id="capabilities">
        {/* Band 1 (Warm Cream): Workspaces */}
        <section className="so-band so-band--cream">
          <div className="container">
            <div className="so-split">
              <div className="so-copy">
                <span className="so-pill-eyebrow">IN TALENTPOOL365 SOURCING</span>
                <h2 className="so-serif-title">Workspaces: AI-Powered Hiring Command Center</h2>
                <p className="so-body">
                  Unlock the power of AI with intuitive workflows to hire faster. From a simple job
                  description, Workspaces uses AI to instantly generate search criteria, recommend
                  profile matches, and personalize multi-step outreach.
                </p>
                <ul className="so-checklist">
                  <li>AI generates search from job descriptions</li>
                  <li>Smart profile matching and recommendations</li>
                  <li>Personalized outreach sequences</li>
                  <li>Full control over decisions and pipeline</li>
                </ul>
              </div>

              <div className="so-visual">
                <div className="so-mac-window">
                  <div className="so-mac-topbar">
                    <div className="so-mac-dots" aria-hidden="true">
                      <span className="dot-red" />
                      <span className="dot-yellow" />
                      <span className="dot-green" />
                    </div>
                    <span className="so-mac-title">Workspaces</span>
                  </div>
                  <div className="so-mac-body so-mac-body--padded">
                    <div className="so-ws-kpis">
                      <div className="so-ws-kpi">
                        <strong>12</strong>
                        <span>Active Workspaces</span>
                      </div>
                      <div className="so-ws-kpi">
                        <strong>847</strong>
                        <span>Candidates in Pipeline</span>
                      </div>
                    </div>

                    <div className="so-ws-meters">
                      <div className="so-meter-row">
                        <div className="so-meter-head">
                          <span>Pipeline Progress</span>
                          <strong>72%</strong>
                        </div>
                        <div className="so-meter-track">
                          <div className="so-meter-fill" style={{ width: '72%' }} />
                        </div>
                      </div>
                      <div className="so-meter-row">
                        <div className="so-meter-head">
                          <span>Response Rate</span>
                          <strong>34%</strong>
                        </div>
                        <div className="so-meter-track">
                          <div className="so-meter-fill so-meter-fill--soft" style={{ width: '34%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Band 2 (White): Job-Specific Workflows */}
        <section className="so-band so-band--white">
          <div className="container">
            <div className="so-split">
              <div className="so-copy">
                <h2 className="so-serif-title">Job-Specific Workflows</h2>
                <p className="so-body">
                  Create role-specific workflows with AI-assisted search, automated rubrics, and smart
                  shortlisting. Go from job description to qualified candidates faster.
                </p>
                <ul className="so-checklist">
                  <li>AI generates search criteria from JD</li>
                  <li>Automated candidate scoring rubrics</li>
                  <li>Built-in recruiting best practices</li>
                </ul>
              </div>

              <div className="so-visual">
                <div className="so-mac-window">
                  <div className="so-mac-topbar">
                    <div className="so-mac-dots" aria-hidden="true">
                      <span className="dot-red" />
                      <span className="dot-yellow" />
                      <span className="dot-green" />
                    </div>
                    <span className="so-mac-title">Job Workflow: Sr. Engineer</span>
                  </div>
                  <div className="so-workflow-frame">
                    <div className="so-wf-sidebar" aria-hidden="true">
                      <span className="so-wf-nav-btn is-active">
                        <Icon name="clipboard-check" />
                      </span>
                      <span className="so-wf-nav-btn">
                        <Icon name="users" />
                      </span>
                      <span className="so-wf-nav-btn">
                        <Icon name="chat" />
                      </span>
                    </div>
                    <div className="so-wf-main">
                      <div className="so-wf-header">
                        <strong>Candidate Pipeline</strong>
                        <span>24 candidates</span>
                      </div>
                      <div className="so-wf-columns">
                        <div className="so-wf-col so-wf-col--cream">
                          <div className="so-wf-col-head">
                            <span>Sourced</span>
                            <span className="so-wf-badge">12</span>
                          </div>
                          <div className="so-wf-skeleton" />
                          <div className="so-wf-skeleton" />
                          <div className="so-wf-skeleton" />
                        </div>
                        <div className="so-wf-col so-wf-col--cream">
                          <div className="so-wf-col-head">
                            <span>Screened</span>
                            <span className="so-wf-badge">8</span>
                          </div>
                          <div className="so-wf-skeleton" />
                          <div className="so-wf-skeleton" />
                        </div>
                        <div className="so-wf-col so-wf-col--gray">
                          <div className="so-wf-col-head">
                            <span>Interview</span>
                            <span className="so-wf-badge">4</span>
                          </div>
                          <div className="so-wf-skeleton" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Band 3 (Warm Cream, Reversed): Intelligent Search */}
        <section className="so-band so-band--cream">
          <div className="container">
            <div className="so-split so-split--reverse">
              <div className="so-copy">
                <h2 className="so-serif-title">Intelligent Search</h2>
                <p className="so-body">
                  Go beyond keywords to find hidden talent others miss. Search 1B+ profiles across
                  external sources and your ATS with AI that understands context, not just terms.
                </p>
                <ul className="so-checklist">
                  <li>Semantic search understands intent</li>
                  <li>30+ smart filters for precise targeting</li>
                  <li>Unified search across all talent pools</li>
                </ul>
              </div>

              <div className="so-visual">
                <div className="so-mac-window">
                  <div className="so-mac-topbar">
                    <div className="so-mac-dots" aria-hidden="true">
                      <span className="dot-red" />
                      <span className="dot-yellow" />
                      <span className="dot-green" />
                    </div>
                    <span className="so-mac-title">Talent Search</span>
                  </div>
                  <div className="so-mac-body so-mac-body--padded">
                    <div className="so-search-bar-mock">
                      <Icon name="search" />
                      <span>Senior ML Engineer, Python, TensorFlow...</span>
                    </div>
                    <div className="so-filter-chips-mock">
                      <span className="so-chip is-active">AI/ML</span>
                      <span className="so-chip">5+ years</span>
                      <span className="so-chip">Remote</span>
                      <span className="so-chip">+12 filters</span>
                    </div>
                    <p className="so-results-count">1,247 candidates found</p>
                    <div className="so-mini-candidates">
                      <div className="so-mini-cand">
                        <span className="so-mini-avatar so-mini-avatar--dark">JL</span>
                        <div className="so-mini-meta">
                          <strong>Jennifer L.</strong>
                          <span>ML Engineer @ Google</span>
                        </div>
                        <span className="so-mini-score">95%</span>
                      </div>
                      <div className="so-mini-cand">
                        <span className="so-mini-avatar so-mini-avatar--mid">MK</span>
                        <div className="so-mini-meta">
                          <strong>Marcus K.</strong>
                          <span>Senior AI Researcher @ Meta</span>
                        </div>
                        <span className="so-mini-score">92%</span>
                      </div>
                      <div className="so-mini-cand">
                        <span className="so-mini-avatar so-mini-avatar--slate">SP</span>
                        <div className="so-mini-meta">
                          <strong>Sarah P.</strong>
                          <span>Staff Engineer @ Netflix</span>
                        </div>
                        <span className="so-mini-score">89%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Band 4 (White): Applicant Evaluation */}
        <section className="so-band so-band--white">
          <div className="container">
            <div className="so-split">
              <div className="so-copy">
                <h2 className="so-serif-title">Applicant Evaluation</h2>
                <p className="so-body">
                  Process thousands of inbound applicants in hours, not weeks. AI evaluates candidates
                  against your criteria and delivers qualified shortlists so you focus on the best.{' '}
                  <a className="so-inline-link" href="/products/candidate-screening">
                    See TalentPool365 Applicant Evaluation &amp; AI Screening.
                  </a>
                </p>
                <ul className="so-checklist">
                  <li>Automatically score and rank applicants</li>
                  <li>Filter out unqualified candidates instantly</li>
                  <li>Surface hidden gems you might have missed</li>
                </ul>
              </div>

              <div className="so-visual">
                <div className="so-mac-window">
                  <div className="so-mac-topbar">
                    <div className="so-mac-dots" aria-hidden="true">
                      <span className="dot-red" />
                      <span className="dot-yellow" />
                      <span className="dot-green" />
                    </div>
                    <span className="so-mac-title">AI Video Screening</span>
                  </div>
                  <div className="so-mac-body so-mac-body--padded">
                    <div className="so-eval-grid">
                      <div className="so-video-panel">
                        <div className="so-video-avatar">
                          <Icon name="users" />
                        </div>
                        <span className="so-recording-pill">
                          <span className="rec-dot" /> Recording
                        </span>
                      </div>
                      <div className="so-eval-scores">
                        <strong className="so-eval-heading">AI Evaluation</strong>
                        <div className="so-score-bar-row">
                          <span>Communication</span>
                          <div className="so-score-track">
                            <div className="so-score-fill" style={{ width: '85%' }} />
                          </div>
                          <strong>85</strong>
                        </div>
                        <div className="so-score-bar-row">
                          <span>Technical Depth</span>
                          <div className="so-score-track">
                            <div className="so-score-fill" style={{ width: '92%' }} />
                          </div>
                          <strong>92</strong>
                        </div>
                        <div className="so-score-bar-row">
                          <span>Problem Solving</span>
                          <div className="so-score-track">
                            <div className="so-score-fill" style={{ width: '78%' }} />
                          </div>
                          <strong>78</strong>
                        </div>
                        <div className="so-overall-match">
                          <span>Overall Match</span>
                          <strong>88%</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. SeekOut Specialized Niche Talent Pools */}
      <section className="seekout-niche-section">
        <div className="container">
          <SectionHead
            eyebrow="Specialized Niche Sourcing"
            title="Deep intelligence for *hard-to-fill positions*"
            body="Traditional search engines only scratch the surface. TalentPool365 unlocks deep data across engineering, healthcare, and diversity pipelines."
          />

          <div className="seekout-niche-grid">
            <div className="niche-card">
              <span className="niche-icon"><Icon name="cpu" /></span>
              <h3>GitHub & Tech Talent</h3>
              <p>Analyze public repositories, languages, code contributions, and technical papers to verify real engineering proficiency.</p>
            </div>
            <div className="niche-card">
              <span className="niche-icon"><Icon name="pulse" /></span>
              <h3>Healthcare & Clinical Staff</h3>
              <p>Source verified RNs, doctors, and specialists with automatic credential tracking, state nursing licenses, and shift filters.</p>
            </div>
            <div className="niche-card">
              <span className="niche-icon"><Icon name="shield" /></span>
              <h3>Diversity & Bias-Reducer</h3>
              <p>1-click blind sourcing hides candidate names, photos, gender, and school pedigree to build inclusive, merit-based candidate slates.</p>
            </div>
            <div className="niche-card">
              <span className="niche-icon"><Icon name="building" /></span>
              <h3>Two-Way ATS Sync</h3>
              <p>Continuous bidirectional integration with Workday, Greenhouse, Lever, and SAP SuccessFactors. Never double-enter a record.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Traditional Boolean Search vs. Seekout/TalentPool365 AI Sourcing */}
      <section className="seekout-comparison-section">
        <div className="container">
          <SectionHead
            eyebrow="Why Leading Teams Switch"
            title="Traditional Boolean Search *vs. Agentic AI Sourcing*"
            body="See why recruiting teams waste 20+ hours weekly on keyword search strings that modern AI solves in seconds."
          />

          <div className="comparison-table-wrap">
            <table className="comparison-table seekout-compare-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Sourcing Capability</th>
                  <th style={{ width: '35%' }} className="text-muted">Legacy Boolean & Job Boards</th>
                  <th style={{ width: '35%' }} className="is-popular-col">TalentPool365 Agentic Sourcing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Search Methodology</strong></td>
                  <td>Brittle keyword syntax (AND, OR, NOT) that misses synonyms and context</td>
                  <td className="is-popular-col"><strong>Natural Language Semantic AI</strong> that understands skills and project depth</td>
                </tr>
                <tr>
                  <td><strong>Talent Pool Coverage</strong></td>
                  <td>Fragmented: Job board active applicants only</td>
                  <td className="is-popular-col"><strong>Unified 1B+ Profiles</strong> (ATS archive + LinkedIn + GitHub + Boards)</td>
                </tr>
                <tr>
                  <td><strong>Outreach Engagement</strong></td>
                  <td>Generic cold copy-pasted inmails with &lt;15% response rates</td>
                  <td className="is-popular-col"><strong>Hyper-Personalized AI Sequences</strong> citing candidate work (4.2× higher replies)</td>
                </tr>
                <tr>
                  <td><strong>Applicant Rediscovery</strong></td>
                  <td>Old ATS resumes sit forgotten in a digital graveyard</td>
                  <td className="is-popular-col"><strong>Instant Rediscovery:</strong> Past silver medalists ranked first for new roles</td>
                </tr>
                <tr>
                  <td><strong>Bias Mitigation</strong></td>
                  <td>Manual screening prone to unconscious name/school bias</td>
                  <td className="is-popular-col"><strong>Built-in Bias Reducer Mode</strong> for objective, merit-first evaluation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Customer Testimonial Quote */}
      <section className="seekout-quote-section">
        <div className="container">
          <div className="seekout-quote-box">
            <blockquote>
              “TalentPool365 gives us the speed and intelligence of a 20-person sourcing team.
              We slashed our time-to-shortlist from two weeks down to 48 hours, and our recruiters
              spend their days engaging top talent rather than fighting complex Boolean strings.”
            </blockquote>
            <cite>
              <strong>Elena Rostova</strong>
              <span>VP of Global Talent Acquisition · Enterprise Cloud Solutions</span>
            </cite>
          </div>
        </div>
      </section>

      {/* 8. SeekOut Closing Call to Action */}
      <section className="seekout-bottom-cta">
        <div className="container">
          <div className="seekout-cta-content">
            <h2>Build a talent pipeline that never runs dry.</h2>
            <p>Start sourcing smarter with TalentPool365 today.</p>
            <div className="cta-button-group">
              <a className="btn btn-primary btn-lg" href="/get-started#book-meeting">
                Book a Demo
              </a>
              <a className="btn btn-outline btn-lg" href="/get-started#start-free-trial">
                Start Free Trial
              </a>
            </div>
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

          {/* 1. Candidate Screening — Stacked Pipeline Deck */}
          <div className="ux-screen-deck">
            {product.capabilities.map((cap, idx) => {
              const score = [96, 94, 91, 89, 87][idx % 5];
              return (
                <CinematicCard
                  key={cap.id}
                  id={cap.id}
                  variant={idx % 2 === 0 ? 'left' : 'right'}
                  delay={idx}
                  className={`ux-screen-row${idx % 2 === 1 ? ' ux-screen-row--cream' : ''}`}
                >
                  <div className="ux-screen-step">0{idx + 1}</div>
                  <div className="ux-screen-main">
                    <h3>{cap.title}</h3>
                    {cap.tagline && <p className="ux-screen-tagline">{cap.tagline}</p>}
                    <p>{cap.body}</p>
                  </div>
                  <div className="ux-screen-meter-box">
                    <div className="ux-screen-meter-head">
                      <span>Screening Signal</span>
                      <span>{score}% Match</span>
                    </div>
                    <div className="ux-screen-bar">
                      <i style={{ width: `${score}%` }} />
                    </div>
                    <ul className="ticks">
                      {cap.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </CinematicCard>
              );
            })}
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

          {/* 2. AI Assessments — Asymmetric Bento Matrix */}
          <div className="ux-assess-bento">
            {product.capabilities.map((cap, idx) => (
              <CinematicCard
                key={cap.id}
                id={cap.id}
                variant="zoom"
                delay={idx}
                className={`ux-assess-card${idx === 0 ? ' ux-assess-card--featured' : ''}`}
              >
                <div>
                  <span className="ux-assess-medallion" style={{ marginBottom: 12 }}>
                    0{idx + 1}
                  </span>
                  <h3>{cap.title}</h3>
                  {cap.tagline && (
                    <p style={{ fontWeight: 600, color: idx === 0 ? '#BEE8D5' : '#146E63', margin: '0 0 8px' }}>
                      {cap.tagline}
                    </p>
                  )}
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{cap.body}</p>
                </div>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </CinematicCard>
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
  const reelRef = useRef<HTMLDivElement>(null);
  useScrollProgressTrack(reelRef);

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

          {/* 3. AI Interviews — Scroll-Lit Vertical Timeline Reel */}
          <div className="ux-interview-reel" ref={reelRef}>
            {product.capabilities.map((cap, idx) => (
              <CinematicCard
                key={cap.id}
                id={cap.id}
                variant="left"
                delay={idx}
                className="ux-interview-card"
              >
                <span className="ux-interview-node">{idx + 1}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <h3 style={{ margin: 0 }}>{cap.title}</h3>
                  <span className="sk-pill-tag" style={{ marginBottom: 0 }}>Rubric Stage 0{idx + 1}</span>
                </div>
                {cap.tagline && <p className="cap-tagline">{cap.tagline}</p>}
                <p className="cap-body">{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </CinematicCard>
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

          {/* 4. Recruiter Workspace — Kanban Command Columns */}
          <div className="ux-kanban-grid">
            {product.capabilities.map((cap, idx) => {
              const colors = ['#146E63', '#FF7A00', '#0EA5E9', '#8B5CF6', '#10B981'];
              return (
                <CinematicCard
                  key={cap.id}
                  id={cap.id}
                  variant="up"
                  delay={idx}
                  className="ux-kanban-col"
                  style={{ '--col-accent': colors[idx % colors.length] } as CSSProperties}
                >
                  <div className="ux-kanban-bar">
                    <span className="ux-kanban-dots" aria-hidden="true"><i /><i /><i /></span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>COLUMN 0{idx + 1}</span>
                  </div>
                  <div className="ux-kanban-body">
                    <h3 style={{ margin: 0 }}>{cap.title}</h3>
                    {cap.tagline && <p className="cap-tagline" style={{ margin: 0 }}>{cap.tagline}</p>}
                    <p className="cap-body" style={{ margin: 0 }}>{cap.body}</p>
                    <ul className="ticks" style={{ marginTop: 'auto', paddingTop: 8 }}>
                      {cap.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </CinematicCard>
              );
            })}
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

          {/* 5. Candidate Engagement — Conversational Speech Bubble Cards */}
          <div className="ux-chat-cards">
            {product.capabilities.map((cap, idx) => (
              <CinematicCard
                key={cap.id}
                id={cap.id}
                variant={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx}
                className={`ux-chat-bubble${idx % 2 === 1 ? ' ux-chat-bubble--right' : ''}`}
              >
                <div className="ux-chat-status">
                  <span>{idx % 2 === 0 ? 'WhatsApp Channel' : 'Email & Calendar'}</span>
                  <span>✓✓ Delivered · Read</span>
                </div>
                <h3 style={{ margin: '0 0 6px' }}>{cap.title}</h3>
                {cap.tagline && <p className="cap-tagline" style={{ margin: '0 0 8px' }}>{cap.tagline}</p>}
                <p className="cap-body" style={{ margin: '0 0 12px' }}>{cap.body}</p>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </CinematicCard>
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

          {/* 6. Hiring & Offer Management — Executive Document Folio Stack */}
          <div className="ux-offer-stack">
            {product.capabilities.map((cap, idx) => {
              const seals = ['APPROVED', 'E-SIGNED', 'VERIFIED', 'HANDOVER', 'AUDIT-READY'];
              return (
                <CinematicCard
                  key={cap.id}
                  id={cap.id}
                  variant="zoom"
                  delay={idx}
                  className="ux-offer-folio"
                >
                  <span className="ux-offer-seal">
                    <Icon name="file-check" /> {seals[idx % seals.length]}
                  </span>
                  <h3>{cap.title}</h3>
                  {cap.tagline && <p className="cap-tagline" style={{ margin: 0 }}>{cap.tagline}</p>}
                  <p className="cap-body" style={{ margin: 0 }}>{cap.body}</p>
                  <ul className="ticks">
                    {cap.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <div className="ux-offer-signline">
                    <span>Document Folio #{idx + 1}</span>
                    <span>TalentPool365 Sign-Off</span>
                  </div>
                </CinematicCard>
              );
            })}
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

          {/* 7. Analytics & Reporting — Dark-Glass Telemetry Tiles */}
          <div className="ux-analytics-tiles">
            {product.capabilities.map((cap, idx) => (
              <CinematicCard
                key={cap.id}
                id={cap.id}
                variant="up"
                delay={idx}
                className="ux-telemetry-tile"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="sk-pill-tag" style={{ marginBottom: 0 }}>KPI TELEMETRY 0{idx + 1}</span>
                  <span style={{ color: '#34D399', fontSize: '0.78rem', fontWeight: 700 }}>LIVE SYNC</span>
                </div>
                <h3>{cap.title}</h3>
                {cap.tagline && <p style={{ color: '#BEE8D5', fontWeight: 600 }}>{cap.tagline}</p>}
                <p>{cap.body}</p>
                <svg className="ux-sparkline" viewBox="0 0 260 46" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d={idx % 2 === 0 ? 'M0 38 C40 34, 70 18, 120 22 C170 26, 200 10, 260 6' : 'M0 34 C50 28, 90 36, 140 18 C180 6, 220 14, 260 8'}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="2.2"
                  />
                </svg>
                <ul className="ticks">
                  {cap.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </CinematicCard>
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

          {/* 8. Compliance & Security — Audit Vault Ledger Rows */}
          <div className="ux-vault-rows">
            {product.capabilities.map((cap, idx) => {
              const stamps = ['GDPR READY', 'SOC 2 TYPE II', 'FAIR AI AUDIT', 'AES-256 VAULT', 'RBAC CONTROL'];
              return (
                <CinematicCard
                  key={cap.id}
                  id={cap.id}
                  variant="left"
                  delay={idx}
                  className="ux-vault-row"
                >
                  <div className="ux-vault-shield">
                    <Icon name="shield" />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px' }}>{cap.title}</h3>
                    {cap.tagline && <p className="cap-tagline" style={{ margin: '0 0 6px' }}>{cap.tagline}</p>}
                    <p className="cap-body" style={{ margin: '0 0 10px' }}>{cap.body}</p>
                    <ul className="ticks" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
                      {cap.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="ux-vault-stamp">{stamps[idx % stamps.length]}</span>
                </CinematicCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}