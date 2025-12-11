import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { useUIStore } from '../../stores/useUIStore';

const UserProfilePanel = ({ isMobile = false }) => {
    const navigate = useNavigate();
    const closeAllPanels = useUIStore(state => state.closeAllPanels);
    const user = { name: 'Saeed Dolati', email: 'dolatisaeed6@gmail.com' };

    const handleSettingsClick = () => {
        navigate('/settings');
        closeAllPanels();
    };

    const motionProps = isMobile
      ? { className: "md:hidden fixed top-[68px] right-4 w-screen max-w-[348px] bg-white rounded-lg shadow-xl py-2 z-[2000] border" }
      : { className: "hidden md:block fixed bottom-[72px] left-[82px] w-[368px] bg-white rounded-lg shadow-xl py-2 z-[2000] border" };

    return (
        <motion.div {...motionProps} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            <div className="px-4 py-3 border-b">
                <div className="flex items-center mt-2">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-3">S</div>
                    <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                </div>
            </div>
            <div className="px-1 py-2">
                <button onClick={handleSettingsClick} className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full">
                    <IoSettingsOutline className="w-5 h-5 mr-3 text-gray-500" /> Settings
                </button>
            </div>
            <div className="border-t mt-1 px-1 py-2">
                <button className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    <LuLogOut className="w-5 h-5 mr-3 text-gray-500" /> Log out
                </button>
            </div>
        </motion.div>
    );
};

export default UserProfilePanel;