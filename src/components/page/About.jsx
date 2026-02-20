import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../website/Header';
import Footer from '../website/Footer';

const About = () => {
  // Use the 'About' namespace to get the correct translations
  const { t } = useTranslation('About');

  // Get the team members object from the JSON to map over it dynamically
  const teamMembers = t('team.members', { returnObjects: true });
  // Define the order to maintain the layout from your original file
  const memberOrder = ['younes', 'amir', 'saeed', 'reza'];

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />
      
      <main className="w-full flex justify-center pt-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          {/* Hero Section */}
          <div className="w-full max-w-[1200px] mt-16 mb-24">
            <div className="text-center">
              {/* Small header text */}
              <div className="mb-8">
                <p className="text-xs font-medium font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
                  {t('hero.badge')}
                </p>
              </div>
              
              {/* Main headline */}
              <div className="mb-8">
                {/* The "whitespace-pre-line" class handles the '\n' from the JSON for line breaks */}
                <h1 className="text-[56px] leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto whitespace-pre-line">
                  {t('hero.title')}
                </h1>
              </div>
              
              {/* Description */}
              <div className="max-w-[600px] mx-auto">
                <p className="text-lg leading-[28px] text-gray-600">
                  {t('hero.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Left side - Title */}
              <div className="w-full lg:w-[500px] relative">
                <div className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:flex-col lg:justify-start lg:pt-24">
                  <div className="mb-8">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-6">
                      {t('progress.badge')}
                    </p>
                    <h2 className="text-[42px] leading-[48px] font-bold text-gray-900">
                      {t('progress.title')}
                    </h2>
                  </div>
                </div>
              </div>
              
              {/* Right side - Timeline */}
              <div className="w-full lg:w-[700px]">
                <div className="space-y-12">
                  
                  {/* Phase 1 */}
                  <div className="border-s-2 border-gray-200 ps-8 relative">
                    <div className="absolute start-[-9px] top-2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full"></div>
                    <div className="mb-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em]">
                        {t('progress.phase1.badge')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {t('progress.phase1.title')}
                    </h3>
                    <div className="space-y-3 text-gray-600 text-base leading-relaxed">
                      <p><strong>{t('progress.phase1.content.problem1')}</strong></p>
                      <p>{t('progress.phase1.content.solution1')}</p>
                      <p><strong>{t('progress.phase1.content.problem2')}</strong></p>
                      <p>{t('progress.phase1.content.solution2')}</p>
                      <p><strong>{t('progress.phase1.content.problem3')}</strong></p>
                      <p>{t('progress.phase1.content.solution3')}</p>
                      <p><strong>{t('common:buttons.breakthrough', 'Key Breakthrough:')}</strong> {t('progress.phase1.content.breakthrough')}</p>
                    </div>
                  </div>
                  
                  {/* Phase 2 */}
                  <div className="border-s-2 border-gray-200 ps-8 relative">
                    <div className="absolute start-[-9px] top-2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full"></div>
                    <div className="mb-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em]">
                        {t('progress.phase2.badge')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {t('progress.phase2.title')}
                    </h3>
                    <div className="space-y-3 text-gray-600 text-base leading-relaxed">
                      <p><strong>{t('progress.phase2.content.problem1')}</strong></p>
                      <p>{t('progress.phase2.content.solution1')}</p>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        {t('progress.phase2.subPhase.title')}
                      </h4>
                      <div className="space-y-3 text-gray-600 text-base leading-relaxed">
                        <p><strong>{t('progress.phase2.subPhase.problem2')}</strong></p>
                        <p>{t('progress.phase2.subPhase.solution2')}</p>
                        <p><strong>{t('progress.phase2.subPhase.problem3')}</strong></p>
                        <p>{t('progress.phase2.subPhase.solution3')}</p>
                        <p><strong>{t('common:buttons.breakthrough', 'Key Breakthrough:')}</strong> {t('progress.phase2.subPhase.breakthrough')}</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              
            </div>
          </div>

          {/* Team Section */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="text-center mb-16">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-6">
                {t('team.badge')}
              </p>
              <h2 className="text-[42px] leading-[48px] font-bold text-gray-900 max-w-[800px] mx-auto">
                
{t('team.title')}
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              {memberOrder.map(memberKey => {
                const member = teamMembers[memberKey];
                // Use a placeholder if image source is not available in JSON
                let imgSrc = ""; 
                if (memberKey === 'saeed') {
                  imgSrc = "src/assets/saeedprofil.png";
                }
                else if (memberKey === 'reza') {
                  imgSrc = "src/assets/rezaprofile.png";
                }
                else if (memberKey === 'amir') {
                  imgSrc = "src/assets/amirprofile.png";
            
                }
                else if (memberKey === 'younes') {
                  imgSrc = "src/assets/norolahi.jpg";
                }

                return (
                  <div key={member.name} className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border border-gray-300 overflow-hidden">
                      <img 
                        src={imgSrc} 
                        alt={`${member.name} profile`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Download Section */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="text-center">
              
              {/* App Icon */}
              <div className="mb-8">
                <div className="w-24 h-24 rounded-2xl shadow-2xl shadow-gray-400/30 mx-auto flex items-center justify-center border border-gray-200 p-2">
                  <img 
                    src="/src/assets/sy_icon_transparent_background.png" 
                    alt={t('download.appIconAlt')}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Download text */}
              <div className="mb-8">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-4">
                  {t('download.badge')}
                </p>
                <h2 className="text-[42px] leading-[48px] font-bold text-gray-900 mb-8 whitespace-pre-line">
                  {t('download.title')}
                </h2>
              </div>

              {/* Get Started Button */}
              <div>
                <button className="mt-4 w-[140px] h-[38px] py-2 px-3 bg-white text-[#6d7f9f] border-none rounded-full text-base font-semibold cursor-pointer transition-transform duration-200 hover:-translate-y-[1px]">
                  {t('download.cta')}
                </button>
              </div>
              
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;