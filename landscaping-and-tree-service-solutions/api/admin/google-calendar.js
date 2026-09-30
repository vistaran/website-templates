import { oauth2ClientInstance } from '../_lib/google.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Security Check: Ensure only the business owner can connect a calendar
  if (req.query.password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).send('<h3 style="color: red; text-align: center; margin-top: 50px;">Unauthorized: Incorrect Password</h3>');
  }

  const url = oauth2ClientInstance.generateAuthUrl({
    access_type: 'offline', // Ensures we get a refresh token
    prompt: 'consent', // Force consent to guarantee refresh token on every new login
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ],
  });
  
  res.redirect(url);
}
