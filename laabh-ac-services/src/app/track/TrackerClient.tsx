'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getWhatsAppVendorUrl } from '@/lib/config';
import {
  Search,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Calendar,
  MapPin,
  Wrench,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

interface StatusStep {
  key: string;
  label: string;
}

const STEPS: StatusStep[] = [
  { key: 'PENDING', label: 'Requested' },
  { key: 'CONFIRMED', label: 'Confirmed' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'COMPLETED', label: 'Completed' },
];

export default function TrackerClient() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';
  const initialPhone = searchParams.get('phone') || '';

  const [ref, setRef] = useState(initialRef);
  const [phone, setPhone] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchTracking = async (searchRef: string, searchPhone: string) => {
    if (!searchRef) return;
    setLoading(true);
    setError('');

    try {
      let url = `/api/track?ref=${encodeURIComponent(searchRef)}`;
      if (searchPhone) url += `&phone=${encodeURIComponent(searchPhone)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to find booking');
      }

      setBooking(data.booking);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      fetchTracking(initialRef, initialPhone);
    }
  }, [initialRef, initialPhone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(ref, phone);
  };

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 0;
      case 'CONFIRMED':
        return 1;
      case 'IN_PROGRESS':
        return 2;
      case 'COMPLETED':
        return 3;
      case 'CANCELLED':
        return -1;
      default:
        return 0;
    }
  };

  const currentStepIdx = booking ? getStepIndex(booking.status) : 0;

  return (
    <div>
      {/* SEARCH CARD */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-slate-200)',
          marginBottom: '2.5rem',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Booking Reference Number *</label>
            <input
              type="text"
              placeholder="e.g. LABH-A1B2C"
              value={ref}
              onChange={(e) => setRef(e.target.value.toUpperCase())}
              className="form-input"
              required
              style={{ fontWeight: 700 }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Registered Mobile (Optional)</label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ height: '48px', padding: '0 1.75rem' }}
          >
            <Search size={18} />
            {loading ? 'Tracking...' : 'Track'}
          </button>
        </div>

        {error && (
          <div
            style={{
              marginTop: '1.25rem',
              padding: '0.75rem 1rem',
              background: 'var(--status-cancelled-bg)',
              color: 'var(--status-cancelled-text)',
              border: '1px solid var(--status-cancelled-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* TRACKING DETAILS RESULT */}
      {booking && (
        <div
          className="animate-fade-in"
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--color-slate-200)',
          }}
        >
          {/* Header Summary */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '1.75rem',
              borderBottom: '1px solid var(--color-slate-200)',
              marginBottom: '2rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)', textTransform: 'uppercase' }}>
                Booking Reference
              </span>
              <h2
                style={{
                  fontSize: '2rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-navy)',
                  margin: '2px 0 6px',
                }}
              >
                {booking.bookingRef}
              </h2>
              <p style={{ color: 'var(--color-slate-500)', fontSize: '0.9rem' }}>
                Customer: <strong>{booking.customerName}</strong>
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className={`badge badge-status-${booking.status}`} style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
                Status: {booking.status}
              </span>
              <p style={{ color: 'var(--color-slate-400)', fontSize: '0.8rem', marginTop: '6px' }}>
                Placed on: {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Stepper (if not cancelled) */}
          {booking.status !== 'CANCELLED' ? (
            <div style={{ margin: '2rem 0 3rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                {/* Connecting bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '40px',
                    right: '40px',
                    height: '4px',
                    background: 'var(--color-slate-200)',
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '40px',
                    width: `${Math.min(100, Math.max(0, (currentStepIdx / 3) * 100))}%`,
                    height: '4px',
                    background: 'var(--color-primary)',
                    zIndex: 2,
                    transition: 'width 0.4s ease',
                  }}
                />

                {STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div
                      key={step.key}
                      style={{
                        position: 'relative',
                        zIndex: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: isDone ? 'var(--color-primary)' : '#ffffff',
                          color: isDone ? '#ffffff' : 'var(--color-slate-400)',
                          border: `3px solid ${isDone ? 'var(--color-primary)' : 'var(--color-slate-200)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          boxShadow: isCurrent ? '0 0 15px rgba(2, 132, 199, 0.4)' : 'none',
                        }}
                      >
                        {isDone ? <CheckCircle2 size={20} /> : idx + 1}
                      </div>
                      <span
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: isCurrent ? 700 : 500,
                          color: isCurrent ? 'var(--color-navy)' : 'var(--color-slate-500)',
                        }}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              style={{
                background: 'var(--status-cancelled-bg)',
                border: '1px solid var(--status-cancelled-border)',
                color: 'var(--status-cancelled-text)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <AlertCircle size={22} />
              <div>
                <strong>This booking was cancelled.</strong>
                <p style={{ fontSize: '0.875rem', marginTop: '2px' }}>
                  Please contact our customer support desk if you believe this was an error.
                </p>
              </div>
            </div>
          )}

          {/* Appointment Information Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              background: 'var(--color-slate-50)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', textTransform: 'uppercase' }}>
                Service Booked
              </span>
              <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '1.05rem', marginTop: '2px' }}>
                {booking.serviceName}
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-500)' }}>
                {booking.unitCount} unit(s) • {booking.acType}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', textTransform: 'uppercase' }}>
                Appointment Time
              </span>
              <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '1.05rem', marginTop: '2px' }}>
                {new Date(booking.preferredDate).toLocaleDateString()}
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-500)' }}>
                {booking.preferredTimeSlot}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', textTransform: 'uppercase' }}>
                Assigned Technician
              </span>
              <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '1.05rem', marginTop: '2px' }}>
                {booking.technician ? booking.technician.name : 'Assigning Soon'}
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-500)' }}>
                {booking.technician ? booking.technician.phone : 'Will contact 30 mins prior'}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', textTransform: 'uppercase' }}>
                Service Location
              </span>
              <p style={{ color: 'var(--color-slate-700)', fontSize: '0.875rem', marginTop: '2px' }}>
                {booking.serviceAddress}
              </p>
            </div>
          </div>

          {/* Status Change Timeline */}
          {booking.statusHistory && booking.statusHistory.length > 0 && (
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-navy)', marginBottom: '1rem' }}>
                Activity & Updates
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {booking.statusHistory.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      fontSize: '0.875rem',
                      color: 'var(--color-slate-600)',
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        marginTop: '6px',
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>
                        Status set to {item.newStatus}
                      </span>
                      {item.reason && <span> — {item.reason}</span>}
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Support Actions */}
          <div
            style={{
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-slate-200)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <p style={{ fontSize: '0.875rem', color: 'var(--color-slate-500)' }}>
              Need to reschedule or speak with the manager?
            </p>

            <a
              href={getWhatsAppVendorUrl(`Hi Labh AC Services, I am inquiring about my booking ${booking.bookingRef}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
            >
              <MessageSquare size={16} /> WhatsApp Support
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
