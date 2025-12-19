import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { useUIStore } from '../../stores/useUIStore';

const UserProfilePanel = ({ isMobile = false }) => {
    const navigate = useNavigate();
    const closeAllPanels = useUIStore(state => state.closeAllPanels);
    // In a real app, fetch this from useAuthStore or API
    const user = { name: 'سعید دولتی', email: 'dolatisaeed6@gmail.com' };

    const handleSettingsClick = () => {
        navigate('/settings');
        closeAllPanels();
    };

    // Positioning Logic for RTL:
    // Mobile: Left (under header icons)
    // Desktop: Right (next to sidebar)
    const motionProps = isMobile
      ? { className: "md:hidden fixed top-[68px] left-4 w-[calc(100vw-32px)] max-w-[348px] bg-white rounded-lg shadow-xl py-2 z-[2000] border" }
      : { className: "hidden md:block fixed bottom-[72px] right-[82px] w-[368px] bg-white rounded-lg shadow-xl py-2 z-[2000] border" };

    return (
        <motion.div {...motionProps} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} dir="rtl">
            <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center mt-2">
                    {/* User Avatar */}
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg ml-3 shadow-md">
                        S
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">{user.email}</p>
                    </div>
                </div>
            </div>
            
            <div className="px-1 py-2">
                <button onClick={handleSettingsClick} className="flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md w-full transition-colors text-right">
                    {/* ml-3 creates space to the left of the icon in RTL */}
                    <IoSettingsOutline className="w-5 h-5 ml-3 text-gray-500" /> 
                    تنظیمات حساب کاربری
                </button>
            </div>
            
            <div className="border-t border-gray-100 mt-1 px-1 py-2">
                <button className="w-full text-right flex items-center px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
                    <LuLogOut className="w-5 h-5 ml-3 text-rose-500" /> 
                    خروج از حساب
                </button>
            </div>
        </motion.div>
    );
};

export default UserProfilePanel;
