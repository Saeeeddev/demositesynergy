import React, { useState } from 'react';
import Header from '../website/Header';
import Footer from '../website/Footer';

// Reusable component for the FAQ items to handle the open/close state
const FaqItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-gray-800 hover:text-gray-900 transition-colors"
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <span className={`text-2xl text-gray-500 font-light transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
      >
        <div className="text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// Reusable component for the support resource cards
const SupportCard = ({ title, children, buttonText, buttonHref = '#' }) => (
  <div className="bg-card-background p-6 rounded-xl flex flex-col shadow-card hover:shadow-card-hover transition-shadow duration-300">
    <h3 className="font-display text-xl font-bold text-text-dark mb-3">{title}</h3>
    <p className="text-suitability-paragraph leading-relaxed mb-6 flex-grow">{children}</p>
    <a
      href={buttonHref}
      className="text-center mt-auto w-full max-w-[200px] px-4 py-2 bg-surface-light text-primary-dark font-semibold rounded-full hover:bg-gray-200 transition-colors"
    >
      {buttonText}
    </a>
  </div>
);


const Support = () => {
  return (
    <div className="min-h-screen font-sans bg-background-secondary">
      <Header useColoredLogo={true} />

      <main className="w-full flex justify-center py-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* --- Looking for Support Section --- */}
          <div className="w-full max-w-[1200px] my-16 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Looking for support?</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We encourage you to take a look at our extensive documentation and FAQ to find quick solutions. Didn't find what you were looking for? We've got you covered.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 text-left mt-12">
              <SupportCard title="Contact Us" buttonText="Get in Touch" buttonHref="/contact">
                Have a specific question about your project? Our team is ready to help.
              </SupportCard>
              <SupportCard title="Request a Demo" buttonText="Book a Call" buttonHref="/pricing">
                See the platform in action with a guided tour from one of our specialists.
              </SupportCard>
               <SupportCard title="Case Studies" buttonText="View Case Studies">
                Explore real-world examples of successful site selection projects and their outcomes.
              </SupportCard>
              <SupportCard title="YouTube Tutorials" buttonText="Watch Videos">
                Learn how to use our platform through step-by-step video tutorials and walkthroughs.
              </SupportCard>
            </div>
          </div>

          {/* --- FAQ Section --- */}
          <div className="w-full max-w-4xl my-24">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900">Questions?</h2>
              <p className="text-5xl font-bold text-gray-900">We have the answers.</p>
            </div>
            <div className="space-y-2">
              <FaqItem question="How does the per-project pricing work?">
                <p>Our model is simple: you pay a one-time fee for a complete analysis of a single project area. The price is determined by the size of the area and the complexity of the data required. This is more cost-effective than monthly subscriptions, as you only pay for the results you need.</p>
              </FaqItem>
              <FaqItem question="What data sources do you use for your analysis?">
                <p>We synthesize data from a wide range of industry-standard public and private sources, including NREL for solar irradiance (GHI/DNI), EIA for grid infrastructure, USGS for topography and land use, and various federal and state databases for environmental and permitting constraints.</p>
              </FaqItem>
               <FaqItem question="What is the typical turnaround time for an analysis?">
                <p>Our platform automates the most time-consuming parts of site selection. While the core analysis is completed in hours, we perform a final human review to ensure quality. You can expect a complete, decision-ready report delivered to you within 1-3 business days.</p>
              </FaqItem>
              <FaqItem question="How is my project data kept secure and confidential?">
                <p>We take data security very seriously. All project data is encrypted in transit and at rest. We use secure, access-controlled cloud infrastructure, and your proprietary project information will never be shared with any third parties.</p>
              </FaqItem>
              <FaqItem question="What size projects can SiteSynergy analyze?">
                <p>Our platform is designed to handle projects of all sizes, from small distributed installations (1-5 MW) to utility-scale developments (100+ MW). The analysis methodology scales automatically based on project size, ensuring appropriate detail and accuracy for your specific development needs.</p>
              </FaqItem>
              <FaqItem question="Do you provide financial modeling and LCOE calculations?">
                <p>Yes, our analysis includes preliminary financial projections including Levelized Cost of Energy (LCOE), Internal Rate of Return (IRR), and payback period estimates. These are based on current market conditions, equipment costs, and site-specific factors like solar irradiance and grid connection costs.</p>
              </FaqItem>
              <FaqItem question="Can I get analysis for multiple sites at once?">
                <p>Absolutely. We offer bulk pricing for portfolio analysis where you need to evaluate multiple potential sites. This is ideal for developers comparing several locations or investors evaluating acquisition opportunities across different markets.</p>
              </FaqItem>
              <FaqItem question="What geographic regions do you cover?">
                <p>Currently, SiteSynergy provides comprehensive analysis coverage across the United States, with detailed grid interconnection data for all major ISOs and utilities. We're actively expanding to cover additional international markets - contact us if you have projects outside the US.</p>
              </FaqItem>
              <FaqItem question="How accurate are your solar yield predictions?">
                <p>Our solar yield models use high-resolution satellite data and ground-validated measurements with typical accuracy within 3-5% of actual performance. We incorporate factors like shading, weather patterns, equipment degradation, and seasonal variations to provide realistic production estimates.</p>
              </FaqItem>
              <FaqItem question="What happens if I'm not satisfied with the analysis?">
                <p>We stand behind the quality of our work. If you're not completely satisfied with your analysis, we offer a full refund within 30 days of delivery. We also provide one round of revisions at no additional cost if you need adjustments to the scope or focus areas.</p>
              </FaqItem>
              <FaqItem question="Can you help with permitting and regulatory analysis?">
                <p>Our analysis includes identification of key permitting requirements, zoning restrictions, and environmental considerations. While we don't provide legal advice, our reports highlight potential regulatory hurdles and suggest strategies for navigating the approval process efficiently.</p>
              </FaqItem>
              <FaqItem question="Do you offer ongoing support after project delivery?">
                <p>Yes, we provide 90 days of post-delivery support to answer questions about your analysis and help interpret the results. For long-term projects, we also offer annual updates to account for changes in grid conditions, regulations, or market factors.</p>
              </FaqItem>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;