import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import { addMinutes, isBefore } from 'date-fns';
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Google OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || `http://localhost:${PORT}/api/admin/oauth2callback`
);

const TOKEN_PATH = path.join(__dirname, 'tokens', 'google-token.json');

// Load saved token if it exists
if (fs.existsSync(TOKEN_PATH)) {
  try {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oauth2Client.setCredentials(token);
    console.log('Successfully loaded Google OAuth token from file.');
  } catch (error) {
    console.error('Error reading token file:', error);
  }
}

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const CONFIG = {
  durationMinutes: 30,
  startHour: 8, // 8 AM
  endHour: 17,  // 5 PM
  timeZone: process.env.BUSINESS_TIMEZONE || process.env.TIMEZONE || 'America/New_York',
};

// ==========================================
// ADMIN OAUTH ROUTES
// ==========================================
app.get('/api/admin/google-calendar', (req, res) => {
  // Security Check: Ensure only the business owner can connect a calendar
  if (req.query.password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).send('<h3 style="color: red; text-align: center; margin-top: 50px;">Unauthorized: Incorrect Password</h3>');
  }

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Ensures we get a refresh token
    prompt: 'consent', // Force consent to guarantee refresh token on every new login
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ],
  });
  res.redirect(url);
});

app.get('/api/admin/oauth2callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('No code provided');

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Ensure tokens directory exists
    const dir = path.join(__dirname, 'tokens');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save the token payload to disk securely
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    
    res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h2 style="color: #15803d;">Google Calendar Connected Successfully!</h2>
        <p>Your OAuth refresh token has been securely saved to the server.</p>
        <p>You can now close this window and start accepting bookings.</p>
      </div>
    `);
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Authentication failed');
  }
});

// ==========================================
// BOOKING API ROUTES
// ==========================================
app.get('/api/appointments/slots', async (req, res) => {
  try {
    if (!fs.existsSync(TOKEN_PATH)) {
      return res.status(401).json({ error: 'Google Calendar not connected. Please visit /api/admin/google-calendar first.' });
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
        timeLabel: formatInTimeZone(currentSlot, CONFIG.timeZone, 'h:mm a'),
        startTime: currentSlot.toISOString(),
        endTime: slotEnd.toISOString(),
        available: !isBusy && !isPast,
      });

      currentSlot = slotEnd;
    }

    res.json({ slots: availableSlots });
  } catch (error) {
    console.error('Error fetching slots:', error.message || error);
    res.status(500).json({ error: 'Failed to fetch slots: ' + (error.message || String(error)) });
  }
});

app.post('/api/appointments/book', async (req, res) => {
  try {
    if (!fs.existsSync(TOKEN_PATH)) {
      return res.status(401).json({ error: 'Google Calendar not connected. Please visit /api/admin/google-calendar first.' });
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
      attendees: [{ email }], // <--- This tells Google who to invite
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
      sendUpdates: 'all', // <--- This forces Google to instantly email the attendee!
    });


    res.json({
      success: true,
      meetLink: response.data.hangoutLink,
      message: 'Booking confirmed and invite sent!'
    });
  } catch (error) {
    console.error('Error booking:', error.message || error);
    res.status(500).json({ error: 'Failed to book appointment: ' + (error.message || String(error)) });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
