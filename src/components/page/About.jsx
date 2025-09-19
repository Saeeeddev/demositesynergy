import React from 'react';
import Header from '../website/Header';
import Footer from '../website/Footer';

const About = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />
      
      <main className="w-full flex justify-center pt-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          {/* Main Container - w:1200px */}
          <div className="w-full max-w-[1200px] mt-8 sm:mt-12 md:mt-16">
            
            {/* Top Box - w:840px, h:225px */}
            <div className="w-full max-w-[840px] h-[225px] mx-auto">
              
              {/* Inner Box - w:588px, h:225px */}
              <div className="w-full max-w-[588px] h-[225px]">
                
                {/* Header Text - 12px, line-height 16.8px, font-weight 500 */}
                <div className="mb-4">
                  <p className="text-xs leading-[16.8px] font-medium text-gray-600 uppercase tracking-wider">
                    HOW WE GOT TO THIS POINT
                  </p>
                </div>
                
                {/* Main Title Box - w:588px, h:100px */}
                <div className="w-full max-w-[588px] h-[100px] mb-6">
                  <h1 className="text-[42px] leading-[50.4px] tracking-[-1.4px] font-display font-bold text-black">
                    Progress towards the mission
                  </h1>
                </div>
                
                {/* Description Box - w:588px, h:75px */}
                <div className="w-full max-w-[588px] h-[75px]">
                  <p className="text-lg leading-[25px] text-text-dark">
                    Building intelligent site selection tools through continuous innovation, 
                    solving complex geospatial challenges with privacy-first design and 
                    enterprise-grade performance.
                  </p>
                </div>
                
              </div>
            </div>
            
            {/* Two Column Section - w:1200px */}
            <div className="w-full max-w-[1200px] mt-16 flex flex-col lg:flex-row gap-8">
              
              {/* Left Box - w:600px, h:82px, positioned from top 120px */}
              <div className="w-full lg:w-[600px] lg:mt-[120px]">
                <div className="h-[82px] flex items-center">
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 font-medium">
                      INNOVATION TIMELINE
                    </p>
                    <p className="text-base text-text-dark mt-2">
                      Key breakthroughs in geospatial intelligence and site optimization
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Box - w:600px, h:536px */}
              <div className="w-full lg:w-[600px] h-[536px]">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 h-full p-8 relative">
                  
                  {/* Timeline Separator Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
                  
                  {/* Timeline Items */}
                  <div className="relative space-y-12">
                    
                    {/* Timeline Item 1 */}
                    <div className="relative pl-8">
                      <div className="absolute left-[-4px] top-2 w-2 h-2 bg-primary-blue rounded-full border-2 border-white shadow"></div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                        2022/2023 — PHASE I
                      </div>
                      <h3 className="text-lg font-semibold text-text-dark mb-3">
                        Solved "broad-context" ingestion
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        No existing AI system could passively capture and associate context 
                        across applications. Built foundational data ingestion capabilities.
                      </p>
                    </div>
                    
                    {/* Timeline Item 2 */}
                    <div className="relative pl-8">
                      <div className="absolute left-[-4px] top-2 w-2 h-2 bg-primary-blue rounded-full border-2 border-white shadow"></div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                        2024/2025 — PHASE II
                      </div>
                      <h3 className="text-lg font-semibold text-text-dark mb-3">
                        Solved "proactive formation" (LTM-1)
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Developed intelligent pattern recognition to identify optimal site 
                        characteristics and automate complex geospatial analysis workflows.
                      </p>
                    </div>
                    
                    {/* Timeline Item 3 */}
                    <div className="relative pl-8">
                      <div className="absolute left-[-4px] top-2 w-2 h-2 bg-gray-300 rounded-full border-2 border-white shadow"></div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                        CURRENT
                      </div>
                      <h3 className="text-lg font-semibold text-text-dark mb-3">
                        Balanced quality & quantity (LTM-2)
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Achieving real-time processing of massive geospatial datasets while 
                        maintaining precision and performance standards.
                      </p>
                    </div>
                    
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Third Section - w:1200px, h:304px */}
            <div className="w-full max-w-[1200px] h-[304px] mt-16">
              
              {/* Top Box - w:720px, h:132px */}
              <div className="w-full max-w-[720px] h-[132px] mb-8">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 h-full">
                  <h2 className="text-2xl font-semibold text-text-dark mb-4">
                    Mission-Driven Development
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Every feature we build serves our core mission: empowering organizations to make 
                    better location decisions through intelligent, privacy-preserving geospatial analysis.
                  </p>
                </div>
              </div>
              
              {/* Bottom Box - w:1200px, h:92px */}
              <div className="w-full max-w-[1200px] h-[92px]">
                <div className="bg-gradient-to-r from-primary-blue to-secondary-green rounded-lg shadow-md p-8 h-full flex items-center">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      The Future of Site Intelligence
                    </h3>
                    <p className="text-sm opacity-90">
                      Transforming how businesses discover, evaluate, and optimize their physical presence 
                      through advanced geospatial AI and real-time market insights.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Fourth Section - w:1200px, h:515px (empty for now) */}
            <div className="w-full max-w-[1200px] h-[515px] mt-16 mb-16">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 h-full p-8 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-sm">
                    Future content area - Coming soon
                  </p>
                </div>
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
