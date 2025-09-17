import React from 'react';
import '../../style/CtaSection.css';

const CtaSection = () => {
  return (
    <div className="CtaSection-section__container">
      <div className="CtaSection-section__content">
        <div className="CtaSection-section__inner-box">
          <h2 className="CtaSection-section__header">
            "It's like I'm discovering the perfect site — with just a click"
          </h2>
          <button className="CtaSection__get-started-btn">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;