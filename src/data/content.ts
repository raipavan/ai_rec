/* Navigation, footer and home page copy.
   The words live in /content/*.json so the content manager at /admin can edit
   them; this file gives them their types. To change copy, edit the JSON (or
   use /admin), not this file. */
import home from '../../content/home.json';
import navigation from '../../content/navigation.json';
import pricing from '../../content/pricing.json';

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
  | 'pause'
  | 'chat'
  | 'file-check'
  | 'users'
  | 'rocket'
  | 'globe'
  | 'cap'
  | 'briefcase'
  | 'refresh'
  | 'layers'
  | 'cpu'
  | 'handshake'
  | 'megaphone'
  | 'mail'
  | 'pin'
  | 'arrow-right';

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
  /** Page the header link opens. */
  href: string;
  /** Path prefix that marks this item as current; defaults to `href`. */
  match?: string;
  links?: NavLink[];
  intro?: NavMenuIntro;
}

export interface CompanyLogo {
  name: string;
  style: string;
}

export interface Product {
  icon: IconName;
  /** Product page this tab links to. */
  href: string;
  title: string;
  body: string;
  points: string[];
}

export interface Industry {
  icon: IconName;
  title: string;
  body: string;
  statValue: string;
  statLabel: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Metric {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
}

export interface Integration {
  mark: string;
  label: string;
}

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

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export interface Value {
  title: string;
  body: string;
}

export interface Hire {
  initials: string;
  name: string;
  /** The role they were hired into, and where. */
  role: string;
  company: string;
  /** How the hire happened. */
  detail: string;
}

export type SwitchVisualKind = 'search' | 'score' | 'interview';

export interface SwitchRow {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  visual: SwitchVisualKind;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface HeroStage {
  label: string;
  status: string;
  value: string;
  note: string;
  /** Share of the original candidate pool still in play, 0-100. */
  share: number;
}

export interface Agent {
  /** Short label under the station in the scene. */
  station: string;
  name: string;
  body: string;
  /** Candidates still in play once this agent has finished. Illustrative figures. */
  count: number;
  countLabel: string;
}

interface NavigationContent {
  navItems: NavItem[];
  footerColumns: FooterColumn[];
  footerLegalLinks: { label: string; href: string }[];
}

interface HomeContent {
  heroRoles: string[];
  heroProof: string[];
  heroStages: HeroStage[];
  companyLogos: CompanyLogo[];
  agents: Agent[];
  products: Product[];
  interviewSplit: { eyebrow: string; title: string; body: string; points: string[]; cta: string };
  demoVideo: { src: string; poster: string; title: string; length: string };
  industries: Industry[];
  steps: Step[];
  metrics: Metric[];
  switchRows: SwitchRow[];
  integrations: Integration[];
  caseStudies: CaseStudy[];
  timeline: TimelineEntry[];
  values: Value[];
  hires: Hire[];
  faqs: FaqItem[];
}

interface PricingContent {
  plans: Plan[];
  compareRows: CompareRow[];
}

const nav = navigation as unknown as NavigationContent;
const page = home as unknown as HomeContent;
const price = pricing as unknown as PricingContent;

/* Header and footer destinations follow the supplied sitemap. */
export const navItems = nav.navItems;
export const footerColumns = nav.footerColumns;
export const footerLegalLinks = nav.footerLegalLinks;

/* Words that rotate through the hero headline, one per industry playbook. */
export const heroRoles = page.heroRoles;
export const heroProof = page.heroProof;
/* One requisition followed from first search to signed offer. Illustrative figures. */
export const heroStages = page.heroStages;
export const companyLogos = page.companyLogos;
/* The scroll-driven scene: five agents hand one requisition down the line. */
export const agents = page.agents;
export const products = page.products;
export const interviewSplit = page.interviewSplit;
/**
 * Demo video beside the "Inside AI Interviews" copy. `src` is a file in /public
 * (e.g. '/assets/demo.mp4') or a YouTube / Vimeo link. While it is empty the
 * section shows the poster with a "coming soon" tag.
 */
export const demoVideo = page.demoVideo;
export const industries = page.industries;
export const steps = page.steps;
export const metrics = page.metrics;
export const switchRows = page.switchRows;
export const integrations = page.integrations;
/* Illustrative case studies. Replace with approved customer figures before launch. */
export const caseStudies = page.caseStudies;
export const timeline = page.timeline;
export const values = page.values;
/* Illustrative hires made through the platform. Replace with real, consented profiles before launch. */
export const hires = page.hires;
export const faqs = page.faqs;

export const plans = price.plans;
export const compareRows = price.compareRows;

export interface Story {
  stat: string;
  statLabel: string;
  quote: string;
  name: string;
  role: string;
}

export const stories: Story[] = [
  {
    stat: '54 → 19 days',
    statLabel: 'time-to-hire, same team size',
    quote:
      'We cut time-to-hire from 54 days to 19 without adding a single recruiter. The shortlists arrive with the evidence already attached — my team reviews, they don\u2019t chase.',
    name: 'Lena Voss',
    role: 'Head of Talent Acquisition — Meridian Health Group',
  },
  {
    stat: '900',
    statLabel: 'engineers screened a quarter by two recruiters',
    quote:
      'We were screening 900 engineers a quarter with two recruiters. The scoring rubric is the first one our panel actually agreed on — and the first one we can defend when a candidate asks why.',
    name: 'Marcus Feld',
    role: 'CTO — Vantek',
  },
  {
    stat: '1 week → 1 afternoon',
    statLabel: 'to complete an audit review',
    quote:
      'Regulated hiring means every decision needs a paper trail. The platform produces one automatically, so audit review that used to take a week now takes an afternoon.',
    name: 'Priya Nair',
    role: 'Talent Director — Bluebridge Bank',
  },
];
