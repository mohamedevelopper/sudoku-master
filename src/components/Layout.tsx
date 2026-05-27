import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeType } from '../types';
import { THEMES, themeClassName } from '../utils/themes';
import { SUPPORT_URL, SUPPORT_LABEL, SUPPORT_EMOJI, supportEnabled } from '../utils/support';

interface LayoutProps {
  children: React.ReactNode;
  theme: ThemeType;
  onChangeTheme: (t: ThemeType) => void;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
}

const NAV_LINKS = [
  { to: '/', label: 'Play' },
  { to: '/daily', label: 'Daily' },
  { to: '/how-to-play', label: 'How to Play' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/printable', label: 'Printable' },
];

export default function Layout({ children, theme, onChangeTheme, sfxEnabled, onToggleSfx }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Apply theme class to <html> so it covers everything (modals etc.)
  useEffect(() => {
    const cls = themeClassName(theme);
    document.documentElement.className = cls;
  }, [theme]);

  // Sync sidebar state to body class so game pages can observe it
  useEffect(() => {
    if (sidebarOpen) document.body.classList.add('sidebar-open');
    else document.body.classList.remove('sidebar-open');
  }, [sidebarOpen]);

  const cycleTheme = () => {
    const idx = THEMES.findIndex((t) => t.id === theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    onChangeTheme(next.id);
  };

  return (
    <>
      <nav id="nav" role="navigation">
        <Link to="/" className="nav-logo" aria-label="Sudoku Master Home">
          <img
            src="/favicon/web-app-manifest-192x192.png"
            alt="Sudoku Master logo"
            className="nav-logo-img"
            width={34}
            height={34}
          />
          <span className="nav-logo-text">SudokuMaster<span>.vip</span></span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} className={active ? 'active' : ''}>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-actions">
          {supportEnabled() && (
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-coffee"
              aria-label={SUPPORT_LABEL}
              title={SUPPORT_LABEL}
              onClick={() => {
                // @ts-ignore
                if (window.gtag) window.gtag('event', 'support_click', { source: 'navbar' });
              }}
            >
              <span style={{ fontSize: 14 }}>{SUPPORT_EMOJI}</span>
              <span className="btn-coffee-text">Coffee</span>
            </a>
          )}
          <button className="nav-icon-btn" onClick={onToggleSfx} aria-label="Toggle sound" title="Toggle sound">
            {sfxEnabled ? '🔊' : '🔇'}
          </button>
          <button className="nav-icon-btn" onClick={cycleTheme} aria-label="Change theme" title="Change theme">
            🎨
          </button>
          <button
            id="menu-toggle"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div id="sidebar-overlay" className={sidebarOpen ? 'show' : ''} onClick={() => setSidebarOpen(false)} />

      {/* The game pages render their own #app grid with sidebar + main.
          Other pages render directly inside this. The body class lets
          PlayPage/DailyPage observe sidebar state via MutationObserver. */}
      {children}

      <Footer />
      <CookieBanner />
    </>
  );
}

function Footer() {
  return (
    <footer role="contentinfo">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Play</h4>
          <ul>
            <li><Link to="/">Play Sudoku</Link></li>
            <li><Link to="/easy-sudoku">Easy</Link></li>
            <li><Link to="/medium-sudoku">Medium</Link></li>
            <li><Link to="/hard-sudoku">Hard</Link></li>
            <li><Link to="/expert-sudoku">Expert</Link></li>
            <li><Link to="/daily">Daily Puzzle</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Grid sizes</h4>
          <ul>
            <li><Link to="/?size=4">4×4 Mini</Link></li>
            <li><Link to="/?size=6">6×6</Link></li>
            <li><Link to="/?size=9">9×9 Classic</Link></li>
            <li><Link to="/?size=12">12×12</Link></li>
            <li><Link to="/?size=16">16×16 Giant</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Learn</h4>
          <ul>
            <li><Link to="/how-to-play">How to Play</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/printable">Printable</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {supportEnabled() && (
              <li>
                <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                  {SUPPORT_EMOJI} Support us
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/cookies">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 SudokuMaster.vip — Free Online Sudoku. No login. No ads while you think.
        {supportEnabled() && (
          <>
            {' · '}
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--c-primary)', fontWeight: 600 }}
            >
              {SUPPORT_EMOJI} {SUPPORT_LABEL}
            </a>
          </>
        )}
      </div>
    </footer>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('sudoku_master_cookie_consent')) {
      setVisible(true);
    }
  }, []);
  if (!visible) return null;

  const accept = (choice: 'all' | 'essential') => {
    localStorage.setItem('sudoku_master_cookie_consent', choice);
    setVisible(false);
  };

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-text">
        🍪 We use cookies for analytics and personalized ads. See our{' '}
        <Link to="/cookies" style={{ color: 'var(--c-primary)' }}>Cookie Policy</Link>.
      </div>
      <button className="cookie-btn decline" onClick={() => accept('essential')}>Essential only</button>
      <button className="cookie-btn accept" onClick={() => accept('all')}>Accept all</button>
    </div>
  );
}
