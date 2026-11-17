import { useEffect, useState } from 'react';
import { scrollToHash, useHash } from '../lib/router';
import { CinematicCard } from '../components/CinematicMotion';
import { DemoVideo } from '../components/DemoVideo';
import { Faq } from '../components/Faq';
import { Icon } from '../components/Icon';
import { SectionHead } from '../components/SectionHead';
import { SkCtaBanner, SkHero, SkVectorArt } from '../components/SeekOutUI';
import { resources } from '../data/resources';

const glossary = [
  ['ATS', 'Applicant tracking system: the core software used by HR to post jobs, store candidate resumes, and manage recruitment pipeline stages.'],
  ['Structured interview', 'An interview format using standardized, job-relevant questions scored against a consistent pre-defined evaluation rubric.'],
  ['Talent pool', 'A curated, categorized database of pre-qualified active and passive candidates available for current and future hiring needs.'],
  ['Semantic matching', 'AI-driven candidate matching that understands the contextual relationships between skills, accomplishments, and requirements rather than relying on exact keyword matching.'],
  ['Time-to-hire', 'The elapsed duration between a job requisition opening or initial applicant submission and the accepted offer letter.'],
  ['Fair Hiring AI', 'Explainable AI scoring algorithms designed with strict anti-bias guardrails, excluding protected demographic attributes and requiring human oversight.'],
  ['Cognitive assessment', 'Objective evaluation measuring analytical reasoning, problem-solving speed, attention to detail, and pattern recognition.'],
  ['Proctoring', 'Automated integrity monitoring during online tests and interviews, tracking tab switches, secondary screens, and identity verification.'],
];

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  tagline: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  paragraphs: string[];
}

export const documentBlogPosts: BlogPost[] = [
  {
    id: 'ai-changing-recruitment',
    category: 'AI in Recruitment',
    title: 'How AI is changing recruitment, and what recruiters should do about it',
    tagline: 'A practical look at where AI helps in hiring, where human judgment still matters, and how to start without disrupting your process.',
    readTime: '6 min read',
    date: 'November 2026',
    author: 'Editorial Team · TalentPool365',
    summary: 'A balanced assessment of modern AI in talent acquisition: why semantic understanding outperforms keyword filtering, how to maintain human judgment at critical decision moments, and where automation provides immediate return on investment.',
    paragraphs: [
      'The modern recruiting desk has reached an unsustainable breaking point. With one-click job applications and remote job boards, an average engineering or corporate requisition attracts hundreds of applications, over 70% of which do not meet foundational job criteria. Recruiters spend an estimated 18 to 22 hours per week simply sifting through PDFs and copying candidate contact details into spreadsheets.',
      'Artificial intelligence in recruitment is often misunderstood as an automated decision-maker. In reality, responsible AI acts as an executive intelligence assistant. It performs semantic extraction—understanding that a candidate who led a React-to-Next.js migration possesses senior frontend engineering capabilities even if the words "State Management Architecture" were not explicitly copy-pasted into their resume skills section.',
      'Crucially, ethical hiring systems must enforce human-in-the-loop oversight. AI should calculate match scores, surface evidence, flag missing prerequisites, and conduct preliminary structured screening interviews. However, the decision of whether to advance, offer, or disqualify a human candidate must always rest with human recruiters and hiring managers who possess organizational empathy.',
      'To implement AI safely without disrupting current operations, talent leaders should start with repeatable administrative burdens: resume parsing, initial proctored technical evaluations, and automated WhatsApp follow-ups. Measuring time-in-stage reductions against candidate satisfaction surveys creates a clear baseline for further automation.',
    ],
  },
  {
    id: 'build-talent-pool',
    category: 'Talent Sourcing',
    title: 'How to build a talent pool that fills roles before they open',
    tagline: 'Turn past applicants and silver medalists into a ready pipeline.',
    readTime: '5 min read',
    date: 'November 2026',
    author: 'Sourcing Practice · TalentPool365',
    summary: 'Why your dormant applicant tracking archive is your most valuable sourcing asset, and how semantic tagging turns silver medalists into hires within hours.',
    paragraphs: [
      'Every hiring manager remembers the runner-up: the exceptional finalist who was narrowly passed over for an open requisition simply because the business could only extend one offer. In traditional recruitment workflows, that candidate’s resume falls into a digital black hole in the ATS, never to be opened again.',
      'Building an active talent pool requires treating candidate relationships as continuous connections rather than transactional encounters. By organizing candidates into dynamic pools based on competencies, seniorities, and geographic availability, talent acquisition teams ensure that when a new requisition opens, they start with a pre-vetted shortlist rather than starting from zero on expensive job boards.',
      'Automated re-engagement campaigns play a decisive role. Sending contextual updates—such as engineering open-source milestones, team growth announcements, and polite check-ins regarding notice periods—keeps passive candidates warm and engaged. When a matching role opens, reaching out takes seconds, producing response rates up to 4 times higher than cold outreach on LinkedIn.',
    ],
  },
  {
    id: 'resume-screening-scale',
    category: 'Candidate Screening',
    title: 'Resume screening at scale: how to review 500 applications without burning out',
    tagline: 'Simple steps to cut manual screening without missing good candidates.',
    readTime: '4 min read',
    date: 'October 2026',
    author: 'Recruitment Ops · TalentPool365',
    summary: 'Techniques for high-volume screening that eliminate recruiter fatigue while preventing false rejections of non-traditional talent.',
    paragraphs: [
      'Recruiter fatigue is the single greatest cause of poor hiring decisions in high-volume hiring. When an HR professional evaluates their 150th resume of the afternoon, cognitive bias spikes, and candidates are rejected for superficial reasons like font choice, resume layout, or non-traditional job titles.',
      'The solution lies in automated parsing and multi-criteria weighting. By separating requirements into strict must-haves (e.g. required clinical certifications or right-to-work status) and flexible nice-to-haves (e.g. familiarity with a specific internal tool), recruiters can configure algorithms that rank candidates by actual merit.',
      'Transparent scoring transforms the screening pipeline. When a recruiter opens an applicant record and sees an itemized breakdown—94% Match: 6 years relevant experience, strong project portfolio, lacks GraphQL (nice-to-have)—they can make an evidence-based shortlisting determination in 15 seconds rather than 10 minutes.',
    ],
  },
  {
    id: 'skills-based-hiring',
    category: 'Hiring Strategy',
    title: 'Skills-based hiring: why job titles don’t tell the whole story',
    tagline: 'How to look past titles and find people who can do the work.',
    readTime: '5 min read',
    date: 'October 2026',
    author: 'People Strategy · TalentPool365',
    summary: 'Moving beyond legacy credentials and company brands to evaluate real-world problem solving, code quality, and practical domain execution.',
    paragraphs: [
      'In fast-moving industries like software engineering, data science, and product design, formal job titles are notoriously inconsistent. One company’s "Associate Engineer" might be designing distributed microservices, while another enterprise’s "Lead Architect" spends their days in administrative governance meetings.',
      'Skills-based hiring de-emphasizes pedigree and prestigious company brand names in favor of verifiable capability. By extracting skills directly from project descriptions, code repositories, open-source contributions, and practical assessments, hiring teams uncover hidden gems whom legacy ATS keyword filters routinely reject.',
      'Organizations that transition to skills-based hiring report greater employee retention and up to 3.2 times greater diversity in their candidate pipeline. When you test what candidates can actually do rather than where they went to school, meritocracy wins.',
    ],
  },
  {
    id: 'ai-interviews-experience',
    category: 'Interviews & Assessments',
    title: 'AI interviews: what candidates experience and how to make it fair',
    tagline: 'Tips for designing automated interviews that candidates respect.',
    readTime: '6 min read',
    date: 'September 2026',
    author: 'Candidate Experience Lab · TalentPool365',
    summary: 'How to design asynchronous video, voice, and coding interviews that respect candidate schedules, reduce test anxiety, and ensure fair scoring.',
    paragraphs: [
      'Asynchronous and AI-assisted interviews have exploded in adoption, but candidate perception varies dramatically based on implementation. When an interview feels like an interrogation by an opaque black box, completion rates plummet. When it is designed with transparency and flexibility, candidates love the freedom to interview on their own schedule.',
      'Fairness begins with transparent expectations. Before candidates begin recording, they should receive a clear walkthrough of the competencies being tested, the duration of each answer, whether retakes are permitted, and how their responses will be evaluated. Explaining upfront that human recruiters review all recordings eliminates distrust.',
      'Accessibility is paramount. Providing voice-first alternatives for low-bandwidth environments, accommodating sensory requirements, and conducting ongoing audits for linguistic or dialect bias ensures that automated interview systems expand access rather than erecting new barriers.',
    ],
  },
  {
    id: 'recruitment-metrics-track',
    category: 'Recruitment Analytics',
    title: 'The hiring metrics every recruiter should track',
    tagline: 'Time-to-hire, source quality, funnel drop-off and what each one tells you.',
    readTime: '5 min read',
    date: 'September 2026',
    author: 'Analytics Team · TalentPool365',
    summary: 'Move past vanity metrics to measure recruiting velocity, funnel dwell time, source ROI, and long-term candidate retention.',
    paragraphs: [
      'Many recruitment teams track superficial numbers such as "Total Resumes Received" or "Interviews Scheduled." While easy to report, these vanity metrics say very little about the health, speed, or quality of the talent acquisition pipeline.',
      'A mature talent team focuses on conversion velocity: measuring median days spent in each stage (Sourcing to Screened, Screened to Assessed, Assessed to Offer). Identifying which specific handoff creates delays—frequently the gap between shortlist delivery and hiring manager interview scheduling—pinpoints where process improvements yield exponential returns.',
      'Equally vital is Source Effectiveness. By measuring quality-of-hire and offer acceptance rates grouped by acquisition channel, organizations frequently discover that expensive job boards produce high volume but low retention, whereas referral pools and direct AI candidate discovery deliver superior longevity.',
    ],
  },
  {
    id: 'candidate-engagement-updates',
    category: 'Candidate Experience',
    title: 'How to keep candidates engaged between application and offer',
    tagline: 'Timely updates, WhatsApp follow-ups and why silence loses great hires.',
    readTime: '4 min read',
    date: 'August 2026',
    author: 'Engagement Practice · TalentPool365',
    summary: 'Why candidate ghosting destroys your employer brand, and how omnichannel WhatsApp and email notifications keep top finalists excited.',
    paragraphs: [
      'The modern candidate experience has a silent killer: the multi-week communication void. When top candidates submit an application or complete an interview, they expect timely updates. When met with silence, top talent assumes rejection and accepts competing offers.',
      'Omnichannel communication bridges this gap. Meeting candidates on WhatsApp—where response rates exceed 88% within the first hour—dramatically outperforms email in driving test completion and interview attendance. Simple automated nudges, such as "Your technical assessment is ready for review" or "Your interview feedback is being finalized," maintain momentum.',
      'The pre-onboarding gap between signed offer and day one is equally critical. Providing new hires with a digital pre-boarding checklist, welcome messages from their team, and transparent equipment setup schedules eliminates day-one no-shows and starts employee tenure with confidence.',
    ],
  },
];

export function ResourcesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All resources');
  const hash = useHash();

  useEffect(() => {
    if (!resources.some((item) => `#${item.id}` === hash)) return;
    setQuery('');
    setCategory('All resources');
    const frame = requestAnimationFrame(() => scrollToHash(hash));
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  const categories = ['All resources', 'Guide', 'White paper brief', 'Report framework', 'E-book checklist', 'Workshop outline'];
  const shown = resources.filter(
    (item) =>
      (category === categories[0] || item.type === category) &&
      `${item.title} ${item.intro} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <main className="sk-page">
      <SkHero
        centered
        eyebrow="RESOURCES"
        eyebrowIcon="file-check"
        title="TalentPool365 Resource Hub"
        subtitle="Practical AI recruitment playbooks, evaluation frameworks, checklists, and plain-language guides — open to read with zero gated forms."
      >
        <div className="sk-hero-search-wrap">
          <span className="sk-hero-search-icon" aria-hidden="true">
            <Icon name="search" />
          </span>
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <input
            id="resource-search"
            type="search"
            className="sk-hero-search-input"
            value={query}
            placeholder="Search resources (interviews, scoring, sourcing...)"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="sk-hero-filters" role="group" aria-label="Resource types">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`sk-filter-pill${category === item ? ' is-active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </SkHero>

      <section className="sk-band sk-band--white" id="guides">
        <div className="container">
          <p className="result-count" role="status" style={{ marginBottom: 24 }}>
            Showing {shown.length} practical resource{shown.length === 1 ? '' : 's'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {shown.map((item, idx) => (
              <CinematicCard className="sk-card sk-res-horizontal-card" variant="left" delay={idx % 3} tilt={0.45} id={item.id} key={item.id}>
                <div className="sk-res-media">
                  <SkVectorArt kind={idx % 3 === 0 ? 'cover-1' : idx % 3 === 1 ? 'cover-2' : 'cover-3'} />
                </div>
                <div className="sk-cover-card-body">
                  <span className="sk-pill-tag" style={{ width: 'fit-content', marginBottom: 2 }}>
                    {item.type}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.intro}</p>
                  <details className="resource-details" style={{ marginTop: 'auto', paddingTop: 8 }}>
                    <summary>
                      Read full brief <span className="sr-only">: {item.title}</span>
                    </summary>
                    <div>
                      {item.paragraphs.map((text) => (
                        <p key={text}>{text}</p>
                      ))}
                    </div>
                  </details>
                </div>
              </CinematicCard>
            ))}
          </div>

          {!shown.length && (
            <div className="empty-state">
              <h3>No resources match your search</h3>
              <p>Try searching for a different term or clear the filter.</p>
              <button
                type="button"
                className="sk-btn-green"
                onClick={() => {
                  setQuery('');
                  setCategory(categories[0]);
                }}
              >
                Clear Search &amp; Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="sk-band sk-band--cream" id="product-videos">
        <div className="container split">
          <div className="split-copy">
            <span className="sk-pill-tag">PRODUCT WALKTHROUGH</span>
            <h2 className="sk-serif-h2">See the platform. Follow the work.</h2>
            <p className="sk-section-sub">
              A guided walkthrough of the TalentPool365 workflow: from automated AI sourcing and semantic
              screening to proctored assessments, video interviews, and digital offers.
            </p>
            <a className="sk-card-link" style={{ marginTop: 14 }} href="/how-it-works">
              Explore all nine hiring steps <Icon name="arrow-right" />
            </a>
          </div>
          <DemoVideo />
        </div>
      </section>

      <Faq contactHref="/company/contact" />

      <section className="sk-band sk-band--cream" id="glossary">
        <div className="container">
          <SectionHead
            eyebrow="Terminology"
            title="Hiring terms, *in plain language*"
            body="Clear explanations of modern talent acquisition and recruitment AI concepts."
          />
          <dl className="glossary-grid">
            {glossary.map(([term, meaning]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SkCtaBanner />
    </main>
  );
}

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const blogCategories = [
    'All',
    'Talent Sourcing',
    'Candidate Screening',
    'AI in Recruitment',
    'Interviews & Assessments',
    'Candidate Experience',
    'Hiring Strategy',
    'Recruitment Analytics',
  ];

  const featured = documentBlogPosts[0];

  const filteredPosts = documentBlogPosts.filter((post) => {
    const matchCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchSearch =
      `${post.title} ${post.tagline} ${post.summary} ${post.category}`
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="sk-page">
      <SkHero
        centered
        eyebrow="RECRUITMENT BLOG"
        eyebrowIcon="megaphone"
        title="Insights, guides and ideas for smarter hiring"
        subtitle="Practical advice for recruiters, HR leaders, and hiring managers. Learn how to source better, screen faster, interview fairly, and make AI work for your team."
      >
        <div className="sk-hero-search-wrap">
          <span className="sk-hero-search-icon" aria-hidden="true">
            <Icon name="search" />
          </span>
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            className="sk-hero-search-input"
            placeholder="Search articles by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sk-hero-filters" role="group" aria-label="Blog categories">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`sk-filter-pill${selectedCategory === cat ? ' is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </SkHero>

      {/* Featured Editorial Story */}
      <section className="sk-band sk-band--cream" id="featured-article">
        <div className="container">
          <div className="sk-card sk-card--top-accent" style={{ padding: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <span className="sk-pill-tag" style={{ marginBottom: 0 }}>
                FEATURED · {featured.category}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                {featured.readTime} · {featured.date}
              </span>
            </div>
            <h2 className="sk-serif-h2" style={{ marginTop: 8 }}>{featured.title}</h2>
            <p style={{ fontSize: '1.05rem', color: '#146E63', fontWeight: 600 }}>{featured.tagline}</p>
            <p>{featured.summary}</p>
            <div>
              <button
                type="button"
                className="sk-btn-orange"
                onClick={() => setReadingPost(featured)}
              >
                Read Full Article →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Article Grid */}
      <section className="sk-band sk-band--white" id="articles-feed">
        <div className="container">
          <p className="result-count" role="status" style={{ marginBottom: 24 }}>
            Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
          </p>

          <div className="sk-grid-2">
            {filteredPosts.map((post, idx) => (
              <CinematicCard key={post.id} variant="up" delay={idx % 2} className="sk-blog-editorial-card">
                <div className="sk-blog-masthead">
                  <span>{post.category}</span>
                  <span>{post.readTime} · {post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="sk-blog-quote-lead">{post.tagline}</p>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>{post.summary}</p>
                <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{post.author}</span>
                  <button
                    type="button"
                    className="sk-card-link"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginTop: 0 }}
                    onClick={() => setReadingPost(post)}
                  >
                    Read article <Icon name="arrow-right" />
                  </button>
                </div>
              </CinematicCard>
            ))}
          </div>

          {!filteredPosts.length && (
            <div className="empty-state">
              <h3>No articles found</h3>
              <p>Try searching for a different keyword or resetting your category filter.</p>
              <button
                type="button"
                className="sk-btn-green"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Article Reader Modal */}
      {readingPost && (
        <div className="modal-backdrop" onClick={() => setReadingPost(null)}>
          <div
            className="modal-container blog-article-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-reader-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setReadingPost(null)}
              aria-label="Close article"
            >
              ×
            </button>

            <div className="modal-content-scroll">
              <div className="article-reader-head">
                <span className="badge-tag">{readingPost.category}</span>
                <span className="badge-meta">{readingPost.readTime} · {readingPost.date}</span>
                <h1 id="article-reader-title" className="article-reader-title">
                  {readingPost.title}
                </h1>
                <p className="article-reader-tagline">{readingPost.tagline}</p>
                <div className="article-author-byline">
                  <Icon name="users" />
                  <span>By {readingPost.author}</span>
                </div>
              </div>

              <div className="article-reader-body">
                {readingPost.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="modal-footer-cta">
                <a className="btn btn-primary" href="/get-started#book-meeting">
                  Explore TalentPool365 for your team
                </a>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setReadingPost(null)}
                >
                  Close article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SkCtaBanner />
    </main>
  );
}