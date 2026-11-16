import { useSyncExternalStore } from 'react';
import { prefersReducedMotion } from './motion';

/**
 * Minimal client-side router (History API, no dependency).
 *
 * - `usePath()` re-renders on navigation and on back/forward.
 * - `navigate('/pricing')` or `navigate('/solutions#by-use-case')` changes the
 *   page without a reload. Internal `<a href="/...">` links are picked up by
 *   `interceptLinkClicks()` in App, so plain anchors are all a page needs.
 * - Links that are only a hash (`#contact`) are left to the browser.
 */

const listeners = new Set<() => void>();

const normalize = (pathname: string): string =>
  pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

const getPath = (): string => normalize(window.location.pathname);

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener('popstate', listener);
  window.addEventListener('hashchange', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('popstate', listener);
    window.removeEventListener('hashchange', listener);
  };
};

export function usePath(): string {
  return useSyncExternalStore(subscribe, getPath, () => '/');
}

export function useHash(): string {
  return useSyncExternalStore(subscribe, () => window.location.hash, () => '');
}

/** Scroll to the element a hash names; returns false when it is not on the page. */
export function scrollToHash(hash: string, behavior: ScrollBehavior = 'instant'): boolean {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  const target = id ? document.getElementById(id) : null;
  if (!target) return false;
  target.scrollIntoView({ behavior, block: 'start' });
  return true;
}

export function navigate(to: string): void {
  const url = new URL(to, window.location.origin);
  const samePage = normalize(url.pathname) === getPath();

  if (url.pathname + url.search + url.hash !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.pushState(null, '', url.pathname + url.search + url.hash);
  }
  listeners.forEach((listener) => listener());

  // The store update above renders synchronously; wait a frame for layout.
  requestAnimationFrame(() => {
    if (samePage) {
      const behavior = prefersReducedMotion() ? 'instant' : 'smooth';
      if (url.hash && scrollToHash(url.hash, behavior)) return;
      window.scrollTo({ top: 0, left: 0, behavior });
      return;
    }
    if (url.hash && scrollToHash(url.hash, 'instant')) {
      // Images and canvases above the target settle after first paint; land again once they have.
      window.setTimeout(() => {
        if (window.location.hash === url.hash) scrollToHash(url.hash, 'instant');
      }, 350);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });
}

/** Turns clicks on internal `<a href="/...">` links into client-side navigation. */
export function interceptLinkClicks(): () => void {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event.target instanceof Element ? event.target.closest('a') : null;
    const href = anchor?.getAttribute('href');
    if (!anchor || !href) return;
    if (!href.startsWith('/') || href.startsWith('//')) return;
    // files and the content manager are real documents, not pages of the app
    if (href.startsWith('/assets/') || href === '/admin' || href.startsWith('/admin/')) return;
    if (anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;

    event.preventDefault();
    navigate(href);
  };

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
