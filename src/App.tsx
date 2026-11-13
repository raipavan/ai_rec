import { useEffect } from 'react';
import { About } from './components/About';
import { Agents } from './components/Agents';
import { Contact } from './components/Contact';
import { CtaBand } from './components/CtaBand';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Integrations } from './components/Integrations';
import { InterviewSplit } from './components/InterviewSplit';
import { LogoMarquee } from './components/LogoMarquee';
import { Metrics } from './components/Metrics';
import { Pricing } from './components/Pricing';
import { Products } from './components/Products';
import { Solutions } from './components/Solutions';
import { CaseStudies } from './components/CaseStudies';
import { WhySwitch } from './components/WhySwitch';

const SPOTLIT = '.card, .int-tile, .case-card, .faq-item, .why-card, .showcase-stage';

export default function App() {
  // Cards light up under the pointer: one listener feeds the position to CSS.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(SPOTLIT) : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      target.style.setProperty('--my', `${event.clientY - rect.top}px`);
      // 3D tilt: lean toward the pointer, at most 7 degrees
      target.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - 0.5) * 14}deg`);
      target.style.setProperty('--rx', `${(0.5 - (event.clientY - rect.top) / rect.height) * 14}deg`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <>
      <Header />
      <main>
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
      </main>
      <Footer />
    </>
  );
}
