// src/components/Security.jsx

import React from 'react';
import LegalHeader from './LegalHeader';
import LegalFooter from './LegalFooter';



const Privacy = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <LegalHeader />
        <main className="w-full flex justify-center pt-16">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Top Box for Title */}
        <div className="w-full max-w-3xl mt-8 sm:mt-12 md:mt-16 flex flex-col items-center justify-center">
          <div className="w-full text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-black leading-tight">
              Privacy
            </h1>
          </div>
          <div className="w-full text-center">
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Last updated on September 18, 2025
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="w-full max-w-2xl mt-8 sm:mt-10 md:mt-12 text-text-dark space-y-8 sm:space-y-10 px-4 sm:px-6">
          {/* Intro Section */}
          <section>
            <p className="text-base leading-relaxed mb-4">
              Sitesynergy ("Sitesynergy", "we", "us") builds site-selection and potential-assessment tools that combine geospatial data, analytics, and visualization to help organizations evaluate locations efficiently.
              We know you care about how your data is collected, used, and protected — this Privacy Policy explains what we collect, how we use it, and the controls available to you when using our web apps, maps, services, and integrations (together, the "Services").
            </p>

            <p className="text-base leading-relaxed mb-8">
              If you need to contact us about privacy matters, email privacy@sitesynergy.com or use the contact form in the app.
            </p>

            <h2 className="text-3xl font-display font-bold mb-4">Types of Information We Collect</h2>
            <p className="text-base leading-relaxed mb-4">
              We collect information necessary to provide, secure, and improve the Services. Below is a summary of the categories of data we may collect.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Account & Profile Information</h3>
                <p className="text-base leading-relaxed">
                  When you create an account or sign up for paid features, we collect information you provide (name, business name, email, role, billing details) and associate it with your account.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Project & Geodata</h3>
                <p className="text-base leading-relaxed">
                  To evaluate sites we may store project metadata you create (site boundaries, feature selections, scenario settings) and any geospatial files or layers you upload to the platform.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Usage & Interaction Data</h3>
                <p className="text-base leading-relaxed">
                  We log actions you take in the app (map interactions, layer toggles, analyses run) to help improve the product, reproduce issues, and provide collaborative features.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Device & Connection Information</h3>
                <p className="text-base leading-relaxed">
                  We collect technical data such as IP address, browser and device type, and performance metrics to secure the Services and deliver a reliable experience.
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed">
              This document also describes our security posture, optional cloud interactions, and how we treat customer data used with modelling or export features.
            </p>
          </section>

          {/* Architecture & Infrastructure Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-display font-bold">Local-first & Minimum-data Design</h2>
            <p className="text-base leading-relaxed">
              Sitesynergy is designed to limit data exposure by default. Project files, intermediate analysis, and local settings remain on the user's device or tenancy unless you explicitly choose cloud features that require transfer.
            </p>

            <h2 className="text-4xl font-display font-bold">Enterprise-grade infrastructure</h2>
            <p className="text-base leading-relaxed">
              When you opt into hosted or collaborative features we operate on industry-standard infrastructure and controls to protect customer data. For customers with specific compliance needs we offer enterprise deployment options and contractual safeguards.
            </p>

            <h2 className="text-4xl font-display font-bold">Continuous security testing</h2>
            <p className="text-base leading-relaxed">
              We perform regular security reviews and vulnerability assessments to identify and remediate issues proactively, and we keep dependencies and infrastructure up-to-date with best practices.
            </p>

            <h2 className="text-4xl font-display font-bold">Secure authentication</h2>
            <p className="text-base leading-relaxed">
              Authentication uses industry-standard providers and supports single sign-on (SSO) and multi-factor authentication (MFA) for accounts that require stronger protections.
            </p>
          </section>

          {/* Privacy by Design Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-display font-bold">Privacy by design</h2>
            <p className="text-base leading-relaxed">
              Privacy considerations are built into Sitesynergy from the ground up:
            </p>

            <ul className="list-disc list-inside space-y-4 text-base leading-relaxed">
              <li>
                <span className="font-bold">Local control:</span> Project files, user-generated layers, and cached analysis remain under your control. Cloud transfers only occur when you explicitly enable sharing, backups, or cloud analysis.
              </li>
              <li>
                <span className="font-bold">Scoped uploads:</span> When cloud processing is used (for example, large-scale modelling or third-party model calls), only the minimal, relevant data required for that operation is transmitted — unrelated project data is not included.
              </li>
              <li>
                <span className="font-bold">Permissioned sharing:</span> Collaboration and sharing are opt-in and permissioned: you decide what to share, who can access it, and for how long.
              </li>
            </ul>

            <p className="text-base leading-relaxed">
              These design choices reduce risk and give teams flexible deployment patterns ranging from local-only desktop use to fully managed cloud collaboration.
            </p>
          </section>

          {/* Cloud & Data Section */}
          <section className="space-y-8 pb-8">
            <h2 className="text-4xl font-display font-bold">Cloud features & data transfers</h2>
            <p className="text-base leading-relaxed">
              Optional cloud features (collaboration, hosted analytics, backup/restore) require data transfer. When you enable these features we take steps to limit what is sent and to protect it in transit and at rest.
            </p>

            <p className="text-base leading-relaxed">
              For cloud modelling or third-party model calls, Sitesynergy pre-filters and scopes the payload to the prompt or analytic task — we do not send full user databases or unrelated project histories.
            </p>

            <p className="text-base leading-relaxed">
              Backups are encrypted and can be created on-demand by users. There is no automatic, persistent sync unless you explicitly opt into a synchronization feature.
            </p>

            <h2 className="text-4xl font-display font-bold">Data ownership & model training</h2>
            <p className="text-base leading-relaxed">
              You retain ownership of your project data and uploaded content. Sitesynergy does not use customer project data to train general-purpose models. Any model improvements derived from synthetic datasets or anonymized, consented telemetry are described in our product documentation and release notes.
            </p>
            <p className="text-base leading-relaxed">
              If you choose to participate in customer-feedback or opt-in improvement programs, we will obtain explicit consent and describe precisely what data will be used and for what purpose.
            </p>
          </section>
        </div>
      </div>
    </main>
      <LegalFooter />
    </div>
  );
};

export default Privacy;