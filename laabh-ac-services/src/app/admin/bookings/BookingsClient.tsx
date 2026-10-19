'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Wrench,
  CheckCircle,
  AlertCircle,
  X,
  Send,
  MessageSquare,
  FileText,
  History,
  RotateCcw,
} from 'lucide-react';

interface BookingRecord {
  id: number;
  bookingRef: string;
  customerId: number;
  customer: {
    id: number;
    name: string;
    phone: string;
    email?: string | null;
  };
  serviceId: number;
  service: {
    id: number;
    name: string;
    slug: string;
  };
  technicianId?: number | null;
  technician?: {
    id: number;
    name: string;
    phone: string;
    skills?: string | null;
  } | null;
  acType?: string | null;
  unitCount: number;
  serviceAddress: string;
  preferredDate: string;
  preferredTimeSlot: string;
  problemDescription?: string | null;
  status: string;
  totalAmount?: number | null;
  createdAt: string;
}

interface TechnicianOption {
  id: number;
  name: string;
  phone: string;
  skills?: string | null;
  status: string;
}

interface BookingsClientProps {
  initialBookings: BookingRecord[];
  technicians: TechnicianOption[];
}

const STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

const TIME_SLOTS = [
  '09:00 AM - 12:00 PM (Morning)',
  '12:00 PM - 03:00 PM (Afternoon)',
  '03:00 PM - 06:00 PM (Late Afternoon)',
  '06:00 PM - 08:30 PM (Evening Slot)',
];

export default function BookingsClient({ initialBookings, technicians }: BookingsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightId = searchParams.get('id');

  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Modal actions state
  const [newStatus, setNewStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');
  const [selectedTechId, setSelectedTechId] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('');
  const [newNote, setNewNote] = useState('');
  const [totalAmountInput, setTotalAmountInput] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionFeedback, setActionFeedback] = useState('');

  // Fetch full details for a booking
  const openBookingDetail = async (id: number) => {
    setLoadingDetail(true);
    setActionFeedback('');
    try {
      const res = await fetch(`/api/bookings/${id}`);
      const data = await res.json();
      if (res.ok) {
        setSelectedBooking(data.booking);
        setNewStatus(data.booking.status);
        setSelectedTechId(data.booking.technicianId ? String(data.booking.technicianId) : '');
        setRescheduleDate(new Date(data.booking.preferredDate).toISOString().split('T')[0]);
        setRescheduleSlot(data.booking.preferredTimeSlot);
        setTotalAmountInput(data.booking.totalAmount ? String(data.booking.totalAmount) : '');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDetail(false);
    }
  };

  // If URL has ?id=xxx open it initially
  useEffect(() => {
    if (highlightId) {
      openBookingDetail(Number(highlightId));
    }
  }, [highlightId]);

  // Refresh current booking details
  const refreshCurrentBooking = async () => {
    if (!selectedBooking) return;
    const res = await fetch(`/api/bookings/${selectedBooking.id}`);
    const data = await res.json();
    if (res.ok) {
      setSelectedBooking(data.booking);
      // Also update in list
      setBookings((prev) =>
        prev.map((b) => (b.id === data.booking.id ? { ...b, ...data.booking } : b))
      );
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = selectedStatus === 'ALL' || b.status === selectedStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      b.bookingRef.toLowerCase().includes(q) ||
      b.customer.name.toLowerCase().includes(q) ||
      b.customer.phone.includes(q) ||
      b.service.name.toLowerCase().includes(q);

    return matchesStatus && matchesQuery;
  });

  // Action: Update Status
  const handleUpdateStatus = async () => {
    if (!selectedBooking || !newStatus) return;
    setActionLoading(true);
    setActionFeedback('');
    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          reason: statusReason || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActionFeedback(`Status updated to ${newStatus} successfully! WhatsApp alert triggered.`);
      setStatusReason('');
      await refreshCurrentBooking();
    } catch (e: any) {
      setActionFeedback(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Action: Assign Technician
  const handleAssignTechnician = async () => {
    if (!selectedBooking) return;
    setActionLoading(true);
    setActionFeedback('');
    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          technicianId: selectedTechId ? Number(selectedTechId) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActionFeedback('Technician assignment updated successfully.');
      await refreshCurrentBooking();
    } catch (e: any) {
      setActionFeedback(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Action: Reschedule
  const handleReschedule = async () => {
    if (!selectedBooking || !rescheduleDate || !rescheduleSlot) return;
    setActionLoading(true);
    setActionFeedback('');
    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferredDate: rescheduleDate,
          preferredTimeSlot: rescheduleSlot,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActionFeedback('Appointment rescheduled! Reminders refreshed & WhatsApp alert dispatched.');
      await refreshCurrentBooking();
    } catch (e: any) {
      setActionFeedback(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Action: Update Total Amount
  const handleUpdateAmount = async () => {
    if (!selectedBooking) return;
    setActionLoading(true);
    setActionFeedback('');
    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount: totalAmountInput ? Number(totalAmountInput) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActionFeedback('Total amount updated successfully.');
      await refreshCurrentBooking();
    } catch (e: any) {
      setActionFeedback(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Action: Add Internal Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !newNote.trim()) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setNewNote('');
      await refreshCurrentBooking();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      {/* HEADER & CONTROLS */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
          Booking & Dispatch Management
        </h1>
        <p style={{ color: 'var(--color-slate-500)', fontSize: '0.925rem' }}>
          Search, assign technicians, change statuses, and review WhatsApp message histories.
        </p>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          border: '1px solid var(--color-slate-200)',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* Status Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {STATUSES.map((st) => {
            const count =
              st === 'ALL'
                ? bookings.length
                : bookings.filter((b) => b.status === st).length;
            const isSelected = selectedStatus === st;

            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: isSelected ? 'var(--color-navy)' : 'var(--color-slate-100)',
                  color: isSelected ? '#ffffff' : 'var(--color-slate-600)',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{st}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                    background: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--color-slate-200)',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by Booking Ref, Customer Name, Mobile Number, or Service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search
            size={18}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate-400)' }}
          />
        </div>
      </div>

      {/* BOOKINGS TABLE */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Ref ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date & Slot</th>
              <th>Status</th>
              <th>Technician</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-slate-400)' }}>
                  No bookings matching your search/filter criteria.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <strong style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-navy)' }}>
                      {b.bookingRef}
                    </strong>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.customer.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>{b.customer.phone}</div>
                  </td>
                  <td>
                    <div>{b.service.name}</div>
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
                  <td style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => openBookingDetail(b.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DETAIL & MANAGEMENT MODAL */}
      {selectedBooking && (
        <div className="modal-backdrop" onClick={() => setSelectedBooking(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: '820px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--color-slate-200)',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--color-navy)' }}>
                    {selectedBooking.bookingRef}
                  </h2>
                  <span className={`badge badge-status-${selectedBooking.status}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <p style={{ color: 'var(--color-slate-500)', fontSize: '0.875rem', marginTop: '2px' }}>
                  {selectedBooking.service.name} • {selectedBooking.unitCount} unit(s) ({selectedBooking.acType})
                </p>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                style={{
                  background: 'var(--color-slate-100)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-slate-600)',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {actionFeedback && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: actionFeedback.startsWith('Error')
                    ? 'var(--status-cancelled-bg)'
                    : 'var(--color-primary-ice)',
                  color: actionFeedback.startsWith('Error')
                    ? 'var(--status-cancelled-text)'
                    : 'var(--color-primary-dark)',
                  marginBottom: '1.25rem',
                  fontSize: '0.9rem',
                }}
              >
                {actionFeedback}
              </div>
            )}

            {/* Customer Details Box */}
            <div
              style={{
                background: 'var(--color-slate-50)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.75rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                fontSize: '0.875rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--color-slate-400)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  Customer
                </span>
                <p style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{selectedBooking.customer.name}</p>
                <p style={{ color: 'var(--color-slate-500)' }}>{selectedBooking.customer.email || 'No email'}</p>
              </div>

              <div>
                <span style={{ color: 'var(--color-slate-400)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  Mobile & WhatsApp
                </span>
                <p style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{selectedBooking.customer.phone}</p>
                <a
                  href={`https://wa.me/${selectedBooking.customer.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(selectedBooking.customer.name)},%20regarding%20your%20Labh%20AC%20booking%20${selectedBooking.bookingRef}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-whatsapp-dark)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                >
                  <MessageSquare size={12} /> Open WhatsApp
                </a>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: 'var(--color-slate-400)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  Service Address
                </span>
                <p style={{ color: 'var(--color-slate-700)' }}>{selectedBooking.serviceAddress}</p>
                {selectedBooking.problemDescription && (
                  <p style={{ marginTop: '4px', color: '#b45309', background: '#fef3c7', padding: '4px 8px', borderRadius: '4px' }}>
                    Note: {selectedBooking.problemDescription}
                  </p>
                )}
              </div>
            </div>

            {/* CONTROLLERS GRID */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              {/* Controller 1: Status Change */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--color-slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
                  1. Update Booking Status
                </h4>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="form-select"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED (Sends Customer WhatsApp)</option>
                    <option value="IN_PROGRESS">IN_PROGRESS (Technician on Site)</option>
                    <option value="COMPLETED">COMPLETED (Finished Service)</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <input
                    type="text"
                    placeholder="Reason or audit remark (optional)"
                    value={statusReason}
                    onChange={(e) => setStatusReason(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

                <button
                  onClick={handleUpdateStatus}
                  disabled={actionLoading}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  {actionLoading ? 'Saving...' : 'Apply Status Change'}
                </button>
              </div>

              {/* Controller 2: Assign Technician */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--color-slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
                  2. Assign Technician
                </h4>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <select
                    value={selectedTechId}
                    onChange={(e) => setSelectedTechId(e.target.value)}
                    className="form-select"
                  >
                    <option value="">-- No Technician Assigned --</option>
                    {technicians.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.phone}) - {t.skills || 'General'}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAssignTechnician}
                  disabled={actionLoading}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  Save Technician Assignment
                </button>
              </div>

              {/* Controller 3: Reschedule Appointment */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--color-slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
                  3. Reschedule Appointment
                </h4>
                <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <select
                    value={rescheduleSlot}
                    onChange={(e) => setRescheduleSlot(e.target.value)}
                    className="form-select"
                  >
                    {TIME_SLOTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleReschedule}
                  disabled={actionLoading}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                >
                  Reschedule & Alert Customer
                </button>
              </div>

              {/* Controller 4: Total Amount / Billing */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--color-slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
                  4. Service Billing Amount
                </h4>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <input
                    type="number"
                    placeholder="Enter amount in ₹ (e.g. 1500)"
                    value={totalAmountInput}
                    onChange={(e) => setTotalAmountInput(e.target.value)}
                    className="form-input"
                  />
                </div>
                <button
                  onClick={handleUpdateAmount}
                  disabled={actionLoading}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                >
                  Save Billing Amount
                </button>
              </div>
            </div>

            {/* INTERNAL NOTES SECTION */}
            <div style={{ marginBottom: '2rem' }}>
              <h4
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-navy)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <FileText size={16} /> Staff Internal Notes
              </h4>

              {/* Notes List */}
              <div
                style={{
                  maxHeight: '160px',
                  overflowY: 'auto',
                  border: '1px solid var(--color-slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem',
                  background: 'var(--color-slate-50)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {selectedBooking.notes && selectedBooking.notes.length > 0 ? (
                  selectedBooking.notes.map((n: any) => (
                    <div
                      key={n.id}
                      style={{
                        background: '#ffffff',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        border: '1px solid var(--color-slate-200)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-slate-400)', fontSize: '0.75rem' }}>
                        <strong>{n.authorName}</strong>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      <p style={{ color: 'var(--color-slate-700)', marginTop: '2px' }}>{n.note}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--color-slate-400)', fontSize: '0.825rem', textAlign: 'center', margin: 'auto' }}>
                    No internal notes yet.
                  </p>
                )}
              </div>

              {/* Add Note Input */}
              <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Type an internal remark..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="form-input"
                  style={{ flexGrow: 1 }}
                />
                <button type="submit" disabled={actionLoading} className="btn btn-primary btn-sm">
                  <Send size={14} /> Add Note
                </button>
              </form>
            </div>

            {/* AUDIT STATUS HISTORY & NOTIFICATIONS TAB */}
            <div style={{ borderTop: '1px solid var(--color-slate-200)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Status History */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <History size={14} /> Status History Audit Log
                  </h4>
                  <div style={{ maxHeight: '180px', overflowY: 'auto', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedBooking.statusHistory?.map((h: any) => (
                      <div key={h.id} style={{ padding: '0.4rem', borderLeft: '2px solid var(--color-primary)', background: '#fff' }}>
                        <div style={{ fontWeight: 600 }}>
                          {h.oldStatus ? `${h.oldStatus} ➔ ` : ''}{h.newStatus}
                        </div>
                        <div style={{ color: 'var(--color-slate-500)' }}>
                          {h.reason || 'No remark'} • By {h.changedByName}
                        </div>
                        <div style={{ color: 'var(--color-slate-400)', fontSize: '0.7rem' }}>
                          {new Date(h.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Notification Logs */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MessageSquare size={14} /> WhatsApp Notifications Sent
                  </h4>
                  <div style={{ maxHeight: '180px', overflowY: 'auto', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedBooking.notifications?.length > 0 ? (
                      selectedBooking.notifications.map((notif: any) => (
                        <div key={notif.id} style={{ padding: '0.4rem', borderLeft: '2px solid var(--color-whatsapp)', background: '#fff' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>{notif.templateName}</strong>
                            <span style={{ fontSize: '0.7rem', color: notif.status === 'SENT' ? '#16a34a' : '#2563eb' }}>
                              {notif.status}
                            </span>
                          </div>
                          <div style={{ color: 'var(--color-slate-500)' }}>To: {notif.recipientPhone}</div>
                          <div style={{ color: 'var(--color-slate-400)', fontSize: '0.7rem' }}>
                            {new Date(notif.createdAt).toLocaleString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: 'var(--color-slate-400)' }}>No notifications recorded.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
