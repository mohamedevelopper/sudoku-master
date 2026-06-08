import { useState, useEffect } from 'react';
import { PLAY_STORE_URL, playStoreEnabled, trackPlayStoreClick } from '../utils/playstore';

const DISMISS_KEY = 'sudoku_appbanner_dismissed';
const DISMISS_DAYS = 30;

/**
 * Detect Android user-agent for smart CTAs.
 */
function useIsAndroid() {
  const [isAndroid, setIsAndroid] = useState(false);
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsAndroid(/android/i.test(navigator.userAgent));
    }
  }, []);
  return isAndroid;
}

/**
 * Sticky top banner — emphasizes one clear benefit, smart CTA.
 */
export function AppBanner() {
  const [visible, setVisible] = useState(false);
  const isAndroid = useIsAndroid();

  useEffect(() => {
    if (!playStoreEnabled()) return;
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }
    setVisible(true);
  }, []);

  if (!visible || !playStoreEnabled()) return null;

  const handleClick = () => trackPlayStoreClick('banner');
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation(); e.preventDefault();
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setVisible(false);
  };

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="app-banner"
      onClick={handleClick}
      aria-label="Download the Sudoku Master Android app"
    >
      <div className="app-banner-content">
        <div className="app-banner-icon-wrap">
          <img
            src="/favicon/web-app-manifest-192x192.png"
            alt=""
            className="app-banner-icon"
            width={40} height={40}
          />
          <span className="app-banner-new-badge">NEW</span>
        </div>
        <div className="app-banner-text">
          <div className="app-banner-title">
            Sudoku Master on Android
            <span className="app-banner-free">FREE</span>
          </div>
          <div className="app-banner-sub">
            {isAndroid
              ? '⚡ Install in seconds · Play offline · Ad-free gameplay'
              : '⚡ Play offline · Faster than the web · One-tap from your home screen'}
          </div>
        </div>
        <div className="app-banner-cta">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden style={{ marginRight: 5 }}>
            <path fill="currentColor" d="M3 3.5v17c0 .6.7.9 1.2.5l13.5-8.5c.5-.3.5-1 0-1.3L4.2 3C3.7 2.6 3 2.9 3 3.5z" />
          </svg>
          <span>{isAndroid ? 'Install Free' : 'Get it Free'}</span>
        </div>
      </div>
      <button className="app-banner-close" onClick={handleDismiss} aria-label="Dismiss">✕</button>
    </a>
  );
}

/**
 * Nav button — eye-catching with pulse animation.
 */
export function AppNavButton() {
  if (!playStoreEnabled()) return null;
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-app-nav"
      aria-label="Get the Android app — free"
      title="Get the free Android app"
      onClick={() => trackPlayStoreClick('navbar')}
    >
      <svg className="btn-app-nav-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
        <path fill="currentColor" d="M3 3.5v17c0 .6.7.9 1.2.5l13.5-8.5c.5-.3.5-1 0-1.3L4.2 3C3.7 2.6 3 2.9 3 3.5z" />
      </svg>
      <span className="btn-app-nav-text">Free App</span>
      <span className="btn-app-nav-pulse" aria-hidden />
    </a>
  );
}

/**
 * Sidebar card — emphasizes offline & ad-free.
 */
export function AppSidebarCard() {
  if (!playStoreEnabled()) return null;
  return (
    <div className="sidebar-section">
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="app-sidebar-card"
        onClick={() => trackPlayStoreClick('sidebar')}
      >
        <div className="app-sidebar-icon-wrap">
          <img
            src="/favicon/web-app-manifest-192x192.png"
            alt="Sudoku Master app"
            className="app-sidebar-icon"
            width={48} height={48}
          />
        </div>
        <div className="app-sidebar-text">
          <div className="app-sidebar-title">
            Get the App <span className="app-sidebar-free-tag">FREE</span>
          </div>
          <div className="app-sidebar-sub">
            <span>✓ Offline</span>
            <span>✓ No browser</span>
          </div>
          <div className="app-sidebar-cta">
            <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden>
              <path fill="currentColor" d="M3 3.5v17c0 .6.7.9 1.2.5l13.5-8.5c.5-.3.5-1 0-1.3L4.2 3C3.7 2.6 3 2.9 3 3.5z" />
            </svg>
            Install on Android
          </div>
        </div>
      </a>
    </div>
  );
}

/**
 * Big home section — the conversion-focused one.
 * Includes: animated phone mockup, benefit grid, trust signals, Google Play badge.
 */
export function AppHomeSection() {
  const isAndroid = useIsAndroid();
  if (!playStoreEnabled()) return null;

  return (
    <section className="app-promo" aria-label="Get the Android app">
      <div className="app-promo-glow" aria-hidden />

      <div className="app-promo-header">
        <span className="app-promo-tag">📱 New · Android App</span>
        <h2>Take Sudoku Master with you</h2>
        <p className="app-promo-lede">
          Same puzzles, same themes — now in your pocket.
          {' '}<strong>Play anywhere, even offline.</strong>
        </p>
      </div>

      <div className="app-promo-grid">
        {/* Phone mockup */}
        <div className="app-promo-phone">
          <div className="app-promo-phone-frame">
            <div className="app-promo-phone-notch" />
            <div className="app-promo-phone-screen">
              <img
                src="/favicon/web-app-manifest-512x512.png"
                alt="Sudoku Master Android app icon"
                className="app-promo-phone-icon"
                width={140} height={140}
              />
              <div className="app-promo-phone-name">Sudoku Master</div>
              <div className="app-promo-phone-tap">Tap to play</div>
            </div>
          </div>
        </div>

        {/* Right side: benefits + CTA */}
        <div className="app-promo-content">
          <div className="app-promo-benefits">
            <div className="app-promo-benefit">
              <div className="app-promo-benefit-icon">📶</div>
              <div>
                <div className="app-promo-benefit-title">Works offline</div>
                <div className="app-promo-benefit-text">
                  Play in airplane mode, on the subway, anywhere — no internet needed.
                </div>
              </div>
            </div>
            <div className="app-promo-benefit">
              <div className="app-promo-benefit-icon">⚡</div>
              <div>
                <div className="app-promo-benefit-title">Faster than the web</div>
                <div className="app-promo-benefit-text">
                  Native performance. Instant loads. Smoother animations.
                </div>
              </div>
            </div>
            <div className="app-promo-benefit">
              <div className="app-promo-benefit-icon">🏠</div>
              <div>
                <div className="app-promo-benefit-title">One tap from your home screen</div>
                <div className="app-promo-benefit-text">
                  No browser, no tabs. Just tap and play whenever you want.
                </div>
              </div>
            </div>
            <div className="app-promo-benefit">
              <div className="app-promo-benefit-icon">🎯</div>
              <div>
                <div className="app-promo-benefit-title">All features included</div>
                <div className="app-promo-benefit-text">
                  5 grid sizes, 6 difficulties, daily puzzle, all themes — same as the web.
                </div>
              </div>
            </div>
          </div>

          <div className="app-promo-cta-wrap">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="google-play-badge"
              onClick={() => trackPlayStoreClick('home_badge')}
              aria-label="Get it on Google Play — free"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={200} height={62}
              />
            </a>
            <div className="app-promo-trust">
              <span className="app-promo-trust-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#01875F" aria-hidden>
                  <path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3zm-1 14l-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z"/>
                </svg>
                Verified on Google Play
              </span>
              <span className="app-promo-trust-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#01875F" aria-hidden>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Free forever
              </span>
              <span className="app-promo-trust-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#01875F" aria-hidden>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                No subscription
              </span>
            </div>
            {!isAndroid && (
              <div className="app-promo-desktop-hint">
                💻 On desktop? Open this page on your Android phone to install.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}