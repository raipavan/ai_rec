import { useEffect, useRef, useState } from 'react';
import { heroRoles, heroStages } from '../data/content';
import { enterDelay, prefersReducedMotion, useSceneDepth } from '../lib/motion';
import { useAutoRotate } from '../lib/useAutoRotate';
import { Icon } from './Icon';

/** Swaps the role in the headline every few seconds. Static under reduced motion. */
function useRotatingRole(count: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [count]);

  return index;
}

export function Hero() {
  const role = useRotatingRole(heroRoles.length);
  const journey = useAutoRotate<HTMLDivElement>(heroStages.length, 3400);
  const sectionRef = useRef<HTMLElement>(null);
  useSceneDepth(sectionRef);

  // Subtle 3D tilt on pointer move
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty('--px', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
      section.style.setProperty('--py', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
    };
    section.addEventListener('pointermove', onMove, { passive: true });
    return () => section.removeEventListener('pointermove', onMove);
  }, []);

  const activeStage = heroStages[journey.index] ?? heroStages[0];

  return (
    <section className="hero hero--centered on-dark" id="home" ref={sectionRef}>
      <span className="hero-bg" aria-hidden="true" />
      <span className="hero-atmosphere" aria-hidden="true" />
      <span className="grain" aria-hidden="true" />

      <div className="container">
        <div className="hero-centered-copy">
          <h1 className="enter" style={enterDelay(0)}>
            <span className="sr-only">The intelligent platform for modern recruiting teams.</span>
            <span aria-hidden="true">
              The intelligent platform
              <br />
              for hiring{' '}
              <span className="role-swap">
                <span className="accent role-word" key={role}>
                  {heroRoles[role]}
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-centered-lede enter" style={enterDelay(1)}>
            AI-powered tools that help recruiting teams source candidates, automate screening, and
            make smarter hiring decisions — all from one connected platform.
          </p>

          <div className="hero-centered-ctas enter" style={enterDelay(2)}>
            <a className="btn btn-hero-solid" href="/get-started">
              Get Started For Free
            </a>
            <a className="btn btn-hero-glass" href="#demo">
              <Icon name="play" className="icon" />
              Watch 30-sec tour
            </a>
          </div>
        </div>

        {/* Aurevia-inspired Dark Frosted-Glass Command Dashboard */}
        <div
          className="aurevia-dash-wrap enter"
          style={enterDelay(2, 140)}
          ref={journey.ref}
          {...journey.holdProps}
        >
          <div className="aurevia-dash">
            {/* Topbar */}
            <div className="av-topbar">
              <div className="av-topbar-left">
                <span className="av-brand-circle">TP</span>
                <div className="av-date-nav" aria-hidden="true">
                  <Icon name="chevron-left" />
                  <span>Mon, 17 Nov 2026</span>
                  <Icon name="chevron-right" />
                </div>
              </div>
              <div className="av-topbar-right">
                <div className="av-ai-badge" aria-hidden="true">
                  <img
                    src="/assets/hero-ai-glass.jpg"
                    alt="3D Refractive Glass AI Assistant"
                    className="av-ai-glass-img"
                  />
                  <div className="av-ai-status">
                    <span className="av-status-dot" />
                    <span>
                      <strong>{activeStage.label}</strong> · {activeStage.status}
                    </span>
                  </div>
                </div>
                <span className="av-history-pill">
                  <Icon name="refresh" />
                  Chat history
                </span>
              </div>
            </div>

            {/* Body Grid: Sidebar + Main */}
            <div className="av-body">
              <aside className="av-sidebar" aria-hidden="true">
                <span className="av-side-item">
                  <Icon name="search" />
                  <span>Search</span>
                </span>
                <span className="av-side-item is-active">
                  <Icon name="layout" />
                  <span>Overview</span>
                </span>
                <span className="av-side-item">
                  <Icon name="users" />
                  <span>Pipeline</span>
                </span>
                <span className="av-side-item">
                  <Icon name="video" />
                  <span>Interviews</span>
                </span>
              </aside>

              <div className="av-main">
                {/* Greeting & Quick Actions */}
                <div className="av-greeting-row">
                  <div>
                    <h2 className="av-greeting">Good morning, Sophie</h2>
                    <p className="av-greeting-sub">
                      Here&apos;s a quick overview of your hiring pipeline today.
                    </p>
                  </div>
                  <div className="av-actions">
                    <span className="av-pill">
                      <Icon name="cpu" /> Ask AI
                    </span>
                    <a href="/get-started" className="av-pill av-pill--white">
                      + New requisition
                    </a>
                    <span className="av-pill">Upload resumes</span>
                    <span className="av-pill">This month</span>
                  </div>
                </div>

                {/* 4 KPI Cards Row */}
                <div className="av-kpis">
                  <div className="av-kpi-card">
                    <div className="av-kpi-top">
                      <div>
                        <span className="av-kpi-lbl">Total Candidates</span>
                        <strong>2,840</strong>
                      </div>
                      <span className="av-kpi-icon">
                        <Icon name="users" />
                      </span>
                    </div>
                    <span className="av-kpi-delta is-up">↑ 12.4% vs last month</span>
                  </div>

                  <div className="av-kpi-card">
                    <div className="av-kpi-top">
                      <div>
                        <span className="av-kpi-lbl">Shortlisted Matches</span>
                        <strong>864</strong>
                      </div>
                      <span className="av-kpi-icon av-kpi-icon--green">↗</span>
                    </div>
                    <span className="av-kpi-delta is-up">↑ 8.2% vs last month</span>
                  </div>

                  <div className="av-kpi-card">
                    <div className="av-kpi-top">
                      <div>
                        <span className="av-kpi-lbl">Median Time-to-Hire</span>
                        <strong>19 days</strong>
                      </div>
                      <span className="av-kpi-icon av-kpi-icon--coral">↘</span>
                    </div>
                    <span className="av-kpi-delta is-up">↓ 68% vs last month</span>
                  </div>

                  <div className="av-kpi-card">
                    <div className="av-kpi-top">
                      <div>
                        <span className="av-kpi-lbl">Active Requisitions</span>
                        <strong>16</strong>
                      </div>
                    </div>
                    <span className="av-kpi-delta is-up">↑ 3 new this month</span>
                  </div>
                </div>

                {/* 2 Charts Row */}
                <div className="av-charts">
                  {/* Left: Area Spline Chart */}
                  <div className="av-chart-card av-chart-card--area">
                    <div className="av-chart-head">
                      <div>
                        <span className="av-kpi-lbl">Pipeline &amp; Shortlists</span>
                        <div className="av-chart-big-row">
                          <strong>2,840</strong>
                          <span className="av-kpi-delta is-up">↑ 12.4% vs last month</span>
                        </div>
                      </div>
                      <div className="av-chart-meta">
                        <span className="av-dot-lbl">
                          <i style={{ background: '#818CF8' }} /> Applied
                        </span>
                        <span className="av-dot-lbl">
                          <i style={{ background: '#34D399' }} /> Shortlisted
                        </span>
                        <span className="av-pill av-pill--sm">This month ▾</span>
                      </div>
                    </div>

                    <div className="av-area-plot">
                      <svg viewBox="0 0 520 150" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                          <linearGradient id="avAppliedGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.02" />
                          </linearGradient>
                          <linearGradient id="avShortlistGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#34D399" stopOpacity="0.38" />
                            <stop offset="100%" stopColor="#34D399" stopOpacity="0.02" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid Lines + Y Labels */}
                        <line x1="34" y1="22" x2="512" y2="22" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        <line x1="34" y1="54" x2="512" y2="54" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        <line x1="34" y1="86" x2="512" y2="86" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        <line x1="34" y1="118" x2="512" y2="118" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        <text x="6" y="26" fill="rgba(255,255,255,0.42)" fontSize="9">4K</text>
                        <text x="6" y="58" fill="rgba(255,255,255,0.42)" fontSize="9">3K</text>
                        <text x="6" y="90" fill="rgba(255,255,255,0.42)" fontSize="9">2K</text>
                        <text x="6" y="122" fill="rgba(255,255,255,0.42)" fontSize="9">1K</text>

                        {/* Purple Applied Series */}
                        <path
                          d="M36 96 C95 88, 130 74, 185 78 C240 82, 295 56, 360 44 C415 34, 460 42, 512 36 L512 126 L36 126 Z"
                          fill="url(#avAppliedGrad)"
                        />
                        <path
                          d="M36 96 C95 88, 130 74, 185 78 C240 82, 295 56, 360 44 C415 34, 460 42, 512 36"
                          fill="none"
                          stroke="#818CF8"
                          strokeWidth="2"
                        />

                        {/* Emerald Shortlisted Series */}
                        <path
                          d="M36 112 C100 108, 145 98, 200 100 C255 102, 310 80, 360 72 C415 64, 465 70, 512 64 L512 126 L36 126 Z"
                          fill="url(#avShortlistGrad)"
                        />
                        <path
                          d="M36 112 C100 108, 145 98, 200 100 C255 102, 310 80, 360 72 C415 64, 465 70, 512 64"
                          fill="none"
                          stroke="#34D399"
                          strokeWidth="2"
                        />

                        {/* Dashed vertical highlight at x=360 */}
                        <line x1="360" y1="20" x2="360" y2="126" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="360" cy="44" r="4.5" fill="#ffffff" stroke="#818CF8" strokeWidth="2.5" />
                        <circle cx="360" cy="72" r="4" fill="#ffffff" stroke="#34D399" strokeWidth="2" />

                        {/* Floating Tooltip */}
                        <rect x="304" y="6" width="112" height="28" rx="6" fill="rgba(12,16,15,0.92)" stroke="rgba(255,255,255,0.18)" />
                        <text x="360" y="18" textAnchor="middle" fill="rgba(255,255,255,0.68)" fontSize="8">16 Nov 2026</text>
                        <text x="360" y="29" textAnchor="middle" fill="#6EE7B7" fontSize="9" fontWeight="700">864 Shortlisted</text>

                        {/* X Axis Labels */}
                        <text x="42" y="142" fill="rgba(255,255,255,0.45)" fontSize="9">1 Nov</text>
                        <text x="155" y="142" fill="rgba(255,255,255,0.45)" fontSize="9">6 Nov</text>
                        <text x="260" y="142" fill="rgba(255,255,255,0.45)" fontSize="9">11 Nov</text>
                        <text x="360" y="142" fill="rgba(255,255,255,0.75)" fontSize="9" fontWeight="600">16 Nov</text>
                        <text x="468" y="142" fill="rgba(255,255,255,0.45)" fontSize="9">21 Nov</text>
                      </svg>
                    </div>
                  </div>

                  {/* Right: Donut Chart */}
                  <div className="av-chart-card av-chart-card--donut">
                    <div className="av-chart-head">
                      <span className="av-kpi-lbl">Candidates by stage</span>
                    </div>
                    <div className="av-donut-row">
                      <div className="av-donut-wrap">
                        <svg viewBox="0 0 110 110" className="av-donut-svg" aria-hidden="true">
                          <circle cx="55" cy="55" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                          <circle cx="55" cy="55" r="40" fill="none" stroke="#818CF8" strokeWidth="12" strokeDasharray="81 251" strokeDashoffset="0" />
                          <circle cx="55" cy="55" r="40" fill="none" stroke="#FBBF24" strokeWidth="12" strokeDasharray="60 251" strokeDashoffset="-83" />
                          <circle cx="55" cy="55" r="40" fill="none" stroke="#34D399" strokeWidth="12" strokeDasharray="47 251" strokeDashoffset="-145" />
                          <circle cx="55" cy="55" r="40" fill="none" stroke="#60A5FA" strokeWidth="12" strokeDasharray="34 251" strokeDashoffset="-194" />
                          <circle cx="55" cy="55" r="40" fill="none" stroke="#C084FC" strokeWidth="12" strokeDasharray="24 251" strokeDashoffset="-229" />
                        </svg>
                        <div className="av-donut-center">
                          <strong>2,840</strong>
                          <span>Total pipeline</span>
                        </div>
                      </div>
                      <ul className="av-legend">
                        <li><i style={{ background: '#818CF8' }} /><span>Sourced</span><strong>32.4%</strong></li>
                        <li><i style={{ background: '#FBBF24' }} /><span>Screened</span><strong>24.1%</strong></li>
                        <li><i style={{ background: '#34D399' }} /><span>Assessed</span><strong>18.8%</strong></li>
                        <li><i style={{ background: '#60A5FA' }} /><span>Interview</span><strong>13.5%</strong></li>
                        <li><i style={{ background: '#C084FC' }} /><span>Offer</span><strong>11.2%</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom 2 Panels Row */}
                <div className="av-bottom-grid">
                  <div className="av-bottom-card">
                    <div className="av-bottom-head">
                      <span>Recent candidate activity</span>
                      <a href="/products/talent-sourcing">View all →</a>
                    </div>
                    <div className="av-activity-rows">
                      <div className="av-activity-row">
                        <strong>Priya Sundaram</strong>
                        <span className="av-muted">FinTech Labs</span>
                        <span className="av-muted">Req #AI-0012</span>
                        <span className="av-match-pos">+96% Match</span>
                        <span className="av-time">Today, 09:41 AM</span>
                      </div>
                      <div className="av-activity-row">
                        <strong>Marcus Vance</strong>
                        <span className="av-muted">CloudScale</span>
                        <span className="av-muted">Technical Screen</span>
                        <span className="av-match-pos">+92% Match</span>
                        <span className="av-time">Today, 08:12 AM</span>
                      </div>
                    </div>
                  </div>

                  <div className="av-bottom-card">
                    <div className="av-bottom-head">
                      <span>Upcoming interviews</span>
                    </div>
                    <div className="av-reminder-rows">
                      <div className="av-reminder-row">
                        <span className="av-rem-icon"><Icon name="video" /></span>
                        <div>
                          <strong>Panel interview with Priya S.</strong>
                          <span>Req #AI-0012 · Due today</span>
                        </div>
                      </div>
                      <div className="av-reminder-row">
                        <span className="av-rem-icon"><Icon name="clipboard-check" /></span>
                        <div>
                          <strong>Q4 Engineering hiring calibration</strong>
                          <span>14 roles active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Stage Switcher Bar */}
                <div className="dash-journey-bar" role="group" aria-label="Follow one requisition through the platform">
                  <ol className="journey-rail">
                    {heroStages.map((item, i) => (
                      <li
                        key={item.label}
                        className={i < journey.index ? 'is-done' : i === journey.index ? 'is-active' : undefined}
                      >
                        <button type="button" onClick={() => journey.select(i)}>
                          <span className="rail-dot" aria-hidden="true" />
                          <span className="rail-label">{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
