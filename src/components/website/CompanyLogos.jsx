import React from 'react';
import LogoLoop from './utils/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import '../../style/CompanyLogos.css';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

function CompanyLogos() {
  return (
    <div className="company-logos__container">
        <div
        className="company-logos__header">
            <h1>Companies choosing SiteSynergy</h1>
        </div>

      <div className="company-logos__inner">
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
