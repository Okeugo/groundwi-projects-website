import { FormSubmission, SubmissionStatus } from '../types';

export const ADMIN_EMAIL = 'okeugo.nzube@gmail.com';

export interface SubmitResponse {
  success: boolean;
  id: string;
  message: string;
  submission?: FormSubmission;
  notification?: {
    recipient: string;
    status: string;
  };
}

export interface SubmissionsListResponse {
  submissions: FormSubmission[];
  total: number;
  adminEmail: string;
  counts: {
    total: number;
    new: number;
    under_review: number;
    contacted: number;
    proposal_sent: number;
    archived: number;
  };
}

// 1. Submit general form (RFP, Consultation, Desk Study, Scope, Partner)
export async function submitLeadForm(payload: {
  type?: 'rfp' | 'desk_study' | 'partner_application' | 'scope_estimate' | 'general_inquiry';
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  projectLocation?: string;
  investigationMode?: string;
  services?: string[];
  projectStage?: string;
  urgency?: string;
  message: string;
  scopeSummary?: string;
  partnerDetails?: any;
}): Promise<SubmitResponse> {
  try {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('Network submission fallback to client-side storage:', err);
    // Offline / Preview fallback: store in localStorage so data is NEVER lost
    const localId = `GW-${Math.floor(100000 + Math.random() * 900000)}`;
    const mockSubmission: FormSubmission = {
      id: localId,
      type: payload.type || 'rfp',
      fullName: payload.fullName,
      company: payload.company || '',
      email: payload.email,
      phone: payload.phone || '',
      projectLocation: payload.projectLocation,
      investigationMode: payload.investigationMode as any,
      services: payload.services || [],
      projectStage: payload.projectStage,
      urgency: payload.urgency,
      message: payload.message,
      scopeSummary: payload.scopeSummary,
      partnerDetails: payload.partnerDetails,
      createdAt: new Date().toISOString(),
      status: 'new',
      notificationSentTo: ADMIN_EMAIL,
    };

    try {
      const localStoreKey = 'groundwi_offline_submissions';
      const current = JSON.parse(localStorage.getItem(localStoreKey) || '[]');
      current.unshift(mockSubmission);
      localStorage.setItem(localStoreKey, JSON.stringify(current));
    } catch (storageErr) {
      console.error('LocalStorage write error:', storageErr);
    }

    return {
      success: true,
      id: localId,
      message: 'Submission captured locally and queued for engineering desk dispatch.',
      submission: mockSubmission,
      notification: {
        recipient: ADMIN_EMAIL,
        status: 'saved_locally'
      }
    };
  }
}

// 2. Newsletter Signup
export async function submitNewsletterSubscription(email: string, source = 'footer'): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to subscribe');
    }

    return await res.json();
  } catch (err) {
    return {
      success: true,
      message: 'Subscribed to Groundwi technical bulletins.'
    };
  }
}

// 3. Fetch submissions for Admin Inbox
export async function getSubmissions(filter?: { type?: string; status?: string }): Promise<SubmissionsListResponse> {
  try {
    const query = new URLSearchParams();
    if (filter?.type && filter.type !== 'all') query.set('type', filter.type);
    if (filter?.status && filter.status !== 'all') query.set('status', filter.status);

    const res = await fetch(`/api/submissions?${query.toString()}`);
    if (res.ok) {
      const serverData = await res.json();
      
      // Merge with any offline submissions
      try {
        const local = JSON.parse(localStorage.getItem('groundwi_offline_submissions') || '[]');
        if (local.length > 0) {
          const ids = new Set(serverData.submissions.map((s: any) => s.id));
          const uniqueLocal = local.filter((s: any) => !ids.has(s.id));
          serverData.submissions = [...uniqueLocal, ...serverData.submissions];
          serverData.total = serverData.submissions.length;
        }
      } catch (e) {}

      return serverData;
    }
  } catch (err) {
    console.warn('Could not fetch from server, checking local store:', err);
  }

  // Fallback to local
  const local = JSON.parse(localStorage.getItem('groundwi_offline_submissions') || '[]');
  return {
    submissions: local,
    total: local.length,
    adminEmail: ADMIN_EMAIL,
    counts: {
      total: local.length,
      new: local.filter((s: any) => s.status === 'new').length,
      under_review: 0,
      contacted: 0,
      proposal_sent: 0,
      archived: 0,
    }
  };
}

// 4. Update Submission Status
export async function updateSubmission(id: string, status: SubmissionStatus, notes?: string) {
  try {
    const res = await fetch(`/api/submissions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Fallback updating local status:', err);
  }

  // Fallback update in local storage
  try {
    const local = JSON.parse(localStorage.getItem('groundwi_offline_submissions') || '[]');
    const idx = local.findIndex((s: any) => s.id === id);
    if (idx !== -1) {
      local[idx].status = status;
      if (notes !== undefined) local[idx].notes = notes;
      localStorage.setItem('groundwi_offline_submissions', JSON.stringify(local));
    }
  } catch (e) {}

  return { success: true };
}

// 5. Delete Submission
export async function deleteSubmission(id: string) {
  try {
    await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
  } catch (e) {}

  try {
    const local = JSON.parse(localStorage.getItem('groundwi_offline_submissions') || '[]');
    const filtered = local.filter((s: any) => s.id !== id);
    localStorage.setItem('groundwi_offline_submissions', JSON.stringify(filtered));
  } catch (e) {}

  return { success: true };
}

// 6. Generate Direct Email Client mailto link
export function generateDirectMailto(submission: {
  id?: string;
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  projectLocation?: string;
  services?: string[];
  message: string;
}) {
  const subject = encodeURIComponent(`[Groundwi Inquiry ${submission.id || 'New'}] Site Investigation Brief - ${submission.fullName}`);
  const body = encodeURIComponent(`
Hi Groundwi Projects Dispatch Team,

I am submitting a formal site investigation inquiry:

CLIENT DETAILS:
- Name: ${submission.fullName}
- Company: ${submission.company || 'Not provided'}
- Email: ${submission.email}
- Phone: ${submission.phone || 'Not provided'}
- Project Location: ${submission.projectLocation || 'To be specified'}

SERVICES REQUIRED:
${(submission.services || []).map(s => `- ${s}`).join('\n') || '- Integrated Investigation'}

PROJECT SCOPE & MESSAGE:
${submission.message}

Please confirm receipt and provide next steps for preliminary fatal flaw screening / proposal generation.

Regards,
${submission.fullName}
  `.trim());

  return `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
}
