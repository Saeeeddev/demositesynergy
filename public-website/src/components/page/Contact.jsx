import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../website/Header';
import Footer from '../website/Footer';

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
  const { t } = useTranslation('Contact');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[SiteSynergy] ${formData.subject}`);
    const body = encodeURIComponent(`${formData.name}\n${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:hello@sitesynergy.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />

      <main className="w-full flex justify-center py-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* --- Hero Section --- */}
          <div className="w-full max-w-[1200px] mt-16 mb-24 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
              {t('hero.badge')}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto">
              {t('hero.title')}
            </h1>
            <p className="text-lg leading-[28px] text-gray-600 max-w-[600px] mx-auto">
              {t('hero.description')}
            </p>
          </div>

          {/* --- Main Content Section --- */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Left Side: Contact Information */}
              <div className="flex flex-col gap-10">
                <ContactDetail
                  title={t('info.email.title')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  <a href={`mailto:${t('info.email.address')}`} className="text-blue-600 font-semibold hover:underline">
                    {t('info.email.address')}
                  </a>
                  <p className="text-sm text-gray-500">{t('info.email.description')}</p>
                </ContactDetail>

                <ContactDetail
                  title={t('info.location.title')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                >
                  <p>{t('info.location.address')}</p>
                </ContactDetail>

                <ContactDetail
                  title={t('info.phone.title')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  }
                >
                  <a className="text-blue-700 hover:underline" href="tel:+982143767244" dir="ltr">+98 21 4376 7244</a>
                </ContactDetail>
              </div>

              {/* Right Side: Contact Form */}
              <div className="bg-card-background p-8 sm:p-10 rounded-2xl shadow-surface border border-gray-200/80">
                <h2 className="text-3xl font-bold text-text-dark mb-6">
                  {t('form.title')}
                </h2>

                <p className="text-sm text-gray-600 mb-6">{t('form.note')}</p>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('form.fields.fullName')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-surface-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark transition-shadow text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('form.fields.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-surface-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark transition-shadow  text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('form.fields.subject')}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-surface-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark transition-shadow  text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('form.fields.message')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-surface-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark transition-shadow  text-gray-900 placeholder-gray-400"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 py-3 px-6 bg-primary-dark text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-px hover:shadow-action-btn-hover shadow-action-btn"
                    >
                      {t('form.submit')}
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
