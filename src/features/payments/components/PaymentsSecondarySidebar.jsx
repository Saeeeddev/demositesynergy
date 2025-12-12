import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const PaymentsSecondarySidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: recentPayments = [] } = useQuery({
    queryKey: ['recentPayments'],
    queryFn: async () => (await api.get('/recentPayments')).data
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-emerald-500';
      case 'Pending': return 'text-amber-500';
      case 'Failed': return 'text-rose-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-full pt-4">
      <div className="w-full flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recent Payments</h3>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          {isOpen ? <IoChevronUp className="w-4 h-4 text-gray-400" /> : <IoChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="space-y-1">
          {recentPayments.length > 0 ? (
            recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-all duration-200">
                    <div className="flex-1 min-w-0 pr-2">
                        <span className="block text-sm font-medium text-gray-700 group-hover:text-primary-blue transition-colors truncate">
                            {payment.name}
                        </span>
                        {/* Date line removed as per request */}
                    </div>
                    <div className="text-right">
                        <span className="block text-xs font-bold text-gray-600">${payment.cost}</span>
                    </div>
                </div>
            ))
          ) : (
              <p className="text-xs text-gray-400 italic p-1">No recent payments.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentsSecondarySidebar;