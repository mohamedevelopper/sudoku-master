import { useState, useEffect } from 'react';
import { PLAY_STORE_URL, playStoreEnabled, trackPlayStoreClick } from '../utils/playstore';
import { APP_STORE_URL, appStoreEnabled, trackAppStoreClick } from '../utils/appstore';

const DISMISS_KEY = 'sudoku_appbanner_dismissed';
const DISMISS_DAYS = 30;

type Platform = 'ios' | 'android' | 'other';

function AndroidIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={className}>
      <path fill="currentColor" d="M3 3.5v17c0 .6.7.9 1.2.5l13.5-8.5c.5-.3.5-1 0-1.3L4.2 3C3.7 2.6 3 2.9 3 3.5z" />
    </svg>
  );
}

function AppleIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 384 512" width={size} height={size} aria-hidden className={className}>
      <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/**
 * Detect the visitor's platform so we can route to the matching store.
 * Desktop / unrecognized user agents resolve to 'other' — callers should
 * offer BOTH stores rather than silently guessing one.
 */
function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('other');
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const ua = navigator.userAgent;
    const isIOS =
      /iphone|ipad|ipod/i.test(ua) ||
      // iPadOS 13+ reports as Mac but has touch support
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      setPlatform('ios');
    } else if (/android/i.test(ua)) {
      setPlatform('android');
    } else {
      setPlatform('other');
    }
  }, []);
  return platform;
}

/** Resolve store availability + the matching single-store target for the current platform. */
function useStoreTarget() {
  const platform = usePlatform();
  const iosAvailable = appStoreEnabled();
  const androidAvailable = playStoreEnabled();
  const useIOS = platform === 'ios' && iosAvailable;
  const useAndroid = platform === 'android' && androidAvailable;
  // On desktop/unknown platforms, both stores are equally relevant — surface both instead of guessing.
  const showBoth = !useIOS && !useAndroid && androidAvailable && iosAvailable;

  return {
    platform,
    iosAvailable,
    androidAvailable,
    enabled: useIOS || useAndroid || androidAvailable || iosAvailable,
    showBoth,
    isIOS: useIOS,
    url: useIOS ? APP_STORE_URL : PLAY_STORE_URL,
    track: useIOS ? trackAppStoreClick : trackPlayStoreClick,
  };
}

/**
 * Sticky top banner — emphasizes one clear benefit, smart CTA.
 * Shows a single store CTA on a recognized device, or both stores on desktop.
 */
export function AppBanner() {
  const [visible, setVisible] = useState(false);
  const { platform, enabled, showBoth, isIOS, url, track } = useStoreTarget();

  useEffect(() => {
    if (!enabled) return;
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }
    setVisible(true);
  }, [enabled]);

  if (!visible || !enabled) return null;

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setVisible(false);
  };

  const storeName = isIOS ? 'iOS' : 'Android';

  return (
    <div className="app-banner">
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
            Sudoku Master {showBoth ? 'on iOS & Android' : `on ${storeName}`}
            <span className="app-banner-free">FREE</span>
          </div>
          <div className="app-banner-sub">
            {platform === 'ios' || platform === 'android'
              ? '⚡ Install in seconds · Play offline · Ad-free gameplay'
              : '⚡ Play offline · Faster than the web · One-tap from your home screen'}
          </div>
        </div>
        {showBoth ? (
          <div className="app-banner-cta-group">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-banner-cta app-banner-cta-sm"
              onClick={() => trackPlayStoreClick('banner')}
              aria-label="Download the Sudoku Master Android app"
            >
              <AndroidIcon size={13} /><span>Android</span>
            </a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-banner-cta app-banner-cta-sm"
              onClick={() => trackAppStoreClick('banner')}
              aria-label="Download the Sudoku Master iOS app"
            >
              <AppleIcon size={13} /><span>iOS</span>
            </a>
          </div>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="app-banner-cta"
            onClick={() => track('banner')}
            aria-label={`Download the Sudoku Master ${storeName} app`}
          >
            {isIOS ? <AppleIcon size={13} /> : <AndroidIcon size={14} />}
            <span style={{ marginLeft: 5 }}>Install Free</span>
          </a>
        )}
      </div>
      <button className="app-banner-close" onClick={handleDismiss} aria-label="Dismiss">✕</button>
    </div>
  );
}

/**
 * Nav button — eye-catching with pulse animation.
 * On desktop it links to the home promo section, which offers both stores.
 */
export function AppNavButton() {
  const { enabled, showBoth, isIOS, url, track } = useStoreTarget();
  if (!enabled) return null;
  const storeName = isIOS ? 'iOS' : 'Android';

  if (showBoth) {
    return (
      <a
        href="#get-app"
        className="btn-app-nav"
        aria-label="Get the app — free on iOS and Android"
        title="Get the free app"
      >
        <AndroidIcon size={13} className="btn-app-nav-icon" />
        <AppleIcon size={13} className="btn-app-nav-icon" />
        <span className="btn-app-nav-text">Free App</span>
        <span className="btn-app-nav-pulse" aria-hidden />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-app-nav"
      aria-label={`Get the ${storeName} app — free`}
      title={`Get the free ${storeName} app`}
      onClick={() => track('navbar')}
    >
      {isIOS ? <AppleIcon size={15} className="btn-app-nav-icon" /> : <AndroidIcon size={16} className="btn-app-nav-icon" />}
      <span className="btn-app-nav-text">Free App</span>
      <span className="btn-app-nav-pulse" aria-hidden />
    </a>
  );
}

/**
 * Sidebar card — emphasizes offline & ad-free.
 * Shows a single store link on a recognized device, or both stores on desktop.
 */
export function AppSidebarCard() {
  const { enabled, showBoth, isIOS, url, track } = useStoreTarget();
  if (!enabled) return null;
  const storeName = isIOS ? 'iOS' : 'Android';

  return (
    <div className="sidebar-section">
      <div className="app-sidebar-card">
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
          {showBoth ? (
            <div className="app-sidebar-cta-group">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="app-sidebar-cta"
                onClick={() => trackPlayStoreClick('sidebar')}
              >
                <AndroidIcon size={11} /> Android
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="app-sidebar-cta"
                onClick={() => trackAppStoreClick('sidebar')}
              >
                <AppleIcon size={11} /> iOS
              </a>
            </div>
          ) : (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="app-sidebar-cta"
              onClick={() => track('sidebar')}
            >
              {isIOS ? <AppleIcon size={10} /> : <AndroidIcon size={11} />}
              Install on {storeName}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/** Official-style "Download on the App Store" badge (self-drawn SVG — Apple does not allow public hotlinking of their artwork). */
function AppStoreBadge({ onClick }: { onClick: () => void }) {
  if (!appStoreEnabled()) return null;
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="app-store-badge"
      onClick={onClick}
      aria-label="Download on the App Store"
    >
      <svg viewBox="0 0 200 60" width="200" height="60" role="img" aria-hidden>
        <rect x="0.5" y="0.5" width="199" height="59" rx="10" fill="#000" stroke="#a6a6a6" strokeWidth="1" />
        <g transform="translate(18,14) scale(0.068)" fill="#fff">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </g>
        <text x="54" y="24" fontFamily="-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif" fontSize="10" fill="#fff">Download on the</text>
        <text x="53" y="44" fontFamily="-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif" fontSize="19" fontWeight="600" fill="#fff">App Store</text>
      </svg>
    </a>
  );
}

/**
 * Big home section — the conversion-focused one.
 * Includes: promo banner image, benefit grid, trust signals, and both store badges.
 */
export function AppHomeSection() {
  const platform = usePlatform();
  const androidAvailable = playStoreEnabled();
  const iosAvailable = appStoreEnabled();
  if (!androidAvailable && !iosAvailable) return null;

  return (
    <section className="app-promo" id="get-app" aria-label="Get the app">
      <div className="app-promo-glow" aria-hidden />

      <div className="app-promo-header">
        <span className="app-promo-tag">📱 New · iOS & Android App</span>
        <h2>Take Sudoku Master with you</h2>
        <p className="app-promo-lede">
          Same puzzles, same themes — now in your pocket.
          {' '}<strong>Play anywhere, even offline.</strong>
        </p>
      </div>

      <img
        src="/images/app-promo-banner.jpg"
        alt="Sudoku Master app — 16x16 grid gameplay, 5 grid sizes, daily challenges, achievements, stats tracking, and smart tools like notes, hints, and undo"
        className="app-promo-banner"
        width={1600} height={782}
        loading="lazy"
      />

      <div className="app-promo-grid">
        {/* Phone mockup */}
        <div className="app-promo-phone">
          <div className="app-promo-phone-frame">
            <div className="app-promo-phone-notch" />
            <div className="app-promo-phone-screen">
              <img
                src="/favicon/web-app-manifest-512x512.png"
                alt="Sudoku Master app icon"
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
            <div className="store-badges-row">
              {androidAvailable && (
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
              )}
              {iosAvailable && <AppStoreBadge onClick={() => trackAppStoreClick('home_badge')} />}
            </div>
            <div className="app-promo-trust">
              <span className="app-promo-trust-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#01875F" aria-hidden>
                  <path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3zm-1 14l-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z"/>
                </svg>
                Verified on Google Play &amp; App Store
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
            {platform === 'other' && (
              <div className="app-promo-desktop-hint">
                💻 On desktop? Open this page on your iPhone or Android phone to install.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
