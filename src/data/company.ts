/* Company pages and the pricing page extras. Copy lives in /content/company/*.json
   and /content/pricing.json (edit it at /admin). Names, roles, vacancies,
   partners and press items are illustrative placeholders: replace them with
   approved content before launch. */
import careers from '../../content/company/careers.json';
import contact from '../../content/company/contact.json';
import leadership from '../../content/company/leadership.json';
import news from '../../content/company/news.json';
import partners from '../../content/company/partners.json';
import technology from '../../content/company/technology.json';
import pricing from '../../content/pricing.json';
import type { FaqItem, IconName } from './content';

export interface Leader {
  initials: string;
  name: string;
  title: string;
  bio: string;
  owns: string;
}

export interface Vacancy {
  title: string;
  team: string;
  location: string;
  type: string;
}

export interface PartnerProgram {
  icon: IconName;
  title: string;
  who: string;
  body: string;
  points: string[];
}

export interface PressItem {
  date: string;
  /** ISO date for the <time> element. */
  iso: string;
  tag: string;
  title: string;
  summary: string;
}

interface TextBlock {
  title: string;
  body: string;
}
interface IconBlock extends TextBlock {
  icon: IconName;
}

/* The company navigation is part of the site structure, so it stays in code. */
export const companyLinks = [
  { label: 'About us', href: '/company/about' },
  { label: 'Leadership', href: '/company/leadership' },
  { label: 'Careers', href: '/company/careers' },
  { label: 'Partners', href: '/company/partners' },
  { label: 'Technology', href: '/company/technology' },
  { label: 'News', href: '/company/news' },
  { label: 'Contact', href: '/company/contact' },
];

/* ---------- Leadership ---------- */
export const leaders = leadership.leaders as Leader[];
export const leadershipPrinciples = leadership.leadershipPrinciples as TextBlock[];

/* ---------- Careers ---------- */
export const workPrinciples = careers.workPrinciples as IconBlock[];
export const benefits = careers.benefits as string[];
export const vacancies = careers.vacancies as Vacancy[];
export const hiringSteps = careers.hiringSteps as TextBlock[];

/* ---------- Partners ---------- */
export const partnerPrograms = partners.partnerPrograms as PartnerProgram[];
export const partnerSteps = partners.partnerSteps as TextBlock[];

/* ---------- Technology & Innovation ---------- */
export const scoreSteps = technology.scoreSteps as TextBlock[];
export const guardrails = technology.guardrails as IconBlock[];
export const platformFacts = technology.platformFacts as { value: string; label: string }[];
export const buildingBlocks = technology.buildingBlocks as TextBlock[];
export const researchTracks = technology.researchTracks as TextBlock[];

/* ---------- News & Press ---------- */
export const pressItems = news.pressItems as PressItem[];
export const mediaAssets = news.mediaAssets as { label: string; href: string }[];

/* ---------- Contact ---------- */
export const offices = contact.offices as { city: string; role: string; detail: string; hours: string }[];
export const contactChannels = contact.contactChannels as {
  icon: IconName;
  title: string;
  body: string;
  email: string;
}[];

/* ---------- Pricing page ---------- */
export const planBasics = pricing.planBasics as string[];
export const pricingFaqs = pricing.pricingFaqs as FaqItem[];
