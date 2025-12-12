import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
  <div>
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="text-sm font-medium text-gray-800 mt-0.5 truncate" title={`${value} ${unit || ''}`}>
      {value}
      {unit && <span className="ml-1 text-xs text-gray-500">{unit}</span>}
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
  const navigate = useNavigate(); // Hook for navigation
  const { 
      projectDetails, 
      financialSettings, 
      locationData, 
      criteriaSettings,
      reset // Import reset action
  } = useWizardStore(state => state);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fs = financialSettings;
  const cs = criteriaSettings || { overallWeights: {}, opex_details: { personnel: {}, maintenance: {} } };

  // --- Format Helpers ---
  const fmtPct = (val) => `${(parseFloat(val || 0) * 100).toFixed(1)}%`;
  const fmtNum = (val) => parseInt(val || 0).toLocaleString();
  const fmtCoord = (coords) => {
      if(!coords || !coords.points || coords.points.length === 0) return "-";
      return `${coords.points.length} Vertices`;
  };

  // --- JSON Generator Function ---
  const generatePayload = () => {
    const isStandard = projectDetails.analysisMode === 'standard';
    
    // 1. Coordinates Transformation (GeoJSON -> [{lat, lon}])
    let points = [];
    if (locationData?.data?.geometry?.coordinates?.[0]) {
        // Handle standard GeoJSON structure
        points = locationData.data.geometry.coordinates[0].map(pt => ({
            lat: pt[1], // GeoJSON is [lon, lat]
            lon: pt[0]
        }));
    } else if (locationData?.data?.coordinates?.[0]) {
        // Handle simple structure if valid
        points = locationData.data.coordinates[0].map(pt => ({
            lat: pt[1], 
            lon: pt[0]
        }));
    }

    // 2. Parameters Transformation
    let parameters = {};

    if (!isStandard) {
        // Map Store keys to the specific JSON keys you requested
        parameters = {
            category_weights: {
                environmental: (cs.overallWeights.environmental || 0) / 100,
                technical: (cs.overallWeights.technical || 0) / 100,
                economic: (cs.overallWeights.economic || 0) / 100,
                geological: (cs.overallWeights.geological || 0) / 100
            },
            // Mapping specific factors from store structure to flat JSON structure
            slope: { enabled: cs.technical?.slope?.enabled, weight: cs.technical?.slope?.weight },
            ghi: { enabled: cs.technical?.ghi?.enabled, weight: cs.technical?.ghi?.weight },
            
            // Mapping "powerDistance" (store) to "power_lines" (json)
            power_lines: { enabled: cs.economic?.powerDistance?.enabled, weight: cs.economic?.powerDistance?.weight },
            
            // Mapping "roadsDistance" (store) to "roads" (json)
            roads: { enabled: cs.economic?.roadsDistance?.enabled, weight: cs.economic?.roadsDistance?.weight },
            
            // Mapping "protectedAreas"
            protected_areas: { enabled: cs.environmental?.protectedAreas?.enabled, weight: cs.environmental?.protectedAreas?.weight },
            
            // Mapping "landUse" (store) to "osm_landuse" (json)
            osm_landuse: { enabled: cs.technical?.landUse?.enabled, weight: cs.technical?.landUse?.weight },
            
            // Mapping others...
            railways: { enabled: cs.economic?.railwaysDistance?.enabled, weight: cs.economic?.railwaysDistance?.weight },
            airports: { enabled: cs.economic?.airportDistance?.enabled, weight: cs.economic?.airportDistance?.weight },
            military_areas: { enabled: cs.environmental?.militaryArea?.enabled, weight: cs.environmental?.militaryArea?.weight },
            historic_sites: { enabled: cs.environmental?.historicSites?.enabled, weight: cs.environmental?.historicSites?.weight },
            mines: { enabled: cs.environmental?.mines?.enabled, weight: cs.environmental?.mines?.weight },
            fault: { enabled: cs.geological?.faultLines?.enabled, weight: cs.geological?.faultLines?.weight },
            
            // Default values for keys not in store but in your requested JSON
            villages: { enabled: true, weight: 5 }, // Default
            rivers: { enabled: true, weight: 2 },   // Default
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
        // Hardcoded placeholders as these aren't in frontend inputs
        data_paths: {
            dem: "Default_Path_Or_Null",
            fault: "Default_Path_Or_Null",
            ghi: "Default_Path_Or_Null",
            protected_areas: "Default_Path_Or_Null"
        },
        parameters: parameters, // Will be {} if standard, or populated if custom
        financial_inputs: {
            project_basics: {
                production_year1_kwh: fs.project_basics.production_year1_kwh
            },
            capex_breakdown: {
                description: "هزینه‌های سرمایه‌گذاری",
                total_investment_cost_mil_rial: fs.capex_breakdown.total_investment_cost_mil_rial,
                salvage_value_mil_rial: fs.capex_breakdown.salvage_value_mil_rial,
                // Zeroing out fields that exist in your JSON but not in the simple wizard
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
                   // Fill missing fields with defaults to match JSON type
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
    // 1. Generate the JSON
    const finalPayload = generatePayload();

    // 2. Print to Console
    console.log("Submission JSON:", JSON.stringify(finalPayload, null, 4));

    // 3. Call Parent Confirm (API)
    if (onConfirm) {
        await onConfirm(finalPayload); 
    }
    
    // 4. Show Modal
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
      // 1. Hide Modal
      setShowSuccessModal(false);
      
      // 2. Reset the Wizard Store (Clear all data)
      reset();

      // 3. Navigate to Project List
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
                    Analysis Submitted!
                </h3>
                <div className="text-sm text-gray-600 space-y-3 mb-6">
                    <p>
                        Your project analysis has been successfully submitted and is now in progress.
                    </p>
                    <p>
                        We will notify you via email or SMS once it's ready. This process typically takes <span className="font-bold text-gray-800">less than 24 hours</span>.
                    </p>
                </div>
                <button 
                    onClick={handleModalClose}
                    className="w-full py-3 bg-[#63748E] hover:bg-[#4F5D75] text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                    Got it!
                </button>
            </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 lg:p-6 thin-scrollbar">
        <div className="max-w-7xl mx-auto space-y-8">
            
            <ReviewSection title="Project & Location Details" icon={BuildingOfficeIcon}>
                <ReviewItem label="Project Name" value={projectDetails.name} />
                <ReviewItem label="Company" value={projectDetails.company} />
                <ReviewItem label="Client" value={projectDetails.owner} />
                <ReviewItem label="Manager" value={projectDetails.manager} />
                <ReviewItem label="Address" value={projectDetails.location} />
            </ReviewSection>

            <ReviewSection title="Geography & Shape" icon={MapPinIcon}>
                <ReviewItem label="Selection Mode" value={projectDetails.scale === 'draw' ? 'Custom Drawing' : 'Administrative'} />
                <ReviewItem label="Location Name" value={locationData?.name || '-'} />
                <ReviewItem label="Area Size" value={fmtNum(locationData?.data?.properties?.areaSqKm)} unit="km²" />
                <ReviewItem label="Boundary Data" value={fmtCoord(locationData?.data?.coordinates)} />
            </ReviewSection>

            <ReviewSection title="GIS Configuration" icon={ScaleIcon}>
                <ReviewItem label="Analysis Mode" value={projectDetails.analysisMode === 'standard' ? 'Standard' : 'Custom'} />
                <ReviewItem label="Economic Weight" value={cs.overallWeights.economic} unit="%" />
                <ReviewItem label="Technical Weight" value={cs.overallWeights.technical} unit="%" />
                <ReviewItem label="Environmental Weight" value={cs.overallWeights.environmental} unit="%" />
                <ReviewItem label="Geological Weight" value={cs.overallWeights.geological} unit="%" />
            </ReviewSection>

            <ReviewSection title="Financial Inputs" icon={CurrencyDollarIcon}>
                <ReviewItem label="Capacity" value={fmtNum(fs.project_basics.capacity_mw)} unit="MW" />
                <ReviewItem label="Lifetime" value={fs.project_basics.project_lifetime_years} unit="Years" />
                <ReviewItem label="Production (Yr1)" value={fmtNum(fs.project_basics.production_year1_kwh)} unit="kWh" />
                <ReviewItem label="Total Investment" value={fmtNum(fs.capex_breakdown.total_investment_cost_mil_rial)} unit="Mil Rial" />
                <ReviewItem label="Tariff (Yr1)" value={fmtNum(fs.sales_assumptions.electricity_tariff_year1_rial_kwh)} unit="Rial/kWh" />
                <ReviewItem label="Debt Ratio" value={fmtPct(fs.financing.debt_ratio)} />
                <ReviewItem label="Interest Rate" value={fmtPct(fs.financing.interest_rate)} />
                <ReviewItem label="Inflation" value={fmtPct(fs.financial_params.inflation_rate)} />
            </ReviewSection>

            <ReviewSection title="Operating Expenses" icon={WrenchScrewdriverIcon}>
                <ReviewItem label="# Engineers" value={fs.opex_details.personnel.num_engineers} />
                <ReviewItem label="# Technicians" value={fs.opex_details.personnel.num_technicians} />
                <ReviewItem label="Other OPEX" value={fmtNum(fs.opex_details.other_opex_mil_rial)} unit="MR" />
                <ReviewItem label="Panel Maint." value={fmtPct(fs.opex_details.maintenance.panel_maintenance_percent)} />
            </ReviewSection>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-start gap-2 max-w-xl">
                  <ShieldCheckIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500">
                      By confirming, you acknowledge that all inputs are correct. If you need to make changes, please use the <strong>Back</strong> button.
                  </p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                      onClick={onBack}
                      className="flex-1 sm:flex-none px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                      disabled={isSubmitting}
                  >
                      Back
                  </button>
                  <button 
                      onClick={handleConfirmClick} 
                      disabled={isSubmitting} 
                      className="flex-1 sm:flex-none px-8 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                        {isSubmitting ? 'Processing...' : (
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