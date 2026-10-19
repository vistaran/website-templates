'use client';

import { useState } from 'react';
import { Settings, Save, AlertCircle, HelpCircle, CheckCircle, ShieldCheck } from 'lucide-react';

interface SettingsData {
  id?: number;
  businessName: string;
  vendorPhone: string;
  vendorEmail: string;
  address?: string | null;
  whatsappCloudApiToken?: string | null;
  whatsappPhoneNumberId?: string | null;
  whatsappBusinessAccountId?: string | null;
  mockModeEnabled: boolean;
}

export default function SettingsClient({ initialSettings }: { initialSettings: SettingsData }) {
  const [formData, setFormData] = useState<SettingsData>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setFormData(data.settings);
      setFeedback('Settings updated and saved to MySQL database successfully!');
    } catch (err: any) {
      setFeedback(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
          Business & WhatsApp Cloud API Settings
        </h1>
        <p style={{ color: 'var(--color-slate-500)', fontSize: '0.925rem' }}>
          Manage company contact points, notification preferences, and Meta WhatsApp Business credentials.
        </p>
      </div>

      {feedback && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: feedback.startsWith('Error')
              ? 'var(--status-cancelled-bg)'
              : 'var(--color-primary-ice)',
            color: feedback.startsWith('Error')
              ? 'var(--status-cancelled-text)'
              : 'var(--color-primary-dark)',
            marginBottom: '1.5rem',
            fontSize: '0.925rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {feedback.startsWith('Error') ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* SECTION 1: BUSINESS PROFILE */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--color-slate-200)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', color: 'var(--color-navy)', marginBottom: '1.25rem' }}>
            1. Business Profile & Vendor Alerts
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Vendor Alert Mobile (WhatsApp)</label>
              <input
                type="text"
                name="vendorPhone"
                placeholder="e.g. 91XXXXXXXXXX"
                value={formData.vendorPhone}
                onChange={handleChange}
                className="form-input"
                required
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
                New booking alerts will be dispatched to this number.
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Official Support Email</label>
              <input
                type="email"
                name="vendorEmail"
                value={formData.vendorEmail}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Physical Workshop Address</label>
              <textarea
                name="address"
                rows={2}
                value={formData.address || ''}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: WHATSAPP CLOUD API CONFIGURATION */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--color-slate-200)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-navy)' }}>
                2. Meta WhatsApp Business Cloud API
              </h2>
              <p style={{ color: 'var(--color-slate-500)', fontSize: '0.85rem' }}>
                Secure credentials stored safely on the server side in MySQL.
              </p>
            </div>

            {/* MOCK MODE TOGGLE */}
            <div
              style={{
                background: formData.mockModeEnabled ? 'var(--color-primary-ice)' : '#dcfce7',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <input
                type="checkbox"
                id="mockModeEnabled"
                name="mockModeEnabled"
                checked={formData.mockModeEnabled}
                onChange={(e) => setFormData({ ...formData, mockModeEnabled: e.target.checked })}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="mockModeEnabled" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-navy)', cursor: 'pointer' }}>
                Development Mock Mode
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp Cloud API Permanent Access Token</label>
            <input
              type="password"
              name="whatsappCloudApiToken"
              placeholder="EAAG... (System User Access Token)"
              value={formData.whatsappCloudApiToken || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">WhatsApp Phone Number ID</label>
              <input
                type="text"
                name="whatsappPhoneNumberId"
                placeholder="e.g. 104829104859201"
                value={formData.whatsappPhoneNumberId || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp Business Account ID (WABA)</label>
              <input
                type="text"
                name="whatsappBusinessAccountId"
                placeholder="e.g. 294810482019482"
                value={formData.whatsappBusinessAccountId || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* SETUP GUIDE ACCORDION */}
          <div
            style={{
              background: 'var(--color-slate-50)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: '1px solid var(--color-slate-200)',
              marginTop: '1rem',
            }}
          >
            <h4
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-navy)',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <HelpCircle size={16} /> How to obtain Meta WhatsApp Cloud API credentials
            </h4>
            <ol
              style={{
                paddingLeft: '1.25rem',
                fontSize: '0.825rem',
                color: 'var(--color-slate-600)',
                lineHeight: 1.6,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              <li>Go to <strong>developers.facebook.com</strong> and create or open your App.</li>
              <li>Add the <strong>WhatsApp</strong> product to your App.</li>
              <li>Under <strong>WhatsApp &gt; API Setup</strong>, copy the <em>Phone Number ID</em> and <em>WhatsApp Business Account ID</em>.</li>
              <li>In Meta Business Manager &gt; Users &gt; System Users, generate a permanent 60-day or permanent token with <code>whatsapp_business_messaging</code> permissions.</li>
              <li>When Mock Mode is enabled, no Meta API credentials are required; dispatches are simulated and logged locally in MySQL.</li>
            </ol>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
