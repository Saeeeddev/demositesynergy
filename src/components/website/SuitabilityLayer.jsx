import React from 'react';
import '../../style/SuitabilityLayer.css';
import syIcon from '../../assets/sy_icon_transparent_background.png';



const SolarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2V4" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 20V22" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.92993 4.92999L6.33993 6.34002" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.6599 17.66L19.0699 19.07" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12H4" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12H22" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.92993 19.07L6.33993 17.66" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.6599 6.34002L19.0699 4.92999" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const TerrainIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 20L8.61878 11.2359C9.01012 10.6124 9.81434 10.5333 10.3121 11.0505L13.5 14.5L16.6893 9.43679C17.1526 8.78301 18.0694 8.86171 18.4231 9.56321L21 15" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 20H21" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const GridIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const WaterIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.69006C12 2.69006 17.66 8.35006 17.66 13.0101C17.66 16.1011 15.101 18.6601 12 18.6601C8.89904 18.6601 6.34009 16.1011 6.34009 13.0101C6.34009 8.35006 12 2.69006 12 2.69006Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const EnvironmentIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.7C12 21.7 4 17.7 4 10.7C4 6.2 7.58172 2.7 12 2.7C16.4183 2.7 20 6.2 20 10.7C20 17.7 12 21.7 12 21.7Z" stroke="#111827" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#111827" strokeWidth="2"/>
    </svg>
);
const LocationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="#111827" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#111827" strokeWidth="2"/>
    </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function SuitabilityLayerSection() {
const linePaths = [
  // far-left
  "M 25 10 C 40 80, 120 80, 150 70 S 208 145, 208 150",
  // mid-left
  "M 98 10 C 98 80, 150 80, 170 70 S 208 145, 208 150",
  // inner-left
  "M 166 10 C 170 80, 180 80, 188 70 S 208 145, 208 150",

  // inner-right
  "M 242 10 C 246 80, 236 80, 228 70 S 208 145, 208 150",
  // mid-right
  "M 318 10 C 316 80, 266 80, 246 70 S 208 145, 208 150",
  // far-right
  "M 392 10 C 376 80, 296 80, 266 70 S 208 145, 208 150",
];

  return (
    <div className="SuitabilityLayer-section__container">
      <div className="SuitabilityLayer-section__content">
        <h1 className="SuitabilityLayer-section__header">
          It starts with data—
          <br />
          at the site level
        </h1>
        <div className="SuitabilityLayer-section__main-box">
          <div className="SuitabilityLayer-section__inner-box">
            <div className="SuitabilityLayer-box__top-content">
              <h2 className="SuitabilityLayer-box__header">
                We layer every factor that matters
              </h2>
              <p className="SuitabilityLayer-box__paragraph">
                Automatically combines key site factors—land, solar, grid, environment, and more—for a complete view.
              </p>
            </div>
            <div className="SuitabilityLayer-box__bottom-content">
              <div className="SuitabilityLayer-box__bottom-top-box">
                  <SolarIcon />
                  <TerrainIcon />
                  <GridIcon />
                  <WaterIcon />
                  <EnvironmentIcon />
                  <LocationIcon />
              </div>
              <div className="SuitabilityLayer-box__bottom-lines-svg-container">
                <svg viewBox="0 0 416 150" preserveAspectRatio="none">
                  {linePaths.map((path, index) => (
                    <g key={index}>
                      <path d={path} className="SuitabilityLayer-box__bottom-line-base" />
                      <path d={path} className="SuitabilityLayer-box__bottom-line-flow" style={{ animationDelay: `${index * 0.3}s` }} />
                    </g>
                  ))}
                </svg>
              </div>
              <div className="SuitabilityLayer-box__image-placeholder">
                  <img src={syIcon} alt="SY icon" />
              </div>
            </div>
          </div>
          {/* Right Side – Recommendation Insight */}
                  <div className="SuitabilityLayer-section__inner-box">
   
<div className="SuitabilityLayer-box__top-content">
  <h2 className="SuitabilityLayer-box__header">
    Decisions you can trust
  </h2>
  <p className="SuitabilityLayer-box__paragraph">
    Every recommendation comes with clear reasoning. Understand exactly why each site ranks where it does.
  </p>
</div>

<div className="SuitabilityLayer-box__bottom-content">
  <div className="SuitabilityLayer-box__decision-bubble">
    Why is this site ranked #1 in the region?
  </div>
  
  <div className="SuitabilityLayer-box__explanation-card">
    <div className="SuitabilityLayer-box__explanation-header">
      <span className="SuitabilityLayer-box__site-label">Site A-47</span>
      <span className="SuitabilityLayer-box__score-text">scored 94/100</span>
    </div>
    <div className="SuitabilityLayer-box__explanation-details">
      Grid proximity (0.2mi) and optimal solar conditions drove the high ranking.
    </div>
    <div className="SuitabilityLayer-box__view-link">
      📊 Full analysis
    </div>
  </div>
</div>
                  </div>

        </div>
      </div>
    </div>
  );
}

export default SuitabilityLayerSection;