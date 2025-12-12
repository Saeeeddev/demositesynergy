import React, { useState, useMemo } from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import {
  ScaleIcon, 
  CurrencyDollarIcon, 
  WrenchScrewdriverIcon, 
  GlobeAltIcon,
  CubeTransparentIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// --- Small Reusable UI Components for Criteria ---

const SliderSetting = ({ label, value, onChange, min = 0, max = 100, unit = '%', disabled = false }) => (
  <div className="space-y-2 py-1">
    <div className="flex items-center justify-between">
      <label className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</label>
      <span className={`text-xs font-bold px-2 py-0.5 rounded ${disabled ? 'text-gray-400 bg-gray-100' : 'text-primary-blue bg-blue-50'}`}>
        {value}{unit}
      </span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))} 
      disabled={disabled} 
      className={`w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-blue disabled:opacity-50 transition-all`} 
    />
  </div>
);

const StepAndBufferInput = ({ stepValue, bufferValue, onBufferChange, stepLabel="Step", bufferLabel="Buffer", maxBuffer, disabled }) => (
    <div className="grid grid-cols-2 gap-4 mt-2">
      <div>
        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>{stepLabel} (m)</label>
        <div className={`w-full py-2 px-3 rounded-lg text-sm font-medium border border-transparent ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-blue-50/50 text-primary-blue'}`}>
            {stepValue}
        </div>
      </div>
      <div>
        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
            {bufferLabel} (m) <span className="font-normal lowercase opacity-75">max: {maxBuffer}</span>
        </label>
        <input 
            type="number" 
            value={bufferValue} 
            onChange={e => onBufferChange(parseFloat(e.target.value) || 0)} 
            disabled={disabled} 
            max={maxBuffer}
            className={`w-full py-2 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-blue focus:border-primary-blue disabled:bg-gray-50 disabled:text-gray-400`}
        />
      </div>
    </div>
);

const FactorGroup = ({ title, children, enabled, onToggle, disableToggle }) => (
  <div className={`border rounded-xl p-4 transition-all duration-200 ${!enabled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 hover:border-gray-400'}`}>
    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
      <h4 className={`text-sm font-bold ${enabled ? 'text-gray-800' : 'text-gray-400'}`}>{title}</h4>
      <button 
        type="button" 
        onClick={onToggle} 
        disabled={disableToggle} 
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-primary-blue' : 'bg-gray-300'} ${disableToggle ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-5' : 'translate-x-1'}`} />
      </button>
    </div>
    <div className={!enabled ? 'opacity-50 pointer-events-none' : ''}>
        {children}
    </div>
  </div>
);

// --- Main Step Component ---

const Step2_Criteria = () => {
    // FIX: Add useShallow
    const { 
        projectDetails, 
        criteriaSettings, // rename local prop to match store if needed, or mapping is fine
        saveCriteria 
    } = useWizardStore(useShallow(state => ({
        projectDetails: state.projectDetails,
        criteriaSettings: state.criteriaSettings,
        saveCriteria: state.saveCriteria
    })));

    // Local state for edits before saving
    // NOTE: In strict architecture, we might move this into Zustand actions, 
    // but specific Step forms often keep draft state local until "Next".
    const [settings, setSettings] = useState(criteriaSettings);
    const [activeTab, setActiveTab] = useState('weights');
    
    const isStandardMode = projectDetails?.analysisMode === 'standard';
    
    const totalWeight = useMemo(() => {
        return Object.values(settings.overallWeights).reduce((sum, val) => sum + val, 0);
    }, [settings.overallWeights]);

    // Helpers to update deeply nested state
    const updateWeight = (cat, val) => {
        setSettings(prev => ({
            ...prev,
            overallWeights: { ...prev.overallWeights, [cat]: val }
        }));
    };

    const updateFactor = (section, factorKey, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [factorKey]: {
                    ...prev[section][factorKey],
                    [field]: value
                }
            }
        }));
    };

    // Tabs Config
    const tabs = [
        { id: 'weights', label: 'Potential Weights', icon: ScaleIcon },
        { id: 'economic', label: 'Economic', icon: CurrencyDollarIcon },
        { id: 'technical', label: 'Technical', icon: WrenchScrewdriverIcon },
        { id: 'environmental', label: 'Environmental', icon: GlobeAltIcon },
        { id: 'geological', label: 'Geological', icon: CubeTransparentIcon },
    ];

    const handleContinue = () => {
        // Validation for manual mode
        if (!isStandardMode && totalWeight !== 100) {
            alert(`Total weighting must equal 100% (Currently ${totalWeight}%)`);
            return;
        }
        saveCriteria(settings); // Sync to store and move next
    };

    // --- Tab Renders ---

    const renderWeightsTab = () => (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h3 className="text-lg font-bold text-gray-900">Category Weighting</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Define the importance of each main category for the feasibility score. 
                    {isStandardMode && <span className="text-amber-600 font-medium ml-1"> (Locked in Standard Mode)</span>}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <SliderSetting label="Economic Potential" value={settings.overallWeights.economic} onChange={v => updateWeight('economic', v)} disabled={isStandardMode} />
                    <SliderSetting label="Technical Potential" value={settings.overallWeights.technical} onChange={v => updateWeight('technical', v)} disabled={isStandardMode} />
                </div>
                <div className="space-y-6">
                    <SliderSetting label="Environmental Potential" value={settings.overallWeights.environmental} onChange={v => updateWeight('environmental', v)} disabled={isStandardMode} />
                    <SliderSetting label="Geological Potential" value={settings.overallWeights.geological} onChange={v => updateWeight('geological', v)} disabled={isStandardMode} />
                </div>
            </div>

            <div className={`mt-6 p-4 rounded-xl border flex justify-between items-center ${totalWeight === 100 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                <span className={`text-sm font-semibold ${totalWeight === 100 ? 'text-emerald-800' : 'text-red-800'}`}>Total Allocation</span>
                <span className={`text-xl font-bold ${totalWeight === 100 ? 'text-emerald-700' : 'text-red-700'}`}>{totalWeight}%</span>
            </div>
        </div>
    );

    const renderFactorsTab = (sectionKey, factorKeys) => {
        // Generic renderer for Economic/Tech/Env/Geo tabs
        // Uses `settings[sectionKey]` data
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">
                {factorKeys.map(key => {
                    const factorData = settings[sectionKey][key];
                    // Clean titles: powerDistance -> Power Distance
                    const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    
                    return (
                        <FactorGroup 
                            key={key} 
                            title={title} 
                            enabled={factorData.enabled} 
                            onToggle={() => updateFactor(sectionKey, key, 'enabled', !factorData.enabled)} 
                            disableToggle={isStandardMode}
                        >
                            <SliderSetting 
                                label="Importance" 
                                value={factorData.weight} 
                                onChange={v => updateFactor(sectionKey, key, 'weight', v)} 
                                min={0} max={20} 
                                disabled={isStandardMode || !factorData.enabled} 
                            />
                            
                            {/* Render buffers only if the setting has them (Tech might just have step) */}
                            {(factorData.step !== undefined || factorData.buffer !== undefined) && (
                                <StepAndBufferInput 
                                    stepValue={factorData.step || 0}
                                    bufferValue={factorData.buffer || 0} 
                                    onBufferChange={v => updateFactor(sectionKey, key, 'buffer', v)} 
                                    maxBuffer={sectionKey === 'economic' ? 2000 : 500} 
                                    disabled={isStandardMode || !factorData.enabled}
                                />
                            )}
                        </FactorGroup>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-sm border border-gray-200 h-full overflow-hidden">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 flex-shrink-0">
                <nav className="p-4 space-y-1">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 
                                ${activeTab === tab.id ? 'bg-white shadow-sm text-primary-blue ring-1 ring-black/5' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
                            `}
                        >
                            <tab.icon className={`h-5 w-5 mr-3 ${activeTab === tab.id ? 'text-primary-blue' : 'text-gray-400'}`} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                    {activeTab === 'weights' && renderWeightsTab()}
                    {activeTab === 'economic' && renderFactorsTab('economic', ['powerDistance', 'airportDistance', 'cityDistance', 'roadsDistance', 'railwaysDistance'])}
                    {activeTab === 'technical' && renderFactorsTab('technical', ['ghi', 'slope', 'landUse'])}
                    {activeTab === 'environmental' && renderFactorsTab('environmental', ['waterAreas', 'protectedAreas', 'historicSites', 'mines', 'militaryArea'])}
                    {activeTab === 'geological' && renderFactorsTab('geological', ['faultLines'])}
                </div>

                {/* Internal Step Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                    <button 
                        onClick={handleContinue} 
                        className="flex items-center bg-primary-blue hover:bg-primary-blue/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all"
                    >
                        Save Criteria & Continue 
                        <ChevronRightIcon className="ml-2 w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step2_Criteria;