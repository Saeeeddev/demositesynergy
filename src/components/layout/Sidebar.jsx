import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '../../stores/useUIStore';

// We will implement these full secondary bars in the next batches. 
// For now, these imports would fail, so I will conditionally render content directly.
import HomeSecondarySidebar from '../../features/dashboard/components/HomeSecondarySidebar';
import ProjectSecondarySidebar from '../../features/projects/components/ProjectSecondarySidebar';
import ReportSecondarySidebar from '../../features/reports/components/ReportSecondarySidebar';
import PaymentsSecondarySidebar from '../../features/payments/components/PaymentsSecondarySidebar';
import SettingSecondarySidebar from '../../features/settings/components/SettingSecondarySidebar';


// --- SVG Icons ---
const MenuIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const MenuCollapseIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="13" y2="12"></line><line x1="3" y1="6" x2="13" y2="6"></line><line x1="3" y1="18" x2="13" y2="18"></line><polyline points="18 16 15 12 18 10"></polyline></svg>;
const PlusIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const HomeIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const FolderIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L8.6 3.3a2 2 0 0 0-1.7-.9H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>;
const BarChartIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>;
const CreditCardIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>;
const BellIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;


const NewProjectButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center cursor-pointer group" onClick={() => navigate('/projects/new')}>
      <button className="w-10 h-10 bg-button-action-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-button-action-blue/90 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-primary-blue/40">
        <PlusIcon className="w-6 h-6" />
      </button>
      <span className="text-xs mt-2 font-semibold text-gray-700">New</span>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
    <NavLink to={to} className="w-[64px] h-[78px] flex justify-center items-center group cursor-pointer">
        {({ isActive }) => (
            <div className="w-[64px] h-[58px] flex flex-col items-center justify-center">
                <div className={`w-[40px] h-[40px] rounded-lg flex items-center justify-center transition-all duration-200 ${isActive ? "bg-button-action-blue text-white shadow-lg shadow-primary-blue/30" : "text-gray-500 group-hover:bg-primary-light-blue group-hover:text-button-action-blue"}`}>
                    {icon}
                </div>
                <span className={`text-xs mt-1 transition-colors duration-200 ${isActive ? 'text-button-action-blue font-semibold' : 'text-gray-700 group-hover:text-button-action-blue'}`}>{label}</span>
            </div>
        )}
    </NavLink>
);

const Sidebar = () => {
  const { isNavOpen, toggleNav, isNotificationOpen, toggleNotifications, isProfileOpen, toggleProfile } = useUIStore();
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', icon: <HomeIcon />, label: "Home" },
    { to: '/projects', icon: <FolderIcon />, label: "Projects" },
    { to: '/reports', icon: <BarChartIcon />, label: "Reports" },
    { to: '/payments', icon: <CreditCardIcon />, label: "Payments" },
  ];

  // Logic to render the correct Secondary Sidebar based on the route
  const renderSecondaryContent = () => {
    const p = location.pathname;
    
    // During this Batch 1, we import the files if they exist, or show placeholders if they fail (conceptually).
    // In practice, I will use the actual imports and if those files are placeholders in your current tree, it works.
    if (p.startsWith('/dashboard')) return <HomeSecondarySidebar />;
    if (p.startsWith('/projects')) return <ProjectSecondarySidebar />;
    if (p.startsWith('/reports')) return <ReportSecondarySidebar />;
    if (p.startsWith('/payments')) return <PaymentsSecondarySidebar />;
    if (p.startsWith('/settings')) return <SettingSecondarySidebar />;
    
    // Default fallback
    return <HomeSecondarySidebar />;
  };

  return (
    <div className="hidden md:flex sticky top-0 h-screen self-start z-50">
      
      {/* Primary Icon Sidebar */}
      <nav className={`w-[70px] h-screen bg-transparent flex flex-col items-center pt-[8px] shadow-sm self-start border-r border-gray-200/50 bg-white`}>
        <div className="h-[56px] w-[40px] flex items-center justify-center pb-[16px]">
          <button 
            onClick={toggleNav} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            {isNavOpen ? <MenuCollapseIcon className="w-5 h-5 text-gray-600" /> : <MenuIcon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
        
        <div className="h-[78px] w-[64px] flex justify-center items-center pb-[24px]">
            <NewProjectButton />
        </div>

        {navItems.map((item) => <NavItem key={item.to} {...item} />)}

        <div className="mt-auto mb-4 w-[40px] h-[140px] flex flex-col items-center justify-end space-y-4">
          <div className="relative">
            <button 
                onClick={toggleNotifications} 
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors relative ${isNotificationOpen ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            >
              <BellIcon className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-button-action-blue/75 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-button-action-blue"></span>
              </span>
            </button>
          </div>
          <div className="relative">
            <button 
                onClick={toggleProfile} 
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              <img src="https://placehold.co/40x40/a78bfa/ffffff?text=S" alt="User profile" className="w-8 h-8 rounded-full"/>
            </button>
          </div>
        </div>
      </nav>

      {/* Secondary Sliding Sidebar */}
      <div className={`transition-all duration-300 ease-in-out ${isNavOpen ? 'w-[264px]' : 'w-0'} ${!isNavOpen ? 'pointer-events-none' : ''}`}>
        <div className={`h-full flex flex-col w-[264px] bg-white border-r border-gray-200/50 ${isNavOpen ? 'opacity-100' : 'opacity-0'} ${!isNavOpen ? 'pointer-events-none' : ''}`}>
          
          {/* Logo Area */}
          <div className="h-[72px] px-[16px] pt-[12px] flex-shrink-0">
            <div className="h-[40px] w-[232px] flex items-center">
              <img 
                src="src/assets/images/sitesynergy_logo_colored.png" 
                alt="SiteSynergy Logo"
                className="h-full object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/232x40/cccccc/333333?text=Logo+Error'; }}
              />
            </div>
          </div>
          
          {/* Secondary Content Area */}
          <div className="w-[264px] px-[16px] flex-grow overflow-y-auto">
            {renderSecondaryContent()}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;