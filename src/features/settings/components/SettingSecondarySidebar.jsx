import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'; // Using Heroicons for consistency

const SettingSecondarySidebar = () => {
  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        `flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
          isActive ? 'bg-button-action-blue text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {/* RTL: Changed ml-3 to mr-3 */}
      <span className="mr-3 text-sm font-medium">{label}</span>
    </NavLink>
  );

  return (
    <div className="w-full h-full text-gray-800 pt-3 text-right" dir="rtl">
      <nav>
        <div className="mt-2">
          {/* RTL: Changed px-2 to text-right */}
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 text-right">حساب شخصی</h3>
          <ul className="space-y-1">
            <li><NavItem to="/settings" icon={UserIcon} label="پروفایل شما" /></li>
            <li><NavItem to="/settings/security" icon={LockClosedIcon} label="ورود و امنیت" /></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SettingSecondarySidebar;
