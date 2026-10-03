import React, { useRef, useEffect } from 'react';
import '../../style/DataToDecision.css';
import decisionImg from '../../assets/desiion.png';
import sdfsfImg from '../../assets/sdfsf.png';
import trustImg from '../../assets/transparentTrust.png';

const DataToDecision = ({ t }) => { // 👈 Accept 't' as a prop
  const glowBoxRef1 = useRef(null);
  const glowBoxRef2 = useRef(null);
  const glowBoxRef3 = useRef(null);

  useEffect(() => {
    const containers = [glowBoxRef1.current, glowBoxRef2.current, glowBoxRef3.current];
    containers.forEach(container => {
      if (!container) return;
      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        container.style.setProperty('--x', `${x}px`);
        container.style.setProperty('--y', `${y}px`);
      };
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    });
  }, []);

  return (
    <div className="DataToDecision-section__container">
      <div className="DataToDecision-section__content">
        <h2 className="DataToDecision-section__header">
          {t('dataToDecision.title')} {/* 👈 Translated */}
        </h2>
        
        <div className="DataToDecision-section__main-box">
          <div className="DataToDecision-section__left-box glow-effect-box" ref={glowBoxRef1}> 
            <div className="DataToDecision-section__left-top-box">
              <h3 className="DataToDecision-section__left-top-box__header">{t('dataToDecision.smarterDecisions.title')}</h3> {/* 👈 Translated */}
              <p className="DataToDecision-section__left-top-box__text">
                {t('dataToDecision.smarterDecisions.description')} {/* 👈 Translated */}
              </p>
            </div>
            <div className="DataToDecision-section__left-image-box">
              <div className="DataToDecision-section__image-placeholder">
               <img src={decisionImg} alt={t('dataToDecision.smarterDecisions.title')} />
              </div>
            </div>
          </div>

          <div className="DataToDecision-section__right-box">
            <div className="DataToDecision-section__right-top-box glow-effect-box" ref={glowBoxRef2}>
                <div className="DataToDecision-box__text-content">
                  <h3 className="DataToDecision-box__header">{t('dataToDecision.yourCriteria.title')}</h3> {/* 👈 Translated */}
                  <p className="DataToDecision-box__paragraph">
                   {t('dataToDecision.yourCriteria.description')} {/* 👈 Translated */}
                  </p>
                </div>
                <div className="DataToDecision-section__image-placeholder DataToDecision-section__image-placeholder--small">
                  <img src={sdfsfImg} alt={t('dataToDecision.yourCriteria.title')}/>
                </div>
            </div>
            <div className="DataToDecision-section__right-bottom-box glow-effect-box" ref={glowBoxRef3}>
                <div className="DataToDecision-box__text-content">
                  <h3 className="DataToDecision-box__header">{t('dataToDecision.transparentByDefault.title')}</h3> {/* 👈 Translated */}
                  <p className="DataToDecision-box__paragraph">
                   {t('dataToDecision.transparentByDefault.description')} {/* 👈 Translated */}
                  </p>
                </div>
                <div className="DataToDecision-section__image-placeholder DataToDecision-section__image-placeholder--medium">
                   <img src={trustImg} alt={t('dataToDecision.transparentByDefault.title')} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataToDecision;