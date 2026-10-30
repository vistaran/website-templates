// GET /api/appointments/slots
export default function handler(req, res) {
  const slots = [
    { id: 'morning', label: 'Morning (8:00 AM \u2013 11:00 AM)', available: true },
    { id: 'midday', label: 'Mid-Day (11:00 AM \u2013 2:00 PM)', available: true },
    { id: 'afternoon', label: 'Afternoon (2:00 PM \u2013 5:00 PM)', available: true },
    { id: 'evening', label: 'Evening (5:00 PM \u2013 7:00 PM)', available: true },
  ];
  return res.status(200).json({ success: true, slots });
}
