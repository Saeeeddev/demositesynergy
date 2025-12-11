import React from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import {
  CheckCircleIcon, 
  BuildingOfficeIcon, 
  ScaleIcon, 
  CurrencyDollarIcon,
  WrenchScrewdriverIcon, 
  ShieldCheckIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const ReviewItem = ({ label, value, unit, className="" }) => (
  <div className={className}>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate" title={value}>
        {value}
        {unit && <span className="text-xs text-gray-500 font-medium ml-1">{unit}</span>}
    </p>
  </div>
);

const ReviewSection = ({ title, icon: Icon, children }) => (
  <section className="mb-8 last:mb-0">
    <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
        <div className="p-2 bg-primary-blue/10 rounded-lg text-primary-blue">
            <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-8">
        {children}
    </div>
  </section>
);

const ReviewPage = ({ onBack, onConfirm, isSubmitting }) => {
  const { projectDetails, financialSettings, locationData, criteriaSettings } = useWizardStore(state => state);
  
  const fs = financialSettings;
  const cs = criteriaSettings || { overallWeights: {} };

  // --- Format Helpers ---
  const fmtPct = (val) => `${(parseFloat(val || 0) * 100).toFixed(1)}%`;
  const fmtNum = (val) => parseInt(val || 0).toLocaleString();
  const fmtCoord = (coords) => {
      if(!coords || !coords.points || coords.points.length === 0) return "-";
      // Just show center or count
      return `${coords.points.length} Vertices Defined`;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 thin-scrollbar">
        <div className="max-w-6xl mx-auto space-y-2">
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex items-start gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="text-sm font-bold text-blue-900">Final Verification</h3>
                    <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                        Please verify all project parameters below. Once submitted, the Auto-Site-Selection engine will begin the analysis process, which may take several minutes to generate initial results.
                    </p>
                </div>
            </div>

            <ReviewSection title="Project & Location Details" icon={BuildingOfficeIcon}>
                <ReviewItem label="Project Name" value={projectDetails.name} />
                <ReviewItem label="Company" value={projectDetails.company} />
                <ReviewItem label="Client" value={projectDetails.owner} />
                <ReviewItem label="Project Manager" value={projectDetails.manager} />
                <ReviewItem label="Base Location" value={projectDetails.location} />
            </ReviewSection>

            <ReviewSection title="Geography & Shape" icon={MapPinIcon}>
                <ReviewItem label="Selection Mode" value={projectDetails.scale === 'draw' ? 'Custom Drawing' : 'Administrative'} />
                <ReviewItem label="Reference Name" value={locationData?.name || '-'} />
                <ReviewItem label="Area Size" value={fmtNum(locationData?.data?.properties?.areaSqKm)} unit="km²" />
                <ReviewItem label="Boundary Data" value={fmtCoord(locationData?.data?.coordinates)} />
            </ReviewSection>

            <ReviewSection title="GIS Configuration" icon={ScaleIcon}>
                <ReviewItem label="Analysis Mode" value={projectDetails.analysisMode === 'standard' ? 'Standard (Preset)' : 'Custom Config'} />
                <ReviewItem label="Economic Weight" value={cs.overallWeights.economic} unit="%" />
                <ReviewItem label="Technical Weight" value={cs.overallWeights.technical} unit="%" />
                <ReviewItem label="Environmental Weight" value={cs.overallWeights.environmental} unit="%" />
                <ReviewItem label="Geological Weight" value={cs.overallWeights.geological} unit="%" />
            </ReviewSection>

            <ReviewSection title="Financial & Technical" icon={CurrencyDollarIcon}>
                <ReviewItem label="Design Capacity" value={fmtNum(fs.project_basics.capacity_mw)} unit="MW" />
                <ReviewItem label="Lifetime" value={fs.project_basics.project_lifetime_years} unit="Years" />
                <ReviewItem label="Year 1 Production" value={fmtNum(fs.project_basics.production_year1_kwh)} unit="kWh" />
                <ReviewItem label="Total CAPEX" value={fmtNum(fs.capex_breakdown.total_investment_cost_mil_rial)} unit="MR" />
                <ReviewItem label="Tariff" value={fmtNum(fs.sales_assumptions.electricity_tariff_year1_rial_kwh)} unit="Rial" />
                <ReviewItem label="Debt Ratio" value={fmtPct(fs.financing.debt_ratio)} />
                <ReviewItem label="Interest Rate" value={fmtPct(fs.financing.interest_rate)} />
                <ReviewItem label="Inflation" value={fmtPct(fs.financial_params.inflation_rate)} />
            </ReviewSection>

            <ReviewSection title="Operating Expenses" icon={WrenchScrewdriverIcon}>
                <ReviewItem label="Engineers" value={fs.opex_details.personnel.num_engineers} />
                <ReviewItem label="Technicians" value={fs.opex_details.personnel.num_technicians} />
                <ReviewItem label="Other OPEX" value={fmtNum(fs.opex_details.other_opex_mil_rial)} unit="MR" />
                <ReviewItem label="Panel Maint." value={fmtPct(fs.opex_details.maintenance.panel_maintenance_percent)} />
            </ReviewSection>

        </div>
      </div>

      {/* Action Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 italic hidden sm:block">
            * By confirming, you initialize the calculation engine.
          </p>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
                onClick={onBack} 
                className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                disabled={isSubmitting}
            >
                Back to Financials
            </button>
            <button 
                onClick={onConfirm} 
                disabled={isSubmitting} 
                className="flex-1 sm:flex-none px-8 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
                {isSubmitting ? (
                    <>Processing...</>
                ) : (
                    <>
                        <CheckCircleIcon className="w-5 h-5" />
                        Confirm & Run Analysis
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