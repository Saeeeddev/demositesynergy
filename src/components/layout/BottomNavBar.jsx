import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// Icons (copied from original)
const PlusIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const HomeIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const FolderIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L8.6 3.3a2 2 0 0 0-1.7-.9H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>;
const BarChartIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>;
const CreditCardIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>;

const BottomNavItem = ({ to, icon, label }) => (
    <NavLink to={to} className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-full transition-colors duration-200 ${isActive ? 'text-primary-blue' : 'text-gray-500 hover:text-primary-blue'}`}>
        <div className="w-6 h-6">{icon}</div>
        <span className="text-[10px] mt-1 font-medium">{label}</span>
    </NavLink>
);

const BottomNavBar = () => {
    const navigate = useNavigate();

    const navItems = [
        { to: '/dashboard', icon: <HomeIcon />, label: "Home" },
        { to: '/projects', icon: <FolderIcon />, label: "Projects" },
        { to: '/reports', icon: <BarChartIcon />, label: "Reports" },
        { to: '/payments', icon: <CreditCardIcon />, label: "Payments" },
    ];

    const leftItems = navItems.slice(0, 2);
    const rightItems = navItems.slice(2, 4);

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40">
            <div className="flex justify-around items-center h-full">
                <div className="flex items-center h-full">
                    {leftItems.map(item => <BottomNavItem key={item.to} {...item} />)}
                </div>
                <div className="relative -top-4">
                    <button onClick={() => navigate('/projects/new')} className="w-14 h-14 bg-primary-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-blue/90 transition-transform transform hover:-translate-y-1">
                        <PlusIcon className="w-7 h-7" />
                    </button>
                </div>
                <div className="flex items-center h-full">
                    {rightItems.map(item => <BottomNavItem key={item.to} {...item} />)}
                </div>
            </div>
        </div>
    );
};

export default BottomNavBar;