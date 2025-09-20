import React from 'react';
import Header from '../website/Header';
import Footer from '../website/Footer';

// A reusable component for displaying a single key metric in the results
const ResultMetric = ({ value, label }) => (
  <div className="text-center">
    <p className="font-display text-4xl font-bold text-primary-dark">{value}</p>
    <p className="text-sm text-suitability-paragraph uppercase tracking-wider mt-1">{label}</p>
  </div>
);

// A reusable component for the main case study card
const CaseStudy = ({ title, location, scale, challenge, solution, imageUrl, results }) => (
  <div className="bg-card-background rounded-3xl shadow-surface p-8 sm:p-10 border border-gray-200/80 mb-20">
    {/* Header */}
    <div className="text-center border-b border-gray-200 pb-6 mb-8">
      <h2 className="font-display text-3xl font-bold text-text-dark">{title}</h2>
      <div className="flex justify-center items-center gap-x-6 gap-y-2 mt-4 text-gray-500 flex-wrap">
        <span><strong>Location:</strong> {location}</span>
        <span><strong>Scale:</strong> {scale}</span>
      </div>
    </div>

    {/* Content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Description */}
      <div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">The Challenge</h3>
        <p className="text-suitability-paragraph mb-6">{challenge}</p>
        <h3 className="font-bold text-lg text-gray-800 mb-2">The SiteSynergy Solution</h3>
        <p className="text-suitability-paragraph">{solution}</p>
      </div>
      {/* Visual & Results */}
      <div>
        <div className="bg-surface-light rounded-xl shadow-map-viz p-3 mb-8">
          <img 
            src={imageUrl}
            alt={`${title} analysis map`}
            className="w-full h-full object-cover rounded-lg aspect-video"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map(metric => (
            <ResultMetric key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </div>
      </div>
    </div>
  </div>
);


const CaseStudies = () => {
  const studies = [
    {
      title: "Utility-Scale Solar Development in West Texas",
      location: "Pecos County, TX",
      scale: "250MW Project",
      challenge: "Our client needed to identify viable parcels across three counties with specific grid capacity, high GHI, and minimal environmental impact, a process that would typically take a full quarter.",
      solution: "SiteSynergy ingested and analyzed over 500 potential sites, filtering them against multi-layer constraints including transmission line proximity, substation capacity, and protected habitats in just a few hours.",
      imageUrl: "https://placehold.co/800x450/A8C6E8/2E2E2E?text=Site+Analysis+Map",
      results: [
        { value: "90+", label: "Days Saved" },
        { value: "3", label: "Optimal Sites Found" },
        { value: "$200K+", label: "In Surveying Costs Saved" },
        { value: "95%", label: "Viability Confidence" }
      ]
    },
    {
      title: "Community Solar Siting in Central Valley, CA",
      location: "Fresno County, CA",
      scale: "15MW Portfolio",
      challenge: "Identifying multiple small (20-50 acre) sites near distribution lines while navigating California's strict zoning and agricultural land-use regulations.",
      solution: "Our platform identified 5 viable sites and automatically ranked them by economic potential (LCOE). We also provided a full permitting and environmental risk report for each.",
      imageUrl: "https://placehold.co/800x450/8FDCB8/2E2E2E?text=Economic+Heatmap",
      results: [
        { value: "8", label: "Weeks Saved" },
        { value: "Top 5", label: "Sites Ranked by LCOE" },
        { value: "60%", label: "Reduction in Soft Costs" },
        { value: "100%", label: "Regulatory Compliance" }
      ]
    },
    {
      title: "Brownfield Redevelopment in the Midwest",
      location: "Illinois",
      scale: "50MW Project",
      challenge: "Assess the feasibility of converting a former industrial site into a solar farm, which required complex environmental risk analysis and interconnection studies for an aging grid.",
      solution: "SiteSynergy's analysis confirmed sufficient grid capacity and identified minimal environmental cleanup needs. This data was crucial in turning a potential liability into a profitable asset.",
      imageUrl: "https://placehold.co/800x450/F0D16D/2E2E2E?text=Grid+Capacity+View",
      results: [
        { value: "45+", label: "Days Saved" },
        { value: "1", label: "Financible Project" },
        { value: "20%", label: "Higher IRR" },
        { value: "Secured", label: "Project Financing" }
      ]
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-background-secondary">
      <Header useColoredLogo={true} />

      <main className="w-full flex justify-center py-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* --- Hero Section --- */}
          <div className="w-full max-w-[1200px] mt-16 mb-24 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
              CASE STUDIES
            </p>
            <h1 className="text-[56px] leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto">
              Real-World Results, Accelerated Timelines
            </h1>
            <p className="text-lg leading-[28px] text-gray-600 max-w-[600px] mx-auto">
              See how developers and investors leverage SiteSynergy to de-risk projects, save months of work, and maximize their return on investment.
            </p>
          </div>

          {/* --- Case Studies Showcase --- */}
          <div className="w-full max-w-[1200px] mb-24">
            {studies.map((study, index) => (
              <CaseStudy key={index} {...study} />
            ))}
          </div>
          
          {/* --- Comparison Section --- */}
          <div className="w-full max-w-[1024px] my-24">
            <div className="text-center mb-12">
              <h2 className="text-[42px] leading-[48px] font-bold text-gray-900">The Process Transformed</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center border border-gray-200 rounded-2xl p-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-gray-500 mb-4">Traditional Site Selection</h3>
                <ul className="space-y-3 text-gray-600 text-start">
                  <li className="flex items-start gap-3"><span className="text-red-500 mt-1.5">&#10005;</span><div><strong>Timeline:</strong> 3-6 Months</div></li>
                  <li className="flex items-start gap-3"><span className="text-red-500 mt-1.5">&#10005;</span><div><strong>Process:</strong> Manual data gathering, siloed teams</div></li>
                  <li className="flex items-start gap-3"><span className="text-red-500 mt-1.5">&#10005;</span><div><strong>Cost:</strong> High billable hours & overhead</div></li>
                  <li className="flex items-start gap-3"><span className="text-red-500 mt-1.5">&#10005;</span><div><strong>Outcome:</strong> Scattered reports, high risk of errors</div></li>
                </ul>
              </div>
              <div className="border-t md:border-t-0 md:border-s border-gray-200 pt-8 md:pt-0 md:ps-8">
                <h3 className="font-display text-2xl font-bold text-primary-dark mb-4">The SiteSynergy Platform</h3>
                 <ul className="space-y-3 text-gray-600 text-start">
                  <li className="flex items-start gap-3"><span className="text-green-500 mt-1.5">&#10003;</span><div><strong>Timeline:</strong> 1-3 Days</div></li>
                  <li className="flex items-start gap-3"><span className="text-green-500 mt-1.5">&#10003;</span><div><strong>Process:</strong> Automated, unified analysis</div></li>
                  <li className="flex items-start gap-3"><span className="text-green-500 mt-1.5">&#10003;</span><div><strong>Cost:</strong> Fixed project fee, minimal overhead</div></li>
                  <li className="flex items-start gap-3"><span className="text-green-500 mt-1.5">&#10003;</span><div><strong>Outcome:</strong> Integrated, decision-ready reports</div></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;