'use client';

import { useState } from 'react';
import { UserCheck, Plus, Phone, Mail, Edit, X } from 'lucide-react';

interface TechItem {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  skills?: string | null;
  status: string;
  _count?: {
    bookings: number;
  };
}

export default function TechniciansClient({ initialTechnicians }: { initialTechnicians: TechItem[] }) {
  const [technicians, setTechnicians] = useState<TechItem[]>(initialTechnicians);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTech, setEditingTech] = useState<TechItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    skills: '',
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      const res = await fetch('/api/technicians', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setTechnicians((prev) => [...prev, data.technician]);
      setShowAddModal(false);
      setFormData({ name: '', phone: '', email: '', skills: '' });
    } catch (e: any) {
      setFeedback(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTech) return;
    setLoading(true);
    setFeedback('');

    try {
      const res = await fetch('/api/technicians', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTech),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setTechnicians((prev) =>
        prev.map((t) => (t.id === editingTech.id ? { ...t, ...data.technician } : t))
      );
      setEditingTech(null);
    } catch (e: any) {
      setFeedback(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
            Service Technicians
          </h1>
          <p style={{ color: 'var(--color-slate-500)', fontSize: '0.925rem' }}>
            Manage certified field engineers, track their current active workload, and assign them to bookings.
          </p>
        </div>

        <button
          onClick={() => {
            setShowAddModal(true);
            setFeedback('');
          }}
          className="btn btn-primary"
        >
          <Plus size={16} /> Add New Technician
        </button>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Technician Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Active Jobs</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((t) => (
              <tr key={t.id}>
                <td>
                  <strong style={{ color: 'var(--color-navy)' }}>{t.name}</strong>
                </td>
                <td>{t.phone}</td>
                <td>{t.email || <span style={{ color: 'var(--color-slate-400)' }}>—</span>}</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--color-slate-600)' }}>
                  {t.skills || 'All Brands'}
                </td>
                <td>
                  <span className="badge badge-ice">
                    {t._count?.bookings || 0} active job(s)
                  </span>
                </td>
                <td>
                  <span className={`badge ${t.status === 'ACTIVE' ? 'badge-success' : 'badge-status-CANCELLED'}`}>
                    {t.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => setEditingTech({ ...t })} className="btn btn-secondary btn-sm">
                    <Edit size={14} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD TECHNICIAN MODAL */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-slate-200)',
                marginBottom: '1.5rem',
              }}
            >
              <h2 style={{ fontSize: '1.35rem', color: 'var(--color-navy)' }}>Add New Technician</h2>
              <button
                onClick={() => setShowAddModal(false)}
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

            {feedback && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--status-cancelled-bg)',
                  color: 'var(--status-cancelled-text)',
                  marginBottom: '1.25rem',
                  fontSize: '0.9rem',
                }}
              >
                {feedback}
              </div>
            )}

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98250 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@laabhservices.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Specialization / Skills</label>
                <input
                  type="text"
                  placeholder="e.g. Inverter Split AC, Gas Charging, Piping"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexGrow: 1 }}>
                  {loading ? 'Creating...' : 'Register Technician'}
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TECHNICIAN MODAL */}
      {editingTech && (
        <div className="modal-backdrop" onClick={() => setEditingTech(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-slate-200)',
                marginBottom: '1.5rem',
              }}
            >
              <h2 style={{ fontSize: '1.35rem', color: 'var(--color-navy)' }}>Edit Technician</h2>
              <button
                onClick={() => setEditingTech(null)}
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

            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={editingTech.name}
                  onChange={(e) => setEditingTech({ ...editingTech, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  value={editingTech.phone}
                  onChange={(e) => setEditingTech({ ...editingTech, phone: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={editingTech.email || ''}
                  onChange={(e) => setEditingTech({ ...editingTech, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Status</label>
                <select
                  value={editingTech.status}
                  onChange={(e) => setEditingTech({ ...editingTech, status: e.target.value })}
                  className="form-select"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="ON_LEAVE">ON_LEAVE</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Specialization / Skills</label>
                <input
                  type="text"
                  value={editingTech.skills || ''}
                  onChange={(e) => setEditingTech({ ...editingTech, skills: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexGrow: 1 }}>
                  {loading ? 'Saving...' : 'Update Technician'}
                </button>
                <button type="button" onClick={() => setEditingTech(null)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
