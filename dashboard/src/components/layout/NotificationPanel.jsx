import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/localData';
import { motion } from 'motion/react';
import { CheckCircleIcon, ExclamationTriangleIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

const getNotificationIcon = (type) => {
    switch (type) {
        case 'success': return <CheckCircleIcon className="h-6 w-6 text-emerald-500" />;
        case 'mention': return <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-sky-500" />;
        case 'failed': return <ExclamationTriangleIcon className="h-6 w-6 text-rose-500" />;
        default: return <div className="h-6 w-6 bg-gray-200 rounded-full" />;
    }
};

const NotificationPanel = ({ isMobile = false }) => {
    // Fetch notifications from DB
    const { data: notifications = [] } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => (await api.get('/notifications')).data
    });

    // Positioning Logic for RTL:
    // Mobile: Icons are on the Left in RTL header -> panel aligns left
    // Desktop: Sidebar is on the Right in RTL -> panel aligns right (next to sidebar)
    const motionProps = isMobile
        ? { className: "md:hidden fixed top-[68px] left-4 w-[calc(100vw-32px)] max-w-sm bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border z-[2000]" }
        : { className: "hidden md:block fixed bottom-4 right-[82px] w-[400px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border z-[2000]" };

    return (
        <motion.div {...motionProps} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} dir="rtl">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-lg text-gray-800">اعلان‌ها</h3>
                <button className="text-sm font-medium text-gray-600 hover:text-primary-blue transition-colors">خوانده شدن همه</button>
            </div>
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                    notifications.map(notif => (
                        <div key={notif.id} className={`p-4 hover:bg-gray-100/50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                            <div className="flex items-start gap-3">
                                <div className="relative w-10 h-10 flex-shrink-0">{getNotificationIcon(notif.type)}</div>
                                <div className="flex-grow pt-0.5">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">{notif.userName}</span> 
                                        {/* Simple translation logic based on English keys - in a real app use i18n keys */}
                                        {notif.type === 'mention' ? ' شما را در ' : 
                                         notif.type === 'success' ? ' عملیات موفق: ' : 
                                         notif.type === 'failed' ? ' خطا در: ' : ' فعالیت: '}
                                        {notif.target && <span className="font-semibold">"{notif.target}"</span>}
                                        {notif.action && notif.type !== 'mention' && ` - ${notif.action}`}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-sm text-gray-500">اعلانی وجود ندارد.</div>
                )}
            </div>
        </motion.div>
    );
};

export default NotificationPanel;
