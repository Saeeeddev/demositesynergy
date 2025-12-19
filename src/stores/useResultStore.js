import { create } from 'zustand';

const useResultStore = create((set) => ({
  // --- Navigation State ---
  activePanel: 'layers',       // 'layers', 'project-overview', 'financial'
  contentView: 'layers-page',  // 'layers-page', 'project-overview', 'financial-page'
  
  // Sub-tabs
  activeFinancialTab: 'dashboard',
  activeProjectTab: 'summary',

  // Actions for Navigation
  setPanel: (panel) => set({ activePanel: panel }),
  setContentView: (view) => set({ contentView: view }),
  setFinancialTab: (tab) => set({ activeFinancialTab: tab }),
  setProjectTab: (tab) => set({ activeProjectTab: tab }),

  // --- Map Layer Visibility State ---
  // We use a single object for cleaner updates
  layers: {
    selectedLocation: true,
    allocatedLand: false,
    powerLines: false,
    ghi: false,
    roads: false,
    railways: false,
    airports: false,
    cities: false,
    waterAreas: false,
    fault: false,
    protectedAreas: false,
    landuse: false,
    technical: false,
    dem: false,
  },

  // Action: Toggle a specific layer
  toggleLayer: (layerKey) => set((state) => ({
    layers: {
      ...state.layers,
      [layerKey]: !state.layers[layerKey]
    }
  })),

  // Action: Set specific value (e.g., from a "Reset" button)
  setLayerVisibility: (layerKey, isVisible) => set((state) => ({
    layers: {
      ...state.layers,
      [layerKey]: isVisible
    }
  })),
  
  // Map Selection State (clicked feature on map)
  selectedFeature: null,
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),
}));

export default useResultStore;
