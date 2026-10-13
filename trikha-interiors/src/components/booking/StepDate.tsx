import React, { useState } from 'react';
import {
  AvailabilityRule,
  BlockedDate,
  BusinessSettings,
  Service
} from '../../types/booking';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import { getAvailableSlotsForDate } from '../../services/bookingStorage';

interface StepDateProps {
  selectedService: Service;
  selectedDate: string; // "YYYY-MM-DD"
  onSelectDate: (date: string) => void;
  availabilityRules: AvailabilityRule[];
  blockedDates: BlockedDate[];
  settings: BusinessSettings;
  onNext: () => void;
  onBack: () => void;
}

export const StepDate: React.FC<StepDateProps> = ({
  selectedService,
  selectedDate,
  onSelectDate,
  availabilityRules,
  blockedDates,
  settings,
  onNext,
  onBack
}) => {
  // Current viewing month
  const initialDateObj = selectedDate ? new Date(selectedDate + 'T12:00:00') : new Date();
  const [currentYear, setCurrentYear] = useState(initialDateObj.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDateObj.getMonth()); // 0-indexed

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Calendar math
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + (settings.maxAdvanceDays || 60));

  // Determine if a specific day is available
  const getDateStatus = (day: number) => {
    const checkDate = new Date(currentYear, currentMonth, day);
    checkDate.setHours(0, 0, 0, 0);

    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Past date check
    if (checkDate < today) {
      return { isAvailable: false, reason: 'Date has passed' };
    }

    // Too far in advance check
    if (checkDate > maxDate) {
      return { isAvailable: false, reason: `Beyond ${settings.maxAdvanceDays} days booking horizon` };
    }

    // Blocked holiday check
    const blocked = blockedDates.find((b) => b.date === dateStr);
    if (blocked) {
      return { isAvailable: false, reason: blocked.reason };
    }

    // Day of week check
    const weekday = checkDate.getDay();
    const rule = availabilityRules.find((r) => r.weekday === weekday);
    if (!rule || !rule.isOpen) {
      return { isAvailable: false, reason: 'Studio closed on this day' };
    }

    // Derive slots check to confirm there are actually free slots
    const slots = getAvailableSlotsForDate(dateStr, selectedService.durationMinutes);
    const hasAvailableSlot = slots.some((s) => s.isAvailable);
    if (!hasAvailableSlot) {
      return { isAvailable: false, reason: 'All appointment slots fully booked' };
    }

    return { isAvailable: true, dateStr };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069] font-medium">
          Step 2 of 5
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
          Select Consultation Date
        </h2>
        <p className="text-sm text-[#66665E] leading-relaxed">
          {selectedService.name} · {selectedService.durationMinutes} mins · Available up to {settings.maxAdvanceDays} days in advance.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white border border-[#E8E0D5] p-6 sm:p-8 shadow-xs">
        {/* Month Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E8E0D5]">
          <h3 className="font-serif text-2xl text-[#262622] font-medium">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 border border-[#E8E0D5] hover:border-[#262622] transition-colors cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4 text-[#262622]" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 border border-[#E8E0D5] hover:border-[#262622] transition-colors cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4 text-[#262622]" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 pt-6 text-center text-xs uppercase tracking-wider text-[#7A8069] font-medium pb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {/* Empty padding days */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-12 w-full" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const status = getDateStatus(dayNum);
            const isSelected = selectedDate === dateStr;

            return (
              <div key={dayNum} className="relative group">
                <button
                  type="button"
                  disabled={!status.isAvailable}
                  onClick={() => onSelectDate(dateStr)}
                  title={status.isAvailable ? 'Available Date' : status.reason}
                  className={`h-12 w-full flex items-center justify-center transition-all cursor-pointer font-sans text-sm ${
                    isSelected
                      ? 'bg-[#262622] text-[#F7F5F0] font-medium shadow-xs'
                      : status.isAvailable
                      ? 'bg-[#F7F5F0] text-[#262622] hover:bg-[#E8E0D5] font-medium border border-transparent hover:border-[#7A8069]'
                      : 'text-[#BBB8AF] bg-transparent cursor-not-allowed line-through'
                  }`}
                >
                  {dayNum}
                </button>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="pt-8 mt-6 border-t border-[#E8E0D5] flex flex-wrap items-center justify-between text-xs text-[#66665E] gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#F7F5F0] border border-[#7A8069] inline-block" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#262622] inline-block" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#EAE8E2] inline-block" />
              <span>Closed / Booked</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#7A8069]">
            <Info className="w-3.5 h-3.5" />
            <span>Schedule based on {settings.timezoneLabel}</span>
          </div>
        </div>
      </div>

      {/* Selected Date Summary & Actions */}
      <div className="max-w-2xl mx-auto flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 text-xs uppercase tracking-widest border border-[#262622] text-[#262622] hover:bg-[#E8E0D5] transition-colors cursor-pointer"
        >
          Back to Service
        </button>

        {selectedDate ? (
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#262622] text-[#F7F5F0] hover:bg-[#3D3D36] transition-colors cursor-pointer flex items-center gap-2"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Select Time Slot</span>
          </button>
        ) : (
          <span className="text-xs text-[#7A8069] italic">
            Please click a date on the calendar above to continue
          </span>
        )}
      </div>
    </div>
  );
};
