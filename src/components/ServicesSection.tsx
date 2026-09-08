import React, { useState } from 'react';
import { 
  Activity, 
  Layers, 
  ShieldCheck, 
  Mountain, 
  Compass, 
  Globe, 
  Droplets,
  CheckCircle2, 
  ArrowRight, 
  FileSpreadsheet, 
  SlidersHorizontal,
  X,
  ShieldAlert,
  Wrench
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceOffering } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'desk-study' | 'field-investigation' | 'water-boreholes'>('all');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceOffering | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-[#00A3E8]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Mountain': return <Mountain className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'water-boreholes') return service.id === 'water-borehole-drilling';
    return service.modes.includes(activeFilter) || service.modes.includes('both');
  });

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00A3E8]/10 text-[#007da6] border border-[#00A3E8]/20 mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Core Offerings & Technical Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
              Multi-Disciplinary Ground Engineering
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              From non-invasive subsurface geophysics and in-situ geotechnical testing to statutory EIA baseline documentation and unified GIS digital twins.
            </p>
          </div>

          {/* Investigation Mode Filter Buttons */}
          <div className="flex flex-wrap items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 self-start md:self-auto gap-1">
            <button
              id="filter-services-all"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-[#00A3E8] to-[#38bdf8] text-slate-950 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'
              }`}
            >
              All Capabilities
            </button>
            <button
              id="filter-services-desk"
              onClick={() => setActiveFilter('desk-study')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === 'desk-study'
                  ? 'bg-gradient-to-r from-[#00A3E8] to-[#38bdf8] text-slate-950 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'
              }`}
            >
              Desk Study
            </button>
            <button
              id="filter-services-field"
              onClick={() => setActiveFilter('field-investigation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === 'field-investigation'
                  ? 'bg-gradient-to-r from-[#00A3E8] to-[#38bdf8] text-slate-950 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'
              }`}
            >
              Field Investigation
            </button>
            <button
              id="filter-services-water"
              onClick={() => setActiveFilter('water-boreholes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === 'water-boreholes'
                  ? 'bg-gradient-to-r from-[#00A3E8] to-[#38bdf8] text-slate-950 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'
              }`}
            >
              Water Boreholes
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-[#00A3E8]/50 p-6 transition-all duration-200 shadow-xs hover:shadow-lg relative overflow-hidden"
            >
              <div>
                {/* Image (if available) */}
                {service.imageUrl && (
                  <div className="-mx-6 -mt-6 mb-4 h-48 bg-slate-100 dark:bg-slate-800/50 overflow-hidden relative border-b border-slate-200 dark:border-slate-700">
                    <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                
                {/* Top Discipline Tag & Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00A3E8]/10 border border-[#00A3E8]/20 flex items-center justify-center text-[#007ea8] group-hover:scale-105 group-hover:bg-[#00A3E8] group-hover:text-slate-950 dark:text-white transition-all">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {service.shortTag}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#00A3E8]/10 text-[#007ea8] border border-[#00A3E8]/20">
                      Desk & Field
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0082b3] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs text-[#007ea8] font-semibold">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Capabilities List */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Core Capabilities:
                  </span>
                  {service.keyCapabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A3E8] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  id={`service-modal-trigger-${service.id}`}
                  onClick={() => setSelectedServiceModal(service)}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#0082b3] transition-colors flex items-center gap-1 focus:outline-none"
                >
                  <span>Technical Specs & Equipment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id={`service-add-quote-${service.id}`}
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 dark:text-white bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-md shadow-orange-500/20 transition-all active:scale-95"
                >
                  Request Scope
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Unified Ground Note */}
        <div className="mt-12 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-600 dark:text-slate-400">
          <FileSpreadsheet className="w-4 h-4 text-[#00A3E8] shrink-0" />
          <span>Need a combined discipline proposal? Select multiple capabilities in our instant scope estimator or attach your site boundaries to an inquiry.</span>
        </div>

      </div>

      {/* Deep-Dive Technical Specs Modal */}
      {selectedServiceModal && (
        <div 
          id="service-detail-modal" 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  {getServiceIcon(selectedServiceModal.icon)}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#007ea8] block">
                    Technical Specifications
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                    {selectedServiceModal.title}
                  </h3>
                </div>
              </div>
              <button
                id="close-service-modal-btn"
                onClick={() => setSelectedServiceModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 text-xs sm:text-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Overview</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedServiceModal.description}</p>
              </div>

              {/* Equipment & Methods */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-xs font-bold text-[#007ea8] uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  Deployed Equipment & In-Situ Methods
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  {selectedServiceModal.equipmentAndMethods.map((eq, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00A3E8] shrink-0" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compliance Standards */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Applicable Standards & Regs</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedServiceModal.applicableStandards.map((std, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certified Deliverables */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Deliverables & Formats</h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  {selectedServiceModal.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00A3E8] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risk Mitigated */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-amber-800">Subsurface Risk Mitigated:</strong>
                  <span>{selectedServiceModal.riskMitigated}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
              <button
                id="modal-close-action-btn"
                onClick={() => setSelectedServiceModal(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white"
              >
                Close Window
              </button>
              <button
                id="modal-select-quote-btn"
                onClick={() => {
                  onSelectServiceForQuote(selectedServiceModal.title);
                  setSelectedServiceModal(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 dark:text-white bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <span>Add &quot;{selectedServiceModal.shortTag}&quot; to RFP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
