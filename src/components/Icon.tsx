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
