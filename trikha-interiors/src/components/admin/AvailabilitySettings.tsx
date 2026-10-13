import React, { useState } from 'react';
import {
  AvailabilityRule,
  BlockedDate,
  BusinessSettings,
  Service
} from '../../types/booking';
import {
  Clock,
  Calendar,
  Save,
  Plus,
  Trash2,
  DollarSign,
  AlertCircle,
  Check
} from 'lucide-react';

interface AvailabilitySettingsProps {
  settings: BusinessSettings;
  rules: AvailabilityRule[];
  blockedDates: BlockedDate[];
  services: Service[];
  onSaveSettings: (settings: BusinessSettings) => void;
  onSaveRules: (rules: AvailabilityRule[]) => void;
  onSaveBlockedDates: (dates: BlockedDate[]) => void;
  onSaveServices: (services: Service[]) => void;
}

export const AvailabilitySettings: React.FC<AvailabilitySettingsProps> = ({
  settings,
  rules,
  blockedDates,
  services,
  onSaveSettings,
  onSaveRules,
  onSaveBlockedDates,
  onSaveServices
}) => {
  const [localSettings, setLocalSettings] = useState<BusinessSettings>({ ...settings });
  const [localRules, setLocalRules] = useState<AvailabilityRule[]>([...rules]);
  const [localBlocked, setLocalBlocked] = useState<BlockedDate[]>([...blockedDates]);
  const [localServices, setLocalServices] = useState<Service[]>([...services]);

  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('');
  const [saveBanner, setSaveBanner] = useState(false);

  const handleRuleToggle = (weekday: number) => {
    setLocalRules((prev) =>
      prev.map((r) => (r.weekday === weekday ? { ...r, isOpen: !r.isOpen } : r))
    );
  };

  const handleRuleChange = (weekday: number, field: keyof AvailabilityRule, value: string) => {
    setLocalRules((prev) =>
      prev.map((r) => (r.weekday === weekday ? { ...r, [field]: value } : r))
    );
  };

  const handleAddBlockedDate = () => {
    if (!newBlockDate) return;
    const item: BlockedDate = {
      id: `block-${Date.now()}`,
      date: newBlockDate,
      reason: newBlockReason || 'Studio Maintenance / Special Closure'
    };
    setLocalBlocked([...localBlocked, item]);
    setNewBlockDate('');
    setNewBlockReason('');
  };

  const handleRemoveBlockedDate = (id: string) => {
    setLocalBlocked(localBlocked.filter((b) => b.id !== id));
  };

  const handleSaveAll = () => {
    onSaveSettings(localSettings);
    onSaveRules(localRules);
    onSaveBlockedDates(localBlocked);
    onSaveServices(localServices);
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in">
      {/* Top Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E0D5] gap-4">
        <div>
          <h3 className="font-serif text-2xl text-[#262622]">
            Studio Schedule & Availability Rules
          </h3>
          <p className="text-xs text-[#66665E]">
            Changes saved here are enforced immediately on the client booking calendar.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#262622] text-[#F7F5F0] hover:bg-[#3D3D36] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>

      {saveBanner && (
        <div className="p-4 bg-[#F2F7ED] border border-[#BBD4AC] text-[#3D6B26] text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Studio operating rules and availability successfully updated and persisted.</span>
        </div>
      )}

      {/* Section 1: Weekly Operating Hours */}
      <div className="bg-white border border-[#E8E0D5] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E8E0D5] pb-3">
          <h4 className="font-serif text-lg text-[#262622] font-medium">
            1. Weekly Working Days & Operating Hours
          </h4>
          <p className="text-xs text-[#7A8069]">
            Define opening and closing times. Days marked Closed are disabled on the booking calendar.
          </p>
        </div>

        <div className="space-y-3">
          {localRules.map((rule) => (
            <div
              key={rule.id}
              className={`p-3.5 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                rule.isOpen ? 'bg-[#F7F5F0] border-[#E8E0D5]' : 'bg-[#EAE8E2]/50 border-dashed border-[#DCD8CF]'
              }`}
            >
              <div className="flex items-center gap-3 w-36">
                <input
                  type="checkbox"
                  checked={rule.isOpen}
                  onChange={() => handleRuleToggle(rule.weekday)}
                  id={`check-${rule.weekday}`}
                  className="w-4 h-4 accent-[#262622] cursor-pointer"
                />
                <label
                  htmlFor={`check-${rule.weekday}`}
                  className={`text-xs uppercase tracking-wider font-medium cursor-pointer ${
                    rule.isOpen ? 'text-[#262622]' : 'text-[#8C8C80]'
                  }`}
                >
                  {rule.weekdayName}
                </label>
              </div>

              {rule.isOpen ? (
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#7A8069]">Open:</span>
                    <input
                      type="time"
                      value={rule.startTime}
                      onChange={(e) => handleRuleChange(rule.weekday, 'startTime', e.target.value)}
                      className="px-2 py-1 bg-white border border-[#E8E0D5] text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[#7A8069]">Close:</span>
                    <input
                      type="time"
                      value={rule.endTime}
                      onChange={(e) => handleRuleChange(rule.weekday, 'endTime', e.target.value)}
                      className="px-2 py-1 bg-white border border-[#E8E0D5] text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[#7A8069]">Break:</span>
                    <input
                      type="time"
                      value={rule.breakStart || ''}
                      onChange={(e) => handleRuleChange(rule.weekday, 'breakStart', e.target.value)}
                      className="px-2 py-1 bg-white border border-[#E8E0D5] text-xs"
                    />
                    <span className="text-[#7A8069]">to</span>
                    <input
                      type="time"
                      value={rule.breakEnd || ''}
                      onChange={(e) => handleRuleChange(rule.weekday, 'breakEnd', e.target.value)}
                      className="px-2 py-1 bg-white border border-[#E8E0D5] text-xs"
                    />
                  </div>
                </div>
              ) : (
                <span className="text-xs text-[#8C8C80] italic">
                  Studio closed on this day
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Timezone & Booking Policies */}
      <div className="bg-white border border-[#E8E0D5] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E8E0D5] pb-3">
          <h4 className="font-serif text-lg text-[#262622] font-medium">
            2. Timezone, Buffers & Booking Policies
          </h4>
          <p className="text-xs text-[#7A8069]">
            Enforce scheduling windows and buffer intervals to prevent double booking and fatigue.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
              Studio Timezone
            </label>
            <select
              value={localSettings.timezone}
              onChange={(e) => {
                const tz = e.target.value;
                let label = 'India Standard Time (IST - Ahmedabad)';
                if (tz.includes('New_York')) label = 'Eastern Time (ET - New York)';
                if (tz.includes('Chicago')) label = 'Central Time (CT - Chicago)';
                if (tz.includes('Los_Angeles')) label = 'Pacific Time (PT - Los Angeles)';
                if (tz.includes('London')) label = 'British Time (GMT/BST - London)';
                setLocalSettings({ ...localSettings, timezone: tz, timezoneLabel: label });
              }}
              className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E8E0D5] text-xs"
            >
              <option value="Asia/Kolkata">India (IST - Ahmedabad)</option>
              <option value="America/New_York">Eastern (New York)</option>
              <option value="America/Chicago">Central (Chicago)</option>
              <option value="America/Los_Angeles">Pacific (Los Angeles)</option>
              <option value="Europe/London">London (GMT/BST)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
              Inter-Session Buffer
            </label>
            <select
              value={localSettings.bufferMinutes}
              onChange={(e) => setLocalSettings({ ...localSettings, bufferMinutes: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E8E0D5] text-xs"
            >
              <option value={10}>10 Minutes Cushion</option>
              <option value={15}>15 Minutes Cushion</option>
              <option value={30}>30 Minutes Cushion</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
              Minimum Advance Notice
            </label>
            <select
              value={localSettings.minNoticeHours}
              onChange={(e) => setLocalSettings({ ...localSettings, minNoticeHours: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E8E0D5] text-xs"
            >
              <option value={6}>6 Hours</option>
              <option value={12}>12 Hours</option>
              <option value={24}>24 Hours</option>
              <option value={48}>48 Hours</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
              Booking Horizon Window
            </label>
            <select
              value={localSettings.maxAdvanceDays}
              onChange={(e) => setLocalSettings({ ...localSettings, maxAdvanceDays: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E8E0D5] text-xs"
            >
              <option value={30}>30 Days in Advance</option>
              <option value={60}>60 Days in Advance</option>
              <option value={90}>90 Days in Advance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Blocked Dates / Studio Holidays */}
      <div className="bg-white border border-[#E8E0D5] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E8E0D5] pb-3">
          <h4 className="font-serif text-lg text-[#262622] font-medium">
            3. Blocked Dates & Studio Holidays
          </h4>
          <p className="text-xs text-[#7A8069]">
            Black out individual dates for sourcing trips, national holidays, or private installations.
          </p>
        </div>

        {/* Add new blocked date form */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 bg-[#F7F5F0] border border-[#E8E0D5]">
          <input
            type="date"
            value={newBlockDate}
            onChange={(e) => setNewBlockDate(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E8E0D5] text-xs"
          />
          <input
            type="text"
            value={newBlockReason}
            onChange={(e) => setNewBlockReason(e.target.value)}
            placeholder="Reason (e.g. Salone del Mobile / Studio Sourcing)"
            className="flex-1 px-3 py-2 bg-white border border-[#E8E0D5] text-xs"
          />
          <button
            type="button"
            onClick={handleAddBlockedDate}
            className="px-4 py-2 bg-[#262622] text-white text-xs uppercase tracking-wider hover:bg-[#3D3D36] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Block Date</span>
          </button>
        </div>

        {/* Current blocked dates list */}
        <div className="space-y-2">
          {localBlocked.length === 0 ? (
            <p className="text-xs text-[#7A8069] italic">No dates currently blocked.</p>
          ) : (
            localBlocked.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-3 border border-[#E8E0D5] bg-white text-xs"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#7A8069]" />
                  <span className="font-medium text-[#262622]">{b.date}</span>
                  <span className="text-[#66665E]">— {b.reason}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveBlockedDate(b.id)}
                  className="text-[#994D4D] hover:text-[#7A2B2B] p-1 cursor-pointer"
                  title="Remove block"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Section 4: Service Duration & Pricing Manager */}
      <div className="bg-white border border-[#E8E0D5] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E8E0D5] pb-3">
          <h4 className="font-serif text-lg text-[#262622] font-medium">
            4. Service Durations & Consultation Fees
          </h4>
          <p className="text-xs text-[#7A8069]">
            Configure consultation prices, durations, and active statuses.
          </p>
        </div>

        <div className="space-y-4">
          {localServices.slice(0, 3).map((service, index) => (
            <div
              key={service.id}
              className="p-4 border border-[#E8E0D5] bg-[#F7F5F0] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div>
                <span className="font-serif text-base font-medium text-[#262622] block">
                  {service.name}
                </span>
                <span className="text-[#7A8069]">{service.tagline}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#7A8069]">Duration:</span>
                  <select
                    value={service.durationMinutes}
                    onChange={(e) => {
                      const updated = [...localServices];
                      updated[index] = { ...updated[index], durationMinutes: Number(e.target.value) };
                      setLocalServices(updated);
                    }}
                    className="px-2 py-1 bg-white border border-[#E8E0D5]"
                  >
                    <option value={30}>30 mins</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>60 mins</option>
                    <option value={90}>90 mins</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[#7A8069]">Price (₹):</span>
                  <input
                    type="number"
                    min="0"
                    value={service.price}
                    onChange={(e) => {
                      const updated = [...localServices];
                      const val = Number(e.target.value);
                      updated[index] = {
                        ...updated[index],
                        price: val,
                        isFree: val === 0
                      };
                      setLocalServices(updated);
                    }}
                    className="w-20 px-2 py-1 bg-white border border-[#E8E0D5]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={service.isActive}
                    id={`active-${service.id}`}
                    onChange={(e) => {
                      const updated = [...localServices];
                      updated[index] = { ...updated[index], isActive: e.target.checked };
                      setLocalServices(updated);
                    }}
                    className="w-4 h-4 accent-[#262622]"
                  />
                  <label htmlFor={`active-${service.id}`} className="text-[#262622]">
                    Active
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
