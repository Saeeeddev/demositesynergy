import React, { useRef, useEffect } from 'react'; // <-- Import useRef and useEffect
import '../../style/DataToDecision.css';

const DataToDecision = () => {
  // Create a ref to attach to the DOM element
  const glowBoxRef = useRef(null);

  // This useEffect hook will add the mousemove event listener
  useEffect(() => {
    const container = glowBoxRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      // Get the position of the container
      const rect = container.getBoundingClientRect();

      // Calculate the mouse position relative to the container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update the CSS variables to move the glow
      container.style.setProperty('--x', `${x}px`);
      container.style.setProperty('--y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove the listener when the component is unmounted
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // <-- Empty array means this effect runs only once on mount

  return (
    <div className="DataToDecision-section__container">
      <div className="DataToDecision-section__content">
        <h2 className="DataToDecision-section__header">
          Designed for accuracy, delivered with speed
        </h2>
        
        <div className="DataToDecision-section__main-box">
          {/* Add the ref to the div you want the effect on */}
          <div className="DataToDecision-section__left-box" ref={glowBoxRef}> 
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
                 alt="An abstract representation of data" 
               />
              </div>
            </div>
          </div>

          {/* The rest of your component remains the same */}
          <div className="DataToDecision-section__right-box">
            <div className="DataToDecision-section__right-top-box DataToDecision-section__right-panel">
                <div className="DataToDecision-box__text-content">
                  <h3 className="DataToDecision-box__header">Your criteria</h3>
                  <p className="DataToDecision-box__paragraph">
                   Set weights, choose factors, and review results on completion.
                  </p>
                </div>
                  <div className="DataToDecision-section__image-placeholder DataToDecision-section__image-placeholder--small">
                    <img src="src/assets/sdffag.avif" alt="File structure diagram"/>
                  </div>
            </div>
            <div className="DataToDecision-section__right-bottom-box ">
                <div className="DataToDecision-box__text-content">
                  <h3 className="DataToDecision-box__header">Transparent by default</h3>
                  <p className="DataToDecision-box__paragraph">
                   Every score is backed by trusted data.
                  </p>
                </div>
                  <div className="DataToDecision-section__image-placeholder DataToDecision-section__image-placeholder--medium">
                     <img src="src/assets/sdds.avif" alt="Binary code with 100% Private badge" />
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataToDecision;