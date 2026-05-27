import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="page-content">
      <div className="crumbs"><Link to="/">Home</Link> › Terms of Service</div>
      <h1>📄 Terms of Service</h1>
      <p className="lead"><strong>Last updated:</strong> May 26, 2026</p>

      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing or using the Sudoku Master website at <a href="https://sudokumaster.vip">sudokumaster.vip</a>
        or the Sudoku Master Android application (collectively, the "Service"), you agree to be bound by these
        Terms of Service. If you do not agree, do not use the Service.
      </p>

      <h2>2. Description of service</h2>
      <p>
        Sudoku Master is a free web-based and mobile Sudoku game offering multiple grid sizes (4×4, 6×6, 9×9,
        12×12, 16×16), six difficulty levels (Easy through Extreme), a daily puzzle, printable PDFs, a
        personal leaderboard, and educational content. The service is provided free of charge and is
        supported by advertising.
      </p>

      <h2>3. Eligibility</h2>
      <p>
        The Service is available to users of all ages and is suitable for general audiences. By using the
        Service, you represent that any information you provide is accurate.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You agree NOT to:</p>
      <ul>
        <li>Use automated bots, scrapers, or other tools to access the Service.</li>
        <li>Attempt to disrupt, attack, reverse-engineer, or compromise the Service.</li>
        <li>Click your own ads, instruct others to click your own ads, or otherwise engage in invalid click activity (this is also a violation of Google AdSense / AdMob policies).</li>
        <li>Use the Service for any unlawful purpose.</li>
        <li>Reproduce, redistribute, or commercially exploit the Service or its content without prior written permission.</li>
        <li>Bypass or disable any security measures.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        All content, design, source code, branding, logos, and assets of the Service are the property of
        Sudoku Master or its licensors and are protected by copyright and other intellectual property laws.
      </p>
      <p>
        Generated Sudoku puzzles produced by our generator are free for personal, non-commercial use,
        including printing and sharing with friends or students. Commercial reproduction (e.g., printing
        in a book for sale) requires our prior written permission.
      </p>

      <h2>6. User-generated content</h2>
      <p>
        We do not allow users to publish content on the Service. The only user-provided information is via
        the contact form, which is sent directly to our email and not displayed publicly.
      </p>

      <h2>7. Advertising</h2>
      <p>
        We display advertising via Google AdSense (web) and Google AdMob (Android app) to fund the Service.
        These ads are served by Google and partnered ad networks. We do not control the specific ads shown
        and are not responsible for the content of third-party advertisements. See our{' '}
        <Link to="/privacy">Privacy Policy</Link> for details on data used in advertising.
      </p>

      <h2>8. Disclaimer of warranties</h2>
      <p>
        The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or
        implied, including but not limited to merchantability, fitness for a particular purpose, or
        non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or free of
        harmful components.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Sudoku Master shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
        incurred directly or indirectly, arising from your use of the Service.
      </p>

      <h2>10. Privacy</h2>
      <p>
        Your use of the Service is also governed by our <Link to="/privacy">Privacy Policy</Link>, which
        explains what data we collect, how we use it, and your rights regarding that data.
      </p>

      <h2>11. Modifications to the service</h2>
      <p>
        We reserve the right to modify, suspend, or discontinue the Service (or any part of it) at any time,
        with or without notice. We will not be liable to you or to any third party for any modification,
        suspension, or discontinuation.
      </p>

      <h2>12. Changes to these Terms</h2>
      <p>
        We may revise these Terms from time to time. The most current version will always be posted at this
        URL. Material changes will be highlighted on the site. Your continued use of the Service after
        changes constitutes acceptance of the new Terms.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These Terms are governed by applicable consumer protection and internet laws. Disputes will be
        handled through good-faith negotiation first.
      </p>

      <h2>14. Severability</h2>
      <p>
        If any provision of these Terms is held invalid, the remaining provisions will continue in full
        force and effect.
      </p>

      <h2>15. Contact</h2>
      <p>
        Questions about these Terms? Email{' '}
        <a href="mailto:sudokumaster.vip@gmail.com">sudokumaster.vip@gmail.com</a> or use our{' '}
        <Link to="/contact">contact form</Link>.
      </p>
    </div>
  );
}
