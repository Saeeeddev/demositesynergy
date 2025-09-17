import React from 'react';
import LegalHeader from './LegalHeader';
import LegalFooter from './LegalFooter';

const TermsAndCondition = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <LegalHeader />
      <main className="w-full flex justify-center pt-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Top Box for Title */}
          <div className="w-full max-w-3xl mt-8 sm:mt-12 md:mt-16 flex flex-col items-center justify-center">
            <div className="w-full text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-black leading-tight">Terms & Conditions</h1>
            </div>
            <div className="w-full text-center">
              <p className="text-gray-500 text-xs sm:text-sm mt-2">LAST UPDATED ON SEPTEMBER 17, 2025</p>
            </div>
          </div>

          {/* Content Box */}
          <div className="w-full max-w-2xl mt-8 sm:mt-10 md:mt-12 text-text-dark space-y-8 sm:space-y-10 px-4 sm:px-6">
            {/* Intro Section */}
            <section>
                <p className="text-base leading-relaxed mb-4">
                Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the SiteSynergy platform and services ("Service") operated by Mesh Intelligent Technologies, Inc. ("us", "we", or "our").
                </p>
                <p className="text-base leading-relaxed">
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
            </section>

            {/* Account Terms Section */}
            <section className="space-y-8">
              <h2 className="text-4xl font-display font-bold">Account Terms</h2>
              <p className="text-base leading-relaxed">
                You are responsible for maintaining the security of your account and password. The company cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
              </p>

              <h2 className="text-4xl font-display font-bold">Content & Data Rights</h2>
              <p className="text-base leading-relaxed">
                You retain all rights to any content you upload, post, or display on or through the Service. By uploading content, you grant us a worldwide license to use, host, and display such content.
              </p>

              <h2 className="text-4xl font-display font-bold">Service Rules & Usage</h2>
              <p className="text-base leading-relaxed">
                Our Service may only be used for lawful purposes and in accordance with these Terms. You agree not to use the Service in any way that could damage or impair the Service or interfere with any other party's use of the Service.
              </p>

              <h2 className="text-4xl font-display font-bold">Modifications to the Service</h2>
              <p className="text-base leading-relaxed">
                We reserve the right to modify or discontinue, temporarily or permanently, the Service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
              </p>
            </section>

            {/* Subscription Section */}
            <section className="space-y-8">
                <h2 className="text-4xl font-display font-bold">Subscription Terms</h2>
                <p className="text-base leading-relaxed">
                Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis depending on the type of subscription plan you select.
                </p>
                <ul className="list-disc list-inside space-y-4 text-base leading-relaxed">
                    <li><span className="font-bold">Billing Cycle:</span> Billing cycle dates are based on the date you subscribe and cannot be changed.</li>
                    <li><span className="font-bold">Automatic Renewal:</span> Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.</li>
                    <li><span className="font-bold">Refund Policy:</span> Certain refund requests may be considered on a case-by-case basis and granted at the sole discretion of the company.</li>
                </ul>
            </section>

            {/* Legal Disclaimers Section */}
            <section className="space-y-8 pb-8">
                <h2 className="text-4xl font-display font-bold">Legal Disclaimers</h2>
                <p className="text-base leading-relaxed">
                    The Service is provided "as is" without any warranties, expressed or implied. We do not warrant that the Service will be uninterrupted or error-free.
                </p>
                <p className="text-base leading-relaxed">
                    In no event shall the company be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>

                <h2 className="text-4xl font-display font-bold">Changes to Terms</h2>
                <p className="text-base leading-relaxed">
                    We reserve the right to modify these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                </p>
                <p className="text-base leading-relaxed">
                    By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>

                <h2 className="text-4xl font-display font-bold">Contact Us</h2>
                <p className="text-base leading-relaxed">
                    If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-base leading-relaxed font-semibold">
                    Mesh Intelligent Technologies, Inc.<br />
                    1311 Vine St., Cincinnati, OH 45202<br />
                    Email: legal@sitesynergy.com
                </p>
            </section>
          </div>
        </div>
      </main>
      <LegalFooter />
    </div>
  );
};

export default TermsAndCondition;
