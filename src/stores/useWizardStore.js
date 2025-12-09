import { create } from 'zustand';
import countyData from '../assets/data/countyList.json'; // We will add this file later

const initialProjectDetails = {
  name: '', owner: '', manager: '', company: '', capacity: '',
  location: '', scale: 'draw', province: '', county: '',
  shapeID: '', analysisMode: 'standard',
};

const initialFinancialSettings = {
  project_basics: { capacity_mw: 0, project_lifetime_years: 25, production_year1_kwh: 12700000 },
  capex_breakdown: { total_investment_cost_mil_rial: 687478, salvage_value_mil_rial: 5000 },
  opex_details: {
    personnel: { num_engineers: 3, salary_per_engineer_mil_rial: 45, num_technicians: 8, salary_per_technician_mil_rial: 25, insurance_and_benefits_percent: 0.30, salary_months_per_year: 14 },
    maintenance: { warranty_years_panel_inverter: 5, panel_maintenance_percent: 0.005, inverter_maintenance_percent: 0.012, structure_maintenance_percent: 0.002, building_maintenance_percent: 0.015 },
    other_opex_mil_rial: 800
  },
  sales_assumptions: { electricity_tariff_year1_rial_kwh: 6000, annual_degradation_rate: 0.005, annual_tariff_escalation: 0.35 },
  financial_params: { inflation_rate: 0.35, discount_rate_wacc: 0.25, tax_rate: 0.25, tax_holiday_years: 7 },
  financing: { debt_ratio: 0.70, interest_rate: 0.23, repayment_period_years: 7, grace_period_years: 1 }
};

export const useWizardStore = create((set, get) => ({
  // STATE
  currentStep: 1,
  projectType: null, // 'solar', 'wind', etc.
  projectDetails: initialProjectDetails,
  criteriaSettings: null,
  locationData: null,
  financialSettings: initialFinancialSettings,

  // ACTIONS
  setProjectType: (type) => set({ projectType: type, currentStep: 1 }),
  
  updateProjectDetails: (e) => {
    const { name, value } = e.target;
    set((state) => {
      const updatedDetails = { ...state.projectDetails, [name]: value };

      // Sync capacity with financial settings
      if (name === 'capacity') {
        get().updateFinancialNested('project_basics.capacity_mw', parseFloat(value) || 0);
      }
      
      // Handle province/county dependency
      if (name === 'province') {
        updatedDetails.county = ''; // Reset county when province changes
      }
      return { projectDetails: updatedDetails };
    });
  },

  updateFinancialNested: (path, value) => {
    set((state) => {
      const keys = path.split('.');
      const newState = JSON.parse(JSON.stringify(state.financialSettings));
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return { financialSettings: newState };
    });
  },

  handleScaleSelection: (scale) => {
    set((state) => ({
      projectDetails: { ...state.projectDetails, scale, province: '', county: '' },
      locationData: null, // Clear location data when switching method
    }));
  },

  handleAnalysisModeSelection: (mode) => set(state => ({ projectDetails: { ...state.projectDetails, analysisMode: mode }})),

  saveCriteria: (settings) => set({ criteriaSettings: settings, currentStep: 3 }),
  saveLocation: (data) => set({ locationData: data, currentStep: 4 }),
  
  goToStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 5, 5) })),
  prevStep: () => {
    const current = get().currentStep;
    if (current === 1 && get().projectType) {
      set({ projectType: null }); // Go back to type selection
    } else {
      set({ currentStep: Math.max(current - 1, 1) });
    }
  },

  reset: () => set({
    currentStep: 1,
    projectType: null,
    projectDetails: initialProjectDetails,
    criteriaSettings: null,
    locationData: null,
    financialSettings: initialFinancialSettings,
  }),
}));