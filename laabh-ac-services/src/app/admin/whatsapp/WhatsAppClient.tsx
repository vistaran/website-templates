'use client';

import { useState } from 'react';
import {
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Eye,
  X,
  ShieldAlert,
} from 'lucide-react';

interface NotificationLog {
  id: number;
  bookingId?: number | null;
  recipientPhone: string;
  recipientType: string;
  channel: string;
  templateName?: string | null;
  messageContent: string;
  status: string;
  whatsappMessageId?: string | null;
  errorMessage?: string | null;
  sentAt?: string | null;
  createdAt: string;
  booking?: {
    bookingRef: string;
    customer: { name: string };
  } | null;
}

export default function WhatsAppClient({
  initialLogs,
  mockMode,
}: {
  initialLogs: NotificationLog[];
  mockMode: boolean;
}) {
  const [logs, setLogs] = useState<NotificationLog[]>(initialLogs);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedMessage, setSelectedMessage] = useState<NotificationLog | null>(null);

  // Test message form
  const [testPhone, setTestPhone] = useState(
    process.env.NEXT_PUBLIC_VENDOR_PHONE || '918141434327'
  );
  const [testMessage, setTestMessage] = useState(
    'Labh AC Services: WhatsApp Cloud API connectivity verification test message.'
  );
  const [sendingTest, setSendingTest] = useState(false);
  const [testFeedback, setTestFeedback] = useState('');

  // Reminder trigger
  const [runningReminders, setRunningReminders] = useState(false);
  const [reminderFeedback, setReminderFeedback] = useState('');

  const filtered = logs.filter((log) => {
    if (statusFilter === 'ALL') return true;
    return log.status === statusFilter;
  });

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingTest(true);
    setTestFeedback('');

    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientPhone: testPhone,
          message: testMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setTestFeedback(
        `Dispatched successfully! Status: ${data.result.mock ? 'MOCK_SENT (Simulated)' : 'LIVE SENT (Meta Cloud API)'}. ID: ${data.result.messageId}`
      );

      // Refresh logs
      const refreshRes = await fetch('/api/notifications');
      const refreshData = await refreshRes.json();
      if (refreshRes.ok) setLogs(refreshData.notifications);
    } catch (err: any) {
      setTestFeedback(`Error: ${err.message}`);
    } finally {
      setSendingTest(false);
    }
  };

  const handleTriggerReminders = async () => {
    setRunningReminders(true);
    setReminderFeedback('');

    try {
      const res = await fetch('/api/reminders/process', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setReminderFeedback(`Processed ${data.processedCount || 0} scheduled reminders successfully!`);

      // Refresh logs
      const refreshRes = await fetch('/api/notifications');
      const refreshData = await refreshRes.json();
      if (refreshRes.ok) setLogs(refreshData.notifications);
    } catch (err: any) {
      setReminderFeedback(`Error: ${err.message}`);
    } finally {
      setRunningReminders(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
          WhatsApp Cloud API Center & Dispatch Logs
        </h1>
        <p style={{ color: 'var(--color-slate-500)', fontSize: '0.925rem' }}>
          Inspect delivery logs, simulate/test WhatsApp dispatches, and trigger appointment reminders.
        </p>
      </div>

      {/* DISPATCH TESTER & REMINDER TRIGGER */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {/* Test Sender */}
        <div
          style={{
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-slate-200)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <Send size={18} color="var(--color-whatsapp-dark)" />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-navy)' }}>
              Test WhatsApp Message Dispatcher
            </h3>
          </div>

          {testFeedback && (
            <div
              style={{
                padding: '0.65rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                background: testFeedback.startsWith('Error')
                  ? 'var(--status-cancelled-bg)'
                  : 'var(--color-primary-ice)',
                color: testFeedback.startsWith('Error')
                  ? 'var(--status-cancelled-text)'
                  : 'var(--color-primary-dark)',
                fontSize: '0.85rem',
                marginBottom: '1rem',
              }}
            >
              {testFeedback}
            </div>
          )}

          <form onSubmit={handleSendTest} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-slate-600)', fontWeight: 600 }}>
                Recipient Mobile (with country code)
              </label>
              <input
                type="text"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                placeholder="e.g. 91XXXXXXXX"
                className="form-input"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-slate-600)', fontWeight: 600 }}>
                Message Content
              </label>
              <textarea
                rows={2}
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                className="form-textarea"
                required
              />
            </div>

            <button type="submit" disabled={sendingTest} className="btn btn-whatsapp btn-sm">
              <Send size={14} /> {sendingTest ? 'Dispatching...' : 'Dispatch Test Message'}
            </button>
          </form>
        </div>

        {/* Reminder Trigger & Mode Card */}
        <div
          style={{
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-slate-200)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <Clock size={18} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-navy)' }}>
                Today's Appointments Dispatcher
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-600)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Scans all active bookings scheduled for today and dispatches tailored WhatsApp alerts to both
              the Vendor and Customers.
            </p>

            {reminderFeedback && (
              <div
                style={{
                  padding: '0.65rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-ice)',
                  color: 'var(--color-primary-dark)',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                }}
              >
                {reminderFeedback}
              </div>
            )}
          </div>

          <button
            onClick={handleTriggerReminders}
            disabled={runningReminders}
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
          >
            <RefreshCw size={14} className={runningReminders ? 'animate-spin' : ''} />
            {runningReminders ? 'Dispatching...' : "Dispatch Today's Alerts (Vendor + Customer)"}
          </button>
        </div>
      </div>

      {/* LOGS FILTER & TABLE */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-slate-200)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--color-slate-200)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)' }}>
              Outbound Message Audit Log ({logs.length})
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--color-slate-500)' }}>
              Permanent record of customer & vendor notification dispatches in MySQL
            </p>
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['ALL', 'SENT', 'MOCK_SENT', 'FAILED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  background: statusFilter === st ? 'var(--color-navy)' : 'var(--color-slate-100)',
                  color: statusFilter === st ? '#ffffff' : 'var(--color-slate-600)',
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Type</th>
                <th>Template</th>
                <th>Booking Ref</th>
                <th>Status</th>
                <th>Message ID</th>
                <th>Timestamp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-slate-400)' }}>
                    No notification logs recorded yet.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <strong style={{ color: 'var(--color-navy)' }}>{log.recipientPhone}</strong>
                    </td>
                    <td>
                      <span className="badge badge-ice" style={{ fontSize: '0.75rem' }}>
                        {log.recipientType}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--color-slate-600)' }}>
                      {log.templateName || 'STANDARD_TEXT'}
                    </td>
                    <td>
                      {log.booking ? (
                        <strong style={{ fontFamily: 'var(--font-heading)' }}>
                          {log.booking.bookingRef}
                        </strong>
                      ) : (
                        <span style={{ color: 'var(--color-slate-400)' }}>—</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          log.status === 'SENT'
                            ? 'badge-success'
                            : log.status === 'MOCK_SENT'
                            ? 'badge-status-CONFIRMED'
                            : 'badge-status-CANCELLED'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', fontFamily: 'monospace' }}>
                      {log.whatsappMessageId || (log.errorMessage ? 'ERR: ' + log.errorMessage.slice(0, 20) : '—')}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedMessage(log)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.3rem 0.6rem' }}
                      >
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW MESSAGE MODAL */}
      {selectedMessage && (
        <div className="modal-backdrop" onClick={() => setSelectedMessage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-slate-200)',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-navy)' }}>
                  Notification Message Details
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                  Template: {selectedMessage.templateName} • To: {selectedMessage.recipientPhone}
                </span>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: 'var(--color-slate-100)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid var(--color-slate-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
                color: 'var(--color-slate-800)',
                marginBottom: '1.25rem',
              }}
            >
              {selectedMessage.messageContent}
            </div>

            {selectedMessage.errorMessage && (
              <div
                style={{
                  background: 'var(--status-cancelled-bg)',
                  border: '1px solid var(--status-cancelled-border)',
                  color: 'var(--status-cancelled-text)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                }}
              >
                Error Details: {selectedMessage.errorMessage}
              </div>
            )}

            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setSelectedMessage(null)} className="btn btn-secondary btn-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
