'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getWhatsAppVendorUrl } from '@/lib/config';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle,
  Copy,
  MessageSquare,
  AlertCircle,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface ServiceOption {
  id: number;
  slug: string;
  name: string;
  startingPrice: string | number | null;
  estimatedDuration: string | null;
}

interface BookingFormClientProps {
  services: ServiceOption[];
}

const TIME_SLOTS = [
  '09:00 AM - 12:00 PM (Morning)',
  '12:00 PM - 03:00 PM (Afternoon)',
  '03:00 PM - 06:00 PM (Late Afternoon)',
  '06:00 PM - 08:30 PM (Evening Slot)',
];

const AC_TYPES = ['Split AC', 'Window AC', 'Cassette AC', 'Tower AC', 'Central HVAC', 'Not Sure / Other'];

export default function BookingFormClient({ services }: BookingFormClientProps) {
  const searchParams = useSearchParams();
  const preselectedSlug = searchParams.get('service');

  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    email: '',
    serviceId: '',
    acType: 'Split AC',
    unitCount: 1,
    serviceAddress: '',
    landmark: '',
    pincode: '',
    preferredDate: '',
    preferredTimeSlot: TIME_SLOTS[0],
    problemDescription: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<{
    bookingRef: string;
    bookingId: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Set default appointment date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const defaultDate = `${yyyy}-${mm}-${dd}`;

    setFormData((prev) => ({
      ...prev,
      preferredDate: defaultDate,
    }));
  }, []);

  // Prepopulate service from URL param
  useEffect(() => {
    if (preselectedSlug && services.length > 0) {
      const match = services.find((s) => s.slug === preselectedSlug);
      if (match) {
        setFormData((prev) => ({ ...prev, serviceId: String(match.id) }));
      }
    } else if (services.length > 0 && !formData.serviceId) {
      setFormData((prev) => ({ ...prev, serviceId: String(services[0].id) }));
    }
  }, [preselectedSlug, services]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit booking');
      }

      setBookingSuccess({
        bookingRef: data.bookingRef,
        bookingId: data.bookingId,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const copyReference = () => {
    if (!bookingSuccess) return;
    navigator.clipboard.writeText(bookingSuccess.bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SUCCESS STATE VIEW
  if (bookingSuccess) {
    const selectedServiceObj = services.find((s) => String(s.id) === formData.serviceId);

    return (
      <div
        className="animate-fade-in"
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2rem',
          maxWidth: '680px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--color-slate-200)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: 'var(--color-primary-ice)',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'var(--color-primary)',
          }}
        >
          <CheckCircle size={40} />
        </div>

        <span className="badge badge-status-PENDING" style={{ marginBottom: '1rem' }}>
          Booking Status: Pending Review
        </span>

        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--color-navy)' }}>
          Booking Received Successfully!
        </h2>

        <p style={{ color: 'var(--color-slate-600)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          Thank you, <strong>{formData.customerName}</strong>. Your air conditioning service request has been
          registered. A confirmation dispatch has been sent via WhatsApp.
        </p>

        {/* Reference Highlight Box */}
        <div
          style={{
            background: 'var(--color-slate-50)',
            border: '2px dashed var(--color-primary-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-500)', textTransform: 'uppercase' }}>
            Your Unique Booking Reference
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-navy)',
                letterSpacing: '0.05em',
              }}
            >
              {bookingSuccess.bookingRef}
            </span>
            <button
              onClick={copyReference}
              className="btn btn-secondary btn-sm"
              title="Copy Reference"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Copy size={14} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Summary Info */}
        <div
          style={{
            textAlign: 'left',
            background: 'var(--color-slate-50)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            fontSize: '0.9rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-slate-500)' }}>Service:</span>
            <strong>{selectedServiceObj?.name || 'AC Service'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-slate-500)' }}>Units:</span>
            <strong>
              {formData.unitCount} ({formData.acType})
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-slate-500)' }}>Appointment:</span>
            <strong>
              {new Date(formData.preferredDate).toLocaleDateString()} | {formData.preferredTimeSlot}
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-slate-500)' }}>Location:</span>
            <span style={{ textAlign: 'right', maxWidth: '300px' }}>{formData.serviceAddress}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href={`/track?ref=${bookingSuccess.bookingRef}&phone=${formData.mobileNumber}`}
            className="btn btn-primary"
          >
            Track Booking Status <ArrowRight size={16} />
          </Link>

          <a
            href={getWhatsAppVendorUrl(`Hi Labh AC Services, I have submitted booking ${bookingSuccess.bookingRef}. Please confirm.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageSquare size={16} /> Open WhatsApp Chat
          </a>

          <Link href="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // BOOKING FORM VIEW
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--color-slate-200)',
      }}
    >
      {errorMessage && (
        <div
          style={{
            background: 'var(--status-cancelled-bg)',
            border: '1px solid var(--status-cancelled-border)',
            color: 'var(--status-cancelled-text)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontSize: '0.925rem',
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: SERVICE & UNIT SELECTION */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3
          style={{
            fontSize: '1.25rem',
            marginBottom: '1.25rem',
            color: 'var(--color-navy)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              background: 'var(--color-primary-ice)',
              color: 'var(--color-primary)',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            1
          </span>
          Select AC Service & Appliance
        </h3>

        <div className="form-group">
          <label className="form-label">Service Type *</label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            className="form-select"
            required
            style={{ fontSize: '1rem', fontWeight: 600 }}
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} {s.startingPrice ? `(Starts ₹${Number(s.startingPrice)})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">AC Type</label>
            <select name="acType" value={formData.acType} onChange={handleChange} className="form-select">
              {AC_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Number of AC Units</label>
            <input
              type="number"
              name="unitCount"
              min="1"
              max="25"
              value={formData.unitCount}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
      </div>

      {/* STEP 2: APPOINTMENT SCHEDULE */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3
          style={{
            fontSize: '1.25rem',
            marginBottom: '1.25rem',
            color: 'var(--color-navy)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              background: 'var(--color-primary-ice)',
              color: 'var(--color-primary)',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            2
          </span>
          Preferred Schedule
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">
              <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Preferred Date *
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Preferred Time Slot *
            </label>
            <select
              name="preferredTimeSlot"
              value={formData.preferredTimeSlot}
              onChange={handleChange}
              className="form-select"
              required
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* STEP 3: CUSTOMER & LOCATION DETAILS */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3
          style={{
            fontSize: '1.25rem',
            marginBottom: '1.25rem',
            color: 'var(--color-navy)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              background: 'var(--color-primary-ice)',
              color: 'var(--color-primary)',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            3
          </span>
          Customer & Address Details
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">
              <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Customer Full Name *
            </label>
            <input
              type="text"
              name="customerName"
              placeholder="e.g. Ramesh Shah"
              value={formData.customerName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Phone size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Mobile Number (WhatsApp) *
            </label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="10-digit mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Email Address (Optional)
          </label>
          <input
            type="email"
            name="email"
            placeholder="e.g. ramesh@example.com"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Complete Service Address *
          </label>
          <textarea
            name="serviceAddress"
            placeholder="Flat/House No, Building/Society Name, Street, Area..."
            rows={2}
            value={formData.serviceAddress}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Nearby Landmark (Optional)</label>
            <input
              type="text"
              name="landmark"
              placeholder="e.g. Near Iscon Temple"
              value={formData.landmark}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pincode (Optional)</label>
            <input
              type="text"
              name="pincode"
              placeholder="e.g. 380054"
              value={formData.pincode}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Problem Description / Special Instructions</label>
          <textarea
            name="problemDescription"
            placeholder="e.g. AC not blowing cold air, making strange vibrating noise, or water leaking from indoor unit..."
            rows={2}
            value={formData.problemDescription}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary"
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1.05rem',
          boxShadow: '0 6px 20px rgba(2, 132, 199, 0.4)',
        }}
      >
        {submitting ? 'Submitting Booking Request...' : 'Confirm & Request Service'}
      </button>

      <p
        style={{
          textAlign: 'center',
          color: 'var(--color-slate-400)',
          fontSize: '0.8rem',
          marginTop: '1rem',
        }}
      >
        🔒 No advance payment needed. Pay after verified doorstep service.
      </p>
    </form>
  );
}
