import { calendar, CONFIG } from '../_lib/google.js';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      return res.status(401).json({ error: 'Google Calendar not connected. Missing GOOGLE_REFRESH_TOKEN.' });
    }

    const { name, email, requirement, startTime, endTime } = req.body;

    if (!name || !email || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const event = {
      summary: `Meeting with ${name}`,
      description: `Requirement: ${requirement || 'N/A'}`,
      start: { dateTime: startTime, timeZone: CONFIG.timeZone },
      end: { dateTime: endTime, timeZone: CONFIG.timeZone },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    res.status(200).json({
      success: true,
      meetLink: response.data.hangoutLink,
      message: 'Booking confirmed and invite sent!'
    });
  } catch (error) {
    console.error('Error booking:', error.message || error);
    res.status(500).json({ error: 'Failed to book appointment: ' + (error.message || String(error)) });
  }
}
