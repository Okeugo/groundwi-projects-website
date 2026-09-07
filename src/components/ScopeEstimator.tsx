import React, { useState } from 'react';
import { 
  Calculator, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Layers, 
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { InvestigationMode } from '../types';

interface ScopeEstimatorProps {
  onTransferToContact: (scopeData: {
    mode: InvestigationMode;
    services: string[];
    summary: string;
  }) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({
  onTransferToContact
}) => {
  const [sector, setSector] = useState<string>('Energy & Renewables');
  const [mode, setMode] = useState<InvestigationMode>('both');
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([
    'Geophysical Subsurface Profiling',
    'Geotechnical Soil Testing',
    'Advanced GIS Mapping'
  ]);
  const [footprint, setFootprint] = useState<string>('5 - 25 Hectares');
  const [terrain, setTerrain] = useState<string>('Karstic Limestone / Potential Voids');

  const allDisciplines = [
    { name: 'Geophysical Subsurface Profiling', tag: 'Bedrock & Voids', desk: true, field: true },
    { name: 'Geotechnical Soil Testing', tag: 'SPT, CPT & Lab', desk: true, field: true },
    { name: 'Environmental Impact Assessment (EIA)', tag: 'Flora, Fauna & Water', desk: true, field: true },
    { name: 'Geological Field Mapping', tag: 'Rock Mass & Faults', desk: true, field: true },
    { name: 'Topography Survey', tag: 'LiDAR & DEM', desk: true, field: true },
    { name: 'Advanced GIS Mapping', tag: 'Unified Digital Twin', desk: true, field: true }
  ];

  const toggleDiscipline = (name: string) => {
    if (selectedDisciplines.includes(name)) {
      if (selectedDisciplines.length > 1) {
        setSelectedDisciplines(selectedDisciplines.filter(d => d !== name));
      }
    } else {
      setSelectedDisciplines([...selectedDisciplines, name]);
    }
  };

  const calculateScope = () => {
    let timeline = '10 - 15 Business Days';
    let riskScore = 85;
    let equipment = 'CPTu Rig, ERT Syscal Pro, RTK GNSS, ArcGIS Enterprise';

    if (mode === 'desk-study') {
      timeline = '48 - 72 Hours (Expedited Delivery)';
      riskScore = selectedDisciplines.length >= 4 ? 75 : 60;
      equipment = 'Satellite Remote Sensing, Historical LiDAR, BGS/USGS Geological Archives';
    } else if (mode === 'field-investigation') {
      timeline = '12 - 18 Days Field Campaign';
      riskScore = 90;
      equipment = 'Pagani CPTu 200kN, Rotary HQ Rig, Dual-Freq GPR, Drone LiDAR';
    } else {
      timeline = '14 - 21 Days (Desk Study + Field + GIS Model)';
      riskScore = 98;
      equipment = 'Full Integrated Suite: CPTu, ERT Lines, Drone LiDAR, Multi-layer GIS';
    }

    return { timeline, riskScore, equipment };
  };

  const { timeline, riskScore, equipment } = calculateScope();

  const handleApplyScope = () => {
    const summary = `Configured Scope: [${mode.toUpperCase()}] for ${sector} (${footprint}, ${terrain}). Disciplines: ${selectedDisciplines.join(', ')}. Est. Timeline: ${timeline}.`;
    onTransferToContact({
      mode,
      services: selectedDisciplines,
      summary
    });
  };

  return (
    <section id="scope-estimator" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00A3E8]/10 text-[#007ea8] border border-[#00A3E8]/20 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Scope & Risk Mitigation Configurator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Tailor Your Site Investigation Scope
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Select your project parameters to estimate field equipment requirements, investigation turnaround, and risk mitigation coverage.
          </p>
        </div>

        {/* The Configurator Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Inputs Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-6 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
            
            {/* Step 1: Investigation Phase Mode */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>1. Investigation Delivery Mode</span>
                <span className="text-[#007ea8] text-[11px] font-semibold">Desk Study vs Field Mobilization</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'desk-study' as const, label: 'Desk Study Only', desc: '48-72h preliminary risk screen' },
                  { id: 'field-investigation' as const, label: 'Field Investigation Only', desc: 'In-situ testing & drilling' },
                  { id: 'both' as const, label: 'Full Integrated Package', desc: 'Desk study + Field + GIS Model' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    id={`scope-mode-${opt.id}`}
                    onClick={() => setMode(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      mode === opt.id
                        ? 'bg-white border-[#00A3E8] text-slate-900 shadow-sm ring-2 ring-[#00A3E8]/20'
                        : 'bg-white/60 border-slate-200 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span className="text-xs font-bold block text-slate-900">{opt.label}</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Project Sector & Terrain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  2. Project Sector
                </label>
                <select
                  id="scope-sector-select"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#00A3E8]"
                >
                  <option value="Energy & Renewables">Energy & Renewables (Solar/Wind/BESS)</option>
                  <option value="Infrastructure">Infrastructure (High-Speed Rail / Highways)</option>
                  <option value="Commercial & Industrial">Commercial & Industrial (Port / Logistics / Plant)</option>
                  <option value="Mining & Resources">Mining & Resources (Open Pit / Tailings)</option>
                  <option value="Environmental & Water">Environmental & Water (Brownfield / Riparian)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  3. Anticipated Terrain & Geology
                </label>
                <select
                  id="scope-terrain-select"
                  value={terrain}
                  onChange={(e) => setTerrain(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#00A3E8]"
                >
                  <option value="Karstic Limestone / Potential Voids">Karstic Limestone / Potential Voids</option>
                  <option value="Soft Alluvial Plain / Compressible Clays">Soft Alluvial Plain / Compressible Clays</option>
                  <option value="Coastal Reclaimed / Liquefiable Sand">Coastal Reclaimed / Liquefiable Sand</option>
                  <option value="Bedrock Outcrop / Steep Mountain Slopes">Bedrock Outcrop / Steep Mountain Slopes</option>
                  <option value="Urban Industrial Fill / Undocumented Rubble">Urban Industrial Fill / Undocumented Rubble</option>
                </select>
              </div>
            </div>

            {/* Step 3: Site Footprint */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                4. Approximate Footprint Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {['< 5 Hectares', '5 - 25 Hectares', '25 - 100 Hectares', '100+ Ha / Linear Corridor'].map((fp) => (
                  <button
                    key={fp}
                    id={`scope-footprint-${fp.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setFootprint(fp)}
                    className={`py-2 px-3 rounded-lg border text-center transition-all ${
                      footprint === fp
                        ? 'bg-white border-[#00A3E8] text-[#007ea8] font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {fp}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Required Disciplines Checklist */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                5. Selected Core Disciplines (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {allDisciplines.map((disc) => {
                  const isChecked = selectedDisciplines.includes(disc.name);
                  return (
                    <button
                      key={disc.name}
                      id={`scope-check-${disc.name.split(' ')[0].toLowerCase()}`}
                      onClick={() => toggleDiscipline(disc.name)}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        isChecked
                          ? 'bg-white border-[#00A3E8]/60 text-slate-900 shadow-xs'
                          : 'bg-white/60 border-slate-200 text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <div className="mt-0.5 text-[#007ea8]">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#007ea8]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-semibold block text-slate-900">{disc.name}</span>
                        <span className="text-[10px] text-slate-500">{disc.tag}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Instant Output & Recommended Layout */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 via-white to-slate-50 border border-[#00A3E8]/30 shadow-md flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              <div className="pb-4 border-b border-slate-200">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#007ea8] block mb-1">
                  Scope Estimate
                </span>
                <h3 className="text-xl font-black text-slate-900 font-['Space_Grotesk']">
                  Investigation Profile
                </h3>
              </div>

              {/* Risk Mitigation Confidence Score */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#007ea8]" />
                    Subsurface Risk Mitigation Index
                  </span>
                  <span className="text-[#007ea8] font-extrabold font-mono text-sm">{riskScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    style={{ width: `${riskScore}%` }} 
                    className="h-full bg-gradient-to-r from-[#00A3E8] to-[#38bdf8] transition-all duration-500" 
                  />
                </div>
                <p className="text-[10px] text-slate-500 pt-1">
                  {riskScore >= 95 
                    ? 'Maximum defensibility: virtually eliminates differing site condition claims.'
                    : 'Solid baseline: recommended to add geophysics or GIS model for zero ground surprises.'}
                </p>
              </div>

              {/* Turnaround Estimate */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#007ea8] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Turnaround</span>
                  <span className="text-xs font-bold text-slate-900">{timeline}</span>
                </div>
              </div>

              {/* Recommended Sensor / Rig Suite */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-mono block flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-amber-600" />
                  Recommended Fleet & Rig Suite
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {equipment}
                </p>
              </div>

              {/* Summary of Chosen Disciplines */}
              <div className="space-y-1.5 text-xs text-slate-500">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                  Included in Proposal:
                </span>
                {selectedDisciplines.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-[#007ea8] shrink-0" />
                    <span className="truncate">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Transfer Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                id="apply-scope-to-contact-btn"
                onClick={handleApplyScope}
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98]"
              >
                <span>Attach Scope & Request Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-400 block text-center mt-2">
                Transfers this configuration directly into the contact inquiry form.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
