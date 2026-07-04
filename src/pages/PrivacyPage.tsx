import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="page-content">
      <div className="crumbs"><Link to="/">Home</Link> › Privacy Policy</div>
      <h1>🛡️ Privacy Policy</h1>
      <p className="lead">
        <strong>Last updated:</strong> July 4, 2026 · <strong>Effective:</strong> July 4, 2026
      </p>

      <div className="info-card" style={{ background: 'var(--c-primary-l)', borderColor: 'var(--c-primary)' }}>
        <strong>Quick summary.</strong> Sudoku Master is a free Sudoku game available as a website
        (sudokumaster.vip), an Android application, and an iOS application. We do not require an account.
        We collect minimal analytics data, and we show ads via Google AdSense (web) and Google AdMob
        (Android and iOS apps) to keep the service free. On iOS, we only use your device's advertising
        identifier (IDFA) if you grant permission via Apple's App Tracking Transparency prompt — otherwise
        you'll only see non-personalized ads. We do not sell your personal information.
      </div>

      <h2>1. Who we are</h2>
      <p>
        Sudoku Master ("we", "our", "us") operates:
      </p>
      <ul>
        <li>The <strong>website</strong> at <a href="https://sudokumaster.vip">https://sudokumaster.vip</a></li>
        <li>The <strong>Android application</strong> "Sudoku Master" distributed via Google Play</li>
        <li>The <strong>iOS application</strong> "Sudoku Master" distributed via the Apple App Store</li>
      </ul>
      <p>
        Contact for privacy matters: <a href="mailto:sudokumaster.vip@gmail.com">sudokumaster.vip@gmail.com</a>
      </p>

      <h2>2. Information we collect</h2>

      <h3>2.1 Information you provide directly</h3>
      <p>
        We do not require registration or login. The only personal information you provide directly is when
        you choose to email us at our contact address.
      </p>

      <h3>2.2 Locally stored information (on your device)</h3>
      <p>
        We store the following <strong>only on your device</strong> (browser local storage / Android internal
        storage / iOS app storage). This data <strong>never leaves your device</strong> and is never sent to us:
      </p>
      <ul>
        <li>Your current puzzle progress</li>
        <li>Game statistics (puzzles solved, best times, win rate)</li>
        <li>Daily-streak history (completed dates)</li>
        <li>Your selected theme and audio preferences</li>
        <li>Cookie / consent choices</li>
      </ul>

      <h3>2.3 Information collected automatically</h3>
      <p>
        When you visit our website or use our Android or iOS app, the following is collected automatically by
        our third-party providers (see Section 4):
      </p>
      <ul>
        <li>
          <strong>Device & technical info:</strong> Device type, operating system, browser type, screen size,
          language, country (approximate, derived from IP — not precise location).
        </li>
        <li>
          <strong>Usage data:</strong> Pages visited, time on page, clicks, referring URL, session duration,
          which features of the game you use.
        </li>
        <li>
          <strong>Advertising identifier (Android app):</strong> Android Advertising ID for serving ads
          via AdMob. You can reset or limit this in your device settings.
        </li>
        <li>
          <strong>Advertising identifier (iOS app):</strong> On first launch, our iOS app asks for your
          permission via Apple's <strong>App Tracking Transparency (ATT)</strong> framework before using your
          device's advertising identifier (IDFA). If you tap "Allow," AdMob may use the IDFA to show more
          relevant ads and measure ad performance. If you tap "Ask App Not to Track" (or ATT permission is
          otherwise not granted), we do not access the IDFA — AdMob instead serves{' '}
          <strong>non-personalized ads</strong> using Apple's <strong>SKAdNetwork</strong> for privacy-preserving
          install attribution. You can change this choice anytime in{' '}
          <strong>iOS Settings → Privacy & Security → Tracking</strong>.
        </li>
        <li>
          <strong>IP address:</strong> Used by Google for analytics and ad serving. Google Analytics is
          configured with IP anonymization (<code>anonymize_ip: true</code>).
        </li>
      </ul>

      <h2>3. How we use information</h2>
      <p>We use the information described above to:</p>
      <ul>
        <li>Provide and improve the Sudoku game</li>
        <li>Save your progress and statistics on your own device</li>
        <li>Understand how users interact with the game (aggregate analytics only)</li>
        <li>Show advertisements to fund the free service</li>
        <li>Comply with legal obligations</li>
      </ul>
      <p>
        We do <strong>not</strong> use information to build user profiles, profile children, or sell data to data
        brokers.
      </p>

      <h2>4. Third-party services we use</h2>
      <p>
        We use the following third-party services that may collect or process data on our behalf. Each operates
        under its own privacy policy:
      </p>

      <div className="info-card">
        <h3>Google Analytics 4 (web)</h3>
        <p>
          <strong>Purpose:</strong> Anonymous traffic and feature usage analytics.<br />
          <strong>Data:</strong> Anonymized IP, device type, page views, events, approximate country.<br />
          <strong>Privacy:</strong>{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer noopener">
            Google Privacy Policy
          </a>{' '}
          ·{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer noopener">
            Opt out
          </a>
        </p>
      </div>

      <div className="info-card">
        <h3>Google AdSense (web)</h3>
        <p>
          <strong>Purpose:</strong> Displaying ads on the website.<br />
          <strong>Data:</strong> Cookies and similar technology for ad personalization (when consented),
          frequency capping, and ad measurement.<br />
          <strong>Privacy:</strong>{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer noopener">
            How Google uses ad data
          </a>{' '}
          ·{' '}
          <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer noopener">
            Ad Settings
          </a>
        </p>
      </div>

      <div className="info-card">
        <h3>Google AdMob (Android app)</h3>
        <p>
          <strong>Purpose:</strong> Displaying ads inside the Android app.<br />
          <strong>Data:</strong> Android Advertising ID, device info, IP address, app interaction events.
          Used for ad delivery, ad measurement, fraud prevention, and (with consent) personalization.<br />
          <strong>Privacy:</strong>{' '}
          <a href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noreferrer noopener">
            AdMob policies
          </a>
        </p>
      </div>

      <div className="info-card">
        <h3>Google AdMob (iOS app)</h3>
        <p>
          <strong>Purpose:</strong> Displaying ads inside the iOS app.<br />
          <strong>Data:</strong> Device info, app interaction events, and IP address for all users. The IDFA
          (advertising identifier) is only collected if you grant permission through Apple's{' '}
          <strong>App Tracking Transparency</strong> prompt — see Section 2.3. Without that permission, AdMob
          serves non-personalized ads and uses Apple's <strong>SKAdNetwork</strong> for attribution instead of
          the IDFA.<br />
          <strong>Privacy:</strong>{' '}
          <a href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noreferrer noopener">
            AdMob policies
          </a>{' '}
          ·{' '}
          <a href="https://developer.apple.com/app-store/app-privacy-details/" target="_blank" rel="noreferrer noopener">
            Apple App Privacy Details
          </a>
        </p>
      </div>

      <div className="info-card">
        <h3>Google Fonts (web)</h3>
        <p>
          <strong>Purpose:</strong> Serving the DM Sans and DM Mono fonts.<br />
          <strong>Data:</strong> Your IP address, requested font URL. Used solely to deliver fonts.
        </p>
      </div>

      <h2>5. Cookies and similar technologies</h2>
      <p>The website uses the following cookies / storage:</p>
      <ul>
        <li>
          <strong>Strictly necessary (always on):</strong> Local-storage keys for game state, stats, theme,
          and cookie-consent choice.
        </li>
        <li>
          <strong>Analytics cookies (with consent):</strong> Google Analytics <code>_ga</code>,
          <code> _ga_*</code>, <code>_gid</code>.
        </li>
        <li>
          <strong>Advertising cookies (with consent):</strong> Google AdSense cookies (<code>__gads</code>,
          <code> __gpi</code>) and any cookies set by partnered ad networks.
        </li>
      </ul>
      <p>
        See our <Link to="/cookies">Cookie Policy</Link> for the full list. You can manage choices via the
        cookie banner shown on first visit.
      </p>

      <h2>6. Android app — Google Play "Data Safety" disclosures</h2>
      <p>
        The following matches what we disclose in the Google Play Data Safety form:
      </p>
      <ul>
        <li>
          <strong>Data collected:</strong> Approximate location (from IP, by Google), device or other IDs
          (Advertising ID), app interactions, crash logs.
        </li>
        <li>
          <strong>Data shared:</strong> The above data is shared with Google (AdMob, Play Services) for
          analytics, advertising, and abuse-prevention purposes.
        </li>
        <li><strong>Data is encrypted in transit:</strong> Yes.</li>
        <li>
          <strong>Account deletion:</strong> The app has no user accounts. All local data can be deleted
          by clearing app data from the Android Settings → Apps menu, or by uninstalling the app.
        </li>
        <li><strong>Data deletion URL:</strong> <a href="https://sudokumaster.vip/privacy#deletion">https://sudokumaster.vip/privacy#deletion</a></li>
      </ul>

      <h2>7. iOS app — Apple App Store "Privacy Nutrition Label" disclosures</h2>
      <p>
        The following matches what we disclose in App Store Connect's App Privacy questionnaire:
      </p>
      <ul>
        <li>
          <strong>Data used to track you:</strong> Identifiers (IDFA) and usage data — only if you grant
          permission via the App Tracking Transparency prompt. If you decline, no tracking data is collected.
        </li>
        <li>
          <strong>Data linked to you:</strong> None. We do not link any collected data to your identity —
          there are no accounts or sign-in.
        </li>
        <li>
          <strong>Data not linked to you:</strong> Usage data, diagnostics (crash logs, performance data),
          and identifiers, collected in aggregate by Google AdMob and used for analytics/advertising as
          described in Section 4.
        </li>
        <li>
          <strong>Data deletion:</strong> The app has no user accounts. All local data can be deleted by
          going to iOS Settings → General → iPhone Storage → Sudoku Master → Delete App, or by deleting the
          app from your home screen.
        </li>
      </ul>

      <h2 id="deletion">8. Your rights and choices</h2>
      <p>You have the following rights regarding your data:</p>
      <ul>
        <li>
          <strong>Delete local data:</strong> Clear your browser's storage for our domain; in the Android
          app, go to Settings → Apps → Sudoku Master → Storage → Clear Data, or uninstall the app; in the
          iOS app, delete the app from your home screen. This removes all locally stored data and resets
          your stats and streak.
        </li>
        <li>
          <strong>Opt out of personalized ads:</strong>{' '}
          <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer noopener">
            Google Ad Settings
          </a>{' '}
          (web), Android Settings → Privacy → Ads → Delete advertising ID (Android app), or
          iOS Settings → Privacy & Security → Tracking → toggle off "Allow Apps to Request to Track"
          (iOS app).
        </li>
        <li>
          <strong>Opt out of analytics:</strong> Decline the analytics cookie in our banner, or install the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer noopener">
            Google Analytics Opt-out Browser Add-on
          </a>.
        </li>
        <li>
          <strong>EU / UK (GDPR) users:</strong> You have rights of access, rectification, erasure,
          restriction, portability, and objection. Email us at{' '}
          <a href="mailto:sudokumaster.vip@gmail.com">sudokumaster.vip@gmail.com</a>.
        </li>
        <li>
          <strong>California (CCPA / CPRA) users:</strong> You have the right to know, delete, correct,
          and limit use of your personal information. We do not sell personal information.
        </li>
      </ul>

      <h2>9. Children's privacy</h2>
      <p>
        Sudoku Master is suitable for all ages, including children. However:
      </p>
      <ul>
        <li>We do not knowingly collect personal information from children under 13 (US) / 16 (EU).</li>
        <li>
          We do not require any account or personal information to use the game.
        </li>
        <li>
          In the Android app, if the app is designated as child-directed under Google Play Families policy,
          we configure AdMob to disable personalized ads and not transmit the Advertising ID for users
          tagged as children (<code>tagForChildDirected</code>).
        </li>
        <li>
          In the iOS app, if the app is designated for children under Apple's Kids Category / App Store
          guidelines, we configure AdMob to serve only non-personalized ads and skip the App Tracking
          Transparency prompt entirely, in line with Apple's rules for child-directed apps.
        </li>
        <li>
          Parents who believe a child has provided personal information may contact us at{' '}
          <a href="mailto:sudokumaster.vip@gmail.com">sudokumaster.vip@gmail.com</a> for deletion.
        </li>
      </ul>

      <h2>10. Data security</h2>
      <p>
        We protect data with industry-standard measures:
      </p>
      <ul>
        <li>HTTPS / TLS for all data transmitted to our website.</li>
        <li>Local data stays on your device — there is no central database of user game data.</li>
        <li>
          Third parties (Google) maintain their own security programs for the data they process on our behalf.
        </li>
      </ul>

      <h2>11. International data transfers</h2>
      <p>
        Our third-party providers (primarily Google LLC, based in the United States) may transfer and
        process data outside your country of residence. Google relies on Standard Contractual Clauses and other
        valid transfer mechanisms for international transfers.
      </p>

      <h2>12. Data retention</h2>
      <p>
        Locally stored data (on your device) is retained until you clear it. Analytics data retained by Google
        Analytics follows our configured retention period (default: 14 months). Ad-serving data retention
        follows Google's policies.
      </p>

      <h2>13. Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will update the "Last updated"
        date at the top of this page. Material changes will be highlighted in the app or website. Your
        continued use after changes are posted constitutes acceptance of the updated policy.
      </p>

      <h2>14. Contact us</h2>
      <p>
        Questions, concerns, or rights requests? Contact us at:
      </p>
      <blockquote>
        <strong>Email:</strong> <a href="mailto:sudokumaster.vip@gmail.com">sudokumaster.vip@gmail.com</a><br />
        <strong>Website:</strong> <a href="https://sudokumaster.vip/contact">https://sudokumaster.vip/contact</a><br />
        <strong>Privacy Policy URL:</strong> <a href="https://sudokumaster.vip/privacy">https://sudokumaster.vip/privacy</a>
      </blockquote>

      <p style={{ fontSize: 11, color: 'var(--c-text3)', marginTop: 32, textAlign: 'center' }}>
        This Privacy Policy is designed to comply with Google AdSense / AdMob program policies, Google Play
        User Data policy, Apple App Store Review Guidelines (including App Tracking Transparency), GDPR,
        CCPA, COPPA, and similar regulations.
      </p>
    </div>
  );
}
