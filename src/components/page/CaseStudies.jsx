import React from 'react';
import Header from '../website/Header';
import Footer from '../website/Footer';

// Data for the case studies to keep the JSX clean
const caseStudiesData = [
  {
    client: "Pioneer Solar",
    title: "Project Helios: 150MW Utility-Scale Solar in West Texas",
    imageUrl: "https://placehold.co/800x600/A8C6E8/2E2E2E?text=Project+Helios+Map",
    challenge: "Pioneer Solar needed to identify a utility-scale solar site with high GHI, proximity to interconnection points, and minimal environmental impact, all within a compressed 3-month deadline to meet funding requirements.",
    solution: "Using the SiteSynergy platform, we analyzed over 500,000 acres, applying dozens of layers including grid capacity, protected lands, slope analysis, and advanced financial modeling to score and rank the most promising parcels automatically.",
    results: [
      { metric: "7 Days", description: "Time to Viable Site" },
      { metric: "1,200+", description: "Potential Sites Analyzed" },
      { metric: "$28/MWh", description: "Projected LCOE" },
      { metric: "12%", description: "Improved ROI Projection" },
    ]
  },
  {
    client: "Veridian Renewables",
    title: "Project Northwind: 200MW Wind Farm in the Midwest",
    imageUrl: "https://placehold.co/800x600/8FDCB8/2E2E2E?text=Project+Northwind+Map",
    challenge: "Veridian faced the immense task of screening a multi-county area in Iowa for a greenfield wind project, needing to balance optimal wind speeds with complex environmental setbacks, turbine accessibility, and grid capacity.",
    solution: "Our platform ingested and processed terabytes of wind resource data alongside environmental, logistical, and grid constraint layers. This allowed for a rapid, multi-faceted analysis that would have taken a team of GIS analysts half a year to complete.",
    results: [
      { metric: "4 Weeks", description: "Time to Full Feasibility Report" },
      { metric: "2.5 Million Acres", description: "Total Area Screened" },
      { metric: "45%", description: "Projected Capacity Factor" },
      { metric: "95%", description: "Confidence in Permit Approval" },
    ]
  },
  {
    client: "Empire Co-op",
    title: "Hudson Valley Initiative: 25MW Community Solar",
    imageUrl: "https://placehold.co/800x600/F0D16D/2E2E2E?text=Community+Solar+Map",
    challenge: "A community solar co-op needed to find a suitable 100-200 acre parcel in a region with strict zoning laws, high land costs, and vocal community stakeholders. They had previously spent 6 months manually reviewing sites with no success.",
    solution: "SiteSynergy focused the search by first filtering for parcels that met the complex zoning and setback requirements. We then layered on economic and grid data to find the few sites that were not only compliant but also financially viable.",
    results: [
      { metric: "3 Viable Sites", description: "Identified in Under a Week" },
      { metric: "8 Months", description: "Saved in Manual Search Efforts" },
      { metric: "$250k", description: "Saved in Consulting Fees" },
      { metric: "100%", description: "Met Community Setback Rules" },
    ]
  }
];

const CaseStudies = () => {
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
              Discover how developers and investors leverage SiteSynergy to de-risk projects and find optimal sites faster than ever before.
            </p>
          </div>

          {/* --- Case Studies Showcase --- */}
          <div className="w-full max-w-[1200px] space-y-24">
            {caseStudiesData.map((study, index) => (
              <div key={index} className="bg-card-background p-8 rounded-3xl shadow-surface border">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <p className="text-sm font-bold text-primary-dark uppercase tracking-widest mb-4">{study.client}</p>
                    <h2 className="font-display text-4xl font-bold text-text-dark mb-6">{study.title}</h2>
                    <div className="space-y-4 text-suitability-paragraph text-base">
                      <p><strong>The Challenge:</strong> {study.challenge}</p>
                      <p><strong>The Solution:</strong> {study.solution}</p>
                    </div>
                  </div>
                  <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                     <img src={study.imageUrl} alt={`${study.title} map visualization`} className="rounded-xl shadow-map-viz w-full h-auto object-cover"/>
                  </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                   <h3 className="font-display text-2xl font-bold text-text-dark mb-6 text-center">Key Results</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                      {study.results.map((result, r_index) => (
                        <div key={r_index} className="bg-surface-light p-4 rounded-lg">
                          <p className="text-3xl font-bold text-primary-dark">{result.metric}</p>
                          <p className="text-sm text-gray-600 font-semibold">{result.description}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- Comparison Section --- */}
          <div className="w-full max-w-[1200px] my-32">
              <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-gray-900">The SiteSynergy Difference</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card-background p-8 rounded-2xl shadow-surface border">
                  <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-500 mb-4">Traditional Site Selection</h3>
                      <ul className="space-y-3 text-gray-600 list-disc list-inside">
                          <li><strong className="text-gray-700">Timeline:</strong> 3-6 Months of manual research</li>
                          <li><strong className="text-gray-700">Data:</strong> Siloed, manually aggregated from various sources</li>
                          <li><strong className="text-gray-700">Risk Assessment:</strong> Late-stage, often uncovering costly surprises</li>
                          <li><strong className="text-gray-700">Economic Modeling:</strong> Basic, high-level spreadsheet analysis</li>
                          <li><strong className="text-gray-700">Cost Structure:</strong> High hourly consulting fees or fixed software subscriptions</li>
                      </ul>
                  </div>
                  <div className="p-6 bg-green-50 rounded-xl border-2 border-secondary">
                      <h3 className="text-2xl font-bold text-primary-dark mb-4">The SiteSynergy Platform</h3>
                      <ul className="space-y-3 text-gray-700 list-disc list-inside">
                          <li><strong className="text-gray-800">Timeline:</strong> Hours to Days for comprehensive reports</li>
                          <li><strong className="text-gray-800">Data:</strong> Unified, cross-referenced, and instantly accessible</li>
                          <li><strong className="text-gray-800">Risk Assessment:</strong> Upfront and integrated from day one</li>
                          <li><strong className="text-gray-800">Economic Modeling:</strong> Dynamic LCOE & IRR analysis built-in</li>
                          <li><strong className="text-gray-800">Cost Structure:</strong> Transparent, value-based per-project fee</li>
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