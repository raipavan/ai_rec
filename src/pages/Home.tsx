import { About } from '../components/About';
import { Agents } from '../components/Agents';
import { CaseStudies } from '../components/CaseStudies';
import { Contact } from '../components/Contact';
import { CtaBand } from '../components/CtaBand';
import { Faq } from '../components/Faq';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Integrations } from '../components/Integrations';
import { InterviewSplit } from '../components/InterviewSplit';
import { LogoMarquee } from '../components/LogoMarquee';
import { Metrics } from '../components/Metrics';
import { Pricing } from '../components/Pricing';
import { Products } from '../components/Products';
import { Solutions } from '../components/Solutions';
import { WhySwitch } from '../components/WhySwitch';

/** The landing page: the same sections, in the same order, as before the site had inner pages. */
export function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Agents />
      <Products />
      <InterviewSplit />
      <Solutions />
      <HowItWorks />
      <Metrics />
      <WhySwitch />
      <Integrations />
      <CaseStudies />
      <Pricing />
      <About />
      <Faq />
      <CtaBand />
      <Contact />
    </>
  );
}
