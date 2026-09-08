import React, { useState } from 'react';
import { 
  PARTNERS_DATA, 
  PARTNER_CATEGORIES, 
  Partner 
} from '../data/partnersData';
import { 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  Filter, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Wrench, 
  Cpu, 
  Droplets, 
  Layers, 
  FlaskConical, 
  MapPin, 
  Handshake, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';

interface PartnersSectionProps {
  onPartnerInquiry: (partnerName: string) => void;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ onPartnerInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPartners = PARTNERS_DATA.filter((partner) => {
    const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !searchLower ||
      partner.name.toLowerCase().includes(searchLower) ||
      partner.description.toLowerCase().includes(searchLower) ||
      partner.deployedAssets.some(asset => asset.toLowerCase().includes(searchLower)) ||
      partner.standards.some(std => std.toLowerCase().includes(searchLower)) ||
      partner.location.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: Partner['category']) => {
    switch (category) {
      case 'geophysics':
        return <Layers className="w-4 h-4 text-[#00A3E8]" />;
      case 'geotech':
        return <Wrench className="w-4 h-4 text-[#FF721F]" />;
      case 'water':
        return <Droplets className="w-4 h-4 text-[#00A3E8]" />;
      case 'software':
        return <Cpu className="w-4 h-4 text-[#F7BA1E]" />;
      case 'laboratories':
        return <FlaskConical className="w-4 h-4 text-emerald-400" />;
      default:
        return <Building2 className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00A3E8]/10 text-[#007ea8] border border-[#00A3E8]/20 mb-4">
            <Handshake className="w-3.5 h-3.5" />
            <span>OEMs, Laboratories & Strategic Alliances</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
            Technology & Operational Partners
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Groundwi Projects partners with world-leading geophysical manufacturers, heavy geotechnical drillers, certified hydrogeology OEMs, and accredited ISO/IEC testing facilities to eliminate site uncertainties.
          </p>

          {/* Key Trust Metrics */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl font-bold text-[#007ea8] font-['Space_Grotesk']">100%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">OEM Factory Calibrated</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl font-bold text-[#FF721F] font-['Space_Grotesk']">ISO 17025</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Accredited Materials Labs</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl font-bold text-[#e69800] font-['Space_Grotesk']">Sub-cm</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">RTK GNSS Precision</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl font-bold text-emerald-700 font-['Space_Grotesk']">Zero</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Uncalibrated Tooling</div>
            </div>
          </div>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {PARTNER_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-[#00A3E8] to-[#0092d0] text-slate-950 dark:text-white font-bold shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:text-white hover:bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search equipment, ASTM, OEM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#00A3E8] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-900 dark:text-white"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredPartners.length}</strong> technology & testing partner{filteredPartners.length === 1 ? '' : 's'}
            </span>
            {selectedCategory !== 'all' && (
              <button 
                onClick={() => setSelectedCategory('all')} 
                className="text-[#007ea8] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Reset filter</span>
              </button>
            )}
          </div>
        </div>

        {/* Partners Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#00A3E8]/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-100/50"
            >
              <div>
                {/* Card Header: Category & Tier */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {getCategoryIcon(partner.category)}
                    <span>{partner.categoryLabel}</span>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FF721F]/10 text-[#FF721F] border border-[#FF721F]/30">
                    {partner.tier}
                  </span>
                </div>

                {/* Partner Name & Location */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#007ea8] transition-colors font-['Space_Grotesk']">
                  {partner.name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{partner.location}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {partner.description}
                </p>

                {/* Deployed Hardware / Software Assets */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                    Deployed Instrumentation & Technology:
                  </span>
                  <ul className="space-y-1.5">
                    {partner.deployedAssets.map((asset, i) => (
                      <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{asset}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Standards Complied */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {partner.standards.map((std, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Integration level & Action button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-[#e69800]">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-semibold">{partner.integrationType}</span>
                </div>

                <button
                  onClick={() => onPartnerInquiry(partner.name)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 hover:bg-[#00A3E8] hover:text-slate-950 dark:text-white transition-colors"
                >
                  <span>Request Capability Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Strategic Alliance & Subcontractor Callout */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#00A3E8]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF721F]/10 text-[#FF721F] border border-[#FF721F]/20 mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Partner Ecosystem</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Join Groundwi&apos;s Engineering & Drilling Network
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Are you a specialized geotechnical drilling operator, licensed hydrochemical testing laboratory, or advanced instrumentation OEM? We invite qualified technical providers to register with our operational dispatch network for regional site mobilizations and cross-border infrastructure schemes.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onPartnerInquiry('New Technical Partnership / Subcontractor Network Application')}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 dark:text-white bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <Handshake className="w-4 h-4" />
                <span>Apply for Partner Network</span>
              </button>
              <button
                onClick={() => onPartnerInquiry('OEM Instrument Integration')}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 transition-colors shadow-xs"
              >
                OEM Tooling Registration
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
