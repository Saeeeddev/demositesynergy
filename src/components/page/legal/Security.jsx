// src/components/Security.jsx

import React from 'react';
import LegalHeader from './LegalHeader';
import LegalFooter from './LegalFooter';



const Security = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <LegalHeader />
       <main className="w-full flex justify-center pt-16">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Top Box for Title */}
        <div className="w-full max-w-3xl mt-8 sm:mt-12 md:mt-16 flex flex-col items-center justify-center">
          <div className="w-full text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-black leading-tight">
              Security
            </h1>
          </div>
          <div className="w-full text-center">
            <p className="text-gray-500 text-xs sm:text-sm mt-2">LAST UPDATED ON JULY 21, 2025</p>
          </div>
        </div>

        {/* Content Box */}
        <div className="w-full max-w-2xl mt-8 sm:mt-10 md:mt-12 text-text-dark space-y-8 sm:space-y-10 px-4 sm:px-6">
          {/* Intro Section */}
          <section>
            <p className="text-base leading-relaxed mb-4">
              Sitesynergy is committed to protecting customer data and delivering secure, high-performance site-selection and assessment tools.
              Our architecture and engineering practices are designed to minimize exposure by default, give customers control over their data, and provide enterprise-grade safeguards when hosted or collaborative features are used.
            </p>
            <p className="text-base leading-relaxed">
              This page summarizes our security posture, data-flow principles, authentication posture, and how cloud interactions are scoped and protected. For privacy-specific questions, contact privacy@sitesynergy.com.
            </p>
          </section>

          {/* Architecture & Infrastructure Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-display font-bold">Local-first & minimum-data design</h2>
            <p className="text-base leading-relaxed">
              Sitesynergy defaults to keeping project files, cached analyses, and private settings within the customer's environment. Cloud transfers occur only when a user explicitly enables collaboration, hosted analytics, or backups.
            </p>

            <h2 className="text-4xl font-display font-bold">Enterprise-grade infrastructure & compliance</h2>
            <p className="text-base leading-relaxed">
              For hosted services we operate on hardened infrastructure with industry-standard controls. We support SOC 2 principles and can offer enterprise deployment patterns (VPC, private tenancy, or on-premise options) for customers with strict compliance requirements.
            </p>

            <h2 className="text-4xl font-display font-bold">Continuous security testing</h2>
            <p className="text-base leading-relaxed">
              We run regular security assessments, automated vulnerability scans, and periodic third-party penetration tests to identify and remediate issues promptly. Dependencies and infrastructure are kept up-to-date following best practices.
            </p>

            <h2 className="text-4xl font-display font-bold">Authentication & access controls</h2>
            <p className="text-base leading-relaxed">
              Authentication supports single sign-on (SSO), multi-factor authentication (MFA), and role-based access controls (RBAC). Administrative actions are logged and auditable to support governance and incident investigations.
            </p>
          </section>

          {/* Privacy by Design Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-display font-bold">Privacy by design</h2>
            <p className="text-base leading-relaxed">
              Privacy and data minimization are central to Sitesynergy's design:
            </p>
            <ul className="list-disc list-inside space-y-4 text-base leading-relaxed">
              <li>
                <span className="font-bold">Local control:</span> Project layers, GIS uploads, and intermediate analysis results remain under customer control unless shared.
              </li>
              <li>
                <span className="font-bold">Scoped processing:</span> Cloud or third-party model calls (e.g., for heavy analytics) are scoped to the minimum data necessary for the requested task — unrelated project content is excluded.
              </li>
              <li>
                <span className="font-bold">Opt-in sharing:</span> Collaboration, exports, and backups are opt-in and permissioned; users decide recipients, retention, and access levels.
              </li>
            </ul>
            <p className="text-base leading-relaxed">
              These choices reduce risk while preserving flexible deployment options from local-only to fully-managed cloud.
            </p>
          </section>

          {/* Cloud & Data Section */}
          <section className="space-y-8 pb-8">
            <h2 className="text-4xl font-display font-bold">Cloud features & data transfer</h2>
            <p className="text-base leading-relaxed">
              When you enable cloud features (collaboration, hosted analytics, or backups), Sitesynergy transmits only the minimum, contextually relevant data required for that operation. All transfers are encrypted in transit (TLS) and encrypted at rest where supported.
            </p>

            <p className="text-base leading-relaxed">
              Backups are customer-initiated, zipped, and encrypted prior to transmission; there is no automatic, persistent sync unless explicitly enabled by the customer.
            </p>

            <h2 className="text-4xl font-display font-bold">Data ownership & model training</h2>
            <p className="text-base leading-relaxed">
              Customers retain ownership of all project data and uploaded content. Sitesynergy does not use customer project data to train general-purpose models. Any telemetry or aggregated signals used for product improvement are anonymized and disclosed in product documentation and release notes; telemetry use is opt-out where required by law or contract.
            </p>

            <p className="text-base leading-relaxed">
              If a customer opts into improvement programs that require sample data, Sitesynergy will obtain explicit consent and document precisely what will be shared and for what purpose.
            </p>
          </section>
        </div>
      </div>
    </main>
      <LegalFooter />
    </div>
  );
};

export default Security;