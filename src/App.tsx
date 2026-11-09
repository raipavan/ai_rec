import { About } from './components/About';
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
import { Stories } from './components/Stories';
import { WhySwitch } from './components/WhySwitch';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <Products />
        <InterviewSplit />
        <Solutions />
        <HowItWorks />
        <Metrics />
        <WhySwitch />
        <Integrations />
        <Stories />
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
