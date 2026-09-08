import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Menu, 
  X, 
  ShieldCheck, 
  FileCheck2,
  Moon,
  Sun
} from 'lucide-react';
import { GroundwiLogo } from './GroundwiLogo';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onRequestQuote?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'integrated-approach', label: 'Integrated Approach' },
    { id: 'services', label: 'Services' },
    { id: 'interactive-gis', label: 'Unified GIS Map' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'partners', label: 'Partners' },
    { id: 'insights', label: 'Insights' },
    { id: 'scope-estimator', label: 'Scope Estimator' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-navbar" 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm py-3' 
          : 'bg-white dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="p-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-[#00A3E8]/50 shadow-sm transition-all group-hover:shadow-[#00A3E8]/20">
              <GroundwiLogo size={36} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Groundwi <span className="text-[#00A3E8]">Projects</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#00A3E8]/10 text-[#00A3E8] border border-[#00A3E8]/25">
                  Site Intelligence
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 tracking-normal hidden md:block">
                One Team • One Document • Zero Ground Surprises
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'text-[#00A3E8] bg-[#00A3E8]/10 border border-[#00A3E8]/25 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="hidden xl:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              id="nav-scope-estimator-btn"
              onClick={() => handleLinkClick('scope-estimator')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#F7BA1E]/50 transition-colors"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#F7BA1E]" />
              <span>Desk / Field Scope</span>
            </button>

            <button
              id="nav-call-hotline-btn"
              onClick={() => handleLinkClick('contact')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 dark:text-white bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-sm shadow-orange-500/20 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>RFP Proposal Desk</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-panel" 
          className="lg:hidden border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 mt-3 shadow-xl animate-in fade-in slide-in-from-top-4"
        >
          <div className="py-1 border-b border-slate-100 dark:border-slate-800 mb-2">
            <p className="text-[11px] text-[#00A3E8] uppercase font-semibold tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Desk Study & Field Ground Investigation
            </p>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-link-${item.id}`}
              onClick={() => handleLinkClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'text-[#00A3E8] bg-[#00A3E8]/10 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              id="mobile-scope-configurator-btn"
              onClick={() => handleLinkClick('scope-estimator')}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center flex items-center justify-center gap-2"
            >
              <FileCheck2 className="w-4 h-4 text-[#F7BA1E]" />
              Instant Scope Estimator
            </button>
            <button
              id="mobile-call-hotline-btn"
              onClick={() => handleLinkClick('contact')}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-slate-950 dark:text-white bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <PhoneCall className="w-4 h-4" />
              Contact Site Engineering Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
