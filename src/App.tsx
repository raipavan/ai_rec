import { useEffect, useRef } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { interceptLinkClicks, scrollToHash, usePath } from './lib/router';
import { notFound, pageTitle, routes } from './routes';

const SPOTLIT = '.card, .int-tile, .case-card, .faq-item, .why-card, .showcase-stage';
const DESCRIPTION = 'meta[name="description"]';

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

  const path = usePath();
  const route = routes[path] ?? notFound;
  const mainRef = useRef<HTMLElement>(null);
  const previousRoute = useRef(route);

  // Internal links change the page without a reload
  useEffect(() => interceptLinkClicks(), []);

  // Tab title and description follow the page; after a navigation, focus moves
  // to the new content so keyboard and screen-reader users start at its top.
  useEffect(() => {
    document.title = pageTitle(route);
    document.querySelector(DESCRIPTION)?.setAttribute('content', route.description);

    if (previousRoute.current === route) {
      // A deep link with a hash (/solutions#by-use-case) loads before its target exists
      if (window.location.hash) requestAnimationFrame(() => scrollToHash(window.location.hash));
      return;
    }
    previousRoute.current = route;
    mainRef.current?.focus({ preventScroll: true });
  }, [route]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" className="page" ref={mainRef} tabIndex={-1} key={path}>
        {route.render()}
      </main>
      <Footer />
    </>
  );
}
