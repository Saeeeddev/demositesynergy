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
  CheckIcon 
} from '@heroicons/react/24/outline';

const ReviewItem = ({ label, value, unit }) => (
  <div className="text-right">
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="text-sm font-medium text-gray-800 mt-0.5 truncate" title={`${value} ${unit || ''}`}>
      {value}
      {unit && <span className="ms-1 text-xs text-gray-500">{unit}</span>}
    </p>
  </div>
);

const ReviewSection = ({ title, icon: Icon, children }) => (
  <section>
    <div className="flex items-center gap-3 border-b border-gray-200 pb-3 mb-4">
        <div className="p-2 bg-primary-blue/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary-blue" />
        </div>
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
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
      criteriaSettings,
      reset 
  } = useWizardStore(state => state);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fs = financialSettings;
  const cs = criteriaSettings || { overallWeights: {}, opex_details: { personnel: {}, maintenance: {} } };

  // --- Format Helpers ---
  const fmtPct = (val) => `${(parseFloat(val || 0) * 100).toFixed(1)}%`;
  const fmtNum = (val) => parseInt(val || 0).toLocaleString();
  const fmtCoord = (coords) => {
      if(!coords || !coords.points || coords.points.length === 0) return "-";
      return `${coords.points.length} راس`;
  };

  // --- JSON Generator Function ---
  const generatePayload = () => {
    const isStandard = projectDetails.analysisMode === 'standard';
    
    // 1. Coordinates Transformation
    let points = [];
    if (locationData?.data?.geometry?.coordinates?.[0]) {
        points = locationData.data.geometry.coordinates[0].map(pt => ({
            lat: pt[1], 
            lon: pt[0]
        }));
    } else if (locationData?.data?.coordinates?.[0]) {
        points = locationData.data.coordinates[0].map(pt => ({
            lat: pt[1], 
            lon: pt[0]
        }));
    }

    // 2. Parameters Transformation
    let parameters = {};

    if (!isStandard) {
        parameters = {
            category_weights: {
                environmental: (cs.overallWeights.environmental || 0) / 100,
                technical: (cs.overallWeights.technical || 0) / 100,
                economic: (cs.overallWeights.economic || 0) / 100,
                geological: (cs.overallWeights.geological || 0) / 100
            },
            slope: { enabled: cs.technical?.slope?.enabled, weight: cs.technical?.slope?.weight },
            ghi: { enabled: cs.technical?.ghi?.enabled, weight: cs.technical?.ghi?.weight },
            power_lines: { enabled: cs.economic?.powerDistance?.enabled, weight: cs.economic?.powerDistance?.weight },
            roads: { enabled: cs.economic?.roadsDistance?.enabled, weight: cs.economic?.roadsDistance?.weight },
            protected_areas: { enabled: cs.environmental?.protectedAreas?.enabled, weight: cs.environmental?.protectedAreas?.weight },
            osm_landuse: { enabled: cs.technical?.landUse?.enabled, weight: cs.technical?.landUse?.weight },
            railways: { enabled: cs.economic?.railwaysDistance?.enabled, weight: cs.economic?.railwaysDistance?.weight },
            airports: { enabled: cs.economic?.airportDistance?.enabled, weight: cs.economic?.airportDistance?.weight },
            // REMOVED: historicSites, mines, militaryArea from payload to prevent crashes
            fault: { enabled: cs.geological?.faultLines?.enabled, weight: cs.geological?.faultLines?.weight },
            villages: { enabled: true, weight: 5 }, 
            rivers: { enabled: true, weight: 2 }, 
        };
    }

    return {
        project_info: {
            project_name: projectDetails.name,
            project_manager: projectDetails.manager,
            company: projectDetails.company,
            location: projectDetails.location,
            client: projectDetails.owner,
            capacity_mw: parseFloat(projectDetails.capacity)
        },
        coordinates: {
            type: "polygon",
            points: points
        },
        analysis_mode: projectDetails.analysisMode,
        data_paths: {
            dem: "Default_Path_Or_Null",
            fault: "Default_Path_Or_Null",
            ghi: "Default_Path_Or_Null",
            protected_areas: "Default_Path_Or_Null"
        },
        parameters: parameters, 
        financial_inputs: {
            project_basics: {
                production_year1_kwh: fs.project_basics.production_year1_kwh
            },
            capex_breakdown: {
                description: "هزینه‌های سرمایه‌گذاری",
                total_investment_cost_mil_rial: fs.capex_breakdown.total_investment_cost_mil_rial,
                salvage_value_mil_rial: fs.capex_breakdown.salvage_value_mil_rial,
                equipment_mil_rial: 0,
                civil_buildings_mil_rial: 0,
                civil_foundation_mil_rial: 0,
                grid_connection_mil_rial: 0,
                engineering_mil_rial: 0,
                rental_equipment_mil_rial: 0,
                surplus_material_cost_mil_rial: 0,
                pre_opening_mil_rial: 0,
                installation_mil_rial: 0,
                contingency_mil_rial: 0,
                excess_material_sales_mil_rial: 0
            },
            opex_details: {
                personnel: {
                   ...fs.opex_details.personnel
                },
                maintenance: {
                   ...fs.opex_details.maintenance,
                   panel_cleaning_percent: 0.002,
                   panel_repair_percent: 0.005,
                   civil_maintenance_percent: 0.015,
                   grid_maintenance_percent: 0.008,
                   security_hse_percent: 0.005
                },
                other_opex_mil_rial: fs.opex_details.other_opex_mil_rial
            },
            sales_assumptions: fs.sales_assumptions,
            financial_params: fs.financial_params,
            financing: fs.financing
        },
        plant_capacity_mw: parseFloat(projectDetails.capacity)
    };
  };

  // --- Handlers ---
  const handleConfirmClick = async () => {
    try {
        const finalPayload = generatePayload();
        console.log("Submission JSON:", JSON.stringify(finalPayload, null, 4));
        
        if (onConfirm) {
            await onConfirm(finalPayload);
        }
        
        // Show success modal ONLY if no error occurred
        setShowSuccessModal(true);
    } catch (error) {
        console.error("Payload generation or submission error:", error);
        alert("خطا در ایجاد داده‌های نهایی.");
    }
  };

  const handleModalClose = () => {
      setShowSuccessModal(false);
      reset();
      navigate('/projects');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
      
      {/* --- Success Modal Overlay --- */}
      {showSuccessModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center text-center transform scale-100 animate-in zoom-in-95 duration-200">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                    <CheckIcon className="w-10 h-10 text-emerald-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                    تحلیل ثبت شد!
                </h3>
                <div className="text-sm text-gray-600 space-y-3 mb-6">
                    <p>
                        تحلیل پروژه شما با موفقیت ارسال شد و در حال پردازش است.
                    </p>
                    <p>
                        پس از آماده شدن گزارش، از طریق ایمیل به شما اطلاع داده خواهد شد. این فرآیند معمولاً <span className="font-bold text-gray-800">کمتر از ۲۴ ساعت</span> زمان می‌برد.
                    </p>
                </div>
                <button 
                    onClick={handleModalClose}
                    className="w-full py-3 bg-[#63748E] hover:bg-[#4F5D75] text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                    متوجه شدم
                </button>
            </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 lg:p-6 thin-scrollbar">
        <div className="max-w-7xl mx-auto space-y-8">
            
            <ReviewSection title="مشخصات پروژه و مکان" icon={BuildingOfficeIcon}>
                <ReviewItem label="نام پروژه" value={projectDetails.name} />
                <ReviewItem label="شرکت" value={projectDetails.company} />
                <ReviewItem label="کارفرما" value={projectDetails.owner} />
                <ReviewItem label="مدیر" value={projectDetails.manager} />
                <ReviewItem label="آدرس" value={projectDetails.location} />
            </ReviewSection>

            <ReviewSection title="جغرافیا و محدوده" icon={MapPinIcon}>
                <ReviewItem label="روش انتخاب" value={projectDetails.scale === 'draw' ? 'رسم دستی' : 'تقسیمات کشوری'} />
                <ReviewItem label="نام مکان" value={locationData?.name || '-'} />
                <ReviewItem label="مساحت" value={fmtNum(locationData?.data?.properties?.areaSqKm)} unit="km²" />
                <ReviewItem label="نقاط مرزی" value={fmtCoord(locationData?.data?.coordinates)} />
            </ReviewSection>

            <ReviewSection title="پیکربندی GIS" icon={ScaleIcon}>
                <ReviewItem label="حالت تحلیل" value={projectDetails.analysisMode === 'standard' ? 'استاندارد' : 'سفارشی'} />
                <ReviewItem label="وزن اقتصادی" value={cs.overallWeights.economic} unit="%" />
                <ReviewItem label="وزن فنی" value={cs.overallWeights.technical} unit="%" />
                <ReviewItem label="وزن زیست‌محیطی" value={cs.overallWeights.environmental} unit="%" />
                <ReviewItem label="وزن زمین‌شناسی" value={cs.overallWeights.geological} unit="%" />
            </ReviewSection>

            <ReviewSection title="ورودی‌های مالی" icon={CurrencyDollarIcon}>
                <ReviewItem label="ظرفیت" value={fmtNum(fs.project_basics.capacity_mw)} unit="مگاوات" />
                <ReviewItem label="عمر پروژه" value={fs.project_basics.project_lifetime_years} unit="سال" />
                <ReviewItem label="تولید (سال اول)" value={fmtNum(fs.project_basics.production_year1_kwh)} unit="kWh" />
                <ReviewItem label="سرمایه‌گذاری کل" value={fmtNum(fs.capex_breakdown.total_investment_cost_mil_rial)} unit="م.ر" />
                <ReviewItem label="تعرفه (سال اول)" value={fmtNum(fs.sales_assumptions.electricity_tariff_year1_rial_kwh)} unit="ریال/kWh" />
                <ReviewItem label="نسبت وام" value={fmtPct(fs.financing.debt_ratio)} />
                <ReviewItem label="نرخ بهره" value={fmtPct(fs.financing.interest_rate)} />
                <ReviewItem label="تورم" value={fmtPct(fs.financial_params.inflation_rate)} />
            </ReviewSection>

            <ReviewSection title="هزینه‌های عملیاتی (OPEX)" icon={WrenchScrewdriverIcon}>
                <ReviewItem label="تعداد مهندسین" value={fs.opex_details.personnel.num_engineers} />
                <ReviewItem label="تعداد تکنسین‌ها" value={fs.opex_details.personnel.num_technicians} />
                <ReviewItem label="سایر هزینه‌ها" value={fmtNum(fs.opex_details.other_opex_mil_rial)} unit="م.ر" />
                <ReviewItem label="نگهداری پنل" value={fmtPct(fs.opex_details.maintenance.panel_maintenance_percent)} />
            </ReviewSection>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-start gap-2 max-w-xl">
                  <ShieldCheckIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500 text-justify">
                      با تایید این فرم، صحت اطلاعات وارد شده را تایید می‌کنید. در صورت نیاز به تغییر، از دکمه <strong>بازگشت</strong> استفاده کنید.
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
