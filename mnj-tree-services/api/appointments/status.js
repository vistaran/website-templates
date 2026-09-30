import { CONFIG } from '../_lib/google.js';

/**
 * GET /api/appointments/status
 *
 * Tells the booking widget whether online scheduling is actually wired up, so it
 * can show a "call / email us" panel instead of a date picker that could never
 * confirm anything. Connected = the three Google OAuth secrets are present.
 */
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const configured = Boolean(
    process.env.GOOGLE_REFRESH_TOKEN &&
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET
  );

  return res.status(200).json({ configured, timeZone: CONFIG.timeZone });
}
