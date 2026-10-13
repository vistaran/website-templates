import React, { useMemo } from 'react';
import { BusinessSettings, Service } from '../../types/booking';
import { GeneratedSlot, getAvailableSlotsForDate } from '../../services/bookingStorage';
import { Clock, Globe, AlertCircle, ArrowRight, Sun, Moon } from 'lucide-react';

interface StepTimeProps {
  selectedService: Service;
  selectedDate: string; // "YYYY-MM-DD"
  selectedTime: string; // "10:00"
  onSelectTime: (time: string) => void;
  settings: BusinessSettings;
  onNext: () => void;
  onBack: () => void;
}

export const StepTime: React.FC<StepTimeProps> = ({
  selectedService,
  selectedDate,
  selectedTime,
  onSelectTime,
  settings,
  onNext,
  onBack
}) => {
  // Derive slot list dynamically using storage logic
  const slots: GeneratedSlot[] = useMemo(() => {
    if (!selectedDate) return [];
    return getAvailableSlotsForDate(selectedDate, selectedService.durationMinutes);
  }, [selectedDate, selectedService.durationMinutes]);

  // Format date display for header (e.g. "Thursday, October 15, 2026")
  const formattedDate = useMemo(() => {
    if (!selectedDate) return '';
    const [year, month, day] = selectedDate.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [selectedDate]);

  // Group slots into Morning (< 12:00) and Afternoon (>= 12:00)
  const morningSlots = slots.filter((s) => {
    const hour = parseInt(s.time.split(':')[0], 10);
    return hour < 12;
  });

  const afternoonSlots = slots.filter((s) => {
    const hour = parseInt(s.time.split(':')[0], 10);
    return hour >= 12;
  });

  const availableCount = slots.filter((s) => s.isAvailable).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069] font-medium">
          Step 3 of 5
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
          Select Appointment Time
        </h2>
        <p className="text-sm text-[#66665E] leading-relaxed">
          {formattedDate} · {selectedService.durationMinutes} minutes session
        </p>

        {/* Timezone badge */}
        <div className="inline-flex items-center gap-1.5 text-xs text-[#7A8069] bg-[#EFECE6] px-3 py-1 mt-2 border border-[#E8E0D5]">
          <Globe className="w-3.5 h-3.5" />
          <span>All times shown in {settings.timezoneLabel}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white border border-[#E8E0D5] p-6 sm:p-8 shadow-xs">
        {slots.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <AlertCircle className="w-8 h-8 text-[#7A8069] mx-auto opacity-70" />
            <h3 className="font-serif text-lg text-[#262622]">No Slots Available</h3>
            <p className="text-xs text-[#66665E] max-w-sm mx-auto">
              The studio has no available consultation times on {formattedDate}. Please return to the calendar to select another date.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-2 px-4 py-2 text-xs uppercase tracking-wider bg-[#262622] text-white"
            >
              Back to Calendar
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Morning Section */}
            {morningSlots.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A8069] font-medium pb-3 border-b border-[#E8E0D5]">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Morning Sessions</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                  {morningSlots.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.isAvailable}
                        onClick={() => onSelectTime(slot.time)}
                        title={slot.isAvailable ? `Available: ${slot.timeFormatted} to ${slot.endTimeFormatted}` : slot.reason}
                        className={`py-3 px-4 border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-[#262622] border-[#262622] text-[#F7F5F0] shadow-xs'
                            : slot.isAvailable
                            ? 'bg-[#F7F5F0] border-[#E8E0D5] text-[#262622] hover:border-[#7A8069] hover:bg-[#EAE6DD]'
                            : 'bg-transparent border-[#ECE9E2] text-[#BBB8AF] cursor-not-allowed line-through'
                        }`}
                      >
                        <span className="font-serif text-base font-medium">{slot.timeFormatted}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-[#C5C5B9]' : slot.isAvailable ? 'text-[#7A8069]' : 'text-[#BBB8AF]'}`}>
                          until {slot.endTimeFormatted}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Afternoon Section */}
            {afternoonSlots.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A8069] font-medium pb-3 border-b border-[#E8E0D5]">
                  <Moon className="w-3.5 h-3.5" />
                  <span>Afternoon & Evening Sessions</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                  {afternoonSlots.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.isAvailable}
                        onClick={() => onSelectTime(slot.time)}
                        title={slot.isAvailable ? `Available: ${slot.timeFormatted} to ${slot.endTimeFormatted}` : slot.reason}
                        className={`py-3 px-4 border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-[#262622] border-[#262622] text-[#F7F5F0] shadow-xs'
                            : slot.isAvailable
                            ? 'bg-[#F7F5F0] border-[#E8E0D5] text-[#262622] hover:border-[#7A8069] hover:bg-[#EAE6DD]'
                            : 'bg-transparent border-[#ECE9E2] text-[#BBB8AF] cursor-not-allowed line-through'
                        }`}
                      >
                        <span className="font-serif text-base font-medium">{slot.timeFormatted}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-[#C5C5B9]' : slot.isAvailable ? 'text-[#7A8069]' : 'text-[#BBB8AF]'}`}>
                          until {slot.endTimeFormatted}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Schedule buffer disclosure */}
            <div className="pt-4 border-t border-[#E8E0D5] flex items-center justify-between text-[11px] text-[#7A8069]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{availableCount} available time {availableCount === 1 ? 'slot' : 'slots'} on this day</span>
              </div>
              <span>Includes {settings.bufferMinutes}-minute inter-session buffer</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="max-w-2xl mx-auto flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 text-xs uppercase tracking-widest border border-[#262622] text-[#262622] hover:bg-[#E8E0D5] transition-colors cursor-pointer"
        >
          Back to Date
        </button>

        {selectedTime ? (
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#262622] text-[#F7F5F0] hover:bg-[#3D3D36] transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Client & Project Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="text-xs text-[#7A8069] italic">
            Please pick an available time slot above to continue
          </span>
        )}
      </div>
    </div>
  );
};
