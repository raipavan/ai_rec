export type IconName =
  | 'search'
  | 'sliders'
  | 'clipboard-check'
  | 'video'
  | 'layout'
  | 'chart'
  | 'building'
  | 'pulse'
  | 'bank'
  | 'factory'
  | 'cart'
  | 'headset'
  | 'shield'
  | 'trend'
  | 'play'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'pause';

export interface NavLink {
  label: string;
  href: string;
  /** One line shown under the label in the desktop mega menu. */
  desc?: string;
}

/** Intro column on the left of the desktop mega menu. */
export interface NavMenuIntro {
  title: string;
  blurb: string;
  image: string;
}

export interface NavItem {
  id: string;
  label: string;
  links?: NavLink[];
  intro?: NavMenuIntro;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  {
    id: 'products',
    label: 'Products',
    intro: {
      title: 'Our Hiring Products',
      blurb: 'Every step of hiring, from the first search to the signed offer, on one platform.',
      image: '/assets/dashboard-hero.jpg',
    },
    links: [
      { label: 'Talent Sourcing', href: '#products', desc: 'Find candidates across your ATS, job boards and referral pools in one search.' },
      { label: 'Candidate Screening', href: '#products', desc: 'Every application parsed, ranked and shortlisted, with the reasons shown.' },
      { label: 'AI Assessments', href: '#products', desc: 'Technical, aptitude and cognitive tests that grade themselves against your bar.' },
      { label: 'AI Interviews', href: '#products', desc: 'Structured video, voice and coding interviews scored on a consistent rubric.' },
      { label: 'Recruiter Workspace', href: '#products', desc: 'A shared pipeline with notes, feedback and approval workflows.' },
      { label: 'Offers & Analytics', href: '#products', desc: 'Offer letters, e-signature and KPI dashboards that explain the funnel.' },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    intro: {
      title: 'Our Industry Solutions',
      blurb: 'Hiring workflows tuned to the roles, volumes and rules of your sector.',
      image: '/assets/workspace-analytics.jpg',
    },
    links: [
      { label: 'IT & Technology', href: '#solutions', desc: 'Coding interviews and Git-based screening for engineering, data and product roles.' },
      { label: 'Healthcare', href: '#solutions', desc: 'License verification and shift-friendly scheduling for clinical and support staff.' },
      { label: 'BFSI', href: '#solutions', desc: 'Audit-ready screening and background checks for regulated finance roles.' },
      { label: 'Manufacturing', href: '#solutions', desc: 'High-volume plant and floor hiring with mobile-first applications.' },
      { label: 'Retail', href: '#solutions', desc: 'Seasonal surge hiring with same-day interview loops.' },
      { label: 'BPO & Contact Centers', href: '#solutions', desc: 'Language tests, voice simulations and bulk scheduling for hiring waves.' },
    ],
  },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About Us' },
];

export const sectionIds = navItems.map((item) => item.id);

export const heroProof = [
  'SOC 2 Type II certified',
  'GDPR & EU AI Act ready',
  '14-day trial, no card required',
];

export interface CompanyLogo {
  name: string;
  style: string;
}

export const companyLogos: CompanyLogo[] = [
  { name: 'Meridian Health', style: 'w1' },
  { name: 'Northwind\u00A0Retail', style: 'w4' },
  { name: 'Vantek', style: 'w3' },
  { name: 'Bluebridge Bank', style: 'w2' },
  { name: 'cloudhaven', style: 'w5' },
  { name: 'Ardent Manufacturing', style: 'w6' },
];

export interface Product {
  icon: IconName;
  title: string;
  body: string;
  points: string[];
}

export const products: Product[] = [
  {
    icon: 'search',
    title: 'Talent Sourcing',
    body: 'AI candidate discovery across your ATS, job boards, LinkedIn and referral pools — in one search.',
    points: ['Semantic resume database search', 'Job board & social sourcing', 'Talent pool management'],
  },
  {
    icon: 'sliders',
    title: 'Candidate Screening',
    body: 'Every application parsed, skills extracted and ranked — with the reasons shown, not hidden.',
    points: ['Resume parsing & skill extraction', 'AI matching and ranking', 'Smart shortlisting'],
  },
  {
    icon: 'clipboard-check',
    title: 'AI Assessments',
    body: 'Calibrated technical, aptitude and cognitive tests that grade themselves against your bar.',
    points: ['Technical & coding tests', 'Behavioral analysis', 'Automated evaluation'],
  },
  {
    icon: 'video',
    title: 'AI Interviews',
    body: 'Structured video, voice and coding interviews, proctored and scored on a consistent rubric.',
    points: ['Conversational AI interviews', 'Proctoring & monitoring', 'Interview analytics'],
  },
  {
    icon: 'layout',
    title: 'Recruiter Workspace',
    body: 'A shared pipeline with notes, feedback and approval workflows your whole team actually uses.',
    points: ['Hiring dashboard & pipeline', 'Notes, feedback & collaboration', 'Approval workflows'],
  },
  {
    icon: 'chart',
    title: 'Offers & Analytics',
    body: 'Offer letters, e-signature and pre-onboarding — plus KPI dashboards that explain the funnel.',
    points: ['Offer generation & e-signature', 'Recruitment KPI dashboards', 'Source & diversity analytics'],
  },
];

export const interviewSplit = {
  eyebrow: 'Inside AI Interviews',
  title: 'Interviews that *grade themselves* — recruiters make the call',
  body: 'Every interview is transcribed, time-stamped and scored against the same rubric your panel agreed on before the req opened. Recruiters review the evidence in minutes and decide — the AI never does.',
  points: [
    'Transcript, waveform and score in one view',
    'Skills radar calibrated to your role profile',
    'Proctoring flags reviewed by a human before rejection',
  ],
  cta: 'See an interview replay',
};

/**
 * Demo video beside the "Inside AI Interviews" copy.
 * Set `src` to a file in /public (e.g. '/assets/demo.mp4') or a YouTube / Vimeo link.
 * While it is empty the section shows the poster with a "coming soon" tag.
 */
export const demoVideo = {
  src: '/assets/demo.mp4',
  poster: '/assets/workspace-analytics.jpg',
  title: 'TalentPool365 product demo',
  length: '30 sec',
};

export interface Industry {
  icon: IconName;
  title: string;
  body: string;
  statValue: string;
  statLabel: string;
}

export const industries: Industry[] = [
  {
    icon: 'building',
    title: 'IT & Technology',
    body: 'Coding interviews, framework-specific assessments and Git-based screening for engineering, data and product roles.',
    statValue: '48 hrs',
    statLabel: 'median time to shortlist',
  },
  {
    icon: 'pulse',
    title: 'Healthcare',
    body: 'License verification, credential tracking and shift-friendly scheduling for clinical and support staff.',
    statValue: '31%',
    statLabel: 'fewer credential drop-offs',
  },
  {
    icon: 'bank',
    title: 'BFSI',
    body: 'Audit-ready screening, background checks and role-based assessments for regulated finance roles.',
    statValue: '100%',
    statLabel: 'audit trail coverage',
  },
  {
    icon: 'factory',
    title: 'Manufacturing',
    body: 'High-volume hiring for plant and floor roles with mobile-first applications and instant screening.',
    statValue: '12,000+',
    statLabel: 'hires processed in a single quarter',
  },
  {
    icon: 'cart',
    title: 'Retail',
    body: 'Seasonal surge hiring with WhatsApp-first engagement and same-day interview loops.',
    statValue: '3 days',
    statLabel: 'from application to store floor',
  },
  {
    icon: 'headset',
    title: 'BPO & Contact Centers',
    body: 'Language tests, voice simulations and bulk scheduling built for thousand-seat hiring waves.',
    statValue: '5,400',
    statLabel: 'agents screened in one campaign',
  },
];

export interface Step {
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    title: 'Create the requisition',
    body: 'Describe the role in plain language. AI drafts the spec, success profile and salary band for your approval.',
  },
  {
    title: 'AI talent sourcing',
    body: "The platform searches 30+ channels plus your existing database, and rebuilds warm pools you've already paid to build.",
  },
  {
    title: 'Screening & matching',
    body: 'Resumes are parsed, skills extracted and candidates ranked — every score comes with the reasons attached.',
  },
  {
    title: 'Assessments & AI interviews',
    body: 'Calibrated tests and structured interviews run around the clock, proctored and scored on your rubric.',
  },
  {
    title: 'Recruiter review',
    body: 'Your team gets a shortlist with the full evidence trail. Panels decide; nothing is auto-rejected without human review.',
  },
  {
    title: 'Offer & onboarding',
    body: 'Offer letter, e-signature and pre-boarding run in one flow — candidates know where they stand at every step.',
  },
];

export interface Metric {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
}

export const metrics: Metric[] = [
  { value: 68, suffix: '%', label: 'shorter median time-to-hire across active customers' },
  { value: 3.4, decimals: 1, suffix: '×', label: 'more qualified candidates reach the shortlist stage' },
  { value: 92, suffix: '%', label: 'of manual resume screening eliminated from recruiter workload' },
  { value: 41, suffix: '', label: 'recruiter hours saved on every single hire, on average' },
];

export interface Integration {
  mark: string;
  label: string;
}

export const integrations: Integration[] = [
  { mark: 'W', label: 'Workday' },
  { mark: 'SF', label: 'SuccessFactors' },
  { mark: 'Or', label: 'Oracle HCM' },
  { mark: 'G', label: 'Greenhouse' },
  { mark: 'L', label: 'Lever' },
  { mark: 'B', label: 'BambooHR' },
  { mark: 'R', label: 'Rippling' },
  { mark: 'T', label: 'Microsoft Teams' },
  { mark: 'Z', label: 'Zoom' },
  { mark: 'M', label: 'Google Meet' },
  { mark: 'Wa', label: 'WhatsApp' },
  { mark: 'S', label: 'Slack' },
  { mark: 'O', label: 'Outlook' },
  { mark: 'Gm', label: 'Gmail' },
  { mark: 'API', label: 'Your system' },
];

export interface CaseStudy {
  company: string;
  industry: string;
  /** Headline result and what it measures. */
  stat: string;
  statLabel: string;
  challenge: string;
  approach: string;
  results: string[];
}

/* Illustrative case studies. Replace with approved customer figures before launch. */
export const caseStudies: CaseStudy[] = [
  {
    company: 'Meridian Health Group',
    industry: 'Healthcare',
    stat: '54 \u2192 19 days',
    statLabel: 'time-to-hire, same team size',
    challenge:
      'Clinical roles sat open for almost two months while recruiters chased licence checks and shift availability by hand.',
    approach:
      'Sourcing, credential verification and screening run automatically, so every shortlist arrives with the evidence attached.',
    results: ['No recruiters added', 'Licence checks done before the first interview', 'Shortlists reviewed, not chased'],
  },
  {
    company: 'Vantek',
    industry: 'IT & Technology',
    stat: '900',
    statLabel: 'engineers screened a quarter by two recruiters',
    challenge:
      'Two recruiters faced 900 engineering applicants a quarter, and the interview panel could not agree on one scoring rubric.',
    approach:
      'One rubric agreed before each role opens, with coding assessments and AI interviews scored against it.',
    results: ['Every score traceable to the rubric', 'Panel time spent on finalists only', 'Clear answers when a candidate asks why'],
  },
  {
    company: 'Bluebridge Bank',
    industry: 'BFSI',
    stat: '1 week \u2192 1 afternoon',
    statLabel: 'to complete an audit review',
    challenge:
      'Regulated hiring needs a paper trail for every decision, and assembling one took the team a week per audit.',
    approach:
      'Every score, note and approval is logged as it happens, so the audit pack is produced by the platform.',
    results: ['Audit trail generated automatically', 'Human review recorded before any rejection', 'Reviews closed in an afternoon'],
  },
];

export interface Plan {
  name: string;
  sub: string;
  price: { monthly: number; annual: number } | null;
  note: string;
  cta: string;
  ctaClass: string;
  featured?: boolean;
  features: string[];
}

export const plans: Plan[] = [
  {
    name: 'Starter',
    sub: 'For small teams coming off spreadsheets.',
    price: { monthly: 149, annual: 119 },
    note: 'billed monthly',
    cta: 'Start free trial',
    ctaClass: 'btn-outline',
    features: [
      '3 active job roles',
      '500 candidate profiles / month',
      'AI screening & ranking',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    sub: 'For growing teams that live in their ATS.',
    price: { monthly: 399, annual: 319 },
    note: 'billed monthly',
    cta: 'Start free trial',
    ctaClass: 'btn-primary',
    featured: true,
    features: [
      '25 active job roles',
      'Unlimited candidate profiles',
      'AI assessments & interviews',
      'ATS, WhatsApp & calendar integrations',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    sub: 'For global and regulated organizations.',
    price: null,
    note: 'annual agreement',
    cta: 'Request a quote',
    ctaClass: 'btn-dark',
    features: [
      'Unlimited roles & regions',
      'SSO / SAML & audit trails',
      'Fair-hiring AI audits & DPIA support',
      'Dedicated success manager',
      '99.9% uptime SLA',
    ],
  },
];

export interface CompareCell {
  text: string;
  included: boolean;
}

export interface CompareRow {
  feature: string;
  starter: CompareCell;
  professional: CompareCell;
  enterprise: CompareCell;
}

const yes = (text = 'Included'): CompareCell => ({ text, included: true });
const no = (): CompareCell => ({ text: '—', included: false });

export const compareRows: CompareRow[] = [
  { feature: 'AI candidate matching', starter: yes(), professional: yes(), enterprise: yes() },
  { feature: 'AI assessments', starter: no(), professional: yes(), enterprise: yes() },
  { feature: 'AI interviews with proctoring', starter: no(), professional: yes(), enterprise: yes() },
  { feature: 'ATS & HRMS integrations', starter: no(), professional: yes('2 included'), enterprise: yes('Unlimited') },
  { feature: 'WhatsApp & email automation', starter: no(), professional: yes(), enterprise: yes() },
  { feature: 'SSO / SAML & audit trails', starter: no(), professional: no(), enterprise: yes() },
  { feature: 'Dedicated success manager', starter: no(), professional: no(), enterprise: yes() },
];

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export const timeline: TimelineEntry[] = [
  { year: '2019', title: 'Founded', body: 'inside a boutique recruitment agency in Amsterdam.' },
  { year: '2020', title: 'First matching engine', body: 'ships — explainable scoring from day one.' },
  { year: '2022', title: 'AI Interviews launch', body: 'with human review built into the rejection path.' },
  { year: '2024', title: 'SOC 2 Type II', body: 'certified; EU AI Act alignment published openly.' },
  { year: '2026', title: '2M+ interviews', body: 'processed annually across 40 countries.' },
];

export interface Value {
  title: string;
  body: string;
}

export const values: Value[] = [
  {
    title: 'Evidence over gut feel',
    body: "Every recommendation carries its reasons. If the model can't explain it, it doesn't ship.",
  },
  {
    title: 'Fairness by design',
    body: 'Models are audited for bias quarterly, and results are published to customers unedited.',
  },
  {
    title: 'Humans stay in the loop',
    body: 'AI shortlists; people decide. No candidate is ever auto-rejected by a model.',
  },
  {
    title: 'Security is table stakes',
    body: 'SOC 2 Type II, GDPR, and candidate data that never trains shared models. Ever.',
  },
];

export interface Hire {
  initials: string;
  name: string;
  /** The role they were hired into, and where. */
  role: string;
  company: string;
  /** How the hire happened. */
  detail: string;
}

/* Illustrative hires made through the platform. Replace with real, consented profiles before launch. */
export const hires: Hire[] = [
  {
    initials: 'AT',
    name: 'Ava Thompson',
    role: 'Frontend Developer',
    company: 'Vantek',
    detail: 'Hired in 16 days. Matched from the talent pool and cleared the coding assessment first time.',
  },
  {
    initials: 'RC',
    name: 'Rafael Costa',
    role: 'Registered Nurse',
    company: 'Meridian Health Group',
    detail: 'Hired in 12 days. Licence verified and shifts agreed before the first interview.',
  },
  {
    initials: 'GP',
    name: 'Grace Park',
    role: 'Credit Risk Analyst',
    company: 'Bluebridge Bank',
    detail: 'Hired in 19 days. Every step of the decision logged for audit.',
  },
  {
    initials: 'JO',
    name: 'James Okafor',
    role: 'Production Supervisor',
    company: 'Ardent Manufacturing',
    detail: 'Hired in 14 days. Re-engaged from an earlier role he had narrowly missed.',
  },
];

export type SwitchVisualKind = 'search' | 'score' | 'interview';

export interface SwitchRow {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  visual: SwitchVisualKind;
}

export const switchRows: SwitchRow[] = [
  {
    eyebrow: 'Sourcing',
    title: 'Six tabs become one search',
    body: 'Your ATS, LinkedIn, job boards and referral pool get searched at once. Results come back deduplicated, ranked and attached to the requisition — not pasted into another spreadsheet.',
    points: [
      '30+ channels plus your existing database',
      'Duplicate profiles merged automatically',
      'Every match keeps its source',
    ],
    visual: 'search',
  },
  {
    eyebrow: 'Screening',
    title: 'Shortlists that arrive with their reasons',
    body: "Nobody re-reads 200 resumes to trust the top twelve. Each ranking shows matched skills, gaps and the rubric line it cleared — so the review meeting starts with a decision, not a debate.",
    points: [
      'Matched and missing skills, side by side',
      'The same rubric applied to every candidate',
      'No black-box scores, ever',
    ],
    visual: 'score',
  },
  {
    eyebrow: 'Interviews',
    title: "Interviews that don't wait for calendars",
    body: 'Structured AI interviews run at 7am or 11pm, in twelve languages, with the same questions and the same scoring. Panels review the evidence in the morning instead of booking another loop.',
    points: [
      'Proctored sessions with human-reviewed flags',
      'Transcript, waveform and score in one view',
      'Laptop and phone — no install needed',
    ],
    visual: 'interview',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'How long does implementation take?',
    answer:
      'Most teams are live in under two weeks. Connect your ATS, import the role and rubric, and run the first requisition in parallel with your current process — no migration project required.',
  },
  {
    question: 'Does TalentPool365 replace our ATS?',
    answer:
      'No. It sits on top of the ATS you already run. Candidates, stages and offers stay in your system of record; the platform handles sourcing, screening and interview evidence, then syncs both ways.',
  },
  {
    question: 'How do you keep the AI from making biased decisions?',
    answer:
      'Every score is tied to a rubric your team defined before the role opened. Models are bias-audited quarterly, and no candidate is auto-rejected — a recruiter reviews the evidence and makes the call.',
  },
  {
    question: 'What happens to candidate data?',
    answer:
      'It stays yours. SOC 2 Type II controls, GDPR-compliant processing, EU data residency on request, and candidate data is never used to train shared models. Enterprise plans add SSO/SAML and full audit trails.',
  },
  {
    question: 'Can we try it on a real role first?',
    answer:
      "Yes. The 14-day trial includes sourcing and screening on live requisitions, no card required. For larger teams we'll set up a sandbox pilot on your own data before you commit.",
  },
  {
    question: 'How is pricing counted?',
    answer:
      'Plans are priced by active job roles, not per seat — your whole hiring panel can review candidates on one subscription. Annual billing saves 20%, and Enterprise is quoted on volume and regions.',
  },
];

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Talent Sourcing', href: '#products' },
      { label: 'Candidate Screening', href: '#products' },
      { label: 'AI Assessments', href: '#products' },
      { label: 'AI Interviews', href: '#products' },
      { label: 'Recruiter Workspace', href: '#products' },
      { label: 'How It Works', href: '#how-it-works' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'By Industry', href: '#solutions' },
      { label: 'By Company Size', href: '#solutions' },
      { label: 'By Use Case', href: '#solutions' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'ROI & Metrics', href: '#metrics' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#about' },
      { label: 'AI Recruitment Guides', href: '#about' },
      { label: 'White Papers', href: '#about' },
      { label: 'Webinars', href: '#about' },
      { label: 'FAQs', href: '#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'People Hired', href: '#people-hired' },
      { label: 'Careers', href: '#about' },
      { label: 'Partners', href: '#about' },
      { label: 'News & Press', href: '#about' },
      { label: 'Contact Us', href: '#contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#contact' },
      { label: 'Documentation', href: '#contact' },
      { label: 'Training Academy', href: '#contact' },
      { label: 'Raise a Ticket', href: '#contact' },
      { label: 'System Status', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#footer' },
      { label: 'Terms of Service', href: '#footer' },
      { label: 'Cookies Policy', href: '#footer' },
      { label: 'GDPR Compliance', href: '#footer' },
      { label: 'Responsible AI Policy', href: '#footer' },
    ],
  },
];

export const footerLegalLinks = [
  { label: 'Privacy', href: '#footer' },
  { label: 'Terms', href: '#footer' },
  { label: 'Security', href: '#footer' },
  { label: 'Status: All systems operational', href: '#footer' },
];

/* Words that rotate through the hero headline — one per industry playbook. */
export const heroRoles = [
  'engineers',
  'nurses',
  'analysts',
  'operators',
  'cashiers',
  'advisors',
];

export interface HeroStage {
  label: string;
  status: string;
  value: string;
  note: string;
  /** Share of the original candidate pool still in play, 0-100. */
  share: number;
}

/* One requisition followed from first search to signed offer. Illustrative figures. */
export const heroStages: HeroStage[] = [
  { label: 'Source', status: 'Sourcing complete', value: '300', note: 'profiles matched across 30+ channels', share: 100 },
  { label: 'Screen', status: 'Screening complete', value: '214', note: 'of 300 scored in 8 min', share: 71 },
  { label: 'Assess', status: 'Assessments graded', value: '38', note: 'cleared the calibrated skills test', share: 34 },
  { label: 'Interview', status: 'Interviews scored', value: '12', note: 'reviewed against your panel rubric', share: 16 },
  { label: 'Offer', status: 'Offer signed', value: 'Day 19', note: 'pre-boarding already under way', share: 6 },
];

export interface Agent {
  /** Short label under the station in the scene. */
  station: string;
  name: string;
  body: string;
  /** Candidates still in play once this agent has finished. Illustrative figures. */
  count: number;
  countLabel: string;
}

/* The scroll-driven scene: five agents hand one requisition down the line. */
export const agents: Agent[] = [
  {
    station: 'Source',
    name: 'Sourcing agent',
    body: 'Searches 30+ channels and the database you already own, then pulls every matching profile into one pool.',
    count: 300,
    countLabel: 'profiles matched',
  },
  {
    station: 'Screen',
    name: 'Screening agent',
    body: 'Parses each resume, extracts the skills and ranks every candidate, with the reasons attached to each score.',
    count: 214,
    countLabel: 'scored in 8 minutes',
  },
  {
    station: 'Assess',
    name: 'Assessment agent',
    body: 'Runs calibrated technical and aptitude tests around the clock and grades them against your bar.',
    count: 38,
    countLabel: 'cleared the skills test',
  },
  {
    station: 'Interview',
    name: 'Interview agent',
    body: 'Holds structured interviews, transcribes them and scores each answer on the rubric your panel agreed.',
    count: 12,
    countLabel: 'on the shortlist, evidence attached',
  },
  {
    station: 'Offer',
    name: 'Offer agent',
    body: 'Your panel makes the call. The agent drafts the letter, collects the signature and starts pre-boarding.',
    count: 1,
    countLabel: 'offer signed on day 19',
  },
];
