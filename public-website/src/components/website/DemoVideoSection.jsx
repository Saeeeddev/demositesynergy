import React from 'react';
import NewProjectVideo from '../../assets/DemoVideos/NewProjectDemo.mp4'; // Ensure this path is correct

function DemoVideoSection({ t }) { // 👈 Accept 't' as a prop
  return (
    <section className="w-full max-w-[1350px] mx-auto bg-white px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-20 box-border">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-black text-2xl sm:text-3xl lg:text-[47px] leading-tight lg:leading-[51px] text-center font-bold mb-8 sm:mb-12 lg:mb-16 px-2">
          {t('demoVideo.title')} {/* 👈 Translated */}
        </h2>
        
        <div className="w-full max-w-[1280px] px-0 sm:px-6 lg:px-10 py-4 lg:py-8 mb-8 box-border">
          <div className="w-full shadow-demo-video p-1 border border-[#e5e7eb] bg-white rounded-2xl lg:rounded-[32px] box-border">
            <div className="relative w-full rounded-2xl lg:rounded-[32px] border border-[#e5e7eb] overflow-hidden">
              <video 
                className="block w-full aspect-[1280/580] object-contain pointer-events-none select-none"
                autoPlay 
                muted 
                loop 
                playsInline
                preload="metadata"
                disablePictureInPicture
              >
                <source src={NewProjectVideo} type="video/mp4"/>
                {t('demoVideo.videoFallback', 'Your browser does not support the video tag.')} {/* 👈 Translated */}
              </video>
              <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-[5px] bg-white" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-[5px] bg-white" />
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1040px] flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-12 px-2 sm:px-6">
          <div className="w-full md:w-[320px] flex flex-col items-start">
            <div className="w-6 h-6 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="#111827" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-black text-lg sm:text-xl lg:text-[21px] tracking-[-0.28px] leading-tight lg:leading-[21px] font-semibold m-0 mb-2">
              {t('demoVideo.features.comprehensive.title')} {/* 👈 Translated */}
            </h3>
            <p className="text-[#6b7280] text-base lg:text-[17px] leading-relaxed lg:leading-[22.8px] m-0">
              {t('demoVideo.features.comprehensive.description')} {/* 👈 Translated */}
            </p>
          </div>

          <div className="w-full md:w-[320px] flex flex-col items-start">
            <div className="w-6 h-6 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3.89543 5 4.89543 4 6 4H14" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-black text-lg sm:text-xl lg:text-[21px] tracking-[-0.28px] leading-tight lg:leading-[21px] font-semibold m-0 mb-2">
              {t('demoVideo.features.instant.title')} {/* 👈 Translated */}
            </h3>
            <p className="text-[#6b7280] text-base lg:text-[17px] leading-relaxed lg:leading-[22.8px] m-0">
              {t('demoVideo.features.instant.description')} {/* 👈 Translated */}
            </p>
          </div>

          <div className="w-full md:w-[320px] flex flex-col items-start">
            <div className="w-6 h-6 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-black text-lg sm:text-xl lg:text-[21px] tracking-[-0.28px] leading-tight lg:leading-[21px] font-semibold m-0 mb-2">
              {t('demoVideo.features.riskOptimized.title')} {/* 👈 Translated */}
            </h3>
            <p className="text-[#6b7280] text-base lg:text-[17px] leading-relaxed lg:leading-[22.8px] m-0">
             {t('demoVideo.features.riskOptimized.description')} {/* 👈 Translated */}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoVideoSection;
