import { create } from 'zustand';

const useResultStore = create((set) => ({
  // --- REMOVED: activePanel, contentView (Handled by URL now) ---
  
  // Sub-tabs (These are fine to keep in state if they don't change URL, 
  // or you can make them query params like ?tab=capex)
  activeFinancialTab: 'dashboard',
  activeProjectTab: 'summary',

  setFinancialTab: (tab) => set({ activeFinancialTab: tab }),
  setProjectTab: (tab) => set({ activeProjectTab: tab }),

  // --- Map Layer Visibility State ---
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

  toggleLayer: (layerKey) => set((state) => ({
    layers: { ...state.layers, [layerKey]: !state.layers[layerKey] }
  })),

  setLayerVisibility: (layerKey, isVisible) => set((state) => ({
    layers: { ...state.layers, [layerKey]: isVisible }
  })),
  
  selectedFeature: null,
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),
}));

export default useResultStore;
