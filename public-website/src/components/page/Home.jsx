import React from 'react';
import { useTranslation } from 'react-i18next'; // 👈 1. Import the hook

// Import all the sections of your home page
import Hero from '../website/Hero';
import HeroVideoDemo from '../website/HeroVideoDemo';
import CompanyLogos from '../website/CompanyLogos';
import SuitabilityLayerSection from '../website/SuitabilityLayer';
import DemoVideoSection from '../website/DemoVideoSection';
import CtaSection from '../website/CtaSection';
import DataToDecision from '../website/DataToDecision';
import StackedPreviewSection from '../website/StackedPreviewSection';
import '../../../src/assets/fonts/fonts.css'

function Home() {
  // 👈 2. Get the 't' function for the 'Home' namespace
  const { t } = useTranslation('Home');

  return (
    <main>
      {/* 👈 3. Pass the 't' function as a prop to each child */}
      <Hero t={t} />
      <HeroVideoDemo /> {/* This component has no text */}
      
      <SuitabilityLayerSection t={t} />
      <DemoVideoSection t={t} />
      <DataToDecision t={t} />
      <StackedPreviewSection t={t} />
      <CompanyLogos t={t} />
      <CtaSection t={t} />
    </main>
  );
}

export default Home;