import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    const body = `From: ${name} <${email}>\n\n${message}`;
    window.location.href = `mailto:sudokumaster.vip@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="page-content">
      <div className="crumbs"><Link to="/">Home</Link> › Contact</div>
      <h1>📧 Contact Us</h1>
      <p className="lead">
        Questions, suggestions, bug reports, or partnership inquiries? We'd love to hear from you.
      </p>

      <div className="info-card" style={{ background: 'var(--c-primary-l)', borderColor: 'var(--c-primary)' }}>
        <h3 style={{ marginBottom: 8 }}>📩 Email us directly</h3>
        <p style={{ fontSize: 18, margin: 0 }}>
          <a href="mailto:sudokumaster.vip@gmail.com" style={{ fontWeight: 600 }}>
            sudokumaster.vip@gmail.com
          </a>
        </p>
        <p style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 8, marginBottom: 0 }}>
          We typically reply within 1–3 business days.
        </p>
      </div>

      <h2>What can we help with?</h2>
      <ul>
        <li><strong>Bug reports.</strong> Include your browser/OS and what you were doing when it happened.</li>
        <li><strong>Feature requests.</strong> Tell us what you'd love to see added.</li>
        <li><strong>Privacy / data requests.</strong> See our <Link to="/privacy">Privacy Policy</Link> for rights.</li>
        <li><strong>Copyright concerns.</strong> Report copyright issues per the DMCA process.</li>
        <li><strong>Partnerships & advertising.</strong> Business inquiries welcome.</li>
        <li><strong>General feedback.</strong> Love it? Hate it? Want a new theme? Let us know.</li>
      </ul>

      <h2>Send us a message</h2>
      {submitted ? (
        <blockquote>
          ✅ Your email client should have opened with a pre-filled message. If it didn't, please email us
          directly at <a href="mailto:sudokumaster.vip@gmail.com">sudokumaster.vip@gmail.com</a>.
        </blockquote>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" required style={{ width: '100%', marginTop: 4 }} />
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required style={{ width: '100%', marginTop: 4 }} />
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" required style={{ width: '100%', marginTop: 4 }} placeholder="Brief topic" />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required style={{ width: '100%', marginTop: 4 }} placeholder="Your message…" />
          </div>
          <button type="submit">Send message</button>
        </form>
      )}

      <h2>Response time</h2>
      <p>
        We aim to respond to all messages within 1–3 business days. For urgent privacy-related requests
        (GDPR, CCPA, account/data deletion), we'll prioritize and respond within 30 days as required by law.
      </p>

      <h2>Sudoku Master on the web</h2>
      <p>
        Find us at: <a href="https://sudokumaster.vip">sudokumaster.vip</a>
      </p>
    </div>
  );
}
