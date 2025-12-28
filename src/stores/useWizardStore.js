import { create } from 'zustand';

// --- Default States ---

const initialProjectDetails = {
  name: '',
  owner: '',
  manager: '',
  company: '',
  capacity: '',
  location: '',
  scale: '', // 'draw' or 'county'
  province: '',
  county: '',
  shapeID: '',
  analysisMode: null,
  serviceType: '', // NEW: 'full' (Site Selection + Report) or 'report' (Report Only)
};

const initialCriteriaSettings = {
  overallWeights: { economic: 25, technical: 25, environmental: 25, geological: 25 },
  economic: {
    powerDistance: { weight: 15, step: 30, buffer: 30, enabled: true },
    airportDistance: { weight: 2, step: 500, buffer: 1000, enabled: true },
    cityDistance: { weight: 5, step: 500, buffer: 500, enabled: true },
    roadsDistance: { weight: 12, step: 50, buffer: 50, enabled: true },
    railwaysDistance: { weight: 3, step: 50, buffer: 100, enabled: true },
  },
  technical: {
    ghi: { weight: 20, step: 100, enabled: true },
    slope: { weight: 20, step: 3, buffer: 0, enabled: true },
    landUse: { selected: ['bare_rock', 'desert', 'scrub', 'heath', 'shrubland', 'grassland', 'sand', 'barren', 'meadow'], weight: 10, enabled: true },
  },
  environmental: {
    waterAreas: { weight: 2, step: 500, buffer: 200, enabled: true },
    protectedAreas: { weight: 10, step: 300, buffer: 500, enabled: true },
  },
  geological: {
    faultLines: { weight: 5, step: 500, buffer: 200, enabled: true },
  },
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
  // --- STATE ---
  currentStep: 1, // Will start at 1 for Service Type Selection
  projectType: null, // 'solar', 'wind'
  projectDetails: initialProjectDetails,
  criteriaSettings: initialCriteriaSettings,
  locationData: null,
  financialSettings: initialFinancialSettings,

  // --- ACTIONS ---

  setProjectType: (type) => set({ projectType: type, currentStep: 1 }), // Now goes to Step 1 (Service Type)
  
  // NEW: Action to set service type
  setServiceType: (type) => set((state) => ({
    projectDetails: { ...state.projectDetails, serviceType: type }
  })),

  goToStep: (step) => set({ currentStep: step }),
  
  // FIX: Increased max steps to 7 (6 content steps + final review)
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 7) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  
  updateProjectDetails: (e) => {
    const { name, value } = e.target;
    set((state) => {
      const updated = { ...state.projectDetails, [name]: value };
      
      // Auto-update financial capacity if details capacity changes
      if (name === 'capacity') {
        const numVal = parseFloat(value) || 0;
        const newFin = JSON.parse(JSON.stringify(state.financialSettings));
        newFin.project_basics.capacity_mw = numVal;
        return { projectDetails: updated, financialSettings: newFin };
      }

      // Reset Location/County logic when province changes
      if (name === 'province') {
        updated.county = '';
        updated.shapeID = '';
      }

      return { projectDetails: updated };
    });
  },

  handleAnalysisModeSelection: (mode) => set((state) => ({
    projectDetails: { ...state.projectDetails, analysisMode: mode }
  })),

  // FIX: saveCriteria now moves to Step 4 (Location if full, Financial if report)
  // This logic needs to be updated when we integrate Step4_Location and Step5_Financial
  // For now, let's assume standard next step after criteria.
  saveCriteria: (settings) => set({ criteriaSettings: settings, currentStep: 4 }), // Moves to Location (Step 4)

  handleScaleSelection: (scale) => set((state) => ({
    projectDetails: { ...state.projectDetails, scale, province: '', county: '', shapeID: '' },
    locationData: null
  })),
  
  // FIX: saveLocation now moves to Step 5
  saveLocation: (data) => set({ locationData: data, currentStep: 5 }), // Moves to Financial (Step 5)

  updateLocationData: (data) => set({ locationData: data }),

  updateFinancialNested: (e) => {
    if (!e || !e.target) return;
    let { name, value } = e.target;
    value = e.target.type === 'number' ? (parseFloat(value) || 0) : value;

    set((state) => {
      const keys = name.split('.');
      const newState = JSON.parse(JSON.stringify(state.financialSettings));
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}; 
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return { financialSettings: newState };
    });
  },

  reset: () => set({
    currentStep: 1,
    projectType: null,
    projectDetails: initialProjectDetails,
    criteriaSettings: initialCriteriaSettings,
    locationData: null,
    financialSettings: initialFinancialSettings
  })
}));
