import { create } from 'zustand';

// --- Default States from Old Version ---

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
  analysisMode: null, // 'standard' or 'custom'
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
    historicSites: { weight: 2, step: 500, buffer: 200, enabled: true },
    mines: { weight: 2, step: 500, buffer: 500, enabled: true },
    militaryArea: { weight: 2, step: 500, buffer: 500, enabled: true },
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
  currentStep: 1,
  projectType: null, // 'solar', 'wind'
  projectDetails: initialProjectDetails,
  criteriaSettings: initialCriteriaSettings, // Pre-populated to allow editing
  locationData: null,
  financialSettings: initialFinancialSettings,

  // --- ACTIONS ---

  // Navigation
  setProjectType: (type) => set({ projectType: type, currentStep: 1 }),
  goToStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  
  // Step 1: Details
  updateProjectDetails: (e) => {
    const { name, value } = e.target;
    set((state) => {
      const updated = { ...state.projectDetails, [name]: value };
      
      // Auto-update financial capacity if details capacity changes
      if (name === 'capacity') {
        const numVal = parseFloat(value) || 0;
        // Need to update nested financial state deeply
        const newFin = JSON.parse(JSON.stringify(state.financialSettings));
        newFin.project_basics.capacity_mw = numVal;
        return { projectDetails: updated, financialSettings: newFin };
      }

      // Reset Location/County logic
      if (name === 'province') {
        updated.county = '';
        updated.shapeID = '';
        return { projectDetails: updated }; // leave financials alone
      }

      return { projectDetails: updated };
    });
  },

  handleAnalysisModeSelection: (mode) => set((state) => ({
    projectDetails: { ...state.projectDetails, analysisMode: mode }
  })),

  // Step 2: Criteria
  // Replaces the whole object (usually triggered by "Save" on Step 2)
  saveCriteria: (settings) => set({ criteriaSettings: settings, currentStep: 3 }),

  // Step 3: Location
  handleScaleSelection: (scale) => set((state) => ({
    projectDetails: { ...state.projectDetails, scale, province: '', county: '', shapeID: '' },
    locationData: null
  })),
  
  saveLocation: (data) => set({ locationData: data, currentStep: 4 }),

  updateLocationData: (data) => set({ locationData: data }), // Helper for Map edits without changing step

  // Step 4: Financials
  // Handles deep nested updates like "opex_details.personnel.num_engineers"
  updateFinancialNested: (e) => {
    // 1. Guard against non-events to prevent direct loop calls
    if (!e || !e.target) return;

    let { name, value } = e.target;
    // ensure numbers are numbers
    value = e.target.type === 'number' ? (parseFloat(value) || 0) : value;
    if (e.target) {
        name = e.target.name;
        value = e.target.type === 'number' ? (parseFloat(e.target.value) || 0) : e.target.value;
    } else {
        // Direct value passed (from custom handlers)
        return; // we don't support non-event updates in this implementation unless specific
    }

    set((state) => {
      const keys = name.split('.');
      const newState = JSON.parse(JSON.stringify(state.financialSettings));
      let current = newState;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}; // safety check
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return { financialSettings: newState };
    });
  },

  // Reset to initial
  reset: () => set({
    currentStep: 1,
    projectType: null,
    projectDetails: initialProjectDetails,
    criteriaSettings: initialCriteriaSettings,
    locationData: null,
    financialSettings: initialFinancialSettings
  })
}));