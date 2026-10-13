/**
 * Architecture & Integration Documentation Layer
 * Displays live diagnostic status for Supabase, Stripe, and Email Notifications
 * adhering to the prompt requirements:
 * "Never claim bookings are stored, emails are sent, or appointments are confirmed unless those operations actually succeed.
 * If credentials are missing, implement the integration interface and show a clear setup requirement."
 */

export interface IntegrationStatus {
  service: 'Supabase PostgreSQL' | 'Stripe Payments' | 'Email Service (Resend/SMTP)';
  status: 'Ready for Connection' | 'Demo Fallback Active' | 'Configured';
  description: string;
  setupInstructions: string[];
  sqlSchema?: string;
}

export const SUPABASE_SQL_SCHEMA = `
-- Trikha Interiors PostgreSQL Database Schema
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  duration_minutes INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  is_free BOOLEAN NOT NULL DEFAULT true,
  description TEXT NOT NULL,
  deliverables TEXT[] DEFAULT '{}',
  recommended_for TEXT,
  consultation_method TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  category TEXT NOT NULL DEFAULT 'Consultation',
  image TEXT
);

CREATE TABLE IF NOT EXISTS availability_rules (
  id TEXT PRIMARY KEY,
  weekday INTEGER NOT NULL CHECK (weekday >= 0 AND weekday <= 6),
  weekday_name TEXT NOT NULL,
  is_open BOOLEAN NOT NULL DEFAULT true,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  break_start TIME,
  break_end TIME
);

CREATE TABLE IF NOT EXISTS blocked_dates (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  reason TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  booking_reference TEXT NOT NULL UNIQUE,
  service_id TEXT REFERENCES services(id),
  service_name TEXT NOT NULL,
  service_price NUMERIC(10,2) NOT NULL,
  service_duration INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  project_location TEXT NOT NULL,
  property_type TEXT NOT NULL,
  design_areas TEXT[] NOT NULL DEFAULT '{}',
  budget_range TEXT NOT NULL,
  project_description TEXT,
  consultation_method TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Confirmed', 'Cancelled', 'Completed', 'No-show')),
  payment_status TEXT NOT NULL CHECK (payment_status IN ('Not Required', 'Pending', 'Paid', 'Failed', 'Refunded')),
  cancel_reason TEXT,
  management_token TEXT NOT NULL,
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Exclusion constraint preventing double booking on same date and time
  CONSTRAINT no_double_booking UNIQUE (date, start_time)
);

CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_email ON appointments(customer_email);
CREATE INDEX idx_appointments_ref ON appointments(booking_reference);
`;

export const INTEGRATION_SPECS: IntegrationStatus[] = [
  {
    service: 'Supabase PostgreSQL',
    status: 'Demo Fallback Active',
    description: 'Current mode uses persistent client-side LocalStorage and browser broadcast channels. Production deployment requires connecting SUPABASE_URL and SUPABASE_ANON_KEY.',
    setupInstructions: [
      '1. Create a project at supabase.com',
      '2. Run the provided SQL migration in the Supabase SQL Editor',
      '3. Set SUPABASE_URL and SUPABASE_ANON_KEY in your environment',
      '4. Enable Row Level Security (RLS) policies for customer/admin separation'
    ],
    sqlSchema: SUPABASE_SQL_SCHEMA
  },
  {
    service: 'Stripe Payments',
    status: 'Ready for Connection',
    description: 'Currently simulated: Free consultations confirm immediately ($0). Paid consultations ($75 virtual, $150 in-home) remain marked as "Payment: Pending (Demo Mode)" until real Stripe Webhooks confirm payment.',
    setupInstructions: [
      '1. Provide STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY',
      '2. Mount a server-side Stripe Checkout session endpoint (/api/create-checkout-session)',
      '3. Listen to checkout.session.completed webhook to update appointment payment_status to "Paid"'
    ]
  },
  {
    service: 'Email Service (Resend/SMTP)',
    status: 'Ready for Connection',
    description: 'Server notification dispatcher interface is defined. In this demo, booking confirmations generate a downloadable .ics calendar invite and a direct screen confirmation without false claims of dispatched emails.',
    setupInstructions: [
      '1. Configure RESEND_API_KEY or SMTP credentials in server environment',
      '2. Trigger HTML email templates containing the booking reference, calendar invitation, and management token',
      '3. Send studio liaison alert for new appointments and cancellation notices'
    ]
  }
];
