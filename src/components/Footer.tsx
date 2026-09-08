import React, { useState } from 'react';
import { 
  Mail, 
  PhoneCall, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  FileCheck2
} from 'lucide-react';
import { submitNewsletterSubscription } from '../lib/api';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onRequestQuote: () => void;
  hideBanner?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onRequestQuote,
  hideBanner = false
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubmitting(true);
      await submitNewsletterSubscription(newsletterEmail, 'footer');
      setSubscribed(true);
      setNewsletterEmail('');
      setSubmitting(false);
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs">
      
      {/* Top CTA Banner */}
      {!hideBanner && (
        <div className="border-b border-slate-200 py-12 bg-gradient-to-r from-slate-50 via-[#00A3E8]/5 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#007ea8]">
                Site Assessment & Risk Mitigation
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk']">
                Ready to eliminate ground surprises on your next project?
              </h3>
              <p className="text-xs text-slate-600">
                Request a 48h desk study fatal flaw screening or dispatch field crews for continuous geophysics and CPTu testing.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="footer-open-scope-btn"
                onClick={() => onNavigate('scope-estimator')}
                className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 hover:border-[#F7BA1E]/60 transition-colors shadow-xs"
              >
                Configure Scope
              </button>
              <button
                id="footer-request-proposal-btn"
                onClick={onRequestQuote}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Identity & Value Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-base tracking-tight text-slate-900 font-['Space_Grotesk']">
                Groundwi <span className="text-[#007ea8]">Projects</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Consolidating geophysical subsurface profiling, geotechnical soil testing, EIA baseline studies, geological mapping, and topography into one defensible, cross-validated digital ground model.
            </p>

            <div className="pt-2 text-slate-500 text-[11px]">
              Licensed Professional Engineers (PE) & Professional Geologists (PG).
            </div>
          </div>

          {/* Col 3: Core Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Core Offerings
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Geophysical Subsurface Profiling',
                'Geotechnical Soil Testing (SPT/CPT)',
                'EIA Baseline Studies',
                'Geological Field Mapping',
                'Topography Survey & LiDAR',
                'Advanced GIS Mapping'
              ].map((service, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-[#007ea8] transition-colors text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform & Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('integrated-approach')} className="hover:text-[#007ea8] transition-colors">
                  Integrated Data Approach
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('interactive-gis')} className="hover:text-[#007ea8] transition-colors">
                  Interactive GIS Digital Twin
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-[#007ea8] transition-colors">
                  Project Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('partners')} className="hover:text-[#007ea8] transition-colors">
                  Partners & Alliances
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('insights')} className="hover:text-[#007ea8] transition-colors">
                  Knowledge Base & Insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scope-estimator')} className="hover:text-[#007ea8] transition-colors">
                  Scope & Risk Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#007ea8] transition-colors">
                  Contact & Dispatch Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Technical Newsletter & Certification */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Technical Insights
            </h4>
            <p className="text-[11px] text-slate-600">
              Receive our quarterly subsurface engineering bulletins and case reports on ground risk mitigation.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Subscribed to Ground Insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-md shadow-orange-500/20 transition-all"
                >
                  Subscribe
                </button>
              </form>
            )}

            <div className="pt-2 text-[10px] font-mono text-slate-500 flex flex-wrap gap-2">
              <span>ASTM Compliant</span>
              <span>•</span>
              <span>BS 5930</span>
              <span>•</span>
              <span>Eurocode 7</span>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Groundwi Projects Integrated Site Intelligence Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">Confidential Geotechnical & Environmental Non-Disclosure Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
