import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ValueProposition } from './components/ValueProposition';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveGisDemo } from './components/InteractiveGisDemo';
import { PortfolioGallery } from './components/PortfolioGallery';
import { BlogSection } from './components/BlogSection';
import { PartnersSection } from './components/PartnersSection';
import { ScopeEstimator } from './components/ScopeEstimator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InvestigationMode } from './types';
import { 
  ArrowLeft, 
  ChevronRight, 
  Home, 
  Layers, 
  ShieldCheck, 
  Map, 
  Compass, 
  Handshake,
  BookOpen, 
  FileCheck2, 
  PhoneCall, 
  Droplets
} from 'lucide-react';

export default function App() {
  // Active page routing: 'overview' (home), 'services', 'integrated-approach', 'interactive-gis', 'portfolio', 'insights', 'scope-estimator', 'contact'
  const [activePage, setActivePage] = useState<string>('overview');
  
  // Prefilled parameters passed to contact form from various hubs
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);
  const [prefilledScopeSummary, setPrefilledScopeSummary] = useState<string | undefined>(undefined);
  const [prefilledMode, setPrefilledMode] = useState<InvestigationMode | undefined>(undefined);

  // Sync with browser URL hash for deep linking and browser history navigation
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = [
        'overview', 'home', 'services', 'integrated-approach', 
        'interactive-gis', 'portfolio', 'partners', 'insights', 'scope-estimator', 'contact'
      ];
      if (hash && validPages.includes(hash)) {
        setActivePage(hash === 'home' ? 'overview' : hash);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const navigateToPage = (pageId: string) => {
    const normalizedPage = pageId === 'home' ? 'overview' : pageId;
    setActivePage(normalizedPage);
    window.location.hash = normalizedPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    navigateToPage('contact');
  };

  const handleSelectProjectForRFP = (projectTitle: string) => {
    setPrefilledScopeSummary(`Inquiring about similar site conditions & investigation scope as documented in project: "${projectTitle}".`);
    navigateToPage('contact');
  };

  const handleContactAuthor = (topicTitle: string) => {
    setPrefilledScopeSummary(`Technical inquiry regarding insights from paper: "${topicTitle}". Please connect with specialist author.`);
    navigateToPage('contact');
  };

  const handlePartnerInquiry = (partnerName: string) => {
    setPrefilledScopeSummary(`Strategic Partnership / Capability Inquiry regarding: "${partnerName}".`);
    navigateToPage('contact');
  };

  const handleTransferScopeToContact = (scopeData: {
    mode: InvestigationMode;
    services: string[];
    summary: string;
  }) => {
    setPrefilledMode(scopeData.mode);
    setPrefilledScopeSummary(scopeData.summary);
    if (scopeData.services.length > 0) {
      setPrefilledService(scopeData.services[0]);
    }
    navigateToPage('contact');
  };

  // Helper metadata for breadcrumbs and individual page headers
  const getPageMeta = (pageId: string) => {
    switch (pageId) {
      case 'services':
        return {
          title: 'Core Engineering Services & Capabilities',
          subtitle: 'Multi-disciplinary field & desk capabilities including Geophysics and CPTu testing',
          badge: 'Technical Capabilities',
          icon: <Layers className="w-4 h-4 text-[#00A3E8]" />
        };
      case 'integrated-approach':
        return {
          title: 'The Integrated Subsurface Approach',
          subtitle: 'Eliminating ground surprises through cross-validated data fusion and unified delivery',
          badge: 'Methodology & Value Proposition',
          icon: <ShieldCheck className="w-4 h-4 text-[#F7BA1E]" />
        };
      case 'interactive-gis':
        return {
          title: 'Unified Interactive GIS Digital Twin',
          subtitle: 'Multi-layer spatial explorer linking borehole logs, continuous 2D ERT profiles, and hazard registers',
          badge: 'Interactive Spatial Platform',
          icon: <Map className="w-4 h-4 text-[#00A3E8]" />
        };
      case 'portfolio':
        return {
          title: 'Field-Verified Project Portfolio',
          subtitle: 'Documented case studies and defensible ROI across 380+ sites in energy, rail, and water resources',
          badge: 'Case Studies Gallery',
          icon: <Compass className="w-4 h-4 text-[#FF721F]" />
        };
      case 'partners':
        return {
          title: 'Technology & Operational Partners',
          subtitle: 'World-leading geophysical OEMs, CPTu manufacturers, and ISO/IEC 17025 accredited testing laboratories',
          badge: 'Partners & Alliances',
          icon: <Handshake className="w-4 h-4 text-[#00A3E8]" />
        };
      case 'insights':
        return {
          title: 'Ground Intelligence Knowledge Base',
          subtitle: 'Peer-reviewed technical bulletins, aquifer engineering whitepapers, and regulatory guidance',
          badge: 'Industry Insights & Research',
          icon: <BookOpen className="w-4 h-4 text-[#00A3E8]" />
        };
      case 'scope-estimator':
        return {
          title: 'Subsurface Scope & Risk Mitigation Estimator',
          subtitle: 'Configure desk study vs field campaign parameters, calculate risk reduction scores, and size fleet requirements',
          badge: 'Interactive Investigation Configurator',
          icon: <FileCheck2 className="w-4 h-4 text-[#F7BA1E]" />
        };
      case 'contact':
        return {
          title: 'Operational Dispatch & Formal RFP Proposal Desk',
          subtitle: 'Direct technical consultation with senior geoscientists, rapid proposal generation, and field mobilization hotline',
          badge: 'Engineering Consultation',
          icon: <PhoneCall className="w-4 h-4 text-[#FF721F]" />
        };
      default:
        return {
          title: 'Overview',
          subtitle: 'Groundwi Projects Integrated Subsurface Intelligence',
          badge: 'Home',
          icon: <Home className="w-4 h-4 text-[#00A3E8]" />
        };
    }
  };

  const isHome = activePage === 'overview' || activePage === 'home';
  const pageMeta = getPageMeta(activePage);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Sticky Navigation Header */}
      <Navbar
        activeSection={activePage}
        onNavigate={navigateToPage}
        onRequestQuote={() => navigateToPage('contact')}
      />

      {/* Main Content Area */}
      <main className="flex-1 bg-white dark:bg-slate-900">
        
        {isHome ? (
          /* Clean Home Page with Hero and Hub Gateways */
          <HomePage
            onNavigate={navigateToPage}
            onRequestQuote={() => navigateToPage('contact')}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        ) : (
          /* Individual Dedicated Page Container */
          <div className="pt-24 min-h-[calc(100vh-200px)] bg-white dark:bg-slate-900">
            
            {/* Top Breadcrumb & Page Navigation Bar */}
            <div className="bg-white dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 py-3.5 sticky top-[68px] z-30 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Back to Home & Breadcrumb */}
                <div className="flex items-center gap-3">
                  <button
                    id="back-to-home-btn"
                    onClick={() => navigateToPage('overview')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 transition-colors group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Home</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold">
                      {pageMeta.icon}
                      <span>{pageMeta.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Quick Hub Switcher Navigation Bar */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                  <span className="text-[11px] text-slate-400 mr-2 hidden lg:inline">Jump to:</span>
                  {[
                    { id: 'services', label: 'Services' },
                    { id: 'integrated-approach', label: 'Approach' },
                    { id: 'interactive-gis', label: 'GIS Twin' },
                    { id: 'portfolio', label: 'Projects' },
                    { id: 'partners', label: 'Partners' },
                    { id: 'insights', label: 'Insights' },
                    { id: 'scope-estimator', label: 'Estimator' },
                    { id: 'contact', label: 'Contact' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => navigateToPage(tab.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                        activePage === tab.id
                          ? 'bg-[#00A3E8]/10 text-[#00A3E8] border border-[#00A3E8]/30 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Individual Page Content Rendered Directly */}
            <div className="animate-fadeIn">
              {activePage === 'services' && (
                <ServicesSection
                  onSelectServiceForQuote={handleSelectServiceForQuote}
                />
              )}

              {activePage === 'integrated-approach' && (
                <ValueProposition
                  onExploreGis={() => navigateToPage('interactive-gis')}
                  onOpenEstimator={() => navigateToPage('scope-estimator')}
                />
              )}

              {activePage === 'interactive-gis' && (
                <InteractiveGisDemo />
              )}

              {activePage === 'portfolio' && (
                <PortfolioGallery
                  onSelectProjectForRFP={handleSelectProjectForRFP}
                />
              )}

              {activePage === 'partners' && (
                <PartnersSection
                  onPartnerInquiry={handlePartnerInquiry}
                />
              )}

              {activePage === 'insights' && (
                <BlogSection
                  onContactAuthor={handleContactAuthor}
                />
              )}

              {activePage === 'scope-estimator' && (
                <ScopeEstimator
                  onTransferToContact={handleTransferScopeToContact}
                />
              )}

              {activePage === 'contact' && (
                <ContactSection
                  initialService={prefilledService}
                  initialScopeSummary={prefilledScopeSummary}
                  initialMode={prefilledMode}
                />
              )}
            </div>

          </div>
        )}

      </main>

      {/* Global Engineering Footer */}
      <Footer
        onNavigate={navigateToPage}
        onRequestQuote={() => navigateToPage('contact')}
        hideBanner={isHome}
      />

    </div>
  );
}
