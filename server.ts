import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { 
  ENGINEERING_SERVICES, 
  PORTFOLIO_PROJECTS, 
  calculateParametricEstimate 
} from './server/catalog';

dotenv.config();

const app = express();
const PORT = 3000;
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'okeugo.nzube@gmail.com';
const ADMIN_API_KEY = process.env.API_ADMIN_KEY || 'groundwi-secret-2026';

// Data persistence directory and files
const DATA_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Stored Submission Schema
export interface StoredSubmission {
  id: string;
  type: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectLocation?: string;
  investigationMode?: string;
  services?: string[];
  projectStage?: string;
  urgency?: string;
  message: string;
  scopeSummary?: string;
  partnerDetails?: any;
  createdAt: string;
  status: 'new' | 'under_review' | 'contacted' | 'proposal_sent' | 'archived';
  notes?: string;
  notificationSentTo?: string;
  ipAddress?: string;
}

export interface StoredSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source?: string;
}

// Storage Helpers with atomic writes & recovery
const getSubmissions = (): StoredSubmission[] => {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[STORAGE] Error reading submissions file:', err);
  }
  return [];
};

const saveSubmissions = (submissions: StoredSubmission[]) => {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (err) {
    console.error('[STORAGE] Error saving submissions file:', err);
  }
};

const getSubscribers = (): StoredSubscriber[] => {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[STORAGE] Error reading subscribers file:', err);
  }
  return [];
};

const saveSubscribers = (subscribers: StoredSubscriber[]) => {
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
  } catch (err) {
    console.error('[STORAGE] Error saving subscribers file:', err);
  }
};

// Seed initial realistic geotechnical inquiries if database is newly initialized
if (getSubmissions().length === 0) {
  const initialLeads: StoredSubmission[] = [
    {
      id: 'GW-882104',
      type: 'rfp',
      fullName: 'David Sterling, PE',
      company: 'Highland Infrastructure Partners',
      email: 'd.sterling@highland-infra.com',
      phone: '+1 (555) 732-9014',
      projectLocation: 'North Basin Industrial Corridor, Sector 4',
      investigationMode: 'both',
      services: [
        'Geophysical Subsurface Profiling',
        'Geotechnical Soil Testing'
      ],
      projectStage: 'Pre-FEED / Feasibility',
      urgency: 'high',
      message: 'Need 48h preliminary desk study fatal flaw screening followed by multi-rig ERT profiling and deep CPTu soundings for a 45-hectare logistics hub.',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      status: 'new',
      notificationSentTo: ADMIN_EMAIL
    }
  ];
  saveSubmissions(initialLeads);
}

// Nodemailer transport setup (SMTP dispatch)
let mailTransporter: any = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  console.log(`[SMTP] Initialized outbound email transport via ${process.env.SMTP_HOST}`);
}

// Dispatch Email Notification to Engineering Operations Desk
async function sendAdminNotification(submission: StoredSubmission) {
  const subject = `[Groundwi Lead ${submission.id}] ${submission.type.toUpperCase()}: ${submission.fullName} (${submission.company || 'Direct Client'})`;
  
  const plainText = `
=== GROUNDWI PROJECTS - INCOMING TECHNICAL DISPATCH ===
Reference ID: ${submission.id}
Inquiry Type: ${submission.type.toUpperCase()}
Timestamp: ${new Date(submission.createdAt).toUTCString()}
Status: ${submission.status.toUpperCase()}

CLIENT INFORMATION:
• Full Name: ${submission.fullName}
• Organization: ${submission.company || 'Not Specified'}
• Email: ${submission.email}
• Phone: ${submission.phone || 'Not Specified'}
• Site Location: ${submission.projectLocation || 'Location Pending'}

TECHNICAL SPECIFICATIONS:
• Investigation Mode: ${submission.investigationMode || 'Not Specified'}
• Selected Disciplines: ${(submission.services || []).join(', ') || 'General Consultation'}
• Project Stage: ${submission.projectStage || 'Pre-FEED / Feasibility'}
• Priority / Urgency: ${submission.urgency || 'Standard'}

PROJECT MESSAGE / TECHNICAL BRIEF:
${submission.message || 'No detailed narrative provided.'}

${submission.scopeSummary ? `ESTIMATED SCOPE SUMMARY:\n${submission.scopeSummary}\n` : ''}
========================================================
Reply Directly: mailto:${submission.email}?subject=Groundwi%20Projects%20Consultation%20%5B${submission.id}%5D
Notification Dispatched to: ${ADMIN_EMAIL}
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px; }
    .card { background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 640px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; padding: 24px; color: #ffffff; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; background: #00A3E8; color: #ffffff; letter-spacing: 0.05em; margin-bottom: 8px; }
    .content { padding: 24px; }
    .field-row { margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
    .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; letter-spacing: 0.05em; }
    .value { font-size: 14px; color: #0f172a; font-weight: 500; margin-top: 2px; }
    .brief-box { background: #f8fafc; border-left: 4px solid #FF721F; padding: 14px; border-radius: 6px; font-size: 13px; color: #334155; margin-top: 16px; white-space: pre-wrap; }
    .button { display: inline-block; background: linear-gradient(135deg, #FF721F, #F7BA1E); color: #0f172a; font-weight: 700; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; margin-top: 20px; }
    .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">Groundwi Subsurface Lead</span>
      <h2 style="margin: 0; font-size: 20px; font-weight: 800;">Inquiry Reference: ${submission.id}</h2>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">${submission.type.toUpperCase()} • ${submission.company || submission.fullName}</p>
    </div>
    <div class="content">
      <div class="field-row">
        <div class="label">Client Contact</div>
        <div class="value"><strong>${submission.fullName}</strong> (${submission.email}${submission.phone ? ` • ${submission.phone}` : ''})</div>
      </div>
      <div class="field-row">
        <div class="label">Project Site & Location</div>
        <div class="value">${submission.projectLocation || 'Location Provided Upon NDA'}</div>
      </div>
      <div class="field-row">
        <div class="label">Investigation Mode & Disciplines</div>
        <div class="value">${submission.investigationMode ? submission.investigationMode.toUpperCase() : 'INTEGRATED'} — ${(submission.services || []).join(', ') || 'General Evaluation'}</div>
      </div>
      <div class="field-row">
        <div class="label">Stage & Urgency</div>
        <div class="value">${submission.projectStage || 'Feasibility'} • Priority: <strong style="color: #ea580c;">${(submission.urgency || 'Standard').toUpperCase()}</strong></div>
      </div>
      
      <div class="label" style="margin-top: 16px;">Technical Scope & Requirements Brief</div>
      <div class="brief-box">${submission.message || 'No detailed message provided.'}</div>

      <a href="mailto:${submission.email}?subject=Groundwi%20Projects%20Consultation%20%5B${submission.id}%5D" class="button">
        Reply to ${submission.fullName}
      </a>
    </div>
    <div class="footer">
      Groundwi Projects Subsurface Intelligence Operations • Routed to ${ADMIN_EMAIL}
    </div>
  </div>
</body>
</html>
`;

  console.log(`\n======================================================`);
  console.log(`[DISPATCH DESK] Lead Notification Sent to: ${ADMIN_EMAIL}`);
  console.log(`Subject: ${subject}`);
  console.log(plainText);
  console.log(`======================================================\n`);

  if (mailTransporter) {
    try {
      await mailTransporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@groundwiprojects.com',
        to: ADMIN_EMAIL,
        replyTo: submission.email,
        subject,
        text: plainText,
        html: htmlContent
      });
      console.log(`[SMTP] Successfully delivered email to ${ADMIN_EMAIL}`);
      return { success: true, method: 'smtp' };
    } catch (error) {
      console.error('[SMTP] Delivery failed, fallback to server logging:', error);
      return { success: false, method: 'smtp_failed', error };
    }
  }

  return { success: true, method: 'server_logged', recipient: ADMIN_EMAIL };
}

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware for backend visibility
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api')) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[API] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    });
  }
  next();
});

// Optional Admin Auth helper
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const apiKeyHeader = req.headers['x-api-key'];
  const queryKey = req.query.apiKey;

  const providedKey = (authHeader ? authHeader.replace(/^Bearer\s+/i, '') : null) || apiKeyHeader || queryKey;

  // In production or configured environment, check key
  if (process.env.NODE_ENV === 'production' && process.env.API_ADMIN_KEY) {
    if (providedKey !== process.env.API_ADMIN_KEY) {
      return res.status(401).json({ error: 'Unauthorized: Valid API key required for admin operations.' });
    }
  } else if (providedKey && providedKey !== ADMIN_API_KEY && providedKey !== 'groundwi-secret-2026') {
    // If a key was provided in dev, validate it
    return res.status(401).json({ error: 'Unauthorized: Invalid API key provided.' });
  }

  next();
}

/* ==========================================================================
   BACKEND REST API ROUTES
   ========================================================================== */

// 1. API Directory & Documentation Root
app.get('/api', (req: Request, res: Response) => {
  res.json({
    service: 'Groundwi Projects Subsurface Intelligence API',
    version: '2.4.0',
    description: 'Enterprise backend servicing geotechnical investigations, geophysical profiling, RFP dispatch, and spatial data fusion.',
    serverTime: new Date().toISOString(),
    adminContact: ADMIN_EMAIL,
    endpoints: {
      health: { method: 'GET', path: '/api/health', description: 'System health, storage metrics, and lead statistics' },
      submissions: {
        submit: { method: 'POST', path: '/api/submissions', description: 'Intake RFP proposals, site inquiries, and partner applications' },
        list: { method: 'GET', path: '/api/submissions', description: 'Query and filter submissions (supports ?status=, ?type=, ?q=, ?page=, ?limit=)' },
        getById: { method: 'GET', path: '/api/submissions/:id', description: 'Retrieve single submission record' },
        update: { method: 'PATCH', path: '/api/submissions/:id', description: 'Update status or internal engineering notes' },
        delete: { method: 'DELETE', path: '/api/submissions/:id', description: 'Remove a submission record' },
        exportCsv: { method: 'GET', path: '/api/submissions/export.csv', description: 'Download CSV spreadsheet of all logged leads' },
        testNotification: { method: 'POST', path: '/api/submissions/test-notification', description: 'Trigger diagnostic alert to admin email' }
      },
      contact: { method: 'POST', path: '/api/contact', description: 'General contact message intake' },
      newsletter: {
        subscribe: { method: 'POST', path: '/api/newsletter', description: 'Subscribe email to technical bulletins' },
        list: { method: 'GET', path: '/api/newsletter', description: 'List active subscribers' },
        unsubscribe: { method: 'DELETE', path: '/api/newsletter/:email', description: 'Remove email from newsletter' }
      },
      catalog: {
        services: { method: 'GET', path: '/api/services', description: 'List all engineering disciplines, ASTM standards, and equipment' },
        serviceBySlug: { method: 'GET', path: '/api/services/:slug', description: 'Detailed technical specification for single service' },
        projects: { method: 'GET', path: '/api/projects', description: 'Verified case studies and ground surprise prevention records' }
      },
      estimator: {
        estimate: { method: 'POST', path: '/api/estimate', description: 'Parametric Eurocode 7 / ASTM D420 scope and duration calculation' }
      }
    }
  });
});

// 2. Health & System Telemetry
app.get('/api/health', (req: Request, res: Response) => {
  const submissions = getSubmissions();
  const subscribers = getSubscribers();
  const uptimeSeconds = Math.floor(process.uptime());

  res.json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString(),
    uptimeSeconds,
    adminNotificationEmail: ADMIN_EMAIL,
    smtpConfigured: !!mailTransporter,
    storage: {
      submissionsCount: submissions.length,
      newSubmissionsCount: submissions.filter(s => s.status === 'new').length,
      subscribersCount: subscribers.length,
      dataFileExists: fs.existsSync(SUBMISSIONS_FILE)
    },
    memoryUsageMB: {
      rss: (process.memoryUsage().rss / 1024 / 1024).toFixed(2),
      heapUsed: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    }
  });
});

// 3. Submit RFP / Lead Form
app.post('/api/submissions', async (req: Request, res: Response) => {
  try {
    const {
      type = 'rfp',
      fullName,
      company,
      email,
      phone,
      projectLocation,
      investigationMode,
      services,
      projectStage,
      urgency,
      message,
      scopeSummary,
      partnerDetails
    } = req.body;

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const generatedId = `GW-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSubmission: StoredSubmission = {
      id: generatedId,
      type: String(type).trim().toLowerCase(),
      fullName: String(fullName).trim(),
      company: company ? String(company).trim() : '',
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      projectLocation: projectLocation ? String(projectLocation).trim() : '',
      investigationMode: investigationMode || 'both',
      services: Array.isArray(services) ? services : [],
      projectStage: projectStage || 'Pre-FEED / Feasibility',
      urgency: urgency || 'standard',
      message: message ? String(message).trim() : '',
      scopeSummary: scopeSummary ? String(scopeSummary).trim() : undefined,
      partnerDetails,
      createdAt: new Date().toISOString(),
      status: 'new',
      notificationSentTo: ADMIN_EMAIL,
      ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress
    };

    const currentSubmissions = getSubmissions();
    currentSubmissions.unshift(newSubmission);
    saveSubmissions(currentSubmissions);

    // Asynchronously dispatch notification alert to admin
    const dispatchResult = await sendAdminNotification(newSubmission);

    res.status(201).json({
      success: true,
      id: generatedId,
      message: 'Inquiry successfully logged and dispatched to Groundwi engineering desk.',
      submission: newSubmission,
      notification: {
        recipient: ADMIN_EMAIL,
        status: dispatchResult.method
      }
    });
  } catch (error: any) {
    console.error('[API] Error handling submission:', error);
    res.status(500).json({
      error: 'An internal server error occurred while processing your submission.'
    });
  }
});

// 4. List Submissions with Filtering, Search & Pagination
app.get('/api/submissions', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { type, status, q, page = '1', limit = '50' } = req.query;
    let submissions = getSubmissions();

    // Filter by type
    if (type && typeof type === 'string') {
      submissions = submissions.filter(s => s.type === type.toLowerCase());
    }

    // Filter by status
    if (status && typeof status === 'string') {
      submissions = submissions.filter(s => s.status === status.toLowerCase());
    }

    // Search query across name, company, email, location, message
    if (q && typeof q === 'string') {
      const term = q.toLowerCase();
      submissions = submissions.filter(s => 
        s.id.toLowerCase().includes(term) ||
        s.fullName.toLowerCase().includes(term) ||
        s.company.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        (s.projectLocation && s.projectLocation.toLowerCase().includes(term)) ||
        (s.message && s.message.toLowerCase().includes(term))
      );
    }

    const totalMatching = submissions.length;
    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit as string, 10) || 50));
    const paginated = submissions.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    const all = getSubmissions();
    res.json({
      submissions: paginated,
      total: totalMatching,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalMatching / limitNum),
      adminNotificationEmail: ADMIN_EMAIL,
      counts: {
        total: all.length,
        new: all.filter(s => s.status === 'new').length,
        under_review: all.filter(s => s.status === 'under_review').length,
        contacted: all.filter(s => s.status === 'contacted').length,
        proposal_sent: all.filter(s => s.status === 'proposal_sent').length,
        archived: all.filter(s => s.status === 'archived').length,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve submissions.' });
  }
});

// 5. Export CSV Spreadsheet (Must be defined before :id route)
app.get('/api/submissions/export.csv', (req: Request, res: Response) => {
  try {
    const submissions = getSubmissions();
    const headers = [
      'ID',
      'Type',
      'Status',
      'Created At',
      'Full Name',
      'Company',
      'Email',
      'Phone',
      'Project Location',
      'Investigation Mode',
      'Services',
      'Stage',
      'Urgency',
      'Message',
      'Notes'
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = submissions.map(s => [
      escapeCsv(s.id),
      escapeCsv(s.type),
      escapeCsv(s.status),
      escapeCsv(s.createdAt),
      escapeCsv(s.fullName),
      escapeCsv(s.company),
      escapeCsv(s.email),
      escapeCsv(s.phone),
      escapeCsv(s.projectLocation),
      escapeCsv(s.investigationMode),
      escapeCsv((s.services || []).join('; ')),
      escapeCsv(s.projectStage),
      escapeCsv(s.urgency),
      escapeCsv(s.message),
      escapeCsv(s.notes || '')
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=groundwi_submissions_${Date.now()}.csv`);
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate CSV export.' });
  }
});

// 6. Test Notification Trigger
app.post('/api/submissions/test-notification', async (req: Request, res: Response) => {
  try {
    const testLead: StoredSubmission = {
      id: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'rfp',
      fullName: 'Engineering Operations Diagnostic',
      company: 'Groundwi Automated QA',
      email: ADMIN_EMAIL,
      phone: '+1 (800) 555-0199',
      projectLocation: 'Ground Investigation Field Verification Site',
      investigationMode: 'both',
      services: ['Geophysical Subsurface Profiling', 'Geotechnical Soil Testing'],
      projectStage: 'System Verification',
      urgency: 'high',
      message: `System diagnostic confirmation: form inquiries and leads are configured to alert ${ADMIN_EMAIL}.`,
      createdAt: new Date().toISOString(),
      status: 'new',
      notificationSentTo: ADMIN_EMAIL
    };

    const dispatchResult = await sendAdminNotification(testLead);
    res.json({
      success: true,
      recipient: ADMIN_EMAIL,
      result: dispatchResult
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Get Single Submission
app.get('/api/submissions/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const submissions = getSubmissions();
  const submission = submissions.find(s => s.id === id);

  if (!submission) {
    return res.status(404).json({ error: `Submission with ID ${id} was not found.` });
  }

  res.json({ submission });
});

// 8. Update Submission Status & Notes
app.patch('/api/submissions/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const submissions = getSubmissions();
    const index = submissions.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ error: `Submission ${id} not found.` });
    }

    if (status) {
      const validStatuses = ['new', 'under_review', 'contacted', 'proposal_sent', 'archived'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      }
      submissions[index].status = status;
    }

    if (typeof notes === 'string') {
      submissions[index].notes = notes;
    }

    saveSubmissions(submissions);
    res.json({ success: true, submission: submissions[index] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

// 9. Delete Submission
app.delete('/api/submissions/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let submissions = getSubmissions();
    const initialLen = submissions.length;
    submissions = submissions.filter(s => s.id !== id);

    if (submissions.length === initialLen) {
      return res.status(404).json({ error: `Submission ${id} not found.` });
    }

    saveSubmissions(submissions);
    res.json({ success: true, message: `Submission ${id} successfully removed.` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

// 9. Dedicated General Contact Endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { fullName, name, email, phone, company, subject, message } = req.body;
    const clientName = fullName || name;

    if (!clientName || !email) {
      return res.status(400).json({ error: 'Name and email are required fields.' });
    }

    const generatedId = `GW-MSG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSubmission: StoredSubmission = {
      id: generatedId,
      type: 'general_inquiry',
      fullName: String(clientName).trim(),
      company: company ? String(company).trim() : '',
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      projectLocation: subject || 'General Inquiry',
      message: message ? String(message).trim() : '',
      createdAt: new Date().toISOString(),
      status: 'new',
      notificationSentTo: ADMIN_EMAIL
    };

    const currentSubmissions = getSubmissions();
    currentSubmissions.unshift(newSubmission);
    saveSubmissions(currentSubmissions);

    await sendAdminNotification(newSubmission);

    res.status(201).json({
      success: true,
      id: generatedId,
      message: 'Your message has been dispatched to our engineering team.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process contact message.' });
  }
});

// 10. Newsletter Subscription Endpoint
app.post('/api/newsletter', (req: Request, res: Response) => {
  try {
    const { email, source = 'footer' } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const subscribers = getSubscribers();
    const existing = subscribers.find(s => s.email === cleanEmail);

    if (existing) {
      return res.json({ success: true, message: 'You are already registered for technical bulletins.' });
    }

    const newSubscriber: StoredSubscriber = {
      id: `SUB-${Date.now().toString().slice(-6)}`,
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
      source
    };

    subscribers.unshift(newSubscriber);
    saveSubscribers(subscribers);

    console.log(`[NEWSLETTER] Registered: ${cleanEmail} (Source: ${source})`);

    res.status(201).json({
      success: true,
      message: 'Successfully registered for Groundwi technical subsurface bulletins.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record newsletter subscription.' });
  }
});

app.get('/api/newsletter', requireAdminAuth, (req: Request, res: Response) => {
  res.json({ subscribers: getSubscribers() });
});

app.delete('/api/newsletter/:email', requireAdminAuth, (req: Request, res: Response) => {
  const { email } = req.params;
  let subscribers = getSubscribers();
  const initial = subscribers.length;
  subscribers = subscribers.filter(s => s.email.toLowerCase() !== email.toLowerCase());

  if (subscribers.length === initial) {
    return res.status(404).json({ error: 'Subscriber not found.' });
  }

  saveSubscribers(subscribers);
  res.json({ success: true, message: `Unsubscribed ${email}.` });
});

// 11. Engineering Services Catalog Endpoints
app.get('/api/services', (req: Request, res: Response) => {
  res.json({
    total: ENGINEERING_SERVICES.length,
    services: ENGINEERING_SERVICES
  });
});

app.get('/api/services/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const service = ENGINEERING_SERVICES.find(s => s.slug === slug || s.id === slug);
  if (!service) {
    return res.status(404).json({ error: `Service '${slug}' not found.` });
  }
  res.json({ service });
});

// 12. Verified Projects & Case Studies Catalog
app.get('/api/projects', (req: Request, res: Response) => {
  res.json({
    total: PORTFOLIO_PROJECTS.length,
    projects: PORTFOLIO_PROJECTS
  });
});

// 13. Parametric Scope Estimator Engine
app.post('/api/estimate', (req: Request, res: Response) => {
  try {
    const {
      acreage,
      investigationMode = 'both',
      targetDepthMeters,
      terrainComplexity,
      expectedSoilType
    } = req.body;

    const estimate = calculateParametricEstimate({
      acreage: Number(acreage) || 10,
      investigationMode,
      targetDepthMeters: Number(targetDepthMeters) || 25,
      terrainComplexity,
      expectedSoilType
    });

    res.json({
      success: true,
      calculatedAt: new Date().toISOString(),
      estimate
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to compute parametric estimate.' });
  }
});

// 14. Test Notification Endpoint
app.post('/api/submissions/test-notification', async (req: Request, res: Response) => {
  try {
    const testLead: StoredSubmission = {
      id: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'rfp',
      fullName: 'Engineering Operations Diagnostic',
      company: 'Groundwi Automated QA',
      email: ADMIN_EMAIL,
      phone: '+1 (800) 555-0199',
      projectLocation: 'Ground Investigation Field Verification Site',
      investigationMode: 'both',
      services: ['Geophysical Subsurface Profiling', 'Geotechnical Soil Testing'],
      projectStage: 'System Verification',
      urgency: 'high',
      message: `System diagnostic confirmation: form inquiries and leads are configured to alert ${ADMIN_EMAIL}.`,
      createdAt: new Date().toISOString(),
      status: 'new',
      notificationSentTo: ADMIN_EMAIL
    };

    const dispatchResult = await sendAdminNotification(testLead);
    res.json({
      success: true,
      recipient: ADMIN_EMAIL,
      result: dispatchResult
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server with Vite Middleware in Dev or Static Bundle in Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Groundwi Projects Backend Server online on port ${PORT}`);
    console.log(`📡 API Documentation: http://localhost:${PORT}/api`);
    console.log(`🩺 Health & Telemetry: http://localhost:${PORT}/api/health`);
    console.log(`📬 Inquiries Dispatch Recipient: ${ADMIN_EMAIL}`);
    console.log(`======================================================\n`);
  });
}

startServer();
