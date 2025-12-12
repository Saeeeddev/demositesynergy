import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { motion } from 'framer-motion';
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

    const motionProps = isMobile
        ? { className: "md:hidden fixed top-[68px] right-4 w-screen max-w-sm bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border z-[2000]" }
        : { className: "hidden md:block fixed bottom-4 left-[82px] w-[400px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border z-[2000]" };

    return (
        <motion.div {...motionProps} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-lg">Notifications</h3>
                <button className="text-sm font-medium text-gray-600 hover:text-primary-blue">Mark all as read</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map(notif => (
                        <div key={notif.id} className={`p-4 hover:bg-gray-100/50 ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                            <div className="flex items-start gap-3">
                                <div className="relative w-10 h-10 flex-shrink-0">{getNotificationIcon(notif.type)}</div>
                                <div className="flex-grow pt-0.5">
                                    <p className="text-sm">
                                        <span className="font-semibold">{notif.userName}</span> {notif.action} {notif.target && <span className="font-semibold">"{notif.target}"</span>}.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-sm text-gray-500">No notifications.</div>
                )}
            </div>
        </motion.div>
    );
};

export default NotificationPanel;