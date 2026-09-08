export type InvestigationMode = 'desk-study' | 'field-investigation' | 'both' | 'water-boreholes';

export interface ServiceOffering {
  id: string;
  title: string;
  shortTag: string;
  tagline: string;
  description: string;
  modes: InvestigationMode[];
  keyCapabilities: string[];
  equipmentAndMethods: string[];
  applicableStandards: string[];
  deliverables: string[];
  icon: string;
  riskMitigated: string;
  imageUrl?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  clientSector: 'Infrastructure' | 'Energy & Renewables' | 'Commercial & Industrial' | 'Mining & Resources' | 'Environmental & Water';
  location: string;
  dateCompleted: string;
  scopeMode: InvestigationMode;
  servicesApplied: string[];
  challenge: string;
  integratedSolution: string;
  defensibleOutcomes: string[];
  roiMetric: string;
  imageUrl: string;
  layersUsed: string[];
  technicalData: {
    boreholesOrSoundings?: number;
    profileLineKm?: number;
    depthInvestigated?: string;
    areaCovered?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: 'Geophysics' | 'Geotechnical' | 'EIA & Environment' | 'GIS & Digital Twins' | 'Risk Mitigation';
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  tags: string[];
  keyTakeaways: string[];
}

export interface ScopeAssessment {
  projectType: string;
  phase: InvestigationMode;
  selectedServices: string[];
  siteFootprint: string;
  terrainType: string;
  urgency: 'standard' | 'expedited' | 'emergency';
}

export interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectLocation: string;
  investigationMode: InvestigationMode;
  services: string[];
  projectStage: string;
  urgency: string;
  message: string;
}

export type SubmissionType = 'rfp' | 'desk_study' | 'partner_application' | 'scope_estimate' | 'general_inquiry';
export type SubmissionStatus = 'new' | 'under_review' | 'contacted' | 'proposal_sent' | 'archived';

export interface FormSubmission {
  id: string;
  type: SubmissionType;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectLocation?: string;
  investigationMode?: InvestigationMode;
  services?: string[];
  projectStage?: string;
  urgency?: string;
  message: string;
  scopeSummary?: string;
  partnerDetails?: {
    category?: string;
    tier?: string;
  };
  createdAt: string;
  status: SubmissionStatus;
  notes?: string;
  notificationSentTo?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source?: string;
}
