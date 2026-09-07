import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  X, 
  Layers, 
  FileText, 
  MapPin, 
  GitMerge, 
  Activity, 
  Search, 
  Crosshair,
  ArrowRight
} from 'lucide-react';

interface ValuePropositionProps {
  onExploreGis: () => void;
  onOpenEstimator: () => void;
}

export const ValueProposition: React.FC<ValuePropositionProps> = ({
  onExploreGis,
  onOpenEstimator
}) => {
  const [selectedPhase, setSelectedPhase] = useState<'desk-study' | 'field-investigation' | 'integrated'>('integrated');

  return (
    <section id="integrated-approach" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 mb-3">
            <GitMerge className="w-3.5 h-3.5" />
            <span>Value Proposition & Ground Intelligence Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            The Integrated Data Approach
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Most infrastructure delays don&apos;t happen in design; they happen underground. When geotechnical drillers, geophysicists, and environmental consultants produce uncoordinated PDF reports, blind gaps multiply. Groundwi Projects unifies them into a single defensible ground truth.
          </p>
        </div>

        {/* The Core Formula Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-50 via-[#00A3E8]/10 to-slate-50 border border-[#00A3E8]/30 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-[#007da6]">Our Operational Creed</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk']">
                &ldquo;One Team. One Document. Zero Ground Surprises.&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                Every borehole log, resistivity profile, ecological boundary, and contour is mathematically cross-referenced on the same geodetic datum. If geophysics detects an anomaly, CPT verifies the stiffness, and GIS alerts the structural foundation model.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                id="valprop-launch-gis-btn"
                onClick={onExploreGis}
                className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <span>Experience Interactive Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Head-to-Head Comparison: Traditional Siloed vs Groundwi Projects Integrated */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Traditional Siloed Disasters */}
          <div className="p-6 sm:p-8 rounded-2xl bg-red-50/40 border border-red-200 relative">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-100">
              <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">The Traditional Siloed Approach</h4>
                <p className="text-xs text-slate-500">4-6 Separate Subcontractors, Uncoordinated Outputs</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm">
              {[
                { title: 'Isolated, Static PDF Reports', desc: 'Geotechnical drillers provide depth logs; geophysicists send color contours; surveyors export CAD. No one correlates horizontal or vertical datums.' },
                { title: 'Blind Subsurface Interpolation', desc: 'Boreholes spaced 40 meters apart miss 99.8% of the volume. Hidden paleochannels, boulders, and sinkholes remain undetected.' },
                { title: 'Conflicting Datums & Discrepancies', desc: 'Drone topo uses orthometric heights while borehole logs reference arbitrary assumed ground levels, causing pile length errors.' },
                { title: 'Differing Site Condition (DSC) Claims', desc: 'Excavation contractors encounter unexpected rock pinnacles or high water tables, pausing work and submitting change orders.' },
                { title: 'Environmental Permitting Friction', desc: 'Ecological reports lack exact spatial overlay with foundation cut-and-fill limits, resulting in regulator objections.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <div className="mt-0.5 p-1 rounded-full bg-red-100 text-red-600 shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-red-900 font-semibold block">{item.title}</strong>
                    <span className="text-slate-600 text-xs">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: The Groundwi Projects Integrated Ground Model */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#00A3E8]/40 shadow-lg shadow-cyan-100/50 relative">
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] text-slate-950 shadow-md">
              Groundwi Standard
            </div>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-[#00A3E8]/10 border border-[#00A3E8]/30 flex items-center justify-center text-[#007ea8]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">The Groundwi Projects Integrated Approach</h4>
                <p className="text-xs text-[#007ea8] font-semibold">One Single Cross-Validated Spatial Dataset</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm">
              {[
                { title: 'Unified Web GIS Digital Model', desc: 'All field logs, geophysics slices, ecology zones, and LiDAR elevations fuse onto one interactive, queryable 3D platform.' },
                { title: 'Continuous Non-Invasive Mapping', desc: 'Electrical Resistivity Tomography (ERT) and seismic profile 100% of the site; boreholes are placed surgically on anomalies.' },
                { title: 'Rigorous Geodetic Harmonization', desc: 'Every observation tied to verified geodetic benchmarks. Zero vertical or coordinate discrepancies between disciplines.' },
                { title: 'Pre-Emptive Risk Mitigation', desc: 'Identify karst voids, high water tables, and fault lines prior to procurement, eliminating contractor dispute claims.' },
                { title: 'Seamless BIM / Civil 3D Export', desc: 'Export multi-layer surfaces and borehole strata directly into Revit and Civil 3D for instantaneous structural integration.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <div className="mt-0.5 p-1 rounded-full bg-[#00A3E8]/20 text-[#007ea8] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-[#007ea8] font-semibold block">{item.title}</strong>
                    <span className="text-slate-600 text-xs">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Investigation Delivery Modes: Desk Study vs Field Investigation vs Integrated */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Delivery Architecture</span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
                Tailored for Every Project Phase: Desk Study & Field Investigation
              </h3>
            </div>
            
            {/* Interactive Tab Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
              {[
                { id: 'desk-study', label: 'Desk Study' },
                { id: 'field-investigation', label: 'Field Investigation' },
                { id: 'integrated', label: 'Full Integrated Package' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-phase-${tab.id}`}
                  onClick={() => setSelectedPhase(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedPhase === tab.id
                      ? 'bg-emerald-500 text-slate-950 shadow font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedPhase === 'desk-study' && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#007ea8]">
                    <Search className="w-5 h-5" />
                    <h4 className="font-bold text-slate-900 text-base">Rapid Preliminary Fatal Flaw Screen</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designed for early land acquisition, feasibility, and pre-bid risk appraisal without mobilizing heavy rigs. Synthesizes satellite remote sensing, historical geological records, hydrological catchments, and statutory regulatory datasets.
                  </p>
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-[#007ea8] uppercase tracking-wider">Turnaround:</span>
                    <p className="text-sm font-semibold text-slate-900">48 to 72 Hours Expedited Delivery</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">Included Capabilities:</span>
                  <div className="space-y-1.5">
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Historical aerial photogrammetry (50+ yr analysis)</p>
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Regional bedrock & fault lineament overlays</p>
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Floodplain, wetland & protected habitat screening</p>
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Prior geotechnical borehole archive retrieval</p>
                  </div>
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Primary Outcome:</span>
                  <p className="text-xs text-slate-600">
                    Confirms whether the site has critical geotechnical or environmental fatal flaws before investing millions in purchase options or unguided drilling programs.
                  </p>
                  <button
                    id="desk-study-estimator-btn"
                    onClick={onOpenEstimator}
                    className="w-full py-2 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                  >
                    Estimate Desk Study Scope
                  </button>
                </div>
              </>
            )}

            {selectedPhase === 'field-investigation' && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Crosshair className="w-5 h-5" />
                    <h4 className="font-bold text-slate-900 text-base">In-Situ Ground & Laboratory Testing</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Physical field characterization using our own fleet of CPTu piezocone rigs, rotary drilling rigs, drone LiDAR scanners, and certified in-house soil mechanics laboratory testing.
                  </p>
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Field Mobilization:</span>
                    <p className="text-sm font-semibold text-slate-900">Full Regional Crew & Rig Dispatch</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">Included Capabilities:</span>
                  <div className="space-y-1.5">
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Continuous CPTu soundings & SPT sampling</p>
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Electrical Resistivity Tomography (ERT) profile lines</p>
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Drone RTK LiDAR elevation & boundary staking</p>
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Seasonal flora/fauna & groundwater monitoring</p>
                  </div>
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Primary Outcome:</span>
                  <p className="text-xs text-slate-600">
                    Provides certified bearing capacity parameters, settlement estimates, and environmental baseline clearings stamped by registered professional engineers (PE/CEng).
                  </p>
                  <button
                    id="field-investigation-estimator-btn"
                    onClick={onOpenEstimator}
                    className="w-full py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00A3E8] to-[#38bdf8] hover:from-[#0092d0] hover:to-[#0ea5e9] transition-all"
                  >
                    Configure Field Investigation
                  </button>
                </div>
              </>
            )}

            {selectedPhase === 'integrated' && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#d97706]">
                    <Layers className="w-5 h-5" />
                    <h4 className="font-bold text-slate-900 text-base">Full Integrated Lifecycle Intelligence</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The complete end-to-end ground assurance workflow: Begins with a 48h desk study to optimize borehole layouts, executes targeted in-situ testing, and fuses all layers into a live cloud Web GIS portal.
                  </p>
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider">Ultimate Certainty:</span>
                    <p className="text-sm font-semibold text-slate-900">Guaranteed Zero Ground Surprises</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">Included Capabilities:</span>
                  <div className="space-y-1.5">
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A3E8]" /> Desk study risk screening & targeted field test plan</p>
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#FF721F]" /> 100% Geophysical bedrock & anomaly delineation</p>
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#d97706]" /> Cross-validated geotechnical foundation parameters</p>
                    <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A3E8]" /> Cloud Web GIS 3D Subsurface Model + BIM LandXML</p>
                  </div>
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-[#b45309] uppercase">Primary Outcome:</span>
                  <p className="text-xs text-slate-600">
                    The highest standard in ground engineering. Completely insulates project owners and EPC contractors from differing site condition lawsuits and foundation failures.
                  </p>
                  <button
                    id="integrated-package-estimator-btn"
                    onClick={onOpenEstimator}
                    className="w-full py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] transition-all shadow-md shadow-orange-500/20"
                  >
                    Configure Full Integrated Scope
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
