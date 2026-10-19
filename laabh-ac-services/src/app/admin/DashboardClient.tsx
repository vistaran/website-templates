'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  BellRing,
  ArrowRight,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface DashboardStats {
  totalBookings: number;
  pendingCount: number;
  confirmedCount: number;
  inProgressCount: number;
  completedCount: number;
  cancelledCount: number;
  todayCount: number;
  mockMode: boolean;
  recentBookings: any[];
}

export default function DashboardClient({ initialStats }: { initialStats: DashboardStats }) {
  const [stats, setStats] = useState(initialStats);
  const [processingReminders, setProcessingReminders] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');

  const handleProcessReminders = async () => {
    setProcessingReminders(true);
    setReminderMessage('');

    try {
      const res = await fetch('/api/reminders/process', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setReminderMessage(
          `Processed ${data.processedCount || 0} scheduled appointment reminders successfully!`
        );
      } else {
        setReminderMessage(`Reminder run notice: ${data.error || 'Failed'}`);
      }
    } catch (e: any) {
      setReminderMessage(`Error processing reminders: ${e.message}`);
    } finally {
      setProcessingReminders(false);
    }
  };

  return (
    <div>
      {/* WHATSAPP STATUS BANNER */}
      <div
        style={{
          background: stats.mockMode ? '#eff6ff' : '#f0fdf4',
          border: `1px solid ${stats.mockMode ? '#bfdbfe' : '#bbf7d0'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              background: stats.mockMode ? 'var(--color-primary)' : 'var(--color-whatsapp)',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BellRing size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--color-navy)', fontWeight: 700 }}>
              WhatsApp Notification Engine:{' '}
              {stats.mockMode ? 'Development Mock Mode Active' : 'Meta Cloud API Live'}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
              {stats.mockMode
                ? 'Outbound notifications are simulated and logged to the MySQL Notification table.'
                : 'Directly communicating with Meta WhatsApp Business Cloud API.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleProcessReminders}
            disabled={processingReminders}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={14} className={processingReminders ? 'animate-spin' : ''} />
            {processingReminders ? 'Processing...' : 'Run Scheduled Reminders'}
          </button>
          <Link href="/admin/settings" className="btn btn-primary btn-sm">
            Configure Keys
          </Link>
        </div>
      </div>

      {reminderMessage && (
        <div
          style={{
            background: 'var(--color-primary-ice)',
            border: '1px solid var(--color-primary-light)',
            color: 'var(--color-primary-dark)',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
          }}
        >
          {reminderMessage}
        </div>
      )}

      {/* KPI METRICS GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-slate-200)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--color-slate-500)', fontWeight: 600 }}>
              TOTAL BOOKINGS
            </span>
            <CalendarCheck size={18} color="var(--color-primary)" />
          </div>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--color-navy)', fontWeight: 800 }}>
            {stats.totalBookings}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
            All-time recorded in MySQL
          </span>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--status-pending-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--status-pending-text)', fontWeight: 600 }}>
              PENDING ACTION
            </span>
            <Clock size={18} color="var(--status-pending-text)" />
          </div>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--status-pending-text)', fontWeight: 800 }}>
            {stats.pendingCount}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
            Requires confirmation & tech
          </span>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--status-in_progress-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--status-in_progress-text)', fontWeight: 600 }}>
              IN PROGRESS
            </span>
            <UserCheck size={18} color="var(--status-in_progress-text)" />
          </div>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--status-in_progress-text)', fontWeight: 800 }}>
            {stats.inProgressCount}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
            Technicians currently on site
          </span>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--status-completed-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--status-completed-text)', fontWeight: 600 }}>
              COMPLETED
            </span>
            <CheckCircle size={18} color="var(--status-completed-text)" />
          </div>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--status-completed-text)', fontWeight: 800 }}>
            {stats.completedCount}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
            Successfully serviced & verified
          </span>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-slate-200)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--color-slate-500)', fontWeight: 600 }}>
              TODAY’S SCHEDULE
            </span>
            <Clock size={18} color="var(--color-primary)" />
          </div>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--color-navy)', fontWeight: 800 }}>
            {stats.todayCount}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
            Scheduled for today
          </span>
        </div>
      </div>

      {/* RECENT BOOKINGS TABLE */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-slate-200)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--color-slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)' }}>Recent Service Requests</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--color-slate-500)' }}>
              Real-time feed of submitted bookings
            </p>
          </div>

          <Link href="/admin/bookings" className="btn btn-secondary btn-sm">
            View All Bookings <ArrowRight size={14} />
          </Link>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Appointment Date</th>
                <th>Status</th>
                <th>Technician</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-slate-400)' }}>
                    No bookings recorded yet. New bookings submitted via public form will appear here.
                  </td>
                </tr>
              ) : (
                stats.recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <strong style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-navy)' }}>
                        {b.bookingRef}
                      </strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.customer?.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>{b.customer?.phone}</div>
                    </td>
                    <td>
                      <div>{b.service?.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
                        {b.unitCount} unit(s) • {b.acType}
                      </div>
                    </td>
                    <td>
                      <div>{new Date(b.preferredDate).toLocaleDateString()}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>{b.preferredTimeSlot}</div>
                    </td>
                    <td>
                      <span className={`badge badge-status-${b.status}`}>{b.status}</span>
                    </td>
                    <td>
                      {b.technician ? (
                        <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{b.technician.name}</span>
                      ) : (
                        <span style={{ color: 'var(--color-slate-400)', fontStyle: 'italic' }}>Unassigned</span>
                      )}
                    </td>
                    <td>
                      <Link href={`/admin/bookings?id=${b.id}`} className="btn btn-primary btn-sm">
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
