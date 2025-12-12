import React from 'react';
import { useShallow } from 'zustand/react/shallow'; 
import { useWizardStore } from '../../../stores/useWizardStore';
import { 
  BanknotesIcon, 
  BoltIcon, 
  BriefcaseIcon, 
  CalculatorIcon, 
  ChartBarIcon, 
  ClockIcon, 
  PresentationChartLineIcon, 
  ReceiptPercentIcon, 
  SunIcon, 
  UserGroupIcon, 
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// --- Compact Component ---
const CompactFinancialInput = ({ label, icon: Icon, value, onChange, name, min, max, step, readOnly, type="number", description }) => (
  <div className="group relative">
    <div className="flex justify-between items-baseline mb-1">
        <label htmlFor={name} className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">{label}</label>
    </div>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
        <Icon className={`h-4 w-4 transition-colors ${readOnly ? 'text-gray-300' : 'text-gray-400 group-focus-within:text-primary-blue'}`} />
      </div>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        readOnly={readOnly}
        title={description}
        className={`
          block w-full pl-9 pr-2 py-2 rounded-lg text-xs font-medium border transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue
          ${readOnly 
            ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed' 
            : 'bg-gray-50 text-gray-900 border-gray-200 hover:bg-white hover:border-gray-300'
          }
        `}
        placeholder="0"
      />
    </div>
  </div>
);

// --- Section Container ---
const FinancialSectionCard = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
            <div className="p-1.5 bg-primary-blue/10 rounded-lg">
                <Icon className="w-4 h-4 text-primary-blue" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        </div>
        <div className="flex-1 grid grid-cols-1 gap-3 content-start">
            {children}
        </div>
    </div>
);

const Step4_Financial = () => {
  const { financialSettings, updateFinancialNested, goToStep, projectDetails } = useWizardStore(
    useShallow(state => ({
      financialSettings: state.financialSettings,
      updateFinancialNested: state.updateFinancialNested,
      goToStep: state.goToStep,
      projectDetails: state.projectDetails
    }))
  );
  
  const fs = financialSettings;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto p-5 lg:p-6">
        <div className="max-w-7xl mx-auto h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            
            {/* Col 1: Basics & Sales */}
            <div className="flex flex-col gap-4">
                <FinancialSectionCard title="Project Basics" icon={BoltIcon}>
                    <CompactFinancialInput label="Capacity (MW)" name="project_basics.capacity_mw" value={fs.project_basics.capacity_mw} onChange={updateFinancialNested} readOnly={true} icon={BoltIcon} />
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="Lifetime (yrs)" name="project_basics.project_lifetime_years" value={fs.project_basics.project_lifetime_years} onChange={updateFinancialNested} min="10" icon={ClockIcon} />
                        <CompactFinancialInput label="Prod. Yr1 (kWh)" name="project_basics.production_year1_kwh" value={fs.project_basics.production_year1_kwh} onChange={updateFinancialNested} icon={SunIcon} />
                    </div>
                </FinancialSectionCard>

                <FinancialSectionCard title="CAPEX Breakdown" icon={BriefcaseIcon}>
                    <CompactFinancialInput label="Total Inv. (Mil Rial)" name="capex_breakdown.total_investment_cost_mil_rial" value={fs.capex_breakdown.total_investment_cost_mil_rial} onChange={updateFinancialNested} icon={BanknotesIcon} />
                    <CompactFinancialInput label="Salvage Val (Mil Rial)" name="capex_breakdown.salvage_value_mil_rial" value={fs.capex_breakdown.salvage_value_mil_rial} onChange={updateFinancialNested} icon={BanknotesIcon} />
                </FinancialSectionCard>

                <FinancialSectionCard title="Sales Strategy" icon={PresentationChartLineIcon} className="flex-grow">
                    <CompactFinancialInput label="Tariff Yr1 (Rial/kWh)" name="sales_assumptions.electricity_tariff_year1_rial_kwh" value={fs.sales_assumptions.electricity_tariff_year1_rial_kwh} onChange={updateFinancialNested} icon={ReceiptPercentIcon} />
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="Escalation Rate" name="sales_assumptions.annual_tariff_escalation" value={fs.sales_assumptions.annual_tariff_escalation} onChange={updateFinancialNested} step="0.01" icon={ChartBarIcon} />
                        <CompactFinancialInput label="Degradation" name="sales_assumptions.annual_degradation_rate" value={fs.sales_assumptions.annual_degradation_rate} onChange={updateFinancialNested} step="0.001" icon={ChartBarIcon} />
                    </div>
                </FinancialSectionCard>
            </div>

            {/* Col 2: Params & Financing */}
            <div className="flex flex-col gap-4">
                <FinancialSectionCard title="Financial Parameters" icon={CalculatorIcon}>
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="Inflation Rate" name="financial_params.inflation_rate" value={fs.financial_params.inflation_rate} onChange={updateFinancialNested} step="0.01" icon={ChartBarIcon} />
                        <CompactFinancialInput label="Discount (WACC)" name="financial_params.discount_rate_wacc" value={fs.financial_params.discount_rate_wacc} onChange={updateFinancialNested} step="0.01" icon={ReceiptPercentIcon} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="Tax Rate" name="financial_params.tax_rate" value={fs.financial_params.tax_rate} onChange={updateFinancialNested} step="0.01" icon={ReceiptPercentIcon} />
                        <CompactFinancialInput label="Tax Holiday (Yrs)" name="financial_params.tax_holiday_years" value={fs.financial_params.tax_holiday_years} onChange={updateFinancialNested} icon={ClockIcon} />
                    </div>
                </FinancialSectionCard>

                <FinancialSectionCard title="Debt & Financing" icon={BanknotesIcon} className="flex-grow">
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="Debt Ratio" name="financing.debt_ratio" value={fs.financing.debt_ratio} onChange={updateFinancialNested} step="0.01" icon={ReceiptPercentIcon} />
                        <CompactFinancialInput label="Interest Rate" name="financing.interest_rate" value={fs.financing.interest_rate} onChange={updateFinancialNested} step="0.01" icon={ReceiptPercentIcon} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="Repayment (Yrs)" name="financing.repayment_period_years" value={fs.financing.repayment_period_years} onChange={updateFinancialNested} icon={ClockIcon} />
                        <CompactFinancialInput label="Grace Period (Yrs)" name="financing.grace_period_years" value={fs.financing.grace_period_years} onChange={updateFinancialNested} icon={ClockIcon} />
                    </div>
                </FinancialSectionCard>
            </div>

            {/* Col 3: OPEX */}
            <div className="flex flex-col gap-4">
                <FinancialSectionCard title="OPEX: Personnel" icon={UserGroupIcon}>
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="# Engineers" name="opex_details.personnel.num_engineers" value={fs.opex_details.personnel.num_engineers} onChange={updateFinancialNested} icon={UserGroupIcon} />
                        <CompactFinancialInput label="Salary/Eng (MR)" name="opex_details.personnel.salary_per_engineer_mil_rial" value={fs.opex_details.personnel.salary_per_engineer_mil_rial} onChange={updateFinancialNested} icon={BanknotesIcon} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="# Technicians" name="opex_details.personnel.num_technicians" value={fs.opex_details.personnel.num_technicians} onChange={updateFinancialNested} icon={UserGroupIcon} />
                        <CompactFinancialInput label="Salary/Tech (MR)" name="opex_details.personnel.salary_per_technician_mil_rial" value={fs.opex_details.personnel.salary_per_technician_mil_rial} onChange={updateFinancialNested} icon={BanknotesIcon} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="Benefits (%)" name="opex_details.personnel.insurance_and_benefits_percent" value={fs.opex_details.personnel.insurance_and_benefits_percent} onChange={updateFinancialNested} step="0.01" icon={ReceiptPercentIcon} />
                        <CompactFinancialInput label="Pay Months/Yr" name="opex_details.personnel.salary_months_per_year" value={fs.opex_details.personnel.salary_months_per_year} onChange={updateFinancialNested} icon={ClockIcon} />
                    </div>
                </FinancialSectionCard>

                <FinancialSectionCard title="OPEX: Maintenance" icon={WrenchScrewdriverIcon} className="flex-grow">
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        <CompactFinancialInput label="Warranty (Yrs)" name="opex_details.maintenance.warranty_years_panel_inverter" value={fs.opex_details.maintenance.warranty_years_panel_inverter} onChange={updateFinancialNested} icon={ShieldCheckIcon} />
                        <CompactFinancialInput label="Other OPEX (MR)" name="opex_details.other_opex_mil_rial" value={fs.opex_details.other_opex_mil_rial} onChange={updateFinancialNested} icon={BanknotesIcon} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <CompactFinancialInput label="Panel Maint %" name="opex_details.maintenance.panel_maintenance_percent" value={fs.opex_details.maintenance.panel_maintenance_percent} onChange={updateFinancialNested} step="0.001" icon={WrenchScrewdriverIcon} />
                        <CompactFinancialInput label="Inverter Maint %" name="opex_details.maintenance.inverter_maintenance_percent" value={fs.opex_details.maintenance.inverter_maintenance_percent} onChange={updateFinancialNested} step="0.001" icon={BoltIcon} />
                        <CompactFinancialInput label="Structure Maint %" name="opex_details.maintenance.structure_maintenance_percent" value={fs.opex_details.maintenance.structure_maintenance_percent} onChange={updateFinancialNested} step="0.001" icon={BuildingOfficeIcon} />
                        <CompactFinancialInput label="Building Maint %" name="opex_details.maintenance.building_maintenance_percent" value={fs.opex_details.maintenance.building_maintenance_percent} onChange={updateFinancialNested} step="0.001" icon={BuildingOfficeIcon} />
                    </div>
                </FinancialSectionCard>
            </div>

            </div>
        </div>
      </div>

      {/* Internal Step Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-xs text-gray-500 font-medium">Project: <strong className="text-gray-900">{projectDetails.name}</strong></div>
            <button 
                onClick={() => goToStep(5)} 
                className="w-full sm:w-auto px-6 py-2.5 bg-primary-blue text-white rounded-lg text-sm font-semibold hover:bg-primary-blue/90 transition-all shadow-md flex items-center justify-center gap-2"
            >
                Review Project Inputs
                <ArrowRightIcon className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Step4_Financial;