// POST /api/appointments/book
// Ported from the dev-only Vite middleware in vite.config.ts so the booking
// widget has a real same-origin endpoint in production too.
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : (req.body || {});
  if (!body || !body.date || !body.slot) {
    return res.status(400).json({ success: false, error: 'Invalid payload' });
  }

  return res.status(200).json({
    success: true,
    message: 'Appointment successfully booked with JP Lawn and Landscaping',
    appointmentId: body.id || `JP-${Date.now().toString().slice(-4)}`,
    appointment: body,
    calendarUrl: body.googleCalendarUrl || null,
  });
}

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
