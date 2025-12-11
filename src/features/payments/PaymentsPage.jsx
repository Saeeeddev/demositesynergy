import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import Pagination from '../../components/common/Pagination';
import { 
    CreditCardIcon, 
    ArrowDownTrayIcon, 
    MagnifyingGlassIcon,
    ChevronDownIcon 
} from '@heroicons/react/24/outline';

const StatusBadge = ({ status }) => {
  const isPaid = status === 'Paid' || status === 'Active';
  const styles = isPaid 
    ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
    : 'bg-rose-50 text-rose-700 ring-rose-600/10';
    
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles}`}>
      {status}
    </span>
  );
};

const PaymentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showNote, setShowNote] = useState(false);

  const { data: payments = [], isLoading } = useQuery({ 
      queryKey: ['payments'], 
      queryFn: async () => (await api.get('/payments')).data 
  });

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const paginatedPayments = payments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRestrictedAction = () => {
    setShowNote(true);
    setTimeout(() => setShowNote(false), 2000);
  };

  return (
    <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8 py-6">
        
      {/* --- Header Section --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center">
                <div className="p-2 bg-primary-blue/10 rounded-lg mr-3">
                    <CreditCardIcon className="h-6 w-6 text-primary-blue" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Purchased Projects</h2>
            </div>
            {/* Restricted Feature Badge */}
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                Search & Filter available in next update
            </span>
        </div>

        {/* Toolbar Grid */}
        <div className="relative mb-2">
             {showNote && (
                <div className="absolute bottom-full left-4 mb-2 z-20 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-800 rounded shadow-lg animate-fade-in-up">
                    Module coming in next update
                    <div className="absolute top-full left-4 -mt-[1px] border-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" onClick={handleRestrictedAction}>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input readOnly placeholder="Search by name or ID..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm bg-white cursor-pointer" />
                </div>
                <button className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
                    Any Item Type <ChevronDownIcon className="h-4 w-4" />
                </button>
                <button className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
                    All Dates <ChevronDownIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
      </div>

      {/* --- Data Display --- */}
      {isLoading ? (
          <div className="text-center py-10 text-gray-500">Loading payment history...</div>
      ) : paginatedPayments.length > 0 ? (
        <div className="space-y-4">
            
            {/* Desktop Table */}
            <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Invoice</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedPayments.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{p.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${p.cost.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.purchaseDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={p.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary-blue hover:text-indigo-900 flex items-center justify-end w-full group">
                                        <ArrowDownTrayIcon className="h-4 w-4 mr-1.5 transition-transform group-hover:-translate-y-0.5" /> 
                                        Invoice
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {paginatedPayments.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <span className="font-semibold text-gray-900 line-clamp-1">{p.name}</span>
                            <StatusBadge status={p.status} />
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4 border-t border-gray-100 pt-3">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400">Date</span>
                                <span>{p.purchaseDate}</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xs text-gray-400">Amount</span>
                                <span className="font-semibold text-gray-800">${p.cost.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary-blue font-medium hover:bg-gray-100">
                            <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
                            Download Invoice
                        </button>
                    </div>
                ))}
            </div>

            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No payment history found.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;