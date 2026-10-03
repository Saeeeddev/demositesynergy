import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '../../../stores/useWizardStore';
import {
  CheckCircleIcon, 
  BuildingOfficeIcon, 
  ScaleIcon, 
  CurrencyDollarIcon,
  WrenchScrewdriverIcon, 
  ShieldCheckIcon,
  MapPinIcon,
  CheckIcon,
  DocumentTextIcon,
  BoltIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const ReviewItem = ({ label, value, unit, className = "" }) => (
  <div className={`text-right ${className}`}>
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="text-sm font-medium text-gray-800 mt-0.5 truncate" title={`${value} ${unit || ''}`}>
      {value}
      {unit && <span className="ms-1 text-xs text-gray-500">{unit}</span>}
    </p>
  </div>
);

const ReviewSection = ({ title, icon: Icon, children, className = "" }) => (
  <section className={`bg-white rounded-xl border border-gray-100 p-5 shadow-sm ${className}`}>
    <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
        <div className="p-2 bg-primary-blue/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary-blue" />
        </div>
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
    </div>
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {children}
    </div>
  </section>
);

const ReviewPage = ({ onBack, onConfirm, isSubmitting }) => {
  const navigate = useNavigate();
  const { 
      projectDetails, 
      financialSettings, 
      locationData, 
      criteriaSettings
  } = useWizardStore(state => state);
  
  const fs = financialSettings;
  const cs = criteriaSettings || { overallWeights: {}, opex_details: { personnel: {}, maintenance: {} } };
  const isReportOnly = projectDetails.serviceType === 'report';

  // --- Format Helpers ---
  const fmtPct = (val) => `${(parseFloat(val || 0) * 100).toFixed(1)}%`;
  const fmtNum = (val) => parseInt(val || 0).toLocaleString();
  const fmtCoord = (coords) => {
      if(!coords || !coords.points || coords.points.length === 0) return "-";
      return `${coords.points.length} راس`;
  };

  const getServiceLabel = (type) => {
      if (type === 'full') return 'مکان‌یابی + گزارش جامع';
      if (type === 'report') return 'فقط گزارش امکان‌سنجی';
      return 'نامشخص';
  };

  // --- JSON Generator ---
  const generatePayload = () => {
    const isStandard = projectDetails.analysisMode === 'standard';
    
    let points = [];
    if (locationData?.data?.geometry?.coordinates?.[0]) {
        points = locationData.data.geometry.coordinates[0].map(pt => ({ lat: pt[1], lon: pt[0] }));
    } else if (locationData?.data?.coordinates?.[0]) {
        points = locationData.data.coordinates[0].map(pt => ({ lat: pt[1], lon: pt[0] }));
    } else if (locationData?.data?.coordinates?.points) {
        points = locationData.data.coordinates.points;
    }

    let parameters = {};
    if (!isStandard) {
        parameters = {
            category_weights: {
                environmental: (cs.overallWeights.environmental || 0) / 100,
                technical: (cs.overallWeights.technical || 0) / 100,
                economic: (cs.overallWeights.economic || 0) / 100,
                geological: (cs.overallWeights.geological || 0) / 100
            },
            // ... (Other parameters would be mapped here as before)
        };
    }

    return {
        service_type: projectDetails.serviceType, 
        project_info: {
            project_name: projectDetails.name,
            project_manager: projectDetails.manager,
            company: projectDetails.company,
            location: projectDetails.location,
            client: projectDetails.owner,
            capacity_mw: parseFloat(projectDetails.capacity)
        },
        coordinates: { type: "polygon", points: points },
        analysis_mode: projectDetails.analysisMode,
        parameters: parameters, 
        financial_inputs: fs, // Simplified for brevity in this view
        plant_capacity_mw: parseFloat(projectDetails.capacity)
    };
  };

  const handleConfirmClick = async () => {
    try {
        const finalPayload = generatePayload();
        console.log("FINAL NEW PROJECT JSON:", JSON.stringify(finalPayload, null, 2));
        if (onConfirm) await onConfirm(finalPayload);
    } catch (error) {
        console.error("Payload generation error:", error);
        alert("خطا در ایجاد داده‌های نهایی.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 lg:p-6 thin-scrollbar">
        <div className="max-w-7xl mx-auto">
            
            {/* Header Summary */}
            <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                        <DocumentTextIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">نوع سرویس انتخابی</p>
                        <p className="text-lg font-bold text-gray-900">{getServiceLabel(projectDetails.serviceType)}</p>
                    </div>
                </div>
                {isReportOnly && (
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100">
                        حالت گزارش اختصاصی
                    </span>
                )}
            </div>

            {/* --- LAYOUT SWITCHER --- */}
            {isReportOnly ? (
                // REPORT ONLY LAYOUT: 2 Columns, Expanded Details & Financial
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    <div className="space-y-6">
                        <ReviewSection title="مشخصات عمومی پروژه" icon={BuildingOfficeIcon} className="h-full">
                            <ReviewItem label="نام پروژه" value={projectDetails.name} className="col-span-2" />
                            <ReviewItem label="شرکت مجری" value={projectDetails.company} />
                            <ReviewItem label="کارفرما" value={projectDetails.owner} />
                            <ReviewItem label="مدیر پروژه" value={projectDetails.manager} />
                            <ReviewItem label="آدرس/موقعیت" value={projectDetails.location} />
                        </ReviewSection>
                        
                        <ReviewSection title="پارامترهای فنی کلیدی" icon={BoltIcon}>
                            <ReviewItem label="ظرفیت نامی" value={fmtNum(fs.project_basics.capacity_mw)} unit="مگاوات" />
                            <ReviewItem label="تولید سال اول" value={fmtNum(fs.project_basics.production_year1_kwh)} unit="kWh" />
                        </ReviewSection>
                    </div>

                    <div className="space-y-6">
                        <ReviewSection title="شاخص‌های مالی و سرمایه‌گذاری" icon={CurrencyDollarIcon}>
                            <ReviewItem label="سرمایه‌گذاری کل (CAPEX)" value={fmtNum(fs.capex_breakdown.total_investment_cost_mil_rial)} unit="م.ر" className="col-span-2 text-lg text-emerald-700 font-bold" />
                            <ReviewItem label="تعرفه خرید (سال اول)" value={fmtNum(fs.sales_assumptions.electricity_tariff_year1_rial_kwh)} unit="ریال" />
                            <ReviewItem label="نرخ تورم سالانه" value={fmtPct(fs.financial_params.inflation_rate)} />
                            <ReviewItem label="دوره بازگشت سرمایه" value={fs.financing.repayment_period_years} unit="سال" />
                            <ReviewItem label="نرخ تنزیل (WACC)" value={fmtPct(fs.financial_params.discount_rate_wacc)} />
                        </ReviewSection>

                        <ReviewSection title="هزینه‌های عملیاتی (OPEX)" icon={WrenchScrewdriverIcon}>
                            <ReviewItem label="تعداد پرسنل فنی" value={parseInt(fs.opex_details.personnel.num_engineers) + parseInt(fs.opex_details.personnel.num_technicians)} unit="نفر" />
                            <ReviewItem label="هزینه نگهداری پنل" value={fmtPct(fs.opex_details.maintenance.panel_maintenance_percent)} />
                            <ReviewItem label="سایر هزینه‌های جاری" value={fmtNum(fs.opex_details.other_opex_mil_rial)} unit="م.ر" />
                        </ReviewSection>
                    </div>
                </div>
            ) : (
                // FULL ANALYSIS LAYOUT: 3/4 Columns, Compact
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ReviewSection title="مشخصات پروژه" icon={BuildingOfficeIcon}>
                        <ReviewItem label="نام پروژه" value={projectDetails.name} className="col-span-2 truncate" />
                        <ReviewItem label="شرکت" value={projectDetails.company} />
                        <ReviewItem label="مدیر" value={projectDetails.manager} />
                    </ReviewSection>

                    <ReviewSection title="جغرافیا و محدوده" icon={MapPinIcon}>
                        <ReviewItem label="روش انتخاب" value={projectDetails.scale === 'draw' ? 'رسم دستی' : 'تقسیمات'} />
                        <ReviewItem label="نام مکان" value={locationData?.name || '-'} className="truncate" />
                        <ReviewItem label="مساحت" value={fmtNum(locationData?.data?.properties?.areaSqKm)} unit="km²" />
                        <ReviewItem label="نقاط مرزی" value={fmtCoord(locationData?.data?.coordinates)} />
                    </ReviewSection>

                    <ReviewSection title="پیکربندی GIS" icon={ScaleIcon}>
                        <ReviewItem label="حالت تحلیل" value={projectDetails.analysisMode === 'standard' ? 'استاندارد' : 'سفارشی'} />
                        <ReviewItem label="وزن اقتصادی" value={cs.overallWeights.economic} unit="%" />
                        <ReviewItem label="وزن فنی" value={cs.overallWeights.technical} unit="%" />
                        <ReviewItem label="محیط‌زیست" value={cs.overallWeights.environmental} unit="%" />
                    </ReviewSection>

                    <ReviewSection title="خلاصه مالی" icon={CurrencyDollarIcon}>
                        <ReviewItem label="ظرفیت" value={fmtNum(fs.project_basics.capacity_mw)} unit="MW" />
                        <ReviewItem label="سرمایه‌گذاری" value={fmtNum(fs.capex_breakdown.total_investment_cost_mil_rial)} unit="م.ر" className="text-xs" />
                        <ReviewItem label="تعرفه" value={fmtNum(fs.sales_assumptions.electricity_tariff_year1_rial_kwh)} unit="ریال" />
                        <ReviewItem label="تورم" value={fmtPct(fs.financial_params.inflation_rate)} />
                    </ReviewSection>
                    
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
                        <ReviewSection title="جزئیات عملیاتی و پرسنلی" icon={UserGroupIcon}>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                <ReviewItem label="مهندسین" value={fs.opex_details.personnel.num_engineers} />
                                <ReviewItem label="تکنسین‌ها" value={fs.opex_details.personnel.num_technicians} />
                                <ReviewItem label="سایر هزینه‌ها" value={fmtNum(fs.opex_details.other_opex_mil_rial)} unit="م.ر" />
                                <ReviewItem label="نگهداری پنل" value={fmtPct(fs.opex_details.maintenance.panel_maintenance_percent)} />
                             </div>
                        </ReviewSection>
                    </div>
                </div>
            )}

        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-white rounded-b-xl flex-shrink-0 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-start gap-2 max-w-xl">
                  <ShieldCheckIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500 text-justify">
                      با تایید این فرم، صحت اطلاعات وارد شده را تایید می‌کنید و فرآیند {isReportOnly ? 'تولید گزارش' : 'تحلیل مکان‌یابی'} آغاز می‌شود.
                  </p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                      onClick={onBack}
                      className="flex-1 sm:flex-none px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                      disabled={isSubmitting}
                  >
                      بازگشت
                  </button>
                  <button 
                      onClick={handleConfirmClick} 
                      disabled={isSubmitting} 
                      className="flex-1 sm:flex-none px-8 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                        {isSubmitting ? 'در حال پردازش...' : (
                            <>
                                <CheckCircleIcon className="w-5 h-5" />
                                تایید و اجرای تحلیل
                            </>
                        )}
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ReviewPage;
