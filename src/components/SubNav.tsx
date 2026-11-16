interface SubNavLink {
  label: string;
  href: string;
}

interface SubNavProps {
  label: string;
  links: SubNavLink[];
  /** The `href` of the link to mark as current. */
  current?: string;
  /** `page` for links between pages, `location` for sections of one page. */
  currentKind?: 'page' | 'location';
}

/** Second-level navigation that sticks under the header. Scrolls sideways on narrow screens. */
export function SubNav({ label, links, current, currentKind = 'page' }: SubNavProps) {
  return (
    <nav className="subnav" aria-label={label}>
      <div className="container">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} aria-current={link.href === current ? currentKind : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
