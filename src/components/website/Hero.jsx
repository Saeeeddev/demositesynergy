import React from 'react';
import '../../style/Hero.css';
import LiquidChrome from './utils/LiquidChrome';

function Hero() {
  return (
    <div className="hero__container">
      <div className="hero__background">
        <LiquidChrome
          baseColor={[0, 0.1, 0.2]}
          speed={0.3}
          amplitude={0.25}
       
          interactive={false}
        />
      </div>
      <div className="hero__content-box">
        <h1>The most reliable way to select the optimal site</h1>
        <p>AI-driven analysis of location, solar potential, costs, and risks — empowering you to make faster, smarter, and more profitable site decisions.</p>
        <button className="hero__get-started-btn">Get Started</button>
      </div>
    </div>
  );
}

export default Hero;
