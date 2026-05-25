import React from 'react';
import { ShieldCheck, Mail, Globe, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export default function PrivacyPolicyComponent({ onClose }: PrivacyPolicyProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12" id="privacy-policy-view">
      <button
        onClick={onClose}
        className="mb-8 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        id="btn-back-to-home"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sudoku Game
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 text-sm mt-1">Last updated: May 25, 2026</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-8 leading-relaxed">
          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Overview</h2>
            <p>
              This Privacy Policy describes how <strong>Sudoku Master</strong> ("we", "our", or "the App") handles information when you use our mobile game available on Google Play or this web site application.
            </p>
            <p className="mt-3">
              Sudoku Master values your privacy. We believe that your gaming experience should be fun, uninterrupted, and secure. This policy outlines how any third-party services inside the App process identifiers and network telemetry.
            </p>
          </section>

          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Information We Collect</h2>
            <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded-r-lg my-4">
              <p className="font-semibold text-slate-900">Zero Direct Collection</p>
              <p className="text-sm text-slate-600 mt-1">
                Sudoku Master itself does not collect, store, or share any personal information. No registration is required, and your local high scores or game states are saved directly on your own device.
              </p>
            </div>
            <p>
              We do not require account creation, and no personal data (such as emails, names, or phone numbers) is gathered directly by our main game engine.
            </p>
            <p className="mt-3">
              However, our App displays third-party ad content which may collect network-level variables used to identify your device profile, as explained below.
            </p>
          </section>

          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Third-Party Services</h2>
            <h3 className="text-lg font-medium text-slate-950 mb-2 font-mono">Google AdMob</h3>
            <p>
              Our mobile App displays advertisements served by Google AdMob, which is a service provided by Google LLC.
            </p>
            <p className="mt-3">
              Google AdMob may collect and process certain telemetry data automatically. This is standard across apps using mobile ad networks and consists of:
            </p>
            <ul className="list-disc pl-6 py-2 space-y-2 text-slate-600">
              <li>Device parameters (manufacturer, screen resolution, operating system version, browser/app user-agent details).</li>
              <li>Advertising identifiers associated with your system (Google Advertising ID / GAID, Apple IDFA).</li>
              <li>Generic geolocation coordinates derived from your current IP address (to serve ads in the correct language).</li>
              <li>App interactions concerning shown ads (impressions, touch locations, and clicks).</li>
            </ul>
            <p className="mt-3">
              This analytics data is used exclusively by Google to provide tailored ad matchmaking, protect other users, and detect automated click-bots.
            </p>

            <div className="mt-6 p-4 bg-indigo-50/50 rounded-xl space-y-3 font-mono text-sm border border-indigo-100/50">
              <p className="font-semibold text-indigo-900">Useful Links and Partner-Sites:</p>
              <div className="space-y-2">
                <div>
                  <span className="text-slate-500 font-sans block text-xs">Google Privacy Policy:</span>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline break-words">
                    https://policies.google.com/privacy
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 font-sans block text-xs">How Google Uses Information from Partner Sites:</span>
                  <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline break-words">
                    https://policies.google.com/technologies/partner-sites
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 font-sans block text-xs">AdMob & AdSense Support:</span>
                  <a href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline break-words">
                    https://support.google.com/admob/answer/6128543
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Your Choices and Device Controls</h2>
            <p>
              You maintain direct control of your profile identifier at all times through your global device options:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl mt-3 border border-slate-100">
              <p className="font-semibold text-slate-900 mb-1">Android Systems:</p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-600 text-sm">
                <li>Go to Android Settings &gt; Google &gt; Ads.</li>
                <li>Tap "Opt out of Ads Personalization" (or select "Delete advertising ID" on Android 12+).</li>
                <li>You can also reset your advertising identifier on the same screen instantly.</li>
              </ol>
            </div>
          </section>

          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Children's Privacy Protection</h2>
            <p>
              Sudoku Master is safe for players of all ages, including children. We do not inspect user age groups because we collect zero personal data directly.
            </p>
            <p className="mt-3">
              If a parent or guardian believes their child might have supplied contact information through third-party ad systems, they are welcome to contact us, and we will delete any relevant records. Shown advertisements comply with global policies, including COPPA and GDPR.
            </p>
          </section>

          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Your Rights (GDPR / CCPA)</h2>
            <p>
              Depending on your regional jurisdiction (such as the European Economic Area (EEA), the United Kingdom, or California/CCPA), you benefit from standard privacy entitlements:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
              <li>Access and audit reports of collected metadata.</li>
              <li>Demand deletion of historical diagnostic data.</li>
              <li>Reject targeted or interest-based telemetry.</li>
              <li>Submit formal inquiries to regional data regulatory agencies.</li>
            </ul>
            <p className="mt-3">
              We recommend managing personalized interests and storage settings directly using your account Dashboard:
            </p>
            <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline block mt-1 font-mono text-sm">
              https://myaccount.google.com/data-and-privacy
            </a>
          </section>

          <section className="pb-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Contact Us & Support</h2>
            <p>
              If you have any questions or concerns about this policy document, please reach out via standard communication channels:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                <Mail className="text-indigo-600 w-5 h-5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 block">Support Email</span>
                  <a href="mailto:dorasoracom@gmail.com" className="text-indigo-600 font-semibold hover:underline">
                    dorasoracom@gmail.com
                  </a>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                <Globe className="text-indigo-600 w-5 h-5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 block">Official Website</span>
                  <a href="https://sudokumaster.vip" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
                    https://sudokumaster.vip
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
