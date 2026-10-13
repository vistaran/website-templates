import { Appointment, BusinessSettings } from '../types/booking';

function formatToIcsDateTime(dateStr: string, timeStr: string): string {
  // dateStr is "YYYY-MM-DD", timeStr is "HH:mm"
  const [year, month, day] = dateStr.split('-');
  const [hours, minutes] = timeStr.split(':');
  // Format: YYYYMMDDTHHmm00
  return `${year}${month}${day}T${hours}${minutes}00`;
}

export function generateIcsCalendar(appointment: Appointment, settings: BusinessSettings): void {
  const startDt = formatToIcsDateTime(appointment.date, appointment.startTime);
  const endDt = formatToIcsDateTime(appointment.date, appointment.endTime);
  const nowStr = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const methodLabel =
    appointment.consultationMethod === 'in_person'
      ? `In-Person at ${settings.address}, ${settings.cityStateZip}`
      : appointment.consultationMethod === 'video_call'
      ? 'Virtual Consultation (Video Conference link sent via studio liaison)'
      : 'Telephone Consultation';

  const descriptionLines = [
    `Studio: ${settings.studioName}`,
    `Service: ${appointment.serviceName} (${appointment.serviceDuration} minutes)`,
    `Booking Reference: ${appointment.bookingReference}`,
    `Client: ${appointment.customerName}`,
    `Consultation Format: ${methodLabel}`,
    `Property Type: ${appointment.propertyType}`,
    `Project Location: ${appointment.projectLocation}`,
    `Design Areas: ${appointment.designAreas.join(', ')}`,
    '',
    `Studio Contact: ${settings.phone} | ${settings.email}`,
    `Studio Address: ${settings.address}, ${settings.cityStateZip}`,
    `Google Maps: ${settings.mapUrl}`
  ];

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Trikha Interiors//Consultation Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${appointment.bookingReference}@trikhainteriors.com`,
    `DTSTAMP:${nowStr}`,
    `DTSTART;TZID=${settings.timezone}:${startDt}`,
    `DTEND;TZID=${settings.timezone}:${endDt}`,
    `SUMMARY:${appointment.serviceName} - Trikha Interiors`,
    `DESCRIPTION:${descriptionLines.join('\\n')}`,
    `LOCATION:${appointment.consultationMethod === 'in_person' ? `${settings.address}, ${settings.cityStateZip}` : 'Virtual Conference / Phone'}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${appointment.bookingReference}_Consultation.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
