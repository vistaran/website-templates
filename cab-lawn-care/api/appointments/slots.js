import { calendar, CONFIG } from '../_lib/google.js';
import { addMinutes, isBefore } from 'date-fns';
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';

export default async function handler(req, res) {
  // CORS Headers for Vercel just in case
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      return res.status(401).json({ error: 'Google Calendar not connected. Missing GOOGLE_REFRESH_TOKEN.' });
    }

    const { date } = req.query; // format: YYYY-MM-DD
    if (!date) {
      return res.status(400).json({ error: 'Date is required.' });
    }

    // 1. Fetch existing events for the day
    const timeMinDate = fromZonedTime(`${date}T00:00:00`, CONFIG.timeZone);
    const timeMaxDate = fromZonedTime(`${date}T23:59:59`, CONFIG.timeZone);

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: timeMinDate.toISOString(),
      timeMax: timeMaxDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busySlots = response.data.items?.map((event) => ({
      start: new Date(event.start?.dateTime || event.start?.date),
      end: new Date(event.end?.dateTime || event.end?.date),
    })) || [];

    // 2. Generate all possible slots and filter out busy ones
    let availableSlots = [];
    let currentSlot = fromZonedTime(`${date}T${CONFIG.startHour.toString().padStart(2, '0')}:00:00`, CONFIG.timeZone);
    const endOfDay = fromZonedTime(`${date}T${CONFIG.endHour.toString().padStart(2, '0')}:00:00`, CONFIG.timeZone);
    const now = new Date();

    while (isBefore(currentSlot, endOfDay)) {
      const slotEnd = addMinutes(currentSlot, CONFIG.durationMinutes);

      const isBusy = busySlots.some((busy) =>
        (currentSlot >= busy.start && currentSlot < busy.end) ||
        (slotEnd > busy.start && slotEnd <= busy.end)
      );

      // Also mark as unavailable if it's in the past
      const isPast = isBefore(currentSlot, now);

      availableSlots.push({
        // formatInTimeZone, not format: this date-fns-tz version ignores the
        // `timeZone` option on format() and falls back to the server's zone.
        timeLabel: formatInTimeZone(currentSlot, CONFIG.timeZone, 'h:mm a'),
        startTime: currentSlot.toISOString(),
        endTime: slotEnd.toISOString(),
        available: !isBusy && !isPast,
      });

      currentSlot = slotEnd;
    }

    res.status(200).json({ slots: availableSlots });
  } catch (error) {
    console.error('Error fetching slots:', error.message || error);
    res.status(500).json({ error: 'Failed to fetch slots: ' + (error.message || String(error)) });
  }
}
