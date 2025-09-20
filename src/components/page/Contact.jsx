import React from 'react';
import Header from '../website/Header';
import Footer from '../website/Footer';

// A reusable component for contact details with an icon
const ContactDetail = ({ icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-12 h-12 bg-primary-light-blue/50 text-primary-dark rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="font-display text-xl font-bold text-text-dark">{title}</h3>
      <div className="text-suitability-paragraph leading-relaxed mt-1">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  return (
    <div className="min-h-screen font-sans bg-background-secondary">
      <Header useColoredLogo={true} />

      <main className="w-full flex justify-center py-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* --- Hero Section --- */}
          <div className="w-full max-w-[1200px] mt-16 mb-24 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
              CONTACT US
            </p>
            <h1 className="text-[56px] leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto">
              Let's Start a Conversation
            </h1>
            <p className="text-lg leading-[28px] text-gray-600 max-w-[600px] mx-auto">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>

          {/* --- Main Content Section --- */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left Side: Contact Information */}
              <div className="flex flex-col gap-10">
                <ContactDetail
                  title="Email Us"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                >
                  <a href="mailto:hello@sitesynergy.com" className="text-blue-600 font-semibold hover:underline">hello@sitesynergy.com</a>
                  <p className="text-sm text-gray-500">For general inquiries & partnerships.</p>
                </ContactDetail>

                <ContactDetail
                  title="Our Location"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                >
                  <p>123 Innovation Drive<br/>Suite 456, San Francisco, CA 94105</p>
                </ContactDetail>

                <ContactDetail
                  title="Connect With Us"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>}
                >
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    <a href="#" className="font-semibold text-blue-600 hover:underline">X / Twitter</a>
                    <a href="#" className="font-semibold text-blue-600 hover:underline">LinkedIn</a>
                    <a href="#" className="font-semibold text-blue-600 hover:underline">Discord</a>
                  </div>
                </ContactDetail>
              </div>

              {/* Right Side: Contact Form */}
              <div className="bg-card-background p-8 sm:p-10 rounded-2xl shadow-surface border border-gray-200/80">
                <h2 className="font-display text-3xl font-bold text-text-dark mb-6">
                  Send us a Message
                </h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="name" name="name" className="w-full p-3 bg-surface-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark transition-shadow" />
                  </div>
                   <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" name="email" className="w-full p-3 bg-surface-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark transition-shadow" />
                  </div>
                   <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" className="w-full p-3 bg-surface-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark transition-shadow" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea id="message" name="message" rows="5" className="w-full p-3 bg-surface-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark transition-shadow"></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full mt-4 py-3 px-6 bg-primary-dark text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-px hover:shadow-action-btn-hover shadow-action-btn"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;