'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Wrench, Edit, Check, X, Clock, AlertCircle } from 'lucide-react';

interface ServiceItem {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription?: string | null;
  startingPrice: string | number | null;
  estimatedDuration: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  sortOrder: number;
}

export default function ServicesClient({ initialServices }: { initialServices: ServiceItem[] }) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const openEdit = (service: ServiceItem) => {
    setEditingService({ ...service });
    setFeedback('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);
    setFeedback('');

    try {
      const res = await fetch('/api/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingService.id,
          startingPrice: editingService.startingPrice,
          estimatedDuration: editingService.estimatedDuration,
          isActive: editingService.isActive,
          shortDescription: editingService.shortDescription,
          fullDescription: editingService.fullDescription,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? { ...s, ...data.service } : s))
      );
      setFeedback('Service configuration updated successfully!');
      setTimeout(() => setEditingService(null), 1200);
    } catch (err: any) {
      setFeedback(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
          Official Service Catalogue
        </h1>
        <p style={{ color: 'var(--color-slate-500)', fontSize: '0.925rem' }}>
          Configure starting prices, estimated job durations, descriptions and active statuses for all 8 official services.
        </p>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Service Name</th>
              <th>Slug</th>
              <th>Starting Price</th>
              <th>Est. Duration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td style={{ width: '80px' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '60px',
                      height: '42px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={s.imageUrl || '/images/services/service.jpg'}
                      alt={s.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </td>
                <td>
                  <strong style={{ color: 'var(--color-navy)' }}>{s.name}</strong>
                  <p style={{ color: 'var(--color-slate-500)', fontSize: '0.8rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.shortDescription}
                  </p>
                </td>
                <td style={{ fontSize: '0.825rem', color: 'var(--color-slate-400)', fontFamily: 'monospace' }}>
                  {s.slug}
                </td>
                <td>
                  {s.startingPrice ? (
                    <strong style={{ color: 'var(--color-primary)' }}>
                      ₹{Number(s.startingPrice).toLocaleString('en-IN')}
                    </strong>
                  ) : (
                    <span style={{ color: 'var(--color-slate-400)', fontStyle: 'italic' }}>Not set</span>
                  )}
                </td>
                <td>
                  {s.estimatedDuration ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Clock size={12} /> {s.estimatedDuration}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--color-slate-400)' }}>—</span>
                  )}
                </td>
                <td>
                  <span className={`badge ${s.isActive ? 'badge-success' : 'badge-status-CANCELLED'}`}>
                    {s.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td>
                  <button onClick={() => openEdit(s)} className="btn btn-secondary btn-sm">
                    <Edit size={14} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingService && (
        <div className="modal-backdrop" onClick={() => setEditingService(null)}>
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
              <h2 style={{ fontSize: '1.35rem', color: 'var(--color-navy)' }}>
                Edit {editingService.name}
              </h2>
              <button
                onClick={() => setEditingService(null)}
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
                  background: feedback.startsWith('Error')
                    ? 'var(--status-cancelled-bg)'
                    : 'var(--color-primary-ice)',
                  color: feedback.startsWith('Error')
                    ? 'var(--status-cancelled-text)'
                    : 'var(--color-primary-dark)',
                  marginBottom: '1.25rem',
                  fontSize: '0.9rem',
                }}
              >
                {feedback}
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Starting Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 599 (leave blank for none)"
                    value={editingService.startingPrice === null ? '' : editingService.startingPrice}
                    onChange={(e) =>
                      setEditingService((prev) =>
                        prev
                          ? {
                              ...prev,
                              startingPrice: e.target.value === '' ? null : Number(e.target.value),
                            }
                          : null
                      )
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Estimated Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 45 - 60 mins"
                    value={editingService.estimatedDuration || ''}
                    onChange={(e) =>
                      setEditingService((prev) =>
                        prev ? { ...prev, estimatedDuration: e.target.value } : null
                      )
                    }
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Active / Display Status</label>
                <select
                  value={editingService.isActive ? 'true' : 'false'}
                  onChange={(e) =>
                    setEditingService((prev) =>
                      prev ? { ...prev, isActive: e.target.value === 'true' } : null
                    )
                  }
                  className="form-select"
                >
                  <option value="true">Active (Visible on Website & Booking Form)</option>
                  <option value="false">Disabled / Hidden</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Short Description</label>
                <textarea
                  rows={2}
                  value={editingService.shortDescription}
                  onChange={(e) =>
                    setEditingService((prev) =>
                      prev ? { ...prev, shortDescription: e.target.value } : null
                    )
                  }
                  className="form-textarea"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Overview Description</label>
                <textarea
                  rows={4}
                  value={editingService.fullDescription || ''}
                  onChange={(e) =>
                    setEditingService((prev) =>
                      prev ? { ...prev, fullDescription: e.target.value } : null
                    )
                  }
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                  style={{ flexGrow: 1 }}
                >
                  {saving ? 'Saving Changes...' : 'Save Configuration'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="btn btn-secondary"
                >
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
