import React from 'react';
import Header from '../website/Header';
import Footer from '../website/Footer';

const About = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />
      
      <main className="w-full flex justify-center pt-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          {/* Hero Section */}
          <div className="w-full max-w-[1200px] mt-16 mb-24">
            <div className="text-center">
              {/* Small header text */}
              <div className="mb-8">
                <p className="text-xs font-medium font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
                  ABOUT US
                </p>
              </div>
              
              {/* Main headline */}
              <div className="mb-8">
                <h1 className="text-[56px] leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto">
                Site selection redefined:<br />
                Faster. Smarter. More accurate.
                </h1>
              </div>
              
              {/* Description */}
              <div className="max-w-[600px] mx-auto">
                <p className="text-lg leading-[28px] text-gray-600">
                With SiteSynergy, months of analysis collapse into a single day — providing faster, smarter, and more accurate site decisions powered by advanced data and analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Left side - Title */}
              <div className="w-full lg:w-[500px] relative">
                <div className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:flex-col lg:justify-start lg:pt-24">
                  <div className="mb-8">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-6">
                      HOW WE GOT TO THIS POINT
                    </p>
                    <h2 className="text-[42px] leading-[48px] font-bold text-gray-900">
                      Progress towards the mission
                    </h2>
                  </div>
                </div>
              </div>
              
              {/* Right side - Timeline */}
              <div className="w-full lg:w-[700px]">
                <div className="space-y-12">
                  
                  {/* Phase 1 */}
                  <div className="border-l-2 border-gray-200 pl-8 relative">
                    <div className="absolute left-[-9px] top-2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full"></div>
                    <div className="mb-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em]">
                        2022/2023 — PHASE I
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Solved “data overload” in site selection
                    </h3>
                    <div className="space-y-3 text-gray-600 text-base leading-relaxed">
                      <p>
                        <strong>Traditional site analysis took months, scattered across reports, maps, and spreadsheets.</strong>
                      </p>
                      <p>
                      We built the SiteSynergy Engine to unify solar, grid, land, and infrastructure data into one workflow — without slowing down decision-making.
                      </p>
                      <p>
                        <strong>Site selection needed structured insight, not just raw data</strong>
                      </p>
                      <p>
                      Raw datasets weren’t enough. We developed models to automatically classify, filter, and preserve only meaningful context across diverse geospatial and technical sources.
                      </p>
                      <p>
                        <strong>Making this work at scale was a massive challenge</strong>
                      </p>
                      <p>
                      We engineered real-time, offline-capable pipelines for geospatial ingestion and analysis — enabling instant site scoring and risk assessment without reliance on cloud-heavy processes.
                      </p>
                      <p>
                        <strong>Key Breakthrough:</strong> First real-time, privacy-preserving site selection engine that could capture, structure, and process multi-layer geospatial data without manual effort — cutting timelines from months to less than a day.
                      </p>
                    </div>
                  </div>
                  
                  {/* Phase 2 */}
                  <div className="border-l-2 border-gray-200 pl-8 relative">
                    <div className="absolute left-[-9px] top-2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full"></div>
                    <div className="mb-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em]">
                      2024/2025 — PHASE II: ACCURACY & AUTOMATION
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Solved “proactive decision-making” (Automation-1)
                    </h3>
                    <div className="space-y-3 text-gray-600 text-base leading-relaxed">
                      <p>
                        <strong>Raw site data wasn’t enough — the system needed to identify which sites to prioritize, which to discard, and how to retrieve the right insights instantly.</strong>
                      </p>
                      <p>
                      We built adaptive scoring and filtering models to surface the most promising sites while removing noise — a challenge no other site selection tool had solved at scale.
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Balanced quality & quantity (Automation-2)
                      </h4>
                      <div className="space-y-3 text-gray-600 text-base leading-relaxed">
                        <p>
                          <strong>Individual site scores lacked context — site evaluation needed to “connect the dots” across multiple factors.</strong>
                        </p>
                        <p>
                        At scale, insights became fragmented. Inspired by layered analysis, we built continuous linking across solar yield, grid capacity, land use, and permitting constraints — giving developers cohesive, end-to-end evaluations.
                        </p>
                        <p>
                          <strong>Efficiency was a massive barrier — real-time & long-term analysis had to be lightweight.</strong>
                        </p>
                        <p>
                        We achieved dramatic efficiency gains, boosting accuracy and granularity while cutting compute needs — enabling nation-scale analysis in a fraction of the time and cost.
                        </p>
                        <p>
                          <strong>Key Breakthrough:</strong> First real-time, privacy-preserving site selection engine that could deliver automated, highly accurate, and scalable analysis — turning months of fragmented work into a single-day, data-driven decision.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              
            </div>
          </div>

          {/* Team Section */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="text-center mb-16">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-6">
                THE TEAM BEHIND IT
              </p>
              <h2 className="text-[42px] leading-[48px] font-bold text-gray-900 max-w-[800px] mx-auto">
  A dedicated team crafting the ultimate 
  site selection platform for <span className="text-blue-600">developers & investors</span>
</h2>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              {/* Team Member 4 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border border-gray-300 overflow-hidden">
                  <img 
                    src="" 
                    alt="Reza Dolati profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">Dr. Younes Noorollahi</h3>
                <p className="text-gray-600 text-sm">Exctive chairman (Renewable Energy expert)</p>
              </div>
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border border-gray-300 overflow-hidden">
                  <img 
                    src="" 
                    alt="Amir Naseri profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">Amir Naseri</h3>
                <p className="text-gray-600 text-sm">CEO & Co-Founder (geography)</p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border border-gray-300 overflow-hidden">
                  <img 
                    src="src/assets/Gemini_Generated_Image_ifki4iifki4iifki.png" 
                    alt="Saeed Dolati profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">Saeed Dolati</h3>
                <p className="text-gray-600 text-sm">CPO & Co-Founder (Computer Engineering)</p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border border-gray-300 overflow-hidden">
                  <img 
                    src="" 
                    alt="Reza Dolati profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">Reza Dolati</h3>
                <p className="text-gray-600 text-sm">CTO & Founding Engineer (Electrical Engineering)</p>
              </div>
              
            </div>
          </div>

          {/* Download Section */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="text-center">
              
              {/* App Icon */}
              <div className="mb-8">
                <div className="w-24 h-24 rounded-2xl shadow-2xl shadow-gray-400/30 mx-auto flex items-center justify-center border border-gray-200 p-2">
                  <img 
                    src="/src/assets/sy_icon_transparent_background.png" 
                    alt="SiteSynergy App Icon" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Download text */}
              <div className="mb-8">
  <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-4">
    AVAILABLE NOW
  </p>
  <h2 className="text-[42px] leading-[48px] font-bold text-gray-900 mb-8">
    Transform site selection<br />
    with speed & precision
  </h2>
</div>

              {/* Get Started Button */}
              <div>
              <button className="mt-4 w-[140px] h-[38px] py-2 px-3 bg-white text-[#6d7f9f] border-none rounded-full text-base font-semibold cursor-pointer transition-transform duration-200 hover:-translate-y-[1px]">
              🚀Get Started
        </button>
              </div>
              
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;