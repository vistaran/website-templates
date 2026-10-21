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
  Sunrise,
  Sun,
  Sunset,
  Moon,
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
  {
    value: '09:00 AM - 12:00 PM (Morning)',
    period: 'Morning',
    time: '9:00 AM – 12:00 PM',
    icon: Sunrise,
  },
  {
    value: '12:00 PM - 03:00 PM (Afternoon)',
    period: 'Afternoon',
    time: '12:00 PM – 3:00 PM',
    icon: Sun,
  },
  {
    value: '03:00 PM - 06:00 PM (Late Afternoon)',
    period: 'Late Afternoon',
    time: '3:00 PM – 6:00 PM',
    icon: Sunset,
  },
  {
    value: '06:00 PM - 08:30 PM (Evening Slot)',
    period: 'Evening',
    time: '6:00 PM – 8:30 PM',
    icon: Moon,
  },
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
    flatNo: '',
    buildingName: '',
    areaLocality: '',
    landmark: '',
    pincode: '',
    city: 'Ahmedabad',
    serviceAddress: '',
    preferredDate: '',
    preferredTimeSlot: TIME_SLOTS[0].value,
    problemDescription: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmed, setConfirmed] = useState(false);
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

  const selectedService = services.find((s) => String(s.id) === formData.serviceId);
  const isRepairService =
    selectedService?.slug === 'ac-repair' ||
    Boolean(selectedService?.name.toLowerCase().includes('repair'));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isRepairService && !formData.problemDescription?.trim()) {
      setErrorMessage('Please describe the problem with your AC so our repair technician can bring the right diagnostic tools and spare parts.');
      return;
    }

    if (!confirmed) {
      setErrorMessage('Please check the confirmation box to confirm your details.');
      return;
    }

    setSubmitting(true);

    const combinedAddress = [
      formData.flatNo?.trim(),
      formData.buildingName?.trim(),
      formData.areaLocality?.trim(),
    ]
      .filter(Boolean)
      .join(', ');

    const payload = {
      ...formData,
      serviceAddress: combinedAddress || formData.serviceAddress,
    };

    setFormData((prev) => ({
      ...prev,
      serviceAddress: combinedAddress || prev.serviceAddress,
    }));

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
        padding: '1.75rem 2rem',
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
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: SERVICE & UNIT SELECTION */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3
          style={{
            fontSize: '1.1rem',
            marginBottom: '0.75rem',
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
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            1
          </span>
          Select AC Service & Appliance
        </h3>

        {/* SERVICE TYPE: COMPACT 4-COLUMN GRID (2 ROWS OF 4) */}
        <div className="form-group" style={{ marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
            <label className="form-label" style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem' }}>
              Select AC Service *
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', fontWeight: 500 }}>
              {services.length} options available
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))',
              gap: '0.45rem',
            }}
          >
            {services.map((s) => {
              const isSelected = formData.serviceId === String(s.id);
              return (
                <label
                  key={s.id}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected
                      ? '2px solid var(--color-primary)'
                      : '1.5px solid var(--color-slate-200)',
                    background: isSelected
                      ? 'var(--color-primary-ice)'
                      : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(2, 132, 199, 0.15)' : 'none',
                  }}
                >
                  <input
                    type="radio"
                    name="serviceId"
                    value={s.id}
                    checked={isSelected}
                    onChange={handleChange}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                    required
                  />
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      border: isSelected
                        ? '5px solid var(--color-primary)'
                        : '2px solid var(--color-slate-300)',
                      background: '#ffffff',
                      flexShrink: 0,
                      transition: 'all 0.15s ease',
                    }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontWeight: isSelected ? 700 : 600,
                        color: isSelected ? 'var(--color-navy)' : 'var(--color-slate-800)',
                        fontSize: '0.825rem',
                        lineHeight: 1.25,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={s.name}
                    >
                      {s.name}
                    </div>
                    {s.estimatedDuration && (
                      <div style={{ fontSize: '0.7rem', color: isSelected ? 'var(--color-primary)' : 'var(--color-slate-400)', lineHeight: 1.1, marginTop: '1px' }}>
                        ⏱ {s.estimatedDuration}
                      </div>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* AC APPLIANCE TYPE: COMPACT PILLS */}
        <div style={{ marginBottom: '0.85rem' }}>
          <label className="form-label" style={{ marginBottom: '0.35rem', fontWeight: 700, fontSize: '0.85rem' }}>
            AC Appliance Type
          </label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
            }}
          >
            {AC_TYPES.map((type) => {
              const isSelected = formData.acType === type;
              return (
                <label
                  key={type}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected
                      ? '1.5px solid var(--color-primary)'
                      : '1.5px solid var(--color-slate-200)',
                    background: isSelected ? 'var(--color-primary-ice)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 6px rgba(2, 132, 199, 0.12)' : 'none',
                  }}
                >
                  <input
                    type="radio"
                    name="acType"
                    value={type}
                    checked={isSelected}
                    onChange={handleChange}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  />
                  <div
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      border: isSelected
                        ? '4px solid var(--color-primary)'
                        : '1.5px solid var(--color-slate-300)',
                      background: '#ffffff',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'var(--color-navy)' : 'var(--color-slate-700)',
                      fontSize: '0.8rem',
                    }}
                  >
                    {type}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* NUMBER OF AC UNITS: INLINE */}
        <div className="form-group" style={{ marginBottom: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <label className="form-label" style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
              Number of Units:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {[1, 2, 3, 4, 5].map((num) => {
                const isSelected = Number(formData.unitCount) === num;
                return (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setFormData((prev) => ({ ...prev, unitCount: num }))}
                    style={{
                      width: '32px',
                      height: '30px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected
                        ? '1.5px solid var(--color-primary)'
                        : '1.5px solid var(--color-slate-200)',
                      background: isSelected ? 'var(--color-primary)' : '#ffffff',
                      color: isSelected ? '#ffffff' : 'var(--color-slate-700)',
                      fontWeight: 700,
                      fontSize: '0.825rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <input
                type="number"
                name="unitCount"
                min="1"
                max="25"
                value={formData.unitCount}
                onChange={handleChange}
                className="form-input"
                style={{ width: '60px', height: '30px', padding: '0.2rem 0.4rem', textAlign: 'center', fontSize: '0.825rem' }}
                required
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                {Number(formData.unitCount) === 1 ? 'Unit' : 'Units'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2: APPOINTMENT SCHEDULE */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3
          style={{
            fontSize: '1.1rem',
            marginBottom: '0.75rem',
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
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            2
          </span>
          Preferred Schedule
        </h3>

        <div className="form-group" style={{ marginBottom: '0.85rem' }}>
          <label
            htmlFor="preferredDate"
            className="form-label flex items-center"
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: '0.35rem',
              cursor: 'pointer',
            }}
          >
            <Calendar size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--color-primary)' }} />
            <span>Preferred Appointment Date *</span>
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            onClick={(e) => {
              try {
                e.currentTarget.showPicker();
              } catch {
                // Fallback for older browsers
              }
            }}
            min={new Date().toISOString().split('T')[0]}
            className="form-input"
            required
            style={{ maxWidth: '280px', height: '38px', fontSize: '0.9rem', cursor: 'pointer' }}
          />
        </div>

        {/* TIME SLOTS: COMPACT 4-COLUMN ROW */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.45rem' }}>
            <Clock size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--color-primary)' }} />
            Preferred Time Slot *
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.45rem',
            }}
          >
            {TIME_SLOTS.map((slot) => {
              const isSelected = formData.preferredTimeSlot === slot.value;
              const IconComponent = slot.icon;
              return (
                <label
                  key={slot.value}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.55rem 0.7rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected
                      ? '2px solid var(--color-primary)'
                      : '1.5px solid var(--color-slate-200)',
                    background: isSelected
                      ? 'var(--color-primary-ice)'
                      : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(2, 132, 199, 0.12)' : 'none',
                  }}
                >
                  <input
                    type="radio"
                    name="preferredTimeSlot"
                    value={slot.value}
                    checked={isSelected}
                    onChange={handleChange}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                    required
                  />
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      border: isSelected
                        ? '5px solid var(--color-primary)'
                        : '2px solid var(--color-slate-300)',
                      background: '#ffffff',
                      flexShrink: 0,
                      transition: 'all 0.15s ease',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-slate-500)',
                      }}
                    >
                      <IconComponent size={13} />
                      <span
                        style={{
                          fontSize: '0.675rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {slot.period}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.825rem',
                        fontWeight: isSelected ? 700 : 600,
                        color: isSelected ? 'var(--color-navy)' : 'var(--color-slate-800)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {slot.time}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* STEP 3: CONTACT & LOCATION DETAILS */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3
          style={{
            fontSize: '1.1rem',
            marginBottom: '0.75rem',
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
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            3
          </span>
          Contact & Service Location
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}>
              <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Full Name *
            </label>
            <input
              type="text"
              name="customerName"
              placeholder="e.g. Ramesh Shah"
              value={formData.customerName}
              onChange={handleChange}
              className="form-input"
              style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}>
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
              style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
              required
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '0.75rem' }}>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}>
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
            style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
          />
        </div>

        {/* STRUCTURED ADDRESS FIELDS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}>
              <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
              House / Flat / Shop No. & Floor *
            </label>
            <input
              type="text"
              name="flatNo"
              placeholder="e.g. Flat 402, 4th Floor"
              value={formData.flatNo}
              onChange={handleChange}
              className="form-input"
              style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Building / Society / Apartment Name *</label>
            <input
              type="text"
              name="buildingName"
              placeholder="e.g. Shivalik Shilp, Tower B"
              value={formData.buildingName}
              onChange={handleChange}
              className="form-input"
              style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Street / Area / Locality *</label>
            <input
              type="text"
              name="areaLocality"
              placeholder="e.g. Bodakdev, SG Highway"
              value={formData.areaLocality}
              onChange={handleChange}
              className="form-input"
              style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Nearby Landmark (Optional)</label>
            <input
              type="text"
              name="landmark"
              placeholder="e.g. Near Iscon Temple"
              value={formData.landmark}
              onChange={handleChange}
              className="form-input"
              style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Pincode *</label>
            <input
              type="text"
              name="pincode"
              maxLength={6}
              placeholder="e.g. 380054"
              value={formData.pincode}
              onChange={handleChange}
              className="form-input"
              style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem', background: 'var(--color-slate-50)', color: 'var(--color-slate-700)', fontWeight: 600 }}
              readOnly
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '0.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.35rem',
              flexWrap: 'wrap',
              gap: '0.35rem',
            }}
          >
            <label className="form-label" style={{ margin: 0, fontSize: '0.85rem' }}>
              {isRepairService ? (
                <>
                  Problem Description <span style={{ color: 'var(--color-primary)' }}>*</span>
                </>
              ) : (
                'Problem Description / Special Instructions (Optional)'
              )}
            </label>
            {isRepairService && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                Required for AC Repair
              </span>
            )}
          </div>
          <textarea
            name="problemDescription"
            required={isRepairService}
            placeholder={
              isRepairService
                ? 'e.g. AC not blowing cold air, making strange vibrating noise, water leaking from indoor unit, or tripping MCB...'
                : 'e.g. Gate code, floor instructions, preferred technician notes (optional)...'
            }
            rows={2}
            value={formData.problemDescription}
            onChange={handleChange}
            className="form-textarea"
            style={{
              padding: '0.6rem 0.85rem',
              fontSize: '0.9rem',
              borderColor: isRepairService && !formData.problemDescription?.trim() ? 'var(--color-slate-300)' : undefined,
            }}
          />
        </div>
      </div>

      {/* CONFIRMATION CHECKBOX */}
      <div
        style={{
          marginBottom: '1.25rem',
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: confirmed ? 'var(--color-primary-ice)' : '#ffffff',
          border: confirmed ? '2px solid var(--color-primary)' : '1.5px solid var(--color-slate-200)',
          transition: 'all 0.2s ease',
          boxShadow: confirmed ? '0 2px 10px rgba(2, 132, 199, 0.12)' : 'none',
        }}
      >
        <label
          htmlFor="confirmDetails"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            id="confirmDetails"
            name="confirmDetails"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            required
            style={{
              width: '16px',
              height: '16px',
              marginTop: '2px',
              accentColor: 'var(--color-primary)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '0.85rem',
              color: confirmed ? 'var(--color-navy)' : 'var(--color-slate-700)',
              lineHeight: 1.45,
              fontWeight: confirmed ? 600 : 500,
            }}
          >
            I confirm that the service address, contact number, and booking requirements provided above are accurate, and I agree to the{' '}
            <Link
              href="/terms"
              target="_blank"
              style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 600 }}
              onClick={(e) => e.stopPropagation()}
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              target="_blank"
              style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 600 }}
              onClick={(e) => e.stopPropagation()}
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary"
        style={{
          width: '100%',
          padding: '0.85rem',
          fontSize: '1rem',
          boxShadow: '0 4px 16px rgba(2, 132, 199, 0.35)',
        }}
      >
        {submitting ? 'Submitting Booking Request...' : 'Confirm & Request Service'}
      </button>

      <p
        style={{
          textAlign: 'center',
          color: 'var(--color-slate-400)',
          fontSize: '0.78rem',
          marginTop: '0.75rem',
        }}
      >
        🔒 No advance payment needed. Pay after verified doorstep service.
      </p>
    </form>
  );
}
