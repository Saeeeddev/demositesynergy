import React from 'react';
import Header from '../website/Header';
import Footer from '../website/Footer';

// A reusable card for comparing the old vs. new way
const ValueCard = ({ title, children, isAdvantage = false }) => (
  <div className={`p-8 rounded-2xl h-full flex flex-col ${isAdvantage ? 'bg-card-background shadow-surface border-blue-200 border' : 'bg-gray-100'}`}>
    <h3 className={`font-display text-xl font-bold mb-3 ${isAdvantage ? 'text-primary-dark' : 'text-gray-700'}`}>{title}</h3>
    <p className="text-suitability-paragraph leading-relaxed flex-grow">{children}</p>
  </div>
);

// A reusable component for the included features list
const IncludedFeature = ({ children }) => (
  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center mt-1">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
    </div>
    <span className="text-lg text-gray-700">{children}</span>
  </li>
);


const Pricing = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />

      <main className="w-full flex justify-center py-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* --- Hero Section --- */}
          <div className="w-full max-w-[1200px] mt-16 mb-24 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
              OUR PRICING MODEL
            </p>
            <h1 className="text-[56px] leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto">
              Fair, Transparent, Project-Based
            </h1>
            <p className="text-lg leading-[28px] text-gray-600 max-w-[600px] mx-auto">
              You shouldn't pay for software sitting idle. Our pricing is tied directly to your project's success, delivering comprehensive analysis in days, not months.
            </p>
          </div>

          {/* --- The Comparison Section --- */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* The Old Way */}
              <div>
                <h2 className="text-center text-[32px] font-bold text-gray-500 mb-8">The Hidden Costs of <br/>Traditional Methods</h2>
                <div className="space-y-6">
                <ValueCard title="Expensive Monthly Subscriptions">
                    Traditional software charges you every month, whether you're actively analyzing a site or not. Costs stack up quickly with no guaranteed results. Furthermore, critical **economic** and **environmental** data often requires expensive add-on packages.
                  </ValueCard>
                  <ValueCard title="Lengthy Consulting Engagements">
                    Hiring consultants means paying for hundreds of billable hours over several months, often for a single site analysis, with slow and scattered deliverables. This fragmented process delays a comprehensive **risk assessment** and muddles the true **economic** outlook.
                  </ValueCard>
                  <ValueCard title="Requires Risk Assessment Experts">
                    Assessing project viability requires specialized risk management reports. Traditionally, this means hiring separate consultants for **environmental** compliance, **economic** forecasting, and technical **risk assessment**.
                  </ValueCard>
                </div>
              </div>
              {/* The SiteSynergy Way */}
              <div>
                <h2 className="text-center text-[32px] font-bold text-gray-900 mb-8">The SiteSynergy Advantage: <br/>Pay for Results</h2>
                <div className="space-y-6">
                <ValueCard title="One-Off Project Pricing" isAdvantage={true}>
                    Pay only for the specific analysis you need, when you need it. No subscriptions, no recurring fees. It's the most capital-efficient way to qualify a site, with a full **economic** and **environmental assessment** included.
                  </ValueCard>
                  <ValueCard title="Analysis Delivered in Hours" isAdvantage={true}>
                    Our platform collapses months of work into hours of analysis, with delivery in a day at the worst. This speed is your competitive advantage, giving you a unified **risk**, **economic**, and **environmental** picture faster than any other method.
                  </ValueCard>
                  <ValueCard title="Integrated Risk & Management Reports" isAdvantage={true}>
                    Expert-level risk assessment and management reports are built directly into our deliverables. We provide the critical insights you need—including **economic** modeling and **environmental** impact—without the cost of external experts.
                  </ValueCard>
                </div>
              </div>
            </div>
          </div>

          {/* --- What's Included Section --- */}
          <div className="w-full max-w-[1024px] bg-card-background p-10 rounded-3xl shadow-surface my-24 border">
            <div className="text-center mb-12">
              <h2 className="text-[42px] leading-[48px] font-bold text-gray-900">One Project, One Price, Every Insight</h2>
              <p className="text-lg leading-[28px] text-gray-600 mt-4 max-w-[600px] mx-auto">
                Each SiteSynergy project analysis is a complete, decision-ready package.
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <IncludedFeature>Full Site Suitability Score</IncludedFeature>
              <IncludedFeature>High-Resolution Geospatial Maps</IncludedFeature>
              <IncludedFeature>Grid & Interconnection Analysis</IncludedFeature>
              <IncludedFeature>Solar Yield & Performance Models</IncludedFeature>
              <IncludedFeature>Land Use & Zoning Constraints</IncludedFeature>
              <IncludedFeature>Preliminary Financial Projections (LCOE, IRR)</IncludedFeature>
              <IncludedFeature>Environmental & Permitting Risk Assessment</IncludedFeature>
              <IncludedFeature>Exportable PDF Reports & CSV Data</IncludedFeature>
            </ul>
          </div>

          {/* --- CTA Section --- */}
          <div className="w-full max-w-[1200px] my-24 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-4">
              READY TO ACCELERATE YOUR PROJECT?
            </p>
            <h2 className="text-[42px] leading-[48px] font-bold text-gray-900 mb-6">
              Get a Custom Quote Today
            </h2>
            <p className="text-lg leading-[28px] text-gray-600 max-w-[600px] mx-auto mb-8">
              Because every project is unique, we provide a tailored quote based on your site's acreage, complexity, and specific data requirements.
            </p>
            <button className="h-[42px] py-2 px-8 bg-primary-dark text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-px hover:shadow-action-btn-hover shadow-action-btn">
              Request a Project Quote
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;