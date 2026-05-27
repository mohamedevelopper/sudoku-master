import { Link } from 'react-router-dom';

export default function CookiesPage() {
  return (
    <div className="page-content">
      <div className="crumbs"><Link to="/">Home</Link> › Cookie Policy</div>
      <h1>🍪 Cookie Policy</h1>
      <p className="lead">Last updated: May 26, 2026</p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website. They allow websites to
        remember your preferences, understand how the site is used, and serve relevant advertising. Similar
        technologies include browser local storage and pixels.
      </p>

      <h2>How we use cookies</h2>
      <p>Sudoku Master uses cookies and similar technologies for three purposes:</p>

      <div className="info-card">
        <h3>1. Strictly necessary (always active)</h3>
        <p>
          Stored in your browser's local storage — required for the site to work. Includes saved games,
          statistics, your theme choice, and your cookie-consent decision. Cannot be disabled because
          without them the game cannot save your progress.
        </p>
      </div>

      <div className="info-card">
        <h3>2. Analytics cookies (with your consent)</h3>
        <p>
          We use <strong>Google Analytics 4</strong> to understand how visitors use the site (which pages
          are popular, how long users play, which devices they use). The data is aggregated and IP-anonymized.
        </p>
        <p>
          <strong>Cookies set:</strong> <code>_ga</code>, <code>_ga_*</code>, <code>_gid</code>
          <br />
          <strong>Provider:</strong> Google Ireland / Google LLC
          <br />
          <strong>Opt out:</strong>{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer noopener">
            Google Analytics Opt-out Browser Add-on
          </a>
        </p>
      </div>

      <div className="info-card">
        <h3>3. Advertising cookies (with your consent)</h3>
        <p>
          We use <strong>Google AdSense</strong> to display advertisements that help keep this service free.
          Google may show personalized ads based on your previous browsing or non-personalized contextual ads.
        </p>
        <p>
          <strong>Cookies set:</strong> <code>__gads</code>, <code>__gpi</code>, and others depending on
          partnered ad networks.
          <br />
          <strong>Provider:</strong> Google Ireland / Google LLC and ad-tech partners
          <br />
          <strong>Opt out:</strong>{' '}
          <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer noopener">
            Google Ad Settings
          </a>
          {' · '}
          <a href="https://www.youronlinechoices.com/" target="_blank" rel="noreferrer noopener">
            YourOnlineChoices (EU)
          </a>
          {' · '}
          <a href="https://optout.aboutads.info/" target="_blank" rel="noreferrer noopener">
            AdChoices (US)
          </a>
        </p>
      </div>

      <h2>Managing your cookie preferences</h2>
      <p>You can manage your cookie choices in three ways:</p>
      <ul>
        <li><strong>Our cookie banner.</strong> Choose "Accept all" or "Essential only" when first visiting.</li>
        <li>
          <strong>Browser settings.</strong> Most browsers let you block third-party cookies or clear cookies
          for specific sites. See instructions for{' '}
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer noopener">Chrome</a>,{' '}
          <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noreferrer noopener">Firefox</a>,{' '}
          <a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noreferrer noopener">Safari</a>.
        </li>
        <li><strong>Third-party opt-out tools.</strong> Listed above for each cookie category.</li>
      </ul>
      <p>
        Note: If you block all cookies, some site features (such as saving your game progress) will stop
        working.
      </p>

      <h2>Updates to this policy</h2>
      <p>We may update this policy as our use of cookies changes. The "Last updated" date will reflect any change.</p>

      <h2>Questions?</h2>
      <p>
        Contact us at <a href="mailto:sudokumaster.vip@gmail.com">sudokumaster.vip@gmail.com</a> or via our{' '}
        <Link to="/contact">contact form</Link>.
      </p>
    </div>
  );
}
