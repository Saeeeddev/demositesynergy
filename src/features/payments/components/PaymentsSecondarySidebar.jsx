import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const PaymentsSecondarySidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: payments = [] } = useQuery({
    queryKey: ['recentPayments'],
    queryFn: async () => (await api.get('/payments?_limit=5')).data
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
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recent Transactions</h3>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          {isOpen ? <IoChevronUp className="w-4 h-4 text-gray-400" /> : <IoChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="space-y-2">
          {payments.length > 0 ? (
            payments.map((payment) => (
                <div key={payment.id} className="block p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-default border border-transparent hover:border-gray-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 truncate flex-1 pr-2" title={payment.name}>
                            {payment.name}
                        </span>
                        <span className="text-xs font-bold text-gray-900">${payment.cost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-gray-400">Ref: {payment.id.split('_')[1]}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${getStatusColor(payment.status)}`}>
                            {payment.status}
                        </span>
                    </div>
                </div>
            ))
          ) : (
              <p className="text-xs text-gray-400 italic p-1">No recent transactions.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentsSecondarySidebar;