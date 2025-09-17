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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-black leading-tight">Privacy Policy</h1>
            </div>
            <div className="w-full text-center">
              <p className="text-gray-500 text-xs sm:text-sm mt-2">Last updated on November 6th, 2024</p>
            </div>
          </div>

          {/* Content Box */}
          <div className="w-full max-w-2xl mt-8 sm:mt-10 md:mt-12 text-text-dark space-y-8 sm:space-y-10 px-4 sm:px-6">
            {/* Intro Section */}
            <section>
                                <p className="text-base leading-relaxed mb-4">
                Mesh Intelligent Technologies, Inc.'s Pieces ("Pieces", "we") knows that you care about how your personal information is used and shared, and Pieces takes your privacy seriously. In this Privacy Policy, we describe how we collect, use, and handle your personal information when you use our services, software, technology, and websites ("Services"). This Privacy Policy applies when Pieces is the data controller with regard to the collected personal information referenced in this Privacy Policy. Pieces's address is:
                </p>
                <p className="text-base leading-relaxed mb-8">
                Mesh Intelligent Technologies, Inc., 1311 Vine St., Cincinnati, OH 45202
                </p>

                <h2 className="text-3xl font-display font-bold mb-4">Types of Information We Collect</h2>
                <p className="text-base leading-relaxed mb-4">
                We collect and use the following information to provide, improve, protect, and promote our Services.
                </p>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Account Information</h3>
                        <p className="text-base leading-relaxed">
                        We collect, and associate with your account, the information you provide to us when you do things such as create your account and upgrade to a Pieces account that includes paid features ("Paid Account").
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-2">Your Content</h3>
                        <p className="text-base leading-relaxed">
                        Our Services are designed as a simple and personalized way for you to store your code, files, data, content, and other information ("Your Content"), collaborate with others, and work across multiple devices and services. To provide you with the Services, we store, process, and may transmit Your Content (if you choose to sync Your Content), as well as information related to it.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-2">Usage Information</h3>
                        <p className="text-base leading-relaxed">
                        We collect information related to how you use and interact with the Services, including actions you take in your account, such as adding or viewing a Piece or searching for a Piece.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-2">Device Information</h3>
                        <p className="text-base leading-relaxed">
                        We also collect information from and about the devices you use to access the Services. This includes things like IP addresses and the type of browser and device you use.
                        </p>
                    </div>
                </div>
                <p className="text-base leading-relaxed">
                This document outlines our current security posture, including data handling, model training methodology, and optional cloud interactions.
                </p>
            </section>

            {/* Architecture & Infrastructure Section */}
            <section className="space-y-8">
              <h2 className="text-4xl font-display font-bold">Local-first architecture</h2>
              <p className="text-base leading-relaxed">
                Our platform is built to exceed enterprise security expectations while maintaining a privacy-first, local-first approach that gives users full control over their data.
              </p>

              <h2 className="text-4xl font-display font-bold">SOC 2 compliant infrastructure</h2>
              <p className="text-base leading-relaxed">
                We maintain SOC 2 compliance, a gold standard for managing customer data with strict controls across security, availability, and confidentiality. This ensures our infrastructure is built to meet the rigorous demands of enterprise environments.
              </p>

              <h2 className="text-4xl font-display font-bold">Continuous security auditing</h2>
              <p className="text-base leading-relaxed">
                We perform regular security audits to assess, validate, and improve our systems. These audits help us proactively identify potential vulnerabilities, enforce best practices, and maintain the integrity of our infrastructure over time.
              </p>

              <h2 className="text-4xl font-display font-bold">Secure authentication via Auth0</h2>
              <p className="text-base leading-relaxed">
                Authentication is handled through Auth0, enabling secure and scalable user access. We support advanced security configurations, including multi-factor authentication (MFA), to ensure that only verified users can access sensitive data and functionality.
              </p>
            </section>

            {/* Privacy by Design Section */}
            <section className="space-y-8">
                <h2 className="text-4xl font-display font-bold">Privacy by design</h2>
                <p className="text-base leading-relaxed">
                Pieces is engineered for privacy at the core, with an architecture that ensures all user data remains local by default:
                </p>
                <ul className="list-disc list-inside space-y-4 text-base leading-relaxed">
                    <li><span className="font-bold">Local data processing:</span> All user content, including code, snippets, memory, and interaction history, is processed and stored on the user's device. Nothing is sent to the cloud unless explicitly initiated by the user.</li>
                    <li><span className="font-bold">On-device intelligence:</span> Our proprietary nanomodels handle memory formation, summarization, and retrieval entirely on-device, without relying on external servers or persistent cloud services.</li>
                    <li><span className="font-bold">Offline-first experience:</span> Pieces functions fully offline with no background data sync, no passive telemetry, and no unexpected network activity. This ensures a secure and distraction-free experience, even in air-gapped or constrained environments.</li>
                </ul>
                <p className="text-base leading-relaxed">
                This local-first model not only enhances performance but ensures that user data remains private, secure, and under the user's full control at all times.
                </p>
            </section>

            {/* Cloud & Data Section */}
            <section className="space-y-8 pb-8">
                <h2 className="text-4xl font-display font-bold">Cloud access and data transfer</h2>
                <p className="text-base leading-relaxed">
                    When users opt into optional cloud-based features (such as LLM querying or backup/restore workflows), only the <span className="font-bold">minimum required and contextually relevant data is sent</span>.
                </p>
                <p className="text-base leading-relaxed">
                    Data transferred to cloud-based models (e.g., OpenAI, Claude) is pre-filtered and scoped to the user's immediate prompt, without transmitting unrelated memory or history. Pieces does not send full memory logs or raw content archives to any third-party service.
                </p>
                 <p className="text-base leading-relaxed">
                    Cloud-based backup and restoration, when explicitly initiated, involves zipping and encrypting the user's local database and transmitting it for temporary storage. There is no persistent cloud synchronization or continuous upload.
                </p>

                <h2 className="text-4xl font-display font-bold">Data ownership and model training</h2>
                <p className="text-base leading-relaxed">
                    User data is never used to train any model at Pieces. Instead, our nanomodels are trained exclusively on synthetic datasets generated using non-user-derived "Oracle models."
                </p>
                <p className="text-base leading-relaxed">
                    This ensures that Pieces can improve performance without inspecting, storing, or training on real user inputs or behaviors.
                </p>
                <p className="text-base leading-relaxed">
                    The choice to exclude user data from all training activities is foundational to our system design and applies to all product components, including Long-Term Memory, Copilot interactions, context injection, and metadata generation.
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