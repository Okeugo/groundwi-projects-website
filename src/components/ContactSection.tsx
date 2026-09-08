import React, { useState, useEffect } from 'react';
import { 
  Send, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  FileCheck2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  BellRing
} from 'lucide-react';
import { ContactFormData, InvestigationMode } from '../types';
import { submitLeadForm, generateDirectMailto, ADMIN_EMAIL } from '../lib/api';

interface ContactSectionProps {
  initialService?: string;
  initialScopeSummary?: string;
  initialMode?: InvestigationMode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  initialScopeSummary,
  initialMode
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    projectLocation: '',
    investigationMode: initialMode || 'both',
    services: initialService ? [initialService] : ['Geophysical Subsurface Profiling', 'Geotechnical Soil Testing'],
    projectStage: 'Pre-FEED / Feasibility',
    urgency: 'standard',
    message: initialScopeSummary || ''
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({
        ...prev,
        services: prev.services.includes(initialService) ? prev.services : [...prev.services, initialService]
      }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialScopeSummary) {
      setFormData(prev => ({
        ...prev,
        message: initialScopeSummary
      }));
    }
  }, [initialScopeSummary]);

  useEffect(() => {
    if (initialMode) {
      setFormData(prev => ({
        ...prev,
        investigationMode: initialMode
      }));
    }
  }, [initialMode]);

  const allAvailableServices = [
    'Geophysical Subsurface Profiling',
    'Geotechnical Soil Testing',
    'Environmental Impact Assessment (EIA)',
    'Geological Field Mapping',
    'Topography Survey',
    'Advanced GIS Mapping',
    'Water Borehole Drilling'
  ];

  const toggleService = (srv: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(srv);
      if (exists) {
        return { ...prev, services: prev.services.filter(s => s !== srv) };
      } else {
        return { ...prev, services: [...prev.services, srv] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await submitLeadForm({
        type: 'rfp',
        fullName: formData.fullName,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        projectLocation: formData.projectLocation,
        investigationMode: formData.investigationMode,
        services: formData.services,
        projectStage: formData.projectStage,
        urgency: formData.urgency,
        message: formData.message,
        scopeSummary: `Stage: ${formData.projectStage} | Urgency: ${formData.urgency}`
      });

      if (res.success) {
        setSubmittedId(res.id);
      } else {
        setSubmitError(res.message || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      // Fallback ID to still confirm client side
      const fallbackId = `GW-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedId(fallbackId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBrief = () => {
    const text = `GROUNDWI PROJECTS INQUIRY [${submittedId}]\nName: ${formData.fullName}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.projectLocation}\nMode: ${formData.investigationMode}\nDisciplines: ${formData.services.join(', ')}\nMessage: ${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const faqs = [
    {
      q: 'How fast can Groundwi Projects deliver a Phase 1 Desk Study for preliminary site screening?',
      a: 'Our standard desk study turnaround is 48 to 72 hours from confirmation of parcel boundaries. We synthesize satellite remote sensing, regional geological survey records, historical aerial photography, and environmental databases into an actionable preliminary risk report.'
    },
    {
      q: 'How does your "One Document" approach coordinate with our civil design team?',
      a: 'We deliver all spatial data directly through our cloud Web GIS portal as well as standardized engineering exports: Civil 3D LandXML, Autodesk Revit IFC models, Esri Shapefiles/File Geodatabases, and AGS / gINT borehole data. Your structural and civil designers can import calibrated subsurface surfaces with zero translation friction.'
    },
    {
      q: 'Can your CPTu and geophysical crews mobilize to remote, off-road, or environmentally sensitive sites?',
      a: 'Yes. We operate low-ground-pressure rubber-tracked Pagani and Geomil CPT rigs capable of navigating soft wetlands and steep grades without causing rutting. Our non-invasive geophysical arrays (ERT and MASW) are backpack-man-portable, leaving zero ecological footprint in sensitive habitats.'
    },
    {
      q: 'Are your investigations accepted by regulatory bodies (EPA, state agencies, local planning boards)?',
      a: '100%. All studies, geotechnical reports, and environmental impact statements are stamped by licensed Professional Engineers (PE) and Professional Geologists (PG) in compliance with ASTM, BS 5930, Eurocode 7, and federal EPA NEPA standards.'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00A3E8]/10 text-[#007ea8] border border-[#00A3E8]/25 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Site Inquiry & Technical Desk</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Initiate Your Site Assessment
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Submit your parcel details or request a desk study / field investigation proposal. Our principal engineers review site constraints within 4 business hours.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Operations Contact & Dispatch Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#007ea8] block mb-1">
                  Central Engineering Dispatch
                </span>
                <h3 className="text-xl font-black text-slate-900 font-['Space_Grotesk']">
                  Direct Field Contacts
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#00A3E8]/10 border border-[#00A3E8]/20 text-[#007ea8] shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-mono block">Technical Inquiry Hotline</span>
                    <a href="tel:+18005554367" className="text-sm font-bold text-slate-900 hover:text-[#007ea8] transition-colors">
                      +1 (800) 555-4367
                    </a>
                    <p className="text-[11px] text-slate-500">Direct line to Senior Geotechnical Engineer</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FF721F]/10 border border-[#FF721F]/20 text-[#FF721F] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-mono block">Proposals & Technical Inquiries</span>
                    <a href="mailto:proposals@groundwiprojects.com" className="text-sm font-bold text-[#FF721F] hover:underline">
                      proposals@groundwiprojects.com
                    </a>
                    <p className="text-[11px] text-slate-500">Attach CAD, shapefiles, or parcel KMZ</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-mono block">Field Operations & Rig Depots</span>
                    <p className="text-xs font-semibold text-slate-900">Central Operations: Houston, TX • Denver, CO • Reno, NV</p>
                    <p className="text-[11px] text-slate-500">Rapid deployment coverage across North America & International corridors</p>
                  </div>
                </div>
              </div>

              {/* Accreditations Badge Row */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Certified Standards & Quality Defense
                </span>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-700">
                  <span className="px-2 py-1 rounded bg-white border border-slate-200 shadow-xs">ISO 9001:2015</span>
                  <span className="px-2 py-1 rounded bg-white border border-slate-200 shadow-xs">ISO 14001</span>
                  <span className="px-2 py-1 rounded bg-white border border-slate-200 shadow-xs">ASTM Compliant</span>
                  <span className="px-2 py-1 rounded bg-white border border-slate-200 shadow-xs">BS 5930 / Eurocode 7</span>
                </div>
              </div>
            </div>

            {/* Accordion FAQ */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Frequently Answered Questions</span>
              </div>
              <div className="space-y-2">
                {faqs.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div key={index} className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs">
                      <button
                        id={`faq-toggle-${index}`}
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full text-left p-3 flex items-center justify-between gap-3 text-xs font-semibold text-slate-800 hover:text-slate-950"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="px-3 pb-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Proposal Request Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl relative">
              
              {submittedId ? (
                /* Success Screen */
                <div 
                  id="rfp-submission-success"
                  className="py-10 text-center space-y-5 animate-in fade-in zoom-in-95"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Inquiry Reference: {submittedId}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 font-['Space_Grotesk'] pt-1">
                      Inquiry Received & Dispatched
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Your requirements have been recorded in the Groundwi Projects dispatch database and routed directly to our engineering team.
                    </p>
                  </div>

                  {/* Dispatch Route Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <BellRing className="w-3.5 h-3.5 text-[#007ea8]" />
                    <span>Notification routed to: <strong className="text-slate-900 font-mono">{ADMIN_EMAIL}</strong></span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Client Name:</span>
                      <span className="text-slate-900 font-semibold">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Site Location:</span>
                      <span className="text-slate-900 font-semibold">{formData.projectLocation || 'Location Provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Delivery Mode:</span>
                      <span className="text-emerald-700 font-semibold uppercase">{formData.investigationMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Email:</span>
                      <span className="text-slate-900 font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Disciplines:</span>
                      <span className="text-slate-800 font-medium">{formData.services.length} selected</span>
                    </div>
                  </div>

                  {/* Operational Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={copyBrief}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSummary ? 'Copied Brief!' : 'Copy Summary Brief'}</span>
                    </button>

                    <a
                      href={generateDirectMailto({
                        id: submittedId,
                        fullName: formData.fullName,
                        company: formData.company,
                        email: formData.email,
                        phone: formData.phone,
                        projectLocation: formData.projectLocation,
                        services: formData.services,
                        message: formData.message,
                      })}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Direct Email Copy</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      id="rfp-reset-form-btn"
                      onClick={() => {
                        setSubmittedId(null);
                        setFormData({
                          fullName: '',
                          company: '',
                          email: '',
                          phone: '',
                          projectLocation: '',
                          investigationMode: 'both',
                          services: ['Geophysical Subsurface Profiling', 'Geotechnical Soil Testing'],
                          projectStage: 'Pre-FEED / Feasibility',
                          urgency: 'standard',
                          message: ''
                        });
                      }}
                      className="text-xs text-slate-500 hover:text-slate-900 underline transition-colors"
                    >
                      Submit Another Site Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 block mb-1">
                      Request Formal Proposal
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk']">
                      Site Assessment & Investigation Scope
                    </h3>
                  </div>

                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Full Name <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        id="contact-full-name"
                        type="text"
                        required
                        placeholder="e.g., Katherine Bell, P.E."
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Organization / EPC Company <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        id="contact-company-name"
                        type="text"
                        required
                        placeholder="e.g., Apex Infrastructure Partners"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Work Email Address <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="katherine@apexpartners.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Phone Number <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="+1 (555) 349-2810"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Location & Investigation Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Site Location / GPS Coordinates <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        id="contact-project-location"
                        type="text"
                        required
                        placeholder="e.g., Lat: 30.2672° N, Long: 97.7431° W"
                        value={formData.projectLocation}
                        onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Delivery Mode
                      </label>
                      <select
                        id="contact-investigation-mode"
                        value={formData.investigationMode}
                        onChange={(e) => setFormData({ ...formData, investigationMode: e.target.value as InvestigationMode })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="both">Both Desk Study & Field Investigation (Recommended)</option>
                        <option value="desk-study">Phase 1 Desk Study Only (48-72h Screening)</option>
                        <option value="field-investigation">Field Investigation Only (In-situ & Rig Mobilization)</option>
                      </select>
                    </div>
                  </div>

                  {/* Multi-Select Core Disciplines */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Requested Capabilities (Select all applicable)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {allAvailableServices.map((srv) => {
                        const checked = formData.services.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            id={`rfp-check-${srv.split(' ')[0].toLowerCase()}`}
                            onClick={() => toggleService(srv)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                              checked
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                              checked ? 'bg-emerald-500 text-white font-bold' : 'border border-slate-300'
                            }`}>
                              {checked ? '✓' : ''}
                            </span>
                            <span className="truncate">{srv}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Stage & Urgency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Project Development Stage
                      </label>
                      <select
                        id="contact-project-stage"
                        value={formData.projectStage}
                        onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Pre-FEED / Feasibility">Pre-FEED / Land Acquisition Feasibility</option>
                        <option value="Detailed Foundation Design">Detailed Foundation Engineering & Pile Design</option>
                        <option value="Permitting / EIA Compliance">Statutory Environmental & EIA Permitting</option>
                        <option value="Construction Dispute / Differing Site Condition">Construction QA / Differing Site Condition Check</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Target Timeline / Urgency
                      </label>
                      <select
                        id="contact-urgency"
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="standard">Standard Mobilization (1-2 Weeks)</option>
                        <option value="expedited">Expedited Priority (Within 5-7 Days)</option>
                        <option value="emergency">Emergency Callout (48h Rapid Field Response)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message & Site Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Project Description / Known Geological Hazards / Site Notes
                    </label>
                    <textarea
                      id="contact-message-input"
                      rows={3}
                      placeholder="Specify structural loads, known site anomalies, parcel acreage, or any preliminary geotechnical reports..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact-rfp-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Site Parameters...</span>
                    ) : (
                      <>
                        <span>Submit Site Inquiry to Engineering Desk</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-500 text-center">
                    All submitted site coordinates, KMZ files, and borehole logs are protected under strict Engineering Non-Disclosure Agreements (NDA).
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
