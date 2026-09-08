import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  MapPin, 
  AlertOctagon, 
  CheckCircle2, 
  Maximize2, 
  Info, 
  Activity, 
  Compass, 
  ShieldAlert, 
  Droplets,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface SubsurfacePoint {
  id: string;
  name: string;
  type: 'cpt' | 'borehole' | 'geophysics-anomaly' | 'eia-buffer' | 'geology-fault';
  x: number; // percentage in cross-section / map
  depthMeters: number;
  label: string;
  discipline: string;
  soilOrRockType: string;
  keyMetric: string;
  riskStatus: 'critical-anomaly' | 'verified-safe' | 'monitoring-required';
  details: string;
  crossValidationNote: string;
}

export const InteractiveGisDemo: React.FC = () => {
  // Layer Toggles
  const [layers, setLayers] = useState({
    topography: true,
    geophysics: true,
    geotechnical: true,
    environmental: true,
    geological: true,
  });

  const [activeTab, setActiveTab] = useState<'cross-section' | 'plan-map'>('cross-section');
  const [selectedPointId, setSelectedPointId] = useState<string>('anomaly-v01');

  const surveyPoints: SubsurfacePoint[] = [
    {
      id: 'bh-01',
      name: 'Borehole BH-01',
      type: 'borehole',
      x: 18,
      depthMeters: 28,
      label: 'BH-01 (Continuous HQ Core)',
      discipline: 'Geotechnical Soil Testing',
      soilOrRockType: 'Silty Sand over Intact Dolomite',
      keyMetric: 'SPT N = 38 blows/300mm | RQD = 85%',
      riskStatus: 'verified-safe',
      details: 'Drilled to 28m depth. Stiff overburden transitioning to high-strength unweathered dolomite bedrock at -11.5m.',
      crossValidationNote: 'Matches high resistivity (>1,200 Ω·m) in ERT Line 1. Validates high bearing capacity (q_all = 450 kPa).'
    },
    {
      id: 'anomaly-v01',
      name: 'Subsurface Anomaly V-01 (Hidden Void)',
      type: 'geophysics-anomaly',
      x: 48,
      depthMeters: 14,
      label: 'ERT Anomaly #03 (Paleochannel / Void)',
      discipline: 'Geophysical Subsurface Profiling',
      soilOrRockType: 'Mud-Filled Karst Cavity / Soft Organic Silt',
      keyMetric: 'Resistivity = 14 Ω·m (Extreme Conductive Low)',
      riskStatus: 'critical-anomaly',
      details: 'Discovered at -8m to -16m depth. Unmapped subterranean cavity between discrete boreholes BH-01 and BH-03.',
      crossValidationNote: 'CRUCIAL FINDING: An isolated borehole grid would have missed this entirely. Cross-validated with CPTu-02 to prevent pile punch-through collapse.'
    },
    {
      id: 'cpt-02',
      name: 'Piezocone CPTu-02',
      type: 'cpt',
      x: 52,
      depthMeters: 22,
      label: 'CPTu-02 (Continuous Piezocone)',
      discipline: 'Geotechnical Soil Testing',
      soilOrRockType: 'Very Soft Silt / Clay (Liquefiable Lens)',
      keyMetric: 'Tip Resistance qc = 0.8 MPa | u2 = 420 kPa',
      riskStatus: 'critical-anomaly',
      details: 'Pushed directly into the anomaly identified by ERT. Detected sudden drop in tip resistance from 12 MPa down to 0.8 MPa at -9.2m.',
      crossValidationNote: 'Confirmed the geophysics anomaly is unconsolidated soft soil requiring localized stone-column ground improvement.'
    },
    {
      id: 'eia-stream',
      name: 'EIA Riparian Aquifer Buffer',
      type: 'eia-buffer',
      x: 75,
      depthMeters: 4,
      label: 'EIA Wetland Protection Zone',
      discipline: 'Environmental Impact Assessment',
      soilOrRockType: 'Shallow Alluvial Aquifer & Peat',
      keyMetric: 'Water Table = -1.8m bgl | pH = 7.1, EC = 210 µS/cm',
      riskStatus: 'monitoring-required',
      details: 'Seasonal high water table with 30m statutory buffer zone for rare amphibian breeding habitat.',
      crossValidationNote: 'Spatial overlay ensures foundation excavation dewatering does not draw down neighboring wetland aquifer.'
    },
    {
      id: 'bh-03',
      name: 'Borehole BH-03',
      type: 'borehole',
      x: 88,
      depthMeters: 30,
      label: 'BH-03 (Standard Penetration)',
      discipline: 'Geotechnical Soil Testing',
      soilOrRockType: 'Gravelly Sand over Weathered Basalt',
      keyMetric: 'SPT N = 42 blows/300mm | RQD = 78%',
      riskStatus: 'verified-safe',
      details: 'Competent bedrock encountered at -14.0m depth. Stable foundation stratum for eastern heavy building column.',
      crossValidationNote: 'Cross-checked with LiDAR surface DTM to eliminate elevation datum errors.'
    },
    {
      id: 'fault-01',
      name: 'Inferred Shear Discontinuity F-1',
      type: 'geology-fault',
      x: 62,
      depthMeters: 35,
      label: 'Fault Branch F-01',
      discipline: 'Geological Field Mapping',
      soilOrRockType: 'Brecciated Fault Gouge Rock Zone',
      keyMetric: 'Dip 68° SW | Gouge Thickness 1.2m',
      riskStatus: 'monitoring-required',
      details: 'Structural lineament delineated through surface outcropping strike/dip measurements and seismic refraction boundary.',
      crossValidationNote: 'Flags seismic joint requirement for civil structural engineers.'
    }
  ];

  const selectedPoint = surveyPoints.find(p => p.id === selectedPointId) || surveyPoints[1];

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const resetLayers = () => {
    setLayers({
      topography: true,
      geophysics: true,
      geotechnical: true,
      environmental: true,
      geological: true,
    });
  };

  return (
    <section id="interactive-gis" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Digital Twin Demonstration</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
              One Document. Zero Ground Surprises.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
              Experience our spatial data fusion platform firsthand. Toggle individual disciplines on and off to see how cross-validating geophysics, geotechnical testing, and EIA baseline data prevents multimillion-dollar site failures.
            </p>
          </div>

          {/* View Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 self-start md:self-auto">
            <button
              id="view-tab-cross-section"
              onClick={() => setActiveTab('cross-section')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'cross-section'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>2D Subsurface Cross-Section</span>
            </button>
            <button
              id="view-tab-plan-map"
              onClick={() => setActiveTab('plan-map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'plan-map'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Plan-View GIS Surface</span>
            </button>
          </div>
        </div>

        {/* The Interactive GIS Canvas Workspace */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Layer Switchboard & Controls */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active GIS Layers</span>
                </div>
                <button
                  id="reset-gis-layers-btn"
                  onClick={resetLayers}
                  className="text-[11px] text-slate-500 hover:text-emerald-600 flex items-center gap-1"
                  title="Reset all layers"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Layer Toggles */}
              <div className="space-y-2.5">
                {[
                  {
                    key: 'topography' as const,
                    name: 'Topography & LiDAR Contours',
                    tag: 'Elevation DTM',
                    color: 'bg-amber-500',
                    desc: '0.5m interval contours & boundary limits'
                  },
                  {
                    key: 'geophysics' as const,
                    name: 'Geophysical Profiling (ERT)',
                    tag: 'Resistivity Inversion',
                    color: 'bg-cyan-500',
                    desc: 'Electrical Resistivity Tomography & void anomaly'
                  },
                  {
                    key: 'geotechnical' as const,
                    name: 'Geotechnical Boreholes & CPT',
                    tag: 'SPT & qc Logs',
                    color: 'bg-emerald-500',
                    desc: 'Physical borings, blow counts, bearing strength'
                  },
                  {
                    key: 'environmental' as const,
                    name: 'EIA Riparian & Water Table',
                    tag: 'Statutory Buffer',
                    color: 'bg-teal-500',
                    desc: 'Protected habitat boundary & shallow aquifer'
                  },
                  {
                    key: 'geological' as const,
                    name: 'Geological Fault & Bedrock',
                    tag: 'Structural Litho',
                    color: 'bg-indigo-500',
                    desc: 'Dip/strike fault planes & competent rock boundary'
                  },
                ].map((l) => {
                  const isActive = layers[l.key];
                  return (
                    <button
                      key={l.key}
                      id={`layer-toggle-${l.key}`}
                      onClick={() => toggleLayer(l.key)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        isActive
                          ? 'bg-white border-slate-300 text-slate-900 shadow-xs'
                          : 'bg-slate-100/70 border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isActive ? l.color : 'bg-slate-400'}`} />
                          <span className="text-xs font-bold leading-none">{l.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 pl-4">{l.desc}</p>
                      </div>
                      <div className="mt-0.5">
                        {isActive ? (
                          <Eye className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Cross-Validation Status Box */}
              <div className="pt-3 border-t border-slate-200">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cross-Validation Active</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    5/5 disciplines unified onto WGS84 / UTM Zone 14N datum. Zero vertical offset discrepancies.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Center & Right: Interactive Visualizer & Sensor Inspector */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* The Main Visual Stage (Canvas Container) */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl p-4 sm:p-6 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between select-none">
              
              {/* Overlay Top Bar: Site Metadata */}
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-white tracking-wide">Project: Site Sector 4B - Energy Hub</span>
                  <span className="text-slate-400 hidden sm:inline">| Transect Line 04-W</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span>Elevation: 342.5m - 325.0m</span>
                  <span className="hidden sm:inline">Scale: 1:250</span>
                </div>
              </div>

              {/* View 1: 2D Subsurface Cross-Section View */}
              {activeTab === 'cross-section' && (
                <div className="relative my-4 flex-1 w-full min-h-[280px] flex flex-col justify-end bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl p-4 border border-slate-800 overflow-hidden">
                  
                  {/* Grid Lines & Depth Markers */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-4 opacity-20">
                    <div className="border-b border-slate-700 flex justify-end text-[10px] font-mono text-slate-400 pr-2">0.0m Ground Surface</div>
                    <div className="border-b border-slate-700 flex justify-end text-[10px] font-mono text-slate-400 pr-2">-10.0m Intermediate</div>
                    <div className="border-b border-slate-700 flex justify-end text-[10px] font-mono text-slate-400 pr-2">-20.0m Competent Bedrock Horizon</div>
                    <div className="border-b border-slate-700 flex justify-end text-[10px] font-mono text-slate-400 pr-2">-35.0m Base of Investigation</div>
                  </div>

                  {/* LAYER: Topography Ground Surface Wave */}
                  {layers.topography && (
                    <div className="absolute top-8 left-0 right-0 h-8 pointer-events-none">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                        <path d="M0,8 Q25,2 50,10 T100,6 L100,20 L0,20 Z" fill="#d97706" opacity="0.25" />
                        <path d="M0,8 Q25,2 50,10 T100,6" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2,2" />
                      </svg>
                      <span className="absolute top-1 left-4 text-[10px] font-mono text-amber-400/90 font-bold">
                        Topographic Surface (LiDAR DTM)
                      </span>
                    </div>
                  )}

                  {/* LAYER: Geological Strata Horizons */}
                  {layers.geological && (
                    <div className="absolute inset-x-0 bottom-0 top-16 pointer-events-none">
                      {/* Bedrock Surface Boundary */}
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Weathered Rock Strata */}
                        <path d="M0,45 Q30,40 50,68 T100,50 L100,100 L0,100 Z" fill="#312e81" opacity="0.3" />
                        {/* Competent Dolomite Bedrock */}
                        <path d="M0,60 Q35,55 50,78 T100,65 L100,100 L0,100 Z" fill="#1e1b4b" opacity="0.6" />
                        {/* Fault Discontinuity Plane */}
                        <line x1="62" y1="20" x2="58" y2="100" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.8" />
                      </svg>
                      <div className="absolute bottom-4 left-6 text-[10px] font-mono text-indigo-300/80 font-bold">
                        Competent Dolomite Formation (GSI = 70, RQD = 85%)
                      </div>
                    </div>
                  )}

                  {/* LAYER: Geophysical ERT Resistivity Heatmap & Void Anomaly */}
                  {layers.geophysics && (
                    <div className="absolute inset-x-0 top-20 bottom-10 pointer-events-none">
                      {/* Low Resistivity Anomaly (Paleochannel / Void) */}
                      <div className="absolute left-[40%] top-[25%] w-[20%] h-[35%] rounded-full bg-cyan-500/25 border-2 border-cyan-400/80 border-dashed animate-pulse flex items-center justify-center">
                        <span className="text-[10px] font-bold text-cyan-300 font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-400/50">
                          ERT Low (14 Ω·m)
                        </span>
                      </div>
                      {/* High Resistivity Bedrock Inversion Bar */}
                      <div className="absolute right-4 bottom-2 px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono">
                        ERT Profile Inversion: Res &gt; 1,200 Ω·m
                      </div>
                    </div>
                  )}

                  {/* LAYER: EIA Riparian Buffer & Water Table */}
                  {layers.environmental && (
                    <div className="absolute right-[12%] top-12 bottom-12 w-[18%] pointer-events-none border-l-2 border-r-2 border-teal-400/60 bg-teal-500/10 flex flex-col justify-between p-2">
                      <div className="flex items-center gap-1 text-[10px] text-teal-300 font-bold">
                        <Droplets className="w-3 h-3 text-teal-400" />
                        <span>Water Table (-1.8m)</span>
                      </div>
                      <span className="text-[9px] text-teal-200/80 uppercase font-mono tracking-tighter">
                        Statutory Riparian Buffer
                      </span>
                    </div>
                  )}

                  {/* LAYER: Geotechnical Boreholes & CPT Soundings (Clickable Interactive Targets) */}
                  <div className="relative z-20 w-full h-full flex items-end">
                    {surveyPoints.map((pt) => {
                      const isSelected = selectedPointId === pt.id;
                      return (
                        <div
                          key={pt.id}
                          style={{ left: `${pt.x}%` }}
                          className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center group cursor-pointer"
                          onClick={() => setSelectedPointId(pt.id)}
                        >
                          {/* Top Pin / Sensor Badge */}
                          <button
                            id={`gis-marker-${pt.id}`}
                            className={`mb-2 px-2 py-1 rounded-md text-[10px] font-bold font-mono transition-all flex items-center gap-1 shadow-lg ${
                              isSelected
                                ? 'bg-emerald-400 text-slate-950 scale-110 ring-2 ring-emerald-300'
                                : pt.riskStatus === 'critical-anomaly'
                                  ? 'bg-red-500 text-white animate-bounce ring-1 ring-red-400'
                                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
                            }`}
                          >
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{pt.name.split(' ')[0]}</span>
                          </button>

                          {/* Borehole / CPT Vertical Stem Line */}
                          <div 
                            style={{ height: `${pt.depthMeters * 5.5}px` }} 
                            className={`w-1 rounded-t transition-all ${
                              isSelected
                                ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] w-1.5'
                                : pt.riskStatus === 'critical-anomaly'
                                  ? 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]'
                                  : 'bg-slate-600 hover:bg-slate-400'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* View 2: Plan-View GIS Surface */}
              {activeTab === 'plan-map' && (
                <div className="relative my-4 flex-1 w-full min-h-[280px] bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-hidden flex items-center justify-center">
                  
                  {/* Cadastral & Topo Contour Map Backdrop */}
                  <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px]" />
                  
                  {/* Interactive Plan Grid Representation */}
                  <div className="relative w-full h-full max-w-xl mx-auto flex items-center justify-center">
                    
                    {/* Site Boundary Polygon */}
                    <div className="absolute inset-4 rounded-2xl border-2 border-dashed border-amber-500/40 pointer-events-none flex items-start justify-between p-3 text-[10px] text-amber-400 font-mono">
                      <span>SITE PARCEL BOUNDARY: 24.5 HA</span>
                      <span>DATUM: UTM 14N WGS84</span>
                    </div>

                    {/* Geophysics ERT Survey Lines (Plan Grid) */}
                    {layers.geophysics && (
                      <div className="absolute inset-8 pointer-events-none flex flex-col justify-around opacity-75">
                        <div className="w-full border-t-2 border-cyan-500/60 border-dotted flex justify-end text-[9px] text-cyan-400 pr-2">ERT Line 01 (1,200m)</div>
                        <div className="w-full border-t-2 border-cyan-500/60 border-dotted flex justify-end text-[9px] text-cyan-400 pr-2">ERT Line 02 (Cross-Tie)</div>
                        <div className="w-full border-t-2 border-cyan-500/60 border-dotted flex justify-end text-[9px] text-cyan-400 pr-2">ERT Line 03 (South Extent)</div>
                      </div>
                    )}

                    {/* Environmental Protected Wetland Buffer Zone */}
                    {layers.environmental && (
                      <div className="absolute right-12 top-8 bottom-8 w-36 rounded-2xl bg-teal-500/15 border border-teal-400/50 pointer-events-none flex items-center justify-center text-center p-2">
                        <span className="text-[10px] font-bold text-teal-300 uppercase tracking-tighter">
                          Riparian Buffer (No Deep Piling)
                        </span>
                      </div>
                    )}

                    {/* Geological Fault Lineament (Plan View) */}
                    {layers.geological && (
                      <div className="absolute inset-y-6 left-1/2 w-0.5 border-l-2 border-indigo-400/80 border-dashed pointer-events-none rotate-12 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-indigo-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded -rotate-12 border border-indigo-500/40 whitespace-nowrap">
                          F-01 Structural Fault Trace
                        </span>
                      </div>
                    )}

                    {/* Plan Survey Points */}
                    {surveyPoints.map((pt) => {
                      const isSelected = selectedPointId === pt.id;
                      return (
                        <button
                          key={pt.id}
                          id={`plan-point-${pt.id}`}
                          onClick={() => setSelectedPointId(pt.id)}
                          style={{
                            left: `${pt.x}%`,
                            top: `${(pt.depthMeters % 15) * 4 + 20}%`
                          }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all flex items-center gap-1.5 text-xs font-mono shadow-xl ${
                            isSelected
                              ? 'bg-emerald-400 text-slate-950 scale-125 ring-4 ring-emerald-400/30 z-30 font-bold'
                              : pt.riskStatus === 'critical-anomaly'
                                ? 'bg-red-500 text-white animate-pulse z-20'
                                : 'bg-slate-900 text-slate-200 border border-slate-700 hover:border-emerald-400'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline">{pt.name.split(' ')[0]}</span>
                        </button>
                      );
                    })}

                  </div>
                </div>
              )}

              {/* Bottom Quick Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Click any sensor point above (e.g. <strong>Anomaly V-01</strong> or <strong>CPTu-02</strong>) to inspect live cross-validation telemetry.</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Verified Safe</span>
                  <span className="w-2 h-2 rounded-full bg-red-400 ml-2" />
                  <span>Anomaly Detected</span>
                </div>
              </div>

            </div>

            {/* Subsurface Inspector Card: Live Data for the Selected Target */}
            <div 
              id="subsurface-inspector-card"
              className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-emerald-500/30 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl text-slate-950 ${
                    selectedPoint.riskStatus === 'critical-anomaly'
                      ? 'bg-red-400'
                      : selectedPoint.riskStatus === 'monitoring-required'
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                  }`}>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">{selectedPoint.name}</h4>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        selectedPoint.riskStatus === 'critical-anomaly'
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : selectedPoint.riskStatus === 'monitoring-required'
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {selectedPoint.riskStatus === 'critical-anomaly' ? 'Subsurface Anomaly' : selectedPoint.riskStatus === 'monitoring-required' ? 'Design Constraint' : 'Verified Foundation Bed'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{selectedPoint.discipline} • Target Depth: -{selectedPoint.depthMeters}m</p>
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Lithology & Strata</span>
                  <span className="text-xs font-semibold text-slate-800">{selectedPoint.soilOrRockType}</span>
                </div>
              </div>

              {/* Data Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">In-Situ Engineering Parameter</span>
                  <p className="text-sm font-bold text-emerald-700 font-mono">{selectedPoint.keyMetric}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Field Observation Details</span>
                  <p className="text-xs text-slate-600">{selectedPoint.details}</p>
                </div>
              </div>

              {/* The "Cross-Validation" Proof Note */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#00A3E8]/10 via-slate-50 to-white border border-[#00A3E8]/30 text-xs text-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#007ea8] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#007ea8] font-bold block mb-0.5">
                    How Groundwi Projects&apos; Integrated Approach Caught This:
                  </strong>
                  <span>{selectedPoint.crossValidationNote}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
