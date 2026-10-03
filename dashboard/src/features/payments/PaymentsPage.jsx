import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/localData';
import Pagination from '../../components/common/Pagination';
import { 
    CreditCardIcon, 
    ArrowDownTrayIcon, 
    MagnifyingGlassIcon,
    ChevronDownIcon 
} from '@heroicons/react/24/outline';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Active: 'bg-emerald-100 text-emerald-800',
    Paid: 'bg-emerald-100 text-emerald-800',
    Failed: 'bg-rose-100 text-rose-800',
    Pending: 'bg-amber-100 text-amber-800',
  };
  
  const statusLabels = {
    Active: 'فعال',
    Paid: 'پرداخت شده',
    Failed: 'ناموفق',
    Pending: 'در انتظار'
  };

  const style = statusStyles[status] || 'bg-gray-100 text-gray-800';
  const label = statusLabels[status] || status;

  return <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${style}`}>{label}</span>;
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
    <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8 py-6 text-right" dir="rtl">
        
      {/* --- Main Container --- */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-8">
        
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center">
                    <CreditCardIcon className="h-6 w-6 text-primary-blue ms-3" />
                    <h2 className="text-xl font-medium text-gray-800">پروژه‌های خریداری شده</h2>
                </div>
                {/* Badge for Next Update */}
                <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        جستجو و فیلتر در بروزرسانی بعدی
                    </span>
                </div>
            </div>

            {/* Filter Toolbar */}
            <div className="mb-6 relative">
                 {/* Notification Tooltip */}
                 {showNote && (
                    <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 z-20 w-max px-2 py-1 text-[11px] font-medium text-white bg-gray-800 rounded shadow-lg animate-fade-in-up">
                        ماژول در بروزرسانی بعدی فعال می‌شود
                        <div className="absolute top-full right-1/2 transform translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-gray-800"></div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input (Restricted) */}
                    <div 
                        className="relative md:col-span-1 cursor-pointer"
                        onClick={handleRestrictedAction}
                    >
                        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            readOnly
                            placeholder="جستجو با نام یا شناسه..."
                            className="ps-10 pe-4 py-2 block w-full rounded-lg border border-gray-300 focus:border-gray-300 focus:ring-0 text-sm cursor-pointer bg-white text-right"
                        />
                    </div>

                    {/* Type Dropdown (Restricted) */}
                    <div className="relative">
                        <button 
                            onClick={handleRestrictedAction} 
                            className="w-full flex items-center justify-between text-right ps-3 pe-2 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm hover:bg-gray-50 transition-colors"
                        >
                           <span className="text-gray-500">همه موارد</span>
                           <ChevronDownIcon className="h-5 w-5 text-gray-400"/>
                        </button>
                    </div>

                    {/* Date Dropdown (Restricted) */}
                    <div className="relative">
                       <button 
                            onClick={handleRestrictedAction} 
                            className="w-full flex items-center justify-between text-right ps-3 pe-2 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm hover:bg-gray-50 transition-colors"
                        >
                           <span className="text-gray-500">همه تاریخ‌ها</span>
                           <ChevronDownIcon className="h-5 w-5 text-gray-400"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Data Display */}
            {isLoading ? (
                <div className="text-center py-10 text-gray-500">در حال بارگذاری تاریخچه پرداخت...</div>
            ) : paginatedPayments.length > 0 ? (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نام پروژه</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">هزینه پروژه</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاریخ خرید</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                                    <th className="relative px-6 py-3"><span className="sr-only">فاکتور</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedPayments.map((p) => (
                                    <tr key={p.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium" dir="ltr">${p.cost.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {/* Date Logic */}
                                            {new Date(p.purchaseDate).toLocaleDateString('fa-IR')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={p.status} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                            <button className="text-primary-blue hover:text-primary-light-blue flex items-center">
                                                <ArrowDownTrayIcon className="h-4 w-4 me-1.5" />
                                                دانلود فاکتور
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card List */}
                    <div className="md:hidden space-y-4">
                        {paginatedPayments.map((p) => (
                            <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="font-semibold text-gray-900 ps-2">{p.name}</span>
                                    <StatusBadge status={p.status} />
                                </div>
                                <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                                    <div className="flex justify-between">
                                        <span>هزینه:</span>
                                        <span className="font-medium text-gray-800" dir="ltr">${p.cost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>تاریخ:</span>
                                        <span>{new Date(p.purchaseDate).toLocaleDateString('fa-IR')}</span>
                                    </div>
                                </div>
                                <div className="mt-4 border-t border-gray-100 pt-3">
                                    <button className="w-full text-primary-blue hover:text-primary-light-blue flex items-center justify-center text-sm font-medium">
                                        <ArrowDownTrayIcon className="h-4 w-4 me-1.5" />
                                        مشاهده فاکتور
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={setCurrentPage} 
                    />
                </>
            ) : (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
                    موردی یافت نشد
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
