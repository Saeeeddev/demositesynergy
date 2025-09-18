import React from 'react';
import LogoLoop from './utils/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact className="w-12 sm:w-[60px] h-12 sm:h-[60px] text-tech-icon" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="w-12 sm:w-[60px] h-12 sm:h-[60px] text-tech-icon" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="w-12 sm:w-[60px] h-12 sm:h-[60px] text-tech-icon" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="w-12 sm:w-[60px] h-12 sm:h-[60px] text-tech-icon" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

function CompanyLogos() {
  return (
    <div className="w-full sm:w-[90%] lg:w-[1200px] h-16 my-20 sm:my-24 lg:mt-[120px] lg:mb-[140px] mx-auto bg-white rounded-xl">
        <div className="text-[32px] sm:text-[36px] lg:text-[41px] text-black text-center py-5 -mt-[65px] font-medium">
            <h1>Companies choosing SiteSynergy</h1>
        </div>

      <div className="w-[90%] sm:w-[95%] lg:w-[1040px] h-16 mx-auto px-4 sm:px-8 lg:px-10 flex items-center">
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={58}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
}

export default CompanyLogos;
