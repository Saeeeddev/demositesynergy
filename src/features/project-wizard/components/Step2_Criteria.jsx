import React, { useState, useMemo } from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { useShallow } from 'zustand/react/shallow';
import {
  ScaleIcon, 
  CurrencyDollarIcon, 
  WrenchScrewdriverIcon, 
  GlobeAltIcon,
  CubeTransparentIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// --- Components matching reference ---

const SliderSetting = ({ label, value, onChange, min = 0, max = 100, unit = '%', disabled = false }) => {
  const display = `${value}${unit}`;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</label>
        <span className={`text-sm font-semibold ${disabled ? 'text-gray-400' : 'text-primary-blue'}`}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} accent-primary-blue`}
      />
    </div>
  );
};

const StepAndBufferInput = ({ stepValue, bufferValue, onBufferChange, stepLabel="Step (m)", bufferLabel="Buffer (m)", maxBuffer, disabled }) => (
    <div className="grid grid-cols-2 gap-3 mt-2">
      <div>
        <label className={`block text-xs font-medium ${disabled ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{stepLabel} <span className="text-gray-400 font-normal">(Preset)</span></label>
        <div className={`w-full p-2 rounded-md text-sm font-semibold ${
          disabled ? 'bg-gray-100 text-gray-400' : 'bg-primary-blue/10 text-primary-blue border-l-4 border-primary-blue'
        }`}>
          {stepValue}
        </div>
      </div>
      <div>
        <label className={`block text-xs font-medium ${disabled ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
          {bufferLabel}
          {maxBuffer && <span className="text-gray-400 font-normal ml-1">(max: {maxBuffer})</span>}
        </label>
        <input 
            type="number" 
            value={bufferValue} 
            onChange={e => onBufferChange(parseFloat(e.target.value) || 0)} 
            disabled={disabled} 
            max={maxBuffer}
            className={`w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-primary-blue focus:border-primary-blue ${
                disabled ? 'bg-gray-50 cursor-not-allowed opacity-50' : ''
            }`}
        />
      </div>
    </div>
);

const FactorGroup = ({ title, children, enabled, onToggle, disableToggle }) => (
  <div className={`bg-white border border-gray-200 rounded-lg p-4 space-y-3 transition-all ${!enabled ? 'bg-gray-50' : ''}`}>
    <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
      <h4 className={`text-sm font-semibold ${enabled ? 'text-gray-800' : 'text-gray-400'}`}>{title}</h4>
      <button 
        type="button" 
        onClick={onToggle} 
        disabled={disableToggle} 
        className={`relative inline-flex h-6 w-12 flex-shrink-0 items-center rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm ${
            disableToggle ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        } ${
            enabled ? 'bg-primary-blue focus:ring-primary-blue shadow-primary-blue/20' : 'bg-gray-400 border-2 border-gray-400 hover:bg-gray-500 hover:border-gray-600'
        }`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-all duration-200 ease-in-out ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
      </button>
    </div>
    <div className={!enabled ? 'opacity-50 pointer-events-none' : ''}>
        {children}
    </div>
  </div>
);

// --- Main Step Component ---

const Step2_Criteria = () => {
    const { 
        projectDetails, 
        criteriaSettings, 
        saveCriteria 
    } = useWizardStore(useShallow(state => ({
        projectDetails: state.projectDetails,
        criteriaSettings: state.criteriaSettings,
        saveCriteria: state.saveCriteria
    })));

    // Local state for edits
    const [settings, setSettings] = useState(criteriaSettings);
    const [activeTab, setActiveTab] = useState('weights');
    
    const isStandardMode = projectDetails?.analysisMode === 'standard';
    
    const totalWeight = useMemo(() => {
        return Object.values(settings.overallWeights).reduce((sum, val) => sum + val, 0);
    }, [settings.overallWeights]);

    // Helpers
    const updateWeight = (cat, val) => {
        const otherWeightsSum = Object.entries(settings.overallWeights)
            .filter(([key]) => key !== cat)
            .reduce((sum, [, val]) => sum + val, 0);

        let newValue = Math.round(val);
        if (otherWeightsSum + newValue > 100) {
            newValue = 100 - otherWeightsSum;
        }

        setSettings(prev => ({
            ...prev,
            overallWeights: { ...prev.overallWeights, [cat]: newValue }
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
        { id: 'weights', label: 'Potential Weights', icon: ScaleIcon, desc: 'Set importance of each category' },
        { id: 'economic', label: 'Economic', icon: CurrencyDollarIcon, desc: 'Infrastructure and cost factors' },
        { id: 'technical', label: 'Technical', icon: WrenchScrewdriverIcon, desc: 'Solar resource and terrain factors' },
        { id: 'environmental', label: 'Environmental', icon: GlobeAltIcon, desc: 'Environmental protection criteria' },
        { id: 'geological', label: 'Geological', icon: CubeTransparentIcon, desc: 'Soil and geological constraints' },
    ];

    const handleContinue = () => {
        if (!isStandardMode && totalWeight !== 100) {
            alert(`Total weighting must equal 100% (Currently ${totalWeight}%)`);
            return;
        }
        saveCriteria(settings); 
    };

    // --- Tab Renders ---

    const renderWeightsTab = () => (
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0 mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Potential Weighting</h3>
                <p className="text-xs text-gray-600">
                    Distribute the importance of each category. The total must be exactly 100%.
                    {isStandardMode && <span className="block text-amber-600 font-semibold mt-1">⚠️ Standard mode: Values are preset and cannot be modified</span>}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <SliderSetting label="Economic Potential" value={settings.overallWeights.economic} onChange={v => updateWeight('economic', v)} disabled={isStandardMode} />
                    <SliderSetting label="Technical Potential" value={settings.overallWeights.technical} onChange={v => updateWeight('technical', v)} disabled={isStandardMode} />
                </div>
                <div className="space-y-6">
                    <SliderSetting label="Environmental Potential" value={settings.overallWeights.environmental} onChange={v => updateWeight('environmental', v)} disabled={isStandardMode} />
                    <SliderSetting label="Geological Potential" value={settings.overallWeights.geological} onChange={v => updateWeight('geological', v)} disabled={isStandardMode} />
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
                <div className={`flex justify-between items-center font-bold text-lg ${totalWeight === 100 ? 'text-gray-800' : 'text-red-600'}`}>
                    <span>Total Weight</span>
                    <span>{totalWeight}%</span>
                </div>
                {totalWeight !== 100 && !isStandardMode && (<p className="text-xs text-red-600 mt-1 text-right">The total weight must be exactly 100% to continue.</p>)}
            </div>
        </div>
    );

    const renderFactorsTab = (sectionKey, factorKeys) => {
        return (
             <div className="h-full flex flex-col">
                <div className="flex-shrink-0 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} Factors</h3>
                  <p className="text-xs text-gray-600">
                    Configure constraints and parameters.
                    {isStandardMode && <span className="block text-amber-600 font-semibold mt-1">⚠️ Standard mode: Values are preset and cannot be modified</span>}
                  </p>
                </div>
                <div className="flex-1 relative">
                    <div className="absolute inset-0 overflow-y-auto pr-2 sm:pr-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {factorKeys.map(key => {
                                const factorData = settings[sectionKey][key];
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
                                            label="Factor Weight" 
                                            value={factorData.weight} 
                                            onChange={v => updateFactor(sectionKey, key, 'weight', v)} 
                                            min={0} max={20} 
                                            disabled={isStandardMode || !factorData.enabled} 
                                        />
                                        
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
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-sm border border-gray-200 h-full overflow-hidden">
            {/* Sidebar */}
            <div className="hidden lg:block w-full lg:w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0 relative z-10">
                <div className="p-4 overflow-y-auto h-full">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                    <nav className="space-y-1.5">
                        {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} type="button" className={`w-full flex items-start text-left gap-3 p-2.5 rounded-lg transition-all duration-200 ${ activeTab === tab.id ? 'bg-primary-blue text-white shadow-sm' : 'hover:bg-white text-gray-700 hover:shadow-sm'}`}>
                            <tab.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                            <div className="text-sm font-medium">{tab.label}</div>
                            <div className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'}`}>{tab.desc}</div>
                            </div>
                        </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-hidden p-4 sm:p-6">
                    <div className="h-full">
                        {activeTab === 'weights' && renderWeightsTab()}
                        {activeTab === 'economic' && renderFactorsTab('economic', ['powerDistance', 'airportDistance', 'cityDistance', 'roadsDistance', 'railwaysDistance'])}
                        {activeTab === 'technical' && renderFactorsTab('technical', ['ghi', 'slope', 'landUse'])}
                        {activeTab === 'environmental' && renderFactorsTab('environmental', ['waterAreas', 'protectedAreas', 'historicSites', 'mines', 'militaryArea'])}
                        {activeTab === 'geological' && renderFactorsTab('geological', ['faultLines'])}
                    </div>
                </div>

                {/* Internal Step Footer */}
                <div className="border-t border-gray-200 px-4 sm:px-6 py-3 bg-gray-50 rounded-b-xl flex-shrink-0">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div className="text-xs text-gray-500">Project: <strong>{projectDetails.name}</strong></div>
                        <button 
                            onClick={handleContinue} 
                            disabled={!isStandardMode && totalWeight !== 100}
                            className="w-full sm:w-auto px-6 py-2 bg-primary-blue text-white rounded-lg text-sm font-semibold hover:bg-primary-blue/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Criteria & Continue 
                            <ArrowRightIcon className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2_Criteria;