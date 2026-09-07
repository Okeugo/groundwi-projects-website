import React from 'react';
import { CalendarCheck2 } from 'lucide-react';
import { Hero } from './Hero';

interface HomePageProps {
  onNavigate: (pageId: string) => void;
  onRequestQuote: () => void;
  onSelectServiceForQuote?: (serviceTitle: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onRequestQuote,
}) => {
  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <Hero
        onExploreGis={() => onNavigate('interactive-gis')}
        onExploreServices={() => onNavigate('services')}
        onRequestQuote={onRequestQuote}
        onExploreBoreholes={() => onNavigate('services')}
      />

      {/* 2. Executive Dispatch Call to Action */}
      <section className="py-16 bg-gradient-to-r from-slate-50 via-[#00A3E8]/10 to-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase font-bold tracking-widest text-[#007da6]">
            Defensible Subsurface Assurance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Space_Grotesk']">
            Ready to Eliminate Ground Surprises on Your Next Site?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you require a rapid 48-hour preliminary desk study or full multi-rig field mobilization, our senior engineering team is ready to assist.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('scope-estimator')}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 hover:border-[#F7BA1E]/60 shadow-xs transition-colors"
            >
              Launch Scope & Turnaround Estimator
            </button>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
            >
              <CalendarCheck2 className="w-4 h-4" />
              <span>Request Formal RFP Proposal</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
