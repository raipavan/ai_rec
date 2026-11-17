import type { ReactElement } from 'react';
import { productPages } from './data/products';
import {
  AboutPage,
  CareersPage,
  ContactPage,
  LeadershipPage,
  NewsPage,
  PartnersPage,
  TechnologyPage,
} from './pages/CompanyPages';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { PricingPage } from './pages/PricingPage';
import { ProductPage } from './pages/ProductPage';
import { ProductsOverview } from './pages/ProductsOverview';
import { SolutionsPage } from './pages/SolutionsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { CustomersPage } from './pages/CustomersPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { ResourcesPage, BlogPage } from './pages/ResourcesPage';
import { SupportPage } from './pages/SupportPage';
import { LegalPage } from './pages/LegalPage';
import { GetStartedPage } from './pages/GetStartedPage';

export interface Route {
  /** Browser tab title, without the site name. */
  title: string;
  description: string;
  render: () => ReactElement;
}

const HOME_TITLE = 'TalentPool365 — AI Recruitment Platform | Source, Screen & Hire Faster';

/* Each sitemap destination has a route and page metadata. */
export const routes: Record<string, Route> = {
  '/': {
    title: HOME_TITLE,
    description:
      'TalentPool365 sources, screens, assesses and interviews candidates automatically. Cut time-to-hire by 68% without adding headcount.',
    render: () => <Home />,
  },
  '/products': {
    title: 'Platform Overview',
    description: 'Nine products on one platform, from talent sourcing to the signed offer, with analytics and compliance underneath.',
    render: () => <ProductsOverview />,
  },
  ...Object.fromEntries(
    productPages.map((product): [string, Route] => [
      `/products/${product.slug}`,
      {
        title: product.title,
        description: product.lede,
        render: () => <ProductPage product={product} />,
      },
    ]),
  ),
  '/solutions': {
    title: 'Solutions',
    description: 'Hiring solutions by industry, company size and use case, from campus drives to executive search.',
    render: () => <SolutionsPage />,
  },
  '/integrations': {
    title: 'Integrations',
    description: 'Explore ATS, HRMS, video and communication integration options for your hiring workflow.',
    render: () => <IntegrationsPage />,
  },
  '/how-it-works': {
    title: 'How It Works',
    description: 'Follow nine hiring steps, from a job requisition and AI sourcing to recruiter review and onboarding.',
    render: () => <HowItWorksPage />,
  },
  '/case-studies': {
    title: 'Customer Case Studies',
    description: 'Explore how companies cut time-to-hire by 68% and scale talent sourcing with TalentPool365.',
    render: () => <CaseStudiesPage />,
  },
  '/customers': {
    title: 'Customers & Hiring ROI',
    description: 'Explore illustrative hiring stories and estimate the recruiter time your team could save.',
    render: () => <CustomersPage />,
  },
  '/resources': {
    title: 'Recruitment Resources',
    description: 'Read practical AI recruitment guides, planning briefs, checklists and a plain-language hiring glossary.',
    render: () => <ResourcesPage />,
  },
  '/blog': {
    title: 'Recruitment Blog',
    description: 'Ideas for more considered hiring decisions, clearer candidate communication and responsible AI.',
    render: () => <BlogPage />,
  },
  '/support': {
    title: 'Help & Support',
    description: 'Find hiring workflow guidance, training resources and prepare a support email.',
    render: () => <SupportPage />,
  },
  '/legal': {
    title: 'Legal & Trust',
    description: 'Request approved privacy, terms, data processing and responsible AI documentation.',
    render: () => <LegalPage />,
  },
  '/get-started': {
    title: 'Get Started',
    description: 'Request a demo, discuss a trial, arrange a meeting or watch the TalentPool365 product tour.',
    render: () => <GetStartedPage />,
  },
  '/pricing': {
    title: 'Pricing',
    description: 'Starter, Professional and Enterprise plans priced by active job roles, not per seat. Compare plans or request a custom quote.',
    render: () => <PricingPage />,
  },
  '/company/about': {
    title: 'About Us',
    description: 'Built by recruiters who were tired of recruiting software. The story, the timeline and the commitments behind TalentPool365.',
    render: () => <AboutPage />,
  },
  '/company/leadership': {
    title: 'Leadership Team',
    description: 'The leaders accountable for the TalentPool365 product, models, security and customers.',
    render: () => <LeadershipPage />,
  },
  '/company/careers': {
    title: 'Careers',
    description: 'Open roles at TalentPool365 in Amsterdam, Bengaluru and Austin, how we work and how we hire.',
    render: () => <CareersPage />,
  },
  '/company/partners': {
    title: 'Partners',
    description: 'Technology, implementation and referral partner programmes for TalentPool365.',
    render: () => <PartnersPage />,
  },
  '/company/technology': {
    title: 'Technology & Innovation',
    description: 'How TalentPool365 produces an explainable score, the guardrails on every model and current research.',
    render: () => <TechnologyPage />,
  },
  '/company/news': {
    title: 'News & Press Releases',
    description: 'TalentPool365 announcements, press releases and media kit.',
    render: () => <NewsPage />,
  },
  '/company/contact': {
    title: 'Contact Us',
    description: 'Contact TalentPool365 sales, support, press and partnerships. Replies within one business day.',
    render: () => <ContactPage />,
  },
};

export const notFound: Route = {
  title: 'Page not found',
  description: 'This page does not exist.',
  render: () => <NotFound />,
};

export const pageTitle = (route: Route): string =>
  route.title === HOME_TITLE ? HOME_TITLE : `${route.title} | TalentPool365`;
