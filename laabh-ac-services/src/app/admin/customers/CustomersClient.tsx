'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, User, Phone, Mail, MapPin, Calendar, Clock, X, ArrowRight } from 'lucide-react';

interface CustomerRecord {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  createdAt: string;
  _count: {
    bookings: number;
  };
  addresses: {
    id: number;
    addressLine: string;
    landmark?: string | null;
    city: string;
    pincode?: string | null;
  }[];
}

export default function CustomersClient({ initialCustomers }: { initialCustomers: CustomerRecord[] }) {
  const [customers, setCustomers] = useState<CustomerRecord[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const filtered = customers.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
  });

  const openCustomerProfile = async (id: number) => {
    setLoadingProfile(true);
    try {
      const res = await fetch(`/api/customers/${id}`);
      const data = await res.json();
      if (res.ok) {
        setSelectedCustomer(data.customer);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProfile(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
          Customer Profiles & History
        </h1>
        <p style={{ color: 'var(--color-slate-500)', fontSize: '0.925rem' }}>
          Access full customer history, multiple service addresses, and historic service bookings.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          border: '1px solid var(--color-slate-200)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search customers by name, phone number or email..."
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

      {/* CUSTOMERS TABLE */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Bookings</th>
              <th>Primary City</th>
              <th>Joined Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-slate-400)' }}>
                  No customer profiles found matching your search.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{c.name}</div>
                  </td>
                  <td>{c.phone}</td>
                  <td>{c.email || <span style={{ color: 'var(--color-slate-400)' }}>—</span>}</td>
                  <td>
                    <span className="badge badge-ice">{c._count.bookings} booking(s)</span>
                  </td>
                  <td>{c.addresses[0]?.city || 'Ahmedabad'}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => openCustomerProfile(c.id)}
                      className="btn btn-secondary btn-sm"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CUSTOMER PROFILE MODAL */}
      {selectedCustomer && (
        <div className="modal-backdrop" onClick={() => setSelectedCustomer(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: '750px' }}
            onClick={(e) => e.stopPropagation()}
          >
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
                <h2 style={{ fontSize: '1.5rem', color: 'var(--color-navy)' }}>{selectedCustomer.name}</h2>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-slate-500)', fontSize: '0.875rem', marginTop: '4px' }}>
                  <span>{selectedCustomer.phone}</span>
                  {selectedCustomer.email && <span>• {selectedCustomer.email}</span>}
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
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

            {/* Saved Addresses */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} /> Saved Addresses
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedCustomer.addresses?.map((addr: any) => (
                  <div
                    key={addr.id}
                    style={{
                      background: 'var(--color-slate-50)',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-slate-200)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <p style={{ color: 'var(--color-slate-800)' }}>{addr.addressLine}</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
                      {addr.landmark ? `Landmark: ${addr.landmark} • ` : ''}
                      {addr.city} {addr.pincode ? `- ${addr.pincode}` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historic Bookings */}
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} /> Booking History ({selectedCustomer.bookings?.length || 0})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedCustomer.bookings?.map((b: any) => (
                  <div
                    key={b.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--color-slate-200)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong style={{ fontFamily: 'var(--font-heading)' }}>{b.bookingRef}</strong>
                        <span className={`badge badge-status-${b.status}`}>{b.status}</span>
                      </div>
                      <p style={{ color: 'var(--color-slate-600)', fontSize: '0.875rem', marginTop: '2px' }}>
                        {b.service.name} • {b.unitCount} unit(s)
                      </p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
                        Date: {new Date(b.preferredDate).toLocaleDateString()} | {b.preferredTimeSlot}
                      </span>
                    </div>

                    <Link
                      href={`/admin/bookings?id=${b.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Manage Booking <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
