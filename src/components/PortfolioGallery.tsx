import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Layers,
  ShieldCheck,
  TrendingUp,
  Compass
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { PortfolioProject } from '../types';

interface PortfolioGalleryProps {
  onSelectProjectForRFP: (projectTitle: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  onSelectProjectForRFP
}) => {
  const [activeSector, setActiveSector] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const sectors = ['All', 'Energy & Renewables', 'Infrastructure', 'Commercial & Industrial', 'Mining & Resources', 'Environmental & Water'];

  const filteredProjects = PORTFOLIO_DATA.filter((project) => {
    const matchesSector = activeSector === 'All' || project.clientSector === activeSector;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.servicesApplied.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.challenge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <section id="portfolio" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00A3E8]/10 text-[#007ea8] border border-[#00A3E8]/20 mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Proven Field Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
              Portfolio & Project Case Studies
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
              Defensible site characterizations that prevented structural failures, unlocked environmental permits, and eliminated costly ground surprises across critical infrastructure.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="portfolio-search-input"
              type="text"
              placeholder="Search projects or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00A3E8] transition-colors"
            />
          </div>
        </div>

        {/* Sector Filter Chips */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {sectors.map((sector) => (
            <button
              key={sector}
              id={`sector-filter-${sector.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setActiveSector(sector)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeSector === sector
                  ? 'bg-gradient-to-r from-[#00A3E8] to-[#38bdf8] text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group rounded-2xl bg-white border border-slate-200 hover:border-[#00A3E8]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-100/50"
            >
              {/* Image & Sector Overlay */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Sector Chip */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/90 text-[#007ea8] border border-slate-200 backdrop-blur-sm shadow-xs">
                    {project.clientSector}
                  </span>
                </div>

                {/* ROI Badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] text-slate-950 shadow-md">
                    {project.roiMetric}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.location}</span>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.dateCompleted}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#007ea8] transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                {/* Services Chips */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.servicesApplied.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {s.split(' ')[0]}
                      </span>
                    ))}
                    {project.servicesApplied.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        +{project.servicesApplied.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      id={`view-project-details-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-[#007ea8] hover:text-[#005f80] flex items-center gap-1 transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      id={`project-rfp-btn-${project.id}`}
                      onClick={() => onSelectProjectForRFP(project.title)}
                      className="text-xs text-slate-500 hover:text-slate-900 font-medium"
                    >
                      Inquire Similar Scope
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Deep Dive Modal */}
      {selectedProject && (
        <div 
          id="project-detail-modal" 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
            
            {/* Modal Image Header */}
            <div className="relative h-60 sm:h-72 w-full bg-slate-900">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <button
                id="close-project-modal-btn"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-400 text-slate-950">
                    {selectedProject.clientSector}
                  </span>
                  <span className="text-xs text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {selectedProject.location}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] leading-tight">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
              
              {/* Quantified Technical Data Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Boreholes / CPT</span>
                  <span className="text-sm font-bold text-emerald-700 font-mono">
                    {selectedProject.technicalData.boreholesOrSoundings ?? 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Geophysics Lines</span>
                  <span className="text-sm font-bold text-[#007ea8] font-mono">
                    {selectedProject.technicalData.profileLineKm ? `${selectedProject.technicalData.profileLineKm} km` : 'Comprehensive'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Depth Investigated</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {selectedProject.technicalData.depthInvestigated ?? '30m+'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Footprint Area</span>
                  <span className="text-sm font-bold text-amber-600 font-mono">
                    {selectedProject.technicalData.areaCovered ?? 'Site Parcel'}
                  </span>
                </div>
              </div>

              {/* The Challenge */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  Site Challenge & Subsurface Risk
                </h4>
                <p className="text-slate-700 leading-relaxed bg-red-50/50 p-4 rounded-xl border border-red-100">
                  {selectedProject.challenge}
                </p>
              </div>

              {/* The Integrated Solution */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  Integrated Multi-Disciplinary Solution
                </h4>
                <p className="text-slate-700 leading-relaxed bg-emerald-50/40 p-4 rounded-xl border border-emerald-100">
                  {selectedProject.integratedSolution}
                </p>
              </div>

              {/* Defensible Outcomes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#007ea8] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#007ea8]" />
                  Defensible Outcomes & ROI Realized
                </h4>
                <div className="space-y-2">
                  {selectedProject.defensibleOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GIS Layers Fused */}
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">GIS Digital Twin Layers Fused:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.layersUsed.map((layer, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {layer}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
              <button
                id="close-modal-footer-btn"
                onClick={() => setSelectedProject(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close Case Study
              </button>
              <button
                id="modal-rfp-button"
                onClick={() => {
                  onSelectProjectForRFP(selectedProject.title);
                  setSelectedProject(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <span>Request Scope for Similar Site</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
