import type { ReactElement } from 'react';
import type { IconName } from '../data/content';

type StrokeIconName = Exclude<IconName, 'play'>;

const strokePaths: Record<StrokeIconName, ReactElement> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  sliders: <path d="M4 6h16M7 12h10M10 18h4" />,
  'clipboard-check': (
    <>
      <path d="M9 11l3 3 8-8" />
      <path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" />
    </>
  ),
  video: (
    <>
      <rect x="2" y="6" width="13" height="12" rx="2" />
      <path d="M15 10l7-3v10l-7-3" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 6-7" />
    </>
  ),
  building: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  pulse: (
    <>
      <path d="M20.8 8.6a5.5 5.5 0 00-9.8-3.4 5.5 5.5 0 00-9.8 3.4c0 6 9.8 11.4 9.8 11.4s9.8-5.4 9.8-11.4z" />
      <path d="M6 12h4l1.5-3 2 5L15 12h3" />
    </>
  ),
  bank: (
    <>
      <path d="M3 21h18M4 18h16M6 18V9m4 9V9m4 9V9m4 9V9" />
      <path d="M12 3L3 8h18l-9-5z" />
    </>
  ),
  factory: (
    <>
      <path d="M2 20h20M4 20V9l6-5 6 5v11" />
      <path d="M16 20v-6h4v6M8 12h2m-2 4h2" />
    </>
  ),
  cart: (
    <>
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6L5 3H2" />
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13a8 8 0 0116 0" />
      <rect x="2" y="13" width="5" height="7" rx="2" />
      <rect x="17" y="13" width="5" height="7" rx="2" />
      <path d="M20 19a3 3 0 01-3 3h-3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </>
  ),
  'chevron-left': <path d="M15 18l-6-6 6-6" />,
  'chevron-right': <path d="M9 6l6 6-6 6" />,
  'chevron-down': <path d="M6 9l6 6 6-6" />,
  pause: <path d="M9 5v14M15 5v14" />,
  chat: (
    <>
      <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
      <path d="M9 11h6M9 14h3" />
    </>
  ),
  'file-check': (
    <>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M9 14l2 2 4-4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0113 0M16 4.6a3.5 3.5 0 010 6.8M18 14.2a6.5 6.5 0 013.5 5.8" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 15l-3-3c1-5 4-8.5 10-9-.5 6-4 9-9 10z" />
      <path d="M9 12l-4 1 2-4.5M12 15l-1 4 4.5-2M5 19l2.5-2.5" />
      <circle cx="15" cy="9" r="1.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5-10-5z" />
      <path d="M6 11.5V16c2 2 10 2 12 0v-4.5M22 9v6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 00-14.5-4M4 13a8 8 0 0014.5 4" />
      <path d="M5 3v4h4M19 21v-4h-4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12.5l9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  handshake: (
    <>
      <path d="M2 8l4-2 5 2 3-2 4 2 4-2v9l-4 2-3-1.5" />
      <path d="M11 8l-4 4a1.8 1.8 0 002.6 2.6L11 13.2l4.2 4.3a1.7 1.7 0 002.4-2.4L14 11.5M2 8v8l5 3" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 10v4a1 1 0 001 1h3l8 4V5L7 9H4a1 1 0 00-1 1z" />
      <path d="M18 9a4 4 0 010 6M8 15l1.5 5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
};

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 2 }: IconProps) {
  if (name === 'play') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5.5v13l11-6.5-11-6.5z" />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {strokePaths[name]}
    </svg>
  );
}
