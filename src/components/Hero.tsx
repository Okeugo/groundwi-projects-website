import React from 'react';
import { 
  ArrowRight, 
  Map, 
  ShieldAlert, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Compass, 
  Cpu,
  FileSpreadsheet,
  Globe2,
  CalendarCheck2,
  Sparkles,
  Droplets
} from 'lucide-react';

interface HeroProps {
  onExploreGis: () => void;
  onExploreServices: () => void;
  onRequestQuote: () => void;
  onExploreBoreholes?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreGis,
  onExploreServices,
  onRequestQuote,
  onExploreBoreholes
}) => {
  return (
    <section 
      id="overview" 
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 border-b border-slate-200"
    >
      {/* Background Architectural Grid Lines & Subsurface Strata Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#00A3E8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      
      {/* Signature 4-Color Ambient Strata Glows from the Groundwi Logo */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#00A3E8]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#FF721F]/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[300px] h-[250px] bg-[#F7BA1E]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#00A3E8]/10 text-[#007ea8] border border-[#00A3E8]/30 shadow-xs">
            <Layers className="w-4 h-4" />
            <span>Ground Expertise • Subsurface Risk Mitigation • Water Borehole Solutions</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#e69800]" />
            <span>Desk Study & Field Mobilization Available</span>
          </div>
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] leading-[1.1] sm:leading-[1.15]">
            One Team. One Document.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00A3E8] via-[#e26214] to-[#FF721F]">
              Zero Ground Surprises.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl">
            Rather than relying on fragmented, isolated reports from competing contractors, <span className="text-slate-900 font-bold">Groundwi Projects</span> consolidates{' '}
            <span className="text-slate-900 font-semibold">geophysical subsurface profiling</span>,{' '}
            <span className="text-slate-900 font-semibold">geotechnical soil testing</span>,{' '}
            <span className="text-slate-900 font-semibold">EIA baseline studies</span>,{' '}
            <span className="text-slate-900 font-semibold">geological mapping</span>, and{' '}
            <span className="text-slate-900 font-semibold">topography</span> into one defensible, cross-validated digital ground model.
          </p>
        </div>

        {/* CTA Buttons & Interactive Triggers */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <button
            id="hero-open-gis-btn"
            onClick={onExploreGis}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-[#00A3E8] to-[#38bdf8] hover:from-[#0092d0] hover:to-[#0ea5e9] shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]"
          >
            <Map className="w-5 h-5 text-slate-950" />
            <span>Launch Unified Interactive GIS Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-request-proposal-btn"
            onClick={onRequestQuote}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
          >
            <CalendarCheck2 className="w-4 h-4 text-slate-950" />
            <span>Request Site Proposal</span>
          </button>

          <button
            id="hero-view-services-btn"
            onClick={onExploreServices}
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-colors"
          >
            <span>Explore 7 Core Capabilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Six Discipline Interactive Chips - Styled with Groundwi Brand Colors */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            { icon: Activity, label: 'Geophysical Profiling', desc: 'Bedrock & Anomaly ERT', color: '#00A3E8', border: 'hover:border-[#00A3E8]/50', onClick: onExploreServices },
            { icon: Layers, label: 'Geotechnical Testing', desc: 'SPT, CPTu & Lab Analysis', color: '#FF721F', border: 'hover:border-[#FF721F]/50', onClick: onExploreServices },
            { icon: ShieldAlert, label: 'EIA Baseline Studies', desc: 'Flora, Fauna & Hydrology', color: '#d99700', border: 'hover:border-[#F7BA1E]/50', onClick: onExploreServices },
            { icon: Compass, label: 'Geological Mapping', desc: 'Lithology & Rock Units', color: '#BE233D', border: 'hover:border-[#BE233D]/50', onClick: onExploreServices },
            { icon: Globe2, label: 'Topography Survey', desc: 'Elevation, LiDAR & DTM', color: '#00A3E8', border: 'hover:border-[#00A3E8]/50', onClick: onExploreServices },
            { icon: Cpu, label: 'Advanced GIS Fusion', desc: 'Multi-Layer Spatial Twin', color: '#FF721F', border: 'hover:border-[#FF721F]/50', onClick: onExploreGis },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index} 
                onClick={item.onClick}
                className={`p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs ${item.border} transition-all group text-left cursor-pointer hover:bg-slate-50 hover:shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-1" style={{ color: item.color }}>
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-xs font-bold text-slate-900 truncate">{item.label}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Quantified Track Record & Defensible Confidence Metrics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">380+</span>
              <CheckCircle2 className="w-4 h-4 text-[#00A3E8]" />
            </div>
            <p className="text-xs text-slate-600 font-medium">Cross-Validated Sites Delivered</p>
            <p className="text-[10px] text-[#007fa8] font-semibold">Renewables, Rail, Water & Industry</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">0</span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#FF721F]/15 text-[#FF721F] border border-[#FF721F]/30">Target</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Unmapped Ground Surprises</p>
            <p className="text-[10px] text-slate-500">Zero differing site condition claims</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">48 hr</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Rapid Desk Study Turnaround</p>
            <p className="text-[10px] text-[#b87d00] font-semibold">Fast-track preliminary fatal flaw screening</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">100%</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Defensible Regulatory Approval</p>
            <p className="text-[10px] text-slate-500">EPA, Eurocode 7 & ASTM Compliance</p>
          </div>
        </div>

      </div>
    </section>
  );
};
