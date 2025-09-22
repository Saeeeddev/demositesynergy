import React from 'react';
import '../../style/SuitabilityLayer.css';
import syIcon from '../../assets/sy_icon_transparent_background.png';

// Icons (SolarIcon, TerrainIcon, etc.) remain the same...
const SolarIcon = () => ( <svg>...</svg> );
const TerrainIcon = () => ( <svg>...</svg> );
const GridIcon = () => ( <svg>...</svg> );
const WaterIcon = () => ( <svg>...</svg> );
const EnvironmentIcon = () => ( <svg>...</svg> );
const LocationIcon = () => ( <svg>...</svg> );
const CheckIcon = () => ( <svg>...</svg> );

function SuitabilityLayerSection({ t }) { // 👈 Accept 't' as a prop
  const linePaths = [
    // Paths remain the same...
    "M 25 10 C 40 80, 120 80, 150 70 S 208 145, 208 150",
    "M 98 10 C 98 80, 150 80, 170 70 S 208 145, 208 150",
    "M 166 10 C 170 80, 180 80, 188 70 S 208 145, 208 150",
    "M 242 10 C 246 80, 236 80, 228 70 S 208 145, 208 150",
    "M 318 10 C 316 80, 266 80, 246 70 S 208 145, 208 150",
    "M 392 10 C 376 80, 296 80, 266 70 S 208 145, 208 150",
  ];

  return (
    <div className="SuitabilityLayer-section__container">
      <div className="SuitabilityLayer-section__content">
        <h1 className="SuitabilityLayer-section__header" dangerouslySetInnerHTML={{ __html: t('suitabilityLayer.header').replace('—\n', '—<br />') }} /> {/* 👈 Translated */}
        <div className="SuitabilityLayer-section__main-box">
          <div className="SuitabilityLayer-section__inner-box">
            <div className="SuitabilityLayer-box__top-content">
              <h2 className="SuitabilityLayer-box__header">
                {t('suitabilityLayer.leftBox.title')} {/* 👈 Translated */}
              </h2>
              <p className="SuitabilityLayer-box__paragraph">
                {t('suitabilityLayer.leftBox.description')} {/* 👈 Translated */}
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
                {t('suitabilityLayer.rightBox.title')} {/* 👈 Translated */}
              </h2>
              <p className="SuitabilityLayer-box__paragraph">
                {t('suitabilityLayer.rightBox.description')} {/* 👈 Translated */}
              </p>
            </div>
            <div className="SuitabilityLayer-box__bottom-content">
              <div className="SuitabilityLayer-box__decision-bubble">
                {t('suitabilityLayer.rightBox.bubble')} {/* 👈 Translated */}
              </div>
              <div className="SuitabilityLayer-box__explanation-card">
                <div className="SuitabilityLayer-box__explanation-header">
                  <span className="SuitabilityLayer-box__site-label">{t('suitabilityLayer.rightBox.siteLabel')}</span> {/* 👈 Translated */}
                  <span className="SuitabilityLayer-box__score-text">{t('suitabilityLayer.rightBox.scoreText')}</span> {/* 👈 Translated */}
                </div>
                <div className="SuitabilityLayer-box__explanation-details">
                  {t('suitabilityLayer.rightBox.details')} {/* 👈 Translated */}
                </div>
                <div className="SuitabilityLayer-box__view-link">
                  {t('suitabilityLayer.rightBox.viewLink')} {/* 👈 Translated */}
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