import React from 'react';
import '../../style/DemoVideoSection.css';

function DemoVideoSection() {
  return (
    <div className="DemoVideo-section__container">
      <div className="DemoVideo-section__content">
        <h1 className="DemoVideo-section__header">
          Results That Drive Confident Decisions
        </h1>
        
        <div className="DemoVideo-section__top-box">
          <div className="DemoVideo-box__video-wrapper">
            <div className="DemoVideo-box__video-container">
              <video 
                className="DemoVideo-box__video"
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src="/src/assets/demos/hero-light-lg.webm" type="video/webm" style={{ objectFit: 'cover' }}/>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div className="DemoVideo-section__bottom-box">
          <div className="DemoVideo-bottom__feature-box">
            <div className="DemoVideo-feature__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="#111827" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="DemoVideo-feature__header">
              Comprehensive site analysis
            </h3>
            <p className="DemoVideo-feature__paragraph">
              Layer multiple data sources to quickly identify the most suitable solar sites.
            </p>
          </div>

          <div className="DemoVideo-bottom__feature-box">
            <div className="DemoVideo-feature__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3.89543 5 4.89543 4 6 4H14" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="DemoVideo-feature__header">
              Instant recommendations
            </h3>
            <p className="DemoVideo-feature__paragraph">
              Receive ranked site options with detailed scoring in hours, not months.
            </p>
          </div>

          <div className="DemoVideo-bottom__feature-box">
            <div className="DemoVideo-feature__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="DemoVideo-feature__header">
              Risk-optimized decisions
            </h3>
            <p className="DemoVideo-feature__paragraph">
             Make confident investments backed by transparent risk assessment and mitigation strategies.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default DemoVideoSection;