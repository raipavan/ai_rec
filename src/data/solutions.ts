/* Solutions page. Copy lives in /content/solutions.json (edit it at /admin). */
import solutions from '../../content/solutions.json';
import type { IconName } from './content';

export interface IndustrySolution {
  id: string;
  icon: IconName;
  title: string;
  tagline?: string;
  body: string;
  points: string[];
  statValue: string;
  statLabel: string;
}

export interface SizeSolution {
  id: string;
  icon: IconName;
  title: string;
  tagline?: string;
  /** Who this is, in hiring terms. */
  profile: string;
  body: string;
  points: string[];
  plan: string;
}

export interface UseCaseSolution {
  id: string;
  icon: IconName;
  title: string;
  tagline?: string;
  body: string;
  points: string[];
  /** Product page slugs that do most of the work for this use case. */
  products: string[];
}

interface SolutionsContent {
  industrySolutions: IndustrySolution[];
  sizeSolutions: SizeSolution[];
  useCaseSolutions: UseCaseSolution[];
}

const data = solutions as unknown as SolutionsContent;

/* Stats repeat the illustrative figures used on the home page. */
export const industrySolutions = data.industrySolutions;
export const sizeSolutions = data.sizeSolutions;
export const useCaseSolutions = data.useCaseSolutions;

/* The three sections are part of the page layout, so they stay in code. */
export const solutionSections = [
  { id: 'by-industry', label: 'By industry' },
  { id: 'by-company-size', label: 'By company size' },
  { id: 'by-use-case', label: 'By use case' },
];
