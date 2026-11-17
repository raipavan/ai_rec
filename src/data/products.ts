/* Product pages. One JSON file per product in /content/products, edited in the
   content manager at /admin. A new file there becomes a new page at
   /products/<slug> automatically; add it to the header menu under
   Navigation in the content manager. */
import type { IconName } from './content';

export interface Capability {
  /** Anchor on the product page, e.g. /products/talent-sourcing#resume-database-search */
  id: string;
  title: string;
  tagline?: string;
  body: string;
  points: string[];
}

export interface Outcome {
  value: string;
  label: string;
}

export interface ProductPage {
  slug: string;
  icon: IconName;
  /** Which coded vignette in ProductMock.tsx illustrates the page. */
  mock: number;
  /** Costume the bot wears in the page hero: 0 sourcing, 1 screening, 2 assessment, 3 interview, 4 offer. */
  bot: number;
  title: string;
  /** One line used on the platform overview and in page metadata. */
  summary: string;
  /** Page headline; wrap the accent phrase in asterisks. */
  headline: string;
  lede: string;
  sectionIntro?: string;
  capabilities: Capability[];
  /** Illustrative figures, in line with the rest of the site. Replace with approved numbers before launch. */
  outcomes: Outcome[];
  /** `stage` products run in order on one requisition; `layer` products sit across every stage. */
  kind: 'stage' | 'layer';
  closingCta?: {
    headline: string;
    body: string;
    buttons?: { label: string; href: string; primary?: boolean }[];
  };
}

const files = import.meta.glob<ProductPage & { order?: number }>('../../content/products/*.json', {
  eager: true,
  import: 'default',
});

/** Products in hiring order (the `order` field of each file). */
export const productPages: ProductPage[] = Object.values(files).sort(
  (a, b) => (a.order ?? 0) - (b.order ?? 0),
);

export const productBySlug = (slug: string): ProductPage | undefined =>
  productPages.find((product) => product.slug === slug);

export const productPath = (product: ProductPage): string => `/products/${product.slug}`;
