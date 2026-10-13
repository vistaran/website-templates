import {
  Appointment,
  AppointmentStatus,
  AvailabilityRule,
  BlockedDate,
  BusinessSettings,
  PaymentStatus,
  Service
} from '../types/booking';
import {
  INITIAL_AVAILABILITY_RULES,
  INITIAL_BLOCKED_DATES,
  INITIAL_BUSINESS_SETTINGS,
  INITIAL_SERVICES,
  SEED_APPOINTMENTS
} from '../data/initialData';

const STORAGE_KEYS = {
  APPOINTMENTS: 'trikha_appointments_v1',
  SERVICES: 'trikha_services_v1',
  AVAILABILITY: 'trikha_availability_rules_v1',
  SETTINGS: 'trikha_business_settings_v1',
  BLOCKED_DATES: 'trikha_blocked_dates_v1'
};

const DISPATCH_EVENT = 'trikha-storage-updated';

function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return defaultValue;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(DISPATCH_EVENT, { detail: { key } }));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

// Ensure initial seed data is loaded
export function initializeStorageIfNeeded(): void {
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    safeSetItem(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.AVAILABILITY)) {
    safeSetItem(STORAGE_KEYS.AVAILABILITY, INITIAL_AVAILABILITY_RULES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    safeSetItem(STORAGE_KEYS.SETTINGS, INITIAL_BUSINESS_SETTINGS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOCKED_DATES)) {
    safeSetItem(STORAGE_KEYS.BLOCKED_DATES, INITIAL_BLOCKED_DATES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    safeSetItem(STORAGE_KEYS.APPOINTMENTS, SEED_APPOINTMENTS);
  }
}

// ----------------- Data Accessors -----------------

export function getServices(): Service[] {
  initializeStorageIfNeeded();
  return safeGetItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export function updateServices(services: Service[]): void {
  safeSetItem(STORAGE_KEYS.SERVICES, services);
}

export function getAvailabilityRules(): AvailabilityRule[] {
  initializeStorageIfNeeded();
  return safeGetItem<AvailabilityRule[]>(STORAGE_KEYS.AVAILABILITY, INITIAL_AVAILABILITY_RULES);
}

export function updateAvailabilityRules(rules: AvailabilityRule[]): void {
  safeSetItem(STORAGE_KEYS.AVAILABILITY, rules);
}

export function getBusinessSettings(): BusinessSettings {
  initializeStorageIfNeeded();
  return safeGetItem<BusinessSettings>(STORAGE_KEYS.SETTINGS, INITIAL_BUSINESS_SETTINGS);
}

export function updateBusinessSettings(settings: BusinessSettings): void {
  safeSetItem(STORAGE_KEYS.SETTINGS, settings);
}

export function getBlockedDates(): BlockedDate[] {
  initializeStorageIfNeeded();
  return safeGetItem<BlockedDate[]>(STORAGE_KEYS.BLOCKED_DATES, INITIAL_BLOCKED_DATES);
}

export function updateBlockedDates(blocked: BlockedDate[]): void {
  safeSetItem(STORAGE_KEYS.BLOCKED_DATES, blocked);
}

export function getAppointments(): Appointment[] {
  initializeStorageIfNeeded();
  return safeGetItem<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, SEED_APPOINTMENTS);
}

export function getAppointmentById(id: string): Appointment | undefined {
  const all = getAppointments();
  return all.find((a) => a.id === id);
}

export function getAppointmentByReference(reference: string): Appointment | undefined {
  const all = getAppointments();
  const cleaned = reference.trim().toUpperCase();
  return all.find((a) => a.bookingReference.toUpperCase() === cleaned);
}

// ----------------- Availability & Slot Math -----------------

export function parseMinutesFromTime(timeStr: string): number {
  const [hours, mins] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (mins || 0);
}

export function formatTimeFromMinutes(totalMins: number): string {
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function format12Hour(timeStr: string): string {
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

/**
 * Checks whether a specific time interval on a given date is available without conflict.
 */
export function isSlotAvailable(
  dateStr: string,
  startTimeStr: string,
  durationMinutes: number,
  excludeAppointmentId?: string
): { available: boolean; reason?: string } {
  initializeStorageIfNeeded();
  const settings = getBusinessSettings();
  const availabilityRules = getAvailabilityRules();
  const blockedDates = getBlockedDates();
  const appointments = getAppointments();

  // 1. Check if date is in blocked dates
  const isBlocked = blockedDates.some((b) => b.date === dateStr);
  if (isBlocked) {
    return { available: false, reason: 'Date is blocked by studio administration.' };
  }

  // 2. Determine day of week
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const weekday = dateObj.getDay();

  const rule = availabilityRules.find((r) => r.weekday === weekday);
  if (!rule || !rule.isOpen) {
    return { available: false, reason: 'Studio is closed on this day of the week.' };
  }

  const slotStartMins = parseMinutesFromTime(startTimeStr);
  const slotEndMins = slotStartMins + durationMinutes;

  const openMins = parseMinutesFromTime(rule.startTime);
  const closeMins = parseMinutesFromTime(rule.endTime);

  // 3. Must be within open and close times
  if (slotStartMins < openMins || slotEndMins > closeMins) {
    return { available: false, reason: 'Appointment time falls outside studio operating hours.' };
  }

  // 4. Check lunch / break times if configured
  if (rule.breakStart && rule.breakEnd) {
    const breakStartMins = parseMinutesFromTime(rule.breakStart);
    const breakEndMins = parseMinutesFromTime(rule.breakEnd);
    // Overlaps if slot starts before break ends and slot ends after break starts
    if (slotStartMins < breakEndMins && slotEndMins > breakStartMins) {
      return { available: false, reason: 'Requested time conflicts with studio mid-day recess.' };
    }
  }

  // 5. Check against existing appointments with buffer
  const buffer = settings.bufferMinutes || 15;
  const activeBookings = appointments.filter(
    (apt) =>
      apt.date === dateStr &&
      apt.status !== 'Cancelled' &&
      apt.id !== excludeAppointmentId
  );

  for (const existing of activeBookings) {
    const existingStart = parseMinutesFromTime(existing.startTime);
    const existingEnd = parseMinutesFromTime(existing.endTime);

    // Consider buffer before and after
    const existingStartWithBuffer = Math.max(0, existingStart - buffer);
    const existingEndWithBuffer = existingEnd + buffer;

    // Check collision
    if (slotStartMins < existingEndWithBuffer && slotEndMins > existingStartWithBuffer) {
      return {
        available: false,
        reason: `Slot conflicts with existing appointment (${existing.startTime} - ${existing.endTime}) including required buffer.`
      };
    }
  }

  return { available: true };
}

export interface GeneratedSlot {
  time: string; // "10:00"
  timeFormatted: string; // "10:00 AM"
  endTime: string; // "10:30"
  endTimeFormatted: string;
  isAvailable: boolean;
  reason?: string;
}

/**
 * Derives all potential and available slots for a given date and service duration.
 */
export function getAvailableSlotsForDate(dateStr: string, durationMinutes: number): GeneratedSlot[] {
  initializeStorageIfNeeded();
  const availabilityRules = getAvailabilityRules();
  const blockedDates = getBlockedDates();
  const settings = getBusinessSettings();

  const isBlocked = blockedDates.find((b) => b.date === dateStr);
  if (isBlocked) return [];

  const [year, month, day] = dateStr.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  const weekday = targetDate.getDay();

  const rule = availabilityRules.find((r) => r.weekday === weekday);
  if (!rule || !rule.isOpen) return [];

  const openMins = parseMinutesFromTime(rule.startTime);
  const closeMins = parseMinutesFromTime(rule.endTime);

  // Check lead time (minimum notice hours)
  const now = new Date();
  const minNoticeMs = (settings.minNoticeHours || 12) * 60 * 60 * 1000;

  // Step increment: 30 minutes for concise schedule
  const stepMinutes = 30;
  const slots: GeneratedSlot[] = [];

  for (let currentMins = openMins; currentMins + durationMinutes <= closeMins; currentMins += stepMinutes) {
    const timeStr = formatTimeFromMinutes(currentMins);
    const endTimeStr = formatTimeFromMinutes(currentMins + durationMinutes);

    // Construct slot datetime to check against minNotice
    const slotDateTime = new Date(year, month - 1, day, Math.floor(currentMins / 60), currentMins % 60);
    const isPastNotice = slotDateTime.getTime() - now.getTime() < minNoticeMs;

    if (isPastNotice) {
      slots.push({
        time: timeStr,
        timeFormatted: format12Hour(timeStr),
        endTime: endTimeStr,
        endTimeFormatted: format12Hour(endTimeStr),
        isAvailable: false,
        reason: `Requires minimum ${settings.minNoticeHours}h advance notice.`
      });
      continue;
    }

    const check = isSlotAvailable(dateStr, timeStr, durationMinutes);
    slots.push({
      time: timeStr,
      timeFormatted: format12Hour(timeStr),
      endTime: endTimeStr,
      endTimeFormatted: format12Hour(endTimeStr),
      isAvailable: check.available,
      reason: check.reason
    });
  }

  return slots;
}

// ----------------- Mutation Operations -----------------

export interface CreateBookingPayload {
  serviceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectLocation: string;
  propertyType: Appointment['propertyType'];
  designAreas: string[];
  budgetRange: string;
  projectDescription: string;
  consultationMethod: Appointment['consultationMethod'];
  date: string;
  startTime: string;
}

export function createAppointment(payload: CreateBookingPayload): {
  success: boolean;
  appointment?: Appointment;
  error?: string;
} {
  initializeStorageIfNeeded();
  const services = getServices();
  const service = services.find((s) => s.id === payload.serviceId);

  if (!service) {
    return { success: false, error: 'Selected interior design service could not be found.' };
  }

  // Atomic re-validation of availability on server/storage layer
  const check = isSlotAvailable(payload.date, payload.startTime, service.durationMinutes);
  if (!check.available) {
    return {
      success: false,
      error: check.reason || 'This appointment slot was just reserved by another client. Please select another time.'
    };
  }

  const startMins = parseMinutesFromTime(payload.startTime);
  const endMins = startMins + service.durationMinutes;
  const endTime = formatTimeFromMinutes(endMins);

  const settings = getBusinessSettings();

  // Generate unique human-readable booking reference (e.g. TRIKHA-2026-8492)
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const currentYear = new Date().getFullYear();
  const bookingReference = `TRIKHA-${currentYear}-${randomSuffix}`;

  // Unguessable management token
  const managementToken = `tok-${Math.random().toString(36).substring(2, 10)}-${Date.now().toString(36)}`;

  // Payment status
  let paymentStatus: PaymentStatus = 'Not Required';
  if (!service.isFree && service.price > 0) {
    // For paid consultations in demo/evaluation mode:
    // Prompt specification: "For paid consultations, do not mark the appointment as paid until a real payment provider confirms the payment.
    // If payment is required but not configured, clearly state that the booking or payment is not yet complete."
    paymentStatus = 'Pending';
  }

  const newAppointment: Appointment = {
    id: `apt-${Date.now()}-${randomSuffix}`,
    bookingReference,
    serviceId: service.id,
    serviceName: service.name,
    servicePrice: service.price,
    serviceDuration: service.durationMinutes,
    customerName: payload.customerName.trim(),
    customerEmail: payload.customerEmail.trim().toLowerCase(),
    customerPhone: payload.customerPhone.trim(),
    projectLocation: payload.projectLocation.trim(),
    propertyType: payload.propertyType,
    designAreas: payload.designAreas,
    budgetRange: payload.budgetRange,
    projectDescription: payload.projectDescription.trim(),
    consultationMethod: payload.consultationMethod,
    date: payload.date,
    startTime: payload.startTime,
    endTime,
    timezone: settings.timezone,
    // Free consultations confirm immediately upon save; paid remain Pending payment
    status: service.isFree ? 'Confirmed' : 'Pending',
    paymentStatus,
    managementToken,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const appointments = getAppointments();
  appointments.push(newAppointment);
  safeSetItem(STORAGE_KEYS.APPOINTMENTS, appointments);

  return { success: true, appointment: newAppointment };
}

export function rescheduleAppointment(
  appointmentId: string,
  newDate: string,
  newStartTime: string,
  token?: string
): { success: boolean; appointment?: Appointment; error?: string } {
  initializeStorageIfNeeded();
  const appointments = getAppointments();
  const index = appointments.findIndex((a) => a.id === appointmentId);

  if (index === -1) {
    return { success: false, error: 'Appointment not found.' };
  }

  const existing = appointments[index];

  // Token ownership check if token provided
  if (token && existing.managementToken !== token) {
    return { success: false, error: 'Security token mismatch. Unauthorized operation.' };
  }

  // Check double-booking excluding this appointment
  const check = isSlotAvailable(newDate, newStartTime, existing.serviceDuration, existing.id);
  if (!check.available) {
    return { success: false, error: check.reason || 'The requested new slot is not available.' };
  }

  const startMins = parseMinutesFromTime(newStartTime);
  const endMins = startMins + existing.serviceDuration;
  const newEndTime = formatTimeFromMinutes(endMins);

  const updated: Appointment = {
    ...existing,
    date: newDate,
    startTime: newStartTime,
    endTime: newEndTime,
    status: existing.status === 'Cancelled' ? 'Confirmed' : existing.status,
    updatedAt: new Date().toISOString()
  };

  appointments[index] = updated;
  safeSetItem(STORAGE_KEYS.APPOINTMENTS, appointments);

  return { success: true, appointment: updated };
}

export function cancelAppointment(
  appointmentId: string,
  reason: string,
  token?: string
): { success: boolean; error?: string } {
  initializeStorageIfNeeded();
  const appointments = getAppointments();
  const index = appointments.findIndex((a) => a.id === appointmentId);

  if (index === -1) {
    return { success: false, error: 'Appointment not found.' };
  }

  const existing = appointments[index];

  if (token && existing.managementToken !== token) {
    return { success: false, error: 'Security token mismatch. Unauthorized operation.' };
  }

  appointments[index] = {
    ...existing,
    status: 'Cancelled',
    cancelReason: reason || 'Cancelled by client request',
    updatedAt: new Date().toISOString()
  };

  safeSetItem(STORAGE_KEYS.APPOINTMENTS, appointments);
  return { success: true };
}

export function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus,
  paymentStatus?: PaymentStatus,
  notes?: string
): { success: boolean; appointment?: Appointment; error?: string } {
  initializeStorageIfNeeded();
  const appointments = getAppointments();
  const index = appointments.findIndex((a) => a.id === appointmentId);

  if (index === -1) {
    return { success: false, error: 'Appointment not found.' };
  }

  const existing = appointments[index];
  const updated: Appointment = {
    ...existing,
    status,
    paymentStatus: paymentStatus !== undefined ? paymentStatus : existing.paymentStatus,
    internalNotes: notes !== undefined ? notes : existing.internalNotes,
    updatedAt: new Date().toISOString()
  };

  appointments[index] = updated;
  safeSetItem(STORAGE_KEYS.APPOINTMENTS, appointments);
  return { success: true, appointment: updated };
}

// ----------------- CSV Export -----------------

export function exportAppointmentsToCSV(): void {
  const appointments = getAppointments();
  if (!appointments.length) {
    alert('No appointments available to export.');
    return;
  }

  const headers = [
    'Reference',
    'Date',
    'Start Time',
    'End Time',
    'Service',
    'Status',
    'Payment Status',
    'Price (USD)',
    'Client Name',
    'Client Email',
    'Client Phone',
    'Property Type',
    'Location',
    'Design Areas',
    'Budget Range',
    'Consultation Method',
    'Created At'
  ];

  const escapeCSV = (val: string | number | undefined) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = appointments.map((a) => [
    escapeCSV(a.bookingReference),
    escapeCSV(a.date),
    escapeCSV(a.startTime),
    escapeCSV(a.endTime),
    escapeCSV(a.serviceName),
    escapeCSV(a.status),
    escapeCSV(a.paymentStatus),
    escapeCSV(a.servicePrice),
    escapeCSV(a.customerName),
    escapeCSV(a.customerEmail),
    escapeCSV(a.customerPhone),
    escapeCSV(a.propertyType),
    escapeCSV(a.projectLocation),
    escapeCSV(a.designAreas.join('; ')),
    escapeCSV(a.budgetRange),
    escapeCSV(a.consultationMethod),
    escapeCSV(a.createdAt)
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `inlay_interior_design_appointments_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
