import React, { useRef, useEffect } from 'react';
import '../../style/DataToDecision.css';

const DataToDecision = () => {
  // Create three refs, one for each box that needs the glow effect
  const glowBoxRef1 = useRef(null);
  const glowBoxRef2 = useRef(null);
  const glowBoxRef3 = useRef(null);

  useEffect(() => {
    // Put all the refs into an array to easily loop over them
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

      // Cleanup function for each container
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    });
  }, []); // Empty array ensures this effect runs only once on mount

  return (
    <div className="DataToDecision-section__container">
      <div className="DataToDecision-section__content">
        <h2 className="DataToDecision-section__header">
          Designed for accuracy, delivered with speed
        </h2>
        
        <div className="DataToDecision-section__main-box">
          {/* Box 1: Add the first ref and the new common CSS class */}
          <div className="DataToDecision-section__left-box glow-effect-box" ref={glowBoxRef1}> 
            <div className="DataToDecision-section__left-top-box">
              <h3 className="DataToDecision-section__left-top-box__header">Smarter decisions</h3>
              <p className="DataToDecision-section__left-top-box__text">
                Solar, grid, land, and infrastructure — all in one place.
              </p>
            </div>
            <div className="DataToDecision-section__left-image-box">
              <div className="DataToDecision-section__image-placeholder">
               <img 
                 src="src/assets/desiion.png" 
                 alt="Solar, grid, infrastructure" 
               />
              </div>
            </div>
          </div>

          <div className="DataToDecision-section__right-box">
            {/* Box 2: Add the second ref and the new common CSS class */}
            <div className="DataToDecision-section__right-top-box glow-effect-box" ref={glowBoxRef2}>
                <div className="DataToDecision-box__text-content">
                  <h3 className="DataToDecision-box__header">Your criteria</h3>
                  <p className="DataToDecision-box__paragraph">
                   Set weights, choose factors, and review results on completion.
                  </p>
                </div>
                  <div className="DataToDecision-section__image-placeholder DataToDecision-section__image-placeholder--small">
                    <img src="src/assets/sdfsf.png" alt="set weights choose factors"/>
                  </div>
            </div>
            {/* Box 3: Add the third ref and the new common CSS class */}
            <div className="DataToDecision-section__right-bottom-box glow-effect-box" ref={glowBoxRef3}>
                <div className="DataToDecision-box__text-content">
                  <h3 className="DataToDecision-box__header">Transparent by default</h3>
                  <p className="DataToDecision-box__paragraph">
                   Every score is backed by trusted data.
                  </p>
                </div>
                  <div className="DataToDecision-section__image-placeholder DataToDecision-section__image-placeholder--medium">
                     <img src="src/assets/transparentTrust.png" alt="Every score is backed by trusted data." />
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataToDecision;