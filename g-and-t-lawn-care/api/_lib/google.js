import { google } from 'googleapis';

// Vercel Serverless automatically parses environment variables, but we still need it to work locally if we run `vercel dev`
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// If we have a refresh token in the environment, set it immediately
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
}

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export const oauth2ClientInstance = oauth2Client; // Exported for the admin routes

export const CONFIG = {
  durationMinutes: Number(process.env.BOOKING_SLOT_MINUTES) || 30,
  startHour: Number(process.env.BOOKING_START_HOUR) || 8, // 8 AM
  endHour: Number(process.env.BOOKING_END_HOUR) || 17, // 5 PM
  // This business is in Gastonia, NC (Eastern time) — do NOT default to the
  // scaffold's Asia/Kolkata, which silently shifted every slot label by 9.5 hours.
  timeZone: process.env.BUSINESS_TIMEZONE || process.env.TIMEZONE || 'America/New_York',
};
